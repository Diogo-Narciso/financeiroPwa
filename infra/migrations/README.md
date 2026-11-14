# Migrations

```bash
pnpm db:migrate
pnpm db:status
```

| File | Stage |
|---|---|
| `001_foundation.sql` | E0 identity/tenancy |
| `002_e1_auth_quotas_profiles.sql` | E1 sessions, trial quotas, profiles |
| `003_e2_imports_documents.sql` | E2 imports, immutable XML storage, NF-e parse |

No fiscal rate tables until homologated.
