# Ảnh đạo cụ — "Xứ sông nước lại khát cát" (p2-cat-mien-tay, style I Toy Atlas)

*2026-10-15. Lucas tạo trong app, lưu PNG vào `public/images/p2-cat-mien-tay/` đúng tên file. Luis tách nền bằng `scripts/cutout.py`. Bản đồ, tuyến cao tốc, thanh so sánh, mặt cắt đáy sông, số, nhãn, cờ vẫn là vector.*
*Dùng lại, không cần tạo: `d-04-dam`, `d-05-sand-dredger` (tập ĐBSCL), `p-03-money-bags`, `p-07-scale` (tập đường sắt).*

## Cách tạo

1. Mở **một** cuộc chat mới, dán **STYLE** trước, rồi tạo từng ảnh trong cùng chat ("same toy style").
2. Tỉ lệ **1:1**, nền **kem phẳng một màu**, vật thể ở giữa, thấy toàn bộ. Không chữ, không logo, không cờ.

## STYLE (dán đầu tiên)

> Cute chunky toy in the style of a wooden board-game piece / peg-doll set: rounded chunky shapes, flat vector illustration with soft shading, thick dark outline, bright friendly colours, people have big round heads, short rounded bodies, no legs and simple dot-eye faces. Plain flat cream background, centered, whole object visible, no shadow on the background. No text, no letters, no numbers, no flags, no logos.

## Danh sách

| File | Prompt (sau STYLE) | Câu |
|---|---|---|
| `c-01-dump-truck.png` | A small orange dump truck with its bed tipped up, pouring a stream of yellow sand out the back, toy version, side view facing right. | 04 |
| `c-02-sand-pile.png` | A medium pile of yellow construction sand with a small shovel stuck in it, toy version, three-quarter view. | 02, 04 |
| `c-03-road-embankment.png` | A cutaway cross-section toy diorama of a road being built on soft ground: a wavy layer of soft brown mud at the bottom, a thick trapezoid layer of yellow sand on top of it forming a raised road embankment, and an extra mound of yellow sand piled on top of the embankment. Front view, clean simple layers. | 07–08 |
| `c-04-scientists-boat.png` | A small motorboat on a river with two scientists in simple field clothes and life vests (one man, one woman), one of them lowering a sonar device on a pole into the water, a small laptop on the bench. Generic people, not resembling anyone, respectful. Side view facing right. | 12 |
| `c-05-sea-sand-barge.png` | A sturdy sea-going barge loaded with a big heap of yellow sand, small wheelhouse at the back, small waves at its bow, toy version, side view facing left. | 16 |
| `c-06-sand-washing.png` | A heap of yellow sand being rinsed by a water hose spraying from above, little white salt crystals sparkling and tumbling off the heap, puddle at the base, toy version. | 17 |
| `c-07-piggy-savings.png` | A pink piggy bank tipped over with many gold coins pouring out of it in a fast stream, a small closed blue savings passbook beside it (blank cover, no text), and a single coin hovering above the slot. Playful. | 14 |
| `c-08-viaduct.png` | A short section of a modern elevated expressway viaduct: a flat grey concrete deck with white lane lines on a row of round concrete pillars, standing over green rice paddies with a small water channel, toy version, three-quarter view. No vehicles, no signs. | 18, 20, 23 |
| `c-09-riverbank.png` | A chunk of a tropical riverbank seen from the side: a block of brown soil with grass on top, one leaning coconut palm and a small wooden jetty, the bank edge slightly cracked. No people, no houses. Toy version. | 21–22 |

Ưu tiên: c-04, c-03, c-08, c-09 (nhịp chính), rồi c-01, c-02, c-07, c-05, c-06. Nếu thiếu c-02, c-06, Luis vẽ đống cát / tia nước bằng vector.

*Lưu ý: c-04 là nhà khoa học **chung chung**, không vẽ giống người thật nào. Không có người ở cảnh sạt lở (c-09).*

## Tách nền (Luis chạy sau khi có ảnh)

```bash
python -P scripts/cutout.py public/images/p2-cat-mien-tay public/images/p2-cat-mien-tay/cut 38 c-01-dump-truck.png c-02-sand-pile.png c-03-road-embankment.png c-04-scientists-boat.png c-05-sea-sand-barge.png c-06-sand-washing.png c-07-piggy-savings.png c-08-viaduct.png c-09-riverbank.png
```
