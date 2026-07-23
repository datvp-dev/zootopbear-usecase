import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/myproject/zootopbear-usecase/doc/QA khách hàng v1.xlsx";
const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const summary = await workbook.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 4000,
});
console.log(summary.ndjson);

const questions = await workbook.inspect({
  kind: "table",
  sheetId: "Câu hỏi cần hỏi",
  range: "A1:G80",
  tableMaxRows: 80,
  tableMaxCols: 7,
  tableMaxCellChars: 260,
  maxChars: 30000,
});
console.log(questions.ndjson);

const styles = await workbook.inspect({
  kind: "computedStyle",
  sheetId: "Câu hỏi cần hỏi",
  range: "A1:G8",
  maxChars: 8000,
});
console.log(styles.ndjson);
