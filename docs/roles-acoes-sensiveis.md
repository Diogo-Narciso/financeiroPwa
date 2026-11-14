# Mapa — roles × ações sensíveis (H37 / H3 follow-up)

**Status:** inventário AS-IS · **não** altera ACL · **não** inventa role nova  
**Fontes:** handlers `apps/web` · H17 tenant-guard · H3 security

## Roles observadas (memberships)

| Role | Uso típico no código |
|---|---|
| `owner` | Bootstrap org; checklist homologação; quase todas as mutações |
| `admin` | Mesmo conjunto privilegiado que owner em vários gates |
| `analyst` | Import / companies / analysis / classification |
| `reviewer` | CFOP approve / manual tax / exports / tax-runs |

## Ações sensíveis × roles (amostra)

| Ação | Path / área | Roles aceitas | Nota |
|---|---|---|---|
| Atualizar checklist E7 | `homologation` checklist/pendencies | owner, admin | 403 demais |
| Ver status homologação | `homologation/status` | owner, admin | |
| Decisão fiscal manual | `manual-tax-decision` | owner, admin, reviewer | ≠ homologar regra de catálogo |
| Aprovar CFOP | `cfop/approve` | owner, admin, reviewer | |
| Export ZIP | `exports` | owner, admin, reviewer, analyst | ERP ainda não certificado |
| Tax runs | `tax-runs` | owner, admin, analyst, reviewer | demo ≠ homologated |
| Criar empresa | `companies` | owner, admin, analyst | tenant-scoped |
| Import entries | `imports/entries` | owner, admin, analyst | |

## Gaps

| ID | Gap | Pri |
|---|---|---|
| G-R01 | Sem matriz única versionada no código (checagens espalhadas) | P2 |
| G-R02 | `owner`≈`admin` em vários pontos — documentar se intencional | P2 |
| G-R03 | Sem role “fiscal-only” distinta de reviewer | P3 |
| G-R04 | RLS Postgres ainda gap (H17) | P1 |

## Proibições

- Não promover role a poder fiscal `homologated`.
- Não abrir endpoint cross-tenant (manter H17 404).

## CTs

- CT-role-01: doc lista owner/admin/analyst/reviewer  
- CT-role-02: cita homologação restrita + H17  
- CT-role-03: assert CI
