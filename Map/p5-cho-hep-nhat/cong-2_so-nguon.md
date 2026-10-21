# Cổng 2 · Sổ nguồn — "Chỗ hẹp nhất Việt Nam"

*2026-10-21. Cổng 1 đã duyệt (Lucas, `Map/cong-1_2026-10-21.md`, #1). P5 · Region Reveal · Standard 60–75 s · tempo 1.1. Truy cập mọi nguồn: 21/10/2026. Chủ đề địa lý (sự thật ổn định) + một thay đổi hành chính 2025: mỗi nhận định ≥ 1 nguồn hoặc phép đo kiểm lại được; số tự đo ghi rõ "Luis đo".*

## 1. Sổ nhận định

| ID | Câu sẽ dùng (dự kiến) | Giá trị | Loại / kỳ | Nguồn | Trạng thái | Cách nói an toàn | Nguồn KHÔNG chứng minh |
|---|---|---|---|---|---|---|---|
| C1 | Nơi hẹp nhất theo chiều tây – đông của Việt Nam thuộc Quảng Bình, chưa đầy 50 km | < 50 km | sách giáo khoa | SRC-001 SGK Địa lí 8 tr. 84 (qua VietJack); SRC-002 Wikipedia "Quảng Bình (tỉnh)" (50 km); SRC-003 bài báo khoa học VJS về Bắc Trung Bộ ("hẹp nhất dưới 50 km") | ✅ 3 nguồn | "chưa đầy năm mươi cây số" | xã / điểm đo cụ thể → SGK không nêu |
| C2 | Bề ngang 40,3 km theo đường ngắn nhất từ biên giới Lào ra biển | 40,3 km | báo chí | SRC-004 VTC News (19/9/2023); SRC-005 vnreview (diễn đàn) | ⚠️ không nêu ai đo, đo ở đâu | **không đọc số lẻ 40,3** | nguồn gốc con số |
| C3 | Luis đo lại: đường ngắn nhất từ biên giới Lào ra biển ≈ 42 km, từ ~17,29°B 106,29°Đ tới bờ biển ~17,47°B 106,64°Đ — **chạm biển ngay cạnh cửa Nhật Lệ, Đồng Hới** | ≈ 42,4 km | **Luis đo** trên Natural Earth 1:10m (bản đồ đã làm tròn nét, sai số vài km) | SRC-006 Natural Earth / world-atlas `countries-10m`; công cụ `scratchpad/tools/narrow.py` | ✅ phép đo, khớp cỡ với C1 và C2 | dùng cho **hình** (vị trí thước đo), không đọc số 42 | — |
| C4 | Chưa đầy 50 km — gần bằng một đường chạy marathon | marathon 42,195 km | so sánh | SRC-007 World Athletics (cự ly marathon) + C1–C3 | ✅ (so sánh gần đúng: 40–42 km đo được) | "gần bằng một đường chạy marathon" — **không** nói "đúng bằng" | — |
| C5 | Từ bắc vào nam, đất liền dài khoảng 1.650 km — dài gấp hơn 30 lần chỗ hẹp nhất | 1.650 km · 1.650 / 50 = 33 | SGK / Luis tính | SRC-008 Lời giải hay (SGK Địa 8 bài 23); SRC-009 NZ Vietnam War fact sheet; Luis đo đường thẳng cực Bắc – cực Nam: 1.647 km | ✅ | "dài gấp hơn ba mươi lần" | — |
| C6 | Chỗ rộng nhất ở miền Bắc: từ cực Tây (Điện Biên) tới Móng Cái khoảng 600 km | Luis đo 611 km; Apa Chải → biển gần nhất ≈ 480 km | **Luis đo** | SRC-006; nguồn ngoài (deine-berge.de, VLE.lt) ghi ~600 km, ĐSQ VN tại Ấn Độ ghi ~500 km | ⚠️ nguồn lệch nhau | **đề xuất không dùng** (một phép so sánh C5 là đủ) | — |
| C7 | Vì sao hẹp: dãy Trường Sơn chạy sát biển, biên giới Việt – Lào nằm trên dãy núi; đất hẹp và dốc từ tây sang đông, ~85 % là đồi núi | 85 % | địa lý tự nhiên | SRC-002 Wikipedia ("dãy Trường Sơn là biên giới tự nhiên", "hẹp và dốc từ phía Tây sang phía Đông", 85 %); SRC-003 VJS ("Trường Sơn trấn giữ ở phía tây, phía đông là biển… không gian hẹp") | ✅ 2 nguồn (Wikipedia đoạn này không chú thích) | "núi Trường Sơn ép sát biển" — **không** nói "biên giới đi đúng theo đường chia nước" | nguyên tắc hoạch định biên giới 1977 → chưa có văn bản |
| C8 | Mọi đường bộ Bắc – Nam (quốc lộ 1, đường sắt, đường Hồ Chí Minh) đều phải chen qua dải đất này | — | hình học + giao thông | Luis (mọi đường trên đất liền Việt Nam phải cắt ngang chỗ hẹp); SRC-010 Nhân Dân: đường Hồ Chí Minh qua Quảng Bình dài nhất, 320 km cả hai nhánh | ✅ | "mọi con đường Bắc – Nam đều phải đi qua đây" | — |
| C9 | **[NGƯỜI]** Mẹ Suốt (Nguyễn Thị Suốt), ngoài 60 tuổi, chèo đò qua sông Nhật Lệ ở Đồng Hới chở cán bộ, bộ đội, thương binh, vũ khí khi máy bay Mỹ đánh phá, những năm 1964–1966 | 1964–1966 · ~60 tuổi | sự kiện lịch sử | SRC-011 QĐND "Tố Hữu làm thơ về mẹ Suốt" (2008): gặp ngày 4/11/1965, mẹ 60 tuổi, bến Bảo Ninh; SRC-012 Nhân Dân "Trong tiếng sóng…" (1964–1966, hàng trăm chuyến dưới bom); SRC-013 Nhân Dân (2023) di tích quốc gia Bến đò Mẹ Suốt, xã Bảo Ninh | ✅ 3 nguồn | "Bên cửa sông này, một bà mẹ sáu mươi tuổi chèo đò đưa bộ đội qua sông giữa tiếng bom" | **ngày mất** (3 nguồn lệch: 21/8, 22/8, 11/10/1968) và **tên danh hiệu** (Anh hùng LLVT / Anh hùng GTVT) → không đọc |
| C10 | Tố Hữu gặp mẹ ngày 4/11/1965 và viết bài thơ "Mẹ Suốt" | 4/11/1965 | sự kiện | SRC-011 QĐND | ✅ 1 nguồn chính thống | chỉ nhắc tên bài thơ; **không trích lời thơ** | — |
| C11 | Từ 1/7/2025, Quảng Bình và Quảng Trị nhập thành tỉnh mới tên Quảng Trị | NQ 202/2025/QH15 (12/6/2025) · 12.700 km² · 1.870.845 người | văn bản pháp luật | SRC-014 NQ 202/2025/QH15 (vbpl.vn, Thư viện pháp luật, LuatVietnam); SRC-002 Wikipedia | ✅ | "Từ tháng 7 năm 2025, tỉnh Quảng Bình không còn trên bản đồ hành chính" | — |
| C12 | Trung tâm hành chính tỉnh Quảng Trị mới đặt ở Đồng Hới | Đồng Hới | hành chính | SRC-015 Nhân Dân ("Tập trung cao độ… từ ngày 1/7"); SRC-016 Báo Văn hoá; SRC-017 VOV | ✅ 3 nguồn | "tỉnh lỵ mới lại đặt ở Đồng Hới" | — |
| C13 | Twist: chỗ hẹp nhất không dịch một mét, nhưng giờ thuộc tỉnh Quảng Trị — và nó chạm biển ngay tại Đồng Hới, nơi đặt tỉnh lỵ mới, cạnh bến đò Mẹ Suốt | — | suy ra từ C3 + C11 + C12 | như trên | ✅ (vị trí "ngay cạnh Đồng Hới" là **Luis đo**, sai số vài km) | "chỗ hẹp nhất vẫn ở đó, chỉ đổi tên tỉnh" | — |
| C14 | Quảng Bình cũ: ~8.000 km², bờ biển 116 km | 8.000 km² · 116,04 km | tỉnh cũ | SRC-004 VTC; SRC-002 Wikipedia; SRC-018 Giáo dục VN (2011, 11 kỷ lục) | ✅ | tuỳ chọn, chỉ dùng nếu cần | — |

## 2. Sổ nguồn

| ID | Nguồn | Loại | Ngày |
|---|---|---|---|
| SRC-001 | [VietJack — Trắc nghiệm Địa 8 bài 23 (dẫn SGK Địa lí 8 tr. 84)](https://vietjack.com/giai-bai-tap-dia-li-8/cau-hoi-trac-nghiem-dia-li-8-bai-23.jsp) | thứ cấp, dẫn SGK | — |
| SRC-002 | [Wikipedia — Quảng Bình (tỉnh)](https://vi.wikipedia.org/wiki/Qu%E1%BA%A3ng_B%C3%ACnh_(t%E1%BB%89nh)) | bách khoa | truy cập 21/10/2026 |
| SRC-003 | [VJS — bài báo khoa học về địa hình Bắc Trung Bộ](https://vjs.ac.vn/index.php/jse/article/download/1051/pdf/3780) | tạp chí khoa học | — |
| SRC-004 | [VTC News — Tỉnh thành nào hẹp nhất Việt Nam?](https://vtcnews.vn/tinh-thanh-nao-hep-nhat-viet-nam-ar819936.html) | báo | 19/9/2023 |
| SRC-005 | [vnreview — Nơi hẹp nhất Việt Nam bao nhiêu km](https://vnreview.vn/threads/noi-hep-nhat-viet-nam-bao-nhieu-km.46582/latest) | diễn đàn (yếu) | — |
| SRC-006 | Natural Earth 1:10m qua `world-atlas/countries-10m.json` (trong `node_modules`) + `narrow.py` của Luis | dữ liệu bản đồ, public domain | — |
| SRC-007 | World Athletics — cự ly marathon 42,195 km | quy chuẩn | — |
| SRC-008 | [Lời giải hay — Vị trí và giới hạn lãnh thổ Việt Nam (Địa 8)](https://loigiaihay.com/vi-tri-va-gioi-han-lanh-tho-viet-nam-a12462.html) | thứ cấp, dẫn SGK | — |
| SRC-009 | [NZ — Vietnam fact sheet](https://vietnamwar.govt.nz/sites/default/files/2024-06/vietnam-fact-sheet2.pdf) | chính phủ NZ | 2024 |
| SRC-010 | [Nhân Dân — 50 năm mở đường Hồ Chí Minh tại Quảng Bình](https://nhandan.vn/ocop/ky-niem-50-nam-mo-duong-ho-chi-minh-va-ngay-truyen-thong-bo-doi-truong-son-tai-quang-binh-post535061.html) | báo | — |
| SRC-011 | [QĐND — Tố Hữu làm thơ về mẹ Suốt](https://ct.qdnd.vn/van-hoa-xa-hoi/to-huu-lam-tho-ve-me-suot-509831) | báo | 6/3/2008 |
| SRC-012 | [Nhân Dân — Trong tiếng sóng của dòng sông lịch sử](https://nhandan.vn/trong-tieng-song-cua-dong-song-lich-su-post358653.html) | báo | — |
| SRC-013 | [Nhân Dân — Số hoá di tích quốc gia Bến đò Mẹ Suốt](https://nhandan.vn/quang-binh-so-hoa-thong-tin-di-tich-lich-su-quoc-gia-ben-do-me-suot-post767181.html) | báo | 14/8/2023 |
| SRC-014 | [NQ 202/2025/QH15 — LuatVietnam](https://luatvietnam.vn/hanh-chinh/nghi-quyet-202-2025-qh15-cua-quoc-hoi-ve-viec-sap-xep-don-vi-hanh-chinh-cap-tinh-402728-d1.html) · [Thư viện pháp luật](https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Nghi-quyet-202-2025-QH15-660927.aspx) · [vbpl.vn](https://vbpl.vn/TW/Lists/vbpq/Attachments/179501/202_2025_QH15_648951.doc) | văn bản pháp luật | 12/6/2025 |
| SRC-015 | [Nhân Dân — Đưa tỉnh Quảng Trị mới vào hoạt động từ ngày 1/7](https://nhandan.vn/tap-trung-cao-do-cho-cong-tac-hop-nhat-dua-tinh-quang-tri-moi-vao-hoat-dong-tu-ngay-17-post889050.html) | báo | 2025 |
| SRC-016 | [Báo Văn hoá — Tỉnh Quảng Trị mới có 78 đơn vị hành chính cấp xã](https://baovanhoa.vn/doi-song/tinh-quang-tri-moi-co-78-don-vi-hanh-chinh-cap-xa-147367.html) | báo | 2025 |
| SRC-017 | [VOV — Quảng Trị đưa cán bộ về trung tâm hành chính – chính trị tỉnh](https://vov.vn/chinh-tri/quang-tri-dua-can-bo-ve-lam-viec-tai-trung-tam-hanh-chinh-chinh-tri-tinh-post1321728.vov) | báo | 2025 |
| SRC-018 | [Giáo dục VN — 11 kỷ lục tại nơi hẹp nhất Việt Nam](https://giaoduc.net.vn/tieu-diem/11-ky-luc-tai-noi-hep-nhat-viet-nam-post4479.gd) | báo | 12/6/2011 |

## 3. Mâu thuẫn & quyết định (cần Lucas chọn)

1. **Con số bề ngang.** SGK: "chưa đầy 50 km" · báo: 40,3 km (không rõ ai đo) · Luis đo: ≈ 42 km.
   **Luis đề xuất A:** lời đọc "chưa đầy năm mươi cây số" (SGK) + so sánh "gần bằng một đường chạy marathon"; thẻ trên hình "< 50 KM". B: đọc "khoảng 40 km" (nguồn yếu). C: đọc "khoảng 42 km" (số tự đo).
2. **Khoảnh khắc người.** **Luis đề xuất A: Mẹ Suốt** — thước đo chỗ hẹp nhất chạm biển ngay cửa Nhật Lệ, đúng bến đò của mẹ; chỉ nói các chi tiết khớp ≥ 2 nguồn (60 tuổi, 1964–1966, chở bộ đội qua sông dưới bom), **không** đọc ngày mất, tên danh hiệu. Hình: nhân vật chung (bà mẹ chèo đò), không vẽ theo ảnh thật, không trích thơ. Giọng: trang trọng, câu đùa đặt ở chỗ khác (sau con số marathon). B: bỏ khoảnh khắc lịch sử, thay bằng một người hôm nay đi ngang dải đất (Luis **chưa tìm được** người cụ thể có nguồn).
3. **Phép so sánh chiều dài.** **Đề xuất:** chỉ dùng "dài 1.650 km, gấp hơn 30 lần chỗ hẹp nhất" (C5). Bỏ "chỗ rộng nhất ~600 km" (C6, nguồn lệch 500–600 km).
4. **Cách nói twist.** **Đề xuất:** "Tỉnh hẹp nhất không còn trên bản đồ hành chính — nhưng chỗ hẹp nhất thì vẫn ở đó, giờ mang tên Quảng Trị." Không nói "biến mất" trơn.

## 4. Kết luận

- Đủ nguồn để làm: C1, C4, C5, C7, C8, C9, C11, C12, C13 ✅. C2, C6 không đọc.
- **Câu hỏi "vì sao":** vì sao Việt Nam thắt lại còn chưa đầy 50 km ở Quảng Bình? → Trường Sơn ép sát biển (C7) → mọi đường Bắc – Nam phải chen qua (C8) → nên nơi đây từng là "cổ họng" bị đánh phá, Mẹ Suốt chèo đò (C9) → twist hành chính 2025 (C11–C13), nối vòng về khung toàn quốc.
- **Bản đồ:** khung toàn quốc có Hoàng Sa, Trường Sa (`VnIslands`); trước 1/7/2025 dùng `VN2024` (Quảng Bình riêng), sau đó `VN2025` (Quảng Trị mới) — loang màu hai tỉnh nhập làm một. **Lào** được gọi tên → `CountryTag` + cờ Lào (kit **chưa có** cờ Lào, Luis sẽ vẽ vector ở Cổng 5). Không có lãnh thổ tranh chấp nào cần vẽ khác thường lệ.
- Mở đầu theo luật mới: frame 0 khung toàn quốc → frame 1 bay thẳng vào dải đất Quảng Bình, thước đo kéo ngang.

## 5. Quyết định của Lucas (2026-10-21)

**Duyệt Cổng 2 theo 4 đề xuất:** (1) đọc "chưa đầy 50 km" + so với đường chạy marathon, thẻ "< 50 KM"; (2) khoảnh khắc người: Mẹ Suốt (chỉ chi tiết khớp ≥ 2 nguồn, không đọc ngày mất / tên danh hiệu, nhân vật vẽ chung, không trích thơ); (3) chỉ so với chiều dài 1.650 km; (4) twist: "không còn trên bản đồ hành chính". Sang Cổng 3.
