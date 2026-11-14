/**
 * Proposed roles for GET /api/billing/plans (H86 / H84 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const BILLING_PLANS_ROLE_PROPOSAL = ["owner", "admin"] as const;

export type BillingPlansRoleProposal =
  (typeof BILLING_PLANS_ROLE_PROPOSAL)[number];

export function matchesBillingPlansRoleProposal(role: string): boolean {
  return (BILLING_PLANS_ROLE_PROPOSAL as readonly string[]).includes(role);
}
