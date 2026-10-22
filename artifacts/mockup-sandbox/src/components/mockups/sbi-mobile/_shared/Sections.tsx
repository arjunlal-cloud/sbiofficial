import { A, BLUE, F, RotArrow, type Preview } from "./shared";

export function About() {
  return (
    <section id="about" className="relative bg-black px-5 pb-[clamp(60px,9vw,130px)] pt-[clamp(70px,8.5vw,120px)] text-white sm:px-[3.75vw]">
      <div className="flex justify-between text-[20px] leading-[0.912] tracking-[-0.06em] text-[rgba(255,255,255,0.83)]" style={{ fontFamily: F.made, fontWeight: 300 }}>
        <span>What we do</span>
        <span>Initiatives</span>
      </div>
      <div className="mt-[clamp(40px,6.9vw,100px)] flex flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <h2
            className="relative leading-[1.08] tracking-[-0.05em] sm:leading-[0.912] sm:tracking-[-0.06em]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(40px,4.45vw,64px)" }}
          >
            We Help<br />Businesses Go<br />
            <span className="inline-block w-[0.85em]" />Digital
            <span className="absolute left-0 top-[2.05em]">
              <RotArrow src={A("imgVector1.svg")} w={40} h={32} inset="0 -3.43% -3.75% -3.43%" />
            </span>
          </h2>
        </div>
        <div className="md:w-[54%] md:pt-[2vw]">
          <p
            className="leading-[1.77] tracking-[0.04em]"
            style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(18px,1.67vw,24px)", textIndent: "5.5vw" }}
          >
            We are bridge the gap between student talent and the digital needs of local businesses.{" "}
            <span className="text-[rgba(255,255,255,0.86)]">By giving students opportunities to work on real projects.</span>
          </p>
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
  return (
    <section id="services" className="relative bg-black pb-[clamp(80px,15vw,220px)] text-white">
      <div className="relative flex h-[clamp(150px,18vw,260px)] items-center justify-center overflow-x-clip">
        {["imgVector22.svg", "imgVector23.svg"].map((s) => (
          <div key={s} className="absolute left-[-5%] top-0 h-full w-[112.2%]" aria-hidden="true">
            <div className="absolute" style={{ inset: "-6.35% -1.02%" }}>
              <img alt="" className="block h-full w-full max-w-none" src={A(s)} />
            </div>
          </div>
        ))}
        <div className="relative">
          <h2 className="whitespace-nowrap leading-[0.912] tracking-[-0.06em]" style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(40px,4.45vw,64px)" }}>
            Our Services
          </h2>
        </div>
      </div>
      <div className="mt-[clamp(30px,4.6vw,66px)] grid grid-cols-2 gap-x-4 gap-y-10 px-5 sm:px-[3.75vw] md:grid-cols-4 md:gap-x-[2.15vw]">
        {items.map((it, i) => (
          <div key={it.label}>
            <div className={it.down ? "pt-14 md:pt-[11.1vw]" : ""} data-testid={`card-service-${i}`}>
              {it.down && (
                <p
                  className="mb-4 ml-[19px] whitespace-normal leading-[1.2] md:whitespace-nowrap md:leading-[0.912] tracking-[-0.06em] md:mb-[2.4vw]"
                  style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(16px,1.95vw,28px)" }}
                >
                  <span className="lg:hidden">{it.mobileLabel}</span>
                  <span className="hidden lg:inline">{it.label}</span>
                </p>
              )}
              <div className="relative aspect-[312/450] w-full overflow-hidden rounded-[28px]">
                <img alt="" className={it.img} src={A(it.src)} />
              </div>
              {!it.down && (
                <p
                  className="mt-4 whitespace-normal leading-[1.2] md:whitespace-nowrap md:leading-[0.912] tracking-[-0.06em] md:mt-[2.4vw]"
                  style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(16px,1.95vw,28px)" }}
                >
                  <span className="lg:hidden">{it.mobileLabel}</span>
                  <span className="hidden lg:inline">{it.label}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({
  title, first, grey, cta, onCta, side, testid,
}: { title: string; first: string; grey: string; cta: string; onCta: () => void; side: 1 | -1; testid: string }) {
  return (
    <div className="flex">
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
          <RotArrow src={A("imgVector7.svg")} w={13} h={11} inset="0 -3.23% -3.85% -3.23%" />
          <span>{cta}</span>
        </button>
      </div>
    </div>
  );
}

export function Choose({ preview }: { preview: Preview }) {
  return (
    <section id="community" className="relative bg-black px-5 pb-[clamp(80px,12vw,183px)] text-white sm:px-[5.3vw]">
      <div>
        <h2
          className="mx-auto w-fit leading-[0.912] tracking-[-0.06em]"
          style={{ fontFamily: F.made, fontWeight: 400, fontSize: "clamp(36px,4.45vw,64px)" }}
        >
          <span className="block whitespace-nowrap">
            <span style={{ color: BLUE }}>Choose</span> what you
          </span>
          <span className="mt-[0.1em] flex items-center justify-between gap-[0.3em] whitespace-nowrap">
            <img alt="" src={A("imgLine14.svg")} className="block w-[2.48em] rotate-180" />
            <span>want to do</span>
          </span>
        </h2>
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
