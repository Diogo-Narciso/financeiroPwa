# Entrega ao programador — Portal Inteligente de DIFAL

**Versão 1.4 | 10 de novembro de 2026 | Oliveira Contabilidade**

## Comece por aqui

O projeto está consolidado em **[01_ESPECIFICACAO_CONSOLIDADA.md](01_ESPECIFICACAO_CONSOLIDADA.md)**. Esse é o documento principal para orçamento, arquitetura e implementação. Ele reúne o escopo aprovado na conversa e elimina a necessidade de interpretar os adendos como solicitações desconectadas.

O ZIP é uma **documentação de desenvolvimento**, acompanhada dos materiais fornecidos. Não contém o aplicativo pronto, uma lista fiscal integral homologada ou um contrato definitivo.

## Conteúdo do pacote

| Arquivo ou pasta | Finalidade |
|---|---|
| `01_ESPECIFICACAO_CONSOLIDADA.md` | Requisitos completos, telas, fluxos, dados, APIs, cálculos, ST, manual, benefícios, exportação, cobrança e contratos |
| `02_ENTREGAS_E_TESTES.md` | Etapas, critérios de aceite e matriz de testes para acompanhar a entrega |
| `03_FONTES_E_PENDENCIAS.md` | Fontes, limites da conferência e decisões necessárias para liberar produção |
| `apoio/PLANILHA_MODELO_DIFAL_ORIGINAL.xlsx` | Planilha enviada pelo proprietário; conteúdo preservado, sem correção das fórmulas |
| `apoio/BASE_EXEMPLOS_CONVENIO_52_91_V1_2.json` | Amostra original de 10 enquadramentos / 9 NCMs; aplicação fiscal automática desativada |
| `apoio/CONFIGURACAO_INICIAL_REFERENCIA.json` | Configuração de referência para quotas, escopo e bloqueios de ativação; não é código executável |
| `apoio/CASOS_ARITMETICOS_DEMONSTRACAO.json` | Exemplos matemáticos com arredondamento explícito; não são regras tributárias homologadas |
| `historico/` | Os três documentos anteriores, preservados integralmente como referência histórica |
| `MANIFESTO_ARQUIVOS_SHA256.json` | Inventário, tamanho e hash de integridade de cada arquivo, exceto o próprio manifesto |

## Ordem de trabalho

Ler a especificação; usar as etapas e testes para dividir o desenvolvimento; examinar as pendências; consultar os materiais de apoio. O histórico serve para rastrear a origem dos requisitos. **Em conflito de redação funcional, prevalece a versão consolidada.** Norma aplicável e homologação profissional prevalecem sobre exemplos de qualquer versão.

## Requisitos que não podem ser perdidos

O teste permite até **3 CNPJs e 5 NF-e de entrada por CNPJ**. Saídas e cadastro de produtos são opcionais. A análise é por item. O sistema deve considerar retenção relevante para evitar duplicidade, mas não afastar DIFAL só porque há ST na nota.

O cliente pode incluir/excluir DIFAL por escolha manual, com motivo e histórico. Benefícios fiscais exigem condições e aviso para consultar o contador. O Convênio 52/91 é o primeiro conjunto previsto; a amostra JSON não é o catálogo completo.

O XML autorizado permanece original. A alteração de CFOP é de **escrituração**, entregue em mapeamento/arquivo auxiliar ou adaptador ERP homologado, e não como NF-e adulterada.

Mensalidade, prazo mínimo e renovação são dimensões independentes. Preços, descontos, multas e políticas contratuais não são inferidos a partir de exemplos. Contrato de prazo mínimo pode ter cobrança mensal.

## O que o programador deve devolver

Código e migrações; instruções de execução e implantação; testes e evidências; integrações realmente homologadas; lista do que está funcional, demonstrativo ou pendente. Não publicar valores de imposto nem condições contratuais não aprovadas como regras definitivas.

## Mensagem pronta para encaminhamento

> Segue a documentação consolidada do Portal Inteligente de DIFAL. Utilize o arquivo `01_ESPECIFICACAO_CONSOLIDADA.md` como referência principal e o roteiro `02_ENTREGAS_E_TESTES.md` para dividir as entregas e os critérios de aceite. A planilha e os exemplos fiscais estão em `apoio/`; os documentos anteriores foram mantidos apenas para histórico. Apresente a proposta de implementação por etapas, destacando dependências, integrações e itens que exigem homologação antes da publicação.

## Integridade e confidencialidade

A planilha foi renomeada no pacote para facilitar os caminhos, sem alterar seu conteúdo. O JSON de exemplos e os três MDs históricos foram copiados sem alteração. O manifesto permite verificar esses arquivos por SHA-256.

Trate a planilha e todo material de trabalho como restritos ao projeto; não os publique automaticamente em repositório aberto. Credenciais, dados reais de clientes e XMLs particulares não devem entrar em fixtures públicas.
