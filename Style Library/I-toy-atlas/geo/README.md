# Province geometry (used by `../vn-provinces.tsx`)

| File | Content | Source | Licence |
|---|---|---|---|
| `vn-provinces-2025.topo.json` | Viet Nam, 34 provinces from 1/7/2025 (properties: `id` = OCHA pcode, `name`, `coastal`) | OCHA / HDX — *Viet Nam – Subnational Administrative Boundaries* (COD-AB v02, valid 25/9/2025), https://data.humdata.org/dataset/cod-ab-vnm | CC BY-IGO — credit "OCHA/HDX" in every video description that uses it |
| `vn-provinces-2024.topo.json` | Viet Nam, 63 provinces before 1/7/2025 (`id` = ISO 3166-2, `name`, `coastal`) | Natural Earth admin-1 10m, v5.1.2 (VN-39, VN-53, VN-66 renamed Đồng Nai, Bắc Kạn, Hưng Yên) | Public domain |

Both simplified with mapshaper (`-simplify dp interval=150 keep-shapes`, quantization 1e5), 2026-10-18. `coastal` follows Cổng 2 of `Map/p1-tay-nguyen-co-bien` (28 of 63 before, 21 of 34 after).
