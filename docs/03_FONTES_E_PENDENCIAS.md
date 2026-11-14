# Fontes, decisões pendentes e liberação de produção

**Portal Inteligente de DIFAL | Versão 1.4 | 10/11/2026**

## 1. Alcance desta consolidação

O pacote organiza os materiais fornecidos e os requisitos aprovados na conversa. Houve conferência focal de páginas oficiais sobre o Convênio 52/91, o Convênio 131/2026, CNPJ alfanumérico, CDC e Código Civil. Isso **não equivale** a uma auditoria integral de todas as regras, a revisão jurídica do contrato ou a homologação tributária da planilha.

Os PDFs e manuais indicados nos materiais anteriores foram mantidos como referências para a futura homologação, sem nova análise integral nesta consolidação. A lista de exemplos de NCMs e a planilha permanecem com os limites registrados nos próprios adendos.

Para cada regra de produção, o responsável fiscal deverá registrar fonte, dispositivo, versão, datas pertinentes, condições, exceções, testes e aprovação. A simples disponibilidade de um link não significa aplicabilidade à operação.

## 2. Fontes fiscais e cadastrais

### [F01] Portal Nacional da NF-e — perguntas frequentes

**Uso:** integridade da NF-e autorizada, assinatura e diferenciação de arquivo auxiliar de escrituração.

`https://www.nfe.fazenda.gov.br/Portal/perguntasFrequentes.aspx?AspxAutoDetectCookieSupport=1&tipoConteudo=auR4yGlWmRY%3D`

**Situação:** referência preservada do comando original. A abertura automatizada da variante do endereço apresentou redirecionamento nesta consolidação. O programador deve localizar também o MOC e os schemas oficiais pertinentes ao leiaute implementado. O requisito de preservação do original permanece obrigatório no produto.

### [F02] SEFAZ/RJ — Consulta Tributária 069/2024

**Uso:** referência interpretativa anterior sobre modalidades de DIFAL, cálculo e ressalvas de benefício, especialmente a resposta 8.

`https://portal.fazenda.rj.gov.br/consulta-tributaria/wp-content/uploads/sites/45/2024/10/069_2024.pdf`

**Situação:** referência do adendo 1.2; sem nova homologação integral nesta entrega. Conferir fatos da consulta, normas citadas e vigência da operação concreta. Não usar consulta individual como autorização geral.

### [F03] SEFAZ/RJ — Manual de Substituição Tributária

**Uso:** matriz de ST/DIFAL-ST, responsabilidade, cálculo e evidências; confirmar edição aplicável.

`https://portal.fazenda.rj.gov.br/icms/wp-content/uploads/sites/42/2023/10/ManualSubstTribut.pdf`

**Situação:** referência preservada do comando original. O catálogo produtivo deverá acrescentar os convênios/protocolos e atos estaduais específicos de cada mercadoria/operação atendida. Não existe neste pacote uma matriz ST completa já homologada.

### [F04] CONFAZ — Convênio ICMS 52/1991

**Uso:** cláusulas primeira, segunda e quinta; Anexos I e II; condições, alterações e histórico.

`https://www.confaz.fazenda.gov.br/legislacao/convenios/1991/CV052_91`

**Situação:** página oficial acessada em 10/11/2026, com conferência focal da identificação do ato e da cláusula quinta. A íntegra dos anexos, a vigência de todos os NCMs, as correlações de códigos e as implementações estaduais não foram homologadas nesta consolidação.

A descrição e as condições precisam acompanhar o NCM no cadastro. Redações históricas não devem ser importadas como regras simultaneamente vigentes.

### [F05] SEFAZ/RJ — Consulta Tributária 095/2019

**Uso:** referência interpretativa para descrição, características, natureza e finalidade dos produtos candidatos.

`https://portal.fazenda.rj.gov.br/consulta-tributaria/wp-content/uploads/sites/45/2023/10/c095-SEI-04-079-000823-19.pdf`

**Situação:** fonte do adendo anterior; não reexaminada integralmente neste pacote.

### [F06] Receita Federal — CNPJ alfanumérico e IN RFB 2.229/2024

**Uso:** identificador textual de 14 posições, coexistência com CNPJ numérico e dígitos verificadores.

`https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-alfanumerico/cnpj-alfa`

`https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=141102`

`https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2024/outubro/cnpj-tera-letras-e-numeros-a-partir-de-julho-de-2026`

**Situação:** informações oficiais localizadas em 10/11/2026. A implementação deverá usar o algoritmo e os exemplos oficiais atualizados. Não transportar a validação numérica antiga para identificador com letras nem confundir o formato do CNPJ com o da chave de cada versão de documento fiscal.

### [F07] SEFAZ/RJ — Manual EFD ICMS/IPI

**Uso:** referência futura para informação de escrituração, códigos e registros, sem transmissão automática no MVP.

`https://portal.fazenda.rj.gov.br/efd/wp-content/uploads/sites/32/2023/09/Manual_EFD.pdf`

**Situação:** comando original menciona edição de 28/03/2025 e seção 2.15. A equipe deverá conferir versão e códigos da competência antes de implementar qualquer relatório específico. Não considerar a edição citada automaticamente a mais recente.

### [F08] SEFAZ/RJ — Consulta Tributária 054/2025

**Uso:** referência anterior sobre FECP em operações abrangidas pelo Convênio 52/91 e art. 5º do Decreto 45.607/2016.

`https://legislacao.fazenda.rj.gov.br/wp-content/uploads/054.pdf`

**Situação:** fonte do adendo 1.2, sem nova revisão integral nesta consolidação. A conclusão depende de enquadramento efetivo e vigência; não aplicar a operação fora das condições da consulta/norma.

### [F09] CONFAZ — Convênio ICMS 131/2026

**Uso:** controle de prorrogação, eficácia e cadeia normativa mencionados no adendo anterior; cláusulas primeira e quinta.

`https://www.confaz.fazenda.gov.br/legislacao/convenios/2026/CV131_26`

**Situação:** página oficial acessada em 10/11/2026. A cláusula quinta remete a entrada em vigor à publicação da ratificação nacional. Este pacote não conclui a verificação de toda a cadeia de ratificação e aplicação estadual, nem autoriza automaticamente períodos de 2027/2028. Essa falta de validação **não é afirmação de que a ratificação inexiste**.

### [F10] SEFAZ/PE — tabela de CFOP

**Uso:** referência de consulta indicada no comando anterior; confrontar com a tabela oficial e vigência aplicáveis.

`https://www.sefaz.pe.gov.br/legislacao/tributaria/documents/legislacao/tabelas/cfop.htm`

**Situação:** link histórico. CFOP produtivo deverá ser homologado por finalidade, operação e regime, sem simples troca do primeiro dígito.

## 3. Fontes jurídicas e de privacidade

### [J01] Código de Defesa do Consumidor — Lei 8.078/1990

**Dispositivos:** arts. 14 e 25 (responsabilidade), 46 (conhecimento das condições), 49 (arrependimento) e 51 (cláusulas abusivas).

`https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html`

**Situação:** texto oficial acessado em 10/11/2026; conferência focal das cautelas contratuais. Não constitui parecer sobre um contrato definitivo ou sobre a aplicação do CDC a cada contratante.

### [J02] Código Civil — Lei 10.406/2002

**Dispositivos:** arts. 412–413 (cláusula penal), 421–422 (contratos/boa-fé) e 423–424 (adesão).

`https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html`

**Situação:** texto oficial acessado em 10/11/2026; conferência focal dos arts. 412–413. Nenhuma fórmula ou percentual de multa SaaS foi aprovado neste pacote.

### [J03] Decreto 7.962/2013 — comércio eletrônico

**Dispositivos de referência:** arts. 2º, 4º e 5º.

`https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html`

`https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm`

**Situação:** referência preservada do adendo 1.3. A tentativa de reabertura encontrou limitação de acesso/erro automatizado. Conferir o texto oficial na revisão jurídica; os requisitos de transparência e cópia do contrato permanecem definidos no projeto.

### [J04] STJ — proteção do consumidor pessoa jurídica

**Publicação de referência:** “Consumidor pessoa jurídica: quando as empresas podem ter a proteção do CDC?”, de 08/09/2024.

`https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/2024/08092024-Consumidor-pessoa-juridica-quando-as-empresas-podem-ter-a-protecao-do-CDC.aspx`

**Situação:** fonte do adendo 1.3; referência institucional, não aprovação do enquadramento de todos os escritórios contratantes.

### [J05] ANPD — perguntas frequentes LGPD

`https://www.gov.br/anpd/pt-br/acesso-a-informacao/perguntas-frequentes`

**Situação:** referência para mapear papéis, finalidades, direitos, segurança e retenção. Requer revisão de privacidade específica do serviço; termos genéricos não demonstram conformidade integral.

## 4. Fontes técnicas de implementação

### [T01] Mercado Pago Developers — Assinaturas

`https://www.mercadopago.com.br/developers/pt/docs/subscriptions/overview`

**Uso:** documentação oficial para o gateway sugerido. Conferir conta, disponibilidade, API, webhooks, assinaturas e estados na implementação. Referência preservada; não foi feita integração ou teste de conta nesta entrega.

### [T02] Supabase — Row Level Security

`https://supabase.com/docs/guides/database/postgres/row-level-security`

**Uso:** referência técnica da arquitetura sugerida. Conferir documentação atual da versão escolhida. A especificação exige também autorização de API, worker e storage; RLS isolada não prova segurança integral.

## 5. Quadro de pendências de ativação

| ID | Definição necessária | Responsável a designar | O que fica bloqueado até resolver |
|---|---|---|---|
| P01 | Matriz RJ por modalidade, regime, competência, base e FECP | Responsável fiscal | Cálculo automático anunciado como homologado |
| P02 | Regra de arredondamento e divergências da planilha | Fiscal + programador | Uso das fórmulas como referência de produção |
| P03 | Acordos/atos de ST e responsabilidade por mercadoria/UF | Responsável fiscal | Afastamento automático de adicional por retenção |
| P04 | Íntegra e vigências do Convênio 52/91 e atos estaduais | Responsável fiscal | Catálogo completo de benefícios produtivos |
| P05 | Cadeia de prorrogação/ratificação/efeitos futuros | Responsável fiscal | Ativação de regras para períodos não validados |
| P06 | Primeiro ERP, versão, layout e ambiente de teste | Proprietário + integrador | Selo/afirmação de integração direta homologada |
| P07 | Preço, quotas pagas, descontos, suporte e margem | Proprietário/comercial | Publicação de ofertas pagas finais |
| P08 | Entidade contratante, modelo contratual e poderes de aceite | Jurídico + proprietário | Contratação pública com instrumento definitivo |
| P09 | Renovação, oposição, reajuste, multa e devolução | Jurídico + comercial | Prorrogação fixa e penalidades automáticas |
| P10 | Papéis de privacidade, bases, retenção e prestadores | Jurídico/privacidade + técnico | Uso real de dados fora do ambiente controlado |
| P11 | Conta gateway, credenciais e conciliação | Proprietário + técnico | Cobrança real |
| P12 | Emissão fiscal da receita do SaaS | Contabilidade da fornecedora | Operação comercial sem processo fiscal definido |
| P13 | Domínio, marca, suporte, infraestrutura e incidentes | Proprietário + técnico | Publicação comercial final |
| P14 | Amostras de XML autorizadas/anonimizadas e cálculos independentes | Fiscal + proprietário | Homologação ponta a ponta com fatos representativos |

As pendências não impedem desenvolver cadastro, importação, trilhas, telas, regras parametrizadas e integrações em sandbox. Impedem prometer que as condições faltantes já estão satisfeitas.

## 6. O que foi preservado dos materiais anteriores

A planilha original, os três MDs anteriores e o JSON de exemplos foram incluídos sem alterar seus bytes. A renomeação da planilha é apenas de arquivo. O manifesto registra origem, tamanho e SHA-256.

As faixas antigas de preço permanecem apenas no histórico; não prevalecem como tabela aprovada. A amostra NCM permanece desabilitada. Valores aritméticos demonstrativos não são publicados como alíquotas. A versão consolidada detalha o tratamento de ST e a decisão manual que antes estavam dispersos.
