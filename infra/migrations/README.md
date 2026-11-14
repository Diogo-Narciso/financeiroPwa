# Migrations

Versioned SQL applied by `@portal-difal/db`:

```bash
pnpm db:migrate
pnpm db:status
```

| File | Stage |
|---|---|
| `001_foundation.sql` | E0 identity/tenancy |
| `002_e1_auth_quotas_profiles.sql` | E1 sessions, trial quotas, profiles |

No fiscal rate tables until homologated.
