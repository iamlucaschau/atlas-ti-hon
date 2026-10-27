/**
 * Atlas Tí Hon · P3 Cause-and-Effect (+ P5), style I Toy Atlas:
 * "Việt Nam to hơn bạn nghĩ (do bản đồ cả đấy)" — Gate 3 approved by Lucas 2026-10-27.
 * Script + sources: kich-ban-p3-dien-tich-viet-nam-FINAL.md, cong-2_so-nguon.md (C1–C13).
 *
 * Every "on the map" size is computed, not drawn by hand (cong-2 §3.2–3.3): a country "sticker" is the Natural Earth
 * polygon moved RIGIDLY on the sphere (shift of longitude, then a rotation along the meridian, so north stays up) and
 * projected with the kit's Mercator. `flat` = 1 keeps the shape as the map draws it at home (map size), 0 = true size
 * at the new place. Rule 22: the projection distorts; nobody "shrinks Vietnam on purpose".
 * Hoàng Sa / Trường Sa (cong-2 §3.5, option A): the real Vietnam with both archipelagos never moves; the twist only
 * drags a dashed "ghost" of the mainland outline (labelled ĐẤT LIỀN VIỆT NAM).
 * Soft loop: the VO ends on line 24; the last frame is the opening frame (Europe + Vietnam, faint graticule).
 */
import { Audio } from "@remotion/media";
import { geoDistance, geoOrthographic } from "d3-geo";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p3-dien-tich-viet-nam.timing.json";
import words from "../../src/voiceover/p3-dien-tich-viet-nam.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, BigGold, beats, camAt, CountryTag, DataCard, type Fill, type GeoCam, HOANG_SA, ImgSticker, MapFace, MapLabel,
  PegImg, Question, show, Signature, Stamp, talkOpen, toScreen, Track, TRUONG_SA, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import {
  AFRICA_COUNTRIES, Compass, countryRings, geoSticker, Graticule, MapSticker, MorphMap, ScreenTag, Tissot,
} from "../../Style Library/I-toy-atlas/geo-tools";
import { greatCircle, ToyGlobe } from "../../Style Library/I-toy-atlas/globe";

const FPS = 30;
const IMG = "images/p3-dien-tich-viet-nam/cut";
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);
const W = words as Record<string, number[]>;

type LL = [number, number];

/** Every map-anchored label / face / prop (scripts/geo-check.mjs). */
export const PLACES = {
  germany: { ll: [10.4, 51.2], in: "sea" },
  vnTag: { ll: [105.0, 19.2], in: "Nghệ An", year: 2025 },
  lungCu: { ll: [105.32, 23.25], in: "Tuyên Quang", year: 2025 },
  datMui: { ll: [104.85, 8.65], in: "Cà Mau", year: 2025 },
  copenhagen: { ll: [12.57, 55.68], in: "sea" },
  naples: { ll: [14.27, 40.85], in: "sea" },
  lisbon: { ll: [-9.14, 38.72], in: "sea" },
  caribbean: { ll: [-61, 15], in: "sea" },
  greenland: { ll: [-41, 74], in: "sea" },
  africa: { ll: [20, 8], in: "sea" },
  finland: { ll: [26.5, 64], in: "sea" },
  italy: { ll: [12.5, 42.5], in: "sea" },
  uk: { ll: [-2.5, 54], in: "sea" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

const VN = "#DA251D";
const DE = "#F2B53A";
const FI = "#5B8BD9";
const AF = "#E39A4C";
const GL = "#E9F1F2";
const IT = "#4FA34A";
const UK = "#3D6FD0";

// ------------------------------------------------------------------ geometry (kit: Style Library/I-toy-atlas/geo-tools.tsx)

const RINGS = {
  germany: countryRings("Germany"),
  vietnam: countryRings("Vietnam"),
  italy: countryRings("Italy"),
  uk: countryRings("United Kingdom"),
  finland: countryRings("Finland"),
  greenland: countryRings("Greenland"),
};
const AFRICA = AFRICA_COUNTRIES;

// ------------------------------------------------------------------ camera

const VIEW = {
  eurasia: { lon: 62, lat: 46, zoom: 2.5 },
  germany: { lon: 10.4, lat: 51.2, zoom: 7 },
  vnHook: { lon: 102, lat: 16.2, zoom: 12 },
  vn: { lon: 101, lat: 16.2, zoom: 9 },
  atlantic: { lon: -11, lat: 50, zoom: 1.6 },
  morph: { lon: 12, lat: 25, zoom: 1.75 },
  vnTwist: { lon: 105.5, lat: 16.3, zoom: 4.2 },
  euTwist: { lon: 12.3, lat: 48.6, zoom: 4.2 },
};
// the twist: the camera follows the ghost from Vietnam to Europe (G0 → G1), then flies back to the opening frame
const G0 = at("23") + 40;
const G1 = at("24") - 4;
const KEYS_A: GeoCam[] = [
  { at: 0, ...VIEW.eurasia },
  // opening (Bible 2026-10-21): the camera flies into Germany from frame 1
  { at: 1, ...VIEW.germany },
  { at: at("01", 0.62), ...VIEW.vnHook },
  { at: at("05") - 2, ...VIEW.eurasia },
  { at: at("07") - 4, ...VIEW.vn },
  { at: at("11") - 4, ...VIEW.atlantic },
  { at: at("18") - 4, ...VIEW.eurasia },
  { at: at("19") - 4, ...VIEW.morph },
  { at: at("22") - 4, ...VIEW.eurasia },
  { at: at("23") - 2, ...VIEW.vnTwist },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const zTwist = camAt(KEYS_A, G0, PUSH, PUSH_CAP).zoom;
const twistP = (f: number) => interpolate(f, [G0, G1], [0, 1], { ...CLAMP, easing: ease });
// after the twist: one slow pull-back (no "plane" zoom-out) that lands exactly on the opening frame just before the loop
const backP = (f: number) => interpolate(f, [G1, END - 26], [0, 1], { ...CLAMP, easing: ease });
const camera = (f: number): GeoCam => {
  if (f < G0) return camAt(KEYS_A, f, PUSH, PUSH_CAP);
  const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
  if (f < G1) {
    const p = twistP(f);
    return { at: G0, lon: lerp(VIEW.vnTwist.lon, VIEW.euTwist.lon, p), lat: lerp(VIEW.vnTwist.lat, VIEW.euTwist.lat, p), zoom: zTwist };
  }
  const p = backP(f);
  return {
    at: G1, lon: lerp(VIEW.euTwist.lon, VIEW.eurasia.lon, p), lat: lerp(VIEW.euTwist.lat, VIEW.eurasia.lat, p),
    zoom: Math.exp(lerp(Math.log(zTwist), Math.log(VIEW.eurasia.zoom), p)),
  };
};
const CUTS = [...KEYS_A.map((k) => k.at), G0, G1];

// ------------------------------------------------------------------ the scene

const LUNGCU: LL = [105.316, 23.393];
const COPENHAGEN: LL = [12.57, 55.68];
const DE_TARGET: LL = [95.5, 16.5];
const VN_HOME = geoSticker(RINGS.vietnam, LUNGCU, LUNGCU, 0).area;

/** Toy globe scene (09–10): the 1,650 km tape, Lũng Cú → Đất Mũi, then the same tape Copenhagen → Napoli. */
const GLOBE = { x: CX, y: 760, r: 340 };
const GlobeScene: React.FC<{ f: number; o: number }> = ({ f, o }) => {
  if (o <= 0) return null;
  const turn = prog(f, at("10"), 34, ease);
  const view: LL = [106 + (12 - 106) * turn, 16 + (47 - 16) * turn];
  const proj = geoOrthographic().rotate([-view[0], -view[1]]).scale(GLOBE.r).translate([GLOBE.x, GLOBE.y]).clipAngle(90);
  const vis = (p: LL) => geoDistance(p, view) < Math.PI / 2 - 0.05;
  const xy = (p: LL) => proj(p) as LL;
  const vnLine = greatCircle(P("lungCu"), P("datMui"), 40);
  const euLine = greatCircle(P("copenhagen"), P("naples"), 40);
  const pVn = prog(f, at("09", 0.15), 40, ease);
  const pEu = prog(f, at("10", 0.45), 30, ease);
  const oVn = 1 - turn;
  const head = (ln: LL[], p: number) => ln[Math.min(ln.length - 1, Math.round(p * (ln.length - 1)))];
  const islands = [...HOANG_SA, ...TRUONG_SA].filter(vis).map(xy);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ backgroundColor: "rgba(16,30,44,0.72)" }} />
      <ToyGlobe x={GLOBE.x} y={GLOBE.y} r={GLOBE.r} view={view} f={f}
        fills={[{ name: "Vietnam", color: VN }, ...(turn > 0.5 ? [{ name: "Denmark", color: "#C8102E" }, { name: "Italy", color: IT }] : [])]}
        routes={[
          { pts: vnLine, color: ATLAS.gold, p: pVn, w: 9, o: oVn },
          { pts: euLine, color: ATLAS.gold, p: pEu, w: 9 },
        ]} />
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: oVn }}>
        {islands.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3.5} fill={VN} />)}
      </svg>
      {/* the tape measure rides the head of the line being measured */}
      {(() => {
        const [x, y] = turn < 0.5 ? xy(head(vnLine, pVn)) : xy(head(euLine, pEu));
        const k = turn < 0.5 ? 1 : pEu > 0 ? 1 : 0;
        return k > 0 && (turn < 0.2 || turn > 0.8) ? <ImgSticker src={`${IMG}/d-04-thuoc-day.png`} x={x - 95} y={y + 10} w={170} f={f} at={at("09")} /> : null;
      })()}
      {turn < 0.3 && (() => {
        const [x1, y1] = xy(P("lungCu"));
        const [x2, y2] = xy(P("datMui"));
        return (
          <>
            <MapLabel text="LŨNG CÚ" x={Math.min(840, x1 + 150)} y={y1 - 10} o={show(f, at("09"), at("10")) * (1 - turn * 3)} />
            <MapLabel text="ĐẤT MŨI" x={Math.min(840, x2 + 150)} y={y2 + 30} o={show(f, at("09", 0.5), at("10")) * (1 - turn * 3)} />
          </>
        );
      })()}
      {turn > 0.85 && (() => {
        const [x1, y1] = xy(P("copenhagen"));
        const [x2, y2] = xy(P("naples"));
        return (
          <>
            <ScreenTag x={x1 - 150} y={y1 - 50} label="ĐAN MẠCH" flag="denmark" o={show(f, at("10", 0.3), at("11") - 4)} f={f} />
            <ScreenTag x={x2 + 110} y={y2 + 40} label="Ý" flag="italy" o={show(f, at("10", 0.6), at("11") - 4)} f={f} />
          </>
        );
      })()}
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camera(f);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // ── fills (Vietnam with both archipelagos, always) ──
  const fills: Fill[] = [
    { name: "Vietnam", color: VN }, { name: "Paracel Is.", color: VN }, { name: "Spratly Is.", color: VN },
    ...(f >= 1 && f < at("05") ? [{ name: "Germany", color: DE }] : []),
    ...(f >= at("15") - 4 && f < at("18") - 4 ? [{ name: "Greenland", color: GL }, ...AFRICA.map((name) => ({ name, color: AF }))] : []),
    ...(f >= at("18") - 4 && f < at("19") - 4 ? [{ name: "Finland", color: FI }] : []),
  ];

  // ── 01–04 the Germany sticker: lifted at home, carried next to Vietnam at map size, then true size ──
  const deLift = prog(f, at("01", 0.4), 8, ease);
  const deTravel = prog(f, at("01", 0.62), 40, ease);
  const deTo: LL = [P("germany")[0] + (DE_TARGET[0] - P("germany")[0]) * deTravel, P("germany")[1] + (DE_TARGET[1] - P("germany")[1]) * deTravel];
  const deFlat = 1 - prog(f, at("03"), 22, ease);
  const de = geoSticker(RINGS.germany, P("germany"), deTo, deFlat);
  const deO = show(f, at("01", 0.4), at("05") + 4);
  const [dex, dey] = S(deTo);

  // ── 08 Italy and the UK at true size next to Vietnam, their map-size ghosts behind ──
  const IT_T: LL = [92, 21.5];
  const UK_T: LL = [92, 9.5];
  const o08 = show(f, at("08"), at("09") - 2);
  const itTrue = geoSticker(RINGS.italy, P("italy"), IT_T, 0);
  const itMap = geoSticker(RINGS.italy, P("italy"), IT_T, 1);
  const ukTrue = geoSticker(RINGS.uk, P("uk"), UK_T, 0);
  const ukMap = geoSticker(RINGS.uk, P("uk"), UK_T, 1);
  const ghostIn = prog(f, at("08", 0.45), 12, ease);

  // ── 15–17 Greenland, pulled down to the equator inside Africa, shrinks ──
  const GL_T: LL = [22, 4];
  const glP = prog(f, at("16"), 40, ease);
  const glTo: LL = [P("greenland")[0] + (GL_T[0] - P("greenland")[0]) * glP, P("greenland")[1] + (GL_T[1] - P("greenland")[1]) * glP];
  const gl = geoSticker(RINGS.greenland, P("greenland"), glTo, 0);
  const [gfx, gfy] = S(P("greenland"));

  // ── 18 Finland: map size at home, then slid down next to Vietnam at true size ──
  const FI_T: LL = [93, 17];
  const fiP = prog(f, at("18", 0.35), 36, ease);
  const fiTo: LL = [P("finland")[0] + (FI_T[0] - P("finland")[0]) * fiP, P("finland")[1] + (FI_T[1] - P("finland")[1]) * fiP];
  const fi = geoSticker(RINGS.finland, P("finland"), fiTo, 0);

  // ── 19–21 Mercator ↔ equal area ──
  const morphT = Math.min(prog(f, at("19", 0.35), 40, ease), 1 - prog(f, at("21"), 30, ease));
  const morphO = show(f, at("19") - 2, at("22") - 4);

  // ── 23 the twist: a ghost of the mainland, Lũng Cú → Copenhagen, grows on the map ──
  const tp = twistP(f);
  const ghTo: LL = [LUNGCU[0] + (COPENHAGEN[0] - LUNGCU[0]) * tp, LUNGCU[1] + (COPENHAGEN[1] - LUNGCU[1]) * tp];
  const gh = geoSticker(RINGS.vietnam, LUNGCU, ghTo, 0);
  const ghO = show(f, at("23", 0.2), END - 22);
  const ratio = gh.area / VN_HOME;

  const gratO = Math.max(0.18, show(f, at("05"), at("07") - 4) * 0.9, show(f, at("11"), at("15")) * 0.8);

  return (
    <AbsoluteFill>
      {morphO < 1 && <Atlas cam={cam} f={f} fills={fills} />}
      {morphO < 1 && <Graticule cam={cam} o={gratO * (1 - morphO)} />}
      {morphO < 1 && <VnIslands cam={cam} f={f} color={VN} o={1 - morphO} />}
      <MorphMap cam={cam} t={morphT} o={morphO} f={f}
        fills={[...AFRICA.map((name) => ({ name, color: AF })), { name: "Vietnam", color: VN }, { name: "Greenland", color: GL }]}
        dots={{ pts: [...HOANG_SA, ...TRUONG_SA], color: VN }} />

      {/* ── 01–04 hook: Germany looks 2.5× Vietnam on the map; in reality almost the same ── */}
      <CountryTag cam={cam} f={f} name="Germany" label="ĐỨC" flag="germany" anchor={[10.4, 52.6]} from={24} o={show(f, 24, at("01", 0.42))} glow={[36]} />
      {deO > 0 && <MapSticker cam={cam} d={de.d} color={DE} o={deO} lift={deLift} />}
      <ScreenTag x={dex} y={dey + 12} label="ĐỨC" flag="germany" o={show(f, at("01", 0.62) + 40, at("05"))} f={f} />
      <CountryTag cam={cam} f={f} name="Vietnam" label="VIỆT NAM" flag="vietnam" anchor={P("vnTag")} from={at("01", 0.75)} o={show(f, at("01", 0.75), at("05"))}
        glow={[at("01", 0.8)]} />
      <DataCard value="×2,5" label="TRÔNG TRÊN BẢN ĐỒ" x={CX} y={330} f={f} at={at("02") - 6} out={at("03")} size={110} />
      <Question x={CX} y={1180} f={f} at={at("02")} out={at("03")} s={1.3} />
      <DataCard value="+8%" label="THỰC TẾ · DIỆN TÍCH" x={CX} y={330} f={f} at={at("03", 0.6)} out={at("05")} size={110} />

      {/* ── 05–06 what shrinks Vietnam? the map itself ── */}
      <Question x={CX} y={1160} f={f} at={at("05", 0.2)} out={at("06")} s={1.3} />
      <Stamp text="MERCATOR" x={CX} y={640} f={f} at={at("06", 0.15)} out={at("07") - 4} />

      {/* ── 07–08 Vietnam ~331,000 km²; bigger than Italy and the UK, though the map says otherwise ── */}
      <DataCard value="~331.000 KM²" label="KHÔNG TÍNH VÙNG BIỂN" x={CX} y={330} f={f} at={at("07", 0.1)} out={at("08")} size={92} />
      {o08 > 0 && (
        <>
          <MapSticker cam={cam} d={itMap.d} color={IT} o={o08 * ghostIn} ghost />
          <MapSticker cam={cam} d={ukMap.d} color={UK} o={o08 * ghostIn} ghost />
          <MapSticker cam={cam} d={itTrue.d} color={IT} o={o08} />
          <MapSticker cam={cam} d={ukTrue.d} color={UK} o={o08} />
          {(() => {
            const [ix, iy] = S(IT_T);
            const [ux, uy] = S(UK_T);
            return (
              <>
                <ScreenTag x={ix} y={iy + 10} label="Ý" flag="italy" o={show(f, at("08", 0.05), at("09") - 2)} f={f} />
                <ScreenTag x={ux} y={uy + 10} label="ANH" flag="uk" o={show(f, at("08", 0.2), at("09") - 2)} f={f} />
              </>
            );
          })()}
        </>
      )}

      {/* ── 09–10 the 1,650 km tape on a toy globe (a flat map would give the twist away) ── */}
      <GlobeScene f={f} o={show(f, at("09") - 2, at("11") - 4)} />
      <DataCard value="1.650 KM" label="ĐƯỜNG CHIM BAY" x={CX} y={330} f={f} at={at("09", 0.2)} out={at("11") - 4} size={100} />

      {/* ── 11–14 Mercator, 1569: a straight line = one compass heading; the price: the far north swells ── */}
      <YearRibbon text="1569" f={f} at={at("11", 0.1)} out={at("14")} />
      <PegImg src={`${IMG}/d-01-mercator.png`} x={800} y={1290} h={380} f={f} at={at("11", 0.2)} o={show(f, at("11", 0.2), at("15") - 2)} />
      <MapLabel text="MERCATOR" x={800} y={1330} o={show(f, at("12"), at("15") - 2)} />
      {(() => {
        const a = S(P("lisbon"));
        const b = S(P("caribbean"));
        const p = prog(f, at("12", 0.3), Math.round(at("14") - at("12", 0.3)), ease);
        const o = show(f, at("12", 0.3), at("15") - 2);
        const hx = a[0] + (b[0] - a[0]) * p;
        const hy = a[1] + (b[1] - a[1]) * p;
        return (
          <>
            <AbsoluteFill style={{ opacity: o }}><Track ps={[a, b]} p={p} color={ATLAS.gold} w={8} /></AbsoluteFill>
            {o > 0 && (
              <Img src={staticFile("images/i-singapore/cut/i-07-ship.png")} style={{
                position: "absolute", left: hx, top: hy - 50 + 4 * Math.sin(f / 9), width: 120, translate: "-50% -50%", opacity: o,
                scale: `-1 1`, rotate: `${2 * Math.sin(f / 14)}deg`,
              }} />
            )}
            <Compass x={Math.min(880, a[0] + 150)} y={a[1] - 130} k={prog(f, at("13"), 10, Easing.out(Easing.back(1.6)))} o={show(f, at("13"), at("15") - 2)}
              heading={(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI + 90} />
          </>
        );
      })()}
      <Tissot cam={cam} f={f} rows={[at("14", 0.1), at("14", 0.25), at("14", 0.4), at("14", 0.55)]} o={show(f, at("14", 0.1), at("15") + 6)} />
      <DataCard value="CÀNG XA CÀNG TO" label="XÍCH ĐẠO → HAI CỰC" x={CX} y={330} f={f} at={at("14", 0.2)} out={at("15")} size={80} />

      {/* ── 15–17 Greenland looks as big as Africa; Africa is ~14× bigger; Greenland blames the camera ── */}
      <MapLabel text="GREENLAND" x={gfx} y={gfy - 130} o={show(f, at("15"), at("18") - 6)} />
      <MapLabel text="CHÂU PHI" x={S(P("africa"))[0]} y={S(P("africa"))[1] - 40} o={show(f, at("15", 0.4), at("18") - 6)} />
      {glP > 0 && <MapSticker cam={cam} d={gl.d} color={GL} o={show(f, at("16"), at("18") - 6)} />}
      <DataCard value="×14" label="CHÂU PHI LỚN HƠN" x={330} y={1180} f={f} at={at("16", 0.5)} out={at("18") - 4} size={110} />
      <MapFace x={gfx} y={gfy - 10} f={f} s={0.62} at={at("15", 0.2)} out={at("18") - 6} mood={f < at("17") ? "smug" : "worried"}
        talk={talkOpen(f, FPS, W["17"] ?? [], line("17").end)} seed={2} />
      <ImgSticker src={`${IMG}/d-05-may-anh.png`} x={Math.min(820, gfx + 300)} y={gfy + 170} w={210} f={f} at={at("17") - 4} out={at("18") - 6} />
      {f >= at("17") && f < at("17") + 12 && (
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          <circle cx={Math.min(820, gfx + 300)} cy={gfy + 100} r={60 + 30 * prog(f, at("17"), 6)} fill="#FFFFFF" opacity={0.85 * (1 - prog(f, at("17") + 3, 9))} />
        </svg>
      )}

      {/* ── 18 Finland: about Vietnam's size, but 5× on the map ── */}
      <CountryTag cam={cam} f={f} name="Finland" label="PHẦN LAN" flag="finland" anchor={[26, 62.4]} from={at("18")} o={show(f, at("18"), at("19") - 4)} glow={[at("18")]} />
      {fiP > 0 && <MapSticker cam={cam} d={fi.d} color={FI} o={show(f, at("18", 0.35), at("19") - 4)} />}
      <DataCard value="×5" label="TRÊN BẢN ĐỒ" x={CX} y={330} f={f} at={at("18", 0.75)} out={at("19") - 4} size={120} />
      {(() => {
        const [x, y] = S([98.5, 8]);
        return <MapLabel text="BẰNG NHAU" x={Math.min(700, x)} y={y + 40} o={show(f, at("18", 0.35) + 36, at("19") - 4)} />;
      })()}

      {/* ── 19–21 two sides: Peters (1973) ↔ the mapmakers; every flat map distorts ── */}
      <YearRibbon text="1973" f={f} at={at("19", 0.05)} out={at("20")} />
      <PegImg src={`${IMG}/d-02-peters.png`} x={290} y={1300} h={390} f={f} at={at("19", 0.1)} o={show(f, at("19", 0.1), at("20") + 2)} />
      <DataCard value="THIÊN VỊ?" label="ARNO PETERS" x={CX} y={620} f={f} at={at("19", 0.55)} out={at("20")} size={96} />
      <PegImg src={`${IMG}/d-03-nha-ban-do.png`} x={780} y={1300} h={390} f={f} at={at("20")} o={show(f, at("20"), at("22") - 4)} />
      <DataCard value="MÉO HÌNH DÁNG" label="GIỚI VẼ BẢN ĐỒ" x={CX} y={330} f={f} at={at("20", 0.3)} out={at("21")} size={88} />
      <DataCard value="PHẲNG NÀO CŨNG MÉO" x={CX} y={330} f={f} at={at("21")} out={at("22") - 4} size={70} />

      {/* ── 22 the phone map still uses Mercator: it keeps directions right ── */}
      <ImgSticker src="images/p2-bac-ninh-xuat-khau/cut/b-02-dien-thoai.png" x={CX - 60} y={1050} w={230} f={f} at={at("22", 0.1)} out={at("23") - 4} />
      <Compass x={CX + 150} y={930} k={prog(f, at("22", 0.55), 10, Easing.out(Easing.back(1.6)))} o={show(f, at("22", 0.55), at("23") - 4)} heading={20 * Math.sin(f / 30)} />

      {/* ── 23–24 the twist: the mainland's ghost slides up to Europe and swells on the map ── */}
      {ghO > 0 && <MapSticker cam={cam} d={gh.d} color={VN} o={ghO} ghost />}
      <MapLabel text="ĐẤT LIỀN VIỆT NAM" x={CX} y={520} o={show(f, at("23", 0.2), at("24"))} />
      {f >= at("23", 0.2) && f < at("24", 0.6) && (
        <AbsoluteFill style={{ opacity: show(f, at("23", 0.2), at("24", 0.55)) }}>
          <BigGold text={`×${ratio.toLocaleString("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`} f={f} at={at("23", 0.2)} x={790} y={760} size={110} />
        </AbsoluteFill>
      )}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Trên bản đồ, nước Đức trông to *gấp 2,5* Việt Nam.",
  "03": "*Gần bằng nhau.*",
  "04": "Đức chỉ rộng hơn chừng *8%*.",
  "06": "*Chính tấm bản đồ.*",
  "07": "Việt Nam rộng khoảng *331.000 km²*.",
  "09": "Từ Lũng Cú tới Đất Mũi dài *1.650 km*.",
  "11": "Tấm bản đồ ấy ra đời năm *1569*.",
  "16": "Thực ra, châu Phi lớn *gấp 14 lần*.",
  "18": "Phần Lan rộng gần bằng Việt Nam, nhưng trên bản đồ trông to *gấp 5*.",
  "19": "Năm *1973*, sử gia Đức *Arno Peters* họp báo, tố bản đồ này thiên vị phương Bắc.",
  "23": "Trớ trêu là, kéo nguyên hình Việt Nam lên châu Âu, trên bản đồ nó *to gấp đôi*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
const SHUTTER = "shutter/camera-shutter-199580.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0.6, 0], [CLICK, "03", 0.5], [THUD, "06", 0.15, 0, -18], [WH, "07", 0, -4], [WH, "10", 0], [WH2, "11", 0, -4],
  [WH, "16", 0], [SHUTTER, "17", 0, -1], [WH, "18", 0.35], [CLICK, "19", 0.55], [CLICK, "22", 0.55], [WH2, "23", 0.2, 0],
];

/** Music duck: under Greenland's line and the twist + closing line. */
const musicDuck = (f: number) => interpolate(f,
  [at("17") - 6, at("17") + 4, at("17", 1), at("17", 1) + 8, at("23") - 6, at("23") + 6, at("24", 1) - 4, at("24", 1) + 6],
  [1, 0.6, 0.6, 1, 1, 0.5, 0.5, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => (
  <Signature f={useCurrentFrame()} cuts={CUTS} end={END} spots={[2, 1, 0, 2, 3, 2, 3, 1, 3, 0, 2]} />
);

export const P3DienTichVietNam: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p3-dien-tich-viet-nam/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P3} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p3DienTichVietNamDuration = (fps: number) => episodeDuration(timing, fps);
