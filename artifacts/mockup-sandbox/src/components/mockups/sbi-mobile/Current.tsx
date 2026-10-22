import "./_group.css";
import { Hero } from "./_shared/Hero";
import { About, Choose, Services } from "./_shared/Sections";
import { Closing } from "./_shared/Closing";

const preview = (_label: string) => {};

export function Current() {
  return (
    <main className="sbi-mobile-preview min-h-screen w-full bg-black text-white">
      <Hero preview={preview} />
      <About />
      <Services />
      <Choose preview={preview} />
      <Closing preview={preview} />
    </main>
  );
}
