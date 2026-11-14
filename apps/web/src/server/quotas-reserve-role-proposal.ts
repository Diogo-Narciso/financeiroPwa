/**
 * Proposed roles for POST quotas/entry-invoices/reserve (H77 / H71 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const QUOTAS_RESERVE_ROLE_PROPOSAL = [
  "owner",
  "admin",
  "analyst",
] as const;

export type QuotasReserveRoleProposal =
  (typeof QUOTAS_RESERVE_ROLE_PROPOSAL)[number];

export function matchesQuotasReserveRoleProposal(role: string): boolean {
  return (QUOTAS_RESERVE_ROLE_PROPOSAL as readonly string[]).includes(role);
}
