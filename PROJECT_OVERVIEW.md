# Zootop Bear - Project Overview

## 1. Muc dich du an

Zootop Bear la he thong portal van hanh fulfillment/POD cho seller. Seller la khach hang chinh cua Zootop Bear va thao tac tren he thong cua Zootop Bear, khong thao tac truc tiep tren cac nen tang fulfillment ben ngoai.

He thong Zootop Bear dong vai tro lop trung gian/orchestration layer:

1. Seller tao/nhap don tren he thong Zootop Bear.
2. Zootop Bear tinh gia rieng cho seller theo catalog, tier, phi ship/label va quy tac noi bo.
3. Zootop Bear mapping du lieu don sang cac nen tang fulfillment/xuong ben ngoai.
4. Zootop Bear call API cua nen tang phu hop de tao don.
5. Nen tang fulfillment cap nhat trang thai/tracking ve Zootop Bear qua API/webhook.
6. Seller chi xem trang thai, tracking, chi phi va lich su tren he thong Zootop Bear.
7. Neu don hang co van de hoac can sua, seller tao ticket tren Zootop Bear; ticket duoc chuyen/bo sung qua API toi nen tang/xuong tuong ung neu nen tang ho tro.

Doi noi bo Zootop Bear dung he thong de quan ly seller, catalog, bang gia, vi tien, don hang, nha cung cap/xuong, mapping du lieu, ket noi API va doi soat.

Muc tieu phase 1 la chot dung va du pham vi chuc nang theo tung role truoc, sau do moi di vao dac ta chi tiet tung luong.

## 2. Boi canh va quy mo

- Nguoi dung chinh: Seller portal va supplier/admin internal portal.
- Role noi bo phase 1: Admin Zootop Bear, Ke toan, Van hanh, CSKH.
- Quy mo seller hien tai/du kien gan: 50-500 seller.
- Tai don hien tai: khoang 200-300 don/ngay, 5.000-7.000 don/thang.
- Tai peak du kien: 1.000-1.500 don/ngay, khoang 30.000 don/thang trong cao diem tu giua thang 9 den het thang 12.
- Nha cung cap/nen tang fulfillment: hien co 5 nen tang supplier, co the mo rong len 10; ve ban chat day la "xuong" cua Zootop Bear, nhung thao tac thong qua account seller tren tung nen tang.

## 3. Pham vi phase 1

### Da bao gom

- Trang gioi thieu va form lien he/dang ky.
- Dang nhap, tai khoan, phan quyen theo role.
- Quan ly seller: dang ky/tao moi, duyet, khoa, gan nhan vien phu trach, gan tier.
- Catalog san pham: nhom san pham, san pham, variant, anh, mo ta, file mockup/template, mapping san pham voi nha cung cap.
- Cau hinh gia theo tier, nha cung cap/xuong, shipping, label fee va cac phu phi.
- Vi tien/top-up: tao yeu cau nap, upload chung tu, duyet/tu choi nap, ledger, dieu chinh vi thu cong.
- Tao don/nhap don: import CSV/API, nhap thong tin nguoi nhan, san pham, so luong, link/file thiet ke, tinh gia.
- Thanh toan don: kiem tra so du, tru tien khi xac nhan, xu ly don pending khi thieu tien.
- Huy don/hoan tien: huy truoc san xuat, hoan tien khi supplier fail/tu choi, ghi lich su.
- Ticket ho tro don hang: seller tao ticket, CSKH/Van hanh/Admin theo doi va day van de/sua don sang nen tang/xuong tuong ung.
- Gui don sang supplier qua API, nhan trang thai tu supplier, retry loi, nhat ky ket noi.
- Ma van don: luu tracking number/carrier/link neu supplier tra ve, hien thi cho seller; khach da chot khong lam 17TRACK/modal tracking trong Phase 1.
- Thong bao Telegram cho tao don/nhap file va luu lich su thong bao.
- Backup du lieu, log loi va giam sat co ban.

### Chua bao gom

- Ket noi gian hang/san thuong mai nhu TikTok, Shopify, Etsy, Shopee.
- Cong cu thiet ke san pham tren web.
- Cong cu tao mockup nang cao.
- Bao cao phan tich nang cao.
- Module CRM cho khach cuoi cua seller; phase 1 chi luu thong tin nguoi nhan nhu shipping info trong don.

## 4. Role va trach nhiem chinh

| Role | Trach nhiem chinh |
| --- | --- |
| Seller | Dang ky, xem catalog, tai template, nap tien, tao/nhap don, xem gia, theo doi don va tracking, huy don trong 30 phut, tao ticket ho tro don hang. |
| Admin | Full quyen voi he thong: quan ly seller, tai khoan noi bo, catalog, bang gia, supplier/xuong, don, vi tien, top-up/refund, credit dac biet, ticket, dashboard va audit log. |
| Ke toan | Duyet/tu choi nap tien, dieu chinh vi, xem ledger, export billing/top-up history. |
| Van hanh | Theo doi don gui supplier/xuong, xu ly don hold/loi, retry, theo doi tracking thieu va ticket gui xuong. |
| CSKH | Xem don cua seller duoc phan cong, ghi chu, tiep nhan ticket va ho tro xu ly van de tren don. |

## 5. Module nghiep vu loi

### Seller va phan quyen

Seller tu dang ky va cho Admin duyet. Seller duoc phan tier theo san luong/ngay:

- Tier 1: 1-100 items/day.
- Tier 2: 101-300 items/day.
- Tier 3: 301-1000 items/day.

Admin la role full quyen va duoc phep thao tac moi phan trong he thong. Cac role noi bo khac co the bi gioi han theo seller duoc gan, tuy tung role va quy tac phan quyen cuoi cung.

### Catalog va pricing

Catalog gom Product Name, Shipping Carrier, Size, Production Time, base cost theo tier, SKU/Variant ID, anh, mau, chat lieu, print area, phi ship, link mockup/template va mo ta san pham.

Gia phu thuoc tier va supplier/xuong. Khach da xac nhan seller duoc xem full breakdown. Hai nhom cong thuc dang duoc neu:

- Don label ship/Ship by TikTok: `(Base cost + label fee) * so luong`.
- Don ship by seller: tinh theo base cost, ship fee va add item fee; voi don nhieu san pham can chot quy tac lay san pham gia cao nhat.

### Vi tien va thanh toan

Seller top-up truoc, Admin/Ke toan ghi nhan credit. Don chi duoc xac nhan/day xuong khi da thanh toan/du so du. Neu khong du tien, don o trang thai Pending. Mot so seller dac biet co the duoc set credit dac biet/credit gia de day don truoc.

Tat ca giao dich vi can co ledger: nap, tru, hoan, dieu chinh, thoi gian, so tien, nguoi thao tac, ly do va nen tang thanh toan neu co.

### Don hang va trang thai

Seller tao don qua import CSV hoac API. Don can du thong tin theo template fulfill co dinh, gom thong tin nguoi nhan, san pham/variant, so luong, hinh thuc ship va link Google Drive/file thiet ke.

Trang thai don khach da neu:

- Imported
- Confirm
- Pending
- In Production
- Shipped
- In transit
- Delivery
- Hold
- Cancel

### Luong tao don tong quat

Seller se dien/nhap du lieu theo template fulfill. File mau hien co: `doc/Template fulfill Home decor xưởng US.xlsx`.

Template hien co cac cot:

| Nhom du lieu | Cot trong template | Nguon du lieu can lam ro trong he thong |
| --- | --- | --- |
| Don hang | Date, Order ID, Ma khach hang | Tao tu he thong Zootop Bear, import tu file seller, hoac external ID seller cung cap. |
| Van chuyen | Shipping method, Link Label, Tracking number | Seller nhap, he thong tinh/chon theo product/shipping rule, hoac supplier tra ve. Khong lam 17TRACK trong Phase 1. |
| Nguoi nhan | Customer's name, Email, Phone, Country, State, Address line 1, Address line 2, City, Zip | Seller nhap trong template/import; phase 1 luu nhu shipping info cua don, khong phai CRM khach cuoi. |
| San pham | SKU, Quantity, Variant id | Lay tu catalog Zootop Bear va mapping voi SKU/variant cua tung supplier platform. |
| Thiet ke | Design front, Mockup Front, Product Note | Seller cung cap link/file thiet ke/mockup/note khi tao don; can kiem tra quyen truy cap va mapping sang API tung nen tang. |

Sau khi seller upload/import template:

1. He thong doc file va validate tung dong.
2. He thong map SKU/Variant trong file voi catalog noi bo.
3. He thong xac dinh supplier/platform phu hop theo product routing.
4. He thong tinh gia ban cho seller theo bang gia noi bo cua Zootop Bear.
5. He thong kiem tra so du vi/credit dac biet.
6. Neu du dieu kien, he thong tao don noi bo va call API sang supplier/platform.
7. He thong luu supplier order id, request/response log, gia von/phi ben supplier neu co, va trang thai gui don.
8. Supplier/platform tra trang thai/tracking ve he thong qua webhook/API polling.
9. Seller xem trang thai/tracking tren dashboard Zootop Bear.

### Hai lop gia rieng biet

He thong can tach ro 2 lop gia:

- Gia seller phai tra cho Zootop Bear: tinh theo catalog noi bo, tier seller, shipping/label fee va cac quy tac kinh doanh cua Zootop Bear.
- Gia/cost khi Zootop Bear tao don tren nen tang fulfillment: la gia rieng cua tung platform/supplier, dung cho doi soat noi bo, loi nhuan va cau hinh routing; seller khong nhat thiet thay gia nay.

Day la diem quan trong: tao don sang FlashShip/SimplePrint/PrintBelle/ART ADD/Snap Ecom khong dong nghia voi dung cung mot gia hien thi cho seller tren Zootop Bear.

### Supplier/nen tang fulfillment va tracking

Phase 1 can lam viec voi 5 nen tang supplier/fulfillment da co account trong sheet `thong tin account nhà cung cấp` cua file QA. Ve ban chat, cac nen tang nay chinh la cac "xuong" san xuat/fulfillment cua Zootop Bear:

| Nen tang | Link |
| --- | --- |
| FlashShip | https://seller.flashship.net/ |
| SimplePrint | https://seller.simpleprint.io/login |
| PrintBelle | https://fulfillment.printbelle.com/user/login |
| ART ADD | https://www.artsadd.com/custom/long_island_factory-1578 |
| Snap Ecom | https://sellers.snapecom.com/admin |

Thong tin account/password khong copy vao overview de tranh lo credential; xem file QA goc khi can dang nhap/test.

Zootop Bear da tao account seller tren cac nen tang nay. He thong Zootop Bear se dung account/credential do de tao don len nen tang bang API neu nen tang ho tro. Can doc tai lieu API cua tung nen tang de lam ro:

- API tao don can nhung field nao.
- SKU/Variant/Product ID cua Zootop Bear map sang field nao cua nen tang.
- Link design/mockup/note truyen sang nen tang theo format nao.
- Shipping address, shipping method, label, carrier, tracking map ra sao.
- Nen tang co webhook trang thai/tracking khong, hay can polling API.
- Nen tang tra ve supplier order id, status code, error code, tracking data nhu the nao.

Rule routing theo san pham. Supplier/platform khong can thay thong tin seller thuc te cua Zootop Bear neu khong bat buoc. Supplier cap nhat trang thai qua API/webhook hoac theo kha nang thuc te cua tung nen tang; tracking number/carrier lay tu supplier/platform. Khach da chot khong lam 17TRACK/modal tracking trong Phase 1.

Seller can xem tracking number, carrier/tracking link neu supplier co tra ve va trang thai don de hieu tren Zootop Bear.

### Ticket ho tro don hang

Khach da yeu cau them chuc nang tao ticket tuong tu Simple Hub. Luong tong quat:

1. Seller mo don hang va tao ticket khi co van de can sua/ho tro.
2. Seller nhap noi dung van de, loai yeu cau, ghi chu, file/link bo sung neu co.
3. He thong xac dinh don dang thuoc nen tang/xuong nao.
4. He thong luu ticket noi bo va day ticket/van de qua API toi nen tang/xuong tuong ung neu API ho tro.
5. CSKH/Van hanh/Admin theo doi ticket va cap nhat trang thai xu ly cho seller.

Can lam ro them voi tung nen tang: co API tao ticket/issue/message khong, field bat buoc la gi, co webhook phan hoi ticket khong, va neu nen tang khong co API ticket thi fallback thao tac thu cong nhu the nao.

## 6. Timeline ke hoach

| Giai doan | Thoi gian | Noi dung chinh | Gio |
| --- | --- | --- | ---: |
| Giai doan 0 | 20/07-31/07/2026 | Chot thong tin, API docs/sandbox 5 supplier, quy tac vi/huy don | 40 |
| Giai doan 1 | 08/2026 | Nen tang, account, phan quyen, seller, catalog | 145 |
| Giai doan 2 | 09/2026 | Gia, vi tien, tao don, nhap don bang file | 150 |
| Giai doan 3 | 10/2026 | Thanh toan don, dashboard, Telegram, supplier dau tien | 140 |
| Giai doan 4 | 11/2026 | Ket noi du 5 supplier, tracking, server, backup/giam sat | 145 |
| Giai doan 5 | 12/2026 | Chay thu, sua loi, chinh giao dien, du lieu, ban giao | 130 |

Tong ke hoach: 98 task, 750 gio, khong cong buffer rieng.

## 7. Dieu kien va rui ro can chot som

- API docs, sandbox/tai khoan test va contact ky thuat cua 5 supplier/nen tang can co truoc 31/07/2026.
- Can chot ro trang thai nao duoc huy, cach hoan tien, ai duoc dieu chinh vi va cach xu ly supplier fail/tu choi don.
- Rule huy don da duoc khach tra loi o muc role: seller tu huy trong 30 phut sau khi len don; sau 30 phut can lien he support ho tro huy.
- Can chot chi tiet ticket: loai ticket, field bat buoc, file dinh kem/link, trang thai ticket va kha nang day API ticket sang tung nen tang/xuong.
- Can chot cong thuc gia cuoi cung, dac biet don nhieu san pham va phan biet label ship/ship by seller.
- Can chot data mapping tu template fulfill vao order noi bo va tu order noi bo sang API tung nen tang supplier.
- Can chot cach tach gia seller va gia/cost tren nen tang fulfillment.
- Can chot ma tran quyen cho cac role khong phai Admin: Ke toan, Van hanh, CSKH xem/toi dau va thao tac/toi dau. Admin la full quyen.
- Can chot dashboard admin: cot, filter, bao cao van hanh can thiet.
- Can chot cach luu/kiem tra link Google Drive/file thiet ke: quyen truy cap, dung luong, dinh dang, mapping voi order item.
- Rui ro lon nhat cua timeline la ket noi 5 supplier/nen tang neu tai lieu API thieu, khong co sandbox hoac quy trinh thuc te cua tung nen tang khac API.

## 8. Trang thai bo HTML use case hien tai

Bo HTML hien tai gom 5 trang role va 1 trang tong quan:

- `index.html`: tong quan role va cac diem can chot.
- `seller.html`: 11 use case Seller, moi UC-SEL-01 co chi tiet luong.
- `admin.html`: 11 use case Admin.
- `ketoan.html`: 5 use case Ke toan.
- `vanhanh.html`: 6 use case Van hanh.
- `cskh.html`: 4 use case CSKH.

Bo use case hien tai dung huong cho muc tieu chot role/function truoc, nhung can bo sung/chinh lai mot so diem de khop voi QA va ke hoach chi tiet, dac biet: 5 nen tang supplier/fulfillment, Telegram, import CSV validation/batch, product detail/template, wallet ledger, order state machine, cancellation/refund va phan quyen noi bo.
