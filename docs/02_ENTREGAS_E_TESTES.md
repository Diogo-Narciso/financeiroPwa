# Entregas e testes de aceite

**Portal Inteligente de DIFAL | Versão 1.4 | 10/11/2026**

Este roteiro transforma a especificação em entregas verificáveis. Os testes abaixo são **requisitos a executar pelo programador**, não resultados de testes de um software já existente.

## 1. Etapas de implementação

| Etapa | Conteúdo | Critério para aceitar |
|---|---|---|
| E0 — Fundação | Repositório, arquitetura, banco, ambientes, identidade e observabilidade inicial | Projeto executa localmente; migrações reproduzíveis; isolamento demonstrado |
| E1 — Cadastro e teste | Site, login, organizações, empresas, perfil tributário, questionário e quotas | Três CNPJs e cinco entradas/CNPJ controlados no servidor, inclusive concorrência |
| E2 — Documentos e catálogo | Upload XML/ZIP, parsing, storage privado, saídas e XLSX opcionais | Originais preservados, erros claros, duplicidade controlada e análise sem catálogo |
| E3 — Revisão e decisão | Classificação, finalidade, ST/retenção, manual e auditoria | Cada decisão mantém a análise original; usuário consegue revisar sem apagar evidências |
| E4 — Motor e benefícios | Regras versionadas, cálculo, FECP, biblioteca de benefícios, cenários e avisos | Casos aritméticos reproduzidos; casos fiscais homologados separadamente; faltas viram pendências |
| E5 — Escrituração | CFOP por item, ZIP genérico, relatórios e adaptador inicial | Hash original idêntico; aprovação por item; ERP só marcado compatível após importação real |
| E6 — Contratação e cobrança | Planos, prazo mínimo, aceite, renovação, cancelamento, pagamentos e conciliação | Contrato imutável; cobrança idempotente; renovação respeita oposição e revisão jurídica |
| E7 — Homologação e publicação | Segurança, privacidade, carga, restauração, fiscal, jurídico e suporte | Checklist de lançamento aprovado; pendências e escopo comercial explícitos |

Não há estimativa de prazo ou custo neste pacote. A equipe deverá apresentar sua estimativa com dependências e critérios de aceite, sem confundir uma etapa visual com aplicação funcional.

## 2. Matriz de testes

Registrar por teste: identificação, ambiente, versão do software/regra, dados sintéticos utilizados, passos, resultado esperado/obtido, evidência e responsável. Acrescentar coluna de status no acompanhamento da equipe.

### 2.1 Organização, cadastro e teste gratuito

| ID | Situação | Resultado esperado |
|---|---|---|
| A01 | Escritório ou pessoa física cria organização | Fluxo funciona sem exigir CNPJ próprio do escritório para liberar a pessoa física |
| A02 | Cadastro do quarto CNPJ no teste | Bloqueio no servidor, mensagem clara e ausência de inserção parcial |
| A03 | Excluir/arquivar CNPJ e cadastrar outro | Não reinicia vaga; suporte trata correção legítima com auditoria |
| A04 | Sexta NF-e válida da mesma empresa | Bloqueio por CNPJ, mesmo enviada em ZIP |
| A05 | Reimportação da mesma chave/mesmos bytes | Retorna documento existente, sem cota ou análise duplicada |
| A06 | Mesmo identificador e bytes diferentes | Não sobrescreve original; variante vai para revisão/quarentena |
| A07 | Arquivo inválido ou CNPJ destinatário divergente | Erro claro e ausência de consumo definitivo da cota |
| A08 | Duas importações concorrentes na última vaga | Apenas uma consome a vaga; contadores permanecem consistentes |
| A09 | Importação de saídas e cadastro de produtos | Não consome a cota das cinco entradas; limite técnico continua ativo |
| A10 | CNPJ com zeros e CNPJ alfanumérico válido | Preserva conteúdo e valida segundo formato oficial; inválidos são rejeitados |
| A11 | Alteração de regime/perfil por competência | Histórico anterior preservado; nova análise usa vigência pertinente |
| A12 | Pessoa não autorizada tenta aprovar cenário | Backend impede; trocar botão ou chamar API não contorna o papel |

### 2.2 Importação, segurança e produto

| ID | Situação | Resultado esperado |
|---|---|---|
| B01 | XML sem catálogo de saídas | Análise funciona com evidência disponível; confiança/pendência explicitadas |
| B02 | NFC-e, NFS-e ou CT-e em lote de NF-e | Documento não é convertido silenciosamente em compra modelo 55 |
| B03 | XML sem protocolo ou sem consulta atual à SEFAZ | Status limitado visível; não afirmar autorização atual confirmada |
| B04 | Evento de cancelamento conhecido | Nota não integra exportação ordinária de apuração como válida |
| B05 | Remessa, retorno, transferência ou devolução | Triagem específica; não calcula como compra comum |
| B06 | Campo de tributo ausente versus zero | Estados distintos no parser, cálculo e relatório |
| B07 | ZIP com caminhos maliciosos/expansão exagerada | Rejeição segura, sem escrita fora do destino nem indisponibilidade |
| B08 | XML com entidades externas | Parser bloqueia acesso externo e expansão perigosa |
| B09 | Fórmula maliciosa em célula/texto de catálogo | Não executa; exportação tabular neutraliza risco |
| B10 | Dois fornecedores usam o mesmo `cProd` | Não funde os produtos sem correspondência segura |
| B11 | Item vendido e também consumido pela empresa | Permite confirmar consumo, mesmo existindo no catálogo de vendas |
| B12 | NF-e com itens de finalidades distintas | Classificação/CFOP/tributação independentes por item |
| B13 | Mesmo item com finalidade parcial | Alocações reconciliadas ou pendência explícita; nunca tributar silenciosamente toda a quantidade |
| B14 | Informação complementar instrui a IA a acessar outro tenant | Conteúdo tratado como dado não confiável; nenhuma instrução é executada |

### 2.3 ST, responsabilidade e retenção

| ID | Situação | Resultado esperado |
|---|---|---|
| C01 | CEST preenchido sem outros elementos | Não conclui recolhimento nem dispensa automaticamente DIFAL |
| C02 | ICMS-ST destacado em uma linha de nota mista | Não afasta imposto de todos os itens |
| C03 | Retenção anterior versus retenção da operação | Grupos e datas preservados; não tratados como o mesmo fato |
| C04 | Convênio/protocolo citado com operação não abrangida | Pista registrada, mas conclusão permanece incompatível/pendente |
| C05 | Responsabilidade do remetente confirmada pela regra | Resultado respeita a responsabilidade sem exigir duplicidade por ausência de guia individual |
| C06 | Retenção comparável confirmada para o item | Evita dupla exigência conforme regra homologada; não abate tributo estranho |
| C07 | Valor retido incompatível ou diferença não explicada | Exibe divergência; não zera nem cobra diferença automaticamente sem regra |
| C08 | Guia anexada de outro período, tributo ou destinatário | Não reconhece como prova da obrigação analisada |
| C09 | Mesma retenção vinculada duas vezes | Bloqueia dupla utilização/abatimento |
| C10 | Destaque existente, sem comprovante | Exibe retenção identificada, não pagamento comprovado |
| C11 | Benefício e retenção no mesmo item | Calcula cenário pertinente e avalia correspondência, sem abatimento em duplicidade |
| C12 | Risco de pagamento a maior | Alerta de possível duplicidade, não restituição/crédito garantido |

### 2.4 Decisão manual e auditoria

| ID | Situação | Resultado esperado |
|---|---|---|
| D01 | Revisão inicial | Caixa manual desmarcada; análise automática preservada |
| D02 | Usuário inclui DIFAL contra sugestão do sistema | Permite com permissão/motivo; registra divergência e origem dos valores |
| D03 | Usuário exclui DIFAL calculado | Preserva cálculo anterior; resultado escolhido aparece como manual |
| D04 | Decisão manual sem justificativa | Não confirma |
| D05 | Alteração de DIFAL sem definir FECP | Exige revisão do componente, sem zerá-lo implicitamente |
| D06 | Aplicar escolha em lote | Prévia, seleção explícita, quantidade/valores e evento por item |
| D07 | Nova compra do mesmo NCM | Não herda decisão manual anterior como norma automática |
| D08 | Reprocessamento muda fatos ou cálculo | Conserva decisão antiga e solicita revalidação |
| D09 | Voltar à análise do sistema | Novo evento; histórico não é removido |
| D10 | Usuário fornece valor sem regra homologada | Exportável apenas como decisão manual identificada, sem alegar respaldo legal |
| D11 | Checkbox manual em nota cancelada/arquivo inválido | Não contorna bloqueio estrutural ou documental |
| D12 | Registro de usuário comum | Não recebe rótulo de parecer de profissional habilitado sem verificação |

### 2.5 Motor e benefícios fiscais

| ID | Situação | Resultado esperado |
|---|---|---|
| E01 | Aquisição interna | Não aplica DIFAL interestadual por default |
| E02 | UF/regime/modalidade sem regra homologada | Fora de escopo/pendência, nunca alíquota inventada |
| E03 | Falta de parâmetro essencial | Sem resultado automático definitivo; não mostra R$ 0,00 como não incidência |
| E04 | Dois cenários para benefício | Não soma A+B; identifica referência contrafactual e hipótese condicionada |
| E05 | NCM coincide, descrição não coincide | Benefício não concedido automaticamente |
| E06 | Mesmo NCM em dois enquadramentos | Mostra candidatos e condições; não escolhe o menor imposto |
| E07 | Condição herdada do grupo não atendida | Enquadramento não confirmado |
| E08 | NCM histórico/sucessor presumido | Exige correlação e revisão; não modifica XML |
| E09 | Operação a 4% com benefício candidato | Não zera imposto automaticamente |
| E10 | Tratamento de FECP em cenário favorecido RJ | Segue regra específica homologada; não soma 2% por padrão |
| E11 | Data fora da vigência ou eficácia não confirmada | Bloqueia aplicação automática; não ativa 2027/2028 pela amostra |
| E12 | Ciência marcada com requisitos ainda desconhecidos | Requisitos continuam pendentes |
| E13 | Semente JSON de exemplos | Continua desativada para aplicação fiscal automática |
| E14 | ICMS de origem reduzido | Conserva base, nominal, efetivo, retirada da base e dedução separadamente |
| E15 | Alterar carga de recomposição | Divisor acompanha parâmetro; não permanece 0,78 fixo |
| E16 | Caso didático 1.000/120/22%, 20%+2% | Demonstra 128,20 por componentes e 128,21 apenas pelo total; política explícita |
| E17 | Caso didático 1.000/40/8,8% | Reproduz 52,63 sob a fórmula ilustrativa, sem promovê-la a regra legal |
| E18 | Resultado matemático negativo | Não converte em crédito nem oculta inconsistência sem tratamento próprio |
| E19 | Nova versão da regra | Cálculos antigos mantêm versão; recálculo cria execução separada |
| E20 | Duas regras incompatíveis vigentes | Publicação/conclusão bloqueada ou encaminhada à revisão, sem escolha oportunista |
| E21 | IA tenta sugerir percentual sem fonte | Motor ignora como regra e mantém pendência |
| E22 | Rateio de encargos | Soma reconcilia; valores por item não são adicionados novamente |

### 2.6 Exportação e ERP

| ID | Situação | Resultado esperado |
|---|---|---|
| F01 | Exportar ZIP e comparar original | SHA-256 do XML de saída idêntico ao da importação |
| F02 | CFOP de entrada diferente do emitente | Ajuste apenas no mapeamento/arquivo auxiliar |
| F03 | ERP requer XML proprietário | Arquivo claramente auxiliar, sem simular NF-e autorizada |
| F04 | Nota parcialmente aprovada | Original completo com pendências; integração bloqueia se layout não suportar |
| F05 | Decisão manual exportada | Rótulo, motivo, valores antes/depois, usuário e versão presentes |
| F06 | Hipótese de benefício exportada | Aviso, requisitos e status preservados |
| F07 | Novo arquivo para mesma nota | Identifica exportação anterior e evita orientar duplicação silenciosa de lançamentos |
| F08 | Compatibilidade com primeiro ERP | Importação real documentada e conferida antes de exibir “homologado” |
| F09 | Planilha/CSV aberto em outra configuração regional | Formato documentado e valores não são reinterpretados incorretamente |

### 2.7 Contratação, renovação e pagamento

| ID | Situação | Resultado esperado |
|---|---|---|
| G01 | Plano mensal flexível | Sem prazo anual ou multa de fidelidade implícitos |
| G02 | Anual com pagamento mensal | Checkout mostra compromisso e total do período, não apenas mensalidade |
| G03 | Pagamento antecipado | Mostra desembolso total e equivalente mensal corretamente |
| G04 | Quota mensal em plano anual | Não multiplica/acumula sem previsão aceita |
| G05 | Oferta sem preço/política aprovados | Não é publicada para contratação real |
| G06 | Continuidade padrão após compromisso inicial | Não cria nova fidelidade silenciosa |
| G07 | Renovação por igual período sem revisão jurídica | Política bloqueada |
| G08 | Contratante informa CNPJ | Não afasta CDC nem ativa automaticamente renovação fixa |
| G09 | Lembrete depois do prazo de oposição | Falha sinalizada; não tratado como aviso tempestivo |
| G10 | Não renovação tempestiva | Impede próximo período e mantém acesso do período contratado |
| G11 | Cancelamento com multa contestada | Registra solicitação/protocolo; disputa não impede o pedido |
| G12 | Multa com política pendente | Não gera débito automático |
| G13 | Arrependimento aplicável ou falha da fornecedora | Fluxo específico de encerramento/devolução sem penalidade indevida |
| G14 | Upgrade/downgrade | Não reinicia fidelidade nem apaga documentos silenciosamente |
| G15 | Alteração de template ou tabela de preços | Não altera retroativamente oferta/contrato aceitos |
| G16 | Webhook duplicado/fora de ordem | Sem duplicidade de cobrança, contrato, prazo ou multa |
| G17 | Retorno visual de checkout sem pagamento confirmado | Não libera acesso pago por parâmetro de URL |
| G18 | Corrida entre cancelamento e renovação | Decisão transacional coerente e protocolo preservado |
| G19 | Falha de entrega de aviso exigido | Renovações sensíveis vão à revisão conforme política, sem novo compromisso automático |
| G20 | Marketing desmarcado | Contratação funciona sem consentimento de marketing |

### 2.8 Privacidade, segurança e operação

| ID | Situação | Resultado esperado |
|---|---|---|
| H01 | Organização A troca ID para acessar B | API, storage, worker e exportação recusam |
| H02 | Link de download expirado/revogado | Acesso recusado; novo link exige autorização |
| H03 | Papel `billing` consulta XML fiscal sem permissão | Acesso recusado |
| H04 | Token privilegiado procurado no bundle do frontend | Não está presente |
| H05 | Backup restaurado em ambiente controlado | Banco, vínculos e arquivos reconciliados; evidência registrada |
| H06 | Falha parcial de lote | Reprocessa com idempotência sem duplicar cota ou dados |
| H07 | Pedido de exclusão e retenção contratual | Fluxo conforme política aprovada, sem promessa de retenção infinita |
| H08 | Regra fiscal suspensa após erro | Novos usos bloqueados, históricos preservados e impactados identificáveis |
| H09 | Uso de IA externo não configurado | Nenhum envio de documentos a terceiro |
| H10 | Alteração de documento/decisão aprovada | Nova versão/evento; nenhuma sobrescrita silenciosa |

## 3. Checklist de lançamento

- [ ] Fluxo completo demonstrado com dados sintéticos e amostra real autorizada em homologação.
- [ ] Isolamento, quotas, concorrência e uploads testados no backend.
- [ ] Regras fiscais necessárias ao escopo inicial aprovadas e vinculadas a fontes/competências.
- [ ] Casos fiscais confrontados com cálculos independentes; planilha de referência revisada.
- [ ] Distinção entre destaque, responsabilidade, retenção e pagamento demonstrada.
- [ ] Amostras de benefício não ativadas como catálogo completo.
- [ ] Escolhas manuais identificadas e auditáveis em tela/relatório/exportação.
- [ ] XML original preservado; nenhuma “NF-e corrigida” indevida.
- [ ] Integração ERP anunciada apenas no escopo efetivamente homologado.
- [ ] Preços, capacidades, contratos, renovação, multa e privacidade revisados e aprovados.
- [ ] Conta real do provedor de pagamento, conciliação, cancelamento e devolução testados.
- [ ] Emissão fiscal da assinatura, suporte e atendimento operacional definidos.
- [ ] Backup/restauração, monitoramento, tratamento de incidentes e rollback ensaiados.
- [ ] Domínio, certificados de acesso, credenciais e ambientes separados.
- [ ] Oferta comercial descreve fielmente funcionalidades e limitações do lançamento.

## 4. Evidências de entrega obrigatórias

Fornecer link/identificação do commit, versão de regras, comando de instalação, migrações, variáveis necessárias, instruções de testes, resultados, arquivos de exemplo e relatório de limitações. Credenciais não devem ser enviadas em MD público.

Homologação fiscal, jurídica e de integração são independentes. Um resultado positivo em testes de matemática ou de interface não substitui os demais.
