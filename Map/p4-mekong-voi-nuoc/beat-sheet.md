# Cổng 4 · Beat sheet — "Mekong: ai giữ vòi nước của 6 quốc gia?"

*2026-10-24 — **Lucas duyệt Cổng 4** (đã thêm ảnh). Giọng đọc: **72,33 s**, 218 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 73 s. Câu 19 do miền Tây tự nói (`Puck`, vai `mientay`).*

**Luật áp dụng:**
- Style I + luật kênh.
- Mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame); khung cuối = khung đầu.
- Phụ đề ≤ 4 chữ / 20 ký tự.
- ≤ 4 đạo cụ gắn bản đồ cùng lúc; bảng che bản đồ ≤ 2 câu liền nhau; mọi nhãn / chấm đập / mặt khai trong `PLACES` và qua kiểm địa lý.
- **Tên nước:** 6 nước có `CountryTag` + cờ khi lần đầu được gọi tên hoặc dòng sông chảy qua; thêm cờ **Myanmar** vào kit.

**Nhạc nền:** P4 "Ascending the Vale" (Kevin MacLeod, màu châu Á; tập P4 gần nhất là Lào, cách 3 tập). Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Lưu vực | `Atlas` (Natural Earth nước); 6 nước tô nhạt khi được nhắc; Việt Nam theo tỉnh không cần | khung có Biển Đông → `VnIslands` |
| **Dòng sông Mekong + sông Tonle Sap** | tải **Natural Earth 10m rivers** (public domain), lọc Mekong / Lancang / Tonle Sap → `Style Library/I-toy-atlas/geo/ne-mekong.json`; vẽ dần bằng `Track` | không tải được → sơ đồ tay, ghi "sơ đồ" |
| 11 chấm đập Lan Thương | toạ độ xấp xỉ theo tên đập (Luis tra), khai `PLACES` (`in: "sea"`) | **sơ đồ**: vị trí gần đúng |
| Xayaburi, Don Sahong | toạ độ công trình | chấm khác màu |
| Biển Hồ | hồ Natural Earth (lakes) cho mùa khô + đa giác **minh hoạ** mùa mưa (to ~6 lần) | loang to / co lại theo câu |
| Cột "ai góp nước" | panel 6 màu (TQ 16 · Myanmar 2 · Lào 35 · Thái 18 · Campuchia 18 · VN 11, MRC) | câu 10–11, ≤ 2 câu |
| Tiểu Loan ↔ Eiffel | ảnh `m-01` + `m-02` cạnh nhau, thước chiều cao | câu 05–06 |
| Vệ tinh quét hồ | ảnh `m-03` bay ngang + chùm quét vector | câu 13–14 |
| Phù sa đọng đáy hồ | mặt cắt hồ minh hoạ (vector): hạt nâu rơi xuống đáy | câu 17 |
| Mặt miền Tây | `MapFace` trên ĐBSCL (VN2025: An Giang / Cần Thơ / Cà Mau…) | câu 19, thẻ "MIỀN TÂY NÓI" |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `basin` (toàn lưu vực, khung nối vòng) | ~102°Đ 21°B, xa (thấy Tây Tạng → biển) | frame 0, 01, 10–11, 24 (về cuối) |
| `lancang` (Vân Nam, đoạn 11 đập) | ~100,3°Đ 24,5°B | 02–07, 12–16 |
| `laos` (Lào, 2 đập dòng chính) | ~103,5°Đ 17°B | 18 |
| `delta` (ĐBSCL) | ~105,6°Đ 10,2°B | 19 |
| `tonle` (Campuchia: Biển Hồ – Phnom Penh – miền Tây) | ~104,6°Đ 12,2°B | 20–23 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `basin`: lưu vực Mekong, không sông | — | — |
| 01 | 0,05–3,1 | **từ frame 1** camera bay dọc theo dòng: sông vẽ dần từ Tây Tạng xuống miền Tây; 6 nước tô nhạt lần lượt theo dòng sông | tag + cờ các nước (hiện nối tiếp, ≤ 2 cùng lúc) | whoosh |
| 02 | 3,2–5,6 | **bay** → `lancang`: 11 chấm đập bật lần lượt trên đoạn Lan Thương | thẻ `11 ĐẬP` · tag `TRUNG QUỐC` | click |
| 03–04 | 5,7–8,5 | "Ai giữ vòi nước?" vòi nước vector trên sông + dấu `?` → "Không chỉ một nước": viền Lào loé nhẹ | — | — |
| 05 | 9,1–11,6 | `m-01` đập Tiểu Loan mọc lên cạnh `m-02` tháp Eiffel, thước chiều cao | thẻ `292 M · 300 M` | — |
| 06 | 11,8–13,9 | **[ĐÙA]** quân cờ nhỏ (`p-08-worker`, dùng lại) ngước nhìn, đầu ngửa dần | — | — |
| 07 | 14,1–16,8 | 11 chấm đập phình thành hồ xanh; thẻ dung tích | thẻ `42 TỶ M³` · nhãn nhỏ `TIỂU LOAN · NỌA TRÁT ĐỘ` | click |
| 08–09 | 17,4–19,7 | **bay** → `basin`; "Từ mưa": mây mưa vector rơi trên Lào, Thái Lan, Campuchia | — | — |
| 10–11 | 19,9–23,9 | panel cột nước chia 6 màu: Trung Quốc 16 % (nhỏ), Lào 35 % (to nhất) loé | thẻ `16 % · MRC` → `35 %` | — |
| 12 | 24,5–26,8 | **bay** → `lancang`; ruy băng; hạ lưu tô màu khô nứt (minh hoạ nhẹ) | ruy băng `2019` | — |
| 13–14 | 26,9–33,1 | **[NGƯỜI]** quân cờ nhà nghiên cứu (`m-04`) góc dưới; vệ tinh (`m-03`) bay ngang, chùm quét qua các hồ | nhãn `ALAN BASIST` · thẻ `EYES ON EARTH · 4/2020` | whoosh |
| 15 | 33,3–36,7 | thẻ phe 2 đặt cạnh; mây mưa ít trên thượng nguồn | thẻ `TRUNG QUỐC · MRC: DO ÍT MƯA` | — |
| 16 | 36,9–39,8 | mũi tên nước xả từ hồ mùa khô | thẻ `MÙA KHÔ +57 % · CHIANG SAEN` | click |
| 17 | 40,4–45,2 | mặt cắt hồ: nước chảy qua đập, **hạt phù sa nâu đọng lại đáy hồ** | nhãn `PHÙ SA Ở LẠI` | — |
| 18 | 45,3–47,5 | **bay** → `laos`: hai chấm Xayaburi, Don Sahong loé trên dòng chính | nhãn `XAYABURI` · `DON SAHONG` | click |
| 19 | 48,1–52,8 | **bay** → `delta`; **[VÙNG NÓI]** `MapFace` miền Tây, mặt `worried` → cười; ruộng lúa nhạt màu | thẻ `MIỀN TÂY NÓI` | — |
| 20 | 53,4–56,3 | **bay** → `tonle`; Biển Hồ, sông Tonle Sap loé | nhãn `BIỂN HỒ` · tag `CAMPUCHIA` | whoosh |
| 21 | 56,4–61,2 | **[TWIST]** nước Mekong dâng; **mũi tên trên sông Tonle Sap đảo chiều**, hồ phình to (loang) | nhãn `CHẢY NGƯỢC` | deep hit |
| 22 | 61,3–64,2 | mùa khô: hồ co lại, mũi tên chảy về miền Tây | thẻ `~40 TỶ M³ · MÙA KHÔ` | — |
| 23 | 64,3–66,7 | thẻ `42 TỶ M³ · 11 HỒ` trượt vào cạnh `~40 TỶ M³` | 2 thẻ cạnh nhau | click |
| 24 | 66,8–71,7 (+0,7) | camera lùi về `basin`; dòng sông sáng nhẹ rồi tắt → khung cuối = khung đầu | — | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Panel che bản đồ: câu 05–07 (đập + Eiffel, nền trong suốt cho bản đồ lộ), 10–11 (cột nước), 17 (mặt cắt hồ). Các câu còn lại trên bản đồ.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `m-01-dap-vom.png` | 05, 07 | đập vòm thủy điện đồ chơi, nhìn chính diện, nước sau đập |
| `m-02-thap-eiffel.png` | 05–06 | tháp Eiffel đồ chơi, không chữ |
| `m-03-ve-tinh.png` | 13–14 | vệ tinh đồ chơi, không cờ, không chữ |
| `m-04-nha-nghien-cuu.png` | 13–14 | quân cờ nhà nghiên cứu cầm máy tính bảng ảnh vệ tinh — **hình chung**, không chân dung |
| `m-05-nha-noi-bien-ho.png` | 20–22 | nhà nổi + thuyền đánh cá Biển Hồ |
| *(dùng lại)* `p-08-worker` | 06 | tập Đường sắt cao tốc |
