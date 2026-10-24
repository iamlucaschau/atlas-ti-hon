# 03 — PROMPT NGUỒN & KỊCH BẢN · Cổng 2 (Evidence) + Cổng 3 (Script)

*Dùng sau khi Lucas duyệt Cổng 1 (`02_PROMPT-CHU-DE.md`). Mỗi cổng chạy riêng, dừng chờ duyệt. Luật gốc: `01_CHANNEL-BIBLE.md` §7–§8.*

---

## CỔNG 2 — SỔ NGUỒN (Evidence)

### Prompt

```text
Bạn là kiểm chứng viên của kênh bản đồ giải thích. Gói Concept đã duyệt: [dán gói Cổng 1].
Tìm nguồn cho MỌI nhận định sẽ đọc hoặc hiện trên màn hình. Ưu tiên nguồn gốc/chính thống
(văn bản luật, thống kê nhà nước, World Bank/IMF/UN, báo cáo gốc). Dữ liệu biến động: kiểm chứng tại thời điểm làm.

QUY TẮC:
- Transcript, phụ đề, bình luận, snippet tìm kiếm, video đối thủ KHÔNG phải nguồn.
- Sự thật ổn định: ≥ 1 nguồn chính thống. P2 Money+Maps, đền bù, quy hoạch, xung đột, chính trị: ≥ 2 nguồn độc lập.
- Ghi đúng LOẠI số liệu (GDP/người ≠ thu nhập; bảng giá Nhà nước ≠ giá đấu giá ≠ giá chào ≠ giá giao dịch ≠ giá thuê).
- Không biến tương quan thành nhân quả. Kết quả có nhiều nguyên nhân: ghi ĐỦ các nguyên nhân nguồn nêu, và nguồn có nói tỉ trọng không (không có → không được nói "phần lớn / chủ yếu nhờ X").
- Tập xoay quanh một tổ chức: tìm ≥ 1 ý của chính bên đó (giải thích, dùng tiền vào đâu) để có tiếng nói của họ (Bible §3 luật 23).
- Ranh giới/lãnh thổ tranh chấp (đặc biệt Biển Đông): DỪNG, nêu phương án vẽ để Lucas chọn.
- Không bịa toạ độ, ranh giới, ngày, trích dẫn, số liệu, URL, tên nguồn. Không tìm được → ghi "không tìm được".
- Mỗi SRC là URL tới ĐÚNG bài / văn bản (không phải trang chủ báo). Chỉ có trang chủ → nhận định ❌.
- Khoảnh khắc người: ≥ 1 nguồn gốc ghi tên người + việc cụ thể; không có → chọn người khác.
- Ghi "hạn dùng" cho số biến động (tháng / quý / dự án đang xây): kỳ dữ liệu + việc cần kiểm lại trước khi đăng.
- Nếu tập so sánh hai nơi: ghi rõ cả hai bên có đổi địa giới / cách tính không, và nguồn cho số "cùng địa giới, cùng kỳ".

ĐẦU RA:
1. Sổ nhận định: ID (C1…) | Câu sẽ dùng | Giá trị + đơn vị | Loại số liệu | Phạm vi địa lý | Kỳ dữ liệu | Nguồn (SRC-…) | Trạng thái (✅ / ⚠️ cần thêm / ❌) | Rủi ro | Cách nói an toàn | Điều nguồn KHÔNG chứng minh
2. Sổ nguồn: SRC-001… | Nhà phát hành | Tiêu đề chính xác | URL | Ngày phát hành | Ngày truy cập | Gốc/thứ cấp | Hỗ trợ nhận định nào
3. Mâu thuẫn & quyết định bản đồ: số liệu lệch nhau, thiếu bằng chứng, ranh giới cần chọn cách vẽ, nguồn hình học bản đồ (Natural Earth / khác) cho từng thời kỳ
4. Kết luận: SẴN SÀNG | SẴN SÀNG CÓ GIỚI HẠN (nêu giới hạn) | CHẶN (không đi tiếp)
Kết thúc đúng câu: "Duyệt Cổng 2, hoặc cho biết cần kiểm chứng/đổi gì."
```

### Mẫu sổ nhận định (rút gọn — bản thật: `Map/i-singapore/kich-ban-i-singapore-FINAL.md`)

| # | Nhận định | Giá trị | Loại / kỳ | Nguồn | Trạng thái |
|---|---|---|---|---|---|
| C3 | 9/8/1965 Quốc hội Malaysia thông qua tách Singapore | 126–0 | biểu quyết | SRC-003, SRC-004 | ✅ 2 nguồn |
| C8 | "Giàu gấp hơn 7 lần" = GDP/người 2024 | 90.674 vs 11.874 USD | USD hiện hành, World Bank 2024 | SRC-008 | ✅ (lời đọc nói "làm ra", nhãn ghi "GDP / người") |

---

## CỔNG 3 — KỊCH BẢN (Script)

### Prompt

```text
Viết lời đọc TIẾNG VIỆT cho video bản đồ 9:16, CHỈ dùng các nhận định đã duyệt ở Cổng 2: [dán sổ nhận định].
Pillar: [P_]. Engine: [__]. Preset: [Quick 130–165 chữ | Standard 220–265 chữ | Deep 275–330 chữ] (đếm theo chữ/âm tiết; đo thật Orus tempo 1.1: 267 chữ = 72 s, 301 chữ = 78 s).
Giọng kể "vui vừa phải": cảnh đời thường, chơi chữ nhẹ, tối đa 1–2 câu khẩu ngữ; số liệu chuẩn, tranh luận trung tính.
Kỹ thuật (Channel Bible §3): hook mẫu F lật ngược · phá ngộ nhận · "thử tưởng tượng" · câu hỏi treo giữa video · chi tiết nhỏ dễ nhớ · twist có nguồn ở cuối, kết bằng câu trọn vẹn.
Luật bắt buộc (Bible §3, 6–11):
- Câu hỏi treo → câu sau đáp NGAY bằng 1–3 chữ, rồi mới giải thích.
- ≥ 1 khoảnh khắc người: nhân vật thật + hành động cụ thể, có ID nhận định.
- 1–2 câu đùa, đặt sau con số nặng, đánh dấu [ĐÙA] trong bảng truy vết (không ghi vào lời đọc).
- Chủ đề có tranh luận: 2 câu hai phe, mỗi vế một ID nhận định.
- Mỗi câu tối đa 1 con số mới (năm cũng tính).
- Twist là nhịp nội dung cuối; tin cập nhật đặt trước twist.
Luật bổ sung 2 (Bible §3, 12–19, Lucas 2026-10-23):
- Hook chồng nghịch lý khi có: 2–3 bất lợi có thật → "Vậy mà…".
- Twist ưu tiên điều bản đồ tự kể và không hết hạn (lịch sử, ranh giới, tên gọi); số theo tháng/quý/"năm nay" KHÔNG làm twist (để thân bài hoặc bình luận ghim).
- Câu kết gọi lại đúng từ khoá của hook.
- So sánh công bằng: bên kia cũng đổi (sáp nhập, cách tính) thì nói ra; so cùng địa giới, cùng kỳ.
- Không "năm ngoái / năm nay / hiện nay" trơn; điều sắp đổi dùng "chưa…" + tiến độ trong sổ nguồn.
- Không đọc quá 2 số đo liền nhau; vị trí nói bằng hướng, số km để trên thẻ.
- Cân nhắc 1 câu vùng đất tự nói (giọng cast) khi tập xoay quanh một tỉnh / nước.
- Đếm chữ trước khi gửi: Standard ≤ 265 chữ.
Luật bổ sung 3 (Bible §3, 20–23, Lucas 2026-10-24):
- Chủ đề chạm túi tiền / đời sống: hook hoặc câu 2 có một vế nối với người xem ("hoá đơn nhà bạn"), ≤ 10 chữ; không doạ, không dự báo giá.
- Số có phạm vi kỹ thuật (hợp nhất ↔ công ty mẹ, lũy kế ↔ trong năm, GDP ↔ GNI, tỉnh cũ ↔ mới): kèm ≤ 6 chữ giải nghĩa ngay lúc dùng (lời đọc hoặc thẻ).
- Nhiều nguyên nhân: hook chọn một để gây tò mò, thân bài điểm đủ các nguyên nhân chính; không "phần lớn nhờ X" khi nguồn không nói tỉ trọng; câu đúng mà gây hiểu lầm = câu sai; tiêu đề không ám chỉ khuất tất.
- Tổ chức được nói tới có ≥ 1 ý của chính họ (lời đọc hoặc mô tả).
- Kho câu thay thế (mỗi cụm ≤ 1 lần / 3 tập liên tiếp; kiểm 2 tập gần nhất trước khi dùng):
  · twist: "Nhưng chi tiết lạ nhất là…" · "Và cú ngược đời?" · "Lý do thật có lẽ nằm ở đây:" · "Trớ trêu là…" · "Oái oăm ở chỗ…"
  · mở cảnh hình dung: "Hình dung thế này:" · "Giả sử bạn…" · "Lấy một ví dụ:" · "Thử…"
  · câu hỏi treo: "Sao lại thế?" · "Tại sao chưa…?" · "Hệ quả?" · "Vì sao?"

CẤU TRÚC (theo engine, xem mạch chuẩn bên dưới), chia thành CẢNH; mỗi cảnh 1–4 câu; mỗi câu = 1 beat hình:
- Hook ≤ 3 giây, có CÂU HỎI (mẫu A–E). Ví dụ mẫu B: "Malaysia từng đuổi Singapore ra khỏi đất nước. Vậy vì sao hôm nay, Singapore lại giàu gấp hơn bảy lần?"
- Mỗi câu 5–15 chữ; câu dài nhất ≤ 25 chữ. Không câu rỗng, không lặp ý, không văn hành chính.
- Năm, con số, địa danh: viết bằng CHỮ cho TTS ("năm một nghìn chín trăm sáu mươi lăm", "một trăm hai mươi sáu trên không").
- Payoff trả lời ĐÚNG câu hỏi hook, có SO SÁNH (hai con số / trước–sau).
- Lời đọc có thể nói bình dân, KHÔNG được đổi loại số liệu ("làm ra" cho GDP/người: được; "thu nhập" cho GDP/người: không).
- KẾT THÚC (nối vòng mềm, Lucas 2026-10-14): câu cuối là MỘT CÂU TRỌN VẸN, ngắn, có sức nặng (twist / nghịch lý chốt),
  KHÔNG dùng vế bỏ lửng nối vào câu đầu. Video vẫn lặp liền bằng hình (khung cuối = khung đầu).
  Ví dụ: "Lối tắt có ngắn mấy, đường vẫn dẫn về Singapore." Không lời chào, không "follow để xem thêm".
- Không ghi chỉ dẫn sân khấu trong lời đọc.

ĐẦU RA:
1. Tiêu đề + 3 biến thể
2. Thời lượng ước tính (chữ ÷ ~4 chữ/giây ≈ 238 wpm ở tempo 1.1, đã gồm nghỉ)
3. Lời đọc theo CẢNH, đúng định dạng file FINAL (bên dưới)
4. Bảng truy vết: câu → ID nhận định
5. Phụ đề hiển thị cho các câu có số (chữ số, *từ khoá* đánh dấu sao)
6. Ghi chú phát âm (tên riêng nước ngoài, viết tắt)
7. Câu kết (một câu trọn vẹn) và lý do nó đủ sức nặng
Kết thúc đúng câu: "Duyệt Cổng 3, hoặc cho biết cần đổi gì."
```

### Mạch chuẩn theo engine (gợi ý số cảnh cho Standard)

| Engine | Cảnh |
|---|---|
| Historical Timeline | 1 Hook (sự thật + câu hỏi) · 2 Trạng thái đầu (mốc năm 1) · 3 Biến cố (mốc 2) · 4 Quyết định (mốc 3, cao trào) · 5 Bất lợi / cái giá · 6 Bước ngoặt · 7 Payoff "hôm nay" + so sánh + câu kết |
| Money+Maps | 1 Nghịch lý tiền · 2 Định vị 2 khu · 3–4 Hai–ba nguyên nhân có nguồn · 5 So sánh số đúng loại · 6 "Vậy thì sao" + giới hạn · 7 câu kết |
| Cause-and-Effect | 1 Nghịch lý nhìn thấy · 2 Định vị · 3–5 Nguyên nhân 1–3 (đánh số) · 6 Tương tác / hệ quả · 7 câu kết |
| Journey Route | 1 Ràng buộc cực đoan · 2 Xuất phát · 3–5 Chướng ngại leo thang · 6 Vượt qua + quy mô · 7 câu kết |
| Region Reveal | 1 Ngộ nhận · 2–4 Từng mảnh · 5 Gộp lại · 6 Twist · 7 câu kết |

### Định dạng file FINAL (bắt buộc — `scripts/episode.mjs prep` đọc file này)

Thư mục tập: `Map/<slug>/` (vd. `Map/i-singapore/`). Hai file:

`kich-ban-<slug>-FINAL.md`
```markdown
# Kịch bản FINAL — "<tiêu đề>"

*<ghi chú: pillar, engine, preset, loop seam>*

---

## VOICEOVER (English)

<đoạn cảnh 1>

<đoạn cảnh 2>

…

---

## Sổ số liệu (claim ledger)
<bảng Cổng 2>
```
*(Tên mục "VOICEOVER (English)" là khoá kỹ thuật của script — giữ nguyên dù lời là tiếng Việt.)*

`01_EPISODE-SPEC_<slug>.md` — mỗi cảnh một khối, lời VO **trùng từng chữ** với FINAL:
```markdown
## SCENE 1 — <tên beat>
- **VO:** "<toàn bộ lời cảnh 1>"
```
