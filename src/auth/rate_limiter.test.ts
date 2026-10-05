import { describe, it, expect, beforeEach } from "vitest";
import {
  DEFAULT_PLATFORM_KEYS,
  isFreeTierRequest,
  checkFreeTierRateLimit,
  checkProTierRateLimit,
  clearRateLimits,
  createRateLimitErrorPayload,
  getRateLimitHeaders,
} from "./rate_limiter";

describe("Free Tier Rate Limiter & Upstream Provider Keys", () => {
  beforeEach(() => {
    clearRateLimits();
    (globalThis as any).__DISABLE_RATE_LIMIT__ = false;
  });

  it("should provide pre-configured platform keys for all supported services", () => {
    expect(DEFAULT_PLATFORM_KEYS.groq.startsWith("gsk_")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.gemini.startsWith("AQ.")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.openrouter.startsWith("sk-or-v1-")).toBe(true);
    expect(DEFAULT_PLATFORM_KEYS.mistral.startsWith("mstrl_")).toBe(true);
  });

  it("should identify free tier vs paid tier accurately", () => {
    const fakeContext = {} as any;

    // Anonymous or missing key => free tier
    expect(isFreeTierRequest(fakeContext, undefined, false)).toBe(true);

    // Free tier SPG key => free tier
    expect(isFreeTierRequest(fakeContext, { tier: "free" }, false)).toBe(true);

    // Pro or enterprise SPG key => NOT free tier
    expect(isFreeTierRequest(fakeContext, { tier: "pro" }, false)).toBe(false);
    expect(isFreeTierRequest(fakeContext, { tier: "enterprise" }, false)).toBe(false);

    // User brought their own direct upstream key => NOT free tier
    expect(isFreeTierRequest(fakeContext, undefined, true)).toBe(false);
  });

  it("should allow first request and enforce 1 request per 15 seconds rate limit", async () => {
    const clientId = "client_test_user_1";

    // 1st request -> Allowed
    const firstRes = await checkFreeTierRateLimit(clientId);
    expect(firstRes.allowed).toBe(true);
    expect(firstRes.remainingRequests).toBe(1);

    // 2nd request immediately after -> Rejected with 429 Retry-After
    const secondRes = await checkFreeTierRateLimit(clientId);
    expect(secondRes.allowed).toBe(false);
    expect(secondRes.remainingRequests).toBe(0);
    expect(secondRes.retryAfterSec).toBeGreaterThan(0);
    expect(secondRes.retryAfterSec).toBeLessThanOrEqual(15);

    // Different client -> Allowed
    const otherClientRes = await checkFreeTierRateLimit("client_test_user_2");
    expect(otherClientRes.allowed).toBe(true);
  });

  it("should generate standard rate limit error payload and headers", () => {
    const errorPayload = createRateLimitErrorPayload(14);
    expect(errorPayload.error.type).toBe("rate_limit_error");
    expect(errorPayload.error.code).toBe("rate_limit_exceeded");
    expect(errorPayload.error.retry_after).toBe(14);
    expect(errorPayload.error.message).toContain("1 protected request per 15 seconds");

    const headers = getRateLimitHeaders(14);
    expect(headers["Retry-After"]).toBe("14");
    expect(headers["x-ratelimit-limit"]).toBe("1");
    expect(headers["x-ratelimit-period"]).toBe("15s");
    expect(headers["x-ratelimit-reset"]).toBe("14");
  });

  it("should allow first request and enforce 1 request per 5 seconds rate limit for Pro tier", async () => {
    const clientId = "client_pro_user_1";

    // 1st request -> Allowed
    const firstRes = await checkProTierRateLimit(clientId);
    expect(firstRes.allowed).toBe(true);
    expect(firstRes.remainingRequests).toBe(1);
    expect(firstRes.tier).toBe("pro");

    // 2nd request immediately after -> Rejected with 429 Retry-After
    const secondRes = await checkProTierRateLimit(clientId);
    expect(secondRes.allowed).toBe(false);
    expect(secondRes.remainingRequests).toBe(0);
    expect(secondRes.retryAfterSec).toBeGreaterThan(0);
    expect(secondRes.retryAfterSec).toBeLessThanOrEqual(5);

    // Different client -> Allowed
    const otherClientRes = await checkProTierRateLimit("client_pro_user_2");
    expect(otherClientRes.allowed).toBe(true);
  });

  it("should generate Pro tier rate limit error payload and headers", () => {
    const errorPayload = createRateLimitErrorPayload(4, "pro");
    expect(errorPayload.error.type).toBe("rate_limit_error");
    expect(errorPayload.error.code).toBe("rate_limit_exceeded");
    expect(errorPayload.error.retry_after).toBe(4);
    expect(errorPayload.error.tier).toBe("pro");
    expect(errorPayload.error.message).toContain("1 protected request per 5 seconds");
    expect(errorPayload.error.message).toContain("Pro tier rate limit exceeded");

    const headers = getRateLimitHeaders(4, "pro");
    expect(headers["Retry-After"]).toBe("4");
    expect(headers["x-ratelimit-limit"]).toBe("1");
    expect(headers["x-ratelimit-period"]).toBe("5s");
    expect(headers["x-ratelimit-reset"]).toBe("4");
  });
});
