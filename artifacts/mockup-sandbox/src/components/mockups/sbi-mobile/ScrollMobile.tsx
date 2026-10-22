import "./_group.css";
import { MobileScrollMotion } from "./_animated/MobileScrollMotion";
import { Hero } from "./_animated/Hero";
import { About, Choose, Services } from "./_animated/Sections";
import { Closing } from "./_animated/Closing";

const preview = (_label: string) => {};

export function ScrollMobile() {
  return (
    <main className="sbi-mobile-preview min-h-screen w-full bg-black text-white">
      <MobileScrollMotion>
        <Hero preview={preview} />
        <About />
        <Services />
        <Choose preview={preview} />
        <Closing preview={preview} />
      </MobileScrollMotion>
    </main>
  );
}
