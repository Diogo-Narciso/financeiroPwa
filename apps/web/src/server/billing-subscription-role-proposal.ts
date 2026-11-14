/**
 * Proposed roles for billing/subscription GET|POST (H89 / H88 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const BILLING_SUBSCRIPTION_ROLE_PROPOSAL = ["owner", "admin"] as const;

export type BillingSubscriptionRoleProposal =
  (typeof BILLING_SUBSCRIPTION_ROLE_PROPOSAL)[number];

export function matchesBillingSubscriptionRoleProposal(role: string): boolean {
  return (BILLING_SUBSCRIPTION_ROLE_PROPOSAL as readonly string[]).includes(
    role,
  );
}
