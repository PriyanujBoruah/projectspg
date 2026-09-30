import { Hono, Context } from "hono";
import { tokenize, rehydrate, DetectedEntity } from "../tokenizer/engine";
import { StreamTokenBuffer } from "../tokenizer/stream";
import { saveTokenSession } from "../vault/session";
import { computeSha256Fingerprint } from "../vault/crypto";
import { recordAuditEvent, recordApiCallLog, getRecentAuditEvents, AuditEntitySummary } from "../audit/logger";
import {
  DEFAULT_PLATFORM_KEYS,
  resolveClientIdentifier,
  isFreeTierRequest,
  checkFreeTierRateLimit,
  createRateLimitErrorPayload,
  getRateLimitHeaders,
} from "../auth/rate_limiter";
import { Env } from "./tokenization";

const openaiApp = new Hono<{ Bindings: Env }>();

/**
 * Standard OpenAI error builder
 */
function createOpenAIError(
  message: string,
  type: string = "invalid_request_error",
  param: string | null = null,
  code: string | null = null,
  status: number = 400
) {
  return {
    error: {
      message,
      type,
      param,
      code,
    },
    status,
  };
}

/**
 * Extract Custom Enterprise Entities/Keywords from request headers
 */
function resolveCustomKeywords(c: Context): string[] {
  const headerVal = c.req.header("x-custom-entities") || c.req.header("x-custom-keywords");
  if (!headerVal) return [];

  try {
    const trimmed = headerVal.trim();
    if (trimmed.startsWith("[")) {
      return JSON.parse(trimmed);
    }
    return trimmed.split(",").map((s: string) => s.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Extract Detection Categories from request body or headers
 */
function resolveCategories(c: Context, bodyCategories?: string[]): string[] {
  if (Array.isArray(bodyCategories) && bodyCategories.length > 0) {
    return bodyCategories;
  }
  const headerVal = c.req.header("x-detection-categories") || c.req.header("x-categories");
  if (!headerVal) return ["all"];

  try {
    const trimmed = headerVal.trim();
    if (trimmed.startsWith("[")) {
      return JSON.parse(trimmed);
    }
    return trimmed.split(",").map((s: string) => s.trim()).filter(Boolean);
  } catch {
    return ["all"];
  }
}

/**
 * Resolve Tokenization Mode (structural vs. fpe)
 */
function resolveMode(c: Context, bodyMode?: string): "structural" | "fpe" {
  const headerMode = c.req.header("x-tokenization-mode") || bodyMode;
  if (headerMode === "fpe") return "fpe";
  return "structural";
}

/**
 * Resolve upstream base URL (e.g. OpenAI, Google AI Studio, Anthropic/Groq proxy, Ollama, Azure)
 */
export function resolveUpstreamBaseUrl(c: Context, model?: string): string {
  const headerUrl = c.req.header("x-upstream-base-url") || c.req.header("x-upstream-url");
  if (headerUrl) {
    return headerUrl.trim().replace(/\/+$/, "");
  }

  const queryUrl = c.req.query("upstream_url");
  if (queryUrl) {
    return queryUrl.trim().replace(/\/+$/, "");
  }

  const envUrl = (c.env as any)?.UPSTREAM_BASE_URL || (c.env as any)?.OPENAI_BASE_URL;
  if (envUrl) {
    return envUrl.trim().replace(/\/+$/, "");
  }

  const procEnv = (globalThis as any).process?.env;
  if (procEnv?.OPENAI_BASE_URL) {
    return procEnv.OPENAI_BASE_URL.trim().replace(/\/+$/, "");
  }

  // Automatic Smart Provider Detection
  const authHeader = c.req.header("Authorization") || "";
  const googHeader = c.req.header("x-goog-api-key") || "";
  const modelLower = (model || "").toLowerCase();

  // 1. Google AI Studio (Gemini & Gemma models)
  if (
    modelLower.startsWith("gemini") ||
    modelLower.startsWith("gemma") ||
    authHeader.includes("AIza") ||
    googHeader.startsWith("AIza")
  ) {
    return "https://generativelanguage.googleapis.com/v1beta/openai";
  }

  // 2. Mistral AI (mistral, codestral, ministral)
  if (
    modelLower.startsWith("mistral") ||
    modelLower.startsWith("codestral") ||
    modelLower.startsWith("ministral") ||
    modelLower.startsWith("open-mistral")
  ) {
    return "https://api.mistral.ai/v1";
  }

  // 3. Groq Cloud (openai/gpt-oss-*, qwen/*, llama*, mixtral*, whisper*, groq)
  if (
    modelLower.startsWith("openai/gpt-oss") ||
    modelLower.startsWith("qwen") ||
    modelLower.startsWith("llama") ||
    modelLower.startsWith("mixtral") ||
    modelLower.startsWith("whisper") ||
    modelLower.includes("groq")
  ) {
    return "https://api.groq.com/openai/v1";
  }

  // 4. OpenRouter (other models containing slash or oss)
  if (modelLower.includes("/") || modelLower.includes("oss")) {
    return "https://openrouter.ai/api/v1";
  }

  return "https://api.openai.com/v1";
}

/**
 * Resolve Authorization / API Key for upstream LLM provider
 * If user hasn't provided their own key, provide platform free tier key!
 */
export function resolveUpstreamAuth(
  c: Context,
  model?: string,
  targetUrl?: string
): { headerName: string; headerValue: string; isUserKey: boolean } | null {
  const authHeader = c.req.header("Authorization");
  const isSpgKey = authHeader ? authHeader.toLowerCase().startsWith("bearer spg_") : false;

  // 1. If user supplied their own direct upstream provider key
  if (authHeader && !isSpgKey) {
    return { headerName: "Authorization", headerValue: authHeader, isUserKey: true };
  }

  const googKey = c.req.header("x-goog-api-key");
  if (googKey) {
    return { headerName: "Authorization", headerValue: `Bearer ${googKey}`, isUserKey: true };
  }

  const azureKey = c.req.header("api-key");
  if (azureKey) {
    return { headerName: "api-key", headerValue: azureKey, isUserKey: true };
  }

  // 2. Check if the authenticated API key record has BYOK provider keys attached
  const apiKeyRecord: any = (c as any).get("apiKeyRecord");
  const url = targetUrl || resolveUpstreamBaseUrl(c, model);
  const modelLower = (model || "").toLowerCase();

  if (apiKeyRecord && (apiKeyRecord.tier === "byok" || apiKeyRecord.byok_google_key || apiKeyRecord.byok_mistral_key || apiKeyRecord.byok_groq_key)) {
    // Google AI Studio
    if (url.includes("generativelanguage.googleapis.com") || modelLower.startsWith("gemini") || modelLower.startsWith("gemma")) {
      if (apiKeyRecord.byok_google_key) {
        return { headerName: "Authorization", headerValue: `Bearer ${apiKeyRecord.byok_google_key}`, isUserKey: true };
      }
    }

    // Mistral AI
    if (
      url.includes("mistral.ai") ||
      modelLower.startsWith("mistral") ||
      modelLower.startsWith("codestral") ||
      modelLower.startsWith("ministral") ||
      modelLower.startsWith("open-mistral")
    ) {
      if (apiKeyRecord.byok_mistral_key) {
        return { headerName: "Authorization", headerValue: `Bearer ${apiKeyRecord.byok_mistral_key}`, isUserKey: true };
      }
    }

    // Groq Cloud
    if (
      url.includes("groq.com") ||
      modelLower.startsWith("openai/gpt-oss") ||
      modelLower.startsWith("qwen") ||
      modelLower.startsWith("llama") ||
      modelLower.startsWith("mixtral") ||
      modelLower.startsWith("whisper") ||
      modelLower.includes("groq")
    ) {
      if (apiKeyRecord.byok_groq_key) {
        return { headerName: "Authorization", headerValue: `Bearer ${apiKeyRecord.byok_groq_key}`, isUserKey: true };
      }
    }
  }

  // 3. User has NOT added their own key: provide free tier platform key
  // Google AI Studio (Gemini & Gemma)
  if (url.includes("generativelanguage.googleapis.com") || modelLower.startsWith("gemini") || modelLower.startsWith("gemma")) {
    const key =
      (c.env as any)?.GEMINI_API_KEY ||
      (globalThis as any).process?.env?.GEMINI_API_KEY ||
      DEFAULT_PLATFORM_KEYS.gemini;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Mistral AI (mistral, codestral, ministral)
  if (
    url.includes("mistral.ai") ||
    modelLower.startsWith("mistral") ||
    modelLower.startsWith("codestral") ||
    modelLower.startsWith("ministral") ||
    modelLower.startsWith("open-mistral")
  ) {
    const key =
      (c.env as any)?.MISTRAL_API_KEY ||
      (globalThis as any).process?.env?.MISTRAL_API_KEY ||
      DEFAULT_PLATFORM_KEYS.mistral;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Groq Cloud (openai/gpt-oss, qwen, llama, mixtral)
  if (
    url.includes("groq.com") ||
    modelLower.startsWith("openai/gpt-oss") ||
    modelLower.startsWith("qwen") ||
    modelLower.startsWith("llama") ||
    modelLower.startsWith("mixtral")
  ) {
    const key =
      (c.env as any)?.GROQ_API_KEY ||
      (globalThis as any).process?.env?.GROQ_API_KEY ||
      DEFAULT_PLATFORM_KEYS.groq;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // OpenRouter
  if (url.includes("openrouter.ai") || modelLower.includes("/") || modelLower.includes("oss")) {
    const key =
      (c.env as any)?.OPENROUTER_API_KEY ||
      (globalThis as any).process?.env?.OPENROUTER_API_KEY ||
      DEFAULT_PLATFORM_KEYS.openrouter;
    if (key) {
      return { headerName: "Authorization", headerValue: `Bearer ${key}`, isUserKey: false };
    }
  }

  // Fallback to OpenAI env or default Groq platform key
  const envOpenAiKey = (c.env as any)?.OPENAI_API_KEY || (globalThis as any).process?.env?.OPENAI_API_KEY;
  if (envOpenAiKey) {
    return { headerName: "Authorization", headerValue: `Bearer ${envOpenAiKey}`, isUserKey: false };
  }

  const defaultKey = (c.env as any)?.GROQ_API_KEY || DEFAULT_PLATFORM_KEYS.groq;
  return { headerName: "Authorization", headerValue: `Bearer ${defaultKey}`, isUserKey: false };
}

/**
 * Intercepts and sanitizes all prompt messages (both single string and multimodal content arrays)
 */
export function sanitizeMessages(
  messages: any[],
  options: {
    customKeywords?: string[];
    mode?: "structural" | "fpe";
    categories?: string[];
  }
): {
  sanitizedMessages: any[];
  combinedTokenMap: Record<string, string>;
  entitiesDetected: DetectedEntity[];
  categoriesApplied: string[];
  totalEntities: number;
} {
  const combinedTokenMap: Record<string, string> = {};
  const entitiesDetected: DetectedEntity[] = [];
  const categoriesSet = new Set<string>();

  const sanitizedMessages = messages.map((msg) => {
    if (!msg || typeof msg !== "object") return msg;
    const cloned = { ...msg };

    if (typeof cloned.content === "string") {
      const result = tokenize(cloned.content, options);
      cloned.content = result.sanitizedText;
      Object.assign(combinedTokenMap, result.tokenMap);
      entitiesDetected.push(...result.entitiesDetected);
      result.categoriesApplied?.forEach((c) => categoriesSet.add(c));
    } else if (Array.isArray(cloned.content)) {
      cloned.content = cloned.content.map((part: any) => {
        if (part && part.type === "text" && typeof part.text === "string") {
          const result = tokenize(part.text, options);
          Object.assign(combinedTokenMap, result.tokenMap);
          entitiesDetected.push(...result.entitiesDetected);
          result.categoriesApplied?.forEach((c) => categoriesSet.add(c));
          return { ...part, text: result.sanitizedText };
        }
        return part;
      });
    }

    return cloned;
  });

  return {
    sanitizedMessages,
    combinedTokenMap,
    entitiesDetected,
    categoriesApplied: Array.from(categoriesSet),
    totalEntities: entitiesDetected.length,
  };
}

/**
 * Creates an SSE transform stream that decodes incoming chunks,
 * rehydrates synthetic tokens across chunk boundaries, and emits clean SSE events.
 */
export function createRehydratingSSEStream(
  upstreamStream: ReadableStream<Uint8Array>,
  tokenMap: Record<string, string>,
  requestedModel: string
): ReadableStream<Uint8Array> {
  const reader = upstreamStream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const tokenBuffer = new StreamTokenBuffer(tokenMap);

  let sseLineBuffer = "";

  function processLine(line: string, controller: ReadableStreamDefaultController) {
    const trimmed = line.trim();
    if (!trimmed) {
      controller.enqueue(encoder.encode("\n"));
      return;
    }

    if (trimmed === "data: [DONE]") {
      const leftover = tokenBuffer.flush();
      if (leftover) {
        const flushChunk = {
          id: `chatcmpl-${Date.now()}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: requestedModel,
          choices: [
            {
              index: 0,
              delta: { content: leftover },
              finish_reason: null,
            },
          ],
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(flushChunk)}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      return;
    }

    if (trimmed.startsWith("data: ")) {
      const rawJson = trimmed.slice(6);
      try {
        const data = JSON.parse(rawJson);
        if (data.choices && Array.isArray(data.choices)) {
          for (const choice of data.choices) {
            if (choice.delta && typeof choice.delta.content === "string") {
              choice.delta.content = tokenBuffer.processChunk(choice.delta.content);
            }
            if (choice.delta?.tool_calls && Array.isArray(choice.delta.tool_calls)) {
              for (const tc of choice.delta.tool_calls) {
                if (tc.function?.arguments) {
                  tc.function.arguments = rehydrate(tc.function.arguments, tokenMap);
                }
              }
            }
          }
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      } catch {
        controller.enqueue(encoder.encode(`${line}\n`));
      }
    } else {
      controller.enqueue(encoder.encode(`${line}\n`));
    }
  }

  return new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            const leftover = tokenBuffer.flush();
            if (leftover) {
              const flushChunk = {
                id: `chatcmpl-${Date.now()}`,
                object: "chat.completion.chunk",
                created: Math.floor(Date.now() / 1000),
                model: requestedModel,
                choices: [
                  {
                    index: 0,
                    delta: { content: leftover },
                    finish_reason: null,
                  },
                ],
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(flushChunk)}\n\n`));
            }
            if (sseLineBuffer.trim().length > 0) {
              processLine(sseLineBuffer, controller);
            }
            controller.close();
            break;
          }

          sseLineBuffer += decoder.decode(value, { stream: true });
          const lines = sseLineBuffer.split(/\r?\n/);
          sseLineBuffer = lines.pop() || "";

          for (const line of lines) {
            processLine(line, controller);
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

// =========================================================================
// POST /chat/completions (OpenAI Drop-In Wire-Compatible Route)
// =========================================================================
openaiApp.post("/chat/completions", async (c) => {
  const startTime = performance.now();

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    const err = createOpenAIError("Invalid JSON in request body.", "invalid_request_error", null, null, 400);
    return c.json(err, 400);
  }

  if (!body || !Array.isArray(body.messages)) {
    const err = createOpenAIError(
      "Missing or invalid 'messages' field: must be an array of chat messages.",
      "invalid_request_error",
      "messages",
      null,
      400
    );
    return c.json(err, 400);
  }

  const customKeywords = resolveCustomKeywords(c);
  const categories = resolveCategories(c, body.categories);
  const mode = resolveMode(c, body.mode);
  const isStreaming = body.stream === true;
  const requestedModel = body.model || "gpt-4o";

  // Step 1: Intercept & Sanitize All Prompt Messages at Sub-Millisecond Speed
  const {
    sanitizedMessages,
    combinedTokenMap,
    entitiesDetected,
    categoriesApplied,
    totalEntities,
  } = sanitizeMessages(body.messages, {
    customKeywords,
    mode,
    categories,
  });

  const engineLatencyUs = Math.round((performance.now() - startTime) * 1000);
  const sessionId = `sess_proxy_${Math.random().toString(36).substring(2, 12)}`;

  const lastUserMsg = [...sanitizedMessages].reverse().find((m: any) => m?.role === "user");
  const protectedUserPrompt =
    typeof lastUserMsg?.content === "string"
      ? lastUserMsg.content
      : typeof sanitizedMessages[0]?.content === "string"
      ? sanitizedMessages[0].content
      : "";

  // Save session into vault for potential auditing or manual detokenization
  const encryptionKey = c.req.header("x-vault-encryption-key");
  const ttlSeconds = body.ttlSeconds || 600;
  let executionCtx;
  try {
    executionCtx = c.executionCtx;
  } catch {}

  let isKmsEncrypted = false;
  if (Object.keys(combinedTokenMap).length > 0) {
    const saveRes = await saveTokenSession(
      c.env?.DB,
      sessionId,
      combinedTokenMap,
      ttlSeconds,
      executionCtx,
      encryptionKey
    );
    isKmsEncrypted = saveRes.isEncrypted;
  }

  // Compute non-PII SHA-256 entity fingerprints for SIEM audit matching
  const auditEntities: AuditEntitySummary[] = [];
  for (const [token, originalVal] of Object.entries(combinedTokenMap)) {
    const fingerprint = await computeSha256Fingerprint(originalVal);
    const entity = entitiesDetected.find((e) => e.token === token);
    auditEntities.push({
      ruleId: entity?.type || "RULE_GENERIC",
      token,
      fingerprint,
    });
  }

  // Step 2: Resolve Upstream Destination & Forward Sanitized Prompt
  const upstreamBaseUrl = resolveUpstreamBaseUrl(c, requestedModel);
  const upstreamUrl = `${upstreamBaseUrl}/chat/completions`;
  const upstreamAuth = resolveUpstreamAuth(c, requestedModel, upstreamBaseUrl);

  // Enforce Free Tier Rate Limit: 1 protected request per 15 seconds
  const apiKeyRecord = (c as any).get("apiKeyRecord");
  const isFreeTier = isFreeTierRequest(c, apiKeyRecord, upstreamAuth?.isUserKey);

  if (isFreeTier) {
    const clientId = resolveClientIdentifier(c, apiKeyRecord);
    const rateLimit = await checkFreeTierRateLimit(clientId, c.env, {
      bypassTest: c.req.header("x-test-bypass-rate-limit") === "true",
    });
    if (!rateLimit.allowed) {
      return c.json(
        createRateLimitErrorPayload(rateLimit.retryAfterSec),
        429,
        getRateLimitHeaders(rateLimit.retryAfterSec)
      );
    }
  }

  // Emit structured SIEM compliance audit event
  recordAuditEvent(
    {
      eventType: "PROMPT_INTERCEPTED",
      sessionId,
      model: requestedModel,
      categoriesApplied,
      entitiesCount: totalEntities,
      entities: auditEntities,
      engineLatencyUs,
      kmsEncrypted: isKmsEncrypted,
      upstreamUrl: upstreamBaseUrl,
    },
    executionCtx
  );

  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (upstreamAuth) {
    upstreamHeaders[upstreamAuth.headerName] = upstreamAuth.headerValue;
  }
  if (upstreamUrl.includes("generativelanguage.googleapis.com")) {
    const googKey = c.req.header("x-goog-api-key") || apiKeyRecord?.byok_google_key;
    if (googKey) upstreamHeaders["x-goog-api-key"] = googKey;
  }

  // Forward optional standard OpenAI headers
  const orgHeader = c.req.header("OpenAI-Organization");
  if (orgHeader) upstreamHeaders["OpenAI-Organization"] = orgHeader;

  const projHeader = c.req.header("OpenAI-Project");
  if (projHeader) upstreamHeaders["OpenAI-Project"] = projHeader;

  const upstreamPayload = {
    ...body,
    messages: sanitizedMessages,
  };
  delete upstreamPayload.categories;
  delete upstreamPayload.mode;
  delete upstreamPayload.ttlSeconds;

  // Normalize model aliases for upstream providers (Google AI Studio Gemma 4)
  if (upstreamPayload.model === "gemma-4-26b-it") {
    upstreamPayload.model = "gemma-4-26b-a4b-it";
  }

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(upstreamPayload),
    });
  } catch (fetchErr: any) {
    const err = createOpenAIError(
      `Failed to connect to upstream LLM gateway (${upstreamBaseUrl}): ${fetchErr?.message}`,
      "api_connection_error",
      null,
      null,
      502
    );
    return c.json(err, 502);
  }

  // If upstream returns an error status (e.g. 401, 403, 429, 500), forward normalized OpenAI response
  if (!upstreamRes.ok) {
    const errorBody = await upstreamRes.text();
    let errorJson: any;
    try {
      errorJson = JSON.parse(errorBody);
      if (!errorJson.error) {
        errorJson = {
          error: {
            message: errorJson.message || errorBody,
            type: errorJson.type || "upstream_error",
            code: errorJson.code || upstreamRes.status,
          },
        };
      }
    } catch {
      errorJson = { error: { message: errorBody, type: "upstream_error", code: upstreamRes.status } };
    }
    return c.json(errorJson, upstreamRes.status as any);
  }

  // Response Metadata Headers
  const privacyHeaders: Record<string, string> = {
    "x-privacy-gateway": "ai-privacy-core",
    "x-privacy-session-id": sessionId,
    "x-privacy-entities-intercepted": String(totalEntities),
    "x-privacy-latency-us": String(engineLatencyUs),
    "x-privacy-mode": mode,
    "X-Kms-Status": isKmsEncrypted ? "encrypted" : "active",
    "x-privacy-protected-prompt": encodeURIComponent(protectedUserPrompt.slice(0, 1000)),
  };

  // Step 3A: Streaming Response Handling (SSE)
  if (isStreaming || upstreamRes.headers.get("content-type")?.includes("text/event-stream")) {
    if (!upstreamRes.body) {
      const err = createOpenAIError("Upstream stream response body is null.", "api_error", null, null, 500);
      return c.json(err, 500);
    }

    // Extract API Key metadata attached by auth middleware
    const apiKeyRecord = (c as any).get("apiKeyRecord");
    const apiKeyId = apiKeyRecord?.id || "anonymous";
    const apiKeyPrefix = apiKeyRecord?.key_prefix || "none";
    const promptTokens = Math.max(1, Math.ceil(JSON.stringify(sanitizedMessages).length / 4));

    // Log streaming API call
    recordApiCallLog(
      {
        apiKeyId,
        apiKeyPrefix,
        model: requestedModel,
        promptTokens,
        completionTokens: 0,
        totalTokens: promptTokens,
        protectedEntityCount: totalEntities,
        statusCode: 200,
        latencyMs: Math.round(performance.now() - startTime),
      },
      c.env,
      executionCtx
    );

    // Fast-path: If no entities were intercepted, pass raw stream directly with zero latency
    if (Object.keys(combinedTokenMap).length === 0) {
      return new Response(upstreamRes.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
          ...privacyHeaders,
        },
      });
    }

    // Rehydrate split tokens across streaming chunks
    const transformedStream = createRehydratingSSEStream(
      upstreamRes.body,
      combinedTokenMap,
      requestedModel
    );

    return new Response(transformedStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        ...privacyHeaders,
      },
    });
  }

  // Step 3B: Non-Streaming Response Handling (Exact Roundtrip Rehydration)
  const responseData: any = await upstreamRes.json();

  if (responseData && Array.isArray(responseData.choices)) {
    for (const choice of responseData.choices) {
      if (choice.message && typeof choice.message.content === "string") {
        choice.message.content = rehydrate(choice.message.content, combinedTokenMap);
      }
      if (choice.message?.tool_calls && Array.isArray(choice.message.tool_calls)) {
        for (const tc of choice.message.tool_calls) {
          if (tc.function?.arguments) {
            tc.function.arguments = rehydrate(tc.function.arguments, combinedTokenMap);
          }
        }
      }
      if (choice.message?.function_call?.arguments) {
        choice.message.function_call.arguments = rehydrate(
          choice.message.function_call.arguments,
          combinedTokenMap
        );
      }
    }
  }

  // Extract API Key metadata and token counts for usage logging
  const apiKeyId = apiKeyRecord?.id || "anonymous";
  const apiKeyPrefix = apiKeyRecord?.key_prefix || "none";
  const promptTokens =
    responseData?.usage?.prompt_tokens ?? Math.max(1, Math.ceil(JSON.stringify(sanitizedMessages).length / 4));
  let completionTokens = responseData?.usage?.completion_tokens ?? 0;
  if (!completionTokens && responseData?.choices?.[0]?.message?.content) {
    completionTokens = Math.max(1, Math.ceil(responseData.choices[0].message.content.length / 4));
  }
  const totalTokens = responseData?.usage?.total_tokens ?? (promptTokens + completionTokens);
  const latencyMs = Math.round(performance.now() - startTime);

  recordApiCallLog(
    {
      apiKeyId,
      apiKeyPrefix,
      model: requestedModel,
      promptTokens,
      completionTokens,
      totalTokens,
      protectedEntityCount: totalEntities,
      statusCode: upstreamRes.status || 200,
      latencyMs,
    },
    c.env,
    executionCtx
  );

  if (responseData && typeof responseData === "object") {
    responseData.privacy = {
      protected_prompt: protectedUserPrompt,
      sanitized_messages: sanitizedMessages,
      token_map: combinedTokenMap,
      entities_count: totalEntities,
      mode,
    };
  }

  return c.json(responseData, 200, privacyHeaders);
});

// =========================================================================
// POST /embeddings (Vector Embedding De-identification Gateway)
// =========================================================================
openaiApp.post("/embeddings", async (c) => {
  const startTime = performance.now();
  let executionCtx: any;
  try {
    executionCtx = c.executionCtx;
  } catch {}

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    const err = createOpenAIError("Invalid JSON in request body.", "invalid_request_error", null, null, 400);
    return c.json(err, 400);
  }

  if (!body.input) {
    const err = createOpenAIError("Field 'input' is required for embeddings.", "invalid_request_error", "input", null, 400);
    return c.json(err, 400);
  }

  const customKeywords = resolveCustomKeywords(c);
  const categories = resolveCategories(c, body.categories);
  const mode = resolveMode(c, body.mode);

  let sanitizedInput: string | string[];
  let totalIntercepted = 0;

  if (typeof body.input === "string") {
    const result = tokenize(body.input, { customKeywords, mode, categories });
    sanitizedInput = result.sanitizedText;
    totalIntercepted += result.count;
  } else if (Array.isArray(body.input)) {
    sanitizedInput = body.input.map((item: string) => {
      if (typeof item === "string") {
        const result = tokenize(item, { customKeywords, mode, categories });
        totalIntercepted += result.count;
        return result.sanitizedText;
      }
      return item;
    });
  } else {
    sanitizedInput = body.input;
  }

  const upstreamBaseUrl = resolveUpstreamBaseUrl(c, body.model);
  const upstreamUrl = `${upstreamBaseUrl}/embeddings`;
  const upstreamAuth = resolveUpstreamAuth(c, body.model, upstreamBaseUrl);

  // Enforce Free Tier Rate Limit: 1 protected request per 15 seconds
  const apiKeyRecord = (c as any).get("apiKeyRecord");
  const isFreeTier = isFreeTierRequest(c, apiKeyRecord, upstreamAuth?.isUserKey);

  if (isFreeTier) {
    const clientId = resolveClientIdentifier(c, apiKeyRecord);
    const rateLimit = await checkFreeTierRateLimit(clientId, c.env, {
      bypassTest: c.req.header("x-test-bypass-rate-limit") === "true",
    });
    if (!rateLimit.allowed) {
      return c.json(
        createRateLimitErrorPayload(rateLimit.retryAfterSec),
        429,
        getRateLimitHeaders(rateLimit.retryAfterSec)
      );
    }
  }

  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (upstreamAuth) {
    upstreamHeaders[upstreamAuth.headerName] = upstreamAuth.headerValue;
  }

  const upstreamPayload = {
    ...body,
    input: sanitizedInput,
  };
  delete upstreamPayload.categories;
  delete upstreamPayload.mode;

  try {
    const upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(upstreamPayload),
    });

    const resJson = await upstreamRes.json();

    const apiKeyId = apiKeyRecord?.id || "anonymous";
    const apiKeyPrefix = apiKeyRecord?.key_prefix || "none";
    const promptTokens = Math.max(1, Math.ceil(JSON.stringify(sanitizedInput).length / 4));
    const latencyMs = Math.round(performance.now() - startTime);

    recordApiCallLog(
      {
        apiKeyId,
        apiKeyPrefix,
        model: body.model || "text-embedding-3-small",
        promptTokens,
        completionTokens: 0,
        totalTokens: promptTokens,
        protectedEntityCount: totalIntercepted,
        statusCode: upstreamRes.status || 200,
        latencyMs,
      },
      c.env,
      executionCtx
    );

    return c.json(resJson, upstreamRes.status as any, {
      "x-privacy-gateway": "ai-privacy-core",
      "x-privacy-entities-intercepted": String(totalIntercepted),
    });
  } catch (err: any) {
    const errorObj = createOpenAIError(`Failed to proxy embeddings to upstream: ${err?.message}`, "api_error", null, null, 502);
    return c.json(errorObj, 502);
  }
});

// =========================================================================
// GET /models & GET /models/:model (Compatibility Model Catalog)
// =========================================================================
openaiApp.get("/models", async (c) => {
  const upstreamBaseUrl = resolveUpstreamBaseUrl(c);
  const upstreamAuth = resolveUpstreamAuth(c);

  if (upstreamAuth) {
    try {
      const upstreamRes = await fetch(`${upstreamBaseUrl}/models`, {
        method: "GET",
        headers: {
          [upstreamAuth.headerName]: upstreamAuth.headerValue,
        },
      });
      if (upstreamRes.ok) {
        const data = await upstreamRes.json();
        return c.json(data);
      }
    } catch {
      // Fallback to static catalog if upstream unreachable
    }
  }

  // Default standard catalog
  return c.json({
    object: "list",
    data: [
      { id: "openai/gpt-oss-120b", object: "model", created: 1721235600, owned_by: "groq" },
      { id: "openai/gpt-oss-20b", object: "model", created: 1721235600, owned_by: "groq" },
      { id: "qwen/qwen3.8-27b", object: "model", created: 1721235600, owned_by: "groq" },
      { id: "gemma-4-26b-it", object: "model", created: 1721235600, owned_by: "google" },
      { id: "gemma-4-26b-a4b-it", object: "model", created: 1721235600, owned_by: "google" },
      { id: "gemma-4-31b-it", object: "model", created: 1721235600, owned_by: "google" },
      { id: "codestral-2508", object: "model", created: 1721235600, owned_by: "mistral" },
      { id: "ministral-8b-2512", object: "model", created: 1721235600, owned_by: "mistral" },
      { id: "ministral-14b-2512", object: "model", created: 1721235600, owned_by: "mistral" },
      { id: "mistral-large-2512", object: "model", created: 1721235600, owned_by: "mistral" },
      { id: "gpt-4o", object: "model", created: 1715368132, owned_by: "system" },
      { id: "gpt-4o-mini", object: "model", created: 1721235600, owned_by: "system" },
      { id: "text-embedding-3-small", object: "model", created: 1705948997, owned_by: "system" },
    ],
  });
});

openaiApp.get("/models/:model", (c) => {
  const modelId = c.req.param("model");
  return c.json({
    id: modelId,
    object: "model",
    created: 1715368132,
    owned_by: "system",
  });
});

// =========================================================================
// GET /audit/events (Compliance SIEM Telemetry Query Endpoint)
// =========================================================================
openaiApp.get("/audit/events", (c) => {
  const limitParam = c.req.query("limit");
  const sessionId = c.req.query("sessionId") || c.req.query("session_id");
  const eventType = c.req.query("eventType") || c.req.query("event_type");

  const limit = limitParam ? parseInt(limitParam, 10) : 50;
  const events = getRecentAuditEvents({ limit, sessionId, eventType });

  return c.json({
    object: "list",
    total: events.length,
    data: events,
  });
});

// =========================================================================
// Native Google AI Studio Endpoint: POST /v1beta/models/:action
// Supports Google GenAI SDK (google.generativeai, @google/genai)
// =========================================================================
openaiApp.post("/v1beta/models/:action{.+}", async (c) => {
  const startTime = performance.now();
  const actionParam = c.req.param("action");

  let body: any;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: { message: "Invalid JSON body", code: 400 } }, 400);
  }

  const customKeywords = resolveCustomKeywords(c);
  const categories = resolveCategories(c);
  const mode = resolveMode(c);
  const combinedTokenMap: Record<string, string> = {};
  let totalEntities = 0;

  // Sanitize native Gemini contents array
  if (body && Array.isArray(body.contents)) {
    for (const item of body.contents) {
      if (item && Array.isArray(item.parts)) {
        for (const part of item.parts) {
          if (part && typeof part.text === "string") {
            const result = tokenize(part.text, { customKeywords, mode, categories });
            part.text = result.sanitizedText;
            Object.assign(combinedTokenMap, result.tokenMap);
            totalEntities += result.count;
          }
        }
      }
    }
  }

  // Sanitize native systemInstruction if present
  if (body?.systemInstruction && Array.isArray(body.systemInstruction.parts)) {
    for (const part of body.systemInstruction.parts) {
      if (part && typeof part.text === "string") {
        const result = tokenize(part.text, { customKeywords, mode, categories });
        part.text = result.sanitizedText;
        Object.assign(combinedTokenMap, result.tokenMap);
        totalEntities += result.count;
      }
    }
  }

  const engineLatencyUs = Math.round((performance.now() - startTime) * 1000);
  const sessionId = `sess_gemini_${Math.random().toString(36).substring(2, 12)}`;

  const urlObj = new URL(c.req.raw.url);
  const queryStr = urlObj.search || "";
  const upstreamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${actionParam}${queryStr}`;

  const authHeader = c.req.header("Authorization");
  const googKey = c.req.header("x-goog-api-key");
  const apiKeyRecord = (c as any).get("apiKeyRecord");
  const byokGoogleKey = apiKeyRecord?.byok_google_key;
  const isUserKey = Boolean(authHeader || googKey || byokGoogleKey);

  // Enforce Free Tier Rate Limit: 1 protected request per 15 seconds
  const isFreeTier = isFreeTierRequest(c, apiKeyRecord, isUserKey);

  if (isFreeTier) {
    const clientId = resolveClientIdentifier(c, apiKeyRecord);
    const rateLimit = await checkFreeTierRateLimit(clientId, c.env, {
      bypassTest: c.req.header("x-test-bypass-rate-limit") === "true",
    });
    if (!rateLimit.allowed) {
      return c.json(
        createRateLimitErrorPayload(rateLimit.retryAfterSec),
        429,
        getRateLimitHeaders(rateLimit.retryAfterSec)
      );
    }
  }

  const forwardHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (authHeader) forwardHeaders["Authorization"] = authHeader;
  if (googKey) {
    forwardHeaders["x-goog-api-key"] = googKey;
  } else if (byokGoogleKey) {
    forwardHeaders["x-goog-api-key"] = byokGoogleKey;
  }

  // If user hasn't provided their own key, provide platform Gemini key
  if (!authHeader && !googKey && !byokGoogleKey) {
    const geminiKey =
      (c.env as any)?.GEMINI_API_KEY ||
      (globalThis as any).process?.env?.GEMINI_API_KEY ||
      DEFAULT_PLATFORM_KEYS.gemini;
    if (geminiKey) {
      forwardHeaders["x-goog-api-key"] = geminiKey;
    }
  }

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: forwardHeaders,
      body: JSON.stringify(body),
    });
  } catch (fetchErr: any) {
    return c.json(
      { error: { message: `Failed to connect to Google AI Studio: ${fetchErr?.message}`, code: 502 } },
      502
    );
  }

  if (!upstreamRes.ok) {
    const errorText = await upstreamRes.text();
    return c.text(errorText, upstreamRes.status as any, {
      "Content-Type": upstreamRes.headers.get("content-type") || "application/json",
    });
  }

  const isStreaming = actionParam.includes("streamGenerateContent") ||
                      upstreamRes.headers.get("content-type")?.includes("text/event-stream");

  const privacyHeaders: Record<string, string> = {
    "x-privacy-gateway": "ai-privacy-core",
    "x-privacy-session-id": sessionId,
    "x-privacy-entities-intercepted": String(totalEntities),
    "x-privacy-latency-us": String(engineLatencyUs),
  };

  if (isStreaming) {
    if (!upstreamRes.body) return c.json({ error: "Empty stream body" }, 500);

    if (Object.keys(combinedTokenMap).length === 0) {
      return new Response(upstreamRes.body, {
        status: 200,
        headers: { ...privacyHeaders, "Content-Type": "text/event-stream" },
      });
    }

    const reader = upstreamRes.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const tokenBuffer = new StreamTokenBuffer(combinedTokenMap);
    let sseBuffer = "";

    const transformedStream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              const leftover = tokenBuffer.flush();
              if (leftover) {
                const chunkObj = { candidates: [{ content: { parts: [{ text: leftover }] } }] };
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkObj)}\n\n`));
              }
              controller.close();
              break;
            }
            sseBuffer += decoder.decode(value, { stream: true });
            const lines = sseBuffer.split(/\r?\n/);
            sseBuffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const chunkJson = JSON.parse(line.slice(6));
                  if (chunkJson.candidates && Array.isArray(chunkJson.candidates)) {
                    for (const cand of chunkJson.candidates) {
                      if (cand.content?.parts && Array.isArray(cand.content.parts)) {
                        for (const part of cand.content.parts) {
                          if (typeof part.text === "string") {
                            part.text = tokenBuffer.processChunk(part.text);
                          }
                        }
                      }
                    }
                  }
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunkJson)}\n\n`));
                } catch {
                  controller.enqueue(encoder.encode(`${line}\n`));
                }
              } else {
                controller.enqueue(encoder.encode(`${line}\n`));
              }
            }
          }
        } catch (err) {
          controller.error(err);
        }
      },
      cancel() {
        reader.cancel();
      },
    });

    return new Response(transformedStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        ...privacyHeaders,
      },
    });
  }

  // Non-streaming response rehydration
  const geminiData: any = await upstreamRes.json();
  if (geminiData.candidates && Array.isArray(geminiData.candidates)) {
    for (const cand of geminiData.candidates) {
      if (cand.content?.parts && Array.isArray(cand.content.parts)) {
        for (const part of cand.content.parts) {
          if (typeof part.text === "string") {
            part.text = rehydrate(part.text, combinedTokenMap);
          }
        }
      }
    }
  }

  return c.json(geminiData, 200, privacyHeaders);
});

export default openaiApp;
