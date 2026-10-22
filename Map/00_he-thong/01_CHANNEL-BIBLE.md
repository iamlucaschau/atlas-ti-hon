# 01 — CHANNEL BIBLE · Kênh bản đồ giải thích

*Chốt 2026-10-12. Người duyệt mọi cổng: **Lucas**. Tên kênh: **chưa chốt** (trường cấu hình).*
*Đây là **nguồn gốc duy nhất** của hệ thống. Nó thay cho `LOCKED_SPEC.md` của Production Engine V2; khi playbook, Engine V2 và file này khác nhau, **file này đúng**.*

**Bộ tài liệu** (`Map/00_he-thong/`):
1. `01_CHANNEL-BIBLE.md` — kênh là gì, pillar, engine, chuẩn hình/tiếng, nguyên tắc (file này)
2. `02_PROMPT-CHU-DE.md` — Cổng 1: tạo & chấm chủ đề
3. `03_PROMPT-NGUON-KICH-BAN.md` — Cổng 2–3: sổ nguồn + kịch bản
4. `04_QUY-TRINH-SAN-XUAT.md` — Cổng 4–5: beat sheet, dựng, QA, xuất bản, số liệu sau đăng
5. `05_KHO-CHU-DE.md` — kho ý tưởng theo pillar

Tài liệu nguồn (tham khảo, không sửa): `Map/master-map-explainer-playbook (1).md` (nghiên cứu thể loại), `Map/Production-Engine-V2-v2.0.0.zip` (lấy quy trình 5 cổng, schema, gói xuất bản; **không dùng app/renderer** — Lucas 2026-10-12), `Map/phan-tich-V3-V4-EasyHistories.md` (phân tích phong cách).

---

## 1. Định vị

- **Một câu:** mỗi video trả lời **một câu hỏi "vì sao"** bằng **một tấm bản đồ**, dưới 1 phút, mọi con số có nguồn.
- **Định dạng:** 9:16, 1080×1920, 30 fps; 35–90 s; không lộ mặt; bản đồ là nhân vật chính.
- **Ngôn ngữ:** **tiếng Việt trước** (học công thức, xây kênh VN); bản **tiếng Anh** làm sau cho các tập thắng — giữ nguyên hình, đổi VO + phụ đề + tiêu đề.
- **Khán giả:** người Việt 18–40, tò mò lịch sử – địa lý – tiền bạc; xem trên điện thoại, lướt nhanh; thích "à ra vậy" và số liệu bất ngờ.
- **Lời hứa:** xem xong hiểu được một điều trên bản đồ mà trước đó thấy vô lý — và có thể kể lại cho người khác.

## 2. Năm pillar (trụ chủ đề) — Lucas chọn bản "cân bằng"

| # | Pillar | Câu hỏi gốc | Engine chính (phụ) | Tỉ lệ | Ví dụ |
|---|---|---|---|---|---|
| **P1** | **Vì sao bản đồ như thế này?** | Vì sao X hôm nay thuộc / không thuộc Y? Vì sao biên giới nằm ở đây? | Historical Timeline (Money+Maps) | **30%** | Singapore bị tách khỏi Malaysia; Mỹ mua Alaska |
| **P2** | **Tiền & bản đồ** | Vì sao hai nơi gần nhau mà giá / thu nhập / cơ hội khác hẳn? Hạ tầng này làm giàu khu nào? | Money+Maps (Cause-and-Effect) | **30%** | Thủ Thiêm – Q1; Vành đai 4; Metro số 1 |
| **P3** | **Địa lý giải thích hiện tượng** | Vì sao nơi này đông / vắng / giàu / nghèo / khô / ngập? | Cause-and-Effect (Region Reveal) | **20%** | Vì sao 80% dân Mỹ sống phía đông một đường kẻ |
| **P4** | **Tuyến đường & hành trình** | Một tuyến đường / con tàu / người đi qua đâu và vì sao nó quan trọng? | Journey Route (Money+Maps) | **10%** | Eo Malacca; Kênh Suez; đường mòn Trường Sơn |
| **P5** | **Kỳ lạ & kỷ lục** | Biên giới lạ, vùng lọt thỏm, nơi "nhất" thế giới | Region Reveal | **10%** | Biên giới kỳ lạ của Tây Ban Nha |

**Quy tắc lịch đăng:**
- Tối thiểu **50%** chủ đề liên quan Việt Nam hoặc châu Á (ước 70% VN / 30% quốc tế của Engine V2 là mục tiêu dài hạn cho P2).
- Không quá **2 tập liên tiếp** cùng pillar.
- Mỗi 10 tập: ≥ 3 P1, ≥ 3 P2, ≥ 2 P3, ≥ 1 P4, ≥ 1 P5.
- Pillar nào thắng (xem §9) được tăng tỉ lệ ở chu kỳ sau — nhưng chỉ khi Lucas duyệt.

## 3. Năm engine (cách dựng) và mẫu hook

| Engine | Dùng khi | Mạch chuẩn | Ngữ pháp hình (kit I) |
|---|---|---|---|
| **Historical Timeline** | lãnh thổ / quyền kiểm soát đổi theo mốc năm | câu hỏi hiện trạng → trạng thái đầu → các mốc năm → quyết định cuối → payoff "hôm nay" | `YearRibbon`, vết loang đổi chủ, `CountryShape`, quân cờ + cờ |
| **Money+Maps** | hạ tầng / vị trí / quy định gắn với tiền | nghịch lý tiền → định vị 2+ khu → 2–4 nguyên nhân có nguồn → so sánh số **đúng loại** → "vậy thì sao" + giới hạn | bản đồ thành phố, tuyến hạ tầng, `BigGold`, cột so sánh |
| **Cause-and-Effect** | địa lý giải thích kết quả nhìn thấy | nghịch lý → định vị → 2–4 nguyên nhân → tương tác → hệ quả | nhãn đánh số, mũi tên, lớp phủ địa hình/khí hậu |
| **Journey Route** | người / vật / tuyến đi qua địa lý | ràng buộc cực đoan → điểm xuất phát → chướng ngại leo thang → vượt qua → quy mô cuối | `Route` + tàu, mốc kiểm tra, thẻ quãng đường/thời gian |
| **Region Reveal** | nhóm, thành viên, vùng lọt thỏm | ngộ nhận → từng mảnh → gộp lại → twist → tóm quan hệ | tô vùng, nhấn biên giới, nhãn |
| ↳ khuôn **"Một tỉnh, N thế giới"** (Lucas 2026-10-22, #18) | tỉnh / thành (nhất là tỉnh mới sau sáp nhập 2025) có 3 vùng khác hẳn nhau | phá ngộ nhận → **hứa con số** ("3 thế giới", `PromiseTitle`) → mỗi vùng: hạ cánh, 2 đặc điểm có nguồn, **vùng tự nói 1 câu** (`MapFace` + giọng nhân vật) → twist có nguồn | tỉnh mới `VN2025` + vùng con `VN2024`, `MapFace`, `PromiseTitle`; N = 3 để giữ 60–75 s |

**Mẫu hook tiếng Việt** (câu đầu tiên, ≤ 3 s; hook = nghịch lý có thật, tốt nhất kèm 1 con số đã kiểm chứng):
- **A — Vì sao + nghịch lý:** "Vì sao [X] lại [điều trái kỳ vọng]?"
- **B — Sự thật + câu hỏi:** "[Sự thật gây sốc]. Vậy vì sao [hiện trạng]?" *(mẫu Singapore)*
- **C — Hiện trạng:** "Vì sao [địa danh] hôm nay lại [thuộc / không thuộc] [Y]?"
- **D — Số cực đoan:** "[Con số] [đơn vị] — [điều không tưởng]."
- **E — Tiền:** "Cách nhau [khoảng cách], giá [loại giá] chênh [mức]. Vì sao?"
- **F — Lật ngược (mạnh nhất ở đối thủ Việt):** "[Khẳng định gây sốc]. Vậy mà [kết quả trái ngược]." / "[Câu ai cũng tin]. Nhưng khoan, câu này mới đúng một nửa."

**Kỹ thuật kịch bản bắt buộc cân nhắc** (học từ 20 video đối thủ, `Map/phan-tich-doi-thu/BAO-CAO.md` §2, Lucas 2026-10-13):
1. **Phá ngộ nhận:** "Nhiều người nghĩ… Thật ra…" (phải có nguồn cho cả hai vế).
2. **Cảnh đời thường / "thử tưởng tượng":** đổi con số thành trải nghiệm ("ăn sáng ở A, ăn trưa ở B"), tính từ số liệu có nguồn.
3. **Câu hỏi treo giữa video**, trả lời ngay bằng 1–3 chữ.
4. **Chi tiết nhỏ, cụ thể, dễ nhớ** hơn thông số kỹ thuật; so sánh quy mô bằng thứ người xem biết ("mỗi mét hơn 1 tỷ đồng").
5. **Twist / nghịch lý ở cuối** (có nguồn), kết bằng một câu trọn vẹn.

**Luật kịch bản bổ sung** (so sánh với đối thủ, `Map/phan-tich-doi-thu/SO-SANH-KICH-BAN.md`, Lucas duyệt 2026-10-14):
6. **Câu hỏi treo phải được đáp ngay bằng 1–3 chữ**, rồi mới giải thích ("Vì sao tính sai? Vì cái thước. Mốc đo…").
7. **Mỗi tập ≥ 1 khoảnh khắc người:** nhân vật thật làm một việc cụ thể (khóc trên truyền hình, cử kỹ sư đi đo, hỏi thẳng thủ tướng), có nguồn.
8. **Câu đùa: ít nhất 1, nhiều nhất 2**, đặt ngay sau một con số nặng; Cổng 3 đánh dấu `[ĐÙA]`.
9. **Chủ đề có tranh luận → 2 câu hai phe** trung tính, mỗi vế có nguồn (xem §8).
10. **Mỗi câu VO tối đa 1 con số mới** (năm cũng tính).
11. **Không lặp câu cửa miệng:** "oái oăm", "thử…", "Vì sao?" trơn mỗi cụm tối đa 1 lần trong 3 tập liên tiếp; dùng kho câu thay thế ở prompt Cổng 3.

## 4. Thời lượng & nhịp

| Preset | Thời lượng | Beat | Số chữ VO (tiếng Việt, tempo 1.1) |
|---|---|---|---|
| Quick | 35–45 s | 4–6 | ~130–165 chữ |
| **Standard** (mặc định) | **60–75 s** | 7–10 | **~220–275 chữ** |
| Deep | 75–90 s | 9–12 | ~275–330 chữ |

**Tempo mặc định 1.1** (Lucas 2026-10-13, sau khi nghe tập ĐBSCL ở 1.0 và 1.1) → thường ra **~235–240 wpm**. Nếu `vo-timestamps.md` đo được > 250 wpm (bản Gemini đọc nhanh bất thường, như đường sắt v1: 274 wpm) thì hạ tempo và hỏi Lucas. Đổi tempo không tốn request. Chọn preset **ngắn nhất** kể đủ câu chuyện; không độn chữ. Câu VO ngắn (5–15 chữ), mỗi câu là một beat hình; mỗi 1,5–2 s có một sự kiện trên màn hình.

## 5. Chuẩn hình ảnh — **Style I "Toy Atlas"** (thay Visual DNA của Engine V2)

Chi tiết + code: `Style Library/I-toy-atlas/README.md`. Tóm tắt những điểm **thay thế** Engine V2:

| Engine V2 khóa | Thay bằng (đã duyệt qua tập Singapore) |
|---|---|
| Nền than chì/navy + amber `#F5A524` | Bản đồ Natural Earth có vân địa hình, biển xanh, lãnh thổ màu theo phe |
| Font Be Vietnam Pro | **Bricolage Grotesque** 700–800 (có bộ tiếng Việt), mọi chữ ≥ 48 px |
| Phụ đề IN HOA 2–5 từ, 2 dòng | **Karaoke 1 dòng, ≤ 4 chữ / 20 ký tự** (Lucas 2026-10-13); từ khoá + con số vàng nhạt suốt cụm, chữ đang đọc vàng đậm và to hơn 10 % (`AtlasSub`); tối đa 1–2 cụm từ khoá `*…*` mỗi câu |
| Push / pan nhẹ mỗi beat | **Bay khi đổi nơi** (ease, ≥ 22 frame, không blur/rung) + **đẩy chậm mỗi beat** (Lucas 2026-10-13): camera tiến rất chậm, đều về chủ thể, ≤ ~5 % zoom mỗi 3 s, không rung, không giật, không "thở", không zoom đột ngột; **trong khung luôn có chuyển động** (biển, cờ, quân cờ, tàu, sticker, viền phát sáng). **Mở đầu phải có chuyển động camera (Lucas 2026-10-21, góp ý công cụ dự báo: "5 giây đầu là bản đồ đứng yên + chữ"):** frame 0 là khung rộng (khung nối vòng), và **ngay từ frame 1** camera bay vào nơi hook nhắc tới (một cú "đổi nơi" ~0,8–1 s, ease in-out); 2 giây đầu không được chỉ có chữ hiện trên bản đồ đứng yên |
| Logo dấu phẩy amber | Bỏ (thương hiệu chốt sau cùng tên kênh) |
| Minh hoạ vector + paper collage | **Quân cờ chibi + sticker đạo cụ** từ bộ prompt ảnh (Lucas tạo), tách nền bằng `scripts/cutout.py` |

**Tên nước + cờ + viền sáng** (Lucas 2026-10-14): nước nào được lời đọc gọi tên hoặc được tô màu thì có nhãn tên (52 px) kèm cờ cắm trên lãnh thổ khi lần đầu vào khung, nhãn đi theo camera; viền vàng–trắng của nước đó loé 2 lần khi lời đọc nói tên (`CountryTag`). Nước nền không nhãn; nhãn tạm ẩn khi khung đã đủ 2 chữ hoặc nhãn đè lên đạo cụ.

**Vùng đất có mặt — `MapFace`** (Lucas 2026-10-22, #16): mắt, mày, miệng vector đặt lên một nước / tỉnh / vùng, 8 biểu cảm (`neutral`, `happy`, `smug`, `angry`, `worried`, `surprised`, `sad`, `wink`), chớp mắt tự động, miệng mấp máy theo thời gian từng chữ khi vùng đó nói (`talkOpen` từ `words.json`). Dùng ở **1–3 nhịp mỗi tập** (thường là lúc vùng tự nói), không để suốt video; mặt nằm trong vùng an toàn, không che nhãn tên; **không đặt mặt lên Hoàng Sa, Trường Sa hay vùng tranh chấp**; biểu cảm không chế giễu.

**Chữ hứa con số — `PromiseTitle`** (Lucas 2026-10-22, #19): 2–3 dòng, nghiêng ~8°, trượt vào từ dưới, hiện ~2–3 s trong giây 4–12, dòng đầu là con số to vàng ("3 THẾ GIỚI"). **Ngoại lệ luật ≤ 5 chữ: tối đa 8 chữ** cho khối này; lúc nó hiện, khung không có thẻ số nào khác.

Giữ của Engine V2: một hành động bản đồ chính mỗi beat; nhãn chỉ cho địa danh của beat đó; thẻ số liệu gắn với bản đồ; không dùng ảnh vệ tinh làm nền chính; nguồn ở description, không trên màn hình (trừ attribution bắt buộc).

## 6. Chuẩn âm thanh & giọng

- **Giọng:** Gemini TTS, nam, `Orus`, model `gemini-3.8-flash-tts`, **tempo 1.1** (Lucas 2026-10-13; 1.2 nghe kém tự nhiên, 1.0 hơi chậm), ~235–240 wpm, khoảng nghỉ ngắn `{sentence 0.06, paragraph 0.12, scene 0.25}` cho nhịp nhanh.
- **Giọng nhân vật — "vùng đất tự nói"** (Lucas 2026-10-22, đề xuất #17 từ bóc tách Geo Nexus): 1–3 câu ngắn (≤ 8 s) mỗi tập, do một nước / tỉnh / vùng "nói" (có `MapFace`), câu riêng một dòng trong `voiceover/<slug>.json` với `"who"` trỏ tới bảng `cast`. Nội dung **tích cực, đúng từ địa phương, không chê bai vùng miền**; không cho nhân vật nói số liệu (số liệu vẫn do người dẫn đọc). Giọng đã nghe và duyệt:

  | Vai | Giọng Gemini | Chỉ dẫn (rút gọn) |
  |---|---|---|
  | Nam Bộ — nam trẻ | `Puck` | nam trẻ Sài Gòn, thân thiện, hào sảng |
  | Nam Bộ — nữ trẻ | `Leda` | nữ trẻ Sài Gòn, ngọt, lanh lợi |
  | Huế — nữ | `Kore` | nữ Huế, nhẹ nhàng, chậm rãi |
  | Bắc Bộ (Hà Nội) — nữ | `Aoede` | nữ Hà Nội, điềm đạm, hóm hỉnh |
  | Bắc Trung Bộ (Quảng Bình…) — nam | `Orus` + chỉ dẫn giọng vùng | giọng người dẫn đổi sắc thái; **không dùng `Fenrir`** (nghe giả) |

  Câu thử gốc: `out/voice-test/` (không commit). Vùng chưa có giọng duyệt → thu thử 1 câu cho Lucas nghe trước.
- Chỉ dẫn giọng mặc định: *"Giọng nam Việt Nam trưởng thành, giọng miền Bắc chuẩn, trung tính, trầm vừa và đáng tin, như người kể chuyện lịch sử hấp dẫn. Mở đầu nhanh, gọn và tò mò; giải thích rõ ràng; đọc năm, con số và địa danh chậm hơn một nhịp. Không cường điệu, không hét. Câu cuối chưa kết thúc: giữ giọng treo lên."*
- **Giọng kể "vui vừa phải"** (Lucas 2026-10-13): cảnh đời thường, chơi chữ nhẹ, tối đa 1–2 câu khẩu ngữ/lóng mỗi video; số liệu vẫn chuẩn; phần tranh luận vẫn trung tính.
- **Nhạc nền theo pillar** (Lucas 2026-10-17, thay bộ Pixabay 2026-10-14): nhạc **Kevin MacLeod (incompetech.com), CC BY 4.0** — dùng được cả YouTube lẫn mạng khác, **bắt buộc ghi công** trong mô tả mỗi tập: `"Tên bài" Kevin MacLeod (incompetech.com) — Licensed under Creative Commons: By Attribution 4.0 — https://creativecommons.org/licenses/by/4.0/` (caption TikTok/Reels ghi gọn). File ở `public/sfx/music/*-km.mp3` (không commit, nguồn trong `scripts/music-list-kevinmacleod.json`). `<MusicBed file={PILLAR_MUSIC.Px} />` tự cân về **−28 LUFS**, fade 0,3 s hai đầu, `duck` để lắng ở cao trào.

  | Pillar | Bài chính (`PILLAR_MUSIC`) | Bài dự phòng (`PILLAR_MUSIC_ALT`) |
  |---|---|---|
  | P1 Lịch sử | Heroic Age (dàn nhạc, hồi hộp) | Lightless Dawn |
  | P2 Tiền & bản đồ | Wallpaper (nhẹ, tươi) | Inspired |
  | P3 Địa lý hiện tượng | Floating Cities (ambient, khám phá) | Ether Vox |
  | P4 Hành trình | Ascending the Vale (màu châu Á) | Crossing the Chasm |
  | P5 Kỳ lạ & kỷ lục | Investigations (tò mò) | Sneaky Snitch |

  **Content ID:** nhạc Kevin MacLeod cũng đã đăng ký Content ID; khiếu nại thường do **thiếu ghi công** → thêm dòng ghi công vào mô tả rồi kháng nghị (gỡ trong ~72 giờ), nhiều video thì dùng form gỡ hàng loạt trên trang incompetech "YouTube Content ID" hoặc email help@incompetech.com. **Không** dùng lại nhạc Pixabay: 2026-10-17 cả 10 bài cũ đều "Content ID Registered", tập P4 bị chặn toàn cầu (khiếu nại "Seaside Morning" — Aleksey Chistilin / Elite Alliance Music); dò 120 bài Pixabay chỉ 2 bài chưa đăng ký. **Trước khi chọn nhạc mới:** kiểm trang bài có "Content ID" / chính sách khiếu nại của tác giả, và đưa dòng ghi công vào `xuat-ban.md`.
- SFX thật Pixabay: whoosh mỗi cú bay, click khi sticker hiện, deep hit ở con số chốt; không pop/ding hoạt hình; master −14 LUFS / −1,5 dBTP.

## 7. Cấu trúc bắt buộc mọi tập

1. **Hook ≤ 3 s** (mẫu §3), có câu hỏi.
2. Mạch theo engine; mỗi câu 1 beat.
3. **Payoff trả lời đúng câu hỏi hook**, có **so sánh nhìn thấy được** (2 cột, 2 con số, trước/sau).
4. **Twist / nghịch lý là nhịp nội dung cuối cùng**; tin cập nhật, bối cảnh hiện tại đặt **trước** twist (hoặc vào bình luận ghim).
5. **Nối vòng mềm** (Lucas 2026-10-14, thay câu bỏ lửng): lời đọc **kết bằng một câu trọn vẹn, có sức nặng** (không còn vế bỏ lửng nối vào câu đầu, vì nghe cụt khi không tự lặp và giọng TTS đọc câu treo gượng). **Hình vẫn lặp liền:** khung cuối = khung đầu (`seamKeys` trong kit), hình quay về trong câu cuối hoặc trong **0,7–1 s nhạc sau chữ cuối** (`export --loop --tail=0.7`).
6. CTA chỉ khi câu hỏi thật sự có ích (câu hỏi gợi comment để trong pinned comment, không đọc trong video).

## 8. Nguyên tắc dữ liệu & an toàn (gộp playbook §7 + Engine V2)

1. **Không có nguồn = không dùng.** Mỗi con số có nhãn: ✅ đã kiểm chứng (nguồn + ngày truy cập) · chỉ có trong báo cáo/hợp đồng · giả định.
2. Transcript, phụ đề, bình luận, snippet tìm kiếm, video đối thủ **không phải nguồn**.
3. Sự thật ổn định: ≥ 1 nguồn chính thống. Dữ liệu biến động: ghi nhà phát hành, ngày phát hành, kỳ dữ liệu, ngày truy cập. **P2 Money+Maps, đền bù, quy hoạch, xung đột, chính trị: ≥ 2 nguồn độc lập**, ưu tiên văn bản gốc.
4. **Không trộn loại số liệu:** bảng giá Nhà nước / giá khởi điểm đấu giá / giá chào / giá giao dịch / giá thuê / NOC; GDP/người ≠ thu nhập. Lời đọc được nói bình dân nhưng **không được đổi loại số liệu**; nhãn trên màn hình ghi đúng loại.
5. Không biến tương quan thành nhân quả ("sau khi", "đi cùng với", "trùng với").
6. Không dự báo giá chắc chắn, không khuyên mua/bán.
7. Nguồn mâu thuẫn đáng kể → **dừng ở Cổng 2**, trình Lucas.
8. **Chủ đề có tranh luận** (dự án lớn, chính sách): đặt **2 câu hai phe** cạnh nhau, mỗi vế có nguồn riêng; không để lời dẫn đứng về một phía.
9. **Lãnh thổ / biên giới tranh chấp** (đặc biệt Biển Đông, Hoàng Sa, Trường Sa) → **dừng ở Cổng 2**, Lucas duyệt cách vẽ. Mặc định: chỉ tô màu các nước trong câu chuyện, nước khác màu đất trung tính, không nhãn.
   - **Bản đồ toàn lãnh thổ Việt Nam** (vd. tuyến Bắc–Nam): theo quy định của Việt Nam phải thể hiện **quần đảo Hoàng Sa và Trường Sa thuộc Việt Nam**. Dữ liệu Natural Earth không bảo đảm điều này → **không dùng nguyên dữ liệu gốc** cho khung có Biển Đông; Lucas duyệt cách vẽ ở Cổng 2 (vẽ bổ sung hai quần đảo cùng màu Việt Nam + nhãn, hoặc cắt khung chỉ còn đất liền khi câu chuyện không cần biển).
   - **Cách hiển thị chuẩn (Lucas 2026-10-14, kiểu ghim bản đồ):** chấm nhỏ màu Việt Nam cho các đảo, luôn có khi khung có cả bờ biển Việt Nam. Tên "Hoàng Sa", "Trường Sa" (42 px, chữ trắng viền tối) cạnh **một chấm đỏ viền trắng** mỗi quần đảo, gắn vào bản đồ (đi theo camera); **chỉ hiện ở cảnh camera tới đó** — tự hiện khi ghim nằm trong vùng an toàn và đủ gần để phân biệt hai quần đảo, cảnh châu Á rộng chỉ còn chấm.
   - **Địa giới tỉnh sau sáp nhập (1/7/2025):** dữ liệu tỉnh cũ đã lỗi thời → không vẽ ranh giới tỉnh trừ khi có nguồn hình học mới; số liệu theo tỉnh phải ghi rõ "trước / sau sáp nhập". Nguồn hình học mới (Lucas 2026-10-18): **OCHA/HDX COD-AB v02** (34 tỉnh, CC BY-IGO, ghi "OCHA/HDX" trong mô tả) trong `Style Library/I-toy-atlas/vn-provinces.tsx`; 63 tỉnh cũ (Natural Earth) chỉ dùng cho cảnh "trước sáp nhập". Đà Nẵng gồm Hoàng Sa, Khánh Hoà gồm Trường Sa: khi tô màu theo tỉnh, chấm đảo cùng màu tỉnh đó.
10. Không bịa toạ độ, ranh giới, tuyến đường, ngày, trích dẫn, số liệu, URL, tên nguồn.
11. Người thật trong lịch sử: hình chibi tôn trọng, không biếm hoạ xúc phạm; không gọi tên cá nhân/tổ chức ngoài nguồn trong chủ đề nhạy cảm.
12. Giữ attribution bản đồ khi giấy phép yêu cầu (Natural Earth là public domain — không bắt buộc, vẫn ghi trong description).
13. Một tập chỉ được đăng khi **cả 5 cổng = duyệt**.

## 9. Học sau khi đăng

Ghi số liệu ở **24 h · 7 ngày · 30 ngày** cho YouTube / Facebook / Instagram / TikTok: views, thời gian xem trung bình, % xem trung bình, likes, comments, shares, saves, follow mới (mẫu bảng: `04_QUY-TRINH-SAN-XUAT.md` §8). So sánh **cùng loại** (pillar, engine, thời lượng, mẫu hook); dùng **trung vị** và mẫu lặp lại, không theo 1 video outlier. Đề xuất thử nghiệm; **không tự đổi luật trong file này** — Lucas duyệt.

## 10. Nhật ký quyết định

| Ngày | Quyết định | Người |
|---|---|---|
| 2026-10-10 | Phân tích EasyHistories → style I "Toy Atlas"; camera được bay mỗi lần đổi nơi | Lucas |
| 2026-10-10 | Tiếng Việt trước, tiếng Anh sau | Lucas |
| 2026-10-12 | v2 tập Singapore: hook câu hỏi, chuyển động liên tục, phụ đề 5 chữ, nhạc −11 dB | Lucas |
| 2026-10-12 | Nhịp nhanh: khoảng nghỉ ngắn, bay ≥ 22 frame; thử tempo 1.2 rồi **giữ tempo 1.1** cho giọng tự nhiên | Lucas |
| 2026-10-12 | 5 pillar cân bằng (30/30/20/10/10); Engine V2 chỉ lấy quy trình; người duyệt Lucas, tên kênh chốt sau | Lucas |
| 2026-10-13 | Sau phân tích 20 video đối thủ: camera đẩy chậm mỗi beat; giọng kể vui vừa phải; giữ phụ đề karaoke; Standard 60–75 s, ~220 wpm; hook mẫu F + 5 kỹ thuật kịch bản; tiêu đề hook vẫn ≤ 5 chữ | Lucas |
| 2026-10-13 | Tempo mặc định trở lại 1.1 (tập ĐBSCL: 1.0 → 1.1, 217 → 238 wpm) | Lucas |
| 2026-10-14 | Nhạc nền Pixabay theo pillar (10 bài, mỗi pillar 1 chính + 1 dự phòng), −28 LUFS | Lucas |
| 2026-10-14 | Hoàng Sa, Trường Sa hiển thị kiểu nhãn chỉ dẫn lề phải, chữ 42 px (ngoại lệ luật 48 px cho nhãn nền bản đồ) | Lucas |
| 2026-10-14 | Thay bằng kiểu ghim bản đồ (chấm đỏ + tên trắng), tên chỉ hiện ở cảnh camera tới; bỏ cột lề phải | Lucas |
| 2026-10-22 | Sau bóc tách 11 Reels Geo Nexus: duyệt #16 `MapFace` (vùng đất có mặt), #17 giọng nhân vật (bảng giọng §6; bỏ Fenrir), #18 khuôn "Một tỉnh, N thế giới", #19 `PromiseTitle` (chữ hứa con số, ngoại lệ luật ≤ 5 chữ) | Lucas |
| 2026-10-21 | Mở đầu mỗi tập: camera bay ngay từ frame 1 vào nơi hook nhắc tới (2 giây đầu không được là bản đồ đứng yên) | Lucas |
| 2026-10-14 | Tên kênh: **Atlas Tí Hon** (tiếng Anh sau: Tiny Atlas); nhận diện ở `06_NHAN-DIEN-KENH.md` | Lucas |
| 2026-10-14 | Nối vòng mềm: bỏ vế bỏ lửng cuối kịch bản, kết bằng câu trọn vẹn; hình vẫn lặp liền (áp dụng lại cho cả 5 tập) | Lucas |
| 2026-10-14 | Tên nước + cờ + viền sáng cho mọi nước được gọi tên / tô màu (`CountryTag`) | Lucas |
| 2026-10-14 | 7 luật kịch bản sau so sánh đối thủ: đáp câu hỏi treo 1–3 chữ, ≥ 1 khoảnh khắc người, 1–2 câu đùa, hai phe, 1 số/câu, twist là nhịp cuối, kho câu thay thế | Lucas |
| 2026-10-13 | Phụ đề tối đa 4 chữ/dòng; từ khoá + con số vàng nhạt, chữ đang đọc vàng đậm + to 10 % | Lucas |
| 2026-10-17 | Đổi nhạc nền 5 pillar sang **Kevin MacLeod (CC BY 4.0, có ghi công)** sau khi tập P4 bị chặn toàn cầu vì Content ID nhạc Pixabay (§6) | Lucas |
| 2026-10-16 | Thêm bước **soát từng khung bản render** (`scripts/review.py`): Luis tự sửa chỗ xấu / chưa đạt, render lại rồi mới giao (`04_QUY-TRINH-SAN-XUAT.md` §6) | Lucas |
| 2026-10-18 | Ranh giới tỉnh: **OCHA/HDX COD-AB v02** (34 tỉnh, CC BY-IGO) trong kit `vn-provinces.tsx`; khi tô màu theo tỉnh, chấm Hoàng Sa / Trường Sa cùng màu Đà Nẵng / Khánh Hoà (§8.9; tập Tây Nguyên, Cổng 2) | Lucas |
| 2026-10-18 | Chuỗi master: hạ `alimiter` **0,72 → 0,66** (đỉnh sau AAC luôn ≤ −1,5 dBTP; SFX ngắn được kéo tới +12 dB làm bản thô chạm 0 dBFS) | Lucas |
