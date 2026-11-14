# ADR-002 — Papéis `owner` vs `admin` (H47 / G-R02 · refresh H64)

**Status:** proposto · **não** altera memberships · **não** muda ACL em código  
**Contexto:** H37 mapa roles · H42 G-R02 · handlers tratam owner≈admin  
**Refresh H64:** refs aos helpers H53/H54/H58/H62

## Contexto

No AS-IS, vários gates aceitam `owner` e `admin` indistintamente (homologação, mutações sensíveis). Não há documento que diga se a igualdade é intencional.

## Decisão (draft para aprovação PM/security)

1. **`owner`**: criador da org / bootstrap; único que pode transferir ownership (futuro) e encerrar tenant.  
2. **`admin`**: operação diária com os mesmos poderes de mutação **exceto** transferência/encerramento (quando existirem).  
3. Até haver endpoints de transferência/encerramento, **manter** checagens `owner|admin` iguais é aceitável, desde que documentado.  
4. Qualquer poder fiscal `homologated` continua **fora** de role — responsável fiscal humano.

## Helpers alinhados (não mudam owner vs admin)

| História | Helper / rota | Roles |
|---|---|---|
| H53 / H58 | `canAccessTaxRun` · tax-runs GET/POST | owner\|admin\|analyst\|reviewer |
| H54 / H62 | `canAccessExportDownload` · exports GET/POST | owner\|admin\|reviewer\|analyst |

Esses helpers **não** distinguem owner de admin — coerente com a decisão (3) acima.

## Consequências

- G-R02 → “intencional por enquanto” até endpoints de transferência/encerramento.  
- Não criar role nova neste cartão.  
- E-R01 companies PATCH: proposta em H60; aplicação **gated** (H65).

## Proibições

- Não promover admin/owner a `homologated`.
- Não abrir cross-tenant (H17).
- Não alterar ACL neste PR.

## CTs

- CT-adr-01: distingue owner vs admin  
- CT-adr-02: cita G-R02 / H37 / não altera ACL agora  
- CT-adr-03: cita H53/H54/H58/H62 helpers  
- CT-adr-04: assert CI
