/**
 * Atlas Tí Hon · P1 Vì sao bản đồ như thế này · Historical Timeline (style I Toy Atlas):
 * "Vì sao Phú Quốc sát Campuchia mà thuộc Việt Nam?" (Lucas 2026-10-22).
 * Script + sources: kich-ban-p1-phu-quoc-brevie-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Soft loop: the VO ends on line 21; the last frame is the opening frame (the Gulf of Thailand).
 *
 * Sea drawing chosen by Lucas at Gate 2 (option A): the Brévié line (1939) as a dashed line that bends around the
 * north of Phú Quốc at 3 km, and the 1982 historic-waters area hatched; NO maritime boundary is drawn. Both are
 * SCHEMATIC (from the descriptions in the letter and the agreement), as are the "old Hà Tiên" and "Nam Kỳ" tints.
 * Measurements: Phú Quốc → Cambodian coast ~11 km (Britannica; card), → Hà Tiên ~40 km (Luis, Natural Earth).
 * Every map-anchored label / prop is declared in PLACES and checked by scripts/geo-check.mjs before each render.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p1-phu-quoc-brevie.timing.json";
import words from "../../src/voiceover/p1-phu-quoc-brevie.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC_ALT, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, baseXY, beats, camAt, countryPath, CountryTag, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MAP_Y,
  MapLabel, PegImg, pts, Question, RegionFill, seamKeys, show, Sticker, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p1-phu-quoc-brevie/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];

/** Every map-anchored label / prop and the province (2024 set) or "sea" it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  pqLabel: { ll: [103.97, 10.22], in: "Kiên Giang" },
  pqNew: { ll: [103.97, 10.22], in: "An Giang", year: 2025 },
  haTien: { ll: [104.49, 10.4], in: "Kiên Giang" },
  macCuu: { ll: [104.95, 10.15], in: "Kiên Giang" },
  ruler10a: { ll: [104.003, 10.45], in: "Kiên Giang" },
  ruler40b: { ll: [104.46, 10.38], in: "Kiên Giang" },
  namKy: { ll: [105.9, 9.75], in: "Sóc Trăng" },
  frFlag: { ll: [106.55, 10.75], in: "TP. Hồ Chí Minh" },
  khTagWaters: { ll: [104.2, 10.65], in: "sea" },
  vnTagWaters: { ll: [104.52, 10.36], in: "Kiên Giang" },
  khTagSouth: { ll: [104.9, 12.4], in: "sea" },
  question: { ll: [103.2, 9.55], in: "sea" },
  threeKm: { ll: [104.0, 10.47], in: "sea" },
  watersTag: { ll: [103.45, 9.5], in: "sea" },
  boat1: { ll: [103.75, 9.95], in: "sea" },
  boat2: { ll: [103.45, 10.25], in: "sea" },
  unsettled: { ll: [103.55, 9.6], in: "sea" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

/** Cambodian mainland coast point used for the ~11 km ruler (Natural Earth, nearest to the north tip). */
const KH_COAST: LL = [104.072, 10.556];
/** The Brévié line, schematic: from the end of the land border, a straight line out to sea that bends around the
 * north of Phú Quốc at ~3 km (0.027°) from its northernmost points, then carries on out to sea. */
const BREVIE: LL[] = [
  [104.452, 10.418], [104.2, 10.46], [104.07, 10.478], [104.03, 10.482], [104.0, 10.478], [103.97, 10.466], [103.94, 10.44],
  [103.9, 10.415], [103.8, 10.35], [103.55, 10.17], [103.2, 9.92],
];
const BENT_FROM = 2; // index where the line starts to bend around the island
/** Historic waters 1982, schematic (Kiên Giang coast, Phú Quốc, Thổ Chu / Kampot coast, Poulo Wai). */
const WATERS: LL[] = [
  [104.25, 10.56], [104.452, 10.418], [104.62, 10.2], [104.7, 9.85], [103.47, 9.3], [103.03, 9.93], [103.55, 10.6], [104.0, 10.62],
];
/** Old Hà Tiên (early 18th c.), schematic tint: Hà Tiên – Rạch Giá – Cà Mau and Phú Quốc. */
const HA_TIEN_OLD: LL[] = [[103.7, 10.62], [105.15, 10.62], [105.35, 9.0], [104.55, 8.45], [103.7, 9.85]];
/** Nam Kỳ (1867), schematic tint: southern Vietnam. */
const NAM_KY: LL[] = [[103.5, 11.65], [110, 11.65], [110, 8.3], [103.5, 8.3]];

const VIEW = {
  gulf: { lon: 104.0, lat: 10.0, zoom: 70 },
  pq: { lon: 104.17, lat: 10.33, zoom: 400 },
  tip: { lon: 104.0, lat: 10.43, zoom: 820 },
  south: { lon: 105.5, lat: 10.3, zoom: 36 },
  waters: { lon: 103.85, lat: 9.95, zoom: 115 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.gulf },
  // opening (Bible 2026-10-21): fly in on Phú Quốc and the Cambodian coast from frame 1
  { at: 1, ...VIEW.pq },
  { at: at("06") - 4, ...VIEW.south },
  { at: at("11") - 4, ...VIEW.pq },
  { at: at("14") - 2, ...VIEW.tip },
  { at: at("16") - 2, ...VIEW.pq },
  { at: at("17") - 4, ...VIEW.waters },
  { at: at("21", 0.4), ...VIEW.gulf },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const KH = ATLAS.b; // green: a blue Cambodia read as sea at close zoom
const NAMKY = "#E89A6B";
const GOLD = ATLAS.gold;

/** Diagonal hatching over the sea only (land of Vietnam and Cambodia masked out). */
const Hatch: React.FC<{ cam: GeoCam; ring: LL[]; o: number; f: number }> = ({ cam, ring, o, f }) => {
  if (o <= 0) return null;
  const [cx, cy] = baseXY(cam.lon, cam.lat);
  const z = cam.zoom;
  const d = `${ring.map(([lo, la], i) => `${i ? "L" : "M"} ${baseXY(lo, la).join(" ")}`).join(" ")} Z`;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <defs>
        <pattern id="hw-hatch" patternUnits="userSpaceOnUse" width={14 / z} height={14 / z} patternTransform="rotate(45)">
          <rect width={14 / z} height={14 / z} fill="#FFE9A6" opacity={0.16} />
          <line x1={0} y1={0} x2={0} y2={14 / z} stroke="#FFE9A6" strokeWidth={4 / z} opacity={0.75} />
        </pattern>
        <mask id="hw-sea" maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={4000} height={4000}>
          <rect x={-2000} y={-2000} width={4000} height={4000} fill="#fff" />
          <path d={`${countryPath("Vietnam")} ${countryPath("Cambodia")} ${countryPath("Thailand")}`} fill="#000" />
        </mask>
      </defs>
      <g style={{ translate: `${CX - cx * z}px ${MAP_Y - cy * z}px`, scale: z, transformOrigin: "0 0" }} mask="url(#hw-sea)">
        <path d={d} fill="url(#hw-hatch)" />
        <path d={d} fill="none" stroke="#FFE9A6" strokeOpacity={0.55 + 0.2 * Math.sin(f / 9)} strokeWidth={3 / z} strokeDasharray={`${10 / z} ${8 / z}`} />
      </g>
    </svg>
  );
};

/** Dashed line (screen space) drawn on with p; gold over an ink edge. */
const Dashed: React.FC<{ ps: [number, number][]; p: number; o?: number; w?: number; glow?: number }> = ({ ps, p, o = 1, w = 8, glow = 0 }) => {
  if (p <= 0 || o <= 0) return null;
  const d = ps.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <defs>
        <mask id="br-draw">
          <path d={d} fill="none" stroke="#fff" strokeWidth={w + 30} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <g mask="url(#br-draw)">
        {glow > 0 && <path d={d} fill="none" stroke={GOLD} strokeWidth={w * 3.2} strokeLinecap="round" strokeLinejoin="round" opacity={0.35 * glow} />}
        <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={w + 6} strokeDasharray="26 14" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={GOLD} strokeWidth={w} strokeDasharray="26 14" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/** Fountain pen (screen space), nib at (0, 0). */
const Pen: React.FC = () => (
  <g stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round" style={{ rotate: "-35deg" }}>
    <path d="M 0 0 L -10 -26 L 10 -26 Z" fill={GOLD} />
    <rect x={-12} y={-120} width={24} height={94} rx={8} fill="#3B2A22" />
    <rect x={-13} y={-48} width={26} height={8} fill={GOLD} />
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  const tail = prog(f, at("21", 0.45), 14);
  // country tints: Cambodia when named (01 / 09 / 13 / 17), old Hà Tiên (06–07), Nam Kỳ (08–16)
  const khO = Math.max(show(f, at("01", 0.2), at("06")), show(f, at("09"), at("18", 0.3)));
  const fills: Fill[] = [
    { name: "Vietnam", color: VN },
    { name: "Paracel Is.", color: VN },
    { name: "Spratly Is.", color: VN },
    ...(khO > 0 ? [{ name: "Cambodia", color: KH }] : []),
  ];
  const haTienO = show(f, at("06", 0.1), at("08")) * 0.7;
  const namKyO = show(f, at("08", 0.25), at("17")) * 0.6;

  // rulers (01–02)
  const r10 = [S(P("ruler10a")), S(KH_COAST)];
  const r40 = [S([104.086, 10.353]), S(P("ruler40b"))];
  const r10P = prog(f, at("01", 0.25), 22, ease);
  const r40P = prog(f, at("02", 0.05), 30, ease);
  const rulerO = 1 - prog(f, at("06") - 6, 6);

  // the Brévié line: straight part (12), the bend around the island (14), alive until the end
  const br = pts(cam, BREVIE);
  const straightP = prog(f, at("12", 0.05), at("13") - at("12", 0.05), ease);
  const bendP = prog(f, at("14", 0.1), at("14", 0.75) - at("14", 0.1), ease);
  const brP = interpolate(straightP + bendP, [0, 1, 2], [0, BENT_FROM / (BREVIE.length - 1), 1], CLAMP);
  const brO = Math.min(show(f, at("12")), 1 - tail);
  const brGlow = Math.max(show(f, at("14", 0.6), at("15", 0.8)), show(f, at("18"), at("18", 0.6)), show(f, at("20", 0.1), at("20", 0.7)));

  // historic waters (17–20)
  const watersO = Math.min(prog(f, at("17", 0.3), 18), 1 - tail);
  const tip = S([104.003, 10.451]);
  const tk = S(P("threeKm"));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={fills} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [22, 30], [1, 0], CLAMP)} />
      <RegionFill cam={cam} id="hatien" country="Vietnam" ring={HA_TIEN_OLD} fill="#F2C14E" o={haTienO} />
      <RegionFill cam={cam} id="namky" country="Vietnam" ring={NAM_KY} fill={NAMKY} o={namKyO} />
      <Hatch cam={cam} ring={WATERS} o={watersO} f={f} />

      {/* ── 01–05 hook: ~11 km to Cambodia, ~40 km to Hà Tiên; the answer is a line ── */}
      <AbsoluteFill style={{ opacity: rulerO }}>
        <Track ps={r10 as [number, number][]} p={r10P} color={ATLAS.white} w={9} />
        <Track ps={r40 as [number, number][]} p={r40P} color={ATLAS.white} w={9} />
      </AbsoluteFill>
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={[104.32, 10.54]} from={at("01", 0.3)}
        o={show(f, at("01", 0.3), at("06") - 4)} glow={[at("01", 0.4)]} />
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={P("khTagSouth")} from={at("09")}
        o={show(f, at("09"), at("10", 0.6))} glow={[at("09", 0.2)]} />
      {/* 17: "Việt Nam và Campuchia ký hiệp định" */}
      <CountryTag cam={cam} f={f} name="Vietnam" label="VIỆT NAM" flag="vietnam" anchor={P("vnTagWaters")} from={at("17", 0.38)}
        o={show(f, at("17", 0.38), at("17", 0.8))} glow={[at("17", 0.4)]} />
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={P("khTagWaters")} from={at("17", 0.52)}
        o={show(f, at("17", 0.52), at("17", 0.8))} glow={[at("17", 0.54)]} />
      <DataCard value="~11 KM" label="SANG CAMPUCHIA" x={CX} y={330} f={f} at={at("01", 0.55)} out={at("02", 0.3)} size={96} />
      <DataCard value="~40 KM" label="VỀ HÀ TIÊN" x={CX} y={330} f={f} at={at("02", 0.35)} out={at("03", 0.5)} size={96} />
      <CityPin cam={cam} f={f} label="HÀ TIÊN" at={P("haTien")} from={at("02", 0.2)} o={show(f, at("02", 0.2), at("05"))} side="above" />
      <MapLabel text="PHÚ QUỐC" x={S(P("pqLabel"))[0]} y={S(P("pqLabel"))[1] + 20} o={show(f, at("01", 0.2), at("06") - 4)} size={56} />
      <Question x={S(P("pqLabel"))[0] + 110} y={S(P("pqLabel"))[1] - 90} f={f} at={at("03")} out={at("04", 0.6)} s={1.2} />
      {f >= at("04", 0.3) && f < at("06") && (() => {
        const p = prog(f, at("04", 0.3), 30, ease);
        const x = interpolate(p, [0, 1], [180, 860]);
        const y = 1100 + 30 * Math.sin(p * Math.PI);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("06") - 6, 5) }}>
            <path d={`M 180 1100 Q ${(180 + x) / 2} ${1130} ${x} ${y}`} fill="none" stroke={GOLD} strokeWidth={10} strokeDasharray="26 14" strokeLinecap="round" />
            <g style={{ translate: `${x}px ${y}px` }}><Pen /></g>
          </svg>
        );
      })()}

      {/* ── 06–07 Mạc Cửu, 1708 ── */}
      <PegImg src={`${IMG}/q-01-mac-cuu.png`} x={S(P("macCuu"))[0] + 35} y={S(P("macCuu"))[1] + 30} h={240} f={f} at={at("06", 0.1)} o={1 - prog(f, at("08"), 6)} />
      <CityPin cam={cam} f={f} label="HÀ TIÊN" at={P("haTien")} from={at("06", 0.2)} o={show(f, at("06", 0.2), at("07", 0.4))} side="left" />
      <YearRibbon text="1708" f={f} at={at("07", 0.05)} out={at("08")} />
      {f >= at("07", 0.3) && f < at("08") && (() => {
        const [x, y] = S(P("macCuu"));
        const p = prog(f, at("07", 0.3), 18, ease);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("08") - 6, 5) }}>
            <path d={`M ${x + 95} ${y - 120} L ${x + 95 + 220 * p} ${y - 120 - 260 * p}`} stroke={ATLAS.ink} strokeWidth={14} strokeLinecap="round" />
            <path d={`M ${x + 95} ${y - 120} L ${x + 95 + 220 * p} ${y - 120 - 260 * p}`} stroke={GOLD} strokeWidth={8} strokeLinecap="round" />
          </svg>
        );
      })()}
      <MapLabel text="CHÚA NGUYỄN" x={CX + 120} y={560} o={show(f, at("07", 0.5), at("08"))} size={52} />

      {/* ── 08–10 1867 Nam Kỳ; Cambodia also under France; which side gets the islands? ── */}
      <YearRibbon text="1867" f={f} at={at("08", 0.05)} out={at("09", 0.5)} />
      <MapLabel text="NAM KỲ" x={S(P("namKy"))[0]} y={S(P("namKy"))[1]} o={show(f, at("08", 0.4), at("10", 0.6))} size={60} />
      {f >= at("08", 0.5) && f < at("10", 0.6) && (() => {
        const [x, y] = S(P("frFlag"));
        return (
          <Sticker x={x} y={y} f={f} at={at("08", 0.5)} out={at("10", 0.4)} s={1}>
            <line x1={0} y1={0} x2={0} y2={-90} stroke="#4A3B2A" strokeWidth={5} />
            <g style={{ translate: "0px -90px" }}>
              <rect width={22} height={40} fill="#1F3F8F" /><rect x={22} width={22} height={40} fill="#F7F2E8" /><rect x={44} width={22} height={40} fill="#C8102E" />
              <rect width={66} height={40} fill="none" stroke={ATLAS.ink} strokeWidth={2} />
            </g>
          </Sticker>
        );
      })()}
      <Question x={S(P("question"))[0]} y={S(P("question"))[1]} f={f} at={at("10", 0.2)} out={at("11")} s={1.2} />

      {/* ── 11–16 [NGƯỜI] Brévié, 31/1/1939: the line bends around the island ── */}
      <YearRibbon text="31/1/1939" f={f} at={at("11", 0.05)} out={at("12", 0.6)} />
      <PegImg src={`${IMG}/q-02-toan-quyen.png`} x={250} y={1290} h={300} f={f} at={at("11", 0.15)} o={1 - prog(f, at("12", 0.6), 6)} />
      <ImgSticker src={`${IMG}/q-03-la-thu.png`} x={700} y={1130} w={300} f={f} at={at("11", 0.3)} out={at("12", 0.6)} />
      <MapLabel text="JULES BRÉVIÉ" x={280} y={950} o={show(f, at("11", 0.35), at("12", 0.6))} size={56} />
      <Dashed ps={br.slice(0, Math.max(2, Math.ceil(brP * (BREVIE.length - 1)) + 1))} p={1} o={brO * (brP > 0 ? 1 : 0)} glow={brGlow} />
      {/* islands north / south of the line (13) */}
      <MapLabel text="CAMPUCHIA" x={S([104.25, 10.6])[0]} y={S([104.25, 10.6])[1]} o={show(f, at("13", 0.05), at("13", 0.95))} size={50} />
      <MapLabel text="NAM KỲ" x={S([104.2, 10.25])[0]} y={S([104.2, 10.25])[1]} o={show(f, at("13", 0.45), at("13", 0.95))} size={50} />
      {/* the 3 km gap at the north tip (14) */}
      {f >= at("14", 0.5) && f < at("16") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("16") - 6, 5) }}>
          <Track ps={[tip, S([104.003, 10.478])]} p={prog(f, at("14", 0.5), 10)} color={ATLAS.white} w={8} />
        </AbsoluteFill>
      )}
      <DataCard value="3 KM" label="QUANH MŨI BẮC" x={CX} y={330} f={f} at={at("14", 0.6)} out={at("16")} size={100} />
      <MapLabel text="ĐƯỜNG BRÉVIÉ 1939" x={Math.min(820, tk[0] + 60)} y={tk[1] - 70} o={show(f, at("14", 0.3), at("16"))} size={50} />
      <RegionFill cam={cam} id="pq-glow" country="Vietnam" ring={[[103.78, 10.52], [104.13, 10.52], [104.13, 9.97], [103.78, 9.97]]} fill={NAMKY}
        o={show(f, at("15"), at("16") - 4) * (0.55 + 0.35 * Math.sin(f / 5))} stroke={GOLD} dash="1 0" />
      <DataCard value="CHỈ ĐỂ QUẢN LÝ" x={CX} y={330} f={f} at={at("16", 0.3)} out={at("17")} size={80} />
      <ImgSticker src={`${IMG}/q-03-la-thu.png`} x={CX} y={1120} w={330} f={f} at={at("16", 0.05)} out={at("17") - 2} />

      {/* ── 17–19 1982 historic waters, joint patrol; 2025 special zone ── */}
      <YearRibbon text="7/7/1982" f={f} at={at("17", 0.05)} out={at("18", 0.5)} />
      <MapLabel text="VÙNG NƯỚC LỊCH SỬ" x={S(P("watersTag"))[0]} y={S(P("watersTag"))[1]} o={show(f, at("17", 0.8), at("19"))} size={52} />
      {f >= at("18", 0.2) && f < at("19", 0.5) && ([["boat1", "vietnam", 1], ["boat2", "cambodia", -1]] as const).map(([k, flag, dir]) => {
        const [x, y] = S(P(k));
        const dx = dir * 60 * prog(f, at("18", 0.2), at("19", 0.5) - at("18", 0.2));
        return (
          <AbsoluteFill key={k} style={{ opacity: 1 - prog(f, at("19", 0.3), 6) }}>
            <ImgSticker src={`${IMG}/q-04-thuyen-tuan-tra.png`} x={x + dx} y={y} w={170} f={f} at={at("18", 0.2)} />
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <g style={{ translate: `${x + dx + 8}px ${y - 120}px` }}><Flag kind={flag} w={50} f={f} /></g>
            </svg>
          </AbsoluteFill>
        );
      })}
      <CityPin cam={cam} f={f} label="PHÚ QUỐC" at={P("pqLabel")} from={at("19", 0.1)} o={show(f, at("19", 0.1), at("20"))} side="right" color={ATLAS.red} />
      <DataCard value="ĐẶC KHU" label="TỪ 2025" x={CX} y={330} f={f} at={at("19", 0.3)} out={at("20")} size={96} />

      {/* ── 20 [TWIST] the islands were divided; the sea boundary is still not drawn ── */}
      <Question x={S(P("unsettled"))[0]} y={S(P("unsettled"))[1] - 40} f={f} at={at("20", 0.35)} out={at("21", 0.4)} s={1.3} />
      <MapLabel text="CHƯA PHÂN ĐỊNH" x={S(P("unsettled"))[0]} y={S(P("unsettled"))[1] + 70} o={show(f, at("20", 0.45), at("21", 0.4))} size={52} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Phú Quốc cách bờ Campuchia chừng *10 km*.",
  "02": "Còn về tới Hà Tiên thì xa gấp *4 lần*.",
  "05": "Một *đường kẻ*.",
  "06": "Đầu thế kỷ *18*, *Mạc Cửu* cai quản vùng Hà Tiên, gồm cả đảo Phú Quốc.",
  "07": "Năm *1708*, ông đưa cả vùng đất này về với *chúa Nguyễn*.",
  "08": "Năm *1867*, Pháp chiếm Hà Tiên, Phú Quốc thành một phần của *Nam Kỳ*.",
  "11": "Năm *1939*, Toàn quyền Đông Dương *Jules Brévié* gửi đi một lá thư.",
  "14": "Tới gần Phú Quốc, đường kẻ *bẻ cong*, vòng qua mũi bắc đảo, chừa đúng *3 km*.",
  "16": "Ông còn ghi rõ: đường này chỉ để *quản lý* hành chính và cảnh sát.",
  "17": "Năm *1982*, Việt Nam và Campuchia ký hiệp định *vùng nước lịch sử*.",
  "19": "Từ năm *2025*, Phú Quốc là một *đặc khu* của Việt Nam.",
  "20": "Nhưng chi tiết lạ nhất là: đường kẻ ấy chia được đảo, mà đường biên trên biển ở đây đến nay vẫn *chưa được vạch*.",
  "21": "Một nét bút đã giữ hòn đảo lại, còn mặt biển quanh nó vẫn đang chờ một *đường kẻ mới*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [CLICK, "02", 0.3], [PEN, "05", 0.1], [WH, "06", 0, -4], [CLICK, "08", 0.4], [WH2, "11", 0, -4],
  [PEN, "12", 0.05], [THUD, "14", 0.6, 0, -18], [CLICK, "16", 0.3], [WH, "17", 0, -4], [CLICK, "19", 0.3],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("20") - 6, at("20") + 6, at("21", 1) - 4, at("21", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

export const P1PhuQuocBrevie: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p1-phu-quoc-brevie/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC_ALT.P1} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p1PhuQuocBrevieDuration = (fps: number) => episodeDuration(timing, fps);
