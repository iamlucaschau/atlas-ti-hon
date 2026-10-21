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

## 14 tập đã làm

| Pillar | Tập | ID |
|---|---|---|
| P1 Vì sao bản đồ như thế này | Brunei bị cắt làm đôi · Singapore bị đuổi khỏi Malaysia · Tây Nguyên bỗng có biển | `Map-P1-BruneiChiaDoi` · `Map-Singapore` · `Map-P1-TayNguyenCoBien` |
| P2 Tiền & bản đồ | Đường sắt cao tốc 67 tỷ đô (v3) · Xứ sông nước lại khát cát · Con kênh lấy nước sông Hậu (Funan Techo, v3) · Cuộc giành khách: sân bay Long Thành · Điện hạt nhân: canh bạc hay lời giải? | `Map-P2-DuongSatCaoToc` · `Map-P2-CatMienTay` · `Map-P2-FunanTecho` · `Map-P2-LongThanh` · `Map-P2-DienHatNhan` |
| P3 Địa lý giải thích hiện tượng | Miền Tây lún (v2) · Bức tường Bạch Mã | `Map-P3-DbsclSutLun` · `Map-P3-BachMa` |
| P4 Tuyến đường & hành trình | Malacca – kênh Kra (v2) · Bay sang Mỹ: vì sao đường ngắn nhất vòng lên gần Alaska | `Map-P4-MalaccaKra` · `Map-P4-DuongBayCong` |
| P5 Kỳ lạ & kỷ lục | Trung Quốc một múi giờ (v2) · Chỗ hẹp nhất Việt Nam | `Map-P5-TrungQuocMuiGio` · `Map-P5-ChoHepNhat` |
