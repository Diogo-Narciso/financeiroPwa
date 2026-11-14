import { cookies } from "next/headers";
import { getQuotaSnapshot } from "@/server/quotas";
import { jsonError, jsonOk } from "@/server/http";
import { SESSION_COOKIE, readSessionUser } from "@/server/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jar = await cookies();
    const user = await readSessionUser(jar.get(SESSION_COOKIE)?.value);
    if (!user) return jsonOk({ user: null });
    const quotas = await getQuotaSnapshot(user.tenantId);
    return jsonOk({ user, quotas });
  } catch (error) {
    return jsonError(error);
  }
}
