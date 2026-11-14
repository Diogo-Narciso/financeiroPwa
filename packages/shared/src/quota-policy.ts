import { TRIAL_LIMITS } from "./limits";

/** Status that consume trial entry NF-e quota (released does not). */
export function countsTowardEntryQuota(status: string): boolean {
  return status === "reserved" || status === "committed";
}

export type QuotaDecision =
  | { allowed: true }
  | { allowed: false; code: "TRIAL_COMPANY_LIMIT" | "TRIAL_ENTRY_INVOICE_LIMIT" };

/** Pure check: 3 CNPJs per org (slots already bound). */
export function evaluateCompanyQuota(usedSlots: number): QuotaDecision {
  if (usedSlots >= TRIAL_LIMITS.maxCompaniesPerOrg) {
    return { allowed: false, code: "TRIAL_COMPANY_LIMIT" };
  }
  return { allowed: true };
}

/** Pure check: 5 entry NF-e per company among reserved+committed. */
export function evaluateEntryInvoiceQuota(activeUsageCount: number): QuotaDecision {
  if (activeUsageCount >= TRIAL_LIMITS.maxEntryInvoicesPerCompany) {
    return { allowed: false, code: "TRIAL_ENTRY_INVOICE_LIMIT" };
  }
  return { allowed: true };
}

/** Count how many usage rows consume quota (for tests / callers). */
export function countActiveEntryUsage(
  statuses: readonly string[],
): number {
  return statuses.filter(countsTowardEntryQuota).length;
}
