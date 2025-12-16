---
sidebar_position: 2
---

# Authentication & Security

Security hinges on two invariants: **every request is tenant-scoped**, and **every user action is authorized via role-based checks**.

## Authentication

- **JWT:** Issued on login, signed with `JWT_SECRET`, contains `sub` (user ID), `tenantId`, `role`, and expiration.
- **Transport:** Bearer token in `Authorization` header; never accept tokens via query params.
- **Token invalidation:** Short-lived access tokens. For more details, see the [Refresh Token Flow](./refresh-token.md).

### Login Request

`POST /api/auth/login`

```json
{
  "email": "sensei@demodojo.com",
  "password": "password123",
  "tenantSlug": "demo-dojo"
}
```

### Login Response

A `refreshToken` is set as an `httpOnly` cookie.

```json
{
  "accessToken": "...",
  "user": {
    "id": "...",
    "email": "sensei@demodojo.com",
    "role": "admin"
  }
}
```

### Refresh Request

`POST /api/auth/refresh`

The browser automatically sends the `refreshToken` cookie.

### Refresh Response

```json
{
  "accessToken": "..."
}
```

### Sample middleware shape

```ts
type AuthContext = { userId: string; tenantId: string; role: string };

function authMiddleware(req, res, next) {
  const token = extractBearer(req.headers.authorization);
  const payload = verifyJwt(token);
  assertTenantMatch(payload.tenantId, resolveTenantFromHost(req.hostname));
  req.auth = { userId: payload.sub, tenantId: payload.tenantId, role: payload.role } satisfies AuthContext;
  return next();
}
```

## Authorization (RBAC)

- Roles: `admin`, `instructor`, `assistant`, `student` (extendable).
- Route guards map roles → allowed actions; keep checks centralized to avoid drift.
- Favor **allowlists** over deny lists; reject by default.

Example:

```ts
const can = {
  admin: ['*'],
  instructor: ['attendance:write', 'attendance:read', 'students:read'],
  assistant: ['attendance:write', 'students:read'],
  student: ['attendance:self', 'profile:read'],
};
```

## Request validation

- Validate payloads at the edge (e.g., Zod schemas) before hitting services.
- Enforce strict types on IDs and dates to prevent injection and timezone bugs.
- Reject unknown fields to avoid accidental persistence of unscoped data.

## Transport security

- Enforce HTTPS everywhere; secure cookies for any web sessions.
- Set CORS to allow only trusted frontend origins.
- Add `helmet` or equivalent middleware for basic headers (HSTS, no sniff, frameguard).

## Auditing

- Log `{ tenant, userId, action, entity, status, requestId }`.
- Record promotion decisions and attendance events with immutable audit trails.
- Avoid logging secrets or tokens; redact PII when feasible.
