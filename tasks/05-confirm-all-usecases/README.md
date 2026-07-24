# Task 05 - Confirm toàn bộ use case

## Mục tiêu

Confirm lại toàn bộ use case Phase 1 với khách hàng sau khi đã cập nhật flow order hiện tại và list màn hình dự kiến.

Mục tiêu của task này không phải hỏi sâu từng luồng chi tiết ngay, mà là xác nhận:

- Các role đã đúng chưa.
- Mỗi role đã đủ chức năng chính chưa.
- Có chức năng nào bị thiếu, thừa hoặc đặt sai role không.
- Các màn hình dự kiến đã bao phủ được use case chưa.
- Khách có đồng ý với hướng tổ chức màn hình theo format tham chiếu đã chọn không.

## Nguồn tham chiếu

- `index.html` - Tổng quan use case theo role.
- `seller.html` - Use case Seller.
- `admin.html` - Use case Admin.
- `ketoan.html` - Use case Kế toán.
- `vanhanh.html` - Use case Vận hành.
- `cskh.html` - Use case CSKH.
- `seller-manual-flow.html` - Luồng order thủ công hiện tại đã vẽ lại.
- `screens.html` - List màn hình + wireframe + mapping use case.
- `tasks/03-confirm-order-to-fulfillment-flow/MEETING_NOTE_2026-07-22.md` - Note confirm với khách ngày 22/07/2026 và cập nhật sau đó.

## Rule common bắt buộc cho wireframe tiếp theo

Tất cả wireframe/màn hình tạo tiếp trong task này phải bám theo phong cách thiết kế landing page Zootop Bear khách gửi:

```text
https://seta-datnd-6862.github.io/zootopbear-lp/
```

Tư tưởng thiết kế cần giữ:

- Không dùng phong cách trắng/xanh của SimplePrint làm style chính.
- SimplePrint chỉ dùng để tham khảo bố cục/input/text nếu khách gửi ảnh.
- Visual chính phải theo Zootop Bear landing page:
  - nền tối nâu/đen;
  - glow cam;
  - đường grid nền nhẹ nếu cần;
  - card kiểu glass/dark card;
  - border cam/nâu nhẹ;
  - button dạng pill, gradient cam;
  - text chính màu kem/sáng;
  - text phụ màu sand/muted;
  - điểm nhấn màu cam/gold.
- Heading nên có cảm giác brand Zootop Bear, dùng kiểu serif/display nếu phù hợp.
- Body text nên gọn, dễ đọc, ưu tiên tiếng Việt dễ hiểu cho khách không biết kỹ thuật.
- Wireframe vẫn phải rõ nghiệp vụ trước: input, button, bảng, trạng thái, role, dữ liệu chính.
- Mỗi màn hình/trạng thái trong một use case phải tách thành một ô riêng dễ nhìn. Không nhồi nhiều màn vào một khung phải scroll ngang/dọc mới hiểu được.
- Nếu một use case có nhiều trạng thái, trình bày như các ô con/storyboard: ví dụ Login, SignUp, Forgot Password, Xác nhận email, Dùng thử.
- Câu hỏi cần confirm với khách phải được viết trước ở dạng draft để Anh duyệt. Câu nào Anh duyệt thì mới đưa vào bộ câu hỏi chính; câu nào chưa ổn thì Anh sẽ mô tả thêm để sửa cách hỏi.
- Mọi thay đổi đã làm trong task này phải bổ sung lại vào file task/README tương ứng để hôm sau mở task lên vẫn nắm được bối cảnh, quyết định đã chốt và file nào đã tạo/sửa.
- Nếu khách gửi ảnh tham khảo từ nền tảng khác:
  - giữ đúng input/text/flow trong ảnh;
  - đổi lại màu sắc, card, button, layout detail theo style Zootop Bear.

Quy tắc áp dụng cho các màn tiếp theo:

```text
Ảnh tham khảo khách gửi = nguồn bố cục và dữ liệu cần có
Landing page Zootop Bear = nguồn phong cách thiết kế bắt buộc
```

## Phạm vi cần confirm

### 1. Role Seller

Use case hiện tại:

- UC-SEL-01 - Đăng nhập, đăng ký và quên mật khẩu bằng email.
- UC-SEL-02 - Xem bảng sản phẩm và chi tiết sản phẩm.
- UC-SEL-03 - Tải ảnh mô phỏng/template thiết kế.
- UC-SEL-04 - Tạo yêu cầu top-up và xem ví.
- UC-SEL-05 - Tạo đơn lẻ trên Zootop Bear.
- UC-SEL-06 - Import file đơn theo template.
- UC-SEL-07 - Upload/link file thiết kế.
- UC-SEL-08 - Xem tổng tiền và thanh toán đơn.
- UC-SEL-09 - Theo dõi đơn và mã vận đơn.
- UC-SEL-10 - Hủy đơn và nhận hoàn tiền.
- UC-SEL-11 - Tạo ticket hỗ trợ đơn hàng.

Điểm cần khách xác nhận:

- Seller có cần thêm chức năng nào khác ngoài các mục trên không.
- Màn đăng nhập/đăng ký/quên mật khẩu dùng email bắt buộc, có đúng hướng không.
- Đã cập nhật theo hướng mới: seller đăng ký xong tự xác nhận email, không cần chờ Admin duyệt mới được vào hệ thống.
- Sau khi seller xác nhận email, seller vào hệ thống ở trạng thái Dùng thử.
- Seller ở trạng thái Dùng thử chỉ xem được catalog giống phần public ngoài trang chính; không tạo/import đơn, không nạp ví, không tạo ticket và không thao tác nghiệp vụ khác.
- Về sau hệ thống/API sẽ check trạng thái seller để khóa/mở quyền thao tác nên không quá rủi ro khi cho seller vào hệ thống trước.
- Khi seller tạo tài khoản/xác nhận email, hệ thống gửi thông báo cho Admin để tránh Admin bị miss seller mới.
- Forgot Password gửi verification code qua email.
- Form SignUp hiện gồm Name, Email, Password, Password confirmation; vẫn cần hỏi khách có cần thêm số điện thoại, tên shop, sản lượng dự kiến không.
- Wireframe màn đăng nhập/đăng ký/quên mật khẩu tách riêng 3 trạng thái Login / SignUp / Forgot Password, giữ input/text theo ảnh SimplePrint khách gửi nhưng dùng phong cách thiết kế landing page Zootop Bear: nền tối, glow cam, card glass, nút cam gradient.
- Seller có được tạo đơn lẻ trực tiếp trên web không, hay Phase 1 chỉ import file.
- Seller có cần xem lịch sử import file và lỗi từng dòng không.
- Seller chỉ xem giá Zootop Bear, không xem chi phí xưởng, có đúng không.
- Seller có được tự hủy đơn trong 30 phút không.
- Với UC-SEL-09, khách đã chốt bỏ chức năng tracking/modal 17TRACK khỏi Phase 1; chỉ giữ theo dõi trạng thái đơn, hãng vận chuyển và mã vận đơn cơ bản.

### 2. Role Admin

Use case hiện tại:

- UC-ADM-01 - Danh sách seller và chuyển trạng thái seller.
- UC-ADM-02 - Quản lý tài khoản nội bộ.
- UC-ADM-03 - Quản lý catalog sản phẩm.
- UC-ADM-04 - Cấu hình bảng giá Zootop Bear.
- UC-ADM-05 - Quản lý nền tảng/xưởng fulfillment.
- UC-ADM-06 - Mapping sản phẩm sang xưởng.
- UC-ADM-07 - Theo dõi đơn và dashboard tổng.
- UC-ADM-08 - Xử lý đơn Hold, lỗi, gửi lại.
- UC-ADM-09 - Quản lý ví, refund, credit đặc biệt.
- UC-ADM-10 - Xem audit log.
- UC-ADM-11 - Quản lý ticket hỗ trợ.

Điểm cần khách xác nhận:

- Admin full quyền toàn hệ thống, có đúng không.
- Admin không còn là bước chặn seller trước khi vào hệ thống.
- Cần có màn danh sách seller để Admin xem toàn bộ seller trong hệ thống: dùng thử, active, partner/VIP, bị từ chối, bị khóa.
- Khi seller tạo tài khoản mới/xác nhận email, hệ thống gửi thông báo cho Admin; kênh thông báo là email hay kênh nội bộ sẽ tính sau.
- Trong màn danh sách seller có nút chuyển trạng thái seller; khi chuyển trạng thái Admin gán tier và gán nhân viên phụ trách cho seller.
- Sau khi Admin gán phụ trách, hệ thống gửi thông báo đến nhân viên phụ trách.
- Admin có quản lý cả giá Zootop và chi phí xưởng không.
- Admin có là người cấu hình mapping mã Zootop sang mã xưởng không.
- Admin có cần xử lý trực tiếp đơn lỗi/ticket hay chỉ xem và phân quyền cho vận hành.
- PrintBelle tạm pending, chỉ import đơn cũ/lưu lịch sử, có đúng phạm vi không.

### 3. Role Kế toán

Use case hiện tại:

- UC-ACC-01 - Duyệt / từ chối top-up.
- UC-ACC-02 - Điều chỉnh ví thủ công.
- UC-ACC-03 - Xem sổ giao dịch ví và tiền đơn.
- UC-ACC-04 - Đối soát chi phí xưởng.
- UC-ACC-05 - Xử lý refund/resend theo đơn.

Điểm cần khách xác nhận:

- Kế toán có được xem chi phí xưởng không.
- Kế toán có tham gia bước xác nhận đơn trước khi gửi xưởng không.
- Kế toán có được điều chỉnh ví seller thủ công không.
- Refund/resend do kế toán xử lý, vận hành xử lý hay cả hai cùng phối hợp.
- Đơn cũ PrintBelle có cần import vào phần đối soát của kế toán không.

### 4. Role Vận hành

Use case hiện tại:

- UC-OPS-01 - Xem danh sách đơn tổng nội bộ.
- UC-OPS-02 - Xác nhận và gửi đơn sang xưởng.
- UC-OPS-03 - Xử lý đơn Hold/đơn lỗi.
- UC-OPS-04 - Gửi lại đơn hoặc xử lý thủ công.
- UC-OPS-05 - Theo dõi mã vận đơn và trạng thái.
- UC-OPS-06 - Theo dõi ticket và group nội bộ.

Điểm cần khách xác nhận:

- Vận hành có xem toàn bộ đơn hay chỉ đơn được phân công.
- Vận hành có quyền xác nhận đơn trước khi gửi xưởng không.
- Vận hành là người gửi đơn sang xưởng, có đúng không.
- Đơn lỗi sẽ xử lý qua ticket hay group nội bộ trong Phase 1.
- Vận hành cần theo dõi trạng thái xưởng, mã vận đơn và trạng thái giao hàng ở mức nào.

### 5. Role CSKH

Use case hiện tại:

- UC-SUP-01 - Xem seller và đơn phụ trách.
- UC-SUP-02 - Ghi chú hỗ trợ trên đơn.
- UC-SUP-03 - Tiếp nhận ticket của seller.
- UC-SUP-04 - Chuyển xử lý đơn lỗi.

Điểm cần khách xác nhận:

- CSKH chỉ xem seller được phân công hay xem toàn bộ seller.
- CSKH có được xem giá/tiền đơn không.
- CSKH có được thao tác sửa đơn không, hay chỉ ghi chú và chuyển vận hành/admin xử lý.
- CSKH có là người phản hồi ticket cho seller không.

## List màn hình cần khách review

Theo `screens.html`, hiện có 17 màn hình dự kiến:

0. SCR-00 - Common layout / Header menu footer.
1. SCR-01 - Đăng nhập / Đăng ký seller.
2. SCR-02 - Trang chính Seller.
3. SCR-03 - Catalog sản phẩm / Template.
4. SCR-04 - Tạo đơn lẻ.
5. SCR-05 - Import file đơn.
6. SCR-06 - Chi tiết đơn / mã vận đơn.
7. SCR-07 - Ví / top-up Seller.
8. SCR-08 - Ticket hỗ trợ đơn hàng.
9. SCR-09 - Danh sách đơn tổng nội bộ.
10. SCR-10 - Xác nhận và gửi xưởng.
11. SCR-11 - Quản lý xưởng / nền tảng.
12. SCR-12 - Mapping sản phẩm - xưởng.
13. SCR-13 - Giá Zootop / chi phí xưởng.
14. SCR-14 - Kế toán / đối soát.
15. SCR-15 - Người dùng / phân quyền / audit.
16. SCR-16 - Danh sách seller / Chuyển trạng thái seller.

Điểm cần khách xác nhận:

- 17 màn hình này đã đủ để bao phủ Phase 1 chưa.
- Có màn nào nên gộp lại để đơn giản hơn không.
- Có màn nào cần tách riêng vì nghiệp vụ nhiều không.
- Với format tham chiếu đã chọn, khách muốn ưu tiên màn hình nào làm trước.

## Kết quả mong muốn sau khi confirm

Sau buổi confirm, cần có:

- Danh sách role cuối cùng.
- Danh sách use case cuối cùng theo từng role.
- Danh sách màn hình cuối cùng cho Phase 1.
- Mapping use case -> màn hình đã được khách đồng ý.
- Danh sách điểm còn pending để hỏi chi tiết ở task sau.

## Tiến độ tạo HTML chi tiết từng use case

### Đã làm

- Batch Seller: đã tạo 11 file HTML chi tiết trong thư mục `usecases/`.
- Đã gắn link từ từng use case Seller trong `seller.html` sang file HTML tương ứng.
- Đã tạo thêm file chi tiết `usecases/uc-adm-01-seller-approval.html` cho chức năng Admin xem danh sách seller và chuyển trạng thái seller.
- Đã thiết kế lại wireframe cho màn `SCR-16 - Danh sách seller / Chuyển trạng thái seller` theo style Zootop Bear, gồm:
  - màn danh sách seller có bộ lọc trạng thái, ô tìm kiếm, bảng seller và nút Chuyển trạng thái/Gán phụ trách;
  - popup chuyển trạng thái seller;
  - popup khóa/từ chối seller;
  - popup thông báo nhân viên phụ trách sau khi gán seller.
- Đã cập nhật lại màn `SCR-16` theo ảnh tham khảo SimplePrint Store/List khách gửi: lấy bố cục sidebar trái, topbar search, breadcrumb, filter panel, bảng dữ liệu, action button và pagination; vẫn giữ style Zootop Bear dark/orange.
- Theo góp ý mới, đã tách phần header/sidebar/common menu/footer sang màn riêng `SCR-00 - Common layout`. Các màn nghiệp vụ như `SCR-16` chỉ vẽ phần nội dung chính để khách dễ tập trung review nghiệp vụ.
- Theo góp ý nghiệp vụ mới, đã đổi luồng từ “seller chờ Admin duyệt rồi mới vào hệ thống” sang “seller tự xác nhận email, vào hệ thống ở trạng thái Dùng thử; Admin nhận thông báo và chuyển trạng thái seller sau”.
- Đã note thêm: seller Dùng thử chỉ xem catalog public, các chức năng nghiệp vụ sẽ bị khóa theo trạng thái seller và API sẽ check trạng thái seller khi thao tác.
- Khách đã chốt bỏ chức năng tracking/modal 17TRACK khỏi Phase 1, nên đã gỡ `UC-TRK-01` và `SCR-17` khỏi use case/màn hình hệ thống.
- `UC-SEL-09`, `UC-OPS-05`, `UC-SUP-01`, `UC-SUP-02`, `UC-ADM-07` chỉ còn phạm vi xem trạng thái đơn, hãng vận chuyển và mã vận đơn cơ bản.
- Mỗi file Seller có:
  - mô tả mục đích;
  - wireframe cơ bản;
  - luồng trực quan;
  - ý hiểu hiện tại dựa trên khách đã confirm;
  - câu hỏi cần confirm thêm với khách.

### Cần làm tiếp

1. Batch Admin - 11 use case.
2. Batch Kế toán - 5 use case.
3. Batch Vận hành - 6 use case.
4. Batch CSKH - 4 use case.
5. Rà lại toàn bộ link use case -> HTML chi tiết -> màn hình liên quan.

## Ghi chú quan trọng

- Không hỏi khách quá sâu về API/database ở task này.
- Không đi vào chi tiết từng luồng nhỏ như callback, payload, status mapping cụ thể.
- Chỉ confirm phạm vi chức năng và màn hình ở mức nghiệp vụ.
- Ngôn ngữ hỏi khách cần đơn giản, tránh thuật ngữ kỹ thuật.
