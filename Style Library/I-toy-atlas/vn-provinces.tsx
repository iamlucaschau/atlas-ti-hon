/**
 * I "TOY ATLAS" add-on: Vietnam drawn province by province (2026-10-18, first used by
 * Map/p1-tay-nguyen-co-bien). Draw it through `Atlas`'s `layer` with `skip={["Vietnam"]}`, so the
 * provinces share the map's camera and relief and Vietnam is not drawn twice.
 *
 * Geometry (Channel Bible §8.9: province shapes only from a dated source):
 * - VN2025: 34 provinces from 1/7/2025 — OCHA/HDX COD-AB v02 (valid 25/9/2025, CC BY-IGO: credit
 *   "OCHA" in the description). Đà Nẵng includes Hoàng Sa, Khánh Hoà includes Trường Sa.
 * - VN2024: the 63 provinces before 1/7/2025 — Natural Earth admin-1 10m (public domain), for
 *   "before" shots only. Three NE region names were fixed by ISO code (VN-39, -53, -66).
 * Both simplified to ~150 m with mapshaper (`geo/*.topo.json`); properties { id, name, coastal }.
 */
import { geoBounds, geoCentroid, geoContains } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { interpolate } from "remotion";
import { feature, mesh, neighbors } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { CANVAS, CLAMP, FONT, pop, SAFE } from "../kit-common";
import topo2024 from "./geo/vn-provinces-2024.topo.json";
import topo2025 from "./geo/vn-provinces-2025.topo.json";
import { ATLAS, baseXY, countryPath, type GeoCam, projectGeo, toScreen, ZONE } from "./toy-atlas";

/** Land around Vietnam, masked out of the coast glow so it never runs along a land border. */
const NEIGHBOURS = ["Laos", "Cambodia", "China", "Thailand"].map(countryPath);

type Props = { id: string; name: string; coastal: boolean };
/**
 * A province projected once: SVG path in base-projection space, its diagonal there (for wipes),
 * centroid (lon/lat) and a pastel colour that differs from every neighbour's (for "all provinces" shots).
 */
export type Province = Props & { d: string; span: number; c: [number, number]; pastel: string };

/** Pastels mixed from the ATLAS side colours; a greedy colouring needs at most 6 on a planar map. */
const PASTEL = ["#E8C77A", "#A9CF8E", "#9FC3E6", "#E7A99A", "#C9B3E0", "#F0D9A8"];

/**
 * Natural Earth 10m puts Côn Đảo (south of 9° N, east of 106.3° E) inside Sóc Trăng's MultiPolygon; until
 * 1/7/2025 it belonged to Bà Rịa - Vũng Tàu (found by the geo check, Lucas 2026-10-22). Moves those rings over.
 */
const fixConDao = (fc: FeatureCollection<Geometry, Props>) => {
  const st = fc.features.find((f) => f.properties.name === "Sóc Trăng");
  const vt = fc.features.find((f) => f.properties.name === "Bà Rịa - Vũng Tàu");
  if (!st || !vt || st.geometry.type !== "MultiPolygon" || vt.geometry.type !== "MultiPolygon") return;
  const isConDao = (poly: number[][][]) => {
    const [lon, lat] = geoCentroid({ type: "Polygon", coordinates: poly });
    return lat < 9 && lon > 106.3;
  };
  const moved = st.geometry.coordinates.filter(isConDao);
  st.geometry.coordinates = st.geometry.coordinates.filter((p) => !isConDao(p));
  vt.geometry.coordinates = [...vt.geometry.coordinates, ...moved];
};

const load = (topo: unknown, fix?: (fc: FeatureCollection<Geometry, Props>) => void): Province[] => {
  const t = topo as Topology;
  const fc = feature(t, t.objects.provinces) as FeatureCollection<Geometry, Props>;
  fix?.(fc);
  const near = neighbors((t.objects.provinces as GeometryCollection).geometries);
  const colour: number[] = [];
  fc.features.forEach((_, i) => {
    const used = new Set(near[i].map((j) => colour[j]));
    colour[i] = PASTEL.findIndex((_, k) => !used.has(k));
  });
  return fc.features.map((f, i) => {
    const [[w, s], [e, n]] = geoBounds(f);
    const [x0, y0] = baseXY(w, n);
    const [x1, y1] = baseXY(e, s);
    return { ...f.properties, d: projectGeo(f), span: Math.hypot(x1 - x0, y1 - y0), c: geoCentroid(f) as [number, number], pastel: PASTEL[colour[i]] };
  });
};

export const VN2024 = load(topo2024, fixConDao);
const FC2024 = (() => {
  const t = topo2024 as unknown as Topology;
  const fc = feature(t, t.objects.provinces) as FeatureCollection<Geometry, Props>;
  fixConDao(fc);
  return fc;
})();
const FC2025 = (() => {
  const t = topo2025 as unknown as Topology;
  return feature(t, t.objects.provinces) as FeatureCollection<Geometry, Props>;
})();
/** Name of the province (2024 or 2025 set) containing a lon/lat point, or "" at sea / abroad. */
export const provinceAt = (ll: [number, number], year: 2024 | 2025 = 2024) =>
  ((year === 2024 ? FC2024 : FC2025).features.find((f) => geoContains(f, ll))?.properties.name ?? "");
export const VN2025 = load(topo2025);

/**
 * The border shared by two 2025 provinces (e.g. Huế | Đà Nẵng = the Bạch Mã ridge out to the Hải Vân pass),
 * from the same HDX topology: `d` is its base-projection path, `ll` its lon/lat points west → east.
 */
export const provinceBorder = (a: string, b: string) => {
  const t = topo2025 as unknown as Topology;
  const m = mesh(t, t.objects.provinces as GeometryCollection, (x, y) => {
    const n = [(x.properties as Props).name, (y.properties as Props).name];
    return n.includes(a) && n.includes(b) && a !== b;
  });
  if (!m.coordinates.length) throw new Error(`No shared border between ${a} and ${b}`);
  const ll = m.coordinates.flat() as [number, number][];
  if (ll[0][0] > ll[ll.length - 1][0]) ll.reverse();
  return { d: projectGeo({ type: "Feature", properties: {}, geometry: m }), ll };
};

/**
 * A border drawn on in map space (inside `Atlas`'s `layer`): white core over a gold glow; `p` 0→1 draws it
 * from its first point, `glow` 0–1 brightens it (e.g. while the VO names it).
 */
export const BorderLine: React.FC<{ z: number; d: string; p?: number; glow?: number; o?: number }> = ({ z, d, p = 1, glow = 0, o = 1 }) => {
  if (o <= 0 || p <= 0) return null;
  const dash = { strokeDasharray: 1, strokeDashoffset: 1 - p };
  return (
    <g opacity={o} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} pathLength={1} style={dash} stroke={ATLAS.gold} strokeOpacity={0.45 + 0.55 * glow} strokeWidth={(16 + 10 * glow) / z} />
      <path d={d} pathLength={1} style={dash} stroke={ATLAS.ink} strokeWidth={8 / z} />
      <path d={d} pathLength={1} style={dash} stroke={ATLAS.white} strokeWidth={4.5 / z} />
    </g>
  );
};

/** A colour for one province; `wipe` floods `color` in from a point over `wipe.from` (like `Fill` for countries). */
export type ProvFill = { name: string; color: string; wipe?: { from: string; lon: number; lat: number; p: number; r?: number } };

const key = (s: string) => s.normalize("NFD").replace(/[^\w]/g, "");

/**
 * One set of provinces in map space (call inside `Atlas`'s `layer`, passing its `z`).
 * - `base`: colour of provinces without a fill; `lines`: opacity of the province borders (0 hides them).
 * - `flash`: provinces whose outline flashes gold (v 0–1, e.g. while the VO says the name).
 * - `coast`: a gold glow on the sea side of these provinces' coasts (v 0–1).
 * - `tag`: unique id prefix (two sets can be on screen while one fades into the other).
 */
export const ProvinceMap: React.FC<{
  z: number; set: Province[]; tag: string; base?: string; fills?: ProvFill[]; lines?: number; o?: number; f?: number;
  flash?: { name: string; v: number }[]; coast?: { names: string[]; v: number };
}> = ({ z, set, tag, base = ATLAS.land, fills = [], lines = 1, o = 1, f = 0, flash = [], coast }) => {
  if (o <= 0) return null;
  const byName = new Map(set.map((p) => [p.name, p]));
  const wipes = fills.filter((x) => x.wipe && byName.has(x.name));
  return (
    <g opacity={o}>
      <defs>
        {wipes.map((x) => {
          const w = x.wipe!;
          const [px, py] = baseXY(w.lon, w.lat);
          return (
            <clipPath key={x.name} id={`${tag}-w-${key(x.name)}`}>
              <circle cx={px} cy={py} r={(w.r ?? byName.get(x.name)!.span * 1.2) * w.p} />
            </clipPath>
          );
        })}
        {coast && coast.v > 0 && (
          <mask id={`${tag}-sea`} maskUnits="userSpaceOnUse" x={-2000} y={-2000} width={4000} height={4000}>
            <rect x={-2000} y={-2000} width={4000} height={4000} fill="#fff" />
            {set.map((p) => <path key={p.name} d={p.d} fill="#000" />)}
            {/* wide stroke: the neighbours' 50m borders do not sit exactly on the province borders */}
            {NEIGHBOURS.map((d, i) => <path key={i} d={d} fill="#000" stroke="#000" strokeWidth={18 / z} />)}
          </mask>
        )}
      </defs>
      {/* shallow-water halo along the coast (inner halves are covered by the fills) */}
      <g fill="none" stroke={ATLAS.shallow} strokeOpacity={0.5 + 0.1 * Math.sin(f / 20)} strokeWidth={22 / z} strokeLinejoin="round">
        {set.map((p) => <path key={p.name} d={p.d} />)}
      </g>
      {coast && coast.v > 0 && (
        <g mask={`url(#${tag}-sea)`} fill="none" stroke={ATLAS.gold} strokeOpacity={coast.v * (0.8 + 0.2 * Math.sin(f / 6))} strokeWidth={26 / z}
          strokeLinejoin="round">
          {coast.names.map((n) => byName.get(n)).filter((p): p is Province => !!p).map((p) => <path key={p.name} d={p.d} />)}
        </g>
      )}
      <g filter="url(#ta-relief)">
        {set.map((p) => {
          const fill = fills.find((x) => x.name === p.name);
          return <path key={p.name} d={p.d} fill={fill ? (fill.wipe ? fill.wipe.from : fill.color) : base} />;
        })}
        {wipes.map((x) => (
          <path key={`w-${x.name}`} d={byName.get(x.name)!.d} fill={x.color} clipPath={`url(#${tag}-w-${key(x.name)})`} />
        ))}
      </g>
      {lines > 0 && (
        <g fill="none" stroke={ATLAS.ink} strokeOpacity={0.6 * lines} strokeWidth={1.3 / z} strokeLinejoin="round">
          {set.map((p) => <path key={p.name} d={p.d} />)}
        </g>
      )}
      {flash.filter((x) => x.v > 0 && byName.has(x.name)).map((x) => (
        <g key={`fl-${x.name}`} fill="none" strokeLinejoin="round">
          <path d={byName.get(x.name)!.d} stroke={ATLAS.gold} strokeOpacity={x.v} strokeWidth={14 / z} />
          <path d={byName.get(x.name)!.d} stroke={ATLAS.white} strokeOpacity={x.v} strokeWidth={4 / z} />
        </g>
      ))}
    </g>
  );
};

/** 0 → 1 → 0 flash over ~1 s from each frame in `at` (for `ProvinceMap` `flash`). */
export const flashAt = (f: number, at: number[]) =>
  Math.max(0, ...at.map((g) => (f >= g && f < g + 30 ? Math.sin((Math.PI * 2 * (f - g)) / 30) ** 2 : 0)));

const fadeInside = (x: number, y: number) => {
  const inside = Math.min(x - SAFE.left, CANVAS.width - SAFE.right - x, y - ZONE.top.y1, ZONE.subs.y0 - 20 - y);
  return interpolate(inside, [0, 40], [0, 1], CLAMP);
};

/**
 * Province name pinned to the map (no flag): pops in at `from`, follows the camera, fades near the
 * safe-zone edges. ≥ 48 px. Use only for the provinces the VO names.
 */
export const ProvinceTag: React.FC<{ cam: GeoCam; f: number; label: string; anchor: [number, number]; from?: number; o?: number; size?: number }> = ({
  cam, f, label, anchor, from = -100, o = 1, size = 52,
}) => {
  if (f < from) return null;
  const [x, y] = toScreen(cam, ...anchor);
  const w = label.length * size * 0.6;
  const cx = Math.min(CANVAS.width - SAFE.right - w / 2, Math.max(SAFE.left + w / 2, x));
  const v = o * fadeInside(x, y);
  if (v <= 0) return null;
  return (
    <svg width={CANVAS.width} height={CANVAS.height} style={{ position: "absolute", opacity: v }}>
      <text x={cx} y={y + size * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={size} fill={ATLAS.white}
        stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke" letterSpacing={1}
        style={{ scale: pop(f, from), transformBox: "fill-box", transformOrigin: "center" }}>{label}</text>
    </svg>
  );
};

/**
 * City pin: a dot pinned to the map with its name beside it (`side`), popping in at `from`.
 * `color` red marks the administrative centre.
 */
export const CityPin: React.FC<{
  cam: GeoCam; f: number; label: string; at: [number, number]; from?: number; o?: number; color?: string; side?: "left" | "right" | "above";
}> = ({ cam, f, label, at, from = -100, o = 1, color = ATLAS.white, side = "right" }) => {
  if (f < from) return null;
  const [x, y] = toScreen(cam, ...at);
  const v = o * fadeInside(x, y);
  if (v <= 0) return null;
  const SIZE = 48;
  const k = pop(f, from);
  const w = label.length * SIZE * 0.58;
  const tx = side === "above" ? x : side === "right" ? x + 24 + w / 2 : x - 24 - w / 2;
  const ty = side === "above" ? y - 30 : y + SIZE * 0.36;
  return (
    <svg width={CANVAS.width} height={CANVAS.height} style={{ position: "absolute", opacity: v }}>
      <g style={{ scale: k, transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x} cy={y} r={12} fill={color} stroke={ATLAS.ink} strokeWidth={5} />
        <text x={tx} y={ty} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={SIZE} fill={ATLAS.white}
          stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke">{label}</text>
      </g>
    </svg>
  );
};
