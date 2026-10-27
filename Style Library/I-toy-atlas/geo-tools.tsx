/**
 * Toy Atlas — geometry tools lifted out of the episodes (Lucas 2026-10-27, project review B1), so a new episode imports them
 * instead of copying ~200 lines. First written for p3-dien-tich-viet-nam (Mercator sizes) and p1-thuy-si-linh-thue (arrows).
 *
 * - `countryRings` / `moveOnSphere` / `geoSticker`: a country moved RIGIDLY on the sphere (shift of longitude, then a rotation
 *   along the meridian, so north stays up) and projected with the kit's Mercator — "how big it looks if it sat there".
 *   `flat` 1 = the shape as the map draws it at home, slid over (map size); 0 = true size at the new place.
 * - `MapLayer` (map-space group under the camera), `MapSticker` (a country sticker: shadow + fill, or a dashed ghost).
 * - `Graticule` (10° grid: the parallels spread towards the pole), `Tissot` (equal circles on the globe, swelling on the map).
 * - `morphProjection` / `MorphMap`: Mercator ↔ equal-area (Gall–Peters) world, t 0 → 1.
 * - `ScreenTag` (name + flag at a screen point, where `CountryTag` cannot anchor), `Compass`, `CurveArrow` + `onCurve`.
 * Geometry: world-atlas (Natural Earth 1:50m; 1:110m for the morphing world), like the rest of the kit.
 */
import { geoCircle, geoPath, geoProjection } from "d3-geo";
import type { FeatureCollection, Geometry, Position } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { AbsoluteFill, Easing } from "remotion";
import world50 from "world-atlas/countries-50m.json";
import world110 from "world-atlas/countries-110m.json";
import { CX, FONT, prog } from "../kit-common";
import { ATLAS, baseXY, Flag, type FlagKind, type GeoCam, MAP_Y } from "./toy-atlas";

type LL = [number, number];
const rad = Math.PI / 180;

const countries = (topo: unknown) => {
  const t = topo as Topology;
  return (feature(t, t.objects.countries) as FeatureCollection<Geometry, { name: string }>).features;
};
const C50 = countries(world50);
const C110 = countries(world110).filter((c) => c.properties.name !== "Antarctica");

/** Outer + inner rings of a Natural Earth 1:50m country (names as in world-atlas, e.g. "United Kingdom"). */
export const countryRings = (name: string): Position[][] => {
  const g = C50.find((c) => c.properties.name === name)?.geometry;
  if (!g) throw new Error(`No country ${name}`);
  return g.type === "Polygon" ? g.coordinates : g.type === "MultiPolygon" ? g.coordinates.flat() : [];
};

/** The African countries of world-atlas (to colour "Africa" as one block). */
export const AFRICA_COUNTRIES = ["Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Cabo Verde", "Central African Rep.",
  "Chad", "Comoros", "Congo", "Dem. Rep. Congo", "Côte d'Ivoire", "Djibouti", "Egypt", "Eq. Guinea", "Eritrea", "eSwatini", "Ethiopia", "Gabon",
  "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius",
  "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Principe", "Senegal", "Seychelles", "Sierra Leone",
  "Somalia", "Somaliland", "South Africa", "S. Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "W. Sahara", "Zambia", "Zimbabwe"];

/** Rigid move on the sphere taking `from` to `to`: shift of longitude, then a rotation along the meridian (north stays up there). */
export const moveOnSphere = (from: LL, to: LL) => {
  const t = (to[1] - from[1]) * rad;
  const [c, s] = [Math.cos(t), Math.sin(t)];
  return ([lo, la]: Position): LL => {
    const a = (lo - from[0]) * rad;
    const b = la * rad;
    const x = Math.cos(b) * Math.cos(a);
    const y = Math.cos(b) * Math.sin(a);
    const z = Math.sin(b);
    const [x2, z2] = [x * c - z * s, x * s + z * c];
    return [Math.atan2(y, x2) / rad + to[0], Math.asin(Math.max(-1, Math.min(1, z2))) / rad];
  };
};

/**
 * A country moved from pivot `from` to `to`, in base-projection space (the kit's Mercator at zoom 1).
 * `flat` 1: the shape as the map draws it at home, slid over (map size); 0: moved on the sphere, true size there.
 * Returns the SVG path and the projected area (base px², for "×N" counters: divide by the area at home).
 */
export const geoSticker = (rings: Position[][], from: LL, to: LL, flat: number) => {
  const mv = moveOnSphere(from, to);
  const [ax, ay] = baseXY(...from);
  const [bx, by] = baseXY(...to);
  let area = 0;
  const d = rings.map((r) => {
    const ps = r.map((p) => {
      const [hx, hy] = baseXY(p[0], p[1]);
      const [tx, ty] = baseXY(...mv(p));
      return [tx + (hx - ax + bx - tx) * flat, ty + (hy - ay + by - ty) * flat] as LL;
    });
    for (let i = 0; i < ps.length - 1; i++) area += ps[i][0] * ps[i + 1][1] - ps[i + 1][0] * ps[i][1];
    return ps.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`).join("") + "Z";
  }).join("");
  return { d, area: Math.abs(area) / 2 };
};

/** Map-space group under the camera (strokes inside should be divided by `cam.zoom`). */
export const MapLayer: React.FC<{ cam: GeoCam; o?: number; children: React.ReactNode }> = ({ cam, o = 1, children }) => {
  if (o <= 0) return null;
  const [cx, cy] = baseXY(cam.lon, cam.lat);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${CX - cx * cam.zoom}px ${MAP_Y - cy * cam.zoom}px`, scale: cam.zoom, transformOrigin: "0 0" }}>{children}</g>
    </svg>
  );
};

/** A country sticker on the map (path from `geoSticker`): drop shadow, fill, ink edge; `ghost`: translucent fill + white dashes. */
export const MapSticker: React.FC<{ cam: GeoCam; d: string; color: string; o: number; ghost?: boolean; lift?: number }> = ({
  cam, d, color, o, ghost, lift = 1,
}) => {
  const z = cam.zoom;
  return (
    <MapLayer cam={cam} o={o}>
      {ghost ? (
        <path d={d} fill={color} fillOpacity={0.62} fillRule="evenodd" stroke={ATLAS.white} strokeWidth={5 / z} strokeDasharray={`${14 / z} ${9 / z}`}
          strokeLinejoin="round" />
      ) : (
        <>
          <path d={d} fill="#000" fillOpacity={0.3 * lift} fillRule="evenodd" style={{ translate: `${(6 * lift) / z}px ${(10 * lift) / z}px` }} />
          <path d={d} fill={color} fillRule="evenodd" stroke={ATLAS.ink} strokeWidth={3.5 / z} strokeLinejoin="round" />
        </>
      )}
    </MapLayer>
  );
};

/** Graticule every 10° (parallels visibly spread towards the pole: that IS the Mercator stretch). */
export const Graticule: React.FC<{ cam: GeoCam; o: number }> = ({ cam, o }) => {
  const z = cam.zoom;
  const lats = Array.from({ length: 16 }, (_, i) => -70 + i * 10);
  const lons = Array.from({ length: 36 }, (_, i) => -180 + i * 10);
  const [x0] = baseXY(-180, 0);
  const [x1] = baseXY(180, 0);
  const [, yTop] = baseXY(0, 82);
  const [, yBot] = baseXY(0, -75);
  return (
    <MapLayer cam={cam} o={o}>
      <g stroke={ATLAS.white} strokeOpacity={0.5} strokeWidth={2.2 / z} fill="none">
        {lats.map((la) => { const [, y] = baseXY(0, la); return <path key={la} d={`M ${x0} ${y} H ${x1}`} />; })}
        {lons.map((lo) => { const [x] = baseXY(lo, 0); return <path key={lo} d={`M ${x} ${yTop} V ${yBot}`} />; })}
      </g>
    </MapLayer>
  );
};

/** Tissot circles: equal circles on the globe (radius `r`°) at `lats` × `lons`, drawn on the Mercator map. Row k pops in at `rows[k]`. */
export const Tissot: React.FC<{ cam: GeoCam; f: number; rows: number[]; o: number; lats?: number[]; lons?: number[]; r?: number }> = ({
  cam, f, rows, o, lats = [0, 25, 50, 70], lons = [-60, -30, 0, 30], r = 4.5,
}) => {
  const z = cam.zoom;
  return (
    <MapLayer cam={cam} o={o}>
      {lats.map((la, k) => lons.map((lo) => {
        const ring = geoCircle().center([lo, la]).radius(r).precision(4)().coordinates[0];
        const p = prog(f, rows[k], 10, Easing.out(Easing.back(1.6)));
        if (p <= 0) return null;
        const [cx, cy] = baseXY(lo, la);
        const d = ring.map((q, i) => { const [x, y] = baseXY(q[0], q[1]); return `${i ? "L" : "M"}${(cx + (x - cx) * p).toFixed(2)} ${(cy + (y - cy) * p).toFixed(2)}`; }).join("") + "Z";
        return <path key={`${lo},${la}`} d={d} fill={ATLAS.gold} fillOpacity={0.55} stroke={ATLAS.ink} strokeWidth={3 / z} />;
      }))}
    </MapLayer>
  );
};

/** Mercator ↔ equal-area (Gall–Peters, standard parallels 45°) morph; t 0 = the kit's Mercator, 1 = equal area. x = λ in both. */
export const morphProjection = (t: number) => {
  const raw = (l: number, p: number): [number, number] => {
    const pc = Math.max(-1.48, Math.min(1.48, p));
    return [l, (1 - t) * Math.log(Math.tan(Math.PI / 4 + pc / 2)) + t * 2 * Math.sin(pc)];
  };
  return geoProjection(raw).scale(1080 / (2 * Math.PI)).translate([0, 0]);
};

/**
 * The whole world (1:110m, no Antarctica) in the morphing projection, framed by the same camera as `Atlas`; it covers the
 * Atlas while shown. `fills`: story countries; `dots`: points to keep on the map (e.g. Hoàng Sa / Trường Sa in Vietnam's colour).
 */
export const MorphMap: React.FC<{
  cam: GeoCam; t: number; o: number; f: number; fills?: { name: string; color: string }[]; dots?: { pts: LL[]; color: string };
}> = ({ cam, t, o, f, fills = [], dots }) => {
  if (o <= 0) return null;
  const proj = morphProjection(t);
  const gp = geoPath(proj);
  const [cx, cy] = proj([cam.lon, cam.lat]) as LL;
  const z = cam.zoom;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="mm-sea" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor={ATLAS.ocean} />
            <stop offset="100%" stopColor={ATLAS.deep} />
          </radialGradient>
          <radialGradient id="mm-vig" cx="50%" cy="45%" r="72%">
            <stop offset="55%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor="#000" stopOpacity={0.5} />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#mm-sea)" />
        <g style={{ translate: `${CX - cx * z}px ${MAP_Y - cy * z}px`, scale: z, transformOrigin: "0 0" }}>
          <g fill="none" stroke={ATLAS.shallow} strokeOpacity={0.5 + 0.1 * Math.sin(f / 20)} strokeWidth={16 / z} strokeLinejoin="round">
            {C110.map((c) => <path key={c.properties.name} d={gp(c) ?? ""} />)}
          </g>
          {C110.map((c) => {
            const n = c.properties.name;
            const fill = fills.find((x) => x.name === n)?.color ?? ATLAS.land;
            return <path key={n} d={gp(c) ?? ""} fill={fill} stroke={ATLAS.ink} strokeOpacity={0.75} strokeWidth={1.6 / z} />;
          })}
          {dots?.pts.map((ll, i) => {
            const [x, y] = proj(ll) as LL;
            return <circle key={i} cx={x} cy={y} r={4 / z} fill={dots.color} />;
          })}
        </g>
        <rect width="100%" height="100%" fill="url(#mm-vig)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Name + flag at a screen point (for stickers and the globe, where `CountryTag` cannot anchor). */
export const ScreenTag: React.FC<{ x: number; y: number; label: string; flag?: FlagKind; o: number; f: number }> = ({ x, y, label, flag, o, f }) => {
  if (o <= 0) return null;
  const SIZE = 52;
  const tw = label.length * SIZE * 0.6;
  const w = (flag ? 72 : 0) + tw;
  const left = Math.min(940 - w, Math.max(60, x - w / 2));
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      {flag && <g style={{ translate: `${left}px ${y - 50}px` }}><Flag kind={flag} w={58} f={f} /></g>}
      <text x={left + (flag ? 72 : 0) + tw / 2} y={y + 18} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={SIZE} fill={ATLAS.white}
        stroke={ATLAS.ink} strokeWidth={9} strokeLinejoin="round" paintOrder="stroke" letterSpacing={1}>{label}</text>
    </svg>
  );
};

/** Toy compass (screen space), needle fixed on one heading (degrees, 0 = up). */
export const Compass: React.FC<{ x: number; y: number; k: number; o: number; heading: number }> = ({ x, y, k, o, heading }) => {
  if (o <= 0 || k <= 0) return null;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", opacity: o }}>
      <g style={{ translate: `${x}px ${y}px`, scale: k }}>
        <circle r={54} fill="#F7F2E8" stroke={ATLAS.ink} strokeWidth={7} />
        <circle r={42} fill="none" stroke="#C9A24A" strokeWidth={4} />
        <g style={{ rotate: `${heading}deg` }}>
          <path d="M 0 -38 L 10 0 L 0 38 L -10 0 Z" fill={ATLAS.red} stroke={ATLAS.ink} strokeWidth={3} />
          <path d="M 0 0 L 10 0 L 0 38 L -10 0 Z" fill="#9EA3A8" stroke={ATLAS.ink} strokeWidth={3} />
        </g>
        <circle r={6} fill={ATLAS.ink} />
      </g>
    </svg>
  );
};

/** Curved arrow between two screen points, drawn on with p (from p1-thuy-si-linh-thue). */
export const CurveArrow: React.FC<{ a: LL; b: LL; p: number; o: number; color: string; bend?: number; w?: number }> = ({
  a, b, p, o, color, bend = 0.25, w = 10,
}) => {
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
export const onCurve = (a: LL, b: LL, t: number, bend: number): LL => {
  const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const c: LL = [mx - dy * bend, my + dx * bend];
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
};
