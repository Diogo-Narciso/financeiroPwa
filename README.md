# Portal Inteligente de DIFAL

**Oliveira Contabilidade** · repositório privado · rebuild a partir da documentação v1.4

SaaS fiscal multiempresa para escritórios e empresas no Brasil (início RJ). **Um produto, dois canais:** aplicativo **web** (navegador) e **mobile** (PWA instalável ou shell nativo), compartilhando a mesma conta, as mesmas regras e o mesmo backend.

> Status atual: documentação e escopo versionados neste repositório. **Implementação da aplicação ainda não iniciada** (código legado inacessível). Próximo passo técnico: etapa **E0 — Fundação**.

## O que o produto entrega

1. Cadastro de organizações, usuários e estabelecimentos (CNPJ)
2. Importação de XML de NF-e de entrada (saídas / catálogo opcionais)
3. Classificação de itens (revenda, consumo, ativo, etc.) com sugestão explicável
4. Cálculo de DIFAL / FECP com regras **versionadas** e auditoria
5. Revisão manual com motivo e histórico (sem apagar a análise automática)
6. Exportação para escrituração **sem alterar** o XML autorizado
7. Teste gratuito com quotas (**3 CNPJs**, **5 NF-e de entrada por CNPJ**) e planos / cobrança em etapa posterior

Resumo canônico: [`docs/escopo-produto.md`](docs/escopo-produto.md).

## Canais (web + app)

| Canal | Papel |
|---|---|
| **Web** | Site, painel, importação, revisão, cálculo, exportação, assinatura |
| **Mobile / PWA** | Mesmo produto em cliente móvel (PWA ou shell nativo), mesmo backend |

Não são dois produtos separados: é o Portal Inteligente de DIFAL em dois pontos de acesso.

## Princípios inegociáveis

- A **IA não inventa** NCM, alíquotas, reduções, CFOP ou fundamento legal
- Sem dado verificável / regra homologada → **pendente de validação** (nunca imposto zero por omissão)
- **XML autorizado imutável**; CFOP de escrituração só em arquivo auxiliar / adaptador ERP
- Decisão fiscal final é do **usuário / contador**
- Não publicar regras ou preços não homologados como definitivos

## Stack planejada

| Camada | Escolha |
|---|---|
| Linguagem | TypeScript |
| Web | Next.js (App Router) + API / server actions |
| Mobile | PWA e/ou shell nativo consumindo o mesmo backend |
| Dados | PostgreSQL + migrações versionadas |
| Organização | Monorepo (`apps` + `packages`) quando a implementação começar |

Detalhes: [`docs/01_ESPECIFICACAO_CONSOLIDADA.md`](docs/01_ESPECIFICACAO_CONSOLIDADA.md) e [`docs/plano-rebuild.md`](docs/plano-rebuild.md).

## Etapas de entrega (E0–E7)

| Etapa | Conteúdo | Aceite (resumo) |
|---|---|---|
| **E0** Fundação | Repo, arquitetura, banco, ambientes, identidade | Roda local; migrações; isolamento inicial |
| **E1** Cadastro e teste | Site, login, orgs, empresas, quotas | 3 CNPJs e 5 entradas/CNPJ no servidor |
| **E2** Documentos | Upload XML/ZIP, parsing, storage | Originais preservados; duplicidade controlada |
| **E3** Revisão | Classificação, ST/retenção, manual, auditoria | Análise original preservada |
| **E4** Motor | Regras versionadas, DIFAL/FECP, benefícios | Aritmética reproduzível; faltas → pendência |
| **E5** Escrituração | CFOP por item, ZIP, adaptador ERP | Hash do XML original idêntico |
| **E6** Cobrança | Planos, contrato, pagamentos | Contrato imutável; cobrança idempotente |
| **E7** Homologação | Segurança, fiscal, jurídico, publicação | Checklist de lançamento aprovado |

Roteiro completo e matriz de testes: [`docs/02_ENTREGAS_E_TESTES.md`](docs/02_ENTREGAS_E_TESTES.md).

## Documentação neste repositório

Comece por [`docs/00_LEIA_ME.md`](docs/00_LEIA_ME.md).

| Caminho | Conteúdo |
|---|---|
| [`docs/escopo-produto.md`](docs/escopo-produto.md) | Escopo web + app e princípios |
| [`docs/01_ESPECIFICACAO_CONSOLIDADA.md`](docs/01_ESPECIFICACAO_CONSOLIDADA.md) | Especificação principal (v1.4) |
| [`docs/02_ENTREGAS_E_TESTES.md`](docs/02_ENTREGAS_E_TESTES.md) | Etapas e testes de aceite |
| [`docs/03_FONTES_E_PENDENCIAS.md`](docs/03_FONTES_E_PENDENCIAS.md) | Fontes e decisões pendentes |
| [`docs/plano-rebuild.md`](docs/plano-rebuild.md) | Plano de rebuild deste repositório |
| [`docs/COMANDO_MESTRE_PORTAL_DIFAL_e49c.md`](docs/COMANDO_MESTRE_PORTAL_DIFAL_e49c.md) | Prompt / restrições de implementação |
| [`docs/apoio/`](docs/apoio/) | Planilha modelo, JSON de exemplos e configuração de referência |
| [`docs/historico/`](docs/historico/) | Adendos anteriores (rastreabilidade) |
| [`docs/MANIFESTO_ARQUIVOS_SHA256.json`](docs/MANIFESTO_ARQUIVOS_SHA256.json) | Inventário e hashes do pacote |

**Em conflito de redação funcional, prevalece a especificação consolidada.** Norma aplicável e homologação profissional prevalecem sobre exemplos.

## Confidencialidade

Repositório **privado**. A planilha e os materiais de `docs/apoio/` são modelo de cálculo / referência — **não** regras fiscais homologadas e **não** devem ir para repositório público com dados reais de clientes. Credenciais, XMLs particulares e PII ficam fora do git.

## Próximo passo

Implementar **E0 — Fundação** (scaffold TypeScript, Next.js web, Postgres, migrações, health) e só então evoluir E1+. Até lá, este repositório documenta o produto e o roteiro de entrega.
