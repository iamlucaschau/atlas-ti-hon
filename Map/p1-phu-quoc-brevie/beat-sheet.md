# Cổng 4 · Beat sheet — "Vì sao Phú Quốc sát Campuchia mà thuộc Việt Nam?"

*2026-10-22 — **Lucas duyệt Cổng 4**. Giọng đọc: 72,23 s, 235 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối → ~72,9 s. Style I + luật kênh: mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; bay khi đổi nơi (≥ 22 frame); phụ đề ≤ 4 chữ / 20 ký tự; khung cuối = khung đầu. **Cách vẽ biển theo Cổng 2 (phương án A):** đường Brévié nét đứt + vùng nước lịch sử gạch chéo, **không vẽ biên giới biển**. Nhạc nền: **P1 "Lightless Dawn" (Kevin MacLeod)** — trầm, hợp chuyện lịch sử, khác "Heroic Age" của tập Tây Nguyên; ghi công trong mô tả. **Mọi nhãn / đạo cụ khai trong `PLACES` và qua kiểm địa lý** (`scripts/geo-check.mjs`).*

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Nước | `Atlas` (Natural Earth): Việt Nam màu Việt Nam; Campuchia tô nhạt khi gọi tên; Thái Lan nền | `CountryTag` Campuchia (cờ có sẵn) + Việt Nam |
| Phú Quốc | đảo trong polygon Việt Nam; viền vàng loé khi nhắc | **không đặt `MapFace` lên đảo** |
| Vùng Hà Tiên xưa (1708) | vùng tô mờ quanh Hà Tiên – Rạch Giá – Phú Quốc (**minh hoạ**, không phải ranh giới lịch sử chính xác) | chỉ là vệt màu nhẹ, không viền cứng |
| Nam Kỳ (1867) | tô màu vùng Nam Bộ (gộp các tỉnh VN2024 phía nam, **minh hoạ**) | màu khác với Campuchia |
| **Đường Brévié** | đường thẳng nét đứt vàng từ bờ biên giới Việt – Campuchia (~104,45°Đ 10,42°B) ra biển; tới gần mũi bắc Phú Quốc thì **bẻ vòng song song bờ bắc, cách 3 km**, rồi tiếp tục ra khơi — **sơ đồ theo mô tả trong thư**, không phải toạ độ pháp lý | nhãn "ĐƯỜNG BRÉVIÉ 1939" |
| Thước 3 km | đoạn đo nhỏ giữa đường Brévié và mũi bắc đảo | thẻ `3 KM` |
| **Vùng nước lịch sử 1982** | đa giác gạch chéo nhạt nối Phú Quốc – Thổ Chu – Poulo Wai – bờ Kampot – bờ Kiên Giang (**minh hoạ** theo mô tả hiệp định) | nhãn "VÙNG NƯỚC LỊCH SỬ"; không có đường biên nào bên trong |
| Thước 10 km / 40 km | Phú Quốc → bờ Campuchia (~10,6 km); Phú Quốc → Hà Tiên (~40 km) — Luis đo | cùng màu để so |
| Hoàng Sa, Trường Sa | `VnIslands` ở khung rộng có bờ biển Việt Nam | luật kênh |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `gulf` (vịnh Thái Lan, khung nối vòng) | 104,5°Đ 10,3°B · thấy Kampot, Phú Quốc, Hà Tiên, Thổ Chu | frame 0, 21 (về cuối) |
| `pq` (Phú Quốc + bờ Campuchia + Hà Tiên) | 104,2°Đ 10,3°B, gần | 01–05, 11–16 |
| `south` (Nam Bộ + Campuchia) | 105,6°Đ 10,6°B, xa | 06–10 |
| `waters` (vùng nước lịch sử) | 104,0°Đ 9,9°B | 17–20 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `gulf`: vịnh Thái Lan, Phú Quốc nhỏ giữa khung | — | — |
| 01 | 0,05–2,8 | **từ frame 1 bay** vào `pq`; thước 10 km từ mũi bắc Phú Quốc sang bờ Campuchia vẽ dần | thẻ `~10 KM` · tag `CAMPUCHIA` | whoosh |
| 02 | 2,9–5,1 | thước 40 km sang Hà Tiên vẽ dần, dài gấp 4 | thẻ `~40 KM` | click |
| 03 | 5,2–6,5 | Phú Quốc loé viền, dấu `?` | — | — |
| 04–05 | 6,6–8,1 | một **nét bút vẽ** (cây bút vector) lướt qua biển | — | click |
| 06 | 8,3–13,1 | **bay** → `south`; quân cờ Mạc Cửu (`q-01`) đứng ở Hà Tiên; vệt vùng Hà Tiên xưa (gồm Phú Quốc) loang | nhãn `HÀ TIÊN` | whoosh |
| 07 | 13,2–17,0 | quân cờ cúi chào về phía bắc; mũi tên vàng nhỏ từ Hà Tiên lên phía bắc (chúa Nguyễn) | ruy băng `1708` | — |
| 08 | 17,3–22,3 | Nam Bộ tô màu "Nam Kỳ", lá cờ tam tài nhỏ (vector) cắm | ruy băng `1867` · nhãn `NAM KỲ` | click |
| 09 | 22,3–24,6 | Campuchia tô nhạt, viền loé | `CountryTag CAMPUCHIA` | — |
| 10 | 24,7–27,1 | các đảo ngoài khơi nháy, dấu `?` giữa biển | — | — |
| 11 | 27,4–32,1 | **[NGƯỜI]** **bay** → `pq`; quân cờ viên Toàn quyền (`q-02`) ở góc, lá thư (`q-03`) mở ra | ruy băng `31/1/1939` · nhãn `JULES BRÉVIÉ` | whoosh |
| 12 | 32,2–33,9 | **đường Brévié nét đứt vẽ dần** từ bờ ra biển | — | — |
| 13 | 33,9–37,1 | đảo phía bắc đường tô nhạt màu Campuchia, đảo phía nam màu Nam Kỳ | — | — |
| 14 | 37,1–41,6 | **đường bẻ cong vòng qua mũi bắc Phú Quốc** (camera đẩy sát); thước 3 km giữa đường và bờ | thẻ `3 KM` · nhãn `ĐƯỜNG BRÉVIÉ 1939` | deep hit |
| 15 | 41,6–44,3 | **[ĐÙA]** cả Phú Quốc sáng màu Nam Kỳ, nét bút vẽ một vòng nhỏ | — | — |
| 16 | 44,4–47,5 | lá thư phóng to, một dòng gạch chân (không chữ đọc được) | thẻ `CHỈ ĐỂ QUẢN LÝ` | click |
| 17 | 47,7–52,2 | **bay** → `waters`; ruy băng; **vùng nước lịch sử gạch chéo** loang ra | ruy băng `7/7/1982` · nhãn `VÙNG NƯỚC LỊCH SỬ` | whoosh |
| 18 | 52,3–56,5 | đường Brévié sáng lại; hai thuyền tuần tra (`q-04`, dùng chung, cờ vector hai nước) chạy chậm trong vùng gạch chéo | — | — |
| 19 | 56,6–60,6 | Phú Quốc loé viền vàng; ghim | thẻ `ĐẶC KHU` · `2025` | click |
| 20 | 60,9–67,3 | **[TWIST]** đường Brévié loé ở phần đảo; phần biển quanh đó **không có đường nào**, dấu `?` nhấp nháy giữa vùng gạch chéo | nhãn `CHƯA PHÂN ĐỊNH` | — |
| 21 | 67,3–72,0 (+0,7) | camera lùi về `gulf`; đường Brévié và vùng gạch chéo tắt dần → khung cuối = khung đầu | — | — |

Không SFX tổng hợp/cartoon; tối đa 1 SFX mỗi beat. Mô tả ghi rõ: đường Brévié và vùng nước lịch sử là **sơ đồ minh hoạ**, không phải đường biên giới.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `q-01-mac-cuu.png` | 06–07 | quân cờ người cai quản Hà Tiên thế kỷ 18 — **hình chung**, không chân dung |
| `q-02-toan-quyen.png` | 11–16 | quân cờ viên Toàn quyền Pháp thập niên 1930 — **hình chung** |
| `q-03-la-thu.png` | 11, 16 | lá thư cũ có con dấu, nét chữ không đọc được |
| `q-04-thuyen-tuan-tra.png` | 18 | thuyền tuần tra nhỏ, **không cờ** (cờ vẽ vector) |
