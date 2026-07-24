# ART ADD API - Current status and chat draft

## 1. Tình trạng trao đổi hiện tại với ART ADD support

Thông tin đã nhận/đã confirm:

- ART ADD support đã cung cấp `AppKey` và `AppSecret` cho account API.
- Đã tạo store riêng để test API order, tránh lẫn với đơn upload thủ công.
- Store test đang dùng cho API-integrated test orders:
  - Store name: `Zootop Bear API Test`
  - Store ID: `4589cc68d3f38586e8aef1464166197f`
- ART ADD support giải thích: đơn tạo qua API sẽ ở trạng thái `unpaid`; nếu không tiến hành thanh toán thì sẽ không bị trừ tiền tài khoản chính.
- ART ADD support xác nhận có callback/webhook để sync trạng thái đơn về hệ thống Zootop Bear.
- Zootop Bear chỉ cần cung cấp receiving endpoint URL sau khi dựng server.
- ART ADD hiện chưa cung cấp tài liệu/specification cho callback/webhook.
- Support nói IT team không có tài liệu/specification callback, nhưng order statuses sẽ được gửi qua callback khi Zootop cung cấp endpoint.
- Zootop đã hỏi thêm sample payload callback cho các mốc như tạo đơn và chuyển trạng thái đơn; đang cần chờ phản hồi/sample từ IT/support nếu có.

## 2. Thông tin API đang có từ demo ART ADD

Nguồn local:

- `tasks/02-confirm-artsadd-api/fulfillment.artsadd.com-php-demo/ApiHelper.php`
- `tasks/02-confirm-artsadd-api/fulfillment.artsadd.com-php-demo/demo.php`
- `tasks/02-confirm-artsadd-api/fulfillment.artsadd.com-php-demo/API.doc`
- `tasks/02-confirm-artsadd-api/fulfillment.artsadd.com-php-demo/sign.doc`

Endpoint đã thấy:

| Mục đích | Method | Endpoint |
| --- | --- | --- |
| Tạo đơn | POST | `https://fulfillment.artsadd.com/api/order/create` |
| Lấy thông tin đơn | GET | `http://fulfillment.artsadd.com/api/order/getinfo/{order_id}` |

Lưu ý:

- `API.doc` dùng HTTPS cho create order.
- `demo.php` dùng HTTP cho cả create/get info.
- Cần confirm endpoint production chính thức nên dùng HTTP hay HTTPS.

Thông tin ký request:

- Request dùng `AppKey`, `StoreID`, `Timestamp`, `Sign`.
- `ApiHelper.php` đang ký bằng `hash_hmac('md5', http_build_query($params), AppSecret)`.
- `sign.doc` lại mô tả HMAC-SHA256.
- Cần confirm thuật toán ký chính thức là HMAC-MD5 hay HMAC-SHA256.

Payload tạo đơn gồm 3 nhóm:

- `order`: thông tin đơn/người nhận/địa chỉ/shipping/memo.
- `items`: từng item trong đơn, số lượng, product SKU, giá item/ship item nếu có.
- `products`: thông tin sản phẩm, ảnh mô phỏng, ảnh in, supplier SKU, size, color.

Các điểm chưa rõ cần ART ADD confirm:

- Callback/webhook dùng method gì: POST hay GET.
- Callback gửi JSON hay form data.
- Payload callback mẫu khi đơn đổi trạng thái.
- Payload callback có tracking number/carrier không.
- Danh sách status ART ADD sẽ gửi.
- Endpoint của Zootop cần trả response gì để ART ADD hiểu là nhận callback thành công.
- Có retry callback nếu endpoint Zootop lỗi không.
- `supplier_sku` lấy ở đâu trong ART ADD.
- Shipping method hợp lệ gồm những giá trị nào.
- URL design/mockup có chấp nhận Google Drive link không, hay bắt buộc direct public image URL.

## 3. Chat draft gửi ART ADD support

```text
Hi Nico,

I would like to continue checking the ART ADD API integration for Zootop Bear.

We already have the AppKey/AppSecret and the test store you created for API test orders.
Store name: Zootop Bear API Test
Store ID: 4589cc68d3f38586e8aef1464166197f

As I understand:
- We can create API test orders in this store.
- API-created orders will be in unpaid status.
- If we do not proceed with payment, the main account balance will not be charged.
- Order status can be synced back to our system by callback after we provide a receiving endpoint URL.

Could you please help us confirm a few details before we start testing?

1. Which endpoint should we use for creating orders in production/test?
   Should we use:
   https://fulfillment.artsadd.com/api/order/create
   or the http endpoint in the PHP demo?

2. For request signature, should we use HMAC-MD5 or HMAC-SHA256?
   The PHP demo uses HMAC-MD5, but the sign document mentions HMAC-SHA256, so we want to make sure we implement it correctly.

3. For the callback/webhook, could you please ask your IT team to provide a sample payload?
   For example, when an order is created, in production, shipped, or tracking is updated.

4. Could you also confirm whether the callback includes tracking number and carrier information?

5. What response should our endpoint return so ART ADD knows the callback was received successfully?

6. If our endpoint is temporarily unavailable, will ART ADD retry the callback?

7. For product data, where can we find the correct supplier_sku to send in the create order API?

8. For design/mockup image URLs, can we send Google Drive links, or do they need to be direct public image URLs ending with .jpg/.png?

Thank you.
```

## 4. Gợi ý cách test tiếp

Trước khi test API tạo đơn thật:

1. Confirm lại signing algorithm.
2. Confirm endpoint HTTP/HTTPS.
3. Chuẩn bị 1 order test nhỏ trong store `Zootop Bear API Test`.
4. Tạo order qua API và để unpaid, không thanh toán.
5. Gọi API get order info để kiểm tra order có được tạo đúng không.
6. Sau khi có server callback test, gửi receiving endpoint URL cho ART ADD.
7. Log toàn bộ callback raw payload để tự dựng mapping status/tracking nếu ART ADD không có tài liệu.
