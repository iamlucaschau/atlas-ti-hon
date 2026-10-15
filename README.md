# Atlas Tí Hon

Kênh video bản đồ giải thích 9:16 tiếng Việt — *Bản đồ nhỏ, câu chuyện lớn.* Dựng bằng Remotion, phong cách "Toy Atlas" (bản đồ đồ chơi, quân cờ chibi).

## Bắt đầu trên máy mới

1. Node 24, npm; Python 3 (Whisper: `pip install faster-whisper numpy`; tách nền: `pip install pillow`); ffmpeg trên PATH.
2. `npm install`
3. File riêng (không có trong git, chép từ máy cũ): `gemini_key.txt` (key TTS), `public/sfx/**/*.mp3` (SFX + nhạc Pixabay — hoặc tải lại: `node scripts/fetch-sfx.mjs scripts/music-list.json` cho nhạc), `voiceover/.cache/` (bản thu thô, đỡ tốn quota).
4. `npm run dev` → http://localhost:3000

## Làm một tập mới

Xem `Map/_mau-tap/README.md` (5 cổng: Concept → Evidence → Script → Visual → Production) và `AGENTS.md`.

## Tài liệu kênh

`Map/00_he-thong/`: Channel Bible (luật kênh), prompt các cổng, quy trình sản xuất, kho chủ đề, nhận diện kênh (logo, banner, mô tả, hashtag, caption).

## 6 tập đã làm

| Pillar | Tập | ID |
|---|---|---|
| P1 Vì sao bản đồ như thế này | Brunei bị cắt làm đôi · Singapore bị đuổi khỏi Malaysia | `Map-P1-BruneiChiaDoi` · `Map-Singapore` |
| P2 Tiền & bản đồ | Đường sắt cao tốc 67 tỷ đô (v3) | `Map-P2-DuongSatCaoToc` |
| P3 Địa lý giải thích hiện tượng | Miền Tây lún (v2) | `Map-P3-DbsclSutLun` |
| P4 Tuyến đường & hành trình | Malacca – kênh Kra (v2) | `Map-P4-MalaccaKra` |
| P5 Kỳ lạ & kỷ lục | Trung Quốc một múi giờ (v2) | `Map-P5-TrungQuocMuiGio` |
