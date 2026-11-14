import { NextResponse } from "next/server";
import { AuthError } from "./session";
import { QuotaError } from "./quotas";
import { AuthServiceError } from "./auth-service";

export function jsonOk(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof QuotaError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  if (error instanceof AuthServiceError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error(error);
  return NextResponse.json(
    { error: "Erro interno do servidor." },
    { status: 500 },
  );
}
