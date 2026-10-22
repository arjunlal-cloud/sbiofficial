import type { ReactNode } from "react";
import { FigmaFooterEffect } from "@/components/FigmaFooterEffect";
import { PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import { A, F, type Preview } from "./shared";
import { motion } from "framer-motion";
import { useMobileFigmaValue } from "./MobileScrollMotion";
import { FinalAction } from "./FinalAction";

const columns: { head: string; links: string[] }[] = [
  { head: "For businesses", links: ["Request services", "Business services", "Chapter coverage"] },
  { head: "For students", links: ["Start a chapter", "Chapter overview", "Chapter guide"] },
  { head: "SBI Network", links: ["About SBI", "Chapter manual", "Contact SBI"] },
  { head: "Contact", links: ["Email SBI"] },
];

function Icon({ label, preview, children, w = 20, h = 20 }: { label: string; preview: Preview; children: ReactNode; w?: number; h?: number }) {
  return (
    <button type="button" aria-label={label} data-testid={`button-${label.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => preview(label)} className="relative block shrink-0" style={{ width: w, height: h }}>
      {children}
    </button>
  );
}

const full = "absolute block inset-0 h-full w-full max-w-none";

export function Closing({ preview }: { preview: Preview }) {
  const f = { fontFamily: F.instrument, fontVariationSettings: '"wdth" 100' } as const;
  const backgroundScale = useMobileFigmaValue("179:214", "translate", [1, 1, 1.015, 1.025, 1.025, 1.035, 1.035]);
  const headingY = useMobileFigmaValue("179:215", "translate", [22, 22, 22, 22, 0, -10, -10]);
  const footerY = useMobileFigmaValue("179:216", "translate", [24, 24, 18, 8, 0, 0, 0]);

  return (
    <section className="relative flex flex-col bg-black pt-[8vw] text-white">
      <motion.div className="absolute inset-0" style={{ scale: backgroundScale }}>
        <FigmaFooterEffect className="absolute inset-0" />
      </motion.div>
      <div className="relative z-10">
        <motion.h2
          className="ml-5 max-w-[calc(100vw-2.5rem)] leading-[1.08] sm:ml-[10vw] sm:max-w-[80vw]"
          style={{ fontFamily: F.origin, fontWeight: 500, fontSize: "clamp(44px,8.9vw,128px)", textShadow: "4px 4px 10.3px rgba(0,0,0,0.23)", y: headingY }}
          data-testid="text-closing"
        >
          Your next step starts here
        </motion.h2>
      </div>
      <FinalAction preview={preview} variant="mobile" />
      <motion.div className="relative z-10 mx-4 mt-[1vw] sm:ml-[9.17vw] sm:mr-0" style={{ y: footerY }}>
        <footer id="footer" className="rounded-[23px] bg-[#666] pb-[58px] pt-[37px]" data-testid="footer">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-6 lg:grid-cols-[329fr_323fr_331fr_120fr] lg:px-[7.7%]" style={f}>
            {columns.map((c) => (
              <div key={c.head}>
                <p className="p-[10px] pl-0 text-[16px] font-medium leading-[1.21] text-[#a9a8a8]">{c.head}</p>
                <ul className="mt-[29px] flex flex-col gap-[14.8px]">
                  {c.links.map((l) => (
                    <li key={l}>
                      {l === "About Us" ? (
                        <a href="#about" className="inline-block py-1.5 text-[16px] font-normal leading-[1.21] text-white hover:underline lg:inline lg:whitespace-nowrap lg:py-0" data-testid="link-footer-about">{l}</a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => preview(l)}
                          data-testid={`link-footer-${l.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                          className="py-1.5 text-left text-[16px] font-normal leading-[1.21] text-white hover:underline lg:whitespace-nowrap lg:py-0"
                        >
                          {l}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-[16px] leading-[1.21] text-[#acacac]" style={f}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-[19px]">
                <span className="whitespace-nowrap">Follow us on</span>
                <div className="flex items-center gap-5 sm:gap-[53px]">
                  <Icon label="Social link one" preview={preview} w={18} h={18}>
                    <img alt="" className={full} src={A("imgDribbbleLightPreview.svg")} />
                  </Icon>
                  <Icon label="Social link two" preview={preview} w={18} h={18}>
                    <span className="absolute block" style={{ inset: "15% 0" }}>
                      <img alt="" className={full} src={A("imgYoutube168.svg")} />
                    </span>
                  </Icon>
                  <Icon label="Social link three" preview={preview} w={17} h={18}>
                    {[
                      ["imgVector3.svg", "8.33% 29.91% 78.61% 61.37%"],
                      ["imgVector4.svg", "38.92% 57.59% 27.7% 22.65%"],
                      ["imgVector5.svg", "27.82% 14.89% 8.33% 19.58%"],
                      ["imgVector6.svg", "8.33% 19.06% 11.97% 12.5%"],
                    ].map(([s, inset]) => (
                      <span key={s} className="absolute block" style={{ inset }}>
                        <img alt="" className={full} src={A(s)} />
                      </span>
                    ))}
                  </Icon>
                  <Icon label="Social link four" preview={preview} w={17.84} h={19.5}>
                    <img alt="" className={full} src={A("imgSvgRepoIconCarrier.svg")} />
                  </Icon>
                </div>
              </div>
              <div className="flex items-center gap-x-5 sm:gap-x-[47px]">
                <span className="whitespace-nowrap">Mobile App</span>
                <div className="flex items-center gap-5 sm:gap-7">
                  <Icon label="Mobile app store one" preview={preview}>
                    <span className="absolute block" style={{ inset: "0 7.5%" }}>
                      <img alt="" className={full} src={A("imgIcons.svg")} />
                    </span>
                  </Icon>
                  <Icon label="Mobile app store two" preview={preview}>
                    <span className="absolute block" style={{ inset: "0.1% 7.19%" }}>
                      <img alt="" className={full} src={A("imgB75708D097F2188Dff6617B0F00F7C43.svg")} />
                    </span>
                  </Icon>
                </div>
              </div>
            </div>
            <img alt="" className="mt-[17px] block h-auto w-full max-w-none" src={A("imgLine9.svg")} />
          </div>
          <div className="mx-6 mt-[58px] sm:mx-[4.4%]">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-[16px] leading-[1.21] text-[#acacac]" style={f}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="whitespace-nowrap">Email SBI:</span>
                <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} className="text-white underline-offset-4 hover:underline">
                  {PUBLIC_CONTACT_EMAIL}
                </a>
              </div>
              <a href="#top" className="text-white underline-offset-4 hover:underline">Back to top ↑</a>
            </div>
            <img alt="" className="mt-[17px] block h-auto w-full max-w-none" src={A("imgLine9.svg")} />
          </div>
        </footer>
      </motion.div>
    </section>
  );
}
