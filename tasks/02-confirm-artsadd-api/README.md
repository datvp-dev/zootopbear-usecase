# Task: Confirm API ART ADD

## Muc tieu

Lam ro cach Zootop Bear ket noi voi ART ADD de tao don, map du lieu don, nhan trang thai va tracking.

## Trang thai

- Da tao task de ghi nhan thong tin.
- Da doc folder demo `fulfillment.artsadd.com-php-demo`.
- Da tao review tam thoi tai `tasks/02-confirm-artsadd-api/API_REVIEW.md`.
- Da tao file tong hop trao doi hien tai va chat draft tai `tasks/02-confirm-artsadd-api/CURRENT_STATUS_AND_CHAT_DRAFT.md`.
- ART ADD da cung cap AppKey/AppSecret va tao store test rieng cho API order.
- Store test: `Zootop Bear API Test`, Store ID `4589cc68d3f38586e8aef1464166197f`.
- Support da confirm API-created orders o trang thai unpaid; neu khong thanh toan thi khong bi tru tien.
- Support da confirm co callback/webhook status ve he thong Zootop sau khi cung cap receiving endpoint URL, nhung chua co docs/payload mau.
- Dang can confirm them signing, webhook/tracking sample payload, status mapping, supplier SKU va API docs chuan cua ART ADD.

## Noi dung can confirm

- Account/link dang nhap ART ADD dang nam trong sheet `thong tin account nha cung cap` cua file QA.
- ART ADD co API tao don khong, can endpoint/tai lieu nao.
- ART ADD co webhook cap nhat trang thai/tracking khong, hay can goi API dinh ky.
- Du lieu template fulfill cua Zootop Bear map sang ART ADD nhu the nao.
- SKU/Variant/Product ID cua Zootop Bear map voi ma nao tren ART ADD.
- Link/file thiet ke va mockup truyen sang ART ADD theo format nao.
- Gia/cost tren ART ADD co can luu ve de doi soat khong.
- Loi API/tao don fail can retry hay xu ly thu cong.

## File lien quan

- `doc/QA khách hàng v1.xlsx`
- `doc/Template fulfill Home decor xưởng US.xlsx`
- `PROJECT_OVERVIEW.md`
- `tasks/01-review-usecase/USECASE_REVIEW.md`
- `tasks/02-confirm-artsadd-api/API_REVIEW.md`
- `tasks/02-confirm-artsadd-api/extracted-docs/`
