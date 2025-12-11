---
sidebar_position: 2
---

# Getting Started

This page orients you on the TatamiTech stack, how to run it locally, and how to work with tenants from day one.

## Repository layout

- `tatamitech-frontend` — Angular (latest enterprise build) + Angular Material/CDK + TypeScript. Hosts the admin dashboard and public landing.
- `tatamitech-backend` — Node.js + Express + TypeScript + Prisma. Exposes REST APIs for auth, tenants, attendance, and promotion logic.
- `tatamitech-docs` — This Docusaurus site.

## Prerequisites

- Node.js 20+ and npm (or pnpm/yarn).
- PostgreSQL 14+ with a database dedicated to the environment you run.
- A `.env` per project with at least:
  - Backend: `DATABASE_URL`, `JWT_SECRET`, `APP_ENV`, `PORT`.
- Frontend: `API_BASE_URL`, `APP_DOMAIN` (used for subdomain routing), and any analytics/feature flag keys.

## Local development (happy path)

1. **Install dependencies**
   - Backend: `cd tatamitech-backend && npm install`
   - Frontend: `cd tatamitech-frontend && npm install` (install Angular CLI globally if needed: `npm install -g @angular/cli`)
   - Docs (optional): `cd tatamitech-docs && npm install`
2. **Prepare the database**
   - Set `DATABASE_URL` to a local Postgres instance.
   - Run `npm run prisma:migrate` (or the project’s migrate script) to apply schemas with `tenant_id` required on transational tables.
3. **Seed a tenant**
   - Create a tenant record (e.g., `golden-tiger`) and at least one admin user bound to that tenant.
   - If a seeder exists, run it; otherwise, insert manually via SQL with `tenant_id` present.
4. **Start services**
   - Backend: `npm run dev`
   - Frontend: `npm run start` (or `ng serve`)
   - Docs: `npm run start`
5. **Access**
   - Visit `http://golden-tiger.localhost:3000` (or your configured domain) to exercise subdomain routing.
   - Use a valid user from the seeded tenant to sign in and test flows.

## Working with tenants locally

- Map subdomains via `/etc/hosts` (e.g., `127.0.0.1 golden-tiger.localhost`).
- Ensure every request includes tenant context:
  - Backend middleware derives `tenant_id` from the hostname.
  - Angular HTTP interceptors attach `X-Tenant` and bearer tokens to calls.
  - Prisma queries must scope by `tenant_id` to avoid cross-tenant leakage.

## Testing considerations

- Write tests that explicitly assert `tenant_id` scoping (both positive and negative cases).
- Mock QR payloads for attendance scans; verify the scan handler rejects mismatched tenant tokens.
- When testing promotions, set deterministic attendance counts to validate belt eligibility.
