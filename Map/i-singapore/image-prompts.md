# Ảnh nhân vật & đạo cụ cho I "Toy Atlas" — video Singapore

*Free Tier Gemini không có quota ảnh (`limit: 0`), nên Lucas tạo ảnh trong app (Gemini / ChatGPT) rồi bỏ vào `public/images/i-singapore/` đúng tên file. Claude tách nền (`python -P scripts/cutout.py public/images/i-singapore public/images/i-singapore/cut 38 <file>`) và thay các quân cờ vector tạm trong video. Bản đồ, cờ, số, nhãn vẫn là vector.*

## Cách tạo

1. Mở **một** cuộc chat mới, dán **STYLE** trước. Tạo ảnh 1, rồi các ảnh sau **trong cùng chat**, nói "same toy style" để giữ đồng nhất.
2. Tỉ lệ **1:1**, nền **kem phẳng một màu**, nhân vật đứng thẳng, toàn thân, nhìn thẳng. Không chữ, không logo, không cờ (cờ do Claude vẽ).
3. Lưu PNG đúng tên dưới đây.

## STYLE (dán đầu tiên)

> Cute chibi toy figure in the style of a wooden peg doll / board-game pawn: big round head, short rounded cylinder body, no legs, small simple arms, flat vector illustration with soft shading, thick dark outline, friendly simple face (dot eyes). Historically accurate costume and hairstyle. Plain flat cream background, centered, full figure, no shadow on the background. No text, no letters, no flags, no logos.

## Danh sách

| File | Prompt (sau STYLE) |
|---|---|
| `i-01-lky-calm.png` | Lee Kuan Yew in the 1960s: short side-parted black hair, white short-sleeved open-collar shirt, white trousers; calm neutral face. |
| `i-02-lky-sad.png` | Same Lee Kuan Yew figure, sad face with tears rolling down, head slightly lowered. |
| `i-03-lky-happy.png` | Same Lee Kuan Yew figure, proud gentle smile. |
| `i-04-tunku.png` | Tunku Abdul Rahman in the 1960s: black songkok cap, round glasses, dark Malay formal jacket; calm face. |
| `i-05-raffles.png` | Sir Stamford Raffles around 1819: dark curly hair, high white collar and cravat, dark tailcoat with gold buttons; confident smile. |
| `i-06-sultan.png` | A Malay sultan of Johor around 1819: tengkolok headdress, embroidered baju with sampin, keris at the waist; dignified face. |
| `i-07-ship.png` | A small 19th-century merchant sailing ship, side view, toy-like. |
| `i-08-coin-chest.png` | An open wooden treasure chest full of silver Spanish dollar coins. |
| `i-09-tv.png` | A 1960s wooden television set with a rounded screen, front view, screen empty light grey. |
| `i-10-port-crane.png` | A modern harbour container crane with a stack of colourful shipping containers, toy-like. |

Ưu tiên 6 ảnh nhân vật trước (i-01 → i-06); đạo cụ i-07 → i-10 có thể giữ bản vector nếu chưa có.

*Lưu ý: nhân vật là người thật trong lịch sử — giữ hình ảnh tôn trọng, không biếm hoạ xúc phạm.*
