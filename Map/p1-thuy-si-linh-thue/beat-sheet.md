# Cổng 4 · Beat sheet — "Sao Thụy Sĩ giàu thế? (Không biển, không dầu)"

*2026-10-25 — **Lucas duyệt Cổng 4** (đã thêm ảnh). Giọng đọc: **72,50 s**, 219 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 73 s.*

**Luật áp dụng:**
- Style I + luật kênh.
- Mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame).
- Khung cuối = khung đầu, **không trống**: bản đồ châu Âu, Thụy Sĩ tô màu, chấm Rome mờ.
- ≤ 4 đạo cụ gắn bản đồ cùng lúc; bảng che bản đồ ≤ 2 câu liền nhau; mỗi khối chữ ≤ 5 chữ, ≤ 2 khối cùng lúc.
- **Nước được tô màu hoặc gọi tên có `CountryTag`:** Thụy Sĩ, Pháp (câu 07), Vatican (câu 23); Việt Nam xuất hiện trên thẻ so sánh có cờ (câu 02). Nước khác chỉ là nền.
- **Chữ ký kênh `Signature`** đổi chỗ ở mỗi cú bay.
- Mọi ghim khai `PLACES` (`in: "sea"` cho điểm ngoài Việt Nam), qua kiểm địa lý.

**Nhạc nền:** P1 chính **"Heroic Age"** (Kevin MacLeod; tập P1 gần nhất là Phú Quốc, dùng "Lightless Dawn"). Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Châu Âu | `Atlas` (world-atlas 50m; có cả Vatican) | Thụy Sĩ tô đỏ cờ + chữ thập trắng nhỏ ở giữa |
| Cờ mới trong kit `Flag` | Thụy Sĩ, Pháp, Vatican (vẽ đơn giản), Ý nếu cần | Luis vẽ vector |
| Núi Alps | biểu tượng núi đồ chơi (vector), **minh họa** | câu 01 |
| Mũi tên lính | đường cong từ Thụy Sĩ sang Pháp, Ý, Tây Ban Nha, Hà Lan | câu 05; không tô màu các nước đó |
| Đường hành quân 1506 | nét chấm Uri → Rome | câu 10 |
| Mũi tên di cư 1816 | Thụy Sĩ → ra mép trái (Đại Tây Dương), nhãn "CHÂU MỸ" | câu 16 |
| Thẻ so sánh | `DataCard` / thanh ngang: Thụy Sĩ ~104.000 USD ↔ Việt Nam ~4.717 USD (GDP/người 2024, World Bank) | câu 02, có cờ |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `europe` (khung nối vòng) | ~8°Đ 45°B, thấy Pháp, Tây Ban Nha, Ý, Rome | frame 0, 05–09, 15–17, 24 (về cuối) |
| `swiss` (Thụy Sĩ gần) | ~8,2°Đ 46,8°B | 01–04, 13–14, 18–22 |
| `rome` (Rome / Vatican) | ~12,45°Đ 41,9°B | 10, 23 |
| `alps` (Zürich – Milano, Marignano) | ~9,0°Đ 46,0°B | 11–12 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `europe`: Thụy Sĩ tô màu, chấm Rome mờ | — | — |
| 01 | 0,05–3,3 | **từ frame 1** bay vào Thụy Sĩ; núi Alps mọc lên; biểu tượng sóng biển và giọt dầu bị gạch | `KHÔNG BIỂN` · `KHÔNG DẦU` | whoosh |
| 02 | 3,4–7,1 | thẻ so sánh 2 thanh có cờ: Thụy Sĩ ↔ Việt Nam | `GDP/NGƯỜI 2024` · `~104.000 ↔ ~4.717 USD` | click |
| 03–04 | 7,3–10,0 | dấu `?` → quân cờ lính đánh thuê (`s-01`) bật lên | `LÍNH` | — |
| 05 | 10,6–13,8 | **bay** → `europe`; mũi tên lính tỏa ra Pháp, Ý, Tây Ban Nha, Hà Lan | — | whoosh |
| 06 | 13,9–15,9 | đếm số; nhiều quân cờ nhỏ xếp hàng | `~1,5 TRIỆU NGƯỜI` · `ƯỚC TÍNH, TK 13–19` | click |
| 07 | 16,1–18,9 | `CountryTag` Pháp loé; tấm biển gỗ | `KHÔNG TIỀN, KHÔNG LÍNH` | — |
| 08 | 19,0–20,6 | **[ĐÙA]** tấm biển lật thành áp phích "tuyển dụng", quân cờ giơ túi tiền (`t-04` tập Mét vuông) | — | — |
| 09 | 20,7–24,9 | cán cân: "PHIÊU LƯU", "CHIẾN LỢI PHẨM" nặng hơn "CÁI ĐÓI" | `THEO SỬ GIA` · nhãn trên cán cân | — |
| 10 | 25,5–30,5 | **bay** → `rome`; nét chấm hành quân Uri → Rome; quân cờ Kaspar (`s-02`) dẫn hàng lính | ruy băng `1506` · nhãn `KASPAR VON SILENEN` · thẻ `150 LÍNH` | whoosh |
| 11 | 30,7–33,5 | **bay** → `alps`; ghim Marignano gần Milano; ngọn giáo gãy | ruy băng `1515` · nhãn `MARIGNANO` | hit |
| 12 | 33,6–35,8 | khiên chữ thập trắng phủ lên Thụy Sĩ | `TRUNG LẬP` | — |
| 13 | 36,0–39,1 | **bay** → `swiss`; ghim Zürich; quân cờ Zwingli (`s-03`) trên bục giảng | nhãn `ZWINGLI` | — |
| 14 | 39,2–42,9 | dấu `CẤM MỘ LÍNH` đóng ở Zürich; vài chấm đỏ nhấp nháy quanh (các bang nổi giận) | ruy băng `1521` | click |
| 15 | 43,5–46,4 | **bay** → `europe`; khiên trung lập sáng | ruy băng `1815` · `TRUNG LẬP` | whoosh |
| 16 | 46,6–50,1 | cánh đồng khô (vector); mũi tên người di cư ra mép trái | ruy băng `1816` · nhãn `CHÂU MỸ` | — |
| 17 | 50,3–53,3 | dấu đỏ đóng lên quân cờ lính | ruy băng `1859` · dấu `CẤM LÍNH THUÊ` | click |
| 18–19 | 53,9–57,2 | **bay** → `swiss`; két sắt ngân hàng (`s-07`) → dấu `?` lắc đầu | `NGÂN HÀNG?` | — |
| 20 | 57,3–61,8 | ba đạo cụ quanh Thụy Sĩ: đồng hồ quả quýt (`s-04`), bánh răng (vector), lọ thuốc (`s-05`) | `TAY NGHỀ` | — |
| 21–22 | 62,0–64,1 | dấu `?` → quân cờ Cận vệ Vatican (`s-06`) bật lên | — | — |
| 23 | 64,3–66,8 | **bay** → `rome`; `CountryTag` Vatican loé; Cận vệ đứng gác | nhãn `VATICAN` | — |
| 24 | 67,0–71,9 (+0,7) | **[TWIST + kết]** camera lùi về `europe`, mũi tên năm xưa mờ dần, chỉ còn chấm Vatican → khung cuối = khung đầu | — | deep hit nhẹ (−18) |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Không cảnh máu me ở Marignano (chỉ ngọn giáo gãy).

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `s-01-linh-danh-thue.png` | 03–08, 17 | lính giáo dài thế kỷ 16, hình chung |
| `s-02-kaspar-von-silenen.png` | 10 | đại úy thế kỷ 16, hình chung (không có chân dung thật) |
| `s-03-zwingli.png` | 13–14 | mục sư thế kỷ 16, chibi tôn trọng |
| `s-04-dong-ho-quyt.png` | 20 | đồng hồ quả quýt |
| `s-05-lo-thuoc.png` | 20 | lọ thuốc, vỉ thuốc |
| `s-06-can-ve-vatican.png` | 21–23 | Cận vệ đồng phục sọc xanh vàng đỏ |
| `s-07-ket-sat.png` | 18–19 | két sắt ngân hàng |
| *(dùng lại)* `t-04-tui-tien-coc` | 08 | tập Mét vuông |

---

## v2 (gói B, Lucas duyệt Cổng 3 v2 2026-10-25)

*Giọng đọc v2: **68,6 s** (25 câu). Câu 24–25 thu riêng một lượt (câu 23 "Vẫn còn." bị dính ở lượt đầu).*

| Câu | Hình (v2) |
|---|---|
| 01–04 | như v1, thêm **hồ Genève, hồ Zürich, dãy Alps nổi khối** (minh họa) hiện ở mọi khung gần Thụy Sĩ |
| 05–07 | như v1 |
| 08 | **[ĐÙA]** tấm biển lật thành áp phích **"TUYỂN LÍNH"** (bàn tay chỉ) |
| 09 | cán cân biểu tượng: la bàn + rương chiến lợi phẩm (nặng) ↔ bát rỗng; nhãn `PHIÊU LƯU · CHIẾN LỢI PHẨM` / `CÁI ĐÓI` |
| 10 | hàng lính nhỏ theo sau Kaspar; **cổng thành Rome** (minh họa); **trống hành quân** (SFX Pixabay 502886) |
| 11 | ruy băng 1515, Marignano, khiên, thẻ `TRUNG LẬP · THƯỜNG COI LÀ KHỞI ĐẦU` |
| 12–13 | khung Zürich: Zwingli, ruy băng 1521, dấu `CẤM MỘ LÍNH`, các bang nhấp nháy |
| 14 | khung châu Âu: 1815, khiên, thẻ `TRUNG LẬP · ĐƯỢC CÔNG NHẬN` |
| 15–17 | **bay → Genève**; `?` → thẻ `TAY NGHỀ`; két sắt mờ dần, nhãn `MỘT PHẦN` |
| 18 | biểu tượng trang sức bị gạch → đồng hồ quả quýt ở Genève |
| 19 | mũi tên vàng từ Lyon (Pháp) sang Genève, nhãn `THỢ TỪ PHÁP` |
| 20 | thẻ `HỘI CHỮ THẬP ĐỎ · GENÈVE · 1863`, nhịp sáng ở Genève (**không** vẽ biểu tượng chữ thập đỏ: biểu tượng được bảo hộ) |
| 21 | **bay → châu Âu**; các mũi tên cũ chở đồng hồ, lọ thuốc, bánh răng đi khắp châu Âu; thẻ `TỪ LÍNH → TAY NGHỀ` |
| 22–23 | khung Thụy Sĩ; `?` → Cận vệ Vatican |
| 24 | **bay → Rome**; **kính lúp** phóng to Vatican (minh họa), nhãn `~0,44 KM²` |
| 25 | lùi về châu Âu; mũi tên lính năm xưa sáng lại rồi tắt, chỉ còn một mũi tên nhỏ tới Rome, tắt trước khung cuối |
