/**
 * Atlas Tí Hon · P5 Kỳ lạ & kỷ lục · Region Reveal (+ P3 Cause-and-Effect), style I Toy Atlas:
 * "Hang lớn nhất thế giới, tìm thấy rồi lạc mất" (Sơn Đoòng) — Gates 1–4 approved by Lucas 2026-10-26.
 * Script + sources: kich-ban-p5-son-doong-FINAL.md, cong-2_so-nguon.md (C1–C12).
 * Rule 22: "largest" = the largest cave PASSAGE (cross-section, C5); the contested volume / Guinness claim is not shown.
 * The discovery year differs between sources (1990 / 1991) → "early 1990s"; ~18 years until it was found again (C1, C2).
 * Human moment: Hồ Khanh (generic figure, no portrait). Twist: the cave makes its own clouds (C9), the clouds of the hook.
 * Since 1/7/2025 Phong Nha – Kẻ Bàng is in the new Quảng Trị province (C12).
 * Soft loop: the VO ends on line 25; the last frame is the opening frame (Vietnam, a faint dot on Phong Nha).
 *
 * Karst peaks, the cave cross-section, strata, river, doline, the cable-car line and the queue are ILLUSTRATIONS.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p5-son-doong.timing.json";
import words from "../../src/voiceover/p5-son-doong.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type GeoCam, ImgSticker, MapLabel, PegImg, Pulse, Question, seamKeys,
  show, Signature, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, ProvinceMap, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p5-son-doong/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];

/** Every map-anchored thing and the province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  sonDoong: { ll: [106.2875, 17.457], in: "Quảng Trị", year: 2025 },
  hangEn: { ll: [106.27, 17.48], in: "Quảng Trị", year: 2025 },
  road: { ll: [106.4, 17.47], in: "Quảng Trị", year: 2025 },
  karst: { ll: [106.2, 17.55], in: "Quảng Trị", year: 2025 },
  laosTag: { ll: [105.75, 17.25], in: "sea" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

const VN = ATLAS.c;
const QT = "#E0A15A";
const ROCK = "#6F6A63";
const ROCK2 = "#8A847B";
const CAVE = "#1E2328";
const WATER = "#4E93C9";

const VIEW = {
  vn: { lon: 106.4, lat: 16.2, zoom: 24 },
  phongnha: { lon: 106.25, lat: 17.47, zoom: 300 },
  wide: { lon: 106.3, lat: 17.1, zoom: 46 },
  trail: { lon: 106.31, lat: 17.45, zoom: 340 },
  dive: { lon: 106.2875, lat: 17.457, zoom: 1600 },
  cable: { lon: 106.34, lat: 17.47, zoom: 480 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): the camera flies to Phong Nha from frame 1
  { at: 1, ...VIEW.phongnha },
  { at: at("05") + 6, ...VIEW.wide },
  { at: at("08") - 4, ...VIEW.trail },
  { at: at("11"), ...VIEW.dive },
  { at: at("19") - 6, ...VIEW.cable },
  { at: at("23") - 4, ...VIEW.dive },
  { at: at("25", 0.35), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

/** Karst peaks scattered over Phong Nha – Kẻ Bàng (illustration), seeded so they never move between renders. */
const PEAKS: [number, number, number][] = Array.from({ length: 26 }, (_, i) => [
  106.05 + random(`kx${i}`) * 0.42, 17.3 + random(`ky${i}`) * 0.38, 0.7 + random(`ks${i}`) * 0.6,
]);

/** A toy limestone peak (screen space, base centre at 0, 0). */
const Peak: React.FC<{ s: number }> = ({ s }) => (
  <g style={{ scale: s }}>
    <path d="M -46 0 C -40 -40 -22 -78 -6 -84 C 10 -88 22 -60 30 -40 C 36 -24 44 -10 48 0 Z" fill={ROCK2} stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M -24 -50 C -14 -70 4 -76 14 -54" fill="none" stroke="#B4AEA4" strokeWidth={5} strokeLinecap="round" />
    <path d="M -46 0 C -30 -12 -12 -14 4 -8 C 22 -2 36 -6 48 0 Z" fill="#5E8F4E" stroke={ATLAS.ink} strokeWidth={3} />
  </g>
);

/** A puff of cloud / mist (screen space, centre 0, 0). */
const Puff: React.FC<{ w?: number; o?: number }> = ({ w = 1, o = 0.9 }) => (
  <path style={{ scale: w }} opacity={o} fill="#F4F1EA" stroke="#C9C3B8" strokeWidth={3}
    d="M -58 18 Q -70 -12 -38 -16 Q -30 -48 4 -40 Q 30 -60 50 -28 Q 76 -24 66 6 Q 66 22 44 22 L -40 22 Q -58 22 -58 18 Z" />
);

/** Rain over the whole frame (screen space). */
const Rain: React.FC<{ f: number; o: number }> = ({ f, o }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect width={1080} height={1920} fill="#0E1A26" opacity={0.42} />
      {Array.from({ length: 70 }, (_, i) => {
        const x = random(`rx${i}`) * 1180 - 50;
        const y = ((random(`ry${i}`) * 1920 + f * 46) % 2000) - 80;
        return <line key={i} x1={x} y1={y} x2={x - 14} y2={y + 52} stroke="#A9C6DE" strokeWidth={4} strokeLinecap="round" opacity={0.7} />;
      })}
    </svg>
  );
};

/** Cave entrance on the map: a dark mouth under a cliff, wind streaks and clouds blowing out (screen space). */
const Mouth: React.FC<{ x: number; y: number; f: number; o: number; puff: number; k?: number }> = ({ x, y, f, o, puff, k = 1 }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k }}>
        <path d="M -150 40 C -140 -60 -90 -140 -10 -150 C 70 -156 130 -90 150 40 Z" fill={ROCK} stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -150 40 C -120 20 -80 26 -40 18 C 0 12 60 20 150 40 Z" fill="#5E8F4E" stroke={ATLAS.ink} strokeWidth={5} />
        <path d="M -70 30 C -66 -30 -30 -66 6 -66 C 44 -66 70 -30 74 30 Z" fill={CAVE} stroke={ATLAS.ink} strokeWidth={6} />
        {puff > 0 && [0, 1, 2, 3].map((i) => {
          const t = ((f / 60 + i / 4) % 1);
          return (
            <g key={i}>
              <path d={`M ${-20 + i * 14} ${-10 - i * 8} q 60 -10 ${120 + 120 * t} ${-30 - 40 * t}`} fill="none" stroke="#EAF2F8" strokeWidth={6}
                strokeLinecap="round" opacity={puff * (1 - t) * 0.9} />
              <g style={{ translate: `${40 + 220 * t}px ${-40 - 120 * t - i * 10}px`, scale: 0.5 + 0.6 * t }}><Puff o={puff * (1 - t)} /></g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

/** Bushes growing over the cave mouth (lost again), or parting (found again). Screen space. */
const Bushes: React.FC<{ x: number; y: number; p: number; o: number; k: number }> = ({ x, y, p, o, k }) => {
  if (p <= 0 || o <= 0) return null;
  const B: [number, number, number][] = [[-60, 0, 46], [0, -24, 56], [60, 0, 46], [-30, 24, 40], [34, 26, 42], [-90, 30, 34], [92, 32, 34]];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {B.map(([dx, dy, r], i) => (
        <circle key={i} cx={x + dx * k} cy={y + dy * k} r={Math.max(0, r * k * Math.min(1, p * 1.3 - i * 0.04))} fill={i % 2 ? "#4E8A3E" : "#62A04D"} stroke={ATLAS.ink} strokeWidth={4} />
      ))}
    </svg>
  );
};

/** A two-line debate card (screen space). */
const Side: React.FC<{ y: number; head: string; body: string; color: string; o: number; k: number }> = ({ y, head, body, color, o, k }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${CX}px ${y}px`, scale: k }}>
        <rect x={-400} y={-80} width={800} height={160} rx={26} fill={ATLAS.white} fillOpacity={0.96} stroke={color} strokeWidth={8} />
        <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={color} stroke={ATLAS.ink} strokeWidth={2}>{head}</text>
        <text y={48} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{body}</text>
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ the cave cross-section (screen space, illustration) */

/** Cavity of the cave passage; drawn at full size, scaled from its floor (CAVE_O) while the river carves it. */
const CAVITY = "M 110 1300 C 104 1040 150 760 300 590 C 420 455 560 405 690 430 C 820 455 905 600 930 820 C 950 1000 950 1180 970 1300 Z";
const CAVE_O = { x: 560, y: 1300 };
/** Doline (collapsed ceiling) above the right half of the passage. */
const DOLINE = "M 640 250 L 800 250 C 790 330 775 390 760 445 L 650 432 C 650 380 645 320 640 250 Z";

const CrossSection: React.FC<{
  f: number; o: number; reveal: number; grow: number; strata: number; layers: number; crack: number; river: number; doline: number; forest: number; clouds: number;
}> = ({ f, o, reveal, grow, strata, layers, crack, river, doline, forest, clouds }) => {
  if (o <= 0) return null;
  const r = 60 + 1500 * reveal; // laser sweep radius from the instrument at bottom left
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <defs>
          <clipPath id="sd-sweep"><circle cx={150} cy={1260} r={r} /></clipPath>
          <linearGradient id="sd-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF4C8" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#FFF4C8" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* ground above, rock body */}
        <rect width={1080} height={1920} fill="#2A2E33" />
        <rect y={170} width={1080} height={80} fill="#5E8F4E" />
        <rect y={250} width={1080} height={1150} fill={ROCK} />
        {/* strata: limestone layers, 400 million years */}
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M 0 ${300 + i * 100} C 300 ${290 + i * 100} 700 ${312 + i * 100} 1080 ${296 + i * 100}`} fill="none"
            stroke={i % 2 ? "#7E786F" : "#5F5A53"} strokeWidth={10 + 10 * strata} pathLength={1}
            opacity={(0.35 + 0.5 * strata) * (layers >= 1 ? 1 : interpolate(layers * 11 - (10 - i), [0, 1], [0.15, 1], CLAMP))} />
        ))}
        {/* the crack the river followed */}
        {crack > 0 && (
          <path d="M 520 250 L 560 420 L 520 600 L 590 820 L 540 1040 L 580 1300" fill="none" stroke="#2A2620" strokeWidth={10}
            strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - crack }} />
        )}
        {/* the passage itself, revealed by the laser and carved by the river */}
        <g clipPath="url(#sd-sweep)">
          <g style={{ transformOrigin: `${CAVE_O.x}px ${CAVE_O.y}px`, scale: `${0.04 + 0.96 * grow} ${0.02 + 0.98 * grow}` }}>
            <path d={CAVITY} fill={CAVE} stroke="#0E1115" strokeWidth={8} />
            {/* stalactites */}
            {[330, 420, 520, 610, 760, 840].map((x, i) => (
              <path key={x} d={`M ${x - 14} ${560 - (i % 3) * 30 - (x > 500 && x < 700 ? 100 : 0)} l 14 ${50 + (i % 2) * 30} l 14 ${-50 - (i % 2) * 30} Z`}
                fill="#4A4640" opacity={x > 640 && x < 800 ? 1 - doline : 1} />
            ))}
          </g>
        </g>
        {/* the doline: the ceiling collapsed, sunlight falls in */}
        {doline > 0 && (
          <g opacity={doline}>
            <path d={DOLINE} fill={CAVE} />
            <rect x={640} y={170} width={160} height={80} fill="#9FD0F0" />
            <path d="M 650 250 L 800 250 L 880 1290 L 560 1290 Z" fill="url(#sd-sun)" opacity={0.8 * doline} />
          </g>
        )}
        {/* the underground river */}
        {river > 0 && (
          <g opacity={river}>
            <path d="M 110 1300 C 300 1260 600 1290 970 1300 L 970 1340 L 110 1340 Z" fill={WATER} />
            <path d="M 140 1300 C 260 1290 380 1305 500 1296" fill="none" stroke="#A8D3F0" strokeWidth={6} strokeDasharray="40 60" strokeDashoffset={-f * 3} />
          </g>
        )}
        {/* clouds under the ceiling (twist) */}
        {clouds > 0 && [0, 1, 2, 3, 4].map((i) => {
          const x = 320 + i * 120 + 30 * Math.sin(f / 40 + i);
          const y = 560 + (i % 2) * 70 - 40 * clouds;
          return <g key={i} style={{ translate: `${x}px ${y}px`, scale: 0.9 + 0.3 * (i % 2) }}><Puff o={0.85 * clouds} /></g>;
        })}
      </svg>
      {forest > 0 && (
        <Img src={staticFile(`${IMG}/c-05-rung-gieng-troi.png`)} style={{
          position: "absolute", left: 720, top: 1300, width: 330 * forest, translate: "-50% -100%", opacity: Math.min(1, forest * 1.5),
        }} />
      )}
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  const qt = interpolate(cam.zoom, [24, 60], [0, 1], CLAMP);
  const layer = (z: number) => (
    <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} fills={qt > 0 ? [{ name: "Quảng Trị", color: QT }] : []} />
  );
  const [ex, ey] = S(P("sonDoong"));
  const close = interpolate(cam.zoom, [150, 260], [0, 1], CLAMP); // the cave mouth, bushes
  const near = close * interpolate(cam.zoom, [700, 1100], [1, 0], CLAMP); // karst peaks fade while diving in
  const keepClear: LL[] = [P("sonDoong"), P("hangEn"), P("road")].map((ll) => S(ll));

  // cross-section on screen: 11–18 and 23–24
  const crossO = Math.max(show(f, at("11", 0.35), at("19") - 6), show(f, at("23") + 4, at("25", 0.3)));
  // 16–18: the passage rewinds to rock, then the river carves it again
  const rewind = prog(f, at("16"), 24, ease);
  const carve = prog(f, at("17", 0.15), Math.round(at("18") - at("17", 0.15)), ease);
  const grow = f < at("16") ? 1 : f < at("19") ? Math.max(1 - rewind, carve) : 1;

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />

      {/* a faint dot on Phong Nha on the wide map (the loop frame is never empty) */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: interpolate(cam.zoom, [26, 60], [1, 0], CLAMP) }}>
        <circle cx={ex} cy={ey} r={12 + 4 * Math.sin(f / 10)} fill={ATLAS.gold} fillOpacity={0.35} />
        <circle cx={ex} cy={ey} r={8} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={4} />
      </svg>

      {/* karst peaks of Phong Nha – Kẻ Bàng (illustration) on the close views */}
      {near > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: near }}>
          {PEAKS.map(([lo, la, s], i) => {
            const [x, y] = S([lo, la]);
            if (keepClear.some(([cx, cy]) => Math.hypot(x - cx, y - cy) < 170)) return null; // keep the mouth, the cable and its pins clear
            return <g key={i} style={{ translate: `${x}px ${y}px` }}><Peak s={s * Math.min(cam.zoom / 300, 1.2) * 1.1} /></g>;
          })}
        </svg>
      )}
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={P("laosTag")} from={20} o={show(f, 20, at("05")) + show(f, at("19"), at("21"))} />

      {/* ── 01–04 a man shelters from the rain; wind and cloud blow out of a cave; he never finds it again ── */}
      <Rain f={f} o={show(f, 2, at("05"))} />
      <Mouth x={ex} y={ey} f={f} o={close * Math.max(show(f, 4, at("05") + 6), show(f, at("08"), at("11", 0.5)))}
        puff={show(f, at("02"), at("04", 0.6))} k={Math.min(cam.zoom / 300, 2.2)} />
      <Bushes x={ex} y={ey + 6 * (cam.zoom / 300)} k={cam.zoom / 300} o={close}
        p={f < at("08") ? prog(f, at("04"), 30, ease) : 1 - prog(f, at("09", 0.4), 24, ease)} />
      {f >= 10 && f < at("05") + 4 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("05"), 6) }}>
          <PegImg src={`${IMG}/c-01-nguoi-di-rung.png`} x={ex - 260} y={ey + 220} h={320} f={f} at={12} />
        </AbsoluteFill>
      )}
      <YearRibbon text="ĐẦU THẬP NIÊN 1990" f={f} at={8} out={at("04")} />
      <Question x={ex} y={ey - 200} f={f} at={at("04", 0.5)} out={at("05")} s={1.2} />

      {/* ── 05–07 the cave: Sơn Đoòng, the largest cave passage in the world ── */}
      <CityPin cam={cam} f={f} label="SƠN ĐOÒNG" at={P("sonDoong")} from={at("06")} o={show(f, at("06"), at("08") - 2)} side="right" />
      {f >= at("06") && f < at("08") && <Pulse x={ex} y={ey} f={f} color={ATLAS.gold} period={40} o={1 - prog(f, at("08") - 6, 5)} />}
      <DataCard value="LỐI HANG LỚN NHẤT" label="THẾ GIỚI" x={CX} y={330} f={f} at={at("07")} out={at("08")} size={84} />

      {/* ── 08–10 Hồ Khanh; 18 years later he finds it again; 2009 Howard Limbert's team goes down ── */}
      {f >= at("08") && f < at("11", 0.6) && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("11", 0.4), 8) }}>
          <PegImg src={`${IMG}/c-01-nguoi-di-rung.png`} x={ex - 250} y={ey + 230} h={300} f={f} at={at("08")} />
          {f >= at("10") && <PegImg src={`${IMG}/c-02-nha-tham-hiem.png`} x={ex + 240} y={ey + 230} h={290} f={f} at={at("10", 0.2)} />}
        </AbsoluteFill>
      )}
      <MapLabel text="HỒ KHANH" x={Math.max(250, ex - 250)} y={ey + 310} o={show(f, at("08", 0.3), at("10"))} size={52} />
      <DataCard value="18 NĂM" label="MỚI TÌM LẠI" x={CX} y={330} f={f} at={at("09", 0.1)} out={at("10")} size={100} />
      <YearRibbon text="2009" f={f} at={at("10", 0.05)} out={at("11", 0.4)} />
      <MapLabel text="HOWARD LIMBERT" x={Math.min(700, ex + 240)} y={ey + 310} o={show(f, at("10", 0.45), at("11", 0.4))} size={50} />

      {/* ── 11–18 inside: the laser survey; ~200 m high, a skyscraper fits; no lift; water: limestone, a river along a crack, a doline, a forest ── */}
      <CrossSection f={f} o={crossO}
        reveal={f < at("23") ? prog(f, at("11", 0.35), Math.round(at("12") - at("11", 0.35)), ease) : 1}
        grow={grow}
        strata={show(f, at("16"), at("17", 0.4))}
        layers={f < at("16") || f >= at("17") ? 1 : prog(f, at("16") + 6, Math.round(at("17") - at("16") - 6))}
        crack={f >= at("19") ? 0 : prog(f, at("17"), 18, ease)}
        river={f >= at("23") ? 1 : f >= at("17") ? prog(f, at("17"), 12) : 0}
        doline={f >= at("23") ? 1 : prog(f, at("18", 0.15), 16, ease)}
        forest={f >= at("23") ? 1 : prog(f, at("18", 0.45), 24, ease)}
        clouds={prog(f, at("24", 0.1), 30, ease)} />
      {crossO > 0 && f < at("19") && (
        <AbsoluteFill style={{ opacity: crossO }}>
          {f < at("12") + 10 && (
            <AbsoluteFill style={{ opacity: 1 - prog(f, at("12"), 8) }}>
              <PegImg src={`${IMG}/c-06-may-laser.png`} x={170} y={1290} h={240} f={f} at={at("11", 0.4)} />
            </AbsoluteFill>
          )}
          {f >= at("12") && f < at("14") + 6 && (
            <Img src={staticFile(`${OLD}/p2-met-vuong-bac-ty/cut/t-03-thap-cao-tang.png`)} style={{
              position: "absolute", left: 420, top: 1296, height: 760 * prog(f, at("12"), 18, ease), translate: "-50% -100%",
              opacity: 1 - prog(f, at("14"), 6),
            }} />
          )}
          {f >= at("12") && f < at("15") && (
            <AbsoluteFill style={{ opacity: 1 - prog(f, at("14") + 4, 6) }}>
              <PegImg src={`${IMG}/c-02-nha-tham-hiem.png`} x={760} y={1296} h={230} f={f} at={at("12") + 4} />
            </AbsoluteFill>
          )}
          {/* the joke: a lift button, pressed, nothing happens */}
          {f >= at("13") && f < at("14") && (() => {
            const press = interpolate(f, [at("13", 0.35), at("13", 0.45), at("13", 0.55)], [0, 1, 0], CLAMP);
            return (
              <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("14") - 5, 5) }}>
                <g style={{ translate: "880px 1120px" }}>
                  <rect x={-40} y={-70} width={80} height={140} rx={14} fill="#C9CED3" stroke={ATLAS.ink} strokeWidth={5} />
                  <circle cy={-22} r={22 - 4 * press} fill={press > 0.5 ? ATLAS.gold : "#F2F2F2"} stroke={ATLAS.ink} strokeWidth={4} />
                  <path d="M -10 -18 L 0 -32 L 10 -18 Z" fill={ATLAS.ink} />
                  <circle cy={30} r={22} fill="#F2F2F2" stroke={ATLAS.ink} strokeWidth={4} />
                </g>
              </svg>
            );
          })()}
          <Question x={880} y={980} f={f} at={at("13", 0.65)} out={at("14")} s={0.9} />
          <DataCard value="CAO TỚI ~200 M" label="LỐI HANG" x={CX} y={330} f={f} at={at("12", 0.4)} out={at("14")} size={92} />
          {/* 14–15 why so huge? water: a drop falls */}
          <Question x={CX} y={760} f={f} at={at("14", 0.3)} out={at("15")} s={1.3} />
          {f >= at("15") - 4 && f < at("16") + 10 && (() => {
            const t = prog(f, at("15") - 4, 22, Easing.in(Easing.quad));
            return (
              <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("16") + 4, 6) }}>
                <path d="M 0 -40 C 18 -14 28 4 28 18 C 28 36 14 46 0 46 C -14 46 -28 36 -28 18 C -28 4 -18 -14 0 -40 Z" fill={WATER}
                  stroke={ATLAS.ink} strokeWidth={5} style={{ translate: `${CX}px ${700 + 560 * t}px`, scale: 1.5 }} />
              </svg>
            );
          })()}
          <DataCard value="NƯỚC" x={CX} y={330} f={f} at={at("15")} out={at("16")} size={110} />
          <DataCard value="~400 TRIỆU NĂM" label="ĐÁ VÔI PHONG NHA" x={CX} y={330} f={f} at={at("16", 0.25)} out={at("17")} size={88} />
          <DataCard value="SÔNG NGẦM KHOÉT" label="VÀI TRIỆU NĂM" x={CX} y={330} f={f} at={at("17", 0.2)} out={at("18")} size={84} />
          <DataCard value="GIẾNG TRỜI" label="RỪNG TRONG HANG" x={CX} y={330} f={f} at={at("18", 0.3)} out={at("19") - 6} size={92} />
        </AbsoluteFill>
      )}

      {/* ── 19–22 two sides: a cable car to Hang Én (2017) ↔ UNESCO; ~1,000 visitors a year ── */}
      {(() => {
        const a = S(P("road"));
        const b = S(P("hangEn"));
        const p = prog(f, at("19", 0.2), 30, ease);
        const o = show(f, at("19"), at("21"));
        if (o <= 0) return null;
        return (
          <>
            <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
              <path d={`M ${a[0]} ${a[1]} L ${a[0] + (b[0] - a[0]) * p} ${a[1] + (b[1] - a[1]) * p}`} stroke={ATLAS.ink} strokeWidth={6} strokeDasharray="18 14" />
              <circle cx={a[0]} cy={a[1]} r={10} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={4} />
            </svg>
            <AbsoluteFill style={{ opacity: o * (1 - 0.5 * prog(f, at("20"), 10)) }}>
              <ImgSticker src={`${IMG}/c-04-cabin-cap-treo.png`} x={a[0] + (b[0] - a[0]) * p} y={a[1] + (b[1] - a[1]) * p + 40} w={150} f={f} at={at("19", 0.2)} />
            </AbsoluteFill>
          </>
        );
      })()}
      <CityPin cam={cam} f={f} label="HANG ÉN" at={P("hangEn")} from={at("19", 0.5)} o={show(f, at("19", 0.5), at("21"))} side="above" />
      <CityPin cam={cam} f={f} label="SƠN ĐOÒNG" at={P("sonDoong")} from={at("19", 0.5)} o={show(f, at("19", 0.5), at("21"))} side="left" />
      <Side y={350} head="THỦ TƯỚNG · 2017" body="CÁP TREO TỚI HANG ÉN" color="#2C5476" o={show(f, at("19", 0.3), at("21"))} k={prog(f, at("19", 0.3), 8, ease)} />
      <Side y={1180} head="UNESCO" body="HỦY CÁP TREO SƠN ĐOÒNG" color="#C8322B" o={show(f, at("20"), at("21"))} k={prog(f, at("20"), 8, ease)} />
      {/* the viewer: a queue at the cave, only a few get in */}
      {f >= at("21") + 4 && f < at("23") + 4 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("23") - 4, 6) }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <PegImg key={i} src={`${IMG}/c-02-nha-tham-hiem.png`} x={250 + i * 105 - (i === 0 ? 120 * prog(f, at("22", 0.3), 20, ease) : 0)} y={1250} h={170}
              f={f + i * 5} at={at("21") + 6 + i * 2} o={i === 0 ? 1 - prog(f, at("22", 0.6), 10) : 0.55} />
          ))}
        </AbsoluteFill>
      )}
      <DataCard value="~1.000 NGƯỜI" label="MỖI NĂM ĐƯỢC VÀO" x={CX} y={330} f={f} at={at("21", 0.5)} out={at("23")} size={96} />

      {/* ── 23–25 the clouds of that day: the cave makes its own; they drift out and become the sky over the map ── */}
      <Question x={CX} y={700} f={f} at={at("23", 0.3)} out={at("24")} s={1.2} />
      <DataCard value="MÂY TRONG HANG" x={CX} y={330} f={f} at={at("24", 0.3)} out={at("25", 0.3)} size={96} />
      {f >= at("25", 0.25) && f < END - 8 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("25", 0.25), 8), 1 - prog(f, END - 26, 14)) }}>
          {[0, 1, 2].map((i) => {
            const t = prog(f, at("25", 0.3) + i * 6, 60, ease);
            return <g key={i} style={{ translate: `${ex + 30 + i * 50}px ${ey - 40 - 260 * t}px`, scale: 0.7 + 0.5 * t }}><Puff o={1 - 0.6 * t} /></g>;
          })}
        </svg>
      )}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Đầu những năm *1990*, một người đi rừng ở Phong Nha trú mưa dưới vách đá.",
  "02": "Từ một cửa hang bên cạnh, *gió lạnh và mây* thổi ra.",
  "06": "*Sơn Đoòng.*",
  "08": "Người đi rừng tên là *Hồ Khanh*.",
  "09": "*18 năm* sau, ông mới tìm lại được cửa hang.",
  "10": "Năm *2009*, ông dẫn đoàn thám hiểm Anh của *Howard Limbert* xuống.",
  "12": "Có đoạn cao gần *200 mét*, đủ chứa cả một dãy nhà chọc trời.",
  "15": "*Nước.*",
  "16": "Khối đá vôi ở đây có từ khoảng *400 triệu năm*.",
  "19": "Năm *2017*, Thủ tướng đồng ý chủ trương làm cáp treo tới hang Én gần đó, để đón thêm khách.",
  "22": "Mỗi năm chỉ khoảng *1.000 người* được đi.",
  "24": "Hang lớn đến mức *tự sinh ra mây*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PIANO = "hit/cinematic-piano-hit-567216.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// Mixkit Sound Effects Free License (Lucas 2026-10-26: Pixabay blocked by its bot check; Bible §6)
const RAIN = "ambience/mixkit-calm-thunderstorm-jungle-2415.mp3";
const DRIP = "ambience/mixkit-water-drop-cave-3179.mp3";
const WIND = "ambience/mixkit-transition-windy-swoosh-1474.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real SFX only, max one per beat
const SFX: SfxCue[] = [
  [RAIN, "01", 0, -1, -24], [WH, "06", 0, -2], [CLICK, "09", 0.1], [WH2, "11", 0.3], [CLICK, "13", 0.4], [DRIP, "15", 0, -6, -16],
  [WH, "19", 0, -6], [CLICK, "22", 0.2], [WH2, "23", 0, -4], [WIND, "24", 0.1, 0, -20], [PIANO, "25", 0.3, 0, -22],
];

/** Music duck: lower in the rain and under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f,
  [0, 10, at("04", 1), at("05") + 6, at("23") - 6, at("23") + 6, at("25", 1) - 4, at("25", 1) + 6],
  [0.7, 0.6, 0.6, 1, 1, 0.5, 0.5, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => <Signature f={useCurrentFrame()} cuts={KEYS0.map((c) => c.at)} end={END} spots={[2, 0, 1, 1, 1, 1, 2, 0]} />;

export const P5SonDoong: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p5-son-doong/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P5} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p5SonDoongDuration = (fps: number) => episodeDuration(timing, fps);
