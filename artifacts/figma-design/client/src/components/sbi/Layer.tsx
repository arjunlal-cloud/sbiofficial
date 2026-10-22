import { createContext, useContext, type ReactNode } from "react";
import { cubicBezier, motion, useTransform, type MotionValue } from "framer-motion";
import { TRACKS, type Stop } from "./timeline";

/** The scroll playhead: `pct` is the position (0-100) on the authored 30.341003s timeline. */
type SceneCtx = { pct: MotionValue<number>; extra: MotionValue<number> };
export const SceneContext = createContext<SceneCtx | null>(null);

const easings = new Map<string, (t: number) => number>();
function ease(e: number[]) {
  const key = e.join(",");
  let fn = easings.get(key);
  if (!fn) {
    fn = cubicBezier(e[0], e[1], e[2], e[3]);
    easings.set(key, fn);
  }
  return fn;
}

/** Piecewise keyframe sampling: each stop's cubic-bezier eases the segment that STARTS at that stop (CSS semantics). */
export function sample(stops: Stop[], pct: number): number[] {
  if (pct <= stops[0][0]) return stops[0][1];
  const last = stops[stops.length - 1];
  if (pct >= last[0]) return last[1];
  let i = 0;
  while (i < stops.length - 2 && pct >= stops[i + 1][0]) i++;
  const [p0, v0, e] = stops[i];
  const [p1, v1] = stops[i + 1];
  let k = (pct - p0) / (p1 - p0);
  if (e) k = ease(e)(k);
  return v0.map((a, j) => a + (v1[j] - a) * k);
}

/**
 * Closing layers end at the bottom edge of the authored 736px frame. On taller or shorter viewports the
 * canvas height differs, so they travel `extra` px further in proportion to their own journey.
 */
const INTRO = new Set(["181:284", "181:285", "180:283"]);

function transformAt(id: string, pct: number, extra: number, fill: boolean) {
  const tr = TRACKS[id];
  let [x, y] = tr.translate ? sample(tr.translate, pct) : [0, 0];
  if (fill && tr.translate) {
    const finalY = tr.translate[tr.translate.length - 1][1][1];
    if (finalY) y += extra * (y / finalY);
  }
  // Wipes must cover the real viewport, not leave a 736px-high strip. A taller
  // hero also needs enough exit travel to clear its entire background.
  if (INTRO.has(id)) y *= (736 + extra) / 736;
  if (id === "179:154") y *= Math.max(1, (736 + extra + 26) / 996);
  let t = `translate(${x}px, ${y}px)`;
  if (tr.rotate) t += ` rotate(${sample(tr.rotate, pct)[0]}rad)`;
  if (tr.scale) {
    const [sx, sy] = sample(tr.scale, pct);
    t += ` scale(${sx}, ${sy ?? sx})`;
  }
  return t;
}

const FILL = new Set(["179:215", "179:216"]);
const ABOUT = new Set(["179:182", "179:183", "179:184", "179:189"]);
const TAGS = { div: motion.div, p: motion.p, button: motion.button } as const;

export function Layer({
  as = "div",
  "data-node-id": id,
  style,
  children,
  ...rest
}: {
  as?: keyof typeof TAGS;
  "data-node-id": string;
  style?: React.CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("Layer must render inside a scene");
  const fill = FILL.has(id);
  const transform = useTransform([ctx.pct, ctx.extra], ([p, e]: number[]) => transformAt(id, p, e, fill));
  // An extra-tall window must not expose the next chapter over the opening hero.
  const opacity = useTransform([ctx.pct, ctx.extra], ([pct, extra]: number[]) =>
    extra > 0 && pct < 21.855 && ABOUT.has(id) ? 0 : 1,
  );
  const responsiveHeight = id === "179:154" || id === "179:214" || INTRO.has(id);
  const height = useTransform(ctx.extra, (extra) => {
    if (id === "179:154") return Math.max(1075, 841 + extra);
    if (id === "179:214") return Math.max(1, 776 + extra);
    return Math.max(1, 736 + extra);
  });
  const Tag = TAGS[as] as typeof motion.div;
  return (
    <Tag {...(rest as object)} data-node-id={id} style={{ ...style, ...(responsiveHeight ? { height } : {}), transform, opacity }}>
      {children}
    </Tag>
  );
}
