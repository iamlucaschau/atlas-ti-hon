/**
 * Atlas Tí Hon · P5 Kỳ lạ & kỷ lục · Region Reveal, template "Một tỉnh, N thế giới" (style I Toy Atlas):
 * "TP.HCM mới: một thành phố, ba thế giới" — v2 (Lucas 2026-10-22, QA-v1.md C1–C11; same voiceover).
 * First episode with `MapFace`, `PromiseTitle` and character voices (lines 08 Leda · 12 Aoede · 15 Puck, `cast` in
 * voiceover/p5-tphcm-ba-the-gioi.json). Script + sources: kich-ban-p5-tphcm-ba-the-gioi-FINAL.md, cong-2_so-nguon.md.
 * Soft loop: the VO ends on line 22; the last frame is the opening frame (southern Vietnam, the three old
 * provinces in their colours).
 *
 * Every map-anchored label / face / prop is declared in PLACES and checked against the province shapes by
 * scripts/geo-check.mjs before each render (QA-v1: "SÀI GÒN" sat in Bình Dương, "BÌNH DƯƠNG" in Bình Phước).
 * Map: VN2024 (old provinces; Côn Đảo moved back to Bà Rịa - Vũng Tàu by the kit) over VN2025 (new TP.HCM);
 * Natural Earth urban area for "the city". Bạch Hổ, the Côn Đảo cable and the props are ILLUSTRATIVE.
 */
import { Audio } from "@remotion/media";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p5-tphcm-ba-the-gioi.timing.json";
import words from "../../src/voiceover/p5-tphcm-ba-the-gioi.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC_ALT, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog, SUB_BOTTOM } from "../../Style Library/kit-common";
import { KaraokeSubs, type SubSkin } from "../../Style Library/subs";
import urbanGeo from "../../Style Library/I-toy-atlas/geo/ne-urban-hcm.json";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, DataCard, type FaceMood, type GeoCam, ImgSticker, MapFace, PegImg,
  projectGeo, PromiseTitle, Question, seamKeys, show, talkOpen, toScreen, Track, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, flashAt, ProvinceMap, ProvinceTag, VN2024, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p5-tphcm-ba-the-gioi/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;

type LL = [number, number];

/** Every map-anchored thing and the 2024 province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  tpTag: { ll: [106.7, 11.0], in: "TP. Hồ Chí Minh", year: 2025 },
  sgTag: { ll: [106.69, 10.83], in: "TP. Hồ Chí Minh" },
  sgFace: { ll: [106.6, 10.92], in: "TP. Hồ Chí Minh" },
  mandarin: { ll: [106.69, 10.78], in: "TP. Hồ Chí Minh" },
  scooters: { ll: [106.74, 10.73], in: "TP. Hồ Chí Minh" },
  coffee: { ll: [106.78, 10.69], in: "TP. Hồ Chí Minh" },
  bdTag: { ll: [106.72, 11.24], in: "Bình Dương" },
  bdFace: { ll: [106.68, 11.27], in: "Bình Dương" },
  factory1: { ll: [106.7, 10.94], in: "Bình Dương" },
  factory2: { ll: [106.66, 11.06], in: "Bình Dương" },
  factory3: { ll: [106.58, 11.15], in: "Bình Dương" },
  factory4: { ll: [106.62, 11.29], in: "Bình Dương" },
  factory5: { ll: [106.78, 11.06], in: "Bình Dương" },
  workers: { ll: [106.56, 11.08], in: "Bình Dương" },
  pie: { ll: [106.79, 11.2], in: "Bình Dương" },
  vtTag: { ll: [107.22, 10.72], in: "Bà Rịa - Vũng Tàu" },
  vtFace: { ll: [107.32, 10.6], in: "Bà Rịa - Vũng Tàu" },
  umbrella: { ll: [107.09, 10.36], in: "Bà Rịa - Vũng Tàu" },
  mergedSg: { ll: [106.684, 10.777], in: "TP. Hồ Chí Minh" },
  mergedBd: { ll: [106.648, 11.21], in: "Bình Dương" },
  mergedVt: { ll: [107.299, 10.587], in: "Bà Rịa - Vũng Tàu" },
  bachHo: { ll: [107.97, 9.75], in: "sea" },
  conDao: { ll: [106.6, 8.69], in: "Bà Rịa - Vũng Tàu" },
  conDaoNew: { ll: [106.6, 8.69], in: "TP. Hồ Chí Minh", year: 2025 },
  cableLand: { ll: [106.15, 9.48], in: "Sóc Trăng" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;
const VUNG_TAU_TIP: LL = [107.08, 10.34];

const NEW = "TP. Hồ Chí Minh";
const OLD3 = ["TP. Hồ Chí Minh", "Bình Dương", "Bà Rịa - Vũng Tàu"];
/** the three worlds, brighter than v1 so they stand out from the dimmed rest (C2) */
const COL = ["#F07F72", "#6FC25E", "#58A8E8"];
const NAMES = ["SÀI GÒN", "BÌNH DƯƠNG", "VŨNG TÀU"];
const GOLD = "#F3C64A";
const VN = ATLAS.c;
const DIM = "#E2D4B6"; // the other provinces once the camera is close (C2)
const SG_PATH = VN2024.find((p) => p.name === "TP. Hồ Chí Minh")?.d ?? "";
const URBAN = (urbanGeo as unknown as FeatureCollection<Geometry, object>).features.map((g: Feature<Geometry, object>) => projectGeo(g)).join(" ");

const VIEW = {
  nb: { lon: 106.6, lat: 9.95, zoom: 115 },
  hcm: { lon: 106.85, lat: 10.95, zoom: 205 },
  sg: { lon: 106.68, lat: 10.84, zoom: 430 },
  bd: { lon: 106.66, lat: 11.13, zoom: 360 },
  vt: { lon: 107.22, lat: 10.52, zoom: 360 },
  sea: { lon: 107.65, lat: 10.0, zoom: 210 },
  cd: { lon: 106.6, lat: 9.45, zoom: 185 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.nb },
  // opening (Bible 2026-10-21): fly in on the new city from frame 1
  { at: 1, ...VIEW.hcm },
  { at: at("04") - 4, ...VIEW.sg },
  { at: at("09") - 4, ...VIEW.bd },
  { at: at("13") - 4, ...VIEW.vt },
  { at: at("14", 0.05), ...VIEW.sea },
  { at: at("15") - 6, ...VIEW.vt },
  { at: at("16") - 4, ...VIEW.hcm },
  { at: at("18", 0.35), ...VIEW.cd },
  { at: at("22", 0.4), ...VIEW.nb },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);
/** frame the camera has landed back on the opening view (C10: old colours come back only then) */
const BACK = at("22", 0.4) + 30;

/** Mouth for a character line: open/close per word of that VO line. */
const talk = (f: number, id: string) => talkOpen(f, FPS, W[id] ?? [], line(id).end);

/** Who speaks a character line (C4): VO line id → index into NAMES / COL. */
const SPEAKERS: Record<string, number> = { "08": 0, "12": 1, "15": 2 };

/** Subtitles with a speaker tag above them while a province is talking (C4). */
const SpeakerSub: SubSkin = (props) => {
  const t = props.f / FPS;
  const id = Object.keys(SPEAKERS).find((k) => t >= line(k).start - 0.05 && t <= line(k).end + 0.15);
  const i = id === undefined ? -1 : SPEAKERS[id];
  const o = id === undefined ? 0 : prog(props.f, Math.round(line(id).start * FPS) - 2, 5);
  const label = i >= 0 ? `${NAMES[i]} NÓI` : "";
  const w = label.length * 30 + 70;
  return (
    <>
      {i >= 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
          <g style={{ translate: `${CX}px ${SUB_BOTTOM - 150}px` }}>
            <rect x={-w / 2} y={-34} width={w} height={64} rx={32} fill={COL[i]} stroke={ATLAS.ink} strokeWidth={5} />
            <path d="M -14 28 L 0 48 L 14 28 Z" fill={COL[i]} stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
            <rect x={-16} y={22} width={32} height={10} fill={COL[i]} />
            <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{label}</text>
          </g>
        </svg>
      )}
      <AtlasSub {...props} />
    </>
  );
};

/** Small iced-coffee cup (screen space), base at (0, 0). */
const Coffee: React.FC = () => (
  <g stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round">
    <path d="M -18 -60 L 18 -60 L 13 0 L -13 0 Z" fill="#B07A4F" />
    <path d="M -18 -60 L 18 -60 L 17 -48 L -17 -48 Z" fill="#F2E6D0" />
    <path d="M -22 -64 L 22 -64" strokeWidth={6} strokeLinecap="round" />
    <path d="M 4 -64 L 12 -88" strokeWidth={5} strokeLinecap="round" stroke="#E8573F" />
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // C2: the rest of Vietnam fades to a neutral tone when the camera is close
  const dimO = interpolate(cam.zoom, [135, 190], [0, 1], CLAMP);
  // the three old provinces in colour, except while they are one gold city (03 and 16–22); back once landed (C10)
  const goldO = Math.max(
    Math.min(prog(f, at("03", 0.35), 18), 1 - prog(f, at("04") - 8, 8)),
    Math.min(prog(f, at("16"), 14), 1 - prog(f, BACK, 12)),
  );
  const oldO = 1 - goldO;
  const flash = (i: number) => flashAt(f, [at("02", 0.2 + i * 0.22)]);
  const cityO = show(f, at("04"), at("09") - 4); // the urban area, Sài Gòn's "streets" (C5)

  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} />
      {dimO > 0 && <ProvinceMap z={z} set={VN2025} tag="dim" base={DIM} lines={0.4} o={dimO} f={f} />}
      <ProvinceMap z={z} set={VN2025.filter((p) => p.name === NEW)} tag="new" base={GOLD} lines={0} o={goldO} f={f}
        flash={[{ name: NEW, v: flashAt(f, [at("03", 0.5), at("16", 0.1)]) }]} />
      <ProvinceMap z={z} set={VN2024.filter((p) => OLD3.includes(p.name))} tag="old" lines={1} o={oldO} f={f}
        fills={OLD3.map((name, i) => ({ name, color: COL[i] }))} flash={OLD3.map((name, i) => ({ name, v: flash(i) }))} />
      {cityO > 0 && (
        <g opacity={cityO}>
          <defs>
            <clipPath id="sg-clip"><path d={SG_PATH} /></clipPath>
            <pattern id="sg-blocks" patternUnits="userSpaceOnUse" width={7 / z} height={7 / z}>
              <rect x={1.5 / z} y={1.5 / z} width={4 / z} height={4 / z} rx={0.8 / z} fill="#C9776C" opacity={0.55} />
            </pattern>
          </defs>
          <g clipPath="url(#sg-clip)">
            <path d={URBAN} fill="#F6D2C9" />
            <path d={URBAN} fill="url(#sg-blocks)" />
            <path d={URBAN} fill="none" stroke={ATLAS.ink} strokeOpacity={0.35} strokeWidth={1.4 / z} />
          </g>
        </g>
      )}
    </>
  );

  // C3: faces scale with the zoom so they stay inside their province
  const fs = (k = 1) => k * Math.min(1.3, Math.max(0.55, 1.2 * (cam.zoom / 400) ** 0.8));
  const together = show(f, at("16"), at("18"));
  const face = (k: keyof typeof PLACES, id: string, mood: FaceMood, i: number, from: number, until: number) => {
    const o = show(f, from, until);
    if (o <= 0) return null;
    const [x, y] = S(P(k));
    return (
      <AbsoluteFill style={{ opacity: o }}>
        <MapFace x={x} y={y} f={f} at={from} mood={mood} talk={talk(f, id)} s={fs()} seed={i} label={NAMES[i]} labelColor={ATLAS.white} />
      </AbsoluteFill>
    );
  };

  const cd = S(P("conDao"));
  const vtTip = S(VUNG_TAU_TIP);
  // 20–21: the cable from the Sóc Trăng side reaches the island at 21 · 0.35, which lights up (C9)
  const reach = at("21", 0.35);
  const cableP = prog(f, at("20", 0.2), reach - at("20", 0.2));
  const lit = prog(f, reach, 10);
  const darkO = Math.min(prog(f, at("18", 0.5), 12), 1 - lit) * (1 - prog(f, at("22", 0.4), 10));
  const glowO = lit * (1 - prog(f, at("22", 0.45), 12));
  const cable = [S(P("cableLand")), cd];

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />

      {/* ── 01–03 myth, the promise, the merger ── */}
      <ImgSticker src={`${IMG}/s-02-xe-may.png`} x={S(P("scooters"))[0]} y={S(P("scooters"))[1] - 30} w={150} f={f} at={at("01", 0.2)} out={at("02")} />
      <PromiseTitle lines={["3 THẾ GIỚI", "MỘT THÀNH PHỐ"]} y={980} f={f} at={at("02", 0.1)} out={at("03", 0.3)} />
      <YearRibbon text="1/7/2025" f={f} at={at("03", 0.3)} out={at("04")} />
      <ProvinceTag cam={cam} f={f} label="TP.HCM" anchor={P("tpTag")} from={at("03", 0.55)} o={show(f, at("03", 0.55), at("04") - 4)} size={72} />

      {/* ── 04–08 world 1: Sài Gòn (city = the urban area) ── */}
      <ProvinceTag cam={cam} f={f} label="SÀI GÒN" anchor={P("sgTag")} from={at("05")} o={show(f, at("05"), at("06", 0.15))} size={60} />
      <YearRibbon text="1698" f={f} at={at("06", 0.05)} out={at("07")} />
      {(() => {
        const [x, y] = S(P("mandarin"));
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("07"), 6) }}>
            <PegImg src={`${IMG}/s-01-quan-xua.png`} x={x} y={y + 40} h={260} f={f} at={at("06", 0.1)} />
            <svg width={1080} height={1920} style={{ position: "absolute", opacity: show(f, at("06", 0.3)) }}>
              <text x={x} y={y + 100} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={ATLAS.white}
                stroke={ATLAS.ink} strokeWidth={10} strokeLinejoin="round" paintOrder="stroke">PHỦ GIA ĐỊNH</text>
            </svg>
          </AbsoluteFill>
        );
      })()}
      <ImgSticker src={`${IMG}/s-02-xe-may.png`} x={S(P("scooters"))[0]} y={S(P("scooters"))[1]} w={230} f={f} at={at("07", 0.1)} out={at("09") - 4} />
      {f >= at("07", 0.3) && f < at("09") && (() => {
        const [x, y] = S(P("coffee"));
        const k = prog(f, at("07", 0.3), 8);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("09") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y + 3 * Math.sin(f / 9)}px`, scale: 1.2 * k }}><Coffee /></g>
          </svg>
        );
      })()}
      {face("sgFace", "08", "happy", 0, at("08", 0.02), at("09") - 4)}

      {/* ── 09–12 world 2: Bình Dương ── */}
      <ProvinceTag cam={cam} f={f} label="BÌNH DƯƠNG" anchor={P("bdTag")} from={at("09", 0.4)} o={show(f, at("09", 0.4), at("10", 0.15))} size={60} />
      {(["factory1", "factory2", "factory3", "factory4", "factory5"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        return <ImgSticker key={k} src={`${IMG}/s-03-nha-xuong.png`} x={x} y={y - 30} w={140} f={f} at={at("10") + i * 5} out={at("12")} />;
      })}
      <DataCard value="~30 KCN" label="KHU CÔNG NGHIỆP" x={CX} y={330} f={f} at={at("10", 0.2)} out={at("11")} size={96} />
      {f >= at("11") && f < at("12") + 6 && (() => {
        const [wx, wy] = S(P("workers"));
        const [px, py] = S(P("pie"));
        const walk = prog(f, at("11"), 36);
        const p = prog(f, at("11", 0.3), 14);
        const r = 78;
        const a1 = -Math.PI / 2 + Math.PI * 2 * 0.53 * p;
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("12"), 6) }}>
            <ImgSticker src={`${IMG}/s-04-cong-nhan.png`} x={interpolate(walk, [0, 1], [wx - 160, wx], CLAMP)} y={wy} w={300} f={f} at={at("11")} />
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <circle cx={px} cy={py} r={r} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
              {p > 0 && <path d={`M ${px} ${py} L ${px} ${py - r} A ${r} ${r} 0 ${p * 0.53 > 0.5 ? 1 : 0} 1 ${px + r * Math.cos(a1)} ${py + r * Math.sin(a1)} Z`}
                fill={COL[1]} stroke={ATLAS.ink} strokeWidth={5} />}
            </svg>
          </AbsoluteFill>
        );
      })()}
      <DataCard value="> 1/2 DÂN" label="TỪ NƠI KHÁC TỚI" x={CX} y={330} f={f} at={at("11", 0.2)} out={at("12")} size={90} />
      {face("bdFace", "12", "smug", 1, at("12", 0.02), at("13") - 4)}

      {/* ── 13–15 world 3: Bà Rịa – Vũng Tàu ── */}
      <ProvinceTag cam={cam} f={f} label="BÀ RỊA – VŨNG TÀU" anchor={P("vtTag")} from={at("13", 0.4)} o={show(f, at("13", 0.4), at("14"))} size={52} />
      <ImgSticker src={`${OLD}/p1-tay-nguyen-co-bien/cut/g-04-beach.png`} x={S(P("umbrella"))[0]} y={S(P("umbrella"))[1] - 30} w={130} f={f} at={at("13", 0.5)} out={at("16") - 4} />
      <YearRibbon text="1986" f={f} at={at("14", 0.2)} out={at("15")} />
      {(() => {
        const [x, y] = S(P("bachHo"));
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("15", 0.2), 6) }}>
            <ImgSticker src={`${IMG}/s-05-gian-khoan.png`} x={x} y={y - 60} w={190} f={f} at={at("14", 0.3)} />
            <svg width={1080} height={1920} style={{ position: "absolute", opacity: show(f, at("14", 0.45)) }}>
              <text x={x} y={y + 80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={ATLAS.white}
                stroke={ATLAS.ink} strokeWidth={10} strokeLinejoin="round" paintOrder="stroke">MỎ BẠCH HỔ</text>
            </svg>
          </AbsoluteFill>
        );
      })()}
      {face("vtFace", "15", "wink", 2, at("15", 0.02), at("16") - 4)}

      {/* ── 16–17 all together: one gold city, three named faces ── */}
      {together > 0 && (["mergedSg", "mergedBd", "mergedVt"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        return (
          <AbsoluteFill key={k} style={{ opacity: together }}>
            <MapFace x={x} y={y} f={f} at={at("16")} mood="happy" s={fs(1.3)} seed={i} label={NAMES[i]} labelColor={ATLAS.white} />
          </AbsoluteFill>
        );
      })}
      <DataCard value="14 TRIỆU DÂN" label="TP.HCM MỚI" x={CX} y={330} f={f} at={at("16", 0.3)} out={at("17")} size={92} />
      {(() => {
        const barO = show(f, at("17"), at("18"));
        if (barO <= 0) return null;
        const barP = prog(f, at("17", 0.1), 14);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: barO }}>
            <rect x={160} y={1150} width={700} height={84} rx={18} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
            <rect x={160} y={1150} width={175 * barP} height={84} rx={18} fill={GOLD} />
            {[1, 2, 3].map((n) => <line key={n} x1={160 + 175 * n} y1={1150} x2={160 + 175 * n} y2={1234} stroke={ATLAS.ink} strokeWidth={4} />)}
            <rect x={160} y={1150} width={700} height={84} rx={18} fill="none" stroke={ATLAS.ink} strokeWidth={6} />
            <text x={597} y={1210} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink} opacity={0.75}>CẢ NƯỚC</text>
          </svg>
        );
      })()}
      <DataCard value="~1/4" label="KINH TẾ CẢ NƯỚC" x={CX} y={330} f={f} at={at("17", 0.15)} out={at("18")} size={100} />

      {/* ── 18–21 [TWIST] Côn Đảo got grid power only in 9/2025: dark island, a gold cable, the island lights up ── */}
      {darkO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: darkO }}>
          <defs>
            <radialGradient id="cd-night"><stop offset="0%" stopColor="#0B1520" stopOpacity={0.75} /><stop offset="100%" stopColor="#0B1520" stopOpacity={0} /></radialGradient>
          </defs>
          <circle cx={cd[0]} cy={cd[1]} r={120} fill="url(#cd-night)" />
        </svg>
      )}
      <Question x={cd[0] + 90} y={cd[1] - 100} f={f} at={at("18", 0.6)} out={at("19", 0.4)} s={1.1} />
      <CityPin cam={cam} f={f} label="CÔN ĐẢO" at={P("conDao")} from={at("19")} o={show(f, at("19"), reach - 4)} side="left" />
      {f >= at("19") && f < at("20", 0.2) && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("20"), 6) }}>
          <Track ps={[vtTip, [cd[0] + (vtTip[0] - cd[0]) * 0.06, cd[1] + (vtTip[1] - cd[1]) * 0.06]]} p={prog(f, at("19", 0.1), 24)} color={ATLAS.white} w={6} />
        </AbsoluteFill>
      )}
      <DataCard value="~200 KM" label="CÁCH VŨNG TÀU" x={380} y={330} f={f} at={at("19", 0.35)} out={at("20")} size={96} />
      <YearRibbon text="9/2025" f={f} at={at("20", 0.05)} out={reach - 6} />
      <Track ps={cable} p={cableP} color={ATLAS.gold} w={11} glow={0.6 + 0.4 * lit} f={f}
        o={Math.min(prog(f, at("20", 0.2), 4), 1 - prog(f, at("22", 0.4), 10))} />
      {cableP > 0 && cableP < 1 && (() => {
        const x = cable[0][0] + (cable[1][0] - cable[0][0]) * cableP;
        const y = cable[0][1] + (cable[1][1] - cable[0][1]) * cableP;
        return (
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            <circle cx={x} cy={y} r={30} fill={ATLAS.gold} opacity={0.45} />
            <circle cx={x} cy={y} r={16} fill={ATLAS.white} opacity={0.9} />
          </svg>
        );
      })()}
      {glowO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: glowO }}>
          <defs>
            <radialGradient id="cd-light"><stop offset="0%" stopColor="#FFE58F" stopOpacity={0.95} /><stop offset="100%" stopColor="#FFD14A" stopOpacity={0} /></radialGradient>
          </defs>
          <circle cx={cd[0]} cy={cd[1]} r={70 + 60 * lit + 6 * Math.sin(f / 5)} fill="url(#cd-light)" />
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * Math.PI * 2 + f / 60;
            const r0 = 70 + 10 * Math.sin(f / 6 + i);
            return <line key={i} x1={cd[0] + r0 * Math.cos(a)} y1={cd[1] + r0 * Math.sin(a)} x2={cd[0] + (r0 + 28) * Math.cos(a)} y2={cd[1] + (r0 + 28) * Math.sin(a)}
              stroke={ATLAS.gold} strokeWidth={6} strokeLinecap="round" />;
          })}
        </svg>
      )}
      <DataCard value="~80 KM" label="CÁP NGẦM DƯỚI BIỂN" x={CX} y={330} f={f} at={reach} out={at("22")} size={96} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "02": "Thật ra, giờ nó là *ba thế giới*.",
  "03": "Từ tháng 7 năm *2025*, Sài Gòn, Bình Dương và Bà Rịa Vũng Tàu nhập làm một.",
  "05": "*Sài Gòn*.",
  "06": "Năm *1698*, *Nguyễn Hữu Cảnh* vào Nam lập phủ Gia Định, dựng dinh ở vùng đất này.",
  "10": "Gần *30 khu công nghiệp* nối nhau.",
  "11": "*Hơn một nửa* người dân ở đây từ nơi khác tới.",
  "14": "Từ năm *1986*, dầu được hút lên từ mỏ *Bạch Hổ*, mỏ dầu lớn nhất nước.",
  "16": "Gộp lại, thành phố mới có hơn *14 triệu* dân.",
  "17": "Và làm ra gần *1/4* nền kinh tế cả nước.",
  "19": "Đặc khu *Côn Đảo*, cách Vũng Tàu gần *200 km*.",
  "20": "Phải đến tháng 9 năm *2025*, điện lưới quốc gia mới ra tới đảo.",
  "21": "Bằng một đường cáp ngầm gần *80 km* dưới biển.",
  "22": "Ba thế giới trên đất liền, một hòn đảo ngoài khơi, giờ chung *một cái tên*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [CLICK, "02", 0.15], [WH, "04", 0, -4], [PEN, "06", 0.1], [WH2, "09", 0, -4], [CLICK, "10", 0.1],
  [WH, "13", 0, -4], [THUD, "14", 0.3, 0, -18], [CLICK, "16", 0.3], [WH2, "18", 0.35, -4], [CLICK, "21", 0.35],
];

export const P5TphcmBaTheGioi: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={SpeakerSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p5-tphcm-ba-the-gioi/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC_ALT.P5} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p5TphcmBaTheGioiDuration = (fps: number) => episodeDuration(timing, fps);
