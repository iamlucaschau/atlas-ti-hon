# Cổng 4 · Beat sheet — "Vì sao Bắc Ninh xuất khẩu nhiều hơn cả TP.HCM?"

*2026-10-23 — **Lucas duyệt Cổng 4**. Giọng đọc: 72,02 s, 222 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 72,7 s.*

**Luật áp dụng:**
- Style I + luật kênh.
- Mở đầu bay từ frame 1; camera đẩy chậm trong mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame); khung cuối = khung đầu.
- Phụ đề ≤ 4 chữ / 20 ký tự.
- **Mọi nhãn / đạo cụ / mặt đất khai trong `PLACES` và qua kiểm địa lý.**
- Không gọi tên nước ngoài nào trong lời đọc → không cần `CountryTag` (Samsung chỉ là tên doanh nghiệp).

**Nhạc nền:** P2 "Wallpaper" (Kevin MacLeod) — nhẹ, nhịp kinh tế. Tập P2 trước (Điện hạt nhân) dùng "Inspired", nên đổi lại cho khỏi lặp. Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Việt Nam theo tỉnh | `ProvinceMap` **VN2025** (Bắc Ninh mới, TP.HCM mới) + **VN2024** (Bắc Ninh cũ, Bắc Giang cũ, TP.HCM cũ, Bình Dương, Bà Rịa – Vũng Tàu) | Bắc Ninh tô vàng ấm, TP.HCM tô xanh dương; tỉnh khác nhạt |
| Hai cột xuất khẩu | vector, kiểu `DataCard` dựng đứng, cạnh nhau ở vùng `rows` | nhãn "CỤC HẢI QUAN · 2025"; chỉ một bộ số mỗi khung |
| Ghim Yên Phong, Nội Bài | `CityPin` | toạ độ trong `PLACES`; **Luis đo lại khoảng cách**, nếu ≥ 20 km thì báo Lucas trước khi render |
| Đường chim bay Yên Phong → Nội Bài | `Track` nét đứt + thẻ `<20 KM` | |
| Máy bay | dùng lại `l-01-toy-plane` (tập Long Thành) | bay khỏi Nội Bài, mang thùng hàng |
| Cột "chạy đua" lũy kế 2025 | hai thanh ngang chạy theo tháng, Bắc Ninh nhích qua ở tháng 10 | số 76,44 / 76,34 tỷ ở vạch đích |
| 176 chấm nhà cung cấp | lưới vector 16 × 11, 12 chấm màu Việt Nam loé lên | nhãn `12 / 176` |
| Cân nhập – xuất | ảnh `b-05-can-dia` + hai khối số vector trên hai đĩa | đĩa "NHẬP" nặng hơn, lệch xuống |
| Hoàng Sa, Trường Sa | `VnIslands` ở khung toàn quốc | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (toàn quốc, khung nối vòng) | ~106°Đ 16°B · thấy cả Bắc Ninh và TP.HCM | frame 0, 01–02, 13–15, 21 (về cuối) |
| `north` (Bắc Ninh + Hà Nội + Nội Bài) | ~106,0°Đ 21,2°B, gần | 03–10, 16–20 |
| `south` (TP.HCM mới) | ~106,8°Đ 10,9°B | 12 |
| `merge` (Bắc Ninh – Bắc Giang) | ~106,2°Đ 21,3°B, xa hơn `north` | 11 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `vn`: Việt Nam toàn quốc, VN2025 | — | — |
| 01 | 0,05–6,2 | **từ frame 1 camera bay nhẹ** về phía Bắc. TP.HCM loé ("không phải TP.HCM"), rồi Bắc Ninh sáng vàng ("mà là Bắc Ninh") | nhãn `TP.HCM` · `BẮC NINH` | whoosh |
| 02 | 6,4–8,1 | hai cột xuất khẩu mọc lên: Bắc Ninh `93,3` nhỉnh hơn TP.HCM `92,7` | thẻ `93,3 TỶ USD` (+ cột TP.HCM) | click |
| 03–04 | 8,2–9,6 | **"Hàng gì?"** dấu `?` → **"Điện thoại."** chiếc điện thoại đồ chơi (`b-02`) bật lên | — | pop |
| 05 | 10,2–18,4 | **[NGƯỜI]** **bay** → `north`. Quân cờ cán bộ (`b-01`) cầm tập hồ sơ; con dấu `CẤP PHÉP` (vector `Stamp`) đóng xuống ở cuối câu ("cấp phép ngay") | ruy băng `3/2008` · nhãn `NGUYỄN QUANG THANH` · tag nhỏ `AP` | stamp |
| 06 | 18,5–21,4 | ghim **Yên Phong**; nhà máy (vector khối) mọc lên | thẻ `670 TRIỆU USD` | — |
| 07–08 | 22,0–23,8 | **"Chọn Bắc Ninh vì đâu?"** `?` → **"Sân bay."** ghim **Nội Bài** loé | — | — |
| 09 | 24,0–27,2 | đường chim bay nét đứt Yên Phong → Nội Bài vẽ dần | thẻ `<20 KM` | — |
| 10 | 27,3–30,5 | máy bay (`l-01`) cất cánh từ Nội Bài, kéo theo thùng hàng (`b-04`) | thẻ `>1/3` · `2013` | whoosh |
| 11 | 31,1–35,3 | **bay** → `merge`. VN2024: viền Bắc Ninh cũ + Bắc Giang cũ loé, tan vào Bắc Ninh mới (VN2025). Công nhân điện tử (`b-03`) đứng ở phía Bắc Giang | ruy băng `7/2025` · nhãn `BẮC GIANG` | — |
| 12 | 35,5–38,0 | **bay** → `south`. TP.HCM cũ + Bình Dương + Bà Rịa – Vũng Tàu loé, gộp lại | nhãn `BÌNH DƯƠNG` · `BÀ RỊA – VŨNG TÀU` | — |
| 13 | 38,1–41,1 | **bay** → `vn`. Hai cột 2024 theo địa giới mới: TP.HCM cao hơn rõ (không ghi số) | thẻ `2024` | — |
| 14 | 41,2–44,5 | hai thanh "chạy đua" theo tháng 2025; tới tháng 10 Bắc Ninh nhích qua | thẻ `+0,1 TỶ` · `THÁNG 10` | click |
| 15 | 44,7–46,5 | **[ĐÙA]** hai chiếc xe máy (vector đơn giản) cùng chạm vạch, khựng lại | — | — |
| 16 | 47,1–49,4 | **bay** → `north`. Bắc Ninh mới sáng; ghim các khu công nghiệp nháy | nhãn `TRUNG TÂM XUẤT KHẨU` | — |
| 17 | 49,5–54,4 | lưới 176 chấm hiện dần; 12 chấm đỏ Việt Nam loé lên | thẻ `12 / 176` | click |
| 18 | 55,0–59,3 | **[TWIST]** cái cân (`b-05`) hiện ra; đĩa **NHẬP** nặng hơn đĩa **XUẤT** | thẻ `9 THÁNG 2026` | deep hit |
| 19 | 59,5–63,4 | trên hai đĩa: điện thoại `56,9` (nhập) · `55,5` (xuất) tỷ USD | nguồn nhỏ "Sở Công Thương Bắc Ninh" | — |
| 20 | 63,5–66,7 | máy móc, linh kiện (thùng hàng) chạy vào nhà máy | nhãn `MỞ RỘNG` | — |
| 21 | 66,8–71,4 (+0,7) | chiếc điện thoại thu nhỏ vào Bắc Ninh; camera lùi về `vn` → khung cuối = khung đầu | — | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Mô tả ghi rõ loại số liệu: xuất / nhập khẩu hàng hoá theo địa phương (Cục Hải quan; số 9 tháng 2026 của Sở Công Thương Bắc Ninh).

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `b-01-can-bo.png` | 05 | quân cờ cán bộ tỉnh cầm tập hồ sơ — **hình chung**, không chân dung |
| `b-02-dien-thoai.png` | 03–04, 21 | điện thoại đồ chơi to, **không logo** |
| `b-03-cong-nhan.png` | 11 | công nhân điện tử (áo phòng sạch, mũ trùm) cầm bảng mạch |
| `b-04-thung-hang.png` | 10, 20 | chồng thùng carton trên pallet, không chữ |
| `b-05-can-dia.png` | 18–19 | cân đĩa đồ chơi, hai đĩa trống |
| *(dùng lại)* `l-01-toy-plane` | 10 | tập Long Thành |
