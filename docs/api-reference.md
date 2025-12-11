---
sidebar_position: 10
---

# API Reference (Key Endpoints)

High-level contracts for primary REST endpoints. All requests are tenant-scoped via hostname and bearer JWT; server enforces `tenant_id` in queries.

## Auth

- `POST /auth/login` — body: `{ email, password }`; returns `{ token, user, tenant }`.
- `GET /me` — returns current user profile and role.

## Tenants

- `POST /tenants` — create tenant (admin only).
- `GET /tenants/:id` — view tenant settings/branding.
- `PATCH /tenants/:id` — update branding/domain settings.

## Users

- `POST /users` — create user with role (admin).
- `GET /users` — list users by tenant.
- `PATCH /users/:id` — update role/status.

## Students & Instructors

- `POST /students` — create student.
- `GET /students` — list with filters (`classId`, `belt`, `status`).
- `PATCH /students/:id` — update profile/belt.
- `POST /instructors` — create instructor profile; link to user if needed.

## Classes & Schedules

- `POST /classes` — create class/schedule.
- `GET /classes` — list by day/instructor/location.
- `PATCH /classes/:id` — update class or capacity.

## Attendance (QR)

- `POST /qr` — generate signed token/URL for a student; body: `{ studentId }`.
- `POST /attendance/scan` — body: `{ token, classId? }`; verifies and records scan.
- `GET /attendance` — query by `studentId`, `classId`, date range.

## Promotions

- `POST /promotions/check` — body: `{ studentId }`; returns eligibility info.
- `POST /promotions/promote` — body: `{ studentId, newBelt, notes }`; admin/instructor.
- `GET /promotions/history?studentId=...` — returns promotion timeline.

## Errors

- Standard shape: `{ error: { code, message, details? } }`.
- Common codes: `401` (unauthenticated), `403` (forbidden), `404` (not found), `409` (conflict/duplicate), `422` (validation), `500` (server).
