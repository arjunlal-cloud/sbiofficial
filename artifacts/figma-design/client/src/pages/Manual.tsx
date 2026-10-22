import { APPLICATION_LINKS } from "@/data/siteContent";
import { CtaPanel, FormLink, PageHero, PageShell, SectionTitle } from "@/components/site/PageShell";
import { Link } from "wouter";
import { handleSiteNavigation } from "@/components/site/PageShell";

const guide: { title: string; body: string; items?: string[] }[] = [
  {
    title: "Who can start a chapter",
    body: "Chapters are local teams of high-school students. Start with at least two students who want to work with nearby businesses. Coding experience is not required to get started; training comes before the first client project.",
  },
  {
    title: "Chapter-level roles",
    body: "The handbook uses these titles for the work within a chapter. One student can cover more than one role; these are responsibilities, not a current staff directory.",
    items: [
      "Chapter Leader — organizes the team, communicates with businesses, and coordinates delivery.",
      "Coder — builds the client's website with the tools covered in training.",
      "Cameraman — records footage for a client's promotional video.",
      "Editor — turns recorded footage into the finished video.",
      "Marketer — an optional role supporting the project's marketing approach.",
      "Graphic Designer — an optional role creating graphics and chapter social posts.",
    ],
  },
  {
    title: "Student support team roles",
    body: "The student support team helps chapters prepare and deliver. These titles describe support responsibilities, not named appointments.",
    items: [
      "Recruitment Lead — answers applicant questions and reviews chapter applications.",
      "Onboarding Lead — helps approved chapters get set up and understand the next steps.",
      "Web Training Lead and Video Training Lead — prepare students for website and promotional-video work.",
      "Support Lead — helps chapter leaders work through project questions.",
      "Quality Lead — reviews finished work before a business receives it.",
    ],
  },
  {
    title: "How to apply",
    body: "Open the chapter application and explain your interest, your local team, and the businesses you would like to help. A student recruitment lead reviews applications. Submitting a form is not the same as chapter approval.",
  },
  {
    title: "Getting your chapter approved",
    body: "The central student team reviews prospective chapters and helps approved teams prepare. Confirm your chapter's service area, responsibilities, and onboarding steps with SBI before presenting the chapter as officially approved.",
  },
  {
    title: "Getting started",
    body: "Complete training before your first client project. Confirm that the business location and requested service fit your chapter's approved area and capabilities. Agree on the deliverable, responsibilities, and review process before work starts.",
  },
  {
    title: "Your responsibilities",
    body: "Coordinate your students, keep business communication clear, and stay in contact with the student support team. Ask for help when work is blocked, the scope changes, or a commitment may be affected. Do not promise a service, deadline, price, or result that has not been agreed.",
  },
  {
    title: "Quality standard",
    body: "Build toward the scope agreed with the business. The central student team reviews finished work before handoff. Resolve review feedback and check the final deliverable with the business rather than treating an unfinished draft as complete.",
  },
  {
    title: "Who owns the work",
    body: "The business owns the finished work. Check third-party assets, licenses, accounts, and transfer arrangements with SBI before making additional ownership promises.",
  },
  {
    title: "Client materials and privacy",
    body: "Use approved forms and tools, share project files only with people who need them for the work, and get permission before reusing a business's materials outside its deliverable. Do not put passwords or private account credentials in forms or shared documents. Ask SBI how to handle project files when work ends.",
  },
  {
    title: "Policies awaiting confirmation",
    body: "This temporary guide does not set exact service-area boundaries, outside-area pricing, project quotas, meeting schedules, attendance rules, chapter deactivation, funding, tool subscriptions, response times, or final privacy and retention policies. Confirm those details with SBI before relying on them.",
  },
];

const faq = [
  { title: "Who can start a chapter?", body: "The temporary working copy describes chapters as local high-school student teams and says at least two students are needed. Confirm current eligibility and approval requirements with SBI." },
  { title: "Do students need coding experience?", body: "The working copy says coding experience is not required to start a chapter. Training takes place before the first client project." },
  { title: "Does a business pay for local work?", body: "SBI's confirmed model is no-cost digital services for nearby businesses. Ask through the business request form to confirm that a specific request is in scope." },
  { title: "Who owns the finished work?", body: "The business owns the finished work. Questions about third-party assets, licenses, accounts, or transfer details should be confirmed with SBI." },
];

export default function Manual() {
  return (
    <PageShell current="/manual" title="SBI Network Chapter Leader Handbook | Interim Reference" description="An interim chapter leader handbook covering chapter roles, applications, training, project support, and handoff. It is not the final official manual.">
      <PageHero eyebrow="Temporary working copy · not the final official manual" title="Chapter leader handbook." description="A practical reference for local student teams. The headings and role vocabulary follow SBI's reference websites; policies marked for verification in the working manual are not presented as final rules.">
        <Link className="sbi-button sbi-button-outline" href="/chapter" onClick={handleSiteNavigation} data-testid="manual-chapter-link">Explore starting a chapter</Link>
        <FormLink href={APPLICATION_LINKS.chapter} testId="manual-apply-hero">Open the chapter application <span aria-hidden="true">→</span></FormLink>
      </PageHero>

      <section className="sbi-section"><div className="sbi-content sbi-split">
        <div><SectionTitle eyebrow="What is the SBI Network?" title="Students learn through real client work">SBI is a student-led digital agency network. Local high-school students work on digital needs for nearby businesses, with training and support from the central student team.</SectionTitle>
          <p className="sbi-note">Network services include website development, promotional videos, Google Business Profile help, and social media setup. Availability varies by chapter; check locally before making a commitment.</p>
        </div>
        <div className="sbi-card"><span className="sbi-number">CONFIRMED BASICS</span><h3>How the network supports the work</h3><ul className="sbi-rich-list"><li>Training takes place before a chapter's first client project.</li><li>The central student team supports chapters during projects.</li><li>Work is reviewed before handoff.</li><li>The business owns the finished work.</li></ul></div>
      </div></section>

      <section className="sbi-section sbi-band"><div className="sbi-content">
        <SectionTitle eyebrow="Interim chapter guidance" title="The basics of getting work ready">Use these notes as an orientation, not as a substitute for current instructions from SBI.</SectionTitle>
        <div className="sbi-grid-2">
          <article className="sbi-card"><span className="sbi-number">CHAPTER SETUP</span><h3>Confirm the essentials</h3><p>Check the chapter's approved service area and service list, identify the students responsible for the work, and complete training before taking on a first client project.</p></article>
          <article className="sbi-card"><span className="sbi-number">PROJECT PREPARATION</span><h3>Agree on the scope</h3><p>Clarify the business's needs, the expected deliverable, who is doing each part, and how the business will review the result.</p></article>
          <article className="sbi-card"><span className="sbi-number">SUPPORT</span><h3>Ask when a project changes</h3><p>Contact the student support team when blocked, when the scope changes, or when an issue could affect a business or its project.</p></article>
          <article className="sbi-card"><span className="sbi-number">SAFE HANDLING</span><h3>Protect client information</h3><p>Use approved channels, limit file access to people working on the project, and never share passwords in public forms or shared documents.</p></article>
        </div>
      </div></section>

      <section className="sbi-section"><div className="sbi-content">
        <SectionTitle eyebrow="The operations manual" title="From getting started to handoff">Use these responsibilities and steps as an orientation. Confirm current operational requirements with SBI.</SectionTitle>
        <div className="sbi-faq" aria-label="Interim guide details">
          {guide.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p>{item.items && <ul className="sbi-rich-list" style={{ marginTop: 20 }}>{item.items.map((role) => <li key={role}>{role}</li>)}</ul>}</details>)}
        </div>
      </div></section>

      <section id="faq" className="sbi-section sbi-band"><div className="sbi-content">
        <SectionTitle eyebrow="Other questions" title="What this guide can confirm" />
        <div className="sbi-faq">{faq.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</div>
      </div></section>

      <section className="sbi-section-tight"><div className="sbi-content">
        <CtaPanel title="Need an up-to-date policy answer?" description="This is not the final official manual. Contact SBI for current chapter requirements or open the chapter application." href={APPLICATION_LINKS.chapter} label="Open chapter application" testId="manual-apply" />
      </div></section>
    </PageShell>
  );
}
