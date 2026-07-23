import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/myproject/zootopbear-usecase/doc/QA khách hàng v1.xlsx";
const outputPath = inputPath;

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);

const orderSheet = workbook.worksheets.getItem("QA_order_flow");
const mainSheet = workbook.worksheets.getItem("Câu hỏi cần hỏi");

const orderRows = [
  ["STT", "Nhóm", "Câu hỏi gửi khách", "Ý hiểu hiện tại để khách xác nhận/sửa", "Khách trả lời", "Ghi chú"],
  [1, "Luồng tổng quan", "Nhờ anh/chị mô tả giúp một đơn thực tế từ đầu đến cuối: seller gửi/tạo đơn như thế nào, Zootop kiểm tra gì, tính tiền lúc nào, ai đẩy đơn sang xưởng, và tracking được cập nhật về ra sao?", "Mục tiêu là lấy một ví dụ thật để đối chiếu toàn bộ luồng, tránh chỉ hiểu theo file Excel.", null, "Câu hỏi mở đầu nên hỏi trước."],
  [2, "Luồng tổng quan", "Hiện tại seller gửi danh sách đơn cho Zootop bằng file Excel/list đơn, sau đó nhân viên Zootop xử lý tiếp trên file nội bộ. Cách hiểu này có đúng với luồng đang chạy không?", "Ý hiểu hiện tại: seller chưa thao tác trực tiếp trên hệ thống Zootop; seller gửi dữ liệu đơn, Zootop kiểm tra - tính tiền - đưa đơn sang xưởng.", null, null],
  [3, "Cấu trúc đơn", "Nếu một đơn có nhiều sản phẩm, hiện tại file sẽ có nhiều dòng cùng một mã đơn, mỗi dòng là một sản phẩm/item. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: Order ID là mã dùng để gom nhiều dòng thành cùng một đơn khi tính tiền và theo dõi.", null, null],
  [4, "Thông tin bắt buộc", "Một đơn trước khi gửi xưởng cần có: thông tin người nhận, mã hàng/phiên bản sản phẩm, số lượng, link thiết kế/mockup, hình thức giao hàng hoặc label nếu có. Có thiếu thông tin quan trọng nào không?", "Ý hiểu hiện tại: đây là nhóm dữ liệu tối thiểu để xưởng có thể sản xuất và giao hàng.", null, null],
  [5, "Kiểm tra dữ liệu", "Trước khi đưa đơn sang xưởng, nhân viên Zootop đang kiểm tra lỗi như thiếu địa chỉ, sai mã hàng, link thiết kế không mở được, thiếu mockup hoặc file trước/sau bị lệch. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: các đơn lỗi chưa đi xưởng ngay mà được tách ra để xử lý riêng.", null, null],
  [6, "Catalog", "Trong catalog hiện tại có sản phẩm nào Zootop Bear tự sản xuất/tự vận hành không, hay toàn bộ sản phẩm đều lấy từ 5 xưởng/nền tảng phía sau như FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom?", "Điểm này quyết định catalog là nguồn sản phẩm nội bộ, nguồn đồng bộ từ xưởng, hay kết hợp cả hai.", null, "Câu bổ sung theo yêu cầu."],
  [7, "Catalog", "Các nhóm như Home Decor, Mug, Accessories/Home Living, Gildan/Apparel đang có cách xử lý và công thức tính tiền riêng. Web mới cần giữ logic riêng theo từng nhóm sản phẩm, đúng không?", "Ý hiểu hiện tại: không thể dùng một công thức chung cho toàn bộ sản phẩm.", null, null],
  [8, "SKU / Variant ID", "Anh/chị giải thích giúp SKU và Variant ID khác nhau thế nào trong file hiện tại? SKU dùng để nhận diện sản phẩm bán, còn Variant ID dùng để nhận diện phiên bản sản phẩm/xưởng, hay đang có quy ước khác?", "Hiện tại Excel dùng cả SKU, Product ID, Variant ID; cần tách rõ để thiết kế catalog, import đơn và mapping sang xưởng.", null, "Câu bổ sung theo yêu cầu."],
  [9, "Tính tiền", "Tổng tiền đơn hiện được tính từ tiền sản phẩm, phí ship hoặc phí label, phí item thêm và có thể có phí in thêm với áo. Cách hiểu này có đúng với Excel hiện tại không?", "Ý hiểu hiện tại: nhiều dòng cùng mã đơn được gom lại; phí ship/label thường không tính lặp trên mọi dòng.", null, null],
  [10, "Giá seller và giá xưởng", "Zootop có một giá tính cho seller, còn giá/cost khi tạo đơn trên từng xưởng là một lớp giá khác dùng để đối soát nội bộ. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: seller không nhất thiết nhìn thấy giá vốn của xưởng.", null, null],
  [11, "Tìm xưởng sản xuất", "Sau khi biết mã hàng/phiên bản sản phẩm, Zootop tra bảng mapping để biết đơn sẽ đi sang xưởng nào, ví dụ PrintBelle hoặc các mã nội bộ như 415/922. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: mã hàng không chỉ dùng để tính giá mà còn dùng để chọn xưởng xử lý.", null, null],
  [12, "Đẩy đơn sang xưởng", "Với đơn đã đủ dữ liệu và đã xác định được xưởng, nhân viên Zootop hiện tạo đơn trên nền tảng của xưởng bằng web/portal, upload file hoặc kết nối tự động tùy xưởng. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: mỗi xưởng có cách đưa đơn lên khác nhau; web mới cần mô phỏng hoặc tự động hóa dần phần này.", null, null],
  [13, "5 xưởng/nền tảng", "Hiện các xưởng/nền tảng phía sau gồm FlashShip, SimplePrint, PrintBelle, ART ADD và Snap Ecom. Có xưởng nào đang dùng cho đơn hiện tại nhưng chưa nằm trong danh sách này không?", "Ý hiểu hiện tại: đây là 5 nơi Zootop dùng để sản xuất/fulfill đơn cho seller.", null, null],
  [14, "Mã đơn của xưởng", "Sau khi đơn được tạo trên xưởng, xưởng có thể sinh mã đơn/mã hàng riêng. Zootop cần lưu lại các mã này để tra cứu, đối soát và xử lý support. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: mã đơn seller/Zootop và mã đơn của xưởng là hai loại mã khác nhau.", null, null],
  [15, "Mã vận đơn", "Sau khi xưởng ship hàng, Zootop nhận hoặc export mã vận đơn, hãng vận chuyển và trạng thái giao hàng rồi cập nhật lại vào file theo dõi. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: mã vận đơn là dữ liệu trả về sau khi xưởng đã xử lý/gửi hàng.", null, null],
  [16, "Đối chiếu tracking", "Khi cập nhật mã vận đơn, Zootop đối chiếu bằng mã đơn, mã hàng hoặc mã đơn của xưởng để gắn đúng tracking vào đúng đơn ban đầu. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: bước đối chiếu này giúp tránh nhầm tracking giữa các đơn hoặc giữa các seller.", null, null],
  [17, "Lỗi, gửi lại, hoàn tiền", "Các trường hợp như lỗi thiết kế, lỗi import, giao sai, hàng lỗi, cần gửi lại hoặc hoàn tiền hiện đang được theo dõi riêng ở sheet Issue/Import lỗi. Web mới nên chuyển phần này thành luồng xử lý lỗi/ticket/refund/resend. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: đây là luồng phụ nhưng rất quan trọng, không chỉ là ghi chú đơn hàng.", null, null],
  [18, "Trạng thái seller nhìn thấy", "Trên web mới, seller nên thấy trạng thái dễ hiểu như đang xử lý, đã gửi xưởng, đã có mã vận đơn, đang vận chuyển, đã giao, cần hỗ trợ; còn mã nội bộ của xưởng nên để Zootop xem. Cách hiểu này có đúng không?", "Ý hiểu hiện tại: seller không cần nhìn các mã nội bộ như 415/922 hoặc mã SKU riêng của xưởng nếu không cần thiết.", null, null],
];

orderSheet.getRange("A1:F40").clear({ applyTo: "contents" });
orderSheet.getRangeByIndexes(0, 0, orderRows.length, 6).values = orderRows;
orderSheet.getRange("A1:F1").format = {
  fill: "#D9EAF7",
  font: { bold: true },
  wrapText: true,
  borders: { preset: "outside", style: "thin", color: "#000000" },
};
orderSheet.getRange(`A2:F${orderRows.length}`).format = {
  wrapText: true,
  font: { fontSize: 10, typeface: "Arial" },
};
orderSheet.getRange(`A1:F${orderRows.length}`).format.borders = {
  insideHorizontal: { style: "thin", color: "#E5E7EB" },
};
orderSheet.getRange("A:A").format.columnWidth = 7;
orderSheet.getRange("B:B").format.columnWidth = 22;
orderSheet.getRange("C:C").format.columnWidth = 58;
orderSheet.getRange("D:D").format.columnWidth = 52;
orderSheet.getRange("E:E").format.columnWidth = 28;
orderSheet.getRange("F:F").format.columnWidth = 24;
orderSheet.freezePanes.freezeRows(1);

const mainAdditions = [
  [46, "Catalog", "Trong catalog hiện tại có sản phẩm nào Zootop Bear tự sản xuất/tự vận hành không, hay toàn bộ sản phẩm đều lấy từ 5 xưởng/nền tảng phía sau?", "Cần biết catalog là nguồn sản phẩm nội bộ, nguồn lấy từ supplier, hay kết hợp cả hai.", "Zootop tự sản xuất / lấy từ 5 xưởng / kết hợp cả hai", "P0", null],
  [47, "Catalog", "SKU và Variant ID khác nhau thế nào trong file hiện tại?", "Cần tách rõ mã dùng cho seller, mã dùng để tra giá và mã dùng để gửi sang xưởng.", "SKU là mã bán hàng, Variant ID là mã phiên bản / hoặc quy ước khác của Zootop", "P0", null],
  [48, "Đơn hàng", "Anh/chị có thể mô tả một ví dụ đơn thật từ đầu đến cuối: seller gửi/tạo đơn, Zootop kiểm tra, tính tiền, đẩy sang xưởng, nhận tracking và xử lý nếu lỗi?", "Cần xác nhận luồng thực tế bằng ví dụ dễ hiểu, không hỏi theo hướng kỹ thuật.", "Chọn 1 đơn gần đây làm ví dụ walkthrough", "P0", null],
];
mainSheet.getRange("A46:G48").values = mainAdditions;
mainSheet.getRange("A46:G48").format = {
  wrapText: true,
  font: { fontSize: 10, typeface: "Arial" },
};
mainSheet.getRange("G46:G48").format.fill = "#D0E0E3";

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan after update",
});
console.log(errorScan.ndjson);

const rendered = await workbook.render({
  sheetName: "QA_order_flow",
  range: "A1:F19",
  scale: 1,
  format: "png",
});
await fs.writeFile("C:/myproject/zootopbear-usecase/doc/QA_order_flow_preview.png", new Uint8Array(await rendered.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
