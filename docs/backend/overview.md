---
sidebar_position: 1
---

# Backend Overview

The TatamiTech backend is a Node.js + Express + TypeScript service that exposes REST APIs for tenants, users, attendance, and belt progression. Prisma handles data access to a shared PostgreSQL database with strict tenant scoping.

## Service boundaries

- **API gateway/app:** Express server with middleware for tenant resolution, authentication, and request validation.
- **Modules:** Auth, Tenants, Users, Students, Classes/Schedules, Attendance, Promotions, and QR generation.
- **Data layer:** Prisma client with centralized helpers to enforce `tenant_id` on all queries.
- **Async work:** Optional job runners/workers for bulk notifications or promotion batch checks.

## Standards

- **Auth:** JWT (signed with `JWT_SECRET`), bearer tokens in `Authorization` header.
- **RBAC:** Roles (`admin`, `instructor`, `assistant`, `student`) mapped to route-level permissions.
- **Validation:** Zod/validator middleware for input schemas (exact library may vary by implementation).
- **Observability:** Structured logs including `tenant`, `userId`, `path`, and correlation/request IDs.

## Example request lifecycle

1. **Resolve tenant** from hostname.
2. **Authenticate** JWT and attach user + `tenant_id`.
3. **Authorize** based on role/permissions for the route.
4. **Handle** the request via service layer; Prisma queries scoped by `tenant_id`.
5. **Respond** with JSON; errors normalized with consistent shape and HTTP status codes.

## API surface (high level)

- `POST /auth/login` — authenticate and return JWT scoped to tenant.
- `GET /me` — profile/role for the current user.
- `CRUD /tenants` — create/manage tenants (admin only).
- `CRUD /students` — manage students, belts, notes.
- `CRUD /classes` — manage class schedule and attendance expectations.
- `POST /attendance/scan` — verify QR payload and log attendance.
- `POST /promotions/check` — calculate eligibility for belt exams.
- `POST /qr` — generate QR tokens/URLs for student check-in.

## Error handling

- Use consistent JSON errors: `{ error: { code, message, details? } }`.
- Differentiate auth errors (401), permission errors (403), validation (400), not found (404), and server errors (500).
- Include `tenant` and `requestId` in logs to trace incidents across services.
