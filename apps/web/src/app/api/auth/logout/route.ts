import { cookies } from "next/headers";
import { jsonOk } from "@/server/http";
import {
  SESSION_COOKIE,
  clearSessionCookie,
  destroySession,
} from "@/server/session";

export const runtime = "nodejs";

export async function POST() {
  const jar = await cookies();
  await destroySession(jar.get(SESSION_COOKIE)?.value);
  await clearSessionCookie();
  return jsonOk({ ok: true });
}
