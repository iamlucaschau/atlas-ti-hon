#!/usr/bin/env node
/**
 * Contact sheets for the review loop (.claude/skills/review-loop): one tile per VO line, cut from a render,
 * labelled "<line id> - <seconds>", plus frame 0 and the last frame side by side (soft-loop seam).
 *
 *   node scripts/sheet.mjs p4-malacca-kra                        every VO line, halfway through it
 *   node scripts/sheet.mjs p4-malacca-kra --at 0.9               late in each line (after the cue has landed)
 *   node scripts/sheet.mjs p4-malacca-kra 12.3 14.8 15.2         exact seconds
 *   node scripts/sheet.mjs p4-malacca-kra --from 30 --to 32 --every 0.2   scrub a camera flight
 *
 * Options: --video <mp4> (default: newest of out/<slug>-draft.mp4 and Map/<slug>/<slug>.mp4)
 *          --cols 5  --rows 2  --size 300 (tile width; 9:16 → 300×534)
 * Output:  out/sheets/<slug>-<name>-N.png
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT, episode, ffmpeg, filterPath, labelFont, probe, rel } from "./ep-lib.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = argv[i + 1];
  argv.splice(i, 2);
  return v;
};

try {
  const videoArg = opt("video", null);
  const at = Number(opt("at", "0.5"));
  const every = opt("every", null);
  const from = Number(opt("from", "0"));
  const to = opt("to", null);
  const cols = Number(opt("cols", "5"));
  const rows = Number(opt("rows", "2"));
  const size = Number(opt("size", "300"));
  const ep = episode(argv.shift());

  const video =
    videoArg !== null
      ? path.resolve(videoArg)
      : [path.join(ROOT, "out", `${ep.slug}-draft.mp4`), path.join(ep.dir, `${ep.slug}.mp4`)]
          .filter((f) => fs.existsSync(f))
          .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
  if (!video || !fs.existsSync(video)) {
    throw new Error(`No render of ${ep.slug}. Run \`npm run draft -- ${ep.slug}\` first or pass --video <mp4>.`);
  }
  // Picture length from the frame count: the AAC track runs a few frames longer, and seeking past the
  // last video frame makes ffmpeg exit 0 without writing anything.
  const [num, den] = probe(video, "stream=r_frame_rate").split("/").map(Number);
  const lastFrame = (Number(probe(video, "stream=nb_frames")) - 1) / (num / (den || 1));
  const duration = lastFrame;
  const clamp = (t) => Math.min(Math.max(t, 0), lastFrame);

  /** [label, seconds] */
  let shots;
  let name;
  if (argv.length) {
    shots = argv.map((t) => [`${Number(t).toFixed(2)}s`, clamp(Number(t))]);
    name = "picked";
  } else if (every) {
    const end = to === null ? duration : Number(to);
    shots = [];
    for (let t = from; t <= end + 1e-6; t += Number(every)) shots.push([`${t.toFixed(2)}s`, clamp(t)]);
    name = `every${every}`;
  } else {
    shots = [
      ["frame 0", 0],
      ...ep.timing.lines.map((l) => {
        const t = clamp(l.start + (l.end - l.start) * at);
        return [`${l.id} - ${t.toFixed(2)}s`, t];
      }),
      ["last frame", clamp(duration)],
    ];
    name = "lines";
  }

  const dir = path.join(ROOT, "out", "sheets", `${ep.slug}-${name}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const font = labelFont();
  const label = (text) =>
    `drawtext=fontfile='${filterPath(font)}':text='${text}':x=8:y=8:fontsize=${Math.round(size / 14)}:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=6`;
  shots.forEach(([text, t], i) => {
    const vf = [`scale=${size}:-2`, font && label(text)].filter(Boolean).join(",");
    const file = path.join(dir, `${String(i).padStart(3, "0")}.png`);
    // the very last frame: decode the final half second and keep overwriting, so the last one written wins
    const grab = t >= lastFrame - 0.02 ? ["-sseof", "-0.5", "-i", video, "-update", "1"] : ["-ss", t.toFixed(3), "-i", video, "-frames:v", "1"];
    ffmpeg([...grab, "-vf", vf, file]);
    if (!fs.existsSync(file)) throw new Error(`ffmpeg wrote no frame at ${t.toFixed(2)} s (${text})`);
  });

  const per = cols * rows;
  const sheets = [];
  for (let s = 0; s * per < shots.length; s++) {
    const out = path.join(ROOT, "out", "sheets", `${ep.slug}-${name}-${s + 1}.png`);
    ffmpeg([
      "-framerate", "1",
      "-start_number", String(s * per),
      "-i", path.join(dir, "%03d.png"),
      "-vf", `tile=${cols}x${rows}:padding=6:color=0x333333`,
      "-frames:v", "1",
      out,
    ]);
    sheets.push(rel(out));
  }
  console.log(`${shots.length} frames from ${rel(video)} → ${sheets.length} sheet(s):`);
  sheets.forEach((s) => console.log(`  ${s}`));
  if (!font) console.warn("⚠ no font file found for labels; tiles are unlabelled (order = VO lines).");
} catch (err) {
  console.error(`✗ ${err.message}`);
  process.exitCode = 1;
}
