#!/usr/bin/env node
/**
 * Script + publish-pack check (Lucas 2026-10-27, project review B3): the rules of Bible §3 / 03_PROMPT that can be counted,
 * so Gate 3 and Gate 5 do not depend on reading 23 rules by eye.
 *
 *   node scripts/script-check.mjs <slug> [--preset quick|standard|deep] [--prev slug1,slug2,slug3]
 *
 * Reads Map/<slug>/kich-ban-<slug>-FINAL.md (section "VOICEOVER") and, when present, Map/<slug>/xuat-ban.txt.
 * ✗ = breaks a hard rule (exit 1) · ⚠ = look at it (heuristic; Vietnamese number words are ambiguous: "một", "năm").
 * Checks:
 *  - words ≤ preset (Quick 165 · Standard 265 · Deep 330), each sentence ≤ 25 words;
 *  - ≤ 1 new number per sentence (digits, or a run of spelled-out number words);
 *  - a question is answered at once in 1–3 words (rule 6; the closing hook question of the first paragraph is exempt);
 *  - catchphrases: short sentences / sentence openings already used in the 3 previous episodes, and the banned list (rule 11);
 *  - publish pack: UTF-8 BOM + CRLF, no Markdown, titles ≤ 45 characters, the Kevin MacLeod credit (Bible §6).
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { ROOT } from "./ep-lib.mjs";

const slug = process.argv[2];
if (!slug || slug.startsWith("--")) {
  console.error("usage: node scripts/script-check.mjs <slug> [--preset standard] [--prev a,b,c]");
  process.exit(2);
}
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const PRESET = { quick: 165, standard: 265, deep: 330 }[arg("--preset") ?? "standard"];

let errors = 0;
const ok = (m) => console.log(`✓ ${m}`);
const warn = (m) => console.log(`⚠ ${m}`);
const bad = (m) => {
  errors++;
  console.log(`✗ ${m}`);
};

const finalOf = (s) => path.join(ROOT, "Map", s, `kich-ban-${s}-FINAL.md`);
const voOf = (s) => {
  const md = fs.readFileSync(finalOf(s), "utf8").replace(/\r\n/g, "\n");
  const body = md.split(/^## VOICEOVER.*$/m)[1]?.split(/^---$/m)[0] ?? "";
  return body.trim().split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
};
const sentences = (p) => p.match(/[^.?!]+[.?!]+["”]?|[^.?!]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [];
const words = (s) => s.split(/\s+/).filter(Boolean);
const bare = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");

if (!fs.existsSync(finalOf(slug))) {
  console.error(`No ${path.relative(ROOT, finalOf(slug))}`);
  process.exit(2);
}
const paras = voOf(slug);
const all = paras.flatMap((p, pi) => sentences(p).map((s, si, arr) => ({ s, pi, last: si === arr.length - 1 })));

// ── length
const total = words(paras.join(" ")).length;
if (total > PRESET) bad(`${total} words > ${PRESET} (preset)`);
else ok(`${total} words (≤ ${PRESET}), ${all.length} sentences`);
const long = all.filter((x) => words(x.s).length > 25);
long.forEach((x) => bad(`sentence over 25 words (${words(x.s).length}): "${x.s}"`));

// ── one new number per sentence
const NUM = new Set("một hai ba bốn năm sáu bảy tám chín mười mươi mốt tư lăm trăm nghìn ngàn triệu tỷ linh lẻ rưỡi phẩy đôi".split(" "));
const numberRuns = (s) => {
  let runs = 0;
  let run = [];
  const flush = () => {
    // a lone "một" / "năm" is usually an article / "year": not counted
    if (run.length > 1 || (run.length === 1 && !["một", "năm"].includes(run[0]))) runs++;
    run = [];
  };
  for (const w of words(s)) {
    const b = bare(w);
    if (/\d/.test(b)) {
      flush();
      runs++;
    } else if (NUM.has(b) || (run.length && ["không", "phần"].includes(b))) run.push(b); // "hai nghìn không trăm", "tám phần trăm"
    else flush();
    if (/[,.;:?!]$/.test(w)) flush();
  }
  flush();
  return runs;
};
const multi = all.filter((x) => numberRuns(x.s) > 1);
if (multi.length) multi.forEach((x) => warn(`maybe 2+ numbers in one sentence (rule 10): "${x.s}"`));
else ok("≤ 1 number per sentence");

// ── questions answered at once (rule 6)
let qs = 0;
all.forEach((x, i) => {
  if (!x.s.endsWith("?")) return;
  const next = all[i + 1];
  if (!next) return;
  if (x.pi === 0 && x.last) return; // the hook's closing question is answered by the whole video
  qs++;
  if (words(next.s).length > 3) warn(`question not answered in 1–3 words (rule 6): "${x.s}" → "${next.s}"`);
});
if (qs) ok(`${qs} hanging question(s) checked`);

// ── catchphrases (rule 11)
const BANNED = ["oái oăm", "vì sao?"];
const lower = paras.join(" ").toLowerCase();
BANNED.forEach((b) => lower.includes(b) && warn(`banned catchphrase "${b}" (rule 11)`));
const prevSlugs = arg("--prev")?.split(",") ?? (() => {
  // the 3 episodes whose FINAL script was committed most recently (this one excluded)
  try {
    const out = execSync(`git log --name-only --format= -- "Map/*/kich-ban-*-FINAL.md"`, { cwd: ROOT, encoding: "utf8" });
    const seen = [];
    for (const f of out.split(/\r?\n/)) {
      const m = f.match(/^Map\/([^/]+)\/kich-ban-/);
      if (m && m[1] !== slug && !seen.includes(m[1]) && fs.existsSync(finalOf(m[1]))) seen.push(m[1]);
    }
    return seen.slice(0, 3);
  } catch {
    return [];
  }
})();
const key = (s) => words(s).map(bare).join(" ");
const opening = (s) => words(s).slice(0, 3).map(bare).join(" ");
const mine = all.map((x) => x.s);
let reused = 0;
for (const p of prevSlugs) {
  const theirs = voOf(p).flatMap(sentences);
  const shortSet = new Set(theirs.filter((s) => words(s).length <= 5).map(key));
  const openSet = new Set(theirs.filter((s) => words(s).length >= 4).map(opening));
  for (const s of mine) {
    if (words(s).length <= 5 && shortSet.has(key(s))) {
      reused++;
      warn(`short line also in ${p} (rule 11): "${s}"`);
    } else if (words(s).length >= 4 && openSet.has(opening(s)) && !/^(năm|việt nam|trên bản đồ)/.test(opening(s))) {
      reused++;
      warn(`sentence opening "${words(s).slice(0, 3).join(" ")}" also in ${p}`);
    }
  }
}
if (!reused) ok(`no catchphrase reused from ${prevSlugs.join(", ") || "(no previous episode found)"}`);

// ── publish pack
const pack = path.join(ROOT, "Map", slug, "xuat-ban.txt");
if (fs.existsSync(pack)) {
  const raw = fs.readFileSync(pack);
  const txt = raw.toString("utf8").replace(/^﻿/, "");
  if (raw[0] !== 0xef || raw[1] !== 0xbb || raw[2] !== 0xbf) bad("xuat-ban.txt: no UTF-8 BOM");
  if (/[^\r]\n/.test(txt)) bad("xuat-ban.txt: line endings are not all CRLF");
  if (/\*\*|^#{1,6} /m.test(txt)) bad("xuat-ban.txt: Markdown found (** or a # heading); the pack is plain text");
  if (!/Kevin MacLeod/.test(txt) || !/creativecommons\.org\/licenses\/by\/4\.0/.test(txt)) bad("xuat-ban.txt: Kevin MacLeod CC BY 4.0 credit missing");
  const sec = txt.split(/1\. TIÊU ĐỀ/)[1]?.split(/={5,}\r?\n2\./)[0] ?? "";
  const titles = sec.split(/\r?\n/).map((l) => l.match(/^\d\.\s+(.+?)(\s{2,}\(CHÍNH\))?\s*$/)?.[1]).filter(Boolean);
  if (!titles.length) warn("xuat-ban.txt: no titles found under \"1. TIÊU ĐỀ\"");
  titles.forEach((t) => (t.length > 45 ? bad(`title over 45 characters (${t.length}): "${t}"`) : null));
  if (titles.length && titles.every((t) => t.length <= 45)) ok(`${titles.length} titles ≤ 45 characters; pack is BOM + CRLF plain text`);
} else warn("no xuat-ban.txt yet (Gate 5)");

console.log(errors ? `\n✗ ${errors} problem(s)` : "\n✓ script check passed");
process.exit(errors ? 1 : 0);
