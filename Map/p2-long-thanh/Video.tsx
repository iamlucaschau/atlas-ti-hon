/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (style I Toy Atlas):
 * "Cuộc giành khách: sân bay Long Thành" — v2 (visual pass, same VO, Lucas 2026-10-20).
 * Script + sources: kich-ban-p2-long-thanh-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 28; the last frame is the opening
 * frame (TP.HCM – Đồng Nai, the city, the two airport boxes, the plane at Tân Sơn Nhất pointing to Bắc Kinh,
 * the Long Thành name and the Vietnam locator).
 *
 * Map (Cổng 2, Lucas 2026-10-20): provinces = OCHA/HDX 2025 (vn-provinces.tsx); built-up area = Natural Earth
 * Urban Areas 10m (geo/ne-urban-hcm.json, dated, shown as an illustration). The two airports are ILLUSTRATIVE
 * boxes sized by planned area (Tân Sơn Nhất 791 ha civil ↔ Long Thành 5.000 ha, §3.2 A), centred on the real
 * airports. Runways, rooftops, the military corner, the golf patch, the passenger dots, the tug of war, the
 * gauge and the 40 km flight path are schematic.
 */
import { Audio } from "@remotion/media";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-long-thanh.timing.json";
import words from "../../src/voiceover/p2-long-thanh.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import urbanGeo from "../../Style Library/I-toy-atlas/geo/ne-urban-hcm.json";
import {
  ATLAS, Atlas, AtlasSub, baseXY, beats, camAt, countryPath, DataCard, type GeoCam, HOANG_SA, ImgSticker, MapLabel, PegImg, projectGeo,
  pts, Pulse, Question, Route, routeHead, seamKeys, show, Stamp, Sticker, toScreen, Track, TRUONG_SA, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { flashAt, ProvinceMap, ProvinceTag, type ProvFill, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-long-thanh/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];
const TSN: LL = [106.652, 10.8185];
const LT: LL = [107.04, 10.775];
/** Box sizes in degrees: TSN 2,36 × 3,35 km (791 ha), LT 7,07 × 7,07 km (5.000 ha). 1° lon ≈ 109,35 km, 1° lat ≈ 110,57 km here. */
const TSN_W = 2.36 / 109.35;
const TSN_H = 3.35 / 110.57;
const LT_W = 7.07 / 109.35;
const LT_H = 7.07 / 110.57;

const VIEW = {
  vung: { lon: 106.846, lat: 10.83, zoom: 560 },
  lt: { lon: LT[0], lat: LT[1] + 0.004, zoom: 2200 },
  tsn: { lon: TSN[0], lat: TSN[1] + 0.003, zoom: 3600 },
  /** Tân Sơn Nhất and the city around it, wide enough for a Long Thành-sized square */
  city: { lon: 106.675, lat: 10.81, zoom: 1500 },
};
/** 16: the Long Thành square leaves Long Thành and lands on Tân Sơn Nhất while the camera flies to the city. */
const MOVE_AT = at("16", 0.55);
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vung },
  // hook (Bible 2026-10-21): fly in on Tân Sơn Nhất from frame 1, back out as the plane hops to Đồng Nai
  { at: 1, lon: TSN[0] + 0.03, lat: TSN[1] + 0.04, zoom: 1300 },
  { at: at("01", 0.6), ...VIEW.vung },
  { at: at("04") - 4, ...VIEW.lt },
  { at: at("06") - 4, ...VIEW.tsn },
  { at: at("13") - 4, ...VIEW.vung },
  { at: MOVE_AT, ...VIEW.city },
  { at: at("18") - 4, ...VIEW.vung },
  { at: at("23") - 4, ...VIEW.lt },
  { at: at("24", 0.9), ...VIEW.vung },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const CONCRETE = "#C9C3B6";
const CREAM = "#F3E7C9";
const RUNWAY = "#5E6166";
const MILITARY = "#7C8B5A";
const GRASS = "#8CC970";
const INTL = "#F2B630";
const DEBT = "#D9534F";
const PATH = "#3D8FD0";
const CITY = "#A59D92";
const ROPE = "#C79A5B";

/** The two provinces of the story in muted colours (v2: the airports and the city must stand out). */
const PROV_COL: Record<string, string> = { "TP. Hồ Chí Minh": "#D9BCA4", "Đồng Nai": "#CBC48F" };
const FILLS: ProvFill[] = Object.entries(PROV_COL).map(([name, color]) => ({ name, color }));

/** Built-up area around TP.HCM (Natural Earth, map space). */
const URBAN = (urbanGeo as unknown as FeatureCollection<Geometry, object>).features.map((g: Feature<Geometry, object>) => projectGeo(g)).join(" ");

/** Flight path TSN → LT, bowed north (geo points, schematic). */
const ARC: LL[] = [TSN, [106.75, 10.86], [106.85, 10.875], [106.95, 10.845], LT];

/** Map-space rectangle (base projection) of a box centred on c, w × h degrees, scaled by s about its centre. */
const rect = (c: LL, w: number, h: number, s = 1) => {
  const [x0, y0] = baseXY(c[0] - (w * s) / 2, c[1] + (h * s) / 2);
  const [x1, y1] = baseXY(c[0] + (w * s) / 2, c[1] - (h * s) / 2);
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
};

/** A runway strip in map space from geo a to geo b. */
const Runway: React.FC<{ a: LL; b: LL; z: number; w: number; o?: number; dash?: boolean }> = ({ a, b, z, w, o = 1, dash }) => {
  const [x0, y0] = baseXY(...a);
  const [x1, y1] = baseXY(...b);
  return (
    <g opacity={o}>
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={dash ? DEBT : RUNWAY} strokeWidth={w / z} strokeLinecap="butt"
        strokeDasharray={dash ? `${22 / z} ${14 / z}` : undefined} />
      {!dash && <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={ATLAS.white} strokeWidth={2.2 / z} strokeDasharray={`${16 / z} ${12 / z}`} />}
    </g>
  );
};

/** Little vector toy plane centred on (0, 0), nose to the right. */
const MiniPlane: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g style={{ scale: s }} stroke={ATLAS.ink} strokeWidth={3} strokeLinejoin="round">
    <path d="M -26 -5 L 22 -5 Q 32 0 22 5 L -26 5 Z" fill={ATLAS.white} />
    <path d="M -2 -4 L -14 -24 L -6 -24 L 10 -4 Z M -2 4 L -14 24 L -6 24 L 10 4 Z" fill={ATLAS.white} />
    <path d="M -24 -4 L -30 -14 L -24 -14 L -16 -4 Z" fill={PATH} />
  </g>
);

/** Deterministic passenger dots around a place. */
const DOTS = Array.from({ length: 26 }, (_, i) => ({
  dx: random(`dx${i}`) - 0.5,
  dy: random(`dy${i}`) - 0.5,
  ph: random(`ph${i}`) * Math.PI * 2,
  intl: i < 10,
}));

/** A spreadsheet sheet with a pocket calculator (the twist prop), centred on (0, 0). */
const SheetProp: React.FC<{ hi: number }> = ({ hi }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
    <rect x={-200} y={-150} width={330} height={300} rx={14} fill={ATLAS.white} />
    {[0, 1, 2, 3, 4].map((r) => (
      <rect key={r} x={-180} y={-118 + r * 54} width={290} height={36} rx={6} strokeWidth={3} fill={r === 3 && hi > 0.5 ? ATLAS.gold : "#E3DCCB"} />
    ))}
    <line x1={-80} y1={-130} x2={-80} y2={136} strokeWidth={3} />
    <rect x={90} y={-10} width={130} height={180} rx={16} fill="#3B4650" />
    <rect x={106} y={6} width={98} height={36} rx={6} fill="#B9E3A8" strokeWidth={3} />
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={108 + c * 32} y={56 + r * 34} width={24} height={24} rx={5} fill={ATLAS.white} strokeWidth={2.5} />
    )))}
  </g>
);

// ── Vietnam locator (v2 item 1): top-right card, Vietnam + Hoàng Sa, Trường Sa (channel rule), gold square on TP.HCM ──
const LOC_BOX = { lon0: 102, lon1: 117.5, lat0: 7, lat1: 23.6 };
const LOC = { x: 772, y: 236, w: 168, h: 196 };
const LOC_SCALE = (() => {
  const [ax, ay] = baseXY(LOC_BOX.lon0, LOC_BOX.lat1);
  const [bx, by] = baseXY(LOC_BOX.lon1, LOC_BOX.lat0);
  const k = Math.min((LOC.w - 16) / (bx - ax), (LOC.h - 16) / (by - ay));
  return { k, ox: LOC.x + 8 - ax * k + ((LOC.w - 16) - (bx - ax) * k) / 2, oy: LOC.y + 8 - ay * k };
})();
const locXY = (lon: number, lat: number): [number, number] => {
  const [x, y] = baseXY(lon, lat);
  return [LOC_SCALE.ox + x * LOC_SCALE.k, LOC_SCALE.oy + y * LOC_SCALE.k];
};
const Locator: React.FC<{ o: number; f: number }> = ({ o, f }) => {
  if (o <= 0) return null;
  const [hx, hy] = locXY(106.85, 10.83);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={LOC.x} y={LOC.y} width={LOC.w} height={LOC.h} rx={18} fill="rgba(22,32,40,0.78)" stroke={ATLAS.white} strokeOpacity={0.5} strokeWidth={3} />
      <g style={{ translate: `${LOC_SCALE.ox}px ${LOC_SCALE.oy}px`, scale: LOC_SCALE.k, transformOrigin: "0 0" }}>
        <path d={countryPath("Vietnam")} fill={ATLAS.c} stroke={ATLAS.white} strokeWidth={0.6 / LOC_SCALE.k} />
        <path d={countryPath("Paracel Is.")} fill={ATLAS.c} />
      </g>
      {[...HOANG_SA, ...TRUONG_SA].map(([lo, la], i) => {
        const [x, y] = locXY(lo, la);
        return <circle key={i} cx={x} cy={y} r={2.2} fill={ATLAS.c} />;
      })}
      <rect x={hx - 9} y={hy - 9} width={18} height={18} fill="none" stroke={ATLAS.gold} strokeWidth={4} rx={3}
        opacity={0.75 + 0.25 * Math.sin(f / 8)} />
    </svg>
  );
};

/** BẮC KINH ↑ marker above Tân Sơn Nhất (hook and loop frame). */
const BeijingArrow: React.FC<{ x: number; y: number; o: number }> = ({ x, y, o }) => {
  if (o <= 0) return null;
  return (
    <>
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
        <g style={{ translate: `${x}px ${y - 265}px` }}>
          <path d="M 0 40 L 0 -40 M -26 -14 L 0 -42 L 26 -14" fill="none" stroke={ATLAS.ink} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 0 40 L 0 -40 M -26 -14 L 0 -42 L 26 -14" fill="none" stroke={ATLAS.gold} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <MapLabel text="BẮC KINH" x={x + 40} y={y - 330} o={o} size={56} />
    </>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);
  const px = (deg: number) => deg * (1080 / 360) * cam.zoom; // degrees → screen px (lon)

  // ── map layers ──
  const dnFlash = flashAt(f, [at("01", 0.85)]);
  // 07–08: TSN tries to grow and bounces off the rooftops
  const grow = f < at("08") ? 0.32 * prog(f, at("07", 0.2), 24) : 0.32 * (1 - prog(f, at("08"), 6));
  const milO = Math.min(prog(f, at("09", 0.35), 10), 1 - prog(f, at("13") - 6, 6));
  const golfO = Math.min(prog(f, at("11", 0.1), 10), 1 - prog(f, at("13") - 6, 6));
  const ghostO = Math.min(prog(f, at("10", 0.1), 8), 1 - prog(f, at("11"), 6));
  const ltGlow = Math.max(flashAt(f, [at("16", 0.1), at("18", 0.1)]), show(f, at("03"), at("04") + 20) * 0.6);
  const rwyGlow = flashAt(f, [at("18", 0.1)]);
  const cityGlow = flashAt(f, [at("09", 0.1)]);
  // 16–17 (v2 item 3): a Long Thành-sized square slides from Long Thành onto Tân Sơn Nhất and the city
  const moveP = prog(f, MOVE_AT, 26, ease);
  const ghostSq: LL = [LT[0] + (TSN[0] - LT[0]) * moveP, LT[1] + (TSN[1] - LT[1]) * moveP];
  const sqO = Math.min(prog(f, at("16", 0.4), 8), 1 - prog(f, at("18") - 2, 8));

  const layer = (z: number) => {
    const t = rect(TSN, TSN_W, TSN_H);
    const tg = rect(TSN, TSN_W, TSN_H, 1 + grow);
    const l = rect(LT, LT_W, LT_H);
    const mil = rect([TSN[0] - TSN_W * 0.3, TSN[1] - TSN_H * 0.05], TSN_W * 0.4, TSN_H * 0.5);
    const golf = rect([TSN[0] + TSN_W * 0.08, TSN[1] + TSN_H * 0.33], TSN_W * 0.7, TSN_H * 0.28);
    const sq = rect(ghostSq, LT_W, LT_H);
    const B = 9 / z; // city block size: ~9 px on screen at any zoom
    return (
      <>
        <defs>
          <pattern id="lt-blocks" patternUnits="userSpaceOnUse" width={B * 1.9} height={B * 1.9}>
            <rect x={B * 0.3} y={B * 0.3} width={B} height={B} rx={B * 0.2} fill="#8C857B" opacity={0.55} />
          </pattern>
        </defs>
        <ProvinceMap z={z} set={VN2025} tag="p" fills={FILLS} lines={0.8} f={f} flash={[{ name: "Đồng Nai", v: dnFlash }]} />
        {/* the city (v2 item 2): Natural Earth built-up area, toy blocks inside */}
        <path d={URBAN} fill={CITY} opacity={0.82} />
        <path d={URBAN} fill="url(#lt-blocks)" />
        <path d={URBAN} fill="none" stroke={ATLAS.ink} strokeOpacity={0.5} strokeWidth={1.6 / z} />
        {cityGlow > 0 && <path d={URBAN} fill="none" stroke={ATLAS.gold} strokeOpacity={cityGlow} strokeWidth={10 / z} />}
        {/* Tân Sơn Nhất (791 ha, illustrative) */}
        <rect {...t} fill={CONCRETE} stroke={ATLAS.ink} strokeWidth={3 / z} rx={4 / z} />
        <rect {...mil} fill={MILITARY} opacity={0.55 * milO} />
        <rect {...golf} fill={GRASS} opacity={0.9 * golfO} rx={6 / z} />
        <Runway z={z} a={[TSN[0] - TSN_W * 0.12, TSN[1] - TSN_H * 0.42]} b={[TSN[0] - TSN_W * 0.12, TSN[1] + TSN_H * 0.42]} w={7} />
        <Runway z={z} a={[TSN[0] + TSN_W * 0.18, TSN[1] - TSN_H * 0.38]} b={[TSN[0] + TSN_W * 0.18, TSN[1] + TSN_H * 0.38]} w={7} />
        <Runway z={z} a={[TSN[0] + TSN_W * 0.62, TSN[1] - TSN_H * 0.4]} b={[TSN[0] + TSN_W * 0.62, TSN[1] + TSN_H * 0.4]} w={9} o={ghostO} dash />
        {grow > 0.002 && <rect {...tg} fill="none" stroke={ATLAS.white} strokeWidth={4 / z} strokeDasharray={`${14 / z} ${10 / z}`} />}
        {/* Long Thành (5.000 ha, illustrative) */}
        <rect {...l} fill={CREAM} stroke={ATLAS.gold} strokeWidth={(4 + 6 * ltGlow) / z} rx={6 / z} />
        <Runway z={z} a={[LT[0] - LT_W * 0.42, LT[1] - LT_H * 0.25]} b={[LT[0] + LT_W * 0.2, LT[1] + LT_H * 0.42]} w={7 + 4 * rwyGlow} />
        <Runway z={z} a={[LT[0] - LT_W * 0.2, LT[1] - LT_H * 0.42]} b={[LT[0] + LT_W * 0.42, LT[1] + LT_H * 0.25]} w={7 + 4 * rwyGlow} />
        {/* 16–17: the Long Thành-sized square laid over the city */}
        {sqO > 0 && (
          <g opacity={sqO}>
            <rect {...sq} fill={CREAM} fillOpacity={0.35} stroke={ATLAS.gold} strokeWidth={7 / z} strokeDasharray={`${18 / z} ${10 / z}`} rx={6 / z} />
            <rect {...t} fill="none" stroke={ATLAS.ink} strokeWidth={4 / z} rx={4 / z} />
          </g>
        )}
      </>
    );
  };

  const tsn = S(TSN);
  const lt = S(LT);
  const arc = pts(cam, ARC);
  const tsnW = px(TSN_W);
  const tsnH = px(TSN_H) * 1.02;

  // ── loop frame (v2 item 7): plane on Tân Sơn Nhất pointing to Bắc Kinh, Long Thành named, Vietnam locator ──
  const tail = prog(f, at("28", 0.72), 10);
  const hookO = Math.max(1 - prog(f, at("01", 0.75), 6), tail);
  const ltNameO = Math.max(1 - prog(f, 1, 5), tail);
  const locO = Math.max(1 - prog(f, at("01", 0.8), 6), tail);

  // passenger dots (bigger in the overview, v2 item 4)
  const crowdO = Math.max(show(f, at("06", 0.2), at("13") - 4), show(f, at("20") - 2, at("23") - 4));
  const flowP = (i: number) => {
    // 20: international dots head for LT; 21: three (Đông Nam Á) go back
    const go = prog(f, at("20", 0.3) + i * 3, 30) * (0.28 + 0.045 * i);
    const back = i < 3 ? prog(f, at("21", 0.15), 20) : 0;
    return go * (1 - back);
  };

  // 20–22 tug of war (v2 item 4): knot position 0 (TSN, left) … 1 (LT, right)
  const knot = 0.5 + 0.32 * prog(f, at("20", 0.25), 30, ease) - 0.18 * prog(f, at("21", 0.15), 24, ease) + 0.06 * prog(f, at("22", 0.2), 30, ease);
  const tugO = Math.min(prog(f, at("20", 0.1), 8), 1 - prog(f, at("23") - 6, 6));

  // 26–28 gauge on Tân Sơn Nhất (v2 item 5): fills to 9/10 at 26, drains as the passengers leave at 28
  const fill = 0.9 * prog(f, at("26", 0.35), 24, ease) * (1 - prog(f, at("28", 0.05), 40));
  const gaugeO = Math.min(prog(f, at("26", 0.15), 8), 1 - prog(f, at("28", 0.5), 8));
  const leaveP = (i: number) => prog(f, at("28", 0.05) + i * 3, 34);

  // 23: the first plane lands on Long Thành's runway (screen path down the runway)
  const r0 = S([LT[0] + LT_W * 0.55, LT[1] + LT_H * 0.62]);
  const r1 = S([LT[0] - LT_W * 0.05, LT[1] + LT_H * 0.02]);
  const land = prog(f, at("23", 0.25), at("23", 0.8) - at("23", 0.25));

  // hook plane: sits on TSN, hops to LT on "Đồng Nai"
  const hop = prog(f, at("01", 0.78), 16);
  const [hx, hy] = routeHead(arc, hop);
  const hopO = f < at("04") ? 1 - prog(f, at("04") - 6, 5) : tail;
  const planeAt: [number, number] = f < at("04") ? [hx, hy - 60 * Math.sin(Math.PI * hop) - 95 * (1 - hop)] : [tsn[0], tsn[1] - 95];

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />

      {/* loop frame: Long Thành name, plane + BẮC KINH on Tân Sơn Nhất, locator */}
      <MapLabel text="LONG THÀNH" x={lt[0] - 90} y={lt[1] + 175} o={ltNameO} size={48} />
      <BeijingArrow x={tsn[0]} y={tsn[1]} o={hookO} />
      {hopO > 0 && (
        <Img src={staticFile(`${IMG}/l-01-toy-plane.png`)} style={{
          position: "absolute", left: planeAt[0], top: planeAt[1] - 20, width: 190, translate: "-50% -50%", opacity: hopO, rotate: "-8deg",
        }} />
      )}
      <Locator o={locO} f={f} />

      {/* ── 01–03 hook: your Beijing flight leaves from Đồng Nai, 40 km; a debt ── */}
      <ProvinceTag cam={cam} f={f} label="ĐỒNG NAI" anchor={[106.98, 10.96]} from={at("01", 0.85)} o={show(f, at("01", 0.85), at("02", 0.6))} />
      {f >= at("02") && f < at("04") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("04") - 6, 5) }}>
          <Route pts={arc} p={prog(f, at("02", 0.05), 30)} color={ATLAS.white} />
        </AbsoluteFill>
      )}
      <MapLabel text="~40 KM" x={(tsn[0] + lt[0]) / 2} y={arc[2][1] - 40} o={show(f, at("02", 0.4), at("04") - 4)} size={56} />
      <PegImg src={`${IMG}/l-07-traveller.png`} x={tsn[0] + 20} y={tsn[1] + 330} h={250} f={f} at={at("02", 0.1)} o={1 - prog(f, at("04") - 6, 5)} />
      <Stamp text="KHOẢN NỢ" x={lt[0] - 120} y={lt[1] - 150} f={f} at={at("03", 0.05)} out={at("04", 0.4)} color={DEBT} />

      {/* ── 04–05 Long Thành: ~110.000 tỷ for phase 1, part borrowed; an empty terminal ── */}
      <ImgSticker src={`${IMG}/l-02-lotus-terminal.png`} x={lt[0]} y={lt[1] + 10} w={300} f={f} at={at("04", 0.25)} out={at("06") - 6} />
      <DataCard value="~110.000 TỶ" label="VỐN GIAI ĐOẠN 1" x={CX} y={330} f={f} at={at("04", 0.35)} out={at("05", 0.6)} size={84} />
      <MapLabel text="CÓ TIỀN VAY" x={CX} y={1180} o={show(f, at("04", 0.75), at("05", 0.6))} size={52} />
      <Question x={lt[0] + 150} y={lt[1] - 120} f={f} at={at("05", 0.3)} out={at("06") - 6} s={1.1} />

      {/* ── 06–10 Tân Sơn Nhất: 42 million (2025), no room, shared with the military, a 3rd runway = homes ── */}
      {crowdO > 0 && DOTS.map((d, i) => {
        const inTsn = cam.zoom > 1500;
        const bx = tsn[0] + d.dx * (inTsn ? tsnW * 0.9 : 80);
        const by = tsn[1] + d.dy * (inTsn ? tsnH * 0.9 : 100);
        let [x, y] = [bx + 6 * Math.sin(f / 9 + d.ph), by + 4 * Math.cos(f / 11 + d.ph)];
        if (!inTsn && d.intl) {
          const p = flowP(i);
          if (p > 0) {
            const [ax, ay] = routeHead(arc, p);
            [x, y] = [ax + (bx - tsn[0]) * (1 - p) * 0.4, ay + (by - tsn[1]) * (1 - p) * 0.4];
          }
        }
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: crowdO }}>
            <circle cx={x} cy={y} r={inTsn ? 11 : 16} fill={d.intl ? INTL : ATLAS.white} stroke={ATLAS.ink} strokeWidth={3} />
          </svg>
        );
      })}
      <DataCard value="42 TRIỆU LƯỢT" label="KHÁCH · NĂM 2025" x={CX} y={330} f={f} at={at("06", 0.4)} out={at("07", 0.2)} size={80} />
      {[[-1.3, 0.15], [1.3, -0.1], [0.05, -0.95], [0.1, 0.98]].map(([kx, ky], i) => (
        <ImgSticker key={i} src={`${IMG}/l-03-rooftops.png`} x={tsn[0] + kx * tsnW} y={tsn[1] + ky * tsnH}
          w={i < 2 ? 230 : 250} f={f} at={at("07", 0.1) + i * 3} out={i === 3 ? at("11") : at("13") - 6} />
      ))}
      <Stamp text="HẾT CHỖ" x={CX} y={330} f={f} at={at("08")} out={at("09", 0.4)} />
      <MapLabel text="QUÂN SỰ" x={tsn[0] - tsnW * 0.3} y={tsn[1] + 18} o={show(f, at("09", 0.45), at("11"))} size={48} />
      <Sticker x={tsn[0] + tsnW * 0.62} y={tsn[1] + tsnH * 0.42} f={f} at={at("10", 0.6)} out={at("11")} s={1.2}>
        <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={ATLAS.ink} strokeWidth={22} strokeLinecap="round" />
        <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={DEBT} strokeWidth={12} strokeLinecap="round" />
      </Sticker>

      {/* ── 11–12 two sides ── */}
      <PegImg src={`${IMG}/l-05-expand-side.png`} x={250} y={1300} h={270} f={f} at={at("11", 0.1)} o={1 - prog(f, at("13") - 6, 5)} />
      <MapLabel text="PHE MỞ RỘNG" x={260} y={1000} o={show(f, at("11", 0.25), at("13") - 6)} size={48} />
      <PegImg src={`${IMG}/l-06-build-new-side.png`} x={790} y={1300} h={270} f={f} at={at("12", 0.05)} o={1 - prog(f, at("13") - 6, 5)} />
      <MapLabel text="PHE XÂY MỚI" x={760} y={1000} o={show(f, at("12", 0.2), at("13") - 6)} size={48} />

      {/* ── 13–15 2015: 428 / 461; [ĐÙA] a smooth take-off ── */}
      <YearRibbon text="2015" f={f} at={at("13", 0.1)} out={at("16") - 4} />
      <DataCard value="428 / 461" label="PHIẾU TÁN THÀNH" x={CX} y={560} f={f} at={at("14", 0.1)} out={at("16") - 6} size={96} />
      {f >= at("15") && f < at("16") && (() => {
        const p = prog(f, at("15", 0.05), at("15", 0.95) - at("15", 0.05));
        const x = interpolate(p, [0, 1], [CX, lt[0]]);
        const y = interpolate(p, [0, 1], [720, lt[1] - 40]) - 60 * Math.sin(Math.PI * p);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("16") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y}px`, rotate: `${-12 + 24 * p}deg` }}><MiniPlane s={2.2} /></g>
          </svg>
        );
      })()}

      {/* ── 16–17 5.000 ha; laid over the city it covers far more than Tân Sơn Nhất (v2 item 3) ── */}
      <DataCard value="5.000 HA" x={CX} y={330} f={f} at={at("16", 0.2)} out={at("17")} size={96} />
      <DataCard value="5.000 ↔ 791 HA" label="DIỆN TÍCH QUY HOẠCH" x={CX} y={330} f={f} at={at("17")} out={at("18") - 2} size={84} />
      <MapLabel text="NẾU ĐẶT VÀO SÀI GÒN" x={CX} y={1200} o={show(f, at("17", 0.1), at("18") - 2)} size={52} />

      {/* ── 18–19 runways ready, passengers not yet (overview) ── */}
      <ImgSticker src={`${IMG}/l-02-lotus-terminal.png`} x={lt[0]} y={lt[1] - 10} w={170} f={f} at={at("18", 0.3)} out={at("20") - 2} />
      <Question x={lt[0] + 30} y={lt[1] - 120} f={f} at={at("19", 0.2)} out={at("20") - 2} s={1.1} />

      {/* ── 20–22 tug of war: ACV wants everything moved; Vietnam Airlines keeps South-East Asia; 4 routes first ── */}
      {tugO > 0 && (() => {
        const x0 = 150;
        const x1 = 850;
        const y = 1250;
        const kx = x0 + (x1 - x0) * knot + 4 * Math.sin(f / 5);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: tugO }}>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={ATLAS.ink} strokeWidth={22} strokeLinecap="round" />
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={ROPE} strokeWidth={13} strokeLinecap="round" strokeDasharray="14 8" />
            <rect x={CX - 3} y={y - 34} width={6} height={68} fill={ATLAS.white} opacity={0.8} />
            <g style={{ translate: `${x0}px ${y}px` }}>
              <circle r={40} fill={CONCRETE} stroke={ATLAS.ink} strokeWidth={5} /><g style={{ rotate: "-20deg" }}><MiniPlane s={1.1} /></g>
            </g>
            <g style={{ translate: `${x1}px ${y}px` }}>
              <circle r={40} fill={CREAM} stroke={ATLAS.gold} strokeWidth={6} /><g style={{ rotate: "-20deg" }}><MiniPlane s={1.1} /></g>
            </g>
            <circle cx={kx} cy={y} r={30} fill={INTL} stroke={ATLAS.ink} strokeWidth={6} />
          </svg>
        );
      })()}
      <MapLabel text="ACV: DỜI HẾT" x={690} y={1170} o={show(f, at("20", 0.2), at("21"))} size={52} />
      <MapLabel text="VNA: GIỮ ĐÔNG NAM Á" x={380} y={1170} o={show(f, at("21", 0.15), at("22", 0.25))} size={52} />
      {f >= at("21") && f < at("22") + 6 && <Pulse x={tsn[0]} y={tsn[1]} f={f} color={INTL} o={1 - prog(f, at("22"), 6)} />}
      {f >= at("22") && f < at("23") && [0, 1, 2, 3].map((i) => {
        const p = prog(f, at("22", 0.1) + i * 12, 22);
        if (p <= 0 || p >= 1) return null;
        const [x, y] = routeHead(arc, p);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute" }}>
            <g style={{ translate: `${x}px ${y - 20}px`, rotate: `${-10 + 20 * p}deg` }}><MiniPlane s={1.8} /></g>
          </svg>
        );
      })}
      <DataCard value="4 ĐƯỜNG BAY" label="GIAI ĐOẠN ĐẦU" x={CX} y={330} f={f} at={at("22", 0.3)} out={at("23") - 4} size={84} />

      {/* ── 23 [NGƯỜI] 15/12/2025, captain Trần Tuấn Hưng lands the first plane ── */}
      {f >= at("23") && f < at("24", 0.3) && (
        <Img src={staticFile(`${IMG}/l-01-toy-plane.png`)} style={{
          position: "absolute", left: interpolate(land, [0, 1], [r0[0] + 50, r1[0]]), top: interpolate(land, [0, 1], [r0[1] + 30, r1[1]]),
          width: interpolate(land, [0, 1], [300, 200]), translate: "-50% -50%", rotate: "-38deg",
          opacity: Math.min(prog(f, at("23", 0.2), 6), 1 - prog(f, at("24", 0.1), 6)),
        }} />
      )}
      <YearRibbon text="15/12/2025" f={f} at={at("23", 0.05)} out={at("24")} />
      <PegImg src={`${IMG}/l-04-captain.png`} x={260} y={1290} h={300} f={f} at={at("23", 0.4)} o={1 - prog(f, at("24", 0.1), 5)} />
      <MapLabel text="CƠ TRƯỞNG TRẦN TUẤN HƯNG" x={CX} y={480} o={show(f, at("23", 0.45), at("24"))} size={48} />

      {/* ── 24–25 [TWIST] the investor's spreadsheet (screen-space over the overview) ── */}
      <Sticker x={CX} y={760} f={f} at={at("24", 0.15)} out={at("25", 0.85)} s={1.15}>
        <SheetProp hi={prog(f, at("25", 0.1), 6)} />
      </Sticker>
      <DataCard value="1–2 NĂM" label="DỰ TÍNH ACV" x={CX} y={330} f={f} at={at("25", 0.2)} out={at("26") - 4} size={96} />

      {/* ── 26–28 …if 9 in 10 international passengers leave Tân Sơn Nhất: gauge on TSN, the first plane's trail, they follow ── */}
      {gaugeO > 0 && (() => {
        const R = 105;
        const C = 2 * Math.PI * R;
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: gaugeO }}>
            <circle cx={tsn[0]} cy={tsn[1]} r={R} fill="rgba(22,32,40,0.35)" stroke={ATLAS.ink} strokeWidth={30} />
            <circle cx={tsn[0]} cy={tsn[1]} r={R} fill="none" stroke="#5A5F63" strokeWidth={22} />
            <circle cx={tsn[0]} cy={tsn[1]} r={R} fill="none" stroke={INTL} strokeWidth={22} strokeDasharray={`${C * fill} ${C}`}
              style={{ rotate: "-90deg", transformOrigin: `${tsn[0]}px ${tsn[1]}px` }} />
          </svg>
        );
      })()}
      <DataCard value="9/10" label="KHÁCH QUỐC TẾ" x={CX} y={330} f={f} at={at("26", 0.3)} out={at("27", 0.2)} size={110} />
      {f >= at("27") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, END - 18, 10) }}>
          <Track ps={arc} p={prog(f, at("27", 0.1), 30)} color={ATLAS.gold} w={9} glow={0.8} f={f} />
        </AbsoluteFill>
      )}
      {f >= at("27") && f < at("28") + 10 && (() => {
        const [x, y] = routeHead(arc, prog(f, at("27", 0.1), 30));
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("28"), 8) }}>
            <g style={{ translate: `${x}px ${y - 18}px` }}><MiniPlane s={1.8} /></g>
          </svg>
        );
      })()}
      {f >= at("28") && Array.from({ length: 9 }, (_, i) => {
        const p = leaveP(i);
        if (p <= 0) return null;
        const [x, y] = routeHead(arc, p);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, END - 18, 10) }}>
            <circle cx={x} cy={y} r={18} fill={INTL} stroke={ATLAS.white} strokeWidth={5} />
          </svg>
        );
      })}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Cuối năm nay, chuyến Vietnam Airlines từ Sài Gòn đi *Bắc Kinh* dự kiến cất cánh ở *Đồng Nai*.",
  "02": "Ai bắt bạn đi xa *40 km*?",
  "03": "*Một khoản nợ*.",
  "04": "Giai đoạn đầu của Long Thành tốn gần *110 nghìn tỷ*, một phần là tiền vay.",
  "06": "Mà khách đang ở Tân Sơn Nhất: năm ngoái, hơn *42 triệu* lượt.",
  "08": "*Hết chỗ*.",
  "13": "Năm *2015*, Quốc hội chọn xây mới.",
  "14": "*428 / 461* phiếu.",
  "16": "Long Thành rộng *5.000 ha*.",
  "17": "Gấp hơn *6 lần* Tân Sơn Nhất.",
  "22": "Giai đoạn đầu, hãng dự kiến chuyển *4 đường bay*, có Bắc Kinh.",
  "23": "Chiều *15/12* năm ngoái, cơ trưởng *Trần Tuấn Hưng* đáp chiếc máy bay đầu tiên xuống Long Thành.",
  "25": "Long Thành có thể thu đủ bù chi sau *1–2 năm*.",
  "26": "Nếu *9/10* khách quốc tế rời Tân Sơn Nhất.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/cinematic-piano-hit-567216.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [W2, "01", 0.78], [THUD, "03", 0.05, 0, -18],
  [W, "04", 0, -4], [W2, "06", 0, -4],
  [THUD, "08", 0, 0, -18], [CLICK, "09", 0.45], [PEN, "10", 0.6],
  [W, "13", 0, -4], [HIT, "14", 0.1, 0, -20],
  [W2, "16", 0.55], [CLICK, "17", 0.15], [W, "18", 0, -4], [CLICK, "20", 0.25], [CLICK, "22", 0.3],
  [W2, "23", 0, -4], [HIT, "24", 0.2], [CLICK, "26", 0.35],
];

/** Music duck: the bed dips under the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("24") - 6, at("24") + 6, at("28", 1) - 4, at("28", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P2LongThanh: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-long-thanh/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2LongThanhDuration = (fps: number) => episodeDuration(timing, fps);
