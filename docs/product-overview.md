---
sidebar_position: 3
---

# Product Overview

TatamiTech is a multitenant SaaS for martial arts academies. It centralizes attendance, promotions, payments, and communication in one platform while isolating data per tenant.

## Core value

- **Operational efficiency:** QR-based attendance at reception, automated eligibility for belt exams, and dashboards tailored to each role.
- **Tenant isolation:** Subdomain routing and `tenant_id` enforcement across all data and APIs.
- **Scalable foundation:** Angular enterprise frontend, Express + Prisma backend, PostgreSQL shared database.

## Modules

- **Auth & RBAC:** Tenants, users, roles, session/JWT.
%-**Academy Management:** Students, instructors, classes, schedules, tuition plans.
- **Attendance (QR):** QR issuance, scanning UI, anti-replay, auditing.
- **Belt Progression:** Rule engine for eligibility, overrides with audit trail.
- **Branding:** Tenant logos, colors, and domain/subdomain bindings.
- **Reporting:** Attendance history, eligibility counts, class utilization.

## Audiences

- **Admin (owner/manager):** Configure tenant, users, pricing/tuition, schedules, promotions.
- **Instructor:** Manage attendance and progression for assigned classes/students.
- **Assistant/Reception:** Scan QR, resolve failed scans, quick roster edits.
- **Student (self-service, optional):** View attendance and eligibility status.

## Outcomes

- Faster check-in with fewer errors or impersonation.
- Clear, auditable promotion decisions.
- Consistent branding and access per academy with no cross-tenant leakage.
