# 04 — QUY TRÌNH SẢN XUẤT · Cổng 4 (Visual) + Cổng 5 (Production) + sau khi đăng

*Mọi bước dùng hệ thống Remotion trong repo (Engine V2 chỉ là tham khảo — Lucas 2026-10-12). Khung tập mới: `Map/_mau-tap/`. Tập mẫu đầy đủ nhất: `Map/p1-brunei-chia-doi/`, `Map/p4-malacca-kra/`. Style: `Style Library/I-toy-atlas/`.*

## 0. Tổng quan một tập

| Cổng | Đầu ra | Lucas duyệt |
|---|---|---|
| 1 Concept | gói Concept (`02_PROMPT-CHU-DE.md`) | ✔ |
| 2 Evidence | sổ nhận định + sổ nguồn (`03_…`) | ✔ |
| 3 Script | `kich-ban-<slug>-FINAL.md` + spec (`03_…`) | ✔ |
| 4 Visual | beat sheet (§2) + bộ prompt ảnh (§3) | ✔ |
| 5 Production | MP4 + bản lặp 2 vòng + gói xuất bản (§6) + QA (§5) | ✔ |

## 1. Giọng đọc (sau Cổng 3)

```bash
mkdir -p "Map/<slug>"          # đặt FINAL + spec vào đây
```

Tạo `voiceover/<slug>.json` **trước** khi prep (prep giữ các trường này):
```json
{
  "name": "<slug>",
  "model": "gemini-3.8-flash-tts",
  "voice": "Orus",
  "style": "<chỉ dẫn giọng mặc định — 01_CHANNEL-BIBLE §6>",
  "tempo": 1.1,
  "gaps": { "sentence": 0.06, "paragraph": 0.12, "scene": 0.25 },
  "lines": []
}
```

```bash
node scripts/episode.mjs prep "Map/<slug>"
```
```bash
npm run voiceover -- voiceover/<slug>.json
```
```bash
node scripts/episode.mjs export "Map/<slug>" --loop --tail=0.7
```
```bash
python -P scripts/words.py <slug> vi
```
- ~1 request TTS / cảnh (Free Tier: 10/ngày/key/model; số key = số dòng trong `gemini_key.txt`). Đổi chữ 1 câu → chỉ tạo lại cảnh đó. Đổi tempo / khoảng nghỉ → **không tốn request**.
- `words.py` nghe lại **file riêng của từng câu** và so chữ đầu / chữ cuối với kịch bản; `export` so tốc độ đọc từng câu. Cả hai in `⚠ check the split` khi một câu bị cắt lệch (một lượt TTS nhiều câu bị cắt lệch chỗ ngắt). Khi có cảnh báo: nghe lại câu đó; nếu lệch thì đổi `take` của các câu sau thành lượt riêng trong `voiceover/<slug>.json` (vd. `t08` → `t08b`) rồi chạy lại `npm run voiceover` (tốn 1–2 request).
- Kết quả: `src/voiceover/<slug>.timing.json` (mốc thời gian từng câu), `<slug>.words.json` (mốc từng chữ cho phụ đề karaoke), `public/voiceover/<slug>/vo.mp3`.

## 2. Beat sheet (Cổng 4)

Một hàng mỗi câu VO. Mỗi beat **một** hành động bản đồ chính; mỗi 1,5–2 s có một sự kiện; khung không bao giờ đứng yên hoàn toàn.

| Câu | Lời (rút gọn) | Mục đích | Camera (nơi / zoom; bay?) | Lãnh thổ & màu | Nhân vật / đạo cụ | Chữ trên màn (≤ 5 chữ, ≤ 2 khối) | SFX | Nguồn |
|---|---|---|---|---|---|---|---|---|
| 01 | Malaysia từng đuổi Singapore… | hook | home: 102.6E 3.0N z36 | MY xanh lá, SG đỏ | Tunku, LKY + cờ; mũi tên đỏ | SINGAPORE | click | — |
| 02 | Vậy vì sao… gấp hơn 7 lần? | câu hỏi | giữ | — | LKY cười | GẤP 7,6 LẦN · GDP / NGƯỜI · 2024 | click | C8 |
| … | | | | | | | | |

Kèm: bảng màu khoá theo phe (cùng phe một màu suốt tập), quy tắc nhãn (chỉ địa danh của beat), danh sách hình học cần (quốc gia Natural Earth / ranh giới lịch sử + nguồn), kiểm tra vùng an toàn, ý tưởng ảnh bìa.

## 3. Ảnh nhân vật & đạo cụ (Cổng 4)

- Viết `Map/<slug>/image-prompts.md` theo mẫu `Map/i-singapore/image-prompts.md`: khối **STYLE** (quân cờ chibi, nền kem phẳng, không chữ, không cờ) + bảng `i-01-…png` → prompt.
- Lucas tạo trong app (Gemini / ChatGPT, **cùng một cuộc chat** để đồng nhất), lưu vào `public/images/<slug>/`.
- Tách nền:
```bash
python -P scripts/cutout.py public/images/<slug> public/images/<slug>/cut 38 <file1.png> <file2.png>
```
- Cờ quốc gia vẽ vector trong kit (`Flag`; thêm nước mới vào `FlagKind`). Người thật: hình tôn trọng.

## 4. Dựng video

1. Sao chép `Map/_mau-tap/Video.tsx.txt` → `Map/<slug>/Video.tsx` (tìm `TODO`); đổi import timing/words, `VIEW` (các điểm camera), `KEYS0` (cú bay theo `at("id")`, phím cuối = nơi mở đầu), `FILLS` (màu lãnh thổ), `CountryTag` cho mọi nước được gọi tên, các lớp nhân vật / sticker / số, `CAPTIONS` (chữ số + `*từ khoá*`), `SFX`. Xem cách làm từng loại cảnh trong các tập đã có.
2. Nước cần zoom sâu (đảo, thành phố): thêm vào `FINE` trong `toy-atlas.tsx` để dùng hình học 10m.
3. Đăng ký trong `src/Root.tsx`: thêm một dòng vào mảng `EPISODES` (id `Map-P<x>-<TenTap>`), và một mục vào `COVERS` trong `Map/covers.tsx`.
4. Kiểm tra:
```bash
npm run lint
```
```bash
npx remotion still <CompositionId> out/check.png --frame=<n> --props='{"safeGuide":true}' --scale=0.35
```

## 5. QA trước khi render cuối

| Hạng mục | Chuẩn |
|---|---|
| Nguồn | mọi số trên màn/lời đọc có trong sổ nhận định ✅; loại số liệu đúng |
| Vùng an toàn | chữ, số, mặt, hình chính trong x 60–940, y 220–1440 (`--safe`) |
| Chữ | mỗi khối ≤ 5 chữ, ≤ 2 khối + phụ đề, ≥ 48 px, Bricolage |
| Phụ đề | 1 dòng, ≤ 4 chữ / 20 ký tự, ~1 s mỗi cụm; các chữ không dính nhau; từ khoá vàng nhạt, chữ đang đọc vàng đậm + to 10 % |
| Chuyển động | bay chỉ khi đổi nơi (≥ 22 frame, không blur/rung); không đoạn nào đứng yên hoàn toàn > 2 s |
| Âm thanh | nhạc ~11 dB dưới giọng; SFX thật; master −14 LUFS / −1,5 dBTP |
| Nối vòng mềm | lời kết bằng câu trọn vẹn; khung cuối = khung đầu (`seamKeys`); xem bản lặp 2 vòng |
| Tên nước | mỗi nước được gọi tên / tô màu có nhãn + cờ (`CountryTag`), viền loé đúng lúc lời đọc nói tên |
| Bản đồ | không tô màu nước ngoài câu chuyện; không nhãn vùng tranh chấp |

## 6. Render + gói xuất bản (Cổng 5)

```bash
npx remotion render <CompositionId> out/<slug>-raw.mp4 --crf=18
```
```bash
ffmpeg -y -i out/<slug>-raw.mp4 -c:v copy -af "loudnorm=I=-14:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.72:level=false" -c:a aac -b:a 256k -movflags +faststart "Map/<slug>/<slug>.mp4"
```
*(2026-10-13: loudnorm một lượt + AAC 192k cho đỉnh +0,3 dBFS; thêm `alimiter` và AAC 256k → đỉnh −2,0 dBTP. Kiểm: `ffmpeg -i <file> -af ebur128=peak=true -f null -`.)*
Bản xem thử lặp 2 vòng (kiểm chỗ nối vòng):
```bash
printf "file '../Map/<slug>/<slug>.mp4'\nfile '../Map/<slug>/<slug>.mp4'\n" > out/concat.txt && ffmpeg -y -f concat -safe 0 -i out/concat.txt -c copy "Map/<slug>/<slug>-loop-preview-x2.mp4"
```
MP4 trong `Map/` không lên git (`.gitignore`).

**Soát khung hình sau render (bắt buộc, Lucas 2026-10-16).** Có bản master rồi, Luis tự soát toàn bộ video **trước khi** báo Lucas; chỗ nào xấu / chưa đạt thì tự sửa, render + master lại, soát lại tới khi sạch:
```bash
python -P scripts/review.py <slug>
```
- Tách khung mỗi 0,5 s thành tờ soát `out/review/<slug>/sheet-NN.png` (6 × 3 ảnh, có giờ + số khung, viền vùng an toàn). Xem **hết mọi tờ**.
- Script tự báo: đoạn đứng yên > 2 s (`freezedetect`) và độ lệch khung cuối ↔ khung đầu (≈ 1–2 % là chỉ dòng phụ đề đầu).
- Soát theo bảng §5, thêm: đè hình / đè chữ; nhãn bị cắt hoặc mờ ở mép; chữ hay đạo cụ lấn ra ngoài vùng an toàn; hai lớp chồng lúc chuyển cảnh; đạo cụ còn sót sang beat sau; nhãn nước thiếu ở beat gọi tên; khung trống lâu khi lời còn đọc.
- Ảnh nghi vấn → render đúng khung đó cỡ lớn (`npx remotion still … --frame=<n> --props='{"safeGuide":true}'`), sửa `Video.tsx`, kiểm lại khung đó, rồi render cả tập.
- Báo Lucas: số lỗi tìm được, đã sửa gì, chỗ nào còn để lại và vì sao. Xoá `out/review/` sau khi xong.

**Ghi công nhạc (bắt buộc, Lucas 2026-10-17):** mô tả YouTube và caption mạng khác của mọi tập có dòng `"Tên bài" Kevin MacLeod (incompetech.com) — Licensed under Creative Commons: By Attribution 4.0 — https://creativecommons.org/licenses/by/4.0/` (tên bài theo `PILLAR_MUSIC`, Bible §6). Thiếu dòng này → Content ID khiếu nại.

**Gói xuất bản** (`Map/<slug>/xuat-ban.md`, khung: `Map/_mau-tap/xuat-ban.md`; tiêu đề, mô tả, hashtag theo công thức ~10 tag, ảnh bìa từ `Map/covers.tsx`, bình luận ghim, caption TikTok/Reels — `06_NHAN-DIEN-KENH.md` §5–§6). Ghi chú cũ bên dưới vẫn đúng trừ số hashtag:
1. **3–7 tiêu đề** (mẫu A–E; tiêu đề chính = câu hỏi hook; có thể thêm cờ 🇻🇳 / 🤯 cho Facebook/YouTube, thử A/B).
2. **Mô tả 5 phần:** (1) đoạn kể chuyện 2–3 câu kết bằng câu hỏi; (2) hashtag chủ đề; (3) giới thiệu kênh 1–2 câu (khi có tên); (4) **danh sách nguồn đầy đủ** (SRC-… + link + ngày truy cập) + "Bản đồ: Natural Earth"; (5) hashtag ngách (#bando #lichsu #diali #kinhte …).
3. **≤ 20 hashtag** (tiếng Việt + vài tag tiếng Anh).
4. **Ảnh bìa:** câu hook ≤ 5 chữ + khung bản đồ mạnh nhất (lấy still từ video).
5. **Bình luận ghim:** câu hỏi gợi tranh luận có ích ("Theo bạn, [X] hay [Y]?" / "Nước nào nên làm tiếp?").

## 7. Lưu & sao lưu

`Map/<slug>/` giữ: FINAL, spec, image-prompts, Video.tsx, vo-timestamps, xuat-ban, so-lieu. Commit + push khi Lucas yêu cầu (`origin` = GitHub riêng).

## 8. Số liệu sau khi đăng (`Map/<slug>/so-lieu.md`)

| Nền tảng | Mốc | Views | TG xem TB | % xem TB | Likes | Comments | Shares | Saves | Follow mới | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|---|
| YouTube | 24 h | | | | | | | | | |
| YouTube | 7 ngày | | | | | | | | | |
| YouTube | 30 ngày | | | | | | | | | |
| Facebook / Instagram / TikTok | … | | | | | | | | | |

Mỗi 10 tập: so sánh theo pillar / engine / thời lượng / mẫu hook bằng **trung vị**; đề xuất thử nghiệm cho Lucas duyệt (không tự đổi Channel Bible).
