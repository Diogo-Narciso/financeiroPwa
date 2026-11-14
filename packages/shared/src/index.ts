/** Shared types and constants — E0/E1 (no tax rates). */

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
  checks: { database: "up" | "down" | "skipped" };
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

export const ORG_KINDS = [
  "accounting_firm",
  "company",
  "individual",
] as const;

export type OrgKind = (typeof ORG_KINDS)[number];

export { TRIAL_LIMITS } from "./limits";
export {
  countActiveEntryUsage,
  countsTowardEntryQuota,
  evaluateCompanyQuota,
  evaluateEntryInvoiceQuota,
} from "./quota-policy";
export type { QuotaDecision } from "./quota-policy";
export { RETENTION_POLICY } from "./retention-policy";
export type { RetentionPolicy } from "./retention-policy";

export const TAX_REGIMES = [
  "simples_nacional",
  "regime_normal",
  "outro",
  "nao_sei",
] as const;

export type TaxRegime = (typeof TAX_REGIMES)[number];

export const ICMS_TAXPAYER_OPTIONS = [
  "contribuinte",
  "nao_contribuinte",
  "nao_sei",
] as const;

export type IcmsTaxpayer = (typeof ICMS_TAXPAYER_OPTIONS)[number];

export const ACTIVITY_SECTORS = [
  "comercio_varejista",
  "atacado",
  "industria",
  "alimentos",
  "servicos",
  "transportes",
  "saude",
  "construcao",
  "agronegocio",
  "comercio_eletronico",
  "outro",
] as const;

export type ActivitySector = (typeof ACTIVITY_SECTORS)[number];

export const ACTIVITY_QUESTIONS = [
  { id: "revende", label: "Revende mercadorias?" },
  { id: "fabrica", label: "Fabrica produtos?" },
  { id: "materia_prima", label: "Utiliza matéria-prima / insumos?" },
  { id: "embalagem", label: "Utiliza embalagens?" },
  { id: "ativo", label: "Adquire bens de ativo imobilizado?" },
  { id: "equipamentos", label: "Comercializa equipamentos / máquinas?" },
  { id: "servicos", label: "Presta serviços?" },
  { id: "st", label: "Opera com mercadorias sujeitas a ST?" },
  { id: "vende_e_usa", label: "Vende e também usa internamente o mesmo produto?" },
] as const;

export type ActivityAnswer = "sim" | "nao" | "nao_sei";

export const BRAZIL_UFS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;
