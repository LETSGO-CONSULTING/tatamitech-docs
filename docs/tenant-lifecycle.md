---
sidebar_position: 6
---

# Tenant Lifecycle

Steps to onboard, operate, and retire a tenant with consistent isolation and branding.

## Create

- Choose tenant slug (used in subdomain): lowercase, hyphenated, unique.
- Capture legal name, contact email, and billing owner.
- Set base domain/subdomain mapping (`slug.tatamitech.com` or custom CNAME).
- Apply default branding (logo/colors) and default roles.

## Seed

- Create admin user bound to `tenant_id`.
- Optional: import students and instructors from CSV; ensure unique constraints `(tenant_id, email)`.
- Configure classes/schedules and belt rules.

## Operate

- Monitor health and logs scoped by tenant slug.
- Adjust branding, pricing/tuition, and roles as needed.
- Run periodic audits: attendance anomalies, failed scans, promotion overrides.

## Suspend / Delete

- Suspend: disable login and new scans; keep data read-only.
- Delete (rare): soft-delete tenant record; archive data to cold storage; ensure cascading is scoped to that `tenant_id` only.

## Checklist for new tenants

- [ ] Slug and domain configured.
- [ ] Admin user created and verified.
- [ ] Classes/schedules set.
- [ ] Belt rules loaded.
- [ ] QR scanning tested in staging with this tenant slug.
- [ ] Branding (logo/colors) applied.
