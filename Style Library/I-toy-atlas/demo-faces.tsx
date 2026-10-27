/**
 * Kit demo (Lucas 2026-10-22, proposals #16, #18, #19): the "one province, N worlds" shot on the new
 * Lâm Đồng (Lâm Đồng + Đắk Nông + Bình Thuận since 1/7/2025), a `PromiseTitle`, `MapFace` on each old
 * province with a fake talking line, then the 8 moods side by side. Not an episode: no VO, no facts read.
 */
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CLAMP, CX, FONT } from "../kit-common";
import { ATLAS, Atlas, camAt, type FaceMood, type GeoCam, MapFace, PromiseTitle, talkOpen, toScreen } from "./toy-atlas";
import { ProvinceMap, VN2024, VN2025 } from "./vn-provinces";

const FPS = 30;
const OLD = ["Lâm Đồng", "Đắk Nông", "Bình Thuận"];
const COLORS = ["#E7A99A", "#A9CF8E", "#9FC3E6"];
const MOODS: FaceMood[] = ["happy", "smug", "worried"];
const ALL: FaceMood[] = ["neutral", "happy", "smug", "angry", "worried", "surprised", "sad", "wink"];
/** Fake word starts (s) for one talking line per province, ~2 s each. */
const LINE = [0, 0.22, 0.4, 0.66, 0.9, 1.1, 1.34, 1.6, 1.82];

const KEYS: GeoCam[] = [
  { at: 0, lon: 107.6, lat: 13.5, zoom: 26 },
  { at: 1, lon: 107.75, lat: 11.55, zoom: 120 },
];

export const KitFaceDemo: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, 0.04, 0.08);
  const set = VN2024.filter((p) => OLD.includes(p.name));
  const split = interpolate(f, [100, 120], [0, 1], CLAMP);
  const grid = f >= 300;
  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2025} tag="p25" base={ATLAS.c} lines={0.5} f={f}
        fills={[{ name: "Lâm Đồng", color: "#E8C77A" }]} />
      {split > 0 && (
        <ProvinceMap z={z} set={set} tag="old" lines={1} o={split} f={f}
          fills={OLD.map((name, i) => ({ name, color: COLORS[i] }))} />
      )}
    </>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <PromiseTitle lines={["3 THẾ GIỚI", "TRONG MỘT TỈNH"]} y={300} f={f} at={30} out={100} />
      {!grid && set.map((p, i) => {
        const [x, y] = toScreen(cam, ...p.c);
        const t0 = 130 + i * 55;
        const talk = talkOpen(f, FPS, LINE.map((s) => s + t0 / FPS), t0 / FPS + 2);
        return <MapFace key={p.name} x={x} y={y} f={f} at={120 + i * 6} mood={MOODS[i]} talk={talk} s={1.25} seed={i} out={292} />;
      })}
      {grid && (
        <AbsoluteFill style={{ backgroundColor: "rgba(201,177,132,0.95)" }}>
          {ALL.map((mood, i) => {
            const x = 250 + (i % 2) * 400;
            const y = 360 + Math.floor(i / 2) * 260;
            return (
              <AbsoluteFill key={mood}>
                <MapFace x={x} y={y} f={f} at={302 + i * 2} mood={mood} s={1.1} seed={i} />
                <svg width={1080} height={1920} style={{ position: "absolute" }}>
                  <text x={x} y={y + 130} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{mood}</text>
                </svg>
              </AbsoluteFill>
            );
          })}
        </AbsoluteFill>
      )}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <text x={CX} y={1500} textAnchor="middle" fontFamily={FONT} fontWeight={700} fontSize={40} fill={ATLAS.white} opacity={0.6}>KIT DEMO · MapFace · PromiseTitle</text>
      </svg>
    </AbsoluteFill>
  );
};
