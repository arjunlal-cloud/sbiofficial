import { PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import { PageHero, PageShell, SectionTitle, handleSiteNavigation } from "@/components/site/PageShell";
import { Link } from "wouter";

export default function About() {
  return (
    <PageShell current="/about" title="About SBI Network | How the Student Agency Works" description="Learn how SBI Network high-school chapters and the central student team provide no-cost digital work while students gain client, portfolio and leadership experience.">
      <PageHero eyebrow="How the network works" title="Students building for local business." description="SBI Network is a student-powered digital agency network. Local high-school chapters work on digital needs for nearby businesses, with guidance from a central student team." />
      <section className="sbi-section"><div className="sbi-content sbi-split">
        <div><SectionTitle eyebrow="Two parts, one network" title="Local work. Shared support.">SBI brings student teams and local business needs together. Chapters do the project work, while a central student support team helps chapters prepare and deliver.</SectionTitle>
          <p className="sbi-note">Chapter availability and services vary by location. No specific service is listed for an individual chapter unless verified in the chapter data.</p>
        </div>
        <div className="sbi-photo sbi-photo-tint"><img src={`${import.meta.env.BASE_URL}figmaMotionAssets/imgRectangle55.png`} alt="" /></div>
      </div></section>
      <section className="sbi-section sbi-section-blue"><div className="sbi-content">
        <SectionTitle eyebrow="The central student team" title="A support layer around the chapters">Support is part of the model, not a replacement for local student ownership.</SectionTitle>
        <div className="sbi-grid-3">
          <article className="sbi-card sbi-card-dark"><span className="sbi-number">01</span><h3>Approves chapters</h3><p>The central student team helps approve chapters and train them before a first client project.</p></article>
          <article className="sbi-card sbi-card-dark"><span className="sbi-number">02</span><h3>Supports project work</h3><p>Central support is available to chapters while they work with businesses.</p></article>
          <article className="sbi-card sbi-card-dark"><span className="sbi-number">03</span><h3>Reviews before handoff</h3><p>Work is reviewed by the central student team before the business receives it.</p></article>
        </div>
      </div></section>
       <section id="impact" className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="A two-sided model" title="Useful work and real experience" />
        <div className="sbi-grid-2">
          <article className="sbi-card"><span className="sbi-number">FOR BUSINESSES</span><h3>Finished digital work</h3><p>Local businesses can request digital support at no cost. The business owns the finished work, and service availability varies by chapter.</p></article>
          <article className="sbi-card"><span className="sbi-number">FOR STUDENTS</span><h3>Learn by working with clients</h3><p>Students gain client, portfolio and leadership experience through real projects. No coding experience is required to start a chapter, and training comes first.</p></article>
        </div>
      </div></section>
       <section className="sbi-section-tight"><div className="sbi-content"><div className="sbi-cta-panel"><div><h2>Want to know more?</h2><p>For general questions, contact <a href={`mailto:${PUBLIC_CONTACT_EMAIL}`} data-testid="about-contact-email" style={{ color: "white" }}>{PUBLIC_CONTACT_EMAIL}</a>.</p></div><Link className="sbi-button" href="/chapter" onClick={handleSiteNavigation} data-testid="about-chapter-link">Explore starting a chapter <span aria-hidden="true">→</span></Link></div></div></section>
    </PageShell>
  );
}
