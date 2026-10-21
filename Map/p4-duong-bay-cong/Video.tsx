/**
 * Atlas Tí Hon · P4 Tuyến đường & hành trình · Journey Route (+ Region Reveal) (style I Toy Atlas):
 * "Bay sang Mỹ: vì sao đường ngắn nhất lại vòng lên gần Alaska?"
 * Script + sources: kich-ban-p4-duong-bay-cong-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 21; the last frame is the opening
 * frame (Pacific map, the two airports, both routes hidden except the red straight line's start).
 *
 * Map: a Mercator rotated to 160°E (globe.tsx `PacificAtlas`) so Vietnam and California sit on one Pacific;
 * the toy globe is an orthographic view (`ToyGlobe`); the Greenland/Africa twist uses the kit's world Mercator.
 * Route lengths are Luis's calculations (great circle 12.598 km, rhumb line 13.444 km), matching SRC-006/007.
 * The "real flight" streak on the globe is ILLUSTRATIVE (only "via Japan" is sourced, C7).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p4-duong-bay-cong.timing.json";
import words from "../../src/voiceover/p4-duong-bay-cong.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC_ALT, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, pop, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, baseXY, beats, BigGold, camAt, countryPath, FLIGHT, DataCard, Flag, type FlagKind, type GeoCam, HOANG_SA, ImgSticker, MapLabel,
  PegImg, Question, routeHead, seamKeys, show, Ship, Sticker, TRUONG_SA, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { greatCircle, PacificAtlas, pacXY, rhumbLine, ToyGlobe } from "../../Style Library/I-toy-atlas/globe";

const FPS = 30;
const IMG = "images/p4-duong-bay-cong/cut";
const PLANE = "images/p2-long-thanh/cut/l-01-toy-plane.png";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

type LL = [number, number];
const ROT = 160;
const SGN: LL = [106.65, 10.82];
const SFO: LL = [-122.38, 37.62];
const ALEUT: LL = [-176.6, 51.9];
const GC = greatCircle(SGN, SFO, 64);
const RL = rhumbLine(SGN, [SFO[0] + 360, SFO[1]], 64);
const RED = "#D9534F";
const BLUE = "#3D8FD0";

// ── Pacific camera (rotated Mercator; lon/lat geographic, kept continuous 100…200) ──
const PAC = { lon: 172, lat: 31, zoom: 1.75 };
const VNV = { lon: 107.2, lat: 13.2, zoom: 16 };
const KEYS0: GeoCam[] = [
  { at: 0, ...PAC },
  // hook (Bible 2026-10-21): fly in on Sài Gòn as the straight line starts, back out to the whole Pacific
  { at: 1, lon: 125, lat: 21, zoom: 3.4 },
  { at: at("01", 0.55), ...PAC },
  { at: at("05") - 4, ...VNV },
  { at: at("06") - 4, ...PAC },
];
const PUSH = 0.03;
const PUSH_CAP = 0.06;
const KEYS = seamKeys([...KEYS0, { at: at("21") - 4, ...PAC }], END, PUSH, PUSH_CAP);

/**
 * Camera for this episode: the kit's camAt "lifts" long flights (zooms far out mid-flight); on a world-wide
 * rotated map that shows empty ocean and the map's edges, so flights here lift only a little.
 */
const camPac = (keys: GeoCam[], f: number): GeoCam => {
  const grow = (from: number, to: number) => 1 + Math.min(PUSH_CAP, (PUSH * Math.max(0, to - from)) / 90);
  let cam = keys[0];
  let settled = keys[0].at;
  for (const k of keys.slice(1)) {
    if (f < k.at) break;
    const from = { ...cam, zoom: cam.zoom * grow(settled, k.at) };
    const dist = Math.hypot(k.lon - from.lon, k.lat - from.lat);
    const dur = Math.round(FLIGHT + Math.min(18, dist * 0.6));
    const p = interpolate(f, [k.at, k.at + dur], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.cubic) });
    if (p < 1) {
      const lift = 1 + Math.min(0.25, dist / 200) * Math.sin(Math.PI * p);
      return {
        at: k.at, lon: from.lon + (k.lon - from.lon) * p, lat: from.lat + (k.lat - from.lat) * p,
        zoom: Math.exp(Math.log(from.zoom) + (Math.log(k.zoom) - Math.log(from.zoom)) * p) / lift,
      };
    }
    cam = k;
    settled = k.at + dur;
  }
  return { ...cam, zoom: cam.zoom * grow(settled, f) };
};
// world camera for the Greenland twist (kit Mercator, not rotated)
const WORLD: GeoCam = { at: 0, lon: -12, lat: 44, zoom: 1.6 };

const SHAPE_SCALE = Math.cos((72 * Math.PI) / 180); // Greenland at the equator: linear scale ≈ cos(72°) (illustrative true-size)

/** Polyline through screen points as an SVG path. */
const dOf = (ps: [number, number][]) => ps.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

/** A route drawn on with p, dark edge. */
const RouteLine: React.FC<{ ps: [number, number][]; p: number; color: string; dash?: string; w?: number; o?: number; glow?: number }> = ({
  ps, p, color, dash, w = 10, o = 1, glow = 0,
}) => {
  if (p <= 0 || o <= 0) return null;
  const d = dOf(ps);
  const draw = { strokeDasharray: dash ? undefined : 1, strokeDashoffset: dash ? undefined : 1 - p };
  const cut = dash ? Math.max(2, Math.round(ps.length * p)) : ps.length;
  const dd = dash ? dOf(ps.slice(0, cut)) : d;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {glow > 0 && <path d={dd} fill="none" stroke={ATLAS.gold} strokeOpacity={glow} strokeWidth={w * 3} strokeLinecap="round" />}
      <path d={dd} fill="none" stroke={ATLAS.ink} strokeWidth={w + 7} strokeLinecap="round" strokeLinejoin="round" pathLength={dash ? undefined : 1} style={draw}
        strokeDasharray={dash} />
      <path d={dd} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" pathLength={dash ? undefined : 1} style={draw}
        strokeDasharray={dash} />
    </svg>
  );
};

/** Country name + flag at a screen point (Pacific frame). */
const Tag: React.FC<{ x: number; y: number; label: string; flag: FlagKind; f: number; from: number; o: number }> = ({ x, y, label, flag, f, from, o }) => {
  if (o <= 0 || f < from) return null;
  const SIZE = 52;
  const tw = label.length * SIZE * 0.6;
  const w = 72 + tw;
  const left = Math.min(940 - w, Math.max(60, x - w / 2));
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${left + w / 2}px ${y}px`, scale: pop(f, from) }}>
        <g style={{ translate: `${-w / 2}px ${-36 - 14}px` }}><Flag kind={flag} w={58} f={f} /></g>
        <text x={-w / 2 + 72 + tw / 2} y={SIZE * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={SIZE}
          fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke" letterSpacing={1}>{label}</text>
      </g>
    </svg>
  );
};

/** Pin dot with a name (screen space). */
const Pin: React.FC<{ x: number; y: number; label: string; o: number; side?: "left" | "right" | "above"; color?: string }> = ({ x, y, label, o, side = "right", color = ATLAS.white }) => {
  if (o <= 0) return null;
  const SIZE = 48;
  const w = label.length * SIZE * 0.58;
  const tx = side === "above" ? x : side === "right" ? x + 24 + w / 2 : x - 24 - w / 2;
  const ty = side === "above" ? y - 30 : y + SIZE * 0.36;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <circle cx={x} cy={y} r={12} fill={color} stroke={ATLAS.ink} strokeWidth={5} />
      <text x={tx} y={ty} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={SIZE} fill={ATLAS.white}
        stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke">{label}</text>
    </svg>
  );
};

/** Compass rose (screen space), needle at a fixed bearing with a little wobble. */
const Compass: React.FC<{ bearing: number; f: number }> = ({ bearing, f }) => (
  <g stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round">
    <circle r={58} fill="#F3E7C9" />
    <circle r={46} fill="none" strokeWidth={2} />
    {[0, 90, 180, 270].map((r) => <path key={r} d="M 0 -52 L 6 -40 L -6 -40 Z" fill={ATLAS.ink} style={{ rotate: `${r}deg` }} />)}
    <g style={{ rotate: `${bearing + 1.5 * Math.sin(f / 4)}deg` }}>
      <path d="M 0 -40 L 9 0 L 0 40 L -9 0 Z" fill="#E9E2D0" />
      <path d="M 0 -40 L 9 0 L -9 0 Z" fill={RED} />
    </g>
    <circle r={6} fill={ATLAS.gold} />
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camPac(KEYS, f);
  const P = (ll: LL) => pacXY(cam, ROT, ...ll);
  const gcS = GC.map((ll) => P(ll));
  const rlS = RL.map((ll) => P(ll));
  const sgn = P(SGN);
  const sfo = P(SFO);
  const aleut = P(ALEUT);

  // layer visibility: Pacific map ↔ globe (17–18) ↔ world map (19–20)
  const toGlobe = prog(f, at("17"), 18);
  const fromGlobe = prog(f, at("19") - 4, 8);
  const worldO = Math.min(prog(f, at("19") - 4, 8), 1 - prog(f, at("21") - 4, 8));
  const pacO = Math.max(1 - toGlobe, prog(f, at("21") - 4, 8));
  const globeO = Math.min(toGlobe, 1 - fromGlobe);
  const rollX = 1 - 0.65 * toGlobe * (1 - fromGlobe); // "roll" the flat map up as the globe appears

  // routes on the Pacific map
  const redP = Math.max(prog(f, 3, 50), prog(f, at("21", 0.3), 30)) * (1 - prog(f, END - 18, 10)) || (f < 3 ? 0.02 : 0);
  const redO = Math.min(1, 1 - 0.55 * show(f, at("05"), at("12") - 2) * (f > at("06") ? 1 : 0));
  const blueP = f < at("21") ? prog(f, at("03", 0.1), 22) : prog(f, at("21", 0.3), 30) * (1 - prog(f, END - 18, 10));
  const blueGlow = Math.max(show(f, at("04"), at("05")) * 0.6, show(f, at("13", 0.2), at("14", 0.6)) * 0.5);
  const red12 = show(f, at("12"), at("14", 0.6)) * 0.6;

  // plane: on SGN in the hook and loop frame; 05 take-off; 06 along the curve to SFO
  const flyP = prog(f, at("06", 0.05), at("06", 0.95) - at("06", 0.05));
  const planeAtCurve = f >= at("06") && f < at("07") + 4;
  const planeXY = planeAtCurve ? routeHead(gcS, flyP) : [sgn[0], sgn[1]];
  const planeO = Math.max(1 - prog(f, at("07"), 6), prog(f, at("21", 0.7), 10)) * pacO;

  // fills (story countries flash when named)
  const vnFlash = show(f, at("05", 0.5), at("06"));
  const usFlash = show(f, at("06", 0.5), at("07"));
  const jpFlash = show(f, at("13", 0.25), at("14"));
  const fills = [
    { name: "Vietnam", color: ATLAS.c },
    { name: "United States of America", color: usFlash > 0 ? "#6E9BE0" : "#C9B184" },
    { name: "Japan", color: jpFlash > 0 ? "#F0E3C0" : "#C9B184" },
  ];
  void vnFlash;

  // world (Greenland twist)
  const wcam = camAt([WORLD], f, 0.03, 0.05);
  const gl = baseXY(-41, 72);
  const af = baseXY(20, 4);
  const moveG = prog(f, at("20", 0.05), 24);
  const shrink = interpolate(moveG, [0, 1], [1, SHAPE_SCALE], CLAMP);

  return (
    <AbsoluteFill>
      {/* Pacific map (rolls up into the globe) */}
      <AbsoluteFill style={{ scale: `${rollX} 1`, opacity: pacO }}>
        <PacificAtlas cam={cam} rot={ROT} f={f} fills={fills} />
        {/* Hoàng Sa, Trường Sa (channel rule: whenever Vietnam's coast is in frame) */}
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {[...HOANG_SA, ...TRUONG_SA].map(([lo, la], i) => {
            const [x, y] = P([lo, la]);
            return <circle key={i} cx={x} cy={y} r={cam.zoom > 8 ? 5 : 3} fill={ATLAS.c} />;
          })}
        </svg>
        {cam.zoom > 8 && (
          <>
            <MapLabel text="Hoàng Sa" x={P([112, 16.6])[0]} y={P([112, 16.6])[1] - 26} o={show(f, at("05", 0.3), at("06") - 4)} size={42} />
            <MapLabel text="Trường Sa" x={P([114, 10])[0] + 40} y={P([114, 10])[1] + 60} o={show(f, at("05", 0.3), at("06") - 4)} size={42} />
          </>
        )}
        <RouteLine ps={rlS} p={redP} color={RED} dash="22 14" o={redO * interpolate(cam.zoom, [3, 8], [1, 0.25], CLAMP)} glow={red12} />
        <RouteLine ps={gcS} p={blueP} color={BLUE} glow={blueGlow} o={interpolate(cam.zoom, [3, 8], [1, 0.25], CLAMP)} />
        <Pin x={sgn[0]} y={sgn[1]} label="TÂN SƠN NHẤT" o={Math.max(f < at("01", 0.3) ? 1 : 1 - prog(f, at("01", 0.3), 5), show(f, at("05", 0.2), at("07")), prog(f, at("21", 0.7), 10))} side="right" color={ATLAS.gold} />
        <Pin x={sfo[0]} y={sfo[1]} label="SAN FRANCISCO" o={Math.max(1 - prog(f, 1, 5), show(f, at("06", 0.8), at("07")), prog(f, at("21", 0.7), 10))} side="left" color={ATLAS.gold} />
        <MapLabel text="ALASKA" x={aleut[0]} y={aleut[1] - 60} o={show(f, at("04", 0.2), at("05"))} size={56} />
        <MapLabel text="QUẦN ĐẢO ALEUT" x={aleut[0]} y={aleut[1] - 60} o={show(f, at("13", 0.45), at("14") - 2)} size={48} />
        {planeO > 0 && (
          <Img src={staticFile(PLANE)} style={{
            position: "absolute", left: planeXY[0] + (cam.zoom > 8 ? 120 : 30), top: planeXY[1] - (cam.zoom > 8 ? 150 : 60), width: cam.zoom > 8 ? 170 : 140, translate: "-50% -50%", opacity: planeO,
            rotate: `${planeAtCurve ? -18 + 36 * flyP : -10}deg`, scale: f >= at("05", 0.3) && f < at("06") ? 1 + 0.15 * prog(f, at("05", 0.3), 20) : 1,
          }} />
        )}
        <Tag x={sgn[0] + 40} y={sgn[1] + 150} label="VIỆT NAM" flag="vietnam" f={f} from={at("05", 0.5)} o={show(f, at("05", 0.5), at("06") - 4)} />
        <Tag x={sfo[0] - 80} y={sfo[1] + 110} label="MỸ" flag="usa" f={f} from={at("06", 0.5)} o={show(f, at("06", 0.5), at("07"))} />
        <Tag x={P([138, 37])[0] + 40} y={P([138, 37])[1] + 190} label="NHẬT BẢN" flag="japan" f={f} from={at("13", 0.25)} o={show(f, at("13", 0.25), at("14"))} />
      </AbsoluteFill>

      {/* ── 01–04 hook ── */}
      <Question x={CX} y={P([175, 22])[1]} f={f} at={at("02")} out={at("03", 0.5)} s={1.4} />

      {/* ── 05–06 2021: the first scheduled direct flight, ~14 hours ── */}
      <YearRibbon text="2021" f={f} at={at("05", 0.1)} out={at("07")} />
      <DataCard value="~14 TIẾNG" label="BAY THẲNG" x={CX} y={480} f={f} at={at("06", 0.4)} out={at("07")} size={88} />

      {/* ── 07–11 [NGƯỜI] Mercator 1569: a flat map for sailors; straight line = one compass bearing ── */}
      <AbsoluteFill style={{ backgroundColor: "#C9A46A", mixBlendMode: "multiply", opacity: 0.45 * show(f, at("07", 0.2), at("12")) }} />
      <YearRibbon text="1569" f={f} at={at("08", 0.1)} out={at("12")} />
      <MapLabel text="GERARDUS MERCATOR" x={CX} y={480} o={show(f, at("08", 0.25), at("10"))} size={52} />
      <PegImg src={`${IMG}/b-01-mercator.png`} x={260} y={1290} h={340} f={f} at={at("08", 0.15)} o={1 - prog(f, at("12"), 6)} />
      <ImgSticker src={`${IMG}/b-03-old-map.png`} x={700} y={1130} w={330} f={f} at={at("08", 0.45)} out={at("09", 0.2)} />
      {f >= at("09") && f < at("12") && (() => {
        const [x, y] = routeHead(rlS, 0.45);
        const [x2, y2] = routeHead(rlS, 0.55);
        const brg = (Math.atan2(x2 - x, -(y2 - y)) * 180) / Math.PI;
        return (
          <Sticker x={x} y={y - 120} f={f} at={at("09", 0.05)} out={at("11")} s={1.2}><Compass bearing={brg} f={f} /></Sticker>
        );
      })()}
      {f >= at("10") && f < at("12") && (() => {
        const [x, y] = routeHead(rlS, 0.15 + 0.5 * prog(f, at("10"), at("11", 0.9) - at("10")));
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("12") - 4, 4) }}>
            <g style={{ translate: `${x}px ${y - 26}px` }}><Ship s={1.4} /></g>
          </svg>
        );
      })()}
      <Question x={rlS[40][0]} y={rlS[40][1] - 110} f={f} at={at("11", 0.1)} out={at("12")} s={1.1} />

      {/* ── 12–16 the price of the straight line: ~13.400 ↔ ~12.600 km, ~850 km, ≈ +1 hour; [ĐÙA] ── */}
      <DataCard value="~13.400 KM" label="ĐƯỜNG LA BÀN" x={CX} y={330} f={f} at={at("12", 0.35)} out={at("13", 0.3)} size={88} color={RED} />
      <DataCard value="~12.600 KM" label="ĐƯỜNG NGẮN NHẤT" x={CX} y={330} f={f} at={at("13", 0.6)} out={at("14")} size={88} color={BLUE} />
      <BigGold text="−850 KM" f={f} at={at("14", 0.1)} out={at("15", 0.3)} y={400} size={130} />
      <DataCard value="≈ +1 GIỜ BAY" x={CX} y={330} f={f} at={at("15", 0.2)} out={at("17")} size={80} />
      <PegImg src={`${IMG}/b-02-tired-passenger.png`} x={CX} y={1300} h={360} f={f} at={at("15", 0.05)} o={1 - prog(f, at("17"), 6)} />

      {/* ── 17–18 roll the map into a globe: the curve is the straightest ── */}
      {globeO > 0 && (
        <ToyGlobe x={CX} y={760} r={interpolate(toGlobe, [0, 1], [300, 380], CLAMP)} view={[interpolate(f, [at("17"), at("19")], [165, 185], CLAMP), 38]} f={f} o={globeO}
          fills={[{ name: "Vietnam", color: ATLAS.c }, { name: "United States of America", color: "#6E9BE0" }]}
          routes={[
            { pts: RL, color: RED, p: 1, w: 7, dash: "18 12", o: 0.85 },
            { pts: GC, color: BLUE, p: prog(f, at("17", 0.2), 30), w: 10 },
            // illustrative "real flight" streak: via Japan, a little off the great circle (not drawn over Alaska)
            { pts: GC.map(([lo, la], i) => [lo, la - 3.5 * Math.sin((Math.PI * i) / 64)] as LL), color: ATLAS.white, p: prog(f, at("18", 0.15), 40), w: 5, o: 0.7 },
          ]} />
      )}
      <MapLabel text="ĐƯỜNG THẲNG NHẤT" x={CX} y={1250} o={show(f, at("17", 0.4), at("18"))} size={56} />
      <MapLabel text="TUỲ GIÓ, VÙNG TRỜI" x={CX} y={1250} o={show(f, at("18", 0.35), at("19") - 4)} size={52} />

      {/* ── 19–20 [TWIST] the same map makes Greenland look as big as Africa; Africa is ~14× ── */}
      {worldO > 0 && (
        <AbsoluteFill style={{ opacity: worldO }}>
          <Atlas cam={wcam} f={f} fills={[{ name: "Greenland", color: "#9FD3E0" }]} layer={(z) => (
            moveG > 0 ? (
              <g style={{ translate: `${interpolate(moveG, [0, 1], [0, af[0] - gl[0]], CLAMP)}px ${interpolate(moveG, [0, 1], [0, af[1] - gl[1]], CLAMP)}px` }}>
                <g style={{ scale: shrink, transformOrigin: `${gl[0]}px ${gl[1]}px` }}>
                  <path d={countryPath("Greenland")} fill="#9FD3E0" stroke={ATLAS.ink} strokeWidth={3 / z / shrink} opacity={0.95} />
                </g>
              </g>
            ) : null
          )} />
        </AbsoluteFill>
      )}
      {worldO > 0 && (() => {
        const toS = (p: [number, number]) => [CX + (p[0] - baseXY(wcam.lon, wcam.lat)[0]) * wcam.zoom, 760 + (p[1] - baseXY(wcam.lon, wcam.lat)[1]) * wcam.zoom];
        const g = toS(gl);
        const a = toS(af);
        return (
          <>
            <MapLabel text="GREENLAND" x={Math.max(200, g[0])} y={g[1] + 20} o={show(f, at("19", 0.3), at("20", 0.1)) * worldO} size={52} />
            <MapLabel text="CHÂU PHI" x={a[0]} y={a[1] + 150} o={show(f, at("19", 0.55), at("21") - 4) * worldO} size={52} />
          </>
        );
      })()}
      <BigGold text="×14" f={f} at={at("20", 0.35)} out={at("21") - 4} x={740} y={640} size={150} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Trên bản đồ, *đường thẳng* từ Sài Gòn sang Mỹ lại là *đường xa hơn*.",
  "03": "*Đường cong*.",
  "05": "Cuối năm *2021*, Vietnam Airlines mở chuyến bay thẳng thường lệ đầu tiên từ Việt Nam sang Mỹ.",
  "06": "Tân Sơn Nhất tới San Francisco, gần *14 tiếng*, không dừng.",
  "08": "Năm *1569*, ông *Mercator* trải quả địa cầu lên một tờ giấy phẳng, để thuỷ thủ dễ đi biển.",
  "12": "Đi theo đường thẳng trên bản đồ, quãng đường khoảng *13.400 km*.",
  "13": "Đường ngắn nhất thì đi ngang Nhật Bản, vòng lên gần quần đảo Aleut của Alaska, chỉ khoảng *12.600*.",
  "14": "Chênh khoảng *850 km*.",
  "15": "Tức gần thêm *một tiếng* ngồi ghế máy bay.",
  "20": "Thật ra, châu Phi lớn gấp khoảng *14 lần*.",
  "21": "Trên một quả cầu, *đường thẳng nhất* luôn là một *đường cong*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const HIT = "hit/cinematic-piano-hit-567216.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [CLICK, "01", 0.1], [W2, "03", 0.05], [CLICK, "04", 0.2], [W, "05", 0, -4], [W2, "06", 0, -4],
  [CLICK, "08", 0.15], [PEN, "09", 0.1], [CLICK, "12", 0.35], [CLICK, "13", 0.6], [HIT, "14", 0.1, 0, -20],
  [W, "17", 0.02], [W2, "19", 0, -4], [HIT, "20", 0.35, 0, -20],
];

/** Music duck: the bed dips under the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("19") - 6, at("19") + 6, at("21", 1) - 4, at("21", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P4DuongBayCong: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p4-duong-bay-cong/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC_ALT.P4} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p4DuongBayCongDuration = (fps: number) => episodeDuration(timing, fps);
