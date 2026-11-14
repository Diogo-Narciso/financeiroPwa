/**
 * Proposed roles for GET companies/[id] (H66 / H60 draft).
 * Not wired into the route — ACL unchanged until H65 gate opens.
 */
export const COMPANY_GET_ROLE_PROPOSAL = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
] as const;

export type CompanyGetRoleProposal = (typeof COMPANY_GET_ROLE_PROPOSAL)[number];

export function matchesCompanyGetRoleProposal(role: string): boolean {
  return (COMPANY_GET_ROLE_PROPOSAL as readonly string[]).includes(role);
}
