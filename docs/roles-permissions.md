---
sidebar_position: 5
---

# Roles & Permissions

Base roles and their capabilities. Expand or adjust per tenant as needed.

## Roles

- **admin:** Full control over tenant settings, users, classes, promotions, and reporting.
- **instructor:** Manage assigned classes, record attendance, view/edit student notes, recommend promotions.
- **assistant:** Operate reception flows (scan, manual check-in), view rosters, limited edits (contact info).
- **student:** Self-service view of attendance and eligibility (optional).

## Capability matrix (indicative)

- **Attendance:** admin ✓, instructor ✓, assistant ✓, student self-only (view).
- **Promotions:** admin approve/override; instructor recommend; assistant read-only; student view status.
- **Classes/Schedules:** admin create/update/delete; instructor update assigned; assistant read.
- **Users/Roles:** admin only.
- **Tenant Settings/Branding:** admin only.
- **Reports/Exports:** admin ✓, instructor limited to assigned classes.

## Enforcement guidelines

- Centralize RBAC checks (middleware or service layer) with allowlists per route/action.
- Include `tenant_id` + `role` in JWT; reject when role or tenant mismatches.
- Prefer “fail closed” defaults; log denied actions with tenant + user for audit.
