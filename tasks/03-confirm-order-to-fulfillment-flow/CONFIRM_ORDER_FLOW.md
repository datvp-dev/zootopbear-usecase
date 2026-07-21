# Confirm: Order to fulfillment flow

## 1. Tom tat luong can chot

Luong can confirm:

1. Seller tao don le, goi API, hoac import file.
2. He thong validate thong tin don, nguoi nhan, san pham, so luong, shipping, design/mockup.
3. He thong tinh gia seller phai tra theo tier, product, shipping, label fee, add item fee.
4. Seller xem breakdown gia va confirm.
5. He thong kiem tra vi/credit.
6. Neu du dieu kien, he thong tru tien va tao don noi bo.
7. He thong routing don theo product sang supplier/nen tang fulfillment phu hop.
8. He thong day don sang supplier bang API neu co, hoac dua vao hang cho xu ly thu cong neu chua co API.
9. Supplier/17TRACK cap nhat status va tracking ve Zootop Bear.
10. Seller xem status/tracking tren dashboard Zootop Bear.

## 2. Cau hoi quan trong nhat

Tu luc seller import/tao don den luc don duoc gui sang supplier, he thong can xu ly tu dong hoan toan theo rule vi va tinh tien, hay can Admin/Van hanh kiem tra truoc khi gui?

Can chot 1 trong 2 huong:

- Huong A: Tu dong. Seller confirm va du tien thi he thong tu tru vi, tu routing, tu gui supplier.
- Huong B: Ban tu dong. Seller confirm va du tien thi don vao hang doi noi bo, Admin/Van hanh kiem tra roi moi gui supplier.

## 3. Import va tao don

Can confirm:

1. Seller duoc tao don bang nhung cach nao trong phase 1?
   - Tao don le tren UI.
   - Import CSV/Excel.
   - Goi API tu he thong seller.

2. Truong nao bat buoc khi tao/import don?
   - Order ID.
   - Shipping method.
   - Customer name.
   - Phone/email.
   - Country/state/city/address/zip.
   - SKU.
   - Variant ID.
   - Quantity.
   - Design front.
   - Mockup front.
   - Product note.
   - Link label.

3. Neu import file co dong loi thi xu ly the nao?
   - Import cac dong hop le, dong loi bi reject.
   - Reject ca file neu co bat ky dong loi.
   - Cho seller sua loi tren man hinh roi import lai.

4. Mot order co nhieu san pham thi file import the hien nhu the nao?
   - Moi san pham la mot dong, trung Order ID.
   - Moi order la mot dong, danh sach san pham nam trong nhieu cot.
   - Khach co format khac.

5. SKU va Variant ID trong file la ma nao?
   - Ma noi bo cua Zootop Bear.
   - Ma cua supplier/nen tang fulfillment.
   - Seller co the dung ma rieng va can mapping.

## 4. Tinh gia va breakdown

Can confirm:

1. Seller can xem breakdown gia o buoc nao?
   - Truoc khi confirm order.
   - Sau khi import file xong.
   - Trong lich su order.

2. Cong thuc label ship/Ship by TikTok chot la:

```text
(base cost + label fee) * quantity
```

Can khach xac nhan cong thuc nay dung hay can cong them phi khac.

3. Cong thuc ship by seller cho don 1 san pham chot la:

```text
base cost * quantity + shipping fee
```

Can khach xac nhan.

4. Cong thuc ship by seller cho don nhieu san pham can chot bang vi du.

Dang gia dinh:

```text
base cost tung san pham * quantity
+ shipping fee cua san pham co shipping fee cao nhat
+ add item fee * so item con lai
```

Can khach dua 2-3 vi du thuc te de xac nhan.

5. Neu cung product nhung khac tier seller, shipping method, supplier thi gia hien thi thay doi theo uu tien nao?

6. Gia/cost cua supplier co can luu lai de doi soat loi nhuan khong?
   - Co luu va Admin/Ke toan duoc xem.
   - Co luu nhung chi Admin duoc xem.
   - Chua can phase 1.

## 5. Vi, pending, credit va refund

Can confirm:

1. Khi seller bam Confirm, he thong tru tien ngay hay chi tam giu tien?

2. Neu vi khong du tien thi don o trang thai nao?
   - Pending.
   - Imported.
   - Hold.
   - Khong tao don.

3. Don thieu tien co hien cho Admin/Van hanh khong?
   - Co hien de theo doi.
   - Khong hien, chi seller thay.

4. Seller nao duoc dung credit dac biet?
   - Tat ca seller.
   - Chi seller duoc Admin cap quyen.
   - Khong dung credit trong phase 1.

5. Neu co credit dac biet, can chot:
   - Han muc.
   - Thoi han.
   - Ai duyet.
   - Co bat buoc ly do/audit log khong.

6. Khi huy don hoac supplier fail, he thong refund tu dong hay can Admin/Ke toan duyet?

7. Refund tra ve vi seller theo giao dich nao?
   - Refund full order.
   - Refund tung item.
   - Refund mot so tien tuy Admin/Ke toan nhap.

## 6. Gui supplier va xu ly loi

Can confirm:

1. Don du dieu kien se duoc gui supplier khi nao?
   - Ngay sau khi seller confirm va tru tien thanh cong.
   - Sau khi Admin/Van hanh duyet.
   - Theo lich batch dinh ky.

2. Rule routing supplier la gi?
   - Theo product.
   - Theo supplier uu tien.
   - Theo gia/cost tot nhat.
   - Theo tinh trang API/cong suat.

3. Neu supplier API loi thi he thong can:
   - Retry tu dong.
   - Chuyen don sang Hold.
   - Bao Van hanh xu ly thu cong.
   - Cho phep route sang supplier khac.

4. Retry toi da bao nhieu lan va cach nhau bao lau?

5. Supplier nao trong 5 supplier co API day don that cho phase 1?
   - FlashShip.
   - SimplePrint.
   - PrintBelle.
   - ART ADD.
   - Snap Ecom.

6. Supplier nao chua co API thi fallback thu cong nhu the nao?
   - Export file de nhan vien upload len supplier.
   - Van hanh nhap tay tren portal supplier.
   - Tam thoi khong dua vao phase 1.

7. Khi supplier tu choi don, he thong can:
   - Hold de Van hanh sua.
   - Cho seller sua thong tin.
   - Refund tu dong.
   - Route lai supplier khac.

## 7. Status va tracking

Can confirm:

1. Danh sach status seller nhin thay cuoi cung gom nhung trang thai nao?
   - Imported.
   - Confirm.
   - Pending.
   - In Production.
   - Shipped.
   - In transit.
   - Delivery.
   - Hold.
   - Cancel.
   - Refund.

2. Status noi bo co can tach khac status seller nhin thay khong?

3. Status tu tung supplier map sang status Zootop Bear nhu the nao?

4. Tracking lay tu nguon nao?
   - Supplier API.
   - 17TRACK.
   - Ca hai.

5. Neu supplier va 17TRACK tra ve status khac nhau thi nguon nao uu tien?

6. Seller can xem cac field tracking nao?
   - Tracking number.
   - Carrier.
   - Tracking link.
   - Trang thai van chuyen.
   - Ngay giao du kien.
   - Lich su tracking event.

7. Tracking thieu/cham cap nhat sau bao lau thi dua vao dashboard Van hanh?

## 8. Quyen xem va dashboard noi bo

Can confirm:

1. Admin/Van hanh/CSKH thay don tu luc nao?
   - Ngay sau khi import.
   - Sau khi seller confirm.
   - Sau khi da tru tien.
   - Sau khi gui supplier.

2. Van hanh duoc thao tac gi?
   - Retry gui supplier.
   - Chuyen Hold.
   - Sua supplier/routing.
   - Sua thong tin don.
   - Chi xem va bao Admin.

3. CSKH duoc xem phan nao cua don?
   - Trang thai/tracking.
   - Thong tin nguoi nhan.
   - Gia seller.
   - File/link thiet ke.
   - Loi supplier.
   - Ledger/vi.

4. Dashboard order phase 1 bat buoc co filter/cot nao?
   - Ngay tao.
   - Seller.
   - Order ID.
   - SKU/product.
   - Supplier.
   - Payment status.
   - Order status.
   - Tracking status.
   - Loi API/Hold reason.

## 9. Ket qua can nhan tu khach

Sau buoi confirm, can lay duoc:

1. So do luong chot: tu dong hay co buoc duyet noi bo.
2. Bang status order cuoi cung va y nghia tung status.
3. Rule import khi co dong loi.
4. Cong thuc tinh gia co vi du.
5. Rule tru vi, pending, credit, refund.
6. Rule routing va retry supplier.
7. Danh sach supplier co API that trong phase 1.
8. Nguon tracking/status va rule uu tien.
9. Dashboard/filter/cot bat buoc cho Admin/Van hanh/CSKH.
