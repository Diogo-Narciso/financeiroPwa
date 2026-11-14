# Migrations

Versioned SQL applied by `@portal-difal/db`:

```bash
pnpm db:migrate
pnpm db:status
```

Files must match `NNN_description.sql`. **E0** ships `001_foundation.sql` only (identity/tenancy). No tax-rule tables until homologated.
