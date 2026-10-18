/**
 * Atlas Tí Hon · P1 Vì sao bản đồ như thế này? · Historical Timeline (style I Toy Atlas):
 * "Vì sao Tây Nguyên bỗng có biển?".
 * Script + sources: kich-ban-p1-tay-nguyen-co-bien-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 28; the last frame is the opening
 * frame (highlands view, the five old Tây Nguyên provinces green, their four coastal partners pale blue).
 *
 * Map (Cổng 2, Lucas 2026-10-18): Vietnam is drawn by province (Style Library/I-toy-atlas/vn-provinces.tsx):
 * the 34 provinces from OCHA/HDX (§3.1 A), the 63 old ones from Natural Earth for "before" shots only.
 * In the all-provinces shots Hoàng Sa takes Đà Nẵng's colour and Trường Sa Khánh Hoà's (§3.2 A).
 * The Pleiku → Quy Nhơn road is a schematic dotted line. No portraits of the people quoted (§3.5).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p1-tay-nguyen-co-bien.timing.json";
import words from "../../src/voiceover/p1-tay-nguyen-co-bien.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, count, DataCard, type GeoCam, ImgSticker, PegImg, pts, Pulse, Question, Route, routeHead, seamKeys,
  show, Stamp, Sticker, toScreen, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, flashAt, type Province, ProvinceMap, ProvinceTag, type ProvFill, VN2024, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p1-tay-nguyen-co-bien/cut";
const OLD_IMG = (ep: string, file: string) => `images/${ep}/cut/${file}`;
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

const VIEW = {
  highlands: { lon: 108.45, lat: 13.0, zoom: 62 },
  vn: { lon: 109.8, lat: 14.8, zoom: 19 },
  gialai: { lon: 108.6, lat: 13.9, zoom: 150 },
  lamdong: { lon: 108.25, lat: 11.45, zoom: 140 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.highlands },
  { at: at("05") - 4, ...VIEW.vn },
  { at: at("08") - 4, ...VIEW.highlands },
  { at: at("13") - 4, ...VIEW.vn },
  { at: at("15") - 4, ...VIEW.gialai },
  { at: at("20") - 4, ...VIEW.vn },
  { at: at("24") - 4, ...VIEW.lamdong },
  { at: at("27") - 4, ...VIEW.gialai },
  { at: at("28", 0.55), ...VIEW.highlands },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

// Colours (beat-sheet.md, "Màu khoá")
const VN_BASE = "#D8C59A"; // Vietnam's provinces, a shade lighter than the neighbours' land
const HIGH = ATLAS.b; // the highlands
const SEA_P = "#93BCE9"; // the coastal partners
const COAST = "#5B8FD9"; // provinces with a coast (35 → 13 shot)
const INLAND = ATLAS.d; // provinces without one

/** The five old Tây Nguyên provinces and, per VO line, the coastal province each one was joined with. */
const HIGHLANDS = ["Kon Tum", "Gia Lai", "Đắk Lắk", "Đắk Nông", "Lâm Đồng"];
const PAIRS: { line: string; k: number; high: string; partner: string; from: [number, number] }[] = [
  { line: "08", k: 0.15, high: "Kon Tum", partner: "Quảng Ngãi", from: [108.4, 14.9] },
  { line: "09", k: 0.15, high: "Gia Lai", partner: "Bình Định", from: [108.6, 14.0] },
  { line: "10", k: 0.15, high: "Đắk Lắk", partner: "Phú Yên", from: [108.75, 13.0] },
  { line: "11", k: 0.6, high: "Lâm Đồng", partner: "Bình Thuận", from: [108.0, 11.4] },
];
/** The four new provinces that took in the highlands (2025 names). */
const NEW4 = ["Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Lâm Đồng"];
/** Name tags for the new provinces (line → label, anchor on the merged land). */
const TAGS: { line: string; label: string; anchor: [number, number] }[] = [
  { line: "08", label: "QUẢNG NGÃI", anchor: [108.45, 14.55] },
  { line: "09", label: "GIA LAI", anchor: [108.45, 13.85] },
  { line: "10", label: "ĐẮK LẮK", anchor: [108.5, 12.85] },
  { line: "11", label: "LÂM ĐỒNG", anchor: [108.05, 11.75] },
];
/** Mountain/lowland → coast pairs drawn as arrows over the whole country (line 14): the four highland pairs + three lowland ones (NQ 202). */
const ARROWS: [number, number][][] = [
  [[107.9, 14.6], [108.75, 15.05]], [[108.1, 13.8], [109.0, 14.15]], [[108.2, 12.8], [109.1, 13.1]], [[108.2, 11.9], [108.35, 11.15]],
  [[105.6, 9.8], [105.95, 9.5]], [[105.6, 10.5], [106.35, 10.35]], [[106.05, 20.85], [106.4, 20.5]],
];

const PLEIKU: [number, number] = [108.0, 13.98];
const QUY_NHON: [number, number] = [109.22, 13.78];
const DA_LAT: [number, number] = [108.44, 11.94];
const MUI_NE: [number, number] = [108.29, 10.93];
/** Schematic road Pleiku → An Khê → Quy Nhơn (quốc lộ 19), dotted. */
const ROAD: [number, number][] = [PLEIKU, [108.35, 13.99], [108.65, 13.95], [108.95, 13.88], QUY_NHON];
/** A commune at Gia Lai's western edge → the provincial centre (line 23, "cả trăm cây số"). */
const FAR: [number, number][] = [[107.62, 13.62], [108.4, 13.75], QUY_NHON];

const byName = (set: Province[], name: string) => set.find((p) => p.name === name)!;
const DA_NANG = byName(VN2025, "Đà Nẵng");
const KHANH_HOA = byName(VN2025, "Khánh Hòa");
const ISLAND_PROVINCES = [DA_NANG.name, KHANH_HOA.name];

/** Visible from a (fade in over fin frames) until b (fade out over fout). */
const win = (f: number, a: number, b = Infinity, fin = 8, fout = 8) => Math.min(prog(f, a, fin), b === Infinity ? 1 : 1 - prog(f, b, fout));

/** Curved arrow between two screen points. */
const Arrow: React.FC<{ a: [number, number]; b: [number, number]; p: number }> = ({ a, b, p }) => {
  if (p <= 0) return null;
  const [mx, my] = [(a[0] + b[0]) / 2 - (b[1] - a[1]) * 0.3, (a[1] + b[1]) / 2 + (b[0] - a[0]) * 0.3];
  const d = `M ${a[0]} ${a[1]} Q ${mx} ${my} ${b[0]} ${b[1]}`;
  const ang = (Math.atan2(b[1] - my, b[0] - mx) * 180) / Math.PI;
  return (
    <g>
      <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={11} strokeLinecap="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} />
      <path d={d} fill="none" stroke={ATLAS.gold} strokeWidth={6} strokeLinecap="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - p }} />
      {p > 0.95 && (
        <path d="M 4 0 L -14 -10 L -14 10 Z" fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} strokeLinejoin="round"
          style={{ translate: `${b[0]}px ${b[1]}px`, rotate: `${ang}deg` }} />
      )}
    </g>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: [number, number]) => toScreen(cam, ...ll);

  // ── layer opacities (which map the viewer sees) ──
  // L1 old 63, highlands green + partners: hook, the four pairs (08–12), and back for the loop frame
  const l1 = Math.max(1 - prog(f, at("05"), 10), win(f, at("08") - 4, at("12", 0.25), 10, 10), prog(f, at("28", 0.55), 12));
  // L2 old 63, plain with borders: "63 tỉnh thành"
  const l2 = win(f, at("05"), at("07", 0.3), 10, 15);
  // L3 new 34, pastel: "còn 34", and the two sides (22–23)
  const l3 = Math.max(win(f, at("07", 0.05), at("08") - 4, 4, 10), win(f, at("22"), at("24") - 4, 10, 10));
  // L4 new 34, the four new highland provinces green
  const l4 = Math.max(win(f, at("12", 0.1), at("20") - 2, 10, 8), win(f, at("24") - 6, at("28", 0.55), 8, 12));
  // L5 / L6 coast vs no coast, before (63) and after (34)
  const l5 = win(f, at("20") - 2, at("21", 0.1), 8, 10);
  const l6 = win(f, at("21", 0.05), at("22"), 10, 10);

  // partners: pale blue, flooded green from the highland side (preview in 02, for real in 08–11; reset for the loop)
  const partnerP = (pr: (typeof PAIRS)[number]) =>
    f < at("05") ? prog(f, at("02", 0.1), 26) : f < at("13") ? prog(f, at(pr.line, pr.k), 22) : 0;
  const oldFills: ProvFill[] = [
    ...HIGHLANDS.map((name) => ({ name, color: HIGH })),
    ...PAIRS.map((pr) => ({ name: pr.partner, color: HIGH, wipe: { from: SEA_P, lon: pr.from[0], lat: pr.from[1], p: partnerP(pr) } })),
  ];
  const pairFlash = PAIRS.flatMap((pr) => [
    { name: pr.high, v: flashAt(f, [at(pr.line)]) },
    { name: pr.partner, v: flashAt(f, [at(pr.line, pr.k + 0.2)]) },
  ]);
  // line 11 names Đắk Nông too
  pairFlash.push({ name: "Đắk Nông", v: flashAt(f, [at("11", 0.3)]) });

  // 63 borders flash north → south (line 06)
  const n0 = 23.4;
  const s0 = 8.6;
  const oldFlash = VN2024.map((p) => ({ name: p.name, v: flashAt(f, [at("06") + Math.round(((n0 - p.c[1]) / (n0 - s0)) * 36)]) * 0.8 }));
  // pastel flood (07), then the two sides (22–23)
  const pastelP = prog(f, at("07", 0.05), 26);
  const pastel: ProvFill[] = VN2025.map((p) => ({
    name: p.name, color: p.pastel, wipe: f < at("13") ? { from: VN_BASE, lon: 106.2, lat: 16, p: pastelP, r: 40 } : undefined,
  }));
  const newFlash = [
    ...NEW4.map((name) => ({ name, v: f < at("15") ? flashAt(f, [at("13", 0.2)]) : 0 })),
    { name: "Lâm Đồng", v: flashAt(f, [at("24", 0.1)]) },
    // [PHE 1] every merged province flashes once
    // (Đà Nẵng and Khánh Hoà left out: their Hoàng Sa / Trường Sa parts would ring every island in gold)
    ...VN2025.filter((p) => !ISLAND_PROVINCES.includes(p.name)).map((p) => ({
      name: p.name, v: f >= at("22") && f < at("23") ? flashAt(f, [at("22", 0.15)]) * 0.7 : 0,
    })),
    // line 27: Gia Lai named again
    { name: "Gia Lai", v: flashAt(f, [at("27", 0.05)]) },
  ];
  const coastFills = (set: Province[]): ProvFill[] => set.map((p) => ({ name: p.name, color: p.coastal ? COAST : INLAND }));

  // island dots follow the colour of what is on screen
  const islandColor = l3 > 0.5 ? DA_NANG.pastel : l5 > 0.5 || l6 > 0.5 ? COAST : VN_BASE;
  const islandColorTs = l3 > 0.5 ? KHANH_HOA.pastel : islandColor;

  const layer = (z: number) => (
    <>
      {/* ground: Vietnam always has land under the crossfades */}
      <ProvinceMap z={z} set={VN2025} tag="g" base={VN_BASE} lines={0} f={f} />
      <ProvinceMap z={z} set={VN2024} tag="l1" base={VN_BASE} fills={oldFills} o={l1} f={f} flash={pairFlash}
        coast={{ names: PAIRS.map((p) => p.partner), v: show(f, at("01", 0.35), at("02", 0.2)) }} />
      <ProvinceMap z={z} set={VN2024} tag="l2" base={VN_BASE} o={l2} f={f} flash={oldFlash} />
      <ProvinceMap z={z} set={VN2025} tag="l3" base={VN_BASE} fills={pastel} o={l3} f={f} flash={newFlash} />
      <ProvinceMap z={z} set={VN2025} tag="l4" base={VN_BASE} fills={NEW4.map((name) => ({ name, color: HIGH }))} o={l4} f={f} flash={newFlash}
        coast={{ names: NEW4, v: show(f, at("12", 0.15), at("13")) }} />
      <ProvinceMap z={z} set={VN2024} tag="l5" base={VN_BASE} fills={coastFills(VN2024)} o={l5} f={f} />
      <ProvinceMap z={z} set={VN2025} tag="l6" base={VN_BASE} fills={coastFills(VN2025)} o={l6} f={f} />
    </>
  );

  // screen points used by several beats
  const pk = S(PLEIKU);
  const qn = S(QUY_NHON);
  const road = pts(cam, ROAD);
  const far = pts(cam, FAR);
  const dl = S(DA_LAT);
  const mn = S(MUI_NE);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={islandColor} colorTs={islandColorTs} />

      {/* ── 01–04 hook ── */}
      <DataCard value="0 MÉT" label="BỜ BIỂN" x={500} y={330} f={f} at={at("01", 0.35)} out={at("02", 0.2)} />
      <Question x={430} y={700} f={f} at={at("03")} out={at("04")} s={1.6} />
      <Stamp text="GỘP TỈNH" x={500} y={640} f={f} at={at("04", 0.05)} out={at("05")} />

      {/* ── 05–07 63 → 34 ── */}
      <YearRibbon text="2025" f={f} at={at("05", 0.1)} out={at("08") - 4} />
      {f >= at("06") && f < at("08") && (
        <BigGold text={count(f, at("07", 0.1), 22, 34, 63)} f={f} at={at("06", 0.05)} out={at("08") - 6} y={420} size={150} />
      )}

      {/* ── 08–12 the four pairs ── */}
      {TAGS.map((t, i) => (
        <ProvinceTag key={t.label} cam={cam} f={f} label={t.label} anchor={t.anchor} from={at(t.line, 0.1)}
          o={show(f, at(t.line, 0.1), i < 3 ? at(TAGS[i + 1].line) : at("12"))} />
      ))}

      {/* ── 13–14 the Government scheme: mountain + sea ── */}
      <DataCard value="MIỀN NÚI + CÓ BIỂN" x={500} y={330} f={f} at={at("14", 0.25)} out={at("15") - 4} size={64} />
      <ImgSticker src={`${IMG}/g-05-document.png`} x={190} y={600} w={210} f={f} at={at("14", 0.05)} out={at("15") - 4} />
      {f >= at("14") && f < at("15") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("15") - 6, 5) }}>
          {ARROWS.map(([a, b], i) => <Arrow key={i} a={S(a as [number, number])} b={S(b as [number, number])} p={prog(f, at("14", 0.35) + i * 4, 12)} />)}
        </svg>
      )}

      {/* ── 15–16 [NGƯỜI] Huỳnh Thành, "ôm nhau kêu khổ" (quote card, no portrait) ── */}
      <DataCard value="HUỲNH THÀNH" label="CỰU ĐBQH GIA LAI" x={500} y={330} f={f} at={at("15", 0.1)} out={at("16")} size={80} />
      <BigGold text="“ÔM NHAU KÊU KHỔ”" f={f} at={at("16", 0.45)} out={at("17", 0.3)} y={360} size={76} color={ATLAS.white} />
      {f >= at("16") - 2 && f < at("17", 0.3) + 6 && (
        <>
          <PegImg src={OLD_IMG("p3-dbscl-sut-lun", "d-09-farmer.png")} x={pk[0] + 40 + 3 * Math.sin(f / 3)} y={pk[1] + 260} h={250} f={f}
            at={at("16", 0.1)} o={1 - prog(f, at("17", 0.3), 5)} />
          <PegImg src={OLD_IMG("p3-dbscl-sut-lun", "d-09-farmer.png")} x={pk[0] + 170 - 3 * Math.sin(f / 3)} y={pk[1] + 268} h={240} f={f}
            at={at("16", 0.2)} o={1 - prog(f, at("17", 0.3), 5)} />
          <Sticker x={pk[0] + 105} y={pk[1] - 50} f={f} at={at("16", 0.3)} out={at("17", 0.2)} s={1.2}>
            {/* small grey cloud with rain */}
            <g fill="#8E979C" stroke={ATLAS.ink} strokeWidth={4}>
              <circle cx={-40} cy={0} r={30} /><circle cx={0} cy={-18} r={38} /><circle cx={42} cy={0} r={30} />
              <rect x={-70} y={0} width={140} height={28} rx={14} />
            </g>
            {[-36, 0, 36].map((x, i) => {
              const t = ((f / 14 + i * 0.33) % 1);
              return <line key={i} x1={x} y1={40 + 30 * t} x2={x - 6} y2={58 + 30 * t} stroke="#7EC8F0" strokeWidth={6} strokeLinecap="round" opacity={1 - t} />;
            })}
          </Sticker>
        </>
      )}

      {/* ── 17–19 land + port: coffee at Pleiku, port at Quy Nhơn, the truck goes down ── */}
      <CityPin cam={cam} f={f} label="PLEIKU" at={PLEIKU} from={at("17", 0.35)} o={show(f, at("17", 0.35), at("20") - 4) * (f >= at("27") ? 0 : 1)} side="above" />
      <ImgSticker src={`${IMG}/g-01-coffee-sacks.png`} x={pk[0] + 30} y={pk[1] + 150} w={230} f={f} at={at("17", 0.4)} out={at("19", 0.2)} />
      <ImgSticker src={OLD_IMG("i-singapore", "i-10-port-crane.png")} x={qn[0] - 30} y={qn[1] - 120} w={170} f={f} at={at("18", 0.1)} out={at("20") - 4} />
      <ImgSticker src={OLD_IMG("p4-malacca-kra", "t-02-container-ship.png")} x={qn[0] + 40} y={qn[1] + 110} w={190} f={f} at={at("18", 0.3)} out={at("20") - 4} />
      {f >= at("19") && f < at("20") && (() => {
        const p = prog(f, at("19", 0.1), at("19", 0.95) - at("19", 0.1));
        const [tx, ty] = routeHead(road, p);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("20") - 6, 5) }}>
            <Route pts={road} p={p} color={ATLAS.white} />
            <ImgSticker src={`${IMG}/g-02-produce-truck.png`} x={tx} y={ty - 50} w={150} f={f} at={at("19", 0.1)} />
          </AbsoluteFill>
        );
      })()}
      <CityPin cam={cam} f={f} label="QUY NHƠN" at={QUY_NHON} from={at("19", 0.5)} o={show(f, at("19", 0.5), at("20") - 4)} side="left" />

      {/* ── 20–21 the whole country: 35 → 13 provinces without a coast ── */}
      {f >= at("20") && f < at("22") && (
        <DataCard value={`${count(f, at("21", 0.15), 18, 13, 35)} TỈNH`} label="KHÔNG CÓ BIỂN" x={500} y={330} f={f} at={at("20", 0.3)} out={at("22")} />
      )}

      {/* ── 22–23 two sides ── */}
      {f >= at("23") && f < at("24") && (() => {
        const p = prog(f, at("23", 0.3), at("23", 0.95) - at("23", 0.3));
        const [cx2, cy2] = routeHead(far, p);
        const o = 1 - prog(f, at("24") - 6, 5);
        return (
          <AbsoluteFill style={{ opacity: o }}>
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <path d={far.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ")} fill="none" stroke={ATLAS.white} strokeWidth={6}
                strokeDasharray="2 14" strokeLinecap="round" opacity={prog(f, at("23", 0.15), 6)} />
              <circle cx={far[0][0]} cy={far[0][1]} r={10} fill="#9AA3A8" stroke={ATLAS.ink} strokeWidth={4} opacity={prog(f, at("23", 0.1), 5)} />
              <circle cx={qn[0]} cy={qn[1]} r={12} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={4} opacity={prog(f, at("23", 0.1), 5)} />
            </svg>
            <ImgSticker src={OLD_IMG("p1-brunei-chia-doi", "b-06-car.png")} x={cx2} y={cy2 - 26} w={90} f={f} at={at("23", 0.3)} />
          </AbsoluteFill>
        );
      })()}
      <DataCard value="CẢ TRĂM KM" x={500} y={330} f={f} at={at("23", 0.5)} out={at("24") - 4} />

      {/* ── 24–26 Lâm Đồng: largest province; Đà Lạt + Mũi Né ── */}
      <DataCard value="24.233 KM²" label="RỘNG NHẤT NƯỚC" x={500} y={330} f={f} at={at("24", 0.3)} out={at("25")} />
      <CityPin cam={cam} f={f} label="ĐÀ LẠT" at={DA_LAT} from={at("25", 0.05)} o={show(f, at("25", 0.05), at("27") - 4)} side="right" />
      <CityPin cam={cam} f={f} label="MŨI NÉ" at={MUI_NE} from={at("25", 0.35)} o={show(f, at("25", 0.35), at("27") - 4)} side="left" />
      <ImgSticker src={`${IMG}/g-03-pine-hill-fog.png`} x={dl[0] + 150} y={dl[1] - 110} w={190} f={f} at={at("25", 0.1)} out={at("27") - 4} />
      <ImgSticker src={`${IMG}/g-04-beach.png`} x={mn[0] + 190} y={mn[1] + 40} w={190} f={f} at={at("25", 0.4)} out={at("27") - 4} />
      {f >= at("26") && f < at("27") && (() => {
        // [ĐÙA] the sun goes from Đà Lạt (morning) to Mũi Né (afternoon)
        const p = prog(f, at("26", 0.05), at("26", 0.9) - at("26", 0.05));
        const [mx, my] = [Math.max(dl[0], mn[0]) + 230, (dl[1] + mn[1]) / 2];
        const x = (1 - p) ** 2 * dl[0] + 2 * (1 - p) * p * mx + p ** 2 * mn[0];
        const y = (1 - p) ** 2 * (dl[1] - 60) + 2 * (1 - p) * p * my + p ** 2 * (mn[1] - 60);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("27") - 6, 5) }}>
            <path d={`M ${dl[0]} ${dl[1] - 60} Q ${mx} ${my} ${mn[0]} ${mn[1] - 60}`} fill="none" stroke={ATLAS.white} strokeWidth={5} strokeDasharray="2 14"
              strokeLinecap="round" />
            <g style={{ translate: `${x}px ${y}px`, rotate: `${f * 2}deg` }}>
              {Array.from({ length: 8 }, (_, i) => (
                <line key={i} x1={0} y1={-44} x2={0} y2={-60} stroke={ATLAS.gold} strokeWidth={7} strokeLinecap="round" style={{ rotate: `${i * 45}deg` }} />
              ))}
              <circle r={34} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
            </g>
          </svg>
        );
      })()}

      {/* ── 27–28 [TWIST] Gia Lai's administrative centre sits by the sea ── */}
      {f >= at("27", 0.15) && f < at("27", 0.7) && <Pulse x={pk[0]} y={pk[1]} f={f} o={1 - prog(f, at("27", 0.6), 6)} />}
      <CityPin cam={cam} f={f} label="PLEIKU" at={PLEIKU} from={at("27", 0.1)} o={0.55 * show(f, at("27", 0.1), at("28", 0.5))} side="above" />
      <ImgSticker src={OLD_IMG("p4-malacca-kra", "t-11-gov-building.png")} x={qn[0] - 40} y={qn[1] - 130} w={180} f={f} at={at("27", 0.7)} out={at("28", 0.5)} />
      {f >= at("27", 0.7) && f < at("28", 0.6) && <Pulse x={qn[0]} y={qn[1]} f={f} color={ATLAS.red} o={1 - prog(f, at("28", 0.5), 6)} />}
      <CityPin cam={cam} f={f} label="QUY NHƠN" at={QUY_NHON} from={at("27", 0.7)} o={show(f, at("27", 0.7), at("28", 0.5))} color={ATLAS.red} side="left" />

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "*5 tỉnh* Tây Nguyên vốn không có một mét *bờ biển* nào.",
  "02": "Giờ, tỉnh nào cũng có *biển*.",
  "04": "Vì *gộp tỉnh*.",
  "05": "Giữa năm *2025*, Việt Nam vẽ lại bản đồ hành chính.",
  "06": "Cả nước có *63* tỉnh thành.",
  "07": "Gộp lại, còn *34*.",
  "14": "Đề án của Chính phủ ghi rõ: ưu tiên ghép tỉnh *miền núi* với tỉnh *có biển*.",
  "16": "Các tỉnh Tây Nguyên tách nhập với nhau mãi, chỉ cùng *ôm nhau kêu khổ*.",
  "19": "Như Gia Lai, giờ có cảng *Quy Nhơn* ngay trong tỉnh.",
  "20": "Nhìn cả nước, trước khi gộp có *35* tỉnh không có biển.",
  "21": "Giờ chỉ còn *13*.",
  "23": "Người lo thì nhắc, tỉnh rộng ra, có xã cách trung tâm tỉnh *cả trăm km*.",
  "24": "Lâm Đồng giờ là tỉnh *rộng nhất nước*, hơn *24.000 km²*.",
  "25": "*Đà Lạt* với *Mũi Né* thành người chung tỉnh.",
  "27": "Còn Gia Lai, tỉnh của phố núi *Pleiku*, giờ đặt trung tâm hành chính ở *Quy Nhơn*.",
  "28": "Tỉnh mang tên *cao nguyên*, giờ có thủ phủ bên *bờ biển*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/cinematic-piano-hit-567216.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [CLICK, "01", 0.35], [W, "02", 0.1], [CLICK, "03"], [THUD, "04", 0.05, 0, -18],
  [W2, "05", 0, -4], [CLICK, "06", 0.05], [THUD, "07", 0.1, 0, -18],
  [W, "08", 0, -4], [PEN, "09", 0.15], [PEN, "10", 0.15], [PEN, "11", 0.6],
  [W2, "13", 0, -4], [CLICK, "14", 0.25], [W, "15", 0, -4],
  [CLICK, "17", 0.2], [CLICK, "18", 0.1], [W2, "19", 0.1],
  [W, "20", 0, -4], [THUD, "21", 0.15, 0, -18], [CLICK, "22", 0.15],
  [W, "24", 0, -4], [CLICK, "25", 0.05],
  [HIT, "27", 0.7],
];

/** Music duck: the bed dips under the closing twist. */
const musicDuck = (f: number) => interpolate(f, [at("27") - 6, at("27") + 6, at("28", 1) - 4, at("28", 1) + 6], [1, 0.35, 0.35, 1], CLAMP);

export const P1TayNguyenCoBien: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p1-tay-nguyen-co-bien/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P1} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p1TayNguyenCoBienDuration = (fps: number) => episodeDuration(timing, fps);
