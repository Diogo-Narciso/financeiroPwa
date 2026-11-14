import JSZip from "jszip";

const MAX_FILES = 50;
const MAX_UNCOMPRESSED_TOTAL = 25 * 1024 * 1024; // 25 MiB
const MAX_SINGLE_FILE = 5 * 1024 * 1024; // 5 MiB

export class ZipSecurityError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "ZipSecurityError";
    this.code = code;
  }
}

export type ExtractedXml = { filename: string; bytes: Buffer };

/** Safe ZIP extract: zip-slip, zip-bomb, and count limits. */
export async function extractXmlsFromZip(zipBytes: Buffer): Promise<ExtractedXml[]> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(zipBytes);
  } catch {
    throw new ZipSecurityError("INVALID_ZIP", "Arquivo ZIP inválido ou corrompido.");
  }

  const out: ExtractedXml[] = [];
  let total = 0;

  for (const [name, entry] of Object.entries(zip.files)) {
    if (entry.dir) continue;
    const normalized = name.replace(/\\/g, "/");
    if (
      normalized.startsWith("/") ||
      normalized.includes("..") ||
      /^[A-Za-z]:/.test(normalized)
    ) {
      throw new ZipSecurityError(
        "ZIP_SLIP",
        `Caminho inseguro no ZIP rejeitado: ${name}`,
      );
    }
    if (!normalized.toLowerCase().endsWith(".xml")) continue;

    const bytes = Buffer.from(await entry.async("uint8array"));
    if (bytes.length > MAX_SINGLE_FILE) {
      throw new ZipSecurityError(
        "ZIP_FILE_TOO_LARGE",
        `Arquivo ${name} excede o limite por XML.`,
      );
    }
    total += bytes.length;
    if (total > MAX_UNCOMPRESSED_TOTAL) {
      throw new ZipSecurityError(
        "ZIP_BOMB",
        "Expansão total do ZIP excede o limite permitido.",
      );
    }
    out.push({ filename: pathBasename(normalized), bytes });
    if (out.length > MAX_FILES) {
      throw new ZipSecurityError(
        "ZIP_TOO_MANY_FILES",
        `ZIP com mais de ${MAX_FILES} XMLs.`,
      );
    }
  }

  if (out.length === 0) {
    throw new ZipSecurityError("ZIP_NO_XML", "ZIP sem arquivos .xml.");
  }
  return out;
}

function pathBasename(p: string): string {
  const parts = p.split("/");
  return parts[parts.length - 1] || p;
}
