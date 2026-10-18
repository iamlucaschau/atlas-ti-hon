/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Cause-and-Effect (style I Toy Atlas): "Xứ sông nước lại khát cát".
 * Script + sources: kich-ban-p2-cat-mien-tay-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing (at("NN", fraction)). Soft loop: the VO ends on line 23; the
 * picture returns to the opening frame (delta, rivers, nothing else) in the 0.7 s tail.
 *
 * Map rules: the expressway network, the rivers, the "good sand" reaches, the sea-sand mine and every
 * cross-section are ILLUSTRATIVE (Cổng 2 §3.5). No province lines. The dam has no place and no country.
 * Cambodia is coloured (and tagged) only in the lower-Mekong shot where the 5–9× study was measured.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-cat-mien-tay.timing.json";
import words from "../../src/voiceover/p2-cat-mien-tay.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, pop, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, count, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, pts, Pulse, Question,
  RegionFill, routeHead, seamKeys, show, Stamp, toScreen, Track, VnIslands,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p2-cat-mien-tay/cut";
const OLD = { dam: "images/p3-dbscl-sut-lun/cut/d-04-dam.png", dredger: "images/p3-dbscl-sut-lun/cut/d-05-sand-dredger.png", money: "images/p2-duong-sat-cao-toc/cut/p-03-money-bags.png" };
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

const VIEW = {
  delta: { lon: 105.65, lat: 9.85, zoom: 110 },
  mekong: { lon: 105.6, lat: 12.4, zoom: 38 },
  sea: { lon: 106.2, lat: 9.35, zoom: 110 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.delta },
  { at: at("09") - 4, ...VIEW.mekong },
  { at: at("15") - 4, ...VIEW.sea },
  { at: at("18") - 4, ...VIEW.delta },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const FILLS: Fill[] = ["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN }));
const SAND = "#E9C46A";
const RIVER = "#5FA8D3";
const MUD = "#8A5A2E";
const CONCRETE = "#B9BEC2";

// ---- illustrative geography (lon/lat) ----
/** Sông Tiền, sông Hậu (schematic). */
const TIEN: [number, number][] = [[105.22, 10.8], [105.63, 10.45], [106.0, 10.32], [106.36, 10.35], [106.75, 10.05]];
const HAU: [number, number][] = [[105.12, 10.7], [105.43, 10.38], [105.78, 10.04], [106.05, 9.75], [106.3, 9.55]];
/** Schematic Mekong course (as in the P3 episode): Pakse → Kratie → Phnom Penh → delta → mouth. */
const MEKONG: [number, number][] = [[105.8, 15.1], [105.97, 13.52], [106.02, 12.49], [104.92, 11.56], [105.2, 10.8], [105.9, 10.27], [106.6, 9.95]];
/** Open expressway (schematic): TP.HCM → Trung Lương → Mỹ Thuận → Cần Thơ. */
const BUILT: [number, number][] = [[106.66, 10.75], [106.33, 10.42], [105.93, 10.27], [105.75, 10.05]];
/** Planned / under construction (schematic dashed): Châu Đốc–Cần Thơ–Sóc Trăng, Đức Hòa–Mỹ An, Hà Tiên–Rạch Giá–Bạc Liêu. */
const PLANNED: [number, number][][] = [
  [[105.12, 10.7], [105.4, 10.38], [105.7, 10.02], [106.0, 9.55]],
  [[106.42, 10.88], [106.1, 10.72], [105.85, 10.55]],
  [[104.49, 10.38], [105.1, 10.0], [105.45, 9.6], [105.72, 9.29]],
];
const VIADUCT = PLANNED[1];
const PILE: [number, number] = [105.4, 10.38];
const GOOD_SAND: [number, number][] = [[105.15, 10.75], [105.25, 10.68], [105.32, 10.55], [105.5, 10.47], [105.6, 10.43]];
const POOR_SAND: [number, number][] = [[105.95, 10.25], [106.2, 10.1], [105.95, 9.85], [106.15, 9.65]];
const MINE: [number, number] = [106.5, 9.2];
const SHORE: [number, number] = [106.15, 9.52];
const CAMBODIA_BOX: [number, number][] = [[102, 15], [108, 15], [108, 10], [102, 10]];

const pathD = (ps: [number, number][]) => ps.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");

/** "1 · 2 · 3" reason badges (shapes, not text blocks). */
const Badges: React.FC<{ f: number }> = ({ f }) => {
  const o = show(f, at("06", 0.2), at("15"));
  if (o <= 0) return null;
  const active = f >= at("11") ? 2 : f >= at("09") ? 1 : f >= at("07") ? 0 : -1;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {[0, 1, 2].map((i) => (
        <g key={i} style={{ translate: `${150 + i * 96}px 480px`, scale: pop(f, at("06", 0.2) + i * 3) * (i === active ? 1.15 : 0.9) }}>
          <circle r={38} fill={i === active ? ATLAS.gold : "rgba(247,242,232,0.55)"} stroke={ATLAS.ink} strokeWidth={5} />
          <text y={19} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={54} fill={ATLAS.ink}>{i + 1}</text>
        </g>
      ))}
    </svg>
  );
};

/** Riverbed cross-section under the scientists' boat: the sonar reveals a pit more than 8 m deep. */
const SonarCard: React.FC<{ f: number }> = ({ f }) => {
  const a = at("12", 0.2);
  const out = at("13");
  if (f < a - 2 || f > out + 6) return null;
  const o = Math.min(prog(f, a, 6), 1 - prog(f, out, 6));
  const X0 = 140;
  const W = 760;
  const TOP = 860;
  const bed = TOP + 150;
  const depth = 110 * prog(f, at("12", 0.45), 24, Easing.inOut(Easing.quad));
  const cx = X0 + W / 2;
  const sweep = ((f - a) / 30) % 1;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={X0 - 24} y={TOP - 20} width={W + 48} height={320} rx={28} fill="rgba(22,32,40,0.86)" stroke={ATLAS.gold} strokeWidth={5} />
      <clipPath id="sonar-clip"><rect x={X0} y={TOP} width={W} height={280} rx={14} /></clipPath>
      <g clipPath="url(#sonar-clip)">
        <rect x={X0} y={TOP} width={W} height={280} fill="#6FB3D9" />
        <path d={`M ${X0} ${bed} L ${cx - 150} ${bed} C ${cx - 90} ${bed}, ${cx - 70} ${bed + depth}, ${cx} ${bed + depth}
          C ${cx + 70} ${bed + depth}, ${cx + 90} ${bed}, ${cx + 150} ${bed} L ${X0 + W} ${bed} L ${X0 + W} ${TOP + 280} L ${X0} ${TOP + 280} Z`}
          fill={SAND} stroke={ATLAS.ink} strokeWidth={4} />
        {/* sonar pings fanning down from the surface */}
        {[-1, 0, 1].map((k) => (
          <line key={k} x1={cx} y1={TOP + 10} x2={cx + k * 70} y2={TOP + 10 + (bed + depth - TOP) * sweep} stroke={ATLAS.white} strokeWidth={5}
            strokeDasharray="10 10" opacity={1 - sweep} />
        ))}
      </g>
      {/* depth gauge */}
      <line x1={cx + 170} y1={bed} x2={cx + 170} y2={bed + depth} stroke={ATLAS.gold} strokeWidth={9} strokeLinecap="round" opacity={depth > 4 ? 1 : 0} />
    </svg>
  );
};

/** Sand flowing back (short bar) vs sand pumped out (5–9×, long bar). */
const Bars: React.FC<{ f: number }> = ({ f }) => {
  const o = show(f, at("13", 0.15), at("15"));
  if (o <= 0) return null;
  const X = 380;
  const unit = 80;
  const grow = prog(f, at("13", 0.35), 30, Easing.inOut(Easing.quad));
  const row = (y: number, label: string, w: number, color: string) => (
    <g>
      <text x={X - 20} y={y + 17} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.white} stroke={ATLAS.ink}
        strokeWidth={8} paintOrder="stroke">{label}</text>
      <rect x={X} y={y - 26} width={Math.max(6, w)} height={52} rx={14} fill={color} stroke={ATLAS.ink} strokeWidth={5} />
    </g>
  );
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {row(1170, "SÔNG BỒI", unit * prog(f, at("13", 0.2), 10), RIVER)}
      {row(1260, "BỊ HÚT", unit * (1 + 6 * grow), SAND)}
    </svg>
  );
};

/** Coins pour out of the piggy bank, one drips in. */
const Coins: React.FC<{ f: number }> = ({ f }) => {
  const a = at("14", 0.1);
  if (f < a || f > at("15") + 6) return null;
  const o = 1 - prog(f, at("15"), 5);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {Array.from({ length: 8 }, (_, i) => {
        const t = ((f - a) / 14 + i / 8) % 1;
        return <ellipse key={i} cx={640 - 150 * t} cy={760 + 60 * t + 120 * t * t} rx={18} ry={11} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />;
      })}
      {/* the lone coin going in, slowly */}
      <ellipse cx={790} cy={600 + 50 * prog(f, a, 60)} rx={18} ry={11} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} opacity={1 - prog(f, a + 55, 6)} />
    </svg>
  );
};

/** Balance (vector, so it can tilt): viaduct pan vs embankment pan. Both sides drawn the same size. */
const Balance: React.FC<{ f: number }> = ({ f }) => {
  const o = show(f, at("19", 0.05), at("20", 0.95));
  if (o <= 0) return null;
  const tilt = interpolate(f, [at("19", 0.2), at("19", 0.6), at("20", 0.2), at("20", 0.7)], [0, -13, -13, -3], { ...CLAMP, easing: Easing.inOut(Easing.quad) });
  const cx = 540;
  const cy = 700;
  const L = 250;
  const r = (tilt * Math.PI) / 180;
  const ends = [-1, 1].map((s) => [cx + s * L * Math.cos(r), cy + s * L * Math.sin(r)] as const);
  const PAN = 230;
  return (
    <AbsoluteFill style={{ opacity: o, scale: pop(f, at("19", 0.05)) }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <path d={`M ${cx - 90} 1100 L ${cx + 90} 1100 L ${cx + 30} 1070 L ${cx + 14} ${cy} L ${cx - 14} ${cy} L ${cx - 30} 1070 Z`} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={6} />
        <line x1={ends[0][0]} y1={ends[0][1]} x2={ends[1][0]} y2={ends[1][1]} stroke={ATLAS.ink} strokeWidth={22} strokeLinecap="round" />
        <line x1={ends[0][0]} y1={ends[0][1]} x2={ends[1][0]} y2={ends[1][1]} stroke={ATLAS.gold} strokeWidth={12} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={18} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
        {ends.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x - 90} y2={y + 150} stroke={ATLAS.ink} strokeWidth={4} />
            <line x1={x} y1={y} x2={x + 90} y2={y + 150} stroke={ATLAS.ink} strokeWidth={4} />
            <path d={`M ${x - 120} ${y + 150} L ${x + 120} ${y + 150} Q ${x} ${y + 210} ${x - 120} ${y + 150} Z`} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
          </g>
        ))}
      </svg>
      {/* left pan: viaduct + money; right pan: embankment */}
      <Img src={staticFile(`${IMG}/c-08-viaduct.png`)} style={{ position: "absolute", left: ends[0][0] - PAN / 2, top: ends[0][1] + 150 - PAN * 0.7, width: PAN }} />
      <Img src={staticFile(OLD.money)} style={{ position: "absolute", left: ends[0][0] - 50, top: ends[0][1] + 150 - PAN * 0.95, width: 110 }} />
      <Img src={staticFile(`${IMG}/c-03-road-embankment.png`)} style={{ position: "absolute", left: ends[1][0] - PAN / 2, top: ends[1][1] + 150 - PAN * 0.62, width: PAN }} />
    </AbsoluteFill>
  );
};

/** River cross-section: the sand on the bed props up the banks; the bed drops ~2 m and a bank slumps. */
const RiverCard: React.FC<{ f: number }> = ({ f }) => {
  const a = at("21", 0.05);
  if (f < a - 2) return null;
  const shrink = prog(f, at("23", 0.15), 18, Easing.inOut(Easing.quad));
  const o = Math.min(prog(f, a, 6), 1 - prog(f, at("23", 0.45), 8));
  if (o <= 0) return null;
  const X0 = 140;
  const W = 760;
  const TOP = 800;
  const H = 380;
  const drop = 70 * prog(f, at("22", 0.15), 40, Easing.inOut(Easing.quad));
  const slump = prog(f, at("22", 0.55), 26, Easing.in(Easing.quad));
  const sandTop = TOP + 270 + drop;
  const dredge = interpolate(f, [at("22"), at("22", 0.9)], [X0 - 200, X0 + W + 40], CLAMP);
  return (
    <AbsoluteFill style={{ opacity: o, scale: 1 - 0.7 * shrink, translate: `${-120 * shrink}px ${-150 * shrink}px` }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={X0 - 24} y={TOP - 20} width={W + 48} height={H + 40} rx={28} fill="rgba(22,32,40,0.86)" stroke={ATLAS.gold} strokeWidth={5} />
      </svg>
      <div style={{ position: "absolute", left: X0, top: TOP, width: W, height: H, overflow: "hidden", borderRadius: 14, background: "#BFE3F2" }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          <rect x={0} y={150} width={W} height={H} fill="#6FB3D9" />
          {/* the sand layer on the river bed */}
          <rect x={0} y={sandTop - TOP} width={W} height={H} fill={SAND} stroke={ATLAS.ink} strokeWidth={4} />
          {/* old bed level, for comparison */}
          <line x1={0} y1={270} x2={W} y2={270} stroke={ATLAS.white} strokeWidth={4} strokeDasharray="12 8" opacity={drop > 4 ? 1 : 0} />
          {/* left bank (vector) */}
          <path d={`M 0 140 L 170 140 L 230 ${sandTop - TOP} L 0 ${sandTop - TOP} Z`} fill={MUD} stroke={ATLAS.ink} strokeWidth={4} />
          <rect x={0} y={128} width={172} height={16} rx={6} fill="#6F8F4E" stroke={ATLAS.ink} strokeWidth={3} />
          {/* depth gauge on the right */}
          <line x1={W - 40} y1={270} x2={W - 40} y2={270 + drop} stroke={ATLAS.gold} strokeWidth={9} strokeLinecap="round" opacity={drop > 4 ? 1 : 0} />
        </svg>
        {/* right bank: the riverbank cut-out, mirrored so its water side faces the river; it tilts and slides in */}
        <Img src={staticFile(`${IMG}/c-09-riverbank.png`)} style={{
          position: "absolute", left: W - 330, top: 20 + 120 * slump, width: 330, scale: "-1 1",
          rotate: `${-22 * slump}deg`, transformOrigin: "20% 90%",
        }} />
        {/* a dredger crossing the card while the bed drops */}
        {f >= at("22") && f < at("22", 0.95) && (
          <Img src={staticFile(OLD.dredger)} style={{ position: "absolute", left: dredge, top: 88, width: 200 }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [22, 30], [1, 0], CLAMP);

  // everything but the map + rivers fades out for the loop frame
  const endO = 1 - prog(f, at("23", 0.6), 10);
  const roadsO = Math.min(show(f, at("02"), at("09") - 2), endO) + Math.min(show(f, at("18")), endO);
  const tien = pts(cam, TIEN);
  const hau = pts(cam, HAU);
  const river = pts(cam, MEKONG);
  const mekongO = show(f, at("09", 0.2), at("15"));
  const [px, py] = toScreen(cam, ...PILE);
  const cambodiaO = show(f, at("11"), at("15"));
  const tagO = show(f, at("11"), at("12")); // the boat lands on the tags at 12
  const viaduct = pts(cam, VIADUCT);
  const [vx, vy] = routeHead(viaduct, 0.5);
  const [mx, my] = toScreen(cam, ...MINE);
  const [sx, sy] = toScreen(cam, ...SHORE);
  const barge = prog(f, at("16"), at("17", 0.4) - at("16"), Easing.inOut(Easing.quad));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={islandsO} />
      <RegionFill cam={cam} id="kh" country="Cambodia" ring={CAMBODIA_BOX} fill={ATLAS.a} o={0.9 * cambodiaO} dash="1 0" stroke={ATLAS.a} />

      {/* rivers (always: part of the opening / loop frame) + silt grains while the VO runs */}
      <Track ps={tien} p={1} color={RIVER} w={9} />
      <Track ps={hau} p={1} color={RIVER} w={9} />
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, 4, 10), endO) }}>
        {Array.from({ length: 16 }, (_, i) => {
          const [x, y] = routeHead(i % 2 ? tien : hau, ((f / 150) + i / 16) % 1);
          return <circle key={i} cx={x} cy={y} r={5} fill="#C79A55" stroke={ATLAS.ink} strokeWidth={1.5} />;
        })}
      </svg>

      {/* ── 01–04 expressways: the open one, then the dashed ones; sand pile + truck ── */}
      {roadsO > 0 && (
        <>
          <Track ps={pts(cam, BUILT)} p={prog(f, at("02"), 26)} color={ATLAS.white} w={10} o={roadsO} />
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: roadsO }}>
            {PLANNED.map((r, i) => {
              const isViaduct = i === 1 && f >= at("18", 0.2);
              const d = pathD(pts(cam, r));
              return (
                <g key={i} opacity={prog(f, at("03", 0.15) + i * 5, 10)}>
                  <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={isViaduct ? 20 : 15} strokeLinecap="round" strokeDasharray={isViaduct ? undefined : "4 22"} />
                  <path d={d} fill="none" stroke={isViaduct ? CONCRETE : ATLAS.white} strokeWidth={isViaduct ? 12 : 9} strokeLinecap="round"
                    strokeDasharray={isViaduct ? undefined : "4 22"} />
                </g>
              );
            })}
          </svg>
        </>
      )}
      <BigGold text="THIẾU CÁT" f={f} at={at("02", 0.5)} out={at("03")} y={330} size={120} />
      <ImgSticker src={`${IMG}/c-02-sand-pile.png`} x={px} y={py - 40} w={interpolate(f, [at("04", 0.2), at("04", 0.9)], [130, 230], CLAMP)}
        f={f} at={at("02", 0.6)} out={at("07")} />
      <DataCard value={`${count(f, at("03", 0.15), 24, 700)} KM`} label="CÒN PHẢI LÀM" x={540} y={330} f={f} at={at("03", 0.1)} out={at("04", 0.3)} />
      <ImgSticker src={`${IMG}/c-01-dump-truck.png`} x={interpolate(f, [at("04"), at("04", 0.35)], [px - 330, px - 150], { ...CLAMP, easing: Easing.out(Easing.cubic) })}
        y={py - 70} w={240} f={f} at={at("04")} out={at("05")} />
      <BigGold text="100+ TRIỆU M³" f={f} at={at("04", 0.5)} out={at("05", 0.9)} y={330} size={96} />
      <Question x={px + 160} y={py - 60} f={f} at={at("05")} out={at("06", 0.4)} s={1.4} />
      <BigGold text="3 LÝ DO" f={f} at={at("06", 0.1)} out={at("07")} y={330} size={120} />
      <Badges f={f} />

      {/* ── 07–08 reason 1: soft ground — embankment, preload, it settles ── */}
      {f >= at("07") - 2 && f < at("09") + 6 && (() => {
        const o = Math.min(prog(f, at("07", 0.2), 6), 1 - prog(f, at("09"), 6));
        const t = f - at("07", 0.2);
        const jelly = t > 0 ? 0.05 * Math.sin(t / 2.2) * Math.exp(-t / 28) : 0;
        const sink = 46 * prog(f, at("08", 0.45), 50, Easing.inOut(Easing.quad));
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <line x1={180} y1={668} x2={900} y2={668} stroke={ATLAS.white} strokeWidth={5} strokeDasharray="14 10" opacity={prog(f, at("08", 0.3), 6)} />
            </svg>
            <Img src={staticFile(`${IMG}/c-03-road-embankment.png`)} style={{
              position: "absolute", left: 540, top: 640 + sink, width: 640, translate: "-50% 0",
              scale: `${(1 - jelly) * pop(f, at("07", 0.2))} ${(1 + jelly) * pop(f, at("07", 0.2))}`, transformOrigin: "50% 100%",
            }} />
          </AbsoluteFill>
        );
      })()}
      <BigGold text="ĐẤT MỀM" f={f} at={at("07", 0.15)} out={at("09")} y={330} size={120} />

      {/* ── 09–10 reason 2: good sand only upstream; dams hold silt back ── */}
      {mekongO > 0 && (
        <>
          <Track ps={river} p={prog(f, at("09", 0.3), 18)} color={RIVER} w={11} o={mekongO} />
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: mekongO }}>
            {Array.from({ length: 22 }, (_, i) => {
              const p = ((f - at("09")) / 120 + i / 22) % 1;
              if (f >= at("10", 0.15) && i % 3 !== 0 && p > 0.15) return null; // after the dam, few grains get through
              const [x, y] = routeHead(river, p);
              return <circle key={i} cx={x} cy={y} r={8} fill="#C79A55" stroke={ATLAS.ink} strokeWidth={2} />;
            })}
            {GOOD_SAND.map((ll, i) => {
              const [x, y] = toScreen(cam, ...ll);
              return <circle key={`g${i}`} cx={x} cy={y} r={11 * pop(f, at("09", 0.55) + i * 3)} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} opacity={show(f, at("09", 0.55), at("11"))} />;
            })}
            {POOR_SAND.map((ll, i) => {
              const [x, y] = toScreen(cam, ...ll);
              return <circle key={`p${i}`} cx={x} cy={y} r={9 * pop(f, at("09", 0.75) + i * 3)} fill="#8C979B" stroke={ATLAS.ink} strokeWidth={3} opacity={show(f, at("09", 0.75), at("11"))} />;
            })}
          </svg>
        </>
      )}
      <BigGold text="CÁT ĐỦ CHUẨN" f={f} at={at("09", 0.35)} out={at("11")} y={330} size={100} />
      {(() => {
        const [dx, dy] = routeHead(river, 0.14);
        return <ImgSticker src={OLD.dam} x={dx + 150} y={dy} w={220} f={f} at={at("10", 0.1)} out={at("12")} />;
      })()}

      {/* ── 11–14 reason 3: pumped faster than the river refills; [NGƯỜI] the sonar boat ── */}
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={[104.6, 12.9]} from={at("11")} o={tagO} />
      <CountryTag cam={cam} f={f} name="Vietnam" label="VIỆT NAM" flag="vietnam" anchor={[106.7, 11.3]} from={at("11", 0.2)} o={tagO} />
      {(() => {
        const [bx, by] = routeHead(river, 0.42);
        return <ImgSticker src={`${IMG}/c-04-scientists-boat.png`} x={bx + 40} y={by - 70} w={300} f={f} at={at("12")} out={at("13")} />;
      })()}
      <SonarCard f={f} />
      <BigGold text="> 8 MÉT" f={f} at={at("12", 0.6)} out={at("13")} y={330} size={120} />
      {[0.5, 0.64, 0.78].map((p, i) => {
        const [x, y] = routeHead(river, p);
        return <ImgSticker key={i} src={OLD.dredger} x={x + (i % 2 ? 110 : -110)} y={y} w={200} f={f} at={at("13", 0.05) + i * 4} out={at("15")} />;
      })}
      <BigGold text="×5–9" f={f} at={at("13", 0.55)} out={at("15")} y={330} size={140} />
      <Bars f={f} />
      <ImgSticker src={`${IMG}/c-07-piggy-savings.png`} x={760} y={700} w={300} f={f} at={at("14")} out={at("15")} />
      <Coins f={f} />

      {/* ── 15–17 sea sand: yes, but it is salty ── */}
      <Question x={mx - 40} y={my - 150} f={f} at={at("15", 0.3)} out={at("16")} s={1.4} />
      {f >= at("15", 0.5) && f < at("18") + 6 && <Pulse x={mx} y={my} f={f} o={1 - prog(f, at("18"), 5)} />}
      {f >= at("16") && f < at("18") && (
        <ImgSticker src={`${IMG}/c-05-sea-sand-barge.png`} x={mx + (sx - mx) * barge} y={my + (sy - my) * barge - 40} w={240} f={f} at={at("16")} out={at("17", 0.05)} />
      )}
      <Stamp text="CÓ DÙNG" x={560} y={330} f={f} at={at("16", 0.2)} out={at("17")} color={ATLAS.b} />
      <ImgSticker src={`${IMG}/c-06-sand-washing.png`} x={540} y={820} w={380} f={f} at={at("17", 0.15)} out={at("18")} />
      <BigGold text="MẶN" f={f} at={at("17", 0.45)} out={at("18")} y={330} size={140} color={ATLAS.white} />

      {/* ── 18–20 the way out: viaducts — two sides, same card, same size ── */}
      <ImgSticker src={`${IMG}/c-08-viaduct.png`} x={vx + 80} y={vy + 170} w={300} f={f} at={at("18", 0.3)} out={at("19", 0.05)} />
      <BigGold text="CẦU CẠN" f={f} at={at("18", 0.35)} out={at("19")} y={330} size={120} />
      <Balance f={f} />
      <DataCard value="×1,6–1,7" label="LÚC XÂY" x={540} y={330} f={f} at={at("19", 0.45)} out={at("20", 0.15)} />
      <DataCard value="×1,10–1,14" label="CẢ 100 NĂM" x={540} y={330} f={f} at={at("20", 0.3)} out={at("21")} />

      {/* ── 21–23 twist: the river's sand holds its banks up ── */}
      <RiverCard f={f} />
      <BigGold text="2 MÉT" f={f} at={at("22", 0.35)} out={at("23")} y={330} size={130} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "02": "Vậy mà làm cao tốc ở đây, lại *thiếu cát*.",
  "03": "Vùng này còn khoảng *700 km* cao tốc phải làm.",
  "04": "Nếu đắp nền kiểu cũ, cần hơn *100 triệu khối* cát.",
  "06": "*Ba lý do.*",
  "12": "Các nhà khoa học từng thả máy dò xuống đáy sông Mekong, và thấy những hố hút cát sâu hơn *8 mét*.",
  "13": "Họ tính ra, cát bị hút lên nhanh gấp *5–9 lần* lượng sông bồi lại.",
  "16": "*Có dùng rồi.*",
  "18": "Nên giờ có lối khác: đưa cao tốc lên *cầu cạn*, bớt hẳn cát.",
  "19": "Một bên tính lúc xây: cầu cạn đắt gấp *1,6–1,7 lần*.",
  "20": "Bên kia tính cả vòng đời: chỉ đắt hơn khoảng *10–14%*, lại ít lún.",
  "22": "Lòng sông chỉ cần tụt khoảng *2 mét*, nhiều đoạn bờ Mekong đã có thể sụp.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/punch-impact-hit-567196.mp3";
// one real SFX per beat at most (beat-sheet.md)
const SFX: SfxCue[] = [
  [CLICK, "02", 0.5], [CLICK, "03", 0.15], [THUD, "04", 0.5, 0, -18], [CLICK, "05"],
  [CLICK, "07", 0.2], [HIT, "08", 0.45, 0, -20],
  [W, "09", 0, -4], [CLICK, "10", 0.1], [CLICK, "12", 0.6], [THUD, "13", 0.55, 0, -18], [CLICK, "14"],
  [W2, "15", 0, -4], [CLICK, "16", 0.2],
  [W, "18", 0, -4], [CLICK, "19", 0.45], [CLICK, "20", 0.3],
  [HIT, "22", 0.55, 0, -20],
];

/** Music duck for the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("21") - 6, at("21") + 6, at("22", 1) - 4, at("22", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P2CatMienTay: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-cat-mien-tay/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2CatMienTayDuration = (fps: number) => episodeDuration(timing, fps);
