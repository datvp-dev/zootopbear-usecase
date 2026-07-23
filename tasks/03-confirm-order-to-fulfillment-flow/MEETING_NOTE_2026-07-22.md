# Note họp khách hàng ngày 22/07/2026 - Luồng seller order -> Zootop Bear -> xưởng/nền tảng

Mục tiêu file này: ghi lại toàn bộ ý khách đã confirm trong buổi họp để ngày mai tiếp tục xử lý task 03.

## 1. Luồng order hiện tại khách mô tả

Luồng thực tế đang hiểu lại sau họp:

```text
Seller điền order_id
-> seller điền thông tin sản phẩm
-> seller điền đơn vào file Excel riêng của seller
-> Zootop Bear lấy đơn từ file Excel riêng của seller
-> đưa/copy/import sang file đơn tổng nội bộ
-> kế toán/vận hành xác nhận đơn
-> kế toán/vận hành gửi đơn sang các nền tảng/xưởng
-> nền tảng/xưởng xử lý đơn và sinh tracking
-> Zootop/seller check trạng thái giao hàng dựa trên tracking
```

Điểm quan trọng:

- Seller không tự gửi trực tiếp sang xưởng.
- Hiện tại mỗi seller sẽ có một file Excel riêng để điền đơn.
- Sau đó Zootop Bear mới lấy đơn từ file seller và đưa sang file đơn tổng nội bộ.
- File đơn tổng là nơi vận hành/kế toán dùng để xử lý, xác nhận và chuẩn bị gửi đơn sang xưởng.
- Phải có bước xác nhận đơn thì đơn mới được bắn/đưa sang vận hành xử lý.
- Kế toán/vận hành là người gửi đơn sang các nền tảng/xưởng.
- Từ nền tảng/xưởng sẽ có mã tracking.
- Bình thường team check trạng thái đơn dựa vào tracking trên các trang carrier như USPS hoặc qua tracking service.
- Thực tế các nền tảng/xưởng cũng đã có trạng thái đơn riêng, không chỉ có tracking carrier.

Ý nghĩa với hệ thống web mới:

```text
File Excel riêng của seller
-> nên được thay bằng màn import/tạo đơn theo seller trên Zootop Bear
-> hệ thống tự gom về danh sách đơn tổng nội bộ
-> vận hành/kế toán xử lý trên dashboard thay cho file đơn tổng
```

Cần lưu ý khi thiết kế import:

- Mỗi seller có thể đang quen một file/template riêng.
- Cần xác định phase 1 bắt buộc seller dùng template chuẩn của Zootop hay hệ thống hỗ trợ mapping từ file riêng của từng seller.
- Cần có khái niệm batch/import file theo seller để đối chiếu lại nếu đơn bị lỗi.

## 2. SKU, Variant ID và supplier code

Khách confirm:

- SKU và Variant ID đang được hiểu là tương đương nhau trong vận hành hiện tại.
- `415` là Snap.
- `922` là Flash POD.

Ghi chú cho hệ thống mới:

- Dù hiện tại SKU và Variant ID tương đương nhau, khi thiết kế database vẫn nên tách field để sau này dễ mở rộng:

```text
zootop_sku
zootop_variant_id
supplier_code
supplier_sku
supplier_variant_id
```

- Sau này sẽ có một file mapping variant của Zootop Bear với các xưởng.
- File mapping này sẽ là nguồn quan trọng để biết sản phẩm/variant của Zootop tương ứng mã nào ở từng xưởng.

## 3. Supplier/xưởng trong phase hiện tại

Khách note:

- Làm 4 nhà cung cấp kia thôi.
- Cần xác định lại danh sách 4 nhà cung cấp được ưu tiên trong phase này, vì trước đó tài liệu đang nhắc 5 nền tảng:

```text
FlashShip / Flash POD
SimplePrint
PrintBelle
ART ADD
Snap Ecom / Snap
```

Điểm cần hỏi lại:

```text
Phase này bỏ nhà cung cấp nào trong 5 bên trên?
Tên chuẩn khách muốn dùng là FlashShip hay Flash POD?
Tên chuẩn khách muốn dùng là Snap hay Snap Ecom?
```

## 4. Giá và quyền xem giá

Khách confirm:

- Hệ thống cần lấy thông tin tiền/chi phí từ xưởng về cho Admin và kế toán xem.
- Seller chỉ được xem giá từ hệ thống Zootop Bear.
- Seller không xem giá vốn/giá xưởng.

Gợi ý thiết kế:

```text
seller_price        = giá Zootop Bear tính cho seller
supplier_cost       = giá/cost lấy từ xưởng
margin              = seller_price - supplier_cost
visible_to_seller   = chỉ seller_price
visible_to_admin    = seller_price + supplier_cost + margin
visible_to_account  = seller_price + supplier_cost + margin
```

## 4.1. Catalog và template Excel theo từng loại sản phẩm

Khách bổ sung:

- Hiện tại catalog của Zootop Bear lấy hoàn toàn từ các nền tảng/xưởng.
- Phase hiện tại chưa cần xử lý sản phẩm Zootop Bear tự tạo/tự sản xuất riêng.
- Sau này có thể tạo catalog/sản phẩm riêng của Zootop Bear thì tính sau.
- Về catalog, sau này sẽ cần có template Excel cho từng loại sản phẩm.
- Mỗi nhóm sản phẩm có thể có template riêng để seller điền/import đơn.

Ý nghĩa với hệ thống:

- Catalog phase hiện tại nên xem là dữ liệu lấy từ supplier/platform rồi chuẩn hóa lại cho Zootop Bear.
- Catalog không chỉ là nơi seller xem sản phẩm/giá.
- Catalog còn cần gắn với file template/import template tương ứng cho từng loại sản phẩm.
- Template Excel có thể khác nhau theo category vì mỗi loại sản phẩm cần thông tin khác nhau.
- Chưa cần thiết kế sâu luồng Zootop tự tạo sản phẩm riêng trong phase này, nhưng database nên chừa khả năng mở rộng sau.

Ví dụ:

| Nhóm sản phẩm | Template có thể cần |
| --- | --- |
| Home Decor | Order ID, người nhận, Variant/SKU, quantity, design, mockup, label nếu có |
| Mug | Order ID, người nhận, Product ID/SKU, quantity, design/mockup |
| Apparel/Gildan | Order ID, người nhận, SKU/variant, size, color, design front/back/sleeve, mockup |
| Accessories/Home Living | Order ID, người nhận, Variant/SKU, quantity, design/mockup, note |

Gợi ý thiết kế:

```text
Supplier/platform catalog
-> Zootop Bear chuẩn hóa catalog
-> Catalog category
-> danh sách sản phẩm/variant seller nhìn thấy
-> rule tính giá
-> supplier mapping
-> template Excel/import template tương ứng
```

Cần làm rõ tiếp:

1. Mỗi loại sản phẩm dùng một template riêng hay gom theo nhóm category lớn?
2. Template Excel do Zootop tự thiết kế chuẩn lại hay lấy từ template Excel hiện tại?
3. Seller bắt buộc tải template từ hệ thống rồi upload lại, hay có thể dùng file riêng?
4. Template có cần tự động sinh cột theo sản phẩm/category không?
5. Khi catalog thay đổi, template có cần cập nhật version không?
6. Mỗi nền tảng/xưởng có API lấy catalog/product/variant không, hay vận hành import catalog bằng file?

## 5. Ticket, đơn lỗi và fallback khi chưa có ticket

Khách confirm:

- Đơn hàng bị lỗi sẽ xử lý bằng tay.
- Chức năng ticket dùng cho đơn lỗi, ví dụ seller muốn đổi design.
- Ticket xử lý bằng tay.
- Nếu chưa có chức năng ticket, đơn lỗi sẽ được bắn lên một group để vận hành xử lý.
- Nếu có chức năng ticket/API thì hệ thống sẽ gọi API/đưa ticket vào luồng xử lý.

Ý hiểu cần đưa vào use case:

```text
Đơn lỗi
-> nếu có module ticket: tạo ticket và xử lý trong hệ thống
-> nếu chưa có module ticket: gửi cảnh báo lên group nội bộ
-> vận hành xử lý thủ công
-> cập nhật lại kết quả cho order/seller
```

Các lỗi cần map vào ticket/hold:

- Đổi design.
- Link design lỗi.
- SKU/variant không mapping được.
- Đơn không gửi được sang xưởng.
- Xưởng trả lỗi.
- Tracking/status bất thường.

## 6. Trạng thái đơn và mapping status

Khách note:

- Cần định nghĩa trạng thái đơn và map với trạng thái từ các nền tảng.
- Nền tảng/xưởng có trạng thái đơn riêng.
- Tracking carrier cũng có trạng thái riêng.

Việc cần làm tiếp:

1. Lập danh sách trạng thái seller nhìn thấy.
2. Lập danh sách trạng thái nội bộ Zootop.
3. Lập danh sách trạng thái từng nền tảng/xưởng trả về.
4. Mapping trạng thái xưởng về trạng thái Zootop.
5. Mapping trạng thái tracking về trạng thái seller dễ hiểu.

Gợi ý bảng mapping:

| Nguồn | Raw status | Status nội bộ Zootop | Status seller thấy | Ghi chú |
| --- | --- | --- | --- | --- |
| Supplier | Created/Received | Sent to factory | Đã gửi xưởng | Cần lấy raw status từng xưởng |
| Supplier | In Production | In Production | Đang sản xuất | Cần xác nhận từng nền tảng |
| Supplier | Shipped | Shipped | Đã có mã vận đơn | Khi có tracking |
| 17TRACK | NotFound | Tracking pending | Đang chờ cập nhật tracking | Không nên hiện raw `notfound` |
| 17TRACK | InfoReceived | Tracking info received | Hãng vận chuyển đã nhận thông tin | Chưa chắc hàng đã di chuyển |
| 17TRACK | InTransit | In transit | Đang vận chuyển | Tracking carrier |
| 17TRACK | Delivered | Delivered | Đã giao | Tracking carrier |
| 17TRACK | Exception | Delivery exception | Cần hỗ trợ | Cần vận hành kiểm tra |

## 7. Email thông báo cho seller

Khách confirm:

- Có gửi mail thông báo cho seller.

Cần làm rõ tiếp:

- Gửi email ở những mốc nào?
  - Đơn được xác nhận.
  - Đơn bị pending vì chưa thanh toán.
  - Đơn đã gửi xưởng.
  - Đơn bị lỗi/cần hỗ trợ.
  - Có tracking.
  - Đơn đã giao.
  - Refund/resend/ticket update.
- Email dùng template riêng của Zootop hay chỉ thông báo đơn giản?
- Có cần bật/tắt email theo từng seller không?

## 8. 17TRACK - giá và khả năng làm chức năng check tracking trong hệ thống

Khách yêu cầu:

```text
Check lại 17TRACK xem mua mất bao nhiêu tiền để làm chức năng check theo tracking trên hệ thống mình luôn.
```

Thông tin tra cứu nhanh ngày 22/07/2026:

- Trang pricing công khai của 17TRACK có các gói order tracking dạng SaaS:
  - Free: 0 USD/tháng, 50 shipments/tháng.
  - Basic: 9 USD/tháng khi billed yearly, 200 shipments.
  - Pro: 29 USD/tháng khi billed yearly, 500 shipments.
  - Premium: 89 USD/tháng khi billed yearly, 1000 shipments.
  - Custom: cần liên hệ.
- Với Tracking API, tài liệu 17TRACK nói billing theo quota:
  - đăng ký 1 tracking number thành công = trừ 1 quota;
  - theo dõi tự động sau khi đã đăng ký không trừ quota lặp lại;
  - quota mua theo plan và có hạn 12 tháng;
  - API có webhook để đẩy tracking update về hệ thống;
  - tài liệu API ghi từ ngày 07/01/2026, tài khoản mới được cấp một lần 200 order numbers miễn phí thay vì cấp 100 miễn phí hàng tháng như trước.
- API docs cũng ghi:
  - giới hạn request thông thường 3 req/s;
  - tracking tự động kiểm tra mỗi 6-12 giờ tùy trạng thái;
  - delivered/exception kiểm tra mỗi 24 giờ;
  - standard carrier: mỗi tracking number tính là một shipment/quota;
  - real-time tracking có thể trừ quota riêng: Standard mode 1 quota/request, Instant mode 10 quotas/request.

Nguồn:

- 17TRACK Pricing: https://www.17track.com/en/pricing
- 17TRACK API Plan Details: https://help.17track.net/hc/en-us/articles/37575217580825-Plan-Details
- 17TRACK API Docs: https://api.17track.net/en/doc

Nhận xét:

- Với nhu cầu hiện tại của Zootop Bear, nên dùng 17TRACK API/webhook để check tracking trong hệ thống.
- Tuy nhiên cần phân biệt:
  - gói order tracking SaaS công khai;
  - gói/quota API dùng cho hệ thống tự tích hợp.
- Giá API quota cụ thể có thể cần đăng nhập dashboard API hoặc liên hệ 17TRACK để mua plan phù hợp.
- Với scale khách đã nói trước đó:

```text
Hiện tại: 200-300 đơn/ngày, 5.000-7.000 đơn/tháng
Cao điểm: 1.000-1.500 đơn/ngày, khoảng 30.000 đơn/tháng
```

Các gói công khai 200/500/1000 shipments sẽ không đủ nếu tính theo đơn/tháng cao điểm. Nhiều khả năng cần gói Custom hoặc mua quota API lớn.

Việc cần làm tiếp:

1. Tạo tài khoản 17TRACK API hoặc xin khách tài khoản.
2. Vào dashboard API xem giá quota thực tế.
3. Hỏi sales 17TRACK gói cho khoảng 30.000 tracking/tháng.
4. Xác nhận có cần check real-time không, vì real-time Instant có thể tốn nhiều quota hơn.
5. Thiết kế hệ thống theo hướng:

```text
Nhận tracking từ xưởng
-> register tracking number lên 17TRACK
-> nhận webhook update
-> map status 17TRACK về status Zootop
-> hiển thị status dễ hiểu cho seller
```

## 9. Những quyết định đã chốt sau họp

- Seller điền `order_id` và thông tin sản phẩm, sau đó gửi lại cho Zootop Bear.
- Phải xác nhận đơn thì mới bắn/đưa đi cho vận hành làm.
- Kế toán/vận hành gửi đơn sang các nền tảng.
- Nền tảng sinh tracking.
- Nền tảng cũng có trạng thái đơn riêng.
- SKU và Variant ID hiện được khách hiểu là tương đương.
- `415 = Snap`.
- `922 = Flash POD`.
- Sau này sẽ có file mapping variant Zootop Bear với các xưởng.
- Đơn lỗi xử lý bằng tay qua ticket.
- Nếu chưa có ticket thì bắn lên group nội bộ.
- Có ticket/API thì call API hoặc xử lý theo luồng ticket.
- Chỉ làm 4 nhà cung cấp trong phase này, cần xác nhận lại bỏ bên nào.
- Admin/kế toán xem được tiền/cost từ xưởng.
- Seller chỉ xem giá từ hệ thống Zootop Bear.
- Có gửi mail thông báo cho seller.
- Cần định nghĩa trạng thái đơn và mapping status với các nền tảng.
- Cần kiểm tra giá 17TRACK/API để làm chức năng check tracking trong hệ thống.

## 10. Việc cần xử lý tiếp ngày mai

1. Cập nhật lại `QA khách hàng v1.xlsx` theo các câu trả lời mới.
2. Cập nhật `seller-manual-flow.html` cho đúng luồng:
   - seller điền order_id + sản phẩm;
   - seller điền vào file Excel riêng;
   - Zootop đưa sang file đơn tổng;
   - gửi Zootop;
   - xác nhận đơn;
   - kế toán/vận hành gửi xưởng;
   - tracking/status trả về.
3. Bổ sung luồng catalog có template Excel theo từng loại sản phẩm:
   - mỗi category/product type có template import riêng;
   - template gắn với rule tính giá và các field bắt buộc;
   - cần version template khi catalog thay đổi.
4. Tạo bảng mapping supplier code:

| Supplier code | Tên khách confirm | Tên chuẩn cần dùng | Ghi chú |
| --- | --- | --- | --- |
| 415 | Snap | Snap / Snap Ecom | Cần chốt tên chuẩn |
| 922 | Flash POD | Flash POD / FlashShip | Cần chốt tên chuẩn |

5. Tạo task/section riêng cho status mapping:
   - Zootop status.
   - Supplier status.
   - 17TRACK status.
   - Seller-facing status.
6. Tạo task/section riêng cho ticket/fallback group.
7. Check kỹ giá 17TRACK API/quota trong dashboard hoặc hỏi sales.
8. Confirm lại “4 nhà cung cấp kia” là 4 bên nào.

## 11. Cập nhật ngày 23/07/2026 - PrintBelle tạm pending

Thông tin đã note thêm:

- PrintBelle tạm pending trong phase hiện tại.
- Chưa ưu tiên xử lý API tạo đơn mới, webhook hoặc callback trạng thái cho PrintBelle.
- PrintBelle chỉ cần dùng để import các đơn cũ vào hệ thống, phục vụ thống kê, đối soát tiền nong và lưu lịch sử.
- Vẫn lưu thông tin nền tảng PrintBelle trong hệ thống để sau này còn tra cứu hoặc mở lại nếu cần.
- Trên use case, PrintBelle nên được hiểu là nền tảng lưu lịch sử/import đơn cũ, không phải xưởng active để route đơn mới trong phase hiện tại.

## 12. Cập nhật ngày 23/07/2026 - Định hướng theo format Simple Hub

Khách hàng có nói muốn làm hệ thống theo format giống nền tảng Simple Hub.

Ý hiểu cần ghi nhớ:

- Simple Hub là format tham chiếu về cách tổ chức màn hình/trải nghiệm, không phải tên module trong hệ thống Zootop Bear.
- Hệ thống nên ưu tiên đơn giản, dễ nhìn, gom các việc chính vào các màn hình trung tâm.
- Khi lên list màn hình, nên dựa vào nhóm công việc chính thay vì chia quá nhiều màn nhỏ ngay từ đầu.
- Mỗi role nên có dashboard/trang thao tác riêng, hiển thị đúng việc role đó cần làm hằng ngày.
- Flow order nên được thể hiện như một khu vực xử lý đơn rõ ràng: nhận đơn, kiểm tra, xác nhận, gửi xưởng, theo dõi mã vận đơn, xử lý lỗi.
- Catalog, giá, mapping xưởng, ví/đối soát và ticket có thể là các màn hình riêng hoặc tab trong khu vực quản trị tùy mức độ phức tạp.
- Khi thiết kế màn hình cho khách review, cần dùng ngôn ngữ nghiệp vụ dễ hiểu, tránh mô tả kỹ thuật.
