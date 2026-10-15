# Ảnh nhân vật & đạo cụ — Đường sắt tốc độ cao Bắc–Nam (style I Toy Atlas)

*Lucas tạo trong app (Gemini / ChatGPT), lưu PNG vào `public/images/p2-duong-sat-cao-toc/` đúng tên file. Claude tách nền (`python -P scripts/cutout.py public/images/p2-duong-sat-cao-toc public/images/p2-duong-sat-cao-toc/cut 38 <file>`). Bản đồ, tuyến, cờ, số, nhãn, cột thời gian vẫn là vector.*

## Cách tạo

1. Mở **một** cuộc chat mới, dán **STYLE** trước. Tạo ảnh 1, rồi các ảnh sau **trong cùng chat**, nói "same toy style" để giữ đồng nhất.
2. Tỉ lệ **1:1**, nền **kem phẳng một màu**, vật thể ở giữa, nhìn rõ toàn bộ. Không chữ, không logo, không cờ (cờ do Claude vẽ).
3. Lưu PNG đúng tên dưới đây.

## STYLE (dán đầu tiên)

> Cute chibi toy in the style of a wooden board-game piece: rounded chunky shapes, flat vector illustration with soft shading, thick dark outline, friendly and simple. Plain flat cream background, centered, whole object visible, no shadow on the background. No text, no letters, no numbers, no flags, no logos.

## Danh sách

| File | Prompt (sau STYLE) | Dùng ở câu |
|---|---|---|
| `p-01-hsr-train.png` | A sleek modern high-speed bullet train, short toy version with one rounded nose car and one carriage, three-quarter side view facing right, white body with a gold stripe and dark windows. | 06, 09, 16 |
| `p-02-old-train.png` | An old diesel passenger train, toy version: boxy blue-and-yellow locomotive pulling one boxy blue carriage, side view facing right, slightly worn. | 15 |
| `p-03-money-bags.png` | Three fat cloth money bags tied at the top, each with a dollar sign, stacked in a small pile, with a few gold coins at the base. | 01, 08, 10 |
| `p-04-excavator.png` | A small yellow excavator next to a short straight piece of railway track (rails on wooden sleepers), toy-like. | 05 |
| `p-05-assembly.png` | A small semicircle of identical simple pawn figures in suits, seen from the front, all raising one hand, generic faces with dot eyes (not real people). | 03–04 |
| `p-06-clock.png` | A round red twin-bell alarm clock, front view. | 15 |
| `p-07-scale.png` | An old-fashioned brass balance scale with two empty round pans, front view, perfectly level. | 02, 12 |
| `p-08-worker.png` | A railway maintenance worker pawn: orange safety vest, white hard hat, holding a big wrench, friendly smile (generic person). | 14 |

### Bổ sung cho v2 (2026-10-13) — cùng cuộc chat, "same toy style"

| File | Prompt (sau STYLE) | Dùng ở câu (v2) |
|---|---|---|
| `p-09-pho.png` | A steaming bowl of Vietnamese pho noodle soup, toy version: white bowl with blue rim, noodles, beef slices, herbs, a pair of chopsticks resting on top, three-quarter view. | 06 |
| `p-10-com-tam.png` | A plate of Vietnamese broken rice (com tam), toy version: round white plate, broken rice, a grilled pork chop, a fried egg, cucumber slices, a small bowl of fish sauce, three-quarter view. | 06 |
| `p-11-steam-train.png` | An old 1930s steam locomotive with a black boiler, tall chimney with a puff of smoke and red wheels, pulling one small wooden carriage, side view facing right, toy-like, vintage. | 20 |

*Chưa có ảnh thì Luis dùng hình vector tạm; Lucas thêm ảnh lúc nào Luis thay lúc đó.*

Ưu tiên: p-01, p-03, p-07 (xuất hiện nhiều nhất), rồi p-02, p-05. p-04, p-06, p-08 có thể thay bằng vector nếu chưa có.

*Cân (p-07) tạo với hai đĩa trống — Claude đặt túi tiền và tàu lên đĩa, và cho cân nghiêng bằng code.*
