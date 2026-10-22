import { Link } from "wouter";
import { PageShell, handleSiteNavigation } from "@/components/site/PageShell";

export default function NotFound() {
  return (
    <PageShell current="" title="Page Not Found | SBI Network" description="The page you requested could not be found. Return to SBI Network or explore its chapter and business pages.">
      <section className="sbi-page-hero">
        <div className="sbi-hero-copy">
          <p className="sbi-eyebrow">404 · page not found</p>
          <h1>This page isn’t here.</h1>
          <p>That link may be outdated. Start at the home page or visit one of the current SBI Network pages.</p>
          <div className="sbi-hero-actions">
            <Link className="sbi-button" href="/" onClick={handleSiteNavigation} data-testid="not-found-home">SBI home</Link>
            <Link className="sbi-button sbi-button-outline" href="/business" onClick={handleSiteNavigation} data-testid="not-found-business">For businesses</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
