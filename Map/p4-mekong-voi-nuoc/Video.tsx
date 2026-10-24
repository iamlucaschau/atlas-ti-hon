/**
 * Atlas Tí Hon · P4 Tuyến đường & hành trình · Journey Route (+ Cause-and-Effect), style I Toy Atlas:
 * "Mekong: ai giữ vòi nước của 6 quốc gia?" — Gates 1–4 approved by Lucas 2026-10-23/24.
 * Script + sources: kich-ban-p4-mekong-voi-nuoc-FINAL.md, cong-2_so-nguon.md (C1–C19).
 * Human moment: Alan Basist (Eyes on Earth) reads the upstream reservoirs from satellites (4/2020). Line 19 is the
 * Mekong Delta talking (`MapFace`, cast "mientay" = Puck). Twist: the Tonle Sap river flows backwards into the
 * lake every wet season; in the dry season the lake gives back ~40 bn m³ (C13), close to the 11 reservoirs' ~42 bn m³.
 * Soft loop: the VO ends on line 24; the last frame is the opening frame (the whole basin, river not drawn).
 *
 * River + lake: Natural Earth 10m (public domain, `geo/ne-mekong.json`). The 11 dam dots are SCHEMATIC (evenly
 * spaced on the Lancang between 22° and 27° N); the wet-season lake is an ILLUSTRATIVE scaled outline; the
 * reservoir cross-section, clouds and the faucet are illustrations. PLACES: labels / faces, "sea" = outside Vietnam.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p4-mekong-voi-nuoc.timing.json";
import words from "../../src/voiceover/p4-mekong-voi-nuoc.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog, SUB_BOTTOM } from "../../Style Library/kit-common";
import { KaraokeSubs, type SubSkin } from "../../Style Library/subs";
import geo from "../../Style Library/I-toy-atlas/geo/ne-mekong.json";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, MapFace, MapLabel,
  PegImg, pts, Question, seamKeys, show, Signature, talkOpen, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p4-mekong-voi-nuoc/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;
const ease = Easing.inOut(Easing.cubic);
/** Frame of word `i` of VO line `id` (words.json holds absolute start times in seconds). */
const wAt = (id: string, i: number) => Math.round((W[id]?.[i] ?? line(id).start) * FPS);

type LL = [number, number];
const RIVER = geo.mekong as LL[];
const TONLE = geo.tonleSap as LL[]; // lake → Phnom Penh (its normal, dry-season direction)
const LAKE = geo.lake as LL[];

/** Every map-anchored label / face and where it must sit (scripts/geo-check.mjs; "sea" = outside Vietnam). */
export const PLACES = {
  chinaTag: { ll: [101.2, 25.2], in: "sea" },
  myanmarTag: { ll: [97.6, 21.8], in: "sea" },
  laosTag: { ll: [103.0, 19.7], in: "sea" },
  laosTagN: { ll: [102.0, 20.9], in: "sea" },
  laosTagS: { ll: [104.6, 17.8], in: "sea" },
  thaiTag: { ll: [101.4, 15.7], in: "sea" },
  khTag: { ll: [104.0, 14.0], in: "sea" },
  khTag2: { ll: [105.7, 13.2], in: "sea" },
  vnTag: { ll: [107.4, 14.2], in: "Kon Tum" },
  faucet: { ll: [100.2, 25.4], in: "sea" },
  xayaburi: { ll: [101.82, 19.25], in: "sea" },
  donSahong: { ll: [105.95, 14.0], in: "sea" },
  deltaFace: { ll: [105.72, 10.05], in: "Hậu Giang" },
  lakeLabel: { ll: [104.1, 12.85], in: "sea" },
  house: { ll: [104.35, 12.55], in: "sea" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

/** Point on the river nearest to a lon/lat (dam dots sit on the line). */
const snap = (ll: LL) => RIVER.reduce((b, p) => (Math.hypot(p[0] - ll[0], p[1] - ll[1]) < Math.hypot(b[0] - ll[0], b[1] - ll[1]) ? p : b));
/** Fraction of the river's length at the vertex nearest to a latitude, walking from the source. */
const cum = RIVER.reduce<number[]>((a, p, i) => [...a, i ? a[i - 1] + Math.hypot(p[0] - RIVER[i - 1][0], p[1] - RIVER[i - 1][1]) : 0], []);
const TOTAL = cum[cum.length - 1];
const at01 = (d: number) => {
  const k = cum.findIndex((c) => c >= d * TOTAL);
  return RIVER[Math.max(0, k)];
};
const fracAtLat = (lat: number) => cum[RIVER.findIndex((p) => p[1] <= lat)] / TOTAL;
/** 11 schematic dam dots, evenly along the Lancang between 27° and 22° N (C2). */
const DAMS: LL[] = (() => {
  const a = fracAtLat(27);
  const b = fracAtLat(22);
  return Array.from({ length: 11 }, (_, i) => at01(a + ((b - a) * i) / 10));
})();
const XAYABURI = snap(P("xayaburi"));
const DON_SAHONG = snap(P("donSahong"));
/** wet-season lake: the Natural Earth outline scaled ×2.4 about its centre (~6× the area, C12) — ILLUSTRATIVE */
const LAKE_C: LL = [LAKE.reduce((s, p) => s + p[0], 0) / LAKE.length, LAKE.reduce((s, p) => s + p[1], 0) / LAKE.length];
const lakeAt = (k: number) => LAKE.map(([x, y]) => [LAKE_C[0] + (x - LAKE_C[0]) * k, LAKE_C[1] + (y - LAKE_C[1]) * k] as LL);

const RIVER_COL = "#5BB8E8";
const VN = ATLAS.c;
const CN = "#E7A99A";
const LA = "#9FC3E6";
const KH = "#A9CF8E";
const SHARE = [
  { k: "TQ", v: 16, c: "#DE6B5A" },
  { k: "MM", v: 2, c: "#C9B3E0" },
  { k: "LÀO", v: 35, c: "#4D86C9" },
  { k: "THÁI", v: 18, c: "#E8C77A" },
  { k: "CPC", v: 18, c: "#7DBE6A" },
  { k: "VN", v: 11, c: "#E7A99A" },
];

const VIEW = {
  basin: { lon: 101.6, lat: 21, zoom: 16 },
  basinIn: { lon: 102.2, lat: 19.6, zoom: 17.2 },
  lancang: { lon: 100.2, lat: 24.6, zoom: 40 },
  laos: { lon: 103.8, lat: 17.4, zoom: 42 },
  delta: { lon: 105.7, lat: 10.15, zoom: 110 },
  tonle: { lon: 104.8, lat: 11.95, zoom: 62 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.basin },
  // opening (Bible 2026-10-21): from frame 1 the camera follows the river south while it draws itself
  { at: 1, ...VIEW.basinIn },
  { at: at("02") - 4, ...VIEW.lancang },
  { at: at("08") - 4, ...VIEW.basinIn },
  { at: at("12") - 4, ...VIEW.lancang },
  { at: at("18") - 4, ...VIEW.laos },
  { at: at("19") - 4, ...VIEW.delta },
  { at: at("20") - 4, ...VIEW.tonle },
  { at: wAt("24", 9), ...VIEW.basin },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);
const BACK = wAt("24", 9) + 36;

/** Mouth for the talking line (19). */
const talk = (f: number) => talkOpen(f, FPS, W["19"] ?? [], line("19").end);

/** Subtitles with a "MIỀN TÂY NÓI" tag above them while the delta talks (line 19). */
const SpeakerSub: SubSkin = (props) => {
  const t = props.f / FPS;
  const on = t >= line("19").start - 0.05 && t <= line("19").end + 0.15;
  const o = on ? prog(props.f, Math.round(line("19").start * FPS) - 2, 5) : 0;
  const label = "MIỀN TÂY NÓI";
  const w = label.length * 30 + 70;
  return (
    <>
      {on && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
          <g style={{ translate: `${CX}px ${SUB_BOTTOM - 150}px` }}>
            <rect x={-w / 2} y={-34} width={w} height={64} rx={32} fill="#7DBE6A" stroke={ATLAS.ink} strokeWidth={5} />
            <path d="M -14 28 L 0 48 L 14 28 Z" fill="#7DBE6A" stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
            <rect x={-16} y={22} width={32} height={10} fill="#7DBE6A" />
            <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{label}</text>
          </g>
        </svg>
      )}
      <AtlasSub {...props} />
    </>
  );
};

/** A rain cloud (screen space, centre 0, 0); `f` drives the falling drops. */
const Cloud: React.FC<{ f: number }> = ({ f }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
    {[-30, -10, 10, 30].map((x, i) => {
      const y = ((f * 4 + i * 23) % 70) + 30;
      return <line key={x} x1={x} y1={y} x2={x - 6} y2={y + 18} stroke="#4778A0" strokeWidth={6} strokeLinecap="round" opacity={1 - y / 110} />;
    })}
    <path d="M -58 18 Q -70 -12 -38 -16 Q -30 -48 4 -40 Q 30 -60 50 -28 Q 76 -24 66 6 Q 66 22 44 22 L -40 22 Q -58 22 -58 18 Z" fill="#F7F2E8" />
  </g>
);

/** A toy tap (screen space): water drips when `open`. */
const Faucet: React.FC<{ f: number; open: number }> = ({ f, open }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
    <rect x={-70} y={-30} width={70} height={34} rx={8} fill="#B9C4CC" />
    <path d="M 0 -30 L 30 -30 Q 50 -30 50 -10 L 50 14 L 30 14 L 30 -6 Q 30 -10 26 -10 L 0 -10 Z" fill="#B9C4CC" />
    <rect x={-46} y={-56} width={20} height={26} fill="#8E9AA3" />
    <rect x={-66} y={-66} width={60} height={14} rx={7} fill="#C8322B" style={{ rotate: `${open * 40}deg`, transformOrigin: "-36px -59px" }} />
    {open > 0 && [0, 1, 2].map((i) => {
      const y = 24 + ((f * 5 + i * 22) % 66);
      return <path key={i} d={`M 40 ${y} q 6 10 0 14 q -6 -4 0 -14 Z`} fill={RIVER_COL} strokeWidth={3} opacity={open} />;
    })}
  </g>
);

/** Direction chevrons riding a screen polyline (`speed` > 0 = along the points, < 0 = against). */
const Flow: React.FC<{ ps: [number, number][]; f: number; speed: number; o: number; color?: string }> = ({ ps, f, speed, o, color = ATLAS.white }) => {
  if (o <= 0 || ps.length < 2) return null;
  const seg = ps.slice(1).map((q, i) => Math.hypot(q[0] - ps[i][0], q[1] - ps[i][1]));
  const len = seg.reduce((a, b) => a + b, 0);
  const pointAt = (d: number): [number, number, number] => {
    let k = 0;
    while (k < seg.length - 1 && d > seg[k]) d -= seg[k++];
    const t = Math.min(1, d / (seg[k] || 1));
    const [a, b] = [ps[k], ps[k + 1]];
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI];
  };
  const n = Math.max(2, Math.floor(len / 70));
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {Array.from({ length: n }, (_, i) => {
        const d = (((i / n) * len + f * speed * 2.2) % len + len) % len;
        const [x, y, a] = pointAt(d);
        const rot = speed >= 0 ? a : a + 180;
        return (
          <g key={i} style={{ translate: `${x}px ${y}px`, rotate: `${rot}deg` }}>
            <path d="M -12 -14 L 6 0 L -12 14" fill="none" stroke={ATLAS.ink} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M -12 -14 L 6 0 L -12 14" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
};

/** Screen path of a lon/lat ring. */
const ring = (cam: GeoCam, ll: LL[]) => pts(cam, ll).map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ") + " Z";

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // country tints while they are named (each with its CountryTag)
  const cnO = Math.max(show(f, at("02"), at("05") - 2), show(f, at("15"), at("16")));
  const laO = Math.max(show(f, wAt("04", 1), at("05") - 2), show(f, wAt("11", 3), at("12") - 2), show(f, at("18"), at("19") - 2));
  const khO = show(f, wAt("21", 13), wAt("24", 9));
  const fills: Fill[] = [
    ...(cnO > 0 ? [{ name: "China", color: CN }] : []),
    ...(laO > 0 ? [{ name: "Laos", color: LA }] : []),
    ...(khO > 0 ? [{ name: "Cambodia", color: KH }] : []),
  ];

  // the river draws itself during line 01 and stays until the camera is back on the opening view
  const riverP = prog(f, 1, at("02") - 4, Easing.inOut(Easing.quad));
  const riverO = Math.min(prog(f, 1, 3), 1 - prog(f, BACK - 14, 12));
  const riverPs = pts(cam, RIVER);
  const shown = riverPs.slice(0, Math.max(2, Math.ceil(riverP * riverPs.length)));
  const damO = Math.min(show(f, at("02", 0.3)), 1 - prog(f, at("18") - 6, 6));
  const blob = prog(f, at("07"), 14, ease) * (1 - prog(f, at("08") - 4, 6));
  // 21–22: reverse flow into the lake (wet), then the lake gives water back (dry)
  const wet = Math.min(prog(f, wAt("21", 10), 30, ease), 1 - prog(f, at("22"), 30, ease));
  const lakeK = 1 + 1.4 * wet;

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} fills={fills} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />

      {/* the lake (dry outline; wet: scaled, illustrative) */}
      {f >= at("20") - 4 && f < BACK && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("20") - 4, 10), 1 - prog(f, BACK - 14, 12)) }}>
          <path d={ring(cam, lakeAt(lakeK))} fill="#4E93C9" fillOpacity={0.85} stroke={ATLAS.white} strokeWidth={3} />
        </svg>
      )}
      {/* the whole river + lake, dim, on every frame (also frame 0 and the last frame: the loop view is a map with its river) */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 0.55 }}>
        <path d={ring(cam, LAKE)} fill="#4E93C9" stroke={ATLAS.white} strokeWidth={2} />
      </svg>
      <AbsoluteFill style={{ opacity: 0.55 }}>
        <Track ps={riverPs} p={1} color={RIVER_COL} w={interpolate(cam.zoom, [16, 60], [5, 8], CLAMP)} f={f} />
        <Track ps={pts(cam, TONLE)} p={1} color={RIVER_COL} w={5} f={f} />
      </AbsoluteFill>
      {/* the river */}
      <AbsoluteFill style={{ opacity: riverO }}>
        <Track ps={shown} p={1} color={RIVER_COL} w={interpolate(cam.zoom, [16, 60], [7, 11], CLAMP)} glow={0.35 + 0.4 * show(f, wAt("24", 9), BACK)} f={f} />
        {f >= at("20") - 4 && <Track ps={pts(cam, TONLE)} p={1} color={RIVER_COL} w={9} glow={0.6 * show(f, at("20"), at("23"))} f={f} />}
      </AbsoluteFill>

      {/* ── 01 six countries along the river ── */}
      <DataCard value="6 NƯỚC" label="MỘT DÒNG SÔNG" x={CX} y={330} f={f} at={wAt("01", 9)} out={at("02") - 2} size={92} />
      {([
        ["China", "TRUNG QUỐC", "china", "chinaTag", 0.05],
        ["Myanmar", "MYANMAR", "myanmar", "myanmarTag", 0.2],
        ["Laos", "LÀO", "laos", "laosTag", 0.35],
        ["Thailand", "THÁI LAN", "thailand", "thaiTag", 0.5],
        ["Cambodia", "CAMPUCHIA", "cambodia", "khTag", 0.65],
        ["Vietnam", "VIỆT NAM", "vietnam", "vnTag", 0.8],
      ] as const).map(([name, label, flag, k, p]) => {
        const a = 1 + Math.round(p * (at("02") - 6));
        return <CountryTag key={name} cam={cam} f={f} name={name} label={label} flag={flag} anchor={P(k)} from={a} o={show(f, a, a + 26)} glow={[a]} />;
      })}

      {/* ── 02–04 eleven dams in China; who holds the tap? not one country ── */}
      <CountryTag cam={cam} f={f} name="China" label="TRUNG QUỐC" flag="china" anchor={P("chinaTag")} from={wAt("02", 3)} o={show(f, wAt("02", 3), at("03"))} glow={[wAt("02", 3)]} />
      {damO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: damO }}>
          {DAMS.map((d, i) => {
            const [x, y] = S(d);
            const k = prog(f, at("02", 0.3) + i * 2, 6, ease);
            const r = 11 + 26 * blob;
            return (
              <g key={i} style={{ translate: `${x}px ${y}px`, scale: k }}>
                {blob > 0 && <circle r={r} fill="#4E93C9" fillOpacity={0.55} stroke={ATLAS.white} strokeWidth={2} />}
                <rect x={-12} y={-6} width={24} height={12} rx={3} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={4} />
              </g>
            );
          })}
        </svg>
      )}
      <DataCard value="11 ĐẬP" label="DÒNG CHÍNH LAN THƯƠNG" x={CX} y={330} f={f} at={wAt("02", 8)} out={at("03") + 4} size={96} />
      {f >= at("03") && f < at("05") && (() => {
        const [x, y] = S(P("faucet"));
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("05") - 6, 5) }}>
            <g style={{ translate: `${x + 120}px ${y - 40}px`, scale: 1.4 * prog(f, at("03"), 8, ease) }}><Faucet f={f} open={prog(f, at("03", 0.4), 10)} /></g>
          </svg>
        );
      })()}
      <Question x={CX + 220} y={560} f={f} at={at("03")} out={at("04")} s={1.2} />
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={P("laosTagN")} from={wAt("04", 1)} o={show(f, wAt("04", 1), at("05") - 2)} glow={[wAt("04", 1)]} />

      {/* ── 05–07 Xiaowan ~ the Eiffel Tower; craning necks; 42 bn m³ ── */}
      {f >= at("05") - 2 && f < at("07") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("07") - 6, 6) }}>
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            <rect x={130} y={600} width={790} height={720} rx={30} fill={ATLAS.white} fillOpacity={0.9} stroke={ATLAS.ink} strokeWidth={6} />
            <line x1={160} y1={1230} x2={890} y2={1230} stroke={ATLAS.ink} strokeWidth={6} />
          </svg>
          <PegImg src={`${IMG}/m-01-dap-vom.png`} x={370} y={1230} h={260} f={f} at={at("05")} />
          <PegImg src={`${IMG}/m-02-thap-eiffel.png`} x={750} y={1230} h={400} f={f} at={wAt("05", 6)} />
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: show(f, wAt("05", 6) + 6) }}>
            <text x={370} y={920} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.ink}>292 M</text>
            <text x={750} y={790} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.ink}>300 M</text>
          </svg>
          {f >= at("06") && (
            <AbsoluteFill style={{ opacity: prog(f, at("06"), 6) }}>
              <PegImg src={`${OLD}/p2-duong-sat-cao-toc/cut/p-08-worker.png`} x={560} y={1230} h={150} f={f} at={at("06")} />
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      <DataCard value="TIỂU LOAN" label="CAO GẦN BẰNG THÁP EIFFEL" x={CX} y={330} f={f} at={at("05", 0.1)} out={at("07")} size={92} />
      <DataCard value="42 TỶ M³" label="11 HỒ CHỨA" x={CX} y={330} f={f} at={wAt("07", 4)} out={at("08") - 2} size={100} />

      {/* ── 08–11 where does the water come from? rain; China < 1/5, Laos > 1/3 ── */}
      <Question x={CX} y={560} f={f} at={at("08")} out={at("09")} s={1.2} />
      {f >= at("09") - 2 && f < at("12") && ([[102.6, 19.2], [102.6, 16.0], [105.2, 13.6]] as LL[]).map((ll, i) => {
        const [x, y] = S(ll);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("09") - 2 + i * 4, 8), 1 - prog(f, at("12") - 6, 5)) }}>
            <g style={{ translate: `${x}px ${y}px`, scale: 1.1 }}><Cloud f={f + i * 7} /></g>
          </svg>
        );
      })}
      {(() => {
        const o = show(f, at("10"), at("12") - 2);
        if (o <= 0) return null;
        const x0 = 120;
        const wid = 840;
        let acc = 0;
        const hi = (k: string) => (k === "TQ" ? show(f, wAt("10", 1), at("11")) : k === "LÀO" ? show(f, wAt("11", 3), at("12")) : 0);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={x0 - 30} y={1060} width={wid + 60} height={250} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
            <text x={CX} y={1120} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>AI GÓP NƯỚC CHO MEKONG?</text>
            {SHARE.map((s) => {
              const x = x0 + (acc / 100) * wid;
              acc += s.v;
              const w = (s.v / 100) * wid * prog(f, at("10"), 18, ease);
              const h = hi(s.k);
              return (
                <g key={s.k}>
                  <rect x={x} y={1150 - 10 * h} width={w} height={90 + 20 * h} fill={s.c} stroke={ATLAS.ink} strokeWidth={4 + 3 * h} />
                  {s.v >= 11 && <text x={x + w / 2} y={1210} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={s.v >= 16 ? 50 : 40} fill={ATLAS.ink}>{s.v} %</text>}
                </g>
              );
            })}
            <text x={CX} y={1285} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={36} fill={ATLAS.ink} opacity={0.75}>BÌNH QUÂN NĂM · MRC</text>
          </svg>
        );
      })()}
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={P("laosTag")} from={wAt("11", 3)} o={show(f, wAt("11", 3), at("12") - 2)} glow={[wAt("11", 3)]} />
      <DataCard value="< 1/5" label="NƯỚC TỪ TRUNG QUỐC" x={CX} y={330} f={f} at={wAt("10", 3)} out={at("11")} size={100} />
      <DataCard value="> 1/3" label="NƯỚC TỪ MƯA Ở LÀO" x={CX} y={330} f={f} at={wAt("11", 3)} out={at("12") - 2} size={100} />

      {/* ── 12–16 2019: [NGƯỜI] Alan Basist's satellites vs China and the MRC; the measured dry-season release ── */}
      <YearRibbon text="2019" f={f} at={at("12", 0.05)} out={at("13")} />
      <PegImg src={`${IMG}/m-04-nha-nghien-cuu.png`} x={250} y={1300} h={330} f={f} at={at("13")} o={1 - prog(f, at("15") - 6, 6)} />
      <MapLabel text="ALAN BASIST" x={300} y={940} o={show(f, wAt("13", 4), at("14"))} size={52} />
      {f >= at("13") && f < at("15") && (() => {
        const p = prog(f, at("13"), at("15") - at("13"));
        const sx = interpolate(p, [0, 1], [180, 900]);
        const sy = 560 + 30 * Math.sin(p * Math.PI);
        return (
          <AbsoluteFill style={{ opacity: Math.min(prog(f, at("13"), 6), 1 - prog(f, at("15") - 6, 6)) }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <path d={`M ${sx - 20} ${sy + 40} L ${sx - 120} 1000 L ${sx + 80} 1000 L ${sx + 20} ${sy + 40} Z`} fill="#FFE58F" fillOpacity={0.28} />
            </svg>
            <ImgSticker src={`${IMG}/m-03-ve-tinh.png`} x={sx} y={sy} w={200} f={f} at={at("13")} />
          </AbsoluteFill>
        );
      })()}
      <DataCard value="EYES ON EARTH" label="ẢNH VỆ TINH · 4/2020" x={CX} y={330} f={f} at={wAt("13", 6)} out={at("15")} size={86} />
      <CountryTag cam={cam} f={f} name="China" label="TRUNG QUỐC" flag="china" anchor={P("chinaTag")} from={at("15")} o={show(f, at("15"), at("16"))} glow={[at("15")]} />
      <DataCard value="PHẢN BÁC" label="TRUNG QUỐC · MRC" x={CX} y={330} f={f} at={at("15", 0.15)} out={at("16")} size={92} />
      {f >= at("16") && f < at("17") && (() => {
        const a = fracAtLat(24.5);
        const b = fracAtLat(20.3);
        const seg = RIVER.filter((_, i) => cum[i] / TOTAL >= a && cum[i] / TOTAL <= b);
        return <Flow ps={pts(cam, seg)} f={f} speed={6} o={Math.min(prog(f, at("16"), 8), 1 - prog(f, at("17") - 6, 5))} color="#BFE6FF" />;
      })()}
      <DataCard value="MÙA KHÔ +57 %" label="MỰC NƯỚC THẤP NHẤT" x={CX} y={330} f={f} at={wAt("16", 5)} out={at("17") - 2} size={88} />

      {/* ── 17 water can be released, silt stays at the bottom (illustrative cross-section) ── */}
      {f >= at("17") - 2 && f < at("18") && (() => {
        const o = Math.min(prog(f, at("17") - 2, 8), 1 - prog(f, at("18") - 6, 5));
        const settle = prog(f, wAt("17", 9), 40);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={130} y={620} width={790} height={640} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
            <path d="M 160 760 L 620 760 L 620 1200 L 160 1200 Z" fill="#7FB8E0" />
            <path d={`M 160 ${1200 - 70 * settle} Q 390 ${1185 - 80 * settle} 620 ${1200 - 50 * settle} L 620 1200 L 160 1200 Z`} fill="#A9744A" />
            <path d="M 620 700 L 680 700 L 720 1200 L 620 1200 Z" fill="#D9D2C2" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
            <path d="M 720 1130 Q 800 1140 890 1180 L 890 1200 L 720 1200 Z" fill="#7FB8E0" />
            {Array.from({ length: 26 }, (_, i) => {
              const x = 185 + ((i * 97) % 420);
              const y0 = 790 + ((i * 53) % 140);
              const y = Math.min(1190 - 50 * settle, y0 + (f - at("17")) * (2 + (i % 4)));
              return <circle key={i} cx={x} cy={y} r={7} fill="#8A5A34" />;
            })}
            <Flow ps={[[730, 1150], [880, 1180]]} f={f} speed={5} o={1} color="#BFE6FF" />
            <text x={390} y={1250} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>PHÙ SA Ở LẠI</text>
            <text x={790} y={1250} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>NƯỚC ĐI</text>
          </svg>
        );
      })()}

      {/* ── 18 Laos: two mainstream dams ── */}
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={P("laosTagS")} from={at("18")} o={show(f, at("18"), at("19") - 2)} glow={[at("18")]} />
      {f >= at("18") && f < at("19") && [XAYABURI, DON_SAHONG].map((d, i) => {
        const [x, y] = S(d);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("19") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y}px`, scale: 1.4 * prog(f, wAt("18", 4) + i * 6, 8, ease) }}>
              <rect x={-14} y={-7} width={28} height={14} rx={3} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={4} />
            </g>
          </svg>
        );
      })}
      <CityPin cam={cam} f={f} label="XAYABURI" at={XAYABURI} from={wAt("18", 4)} o={show(f, wAt("18", 4), at("19") - 2)} side="right" />
      <CityPin cam={cam} f={f} label="DON SAHONG" at={DON_SAHONG} from={wAt("18", 4) + 6} o={show(f, wAt("18", 4) + 6, at("19") - 2)} side="left" />

      {/* ── 19 [VÙNG NÓI] the delta ── */}
      {(() => {
        const o = show(f, at("19") + 12, at("20") - 4);
        if (o <= 0) return null;
        const [x, y] = S(P("deltaFace"));
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <MapFace x={x} y={y} f={f} at={at("19") + 12} mood={f < wAt("19", 9) ? "worried" : "happy"} talk={talk(f)} s={1.1} seed={2} label="MIỀN TÂY" labelColor={ATLAS.white} />
          </AbsoluteFill>
        );
      })()}

      {/* ── 20–23 [TWIST] the Tonle Sap runs backwards; in the dry season the lake gives back ~40 bn m³ ── */}
      <MapLabel text="BIỂN HỒ" x={S(P("lakeLabel"))[0] - 30} y={S(P("lakeLabel"))[1] + 150} o={show(f, at("20", 0.3), at("23") + 10)} size={56} />
      <ImgSticker src={`${IMG}/m-05-nha-noi-bien-ho.png`} x={S(P("house"))[0] + 130} y={S(P("house"))[1] - 60} w={170} f={f} at={at("20", 0.4)} out={at("22")} />
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={P("khTag2")} from={wAt("21", 13)} o={show(f, wAt("21", 13), wAt("24", 9))} glow={[wAt("21", 13)]} />
      {/* wet season: the river flows lake-wards (against TONLE's order); dry season: back towards the Mekong */}
      <Flow ps={pts(cam, TONLE)} f={f} speed={-5} o={show(f, wAt("21", 14), at("22") - 2)} color="#FFE58F" />
      <Flow ps={pts(cam, TONLE)} f={f} speed={5} o={show(f, at("22"), at("24"))} color="#BFE6FF" />
      <DataCard value="CHẢY NGƯỢC" label="MÙA MƯA · SÔNG TONLE SAP" x={CX} y={330} f={f} at={wAt("21", 14)} out={at("22") - 2} size={92} />
      <DataCard value="~40 TỶ M³" label="BIỂN HỒ NHẢ RA · MÙA KHÔ" x={CX} y={330} f={f} at={wAt("22", 5)} out={at("23")} size={96} />
      {(() => {
        const o = show(f, at("23"), wAt("24", 9));
        if (o <= 0) return null;
        const k = prog(f, at("23"), 12, ease);
        const card = (x: number, v: string, l: string, c: string) => (
          <g style={{ translate: `${x}px 1190px`, scale: k }}>
            <rect x={-170} y={-90} width={340} height={170} rx={24} fill={ATLAS.ink} stroke={c} strokeWidth={6} />
            <text y={6} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={66} fill={c}>{v}</text>
            <text y={58} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={ATLAS.white}>{l}</text>
          </g>
        );
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            {card(270, "~40 TỶ M³", "BIỂN HỒ · MÙA KHÔ", "#BFE6FF")}
            <text x={510} y={1210} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={64} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke">≈</text>
            {card(750, "42 TỶ M³", "SỨC CHỨA 11 HỒ", ATLAS.gold)}
          </svg>
        );
      })()}

      {/* ── 24 closing: water runs down the whole river; "the biggest tap" sits on the lake; all gone before the loop frame ── */}
      <Flow ps={riverPs} f={f} speed={7} o={Math.min(show(f, wAt("24", 9) + 20), 1 - prog(f, END - 22, 12))} color="#BFE6FF" />
      {f >= wAt("24", 13) && f < END - 8 && (() => {
        const [x, y] = S(LAKE_C);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, END - 22, 12) }}>
            <g style={{ translate: `${x - 10}px ${y - 70}px`, scale: 0.9 * prog(f, wAt("24", 13), 10, ease) }}><Faucet f={f} open={prog(f, wAt("24", 16), 10)} /></g>
          </svg>
        );
      })()}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Trước khi về tới miền Tây, sông Mekong chảy qua *6 nước*.",
  "02": "Đoạn đầu ở Trung Quốc đã có *11 con đập*.",
  "05": "Riêng đập *Tiểu Loan* cao gần bằng *tháp Eiffel*.",
  "07": "Cả 11 hồ chứa được khoảng *42 tỷ khối* nước.",
  "09": "*Từ mưa.*",
  "10": "Phần Trung Quốc chỉ góp chưa tới *1/5*.",
  "11": "Riêng mưa ở Lào đã góp hơn *1/3*.",
  "12": "Năm *2019*, hạ lưu hạn nặng.",
  "13": "Nhà nghiên cứu Mỹ *Alan Basist* dùng ảnh vệ tinh soi các hồ thượng nguồn.",
  "17": "Có điều, nước giữ lại còn xả ra được, *phù sa* thì nằm lại dưới đáy hồ.",
  "21": "Mùa mưa, nước Mekong dâng lên, đẩy một con sông ở Campuchia *chảy ngược* vào *Biển Hồ*.",
  "22": "Mùa khô, hồ nhả ra chừng *40 tỷ khối*.",
  "24": "Vòi nước lớn nhất của Mekong không nằm sau con đập nào, mà ở một con sông biết *chảy ngược*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [WH, "02", 0, -4], [CLICK, "05", 0.1], [CLICK, "07", 0.4], [WH2, "08", 0, -4], [CLICK, "10", 0.2],
  [WH, "12", 0, -4], [WH2, "13", 0.1], [CLICK, "16", 0.4], [PEN, "17", 0.6], [WH, "18", 0, -4], [WH2, "19", 0, -4],
  [WH, "20", 0, -4], [THUD, "21", 0.75, 0, -18], [CLICK, "23", 0.05],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("21") - 6, at("21") + 6, at("24", 1) - 4, at("24", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => <Signature f={useCurrentFrame()} cuts={KEYS0.map((k) => k.at)} end={END} spots={[0, 1, 3, 1, 0, 1, 1, 0]} />;

export const P4MekongVoiNuoc: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={SpeakerSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p4-mekong-voi-nuoc/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P4} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p4MekongVoiNuocDuration = (fps: number) => episodeDuration(timing, fps);
