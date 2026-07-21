# Task: Analyze current manual flow from seller order and catalog files

## Muc tieu

Phan tich 2 file Excel khach gui de hieu cach cong ty dang van hanh thu cong truoc khi co web tu dong:

1. File don/fulfill thu cong cua seller.
2. File catalog/bang gia san pham cua he thong.
3. File tracking/logistics export tu PrintBelle.

Ket qua phan tich nay dung lam nen truoc khi hoi khach confirm luong seller tao/import don, tinh tien, tru vi, gui xuong va tracking.

## File da phan tich

- `tasks/03-confirm-order-to-fulfillment-flow/tài liệu khách gửi/Bảng fulfill US tổng Tháng 5-6 -7-8 .2026.xlsx`
- `tasks/03-confirm-order-to-fulfillment-flow/tài liệu khách gửi/US Factory Catalog.xlsx`
- `tasks/03-confirm-order-to-fulfillment-flow/tài liệu khách gửi/a4d53032b1f04bfea856466dbbfe7fdd.xlsx`

## Trang thai

- Da tao subtask.
- Da doc cau truc sheet, header, so dong/cot va cac cot cong thuc.
- Da trich cong thuc chinh: total cost, supplier lookup, base cost + shipping, add item, label fee, apparel print-side fee.
- Da bo sung ghi chu ve Variant ID, supplier code `415`/`922`, kha nang API catalog va cach mapping catalog Zootop Bear voi product/variant cua supplier.
- Da phan tich file tracking PrintBelle va mapping voi file van hanh thu cong.
- Da ghi phan tich tai `tasks/04-analyze-current-manual-flow/MANUAL_FLOW_ANALYSIS.md`.

## Ket qua tiep theo

- Cho nguoi dung bo sung thong tin neu co.
- Sau khi thong tin du ro, cap nhat task confirm luong seller bang cau hoi de hieu hon, dua tren quy trinh that trong Excel.

## File lien quan

- `tasks/04-analyze-current-manual-flow/MANUAL_FLOW_ANALYSIS.md`
- `tasks/04-analyze-current-manual-flow/inspect_workbooks.py`
- `tasks/04-analyze-current-manual-flow/summarize_workbooks.py`
- `tasks/04-analyze-current-manual-flow/compare_printbelle_tracking.py`
