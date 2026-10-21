/**
 * Toy Atlas — maps for ocean-crossing stories (Lucas 2026-10-20, episode p4-duong-bay-cong):
 * - `PacificAtlas`: the same toy Mercator look as `Atlas`, rotated so the map's middle is a chosen meridian
 *   (e.g. 160°E puts Vietnam on the left and California on the right of one Pacific).
 * - `ToyGlobe`: a toy globe (orthographic projection) with land, ocean, a soft shine and optional routes.
 * - `greatCircle` / `rhumbLine`: geographic point lists for the shortest route and the constant-compass route.
 * Geometry: world-atlas (Natural Earth 50m), like the rest of the kit.
 */
import { geoGraticule10, geoMercator, geoOrthographic, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, LineString } from "geojson";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { AbsoluteFill } from "remotion";
import world50 from "world-atlas/countries-50m.json";
import { CANVAS, CX } from "../kit-common";
import { ATLAS, MAP_Y } from "./toy-atlas";

type LL = [number, number];
const BASE = CANVAS.width / (2 * Math.PI);
const COUNTRIES = (() => {
  const t = world50 as unknown as Topology;
  return (feature(t, t.objects.countries) as FeatureCollection<Geometry, { name: string }>).features;
})();

/** Camera for a rotated Mercator: lon/lat of the screen centre (geographic), zoom like `GeoCam`. */
export type PacCam = { lon: number; lat: number; zoom: number };

const pacProj = (rot: number) => geoMercator().rotate([-rot, 0]).scale(BASE).translate([0, 0]);
const pathCache = new Map<number, { name: string; d: string }[]>();
const pacPaths = (rot: number) => {
  if (!pathCache.has(rot)) {
    const gp = geoPath(pacProj(rot)).digits(4);
    pathCache.set(rot, COUNTRIES.map((f) => ({ name: f.properties.name, d: gp(f) ?? "" })));
  }
  return pathCache.get(rot)!;
};

/** Screen position of a lon/lat on the rotated map. */
export const pacXY = (cam: PacCam, rot: number, lon: number, lat: number): [number, number] => {
  const p = pacProj(rot);
  const [x, y] = p([lon, lat]) as [number, number];
  const [cx, cy] = p([cam.lon, cam.lat]) as [number, number];
  return [CX + (x - cx) * cam.zoom, MAP_Y + (y - cy) * cam.zoom];
};

/** Rotated toy Mercator: ocean, coast halo, land (story countries in `fills`), outlines; `layer(z, proj)` for extra lines. */
export const PacificAtlas: React.FC<{
  cam: PacCam; rot: number; f?: number; fills?: { name: string; color: string }[]; o?: number;
  layer?: (z: number, xy: (lon: number, lat: number) => [number, number]) => React.ReactNode;
}> = ({ cam, rot, f = 0, fills = [], o = 1, layer }) => {
  const p = pacProj(rot);
  const [cx, cy] = p([cam.lon, cam.lat]) as [number, number];
  const z = cam.zoom;
  const paths = pacPaths(rot);
  const xy = (lon: number, lat: number) => p([lon, lat]) as [number, number];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <svg width={CANVAS.width} height={CANVAS.height} style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="pa-sea" cx="50%" cy="42%" r="70%">
            <stop offset="0%" stopColor={ATLAS.ocean} />
            <stop offset="100%" stopColor={ATLAS.deep} />
          </radialGradient>
          <filter id="pa-relief" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency={0.014 * z} numOctaves={4} seed={3} result="n" />
            <feDiffuseLighting in="n" surfaceScale={1.7} lightingColor="#ffffff" result="lit">
              <feDistantLight azimuth={315} elevation={48} />
            </feDiffuseLighting>
            <feComponentTransfer in="lit" result="soft">
              <feFuncR type="linear" slope={0.26} intercept={0.78} />
              <feFuncG type="linear" slope={0.26} intercept={0.78} />
              <feFuncB type="linear" slope={0.26} intercept={0.78} />
            </feComponentTransfer>
            <feComposite in="soft" in2="SourceGraphic" operator="in" result="litLand" />
            <feBlend in="SourceGraphic" in2="litLand" mode="multiply" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#pa-sea)" />
        <g style={{ translate: `${CX - cx * z}px ${MAP_Y - cy * z}px`, scale: z, transformOrigin: "0 0" }}>
          <g fill="none" stroke={ATLAS.shallow} strokeOpacity={0.5 + 0.1 * Math.sin(f / 20)} strokeWidth={22 / z} strokeLinejoin="round">
            {paths.map((c, i) => <path key={i} d={c.d} />)}
          </g>
          <g filter="url(#pa-relief)">
            {paths.map((c, i) => <path key={i} d={c.d} fill={fills.find((x) => x.name === c.name)?.color ?? ATLAS.land} />)}
          </g>
          <g fill="none" stroke={ATLAS.ink} strokeOpacity={0.75} strokeWidth={1.6 / z}>
            {paths.map((c, i) => <path key={i} d={c.d} />)}
          </g>
          {layer?.(z, xy)}
        </g>
        <radialGradient id="pa-vig" cx="50%" cy="45%" r="72%">
          <stop offset="55%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.5} />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#pa-vig)" />
      </svg>
    </AbsoluteFill>
  );
};

export type GlobeRoute = { pts: LL[]; color: string; p?: number; w?: number; dash?: string; o?: number };

/**
 * Toy globe centred on (x, y), radius r, facing `view` (lon, lat). Routes are drawn on the sphere
 * (hidden side clipped); `p` draws each route on (0–1).
 */
export const ToyGlobe: React.FC<{ x: number; y: number; r: number; view: LL; f?: number; o?: number; routes?: GlobeRoute[]; fills?: { name: string; color: string }[] }> = ({
  x, y, r, view, f = 0, o = 1, routes = [], fills = [],
}) => {
  if (o <= 0 || r <= 0) return null;
  const proj = geoOrthographic().rotate([-view[0], -view[1]]).scale(r).translate([x, y]).clipAngle(90);
  const gp = geoPath(proj);
  const grat = gp(geoGraticule10()) ?? "";
  return (
    <svg width={CANVAS.width} height={CANVAS.height} style={{ position: "absolute", opacity: o }}>
      <defs>
        <radialGradient id="tg-sea" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#6FA3C9" />
          <stop offset="100%" stopColor={ATLAS.deep} />
        </radialGradient>
        <radialGradient id="tg-shine" cx="34%" cy="28%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y + r * 1.06} rx={r * 0.8} ry={r * 0.12} fill="rgba(0,0,0,0.25)" />
      <circle cx={x} cy={y} r={r} fill="url(#tg-sea)" />
      <path d={grat} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1.5} />
      {COUNTRIES.map((c, i) => {
        const d = gp(c);
        return d ? <path key={i} d={d} fill={fills.find((z) => z.name === c.properties.name)?.color ?? ATLAS.land} stroke={ATLAS.ink} strokeOpacity={0.6} strokeWidth={1} /> : null;
      })}
      {routes.map((rt, i) => {
        const n = Math.max(2, Math.round(rt.pts.length * (rt.p ?? 1)));
        const line: Feature<LineString> = { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: rt.pts.slice(0, n) } };
        const d = gp(line);
        return d ? (
          <g key={i} opacity={rt.o ?? 1}>
            <path d={d} fill="none" stroke={ATLAS.ink} strokeWidth={(rt.w ?? 8) + 6} strokeLinecap="round" />
            <path d={d} fill="none" stroke={rt.color} strokeWidth={rt.w ?? 8} strokeLinecap="round" strokeDasharray={rt.dash} />
          </g>
        ) : null;
      })}
      <circle cx={x} cy={y} r={r} fill="url(#tg-shine)" />
      <circle cx={x} cy={y} r={r} fill="none" stroke={ATLAS.ink} strokeWidth={6} />
      {/* toy stand: a small arc below the globe */}
      <path d={`M ${x - r * 0.5} ${y + r * 1.02} Q ${x} ${y + r * 1.12} ${x + r * 0.5} ${y + r * 1.02}`} fill="none" stroke="#8C6A3F" strokeWidth={10} strokeLinecap="round"
        opacity={0.9 + 0.1 * Math.sin(f / 20)} />
    </svg>
  );
};

/** Shortest route (great circle) from a to b as n+1 geographic points. */
export const greatCircle = (a: LL, b: LL, n = 64): LL[] => {
  const rad = Math.PI / 180;
  const [l1, p1] = [a[0] * rad, a[1] * rad];
  const [l2, p2] = [b[0] * rad, b[1] * rad];
  const d = 2 * Math.asin(Math.sqrt(Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin((l2 - l1) / 2) ** 2));
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(p1) * Math.cos(l1) + B * Math.cos(p2) * Math.cos(l2);
    const y = A * Math.cos(p1) * Math.sin(l1) + B * Math.cos(p2) * Math.sin(l2);
    const z = A * Math.sin(p1) + B * Math.sin(p2);
    return [Math.atan2(y, x) / rad, Math.atan2(z, Math.hypot(x, y)) / rad] as LL;
  });
};

/** Constant-compass route (rhumb line / loxodrome) from a to b eastward; `b` lon may exceed 180 (e.g. −122 + 360). */
export const rhumbLine = (a: LL, b: LL, n = 64): LL[] => {
  const rad = Math.PI / 180;
  const my = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * rad) / 2));
  const y1 = my(a[1]);
  const y2 = my(b[1]);
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const lon = a[0] + (b[0] - a[0]) * t;
    const lat = (2 * Math.atan(Math.exp(y1 + (y2 - y1) * t)) - Math.PI / 2) / rad;
    return [lon > 180 ? lon - 360 : lon, lat] as LL;
  });
};
