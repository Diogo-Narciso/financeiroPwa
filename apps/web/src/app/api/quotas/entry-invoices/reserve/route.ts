import { jsonError, jsonOk } from "@/server/http";
import { reserveEntryInvoiceQuota } from "@/server/quotas";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";

/** Server-side trial reservation (E2 imports will call the same helper). */
export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = (await request.json()) as {
      companyId?: string;
      accessKey?: string;
    };
    if (!body.companyId || !body.accessKey?.trim()) {
      return jsonOk({ error: "companyId e accessKey são obrigatórios." }, 400);
    }
    const result = await reserveEntryInvoiceQuota({
      tenantId: user.tenantId,
      companyId: body.companyId,
      accessKey: body.accessKey.trim(),
      actorUserId: user.id,
    });
    return jsonOk(result, result.created ? 201 : 200);
  } catch (error) {
    return jsonError(error);
  }
}
