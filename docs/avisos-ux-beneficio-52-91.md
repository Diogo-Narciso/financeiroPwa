# Índice — avisos UX benefício Convênio 52/91 (H35)

**Status:** catálogo de avisos de produto · **não** cadastra benefício · **não** zera DIFAL  
**Fontes:** H15 evidências · adendo 52/91 · `convenio-52-91-evidencias.md`

## Objetivo

Listar **mensagens/avisos** que a UI deve poder exibir quando o usuário explora candidatos 52/91 — sem afirmar elegibilidade automática.

## Avisos (copy draft — revisar com UX/SME)

| ID | Quando | Texto sugerido (PT) | Tom |
|---|---|---|---|
| UX-52-01 | Lista de candidatos NCM | “Candidato a enquadramento — **não** é benefício confirmado.” | info |
| UX-52-02 | Usuário tenta “aplicar zero” | “Proibido cadastrar 52/91 = DIFAL zero sem homologação fiscal.” | blocking |
| UX-52-03 | FECP sugerido automaticamente | “Não somar FECP 2% automático fora do enquadramento (F08).” | blocking |
| UX-52-04 | Competência 2027/2028 | “Vigência futura depende de ratificação 131/26 validada (H28/F09).” | warning |
| UX-52-05 | Sem responsável fiscal | “Decisão final exige revisão do responsável fiscal.” | warning |
| UX-52-06 | Demo ARIT na tela | “Valores demonstrativos ≠ regra homologada (H9).” | info |

## Proibições

- Não usar estes avisos como parecer jurídico.
- Não ocultar pendência com mensagem “aprovado”.
- Não inventar alíquota no copy.

## Ligação

- Evidências: `docs/convenio-52-91-evidencias.md`  
- Ratificação: `docs/ratificacao-131-26-checklist.md`  
- Gate: `ruleStatus` demo ≠ homologated

## CTs

- CT-ux-01: cita 52/91 + proíbe zero automático  
- CT-ux-02: menciona 131/26 / FECP / homologação  
- CT-ux-03: assert CI
