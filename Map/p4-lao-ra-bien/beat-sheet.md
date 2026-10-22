# Cổng 4 · Beat sheet — "Lào không có biển, cửa biển ở Hà Tĩnh"

*2026-10-22 — **Lucas duyệt Cổng 4**. Giọng đọc: 67,53 s, 235 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối → ~68,2 s. Style I + luật kênh: **mở đầu bay từ frame 1** (frame 0 = khung Đông Nam Á), camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame), phụ đề ≤ 4 chữ / 20 ký tự, ≤ 2 khối chữ ngoài phụ đề, khung cuối = khung đầu (`seamKeys`). Nhạc nền: **P4 "Ascending the Vale" (Kevin MacLeod)** — màu châu Á, khác tập Đường bay ("Crossing the Chasm"); ghi công trong mô tả. Kịch bản: Lucas duyệt 2026-10-22.*

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Bản đồ nước | `Atlas` (world-atlas, Natural Earth): Lào tô màu chính; Thái Lan, Trung Quốc, Việt Nam tô nhạt khi được gọi tên | nước không gọi tên giữ màu nền |
| Viền biển "có biển" (hook) | viền sáng xanh dọc bờ biển của 10 nước có biển (chỉ viền, không tô) — Lào không có | `CoastBand`/glow theo bờ biển |
| Tuyến qua Thái Lan | Savannakhet 16,57°B 104,75°Đ → Laem Chabang 13,08°B 100,88°Đ, `Route` nét chấm (**sơ đồ**, không theo đường thật) | thẻ `> 700 KM` |
| Đường sắt Lào – Trung Quốc | Viêng Chăn 17,97°B 102,63°Đ → Côn Minh 25,04°B 102,71°Đ, `Track` có tà vẹt (sơ đồ) | thẻ `> 1.000 KM` |
| Đường chim bay | Viêng Chăn → Vũng Áng 18,11°B 106,40°Đ, nét đứt thẳng + biểu tượng chim nhỏ | thẻ `~400 KM · ĐƯỜNG CHIM BAY` |
| Cửa khẩu | Cha Lo 17,68°B 105,75°Đ · Cầu Treo 18,39°B 105,15°Đ → cảng: hai đường ngắn | thẻ `> 100 KM` |
| Đường sắt tương lai | Viêng Chăn → Thà Khẹc → Cha Lo → Vũng Áng, nét đứt mờ + tem `CHƯA XÂY` (sơ đồ) | thẻ `> 550 KM` |
| Cảng Vũng Áng | `CityPin` + cảnh cảng đồ chơi (cẩu, tàu) | không vẽ mặt bằng cảng thật |
| Cờ | Lào (đã có), Thái Lan, Trung Quốc, Việt Nam (đã có) | `CountryTag` khi gọi tên |
| Hoàng Sa, Trường Sa | `VnIslands` ở khung Đông Nam Á và khung có bờ biển Việt Nam | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `sea` (Đông Nam Á, khung nối vòng) | 113°Đ 5°B · thấy Myanmar tới Philippines, Indonesia, Timor-Leste | frame 0, 01, 25 (về cuối) |
| `lao` (Lào bốn bề) | 104°Đ 18,3°B | 02–07 |
| `indo` (Côn Minh → Laem Chabang) | 102,5°Đ 19°B | 08–11 |
| `east` (Viêng Chăn → Vũng Áng) | 104,5°Đ 18,1°B | 12–14, 22–24 |
| `port` (cảng Vũng Áng, gần) | 106,4°Đ 18,1°B, gần | 15–21 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `sea`: Đông Nam Á, 11 nước | — | — |
| 01 | 0,05–2,7 | **từ frame 1** camera tiến nhẹ vào giữa Đông Nam Á; viền biển 10 nước sáng xanh lần lượt; Lào xám, không viền | thẻ `11 NƯỚC` | whoosh |
| 02 | 2,75–3,3 | dấu `?` nảy trên Lào | — | — |
| 03 | 3,3–3,8 | Lào tô màu, viền loé | `CountryTag LÀO` | click |
| 04 | 3,85–5,8 | **bay** → `lao`; thùng hàng nhỏ đặt giữa Viêng Chăn | — | whoosh |
| 05 | 5,9–6,5 | **[ĐÙA]** nhân vật "đi nhờ" (`a-01`) giơ ngón cái bên đường | — | click |
| 06 | 6,7–9,5 | 5 mũi tên từ Lào chạm 5 biên giới, mỗi biên giới loé; đất liền bốn phía | thẻ `5 NƯỚC` | — |
| 07 | 9,55–12,8 | sông Mê Kông sáng xanh phía tây; dãy núi đồ chơi (`n-02`, dùng lại tập Chỗ hẹp) mọc dọc biên giới phía đông | — | — |
| 08 | 13,0–14,7 | **bay** → `indo`; Thái Lan tô nhạt | `CountryTag THÁI LAN` | whoosh |
| 09 | 14,8–18,2 | tuyến chấm Savannakhet → Laem Chabang vẽ dần; xe tải (`g-02`, dùng lại) chạy theo | thẻ `> 700 KM` | — |
| 10 | 18,3–21,7 | đường ray Viêng Chăn → Côn Minh vẽ lên phía bắc; Trung Quốc tô nhạt | ruy băng `2021` · `CountryTag TRUNG QUỐC` | click |
| 11 | 21,8–24,6 | **[ĐÙA]** tàu hàng (`t-06`, dùng lại) chạy tới Côn Minh, dừng giữa đất liền, dấu `?` | thẻ `> 1.000 KM` | — |
| 12 | 24,9–28,4 | **bay** → `east`; Trường Sơn lùi mờ, biển Đông hiện xanh phía đông | — | whoosh |
| 13 | 28,4–33,3 | đường chim bay nét đứt Viêng Chăn → Vũng Áng; ghim Vũng Áng; `CountryTag VIỆT NAM` | thẻ `~400 KM` (nhãn `ĐƯỜNG CHIM BAY`) | click |
| 14 | 33,3–36,0 | hai đường ngắn từ Cha Lo, Cầu Treo xuống cảng | thẻ `> 100 KM` | — |
| 15 | 36,3–39,8 | **bay** → `port`; xe tải nối đuôi chở kali, quặng (`a-02`) vào cảng | ruy băng `2024` | whoosh |
| 16 | 39,85–42,0 | cẩu (`i-10`, dùng lại) bốc hàng, tàu (`a-04`) chờ | thẻ `> 5 TRIỆU TẤN` | — |
| 17 | 42,1–43,6 | vòng tròn chia 3, một phần tô màu Lào | thẻ `~1/3 HÀNG LÀO` | click |
| 18 | 43,9–44,9 | khung dừng một nhịp, dấu `?` | — | — |
| 19 | 44,9–45,6 | cờ Lào cắm phập xuống cảng | — | deep hit |
| 20 | 45,7–47,8 | thanh cổ phần 60/40: 60 % màu Lào, 40 % màu Việt Nam | thẻ `60%` | — |
| 21 | 47,8–54,7 | **[NGƯỜI]** băng khánh thành đỏ (`a-03`) giữa cảng, kéo cắt, băng rơi; pháo giấy nhẹ | ruy băng `28/4/2025` · nhãn `BẾN SỐ 3` | click |
| 22 | 55,0–56,5 | **bay** → `east`; mũi tên từ Viêng Chăn hướng về biển | — | whoosh |
| 23 | 56,6–61,5 | đường ray tương lai nét đứt vẽ dần Viêng Chăn → Thà Khẹc → Cha Lo → Vũng Áng | thẻ `> 550 KM` | — |
| 24 | 61,6–63,4 | tem đỏ `CHƯA XÂY` đóng lên tuyến | tem `CHƯA XÂY` | stamp |
| 25 | 63,4–67,3 (+0,7) | tuyến Viêng Chăn → Vũng Áng loé lần cuối; camera lùi về `sea` (khung frame 0), các lớp tắt dần → khung cuối = khung đầu | — | — |

Không có SFX tổng hợp/cartoon; tối đa 1 SFX mỗi beat.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `a-01-hitchhiker.png` | 05 | người đi nhờ xe, ôm thùng hàng |
| `a-02-potash-ore.png` | 15 | đống bao kali + quặng sắt |
| `a-03-ribbon-cutting.png` | 21 | băng khánh thành, kéo vàng — **không người** |
| `a-04-bulk-ship.png` | 16 | tàu hàng rời đang nhận quặng |
| dùng lại `n-02-mountain-range`, `g-02-produce-truck`, `t-06-freight-train`, `i-10-port-crane` | 07, 09, 11, 16 | đã tách nền |
