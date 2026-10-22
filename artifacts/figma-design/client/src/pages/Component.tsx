import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLocation } from "wouter";
import { PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import { Hero } from "@/components/sbi/Hero";
import { About, Services, Choose } from "@/components/sbi/Sections";
import { Closing } from "@/components/sbi/Closing";
import { Scene } from "@/components/sbi/Scene";
import { MobileScrollMotion } from "@/components/sbi/MobileScrollMotion";
import { MobileLandingNav } from "@/components/sbi/MobileLandingNav";
import { handleSmoothHashClick } from "@/lib/landingNavigation";

const DESKTOP = "(min-width: 1024px)";

function useDesktop() {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(DESKTOP).matches);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const fn = () => setOn(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return on;
}

export const Component = (): JSX.Element => {
  const [, setLocation] = useLocation();
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  // Desktop: scroll-scrubbed authored timeline. Phones and reduced-motion: the same content as a plain readable page.
  const scrubbed = desktop && !reduce;
  const mobileScrubbed = !desktop && !reduce;

  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    });
    return () => cancelAnimationFrame(frame);
  }, [scrubbed]);

  const preview = (label: string) => {
    const destinations: Record<string, string> = {
      "Signup/Login": "/apply",
      "Start a chapter": "/apply",
      "Join as a student": "/apply",
      "Hire a student": "/business#request",
      "Request services": "/business#request",
      "Business services": "/business#services",
      "Chapter coverage": "/business#coverage",
      "Chapter overview": "/chapter",
      "Chapter guide": "/manual",
      "About SBI": "/about",
      "About the network": "/about",
      "Network overview": "/about",
      "How projects work": "/business",
      "See how chapters start": "/chapter",
      "Request for digital help": "/business#request",
      "How to hire": "/business#request",
      "Project Catalog": "/business#services",
      "Hire an Agency": "/business#request",
      "How to find work": "/chapter",
      "Win work as a student": "/chapter",
      "Work with local businesses": "/business#coverage",
      "Work with local businessess": "/business#coverage",
      "Help & Support": "/manual#faq",
      Resources: "/manual",
      "Refer a Client": "/business#request",
      "About Us": "/about",
      Leadership: "/team",
      Impact: "/about#impact",
    };

    const path = destinations[label];
    if (path) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setLocation(path);
      return;
    }

    // Do not fabricate social profiles, app-store listings, reviews or programs.
    // Send unverified footer links to the published contact instead.
    const subject = encodeURIComponent(`SBI website question: ${label}`);
    window.location.href = `mailto:${PUBLIC_CONTACT_EMAIL}?subject=${subject}`;
  };

  return (
    <main className="min-h-[100dvh] w-full bg-black" onClick={handleSmoothHashClick}>
      {scrubbed ? (
        <Scene preview={preview} />
      ) : (
        <>
          {mobileScrubbed ? (
            <MobileScrollMotion>
              <Hero preview={preview} />
              <About />
              <Services />
              <Choose preview={preview} />
              <Closing preview={preview} />
            </MobileScrollMotion>
          ) : (
            <>
              <Hero preview={preview} />
              <About />
              <Services />
              <Choose preview={preview} />
              <Closing preview={preview} />
            </>
          )}
          {!desktop && <MobileLandingNav />}
        </>
      )}
    </main>
  );
};
