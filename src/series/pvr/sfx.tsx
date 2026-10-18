import { Audio } from "@remotion/media";
import { interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import catalog from "../../../public/sfx/catalog.json";

/**
 * One real sound effect from the curated Pixabay library (public/sfx,
 * scripts/fetch-sfx.mjs). Every file is levelled from its measured loudness
 * to `level` LUFS so a whoosh and a deep hit sit at the same height under
 * the VO (−14 LUFS). Default −15 (Lucas 2026-10-08: −26 and −18 were too quiet): an accent at about voice level.
 *
 *   <Sfx file="sfx/whoosh/clean-whoosh-382726.mp3" at={at("12")} />
 */
export const Sfx: React.FC<{ file: string; at: number; level?: number }> = ({
  file,
  at,
  level = -15,
}) => {
  const entry = catalog.find((c) => c.file === file);
  if (!entry) throw new Error(`SFX not in public/sfx/catalog.json: ${file}`);
  const gain = Math.min(4, 10 ** ((level - (entry.lufs ?? level)) / 20));
  return (
    <Sequence from={Math.round(at)} name={`SFX ${entry.title}`} layout="none">
      <Audio src={staticFile(file)} volume={gain} />
    </Sequence>
  );
};

/** [file under sfx/, VO line id, fraction through the line, frame offset, LUFS level] */
export type SfxCue = [string, string, number?, number?, number?];

/** A whole SFX track cued from the VO timing (same cues as the visuals). */
export const SfxCues: React.FC<{
  timing: { lines: { id: string; start: number; end: number }[] };
  cues: SfxCue[];
}> = ({ timing, cues }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {cues.map(([file, id, k = 0, off = 0, level], i) => {
        const l = timing.lines.find((x) => x.id === id);
        if (!l) throw new Error(`SFX cue: no VO line ${id}`);
        const at = (l.start + (l.end - l.start) * k) * fps + off;
        return <Sfx key={i} file={`sfx/${file}`} at={Math.max(0, at)} level={level} />;
      })}
    </>
  );
};

/**
 * Licensed music bed from the catalog (public/sfx/music; Kevin MacLeod CC BY 4.0 since 2026-10-17), levelled from
 * its measured loudness to `level` LUFS (−28 ≈ the old bed-bright at volume 0.2, ~14 dB under
 * the VO before mastering). Short fades at both ends keep the loop seam soft; `duck(frame)`
 * (0–1) dips it, e.g. under a climax. Tracks are longer than the episodes, so no loop.
 *
 *   <MusicBed file={PILLAR_MUSIC.P2} duck={(f) => …} />
 */
export const MusicBed: React.FC<{ file: string; level?: number; duck?: (f: number) => number }> = ({
  file,
  level = -28,
  duck = () => 1,
}) => {
  const { durationInFrames, fps } = useVideoConfig();
  const entry = catalog.find((c) => c.file === file);
  if (!entry) throw new Error(`Music not in public/sfx/catalog.json: ${file}`);
  const gain = Math.min(4, 10 ** ((level - (entry.lufs ?? level)) / 20));
  const fade = Math.round(0.3 * fps);
  return (
    <Audio
      name={`Music ${entry.title}`}
      src={staticFile(file)}
      volume={(f) =>
        gain * duck(f) * interpolate(f, [0, fade, durationInFrames - fade, durationInFrames], [0, 1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      }
    />
  );
};

/**
 * Map channel: one music bed per pillar. Lucas 2026-10-17: Kevin MacLeod (incompetech.com), CC BY 4.0 —
 * every episode description must credit the track ("Title" Kevin MacLeod (incompetech.com) + licence line,
 * Bible §6). Replaced the Pixabay beds: all of them are "Content ID Registered" and the P4 episode was blocked
 * worldwide (2026-10-17). Alternates per pillar: PILLAR_MUSIC_ALT.
 */
export const PILLAR_MUSIC = {
  P1: "sfx/music/p1-heroic-age-km.mp3",
  P2: "sfx/music/p2-wallpaper-km.mp3",
  P3: "sfx/music/p3-floating-cities-km.mp3",
  P4: "sfx/music/p4-ascending-the-vale-km.mp3",
  P5: "sfx/music/p5-investigations-km.mp3",
} as const;

export const PILLAR_MUSIC_ALT = {
  P1: "sfx/music/p1-lightless-dawn-km.mp3",
  P2: "sfx/music/p2-inspired-km.mp3",
  P3: "sfx/music/p3-ether-vox-km.mp3",
  P4: "sfx/music/p4-crossing-the-chasm-km.mp3",
  P5: "sfx/music/p5-sneaky-snitch-km.mp3",
} as const;
