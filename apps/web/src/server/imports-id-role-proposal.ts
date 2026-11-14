/**
 * Proposed roles for GET imports/[id] (H72 / H68 draft).
 * Not wired into the route — ACL unchanged until E-R01 gate opens.
 */
export const IMPORTS_ID_ROLE_PROPOSAL = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
] as const;

export type ImportsIdRoleProposal = (typeof IMPORTS_ID_ROLE_PROPOSAL)[number];

export function matchesImportsIdRoleProposal(role: string): boolean {
  return (IMPORTS_ID_ROLE_PROPOSAL as readonly string[]).includes(role);
}
