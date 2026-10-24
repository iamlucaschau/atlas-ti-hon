/**
 * Atlas Tí Hon · P2 Tiền & bản đồ · Money+Maps (+ Cause-and-Effect), style I Toy Atlas:
 * "EVN từ lỗ 45 nghìn tỷ đến lãi 52 nghìn tỷ: nhờ trời mưa?" — Gates 1–4 approved by Lucas 2026-10-24.
 * Script + sources: kich-ban-p2-evn-gia-dien-FINAL.md, cong-2_so-nguon.md (C1–C14).
 * Scopes never mixed (rule 15): the 44,792 bn loss is the PARENT company's accumulated loss (end 2024), the 51,881 bn
 * profit is the GROUP's consolidated 2025 profit; the twist compares like with like (parent loss 44,792 → 5,611 bn).
 * Human moment: Nguyễn Tiến Thỏa (former head of the Price Management Department), both halves of his view (C8).
 * Soft loop: the VO ends on line 20; the last frame is the opening frame (Vietnam with faint hydropower dots).
 *
 * Plant dots: project sites, checked by scripts/geo-check.mjs (PLACES). The 500 kV line is SCHEMATIC; clouds, the
 * filling reservoirs, the coal ship and the scales are illustrations.
 */
import { Audio } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame } from "remotion";
import timing from "../../src/voiceover/p2-evn-gia-dien.timing.json";
import words from "../../src/voiceover/p2-evn-gia-dien.words.json";
import { episodeDuration } from "../../src/series/pvr/episode";
import { SafeGuide } from "../../src/series/pvr/safe";
import { MusicBed, PILLAR_MUSIC_ALT, SfxCues, type SfxCue } from "../../src/series/pvr/sfx";
import { CLAMP, CX, FONT, prog } from "../../Style Library/kit-common";
import { KaraokeSubs } from "../../Style Library/subs";
import {
  ATLAS, Atlas, AtlasSub, beats, camAt, DataCard, type GeoCam, ImgSticker, MapLabel, PegImg, pts, Question, seamKeys,
  show, Signature, toScreen, Track, VnIslands, YearRibbon,
} from "../../Style Library/I-toy-atlas/toy-atlas";
import { CityPin, ProvinceMap, VN2025 } from "../../Style Library/I-toy-atlas/vn-provinces";

const FPS = 30;
const IMG = "images/p2-evn-gia-dien/cut";
const OLD = "images"; // props re-used from earlier episodes
const { at, line } = beats(timing, FPS);
const END = episodeDuration(timing, FPS);
const W = words as Record<string, number[]>;
const ease = Easing.inOut(Easing.cubic);
/** Frame of word `i` of VO line `id` (words.json holds absolute start times in seconds). */
const wAt = (id: string, i: number) => Math.round((W[id]?.[i] ?? line(id).start) * FPS);

type LL = [number, number];

/** Every map-anchored thing and the province it must sit in (scripts/geo-check.mjs). */
export const PLACES = {
  sonLa: { ll: [104.0, 21.48], in: "Sơn La" },
  laiChau: { ll: [103.25, 22.12], in: "Lai Châu" },
  hoaBinh: { ll: [105.32, 20.81], in: "Hòa Bình" },
  yaly: { ll: [107.83, 14.23], in: "Kon Tum" },
  triAn: { ll: [107.03, 11.1], in: "Đồng Nai" },
  qnPort: { ll: [107.12, 20.95], in: "Quảng Ninh" },
  hanoi: { ll: [105.84, 21.03], in: "Hà Nội" },
  hcm: { ll: [106.7, 10.78], in: "TP. Hồ Chí Minh" },
  danang: { ll: [108.2, 16.05], in: "Đà Nẵng" },
} as const;
const P = (k: keyof typeof PLACES) => PLACES[k].ll as unknown as LL;
const HYDRO = ["sonLa", "laiChau", "hoaBinh", "yaly", "triAn"] as const;
/** schematic 500 kV backbone, Hòa Bình → TP.HCM (not the real route) */
const LINE500: LL[] = [[105.32, 20.81], [105.75, 18.9], [106.5, 17.5], [108.0, 16.0], [108.05, 14.4], [107.8, 12.6], [107.03, 11.1], [106.7, 10.78]];

const VN = ATLAS.c;
const DIM = "#E2D4B6";
const LOSS = "#D9534F";
const PROFIT = "#5BB86A";
const WATER = "#4E93C9";

const VIEW = {
  vn: { lon: 106.4, lat: 16.2, zoom: 24 },
  vnIn: { lon: 106.2, lat: 16.6, zoom: 26.5 },
  north: { lon: 105.3, lat: 21.4, zoom: 60 },
  central: { lon: 107.9, lat: 12.7, zoom: 55 },
  twist: { lon: 106.0, lat: 16.0, zoom: 26 },
};
const KEYS0: GeoCam[] = [
  { at: 0, ...VIEW.vn },
  // opening (Bible 2026-10-21): the camera moves from frame 1
  { at: 1, ...VIEW.vnIn },
  { at: at("04") - 2, ...VIEW.north },
  { at: at("08") - 4, ...VIEW.vn },
  { at: at("12") - 4, ...VIEW.north },
  { at: at("13") - 4, ...VIEW.central },
  { at: at("14") - 4, ...VIEW.vn },
  { at: at("16") - 2, ...VIEW.twist },
  { at: at("20"), ...VIEW.vn },
];
const PUSH = 0.04;
const PUSH_CAP = 0.08;
const KEYS = seamKeys(KEYS0, END, PUSH, PUSH_CAP);

/** A rain cloud (screen space, centre 0, 0); `face` adds a smile. */
const Cloud: React.FC<{ f: number; rain?: number; face?: boolean }> = ({ f, rain = 1, face }) => (
  <g stroke={ATLAS.ink} strokeWidth={5} strokeLinejoin="round">
    {rain > 0 && [-30, -10, 10, 30].map((x, i) => {
      const y = ((f * 4 + i * 23) % 70) + 30;
      return <line key={x} x1={x} y1={y} x2={x - 6} y2={y + 18} stroke="#4778A0" strokeWidth={6} strokeLinecap="round" opacity={rain * (1 - y / 110)} />;
    })}
    <path d="M -58 18 Q -70 -12 -38 -16 Q -30 -48 4 -40 Q 30 -60 50 -28 Q 76 -24 66 6 Q 66 22 44 22 L -40 22 Q -58 22 -58 18 Z" fill="#F7F2E8" />
    {face && (
      <>
        <circle cx={-10} cy={-8} r={4} fill={ATLAS.ink} stroke="none" />
        <circle cx={16} cy={-8} r={4} fill={ATLAS.ink} stroke="none" />
        <path d="M -12 4 Q 3 16 18 4" fill="none" strokeWidth={4} strokeLinecap="round" />
      </>
    )}
  </g>
);

/** Horizontal bars panel. `value` in any unit; `max` sets the scale. */
type Bar = { label: string; color: string; value: number; p: number; text?: string };
const Bars: React.FC<{ rows: Bar[]; max: number; y: number; o: number; title?: string }> = ({ rows, max, y, o, title }) => {
  if (o <= 0) return null;
  const x0 = 410;
  const len = 450;
  const h = 70;
  const gap = 34;
  const top = y - (rows.length * (h + gap) - gap) / 2;
  const panelTop = top - (title ? 96 : 40);
  const panelH = rows.length * (h + gap) - gap + (title ? 136 : 80);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <rect x={84} y={panelTop} width={852} height={panelH} rx={30} fill={ATLAS.white} fillOpacity={0.94} stroke={ATLAS.ink} strokeWidth={6} />
      {title && <text x={CX - 30} y={panelTop + 70} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{title}</text>}
      {rows.map((r, i) => {
        const yy = top + i * (h + gap);
        const w = (len * r.value * r.p) / max;
        return (
          <g key={r.label}>
            <text x={x0 - 22} y={yy + h * 0.7} textAnchor="end" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{r.label}</text>
            <rect x={x0} y={yy} width={len} height={h} rx={14} fill="#D9D2C2" />
            {w > 0 && <rect x={x0} y={yy} width={w} height={h} rx={14} fill={r.color} stroke={ATLAS.ink} strokeWidth={5} />}
            {r.text && (
              // a short bar would hide the first digits: write the number after it instead
              <text x={w >= 250 ? x0 + w - 16 : x0 + w + 18} y={yy + h * 0.72} textAnchor={w >= 250 ? "end" : "start"} fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{r.text}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** A full-width text box (two sides of the debate), screen space. */
const Side: React.FC<{ y: number; head: string; body: string; color: string; o: number; k: number }> = ({ y, head, body, color, o, k }) => {
  if (o <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${CX}px ${y}px`, scale: k }}>
        <rect x={-420} y={-80} width={840} height={160} rx={26} fill={ATLAS.white} fillOpacity={0.95} stroke={color} strokeWidth={8} />
        <text y={-14} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={52} fill={color} stroke={ATLAS.ink} strokeWidth={2}>{head}</text>
        <text y={48} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{body}</text>
      </g>
    </svg>
  );
};

/** Weather icon (sun behind a rain cloud), screen space. */
const Weather: React.FC<{ f: number }> = ({ f }) => (
  <g>
    <circle cx={22} cy={-20} r={26} fill={ATLAS.gold} stroke={ATLAS.ink} strokeWidth={5} />
    <g style={{ scale: 0.7 }}><Cloud f={f} /></g>
  </g>
);

export const Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(KEYS, f, PUSH, PUSH_CAP);
  const S = (ll: LL) => toScreen(cam, ...ll);

  const dimO = interpolate(cam.zoom, [30, 55], [0, 1], CLAMP);
  // reservoirs fill when it rains (04–05 a first glimpse, 12–14 full), faint dots on every frame (loop frame not empty)
  const fill = Math.max(0.15 * show(f, wAt("05", 0), at("06")), show(f, wAt("12", 2), at("15")), 0.6 * show(f, at("19"), at("20", 0.6)));
  const layer = (z: number) => (
    <>
      <ProvinceMap z={z} set={VN2025} tag="p25" base={VN} lines={0.5} f={f} />
      {dimO > 0 && <ProvinceMap z={z} set={VN2025} tag="dim" base={DIM} lines={0.4} o={dimO} f={f} />}
    </>
  );

  // 01–03 loss → profit bars; 17–18 the parent's loss shrinking
  const barsO = show(f, wAt("01", 9), at("04") - 4);
  const lossP = prog(f, wAt("01", 9), 18, ease);
  const profitP = prog(f, wAt("03", 7), 22, ease);
  const twistO = show(f, at("17"), at("19") - 2);
  const shrink = prog(f, wAt("18", 9), 26, ease);
  const parentLoss = interpolate(shrink, [0, 1], [44792, 5611]);

  return (
    <AbsoluteFill>
      <Atlas cam={cam} f={f} skip={["Vietnam"]} layer={layer} />
      <VnIslands cam={cam} f={f} color={VN} o={interpolate(cam.zoom, [30, 40], [1, 0], CLAMP)} />

      {/* hydropower dots (always on, faint) with their reservoirs filling */}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {HYDRO.map((k, i) => {
          const [x, y] = S(P(k));
          const r = 7 + 26 * fill * (0.7 + 0.3 * Math.sin(f / 12 + i)) * interpolate(cam.zoom, [24, 60], [0.6, 1.2], CLAMP);
          return (
            <g key={k}>
              {fill > 0 && <circle cx={x} cy={y} r={r} fill={WATER} fillOpacity={0.55} stroke={ATLAS.white} strokeWidth={2} />}
              <circle cx={x} cy={y} r={7} fill={WATER} stroke={ATLAS.white} strokeWidth={3} opacity={0.75} />
            </g>
          );
        })}
      </svg>

      {/* ── 01–03 parent's loss ~45k bn → proposal into prices → group profit ~52k bn ── */}
      {f >= 3 && f < at("04") && (["hanoi", "danang", "hcm"] as const).map((k, i) => {
        const [x, y] = S(P(k));
        const p = prog(f, 3 + i * 6, 18, ease);
        return (
          <AbsoluteFill key={k} style={{ opacity: Math.min(p, 1 - prog(f, wAt("01", 8), 8)) }}>
            <ImgSticker src={`${IMG}/e-01-hoa-don-dien.png`} x={interpolate(p, [0, 1], [CX, x + 50])} y={interpolate(p, [0, 1], [960, y - 30])} w={90} f={f} at={3 + i * 6} />
          </AbsoluteFill>
        );
      })}
      <DataCard value="LỖ LŨY KẾ" label="CÔNG TY MẸ EVN · CUỐI 2024" x={CX} y={330} f={f} at={wAt("01", 9)} out={at("02")} size={88} />
      <DataCard value="ĐỀ XUẤT" label="TÍNH DẦN VÀO GIÁ ĐIỆN" x={CX} y={330} f={f} at={at("02")} out={at("03")} size={88} />
      {f >= at("02") && f < at("03") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("03") - 6, 5) }}>
          <ImgSticker src={`${IMG}/e-01-hoa-don-dien.png`} x={780} y={760} w={190} f={f} at={at("02")} />
        </AbsoluteFill>
      )}
      <DataCard value="LÃI SAU THUẾ" label="CẢ TẬP ĐOÀN · 2025" x={CX} y={330} f={f} at={at("03")} out={at("04") - 4} size={88} />
      <Bars y={1140} o={barsO} max={55000} rows={[
        { label: "LỖ", color: LOSS, value: 44792, p: lossP, text: "44.792 TỶ" },
        { label: "LÃI", color: PROFIT, value: 51881, p: profitP, text: profitP > 0.9 ? "51.881 TỶ" : undefined },
      ]} />

      {/* ── 04–05 the secret? rain ── */}
      <Question x={CX} y={620} f={f} at={at("04") - 2} out={at("05")} s={1.3} />
      {f >= at("05") - 2 && f < at("06") + 10 && ([[103.6, 22.0], [104.6, 21.6], [105.2, 20.9]] as LL[]).map((ll, i) => {
        const [x, y] = S(ll);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("05") - 2 + i * 3, 6), 1 - prog(f, at("06") + 4, 6)) }}>
            <g style={{ translate: `${x}px ${y - 80}px`, scale: 1.2 }}><Cloud f={f + i * 7} /></g>
          </svg>
        );
      })}

      {/* ── 06–07 2022: expensive imported coal; cost of coal power ≈ twice the retail price ── */}
      <YearRibbon text="2022" f={f} at={at("06", 0.05)} out={at("08") - 4} />
      {f >= at("06") && f < at("08") && (() => {
        const [x, y] = S(P("qnPort"));
        const p = prog(f, at("06"), 40, ease);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("08") - 6, 5) }}>
            <ImgSticker src={`${IMG}/e-03-tau-than.png`} x={interpolate(p, [0, 1], [x + 60, x - 90])} y={y - 70} w={220} f={f} at={at("06")} />
          </AbsoluteFill>
        );
      })()}
      <CityPin cam={cam} f={f} label="QUẢNG NINH" at={P("qnPort")} from={wAt("06", 4)} o={show(f, wAt("06", 4), at("08") - 4)} side="left" />
      <Bars y={1150} o={show(f, at("07"), at("08") - 2)} max={4200} title="Đ/KWH · 2022" rows={[
        { label: "ĐIỆN THAN", color: LOSS, value: 3750, p: prog(f, at("07"), 16, ease), text: "3.500–4.000" },
        { label: "GIÁ BÁN", color: PROFIT, value: 1864, p: prog(f, wAt("07", 7), 16, ease), text: "1.864" },
      ]} />

      {/* ── 08–10 two sides; [NGƯỜI] Nguyễn Tiến Thỏa ── */}
      <Side y={900} head="BỘ CÔNG THƯƠNG" body="CHI PHÍ HỢP LÝ CẦN BÙ" color="#C8322B" o={show(f, at("08"), at("10") - 2)} k={prog(f, at("08"), 8, ease)} />
      <Side y={1120} head="BỘ TÀI CHÍNH" body="TÁCH LỖ AN SINH / KINH DOANH" color="#2C5476" o={show(f, at("09"), at("10") - 2)} k={prog(f, at("09"), 8, ease)} />
      <PegImg src={`${IMG}/e-04-chuyen-gia.png`} x={250} y={1300} h={330} f={f} at={at("10")} o={1 - prog(f, at("11") - 6, 6)} />
      <MapLabel text="NGUYỄN TIẾN THỎA" x={380} y={905} o={show(f, at("10", 0.02), at("11") - 4)} size={50} />
      <DataCard value="NGUYÊN CỤC TRƯỞNG" label="CỤC QUẢN LÝ GIÁ" x={CX} y={330} f={f} at={wAt("10", 4)} out={at("11") - 4} size={70} />
      {([["YẾU KÉM → TỰ CHỊU", wAt("10", 12), 1010, "#C8322B"], ["AN SINH → CẦN BÙ", wAt("10", 19), 1170, "#2C5476"]] as const).map(([t, a, y, c]) => (
        <svg key={t} width={1080} height={1920} style={{ position: "absolute", opacity: show(f, a, at("11") - 4) }}>
          <g style={{ translate: `660px ${y}px`, scale: prog(f, a, 8, ease) }}>
            <rect x={-250} y={-48} width={500} height={92} rx={22} fill={ATLAS.white} stroke={c} strokeWidth={7} />
            <text y={16} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={48} fill={ATLAS.ink}>{t}</text>
          </g>
        </svg>
      ))}

      {/* ── 11 5/2025: +4.8 % ── */}
      <YearRibbon text="5/2025" f={f} at={at("11", 0.05)} out={at("12")} />
      <DataCard value="+4,8 %" label="GIÁ BÁN LẺ BÌNH QUÂN" x={CX} y={330} f={f} at={wAt("11", 6)} out={at("12")} size={100} />
      {f >= at("11") && f < at("12") && (
        <AbsoluteFill style={{ opacity: 1 - prog(f, at("12") - 6, 5) }}>
          <ImgSticker src={`${IMG}/e-01-hoa-don-dien.png`} x={CX} y={900 - 40 * Math.abs(Math.sin((f - at("11")) / 6)) * (1 - prog(f, at("11"), 40))} w={230} f={f} at={at("11")} />
        </AbsoluteFill>
      )}

      {/* ── 12–14 rain fills the reservoirs (north, then Central Highlands / South East); cheapest power; profit jumps ── */}
      {f >= at("12") - 2 && f < at("13") && ([[103.6, 22.0], [104.6, 21.7], [105.4, 21.0]] as LL[]).map((ll, i) => {
        const [x, y] = S(ll);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("12") - 2 + i * 3, 6), 1 - prog(f, at("13") - 6, 5)) }}>
            <g style={{ translate: `${x}px ${y - 90}px`, scale: 1.2 }}><Cloud f={f + i * 5} /></g>
          </svg>
        );
      })}
      <CityPin cam={cam} f={f} label="SƠN LA" at={P("sonLa")} from={wAt("12", 7)} o={show(f, wAt("12", 7), at("13") - 4)} side="right" />
      <CityPin cam={cam} f={f} label="HÒA BÌNH" at={P("hoaBinh")} from={wAt("12", 8)} o={show(f, wAt("12", 8), at("13") - 4)} side="right" />
      {f >= at("12") + 8 && f < at("13") && (() => {
        const [x, y] = S(P("sonLa"));
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("13") - 6, 5) }}>
            <PegImg src={`${OLD}/p4-mekong-voi-nuoc/cut/m-01-dap-vom.png`} x={Math.max(200, x + 60)} y={y + 260} h={160} f={f} at={at("12") + 8} />
          </AbsoluteFill>
        );
      })()}
      <CityPin cam={cam} f={f} label="YALY" at={P("yaly")} from={at("13")} o={show(f, at("13"), at("14") - 4)} side="right" />
      <CityPin cam={cam} f={f} label="TRỊ AN" at={P("triAn")} from={at("13") + 6} o={show(f, at("13") + 6, at("14") - 4)} side="right" />
      <DataCard value="THỦY ĐIỆN +24,5 %" label="6 THÁNG ĐẦU 2025" x={CX} y={330} f={f} at={wAt("13", 9)} out={at("14")} size={88} />
      <AbsoluteFill style={{ opacity: show(f, at("14"), at("16")) }}>
        <Track ps={pts(cam, LINE500)} p={prog(f, at("14"), 24, ease)} color={ATLAS.gold} w={8} glow={0.7} f={f} />
      </AbsoluteFill>
      {f >= at("14") && f < at("16") && (() => {
        const [x, y] = S(LINE500[5]);
        return (
          <AbsoluteFill style={{ opacity: 1 - prog(f, at("16") - 6, 5) }}>
            <PegImg src={`${IMG}/e-02-cot-dien.png`} x={x + 30} y={y + 40} h={150} f={f} at={at("14") + 4} />
          </AbsoluteFill>
        );
      })()}
      <DataCard value="RẺ NHẤT" label="THỦY ĐIỆN · LÃI TĂNG VỌT" x={CX} y={330} f={f} at={wAt("14", 3)} out={at("15")} size={96} />
      {f >= at("15") && f < at("16") && (() => {
        const [x, y] = S(P("hanoi"));
        const k = prog(f, at("15"), 10, ease);
        return (
          <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - prog(f, at("16") - 6, 5) }}>
            <g style={{ translate: `${x}px ${Math.max(y - 120, 320)}px`, scale: 1.8 * k }}><Cloud f={f} face /></g>
          </svg>
        );
      })()}

      {/* ── 16–19 [TWIST] the group is out of the red, the parent is not; the loss shrank to ~5.6k bn ── */}
      <Question x={CX + 200} y={600} f={f} at={at("16")} out={at("17")} s={1.2} />
      <Bars y={1120} o={twistO} max={46000} title="LỖ LŨY KẾ" rows={[
        { label: "TẬP ĐOÀN", color: PROFIT, value: 0, p: 1, text: "HẾT LỖ ✓" },
        { label: "CÔNG TY MẸ", color: LOSS, value: parentLoss, p: prog(f, wAt("17", 6), 14, ease), text: shrink > 0.95 ? "~5.611 TỶ" : shrink > 0 ? undefined : "44.792 TỶ" },
      ]} />
      <DataCard value="CÒN ~5.611 TỶ" label="CÔNG TY MẸ · CUỐI 2025" x={CX} y={330} f={f} at={wAt("18", 10)} out={at("19")} size={92} />
      {f >= at("19") - 2 && f < at("20") && ([[104.6, 19.6], [107.9, 14.6], [106.9, 12.2]] as LL[]).map((ll, i) => {
        const [x, y] = S(ll);
        return (
          <svg key={i} width={1080} height={1920} style={{ position: "absolute", opacity: Math.min(prog(f, at("19") - 2 + i * 3, 6), 1 - prog(f, at("20") - 6, 5)) }}>
            <g style={{ translate: `${x}px ${y - 70}px` }}><Cloud f={f + i * 9} /></g>
          </svg>
        );
      })}
      <DataCard value="NĂM NHIỀU NƯỚC" label="ĐỀ XUẤT: BÙ LỖ, GIỮ GIÁ" x={CX} y={330} f={f} at={wAt("19", 5)} out={at("20")} size={88} />

      {/* ── 20 the bill comes with a weather forecast; gone before the loop frame ── */}
      {f >= at("20") && f < END - 8 && (
        <AbsoluteFill style={{ opacity: Math.min(prog(f, at("20"), 6), 1 - prog(f, END - 24, 14)) }}>
          <ImgSticker src={`${IMG}/e-01-hoa-don-dien.png`} x={CX} y={880} w={260} f={f} at={at("20")} />
          <svg width={1080} height={1920} style={{ position: "absolute" }}>
            <g style={{ translate: `${CX + 62}px 792px`, scale: 0.9 * prog(f, wAt("20", 8), 10, ease) }}><Weather f={f} /></g>
          </svg>
        </AbsoluteFill>
      )}

      <SafeGuide />
    </AbsoluteFill>
  );
};

const CAPTIONS: Record<string, string> = {
  "01": "Cuối năm *2024*, công ty mẹ EVN còn lỗ gần *45 nghìn tỷ*.",
  "03": "Vậy mà một năm sau, cả tập đoàn lãi gần *52 nghìn tỷ*.",
  "05": "*Trời mưa.*",
  "06": "Năm *2022*, than nhập khẩu đắt vọt.",
  "07": "Mỗi số điện từ than tốn gần *gấp đôi* giá bán ra, nên càng bán càng lỗ.",
  "10": "Ông *Nguyễn Tiến Thỏa*, nguyên Cục trưởng Cục Quản lý giá, nói: làm ăn yếu kém thì tự chịu, giữ giá vì an sinh thì phải có cách bù.",
  "11": "Tháng 5 năm *2025*, giá điện tăng *4,8 %*.",
  "13": "Sáu tháng đầu năm, điện từ thủy điện tăng gần *1/4*.",
  "18": "Khoản lỗ từng đề xuất tính vào giá điện giờ còn hơn *5.600 tỷ*.",
  "20": "Hoá đơn tiền điện, hoá ra cũng phải xem *dự báo thời tiết*.",
};

const CLICK = "click/mouse-click-351398.mp3";
const PEN = "click/pen-click-411629.mp3";
const THUD = "deephit/impact-thud-291047.mp3";
const WH = "whoosh/simple-whoosh-382724.mp3";
const WH2 = "whoosh/clean-whoosh-382726.mp3";
// [file, line id, fraction of the line, frame offset?, level dB?] — real Pixabay SFX only, max one per beat
const SFX: SfxCue[] = [
  [WH2, "01", 0, -1], [CLICK, "03", 0.5], [WH, "04", 0, -2], [CLICK, "07", 0.1], [WH2, "08", 0, -4], [PEN, "10", 0.4],
  [CLICK, "11", 0.6], [WH, "12", 0, -4], [WH2, "13", 0, -4], [WH, "14", 0, -4], [THUD, "17", 0.3, 0, -18], [CLICK, "18", 0.6],
];

/** Music duck: the bed dips under the twist and the closing line. */
const musicDuck = (f: number) => interpolate(f, [at("17") - 6, at("17") + 6, at("20", 1) - 4, at("20", 1) + 6], [1, 0.45, 0.45, 1], CLAMP);

/** Channel signature, moved at every camera flight (Lucas 2026-10-24). */
const SignatureLayer: React.FC = () => <Signature f={useCurrentFrame()} cuts={KEYS0.map((k) => k.at)} end={END} spots={[1, 3, 1, 2, 0, 2, 1, 1]} />;

export const P2EvnGiaDien: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: ATLAS.deep }}>
    <Scene />
    <SignatureLayer />
    <KaraokeSubs timing={timing} words={words} captions={CAPTIONS} Skin={AtlasSub} oneLine maxWords={4} maxChars={20} />
    <Audio name="VO" src={staticFile("voiceover/p2-evn-gia-dien/vo.mp3")} />
    <MusicBed file={PILLAR_MUSIC_ALT.P2} duck={musicDuck} />
    <SfxCues timing={timing} cues={SFX} />
  </AbsoluteFill>
);

export const p2EvnGiaDienDuration = (fps: number) => episodeDuration(timing, fps);
