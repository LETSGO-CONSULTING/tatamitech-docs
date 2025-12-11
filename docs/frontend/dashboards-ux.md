---
sidebar_position: 3
---

# Dashboards & UX

Key views and UX considerations for TatamiTech’s frontend.

## Core dashboards

- **Home:** Tenant branding, KPIs (attendance today, eligible for promotion, upcoming classes).
- **Attendance:** Scan UI, recent scans, error states (expired/replay/tenant mismatch), manual override.
- **Students:** Roster with filters (belt, status, class), profile pages with attendance and promotion history.
- **Classes/Schedules:** Calendar/list views, instructor assignment, capacity indicators.
- **Promotions:** Eligibility queue with reasons, approve/defer actions, audit trail.

## UX principles

- Surface tenant slug/logo in header to avoid cross-tenant confusion.
- Inline, actionable errors (e.g., “Token expired — ask student to refresh QR”).
- Fast paths for reception: keyboard shortcuts or large buttons for scan/resolve.
- Pagination and lazy loading for large rosters; per-tenant caching.

## Responsive design

- Mobile-friendly scan UI (camera access) and attendance list.
- Collapsible navigation and condensed cards for small screens.

## Accessibility

- Sufficient contrast on tenant-themed colors.
- Keyboard navigation for scan/resolve flows.
- ARIA labels on buttons and scan results.
