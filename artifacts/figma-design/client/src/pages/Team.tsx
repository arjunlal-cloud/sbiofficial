import { APPLICATION_LINKS, PUBLIC_CONTACT_EMAIL } from "@/data/siteContent";
import { FormLink, PageHero, PageShell, SectionTitle } from "@/components/site/PageShell";

export default function Team() {
  return (
    <PageShell current="/team" title="SBI Network Support Team | Confirmed Student Roles" description="Learn about the confirmed student support team's role in approving and training chapters, supporting projects and reviewing work before handoff.">
      <PageHero eyebrow="Student support team" title="Support for chapters, at every handoff." description="The central team is made up of students who help chapters prepare, work through projects and review work before it reaches a business.">
        <FormLink href={APPLICATION_LINKS.studentSupportTeam} testId="team-support-apply-hero">Explore the support team application <span aria-hidden="true">↗</span></FormLink>
      </PageHero>
      <section className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="Confirmed responsibilities" title="A central team with a clear purpose">We do not publish unverified names or biographies here. The functions below are the confirmed roles of the central student team.</SectionTitle>
        <div className="sbi-grid-3">
          <article className="sbi-card"><span className="sbi-number">01 / CHAPTERS</span><h3>Chapter approval</h3><p>The central team helps approve chapters and prepare them through training before a first client project.</p></article>
          <article className="sbi-card"><span className="sbi-number">02 / PROJECTS</span><h3>Project support</h3><p>Chapters can receive support from the central team while they are working on projects.</p></article>
          <article className="sbi-card"><span className="sbi-number">03 / HANDOFF</span><h3>Work review</h3><p>The central team reviews work before it is handed to the business that owns the finished work.</p></article>
        </div>
      </div></section>
      <section className="sbi-section sbi-band"><div className="sbi-content sbi-split">
        <div><SectionTitle eyebrow="Join the support team" title="Help students do their best work">The supplied support-team application is an external form. Open it to learn more and apply; this page does not send an application.</SectionTitle>
          <FormLink href={APPLICATION_LINKS.studentSupportTeam} testId="team-support-apply-bottom">Open support team application <span aria-hidden="true">↗</span></FormLink>
        </div>
        <div className="sbi-card"><span className="sbi-number">QUESTIONS</span><h3>Get in touch</h3><p>For general questions, email <a className="sbi-contact-link" href={`mailto:${PUBLIC_CONTACT_EMAIL}`} data-testid="team-contact-email">{PUBLIC_CONTACT_EMAIL}</a>.</p></div>
      </div></section>
    </PageShell>
  );
}
