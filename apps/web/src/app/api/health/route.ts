import { NextResponse } from "next/server";
import { getHealth } from "@/lib/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const body = await getHealth();
  return NextResponse.json(body, {
    status: body.status === "error" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
