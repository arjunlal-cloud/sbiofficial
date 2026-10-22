import { useContext, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { SceneContext } from "./Layer";
import { SceneBody } from "./SceneBody";
import { F, type Preview } from "./shared";
import "./scene.css";

/** Authored frame: 1440 x 736. The timeline's last keyframe (headline settling) is at 89.288%. */
const FRAME_W = 1440;
const FRAME_H = 736;
const T_END = 89.288;
/** Longer runway makes each wheel/touch scroll move the timeline less without retiming Figma keyframes. */
const SCROLL_VH = 1350;
/** Percent-of-timeline anchors for nav links (screen y of each section's headline sits mid-viewport there). */
const ANCHORS: Record<string, number> = {
  top: 18,
  about: 33.1,
  "services-intro": 44,
  services: 60,
  community: 70.275,
  footer: T_END,
};

export function Scene({ preview }: { preview: Preview }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pct = useTransform(scrollYProgress, [0, 1], [0, T_END]);
  const extra = useMotionValue(0);
  const [dims, setDims] = useState({ s: 1, h: FRAME_H });

  useLayoutEffect(() => {
    const fit = () => {
      const s = window.innerWidth / FRAME_W;
      const h = window.innerHeight / s;
      extra.set(h - FRAME_H);
      setDims({ s, h });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [extra]);

  // All hero text, stars and CTAs have arrived by 18%. Keep that complete landing
  // state on entry; the authored opening remains reachable by scrolling upward.
  useLayoutEffect(() => {
    if (window.location.hash || window.scrollY > 0) return;
    const y = (ANCHORS.top / T_END) * SCROLL_VH * (window.innerHeight / 100);
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <SceneContext.Provider value={{ pct, extra }}>
      <section ref={ref} className="relative bg-black" style={{ height: `calc(${SCROLL_VH}vh + 100dvh)` }}>
        <div className="pointer-events-none absolute left-0 top-0 w-px" style={{ height: `${SCROLL_VH}vh` }} aria-hidden="true">
          {Object.entries(ANCHORS).map(([id, t]) => (
            <span key={id} id={id} className="absolute left-0 block h-px w-px" style={{ top: `${(t / T_END) * 100}%` }} />
          ))}
        </div>
        <div className="sticky top-0 h-[100dvh] overflow-hidden bg-black">
          <div
            className="relative"
            style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${dims.s})`, transformOrigin: "0 0" }}
            data-testid="scene-canvas"
            aria-label="Scroll-controlled SBI landing page"
          >
            <SceneBody preview={preview} />
          </div>
        </div>
        <CompactNav preview={preview} />
      </section>
    </SceneContext.Provider>
  );
}

/** The authored nav scrolls away at 21.9-26.4%; this keeps navigation and Signup/Login reachable afterwards. */
function CompactNav({ preview }: { preview: Preview }) {
  const c = useContext(SceneContext)!;
  const opacity = useTransform(c.pct, [24.5, 27.5], [0, 1]);
  const events = useTransform(c.pct, (v) => (v > 26 ? "auto" : "none"));
  const link = "px-3 py-1 hover:underline";
  return (
    <motion.nav
      aria-label="Primary"
      style={{ opacity, pointerEvents: events, fontFamily: F.made }}
      className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[min(92vw,720px)] items-center justify-between rounded-[35px] bg-[rgba(8,8,8,0.55)] px-5 py-2 text-[15px] text-white backdrop-blur-[16.5px]"
    >
      <a href="#top" data-testid="link-compact-logo" className="text-[26px] lowercase leading-none" style={{ fontFamily: F.mooxy }}>sbi</a>
      <div className="flex items-center">
        <a href="#services" data-testid="link-compact-explore" className={link}>Explore</a>
        <a href="#about" data-testid="link-compact-about" className={link}>About Us</a>
        <a href="#community" data-testid="link-compact-community" className={link}>Community</a>
        <button type="button" data-testid="button-compact-start-chapter" onClick={() => preview("Start a chapter")} className={`${link} font-medium underline`}>
          Start a chapter
        </button>
      </div>
    </motion.nav>
  );
}
