# Cổng 2 · Sổ nguồn — "Bản đồ đang làm Việt Nam nhỏ đi" (diện tích Việt Nam)

*2026-10-27. Cổng 1 đã duyệt (Lucas, `Map/cong-1_2026-10-27-dien-tich.md`, góc A). P3 Cause-and-Effect (+ P5) · Standard ≤ 265 chữ. Truy cập mọi nguồn: 27/10/2026.*
- *Luật 22: nói "phép chiếu làm méo", không nói "bản đồ cố tình làm nhỏ Việt Nam".*
- *Không nói diện tích vùng biển.*

## 1. Sổ nhận định

| ID | Câu sẽ dùng (dự kiến) | Giá trị | Phạm vi / kỳ | Nguồn | Trạng thái | Cách nói an toàn |
|---|---|---|---|---|---|---|
| C1 | Diện tích Việt Nam **khoảng 331.000 km²** | 33.133.831 ha ≈ 331.338 km² · WB 331.230 km² | Kiểm kê đất 31/12/2023 · WB 2018 (gồm mặt nước nội địa) | SRC-001 (QĐ 3411/QĐ-BTNMT), SRC-002 (World Bank qua IndexMundi) | ✅ 2 nguồn, lệch 0,03 % | "khoảng **331 nghìn km²**" |
| C2 | Xếp hạng **khoảng thứ 66** thế giới về diện tích | hạng 66 | WB 2018 | SRC-002, SRC-003 (LawNet) | ✅ · ⚠️ danh sách khác ghi 65–67 | "khoảng thứ **66**" |
| C3 | **Phần Lan rộng gần đúng bằng Việt Nam** (≈ 338.000 km², hơn ~2 %); Ý **nhỏ hơn** (~302.000); Anh **nhỏ hơn nhiều** (~244.000); Đức **chỉ lớn hơn ~8 %** (~358.000) | xem bảng §3.2 | WB 2018 | SRC-002, SRC-013 (Luis tính lại từ Natural Earth) | ✅ 2 nguồn | "Phần Lan **gần bằng** Việt Nam" · "Đức chỉ **lớn hơn chút xíu**" |
| C4 | **Nhưng trên bản đồ Mercator:** Đức trông to **gấp ~2,5** Việt Nam; Anh **~1,9**; Ý **~1,5**; **Phần Lan gấp ~5** | 2,51 · 1,94 · 1,55 · 5,00 | Mercator chuẩn | SRC-013 (Luis tính: đo diện tích trên mặt phẳng Mercator, d3-geo, Natural Earth 1:50m) · SRC-010 (công thức hệ số sec φ) | ✅ phép tính tái lập được (§3.2) | "trông to **gấp đôi rưỡi**" (Đức) · "**gấp năm**" (Phần Lan) |
| C5 | Từ cực Bắc (Lũng Cú, 23°23′B) tới cực Nam (Đất Mũi, 8°34′B) **khoảng 1.650 km** đường chim bay | 1.650 km | — | SRC-004 (ĐSQ Việt Nam tại Berlin), SRC-013 (Luis tính: 1.650 km) | ✅ 2 nguồn | "**1.650 km**" |
| C6 | 1.650 km **bằng đúng từ Copenhagen (Đan Mạch) tới Napoli (Ý)** | 1.654 km | đường chim bay | SRC-013 (Luis tính) | ✅ khớp ±4 km | "từ **Đan Mạch** xuống tận **Napoli**" (sửa Cổng 1: không phải "gần Rome") |
| C7 | **[NGƯỜI] Gerardus Mercator**, năm **1569**, vẽ bản đồ thế giới **cho người đi biển**: đường đi giữ nguyên một hướng la bàn là **một đường thẳng** | 1569 | — | SRC-005 (Britannica), SRC-006 (EBSCO Research Starters) | ✅ 2 nguồn | — |
| C8 | Cái giá: **càng xa xích đạo càng phóng to**. Ở giữa Việt Nam (16°B) bản đồ phóng **1,04 lần**; giữa châu Âu (50°B) **1,56 lần** (chiều dài), tức diện tích **~2,4 lần** | sec φ | — | SRC-005, SRC-010 (công thức), SRC-013 | ✅ toán học | "phóng to **hơn gấp đôi**" (diện tích) |
| C9 | **Greenland trông bằng châu Phi**, thực tế **châu Phi lớn gấp ~14 lần** | Greenland 2.166.086 km² · châu Phi ~30.365.000 km² → 14,0 | — | SRC-007 (CIA World Factbook), SRC-008 (Britannica, châu Phi), SRC-009 (WorldAtlas: "14 times"), SRC-013 (Luis tính: thực 13,9 lần, trên Mercator 0,95 lần) | ✅ 3 nguồn + phép tính | "châu Phi lớn gấp **mười bốn**" |
| C10 | **[TWIST] Kéo nguyên hình Việt Nam lên châu Âu** (giữ đúng km): trên bản đồ Mercator, **nó to gấp ~2,1–2,4 lần** và **dài thêm ~1,4–1,5 lần** so với ở quê nhà | 2,37 (đỉnh ở 57,75°B) · 2,11 (đỉnh ở 55°B) | Mercator | SRC-013 (Luis xoay hình trên mặt cầu rồi chiếu Mercator; diện tích thật giữ nguyên 328.960 km² → kiểm đúng) | ✅ phép tính | "to **gấp đôi**" (không đọc số lẻ) |
| C11 | **[HAI PHE · phe 1]** Năm **1973**, **Arno Peters** (sử gia Đức) họp báo ở **Bonn**, tố bản đồ Mercator **phóng to các nước phương Bắc, thu nhỏ các nước gần xích đạo**; đưa ra bản đồ **đúng diện tích**. UNICEF, UNDP, Oxfam… đã dùng bản đồ của ông | 1973 | — | SRC-011 (Favretto 2020, Bollettino AIC), SRC-012 (The National), SRC-014 (Cartographer's Tale) | ✅ 3 nguồn | — |
| C12 | **[HAI PHE · phe 2]** Giới vẽ bản đồ phản bác: bản đồ của Peters **méo hình dáng** (châu Phi bị kéo dài), và **không mới**: James **Gall** đã vẽ giống hệt từ **1855**. Mọi bản đồ phẳng đều méo một thứ gì đó | 1855 | — | SRC-011, SRC-014 | ✅ 2 nguồn | "**bản đồ phẳng nào cũng méo**" |
| C13 | Bản đồ web như **Google Maps** vẫn tính tọa độ bằng **phép chiếu Mercator** (giữ đúng hướng, đúng hình khi phóng gần) | — | tài liệu kỹ thuật hiện hành | SRC-015 (Google Maps Platform docs), SRC-016 (EPSG:3857 / Web Mercator) | ✅ 2 nguồn · ⚠️ bản trên máy tính có **chế độ quả địa cầu** khi thu nhỏ | "**bản đồ phẳng trên điện thoại**" — không nói "Google Maps luôn vẽ sai" |

**Đổi so với Cổng 1:**
- **"Bản đồ bạn học từ bé là Mercator"** → **không có nguồn** (sách giáo khoa Việt Nam có thể dùng phép chiếu khác) → **bỏ**. Thay bằng "**bản đồ phẳng trên điện thoại**" (C13).
- **"Mũi nam xuống gần Rome"** → tính lại: nếu mũi bắc ở Skagen, mũi nam rơi xuống **biển gần đảo Corse** (42,9°B). Mốc đẹp và đúng hơn: **Copenhagen → Napoli = 1.654 km** (C6).
- **Hook mạnh hơn nhờ phép tính:** "Trên bản đồ, nước Đức trông to gấp đôi rưỡi Việt Nam. Thực ra? Chỉ hơn tám phần trăm." (C3 + C4).

## 2. Sổ nguồn

| ID | Nguồn | Loại | Dùng cho |
|---|---|---|---|
| SRC-001 | [Thời báo Tài chính Việt Nam — Công bố kết quả thống kê diện tích đất của cả nước](https://thoibaotaichinhvietnam.vn/cong-bo-ket-qua-thong-ke-dien-tich-dat-cua-ca-nuoc-162528.html) (QĐ 3411/QĐ-BTNMT; đối chiếu QĐ 3048/2022, QĐ 719/2021) | văn bản Bộ TN&MT, báo ngành | C1 |
| SRC-002 | [IndexMundi — Surface area (sq. km) rankings, World Bank](https://www.indexmundi.com/facts/indicators/AG.SRF.TOTL.K2/rankings) | dữ liệu World Bank | C1–C3 |
| SRC-003 | [LawNet — Việt Nam đứng thứ mấy về diện tích](https://lawnet.vn/en/laws/what-is-the-rank-of-vietnam-in-area-what-is-the-current-area-of-63-provinces-and-cities-of-vietnam-134054.html) | trang pháp lý, thứ cấp | C2 |
| SRC-004 | [Đại sứ quán Việt Nam tại Berlin — Thông tin chung](https://vnembassy-berlin.mofa.gov.vn/web/embassy/general-information) | cơ quan nhà nước | C5 |
| SRC-005 | [Britannica — Mercator projection](https://britannica.com/science/Mercator-projection) | bách khoa | C7, C8 |
| SRC-006 | [EBSCO Research Starters — Mercator publishes his world map](https://www.ebsco.com/research-starters/history/mercator-publishes-his-world-map) | tổng quan sử học | C7 |
| SRC-007 | [CIA World Factbook — Greenland (bản tóm tắt 2021)](https://www.cia.gov/the-world-factbook/about/archives/2021/static/445b5377c20a6bb8caebb11040ac4395/GL-summary.pdf) | dữ liệu chính phủ Mỹ | C9 |
| SRC-008 | [Britannica — Africa](https://britannica.com/place/Africa/Introduction) | bách khoa | C9 |
| SRC-009 | [WorldAtlas — Is Greenland larger than Africa?](https://www.worldatlas.com/articles/is-greenland-larger-than-africa.html) | phổ thông, đối chiếu | C9 |
| SRC-010 | [Wikipedia — Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection) (chỉ để tra công thức hệ số sec φ) | tra cứu | C8 |
| SRC-011 | [Favretto — Peters (Bollettino AIC, 2020)](https://arts.units.it/retrieve/e2913fde-7fc2-f688-e053-3705fe0a67e0/peters_Favretto.pdf) | bài báo học thuật | C11, C12 |
| SRC-012 | [The National — The great map debate](https://thenationalnews.com/uae/science/the-great-map-debate-1.556736) | báo | C11 |
| SRC-013 | **Luis tính** (`scratchpad/drag.mjs`, `pairs.mjs`): Natural Earth 1:50m (gói `world-atlas`) + `d3-geo` · diện tích đa giác Việt Nam 328.960 km² (lệch 0,7 % so với số chính thức → đủ tin) | phép tính tái lập | C3–C6, C8–C10 |
| SRC-014 | [Cartographer's Tale — The "correct" map](https://www.cartographerstale.com/p/the-correct-map) | bài phân tích | C11, C12 |
| SRC-015 | [Google Maps Platform — Map and Tile Coordinates](https://developers.google.com/maps/documentation/android-sdk/coordinates) | tài liệu kỹ thuật chính chủ | C13 |
| SRC-016 | [Wikipedia — Web Mercator projection](https://en.wikipedia.org/wiki/Web_Mercator_projection) · [epsg.io](https://epsg.io/900913) | tra cứu kỹ thuật | C13 |

## 3. Mâu thuẫn & quyết định

### 3.1 Diện tích nhiều phiên bản
331.212 / 331.230 / 331.338 / 331.345 / 331.690 km², tùy năm kiểm kê và có tính mặt nước nội địa hay không. Chênh nhau < 0,2 % → đọc "**khoảng 331 nghìn km²**", không đọc số lẻ.

### 3.2 Bảng so sánh (Luis tính, Natural Earth 1:50m)

| Nước | Diện tích thật / Việt Nam | **Trên bản đồ Mercator / Việt Nam** |
|---|---|---|
| Việt Nam | 1,00 | 1,00 |
| Malaysia | 1,00 | 0,91 |
| **Phần Lan** | **1,00** | **5,00** |
| Ý | 0,91 | 1,55 |
| Anh | 0,73 | 1,94 |
| **Đức** | **1,08** | **2,51** |
| Nhật | 1,12 | 1,65 |
| Greenland | 6,55 | 97,9 |

→ **Đề xuất dùng hai cặp:** **Đức** (gần bằng nhưng trông gấp 2,5) cho hook, **Phần Lan** (bằng nhau nhưng trông gấp 5) cho nhịp "chứng minh". Bỏ Malaysia, Nhật cho gọn.

### 3.3 Phép "kéo Việt Nam lên châu Âu" (Luis tính)
- Xoay nguyên hình trên mặt cầu (giữ đúng km, đúng hướng Bắc), rồi chiếu Mercator.
- **Mũi bắc ở Copenhagen** → mũi nam ở ~40,8°B, ngang **Napoli**; hình chữ S phủ qua **Đức, Áo/Thụy Sĩ, Ý**.
- Trên bản đồ: **to gấp ~2,1–2,4**, **dài thêm ~1,4–1,5 lần** so với ở quê nhà. Cổng 5 dựng bằng đúng phép xoay này (không ước lượng bằng tay).

### 3.4 Hai phe (luật 9)
Peters (bản đồ Mercator thiên lệch về phương Bắc, nên dùng bản đồ đúng diện tích) ↔ giới vẽ bản đồ (Peters méo hình dáng, không mới; mỗi phép chiếu phục vụ một việc, Mercator vẫn đúng cho đi biển và bản đồ web). Kịch bản **không phân xử**, chỉ chốt "**bản đồ phẳng nào cũng méo**".

### 3.5 Hoàng Sa, Trường Sa khi "kéo" — **Lucas chọn**
Nếu kéo cả quần đảo theo hình (mũi bắc ở Copenhagen), Luis tính: chấm Hoàng Sa rơi vào **miền tây Ukraina** (~48,5°B 22,5°Đ), Trường Sa rơi vào **Bulgaria** (~41,8°B 24,2°Đ) → dễ gây hiểu lầm.

| Phương án | Cách vẽ | Ưu / nhược |
|---|---|---|
| **A (Luis đề xuất)** | Việt Nam thật (đủ **Hoàng Sa, Trường Sa** bằng `VnIslands`) **luôn ở nguyên chỗ**; thứ được kéo đi là **một "bóng" viền đất liền** (màu nhạt, nét đứt, nhãn "ĐẤT LIỀN VIỆT NAM"). | Đúng Bible §8.9 ở mọi khung; so sánh diện tích đất liền là đúng bản chất (331 nghìn km² là diện tích đất) · cần chữ nhỏ ghi rõ "bóng" |
| B | Kéo cả đất liền **và** hai quần đảo cùng màu. | Trọn vẹn lãnh thổ · chấm đảo nằm trên Ukraina, Bulgaria → người xem dễ hiểu sai |
| C | Kéo đất liền; hai quần đảo đi theo nhưng **mờ dần** khi rời Biển Đông. | Trung gian · vẫn có lúc chấm đảo trôi giữa châu Âu |

## 4. Kết luận

- **13 nhận định**, tất cả ✅ ≥ 2 nguồn hoặc phép tính tái lập; 2 chỗ ⚠️ chỉ cần **nói an toàn** (hạng "khoảng 66", Google Maps "bản đồ phẳng").
- **Khoảnh khắc người:** Mercator 1569 (vẽ cho thủy thủ) và Peters 1973 (cuộc họp báo ở Bonn).
- **Twist** không hết hạn: cùng một đất nước, chỉ cần dời lên châu Âu là trên bản đồ to gấp đôi; Việt Nam không nhỏ, chỉ là nằm gần xích đạo.
- **Chờ Lucas:** chọn cách vẽ Hoàng Sa, Trường Sa (§3.5) và đồng ý đổi mốc "Rome" thành "**Napoli**" + bỏ câu "bản đồ bạn học từ bé".

## 5. Quyết định của Lucas (2026-10-27)

- **Lucas duyệt Cổng 2.** Đồng ý các chỗ đổi: bỏ câu "bản đồ bạn học từ bé"; mốc **Copenhagen → Napoli** thay "gần Rome"; hook dùng cặp Đức "gấp ~2,5" ↔ "hơn ~8 %".
- **Hoàng Sa, Trường Sa (§3.5):** Lucas chưa chọn riêng → Luis **tạm theo phương án A** (Việt Nam thật có đủ hai quần đảo luôn ở nguyên chỗ; chỉ kéo "bóng" viền đất liền). Lucas có thể đổi trước Cổng 4.
