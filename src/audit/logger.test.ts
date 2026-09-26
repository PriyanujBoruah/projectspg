import { describe, it, expect, beforeEach } from "vitest";
import {
  recordAuditEvent,
  getRecentAuditEvents,
  clearAuditEvents,
} from "./logger";

describe("SIEM Audit Logger & Telemetry Engine", () => {
  beforeEach(() => {
    clearAuditEvents();
  });

  it("should record audit events and store in ring buffer", () => {
    const event = recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_audit_test_1",
      model: "gpt-4o",
      categoriesApplied: ["global"],
      entitiesCount: 2,
      entities: [
        { ruleId: "RULE_EMAIL", token: "EMAIL_1", fingerprint: "e3b0c44298fc1c14" },
        { ruleId: "RULE_CREDIT_CARD", token: "CARD_1", fingerprint: "a591a6d40bf42040" },
      ],
      engineLatencyUs: 92,
      kmsEncrypted: true,
      upstreamUrl: "https://api.openai.com/v1",
    });

    expect(event.eventId).toMatch(/^evt_/);
    expect(event.timestamp).toBeDefined();

    const events = getRecentAuditEvents();
    expect(events.length).toBe(1);
    expect(events[0].sessionId).toBe("sess_audit_test_1");
    expect(events[0].kmsEncrypted).toBe(true);
    expect(events[0].entities[0].fingerprint).toBe("e3b0c44298fc1c14");
  });

  it("should support filtering audit events by sessionId and eventType", () => {
    recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_alpha",
      categoriesApplied: ["global"],
      entitiesCount: 1,
      entities: [],
      engineLatencyUs: 50,
      kmsEncrypted: false,
    });

    recordAuditEvent({
      eventType: "RESPONSE_REHYDRATED",
      sessionId: "sess_alpha",
      categoriesApplied: ["global"],
      entitiesCount: 1,
      entities: [],
      engineLatencyUs: 20,
      kmsEncrypted: false,
    });

    recordAuditEvent({
      eventType: "PROMPT_INTERCEPTED",
      sessionId: "sess_beta",
      categoriesApplied: ["africa"],
      entitiesCount: 3,
      entities: [],
      engineLatencyUs: 110,
      kmsEncrypted: true,
    });

    const alphaEvents = getRecentAuditEvents({ sessionId: "sess_alpha" });
    expect(alphaEvents.length).toBe(2);

    const rehydratedEvents = getRecentAuditEvents({ eventType: "RESPONSE_REHYDRATED" });
    expect(rehydratedEvents.length).toBe(1);
    expect(rehydratedEvents[0].sessionId).toBe("sess_alpha");
  });
});
