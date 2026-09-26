/**
 * API Key Authentication, Rate Limiting & Usage Metering Module
 * Securely hashes keys with SHA-256 (raw keys are never stored).
 * Supports Cloudflare D1 SQL storage with an ultra-fast in-memory cache.
 */

import { Context, Next } from "hono";

export interface ApiKeyRecord {
  id: string;
  key_prefix: string;
  name: string;
  tier: "free" | "pro" | "enterprise";
  monthly_quota: number;
  requests_used: number;
  is_active: number;
  created_at: string;
}

export interface ApiKeyValidationResult {
  valid: boolean;
  error?: string;
  statusCode?: number;
  record?: ApiKeyRecord;
}

// In-memory cache for edge performance across invocations on the same isolate
const inMemoryKeyCache = new Map<string, { record: ApiKeyRecord; cachedAt: number }>();
const CACHE_TTL_MS = 60_000; // 1 minute

// Local fallback store for environments without Cloudflare D1 binding
const localKeyStore = new Map<string, ApiKeyRecord>();

/**
 * Hash raw API key with SHA-256 using standard Web Crypto
 */
export async function hashApiKey(key: string): Promise<string> {
  const cryptoObj = (globalThis as any).crypto;
  const encoder = new TextEncoder();
  const data = encoder.encode(key.trim());
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate a cryptographically secure API key
 * Format: spg_live_<32 hex chars>
 */
export function generateRawKey(isTest = false): string {
  const cryptoObj = (globalThis as any).crypto;
  const bytes = new Uint8Array(24);
  cryptoObj.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const prefix = isTest ? "spg_test_" : "spg_live_";
  return `${prefix}${hex}`;
}

/**
 * Create a new API key record
 */
export async function createApiKey(
  name: string,
  tier: "free" | "pro" | "enterprise" = "free",
  monthlyQuota: number = 10_000,
  env: any
): Promise<{ rawKey: string; record: ApiKeyRecord }> {
  const rawKey = generateRawKey(tier === "free" && name.toLowerCase().includes("test"));
  const keyHash = await hashApiKey(rawKey);
  const keyPrefix = rawKey.slice(0, 14) + "...";
  const id = `key_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();

  const record: ApiKeyRecord = {
    id,
    key_prefix: keyPrefix,
    name: name.trim() || "Default Key",
    tier,
    monthly_quota: monthlyQuota,
    requests_used: 0,
    is_active: 1,
    created_at: createdAt,
  };

  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      await db
        .prepare(
          `INSERT INTO api_keys (id, key_hash, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, keyHash, keyPrefix, record.name, tier, monthlyQuota, 0, 1, createdAt)
        .run();
    } catch {
      // If table doesn't exist yet, attempt creation on the fly
      await db
        .prepare(
          `CREATE TABLE IF NOT EXISTS api_keys (
             id TEXT PRIMARY KEY,
             key_hash TEXT UNIQUE NOT NULL,
             key_prefix TEXT NOT NULL,
             name TEXT NOT NULL,
             tier TEXT DEFAULT 'free',
             monthly_quota INTEGER DEFAULT 10000,
             requests_used INTEGER DEFAULT 0,
             is_active INTEGER DEFAULT 1,
             created_at DATETIME DEFAULT CURRENT_TIMESTAMP
           )`
        )
        .run();

      await db
        .prepare(
          `INSERT INTO api_keys (id, key_hash, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(id, keyHash, keyPrefix, record.name, tier, monthlyQuota, 0, 1, createdAt)
        .run();
    }
  }

  // Update in-memory stores
  localKeyStore.set(keyHash, record);
  inMemoryKeyCache.set(keyHash, { record, cachedAt: Date.now() });

  return { rawKey, record };
}

/**
 * Validate an API key and increment usage counter
 */
export async function validateApiKey(rawKey: string, env: any): Promise<ApiKeyValidationResult> {
  if (!rawKey || typeof rawKey !== "string") {
    return { valid: false, error: "API key is required", statusCode: 401 };
  }

  const keyHash = await hashApiKey(rawKey);

  // 1. Check in-memory cache
  let record: ApiKeyRecord | undefined;
  const cached = inMemoryKeyCache.get(keyHash);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    record = cached.record;
  }

  // 2. Check D1 if bound
  const db = env?.DB;
  if (!record && db && typeof db.prepare === "function") {
    try {
      const res = await db
        .prepare(`SELECT * FROM api_keys WHERE key_hash = ? AND is_active = 1 LIMIT 1`)
        .bind(keyHash)
        .first();
      if (res) {
        record = {
          id: res.id,
          key_prefix: res.key_prefix,
          name: res.name,
          tier: res.tier,
          monthly_quota: res.monthly_quota,
          requests_used: res.requests_used,
          is_active: res.is_active,
          created_at: res.created_at,
        };
        inMemoryKeyCache.set(keyHash, { record, cachedAt: Date.now() });
      }
    } catch {
      // D1 query failed, proceed to local fallback
    }
  }

  // 3. Fallback to local store
  if (!record) {
    record = localKeyStore.get(keyHash);
  }

  if (!record || !record.is_active) {
    return { valid: false, error: "Invalid or revoked API key", statusCode: 401 };
  }

  // Check quota
  if (record.requests_used >= record.monthly_quota) {
    return {
      valid: false,
      error: `Monthly request quota exceeded (${record.requests_used}/${record.monthly_quota}). Please upgrade your plan.`,
      statusCode: 429,
    };
  }

  // Increment usage counter
  record.requests_used += 1;
  if (db && typeof db.prepare === "function") {
    db.prepare(`UPDATE api_keys SET requests_used = requests_used + 1 WHERE key_hash = ?`)
      .bind(keyHash)
      .run()
      .catch(() => {});
  }

  return { valid: true, record };
}

/**
 * List all API keys (without sensitive hashes)
 */
export async function listApiKeys(env: any): Promise<ApiKeyRecord[]> {
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      const res = await db
        .prepare(`SELECT id, key_prefix, name, tier, monthly_quota, requests_used, is_active, created_at FROM api_keys ORDER BY created_at DESC`)
        .all();
      if (res && Array.isArray(res.results)) {
        return res.results as ApiKeyRecord[];
      }
    } catch {
      // fallback to local store
    }
  }
  return Array.from(localKeyStore.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Revoke an API key by ID
 */
export async function revokeApiKey(id: string, env: any): Promise<boolean> {
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      await db.prepare(`UPDATE api_keys SET is_active = 0 WHERE id = ?`).bind(id).run();
    } catch {
      // fallback
    }
  }

  for (const [hash, rec] of localKeyStore.entries()) {
    if (rec.id === id) {
      rec.is_active = 0;
      inMemoryKeyCache.delete(hash);
      return true;
    }
  }
  return true;
}

/**
 * Extract ProjectSPG API key from incoming request
 */
export function extractApiKey(c: Context): string | null {
  // Check header priority:
  // 1. x-spg-api-key
  // 2. x-api-key
  // 3. api-key
  const spgHeader = c.req.header("x-spg-api-key") || c.req.header("x-api-key") || c.req.header("api-key");
  if (spgHeader) return spgHeader.trim();

  // 4. Authorization header if it starts with spg_
  const auth = c.req.header("Authorization") || "";
  if (auth.startsWith("Bearer spg_")) {
    return auth.replace(/^Bearer\s+/i, "").trim();
  }

  // 5. Query parameter ?spg_api_key=...
  const queryKey = c.req.query("spg_api_key");
  if (queryKey) return queryKey.trim();

  return null;
}

/**
 * Hono Middleware for Optional or Required API Key verification
 */
export function createAuthMiddleware(options: { required?: boolean } = {}) {
  return async (c: Context, next: Next) => {
    const rawKey = extractApiKey(c);
    const requireKey =
      options.required ||
      (c.env as any)?.REQUIRE_API_KEY === "true" ||
      (globalThis as any).process?.env?.REQUIRE_API_KEY === "true";

    if (!rawKey) {
      if (requireKey) {
        return c.json(
          {
            error: {
              message: "Missing ProjectSPG API key. Provide via 'x-spg-api-key' header.",
              type: "unauthorized_error",
              code: "api_key_missing",
            },
          },
          401
        );
      }
      return next();
    }

    const validation = await validateApiKey(rawKey, c.env);
    if (!validation.valid) {
      return c.json(
        {
          error: {
            message: validation.error,
            type: validation.statusCode === 429 ? "rate_limit_error" : "unauthorized_error",
            code: validation.statusCode === 429 ? "quota_exceeded" : "invalid_api_key",
          },
        },
        validation.statusCode as any || 401
      );
    }

    // Attach key record to context for route handlers
    c.set("apiKeyRecord", validation.record);
    return next();
  };
}
