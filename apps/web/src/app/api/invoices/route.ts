import { getPool } from "@/server/db";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const companyId = new URL(request.url).searchParams.get("companyId");
    if (!companyId) return jsonOk({ error: "companyId obrigatório." }, 400);

    const { rows } = await getPool().query(
      `SELECT h.id, h.access_key, h.model, h.series, h.number, h.issued_at,
              h.emit_name, h.emit_uf, h.dest_cnpj, h.authorization_status, h.triage,
              h.created_at,
              (SELECT COUNT(*)::int FROM invoice_items i WHERE i.invoice_id = h.id) AS item_count,
              d.sha256
       FROM invoice_headers h
       JOIN source_documents d ON d.id = h.source_document_id
       WHERE h.tenant_id = $1 AND h.company_id = $2
       ORDER BY h.created_at DESC`,
      [user.tenantId, companyId],
    );
    return jsonOk({ invoices: rows });
  } catch (error) {
    return jsonError(error);
  }
}
