import { ExportError, readExportZip } from "@/server/export-zip";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const user = await requireUser();
    // H49 / E-R03: align with POST /api/exports role gate
    if (!["owner", "admin", "reviewer", "analyst"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão." }, 403);
    }
    const { id } = await params;
    const file = await readExportZip({ tenantId: user.tenantId, exportJobId: id });
    return new Response(new Uint8Array(file.bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${file.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    if (error instanceof ExportError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    return jsonError(error);
  }
}
