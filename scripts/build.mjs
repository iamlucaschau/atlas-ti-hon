#!/usr/bin/env node
/**
 * One-command render for an episode, the same on Windows and macOS/Linux (no shell, no printf).
 *
 *   npm run draft -- p4-malacca-kra    half-size render with the safe-zone overlay → out/<slug>-draft.mp4,
 *                                      then contact sheets (scripts/sheet.mjs) for the review loop
 *   npm run final -- p4-malacca-kra    full render → master (Bible §6) → Map/<slug>/<slug>.mp4, then checks
 *                                      loudness, true peak and the loop seam (last frame vs frame 0); exits 1 if one fails
 *
 * Before rendering, the geo check (scripts/geo-check.mjs) verifies the episode's PLACES; a wrong one stops the build.
 *
 * Options: --keep-raw (keep out/<slug>-raw.mp4)
 *          --loop-preview (also write Map/<slug>/<slug>-loop-preview-x2.mp4; off by default since Lucas 2026-10-20)
 *          --check-only (final: only re-run the checks on the existing Map/<slug>/<slug>.mp4)
 */
import fs from "node:fs";
import path from "node:path";
import { FPS, ROOT, episode, ffmpeg, ffmpegLog, probe, rel, remotion, run } from "./ep-lib.mjs";
import { geoCheck } from "./geo-check.mjs";

/**
 * Master chain, Bible §6 / 04_QUY-TRINH-SAN-XUAT §6. Limiter 0.66 (was 0.72, Lucas 2026-10-18): short SFX are
 * boosted up to +12 dB to reach −15 LUFS and clip the raw mix; with 0.72 the P3 master came out at −0.9 dBTP after AAC.
 */
const MASTER_AF = "loudnorm=I=-14:TP=-2:LRA=11,aresample=48000,alimiter=limit=0.66:level=false";
const TARGET_LUFS = -14;
const LUFS_TOLERANCE = 1;
const MAX_PEAK = -1.5; // dBFS, measured with ebur128 true peak
// Last frame vs frame 0 (seamKeys), above the subtitle band (captions follow the VO, so they differ by design).
// Sea texture and moving ships keep a good seam below 1: p4 measured 0.966, while frame 0 vs frame 15 (half a
// second off) gave 0.78 and a different scene ~0.6 (2026-10-18).
const MIN_SEAM_SSIM = 0.9;
const SEAM_CROP = "crop=1080:1300:0:0";

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const draft = flag("--draft");

const draftRender = (ep) => {
  const out = path.join(ROOT, "out", `${ep.slug}-draft.mp4`);
  remotion(["render", ep.id, out, "--scale=0.5", "--crf=26", '--props={"safeGuide":true}']);
  console.log(`\n✓ ${rel(out)}\n`);
  run(process.execPath, [path.join(ROOT, "scripts", "sheet.mjs"), ep.slug, "--video", out]);
};

const loudness = (file) => {
  const log = ffmpegLog(["-i", file, "-af", "ebur128=peak=true", "-f", "null", "-"]);
  const last = (re) => Number([...log.matchAll(re)].pop()?.[1]);
  return { lufs: last(/I:\s+(-?[\d.]+) LUFS/g), peak: last(/Peak:\s+(-?[\d.]+|-inf) dBFS/g) };
};

const seamSsim = (file) => {
  const frames = Number(probe(file, "stream=nb_frames"));
  const tmp = path.join(ROOT, "out", "seam");
  fs.mkdirSync(tmp, { recursive: true });
  const first = path.join(tmp, "first.png");
  const last = path.join(tmp, "last.png");
  ffmpeg(["-i", file, "-vf", "select=eq(n\\,0)", "-frames:v", "1", first]);
  ffmpeg(["-i", file, "-vf", `select=eq(n\\,${frames - 1})`, "-frames:v", "1", last]);
  const log = ffmpegLog(["-i", first, "-i", last, "-lavfi", `[0]${SEAM_CROP}[a];[1]${SEAM_CROP}[b];[a][b]ssim`, "-f", "null", "-"]);
  fs.rmSync(tmp, { recursive: true, force: true });
  return Number(log.match(/All:([\d.]+)/)?.[1]);
};

const checkMaster = (ep, master) => {
  const { lufs, peak } = loudness(master);
  const ssim = ep.timing.loop ? seamSsim(master) : null;
  const checks = [
    [`loudness ${lufs} LUFS (target ${TARGET_LUFS} ±${LUFS_TOLERANCE})`, Math.abs(lufs - TARGET_LUFS) <= LUFS_TOLERANCE],
    [`true peak ${peak} dBFS (≤ ${MAX_PEAK})`, peak <= MAX_PEAK],
    ...(ssim === null ? [] : [[`loop seam SSIM ${ssim.toFixed(3)} (≥ ${MIN_SEAM_SSIM})`, ssim >= MIN_SEAM_SSIM]]),
  ];
  console.log("");
  checks.forEach(([text, ok]) => console.log(`${ok ? "✓" : "✗"} ${text}`));
  const frames = Number(probe(master, "stream=nb_frames"));
  console.log(`  ${frames} frames, ${(frames / FPS).toFixed(2)} s`);
  if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
};

const finalRender = (ep) => {
  const raw = path.join(ROOT, "out", `${ep.slug}-raw.mp4`);
  const master = path.join(ep.dir, `${ep.slug}.mp4`);
  if (flag("--check-only")) {
    if (!fs.existsSync(master)) throw new Error(`${rel(master)} does not exist; run without --check-only.`);
    console.log(`Checking ${rel(master)}`);
    return checkMaster(ep, master);
  }
  remotion(["render", ep.id, raw, "--crf=18"]);

  console.log("\nMastering…");
  ffmpeg(["-i", raw, "-c:v", "copy", "-af", MASTER_AF, "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart", master]);
  console.log(`✓ ${rel(master)} (${(fs.statSync(master).size / 1024 / 1024).toFixed(1)} MB)`);

  if (flag("--loop-preview")) {
    const list = path.join(ROOT, "out", "concat.txt");
    const line = `file '${master.replace(/\\/g, "/").replace(/'/g, "'\\''")}'\n`;
    fs.writeFileSync(list, line + line);
    const loop = path.join(ep.dir, `${ep.slug}-loop-preview-x2.mp4`);
    ffmpeg(["-f", "concat", "-safe", "0", "-i", list, "-c", "copy", loop]);
    fs.rmSync(list);
    console.log(`✓ ${rel(loop)}`);
  }
  if (!flag("--keep-raw")) fs.rmSync(raw);
  checkMaster(ep, master);
};

try {
  const ep = episode(args.find((a) => !a.startsWith("--")));
  console.log(`${ep.slug} → ${ep.id} (${draft ? "draft" : "final"})\n`);
  // labels, faces and props must sit in their province (Lucas 2026-10-22); stops before rendering
  if (geoCheck(ep.slug)) throw new Error("geo check failed: fix PLACES in Video.tsx before rendering");
  console.log("");
  (draft ? draftRender : finalRender)(ep);
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exitCode = 1;
}
