/**
 * Map channel · P4 Tuyến đường & hành trình · Journey Route (style I Toy Atlas), v2:
 * "Lối tắt hơn 300 năm chưa ai đào" (Malacca vs the Kra isthmus).
 * Script + sources: kich-ban-p4-malacca-kra-FINAL.md (v2), cong-2_so-nguon.md, kich-ban-v2-de-xuat.md §D.
 * Beats: beat-sheet.md. v1 code: v1/Video-v1.tsx.txt.
 * Every cue comes from the VO timing. Soft loop (Lucas 2026-10-14): the VO ends on a whole sentence (line 22); the
 * last frame is the opening frame (South-East Asia, map + dotted route), cut right after the last word.
 *
 * Map rules: Vietnam (muted) + Hoàng Sa, Trường Sa whenever the South China Sea is in frame
 * (Lucas 2026-10-13, option A). Ship lane, canal and land-bridge rail are SCHEMATIC.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p4-malacca-kra.timing.json";
import words from "../../src/voiceover/p4-malacca-kra.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse, Question, Route, routeHead, seamKeys, show, Stamp, Sticker, toScreen, Track, vertexP, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p4-malacca-kra/cut";
const BAGS = "images/p2-duong-sat-cao-toc/cut/p-03-money-bags.png";
const CRANE = "images/i-singapore/cut/i-10-port-crane.png";
const { at } = beats(timing, FPS);

const VIEW = {
  sea: { lon: 104.5, lat: 8, zoom: 11 },
  route: { lon: 88, lat: 14, zoom: 4.4 },
  strait: { lon: 101.8, lat: 3.2, zoom: 45 },
  narrow: { lon: 103.82, lat: 1.22, zoom: 300 },
  kra: { lon: 99.0, lat: 10.1, zoom: 120 },
  singapore: { lon: 103.8, lat: 1.32, zoom: 120 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.sea },
  { at: at("03") - 4, ...VIEW.route },
  { at: at("05") - 4, ...VIEW.strait },
  { at: at("06") - 2, ...VIEW.narrow },
  { at: at("08") - 4, ...VIEW.kra },
  { at: at("09") - 4, ...VIEW.sea },
  { at: at("10") - 4, ...VIEW.kra },
  { at: at("13") - 4, ...VIEW.sea },
  { at: at("17") - 4, ...VIEW.kra },
  { at: at("20") - 4, ...VIEW.singapore },
  { at: at("22") - 4, ...VIEW.sea },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const END = episodeDuration(timing, FPS);
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP); // loop seam: last frame = opening frame

const THAI = ATLAS.d;
const SING = ATLAS.a;
const VN_MUTED = "#E59A84";
const FILLS: Fill[] = [
  { name: "Thailand", color: THAI },
  { name: "Singapore", color: SING },
  ...["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN_MUTED })),
];

/** Schematic tanker lane: Hormuz → Arabian Sea → south of Sri Lanka → Malacca → Singapore → South China Sea → East Asia. */
const LANE: [number, number][] = [
  [56.4, 26.3], [58.6, 23.5], [62, 18], [72, 10], [80.6, 5.4], [88, 5.8], [94.5, 6.3], [97.5, 5.6], [99.6, 3.8],
  [101.3, 2.4], [102.9, 1.3], [103.85, 1.18], [104.6, 1.6], [106, 4], [109.5, 9.5], [111.5, 13], [115, 18.5], [119.5, 22],
];
const I_MALACCA = 7; // lane vertex where the strait begins
const I_PHILLIPS = 11;
/** Schematic shortcut through the narrowest part of the Kra isthmus (Ranong → Chumphon). */
const SHORTCUT: [number, number][] = [
  [94.5, 6.3], [97.5, 9.2], [98.55, 9.97], [99.2, 10.45], [100.8, 10.0], [104.5, 8.0], [107, 8.5], [109.5, 9.5],
];
const BANGKOK: [number, number] = [100.5, 13.75];
const RANONG: [number, number] = [98.6, 9.97];
const CHUMPHON: [number, number] = [99.18, 10.48];
const SINGAPORE: [number, number] = [103.82, 1.3];

/** Ships sailing along a lane between fractions a..b, spaced out, looping. */
const Fleet: React.FC<{ ps: [number, number][]; a: number; b: number; n: number; f: number; at: number; out: number; speed: number; w: number }> = ({
  ps, a, b, n, f, at: start, out, speed, w,
}) => {
  if (f < start || f > out + 6) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const t = (((f - start) * speed) / (b - a) + i / n) % 1;
        const [x, y] = routeHead(ps, a + (b - a) * t);
        return (
          <ImgSticker key={i} src={`${IMG}/${i % 3 === 1 ? "t-02-container-ship" : "t-01-tanker"}.png`} x={x} y={y - w * 0.18} w={w} f={f}
            at={start + i * 2} out={out} />
        );
      })}
    </>
  );
};

/** Double-headed measuring arrow between two screen points. */
const Measure: React.FC<{ a: [number, number]; b: [number, number]; o: number; p: number }> = ({ a, b, o, p }) => {
  const mx = a[0] + (b[0] - a[0]) * p;
  const my = a[1] + (b[1] - a[1]) * p;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <line x1={a[0]} y1={a[1]} x2={mx} y2={my} stroke={ATLAS.ink} strokeWidth={14} strokeLinecap="round" />
      <line x1={a[0]} y1={a[1]} x2={mx} y2={my} stroke={ATLAS.gold} strokeWidth={7} strokeLinecap="round" />
      <circle cx={a[0]} cy={a[1]} r={12} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={4} />
      {p >= 1 && <circle cx={b[0]} cy={b[1]} r={12} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={4} />}
    </svg>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [14, 20], [1, 0], CLAMP);
  const lane = pts(cam, LANE);
  const short = pts(cam, SHORTCUT);
  const pMal = vertexP(lane, I_MALACCA);
  const pPhil = vertexP(lane, I_PHILLIPS);
  const [rx, ry] = toScreen(cam, ...RANONG);
  const [cx, cy] = toScreen(cam, ...CHUMPHON);
  const [sx, sy] = toScreen(cam, ...SINGAPORE);
  const [bx, by] = toScreen(cam, ...BANGKOK);

  // the shortcut: teased in the hook, drawn in 09, gone for the loop frame
  const shortO = Math.max(show(f, at("02", 0.2), at("03") - 4) * (0.55 + 0.45 * Math.sin(f / 4)), Math.min(prog(f, at("09", 0.1), 8), 1 - prog(f, at("10") - 4, 4)));
  const shortP = Math.max(show(f, at("02", 0.2), at("03") - 4), prog(f, at("09", 0.15), 40));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} />
      <VnIslands cam={cam} f={f} color={VN_MUTED} o={islandsO} labels={f < at("15") || f >= at("17")} />

      {/* the lane, always (dotted) */}
      <Route pts={lane} p={1} />

      {/* country name + flag where the VO names them; outline flashes on the spoken name */}
      <CountryTag cam={cam} f={f} name="Singapore" label="SINGAPORE" flag="singapore" anchor={[103.82, 1.36]} from={at("06", 0.3)}
        o={Math.max(show(f, at("06", 0.3), at("08") - 4), show(f, at("09", 0.6), at("10") - 4), show(f, at("22", 0.6), END - 8))}
        glow={[at("06", 0.35), at("09", 0.75), at("20", 0.8), at("22", 0.8)]} />
      <CountryTag cam={cam} f={f} name="Thailand" label="THÁI LAN" flag="thailand" anchor={[99.05, 10.75]} from={at("08", 0.45)}
        o={Math.max(show(f, at("08", 0.45), at("12")), show(f, at("17", 0.2), at("18")))}
        glow={[at("08", 0.5), at("17", 0.3)]} />

      {/* ── 01–02 hook ── */}
      <Fleet ps={lane} a={pMal - 0.04} b={pPhil + 0.02} n={6} f={f} at={at("01", 0.05)} out={at("03") - 6} speed={0.0012} w={90} />
      <DataCard value="~1/3" label="DẦU ĐI BIỂN" x={540} y={330} f={f} at={at("01", 0.3)} out={at("02", 0.2)} />
      {shortO > 0 && <Track ps={short} p={shortP} color={ATLAS.gold} w={8} o={shortO} />}
      <BigGold text="LỐI TẮT?" f={f} at={at("02", 0.3)} out={at("03") - 4} y={330} size={110} />
      <Question x={toScreen(cam, 99, 10.3)[0] + 90} y={toScreen(cam, 99, 10.3)[1] - 80} f={f} at={at("02", 0.4)} out={at("03") - 4} />

      {/* ── 03–04 the journey: Gulf → Malacca → East Asia ── */}
      {f >= at("03") && f < at("05") - 2 && (() => {
        const p = prog(f, at("03", 0.2), at("04", 0.95) - at("03", 0.2), Easing.inOut(Easing.quad));
        const [x, y] = routeHead(lane, p);
        const [mx, my] = routeHead(lane, pMal + 0.02);
        return (
          <>
            <Track ps={lane} p={p} color={ATLAS.white} w={6} o={1 - prog(f, at("05") - 6, 4)} />
            <ImgSticker src={`${IMG}/t-01-tanker.png`} x={x} y={y - 22} w={130} f={f} at={at("03", 0.15)} out={at("05") - 6} />
            <MapLabel text="MALACCA" x={mx - 150} y={my + 70} o={show(f, at("04", 0.3), at("05") - 6)} />
          </>
        );
      })()}

      {/* ── 05–07 the strait: the queue, the narrowest point, the traffic jam ── */}
      <Fleet ps={lane} a={pMal - 0.02} b={pPhil + 0.03} n={12} f={f} at={at("05")} out={at("06") - 2} speed={0.00045} w={120} />
      <DataCard value="100.000+" label="LƯỢT TÀU" x={540} y={330} f={f} at={at("05", 0.35)} out={at("06") - 2} />
      {f >= at("06") && f < at("08") - 2 && (() => {
        const a = toScreen(cam, 103.79, 1.245);
        const b = toScreen(cam, 103.79, 1.175);
        const o = 1 - prog(f, at("08") - 6, 4);
        const jam = prog(f, at("07"), 6);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <Measure a={a} b={b} o={1 - jam} p={prog(f, at("06", 0.3), 14)} />
            {/* [ĐÙA] bumper to bumper: ships close up, tail lights blink one after another, one creeps forward and stops */}
            {[-2, -1, 0, 1, 2].map((k) => {
              const creep = k === 0 ? 0.0008 * prog(f, at("07", 0.45), 10, Easing.out(Easing.quad)) : 0;
              const [x, y] = routeHead(lane, pPhil + k * (0.0024 - 0.0007 * jam) + creep);
              const w = 150;
              const lit = jam > 0 && Math.floor((f - at("07")) / 4) % 5 === k + 2;
              return (
                <AbsoluteFill key={k}>
                  <ImgSticker src={`${IMG}/${k % 2 ? "t-02-container-ship" : "t-01-tanker"}.png`} x={x} y={y - w * 0.18} w={w} f={f} at={at("06") + (k + 2) * 2} />
                  {jam > 0 && (
                    <svg width={1080} height={1920} style={{ position: "absolute" }}>
                      <circle cx={x - w * 0.46} cy={y - w * 0.16} r={lit ? 13 : 8} fill={lit ? "#FF3B30" : "#7A1F1A"} stroke={ATLAS.ink} strokeWidth={3} opacity={jam} />
                    </svg>
                  )}
                </AbsoluteFill>
              );
            })}
          </AbsoluteFill>
        );
      })()}
      <DataCard value="~2–3 KM" label="CHỖ HẸP NHẤT" x={540} y={330} f={f} at={at("06", 0.45)} out={at("07") - 2} />

      {/* ── 08 the isthmus ── */}
      {f >= at("08") && f < at("09") - 2 && (
        <Measure a={[rx, ry]} b={[cx, cy]} o={1 - prog(f, at("09") - 6, 4)} p={prog(f, at("08", 0.4), 16)} />
      )}
      <DataCard value="~40 KM" label="EO ĐẤT KRA" x={540} y={330} f={f} at={at("08", 0.55)} out={at("09") - 4} />

      {/* ── 09 dig here: the shortcut vs the long way round ── */}
      {f >= at("09") && f < at("10") - 2 && (() => {
        const p = prog(f, at("09", 0.15), 40);
        const [ax, ay] = routeHead(short, p);
        const q = pMal + (vertexP(lane, 14) - pMal) * prog(f, at("09", 0.15), 40);
        const [lx, ly] = routeHead(lane, q);
        const [kx, ky] = toScreen(cam, 99.2, 10.6);
        return (
          <>
            <ImgSticker src={`${IMG}/t-07-excavator-canal.png`} x={kx - 120} y={ky - 150 - 6 * Math.abs(Math.sin((f - at("09")) / 6))} w={190} f={f} at={at("09", 0.05)} out={at("10") - 4} />
            <ImgSticker src={`${IMG}/t-01-tanker.png`} x={ax} y={ay - 18} w={100} f={f} at={at("09", 0.1)} out={at("10") - 4} />
            <ImgSticker src={`${IMG}/t-01-tanker.png`} x={lx} y={ly - 18} w={100} f={f} at={at("09", 0.1)} out={at("10") - 4} />
          </>
        );
      })()}

      {/* ── 10–12 the people: King Narai, the 1883 survey team, no permit ── */}
      <YearRibbon text="THẾ KỶ 17" f={f} at={at("10", 0.2)} out={at("11")} />
      <PegImg src={`${IMG}/t-03-king-narai.png`} x={rx - 170} y={ry + 330} h={330} f={f} at={at("10", 0.25)} o={1 - prog(f, at("11"), 4)} />
      <YearRibbon text="1883" f={f} at={at("11", 0.05)} out={at("12")} />
      {f >= at("11") && f < at("13") - 2 && (() => {
        const o = 1 - prog(f, at("13") - 6, 4);
        const walk = prog(f, at("11", 0.05), 30, Easing.out(Easing.quad));
        const survey = prog(f, at("11", 0.45), 30);
        const fade = 1 - 0.6 * prog(f, at("12", 0.3), 8);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <svg width={1080} height={1920} style={{ position: "absolute", opacity: fade }}>
              {/* survey line across the isthmus */}
              <line x1={rx} y1={ry} x2={rx + (cx - rx) * survey} y2={ry + (cy - ry) * survey} stroke={ATLAS.red} strokeWidth={7} strokeDasharray="18 12" strokeLinecap="round" />
              {survey > 0 && <circle cx={rx} cy={ry} r={11} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={4} />}
              {survey >= 1 && <circle cx={cx} cy={cy} r={11} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={4} />}
            </svg>
            <AbsoluteFill style={{ opacity: fade }}>
              <PegImg src={`${IMG}/t-08-engineers-1883.png`} x={interpolate(walk, [0, 1], [rx - 260, rx - 40])} y={ry + 380} h={300} f={f} at={at("11", 0.05)} />
              <ImgSticker src={`${IMG}/t-04-old-map.png`} x={cx + 130} y={cy + 230} w={240} f={f} at={at("11", 0.6)} />
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })()}
      <Stamp text="KHÔNG CẤP PHÉP" x={510} y={560} f={f} at={at("12", 0.25)} out={at("13") - 4} />

      {/* ── 13–16 why not yet? hard to profit: tens of billions vs 1–3 days ── */}
      <Question x={540} y={640} f={f} at={at("13", 0.1)} out={at("14", 0.1)} s={1.8} />
      <BigGold text="KHÓ CÓ LỜI" f={f} at={at("14", 0.05)} out={at("17") - 4} y={330} size={110} />
      {f >= at("15") && f < at("17") - 2 && (() => {
        const o = 1 - prog(f, at("17") - 6, 4);
        // the scale: money (left) vs days (right); tips hard to the money once the days land
        const tilt = 8 * prog(f, at("15", 0.2), 8) + 10 * prog(f, at("16", 0.4), 10, Easing.out(Easing.back(2)));
        const t = (tilt * Math.PI) / 180;
        const [px, py] = [540, 900];
        const arm = 240;
        const L = [px - arm * Math.cos(t), py + arm * Math.sin(t)];
        const R = [px + arm * Math.cos(t), py - arm * Math.sin(t)];
        const drop = prog(f, at("15", 0.05), 8, Easing.in(Easing.quad));
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <path d={`M ${px} ${py} L ${px - 60} ${py + 230} L ${px + 60} ${py + 230} Z`} fill="#B9874F" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
              <line x1={L[0]} y1={L[1]} x2={R[0]} y2={R[1]} stroke={ATLAS.ink} strokeWidth={16} strokeLinecap="round" />
              <line x1={L[0]} y1={L[1]} x2={R[0]} y2={R[1]} stroke="#D9A85B" strokeWidth={8} strokeLinecap="round" />
              <circle cx={px} cy={py} r={16} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
            </svg>
            <ImgSticker src={BAGS} x={L[0]} y={L[1] - 90 - 60 * (1 - drop)} w={230} f={f} at={at("15", 0.05)} />
            {f >= at("16") && (
              <Sticker x={R[0]} y={R[1] - 70} f={f} at={at("16", 0.1)} s={1.1}>
                {/* calendar: 1–3 days */}
                <rect x={-70} y={-60} width={140} height={130} rx={14} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
                <rect x={-70} y={-60} width={140} height={36} rx={14} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={6} />
                {[-36, 0, 36].map((x, i) => (
                  <rect key={i} x={x - 12} y={-6 + (i % 2) * 34} width={24} height={24} rx={4} fill={i <= Math.floor(((f - at("16")) / 10) % 3) ? ATLAS.gold : "#DDD"}
                    stroke={ATLAS.ink} strokeWidth={3} />
                ))}
              </Sticker>
            )}
          </AbsoluteFill>
        );
      })()}
      <DataCard value="1–3 NGÀY" x={700} y={1240} f={f} at={at("16", 0.3)} out={at("17") - 4} size={72} />

      {/* ── 17–19 the 2023 land bridge; two sides ── */}
      <YearRibbon text="2023" f={f} at={at("17", 0.15)} out={at("18")} />
      {f >= at("17") && f < at("20") - 2 && (() => {
        const o = 1 - prog(f, at("20") - 6, 4);
        const rail = prog(f, at("17", 0.45), 20);
        const p = prog(f, at("17", 0.65), 40, Easing.inOut(Easing.quad));
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <ImgSticker src={CRANE} x={rx - 90} y={ry - 30} w={170} f={f} at={at("17", 0.25)} out={at("18")} />
            <ImgSticker src={CRANE} x={cx + 90} y={cy - 30} w={170} f={f} at={at("17", 0.35)} out={at("18")} />
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              {/* rail across the isthmus (schematic) */}
              <line x1={rx} y1={ry} x2={rx + (cx - rx) * rail} y2={ry + (cy - ry) * rail} stroke={ATLAS.ink} strokeWidth={16} strokeLinecap="round" />
              <line x1={rx} y1={ry} x2={rx + (cx - rx) * rail} y2={ry + (cy - ry) * rail} stroke="#B9C3C2" strokeWidth={6} strokeDasharray="14 10" />
            </svg>
            {p > 0 && <ImgSticker src={`${IMG}/t-06-freight-train.png`} x={rx + (cx - rx) * p} y={ry + (cy - ry) * p - 26} w={240} f={f} at={at("17", 0.65)} />}
          </AbsoluteFill>
        );
      })()}
      {/* [PHE 1] the government (Bangkok side) */}
      {f >= at("18") && f < at("20") - 2 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("20") - 6, 4) }}>
          <ImgSticker src={`${IMG}/t-11-gov-building.png`} x={Math.max(240, Math.min(bx, 760))} y={Math.max(560, by - 40)} w={260} f={f} at={at("18", 0.05)} />
        </AbsoluteFill>
      )}
      <BigGold text="ĐÁNG ĐẦU TƯ" f={f} at={at("18", 0.15)} out={at("19")} y={330} size={100} color={ATLAS.white} />
      {/* [PHE 2] residents of Ranong / Chumphon: the sea, the orchards */}
      {f >= at("19") && f < at("20") - 2 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("20") - 6, 4) }}>
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            {[0, 1].map((i) => (
              <path key={i} d={`M ${rx - 200} ${ry + 60 + i * 30} q 30 ${-16 + 6 * Math.sin(f / 7 + i)} 60 0 t 60 0 t 60 0 t 60 0`} fill="none" stroke={ATLAS.white}
                strokeWidth={6} strokeLinecap="round" opacity={0.8 * prog(f, at("19", 0.3), 8)} />
            ))}
          </svg>
          <PegImg src={`${IMG}/t-09-villagers-protest.png`} x={330} y={1260} h={300} f={f} at={at("19", 0.05)} />
          <ImgSticker src={`${IMG}/t-10-durian.png`} x={740} y={1150 + 8 * Math.sin(f / 9)} w={190} f={f} at={at("19", 0.45)} />
        </AbsoluteFill>
      )}
      <BigGold text="LO MẤT BIỂN" f={f} at={at("19", 0.2)} out={at("20") - 4} y={330} size={100} />

      {/* ── 20–21 twist: everyone still calls at Singapore ── */}
      {f >= at("20") - 4 && f < at("22") - 2 && (() => {
        const o = 1 - prog(f, at("22") - 6, 4);
        const items: [string, number, number, number, number][] = [
          [CRANE, -230, -170, 220, at("20", 0.4)], [`${IMG}/t-02-container-ship.png`, 170, -230, 260, at("21", 0.05)], [`${IMG}/t-05-fuel.png`, -250, 190, 170, at("21", 0.35)],
        ];
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <Pulse x={sx} y={sy} f={f} color={ATLAS.gold} />
            {/* ships from every side turning into the port */}
            {[0, 1, 2].map((i) => {
              const t = prog(f, at("20", 0.15) + i * 8, 40, Easing.out(Easing.quad));
              const from = [[100, sy + 420], [980, sy + 420], [980, sy - 380]][i];
              const to = [[sx - 120, sy + 120], [sx + 120, sy + 120], [sx + 140, sy - 60]][i];
              return (
                <ImgSticker key={i} src={`${IMG}/${i === 1 ? "t-01-tanker" : "t-02-container-ship"}.png`} x={interpolate(t, [0, 1], [from[0], to[0]])}
                  y={interpolate(t, [0, 1], [from[1], to[1]])} w={190} f={f} at={at("20", 0.15) + i * 8} />
              );
            })}
            {items.map(([src, dx, dy, w, start], i) => (
              <ImgSticker key={i} src={src} x={sx + dx} y={sy + dy} w={w} f={f} at={start} />
            ))}
            <Sticker x={sx + 230} y={sy + 190} f={f} at={at("21", 0.65)} s={1.4}>
              {/* wrench: repairs */}
              <g style={{ rotate: "-35deg" }}>
                <rect x={-12} y={-40} width={24} height={90} rx={10} fill="#B9C3C2" stroke={ATLAS.ink} strokeWidth={5} />
                <path d="M -30 -60 A 30 30 0 1 0 30 -60 L 14 -60 L 14 -40 L -14 -40 L -14 -60 Z" fill="#B9C3C2" stroke={ATLAS.ink} strokeWidth={5} />
              </g>
            </Sticker>
          </AbsoluteFill>
        );
      })()}
      <BigGold text="SINGAPORE" f={f} at={at("20", 0.2)} out={at("22") - 4} y={330} size={120} color={ATLAS.white} />

      {/* ── 22 back to the opening frame: the lane lights up into Singapore, then clears for the loop ── */}
      {f >= at("22") && f < END && (
        <>
          <Track ps={lane} p={vertexP(lane, I_PHILLIPS + 1)} color={ATLAS.gold} w={7} o={show(f, at("22", 0.3), END - 4)} />
          <Pulse x={sx} y={sy} f={f} color={ATLAS.gold} o={show(f, at("22", 0.4), END - 4)} />
        </>
      )}
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Gần *1/3* lượng dầu chở bằng đường biển của thế giới phải chen qua một eo biển.",
  "02": "Ngay phía trên có một *lối tắt*, mà hơn *300 năm* nay chưa ai đào.",
  "05": "Năm ngoái, hơn *100.000* lượt tàu chen qua đây.",
  "06": "Chỗ hẹp nhất, gần Singapore, chỉ rộng khoảng *2, 3 km*.",
  "08": "Trong khi đó, eo đất Kra của Thái Lan chỉ rộng hơn *40 km*.",
  "10": "Ý tưởng này có từ thời vua Narai, *thế kỷ 17*.",
  "11": "Năm *1883*, một đoàn kỹ sư Pháp nhân danh công ty *kênh Suez* tới tận nơi đo đạc.",
  "14": "Vì *khó có lời*.",
  "15": "Tốn *hàng chục tỷ đô*.",
  "16": "Mà tàu chỉ về sớm được *1–3 ngày*.",
  "17": "Năm *2023*, Thái Lan đổi cách: không đào kênh, mà nối hai cảng bằng *đường sắt*.",
  "20": "Nhưng lý do thật có lẽ nằm ở đây: phần lớn tàu vẫn phải ghé *Singapore*.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SFX: SfxCue[] = [
  [CLICK, "01", 0.3], [CLICK, "02", 0.3],
  [W, "03", 0, -4], [W2, "05", 0, -4], [CLICK, "05", 0.35], [W, "06", 0, -2], [CLICK, "06", 0.45],
  [W2, "08", 0, -4], [CLICK, "08", 0.55], [W, "09", 0, -4], [W2, "10", 0, -4], [CLICK, "10", 0.2], [CLICK, "11", 0.05],
  [THUD, "12", 0.25, 0, -18], [W, "13", 0, -4], [CLICK, "14", 0.05], [THUD, "15", 0.12, 0, -18], [CLICK, "16", 0.3],
  [W2, "17", 0, -4], [CLICK, "17", 0.15], [CLICK, "18", 0.15], [W, "20", 0, -4], [CLICK, "21", 0.05], [CLICK, "21", 0.35], [CLICK, "21", 0.65], [W2, "22", 0, -4],
];

export const P4MalaccaKra: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p4-malacca-kra/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P4} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p4MalaccaKraDuration = (fps: number) => episodeDuration(timing, fps);
