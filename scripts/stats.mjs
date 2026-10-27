#!/usr/bin/env node
/**
 * Post-publish numbers (Lucas 2026-10-27, project review group A): one row per episode × platform × milestone in
 * `Map/so-lieu.csv` (UTF-8 with BOM so Excel opens it; Lucas pastes YouTube Studio numbers, Luis fills the rows).
 *
 *   node scripts/stats.mjs                 YouTube, 7 days (default)
 *   node scripts/stats.mjs --moc 24h       other milestone: 24h · 7d · 30d
 *   node scripts/stats.mjs --nen-tang tiktok
 *
 * Prints the episodes that have numbers, best "% viewed" (Shorts: viewed vs swiped away) first, then MEDIANS by pillar
 * and by opening type (`hook_chu`: co = HookTitle in the first 3 s, khong = subtitles from frame 0), so a test compares
 * like with like (Bible §9: medians, never one outlier). Columns: see the CSV header.
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./ep-lib.mjs";

const arg = (name, def) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : def;
};
const MOC = arg("--moc", "7d");
const NEN = arg("--nen-tang", "youtube");

/** Minimal CSV: comma separated, "quoted" fields may hold commas. */
const parse = (line) => {
  const out = [];
  let cur = "";
  let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
};

const file = path.join(ROOT, "Map", "so-lieu.csv");
const lines = fs.readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/).filter(Boolean);
const head = parse(lines[0]);
const rows = lines.slice(1).map((l) => Object.fromEntries(parse(l).map((v, i) => [head[i], v])));
const num = (v) => (v === undefined || v === "" ? NaN : Number(String(v).replace("%", "").replace(",", ".")));

const pick = rows.filter((r) => r.moc === MOC && r.nen_tang === NEN && !Number.isNaN(num(r.views)));
console.log(`Map/so-lieu.csv · ${NEN} · ${MOC}: ${pick.length} / ${rows.filter((r) => r.moc === MOC && r.nen_tang === NEN).length} episodes have numbers`);
if (!pick.length) {
  console.log("Nothing to compare yet: paste the YouTube Studio numbers (views, viewed vs swiped away %, average view duration) into the CSV.");
  process.exit(0);
}

const fmt = (v, d = 0) => (Number.isNaN(v) ? "–" : v.toLocaleString("vi-VN", { maximumFractionDigits: d }));
pick.sort((a, b) => (num(b.da_xem_pct) || 0) - (num(a.da_xem_pct) || 0));
console.log("\n slug                          pillar  hook   s   views   %đã xem  TG xem  %xem TB");
for (const r of pick) {
  console.log(
    ` ${r.slug.padEnd(30)}${r.pillar.padEnd(8)}${r.hook_chu.padEnd(6)}${String(r.thoi_luong_s).padStart(3)} ${fmt(num(r.views)).padStart(7)} ${fmt(num(r.da_xem_pct), 1).padStart(8)} ${fmt(num(r.tg_xem_tb_s), 1).padStart(7)} ${fmt(num(r.xem_tb_pct), 1).padStart(8)}`,
  );
}

const median = (xs) => {
  const v = xs.filter((x) => !Number.isNaN(x)).sort((a, b) => a - b);
  if (!v.length) return NaN;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
};
const group = (key) => {
  console.log(`\n median by ${key}        n    views  %đã xem  %xem TB`);
  const keys = [...new Set(pick.map((r) => r[key]))].sort();
  for (const k of keys) {
    const g = pick.filter((r) => r[key] === k);
    console.log(
      ` ${String(k).padEnd(20)}${String(g.length).padStart(3)} ${fmt(median(g.map((r) => num(r.views)))).padStart(8)} ${fmt(median(g.map((r) => num(r.da_xem_pct))), 1).padStart(8)} ${fmt(median(g.map((r) => num(r.xem_tb_pct))), 1).padStart(8)}`,
    );
  }
};
group("pillar");
group("hook_chu");
if (pick.length < 6) console.log("\n⚠ fewer than 6 episodes with numbers: read the medians as hints, not results.");
