import { Hono } from "hono";
import { cors } from "hono/cors";
import tokenizationApp from "./routes/tokenization";
import openaiApp from "./routes/openai";
import { DASHBOARD_HTML } from "./dashboard";
import { BENCHMARK_BLOG_HTML } from "./blog_benchmark";
import { COUNTRIES_BLOG_HTML } from "./blog_countries";
import { INDUSTRIES_BLOG_HTML } from "./blog_industries";
import { STACK_BLOG_HTML } from "./blog_stack";
import {
  createApiKey,
  listApiKeys,
  revokeApiKey,
  createAuthMiddleware,
} from "./auth/keys";
import { getApiCallLogs } from "./audit/logger";
import { verifyFirebaseIdToken, FIREBASE_CONFIG } from "./auth/firebase";
import { LOGO_DATA_URIS, LOGO_FILES } from "./assets/logos";
import { BLOG_IMAGE_DATA_URIS, BLOG_IMAGE_FILES } from "./assets/images";

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

// Serve Single-File Enterprise Landing Page & Console
app.get("/", (c) => c.html(DASHBOARD_HTML));
app.get("/dashboard", (c) => c.html(DASHBOARD_HTML));

// Serve Technical Benchmark & Empirical Reliability Blog
app.get("/blog/benchmark", (c) => c.html(BENCHMARK_BLOG_HTML));
app.get("/test-results", (c) => c.html(BENCHMARK_BLOG_HTML));
app.get("/test-results.html", (c) => c.html(BENCHMARK_BLOG_HTML));

// Serve Global Sovereign AI Privacy & Supported Countries Blog
app.get("/blog/countries", (c) => c.html(COUNTRIES_BLOG_HTML));
app.get("/countries", (c) => c.html(COUNTRIES_BLOG_HTML));
app.get("/supported-countries", (c) => c.html(COUNTRIES_BLOG_HTML));

// Serve Enterprise Guardrails for Regulated Industries Blog
app.get("/blog/industries", (c) => c.html(INDUSTRIES_BLOG_HTML));
app.get("/industries", (c) => c.html(INDUSTRIES_BLOG_HTML));
app.get("/supported-industries", (c) => c.html(INDUSTRIES_BLOG_HTML));

// Serve Open Model AI Stack & Ranked Market Leader Blog
app.get("/blog/stack", (c) => c.html(STACK_BLOG_HTML));
app.get("/blog/comparison", (c) => c.html(STACK_BLOG_HTML));
app.get("/blog/best-ai-privacy", (c) => c.html(STACK_BLOG_HTML));
app.get("/stack", (c) => c.html(STACK_BLOG_HTML));
app.get("/comparison", (c) => c.html(STACK_BLOG_HTML));

// Mount API Key Authentication Middleware on /v1 routes
app.use("/v1/*", createAuthMiddleware());

// Mount Data De-identification & Reversible Tokenization Engine on /v1
app.route("/v1", tokenizationApp);

// Mount Drop-In OpenAI Wire-Compatible Gateway on /v1 and / (for root baseURL configs)
app.route("/v1", openaiApp);
app.route("/", openaiApp);

// =========================================================================
// API Key Management & Firebase Auth REST Endpoints
// =========================================================================
app.get("/api/config/firebase", (c) => {
  return c.json({ config: FIREBASE_CONFIG });
});

app.get("/api/auth/me", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader.startsWith("Bearer ")) {
    return c.json({ user: null });
  }
  const token = authHeader.slice(7).trim();
  const user = await verifyFirebaseIdToken(token);
  return c.json({ user });
});

app.get("/api/keys", async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  let userId: string | undefined = undefined;
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  const keys = await listApiKeys(c.env, userId);
  return c.json({ keys });
});

app.post("/api/keys", async (c) => {
  let body: any = {};
  try {
    body = await c.req.json();
  } catch {
    // empty body fallback
  }
  const authHeader = c.req.header("Authorization") || "";
  let userId = "anonymous";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(token);
    if (user) userId = user.uid;
  }
  const name = body.name || "Default Key";
  const tier = body.tier || "free";
  const quota = tier === "byok" ? 1_000_000 : (body.monthlyQuota || 10_000);
  const byokKeys = {
    googleKey: body.byokGoogleKey || body.byok_google_key || "",
    mistralKey: body.byokMistralKey || body.byok_mistral_key || "",
    groqKey: body.byokGroqKey || body.byok_groq_key || "",
  };
  const result = await createApiKey(name, tier, quota, c.env, userId, byokKeys);
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

// Serve static logo images for easy referencing across the app
app.get("/logos/:filename", (c) => {
  const filename = c.req.param("filename");
  const entry = Object.entries(LOGO_FILES).find(
    ([_, file]) => file.toLowerCase() === filename.toLowerCase()
  );
  if (entry) {
    const dataUri = LOGO_DATA_URIS[entry[0] as keyof typeof LOGO_DATA_URIS];
    const base64Data = dataUri.split(",")[1];
    const binary = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
    return new Response(binary, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  }
  return c.text("Logo not found", 404);
});

// Serve static blog illustration images
app.get("/images/:filename", (c) => {
  const filename = c.req.param("filename");
  const entry = Object.entries(BLOG_IMAGE_FILES).find(
    ([_, file]) => file.toLowerCase() === filename.toLowerCase()
  );
  if (entry) {
    const dataUri = BLOG_IMAGE_DATA_URIS[entry[0] as keyof typeof BLOG_IMAGE_DATA_URIS];
    const base64Data = dataUri.split(",")[1];
    const binary = Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
    return new Response(binary, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
  return c.text("Image not found", 404);
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
