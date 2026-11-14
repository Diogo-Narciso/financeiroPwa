# ADENDO 1.3 — AVISOS FISCAIS, ASSINATURAS E CONTRATOS COM PRAZO MÍNIMO

**Projeto:** Portal Inteligente de DIFAL — Oliveira Contabilidade.  
**Data:** 10/11/2026.  
**Natureza:** especificação funcional e textos propostos para revisão jurídica; não é contrato definitivo nem software implementado.  
**Arquivos de referência:** `COMANDO_MESTRE_PORTAL_DIFAL.md` e `ADENDO_BENEFICIOS_CONVENIO_52_91_V1_2.md`.

Este adendo complementa os documentos anteriores e prevalece em caso de conflito exclusivamente nos temas de avisos, aceites, contratação, cobrança, renovação e cancelamento. Não revalida os fundamentos tributários dos arquivos anteriores. Preservar o teste de 3 CNPJs e 5 XMLs de entrada por CNPJ; catálogo de saídas facultativo; decisões manuais auditáveis; análise individual de eventual retenção pelo remetente; documentos fiscais originais imutáveis.

## 1. DECISÕES DO PRODUTO E LIMITES

O usuário solicitou: aviso para consultar o contador antes de aplicar benefícios fiscais; assinatura recorrente flexível; contratos com prazo mínimo e preço reduzido; renovação automática.

Implementar esses recursos sem presumir exoneração integral da plataforma, sem esconder fidelidade e sem confundir recorrência de pagamento com prazo contratual. A mensagem de ciência não comprova enquadramento fiscal, não converte retenção identificada em pagamento comprovado e não sana erro de software.

Os períodos de 6 e 12 meses abaixo são propostas iniciais configuráveis. Nenhum preço, desconto, percentual de multa, prazo de oposição ou índice de reajuste está aprovado neste adendo. Não publicar esses parâmetros sem aprovação comercial e jurídica.

Referências: CDC, arts. 14, 25, 46, 49 e 51; Código Civil, arts. 412, 413 e 421 a 424; Decreto 7.962/2013, arts. 2º, 4º e 5º. A incidência do CDC depende da relação concreta; o cadastro por CNPJ não o afasta automaticamente. [F1–F4]

## 2. MENSAGEM VISÍVEL NO BENEFÍCIO FISCAL

### 2.1 Texto proposto para a tela

> **Possível benefício fiscal — validação necessária**  
> A plataforma identificou uma hipótese de benefício fiscal com base nos dados informados. Sua aplicação depende da confirmação dos requisitos legais, das características do produto e das condições da operação. Antes de reduzir ou dispensar o recolhimento, consulte seu contador ou responsável técnico. Esta indicação não substitui a análise profissional nem representa homologação pelo Fisco.

Exibir junto do cenário beneficiado, antes de sua confirmação e nos relatórios que contenham a hipótese. Não esconder o aviso apenas em termos de uso ou em um ícone. A fonte, a competência, a versão da regra e as pendências devem continuar visíveis.

No caso de usuário que seja o próprio contador, permitir que ele atue como responsável pela revisão dentro das permissões da organização. Não exigir contratação de terceiro apenas para cumprir o texto.

### 2.2 Confirmação para aplicar o cenário

Caixa inicialmente desmarcada:

> Revisei os requisitos e as informações desta operação e confirmo a aplicação deste cenário. Estou ciente de que a identificação automática não comprova, por si só, o direito ao benefício.

Ações: **Manter pendente**, **Aplicar benefício** e **Não aplicar benefício**. A caixa não pode impedir a escolha de manter pendente ou de rejeitar a sugestão. A escolha deve ser reversível por nova decisão versionada, preservando a anterior.

A confirmação é uma declaração do usuário, não evidência independente de revisão profissional. Não exigir número de CRC de quem não esteja se identificando como profissional habilitado; não rotular um aceite de usuário comum como parecer contábil. Quando houver revisão por responsável técnico, registrá-la separadamente, com os documentos de suporte disponíveis.

### 2.3 Pendências e decisão manual

Não permitir que a caixa de ciência preencha automaticamente requisitos legais desconhecidos. Quando faltarem regra vigente ou parâmetros essenciais, manter o resultado automático pendente. Uma escolha manual pode produzir um cenário manual claramente identificado, com premissas e justificativa, mas não uma conclusão fiscal homologada.

Manter separadas:

- decisão sobre o benefício: aplicar, não aplicar ou manter pendente;
- decisão sobre o DIFAL: seguir análise, incluir manualmente ou excluir manualmente;
- avaliação da retenção: candidata, comprovada para a obrigação analisada ou insuficiente;
- decisão de escrituração: CFOP e valores aprovados para exportação auxiliar.

Uma retenção de ICMS-ST no XML não deve excluir automaticamente toda hipótese de DIFAL. Preservar a verificação do tipo de retenção, da obrigação, dos itens, da operação e da evidência já prevista no projeto.

A exportação de decisão manual deve trazer esse rótulo; o aceite não autoriza adulterar o XML da NF-e. Lotes de operações diferentes não podem receber confirmação silenciosa por uma única aprovação genérica.

## 3. CLÁUSULA DE ESCOPO — TEXTO-BASE PARA REVISÃO JURÍDICA

> A plataforma é uma ferramenta de apoio à análise e à escrituração fiscal. As sugestões de classificação, incidência, retenção e benefícios utilizam os documentos e parâmetros disponíveis e devem ser conferidas pelo contratante ou por seu responsável técnico antes de sua utilização em obrigações fiscais. O contratante deverá fornecer informações corretas e registrar as decisões manuais que adotar. A plataforma manterá identificados os cenários, as premissas e as versões das regras utilizadas. Esta disposição não exclui responsabilidades legalmente atribuídas à fornecedora, inclusive por falhas próprias do serviço, nem implica renúncia a direitos do contratante.

Não usar: “não nos responsabilizamos por qualquer informação”, “o usuário assume todos os riscos” ou cláusula que transforme qualquer erro de cálculo em responsabilidade exclusiva do cliente.

Também não anunciar economia garantida, enquadramento automático definitivo ou aceitação assegurada pelo Fisco. Prever processo de comunicação, correção e rastreamento de erros materiais que afetem cálculos anteriores. A revisão do cliente não substitui testes do motor tributário.

## 4. MODELO COMERCIAL

### 4.1 Separar produto e forma de contratação

Preservar os planos de capacidade por CNPJ, XMLs, usuários e funcionalidades. Acrescentar modalidades contratuais independentes:

| Modalidade proposta | Prazo mínimo inicial | Cobrança | Preço |
|---|---:|---|---|
| Mensal flexível | Sem permanência mínima além do ciclo contratado | Mensal | Preço padrão aprovado |
| Compromisso semestral | 6 meses | Mensal ou antecipada, conforme oferta | Preço reduzido aprovado |
| Compromisso anual | 12 meses | Mensal ou antecipada, conforme oferta | Preço reduzido aprovado |
| Empresarial negociado | Definido no instrumento | Conforme instrumento | Proposta individual versionada |

Uma contratação anual pode ser cobrada mensalmente. Isso não a transforma em plano mensal sem fidelidade. Pagamento anual antecipado também não é sinônimo de doze cobranças recorrentes: tratar os fluxos e eventuais devoluções separadamente.

As quotas de XMLs continuam com período próprio, normalmente mensal; pagamento anual não deve multiplicá-las ou acumulá-las sem previsão explícita. Não reduzir qualidade fiscal, auditoria ou segurança conforme a modalidade de pagamento.

### 4.2 Resumo obrigatório do checkout como requisito do projeto

Mostrar antes do aceite: modalidade, capacidade, preço padrão de comparação, desconto real, preço contratado, periodicidade de cobrança, total do prazo inicial, início e fim da permanência, regra de renovação, eventual novo prazo mínimo, reajuste, prazo de oposição, cancelamento, multa e regras de devolução.

Apresentar simultaneamente o valor mensal equivalente e o desembolso efetivo quando houver antecipação. Não destacar apenas o equivalente mensal de uma cobrança anual.

Caixas distintas e desmarcadas para condições contratuais e ciência do prazo mínimo/renovação, quando aplicável. O consentimento de marketing é separado e facultativo. Não chamar toda evidência de contratação de “consentimento LGPD”; documentar as bases e finalidades adequadas na política de privacidade.

Disponibilizar a versão aceita do contrato para conservação e reprodução, com confirmação da contratação. Não apresentar mera caixa marcada como garantia absoluta da validade de todas as cláusulas. [F1, F3]

### 4.3 Alterações de preço e plano

Preservar preço, desconto e política da versão contratada. Alterar cadastro de planos não modifica contratos vigentes silenciosamente. Reajustes e alterações materiais seguem a previsão contratual e a avaliação jurídica, com comunicação apropriada. Upgrade ou downgrade não reinicia fidelidade sem novo aceite específico ou previsão validada aplicável ao caso.

## 5. RENOVAÇÃO AUTOMÁTICA

Criar políticas distintas. Não equiparar pagamento bem-sucedido, uso continuado ou silêncio a aceite irrestrito de um novo período mínimo.

### 5.1 Política recomendada para contratação direta no site

`continuous_service_without_new_commitment`

Após o prazo mínimo inicial, o serviço e a cobrança podem continuar automaticamente conforme a oferta aceita, mas sem criar nova fidelidade silenciosa. Um novo compromisso com desconto exige aceite específico da proposta renovada. Preço e modalidade pós-prazo devem ser informados previamente, sem migração oculta para valor mais alto.

Texto-base:

> Encerrado o prazo mínimo inicial, a assinatura continuará ativa nas condições de continuidade informadas na contratação, salvo solicitação de cancelamento. A continuidade do serviço não cria, por si só, novo prazo mínimo. A adesão a novo período de permanência com desconto será objeto de confirmação específica.

Esta é uma escolha recomendada de produto para reduzir controvérsias, não a afirmação de que toda renovação de prazo em contratos empresariais seja proibida.

### 5.2 Opção de prorrogação por igual prazo em contrato empresarial

`fixed_term_auto_renewal_reviewed`

Prever tecnicamente a renovação por igual período solicitada pelo proprietário, mas habilitá-la somente após revisão jurídica do modelo aplicável e aceite informado de cláusula destacada. Não habilitar apenas porque o contratante informou CNPJ.

O contrato deverá identificar período renovado, preço ou mecanismo objetivo de reajuste, benefício associado, oposição, cancelamento, eventual multa e canal de comunicação. A validade e a cobrança dependem do instrumento e da situação concreta. [F1, F2, F4]

Texto-base com campos que precisam ser preenchidos e aprovados:

> O contrato terá prazo inicial de [PRAZO] meses e, observadas as condições desta cláusula, será prorrogado por iguais períodos, salvo oposição apresentada pelo canal [CANAL] até [DATA OU CRITÉRIO]. Antes do encerramento do prazo de oposição, a contratada informará a data da renovação, a duração, o preço aplicável, as condições de permanência e o procedimento para não renovar. O desconto, eventual multa e as hipóteses de encerramento sem penalidade constarão expressamente do quadro-resumo, preservados os direitos legais do contratante.

Não publicar esse texto com campos em aberto. Não tratar um aviso posterior ao prazo de oposição como oportunidade suficiente de evitar a renovação. Alteração material não prevista requer o tratamento de aceite definido na revisão jurídica.

### 5.3 Notificações e controle

Exibir data da renovação e prazo de oposição no painel. Enviar lembretes com antecedência efetiva e registrar tentativa, entrega quando disponível, conteúdo e destinatário. O prazo exato é parâmetro de produto/contrato, não uma regra legal geral deste documento.

Caso se adotem, por exemplo, lembretes a 30 e 7 dias da renovação, esse arranjo só serve quando não houver prazo de oposição anterior. Para oposição até 30 dias antes, os lembretes úteis devem ocorrer antes dessa data, por exemplo a 45 e 35 dias, sem prejuízo de aviso adicional. Aplicar calendário e fuso definidos, com data-limite visível.

Em caso de falha material na notificação exigida pela política contratual, encaminhar para revisão, sem gerar automaticamente novo período de multa. Eventual continuidade de acesso/cobrança depende da política aceita; não presumir automaticamente gratuidade ou encerramento total.

## 6. CANCELAMENTO, MULTA E ARREPENDIMENTO

Permitir tanto **Não renovar ao final do período** quanto **Solicitar encerramento antecipado**. Desativar a renovação não deve cessar imediatamente o acesso já contratado, nem gerar multa apenas por evitar o próximo período.

Receber o pedido pelo portal e confirmar imediatamente com protocolo. Não condicionar o registro do pedido ao pagamento prévio de multa ou ao contato obrigatório com vendedor. Separar encerramento, acerto financeiro e acesso/exportação dos documentos. Atendimento e preservação do contrato devem observar o regime aplicável. [F3]

Uma eventual multa exige previsão clara e análise de proporcionalidade. O Código Civil limita a cláusula penal e admite redução equitativa em caso de cumprimento parcial ou excesso manifesto. Não existe, neste adendo, percentual geral de multa validado para SaaS. Não importar automaticamente regras setoriais de telecomunicações. [F2]

Para implementação, manter `cancellation_fee_policy = pending_legal_approval` até aprovação de fórmula, base, teto, proporcionalidade, hipóteses de exclusão e forma de cálculo. Uma proposta comercial pode vincular a compensação ao desconto concedido e ao período restante, mas isso não é fórmula legal universal. Não programar cobrança automática de todas as mensalidades futuras como regra geral de rescisão, nem acumular saldo integral, devolução de descontos e outra multa para o mesmo fato sem análise específica.

Prever tratamento de cancelamento motivado por falha da própria fornecedora, direitos legais e devoluções cabíveis. No exercício do direito de arrependimento aplicável à contratação de consumo à distância, observar o prazo legal de sete dias e a devolução sem penalidade. Um teste gratuito não deve ser usado para eliminar esse direito na contratação paga. O enquadramento contratual precisa ser avaliado, sem presunção automática baseada em CPF/CNPJ. [F1, F3, F4]

Contratação de prazo mínimo melhora previsibilidade, mas não garante recebimento: manter inadimplência, conciliação, contestação e cancelamento como eventos distintos.

## 7. AUDITORIA E DADOS

### 7.1 Decisões fiscais

Registrar organização, empresa, usuário, papel, data/hora, item/lote identificado, cenário anterior e final, motivos, evidências, versão da regra e versão do aviso exibido. Guardar hash da representação imutável aprovada. Mudança material de fatos, regra, competência ou resultado exige nova confirmação; não reescrever o histórico.

### 7.2 Contratação

Acrescentar ou ampliar entidades:

- `contract_templates`, `contract_versions`, `customer_contracts`;
- `contract_acceptances`, `subscription_terms`, `renewal_events`;
- `renewal_notices`, `cancellation_requests`, `cancellation_settlements`;
- `disclaimer_versions`, `benefit_acknowledgements`.

Campos mínimos: `tenant_id`, `plan_version_id`, `contract_version_id`, `billing_interval`, `commitment_months`, `initial_term_start`, `initial_term_end`, `current_term_start`, `current_term_end`, `renewal_policy`, `renewal_notice_policy_id`, `non_renewal_deadline`, `cancel_at_period_end`, `base_price`, `discount`, `contract_price`, `initial_term_total`, `post_term_price_rule`, `price_adjustment_rule`, `fee_policy_id`, `legal_review_status` e referências dos aceites.

O aceite deve apontar ao conteúdo exato apresentado, preço, condições, identidade autenticada e data/hora. Registros técnicos adicionais devem ser proporcionais, protegidos e sujeitos à política de retenção. Não guardar cartão completo ou CVV. Aplicar o isolamento por organização já previsto no comando mestre.

Separar estados da assinatura, do pagamento e do contrato. Não usar um único campo `active` para inferir quitação, permanência, direito de acesso e renovação.

## 8. COBRANÇA E SERVIÇOS DE DOMÍNIO

O sistema será a fonte contratual; o gateway será fonte de eventos financeiros confirmados, reconciliados com as regras de acesso. A cobrança não deve criar ou estender fidelidade sem evento contratual válido.

Serviços propostos: `ContractAcceptanceService`, `RenewalEligibilityService`, `RenewalNoticeService`, `CancellationQuoteService`, `CancellationService` e `BenefitAcknowledgementService`.

Operações propostas, sujeitas à autorização no servidor:

- consultar resumo e contrato vigente;
- aceitar proposta e condições específicas;
- desativar renovação e obter protocolo;
- simular e solicitar encerramento antecipado;
- consultar valores, devoluções e prazo de acesso;
- registrar revisão de benefício e decisão manual;
- reconciliar pagamentos e notificações.

Processar eventos de pagamento com autenticação, idempotência e tratamento de ordem. Um webhook repetido não cria cobrança, contrato, prazo mínimo ou multa em duplicidade. Observar pedidos de não renovação já registrados antes de processar a cobrança do novo período. Pagamento não comprovado não libera contrato novo apenas por retorno visual do checkout.

## 9. TESTES DE ACEITE

1. Benefício candidato mostra aviso e não é chamado de benefício garantido.
2. Caixa desmarcada não aprova automaticamente a aplicação.
3. Escolher manter pendente ou rejeitar benefício continua disponível.
4. Falta de requisito não desaparece após marcar ciência.
5. Decisão manual conserva recomendação original, premissas e justificativa.
6. Mudança material no cálculo pede nova revisão, sem apagar a anterior.
7. Aprovação por usuário comum não é rotulada como parecer profissional.
8. Mensal flexível não ganha multa de fidelidade nem prazo de 12 meses.
9. Anual pago mensalmente exibe compromisso e total inicial antes do aceite.
10. Pagamento antecipado exibe desembolso total, não apenas equivalente mensal.
11. Quotas mensais permanecem mensais em contrato anual, salvo previsão distinta aceita.
12. Política de continuidade simples não cria nova fidelidade ao renovar acesso.
13. Renovação por igual prazo fica desabilitada sem revisão jurídica e aceite apropriado.
14. Lembretes ocorrem antes do prazo de oposição, não apenas antes da cobrança.
15. Pedido tempestivo de não renovação impede início do próximo período contratual.
16. Desativar renovação preserva acesso contratado até o término aplicável.
17. Pedido de encerramento é registrado mesmo com multa contestada ou pendente.
18. Política de multa não aprovada não gera débito automático.
19. Arrependimento aplicável e falha da fornecedora recebem tratamento próprio.
20. Upgrade, downgrade e ajuste de preço não reiniciam prazo mínimo silenciosamente.
21. Webhook duplicado ou fora de ordem não cria renovação nem multa duplicada.
22. Mudança no modelo de contrato não altera o conteúdo anteriormente aceito.
23. Exportação preserva XML original e distingue revisão, hipótese e opção manual.
24. Organizações distintas não acessam contratos, aceites ou documentos entre si.

## 10. COMANDO PARA O AGENTE DE DESENVOLVIMENTO

> Acrescente ao Portal Inteligente de DIFAL os requisitos deste Adendo 1.3, preservando o comando mestre e o Adendo 1.2 nos demais temas. Implemente avisos junto dos benefícios fiscais, confirmação não pré-marcada vinculada ao cenário, opções de manter pendente/aplicar/rejeitar e decisões manuais independentes e auditáveis. O aviso não deve afirmar exoneração integral da plataforma nem substituir requisitos legais ausentes.
>
> Separe capacidade do plano, periodicidade da cobrança, prazo contratual e renovação. Prepare modalidades mensal flexível, semestral, anual e empresarial negociada. Preços, descontos e multas ficam configuráveis e não podem ser publicados sem aprovação. Implemente continuidade automática sem nova fidelidade como política recomendada de contratação direta; prepare a renovação por igual prazo para contratos empresariais revisados, com aceite destacado, notificações anteriores ao prazo de oposição e revisão da aplicabilidade jurídica. Não habilite essa política apenas porque o cadastro usa CNPJ.
>
> Entregue checkout com resumo completo, contrato versionado para download, trilha de aceites, painel de renovação, não renovação, cancelamento antecipado, conciliação de pagamentos e testes. Não transforme pagamento, silêncio ou uso continuado em aceite genérico de novos encargos. Não impeça o protocolo do cancelamento por multa pendente. Implemente regras de arrependimento e devolução conforme a classificação jurídica aprovada. Não ative fórmula de multa ainda não homologada.
>
> Entregue migrações, serviços, interfaces, testes e instruções de execução. Informe o que está implementado, em demonstração ou pendente de validação. Não declare o contrato juridicamente validado nem o sistema publicado apenas por gerar telas ou documentos.

## 11. FONTES E PONTOS DE VALIDAÇÃO

Consulta focal em 10/11/2026. As referências sustentam as cautelas gerais; não constituem aprovação individual do contrato, parecer sobre todas as normas estaduais ou confirmação de validade de qualquer cláusula de renovação.

**[F1] Código de Defesa do Consumidor — Lei 8.078/1990, texto atualizado.** Arts. 14 e 25 (responsabilidade), 46 (conhecimento das condições), 49 (arrependimento) e 51 (cláusulas abusivas).  
`https://www2.camara.leg.br/legin/fed/lei/1990/lei-8078-11-setembro-1990-365086-normaatualizada-pl.html`

**[F2] Código Civil — Lei 10.406/2002, texto atualizado.** Arts. 412–413 (cláusula penal), 421–422 (contratos e boa-fé) e 423–424 (adesão).  
`https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html`

**[F3] Decreto 7.962/2013.** Arts. 2º, 4º e 5º: informação da oferta, contratação eletrônica, conservação do contrato, atendimento e arrependimento nas relações de consumo.  
`https://www2.camara.leg.br/legin/fed/decret/2013/decreto-7962-15-marco-2013-775557-publicacaooriginal-139266-pe.html`

**[F4] STJ — Consumidor pessoa jurídica: quando as empresas podem ter a proteção do CDC?** Publicação de 08/09/2024, com referência, entre outros, ao REsp 2.020.811. Avaliação da destinação e da vulnerabilidade no caso concreto.  
`https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias/2024/08092024-Consumidor-pessoa-juridica-quando-as-empresas-podem-ter-a-protecao-do-CDC.aspx`

Antes da venda, submeter a advogado: escopo e responsabilidades, publicidade, enquadramento dos contratantes, prazo mínimo, desconto, prorrogação, oposição, reajuste, multa, devoluções, privacidade e evidências do aceite. Comercialmente, validar preços e descontos frente a processamento, infraestrutura, manutenção fiscal, suporte, taxas e margem. Não há preço definitivo ou contrato aprovado nesta entrega.
