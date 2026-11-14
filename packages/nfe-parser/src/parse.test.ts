import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { NfeParseError, parseNfeXml } from "./index";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const fixturePath = join(root, "scripts/fixtures/nfe/nfe-entrada-demo.xml");

// CT-01 — XML fixture válida → parse ok
const validXml = readFileSync(fixturePath, "utf8");
const parsed = parseNfeXml(validXml);
assert.equal(parsed.model, "55");
assert.equal(parsed.accessKey.length, 44);
assert.equal(parsed.emitCnpj, "60746948000112");
assert.equal(parsed.destCnpj, "11222333000181");
assert.ok(parsed.items.length >= 1);
assert.equal(parsed.authorizationStatus, "authorized_in_xml");
assert.equal(parsed.triage, "entry_candidate");
console.log("OK CT-01 valid fixture", {
  accessKey: parsed.accessKey,
  items: parsed.items.length,
});

// CT-02 — XML inválida / unsafe → erro controlado
function expectCode(xml: string, code: string) {
  try {
    parseNfeXml(xml);
    assert.fail(`expected NfeParseError ${code}`);
  } catch (error) {
    assert.ok(error instanceof NfeParseError, String(error));
    assert.equal(error.code, code);
  }
}

expectCode("<not-xml", "MALFORMED_XML");
expectCode(
  `<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><NFe>&xxe;</NFe>`,
  "UNSAFE_XML",
);
expectCode(`<?xml version="1.0"?><root><hello/></root>`, "NOT_NFE");
expectCode(
  `<?xml version="1.0"?>
   <NFe><infNFe Id="NFe35240111222333000181550010000000011000000010" versao="4.00">
     <ide><mod>65</mod><serie>1</serie><nNF>1</nNF><finNFe>1</finNFe><tpNF>1</tpNF></ide>
     <emit><CNPJ>60746948000112</CNPJ><xNome>X</xNome><enderEmit><UF>SP</UF></enderEmit></emit>
     <dest><CNPJ>11222333000181</CNPJ><xNome>Y</xNome><enderDest><UF>RJ</UF></enderDest></dest>
     <det nItem="1"><prod><cProd>1</cProd><xProd>p</xProd><NCM>96039000</NCM><CFOP>5102</CFOP>
       <qCom>1</qCom><vUnCom>1</vUnCom><vProd>1.00</vProd></prod><imposto/></det>
   </infNFe></NFe>`,
  "UNSUPPORTED_MODEL",
);
console.log("OK CT-02 invalid/unsafe XML");

console.log("All nfe-parser unit tests passed.");
