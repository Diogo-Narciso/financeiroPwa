import { BRAZIL_UFS } from "@portal-difal/shared";
import { validateCnpj } from "@/server/cnpj";
import { getPool } from "@/server/db";
import { jsonError, jsonOk } from "@/server/http";
import { createCompanyWithQuota } from "@/server/quotas";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const { rows } = await getPool().query(
      `SELECT c.id, c.cnpj, c.legal_name, c.trade_name, c.uf, c.municipality,
              c.state_registration, c.archived_at, c.created_at,
              EXISTS (
                SELECT 1 FROM trial_company_slots s WHERE s.company_id = c.id
              ) AS trial_bound
       FROM companies c
       WHERE c.tenant_id = $1
       ORDER BY c.created_at ASC`,
      [user.tenantId],
    );
    return jsonOk({ companies: rows });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "analyst"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão para cadastrar empresas." }, 403);
    }
    const body = (await request.json()) as {
      cnpj?: string;
      legalName?: string;
      tradeName?: string;
      uf?: string;
      municipality?: string;
      stateRegistration?: string;
    };
    if (!body.cnpj || !body.legalName?.trim()) {
      return jsonOk({ error: "CNPJ e razão social são obrigatórios." }, 400);
    }
    const cnpj = validateCnpj(body.cnpj);
    if (!cnpj.ok) return jsonOk({ error: cnpj.error }, 400);
    if (body.uf && !(BRAZIL_UFS as readonly string[]).includes(body.uf)) {
      return jsonOk({ error: "UF inválida." }, 400);
    }
    const created = await createCompanyWithQuota({
      tenantId: user.tenantId,
      actorUserId: user.id,
      cnpj: cnpj.cnpj,
      legalName: body.legalName.trim(),
      tradeName: body.tradeName?.trim() || null,
      uf: body.uf ?? null,
      municipality: body.municipality?.trim() || null,
      stateRegistration: body.stateRegistration?.trim() || null,
    });
    return jsonOk({ id: created.id }, 201);
  } catch (error) {
    return jsonError(error);
  }
}
