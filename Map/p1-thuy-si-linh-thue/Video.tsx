/**
 * Atlas Tí Hon · P1 Vì sao bản đồ như thế này · Historical Timeline (+ Money), style I Toy Atlas:
 * "Sao Thụy Sĩ giàu thế? (Không biển, không dầu)" — v2, Gate 3 v2 approved by Lucas 2026-10-25 (package B:
 * the answer to the title gets its own scene; fewer years read out; richer map and props).
 * Script + sources: kich-ban-p1-thuy-si-linh-thue-FINAL.md, cong-2_so-nguon.md (C1–C21).
 * Rule 22 (many causes): the cantons HIRED OUT regiments; hunger was one motive among several (C5); the wealth has
 * several causes: skills (Geneva goldsmiths → watches, refugee craftsmen, C21), watches, machines, medicine (C18);
 * "the banks" are only a part. The Red Cross (C20) is shown as a fact, not as a cause; its emblem is NOT drawn.
 * Rule 15: GDP per head 2024, World Bank, current US$, Switzerland vs Vietnam (C16, C17).
 * Human moment: Kaspar von Silenen leads the first Swiss guards into Rome, 22/1/1506 (C12); twist: that guard still exists (C13).
 * Soft loop: the VO ends on line 25; the last frame is the opening frame (Europe, Switzerland filled, a faint dot on Rome).
 *
 * Alps relief, lakes (approximate outlines), arrows, the march route, Rome's gate and the props are illustrations;
 * PLACES are outside Vietnam (`in: "sea"`).
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p1-thuy-si-linh-thue.timing.json";
import words from "../../src/voiceover/p1-thuy-si-linh-thue.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, CountryTag, DataCard, type Fill, Flag, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Pulse,
  Question, routeHead, seamKeys, show, Signature, Stamp, toScreen, Track, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p1-thuy-si-linh-thue/cut";
const { at } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const ease = Easing.inOut(Easing.cubic);

type LL = [number, number];

/** Every map-anchored thing; all outside Vietnam (scripts/geo-check.mjs). */
export const PLACES = {
  swiss: { ll: [8.2, 46.8], in: "sea" },
  uri: { ll: [8.64, 46.88], in: "sea" },
  zurich: { ll: [8.54, 47.37], in: "sea" },
  lucerne: { ll: [8.31, 47.05], in: "sea" },
  bern: { ll: [7.45, 46.95], in: "sea" },
  schwyz: { ll: [8.65, 47.02], in: "sea" },
  geneva: { ll: [6.14, 46.2], in: "sea" },
  lyon: { ll: [4.84, 45.76], in: "sea" },
  marignano: { ll: [9.32, 45.36], in: "sea" },
  rome: { ll: [12.48, 41.9], in: "sea" },
  vatican: { ll: [12.453, 41.903], in: "sea" },
  france: { ll: [2.3, 46.6], in: "sea" },
  paris: { ll: [2.35, 48.86], in: "sea" },
  madrid: { ll: [-3.7, 40.42], in: "sea" },
  naples: { ll: [14.27, 40.85], in: "sea" },
  holland: { ll: [5.3, 52.1], in: "sea" },
  milan: { ll: [9.19, 45.46], in: "sea" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;

/** Approximate lake outlines (illustration). */
const LEMAN: LL[] = [[6.14, 46.21], [6.24, 46.3], [6.4, 46.42], [6.6, 46.52], [6.85, 46.47], [6.93, 46.4], [6.8, 46.38], [6.6, 46.4], [6.45, 46.37], [6.3, 46.27], [6.18, 46.2]];
const ZURICHSEE: LL[] = [[8.54, 47.36], [8.62, 47.28], [8.78, 47.22], [8.86, 47.21], [8.82, 47.25], [8.66, 47.31], [8.56, 47.37]];
/** Alps relief: toy peaks along the southern half of the country (illustration). */
const PEAKS: [number, number, number][] = [
  [7.05, 46.12, 1.0], [7.6, 46.02, 1.25], [7.95, 46.5, 1.1], [8.45, 46.55, 0.95], [8.95, 46.45, 1.05], [9.5, 46.45, 1.15],
  [10.0, 46.62, 0.9], [7.35, 46.42, 0.85], [8.2, 46.25, 0.8], [9.75, 46.8, 0.8],
];

const SWISS = "#D8423A";
const FR = "#9DB6D8";
const VAT = "#F2D24B";
const LAKE = "#5E9FCF";

const VIEW = {
  europe: { lon: 5.5, lat: 46.2, zoom: 11 },
  swiss: { lon: 8.2, lat: 46.75, zoom: 52 },
  march: { lon: 10.6, lat: 44.6, zoom: 30 },
  alps: { lon: 8.9, lat: 46.35, zoom: 44 },
  zurich: { lon: 8.45, lat: 47.12, zoom: 60 },
  geneva: { lon: 6.35, lat: 46.35, zoom: 62 },
  rome: { lon: 12.47, lat: 41.95, zoom: 120 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.europe },
  // opening (Bible 2026-10-21): the camera flies into Switzerland from frame 1
  { at: 1, ...VIEW.swiss },
  { at: at("05") - 2, ...VIEW.europe },
  { at: at("10") - 4, ...VIEW.march },
  { at: at("11") - 4, ...VIEW.alps },
  { at: at("12") - 4, ...VIEW.zurich },
  { at: at("14") - 4, ...VIEW.europe },
  { at: at("15") - 2, ...VIEW.geneva },
  { at: at("21") - 4, ...VIEW.europe },
  { at: at("22") - 4, ...VIEW.swiss },
  { at: at("24") - 4, ...VIEW.rome },
  { at: at("25", 0.3), ...VIEW.europe },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

/** A toy mountain (screen space, base centre at 0, 0). */
const Mountain: React.FC<{ s: number }> = ({ s }) => (
  <g style={{ scale: s }}>
    <path d="M -70 0 L -8 -96 L 54 0 Z" fill="#8C8F86" stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M -30 -34 L -8 -96 L 14 -34 L 2 -44 L -8 -32 L -18 -44 Z" fill="#F7F4EC" stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 10 0 L 46 -60 L 84 0 Z" fill="#A3A69C" stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>
);

/** Crossed-out icon with a label under it (screen space): a wave, an oil drop or a ring. */
const NoIcon: React.FC<{ x: number; y: number; kind: "sea" | "oil" | "ring"; label: string; k: number; o: number; cross?: number }> = ({
  x, y, kind, label, k, o, cross = 1,
}) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k }}>
        <circle r={70} fill={ATLAS.white} stroke={ATLAS.ink} strokeWidth={6} />
        {kind === "sea" && <path d="M -46 6 Q -34 -12 -22 6 T 2 6 T 26 6 T 48 6" fill="none" stroke="#3D7FB8" strokeWidth={12} strokeLinecap="round" />}
        {kind === "oil" && <path d="M 0 -42 C 18 -16 32 4 32 20 C 32 40 16 50 0 50 C -16 50 -32 40 -32 20 C -32 4 -18 -16 0 -42 Z" fill="#2A2A2A" />}
        {kind === "ring" && (
          <g>
            <circle cy={14} r={30} fill="none" stroke={ATLAS.gold} strokeWidth={11} />
            <path d="M -16 -20 L 0 -42 L 16 -20 L 0 -10 Z" fill="#7FD3F2" stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round" />
          </g>
        )}
        {cross > 0 && <path d={`M -50 -50 L ${-50 + 100 * cross} ${-50 + 100 * cross}`} stroke="#D0352C" strokeWidth={14} strokeLinecap="round" />}
        <text y={130} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.white}
          stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke">{label}</text>
      </g>
    </svg>
  );
};

/** GDP per head 2024 (World Bank, current US$): Switzerland vs Vietnam, with flags. */
const GdpPanel: React.FC<{ o: number; p1: number; p2: number }> = ({ o, p1, p2 }) => {
  if (o <= 0) return null;
  const y = 1080;
  const x0 = 390;
  const len = 480;
  const rows: [string, "switzerland" | "vietnam", number, string][] = [
    ["THỤY SĨ", "switzerland", p1, "~104.000 USD"],
    ["VIỆT NAM", "vietnam", (4717 / 104000) * p2, "~4.717 USD"],
  ];
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={84} y={y - 170} width={852} height={330} rx={30} fill={ATLAS.white} fillOpacity={0.95} stroke={ATLAS.ink} strokeWidth={6} />
      <text x={CX} y={y - 100} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={50} fill={ATLAS.ink}>GDP/NGƯỜI · 2024</text>
      {rows.map(([label, flag, p, t], i) => {
        const yy = y - 50 + i * 104;
        const w = len * p;
        return (
          <g key={label}>
            <g style={{ translate: `110px ${yy + 4}px` }}><Flag kind={flag} w={58} /></g>
            <text x={x0 - 18} y={yy + 52} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={44} fill={ATLAS.ink}>{label}</text>
            <rect x={x0} y={yy} width={len} height={72} rx={14} fill="#D9D2C2" />
            {w > 0 && <rect x={x0} y={yy} width={Math.max(w, 6)} height={72} rx={14} fill={i ? "#DA251D" : SWISS} stroke={ATLAS.ink} strokeWidth={5} />}
            {p > 0.02 && (
              <text x={w >= 300 ? x0 + w - 16 : x0 + Math.max(w, 6) + 16} y={yy + 52} textAnchor={w >= 300 ? "end" : "start"} fontFamily={FONT}
                fontWeight={800} fontSize={46} fill={w >= 300 ? ATLAS.white : ATLAS.ink}>{t}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Wooden sign that flips over into a recruiting poster ("TUYỂN LÍNH", pointing hand). Screen space. */
const SignPoster: React.FC<{ y: number; k: number; o: number; flip: number }> = ({ y, k, o, flip }) => {
  if (o <= 0) return null;
  const poster = flip > 0.5;
  const sx = Math.max(0.04, Math.abs(Math.cos(Math.PI * flip)));
  const text = "KHÔNG TIỀN, KHÔNG LÍNH";
  const w = text.length * 31 + 90;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${CX}px ${y}px`, scale: `${k * sx} ${k}`, rotate: poster ? "-4deg" : "0deg" }}>
        {!poster ? (
          <g>
            <rect x={-w / 2} y={-62} width={w} height={124} rx={18} fill="#C89A5B" stroke={ATLAS.ink} strokeWidth={7} />
            <path d={`M ${-w / 2 + 20} -30 H ${w / 2 - 20} M ${-w / 2 + 20} 34 H ${w / 2 - 20}`} stroke="#A97E45" strokeWidth={4} />
            <text y={18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={ATLAS.white}
              stroke={ATLAS.ink} strokeWidth={8} strokeLinejoin="round" paintOrder="stroke">{text}</text>
          </g>
        ) : (
          <g>
            <rect x={-230} y={-170} width={460} height={340} rx={14} fill="#F4E8C8" stroke={ATLAS.ink} strokeWidth={7} />
            <rect x={-230} y={-170} width={460} height={96} rx={14} fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={7} />
            <text y={-104} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={60} fill={ATLAS.white} letterSpacing={3}>TUYỂN LÍNH</text>
            {/* pointing hand */}
            <g style={{ translate: "0px 60px" }}>
              <path d="M -70 -10 Q -70 -50 -30 -50 L 80 -50 Q 100 -50 100 -32 Q 100 -14 80 -14 L 20 -14 L 20 50 Q 20 70 -10 70 L -40 70 Q -70 70 -70 40 Z"
                fill="#F2C9A0" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
              <path d="M -60 -50 L -60 -80 L -20 -80 L -20 -50" fill="#C8322B" stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
            </g>
          </g>
        )}
      </g>
    </svg>
  );
};

/** A balance with icons: adventure (compass) + loot (chest) outweigh hunger (empty bowl). Screen space. */
const Scale: React.FC<{ tip: number; o: number }> = ({ tip, o }) => {
  if (o <= 0) return null;
  const a = 12 * tip; // degrees, left side down
  const panAt = (side: -1 | 1) => side * -Math.sin((a * Math.PI) / 180) * 210;
  const pill = (x: number, y: number, lines: string[], color: string) => {
    const tw = Math.max(...lines.map((t) => t.length)) * 29 + 48;
    const th = lines.length * 56 + 16;
    return (
      <g style={{ translate: `${x}px ${y}px` }}>
        <rect x={-tw / 2} y={0} width={tw} height={th} rx={28} fill={ATLAS.white} stroke={color} strokeWidth={6} />
        {lines.map((t, i) => <text key={t} y={50 + i * 56} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={color}>{t}</text>)}
      </g>
    );
  };
  const lx = CX - 210;
  const rx = CX + 210;
  const ly = 880 + panAt(-1);
  const ry = 880 + panAt(1);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <path d={`M ${CX} 880 L ${CX} 1160 M ${CX - 90} 1160 H ${CX + 90}`} stroke="#6B4F2A" strokeWidth={14} strokeLinecap="round" />
      <g style={{ translate: `${CX}px 880px`, rotate: `${-a}deg` }}>
        <path d="M -210 0 H 210" stroke="#6B4F2A" strokeWidth={14} strokeLinecap="round" />
      </g>
      <circle cx={CX} cy={880} r={16} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
      {/* left pan: compass + treasure chest */}
      <g style={{ translate: `${lx}px ${ly}px` }}>
        <path d="M -120 0 L -90 60 L 90 60 L 120 0 Z" fill="#E7D3A2" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
        <g style={{ translate: "-48px -42px" }}>
          <circle r={38} fill="#F7F2E8" stroke={ATLAS.ink} strokeWidth={6} />
          <path d="M 0 -26 L 9 0 L 0 26 L -9 0 Z" fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={3} />
        </g>
        <g style={{ translate: "46px -40px" }}>
          <rect x={-46} y={-26} width={92} height={56} rx={6} fill="#9A6A36" stroke={ATLAS.ink} strokeWidth={5} />
          <path d="M -46 -26 Q 0 -66 46 -26 Z" fill="#B47C40" stroke={ATLAS.ink} strokeWidth={5} />
          <circle cx={-14} cy={-36} r={10} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />
          <circle cx={10} cy={-40} r={10} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />
          <rect x={-8} y={-6} width={16} height={18} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={3} />
        </g>
      </g>
      {/* right pan: an empty bowl */}
      <g style={{ translate: `${rx}px ${ry}px` }}>
        <path d="M -120 0 L -90 60 L 90 60 L 120 0 Z" fill="#E7D3A2" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -54 -40 Q 0 30 54 -40 Z" fill="#F7F2E8" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>
      {pill(lx, ly + 86, ["PHIÊU LƯU", "CHIẾN LỢI PHẨM"], "#2C5476")}
      {pill(rx, ry + 86, ["CÁI ĐÓI"], "#8E1F1A")}
    </svg>
  );
};

/** Swiss shield: red with a white cross (screen space). */
const Shield: React.FC<{ x: number; y: number; k: number; o: number }> = ({ x, y, k, o }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k }}>
        <path d="M -90 -100 H 90 V 10 C 90 70 40 105 0 120 C -40 105 -90 70 -90 10 Z" fill={SWISS} stroke={ATLAS.ink} strokeWidth={8} strokeLinejoin="round" />
        <rect x={-16} y={-62} width={32} height={116} fill={ATLAS.white} />
        <rect x={-58} y={-20} width={116} height={32} fill={ATLAS.white} />
      </g>
    </svg>
  );
};

/** Toy gear (screen space). */
const Gear: React.FC<{ x: number; y: number; r: number; f: number; o: number }> = ({ x, y, r, f, o }) => {
  if (o <= 0) return null;
  const teeth = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, rotate: `${f * 1.5}deg` }}>
        {teeth.map((d) => <rect key={d} x={-r * 0.16} y={-r * 1.18} width={r * 0.32} height={r * 0.4} fill="#B9BEC4" stroke={ATLAS.ink} strokeWidth={4}
          style={{ rotate: `${d}deg`, transformOrigin: "0 0" }} />)}
        <circle r={r} fill="#C9CED3" stroke={ATLAS.ink} strokeWidth={6} />
        <circle r={r * 0.35} fill="#8E949A" stroke={ATLAS.ink} strokeWidth={5} />
      </g>
    </svg>
  );
};

/** Rome's gate (Porta del Popolo, simplified toy arch), base centre at x, y. */
const Gate: React.FC<{ x: number; y: number; k: number; o: number }> = ({ x, y, k, o }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k, transformOrigin: "0 0" }}>
        <path d="M -110 0 V -150 H 110 V 0 H 50 V -70 A 50 50 0 0 0 -50 -70 V 0 Z" fill="#E9DCC0" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
        <path d="M -126 -150 H 126 V -176 H -126 Z" fill="#D6C6A4" stroke={ATLAS.ink} strokeWidth={6} />
        <path d="M -40 -176 L 0 -210 L 40 -176 Z" fill="#D6C6A4" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
      </g>
    </svg>
  );
};

/** Curved arrow between two screen points, drawn on with p. */
const Arrow: React.FC<{ a: LL; b: LL; p: number; o: number; color: string; bend?: number; w?: number }> = ({ a, b, p, o, color, bend = 0.25, w = 10 }) => {
  if (o <= 0 || p <= 0) return null;
  const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const c: LL = [mx - dy * bend, my + dx * bend];
  const d = `M ${a[0]} ${a[1]} Q ${c[0]} ${c[1]} ${b[0]} ${b[1]}`;
  const dash = { strokeDasharray: 1, strokeDashoffset: 1 - p };
  const ang = Math.atan2(b[1] - c[1], b[0] - c[0]);
  const hs = w / 10;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={w + 7} strokeLinecap="round" pathLength={1} style={dash} />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" pathLength={1} style={dash} />
      {p > 0.97 && (
        <path d={`M 0 0 L ${-30 * hs} ${-16 * hs} L ${-30 * hs} ${16 * hs} Z`} fill={color} stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round"
          style={{ translate: `${b[0]}px ${b[1]}px`, rotate: `${(ang * 180) / Math.PI}deg` }} />
      )}
    </svg>
  );
};

/** Point on the same curved arrow at fraction t (for props riding an arrow). */
const onArrow = (a: LL, b: LL, t: number, bend: number): LL => {
  const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const c: LL = [mx - dy * bend, my + dx * bend];
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};

/** Approximate outline of Vatican City (illustration), lon/lat. */
const VATICAN: LL[] = [[12.4457, 41.9038], [12.4468, 41.9065], [12.45, 41.9074], [12.4545, 41.907], [12.456, 41.905], [12.458, 41.9022],
  [12.457, 41.9015], [12.453, 41.901], [12.45, 41.9003], [12.447, 41.9013]];

/** Magnifier inset (illustration): Rome's streets around Vatican City, drawn large to show how tiny it is. */
const Magnifier: React.FC<{ x: number; y: number; r: number; o: number; k: number }> = ({ x, y, r, o, k }) => {
  if (o <= 0 || k <= 0) return null;
  const K = 16000; // px per degree of longitude inside the lens
  const P2 = ([lo, la]: LL): LL => [(lo - 12.452) * K, -(la - 41.904) * K * 1.34];
  const d = VATICAN.map((ll, i) => { const [px, py] = P2(ll); return `${i ? "L" : "M"} ${px} ${py}`; }).join(" ") + " Z";
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <defs>
        <clipPath id="lens"><circle cx={x} cy={y} r={r * k} /></clipPath>
      </defs>
      <g clipPath="url(#lens)">
        <rect x={x - r} y={y - r} width={2 * r} height={2 * r} fill="#E4D2AA" />
        {/* a few Roman streets and the Tiber, to give the scale */}
        <g style={{ translate: `${x}px ${y}px` }}>
          <path d="M 150 -170 C 120 -60 170 40 120 170" stroke="#6FA6D6" strokeWidth={30} fill="none" />
          {[-120, -40, 60, 140].map((yy) => <path key={yy} d={`M -170 ${yy} L 170 ${yy + 20}`} stroke="#F6EEDC" strokeWidth={12} />)}
          {[-110, 10, 100].map((xx) => <path key={xx} d={`M ${xx} -170 L ${xx - 20} 170`} stroke="#F6EEDC" strokeWidth={12} />)}
          <path d={d} fill={VAT} stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round" />
          {/* St Peter's dome, toy */}
          <g style={{ translate: "18px 4px" }}>
            <rect x={-26} y={-6} width={52} height={22} fill="#F4EEE2" stroke={ATLAS.ink} strokeWidth={4} />
            <path d="M -22 -6 A 22 22 0 0 1 22 -6 Z" fill="#9FB8C8" stroke={ATLAS.ink} strokeWidth={4} />
            <path d="M 0 -28 V -36" stroke={ATLAS.ink} strokeWidth={4} />
          </g>
        </g>
      </g>
      <circle cx={x} cy={y} r={r * k} fill="none" stroke={ATLAS.ink} strokeWidth={14} />
      <circle cx={x} cy={y} r={r * k} fill="none" stroke="#C9A24A" strokeWidth={8} />
      <path d={`M ${x + r * 0.72 * k} ${y + r * 0.72 * k} L ${x + r * 1.15 * k} ${y + r * 1.15 * k}`} stroke={ATLAS.ink} strokeWidth={30} strokeLinecap="round" />
      <path d={`M ${x + r * 0.74 * k} ${y + r * 0.74 * k} L ${x + r * 1.13 * k} ${y + r * 1.13 * k}`} stroke="#8A5A2B" strokeWidth={20} strokeLinecap="round" />
    </svg>
  );
};

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  const fills: Fill[] = [
    { name: "Switzerland", color: SWISS },
    ...(f >= at("07") && f < at("09") ? [{ name: "France", color: FR }] : []),
    ...(f >= at("24") - 4 ? [{ name: "Vatican", color: VAT }] : []),
  ];
  const [sx, sy] = S(P("swiss"));
  const zw = S(P("zurich"));
  const gv = S(P("geneva"));
  const relief = interpolate(cam.zoom, [24, 44], [0, 1], CLAMP); // Alps + lakes on the close views

  // 05 soldiers leave for France, Italy, Spain, the Low Countries (they glow again on the closing line)
  const legs: (keyof typeof PLACES)[] = ["paris", "naples", "madrid", "holland"];
  const legsO = Math.max(show(f, at("05") + 6, at("10") - 6), 0.6 * show(f, at("25", 0.35), at("25", 0.75)));
  const legsP = (i: number) => (f < at("25") ? prog(f, at("05") + 8 + i * 6, 20, ease) : 1);
  // 10 the march Uri → Rome, a column behind Kaspar
  const march = pts(cam, [P("uri"), [9.0, 45.9], [9.9, 44.4], [11.3, 43.2], P("rome")]);
  const marchP = prog(f, at("10", 0.15), Math.round(at("10", 0.95) - at("10", 0.15)), ease);
  // 21 the new exports ride the old arrows
  const goods = [`${IMG}/s-04-dong-ho-quyt.png`, `${IMG}/s-05-lo-thuoc.png`, "", `${IMG}/s-04-dong-ho-quyt.png`];

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} fills={fills} />

      {/* lakes + Alps relief on every close view of Switzerland (illustration) */}
      {relief > 0 && (
        <svg width={1080} height={1920} style={{ position: "absolute", opacity: relief }}>
          {[LEMAN, ZURICHSEE].map((lake, i) => (
            <path key={i} d={pts(cam, lake).map(([x, y], j) => `${j ? "L" : "M"} ${x} ${y}`).join(" ") + " Z"} fill={LAKE} stroke={ATLAS.ink} strokeWidth={4} strokeLinejoin="round" />
          ))}
          {PEAKS.map(([lo, la, s], i) => {
            const [x, y] = S([lo, la]);
            const k = (cam.zoom / 52) * 0.62 * s * (f < 40 ? prog(f, 4 + i * 3, 12, ease) : 1);
            return <g key={i} style={{ translate: `${x}px ${y + 30}px` }}><Mountain s={k} /></g>;
          })}
        </svg>
      )}

      {/* a faint dot on Rome on the wide map (the loop frame is never empty) */}
      {(() => {
        const [x, y] = S(P("vatican"));
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: interpolate(cam.zoom, [12, 30], [0.9, 0], CLAMP) }}>
            <circle cx={x} cy={y} r={11 + 3 * Math.sin(f / 10)} fill={VAT} fillOpacity={0.35} />
            <circle cx={x} cy={y} r={7} fill={VAT} stroke={ATLAS.ink} strokeWidth={3} />
          </svg>
        );
      })()}

      {/* ── 01 no sea, no oil, mostly mountains ── */}
      <NoIcon x={300} y={1080} kind="sea" label="KHÔNG BIỂN" k={prog(f, at("01", 0.1), 8, ease)} o={show(f, at("01", 0.1), at("02"))} />
      <NoIcon x={780} y={1080} kind="oil" label="KHÔNG DẦU" k={prog(f, at("01", 0.35), 8, ease)} o={show(f, at("01", 0.35), at("02"))} />

      {/* ── 02 GDP per head 2024: ~22 × Vietnam ── */}
      <GdpPanel o={show(f, at("02") + 2, at("03"))} p1={prog(f, at("02") + 4, 16, ease)} p2={prog(f, at("02", 0.55), 12, ease)} />
      <CountryTag cam={cam} f={f} name="Switzerland" label="THỤY SĨ" flag="switzerland" anchor={[8.2, 47.75]} from={14} o={show(f, 14, at("02"))} glow={[14]} />

      {/* ── 03–04 what did they send abroad most? soldiers ── */}
      <Question x={CX} y={620} f={f} at={at("03", 0.3)} out={at("04")} s={1.3} />
      <PegImg src={`${IMG}/s-01-linh-danh-thue.png`} x={CX} y={1180} h={460} f={f} at={at("04")} o={show(f, at("04"), at("05") + 4)} />

      {/* ── 05–09 hired out across Europe; ~1.5 million; "no money, no Swiss" → a recruiting poster; why they went ── */}
      {legs.map((k, i) => (
        <Arrow key={k} a={[sx, sy]} b={S(P(k))} p={legsP(i)} o={legsO} color={ATLAS.gold} bend={i % 2 ? -0.2 : 0.2} />
      ))}
      <DataCard value="~1,5 TRIỆU NGƯỜI" label="ƯỚC TÍNH · TK 13–19" x={CX} y={330} f={f} at={at("06") + 2} out={at("07")} size={80} />
      <CountryTag cam={cam} f={f} name="France" label="PHÁP" flag="france" anchor={P("france")} from={at("07")} o={show(f, at("07"), at("09"))} glow={[at("07")]} />
      <SignPoster y={1100} k={prog(f, at("07", 0.35), 8, ease)} o={show(f, at("07", 0.35), at("09"))} flip={prog(f, at("08"), 12, ease)} />
      <Scale tip={prog(f, at("09", 0.35), 24, ease)} o={show(f, at("09"), at("10") - 4)} />

      {/* ── 10 [NGƯỜI] 1506: Kaspar von Silenen leads a column of Swiss into Rome ── */}
      <YearRibbon text="1506" f={f} at={at("10", 0.05)} out={at("11") - 4} />
      <AbsoluteFill style={{ opacity: show(f, at("10"), at("11") - 2) }}>
        <Track ps={march} p={marchP} color={ATLAS.gold} w={8} />
      </AbsoluteFill>
      {(() => {
        const [x, y] = S(P("rome"));
        return <Gate x={x} y={y + 6} k={0.55 * prog(f, at("10", 0.35), 10, ease)} o={show(f, at("10", 0.35), at("11") - 2)} />;
      })()}
      {f >= at("10") && f < at("11") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("11") - 6, 5) }}>
          {[4, 3, 2, 1].map((i) => {
            const t = Math.max(0, marchP - 0.07 * i);
            if (t <= 0.01) return null;
            const [x, y] = routeHead(march, t);
            return <PegImg key={i} src={`${IMG}/s-01-linh-danh-thue.png`} x={x} y={y + 14} h={140} f={f + i * 7} at={at("10") + 4 + i * 4} />;
          })}
          {(() => {
            const [x, y] = routeHead(march, marchP);
            return <PegImg src={`${IMG}/s-02-kaspar-von-silenen.png`} x={x} y={y + 20} h={240} f={f} at={at("10") + 4} />;
          })()}
        </AbsoluteFill>
      )}
      <DataCard value="150 LÍNH" label="KASPAR VON SILENEN" x={CX} y={470} f={f} at={at("10", 0.4)} out={at("11") - 2} size={88} />

      {/* ── 11 1515 Marignano; often taken as the start of neutrality ── */}
      <YearRibbon text="1515" f={f} at={at("11", 0.05)} out={at("12")} />
      <CityPin cam={cam} f={f} label="MARIGNANO" at={P("marignano")} from={at("11") + 6} o={show(f, at("11") + 6, at("12"))} side="right" />
      {f >= at("11") + 10 && f < at("12") && (() => {
        const [x, y] = S(P("marignano"));
        const k = prog(f, at("11") + 10, 8, ease);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("12") - 6, 5) }}>
            <g style={{ translate: `${x}px ${y - 120}px`, scale: k }}>
              <path d="M -70 50 L -8 -6" stroke="#7A5A2F" strokeWidth={12} strokeLinecap="round" />
              <path d="M 6 -14 L 64 -66" stroke="#7A5A2F" strokeWidth={12} strokeLinecap="round" />
              <path d="M 64 -66 L 84 -96 L 74 -60 Z" fill="#9EA3A8" stroke={ATLAS.ink} strokeWidth={4} />
            </g>
          </svg>
        );
      })()}
      <Shield x={sx} y={sy - 40} k={prog(f, at("11", 0.5), 10, ease)} o={show(f, at("11", 0.5), at("12"))} />
      <DataCard value="TRUNG LẬP" label="THƯỜNG COI LÀ KHỞI ĐẦU" x={CX} y={470} f={f} at={at("11", 0.6)} out={at("12")} size={92} />

      {/* ── 12–13 Zwingli preaches against mercenary money; Zürich bans recruiting (1521), the other cantons are furious ── */}
      <PegImg src={`${IMG}/s-03-zwingli.png`} x={zw[0] - 40} y={zw[1] + 330} h={300} f={f} at={at("12") + 2} o={show(f, at("12") + 2, at("14") - 4)} />
      <MapLabel text="ZWINGLI" x={zw[0] - 40} y={zw[1] + 400} o={show(f, at("12", 0.2), at("13"))} size={52} />
      <CityPin cam={cam} f={f} label="ZÜRICH" at={P("zurich")} from={at("12")} o={show(f, at("12"), at("14") - 4)} side="right" />
      <YearRibbon text="1521" f={f} at={at("13")} out={at("14") - 4} />
      <Stamp text="CẤM MỘ LÍNH" x={CX} y={zw[1] + 560} f={f} at={at("13", 0.25)} out={at("14") - 4} color={ATLAS.red} />
      {(["lucerne", "schwyz", "uri", "bern"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        return <Pulse key={k} x={x} y={y} f={f + i * 9} color="#E0382E" period={30} o={show(f, at("13", 0.5), at("14") - 4)} />;
      })}

      {/* ── 14 1815 neutrality recognised ── */}
      <YearRibbon text="1815" f={f} at={at("14", 0.05)} out={at("15")} />
      <Shield x={sx} y={sy - 10} k={0.7 * prog(f, at("14", 0.3), 10, ease)} o={show(f, at("14", 0.3), at("15"))} />
      <DataCard value="TRUNG LẬP" label="ĐƯỢC CÔNG NHẬN" x={CX} y={470} f={f} at={at("14", 0.45)} out={at("15")} size={92} />

      {/* ── 15–17 so how did they get rich? skills. the banks are only a part ── */}
      <Question x={CX} y={620} f={f} at={at("15", 0.2)} out={at("16")} s={1.3} />
      <DataCard value="TAY NGHỀ" x={CX} y={360} f={f} at={at("16")} out={at("18")} size={110} />
      <PegImg src={`${IMG}/s-07-ket-sat.png`} x={CX + 150} y={1130} h={300} f={f} at={at("17")} o={show(f, at("17"), at("18")) * (1 - 0.55 * prog(f, at("17", 0.5), 10))} />
      <MapLabel text="MỘT PHẦN" x={CX + 150} y={1210} o={show(f, at("17", 0.4), at("18"))} size={52} />

      {/* ── 18–20 Geneva: jewellery banned → goldsmiths make watches; refugee craftsmen from France; the Red Cross (fact, no emblem) ── */}
      <CityPin cam={cam} f={f} label="GENÈVE" at={P("geneva")} from={at("15") + 20} o={show(f, at("15") + 20, at("21") - 4)} side="right" />
      <NoIcon x={gv[0] + 40} y={gv[1] + 330} kind="ring" label="TRANG SỨC" k={prog(f, at("18", 0.1), 8, ease)} o={show(f, at("18", 0.1), at("18", 0.65))}
        cross={prog(f, at("18", 0.3), 8, ease)} />
      {f >= at("18", 0.6) && f < at("21") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("21") - 6, 5) }}>
          <ImgSticker src={`${IMG}/s-04-dong-ho-quyt.png`} x={gv[0] + 40} y={gv[1] + 320} w={240} f={f} at={at("18", 0.6)} />
        </AbsoluteFill>
      )}
      {(() => {
        const ly = S(P("lyon"));
        return (
          <>
            {[0, 1, 2].map((i) => (
              <Arrow key={i} a={[ly[0] - 40 + i * 30, ly[1] + 40 - i * 40]} b={[gv[0] - 30, gv[1] + 10 + i * 20]} p={prog(f, at("19", 0.05) + i * 5, 18, ease)}
                o={show(f, at("19"), at("20", 0.3))} color={ATLAS.gold} bend={0.15} w={9} />
            ))}
            <MapLabel text="THỢ TỪ PHÁP" x={Math.max(250, ly[0])} y={ly[1] + 130} o={show(f, at("19", 0.2), at("20", 0.3))} size={52} />
          </>
        );
      })()}
      {f >= at("20") && f < at("21") && <Pulse x={gv[0]} y={gv[1]} f={f} color={ATLAS.red} period={34} o={1 - prog(f, at("21") - 6, 5)} />}
      <DataCard value="HỘI CHỮ THẬP ĐỎ" label="GENÈVE · 1863" x={CX} y={560} f={f} at={at("20", 0.2)} out={at("21")} size={84} />

      {/* ── 21 from hiring out soldiers to selling watches, machines, medicine: the goods ride the old arrows ── */}
      {legs.map((k, i) => (
        <Arrow key={`g-${k}`} a={[sx, sy]} b={S(P(k))} p={prog(f, at("21") + 12 + i * 4, 18, ease)} o={show(f, at("21") + 10, at("22"))} color="#F4E6C3"
          bend={i % 2 ? -0.2 : 0.2} w={8} />
      ))}
      {f >= at("21") + 14 && f < at("22") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("22") - 6, 5) }}>
          {legs.map((k, i) => {
            const t = prog(f, at("21") + 16 + i * 4, 30, ease);
            const [x, y] = onArrow([sx, sy], S(P(k)), 0.15 + 0.7 * t, i % 2 ? -0.2 : 0.2);
            return goods[i] ? <ImgSticker key={k} src={goods[i]} x={x} y={y} w={110} f={f} at={at("21") + 16 + i * 4} /> : null;
          })}
        </AbsoluteFill>
      )}
      {f >= at("21") + 14 && f < at("22") && (() => {
        const t = prog(f, at("21") + 24, 30, ease);
        const [x, y] = onArrow([sx, sy], S(P("madrid")), 0.15 + 0.7 * t, 0.2);
        return <Gear x={x} y={y} r={34} f={f} o={1 - prog(f, at("22") - 6, 5)} />;
      })()}
      <DataCard value="TỪ LÍNH → TAY NGHỀ" label="ĐỒNG HỒ · MÁY · THUỐC" x={CX} y={1190} f={f} at={at("21", 0.1)} out={at("22")} size={80} />

      {/* ── 22–25 and the soldiers? still there: the Pope's Swiss Guard; Vatican under a magnifier; the old arrows fade, one remains ── */}
      <Question x={CX} y={620} f={f} at={at("22", 0.4)} out={at("23")} s={1.3} />
      {f >= at("23") && f < END - 8 && (() => {
        const [vx, vy] = S(P("vatican"));
        const inRome = prog(f, at("24") - 4, 30, ease);
        const x = interpolate(inRome, [0, 1], [CX, Math.min(860, vx + 270)]);
        const y = interpolate(inRome, [0, 1], [1180, vy + 170]);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("25", 0.3), 14) }}>
            <PegImg src={`${IMG}/s-06-can-ve-vatican.png`} x={x} y={y} h={400} f={f} at={at("23")} />
          </AbsoluteFill>
        );
      })()}
      <CountryTag cam={cam} f={f} name="Vatican" label="VATICAN" flag="vatican" anchor={[12.2, 42.35]} from={at("24")} o={show(f, at("24"), at("25", 0.25))} glow={[at("24")]} />
      <Magnifier x={330} y={1060} r={150} k={prog(f, at("24", 0.35), 10, ease)} o={show(f, at("24", 0.35), at("25", 0.25))} />
      <MapLabel text="~0,44 KM²" x={330} y={1290} o={show(f, at("24", 0.5), at("25", 0.25))} size={52} />
      {(() => {
        const [x, y] = S(P("vatican"));
        return <Arrow a={[sx, sy]} b={[x, y]} p={prog(f, at("25", 0.45), 16, ease)} o={show(f, at("25", 0.45), END - 22)} color={ATLAS.gold} bend={-0.15} w={6} />;
      })()}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "02": "Thế mà nay, người Thụy Sĩ làm ra gấp khoảng *22 lần* người Việt Nam.",
  "04": "*Lính.*",
  "06": "Ước tính *1,5 triệu* người đã đi.",
  "07": "Người Pháp có câu: *không tiền, không lính Thụy Sĩ.*",
  "10": "Năm *1506*, *Kaspar von Silenen* dẫn lính Thụy Sĩ vào Rome gác cho Giáo hoàng.",
  "11": "*9 năm* sau, thua ở *Marignano*, thường được coi là khởi đầu trung lập.",
  "14": "Năm *1815*, châu Âu công nhận Thụy Sĩ *trung lập*.",
  "16": "*Tay nghề.*",
  "20": "Nước trung lập ấy còn là nơi ra đời *Hội Chữ thập đỏ*.",
  "23": "*Vẫn còn.*",
};

const CLICK = "click/mouse-click-351398.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const DRUM = "drum/perc-military-snare-drum-sound-effect-502886.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [CLICK, "02", 0.2], [WH, "05", 0, -2], [CLICK, "06", 0.1], [CLICK, "08", 0], [DRUM, "10", 0.1, 0, -20],
  [THUD, "11", 0.3, 0, -18], [CLICK, "13", 0.25], [WH, "15", 0, -2], [CLICK, "18", 0.6], [WH2, "21", 0, -4], [WH, "24", 0, -4],
];

/** Music duck: under the drum, the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f,
  [at("10") - 4, at("10") + 6, at("10", 0.6), at("10", 0.8), at("22") - 6, at("22") + 6, at("25", 1) - 4, at("25", 1) + 6],
  [1, 0.6, 0.6, 1, 1, 0.5, 0.5, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => (
  <Signature f={useCurrentFrame()} cuts={KEYS0.map((c) => c.at)} end={END} spots={[2, 1, 0, 2, 0, 0, 0, 3, 2, 3, 1, 2]} />
);

export const P1ThuySiLinhThue: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p1-thuy-si-linh-thue/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC.P1} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p1ThuySiLinhThueDuration = (fps: number) => episodeDuration(timing, fps);
