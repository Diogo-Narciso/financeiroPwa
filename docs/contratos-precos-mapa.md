# Mapa — contratos e preços oficiais (H32 / P07–P08)

**Status:** inventário de gaps · **não** publica preço · **não** aprova contrato  
**Fontes:** `03_FONTES_E_PENDENCIAS.md` P07–P08 · `lancamento-checklist.md` · E6 mock billing

## Objetivo

Mapear o que falta para ofertas pagas oficiais e contratos aceitáveis — sem inventar tabela de preços nem minuta jurídica.

## Gaps (AS-IS)

| ID | Tema | Situação no repo | Bloqueia |
|---|---|---|---|
| P07-a | Preço oficial / planos | E6 placeholder / mock | Publicação de oferta paga |
| P07-b | Quotas pagas / descontos | policy de cotas free; sem tabela comercial | Cobrança real |
| P07-c | Margem / suporte incluso | não documentado como oferta | Pacote comercial |
| P08-a | Template de contrato SaaS | tabelas schema (contracts) · sem minuta homologada | Aceite contratual |
| P08-b | Versão imutável + aceite | migrações citam contracts; fluxo UI incompleto | Evidência de aceite |
| P08-c | Multa / CDC / arrependimento | refs J01–J03 em fontes · sem parecer aplicado | Cláusulas finais |

## Campos mínimos antes de publicar oferta

| Campo | Obrigatório | Nota |
|---|---|---|
| `priceTableId` | sim | Versão imutável; **null** até comercial aprovar |
| `currency` | sim | Ex. BRL — sem valor inventado aqui |
| `planCode` | sim | Código do plano |
| `includedQuota` | sim | Alinhado a quotas policy |
| `contractTemplateVersion` | sim | Aponta minuta revisada |
| `legalReviewer` | sim | Responsável jurídico/comercial |
| `publishedAt` | sim | null = não publicado |

## Proibições

- Não inventar preço, desconto ou multa percentual.
- Não marcar P07/P08 como fechados.
- Mock `sandbox` (H12) ≠ cobrança oficial.

## CTs

- CT-c01: cita P07 e P08  
- CT-c02: proíbe inventar preço / afirma não publicado  
- CT-c03: assert CI
