# Cổng 4 · Beat sheet — "Cuộc giành khách: sân bay Long Thành"

*2026-10-20 — **Lucas duyệt Cổng 4**. Giọng đọc: 68,95 s, 247 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối (nối vòng mềm) → ~69,7 s. Style I + luật kênh: camera đẩy chậm mỗi beat (≤ ~5 % / 3 s), bay chỉ khi đổi nơi (≥ 22 frame, ease in-out, không rung, không blur), phụ đề ≤ 4 chữ / 20 ký tự, ≤ 2 khối chữ ngoài phụ đề, khung cuối = khung đầu (`seamKeys`). Nhạc nền P2 `PILLAR_MUSIC.P2` ("Wallpaper", Kevin MacLeod — ghi công trong mô tả). Cổng 2: 791 ha ↔ 5.000 ha, khung minh hoạ (§3.2 A), giữ 42 triệu lượt (2025).*

## Hình học cần (Cổng 5)

| Lớp | Nguồn | Ghi chú |
|---|---|---|
| TP.HCM, Đồng Nai (tỉnh 2025) | `VN2025` trong `vn-provinces.tsx` (OCHA/HDX) | tô pastel 2 tỉnh + `ProvinceTag`; các tỉnh khác nền |
| Sông Sài Gòn / Đồng Nai, bờ biển Cần Giờ – Vũng Tàu | nền `world-atlas` + Natural Earth sông (nếu có trong kit; nếu không: bỏ sông) | mốc định vị |
| Tân Sơn Nhất | khung minh hoạ **791 ha** (≈ 2,4 × 3,35 km), tâm 106,652°E 10,819°N, 2 đường băng song song hướng ~07/25 | ghi "minh hoạ theo diện tích quy hoạch" trong mô tả |
| Long Thành | khung minh hoạ **5.000 ha** (≈ 7,07 × 7,07 km), tâm ≈ 107,040°E 10,775°N (Wikipedia / ch-aviation, lệch ~1 km), 2 đường băng hướng 05/23 | sáu khung TSN (3 × 2) xếp vừa trong khung LT ở câu 17 |
| Đường bay TSN → LT | nét đứt cong, ~43 km giữa hai tâm | nhãn `~40 KM` theo C1 |
| Dòng khách | chấm tròn nhỏ (vector) chạy dọc đường bay; khách quốc tế màu vàng, nội địa màu trắng | sơ đồ minh hoạ |

## Camera

| Khung | Tâm / zoom (dự kiến, chỉnh ở Cổng 5) | Dùng ở câu |
|---|---|---|
| `vung` (TP.HCM – Đồng Nai, thấy cả hai sân bay) | 106,85E 10,80N · khung ngang ~70 km | 01–03, 13–15, 20–22, 26–28 (khung nối vòng) |
| `lt` (Long Thành) | 107,04E 10,775N · khung ngang ~14 km | 04–05, 16–19, 23 |
| `tsn` (Tân Sơn Nhất + nội thành) | 106,66E 10,81N · khung ngang ~8 km | 06–12, 24–25 |

Khung vùng Nam Bộ không tới Biển Đông xa → không cần ghim Hoàng Sa, Trường Sa (luật kênh: chỉ khi khung có cả bờ biển Việt Nam / Biển Đông).

## Màu khoá

| Vật | Màu |
|---|---|
| TP.HCM / Đồng Nai | pastel từ `VN2025` (tô màu láng giềng khác nhau) |
| Khung Tân Sơn Nhất | xám bê tông `#C9C3B6`, viền đậm |
| Khung Long Thành | kem `#F3E7C9`, viền vàng `ATLAS.gold` |
| Đường băng | xám đậm `#5E6166`, vạch trắng |
| Mái nhà quanh TSN | sticker `l-03` + chấm đỏ cam |
| Khu quân sự (minh hoạ) | gạch chéo xanh rêu `#7C8B5A` 40 % |
| Sân golf (minh hoạ) | xanh cỏ `#8CC970` |
| Khách quốc tế / nội địa | chấm vàng `#F2B630` / chấm trắng |
| Đường bay | nét đứt trắng viền xanh `#3D8FD0` |
| Khoản nợ | thẻ đỏ `#D9534F` |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| 01 | 0,0–4,8 | `vung`; TP.HCM, Đồng Nai tô pastel; máy bay đồ chơi (`l-01`) đậu ở khung TSN, mũi máy bay chỉ lên mép trên (nhãn hướng **BẮC KINH ↑**); tới chữ "Đồng Nai": máy bay nhảy sang khung Long Thành, Đồng Nai viền loé + `ProvinceTag` | `BẮC KINH ↑` · tag `ĐỒNG NAI` | whoosh |
| 02 | 4,9–6,7 | hành khách kéo vali (`l-07`) cạnh TSN nhìn theo; nét đứt TSN → LT vẽ dần | `~40 KM` | — |
| 03 | 6,7–7,5 | thẻ đỏ **NỢ** đóng dấu lên khung Long Thành | `KHOẢN NỢ` | stamp/thud |
| 04 | 7,7–11,8 | **bay** → `lt`; khung 5.000 ha, 2 đường băng, nhà ga hoa sen (`l-02`) mọc lên; thẻ tiền | thẻ `~110.000 TỶ` · `VỐN GIAI ĐOẠN 1`; chip nhỏ `CÓ TIỀN VAY` | whoosh |
| 05 | 11,9–13,2 | nhà ga trống; vài chấm khách lác đác rồi tắt | — | — |
| 06 | 13,3–17,1 | **bay** → `tsn`; khung TSN đông nghịt chấm khách chạy vào ra | thẻ `42 TRIỆU LƯỢT` · `TÂN SƠN NHẤT · 2025` | whoosh |
| 07 | 17,4–18,8 | viền khung TSN phồng ra (nét đứt) như muốn nở | — | — |
| 08 | 18,9–19,2 | viền chạm mái nhà, bật lại | dấu `HẾT CHỖ` | thud |
| 09 | 19,2–22,6 | mái nhà (`l-03`) san sát quanh hàng rào; một góc khung gạch chéo xanh rêu (khu quân sự, minh hoạ) | chip `DÙNG CHUNG QUÂN SỰ` | click |
| 10 | 22,7–24,7 | đường băng thứ ba vẽ mờ ngoài khung → đè lên mái nhà, mái nhà loé đỏ; dấu ✕ | — | click |
| 11 | 25,0–27,6 | **[PHE 1]** mảng cỏ sân golf trong khung loé; nhân vật `l-05` (cầm bản vẽ, cờ golf) đứng cạnh | nhãn `PHE MỞ RỘNG` | — |
| 12 | 27,6–29,4 | **[PHE 2]** nhân vật `l-06` (mũ bảo hộ) chỉ tay về phía đông; mũi tên dài hướng Long Thành | nhãn `PHE XÂY MỚI` | — |
| 13 | 29,5–32,5 | **bay** → `vung`; ruy băng năm | ruy băng `2015` | whoosh |
| 14 | 32,6–35,0 | số vàng lớn | `428 / 461` · `PHIẾU TÁN THÀNH` | hit |
| 15 | 35,1–36,8 | **[ĐÙA]** máy bay đồ chơi cất cánh êm từ con số, lượn sang Long Thành | — | — |
| 16 | 37,1–38,9 | **bay** → `lt`; khung Long Thành viền vàng loé | thẻ `5.000 HA` | click |
| 17 | 38,9–40,4 | sáu khung TSN (791 ha) bay vào, xếp 3 × 2 vừa khít trong khung Long Thành | thẻ `5.000 HA ↔ 791 HA` · `DIỆN TÍCH QUY HOẠCH` | click × nhịp (1 SFX) |
| 18 | 40,6–41,6 | sáu khung tan; đường băng Long Thành loé vạch trắng | — | — |
| 19 | 41,7–42,9 | nhà ga trống, dấu `?` trên mái hoa sen | — | — |
| 20 | 43,0–45,8 | **bay** → `vung`; Long Thành "hút": toàn bộ chấm vàng (quốc tế) ở TSN bắt đầu kéo sang | nhãn `ACV: DỜI HẾT` | whoosh |
| 21 | 45,9–48,0 | một nhóm chấm vàng bị giữ lại ở TSN (vòng tròn quanh, nhãn hướng nam "Đông Nam Á") | nhãn `VNA: GIỮ ĐÔNG NAM Á` | — |
| 22 | 48,0–51,1 | bốn máy bay nhỏ lần lượt nhảy TSN → LT | thẻ `4 ĐƯỜNG BAY` | click |
| 23 | 51,4–56,2 | **[NGƯỜI]** **bay** → `lt`; máy bay (`l-01`) hạ cánh xuống đường băng, cơ trưởng (`l-04`) đứng cạnh | ruy băng `15/12/2025` · nhãn `CƠ TRƯỞNG TRẦN TUẤN HƯNG` | whoosh |
| 24 | 56,4–59,1 | **[TWIST]** bảng tính (vector: tờ giấy kẻ ô + máy tính bỏ túi) bật lên | — | hit |
| 25 | 59,1–61,7 | dòng trong bảng tính sáng lên | thẻ `THU ĐỦ BÙ CHI · 1–2 NĂM` · `DỰ TÍNH CỦA ACV` | click |
| 26 | 61,8–64,2 | **bay** → `vung`; 10 chấm vàng lớn ở TSN, 9 chấm bay sang LT | số vàng `9/10` · `KHÁCH QUỐC TẾ` | click |
| 27 | 64,2–66,7 | vệt của chiếc máy bay đầu tiên (TSN → LT) sáng lại | — | — |
| 28 | 66,8–68,7 | dòng chấm vàng bay theo vệt; camera về đúng khung `vung` của câu 01; 0,7 s nhạc cuối: chấm, thẻ, nhãn tắt = khung đầu | — | — |

Luật chữ: ≤ 2 khối chữ ngoài phụ đề (ở câu 09 chỉ có chip, ở câu 23 ruy băng + nhãn). Nhãn số liệu ghi đúng loại: "VỐN GIAI ĐOẠN 1", "2025", "DIỆN TÍCH QUY HOẠCH", "DỰ TÍNH CỦA ACV".

Khung không đứng yên: chấm khách chạy liên tục, mây nhỏ trôi, máy bay lượn, đường băng loé.

⚠️ Nghe lại câu 08 "Hết chỗ." — chỉ dài 0,26 s trong bản thu (có thể bị nuốt). Nếu Lucas nghe thấy hụt, Luis tách câu này thành lượt riêng (tốn 1 request).

## Ảnh

Mới (`image-prompts.md`): `l-01` máy bay đồ chơi · `l-02` nhà ga hoa sen · `l-03` cụm mái nhà · `l-04` cơ trưởng · `l-05` phe mở rộng · `l-06` phe xây mới · `l-07` hành khách kéo vali.
Vector: khung sân bay, đường băng, chấm khách, đường bay, thẻ nợ, bảng tính, máy tính bỏ túi, dấu ✕, cờ golf nhỏ.

## Ảnh bìa (ý tưởng)

Khung `vung`: TSN nhỏ đông nghịt, Long Thành lớn trống, dòng chấm vàng chảy sang; hook 2 tầng **"SÂN BAY 110 NGHÌN TỶ"** / **"ĐANG CHỜ KHÁCH"**, vòng đỏ quanh Long Thành.
