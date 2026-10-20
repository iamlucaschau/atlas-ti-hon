/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (style I Toy Atlas):
 * "Cuộc giành khách: sân bay Long Thành".
 * Script + sources: kich-ban-p2-long-thanh-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 28; the last frame is the opening
 * frame (TP.HCM – Đồng Nai, the two airport boxes and their names, nothing else).
 *
 * Map (Cổng 2, Lucas 2026-10-20): provinces = OCHA/HDX 2025 (vn-provinces.tsx). The two airports are
 * ILLUSTRATIVE boxes sized by planned area (Tân Sơn Nhất 791 ha civil ↔ Long Thành 5.000 ha, §3.2 A),
 * centred on the real airports. Runways, rooftops, the military corner, the golf patch, the passenger
 * dots and the 40 km flight path are schematic.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-long-thanh.timing.json";
import words from "../../src/voiceover/p2-long-thanh.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, pop, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, baseXY, beats, camAt, DataCard, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse, Question, Route,
  routeHead, seamKeys, show, Stamp, Sticker, toScreen, Track, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { flashAt, ProvinceMap, ProvinceTag, type ProvFill, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-long-thanh/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

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
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vung },
  { at: at("04") - 4, ...VIEW.lt },
  { at: at("06") - 4, ...VIEW.tsn },
  { at: at("13") - 4, ...VIEW.vung },
  { at: at("16") - 4, ...VIEW.lt },
  { at: at("20") - 4, ...VIEW.vung },
  { at: at("23") - 4, ...VIEW.lt },
  { at: at("26") - 4, ...VIEW.vung },
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

/** The two provinces of the story in their pastel colours; the rest stay plain land. */
const PASTEL: ProvFill[] = VN2025.filter((p) => ["TP. Hồ Chí Minh", "Đồng Nai"].includes(p.name)).map((p) => ({ name: p.name, color: p.pastel }));

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
      <rect key={r} x={-180} y={-118 + r * 54} width={290} height={36} rx={6} strokeWidth={3}
        fill={r === 3 ? interpolateColor(hi) : "#E3DCCB"} />
    ))}
    <line x1={-80} y1={-130} x2={-80} y2={136} strokeWidth={3} />
    <rect x={90} y={-10} width={130} height={180} rx={16} fill="#3B4650" />
    <rect x={106} y={6} width={98} height={36} rx={6} fill="#B9E3A8" strokeWidth={3} />
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={108 + c * 32} y={56 + r * 34} width={24} height={24} rx={5} fill={ATLAS.white} strokeWidth={2.5} />
    )))}
  </g>
);
const interpolateColor = (t: number) => (t > 0.5 ? ATLAS.gold : "#E3DCCB");

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
  const ltGlow = Math.max(flashAt(f, [at("16", 0.1)]), show(f, at("03"), at("04") + 20) * 0.6);
  const rwyGlow = flashAt(f, [at("18", 0.1)]);
  // 17: six TSN-sized tiles fill the LT box (3 × 2)
  const tileO = 1 - prog(f, at("18"), 8);

  const layer = (z: number) => {
    const t = rect(TSN, TSN_W, TSN_H);
    const tg = rect(TSN, TSN_W, TSN_H, 1 + grow);
    const l = rect(LT, LT_W, LT_H);
    const mil = rect([TSN[0] - TSN_W * 0.3, TSN[1] - TSN_H * 0.05], TSN_W * 0.4, TSN_H * 0.5);
    const golf = rect([TSN[0] + TSN_W * 0.08, TSN[1] + TSN_H * 0.33], TSN_W * 0.7, TSN_H * 0.28);
    return (
      <>
        <ProvinceMap z={z} set={VN2025} tag="p" fills={PASTEL} lines={0.8} f={f} flash={[{ name: "Đồng Nai", v: dnFlash }]} />
        {/* Tân Sơn Nhất (791 ha, illustrative) */}
        <rect {...t} fill={CONCRETE} stroke={ATLAS.ink} strokeWidth={2.5 / z} rx={4 / z} />
        <rect {...mil} fill={MILITARY} opacity={0.55 * milO} />
        <rect {...golf} fill={GRASS} opacity={0.9 * golfO} rx={6 / z} />
        <Runway z={z} a={[TSN[0] - TSN_W * 0.12, TSN[1] - TSN_H * 0.42]} b={[TSN[0] - TSN_W * 0.12, TSN[1] + TSN_H * 0.42]} w={7} />
        <Runway z={z} a={[TSN[0] + TSN_W * 0.18, TSN[1] - TSN_H * 0.38]} b={[TSN[0] + TSN_W * 0.18, TSN[1] + TSN_H * 0.38]} w={7} />
        <Runway z={z} a={[TSN[0] + TSN_W * 0.62, TSN[1] - TSN_H * 0.4]} b={[TSN[0] + TSN_W * 0.62, TSN[1] + TSN_H * 0.4]} w={9} o={ghostO} dash />
        {grow > 0.002 && (
          <rect {...tg} fill="none" stroke={ATLAS.white} strokeWidth={4 / z} strokeDasharray={`${14 / z} ${10 / z}`} />
        )}
        {/* Long Thành (5.000 ha, illustrative) */}
        <rect {...l} fill={CREAM} stroke={ATLAS.gold} strokeWidth={(3 + 6 * ltGlow) / z} rx={6 / z} />
        <Runway z={z} a={[LT[0] - LT_W * 0.42, LT[1] - LT_H * 0.25]} b={[LT[0] + LT_W * 0.2, LT[1] + LT_H * 0.42]} w={7 + 4 * rwyGlow} />
        <Runway z={z} a={[LT[0] - LT_W * 0.2, LT[1] - LT_H * 0.42]} b={[LT[0] + LT_W * 0.42, LT[1] + LT_H * 0.25]} w={7 + 4 * rwyGlow} />
        {f >= at("17") && tileO > 0 && [0, 1, 2, 3, 4, 5].map((i) => {
          const c = i % 3;
          const r = Math.floor(i / 3);
          const p = prog(f, at("17", 0.05) + i * 4, 8);
          const cc: LL = [LT[0] - LT_W / 2 + TSN_W * (c + 0.5), LT[1] + TSN_H * (r === 0 ? 0.5 : -0.5)];
          const tr = rect(cc, TSN_W, TSN_H, 0.96 * p);
          return <rect key={i} {...tr} fill={CONCRETE} stroke={ATLAS.ink} strokeWidth={2.5 / z} opacity={tileO * p} />;
        })}
      </>
    );
  };

  const tsn = S(TSN);
  const lt = S(LT);
  const arc = pts(cam, ARC);
  const tsnW = px(TSN_W);
  const tsnH = px(TSN_H) * 1.02;

  // airport names: the loop frame (start and end) and the overview beats without other text
  const nameO = Math.max(1 - prog(f, at("01", 0.15), 6), prog(f, at("28", 0.4), 10));

  // passenger dots
  const crowdO = Math.max(show(f, at("06", 0.2), at("13") - 4), show(f, at("20") - 2, at("23") - 4));
  const flowP = (i: number) => {
    // 20: international dots head for LT (half way); 21: three (Đông Nam Á) go back; 22 ends the phase
    if (f < at("23")) {
      const go = prog(f, at("20", 0.3) + i * 3, 30) * (0.28 + 0.045 * i);
      const back = i < 3 ? prog(f, at("21", 0.15), 20) : 0;
      return go * (1 - back);
    }
    // 28: nine of ten follow the first flight's trail
    return i < 9 ? prog(f, at("28", 0.05) + i * 3, 34) : 0;
  };
  const tenO = Math.min(prog(f, at("26", 0.2), 8), 1 - prog(f, END - 18, 10));

  // 23: the first plane lands on Long Thành's runway (screen path down the runway)
  const r0 = S([LT[0] + LT_W * 0.55, LT[1] + LT_H * 0.62]);
  const r1 = S([LT[0] - LT_W * 0.05, LT[1] + LT_H * 0.02]);
  const land = prog(f, at("23", 0.25), at("23", 0.8) - at("23", 0.25));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />

      {/* airport names (loop frame) */}
      <MapLabel text="TÂN SƠN NHẤT" x={tsn[0] + 80} y={tsn[1] + 110} o={nameO} size={48} />
      <MapLabel text="LONG THÀNH" x={lt[0] - 90} y={lt[1] + 175} o={nameO} size={48} />

      {/* ── 01–03 hook: your Beijing flight leaves from Đồng Nai, 40 km; a debt ── */}
      {f >= at("01") && f < at("04") && (() => {
        const hop = prog(f, at("01", 0.78), 16);
        const [hx, hy] = routeHead(arc, hop);
        const lift = -60 * Math.sin(Math.PI * hop);
        const o = 1 - prog(f, at("04") - 6, 5);
        return (
          <>
            {hop === 0 && (
              <svg width={1080} height={1920} style={{ position: "absolute", opacity: show(f, at("01", 0.15), at("01", 0.75)) }}>
                <g style={{ translate: `${tsn[0]}px ${tsn[1] - 190}px` }}>
                  <path d="M 0 40 L 0 -40 M -26 -14 L 0 -42 L 26 -14" fill="none" stroke={ATLAS.ink} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 0 40 L 0 -40 M -26 -14 L 0 -42 L 26 -14" fill="none" stroke={ATLAS.gold} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            )}
            <MapLabel text="BẮC KINH" x={tsn[0] + 40} y={tsn[1] - 260} o={show(f, at("01", 0.15), at("01", 0.75))} size={56} />
            <Img src={staticFile(`${IMG}/l-01-toy-plane.png`)} style={{
              position: "absolute", left: hx, top: hy + lift - 20, width: 190, translate: "-50% -50%",
              scale: pop(f, at("01", 0.1)), opacity: o, rotate: `${-8 + 6 * Math.sin(f / 10)}deg`,
            }} />
          </>
        );
      })()}
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
      <DataCard value="~110.000 TỶ" label="VỐN GIAI ĐOẠN 1" x={540} y={330} f={f} at={at("04", 0.35)} out={at("05", 0.6)} size={84} />
      <MapLabel text="CÓ TIỀN VAY" x={540} y={1180} o={show(f, at("04", 0.75), at("05", 0.6))} size={52} />
      <Question x={lt[0] + 150} y={lt[1] - 120} f={f} at={at("05", 0.3)} out={at("06") - 6} s={1.1} />

      {/* ── 06–10 Tân Sơn Nhất: 42 million (2025), no room, shared with the military, a 3rd runway = homes ── */}
      {crowdO > 0 && DOTS.map((d, i) => {
        const inTsn = cam.zoom > 1500;
        const bx = tsn[0] + d.dx * (inTsn ? tsnW * 0.9 : 70) + (inTsn ? 0 : 0);
        const by = tsn[1] + d.dy * (inTsn ? tsnH * 0.9 : 90);
        const wob = 6 * Math.sin(f / 9 + d.ph);
        let [x, y] = [bx + wob, by + 4 * Math.cos(f / 11 + d.ph)];
        if (!inTsn && d.intl) {
          const p = flowP(i);
          if (p > 0) {
            const [ax, ay] = routeHead(arc, p);
            [x, y] = [ax + (bx - tsn[0]) * (1 - p) * 0.4, ay + (by - tsn[1]) * (1 - p) * 0.4];
          }
        }
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: crowdO }}>
            <circle cx={x} cy={y} r={inTsn ? 11 : 12} fill={d.intl ? INTL : ATLAS.white} stroke={ATLAS.ink} strokeWidth={3} />
          </svg>
        );
      })}
      <DataCard value="42 TRIỆU LƯỢT" label="KHÁCH · NĂM 2025" x={540} y={330} f={f} at={at("06", 0.4)} out={at("07", 0.2)} size={80} />
      {[[-1.3, 0.15], [1.3, -0.1], [0.05, -0.95], [0.1, 0.98]].map(([kx, ky], i) => (
        <ImgSticker key={i} src={`${IMG}/l-03-rooftops.png`} x={tsn[0] + kx * tsnW} y={tsn[1] + ky * tsnH}
          w={i < 2 ? 230 : 250} f={f} at={at("07", 0.1) + i * 3} out={i === 3 ? at("11") : at("13") - 6} />
      ))}
      <Stamp text="HẾT CHỖ" x={540} y={330} f={f} at={at("08")} out={at("09", 0.4)} />
      <MapLabel text="QUÂN SỰ" x={tsn[0] - tsnW * 0.3} y={tsn[1] + 18} o={show(f, at("09", 0.45), at("11"))} size={48} />
      <Sticker x={tsn[0] + tsnW * 0.62} y={tsn[1] + tsnH * 0.42} f={f} at={at("10", 0.6)} out={at("11")} s={1.2}>
        <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={ATLAS.ink} strokeWidth={22} strokeLinecap="round" />
        <path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={DEBT} strokeWidth={12} strokeLinecap="round" />
      </Sticker>

      {/* ── 11–12 two sides ── */}
      <PegImg src={`${IMG}/l-05-expand-side.png`} x={250} y={1300} h={270} f={f} at={at("11", 0.1)} o={1 - prog(f, at("13") - 6, 5)} />
      <MapLabel text="PHE MỞ RỘNG" x={260} y={1000} o={show(f, at("11", 0.25), at("13") - 6)} size={48} />
      <PegImg src={`${IMG}/l-06-build-new-side.png`} x={820} y={1300} h={270} f={f} at={at("12", 0.05)} o={1 - prog(f, at("13") - 6, 5)} />
      <MapLabel text="PHE XÂY MỚI" x={810} y={1000} o={show(f, at("12", 0.2), at("13") - 6)} size={48} />

      {/* ── 13–15 2015: 428 / 461; [ĐÙA] a smooth take-off ── */}
      <YearRibbon text="2015" f={f} at={at("13", 0.1)} out={at("16") - 4} />
      <DataCard value="428 / 461" label="PHIẾU TÁN THÀNH" x={540} y={560} f={f} at={at("14", 0.1)} out={at("16") - 6} size={96} />
      {f >= at("15") && f < at("16") && (() => {
        const p = prog(f, at("15", 0.05), at("15", 0.95) - at("15", 0.05));
        const x = interpolate(p, [0, 1], [540, lt[0]]);
        const y = interpolate(p, [0, 1], [720, lt[1] - 40]) - 60 * Math.sin(Math.PI * p);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("16") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y}px`, rotate: `${-12 + 24 * p}deg` }}><MiniPlane s={2.2} /></g>
          </svg>
        );
      })()}

      {/* ── 16–19 5.000 ha, more than six Tân Sơn Nhất; runways ready, passengers not yet ── */}
      <DataCard value="5.000 HA" x={540} y={330} f={f} at={at("16", 0.25)} out={at("17")} size={96} />
      <DataCard value="5.000 ↔ 791 HA" label="DIỆN TÍCH QUY HOẠCH" x={540} y={330} f={f} at={at("17")} out={at("18", 0.2)} size={84} />
      <ImgSticker src={`${IMG}/l-02-lotus-terminal.png`} x={lt[0]} y={lt[1] + 10} w={300} f={f} at={at("18", 0.3)} out={at("20") - 6} />
      <Question x={lt[0] + 30} y={lt[1] - 140} f={f} at={at("19", 0.2)} out={at("20") - 6} s={1.2} />

      {/* ── 20–22 ACV wants everything moved; Vietnam Airlines keeps South-East Asia; 4 routes first ── */}
      <MapLabel text="ACV: DỜI HẾT" x={lt[0] - 60} y={lt[1] - 170} o={show(f, at("20", 0.2), at("21"))} size={52} />
      <MapLabel text="VNA: GIỮ ĐÔNG NAM Á" x={420} y={tsn[1] + 230} o={show(f, at("21", 0.15), at("22"))} size={52} />
      {f >= at("21") && f < at("22") + 6 && <Pulse x={tsn[0]} y={tsn[1]} f={f} color={INTL} o={1 - prog(f, at("22"), 6)} />}
      {f >= at("22") && f < at("23") && [0, 1, 2, 3].map((i) => {
        const p = prog(f, at("22", 0.1) + i * 12, 22);
        if (p <= 0 || p >= 1) return null;
        const [x, y] = routeHead(arc, p);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute" }}>
            <g style={{ translate: `${x}px ${y - 20}px`, rotate: `${-10 + 20 * p}deg` }}><MiniPlane s={1.6} /></g>
          </svg>
        );
      })}
      <DataCard value="4 ĐƯỜNG BAY" label="GIAI ĐOẠN ĐẦU" x={540} y={330} f={f} at={at("22", 0.3)} out={at("23") - 4} size={84} />

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
      <MapLabel text="CƠ TRƯỞNG TRẦN TUẤN HƯNG" x={540} y={480} o={show(f, at("23", 0.45), at("24"))} size={48} />

      {/* ── 24–25 [TWIST] the investor's spreadsheet: break even in 1–2 years… ── */}
      <Sticker x={540} y={700} f={f} at={at("24", 0.2)} out={at("26") - 6} s={1.15}>
        <SheetProp hi={prog(f, at("25", 0.1), 6)} />
      </Sticker>
      <DataCard value="1–2 NĂM" label="DỰ TÍNH ACV" x={540} y={330} f={f} at={at("25", 0.2)} out={at("26") - 4} size={96} />

      {/* ── 26–28 …if 9 in 10 international passengers leave Tân Sơn Nhất; the first plane's trail; they follow ── */}
      {tenO > 0 && Array.from({ length: 10 }, (_, i) => {
        const home: [number, number] = [tsn[0] - 120 + (i % 5) * 60, tsn[1] - 150 + Math.floor(i / 5) * 60];
        const p = flowP(i);
        const hl = i < 9 ? prog(f, at("26", 0.5) + i * 2, 6) : 0;
        let [x, y] = home;
        if (p > 0) {
          const [ax, ay] = routeHead(arc, p);
          [x, y] = [home[0] + (ax - home[0]) * Math.min(1, p * 4), home[1] + (ay - home[1]) * Math.min(1, p * 4)];
          if (p > 0.25) [x, y] = routeHead(arc, p);
        }
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: tenO }}>
            <circle cx={x} cy={y + 3 * Math.sin(f / 10 + i)} r={20 + 6 * hl} fill={INTL} stroke={hl > 0 ? ATLAS.white : ATLAS.ink} strokeWidth={5}
              opacity={i === 9 ? 1 - 0.5 * prog(f, at("26", 0.5), 8) : 1} />
          </svg>
        );
      })}
      <DataCard value="9/10" label="KHÁCH QUỐC TẾ" x={540} y={330} f={f} at={at("26", 0.3)} out={at("27", 0.2)} size={110} />
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
  [W2, "16", 0, -4], [CLICK, "17", 0.05], [W, "20", 0, -4], [CLICK, "22", 0.3],
  [W2, "23", 0, -4], [HIT, "24", 0.2], [CLICK, "26", 0.3],
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

