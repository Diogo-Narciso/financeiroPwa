/**
 * Proposed roles for GET /api/invoices (H83 / H78 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const INVOICES_LIST_ROLE_PROPOSAL = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
] as const;

export type InvoicesListRoleProposal =
  (typeof INVOICES_LIST_ROLE_PROPOSAL)[number];

export function matchesInvoicesListRoleProposal(role: string): boolean {
  return (INVOICES_LIST_ROLE_PROPOSAL as readonly string[]).includes(role);
}
