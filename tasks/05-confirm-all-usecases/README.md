# Task 05 - Confirm toàn bộ use case

## Mục tiêu

Confirm lại toàn bộ use case Phase 1 với khách hàng sau khi đã cập nhật flow order hiện tại và list màn hình dự kiến.

Mục tiêu của task này không phải hỏi sâu từng luồng chi tiết ngay, mà là xác nhận:

- Các role đã đúng chưa.
- Mỗi role đã đủ chức năng chính chưa.
- Có chức năng nào bị thiếu, thừa hoặc đặt sai role không.
- Các màn hình dự kiến đã bao phủ được use case chưa.
- Khách có đồng ý với hướng tổ chức màn hình theo format tham chiếu Simple Hub không.

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

## Phạm vi cần confirm

### 1. Role Seller

Use case hiện tại:

- UC-SEL-01 - Đăng ký tài khoản.
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
- Seller có được tạo đơn lẻ trực tiếp trên web không, hay Phase 1 chỉ import file.
- Seller có cần xem lịch sử import file và lỗi từng dòng không.
- Seller chỉ xem giá Zootop Bear, không xem chi phí xưởng, có đúng không.
- Seller có được tự hủy đơn trong 30 phút không.

### 2. Role Admin

Use case hiện tại:

- UC-ADM-01 - Duyệt seller, gán tier.
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

Theo `screens.html`, hiện có 15 màn hình dự kiến:

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

Điểm cần khách xác nhận:

- 15 màn hình này đã đủ để bao phủ Phase 1 chưa.
- Có màn nào nên gộp lại để đơn giản hơn không.
- Có màn nào cần tách riêng vì nghiệp vụ nhiều không.
- Với format tham chiếu Simple Hub, khách muốn ưu tiên màn hình nào làm trước.

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
