---
sidebar_position: 8
---

# Environment Setup

How to configure local, staging, and production environments consistently.

## Requirements

- Node.js 20+; npm/pnpm.
- PostgreSQL 14+.
- Angular CLI (for frontend) if not using project-local scripts.

## Environment variables

- **Backend:** `DATABASE_URL`, `JWT_SECRET`, `APP_ENV`, `PORT`, optional `CORS_ORIGINS`, `LOG_LEVEL`, `SENTRY_DSN`.
- **Frontend:** `API_BASE_URL`, `APP_DOMAIN`, optional analytics/feature flags.

## Local workflow

- Set `/etc/hosts` for tenant subdomains (e.g., `127.0.0.1 golden-tiger.localhost`).
- Run migrations: `npm run prisma:migrate` (backend).
- Seed a tenant and admin user (script or SQL) with `tenant_id`.
- Start services: backend `npm run dev`; frontend `npm run start` (or `ng serve`).

## Staging / Production

- Dedicated Postgres instances; enforce SSL where required.
- Secrets managed in platform vault (Vercel/Render/Railway).
- Match domains and subdomains to tenant slugs; verify TLS.
- Enable observability (logs, metrics, alerts) before go-live.
