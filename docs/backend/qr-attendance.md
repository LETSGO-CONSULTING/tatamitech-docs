---
sidebar_position: 3
---

# QR & Attendance

Attendance is validated **in person** via QR scans at reception. The backend issues signed tokens and records attendance with tenant enforcement.

## QR generation

- **Payload:** Minimal data needed to validate: `studentId`, `tenantId`, `exp`, and a nonce.
- **Format:** Signed token (JWT or HMAC) encoded in a QR. Avoid embedding PII directly in the QR.
- **Endpoint:** `POST /qr` → returns a URL or raw token that the frontend converts into a QR code.
- **TTL:** Short-lived (e.g., 5–15 minutes) to reduce replay risk.

Sample payload (conceptual):

```json
{
  "studentId": "uuid",
  "tenantId": "uuid",
  "nonce": "random-string",
  "exp": 1712345678
}
```

## Scan & validate flow

1. Reception scans the QR via webcam.
2. Frontend posts the token to `POST /attendance/scan`.
3. Backend verifies signature, expiration, and **tenant match** (token tenant vs hostname tenant).
4. Backend checks student status (active, not suspended) and class/session context if provided.
5. Attendance is recorded with `tenant_id`, `student_id`, `scanned_at`, and `actor` (user who scanned).

## Preventing abuse

- Reject tokens when tenant mismatch or expired.
- Use nonces to prevent replay; optionally store the last N nonces per student/tenant for a short window.
- Log failed scans with reasons; alert if repeated cross-tenant attempts occur.

## Data model (essentials)

- `attendance` table includes `tenant_id`, `student_id`, `class_id` (optional), `scanned_at`, `source`, `created_by`.
- Indices on `(tenant_id, student_id, scanned_at)` to query history quickly.

## Reporting

- Daily/weekly attendance exports per tenant.
- API endpoint: `GET /attendance?from=...&to=...` scoped by authenticated tenant.
- For dashboards, pre-aggregate counts per class and per student to speed up rendering.
