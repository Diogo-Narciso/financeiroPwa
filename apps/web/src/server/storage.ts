import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

/** Private storage root — outside public/. Never rewrite originals. */
export function storageRoot(): string {
  return (
    process.env.STORAGE_ROOT ??
    path.resolve(process.cwd(), "../../storage")
  );
}

export function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export async function storeImmutableOriginal(args: {
  tenantId: string;
  companyId: string;
  filename: string;
  bytes: Buffer;
}): Promise<{ sha256: string; storagePath: string; absolutePath: string }> {
  const digest = sha256(args.bytes);
  const safeName = args.filename.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  const relative = path.join(
    args.tenantId,
    args.companyId,
    "originais",
    `${digest}_${safeName || "documento.xml"}`,
  );
  const absolute = path.join(storageRoot(), relative);
  await mkdir(path.dirname(absolute), { recursive: true });
  // Write only if missing — immutability: never overwrite existing hash file.
  try {
    await writeFile(absolute, args.bytes, { flag: "wx" });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "EEXIST") throw error;
  }
  return { sha256: digest, storagePath: relative, absolutePath: absolute };
}

export async function readStoredOriginal(storagePath: string): Promise<Buffer> {
  const absolute = path.join(storageRoot(), storagePath);
  // Prevent path traversal outside storage root
  const resolved = path.resolve(absolute);
  if (!resolved.startsWith(path.resolve(storageRoot()) + path.sep)) {
    throw new Error("Caminho de storage inválido.");
  }
  return readFile(resolved);
}

export function newBatchTempId(): string {
  return randomUUID();
}
