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
    const batch = await getPool().query(
      `SELECT * FROM import_batches WHERE id = $1 AND tenant_id = $2`,
      [id, user.tenantId],
    );
    if (!batch.rows[0]) return jsonOk({ error: "Lote não encontrado." }, 404);

    const docs = await getPool().query(
      `SELECT id, access_key, sha256, byte_size, original_filename, status, rejection_reason, created_at
       FROM source_documents WHERE batch_id = $1 AND tenant_id = $2
       ORDER BY created_at`,
      [id, user.tenantId],
    );
    const errors = await getPool().query(
      `SELECT filename, code, message, created_at FROM import_errors
       WHERE batch_id = $1 AND tenant_id = $2 ORDER BY created_at`,
      [id, user.tenantId],
    );
    return jsonOk({
      batch: batch.rows[0],
      documents: docs.rows,
      errors: errors.rows,
    });
  } catch (error) {
    return jsonError(error);
  }
}
