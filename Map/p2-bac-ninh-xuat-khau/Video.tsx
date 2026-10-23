/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (+ Timeline twist), style I Toy Atlas:
 * "Vì sao tỉnh nhỏ nhất nước lại xuất khẩu nhiều nhất?" (Bắc Ninh) — v2, Gates 3–4 v2 approved by Lucas 2026-10-23
 * (v1 = commit 093e2ec). Script + sources: kich-ban-p2-bac-ninh-xuat-khau-FINAL.md, cong-2_so-nguon.md (C1–C23).
 * Numbers are goods exports by locality (Customs). Human moment: Nguyễn Quang Thanh (Bắc Ninh planning & investment
 * department) to AP, 3/2008. Line 10 is Bắc Ninh talking (`MapFace`, cast "bacninh" = Aoede).
 * Twist: Hà Bắc split on 1/1/1997 into Bắc Ninh + Bắc Giang; both merged again on 1/7/2025 (NQ 202/2025/QH15).
 * Soft loop: the VO ends on line 22; the last frame is the opening frame (all of Vietnam, 2025 provinces).
 *
 * Every map-anchored label / pin / face / prop is declared in PLACES and checked against the province shapes by
 * scripts/geo-check.mjs before each render. Map: VN2025 (34 provinces); VN2024 for "before 7/2025" shots and Hà Bắc
 * (= old Bắc Ninh + old Bắc Giang; their shared border is the 1997 split line). Factories, the plane, the race bars
 * and the scooters are ILLUSTRATIVE.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-bac-ninh-xuat-khau.timing.json";
import words from "../../src/voiceover/p2-bac-ninh-xuat-khau.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog, SUB_BOTTOM } from "../../Style Library/kit-common";
import { KaraokeSubs, type SubSkin } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, MapFace, MapLabel, PegImg,
  Question, seamKeys, show, Stamp, talkOpen, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import {
  BorderLine, CityPin, flashAt, provinceBorder, ProvinceMap, ProvinceTag, VN2024, VN2025,
} from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-bac-ninh-xuat-khau/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;
const ease = Easing.inOut(Easing.cubic);
/** Frame of word `i` of VO line `id` (words.json holds absolute start times in seconds). */
const wAt = (id: string, i: number) => Math.round((W[id]?.[i] ?? line(id).start) * FPS);

type LL = [number, number];

/** Every map-anchored thing and the province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  bnTag: { ll: [106.42, 21.31], in: "Bắc Ninh", year: 2025 },
  hcmTag: { ll: [106.75, 10.95], in: "TP. Hồ Chí Minh", year: 2025 },
  bnOld: { ll: [106.1, 21.1], in: "Bắc Ninh" },
  bnFace: { ll: [106.13, 21.09], in: "Bắc Ninh" },
  yenPhong: { ll: [105.957, 21.205], in: "Bắc Ninh" },
  noiBai: { ll: [105.807, 21.221], in: "Hà Nội" },
  haiPhong: { ll: [106.70, 20.86], in: "Hải Phòng" },
  huuNghi: { ll: [106.725, 21.972], in: "Lạng Sơn" },
  china: { ll: [106.85, 22.33], in: "sea" },
  boxes: { ll: [105.83, 21.2], in: "Hà Nội" },
  bgTag: { ll: [106.3, 21.42], in: "Bắc Giang" },
  worker: { ll: [106.75, 21.3], in: "Bắc Giang" },
  bdTag: { ll: [106.65, 11.25], in: "Bình Dương" },
  vtTag: { ll: [107.25, 10.62], in: "Bà Rịa - Vũng Tàu" },
  iz1: { ll: [105.98, 21.2], in: "Bắc Ninh" },
  iz2: { ll: [106.07, 21.07], in: "Bắc Ninh" },
  iz3: { ll: [106.18, 21.25], in: "Bắc Giang" },
  iz4: { ll: [106.33, 21.31], in: "Bắc Giang" },
  iz5: { ll: [106.2, 21.03], in: "Bắc Ninh" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

const BN = "Bắc Ninh";
const BG = "Bắc Giang";
const HCM = "TP. Hồ Chí Minh";
const HCM_OLD = ["TP. Hồ Chí Minh", "Bình Dương", "Bà Rịa - Vũng Tàu"];
const VN = ATLAS.c;
const GOLD = "#F3C64A";
const BLUE = "#58A8E8";
const DIM = "#E2D4B6";
const BG_COL = "#F09A5B";
const HA_BAC = "#D98B4E";
const OLD_HCM = ["#58A8E8", "#6FC25E", "#7FD3CF"];
const SPLIT = provinceBorder(BN, BG, 2024); // the 1997 split line of Hà Bắc

const VIEW = {
  vn: { lon: 106.4, lat: 16.2, zoom: 24 },
  bnSmall: { lon: 106.1, lat: 21.12, zoom: 160 },
  close: { lon: 105.98, lat: 21.15, zoom: 300 },
  north: { lon: 106.3, lat: 21.6, zoom: 105 },
  merge: { lon: 106.45, lat: 21.25, zoom: 190 },
  south: { lon: 106.85, lat: 10.85, zoom: 150 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): from frame 1 the camera flies onto old Bắc Ninh, small among its neighbours
  { at: 1, ...VIEW.bnSmall },
  { at: at("02") - 2, ...VIEW.vn },
  { at: at("05") - 4, ...VIEW.close },
  { at: at("07") - 4, ...VIEW.north },
  { at: at("10") - 4, ...VIEW.close },
  { at: at("12") - 4, ...VIEW.merge },
  { at: at("13") - 4, ...VIEW.south },
  { at: at("14") - 4, ...VIEW.vn },
  { at: at("17") - 4, ...VIEW.merge },
  { at: wAt("22", 10), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);
/** frame the camera is back on the opening view: highlights are gone by then */
const BACK = wAt("22", 10) + 34;

/** Mouth for the talking line (10): open/close per word. */
const talk = (f: number) => talkOpen(f, FPS, W["10"] ?? [], line("10").end);

/** Subtitles with a "BẮC NINH NÓI" tag above them while the province talks (line 10). */
const SpeakerSub: SubSkin = (props) => {
  const t = props.f / FPS;
  const on = t >= line("10").start - 0.05 && t <= line("10").end + 0.15;
  const o = on ? prog(props.f, Math.round(line("10").start * FPS) - 2, 5) : 0;
  const label = "BẮC NINH NÓI";
  const w = label.length * 30 + 70;
  return (
    <>
      {on && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
          <g style={{ translate: `${CX}px ${SUB_BOTTOM - 150}px` }}>
            <rect x={-w / 2} y={-34} width={w} height={64} rx={32} fill={GOLD} stroke={ATLAS.ink} strokeWidth={5} />
            <path d="M -14 28 L 0 48 L 14 28 Z" fill={GOLD} stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
            <rect x={-16} y={22} width={32} height={10} fill={GOLD} />
            <text y={14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{label}</text>
          </g>
        </svg>
      )}
      <AtlasSub {...props} />
    </>
  );
};

/** A small toy factory (screen space), base centre at (0, 0). */
const Factory: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g style={{ scale: s }} stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round">
    <path d="M -46 0 L -46 -34 L -26 -48 L -26 -34 L -6 -48 L -6 -34 L 14 -48 L 14 -34 L 46 -34 L 46 0 Z" fill="#E8E2D2" />
    <rect x={22} y={-74} width={14} height={40} fill="#B9B2A2" />
    <rect x={-36} y={-22} width={14} height={12} fill={BLUE} strokeWidth={3} />
    <rect x={-12} y={-22} width={14} height={12} fill={BLUE} strokeWidth={3} />
    <rect x={20} y={-22} width={16} height={22} fill="#8A6B4A" strokeWidth={3} />
  </g>
);

/** A toy scooter with a rider, facing right; the front wheel touches x = 0 at y = 0. */
const Scooter: React.FC<{ color: string }> = ({ color }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
    <circle cx={-92} cy={-22} r={22} fill="#3A3F45" />
    <circle cx={-22} cy={-22} r={22} fill="#3A3F45" />
    <path d="M -120 -30 Q -122 -62 -90 -66 L -52 -66 L -40 -40 L -10 -40 L 2 -96 L 14 -96 L 4 -30 Z" fill={color} />
    <path d="M 2 -96 L 18 -104" strokeWidth={7} strokeLinecap="round" />
    <path d="M -84 -66 L -60 -66 L -54 -112 L -86 -112 Z" fill="#E9E3D6" />
    <circle cx={-68} cy={-138} r={26} fill="#F1C9A5" />
    <path d="M -96 -140 Q -96 -172 -66 -172 Q -38 -172 -38 -142 Z" fill={color} />
    <circle cx={-56} cy={-136} r={3} fill={ATLAS.ink} stroke="none" />
  </g>
);

/** One of the three "drawbacks" badges of line 01 (screen space, centre at 0, 0); `no` adds the red slash. */
const Badge: React.FC<{ kind: "small" | "sea" | "air"; no?: boolean }> = ({ kind, no }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
    <circle r={70} fill={ATLAS.white} />
    {kind === "small" && (
      <>
        <path d="M -44 18 L 44 18" strokeWidth={8} />
        {[-44, -22, 0, 22, 44].map((x) => <path key={x} d={`M ${x} 18 L ${x} ${x % 44 === 0 ? 0 : 6}`} strokeWidth={5} />)}
        <path d="M -16 -14 Q -10 -34 8 -30 Q 22 -26 16 -12 Q 8 -2 -8 -4 Z" fill={GOLD} />
      </>
    )}
    {kind === "sea" && [-18, 4, 26].map((y) => (
      <path key={y} d={`M -44 ${y} q 11 -14 22 0 t 22 0 t 22 0 t 22 0`} fill="none" stroke="#4778A0" strokeWidth={8} />
    ))}
    {kind === "air" && (
      <path d="M -40 8 L 40 -16 L 46 -8 L 6 6 L -4 34 L -14 36 L -12 10 L -34 18 L -40 30 L -48 30 L -44 12 Z" fill="#E9E3D6" />
    )}
    {no && <path d="M -48 -48 L 48 48" stroke={ATLAS.red} strokeWidth={12} />}
  </g>
);

/** Horizontal bars (rows zone panel). Values in billions USD; `p` grows each bar 0 → value. */
type Bar = { label: string; color: string; value: number; p: number; text?: string };
const Bars: React.FC<{ rows: Bar[]; max: number; y: number; o: number; title?: string }> = ({ rows, max, y, o, title }) => {
  if (o <= 0) return null;
  const x0 = 390;
  const len = 470;
  const h = 70;
  const gap = 34;
  const top = y - (rows.length * (h + gap) - gap) / 2;
  const panelTop = top - (title ? 96 : 40);
  const panelH = rows.length * (h + gap) - gap + (title ? 136 : 80);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={84} y={panelTop} width={852} height={panelH} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
      {title && (
        <text x={CX - 30} y={panelTop + 70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{title}</text>
      )}
      {rows.map((r, i) => {
        const yy = top + i * (h + gap);
        const w = (len * r.value * r.p) / max;
        return (
          <g key={r.label}>
            <text x={x0 - 22} y={yy + h * 0.7} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={50} fill={ATLAS.ink}>{r.label}</text>
            <rect x={x0} y={yy} width={len} height={h} rx={14} fill="#D9D2C2" />
            {w > 0 && <rect x={x0} y={yy} width={w} height={h} rx={14} fill={r.color} stroke={ATLAS.ink} strokeWidth={5} />}
            {r.text && (
              <text x={x0 + Math.max(w, 170) - 16} y={yy + h * 0.72} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={50}
                fill={ATLAS.ink}>{r.text}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // the rest of Vietnam fades to a neutral tone when the camera is close
  const dimO = interpolate(cam.zoom, [60, 100], [0, 1], CLAMP);
  // "before 7/2025" shots (01, 05–11): the 63 old provinces, old Bắc Ninh in gold
  const before = Math.max(show(f, 10, at("02") - 2), show(f, at("05") - 4, at("12", 0.6)));
  const bnOldGold = Math.max(show(f, wAt("01", 4), at("02") - 2), show(f, at("05") - 4, at("12") + 2));
  // 12: old Bắc Ninh + old Bắc Giang light up, then melt into the new province
  const mergeBn = show(f, at("12"), at("12", 0.75));
  // new Bắc Ninh in gold (02–04, 12–18, 21–22) and TP.HCM in blue (02, 13–16)
  const bnNewO = Math.max(show(f, wAt("02", 4), at("05") - 4), show(f, at("12", 0.6), at("19", 0.5)), show(f, wAt("21", 5), BACK - 6));
  const hcmO = Math.max(show(f, wAt("02", 10) - 3, at("04")), show(f, at("13", 0.7), at("17") - 4));
  const oldHcmO = show(f, at("13"), at("13", 0.75));
  // 19–21 Hà Bắc: one orange province → split on "tách" → slides back together on "về lại một nhà"
  const haBacO = show(f, at("19", 0.5), wAt("21", 5) + 6);
  const split = wAt("20", 5);
  const rejoin = wAt("21", 5);
  const apart = Math.min(prog(f, split, 14, ease), 1 - prog(f, rejoin - 10, 16, ease));
  const halvesCol = prog(f, split, 10); // orange → two colours while apart
  const seamP = prog(f, split - 4, 16, ease);
  const seamO = 1 - prog(f, rejoin, 12);
  // 22: "nhỏ nhất" flashes old Bắc Ninh's outline, "gộp lại" the new province's
  const smallFlash = flashAt(f, [wAt("22", 4)]);
  const bigFlash = flashAt(f, [wAt("22", 6)]);
  const panelDim = Math.max(show(f, at("14"), at("17") - 4), show(f, at("18"), at("19") - 2)) * 0.4;

  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} />
      {dimO > 0 && <ProvinceMap z={z} set={VN2025} tag="dim" base={DIM} lines={0.4} o={dimO} f={f} />}
      {before > 0 && <ProvinceMap z={z} set={VN2024} tag="p24" base={DIM} lines={0.7} o={before * dimO} f={f} />}
      <ProvinceMap z={z} set={VN2024.filter((p) => p.name === BN)} tag="bnold" base={GOLD} lines={1} o={bnOldGold} f={f}
        flash={[{ name: BN, v: flashAt(f, [wAt("01", 6), wAt("08", 0)]) }]} />
      <ProvinceMap z={z} set={VN2024.filter((p) => p.name === BN || p.name === BG)} tag="merge" lines={1} o={mergeBn} f={f}
        fills={[{ name: BN, color: GOLD }, { name: BG, color: BG_COL }]}
        flash={[{ name: BN, v: flashAt(f, [at("12", 0.05)]) }, { name: BG, v: flashAt(f, [wAt("12", 7)]) }]} />
      <ProvinceMap z={z} set={VN2025.filter((p) => p.name === HCM)} tag="hcm" base={BLUE} lines={0} o={hcmO} f={f}
        flash={[{ name: HCM, v: flashAt(f, [wAt("02", 10)]) }]} />
      <ProvinceMap z={z} set={VN2024.filter((p) => HCM_OLD.includes(p.name))} tag="hcmold" lines={1} o={oldHcmO} f={f}
        fills={HCM_OLD.map((name, i) => ({ name, color: OLD_HCM[i] }))} flash={HCM_OLD.map((name, i) => ({ name, v: flashAt(f, [at("13", 0.1 + i * 0.25)]) }))} />
      <ProvinceMap z={z} set={VN2025.filter((p) => p.name === BN)} tag="bn" base={GOLD} lines={0} o={bnNewO} f={f}
        flash={[{ name: BN, v: Math.max(flashAt(f, [wAt("02", 4), at("17", 0.1)]), bigFlash) }]} />
      {haBacO > 0 && (
        <g opacity={haBacO}>
          <g style={{ translate: `${(-16 * apart) / z}px ${(14 * apart) / z}px` }}>
            <ProvinceMap z={z} set={VN2024.filter((p) => p.name === BN)} tag="hb-bn" base={interpolateCol(halvesCol, HA_BAC, GOLD)} lines={0} f={f} />
          </g>
          <g style={{ translate: `${(16 * apart) / z}px ${(-14 * apart) / z}px` }}>
            <ProvinceMap z={z} set={VN2024.filter((p) => p.name === BG)} tag="hb-bg" base={interpolateCol(halvesCol, HA_BAC, BG_COL)} lines={0} f={f} />
          </g>
          <BorderLine z={z} d={SPLIT.d} p={seamP} glow={flashAt(f, [split])} o={seamO * (1 - apart * 0.6)} />
        </g>
      )}
      {smallFlash > 0 && (
        <ProvinceMap z={z} set={VN2024.filter((p) => p.name === BN)} tag="small" base={GOLD} lines={1} o={smallFlash} f={f}
          flash={[{ name: BN, v: smallFlash }]} />
      )}
    </>
  );

  const fills: Fill[] = show(f, wAt("09", 10) - 4, at("10") - 4) > 0 ? [{ name: "China", color: "#E7A99A" }] : [];

  const yp = S(P("yenPhong"));
  const nb = S(P("noiBai"));

  // 14–15: cumulative 2025 exports race; Bắc Ninh passes TP.HCM only at the end of October (illustrative curve,
  // real October and full-year values)
  const raceO = show(f, at("14"), at("16") - 2);
  const r1 = prog(f, at("14", 0.1), wAt("14", 12) - at("14", 0.1));
  const r2 = prog(f, at("15", 0.1), wAt("15", 6) - at("15", 0.1), ease);
  const bnRace = interpolate(r1, [0, 0.6, 0.93, 1], [0, 0.55, 0.985, 1], CLAMP);
  const bnVal = 76.44 + (93.27 - 76.44) * r2;
  const hcmVal = 76.34 + (92.68 - 76.34) * r2;

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} fills={fills} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />
      {panelDim > 0 && <AbsoluteFill style={{ backgroundColor: ATLAS.ink, opacity: panelDim }} />}

      {/* ── 01 smallest, no sea, no airport yet ── */}
      <DataCard value="NHỎ NHẤT NƯỚC" label="TRƯỚC KHI GỘP TỈNH" x={CX} y={330} f={f} at={wAt("01", 6)} out={at("02") - 4} size={86} />
      {f >= wAt("01", 6) && f < at("02") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("02") - 6, 5) }}>
          {([["small", wAt("01", 6), false], ["sea", wAt("01", 9), true], ["air", wAt("01", 11), true]] as const).map(([kind, t, no], i) => (
            <g key={kind} style={{ translate: `${CX + (i - 1) * 200}px 1180px`, scale: prog(f, t, 8, ease) }}><Badge kind={kind} no={no} /></g>
          ))}
        </svg>
      )}

      {/* ── 02–04 yet in 2025 it out-exports TP.HCM; what goods? phones ── */}
      <ProvinceTag cam={cam} f={f} label="BẮC NINH" anchor={P("bnTag")} from={wAt("02", 4)} o={show(f, wAt("02", 4), at("03"))} size={60} />
      <ProvinceTag cam={cam} f={f} label="TP.HCM" anchor={P("hcmTag")} from={wAt("02", 10)} o={show(f, wAt("02", 10), at("03") + 4)} size={60} />
      <DataCard value="XUẤT KHẨU 2025" label="CỤC HẢI QUAN" x={CX} y={330} f={f} at={wAt("02", 6)} out={at("05") - 4} size={80} />
      <Bars y={1150} o={show(f, wAt("02", 8), at("05") - 4)} max={95} rows={[
        { label: "BẮC NINH", color: GOLD, value: 93.27, p: prog(f, wAt("02", 8), 20, ease), text: "93,3 TỶ" },
        { label: "TP.HCM", color: BLUE, value: 92.68, p: prog(f, wAt("02", 8), 20, ease), text: "92,7 TỶ" },
      ]} />
      <Question x={560} y={640} f={f} at={at("03")} out={at("04")} s={1.2} />
      <ImgSticker src={`${IMG}/b-02-dien-thoai.png`} x={560} y={720} w={190} f={f} at={at("04")} out={at("05") - 4} />

      {/* ── 05–06 [NGƯỜI] 2008: Samsung asks to build a phone plant at Yên Phong; "papers complete → licence right away" ── */}
      <YearRibbon text="3/2008" f={f} at={at("05", 0.05)} out={wAt("05", 5) - 2} />
      <CityPin cam={cam} f={f} label="YÊN PHONG" at={P("yenPhong")} from={wAt("05", 10)} o={show(f, wAt("05", 10), at("07") - 4)} side="left" />
      {f >= wAt("05", 6) && f < at("07") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("07") - 6, 5) }}>
          <g style={{ translate: `${yp[0]}px ${yp[1] + 130}px`, scale: prog(f, wAt("05", 6), 8, ease) }}><Factory s={1.5} /></g>
        </svg>
      )}
      <DataCard value="SAMSUNG" label="NHÀ MÁY ĐIỆN THOẠI ĐẦU TIÊN" x={CX} y={330} f={f} at={wAt("05", 5)} out={at("06")} size={92} />
      <PegImg src={`${IMG}/b-01-can-bo.png`} x={290} y={1290} h={330} f={f} at={at("06")} o={1 - prog(f, at("07") - 6, 6)} />
      <MapLabel text="NGUYỄN QUANG THANH" x={400} y={960} o={show(f, at("06", 0.05), at("06", 0.75))} size={48} />
      <DataCard value="HÃNG TIN AP" label="24/3/2008" x={CX} y={330} f={f} at={wAt("06", 10)} out={at("07") - 4} size={86} />
      <Stamp text="CẤP PHÉP" x={640} y={1120} f={f} at={wAt("06", 15)} out={at("07") - 4} />

      {/* ── 07–09 why? location: Nội Bài next door, Hải Phòng port east, the China border north ── */}
      <Question x={CX} y={560} f={f} at={at("07")} out={at("08")} s={1.2} />
      {f >= at("08") && f < at("10") && (() => {
        const o = 1 - prog(f, at("10") - 6, 5);
        const legs = [
          [P("noiBai"), wAt("09", 0)],
          [P("haiPhong"), wAt("09", 5)],
          [P("huuNghi"), wAt("09", 10)],
        ] as const;
        return (
          <AbsoluteFill style={{ opacity: o }}>
            {legs.map(([ll, t], i) => <Track key={i} ps={[yp, S(ll as LL)]} p={prog(f, t, 16, ease)} color={ATLAS.white} w={7} />)}
          </AbsoluteFill>
        );
      })()}
      {/* the China tag (and its outline flash) goes under the pins so the labels stay readable */}
      <CountryTag cam={cam} f={f} name="China" label="TRUNG QUỐC" flag="china" anchor={P("china")} from={wAt("09", 12)}
        o={show(f, wAt("09", 12), at("10") - 4)} glow={[wAt("09", 12)]} />
      <CityPin cam={cam} f={f} label="NỘI BÀI" at={P("noiBai")} from={wAt("09", 0)} o={show(f, wAt("09", 0), at("10") - 4)} side="left" />
      <CityPin cam={cam} f={f} label="CẢNG HẢI PHÒNG" at={P("haiPhong")} from={wAt("09", 5)} o={show(f, wAt("09", 5), at("10") - 4)} side="left" />
      <CityPin cam={cam} f={f} label="HỮU NGHỊ" at={P("huuNghi")} from={wAt("09", 10)} o={show(f, wAt("09", 10), at("10") - 4)} side="right" />
      <DataCard value="16 · 93 · 117 KM" label="CHIM BAY TỪ YÊN PHONG" x={CX} y={330} f={f} at={wAt("09", 2)} out={at("10") - 4} size={84} />

      {/* ── 10 [VÙNG NÓI] Bắc Ninh: "small, but close to everything" ── */}
      {(() => {
        const o = show(f, at("10") - 2, at("11") - 2);
        if (o <= 0) return null;
        const [x, y] = S(P("bnFace"));
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <MapFace x={x} y={y} f={f} at={at("10") - 2} mood="happy" talk={talk(f)} s={1.05} seed={1} label="BẮC NINH" labelColor={ATLAS.white} />
          </AbsoluteFill>
        );
      })()}

      {/* ── 11 light and expensive: it flies (Samsung ~35 % of Nội Bài's cargo in 2013, C11) ── */}
      <ImgSticker src={`${IMG}/b-04-thung-hang.png`} x={nb[0] + 30} y={nb[1] + 140} w={150} f={f} at={at("11")} out={at("11", 0.45)} />
      {f >= at("11", 0.3) && f < at("12") && (() => {
        const p = prog(f, at("11", 0.3), at("12") - at("11", 0.3), ease);
        return (
          <ImgSticker src={`${OLD}/p2-long-thanh/cut/l-01-toy-plane.png`} x={nb[0] + 20 - 300 * p} y={nb[1] + 150 - 320 * p} w={210} f={f} at={at("11", 0.3)} />
        );
      })()}
      <CityPin cam={cam} f={f} label="NỘI BÀI" at={P("noiBai")} from={at("11")} o={show(f, at("11"), at("12") - 4)} side="above" />
      <DataCard value="NHẸ MÀ ĐẮT" label="HÀNG ĐI MÁY BAY" x={CX} y={330} f={f} at={at("11", 0.1)} out={at("12")} size={92} />

      {/* ── 12–13 both sides merged on 1/7/2025 ── */}
      <YearRibbon text="7/2025" f={f} at={at("12", 0.05)} out={at("13")} />
      <ProvinceTag cam={cam} f={f} label="BẮC NINH" anchor={P("bnOld")} from={at("12", 0.05)} o={show(f, at("12", 0.05), at("13") - 4)} size={56} />
      <ProvinceTag cam={cam} f={f} label="BẮC GIANG" anchor={P("bgTag")} from={wAt("12", 7)} o={show(f, wAt("12", 7), at("13") - 4)} size={56} />
      <PegImg src={`${IMG}/b-03-cong-nhan.png`} x={S(P("worker"))[0]} y={S(P("worker"))[1] + 220} h={210} f={f} at={wAt("12", 10)} o={1 - prog(f, at("13") - 6, 5)} />
      <ProvinceTag cam={cam} f={f} label="BÌNH DƯƠNG" anchor={P("bdTag")} from={wAt("13", 8)} o={show(f, wAt("13", 8), at("14") - 4)} size={56} />
      <ProvinceTag cam={cam} f={f} label="BÀ RỊA – VŨNG TÀU" anchor={P("vtTag")} from={wAt("13", 10)} o={show(f, wAt("13", 10), at("14") - 4)} size={50} />

      {/* ── 14–16 on the new borders: Bắc Ninh passes only in October; the full year: 93.3 vs 92.7 ── */}
      <Bars y={760} o={raceO} max={95} title={r2 > 0 ? "CẢ NĂM 2025" : "2025 · CỘNG DỒN"} rows={[
        { label: "BẮC NINH", color: GOLD, value: r2 > 0 ? bnVal : 76.44, p: r2 > 0 ? 1 : bnRace, text: r1 >= 1 ? (r2 >= 1 ? "93,3" : r2 > 0 ? undefined : "76,4") : undefined },
        { label: "TP.HCM", color: BLUE, value: r2 > 0 ? hcmVal : 76.34, p: r2 > 0 ? 1 : r1, text: r1 >= 1 ? (r2 >= 1 ? "92,7" : r2 > 0 ? undefined : "76,3") : undefined },
      ]} />
      <DataCard value="HẾT THÁNG 10" label="BẮC NINH VƯỢT" x={CX} y={330} f={f} at={wAt("14", 12)} out={at("15")} size={88} />
      <DataCard value="+0,6 TỶ USD" label="CẢ NĂM 2025" x={CX} y={330} f={f} at={wAt("15", 6)} out={at("16") - 2} size={92} />
      {f >= at("16") && f < at("17") && (() => {
        // [ĐÙA] two scooters reach the stop line together
        const p = prog(f, at("16"), 22, ease);
        const o = show(f, at("16") + 2, at("17") - 6);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={150} y={560} width={780} height={500} rx={30} fill={ATLAS.white} fillOpacity={0.88} stroke={ATLAS.ink} strokeWidth={6} />
            <line x1={760} y1={590} x2={760} y2={1030} stroke={ATLAS.ink} strokeWidth={14} strokeDasharray="26 18" />
            <g style={{ translate: `${interpolate(p, [0, 1], [540, 742])}px 800px`, scale: 1.15 }}><Scooter color={GOLD} /></g>
            <g style={{ translate: `${interpolate(p, [0, 1], [500, 742])}px 1010px`, scale: 1.15 }}><Scooter color={BLUE} /></g>
            <text x={300} y={760} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink} opacity={0.8}>BẮC NINH</text>
            <text x={300} y={970} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink} opacity={0.8}>TP.HCM</text>
          </svg>
        );
      })()}

      {/* ── 17–18 two sides: "the country's export centre" vs 12 of Samsung's 176 main suppliers are Vietnamese ── */}
      {f >= at("17") && f < at("18") && (["iz1", "iz2", "iz3", "iz4", "iz5"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        return (
          <svg key={k} width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("18") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y + 20}px`, scale: prog(f, at("17", 0.2) + i * 4, 8, ease) }}><Factory s={0.9} /></g>
          </svg>
        );
      })}
      <DataCard value="TRUNG TÂM" label="XUẤT KHẨU CỦA CẢ NƯỚC" x={CX} y={330} f={f} at={at("17", 0.15)} out={at("18")} size={92} />
      {(() => {
        const o = show(f, at("18"), at("19") - 4);
        if (o <= 0) return null;
        const cols = 22;
        const sp = 34;
        const x0 = CX - ((cols - 1) * sp) / 2;
        const y0 = 640;
        const lit = prog(f, wAt("18", 13), 10);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={x0 - 44} y={y0 - 50} width={(cols - 1) * sp + 88} height={7 * sp + 100} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
            {Array.from({ length: 176 }, (_, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              const k = prog(f, at("18", 0.05) + Math.floor(i / 6), 5);
              const vn = i % 15 === 7 && i < 176 - 2; // 12 Vietnamese suppliers spread through the grid
              return (
                <circle key={i} cx={x0 + col * sp} cy={y0 + row * sp} r={12 * k} fill={vn && lit > 0 ? VN : "#9AA7B4"}
                  stroke={ATLAS.ink} strokeWidth={vn && lit > 0 ? 3 + 2 * lit : 2} />
              );
            })}
          </svg>
        );
      })()}
      <DataCard value="12 / 176" label="LÀ DOANH NGHIỆP VIỆT" x={CX} y={330} f={f} at={wAt("18", 13)} out={at("19")} size={100} />

      {/* ── 19–21 [TWIST] Hà Bắc: split on 1/1/1997, together again on 1/7/2025 ── */}
      <ProvinceTag cam={cam} f={f} label="HÀ BẮC" anchor={P("bnTag")} from={wAt("20", 3)} o={show(f, wAt("20", 3), split + 2)} size={64} />
      <YearRibbon text="1/1/1997" f={f} at={at("20", 0.05)} out={at("21")} />
      <ProvinceTag cam={cam} f={f} label="BẮC NINH" anchor={P("bnOld")} from={split + 8} o={show(f, split + 8, rejoin - 6)} size={56} />
      <ProvinceTag cam={cam} f={f} label="BẮC GIANG" anchor={P("bgTag")} from={split + 12} o={show(f, split + 12, rejoin - 6)} size={56} />
      <YearRibbon text="1/7/2025" f={f} at={at("21", 0.05)} out={at("22")} />
      <ProvinceTag cam={cam} f={f} label="BẮC NINH MỚI" anchor={P("bnTag")} from={rejoin + 6} o={show(f, rejoin + 6, at("22"))} size={60} />

      {/* ── 22 "split: the smallest; together: the biggest exporter" — then back to the opening view ── */}
      <ProvinceTag cam={cam} f={f} label="NHỎ NHẤT" anchor={P("bnOld")} from={wAt("22", 4)} o={show(f, wAt("22", 4), wAt("22", 6))} size={60} />
      <DataCard value="XUẤT KHẨU SỐ 1" label="BẮC NINH MỚI · 2025" x={CX} y={330} f={f} at={wAt("22", 9)} out={BACK - 12} size={92} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

/** Linear blend of two #RRGGBB colours. */
const interpolateCol = (t: number, a: string, b: string) => {
  const h = (c: string, i: number) => parseInt(c.slice(1 + 2 * i, 3 + 2 * i), 16);
  const k = Math.min(1, Math.max(0, t));
  return `#${[0, 1, 2].map((i) => Math.round(h(a, i) + (h(b, i) - h(a, i)) * k).toString(16).padStart(2, "0")).join("")}`;
};

const CAPTIONS: Record<string, string> = {
  "01": "Trước khi gộp tỉnh, Bắc Ninh *nhỏ nhất nước*, không biển, chưa có sân bay.",
  "02": "Vậy mà năm *2025*, Bắc Ninh xuất khẩu vượt cả *TP.HCM*.",
  "04": "*Điện thoại.*",
  "05": "Năm *2008*, Samsung xin xây nhà máy điện thoại ở *Yên Phong*.",
  "06": "Ông *Nguyễn Quang Thanh*, cán bộ tỉnh, nói với hãng tin AP: đủ giấy là *cấp phép ngay*.",
  "08": "*Vị trí.*",
  "12": "Tháng 7 năm *2025*, Bắc Ninh gộp *Bắc Giang*, cũng đầy nhà máy.",
  "13": "Nhưng TP.HCM cũng gộp Bình Dương, Bà Rịa Vũng Tàu.",
  "14": "Tính trên địa giới mới, phải tới *tháng 10*, Bắc Ninh mới vượt.",
  "15": "Cả năm, Bắc Ninh hơn *93 tỷ đô*, nhỉnh hơn chút xíu.",
  "18": "Nhưng trong *176* nhà cung cấp chính của Samsung ở đây, chỉ *12* là doanh nghiệp Việt.",
  "20": "Năm *1997*, tỉnh *Hà Bắc* tách đôi thành Bắc Ninh và Bắc Giang.",
  "21": "*28 năm* sau, hai nửa về lại một nhà.",
  "22": "Tách ra là tỉnh *nhỏ nhất*, gộp lại thành nơi xuất khẩu *nhiều nhất*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [CLICK, "02", 0.55], [CLICK, "04", 0], [WH, "05", 0, -4], [THUD, "06", 0.88, 0, -20],
  [WH2, "07", 0, -4], [WH, "11", 0.3], [WH2, "12", 0, -4], [WH, "13", 0, -4], [CLICK, "14", 0.9], [PEN, "18", 0.75],
  [THUD, "20", 0.4, 0, -18], [CLICK, "21", 0.4],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("20") - 6, at("20") + 6, at("22", 1) - 4, at("22", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

export const P2BacNinhXuatKhau: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={SpeakerSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-bac-ninh-xuat-khau/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2BacNinhXuatKhauDuration = (fps: number) => episodeDuration(timing, fps);
