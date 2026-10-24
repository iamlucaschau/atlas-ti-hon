# 07 — Đề xuất chờ (backlog)

Các ý **chưa áp dụng**. Mỗi mục cần Lucas duyệt trước khi đưa vào Bible / kit.

## Từ phân tích Cartogram Earth (2026-10-16)

Nguồn: 11 Shorts tiếng Anh, phân tích tại `Inset Maps/Map/phan-tich-doi-thu/CARTOGRAM-EARTH.md` (dự án Inset Maps)
(dùng cho kênh tiếng Anh Inset Maps; ở đây chỉ ghi ý hợp với Atlas Tí Hon).

| # | Đề xuất | Đụng tới | Ghi chú |
| --- | --- | --- | --- |
| 1 | **Câu kết chữ ký, nói trọn:** "Lần sau ai bảo X, cứ nhớ: Y." Y là câu trả lời ngắn, không nối sang câu hook nên vẫn hợp nối vòng mềm | Bible §3, §7; mẫu kịch bản | Câu này được lặp mọi tập → ngoại lệ của luật 11 (không lặp câu cửa miệng) |
| 2 | **Thêm kiểu hook "khẳng định"**: số tương phản ("9 nước, 8 cùng một phe") / nhân hoá ("con sông dở tìm biển") / mốc thời sự | `02_PROMPT-CHU-DE.md`, Bible §3 | Họ mở bằng câu hỏi chỉ 1/11 video; mình đang nghiêng về câu hỏi |
| 3 | **`MeasureTag`**: đường dẫn + nhãn vàng "1.200 km" nối 2 điểm | kit `toy-atlas.tsx` | Cho "xa bao nhiêu" mà không cần câu chữ |
| 4 | **Dòng chảy liên tục**: thêm tuỳ chọn `flow` cho `Route` (vẽ xong, chấm vẫn chạy dọc tuyến) | `Route` trong kit | Sông, tuyến hàng hải, đường ống |
| 5 | **Gạch chéo cho vùng tranh chấp / bị đòi** + mã màu phe giữ nguyên suốt tập | `RegionFill` | Biển Đông vẫn dừng ở Cổng 2 như cũ |
| 6 | **Thẻ ngày** cho mốc thời sự (kiểu `YearRibbon` nhưng ngày/tháng/năm) | kit | Đi cùng đề xuất 2 |

## Từ dữ liệu nền tảng + dự báo vidIQ (2026-10-22)

*Lucas gửi ảnh "Pre-publish forecast" của vidIQ cho tập Điện hạt nhân (dự báo 14 ngày 1.428–18.268 lượt xem; gợi ý số 1: "bản đồ mở đầu đứng yên, 5 giây đầu là bản đồ + chữ"; gợi ý số 2 "Hook fix" bị khoá). Luis tìm thêm số liệu công khai về Shorts và chính sách nền tảng. **Chưa áp dụng gì, chưa render lại video nào** — chờ Lucas chọn.*

### A. Điều tìm được (có nguồn)

| # | Phát hiện | Mức tin | Nguồn |
|---|---|---|---|
| F1 | Từ 31/3/2025, YouTube đếm 1 view Shorts mỗi lần **bắt đầu phát hoặc phát lại**, không cần thời gian xem tối thiểu; số cũ đổi tên thành **"engaged views"** — kiếm tiền và YPP vẫn tính theo engaged views | chính thức | [YouTube Help — Get started creating Shorts](https://support.google.com/youtube/answer/10059070) · [PPC Land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/) |
| F2 | YouTube **không công bố** ngưỡng "Đã xem / Đã vuốt qua"; các ngưỡng 50–90 % trên mạng là của blog, mâu thuẫn nhau. Trưởng sản phẩm Shorts (Todd Sherman): ưu tiên **kể chuyện hơn là nhắm một độ dài** | lời YouTube + blog | [Search Engine Journal](https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/) · [Creator Lane](https://creatorlanehq.com/blog/youtube-shorts-viewed-vs-swiped-away) · [prepublish.ai](https://prepublish.ai/blog/viewed-vs-swiped-away-youtube-shorts) |
| F3 | Shorts dài tới **3 phút**; dữ liệu blog (Inflow, 5.400 Shorts) cho thấy 50–60 s nhiều view hơn hẳn < 10 s, nhưng bị nhiễu (khác người làm) và không tách riêng video giáo dục | chính thức (độ dài) / yếu (view theo độ dài) | [YouTube Help](https://support.google.com/youtube/answer/10059070) · [Piktochart](https://piktochart.com/blog/how-long-youtube-shorts/) |
| F4 | Chính sách YPP **"inauthentic content"** (đổi tên 15/7/2025 từ "repetitious"): không cho kiếm tiền với nội dung **làm theo khuôn, ít khác biệt giữa các video**, nội dung AI dựng theo khuôn chung thiếu góc nhìn riêng. **Được phép**: cùng intro/outro nếu phần lớn nội dung khác nhau; series có câu chuyện, trọng tâm, ý tưởng riêng mỗi tập | chính thức | [YouTube Help — YPP policies](https://support.google.com/youtube/answer/1311392) · [TechCrunch](https://techcrunch.com/2025/07/09/youtube-prepares-crackdown-on-mass-produced-and-repetitive-videos-as-concern-over-ai-slop-grows) |
| F5 | Nhãn **"nội dung bị thay đổi / tổng hợp"**: bắt buộc khi nội dung **trông như thật** (người thật nói/làm điều họ không làm, cảnh thật do AI tạo). **Không bắt buộc**: hoạt hình, nội dung không thực tế, hỗ trợ sản xuất bằng AI (kịch bản, đồ hoạ thông tin). Trang chính thức **không nhắc** giọng đọc AI chung (không giả giọng người thật); vài blog nói ngược lại | chính thức + blog mâu thuẫn | [YouTube Help — disclosure](https://support.google.com/youtube/answer/14328491) · [blog.youtube](https://blog.youtube/news-and-events/improving-ai-labels-viewers-creators/) |
| F6 | TikTok: video **tải lại từ nền tảng khác / không chỉnh sửa** có thể bị loại khỏi For You; nội dung AI **trông như thật** phải gắn nhãn. Facebook (2025): giảm phân phối và kiếm tiền với nội dung **đăng lại của người khác**; bản gốc được ưu tiên | báo / blog, chưa đọc trang chính thức | [Engadget](https://www.engadget.com/tiktok-is-trying-to-clean-up-its-for-you-recommendations-210057825.html) · [Social Samosa](https://www.socialsamosa.com/news-2/facebook-penalise-accounts-sharing-unoriginal-reused-content-9497088) · [Bizhub (Vietnam News)](https://bizhub.vietnamnews.vn/facebook-intensifies-crackdown-on-unoriginal-content-to-support-real-creators-post380520.html) |
| F7 | Phụ đề dạng văn bản (file SRT) được YouTube đọc cho tìm kiếm; chữ in cứng trên hình thì không chắc. Từ khoá nên có ở tiêu đề, lời đọc, phụ đề, mô tả | blog (nhà bán công cụ) | [Opus](https://www.opus.pro/blog/youtube-shorts-caption-subtitle-best-practices) · [vidIQ — YouTube SEO](https://www.vidiq.com/blog/post/youtube-seo/) |
| F8 | **Không tìm thấy** tài liệu chính thức hay kiểm chứng độc lập về độ chính xác của dự báo vidIQ; đây là ước lượng của công cụ, không phải dữ liệu YouTube | — | [vidIQ Support — Shorts Scorecard](https://support.vidiq.com/en/articles/10453678-unleash-your-shorts-potential-with-the-vidiq-shorts-scorecard) |
| F9 | Không tìm thấy nghiên cứu công khai đáng tin về kênh Shorts bản đồ / địa lý tiếng Việt (chỉ có bài du lịch, bảng xếp hạng TikToker). Dữ liệu đối thủ tốt nhất mình có vẫn là phân tích 20 video (`Map/phan-tich-doi-thu/BAO-CAO.md`): cả 5 kênh Việt đều dùng **tiêu đề hook to trên đầu khung 3–5 s đầu** (H1) | nội bộ | `BAO-CAO.md` §3 |

### B. Đối chiếu với dự báo vidIQ của tập Điện hạt nhân

- File `p2-dien-hat-nhan.mp4` trên máy được render lại **21/10 10:50** (đã có cú bay từ frame 1). Nếu Lucas tải **bản này** lên mà vidIQ vẫn nói "5 giây đầu là bản đồ đứng yên + chữ", thì luật mở đầu hiện tại **chưa đủ**: camera bay ~0,9 s rồi **đứng ở khung hook ~3 s** trong lúc ruy băng "2016", con dấu "TẠM DỪNG" hiện — với công cụ chấm khung, đoạn đó vẫn giống "bản đồ + chữ". Nếu Lucas tải **bản cũ** (trước 21/10) thì gợi ý này đã được sửa.
- Gợi ý của vidIQ ("zoom vào Ninh Thuận đúng lúc lời đọc nhắc tới") **trùng** hướng luật 21/10, chỉ cần mạnh hơn: chuyển động phải **kéo dài suốt 5 s đầu**, không chỉ 1 cú bay.

### C. Đề xuất nâng cấp (chờ Lucas chọn; ★ = Luis ưu tiên)

| # | Đề xuất | Vì sao (dữ liệu) | Đụng tới | Công sức |
|---|---|---|---|---|
| 7 ★ | **Sổ số liệu kênh**: sau 7 và 14 ngày, Lucas chép từ YouTube Studio 6 số mỗi tập: *Đã xem / Đã vuốt qua*, % xem trung bình, thời lượng xem TB, **engaged views**, views, follow mới (+ dự báo vidIQ nếu có). Luis đọc, so theo pillar / mẫu hook / độ dài, dùng trung vị | F1, F2, F8: không có ngưỡng chung, dự báo không kiểm chứng → dữ liệu **của chính kênh** là thước đo đáng tin nhất; Bible §9 đã có ý nhưng chưa có bảng | file mới `08_SO-LIEU-KENH.md` | thấp |
| 8 ★ | **Luật "5 giây đầu luôn chuyển động"** (nâng luật 21/10): sau cú bay ở frame 1, camera **tiếp tục trôi / zoom chậm** tới hết giây 5 (nhanh hơn mức đẩy thường, ví dụ ~8–10 % / 3 s), và mỗi ≤ 1 s có một sự kiện hình (vùng loé, đường vẽ, sticker) — chữ không được là thứ duy nhất đổi | B, F2; vidIQ: "2 giây đầu là cơ hội lớn nhất" | Bible §5, `camAt` (thêm tham số đẩy mở đầu) | thấp–vừa |
| 9 ★ | **Tải file phụ đề SRT** lên YouTube (và nền tảng khác nếu có ô) cho mỗi tập — sinh tự động từ `words.json` đã có | F7: tìm kiếm đọc được phụ đề văn bản; người xem tắt tiếng | script mới `scripts/srt.mjs`, `xuat-ban.txt` | thấp |
| 10 | **Tiêu đề hook trên đầu khung 0–3 s** (2 dòng, giống chữ trên ảnh bìa), nới luật "≤ 5 chữ" riêng cho khối này | F9: cả 5 kênh Việt đều dùng; ảnh bìa và khung đầu khớp nhau | Bible §5 (chữ), kit (`HookTitle`) | vừa |
| 11 | **Chống "nội dung theo khuôn"**: mỗi tập có ít nhất 1 **cảnh hình riêng** không có ở tập khác (như quả địa cầu tập Đường bay, thước đo tập Chỗ hẹp), xoay vòng 5 engine, đổi kiểu mở đầu; checklist Cổng 4 thêm dòng "điểm khác biệt của tập" | F4: cả kênh dùng chung kit, giọng, khung → rủi ro bị xem là "mass-produced" khi xét YPP | `04_QUY-TRINH` checklist Cổng 4 | thấp |
| 12 | **Ghi rõ trong mô tả**: "Lời đọc dùng giọng tổng hợp (AI); kịch bản và nghiên cứu do Atlas Tí Hon thực hiện" — không bật nhãn "nội dung bị thay đổi" vì hình là hoạt hình, giọng không giả người thật; **không bao giờ** dùng ảnh AI trông như thật về người thật / sự kiện thật | F5: minh bạch, không ảnh hưởng phân phối | mẫu `xuat-ban.txt`, Bible §8 | thấp |
| 13 | **Đăng file gốc sạch lên từng nền tảng** (không lấy video có logo TikTok đăng sang YouTube/Facebook và ngược lại); caption mỗi nền tảng viết riêng (đã có §6 gói xuất bản) | F6 | quy trình đăng (Lucas) | thấp |
| 14 | **Thử độ dài**: làm 2–3 tập ngắn (45–55 s) để so % xem trung bình với nhóm 66–75 s hiện tại, trước khi đổi luật | F2, F3: không có số chắc cho video giáo dục → phải tự thử | Bible §4 (chỉ thử) | vừa |
| 15 | **Rút đuôi nhạc sau chữ cuối** 0,7 s → ~0,4 s để vòng lặp thứ hai bắt vào nhanh hơn (phát lại giờ được tính view) | F1 | `export --tail`, Bible §7 | thấp |

## Từ bóc tách 11 Reels Geo Nexus (2026-10-22)

Đề xuất **#16–#27** (vùng đất có mặt, vùng tự nói, khuôn "Một tỉnh, N thế giới", chữ hứa con số, vùng nhấc lên, camera bám vật thể, kết bằng điểm chung, caption danh sách, bản dài cho Facebook, watermark, dòng tập "Từ Việt Nam tới…", thử ít chữ): xem `Map/phan-tich-doi-thu/GEO-NEXUS.md` §6.

### D. Cần Lucas cho biết

1. Ảnh vidIQ là của **bản video nào** (file trên máy ngày 21/10 10:50, hay bản cũ hơn)?
2. Những tập nào **đã đăng**, trên nền tảng nào — để Luis lập sổ số liệu (đề xuất 7) và đọc số liệu thật trong Studio thay cho dự báo.
3. Chọn đề xuất nào trong C để Luis áp dụng (và có cho phép sửa / render lại tập cũ không).
