---
sidebar_position: 13
---

# Security & Compliance

Principles and controls to keep tenants isolated and data protected.

## Authentication & Authorization

- JWT with `sub`, `tenantId`, `role`, `exp`; short-lived access tokens.
- RBAC allowlists per route; deny by default.
- Tenant resolution from hostname; reject when token tenant ≠ hostname tenant.

## Data isolation

- `tenant_id` required on all transactional tables; composite uniques include `tenant_id`.
- Prisma queries enforced through helpers that inject `tenant_id`.
- No client-supplied tenant IDs accepted at the service layer.

## Transport & platform

- HTTPS everywhere; secure cookies if used.
- CORS restricted to trusted frontend origins.
- Rate limits on auth and scan endpoints.
- Secrets managed via platform vault; rotate `JWT_SECRET` periodically.

## Logging & privacy

- Redact PII; avoid logging tokens/QR payloads.
- Include `tenant` and `requestId` for traceability.

## Reviews & testing

- Security review for auth flows, QR signing/validation, and tenant scoping.
- Tests for negative access (other-tenant fixtures) and replay attempts.
- Regular dependency checks (npm audit or similar).
