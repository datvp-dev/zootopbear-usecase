# Phan tich luong van hanh thu cong hien tai tu 2 file Excel

## 1. Ket luan nhanh

Hai file Excel cho thay hien tai cong ty dang van hanh theo mo hinh:

1. Seller/gui nhan vien dua don vao file theo tung nhom san pham/nen tang.
2. File don chua thong tin nguoi nhan, san pham, SKU/variant, so luong, link design, mockup, label neu co.
3. Excel lookup gia san pham tu bang gia noi trong chinh sheet hoac catalog.
4. Excel tinh tong tien theo order, co xu ly don nhieu dong/cung ma don.
5. Excel lookup supplier/xuong theo Variant ID/SKU.
6. Nhan vien dua don len supplier/nen tang san xuat.
7. Tracking duoc dien nguoc lai vao file.
8. Don loi, import loi, resend/refund dang duoc quan ly bang sheet rieng.

=> Web Zootop Bear khong nen hoi khach tu dau nhu mot quy trinh moi. Nen xem Excel la quy trinh goc va dua cac rule hien co vao he thong, sau do chi hoi khach nhung diem Excel chua ro hoac dang lam thu cong.

## 2. File don/fulfill thu cong

File:

`Bảng fulfill US tổng Tháng 5-6 -7-8 .2026.xlsx`

Co 7 sheet:

| Sheet | Vai tro suy ra | Quy mo |
| --- | --- | ---: |
| Home Decor 2026 | Don Home Decor theo template chung | 14.980 dong |
| MUG US | Don mug/drinkware US theo format rieng | 582 dong |
| Accessories Home&Living + Egg C | Don accessories/home/living/egg chain | 4.313 dong |
| GILDAN+ Apparel US | Don apparel/Gildan, co nhieu mat in | 10.066 dong |
| Issue | Theo doi don loi/resend/refund | 996 dong |
| Import len co van de | Theo doi don import/co van de can xu ly | 831 dong |
| VARIANT_SUPPLIER_MAP | Map Variant ID sang supplier/xuong | 1.346 dong |

### 2.1. Cac nhom du lieu tren don

File don dang gom cac nhom thong tin chinh:

- Thong tin quan ly noi bo: ngay, ma khach hang/seller, note, da day hay chua.
- Thong tin van chuyen: tracking number, shipping method, shipping label/link label.
- Thong tin order: Order ID/order_id, quantity.
- Thong tin nguoi nhan: ten, email, phone, country, state, city, address, zip.
- Thong tin san pham: SKU/Product ID/Variant ID, size, color, product name.
- Thong tin thiet ke: design front/back/sleeve, mockup front/back/sleeve, exact artwork, product note.
- Thong tin tinh tien: Total Cost, base cost, shipping fee, add item fee, label fee.
- Thong tin supplier: supplier/xuong duoc lookup tu Variant ID.

Day la bo field nen dung lam nen khi thiet ke import order tren web.

## 3. Cong thuc dang co trong file don

### 3.1. Lookup supplier theo Variant ID

Trong `Home Decor 2026`, cot Supplier dung cong thuc:

```text
Supplier = VLOOKUP(Variant ID, VARIANT_SUPPLIER_MAP!A:B, 2)
Neu khong thay: UNKNOWN
```

Trong `Accessories Home&Living + Egg C` cung lookup supplier tu Variant ID va tra ra cac gia tri nhu `Printeblle`, hoac ma supplier.

Y nghia voi web:

- He thong can co bang mapping Variant ID/SKU -> Supplier.
- Neu khong match, order phai vao trang thai can xu ly, khong nen gui supplier tu dong.
- Nen chuan hoa supplier name/code vi Excel dang co ca so va text, vi du `922`, `415`, `Printeblle`.

### 3.2. Cong thuc Home Decor: co label vs khong label

Cot `X - Total Cost ham` trong `Home Decor 2026` tinh theo `Variant id`, `Order ID`, `Quantity`, `Link Label` va bang gia o cot `AB:AG`.

Rule suy ra:

Neu Variant ID trong don rong:

```text
Khong tinh tien
```

Neu co Link Label:

```text
Dong dau tien cua order:
  total = base_cost * quantity + label_fee

Dong tiep theo cung order:
  total = base_cost * quantity
```

Neu khong co Link Label:

```text
Dong dau tien cua order:
  total = base_cost * quantity
        + shipping_fee
        + add_item_fee * max(tong_quantity_cua_order - 1, 0)

Dong tiep theo cung order:
  total = base_cost * quantity
```

Neu Variant ID khong match bang gia:

```text
NO MATCH VARIANT
```

Diem quan trong:

- Excel khong tinh shipping/add-item tren moi dong. No chi tinh o dong dau tien cua cung Order ID.
- Don nhieu san pham/cung order duoc gom bang `Order ID`.
- `add_item_fee` dang nhan voi tong quantity cua ca order tru 1.
- Voi order co label, Excel chi cong `label_fee`, khong cong `shipping_fee`.

### 3.3. Cong thuc MUG US va Accessories

`MUG US` va `Accessories Home&Living + Egg C` co rule gan giong nhau:

```text
Dong dau tien cua order:
  total = base_cost * quantity
        + shipping_fee
        + add_item_fee * max(tong_quantity_cua_order - 1, 0)

Dong tiep theo cung order:
  total = base_cost * quantity

Neu khong match Product ID/Variant ID:
  NO MATCH
```

Khac biet chinh:

- `MUG US` lookup theo `ProductId`.
- `Accessories Home&Living + Egg C` lookup theo `Variant ID`.
- Sheet Accessories co them cot `GIÁ SUPPLIER`, co kha nang dung de doi soat gia von/loi nhuan.

### 3.4. Cong thuc Apparel/GILDAN

Sheet `GILDAN+ Apparel US` phuc tap hon vi mot item co the co nhieu vi tri in:

- Front.
- Back.
- Sleeve left.
- Sleeve right.

Rule suy ra tu cong thuc:

```text
total = base_cost * quantity
      + shipping_fee_chinh
      + add_shipping_fee * (tong_quantity_cua_order - 1)
      + phi_in_back * so_luong_item_co_design_back
      + phi_in_sleeve_right * so_luong_item_co_design_sleeve_right
      + phi_in_sleeve_left * so_luong_item_co_design_sleeve_left
```

Ngoai ra, sheet nay phan biet shipping type:

```text
Neu co shipping label/tracking carrier lien quan label:
  Tiktok Ship
Neu khong:
  Seller Ship
```

Va lookup gia theo cap:

```text
SKU + Shipping Type
```

Diem nay rat quan trong voi web:

- Apparel khong chi co `design front`; can model hoa design theo print position.
- Gia phai tinh them theo mat in.
- Mapping variant/SKU co the phu thuoc shipping type, khong chi SKU don thuan.

## 4. File catalog/bang gia he thong

File:

`US Factory Catalog.xlsx`

Co 14 sheet:

| Sheet | Ghi chu |
| --- | --- |
| Catalog tong | Catalog tong hop, co total cost = base/shipping |
| Product List | Danh sach san pham |
| Embroidery Products | San pham embroidery |
| Phone case | Phone case |
| Home Decor | Home decor |
| Canvas | Canvas |
| Pillow Case & Bed | Pillow/bed |
| Home & Living | Home/living |
| AOP Clothes | AOP clothes |
| Apparel US | Apparel US |
| Accessories | Accessories |
| Drink wear &Mug (Ship by seller | Mug/drinkwear ship by seller |
| Apparel | Apparel theo DTF/DTG |
| Hat | Hat |

### 4.1. Cac field catalog nen dua vao he thong

Catalog dang co cac nhom field:

- Product name.
- Product ID/SKU/Variant ID.
- Picture.
- Size/color/material.
- Base cost theo tier.
- Shipping fee first item.
- Add item fee.
- Label fee hoac ship by TikTok.
- Total cost theo tier.
- Production time.
- Shipping time.
- Print area.
- Packaging.
- Template.
- Color chart.
- Product description.
- Size chart.

Day khop voi scope catalog da review truoc do, nhung Excel cho thay can them ro:

- Co sheet/product dung `Product ID`, co sheet dung `SKU`, co sheet dung `Variant ID`.
- Mot so category co logic rieng: apparel co DTF/DTG, embroidery, phone case, hat patch/decor type.
- Template/color chart/size chart la field quan trong, khong chi la optional link.

### 4.2. Cong thuc catalog co the ap dung vao web

Catalog co nhieu cong thuc tong cost don gian:

```text
total_cost = base_cost + shipping_fee
```

Vi du:

- `Catalog tong`: `G = H + I`.
- `Home Decor`: `F = H + I`.
- `Canvas`: `F = G + H`.
- `Pillow Case & Bed`: `F = G + H`.
- `Home & Living`: `G = H + I`.
- `Accessories`: `G = H + I`.

Apparel US co cong thuc tach theo label/ship:

```text
ship_by_seller_total = base_cost + seller_shipping_fee
ship_by_tiktok_total = base_cost + tiktok_or_label_fee
```

Apparel sheet co logic in:

```text
DTF total = base_cost + DTF_printing_price + ship_by_seller_fee
DTG total = base_cost + DTG_printing_price + ship_by_seller_fee
```

Hat co tier:

```text
Tier total = tier_base_cost + first_item_shipping_fee
```

Can luu y:

- Mot so cong thuc trong catalog tra `#VALUE!`, vi dong dau tien dang la header/placeholder nhung van co formula.
- Mot so o dang bi Excel format sai thanh date/serial, vi du so dien thoai/order id/tracking co the bi ep thanh so khoa hoc hoac date.

## 5. Luong van hanh thu cong hien tai suy ra

### Buoc 1: Nhan don tu seller

Seller/nhan vien dua don vao file theo dung sheet/category:

- Home Decor.
- Mug.
- Accessories/Home Living.
- Apparel/Gildan.

Co the seller gui bang file/link; nhan vien copy vao sheet.

### Buoc 2: Dien/copy thong tin don

Thong tin bat buoc dang can:

- Ma khach hang/seller.
- Order ID.
- Quantity.
- SKU/Product ID/Variant ID.
- Nguoi nhan + dia chi.
- Shipping method/shipping type.
- Link design/mockup/artwork.
- Label neu la ship label/TikTok.

### Buoc 3: Excel tinh gia

Excel tinh total cost theo tung order va category:

- Lookup base cost/shipping/add item/label fee.
- Gom cac dong co cung Order ID.
- Chi tinh ship/add-item o dong dau tien cua order.
- Dong sau cung order chi tinh base cost.
- Apparel tinh them phi vi tri in.

### Buoc 4: Xac dinh supplier/xuong

Excel lookup supplier tu `VARIANT_SUPPLIER_MAP`.

Neu khong tim thay supplier hoac variant, don se can xu ly thu cong.

### Buoc 5: Day don len supplier

File co cot nhu `Da day`, tracking, shipping label, supplier, issue/import problem. Suy ra hien tai nhan vien:

- Kiem tra don.
- Day/upload/nhap len supplier.
- Dien tracking khi co.
- Ghi issue neu don loi.

### Buoc 6: Xu ly loi/resend/refund

Sheet `Issue` co cac loai xu ly nhu:

- Refund.
- Resend.
- Noi dung loi: in loi, gui nham size, v.v.
- Trang thai xu ly.
- Fulfill note.

Sheet `Import len co van de` co cac loi nhu:

- Link design loi.
- Front/back lech nhau.
- Gan xuong/supplier can xu ly.

=> Web can co luong Hold/Issue/Ticket noi bo, khong chi status order binh thuong.

## 6. Cac rule nen dua vao he thong

### 6.1. Order co nhieu dong

Nen model hoa:

```text
1 order co nhieu order item
Moi order item co SKU/Variant/Product ID, quantity, design/mockup/note
Gia ship/add-item tinh tren cap order, khong tinh lap lai tren moi item
```

### 6.2. Rule tinh tien mac dinh

Rule goc tu Excel:

```text
total_order = tong(base_cost_item * quantity_item)
            + shipping_fee_chinh
            + add_item_fee * max(tong_quantity_order - 1, 0)
            + label_fee neu la don co label
            + phi_in_them neu category can tinh theo vi tri in
```

Can confirm lai voi khach:

- Don co label/TikTok dung `label_fee` thay `shipping_fee`, hay co truong hop can tinh ca hai?
- Neu order co nhieu variant voi shipping/add-item fee khac nhau, Excel hien co the lay theo variant/dong dau hoac MAX tuy cong thuc; web nen chot ro lay phi cao nhat hay theo dong dau tien.

### 6.3. Mapping supplier

Can co bang:

```text
Variant ID/SKU/Product ID -> Supplier
```

Va co the can them:

```text
SKU + Shipping Type -> Price/Shipping config
```

Cho apparel/Gildan.

### 6.4. Validation khi import

Tu loi trong Excel, web nen validate:

- Thieu/mismatch Variant ID/SKU/Product ID.
- Link design/mockup khong co hoac khong mo duoc.
- Front/back/sleeve khong khop.
- Country/state/zip/phone sai format.
- Order ID bi Excel/CSV bien thanh so khoa hoc.
- Tracking/order id/phone phai luu dang text, khong luu dang number.

### 6.5. Issue/refund/resend

Web nen co trang xu ly:

- Don loi can xu ly.
- Resend.
- Refund.
- Fulfill note.
- Support note.
- Link anh bang chung.

Day co the map voi ticket/hold/refund use case sau nay.

## 7. Anh huong toi cau hoi confirm khach

Truoc khi hoi khach ve luong seller, nen dua cau hoi theo thuc te Excel:

1. Hien Excel dang tinh ship/add-item mot lan theo Order ID. Web co giu dung rule nay khong?
2. Neu mot order co nhieu san pham/variant, shipping fee/add item fee lay theo variant nao: dong dau, phi cao nhat, hay rule khac?
3. Don co label/TikTok hien dang tinh label fee thay shipping fee. Co truong hop nao can tinh ca label fee va shipping fee khong?
4. Apparel/Gildan co can tinh gia theo vi tri in front/back/sleeve nhu Excel khong?
5. Variant/SKU khong match supplier thi web cho seller sua ngay, hay dua vao danh sach noi bo xu ly?
6. Link design/mockup loi thi seller phai sua truoc khi confirm, hay van cho confirm va cho van hanh xu ly sau?
7. Cac sheet Issue/Import loi hien co se chuyen thanh trang Hold/Ticket/Issue trong web theo quy trinh nao?

## 8. Ghi chu them ve Variant ID, supplier code va API catalog

### 8.1. Variant ID co phai ID cua xuong khong?

Tu file Excel, chua the ket luan 100% `Variant ID` luon la ID goc cua xuong/nen tang. Nhung co the hieu an toan nhu sau:

```text
Variant ID = ma khoa hien tai dung de lookup gia, supplier/xuong va rule fulfill
```

Trong cac sheet khac nhau, file dang dung nhieu loai ma:

- `SKU`.
- `Product ID`.
- `Variant ID`.
- Ma so nhu `77107`, `77108`.
- Ma text nhu `#CT01282217`, `HNMDUSA/50X80CM`, `G5000-White-S-SPHZTB`.

Vi vay khi thiet ke web khong nen gom tat ca thanh mot field duy nhat. Nen tach:

```text
Zootop product id
Zootop variant id
Supplier/platform
Supplier product id
Supplier variant id
Supplier SKU
Shipping type
```

Seller chi nen nhin thay catalog cua Zootop Bear. Phan ma cua supplier/xuong nen la du lieu noi bo dung de routing va gui don.

### 8.2. Supplier 415 va 922 co the la gi?

Trong file don, cot `Supplier` dang duoc lookup tu sheet `VARIANT_SUPPLIER_MAP`:

```text
Variant ID -> VARIANT_SUPPLIER_MAP -> SUPPLIER
```

Vi du:

```text
#CT01282217 -> 415
#CT01282205 -> 415
77107/77108 -> 922
```

Da tim tren web voi cac cum lien quan den `415`, `922`, `fulfillment`, `POD`, `PrintBelle`, `FlashShip`, `ART ADD`. Chua thay bang chung dang tin nao cho thay `415` hoac `922` la ma cong khai cua mot nen tang fulfillment.

Ket luan tam thoi:

```text
415 va 922 nhieu kha nang la ma noi bo cua cong ty,
hoac ma account/xuong do team van hanh tu quy uoc,
khong phai ten/mã platform public de co the tra tren web.
```

Can hoi khach:

```text
Trong file Excel, Supplier = 415 va 922 tuong ung voi xuong/nen tang nao?
Day la ma noi bo cong ty tu dat, hay ma lay tu he thong supplier?
Co bang giai nghia supplier code khong?
```

Can chuan hoa trong he thong moi:

```text
Supplier Code | Supplier Name | Platform URL | API available | Account | Note
415           | ?             | ?            | ?             | ?       | ?
922           | ?             | ?            | ?             | ?       | ?
Printeblle    | PrintBelle    | ?            | ?             | ?       | spelling can chuan hoa
```

### 8.3. API co lay duoc catalog/product/variant tu supplier khong?

Da tra cuu nhanh cac nen tang lien quan:

- FlashShip co tai lieu public noi seller co the tao order theo 3 cach: CSV/XLSX, API, tao truc tiep tren website.
- PrintBelle public FAQ noi co product code, quotation table, CSV/API/OrderDesk de fulfill order.
- SimplePrint mo ta mo hinh seller chon san pham tu catalog va order duoc fulfill tu dong.

Tuy nhien, nhung thong tin public nay chua du de ket luan moi nen tang deu co API lay catalog/product/variant/price day du.

Can phan biet 3 loai API:

```text
1. API tao don.
2. API lay status/tracking.
3. API lay catalog/product/variant/price.
```

Mot supplier co the co API tao don nhung khong co API catalog day du, hoac catalog API khong tra nhung field Zootop Bear can nhu:

- Gia seller theo tier cua Zootop Bear.
- Shipping fee/add item fee/label fee theo rule noi bo.
- Template/mockup/color chart/size chart da chuan hoa.
- Mapping supplier uu tien.
- Gia von va rule doi soat.

Vi vay, du co API catalog, he thong Zootop Bear van can bang catalog/mapping noi bo.

### 8.4. Hinh dung mapping dung cho he thong moi

Nen thiet ke theo 2 lop:

```text
Lop 1: Catalog Zootop Bear
- Ten san pham seller thay
- Variant seller chon
- Anh, mo ta, mockup, template
- Gia ban seller theo tier
- Production/shipping time hien thi

Lop 2: Fulfillment Mapping noi bo
- Supplier/platform nao san xuat
- Supplier product id
- Supplier variant id
- Supplier SKU
- Shipping type
- Base cost/supplier cost
- Shipping fee/add item fee/label fee
- Field can gui API
```

Luong tao don:

```text
Seller chon san pham trong Zootop catalog
  -> He thong tim mapping fulfillment noi bo
  -> He thong tinh gia seller theo rule Zootop
  -> He thong routing sang supplier
  -> He thong gui Supplier SKU/Variant ID dung cho nen tang do
```

Khong nen bat seller biet `415`, `922`, supplier SKU hay supplier variant ID.

### 8.5. Cau hoi can them sau phan tich nay

Nen hoi khach/noi bo:

1. `415`, `922`, `Printeblle` tuong ung voi nen tang/xuong nao?
2. `Variant ID` trong file la ma cua supplier hay ma noi bo cong ty?
3. Co bang mapping chuan nao ngoai sheet `VARIANT_SUPPLIER_MAP` khong?
4. Moi supplier co API lay product/variant/price khong?
5. Neu supplier co API catalog, cong ty muon sync tu supplier ve hay van dung catalog noi bo lam nguon chuan?
6. Khi mot product co tren nhieu supplier, rule chon supplier la gi?
7. Gia trong catalog la gia ban seller hay gia von supplier? Neu co ca hai, file nao la nguon chuan?

## 9. Phan tich them file tracking PrintBelle

File moi:

`tasks/03-confirm-order-to-fulfillment-flow/tài liệu khách gửi/a4d53032b1f04bfea856466dbbfe7fdd.xlsx`

Day la file export tracking/logistics tu PrintBelle. Sheet duy nhat:

```text
export_specified_logistics_trac
```

Quy mo:

```text
30 dong tracking
19 cot
```

### 9.1. Cac cot trong file PrintBelle

Header:

| Cot | Ten | Y nghia suy ra |
| --- | --- | --- |
| A | TrackNo | Ma tracking thuc te |
| B | AgentWaybillNo | Ma van don ben agent neu co |
| C | AgentWaybillCompanyName | Ten agent neu co |
| D | OrderNo | Ma don noi bo cua PrintBelle, vi du `PBKDP2461` |
| E | OrderId | Ma order ma seller/Zootop gui sang PrintBelle |
| F | ProductCode | Ma san pham/variant tren file don |
| G | Quantity | So luong |
| H | SellersItemSku | SKU item cua seller/Zootop, trung voi ProductCode trong file nay |
| I | SystemSku | Ma SKU noi bo cua PrintBelle, vi du `KDP02919` |
| J | TrackInfo | Chi tiet tracking event neu co |
| K | Status | Trang thai tracking/logistics |
| L | TransitTime | So ngay van chuyen |
| M | LogisticsCompany | Don vi van chuyen |
| N | StayTime | So ngay dung/nam yen |
| O | OrderDate | Ngay tao don tren PrintBelle |
| P | PaidDate | Ngay thanh toan tren PrintBelle |
| Q | ShippedDate | Ngay ship |
| R | DeliveredDate | Ngay giao |
| S | Remark | Ghi chu |

### 9.2. Mapping voi file van hanh thu cong cua cong ty

Da doi chieu file PrintBelle voi file `Bảng fulfill US tổng Tháng 5-6 -7-8 .2026.xlsx`.

Ket qua:

| Truong PrintBelle | Match voi file cong ty | Nhan xet |
| --- | ---: | --- |
| `ProductCode` | 30/30 | Match voi sheet `Accessories Home&Living + Egg C` va `VARIANT_SUPPLIER_MAP` |
| `SellersItemSku` | 30/30 | Trung voi `ProductCode`, cung match voi file cong ty |
| `OrderId` | 17/30 | Mot phan match voi order id trong sheet `Accessories Home&Living + Egg C` |
| `TrackNo` | 0/30 | Chua co trong file cong ty tai thoi diem doi chieu |
| `OrderNo` | 0/30 | Co ve la ma don noi bo cua PrintBelle, cong ty chua luu trong file cu |
| `SystemSku` | 0/30 | Co ve la ma SKU noi bo cua PrintBelle, cong ty chua luu trong file cu |

Ket luan:

```text
ProductCode/SellersItemSku la cau noi ro nhat giua file PrintBelle va file cong ty.
OrderId la ma order tu phia seller/Zootop gui sang supplier, nhung khong phai dong nao cung match do khac source/thoi diem/format.
OrderNo la supplier_order_no cua PrintBelle, can luu rieng trong he thong moi.
SystemSku la supplier_system_sku cua PrintBelle, khac voi SKU cong ty/seller dang dung.
```

### 9.3. Hinh dung mapping can luu khi tich hop PrintBelle

Khi Zootop Bear gui don sang PrintBelle, he thong nen luu toi thieu:

```text
zootop_order_id
seller_order_id
supplier = PrintBelle
supplier_order_no = PrintBelle OrderNo, vi du PBKDP2461
supplier_order_id_or_external_ref = OrderId tren PrintBelle
zootop_variant_or_sku = ProductCode/SellersItemSku
supplier_system_sku = SystemSku, vi du KDP02919
tracking_no = TrackNo
tracking_carrier = LogisticsCompany
supplier_tracking_status = Status
order_date_on_supplier = OrderDate
paid_date_on_supplier = PaidDate
shipped_date = ShippedDate
delivered_date = DeliveredDate
raw_tracking_info = TrackInfo
```

Diem quan trong:

- `OrderNo` va `OrderId` khong phai mot. Web can luu ca hai.
- `ProductCode/SellersItemSku` va `SystemSku` khong phai mot. Web can luu ma cong ty gui sang va ma noi bo supplier tra ve.
- `TrackNo` co the chua co trong file cong ty cu, nghia la hien tai tracking co the dang cap nhat bang export rieng tu PrintBelle roi copy/doi chieu thu cong.

### 9.4. Trang thai va carrier trong file PrintBelle

Status trong file:

```text
notfound
InfoReceived
```

Carrier/logistics company:

```text
USPS
Amazon Shipping
GOFO
```

Y nghia voi he thong:

- `notfound` khong nen hien thang cho seller neu khong giai thich; nen map thanh `Tracking not found` hoac `Dang cho cap nhat tracking`.
- `InfoReceived` co the map thanh `Tracking info received` / `Da nhan thong tin van don`, chua chac la dang van chuyen.
- Carrier can luu rieng de tao tracking link dung.
- Tracking status tu supplier co the khac status van chuyen tu 17TRACK; can co rule uu tien.

### 9.5. Van de moi phat hien tu file PrintBelle

1. Can them bang `supplier_order_mapping`

```text
Zootop order/item -> supplier -> supplier OrderNo -> supplier OrderId -> tracking
```

2. Can them field `supplier_system_sku`

Vi PrintBelle co `SystemSku` rieng khong xuat hien trong file cong ty.

3. Can luu tracking export/API raw data

De debug cac trang thai nhu `notfound`, `InfoReceived`.

4. Can chot mapping status

PrintBelle status dang khong trung voi status Zootop Bear da neu truoc do.

5. Can chot nguon update tracking

Neu PrintBelle co export/API tracking, he thong co the lay tracking tu PrintBelle roi day sang 17TRACK de theo doi sau.

6. Can canh giac format text

Tracking co nhieu dinh dang:

```text
420...
921449...
923599...
TBA...
GFUS...
```

Tat ca phai luu dang text, khong luu number.

### 9.6. Cau hoi can hoi them ve PrintBelle

Nen hoi khach/noi bo:

1. `OrderNo` dang co dang `PBKDP...` co phai ma don noi bo cua PrintBelle khong?
2. Khi tao don sang PrintBelle, Zootop Bear/gui file dang truyen `OrderId` nao?
3. `SystemSku` co can luu de doi soat/debug khong?
4. PrintBelle co API lay file tracking/logistics nay khong, hay chi export thu cong tu portal?
5. PrintBelle status `notfound`, `InfoReceived` map sang status nao cho seller?
6. Tracking tu PrintBelle co can day qua 17TRACK de cap nhat hanh trinh chi tiet khong?
7. Neu `OrderId` tu PrintBelle khong match order trong file cong ty, hien nhan vien doi chieu bang cach nao?

## 10. Rui ro du lieu can chu y khi build

- File Excel dang co nhieu PII cua nguoi nhan; khi import web can bao mat va phan quyen ky.
- Order ID, phone, zip, tracking number dang co nguy co bi Excel bien thanh so khoa hoc hoac date; he thong moi phai luu cac field nay dang text.
- Supplier code/name trong map chua dong nhat.
- Mot so cong thuc catalog co loi `#VALUE!` do dong header/placeholder; khong nen copy may moc, can bien thanh rule nghiep vu ro rang.
- Formula dang dung Google Sheets function nhu `ARRAYFORMULA`, `TO_TEXT`, `MAXIFS`, `XLOOKUP`, `LET`, `REDUCE`; khi dua vao backend can viet lai thanh logic code/database, khong phu thuoc Excel.
