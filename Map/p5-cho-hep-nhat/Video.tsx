/**
 * Atlas Tí Hon · P5 Kỳ lạ & kỷ lục · Region Reveal (style I Toy Atlas): "Chỗ hẹp nhất Việt Nam" (Lucas 2026-10-21).
 * Script + sources: kich-ban-p5-cho-hep-nhat-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 23; the last frame is the opening
 * frame (whole Vietnam by province, Hoàng Sa, Trường Sa, nothing highlighted).
 *
 * Map: provinces VN2024 (Natural Earth, Quảng Bình on its own) until the twist, VN2025 (Quảng Trị after
 * 1/7/2025) for the merger. The ruler is Luis's measurement on Natural Earth 1:10m (border ~17,285°N 106,286°E →
 * coast ~17,471°N 106,635°E, ≈ 42 km; the VO says "chưa đầy 50 km"). The 85 % hill tint, the three roads and the
 * mountain stickers are ILLUSTRATIVE; the ferry and the poet's notebook are generic props, not portraits.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p5-cho-hep-nhat.timing.json";
import words from "../../src/voiceover/p5-cho-hep-nhat.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type GeoCam, ImgSticker, MapLabel, pts, Pulse, Question, RegionFill,
  routeHead, seamKeys, show, Stamp, Sticker, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, flashAt, ProvinceMap, ProvinceTag, VN2024, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p5-cho-hep-nhat/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];
/** The narrowest crossing (Luis, Natural Earth 1:10m): Lao border → coast by Đồng Hới. */
const RA: LL = [106.286, 17.285];
const RB: LL = [106.635, 17.471];
const DONG_HOI: LL = [106.62, 17.47];
const NORTH: LL = [105.29, 23.37]; // northernmost point of the mainland
const SOUTH: LL = [104.86, 8.57]; // southernmost point of the mainland
const DIM_LON = 101.8; // the 1.650 km dimension line runs down west of the country (clear of the island labels)

/** Simplified coast through Quảng Bình (Natural Earth), north → south. */
const COAST: LL[] = [[106.1, 18.3], [106.4, 18.05], [106.47, 17.8], [106.6, 17.54], [106.8, 17.31], [107.11, 17.09], [107.38, 16.77], [107.64, 16.55]];
/** The coast pushed inland by d degrees (the coast runs NW → SE, so inland is WSW). */
const inland = (d: number): LL[] => COAST.map(([lo, la]) => [lo - 0.83 * d, la - 0.56 * d]);
const QL1 = inland(0.05);
const RAIL = inland(0.1);
const HCM = inland(0.24);
const HILLS: LL[] = [...inland(0.1), [104, 16.3], [104, 18.6]];
const STRIP: LL[] = [...inland(0.1), [108.6, 16.3], [108.6, 18.6]];

const VIEW = {
  vn: { lon: 108.6, lat: 16.2, zoom: 19 },
  eo: { lon: 106.42, lat: 17.38, zoom: 220 },
  dh: { lon: 106.58, lat: 17.43, zoom: 520 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): fly in on the narrow waist from frame 1
  { at: 1, ...VIEW.eo },
  { at: at("06") - 4, ...VIEW.vn },
  { at: at("08") - 4, ...VIEW.eo },
  { at: at("16") - 4, ...VIEW.dh },
  { at: at("20") - 4, ...VIEW.eo },
  { at: at("23", 0.4), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const GOLD = "#F3C64A";
const ROAD = "#9AA3AA";
const RAILC = "#6B4A33";
const HCMC = "#E8873A";

/** A measuring ruler from screen point b to a (drawn on with p), end caps across it, soft gold glow. */
const Ruler: React.FC<{ a: [number, number]; b: [number, number]; p: number; o?: number; w?: number; glow?: number; f: number }> = ({
  a, b, p, o = 1, w = 12, glow = 0.6, f,
}) => {
  if (o <= 0 || p <= 0) return null;
  const e: [number, number] = [b[0] + (a[0] - b[0]) * p, b[1] + (a[1] - b[1]) * p];
  const len = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1;
  const nx = (-(a[1] - b[1]) / len) * w * 1.6;
  const ny = ((a[0] - b[0]) / len) * w * 1.6;
  const cap = (q: [number, number]) => `M ${q[0] - nx} ${q[1] - ny} L ${q[0] + nx} ${q[1] + ny}`;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Track ps={[b, e]} p={1} color={ATLAS.gold} w={w} glow={glow} f={f} />
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <path d={cap(b) + (p >= 1 ? ` ${cap(a)}` : "")} stroke={ATLAS.ink} strokeWidth={w * 0.9 + 6} strokeLinecap="round" />
        <path d={cap(b) + (p >= 1 ? ` ${cap(a)}` : "")} stroke={ATLAS.gold} strokeWidth={w * 0.9} strokeLinecap="round" />
      </svg>
    </AbsoluteFill>
  );
};

/** Small chequered finish flag on a pole, base at (0, 0). */
const Finish: React.FC = () => (
  <g stroke={ATLAS.ink} strokeWidth={3}>
    <line x1={0} y1={0} x2={0} y2={-74} strokeWidth={5} />
    <rect x={0} y={-74} width={48} height={32} fill={ATLAS.white} />
    {[0, 1, 2, 3].map((i) => [0, 1].map((j) => ((i + j) % 2 === 0 ? (
      <rect key={`${i}-${j}`} x={i * 12} y={-74 + j * 16} width={12} height={16} fill={ATLAS.ink} stroke="none" />
    ) : null)))}
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);
  const a = S(RA);
  const b = S(RB);
  const dh = S(DONG_HOI);

  // the loop: all highlights go back before the last frame
  const tail = prog(f, at("23", 0.55), 12);

  // provinces: Quảng Bình gold from line 03; the merger floods the new Quảng Trị from Đồng Hới (21)
  const qbP = prog(f, at("03"), 14, ease) * (1 - prog(f, at("23", 0.5), 16));
  const qbFlash = flashAt(f, [at("03", 0.1), at("20", 0.5)]);
  const qtOldFlash = flashAt(f, [at("20", 0.5)]);
  const newO = Math.min(prog(f, at("21"), 8), 1 - tail);
  const newP = prog(f, at("21", 0.1), 34, ease);
  const qbTopO = 1 - prog(f, at("21", 0.75), 10);

  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2024} tag="p24" base={VN} lines={0.5} f={f}
        fills={qbP > 0 ? [{ name: "Quảng Bình", color: GOLD, wipe: { from: VN, lon: 106.5, lat: 17.45, p: qbP } }] : []}
        flash={[{ name: "Quảng Bình", v: qbFlash }, { name: "Quảng Trị", v: qtOldFlash }]} />
      {newO > 0 && (
        <>
          <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} o={newO}
            fills={[{ name: "Quảng Trị", color: GOLD, wipe: { from: VN, lon: DONG_HOI[0], lat: DONG_HOI[1], p: newP } }]}
            flash={[{ name: "Quảng Trị", v: flashAt(f, [at("21", 0.35)]) }]} />
          {qbTopO > 0 && (
            <ProvinceMap z={z} set={VN2024.filter((p) => p.name === "Quảng Bình")} tag="qbtop" base={GOLD} lines={0} f={f} o={newO * qbTopO} />
          )}
        </>
      )}
    </>
  );

  // the ruler: 01–05 big, 06–07 tiny on the whole country, 16 at Đồng Hới, 22–23 one last glow
  const rulerP = prog(f, at("01", 0.2), 34, ease);
  const rulerO = Math.max(
    show(f, at("01", 0.2), at("08") - 4),
    0.55 * show(f, at("13"), at("16") - 4),
    show(f, at("16"), at("17", 0.2)),
    show(f, at("22"), at("23", 0.75)),
  );
  const rulerGlow = 0.5 + 0.5 * Math.max(flashAt(f, [at("06", 0.2), at("16", 0.2), at("23", 0.05)]), 0);

  // 04–05 the runner: sea end → Lao border, a wobble at the finish
  const runP = interpolate(f, [at("05", 0.1), at("05", 0.8)], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.quad) });
  const runO = Math.min(prog(f, at("04", 0.1), 6), 1 - prog(f, at("06") - 6, 5));
  const runX = b[0] + (a[0] - b[0]) * runP;
  const runY = b[1] + (a[1] - b[1]) * runP;
  const wobble = runP >= 1 ? 7 * Math.sin((f - at("05", 0.8)) / 2.2) * (1 - prog(f, at("05", 0.8) + 16, 10)) : 0;

  // 06–07 the 1.650 km dimension line, then 33 rulers stacked along it
  const nTop = S([DIM_LON, NORTH[1]]);
  const nBot = S([DIM_LON, SOUTH[1]]);
  const dimO = Math.min(prog(f, at("06", 0.15), 6), 1 - prog(f, at("08") - 6, 6));
  const dimP = prog(f, at("06", 0.2), 34, ease);
  const stackN = Math.floor(33 * prog(f, at("07", 0.05), Math.max(1, at("07", 0.8) - at("07", 0.05))));

  // 09–11 Trường Sơn presses east; 85 % hills
  const mtO = Math.min(prog(f, at("09"), 5), 1 - prog(f, at("12") - 4, 6));
  const press = 40 * prog(f, at("10", 0.1), 60, ease);
  const hillO = Math.min(prog(f, at("11", 0.1), 10), 1 - prog(f, at("12") + 4, 8));

  // 13–15 three roads squeeze through one waist; 15 wartime greys the map
  const roadO = Math.min(prog(f, at("13"), 6), 1 - prog(f, at("16") - 6, 6));
  const roadP = prog(f, at("13", 0.1), 40, ease);
  const greyO = 0.42 * Math.min(prog(f, at("15", 0.05), 10), 1 - prog(f, at("16") - 2, 8));
  const ql1 = pts(cam, QL1);
  const rail = pts(cam, RAIL);
  const moveP = prog(f, at("14"), at("16") - at("14"));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [22, 30], [1, 0], CLAMP)} />

      {/* ── 11 the hills (85 %, illustrative tint) ── */}
      <RegionFill cam={cam} id="hills" country="Vietnam" ring={HILLS} fill="#6E5236" o={hillO * 0.6} stroke="transparent" />
      <RegionFill cam={cam} id="strip" country="Vietnam" ring={STRIP} fill="#5FA35A" o={hillO * 0.6} stroke="transparent" />

      {/* ── 13–15 roads (schematic) ── */}
      {roadO > 0 && (
        <>
          <Track ps={pts(cam, HCM)} p={roadP} color={HCMC} w={9} o={roadO} />
          <Track ps={rail} p={roadP} color={RAILC} w={8} o={roadO} />
          <Track ps={ql1} p={roadP} color={ROAD} w={9} o={roadO} />
        </>
      )}
      {f >= at("14") && roadO > 0 && (() => {
        const t = routeHead(ql1, 0.22 + 0.3 * moveP);
        const r = routeHead(rail, 0.6 - 0.35 * moveP);
        return (
          <AbsoluteFill style={{ opacity: roadO }}>
            <ImgSticker src={`${OLD}/p1-tay-nguyen-co-bien/cut/g-02-produce-truck.png`} x={t[0] + 40} y={t[1] - 50} w={160} f={f} at={at("14")} />
            <ImgSticker src={`${OLD}/p2-duong-sat-cao-toc/cut/p-02-old-train.png`} x={r[0] - 90} y={r[1] + 35} w={200} f={f} at={at("14", 0.2)} />
          </AbsoluteFill>
        );
      })()}
      <AbsoluteFill style={{ backgroundColor: "#22262C", opacity: greyO }} />
      {greyO > 0 && [[106.5, 17.62], [106.68, 17.38], [106.42, 17.32]].map(([lo, la], i) => {
        const [x, y] = S([lo, la]);
        return <Pulse key={i} x={x} y={y} f={f + i * 13} color={ATLAS.red} period={36} o={greyO / 0.42} />;
      })}

      {/* ── 09–10 Trường Sơn ── */}
      {mtO > 0 && ([[106.02, 17.42], [106.36, 16.98]] as LL[]).map(([lo, la], i) => {
        const [x, y] = S([lo, la]);
        return (
          <AbsoluteFill key={i} style={{ opacity: mtO }}>
            <ImgSticker src={`${IMG}/n-02-mountain-range.png`} x={x + press} y={y} w={380} f={f} at={at("09") + i * 4} />
          </AbsoluteFill>
        );
      })}
      <MapLabel text="DÃY TRƯỜNG SƠN" x={CX} y={1210} o={show(f, at("09", 0.2), at("10", 0.5))} size={56} />

      {/* ── the ruler ── */}
      <Ruler a={a} b={b} p={rulerP} o={rulerO} w={cam.zoom > 100 ? 12 : 6} glow={rulerGlow} f={f} />

      {/* ── 01–03 hook: < 50 km from the sea to Laos; where? Quảng Bình ── */}
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={[105.92, 16.98]} from={at("01", 0.5)}
        o={Math.max(show(f, at("01", 0.5), at("06") - 4), show(f, at("10", 0.2), at("12")))} glow={[at("01", 0.6), at("05", 0.5)]} />
      <DataCard value="< 50 KM" label="BIỂN → BIÊN GIỚI" x={CX} y={330} f={f} at={at("01", 0.6)} out={at("04")} size={96} />
      <Question x={(a[0] + b[0]) / 2 + 30} y={(a[1] + b[1]) / 2 - 110} f={f} at={at("02")} out={at("03", 0.3)} s={1.2} />
      <ProvinceTag cam={cam} f={f} label="QUẢNG BÌNH" anchor={[106.2, 17.64]} from={at("03")} o={show(f, at("03"), at("04", 0.6))} size={56} />

      {/* ── 04–05 a marathon; [ĐÙA] beach in the morning, the border by noon ── */}
      <DataCard value="≈ 1 MARATHON" x={CX} y={330} f={f} at={at("04", 0.55)} out={at("06") - 4} size={84} />
      <Sticker x={a[0]} y={a[1]} f={f} at={at("04", 0.3)} out={at("06") - 4} s={1}>
        <Finish />
      </Sticker>
      <ImgSticker src={`${OLD}/p1-tay-nguyen-co-bien/cut/g-04-beach.png`} x={b[0] + 95} y={b[1] - 70} w={150} f={f} at={at("05")} out={at("06") - 4} />
      {runO > 0 && (
        <Img src={staticFile(`${IMG}/n-01-runner.png`)} style={{
          position: "absolute", left: runX, top: runY - 150 - Math.abs(10 * Math.sin(f / 3)) * (runP > 0 && runP < 1 ? 1 : 0.2), height: 160,
          translate: "-50% 0", scale: "-1 1", rotate: `${wobble}deg`, transformOrigin: "50% 100%", opacity: runO,
        }} />
      )}

      {/* ── 06–07 1.650 km north → south, more than 30 times the waist ── */}
      {dimO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: dimO }}>
          {[[NORTH, nTop], [SOUTH, nBot]].map(([ll, end], i) => {
            const [x, y] = S(ll as LL);
            return <line key={i} x1={x} y1={y} x2={(end as number[])[0]} y2={(end as number[])[1]} stroke={ATLAS.white} strokeWidth={3}
              strokeDasharray="8 8" opacity={0.8 * dimP} />;
          })}
          <line x1={nTop[0]} y1={nTop[1]} x2={nTop[0]} y2={nTop[1] + (nBot[1] - nTop[1]) * dimP} stroke={ATLAS.ink} strokeWidth={16} strokeLinecap="round" />
          <line x1={nTop[0]} y1={nTop[1]} x2={nTop[0]} y2={nTop[1] + (nBot[1] - nTop[1]) * dimP} stroke={ATLAS.gold} strokeWidth={9} strokeLinecap="round" />
          {Array.from({ length: stackN }, (_, i) => {
            const y0 = nTop[1] + ((nBot[1] - nTop[1]) * i) / 33;
            const y1 = nTop[1] + ((nBot[1] - nTop[1]) * (i + 1)) / 33;
            return (
              <g key={i}>
                <line x1={nTop[0]} y1={y0 + 1.5} x2={nTop[0]} y2={y1 - 1.5} stroke={i % 2 ? ATLAS.white : ATLAS.red} strokeWidth={16} />
                <line x1={nTop[0] - 16} y1={y0} x2={nTop[0] + 16} y2={y0} stroke={ATLAS.ink} strokeWidth={3} />
              </g>
            );
          })}
        </svg>
      )}
      <DataCard value="1.650 KM" label="BẮC → NAM" x={CX} y={330} f={f} at={at("06", 0.35)} out={at("07")} size={96} />
      <DataCard value="GẤP 30+ LẦN" x={CX} y={330} f={f} at={at("07", 0.1)} out={at("08") - 4} size={90} />

      {/* ── 08–11 what squeezes it? Trường Sơn; 85 % hills ── */}
      <Question x={(a[0] + b[0]) / 2} y={(a[1] + b[1]) / 2 - 60} f={f} at={at("08", 0.1)} out={at("09", 0.2)} s={1.2} />
      <DataCard value="85%" label="ĐỒI NÚI" x={CX} y={330} f={f} at={at("11", 0.3)} out={at("12")} size={100} />

      {/* ── 15 wartime ── */}
      <YearRibbon text="THỜI CHIẾN" f={f} at={at("15", 0.1)} out={at("16") - 2} />

      {/* ── 16–19 Đồng Hới, Nhật Lệ; [NGƯỜI] Mẹ Suốt; Tố Hữu 1965 ── */}
      <CityPin cam={cam} f={f} label="ĐỒNG HỚI" at={DONG_HOI} from={at("16", 0.1)} o={show(f, at("16", 0.1), at("17"))} side="above" />
      <MapLabel text="SÔNG NHẬT LỆ" x={Math.min(820, dh[0] + 120)} y={dh[1] - 120} o={show(f, at("16", 0.45), at("17"))} size={50} />
      <AbsoluteFill style={{ backgroundColor: "#16202A", opacity: 0.4 * Math.min(prog(f, at("17"), 10), 1 - prog(f, at("20") - 4, 8)) }} />
      {f >= at("17") && f < at("19") + 6 && (() => {
        const p = prog(f, at("17", 0.1), at("19") - at("17", 0.1));
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("19"), 6) }}>
            <ImgSticker src={`${IMG}/n-03-ferry-mother.png`} x={interpolate(p, [0, 1], [400, 640])} y={1000} w={520} f={f} at={at("17", 0.05)} />
          </AbsoluteFill>
        );
      })()}
      <MapLabel text="MẸ SUỐT" x={CX} y={1290} o={show(f, at("18", 0.05), at("19"))} size={60} />
      <YearRibbon text="1965" f={f} at={at("19", 0.1)} out={at("20") - 2} />
      <ImgSticker src={`${IMG}/n-04-poem-notebook.png`} x={CX} y={980} w={430} f={f} at={at("19", 0.15)} out={at("20") - 2} />
      <MapLabel text="TỐ HỮU" x={CX} y={1290} o={show(f, at("19", 0.3), at("20") - 2)} size={60} />

      {/* ── 20–23 [TWIST] not on the administrative map any more; the new capital is Đồng Hới ── */}
      <YearRibbon text="1/7/2025" f={f} at={at("20", 0.15)} out={at("21")} />
      <Stamp text="SÁP NHẬP" x={CX} y={470} f={f} at={at("21", 0.05)} out={at("22")} />
      <ProvinceTag cam={cam} f={f} label="QUẢNG TRỊ" anchor={[106.62, 17.0]} from={at("21", 0.4)} o={show(f, at("21", 0.4), at("23", 0.3))} size={56} />
      <CityPin cam={cam} f={f} label="TỈNH LỴ ĐỒNG HỚI" at={DONG_HOI} from={at("22", 0.15)} o={show(f, at("22", 0.15), at("23", 0.3))}
        side="above" color={ATLAS.red} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Có một chỗ, từ biển sang tới biên giới Lào chưa đầy *50 km*.",
  "03": "*Quảng Bình*.",
  "04": "Hình dung thế này: chưa đầy 50 km, gần bằng một đường chạy *marathon*.",
  "06": "Trong khi từ bắc vào nam, đất liền Việt Nam dài khoảng *1.650 km*.",
  "07": "Dài gấp hơn *30 lần* chỗ hẹp nhất.",
  "09": "*Dãy Trường Sơn*.",
  "11": "Đất dốc từ tây sang đông, khoảng *85%* là đồi núi.",
  "17": "Ở bến đò bên sông, có một bà mẹ *60 tuổi* vẫn chèo đò.",
  "18": "*Mẹ Suốt* đưa bộ đội, thương binh, vũ khí qua sông, ngay giữa những trận bom.",
  "19": "Năm *1965*, nhà thơ *Tố Hữu* gặp mẹ, rồi viết một bài thơ mang tên mẹ.",
  "20": "Nhưng từ tháng 7 năm *2025*, tỉnh Quảng Bình không còn trên bản đồ hành chính.",
  "23": "Tên tỉnh có thể đổi, còn Việt Nam vẫn *thắt lại* ở đúng chỗ ấy.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const STAMP = "hit/punch-impact-hit-567196.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [W2, "01", 0, -1], [CLICK, "03", 0.1], [CLICK, "05", 0.15], [W, "06", 0, -4], [THUD, "07", 0.3, 0, -18],
  [W2, "08", 0, -4], [CLICK, "09", 0.1], [W, "13", 0.05], [THUD, "15", 0.2, 0, -24], [W2, "16", 0, -4],
  [PEN, "19", 0.2], [STAMP, "21", 0.05, 0, -20], [CLICK, "22", 0.2],
];

/** Music duck: the bed dips under Mẹ Suốt (16–19). */
const musicDuck = (f: number) => interpolate(f, [at("16") - 6, at("16") + 10, at("19", 1) - 4, at("20") + 6], [1, 0.4, 0.4, 1], CLAMP);

export const P5ChoHepNhat: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p5-cho-hep-nhat/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P5} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p5ChoHepNhatDuration = (fps: number) => episodeDuration(timing, fps);
