# Review API ART ADD

Ngay review: 21/07/2026

## 1. File da doc

Thu muc: `tasks/02-confirm-artsadd-api/fulfillment.artsadd.com-php-demo`

- `ApiHelper.php`
- `demo.php`
- `API.doc`
- `sign.doc`
- `document.doc`

Ghi chu: cac file `.doc` la dinh dang Word cu. May hien tai khong mo duoc Word COM trong sandbox, nen toi da trich text tho sang `tasks/02-confirm-artsadd-api/extracted-docs`. Phan API chinh van doc duoc tu `API.doc` va code demo.

## 2. Hieu nhanh ve API ART ADD

ART ADD co demo PHP cho luong tao don tu he thong ngoai vao ART ADD fulfillment.

Theo demo, Zootop Bear se dung `AppKey`, `AppSecret`, `StoreID` cua account ART ADD de:

1. Tao chu ky request.
2. Gui order sang ART ADD.
3. Lay thong tin order theo ma order.

Endpoint doc/doc-demo tim thay:

| Muc dich | Method | Endpoint |
| --- | --- | --- |
| Tao don | POST | `https://fulfillment.artsadd.com/api/order/create` |
| Lay thong tin don | GET | `http://fulfillment.artsadd.com/api/order/getinfo/{order_id}` |

Demo PHP dung `http://fulfillment.artsadd.com/...`, con `API.doc` ghi `https://fulfillment.artsadd.com/api/order/create`. Khi implement nen uu tien HTTPS, nhung can confirm ART ADD endpoint production chuan.

## 3. Cach ky request

Theo `ApiHelper.php`, tham so ky gom:

- `AppKey`
- `StoreID`
- `Timestamp`

Code demo:

```php
ksort($params);
$signStr = hash_hmac('md5', http_build_query($params), $AppSecret);
```

Sau do request them:

- `AppKey`
- `StoreID`
- `Timestamp`
- `Sign`

Diem can confirm rat quan trong:

- `sign.doc` ghi "HMAC-SHA256 algorithm".
- `ApiHelper.php` lai dung `hash_hmac('md5', ...)`.
- `API.doc` ghi `Sign` la `String [32]`, phu hop MD5 hex 32 ky tu hon la SHA256 hex 64 ky tu.
- Vi vay can hoi ART ADD: chu ky chuan la `HMAC-MD5` hay `HMAC-SHA256`? Neu SHA256 thi co cat ngan 32 ky tu khong?

## 4. Payload tao don theo demo

Payload gom 3 nhom chinh:

- `order`
- `items`
- `products`

### `order`

| Field | Bat buoc | Mo ta |
| --- | --- | --- |
| `id` | Co | Ma don do Zootop Bear tu dinh nghia. Format doc: `[a-z0-9-]`, 1-50 ky tu. |
| `add_time` | Co | Thoi gian tao don, format `yyyy-mm-dd hh:mm:ss`. |
| `country` | Co | Ma hoac ten quoc gia. |
| `city` | Co | Thanh pho. |
| `address1` | Co | Dia chi dong 1. |
| `customer` | Co | Ten nguoi nhan. |
| `postalcode` | Co | Ma buu dien. |
| `phone` | Co | So dien thoai. |
| `shipping_name` | Khong | Ten kenh van chuyen, default `Standard`. |
| `total_amout` | Khong | Tong tien, default `0.00`. Luu y field trong demo/doc viet sai la `total_amout`. |
| `email` | Khong | Email nguoi nhan. |
| `currency` | Khong | Ma tien te 3 ky tu, default `USD`. |
| `memo` | Khong | Ghi chu don. |
| `state` | Khong | Bang/khu vuc. |
| `address2` | Khong | Dia chi dong 2. |

### `items`

| Field | Bat buoc | Mo ta |
| --- | --- | --- |
| `id` | Co | Ma item trong don, do Zootop Bear tao. |
| `quantity` | Co | So luong, 1-1000. |
| `product_sku` | Co | Ma SKU san pham cua minh trong order. |
| `shipping_price` | Khong | Phi ship item. |
| `product_price` | Khong | Gia san pham item. |
| `memo` | Khong | Ghi chu item. |

### `products`

| Field | Bat buoc | Mo ta |
| --- | --- | --- |
| `product_sku` | Co | SKU san pham cua minh, can khop voi `items.product_sku`. |
| `size` | Co | Size san pham. |
| `title` | Co | Ten san pham. |
| `images` | Co | Anh mockup/effect images. Format doc: png, jpg, jpeg. |
| `prints` | Co | Anh in/print images. Format doc: png, jpg, jpeg. |
| `supplier_sku` | Co | SKU he thong cua ART ADD. |
| `color` | Khong | Mau. |
| `brand` | Khong | Brand. |

## 5. Mapping tu template fulfill sang ART ADD

File template: `doc/Template fulfill Home decor xưởng US.xlsx`

| Cot template | Mapping ART ADD de xuat | Ghi chu can confirm |
| --- | --- | --- |
| `Date` | `order.add_time` | Co the de he thong tu sinh thay vi seller nhap. |
| `Mã khách hàng` | Chua co field truc tiep | Can chot day la ma seller, ma khach cuoi hay ma noi bo; co the luu noi bo/memo. |
| `Tracking number` | Khong gui khi tao don | Thuong la du lieu ART ADD/17TRACK tra ve sau. |
| `Order ID` | `order.id` | Nen dung order code cua Zootop Bear hoac external order id seller. Can chot format. |
| `Shipping method` | `order.shipping_name` | Can map ten shipping trong template sang shipping channel ART ADD chap nhan. |
| `Customer's name` | `order.customer` | Bat buoc. |
| `Email` | `order.email` | Khong bat buoc theo doc nhung nen gui neu co. |
| `Phone` | `order.phone` | Bat buoc. |
| `Country` | `order.country` | Bat buoc; can chot dung country code hay country name. |
| `State` | `order.state` | Optional theo doc, nhung voi US nen bat buoc noi bo. |
| `Address line 1` | `order.address1` | Bat buoc. |
| `Address line 2` | `order.address2` | Optional. |
| `City` | `order.city` | Bat buoc. |
| `Zip` | `order.postalcode` | Bat buoc. |
| `Link Label` | Chua co field ro | Can hoi ART ADD co nhan label link khong; neu khong co the dua vao `memo` hoac khong gui. |
| `SKU` | `items.product_sku` va `products.product_sku` | Day co ve la SKU noi bo cua Zootop Bear/seller. |
| `Quantity` | `items.quantity` | Bat buoc. |
| `Variant id` | Co the map ra `products.supplier_sku` | Can confirm: `Variant id` cua template la ma ART ADD, ma Zootop Bear hay ma platform khac. |
| `Design front` | `products.prints[]` | ART ADD can URL anh in. Can confirm co chap nhan Google Drive link khong. |
| `Mockup Front` | `products.images[]` | ART ADD can URL anh mockup/effect. Can confirm format/link public. |
| `Product Note` | `order.memo` hoac `items.memo` | Neu note theo san pham thi nen map `items.memo`; neu note theo don thi `order.memo`. |

## 6. Diem chua thay trong demo

Nhung noi dung nay chua tim thay ro trong folder demo:

- Danh sach status code cua order.
- Webhook/callback URL de ART ADD day trang thai ve Zootop Bear.
- API lay tracking number/carrier.
- API huy don.
- API tinh gia/cost truoc khi tao don.
- API lay catalog/product/supplier_sku tu ART ADD.
- Shipping method hop le cua ART ADD.
- Cach gui label link neu seller co `Link Label`.
- Quy dinh URL anh: co chap nhan Google Drive link khong, hay bat buoc URL public truc tiep `.jpg/.png`.

## 7. Rui ro/diem can hoi ART ADD

1. Link docs `https://fulfillment.artsadd.com/help/api` va `https://fulfillment.artsadd.com/third` hien ban truy cap khong duoc. Can ART ADD cap lai quyen hoac gui file docs moi.
2. Can confirm chu ky request: HMAC-MD5 hay HMAC-SHA256.
3. Can lay AppKey/AppSecret/StoreID production/test cho account ART ADD cua Zootop Bear.
4. Can confirm endpoint dung HTTPS hay HTTP.
5. Can confirm request body gui dang form-url-encoded nhu PHP `http_build_query`, hay JSON.
6. Can confirm `supplier_sku` lay o dau trong ART ADD.
7. Can confirm ART ADD co webhook status/tracking khong.
8. Can confirm cac trang thai ART ADD tra ve map sang status noi bo nao: Imported, Confirm, In Production, Shipped, In transit, Delivery, Hold, Cancel.
9. Can confirm khi tao don fail, loi nao duoc retry, loi nao phai sua du lieu/design.
10. Can confirm co API huy don/refund khong; neu khong co thi Zootop Bear chi xu ly refund noi bo sau khi Admin/Kế toán xác nhận.

## 8. Ket luan tam thoi

Demo ART ADD du de xac dinh ART ADD co API tao don co ban va co API lay thong tin don theo ma don. Tuy nhien chua du de implement production an toan vi thieu/chuaro:

- Signing algorithm chuan.
- Webhook/tracking.
- Status mapping.
- Supplier SKU/catalog source.
- Shipping method/label handling.
- Cancel/refund behavior.

Truoc khi dua ART ADD vao phase implement, can xin lai docs/API access hoac file API day du hon tu ART ADD.
