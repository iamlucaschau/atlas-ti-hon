/**
 * Map channel covers (Shorts thumbnails, 1080×1920): one frame of each episode's Scene (no subtitles,
 * no audio) + a two-tier hook (small setup line, huge punch line), a dark band behind the text, an
 * optional red ring / arrow on the one thing to look at, and the channel tag. Lucas 2026-10-15:
 * "text phải đủ mạnh và đủ hook để người xem phải click". Every hook is a sourced claim of the episode.
 * Render: npx remotion still Cover-<slug> out/cover.png, then JPG (< 2 MB) to Map/<slug>/cover.jpg.
 */
import { AbsoluteFill, Sequence } from "remotion";
import { FONT } from "../Style Library/kit-common";
import { ATLAS } from "../Style Library/I-toy-atlas/toy-atlas";
import { Scene as SingaporeScene } from "./i-singapore/Video";
import { Scene as BruneiScene } from "./p1-brunei-chia-doi/Video";
import { Scene as RailScene } from "./p2-duong-sat-cao-toc/Video";
import { Scene as SandScene } from "./p2-cat-mien-tay/Video";
import { Scene as CanalScene } from "./p2-funan-techo/Video";
import { Scene as DeltaScene } from "./p3-dbscl-sut-lun/Video";
import { Scene as KraScene } from "./p4-malacca-kra/Video";
import { Scene as ClockScene } from "./p5-trung-quoc-mui-gio/Video";
import { Scene as HighlandsScene } from "./p1-tay-nguyen-co-bien/Video";
import { Scene as BachMaScene } from "./p3-bach-ma/Video";
import { Scene as AirportScene } from "./p2-long-thanh/Video";

/** One hook line: "setup" lines are small and white, "punch" lines are huge and gold. */
type Line = { text: string; punch?: boolean };
type Mark = { x: number; y: number; r: number; arrowFrom?: [number, number] };
export type CoverSpec = { slug: string; Scene: React.FC; frame: number; hook: Line[]; y?: number; mark?: Mark };

const WIDTH = 960; // text column inside the safe zone (x 60–960, a little over the right rail is fine for a cover)

/** Largest size ≤ max that fits the column (Bricolage 800 caps ≈ 0.6 em per character). */
const fit = (text: string, max: number) => Math.min(max, Math.floor(WIDTH / (text.length * 0.6)));

const Hook: React.FC<{ lines: Line[]; y: number }> = ({ lines, y }) => (
  <div style={{ position: "absolute", left: 40, width: 1000, top: y, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
    {lines.map((l, i) => (
      <div key={i} style={{
        // Vietnamese stacks accents above capitals (Ắ, Ấ, Ể): leave room so lines never touch
        fontFamily: FONT, fontWeight: 800, lineHeight: 1.18, textAlign: "center", whiteSpace: "nowrap",
        fontSize: fit(l.text, l.punch ? 230 : 104), color: l.punch ? ATLAS.gold : ATLAS.white,
        WebkitTextStroke: `${l.punch ? 22 : 16}px ${ATLAS.ink}`, paintOrder: "stroke fill", textShadow: "0 12px 28px rgba(0,0,0,0.6)",
        rotate: l.punch ? "-2deg" : "0deg",
      }}>
        {l.text}
      </div>
    ))}
  </div>
);

/** Red ring (+ arrow) on the focal point. */
const Ring: React.FC<{ m: Mark }> = ({ m }) => (
  <svg width={1080} height={1920} style={{ position: "absolute" }}>
    {m.arrowFrom && (() => {
      const [ax, ay] = m.arrowFrom;
      const dx = m.x - ax;
      const dy = m.y - ay;
      const len = Math.hypot(dx, dy);
      const ex = m.x - (dx / len) * (m.r + 14);
      const ey = m.y - (dy / len) * (m.r + 14);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      return (
        <g>
          <line x1={ax} y1={ay} x2={ex} y2={ey} stroke={ATLAS.ink} strokeWidth={30} strokeLinecap="round" />
          <line x1={ax} y1={ay} x2={ex} y2={ey} stroke="#E53935" strokeWidth={18} strokeLinecap="round" />
          <g style={{ translate: `${ex}px ${ey}px`, rotate: `${angle}deg` }}>
            <path d="M 8 0 L -40 -30 L -40 30 Z" fill="#E53935" stroke={ATLAS.ink} strokeWidth={6} strokeLinejoin="round" />
          </g>
        </g>
      );
    })()}
    <circle cx={m.x} cy={m.y} r={m.r} fill="none" stroke={ATLAS.ink} strokeWidth={26} />
    <circle cx={m.x} cy={m.y} r={m.r} fill="none" stroke="#E53935" strokeWidth={14} />
  </svg>
);

/** Channel tag, bottom of the safe band. */
const Brand: React.FC = () => (
  <div style={{ position: "absolute", left: 0, right: 80, top: 1350, display: "flex", justifyContent: "center" }}>
    <div style={{
      fontFamily: FONT, fontWeight: 800, fontSize: 46, letterSpacing: 4, color: ATLAS.white, padding: "8px 30px", borderRadius: 40,
      background: "rgba(22,32,40,0.85)", border: `5px solid ${ATLAS.gold}`,
    }}>
      🗺️ ATLAS TÍ HON
    </div>
  </div>
);

export const COVERS: CoverSpec[] = [
  // Malaysia expelled Singapore (1965) → GDP per person 2024 ×7.6 (C3, C8)
  { slug: "i-singapore", Scene: SingaporeScene, frame: 60, hook: [{ text: "BỊ ĐUỔI ĐI" }, { text: "GIÀU GẤP 7", punch: true }], y: 230 },
  // Limbang cut Brunei in two (1890) — bay view: two gold halves, violet Limbang, red cut (C5)
  { slug: "p1-brunei-chia-doi", Scene: BruneiScene, frame: 884, hook: [{ text: "BỊ HÀNG XÓM" }, { text: "CẮT ĐÔI", punch: true }], y: 230,
    mark: { x: 560, y: 860, r: 120, arrowFrom: [900, 1200] } },
  // ~67 bn USD, "to buy one day" (C6, C8, C9)
  { slug: "p2-duong-sat-cao-toc", Scene: RailScene, frame: 20, hook: [{ text: "67 TỶ ĐÔ", punch: true }, { text: "ĐỂ MUA 1 NGÀY?" }], y: 240 },
  // the delta of rivers is short of sand for its expressways (C2, C3) — ring on the sand pile
  { slug: "p2-cat-mien-tay", Scene: SandScene, frame: 262, hook: [{ text: "XỨ SÔNG NƯỚC" }, { text: "LẠI KHÁT CÁT", punch: true }], y: 960,
    mark: { x: 420, y: 545, r: 140, arrowFrom: [820, 880] } },
  // ~0.8 m above sea level, sinking ~1 cm/yr (C1, C3)
  { slug: "p2-funan-techo", Scene: CanalScene, frame: 835, hook: [{ text: "KÊNH CAMPUCHIA" }, { text: "LẤY NƯỚC SÔNG HẬU?", punch: true }], y: 230 },
  { slug: "p3-dbscl-sut-lun", Scene: DeltaScene, frame: 178, hook: [{ text: "MIỀN TÂY CHỈ CAO" }, { text: "80 CM", punch: true }, { text: "VÀ ĐANG LÚN" }], y: 220 },
  // nearly a third of seaborne oil squeezes through Malacca (C1) — ring on the strait
  { slug: "p4-malacca-kra", Scene: KraScene, frame: 30, hook: [{ text: "GẦN 1/3 DẦU ĐI BIỂN" }, { text: "CHEN QUA ĐÂY", punch: true }], y: 230,
    mark: { x: 460, y: 970, r: 110, arrowFrom: [820, 1230] } },
  // Kashgar, winter: the sun only rises around 10:00 Beijing time (C7)
  { slug: "p5-trung-quoc-mui-gio", Scene: ClockScene, frame: 760, hook: [{ text: "10 GIỜ SÁNG", punch: true }, { text: "MẶT TRỜI MỚI MỌC" }], y: 240 },
  // every old Tây Nguyên province is now inside a province with a coast (C3, C4) — line 12: the new coasts glow; ring on Gia Lai's
  { slug: "p1-tay-nguyen-co-bien", Scene: HighlandsScene, frame: 640, hook: [{ text: "TÂY NGUYÊN" }, { text: "CÓ BIỂN?", punch: true }], y: 230,
    mark: { x: 670, y: 720, r: 105, arrowFrom: [900, 1110] } },
  // monthly means 16 °C (Hà Nội) ↔ > 25 °C (Sài Gòn), the Bạch Mã ridge in between (C1, C2, C4) — ring on the Bạch Mã ridge between the cold and warm halves
  { slug: "p3-bach-ma", Scene: BachMaScene, frame: 1000, hook: [{ text: "MỘT DÃY NÚI" }, { text: "CHIA ĐÔI MÙA ĐÔNG", punch: true }], y: 230,
    mark: { x: 385, y: 680, r: 95, arrowFrom: [700, 880] } },
  // phase 1 ~110.000 tỷ (C11), the investor's break-even assumes the international passengers move over (C17) — line 28: the passengers follow the first flight's trail; ring on Long Thành
  { slug: "p2-long-thanh", Scene: AirportScene, frame: 2035, hook: [{ text: "SÂN BAY 110 NGHÌN TỶ" }, { text: "ĐANG CHỜ KHÁCH", punch: true }], y: 230,
    mark: { x: 866, y: 850, r: 105, arrowFrom: [540, 940] } },
];

/** Props must be JSON (Remotion serialises them), so the composition passes the slug only. */
export const Cover: React.FC<{ slug: string }> = ({ slug }) => {
  const spec = COVERS.find((c) => c.slug === slug)!;
  return (
    <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
      {/* shift time so the scene sees spec.frame on the cover's single frame (Freeze is clamped to a 1-frame composition) */}
      <Sequence from={-spec.frame} durationInFrames={spec.frame + 1} layout="none">
        <spec.Scene />
      </Sequence>
      {/* dark band behind the hook so it reads on any map colour */}
      <AbsoluteFill style={{ background: "linear-gradient(rgba(10,18,26,0.78) 0%, rgba(10,18,26,0.55) 32%, rgba(10,18,26,0) 50%)" }} />
      {spec.mark && <Ring m={spec.mark} />}
      <Hook lines={spec.hook} y={spec.y ?? 240} />
      <Brand />
    </AbsoluteFill>
  );
};
