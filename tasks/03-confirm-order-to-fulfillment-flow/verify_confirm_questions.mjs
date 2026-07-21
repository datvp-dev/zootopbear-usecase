import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx";
const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 3000,
  tableMaxRows: 4,
  tableMaxCols: 6,
});
console.log(summary.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "02 Câu hỏi confirm",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  "tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.preview.png",
  new Uint8Array(await preview.arrayBuffer()),
);
