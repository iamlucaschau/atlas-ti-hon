# Cổng 4 · Beat sheet — "Mét vuông bạc tỷ chưa ai trả tiền?"

*2026-10-24 — **Lucas duyệt Cổng 4** (đã thêm ảnh). Giọng đọc: **65,44 s**, 239 wpm, tempo 1.1 (`vo-timestamps.md`); +0,7 s nhạc cuối ≈ 66 s.*

**Luật áp dụng:**
- Style I + luật kênh.
- Mở đầu bay từ frame 1; camera đẩy chậm mỗi beat; chỉ bay khi đổi nơi (≥ 22 frame).
- Khung cuối = khung đầu, **và khung đầu / cuối không trống**: bản đồ Việt Nam có hai ghim mờ Hà Nội, TP.HCM.
- ≤ 4 đạo cụ gắn bản đồ cùng lúc; bảng che bản đồ ≤ 2 câu liền nhau.
- **Mỗi con số trên màn hình kèm loại giá + năm** (luật 15, 21). Mỗi khối chữ ≤ 5 chữ (thẻ hai tầng = hai khối).
- **Chữ ký kênh `Signature`** đổi chỗ ở mỗi cú bay.
- Mọi chấm / nhãn khai `PLACES`, qua kiểm địa lý.
- Không nước ngoài nào được gọi tên → không cần `CountryTag`. Có `VnIslands` ở khung toàn quốc.

**Nhạc nền:** P2 chính **"Wallpaper"** (Kevin MacLeod; tập EVN vừa dùng "Inspired"). Ghi công trong mô tả.

## Hình học & kit cần (Cổng 5)

| Lớp | Nguồn / cách làm | Ghi chú |
|---|---|---|
| Việt Nam theo tỉnh | `ProvinceMap` VN2025, màu Việt Nam; Hà Nội, TP.HCM sáng hơn | khung `vn`; `VnIslands` |
| **Sơ đồ phố cổ** (mới) | vector minh họa, màn hình: Hồ Gươm, vài phố (Hàng Ngang, Hàng Đào, Đinh Tiên Hoàng); Hàng Ngang tô vàng; ghim nhà 48 | hiện khi camera đã ở Hà Nội; ghi "minh họa" ở mô tả; không phải bản đồ địa chính |
| **Sơ đồ khúc sông Sài Gòn** (mới) | vector minh họa: khúc sông uốn; bờ tây ghim "ĐỒNG KHỞI"; bờ đông ô đất Thủ Thiêm | vị trí lô đất ⚠️ đối chiếu quy hoạch khu chức năng số 3 |
| Thẻ giá | `DataCard` 2 tầng: số + "loại giá · năm" | luôn có loại giá |
| Cột so sánh | `Bars` (từ tập EVN): bảng giá 2026 ↔ giá trúng 2021 (câu 02); 188 → 695 (câu 08) | ghi rõ loại giá |
| Ô đất 1 m² + 9 tầng sàn | vector: một ô vuông, 9 tấm sàn chồng lên | câu 16 |
| Sóng giá | vòng tròn loang từ Thủ Thiêm ra xung quanh | câu 18 (lo ngại của Hiệp hội) |
| Con dấu | `Stamp` "CHƯA TRẢ TIỀN" | câu 21 |

## Camera

| Khung | Tâm / zoom (dự kiến) | Câu |
|---|---|---|
| `vn` (toàn quốc, khung nối vòng) | ~106,4°Đ 16,2°B | frame 0, 05, 22 (về cuối) |
| `hanoi` (Hà Nội → sơ đồ phố cổ) | ~105,85°Đ 21,03°B, zoom cao rồi chuyển sang lớp sơ đồ | 01, 06–12 |
| `hcm` (TP.HCM → khúc sông) | ~106,71°Đ 10,78°B, zoom cao rồi chuyển sang lớp sơ đồ | 02–04, 13–21 |

## Beat

| Câu | Thời gian | Hình | Chữ trên màn | SFX |
|---|---|---|---|---|
| — | frame 0 | `vn`: Việt Nam, hai ghim mờ Hà Nội / TP.HCM | — | — |
| 01 | 0,05–4,5 | **từ frame 1** bay vào Hà Nội → sơ đồ phố cổ; phố Hàng Ngang sáng vàng; dãy nhà ống (`t-02`) | thẻ `702 TRIỆU/M²` · `BẢNG GIÁ 2026` | whoosh |
| 02 | 4,7–7,7 | **bay** → TP.HCM, khúc sông; ô đất Thủ Thiêm sáng; cột so sánh: 702 triệu (bảng giá) ↔ 2,44 tỷ (giá trúng) | thẻ `~2,44 TỶ/M²` · `GIÁ TRÚNG ĐẤU GIÁ 2021` | — |
| 03–04 | 7,9–9,5 | dấu `?` → hai thẻ cạnh nhau nảy lên | `TRÊN GIẤY` · `TRÊN SÀN ĐẤU` | click |
| 05 | 9,6–11,4 | **bay** → `vn`; một ngôi nhà đồ chơi nhỏ giữa bản đồ, hai nhãn giá lơ lửng | `GIÁ TRÊN GIẤY` · `GIÁ MUA BÁN` | — |
| 06 | 12,0–14,4 | **bay** → Hà Nội, sơ đồ phố cổ; tờ bảng giá (vector) trải ra | thẻ `GIÁ 1: BẢNG GIÁ` | whoosh |
| 07 | 14,6–17,2 | sổ đỏ (`t-06`) nảy lên cạnh phố | thẻ `TIỀN SỬ DỤNG ĐẤT` | — |
| 08 | 17,3–20,4 | ruy băng; cột Hàng Ngang mọc từ 188 → 695 triệu | ruy băng `20/12/2024` · `×3,7` | click |
| 09 | 21,0–23,8 | camera đẩy chậm vào ghim nhà 48; ngôi nhà (`t-05`) | nhãn `48 HÀNG NGANG` | — |
| 10 | 23,9–29,2 | ruy băng; cửa sổ tầng hai sáng ấm dần | ruy băng `1945` · nhãn `NHÀ ÔNG TRỊNH VĂN BÔ` | — |
| 11 | 29,3–31,8 | ánh sáng tầng hai giữ nguyên, nhạc lắng | nhãn `TUYÊN NGÔN ĐỘC LẬP` | — |
| 12 | 31,9–34,2 | thẻ giá 702 triệu mờ dần, rời khỏi ngôi nhà | — | — |
| 13 | 34,8–37,6 | **bay** → TP.HCM, khúc sông; ghim Đồng Khởi bờ tây, ô đất Thủ Thiêm bờ đông; búa đấu giá (`t-01`) | thẻ `GIÁ 2: SÀN ĐẤU` | whoosh |
| 14 | 37,8–41,0 | ruy băng; quân cờ nhà đầu tư (`t-07`) giơ bảng trả giá; búa gõ cuối câu | ruy băng `2021` | hit (tiếng gõ) |
| 15 | 41,2–43,7 | thẻ giá nảy lên | `~2,44 TỶ/M²` · `GẤP 8,3 LẦN KHỞI ĐIỂM` | — |
| 16 | 43,9–47,5 | **[gỡ mâu thuẫn]** ô 1 m² trên lô đất, 9 tấm sàn chồng lên; tòa tháp (`t-03`) mọc | `1 M² ĐẤT ≈ 9 M² SÀN` | — |
| 17 | 48,1–50,5 | thẻ phe 1 | `CƠ QUAN TƯ PHÁP` / `ĐÚNG QUY TRÌNH` | — |
| 18 | 50,7–53,7 | thẻ phe 2; sóng giá loang từ Thủ Thiêm ra hai bờ sông | `HIỆP HỘI BĐS` / `LO KÉO GIÁ VÙNG` | — |
| 19 | 53,8–57,2 | quân cờ nhà đầu tư quay đi, mờ dần; túi tiền cọc (`t-04`) bay khỏi lô đất | thẻ `CỌC ~600 TỶ · 2022` | — |
| 20 | 57,4–59,7 | **[ĐÙA]** túi tiền nhỏ dần thành một chấm; quân cờ nghiêng đầu | — | — |
| 21 | 59,9–62,1 | **[TWIST]** thẻ 2,44 tỷ biến thành tờ giấy mỏng; đóng dấu | dấu `CHƯA TRẢ TIỀN` | deep hit |
| 22 | 62,3–64,8 (+0,7) | tờ giấy bay lên; camera lùi về `vn` → khung cuối = khung đầu | — | — |

Không SFX tổng hợp / cartoon; tối đa 1 SFX mỗi beat. Đoạn 48 Hàng Ngang (09–12) không SFX, nhạc nhỏ lại.

## Ảnh cần (Lucas tạo) — chi tiết ở `image-prompts.md`

| File | Dùng ở câu | Ghi chú |
|---|---|---|
| `t-01-bua-dau-gia.png` | 13–15 | búa đấu giá gỗ |
| `t-02-nha-ong-pho-co.png` | 01, 05–08 | dãy nhà ống phố cổ |
| `t-03-thap-cao-tang.png` | 16 | tòa tháp + cần cẩu nhỏ |
| `t-04-tui-tien-coc.png` | 19–20 | túi tiền, không ký hiệu tiền tệ |
| `t-05-nha-co-ban-cong.png` | 09–12 | nhà phố cổ có tầng hai sáng đèn, **hình chung**, không người |
| `t-06-so-do.png` | 07 | sổ đỏ đồ chơi, không chữ, không quốc huy |
| `t-07-nha-dau-tu.png` | 14, 19–20 | quân cờ doanh nhân giơ bảng trả giá, **hình chung** |
