import { A, BLUE, F, RotArrow, type Preview } from "./shared";
import { motion } from "framer-motion";
import { useMobileFigmaValue } from "./MobileScrollMotion";

export function About() {
  const labelsY = useMobileFigmaValue("179:182", "translate", [18, 18, 0, -12, -12]);
  const titleY = useMobileFigmaValue("179:184", "translate", [22, 22, 0, -18, -18]);
  const copyY = useMobileFigmaValue("179:189", "translate", [24, 24, 0, -16, -16]);
  const arrowX = useMobileFigmaValue("179:194", "translate", [0, 0, 0, 8, 16, 8, 0, 0]);

  return (
    <section id="about" className="relative bg-black px-5 pb-[clamp(60px,9vw,130px)] pt-[clamp(70px,8.5vw,120px)] text-white sm:px-[3.75vw]">
      <motion.div className="flex justify-between text-[20px] leading-[0.912] tracking-[-0.06em] text-[rgba(255,255,255,0.83)]" style={{ fontFamily: F.made, fontWeight: 300, y: labelsY }}>
        <span>What we do</span>
        <span>Initiatives</span>
      </motion.div>
      <div className="mt-[clamp(40px,6.9vw,100px)] flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <motion.h2
            className="relative leading-[1.08] tracking-[-0.05em] sm:leading-[0.912] sm:tracking-[-0.06em]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(40px,4.45vw,64px)", y: titleY }}
          >
            We Help<br />Businesses Go<br />
            <span className="inline-block w-[0.85em]" />Digital
            <motion.span className="absolute left-0 top-[2.05em]" style={{ x: arrowX }}>
              <RotArrow src={A("imgVector1.svg")} w={40} h={32} inset="0 -3.43% -3.75% -3.43%" />
            </motion.span>
          </motion.h2>
        </div>
        <div className="md:w-[54%] md:pt-[2vw]">
          <motion.p
            className="leading-[1.77] tracking-[0.04em]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(18px,1.67vw,24px)", textIndent: "5.5vw", y: copyY }}
          >
            We are bridge the gap between student talent and the digital needs of local businesses.{" "}
            <span className="text-[rgba(255,255,255,0.86)]">By giving students opportunities to work on real projects.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

const items = [
  { label: "Brand Identity", mobileLabel: "Website development", src: "imgRectangle53.png", img: "absolute inset-0 h-full w-full max-w-none object-cover", down: false, rotate: -12, x: 70 },
  { label: "Ecommerce-B2C", mobileLabel: "Promotional videos", src: "imgRectangle54.png", img: "absolute h-[110%] left-[-2.88%] max-w-none top-[-5%] w-[105.77%]", down: true, rotate: 9, x: 25 },
  { label: "Website Development", mobileLabel: "Google Business Profile help", src: "imgRectangle55.png", img: "absolute h-[213%] left-[-18.22%] max-w-none top-[-34%] w-[145.46%]", down: false, rotate: -8, x: -25 },
  { label: "Content Creation", mobileLabel: "Social media setup", src: "imgRectangle56.png", img: "absolute h-[106.73%] left-[-8%] max-w-none top-[-3.36%] w-[116%]", down: true, rotate: 12, x: -70 },
];

export function Services() {
  const titleY = useMobileFigmaValue("179:197", "translate", [18, 18, 0, -6, -20, -20]);
  const artworkY = useMobileFigmaValue("179:194", "translate", [0, 0, 0, 0, 8, 16, 0, 0]);

  return (
    <section id="services" className="relative bg-black pb-[clamp(80px,15vw,220px)] text-white">
      <div className="relative flex h-[clamp(150px,18vw,260px)] items-center justify-center overflow-x-clip">
        {["imgVector22.svg", "imgVector23.svg"].map((s) => (
          <motion.div key={s} className="absolute left-[-5%] top-0 h-full w-[112.2%]" aria-hidden="true" style={{ y: artworkY }}>
            <div className="absolute" style={{ inset: "-6.35% -1.02%" }}>
              <img alt="" className="block h-full w-full max-w-none" src={A(s)} />
            </div>
          </motion.div>
        ))}
        <div className="relative">
          <motion.h2 className="whitespace-nowrap leading-[0.912] tracking-[-0.06em]" style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(40px,4.45vw,64px)", y: titleY }}>
            Our Services
          </motion.h2>
        </div>
      </div>
      <div className="mt-[clamp(30px,4.6vw,66px)] grid grid-cols-2 gap-x-4 gap-y-10 px-5 sm:px-[3.75vw] md:grid-cols-4 md:gap-x-[2.15vw]">
        {items.map((item, i) => <ServiceCard key={item.label} item={item} index={i} />)}
      </div>
    </section>
  );
}

function ServiceCard({ item, index }: { item: (typeof items)[number]; index: number }) {
  const nodeIds = ["179:190", "179:192", "179:191", "179:193"] as const;
  const nodeId = nodeIds[index]!;
  const y = useMobileFigmaValue(nodeId, "translate", [28, 28, 16, 0, -12, -12]);
  const rotation = useMobileFigmaValue(nodeId, "rotate", [0, 0, item.rotate, item.rotate]);

  return (
    <div className="min-w-0">
      <motion.div className={item.down ? "pt-14 md:pt-[11.1vw]" : ""} style={{ y, rotate: rotation }} data-testid={`card-service-${index}`}>
        {item.down && (
          <p
            className="mb-4 ml-[19px] whitespace-normal leading-[1.2] tracking-[-0.06em] md:mb-[2.4vw] md:whitespace-nowrap md:leading-[0.912]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(16px,1.95vw,28px)" }}
          >
            <span className="lg:hidden">{item.mobileLabel}</span>
            <span className="hidden lg:inline">{item.label}</span>
          </p>
        )}
        <div className="relative aspect-[312/450] w-full overflow-hidden rounded-[28px]">
          <img alt="" className={item.img} src={A(item.src)} />
        </div>
        {!item.down && (
          <p
            className="mt-4 whitespace-normal leading-[1.2] tracking-[-0.06em] md:mt-[2.4vw] md:whitespace-nowrap md:leading-[0.912]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(16px,1.95vw,28px)" }}
          >
            <span className="lg:hidden">{item.mobileLabel}</span>
            <span className="hidden lg:inline">{item.label}</span>
          </p>
        )}
      </motion.div>
    </div>
  );
}

function Card({
  title, first, grey, cta, onCta, side, testid,
}: { title: string; first: string; grey: string; cta: string; onCta: () => void; side: 1 | -1; testid: string }) {
  const nodeId = side === 1 ? "179:210" : "179:211";
  const y = useMobileFigmaValue(nodeId, "translate", [26, 26, 26, 0, side === 1 ? -10 : 10, side === 1 ? -10 : 10]);
  const x = useMobileFigmaValue(nodeId, "translate", [0, 0, 0, 0, side * 10, side * 10]);
  const arrowX = useMobileFigmaValue(nodeId, "translate", [8, 8, 8, 0, 0, 0]);

  return (
    <motion.div className="flex" style={{ x, y }}>
      <div className="flex min-h-[294px] w-full flex-col rounded-[24px] bg-white p-[23px] pb-5" data-testid={testid}>
        <h3
          className="leading-[1.27] tracking-[-0.06em]"
          style={{ fontFamily: F.made, fontWeight: 400, color: BLUE, fontSize: "clamp(32px,3.33vw,48px)" }}
        >
          {title}
        </h3>
        <p
          className="mb-5 mt-3 leading-[1.45] sm:leading-[1.3] tracking-[-0.05em] text-black"
          style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(17px,1.67vw,24px)" }}
        >
          {first}
          <span className="text-[#868686]">{grey}</span>
        </p>
        <button
          type="button"
          data-testid={`button-${testid}`}
          onClick={onCta}
          className="mt-auto flex h-[46px] w-full max-w-[221px] sm:h-[29px] sm:w-[221px] items-center gap-[14px] rounded-[14.5px] pl-[11px] text-[14px] leading-[1.3] tracking-[-0.01em] text-white"
          style={{ fontFamily: F.made, fontWeight: 300, background: BLUE }}
        >
          <motion.span style={{ x: arrowX }}>
            <RotArrow src={A("imgVector7.svg")} w={13} h={11} inset="0 -3.23% -3.85% -3.23%" />
          </motion.span>
          <span>{cta}</span>
        </button>
      </div>
    </motion.div>
  );
}

export function Choose({ preview }: { preview: Preview }) {
  const headingY = useMobileFigmaValue("179:201", "translate", [24, 24, 24, 0, -10, -10]);
  const arrowX = useMobileFigmaValue("179:199", "translate", [0, 0, -18, -4, 0, 0]);
  const arrowScale = useMobileFigmaValue("179:199", "scale", [0.8, 0.8, 1, 1]);

  return (
    <section id="community" className="relative bg-black px-5 pb-[clamp(80px,12vw,183px)] text-white sm:px-[5.3vw]">
      <div>
        <motion.h2
          className="mx-auto w-fit leading-[0.912] tracking-[-0.06em]"
          style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(36px,4.45vw,64px)", y: headingY }}
        >
          <span className="block whitespace-nowrap">
            <span style={{ color: BLUE }}>Choose</span> what you
          </span>
          <span className="mt-[0.1em] flex items-center justify-between gap-[0.3em] whitespace-nowrap">
            <motion.img alt="" src={A("imgLine14.svg")} className="block w-[2.48em] rotate-180" style={{ x: arrowX, scale: arrowScale }} />
            <span>want to do</span>
          </span>
        </motion.h2>
      </div>
      <div className="mt-[clamp(50px,7.5vw,108px)] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-[4.8vw]">
        <Card
          side={1}
          testid="card-start-chapter"
          title="Start a chapter"
          first="Start with two high school students. SBI trains your team"
          grey=" before you work with a local business."
          cta="See how chapters start"
          onCta={() => preview("See how chapters start")}
        />
        <Card
          side={-1}
          testid="card-own-business"
          title="I own a business"
          first="Ask a nearby chapter for a website, Google Business Profile help, "
          grey="social media setup, or selected video work."
          cta="Request for digital help"
          onCta={() => preview("Request for digital help")}
        />
      </div>
    </section>
  );
}
