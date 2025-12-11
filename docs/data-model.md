---
sidebar_position: 9
---

# Data Model (Essentials)

Key tables and constraints to enforce tenant isolation and business rules.

## Core tables

- **tenants**: `id`, `slug (unique)`, `name`, `created_at`.
- **users**: `id`, `tenant_id` (FK), `email`, `password_hash`, `role`, `status`, timestamps, `UNIQUE(tenant_id, email)`.
- **students**: `id`, `tenant_id` (FK), `first_name`, `last_name`, `email`, `belt_rank`, `status`, `created_at`, `UNIQUE(tenant_id, email)`.
- **instructors**: `id`, `tenant_id` (FK), `user_id` (FK), profile fields.
- **classes**: `id`, `tenant_id` (FK), `name`, `schedule`, `location`, `capacity`.
- **attendance**: `id`, `tenant_id` (FK), `student_id` (FK), `class_id` (FK, optional), `scanned_at`, `source`, `created_by`.
- **promotions**: `id`, `tenant_id` (FK), `student_id` (FK), `from_belt`, `to_belt`, `status`, `actor`, `notes`, `created_at`.
- **qr_tokens (if persisted)**: `id`, `tenant_id`, `student_id`, `nonce`, `exp`, `created_at`.

## Constraints & indexes

- `tenant_id` is `NOT NULL` everywhere; foreign keys reference `tenants(id)`.
- Composite uniques include `tenant_id` (emails, slugs per tenant, class names if needed).
- Index attendance on `(tenant_id, student_id, scanned_at)` and promotions on `(tenant_id, student_id, created_at)`.

## Relationships

- One tenant to many users/students/instructors/classes.
- Users map to roles; instructors may link to users or be separate profiles.
- Attendance links students (and optionally classes) to scan events.
- Promotions link students to belt changes and eligibility actions.

## Auditability

- Store `created_by`/`updated_by` with `tenant_id`.
- Keep immutable records for attendance and promotions to support disputes.
