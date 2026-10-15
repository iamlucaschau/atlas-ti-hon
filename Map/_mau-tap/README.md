# Mẫu một tập mới — Atlas Tí Hon

Sao chép thư mục này thành `Map/p<pillar>-<ten-ngan>/` (vd. `Map/p2-cau-cat-lai/`), rồi làm theo **5 cổng**. Mỗi cổng **dừng lại chờ Lucas duyệt** ("Duyệt Cổng N").

| Cổng | Việc | File | Hướng dẫn |
|---|---|---|---|
| 1 Concept | 3–5 ý tưởng có chấm điểm → gói Concept của ý tưởng được chọn | `Map/cong-1_P<x>_<ngày>.md` | `00_he-thong/02_PROMPT-CHU-DE.md`, kho `05_KHO-CHU-DE.md` |
| 2 Evidence | sổ nhận định (C1…) + sổ nguồn (SRC-…), mâu thuẫn & quyết định bản đồ | `cong-2_so-nguon.md` | `03_PROMPT-NGUON-KICH-BAN.md` (Cổng 2), Bible §8 |
| 3 Script | kịch bản 7 luật + spec | `kich-ban-<slug>-FINAL.md`, `01_EPISODE-SPEC_<slug>.md` | `03_…` (Cổng 3), Bible §3–§4, §7 |
| — | lồng tiếng (sau khi duyệt Cổng 3) | `voiceover/<slug>.json` → `vo-timestamps.md` | `04_QUY-TRINH-SAN-XUAT.md` §1 |
| 4 Visual | beat sheet + bộ prompt ảnh; Lucas tạo ảnh | `beat-sheet.md`, `image-prompts.md` | `04_…` §2–§3 |
| 5 Production | `Video.tsx` → kiểm tra khung → render + master + bản lặp → ảnh bìa → gói xuất bản | `Video.tsx`, `<slug>.mp4`, `cover.jpg`, `xuat-ban.md` | `04_…` §4–§6, `06_NHAN-DIEN-KENH.md` |

File trong thư mục này:
- `Video.tsx.txt` — khung code (đổi tên thành `Video.tsx`, tìm `TODO`).
- `kich-ban-FINAL.md`, `01_EPISODE-SPEC.md`, `voiceover.json` — khung đúng định dạng mà `scripts/episode.mjs prep` đọc.
- `xuat-ban.md` — khung gói xuất bản (tiêu đề, mô tả, hashtag, ảnh bìa, bình luận ghim, caption).

Tập mẫu đầy đủ nhất: `Map/p1-brunei-chia-doi/` (P1, làm từ đầu theo đủ 7 luật) và `Map/p4-malacca-kra/` (P4 v2).
