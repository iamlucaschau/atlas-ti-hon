# Cổng 4 · Beat sheet — "Vì sao Tây Nguyên bỗng có biển?"

*2026-10-18 — **Lucas duyệt Cổng 4**. Giọng đọc: 70,9 s, 233 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối (nối vòng mềm) → ~71,3 s. Style I + luật kênh: camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame, ease in-out, không rung, không blur), phụ đề ≤ 4 chữ / 20 ký tự, khung cuối = khung đầu (`seamKeys`). Nhạc nền P1 (`PILLAR_MUSIC.P1`). Bản đồ tỉnh: OCHA/HDX COD-AB v02 (Cổng 2 §3.1 A); Hoàng Sa, Trường Sa theo §3.2 A.*

## Hình học cần (Cổng 5)

| Lớp | Nguồn | Ghi chú |
|---|---|---|
| 34 tỉnh sau 1/7/2025 | OCHA/HDX `vnm_admin1.geojson` (v02, hiệu lực 25/9/2025, CC BY-IGO) | đã tải và kiểm: 34 đơn vị, diện tích khớp NQ 202; Đà Nẵng gồm Hoàng Sa (tới 112,8°E), Khánh Hoà gồm Trường Sa (tới 117,4°E). File gốc 47 MB → rút gọn (mapshaper, giữ ~1–2 %) thành TopoJSON < 300 KB trong `public/geo/` |
| 63 tỉnh trước 1/7/2025 (cảnh "trước") | Natural Earth admin-1 10m (public domain) ⚠️ kiểm số tỉnh Việt Nam trong file | dùng cho đúng trạng thái **trước** sáp nhập; chỉ vẽ viền mảnh, không tô màu từng tỉnh |
| Nước láng giềng, biển | `world-atlas` như các tập trước | Lào, Campuchia, Trung Quốc: đất trung tính, không nhãn |
| Ghi nguồn | mô tả video: "Ranh giới tỉnh: OCHA/HDX (CC BY-IGO). Bản đồ nền: Natural Earth." | bắt buộc theo giấy phép CC BY-IGO |

Kit mới: `ProvinceFill` (tô một tỉnh / nhóm tỉnh từ TopoJSON; vết loang từ một điểm như `Atlas` đang làm với nước), `ProvinceLines` (viền tỉnh mảnh, có `opacity` để mờ dần), `ProvinceTag` (tên tỉnh 48 px, không cờ, đi theo camera, viền loé khi lời đọc gọi tên — giống `CountryTag`).

## Camera

| Khung | Tâm / zoom (dự kiến) | Dùng ở câu |
|---|---|---|
| `highlands` (Tây Nguyên + dải duyên hải Nam Trung Bộ) | 108,3E 13,0N · vừa khung 107–110E × 10,5–15,5N | 01–04, 08–12, 28 (khung nối vòng) |
| `vn` (cả nước + Biển Đông, có Hoàng Sa, Trường Sa) | 108,5E 15,5N · vừa khung 102–117,5E × 8–23,5N | 05–07, 13–14, 20–23 |
| `gialai` (Pleiku → Quy Nhơn) | 108,6E 13,9N · vừa khung 107,6–109,4E × 13–14,7N | 15–19, 27 |
| `lamdong` (Đà Lạt → Mũi Né) | 108,3E 11,4N · vừa khung 107,3–109,1E × 10,4–12,4N | 24–26 |

## Màu khoá (cả tập)

| Vật | Màu |
|---|---|
| 5 tỉnh Tây Nguyên cũ (Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng) | `ATLAS.b` xanh lá "cao nguyên" |
| 4 tỉnh ven biển được ghép (Quảng Ngãi, Bình Định, Phú Yên, Bình Thuận) | `ATLAS.a` xanh dương nhạt (≈ 60 % độ đậm) "biển" |
| Tỉnh mới sau gộp (4 tỉnh có Tây Nguyên) | xanh lá loang phủ cả phần ven biển, viền tỉnh mới trắng kem |
| Cảnh "35 → 13": tỉnh có biển / không có biển | `ATLAS.a` xanh dương / `ATLAS.d` vàng cam |
| Cảnh "34 tỉnh" (câu 07, 22–23) | 34 màu pastel lấy từ 4 màu `ATLAS.a–d` pha trắng, không hai tỉnh kề nhau trùng màu; **Hoàng Sa cùng màu Đà Nẵng, Trường Sa cùng màu Khánh Hoà** |
| Tỉnh khác, mọi cảnh còn lại | đất `ATLAS.land`, viền tỉnh mảnh mờ |
| Ghim thành phố (Pleiku, Quy Nhơn, Đà Lạt, Mũi Né) | chấm trắng viền tối + tên 48 px |
| Trung tâm hành chính (Quy Nhơn, câu 27–28) | ghim đỏ `ATLAS.red` + toà nhà (`t-11`) |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| 01 | 0,0–2,8 | `highlands`; 5 tỉnh Tây Nguyên xanh lá, viền mảnh; dải bờ biển duyên hải sáng lên phía phải, Tây Nguyên "không chạm" | thẻ `0 MÉT BỜ BIỂN` | click |
| 02 | 2,9–4,5 | màu xanh lá loang ra tới bờ biển ở cả 4 hướng (xem trước kết quả) | — | whoosh |
| 03 | 4,6–5,4 | dấu "?" lớn trên Tây Nguyên (`Question`) | — | click |
| 04 | 5,4–6,3 | "?" vỡ; con dấu `GỘP TỈNH` (`Stamp`) đóng xuống | `GỘP TỈNH` | thud |
| 05 | 6,6–9,8 | **bay** → `vn`; lớp loang thu về; cả nước 63 tỉnh viền mảnh hiện dần (Natural Earth) | ruy băng `2025` | whoosh |
| 06 | 9,9–11,6 | viền 63 tỉnh loé một lượt từ bắc vào nam | đếm `63` | click |
| 07 | 11,6–13,3 | viền cũ tan dần, 34 tỉnh mới (HDX) loang màu pastel; Hoàng Sa, Trường Sa cùng màu Đà Nẵng, Khánh Hoà | đếm `63 → 34` | thud |
| 08 | 13,5–15,1 | **bay** → `highlands`; Kon Tum (xanh lá) loang sang Quảng Ngãi (xanh dương nhạt); nhãn cũ rơi khỏi bản đồ, nhãn mới hiện | `ProvinceTag` **QUẢNG NGÃI** | click |
| 09 | 15,2–16,6 | Gia Lai loang sang Bình Định | **GIA LAI** | click |
| 10 | 16,7–18,2 | Đắk Lắk loang sang Phú Yên | **ĐẮK LẮK** | click |
| 11 | 18,2–20,8 | Đắk Nông và Bình Thuận cùng loang vào Lâm Đồng (hai nhịp) | **LÂM ĐỒNG** | click ×2 |
| 12 | 20,9–22,8 | 4 khúc bờ biển của 4 tỉnh mới sáng lên lần lượt (viền vàng `glow`) | — | — |
| 13 | 23,0–23,9 | **bay** → `vn`; giữ màu 4 tỉnh mới | — | whoosh |
| 14 | 24,0–28,0 | văn bản Đề án (sticker `g-05`) bật lên góc trên; mũi tên cong từ vùng núi → bờ biển, lặp ở vài cặp khác trên cả nước | thẻ `MIỀN NÚI + CÓ BIỂN` | click |
| 15 | 28,1–31,2 | **bay** → `gialai`; thẻ trích dẫn trượt vào `[NGƯỜI]` (không chân dung, §3.5) | thẻ: tên + chức danh | click |
| 16 | 31,3–34,5 | 2 nông dân chibi (`d-09`, lật ngang một bản) đứng sát nhau giữa Tây Nguyên, rung nhẹ, mây xám nhỏ trên đầu `[ĐÙA]` | `"ÔM NHAU KÊU KHỔ"` | — |
| 17 | 34,7–37,0 | mây tan; bao cà phê, nông sản (`g-01`) mọc lên ở phía Pleiku | — | click |
| 18 | 37,1–38,2 | cảng Quy Nhơn: cần cẩu (`i-10`) + tàu container (`t-02`) | — | click |
| 19 | 38,3–40,7 | xe tải nông sản (`g-02`) chạy từ Pleiku xuống Quy Nhơn trên đường nét đứt (sơ đồ), lên tàu | ghim **QUY NHƠN** | whoosh |
| 20 | 41,0–44,7 | **bay** → `vn`; bản đồ 63 tỉnh: 35 tỉnh không có biển tô vàng cam, 28 tỉnh có biển xanh dương | thẻ `35 TỈNH KHÔNG CÓ BIỂN` | click |
| 21 | 44,8–46,4 | chuyển sang 34 tỉnh: vàng cam co lại còn 13 | đếm `35 → 13` | thud |
| 22 | 46,7–49,4 | `[PHE 1]` cả nước 34 màu pastel; các tỉnh mới "nở" nhẹ ra (scale 1,03) | — | click |
| 23 | 49,4–53,5 | `[PHE 2]` một xã ở rìa tỉnh (ghim xám) nối tới trung tâm tỉnh bằng nét đứt dài; xe (`b-06`) chạy chậm trên nét đứt | `CẢ TRĂM KM` | — |
| 24 | 53,8–57,6 | **bay** → `lamdong`; Lâm Đồng mới loé viền vàng | thẻ `24.233 KM² · RỘNG NHẤT NƯỚC` | click |
| 25 | 57,7–60,1 | ghim Đà Lạt (đồi thông có sương, `g-03`) và Mũi Né (bãi biển, `g-04`) bật lên | ghim **ĐÀ LẠT** · **MŨI NÉ** | click |
| 26 | 60,1–63,2 | `[ĐÙA]` mặt trời nhỏ đi từ Đà Lạt (sáng) sang Mũi Né (chiều) theo đường nét đứt; sương tan, sóng biển | — | — |
| 27 | 63,4–67,7 | **bay** → `gialai`; ghim Pleiku mờ, ghim đỏ + toà nhà (`t-11`) cắm ở Quy Nhơn sát bờ biển `[TWIST]` | ghim **QUY NHƠN** | thud |
| 28 | 67,8–71,3 | ghim đỏ nhấp nháy; ~60 % câu **bay** về `highlands`; 0,7 s nhạc cuối: lớp ghim, sticker tắt, màu trở về như câu 01 = khung đầu | — | — |

Luật chữ: ≤ 2 khối chữ cùng lúc ngoài phụ đề; tên tỉnh mới ẩn khi có thẻ số. Vùng an toàn: thẻ đặt y 260–600, phụ đề ở đáy vùng an toàn; khung `vn` dài theo chiều dọc nên vừa 9:16 nhưng ghim Trường Sa (≈ 8–11°N, 112–117°E) phải nằm trong x ≤ 940 — kiểm bằng `npm run draft`.

Khung không đứng yên: mây trôi nhẹ trên cao nguyên, sóng biển dọc bờ, tàu chạy ngoài khơi Quy Nhơn, viền tỉnh đang gọi tên loé nhịp nhàng.

## Ảnh

Mới (`image-prompts.md`): `g-01` bao cà phê + nông sản · `g-02` xe tải nông sản · `g-03` đồi thông có sương (Đà Lạt) · `g-04` bãi biển, ô dù (Mũi Né) · `g-05` tập văn bản đề án.
Dùng lại: `d-09-farmer` (ĐBSCL), `i-10-port-crane` (Singapore), `t-02-container-ship`, `t-11-gov-building` (Malacca), `b-06-car` (Brunei).

## Ảnh bìa (ý tưởng)

Khung `highlands` với 4 tỉnh mới đã loang xanh lá chạm biển, ghim đỏ Quy Nhơn; hook 2 tầng: **"TÂY NGUYÊN"** / **"CÓ BIỂN?"**, vòng đỏ quanh khúc bờ biển của Gia Lai.
