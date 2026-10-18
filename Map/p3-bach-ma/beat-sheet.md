# Cổng 4 · Beat sheet — "Bức tường Bạch Mã"

*2026-10-19 — **Lucas duyệt Cổng 4**. Giọng đọc: 69,5 s, 228 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối (nối vòng mềm) → ~69,9 s. Style I + luật kênh: camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame, ease in-out, không rung, không blur), phụ đề ≤ 4 chữ / 20 ký tự, khung cuối = khung đầu (`seamKeys`). Nhạc nền P3 `PILLAR_MUSIC.P3` ("Floating Cities", Kevin MacLeod — ghi công trong mô tả). Cổng 2: so bằng nhiệt độ trung bình tháng; "bức tường" = ranh giới Huế – Đà Nẵng của HDX (§3.2 A).*

## Hình học cần (Cổng 5)

| Lớp | Nguồn | Ghi chú |
|---|---|---|
| Bức tường Bạch Mã | ranh giới chung Huế – Đà Nẵng trong `vn-provinces-2025.topo.json` (OCHA/HDX) | đã đo: 1 đường liền, 118 km, 107,47°E 16,03°N → 108,20°E 16,21°N (ra biển ở Hải Vân – Lăng Cô). Kit mới: `ProvinceBorder` (topojson `mesh` giữa 2 tỉnh), vẽ vạch sáng + vẽ dần |
| Việt Nam, nước láng giềng, biển | `world-atlas` như các tập trước | Việt Nam một màu (không tô theo tỉnh) + Hoàng Sa, Trường Sa theo luật kênh |
| Hai nửa khí hậu | `RegionFill` (minh hoạ) cắt theo đất liền Việt Nam: phía bắc vạch Bạch Mã / phía nam | ghi "minh hoạ" trong mô tả |
| Dải mưa Trung Bộ | `ProvinceMap` (VN2025) tô Quảng Trị, Huế, Đà Nẵng, Quảng Ngãi (dải ven biển miền Trung) màu "mưa" | chỉ khi nói về mưa (câu 17–21) |
| Gió, mây, mưa | vector minh hoạ (mũi tên, mây, vệt mưa) | không vẽ đường đi của một đợt gió cụ thể |

## Camera

| Khung | Tâm / zoom (dự kiến) | Dùng ở câu |
|---|---|---|
| `vn` (cả nước + Biển Đông) | 109,8E 14,8N · z≈19 (như tập ĐBSCL) | 01–05, 10–15, 22, 24 (khung nối vòng) |
| `haivan` (dãy Bạch Mã – đèo Hải Vân) | 107,85E 16,12N · z≈260 | 06–09, 23 |
| `mientrung` (Quảng Bình → Quảng Ngãi) | 107,6E 16,3N · z≈70 | 16–21 |

## Màu khoá

| Vật | Màu |
|---|---|
| Việt Nam | `ATLAS.c` đỏ nhạt như các tập trước (Hoàng Sa, Trường Sa cùng màu) |
| Nửa bắc (có mùa đông) | xanh lạnh `#BFE3F2`, 60 % |
| Nửa nam (2 mùa) | vàng nắng `#F6D98A`, 60 % |
| Bức tường Bạch Mã | vạch trắng viền vàng `ATLAS.gold`, loé khi được gọi tên |
| Gió mùa đông bắc | mũi tên xanh lam đậm `#3D8FD0` viền trắng |
| Mây, mưa | mây xám `#8E979C`, vệt mưa xanh nhạt `#7EC8F0` |
| Dải mưa Trung Bộ | xanh mưa `#5B8FD9` |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| 01 | 0,0–3,1 | `vn`; ghim **HÀ NỘI** loé; nhiệt kế nhỏ tụt xuống | thẻ `16 °C` · `TB · HÀ NỘI` | click |
| 02 | 3,2–5,1 | ghim **SÀI GÒN** loé; nhiệt kế đầy | thẻ thứ 2 `> 25 °C` · `TB · SÀI GÒN` (2 thẻ cạnh nhau) | click |
| 03 | 5,2–6,7 | hai thẻ thu nhỏ; một vạch ngang mờ chạy qua giữa dải đất | — | — |
| 04 | 6,7–7,3 | dấu "?" trên vạch | — | click |
| 05 | 7,4–8,1 | vạch Bạch Mã (ranh giới HDX) loé sáng, vẽ dần từ tây ra biển | `BẠCH MÃ` | thud |
| 06 | 8,3–11,9 | **bay** → `haivan`; núi nổi khối (vân địa hình), vạch chạy dọc sống núi ra tới biển; ghim **HUẾ** phía bắc, **ĐÀ NẴNG** phía nam | — | whoosh |
| 07 | 11,9–17,6 | `[NGƯỜI]` ruy băng `1826`; cổng Hải Vân Quan (`m-05`) mọc trên đỉnh đèo; vua Minh Mạng (`m-01`) đứng cạnh | ruy băng `1826` | click |
| 08 | 17,7–19,2 | nét đứt đường Bắc – Nam chạy qua cổng (sơ đồ) | — | click |
| 09 | 19,3–21,4 | một mũi tên gió nhỏ từ bắc xuống, "đụng" vạch rồi dội lại (chơi chữ "canh cả gió") | — | — |
| 10 | 21,7–24,4 | **bay** → `vn`; mũi tên gió mùa đông bắc lớn tràn từ phía bắc xuống | — | whoosh |
| 11 | 24,5–27,3 | mũi tên ngắn dần, nhạt dần khi xuống phía nam | — | — |
| 12 | 27,3–29,4 | mũi tên dừng ở vạch Bạch Mã, vạch loé | — | thud |
| 13 | 29,6–32,1 | nửa bắc phủ xanh lạnh | `4 MÙA` (phía bắc) | click |
| 14 | 32,1–34,8 | nửa nam phủ vàng nắng | `2 MÙA` (phía nam) | click |
| 15 | 34,8–38,4 | `[ĐÙA]` người Hà Nội áo phao (`m-02`) ở phía bắc run run, người Sài Gòn áo thun (`m-03`) ở phía nam | — | — |
| 16 | 38,7–40,4 | **bay** → `mientrung`; hai lớp màu khí hậu tắt; mũi tên gió đông bắc quay vào từ biển | — | whoosh |
| 17 | 40,5–46,1 | mây xám kéo vào dải ven biển; dải tỉnh Trung Bộ tô "mưa"; vệt mưa trút xuống; ký hiệu bão nhỏ ngoài khơi | — | — |
| 18 | 46,1–49,3 | mây dày lên | thẻ `THÁNG 8 – 12` · `MÙA MƯA` | click |
| 19 | 49,5–52,4 | ghim **HUẾ**; cột mưa tháng 10 dâng lên | thẻ `772,7 MM` · `HUẾ · THÁNG 10` | click |
| 20 | 52,4–54,4 | cột thứ hai "Hà Nội cả năm" cao gấp đôi đứng cạnh, cột Huế = nửa | `HÀ NỘI · CẢ NĂM` | click |
| 21 | 54,5–57,5 | `[ĐÙA]` người Huế áo mưa (`m-04`) | — | — |
| 22 | 57,5–59,7 | **bay** → `vn`; Sài Gòn: mặt trời, mây tan | — | whoosh |
| 23 | 60,0–65,5 | **bay** → `haivan`; mưa dày nhất trên đỉnh Bạch Mã; ghim **ĐỈNH BẠCH MÃ** `[TWIST]` | thẻ `~10.000 MM/NĂM` · `ĐỈNH BẠCH MÃ` | hit |
| 24 | 65,6–69,9 | vạch tường loé lần cuối; ~50 % câu **bay** về `vn`; 0,7 s nhạc cuối: mưa, mây, ghim tắt = khung đầu | — | — |

Luật chữ: ≤ 2 khối chữ ngoài phụ đề (hai thẻ câu 01–02 là 2 khối; ghim tên thành phố ẩn khi có 2 thẻ). Nhãn số liệu ghi đúng loại: "TB" = trung bình tháng; lượng mưa ghi tháng / cả năm.

Khung không đứng yên: sóng biển, mây trôi chậm, mũi tên gió chuyển động, mưa rơi liên tục ở các câu mưa.

## Ảnh

Mới (`image-prompts.md`): `m-01` vua Minh Mạng · `m-02` người Hà Nội áo phao · `m-03` người Sài Gòn áo thun · `m-04` người Huế áo mưa · `m-05` cổng Hải Vân Quan.
Vector: nhiệt kế, mây, mưa, mũi tên gió, ký hiệu bão, mặt trời.

## Ảnh bìa (ý tưởng)

Khung `vn`: nửa bắc xanh lạnh, nửa nam vàng nắng, vạch Bạch Mã sáng ở giữa; hook 2 tầng **"MỘT DÃY NÚI"** / **"CHIA ĐÔI MÙA ĐÔNG"**, vòng đỏ quanh Bạch Mã.
