import { A, F, RotArrow, Star, type Preview } from "./shared";
import { motion } from "framer-motion";
import { useMobileFigmaValue } from "./MobileScrollMotion";

export function Hero({ preview }: { preview: Preview }) {
  const headline = { fontFamily: F.made, fontWeight: 300 } as const;
  const backgroundScale = useMobileFigmaValue("179:154", "scale", [1.04, 1.04, 1.02, 1.01, 1.01]);
  const line1Y = useMobileFigmaValue("179:166", "translate", [14, 14, 0, 0, -14, -14]);
  const line2Y = useMobileFigmaValue("179:167", "translate", [19, 19, 0, 0, -16, -16]);
  const line3X = useMobileFigmaValue("179:171", "translate", [16, 16, 0, 0, 10, 10]);
  const brandX = useMobileFigmaValue("179:155", "translate", [18, 18, 0, 0, 0, 0]);
  const socialY = useMobileFigmaValue("181:579", "translate", [10, 10, 0, 0, -12, -12]);
  const taglineY = useMobileFigmaValue("181:602", "translate", [18, 18, 0, 0, -16, -16]);
  const joinY = useMobileFigmaValue("181:284", "translate", [14, 14, 0, 0, -18, -18]);
  const joinArrowX = useMobileFigmaValue("181:284", "translate", [7, 7, 0, 0, 0, 0]);
  const hireY = useMobileFigmaValue("180:283", "translate", [12, 0, 0, -16, -16]);

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black text-white">
      <motion.div className="absolute inset-x-0 top-0 h-full" style={backgroundScale ? { scale: backgroundScale } : undefined}>
        <img alt="" className="h-full w-full object-cover" src={A("imgHero.png")} />
      </motion.div>

      <header className="absolute inset-x-0 top-6 z-20 flex items-center gap-3 px-4 sm:top-9 sm:px-6 lg:gap-[29px] lg:pl-[14.7vw] lg:pr-[4.9vw]">
        <nav
          className="flex h-[53px] min-w-0 flex-1 items-center justify-between rounded-[35px] bg-[rgba(255,255,255,0.3)] px-5 text-[16px] text-white backdrop-blur-[16.5px] lg:px-[25px]"
          style={{ fontFamily: F.made }}
        >
          <a href="#top" data-testid="link-logo" className="text-[32px] lowercase leading-none" style={{ fontFamily: F.mooxy }}>
            SBI
          </a>
          <a href="#top" data-testid="link-nav-home" className="hidden md:inline">Home</a>
          <a href="#services" data-testid="link-nav-explore" className="hidden sm:inline">Explore</a>
          <a href="#about" data-testid="link-nav-about">About Us</a>
          <a href="#community" data-testid="link-nav-community" className="hidden md:inline">Community</a>
        </nav>
        <button
          type="button"
          data-testid="button-start-chapter-header"
          onClick={() => preview("Start a chapter")}
          className="whitespace-nowrap text-[16px] text-white underline"
          style={{ fontFamily: F.made, fontWeight: 500 }}
        >
          Start a chapter
        </button>
      </header>

      <div className="relative z-10 px-5 pt-[clamp(130px,30vh,300px)] sm:px-[3.75vw]">
        <div className="relative">
          <motion.p
            className="whitespace-nowrap leading-[1.22] tracking-[-0.03em]"
            data-testid="text-hero-line-1"
            style={{ ...headline, fontSize: "clamp(48px,6.95vw,100px)", y: line1Y }}
          >
            STUDENT
          </motion.p>
          <motion.img
            alt=""
            src={A("imgSbi.svg")}
            className="pointer-events-none absolute right-0 -top-[54px] w-[52px] mix-blend-overlay sm:left-[50.5%] sm:right-auto sm:top-[1.8vw] sm:w-[10.8vw]"
            style={{ x: brandX }}
          />
          <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:items-start">
            <motion.div className="order-3 mt-6 sm:order-none sm:mt-0 sm:w-[19.9%] sm:shrink-0 sm:pt-[4.9vw]" style={{ y: socialY }}>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="mt-1 whitespace-nowrap text-[20px] leading-[1.22] tracking-[-0.03em]" style={{ fontFamily: F.made, fontWeight: 100 }}>
                20+ Businesses
              </p>
            </motion.div>
            <motion.p
              className="whitespace-nowrap leading-[1.22] tracking-[-0.03em]"
              data-testid="text-hero-line-2"
              style={{ ...headline, fontSize: "clamp(56px,8.9vw,128px)", y: line2Y }}
            >
              DIGITAL
            </motion.p>
            <motion.p
              className="whitespace-nowrap leading-[1.22] tracking-[-0.03em] sm:-mt-[0.5vw] sm:ml-auto sm:mr-[-2.7vw]"
              style={{ ...headline, fontSize: "clamp(56px,8.9vw,128px)", x: line3X }}
              data-testid="text-hero-line-3"
            >
              AGENCY
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-8 px-5 pb-8 pt-12 sm:px-[3.75vw] md:flex-row md:items-end md:justify-between">
        <motion.div style={{ y: taglineY }}>
          <p className="text-[18px] leading-[1.4] tracking-[-0.02em] sm:text-[16px] sm:leading-[1.22] sm:tracking-[-0.03em]" style={{ fontFamily: F.made, fontWeight: 300 }}>
            Student-led chapters provide no-cost digital support to nearby businesses. Availability varies by chapter.
          </p>
          <img alt="" src={`${import.meta.env.BASE_URL}figmaMotionAssets/imgLine15.svg`} className="mt-[10px] block w-[66px]" />
        </motion.div>
        <div className="flex flex-wrap items-center gap-[9px]">
          <motion.button
            type="button"
            data-testid="button-start-chapter"
            onClick={() => preview("Start a chapter")}
            className="flex h-[48px] w-[199px] sm:h-[44px] items-center justify-between rounded-[36px] border border-solid border-white pl-[19px] pr-[2px] text-[16px] tracking-[-0.03em]"
            style={{ fontFamily: F.made, fontWeight: 400, y: joinY }}
          >
            <span>Start a chapter</span>
            <span className="relative flex h-[38px] w-[38px] items-center justify-center">
              <img alt="" className="absolute inset-0 h-full w-full max-w-none" src={A("imgEllipse18.svg")} />
              <motion.span className="relative" style={{ x: joinArrowX }}>
                <RotArrow src={A("imgVector.svg")} w={13} h={10.2} inset="-5% -6.5%" />
              </motion.span>
            </span>
          </motion.button>
          <motion.button
            type="button"
            data-testid="button-request-services"
            onClick={() => preview("Request services")}
            className="flex h-[48px] w-[162px] sm:h-[44px] items-center justify-center rounded-[36px] bg-[rgba(20,112,203,0.88)] text-[16px] tracking-[-0.03em]"
            style={{ fontFamily: F.made, fontWeight: 400, y: hireY }}
          >
            Request services
          </motion.button>
        </div>
      </div>
    </section>
  );
}
