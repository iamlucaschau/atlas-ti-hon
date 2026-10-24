/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (+ Region Reveal), style I Toy Atlas:
 * "Mét vuông bạc tỷ chưa ai trả tiền?" — Gates 1–4 approved by Lucas 2026-10-24.
 * Script + sources: kich-ban-p2-met-vuong-bac-ty-FINAL.md, cong-2_so-nguon.md (C1–C13).
 * Price types never mixed (rules 15, 21): 702 million/m² is Hà Nội's 2026 LAND PRICE TABLE (residential, street front);
 * ~2.44 billion/m² is the 2021 WINNING AUCTION BID for Thủ Thiêm lot 3-12 (land for a tower, ~9 m² of floor per m² of
 * land), never paid: the winner forfeited its ~600 billion deposit in 1/2022. Every number on screen carries its type.
 * Human moment: 48 Hàng Ngang, where President Hồ Chí Minh wrote the Declaration of Independence (1945) — no portrait,
 * no price tag on the relic.
 * Soft loop: the VO ends on line 22; the last frame is the opening frame (Vietnam with two faint city dots).
 *
 * The Old Quarter and the Saigon River bend are SCHEMATIC sketches (not cadastral maps); geo points in PLACES are
 * checked by scripts/geo-check.mjs.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-met-vuong-bac-ty.timing.json";
import words from "../../src/voiceover/p2-met-vuong-bac-ty.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, DataCard, type GeoCam, ImgSticker, PegImg, Pulse, Question, seamKeys,
  show, Signature, Stamp, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { ProvinceMap, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-met-vuong-bac-ty/cut";
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;
const ease = Easing.inOut(Easing.cubic);
/** Frame of word `i` of VO line `id` (only where the word count matches the script). */
const wAt = (id: string, i: number) => Math.round((W[id]?.[i] ?? line(id).start) * FPS);

type LL = [number, number];

/** Every map-anchored thing and the province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  hanoi: { ll: [105.84, 21.03], in: "Hà Nội" },
  hangNgang: { ll: [105.8505, 21.0347], in: "Hà Nội" },
  hcm: { ll: [106.7, 10.78], in: "TP. Hồ Chí Minh" },
  dongKhoi: { ll: [106.7036, 10.7765], in: "TP. Hồ Chí Minh" },
  thuThiem: { ll: [106.716, 10.776], in: "TP. Hồ Chí Minh" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

const VN = ATLAS.c;
const PAPER = "#F1E6CC";
const ROAD = "#FBF6EA";
const BLOCK = "#E2D2AE";
const LAKE = "#5E9FCF";
const RIVER = "#4E8DC2";
const GOLD = ATLAS.gold;
const TABLE = "#2C5476"; // "on paper" price
const BID = "#C8322B"; // auction price

/** The city sketches are drawn at this camera zoom (scale 1). */
const CITY_Z = 200;
const VIEW = {
  vn: { lon: 106.4, lat: 16.2, zoom: 24 },
  hanoi: { lon: 105.8505, lat: 21.0347, zoom: CITY_Z },
  house: { lon: 105.8505, lat: 21.0344, zoom: 245 },
  street: { lon: 105.8505, lat: 21.0338, zoom: 205 },
  hcm: { lon: 106.712, lat: 10.776, zoom: CITY_Z },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): the camera flies to Hàng Ngang from frame 1
  { at: 1, ...VIEW.hanoi },
  { at: at("02") - 2, ...VIEW.hcm },
  { at: at("05") - 2, ...VIEW.vn },
  { at: at("06") - 4, ...VIEW.hanoi },
  { at: at("09") - 4, ...VIEW.house },
  { at: at("12") - 2, ...VIEW.street },
  { at: at("13") - 4, ...VIEW.hcm },
  { at: at("22"), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

/** Old Quarter sketch (schematic), drawn around Hàng Ngang at (0, 0), CITY_Z scale. */
const OldQuarter: React.FC<{ hl: number }> = ({ hl }) => {
  const blocks: [number, number, number, number][] = [];
  for (let gx = -460; gx < 460; gx += 120) {
    for (let gy = -520; gy < 300; gy += 110) {
      if (Math.abs(gx + 50) < 90) continue; // the Hàng Ngang – Hàng Đào axis
      blocks.push([gx + 14, gy + 14, 92, 82]);
    }
  }
  return (
    <g>
      {blocks.map(([x, y, w, h]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={10} fill={BLOCK} stroke="#CDB98F" strokeWidth={3} />)}
      {/* streets: the north–south axis Hàng Ngang → Hàng Đào, cross streets, Lê Thái Tổ / Đinh Tiên Hoàng round the lake */}
      <g stroke={ROAD} strokeWidth={26} strokeLinecap="round" fill="none">
        <path d="M 0 -560 L 0 300" />
        {[-410, -300, -190, -80, 30, 140, 250].map((y) => <path key={y} d={`M -480 ${y} L 480 ${y}`} strokeWidth={16} />)}
        <path d="M -150 300 L -150 760" />
        <path d="M 150 300 L 150 760" />
        <path d="M -480 300 L 480 300" />
      </g>
      {/* Hàng Ngang highlighted */}
      <path d="M 0 -170 L 0 110" stroke={ATLAS.ink} strokeWidth={50} strokeLinecap="round" opacity={hl} />
      <path d="M 0 -170 L 0 110" stroke={GOLD} strokeWidth={40} strokeLinecap="round" opacity={hl} />
      {/* Hồ Gươm */}
      <path d="M -30 340 C 70 330 110 420 100 520 C 92 640 60 720 -10 730 C -80 735 -110 640 -105 540 C -100 430 -100 345 -30 340 Z"
        fill={LAKE} stroke={ATLAS.ink} strokeWidth={5} />
      <ellipse cx={-5} cy={430} rx={14} ry={9} fill="#7FB36A" stroke={ATLAS.ink} strokeWidth={3} />
    </g>
  );
};

/** Saigon River bend (schematic) around the centre of the HCM view, CITY_Z scale; Thủ Thiêm lot at LOT. */
const LOT: [number, number] = [150, 40];
const RiverBend: React.FC<{ lotHl: number; f: number }> = ({ lotHl, f }) => {
  const blocks: [number, number][] = [];
  for (let gx = -580; gx < -400; gx += 115) for (let gy = -620; gy < 640; gy += 105) blocks.push([gx, gy]);
  const river = "M -40 -760 C -110 -420 -250 -160 -240 150 C -232 380 -300 560 -620 660";
  return (
    <g>
      {blocks.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width={92} height={80} rx={10} fill={BLOCK} stroke="#CDB98F" strokeWidth={3} />)}
      <path d={river} fill="none" stroke={ATLAS.ink} strokeWidth={142} strokeLinecap="round" />
      <path d={river} fill="none" stroke={RIVER} strokeWidth={130} strokeLinecap="round" />
      <path d={river} fill="none" stroke="#7DB4DE" strokeWidth={6} strokeDasharray="30 46" strokeDashoffset={-f * 1.2} opacity={0.7} />
      {/* Thủ Thiêm: open land with a few plots, lot 3-12 glowing */}
      {[[-60, -440], [250, -360], [300, 300], [-90, 330]].map(([x, y]) => (
        <rect key={`${x}`} x={x} y={y} width={110} height={90} rx={8} fill="#D9E3B8" stroke="#B7C48F" strokeWidth={3} />
      ))}
      <rect x={LOT[0] - 80} y={LOT[1] - 80} width={160} height={160} rx={10} fill="#E9D9A6" stroke={GOLD} strokeWidth={8 + 4 * lotHl}
        opacity={0.6 + 0.4 * lotHl} />
    </g>
  );
};

/** Street / place label on the paper sketches: dark ink on a white halo (white text washes out on paper). */
const CityLabel: React.FC<{ text: string; x: number; y: number; o: number }> = ({ text, x, y, o }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <text x={x} y={y} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.ink}
        stroke={ATLAS.white} strokeWidth={12} strokeLinejoin="round" paintOrder="stroke" letterSpacing={1}>{text}</text>
    </svg>
  );
};

/** A small white pill with one short text (screen space). */
const Pill: React.FC<{ x: number; y: number; text: string; color: string; k: number; o: number }> = ({ x, y, text, color, k, o }) => {
  if (o <= 0) return null;
  const w = text.length * 30 + 80;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k }}>
        <rect x={-w / 2} y={-50} width={w} height={96} rx={48} fill={ATLAS.white} stroke={color} strokeWidth={7} />
        <text y={17} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={color}>{text}</text>
      </g>
    </svg>
  );
};

/** Two-line debate card (screen space). */
const Side: React.FC<{ y: number; head: string; body: string; color: string; o: number; k: number }> = ({ y, head, body, color, o, k }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${CX}px ${y}px`, scale: k }}>
        <rect x={-400} y={-80} width={800} height={160} rx={26} fill={ATLAS.white} fillOpacity={0.96} stroke={color} strokeWidth={8} />
        <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={color} stroke={ATLAS.ink} strokeWidth={2}>{head}</text>
        <text y={48} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{body}</text>
      </g>
    </svg>
  );
};

/** Two price bars: on paper (Hà Nội table) vs on the auction floor (Thủ Thiêm bid), per m² of land. */
const PriceBars: React.FC<{ o: number; p1: number; p2: number; y: number }> = ({ o, p1, p2, y }) => {
  if (o <= 0) return null;
  const x0 = 400;
  const len = 470;
  const rows: [string, string, string, number][] = [
    ["TRÊN GIẤY", "702 TRIỆU", TABLE, (702 / 2435) * p1],
    ["SÀN ĐẤU", "2,44 TỶ", BID, p2],
  ];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={84} y={y - 150} width={852} height={300} rx={30} fill={ATLAS.white} fillOpacity={0.95} stroke={ATLAS.ink} strokeWidth={6} />
      <text x={CX} y={y - 80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>GIÁ MỖI M² ĐẤT</text>
      {rows.map(([label, text, color, p], i) => {
        const yy = y - 40 + i * 96;
        const w = len * p;
        return (
          <g key={label}>
            <text x={x0 - 20} y={yy + 50} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={48} fill={color}>{label}</text>
            <rect x={x0} y={yy} width={len} height={70} rx={14} fill="#D9D2C2" />
            {w > 0 && <rect x={x0} y={yy} width={w} height={70} rx={14} fill={color} stroke={ATLAS.ink} strokeWidth={5} />}
            {p > 0.05 && (
              <text x={w >= 260 ? x0 + w - 16 : x0 + w + 18} y={yy + 51} textAnchor={w >= 260 ? "end" : "start"} fontFamily={FONT} fontWeight={800}
                fontSize={48} fill={w >= 260 ? ATLAS.white : ATLAS.ink}>{text}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Table price at Hàng Ngang before / after 20/12/2024. */
const TableJump: React.FC<{ o: number; p: number; y: number }> = ({ o, p, y }) => {
  if (o <= 0) return null;
  const x0 = 400;
  const len = 470;
  const after = interpolate(p, [0, 1], [188, 695]);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={84} y={y - 150} width={852} height={300} rx={30} fill={ATLAS.white} fillOpacity={0.95} stroke={ATLAS.ink} strokeWidth={6} />
      <text x={CX} y={y - 80} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>BẢNG GIÁ HÀNG NGANG</text>
      {([["TRƯỚC", 188, "188 TRIỆU"], ["SAU", after, `${Math.round(after)} TRIỆU`]] as const).map(([label, v, t], i) => {
        const yy = y - 40 + i * 96;
        const w = (len * v) / 702;
        return (
          <g key={label}>
            <text x={x0 - 20} y={yy + 50} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={48} fill={TABLE}>{label}</text>
            <rect x={x0} y={yy} width={len} height={70} rx={14} fill="#D9D2C2" />
            <rect x={x0} y={yy} width={w} height={70} rx={14} fill={TABLE} stroke={ATLAS.ink} strokeWidth={5} />
            <text x={w >= 260 ? x0 + w - 16 : x0 + w + 18} y={yy + 51} textAnchor={w >= 260 ? "end" : "start"} fontFamily={FONT} fontWeight={800}
              fontSize={48} fill={w >= 260 ? ATLAS.white : ATLAS.ink}>{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** 1 m² of land carrying ~9 m² of floor: a tile with 9 slabs stacking up (screen space, base at x, y). */
const Slabs: React.FC<{ x: number; y: number; p: number; o: number }> = ({ x, y, p, o }) => {
  if (o <= 0) return null;
  const n = Math.min(9, Math.floor(p * 9.999));
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px` }}>
        <path d="M -90 0 L 0 -40 L 90 0 L 0 40 Z" fill="#B98B4E" stroke={ATLAS.ink} strokeWidth={5} />
        {Array.from({ length: n }, (_, i) => (
          <g key={i} style={{ translate: `0px ${-34 - i * 34}px` }}>
            <path d="M -90 0 L 0 -40 L 90 0 L 0 40 Z" fill={i % 2 ? "#EAF2F8" : "#D3E4F1"} stroke={ATLAS.ink} strokeWidth={4} />
            <path d="M -90 0 L -90 10 L 0 50 L 90 10 L 90 0 L 0 40 Z" fill="#9DB7CC" stroke={ATLAS.ink} strokeWidth={3} />
          </g>
        ))}
      </g>
    </svg>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  const cityO = interpolate(cam.zoom, [110, 185], [0, 1], CLAMP);
  // labels and props on the sketches wait until the camera has landed (no stray label mid-flight)
  const landed = interpolate(cam.zoom, [180, 198], [0, 1], CLAMP);
  const layer = (z: number) => <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} />;
  // which city sketch is on screen: the nearer of the two anchors
  const [hx, hy] = S(P("hangNgang"));
  const [rx, ry] = S([VIEW.hcm.lon, VIEW.hcm.lat]);
  const k = cam.zoom / CITY_Z;
  const inHanoi = Math.hypot(hx - CX, hy - 760) < Math.hypot(rx - CX, ry - 760);
  const lot: [number, number] = [rx + LOT[0] * k, ry + LOT[1] * k];
  const pin48: [number, number] = [hx, hy - 20 * k];

  // 13–21 Thủ Thiêm props
  const towerO = show(f, at("16"), at("22")) * interpolate(f, [at("19"), at("19") + 20], [1, 0.4], CLAMP);
  const peg = show(f, at("14"), at("19") + 30);
  const pegSlide = prog(f, at("19"), 30, ease);
  const bag = prog(f, wAt("19", 6), 34, ease);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />

      {/* two faint city dots on the national map (the loop frame is never empty) */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: interpolate(cam.zoom, [26, 60], [1, 0], CLAMP) }}>
        {(["hanoi", "hcm"] as const).map((key, i) => {
          const [x, y] = S(P(key));
          return (
            <g key={key}>
              <circle cx={x} cy={y} r={12 + 4 * Math.sin(f / 10 + i * 2)} fill={GOLD} fillOpacity={0.35} />
              <circle cx={x} cy={y} r={9} fill={GOLD} stroke={ATLAS.ink} strokeWidth={4} opacity={0.8} />
            </g>
          );
        })}
      </svg>

      {/* city sketches (schematic), fading in as the camera reaches city zoom */}
      {cityO > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: cityO }}>
          <rect width={1080} height={1920} fill={PAPER} opacity={0.94} />
          {inHanoi ? (
            <g style={{ translate: `${hx}px ${hy}px`, scale: k }}><OldQuarter hl={show(f, wAt("01", 9), at("09") - 6)} /></g>
          ) : (
            <g style={{ translate: `${rx}px ${ry}px`, scale: k }}><RiverBend lotHl={show(f, at("02") + 20, at("05")) + show(f, at("13"), at("22"))} f={f} /></g>
          )}
        </svg>
      )}

      {/* ── 01 on paper: Hàng Ngang, >702 million/m² (land price table 2026) ── */}
      <CityLabel text="HÀNG NGANG" x={hx - 220} y={hy + 16} o={show(f, wAt("01", 9), at("02") - 4) * cityO} />
      {f >= 8 && f < at("02") && (
        <AbsoluteFill style={{ opacity: cityO * (1 - prog(f, at("02") - 6, 5)) }}>
          <ImgSticker src={`${IMG}/t-02-nha-ong-pho-co.png`} x={hx + 250} y={hy - 40} w={270} f={f} at={14} />
        </AbsoluteFill>
      )}
      <DataCard value="702 TRIỆU/M²" label="BẢNG GIÁ 2026" x={CX} y={330} f={f} at={at("01", 0.68)} out={at("02") - 2} color={GOLD} size={92} />

      {/* ── 02 on the auction floor: Thủ Thiêm, ~2.44 billion/m² (winning bid 2021) ── */}
      <CityLabel text="THỦ THIÊM" x={lot[0]} y={lot[1] + 140 * k} o={show(f, at("02") + 24, at("03")) * landed} />
      <DataCard value="~2,44 TỶ/M²" label="GIÁ TRÚNG ĐẤU GIÁ · 2021" x={CX} y={330} f={f} at={at("02", 0.62)} out={at("03")} color={GOLD} size={92} />

      {/* ── 03–04 which one is real? both ── */}
      <PriceBars o={show(f, at("03"), at("05") - 2)} p1={prog(f, at("03"), 14, ease)} p2={prog(f, at("03") + 6, 16, ease)} y={1110} />
      <Question x={CX} y={560} f={f} at={at("03")} out={at("04")} s={1.3} />
      <Stamp text="CẢ HAI" x={CX} y={560} f={f} at={at("04")} out={at("05") - 2} color={BID} />

      {/* ── 05 your land has two prices too ── */}
      {f >= at("05") && f < at("06") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("06") - 6, 5) }}>
          <ImgSticker src={`${IMG}/t-02-nha-ong-pho-co.png`} x={CX} y={880} w={300} f={f} at={at("05") + 4} />
        </AbsoluteFill>
      )}
      <Pill x={CX} y={640} text="GIÁ TRÊN GIẤY" color={TABLE} k={prog(f, at("05", 0.3), 8, ease)} o={show(f, at("05", 0.3), at("06") - 2)} />
      <Pill x={CX} y={1110} text="GIÁ MUA BÁN" color={BID} k={prog(f, at("05", 0.5), 8, ease)} o={show(f, at("05", 0.5), at("06") - 2)} />

      {/* ── 06–08 price 1, the table: land-use fee when you get your certificate; ×3.7 on 20/12/2024 ── */}
      <DataCard value="GIÁ THỨ NHẤT" label="BẢNG GIÁ NHÀ NƯỚC" x={CX} y={330} f={f} at={at("06") + 4} out={at("07")} size={92} />
      <DataCard value="TIỀN SỬ DỤNG ĐẤT" label="TÍNH THEO BẢNG GIÁ" x={CX} y={330} f={f} at={at("07")} out={at("08")} size={80} />
      {f >= at("07") && f < at("08") + 6 && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("08"), 6) }}>
          <PegImg src={`${IMG}/t-06-so-do.png`} x={hx + 250} y={hy + 210} h={260} f={f} at={at("07") + 2} />
        </AbsoluteFill>
      )}
      <YearRibbon text="20/12/2024" f={f} at={at("08")} out={at("09") - 4} />
      <TableJump o={show(f, at("08") + 4, at("09") - 4)} p={prog(f, at("08", 0.45), 24, ease)} y={1110} />

      {/* ── 09–12 [NGƯỜI] 48 Hàng Ngang: the room where the Declaration of Independence was written (no price tag) ── */}
      <PegImg src={`${IMG}/t-05-nha-co-ban-cong.png`} x={pin48[0]} y={pin48[1] + 250} h={430} f={f} at={at("09") + 2}
        o={show(f, at("09") + 2, at("13") - 4)} />
      {f >= at("10") + 10 && f < at("13") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("10") + 10, 40), 1 - prog(f, at("13") - 8, 6)) }}>
          <defs>
            <radialGradient id="warm">
              <stop offset="0%" stopColor="#FFE7A3" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#FFC94D" stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={pin48[0] + 62} cy={pin48[1] - 32} r={110 + 10 * Math.sin(f / 15)} fill="url(#warm)" />
        </svg>
      )}
      <CityLabel text="48 HÀNG NGANG" x={pin48[0]} y={pin48[1] + 320} o={show(f, at("09", 0.4), at("10"))} />
      <YearRibbon text="1945" f={f} at={at("10")} out={at("11")} />
      <CityLabel text="NHÀ ÔNG TRỊNH VĂN BÔ" x={pin48[0]} y={pin48[1] + 320} o={show(f, at("10", 0.45), at("11"))} />
      <CityLabel text="TUYÊN NGÔN ĐỘC LẬP" x={pin48[0]} y={pin48[1] + 320} o={show(f, at("11", 0.2), at("12", 0.9))} />
      <Pulse x={pin48[0] + 62} y={pin48[1] - 32} f={f} color={GOLD} period={50} o={show(f, at("12"), at("13") - 4)} />

      {/* ── 13–16 price 2, the auction floor: Thủ Thiêm 2021, ~2.44 billion/m², ×8.3 the start, land for a tower ── */}
      <CityLabel text="ĐỒNG KHỞI" x={Math.max(230, rx - 400 * k)} y={ry - 300 * k} o={show(f, at("13") + 10, at("14")) * landed} />
      <CityLabel text="THỦ THIÊM" x={lot[0]} y={lot[1] + 140 * k} o={show(f, at("13") + 16, at("14") + 2) * landed} />
      {f >= at("13") && f < at("16") && (() => {
        const strike = wAt("14", 9);
        const rot = interpolate(f, [strike - 8, strike - 2, strike, strike + 6], [0, -28, 6, 0], CLAMP);
        return (
          <Img src={staticFile(`${IMG}/t-01-bua-dau-gia.png`)} style={{
            position: "absolute", left: lot[0] + 140, top: lot[1] - 170, width: 210, translate: "-50% -50%",
            scale: prog(f, at("13") + 10, 10, ease), rotate: `${rot}deg`, transformOrigin: "80% 70%",
            opacity: landed * (1 - prog(f, at("16") - 6, 5)),
          }} />
        );
      })()}
      <YearRibbon text="12/2021" f={f} at={at("14")} out={at("14", 0.8)} />
      {peg > 0 && (
        <PegImg src={`${IMG}/t-07-nha-dau-tu.png`} x={lot[0] - 200 + 260 * pegSlide} y={lot[1] + 340} h={300} f={f} at={at("14") + 4}
          o={peg * (1 - pegSlide)} />
      )}
      <DataCard value="~2,44 TỶ/M²" label="GẤP 8,3 LẦN KHỞI ĐIỂM" x={CX} y={330} f={f} at={at("15")} out={at("16")} color={GOLD} size={92} />
      {towerO > 0 && (
        <PegImg src={`${IMG}/t-03-thap-cao-tang.png`} x={lot[0]} y={lot[1] + 90} h={380} f={f} at={at("16") + 2} o={towerO} />
      )}
      <Slabs x={840} y={1210} p={prog(f, at("16", 0.35), 40)} o={show(f, at("16", 0.3), at("17"))} />
      <DataCard value="1 M² ĐẤT ≈ 9 M² SÀN" label="QUY HOẠCH LÔ ĐẤT" x={CX} y={330} f={f} at={at("16", 0.4)} out={at("17")} size={64} />

      {/* ── 17–18 two sides; the bid "pulls the whole area up" ── */}
      <Side y={350} head="CƠ QUAN TƯ PHÁP" body="ĐÚNG QUY TRÌNH" color={TABLE} o={show(f, at("17"), at("19") - 2)} k={prog(f, at("17"), 8, ease)} />
      <Side y={560} head="HIỆP HỘI BĐS" body="LO KÉO GIÁ CẢ VÙNG" color={BID} o={show(f, at("18"), at("19") - 2)} k={prog(f, at("18"), 8, ease)} />
      {f >= at("18") && f < at("19") + 6 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("19"), 6) }}>
          {[0, 1, 2].map((i) => {
            const t = ((f - at("18") + i * 22) % 66) / 66;
            return <circle key={i} cx={lot[0]} cy={lot[1]} r={90 + 520 * t} fill="none" stroke={GOLD} strokeWidth={10} opacity={0.8 * (1 - t)} />;
          })}
        </svg>
      )}

      {/* ── 19–20 the winner walks away, the ~600 bn deposit flies off ── */}
      {f >= wAt("19", 6) && f < at("21") && (
        <Img src={staticFile(`${IMG}/t-04-tui-tien-coc.png`)} style={{
          position: "absolute", left: interpolate(bag, [0, 1], [lot[0] - 150, 300]), top: interpolate(bag, [0, 1], [lot[1] + 200, 600]),
          width: interpolate(f, [at("20"), at("21") - 4], [220, 40], CLAMP), translate: "-50% -50%",
          scale: prog(f, wAt("19", 6), 6, ease), opacity: 1 - prog(f, at("21") - 6, 5),
        }} />
      )}
      <DataCard value="CỌC ~600 TỶ" label="BỎ CỌC · 1/2022" x={CX} y={330} f={f} at={wAt("19", 7)} out={at("21")} color={GOLD} size={92} />

      {/* ── 21–22 [TWIST] the billion-dong square metre was never paid for: a sheet of paper ── */}
      {f >= at("21") && f < END - 8 && (() => {
        const lift = prog(f, at("22", 0.3), 50, ease);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("21"), 6), 1 - prog(f, END - 26, 14)) }}>
            <g style={{ translate: `${CX}px ${880 - 420 * lift}px`, rotate: `${-4 + 10 * lift}deg`, scale: 1 - 0.4 * lift }}>
              <path d="M -230 -150 L 230 -150 L 230 150 L -230 150 Z" fill="#FFFDF6" stroke={ATLAS.ink} strokeWidth={6} />
              <text y={-30} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={72} fill={ATLAS.ink}>~2,44 TỶ/M²</text>
              {[30, 70, 110].map((y) => <path key={y} d={`M -170 ${y} L 170 ${y}`} stroke="#B9B2A3" strokeWidth={8} strokeLinecap="round" />)}
            </g>
          </svg>
        );
      })()}
      <Stamp text="CHƯA TRẢ TIỀN" x={CX} y={930} f={f} at={wAt("21", 6)} out={at("22", 0.3)} color={BID} />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "*Trên giấy*, mét vuông đắt nhất Hà Nội có ở phố *Hàng Ngang*: hơn *700 triệu* đồng.",
  "02": "Còn ở *Thủ Thiêm*, một mét vuông từng được trả giá gấp hơn *3 lần*.",
  "04": "*Cả hai.*",
  "08": "Chỉ một quyết định, giá ấy ở Hàng Ngang tăng gần *gấp 4*.",
  "09": "Cũng trên phố này, có ngôi nhà số *48*.",
  "10": "Năm *1945*, gia đình ông *Trịnh Văn Bô* dành tầng hai cho Chủ tịch Hồ Chí Minh.",
  "14": "Năm *2021*, một khu đất Thủ Thiêm được đấu giá.",
  "15": "Giá chốt khoảng *2,4 tỷ* đồng mỗi mét vuông.",
  "16": "Nhưng đó là đất xây tháp: mỗi mét vuông đất gánh gần *9 mét vuông sàn*.",
  "19": "Rồi doanh nghiệp trúng xin rút, mất gần *600 tỷ* tiền cọc.",
  "20": "Gần *600 tỷ*, cho một lần đổi ý.",
  "21": "Mét vuông bạc tỷ ấy *chưa từng được trả tiền*.",
  "22": "Giá bạc tỷ, có khi chỉ nằm *trên giấy*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const KNOCK = "hit/punch-impact-hit-567196.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat; none at 09–12
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [WH, "02", 0, -2], [CLICK, "04", 0], [WH2, "06", 0, -4], [CLICK, "08", 0.45], [WH, "13", 0, -4],
  [KNOCK, "14", 0.9, 0, -18], [CLICK, "15", 0.1], [CLICK, "19", 0.6], [THUD, "21", 0.3, 0, -18],
];

/** Music duck: quieter for 48 Hàng Ngang (09–12), dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f,
  [at("09") - 8, at("09") + 6, at("12", 1), at("13"), at("21") - 6, at("21") + 6, at("22", 1) - 4, at("22", 1) + 6],
  [1, 0.5, 0.5, 1, 1, 0.5, 0.5, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => <Signature f={useCurrentFrame()} cuts={KEYS0.map((c) => c.at)} end={END} spots={[2, 0, 2, 0, 2, 2, 0, 2]} />;

export const P2MetVuongBacTy: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-met-vuong-bac-ty/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2MetVuongBacTyDuration = (fps: number) => episodeDuration(timing, fps);
