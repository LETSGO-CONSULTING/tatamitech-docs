---
sidebar_position: 11
---

# QR Token Specification

Defines the payload, signing, and validation rules for TatamiTech QR attendance.

## Payload

Minimal data to validate a scan:

```json
{
  "studentId": "uuid",
  "tenantId": "uuid",
  "nonce": "random-string",
  "exp": 1712345678
}
```

- **studentId:** Target student.
- **tenantId:** Must match hostname tenant.
- **nonce:** Random per issuance to prevent replay.
- **exp:** Expiration (seconds since epoch); short-lived (5–15 minutes).

## Signing

- Signed JWT or HMAC; secret never exposed to clients.
- Token delivered to frontend; frontend renders QR containing token or URL (e.g., `/scan?token=...`).

## Validation flow

1. Parse token and verify signature.
2. Check `exp` and reject expired tokens.
3. Resolve tenant from hostname; ensure `tenantId` matches.
4. Look up student; ensure active/not suspended.
5. Reject replays: store recent `nonce` per student/tenant for TTL window.
6. Record attendance with `tenant_id`, `student_id`, `scanned_at`, `actor`.

## Errors

- **Tenant mismatch** → 403.
- **Expired token** → 401/400 with “token expired”.
- **Replay detected** → 409.
- **Unknown student** → 404.

## Security notes

- Do not embed PII in the QR.
- Use HTTPS everywhere; disable token logging.
- Consider rotating secrets and invalidating older tokens when a student is suspended.
