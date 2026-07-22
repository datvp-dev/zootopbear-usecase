# Bộ câu hỏi chi tiết hỏi khách: luồng seller tạo đơn -> Zootop Bear -> xưởng/nền tảng -> tracking

## 1. Mục tiêu buổi hỏi

Mục tiêu không phải hỏi khách về kỹ thuật API trước, mà là chốt cách công ty đang vận hành và muốn hệ thống web tự động hóa đến mức nào.

Luồng cần xác nhận:

```text
Seller gửi/tạo/import đơn
-> Zootop Bear kiểm tra dữ liệu
-> Zootop Bear tính tiền seller
-> Kiểm tra ví/credit
-> Xác định xưởng/nền tảng cần fulfill
-> Gửi đơn sang xưởng/nền tảng
-> Nhận trạng thái/tracking
-> Seller xem trạng thái trên Zootop Bear
-> Nếu có lỗi thì xử lý Hold/Ticket/Refund/Resend
```

Câu hỏi quan trọng nhất cần chốt trước:

```text
Sau khi seller tạo/import đơn và đủ tiền, hệ thống có tự động gửi đơn sang xưởng không, hay phải có nhân viên Zootop kiểm tra rồi mới gửi?
```

## 2. Nhóm A - Xác nhận luồng vận hành hiện tại

1. Hiện tại seller gửi đơn cho Zootop bằng cách nào là phổ biến nhất?
   - Gửi file Excel/Google Sheet.
   - Gửi CSV.
   - Gửi qua form/web nào đó.
   - Gửi qua API/hệ thống riêng.
   - Nhân viên Zootop tự copy từ nguồn khác.

2. File `Bảng fulfill US tổng Tháng 5-6 -7-8 .2026.xlsx` có phải đang phản ánh đúng luồng vận hành thật hiện tại không?

3. Các sheet như `Home Decor 2026`, `MUG US`, `Accessories Home&Living + Egg C`, `GILDAN+ Apparel US` có phải đang tương ứng với các nhóm sản phẩm có rule tính giá khác nhau không?

4. Khi seller gửi một file đơn, ai là người kiểm tra file đầu tiên?
   - Seller tự kiểm tra trước khi gửi.
   - Nhân viên vận hành kiểm tra.
   - CSKH kiểm tra.
   - Kế toán/Admin có tham gia kiểm tra không?

5. Trước khi đưa đơn sang xưởng, hiện tại nhân viên Zootop thường kiểm tra những gì?
   - Đủ thông tin người nhận.
   - Đúng SKU/Product ID/Variant ID.
   - Link design/mockup mở được.
   - Shipping method đúng.
   - Có label nếu là đơn ship bằng label.
   - Giá/cost đã tính đúng.
   - Seller đã đủ tiền.
   - Chưa trùng Order ID.

6. Có bước nào hiện tại vẫn bắt buộc phải làm thủ công và chưa muốn tự động hóa trong phase 1 không?

7. Nếu web mới làm đúng theo file Excel hiện tại, khách có muốn giữ nguyên luồng đó trước rồi tối ưu sau không?

## 3. Nhóm B - Seller tạo/import đơn

1. Phase 1 seller được tạo đơn bằng những cách nào?
   - Tạo từng đơn trên web.
   - Upload file Excel.
   - Upload CSV.
   - Gọi API từ hệ thống của seller.

2. Cách nào là bắt buộc phải có khi go-live đầu tiên?

3. Seller có bắt buộc dùng đúng template của Zootop không, hay mỗi seller có thể dùng template riêng?

4. Nếu mỗi seller dùng template riêng, hệ thống có cần màn hình mapping cột cho từng seller không?

5. Khi seller upload file có nhiều đơn, hệ thống nên xử lý theo hướng nào?
   - Dòng nào đúng thì nhận, dòng nào sai thì báo lỗi riêng.
   - Nếu có bất kỳ dòng sai thì không nhận cả file.
   - Cho seller sửa lỗi trực tiếp trên web rồi import tiếp.

6. Nếu một order có nhiều sản phẩm, seller sẽ nhập như hiện tại là nhiều dòng cùng `Order ID`, đúng không?

7. Nếu cùng một `Order ID` nhưng thông tin người nhận ở các dòng khác nhau, hệ thống nên xử lý thế nào?
   - Báo lỗi và không cho import.
   - Lấy thông tin ở dòng đầu tiên.
   - Cho vận hành kiểm tra sau.

8. `Order ID` trong file là mã đơn của ai?
   - Mã đơn seller tự đặt.
   - Mã đơn từ marketplace của seller.
   - Mã đơn nội bộ Zootop.
   - Có thể là nhiều loại tùy seller.

9. Seller có được upload lại một `Order ID` đã tồn tại không?
   - Không bao giờ.
   - Được nếu đơn cũ chưa gửi xưởng.
   - Được để cập nhật/sửa đơn.
   - Được nhưng hệ thống tạo version/lịch sử thay đổi.

10. Nếu seller gửi trùng order đã được gửi sang xưởng rồi, hệ thống nên cảnh báo thế nào?

## 4. Nhóm C - Dữ liệu bắt buộc trên đơn

1. Những field nào bắt buộc để tạo đơn?
   - Date.
   - Order ID.
   - Mã khách hàng/seller.
   - Shipping method.
   - Customer name.
   - Email.
   - Phone.
   - Country.
   - State.
   - City.
   - Address line 1.
   - Address line 2.
   - Zip/postal code.
   - SKU.
   - Product ID.
   - Variant ID.
   - Quantity.
   - Design front.
   - Design back.
   - Design sleeve left/right.
   - Mockup front/back.
   - Product note.
   - Link label.

2. Email và phone của người nhận có bắt buộc không? Nếu thiếu thì xưởng có nhận đơn không?

3. `Address line 2` có bắt buộc không, hay optional?

4. Country/state/city/zip có cần validate theo chuẩn của Mỹ không?

5. Nếu zip/state sai format, hệ thống nên chặn seller ngay hay đưa vào Hold cho vận hành kiểm tra?

6. Quantity có giới hạn min/max không?

7. Có trường hợp quantity cùng một item lớn nhưng phải tách thành nhiều đơn/split shipment không?

8. Seller có được ghi note riêng cho từng item không?

9. Seller có được ghi note chung cho cả order không?

10. Có thông tin nào hiện nằm trong Excel nhưng seller không được nhìn thấy trên web không?

## 5. Nhóm D - SKU, Product ID, Variant ID và mapping

1. `SKU` trong file hiện tại là mã nội bộ của Zootop, mã của seller, hay mã của xưởng?

2. `Product ID` trong từng sheet là mã nội bộ của Zootop hay mã lấy từ nền tảng/xưởng?

3. `Variant ID` có phải là mã chính dùng để lookup giá và lookup xưởng không?

4. `Variant ID` là mã do công ty tự đặt, hay mã lấy từ một trong các nền tảng fulfillment?

5. Một sản phẩm/variant có thể được nhiều xưởng cùng fulfill không?

6. Nếu một sản phẩm có thể đi nhiều xưởng, rule chọn xưởng là gì?
   - Theo mapping cố định.
   - Theo xưởng ưu tiên.
   - Theo giá vốn thấp nhất.
   - Theo thời gian sản xuất nhanh nhất.
   - Theo trạng thái API/xưởng đang hoạt động.
   - Nhân viên chọn thủ công.

7. Sheet `VARIANT_SUPPLIER_MAP` có phải là nguồn chuẩn hiện tại để map `Variant ID -> Supplier` không?

8. Các mã supplier như `415`, `922`, `Printeblle` tương ứng với xưởng/nền tảng nào?

9. Khách có bảng giải nghĩa đầy đủ supplier code không?

10. Tên `Printeblle` trong Excel có phải đang bị sai chính tả của `PrintBelle` không, hay đó là tên nội bộ?

11. Khi đưa lên web, seller chỉ nên thấy mã sản phẩm của Zootop, đúng không?

12. Các mã nội bộ của xưởng như `SystemSku`, `supplier_sku`, `OrderNo` chỉ nên Admin/Vận hành xem, đúng không?

13. Nếu seller nhập SKU riêng của seller, có cần chức năng mapping SKU seller -> SKU Zootop không?

14. Nếu không tìm thấy SKU/Product ID/Variant ID, hệ thống nên:
   - Chặn import và yêu cầu seller sửa.
   - Cho import nhưng đưa item vào Hold.
   - Cho vận hành mapping thủ công rồi xử lý tiếp.

15. Ai được phép sửa mapping SKU/Variant/Supplier?
   - Admin.
   - Vận hành.
   - Seller.
   - Chỉ kỹ thuật/import dữ liệu ban đầu.

## 6. Nhóm E - Catalog và giá hiển thị cho seller

1. File `US Factory Catalog.xlsx` có phải nguồn chuẩn cho catalog và giá hiện tại không?

2. Seller có được xem toàn bộ catalog không, hay chỉ xem những sản phẩm được bật cho seller đó?

3. Giá seller thấy là giá theo tier đúng không?

4. Tier hiện tại gồm Tier 1, Tier 2, Tier 3 theo sản lượng/ngày đúng không?

5. Có seller nào có bảng giá riêng ngoài tier chung không?

6. Nếu seller đổi tier, giá áp dụng từ thời điểm nào?
   - Ngay lập tức.
   - Từ ngày hôm sau.
   - Từ đầu tháng sau.
   - Chỉ áp dụng cho đơn mới, không đổi đơn cũ.

7. Khi seller import file, hệ thống có cần hiển thị breakdown giá trước khi seller confirm không?

8. Breakdown seller được xem gồm những phần nào?
   - Base cost.
   - Shipping fee.
   - Add item fee.
   - Label fee.
   - Phí in thêm mặt.
   - Discount/adjustment nếu có.
   - Tổng tiền từng item.
   - Tổng tiền cả order.

9. Seller có được thấy giá vốn/cost của xưởng không?

10. Admin/Kế toán/Vận hành có cần xem cả giá seller và giá vốn xưởng để đối soát lợi nhuận không?

11. Nếu giá trong catalog thay đổi, đơn đã import nhưng chưa confirm dùng giá cũ hay giá mới?

12. Nếu đơn đã confirm/trừ tiền rồi, có bao giờ cập nhật lại giá không?

## 7. Nhóm F - Công thức tính tiền theo loại đơn

### F1. Rule chung

1. Web có cần giữ đúng logic Excel hiện tại: một order có nhiều dòng thì gom theo cùng `Order ID` không?

2. Shipping fee/add item fee có tính ở cấp order, không tính lặp trên mọi dòng, đúng không?

3. Nếu order có nhiều sản phẩm khác loại, shipping fee chính lấy theo rule nào?
   - Lấy dòng đầu tiên trong file.
   - Lấy sản phẩm có shipping fee cao nhất.
   - Lấy theo nhóm sản phẩm chính.
   - Tính riêng từng item.
   - Rule khác.

4. Add item fee tính theo tổng quantity của cả order trừ 1, đúng không?

5. Nếu quantity một dòng là 3, có tính add item cho 2 item thêm không?

### F2. Đơn có label/TikTok label

1. Nếu có `Link Label`, đơn được coi là ship bằng label/TikTok label đúng không?

2. Với đơn có label, Excel đang hiểu:

```text
dòng đầu order = base cost * quantity + label fee
dòng sau cùng order = base cost * quantity
```

Rule này có đúng không?

3. Với đơn có label, có bao giờ vừa tính label fee vừa tính shipping fee không?

4. Label fee tính một lần cho cả order hay tính theo từng item/quantity?

5. Nếu order nhiều item nhưng chỉ một số item có label, xử lý thế nào?

6. Link label do seller cung cấp hay do Zootop/xưởng tạo?

7. Nếu link label không mở được, hệ thống chặn seller hay cho vào Hold?

### F3. Đơn ship by seller/không có label

1. Với đơn ship by seller, công thức hiện tại:

```text
total = tổng(base cost * quantity)
      + shipping fee chính
      + add item fee * (tổng quantity - 1)
```

Rule này có đúng không?

2. Nếu nhiều item có add item fee khác nhau, lấy add item fee nào?

3. Nếu nhiều item thuộc nhiều category khác nhau trong cùng order, có cho phép không?

4. Nếu có nhiều category trong cùng order, có tách đơn theo category/xưởng không?

### F4. Apparel/Gildan

1. Apparel/Gildan có cần tính giá theo vị trí in như Excel không?
   - Front.
   - Back.
   - Sleeve left.
   - Sleeve right.

2. Nếu có design back thì tính thêm phí in back theo quantity đúng không?

3. Nếu có sleeve left/right thì tính thêm phí tương ứng theo quantity đúng không?

4. Apparel/Gildan có phân biệt DTF/DTG không?

5. Shipping type của Apparel/Gildan lấy từ đâu?
   - Seller chọn.
   - Dựa vào có label hay không.
   - Dựa vào SKU.
   - Vận hành chọn.

6. Có cần seller upload mockup/design riêng cho từng vị trí in không?

## 8. Nhóm G - Ví tiền, thanh toán, pending và credit

1. Seller cần nạp tiền trước rồi mới được gửi đơn sang xưởng, đúng không?

2. Khi seller bấm confirm order, hệ thống trừ tiền ngay hay chỉ tạm giữ tiền?

3. Nếu ví không đủ tiền, đơn ở trạng thái nào?
   - Pending.
   - Imported.
   - Hold.
   - Không tạo đơn.

4. Đơn Pending vì thiếu tiền có tự động tiếp tục khi seller nạp đủ tiền không?

5. Seller có được chọn một số đơn để thanh toán trước, một số đơn để sau không?

6. Có cần chức năng thanh toán theo batch/file import không?

7. Có seller đặc biệt được tạo đơn trước khi đủ tiền không?

8. Nếu có credit đặc biệt:
   - Ai được cấp?
   - Hạn mức bao nhiêu?
   - Thời hạn bao lâu?
   - Ai duyệt?
   - Có cần lý do/audit log?

9. Ví seller cần có ledger những loại giao dịch nào?
   - Nạp tiền.
   - Trừ tiền order.
   - Hoàn tiền.
   - Điều chỉnh thủ công.
   - Credit đặc biệt.
   - Phí phát sinh.

10. Seller có được export lịch sử ví không?

11. Kế toán cần export ledger theo seller, theo ngày, theo order, hay theo batch?

## 9. Nhóm H - Khi nào gửi đơn sang xưởng/nền tảng

1. Sau khi seller đủ tiền và confirm, hệ thống có tự động gửi đơn sang xưởng không?

2. Có cần bước vận hành/Admin kiểm tra trước khi gửi xưởng không?

3. Nếu cần kiểm tra, kiểm tra ở cấp nào?
   - Kiểm tra từng order.
   - Kiểm tra từng batch/file.
   - Chỉ kiểm tra order lỗi/rủi ro.

4. Có trường hợp nào luôn phải giữ lại để vận hành duyệt không?
   - Giá trị đơn lớn.
   - Seller mới.
   - Product mới.
   - Link design lạ.
   - Supplier chưa ổn định API.

5. Gửi đơn sang xưởng theo thời điểm nào?
   - Ngay sau khi confirm.
   - Theo batch trong ngày.
   - Theo giờ cố định.
   - Vận hành bấm gửi.

6. Nếu một order có nhiều item nhưng mỗi item đi một xưởng khác nhau, hệ thống có tách thành nhiều fulfillment order không?

7. Seller có biết đơn bị tách sang nhiều xưởng không?

8. Nếu một phần item gửi xưởng thành công, một phần lỗi, trạng thái order hiển thị thế nào?

## 10. Nhóm I - API và fallback thủ công cho 5 nền tảng

1. Trong 5 nền tảng, nền tảng nào bắt buộc phải tích hợp API ở phase 1?
   - FlashShip.
   - SimplePrint.
   - PrintBelle.
   - ART ADD.
   - Snap Ecom.

2. Nền tảng nào có thể tạm thời xử lý thủ công trong phase 1?

3. Nếu nền tảng chưa có API, hệ thống cần export file theo format nào để vận hành upload?

4. Vận hành có cần màn hình đánh dấu `Đã đẩy sang xưởng` như Excel hiện tại không?

5. Khi gửi API thành công, hệ thống cần lưu những mã nào?
   - Zootop order id.
   - Seller order id.
   - Supplier order id.
   - Supplier order no.
   - Supplier SKU/SystemSku.
   - Request/response log.
   - Thời gian gửi.
   - Người thao tác nếu gửi thủ công.

6. Khi API lỗi, hệ thống cần retry tự động không?

7. Retry tối đa bao nhiêu lần, cách nhau bao lâu?

8. Sau khi retry vẫn lỗi, đơn chuyển trạng thái gì?

9. Ai nhận thông báo khi API lỗi?
   - Admin.
   - Vận hành.
   - CSKH.
   - Seller.

10. Seller có thấy lỗi API/xưởng không, hay chỉ thấy trạng thái dễ hiểu như `Cần hỗ trợ`?

11. Có cho phép vận hành đổi xưởng rồi gửi lại không?

12. Nếu đổi xưởng, giá seller có thay đổi không?

13. Nếu giá vốn xưởng thay đổi nhưng giá seller không đổi, hệ thống có cần lưu chênh lệch/lợi nhuận không?

## 11. Nhóm J - Trạng thái đơn

1. Danh sách trạng thái seller nhìn thấy cuối cùng gồm những trạng thái nào?
   - Imported.
   - Pending.
   - Confirmed.
   - Waiting to send.
   - Sent to factory.
   - In Production.
   - Shipped.
   - In Transit.
   - Delivered.
   - Hold.
   - Cancelled.
   - Refunded.

2. Có cần đổi tên trạng thái sang tiếng Việt cho seller không?

3. Trạng thái nội bộ có cần nhiều hơn trạng thái seller nhìn thấy không?

4. `Imported` nghĩa là gì?
   - File đã được nhận.
   - Order đã được tạo nhưng chưa thanh toán.
   - Order đã sẵn sàng gửi xưởng.

5. `Confirm` nghĩa là seller đã xác nhận, đã trừ tiền, hay đã gửi xưởng?

6. `Pending` dùng cho thiếu tiền, chờ thanh toán, hay chờ xử lý?

7. `Hold` dùng trong những trường hợp nào?
   - Thiếu/sai dữ liệu.
   - Link design lỗi.
   - SKU không match.
   - API lỗi.
   - Xưởng từ chối.
   - Seller yêu cầu sửa.

8. Khi nào đơn chuyển sang `In Production`?
   - Sau khi gửi API thành công.
   - Sau khi xưởng xác nhận nhận đơn.
   - Sau khi xưởng bắt đầu sản xuất.

9. Khi nào đơn chuyển sang `Shipped`?
   - Khi xưởng trả tracking.
   - Khi carrier có event đầu tiên.
   - Khi vận hành nhập tracking.

10. Khi nào đơn chuyển sang `Delivered/Delivery`?
   - Theo xưởng.
   - Theo 17TRACK.
   - Theo vận hành cập nhật.

11. Có cần lưu lịch sử thay đổi trạng thái không?

12. Seller có được xem timeline trạng thái không?

## 12. Nhóm K - Tracking và 17TRACK

1. Tracking lấy từ nguồn nào là nguồn chính?
   - API/webhook của xưởng.
   - Export file từ xưởng.
   - 17TRACK.
   - Nhân viên nhập tay.

2. Nếu xưởng có tracking nhưng 17TRACK chưa nhận, seller thấy trạng thái gì?

3. Nếu 17TRACK báo `notfound`, seller có thấy chữ này không, hay map thành `Đang chờ cập nhật tracking`?

4. Nếu status là `InfoReceived`, seller thấy là gì?

5. Seller cần xem những thông tin tracking nào?
   - Tracking number.
   - Carrier.
   - Tracking link.
   - Tracking status.
   - Tracking event timeline.
   - Shipped date.
   - Delivered date.
   - Estimated delivery date.

6. Có bao giờ một order có nhiều tracking không?

7. Nếu một order có nhiều item và nhiều tracking, seller xem theo order hay theo từng item?

8. Sau bao lâu chưa có tracking thì hệ thống đưa vào dashboard vận hành?
   - 24 giờ.
   - 48 giờ.
   - 72 giờ.
   - Theo production time của từng sản phẩm.

9. Sau bao lâu tracking không update thì cần cảnh báo?

10. Nếu tracking bị sai/carrier sai, ai được sửa?

11. Khi sửa tracking, có cần ghi audit log không?

12. Seller có nhận thông báo khi có tracking không?

## 13. Nhóm L - Hủy đơn, refund và resend

1. Khách đã xác nhận seller được tự hủy trong 30 phút sau khi lên đơn. Mốc 30 phút tính từ lúc nào?
   - Lúc import thành công.
   - Lúc seller confirm.
   - Lúc trừ tiền.
   - Lúc gửi xưởng.

2. Trong 30 phút, seller hủy thì hệ thống refund tự động không?

3. Sau 30 phút, seller phải tạo ticket/liên hệ support để hủy, đúng không?

4. Sau 30 phút, điều kiện nào vẫn được hủy?
   - Chưa gửi xưởng.
   - Xưởng chưa sản xuất.
   - Chưa có tracking.
   - Tùy vận hành quyết định.

5. Nếu đơn đã gửi xưởng nhưng xưởng chưa sản xuất, Zootop có API hủy sang xưởng không?

6. Nếu xưởng không hỗ trợ API hủy, vận hành xử lý thủ công như thế nào?

7. Refund có cần kế toán/Admin duyệt không?

8. Refund về ví seller hay hoàn qua cổng thanh toán?

9. Refund có thể partial theo item không?

10. Khi xưởng fail/từ chối đơn, refund tự động hay cần duyệt?

11. `Resend` khác `Refund` như thế nào trong vận hành hiện tại?

12. Trường hợp nào được resend miễn phí?

13. Resend tạo order mới hay dùng lại order cũ?

14. Seller có thấy link giữa đơn gốc và đơn resend không?

## 14. Nhóm M - Issue, Hold và Ticket

1. Sheet `Issue` hiện đang dùng để theo dõi những loại vấn đề nào?

2. Sheet `Import lên có vấn đề` hiện đang dùng cho lỗi ở bước nào?
   - Lỗi import dữ liệu.
   - Lỗi link design/mockup.
   - Lỗi mapping SKU/variant.
   - Lỗi khi đẩy lên xưởng.
   - Lỗi sau khi sản xuất/giao hàng.

3. Trên web, khách muốn gom `Issue`, `Hold`, `Ticket` thành một module hay tách riêng?

4. Seller được tạo ticket ở những thời điểm nào?
   - Sau khi import.
   - Sau khi confirm.
   - Sau khi đơn vào production.
   - Sau khi có tracking.
   - Sau khi delivered.

5. Seller được tạo ticket cho những loại yêu cầu nào?
   - Sửa địa chỉ.
   - Sửa design.
   - Hủy đơn.
   - Hỏi tracking.
   - Báo giao chậm.
   - Báo hàng lỗi.
   - Yêu cầu resend.
   - Yêu cầu refund.

6. Ticket cần những field nào?
   - Loại ticket.
   - Order ID.
   - Item/SKU liên quan.
   - Nội dung.
   - File/ảnh bằng chứng.
   - Link design mới.
   - Mức độ ưu tiên.

7. Ticket có cần gửi sang xưởng qua API không?

8. Nếu xưởng không có API ticket, vận hành sẽ xử lý thủ công trên portal/email/chat đúng không?

9. Seller có được xem phản hồi của xưởng không, hay chỉ xem phản hồi do CSKH/Vận hành viết lại?

10. Trạng thái ticket gồm những gì?
   - Open.
   - Waiting seller.
   - Waiting factory.
   - In progress.
   - Resolved.
   - Rejected.
   - Closed.

11. Ai được đóng ticket?

12. Có cần SLA/thời hạn xử lý ticket không?

## 15. Nhóm N - Quyền nội bộ và dashboard

1. Admin full quyền với hệ thống, đúng không?

2. Vận hành được xem tất cả seller hay chỉ seller được phân công?

3. CSKH được xem tất cả seller hay chỉ seller được phân công?

4. Kế toán được xem thông tin đơn ở mức nào?
   - Chỉ số tiền và ledger.
   - Xem cả order detail.
   - Xem cả thông tin người nhận.
   - Không xem file design/mockup.

5. Vận hành được sửa những thông tin nào sau khi seller tạo đơn?
   - Địa chỉ.
   - SKU/variant.
   - Supplier.
   - Tracking.
   - Status.
   - Design/mockup.
   - Giá.

6. CSKH được sửa gì, hay chỉ tạo note/ticket?

7. Mọi thao tác sửa đơn, refund, đổi status, đổi supplier có cần audit log không?

8. Dashboard Admin cần filter theo gì?
   - Seller.
   - Ngày tạo.
   - Ngày gửi xưởng.
   - Supplier.
   - Product/category.
   - Payment status.
   - Order status.
   - Tracking status.
   - Hold reason.
   - API error.

9. Dashboard Vận hành cần ưu tiên hiển thị nhóm nào?
   - Đơn chưa gửi xưởng.
   - Đơn gửi API lỗi.
   - Đơn Hold.
   - Đơn thiếu tracking.
   - Đơn tracking lâu không update.
   - Ticket đang chờ xưởng.

10. Dashboard CSKH cần thấy gì để trả lời seller nhanh nhất?

## 16. Nhóm O - Dữ liệu từ xưởng/nền tảng cần lưu

1. Với mỗi đơn gửi sang xưởng, hệ thống cần lưu mã nào?
   - Mã đơn Zootop.
   - Mã đơn seller.
   - Mã đơn nội bộ xưởng.
   - Mã item/SKU phía Zootop.
   - Mã item/SKU phía xưởng.
   - Tracking number.
   - Carrier.
   - Status xưởng.
   - Status tracking.

2. Với PrintBelle, các field `OrderNo`, `OrderId`, `ProductCode`, `SellersItemSku`, `SystemSku`, `TrackNo` có cần lưu hết không?

3. Khi làm việc với support PrintBelle, team thường dùng mã nào để tra cứu?

4. Với ART ADD, `StoreID`, `product_sku`, `supplier_sku`, order id bên ART ADD có cần lưu để đối soát không?

5. Có cần lưu request/response API để debug không?

6. Log API giữ trong bao lâu?

7. Khi xưởng trả lỗi, cần lưu những gì?
   - Error code.
   - Error message.
   - Payload đã gửi.
   - Supplier.
   - Thời gian lỗi.
   - Số lần retry.

## 17. Nhóm P - Câu hỏi riêng cho 5 nền tảng/xưởng

Với từng nền tảng FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom, cần hỏi cùng một bộ câu hỏi để tránh mỗi bên hiểu một kiểu:

1. Nền tảng này dùng để fulfill nhóm sản phẩm nào?

2. Có API tạo đơn không?

3. Có tài liệu API chính thức không?

4. Có tài khoản test/sandbox/test store không?

5. API tạo đơn có trừ tiền thật ngay không?

6. Có cách tạo đơn test mà không ảnh hưởng store chính không?

7. API yêu cầu mã sản phẩm là field nào?
   - SKU.
   - Product ID.
   - Variant ID.
   - ProductCode.
   - Supplier SKU.
   - SystemSku.

8. Có API lấy danh sách product/variant/SKU từ nền tảng không?

9. Có webhook/callback status không?

10. Nếu không có webhook, có API get order/get tracking để Zootop tự gọi định kỳ không?

11. Status/tracking trả về gồm những giá trị nào?

12. Có API cancel order không?

13. Có API tạo ticket/issue/message với xưởng không?

14. Có API resend/refund không, hay xử lý thủ công?

15. Có trả tracking number, carrier, tracking events không?

16. Có giới hạn request API không?

17. Có yêu cầu link design/mockup phải là link public trực tiếp không?

18. Có chấp nhận Google Drive link không?

19. Có yêu cầu file design định dạng/kích thước nào không?

20. Có trả giá/cost sau khi tạo đơn không?

## 18. Nhóm Q - Kết quả cần chốt sau buổi họp

Sau buổi họp, cần lấy được các quyết định sau:

1. Luồng đơn tự động hoàn toàn hay có bước duyệt nội bộ.
2. Cách seller tạo/import đơn trong phase 1.
3. Danh sách field bắt buộc trên template.
4. Quy tắc xử lý file import có lỗi.
5. Định nghĩa rõ `SKU`, `Product ID`, `Variant ID`.
6. Bảng giải nghĩa supplier code như `415`, `922`.
7. Rule mapping sản phẩm/variant sang xưởng.
8. Công thức tính tiền theo từng nhóm sản phẩm.
9. Rule ví, pending, credit, refund.
10. Rule hủy đơn 30 phút và sau 30 phút.
11. Danh sách status seller nhìn thấy.
12. Danh sách status nội bộ.
13. Nguồn tracking chính và rule ưu tiên với 17TRACK.
14. Rule xử lý API lỗi/retry/fallback thủ công.
15. Luồng Issue/Hold/Ticket/Resend/Refund.
16. Quyền Admin/Kế toán/Vận hành/CSKH trên đơn.
17. Danh sách API/test account cần xin từ 5 nền tảng.

