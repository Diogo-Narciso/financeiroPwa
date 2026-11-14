import {
  ICMS_TAXPAYER_OPTIONS,
  TAX_REGIMES,
  type IcmsTaxpayer,
  type TaxRegime,
} from "@portal-difal/shared";
import { getPool } from "@/server/db";
import { jsonError, jsonOk } from "@/server/http";
import { audit, requireUser } from "@/server/session";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    const { id: companyId } = await params;
    const body = (await request.json()) as {
      regime?: string;
      icmsTaxpayer?: string;
      mainCnae?: string;
      secondaryCnaes?: string[];
      effectiveFrom?: string;
    };
    if (
      !body.regime ||
      !(TAX_REGIMES as readonly string[]).includes(body.regime)
    ) {
      return jsonOk({ error: "Regime tributário inválido." }, 400);
    }
    if (
      !body.icmsTaxpayer ||
      !(ICMS_TAXPAYER_OPTIONS as readonly string[]).includes(body.icmsTaxpayer)
    ) {
      return jsonOk({ error: "Condição de contribuinte ICMS inválida." }, 400);
    }

    const pool = getPool();
    const owned = await pool.query(
      `SELECT id FROM companies WHERE id = $1 AND tenant_id = $2`,
      [companyId, user.tenantId],
    );
    if ((owned.rowCount ?? 0) === 0) {
      return jsonOk({ error: "Empresa não encontrada." }, 404);
    }

    // Close previous open profile for history (version by competence).
    await pool.query(
      `UPDATE company_tax_profiles
       SET effective_to = (COALESCE($3::date, CURRENT_DATE) - 1)
       WHERE company_id = $1 AND tenant_id = $2 AND effective_to IS NULL`,
      [companyId, user.tenantId, body.effectiveFrom ?? null],
    );

    const { rows } = await pool.query(
      `INSERT INTO company_tax_profiles
         (tenant_id, company_id, regime, icms_taxpayer, main_cnae, secondary_cnaes,
          effective_from, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7::date, CURRENT_DATE), $8)
       RETURNING id, regime, icms_taxpayer, effective_from`,
      [
        user.tenantId,
        companyId,
        body.regime as TaxRegime,
        body.icmsTaxpayer as IcmsTaxpayer,
        body.mainCnae?.trim() || null,
        body.secondaryCnaes ?? [],
        body.effectiveFrom ?? null,
        user.id,
      ],
    );

    await audit(pool, {
      tenantId: user.tenantId,
      actorUserId: user.id,
      action: "company.tax_profile_saved",
      entityType: "company",
      entityId: companyId,
      detail: { regime: body.regime, icmsTaxpayer: body.icmsTaxpayer },
    });

    return jsonOk({ profile: rows[0] }, 201);
  } catch (error) {
    return jsonError(error);
  }
}
