---
sidebar_position: 1
---

# Frontend Overview

TatamiTech’s frontend is an **Angular (latest enterprise release) + TypeScript** application that serves both the public marketing site and the tenant-specific admin dashboard. Angular Material/CDK (or a custom design system) provides UI primitives and layout scaffolding.

## Key responsibilities

- **Tenant-aware shell:** Derive tenant slug from subdomain, set global theme/config, and fetch tenant-specific data.
- **Authentication:** Handle login, token storage, and attach bearer tokens via HTTP interceptors.
- **Dashboards:** Attendance views, student rosters, belt progression, class schedules, and payments.
- **QR tooling:** Generate and display QR codes for students; provide scan UI for reception.

## Project conventions

- **Type safety:** Typed DTOs/interfaces that mirror backend contracts; central API client services.
- **State management:** Angular services + RxJS; use signals/store libraries as needed for complex flows.
- **Styling:** Angular Material theming plus design tokens; allow per-tenant brand overrides.
- **Error UX:** Tenant-friendly errors; surface tenant slug in debug info (not to end users).

## Performance & UX

- Use Angular Universal for SSR where faster TTFB is needed; otherwise rely on client rendering with smart caching.
- Prefetch critical data on route resolvers/guards to avoid spinners on first paint.
- Avoid blocking renders on large attendance histories; paginate and cache per tenant.

## Internationalization

- Default language: English. Add locale routing only when content is ready; keep tenant names/brands untouched.
