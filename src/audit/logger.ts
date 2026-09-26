/**
 * Compliance-Grade SIEM Audit Logger & Telemetry Engine
 * Emits structured, non-PII audit events compatible with Datadog, Splunk,
 * AWS CloudWatch, and enterprise SIEM collectors.
 */

export interface AuditEntitySummary {
  ruleId: string;
  token: string;
  fingerprint: string; // First 16 chars of SHA-256 of original value (zero plaintext PII)
}

export interface AuditEvent {
  eventId: string;
  timestamp: string;
  eventType:
    | "PROMPT_INTERCEPTED"
    | "RESPONSE_REHYDRATED"
    | "EMBEDDING_SANITIZED"
    | "SESSION_PURGED"
    | "SESSION_SAVED";
  sessionId: string;
  model?: string;
  categoriesApplied: string[];
  entitiesCount: number;
  entities: AuditEntitySummary[];
  engineLatencyUs: number;
  kmsEncrypted: boolean;
  upstreamUrl?: string;
  statusCode?: number;
  metadata?: Record<string, any>;
}

// In-memory ring buffer of recent audit events for SIEM polling or dashboard queries
const MAX_RING_BUFFER_SIZE = 1000;
const auditRingBuffer: AuditEvent[] = [];

/**
 * Dispatches an audit event to the structured telemetry stream
 */
export function recordAuditEvent(
  event: Omit<AuditEvent, "eventId" | "timestamp"> & {
    eventId?: string;
    timestamp?: string;
  },
  executionCtx?: { waitUntil(p: Promise<unknown>): void }
): AuditEvent {
  const fullEvent: AuditEvent = {
    eventId: event.eventId || `evt_${Math.random().toString(36).substring(2, 12)}`,
    timestamp: event.timestamp || new Date().toISOString(),
    eventType: event.eventType,
    sessionId: event.sessionId,
    model: event.model,
    categoriesApplied: event.categoriesApplied || ["global"],
    entitiesCount: event.entitiesCount,
    entities: event.entities || [],
    engineLatencyUs: event.engineLatencyUs || 0,
    kmsEncrypted: Boolean(event.kmsEncrypted),
    upstreamUrl: event.upstreamUrl,
    statusCode: event.statusCode || 200,
    metadata: event.metadata,
  };

  // 1. Maintain in-memory ring buffer (FIFO)
  auditRingBuffer.push(fullEvent);
  if (auditRingBuffer.length > MAX_RING_BUFFER_SIZE) {
    auditRingBuffer.shift();
  }

  // 2. Structured JSON emission to stdout for SIEM log forwarders (Datadog, Splunk, CloudWatch)
  console.log(`[AI_PRIVACY_AUDIT] ${JSON.stringify(fullEvent)}`);

  // 3. Optional asynchronous webhook dispatch if configured
  const webhookUrl =
    (globalThis as any).process?.env?.AUDIT_WEBHOOK_URL ||
    (globalThis as any).__AUDIT_WEBHOOK_URL__;

  if (webhookUrl && typeof fetch === "function") {
    const dispatchTask = fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-audit-source": "ai-privacy-core" },
      body: JSON.stringify(fullEvent),
    }).catch(() => {
      // Non-blocking telemetry fallback
    });

    if (executionCtx && typeof executionCtx.waitUntil === "function") {
      try {
        executionCtx.waitUntil(dispatchTask);
      } catch {}
    }
  }

  return fullEvent;
}

/**
 * Retrieves recent audit events matching optional query filters
 */
export function getRecentAuditEvents(options?: {
  limit?: number;
  sessionId?: string;
  eventType?: string;
}): AuditEvent[] {
  let events = [...auditRingBuffer].reverse();

  if (options?.sessionId) {
    events = events.filter((e) => e.sessionId === options.sessionId);
  }

  if (options?.eventType) {
    events = events.filter((e) => e.eventType === options.eventType);
  }

  const limit = options?.limit && options.limit > 0 ? Math.min(options.limit, 100) : 50;
  return events.slice(0, limit);
}

/**
 * Clears the audit buffer (used for testing)
 */
export function clearAuditEvents(): void {
  auditRingBuffer.length = 0;
}
