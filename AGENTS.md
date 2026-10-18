# AGENTS.md — Atlas Tí Hon (kênh video bản đồ giải thích)

Hướng dẫn cho AI (Claude Code, Codex, …) làm việc trong dự án này. Đọc hết trước khi làm.

**Kênh:** Atlas Tí Hon — "Bản đồ nhỏ, câu chuyện lớn." Video dọc 9:16 (Shorts / Reels / TikTok), tiếng Việt,
60–75 s, mỗi tập trả lời một câu hỏi "vì sao" bằng một tấm bản đồ đồ chơi (style I "Toy Atlas").
Video là component React render từng khung bằng [Remotion](https://www.remotion.dev) **4.0.532**.

Tách ra từ repo `VIDEO AI` ngày 2026-10-15 (5 pillar đã thử xong, 6 tập mẫu). Nguồn sự thật duy nhất của kênh:
**`Map/00_he-thong/01_CHANNEL-BIBLE.md`**. Nếu file này và Bible khác nhau về luật kênh, Bible thắng.

## Làm việc với Lucas

- Lucas gọi AI là **"Luis"** và viết **tiếng Việt** → trả lời tiếng Việt, xưng "Luis", gọi "Lucas".
- Quy trình **5 cổng**; hết mỗi cổng **dừng lại chờ "Duyệt Cổng N"**. Việc nhỏ, hiển nhiên (sửa lỗi đè hình, chỉnh vị trí, lỗi lint) thì tự làm, không hỏi; chỉ hỏi ở cổng hoặc khi thay đổi ảnh hưởng toàn kênh.
- Khi Lucas hỏi "bạn hiểu ý mình chứ" → tóm lại cách hiểu + các lựa chọn, **chưa làm** cho tới khi Lucas nói làm.
- **Ảnh nhân vật / đạo cụ do Lucas tạo** trong app (Gemini / ChatGPT) từ bộ prompt Luis viết (Free Tier Gemini API không có quota ảnh). Luis tách nền, vẽ bản đồ, cờ, số, chữ bằng vector.
- **Hiển thị trong chat (Lucas 2026-10-19):** gợi ý chủ đề (Cổng 1), kịch bản (Cổng 3) và prompt ảnh (Cổng 4) phải **in thẳng trong câu trả lời** để Lucas đọc ngay, không chỉ ghi vào file. Khi gửi prompt ảnh, **tạo sẵn thư mục `public/images/<slug>/`** để Lucas dán ảnh vào.
- **Commit / push chỉ khi Lucas bảo.** Trước khi commit: `git status --short` là **một bước riêng**, đọc kết quả; thấy thư mục mới, video, mp3, key hay tài liệu bên thứ ba → **dừng lại hỏi**. Không bao giờ push đè (`--force`) khi chưa được Lucas đồng ý. (Sự cố 2026-10-15: video đối thủ lỡ bị push.)
- Báo cáo thật: lỗi, cảnh báo, chỗ chưa chắc đều nói rõ; số liệu nào chưa kiểm chứng thì ghi ⚠️.

## Lệnh

| Việc | Lệnh |
| --- | --- |
| Mở Studio (xem trước) | `npm run dev` → http://localhost:3000 (`.claude/launch.json`: `remotion-studio`) |
| Kiểm tra code | `npm run lint` (sau mỗi thay đổi) |
| Bản nháp + contact sheet | `npm run draft -- <slug>` → `out/<slug>-draft.mp4` (nửa cỡ, có vùng an toàn) + `out/sheets/<slug>-lines-N.png` (một ô mỗi câu đọc) |
| Soi thêm khung | `npm run sheet -- <slug> --at 0.9` · `--from 30 --to 32 --every 0.2` · `<giây> <giây>` |
| Ảnh kiểm tra 1 khung | `npx remotion still <id> out/check.png --frame=<n> --props='{"safeGuide":true}' --scale=0.35` |
| Render tập | `npm run final -- <slug>` → render, master, bản lặp 2 vòng vào `Map/<slug>/`, đo LUFS / đỉnh / chỗ nối vòng (thoát mã 1 nếu trượt) |
| Soát khung hình sau render | `python -P scripts/review.py <slug>` → xem hết `out/review/<slug>/sheet-*.png`, tự sửa rồi render lại (`04_QUY-TRINH` §6) |
| Ảnh bìa | `npx remotion still Cover-<slug> out/cover.png` → JPG < 2 MB vào `Map/<slug>/cover.jpg` |
| Giọng đọc | `node scripts/episode.mjs prep "Map/<slug>"` → `npm run voiceover -- voiceover/<slug>.json` → `node scripts/episode.mjs export "Map/<slug>" --loop --tail=0.7` → `python -P scripts/words.py <slug> vi` |
| Kiểm tra key TTS | `npm run tts:check` (không tốn quota) |
| Tách nền ảnh | `python -P scripts/cutout.py public/images/<slug> public/images/<slug>/cut 38 <file.png>` (thêm `+holes` cho vật có lỗ) |

⚠️ Remotion 4.0.532: danh sách khung kiểu `--frames=20,96` có thể lỗi `EINVAL … inline-audio-mixing` → dùng `still` từng khung hoặc dải liên tục.

## Cấu trúc

```
Map/00_he-thong/      01 Channel Bible · 02 prompt Cổng 1 · 03 prompt Cổng 2–3 · 04 quy trình Cổng 4–5 · 05 kho chủ đề · 06 nhận diện kênh
Map/_mau-tap/         khung một tập mới (README + file mẫu + Video.tsx.txt)
Map/<slug>/           một tập: cong-2_so-nguon, kich-ban-…-FINAL, spec, beat-sheet, image-prompts, Video.tsx, vo-timestamps, xuat-ban, cover.jpg (+ mp4, vo.mp3 chỉ trên máy)
Map/covers.tsx        ảnh bìa của mọi tập (khung + hook 2 tầng + vòng đỏ)
Map/cong-1_*.md       hồ sơ Cổng 1 · Map/phan-tich-doi-thu/ phân tích 20 video đối thủ (BAO-CAO, BOC-TACH, SO-SANH)
Style Library/I-toy-atlas/toy-atlas.tsx   kit: Atlas (skip, layer), camAt/seamKeys, CountryTag, Flag, VnIslands, CoastBand, RegionFill, DataCard, BigGold, YearRibbon, PegImg, ImgSticker, Stamp, Question, AtlasSub…
Style Library/I-toy-atlas/vn-provinces.tsx  Việt Nam theo tỉnh: VN2025 (34 tỉnh, OCHA/HDX) · VN2024 (63 tỉnh, Natural Earth), ProvinceMap (tô, loang, viền loé, viền biển), ProvinceTag, CityPin, provinceBorder + BorderLine (ranh giới chung hai tỉnh) — dùng qua `<Atlas skip={["Vietnam"]} layer={…} />`
Style Library/kit-common.ts, subs.tsx     font Bricolage Grotesque, easing, phụ đề karaoke
src/Root.tsx          đăng ký mọi tập (thư mục Episodes) và ảnh bìa (Covers)
src/series/pvr/       episode.ts (thời lượng), sfx.tsx (Sfx, MusicBed, PILLAR_MUSIC), safe.tsx (SafeGuide), theme.ts (1080×1920, SAFE)
src/voiceover/        manifest + timing + words của từng tập (sinh tự động, không sửa tay)
voiceover/<slug>.json kịch bản TTS của từng tập · voiceover/.cache/ bản thu thô (giữ lại để khỏi tốn quota)
public/images/<slug>/ ảnh Lucas tạo (+ cut/ đã tách nền) · public/voiceover/<slug>/ giọng đọc · public/sfx/ SFX + nhạc Pixabay (catalog.json)
scripts/              tts.mjs, episode.mjs, words.py, cutout.py, fetch-sfx.mjs, music-list.json
```

ID composition: `Map-Singapore`, `Map-P1-BruneiChiaDoi`, `Map-P2-DuongSatCaoToc`, `Map-P3-DbsclSutLun`, `Map-P4-MalaccaKra`, `Map-P5-TrungQuocMuiGio`, `Map-P1-TayNguyenCoBien`, `Map-P2-CatMienTay`, `Map-P2-FunanTecho`, `Map-P3-BachMa`, `Cover-<slug>`.

## Luật Remotion (không được phá)

1. Mọi chuyển động lấy từ `useCurrentFrame()` qua `interpolate`/`spring`/`Easing`; không CSS transition/animation, không `setTimeout`, không `Math.random()` (dùng `random("seed")`).
2. Thời gian viết theo giây × fps; `from`/`durationInFrames` phải là số nguyên. Mọi mốc trong tập lấy từ `at("NN", tỉ lệ)` của giọng đọc — đổi giọng là cả video tự canh lại.
3. Luôn clamp. Dùng thuộc tính CSS `scale`/`translate`/`rotate`, không chuỗi `transform`.
4. Ảnh/âm thanh trong `public/` qua `staticFile()`; `<Img>`, `<Audio>` của Remotion. Props của composition phải là JSON (không truyền component qua `defaultProps`).

## Luật kênh (tóm tắt — chi tiết ở Bible)

- **Vùng an toàn 9:16:** mọi chữ, số, mặt người, hình chính trong **x 60–940, y 220–1440**; kiểm bằng `--props='{"safeGuide":true}'`.
- **Camera:** chỉ bay khi đổi nơi (≥ 22 frame, ease in-out, không rung, không blur) + đẩy chậm ≤ ~5 % / 3 s trong mỗi beat; không zoom giật, không rung máy. Khung không đứng yên > 2 s.
- **Chữ:** mỗi khối ≤ 5 chữ, ≤ 2 khối cùng lúc ngoài phụ đề, ≥ 48 px (nhãn Hoàng Sa / Trường Sa 42 px), Bricolage Grotesque 700–800. Phụ đề karaoke 1 dòng ≤ 4 chữ / 20 ký tự.
- **7 luật kịch bản** (Bible §3 mục 6–11, `Map/phan-tich-doi-thu/SO-SANH-KICH-BAN.md`): câu hỏi treo đáp ngay 1–3 chữ · ≥ 1 khoảnh khắc người (nhân vật thật + việc cụ thể, có nguồn) · 1–2 câu đùa sau con số nặng · chủ đề tranh luận có 2 phe · 1 con số mới mỗi câu · twist là nhịp nội dung cuối · không lặp câu cửa miệng ("oái oăm", "thử…", "Vì sao?") trong 3 tập liền.
- **Nối vòng mềm:** lời kết bằng câu trọn vẹn (không vế bỏ lửng); hình vẫn lặp liền: `seamKeys` + `export --loop --tail=0.7`; khung cuối = khung đầu.
- **Tên nước:** mọi nước được gọi tên hoặc tô màu có `CountryTag` (tên + cờ + viền loé khi đọc tên); nước nền không nhãn.
- **Hoàng Sa, Trường Sa:** khung có cả bờ biển Việt Nam / Biển Đông → chấm đảo màu Việt Nam (`VnIslands`); tên kiểu ghim chỉ hiện khi camera tới gần. Lãnh thổ tranh chấp: dừng ở Cổng 2 cho Lucas chọn cách vẽ.
- **Số liệu:** không nguồn = không dùng; ghi loại số liệu (GDP/người ≠ thu nhập); video đối thủ, transcript không phải nguồn.
- **Âm thanh:** chỉ SFX thật (Pixabay, `public/sfx/catalog.json`, `<Sfx>`/`SfxCues`, mức −15 LUFS), tối đa 1 SFX mỗi beat; không SFX tổng hợp/cartoon. Nhạc nền theo pillar `MusicBed` (`PILLAR_MUSIC`, −28 LUFS) — **Kevin MacLeod CC BY 4.0, ghi công bắt buộc trong mô tả** (2026-10-17; **không** dùng nhạc Pixabay: đều có Content ID, tập P4 từng bị chặn). Master: `loudnorm=I=-14:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.66:level=false`, AAC 256k.

## Giọng đọc (Gemini TTS)

- `scripts/tts.mjs`, model `gemini-3.8-flash-tts`, giọng **Orus**, tempo **1.1**, khoảng nghỉ {0,06 · 0,12 · 0,25} s, `batchBy: "take"`.
- Key trong `gemini_key.txt` (không commit, **không in, không log**). Free Tier: **10 request/ngày/key/model**, 3/phút; script tự xoay key và chờ. Một tập ≈ 7–8 request.
- Bản thu thô cache theo nội dung: đổi tempo / khoảng nghỉ / bỏ câu cuối của một lượt → **không tốn request**. Khoảng nghỉ chỉnh tay trong `voiceover/<slug>.json` được `prep` giữ lại nếu chữ câu không đổi.
- `words.py` kiểm tra cắt câu; cảnh báo kiểu "heard … kg / USD / 5h" thường là phần mềm nghe nhầm — nghe lại trước khi đọc lại.

## Kiểm tra trước khi giao

1. `npm run lint` đạt.
2. Vòng duyệt hình (skill `review-loop`): `npm run draft -- <slug>`, xem **mọi** contact sheet, sửa đè hình / tràn vùng an toàn, lặp tới khi một lượt sạch.
3. `npm run final -- <slug>`: mọi dòng ✓ (≈ −14 LUFS, đỉnh ≤ −1,5 dB, khung cuối ≈ khung đầu).
4. **Soát từng khung bản render** (`python -P scripts/review.py <slug>`, xem hết mọi tờ): chỗ nào xấu / chưa đạt thì **tự sửa**, render + master lại, soát lại tới khi sạch; báo Lucas đã sửa gì (Lucas 2026-10-16).
5. Nhờ Lucas nghe bản `-loop-preview-x2.mp4` (Luis không nghe được). Mô tả có dòng ghi công nhạc Kevin MacLeod (Bible §6).
6. Xoá ảnh/khung thử trong `out/` (cả `out/review/`, `out/sheets/`).

## Bản quyền & bảo mật

- Không chép nguyên văn / dịch trọn lời thoại video của kênh khác; chỉ bóc tách cấu trúc bằng lời của mình.
- Không commit: key, nhạc/SFX Pixabay (chỉ dùng trong video, không phát tán file), video/transcript đối thủ (`Map/doi-thu/`, `Map/phan-tich-doi-thu/_work/`, `Test/`), video render (`Map/**/*.mp4`).
- Remotion miễn phí cho cá nhân và công ty ≤ 3 người.
