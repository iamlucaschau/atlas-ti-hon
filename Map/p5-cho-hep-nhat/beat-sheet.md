# Cổng 4 · Beat sheet — "Chỗ hẹp nhất Việt Nam"

*2026-10-21 — **Lucas duyệt Cổng 4**. Giọng đọc: 71,43 s, 234 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối → ~72,1 s. Style I + luật kênh: **mở đầu bay từ frame 1** (frame 0 = khung toàn quốc), camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame), phụ đề ≤ 4 chữ / 20 ký tự, ≤ 2 khối chữ ngoài phụ đề, khung cuối = khung đầu (`seamKeys`). Nhạc nền: **P5 "Investigations" (Kevin MacLeod)**, `duck` sâu hơn ở cảnh Mẹ Suốt (câu 16–19) — ghi công trong mô tả. ("Sneaky Snitch" dự phòng nghe tinh nghịch, không hợp đoạn thời chiến.) Kịch bản: Lucas duyệt 2026-10-21.*

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Việt Nam theo tỉnh | `ProvinceMap` + `VN2024` (63 tỉnh, có **Quảng Bình** riêng) cho câu 01–19; `VN2025` (34 tỉnh, **Quảng Trị mới**) từ câu 20 | đổi lớp bằng loang màu (`wipe`) từ Đồng Hới |
| **Thước đo chỗ hẹp nhất** | đoạn thẳng từ biên giới Lào ~17,285°B 106,286°Đ tới bờ biển ~17,471°B 106,635°Đ (**Luis đo** trên Natural Earth 10m, ~42 km) | vạch vàng có hai đầu chặn, kéo dần; thẻ `< 50 KM` (không ghi 42) |
| Thước dọc 1.650 km | cực Bắc ~23,37°B 105,29°Đ → cực Nam đất liền ~8,57°B 104,86°Đ | cùng màu, cùng kiểu vạch với thước ngang để so cùng loại |
| Dãy Trường Sơn | lớp bóng địa hình có sẵn + dải tô nâu-xanh mờ dọc biên giới Việt – Lào + sticker `n-02` | "ép" sát biển: dải trượt nhẹ từ tây sang đông |
| Đường Bắc – Nam | 3 tuyến vector song song qua eo: quốc lộ (xám), đường sắt (`Track` của kit), đường Hồ Chí Minh (cam) — **sơ đồ minh hoạ**, không vẽ theo toạ độ thật | thắt lại ở eo |
| Đồng Hới, sông Nhật Lệ | `CityPin` Đồng Hới 17,47°B 106,62°Đ; nhãn `SÔNG NHẬT LỆ` khi zoom gần | tỉnh lỵ mới (câu 22) |
| Lào | `CountryTag LÀO` + **cờ Lào (thêm vector vào kit, `FlagKind "laos"`)**: ba dải đỏ – xanh – đỏ, đĩa trắng | gọi tên ở câu 01, 05 |
| Hoàng Sa, Trường Sa | `VnIslands` (khung toàn quốc 0, 06–07, 23) | luật kênh |
| Nhãn tỉnh | `ProvinceTag QUẢNG BÌNH` (câu 03), `QUẢNG TRỊ` (câu 21) | ≥ 48 px |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (toàn quốc, khung nối vòng) | 106,5°Đ 16°B · thấy cả Hà Giang tới Cà Mau + Hoàng Sa, Trường Sa | frame 0, 06–07, 23 (về cuối) |
| `eo` (eo Quảng Bình) | 106,45°Đ 17,4°B · thấy biên giới Lào – biển, Hà Tĩnh tới Quảng Trị | 01–05, 08–15, 20–22 |
| `dh` (Đồng Hới, cửa Nhật Lệ) | 106,62°Đ 17,47°B · gần hơn `eo` ~2,5× | 16–19 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `vn` toàn quốc (khung nối vòng) | — | — |
| 01 | 0,05–4,2 | **từ frame 1 bay** `vn` → `eo` (~0,9 s); **thước vàng kéo ngang** từ bờ biển sang biên giới; `CountryTag LÀO` mọc, cờ Lào cắm | thẻ `< 50 KM` · tag `LÀO` | whoosh |
| 02 | 4,3–4,7 | dấu `?` nảy cạnh thước | — | — |
| 03 | 4,75–5,6 | Quảng Bình (`VN2024`) tô sáng, viền loé | `ProvinceTag QUẢNG BÌNH` | click |
| 04 | 5,9–10,0 | nhân vật chạy (`n-01`) đặt ở đầu thước phía biển; vạch đích kẻ ô ở đầu biên giới | thẻ `≈ MARATHON` | — |
| 05 | 10,1–13,7 | **[ĐÙA]** ô dù bãi biển (`g-04`, dùng lại tập Tây Nguyên) ở bờ; người chạy trượt dọc thước sang biên giới, hơi lảo đảo ở cuối | — | click |
| 06 | 13,9–18,5 | **bay** → `vn`; thước dọc vàng vẽ từ Hà Giang xuống Cà Mau; thước ngang nhỏ xíu ở eo vẫn sáng | thẻ `1.650 KM` | whoosh |
| 07 | 18,6–20,6 | thước ngang nhân bản xếp chồng dọc theo thước dài (30+ đoạn) | thẻ `x30+` | deep hit |
| 08 | 20,8–22,4 | **bay** → `eo`; eo đất nháy | dấu `?` | whoosh |
| 09 | 22,5–23,4 | dãy núi đồ chơi (`n-02`) trồi lên dọc biên giới Lào | nhãn `DÃY TRƯỜNG SƠN` | click |
| 10 | 23,5–27,7 | dải Trường Sơn trượt nhẹ về phía biển, khoảng đất ven biển co lại; đường biên giới loé trên đỉnh núi | — | — |
| 11 | 27,7–31,6 | phủ màu nâu 85 % phía tây, dải xanh mỏng ven biển | thẻ `85% ĐỒI NÚI` | — |
| 12 | 31,9–32,7 | máy dừng; mũi tên từ bắc chĩa xuống eo | — | — |
| 13 | 32,7–35,0 | 3 tuyến đường từ phía bắc chạy xuống, **thắt lại** qua eo | — | whoosh |
| 14 | 35,0–38,4 | xe tải (`g-02`) chạy trên quốc lộ, tàu (`p-02`) trên đường sắt, đường Hồ Chí Minh sáng cam | — | — |
| 15 | 38,5–41,1 | màu bản đồ ngả xám; vài vòng sóng đỏ nhấp nháy dọc eo (không vẽ bom, không lửa) | ruy băng `THỜI CHIẾN` | low boom (nhỏ) |
| 16 | 41,3–44,2 | **bay** → `dh`; đầu thước phía biển chạm cửa Nhật Lệ, viền sáng | nhãn `ĐỒNG HỚI` · `SÔNG NHẬT LỆ` | whoosh |
| 17 | 44,3–47,6 | **[NGƯỜI]** con đò (`n-03`) xuất hiện trên sông, mái chèo lắc chậm | — | (nước nhẹ) |
| 18 | 47,6–51,9 | đò trôi chậm qua sông từ bờ này sang bờ kia; nhạc lắng | nhãn `MẸ SUỐT` | — |
| 19 | 52,0–57,0 | cuốn sổ thơ (`n-04`) mở ra cạnh bến; | ruy băng `1965` · nhãn `TỐ HỮU` | click |
| 20 | 57,3–61,5 | **bay** → `eo`; ruy băng ngày; con dấu `1/7/2025`; ranh giới Quảng Bình – Quảng Trị (`BorderLine`) loé rồi mờ | ruy băng `2025` | stamp |
| 21 | 61,6–64,7 | **loang màu** Quảng Bình + Quảng Trị thành một khối (`VN2024` → `VN2025`) | `ProvinceTag QUẢNG TRỊ` | whoosh nhẹ |
| 22 | 64,7–67,6 | ghim tỉnh lỵ nảy lên đúng Đồng Hới, ngay đầu thước | nhãn `TỈNH LỴ: ĐỒNG HỚI` | click |
| 23 | 67,7–71,2 (+0,7) | thước loé lần cuối; camera lùi về `vn` (khung frame 0), các lớp tắt dần → khung cuối = khung đầu | — | — |

Không có SFX tổng hợp/cartoon; tối đa 1 SFX mỗi beat. Cảnh 15 tránh hình bạo lực: chỉ đổi màu + sóng tín hiệu.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `n-01-runner.png` | 04–05 | người chạy marathon đồ chơi |
| `n-02-mountain-range.png` | 09–11 | dãy núi đồ chơi (Trường Sơn) |
| `n-03-ferry-mother.png` | 17–18 | bà mẹ chèo đò chở bộ đội — **nhân vật chung**, không vẽ theo ảnh thật |
| `n-04-poem-notebook.png` | 19 | sổ thơ + bút |
| dùng lại `g-04-beach`, `g-02-produce-truck`, `p-02-old-train` | 05, 14 | đã tách nền |
