#!/usr/bin/env node
/**
 * Geography check (Lucas 2026-10-22, QA of p5-tphcm-ba-the-gioi v1: the "SÀI GÒN" label sat in Bình Dương and
 * "BÌNH DƯƠNG" in Bình Phước). Every map-anchored label / face / prop of an episode is declared in its Video.tsx:
 *
 *   export const PLACES = {
 *     sgLabel: { ll: [106.68, 10.78], in: "TP. Hồ Chí Minh" },          // must sit inside this 2024 province
 *     newCity: { ll: [106.7, 10.9], in: "TP. Hồ Chí Minh", year: 2025 }, // …or this 2025 province
 *     rig: { ll: [107.97, 9.75], in: "sea" },                            // …or at sea / outside Vietnam
 *   };
 *
 *   node scripts/geo-check.mjs <slug>     prints one line per place, exits 1 if one is in the wrong place
 *
 * Run by `npm run draft` / `npm run final` before rendering (scripts/build.mjs) when Video.tsx declares PLACES.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { geoCentroid, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import { ROOT } from "./ep-lib.mjs";

const require = createRequire(import.meta.url);
const GEO = path.join(ROOT, "Style Library", "I-toy-atlas", "geo");
const load = (file) => {
  const t = require(path.join(GEO, file));
  return feature(t, t.objects.provinces);
};
const fc2024 = load("vn-provinces-2024.topo.json");
const fc2025 = load("vn-provinces-2025.topo.json");
// same fix as vn-provinces.tsx (fixConDao): Natural Earth puts Côn Đảo inside Sóc Trăng
{
  const st = fc2024.features.find((f) => f.properties.name === "Sóc Trăng");
  const vt = fc2024.features.find((f) => f.properties.name === "Bà Rịa - Vũng Tàu");
  const isConDao = (poly) => {
    const [lon, lat] = geoCentroid({ type: "Polygon", coordinates: poly });
    return lat < 9 && lon > 106.3;
  };
  if (st?.geometry.type === "MultiPolygon" && vt?.geometry.type === "MultiPolygon") {
    vt.geometry.coordinates.push(...st.geometry.coordinates.filter(isConDao));
    st.geometry.coordinates = st.geometry.coordinates.filter((p) => !isConDao(p));
  }
}
const where = (ll, year) => ((year === 2025 ? fc2025 : fc2024).features.find((f) => geoContains(f, ll))?.properties.name ?? "sea");

/** Places declared in Map/<slug>/Video.tsx, or null when the episode has no PLACES block. */
export const readPlaces = (slug) => {
  const src = fs.readFileSync(path.join(ROOT, "Map", slug, "Video.tsx"), "utf8");
  const block = src.match(/export const PLACES\s*=\s*\{([\s\S]*?)\n\}/);
  if (!block) return null;
  const re = /(\w+):\s*\{\s*ll:\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]\s*,\s*in:\s*"([^"]+)"(?:\s*,\s*year:\s*(2024|2025))?/g;
  return [...block[1].matchAll(re)].map((m) => ({ id: m[1], ll: [Number(m[2]), Number(m[3])], want: m[4], year: Number(m[5] ?? 2024) }));
};

/** Checks every place; returns the number of wrong ones (prints a table). */
export const geoCheck = (slug) => {
  const places = readPlaces(slug);
  if (!places) {
    console.log(`(geo check: ${slug}/Video.tsx declares no PLACES — skipped)`);
    return 0;
  }
  let bad = 0;
  for (const p of places) {
    const got = where(p.ll, p.year);
    const ok = got === p.want;
    if (!ok) bad++;
    console.log(`${ok ? "✓" : "✗"} ${p.id.padEnd(16)} [${p.ll.join(", ")}]  ${p.year}: ${got}${ok ? "" : `  ← should be ${p.want}`}`);
  }
  console.log(bad ? `\n✗ geo check: ${bad} place(s) outside their province` : `✓ geo check: ${places.length} places in the right province`);
  return bad;
};

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/").replace(/^([A-Za-z]):/, "/$1:")}` || process.argv[1]?.endsWith("geo-check.mjs")) {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node scripts/geo-check.mjs <slug>");
    process.exit(2);
  }
  process.exitCode = geoCheck(slug) ? 1 : 0;
}
