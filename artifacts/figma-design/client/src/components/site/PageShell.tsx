import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import "./site.css";

const nav = [
  ["Start a chapter", "/chapter"],
  ["For businesses", "/business"],
  ["About", "/about"],
  ["Team", "/team"],
  ["Chapter manual", "/manual"],
  ["Apply", "/apply"],
] as const;

export function handleSiteNavigation(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function FormLink({ href, children, className = "sbi-button", testId }: { href: string; children: ReactNode; className?: string; testId: string }) {
  if (href.startsWith("/")) {
    return <Link className={className} href={href} onClick={handleSiteNavigation} data-testid={testId}>{children}</Link>;
  }
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer" data-testid={testId}>{children}<span className="sbi-sr-only"> (opens in a new tab)</span></a>;
}

export function PageShell({ title, description, current, children }: { title: string; description: string; current: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuToggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  useEffect(() => {
    const oldTitle = document.title;
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    const oldDescription = meta.content;
    meta.content = description;
    const socialMeta = [
      ["property", "og:title", `${title} | SBI Network`],
      ["property", "og:description", description],
      ["name", "twitter:title", `${title} | SBI Network`],
      ["name", "twitter:description", description],
    ] as const;
    const previous = socialMeta.map(([attribute, name, content]) => {
      const selector = `meta[${attribute}="${name}"]`;
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      const wasCreated = !tag;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      const oldContent = tag.content;
      tag.content = content;
      return { tag, oldContent, wasCreated };
    });
    return () => {
      document.title = oldTitle;
      if (meta) {
        if (created) meta.remove();
        else meta.content = oldDescription;
      }
      previous.forEach(({ tag, oldContent, wasCreated }) => {
        if (wasCreated) tag.remove();
        else tag.content = oldContent;
      });
    };
  }, [title, description]);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    });
    return () => cancelAnimationFrame(frame);
  }, [current]);

  return (
    <div className="sbi-site">
          <a className="sbi-skip-link" href="#main-content">Skip to main content</a>
      <header className="sbi-header">
        <div className="sbi-header-inner">
          <Link className="sbi-brand" href="/" onClick={handleSiteNavigation} aria-label="SBI Network home" data-testid="link-site-home">sbi</Link>
          <nav className="sbi-desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, path]) => <Link key={path} href={path} onClick={handleSiteNavigation} aria-current={current === path ? "page" : undefined} data-testid={`nav-${path.slice(1)}`}>{label}</Link>)}
          </nav>
          <Link className="sbi-nav-cta" href="/apply" onClick={handleSiteNavigation} data-testid="header-apply">Apply to start <span aria-hidden="true">→</span></Link>
          <button ref={menuToggle} className="sbi-menu-toggle" type="button" aria-expanded={open} aria-controls="sbi-mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)} data-testid="button-mobile-menu">
            <span>{open ? "Close menu" : "Menu"}</span>
          </button>
        </div>
        {open && <nav id="sbi-mobile-menu" className="sbi-mobile-nav" aria-label="Mobile navigation">
          {nav.map(([label, path]) => <Link key={path} href={path} aria-current={current === path ? "page" : undefined} onClick={(event) => { handleSiteNavigation(event); setOpen(false); }} data-testid={`mobile-nav-${path.slice(1)}`}>{label}</Link>)}
        </nav>}
      </header>
      <main className="sbi-main" id="main-content">{children}</main>
      <footer className="sbi-footer">
        <div className="sbi-footer-inner">
          <div>
            <Link href="/" onClick={handleSiteNavigation} className="sbi-footer-brand" aria-label="SBI Network home" data-testid="footer-site-home">sbi</Link>
            <p>Student-powered digital agency chapters connect student talent with local business needs. Availability and services vary by chapter.</p>
            <a className="sbi-contact-link" href={`mailto:${PUBLIC_CONTACT_EMAIL}`} data-testid="footer-email">{PUBLIC_CONTACT_EMAIL}</a>
          </div>
          <nav className="sbi-footer-nav" aria-label="Footer navigation">
            {nav.map(([label, path]) => <Link key={path} href={path} onClick={handleSiteNavigation} data-testid={`footer-${path.slice(1)}`}>{label}</Link>)}
          </nav>
        </div>
        <div className="sbi-footer-bottom">SBI Network · Availability varies by chapter.</div>
      </footer>
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="sbi-page-hero"><div className="sbi-hero-copy"><p className="sbi-eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p>{children && <div className="sbi-hero-actions">{children}</div>}</div></section>;
}

export function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="sbi-section-head">{eyebrow && <p className="sbi-eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

export function CtaPanel({ title, description, href, label, testId }: { title: string; description: string; href: string; label: string; testId: string }) {
  return <div className="sbi-cta-panel"><div><h2>{title}</h2><p>{description}</p></div><FormLink href={href} testId={testId}>{label}<span aria-hidden="true">↗</span></FormLink></div>;
}
