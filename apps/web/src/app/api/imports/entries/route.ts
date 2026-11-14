import { importEntryFiles, ImportError } from "@/server/imports";
import { jsonError, jsonOk } from "@/server/http";
import { requireUser } from "@/server/session";
import { QuotaError } from "@/server/quotas";
import { ZipSecurityError } from "@/server/zip-safe";

export const runtime = "nodejs";

const MAX_UPLOAD = 20 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!["owner", "admin", "analyst"].includes(user.role)) {
      return jsonOk({ error: "Sem permissão para importar." }, 403);
    }

    const form = await request.formData();
    const companyId = String(form.get("companyId") ?? "");
    const file = form.get("file");
    if (!companyId || !(file instanceof File)) {
      return jsonOk({ error: "companyId e file são obrigatórios." }, 400);
    }
    if (file.size > MAX_UPLOAD) {
      return jsonOk({ error: "Arquivo excede 20 MiB." }, 400);
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const result = await importEntryFiles({
      tenantId: user.tenantId,
      companyId,
      actorUserId: user.id,
      originalFilename: file.name || "upload.xml",
      contentType: file.type || "application/octet-stream",
      bytes,
    });
    return jsonOk(result, 201);
  } catch (error) {
    if (error instanceof ImportError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    if (error instanceof QuotaError) {
      return jsonOk({ error: error.message, code: error.code }, error.status);
    }
    if (error instanceof ZipSecurityError) {
      return jsonOk({ error: error.message, code: error.code }, 400);
    }
    return jsonError(error);
  }
}
