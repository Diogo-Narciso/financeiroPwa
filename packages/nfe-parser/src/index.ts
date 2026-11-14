import { XMLParser } from "fast-xml-parser";

export type ParsedNfeItem = {
  itemNumber: number;
  productCode: string | null;
  description: string | null;
  ncm: string | null;
  cest: string | null;
  gtin: string | null;
  cfopIssuer: string | null;
  quantity: string | null;
  unitPrice: string | null;
  productValue: string | null;
  discountValue: string | null;
  freightValue: string | null;
  otherValue: string | null;
  icmsCstCsosn: string | null;
  icmsOrigin: string | null;
  icmsBase: string | null;
  icmsRate: string | null;
  icmsValue: string | null;
  rawFields: Record<string, unknown>;
};

export type ParsedNfe = {
  accessKey: string;
  model: string;
  series: string | null;
  number: string | null;
  issuedAt: string | null;
  nature: string | null;
  tpNf: string | null;
  idDest: string | null;
  finNfe: string | null;
  emitCnpj: string | null;
  emitName: string | null;
  emitUf: string | null;
  destCnpj: string | null;
  destName: string | null;
  destUf: string | null;
  protocolNumber: string | null;
  authorizationStatus: "authorized_in_xml" | "without_protocol" | "unknown";
  triage: "entry_candidate" | "unsupported_model" | "special_operation" | "needs_review";
  items: ParsedNfeItem[];
  warnings: string[];
};

export class NfeParseError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "NfeParseError";
    this.code = code;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string | null {
  if (value == null) return null;
  if (typeof value === "string" || typeof value === "number") return String(value);
  const obj = asRecord(value);
  if (obj && "#text" in obj) return text(obj["#text"]);
  return null;
}

function first(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeDocId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length === 14 ? digits : raw.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
}

function extractAccessKey(infNFe: Record<string, unknown>, chNFe: string | null): string {
  const fromAttr =
    text(infNFe["@_Id"])?.replace(/^NFe/i, "") ??
    text(infNFe["@_id"])?.replace(/^NFe/i, "");
  const key = (chNFe ?? fromAttr ?? "").replace(/\D/g, "");
  if (key.length !== 44) {
    throw new NfeParseError(
      "INVALID_ACCESS_KEY",
      "Chave de acesso ausente ou inválida (esperado 44 dígitos).",
    );
  }
  return key;
}

function parseIcmsBlock(imposto: Record<string, unknown> | null): {
  cst: string | null;
  origin: string | null;
  base: string | null;
  rate: string | null;
  value: string | null;
} {
  if (!imposto) {
    return { cst: null, origin: null, base: null, rate: null, value: null };
  }
  const icms = asRecord(imposto.ICMS) ?? {};
  // Pick first ICMS* child
  for (const [k, v] of Object.entries(icms)) {
    if (!k.startsWith("ICMS")) continue;
    const block = asRecord(first(v));
    if (!block) continue;
    return {
      cst: text(block.CST) ?? text(block.CSOSN),
      origin: text(block.orig),
      base: text(block.vBC),
      rate: text(block.pICMS),
      value: text(block.vICMS),
    };
  }
  return { cst: null, origin: null, base: null, rate: null, value: null };
}

/**
 * Safe NF-e parse: no DTD/entity expansion, no network.
 * Distinguishes missing fields from explicit zeros by keeping string values.
 */
export function parseNfeXml(xmlBytes: Buffer | string): ParsedNfe {
  const xml = typeof xmlBytes === "string" ? xmlBytes : xmlBytes.toString("utf8");
  if (/<!DOCTYPE/i.test(xml) || /<!ENTITY/i.test(xml)) {
    throw new NfeParseError(
      "UNSAFE_XML",
      "XML com DOCTYPE/ENTITY rejeitado (proteção XXE).",
    );
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: false,
    ignoreDeclaration: false,
    trimValues: true,
    // Keep CNPJ/chave as strings — JS numbers lose precision on 44-digit keys.
    parseTagValue: false,
  });

  let doc: unknown;
  try {
    doc = parser.parse(xml);
  } catch {
    throw new NfeParseError("MALFORMED_XML", "XML malformado ou ilegível.");
  }

  const root = asRecord(doc) ?? {};
  const nfeProc = asRecord(root.nfeProc);
  const nfe = asRecord(nfeProc?.NFe) ?? asRecord(root.NFe);
  if (!nfe) {
    // Detect other models by tag names
    const blob = xml.slice(0, 2000);
    if (/<(nfc|NFCe|NFce)/i.test(blob) || /mod>\s*65\s*</i.test(blob)) {
      throw new NfeParseError(
        "UNSUPPORTED_MODEL",
        "Documento parece NFC-e (modelo 65). Apenas NF-e modelo 55 de entrada é aceita neste fluxo.",
      );
    }
    if (/<(CTe|cteProc)/i.test(blob)) {
      throw new NfeParseError(
        "UNSUPPORTED_MODEL",
        "CT-e não é aceito no fluxo de NF-e de entrada.",
      );
    }
    throw new NfeParseError(
      "NOT_NFE",
      "Arquivo não contém NF-e (NFe/nfeProc) reconhecível.",
    );
  }

  const infNFe = asRecord(first(nfe.infNFe));
  if (!infNFe) {
    throw new NfeParseError("MISSING_INFNFE", "Tag infNFe ausente.");
  }

  const ide = asRecord(infNFe.ide) ?? {};
  const emit = asRecord(infNFe.emit) ?? {};
  const dest = asRecord(infNFe.dest) ?? {};
  const prot = asRecord(nfeProc?.protNFe);
  const infProt = asRecord(prot?.infProt) ?? {};

  const model = text(ide.mod) ?? "";
  const warnings: string[] = [];
  let triage: ParsedNfe["triage"] = "entry_candidate";

  if (model && model !== "55") {
    triage = "unsupported_model";
    throw new NfeParseError(
      "UNSUPPORTED_MODEL",
      `Modelo ${model} não suportado neste fluxo (apenas NF-e modelo 55).`,
    );
  }

  const finNfe = text(ide.finNFe);
  const tpNf = text(ide.tpNF);
  if (finNfe && finNfe !== "1") {
    triage = "special_operation";
    warnings.push(`finNFe=${finNfe}: operação especial — triagem necessária.`);
  }
  if (tpNf === "0") {
    // emitente perspective: 0=entrada — unusual for supplier NF-e of purchase
    warnings.push("tpNF=0 no XML do emitente — revisar natureza da operação.");
  }

  const chNFe = text(infProt.chNFe);
  const accessKey = extractAccessKey(infNFe, chNFe);
  const protocolNumber = text(infProt.nProt);
  const authorizationStatus: ParsedNfe["authorizationStatus"] = protocolNumber
    ? "authorized_in_xml"
    : nfeProc
      ? "without_protocol"
      : "unknown";
  if (!protocolNumber) {
    warnings.push(
      "Sem protocolo de autorização no XML — não afirmar situação SEFAZ atual.",
    );
  }

  const detList = infNFe.det;
  const dets = Array.isArray(detList) ? detList : detList ? [detList] : [];
  if (dets.length === 0) {
    throw new NfeParseError("NO_ITEMS", "NF-e sem itens (det).");
  }

  const items: ParsedNfeItem[] = dets.map((rawDet, index) => {
    const det = asRecord(rawDet) ?? {};
    const prod = asRecord(det.prod) ?? {};
    const imposto = asRecord(det.imposto);
    const icms = parseIcmsBlock(imposto);
    const itemNumber = Number(text(det["@_nItem"]) ?? index + 1);
    return {
      itemNumber,
      productCode: text(prod.cProd),
      description: text(prod.xProd),
      ncm: text(prod.NCM),
      cest: text(prod.CEST),
      gtin: text(prod.cEAN) ?? text(prod.cEANTrib),
      cfopIssuer: text(prod.CFOP),
      quantity: text(prod.qCom),
      unitPrice: text(prod.vUnCom),
      productValue: text(prod.vProd),
      discountValue: text(prod.vDesc),
      freightValue: text(prod.vFrete),
      otherValue: text(prod.vOutro),
      icmsCstCsosn: icms.cst,
      icmsOrigin: icms.origin,
      icmsBase: icms.base,
      icmsRate: icms.rate,
      icmsValue: icms.value,
      rawFields: {
        missingVsZero: {
          vDesc: prod.vDesc === undefined ? "absent" : text(prod.vDesc) === "0.00" || text(prod.vDesc) === "0" ? "explicit_zero" : "present",
          vFrete: prod.vFrete === undefined ? "absent" : "present",
        },
      },
    };
  });

  return {
    accessKey,
    model: model || "55",
    series: text(ide.serie),
    number: text(ide.nNF),
    issuedAt: text(ide.dhEmi) ?? text(ide.dEmi),
    nature: text(ide.natOp),
    tpNf,
    idDest: text(ide.idDest),
    finNfe,
    emitCnpj: normalizeDocId(text(emit.CNPJ) ?? text(emit.CPF)),
    emitName: text(emit.xNome),
    emitUf: text(asRecord(emit.enderEmit)?.UF),
    destCnpj: normalizeDocId(text(dest.CNPJ) ?? text(dest.CPF)),
    destName: text(dest.xNome),
    destUf: text(asRecord(dest.enderDest)?.UF),
    protocolNumber,
    authorizationStatus,
    triage,
    items,
    warnings,
  };
}

export function isLikelyXml(bytes: Buffer): boolean {
  const head = bytes.subarray(0, 200).toString("utf8").trimStart();
  return head.startsWith("<?xml") || head.startsWith("<");
}
