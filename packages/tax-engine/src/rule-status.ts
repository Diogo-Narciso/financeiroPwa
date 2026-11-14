/**
 * Publication gate for tax outputs — never confuse demo arithmetic with
 * homologated fiscal law (H9 / H2-A4).
 */
export const RULE_PUBLICATION_STATUS = {
  /** Illustrative numbers only (CASOS_ARITMETICOS). */
  demo: "demo",
  /** Structure exists; production calc blocked until homologation. */
  pending_homologation: "pending_homologation",
  /** Approved legal rule path (not published in MVP). */
  homologated: "homologated",
  /** Module intentionally off. */
  disabled: "disabled",
  /** Unknown / out of scope module. */
  out_of_scope: "out_of_scope",
} as const;

export type RulePublicationStatus =
  (typeof RULE_PUBLICATION_STATUS)[keyof typeof RULE_PUBLICATION_STATUS];

/** True only for the production-legal path (never demo). */
export function isHomologatedStatus(status: RulePublicationStatus): boolean {
  return status === RULE_PUBLICATION_STATUS.homologated;
}

/** Demo arithmetic must never be treated as official. */
export function isDemoOnlyStatus(status: RulePublicationStatus): boolean {
  return status === RULE_PUBLICATION_STATUS.demo;
}
