/**
 * Map channel · P2 Tiền & bản đồ · v3 "67 tỷ đô để mua một ngày" (style I Toy Atlas).
 * Script + sources: kich-ban-p2-duong-sat-cao-toc-FINAL.md (v3), cong-2_so-nguon.md, kich-ban-v3-de-xuat.md §D;
 * v1 and v2 live in ./v1 and ./v2. v3 (Lucas 2026-10-15): the 7 script rules (short answer "Vì toàn cầu.",
 * the governor-general's family on the first 1936 train, 40 h → 34 h payoff).
 * v2 (Lucas 2026-10-13, after the 20-video competitor study): the story is a race between
 * two trains (opened in scene 1, paid off in scene 7); slow camera push inside every beat;
 * data cards; glowing route; profile card for bridges/tunnels; music dips at the climax.
 * Every cue comes from the VO timing. Soft loop (Lucas 2026-10-14): the VO ends on line 24; in the 0.7 s tail the picture returns to the first frame.
 *
 * Map rules (Lucas 2026-10-12): Hoàng Sa + Trường Sa in Vietnam's colour with labels whenever
 * the whole coast is in frame; the route is a SCHEMATIC (not the official alignment).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-duong-sat-cao-toc.timing.json";
import words from "../../src/voiceover/p2-duong-sat-cao-toc.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, count, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MapLabel, pts, Pulse, Question, Route, routeHead, seamKeys, show, Sticker, toScreen, Track, vertexP, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p2-duong-sat-cao-toc/cut";
/** Lucas's v2 images (image-prompts.md); vector / tinted stand-ins until they exist. */
const HAS = { pho: true, comtam: true, steam: true };

const { at } = beats(timing, FPS);

const VIEW = {
  vn: { lon: 109.8, lat: 14.8, zoom: 19 },
  hanoi: { lon: 105.85, lat: 20.6, zoom: 60 },
  coast: { lon: 108.85, lat: 14.4, zoom: 48 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  { at: at("09") - 2, ...VIEW.coast },
  { at: at("15") - 4, ...VIEW.hanoi },
  { at: at("17") - 4, ...VIEW.vn },
];
/** Slow push inside each beat: 4 % per 3 s, at most +8 % (keeps the islands and bottom rows clear). */
const PUSH = 0.04;
const PUSH_CAP = 0.08;
// loop seam: the last frame lands exactly on the opening framing
const KEYS = seamKeys(KEYS0, episodeDuration(timing, FPS), PUSH, PUSH_CAP);

const VN = ATLAS.c;
const FILLS: Fill[] = ["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN }));

/** Schematic route through the big cities, kept inland (NOT the official alignment). */
const ROUTE: [number, number][] = [
  [105.84, 20.92], [105.92, 20.54], [105.78, 19.8], [105.68, 18.68], [105.88, 18.3], [106.5, 17.45], [107.05, 16.8],
  [107.55, 16.42], [108.1, 16.0], [108.4, 15.55], [108.7, 15.08], [108.95, 13.9], [109.15, 13.05], [109.08, 12.25],
  [108.9, 11.6], [108.05, 11.0], [107.0, 10.82], [106.72, 10.78],
];
/** Fast-train stops on the schematic (vertex index): Ngọc Hồi, Vinh, Đà Nẵng, Nha Trang, Thủ Thiêm. Unlabelled. */
const STOPS5 = [0, 3, 8, 13, ROUTE.length - 1];
const VINH = 3;
/** Km1221, where the last rail of the 1936 line was laid (Phú Yên) ≈ this vertex of the schematic. */
const KM1221 = 12;
const HANOI: [number, number] = [105.85, 21.03];
const HCM: [number, number] = [106.7, 10.78];

const clock = (hours: number) => `${Math.floor(hours)}:${String(Math.floor((hours % 1) * 60)).padStart(2, "0")}`;

// ── screen layout (vn view): top band over China, open sea east of Hainan, Gulf of Thailand rows
const TOP_Y = 330;
const SEA: [number, number] = [790, 470];
const ROW = { icon: 130, x0: 205, max: 420, r1: 1185, r2: 1275, h: 58 };

const Moon: React.FC<{ x: number; y: number; f: number; at: number; out?: number }> = ({ x, y, f, at: a, out }) => (
  <Sticker x={x} y={y} f={f} at={a} out={out}>
    <path d="M 14 -34 A 36 36 0 1 0 14 34 A 28 28 0 1 1 14 -34 Z" fill="#F4E3A1" stroke={ATLAS.ink} strokeWidth={5} />
    <text x={26} y={-14} fontFamily={FONT} fontSize={30} fontWeight={800} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={5} paintOrder="stroke">z</text>
  </Sticker>
);

const Sun: React.FC<{ x: number; y: number; f: number; at: number; out?: number }> = ({ x, y, f, at: a, out }) => (
  <Sticker x={x} y={y} f={f} at={a} out={out}>
    <g style={{ rotate: `${f * 1.5}deg` }}>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={0} y1={-34} x2={0} y2={-50} stroke={ATLAS.gold} strokeWidth={7} strokeLinecap="round" style={{ rotate: `${i * 45}deg` }} />
      ))}
    </g>
    <circle r={26} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
  </Sticker>
);

/** Food: Lucas's image when it exists, else a vector bowl / plate. */
const Food: React.FC<{ kind: "pho" | "comtam"; x: number; y: number; f: number; at: number; out?: number }> = ({ kind, x, y, f, at: a, out }) =>
  HAS[kind] ? (
    <ImgSticker src={`${IMG}/p-${kind === "pho" ? "09-pho" : "10-com-tam"}.png`} x={x} y={y} w={190} f={f} at={a} out={out} />
  ) : (
    <Sticker x={x} y={y} f={f} at={a} out={out} s={1.2}>
      {kind === "pho" ? (
        <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
          {[-18, 0, 18].map((dx, i) => (
            <path key={i} d={`M ${dx} -40 q 10 -14 0 -28 q -10 -14 0 -28`} fill="none" stroke={ATLAS.white} strokeWidth={5}
              opacity={0.6 + 0.4 * Math.sin(f / 6 + i)} />
          ))}
          <path d="M -62 -14 L 62 -14 Q 56 44 0 46 Q -56 44 -62 -14 Z" fill={ATLAS.white} />
          <ellipse cx={0} cy={-14} rx={62} ry={14} fill="#E9C27A" />
          <path d="M -60 -6 L 60 -6" stroke="#3D6FD0" strokeWidth={6} />
          <line x1={-20} y1={-60} x2={70} y2={-10} stroke="#8A5A2B" strokeWidth={7} />
        </g>
      ) : (
        <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
          <ellipse cx={0} cy={0} rx={74} ry={30} fill={ATLAS.white} />
          <ellipse cx={-22} cy={-6} rx={30} ry={14} fill="#F7F2E8" />
          <ellipse cx={26} cy={-8} rx={28} ry={12} fill="#9C5A2E" />
          <circle cx={-6} cy={-18} r={14} fill="#FFFFFF" />
          <circle cx={-6} cy={-18} r={6} fill={ATLAS.gold} strokeWidth={3} />
        </g>
      )}
    </Sticker>
  );

/** Side profile of the line (bridges / tunnel / ground) with the train running along it. */
const ProfileCard: React.FC<{ f: number; at: number; out: number }> = ({ f, at: a, out }) => {
  if (f < a - 2 || f > out + 6) return null;
  const o = Math.min(prog(f, a, 6), 1 - prog(f, out, 6));
  const X0 = 110;
  const W = 800;
  const Y = 1150;
  // 60 % bridge, 10 % tunnel, 30 % ground (C15)
  const xb = X0 + W * 0.6;
  const xt = xb + W * 0.1;
  const rail = Y - 40;
  const hill = `M ${xb - 40} ${Y + 70} Q ${(xb + xt) / 2} ${Y - 150} ${xt + 40} ${Y + 70} Z`;
  const draw = prog(f, a + 4, 30);
  const trainX = X0 + W * prog(f, a + 20, 70, Easing.inOut(Easing.quad));
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={X0 - 30} y={Y - 170} width={W + 60} height={280} rx={28} fill="rgba(22,32,40,0.86)" stroke={ATLAS.gold} strokeWidth={5} />
        {/* ground with a river under the bridge part */}
        <path d={`M ${X0} ${Y + 70} L ${X0 + W} ${Y + 70}`} stroke="#7A5A2E" strokeWidth={10} />
        <path d={`M ${X0 + W * 0.18} ${Y + 66} q 60 -18 120 0`} stroke="#7EC8F0" strokeWidth={8} fill="none" />
        <path d={hill} fill="#6F8F4E" stroke={ATLAS.ink} strokeWidth={4} />
        {/* bridge piers */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = X0 + 30 + i * ((xb - X0 - 60) / 8);
          return <rect key={i} x={x - 8} y={rail} width={16} height={(Y + 70 - rail) * prog(f, a + 6 + i * 2, 8)} fill="#B9C3C2" stroke={ATLAS.ink} strokeWidth={3} />;
        })}
        {/* tunnel mouth */}
        <path d={`M ${xb + 6} ${rail + 6} A 26 26 0 0 1 ${xt - 6} ${rail + 6}`} fill="#222" stroke={ATLAS.ink} strokeWidth={4} />
        {/* the rail: deck on the bridge, through the hill, then on an embankment */}
        <path d={`M ${X0} ${rail} L ${X0 + W} ${rail}`} stroke={ATLAS.gold} strokeWidth={10} strokeLinecap="round" pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1 - draw }} />
        <path d={`M ${xt} ${rail + 6} L ${X0 + W} ${rail + 6} L ${X0 + W} ${Y + 70} L ${xt + 60} ${Y + 70} Z`} fill="#8A6A3E" opacity={0.6 * draw} />
        <text x={(X0 + xb) / 2} y={Y - 110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={ATLAS.gold}
          opacity={prog(f, a + 30, 8)}>60% CẦU</text>
        <text x={(xb + xt) / 2 + 70} y={Y - 110} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={56} fill={ATLAS.white}
          opacity={prog(f, a + 55, 8)}>10% HẦM</text>
      </svg>
      {/* train hidden inside the tunnel */}
      {!(trainX > xb + 10 && trainX < xt - 10) && (
        <Img src={staticFile(`${IMG}/p-01-hsr-train.png`)} style={{ position: "absolute", left: trainX - 70, top: rail - 52, width: 140 }} />
      )}
    </AbsoluteFill>
  );
};

/** Vote button pressed at frame `press` (no camera move: only the button reacts). */
const VoteButton: React.FC<{ x: number; y: number; f: number; at: number; press: number; out: number }> = ({ x, y, f, at: a, press, out }) => {
  const down = interpolate(f, [press, press + 3, press + 9], [0, 1, 0.35], CLAMP);
  return (
    <>
      <Sticker x={x} y={y} f={f} at={a} out={out} s={1.2}>
        <rect x={-70} y={-6} width={140} height={46} rx={10} fill="#555E63" stroke={ATLAS.ink} strokeWidth={5} />
        <ellipse cx={0} cy={-6 + 18 * down} rx={52} ry={20} fill="#8E1F1A" stroke={ATLAS.ink} strokeWidth={5} />
        <path d={`M -52 ${-6 + 18 * down} L -52 ${-26 + 18 * down} A 52 20 0 0 1 52 ${-26 + 18 * down} L 52 ${-6 + 18 * down}`}
          fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={5} />
      </Sticker>
      {f >= press && f < press + 20 && <Pulse x={x} y={y - 20} f={f - press} color={ATLAS.gold} period={20} o={1 - prog(f, press + 12, 8)} />}
    </>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const route = pts(cam, ROUTE);
  const [hx, hy] = toScreen(cam, ...HANOI);
  const [sx, sy] = toScreen(cam, ...HCM);
  // islands whenever the whole coast is in frame (not during the coast / Hà Nội zooms)
  const islandsO = 1 - (prog(f, at("09") - 4, 4) - prog(f, at("17") + 6, 6));
  const stops = STOPS5.map((i) => vertexP(route, i));
  const pVinh = vertexP(route, VINH);

  // the gold route glows once the race starts and is gone again for the loop frame
  const goldO = Math.min(prog(f, at("03", 0.2), 8), 1 - prog(f, at("24", 1), 20));

  // scene 2: new train runs the whole line in ~2 s
  const runP = prog(f, at("05", 0.1), 60, Easing.inOut(Easing.quad));
  // scene 7 (climax): race clock — 5.5 h of "race time" over 80 frames
  const raceA = at("20");
  const hours = interpolate(f, [raceA, raceA + 80], [0, 5.5], CLAMP);
  const oldHours = interpolate(f, [raceA, raceA + 80, at("21")], [0, 5.5, 6.2], CLAMP);
  const newRace = hours / 5.5;
  // Hà Nội → Vinh takes the Thống Nhất > 6.5 h (C16): at 5.5 h it is still ~5.5/6.7 of the way there
  const oldRace = pVinh * (oldHours / 6.7);
  const raceO = Math.min(prog(f, at("19"), 6), 1 - prog(f, at("21"), 8));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={islandsO} />

      {/* the route: dotted always; solid + glowing from the race on */}
      <Route pts={route} p={1} />
      {goldO > 0 && <Track ps={route} p={1} o={goldO} glow={f >= at("08") && f < at("09") ? 1 : 0.45} f={f} />}

      {/* ── 01–02 hook: 67 tỷ đô… để mua một ngày? ── */}
      <ImgSticker src={`${IMG}/p-03-money-bags.png`} x={SEA[0]} y={SEA[1] + 40 * (1 - prog(f, at("01", 0.1), 8, Easing.in(Easing.quad)))}
        w={250} f={f} at={at("01", 0.1)} out={at("01", 0.62)} />
      <BigGold text="67 TỶ ĐÔ" f={f} at={at("01", 0.22)} out={at("03")} y={TOP_Y} size={130} />
      <BigGold text="MUA 1 NGÀY?" f={f} at={at("01", 0.72)} out={at("03")} y={TOP_Y + 140} size={100} color={ATLAS.white} />
      <Question x={SEA[0] + 70} y={SEA[1] + 120} f={f} at={at("02", 0.1)} out={at("03")} s={1.4} />

      {/* ── 03–06 the race, part 1: the rules ── */}
      {f >= at("03") && f < at("07") && (
        <>
          <MapLabel text="HÀ NỘI" x={hx + 40} y={hy - 40} o={show(f, at("03", 0.1), at("04"))} />
          <ImgSticker src={`${IMG}/p-02-old-train.png`} x={hx - 60} y={hy + 50} w={150} f={f} at={at("03", 0.3)} out={at("07")} />
          {(runP === 0 || runP === 1) && (
            <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={runP === 1 ? sx + 30 : hx + 110} y={(runP === 1 ? sy - 34 : hy + 50)} w={150} f={f}
              at={at("03", 0.45)} out={at("07")} />
          )}
          {runP > 0 && runP < 1 && (() => {
            const [x, y] = routeHead(route, runP);
            return <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={x} y={y - 26} w={160} f={f} at={at("03", 0.45)} />;
          })()}
          {/* the 5 stops light up as the train passes */}
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("07") - 4, 4) }}>
            {stops.map((p, i) => {
              const [x, y] = routeHead(route, p);
              const lit = prog(f, at("05", 0.1) + 60 * p, 4);
              return <circle key={i} cx={x} cy={y} r={13 * lit} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={4} />;
            })}
          </svg>
          <Moon x={hx - 100} y={hy + 150} f={f} at={at("04", 0.4)} out={at("05")} />
          <Moon x={hx - 10} y={hy + 150} f={f} at={at("04", 0.5)} out={at("05")} />
          {/* line 06: breakfast in Hà Nội, lunch in Sài Gòn */}
          <Food kind="pho" x={hx + 190} y={hy + 170} f={f} at={at("06", 0.05)} out={at("07")} />
          <Sun x={hx + 190} y={hy + 40} f={f} at={at("06", 0.1)} out={at("07")} />
          <Food kind="comtam" x={sx + 170} y={sy - 10} f={f} at={at("06", 0.55)} out={at("07")} />
          <Sun x={sx + 170} y={sy - 150} f={f} at={at("06", 0.6)} out={at("07")} />
        </>
      )}
      {/* rows: 30+ giờ vs ~5,5 giờ (bars on the same scale) */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("04", 0.2), 6), 1 - prog(f, at("07"), 6)) }}>
        <rect x={ROW.x0} y={ROW.r1 - ROW.h / 2} width={ROW.max * prog(f, at("04", 0.3), 40)} height={ROW.h} rx={10} fill="#9AA3A6" stroke={ATLAS.ink} strokeWidth={5} />
        {f >= at("04", 0.6) && (
          <text x={ROW.x0 + 24} y={ROW.r1 + 20} fontFamily={FONT} fontWeight={800} fontSize={56} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={9} paintOrder="stroke">
            30+ GIỜ
          </text>
        )}
        <rect x={ROW.x0} y={ROW.r2 - ROW.h / 2} width={((ROW.max * 5.5) / 32.5) * prog(f, at("05", 0.6), 10)} height={ROW.h} rx={10} fill={ATLAS.gold}
          stroke={ATLAS.ink} strokeWidth={5} strokeDasharray="14 8" />
        {f >= at("05", 0.7) && (
          <text x={ROW.x0 + (ROW.max * 5.5) / 32.5 + 18} y={ROW.r2 + 20} fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.gold}
            stroke={ATLAS.ink} strokeWidth={9} paintOrder="stroke">~5,5 GIỜ · DỰ KIẾN</text>
        )}
      </svg>
      <ImgSticker src={`${IMG}/p-02-old-train.png`} x={ROW.icon} y={ROW.r1} w={120} f={f} at={at("04", 0.2)} out={at("07")} />
      <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={ROW.icon} y={ROW.r2} w={120} f={f} at={at("05", 0.5)} out={at("07")} />

      {/* ── 07–09 the price ── */}
      <ImgSticker src={`${IMG}/p-03-money-bags.png`} x={SEA[0]} y={SEA[1] + 50 * (1 - prog(f, at("07", 0.1), 8, Easing.in(Easing.quad)))}
        w={260} f={f} at={at("07", 0.1)} out={at("08")} />
      <DataCard value="1.500+ KM" label="SƠ ĐỒ MINH HOẠ" x={640} y={TOP_Y} f={f} at={at("08", 0.12)} out={at("09") - 4} />
      {f >= at("09") - 2 && f < at("10") + 4 && (() => {
        // one metre of track and a pile of 500.000-đồng notes growing on it
        const [qx, qy] = toScreen(cam, 108.7, 15.08);
        const n = Math.round(10 * prog(f, at("09", 0.35), 40));
        return (
          <>
            <Sticker x={qx + 190} y={qy + 120} f={f} at={at("09", 0.2)} out={at("10") + 2} s={1.3}>
              <rect x={-90} y={8} width={180} height={14} fill="#8A5A2B" stroke={ATLAS.ink} strokeWidth={3} />
              {[-70, -35, 0, 35, 70].map((x) => <rect key={x} x={x - 8} y={4} width={16} height={26} fill="#6B4423" stroke={ATLAS.ink} strokeWidth={2} />)}
              <rect x={-96} y={-2} width={192} height={8} fill="#B9C3C2" stroke={ATLAS.ink} strokeWidth={2} />
              {Array.from({ length: n }, (_, i) => (
                <rect key={i} x={-46 + (i % 2) * 6} y={-14 - i * 11} width={92} height={10} rx={2} fill="#3F9FB0" stroke={ATLAS.ink} strokeWidth={2} />
              ))}
              <text y={52} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} paintOrder="stroke">1 m</text>
            </Sticker>
          </>
        );
      })()}
      <DataCard value="> 1 TỶ ĐỒNG" label="MỖI MÉT · SƠ BỘ" x={540} y={TOP_Y} f={f} at={at("09", 0.4)} out={at("10")} />

      {/* ── 10–12 why so expensive: bridges and tunnels ── */}
      <Question x={540} y={TOP_Y + 20} f={f} at={at("10")} out={at("11")} s={1.6} />
      {/* [ĐÙA] "Vì toàn cầu." — the line becomes a chain of bridges */}
      <BigGold text="TOÀN CẦU" f={f} at={at("11", 0.05)} out={at("12")} y={TOP_Y} size={120} />
      {f >= at("11") && f < at("12") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("12") - 4, 4) }}>
          {Array.from({ length: 14 }, (_, i) => {
            const [x, y] = routeHead(route, 0.08 + i * 0.065);
            const up = 14 * prog(f, at("11", 0.05) + i, 6, Easing.out(Easing.back(2)));
            return <path key={i} d={`M ${x - 16} ${y} Q ${x} ${y - up * 2} ${x + 16} ${y}`} fill="none" stroke={ATLAS.white} strokeWidth={6} strokeLinecap="round" />;
          })}
        </svg>
      )}
      <ProfileCard f={f} at={at("12")} out={at("14")} />
      <BigGold text="350 KM/H" f={f} at={at("14", 0.05)} out={at("14", 0.5)} y={TOP_Y} size={120} />
      {f >= at("14") - 2 && f < at("15") && (() => {
        // the line lifts off the ground: shadow below, piers between, deck rising
        const lift = 26 * prog(f, at("14", 0.3), 24, Easing.out(Easing.cubic));
        const o = 1 - prog(f, at("15") - 6, 6);
        return (
          <>
            <Track ps={route} p={1} color={ATLAS.ink} w={10} dy={lift * 0.6} o={0.35 * o} />
            <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
              {Array.from({ length: 24 }, (_, i) => {
                const [x, y] = routeHead(route, 0.3 + i * 0.018);
                return <line key={i} x1={x} y1={y - lift} x2={x} y2={y + lift * 0.6} stroke="#B9C3C2" strokeWidth={5} />;
              })}
            </svg>
            <Track ps={route} p={1} dy={-lift} glow={0.6} f={f} o={o} />
          </>
        );
      })()}

      {/* ── 15–16 [PHE 1] Quốc hội bấm nút ── */}
      {f >= at("15") - 4 && f < at("17") && (
        <>
          <Pulse x={hx} y={hy} f={f} />
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            <g style={{ translate: `${hx + 26}px ${hy - 170}px`, scale: 1.8 * prog(f, at("15", 0.2), 8) }}>
              <Flag kind="vietnam" f={f} />
            </g>
          </svg>
          <ImgSticker src={`${IMG}/p-05-assembly.png`}
            x={480} y={1090 - 10 * Math.abs(Math.sin((f - at("16")) / 5)) * show(f, at("16"), at("17"))} w={460} f={f} at={at("15", 0.15)} out={at("17") - 4} />
          <VoteButton x={820} y={1010} f={f} at={at("15", 0.4)} press={at("15", 0.82)} out={at("17") - 4} />
        </>
      )}
      <YearRibbon text="2024" f={f} at={at("15", 0.2)} out={at("17") - 4} />
      <BigGold text={`${count(f, at("16", 0.05), 40, 443)} / 454`} f={f} at={at("16", 0.05)} out={at("17") - 4} y={470} size={120} />

      {/* ── 17–18 [PHE 2] experts: when does it pay back? (neutral) ── */}
      {f >= at("17") && f < at("18") + 4 && (
        <>
          <ImgSticker src={`${IMG}/p-07-scale.png`} x={SEA[0]} y={SEA[1]} w={260} f={f} at={at("17", 0.1)} out={at("18")} />
          <ImgSticker src={`${IMG}/p-03-money-bags.png`} x={SEA[0] - 83} y={SEA[1] - 10} w={120} f={f} at={at("17", 0.2)} out={at("18")} />
          <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={SEA[0] + 83} y={SEA[1] + 4} w={110} f={f} at={at("17", 0.3)} out={at("18")} />
        </>
      )}
      <BigGold text="HOÀN VỐN?" f={f} at={at("17", 0.45)} out={at("18")} y={TOP_Y - 20} size={110} />
      <BigGold text="4 NĂM ĐẦU" f={f} at={at("18", 0.2)} out={at("19")} y={TOP_Y} size={110} />
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("18", 0.25), 6), 1 - prog(f, at("19"), 6)) }}>
        <rect x={ROW.x0} y={ROW.r1 - ROW.h / 2} width={ROW.max * 0.7 * prog(f, at("18", 0.4), 20)} height={ROW.h} rx={10} fill={ATLAS.b} stroke={ATLAS.ink} strokeWidth={5} />
        <rect x={ROW.x0} y={ROW.r2 - ROW.h / 2} width={ROW.max * 0.7 * prog(f, at("18", 0.55), 20)} height={ROW.h} rx={10} fill="#9AA3A6" stroke={ATLAS.ink} strokeWidth={5} />
        <text x={ROW.x0 + ROW.max * 0.7 + 50} y={(ROW.r1 + ROW.r2) / 2 + 26} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={80}
          fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" opacity={prog(f, at("18", 0.8), 6)}>=</text>
      </svg>
      <ImgSticker src={`${IMG}/p-03-money-bags.png`} x={ROW.icon} y={ROW.r1} w={100} f={f} at={at("18", 0.3)} out={at("19")} />
      <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={ROW.icon} y={ROW.r2} w={120} f={f} at={at("18", 0.45)} out={at("19")} />

      {/* ── 19–20 climax: back to the race ── */}
      {f >= at("19") && f < at("22") && (() => {
        const [ox, oy] = routeHead(route, oldRace);
        const [nx, ny] = routeHead(route, newRace);
        const [vx, vy] = routeHead(route, pVinh);
        const arrived = hours >= 5.5;
        return (
          <>
            {f >= raceA && <MapLabel text="VINH" x={vx + 130} y={vy + 18} o={show(f, raceA + 60, at("21") + 4)} />}
            {f >= raceA + 70 && <Pulse x={vx} y={vy} f={f} color={ATLAS.white} period={30} o={1 - prog(f, at("21"), 6)} />}
            <ImgSticker src={`${IMG}/p-02-old-train.png`} x={f < raceA ? hx - 60 : ox - 70} y={f < raceA ? hy + 50 : oy - 34} w={150} f={f}
              at={at("19", 0.1)} out={at("21")} />
            <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={f < raceA ? hx + 110 : arrived ? sx + 30 : nx} y={f < raceA ? hy + 50 : (arrived ? sy : ny) - 30} w={160} f={f}
              at={at("19", 0.2)} out={at("21")} />
            {arrived && <Pulse x={sx} y={sy} f={f} color={ATLAS.gold} period={30} o={1 - prog(f, at("21"), 6)} />}
          </>
        );
      })()}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: raceO }}>
        {/* race clocks: the new train's stops at 5:30, the old one keeps ticking */}
        {([[ROW.r1, clock(oldHours), "#9AA3A6", ATLAS.white], [ROW.r2, clock(hours), ATLAS.gold, ATLAS.gold]] as const).map(
          ([y, t, c, tc], i) => (
            <g key={i}>
              <rect x={ROW.x0} y={y - ROW.h / 2} width={250} height={ROW.h} rx={10} fill="rgba(22,32,40,0.84)" stroke={c} strokeWidth={5} />
              <text x={ROW.x0 + 24} y={y + 20} fontFamily={FONT} fontWeight={800} fontSize={56} fill={tc}>{t}</text>
            </g>
          ),
        )}
      </svg>
      {raceO > 0 && (
        <>
          <ImgSticker src={`${IMG}/p-02-old-train.png`} x={ROW.icon} y={ROW.r1} w={120} f={f} at={at("19", 0.2)} out={at("21")} />
          <ImgSticker src={`${IMG}/p-01-hsr-train.png`} x={ROW.icon} y={ROW.r2} w={120} f={f} at={at("19", 0.3)} out={at("21")} />
        </>
      )}

      {/* ── 21–24 twist: joined in 1936; the first through train ~40 h; 90 years on, < 10 h faster ── */}
      <YearRibbon text="1936" f={f} at={at("21", 0.3)} out={at("22", 0.35)} />
      {f >= at("21") && f < at("23") && (() => {
        const [kx, ky] = routeHead(route, vertexP(route, KM1221));
        // [NGƯỜI] line 22: the steam train runs the whole line with the governor-general's family aboard
        const run = prog(f, at("22", 0.1), at("22", 0.95) - at("22", 0.1), Easing.inOut(Easing.quad));
        const [tx, ty] = routeHead(route, run);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("23") - 6, 5) }}>
            <Pulse x={kx} y={ky} f={f} color={ATLAS.gold} period={36} o={show(f, at("21", 0.55), at("22"))} />
            {f < at("22") ? (
              <ImgSticker src={`${IMG}/p-11-steam-train.png`} x={kx + 150} y={ky - 40} w={190} f={f} at={at("21", 0.45)} />
            ) : (
              <ImgSticker src={`${IMG}/p-11-steam-train.png`} x={tx} y={ty - 30} w={170} f={f} at={at("22")} />
            )}
            <ImgSticker src={`${IMG}/p-12-governor-family.png`} x={760} y={830} w={300} f={f} at={at("22", 0.05)} />
          </AbsoluteFill>
        );
      })()}
      <DataCard value="~40 GIỜ" label="CHUYẾN ĐẦU · 1936" x={540} y={TOP_Y} f={f} at={at("22", 0.45)} out={at("23")} />
      <BigGold text="90 NĂM" f={f} at={at("23", 0.05)} out={at("24")} y={TOP_Y} size={130} />
      <ImgSticker src={`${IMG}/p-06-clock.png`} x={760} y={830} w={220} f={f} at={at("23", 0.05)} out={at("24")} />
      {/* line 24: same scale — 1936 ~40 h vs today ~34 h: under 10 h faster in 90 years */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("24"), 5), 1 - prog(f, at("24", 1), 6)) }}>
        {([[ROW.r1, 40, "#B08A5B", "~40 GIỜ"], [ROW.r2, 34, "#9AA3A6", "~34 GIỜ"]] as const).map(([y, h, c, t], i) => (
          <g key={i}>
            <rect x={ROW.x0} y={y - ROW.h / 2} width={ROW.max * (h / 40) * prog(f, at("24", 0.05 + i * 0.15), 14)} height={ROW.h} rx={10} fill={c} stroke={ATLAS.ink} strokeWidth={5} />
            <text x={ROW.x0 + 24} y={y + 20} fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={9} paintOrder="stroke"
              opacity={prog(f, at("24", 0.2 + i * 0.15), 5)}>{t}</text>
          </g>
        ))}
        {/* the gap: what 90 years bought */}
        <rect x={ROW.x0 + ROW.max * (34 / 40)} y={ROW.r2 - ROW.h / 2} width={ROW.max * (6 / 40)} height={ROW.h} rx={6} fill="none" stroke={ATLAS.gold}
          strokeWidth={6} strokeDasharray="10 6" opacity={prog(f, at("24", 0.55), 6)} />
      </svg>
      {f >= at("24") && f < at("24", 1) + 6 && (
        <>
          <ImgSticker src={`${IMG}/p-11-steam-train.png`} x={ROW.icon} y={ROW.r1} w={120} f={f} at={at("24")} out={at("24", 1)} />
          <ImgSticker src={`${IMG}/p-02-old-train.png`} x={ROW.icon} y={ROW.r2} w={120} f={f} at={at("24", 0.15)} out={at("24", 1)} />
        </>
      )}
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Việt Nam dự kiến chi khoảng *67 tỷ đô*, chỉ để mua *một ngày*.",
  "04": "Tàu Thống Nhất hôm nay: lên tàu buổi tối, ngủ *hai đêm* mới tới Sài Gòn.",
  "05": "Tàu cao tốc nhanh nhất dự kiến chỉ mất khoảng *5,5 tiếng*.",
  "08": "Tuyến dài hơn *1.500 km*.",
  "09": "Theo vốn sơ bộ, mỗi mét đường tốn *hơn 1 tỷ đồng*.",
  "11": "Vì *toàn cầu*.",
  "12": "Khoảng *60%* tuyến dự kiến đi trên cầu.",
  "13": "Thêm khoảng *10%* chui trong hầm.",
  "14": "Để chạy *350 km/h*, phần lớn con đường được nhấc hẳn lên khỏi mặt đất.",
  "15": "Cuối năm *2024*, Quốc hội vẫn bấm nút.",
  "16": "*443/454* đại biểu tán thành.",
  "17": "Nhưng nhiều chuyên gia vẫn hỏi: bao giờ *hoàn vốn*?",
  "18": "Chính phủ thừa nhận, *4 năm đầu*, doanh thu chỉ đủ bù chi phí vận hành.",
  "21": "Trớ trêu là, tuyến Thống Nhất được nối liền từ năm *1936*.",
  "22": "Chuyến đầu tiên chạy hết tuyến, Toàn quyền Đông Dương cùng gia đình ngồi trên tàu khoảng *40 tiếng*.",
  "23": "*90 năm* trôi qua.",
  "24": "Tàu chỉ nhanh hơn *chưa tới 10 tiếng*.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SHUTTER = "shutter/shutter-click-3-494029.mp3";
const TICK = "click/pen-click-411629.mp3";
const raceTicks: SfxCue[] = Array.from({ length: 9 }, (_, i) => [TICK, "20", 0, i * 12, -24]);
const SFX: SfxCue[] = [
  [THUD, "01", 0.12, 0, -18], [CLICK, "02", 0.1],
  [CLICK, "03", 0.3], [CLICK, "04", 0.4], [W2, "05", 0.1], [CLICK, "06", 0.05], [CLICK, "06", 0.55],
  [THUD, "07", 0.12, 0, -18], [CLICK, "08", 0.1], [W, "09", 0, -2], [CLICK, "09", 0.4],
  [CLICK, "10", 0], [CLICK, "11", 0.05], [W2, "12", 0], [CLICK, "13", 0.1], [W, "14", 0.3],
  [W, "15", 0, -4], [SHUTTER, "15", 0.82], [CLICK, "16", 0.05],
  [CLICK, "17", 0.45], [CLICK, "18", 0.2],
  [CLICK, "19", 0.1], ...raceTicks, [THUD, "20", 0.75, 0, -16],
  [SHUTTER, "21", 0.3], [W2, "22", 0.1], [CLICK, "22", 0.45], [CLICK, "23", 0.05], [THUD, "24", 0.55, 0, -18],
];

/** Music duck: the pillar bed dips under the climax so the race clock carries it. */
const musicDuck = (f: number) =>
  interpolate(f, [at("19") - 6, at("19") + 6, at("21") - 4, at("21") + 10], [1, 0.3, 0.3, 1], CLAMP);

export const P2DuongSatCaoToc: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-duong-sat-cao-toc/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2DuongSatCaoTocDuration = (fps: number) => episodeDuration(timing, fps);
