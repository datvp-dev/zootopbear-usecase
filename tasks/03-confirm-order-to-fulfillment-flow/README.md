# Task: Confirm order to fulfillment flow

## Muc tieu

Lam ro luong nghiep vu quan trong nhat cua Zootop Bear: seller tao/import don, he thong validate du lieu, tinh gia, kiem tra vi/credit, confirm thanh toan, day don sang supplier/nen tang fulfillment, sau do dong bo trang thai va tracking ve cho seller.

Day la luong backbone cua phase 1. Ket qua confirm se dung de viet chi tiet cac use case lien quan va cap nhat lai HTML use case neu can.

## Use case lien quan

- UC-SEL-05 Tao don le/API voi tinh gia truoc khi confirm.
- UC-SEL-06 Import CSV va xem ket qua validation theo dong/batch.
- UC-SEL-07 Upload/link file thiet ke cho order item.
- UC-SEL-08 Xem breakdown gia va thanh toan bang vi.
- UC-SEL-09 Theo doi don, trang thai va tracking 17TRACK.
- UC-SEL-10 Huy don/nhan hoan tien.
- UC-ADM-04 Cau hinh bang gia, ship fee, label fee, add item fee.
- UC-ADM-05 Quan ly supplier/nen tang fulfillment va thong tin ket noi.
- UC-ADM-06 Mapping san pham/variant voi supplier/platform va routing theo san pham.
- UC-ADM-07 Theo doi don, filter, dashboard tong.
- UC-ADM-08 Xu ly don Hold/loi/retry supplier API.
- UC-ADM-09 Cap credit dac biet/override tien co audit.
- UC-ACC-03 Xem ledger vi theo seller/don/giao dich.
- UC-ACC-05 Xu ly refund khi huy don/supplier fail.
- UC-OPS-01 Xem bang theo doi don va filter theo ngay/seller/status/supplier/payment/product.
- UC-OPS-02 Theo doi don da gui supplier va nhat ky ket noi.
- UC-OPS-03 Xu ly don Hold do design/du lieu.
- UC-OPS-04 Retry don gui loi hoac supplier fail/tam loi.
- UC-OPS-05 Theo doi tracking thieu/cham cap nhat.
- UC-SUP-01 Xem seller duoc phan cong va don/tracking lien quan.
- UC-SUP-04 Escalate don loi/Hold cho Van hanh/Admin hoac xuong.

## Trang thai

- Da tao task confirm.
- Da xac dinh cum use case lien quan.
- Da tao bo cau hoi confirm tai `tasks/03-confirm-order-to-fulfillment-flow/CONFIRM_ORDER_FLOW.md`.
- Da tao ban cau hoi de hoi khach bang ngon ngu de hieu tai `tasks/03-confirm-order-to-fulfillment-flow/CUSTOMER_CONFIRM.md`.
- Da tao bo cau hoi chi tiet hon cho buoi hop khach tai `tasks/03-confirm-order-to-fulfillment-flow/CUSTOMER_DETAILED_QUESTIONS_ORDER_FLOW.md`.
- Da review HTML luong thu cong hien tai tai `tasks/03-confirm-order-to-fulfillment-flow/HTML_MANUAL_FLOW_REVIEW.md`.
- Da them bang mo luong thu cong vao `seller.html` va trang minh hoa tai `seller-manual-flow.html`.
- Da tao file Excel cau hoi confirm bang tieng Viet co dau tai `tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx`.
- Da tao ghi chu lam tiep cho ngay hom sau tai `tasks/03-confirm-order-to-fulfillment-flow/GHI_CHU_LAM_TIEP.md`.
- Dang cho khach hang confirm rule nghiep vu truoc khi viet detail use case.

## Ket qua mong doi sau confirm

- Chot duoc trang thai va checkpoint cua don tu luc import den luc delivery/cancel/refund.
- Chot duoc import partial hay all-or-nothing.
- Chot duoc cong thuc tinh tien, dac biet don nhieu san pham.
- Chot duoc rule tru vi, pending, credit dac biet va refund.
- Chot duoc thoi diem day don sang supplier va co can buoc duyet noi bo hay khong.
- Chot duoc rule retry/hold/manual fallback khi supplier API loi.
- Chot duoc nguon tracking/status va mapping hien thi cho seller.

## File lien quan

- `PROJECT_OVERVIEW.md`
- `tasks/01-review-usecase/USECASE_REVIEW.md`
- `tasks/03-confirm-order-to-fulfillment-flow/CONFIRM_ORDER_FLOW.md`
- `tasks/03-confirm-order-to-fulfillment-flow/CUSTOMER_CONFIRM.md`
- `tasks/03-confirm-order-to-fulfillment-flow/CUSTOMER_DETAILED_QUESTIONS_ORDER_FLOW.md`
- `tasks/03-confirm-order-to-fulfillment-flow/HTML_MANUAL_FLOW_REVIEW.md`
- `tasks/03-confirm-order-to-fulfillment-flow/GHI_CHU_LAM_TIEP.md`
- `tasks/03-confirm-order-to-fulfillment-flow/cau-hoi-confirm-luong-seller-to-supplier.xlsx`
- `seller.html`
- `seller-manual-flow.html`
- `doc/QA khách hàng v1.xlsx`
- `doc/ke-hoach-chi-tiet.xlsm`
- `doc/Template fulfill Home decor xưởng US.xlsx`
