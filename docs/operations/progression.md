---
sidebar_position: 1
---

# Belt Progression

TatamiTech automates belt eligibility by combining attendance counts and time-in-rank. Academies can tune thresholds per belt to reflect their curriculum.

## Eligibility rules

- **Attendance minimum:** Require N attended classes since the last promotion.
- **Time-in-rank:** Optional minimum days/weeks since the last belt change.
- **Instructor override:** Admin/instructor can mark a student eligible or defer manually (with audit trail).
- **Prerequisites:** Certain belts may require passing a prior assessment or fee; model these as flags on the student.

Example rule set (per tenant):

```json
{
  "white_to_yellow": { "attendances": 16, "daysInRank": 60 },
  "yellow_to_green": { "attendances": 20, "daysInRank": 90 },
  "green_to_blue": { "attendances": 24, "daysInRank": 120 }
}
```

## Evaluation flow

1. Query attendance for the student since their last promotion, scoped by `tenant_id`.
2. Compare counts/dates against the tenant’s rule set.
3. Return `eligible`, `reasons`, and `nextSteps` to drive UI copy.
4. Persist promotion decisions with actor, timestamp, and belt changes.

## API contracts (conceptual)

- `POST /promotions/check` — body: `{ studentId }`; returns `{ eligible: boolean, reasons: string[], stats }`.
- `POST /promotions/promote` — body: `{ studentId, newBelt, notes }`; requires `admin`/`instructor`.
- `GET /promotions/history?studentId=...` — returns timeline of belt changes.

## Data considerations

- Store `last_promotion_at`, `current_belt`, and `eligible_from` per student.
- Attendance queries must filter by `tenant_id`; do not rely on client-provided tenant values.
- Index `student_id` + `tenant_id` on attendance and promotion tables for fast lookups.

## UX guidance

- Show remaining classes/days until eligibility to keep students engaged.
- Provide a clear override path with required notes for accountability.
- Surface promotion history in student profiles with who approved each change.
