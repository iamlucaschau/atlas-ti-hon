/**
 * Style test I "Toy Atlas" (Vietnamese first, Lucas 2026-10-10):
 * "Vì sao bị Malaysia đuổi đi, Singapore lại giàu gấp 7 lần?"
 * Script + claim ledger: kich-ban-i-singapore-FINAL.md. One continuous map:
 * the camera flies at each change of place; every cue comes from the VO
 * timing. Soft loop (Lucas 2026-10-14): the VO ends on line 16; in the 0.7 s tail the map
 * returns to the opening frame.
 *
 * v2 (Lucas 2026-10-12): Lucas's chibi cut-outs; ambient motion everywhere
 * (water, flags, pawns, floating stickers, pulse) plus an event every
 * ~1.5–2 s; the split shown as a cut along the Johor Strait with the island
 * drifting away; count-ups; payoff as two bars; Vietnamese subtitle chunks of
 * ≤ 5 words; music −11 dB under the voice; every text ≥ 48 px.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/i-singapore.timing.json";
import words from "../../src/voiceover/i-singapore.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, BigGold, camAt, count, CountryShape, type Fill, Flag, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse, Route, routeHead, show, Sticker, toScreen, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";

const FPS = 30;
const IMG = "images/i-singapore/cut";
const { at } = beats(timing, FPS);

const SG: [number, number] = [103.82, 1.36];
const KL: [number, number] = [101.69, 3.14];
const VIEW = {
  home: { lon: 102.6, lat: 3.0, zoom: 36 },
  uk: { lon: -2.0, lat: 53.5, zoom: 18 },
  sgNear: { lon: 103.8, lat: 1.55, zoom: 90 },
  seas: { lon: 101, lat: 6, zoom: 7 },
  federation: { lon: 107.2, lat: 3.2, zoom: 17 },
  johor: { lon: 103.82, lat: 1.5, zoom: 110 },
  island: { lon: 103.82, lat: 1.4, zoom: 220 },
  strait: { lon: 101.5, lat: 3.2, zoom: 20 },
};
const KEYS: GeoCam[] = [
  { at: 0, ...VIEW.home },
  { at: at("03") - 4, ...VIEW.uk },
  { at: at("03", 0.5), ...VIEW.sgNear },
  { at: at("04") - 2, ...VIEW.seas },
  { at: at("05") - 6, ...VIEW.federation },
  { at: at("07") - 2, ...VIEW.johor },
  { at: at("09") - 6, ...VIEW.island },
  { at: at("12") - 4, ...VIEW.strait },
  { at: at("14") - 4, ...VIEW.island },
  { at: at("15") - 6, ...VIEW.home },
];

const GREEN = ATLAS.b; // Malaysia
const RED = ATLAS.c; // Singapore
const BLUE = ATLAS.a; // Britain

/** Territory colours over time (the wipes are the takeovers). */
const fillsAt = (f: number): Fill[] => {
  const wipe = (k: number, d = 22) => prog(f, k, d);
  if (f < at("03") - 4) return [{ name: "Malaysia", color: GREEN }, { name: "Singapore", color: RED }];
  if (f < at("05")) {
    return [
      { name: "United Kingdom", color: BLUE },
      { name: "Singapore", color: BLUE, wipe: { from: ATLAS.land, lon: SG[0], lat: SG[1], p: wipe(at("03", 0.62)) } },
    ];
  }
  const merged = wipe(at("05", 0.35));
  const split = wipe(at("07", 0.62), 16);
  return [
    { name: "Malaysia", color: GREEN, wipe: { from: ATLAS.land, lon: KL[0], lat: KL[1], p: wipe(at("05", 0.1), 30) } },
    split > 0
      ? { name: "Singapore", color: RED, wipe: { from: GREEN, lon: SG[0], lat: SG[1], p: split } }
      : { name: "Singapore", color: GREEN, wipe: { from: BLUE, lon: 103.6, lat: 1.6, p: merged } },
  ];
};


const Bubble: React.FC<{ x: number; y: number; f: number; at: number; out?: number }> = ({ x, y, f, at: a, out }) => (
  <Sticker x={x} y={y} f={f} at={a} out={out} s={1.1}>
    <circle r={34} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={4} />
    <text y={18} textAnchor="middle" fontFamily={FONT} fontSize={52} fontWeight={800} fill={ATLAS.white}>!</text>
  </Sticker>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f);
  const sg = toScreen(cam, SG[0], SG[1]);
  const home = f < at("03") - 4 || f >= at("15") - 6;
  // the pawns leave for the flight to Britain and return on the home view; they step aside for the bars
  const homeO = f < at("03") - 4 ? 1 - prog(f, at("03") - 8, 4) : prog(f, at("15") + 8, 6) * (1 - prog(f, at("15", 0.3), 6)) + prog(f, at("16", 1) + 2, 6);
  const [tx, ty] = toScreen(cam, 102.1, 3.3);
  const [lx, ly] = toScreen(cam, 105.7, 1.1);

  // bars (payoff): Singapore vs Malaysia GDP per person, 2024
  const sgBar = 560 * prog(f, at("15", 0.35), 24);
  const myBar = (560 / 7.64) * prog(f, at("16", 0.15), 18);
  const barsO = Math.min(prog(f, at("15", 0.3), 5), 1 - prog(f, at("16", 1) + 2, 6));

  return (
    <AbsoluteFill>
      <Atlas cam={cam} fills={fillsAt(f)} f={f} />

      {/* ── hook + loop frame: the two leaders, Singapore pulsing ── */}
      {home && (
        <>
          <PegImg src={`${IMG}/i-04-tunku.png`} x={tx} y={ty} h={250} flag="malaysia" f={f} o={homeO} />
          <PegImg src={`${IMG}/${f >= at("02", 0.3) && f < at("03") ? "i-03-lky-happy" : "i-01-lky-calm"}.png`} x={lx} y={ly} h={250}
            flag="singapore" f={f} o={homeO} />
          <Pulse x={sg[0]} y={sg[1]} f={f} color={ATLAS.gold} o={homeO} />
          <MapLabel text="SINGAPORE" x={sg[0] - 30} y={sg[1] + 78} o={homeO * (1 - show(f, at("02", 0.3), at("03") - 8))} />
        </>
      )}
      {/* "đuổi": an arrow pushes Singapore away */}
      <Sticker x={sg[0] - 60 + 22 * Math.abs(Math.sin(f / 7))} y={sg[1] - 100 + 16 * Math.abs(Math.sin(f / 7))} f={f} at={at("01", 0.3)} out={at("02", 0.3)} s={1.6}>
        <g style={{ rotate: "35deg" }}>
          <path d="M -70 -14 L 30 -14 L 30 -34 L 76 0 L 30 34 L 30 14 L -70 14 Z" fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
        </g>
      </Sticker>
      <Bubble x={tx + 70} y={ty - 290} f={f} at={at("01", 0.2)} out={at("02")} />
      <BigGold text={`GẤP ${count(f, at("02", 0.35), 18, 7.6, 1, 1)} LẦN`} f={f} at={at("02", 0.35)} out={at("03") - 8} y={1120} size={104} />
      <MapLabel text="GDP / NGƯỜI · 2024" x={540} y={1200} o={show(f, at("02", 0.45), at("03") - 8)} />

      {/* ── 1819 ── */}
      <YearRibbon text="1819" f={f} at={at("03")} out={at("05") - 6} />
      <PegImg src={`${IMG}/i-05-raffles.png`} x={toScreen(cam, -1.5, 52.2)[0]} y={toScreen(cam, -1.5, 52.2)[1]} h={270} flag="uk"
        f={f} at={at("03", 0.1)} o={show(f, at("03", 0.08), at("03", 0.48))} />
      <ImgSticker src={`${IMG}/i-07-ship.png`} x={toScreen(cam, 2.5, 50.2)[0] + 60 * prog(f, at("03", 0.28), 40)}
        y={toScreen(cam, 2.5, 50.2)[1]} w={220} f={f} at={at("03", 0.28)} out={at("03", 0.48)} />
      <PegImg src={`${IMG}/i-05-raffles.png`} x={sg[0] - 140} y={sg[1] + 60} h={230} flag="uk" f={f}
        at={at("03", 0.62)} o={show(f, at("03", 0.6), at("04") - 4)} />
      <PegImg src={`${IMG}/i-06-sultan.png`} x={sg[0] + 150} y={sg[1] - 120} h={230} f={f}
        at={at("03", 0.7)} o={show(f, at("03", 0.68), at("04") - 4)} />
      <ImgSticker src={`${IMG}/i-08-coin-chest.png`} x={sg[0] + 10} y={sg[1] + 230} w={230} f={f} at={at("03", 0.78)} out={at("04") - 4} />
      <BigGold text="5.000 $ / NĂM" f={f} at={at("03", 0.82)} out={at("04") - 4} y={430} size={96} />

      {/* ── the trade route: ships keep sailing through the Strait of Malacca ── */}
      {f >= at("04") && f < at("05") - 6 && (() => {
        const lane = pts(cam, [[78, 5.5], [94, 6.5], [99.5, 3.6], [103.6, 1.15], [105.5, 2.6], [110, 8], [116, 15]]);
        return (
          <>
            <Route p={prog(f, at("04", 0.1), 40)} pts={lane} />
            {[0, 0.33, 0.66].map((o, i) => {
              const t = ((f - at("04")) / 170 + o) % 1;
              const [x, y] = routeHead(lane, t);
              return <ImgSticker key={i} src={`${IMG}/i-07-ship.png`} x={x} y={y - 30} w={110} f={f} at={at("04", 0.15) + i * 8} />;
            })}
            <Pulse x={sg[0]} y={sg[1]} f={f} />
            <MapLabel text="ẤN ĐỘ DƯƠNG" x={toScreen(cam, 92, 1)[0]} y={toScreen(cam, 92, 1)[1]} o={show(f, at("04", 0.35))} />
            <MapLabel text="BIỂN ĐÔNG" x={toScreen(cam, 113, 9)[0]} y={toScreen(cam, 113, 9)[1]} o={show(f, at("04", 0.65))} />
          </>
        );
      })()}

      {/* ── 1963: one federation ── */}
      <YearRibbon text="1963" f={f} at={at("05")} out={at("07") - 4} />
      {f >= at("05") && f < at("07") - 2 && (
        <>
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            <g style={{ translate: `${toScreen(cam, 102.4, 4.4)[0]}px ${toScreen(cam, 102.4, 4.4)[1]}px`, scale: 1.4 * prog(f, at("05", 0.2), 8) }}>
              <Flag kind="malaysia" f={f} />
            </g>
          </svg>
          <MapLabel text="MALAYSIA" x={toScreen(cam, 112.6, 1.6)[0]} y={toScreen(cam, 112.6, 1.6)[1]} o={show(f, at("05", 0.45))} size={56} />
          <PegImg src={`${IMG}/i-04-tunku.png`} x={toScreen(cam, 101.4, 4.6)[0]} y={toScreen(cam, 101.4, 4.6)[1]} h={200} f={f} at={at("05", 0.55)} />
          <PegImg src={`${IMG}/i-01-lky-calm.png`} x={toScreen(cam, 106.6, 0.6)[0]} y={toScreen(cam, 106.6, 0.6)[1]} h={200} f={f} at={at("05", 0.65)} />
          {/* the bond KL–Singapore draws on (merger), then cracks (tension) */}
          {(() => {
            // between the two leaders (chest height)
            const kl = toScreen(cam, 101.4, 4.6).map((v, i) => v + (i ? -90 : 40)) as [number, number];
            const sgp = toScreen(cam, 106.6, 0.6).map((v, i) => v + (i ? -90 : -40)) as [number, number];
            const mid: [number, number] = [(kl[0] + sgp[0]) / 2, (kl[1] + sgp[1]) / 2];
            const crack = prog(f, at("06", 0.1), 20);
            return (
              <svg width={1080} height={1920} style={{ position: "absolute" }}>
                <path d={`M ${kl[0]} ${kl[1]} L ${sgp[0]} ${sgp[1]}`} stroke={ATLAS.gold} strokeWidth={10} strokeLinecap="round"
                  pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - prog(f, at("05", 0.4), 20) }} opacity={1 - 0.5 * crack} />
                <path d={`M ${mid[0] - 44} ${mid[1] - 70} l 30 40 l -26 18 l 40 46 l -24 18 l 36 44`} fill="none" stroke={ATLAS.red}
                  strokeWidth={14} strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - crack }} />
              </svg>
            );
          })()}
          <Bubble x={toScreen(cam, 101.4, 4.6)[0] + 80} y={toScreen(cam, 101.4, 4.6)[1] - 230} f={f} at={at("06", 0.3)} />
          <Bubble x={toScreen(cam, 106.6, 0.6)[0] + 80} y={toScreen(cam, 106.6, 0.6)[1] - 230} f={f} at={at("06", 0.45)} />
          <Bubble x={toScreen(cam, 104, 2.6)[0]} y={toScreen(cam, 104, 2.6)[1] - 60} f={f} at={at("06", 0.6)} />
        </>
      )}

      {/* ── 1965: the vote, the cut, the island drifts away ── */}
      <YearRibbon text="1965" f={f} at={at("07")} out={at("09") - 6} />
      <BigGold text={`${count(f, at("07", 0.3), 20, 126)} – 0`} f={f} at={at("07", 0.3)} out={at("07", 0.62)} y={430} size={130} />
      {f >= at("07") && f < at("09") - 6 && (() => {
        const cut = pts(cam, [[103.6, 1.47], [103.68, 1.44], [103.75, 1.46], [103.83, 1.45], [103.92, 1.42], [104.02, 1.4]]);
        const drift = 26 * prog(f, at("07", 0.78), 30);
        return (
          <>
            <Route p={prog(f, at("07", 0.55), 14)} pts={cut} color={ATLAS.gold} />
            {/* cover the island in place with sea, redraw it drifting south */}
            {drift > 0 && (
              <>
                <CountryShape cam={cam} name="Singapore" fill={ATLAS.ocean} stroke="none" />
                <CountryShape cam={cam} name="Singapore" fill={RED} stroke={ATLAS.ink} offset={[0, drift]} />
              </>
            )}
            <svg width={1080} height={1920} style={{ position: "absolute" }}>
              <g style={{ translate: `${sg[0] + 40}px ${sg[1] - 120 + drift}px`, scale: 1.5 * prog(f, at("07", 0.86), 8) }}>
                <Flag kind="singapore" f={f} />
              </g>
            </svg>
          </>
        );
      })()}
      {/* Lee Kuan Yew in tears on TV */}
      {f >= at("08") - 3 && f < at("09") - 4 && (
        <>
          <ImgSticker src={`${IMG}/i-09-tv.png`} x={540} y={700} w={620} f={f} at={at("08") - 3} />
          <PegImg src={`${IMG}/i-02-lky-sad.png`} x={510} y={810} h={290} f={f} at={at("08")} />
        </>
      )}

      {/* ── the island ── */}
      <BigGold text="< 600 KM²" f={f} at={at("09", 0.25)} out={at("10")} y={420} size={110} />
      {f >= at("09") - 6 && f < at("12") - 4 && <Pulse x={sg[0]} y={sg[1]} f={f} color={ATLAS.white} period={50} />}
      <BigGold text="0 TÀI NGUYÊN" f={f} at={at("10", 0.1)} out={at("11")} y={420} size={96} />
      {f >= at("10") && f < at("11") && (
        <>
          {[[-150, "#2B2B2B"], [150, "#7A5A2E"]].map(([dx, c], i) => (
            <Sticker key={i} x={sg[0] + (dx as number)} y={sg[1] - 230} f={f} at={at("10", 0.15) + i * 5}>
              <path d="M 0 -50 C 26 -16 34 0 34 18 A 34 34 0 0 1 -34 18 C -34 0 -26 -16 0 -50 Z" fill={c as string} stroke={ATLAS.ink} strokeWidth={5} />
              <path d="M -46 -46 L 46 46 M 46 -46 L -46 46" stroke={ATLAS.red} strokeWidth={12} strokeLinecap="round" />
            </Sticker>
          ))}
        </>
      )}
      {f >= at("11") && f < at("12") - 4 && (() => {
        const pipe = pts(cam, [[103.72, 1.66], [103.76, 1.5], [103.8, 1.38]]);
        return (
          <>
            <Route p={prog(f, at("11", 0.15), 20)} pts={pipe} color="#7EC8F0" />
            {[0, 0.33, 0.66].map((o, i) => {
              const [x, y] = routeHead(pipe, ((f - at("11")) / 40 + o) % 1);
              return (
                <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: prog(f, at("11", 0.3), 6) }}>
                  <path d={`M ${x} ${y - 22} c 12 16 16 24 16 32 a 16 16 0 0 1 -32 0 c 0 -8 4 -16 16 -32 z`} fill="#7EC8F0" stroke={ATLAS.ink} strokeWidth={3} />
                </svg>
              );
            })}
            <MapLabel text="JOHOR (MALAYSIA)" x={pipe[0][0]} y={pipe[0][1] - 30} o={show(f, at("11", 0.1))} />
          </>
        );
      })()}

      {/* ── betting on location ── */}
      {f >= at("12") && f < at("14") - 4 && (() => {
        const lane = pts(cam, [[95, 6.5], [100, 3.4], [103.6, 1.15], [105.5, 2.4], [108.5, 6.5]]);
        return (
          <>
            <Route p={prog(f, at("12", 0.05), 30)} pts={lane} />
            {[0, 0.5].map((o, i) => {
              const [x, y] = routeHead(lane, ((f - at("12")) / 150 + o) % 1);
              return <ImgSticker key={i} src={`${IMG}/i-07-ship.png`} x={x} y={y - 26} w={100} f={f} at={at("12", 0.1) + i * 8} />;
            })}
            <Pulse x={sg[0]} y={sg[1]} f={f} />
          </>
        );
      })()}
      <BigGold text="VỊ TRÍ" f={f} at={at("12", 0.7)} out={at("13")} y={430} size={120} />
      {f >= at("13") && f < at("14") - 4 && (
        <>
          <ImgSticker src={`${IMG}/i-10-port-crane.png`} x={sg[0] - 210} y={sg[1] - 120} w={200} f={f} at={at("13", 0.05)} />
          <Sticker x={sg[0]} y={sg[1] - 190} f={f} at={at("13", 0.35)} s={1.1}>
            <path d="M -55 40 L -55 -10 L -20 -30 L -20 -10 L 15 -30 L 15 -10 L 55 -30 L 55 40 Z" fill="#B9C3C2" stroke={ATLAS.ink} strokeWidth={5} />
            <rect x={30} y={-75} width={16} height={50} fill="#8A8F90" stroke={ATLAS.ink} strokeWidth={4} />
          </Sticker>
          <Sticker x={sg[0] + 210} y={sg[1] - 120} f={f} at={at("13", 0.7)} s={1.1}>
            <path d="M -55 -20 L 0 -55 L 55 -20 Z" fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={5} />
            {[-36, -12, 12, 36].map((x) => <rect key={x} x={x - 7} y={-18} width={14} height={48} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={3} />)}
            <rect x={-60} y={30} width={120} height={12} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={4} />
          </Sticker>
        </>
      )}
      {/* land reclamation: the island grows by about a quarter */}
      {f >= at("14") && f < at("15") - 6 && (
        <CountryShape cam={cam} name="Singapore" about={SG} grow={interpolate(prog(f, at("14", 0.3), 24), [0, 1], [1, 1.118], CLAMP)}
          dash="14 10" o={prog(f, at("14", 0.25), 6)} />
      )}
      <BigGold text={`+ ${count(f, at("14", 0.5), 20, 25)}%`} f={f} at={at("14", 0.5)} out={at("15") - 6} y={420} size={120} />

      {/* ── payoff: two bars, same scale ── */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: barsO }}>
        {([[380, myBar, "malaysia", 11874, at("16", 0.15)], [700, sgBar, "singapore", 90674, at("15", 0.35)]] as const).map(([x, h, kind, v, a]) => (
          <g key={kind}>
            <rect x={x - 90} y={1170 - h} width={180} height={h} rx={10} fill={kind === "singapore" ? RED : GREEN} stroke={ATLAS.ink} strokeWidth={6} />
            <g style={{ translate: `${x - 34}px 1188px` }}><Flag kind={kind} w={68} f={f} /></g>
            {f >= a && (
              <text x={x} y={1150 - h} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={72} fill={ATLAS.gold}
                stroke={ATLAS.ink} strokeWidth={12} paintOrder="stroke">
                {`${count(f, a, 24, v)} $`}
              </text>
            )}
          </g>
        ))}
      </svg>
      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "02": "Vậy vì sao hôm nay, Singapore lại giàu gấp hơn 7 lần?",
  "03": "Năm 1819, người Anh trả cho Sultan Hussein 5.000 đô la Tây Ban Nha mỗi năm, để lập một thương cảng trên hòn đảo nhỏ này.",
  "05": "Năm 1963, Singapore gia nhập Malaysia.",
  "06": "Nhưng chưa đầy 2 năm, mâu thuẫn chính trị và bạo loạn sắc tộc bùng lên.",
  "07": "Ngày 9/8/1965, Quốc hội Malaysia bỏ phiếu 126–0, tách Singapore ra.",
  "09": "Một hòn đảo chưa đầy 600 km².",
  "14": "Họ còn lấn biển, nới rộng hòn đảo thêm khoảng 1/4.",
  "15": "Năm 2024, mỗi người dân Singapore làm ra hơn 90.000 đô la.",
  "16": "Người Malaysia, chưa tới 12.000.",
};

const W = "whoosh/simple-whoosh-382724.mp3";
const W2 = "whoosh/clean-whoosh-382726.mp3";
const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const SFX: SfxCue[] = [
  [CLICK, "01", 0.4], [CLICK, "02", 0.35],
  [W, "03", 0, -4], [W2, "03", 0.5], [CLICK, "03", 0.78],
  [W, "04", 0, -2], [W2, "05", 0, -6], [CLICK, "06", 0.3],
  [W, "07", 0, -2], [CLICK, "07", 0.3], [THUD, "07", 0.62], ["hit/cinematic-piano-hit-567216.mp3", "08", 0, 0, -18],
  [W2, "09", 0, -6], [CLICK, "10", 0.15], [CLICK, "11", 0.3],
  [W, "12", 0, -4], [CLICK, "13", 0.05], [CLICK, "13", 0.35], [CLICK, "13", 0.7],
  [W2, "14", 0, -4], [W, "15", 0, -6], [THUD, "15", 0.4, 0, -18], [CLICK, "16", 0.15],
];

export const ISingapore: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    {/* Vietnamese words are syllables: allow 5 per chunk so chunks stay on screen ≈ 1 s */}
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/i-singapore/vo.mp3")} />
    {/* pillar music bed (Pixabay), levelled to -28 LUFS by MusicBed */}
    <MusicBed file={PILLAR_MUSIC.P1} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const iSingaporeDuration = (fps: number) => episodeDuration(timing, fps);
