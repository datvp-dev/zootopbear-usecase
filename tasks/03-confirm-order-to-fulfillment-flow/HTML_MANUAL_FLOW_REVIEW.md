# Review HTML luồng seller -> Zootop Bear -> xưởng/nền tảng

## 1. Kết luận nhanh

File HTML hiện tại đã đúng hướng với ý hiểu hiện tại của dự án.

HTML đang mô tả đúng bức tranh:

```text
Seller gửi đơn
-> Zootop Bear xử lý dữ liệu/catalog/giá/mapping
-> Đơn được đưa sang nền tảng/xưởng
-> Tracking/status trả về
-> Issue/Hold/Refund/Ticket được xử lý thành luồng riêng
```

Điểm này khớp với mô hình kinh doanh đã chốt: seller là khách hàng chính, seller thao tác trên Zootop Bear; 5 nền tảng phía sau thực chất là xưởng/fulfillment platform của Zootop Bear.

## 2. Những điểm HTML đang đúng

### 2.1. Đúng về vai trò của seller

`seller.html` đang nói rõ seller chỉ thao tác trên Zootop Bear, hệ thống sẽ tính giá, map dữ liệu và bắn đơn sang nền tảng/xưởng phù hợp.

Điều này đúng với ý hiểu hiện tại.

### 2.2. Đúng về luồng thủ công hiện tại

`seller-manual-flow.html` đã mô tả đúng luồng đang suy ra từ Excel:

1. Seller gửi danh sách đơn.
2. Zootop đưa đơn vào Excel theo nhóm sản phẩm.
3. Excel lookup SKU/Product ID/Variant ID.
4. Excel tính giá.
5. Excel xác định supplier/xưởng.
6. Nhân viên đẩy/upload/nhập đơn sang supplier.
7. Tracking trả về hoặc được export từ supplier.
8. Issue/refund/resend nằm ở sheet riêng.

Đây là cách review đúng vì web mới nên xuất phát từ quy trình Excel đang chạy, không nên hỏi khách như một luồng hoàn toàn mới.

### 2.3. Đúng khi nhấn mạnh mapping SKU/Variant/Supplier

HTML đã nhắc đến:

- `SKU/Variant`.
- `Variant ID -> VARIANT_SUPPLIER_MAP -> Supplier`.
- Supplier code như `415`, `922`.
- PrintBelle `OrderNo`, `SystemSku`.

Đây là các điểm cần confirm sớm vì ảnh hưởng trực tiếp đến thiết kế dữ liệu và API.

### 2.4. Đúng khi tách status thô của xưởng và status seller nhìn thấy

HTML có ý:

```text
Seller không thấy mã 415/922 hay notfound thô; seller thấy trạng thái đã được Zootop map lại.
```

Điểm này rất đúng. Hệ thống nên lưu raw status để nội bộ debug, nhưng seller nên thấy trạng thái dễ hiểu.

### 2.5. Đúng khi coi Issue/Hold/Refund là luồng riêng

HTML đã ghi nhận sheet `Issue` và `Import lên có vấn đề` là tiền thân của Hold/Ticket trong web.

Điểm này quan trọng vì order flow không chỉ là tạo đơn thành công. Luồng lỗi mới là phần cần confirm kỹ.

## 3. Những điểm HTML cần coi là giả định, chưa phải kết luận cuối

### 3.1. `415`, `922` chưa biết chắc là xưởng nào

HTML đang hiển thị `415/922` như supplier code. Cách thể hiện này ổn để hỏi khách, nhưng chưa nên coi là đã hiểu.

Cần hỏi:

```text
415 và 922 là mã nội bộ công ty tự đặt hay là mã lấy từ nền tảng/xưởng?
Mỗi mã tương ứng xưởng/nền tảng nào?
```

### 3.2. `OrderNo`, `SystemSku` của PrintBelle mới là suy luận

Từ file tracking có thể suy ra:

- `OrderNo` dạng `PBKDP...` nhiều khả năng là mã đơn nội bộ PrintBelle.
- `SystemSku` dạng `KDP...` nhiều khả năng là SKU nội bộ PrintBelle.

Nhưng vẫn cần khách hoặc PrintBelle confirm.

### 3.3. Tracking từ PrintBelle/17TRACK chưa chốt nguồn ưu tiên

HTML đang nhắc `17TRACK?`, `notfound`, `InfoReceived`. Cách ghi này hợp lý vì còn cần hỏi.

Cần chốt:

```text
Tracking/status lấy từ supplier là chính, từ 17TRACK là chính, hay dùng cả hai?
Nếu hai bên trả khác nhau thì ưu tiên nguồn nào?
```

### 3.4. Luồng tự động hay bán tự động chưa chốt

HTML hiện mô tả luồng thủ công hiện tại và mục tiêu web, nhưng chưa chốt:

```text
Seller đủ tiền thì tự động gửi xưởng luôn, hay vận hành kiểm tra rồi mới gửi?
```

Đây là câu hỏi lớn nhất cần hỏi khách.

### 3.5. Công thức giá trong HTML đang là bản suy ra từ Excel

HTML ghi rule tổng quát:

```text
total = base cost * quantity + shipping fee + add item fee * (total quantity - 1)
```

Điều này đúng với nhiều sheet, nhưng cần hỏi kỹ cho:

- Đơn có label/TikTok.
- Order nhiều sản phẩm khác shipping fee.
- Apparel/Gildan có nhiều vị trí in.
- Trường hợp nhiều category trong cùng một order.

## 4. Đề xuất sau khi khách trả lời

Sau khi khách trả lời bộ câu hỏi chi tiết, nên quay lại HTML để cập nhật:

1. Ghi rõ luồng cuối là tự động hay cần vận hành duyệt.
2. Ghi rõ ý nghĩa `415`, `922`.
3. Ghi rõ status seller nhìn thấy.
4. Ghi rõ status nội bộ.
5. Ghi rõ tracking lấy từ đâu.
6. Ghi rõ cách xử lý import lỗi.
7. Ghi rõ rule tính giá đơn nhiều sản phẩm.
8. Ghi rõ Issue/Hold/Ticket/Refund/Resend đi qua role nào.

## 5. Kết luận

HTML hiện tại phù hợp để đưa khách review như một bản mô tả luồng đang hiểu.

Tuy nhiên, không nên coi đây là đặc tả cuối. Nó nên được dùng như màn hình “confirm lại luồng thực tế”, rồi sau buổi hỏi khách mới cập nhật thành đặc tả chính thức.

