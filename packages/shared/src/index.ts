/** Shared types and constants — E0 foundation only (no tax rules). */

export const APP_NAME = "Portal Inteligente de DIFAL" as const;

export const APP_TAGLINE =
  "Apoio à revisão de DIFAL em aquisições interestaduais — decisão final do contador." as const;

export const brand = {
  teal: "#0F766E",
  tealDark: "#115E59",
  tealMuted: "#CCFBF1",
  gray900: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  gray50: "#F9FAFB",
  white: "#FFFFFF",
  success: "#047857",
} as const;

export type HealthStatus = "ok" | "degraded" | "error";

export type HealthResponse = {
  status: HealthStatus;
  service: string;
  version: string;
  timestamp: string;
  checks: {
    database: "up" | "down" | "skipped";
  };
};

export const ORG_ROLES = [
  "owner",
  "admin",
  "analyst",
  "reviewer",
  "billing",
  "read_only",
] as const;

export type OrgRole = (typeof ORG_ROLES)[number];

/** Trial quotas from product spec — enforced in E1, declared here for contracts. */
export const TRIAL_LIMITS = {
  maxCompaniesPerOrg: 3,
  maxEntryInvoicesPerCompany: 5,
} as const;
