# Plano de rebuild — Portal Inteligente de DIFAL

**Data:** 2026-11-14  
**Repo:** https://github.com/Diogo-Narciso/financeiroPwa  
**Fonte:** pacote documentação v1.4 (não o app perdido `aab6c3d`)

## Situação

O histórico antigo (`aab6c3d` / 69 arquivos) ficou inacessível (agent arquivado). Rebuild a partir da especificação consolidada e materiais de apoio em [Context](cursor.agent://project/context).

## Canais

- **Web** (navegador) e **aplicativo** (mobile / PWA instalável), mesmo backend e regras.

## Stack proposta (E0)

- Monorepo TypeScript (apps + packages)
- Next.js (web) + API/server actions
- Cliente mobile/PWA compartilhando a API
- Postgres + migrations
- Auth multi-tenant (org/roles)
- Preview local + push para `main` quando cada etapa estiver aceitável

## Ordem imediata

1. README + docs de escopo no GitHub (antes do código)
2. E0 fundação

## Etapas (de `02_ENTREGAS_E_TESTES.md`)

| Etapa | Escopo |
|---|---|
| E0 | Fundação: repo, arquitetura, DB, identidade, app sobe local |
| E1 | Landing, login, orgs, empresas, quotas 3 CNPJ / 5 NF-e |
| E2 | Upload XML/ZIP, parsing, storage imutável |
| E3 | Classificação, revisão, auditoria |
| E4 | Motor DIFAL + benefícios (regras versionadas; homologação separada) |
| E5 | CFOP escrituração + export ZIP (XML original intacto) |
| E6 | Planos / cobrança |
| E7 | Homologação e publicação |

## Regras inegociáveis

- IA não inventa NCM/alíquotas; faltas → “pendente de validação”
- XML autorizado imutável; CFOP de escrituração é auxiliar
- Decisão fiscal final é do usuário/contador
- Não publicar regras/preços não homologados como definitivos

## Próximo passo imediato

Implementar **E0** no repositório e abrir PR / force-push conforme combinado.
