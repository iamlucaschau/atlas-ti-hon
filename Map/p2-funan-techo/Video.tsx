/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (style I Toy Atlas): "Con kênh lấy nước sông Hậu" (kênh Funan Techo).
 * Script + sources: kich-ban-p2-funan-techo-FINAL.md (v2), cong-2_so-nguon.md. Beats: beat-sheet.md.
 * Every cue comes from the VO timing (at("NN", fraction)). Soft loop: the VO ends on line 22; the
 * picture returns to the opening frame (region map, both countries coloured, rivers) in the 0.7 s tail.
 *
 * Neutral by design (Lucas 2026-10-16): both sides get the same screen time and the same props;
 * no sea boundaries; no leader portraits. The canal, the Bassac/Hậu course and the old barge route
 * are ILLUSTRATIVE (Cổng 2 §3.6).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-funan-techo.timing.json";
import words from "../../src/voiceover/p2-funan-techo.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, count, CountryTag, DataCard, type Fill, type GeoCam, ImgSticker, pts, Pulse, Question,
  Route, routeHead, seamKeys, show, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/p2-funan-techo/cut";
const OLD = {
  ship: "images/p4-malacca-kra/cut/t-02-container-ship.png",
  digger: "images/p4-malacca-kra/cut/t-07-excavator-canal.png",
  money: "images/p2-duong-sat-cao-toc/cut/p-03-money-bags.png",
  rice: "images/p3-dbscl-sut-lun/cut/d-02-rice.png",
};
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);

const VIEW = {
  region: { lon: 105.6, lat: 10.95, zoom: 62 },
  bassac: { lon: 105.05, lat: 11.0, zoom: 160 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.region },
  { at: at("09") - 4, ...VIEW.bassac },
  { at: at("14") - 4, ...VIEW.region },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

const VN = ATLAS.c;
const KH = ATLAS.a;
const FILLS: Fill[] = [
  ...["Vietnam", "Paracel Is.", "Spratly Is."].map((name) => ({ name, color: VN })),
  { name: "Cambodia", color: KH },
];
const RIVER = "#5FA8D3";

// ---- illustrative geography (lon/lat) ----
const PHNOM_PENH: [number, number] = [104.92, 11.56];
const KEP: [number, number] = [104.32, 10.48];
const CAI_MEP: [number, number] = [107.02, 10.53];
const MOUTH: [number, number] = [106.6, 9.95];
/** Bassac (Cambodia) → sông Hậu (Vietnam). BORDER_P = where the course crosses the land border. */
const BASSAC: [number, number][] = [[104.92, 11.56], [104.97, 11.42], [105.03, 11.15], [105.08, 10.95], [105.12, 10.72], [105.43, 10.38], [105.78, 10.04], [106.05, 9.75], [106.3, 9.55]];
const BORDER: [number, number] = [105.08, 10.95];
/** The canal: Prek Takeo on the Bassac → Takeo → near Kampot → Kep. */
const CANAL: [number, number][] = [[104.97, 11.42], [104.85, 11.15], [104.78, 10.99], [104.6, 10.78], [104.45, 10.6], [104.32, 10.48]];
/** Old barge route: Phnom Penh → Mekong → the delta → the HCMC / Cái Mép port area. */
const OLD_ROUTE: [number, number][] = [[104.92, 11.56], [105.05, 11.3], [105.2, 10.95], [105.25, 10.75], [105.63, 10.45], [106.0, 10.32], [106.36, 10.35], [106.7, 10.6], [107.0, 10.55]];

/** River name pinned on the river, flipping like a sign from BASSAC to SÔNG HẬU at the border. */
const RiverName: React.FC<{ f: number; x: number; y: number; o: number }> = ({ f, x, y, o }) => {
  const flip = interpolate(f, [at("12") - 6, at("12") + 4], [0, 1], { ...CLAMP, easing: Easing.inOut(Easing.quad) });
  const sy = Math.abs(Math.cos(Math.PI * flip));
  const text = flip < 0.5 ? "BASSAC" : "SÔNG HẬU";
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: `1 ${Math.max(0.02, sy)}` }}>
        <text textAnchor="middle" y={20} fontFamily={FONT} fontWeight={800} fontSize={60} fill={flip < 0.5 ? ATLAS.white : ATLAS.gold}
          stroke={ATLAS.ink} strokeWidth={10} paintOrder="stroke" letterSpacing={2}>{text}</text>
      </g>
    </svg>
  );
};

/** Canal cross-section: ~5,5 m deep, the barge floats; the big container ship would sit on the bed. */
const CanalCard: React.FC<{ f: number }> = ({ f }) => {
  const a = at("19", 0.05);
  const out = at("22", 0.1);
  if (f < a - 2 || f > out + 6) return null;
  const o = Math.min(prog(f, a, 6), 1 - prog(f, out, 6));
  const X0 = 140;
  const W = 760;
  const TOP = 860;
  const H = 320;
  const surface = 70;
  const bed = surface + 90;
  const ship = interpolate(f, [at("20", 0.1), at("21", 0.35)], [W + 40, 400], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  const bump = f > at("21", 0.35) ? 4 * Math.sin((f - at("21", 0.35)) / 1.5) * Math.exp(-(f - at("21", 0.35)) / 10) : 0;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <rect x={X0 - 24} y={TOP - 20} width={W + 48} height={H + 40} rx={28} fill="rgba(22,32,40,0.86)" stroke={ATLAS.gold} strokeWidth={5} />
      </svg>
      <div style={{ position: "absolute", left: X0, top: TOP, width: W, height: H, overflow: "hidden", borderRadius: 14, background: "#BFE3F2" }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          {/* banks + bed */}
          <path d={`M 0 ${surface - 10} L 120 ${surface - 10} L 200 ${bed} L ${W - 200} ${bed} L ${W - 120} ${surface - 10} L ${W} ${surface - 10} L ${W} ${H} L 0 ${H} Z`}
            fill="#8A5A2E" stroke={ATLAS.ink} strokeWidth={4} />
          <path d={`M 120 ${surface} L 200 ${bed} L ${W - 200} ${bed} L ${W - 120} ${surface} Z`} fill="#6FB3D9" opacity={0.9} />
          {/* depth gauge */}
          <line x1={230} y1={surface} x2={230} y2={bed} stroke={ATLAS.gold} strokeWidth={9} strokeLinecap="round" />
        </svg>
        <Img src={staticFile(`${IMG}/f-01-container-barge.png`)} style={{ position: "absolute", left: 260, top: surface - 62 + 3 * Math.sin(f / 8), width: 250 }} />
        {f >= at("20", 0.1) && (
          <Img src={staticFile(OLD.ship)} style={{ position: "absolute", left: ship + bump, top: bed - 125, width: 520 }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const islandsO = interpolate(cam.zoom, [22, 30], [1, 0], CLAMP);
  const endO = 1 - prog(f, at("22", 0.8), 10);

  const bassac = pts(cam, BASSAC);
  const canal = pts(cam, CANAL);
  const old = pts(cam, OLD_ROUTE);
  const [ppx, ppy] = toScreen(cam, ...PHNOM_PENH);
  const [kx, ky] = toScreen(cam, ...KEP);
  const [mx, my] = toScreen(cam, ...MOUTH);
  const [cx, cy] = toScreen(cam, ...CAI_MEP);
  const [bx, by] = toScreen(cam, ...BORDER);

  // river glow: hook (02) and the Bassac → sông Hậu reveal (09–13)
  const riverGlow = Math.max(show(f, at("02"), at("03", 0.5)), show(f, at("09"), at("14")));
  // routes
  const oldP = prog(f, at("05", 0.1), at("05", 0.85) - at("05", 0.1), Easing.inOut(Easing.quad));
  const oldO = Math.min(show(f, at("05", 0.05)), 1 - 0.6 * show(f, at("07", 0.2), at("22")), 1 - show(f, at("09"), at("14")), endO);
  const canalP = prog(f, at("06", 0.05), 30, Easing.inOut(Easing.quad));
  const canalO = Math.min(show(f, at("06")), endO);
  const ending = show(f, at("22", 0.05));
  // river name rides down the river to the border (11), then flips (12)
  const nameP = interpolate(f, [at("11"), at("11", 0.85)], [0.18, 0.375], { ...CLAMP, easing: Easing.inOut(Easing.quad) });
  const [nx, ny] = routeHead(bassac, nameP);
  // tags: hidden whenever two other text blocks are on screen (05 VN only; 07, 15–16 none)
  const khO = show(f, at("01", 0.1), at("02", 0.4));
  const khBassacO = show(f, at("10"), at("11"));
  const vnRegionO = show(f, at("05", 0.5), at("07"));
  const vnBassacO = show(f, at("12", 0.3), at("14"));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={FILLS} f={f} />
      <VnIslands cam={cam} f={f} color={VN} o={islandsO} />

      {/* Bassac / sông Hậu (always — part of the loop frame), glowing when the story is about it */}
      <Track ps={bassac} p={1} color={RIVER} w={8} glow={riverGlow} f={f} />

      {/* ── 01–04 hook: > 1 bn USD; an unnamed river; "Đường ra biển." ── */}
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={[104.45, 11.85]} from={at("01", 0.1)} o={khO}
        glow={[at("01", 0.05), at("05", 0.3), at("10", 0.1), at("15", 0.1)]} />
      <CountryTag cam={cam} f={f} name="Cambodia" label="CAMPUCHIA" flag="cambodia" anchor={[105.5, 11.55]} from={at("10")} o={khBassacO} />
      <CountryTag cam={cam} f={f} name="Vietnam" label="VIỆT NAM" flag="vietnam" anchor={[106.55, 11.35]} from={at("05", 0.5)} o={vnRegionO}
        glow={[at("05", 0.6), at("12", 0.2), at("13", 0.2)]} />
      <CountryTag cam={cam} f={f} name="Vietnam" label="VIỆT NAM" flag="vietnam" anchor={[105.55, 10.45]} from={at("12")} o={vnBassacO} />
      <BigGold text="> 1 TỶ ĐÔ" f={f} at={at("01", 0.45)} out={at("02", 0.5)} y={330} size={120} />
      <ImgSticker src={OLD.money} x={(ppx + kx) / 2 - 40} y={(ppy + ky) / 2} w={170} f={f} at={at("01", 0.5)} out={at("02", 0.4)} />
      <Question x={bassac[5][0] + 70} y={bassac[5][1] - 60} f={f} at={at("02", 0.4)} out={at("04")} s={1.3} />
      <Question x={ppx + 70} y={ppy - 80} f={f} at={at("03")} out={at("04", 0.5)} s={1.1} />
      {f >= at("04") && f < at("05", 0.4) && (
        <>
          <Pulse x={kx} y={ky} f={f} period={30} />
          <Pulse x={mx} y={my} f={f} period={30} />
        </>
      )}
      <BigGold text="ĐƯỜNG RA BIỂN" f={f} at={at("04")} out={at("05", 0.25)} y={330} size={100} />

      {/* ── 05–07 the old way (via Vietnam) vs the new canal (to Kep); 1/3 → 1/10 ── */}
      {oldO > 0 && <AbsoluteFill style={{ opacity: oldO }}><Route pts={old} p={oldP} color={ATLAS.gold} /></AbsoluteFill>}
      {f >= at("05", 0.1) && f < at("07", 0.3) && (() => {
        const [x, y] = routeHead(old, oldP);
        return <ImgSticker src={`${IMG}/f-01-container-barge.png`} x={x} y={y - 30} w={190} f={f} at={at("05", 0.1)} out={at("07", 0.2)} />;
      })()}
      <DataCard value="~1/3" label="THEO CAMPUCHIA" x={540} y={330} f={f} at={at("05", 0.3)} out={at("06")} />
      {canalO > 0 && <Track ps={canal} p={canalP} color={ATLAS.white} w={10} o={canalO} glow={ending * 0.8} f={f} />}
      <BigGold text={`${count(f, at("06", 0.1), 24, 180)} KM`} f={f} at={at("06", 0.1)} out={at("07")} y={330} size={120} />
      {f >= at("06", 0.4) && f < at("07", 0.9) && (() => {
        const p = prog(f, at("06", 0.4), at("07", 0.8) - at("06", 0.4));
        const [x, y] = routeHead(canal, p);
        return <ImgSticker src={`${IMG}/f-01-container-barge.png`} x={x} y={y - 30} w={170} f={f} at={at("06", 0.4)} out={at("07", 0.85)} />;
      })()}
      <DataCard value="1/3" label="HÔM NAY" x={300} y={330} f={f} at={at("07", 0.05)} out={at("08")} />
      <DataCard value="1/10" label="MỤC TIÊU" x={760} y={330} f={f} at={at("07", 0.4)} out={at("08")} />

      {/* ── 08 [NGƯỜI] groundbreaking: podium + golden shovel at the canal head (no portrait) ── */}
      {(() => {
        const [x, y] = toScreen(cam, ...CANAL[0]);
        return <ImgSticker src={`${IMG}/f-02-groundbreaking.png`} x={x - 160} y={y + 40} w={300} f={f} at={at("08", 0.05)} out={at("09")} />;
      })()}
      <BigGold text="BẰNG MỌI GIÁ" f={f} at={at("08", 0.6)} out={at("09")} y={330} size={100} />

      {/* ── 09–13 the Bassac is the sông Hậu: two sides ── */}
      {f >= at("09") && f < at("14") && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: show(f, at("09", 0.3), at("14") - 5) }}>
          {/* canal head pulse + water taken into the canal; water keeps flowing downstream (Cambodia's statement) */}
          {Array.from({ length: 10 }, (_, i) => {
            const t = ((f - at("09")) / 60 + i / 10) % 1;
            const [x, y] = routeHead(bassac, 0.1 + 0.6 * t);
            return <circle key={i} cx={x} cy={y} r={7} fill="#BFE3F2" stroke={ATLAS.ink} strokeWidth={2} />;
          })}
          {f >= at("10") && Array.from({ length: 4 }, (_, i) => {
            const t = ((f - at("10")) / 50 + i / 4) % 1;
            const [x, y] = routeHead(canal, 0.12 * t);
            return <circle key={`c${i}`} cx={x} cy={y} r={7} fill="#BFE3F2" stroke={ATLAS.ink} strokeWidth={2} />;
          })}
        </svg>
      )}
      {f >= at("09") && f < at("10", 0.3) && (() => {
        const [x, y] = toScreen(cam, ...CANAL[0]);
        return <Pulse x={x} y={y} f={f} period={30} />;
      })()}
      <RiverName f={f} x={f < at("11") ? routeHead(bassac, 0.18)[0] + 150 : nx + 150} y={f < at("11") ? routeHead(bassac, 0.18)[1] : ny}
        o={show(f, at("09", 0.3), at("14") - 5)} />
      {f >= at("11", 0.6) && f < at("13") && <Pulse x={bx} y={by} f={f} period={26} />}
      <ImgSticker src={`${IMG}/f-03-documents-magnifier.png`} x={760} y={1210} w={220} f={f} at={at("13", 0.15)} out={at("14")} />
      <ImgSticker src={OLD.rice} x={480} y={1215} w={190} f={f} at={at("13", 0.3)} out={at("14")} />

      {/* ── 14–16 progress: two sources, same card size ── */}
      {f >= at("14") && f < at("17") && (() => {
        const a = canal.slice(1, 5);
        const o = show(f, at("14", 0.2), at("17")) * (0.6 + 0.4 * Math.sin(f / 5));
        return <Track ps={a} p={1} color={ATLAS.gold} w={14} o={o} />;
      })()}
      <YearRibbon text="4/2026" f={f} at={at("14", 0.15)} out={at("15")} />
      {[0.3, 0.6].map((p, i) => {
        const [x, y] = routeHead(canal, p);
        return <ImgSticker key={i} src={OLD.digger} x={x + (i ? -130 : 130)} y={y} w={190} f={f} at={at("14", 0.3) + i * 5} out={at("17")} />;
      })}
      <DataCard value="2028–2029" label="CAMPUCHIA" x={275} y={330} f={f} at={at("15", 0.15)} out={at("17")} size={60} />
      <DataCard value="0 %" label="BÁO ĐỘC LẬP" x={725} y={330} f={f} at={at("16", 0.4)} out={at("17")} size={60} />
      <ImgSticker src={`${IMG}/f-04-progress-gauge.png`} x={725} y={640} w={220} f={f} at={at("16", 0.55)} out={at("17")} />

      {/* ── 17–21 twist: depth ── */}
      <Question x={540} y={560} f={f} at={at("17")} out={at("18", 0.5)} s={1.6} />
      <BigGold text="ĐỘ SÂU" f={f} at={at("18")} out={at("19", 0.2)} y={330} size={130} />
      <CanalCard f={f} />
      <BigGold text="5,5 MÉT" f={f} at={at("19", 0.3)} out={at("20")} y={330} size={120} />
      {f >= at("20") && f < at("21") && <Pulse x={cx} y={cy} f={f} period={26} />}
      <DataCard value="200.000 TẤN" x={540} y={330} f={f} at={at("20", 0.4)} out={at("21")} size={80} />
      <ImgSticker src={`${IMG}/f-05-elephant-alley.png`} x={540} y={560} w={360} f={f} at={at("21", 0.05)} out={at("22")} />

      {/* ── 22 two doors to the sea: both routes glow, then everything fades back to the opening frame ── */}
      {ending > 0 && (
        <AbsoluteFill style={{ opacity: Math.min(ending, endO) }}>
          <Route pts={old} p={1} color={ATLAS.gold} />
          {[[kx, ky], [cx, cy]].map(([x, y], i) => <Pulse key={i} x={x} y={y} f={f + i * 13} period={36} />)}
        </AbsoluteFill>
      )}
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Campuchia đang chi hơn *1 tỷ đô* để đào một con kênh ra biển.",
  "04": "*Đường ra biển.*",
  "05": "Theo chính phủ Campuchia, khoảng *1/3* hàng hoá của họ phải xuôi Mê Kông qua Việt Nam rồi mới ra biển.",
  "06": "Kênh mới dài *180 km*, cắt thẳng xuống biển Kep.",
  "07": "Mục tiêu là hạ tỉ lệ ấy còn khoảng *1/10*.",
  "08": "Thủ tướng Hun Manet tuyên bố: kênh sẽ được xây *bằng mọi giá*.",
  "12": "Thành *sông Hậu*.",
  "14": "Tháng *4* năm nay, đoạn dài nhất bắt đầu thi công.",
  "15": "Phía Campuchia nói kênh xong khoảng năm *2028–2029*.",
  "16": "Còn báo chí độc lập ghi nhận: đầu năm nay, trang tiến độ chính thức vẫn báo *số 0*.",
  "18": "*Độ sâu.*",
  "19": "Kênh chỉ sâu chừng *5,5 mét*, vừa cho sà lan và tàu nhỏ.",
  "20": "Còn cảng Cái Mép đón được tàu container *200.000 tấn*.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const HIT = "hit/punch-impact-hit-567196.mp3";
// one real SFX per beat at most (beat-sheet.md)
const SFX: SfxCue[] = [
  [CLICK, "01", 0.45], [CLICK, "02", 0.4], [CLICK, "04"], [W2, "05", 0.1, 0, -20], [CLICK, "06", 0.1], [THUD, "07", 0.4, 0, -18],
  [CLICK, "08", 0.6], [W, "09", 0, -4], [CLICK, "10", 0.1], [THUD, "12", 0, -4, -18], [CLICK, "13", 0.15],
  [W, "14", 0, -4], [CLICK, "15", 0.15], [CLICK, "16", 0.4], [CLICK, "17"], [CLICK, "19", 0.3], [THUD, "20", 0.4, 0, -18],
  [HIT, "21", 0.35, 0, -22],
];

/** Music dips for the river reveal (12) and the closing line (22). */
const musicDuck = (f: number) =>
  Math.min(
    interpolate(f, [at("12") - 8, at("12"), at("12", 1), at("12", 1) + 10], [1, 0.45, 0.45, 1], CLAMP),
    interpolate(f, [at("22") - 6, at("22") + 6, at("22", 1) - 4, at("22", 1) + 6], [1, 0.4, 0.4, 1], CLAMP),
  );

export const P2FunanTecho: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-funan-techo/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2FunanTechoDuration = (fps: number) => episodeDuration(timing, fps);
