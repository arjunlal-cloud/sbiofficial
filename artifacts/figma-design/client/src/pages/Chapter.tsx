import { APPLICATION_LINKS, PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import { CtaPanel, FormLink, PageHero, PageShell, SectionTitle, handleSiteNavigation } from "@/components/site/PageShell";
import { Link } from "wouter";

export default function Chapter() {
  return (
    <PageShell current="/chapter" title="How to Start an SBI Network Chapter | Student Guide" description="See how high-school students can start an SBI chapter, work with nearby businesses, get trained before a first client project, receive central-team support and apply.">
      <PageHero eyebrow="For student founders" title="Start a chapter. Build with your community." description="Bring student talent and local business needs together through an SBI Network chapter. No coding experience is required, and training takes place before the first client project.">
        <FormLink href={APPLICATION_LINKS.chapter} testId="chapter-apply-hero">Open the chapter application <span aria-hidden="true">→</span></FormLink>
        <Link className="sbi-button sbi-button-outline" href="/manual" onClick={handleSiteNavigation} data-testid="chapter-manual-hero">Read the quick guide</Link>
      </PageHero>

      <section className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="A local student team" title="What chapter leaders do">Chapter leaders bring together students who want to learn by doing. They help connect local businesses with student digital work, while the central team provides support around the projects.</SectionTitle>
        <div className="sbi-grid-3">
          {[
            ["01", "Bring students together", "Start with two high-school students. Coding experience is not a prerequisite."],
            ["02", "Learn before the work", "SBI training comes before a chapter takes on its first client project."],
            ["03", "Work with support", "The central student team approves chapters, supports project work and reviews work before handoff."],
          ].map(([number, title, body]) => <article className="sbi-card" key={number}><span className="sbi-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </div></section>

      <section className="sbi-section sbi-band"><div className="sbi-content sbi-split">
        <div><SectionTitle eyebrow="Getting started" title="A clear first step">Use the chapter application on this site to share your interest. SBI reviews applications and confirms next steps directly.</SectionTitle>
          <ol className="sbi-rich-list">
            <li>Open the chapter application and share your interest.</li>
            <li>Chapter approval and training are handled with central-team support.</li>
            <li>Training happens before your first client project.</li>
          </ol>
        </div>
        <div className="sbi-photo sbi-photo-tint"><img src={`${import.meta.env.BASE_URL}figmaMotionAssets/imgRectangle53.png`} alt="" /></div>
      </div></section>

      <section className="sbi-section"><div className="sbi-content">
        <div className="sbi-grid-2">
          <article className="sbi-card"><span className="sbi-number">TRAINING</span><h3>Start with guidance</h3><p>Students do not need coding experience to begin. SBI training is provided before a chapter's first client project.</p></article>
          <article className="sbi-card"><span className="sbi-number">PROJECT SUPPORT</span><h3>Support through handoff</h3><p>The central student team supports chapters during projects and reviews work before it is handed to a business.</p></article>
        </div>
      </div></section>

      <section className="sbi-section sbi-band"><div className="sbi-content">
        <SectionTitle eyebrow="Before a project begins" title="Set up the work with care">The temporary chapter guide recommends confirming the service, location, scope, and review process before a chapter commits to a business project.</SectionTitle>
        <div className="sbi-grid-3">
          <article className="sbi-card"><span className="sbi-number">01 / SERVICE</span><h3>Check the fit</h3><p>Confirm the requested service is one the chapter is prepared and approved to offer. The public site does not list services by chapter yet.</p></article>
          <article className="sbi-card"><span className="sbi-number">02 / SCOPE</span><h3>Agree on the work</h3><p>Clarify the expected deliverable, who is doing each part, and how the business will review the work.</p></article>
          <article className="sbi-card"><span className="sbi-number">03 / SUPPORT</span><h3>Ask when things change</h3><p>Bring scope changes, blockers, or questions to the central student team before promising new work.</p></article>
        </div>
      </div></section>

      <section className="sbi-section-tight"><div className="sbi-content"><CtaPanel title="Ready to explore a chapter?" description={`Open the chapter application in a new tab, or email ${PUBLIC_CONTACT_EMAIL} with a question.`} href={APPLICATION_LINKS.chapter} label="Open application" testId="chapter-apply-bottom" /></div></section>
    </PageShell>
  );
}
