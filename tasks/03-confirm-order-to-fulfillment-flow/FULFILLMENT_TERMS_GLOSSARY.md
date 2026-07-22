# Glossary: thuật ngữ fulfillment/order flow

Tài liệu này giải thích các thuật ngữ đang xuất hiện trong file khách gửi và trong các nền tảng fulfillment/xưởng. Mục tiêu là giúp người họp với khách hiểu đúng ngôn ngữ trước khi hỏi confirm rule.

## 1. Bức tranh tổng quát

Trong dự án Zootop Bear có 3 lớp mã/dữ liệu dễ bị nhầm:

1. **Mã của seller/Zootop Bear**: mã đơn, SKU, variant mà seller hoặc hệ thống Zootop dùng để nhập đơn, tính giá và đối soát.
2. **Mã mapping nội bộ**: mã dùng để biết sản phẩm đó phải gửi sang xưởng/nền tảng nào, ví dụ `Variant ID -> Supplier`.
3. **Mã của supplier/nền tảng**: mã đơn, SKU, product code, system SKU do FlashShip, PrintBelle, ART ADD, SimplePrint, Snap Ecom tạo hoặc yêu cầu.

Khi build hệ thống, không nên gom tất cả vào một field `sku`. Nên tách rõ:

```text
zootop_order_id
seller_order_id
zootop_product_id
zootop_variant_id
zootop_sku
supplier_code
supplier_name
supplier_product_id
supplier_variant_id
supplier_sku
supplier_order_no
supplier_order_id
tracking_no
```

## 2. SKU là gì?

**SKU** là mã định danh một sản phẩm hoặc một biến thể sản phẩm để bán/vận hành.

Ví dụ dễ hiểu:

- Áo Gildan 5000 màu White size S có một SKU.
- Áo Gildan 5000 màu Black size M có một SKU khác.
- Mug 11oz và mug 15oz thường là hai SKU khác nhau.

Trong file khách, `SKU` có thể đang được dùng như:

- mã sản phẩm seller nhập;
- mã sản phẩm Zootop dùng trong catalog;
- mã dùng để lookup giá;
- mã gửi sang supplier;
- hoặc mã supplier trả về.

Vì vậy câu cần hỏi khách:

```text
SKU trong file hiện tại là mã nội bộ Zootop đang dùng, hay mã lấy từ từng nền tảng/xưởng?
```

## 3. Variant / Variant ID là gì?

**Variant** là biến thể cụ thể của một sản phẩm.

Một sản phẩm cha có nhiều variant:

```text
Product: T-shirt
Variant 1: White / S
Variant 2: White / M
Variant 3: Black / S
```

**Variant ID** là mã định danh của biến thể đó.

Trong file Excel hiện tại, `Variant ID` đang rất quan trọng vì được dùng để:

- lookup giá;
- lookup supplier/xưởng;
- xác định rule fulfill;
- map sang bảng `VARIANT_SUPPLIER_MAP`.

Nhưng chưa thể kết luận chắc `Variant ID` là mã của Zootop hay mã của xưởng. Cách hiểu an toàn hiện tại:

```text
Variant ID = mã khóa đang dùng để lookup giá, supplier/xưởng và rule fulfill.
```

Câu hỏi nên hỏi khách:

```text
Variant ID trong file là mã nội bộ công ty tự đặt, hay mã lấy từ supplier/nền tảng?
Nếu lấy từ supplier thì mỗi nền tảng có Variant ID riêng không?
```

## 4. Product ID / ProductCode là gì?

**Product ID** thường là mã định danh sản phẩm.

**ProductCode** trong file export PrintBelle có vẻ là mã sản phẩm/variant mà Zootop hoặc seller gửi sang PrintBelle.

Từ phân tích file PrintBelle:

- `ProductCode` match 30/30 với file công ty và `VARIANT_SUPPLIER_MAP`.
- `SellersItemSku` cũng match 30/30.
- Vì vậy `ProductCode`/`SellersItemSku` là cầu nối mạnh giữa file vận hành Zootop và file export PrintBelle.

Cách hiểu:

```text
ProductCode = mã sản phẩm/variant mà phía mình gửi sang PrintBelle hoặc PrintBelle dùng để nhận diện item seller.
```

Câu hỏi nên hỏi khách/PrintBelle:

```text
ProductCode trong file PrintBelle có phải chính là mã sản phẩm Zootop gửi sang khi tạo đơn không?
```

## 5. SellersItemSku là gì?

`SellersItemSku` nghĩa là **SKU item của seller**.

Trong ngữ cảnh PrintBelle, đây thường là mã SKU do seller hoặc hệ thống của seller cung cấp khi tạo đơn.

Trong file export PrintBelle khách gửi:

```text
SellersItemSku match 30/30 với ProductCode
```

Tạm hiểu:

```text
SellersItemSku = SKU phía Zootop/seller gửi sang PrintBelle.
```

Nó khác với `SystemSku`.

Ví dụ:

```text
SellersItemSku: HNMDUSA/50X80CM
SystemSku: KDP02919
```

Ý nghĩa với hệ thống mới:

- Lưu `SellersItemSku` để biết mình đã gửi mã gì sang supplier.
- Không dùng nó thay thế hoàn toàn cho SKU nội bộ nếu sau này Zootop có catalog chuẩn riêng.

## 6. SystemSku là gì?

`SystemSku` là SKU nội bộ của hệ thống supplier, cụ thể trong file này là PrintBelle.

Từ file PrintBelle:

- `SystemSku` không match với file công ty.
- Ví dụ dạng `KDP02919`.
- Nhiều khả năng đây là mã sản phẩm nội bộ PrintBelle dùng trong kho/hệ thống của họ.

Cách hiểu:

```text
SystemSku = mã SKU nội bộ của PrintBelle, khác với SKU/ProductCode mà Zootop gửi sang.
```

Ý nghĩa:

- Cần lưu để debug/đối soát với PrintBelle.
- Không nên hiển thị cho seller nếu không cần.
- Không nên coi `SystemSku` là SKU bán hàng của Zootop.

Câu hỏi nên hỏi khách:

```text
SystemSku của PrintBelle có cần lưu để đối soát/debug không?
Khi làm việc với PrintBelle support, họ thường hỏi OrderNo, OrderId, ProductCode hay SystemSku?
```

## 7. Supplier SKU / supplier_sku là gì?

`supplier_sku` là mã SKU mà supplier/nền tảng yêu cầu để biết cần sản xuất sản phẩm nào.

Trong API ART ADD, `supplier_sku` là field bắt buộc trong `products` và doc mô tả là **System product sku**.

Cách hiểu trong ART ADD:

```text
product_sku = SKU phía mình/seller định nghĩa
supplier_sku = SKU hệ thống của ART ADD
```

Mapping có thể là:

```text
Zootop SKU/Variant ID -> ART ADD supplier_sku
```

Câu hỏi cần hỏi ART ADD:

```text
supplier_sku lấy ở đâu trên ART ADD?
Có API lấy danh sách product/supplier_sku không, hay phải lấy từ portal/file catalog?
```

## 8. Order ID, OrderId, OrderNo khác nhau thế nào?

### Order ID

Tên chung chỉ mã đơn hàng. Nhưng mỗi bên có thể gọi khác nhau.

### OrderId trong PrintBelle

Trong file PrintBelle, `OrderId` có vẻ là mã order mà seller/Zootop gửi sang supplier.

Từ phân tích:

- `OrderId` match một phần với file công ty.
- Có thể đây là external order id từ phía Zootop/seller.

### OrderNo trong PrintBelle

`OrderNo` dạng `PBKDP...` nhiều khả năng là mã đơn nội bộ PrintBelle.

Từ phân tích:

- `OrderNo` không match file công ty.
- Nên lưu riêng như `supplier_order_no`.

Cách lưu nên có:

```text
seller_order_id        = mã seller nhập/gửi
zootop_order_id        = mã đơn nội bộ Zootop
supplier_order_id      = mã external/order id supplier nhận từ Zootop, ví dụ PrintBelle OrderId
supplier_order_no      = mã đơn nội bộ supplier tự sinh, ví dụ PBKDP...
```

Câu hỏi nên hỏi khách:

```text
Trong vận hành hiện tại, khi tra đơn với PrintBelle support, team dùng Order ID nào: mã của mình hay OrderNo dạng PBKDP?
```

## 9. TrackNo / Tracking number / Tracking là gì?

**Tracking number** là mã vận đơn để theo dõi kiện hàng sau khi supplier/xưởng đã ship.

Trong file PrintBelle, `TrackNo` là mã tracking thực tế.

Ví dụ tracking có thể có nhiều dạng:

```text
420...
921449...
923599...
TBA...
GFUS...
```

Quan trọng:

- Tracking number phải lưu dạng text, không lưu dạng number.
- Excel dễ làm hỏng tracking nếu tự convert sang số khoa học.

### Tracking status là gì?

Là trạng thái vận chuyển của tracking, ví dụ:

- chờ hãng vận chuyển nhận thông tin;
- đang vận chuyển;
- đã giao;
- không tìm thấy tracking;
- lỗi/chậm cập nhật.

Trong PrintBelle export thấy status:

```text
notfound
InfoReceived
```

Nên map lại cho seller dễ hiểu:

```text
notfound      -> Đang chờ cập nhật tracking / Chưa tìm thấy tracking
InfoReceived  -> Đã nhận thông tin vận đơn
```

## 10. Carrier / LogisticsCompany là gì?

**Carrier** hoặc `LogisticsCompany` là đơn vị vận chuyển.

Trong file PrintBelle có:

```text
USPS
Amazon Shipping
GOFO
```

Carrier dùng để:

- hiển thị cho seller;
- tạo tracking link đúng;
- gửi tracking qua 17TRACK;
- đối soát lỗi giao hàng.

Cần lưu riêng:

```text
tracking_no
tracking_carrier
tracking_link
tracking_status
tracking_events
```

## 11. Status là gì?

**Status** là trạng thái. Nhưng cần phân biệt nhiều lớp status:

### Order status nội bộ Zootop

Ví dụ:

```text
Imported
Pending
Confirm
In Production
Hold
Shipped
In transit
Delivery
Cancel
Refund
```

### Supplier order status

Trạng thái supplier trả về. Mỗi nền tảng có thể khác nhau.

Ví dụ PrintBelle tracking export có `notfound`, `InfoReceived`, nhưng đây giống tracking status hơn là order production status.

### Payment status

Trạng thái tiền:

```text
Unpaid
Paid
Pending payment
Refunded
Partially refunded
```

### Ticket status

Trạng thái xử lý hỗ trợ:

```text
Open
Waiting supplier
Waiting seller
Resolved
Closed
```

Đi họp nên hỏi:

```text
Seller cần nhìn thấy status đơn nào?
Nội bộ cần lưu thêm status nào để xử lý lỗi/ticket/refund?
Status từ từng xưởng sẽ map sang status Zootop thế nào?
```

## 12. Link Label / Label fee / Ship by TikTok là gì?

**Shipping label** là nhãn vận chuyển, thường gồm mã vận đơn/barcode và thông tin giao hàng.

Trong file khách có `Link Label`. Khi có link label, Excel đang dùng nhánh tính `label fee`.

Rule suy ra từ Excel Home Decor:

```text
Nếu có Link Label:
  dòng đầu order = base_cost * quantity + label_fee
  dòng sau cùng order = base_cost * quantity

Nếu không có Link Label:
  dòng đầu order = base_cost * quantity + shipping_fee + add_item_fee * (tổng quantity - 1)
  dòng sau cùng order = base_cost * quantity
```

Cách hiểu:

- Nếu seller/marketplace đã có label, Zootop/xưởng chỉ sản xuất và dùng label đó.
- Nếu không có label, xưởng/supplier có thể mua/lo shipping và tính shipping fee.

Câu hỏi cần hỏi:

```text
Đơn có Link Label có luôn luôn không tính shipping fee mà chỉ tính label fee không?
Có trường hợp nào vừa có label fee vừa có shipping fee không?
```

## 13. Design / Mockup / Print file / Artwork là gì?

### Design / Artwork / Print file

File in thật để xưởng sản xuất. Ví dụ ảnh mặt trước áo, ảnh in lên mug, canvas, pillow.

Trong ART ADD API, field tương ứng có thể là:

```text
products.prints[]
```

### Mockup

Ảnh mô phỏng sản phẩm sau khi in. Dùng để xem trước, kiểm tra, hoặc gửi cho xưởng làm reference.

Trong ART ADD API, field tương ứng có thể là:

```text
products.images[]
```

### Product Note

Ghi chú cho item/order, ví dụ yêu cầu đặc biệt, lưu ý placement, lỗi cần sửa.

Câu hỏi cần hỏi:

```text
Link design/mockup seller gửi có cần hệ thống kiểm tra mở được trước khi confirm không?
Các xưởng có chấp nhận Google Drive link không, hay bắt buộc link ảnh public trực tiếp .jpg/.png?
```

## 14. Fulfillment là gì?

**Fulfillment** là quá trình xử lý đơn sau khi có order:

```text
nhận đơn -> sản xuất/in -> đóng gói -> giao cho hãng vận chuyển -> trả tracking
```

Trong dự án này, 5 nền tảng FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom chính là các fulfillment platform/xưởng phía sau Zootop Bear.

Seller không cần thao tác trực tiếp trên các nền tảng đó. Zootop Bear sẽ:

```text
nhận đơn seller -> tính tiền -> gửi order sang platform -> nhận status/tracking về
```

## 15. Supplier / xưởng / platform là gì?

Trong dự án này:

- **Supplier** = bên nhận sản xuất/fulfill đơn.
- **Xưởng** = cách gọi nghiệp vụ của supplier.
- **Platform** = hệ thống web/API của supplier.

Ví dụ:

```text
PrintBelle là platform/supplier/xưởng.
ART ADD là platform/supplier/xưởng.
```

File Excel có supplier code như:

```text
415
922
Printeblle
```

Chưa rõ `415`, `922` là mã nội bộ hay mã supplier. Cần hỏi khách.

## 16. Webhook / Callback / API polling là gì?

### Webhook / Callback

Supplier chủ động gọi về URL của Zootop khi có thay đổi.

Ví dụ:

```text
ART ADD order shipped -> ART ADD gọi webhook của Zootop -> Zootop cập nhật order thành Shipped
```

### API polling

Zootop chủ động gọi API supplier định kỳ để hỏi trạng thái.

Ví dụ:

```text
Cứ 30 phút Zootop gọi API PrintBelle để lấy tracking/status mới.
```

Webhook tốt hơn cho realtime, polling hữu ích khi supplier không có webhook hoặc webhook không ổn định.

Đi họp nên hỏi từng nền tảng:

```text
Bên bạn có webhook/callback không?
Nếu không có webhook, có API để Zootop định kỳ lấy status/tracking không?
```

## 17. API create order là gì?

API tạo đơn là endpoint để Zootop gửi đơn sang supplier.

Ví dụ ART ADD:

```text
POST /api/order/create
```

Nội dung gửi thường gồm:

- mã đơn;
- thông tin người nhận;
- shipping method;
- item SKU/variant;
- quantity;
- link design/print file;
- mockup;
- note.

## 18. API get order / get info là gì?

API lấy thông tin đơn dùng để hỏi lại supplier:

```text
Đơn này đang ở trạng thái nào?
Đã có tracking chưa?
Supplier tạo mã đơn nội bộ nào?
Có lỗi gì không?
```

Ví dụ ART ADD demo có:

```text
GET /api/order/getinfo/{order_id}
```

## 19. Sandbox / test store là gì?

**Sandbox** là môi trường test không ảnh hưởng tiền và đơn thật.

Nếu không có sandbox, có thể dùng **test store**:

- tạo store riêng cho API;
- tạo đơn API vào store này;
- đơn ở trạng thái unpaid;
- không thanh toán thì không bị trừ tiền.

ART ADD support đã nói hướng này: tạo store riêng, đơn API sẽ unpaid nếu không proceed payment.

## 20. Ticket / Issue / Hold khác nhau thế nào?

### Hold

Đơn bị giữ lại vì có vấn đề, chưa thể xử lý tiếp.

Ví dụ:

- thiếu design;
- sai variant;
- link không mở được;
- supplier API lỗi;
- địa chỉ không hợp lệ.

### Issue

Vấn đề phát sinh trong quá trình fulfill hoặc sau khi giao.

Ví dụ:

- in lỗi;
- sai size;
- mất hàng;
- cần resend;
- cần refund.

### Ticket

Yêu cầu hỗ trợ có luồng trao đổi giữa seller, CSKH/vận hành và xưởng.

Khách muốn ticket giống Simple Hub:

```text
Seller tạo ticket trên Zootop -> ticket/issue được gửi sang xưởng tương ứng qua API nếu có.
```

## 21. Resend / Refund / Cancel

### Cancel

Hủy đơn trước hoặc trong một giai đoạn cho phép.

Khách đã trả lời:

```text
Seller tự hủy trong 30 phút sau khi lên đơn.
Sau 30 phút phải liên hệ support.
```

### Refund

Hoàn tiền về ví seller.

Cần xác định:

- refund tự động hay cần Admin/Kế toán duyệt;
- refund full order hay từng item;
- khi supplier fail thì xử lý thế nào.

### Resend

Gửi lại/sản xuất lại đơn do lỗi sản xuất, mất hàng, sai hàng.

Trong Excel hiện có sheet `Issue` với các trường hợp resend/refund.

## 22. Add item fee / Shipping fee / Base cost

### Base cost

Giá sản xuất cơ bản của sản phẩm.

### Shipping fee

Phí ship chính của order hoặc item đầu tiên.

### Add item fee

Phí thêm cho item thứ 2 trở đi trong cùng một order.

Rule Excel đang suy ra:

```text
shipping/add-item tính ở cấp order, không tính lặp trên mọi dòng.
```

Ví dụ:

```text
Order có 3 sản phẩm, tổng quantity 3
Total = base cost từng item
      + shipping fee chính
      + add item fee * (3 - 1)
```

Điểm cần hỏi:

```text
Nếu order có nhiều variant với shipping fee khác nhau, lấy shipping fee của dòng đầu, phí cao nhất, hay rule khác?
```

## 23. Production time / Shipping time / Transit time

### Production time

Thời gian xưởng sản xuất/in.

### Shipping time

Thời gian giao hàng dự kiến.

### Transit time

Số ngày hàng đang đi trong vận chuyển, thường lấy từ tracking/logistics.

Trong file PrintBelle có `TransitTime`, `StayTime`, `OrderDate`, `PaidDate`, `ShippedDate`, `DeliveredDate`.

## 24. notfound / InfoReceived

Đây là tracking status thấy trong file PrintBelle.

### notfound

Tracking chưa tìm thấy trên hệ thống vận chuyển. Có thể do:

- tracking mới tạo;
- carrier chưa nhận gói;
- tracking number sai;
- hệ thống carrier chưa cập nhật.

Không nên hiển thị thẳng `notfound` cho seller nếu không giải thích.

### InfoReceived

Carrier/logistics đã nhận thông tin vận đơn, nhưng chưa chắc hàng đã di chuyển.

Nên hiển thị:

```text
Đã nhận thông tin vận đơn
```

## 25. Thuật ngữ theo từng nền tảng

### FlashShip

Tài liệu public của FlashShip cho thấy họ có:

- API seller;
- test environment và production environment;
- create order;
- webhook;
- API lấy variant SKU list;
- order status liên quan cancel/refund.

Thuật ngữ cần chú ý:

- `order_id`: mã đơn từ hệ thống khách hàng/Zootop.
- `variant_sku`: mã variant dùng để tạo order.
- `webhook`: callback status/order update.
- `REQUEST_CANCEL`, `CANCELED`, `REQUEST_REFUND`, `REFUNDED`: status hủy/refund.

### PrintBelle

Public FAQ của PrintBelle nói có 3 cách fulfill:

- CSV;
- API;
- OrderDesk.

Từ file export khách gửi, thuật ngữ quan trọng:

- `OrderNo`: mã đơn nội bộ PrintBelle.
- `OrderId`: mã order phía Zootop/seller gửi sang.
- `ProductCode`: mã product/variant.
- `SellersItemSku`: SKU phía seller/Zootop.
- `SystemSku`: SKU nội bộ PrintBelle.
- `TrackNo`: tracking number.
- `LogisticsCompany`: carrier.
- `Status`: tracking/logistics status.

### ART ADD

Từ demo ART ADD:

- `AppKey`, `AppSecret`, `StoreID`: thông tin xác thực API.
- `Sign`: chữ ký request.
- `order`: thông tin đơn/người nhận.
- `items`: các item trong đơn.
- `products`: thông tin sản phẩm/design.
- `product_sku`: SKU phía Zootop/seller.
- `supplier_sku`: SKU hệ thống ART ADD.
- `prints[]`: file in/design.
- `images[]`: mockup/effect images.

### SimplePrint

Nguồn public mô tả SimplePrint là POD fulfillment: seller kết nối store, chọn catalog, upload design, order được route sang SimplePrint để in, QC, pack, ship.

Hiện chưa có API docs SimplePrint cụ thể trong repo. Khi làm việc với họ, cần hỏi các thuật ngữ tương đương:

- order id/external order id;
- product/variant id;
- seller SKU;
- system/internal SKU;
- print file;
- mockup;
- status/tracking;
- ticket/support API.

### Snap Ecom

Hiện chưa thấy API docs Snap Ecom trong repo và chưa có nguồn public đáng tin để kết luận thuật ngữ cụ thể.

Khi hỏi Snap Ecom, nên hỏi theo bộ thuật ngữ chuẩn:

- API create order dùng field nào cho order id?
- SKU/variant/product code họ yêu cầu là gì?
- Có mã system SKU riêng không?
- Có webhook status/tracking không?
- Tracking payload gồm tracking number, carrier, status, event không?
- Có API ticket/issue/cancel/refund không?

## 26. Câu hỏi nên mang đi họp

1. `Variant ID`, `SKU`, `Product ID` trong file hiện tại là mã nội bộ Zootop hay mã từ supplier?
2. `Supplier = 415`, `922`, `Printeblle` tương ứng nền tảng/xưởng nào?
3. Có bảng mapping chuẩn nào ngoài `VARIANT_SUPPLIER_MAP` không?
4. Seller sau này có cần thấy các mã supplier như `SystemSku`, `supplier_sku`, `OrderNo` không, hay chỉ nội bộ xem?
5. Khi gửi đơn sang xưởng, Zootop gửi mã nào: `SKU`, `Variant ID`, `ProductCode`, hay mã riêng của từng xưởng?
6. Với PrintBelle, `OrderNo` dạng `PBKDP...` có phải mã đơn nội bộ PrintBelle không?
7. Với PrintBelle, `SystemSku` có cần lưu để đối soát/support không?
8. Tracking lấy từ supplier, 17TRACK, hay cả hai?
9. Nếu supplier status và 17TRACK status khác nhau thì ưu tiên nguồn nào?
10. `notfound`, `InfoReceived` nên hiển thị cho seller như thế nào?
11. Đơn có link label thì có luôn tính theo label fee thay shipping fee không?
12. Ticket/issue gửi sang xưởng cần gửi những thông tin nào: order id, item, design mới, note, ảnh bằng chứng?

