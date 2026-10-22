import { motion, useReducedMotion } from "framer-motion";
import { F, type Preview } from "./shared";

type FinalActionProps = {
  preview: Preview;
  variant: "desktop" | "mobile";
};

export function FinalAction({ preview, variant }: FinalActionProps) {
  const reduceMotion = useReducedMotion();

  const cards = (
    <>
      <button
        type="button"
        onClick={() => preview("Start a chapter")}
        data-testid="button-final-start-chapter"
        className="group rounded-2xl border border-white/25 bg-[#172129] p-4 text-left text-white transition-colors hover:bg-[#202d37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#85baff] sm:p-5"
      >
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#9bc8ff]">For students</span>
        <span className="mt-2 block text-lg font-semibold sm:text-xl">Start a chapter <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
        {variant === "mobile" && <span className="mt-1 block text-sm leading-5 text-white/75">Review the chapter information and apply.</span>}
      </button>
      <button
        type="button"
        onClick={() => preview("Request services")}
        data-testid="button-final-request-services"
        className="group rounded-2xl bg-[#1470cb] p-4 text-left text-white transition-colors hover:bg-[#2582df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:p-5"
      >
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/80">For businesses</span>
        <span className="mt-2 block text-lg font-semibold sm:text-xl">Request digital support <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span></span>
        {variant === "mobile" && <span className="mt-1 block text-sm leading-5 text-white/85">Tell SBI what your business needs.</span>}
      </button>
    </>
  );

  if (variant === "desktop") {
    return (
      <div
        id="final-action"
        role="group"
        aria-label="Choose your next step"
        data-testid="final-action"
        className="absolute left-[223px] top-[3767px] z-10 grid w-[760px] grid-cols-2 gap-3"
        style={{ fontFamily: F.instrument }}
      >
        {cards}
      </div>
    );
  }

  return (
    <motion.div
      id="final-action"
      role="group"
      aria-label="Choose your next step"
      data-testid="final-action"
      className="relative z-10 mx-5 my-7 grid gap-3 sm:mx-[10vw] sm:grid-cols-2"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      style={{ fontFamily: F.instrument }}
    >
      {cards}
    </motion.div>
  );
}
