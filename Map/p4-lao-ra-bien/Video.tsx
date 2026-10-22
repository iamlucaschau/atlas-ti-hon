/**
 * Atlas Tí Hon · P4 Tuyến đường & hành trình · Journey Route (style I Toy Atlas):
 * "Lào không có biển, cửa biển ở Hà Tĩnh" (Lucas 2026-10-22).
 * Script + sources: kich-ban-p4-lao-ra-bien-FINAL.md, cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing. Soft loop: the VO ends on line 25; the last frame is the opening
 * frame (Southeast Asia, Laos not highlighted).
 *
 * Map: world-atlas (Natural Earth). The routes (Savannakhet → Laem Chabang, the Laos–China railway, the
 * future Vientiane – Vũng Áng railway) are SCHEMATIC; "~400 km" is Luis's great-circle measure
 * (Vientiane → Vũng Áng, 399 km). The port scene (crane, ship, cargo) and the ribbon are illustrative props;
 * no person is drawn for the 28/4/2025 inauguration (Gate 2).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p4-lao-ra-bien.timing.json";
import words from "../../src/voiceover/p4-lao-ra-bien.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, baseXY, beats, camAt, CountryTag, countryPath, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MAP_Y,
  MapLabel, PegImg, pts, Pulse, Question, Route, routeHead, seamKeys, show, Stamp, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p4-lao-ra-bien/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];
const VIENTIANE: LL = [102.63, 17.97];
const VUNG_ANG: LL = [106.4, 18.11];
const SAVANNAKHET: LL = [104.75, 16.57];
const LAEM_CHABANG: LL = [100.88, 13.08];
const KUNMING: LL = [102.71, 25.04];
const CHA_LO: LL = [105.75, 17.68];
const CAU_TREO: LL = [105.15, 18.39];
const THAKHEK: LL = [104.8, 17.4];

/** Schematic routes. */
const TO_THAI: LL[] = [SAVANNAKHET, [103.8, 15.6], [102.4, 14.6], [101.4, 13.7], LAEM_CHABANG];
const TO_CHINA: LL[] = [VIENTIANE, [102.3, 19.0], [101.9, 20.2], [101.45, 21.2], [101.6, 22.3], [102.2, 23.5], KUNMING];
const FUTURE: LL[] = [VIENTIANE, [103.7, 17.75], THAKHEK, CHA_LO, VUNG_ANG];
/** The Mekong along the west of Laos (schematic). */
const MEKONG: LL[] = [[100.1, 20.35], [101.0, 20.0], [102.13, 19.89], [101.8, 18.7], [102.2, 18.1], VIENTIANE, [103.66, 18.38], [104.4, 17.9], THAKHEK, SAVANNAKHET, [105.8, 15.12], [105.9, 13.9]];

/** The ten Southeast Asian countries with a coast, in the order their coasts light up (hook). */
const COASTAL = ["Myanmar", "Thailand", "Cambodia", "Vietnam", "Malaysia", "Singapore", "Brunei", "Indonesia", "Philippines", "Timor-Leste"];
/** Land that masks the coast glow so it only shows on the sea side. */
const LAND = [...COASTAL, "Laos", "China", "India", "Bangladesh", "Taiwan", "Papua New Guinea", "Australia", "Bhutan", "Nepal"];

const VIEW = {
  sea: { lon: 113, lat: 5, zoom: 6 },
  seaIn: { lon: 109, lat: 10, zoom: 7.4 },
  lao: { lon: 104, lat: 18.3, zoom: 34 },
  indo: { lon: 102.5, lat: 20.25, zoom: 19 },
  east: { lon: 104.5, lat: 18.0, zoom: 50 },
  port: { lon: 106.25, lat: 18.0, zoom: 260 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.sea },
  // opening (Bible 2026-10-21): the camera moves in from frame 1 while the coasts light up
  { at: 1, ...VIEW.seaIn },
  { at: at("04") - 4, ...VIEW.lao },
  { at: at("08") - 4, ...VIEW.indo },
  { at: at("12") - 4, ...VIEW.east },
  { at: at("15") - 4, ...VIEW.port },
  { at: at("22") - 4, ...VIEW.east },
  { at: at("25", 0.4), ...VIEW.sea },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const LAO = "#E3A33C";
const SEA_GLOW = "#7FE3F0";
const LAO_BLUE = "#002868";

/** A glow on the sea side of these countries' coasts (o per country, 0–1). */
const CoastGlow: React.FC<{ cam: GeoCam; list: { name: string; o: number }[]; f: number }> = ({ cam, list, f }) => {
  if (!list.some((c) => c.o > 0)) return null;
  const [cx, cy] = baseXY(cam.lon, cam.lat);
  const z = cam.zoom;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute" }}>
      <defs>
        <mask id="cg-sea" maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={4000} height={4000}>
          <rect x={-2000} y={-2000} width={4000} height={4000} fill="#fff" />
          {LAND.map((n) => <path key={n} d={countryPath(n)} fill="#000" />)}
        </mask>
      </defs>
      <g style={{ translate: `${CX - cx * z}px ${MAP_Y - cy * z}px`, scale: z, transformOrigin: "0 0" }} mask="url(#cg-sea)">
        {list.filter((c) => c.o > 0).map((c) => (
          <path key={c.name} d={countryPath(c.name)} fill="none" stroke={SEA_GLOW} strokeOpacity={c.o * (0.8 + 0.2 * Math.sin(f / 7))}
            strokeWidth={16 / z} strokeLinejoin="round" />
        ))}
      </g>
    </svg>
  );
};

/** Arrow (screen space) from a to b, drawn on with p. */
const Arrow: React.FC<{ a: [number, number]; b: [number, number]; p: number; o?: number; color?: string }> = ({ a, b, p, o = 1, color = ATLAS.white }) => {
  if (p <= 0 || o <= 0) return null;
  const e: [number, number] = [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p];
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = (s: number) => `${e[0] + 26 * Math.cos(ang + s)} ${e[1] + 26 * Math.sin(ang + s)}`;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <path d={`M ${a[0]} ${a[1]} L ${e[0]} ${e[1]}`} stroke={ATLAS.ink} strokeWidth={13} strokeLinecap="round" />
      <path d={`M ${a[0]} ${a[1]} L ${e[0]} ${e[1]}`} stroke={color} strokeWidth={7} strokeLinecap="round" />
      <path d={`M ${h(Math.PI * 0.82)} L ${e[0]} ${e[1]} L ${h(-Math.PI * 0.82)}`} fill="none" stroke={ATLAS.ink} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${h(Math.PI * 0.82)} L ${e[0]} ${e[1]} L ${h(-Math.PI * 0.82)}`} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Dashed straight line (screen space), drawn on with p. */
const Dashed: React.FC<{ ps: [number, number][]; p: number; o?: number; color?: string; w?: number }> = ({ ps, p, o = 1, color = ATLAS.white, w = 7 }) => {
  if (p <= 0 || o <= 0) return null;
  const d = ps.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <defs>
        <mask id={`dm-${Math.round(ps[0][0])}-${Math.round(ps[0][1])}`}>
          <path d={d} fill="none" stroke="#fff" strokeWidth={w + 12} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} strokeLinecap="round" />
        </mask>
      </defs>
      <g mask={`url(#dm-${Math.round(ps[0][0])}-${Math.round(ps[0][1])})`}>
        <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={w + 6} strokeDasharray="22 14" strokeLinecap="round" strokeLinejoin="round" />
        <path d={d} fill="none" stroke={color} strokeWidth={w} strokeDasharray="22 14" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/** Small bird (screen space), wings flapping. */
const Bird: React.FC<{ f: number }> = ({ f }) => {
  const k = 8 * Math.sin(f / 2);
  return (
    <path d={`M -22 ${-k} Q -11 -12 0 0 Q 11 -12 22 ${-k}`} fill="none" stroke={ATLAS.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  // the loop: every highlight goes back before the last frame
  const tail = prog(f, at("25", 0.5), 14);

  // 01 hook: coasts light up one by one (Laos has none); 03 Laos floods in from Vientiane
  const coastO = Math.min(1, 1 - prog(f, at("03", 0.5), 10));
  const coastList = COASTAL.map((name, i) => ({ name, o: coastO * prog(f, at("01", 0.08 + i * 0.075), 8) }));
  const laoP = prog(f, at("03"), 16, ease) * (1 - tail);
  const fills: Fill[] = [
    { name: "Vietnam", color: VN },
    { name: "Paracel Is.", color: VN },
    { name: "Spratly Is.", color: VN },
    ...(laoP > 0 ? [{ name: "Laos", color: LAO, wipe: { from: ATLAS.land, lon: VIENTIANE[0], lat: VIENTIANE[1], p: laoP } }] : []),
  ];

  const vte = S(VIENTIANE);
  const va = S(VUNG_ANG);

  // 06 five neighbours
  const nb: LL[] = [[101.9, 22.0], [100.4, 20.7], [101.2, 17.7], [106.0, 14.3], [106.6, 17.0]];
  const from: LL = [103.4, 18.6];

  // 09 truck to Laem Chabang · 10–11 train to Kunming
  const thaiP = prog(f, at("09", 0.05), 40, ease);
  const thai = pts(cam, TO_THAI);
  const chinaP = prog(f, at("10", 0.1), 40, ease);
  const china = pts(cam, TO_CHINA);
  const trainP = interpolate(f, [at("11"), at("11", 0.75)], [0, 0.5], { ...CLAMP, easing: ease });

  // 13 the bird's line · 14 border gates → port · 23–25 the future railway
  const birdP = prog(f, at("13", 0.1), 46, ease);
  const gateP = prog(f, at("14", 0.1), 26, ease);
  const futP = prog(f, at("23", 0.1), 60, ease);
  const futO = Math.min(prog(f, at("23"), 6), 1 - prog(f, at("25", 0.75), 10));

  // 15–21 the port (screen-space stage)
  const portO = Math.min(prog(f, at("15", 0.05), 8), 1 - prog(f, at("22") - 6, 6));
  const convoy = prog(f, at("15", 0.1), at("16", 0.6) - at("15", 0.1));
  const snip = at("21", 0.55);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={fills} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [22, 30], [1, 0], CLAMP)} />
      <CoastGlow cam={cam} list={coastList} f={f} />
      {/* 12 the sea behind Trường Sơn */}
      <CoastGlow cam={cam} list={[{ name: "Vietnam", o: Math.min(prog(f, at("12", 0.2), 10), 1 - prog(f, at("13", 0.6), 10)) }]} f={f} />

      {/* ── 01–03 hook ── */}
      <DataCard value="11 NƯỚC" label="ĐÔNG NAM Á" x={CX} y={330} f={f} at={at("01", 0.2)} out={at("02", 0.6)} size={96} />
      <Question x={S([103.2, 19.4])[0]} y={S([103.2, 19.4])[1]} f={f} at={at("02")} out={at("03", 0.6)} s={1.1} />
      <CountryTag cam={cam} f={f} name="Laos" label="LÀO" flag="laos" anchor={[102.3, 20.6]} from={at("03")}
        o={show(f, at("03"), at("07") - 4)} glow={[at("03", 0.1)]} />

      {/* ── 04–05 Vientiane; [ĐÙA] hitchhiking ── */}
      <CityPin cam={cam} f={f} label="VIÊNG CHĂN" at={VIENTIANE} from={at("04", 0.4)} o={show(f, at("04", 0.4), at("06"))} side="right" />
      <PegImg src={`${IMG}/a-01-hitchhiker.png`} x={vte[0] + 30} y={vte[1] + 300} h={260} f={f} at={at("05")} o={1 - prog(f, at("06", 0.3), 6)} />

      {/* ── 06 five neighbours ── */}
      {nb.map((ll, i) => (
        <Arrow key={i} a={S(from)} b={S(ll)} p={prog(f, at("06", 0.05 + i * 0.08), 10, ease)} o={1 - prog(f, at("07"), 6)} />
      ))}
      <DataCard value="5 NƯỚC" label="BỐN BỀ ĐẤT LIỀN" x={CX} y={330} f={f} at={at("06", 0.3)} out={at("07")} size={96} />

      {/* ── 07 Mekong (west), Trường Sơn (east) ── */}
      <Track ps={pts(cam, MEKONG)} p={prog(f, at("07"), 30, ease)} color="#5BB8E8" w={9} glow={0.5} f={f}
        o={Math.min(prog(f, at("07"), 4), 1 - prog(f, at("08"), 8))} />
      <MapLabel text="MÊ KÔNG" x={S([101.8, 19.3])[0]} y={S([101.8, 19.3])[1]} o={show(f, at("07", 0.1), at("08"))} size={50} />
      {([[105.3, 18.9], [106.55, 16.6]] as LL[]).map((ll, i) => {
        const [x, y] = S(ll);
        return <ImgSticker key={i} src={`${OLD}/p5-cho-hep-nhat/cut/n-02-mountain-range.png`} x={x} y={y} w={300} f={f} at={at("07", 0.4) + i * 4} out={at("08") - 2} />;
      })}
      <MapLabel text="TRƯỜNG SƠN" x={S([105.3, 18.9])[0]} y={S([105.3, 18.9])[1] - 80} o={show(f, at("07", 0.5), at("08"))} size={50} />

      {/* ── 08–09 west via Thailand, > 700 km ── */}
      <CountryTag cam={cam} f={f} name="Thailand" label="THÁI LAN" flag="thailand" anchor={[100.6, 15.6]} from={at("08", 0.2)}
        o={show(f, at("08", 0.2), at("10"))} glow={[at("08", 0.3)]} />
      {f >= at("09") && f < at("12") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("10"), 8) }}>
          <Route pts={thai} p={thaiP} color={ATLAS.white} />
          {(() => {
            const [x, y] = routeHead(thai, thaiP);
            return <ImgSticker src={`${OLD}/p1-tay-nguyen-co-bien/cut/g-02-produce-truck.png`} x={x} y={y - 40} w={120} f={f} at={at("09", 0.05)} />;
          })()}
        </AbsoluteFill>
      )}
      <DataCard value="> 700 KM" label="QUA THÁI LAN" x={CX} y={330} f={f} at={at("09", 0.4)} out={at("10")} size={96} />

      {/* ── 10–11 north by rail to China, > 1.000 km, still no sea ── */}
      <Track ps={china} p={chinaP} color={ATLAS.gold} w={9} f={f} o={Math.min(prog(f, at("10"), 4), 1 - prog(f, at("12") - 2, 8))} />
      <YearRibbon text="2021" f={f} at={at("10", 0.1)} out={at("11")} />
      <CountryTag cam={cam} f={f} name="China" label="TRUNG QUỐC" flag="china" anchor={[104.9, 23.9]} from={at("10", 0.4)}
        o={show(f, at("10", 0.4), at("12") - 4)} glow={[at("10", 0.6)]} />
      {f >= at("11") && f < at("12") && (() => {
        const [x, y] = routeHead(china, trainP);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("12") - 6, 5) }}>
            <ImgSticker src={`${OLD}/p4-malacca-kra/cut/t-06-freight-train.png`} x={x} y={y - 30} w={240} f={f} at={at("11")} />
          </AbsoluteFill>
        );
      })()}
      <DataCard value="> 1.000 KM" label="ĐƯỜNG RAY" x={CX} y={330} f={f} at={at("11")} out={at("12") - 4} size={96} />
      <Question x={S([100.6, 20.0])[0]} y={S([100.6, 20.0])[1]} f={f} at={at("11", 0.75)} out={at("12") - 4} s={1.1} />

      {/* ── 12–14 east: behind Trường Sơn, the sea; ~400 km as the crow flies; > 100 km from the border gates ── */}
      <CityPin cam={cam} f={f} label="VŨNG ÁNG" at={VUNG_ANG} from={at("13", 0.3)}
        o={Math.max(show(f, at("13", 0.3), at("15") - 4), show(f, at("22"), at("25", 0.15)))} side="above" color={ATLAS.red} />
      <Dashed ps={[vte, va]} p={birdP} o={Math.min(1, 1 - prog(f, at("15") - 6, 6))} />
      {birdP > 0 && birdP < 1 && (
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          <g style={{ translate: `${vte[0] + (va[0] - vte[0]) * birdP}px ${vte[1] + (va[1] - vte[1]) * birdP - 34}px` }}><Bird f={f} /></g>
        </svg>
      )}
      <CityPin cam={cam} f={f} label="VIÊNG CHĂN" at={VIENTIANE} from={at("12", 0.3)} o={show(f, at("12", 0.3), at("13", 0.55))} side="above" />
      <DataCard value="~400 KM" label="ĐƯỜNG CHIM BAY" x={CX} y={330} f={f} at={at("13", 0.6)} out={at("14")} size={96} />
      {[CHA_LO, CAU_TREO].map((ll, i) => (
        <Track key={i} ps={[S(ll), va]} p={gateP} color={ATLAS.gold} w={8} f={f} o={Math.min(prog(f, at("14"), 4), 1 - prog(f, at("15") - 4, 6))} />
      ))}
      <DataCard value="> 100 KM" label="CỬA KHẨU → CẢNG" x={CX} y={330} f={f} at={at("14", 0.3)} out={at("15") - 2} size={96} />

      {/* ── 15–21 the port (illustrative stage) ── */}
      {portO > 0 && (
        <AbsoluteFill style={{ opacity: portO }}>
          <ImgSticker src={`${IMG}/a-04-bulk-ship.png`} x={va[0] + 60} y={va[1] - 170} w={330} f={f} at={at("15", 0.3)} />
          <ImgSticker src={`${OLD}/i-singapore/cut/i-10-port-crane.png`} x={va[0] - 40} y={va[1] + 30} w={230} f={f} at={at("16")} />
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("21"), 8) }}>
            <ImgSticker src={`${IMG}/a-02-potash-ore.png`} x={va[0] - 250} y={va[1] + 140} w={230} f={f} at={at("15", 0.2)} />
            {[0, 1, 2].map((i) => {
              const p = Math.min(1, Math.max(0, convoy * 1.4 - i * 0.2));
              return (
                <ImgSticker key={i} src={`${OLD}/p1-tay-nguyen-co-bien/cut/g-02-produce-truck.png`}
                  x={interpolate(p, [0, 1], [-120, va[0] - 420 + i * 80])} y={va[1] + 290 + i * 80} w={130} f={f} at={at("15", 0.1) + i * 6} />
              );
            })}
          </AbsoluteFill>
        </AbsoluteFill>
      )}
      <YearRibbon text="2024" f={f} at={at("15", 0.1)} out={at("16", 0.15)} />
      <DataCard value="> 5 TRIỆU TẤN" label="QUA CẢNG" x={CX} y={330} f={f} at={at("16", 0.2)} out={at("17")} size={84} />
      {f >= at("17") && f < at("18") + 4 && (() => {
        const p = prog(f, at("17", 0.15), 12, ease);
        const r = 90;
        const a1 = -Math.PI / 2 + (2 * Math.PI / 3) * p;
        const x1 = CX + r * Math.cos(a1);
        const y1 = 1230 + r * Math.sin(a1);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("18"), 4) }}>
            <circle cx={CX} cy={1230} r={r} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
            {p > 0 && <path d={`M ${CX} 1230 L ${CX} ${1230 - r} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`} fill={LAO} stroke={ATLAS.ink} strokeWidth={5} />}
          </svg>
        );
      })()}
      <DataCard value="~1/3" label="HÀNG CỦA LÀO" x={CX} y={330} f={f} at={at("17", 0.1)} out={at("18")} size={96} />

      {/* ── 18–20 the odd twist: the port's owner; Laos holds 60 % ── */}
      <Question x={va[0] - 130} y={va[1] - 120} f={f} at={at("18")} out={at("19")} s={1.2} />
      {f >= at("19") && f < at("22") && (() => {
        const drop = interpolate(f, [at("19"), at("19") + 7], [-260, 0], { ...CLAMP, easing: Easing.in(Easing.quad) });
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("22") - 6, 5) }}>
            <g style={{ translate: `${va[0] - 6}px ${va[1] - 150 + drop}px` }}><Flag kind="laos" w={110} f={f} /></g>
          </svg>
        );
      })()}
      {f >= at("20") && f < at("21") + 6 && (() => {
        const p = prog(f, at("20", 0.1), 16, ease);
        const W0 = 640;
        const x0 = CX - W0 / 2;
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("21"), 6) }}>
            <rect x={x0} y={1190} width={W0} height={90} rx={18} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
            <rect x={x0} y={1190} width={W0 * 0.6 * p} height={90} rx={18} fill={LAO} />
            <rect x={x0 + W0 * 0.6} y={1190} width={W0 * 0.4 * p} height={90} fill={VN} opacity={p > 0 ? 1 : 0} />
            <rect x={x0} y={1190} width={W0} height={90} rx={18} fill="none" stroke={ATLAS.ink} strokeWidth={6} />
            <line x1={x0 + W0 * 0.6} y1={1190} x2={x0 + W0 * 0.6} y2={1280} stroke={ATLAS.ink} strokeWidth={5} opacity={p} />
            <text x={x0 + W0 * 0.3} y={1252} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={LAO_BLUE} opacity={p}>LÀO</text>
          </svg>
        );
      })()}
      <DataCard value="60%" label="PHÍA LÀO" x={CX} y={330} f={f} at={at("20", 0.15)} out={at("21")} size={100} />

      {/* ── 21 [NGƯỜI] the new berth is inaugurated (28/4/2025) — no person drawn ── */}
      <YearRibbon text="28/4/2025" f={f} at={at("21", 0.05)} out={at("22") - 2} />
      {f >= at("21") && f < at("22") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("22") - 6, 5) }}>
          <ImgSticker src={`${IMG}/a-03-ribbon-cutting.png`} x={CX} y={1080 - 30 * prog(f, snip, 6) * (1 - prog(f, snip + 6, 8))} w={430} f={f} at={at("21", 0.1)} />
        </AbsoluteFill>
      )}
      {f >= snip && f < snip + 40 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, snip + 26, 12) }}>
          {Array.from({ length: 14 }, (_, i) => {
            const t = Math.min(1.3, (f - snip) / 30);
            const ang = (i / 14) * Math.PI * 2;
            const x = CX + Math.cos(ang) * 240 * Math.min(1, t * 1.6);
            const y = 960 + Math.sin(ang) * 160 * Math.min(1, t * 1.6) + 120 * t * t;
            return <rect key={i} x={x} y={y} width={16} height={9} rx={2} fill={[ATLAS.red, ATLAS.gold, LAO_BLUE][i % 3]} style={{ rotate: `${i * 40 + f * 6}deg`, transformOrigin: `${x + 8}px ${y + 4}px` }} />;
          })}
        </svg>
      )}
      <MapLabel text="BẾN SỐ 3" x={CX} y={1300} o={show(f, at("21", 0.3), at("22") - 2)} size={56} />

      {/* ── 22–25 [TWIST] a railway straight to the port is being studied — not built ── */}
      {f >= at("22") && f < at("23") && <Pulse x={vte[0]} y={vte[1]} f={f} color={LAO} o={1 - prog(f, at("23") - 4, 4)} />}
      <Dashed ps={pts(cam, FUTURE)} p={futP} o={futO} color={ATLAS.gold} w={8} />
      <CityPin cam={cam} f={f} label="VIÊNG CHĂN" at={VIENTIANE} from={at("22", 0.2)} o={show(f, at("22", 0.2), at("25", 0.15))} side="above" />
      <DataCard value="> 550 KM" label="ĐƯỜNG SẮT DỰ KIẾN" x={CX} y={330} f={f} at={at("23", 0.4)} out={at("24")} size={96} />
      <Stamp text="CHƯA XÂY" x={(vte[0] + va[0]) / 2 + 20} y={(vte[1] + va[1]) / 2 - 210} f={f} at={at("24", 0.3)} out={at("25", 0.45)} />
      {f >= at("25") && f < at("25", 0.9) && (
        <Track ps={pts(cam, FUTURE)} p={1} color={ATLAS.gold} w={6} glow={1} f={f} o={0.6 * (1 - prog(f, at("25", 0.6), 10))} />
      )}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "*11 nước* Đông Nam Á, chỉ một nước không có biển.",
  "03": "*Lào*.",
  "05": "*Đi nhờ*.",
  "06": "Lào giáp *5 nước*, bốn bề là đất liền.",
  "09": "Từ Savannakhet tới cảng Laem Chabang, hơn *700 km*.",
  "10": "Từ cuối năm *2021*, Lào có thêm đường sắt lên Trung Quốc.",
  "11": "Hơn *1.000 km* đường ray, mà vẫn chưa thấy biển.",
  "13": "Từ Viêng Chăn tới cảng *Vũng Áng* ở Hà Tĩnh, đường chim bay chỉ khoảng *400 km*.",
  "14": "Qua cửa khẩu, đi thêm hơn *100 km* là tới cảng.",
  "15": "Năm *2024*, kali và quặng sắt của Lào nối đuôi nhau ra đây.",
  "16": "Cả cảng thông qua hơn *5 triệu tấn* hàng.",
  "17": "Khoảng *1/3* là hàng của Lào.",
  "19": "*Chủ cảng*.",
  "20": "Phía Lào nắm *60%* công ty khai thác cảng.",
  "21": "Tháng 4 năm *2025*, Tổng Bí thư, Chủ tịch nước Lào *Thongloun Sisoulith* tới tận Vũng Áng, dự khánh thành một bến mới.",
  "23": "Một tuyến đường sắt hơn *550 km* đang được tính, nối thẳng Viêng Chăn ra Vũng Áng.",
  "25": "Không có biển, Lào *đi tìm biển*, và tìm thấy một cửa ở *Hà Tĩnh*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const STAMP = "hit/punch-impact-hit-567196.mp3";
const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [W2, "01", 0, -1], [CLICK, "03", 0.1], [W, "04", 0, -4], [CLICK, "05", 0.2], [W2, "08", 0, -4], [CLICK, "10", 0.6],
  [W, "12", 0, -4], [CLICK, "13", 0.3], [W2, "15", 0, -4], [CLICK, "17", 0.15], [THUD, "19", 0.1, 0, -18],
  [PEN, "21", 0.55], [W, "22", 0, -4], [STAMP, "24", 0.3, 0, -20],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("22") - 6, at("22") + 6, at("25", 1) - 4, at("25", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

export const P4LaoRaBien: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p4-lao-ra-bien/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P4} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p4LaoRaBienDuration = (fps: number) => episodeDuration(timing, fps);
