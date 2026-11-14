import { TRIAL_LIMITS } from "@portal-difal/shared";
import type pg from "pg";
import { getPool } from "./db";
import { audit } from "./session";

export class QuotaError extends Error {
  status = 409;
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "QuotaError";
    this.code = code;
  }
}

export async function getQuotaSnapshot(tenantId: string, companyId?: string) {
  const pool = getPool();
  const slots = await pool.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM trial_company_slots WHERE tenant_id = $1`,
    [tenantId],
  );
  const usedCompanies = Number(slots.rows[0]?.count ?? 0);

  let usedEntries = 0;
  if (companyId) {
    const entries = await pool.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM entry_invoice_usage
       WHERE tenant_id = $1 AND company_id = $2 AND status IN ('reserved', 'committed')`,
      [tenantId, companyId],
    );
    usedEntries = Number(entries.rows[0]?.count ?? 0);
  }

  return {
    companies: {
      used: usedCompanies,
      limit: TRIAL_LIMITS.maxCompaniesPerOrg,
      remaining: Math.max(0, TRIAL_LIMITS.maxCompaniesPerOrg - usedCompanies),
    },
    entryInvoices: companyId
      ? {
          companyId,
          used: usedEntries,
          limit: TRIAL_LIMITS.maxEntryInvoicesPerCompany,
          remaining: Math.max(
            0,
            TRIAL_LIMITS.maxEntryInvoicesPerCompany - usedEntries,
          ),
        }
      : null,
  };
}

/** Create company + bind trial slot atomically. Archiving never frees slots. */
export async function createCompanyWithQuota(args: {
  tenantId: string;
  actorUserId: string;
  cnpj: string;
  legalName: string;
  tradeName?: string | null;
  uf?: string | null;
  municipality?: string | null;
  stateRegistration?: string | null;
}) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SELECT pg_advisory_xact_lock(hashtext($1))`, [
      `trial-cnpj:${args.tenantId}`,
    ]);

    const { rows: countRows } = await client.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM trial_company_slots WHERE tenant_id = $1`,
      [args.tenantId],
    );
    const used = Number(countRows[0]?.count ?? 0);
    if (used >= TRIAL_LIMITS.maxCompaniesPerOrg) {
      await audit(client, {
        tenantId: args.tenantId,
        actorUserId: args.actorUserId,
        action: "trial.company_quota_blocked",
        detail: { used, limit: TRIAL_LIMITS.maxCompaniesPerOrg, cnpj: args.cnpj },
      });
      throw new QuotaError(
        "TRIAL_COMPANY_LIMIT",
        `Limite do teste gratuito: no máximo ${TRIAL_LIMITS.maxCompaniesPerOrg} CNPJs por organização. Arquivar não libera vaga.`,
      );
    }

    const existing = await client.query(
      `SELECT id FROM trial_company_slots WHERE tenant_id = $1 AND cnpj = $2`,
      [args.tenantId, args.cnpj],
    );
    if ((existing.rowCount ?? 0) > 0) {
      throw new QuotaError(
        "CNPJ_ALREADY_BOUND",
        "Este CNPJ já está vinculado à cota de teste desta organização.",
      );
    }

    const { rows: companyRows } = await client.query<{ id: string }>(
      `INSERT INTO companies (tenant_id, cnpj, legal_name, trade_name, uf, municipality, state_registration)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        args.tenantId,
        args.cnpj,
        args.legalName,
        args.tradeName ?? null,
        args.uf ?? null,
        args.municipality ?? null,
        args.stateRegistration ?? null,
      ],
    );
    const companyId = companyRows[0]!.id;

    await client.query(
      `INSERT INTO trial_company_slots (tenant_id, company_id, cnpj) VALUES ($1, $2, $3)`,
      [args.tenantId, companyId, args.cnpj],
    );

    await audit(client, {
      tenantId: args.tenantId,
      actorUserId: args.actorUserId,
      action: "company.created",
      entityType: "company",
      entityId: companyId,
      detail: { cnpj: args.cnpj },
    });

    await client.query("COMMIT");
    return { id: companyId };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Reserve one entry NF-e quota slot (atomic). Same access_key returns existing.
 * Used by E2 imports; exposed in E1 for server-side quota proof / tests.
 */
export async function reserveEntryInvoiceQuota(args: {
  tenantId: string;
  companyId: string;
  accessKey: string;
  actorUserId: string;
}): Promise<{ id: string; status: string; created: boolean }> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SELECT pg_advisory_xact_lock(hashtext($1))`, [
      `trial-nfe:${args.tenantId}:${args.companyId}`,
    ]);

    const company = await client.query(
      `SELECT id FROM companies WHERE id = $1 AND tenant_id = $2`,
      [args.companyId, args.tenantId],
    );
    if ((company.rowCount ?? 0) === 0) {
      throw new QuotaError("COMPANY_NOT_FOUND", "Empresa não encontrada neste tenant.");
    }

    const existing = await client.query<{ id: string; status: string }>(
      `SELECT id, status FROM entry_invoice_usage
       WHERE tenant_id = $1 AND company_id = $2 AND access_key = $3
         AND status IN ('reserved', 'committed')`,
      [args.tenantId, args.companyId, args.accessKey],
    );
    if (existing.rows[0]) {
      await client.query("COMMIT");
      return {
        id: existing.rows[0].id,
        status: existing.rows[0].status,
        created: false,
      };
    }

    const { rows: countRows } = await client.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count FROM entry_invoice_usage
       WHERE tenant_id = $1 AND company_id = $2 AND status IN ('reserved', 'committed')`,
      [args.tenantId, args.companyId],
    );
    const used = Number(countRows[0]?.count ?? 0);
    if (used >= TRIAL_LIMITS.maxEntryInvoicesPerCompany) {
      await audit(client, {
        tenantId: args.tenantId,
        actorUserId: args.actorUserId,
        action: "trial.entry_invoice_quota_blocked",
        entityType: "company",
        entityId: args.companyId,
        detail: {
          used,
          limit: TRIAL_LIMITS.maxEntryInvoicesPerCompany,
          accessKey: args.accessKey,
        },
      });
      throw new QuotaError(
        "TRIAL_ENTRY_INVOICE_LIMIT",
        `Limite do teste gratuito: no máximo ${TRIAL_LIMITS.maxEntryInvoicesPerCompany} NF-e de entrada por CNPJ.`,
      );
    }

    const { rows } = await client.query<{ id: string; status: string }>(
      `INSERT INTO entry_invoice_usage (tenant_id, company_id, access_key, status)
       VALUES ($1, $2, $3, 'reserved')
       RETURNING id, status`,
      [args.tenantId, args.companyId, args.accessKey],
    );

    await audit(client, {
      tenantId: args.tenantId,
      actorUserId: args.actorUserId,
      action: "trial.entry_invoice_reserved",
      entityType: "entry_invoice_usage",
      entityId: rows[0]!.id,
      detail: { accessKey: args.accessKey, companyId: args.companyId },
    });

    await client.query("COMMIT");
    return { id: rows[0]!.id, status: rows[0]!.status, created: true };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
