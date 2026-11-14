import { ExportError, buildExportZip } from "@/server/export-zip";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "reviewer", "analyst"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const body = (await request.json()) as { companyId?: string };
    if (!body.companyId) return jsonOk({ error: "companyId obrigatório." }, 400);
    const result = await buildExportZip({
      tenantId: user.tenantId,
      companyId: body.companyId,
      actorUserId: user.id,
    });
    return jsonOk({
      exportJobId: result.exportJobId,
      sha256Zip: result.sha256Zip,
      manifest: result.manifest,
      downloadPath: `/api/exports/${result.exportJobId}/download`,
    }, 201);
  } catch (error) {
    if (error instanceof ExportError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
