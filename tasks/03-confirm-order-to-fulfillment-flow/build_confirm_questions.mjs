import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = "tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx";

const workbook = Workbook.create();

function styleHeader(range, fill = "#0F766E") {
  range.format = {
    fill,
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
}

function styleTable(sheet, range) {
  const r = sheet.getRange(range);
  r.format = {
    borders: { preset: "inside", style: "thin", color: "#D7DEE8" },
    wrapText: true,
    verticalAlignment: "top",
  };
}

function setWidths(sheet, widths) {
  const toColumnName = (num) => {
    let name = "";
    let n = num + 1;
    while (n > 0) {
      const rem = (n - 1) % 26;
      name = String.fromCharCode(65 + rem) + name;
      n = Math.floor((n - 1) / 26);
    }
    return name;
  };
  widths.forEach((width, index) => {
    const column = toColumnName(index);
    sheet.getRange(`${column}1:${column}200`).format.columnWidth = width;
  });
}

const overview = workbook.worksheets.add("01 Tổng quan luồng");
overview.showGridLines = false;
overview.getRange("A1:F1").merge();
overview.getRange("A1").values = [["Confirm luồng seller tạo đơn đến supplier"]];
overview.getRange("A1").format = {
  fill: "#0F172A",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
overview.getRange("A3:F11").values = [
  ["Bước", "Bên thực hiện", "Đang làm thủ công hiện tại", "Dữ liệu/cột Excel liên quan", "Hệ thống mới cần làm", "Cần confirm"],
  ["1", "Seller", "Gửi file/order list cho Zootop Bear", "Order ID, người nhận, SKU/Variant, Quantity, Design, Mockup", "Cho seller tạo/import đơn trên web", "Seller sẽ dùng UI, file, API hay cả 3?"],
  ["2", "Zootop Bear", "Copy/import đơn vào sheet theo nhóm sản phẩm", "Home Decor, MUG US, Accessories, GILDAN/Apparel", "Tự động phân loại category/order item", "Rule phân loại theo SKU/Product/Variant là gì?"],
  ["3", "Zootop Bear", "Lookup giá và supplier bằng Variant ID/SKU", "VARIANT_SUPPLIER_MAP, ProductCode, SellersItemSku", "Tự động mapping sang supplier/platform", "415/922 tương ứng supplier nào?"],
  ["4", "Zootop Bear", "Excel tính Total Cost theo order", "Base cost, Shipping fee, Add items fee, Label fee", "Tính giá trước khi seller confirm", "Công thức tính tiền chốt có đúng Excel không?"],
  ["5", "Zootop Bear", "Nhân viên xử lý dòng lỗi/import lỗi", "Issue, Import lên có vấn đề", "Validation + Hold/Ticket nội bộ", "Lỗi nào bắt seller sửa, lỗi nào nội bộ xử lý?"],
  ["6", "Supplier", "Nhân viên đẩy file/API/portal sang nền tảng", "Supplier, ProductCode/SKU, Order ID", "Tạo đơn supplier tự động nếu có API", "Supplier nào có API tạo đơn?"],
  ["7", "Supplier", "Supplier sinh mã riêng và tracking", "PrintBelle OrderNo, SystemSku, TrackNo", "Lưu supplier order mapping", "OrderNo/SystemSku có cần lưu và hiện cho ai?"],
  ["8", "Zootop Bear", "Export/copy tracking ngược về file", "TrackNo, LogisticsCompany, Status", "Đồng bộ tracking/status về seller dashboard", "Nguồn tracking ưu tiên: supplier hay 17TRACK?"],
];
styleHeader(overview.getRange("A3:F3"));
styleTable(overview, "A3:F11");
setWidths(overview, [8, 18, 34, 34, 34, 34]);
overview.freezePanes.freezeRows(3);

const questions = workbook.worksheets.add("02 Câu hỏi confirm");
questions.showGridLines = false;
questions.getRange("A1:H1").values = [["Nhóm", "Ưu tiên", "Câu hỏi cho khách", "Vì sao cần hỏi", "Gợi ý câu trả lời", "Trả lời của khách", "Quyết định chốt", "Ghi chú"]];
styleHeader(questions.getRange("A1:H1"));
const qRows = [
  ["Mapping supplier", "P0", "Trong file Excel, Supplier = 415 và 922 tương ứng với xưởng/nền tảng nào?", "Đây là khóa routing order sang supplier.", "415 = ?, 922 = ?, Printeblle = PrintBelle?", "", "", ""],
  ["Mapping supplier", "P0", "Variant ID trong file là mã nội bộ Zootop hay mã của supplier?", "Ảnh hưởng cách thiết kế catalog và import order.", "Mã supplier / mã nội bộ / cả hai", "", "", ""],
  ["Mapping supplier", "P0", "Có bảng mapping chuẩn nào ngoài VARIANT_SUPPLIER_MAP không?", "File hiện có supplier code chưa đồng nhất.", "Có file master / không có / đang quản lý bằng Excel", "", "", ""],
  ["Catalog", "P0", "Catalog Zootop Bear sẽ là nguồn chuẩn hay sync từ từng supplier?", "Quyết định cách cập nhật product, giá, template, mockup.", "Zootop là nguồn chuẩn / supplier là nguồn chuẩn / kết hợp", "", "", ""],
  ["Catalog", "P1", "Mỗi supplier có API lấy product/variant/price không?", "Nếu có API có thể giảm nhập tay; nếu không thì phải import Excel.", "FlashShip=?, PrintBelle=?, SimplePrint=?, ART ADD=?, Snap Ecom=?", "", "", ""],
  ["Tạo đơn", "P0", "Seller tạo đơn bằng UI, import file, API hay cả 3 trong phase 1?", "Quyết định scope tạo đơn.", "UI / Excel-CSV / API / cả 3", "", "", ""],
  ["Tạo đơn", "P0", "File lỗi 5 dòng trong 100 dòng thì nhận 95 dòng đúng hay reject cả file?", "Ảnh hưởng validation và batch result.", "Nhận một phần / reject cả file / cho sửa trên web", "", "", ""],
  ["Tạo đơn", "P0", "Một order nhiều sản phẩm sẽ nhập nhiều dòng cùng Order ID hay một dòng gom nhiều item?", "Excel hiện đang gom theo Order ID.", "Nhiều dòng cùng Order ID / một dòng nhiều item", "", "", ""],
  ["Tính tiền", "P0", "Web có giữ rule Excel: shipping/add-item chỉ tính một lần trên order không?", "Đây là rule cost cốt lõi.", "Giữ đúng Excel / cần sửa", "", "", ""],
  ["Tính tiền", "P0", "Nếu một order có nhiều variant khác shipping fee, lấy shipping fee nào?", "Excel cho thấy cần chốt dòng đầu hay phí cao nhất.", "Phí cao nhất / dòng đầu tiên / theo supplier / khác", "", "", ""],
  ["Tính tiền", "P0", "Đơn có Link Label/TikTok tính label fee thay shipping fee hay tính cả hai?", "Excel Home Decor đang có nhánh riêng cho Link Label.", "Chỉ label fee / label + shipping / tùy shipping method", "", "", ""],
  ["Tính tiền", "P1", "Apparel/Gildan có cần tính thêm phí in back/sleeve như Excel không?", "Sheet GILDAN có logic riêng front/back/sleeve.", "Có / không / để phase sau", "", "", ""],
  ["Lỗi và Hold", "P0", "SKU/Variant không match supplier thì seller sửa ngay hay nội bộ xử lý?", "Cần chốt trạng thái Hold và quyền sửa.", "Seller sửa / nội bộ sửa / cả hai", "", "", ""],
  ["Lỗi và Hold", "P0", "Link design/mockup lỗi thì chặn confirm hay cho vào Hold?", "File có sheet Import lên có vấn đề.", "Chặn confirm / cho Hold / tùy loại lỗi", "", "", ""],
  ["Supplier", "P0", "Sau khi seller confirm và đủ tiền, đơn tự động gửi supplier hay cần nội bộ kiểm tra?", "Quyết định luồng tự động hay bán tự động.", "Tự động / nội bộ duyệt trước / theo supplier", "", "", ""],
  ["Supplier", "P0", "Supplier nào trong 5 nền tảng có API tạo đơn thật?", "Quyết định go-live tích hợp.", "FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom", "", "", ""],
  ["PrintBelle", "P0", "OrderNo dạng PBKDP... có phải mã đơn nội bộ của PrintBelle không?", "File tracking có OrderNo không match file công ty.", "Đúng / không / cần hỏi PrintBelle", "", "", ""],
  ["PrintBelle", "P0", "SystemSku KDP... có cần lưu để đối soát/debug không?", "SystemSku không match ProductCode/SellersItemSku.", "Lưu nội bộ / không cần / hiện cho Admin", "", "", ""],
  ["Tracking", "P0", "PrintBelle có API lấy tracking/logistics hay chỉ export thủ công?", "Quyết định đồng bộ tracking tự động.", "API / export file / chưa rõ", "", "", ""],
  ["Tracking", "P0", "Status notfound và InfoReceived map sang trạng thái nào cho seller?", "Không nên show thẳng status khó hiểu cho seller.", "Chờ tracking / đã nhận thông tin / đang vận chuyển...", "", "", ""],
  ["Tracking", "P1", "Tracking từ supplier và 17TRACK khác nhau thì ưu tiên nguồn nào?", "Cần rule status hiển thị.", "Supplier / 17TRACK / mỗi nguồn một mục đích", "", "", ""],
  ["Refund/Issue", "P1", "Issue hiện có Resend/Refund sẽ map thành ticket, hold hay refund flow nào?", "Sheet Issue đang là quy trình thủ công quan trọng.", "Ticket / Hold / Refund / kết hợp", "", "", ""],
];
questions.getRange(`A2:H${qRows.length + 1}`).values = qRows;
styleTable(questions, `A1:H${qRows.length + 1}`);
questions.getRange(`B2:B${qRows.length + 1}`).dataValidation = { rule: { type: "list", values: ["P0", "P1", "P2"] } };
setWidths(questions, [18, 10, 46, 38, 34, 28, 28, 24]);
questions.freezePanes.freezeRows(1);

const mapping = workbook.worksheets.add("03 Mapping cần lưu");
mapping.showGridLines = false;
mapping.getRange("A1:F1").values = [["Field cần lưu", "Nguồn hiện tại", "Ví dụ", "Dùng để làm gì", "Hiện cho seller?", "Cần confirm"]];
styleHeader(mapping.getRange("A1:F1"), "#1D4ED8");
const mapRows = [
  ["seller_order_id", "File fulfill: Order ID / PrintBelle: OrderId", "US62_RD-97325-79839-F1, 4120349695", "Đối chiếu đơn seller gửi", "Có", "Nguồn order id chuẩn là cột nào?"],
  ["zootop_order_id", "Hệ thống mới tự sinh", "ZB-2026-000001", "Khóa nội bộ Zootop", "Có thể", "Format mã đơn nội bộ?"],
  ["supplier_code", "VARIANT_SUPPLIER_MAP", "415, 922, Printeblle", "Routing sang supplier", "Không", "415/922 là ai?"],
  ["supplier_order_no", "PrintBelle tracking export: OrderNo", "PBKDP2461", "Mã đơn trên supplier", "Không", "Mỗi supplier có field tương tự không?"],
  ["product_code_sent", "PrintBelle: ProductCode/SellersItemSku", "USARCRDFP/10CM", "Mã Zootop gửi sang supplier", "Không", "Field nào là mã chuẩn?"],
  ["supplier_system_sku", "PrintBelle: SystemSku", "KDP02919", "Debug/đối soát supplier", "Không", "Có cần lưu không?"],
  ["tracking_no", "PrintBelle: TrackNo", "TBA..., 921449..., GFUS...", "Tracking seller xem", "Có", "Nguồn cập nhật tracking?"],
  ["tracking_carrier", "PrintBelle: LogisticsCompany", "USPS, Amazon Shipping, GOFO", "Tạo link/17TRACK", "Có", "Mapping carrier link?"],
  ["supplier_tracking_status", "PrintBelle: Status", "notfound, InfoReceived", "Map status nội bộ", "Không nên show raw", "Map sang status nào?"],
];
mapping.getRange(`A2:F${mapRows.length + 1}`).values = mapRows;
styleTable(mapping, `A1:F${mapRows.length + 1}`);
setWidths(mapping, [24, 34, 30, 34, 18, 34]);
mapping.freezePanes.freezeRows(1);

const status = workbook.worksheets.add("04 Status tracking");
status.showGridLines = false;
status.getRange("A1:F1").values = [["Raw status/nguồn", "Nguồn", "Ý nghĩa suy ra", "Đề xuất hiển thị seller", "Hành động nội bộ", "Cần confirm"]];
styleHeader(status.getRange("A1:F1"), "#9333EA");
const sRows = [
  ["notfound", "PrintBelle", "Chưa tìm thấy tracking event", "Chờ cập nhật tracking", "Theo dõi nếu quá SLA", "Bao lâu thì đưa vào dashboard tracking thiếu?"],
  ["InfoReceived", "PrintBelle", "Carrier/supplier đã nhận thông tin vận đơn", "Đã có thông tin vận đơn", "Chờ tracking event tiếp theo", "Map thành Shipped hay In transit?"],
  ["TrackNo có TBA...", "PrintBelle/Amazon Shipping", "Tracking Amazon Shipping", "Tracking number + carrier", "Cần link tracking đúng", "Có đẩy qua 17TRACK được không?"],
  ["Issue: Refund", "File Issue", "Đơn lỗi cần hoàn tiền", "Đang xử lý/Đã hoàn tiền", "Refund flow", "Ai duyệt refund?"],
  ["Issue: Resend", "File Issue", "Đơn lỗi cần gửi lại", "Đang xử lý lại", "Ticket/resend order", "Tính tiền lại hay miễn phí?"],
];
status.getRange(`A2:F${sRows.length + 1}`).values = sRows;
styleTable(status, `A1:F${sRows.length + 1}`);
setWidths(status, [24, 24, 32, 28, 28, 38]);
status.freezePanes.freezeRows(1);

const source = workbook.worksheets.add("05 Nguồn phân tích");
source.showGridLines = false;
source.getRange("A1:D1").values = [["File/nguồn", "Nội dung đã dùng", "Phát hiện chính", "Ghi chú"]];
styleHeader(source.getRange("A1:D1"), "#334155");
source.getRange("A2:D5").values = [
  ["Bảng fulfill US tổng Tháng 5-6-7-8 2026", "Order, cost, supplier map, issue", "Excel đang là quy trình thủ công gốc", "Có PII, cần bảo mật"],
  ["US Factory Catalog.xlsx", "Catalog, base cost, shipping, add-item, template", "Catalog có nhiều category và công thức riêng", "Cần tách catalog Zootop và mapping supplier"],
  ["a4d53032...xlsx", "PrintBelle tracking/logistics export", "OrderNo/SystemSku/TrackNo cần lưu riêng", "ProductCode match file công ty 30/30"],
  ["MANUAL_FLOW_ANALYSIS.md", "Tổng hợp phân tích", "Nên dùng Excel làm quy trình gốc để hỏi khách", "Task 04"],
];
styleTable(source, "A1:D5");
setWidths(source, [34, 34, 46, 28]);
source.freezePanes.freezeRows(1);

for (const sheet of workbook.worksheets.items) {
  const used = sheet.getUsedRange();
  if (used) {
    used.format.verticalAlignment = "top";
    used.format.wrapText = true;
  }
}

await fs.mkdir("tasks/03-confirm-order-to-fulfillment-flow", { recursive: true });
const inspect = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 4000,
  tableMaxRows: 5,
  tableMaxCols: 6,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`Saved ${outputPath}`);
