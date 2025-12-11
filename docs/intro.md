---
sidebar_position: 1
---

# TatamiTech Documentation

Welcome to the product and technical documentation for **TatamiTech**, a multitenant SaaS for martial arts academies. This site covers how we architect tenants, secure data isolation, and deliver core flows (QR attendance, belt progression, and admin tooling).

## What you'll find here

- **Platform overview:** Golden Stack, modules, and lifecycle of a tenant.
- **Architecture:** Shared-database multitenancy, subdomain routing, and Prisma enforcement.
- **Backend:** Express + TypeScript services, authentication, RBAC, and QR/attendance endpoints.
- **Frontend:** Angular (latest enterprise release), tenant-aware routing, and dashboards.
- **Operations:** Attendance scanning, promotion rules, and data governance.
- **Deployment:** Environments, config, and operational readiness.

## Audience

- Engineers building or extending TatamiTech.
- Customer ops rolling out a new academy tenant.
- Leadership needing a quick product/tech briefing.

## Quick links

- Architecture overview → `architecture/overview`
- Multitenancy model → `architecture/multitenancy`
- Backend overview → `backend/overview`
- Frontend routing → `frontend/tenant-routing`
- Attendance & QR flow → `backend/qr-attendance`

## Contributing to docs

- Keep content in English and concise.
- Prefer implementation-first guidance (how it works, how to extend, how to test).
- When adding code snippets, specify the language for syntax highlighting.
