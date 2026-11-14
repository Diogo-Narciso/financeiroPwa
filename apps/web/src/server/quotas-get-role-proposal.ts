/**
 * Proposed roles for GET /api/quotas (H80 / H74 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const QUOTAS_GET_ROLE_PROPOSAL = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
] as const;

export type QuotasGetRoleProposal = (typeof QUOTAS_GET_ROLE_PROPOSAL)[number];

export function matchesQuotasGetRoleProposal(role: string): boolean {
  return (QUOTAS_GET_ROLE_PROPOSAL as readonly string[]).includes(role);
}
