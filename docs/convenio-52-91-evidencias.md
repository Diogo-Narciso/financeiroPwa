# Pacote de evidências — Convênio ICMS 52/91 (H15)

**Status:** índice de referências · **não** catálogo homologado · **não** autoriza regra produtiva  
**Agente:** sme / security-doc · **História:** H15  
**Fontes-mãe:** [`03_FONTES_E_PENDENCIAS.md`](./03_FONTES_E_PENDENCIAS.md) · [`historico/ADENDO_BENEFICIOS_CONVENIO_52_91_V1_2_cf6d.md`](./historico/ADENDO_BENEFICIOS_CONVENIO_52_91_V1_2_cf6d.md)

## Aviso obrigatório

Este pacote **só** aponta materiais já no repo e links oficiais citados.  
**Proibido** cadastrar “52/91 = DIFAL zero”, “benefício + FECP 2% automático” ou ativar vigência 2027/2028 sem cadeia de ratificação validada (P04 / F09).

## Índice de evidências (referência)

| ID | Documento / fonte | Uso permitido | Uso **proibido** |
|---|---|---|---|
| F04 | CONFAZ Convênio ICMS 52/1991 | Ler cláusulas/anexos na competência | Importar anexos inteiros como regra vigente sem revisão |
| F02 | SEFAZ/RJ Consulta 069/2024 | Contexto interpretativo (ex. resp. 8) | Autorização geral de benefício |
| F08 | SEFAZ/RJ Consulta 054/2025 | FECP em hipótese beneficiada (RJ) | Somar 2% FECP fora do enquadramento |
| F05 | SEFAZ/RJ Consulta 095/2019 | Descrição/natureza de produtos candidatos | Homologar NCM automaticamente |
| F09 | CONFAZ Convênio 131/2026 | Controlar prorrogação **publicada** | Ativar 2027/2028 sem ratificação nacional validada |
| AD1.2 | Adendo benefícios 52/91 v1.2 (histórico) | Contexto de produto / avisos UX | Substituir íntegra oficial |

URLs canônicas: ver seções [F02][F04][F05][F08][F09] em `03_FONTES_E_PENDENCIAS.md`.

## Checklist para o responsável fiscal (fora deste cartão)

Antes de qualquer `homologated`:

1. Fonte + dispositivo + versão + datas da competência  
2. Condições / exceções / UF  
3. Testes da operação concreta  
4. Aprovação assinada do responsável fiscal  

## Ligação com o motor

- Inventário máquina: `docs/rule-inventory.md` / `buildRuleInventory()` — MVP com **0** `homologated`  
- Gate: `ruleStatus` demo ≠ homologated (H9)

## CTs

- CT-ev-01: doc existe e cita F04/F02/F08/F09  
- CT-ev-02: texto contém proibições “não cadastrar zero” / “não ativar 2027/28 automático”  
- CT-ev-03: assert CI sem inventar alíquota
