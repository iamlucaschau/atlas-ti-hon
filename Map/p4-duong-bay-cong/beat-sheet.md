# Cổng 4 · Beat sheet — "Bay sang Mỹ: vì sao đường ngắn nhất lại vòng lên gần Alaska?"

*2026-10-20 — **Lucas duyệt Cổng 4**. Giọng đọc: 65,54 s, 233 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối → ~66,2 s. Style I + luật kênh: camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame), phụ đề ≤ 4 chữ / 20 ký tự, ≤ 2 khối chữ ngoài phụ đề, khung cuối = khung đầu (`seamKeys`). Nhạc nền: **P4 dự phòng "Crossing the Chasm" (Kevin MacLeod)** để khác tập Malacca ("Ascending the Vale") — ghi công trong mô tả. Kịch bản: Lucas duyệt 2026-10-20.*

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| **Bản đồ Thái Bình Dương (Mercator xoay 160°)** | kit hiện chiếu Mercator tâm 0°, San Francisco (−122°) bị đẩy sang trái → **thêm tuỳ chọn `rotate` cho `Atlas`/`toScreen`** (geoMercator().rotate([−160, 0])) | Việt Nam bên trái, Mỹ bên phải, Thái Bình Dương ở giữa |
| **Quả địa cầu đồ chơi** | **thành phần mới `ToyGlobe`**: d3 `geoOrthographic`, cùng `world-atlas`, đại dương xanh, viền mực, bóng đổ | cảnh "aha" (câu 17–18) |
| Đường la bàn (thẳng trên Mercator) | công thức loxodrome, 13.444 km (Luis tính) | đỏ `#D9534F`, nét đứt |
| Đường tròn lớn | nội suy cầu (slerp) 64 điểm, 12.598 km (Luis tính) | xanh `#3D8FD0`, nét liền |
| Sân bay | Tân Sơn Nhất 106,65°E 10,82°N · San Francisco 122,38°W 37,62°N | `CityPin` |
| Quần đảo Aleut | nhãn tại ~176°W 51,9°N (Adak) | `MapLabel` "QUẦN ĐẢO ALEUT" |
| Greenland, châu Phi | `world-atlas` (Greenland là một shape riêng; châu Phi = các nước châu Phi gộp) | cảnh twist |
| Cờ | Việt Nam, Nhật Bản (đã có), **Mỹ (thêm vào kit)** | `CountryTag` khi gọi tên nước |
| Hoàng Sa, Trường Sa | `VnIslands` (khung có bờ biển Việt Nam) | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `pac` (Thái Bình Dương, Mercator xoay) | 170°E 30°N · thấy từ Việt Nam tới California | 01–06, 12–16, 21 (khung nối vòng) |
| `vn` (Việt Nam + Tân Sơn Nhất) | 107°E 14°N · z≈19 | 05 (cất cánh) |
| `old` (bản đồ giấy cũ, Mercator) | cùng `pac` nhưng phủ lớp giấy da / đồ chơi | 07–11 |
| `globe` (quả địa cầu) | orthographic quay tâm ~170°E 40°N | 17–18 |
| `world` (Mercator toàn cầu) | 10°E 30°N · z thấp | 19–20 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| 01 | 0,0–4,0 | `pac`; ghim Tân Sơn Nhất và San Francisco; **đường thẳng đỏ** vẽ dần; máy bay đồ chơi (`l-01`, dùng lại từ tập Long Thành) đặt ở đầu đường | — | click |
| 02 | 4,0–4,7 | dấu `?` giữa đại dương | — | — |
| 03 | 4,8–5,4 | **đường cong xanh** vẽ vụt lên phía bắc | — | whoosh |
| 04 | 5,5–7,6 | đường cong loé ở đỉnh, nhãn ghim gần Alaska | nhãn `ALASKA` | click |
| 05 | 7,8–13,3 | **bay** → `vn`; Tân Sơn Nhất; máy bay cất cánh; `CountryTag VIỆT NAM` | ruy băng `2021` · tag `VIỆT NAM` | whoosh |
| 06 | 13,4–17,2 | **bay** → `pac`; máy bay đi hết đường cong tới San Francisco; `CountryTag MỸ` | thẻ `~14 TIẾNG` · tag `MỸ` | whoosh |
| 07 | 17,5–19,4 | bản đồ phủ lớp giấy da cũ (sepia) | — | — |
| 08 | 19,5–25,3 | **[NGƯỜI]** nhân vật Mercator (`b-01`) cầm compa đứng bên tấm bản đồ (`b-03`); quả cầu nhỏ trải phẳng thành tờ giấy | ruy băng `1569` · nhãn `GERARDUS MERCATOR` | click |
| 09 | 25,4–28,4 | la bàn (vector) đặt trên đường thẳng; kim giữ nguyên góc suốt đường | — | — |
| 10 | 28,5–29,3 | thuyền buồm (`Ship` của kit) chạy theo đường thẳng | — | — |
| 11 | 29,3–30,4 | đường thẳng nhấp nháy đỏ | dấu `?` | — |
| 12 | 30,7–34,5 | bỏ lớp giấy; thước đo chạy dọc đường đỏ | thẻ `~13.400 KM` · `ĐƯỜNG LA BÀN` | click |
| 13 | 34,6–40,2 | thước đo dọc đường xanh; `CountryTag NHẬT BẢN` loé khi gọi tên; nhãn Aleut | thẻ `~12.600 KM` · `ĐƯỜNG NGẮN NHẤT` | click |
| 14 | 40,3–42,0 | hai thẻ chồng, hiệu số bật ra | số vàng `−850 KM` | hit |
| 15 | 42,1–43,9 | **[ĐÙA]** hành khách (`b-02`) ngồi ghế máy bay, gối cổ, ngáp | thẻ `≈ +1 GIỜ BAY` | — |
| 16 | 44,0–45,0 | hành khách lắc đầu | — | — |
| 17 | 45,2–48,7 | **cảnh "aha"**: bản đồ cuộn lại thành quả địa cầu (`ToyGlobe`); đường xanh trên quả cầu thành đường thẳng nhất, đường đỏ cong | — | whoosh |
| 18 | 48,8–54,1 | quả cầu xoay chậm; một vệt mờ "chuyến bay thật" đi qua Nhật Bản rồi sang Mỹ, lệch nhẹ (minh hoạ, không vẽ qua Alaska); mũi tên gió nhỏ | — | — |
| 19 | 54,3–59,3 | **[TWIST]** **bay** → `world`; Greenland và châu Phi loé; Greenland trông to gần bằng châu Phi | nhãn `GREENLAND` · `CHÂU PHI` | whoosh |
| 20 | 59,4–62,1 | Greenland "bay" xuống đặt lên châu Phi, co lại đúng tỉ lệ diện tích (minh hoạ) | số vàng `×14` | hit |
| 21 | 62,1–65,3 | **bay** về `pac`; đường thẳng đỏ và đường cong xanh cùng hiện; 0,7 s nhạc cuối: các lớp tắt = khung đầu | — | — |

Luật chữ: ≤ 2 khối chữ ngoài phụ đề (ruy băng + 1 thẻ/nhãn). Mọi số đường bay ghi "Luis tính" trong mô tả.

Khung không đứng yên: sóng biển, máy bay lắc nhẹ, kim la bàn rung, quả cầu xoay.

## Ảnh

Mới (`image-prompts.md`, thư mục `public/images/p4-duong-bay-cong/` đã tạo): `b-01` Mercator · `b-02` hành khách mỏi · `b-03` tấm bản đồ giấy da cũ.
Dùng lại: `public/images/p2-long-thanh/cut/l-01-toy-plane.png` (máy bay đồ chơi không logo).
Vector: la bàn, thước đo, quả địa cầu, thuyền buồm (kit), mũi tên gió.

## Ảnh bìa (ý tưởng)

Khung `pac`: đường đỏ thẳng và đường xanh cong vòng gần Alaska; hook 2 tầng **"ĐƯỜNG THẲNG"** / **"LẠI XA HƠN"**, vòng đỏ quanh đỉnh đường cong gần Alaska.
