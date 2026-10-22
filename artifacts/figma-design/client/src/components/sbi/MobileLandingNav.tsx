import { useEffect, useState } from "react";
import { Link } from "wouter";
import { handleSmoothHashClick } from "@/lib/landingNavigation";
import "./MobileLandingNav.css";

const links = [
  { label: "Top", href: "#top", id: "top" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Chapters", href: "#community", id: "chapters" },
];

export function MobileLandingNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const footerTop = document.getElementById("footer")?.getBoundingClientRect().top;
        const footerVisible = footerTop !== undefined && footerTop < window.innerHeight;
        const finalActionTop = document.getElementById("final-action")?.getBoundingClientRect().top;
        const finalActionVisible = finalActionTop !== undefined && finalActionTop < window.innerHeight;
        const hasRoomToScroll = document.documentElement.scrollHeight > window.innerHeight * 1.4;
        const nextVisible =
          window.innerWidth < 1024 &&
          hasRoomToScroll &&
          window.scrollY > Math.min(window.innerHeight * 0.25, 220) &&
          !footerVisible &&
          !finalActionVisible;

        setVisible((current) => (current === nextVisible ? current : nextVisible));
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <nav className="sbi-mobile-landing-nav" aria-label="Landing page quick navigation" data-testid="mobile-landing-nav">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          onClick={handleSmoothHashClick}
          data-testid={`mobile-nav-${link.id}`}
        >
          {link.label}
        </a>
      ))}
      <Link
        href="/apply"
        onClick={() => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })}
        aria-label="Start a chapter application"
        data-testid="mobile-nav-start"
      >
        Start
      </Link>
    </nav>
  );
}
