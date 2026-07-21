# Ghi chú làm tiếp: Confirm luồng seller tạo đơn đến supplier

Ngày ghi chú: 21/07/2026.

Mục tiêu của task này là làm rõ luồng quan trọng nhất của Zootop Bear:

```text
Seller tạo/import đơn
-> Zootop Bear validate dữ liệu
-> tính giá
-> kiểm tra ví/confirm
-> mapping sản phẩm sang supplier/xưởng
-> gửi đơn sang nền tảng fulfillment
-> nhận tracking/status
-> seller theo dõi trên Zootop Bear
```

## 1. Các file đã dùng để phân tích

Trong thư mục:

`tasks/03-confirm-order-to-fulfillment-flow/tài liệu khách gửi/`

Đã có 3 file khách cung cấp:

1. `Bảng fulfill US tổng Tháng 5-6 -7-8 .2026.xlsx`
   - Đây là file công ty đang dùng để vận hành thủ công.
   - Có các sheet order theo nhóm sản phẩm: Home Decor, MUG US, Accessories/Home Living, GILDAN/Apparel.
   - Có sheet `Issue`, `Import lên có vấn đề`, `VARIANT_SUPPLIER_MAP`.

2. `US Factory Catalog.xlsx`
   - Đây là catalog/bảng giá sản phẩm của công ty.
   - Có nhiều category: Catalog tổng, Product List, Home Decor, Apparel US, Accessories, Hat, v.v.
   - Có base cost, shipping fee, add item fee, label fee, template, mockup, production/shipping time.

3. `a4d53032b1f04bfea856466dbbfe7fdd.xlsx`
   - Đây là file tracking/logistics export từ PrintBelle.
   - Có các cột `TrackNo`, `OrderNo`, `OrderId`, `ProductCode`, `SellersItemSku`, `SystemSku`, `Status`, `LogisticsCompany`.

## 2. Những phát hiện chính

### Excel hiện tại chính là quy trình gốc

Không nên hỏi khách như thể đang thiết kế từ số 0. File Excel đã thể hiện cách công ty đang vận hành thật:

```text
Seller gửi đơn
-> nhân viên/Zootop đưa vào Excel
-> Excel lookup giá và supplier
-> nhân viên đẩy đơn sang supplier/xưởng
-> tracking export/copy ngược lại
-> đơn lỗi nằm ở sheet Issue/Import lên có vấn đề
```

### Variant ID/SKU/ProductCode là khóa mapping

Trong file thủ công, các mã như `Variant ID`, `SKU`, `ProductCode`, `SellersItemSku` đang được dùng để:

- lookup giá;
- lookup supplier/xưởng;
- xác định sản phẩm sẽ fulfill ở đâu.

Chưa thể kết luận 100% `Variant ID` luôn là mã của xưởng. Cách hiểu an toàn:

```text
Variant ID = mã khóa hiện tại dùng để lookup giá, supplier/xưởng và rule fulfill
```

### Supplier 415/922

Trong file Excel, cột `Supplier` có giá trị như `415`, `922`, `Printeblle`.

Đã tìm web nhưng chưa thấy bằng chứng `415` hoặc `922` là mã public của nền tảng fulfillment nào.

Kết luận tạm thời:

```text
415 và 922 nhiều khả năng là mã nội bộ của công ty,
hoặc mã account/xưởng do team vận hành tự quy ước.
```

Câu cần hỏi khách:

```text
Trong file Excel, Supplier = 415 và 922 tương ứng với xưởng/nền tảng nào?
Đây là mã nội bộ công ty tự đặt hay mã lấy từ supplier?
```

### Rule tính tiền từ Excel

Rule chính suy ra từ file:

```text
total_order = tổng(base_cost_item * quantity_item)
            + shipping_fee_chính
            + add_item_fee * max(tổng_quantity_order - 1, 0)
            + label_fee nếu là đơn có label
            + phí in thêm nếu category cần tính theo vị trí in
```

Điểm quan trọng:

- Order nhiều dòng được gom theo `Order ID`.
- Shipping/add-item thường chỉ tính một lần trên order.
- Các dòng sau cùng order thường chỉ tính base cost.
- Nếu có `Link Label`, Excel dùng nhánh tính `label fee`.
- GILDAN/Apparel có logic riêng cho back/sleeve/printing side.

### PrintBelle tracking export

File PrintBelle cho thấy:

- `ProductCode` match 30/30 với file công ty và `VARIANT_SUPPLIER_MAP`.
- `SellersItemSku` cũng match 30/30.
- `OrderId` match 17/30 với file công ty.
- `OrderNo` không match file công ty, nhiều khả năng là mã đơn nội bộ của PrintBelle, ví dụ `PBKDP2461`.
- `SystemSku` không match file công ty, nhiều khả năng là SKU nội bộ của PrintBelle, ví dụ `KDP02919`.

Điểm cần lưu trong hệ thống mới:

```text
seller_order_id
zootop_order_id
supplier_order_no
supplier_order_id_or_external_ref
product_code_sent_to_supplier
supplier_system_sku
tracking_no
tracking_carrier
supplier_tracking_status
```

## 3. File đã tạo/cập nhật trong task này

### HTML trực quan

Đã thêm bảng ở dưới:

`seller.html`

Bấm vào sẽ mở:

`seller-manual-flow.html`

Trang này mô tả bằng sơ đồ:

```text
Seller gửi đơn
-> Zootop xử lý thủ công bằng Excel
-> đơn sang nền tảng/xưởng
-> tracking trả về
-> issue/hold/refund nếu lỗi
```

Trong trang có box nhờ khách feedback 4 điểm:

1. Luồng từ seller gửi đơn đến lúc Zootop đưa sang xưởng có đúng thực tế không?
2. Mã supplier `415`, `922` đang tương ứng nền tảng/xưởng nào?
3. `OrderNo/SystemSku` của PrintBelle có cần lưu trong hệ thống mới để đối soát không?
4. Status tracking `notfound`, `InfoReceived` nên hiển thị cho seller thành trạng thái nào?

### Excel câu hỏi confirm

Đã tạo file:

`tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx`

File này đã được chuyển sang tiếng Việt có dấu.

Các sheet trong file:

- `01 Tổng quan luồng`
- `02 Câu hỏi confirm`
- `03 Mapping cần lưu`
- `04 Status tracking`
- `05 Nguồn phân tích`

Sheet quan trọng nhất để hỏi khách là:

```text
02 Câu hỏi confirm
```

Trong đó các câu hỏi P0 nên hỏi trước.

## 4. Câu hỏi ưu tiên ngày mai

Nếu thời gian khách ít, hỏi theo thứ tự này:

1. `415` và `922` là xưởng/nền tảng nào?
2. `Variant ID` trong file là mã nội bộ Zootop hay mã từ supplier?
3. Catalog Zootop là nguồn chuẩn hay sẽ sync từ supplier?
4. Mỗi supplier có API lấy product/variant/price không?
5. Sau khi seller confirm và đủ tiền, đơn tự động gửi supplier hay nội bộ kiểm tra trước?
6. Web có giữ rule Excel: shipping/add-item chỉ tính một lần trên order không?
7. Nếu một order có nhiều variant khác shipping fee, lấy phí ship theo rule nào?
8. PrintBelle có API lấy tracking/logistics hay chỉ export thủ công?
9. `OrderNo` dạng `PBKDP...` có phải mã đơn nội bộ PrintBelle không?
10. Status `notfound`, `InfoReceived` map sang trạng thái nào cho seller?

## 5. Lưu ý bảo mật và dữ liệu

- Các file Excel có nhiều thông tin người nhận: tên, địa chỉ, phone, email, tracking. Không copy dữ liệu này ra nơi public.
- Order ID, phone, zip, tracking number phải lưu dạng text trong hệ thống mới, không lưu dạng number vì Excel đang có dấu hiệu biến thành số khoa học/date.
- Không expose mã supplier nội bộ như `415/922` cho seller.

## 6. Khi mở ở máy khác bằng Codex

Yêu cầu Codex đọc theo thứ tự:

1. `tasks/README.md`
2. `PROJECT_OVERVIEW.md`
3. `tasks/03-confirm-order-to-fulfillment-flow/GHI_CHU_LAM_TIEP.md`
4. `tasks/04-analyze-current-manual-flow/MANUAL_FLOW_ANALYSIS.md`
5. `seller-manual-flow.html`
6. `tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx`

Sau đó mới tiếp tục cập nhật câu hỏi hoặc chỉnh luồng.
