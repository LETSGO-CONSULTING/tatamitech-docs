---
sidebar_position: 12
---

# Observability

Baseline health checks, logging, metrics, and alerts for TatamiTech.

## Health & readiness

- `/health`: liveness (process up).
- `/ready`: readiness (DB reachable, migrations applied, essential services OK).
- Include tenant slug in response headers for debugging (non-sensitive).

## Logging

- Structured logs: `{ level, timestamp, tenant, userId, path, action, status, requestId }`.
- Redact PII/secrets; avoid logging tokens or QR payloads.
- Log auth failures, cross-tenant attempts, replay detections.

## Metrics

- Request rate, latency, error rate per endpoint.
- Attendance scan success/failure counts per tenant.
- Promotion evaluations and approvals/denials.
- DB metrics: query latency, slow query logs.

## Alerts

- Elevated 4xx/5xx rates, especially auth/scan endpoints.
- Cross-tenant access attempts above threshold.
- DB connectivity errors and migration failures.

## Tracing (optional)

- Correlate requests with `requestId`; propagate to logs.
- Trace critical paths: login, scan, promotions check.
