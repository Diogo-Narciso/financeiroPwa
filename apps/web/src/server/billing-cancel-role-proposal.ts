/**
 * Proposed roles for POST /api/billing/cancel (H92 / H90 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const BILLING_CANCEL_ROLE_PROPOSAL = ["owner", "admin"] as const;

export type BillingCancelRoleProposal =
  (typeof BILLING_CANCEL_ROLE_PROPOSAL)[number];

export function matchesBillingCancelRoleProposal(role: string): boolean {
  return (BILLING_CANCEL_ROLE_PROPOSAL as readonly string[]).includes(role);
}
