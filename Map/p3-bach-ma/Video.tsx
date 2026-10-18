/**
 * Atlas Tí Hon · P3 Địa lý giải thích hiện tượng · Cause-and-Effect (style I Toy Atlas):
 * "Bức tường Bạch Mã: chặn rét cho miền Nam, trút mưa xuống miền Trung".
 * Script + sources: kich-ban-p3-bach-ma-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 24; the last frame is the opening
 * frame (whole-Vietnam view, nothing else).
 *
 * Map (Cổng 2, Lucas 2026-10-19): the "wall" is the real Huế | Đà Nẵng border from the OCHA/HDX provinces
 * (vn-provinces.tsx, provinceBorder). Wind arrows, clouds, rain, the two climate halves and the north–south
 * road are ILLUSTRATIVE. Temperatures are monthly means (no records, §3.1).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p3-bach-ma.timing.json";
import words from "../../src/voiceover/p3-bach-ma.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, DataCard, type Fill, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse, Question, RegionFill, Route,
  routeHead, seamKeys, show, Sticker, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { BorderLine, CityPin, flashAt, provinceBorder, ProvinceMap, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p3-bach-ma/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

const VIEW = {
  vn: { lon: 109.8, lat: 14.8, zoom: 19 },
  haivan: { lon: 107.85, lat: 16.12, zoom: 260 },
  mientrung: { lon: 107.6, lat: 16.3, zoom: 70 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  { at: at("06") - 4, ...VIEW.haivan },
  { at: at("10") - 4, ...VIEW.vn },
  { at: at("16") - 4, ...VIEW.mientrung },
  { at: at("22") - 4, ...VIEW.vn },
  { at: at("23") - 4, ...VIEW.haivan },
  { at: at("24", 0.5), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const FILLS: Fill[] = ["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN }));
const COLD = "#BFE3F2";
const WARM = "#F6D98A";
const WIND = "#3D8FD0";
const CLOUD = "#8E979C";
const RAIN = "#7EC8F0";
const RAIN_BAND = "#5B8FD9";

/** The Bạch Mã ridge = the Huế | Đà Nẵng border (OCHA/HDX), west → east to the Hải Vân pass. */
const WALL = provinceBorder("Huế", "Đà Nẵng");
const WALL_W = WALL.ll[0];
const WALL_E = WALL.ll[WALL.ll.length - 1];
/** Two illustrative climate halves cut along the wall (RegionFill clips them to Vietnam's land). */
const NORTH: [number, number][] = [[101.5, WALL_W[1]], ...WALL.ll, [111, WALL_E[1]], [111, 24], [101.5, 24]];
const SOUTH: [number, number][] = [[101.5, WALL_W[1]], ...WALL.ll, [111, WALL_E[1]], [111, 8], [101.5, 8]];
/** Coastal provinces of the central rains (lines 17–21). */
const RAIN_PROVINCES = ["Quảng Trị", "Huế", "Đà Nẵng", "Quảng Ngãi"];
const RAIN_SET = VN2025.filter((p) => RAIN_PROVINCES.includes(p.name));

const HA_NOI: [number, number] = [105.85, 21.03];
const SAI_GON: [number, number] = [106.7, 10.78];
const HUE: [number, number] = [107.59, 16.46];
const DA_NANG: [number, number] = [108.22, 16.05];
const HAI_VAN: [number, number] = [108.13, 16.19];
const BACH_MA: [number, number] = [107.85, 16.2];
/** Three northeast-monsoon arrows from southern China down to the wall (schematic). */
const WINDS: [number, number][][] = [
  [[105.6, 23.3], [105.9, 21.0], [106.6, 18.6], [107.4, WALL_W[1] + 0.25]],
  [[107.4, 23.4], [107.2, 21.2], [107.4, 18.8], [107.8, 16.5]],
  [[109.3, 23.0], [108.8, 20.6], [108.3, 18.2], [108.05, 16.45]],
];
/** Clouds along the central coast (lines 17–21). */
const CLOUDS: [number, number][] = [[106.85, 17.15], [107.6, 16.6], [108.4, 15.6]];

/** A tapering arrow along screen points: drawn on with p, fading toward its head (the wind weakens). */
const WindArrow: React.FC<{ ps: [number, number][]; p: number; id: string; o?: number }> = ({ ps, p, id, o = 1 }) => {
  if (p <= 0 || o <= 0) return null;
  const d = ps.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  const [hx, hy] = routeHead(ps, p);
  const [bx, by] = routeHead(ps, Math.max(0, p - 0.04));
  const ang = (Math.atan2(hy - by, hx - bx) * 180) / Math.PI;
  const [x0, y0] = ps[0];
  const [x1, y1] = ps[ps.length - 1];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={x0} y1={y0} x2={x1} y2={y1}>
          <stop offset="0%" stopColor={WIND} stopOpacity={1} />
          <stop offset="100%" stopColor={WIND} stopOpacity={0.25} />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={ATLAS.white} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} opacity={0.6} />
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" pathLength={1}
        style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} />
      <path d="M 14 0 L -14 -16 L -14 16 Z" fill={WIND} stroke={ATLAS.white} strokeWidth={4} strokeLinejoin="round" opacity={0.4 + 0.6 * (1 - p)}
        style={{ translate: `${hx}px ${hy}px`, rotate: `${ang}deg` }} />
    </svg>
  );
};

/** A grey cloud with falling rain (rain 0–1 = density). */
const RainCloud: React.FC<{ x: number; y: number; f: number; s?: number; rain?: number; o?: number }> = ({ x, y, f, s = 1, rain = 1, o = 1 }) => {
  if (o <= 0) return null;
  const drops = Math.round(6 + 10 * rain);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x + 6 * Math.sin(f / 30 + x)}px ${y}px`, scale: s }}>
        {Array.from({ length: drops }, (_, i) => {
          const t = ((f / 12 + (i * 0.37) % 1) % 1);
          const dx = -70 + ((i * 53) % 140);
          return <line key={i} x1={dx} y1={30 + 110 * t} x2={dx - 8} y2={54 + 110 * t} stroke={RAIN} strokeWidth={6} strokeLinecap="round" opacity={1 - t} />;
        })}
        <g fill={CLOUD} stroke={ATLAS.ink} strokeWidth={4}>
          <circle cx={-46} cy={0} r={34} /><circle cx={0} cy={-22} r={44} /><circle cx={48} cy={0} r={34} />
          <rect x={-80} y={0} width={160} height={32} rx={16} />
        </g>
      </g>
    </svg>
  );
};

/** Sun icon centred on (x, y). */
const Sun: React.FC<{ x: number; y: number; f: number; at: number; out?: number }> = ({ x, y, f, at: a, out }) => (
  <Sticker x={x} y={y} f={f} at={a} out={out} s={1.1}>
    <g style={{ rotate: `${f}deg` }}>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={0} y1={-44} x2={0} y2={-62} stroke={ATLAS.gold} strokeWidth={8} strokeLinecap="round" style={{ rotate: `${i * 45}deg` }} />
      ))}
    </g>
    <circle r={34} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
  </Sticker>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: [number, number]) => toScreen(cam, ...ll);

  // the wall: hinted in 03, drawn in 05, flashes when named; dimmer between, bright at the twist, gone for the loop frame
  const wallP = Math.max(0.25 * prog(f, at("03", 0.3), 10), prog(f, at("05"), 18));
  const wallO = 1 - prog(f, at("24", 0.75), 10);
  const wallGlow = Math.max(flashAt(f, [at("05"), at("12", 0.3), at("23", 0.6), at("24", 0.1)]), show(f, at("06"), at("10")) * 0.3);
  // climate halves (13–15)
  const coldO = Math.min(prog(f, at("13"), 14), 1 - prog(f, at("16"), 10)) * 0.6;
  const warmO = Math.min(prog(f, at("14"), 14), 1 - prog(f, at("16"), 10)) * 0.6;
  // central rains (17–21)
  const rainBandO = Math.min(prog(f, at("17", 0.3), 14), 1 - prog(f, at("22"), 8));
  const rain = Math.min(prog(f, at("17", 0.4), 20), 1 - prog(f, at("22"), 8));
  const cloudDense = 0.6 + 0.4 * prog(f, at("18"), 20);

  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={RAIN_SET} tag="rain" base={RAIN_BAND} lines={0.4} o={rainBandO} f={f} />
      <BorderLine z={z} d={WALL.d} p={wallP} glow={wallGlow} o={wallO} />
    </>
  );

  const [wx, wy] = S(BACH_MA);
  const hv = S(HAI_VAN);
  const hn = S(HA_NOI);
  const sg = S(SAI_GON);
  const hue = S(HUE);

  // 19–20: Huế October vs Hà Nội whole year (mm), bars in the rows zone
  const barO = Math.min(prog(f, at("19", 0.2), 8), 1 - prog(f, at("21"), 6));
  const hueH = 300 * (772.7 / 1616.4) * prog(f, at("19", 0.3), 20);
  const hnH = 300 * prog(f, at("20", 0.15), 20);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [22, 30], [1, 0], CLAMP)} />
      <RegionFill cam={cam} id="cold" country="Vietnam" ring={NORTH} fill={COLD} o={coldO} dash="1 0" />
      <RegionFill cam={cam} id="warm" country="Vietnam" ring={SOUTH} fill={WARM} o={warmO} dash="1 0" />

      {/* ── 01–05 hook: 16 °C ↔ > 25 °C (monthly means), "Dãy nào? Bạch Mã." ── */}
      <CityPin cam={cam} f={f} label="HÀ NỘI" at={HA_NOI} from={at("01", 0.1)} o={show(f, at("01", 0.1), at("03"))} side="left" />
      <CityPin cam={cam} f={f} label="SÀI GÒN" at={SAI_GON} from={at("02", 0.1)} o={show(f, at("02", 0.1), at("03"))} side="left" />
      <DataCard value="16 °C" label="TB · HÀ NỘI" x={290} y={330} f={f} at={at("01", 0.45)} out={at("04")} size={80} />
      <DataCard value="> 25 °C" label="TB · SÀI GÒN" x={710} y={330} f={f} at={at("02", 0.3)} out={at("04")} size={80} color={WARM} />
      {f >= at("01", 0.1) && f < at("03") && <Pulse x={hn[0]} y={hn[1]} f={f} color={COLD} o={1 - prog(f, at("02"), 6)} />}
      {f >= at("02", 0.1) && f < at("03") + 6 && <Pulse x={sg[0]} y={sg[1]} f={f} color={WARM} o={1 - prog(f, at("03"), 6)} />}
      <Question x={wx - 40} y={wy - 90} f={f} at={at("04")} out={at("05")} s={1.3} />
      <MapLabel text="BẠCH MÃ" x={wx - 150} y={wy - 40} o={show(f, at("05", 0.1), at("06") - 4)} size={56} />

      {/* ── 06–09 the ridge and the pass; [NGƯỜI] 1826 Minh Mạng's gate ── */}
      <CityPin cam={cam} f={f} label="HUẾ" at={HUE} from={at("06", 0.3)} o={show(f, at("06", 0.3), at("07"))} side="above" />
      <CityPin cam={cam} f={f} label="ĐÀ NẴNG" at={DA_NANG} from={at("06", 0.5)} o={show(f, at("06", 0.5), at("07"))} side="left" />
      <YearRibbon text="1826" f={f} at={at("07", 0.05)} out={at("10") - 4} />
      <ImgSticker src={`${IMG}/m-05-hai-van-gate.png`} x={hv[0] - 20} y={hv[1] - 110} w={250} f={f} at={at("07", 0.15)} out={at("10") - 4} />
      <PegImg src={`${IMG}/m-01-minh-mang.png`} x={hv[0] - 230} y={hv[1] + 10} h={300} f={f} at={at("07", 0.35)} o={1 - prog(f, at("08", 0.1), 6)} />
      {f >= at("08") && f < at("10") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("10") - 6, 5) }}>
          <Route pts={pts(cam, [[107.85, 16.55], [HAI_VAN[0], HAI_VAN[1] + 0.02], [108.17, 15.9]])} p={prog(f, at("08", 0.1), 30)} color={ATLAS.white} />
        </AbsoluteFill>
      )}
      {f >= at("09") && f < at("10") && (() => {
        // "canh cả gió": a small gust comes down from the north, hits the ridge and bounces back
        const t = prog(f, at("09", 0.1), at("09", 0.9) - at("09", 0.1));
        const reach = t < 0.6 ? t / 0.6 : 1 - ((t - 0.6) / 0.4) * 0.35;
        const ps = pts(cam, [[107.7, 16.75], [107.75, 16.25]]);
        return <WindArrow ps={ps} p={Math.max(0.05, reach)} id="gust" o={1 - prog(f, at("10") - 6, 5)} />;
      })()}

      {/* ── 10–12 the northeast monsoon weakens and stops at the wall ── */}
      {f >= at("10") && f < at("13") + 10 && WINDS.map((w, i) => (
        <WindArrow key={i} ps={pts(cam, w)} id={`wind-${i}`}
          p={prog(f, at("10", 0.15) + i * 5, at("12", 0.4) - at("10", 0.15))}
          o={(1 - 0.45 * prog(f, at("11", 0.2), 30)) * (1 - prog(f, at("13"), 8))} />
      ))}

      {/* ── 13–15 four seasons ↔ two seasons; [ĐÙA] puffer jacket ↔ T-shirt ── */}
      <MapLabel text="4 MÙA" x={300} y={480} o={show(f, at("13", 0.2), at("16"))} size={64} />
      <MapLabel text="2 MÙA" x={330} y={960} o={show(f, at("14", 0.2), at("16"))} size={64} />
      <PegImg src={`${IMG}/m-02-hanoi-puffer.png`} x={200} y={790} h={260} f={f} at={at("15", 0.05)} o={1 - prog(f, at("16"), 5)} />
      <PegImg src={`${IMG}/m-03-saigon-tshirt.png`} x={200} y={1290} h={240} f={f} at={at("15", 0.45)} o={1 - prog(f, at("16"), 5)} />

      {/* ── 16–21 the same wind brings the central rains ── */}
      {f >= at("16") && f < at("18") && (
        <WindArrow ps={pts(cam, [[110.2, 18.4], [109.0, 17.4], [107.9, 16.9]])} p={prog(f, at("16", 0.1), 30)} id="sea-wind"
          o={1 - prog(f, at("17", 0.6), 10)} />
      )}
      {f >= at("17") && f < at("22") + 6 && CLOUDS.map((c, i) => {
        const [x, y] = S(c);
        return <RainCloud key={i} x={x} y={y - 60} f={f + i * 7} s={0.8 + 0.25 * cloudDense} rain={rain * cloudDense} o={rain} />;
      })}
      {f >= at("17", 0.5) && f < at("18") && (() => {
        // a small storm symbol offshore ("cùng với bão")
        const [x, y] = S([109.3, 16.6]);
        return (
          <Sticker x={x} y={y} f={f} at={at("17", 0.5)} out={at("18") - 4} s={1}>
            <g style={{ rotate: `${-f * 4}deg` }} fill="none" stroke={ATLAS.white} strokeWidth={9} strokeLinecap="round">
              <path d="M 0 -30 A 30 30 0 0 1 30 0" /><path d="M 0 30 A 30 30 0 0 1 -30 0" />
            </g>
            <circle r={9} fill={ATLAS.white} />
          </Sticker>
        );
      })()}
      <DataCard value="THÁNG 8 – 12" label="MÙA MƯA" x={500} y={330} f={f} at={at("18", 0.35)} out={at("19")} size={72} />
      <CityPin cam={cam} f={f} label="HUẾ" at={HUE} from={at("19", 0.05)} o={show(f, at("19", 0.05), at("21"))} side="left" />
      <DataCard value="772,7 MM" label="HUẾ · THÁNG 10" x={500} y={330} f={f} at={at("19", 0.3)} out={at("21")} size={80} />
      {barO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: barO }}>
          <rect x={300} y={1300 - hueH} width={150} height={hueH} rx={10} fill={RAIN_BAND} stroke={ATLAS.ink} strokeWidth={5} />
          <rect x={560} y={1300 - hnH} width={150} height={hnH} rx={10} fill={COLD} stroke={ATLAS.ink} strokeWidth={5} opacity={prog(f, at("20", 0.1), 6)} />
          <line x1={270} y1={1300} x2={740} y2={1300} stroke={ATLAS.ink} strokeWidth={6} />
        </svg>
      )}
      <MapLabel text="HÀ NỘI · CẢ NĂM" x={635} y={985} o={show(f, at("20", 0.3), at("21"))} size={48} />
      <PegImg src={`${IMG}/m-04-hue-raincoat.png`} x={hue[0] - 150} y={hue[1] + 330} h={280} f={f} at={at("21", 0.05)} o={1 - prog(f, at("22"), 5)} />

      {/* ── 22 Saigon: dry season ── */}
      <Sun x={sg[0] + 80} y={sg[1] - 80} f={f} at={at("22", 0.35)} out={at("23") - 4} />
      <CityPin cam={cam} f={f} label="SÀI GÒN" at={SAI_GON} from={at("22", 0.3)} o={show(f, at("22", 0.3), at("23") - 4)} side="left" />

      {/* ── 23–24 [TWIST] the wettest place: the Bạch Mã summit; the wall that stops the cold ── */}
      {f >= at("23") && f < at("24", 0.8) && (() => {
        const [x, y] = S(BACH_MA);
        const o = Math.min(prog(f, at("23", 0.25), 10), 1 - prog(f, at("24", 0.65), 8));
        return (
          <>
            <RainCloud x={x - 140} y={y - 150} f={f} s={1.2} rain={1} o={o} />
            <RainCloud x={x + 70} y={y - 175} f={f + 11} s={1.35} rain={1} o={o} />
            <RainCloud x={x + 250} y={y - 135} f={f + 23} s={1.1} rain={1} o={o} />
            {o > 0 && <Pulse x={x} y={y} f={f} color={ATLAS.white} o={o} />}
          </>
        );
      })()}
      <DataCard value="~10.000 MM/NĂM" label="ĐỈNH BẠCH MÃ" x={500} y={330} f={f} at={at("23", 0.55)} out={at("24", 0.5)} size={72} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Tháng lạnh nhất, Hà Nội trung bình chỉ khoảng *16 độ*.",
  "02": "Sài Gòn vẫn hơn *25 độ*.",
  "05": "*Bạch Mã*.",
  "07": "Năm *1826*, vua Minh Mạng cho xây một cửa ải trên đỉnh đèo *Hải Vân*, ngay đầu dãy núi.",
  "12": "Tới *Bạch Mã*, nó gần như dừng lại.",
  "13": "Vì thế phía bắc có mùa đông lạnh *2, 3 tháng*.",
  "14": "Phía nam chỉ có *hai mùa*: mưa và khô.",
  "18": "Mùa mưa ở đây đến muộn, từ *tháng 8* tới *tháng 12*.",
  "19": "Riêng tháng 10, Huế mưa gần *800 li*.",
  "20": "Gần bằng *nửa* lượng mưa cả năm của Hà Nội.",
  "23": "Mà nơi được coi là mưa nhiều nhất nước, lại chính là đỉnh *Bạch Mã*, mỗi năm gần *10.000 li*.",
  "24": "Một bức tường, chặn rét cho miền Nam, và hứng *mưa nhiều nhất* nước.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/cinematic-piano-hit-567216.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [CLICK, "01", 0.45], [CLICK, "02", 0.3], [CLICK, "04"], [THUD, "05", 0.05, 0, -18],
  [W, "06", 0, -4], [CLICK, "07", 0.15], [PEN, "08", 0.1],
  [W2, "10", 0, -4], [THUD, "12", 0.3, 0, -18], [CLICK, "13", 0.2], [CLICK, "14", 0.2],
  [W, "16", 0, -4], [CLICK, "18", 0.35], [CLICK, "19", 0.3], [CLICK, "20", 0.15],
  [W2, "22", 0, -4], [HIT, "23", 0.55],
];

/** Music duck: the bed dips under the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("23") - 6, at("23") + 6, at("24", 1) - 4, at("24", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P3BachMa: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p3-bach-ma/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P3} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p3BachMaDuration = (fps: number) => episodeDuration(timing, fps);
