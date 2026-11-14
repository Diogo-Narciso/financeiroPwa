/**
 * Field template for RJ tax matrix capture (H25 / P01).
 * No rates — all numeric rule fields default to null until fiscal approval.
 */

export const RJ_MATRIX_FIELD_KEYS = [
  "modality",
  "regime",
  "competenceDate",
  "baseRuleRef",
  "fecpApplies",
  "fecpFraction",
  "destinationIcmsFraction",
  "exceptions",
  "approverName",
  "approvedAt",
] as const;

export type RjMatrixFieldKey = (typeof RJ_MATRIX_FIELD_KEYS)[number];

export type RjMatrixTemplateDraft = {
  modality: string | null;
  regime: string | null;
  competenceDate: string | null;
  baseRuleRef: string | null;
  fecpApplies: boolean | null;
  /** Decimal fraction string — must stay null until homologation. */
  fecpFraction: string | null;
  destinationIcmsFraction: string | null;
  exceptions: string[];
  approverName: string | null;
  approvedAt: string | null;
  publicationStatus: "pending_homologation";
};

/** Empty draft — never invents aliquots. */
export function emptyRjMatrixDraft(): RjMatrixTemplateDraft {
  return {
    modality: null,
    regime: null,
    competenceDate: null,
    baseRuleRef: null,
    fecpApplies: null,
    fecpFraction: null,
    destinationIcmsFraction: null,
    exceptions: [],
    approverName: null,
    approvedAt: null,
    publicationStatus: "pending_homologation",
  };
}

export function requiredRjFieldsMissing(draft: RjMatrixTemplateDraft): RjMatrixFieldKey[] {
  const missing: RjMatrixFieldKey[] = [];
  if (!draft.modality) missing.push("modality");
  if (!draft.regime) missing.push("regime");
  if (!draft.competenceDate) missing.push("competenceDate");
  if (!draft.baseRuleRef) missing.push("baseRuleRef");
  if (draft.fecpApplies === null) missing.push("fecpApplies");
  if (!draft.approverName) missing.push("approverName");
  return missing;
}
