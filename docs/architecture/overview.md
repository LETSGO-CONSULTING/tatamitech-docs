---
sidebar_position: 1
---

# Architecture Overview

TatamiTech is a decoupled SaaS platform with a shared database and logical isolation per tenant. Subdomains map to tenants (e.g., `goldentiger.tatamitech.com`), and every transaction is scoped by `tenant_id`.

## Golden Stack

- **Frontend:** Angular (enterprise latest), Angular Material + CDK (or design system of choice), TypeScript. Hosted on Vercel or equivalent static/SSR host.
- **Backend:** Node.js, Express, TypeScript, Prisma. Hosted on Railway/Render.
- **Database:** PostgreSQL (single shared DB), with `tenant_id` required on transactional tables.

## Core modules

- **Auth & Core:** Tenants, users, roles/permissions, session/JWT handling.
- **Academy Management:** Students, instructors, classes, schedules, tuition/plan settings.
- **Operations:** QR generation, scan interface, attendance logging, auditing.
- **Progression:** Belt eligibility rules based on attendance counts and time-in-rank.
- **Admin Dashboards:** Tenant-branded landing, back-office dashboards, reporting.

## Request flow (happy path)

1. **DNS/subdomain** selects the tenant (e.g., `goldentiger`).
2. **Frontend** bootstraps with the tenant slug and calls the API with JWT + `X-Tenant` (optional) headers.
3. **Middleware** extracts the tenant from the hostname, validates the user token, and injects `tenant_id` into the request context.
4. **Service layer** executes Prisma queries that always filter by `tenant_id`.
5. **Response** returns tenant-scoped payloads; caches are namespaced by tenant.

## Data isolation strategy

- **Shared database, logical isolation.**
- **Mandatory `tenant_id`:** Schema enforces `NOT NULL` and foreign keys to `tenants`.
- **Guardrails:** Middleware rejects requests when hostname/tenant mismatch or missing scope.
- **Auditability:** Attendance and promotion actions store actor, timestamp, and tenant to support dispute resolution.

## Operational environments

- **Preview:** Feature branches (Vercel + ephemeral DB) for UI testing.
- **Staging:** Stable integration with realistic data volumes; mirrors production config.
- **Production:** Hosted on Vercel (frontend) and Railway/Render (backend) with managed PostgreSQL.
