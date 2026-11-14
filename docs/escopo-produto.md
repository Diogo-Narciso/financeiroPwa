# Escopo de produto — Portal Inteligente de DIFAL

**Canais:** aplicação **web** (navegador) e **aplicativo** (mobile / PWA instalável). Mesma conta, mesmas regras fiscais e mesmos dados.

## O que a aplicação busca entregar

SaaS fiscal multiempresa para escritórios e empresas no Brasil (início RJ), que:

1. Cadastra organizações, usuários e estabelecimentos (CNPJ)
2. Importa XML de NF-e de entrada (e opcionalmente saídas / catálogo)
3. Classifica itens (revenda, consumo, ativo, etc.) com sugestão explicável
4. Calcula DIFAL / FECP com regras versionadas e auditoria
5. Permite revisão manual com motivo e histórico
6. Exporta para escrituração **sem alterar** o XML autorizado
7. Oferece teste gratuito com quotas (3 CNPJs, 5 NF-e/CNPJ) e planos pagos

## Princípios

- Decisão fiscal final é do cliente/contador; IA não inventa NCM/alíquotas
- XML original imutável; CFOP de escrituração é auxiliar
- Pendências explícitas quando faltar dado homologado

## Fontes no Project

Ver pacote v1.4 em Context: `docs/portal-difal/` (especificação, entregas, fontes, apoio).
