# ADENDO 1.2 — BENEFÍCIOS FISCAIS, CONVÊNIO ICMS 52/91 E PLANILHA DE REFERÊNCIA

**Data de revisão:** 10/11/2026.  
**Projeto:** Portal Inteligente de DIFAL — Oliveira Contabilidade.  
**Natureza:** especificação de desenvolvimento e revisão focal da planilha; não é aplicativo implementado, base completa de NCMs nem homologação fiscal de operações concretas.

Este adendo complementa os requisitos anteriores. Preservar: teste de 3 CNPJs e 5 XMLs de entrada por CNPJ; saídas/catálogo facultativos; análise por item; prevenção de duplicidade por ST/DIFAL-ST; decisão manual do cliente com histórico; XML original imutável e exportação auxiliar para escrituração.

## 1. COMANDO PARA O DESENVOLVEDOR

> Implemente um módulo “Benefícios fiscais identificados” no Portal Inteligente de DIFAL. Comece pelo Convênio ICMS 52/1991, com cadastro versionado dos seus Anexos I e II e vínculo às regras estaduais aplicáveis por competência. O sistema deve reconhecer candidatos por NCM e descrição, apresentar o fundamento e as condições, solicitar confirmação dos fatos relevantes e comparar cenários sem e com o benefício. Nunca transforme uma lista de NCMs em uma regra automática de DIFAL zero.
>
> Use o arquivo JSON anexo exclusivamente como amostra de demonstração e testes: são 10 enquadramentos e 9 NCMs distintos, NÃO a lista completa dos anexos. Mantenha os registros desabilitados para cálculo automático até homologação específica. A ingestão integral dos anexos deve observar as versões vigentes e excluir da seleção atual as redações históricas.
>
> Separe o enquadramento do benefício, a incidência do DIFAL, o responsável pelo recolhimento, a retenção já conferida e a decisão final do usuário. A escolha manual não modifica o XML original, não apaga o parecer automático e não constitui comprovação de requisito legal.
>
> Entregue migrações, serviços de domínio, telas, importador de regras, auditoria, testes e instruções de execução. Não declare concluída uma integração, uma base normativa ou uma fórmula de produção sem teste e homologação.

## 2. BASE NORMATIVA E ESCOPO

O Convênio ICMS 52/91 contempla equipamentos industriais no Anexo I e máquinas/implementos agrícolas no Anexo II. Sua cláusula quinta trata do diferencial de alíquotas. A cláusula primeira prevê carga interna de 8,80% para os produtos industriais abrangidos; a segunda prevê 5,60% para os agrícolas abrangidos. São cargas efetivas em hipóteses próprias, não percentuais universais para toda máquina ou qualquer operação.

O cadastro deve preservar também as cargas interestaduais, seus percursos e exceções. Não misturar “alíquota nominal”, “carga efetiva”, “percentual de base remanescente” e “percentual de redução”. Não aplicar a mesma redução duas vezes.

A Consulta RJ 095/2019 esclarece que não basta o NCM: devem ser observadas descrição, características e finalidade. O comprador não precisa ser presumido industrial apenas para que o produto seja examinado; CNAE, isoladamente, não concede nem afasta o benefício.

A Consulta RJ 069/2024, especialmente a resposta 8, evidencia que o benefício pode afastar o DIFAL em determinada operação, mas ressalva operações sujeitas à alíquota interestadual de 4%. Não cadastrar a regra “Convênio 52/91 = DIFAL zero”. Também não cadastrar “produto importado = 4%” sem verificar as condições da alíquota aplicável.

Para o RJ, a Consulta 054/2025 interpreta o art. 5º do Decreto 45.607/2016 e confirma a ausência de FECP nas operações efetivamente abrangidas pelo benefício do Convênio 52/91. Essa condição deve ser avaliada no cenário beneficiado; não somar automaticamente 2% de FECP à carga favorecida nem estender a conclusão a operação não enquadrada.

Soluções de consulta são referências interpretativas, com fatos e limites próprios. Guardar a norma, a consulta e o escopo separadamente; não tratar uma consulta individual como autorização irrestrita para qualquer operação.

### Controle de vigência

Guardar separadamente data de publicação, ratificação, início dos efeitos, término, ato estadual e data da última conferência.

O Convênio 131/26, publicado em 29/10/2026, prevê prorrogação do Convênio 52/91 até 31/12/2028 em sua cláusula primeira, VII, mas sua cláusula quinta condiciona a entrada em vigor à publicação da ratificação nacional. Nesta revisão não se concluiu a validação da ratificação e da implementação estadual dessa nova prorrogação. Registrar a alteração como “publicada, eficácia/implementação a validar”, e não ativar automaticamente regras para 2027/2028.

## 3. CATÁLOGO JURÍDICO, NÃO APENAS LISTA DE NCM

Criar `benefit_catalog_entries` com:
- ato, anexo, item/subitem e versão;
- expressão NCM original e código normalizado como texto;
- tipo de correspondência: código exato, lista, posição/subposição ou intervalo expressamente previsto;
- descrição integral, descrição resumida e condições herdadas do título/grupo;
- características técnicas, exclusões, usos/destinações relevantes;
- início/fim dos efeitos e referência a alterações;
- fonte oficial, trecho/localizador, hash da fonte e revisor;
- status: rascunho, em revisão, homologado, suspenso ou encerrado.

O mesmo NCM pode ter múltiplos enquadramentos. Exemplo importante para os testes: 8414.80.19 aparece no Anexo I, item 11.3, e no Anexo II, item 7.3, que herda condições específicas do grupo de sustentação de silos infláveis. Não escolher o resultado menor ou a descrição mais curta automaticamente.

Não expandir benefício de uma posição para todo o capítulo 84/85. Não presumir que partes/acessórios acompanham o tratamento da máquina completa. Respeitar restrições técnicas, expressões de exclusão e condições do grupo.

A página consolidada do CONFAZ contém redações atuais E históricas. O importador não pode concatenar todas as tabelas e declarar todas as linhas vigentes. Guardar períodos das versões e impedir duplicidades temporais indevidas.

Mudanças da nomenclatura exigem correlação documentada e revisão. Não corrigir automaticamente o NCM do XML nem conceder o benefício só porque existe código parecido ou sucessor presumido.

## 4. LEITURA DOS DOCUMENTOS E IDENTIFICAÇÃO

Usar por item: NCM, descrição, SKU/GTIN quando disponíveis, origem da mercadoria, CFOP, CRT/regime, datas, UFs, destinatário contribuinte, destinação, valor da operação, vBC, pICMS, vICMS, pRedBC, cBenef quando informado, ICMS-ST/FCP e referências documentais.

A IA pode ajudar na busca e comparação semântica, mas não inventar fundamento, descrição legal, alíquota ou condição. A decisão fiscal final deve seguir regras determinísticas homologadas.

O valor efetivo do ICMS de origem e a alíquota nominal são dados distintos. Conservar o que consta no XML e evidenciar divergências. Ausência de `cBenef`, por si só, não prova inexistência do direito; presença de `cBenef` não prova cumprimento de todos os requisitos.

Fluxo:
1. Detectar possível correspondência do NCM.
2. Comparar descrição e características técnicas.
3. Aplicar condições herdadas, operação, UFs, regime e vigência.
4. Solicitar dados faltantes, podendo aceitar ficha técnica/documentação.
5. Produzir resultado: não identificado, candidato, pendente, confirmado para o cenário ou não aplicável.
6. Calcular somente com parâmetros suficientes; incerteza não vira zero.
7. Conferir a responsabilidade/retenção e eventual adicional, sem duplicidade.
8. Obter decisão final do usuário e preservar o histórico.

Não exigir catálogo de saídas para executar essa análise.

## 5. TELA E CENÁRIOS

Na tela do produto, apresentar:
- “Possível benefício — Convênio ICMS 52/91”;
- anexo, item e descrição legal;
- motivos da correspondência e condições pendentes;
- cenário A: cálculo de referência sem aplicação do benefício;
- cenário B: cálculo com o benefício, condicionado ao enquadramento;
- ICMS-DIFAL, FECP, retenção reconhecida e adicional ao destinatário em linhas distintas;
- diferença entre cenários e base documental.

O cenário A é contrafactual quando o benefício efetivamente se aplica; não apresentá-lo como dívida legal confirmada nem como prova de pagamento a maior. Manter o mesmo conjunto de fatos em ambos os cenários, explicitando qualquer premissa alterada.

A escolha do benefício é independente de “seguir sistema / incluir DIFAL manualmente / excluir DIFAL manualmente”. O usuário pode confirmar ou rejeitar a aplicação sugerida, com motivo. Rejeição e valores manuais não viram norma global e não apagam a análise técnica.

Manter o botão de decisão manual já especificado. Aplicação em lote exige seleção explícita e revisão de operações diferentes. Uma escolha de hoje não deve ser propagada sem autorização para todas as compras futuras do mesmo NCM.

## 6. MOTOR DE CÁLCULO

Guardar parâmetros distintos para:
- ICMS destacado na origem;
- montante usado para retirada do ICMS da operação;
- montante considerado na dedução final, conforme a regra aplicável;
- alíquotas nominais e cargas efetivas;
- percentual de base remanescente e percentual de redução;
- ICMS e FECP do destino;
- fórmula, modalidade, arredondamento, fonte e versão.

Não usar como regra universal que o ICMS a retirar e a dedução final são sempre a mesma grandeza. Não transportar sem análise uma fórmula geral para benefícios específicos, Simples Nacional, isenções ou modalidades distintas.

O benefício deve alterar o cenário fiscal antes da comparação com a retenção do remetente. Não deduzir uma ST inteira ou uma guia de outro contexto sobre um imposto já reduzido sem verificar identidade da obrigação.

Não converter resultado negativo em crédito, restituição ou compensação automática. A eventual ausência de adicional deve ter fundamento e manter a memória do resultado, sem ocultar inconsistências por um simples `max(0, valor)` indiscriminado.

As opções “por dentro” e “por fora” não são métodos livremente intercambiáveis: selecionar segundo modalidade, UF, operação, competência e regra homologada. Uma alternativa inserida pelo usuário fica identificada como manual.

## 7. PLANILHA RECEBIDA — REVISÃO FOCAL

**Arquivo:** CALCULO DIFERENCAL DE ALIQUOTA - POR DENTRO e POR FORA.xlsx.  
**Abas encontradas:** POR DENTRO e POR FORA.  
**Preservação:** o arquivo original não foi alterado.

| Constatação | Ajuste para o sistema |
|---|---|
| Na aba POR DENTRO, F9 contém `=E9/(1-0.22)`, com 22% escrito na fórmula. | A recomposição deve consumir o parâmetro fiscal do cenário, e não uma constante de demonstração. Alterar somente o cabeçalho das alíquotas não corrige essa constante. |
| O ICMS de origem é calculado como valor da operação × alíquota informada. | Ler e conservar base, redução, alíquota nominal e imposto do XML; separar valor efetivo de origem e dedução prevista na fórmula aplicável. |
| E35 contém `=SUM(Tabela1[VALOR DA OPERAÇÃO SEM ICMS])-B35`. | Para totalizar a coluna, a subtração de B35 é indevida. A célula apresenta -1.154,16; a soma dos valores da coluna é 8.463,87, nos dados enviados. Validar também a coerência entre totais filtrados e totais gerais. |
| Algumas fórmulas são compartilhadas no XML interno do Excel. | Expandir corretamente fórmulas compartilhadas; não confundir célula sem texto de fórmula próprio com valor digitado ou fórmula ausente. |
| As observações K9/K10 relacionam regime/modalidade e ausência de destaque a recolhimento. | Não transformá-las em regra fiscal. Separar contribuinte/não contribuinte, regime e evidência; ausência de destaque não comprova ausência de pagamento. |

A inconsistência de E35 é um achado de totalização dessa coluna. Ela não demonstra, isoladamente, que o total final de DIFAL em J35 esteja incorreto, pois o total final tem referências próprias. Não foi feita homologação tributária integral da planilha nem alteração das fórmulas do arquivo.

### Casos aritméticos de referência

Estes são testes didáticos de contas, com premissas explícitas. A validade fiscal de cada hipótese precisa ser homologada antes da produção.

**Caso A — reprodução de premissas do modelo:** valor 1.000,00; ICMS de origem 120,00; carga de recomposição 22%, composta de 20% de ICMS e 2% de FECP. Base recomposta: 880 / 0,78 = 1.128,205128...; ICMS diferencial: 105,641025...; FECP: 22,564102...; total: 128,205128..., ou 128,21 com arredondamento final. A definição de arredondamento por componente deve ser explícita.

**Caso B — industrial com cargas equivalentes:** hipótese elegível em que carga de origem e interna correspondem a 8,80%, com tratamento específico devidamente confirmado. Deve existir caso de teste para ausência de adicional, sem chamar o resultado de isenção genérica.

**Caso C — hipótese interestadual a 4%, industrial elegível:** valor 1.000,00; ICMS de origem 40,00; carga de destino 8,80%; sem FECP no cenário efetivamente amparado. Sob a fórmula de recomposição considerada, base = 960 / 0,912 = 1.052,631578...; DIFAL = base × 8,80% − 40 = 52,631578..., ou 52,63. Esse caso demonstra por que a regra não pode ser “benefício = zero”.

## 8. ENTIDADES, AUDITORIA E EXPORTAÇÃO

Além das tabelas já previstas, implementar:
- `benefit_catalog_entries` e `benefit_catalog_versions`;
- `benefit_state_rules` e `benefit_validity_events`;
- `item_benefit_matches`, `item_benefit_evidence` e `item_benefit_decisions`;
- vínculos do cenário às versões fiscais, às retenções e à decisão manual.

Usar isolamento por organização para documentos/decisões e catálogo normativo administrado com revisão. Regras globais só podem ser publicadas por perfil autorizado; escolhas do cliente não alteram esse catálogo.

Toda decisão deve guardar autor, data, fatos, regra/fonte, versão, justificativa e valores antes/depois. Reprocessamento preserva decisões e exige revalidação quando houver mudança material.

No ZIP de exportação, incluir demonstrativo do benefício e sua condição, sem modificar a NF-e original. Separar “possível diferença entre cenários”, “decisão manual” e “pagamento indevido comprovado”. Não anunciar crédito tributário ou economia realizada a partir de hipótese pendente.

## 9. TESTES DE ACEITE DO MÓDULO

1. NCM do anexo com descrição incompatível não recebe benefício automático.
2. Equipamento compatível, mas sem dados de operação/vigência, fica pendente.
3. Máquinas domésticas não recebem tratamento industrial apenas pela atividade do comprador.
4. O mesmo NCM 8414.80.19 retorna os candidatos distintos, com as condições próprias.
5. A entrada agrícola do item 7.3 não perde a condição de conjunto/simultaneidade do grupo.
6. Redação histórica e atual não são simultaneamente ativadas para a mesma competência.
7. Código antigo, substituído ou incompleto não é equiparado automaticamente.
8. Operação sujeita a 4% não é zerada só porque o NCM está no convênio.
9. FECP não é acrescido automaticamente ao cenário RJ efetivamente amparado; cenário não enquadrado tem análise própria.
10. ICMS efetivo destacado e alíquota nominal diferente são preservados separadamente.
11. Caso com benefício e ST não sofre abatimento duplicado.
12. Decisão manual de não aplicar/aplicar mantém a sugestão original e as pendências.
13. Reimportação/recálculo não apagam a decisão, e mudança material pede revalidação.
14. Os exemplos aritméticos são reproduzidos com Decimal e arredondamento documentado.
15. Alteração da carga de destino não deixa o divisor fixo em 0,78.
16. Ausência de fonte/regra ou término da vigência não produz imposto zero.
17. Exportação mantém hashes dos XMLs e identifica hipótese, aprovação e decisão manual.
18. A base JSON de demonstração não é apresentada como cadastro completo ou homologado.

## 10. FONTES PRIMÁRIAS

**[1] CONFAZ — Convênio ICMS 52/1991.** Cláusulas primeira, segunda e quinta; Anexos I e II e respectivos históricos.  
https://www.confaz.fazenda.gov.br/legislacao/convenios/1991/CV052_91

**[2] SEFAZ/RJ — Consulta 095/2019.** Descrição, natureza e finalidade dos produtos; alcance do benefício ao longo da circulação, conforme enquadramento.  
https://portal.fazenda.rj.gov.br/consulta-tributaria/wp-content/uploads/sites/45/2023/10/c095-SEI-04-079-000823-19.pdf

**[3] SEFAZ/RJ — Consulta 069/2024.** Diferenças de modalidade, recomposição, benefícios e ressalva das operações interestaduais a 4%; resposta 8.  
https://portal.fazenda.rj.gov.br/consulta-tributaria/wp-content/uploads/sites/45/2024/10/069_2024.pdf

**[4] SEFAZ/RJ — Consulta 054/2025.** FECP nas operações abrangidas pelo Convênio 52/91 e art. 5º do Decreto 45.607/2016.  
https://legislacao.fazenda.rj.gov.br/wp-content/uploads/054.pdf

**[5] CONFAZ — Convênio ICMS 131/2026.** Cláusula primeira, VII, e cláusula quinta; separar publicação, ratificação, efeitos e implementação estadual.  
https://www.confaz.fazenda.gov.br/legislacao/convenios/2026/CV131_26

As fontes foram consultadas para esta revisão focal. A íntegra dos anexos, todas as correlações de NCM, as implementações estaduais e todas as situações de cálculo não foram homologadas nesta entrega.
