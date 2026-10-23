/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (style I Toy Atlas):
 * "Vì sao Bắc Ninh xuất khẩu nhiều hơn cả TP.HCM?" — Gates 1–4 approved by Lucas 2026-10-23.
 * Script + sources: kich-ban-p2-bac-ninh-xuat-khau-FINAL.md, cong-2_so-nguon.md (C1–C19).
 * Numbers are goods exports / imports by locality (Customs; the 9-month 2026 twist is the Bắc Ninh Department of
 * Industry and Trade). Human moment: Nguyễn Quang Thanh (Bắc Ninh planning & investment department) to AP, 3/2008.
 * Soft loop: the VO ends on line 21; the last frame is the opening frame (all of Vietnam, 2025 provinces).
 *
 * Every map-anchored label / pin / prop is declared in PLACES and checked against the province shapes by
 * scripts/geo-check.mjs before each render. Map: VN2025 (34 provinces) with VN2024 overlays for the 2025 mergers.
 * Factories, the plane, the race bars and the scale are ILLUSTRATIVE.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-bac-ninh-xuat-khau.timing.json";
import words from "../../src/voiceover/p2-bac-ninh-xuat-khau.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, DataCard, type GeoCam, ImgSticker, MapLabel, PegImg, Question, seamKeys, show,
  Stamp, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, flashAt, ProvinceMap, ProvinceTag, VN2024, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-bac-ninh-xuat-khau/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;
const ease = Easing.inOut(Easing.cubic);
/** Frame of word `i` of VO line `id` (words.json holds absolute start times in seconds). */
const wAt = (id: string, i: number) => Math.round((W[id]?.[i] ?? 0) * FPS);

type LL = [number, number];

/** Every map-anchored thing and the province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  bnTag: { ll: [106.42, 21.31], in: "Bắc Ninh", year: 2025 },
  hcmTag: { ll: [106.75, 10.95], in: "TP. Hồ Chí Minh", year: 2025 },
  yenPhong: { ll: [105.957, 21.205], in: "Bắc Ninh" },
  noiBai: { ll: [105.807, 21.221], in: "Hà Nội" },
  factory: { ll: [105.99, 21.19], in: "Bắc Ninh" },
  boxes: { ll: [105.83, 21.2], in: "Hà Nội" },
  bnOld: { ll: [106.1, 21.1], in: "Bắc Ninh" },
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
const HCM = "TP. Hồ Chí Minh";
const BN_OLD = ["Bắc Ninh", "Bắc Giang"];
const HCM_OLD = ["TP. Hồ Chí Minh", "Bình Dương", "Bà Rịa - Vũng Tàu"];
const VN = ATLAS.c;
const GOLD = "#F3C64A";
const BLUE = "#58A8E8";
const DIM = "#E2D4B6";
const OLD_BN = ["#F3C64A", "#F09A5B"];
const OLD_HCM = ["#58A8E8", "#6FC25E", "#7FD3CF"];

const VIEW = {
  vn: { lon: 106.4, lat: 16.2, zoom: 24 },
  vn2: { lon: 106.3, lat: 16.6, zoom: 27 },
  north: { lon: 106.25, lat: 20.75, zoom: 75 },
  yp: { lon: 105.9, lat: 21.16, zoom: 420 },
  merge: { lon: 106.45, lat: 21.22, zoom: 210 },
  south: { lon: 106.85, lat: 10.85, zoom: 150 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): the camera moves from frame 1, then flies north on "mà là Bắc Ninh"
  { at: 1, ...VIEW.vn2 },
  { at: wAt("01", 17), ...VIEW.north },
  { at: at("05") - 4, ...VIEW.yp },
  { at: at("11") - 4, ...VIEW.merge },
  { at: at("12") - 4, ...VIEW.south },
  { at: at("13") - 4, ...VIEW.vn },
  { at: at("16") - 4, ...VIEW.merge },
  { at: at("21", 0.35), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);
/** frame the camera is back on the opening view: highlights fade only then */
const BACK = at("21", 0.35) + 36;

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

/** Two horizontal bars (rows zone panel). Values in billions USD; `p` grows each bar 0 → value. */
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
            {r.text && r.p > 0.85 && (
              <text x={x0 + Math.max(w, 150) - 16} y={yy + h * 0.72} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={50}
                fill={ATLAS.ink} opacity={prog(r.p * 100, 85, 15)}>{r.text}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * The balance scale (b-05) cut into four parts so the beam can tip: beam + hooks rotate about the pivot, the pans
 * follow the beam ends up / down, the pillar stays. Source image 1228 × 1006, pivot (614, 140).
 */
const SRC_W = 1228;
const SRC_H = 1006;
const Scale: React.FC<{ x: number; y: number; w: number; tilt: number; o: number }> = ({ x, y, w, tilt, o }) => {
  if (o <= 0) return null;
  const k = w / SRC_W;
  const a = (tilt * Math.PI) / 180;
  // vertical shift of the hook points (left hook x 160, right hook x 1090) when the beam turns by `tilt`
  const dyL = (160 - 614) * Math.sin(a) * k;
  const dyR = (1090 - 614) * Math.sin(a) * k;
  const part = (clip: string, style: React.CSSProperties) => (
    <Img src={staticFile(`${IMG}/b-05-can-dia.png`)} style={{
      position: "absolute", left: 0, top: 0, width: w, height: SRC_H * k, clipPath: clip, ...style,
    }} />
  );
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - SRC_H * k * 0.5, width: w, height: SRC_H * k, opacity: o }}>
      {part("polygon(34% 18%, 69% 18%, 69% 100%, 34% 100%)", {})}
      {part("polygon(0% 18%, 34% 18%, 34% 72%, 0% 72%)", { translate: `0px ${dyL}px` })}
      {part("polygon(69% 18%, 100% 18%, 100% 72%, 69% 72%)", { translate: `0px ${dyR}px` })}
      {part("polygon(0% 0%, 100% 0%, 100% 19%, 0% 19%)", { rotate: `${tilt}deg`, transformOrigin: `${614 * k}px ${140 * k}px` })}
    </div>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // the rest of Vietnam fades to a neutral tone when the camera is close (only Bắc Ninh / TP.HCM stay strong)
  const dimO = interpolate(cam.zoom, [100, 150], [0, 1], CLAMP);
  // highlights: TP.HCM (01, 12–15) and Bắc Ninh (01–10, 13–21); both fade only once back on the opening view
  const hcmO = Math.max(show(f, wAt("01", 15) - 3, wAt("01", 17)), show(f, at("12", 0.6), at("16") - 4));
  const oldBnO = show(f, at("11"), at("11", 0.7));
  const bnO = prog(f, wAt("01", 18) - 3, 10) * (1 - prog(f, BACK, 12)) * (1 - oldBnO);
  const oldHcmO = show(f, at("12"), at("12", 0.6));
  const chartDim = Math.max(show(f, at("13"), at("16") - 4), show(f, at("17"), at("21") - 2)) * 0.45;

  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} />
      {dimO > 0 && <ProvinceMap z={z} set={VN2025} tag="dim" base={DIM} lines={0.4} o={dimO} f={f} />}
      <ProvinceMap z={z} set={VN2025.filter((p) => p.name === HCM)} tag="hcm" base={BLUE} lines={0} o={hcmO} f={f}
        flash={[{ name: HCM, v: flashAt(f, [wAt("01", 15)]) }]} />
      <ProvinceMap z={z} set={VN2025.filter((p) => p.name === BN)} tag="bn" base={GOLD} lines={0} o={bnO} f={f}
        flash={[{ name: BN, v: flashAt(f, [wAt("01", 18), at("16", 0.1)]) }]} />
      <ProvinceMap z={z} set={VN2024.filter((p) => BN_OLD.includes(p.name))} tag="bnold" lines={1} o={oldBnO} f={f}
        fills={BN_OLD.map((name, i) => ({ name, color: OLD_BN[i] }))} flash={BN_OLD.map((name, i) => ({ name, v: flashAt(f, [at("11", 0.05 + i * 0.3)]) }))} />
      <ProvinceMap z={z} set={VN2024.filter((p) => HCM_OLD.includes(p.name))} tag="hcmold" lines={1} o={oldHcmO} f={f}
        fills={HCM_OLD.map((name, i) => ({ name, color: OLD_HCM[i] }))} flash={HCM_OLD.map((name, i) => ({ name, v: flashAt(f, [at("12", 0.1 + i * 0.22)]) }))} />
    </>
  );

  const yp = S(P("yenPhong"));
  const nb = S(P("noiBai"));
  const fac = S(P("factory"));

  // 01–02 / 13–14: export bars (C1; C3 shown without numbers; C2 the October 2025 crossing)
  const bars25 = show(f, at("02"), at("03", 0.2));
  const p25 = prog(f, at("02", 0.05), 20, ease);
  const bars24 = show(f, at("13", 0.1), at("14") - 2);
  const p24 = prog(f, at("13", 0.15), 18, ease);
  const race = show(f, at("14"), at("15") - 2);
  const rp = prog(f, at("14", 0.05), at("14", 0.85) - at("14", 0.05));
  // Bắc Ninh starts behind and passes TP.HCM only at the very end of the race (illustrative curve, real end values)
  const bnRace = interpolate(rp, [0, 0.6, 0.93, 1], [0, 0.55, 0.985, 1], CLAMP);

  // 18–20: the scale tips towards imports
  const scaleO = show(f, at("18", 0.05), at("20", 0.6));
  const tilt = interpolate(f, [wAt("18", 15) - 4, wAt("18", 15) + 12], [0, -6], { ...CLAMP, easing: ease });

  // 21: the phone shrinks into Bắc Ninh while the camera pulls back
  const phoneEnd = prog(f, at("21", 0.35), 30, ease);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />
      {chartDim > 0 && <AbsoluteFill style={{ backgroundColor: ATLAS.ink, opacity: chartDim }} />}

      {/* ── 01–04 the paradox: not TP.HCM but Bắc Ninh; 93 billion; what goods? phones ── */}
      <ProvinceTag cam={cam} f={f} label="TP.HCM" anchor={P("hcmTag")} from={wAt("01", 15)} o={show(f, wAt("01", 15), wAt("01", 17) + 6)} size={64} />
      <ProvinceTag cam={cam} f={f} label="BẮC NINH" anchor={P("bnTag")} from={wAt("01", 18)} o={show(f, wAt("01", 18), at("02"))} size={64} />
      <DataCard value="XUẤT KHẨU 2025" label="CỤC HẢI QUAN" x={CX} y={330} f={f} at={at("02")} out={at("03", 0.2)} size={80} />
      <Bars y={1130} o={bars25} max={95} rows={[
        { label: "BẮC NINH", color: GOLD, value: 93.27, p: p25, text: "93,3 TỶ" },
        { label: "TP.HCM", color: BLUE, value: 92.68, p: p25, text: "92,7 TỶ" },
      ]} />
      <Question x={CX + 150} y={760} f={f} at={at("03")} out={at("04")} s={1.3} />
      <ImgSticker src={`${IMG}/b-02-dien-thoai.png`} x={CX} y={900} w={250} f={f} at={at("04")} out={at("05") - 4} />

      {/* ── 05–06 [NGƯỜI] 3/2008: "only a few papers missing — then the licence right away"; the first plant, Yên Phong ── */}
      <YearRibbon text="3/2008" f={f} at={at("05", 0.05)} out={at("06")} />
      <PegImg src={`${IMG}/b-01-can-bo.png`} x={300} y={1290} h={340} f={f} at={at("05", 0.1)} o={1 - prog(f, at("06", 0.1), 6)} />
      <MapLabel text="NGUYỄN QUANG THANH" x={390} y={905} o={show(f, at("05", 0.18), at("05", 0.78))} size={48} />
      <Stamp text="CẤP PHÉP" x={CX} y={760} f={f} at={wAt("05", 25)} out={at("06") - 3} />
      <CityPin cam={cam} f={f} label="YÊN PHONG" at={P("yenPhong")} from={at("06")} o={show(f, at("06"), at("11") - 4)} side="right" />
      {f >= at("06", 0.1) && f < at("11") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("11") - 6, 5) }}>
          <g style={{ translate: `${fac[0]}px ${fac[1] + 190}px`, scale: prog(f, at("06", 0.1), 8, ease) }}><Factory s={1.6} /></g>
        </svg>
      )}
      <DataCard value="670 TRIỆU USD" label="DỰ ÁN ĐẦU TIÊN" x={CX} y={330} f={f} at={at("06", 0.2)} out={at("07")} size={90} />

      {/* ── 07–10 why Bắc Ninh? the airport: < 20 km as the crow flies; Samsung > 1/3 of Nội Bài's cargo (2013) ── */}
      <Question x={CX} y={560} f={f} at={at("07")} out={at("08")} s={1.2} />
      <CityPin cam={cam} f={f} label="NỘI BÀI" at={P("noiBai")} from={at("08")} o={show(f, at("08"), at("11") - 4)} side="left" />
      {f >= at("09") && f < at("11") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("11") - 6, 5) }}>
          <Track ps={[yp, nb]} p={prog(f, at("09", 0.05), 24, ease)} color={ATLAS.white} w={9} />
        </AbsoluteFill>
      )}
      <DataCard value="< 20 KM" label="ĐƯỜNG CHIM BAY" x={CX} y={330} f={f} at={at("09", 0.3)} out={at("10")} size={96} />
      <ImgSticker src={`${IMG}/b-04-thung-hang.png`} x={S(P("boxes"))[0]} y={S(P("boxes"))[1] + 210} w={150} f={f} at={at("10")} out={at("10", 0.6)} />
      {f >= at("10", 0.35) && f < at("11") && (() => {
        const p = prog(f, at("10", 0.35), at("11") - at("10", 0.35), ease);
        return (
          <ImgSticker src={`${OLD}/p2-long-thanh/cut/l-01-toy-plane.png`} x={nb[0] - 80 - 380 * p} y={nb[1] + 170 - 260 * p} w={220} f={f} at={at("10", 0.35)} />
        );
      })()}
      <DataCard value="> 1/3" label="HÀNG QUA NỘI BÀI · 2013" x={CX} y={330} f={f} at={at("10", 0.15)} out={at("11")} size={100} />

      {/* ── 11–12 both sides merged on 1/7/2025: Bắc Ninh + Bắc Giang; TP.HCM + Bình Dương + Bà Rịa – Vũng Tàu ── */}
      <YearRibbon text="7/2025" f={f} at={at("11", 0.05)} out={at("12")} />
      <ProvinceTag cam={cam} f={f} label="BẮC GIANG" anchor={P("bgTag")} from={at("11", 0.3)} o={show(f, at("11", 0.3), at("12") - 4)} size={56} />
      <ProvinceTag cam={cam} f={f} label="BẮC NINH" anchor={P("bnOld")} from={at("11", 0.05)} o={show(f, at("11", 0.05), at("12") - 4)} size={56} />
      <PegImg src={`${IMG}/b-03-cong-nhan.png`} x={S(P("worker"))[0]} y={S(P("worker"))[1] + 230} h={220} f={f} at={at("11", 0.45)} o={1 - prog(f, at("12") - 6, 5)} />
      <ProvinceTag cam={cam} f={f} label="BÌNH DƯƠNG" anchor={P("bdTag")} from={at("12", 0.3)} o={show(f, at("12", 0.3), at("13") - 4)} size={56} />
      <ProvinceTag cam={cam} f={f} label="BÀ RỊA – VŨNG TÀU" anchor={P("vtTag")} from={at("12", 0.55)} o={show(f, at("12", 0.55), at("13") - 4)} size={50} />

      {/* ── 13–15 on the new borders TP.HCM still led (2024, no number shown); October 2025: Bắc Ninh passes by ~0.1 bn ── */}
      <Bars y={760} o={bars24} max={95} title="2024 · ĐỊA GIỚI MỚI" rows={[
        { label: "BẮC NINH", color: GOLD, value: 70.06, p: p24 },
        { label: "TP.HCM", color: BLUE, value: 88.96, p: p24 },
      ]} />
      <Bars y={760} o={race} max={80} title="2025 · CỘNG DỒN" rows={[
        { label: "BẮC NINH", color: GOLD, value: 76.44, p: bnRace, text: rp >= 1 ? "76,44" : undefined },
        { label: "TP.HCM", color: BLUE, value: 76.34, p: rp, text: rp >= 1 ? "76,34" : undefined },
      ]} />
      <DataCard value="+0,1 TỶ USD" label="HẾT THÁNG 10" x={CX} y={330} f={f} at={at("14", 0.85)} out={at("15") - 2} size={90} />
      {f >= at("15") && f < at("16") && (() => {
        // [ĐÙA] two scooters reach the stop line together
        const p = prog(f, at("15"), 22, ease);
        const o = show(f, at("15") + 4, at("16") - 6);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <rect x={150} y={560} width={780} height={500} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
              <line x1={760} y1={590} x2={760} y2={1030} stroke={ATLAS.ink} strokeWidth={14} strokeDasharray="26 18" />
            </svg>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <g style={{ translate: `${interpolate(p, [0, 1], [430, 742])}px 800px`, scale: 1.15 }}><Scooter color={GOLD} /></g>
              <g style={{ translate: `${interpolate(p, [0, 1], [380, 742])}px 1010px`, scale: 1.15 }}><Scooter color={BLUE} /></g>
              <text x={300} y={760} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink} opacity={0.8}>BẮC NINH</text>
              <text x={300} y={970} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink} opacity={0.8}>TP.HCM</text>
            </svg>
          </AbsoluteFill>
        );
      })()}

      {/* ── 16–17 two sides: "the country's export centre" vs 12 of Samsung's 176 main suppliers are Vietnamese ── */}
      {f >= at("16") && f < at("17") && (["iz1", "iz2", "iz3", "iz4", "iz5"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        return (
          <svg key={k} width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("17") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y + 20}px`, scale: prog(f, at("16", 0.15) + i * 4, 8, ease) }}><Factory s={0.9} /></g>
          </svg>
        );
      })}
      <DataCard value="TRUNG TÂM" label="XUẤT KHẨU LỚN CỦA CẢ NƯỚC" x={CX} y={330} f={f} at={at("16", 0.15)} out={at("17")} size={92} />
      {(() => {
        const o = show(f, at("17"), at("18") - 4);
        if (o <= 0) return null;
        const cols = 22;
        const sp = 34;
        const x0 = CX - ((cols - 1) * sp) / 2;
        const y0 = 640;
        const lit = prog(f, wAt("17", W["17"]?.length ? W["17"].length - 5 : 0), 10);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={x0 - 44} y={y0 - 50} width={(cols - 1) * sp + 88} height={7 * sp + 100} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
            {Array.from({ length: 176 }, (_, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              const k = prog(f, at("17", 0.05) + Math.floor(i / 6), 5);
              const vn = i % 15 === 7 && i < 176 - 2; // 12 Vietnamese suppliers spread through the grid
              return (
                <circle key={i} cx={x0 + col * sp} cy={y0 + row * sp} r={12 * k} fill={vn && lit > 0 ? VN : "#9AA7B4"}
                  stroke={ATLAS.ink} strokeWidth={vn && lit > 0 ? 3 + 2 * lit : 2} />
              );
            })}
          </svg>
        );
      })()}
      <DataCard value="12 / 176" label="LÀ DOANH NGHIỆP VIỆT" x={CX} y={330} f={f} at={at("17", 0.55)} out={at("18")} size={100} />

      {/* ── 18–20 [TWIST] 9 months 2026: imports > exports; phones 56.9 in, 55.5 out; the plants are expanding ── */}
      <YearRibbon text="9 THÁNG 2026" f={f} at={at("18", 0.1)} out={at("18", 0.5)} />
      <Scale x={CX} y={900} w={620} tilt={tilt} o={scaleO} />
      {scaleO > 0 && (() => {
        const k = 620 / SRC_W;
        const dy = 476 * Math.sin((-tilt * Math.PI) / 180) * k;
        const labelO = show(f, wAt("18", 10), at("20", 0.6));
        const valO = show(f, at("19", 0.35), at("20", 0.6));
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: scaleO }}>
            <text x={CX - 220} y={1110 + dy} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={ATLAS.white}
              stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" opacity={labelO}>NHẬP</text>
            <text x={CX + 220} y={1110 - dy} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={ATLAS.white}
              stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" opacity={labelO}>XUẤT</text>
            <text x={CX - 220} y={1180 + dy} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={ATLAS.gold}
              stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" opacity={valO}>56,9 TỶ</text>
            <text x={CX + 220} y={1180 - dy} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={58} fill={ATLAS.gold}
              stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" opacity={valO}>55,5 TỶ</text>
          </svg>
        );
      })()}
      <DataCard value="NHẬP > XUẤT" label="SỞ CÔNG THƯƠNG BẮC NINH" x={CX} y={330} f={f} at={at("18", 0.55)} out={at("19")} size={92} />
      <DataCard value="ĐIỆN THOẠI" label="& LINH KIỆN · TỶ USD" x={CX} y={330} f={f} at={at("19")} out={at("20")} size={92} />
      <DataCard value="MỞ RỘNG" label="NHẬP MÁY MÓC, LINH KIỆN" x={CX} y={330} f={f} at={at("20", 0.1)} out={at("21")} size={96} />
      {f >= at("20", 0.62) && f < at("21") + 4 && (() => {
        const p = prog(f, at("20", 0.62), 22, ease);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("21"), 5) }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <g style={{ translate: `${CX + 170}px 1080px`, scale: prog(f, at("20", 0.62), 8, ease) }}><Factory s={2.2} /></g>
            </svg>
            <ImgSticker src={`${IMG}/b-04-thung-hang.png`} x={interpolate(p, [0, 1], [180, CX + 30])} y={1020} w={170} f={f} at={at("20", 0.62)} />
          </AbsoluteFill>
        );
      })()}

      {/* ── 21 the closing line: the next race is to keep more of each phone; the phone settles into Bắc Ninh ── */}
      {f >= at("21") && f < BACK && (() => {
        const bn = S(P("bnTag"));
        const x = interpolate(phoneEnd, [0, 1], [CX, bn[0]]);
        const y = interpolate(phoneEnd, [0, 1], [880, bn[1]]);
        const w = interpolate(phoneEnd, [0, 1], [260, 40]);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, BACK - 10, 10) }}>
            <ImgSticker src={`${IMG}/b-02-dien-thoai.png`} x={x} y={y} w={w} f={f} at={at("21")} />
          </AbsoluteFill>
        );
      })()}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Năm *2025*, nơi xuất khẩu nhiều nhất Việt Nam không phải TP.HCM, mà là *Bắc Ninh*.",
  "02": "Hơn *93 tỷ đô*.",
  "04": "*Điện thoại.*",
  "05": "Năm *2008*, ông *Nguyễn Quang Thanh*, Sở Kế hoạch và Đầu tư Bắc Ninh, nói: Samsung chỉ còn thiếu vài giấy tờ, đủ giấy là cấp phép ngay.",
  "06": "Dự án đầu tiên vào *Yên Phong*, *670 triệu đô*.",
  "08": "*Sân bay.*",
  "09": "Từ Yên Phong tới *Nội Bài*, đường chim bay chưa tới *20 km*.",
  "10": "Có lúc, riêng Samsung chiếm hơn *1/3* hàng hoá qua sân bay này.",
  "11": "Năm *2025*, Bắc Ninh nhập thêm *Bắc Giang*, cũng đầy nhà máy.",
  "14": "Phải tới *tháng 10*, Bắc Ninh mới vượt, hơn chừng *100 triệu đô*.",
  "17": "Nhưng trong *176* nhà cung cấp chính của Samsung ở đây, chỉ *12* là doanh nghiệp Việt.",
  "18": "Oái oăm ở chỗ: *9 tháng* năm nay, Bắc Ninh *nhập* về còn nhiều hơn *xuất*.",
  "19": "Riêng điện thoại và linh kiện: nhập gần *57 tỷ*, xuất hơn *55*.",
  "21": "Đứng đầu rồi, cuộc đua tiếp theo là *giữ lại* nhiều hơn trong mỗi chiếc *điện thoại*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0.82, -2], [CLICK, "02", 0.1], [CLICK, "04", 0], [WH, "05", 0, -4], [THUD, "05", 0.86, 0, -20],
  [WH2, "10", 0.35], [WH, "11", 0, -4], [WH2, "12", 0, -4], [CLICK, "14", 0.85], [WH, "16", 0, -4], [PEN, "17", 0.6],
  [THUD, "18", 0.7, 0, -18], [CLICK, "19", 0.35],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("18") - 6, at("18") + 6, at("21", 1) - 4, at("21", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

export const P2BacNinhXuatKhau: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-bac-ninh-xuat-khau/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2BacNinhXuatKhauDuration = (fps: number) => episodeDuration(timing, fps);
