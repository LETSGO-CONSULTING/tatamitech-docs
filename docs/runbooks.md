---
sidebar_position: 14
---

# Support Runbooks

Actionable steps for common incidents.

## QR scan failures

- Check error reason (expired, tenant mismatch, replay).
- If expired: ask student to refresh QR; regenerate token if needed.
- If tenant mismatch: verify domain/subdomain; ensure scanner uses correct hostname.
- If replay: verify nonce storage; check for repeated attempts and lock if suspicious.

## Login issues

- Verify user status/role; reset password if needed.
- Confirm `JWT_SECRET` matches across instances.
- Check clock skew if tokens appear expired prematurely.

## Attendance not recording

- Confirm backend `/ready` is healthy and DB reachable.
- Inspect logs for Prisma errors or tenant scoping failures.
- Attempt manual attendance entry to isolate QR vs. persistence issues.

## Promotion eligibility incorrect

- Recompute with known attendance counts; check belt rules for tenant.
- Validate time-in-rank date math and timezone.
- Audit overrides to ensure no stale flags.

## Restore/backup

- Identify backup point and scope (tenant-wide vs full DB).
- Perform restore in staging first; verify tenant data integrity and `tenant_id` constraints.
- Communicate downtime window and post-restore validation steps (login, scan, promotion check).
