/**
 * Map channel · P3 Địa lý giải thích hiện tượng · Cause-and-Effect (style I Toy Atlas):
 * "Miền Tây đang chìm nhanh hơn nước biển dâng".
 * Script + sources: kich-ban-p3-dbscl-sut-lun-FINAL.md (v2), cong-2_so-nguon.md, kich-ban-v2-de-xuat.md. Beats: beat-sheet.md.
 * v1 lives in ./v1. v2 (Lucas 2026-10-15): the 7 script rules; the old-elevation error is the satellite
 * datum (Utrecht), not "the sea near Hà Nội" as v1 said.
 * Every cue comes from the VO timing. Soft loop (Lucas 2026-10-14): the VO ends on line 26; the last
 * frame is the opening frame (whole-Vietnam view, nothing else).
 *
 * Map rules: Hoàng Sa + Trường Sa in Vietnam's colour with labels whenever the whole coast is in
 * frame; the delta outline, river course and salt band are ILLUSTRATIVE (Lucas 2026-10-13, option A).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p3-dbscl-sut-lun.timing.json";
import words from "../../src/voiceover/p3-dbscl-sut-lun.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, DataCard, type Fill, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Question, RegionFill, routeHead, seamKeys, show, Stamp, Sticker, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p3-dbscl-sut-lun/cut";
const { at } = beats(timing, FPS);

const VIEW = {
  vn: { lon: 109.8, lat: 14.8, zoom: 19 },
  delta: { lon: 105.65, lat: 9.85, zoom: 110 },
  mekong: { lon: 105.6, lat: 12.4, zoom: 38 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  { at: at("03") - 4, ...VIEW.delta },
  { at: at("20", 0.2), ...VIEW.mekong },
  { at: at("23") - 4, ...VIEW.delta },
  { at: at("26", 0.8), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
// loop seam: the last frame lands exactly on the opening framing
const KEYS = seamKeys(KEYS0, episodeDuration(timing, FPS), PUSH, PUSH_CAP);

const VN = ATLAS.c;
const FILLS: Fill[] = ["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN }));
const RICE = "#7DBF4A";
const SOIL = "#8A5A2E";
const SEA_BLUE = "#7EC8F0";
const SALT = "#EAF8FF";

/** Illustrative outline of the Mekong delta (Vietnamese part); clipped to land by RegionFill. */
const DELTA: [number, number][] = [
  [104.45, 10.45], [105.1, 10.98], [105.6, 10.95], [106.45, 10.9], [106.95, 10.45], [106.75, 9.85], [106.35, 9.5],
  [105.95, 9.2], [105.4, 8.75], [104.7, 8.5], [104.75, 9.3], [104.9, 9.95],
];
/** Illustrative coastal band reached by salt water in the dry season (two depths). */
const SALT_NEAR: [number, number][] = [
  [106.95, 10.45], [106.55, 10.35], [106.15, 9.85], [105.75, 9.5], [105.2, 9.15], [104.95, 8.95], [105.05, 9.5],
  [104.9, 9.95], [104.6, 9.6], [104.6, 8.4], [107.1, 8.4], [107.1, 10.6],
];
const SALT_FAR: [number, number][] = [
  [106.95, 10.6], [106.35, 10.55], [105.85, 10.05], [105.45, 9.75], [105.1, 9.55], [105.25, 10.05], [104.85, 10.3],
  [104.4, 10.2], [104.4, 8.4], [107.1, 8.4], [107.1, 10.8],
];
/** Schematic Mekong course: Pakse → Stung Treng → Kratie → Phnom Penh → Tân Châu → mouths. */
const MEKONG: [number, number][] = [
  [105.8, 15.1], [105.97, 13.52], [106.02, 12.49], [104.92, 11.56], [105.2, 10.8], [105.9, 10.27], [106.6, 9.95],
];
const DELTA_C: [number, number] = [105.6, 9.9];


/** A measuring stick filled from the bottom (fill = p of its height). */
const Ruler: React.FC<{ x: number; y: number; h: number; p: number; color: string; o: number }> = ({ x, y, h, p, color, o }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
    <rect x={x - 40} y={y - h} width={80} height={h} rx={10} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
    <rect x={x - 34} y={y - h * p} width={68} height={h * p} rx={6} fill={color} />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={x - 40} y1={y - (h * i) / 10} x2={x - (i % 5 ? 22 : 8)} y2={y - (h * i) / 10} stroke={ATLAS.ink} strokeWidth={4} />
    ))}
  </svg>
);

/** Ground cross-section: pumping drains the aquifer, the layers compact, the house sinks. */
const SoilCard: React.FC<{ f: number; at: number; out: number; squeeze: number }> = ({ f, at: a, out, squeeze }) => {
  if (f < a - 2 || f > out + 6) return null;
  const o = Math.min(prog(f, a, 6), 1 - prog(f, out, 6));
  const X0 = 120;
  const W = 760;
  const TOP = 1000;
  const drop = 34 * squeeze;
  // layers from the surface down (heights shrink as the aquifer is drained)
  const top = 50;
  const clay = 60 - 10 * squeeze;
  const aqu = 80 - 24 * squeeze;
  const ground = TOP + 70 + drop;
  const yClay = ground + top;
  const yAqu = yClay + clay;
  const yDeep = yAqu + aqu;
  const pipeX = X0 + W * 0.5;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={X0 - 30} y={TOP - 20} width={W + 60} height={330} rx={28} fill="rgba(22,32,40,0.86)" stroke={ATLAS.gold} strokeWidth={5} />
      <clipPath id="soil-clip"><rect x={X0} y={TOP} width={W} height={290} rx={14} /></clipPath>
      <g clipPath="url(#soil-clip)">
        <rect x={X0} y={TOP} width={W} height={300} fill="#BFE3F2" />
        {/* the old ground level, for comparison */}
        <line x1={X0} y1={TOP + 70} x2={X0 + W} y2={TOP + 70} stroke={ATLAS.white} strokeWidth={4} strokeDasharray="12 8" opacity={squeeze > 0 ? 1 : 0} />
        <rect x={X0} y={ground} width={W} height={top} fill="#6F8F4E" />
        <rect x={X0} y={yClay} width={W} height={clay} fill="#A0784A" />
        <rect x={X0} y={yAqu} width={W} height={aqu} fill="#D9C08A" />
        {/* water in the aquifer: dots fade as it is pumped out */}
        {Array.from({ length: 30 }, (_, i) => (
          <circle key={i} cx={X0 + 20 + ((i * 53) % (W - 40))} cy={yAqu + 12 + ((i * 29) % Math.max(10, aqu - 24))} r={6}
            fill="#3D8FD0" opacity={1 - squeeze * (i % 3 === 0 ? 0.4 : 1)} />
        ))}
        <rect x={X0} y={yDeep} width={W} height={200} fill="#7A5A3A" />
        {/* the pump pipe, water rising */}
        <rect x={pipeX - 9} y={ground - 40} width={18} height={yAqu + aqu / 2 - ground + 40} fill="#8C979B" stroke={ATLAS.ink} strokeWidth={3} />
        {[0, 1, 2].map((i) => {
          const t = ((f - a) / 24 + i / 3) % 1;
          return <circle key={i} cx={pipeX} cy={yAqu + aqu / 2 - t * (yAqu + aqu / 2 - ground + 40)} r={6} fill="#3D8FD0" />;
        })}
        {/* house on top */}
        <g style={{ translate: `${X0 + W * 0.22}px ${ground}px` }}>
          <rect x={-46} y={-56} width={92} height={56} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={4} />
          <path d="M -58 -54 L 0 -96 L 58 -54 Z" fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={4} />
          <rect x={-12} y={-30} width={24} height={30} fill="#8A5A2B" />
        </g>
      </g>
      {/* the drop, measured on the right */}
      <line x1={X0 + W + 14} y1={TOP + 70} x2={X0 + W + 14} y2={ground} stroke={ATLAS.gold} strokeWidth={8} strokeLinecap="round" opacity={squeeze > 0.05 ? 1 : 0} />
      <text x={X0 + W - 20} y={TOP + 44} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>NƯỚC NGẦM</text>
    </svg>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [22, 30], [1, 0], CLAMP);
  const [dx, dy] = toScreen(cam, ...DELTA_C);

  // delta highlight: pulse in the hook, rice-green from line 03, fades for the loop frame
  const deltaO = Math.max(
    show(f, at("02"), at("03")) * (0.5 + 0.4 * Math.sin(f / 4)),
    Math.min(prog(f, at("03", 0.2), 14), 1 - prog(f, at("26", 0.75), 10)),
  );
  // sinking + salt band (23–24)
  const sink = prog(f, at("23", 0.05), 30);
  const saltNear = Math.min(prog(f, at("23", 0.25), 20), 1 - prog(f, at("26"), 10));
  const saltFar = Math.min(prog(f, at("23", 0.6), 30), 1 - prog(f, at("26"), 10));

  // Mekong sediment: 24 grains flowing; the dam lets only every other one through
  const river = pts(cam, MEKONG);
  const riverO = Math.min(prog(f, at("20", 0.4), 8), 1 - prog(f, at("23"), 8));
  const damOn = f >= at("21", 0.15);
  const pDam = 0.14;
  const pDredge = 0.62;

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={islandsO} />
      <RegionFill cam={cam} id="delta" country="Vietnam" ring={DELTA} fill={RICE} o={deltaO * (1 - 0.35 * sink)} />
      {sink > 0 && <RegionFill cam={cam} id="sink" country="Vietnam" ring={DELTA} fill="#2C5476" o={0.35 * sink * (1 - prog(f, at("26", 0.75), 10))} dash="1 0" />}
      <RegionFill cam={cam} id="salt1" country="Vietnam" ring={SALT_NEAR} fill={SALT} o={0.7 * saltNear} dash="1 0" />
      <RegionFill cam={cam} id="salt2" country="Vietnam" ring={SALT_FAR} fill={SALT} o={0.55 * saltFar} dash="1 0" />

      {/* ── 01–02 hook ── */}
      <BigGold text="NƯỚC BIỂN DÂNG?" f={f} at={at("01", 0.1)} out={at("02")} y={330} size={100} color={ATLAS.white} />
      <BigGold text="LÚN CÒN NHANH HƠN" f={f} at={at("02", 0.3)} out={at("03")} y={330} size={80} />
      {f >= at("02") && f < at("03") && (
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {[-60, 0, 60].map((ox, i) => {
            const y = dy - 120 + 22 * ((((f - at("02")) / 20) + i * 0.3) % 1);
            return (
              <path key={i} d={`M ${dx + ox} ${y} l 0 46 m -18 -18 l 18 18 l 18 -18`} stroke={ATLAS.white} strokeWidth={9} fill="none"
                strokeLinecap="round" strokeLinejoin="round" opacity={prog(f, at("02", 0.2) + i * 4, 5)} />
            );
          })}
        </svg>
      )}

      {/* ── 03–05 the rice bowl, 80 cm ── */}
      <ImgSticker src={`${IMG}/d-02-rice.png`} x={dx + 120} y={dy - 60} w={260} f={f} at={at("03", 0.45)} out={at("04", 0.4)} />
      <MapLabel text="VỰA LÚA" x={dx - 150} y={dy - 160} o={show(f, at("03", 0.5), at("04", 0.4))} size={60} />
      <DataCard value="~80 CM" label="CAO HƠN MẶT BIỂN" x={540} y={330} f={f} at={at("04", 0.45)} out={at("06", 0.15)} />
      {f >= at("05") - 4 && f < at("06") + 4 && (
        <>
          <PegImg src={`${IMG}/d-09-farmer.png`} x={540} y={1120} h={330} f={f} at={at("05") - 4} o={1 - prog(f, at("06"), 4)} />
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("05", 0.25), 8), 1 - prog(f, at("06"), 4)) }}>
            {/* water up to just below the hip */}
            <path d={`M 360 ${1120 - 115 * prog(f, at("05", 0.25), 14)} q 45 -12 90 0 t 90 0 t 90 0 t 90 0 L 720 1124 L 360 1124 Z`}
              fill={SEA_BLUE} opacity={0.55} stroke={ATLAS.white} strokeWidth={4} />
          </svg>
        </>
      )}

      {/* ── 06 [NGƯỜI] 2019: Philip Minderhoud recomputes the delta from field measurements ── */}
      <YearRibbon text="2019" f={f} at={at("06", 0.1)} out={at("07")} />
      <PegImg src={`${IMG}/d-10-researcher.png`} x={300} y={1150} h={320} f={f} at={at("06", 0.15)} o={1 - prog(f, at("07"), 4)} />
      {f >= at("06") && f < at("07") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("07") - 4, 4) }}>
          {Array.from({ length: 14 }, (_, i) => {
            const [x, y] = toScreen(cam, 104.9 + ((i * 37) % 19) / 10, 9.0 + ((i * 23) % 17) / 10);
            return <circle key={i} cx={x} cy={y} r={9 * prog(f, at("06", 0.3) + i * 3, 5)} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />;
          })}
        </svg>
      )}

      {/* ── 07–10 the old figure, "Sai ở đâu? Ở cái thước.", the satellite datum ── */}
      <BigGold text="2,5 M?" f={f} at={at("07", 0.4)} out={at("10")} y={500} size={130} />
      <Question x={820} y={340} f={f} at={at("08")} out={at("09")} s={1.5} />
      <Stamp text="SAI" x={620} y={500} f={f} at={at("09", 0.1)} out={at("10")} />
      {f >= at("10") && f < at("11") && (
        <AbsoluteFill style={{ opacity: Math.min(prog(f, at("10"), 5), 1 - prog(f, at("11") - 4, 4)) }}>
          <Sticker x={760} y={520} f={f} at={at("10")} s={1.3}>
            {/* satellite */}
            <rect x={-26} y={-20} width={52} height={40} rx={6} fill="#C9D3D6" stroke={ATLAS.ink} strokeWidth={5} />
            <rect x={-96} y={-14} width={60} height={28} fill="#3D6FD0" stroke={ATLAS.ink} strokeWidth={4} />
            <rect x={36} y={-14} width={60} height={28} fill="#3D6FD0" stroke={ATLAS.ink} strokeWidth={4} />
            <circle cx={0} cy={30} r={8} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />
          </Sticker>
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            {/* the satellite's reference line sits above the real sea level */}
            <line x1={140} y1={dy - 40} x2={940} y2={dy - 40} stroke={ATLAS.gold} strokeWidth={6} strokeDasharray="16 10" opacity={prog(f, at("10", 0.3), 6)} />
            <line x1={140} y1={dy + 70} x2={940} y2={dy + 70} stroke={SEA_BLUE} strokeWidth={8} opacity={prog(f, at("10", 0.45), 6)} />
          </svg>
          <MapLabel text="MỐC LỆCH" x={540} y={dy - 70} o={show(f, at("10", 0.3))} />
        </AbsoluteFill>
      )}

      {/* ── 11–15 two speeds: sea +3,7 mm/năm vs land −~11 mm/năm ── */}
      {f >= at("11") && f < at("16") + 6 && (() => {
        const o = Math.min(prog(f, at("11", 0.3), 8), 1 - prog(f, at("16"), 5));
        return (
          <>
            <Ruler x={330} y={1180} h={420} p={(3.7 / 11) * prog(f, at("12", 0.2), 24)} color={SEA_BLUE} o={o} />
            <Ruler x={750} y={1180} h={420} p={prog(f, at("13", 0.2), 30)} color={SOIL} o={o} />
          </>
        );
      })()}
      <BigGold text="3,7 MM / NĂM" f={f} at={at("12", 0.3)} out={at("16")} x={330} y={720} size={56} color={SEA_BLUE} />
      <BigGold text="~11 MM / NĂM" f={f} at={at("13", 0.4)} out={at("14")} x={750} y={720} size={56} />
      <BigGold text="> 25 MM" f={f} at={at("14", 0.2)} out={at("16")} x={750} y={720} size={56} />
      <BigGold text="× 3" f={f} at={at("15", 0.15)} out={at("16")} y={420} size={150} />
      {/* 16 [ĐÙA]: the sea has not even arrived, the land goes down to meet it */}
      {f >= at("16") && f < at("17") && (() => {
        const t = prog(f, at("16", 0.1), at("16", 0.9) - at("16", 0.1), Easing.inOut(Easing.quad));
        const o = 1 - prog(f, at("17") - 4, 4);
        const land = interpolate(t, [0, 1], [760, 900]);
        const wave = interpolate(t, [0, 1], [1100, 960]);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
            <rect x={390} y={land - 70} width={300} height={70} rx={10} fill={SOIL} stroke={ATLAS.ink} strokeWidth={5} />
            <path d={`M 390 ${land - 70} l 20 -18 l 40 0 l 0 18`} fill={RICE} stroke={ATLAS.ink} strokeWidth={4} />
            <path d={`M 380 ${wave} q 40 -24 80 0 t 80 0 t 80 0 t 80 0 L 700 ${wave + 60} L 380 ${wave + 60} Z`} fill={SEA_BLUE} stroke={ATLAS.white} strokeWidth={4} />
            <path d={`M 540 ${land + 20} l 0 ${Math.max(0, wave - land - 50)}`} stroke={ATLAS.white} strokeWidth={8} strokeDasharray="10 8" />
          </svg>
        );
      })()}

      {/* ── 17–19 culprit 1: groundwater ── */}
      <BigGold text="THỦ PHẠM SỐ 1" f={f} at={at("17", 0.05)} out={at("18")} y={330} size={100} />
      <PegImg src={`${IMG}/d-01-farmer-pump.png`} x={540} y={1150} h={360} f={f} at={at("17", 0.4)} o={1 - prog(f, at("18"), 4)} />
      <SoilCard f={f} at={at("18")} out={at("20")} squeeze={prog(f, at("18", 0.4), 50, Easing.inOut(Easing.quad))} />
      <DataCard value="−18 CM" label="RIÊNG NƯỚC NGẦM" x={540} y={600} f={f} at={at("19", 0.55)} out={at("20")} />

      {/* ── 20–22 culprit 2: sediment ── */}
      <BigGold text="THỦ PHẠM SỐ 2" f={f} at={at("20", 0.05)} out={at("21")} y={330} size={100} />
      {riverO > 0 && (
        <>
          <Track ps={river} p={prog(f, at("20", 0.5), 20)} color="#5FA8D3" w={12} o={riverO} />
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: riverO }}>
            {Array.from({ length: 24 }, (_, i) => {
              const p = ((f - at("20")) / 110 + i / 24) % 1;
              // after the dam, only every other grain gets through
              if (damOn && i % 2 === 0 && p > pDam + 0.01) return null;
              const [x, y] = routeHead(river, p);
              return <circle key={i} cx={x} cy={y} r={9} fill="#C79A55" stroke={ATLAS.ink} strokeWidth={2} />;
            })}
          </svg>
          {(() => {
            const [ax, ay] = routeHead(river, pDam);
            const [bx, by] = routeHead(river, pDredge);
            return (
              <>
                <ImgSticker src={`${IMG}/d-04-dam.png`} x={ax + 150} y={ay} w={220} f={f} at={at("21", 0.1)} />
                <ImgSticker src={`${IMG}/d-05-sand-dredger.png`} x={bx - 170} y={by + 10} w={240} f={f} at={at("21", 0.55)} />
              </>
            );
          })()}
        </>
      )}
      <DataCard value="~ ½" label="PHÙ SA VỀ ĐỒNG BẰNG" x={540} y={330} f={f} at={at("22", 0.15)} out={at("23")} />

      {/* ── 23–24 lower delta, salt creeps in; 2020 ── */}
      {f >= at("23") && f < at("24") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("23", 0.05), 6), 1 - prog(f, at("23", 0.6), 6)) }}>
          {[-180, 0, 180].map((ox, i) => {
            const y = dy - 60 + 26 * ((((f - at("23")) / 20) + i * 0.3) % 1);
            return (
              <path key={i} d={`M ${dx + ox} ${y} l 0 50 m -20 -20 l 20 20 l 20 -20`} stroke={ATLAS.white} strokeWidth={10} fill="none"
                strokeLinecap="round" strokeLinejoin="round" />
            );
          })}
        </svg>
      )}
      <ImgSticker src={`${IMG}/d-06-dry-field.png`} x={dx - 40} y={dy - 140} w={300} f={f} at={at("24", 0.2)} out={at("25")} />
      <YearRibbon text="2020" f={f} at={at("24", 0.25)} out={at("25")} />

      {/* ── 25–26 twist: "Và cú ngược đời?" the fresh water under our feet ── */}
      <Question x={540} y={520} f={f} at={at("25", 0.05)} out={at("26")} s={1.6} />
      {f >= at("26") - 2 && f < at("26", 0.8) && (
        <>
          <PegImg src={`${IMG}/d-01-farmer-pump.png`} x={540} y={1150} h={360} f={f} at={at("26", 0.1)} o={1 - prog(f, at("26", 0.74), 5)} />
          <ImgSticker src={`${IMG}/d-08-water-glass.png`} x={240} y={880} w={170} f={f} at={at("26", 0.5)} out={at("26", 0.74)} />
          <ImgSticker src={`${IMG}/d-02-rice.png`} x={540} y={720} w={210} f={f} at={at("26", 0.58)} out={at("26", 0.74)} />
          <ImgSticker src={`${IMG}/d-07-shrimp.png`} x={840} y={880} w={200} f={f} at={at("26", 0.66)} out={at("26", 0.74)} />
        </>
      )}
      <BigGold text="NƯỚC NGỌT" f={f} at={at("26", 0.35)} out={at("26", 0.74)} y={330} size={120} color={SEA_BLUE} />
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "04": "Vậy mà trung bình, nó chỉ cao hơn mặt biển khoảng *80 phân*.",
  "06": "Con số này có từ năm *2019*, khi nhà nghiên cứu Hà Lan Philip Minderhoud dùng số đo ngoài thực địa để tính lại.",
  "07": "Trước đó, nhiều nghiên cứu còn tưởng nó cao hơn *2,5 mét*.",
  "09": "Ở *cái thước*.",
  "10": "Bản đồ vệ tinh lấy *mốc* không khớp với mặt biển ở đây.",
  "12": "Nước biển toàn cầu dâng chưa tới *4 li* mỗi năm.",
  "13": "Đất miền Tây lún khoảng *1 phân* mỗi năm.",
  "14": "Có nơi hơn *2,5 phân*.",
  "15": "Nhanh gấp khoảng *3 lần*.",
  "17": "Thủ phạm số 1 nằm ngay dưới chân: *nước ngầm*.",
  "19": "Riêng chuyện này đã kéo đồng bằng xuống khoảng *18 phân*.",
  "20": "Thủ phạm số 2: *phù sa*.",
  "22": "Phù sa về đồng bằng đã giảm khoảng *một nửa*.",
  "24": "Mùa khô năm *2020* là một đợt hạn mặn lịch sử.",
  "26": "Thứ kéo đồng bằng xuống nhiều nhất lại là *nước ngọt* ngay dưới chân, để uống, tưới ruộng, nuôi tôm cá.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SHUTTER = "shutter/shutter-click-3-494029.mp3";
const SFX: SfxCue[] = [
  [THUD, "02", 0.3, 0, -18],
  [W, "03", 0, -4], [CLICK, "04", 0.45], [CLICK, "05", 0.25], [CLICK, "06", 0.1], [CLICK, "07", 0.4],
  [CLICK, "08"], [SHUTTER, "09", 0.1], [CLICK, "10", 0.3], [CLICK, "12", 0.3], [CLICK, "13", 0.4], [CLICK, "14", 0.2],
  [THUD, "15", 0.15, 0, -18], [CLICK, "17", 0.05], [CLICK, "19", 0.55],
  [W2, "20", 0.2], [CLICK, "21", 0.1], [CLICK, "21", 0.55], [CLICK, "22", 0.15],
  [W, "23", 0, -4], [CLICK, "24", 0.25], [CLICK, "25", 0.05],
  [SHUTTER, "26", 0.35], [W2, "26", 0.8],
];

/** Music duck: the pillar bed dips for the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("26") - 6, at("26") + 6, at("26", 1) - 4, at("26", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P3DbsclSutLun: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p3-dbscl-sut-lun/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P3} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p3DbsclSutLunDuration = (fps: number) => episodeDuration(timing, fps);
