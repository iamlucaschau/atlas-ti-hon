/**
 * Map channel · P1 Vì sao bản đồ như thế này? · Historical Timeline (style I Toy Atlas):
 * "Nước bị hàng xóm cắt làm đôi" (Brunei).
 * Script + sources: kich-ban-p1-brunei-chia-doi-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 23 (a whole sentence); the map
 * flies home during it and in the 0.7 s tail every layer clears, so the last frame is the first.
 *
 * Map rules (Lucas 2026-10-14, Cổng 2 option A): old Brunei's reach is an ILLUSTRATIVE coastal band;
 * the Sarawak stages, Limbang and the bridge line are SCHEMATIC. Sabah is never named; Philippines
 * never coloured. Vietnam + Hoàng Sa, Trường Sa whenever the South China Sea is in frame.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p1-brunei-chia-doi.timing.json";
import words from "../../src/voiceover/p1-brunei-chia-doi.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, CoastBand, count, CountryTag, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MapLabel, PegImg,
  pts, Pulse, Question, RegionFill, routeHead, seamKeys, show, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p1-brunei-chia-doi/cut";
const BAGS = "images/p2-duong-sat-cao-toc/cut/p-03-money-bags.png";
const BARREL = "images/p4-malacca-kra/cut/t-05-fuel.png";
const SHIP = "images/i-singapore/cut/i-07-ship.png";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

const VIEW = {
  borneo: { lon: 114.3, lat: 1.4, zoom: 20 },
  bay: { lon: 114.85, lat: 4.55, zoom: 170 },
  sea: { lon: 108.5, lat: 3.5, zoom: 9 },
  road: { lon: 115.0, lat: 4.79, zoom: 650 },
  bridge: { lon: 115.08, lat: 4.86, zoom: 480 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.borneo },
  { at: at("08") - 4, ...VIEW.bay },
  { at: at("12") - 4, ...VIEW.sea },
  { at: at("19") - 4, ...VIEW.borneo },
  { at: at("20") - 4, ...VIEW.road },
  { at: at("21") - 4, ...VIEW.bridge },
  { at: at("23", 0.55), ...VIEW.borneo },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
// loop seam: the last frame lands exactly on the opening framing
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const BRUNEI = ATLAS.d;
const BRITISH = "#8A63B8"; // violet: blue reads as sea
const MALAYSIA = ATLAS.b;
const VN_MUTED = "#E59A84";

// illustrative regions (lon/lat), clipped to Malaysia's land
const BORNEO: [number, number][] = [[108.4, -4.6], [119.6, -4.6], [119.6, 7.6], [108.4, 7.6]];
const S1: [number, number][] = [[109.3, 0.6], [111.2, 0.6], [111.2, 2.6], [109.3, 2.6]]; // 1841, Kuching
const S2: [number, number][] = [[111.2, 0.6], [113.2, 0.8], [113.2, 3.6], [111.2, 3.0]];
const S3: [number, number][] = [[113.2, 0.8], [115.7, 0.9], [115.7, 3.85], [114.75, 4.0], [114.7, 4.4], [114.75, 4.75], [113.2, 4.7]];
const NORTH: [number, number][] = [[115.15, 4.95], [115.15, 4.45], [115.3, 4.25], [115.7, 3.85], [119.6, 3.8], [119.6, 7.6], [115.15, 7.6]];
const LIMBANG: [number, number][] = [[114.75, 4.75], [115.05, 4.86], [115.12, 4.6], [115.2, 4.45], [115.4, 4.2], [115.72, 3.84], [115.35, 3.82], [114.75, 4.0], [114.7, 4.4]];

const KUCHING: [number, number] = [110.35, 1.55];
const LIMBANG_TOWN: [number, number] = [115.0, 4.75];
const SERIA: [number, number] = [114.32, 4.6];
const KL: [number, number] = [101.69, 3.14];
const BRUNEI_C: [number, number] = [114.7, 4.6];
/** Old overland route capital → Temburong through Limbang (schematic) and its four checkpoints. */
const ROAD: [number, number][] = [[114.83, 4.86], [114.91, 4.79], [114.95, 4.76], [115.0, 4.75], [115.015, 4.74], [115.09, 4.74]];
const CHECKS = [0.31, 0.38, 0.72, 0.79]; // two at each border
/** The Temburong bridge across Brunei Bay (schematic line). */
const BRIDGE: [number, number][] = [[114.965, 4.905], [115.0, 4.895], [115.04, 4.875], [115.075, 4.85]];
const BOAT: [number, number] = [115.015, 4.835];

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [12, 16], [1, 0], CLAMP);

  // 1963: Malaysia floods in from Kuala Lumpur; drains back during the flight home so the last frame matches the first
  const merge = prog(f, at("12", 0.15), 40, Easing.inOut(Easing.cubic)) * (1 - prog(f, at("23", 0.55), 24, Easing.inOut(Easing.cubic)));
  const fills: Fill[] = [
    { name: "Brunei", color: BRUNEI },
    { name: "Malaysia", color: MALAYSIA, wipe: { from: ATLAS.land, lon: KL[0], lat: KL[1], p: merge } },
    { name: "Singapore", color: MALAYSIA, wipe: { from: ATLAS.land, lon: 103.8, lat: 1.35, p: merge } },
    ...["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN_MUTED })),
  ];
  // British-held stages of north Borneo (1841 → 1890), fading into Malaysia green in 1963
  const british = 0.92 * (1 - prog(f, at("12", 0.15), 30));
  const s1 = prog(f, at("05", 0.4), 12);
  const s2 = prog(f, at("06", 0.1), 10);
  const s3 = prog(f, at("06", 0.55), 10);
  const north = prog(f, at("07", 0.2), 12);
  const limbang = prog(f, at("08", 0.55), 14);
  // the old coastal reach: on in the hook, shrinks to today's Brunei in 02, back for "thế kỷ 16", Kalimantan fades in 04
  const band = Math.max(show(f, at("01", 0.1), at("02", 0.2)), show(f, at("03", 0.05), at("08")));
  const bandKal = Math.min(band, 1 - prog(f, at("04", 0.3), 12));
  // the cut: red dashed Limbang outline
  const cutO = Math.max(show(f, at("02", 0.45), at("03")), show(f, at("09"), at("10", 0.5)), show(f, at("23", 0.1), at("23", 0.5)))
    * (0.6 + 0.4 * Math.sin(f / 3));

  const [kx, ky] = toScreen(cam, ...KUCHING);
  const [lx, ly] = toScreen(cam, ...LIMBANG_TOWN);
  const [ox, oy] = toScreen(cam, ...SERIA);
  const [bx, by] = toScreen(cam, ...BRUNEI_C);
  const [klx, kly] = toScreen(cam, ...KL);
  const road = pts(cam, ROAD);
  const bridge = pts(cam, BRIDGE);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={fills} f={f} />
      <CoastBand cam={cam} id="reach" countries={["Malaysia", "Brunei"]} ring={BORNEO} color={BRUNEI} width={22} o={0.85 * band} />
      <CoastBand cam={cam} id="reach-kal" countries={["Indonesia"]} ring={BORNEO} color={BRUNEI} width={22} o={0.85 * bandKal} />
      <RegionFill cam={cam} id="s1" country="Malaysia" ring={S1} fill={BRITISH} o={british * s1} stroke={BRITISH} dash="1 0" />
      <RegionFill cam={cam} id="s2" country="Malaysia" ring={S2} fill={BRITISH} o={british * s2} stroke={BRITISH} dash="1 0" />
      <RegionFill cam={cam} id="s3" country="Malaysia" ring={S3} fill={BRITISH} o={british * s3} stroke={BRITISH} dash="1 0" />
      <RegionFill cam={cam} id="north" country="Malaysia" ring={NORTH} fill={BRITISH} o={british * north} stroke={BRITISH} dash="1 0" />
      <RegionFill cam={cam} id="limbang" country="Malaysia" ring={LIMBANG} fill={BRITISH} o={british * limbang} stroke={BRITISH} dash="1 0" />
      {cutO > 0 && <RegionFill cam={cam} id="cut" country="Malaysia" ring={LIMBANG} fill="rgba(0,0,0,0)" stroke={ATLAS.red} dash="12 8" o={cutO} />}
      <VnIslands cam={cam} f={f} color={VN_MUTED} o={islandsO} />

      {/* country names + flags where the VO names them (Lucas 2026-10-14) */}
      <CountryTag cam={cam} f={f} name="Brunei" label="BRUNEI" flag="brunei" anchor={[114.6, 4.2]} from={at("01", 0.2)}
        o={Math.max(show(f, at("01", 0.2), at("02", 0.3)), show(f, at("12", 0.6), at("13")), show(f, at("17"), at("18")))}
        glow={[at("01", 0.1), at("09", 0.15), at("17", 0.1)]} />
      <CountryTag cam={cam} f={f} name="Malaysia" label="MALAYSIA" flag="malaysia" anchor={[102.3, 4.6]} from={at("12", 0.5)}
        o={Math.max(show(f, at("12", 0.5), at("13")), show(f, at("16", 0.1), at("17")))} glow={[at("12", 0.55), at("16", 0.1)]} />

      {/* ── 01–02 hook: then and now ── */}
      <DataCard value="5.765 KM²" label="NHỎ HƠN TP.HCM" x={540} y={330} f={f} at={at("02", 0.3)} out={at("03")} />

      {/* ── 03–04 16th century; the Europeans arrive ── */}
      <YearRibbon text="THẾ KỶ 16" f={f} at={at("03", 0.1)} out={at("05")} />
      {f >= at("04") && f < at("05") + 10 && [0, 1].map((i) => (
        <ImgSticker key={i} src={SHIP} x={interpolate(f, [at("04"), at("05") + 10], [-80 - 140 * i, 380 - 100 * i], CLAMP)} y={560 + 170 * i}
          w={150} f={f} at={at("04") + i * 6} out={at("05") + 4} />
      ))}

      {/* ── 05–07 the Brookes take Sarawak piece by piece; the north goes to a British company ── */}
      <YearRibbon text="1841" f={f} at={at("05", 0.1)} out={at("08") - 4} />
      <PegImg src={`${IMG}/b-01-james-brooke.png`} x={kx} y={ky + 250} h={260} f={f} at={at("05", 0.45)} o={1 - prog(f, at("07"), 5)} />
      <MapLabel text="SARAWAK" x={kx + 120} y={ky - 120} o={show(f, at("05", 0.6), at("07"))} />

      {/* ── 08–09 1890: Limbang, Brunei cut in two ── */}
      <YearRibbon text="1890" f={f} at={at("08", 0.15)} out={at("10")} />
      <PegImg src={`${IMG}/b-02-charles-brooke.png`} x={lx - 30} y={ly + 420} h={320} f={f} at={at("08", 0.3)} o={1 - prog(f, at("10"), 5)} />
      <MapLabel text="LIMBANG" x={lx} y={ly + 90} o={show(f, at("08", 0.6), at("10", 0.5))} />

      {/* ── 10–11 1929: oil under Seria ── */}
      {f >= at("10") && f < at("12") - 2 && <Pulse x={ox} y={oy} f={f} color={ATLAS.ink} o={1 - prog(f, at("12") - 6, 4)} />}
      <YearRibbon text="1929" f={f} at={at("11", 0.1)} out={at("12") - 4} />
      {f >= at("11") && f < at("12") - 2 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("12") - 6, 4) }}>
          <ImgSticker src={`${IMG}/b-04-oil-derrick.png`} x={ox} y={oy - 150 - 6 * Math.abs(Math.sin((f - at("11")) / 5))} w={210} f={f} at={at("11", 0.3)} />
          <ImgSticker src={BARREL} x={ox + 170} y={oy + 30} w={120} f={f} at={at("11", 0.6)} />
        </AbsoluteFill>
      )}

      {/* ── 12–15 1963: Malaysia forms around Brunei. "Brunei có vào không? Không. Vì dầu." ── */}
      <Question x={bx} y={by - 110} f={f} at={at("13", 0.1)} out={at("14")} s={1.6} />
      <BigGold text="KHÔNG" f={f} at={at("14")} out={at("15")} y={330} size={130} />
      <BigGold text="VÌ DẦU" f={f} at={at("15")} out={at("16")} y={330} size={130} />
      {f >= at("15") && f < at("16") + 4 && (
        <ImgSticker src={BARREL} x={bx} y={by - 70 - 80 * (1 - prog(f, at("15"), 8, Easing.in(Easing.quad)))} w={130} f={f} at={at("15")} out={at("16")} />
      )}

      {/* ── 16–17 two sides: the oil money to Kuala Lumpur after 10 years ↔ Brunei keeps it ── */}
      {f >= at("16") && f < at("18") && (() => {
        const go = prog(f, at("16", 0.2), 40, Easing.inOut(Easing.quad));
        const back = prog(f, at("17", 0.05), 18, Easing.inOut(Easing.quad));
        const t = go * (1 - back);
        return (
          <ImgSticker src={BAGS} x={interpolate(t, [0, 1], [bx, klx + 40])} y={interpolate(t, [0, 1], [by - 90, kly - 170])} w={200} f={f}
            at={at("16", 0.1)} out={at("18") - 4} />
        );
      })()}
      <DataCard value="10 NĂM" x={540} y={330} f={f} at={at("16", 0.4)} out={at("17")} />

      {/* ── 18 London, 1963: the Sultan at the table, the pen untouched ── */}
      {f >= at("18") - 4 && f < at("19") && (
        <AbsoluteFill style={{ backgroundColor: "rgba(16,26,36,0.62)", opacity: show(f, at("18") - 4, at("19") - 6) }}>
          <ImgSticker src={`${IMG}/b-05-negotiation-table.png`} x={640} y={860} w={480} f={f} at={at("18", 0.1)} />
          <PegImg src={`${IMG}/b-03-sultan-1963.png`} x={290} y={1150} h={380} f={f} at={at("18", 0.2)} />
        </AbsoluteFill>
      )}
      <YearRibbon text="1963" f={f} at={at("18", 0.05)} out={at("19") - 4} />

      {/* ── 19 today: GDP per person, same source, same year ── */}
      {f >= at("19") - 2 && f < at("20") && (() => {
        const o = show(f, at("19", 0.1), at("20") - 6);
        const scale = 520 / 33665;
        const bars = [
          [380, MALAYSIA, "malaysia", 12625, at("19", 0.25)],
          [700, BRUNEI, "brunei", 33665, at("19", 0.45)],
        ] as const;
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            {bars.map(([x, color, kind, v, a]) => {
              const h = v * scale * prog(f, a, 18, Easing.out(Easing.cubic));
              return (
                <g key={kind}>
                  <rect x={x - 90} y={1150 - h} width={180} height={h} rx={10} fill={color} stroke={ATLAS.ink} strokeWidth={6} />
                  <g style={{ translate: `${x - 34}px 1168px` }}><Flag kind={kind} w={68} f={f} /></g>
                  {f >= a && (
                    <text x={x} y={1130 - h} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={68} fill={ATLAS.gold}
                      stroke={ATLAS.ink} strokeWidth={12} paintOrder="stroke">
                      {`${count(f, a, 18, v)} $`}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        );
      })()}
      <MapLabel text="GDP / NGƯỜI · 2024" x={540} y={400} o={show(f, at("19", 0.2), at("20") - 6)} />

      {/* ── 20 [ĐÙA] to the other half by car: four checkpoints ── */}
      {f >= at("20") && f < at("21") && (() => {
        const o = 1 - prog(f, at("21") - 6, 4);
        // the car moves, stops at each checkpoint, moves on
        const stops = CHECKS.flatMap((c) => [c, c]);
        const keys = [0, ...stops, 1];
        const span = at("20", 0.9) - at("20", 0.1);
        const times = keys.map((_, i) => at("20", 0.1) + (span * i) / (keys.length - 1));
        const p = interpolate(f, times, keys, { ...CLAMP, easing: Easing.inOut(Easing.quad) });
        const [x, y] = routeHead(road, p);
        const passed = CHECKS.filter((c) => p >= c).length;
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <Track ps={road} p={1} color={ATLAS.white} w={6} o={0.7} />
            {CHECKS.map((c, i) => {
              const [cx, cy] = routeHead(road, c);
              return <ImgSticker key={i} src={`${IMG}/b-07-checkpoint.png`} x={cx + (i % 2 ? 60 : -60)} y={cy - 60} w={110} f={f} at={at("20", 0.05) + i * 3} />;
            })}
            <ImgSticker src={`${IMG}/b-06-car.png`} x={x} y={y - 30} w={110} f={f} at={at("20", 0.08)} />
            <DataCard value={`${passed} TRẠM`} x={540} y={330} f={f} at={at("20", 0.2)} />
          </AbsoluteFill>
        );
      })()}

      {/* ── 21–22 2020: the bridge across the bay, no Malaysia on the way ── */}
      <YearRibbon text="2020" f={f} at={at("21", 0.05)} out={at("22")} />
      {f >= at("21") && f < at("23", 0.6) && (() => {
        const o = 1 - prog(f, at("23", 0.5), 8);
        const p = prog(f, at("21", 0.15), 50, Easing.inOut(Easing.quad));
        const carP = prog(f, at("21", 0.7), 30, Easing.inOut(Easing.quad));
        const [mx, my] = routeHead(bridge, 0.5);
        const [cx, cy] = routeHead(bridge, carP);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <Track ps={bridge} p={p} color={ATLAS.ink} w={16} />
            <Track ps={bridge} p={p} color={ATLAS.white} w={9} />
            <ImgSticker src={`${IMG}/b-08-bridge.png`} x={mx} y={my - 70} w={230} f={f} at={at("21", 0.45)} />
            <ImgSticker src={`${IMG}/b-09-boat.png`} x={toScreen(cam, ...BOAT)[0] + 40 * prog(f, at("21"), 120)} y={toScreen(cam, ...BOAT)[1]} w={110} f={f} at={at("21", 0.2)} />
            {carP > 0 && <ImgSticker src={`${IMG}/b-06-car.png`} x={cx} y={cy - 34} w={90} f={f} at={at("21", 0.7)} />}
          </AbsoluteFill>
        );
      })()}
      <DataCard value="26+ KM" x={540} y={470} f={f} at={at("21", 0.45)} out={at("22")} />

      {/* ── 22–23 17/3/2020 … 17/3/1890: exactly 130 years ── */}
      <DataCard value="17/3/2020" x={540} y={470} f={f} at={at("22", 0.1)} out={at("23", 0.5)} color={ATLAS.white} />
      <DataCard value="17/3/1890" x={540} y={310} f={f} at={at("23", 0.05)} out={at("23", 0.5)} />
      <BigGold text="130 NĂM" f={f} at={at("23", 0.5)} out={END - 14} y={330} size={130} />
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Brunei từng làm chủ gần cả đảo *Borneo*.",
  "02": "Hôm nay, nó nhỏ hơn cả *TP.HCM*, và còn bị *cắt làm đôi*.",
  "03": "Thế kỷ *16*, vua Brunei kiểm soát gần hết bờ biển của đảo.",
  "05": "Năm *1841*, một người Anh tên James Brooke được trao vùng *Sarawak*.",
  "08": "Năm *1890*, Rajah Charles Brooke lấy luôn vùng *Limbang* nằm ngay giữa.",
  "11": "Năm *1929*, Brunei tìm thấy *dầu*.",
  "15": "Vì *dầu*.",
  "16": "Kuala Lumpur muốn sau *10 năm*, tiền dầu phải nộp về ngân sách chung.",
  "18": "Năm *1963*, ở Luân Đôn, Sultan Brunei ngồi ngay bàn đàm phán, nhưng *không đặt bút*.",
  "19": "Hôm nay, mỗi người Brunei làm ra gấp hơn *2,5 lần* người Malaysia.",
  "20": "Chỉ phiền là muốn lái xe sang nửa kia đất nước, phải qua *4 trạm* xuất nhập cảnh.",
  "21": "Năm *2020*, Brunei mở một cây cầu vượt biển nối hai nửa, không phải đi qua Malaysia.",
  "22": "Cây cầu mở cửa ngày *17/3*.",
  "23": "Đúng *130 năm*, tính tới từng ngày, sau khi Brunei bị cắt làm đôi.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SFX: SfxCue[] = [
  [CLICK, "01", 0.2], [THUD, "02", 0.45, 0, -18], [CLICK, "03", 0.1], [W, "04", 0.05],
  [CLICK, "05", 0.4], [CLICK, "06", 0.1], [CLICK, "06", 0.55], [CLICK, "07", 0.2],
  [W2, "08", 0, -4], [CLICK, "08", 0.55], [THUD, "09", 0.05, 0, -18], [CLICK, "11", 0.3],
  [W, "12", 0, -4], [CLICK, "13", 0.1], [THUD, "15", 0.25, 0, -18], [CLICK, "16", 0.2], [CLICK, "17", 0.05],
  [CLICK, "18", 0.2], [W2, "19", 0, -4], [W, "20", 0, -4], [W2, "21", 0.15], [CLICK, "22", 0.1], [CLICK, "23", 0.05],
];

export const P1BruneiChiaDoi: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p1-brunei-chia-doi/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P1} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p1BruneiChiaDoiDuration = (fps: number) => episodeDuration(timing, fps);
