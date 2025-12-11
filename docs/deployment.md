---
sidebar_position: 6
---

# Deployment

TatamiTech ships as two services (frontend on Vercel, backend on Railway/Render) backed by a managed PostgreSQL instance. This page describes environment setup and release guidelines.

## Environments

- **Preview:** Auto-built per PR for UI validation; uses ephemeral DB seeded with demo tenants.
- **Staging:** Mirrors production config with stable DB; used for integration and load tests.
- **Production:** Live traffic; strict change control and migrations.

## Configuration

### Backend

- `DATABASE_URL` — managed Postgres connection string.
- `JWT_SECRET` — strong, rotated secret.
- `APP_ENV` — `development|staging|production`.
- `PORT` — default 4000 (set by host).
- Optional: `CORS_ORIGINS`, `LOG_LEVEL`, `SENTRY_DSN`.

### Frontend

- `NEXT_PUBLIC_API_URL` — base URL of the backend.
- `NEXT_PUBLIC_APP_DOMAIN` — base domain to construct tenant subdomains.
- Optional: analytics keys and feature flags.

## Release steps (reference)

1. **Migrations:** Apply Prisma migrations to staging, then production. Ensure migrations enforce `tenant_id` constraints.
2. **Deploy backend:** Build and roll out to staging; run smoke tests (`/health`, login, attendance scan).
3. **Deploy frontend:** Promote the Vercel build after backend is healthy; verify tenant routing via subdomains.
4. **Post-deploy checks:** Validate QR scan flow and promotion eligibility for a seeded tenant.

## Playbook (staging → prod)

- Tag release in repo (e.g., `vX.Y.Z`).
- Deploy backend to staging; run automated tests + manual smoke (login, scan, promotion check).
- If clean, deploy backend to prod; monitor logs/metrics for 15–30 minutes.
- Deploy frontend; confirm subdomain routing and cached assets invalidate.
- Run acceptance with anchor tenant (Golden Tiger): scan success/fail paths, eligibility display.
- If issues: roll back to previous tag; disable affected routes via feature flag if available.

## Operational readiness

- **Health checks:** `/health` and `/ready` endpoints on the backend, monitored per environment.
- **Metrics:** Track request rates, error rates, DB performance, and tenant-level traffic.
- **Backups:** Enable automatic Postgres backups; document restore and point-in-time recovery.
- **Incident response:** Alerts on auth failures spikes, cross-tenant access attempts, and QR scan errors.
