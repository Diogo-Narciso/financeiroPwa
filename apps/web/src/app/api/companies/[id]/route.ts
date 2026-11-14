import { getPool } from "@/server/db";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const { rows } = await getPool().query(
      `SELECT c.*,
              (
                SELECT row_to_json(t) FROM (
                  SELECT regime, icms_taxpayer, main_cnae, secondary_cnaes,
                         effective_from, effective_to, source, created_at
                  FROM company_tax_profiles
                  WHERE company_id = c.id AND tenant_id = c.tenant_id
                    AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
                  ORDER BY effective_from DESC, created_at DESC
                  LIMIT 1
                ) t
              ) AS tax_profile,
              (
                SELECT row_to_json(a) FROM (
                  SELECT sectors, answers, effective_from, effective_to, created_at
                  FROM company_activity_profiles
                  WHERE company_id = c.id AND tenant_id = c.tenant_id
                    AND (effective_to IS NULL OR effective_to >= CURRENT_DATE)
                  ORDER BY effective_from DESC, created_at DESC
                  LIMIT 1
                ) a
              ) AS activity_profile
       FROM companies c
       WHERE c.id = $1 AND c.tenant_id = $2`,
      [id, user.tenantId],
    );
    if (!rows[0]) return jsonOk({ error: "Empresa não encontrada." }, 404);
    return jsonOk({ company: rows[0] });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const body = (await request.json()) as {
      legalName?: string;
      tradeName?: string;
      uf?: string;
      municipality?: string;
      stateRegistration?: string;
      archive?: boolean;
    };
    // CNPJ itself cannot be swapped via self-service to reset trial.
    const { rows } = await getPool().query(
      `UPDATE companies SET
         legal_name = COALESCE($3, legal_name),
         trade_name = COALESCE($4, trade_name),
         uf = COALESCE($5, uf),
         municipality = COALESCE($6, municipality),
         state_registration = COALESCE($7, state_registration),
         archived_at = CASE
           WHEN $8::boolean IS TRUE THEN COALESCE(archived_at, NOW())
           ELSE archived_at
         END,
         updated_at = NOW()
       WHERE id = $1 AND tenant_id = $2
       RETURNING id, cnpj, legal_name, archived_at`,
      [
        id,
        user.tenantId,
        body.legalName?.trim() ?? null,
        body.tradeName === undefined ? null : body.tradeName.trim() || null,
        body.uf ?? null,
        body.municipality === undefined
          ? null
          : body.municipality.trim() || null,
        body.stateRegistration === undefined
          ? null
          : body.stateRegistration.trim() || null,
        body.archive === true,
      ],
    );
    if (!rows[0]) return jsonOk({ error: "Empresa não encontrada." }, 404);
    return jsonOk({ company: rows[0] });
  } catch (error) {
    return jsonError(error);
  }
}
