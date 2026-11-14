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
