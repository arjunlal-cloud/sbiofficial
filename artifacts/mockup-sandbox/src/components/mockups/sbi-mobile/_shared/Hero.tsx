import { A, F, RotArrow, Star, type Preview } from "./shared";

export function Hero({ preview }: { preview: Preview }) {
  const headline = { fontFamily: F.made, fontWeight: 300 } as const;

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-black text-white">
      <div className="absolute inset-x-0 top-0 h-full">
        <img alt="" className="h-full w-full object-cover" src={A("imgHero.png")} />
      </div>

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
          data-testid="button-signup-login"
          onClick={() => preview("Signup/Login")}
          className="whitespace-nowrap text-[16px] text-white underline"
          style={{ fontFamily: F.made, fontWeight: 500 }}
        >
          Signup/Login
        </button>
      </header>

      <div className="relative z-10 px-5 pt-[clamp(130px,30vh,300px)] sm:px-[3.75vw]">
        <div className="relative">
          <p
            className="whitespace-nowrap leading-[1.22] tracking-[-0.03em]"
            style={{ ...headline, fontSize: "clamp(48px,6.95vw,100px)" }}
            data-testid="text-hero-line-1"
          >
            AI POWERED
          </p>
          <img
            alt=""
            src={A("imgSbi.svg")}
            className="pointer-events-none absolute right-0 -top-[54px] w-[52px] mix-blend-overlay sm:left-[50.5%] sm:right-auto sm:top-[1.8vw] sm:w-[10.8vw]"
          />
          <div className="flex flex-col sm:flex-row sm:flex-nowrap sm:items-start">
            <div className="order-3 mt-6 sm:order-none sm:mt-0 sm:w-[19.9%] sm:shrink-0 sm:pt-[4.9vw]">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="mt-1 whitespace-nowrap text-[20px] leading-[1.22] tracking-[-0.03em]" style={{ fontFamily: F.made, fontWeight: 100 }}>
                20+ Businesses
              </p>
            </div>
            <p
              className="whitespace-nowrap leading-[1.22] tracking-[-0.03em]"
              style={{ ...headline, fontSize: "clamp(56px,8.9vw,128px)" }}
              data-testid="text-hero-line-2"
            >
              DIGITAL
            </p>
            <p
              className="whitespace-nowrap leading-[1.22] tracking-[-0.03em] sm:-mt-[0.5vw] sm:ml-auto sm:mr-[-2.7vw]"
              style={{ ...headline, fontSize: "clamp(56px,8.9vw,128px)" }}
              data-testid="text-hero-line-3"
            >
              AGENCY
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex flex-col gap-8 px-5 pb-8 pt-12 sm:px-[3.75vw] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[18px] leading-[1.4] tracking-[-0.02em] sm:text-[16px] sm:leading-[1.22] sm:tracking-[-0.03em]" style={{ fontFamily: F.made, fontWeight: 300 }}>
            Student turns ideas<br />into brands<br />people choose
          </p>
          <img alt="" src={`${import.meta.env.BASE_URL}figmaMotionAssets/imgLine15.svg`} className="mt-[10px] block w-[66px]" />
        </div>
        <div className="flex flex-wrap items-center gap-[9px]">
          <button
            type="button"
            data-testid="button-join-student"
            onClick={() => preview("Join as a student")}
            className="flex h-[48px] w-[199px] sm:h-[44px] items-center justify-between rounded-[36px] border border-solid border-white pl-[19px] pr-[2px] text-[16px] tracking-[-0.03em]"
            style={{ fontFamily: F.made, fontWeight: 400 }}
          >
            <span>Join as a student</span>
            <span className="relative flex h-[38px] w-[38px] items-center justify-center">
              <img alt="" className="absolute inset-0 h-full w-full max-w-none" src={A("imgEllipse18.svg")} />
              <span className="relative">
                <RotArrow src={A("imgVector.svg")} w={13} h={10.2} inset="-5% -6.5%" />
              </span>
            </span>
          </button>
          <button
            type="button"
            data-testid="button-hire-student"
            onClick={() => preview("Hire a student")}
            className="flex h-[48px] w-[162px] sm:h-[44px] items-center justify-center rounded-[36px] bg-[rgba(20,112,203,0.88)] text-[16px] tracking-[-0.03em]"
            style={{ fontFamily: F.made, fontWeight: 400 }}
          >
            Hire a student
          </button>
        </div>
      </div>
    </section>
  );
}
