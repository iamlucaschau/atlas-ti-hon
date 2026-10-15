# Phân tích 20 video đối thủ — học gì để từ 7/10 lên 9/10

*2026-10-13. Nguồn: 20 Shorts Lucas tải về `Map/doi-thu/` (5 tiếng Việt, 15 tiếng Anh). Cách làm: tách ~30 khung hình mỗi video (`_work/Vxx.sheet.jpg`), chép lời bằng Whisper (`_work/Vxx.transcript.json`), đo điểm cắt cảnh và tốc độ đọc. Video đối thủ chỉ để học, không đăng lại, không đưa lên git.*

## 0. Danh sách

| # | Chủ đề | Ngôn ngữ | Dài | Tốc độ đọc | Nhóm |
|---|---|---|---|---|---|
| V01 | Tỉnh rộng nhất VN sau gộp tỉnh | VI | 85 s | 229 wpm | A |
| V07 | Vì sao ai cũng muốn vịnh Cam Ranh | VI | 85 s | 200 | A |
| V08 | Singapore mua cả nước uống mà vẫn giàu | VI | 78 s | 217 | A |
| V09 | Thụy Sĩ "hèn" hay "out trình" | VI | 76 s | 233 | A |
| V15 | Việt Nam gánh bão cho Thái Lan? | VI | 66 s | 215 | A |
| V02 | Nga – Ukraine | EN | 62 s | 144 | B |
| V04 | Chỉ 5 nước còn cộng sản | EN | 90 s | 137 | B |
| V11 | Sahara từng xanh | EN | 90 s | 156 | B |
| V14 | Mỹ – Trung – Đài Loan | EN | 85 s | 157 | B |
| V06 | Stalin lùi bước trước Thổ Nhĩ Kỳ | EN | 47 s | 164 | C |
| V10 | Liên Xô trả lại Áo | EN | 49 s | 179 | C |
| V18 | Stalin trả lại bắc Iran | EN | 50 s | 187 | C |
| V03 | Mỹ tạo ra Elon Musk | EN | 49 s | 199 | D |
| V05 | Mỹ mua Louisiana (EasyHistories) | EN | 101 s | 191 | D |
| V16 | Vì sao Chile dài và hẹp | EN | 81 s | 173 | D |
| V19 | Vì sao Pháp ở Nam Mỹ | EN | 73 s | 185 | D |
| V12 | Vì sao Mỹ lạnh hơn châu Âu | EN | 86 s | 197 | E |
| V13 | Vì sao hai miền Triều Tiên còn chiến tranh | EN | 88 s | 184 | E |
| V17 | Vì sao đảo Síp bị chia | EN | 85 s | 194 | E |
| V20 | Vì sao không có cầu Sicily (15 tỷ euro) | EN | 91 s | 195 | E |
| **Mình** | **Đường sắt tốc độ cao v1** | VI | **54 s** | **250** | I |

**Phát hiện lớn nhất về số liệu:**
- **Gần như không ai cắt cảnh.** 14/20 video có 0–1 lần cắt; mọi video đều là một bản đồ liền mạch giống mình. Cảm giác "mượt" của họ đến từ chuyển động **trong** khung, không đến từ cắt ghép.
- **Mình đọc nhanh nhất cả nhóm.** 250 wpm so với 200–233 của kênh Việt và 137–199 của kênh Anh. Kênh Việt dài 66–85 s; mình 54 s. Mình đang nhồi nhiều chữ vào ít thời gian, nên người xem không kịp "thấm" khoảnh khắc nào.

## 1. Năm nhóm phong cách

**A — Vệ tinh + infographic (cả 5 kênh Việt).** Ảnh vệ tinh tối màu. Vùng được nói tới phát sáng viền và tô màu. Câu hook hiện thành **tiêu đề 2 dòng trên đầu khung suốt 3–5 s đầu**, có một từ đổi màu ("out trình"). Số liệu nằm trong **thẻ dữ liệu** ở góc dưới (số to + nhãn nhỏ kiểu "hơn 23.953 km² · Trùm diện tích"). Có thẻ ảnh thật kèm chú thích, icon bóng kính, thanh mốc năm chạy ngang, thanh so sánh ("ít hơn 27 lần"). **Không có phụ đề lời đọc.** Camera trôi và zoom liên tục. Hoàng Sa, Trường Sa luôn có nhãn nhỏ.

**B — Quả địa cầu + chương theo năm.** Mở bằng quả địa cầu 3D rồi bay xuống vùng cần nói. Tiêu đề hiện từng chữ ở trên. Mỗi đoạn có **đầu chương** ("1991 · THE USSR SPLITS", chữ có chân màu vàng). Đạo cụ 3D (văn bản hiệp ước, TV, cái cân có hai đĩa số). Phụ đề nhỏ, từ khoá màu vàng. Video V04 kết bằng hình cái cân: "1,5 tỷ ↔ 1,56 tỷ".

**C — Chibi + cảnh minh hoạ (một kênh, 47–50 s).** Quốc gia được **tô bằng lá cờ**. Phụ đề là **một từ rất to mỗi lần** (chữ nghiêng, vàng, đậm). Video thường xuyên **chuyển sang một cảnh minh hoạ** (phòng họp, đường phố tuyết, cảng Istanbul) có nhân vật chibi, bóng thoại, mộc "REFUSED". Tag ngày nhỏ ở trên. Câu kết luôn là một nghịch lý.

**D — Nhân vật lớn và hài.** Nhân vật chibi **to, chiếm nửa khung**, đổi nét mặt (há miệng, khóc). Lá cờ có mắt và biết nói ("Am I a joke to you?"). Có cảnh diorama 3D. V16 còn cho **một bàn tay người thật** nhặt quả ớt (chơi chữ Chile/chili). Hay **đặt một nước lên bản đồ nước khác để so kích thước** (Chile dài từ London tới Baghdad).

**E — Vệ tinh + đồ hoạ chuyển động.** Mũi tên dòng chảy phát sáng (hải lưu, gió), **chữ khổng lồ quét ngang khung** ("Gulf Stream", "Eurasian plate"), **chia khung so sánh** (3 cây cầu nước khác), trang báo cũ chèn vào, bóng đen mafia, nhiệt kế, đánh số vùng 1–2–3–4.

## 2. Kịch bản — họ làm gì mà mình chưa làm (quan trọng nhất)

| # | Kỹ thuật | Ví dụ của họ | Mình (v1) |
|---|---|---|---|
| K1 | **Hook = khẳng định gây sốc + lật ngược**, không chỉ là câu hỏi | "Một quốc gia đến nước uống cũng phải đi mua của hàng xóm. Vậy mà GDP đầu người gấp ~18 lần Việt Nam" (V08) · "Việt Nam gánh bão cho Thái Lan. Nhưng khoan, câu này mới đúng một nửa" (V15) · "Nhiều người chê Thụy Sĩ hèn nhát…" (V09) | câu hỏi chung chung |
| K2 | **Phá ngộ nhận** ("dân mạng hay bảo… nhưng nói thật") | V08: "Singapore giàu nhờ thu phí tàu qua Malacca? Tàu chẳng trả Singapore đồng nào" | không có |
| K3 | **Kịch bản "tưởng tượng bạn…"**, cảnh đời thường sống động | V09: "Tưởng tượng bạn đem quân đánh Thụy Sĩ năm 1940…" · V01: "Sáng mặc áo phao săn mây Đà Lạt, chiều xuống Mũi Né tắm biển mà vẫn chưa ra khỏi tỉnh" | không có |
| K4 | **Câu hỏi treo giữa video**, trả lời liền bằng 1–3 chữ | "But do you know how that wall finally opened? By mistake." (V04) · "But where did that giant lake end up? The Amazon." (V11) · "Cú twist là…" (V08) | không có |
| K5 | **Chi tiết nhỏ, cụ thể, dễ nhớ** | "4 men to a jeep", "400 meetings — nothing" (V10) · "102 to 2. Against." (V18) | thông số kỹ thuật (khổ ray, số ga) |
| K6 | **Kết bằng nghịch lý / twist** | "Stalin tried to scare Turkey and pushed it straight into the west" (V06) · "Germany stayed divided 45 years. Austria bought its way out in ten" (V10) · "As long as it's in progress, the money keeps flowing" (V20) | câu bỏ lửng để nối vòng |
| K7 | **Giọng kể có cá tính** (kênh Việt: hài, tiếng lóng Gen Z: "bay màu", "out trình", "đỉnh nóc kịch trần", "Ê thế mà") | V01, V08, V09, V15 | trung tính, hơi khô |
| K8 | **So sánh quy mô bằng thứ người xem biết** | "chưa bằng ¼ Hà Nội" · "ít hơn Sài Gòn 27 lần" · "Chile dài từ London tới Baghdad" | 43,7 triệu đô/km |
| K9 | **Nối vòng**: cả 5 kênh Việt đều dùng | "Thế nên mới có câu." → "Việt Nam gánh bão cho Thái Lan" (V15) | ✅ có, giữ |
| K10 | **Kêu gọi bình luận bằng câu hỏi về người xem** | "Quê bạn đã bị gộp với tỉnh 'đối thủ' nào? Comment ngay" (V01) | chỉ có bình luận ghim |

**V20 (cầu Sicily) gần với tập của mình nhất** (siêu dự án, 15 tỷ euro, phe ủng hộ / phản đối). Cấu trúc của họ:
1. Câu hỏi: "Vì sao vẫn chưa có cầu, dù chỉ 3 km?"
2. So với các cầu nước khác (chia khung).
3. Lý do địa lý: động đất (trang báo 1908), gió 100 km/h.
4. Đã có thiết kế: dài nhất, đắt nhất, 15 tỷ euro.
5. Hai phe tranh luận.
6. **Twist "lý do thật"** ở cuối.

Mình không được suy diễn kiểu "mafia", nhưng có thể học **nhịp**: so sánh → trở ngại địa lý → con số khổng lồ → hai phe → một sự thật bất ngờ có nguồn.

## 3. Hình ảnh và dựng — họ có, mình chưa có

| # | Kỹ thuật | Ai dùng | Mức ảnh hưởng | Mình làm được không |
|---|---|---|---|---|
| H1 | **Tiêu đề hook trên đầu khung 3–5 s đầu** (2 dòng, 1 từ đổi màu) | 9/20, cả 5 kênh Việt | rất cao (giữ người xem lướt qua) | dễ; cần nới luật "≤ 5 chữ" riêng cho tiêu đề hook |
| H2 | **Camera không bao giờ đứng hẳn**: trôi chậm, zoom nhẹ về chủ thể, bay giữa các nơi | gần như tất cả | rất cao (đây chính là cảm giác "mượt") | **vướng luật "không camera giả"** → cần Lucas quyết (§5) |
| H3 | **Vùng phát sáng**: viền sáng + tô màu loang dần, vùng nhấp nháy khi được nhắc | A, B, E | cao | dễ (SVG glow filter) |
| H4 | **Thẻ dữ liệu** (số to + nhãn nhỏ), thanh so sánh, thanh mốc năm | A | cao | dễ |
| H5 | **Cảnh minh hoạ chèn vào** (phòng họp, đường phố, công trường) có nhân vật chibi | C, D | cao (đổi nhịp, gây cười, cảm xúc) | được: Lucas tạo ảnh nền, Luis ghép nhân vật |
| H6 | **Nhân vật to, có biểu cảm, bóng thoại** | C, D | cao | được: cần nhiều biểu cảm cho mỗi nhân vật |
| H7 | **Đồ hoạ chuyển động**: mũi tên dòng chảy phát sáng, đường bay, hạt bụi, mây, mưa | B, E | trung bình–cao | được (vẽ vector + frame) |
| H8 | **Chữ khổng lồ quét ngang khung** cho khái niệm chính | E | trung bình | dễ |
| H9 | **Chia khung so sánh** (2–3 ô) | E (V12, V20) | trung bình | dễ, rất hợp "cuộc đua 2 đoàn tàu" |
| H10 | **Đặt một vùng lên vùng khác để so kích thước** | D (V16) | trung bình | dễ |
| H11 | **Tô quốc gia bằng lá cờ** | C, B | thấp–trung bình | dễ |
| H12 | **Phụ đề**: kênh Việt *không có*; kênh C dùng 1 từ to mỗi lần; B/D/E dùng chữ nhỏ | — | — | mình đang dùng karaoke 72 px; đề xuất thử bản "1 từ khoá to" cho đoạn cao trào |

## 4. Áp dụng cho tập đường sắt (cập nhật v2)

Kịch bản v2 "67 tỷ đô để mua một ngày" đã đi đúng hướng K1, K4, K6. Đề xuất bổ sung:

1. **K3, cảnh đời thường (có nguồn):** "Ăn sáng phở Hà Nội, ăn trưa cơm tấm Sài Gòn" (5,5 giờ dự kiến, C8). Đối lại: "lên tàu Thống Nhất tối nay, ngủ hai đêm trên tàu mới tới" (SE1 rời Hà Nội 22h00, tới Sài Gòn 6h30 ngày thứ ba — SRC-013).
2. **K2, phá ngộ nhận:** "Nhiều người nghĩ đắt là vì tàu chạy nhanh. Thật ra, tiền nằm ở cầu cạn và đường hầm" (C15, ⚠️ cần thêm nguồn).
3. **K5, chi tiết dễ nhớ:** "mỗi mét hơn một tỷ đồng" (C14) + "443 trên 454 đại biểu".
4. **K6, twist cuối có nguồn** (chọn một, cần kiểm chứng ở Cổng 2):
   - "Tuyến Thống Nhất ta đang đi được nối liền từ năm 1936" (gần 90 năm), sau đó nối vòng.
   - Hoặc giữ cao trào cuộc đua "tàu cũ còn chưa tới Vinh" (C16).
5. **H1:** tiêu đề hook "67 TỶ ĐÔ ĐỂ MUA… 1 NGÀY?" trên đầu khung 0–4 s.
6. **H9 + H4:** cuộc đua chia đôi khung (hai làn tàu, hai đồng hồ) ở đầu và ở cao trào; thẻ dữ liệu cho 1 tỷ/mét, 443/454.
7. **H5:** 1–2 cảnh minh hoạ: hội trường Quốc hội bấm nút, mặt cắt cầu cạn và đường hầm.
8. **H3:** tuyến đường phát sáng; Hà Nội và TP.HCM nhấp nháy khi được nhắc.
9. **Nhịp đọc:** hạ từ 250 xuống ~220 wpm. Cho phép 60–70 s nếu có thêm cảnh K3 và twist.
10. **K10:** câu bình luận ghim: "Bạn chọn 5 tiếng rưỡi với vé đắt, hay 30 tiếng với vé rẻ?"

## 5. Cần Lucas quyết

1. **Camera (H2).** Đây là khác biệt lớn nhất giữa mình và đối thủ. Lựa chọn:
   - (a) Giữ luật hiện tại: chỉ bay khi đổi nơi, còn lại đứng yên, bù bằng chuyển động trong khung.
   - (b) **Luis đề xuất:** cho phép camera *đẩy rất chậm, đều* về chủ thể trong mỗi beat (tối đa ~5% zoom mỗi 3 s, không rung, không giật, không "thở"), cộng với bay khi đổi nơi. Đây đúng là cách cả 20 video làm.
2. **Giọng kể (K7).** Lựa chọn:
   - Trung tính như hiện tại.
   - **"Vui vừa phải" (Luis đề xuất):** cảnh đời thường, câu chơi chữ nhẹ, tối đa 1–2 câu lóng mỗi video, vẫn đúng số liệu.
   - Hài Gen Z như kênh Việt.
3. **Phụ đề.** Giữ karaoke, hay thử như kênh Việt: không phụ đề, chỉ dùng thẻ dữ liệu và tiêu đề?
4. **Thời lượng.** Cho phép 60–75 s, như đối thủ Việt (66–85 s)?
5. **Luật chữ.** Có cho phép riêng tiêu đề hook 0–4 s dài hơn 5 chữ (2 dòng, ~8 chữ) không?

*Sau khi Lucas chọn, Luis sẽ: cập nhật Channel Bible + style I (kit: glow, thẻ dữ liệu, chia khung, cảnh minh hoạ), viết FINAL v2 (kèm kiểm chứng C15, C16, mốc 1936), rồi dựng lại tập đường sắt.*
