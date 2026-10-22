import { createContext, useContext, useRef, type ReactNode } from "react";
import { useMotionValue, useScroll, useTransform, type MotionValue } from "framer-motion";
import { TRACKS, type Tracks } from "./timeline";

const FIGMA_END = 89.288;
const MOBILE_INTRO_END = 12.641;
const MOBILE_INTRO_SCROLL = 0.03;
const MobileTimelineContext = createContext<MotionValue<number> | null>(null);

export function MobileScrollMotion({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, (scrollProgress) => {
    const p = Math.max(0, Math.min(1, scrollProgress));
    if (p <= MOBILE_INTRO_SCROLL) {
      return (p / MOBILE_INTRO_SCROLL) * MOBILE_INTRO_END;
    }
    return MOBILE_INTRO_END
      + ((p - MOBILE_INTRO_SCROLL) / (1 - MOBILE_INTRO_SCROLL)) * (FIGMA_END - MOBILE_INTRO_END);
  });

  return (
    <MobileTimelineContext.Provider value={progress}>
      <div ref={pageRef} className="relative min-h-[100dvh] w-full overflow-x-clip bg-black">
        {children}
      </div>
    </MobileTimelineContext.Provider>
  );
}

type TrackProperty = keyof Tracks;

function cubicBezierProgress(x: number, [x1, y1, x2, y2]: number[]) {
  const coordinate = (t: number, p1: number, p2: number) =>
    3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;

  let low = 0;
  let high = 1;
  for (let i = 0; i < 18; i += 1) {
    const middle = (low + high) / 2;
    if (coordinate(middle, x1, x2) < x) low = middle;
    else high = middle;
  }
  return coordinate((low + high) / 2, y1, y2);
}

function sampleMobileTrack(stops: NonNullable<Tracks[TrackProperty]>, output: number[], progress: number) {
  if (progress <= stops[0][0]) return output[0];

  for (let i = 0; i < stops.length - 1; i += 1) {
    const [start] = stops[i];
    const [end] = stops[i + 1];
    if (progress > end) continue;

    const linear = Math.max(0, Math.min(1, (progress - start) / (end - start)));
    const ease = stops[i][2];
    const t = ease ? cubicBezierProgress(linear, ease) : linear;
    return output[i] + (output[i + 1] - output[i]) * t;
  }

  return output[output.length - 1];
}

/**
 * Reuses the Figma track's keyframe times and cubic-bezier easing, while allowing
 * each responsive element to use smaller, phone-safe transform distances.
 */
export function useMobileFigmaValue(
  nodeId: string,
  property: TrackProperty,
  outputValues: number[],
) {
  const timeline = useContext(MobileTimelineContext);
  const idle = useMotionValue(FIGMA_END);
  const source = timeline ?? idle;
  const stops = TRACKS[nodeId]?.[property];

  if (!stops || stops.length !== outputValues.length) {
    throw new Error(`Mobile motion mapping does not match Figma track ${nodeId}.${property}`);
  }

  const value = useTransform(source, (progress) => sampleMobileTrack(stops, outputValues, progress));
  return timeline ? value : undefined;
}
