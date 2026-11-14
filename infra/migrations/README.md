# Migrations

```bash
pnpm db:migrate
pnpm db:status
```

| File | Stage |
|---|---|
| `001_foundation.sql` | E0 |
| `002_e1_auth_quotas_profiles.sql` | E1 |
| `003_e2_imports_documents.sql` | E2 |
| `004_e3_classification_review.sql` | E3 |
| `005_e4_tax_engine.sql` | E4 versioned rules / runs / benefits |

Fiscal amounts in production require `homologated` rule versions — demos stay `demo_arithmetic` / `pending_homologation`.
| `006_e5_bookkeeping_export.sql` | E5 CFOP escrituração / export ZIP |
| `007_e6_billing_contracts.sql` | E6 plans / subscriptions / contracts / mock billing |
| `008_e7_homologation_launch.sql` | E7 launch checklist, P01–P14, readiness snapshots |

Paid `plan_versions` may carry **placeholder** cents (`is_price_placeholder=true`) for sandbox UI only — never treat as official commercial prices. `plans.publishable=false` until commercial + legal approval.

E7 seeds do **not** approve launch. See `docs/lancamento-checklist.md`.
