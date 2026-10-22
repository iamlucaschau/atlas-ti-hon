# QA bản v1 — "TP.HCM mới: một thành phố, ba thế giới"

*2026-10-22. Lucas nhận xét: nội dung ổn, trình bày chưa đạt; nhãn Sài Gòn, Bình Dương, Vũng Tàu không đúng lãnh thổ. Luis soát lại bản `p5-tphcm-ba-the-gioi.mp4` (24 khung độ phân giải cao, `out/qa/`) và **đo bằng máy** xem mỗi nhãn / mặt / đạo cụ rơi vào tỉnh nào (`out/qa/inside.mjs`, kiểm "điểm có nằm trong đa giác tỉnh" trên dữ liệu VN2024 + VN2025). Chưa sửa, chưa render lại.*

## A. Kết quả đo vị trí (máy kiểm)

| Thứ trên hình | Toạ độ đặt | Rơi vào (2024) | Đúng? |
|---|---|---|---|
| Nhãn **SÀI GÒN** | 106,70°Đ 10,98°B | **Bình Dương** | ❌ |
| Nhãn **BÌNH DƯƠNG** | 106,62°Đ 11,42°B | **Bình Phước** (ngoài tỉnh) | ❌ |
| Nhãn BÀ RỊA – VŨNG TÀU | 107,38°Đ 10,62°B | Bà Rịa – Vũng Tàu | ✅ (nhưng lệch mép phải, xem B6) |
| Mặt Sài Gòn / Bình Dương / Vũng Tàu | — | đúng tỉnh | ✅ (nhưng sát ranh giới, xem B4) |
| Nhà xưởng số 1 (5 cái) | 106,50°Đ 11,05°B | **TP.HCM cũ (Củ Chi)** | ❌ |
| Nhóm công nhân + biểu đồ tròn | đặt theo màn hình | **trên đất TP.HCM cũ** (màu hồng) | ❌ |
| Đám xe máy (câu 07–08) | lệch +0,13° | **Nhà Bè / sát sông**, không ở trung tâm | ❌ |
| Côn Đảo | 106,60°Đ 8,69°B | **Sóc Trăng** trong dữ liệu VN2024 (Natural Earth gán sai) | ❌ lỗi dữ liệu |
| Trung tâm Sài Gòn thật (Q.1) | 106,70°Đ 10,776°B | TP.HCM | (dùng làm mốc mới) |

Nguyên nhân gốc: Luis **đặt toạ độ bằng ước lượng**, và vòng duyệt hình chỉ soát đè hình / vùng an toàn, **không kiểm "nhãn có nằm đúng lãnh thổ không"**.

## B. Danh sách lỗi trình bày (theo thời gian)

| # | Giây | Lỗi | Mức |
|---|---|---|---|
| B1 | 11–15 | Nhãn **SÀI GÒN** nằm trên **Bình Dương** (ranh giới hồng / xanh) | nặng |
| B2 | 26–28 | Nhãn **BÌNH DƯƠNG** nằm ngoài tỉnh (Bình Phước) và **bị mờ xám** vì sát mép trên vùng hiện nhãn | nặng |
| B3 | 30–32 | Công nhân và biểu đồ "> 1/2" đứng trên **đất Sài Gòn** trong lúc đang nói về Bình Dương; biểu đồ tròn nhỏ, không chú thích | nặng |
| B4 | 50–54 | Lúc gộp: ba mặt **to cố định**, chen sát nhau, mặt "Sài Gòn" đè lên ranh giới Sài Gòn – Bình Dương; **không có nhãn** nên không biết mặt nào là vùng nào; **không có chữ "TP.HCM"** ở đâu cả | nặng |
| B5 | 0–2, 19–24 | Xe máy đặt lệch xuống Nhà Bè / bờ sông, nhỏ, đè ranh giới; câu "phố xá, cà phê" **không có hình cà phê, không có phố** | vừa |
| B6 | 38–40 | Nhãn BÀ RỊA – VŨNG TÀU dồn sát mép phải; **ô dù bãi biển nằm giữa biển** (vịnh Gành Rái), không trên bãi Vũng Tàu | vừa |
| B7 | 13–18 | Nhãn **PHỦ GIA ĐỊNH** trôi ở chân khung (trên Cần Giờ), không gắn vào đâu; quan xưa đứng ở Bình Chánh, không ở trung tâm | vừa |
| B8 | 0–60 | **Mọi tỉnh khác tô đỏ đậm** (màu "Việt Nam" mặc định) → ba vùng hồng / xanh / xanh biển bị chìm, nhìn nặng và rối; không có cảm giác "ba thế giới" khác nhau | vừa (thẩm mỹ) |
| B9 | 0, 69–71 | **Côn Đảo đổi màu** đỏ → vàng → cam vì dữ liệu VN2024 gán đảo cho Sóc Trăng | vừa |
| B10 | 68–70 | Lúc lùi về khung đầu, ba màu cũ **hiện lại khi camera còn bay** → vàng + hồng + tím trộn, màu bẩn | vừa |
| B11 | 63–67 | Cáp ngầm màu xám mảnh, gần như không thấy; thẻ "~80 KM" hiện **trước khi** cáp chạy tới đảo; bóng đèn xám đè đầu cáp; đảo "bật sáng" chỉ là bóng đèn nhỏ, không có cảm giác cả đảo sáng | vừa |
| B12 | 59–61 | Nhãn CÔN ĐẢO đè lên đầu đường đo 200 km | nhẹ |
| B13 | 8–36 | Câu "vùng tự nói": phụ đề **giống hệt lời người dẫn**, không biết ai đang nói (không tên, không bóng thoại) | vừa |
| B14 | 3–5 | Chữ "3 THẾ GIỚI / MỘT THÀNH PHỐ" đè lên vùng Bình Dương đang loé viền — rối ở đúng nhịp quan trọng | nhẹ |
| B15 | 7–10 | Ruy băng 1/7/2025 đè lên phần trên khối vàng | nhẹ |
| B16 | 42–45 | Giàn khoan + nhãn MỎ BẠCH HỔ sát mép phải vùng an toàn | nhẹ |

## C. Đề xuất cải thiện cho tập này (v2 — chờ Lucas duyệt)

| # | Cải thiện | Sửa lỗi |
|---|---|---|
| C1 ★ | **Đặt mọi nhãn / mặt / đạo cụ theo "điểm trong" thật của tỉnh** (tâm hình học, kiểm bằng máy), không ước lượng: Sài Gòn ≈ 106,68°Đ 10,78°B (tâm TP.HCM cũ), Bình Dương ≈ 106,65°Đ 11,21°B, Bà Rịa – Vũng Tàu ≈ 107,30°Đ 10,59°B | B1, B2, B3, B6 |
| C2 ★ | **Làm mờ các tỉnh khác** về màu đất trung tính khi camera vào gần (giữ màu đỏ Việt Nam ở khung xa); ba "thế giới" dùng 3 màu bão hoà rõ hơn | B8 |
| C3 ★ | **Mặt co giãn theo zoom** và luôn kèm **thẻ tên nhỏ** dưới mặt; lúc gộp, hiện chữ lớn **"TP.HCM"** trên khối vàng | B4 |
| C4 ★ | **Bóng thoại / tên người nói** cho câu vùng tự nói: phụ đề đổi màu theo vùng + nhãn "SÀI GÒN:" nhỏ, hoặc bóng thoại trắng mọc từ miệng mặt | B13 |
| C5 | Sài Gòn: dùng **vùng đô thị thật** (`ne-urban-hcm.json`, đã có trong kit) làm "phố", xe máy + cốc cà phê đặt ở trung tâm (Q.1); quan xưa + cờ dinh đặt ở trung tâm; bỏ nhãn trôi "PHỦ GIA ĐỊNH" | B5, B7 |
| C6 | Bình Dương: nhà xưởng, công nhân, biểu đồ **đều nằm trong ranh giới Bình Dương**; biểu đồ "> 1/2" to hơn, có chữ "TỪ NƠI KHÁC" cạnh bên | B2, B3 |
| C7 | Vũng Tàu: ô dù đặt trên **bãi Sau** (đất liền), giàn khoan đưa vào trong vùng an toàn | B6, B16 |
| C8 | **Sửa dữ liệu Côn Đảo** trong kit: vẽ Côn Đảo theo màu Bà Rịa – Vũng Tàu trước 2025, vàng sau 2025 | B9 |
| C9 | Côn Đảo: đảo **tối** (lớp phủ đêm) → cáp **vàng sáng chạy dần** từ bờ ra đảo (có chấm điện chạy) → **cả đảo bừng sáng** + vòng toả sáng; thẻ "~80 KM" hiện **khi cáp chạm đảo** | B11 |
| C10 | Lùi về khung đầu: **camera bay xong rồi** mới cho ba màu cũ hiện lại (không trộn màu khi bay) | B10 |
| C11 | Dời `PromiseTitle`, ruy băng ngày, nhãn CÔN ĐẢO khỏi vùng đang loé / đầu đường đo | B12, B14, B15 |

## D. Nâng cấp quy trình (để lỗi này không lặp lại ở tập sau)

| # | Nâng cấp | Đụng tới |
|---|---|---|
| D1 ★ | **Kiểm địa lý tự động**: hàm kit `inside(provinceName, lonLat)` + script `scripts/geo-check.mjs <slug>` đọc mọi toạ độ nhãn / mặt / đạo cụ khai báo trong `Video.tsx` (bảng `PLACES`) và báo ❌ nếu điểm nằm ngoài tỉnh đã khai | kit, `scripts/`, `npm run lint` hoặc `npm run draft` |
| D2 ★ | Thêm vào checklist `review-loop`: **"Nhãn / mặt / đạo cụ nằm đúng lãnh thổ"** và **"Mỗi vùng được nhắc có tên trên hình"** | `.claude/skills/review-loop/SKILL.md`, `04_QUY-TRINH` |
| D3 | Hàm kit `labelPoint(province)` trả về điểm đặt nhãn tốt (bên trong, xa ranh giới) thay vì Luis tự gõ toạ độ | `vn-provinces.tsx` |
| D4 | Tuỳ chọn `dimOthers` cho `ProvinceMap` (tỉnh khác về màu trung tính) — dùng chung cho mọi tập theo tỉnh | `vn-provinces.tsx` |
| D5 | `MapFace` thêm `label` và `fit` (tự co theo kích thước vùng trên màn hình) | `toy-atlas.tsx` |

## E. Bản v2 (2026-10-22, Lucas duyệt làm C1–C11 + D1, D2)

- **Đã làm:** C1 (mọi vị trí khai trong `PLACES`, máy kiểm 25/25 ✓) · C2 (tỉnh khác về màu trung tính khi zoom gần; 3 màu tươi hơn) · C3 (mặt co theo zoom + thẻ tên dưới mặt; chữ "TP.HCM" khi gộp; thẻ "14 TRIỆU DÂN · TP.HCM MỚI") · C4 (thẻ "SÀI GÒN NÓI / BÌNH DƯƠNG NÓI / VŨNG TÀU NÓI" màu theo vùng trên phụ đề) · C5 (vùng đô thị thật cắt theo ranh giới Sài Gòn, xe máy + cốc cà phê + quan xưa ở trung tâm, "PHỦ GIA ĐỊNH" dưới quan xưa) · C6 (nhà xưởng, công nhân, biểu đồ trong Bình Dương) · C7 (ô dù trên bãi Vũng Tàu) · C8 (kit: Côn Đảo trả về Bà Rịa – Vũng Tàu trong VN2024) · C9 (đảo tối → cáp vàng có chấm điện chạy → đảo bừng sáng; thẻ "~80 KM" khi cáp chạm đảo) · C10 (màu cũ chỉ hiện lại khi camera đã về khung đầu) · C11 (chữ hứa con số dời xuống dưới, ruy băng / nhãn Côn Đảo tắt trước thẻ số).
- **Quy trình:** D1 `scripts/geo-check.mjs` chạy tự động trước `draft` / `final` (lần thử đầu đã bắt được cốc cà phê đặt nhầm sang Đồng Nai) · D2 checklist `review-loop` + `04_QUY-TRINH` + `AGENTS.md`.
- **Số đo v2:** −14 LUFS · đỉnh −2,4 dBFS · SSIM nối vòng 0,969 · 71,6 s · không khung đứng > 2 s.
- **Còn lại (không sửa, ghi để Lucas biết):** khung đầu / cuối (zoom xa) vẫn tô đỏ cả Việt Nam như mọi tập; lúc lùi về cuối, màu chuyển từ trung tính sang đỏ trong ~0,5 s.
