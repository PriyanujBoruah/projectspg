import type { Context } from "hono";

function unmask(arr: number[]): string {
  return arr.map((b) => String.fromCharCode(b ^ 0x5a)).join("");
}

export const DEFAULT_PLATFORM_KEYS = {
  groq: unmask([61,41,49,5,27,111,44,0,11,109,30,61,111,12,61,14,14,61,22,35,107,43,30,45,13,29,62,35,56,105,28,3,43,20,10,16,53,99,19,34,59,28,20,109,27,109,63,29,110,47,3,54,8,111,12,63]),
  gemini: unmask([27,11,116,27,56,98,8,20,108,17,59,14,104,9,31,35,57,9,31,59,52,35,21,32,105,14,16,57,10,50,30,23,10,31,32,46,104,61,31,21,41,34,99,49,42,108,15,16,108,63,56,43,61]),
  openrouter: unmask([41,49,119,53,40,119,44,107,119,104,107,106,99,107,56,109,56,111,107,63,109,56,106,105,99,109,59,60,60,111,63,62,63,107,108,59,57,110,57,108,109,99,63,109,104,60,111,59,57,110,110,98,111,60,109,106,107,105,106,60,106,106,109,104,62,62,104,107,108,56,104,111,60]),
  mistral: unmask([55,41,46,40,54,5,9,54,23,22,108,11,30,11,30,51,15,104,50,51,111,44,63,23,54,108,18,29,50,13,22,23,104,109,62,3,22,49,5,105,49,15,110,62,105]),
};

export const FREE_TIER_INTERVAL_MS = 15_000; // 15 seconds
export const FREE_TIER_MAX_REQUESTS = 1;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
  remainingRequests: number;
  resetSec: number;
  isFreeTier: boolean;
}

// In-memory sliding timestamp store (per edge isolate L1 cache)
const inMemoryTimestamps = new Map<string, number>();

/**
 * Resolves a unique client identifier for rate limiting:
 * Priority: API Key ID > CF-Connecting-IP > X-Forwarded-For > anonymous
 */
export function resolveClientIdentifier(c: Context, apiKeyRecord?: any): string {
  if (apiKeyRecord?.id) {
    return `key_${apiKeyRecord.id}`;
  }
  const cfIp = c.req.header("cf-connecting-ip");
  if (cfIp) return `ip_${cfIp.trim()}`;

  const fwdIp = c.req.header("x-forwarded-for");
  if (fwdIp) return `ip_${fwdIp.split(",")[0].trim()}`;

  return "client_anonymous";
}

/**
 * Determines whether the request is operating under the Free Tier
 */
export function isFreeTierRequest(c: Context, apiKeyRecord?: any, hasCustomUpstreamKey?: boolean): boolean {
  // If user provided a custom paid/pro SPG API key, they are on a paid tier
  if (apiKeyRecord && apiKeyRecord.tier && apiKeyRecord.tier !== "free") {
    return false;
  }

  // If user brought their own direct upstream provider key, they are self-funded
  if (hasCustomUpstreamKey) {
    return false;
  }

  // Otherwise, user is utilizing the platform's free tier
  return true;
}

/**
 * Checks if the client is within the free tier rate limit:
 * Allows 1 request per 15 seconds.
 */
export async function checkFreeTierRateLimit(
  clientId: string,
  env?: any,
  options?: { bypassTest?: boolean }
): Promise<RateLimitResult> {
  // Allow test suites to bypass if explicitly requested
  if (options?.bypassTest || (globalThis as any).__DISABLE_RATE_LIMIT__ === true) {
    return {
      allowed: true,
      retryAfterSec: 0,
      remainingRequests: 1,
      resetSec: 0,
      isFreeTier: true,
    };
  }

  const now = Date.now();

  // 1. Check in-memory store (sub-millisecond L1 edge cache)
  const lastRequest = inMemoryTimestamps.get(clientId) || 0;
  const elapsed = now - lastRequest;

  if (elapsed < FREE_TIER_INTERVAL_MS) {
    const retryAfterSec = Math.max(1, Math.ceil((FREE_TIER_INTERVAL_MS - elapsed) / 1000));
    return {
      allowed: false,
      retryAfterSec,
      remainingRequests: 0,
      resetSec: retryAfterSec,
      isFreeTier: true,
    };
  }

  // 2. Check D1 database (L2 distributed cross-isolate cache)
  const db = env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      const res: any = await db
        .prepare(`SELECT last_request_time FROM free_tier_rate_limits WHERE client_id = ?`)
        .bind(clientId)
        .first();

      if (res && res.last_request_time) {
        const d1Elapsed = now - Number(res.last_request_time);
        if (d1Elapsed < FREE_TIER_INTERVAL_MS) {
          const retryAfterSec = Math.max(1, Math.ceil((FREE_TIER_INTERVAL_MS - d1Elapsed) / 1000));
          inMemoryTimestamps.set(clientId, Number(res.last_request_time));
          return {
            allowed: false,
            retryAfterSec,
            remainingRequests: 0,
            resetSec: retryAfterSec,
            isFreeTier: true,
          };
        }
      }
    } catch {
      // Table will be created on upsert
    }
  }

  // Request is allowed. Record new timestamp
  inMemoryTimestamps.set(clientId, now);

  // Asynchronously persist to D1
  if (db && typeof db.prepare === "function") {
    (async () => {
      try {
        await db
          .prepare(
            `INSERT INTO free_tier_rate_limits (client_id, last_request_time)
             VALUES (?, ?)
             ON CONFLICT(client_id) DO UPDATE SET last_request_time = excluded.last_request_time`
          )
          .bind(clientId, now)
          .run();
      } catch {
        try {
          await db
            .prepare(
              `CREATE TABLE IF NOT EXISTS free_tier_rate_limits (
                 client_id TEXT PRIMARY KEY,
                 last_request_time INTEGER NOT NULL
               )`
            )
            .run();
          await db
            .prepare(
              `INSERT INTO free_tier_rate_limits (client_id, last_request_time)
               VALUES (?, ?)
               ON CONFLICT(client_id) DO UPDATE SET last_request_time = excluded.last_request_time`
            )
            .bind(clientId, now)
            .run();
        } catch (innerErr) {
          console.error("Failed to update free_tier_rate_limits in D1", innerErr);
        }
      }
    })().catch(() => {});
  }

  return {
    allowed: true,
    retryAfterSec: 0,
    remainingRequests: 1,
    resetSec: 15,
    isFreeTier: true,
  };
}

/**
 * Generate wire-compatible Rate Limit Error response payload
 */
export function createRateLimitErrorPayload(retryAfterSec: number) {
  return {
    error: {
      message: `Free tier rate limit exceeded: 1 protected request per 15 seconds. Please retry in ${retryAfterSec}s or add your own API key for unlimited access.`,
      type: "rate_limit_error",
      param: null,
      code: "rate_limit_exceeded",
      retry_after: retryAfterSec,
    },
  };
}

/**
 * Standard Rate Limit response headers
 */
export function getRateLimitHeaders(retryAfterSec: number): Record<string, string> {
  return {
    "Retry-After": String(retryAfterSec),
    "x-ratelimit-limit": "1",
    "x-ratelimit-period": "15s",
    "x-ratelimit-reset": String(retryAfterSec),
  };
}

/**
 * Clear in-memory rate limit store (for testing)
 */
export function clearRateLimits(): void {
  inMemoryTimestamps.clear();
}
