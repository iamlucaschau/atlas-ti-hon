# Ảnh đạo cụ — "Con kênh lấy nước sông Hậu" (p2-funan-techo, style I Toy Atlas)

*2026-10-16. Lucas tạo trong app, lưu PNG vào `public/images/p2-funan-techo/` (thư mục đã tạo sẵn) đúng tên file. Luis tách nền bằng `scripts/cutout.py`. Bản đồ, tuyến kênh, sông, mặt cắt kênh, thẻ số, nhãn, cờ vẫn là vector.*
*Dùng lại, không cần tạo: `t-02-container-ship`, `t-07-excavator-canal` (tập Malacca), `p-03-money-bags` (tập đường sắt), `d-02-rice` (tập ĐBSCL).*
*Không vẽ chân dung lãnh đạo hay người thật nào (Cổng 1). Không cờ, không chữ.*

## Cách tạo

1. Mở **một** cuộc chat mới, dán **STYLE** trước, rồi tạo từng ảnh trong cùng chat ("same toy style").
2. Tỉ lệ **1:1**, nền **kem phẳng một màu**, vật thể ở giữa, thấy toàn bộ.

## STYLE (dán đầu tiên)

```text
Cute chunky toy in the style of a wooden board-game piece / peg-doll set: rounded chunky shapes, flat vector illustration with soft shading, thick dark outline, bright friendly colours. Plain flat cream background, centered, whole object visible, no shadow on the background. No text, no letters, no numbers, no flags, no logos, no people unless asked.
```

## Danh sách

| File | Prompt (sau STYLE) | Câu |
|---|---|---|
| `f-01-container-barge.png` | A long flat river barge carrying two rows of small stacked shipping containers (red, blue, yellow, green), a tiny wheelhouse at the back, small ripples at the bow, toy version, side view facing right. No text or logos on the containers. | 05, 06, 19 |
| `f-02-groundbreaking.png` | A groundbreaking ceremony set with no people: a small wooden podium with a microphone, a shiny golden shovel with a big red ribbon bow stuck in a fresh mound of brown soil beside it, toy version, three-quarter view. No text, no flags, no emblems. | 08 |
| `f-03-documents-magnifier.png` | A neat stack of blank documents and folders with a large magnifying glass leaning on top and a small blue water drop beside it, toy version. Blank pages, no writing. | 13 |
| `f-04-progress-gauge.png` | A round dial gauge like a speedometer with a coloured arc from grey to green, the needle resting at the very start of the arc, toy version, front view. No numbers, no letters on the dial. | 16 |
| `f-05-elephant-alley.png` | A cute chunky grey elephant trying to squeeze sideways into a very narrow alley between two small houses, its body stuck halfway, surprised friendly face, toy version, three-quarter view. Playful, no text. | 21 |

Ưu tiên: f-01 (xuất hiện nhiều nhịp), f-05 (câu đùa), f-02, rồi f-03, f-04. Nếu thiếu f-04, Luis vẽ đồng hồ tiến độ bằng vector.

## Tách nền (Luis chạy sau khi có ảnh)

```bash
python -P scripts/cutout.py public/images/p2-funan-techo public/images/p2-funan-techo/cut 38 f-01-container-barge.png f-02-groundbreaking.png+holes f-03-documents-magnifier.png+holes f-04-progress-gauge.png f-05-elephant-alley.png+holes
```
