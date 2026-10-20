# Cổng 4 · Beat sheet — "Điện hạt nhân: canh bạc hay lời giải cho cơn khát điện?"

*2026-10-20 — **Lucas duyệt Cổng 4**. Giọng đọc: 74,70 s, 232 wpm, **tempo 1.13** (tăng từ 1.1 bằng bản thu cache để vào khung ≤ 75 s, không đổi chữ) — `vo-timestamps.md`. Style I + luật kênh: camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame), phụ đề ≤ 4 chữ / 20 ký tự, ≤ 2 khối chữ ngoài phụ đề, khung cuối = khung đầu (`seamKeys`). Nhạc nền: **P2 dự phòng "Inspired" (Kevin MacLeod)** để khác tập Long Thành liền trước ("Wallpaper") — ghi công trong mô tả. Kịch bản bản 4 (Lucas duyệt 2026-10-20).*

## Hình học cần (Cổng 5)

| Lớp | Nguồn | Ghi chú |
|---|---|---|
| Việt Nam toàn quốc + Hoàng Sa, Trường Sa | `world-atlas` + `VnIslands` (luật kênh) | khung `vn` |
| Tỉnh 63 (có Ninh Thuận) → 34 | `VN2024` (Natural Earth) cho 2009–2024; mờ sang `VN2025` (OCHA/HDX) từ cảnh 6 (2025–2026) | không gắn nhãn Khánh Hòa (lời đọc không nhắc) |
| Hai địa điểm | Phước Dinh ≈ 108,95°E 11,45°N (Ninh Thuận 1) · Vĩnh Hải ≈ 109,18°E 11,68°N (Ninh Thuận 2) | **toạ độ gần đúng, minh hoạ** — ghi trong mô tả |
| Hà Nội | 105,85°E 21,03°N | `CityPin` |
| Miền Bắc "tối đèn" | `RegionFill` cắt theo đất liền phía bắc ~19°N (minh hoạ) | chỉ ở cảnh 4 |
| Đường Ninh Thuận → Hà Nội | nét đứt đường chim bay ~1.100 km | nhãn `~1.100 KM` |
| Cờ Nhật Bản, Nga | **vẽ thêm vào kit `Flag`** (Nhật: nền trắng chấm đỏ; Nga: trắng – xanh – đỏ) | `CountryTag`-kiểu tại địa điểm khi gọi tên nước |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (cả nước + Biển Đông) | 108,6E 15,6N · z≈19 | 01–04, 06–08, 10–19, 26 (khung nối vòng) |
| `nt` (Ninh Thuận, hai địa điểm) | 109,05E 11,58N · z≈330 | 05, 09, 20–25 |

## Màu khoá

| Vật | Màu |
|---|---|
| Việt Nam | `ATLAS.c` như các tập trước (Hoàng Sa, Trường Sa cùng màu) |
| Ninh Thuận (VN2024) | vàng nhạt `#F3D98A` |
| Địa điểm nhà máy | ghim vàng `ATLAS.gold` + sticker nhà máy `d-01` |
| Miền Bắc tối đèn | xanh đêm `#1B2638` 65 %, nhấp nháy nhẹ |
| Cột "ước thiếu" | đỏ `#D9534F` (hố âm dưới mặt đất) |
| Cột "quy hoạch" | vàng `ATLAS.gold` |
| Dấu TẠM DỪNG / KHỞI ĐỘNG LẠI | đỏ / xanh lá `#4FA34A` |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| 01 | 0,0–3,6 | `vn`; ghim Ninh Thuận + Hà Nội (khung nối vòng); dấu đỏ **TẠM DỪNG** đóng lên Ninh Thuận | ruy băng `2016` · dấu `TẠM DỪNG` | thud |
| 02 | 3,7–6,1 | dấu đổi thành xanh **KHỞI ĐỘNG LẠI**, tia sét nhỏ loé | ruy băng `2024` · dấu `KHỞI ĐỘNG LẠI` | click |
| 03 | 6,1–7,8 | dấu `?` lớn giữa hai ghim | — | — |
| 04 | 8,0–9,5 | ghim Ninh Thuận và Hà Nội cùng loé (Pulse) | — | click |
| 05 | 9,6–12,5 | **bay** → `nt`; tô Ninh Thuận (VN2024) + `ProvinceTag NINH THUẬN`; hai ghim địa điểm mọc lên, sticker nhà máy `d-01` ở mỗi ghim | tag `NINH THUẬN` | whoosh |
| 06 | 12,6–15,1 | **bay** → `vn`; nét đứt Ninh Thuận → Hà Nội vẽ dần | `~1.100 KM` | whoosh |
| 07 | 15,4–18,2 | thẻ tiền; cọc tiền (vector) chồng lên ghim Ninh Thuận | thẻ `~200.000 TỶ` · `ƯỚC TÍNH 2008` | click |
| 08 | 18,3–20,7 | **[ĐÙA]** nhân vật kế toán `d-02` cầm máy tính, dãy số 0 chạy dài trên thẻ | — | — |
| 09 | 20,8–26,2 | **[NGƯỜI]** **bay** → `nt`; bục họp báo + nhân vật quan chức `d-03` (chibi chung, không giống người thật); micro | ruy băng `22/11/2016` · nhãn `BỘ TRƯỞNG MAI TIẾN DŨNG` | whoosh |
| 10 | 26,2–30,0 | **bay** → `vn`; tua-bin gió + tấm pin mặt trời (vector) mọc trên dải Nam Trung Bộ; đồng xu bay về một cây cầu nhỏ (hạ tầng) | — | — |
| 11 | 30,3–31,7 | dấu `?`; camera đẩy nhẹ lên phía bắc | — | — |
| 12 | 31,8–32,6 | bóng đèn trên Hà Nội chớp tắt | — | click |
| 13 | 32,7–36,2 | miền Bắc phủ xanh đêm, nhấp nháy (cắt điện luân phiên) | ruy băng `2023` | — |
| 14 | 36,3–40,5 | thẻ thiệt hại | thẻ `~1,4 TỶ USD` · `ƯỚC TÍNH · WORLD BANK` | click |
| 15 | 40,7–44,0 | **payoff**: cột đỏ "đào" xuống dưới đường chân trời thành một cái hố | `~4.350 MW` · `ƯỚC THIẾU · 6/2023` | thud |
| 16 | 44,1–48,0 | cột vàng bay từ ghim Ninh Thuận lên, lơ lửng trên miệng hố | `4.000–6.400 MW` · `QUY HOẠCH` | whoosh |
| 17 | 48,0–49,1 | cột vàng hạ xuống, lấp vừa miệng hố | nhãn `SO QUY MÔ` | click |
| 18 | 49,4–52,7 | **[PHE 1]** nhân vật `d-04` (kỹ sư cầm khiên tia sét) | nhãn `PHE ỦNG HỘ` | — |
| 19 | 52,8–56,5 | **[PHE 2]** nhân vật `d-05` (người dân cầm kính lúp, bong bóng dấu hỏi) | nhãn `PHE LO NGẠI` | — |
| 20 | 56,6–57,9 | **bay** → `nt`; bàn cược đồ chơi `d-06` (phỉnh, bài) đặt giữa hai địa điểm; tỉnh mờ sang VN2025 | — | whoosh |
| 21 | 58,0–59,4 | cờ Nhật cắm ở Ninh Thuận 2 nhổ lên, trượt ra khỏi khung | tag `NHẬT BẢN` + cờ | click |
| 22 | 59,5–60,6 | cờ Nga cắm xuống Ninh Thuận 1 | tag `NGA` + cờ | click |
| 23 | 60,7–61,9 | lá bài úp trên bàn cược, dấu `?` | chip `ĐANG THẨM ĐỊNH` | — |
| 24 | 62,2–67,2 | **[TWIST]** bàn cược tan; dấu đỏ **HUỶ THU HỒI** đóng lên vùng hai địa điểm; góc trên: mảnh miền Bắc tối đèn (callback cảnh 4, thu nhỏ) | ruy băng `13/7/2023` | hit |
| 25 | 67,3–70,6 | người dân sửa nhà `d-07` (thang, mái mới) ở Vĩnh Hải và Phước Dinh | thẻ `13 NĂM` | — |
| 26 | 70,7–74,5 | ruy băng `11/2024`; gia đình ôm thùng đồ `d-08` bước ra; ~50 % câu **bay** về `vn`; 0,7 s nhạc cuối: mọi lớp tắt = khung đầu | ruy băng `11/2024` | — |

Luật chữ: ≤ 2 khối chữ ngoài phụ đề (ruy băng + 1 thẻ/nhãn). Nhãn số liệu ghi đúng loại: "ƯỚC TÍNH 2008", "ƯỚC TÍNH · WORLD BANK", "ƯỚC THIẾU · 6/2023", "QUY HOẠCH", "SO QUY MÔ".

Khung không đứng yên: sóng biển, ghim nhấp nháy, miền Bắc chớp, tua-bin quay, phỉnh xoay.

## Ảnh

Mới (`image-prompts.md`, thư mục `public/images/p2-dien-hat-nhan/` đã tạo): `d-01` nhà máy điện hạt nhân đồ chơi · `d-02` kế toán · `d-03` quan chức họp báo · `d-04` phe ủng hộ · `d-05` phe lo ngại · `d-06` bàn cược · `d-07` người dân sửa nhà · `d-08` gia đình ôm thùng đồ.
Vector: ghim, dấu, cờ Nhật / Nga, tua-bin gió, pin mặt trời, bóng đèn, đồng xu, cầu, cột so sánh, hố.

## Ảnh bìa (ý tưởng)

Khung `vn`: miền Bắc tối đèn, ghim Ninh Thuận sáng, cột vàng lấp hố; hook 2 tầng **"DỪNG VÌ TIỀN"** / **"LÀM LẠI VÌ ĐIỆN"**, vòng đỏ quanh Ninh Thuận.
