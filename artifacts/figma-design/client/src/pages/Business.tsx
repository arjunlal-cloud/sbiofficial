import { APPLICATION_LINKS, CHAPTER_LOCATIONS, NETWORK_SERVICES } from "@/data/siteContent";
import { CtaPanel, FormLink, PageHero, PageShell, SectionTitle } from "@/components/site/PageShell";

export default function Business() {
  return (
    <PageShell current="/business" title="No-Cost Digital Services for Businesses | SBI Network" description="Review the service categories listed across SBI Network and verified chapter locations, then ask about local availability through the real business request form.">
      <PageHero eyebrow="For local businesses" title="Digital work, powered by students." description="SBI Network chapters connect student teams with local businesses that need digital support. There is no cost to the business for finished work, which the business owns.">
        <FormLink href={APPLICATION_LINKS.businessRequest} testId="business-request-hero">Request digital help <span aria-hidden="true">→</span></FormLink>
        <a className="sbi-button sbi-button-outline" href="#coverage" data-testid="business-coverage-hero">Check chapter locations</a>
      </PageHero>

      <section id="services" className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="Network-listed categories" title="Services depend on the chapter">These are categories listed across the network, not a promise that every chapter offers each service. Local availability varies. The chapter records currently have no verified service listings.</SectionTitle>
        <ul className="sbi-pill-list" aria-label="Network-listed service categories">{NETWORK_SERVICES.map((service) => <li key={service.id}>{service.label}</li>)}</ul>
        <p className="sbi-note" style={{ marginTop: 28 }}>No per-chapter service lists or direct chapter contacts have been provided. Ask through the business request form for unlisted local contact and current availability.</p>
      </div></section>

      <section id="coverage" className="sbi-section sbi-band"><div className="sbi-content">
        <SectionTitle eyebrow="Locations listed in SBI materials" title="Ask about local availability">These locations are listed in the SBI materials, but that does not confirm current activity or a service-coverage radius. Use the request form to ask what is available for your location.</SectionTitle>
        <div className="sbi-grid-3">
          {CHAPTER_LOCATIONS.map((chapter) => <article className="sbi-card sbi-location" key={chapter.slug}>
            <span className="sbi-number">LOCATION LISTED</span>
            <address>{chapter.city}<br />{chapter.region}</address>
            {chapter.serviceIds.length > 0 ? <ul className="sbi-pill-list">{chapter.serviceIds.map((id) => { const service = NETWORK_SERVICES.find((item) => item.id === id); return service ? <li key={id}>{service.label}</li> : null; })}</ul> : <p style={{ marginTop: 16 }}>Local services are not listed yet. Availability varies by chapter.</p>}
            {chapter.contactUrl ? <a className="sbi-button sbi-button-outline" href={chapter.contactUrl} target="_blank" rel="noopener noreferrer" data-testid={`chapter-contact-${chapter.slug}`}>Contact this chapter<span className="sbi-sr-only"> (opens in a new tab)</span></a> : <FormLink href={APPLICATION_LINKS.businessRequest} className="sbi-button sbi-button-outline" testId={`chapter-request-${chapter.slug}`}>Ask about local availability</FormLink>}
          </article>)}
        </div>
      </div></section>

      <section className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="From request to handoff" title="A supported project, not a black box">The central team supports chapters during project work and reviews it before handoff.</SectionTitle>
        <div className="sbi-steps">
          <article className="sbi-step"><span className="sbi-number">01 / REQUEST</span><h3>Tell us what you need</h3><p>Use the business request form to describe your digital needs and location.</p></article>
          <article className="sbi-step"><span className="sbi-number">02 / LOCAL AVAILABILITY</span><h3>Check the fit</h3><p>Services and chapter availability vary. A listed location does not guarantee a particular service.</p></article>
          <article className="sbi-step"><span className="sbi-number">03 / HANDOFF</span><h3>Receive finished work</h3><p>Work is reviewed by the central student team before handoff. The business owns the finished work.</p></article>
        </div>
      </div></section>

      <section className="sbi-section sbi-band"><div className="sbi-content">
        <SectionTitle eyebrow="Before work begins" title="Agree on the project first">The temporary chapter guide recommends confirming the request and expectations before work starts.</SectionTitle>
        <div className="sbi-grid-3">
          <article className="sbi-card"><span className="sbi-number">01 / SCOPE</span><h3>Define the deliverable</h3><p>Talk through the business's needs, the expected finished work, and who is responsible for each part.</p></article>
          <article className="sbi-card"><span className="sbi-number">02 / REVIEW</span><h3>Plan the handoff</h3><p>Agree how the business will review the work. The central student team reviews project work before handoff.</p></article>
          <article className="sbi-card"><span className="sbi-number">03 / MATERIALS</span><h3>Respect client content</h3><p>Get permission before reusing a business's photos, logo, video, or other material outside its project deliverable.</p></article>
        </div>
      </div></section>

      <section id="request" className="sbi-section-tight"><div className="sbi-content"><CtaPanel title="Need help in your area?" description="Send a business request to ask about local chapter availability. Services and coverage vary by chapter." href={APPLICATION_LINKS.businessRequest} label="Open business request form" testId="business-request-bottom" /></div></section>
    </PageShell>
  );
}
