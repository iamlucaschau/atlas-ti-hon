/**
 * Shared helpers for scripts/sheet.mjs and scripts/build.mjs.
 *
 * Episodes are found by folder slug ("p4-malacca-kra", "Map/p4-malacca-kra" or the composition id):
 * src/Root.tsx imports each episode's component from ../Map/<slug>/Video and registers it under an id,
 * so the slug → id map is read from there and a new episode needs no change here.
 *
 * Every tool is spawned without a shell (Remotion through node + its CLI file, not npx), so JSON props and
 * paths with spaces work the same in PowerShell, cmd and bash.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const FPS = 30; // src/series/pvr/theme.ts (PVR.fps)
export const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

export const episodes = () => {
  const root = fs.readFileSync(path.join(ROOT, "src", "Root.tsx"), "utf8");
  const slugOf = new Map(
    [...root.matchAll(/import\s*\{\s*(\w+)[^}]*\}\s*from\s*"\.\.\/Map\/([^/"]+)\/Video"/g)].map((m) => [m[1], m[2]]),
  );
  return [...root.matchAll(/\{\s*id:\s*"([^"]+)",\s*component:\s*(\w+)/g)]
    .filter((m) => slugOf.has(m[2]))
    .map((m) => ({ id: m[1], slug: slugOf.get(m[2]) }));
};

export const episode = (arg) => {
  if (!arg) throw new Error("Missing episode, e.g. p4-malacca-kra");
  const key = path.basename(arg.replace(/[\\/]+$/, ""));
  const all = episodes();
  const ep = all.find((e) => e.slug === key || e.id === key);
  if (!ep) throw new Error(`Unknown episode "${arg}". Known: ${all.map((e) => e.slug).join(", ")}`);
  const timingFile = path.join(ROOT, "src", "voiceover", `${ep.slug}.timing.json`);
  return {
    ...ep,
    dir: path.join(ROOT, "Map", ep.slug),
    timing: JSON.parse(fs.readFileSync(timingFile, "utf8")),
  };
};

export const run = (cmd, args, { quiet = false } = {}) => {
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: quiet ? "pipe" : ["ignore", "inherit", "inherit"],
  });
  if (r.error) throw r.error;
  if (r.status !== 0) {
    throw new Error(`${path.basename(cmd)} ${args[0]} failed (exit ${r.status})${quiet ? `\n${(r.stderr ?? "").slice(-2000)}` : ""}`);
  }
  return r;
};

const REMOTION = path.join(ROOT, "node_modules", "@remotion", "cli", "remotion-cli.js");
export const remotion = (args) => run(process.execPath, [REMOTION, ...args]);

export const FFMPEG = process.env.FFMPEG_PATH ?? "ffmpeg";
export const ffmpeg = (args) => run(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { quiet: true });
/** ffmpeg run for its log (analysis filters print to stderr). */
export const ffmpegLog = (args) =>
  spawnSync(FFMPEG, ["-hide_banner", "-nostats", ...args], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).stderr ?? "";

export const probe = (file, entries) =>
  spawnSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", entries, "-of", "csv=p=0", file], {
    encoding: "utf8",
  })
    .stdout.trim()
    .replace(/,+$/, ""); // csv output can end in an empty side-data field: "2107,"

/** A font file for ffmpeg drawtext labels, or null (labels are then skipped). */
export const labelFont = () =>
  [
    "C:/Windows/Fonts/arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/TTF/DejaVuSans.ttf",
  ].find((f) => fs.existsSync(f)) ?? null;

/** Escape a path for an ffmpeg filter option (the drive colon is an option separator). */
export const filterPath = (p) => p.replace(/\\/g, "/").replace(/:/g, "\\:");
