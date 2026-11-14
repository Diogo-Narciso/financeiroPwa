/** Deterministic classification / retention flags — E3. No tax amounts invented. */

export const PURPOSES = [
  "revenda",
  "industrializacao_insumo",
  "embalagem",
  "uso_consumo",
  "ativo_imobilizado",
  "outras_operacoes",
  "indeterminado",
] as const;

export type Purpose = (typeof PURPOSES)[number];
export type Confidence = "alto" | "medio" | "baixo";

export type ClassificationInput = {
  description: string | null;
  ncm: string | null;
  cfopIssuer: string | null;
  companySectors?: string[];
  companyAnswers?: Record<string, string>;
};

export type ClassificationSuggestion = {
  purpose: Purpose;
  confidence: Confidence;
  reasons: string[];
  engineVersion: "classifier-e3-v1";
};

export type RetentionInput = {
  rawFields?: Record<string, unknown> | null;
  description?: string | null;
  cest?: string | null;
  /** Optional ST-related strings already extracted from XML */
  stHints?: {
    hasIcmsSt?: boolean;
    hasStRet?: boolean;
    hasCest?: boolean;
    mentionsStInText?: boolean;
  };
};

export type RetentionAssessment = {
  status: "sem_indicio" | "retencao_identificada_a_conferir" | "pendente";
  flags: Record<string, boolean | string>;
  warningText: string | null;
  engineVersion: "retention-e3-v1";
};

const RETENTION_WARNING =
  "Retenção identificada — conferir antes de recolher novamente. O XML contém informações de ICMS-ST ou tributo relacionado. Confirme se a retenção e a responsabilidade abrangem esta operação. O destaque, isoladamente, não comprova o recolhimento efetivo. Nenhum valor de DIFAL foi inventado pelo sistema.";

function normalizeCfop(cfop: string | null): string {
  return (cfop ?? "").replace(/\D/g, "");
}

/**
 * Suggest economic purpose from evidence only.
 * Confidence is classification confidence — NOT legal probability of tax due.
 */
export function suggestPurpose(input: ClassificationInput): ClassificationSuggestion {
  const reasons: string[] = [];
  const cfop = normalizeCfop(input.cfopIssuer);
  const ncm = (input.ncm ?? "").replace(/\D/g, "");
  const desc = (input.description ?? "").toLowerCase();
  const answers = input.companyAnswers ?? {};
  const sectors = input.companySectors ?? [];

  // CFOP heuristics (issuer perspective) — illustrative mapping, not universal law.
  if (["2551", "1551"].includes(cfop)) {
    reasons.push(`CFOP emitente ${cfop} frequentemente associado a ativo imobilizado (evidência, não regra universal).`);
    return { purpose: "ativo_imobilizado", confidence: "medio", reasons, engineVersion: "classifier-e3-v1" };
  }
  if (["2556", "1556"].includes(cfop)) {
    reasons.push(`CFOP emitente ${cfop} frequentemente associado a uso/consumo (evidência, não regra universal).`);
    return { purpose: "uso_consumo", confidence: "medio", reasons, engineVersion: "classifier-e3-v1" };
  }
  if (["2102", "1102", "6102", "5102"].includes(cfop)) {
    reasons.push(`CFOP emitente ${cfop} frequentemente associado a compra para comercialização.`);
    if (answers.revende === "sim" || sectors.includes("comercio_varejista") || sectors.includes("atacado")) {
      reasons.push("Perfil da empresa indica revenda.");
      return { purpose: "revenda", confidence: "alto", reasons, engineVersion: "classifier-e3-v1" };
    }
    return { purpose: "revenda", confidence: "medio", reasons, engineVersion: "classifier-e3-v1" };
  }

  if (/embalag/i.test(desc)) {
    reasons.push("Descrição menciona embalagem.");
    return { purpose: "embalagem", confidence: "baixo", reasons, engineVersion: "classifier-e3-v1" };
  }
  if (/vassoura|limpeza|escrit[oó]rio|copa/i.test(desc)) {
    reasons.push("Descrição sugere material de uso/consumo (heurística textual frágil).");
    return { purpose: "uso_consumo", confidence: "baixo", reasons, engineVersion: "classifier-e3-v1" };
  }

  if (ncm.startsWith("84") || ncm.startsWith("85")) {
    reasons.push(`NCM capítulo ${ncm.slice(0, 2)} (máquinas/equipamentos) é apenas evidência de categoria — não determina finalidade.`);
    return { purpose: "indeterminado", confidence: "baixo", reasons, engineVersion: "classifier-e3-v1" };
  }

  reasons.push("Evidências insuficientes para finalidade automática — pendente de revisão humana.");
  return { purpose: "indeterminado", confidence: "baixo", reasons, engineVersion: "classifier-e3-v1" };
}

/** ST/retention flags from XML evidence — never computes DIFAL. */
export function assessRetention(input: RetentionInput): RetentionAssessment {
  const hints = input.stHints ?? {};
  const raw = input.rawFields ?? {};
  const stFromRaw = Boolean(
    raw.hasIcmsSt || raw.hasStRet || raw.vICMSST || raw.vBCST || raw.vICMSSTRet || raw.vBCSTRet,
  );
  const hasCest = Boolean(input.cest) || Boolean(hints.hasCest);
  const hasSt =
    Boolean(hints.hasIcmsSt) ||
    Boolean(hints.hasStRet) ||
    stFromRaw ||
    Boolean(hints.mentionsStInText);

  if (!hasSt && !hasCest) {
    return {
      status: "sem_indicio",
      flags: { hasSt: false, hasCest: false },
      warningText: null,
      engineVersion: "retention-e3-v1",
    };
  }

  const flags: Record<string, boolean | string> = {
    hasSt,
    hasCest,
    cestAloneNotConclusive: hasCest && !hasSt,
    xmlHighlightNotPaymentProof: true,
    difalAmountInvented: false,
  };

  if (hasCest && !hasSt) {
    flags.note = "CEST preenchido sem outros elementos de ST — não conclui recolhimento nem dispensa DIFAL.";
  }

  return {
    status: "retencao_identificada_a_conferir",
    flags,
    warningText: RETENTION_WARNING,
    engineVersion: "retention-e3-v1",
  };
}
