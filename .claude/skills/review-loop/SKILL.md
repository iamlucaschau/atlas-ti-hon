---
name: review-loop
description: Vòng tự duyệt hình cho một tập Atlas Tí Hon — render nháp, cắt contact sheet theo từng câu lời đọc, soi theo checklist của kênh (vùng an toàn 9:16, chữ, phụ đề, tên nước, camera, nối vòng), sửa, lặp lại; rồi render cuối và đọc số đo âm thanh. Dùng sau mọi thay đổi về hình hoặc nhịp của một tập (Cổng 5), và trước khi báo Lucas là tập đã xong.
---

# Vòng duyệt hình

Luis không xem được video, nhưng xem được khung hình. **Không bao giờ báo một tập là xong khi chưa mở contact sheet của bản render hiện tại.** Ý tưởng mượn từ [claude-motion](https://github.com/whaleyxbt/claude-motion) (`review-loop`), chỉnh cho video dọc 9:16 có lời đọc của kênh.

## Vòng lặp

0. **Kiểm địa lý (tự chạy trước mỗi `draft` / `final`):** mọi nhãn, mặt (`MapFace`), đạo cụ gắn vào bản đồ phải khai trong `export const PLACES` của `Video.tsx` (`{ ll: [lon, lat], in: "<tên tỉnh 2024>" }`, `year: 2025` nếu theo tỉnh mới, `in: "sea"` nếu ngoài biển). `node scripts/geo-check.mjs <slug>` báo ✗ khi một điểm nằm ngoài tỉnh đã khai, và lệnh render dừng lại. Đặt toạ độ bằng máy kiểm, **không ước lượng** (Lucas 2026-10-22: bản v1 tập TP.HCM để nhãn "SÀI GÒN" trên Bình Dương, "BÌNH DƯƠNG" trên Bình Phước).
1. `npm run draft -- <slug>` → render nửa kích thước có lớp vùng an toàn đỏ (`safeGuide`) vào `out/<slug>-draft.mp4`, rồi tự cắt contact sheet: ô đầu là frame 0, mỗi ô sau là **một câu lời đọc** ở giữa câu (nhãn `<id câu> - <giây>`), ô cuối là khung cuối.
2. Mở **từng** `out/sheets/<slug>-lines-N.png` và đi qua checklist bên dưới. Ô tile rộng 300 px ≈ cỡ video trong feed điện thoại: chữ nào khó đọc ở đây là khó đọc trên điện thoại.
3. Soi kỹ chỗ đáng ngờ:
   - `npm run sheet -- <slug> --at 0.9` — cuối mỗi câu, sau khi sticker / thẻ số đã hiện xong.
   - `npm run sheet -- <slug> --from 30 --to 32 --every 0.2` — tua một cú bay camera hoặc lúc hai thứ cùng chiếm chỗ.
   - `npm run sheet -- <slug> 12.3 14.8` — đúng những giây cần xem.
   - Một khung độ phân giải thật: `npx remotion still <id> out/check.png --frame=<n> --props='{"safeGuide":true}' --scale=0.35`.
4. Sửa, rồi quay lại bước 1. Dừng khi một lượt đầy đủ không thấy lỗi.
5. Cuối: `npm run final -- <slug>` (render → master → đo; chỉ video chính). Mọi dòng phải là ✓; lệnh thoát mã 1 khi có ✗.

Việc nhỏ, hiển nhiên (đè hình, lệch vị trí, tràn vùng an toàn) thì tự sửa, không hỏi. Thay đổi đụng tới kịch bản, số liệu, cách vẽ lãnh thổ hay luật kênh thì dừng lại hỏi Lucas.

## Checklist

**Bố cục**
- Mỗi khung một điểm nhìn chính; hai thứ tranh nhau thì một thứ phải chờ.
- Không có gì đè lên nhau ngoài ý muốn, nhất là lúc chuyển cảnh (thứ đang ra và thứ đang vào cùng một chỗ), thẻ số che nhãn địa danh, sticker che phụ đề.
- Chữ, số, mặt người, hình chính nằm ngoài vùng đỏ (x 60–940, y 220–1440).
- Frame 0 là một hình thật, có hook (không đen, không trống).

**Chữ & phụ đề**
- Không chữ nào bị cắt bởi khung, mặt nạ hay mép thẻ.
- Mỗi khối ≤ 5 chữ, ≤ 2 khối cùng lúc ngoài phụ đề, ≥ 48 px (nhãn Hoàng Sa / Trường Sa 42 px).
- Phụ đề 1 dòng, ≤ 4 chữ / 20 ký tự; từ khoá vàng nhạt, chữ đang đọc vàng đậm; các chữ không dính nhau.
- Chữ không di chuyển trong lúc người xem cần đọc nó.

**Bản đồ & tên nước**
- Nước nào được gọi tên hoặc tô màu đều có `CountryTag` (tên + cờ), viền loé đúng câu đọc tên nước đó.
- Khung có bờ biển Việt Nam / Biển Đông thì có chấm đảo Hoàng Sa, Trường Sa (`VnIslands`).
- Không tô màu nước ngoài câu chuyện; không nhãn vùng tranh chấp ngoài cách Lucas đã chọn ở Cổng 2.
- Thẻ số đúng con số trong sổ nhận định (Cổng 2), đúng đơn vị.
- **Nhãn, mặt, đạo cụ nằm đúng lãnh thổ** (geo check ✓ **và** nhìn lại trên sheet: nhãn nằm giữa vùng, không trên ranh giới, không ngoài vùng).
- **Mỗi vùng / tỉnh được lời đọc nhắc tới đều có tên trên hình** lúc được nhắc; khi nhiều vùng gộp lại, vẫn biết vùng nào là vùng nào (nhãn dưới mặt, thẻ tên).
- **Câu nhân vật nói** (giọng khác người dẫn) có dấu hiệu ai đang nói (thẻ tên trên phụ đề / bóng thoại).
- **Chữ ký kênh** (từ tập Mekong, Bible §5): có trên mọi khung, không đè bảng / nhân vật / nhãn / phụ đề; đè thì đổi `spots`.
- **Mật độ khung** (Bible §5, Lucas 2026-10-23): ≤ 4 đạo cụ / biểu tượng gắn bản đồ cùng lúc; không nhãn xoay nghiêng đè lãnh thổ khác; bảng / panel che bản đồ không quá 2 câu liền nhau.

**Nhịp & camera**
- Hình khớp lời: ô của câu nào thì hình đang nói về đúng thứ câu đó nói.
- Camera chỉ bay khi đổi nơi; tua cú bay (`--every 0.2`): mượt, không giật, không rung, không blur.
- Không ô nào trông giống hệt ô trước nó quá 2 s (khung không đứng yên).

**Nối vòng**
- Ô "last frame" giống ô "frame 0" (`seamKeys`); `npm run final` đo SSIM phần trên dải phụ đề ≥ 0,90 (nối đúng ≈ 0,96; lệch nửa giây đã ≈ 0,78).

**Âm thanh (số đo của `npm run final`)**
- Loudness −14 ±1 LUFS, true peak ≤ −1,5 dBFS.
- Luis không nghe được: SFX lệch nhịp, nhạc lấn giọng, chỗ nối vòng bị khựng thì **nhờ Lucas nghe video chính `Map/<slug>/<slug>.mp4`** (không còn tạo bản lặp 2 vòng, Lucas 2026-10-20).

## Báo cáo

Khi xong, nói rõ: đã xem những sheet nào, thấy gì, đã sửa gì và sheet nào chứng minh chỗ đã sửa (kèm số câu / giây), số đo của `npm run final`, và những gì Luis không kiểm được (nghe). Không nói "đã sửa" khi chưa render lại và xem lại.
