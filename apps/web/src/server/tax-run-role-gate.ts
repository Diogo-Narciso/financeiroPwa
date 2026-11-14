/** Roles allowed for tax-run create/read (H48 / H53 / E-R02). */
export const TAX_RUN_ROLES = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
] as const;

export type TaxRunRole = (typeof TAX_RUN_ROLES)[number];

export function canAccessTaxRun(role: string): boolean {
  return (TAX_RUN_ROLES as readonly string[]).includes(role);
}
