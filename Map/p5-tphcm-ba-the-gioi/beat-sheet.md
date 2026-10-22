# Cổng 4 · Beat sheet — "TP.HCM mới: một thành phố, ba thế giới"

*2026-10-22 — **Lucas duyệt Cổng 4**. Giọng đọc: 71,19 s, 234 wpm, tempo 1.1 (`vo-timestamps.md`); 3 câu vùng tự nói thu riêng (Leda 08 · Aoede 12 · Puck 15); +0,7 s nhạc cuối → ~71,9 s. Tập đầu tiên dùng `MapFace`, `PromiseTitle`, giọng nhân vật. Style I + luật kênh: mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; bay khi đổi nơi (≥ 22 frame); phụ đề ≤ 4 chữ / 20 ký tự; khung cuối = khung đầu. Nhạc nền: **P5 dự phòng "Sneaky Snitch" (Kevin MacLeod)** — tinh nghịch, hợp tập vui về thành phố, khác tập Chỗ hẹp ("Investigations"); ghi công trong mô tả.*

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| TP.HCM mới | `VN2025` "TP. Hồ Chí Minh" | viền vàng khi gộp |
| 3 vùng cũ | `VN2024` "TP. Hồ Chí Minh", "Bình Dương", "Bà Rịa - Vũng Tàu" (đã có trong dữ liệu) — mỗi vùng một màu (hồng, xanh lá, xanh biển) | loang thành một ở câu 03 |
| `MapFace` | đặt ở tâm từng vùng; Sài Gòn `happy` → nói (08), Bình Dương `smug` → nói (12), Vũng Tàu `wink` → nói (15); miệng theo `talkOpen` từ `words.json`; câu 16 cả ba cùng `happy` | **không đặt mặt lên Côn Đảo hay đảo nào** |
| `PromiseTitle` | "3 THẾ GIỚI" / "MỘT THÀNH PHỐ" ở câu 02 | không có thẻ số nào khác lúc này |
| Mỏ Bạch Hổ | ghim ~107,97°Đ 9,75°B (**gần đúng**) + giàn khoan | ghi "minh hoạ" trong mô tả |
| Côn Đảo + cáp ngầm | Côn Đảo ~106,6°Đ 8,7°B; cáp từ bờ Sóc Trăng (~106,2°Đ 9,5°B) ra đảo (**gần đúng**), vẽ dần bằng nét đứt rồi sáng | tuyến cáp theo nguồn: đường dây qua Sóc Trăng + 77,7 km cáp xuyên biển |
| Hoàng Sa, Trường Sa | `VnIslands` khi khung thấy bờ biển Việt Nam / Biển Đông (khung `nb`, `cd`) | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `nb` (Nam Bộ, khung nối vòng) | 106,6°Đ 9,9°B · thấy TP.HCM mới tới Côn Đảo | frame 0, 22 (về cuối) |
| `hcm` (TP.HCM mới) | 106,85°Đ 10,85°B | 01–03, 16–17 |
| `sg` (Sài Gòn) | 106,65°Đ 10,78°B, gần | 04–08 |
| `bd` (Bình Dương) | 106,65°Đ 11,2°B | 09–12 |
| `vt` (Bà Rịa – Vũng Tàu, kèm biển) | 107,35°Đ 10,45°B; lùi ra biển ở câu 14 để thấy Bạch Hổ | 13–15 |
| `cd` (Côn Đảo + đường cáp) | 106,4°Đ 9,1°B | 18–21 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `nb` Nam Bộ, TP.HCM mới tô nhạt | — | — |
| 01 | 0,05–2,4 | **từ frame 1 bay** vào `hcm`; Sài Gòn cũ tô hồng, dòng xe máy (`s-02`) nhích chậm | — | whoosh |
| 02 | 2,5–5,0 | ba vùng cũ loé lần lượt 3 màu | **`PromiseTitle` "3 THẾ GIỚI / MỘT THÀNH PHỐ"** | click |
| 03 | 5,1–10,2 | ruy băng ngày; ba vùng **loang** thành một khối TP.HCM mới, viền vàng | ruy băng `1/7/2025` | whoosh nhẹ |
| 04–05 | 10,4–12,2 | **bay** → `sg`; Sài Gòn nhấc màu hồng | nhãn `SÀI GÒN` | whoosh |
| 06 | 12,3–17,9 | **[NGƯỜI]** quân cờ quan xưa (`s-01`) cắm cờ dinh trên Sài Gòn | ruy băng `1698` | click |
| 07 | 18,0–21,6 | quân cờ mờ đi; dòng xe máy (`s-02`) + cốc cà phê nhỏ chạy quanh | — | — |
| 08 | 21,8–24,7 | **Sài Gòn có mặt (`MapFace`), nói** (Leda), xe máy đứng im rồi nhích | — | — |
| 09 | 25,0–27,9 | **bay** → `bd`; Bình Dương nhấc màu xanh lá | nhãn `BÌNH DƯƠNG` | whoosh |
| 10 | 27,9–29,7 | nhà xưởng (`s-03`) mọc lần lượt (5–7 cái) | thẻ `~30 KCN` | click |
| 11 | 29,7–32,1 | nhóm công nhân kéo vali (`s-04`) đi vào từ mép khung; vòng tròn > 1/2 | thẻ `> 1/2` · `TỪ NƠI KHÁC` | — |
| 12 | 32,2–36,3 | **Bình Dương có mặt, nói** (Aoede) | — | — |
| 13 | 36,5–39,8 | **bay** → `vt`; Bà Rịa – Vũng Tàu nhấc màu xanh biển, ô dù bãi biển (`g-04`, dùng lại) | nhãn `BÀ RỊA – VŨNG TÀU` | whoosh |
| 14 | 39,9–45,2 | lùi ra biển; giàn khoan (`s-05`) mọc ở Bạch Hổ, giọt dầu nảy | ruy băng `1986` · nhãn `MỎ BẠCH HỔ` | deep hit |
| 15 | 45,3–48,5 | quay lại bờ; **Vũng Tàu có mặt, nói** (Puck), nháy mắt | — | — |
| 16 | 48,8–51,8 | **bay** → `hcm`; ba mặt cùng cười, ba màu hoà thành viền vàng | thẻ `14 TRIỆU DÂN` | click |
| 17 | 51,8–54,3 | thanh "cả nước" chia 4, một phần tô vàng | thẻ `~1/4 KINH TẾ` | — |
| 18 | 54,6–58,6 | các mặt tắt; **bay** → `cd`; Côn Đảo tối, dấu `?` | — | whoosh |
| 19 | 58,7–61,3 | ghim Côn Đảo; đường đo nét đứt Vũng Tàu → Côn Đảo | nhãn `CÔN ĐẢO` · thẻ `~200 KM` | — |
| 20 | 61,4–65,2 | ruy băng ngày; cáp ngầm vẽ dần từ bờ Sóc Trăng ra đảo | ruy băng `9/2025` | — |
| 21 | 65,2–67,6 | cáp sáng vàng chạy hết đường; **đảo bật sáng** (bóng đèn vector) | thẻ `~80 KM CÁP NGẦM` | click |
| 22 | 67,6–70,9 (+0,7) | camera lùi về `nb`; ba vùng loé lần cuối, Côn Đảo sáng → khung cuối = khung đầu | — | — |

Phụ đề câu vùng tự nói (08, 12, 15): chạy như thường; **màu chữ đang đọc đổi sang trắng sáng** để phân biệt nhân vật với người dẫn (nếu `AtlasSub` cho đổi màu theo câu; nếu không, giữ nguyên). Không có SFX tổng hợp/cartoon; tối đa 1 SFX mỗi beat.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `s-01-quan-xua.png` | 06 | quân cờ quan thời chúa Nguyễn — **nhân vật chung**, không vẽ theo chân dung |
| `s-02-xe-may.png` | 01, 07–08 | cụm xe máy đông đúc |
| `s-03-nha-xuong.png` | 10 | một nhà xưởng khu công nghiệp |
| `s-04-cong-nhan.png` | 11 | nhóm công nhân kéo vali, ba lô |
| `s-05-gian-khoan.png` | 14 | giàn khoan dầu trên biển |
| dùng lại `g-04-beach` | 13 | ô dù bãi biển (tập Tây Nguyên) |
