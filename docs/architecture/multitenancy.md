---
sidebar_position: 2
---

# Multitenancy Model

TatamiTech uses a **shared database** with **logical isolation**. Every academy (tenant) is bound to a slug used in subdomains and enforced in the database and request pipeline.

## Tenant identification

- **Hostname-driven:** `goldentiger.tatamitech.com` → tenant slug `goldentiger`.
- **Fallback header (internal tools):** `X-Tenant` may be accepted for non-HTTP contexts (CLI, workers) but never replaces hostname checks in production.
- **JWT binding:** Tokens encode the user’s `tenant_id`; the backend rejects tokens that do not match the hostname-derived tenant.

## Schema requirements

- `tenant_id` is `NOT NULL` on all transactional tables.
- Foreign keys cascade deletes only when explicitly required (avoid cross-tenant deletions).
- Unique constraints must include `tenant_id` (e.g., student email).

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE students (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  belt_rank TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (tenant_id, email)
);
```

## Request scoping pipeline

1. **Extract tenant** from hostname; reject if unknown.
2. **Authenticate** JWT and resolve user → `tenant_id`.
3. **Enforce** hostname tenant = user tenant; reject on mismatch.
4. **Inject** `tenant_id` into the request context used by Prisma.
5. **Guard** every query with `where: { tenantId }`; never accept client-provided tenant IDs.

## Safety rails

- Central middleware owns tenant resolution; services must not accept raw tenant IDs from callers.
- Background jobs run with an explicit tenant context; batch jobs iterate tenants to prevent leakage.
- Logs include tenant slug to aid debugging and to surface anomalous cross-tenant access attempts.
- Add unit/integration tests for both positive and negative tenant scopes (e.g., “other tenant” fixtures).
