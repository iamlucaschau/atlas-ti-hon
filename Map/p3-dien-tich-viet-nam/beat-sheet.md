# Cổng 4 · Beat sheet — "Việt Nam to hơn bạn nghĩ (do bản đồ cả đấy)"

*2026-10-27. Giọng đọc: **74,93 s**, 211 wpm, tempo 1.1 (`vo-timestamps.md`; đã gồm 0,7 s nhạc cuối). **Lucas duyệt Cổng 4** (đã thêm ảnh, 2026-10-27).*

**Luật áp dụng:**
- Style I + luật kênh. **Từ frame 1** camera bay vào nơi hook nhắc tới (nước Đức). Camera đẩy chậm trong mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame).
- **Khung cuối = khung đầu, không trống:** châu Âu và Việt Nam cùng khung, bản đồ Mercator có lưới vĩ tuyến.
- ≤ 4 đạo cụ cùng lúc; mỗi khối chữ ≤ 5 chữ, ≤ 2 khối cùng lúc; `Signature` đổi chỗ ở mỗi cú bay.
- **Nước được gọi tên / tô màu có `CountryTag`:** Đức, Ý, Anh, Đan Mạch, Phần Lan. Greenland (lãnh thổ tự trị của Đan Mạch) và châu Phi dùng **nhãn chữ** (`MapLabel`), không cờ.
- **`VnIslands`** ở mọi khung thấy bờ biển Việt Nam / Biển Đông. **Phương án A** (Cổng 2 §3.5): khi kéo lên châu Âu chỉ kéo **bóng viền đất liền**; Việt Nam thật cùng Hoàng Sa, Trường Sa ở nguyên chỗ.
- **Mọi tỉ lệ "trên bản đồ" tính bằng code** (xoay hình trên mặt cầu rồi chiếu Mercator, như `cong-2_so-nguon.md` §3.2–3.3), không phóng tay.

**Bước "lên 10" đã tính sẵn** (Bible §7.7):
- **Hook bằng hình:** nhấc hình nước Đức ra như miếng dán, mang sang cạnh Việt Nam: trông gấp 2,5 → **co về đúng diện tích** ngay khi đọc "Gần bằng nhau".
- **Chứng minh méo bằng vòng tròn Tissot:** các vòng tròn bằng nhau trên quả địa cầu, lên bản đồ phẳng thì **phình dần về phía cực** (câu 14).
- **Greenland có mặt** (`MapFace`): bị kéo xuống xích đạo thì teo lại, rồi chống chế "Do góc chụp thôi mà!" kèm đèn flash.
- **Twist có hình:** bóng Việt Nam trượt lên châu Âu, **phình to theo từng khung**, đồng hồ đếm "×1 → ×2".
- **SFX thật hợp cảnh:** tiếng màn trập máy ảnh (câu 17), whoosh khi nhấc / kéo nước.

**Nhạc nền:** P3 chính **"Floating Cities"** (Kevin MacLeod; 10 tập gần nhất chưa có P3). Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Bản đồ thế giới Mercator | `Atlas` (kit đã chiếu Mercator) + **lưới vĩ tuyến** 0°–80° mỗi 10° (vẽ thêm, đường dày dần về cực) | lưới chỉ hiện ở câu 05–06, 11–14 và khung nối vòng (mờ) |
| "Miếng dán nước" (mới) | lấy đa giác Natural Earth của nước, **xoay trên mặt cầu** tới vị trí mới rồi chiếu Mercator theo từng khung | dùng cho Đức (01–04), Ý / Anh (08), Greenland (15–16), Phần Lan (18), bóng Việt Nam (23) |
| Vòng tròn Tissot | vòng tròn bán kính bằng nhau (vd. 500 km) trên mặt cầu, chiếu Mercator | câu 13–14 |
| Quả địa cầu đồ chơi | `ToyGlobe` (đã có) + thước dây (`d-04`) theo đường tròn lớn | câu 09–10 |
| Bản đồ đúng diện tích | phép chiếu hình trụ đẳng diện (Gall–Peters: vĩ tuyến chuẩn 45°), viết hàm chiếu riêng cho d3 | câu 19–20, chuyển dần từ Mercator |
| Greenland có mặt | `MapFace` + `talkOpen` trên đa giác Greenland | câu 15–17 |
| Việt Nam | `Atlas` + `VnIslands`; bóng viền = đường nét đứt + màu nhạt, nhãn `ĐẤT LIỀN VIỆT NAM` | câu 23 |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `eurasia` (khung nối vòng) | ~55°Đ 38°B, thấy châu Âu ↔ Việt Nam | frame 0, 24 (về cuối) |
| `europe` | ~12°Đ 50°B | 01, 10, 19–21, 23 |
| `vn` | ~106°Đ 16°B, có Biển Đông | 01–08 |
| `globe` (màn quả địa cầu đồ chơi, không phải bản đồ) | — | 09–10 |
| `atlantic` (Greenland + châu Phi) | ~-15°Đ 30°B, zoom thấp | 11–17 |
| `nordic` (Phần Lan) | ~26°Đ 60°B | 18 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `eurasia`: châu Âu và Việt Nam, lưới vĩ tuyến mờ | — | — |
| 01 | 0,05–3,1 | **từ frame 1** bay vào nước Đức; Đức sáng, `CountryTag` ĐỨC; **nhấc Đức lên như miếng dán**, bay sang đặt cạnh Việt Nam (đúng cỡ trên bản đồ) | thẻ `TRÊN BẢN ĐỒ ×2,5` | whoosh |
| 02 | 3,2–4,0 | dấu `?` giữa hai miếng | — | — |
| 03 | 4,2–5,2 | **miếng Đức co lại đúng diện tích** (xoay về vĩ độ Việt Nam rồi chiếu lại) → gần bằng Việt Nam | `GẦN BẰNG NHAU` | click |
| 04 | 5,3–7,4 | hai miếng đặt chồng: Đức chỉ dư một mép | thẻ `THỰC TẾ +8%` | — |
| 05 | 7,5–9,4 | camera lùi, lưới vĩ tuyến hiện ra, dãn dần về phía Bắc | — | — |
| 06 | 9,6–10,9 | con dấu `MERCATOR` đóng lên bản đồ | `CHÍNH TẤM BẢN ĐỒ` | click |
| 07 | 11,1–14,0 | khung `vn`: Việt Nam (đủ `VnIslands`) sáng viền | thẻ `~331.000 KM²` · chữ nhỏ `KHÔNG TÍNH VÙNG BIỂN` | — |
| 08 | 14,2–18,7 | miếng Ý và Anh **đúng diện tích** đặt cạnh (nhỏ hơn); bóng nét đứt cỡ "trên bản đồ" của chúng to hơn | `CountryTag` Ý, ANH | — |
| 09 | 18,7–22,9 | chuyển màn **quả địa cầu đồ chơi**: thước dây (`d-04`) kéo từ Lũng Cú tới Đất Mũi | thẻ `1.650 KM` | — |
| 10 | 23,0–26,8 | địa cầu xoay sang châu Âu; cùng thước dây đặt **Copenhagen → Napoli** | `CountryTag` ĐAN MẠCH, Ý | whoosh |
| 11 | 27,0–29,8 | về bản đồ phẳng `atlantic`; quân cờ Mercator (`d-01`) bước vào | ruy băng `1569` | — |
| 12 | 29,8–32,6 | tàu buồm (`i-07`) cạnh Mercator | nhãn `GERARDUS MERCATOR` | — |
| 13 | 32,6–35,2 | tàu đi theo **một đường thẳng** giữ hướng la bàn (mũi tên la bàn) | — | — |
| 14 | 35,3–38,3 | **vòng tròn Tissot** bằng nhau, phình dần về phía cực | `XA XÍCH ĐẠO = PHÓNG TO` | — |
| 15 | 38,6–40,7 | Greenland (`MapFace`) và châu Phi sáng lên, trông ngang nhau | nhãn `GREENLAND` · `CHÂU PHI` | — |
| 16 | 40,7–43,5 | **Greenland bị kéo xuống xích đạo, teo lại**, vừa khít trong châu Phi nhiều lần | thẻ `×14` | whoosh |
| 17 | 43,7–45,3 | **[ĐÙA]** Greenland nói (miệng mở); máy ảnh (`d-05`) lóe flash | — | màn trập máy ảnh |
| 18 | 45,6–49,6 | khung `nordic`: Phần Lan trên bản đồ to ×5; miếng **đúng diện tích** của Phần Lan đặt cạnh miếng Việt Nam: bằng nhau | thẻ `TRÊN BẢN ĐỒ ×5` | — |
| 19 | 49,9–56,0 | **[NGƯỜI]** quân cờ Peters (`d-02`) với micro; bản đồ chuyển dần sang **đúng diện tích** (châu Phi dài ra) | ruy băng `1973` · thẻ phe 1 `MERCATOR THIÊN VỊ` / `PHƯƠNG BẮC` | — |
| 20 | 56,0–60,0 | quân cờ nhà bản đồ (`d-03`) lắc đầu; hình dáng châu Phi bị kéo được khoanh | thẻ phe 2 `MÉO HÌNH DÁNG` | — |
| 21 | 60,1–61,4 | bản đồ chuyển về Mercator | `PHẲNG NÀO CŨNG MÉO` | — |
| 22 | 61,5–65,5 | điện thoại (`b-02`) có bản đồ; mũi tên la bàn giữ đúng hướng | — | click |
| 23 | 65,8–71,0 | **[TWIST]** bóng viền đất liền Việt Nam nhấc lên, trượt lên châu Âu theo đường tròn lớn, **phình dần theo từng khung**; Việt Nam thật cùng Hoàng Sa, Trường Sa ở nguyên chỗ | đồng hồ `×1 → ×2` · nhãn `ĐẤT LIỀN VIỆT NAM` | whoosh |
| 24 | 71,1–74,9 | bóng mờ dần; camera lùi về `eurasia` → khung cuối = khung đầu | — | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Mercator, Peters: hình tôn trọng, không vẽ theo ảnh thật.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `d-01-mercator.png` | 11–14 | nhà vẽ bản đồ thế kỷ 16, cầm compa |
| `d-02-peters.png` | 19 | sử gia thập niên 1970, bàn có micro |
| `d-03-nha-ban-do.png` | 20–21 | nhà vẽ bản đồ hiện đại (hình chung) |
| `d-04-thuoc-day.png` | 09–10 | thước dây đồ chơi |
| `d-05-may-anh.png` | 17 | máy ảnh đồ chơi lóe flash |
| *(dùng lại)* `i-07-ship` · `b-02-dien-thoai` | 12–13 · 22 | tập Singapore · Bắc Ninh |

## Ý tưởng ảnh bìa

Bóng Việt Nam phủ từ Đan Mạch xuống Ý trên bản đồ châu Âu; hook 2 tầng **"VIỆT NAM TO HƠN"** / **"BẠN NGHĨ"**; vòng đỏ quanh bóng.
