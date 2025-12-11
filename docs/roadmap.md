---
sidebar_position: 7
---

# Roadmap & Timeline

A pragmatic sequence to ship TatamiTech to production. Time frames are indicative per phase; adjust based on team capacity.

## Phase 0 — Foundations (Week 0)
- Confirm domain model and tenant slug conventions.
- Finalize environment config (`APP_DOMAIN`, `DATABASE_URL`, secrets).
- CI/CD skeleton for frontend (Vercel) and backend (Railway/Render).

## Phase 1 — Multitenant Core (Weeks 1-2)
- Implement hostname-based tenant resolution and request context injection.
- Enforce `tenant_id` on Prisma schema; add unique constraints per tenant (students, users).
- Auth + RBAC: JWT issuance/verification and role guards.
- Seed initial tenant (Golden Tiger) and admin user.

## Phase 2 — Academy Management (Weeks 2-3)
- CRUD for students, instructors, classes/schedules.
- Tenant-scoped search/list endpoints with pagination.
- Basic reporting (counts per class, active students).

## Phase 3 — QR Attendance (Weeks 3-4)
- QR generation endpoint with signed, short-lived tokens.
- Scan handler: validate token, tenant match, status checks; record attendance.
- Reception UI for scanning and confirmations; anti-replay safeguards.
- Audit logs for failed/successful scans.

## Phase 4 — Belt Progression (Weeks 4-5)
- Rule engine: attendance thresholds + time-in-rank per belt, per tenant.
- Eligibility check endpoint and UI indicators.
- Promotion action with audit trail (actor, notes).

## Phase 5 — UX & Branding (Weeks 5-6)
- Tenant theming (logo/colors) on dashboard and landing.
- Accessibility and responsive polish for key flows (login, roster, attendance).
- Content and onboarding guides for new tenants.

## Phase 6 — Hardening & Observability (Weeks 6-7)
- Health/readiness endpoints; uptime monitors.
- Structured logging with tenant slug; basic metrics (RPS, latency, errors).
- Rate limits and CORS hardening; security review of auth flows.
- Backup/restore runbook for PostgreSQL.

## Phase 7 — Launch Readiness (Weeks 7-8)
- Load test critical endpoints (auth, attendance scan, roster list).
- Data migration/seed checklist for new tenants.
- Run acceptance tests with Golden Tiger and sign off.
- Go-live: production deploy, smoke tests, alerting in place.

## Post-launch — Iteration
- Payments/billing automation per tenant.
- Mobile-friendly scan UI and offline-safe attendance caching.
- Analytics exports and webhook integrations for CRMs.
