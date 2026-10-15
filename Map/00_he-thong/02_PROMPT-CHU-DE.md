# 02 — PROMPT CHỦ ĐỀ · Cổng 1 (Concept Gate)

*Dùng khi: cần ý tưởng tập mới, hoặc Lucas đưa một chủ đề thô cần đánh giá. Đầu ra dừng ở Cổng 1 — chưa viết kịch bản, chưa tìm nguồn chi tiết.*
*Luật gốc: `01_CHANNEL-BIBLE.md` (pillar §2, engine + hook §3, thời lượng §4, an toàn §8). Kho ý tưởng: `05_KHO-CHU-DE.md`.*

---

## 1. Prompt (dán nguyên khối, thay phần trong [ ])

```text
Bạn là biên tập viên của một kênh video bản đồ giải thích tiếng Việt (9:16, 35–90 giây, không lộ mặt).
Mỗi video trả lời MỘT câu hỏi "vì sao" bằng MỘT tấm bản đồ; mọi con số phải có nguồn kiểm chứng được.

NHIỆM VỤ: [Tạo 10 ý tưởng cho pillar ___ | Đánh giá chủ đề: "___"]
Bối cảnh lịch đăng: 3 tập gần nhất thuộc pillar [__, __, __]. Không đề xuất pillar đã xuất hiện 2 lần liên tiếp.

PILLAR (chọn đúng 1):
P1 Vì sao bản đồ như thế này? (biên giới, lãnh thổ, lịch sử) — Historical Timeline
P2 Tiền & bản đồ (hạ tầng, giá đất, quy hoạch, thu nhập theo vùng; ưu tiên Việt Nam) — Money+Maps
P3 Địa lý giải thích hiện tượng (đông/vắng, giàu/nghèo, khô/ngập) — Cause-and-Effect
P4 Tuyến đường & hành trình (eo biển, kênh đào, tuyến thương mại, cuộc hành trình) — Journey Route
P5 Kỳ lạ & kỷ lục (biên giới lạ, vùng lọt thỏm, nơi "nhất") — Region Reveal
Ưu tiên chủ đề liên quan Việt Nam / châu Á (mục tiêu ≥ 50%).

CHẤM ĐIỂM mỗi ý tưởng 0–5 theo 7 tiêu chí:
1. Bằng chứng có sẵn (nguồn chính thống/2 nguồn độc lập tìm được) — ĐIỀU KIỆN QUA CỬA: < 3 thì loại, dù hấp dẫn đến đâu
2. Rõ trên bản đồ (một tấm bản đồ kể được chuyện; có hành động bản đồ cho mỗi beat)
3. Khoảng trống tò mò (nghịch lý thật, người xem muốn biết ngay)
4. Liên quan người xem Việt
5. Khả năng chia sẻ (kể lại được trong 1 câu)
6. Ý nghĩa thực tế ("vậy thì sao" cho người xem; bắt buộc với P2)
7. Rủi ro nhạy cảm (chấm NGƯỢC: 5 = an toàn; tranh chấp lãnh thổ, chính trị, đền bù, giá đất = thấp)
Điểm tổng = (1)×2 + (2) + (3)×1.5 + (4) + (5) + (6) + (7). Xếp hạng theo điểm tổng, nhưng ý tưởng có (1) < 3 không được xếp hạng.

HOOK: viết theo 1 trong 5 mẫu, ≤ 3 giây đọc, có câu hỏi:
A "Vì sao [X] lại [điều trái kỳ vọng]?"
B "[Sự thật gây sốc]. Vậy vì sao [hiện trạng]?"
C "Vì sao [địa danh] hôm nay lại [thuộc / không thuộc] [Y]?"
D "[Con số] [đơn vị] — [điều không tưởng]."
E "Cách nhau [khoảng cách], [loại giá] chênh [mức]. Vì sao?"
Không bịa số trong hook: nếu chưa kiểm chứng, ghi [CẦN KIỂM CHỨNG] thay vì con số.

ĐẦU RA:
(a) Bảng xếp hạng: # | Tiêu đề làm việc | Pillar | Engine | Hook (mẫu) | 7 điểm | Tổng | Rủi ro chính
(b) Với ý tưởng số 1 (hoặc chủ đề được giao), gói Concept:
  1. Tiêu đề làm việc (tiếng Việt) + 3 biến thể tiêu đề
  2. Premise 1 câu
  3. Pillar + engine chính (+ engine phụ nếu thật cần, ghi rõ)
  4. Hook (mẫu nào) + câu trả lời payoff (1 câu) + ý tưởng câu nối vòng (vế cuối nối vào hook)
  5. Lời hứa với người xem
  6. Preset thời lượng (Quick/Standard/Deep) + lý do
  7. Câu hỏi nghiên cứu bắt buộc (mỗi con số/sự kiện cần kiểm chứng)
  8. Neo hình chính (tấm bản đồ nào, khu vực nào, các cú bay dự kiến)
  9. Nhân vật & đạo cụ cần ảnh (cho bộ prompt ảnh)
  10. Cờ rủi ro (tranh chấp, nhạy cảm, loại số liệu dễ nhầm)
Kết thúc đúng câu: "Duyệt Cổng 1, hoặc cho biết cần đổi gì."
```

## 2. Ví dụ đã chấm — tập Singapore (đã sản xuất)

| Tiêu chí | Điểm | Ghi chú |
|---|---|---|
| 1 Bằng chứng | 5 | World Bank (GDP/người 2024), văn bản luật 1965, hiệp ước 1819 — nhiều nguồn |
| 2 Rõ trên bản đồ | 5 | Malaysia/Singapore/Anh có sẵn trong Natural Earth; tách đảo = hành động bản đồ |
| 3 Tò mò | 5 | "Bị đuổi" → "giàu gấp 7" là nghịch lý mạnh |
| 4 Liên quan người Việt | 4 | Đông Nam Á, người Việt biết Singapore |
| 5 Chia sẻ | 4 | Kể lại trong 1 câu |
| 6 Ý nghĩa | 3 | Bài học vị trí/chiến lược, không phải lời khuyên tài chính |
| 7 Rủi ro (ngược) | 4 | Có bạo loạn sắc tộc → nói ngắn, trung tính; không tranh chấp biên giới |
| **Tổng** | **5×2 + 5 + 5×1.5 + 4 + 4 + 3 + 4 = 37,5** | Pillar P1, engine Historical Timeline (+ tiền), hook mẫu B, Standard |

Mốc tham chiếu: **≥ 33** làm ngay · **28–33** cần làm rõ góc · **< 28** để kho.

## 3. Lỗi hay gặp ở Cổng 1 (loại ngay)

- Chủ đề **không có câu hỏi** (chỉ là "sự thật thú vị") → không có payoff.
- Chủ đề cần **ranh giới lịch sử** không có nguồn bản đồ đáng tin → đánh dấu rủi ro, cần nguồn bản đồ trước.
- P2 không có **"vậy thì sao"** cho người xem, hoặc so sánh 2 **loại giá khác nhau**.
- Hook dựa vào con số đọc từ video/bài đăng của người khác (không phải nguồn).
- Chủ đề chạm **chủ quyền Biển Đông** → không tự làm; trình Lucas.
