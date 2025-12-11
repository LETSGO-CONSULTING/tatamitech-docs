---
sidebar_position: 2
---

# Promotion Rules (Detailed)

How to configure and evaluate belt eligibility per tenant.

## Rule model

- **Attendance threshold:** Minimum attended classes since last promotion.
- **Time-in-rank:** Minimum days/weeks since previous belt.
- **Prerequisites:** Flags (fees paid, assessment passed, instructor approval).
- **Overrides:** Admin/instructor can mark eligible or defer with notes; all overrides are audited.

Example (per tenant):

```json
{
  "white_to_yellow": { "attendances": 16, "daysInRank": 60 },
  "yellow_to_green": { "attendances": 20, "daysInRank": 90 },
  "green_to_blue": { "attendances": 24, "daysInRank": 120 }
}
```

## Evaluation steps

1. Fetch attendance since last promotion (scoped by `tenant_id`).
2. Compute counts/dates vs. the tenant’s rule set.
3. Return `eligible`, `reasons`, `nextSteps`.
4. On promotion, persist belt change with actor, timestamp, and notes.

## UI/UX guidance

- Show remaining classes/days to motivate students.
- Provide clear override flow with required justification.
- Display promotion history with approver and timestamps.

## Testing

- Positive/negative cases per belt with deterministic attendance counts.
- Timezone-aware date math for `daysInRank`.
- Verify tenant scoping: cannot compute eligibility across tenants.
