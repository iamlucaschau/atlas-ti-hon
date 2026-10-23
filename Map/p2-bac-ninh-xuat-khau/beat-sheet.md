# Cổng 4 · Beat sheet v2 — "Vì sao tỉnh nhỏ nhất nước lại xuất khẩu nhiều nhất?" (Bắc Ninh)

*2026-10-23 — **Lucas duyệt Cổng 4 v2** (đã nghe vo.mp3). Kịch bản v2 (Lucas duyệt Cổng 3 v2). Giọng đọc: **68,46 s**, 231 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 69,2 s.*

**Giọng:**
- Câu 10 do Bắc Ninh tự nói (giọng `Aoede`, vai `bacninh` trong `cast`).
- Câu 07 "Vì đâu?" và 08 "Vị trí." thu thành hai lượt riêng: lượt chung bị cắt lệch, chữ "trí" rơi sang câu 09.

**Luật áp dụng:**
- Style I + luật kênh.
- Mở đầu bay từ frame 1; camera đẩy chậm trong mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame); khung cuối = khung đầu.
- Phụ đề ≤ 4 chữ / 20 ký tự.
- **Luật mới 2026-10-23:**
  - ≤ 4 đạo cụ gắn bản đồ cùng lúc;
  - không nhãn xoay nghiêng;
  - bảng che bản đồ ≤ 2 câu liền nhau.
- **Mọi nhãn / ghim / mặt / đạo cụ khai trong `PLACES` và qua kiểm địa lý.**

**Nhạc nền:** P2 "Wallpaper" (Kevin MacLeod), như v1; ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Việt Nam theo tỉnh | `ProvinceMap` **VN2024** cho cảnh "trước gộp" (Bắc Ninh cũ, Bắc Giang cũ, TP.HCM cũ, Bình Dương, Bà Rịa – Vũng Tàu), **VN2025** cho cảnh sau gộp | Bắc Ninh vàng, TP.HCM xanh dương, tỉnh khác nhạt khi camera gần |
| Hà Bắc (twist) | hợp hai mặt Bắc Ninh cũ + Bắc Giang cũ (VN2024) thành một vùng cam; **đường chia đôi** = ranh giới chung hai tỉnh 2024 | `BorderLine` hiện chỉ có ranh giới tỉnh 2025 → Luis tính ranh giới chung từ VN2024 (cùng cách làm) |
| Ba biểu tượng bất lợi (câu 01) | vector: thước + `823 KM²`, sóng biển gạch chéo, máy bay gạch chéo | hiện lần lượt theo từng chữ "nhỏ nhất · không biển · chưa có sân bay" |
| Ba ghim vị trí (câu 09) | `CityPin` Nội Bài, cảng Hải Phòng (Đình Vũ), cửa khẩu Hữu Nghị | km chim bay Luis đo từ KCN Yên Phong: **Nội Bài ~16 km · cảng Đình Vũ ~93 km · Hữu Nghị ~117 km** (chỉ trên thẻ, không đọc) |
| Trung Quốc | `CountryTag` "TRUNG QUỐC" + cờ, viền loé khi đọc tên | luật tên nước |
| Mặt Bắc Ninh | `MapFace` trên Bắc Ninh cũ, biểu cảm `happy`, miệng theo `words.json` câu 10; thẻ "BẮC NINH NÓI" trên phụ đề | 1 nhịp duy nhất |
| Hai cột 2025 | `Bars` (từ v1) | câu 02 và 15 |
| Thanh "cộng dồn" + xe máy | từ v1 | câu 14–16 |
| 176 chấm | từ v1 | câu 18 |
| Hoàng Sa, Trường Sa | `VnIslands` ở khung toàn quốc | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (toàn quốc, khung nối vòng) | ~106,4°Đ 16,2°B | frame 0, 02, 22 (về cuối) |
| `bnOld` (Bắc Ninh cũ, gần) | ~106,05°Đ 21,12°B | 01, 05–06, 10 |
| `north` (Bắc Bộ: Nội Bài – Hải Phòng – Lạng Sơn) | ~106,35°Đ 21,3°B, xa hơn | 07–09, 11 |
| `merge` (Bắc Ninh + Bắc Giang) | ~106,45°Đ 21,25°B | 12, 17–21 |
| `south` (TP.HCM mới) | ~106,85°Đ 10,85°B | 13 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `vn`: Việt Nam toàn quốc | — | — |
| 01 | 0,05–4,6 | **từ frame 1 bay** → `bnOld` (VN2024): Bắc Ninh cũ sáng vàng, rất nhỏ giữa các tỉnh; ba biểu tượng bất lợi bật lần lượt theo chữ | thẻ `NHỎ NHẤT · 823 KM²` | whoosh |
| 02 | 4,7–9,2 | **bay** → `vn`: TP.HCM loé ("vượt cả TP.HCM"), hai cột 2025 mọc lên (Bắc Ninh `93,3` nhỉnh hơn TP.HCM `92,7`) | nhãn `CỤC HẢI QUAN · 2025` | click |
| 03–04 | 9,3–10,6 | "Hàng gì?" dấu `?` → "Điện thoại." điện thoại (`b-02`) bật lên trên Bắc Ninh | — | click |
| 05 | 11,2–14,8 | **bay** → `bnOld`: ghim **Yên Phong**, nhà máy vector mọc lên | ruy băng `3/2008` · nhãn `SAMSUNG` | whoosh |
| 06 | 14,9–19,8 | **[NGƯỜI]** quân cờ cán bộ (`b-01`) cầm hồ sơ; con dấu `CẤP PHÉP` đóng ở chữ "cấp phép ngay" | nhãn `NGUYỄN QUANG THANH` · tag nhỏ `AP` | stamp (thud nhẹ) |
| 07–08 | 20,1–21,2 | **bay** → `north`; "Vì đâu?" dấu `?` → "Vị trí." Bắc Ninh loé viền | — | — |
| 09 | 21,2–25,6 | ba ghim hiện **theo đúng chữ đọc**: Nội Bài (tây) → cảng Hải Phòng (đông) → cửa khẩu Hữu Nghị (bắc); ba đường nét đứt từ Yên Phong; Trung Quốc tô nhạt + `CountryTag` | thẻ km nhỏ cạnh mỗi ghim (≤ 3 thẻ, chữ ≥ 48 px) | — |
| 10 | 25,9–28,8 | **[VÙNG NÓI]** **[ĐÙA]** `MapFace` trên Bắc Ninh cũ cười, miệng mấp máy; ba đường nét đứt nháy | thẻ người nói `BẮC NINH NÓI` | — |
| 11 | 29,0–31,8 | máy bay (`l-01`) cất cánh từ Nội Bài, chở thùng hàng (`b-04`) | nhãn `NHẸ MÀ ĐẮT` | whoosh |
| 12 | 32,1–35,8 | **bay** → `merge`: viền Bắc Ninh cũ + Bắc Giang cũ loé, tan vào Bắc Ninh mới (VN2025); công nhân điện tử (`b-03`) ở phía Bắc Giang | ruy băng `7/2025` · nhãn `BẮC GIANG` | — |
| 13 | 35,9–38,7 | **bay** → `south`: TP.HCM cũ + Bình Dương + Bà Rịa – Vũng Tàu loé, gộp lại | nhãn `BÌNH DƯƠNG` · `BÀ RỊA – VŨNG TÀU` | whoosh |
| 14 | 38,7–41,9 | **bay** → `vn`; hai thanh "cộng dồn 2025" chạy theo tháng, Bắc Ninh nhích qua ở tháng 10 | thẻ `2025 · CỘNG DỒN` | click |
| 15 | 41,9–45,5 | số cuối hiện ở vạch đích: `93,3` · `92,7` | thẻ `+0,6 TỶ USD` | — |
| 16 | 45,6–47,7 | **[ĐÙA]** hai xe máy (vector) cùng chạm vạch, khựng lại | — | — |
| 17 | 47,9–50,3 | **bay** → `merge`: Bắc Ninh mới sáng vàng, nhà máy nhỏ mọc ở các KCN | thẻ `TRUNG TÂM XUẤT KHẨU` | — |
| 18 | 50,3–55,0 | lưới 176 chấm (panel), 12 chấm đỏ Việt Nam loé lên ở chữ "mười hai" | thẻ `12 / 176` | pen click |
| 19 | 55,2–57,3 | panel tắt, bản đồ trở lại; camera đẩy nhẹ; Bắc Ninh mới đổi sang màu cam đất "xưa" | — | — |
| 20 | 57,3–61,6 | **[TWIST]** vùng cam = **Hà Bắc**; ở chữ "tách đôi", đường chia (ranh giới chung) loé vàng, hai nửa trượt ra một chút; nhãn đổi `HÀ BẮC` → `BẮC NINH` / `BẮC GIANG` | ruy băng `1/1/1997` | deep hit |
| 21 | 61,7–64,6 | hai nửa trượt lại khít nhau, đường chia mờ dần, tô vàng thành Bắc Ninh mới | ruy băng `7/2025` · nhãn `BẮC NINH MỚI` | click |
| 22 | 64,6–68,2 (+0,7) | trên nửa Bắc Ninh cũ hiện chữ `NHỎ NHẤT`, rồi trên cả tỉnh mới `XUẤT KHẨU NHIỀU NHẤT`; camera lùi về `vn` → khung cuối = khung đầu | 2 khối chữ (≤ 5 chữ mỗi khối, không trùng lúc với thẻ khác) | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Panel che bản đồ: câu 02 (cột), 14–16 (thanh + xe máy, 3 câu: phần xe máy để nền trong suốt cho bản đồ lộ ra), 18 (lưới chấm). Câu 19–22 hoàn toàn trên bản đồ.

## Ảnh

**Không cần ảnh mới.** Dùng lại:
- `b-01-can-bo` (câu 06);
- `b-02-dien-thoai` (03–04);
- `b-03-cong-nhan` (12);
- `b-04-thung-hang` (11);
- `l-01-toy-plane` (11, ảnh của tập Long Thành).

`b-05-can-dia` không dùng ở v2.

## Mô tả / bình luận ghim

- **Bình luận ghim:** số nhập > xuất 9 tháng 2026 (Sở Công Thương Bắc Ninh).
- **Mô tả:**
  - cập nhật nguồn C20–C23;
  - ghi chú "sân bay Gia Bình đang xây";
  - ghi chú: ranh giới Hà Bắc trên bản đồ là gộp hai tỉnh 2024, minh hoạ.
