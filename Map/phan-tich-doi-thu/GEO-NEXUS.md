# Bóc tách 11 Reels của Geo Nexus — học gì cho Atlas Tí Hon

*2026-10-22. Lucas tải 11 video + caption (Facebook Reels, kênh **Geo Nexus**, tiếng Indonesia) vào `Tham Khao/Facebook_Reel/` (đã thêm vào `.gitignore`, không commit). Luis đo bằng ffprobe / ffmpeg (độ dài, LUFS, số lần cắt cảnh), chép lời bằng faster-whisper (bản thô ở `Map/phan-tich-doi-thu/_work/geo-nexus/`, không commit), xem contact sheet của từng video (6 s đầu mỗi 0,5 s + cả video ~32 khung) và khung độ phân giải thật ở các mốc quan trọng. **Luis không nghe được âm thanh**: chỗ nào nói về giọng, nhạc là suy ra từ lời chép và hình — ghi ⚠️.*

*Nguyên tắc: chỉ học cấu trúc và kỹ thuật, không chép lời, không chép hình. Số lượt xem lấy từ caption Lucas tải về (thời điểm tải).*

## 0. Danh sách

| # | Mã | Chủ đề | Dạng | Dài | Lượt xem | Cảm xúc | Tỉ lệ cảm xúc / xem |
|---|---|---|---|---|---|---|---|
| G1 | 1113477937683516 | Argentina → Namibia 7.300 km | A · Khoảng cách | 26,6 s | **4,2 tr** | 46K | 1,1 % |
| G2 | 1106480005167100 | Bali → Sydney 4.600 km | A · Khoảng cách | 26,6 s | 1,6 tr | 19K | 1,2 % |
| G3 | 1994597057924522 | Jakarta → Milan 11.100 km | A · Khoảng cách | 29,4 s | 1,0 tr | 15K | 1,5 % |
| G4 | 1069391175577734 | Interstate 80 (Mỹ) 4.600 km | A · Khoảng cách | 20,1 s | 540K | 5,5K | 1,0 % |
| G5 | 1135018182798643 | Jawa Timur có 6 "dimensi" văn hoá | B · Vùng có tính cách | 173,6 s | 1,3 tr | 26K | 2,0 % |
| G6 | 2451130368746307 | Jakarta có 6 "dimensi" | B · Vùng có tính cách | 199,8 s | 1,0 tr | 22K | **2,2 %** |
| G7 | 1810040593343520 | Bali có 3 "server" | B · Vùng có tính cách | 111,9 s | 1,1 tr | 20K | 1,8 % |
| G8 | 1650958886545308 | Sulawesi Selatan 3 "vibes" | B · Vùng có tính cách | 125,4 s | 426K | 8,1K | 1,9 % |
| G9 | 1162320596459460 | Jawa Tengah 6 vùng (bản đầy đủ) | B · Vùng có tính cách | 162,7 s | 382K | 4,1K | 1,1 % |
| G10 | 2354887141710582 | Ngapak: 3 vùng 3 giọng | B · Vùng có tính cách | 109,1 s | 536K | 6,4K | 1,2 % |
| G11 | 2290968098365071 | Vì sao tên "Jawa Barat" mà người Sunda? | C · Vì sao tên gọi | 123,5 s | 509K | 9,5K | 1,9 % |

**Đo kỹ thuật (cả 11 video):** 1080×1920 (G6: 720×1280), 30 fps; âm lượng **−14,1 / −14,2 LUFS** (giống chuẩn của mình); **0 lần cắt cảnh thật** (máy dò chỉ báo 2 "cắt" ở đầu/cuối mỗi video) — cả video là **một tấm bản đồ liền**, như mình.

## 1. Ba "khuôn" của kênh

### A · Khoảng cách (20–30 s) — nhiều view nhất (1,0–4,2 tr), ít tương tác hơn

1. **Hook trình diện, không hỏi:** "Đây là X, và đây là Y." Mỗi nước sáng màu (xanh / đỏ) + nhãn có que chỉ, camera zoom vào từng nước rồi lùi ra.
2. **Đường đứt nét nối 2 điểm + số km chạy tăng** (2.760 → 4.600 km) nằm **ngay trên đường**, không ở thẻ riêng.
3. **Cuộc đua 3 phương tiện:** tiêm kích F-16 → máy bay chở khách → tàu hàng, mỗi cái một câu thời gian. **Camera bám theo phương tiện** (zoom sát), rồi lùi ra cho thấy 3 cái nằm trên cùng một đường.
4. Kết: "Theo dõi để xem thêm." (CTA đọc thành lời). Caption: "chọn máy bay hay tàu?" 👇

### B · Vùng có tính cách (110–200 s) — tương tác cao nhất (1,8–2,2 %)

1. **Hook phá ngộ nhận + thách thức:** "Nhiều người nghĩ X chỉ có… — chơi chưa đủ xa." / "Nhiều người tưởng ai ở đây cũng…, thật ra chưa đúng."
2. **Hứa trước một con số** ở giây 7–12, kèm **chữ to bay nghiêng** trên màn hình: "6 Dimensi", "3 Server Gaya Hidup Beda Dimensi". Người xem biết phải xem đủ 3/6 phần.
3. **Mỗi vùng một nhịp lặp:** camera "hạ cánh" ("Mình hạ cánh ở phía tây…") → vùng con **nhấc lên** (tô màu riêng, viền trắng dày, đổ bóng, phóng to) → 2–3 đặc điểm (nhịp sống, giọng nói, tính cách) bằng tiếng lóng game ("server", "dimensi", "mode hardcore", "boom", "putar balik 180 derajat") → **vùng đó mọc mặt (mắt, mày, miệng) và tự nói 1–2 câu bằng tiếng địa phương** ⚠️ (nghe như giọng khác người dẫn — cần Lucas nghe).
4. **Kết bằng điểm chung là món ăn:** "N vùng khác nhau đến mấy, cứ đặt [món] lên bàn là ngồi chung mâm" → vùng mẹ mọc mặt nói câu chốt ("Sikat!", "Hajar wes!"). Caption hỏi **"bạn thuộc vùng nào / giọng nào khó nhất / đoán món gì"**.
5. Nối vòng: khung cuối là khung vùng mẹ như khung đầu.

### C · Vì sao tên gọi (123 s) — lai giữa lịch sử và B

- Hook nghịch lý: "Tỉnh có cái tên nghịch lý nhất: tên Jawa mà người Sunda, gọi là Tây mà không còn ở cực tây."
- **Nhân vật lịch sử cũng "lồng tiếng"**: quan chức thuộc địa nói câu tiếng Anh pha giọng Hà Lan ("chia ba cho dễ") ⚠️; **hai vùng cãi nhau** (Banten trêu Jawa Barat sau khi tách tỉnh năm 2000).
- Năm to bay lên từ dưới ("1925", "2000"). Twist "plot twist" ở năm 2000 → kết bằng món ăn + câu chốt.

## 2. Hình ảnh — họ có, mình chưa có

| # | Kỹ thuật | Họ làm thế nào | Mình hiện tại |
|---|---|---|---|
| H1 | **Vùng đất có mặt** | Mắt, mày, miệng hoạt hình đặt trên vùng; đổi biểu cảm theo câu (tức có vạch giận, cười đắc ý, lo lắng, nháy mắt); miệng mấp máy khi vùng "nói" | Nước/tỉnh chỉ có nhãn + cờ + viền loé |
| H2 | **Vùng con "nhấc lên"** | Tô màu đặc riêng, viền trắng, đổ bóng, phóng to nhẹ, vùng mẹ mờ đi; camera lao sát tới mức vùng phủ kín khung | `ProvinceMap` tô / loang màu, không nhấc |
| H3 | **Chữ "hứa con số" bay nghiêng** | 2–3 dòng, chữ trắng đậm, nghiêng ~10°, trượt vào từ mép dưới, ~2 s | Chỉ có `DataCard`, `YearRibbon` đứng thẳng |
| H4 | **Số km chạy tăng trên chính đường đo** | Nhãn "7300 Km" nghiêng theo đường, số đếm lên khi đường kéo dài | `DataCard` tĩnh ở dải trên (đã có đề xuất `MeasureTag` #3) |
| H5 | **Camera bám phương tiện** | Zoom sát máy bay/tàu đang chạy, rồi lùi ra | Camera chỉ bay giữa các khung đặt sẵn |
| H6 | **Rất ít chữ, không phụ đề** | Chỉ nhãn địa danh nhỏ (hộp đen chữ trắng ~24 px) + 1 nhãn vùng mẹ chữ nghiêng có que chỉ + chữ "hứa" thỉnh thoảng | Phụ đề karaoke + thẻ số + nhãn ≥ 48 px |
| H7 | **Watermark giữa khung** | "@GeoNexus" mờ ~20 % ở phần trên giữa khung — chống đăng lại | Chưa có watermark trong video |
| H8 | **Nền ảnh vệ tinh** (Esri) | Bản đồ thật, dòng ghi nguồn tile ở chân khung | Style "Toy Atlas" vector — **không nên đổi** (bản quyền tile, mất nhận diện) |
| H9 | Mở đầu luôn có chuyển động | Frame 0 đã có vùng tô màu; nhãn bật ở 0,5 s; camera zoom vào / ra liên tục suốt 6 s đầu | Luật 21/10: bay ở frame 1 rồi đứng ~3 s (đề xuất #8 ngày 22/10) |

## 3. Kịch bản & giọng

| # | Kỹ thuật | Ví dụ (diễn ý, không chép) | Mình |
|---|---|---|---|
| K1 | **Hứa con số ngay sau hook** | "…chia làm 6 thế giới khác nhau" | Không có (mỗi tập 1 câu hỏi) |
| K2 | **Nhịp lặp cho từng vùng**: hạ cánh → đặc điểm → vùng tự nói | lặp 3–6 lần, mỗi lần 15–30 s | Không có khuôn liệt kê |
| K3 | **Tiếng lóng game / mạng** làm khung: "server", "dimensi", "mode hardcore", "boom", "quay xe 180°" | cả nhóm B | Bible cho 1–2 câu lóng/tập |
| K4 | **Nhân vật "lồng tiếng"**: vùng đất, quan thuộc địa nói 1–2 câu theo giọng địa phương | G5–G11 | Chỉ 1 giọng người dẫn |
| K5 | **Kết bằng điểm chung dễ thương (món ăn)** + câu chốt bằng giọng địa phương | "…ngồi chung mâm khi có món này" | Twist số liệu / nghịch lý |
| K6 | **Câu hỏi chọn phe trong caption** | "Bạn đội Ngapak, Tegalan hay Solo?" | Bình luận ghim chung chung |
| K7 | Hook "Đây là X, đây là Y" cho dạng ngắn | nhóm A | Hook luôn có câu hỏi / nghịch lý |
| K8 | Nhịp đọc ~110–128 từ/phút tiếng Indonesia ⚠️ (từ Indonesia nhiều âm tiết, ~2,5–3 âm/từ → khoảng 300 âm tiết/phút, không chậm hơn mình 235 âm tiết/phút) | — | Không so trực tiếp được |

## 4. Caption & đăng

- Tiêu đề caption: **cờ emoji + con số to + "hoá ra" + 😱/🤯**: "Argentina ke Namibia Jaraknya 7.300 KM! 😱 Kalau Naik Kapal Bisa Sebulan!"
- Thân: 1 câu phá ngộ nhận → **danh sách gạch đầu dòng, mỗi vùng một emoji + tên in đậm + 1 dòng** → câu hỏi chọn phe 👇.
- Hashtag: 9–30 cái, có tên vùng + `#FacebookReels #FacebookPro #AnimasiPeta #GeoNexus`.
- "VERSI LENGKAP!" (bản đầy đủ) → họ đăng **bản ngắn rồi bản dài** cho cùng chủ đề.

**Ghi chú G6 (Jakarta):** điểm chung ở cuối không phải món ăn mà là **một nỗi khổ chung** (tàu điện KRL kẹt lúc 6 giờ chiều) — "đồng cam cộng khổ" cũng là một kiểu kết. Mỗi câu "vùng tự nói" thật ra là **một vai điển hình** của vùng (bảo vệ khu hành chính, dân văn phòng nói chêm tiếng Anh, chủ sạp mặc cả, tài xế xe container, dân ngoại ô kẹt xe, người dân đảo thong thả) — một tiểu phẩm 5–8 s.

## 5. Không nên học

- **Khuôn A lặp gần y hệt** (cùng câu mở, cùng 3 phương tiện, cùng câu kết) — đúng kiểu YouTube gọi là "inauthentic / templated" (xem `00_he-thong/07_DE-XUAT-CHO.md` F4). Nếu làm, mỗi tập phải có góc riêng.
- **Ảnh vệ tinh Esri**: điều khoản dùng tile không rõ cho video kiếm tiền; và phá nhận diện "Toy Atlas".
- **Khuôn mẫu vùng miền**: ở Việt Nam, đùa giọng Bắc – Trung – Nam rất dễ thành chê bai → chỉ dùng nét **tích cực**, có nguồn, và tránh vùng đang nhạy cảm.
- **Số liệu không nguồn**: thời gian bay F-16 "theo lý thuyết", tàu "20–30 ngày" không ghi nguồn — mình vẫn giữ luật "không nguồn = không dùng".

## 6. Đề xuất nâng cấp cho Atlas Tí Hon (chờ Lucas duyệt — chưa áp dụng)

*Đánh số tiếp theo `00_he-thong/07_DE-XUAT-CHO.md` (1–15). ★ = Luis ưu tiên.*

| # | Đề xuất | Học từ | Đụng tới | Công sức | Rủi ro / cần Lucas quyết |
|---|---|---|---|---|---|
| 16 ★ | **"Vùng đất có mặt"** — thành phần `MapFace` (vector): mắt, mày, miệng đặt lên một nước / tỉnh, 6–8 biểu cảm (vui, tức, lo, đắc ý, ngạc nhiên, buồn, nháy mắt), miệng mấp máy theo thời gian từng chữ của câu nói. Dùng ở 1–3 nhịp mỗi tập, không dùng suốt | H1, K4 | kit `toy-atlas.tsx` / `vn-provinces.tsx`, Bible §5 | vừa | Hợp style đồ chơi; vẽ hoàn toàn bằng vector, không cần ảnh mới |
| 17 ★ | **Vùng tự nói 1 câu** (tiểu phẩm 4–8 s) bằng **giọng thứ hai** — bộ tạo giọng đã hỗ trợ `voice` / `style` riêng từng câu. Ví dụ tập Chỗ hẹp: Quảng Bình "Ủa, vậy giờ tui tên gì?" | K4, G6 | `voiceover/<slug>.json`, Bible §6 (giọng) | thấp–vừa | ⚠️ Giọng vùng miền của Gemini TTS chưa thử; cần Lucas nghe thử 2–3 câu trước. Không đùa chê vùng miền |
| 18 ★ | **Khuôn mới "Một tỉnh, N thế giới"** (Region Reveal dạng liệt kê): tỉnh / thành mới sau sáp nhập 2025 có 3 vùng khác hẳn nhau. Ví dụ: TP.HCM mới (Sài Gòn – Bình Dương – Bà Rịa Vũng Tàu), Lâm Đồng mới (Đà Lạt – Đắk Nông – Bình Thuận), Quảng Trị mới (Quảng Bình – Quảng Trị). Nhịp: phá ngộ nhận → hứa "3 thế giới" → mỗi vùng: hạ cánh, 2 đặc điểm có nguồn, vùng tự nói → kết bằng điểm chung | B, K1–K2, K5 | `05_KHO-CHU-DE.md`, Bible §3 (thêm khuôn cho engine Region Reveal) | vừa | Rất gần người Việt, kéo bình luận "quê mình"; độ dài có thể > 75 s → xem #24 |
| 19 ★ | **Chữ "hứa con số" bay nghiêng** (`PromiseTitle`): 2–3 dòng, nghiêng ~8–10°, trượt vào ~2 s ở giây 5–12 ("3 VÙNG · 3 THẾ GIỚI") | H3, K1 | kit, Bible §5 (ngoại lệ luật ≤ 5 chữ cho khối này) | thấp | Đi cùng đề xuất #10 (tiêu đề hook đầu khung) |
| 20 | **Vùng con "nhấc lên"**: tuỳ chọn `lift` cho `ProvinceMap` — tô màu đặc riêng, viền trắng dày, đổ bóng, phóng to 3–5 %, vùng mẹ mờ đi | H2 | `vn-provinces.tsx` | thấp | — |
| 21 | **Số đo chạy trên đường** + **camera bám vật thể**: nhãn km đếm tăng nằm nghiêng theo đường (gộp vào `MeasureTag` #3), và một kiểu khoá camera đi theo máy bay / tàu (`camFollow`) | H4, H5 | kit `camAt`, `Route` | vừa | Hợp các tập P4 (hành trình) |
| 22 | **Kết bằng điểm chung** (món ăn, nỗi khổ chung, thói quen chung) cho các tập về vùng miền — vẫn có nguồn, và vẫn là nhịp nội dung cuối như luật twist | K5 | Bible §3 (luật 11), §7 | thấp | Chỉ dùng cho khuôn #18; tập "vì sao" giữ twist số liệu |
| 23 | **Caption Facebook kiểu danh sách**: cờ/emoji + con số + "hoá ra" ở dòng đầu; mỗi vùng 1 dòng emoji + tên in đậm; câu hỏi **chọn phe** ("Bạn thuộc vùng nào?"); 10–20 hashtag gồm `#FacebookReels`, tên tỉnh | mục 4, K6 | mẫu `Map/_mau-tap/xuat-ban.md` §6 | thấp | — |
| 24 | **Thử bản dài cho Facebook** (100–150 s) song song bản 60–75 s cho YouTube / TikTok — chỉ với khuôn #18 | mục 4 ("bản đầy đủ") | Bible §4 (thử nghiệm) | vừa | Tốn thêm 1 lượt render; so số liệu 2 bản (đề xuất #7) |
| 25 | **Watermark kênh mờ** "@AtlasTiHon" ~15–20 % trong vùng an toàn phía trên — chống đăng lại | H7 | kit (thêm vào khung tập), `06_NHAN-DIEN-KENH.md` | thấp | Lucas chọn vị trí / độ mờ |
| 26 | **Dòng tập ngắn "Từ Việt Nam tới…"** (25–35 s): 2 điểm, đường tròn lớn Luis tính, 2–3 phương tiện có nguồn tốc độ, mỗi tập một góc riêng (lịch sử chuyến bay, kỷ lục) để tránh "theo khuôn" | A | `05_KHO-CHU-DE.md` (P4) | thấp | ⚠️ Dễ bị YouTube xem là nội dung lặp (F4) nếu làm hàng loạt; chỉ làm khi mỗi tập có điểm riêng |
| 27 | **Thử 1 tập ít chữ hơn**: bỏ thẻ số trùng lời đọc, nhãn địa danh nhỏ hơn cho tên phụ (giữ ≥ 48 px cho tên chính), giữ phụ đề | H6 | Bible §5 (chỉ thử) | thấp | Phụ đề vẫn giữ: người xem Việt hay tắt tiếng |

**Không đề xuất:** đổi sang nền ảnh vệ tinh; bỏ hẳn phụ đề; làm hàng loạt khuôn A y hệt nhau.

## 7. Quyết định của Lucas (2026-10-22)

**Duyệt #16, #17, #18, #19.** Bước đầu: Luis thu thử giọng vùng miền (Gemini TTS) để Lucas nghe trước khi đưa "vùng tự nói" (#17) vào tập thật.
