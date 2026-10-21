/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (+ Timeline) (style I Toy Atlas):
 * "Điện hạt nhân: canh bạc hay lời giải cho cơn khát điện?" — script v4 (Lucas 2026-10-20).
 * Script + sources: kich-ban-p2-dien-hat-nhan-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 26; the last frame is the opening
 * frame (whole Vietnam with Hoàng Sa, Trường Sa, Ninh Thuận highlighted, pins Ninh Thuận + Hà Nội).
 *
 * Map: country + islands from world-atlas (channel rule); Ninh Thuận = Natural Earth province (VN2024, the
 * project's name). The two plant sites (Phước Dinh, Vĩnh Hải) are APPROXIMATE positions; the dark north, the
 * 1.100 km line, the pit / bar comparison ("so quy mô"), turbines, panels, card table are ILLUSTRATIVE.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-dien-hat-nhan.timing.json";
import words from "../../src/voiceover/p2-dien-hat-nhan.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC_ALT, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse,
  Question, RegionFill, Route, seamKeys, show, Stamp, Sticker, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, flashAt, ProvinceMap, ProvinceTag, VN2024 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-dien-hat-nhan/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

type LL = [number, number];
const HA_NOI: LL = [105.85, 21.03];
const NT: LL = [108.99, 11.68]; // Ninh Thuận pin (between the two sites)
const SITE1: LL = [108.95, 11.45]; // Phước Dinh — Ninh Thuận 1 (approximate)
const SITE2: LL = [109.18, 11.68]; // Vĩnh Hải — Ninh Thuận 2 (approximate)

const VIEW = {
  vn: { lon: 108.6, lat: 16.2, zoom: 19 },
  nt: { lon: 109.05, lat: 11.62, zoom: 330 },
  /** hook (Bible 2026-10-21): fly in on Ninh Thuận from frame 1, out again for the two-pin question */
  hook: { lon: 108.75, lat: 12.15, zoom: 62 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  { at: 1, ...VIEW.hook },
  { at: at("03") - 6, ...VIEW.vn },
  { at: at("05") - 4, ...VIEW.nt },
  { at: at("06") - 4, ...VIEW.vn },
  { at: at("09") - 4, ...VIEW.nt },
  { at: at("10") - 4, ...VIEW.vn },
  { at: at("20") - 4, ...VIEW.nt },
  { at: at("26", 0.45), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const FILLS: Fill[] = ["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN }));
const NT_COL = "#F3D98A";
const NIGHT = "#1B2638";
const PIT = "#D9534F";
const GREEN = "#4FA34A";
const NT_SET = VN2024.filter((p) => p.name === "Ninh Thuận");
/** The north, illustrative (clipped to Vietnam's land by RegionFill). */
const NORTH: LL[] = [[101, 19.2], [111, 19.2], [111, 24], [101, 24]];

/** Wind turbine (screen space) centred on its base, blades turning. */
const Turbine: React.FC<{ s?: number; f: number }> = ({ s = 1, f }) => (
  <g style={{ scale: s }} stroke={ATLAS.ink} strokeWidth={3} strokeLinejoin="round">
    <path d="M -4 0 L -2 -70 L 2 -70 L 4 0 Z" fill={ATLAS.white} />
    <g style={{ translate: "0px -72px", rotate: `${f * 4}deg` }}>
      {[0, 120, 240].map((r) => <path key={r} d="M 0 0 L -4 -38 L 0 -42 L 4 -38 Z" fill={ATLAS.white} style={{ rotate: `${r}deg` }} />)}
      <circle r={5} fill={ATLAS.white} />
    </g>
  </g>
);

/** Small solar panel (screen space). */
const Panel: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g style={{ scale: s }} stroke={ATLAS.ink} strokeWidth={3} strokeLinejoin="round">
    <path d="M -30 -6 L 26 -6 L 34 -30 L -22 -30 Z" fill="#3B6FB6" />
    <path d="M -8 -30 L -14 -6 M 12 -30 L 6 -6 M -26 -18 L 30 -18" stroke="#A9C8EE" strokeWidth={2} />
    <path d="M 0 -6 L 0 6" />
  </g>
);

/** Light bulb (screen space); `on` 0–1. */
const Bulb: React.FC<{ on: number }> = ({ on }) => (
  <g stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round">
    {on > 0 && <circle cy={-10} r={46} fill={ATLAS.gold} opacity={0.35 * on} stroke="none" />}
    <path d="M -22 -10 A 26 26 0 1 1 22 -10 Q 14 4 12 18 L -12 18 Q -14 4 -22 -10 Z" fill={on > 0.5 ? ATLAS.gold : "#8C8C8C"} />
    <rect x={-12} y={18} width={24} height={14} rx={3} fill="#9AA3AA" />
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // loop frame: pins Ninh Thuận + Hà Nội at the start and back at the end
  const tail = prog(f, at("26", 0.75), 10);
  const pinO = Math.max(1 - prog(f, at("05") - 6, 6), show(f, at("06"), at("07", 0.25)), show(f, at("10"), at("14", 0.2)), tail);
  const ntFlash = flashAt(f, [at("05", 0.1), at("16", 0.1)]);
  // the dark north (13–17)
  const nightO = Math.min(prog(f, at("13", 0.1), 10), 1 - prog(f, at("18"), 10)) * (0.55 + 0.12 * Math.sin(f / 3));

  const layer = (z: number) => (
    <ProvinceMap z={z} set={NT_SET} tag="nt" base={NT_COL} lines={1} f={f} flash={[{ name: "Ninh Thuận", v: ntFlash }]} />
  );

  const nt = S(NT);
  const hn = S(HA_NOI);
  const s1 = S(SITE1);
  const s2 = S(SITE2);
  const near = cam.zoom > 120;

  // 15–17 comparison (screen space, rows/stage): pit (shortfall) and bar (planned)
  const UNIT = 0.05; // px per MW
  const pitD = 4350 * UNIT * prog(f, at("15", 0.15), 20);
  const barFrom = prog(f, at("16", 0.1), 18);
  const barDrop = prog(f, at("17", 0.05), 14);
  const cmpO = Math.min(prog(f, at("15"), 8), 1 - prog(f, at("18"), 8));
  const GROUND = 980;

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [22, 30], [1, 0], CLAMP)} />
      <RegionFill cam={cam} id="night" country="Vietnam" ring={NORTH} fill={NIGHT} o={nightO} dash="1 0" />

      {/* pins (loop frame) */}
      <CityPin cam={cam} f={f} label="HÀ NỘI" at={HA_NOI} o={pinO} side="right" />
      <CityPin cam={cam} f={f} label="NINH THUẬN" at={NT} o={pinO * (near ? 0 : 1)} side="left" color={ATLAS.gold} />

      {/* ── 01–04 hook: stopped for money (2016), restarted for power (2024); what changed? ── */}
      <YearRibbon text="2016" f={f} at={at("01", 0.05)} out={at("02")} />
      <Stamp text="TẠM DỪNG" x={nt[0] - 40} y={nt[1] - 130} f={f} at={at("01", 0.45)} out={at("02", 0.15)} />
      <YearRibbon text="2024" f={f} at={at("02", 0.1)} out={at("03", 0.3)} />
      <Stamp text="LÀM LẠI" x={nt[0] - 40} y={nt[1] - 130} f={f} at={at("02", 0.55)} out={at("03", 0.6)} color={GREEN} />
      <Question x={(nt[0] + hn[0]) / 2 + 60} y={(nt[1] + hn[1]) / 2} f={f} at={at("03", 0.6)} out={at("04", 0.4)} s={1.4} />
      {f >= at("04") && f < at("05") && (
        <>
          <Pulse x={hn[0]} y={hn[1]} f={f} color={ATLAS.white} o={1 - prog(f, at("05") - 6, 5)} />
          <Pulse x={nt[0]} y={nt[1]} f={f} color={ATLAS.gold} o={1 - prog(f, at("05") - 6, 5)} />
        </>
      )}

      {/* ── 05 Ninh Thuận: two sites ── */}
      <ProvinceTag cam={cam} f={f} label="NINH THUẬN" anchor={[108.78, 11.85]} from={at("05", 0.2)} o={show(f, at("05", 0.2), at("06") - 4)} />
      <ImgSticker src={`${IMG}/d-01-nuclear-plant.png`} x={s1[0]} y={s1[1] - 60} w={230} f={f} at={at("05", 0.4)} out={at("06") - 4} />
      <ImgSticker src={`${IMG}/d-01-nuclear-plant.png`} x={s2[0]} y={s2[1] - 60} w={230} f={f} at={at("05", 0.6)} out={at("06") - 4} />

      {/* ── 06 ~1.100 km to Hà Nội ── */}
      {f >= at("06") && f < at("07", 0.5) && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("07", 0.3), 6) }}>
          <Route pts={pts(cam, [NT, [107.6, 15.8], HA_NOI])} p={prog(f, at("06", 0.15), 30)} color={ATLAS.white} />
        </AbsoluteFill>
      )}
      <MapLabel text="~1.100 KM" x={(nt[0] + hn[0]) / 2 + 150} y={(nt[1] + hn[1]) / 2 + 20} o={show(f, at("06", 0.45), at("07", 0.3))} size={56} />

      {/* ── 07–10 why it stopped: ~200.000 tỷ (2008 estimate); [ĐÙA]; [NGƯỜI] the minister; wind, sun, infrastructure ── */}
      <DataCard value="~200.000 TỶ" label="ƯỚC TÍNH 2008" x={CX} y={330} f={f} at={at("07", 0.3)} out={at("09") - 4} size={88} />
      <PegImg src={`${IMG}/d-02-accountant.png`} x={CX} y={1300} h={320} f={f} at={at("08", 0.05)} o={1 - prog(f, at("09") - 6, 5)} />
      <YearRibbon text="22/11/2016" f={f} at={at("09", 0.1)} out={at("10")} />
      <PegImg src={`${IMG}/d-03-official-podium.png`} x={CX} y={1300} h={360} f={f} at={at("09", 0.15)} o={1 - prog(f, at("10"), 5)} />
      <MapLabel text="BỘ TRƯỞNG MAI TIẾN DŨNG" x={CX} y={480} o={show(f, at("09", 0.25), at("10"))} size={52} />
      {f >= at("10") && f < at("11") + 6 && (() => {
        const o = 1 - prog(f, at("11"), 6);
        const items: [LL, "t" | "p", number][] = [[[110.2, 12.6], "t", 0], [[110.5, 13.5], "t", 6], [[108.5, 13.6], "p", 12], [[108.1, 14.3], "p", 18]];
        return items.map(([ll, kind, d], i) => {
          const [x, y] = S(ll);
          return (
            <Sticker key={i} x={x} y={y} f={f} at={at("10", 0.1) + d} s={1.3}>
              <g opacity={o}>{kind === "t" ? <Turbine f={f} /> : <Panel />}</g>
            </Sticker>
          );
        });
      })()}
      <MapLabel text="TIỀN CHO HẠ TẦNG" x={CX} y={1180} o={show(f, at("10", 0.55), at("11"))} size={52} />

      {/* ── 11–14 what brought it back: the thirst for power; north dark in 2023; ~1,4 tỷ USD (WB estimate) ── */}
      <Question x={hn[0] + 90} y={hn[1] - 80} f={f} at={at("11", 0.1)} out={at("12")} s={1.2} />
      {f >= at("12") && f < at("15") && (
        <Sticker x={hn[0] + 100} y={hn[1] - 90} f={f} at={at("12")} out={at("15") - 4} s={1.1}>
          <Bulb on={f < at("12", 0.5) ? 1 : 0.5 + 0.5 * Math.sign(Math.sin(f / 2)) * (f < at("13") ? 1 : 0)} />
        </Sticker>
      )}
      <YearRibbon text="2023" f={f} at={at("13", 0.1)} out={at("14", 0.25)} />
      <DataCard value="~1,4 TỶ USD" label="ƯỚC TÍNH · WORLD BANK" x={CX} y={330} f={f} at={at("14", 0.3)} out={at("15")} size={84} />

      {/* ── 15–17 payoff: the shortfall pit vs the two plants (same unit, MW) ── */}
      {cmpO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: cmpO }}>
          <rect x={150} y={GROUND - 400} width={780} height={720} rx={28} fill="rgba(22,32,40,0.9)" />
          <line x1={190} y1={GROUND} x2={890} y2={GROUND} stroke={ATLAS.white} strokeWidth={6} />
          {/* the pit */}
          <rect x={430} y={GROUND} width={220} height={pitD} fill="#0E141B" stroke={PIT} strokeWidth={6} />
          {/* the bar: 4.000 solid + up to 6.400 lighter, flies in then drops into the pit */}
          {barFrom > 0 && (() => {
            const h0 = 4000 * UNIT;
            const h1 = 6400 * UNIT;
            const top = interpolate(barDrop, [0, 1], [GROUND - h1 - 40, GROUND - h1 + h0], CLAMP);
            const x = interpolate(barFrom, [0, 1], [800, 440], CLAMP);
            return (
              <g>
                <rect x={x} y={top} width={200} height={h1 - h0} fill={ATLAS.gold} opacity={0.45} stroke={ATLAS.ink} strokeWidth={4} />
                <rect x={x} y={top + h1 - h0} width={200} height={h0} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
              </g>
            );
          })()}
          <text x={300} y={GROUND + 60} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={PIT}
            stroke={ATLAS.ink} strokeWidth={8} paintOrder="stroke">THIẾU</text>
        </svg>
      )}
      <DataCard value="~4.350 MW" label="ƯỚC THIẾU · 6/2023" x={CX} y={330} f={f} at={at("15", 0.2)} out={at("16")} size={90} color={PIT} />
      <DataCard value="4.000–6.400 MW" label="QUY HOẠCH" x={CX} y={330} f={f} at={at("16", 0.1)} out={at("17", 0.95)} size={84} />
      <MapLabel text="SO QUY MÔ" x={CX} y={GROUND + 330} o={show(f, at("17", 0.25), at("18"))} size={56} />

      {/* ── 18–19 two sides ── */}
      <PegImg src={`${IMG}/d-04-supporter.png`} x={270} y={1300} h={300} f={f} at={at("18", 0.05)} o={1 - prog(f, at("20") - 6, 5)} />
      <MapLabel text="PHE ỦNG HỘ" x={270} y={960} o={show(f, at("18", 0.15), at("20") - 6)} size={52} />
      <PegImg src={`${IMG}/d-05-worried.png`} x={760} y={1300} h={300} f={f} at={at("19", 0.05)} o={1 - prog(f, at("20") - 6, 5)} />
      <MapLabel text="PHE LO NGẠI" x={745} y={960} o={show(f, at("19", 0.15), at("20") - 6)} size={52} />

      {/* ── 20–23 the bet is still open: Japan left plant 2, Russia signed plant 1, new price under review ── */}
      <ImgSticker src={`${IMG}/d-06-card-table.png`} x={S([108.72, 11.95])[0]} y={S([108.72, 11.95])[1]} w={240} f={f} at={at("20", 0.2)} out={at("24", 0.2)} />
      {f >= at("21") && f < at("22") + 10 && (() => {
        const p = prog(f, at("21", 0.4), 18);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("22"), 8) }}>
            <g style={{ translate: `${s2[0] + 140 * p}px ${s2[1] - 30 - 220 * p}px`, rotate: `${25 * p}deg` }}><Flag kind="japan" w={70} f={f} /></g>
          </svg>
        );
      })()}
      <CountryTag cam={cam} f={f} name="Japan" label="NHẬT BẢN" flag="japan" anchor={[SITE2[0], SITE2[1] + 0.13]} from={at("21", 0.05)}
        o={show(f, at("21", 0.05), at("22"))} />
      {f >= at("22") && f < at("24", 0.2) && (() => {
        const p = prog(f, at("22", 0.1), 12);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("24", 0.1), 6) }}>
            <g style={{ translate: `${s1[0]}px ${s1[1] - 110 - 160 * (1 - p)}px` }}><Flag kind="russia" w={70} f={f} /></g>
          </svg>
        );
      })()}
      <CountryTag cam={cam} f={f} name="Russia" label="NGA" flag="russia" anchor={[SITE1[0] - 0.12, SITE1[1] - 0.1]} from={at("22", 0.1)}
        o={show(f, at("22", 0.1), at("23", 0.3))} />
      <Question x={S([108.72, 11.95])[0] + 110} y={S([108.72, 11.95])[1] - 110} f={f} at={at("23", 0.15)} out={at("24", 0.2)} s={1.1} />
      <MapLabel text="ĐANG THẨM ĐỊNH" x={CX} y={1180} o={show(f, at("23", 0.25), at("24", 0.2))} size={56} />

      {/* ── 24–26 [TWIST] that same summer the land was released; 13 years; 16 months later they get ready to leave ── */}
      <YearRibbon text="13/7/2023" f={f} at={at("24", 0.15)} out={at("25")} />
      <Stamp text="HUỶ THU HỒI" x={CX} y={760} f={f} at={at("24", 0.3)} out={at("25", 0.2)} />
      <PegImg src={`${IMG}/d-07-repair-house.png`} x={CX} y={1250} h={380} f={f} at={at("25", 0.05)} o={1 - prog(f, at("26"), 6)} />
      <DataCard value="13 NĂM" label="SỐNG TREO" x={CX} y={330} f={f} at={at("25", 0.3)} out={at("26")} size={96} />
      <YearRibbon text="11/2024" f={f} at={at("26", 0.05)} out={at("26", 0.7)} />
      <PegImg src={`${IMG}/d-08-moving-family.png`} x={CX} y={1250} h={360} f={f} at={at("26", 0.1)} o={1 - prog(f, at("26", 0.7), 8)} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Năm *2016*, Việt Nam dừng điện hạt nhân vì *tiền*.",
  "02": "*Tám năm* sau, làm lại, vì *điện*.",
  "06": "Cách hơn *1.000 km* về phía bắc, là Hà Nội.",
  "07": "Lần đầu, cái giá ước khoảng *200 nghìn tỷ* đồng.",
  "12": "*Cơn khát điện*.",
  "13": "Mùa hè năm *2023*, miền Bắc cắt điện luân phiên.",
  "14": "Ngân hàng Thế giới ước thiệt hại khoảng *1,4 tỷ đô*, chỉ trong hai tháng.",
  "15": "Lúc căng nhất, miền Bắc ước thiếu hơn *4.000 MW*.",
  "16": "Hai nhà máy Ninh Thuận, theo quy hoạch: *4.000–6.400 MW*.",
  "25": "Hơn nghìn hộ dân, sau *13 năm*, mới được sửa nhà.",
  "26": "*Mười sáu tháng* sau, dự án quay lại, và họ lại chuẩn bị rời đi.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/cinematic-piano-hit-567216.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [THUD, "01", 0.45, 0, -18], [CLICK, "02", 0.55], [CLICK, "04", 0.1],
  [W, "05", 0, -4], [W2, "06", 0, -4], [CLICK, "07", 0.3], [W, "09", 0, -4], [W2, "10", 0, -4],
  [PEN, "12", 0.5], [CLICK, "14", 0.3], [THUD, "15", 0.15, 0, -18], [W, "16", 0.1], [CLICK, "17", 0.05],
  [W2, "20", 0, -4], [CLICK, "21", 0.4], [CLICK, "22", 0.1], [HIT, "24", 0.5, 0, -20],
];

/** Music duck: the bed dips under the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("24") - 6, at("24") + 6, at("26", 1) - 4, at("26", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P2DienHatNhan: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-dien-hat-nhan/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC_ALT.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2DienHatNhanDuration = (fps: number) => episodeDuration(timing, fps);
