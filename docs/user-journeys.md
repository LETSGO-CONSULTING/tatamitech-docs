---
sidebar_position: 4
---

# User Journeys

Role-based walkthroughs to align UX and acceptance criteria.

## Admin (Academy Owner)

- Sign in, land on dashboard with tenant branding and KPIs.
- Create/update schedules and classes; assign instructors.
- Manage users and roles; invite new staff.
- Configure belt progression thresholds and fees (if applicable).
- Review attendance trends and promotion candidates; approve overrides.

## Instructor

- View today’s classes and rosters.
- Mark attendance (QR scan or manual fallback).
- Check eligibility for promotions; add notes or defer.
- View student history and belt progression timeline.

## Assistant / Reception

- Open scan UI, validate QR tokens, handle failures (expired/mismatched tenant).
- Quick actions: search student, update contact info, mark drop-in/guest.
- See last scans to resolve duplicates or replays.

## Student (Optional self-service)

- Log in to view attendance history and belt eligibility.
- See upcoming classes and announcements.

## Acceptance checkpoints

- Tenant context displayed (slug/logo) in header.
- Actions restricted by role; unauthorized actions show clear errors.
- Audit trail for attendance and promotions (who/when/how).
