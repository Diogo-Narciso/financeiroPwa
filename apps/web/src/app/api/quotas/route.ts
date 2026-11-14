import { jsonError, jsonOk } from "@/server/http";
import { getQuotaSnapshot } from "@/server/quotas";
import { requireUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireUser();
    const companyId = new URL(request.url).searchParams.get("companyId") ?? undefined;
    const quotas = await getQuotaSnapshot(user.tenantId, companyId);
    return jsonOk({ quotas });
  } catch (error) {
    return jsonError(error);
  }
}
