# Glossário — status de regra fiscal (H30)

**Status:** glossário de produto · **não** promove regra a `homologated`  
**Fontes:** `01_ESPECIFICACAO_CONSOLIDADA.md` §13.4 · `rule-status` / inventário H14 · H24 template

## Estados

| Status | Significado | Quem muda | Proibido |
|---|---|---|---|
| `draft` | Rascunho editável; campos incompletos ok | Editor | Usar em cálculo anunciado como definitivo |
| `in_review` | Em revisão fiscal; imutável para cálculo produtivo | Revisor | Auto-aprovar sem responsável |
| `homologated` | Aprovada para uso na competência/versão | Responsável fiscal **humano** | Motor/CI/demo promover sozinho |
| `suspended` | Temporariamente fora de uso | Responsável fiscal | Continuar exportando como vigente |
| `ended` | Encerrada (efeitos expirados) | Responsável fiscal | Reabrir sem nova `version` |

## Transições permitidas (resumo)

`draft` → `in_review` → `homologated` → (`suspended` \| `ended`)  
Qualquer alteração de conteúdo em `homologated` cria **nova** `version` em `draft`/`in_review`.

## Relação com o motor AS-IS

| Valor motor | ≠ glossário acima | Nota |
|---|---|---|
| `demo` / `demo_arithmetic` | nunca `homologated` | Gate H9 |
| `pending_homologation` | ≈ `in_review` / draft de catálogo | 0 homologated no inventário |
| `disabled` | ≈ `suspended`/`ended` operacional | Não é parecer fiscal |

## CTs

- CT-g01: lista draft / in_review / homologated / suspended / ended  
- CT-g02: afirma que CI/demo não promovem `homologated`  
- CT-g03: assert CI
