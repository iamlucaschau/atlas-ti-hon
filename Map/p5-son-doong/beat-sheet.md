# Cổng 4 · Beat sheet — "Hang lớn nhất thế giới, tìm thấy rồi lạc mất"

*2026-10-26 — **Lucas duyệt Cổng 4** (đã thêm ảnh). Giọng đọc: **72,65 s**, 216 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 73 s.*

**Luật áp dụng:**
- Style I + luật kênh. Mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame).
- Khung cuối = khung đầu, **không trống**: Việt Nam, chấm Phong Nha mờ.
- ≤ 4 đạo cụ gắn bản đồ cùng lúc; mỗi khối chữ ≤ 5 chữ, ≤ 2 khối cùng lúc; `Signature` đổi chỗ ở mỗi cú bay.
- **Lào** giáp vườn quốc gia → khi gọi / tô có `CountryTag` (cờ Lào đã có trong kit); `VnIslands` ở khung toàn quốc.
- Mọi ghim khai `PLACES` (tỉnh 2025: **Quảng Trị**), qua kiểm địa lý.

**Bước "lên 10" đã tính sẵn** (Bible §7.7):
- **Sân khấu riêng cho từng lần quay lại Phong Nha:** mưa đêm (01–04) → đường mòn rừng (08–11) → bản đồ cáp treo (19–22).
- **Bằng chứng bằng hình cho "lớn nhất":** **mặt cắt hang** đặt cạnh dãy nhà chọc trời (12).
- **Câu đùa có gag hình:** nhà thám hiểm nhìn lên, bấm nút thang máy không có.
- **Twist có hình:** mây hình thành dưới trần hang, rồi trôi ra cửa hang, gặp lại cảnh hook.
- **SFX thật hợp cảnh:** tiếng mưa / sấm (01), giọt nước trong hang (15), gió (24) — tải từ Pixabay ở Cổng 5.

**Nhạc nền:** P5 chính **"Investigations"** (Kevin MacLeod; tập P5 gần nhất, TP.HCM, dùng bài dự phòng "Sneaky Snitch"). Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Việt Nam theo tỉnh | `ProvinceMap` VN2025; Quảng Trị sáng hơn | khung `vn`, `VnIslands` |
| Vùng đá vôi Phong Nha – Kẻ Bàng | vector minh họa: mảng xám đá vôi lởm chởm, rừng xanh | không phải ranh giới thật của vườn quốc gia |
| Lào | `Atlas` + `CountryTag` "LÀO" khi camera ở Phong Nha | không gọi tên trong lời → chỉ nhãn nhỏ, tô màu nền |
| **Mặt cắt hang** (mới) | vector: vòm hang cao, sông ngầm dưới đáy, giếng trời, rừng; so với tòa nhà chọc trời (ảnh dùng lại `t-03-thap-cao-tang` tập Mét vuông) | minh họa, ghi trong mô tả |
| Mặt cắt địa chất | vector: lớp đá vôi, vết nứt, nước khoét dần (hoạt họa theo câu 16–18) | minh họa |
| Mây trong hang | dùng lại `Cloud` (tập EVN) dạng sương mỏng | — |
| Cáp treo | đường chấm minh họa tới hang Én, cabin (`c-04`) | **không** vẽ tuyến thật |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (khung nối vòng) | ~106,4°Đ 16,2°B | frame 0, 05–07 (thoáng), 25 (về cuối) |
| `phongnha` (Phong Nha – Kẻ Bàng, thấy biên giới Lào) | ~106,25°Đ 17,5°B, zoom cao | 01–04, 08–11, 19–22 |
| **màn mặt cắt** (không phải bản đồ: camera "chui" vào cửa hang, chuyển sang mặt cắt vector) | — | 12–18, 23–24 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `vn`: Việt Nam, chấm Phong Nha mờ | — | — |
| 01 | 0,05–4,7 | **từ frame 1** bay vào Phong Nha; trời tối, mưa rơi; người đi rừng (`c-01`) núp dưới vách đá | ruy băng `ĐẦU NHỮNG NĂM 1990` | mưa / sấm |
| 02 | 4,8–7,8 | cửa hang bên vách: **gió (vệt trắng) và mây thổi ra** | — | — |
| 03 | 8,0–9,8 | người đi rừng nhìn xuống vực tối, lắc đầu | — | — |
| 04 | 10,0–12,0 | rừng mọc che kín cửa hang, ghim `?` mờ dần (lạc mất) | — | — |
| 05–07 | 12,1–15,7 | dấu `?` → camera kéo lùi, ghim Sơn Đoòng sáng lên trên bản đồ | nhãn `SƠN ĐOÒNG` · thẻ `LỐI HANG LỚN NHẤT` / `THẾ GIỚI` | whoosh |
| 08 | 16,3–17,8 | về Phong Nha, nhãn tên người đi rừng | nhãn `HỒ KHANH` | — |
| 09 | 17,9–20,4 | đồng hồ năm tháng quay: 1990s → 2008; rừng dạt ra, cửa hang lộ lại | thẻ `18 NĂM` | click |
| 10 | 20,5–24,7 | đoàn thám hiểm có đèn đầu (`c-02`) theo người đi rừng xuống cửa hang | ruy băng `2009` · nhãn `HOWARD LIMBERT` | — |
| 11 | 24,9–27,8 | **chuyển cảnh: camera chui qua cửa hang → mặt cắt**; tia laser (`c-06`) quét, vòm hang hiện dần | — | — |
| 12 | 28,0–31,7 | **mặt cắt hang to dần; dãy nhà chọc trời (`t-03`, dùng lại) lọt thỏm bên trong** | thẻ `CAO TỚI ~200 M` | — |
| 13 | 31,8–33,6 | **[ĐÙA]** nhà thám hiểm nhìn lên, bấm nút thang máy (vector) → không có gì; dây thừng thả xuống | — | — |
| 14–15 | 34,2–37,0 | dấu `?` → **giọt nước** rơi | `NƯỚC` | giọt nước |
| 16 | 37,2–40,1 | mặt cắt địa chất: các lớp đá vôi xếp chồng | thẻ `ĐÁ VÔI ~400 TRIỆU NĂM` | — |
| 17 | 40,2–44,2 | vết nứt hiện ra; dòng sông ngầm chảy theo, khoét rộng dần (hoạt họa) | `VÀI TRIỆU NĂM` | — |
| 18 | 44,4–49,7 | trần sụp → **giếng trời**, tia nắng rọi xuống, rừng (`c-05`) mọc lên | nhãn `GIẾNG TRỜI` | — |
| 19 | 50,3–56,1 | về Phong Nha (bản đồ); đường cáp treo minh họa tới hang Én, cabin (`c-04`) | thẻ phe 1 `CÁP TREO HANG ÉN` / `ĐÓN THÊM KHÁCH` | — |
| 20 | 56,2–59,6 | thẻ phe 2; cabin mờ, dấu "?" | `UNESCO` / `GIỮ NGUYÊN HỆ SINH THÁI` | — |
| 21–22 | 59,7–62,9 | **[NGƯỜI XEM]** vé vào hang (vector), hàng người nhỏ chỉ 1 người lọt qua | thẻ `~1.000 NGƯỜI/NĂM` | click |
| 23 | 63,5–65,0 | quay lại mặt cắt; dấu `?` cạnh làn mây ở cửa hang | — | — |
| 24 | 65,2–67,1 | **[TWIST]** hơi ẩm bốc lên từ sông ngầm, gặp khí lạnh dưới trần → **mây thành hình**, trôi ra cửa hang | `MÂY TRONG HANG` | gió nhẹ |
| 25 | 67,3–72,1 (+0,7) | mây trôi lên khỏi cửa hang thành mây trên bản đồ; camera lùi về `vn` → khung cuối = khung đầu | — | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Không vẽ chân dung ông Hồ Khanh, ông Howard Limbert (hình chung).

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `c-01-nguoi-di-rung.png` | 01–04, 08–10 | người đi rừng miền núi Việt Nam, áo tơi lá, gùi, dao — **hình chung** |
| `c-02-nha-tham-hiem.png` | 10–13 | nhà thám hiểm hang có mũ đèn đầu, dây thừng — **hình chung** |
| `c-04-cabin-cap-treo.png` | 19–20 | cabin cáp treo đồ chơi |
| `c-05-rung-gieng-troi.png` | 18, 24 | cụm cây rừng nhiệt đới cao, dây leo |
| `c-06-may-laser.png` | 11 | máy đo laser trên chân ba càng |
| *(dùng lại)* `t-03-thap-cao-tang` | 12 | tập Mét vuông |
