# Review bo HTML use case Zootop Bear

Ngay review: 21/07/2026

## Ket luan nhanh

Bo HTML hien tai dung huong cho muc tieu ban dau: chot danh sach chuc nang theo role truoc khi viet luong chi tiet. Cach tach role Seller/Admin/Ke toan/Van hanh/CSKH la hop ly, de khach hang xem nhanh va tranh bi cuon vao chi tiet qua som.

Sau khi lam ro them luong nghiep vu, can xem Zootop Bear la he thong trung gian/orchestration layer: seller thao tac tren Zootop Bear, con 5 nen tang FlashShip/SimplePrint/PrintBelle/ART ADD/Snap Ecom dong vai tro "xuong" fulfillment ben ngoai. Zootop Bear se tao don len cac nen tang do bang account seller da tao san, call API/webhook neu ho tro, dong thoi tinh gia seller theo quy tac rieng cua Zootop Bear.

Tuy nhien, neu doi chieu voi `doc/QA khách hàng v1.xlsx` va `doc/ke-hoach-chi-tiet.xlsm`, bo use case hien tai dang thieu mot so cum chuc nang da duoc khach chot hoac da nam trong ke hoach: 5 nen tang supplier/fulfillment, import CSV validation/batch, Telegram notification, product detail, supplier status sync, 17TRACK webhook, wallet ledger chi tiet, order state machine, dashboard/filter/cot hien thi va phan quyen noi bo theo seller phu trach.

Khuyen nghi: giu format HTML hien tai, nhung bo sung/sua danh sach use case truoc khi gui khach chot phase 1.

Cap nhat tu phan hoi khach trong sheet `Xác nhận role 21-07`:

- Khach da confirm danh sach role va cac use case de xuat.
- UC-SEL-10: seller duoc tu huy don trong vong 30 phut ke tu sau khi len don; sau 30 phut can lien he support de ho tro huy.
- Khach muon them chuc nang ticket giong Simple Hub: seller tao ticket khi co van de can sua voi don hang, sau do ticket/van de do duoc day API den xưởng/nền tảng tương ứng.

## 1. Diem dang on

- Tach theo role ro rang: Seller, Admin, Ke toan, Van hanh, CSKH.
- Co nhan `Can chot` va `Should`, phu hop giai doan chot scope.
- Trang tong quan co checkpoint cho nhung diem mo nhu huy don/credit, phan quyen Van hanh, dashboard admin.
- `seller.html` da co mau chi tiet cho UC-SEL-01, dung de lam template cho cac use case tiep theo: precondition, luong chinh, ngoai le, business rules.
- Bo UI de khach bam tung use case xem mo ta, phu hop voi buoi review/chot chuc nang.

## 2. Diem lech/thiếu so voi tai lieu QA va ke hoach

### P0 - Can sua truoc khi chot voi khach

0. Bo use case chua the hien ro ban chat "Zootop Bear la lop trung gian day don sang 5 nen tang/xuong".
   - Seller khong thao tac truc tiep tren FlashShip/SimplePrint/PrintBelle/ART ADD/Snap Ecom.
   - Zootop Bear da co account seller tren tung nen tang va se dung API/webhook cua cac nen tang do de tao don/nhan trang thai.
   - Can them use case/cum use case ve mapping template fulfill -> order noi bo -> API tung nen tang.

1. `index.html` va overview HTML chua the hien dung pham vi supplier/platform.
   - HTML dang noi chung "xưởng"; sheet `thông tin account nhà cung cấp` dang co 5 nen tang: FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom.
   - Nen sua wording thanh "nhà cung cấp/nền tảng fulfillment" va nhan manh phase 1 can van hanh/tich hop theo kha nang thuc te cua 5 nen tang nay.

2. Use case Seller thieu luong "nhap don theo file/batch validation".
   - `seller.html` hien co UC-SEL-05 "Tao don hang - Import CSV hoac API", nhung QA/ke hoach tach ro: chot template CSV, upload doc file, bao loi tung dong, tao don theo lo.
   - File mau hien co `doc/Template fulfill Home decor xưởng US.xlsx` gom cac cot: Date, Ma khach hang, Tracking number, Order ID, Shipping method, Customer info/address, Link Label, SKU, Quantity, Variant id, Design front, Mockup Front, Product Note.
   - Nen tach hoac it nhat mo rong UC-SEL-05 thanh 2 use case: tao don le/API va import CSV/batch.

3. Trang thai don chua duoc dua vao use case.
   - Khach da neu state: Imported, Confirm, Pending, In Production, Shipped, In transit, Delivery, Hold, Cancel.
   - Nen bo sung vao Seller tracking, Admin/Van hanh xu ly don va Huy don. Day la backbone de chot chuc nang.

4. Wallet/top-up chua phan biet ro "yeu cau nap", "duyet nap", "ledger", "tru tien khi confirm", "pending khi thieu tien".
   - Seller UC-SEL-04 va Ke toan UC-ACC-01/03 dang dung nhung qua ngan.
   - Nen ghi ro don chi duoc day admin/supplier khi da thanh toan/du so du; thieu tien thi Pending; credit dac biet la ngoai le can chot.

5. Supplier/API integration dang chua du manh.
   - Admin UC-ADM-05 va Van hanh UC-OPS-01/02 co nhac API/retry, nhung chua co: luu credential an toan, mapping supplier product/variant, gui don supplier/platform, nhan status, nhat ky ket noi, retry loi.
   - Can them nghiep vu mapping du lieu: SKU/Variant noi bo voi SKU/Variant cua tung platform; address/shipping method/label/design/mockup/note voi request payload cua tung API.
   - Trong ke hoach, day la phan rui ro lon nhat timeline. Nen de thanh cum use case ro hon.

6. Tracking chua ro 17TRACK webhook va du lieu seller can xem.
   - UC-SEL-07 chi ghi "Dashboard, filter, 17TRACK"; UC-OPS-03 la "tracking thieu".
   - QA da chot seller can xem tracking number, carrier, link, trang thai van chuyen, ngay giao du kien; tracking tu supplier API va 17TRACK webhook.

7. Thieu Telegram notification.
   - Ke hoach da bao gom thong bao Telegram khi tao don, khi nhap file va luu lich su thong bao.
   - HTML hien tai khong co role/use case nao nhac Telegram. Nen them vao Admin/Van hanh hoac System/Notification section.

8. Admin can duoc the hien la role full quyen.
   - Rule da chot: Admin duoc phep lam moi thao tac trong he thong, bao gom quan ly tien/vi/top-up/refund/credit.
   - Cac role Ke toan, Van hanh, CSKH moi can gioi han pham vi quyen theo nghiep vu.

9. Chua the hien hai lop gia rieng biet.
   - Gia seller tra cho Zootop Bear la bang gia noi bo theo tier/fee/rule rieng.
   - Gia/cost khi tao don tren FlashShip/SimplePrint/PrintBelle/ART ADD/Snap Ecom la gia rieng cua tung platform, dung de doi soat noi bo.
   - Use case pricing/order can noi ro dieu nay de tranh khach hieu nham he thong lay nguyen gia platform lam gia seller.

### P1 - Nen bo sung de danh sach chuc nang day du hon

1. Seller thieu "xem product detail".
   - QA/ke hoach nhan manh product detail gom SKU, variant, size/mau, production time, base cost, shipping fee, print area, mockup/template, description.
   - UC-SEL-02 nen mo rong thanh Catalog + Product detail, hoac tach UC rieng.

2. Seller "Tải template thiết kế" dang gan `Should`, nhung QA tra loi "Co template tai ve" va ke hoach xem upload thiet ke la core neu POD.
   - Template tai ve co the la Should, nhung upload link/file thiet ke khi tao don la Must have.
   - Nen tranh de khach hieu "thiet ke/artwork" la optional.

3. CSKH da duoc bo sung ticket nhung can lam ro quyen xem chi tiet.
   - CSKH hien co xem seller/don phu trach, ghi chu, tiep nhan ticket va escalate.
   - Can chot CSKH duoc xem toi dau: gia, vi, file thiet ke, loi san xuat, ghi chu noi bo.

4. Van hanh chua co "dashboard/filter theo supplier/status/payment/product".
   - Ke hoach co bang theo doi quan tri va phan quyen xem don theo nhan vien.
   - Nen them use case xem bang theo doi va filter, khong chi "theo doi don gui xuong".

5. Ke toan thieu "billing history cho seller" neu seller can xem lich su nap/top-up.
   - Hien UC-ACC-04 la export billing history `Should`; QA tra loi can billing history cho top-up.
   - Nen xac dinh day la Must hay Should.

6. Admin Dashboard (UC-ADM-08) qua rong.
   - Nen tach dashboard tong va audit log, vi audit log la yeu cau bao mat/doi soat tien va dashboard la nhu cau van hanh.

### P2 - Cai thien cach trinh bay

1. Count use case tren sidebar va index se phai cap nhat thu cong.
   - `sidebar.js` hard-code count. Neu them use case de khop scope, can sua ca sidebar va index.

2. Gan nhan `Should` can co tieu chi ro.
   - Hien "Tải template thiết kế", "Export billing history", "Theo dõi tracking thiếu", "Ghi chú hỗ trợ" la Should.
   - Mot so muc co the can nang len Must sau khi doi chieu QA/ke hoach.

3. Cac use case ngoai UC-SEL-01 deu placeholder.
   - Chap nhan duoc neu muc tieu chi la chot danh sach.
   - Nhung khi gui khach, nen moi use case co it nhat: muc dich, actor, trigger, ket qua, diem can chot. Chua can luong chi tiet.

## 3. Review theo tung file HTML

### `index.html`

Dang on:
- Vai tro hien ro, co summary va diem can chot.
- Phu hop lam trang dau cho buoi review.

Can sua:
- Them thong tin scale va supplier/platform: 50-500 seller, peak 1.000-1.500 don/ngay, 5 nen tang supplier.
- Sua "xưởng" thanh "nhà cung cấp/nền tảng fulfillment" de khop voi QA.
- Them "Telegram notification" va "17TRACK webhook" vao pham vi neu muon khach chot dung.
- Diem can chot nen them:
  - Cong thuc gia don nhieu san pham.
  - Dashboard/filter/cot cho Seller/Admin.
  - Account/API docs/sandbox 5 nen tang supplier truoc 31/07/2026.
  - Quy trinh audit/ly do bat buoc cho thao tac tien cua Admin va Ke toan.

### `seller.html`

Dang on:
- 11 use case bao phu cac hanh dong seller lon: dang ky, catalog, template, top-up, tao/nhap don, upload thiet ke, xem gia, theo doi, huy, ticket.
- UC-SEL-01 co chi tiet tot va dung style.

Can sua:
- UC-SEL-02 nen ghi ro catalog + product detail + full price breakdown theo tier.
- UC-SEL-03 de `Should` co the gay hieu nham. Nen tach:
  - Tai mockup/template: Should/Maybe.
  - Upload link/file thiet ke khi tao don: Must.
- UC-SEL-04 nen them "tao yeu cau nap tien" thay vi chi "nap tien vao vi", vi thuc te Admin/Ke toan ghi nhan credit.
- UC-SEL-05 nen tach tao don le/API va import CSV/batch; them validation tung dong.
- UC-SEL-07 nen gan voi state machine va 17TRACK data fields.
- UC-SEL-08 can giu `Can chot`, nhung nen them noi dung: huy truoc san xuat, supplier fail/tu choi, refund ledger, khong cho huy sau trang thai nao.

### `admin.html`

Dang on:
- Bao phu nhom quan tri he thong kha rong.
- Co nhac seller, catalog, gia, xưởng/API, don hold/retry, credit, dashboard/audit.

Can sua:
- UC-ADM-01 nen them gan nhan vien phu trach seller.
- UC-ADM-03 nen them product detail, variant ID, print area, template/mockup link, mapping supplier.
- UC-ADM-04 nen them ship by TikTok/label fee, ship by seller, add item fee, rule don nhieu san pham.
- UC-ADM-05 nen dung "supplier/nền tảng fulfillment" va ghi ro 5 nen tang: FlashShip, SimplePrint, PrintBelle, ART ADD, Snap Ecom; credential, status sync, webhook/API neu co.
- UC-ADM-06 co the trung voi Van hanh; nen chot Admin la override/toan quyen, Van hanh la xu ly hang ngay.
- UC-ADM-07 credit dac biet lien quan tien, nen them audit/han muc/nguoi phe duyet.
- UC-ADM-08 nen tach Dashboard va Audit log hoac mo ta ro cot/filter.

### `ketoan.html`

Dang on:
- Dung trong tam tai chinh: duyet nap, dieu chinh vi, ledger, export.

Can sua:
- UC-ACC-01 nen ghi ro approve/reject yeu cau nap tien tu seller, doi chieu chung tu, cong vi sau khi duyet.
- UC-ACC-02 nen them bat buoc ly do, file dinh kem neu co, audit log, so du truoc/sau.
- UC-ACC-03 nen gan voi ledger tien that: top-up, debit order, refund, adjustment, credit dac biet.
- UC-ACC-04 co the nen nang tu Should len Must neu "billing history cho top-up" la yeu cau go-live.

### `vanhanh.html`

Dang on:
- Dung nhom nghiep vu: theo doi don gui supplier/xuong, hold/error, tracking thieu.

Can sua:
- "Cần chốt: Vận hành xem toàn bộ đơn hay giới hạn theo seller phụ trách" da dung, nhung theo ke hoach co "nhan vien chi xem seller minh phu trach"; nen de thanh cau hoi chung cho CSKH/Van hanh.
- UC-OPS-01 nen them filter theo supplier, status, payment, product, ngay.
- UC-OPS-02 nen them retry API, xem log loi, hold do design, supplier fail/tu choi.
- UC-OPS-03 neu tracking la 17TRACK + supplier API thi co the la Must cho van hanh, khong chi Should, neu muc tieu go-live can theo doi van chuyen.

### `cskh.html`

Dang on:
- Khop voi role CSKH trong QA: ho tro seller duoc phan cong.

Can sua:
- UC-SUP-01 nen ghi ro xem danh sach don + chi tiet don + tracking cua seller phu trach.
- UC-SUP-02 "ghi chu ho tro tren don" co the la Must neu day la cach CSKH phoi hop voi Van hanh/Admin.
- Nen can nhac them "tao/gan ticket ho tro" hoac "escalate don loi" neu quy trinh CSKH co can.

## 4. Review ky thuat HTML/CSS/JS

### Diem on

- Static HTML gon, de mo truc tiep bang browser.
- Dung `shared.css`, `shared.js`, `sidebar.js` de tranh lap code.
- Modal chi tiet co click backdrop va Escape de dong.
- UI co theme theo role va co visual diagram de khach de hieu.

### Van de nen sua

1. Chua responsive cho mobile.
   - `shared.css` co sidebar fixed width 260px, diagram flex ngang, connector 90px.
   - Tren mobile de bi tran ngang va kho doc.
   - Nen them `@media` de sidebar thanh top nav hoac collapsible, diagram xep doc, an connector lines.

2. Use case pill co nguy co de text de len code/flag.
   - `.uc-code` nam absolute ben trai, `.uc-flag` absolute ben phai, trong khi title/sub can giua.
   - Neu title dai, text co the va vao code/flag. Nen them padding trai/phai lon hon hoac dung grid layout.

3. Actor SVG luon dung `stroke="var(--purple)"`.
   - Seller/Ke toan/Van hanh/CSKH van ve actor mau purple. Nen theo theme/accent hien tai.

4. Bien `startX` trong `shared.js` duoc khai bao nhung khong dung.
   - Nen xoa de code sach hon.

5. `innerHTML` dung truc tiep voi use case detail/title/sub.
   - Hien data la local hard-code nen chap nhan duoc.
   - Neu sau nay lay data tu file/JSON/user input, can sanitize de tranh XSS.

6. Thieu semantic/accessibility cho use case item.
   - `.uc-pill` la `div` click duoc, keyboard user khong focus/click bang Enter duoc.
   - Nen dung `<button>` hoac them `role="button"`, `tabindex="0"` va key handler.

7. Modal close dung inline `onclick`.
   - Chay duoc, nhung nen gan event listener trong JS de nhat quan va de maintain.

8. Count use case hard-code o nhieu noi.
   - Khi them/sua UC de khop scope, de quen update count tren sidebar/index.
   - Nen gom data role/use case vao mot file JS data chung, render sidebar va trang tu cung mot source.

## 5. Danh sach use case de nghi sau review

Day la goi y de bo HTML khop hon voi QA/kế hoạch, van giu muc tieu "chot chuc nang theo role":

### Seller

- UC-SEL-01 Dang ky tai khoan, cho Admin duyet.
- UC-SEL-02 Xem catalog va product detail theo tier.
- UC-SEL-03 Tai mockup/template san pham.
- UC-SEL-04 Tao yeu cau top-up va xem so du/ledger.
- UC-SEL-05 Tao don le/API voi tinh gia truoc khi confirm.
- UC-SEL-06 Import CSV va xem ket qua validation theo dong/batch.
- UC-SEL-07 Upload/link file thiet ke cho order item.
- UC-SEL-08 Xem breakdown gia va thanh toan bang vi.
- UC-SEL-09 Theo doi don, trang thai va tracking 17TRACK.
- UC-SEL-10 Huy don/nhan hoan tien: tu huy trong 30 phut, sau 30 phut lien he support.
- UC-SEL-11 Tao ticket ho tro don hang.

### Admin

- UC-ADM-01 Duyet/khoa seller, gan tier, gan nhan vien phu trach.
- UC-ADM-02 Quan ly tai khoan noi bo va ma tran phan quyen.
- UC-ADM-03 Quan ly catalog/product detail/variant/template.
- UC-ADM-04 Cau hinh bang gia, ship fee, label fee, add item fee.
- UC-ADM-05 Quan ly supplier/nen tang fulfillment va thong tin ket noi.
- UC-ADM-06 Mapping san pham/variant voi supplier/platform va routing theo san pham.
- UC-ADM-07 Theo doi don, filter, dashboard tong.
- UC-ADM-08 Xu ly don Hold/loi/retry supplier API.
- UC-ADM-09 Cap credit dac biet/override tien co audit.
- UC-ADM-10 Xem audit log va lich su thao tac quan trong.
- UC-ADM-11 Quan ly ticket ho tro va dong bo ticket/API toi xuong.

### Ke toan

- UC-ACC-01 Duyet/tu choi yeu cau top-up.
- UC-ACC-02 Dieu chinh vi thu cong co ly do/audit.
- UC-ACC-03 Xem ledger vi theo seller/don/giao dich.
- UC-ACC-04 Xem/export billing/top-up history.
- UC-ACC-05 Xu ly refund khi huy don/supplier fail.

### Van hanh

- UC-OPS-01 Xem bang theo doi don va filter theo ngay/seller/status/supplier/payment/product.
- UC-OPS-02 Theo doi don da gui supplier va nhat ky ket noi.
- UC-OPS-03 Xu ly don Hold do design/du lieu.
- UC-OPS-04 Retry don gui loi hoac supplier fail/tam loi.
- UC-OPS-05 Theo doi tracking thieu/cham cap nhat.
- UC-OPS-06 Theo doi ticket gui xuong va trang thai xu ly.

### CSKH

- UC-SUP-01 Xem seller duoc phan cong va don/tracking lien quan.
- UC-SUP-02 Ghi chu ho tro tren don.
- UC-SUP-03 Tiep nhan ticket cua seller.
- UC-SUP-04 Escalate don loi/Hold cho Van hanh/Admin hoac xuong.

## 6. Cau hoi can hoi lai khach

1. Van hanh va CSKH co cung bi gioi han theo seller duoc phan cong khong?
2. Ke toan co quyen thao tac nhung phan nao ngoai top-up/ledger/refund khong?
3. Billing history/top-up export la bat buoc go-live hay de sau?
4. Tracking thieu/cham cap nhat la chuc nang bat buoc cho Van hanh trong phase 1 hay chi can seller xem tracking?
5. Telegram notification gui cho ai: nhom noi bo, seller, hay ca hai?
6. Credit dac biet co han muc/thoi han/nguoi phe duyet khong? Admin full quyen, nhung co can them audit/ly do bat buoc khong?
7. Huy don duoc phep toi trang thai nao: Imported, Confirm, Pending, truoc In Production, hay tuy supplier?
8. Khi supplier fail/tu choi don, he thong tu refund hay can Admin/Ke toan duyet refund?
9. Don nhieu san pham tinh ship/add item fee theo vi du nao la chuan?
10. File/link Google Drive thiet ke can kiem tra quyen truy cap tu dong hay chi luu link va de Van hanh/supplier xu ly khi loi?
11. Moi cot trong `Template fulfill Home decor xưởng US.xlsx` lay tu dau: seller nhap, catalog noi bo, he thong tu sinh, hay supplier/17TRACK tra ve?
12. SKU/Variant ID trong template la SKU/Variant noi bo cua Zootop Bear hay SKU/Variant cua tung nen tang fulfillment?
13. Khi mot san pham co tren nhieu nen tang, rule chon FlashShip/SimplePrint/PrintBelle/ART ADD/Snap Ecom la gi?
14. Gia/cost tren nen tang fulfillment co can luu va hien thi cho Admin/Ke toan de doi soat loi nhuan khong?
15. Neu nen tang khong co API/webhook day du, phase 1 co chap nhan thao tac ban tu dong/manual fallback khong?
16. Simple Hub ticket can tham khao nhung field/trang thai nao de ap dung cho Zootop Bear?
17. Tung nen tang/xuong co API tao ticket/issue/message khong? Neu khong co, ticket se duoc xu ly thu cong hay gui qua kenh nao?

## 7. Ket luan de hanh dong

Bo use case hien tai co the dung de demo cach trinh bay, nhung chua nen xem la danh sach scope cuoi. Nen cap nhat lai danh sach use case theo cac muc P0 truoc, sau do moi viet detail cho tung use case. Neu thoi gian gap, toi thieu can bo sung cac cum: Zootop Bear lam orchestration layer, 5 nen tang supplier/fulfillment, mapping template/API, hai lop gia rieng biet, import CSV/batch, wallet ledger/refund, order state machine, 17TRACK, Telegram va phan quyen noi bo.
