import { Hono } from "hono";
import { cors } from "hono/cors";
import tokenizationApp from "./routes/tokenization";
import openaiApp from "./routes/openai";

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

// Mount Data De-identification & Reversible Tokenization Engine on /v1
app.route("/v1", tokenizationApp);

// Mount Drop-In OpenAI Wire-Compatible Gateway on /v1 and / (for root baseURL configs)
app.route("/v1", openaiApp);
app.route("/", openaiApp);

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    version: "2.0.0",
    features: ["de-identification", "detokenization", "openai-proxy", "streaming-sse", "embeddings"],
  });
});

app.get("/", (c) => {
  return c.text("AI Privacy Core — Sovereign De-identification & Reversible Tokenization Gateway is active.");
});

export default app;
