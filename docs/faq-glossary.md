---
sidebar_position: 16
---

# FAQ & Glossary

## FAQ

- **How is a tenant identified?** By subdomain/hostname; backend enforces `tenant_id` on every query.
- **Can a user belong to multiple tenants?** Not in the current model; one user per tenant. Use separate accounts.
- **What happens if a QR is reused?** Replay is rejected via nonce tracking; log entry created.
- **Can we change a tenant slug?** Avoid if possible; requires domain update and careful migration of dependent URLs.
- **Do students need accounts?** Not necessarily; QR can be issued without a login. Self-service is optional.

## Glossary

- **Tenant:** An academy instance identified by a slug/domain.
- **Slug:** URL-friendly identifier used in subdomains (e.g., `golden-tiger`).
- **QR token:** Signed payload representing a student attendance check-in.
- **Belt promotion:** Eligibility decision based on attendance and time-in-rank.
- **Nonce:** Random value to prevent replaying QR tokens.
