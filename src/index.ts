import { Hono } from "hono";
import { cors } from "hono/cors";
import tokenizationApp from "./routes/tokenization";
import openaiApp from "./routes/openai";
import { DASHBOARD_HTML } from "./dashboard";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  createAuthMiddleware,
} from "./auth/keys";
import { getApiCallLogs } from "./audit/logger";

const app = new Hono();

// Enable CORS for all routes so browsers, local files, and documentation playgrounds can connect
app.use(
  "*",
  cors({
    origin: (origin) => origin || "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "api-key",
      "x-api-key",
      "x-spg-api-key",
      "x-detection-categories",
      "x-categories",
      "x-custom-entities",
      "x-custom-keywords",
      "x-tokenization-mode",
      "x-upstream-base-url",
      "x-upstream-url",
      "x-preserve-session",
      "x-vault-encryption-key",
      "OpenAI-Organization",
      "OpenAI-Project",
    ],
    exposeHeaders: [
      "Content-Length",
      "X-Kms-Status",
      "x-privacy-gateway",
      "x-privacy-session-id",
      "x-privacy-entities-intercepted",
      "x-privacy-latency-us",
      "x-privacy-mode",
    ],
    maxAge: 86400,
  })
);

app.options("*", (c) => c.body(null, 204));

// Serve Single-File Enterprise Dashboard
app.get("/dashboard", (c) => c.html(DASHBOARD_HTML));

// Mount API Key Authentication Middleware on /v1 routes
app.use("/v1/*", createAuthMiddleware());

// Mount Data De-identification & Reversible Tokenization Engine on /v1
app.route("/v1", tokenizationApp);

// Mount Drop-In OpenAI Wire-Compatible Gateway on /v1 and / (for root baseURL configs)
app.route("/v1", openaiApp);
app.route("/", openaiApp);

// =========================================================================
// API Key Management REST Endpoints (Dashboard / Administrative)
// =========================================================================
app.get("/api/keys", async (c) => {
  const keys = await listApiKeys(c.env);
  return c.json({ keys });
});

app.post("/api/keys", async (c) => {
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {
    // empty body fallback
  }
  const name = body.name || "Default Key";
  const tier = body.tier || "free";
  const quota = body.monthlyQuota || 10_000;
  const result = await createApiKey(name, tier, quota, c.env);
  return c.json(result, 201);
});

app.delete("/api/keys/:id", async (c) => {
  const id = c.req.param("id");
  await revokeApiKey(id, c.env);
  return c.json({ success: true, message: `API key ${id} revoked.` });
});

// =========================================================================
// API Request & Token Usage Logs (Identified by API Key)
// =========================================================================
app.get("/api/logs", async (c) => {
  const apiKeyId = c.req.query("api_key_id");
  const limit = Number(c.req.query("limit")) || 50;
  const logs = await getApiCallLogs({ apiKeyId, limit }, c.env);
  return c.json({ logs });
});

app.get("/v1/logs", async (c) => {
  const apiKeyRecord = (c as any).get("apiKeyRecord");
  const limit = Number(c.req.query("limit")) || 50;
  const logs = await getApiCallLogs({ apiKeyId: apiKeyRecord?.id, limit }, c.env);
  return c.json({ object: "list", data: logs });
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    version: "2.0.0",
    features: [
      "de-identification",
      "detokenization",
      "openai-proxy",
      "streaming-sse",
      "embeddings",
      "byok-kms",
      "siem-audit",
      "api-keys",
      "dashboard",
    ],
  });
});

app.get("/", (c) => {
  const accept = c.req.header("Accept") || "";
  if (accept.includes("text/html")) {
    return c.html(DASHBOARD_HTML);
  }
  return c.text("ProjectSPG — Sovereign Privacy Gateway & Edge De-identification is active. Visit /dashboard in your browser.");
});

export default app;
