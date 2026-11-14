# Migrations

```bash
pnpm db:migrate
pnpm db:status
```

| File | Stage |
|---|---|
| `001_foundation.sql` | E0 identity/tenancy |
| `002_e1_auth_quotas_profiles.sql` | E1 sessions, trial quotas, profiles |
| `003_e2_imports_documents.sql` | E2 imports, immutable XML storage |
| `004_e3_classification_review.sql` | E3 classification, retention flags, manual decisions |

No homologated fiscal rate tables until E4+ with approved rules.
