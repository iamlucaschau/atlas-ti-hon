/**
 * Map channel · P5 Kỳ lạ & kỷ lục · Region Reveal (style I Toy Atlas):
 * "Trung Quốc rộng gần 5 múi giờ, vì sao chỉ dùng một giờ?"
 * Script + sources: kich-ban-p5-trung-quoc-mui-gio-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop (Lucas 2026-10-14): the VO ends on line 17; the map flies home
 * from 80 % of that line and the last frame is the opening frame (Lào Cai border, map only).
 *
 * Map rules (Lucas 2026-10-13, option A): China filled from Natural Earth (de facto); Hoàng Sa +
 * Trường Sa in Vietnam's colour with labels; Taiwan not filled; no labels on disputed areas. The
 * solar time-zone bands are drawn by longitude (illustrative), clipped to China, north of 18.2°N
 * so they never touch the Paracels. Time talk only — no political comment.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p5-trung-quoc-mui-gio.timing.json";
import words from "../../src/voiceover/p5-trung-quoc-mui-gio.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, CountryShape, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, MapLabel, Pulse, Question, RegionFill, seamKeys, show, Sticker, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p5-trung-quoc-mui-gio/cut";
const TV = "images/i-singapore/cut/i-09-tv.png";
const { at } = beats(timing, FPS);

const VIEW = {
  laocai: { lon: 103.95, lat: 22.45, zoom: 70 },
  china: { lon: 104.2, lat: 37, zoom: 4.8 },
  kashgar: { lon: 76, lat: 39.5, zoom: 40 },
  wakhan: { lon: 74.6, lat: 37.1, zoom: 60 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.laocai },
  { at: at("02", 0.05), ...VIEW.china },
  { at: at("08") - 4, ...VIEW.kashgar },
  { at: at("15") - 4, ...VIEW.wakhan },
  { at: at("17", 0.8), ...VIEW.laocai },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
// loop seam: the last frame lands exactly on the opening framing
const KEYS = seamKeys(KEYS0, episodeDuration(timing, FPS), PUSH, PUSH_CAP);

const CN_BASE = "#E8B86A";
/** "Beijing time" colour: must not look like Vietnam's red (the Lào Cai frame shows both). */
const ONE_CLOCK = "#2A9D8F";
const BANDS = ["#8E6CC9", "#3D6FD0", "#4FA34A", "#E2C23A", "#E07A2E"]; // UTC+5 … UTC+9
const BEIJING: [number, number] = [116.4, 39.9];
const KASHGAR: [number, number] = [75.99, 39.47];
const LAOCAI: [number, number] = [103.96, 22.5];
const WAKHJIR: [number, number] = [74.47, 37.08];


/** Analog clock (hours as a decimal, e.g. 10.27); `digital` adds h:mm under it. */
const Clock: React.FC<{ x: number; y: number; r: number; hours: number; f: number; at: number; out?: number; digital?: boolean; dark?: boolean }> = ({
  x, y, r, hours, f, at: a, out, digital, dark,
}) => {
  const h = ((hours % 12) / 12) * 360;
  const m = ((hours % 1) * 60 / 60) * 360;
  return (
    <Sticker x={x} y={y} f={f} at={a} out={out}>
      <circle r={r} fill={dark ? "#28344A" : ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={0} y1={-r * 0.82} x2={0} y2={-r * 0.7} stroke={dark ? ATLAS.white : ATLAS.ink} strokeWidth={4} style={{ rotate: `${i * 30}deg` }} />
      ))}
      <line x1={0} y1={0} x2={0} y2={-r * 0.48} stroke={dark ? ATLAS.gold : ATLAS.ink} strokeWidth={9} strokeLinecap="round" style={{ rotate: `${h}deg` }} />
      <line x1={0} y1={0} x2={0} y2={-r * 0.72} stroke={dark ? ATLAS.white : ATLAS.red} strokeWidth={5} strokeLinecap="round" style={{ rotate: `${m}deg` }} />
      <circle r={7} fill={ATLAS.ink} />
      {digital && (
        <text y={r + 62} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={9}
          paintOrder="stroke">{`${Math.floor(hours) % 24}:${String(Math.round((hours % 1) * 60) % 60).padStart(2, "0")}`}</text>
      )}
    </Sticker>
  );
};

const SunIcon: React.FC<{ x: number; y: number; r?: number; o?: number; f: number }> = ({ x, y, r = 40, o = 1, f }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
    <g style={{ translate: `${x}px ${y}px` }}>
      <g style={{ rotate: `${f * 1.2}deg` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={0} y1={-r - 8} x2={0} y2={-r - 26} stroke={ATLAS.gold} strokeWidth={8} strokeLinecap="round" style={{ rotate: `${i * 36}deg` }} />
        ))}
      </g>
      <circle r={r} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={6} />
    </g>
  </svg>
);

const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [8, 14], [1, 0], CLAMP);

  // 1949: one colour floods China from Beijing; the solar bands fade under it
  // …and drains back during the flight home so the last frame matches the first
  const merge = prog(f, at("05", 0.3), 45, Easing.inOut(Easing.cubic)) * (1 - prog(f, at("17", 0.75), 30, Easing.inOut(Easing.cubic)));
  const fills: Fill[] = [
    ...["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: ATLAS.c })),
    { name: "China", color: ONE_CLOCK, wipe: { from: CN_BASE, lon: BEIJING[0], lat: BEIJING[1], p: merge } },
    { name: "Afghanistan", color: ATLAS.b, wipe: { from: ATLAS.land, lon: 71.5, lat: 37, p: prog(f, at("15", 0.15), 30) } },
  ];
  const bandsO = (f >= at("03") ? 1 : 0) * (1 - prog(f, at("05", 0.4), 30));

  // night sky over Kashgar (08–11): dark before the late sunrise, dark again after the late sunset, dark at 8 a.m.
  const night = f < at("08") ? 0 : Math.max(
    (1 - prog(f, at("08", 0.45), 30)) * show(f, at("08") - 2),
    prog(f, at("10", 0.35), 20) * (1 - prog(f, at("11") - 4, 6)),
    show(f, at("11"), at("12") - 2),
  );

  const [kx, ky] = toScreen(cam, ...KASHGAR);
  const [bx, by] = toScreen(cam, ...BEIJING);
  const [lx, ly] = toScreen(cam, ...LAOCAI);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={fills} f={f} />
      {/* solar time-zone bands: 15° of longitude each, UTC+5 … UTC+9 */}
      {bandsO > 0 && BANDS.map((c, i) => {
        const w0 = 67.5 + i * 15;
        // east → west, the band for UTC+9 first
        const o = bandsO * prog(f, at("03", 0.15) + (4 - i) * 9, 8);
        return (
          <RegionFill key={i} cam={cam} id={`band${i}`} country="China" fill={c} o={0.75 * o} dash="1 0"
            ring={[[w0, 18.2], [w0 + 15, 18.2], [w0 + 15, 55], [w0, 55]]} />
        );
      })}
      <VnIslands cam={cam} f={f} color={ATLAS.c} o={islandsO} />
      {/* country names + flags where the VO names them (Lucas 2026-10-14) */}
      <CountryTag cam={cam} f={f} name="China" label="TRUNG QUỐC" flag="china" anchor={[101, 33]} from={at("02", 0.6)}
        o={show(f, at("02", 0.6), at("05"))} glow={[at("03", 0.25)]} />
      <CountryTag cam={cam} f={f} name="Afghanistan" label="AFGHANISTAN" anchor={[73.3, 37.05]} from={at("15", 0.35)}
        o={show(f, at("15", 0.35), at("16", 0.1))} glow={[at("15", 0.45)]} />
      {night > 0 && <AbsoluteFill style={{ background: "linear-gradient(#0B1530 0%, #1B2A50 60%, rgba(27,42,80,0.4) 100%)", opacity: 0.72 * night }} />}

      {/* ── 01 Lào Cai – Hà Khẩu: +1 hour ── */}
      {f < at("02", 0.2) && (
        <>
          <ImgSticker src={`${IMG}/k-03-border-bridge.png`} x={lx} y={ly + 40} w={420} f={f} at={at("01", 0.05)} out={at("02", 0.1)} />
          <Clock x={lx - 240} y={ly - 260} r={80} hours={8} f={f} at={at("01", 0.15)} out={at("02", 0.1)} />
          <Clock x={lx + 240} y={ly - 260} r={80} hours={interpolate(f, [at("01", 0.5), at("01", 0.5) + 10], [8, 9], CLAMP)} f={f}
            at={at("01", 0.2)} out={at("02", 0.1)} />
        </>
      )}
      <BigGold text="+1 GIỜ" f={f} at={at("01", 0.55)} out={at("02", 0.1)} y={330} size={130} />
      <MapLabel text="LÀO CAI" x={lx - 40} y={ly + 230} o={show(f, at("01", 0.1), at("02", 0.1))} />

      {/* ── 02 3,000 km west, still the same hour ── */}
      {f >= at("02", 0.3) && f < at("03") && <Pulse x={kx} y={ky} f={f} color={ATLAS.gold} />}
      <DataCard value="3.000+ KM" label="VẪN 1 GIỜ" x={540} y={330} f={f} at={at("02", 0.55)} out={at("03")} />

      {/* ── 03–04 the sun's time zones ── */}
      <BigGold text="GẦN 5 MÚI GIỜ" f={f} at={at("03", 0.3)} out={at("05")} y={330} size={100} />
      {f >= at("04") && f < at("05") && (() => {
        const lon = interpolate(f, [at("04", 0.05), at("04", 0.95)], [134, 74], CLAMP);
        const [sx, sy] = toScreen(cam, lon, 50);
        return <SunIcon x={sx} y={sy} r={34} f={f} o={show(f, at("04"), at("05") - 4)} />;
      })()}

      {/* ── 05–06 1949: one clock for all ── */}
      <YearRibbon text="1949" f={f} at={at("05", 0.1)} out={at("06")} />
      {f >= at("05") && f < at("07") && <Pulse x={bx} y={by} f={f} color={ATLAS.gold} />}
      <MapLabel text="BẮC KINH" x={bx} y={by + 80} o={show(f, at("05", 0.25), at("07"))} />
      {f >= at("06") && f < at("07") + 4 && (
        <CountryShape cam={cam} name="China" stroke={ATLAS.gold} o={show(f, at("06"), at("07")) * (0.6 + 0.4 * Math.sin(f / 4))} />
      )}
      <BigGold text="1 NƯỚC · 1 GIỜ" f={f} at={at("06", 0.1)} out={at("07")} y={330} size={110} />
      <Question x={540} y={420} f={f} at={at("07")} out={at("08")} s={1.5} />

      {/* ── 08–11 Kashgar: late sunrise, late sunset, school in the dark ── */}
      {f >= at("08") && f < at("12") && (
        <>
          <SunIcon x={kx + 230} y={interpolate(f, [at("08", 0.2), at("08", 0.7)], [ky + 160, ky - 260], CLAMP)} r={46} f={f}
            o={show(f, at("08", 0.2), at("10", 0.5))} />
          <SunIcon x={kx - 230} y={interpolate(f, [at("10", 0.05), at("10", 0.6)], [ky - 260, ky + 160], CLAMP)} r={46} f={f}
            o={show(f, at("10"), at("10", 0.7))} />
          <Pulse x={kx} y={ky} f={f} color={ATLAS.white} />
          <MapLabel text="KASHGAR" x={kx} y={ky + 80} o={show(f, at("08", 0.3), at("11"))} />
        </>
      )}
      <Clock x={540} y={1120} r={90} hours={10.27} f={f} at={at("08", 0.4)} out={at("09")} />
      <DataCard value="~10:00" label="MẶT TRỜI MỌC" x={540} y={330} f={f} at={at("08", 0.55)} out={at("09")} />
      <DataCard value="~7:30" label="BẮC KINH" x={540} y={330} f={f} at={at("09", 0.25)} out={at("10")} color={ATLAS.white} />
      <Clock x={540} y={1120} r={90} hours={22.43} f={f} at={at("10", 0.2)} out={at("11")} dark />
      <BigGold text="22:00+" f={f} at={at("10", 0.35)} out={at("11")} y={330} size={130} />
      {f >= at("11") && f < at("12") && (
        <>
          <ImgSticker src={`${IMG}/k-01-kid-dark.png`} x={interpolate(f, [at("11"), at("12")], [300, 620], CLAMP)} y={1080} w={330} f={f} at={at("11", 0.05)}
            out={at("12") - 4} />
          <Clock x={820} y={420} r={80} hours={8} f={f} at={at("11", 0.2)} out={at("12") - 4} dark />
        </>
      )}

      {/* ── 12–14 two clocks in one region ── */}
      <Clock x={330} y={1060} r={100} hours={10} f={f} at={at("12", 0.15)} out={at("13")} />
      <Clock x={750} y={1060} r={100} hours={8} f={f} at={at("12", 0.3)} out={at("13")} />
      <BigGold text="−2 GIỜ" f={f} at={at("12", 0.45)} out={at("13")} y={330} size={130} />
      {f >= at("13") && f < at("15") && (
        <>
          <ImgSticker src={TV} x={540} y={980} w={520} f={f} at={at("13", 0.05)} out={at("15") - 4} />
          <Clock x={440} y={930} r={60} hours={10} f={f} at={at("13", 0.25)} out={at("15") - 4} />
          <Clock x={620} y={930} r={60} hours={8} f={f} at={at("13", 0.35)} out={at("15") - 4} />
        </>
      )}
      <BigGold text="1 VÙNG · 2 ĐỒNG HỒ" f={f} at={at("14", 0.05)} out={at("15") - 4} y={330} size={84} />

      {/* ── 15–17 the Afghan border: 3.5 hours, no way across ── */}
      {f >= at("15") && f < at("17", 0.85) && (() => {
        const [ax, ay] = toScreen(cam, 73.6, 37.0);
        const [cx, cy] = toScreen(cam, 75.4, 37.4);
        const [gx, gy] = toScreen(cam, ...WAKHJIR);
        const o = 1 - prog(f, at("17", 0.75), 5);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <CountryShape cam={cam} name="China" stroke={ATLAS.gold} o={show(f, at("15", 0.5)) * (0.6 + 0.4 * Math.sin(f / 4))} />
            <Clock x={ax - 40} y={ay - 330} r={85} hours={4.5} f={f} at={at("16", 0.1)} digital />
            <Clock x={cx + 60} y={cy - 330} r={85} hours={8} f={f} at={at("16", 0.2)} digital />
            {f >= at("17") && <ImgSticker src={`${IMG}/k-02-mountain-gate.png`} x={gx + 40} y={gy + 140} w={340} f={f} at={at("17", 0.1)} />}
          </AbsoluteFill>
        );
      })()}
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Đi từ Lào Cai sang Hà Khẩu, đồng hồ nhảy *1 tiếng*.",
  "02": "Nhưng đi tiếp hơn *3.000 km* về phía tây, nó không nhảy thêm phút nào.",
  "03": "Nếu chia theo Mặt Trời, lãnh thổ Trung Quốc trải gần *5 múi giờ*.",
  "04": "Cứ 15 độ kinh, mặt trời mọc chậm hơn 1 tiếng.",
  "05": "Vậy mà từ khoảng năm *1949*, cả nước dùng chung một chiếc đồng hồ: giờ Bắc Kinh.",
  "08": "Ở Kashgar, cực tây Tân Cương, ngày đầu năm, gần *10 giờ sáng* mặt trời mới mọc.",
  "09": "Cùng ngày ấy ở Bắc Kinh, mặt trời mọc từ khoảng *7 giờ rưỡi*.",
  "10": "Mùa hè, hơn *10 giờ tối* trời mới tắt nắng.",
  "11": "Thử tưởng tượng: *8 giờ sáng* đi học, ngoài trời vẫn tối om.",
  "12": "Nên ở Tân Cương, nhiều người còn dùng thêm một giờ không chính thức, chậm hơn *2 tiếng*.",
  "16": "Nếu bước qua được, đồng hồ lệch tới *3 tiếng rưỡi*, một trong những chỗ lệch giờ lớn nhất thế giới.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SFX: SfxCue[] = [
  [CLICK, "01", 0.5], [W, "02", 0.05],
  [CLICK, "03", 0.3], [THUD, "05", 0.3, 0, -18], [CLICK, "06", 0.1], [CLICK, "07"],
  [W2, "08", 0, -4], [CLICK, "08", 0.55], [CLICK, "09", 0.25], [CLICK, "10", 0.35], [CLICK, "11", 0.2],
  [CLICK, "12", 0.45], [CLICK, "13", 0.25], [W, "15", 0, -4], [THUD, "16", 0.45, 0, -18], [CLICK, "17", 0.1], [W2, "17", 0.8],
];

export const P5TrungQuocMuiGio: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p5-trung-quoc-mui-gio/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P5} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p5TrungQuocMuiGioDuration = (fps: number) => episodeDuration(timing, fps);
