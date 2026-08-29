import G from '../components/G'

/* SOP content source: final PART 1-7 draft (Jul 2026), tightened for the web.
   Glossary terms are hand-marked with <G> — update here when the SOP changes. */

const H = ({ children }) => (
  <h4 className="mt-6 mb-2 max-w-full break-words font-display text-lg font-semibold text-forest-900 first:mt-0">{children}</h4>
)
const P = ({ children }) => <p className="mb-3 max-w-full break-words leading-relaxed text-ink-soft">{children}</p>
const UL = ({ children }) => <ul className="mb-3 max-w-full list-disc space-y-1 break-words pl-6 text-ink-soft">{children}</ul>

const sop = [
  {
    id: 'part-1',
    title: 'Part 1: What This Is',
    defaultOpen: true,
    content: (
      <>
        <H>What do we do & what is the "SBI Network"?</H>
        <P>
          Each chapter of the organization helps nearby small businesses. The{' '}
          <G t="Chapter Leader">chapter leader</G> who founded the chapter organizes a small team that creates
          websites, promotional videos, and more, free of cost for the business. The work is done completely
          independent from school, at your own time. The chapter leader keeps the team on track, keeps
          quality up, and communicates with <G t="HQ">HQ</G>.
        </P>
        <P>
          The "SBI Network" is all of the independent chapters across the US working under the same
          organization, SBI (Student Business Initiative).
        </P>
        <H>Why do we exist?</H>
        <P>
          Thousands of businesses across the US don't properly utilize marketing or have a working website,
          so their owners often pay corporate agencies hundreds of dollars, seriously overpaying. Meanwhile,
          marketing and AI are only becoming more important skills. Why not learn them hands-on while helping
          local business owners? Students in the SBI Network learn these skills working with real businesses
          and strengthening community bonds.
        </P>
        <H>What you offer</H>
        <P>Core services (free, always):</P>
        <UL>
          <li>A professional website for the small business</li>
          <li>A promotional video for the small business</li>
        </UL>
        <P>Optional services (also free): flyers, social media management/setup, Google Business Profile optimization.</P>
        <P>
          Any service outside your chapter's <G t="Chapter Boundaries">boundaries</G>, you can charge as much
          as you want. (Your boundaries get decided once you apply and get approved.)
        </P>
        <H>Non-negotiables</H>
        <UL>
          <li>
            Every chapter follows the same general branding as the rest of the organization (so it's clear
            we're all one organization).
          </li>
          <li>
            Every chapter's work must pass the bare minimum requirements for each service (judged by the{' '}
            <G t="Quality Lead">Quality Lead</G>).
          </li>
          <li>All services for local businesses inside your chapter's boundaries must be free.</li>
        </UL>
      </>
    ),
  },
  {
    id: 'part-2',
    title: "Part 2: Who's Who",
    content: (
      <>
        <H>Chapter-level roles</H>
        <P>
          <strong>Chapter Leader</strong> — leads all the roles involved to create a finished product for the
          client. Can specialize in other chapter roles too, as long as they still lead.
        </P>
        <P>Core roles (min 2 people to run a chapter, one person can cover multiple roles):</P>
        <UL>
          <li><strong>Chapter Leader</strong> — leads the team</li>
          <li><strong>Cameraman</strong> — shoots client videos</li>
          <li><strong>Coder</strong> — creates the client website with AI, no coding experience needed</li>
          <li><strong>Editor</strong> — edits raw footage from the cameraman</li>
        </UL>
        <P>Optional roles:</P>
        <UL>
          <li>
            <strong>Marketer</strong> — guides video production and editing with marketing techniques to make
            it go viral
          </li>
          <li>
            <strong>Graphic Designer</strong> — creates general posts like posters for the chapter's social
            media page
          </li>
        </UL>
        <H>HQ roles</H>
        <UL>
          <li>
            <strong>CEO</strong> — sets network direction, has final say on organization-wide decisions, and runs your weekly check-ins
          </li>
          <li>
            <strong>Quality Lead(s)</strong> — check your work before it goes live, make sure it hits the bar
          </li>
          <li>
            <strong>Recruitment Lead</strong> — responds to DMs on social, points you to the site and this
            SOP, checks Google Form applications
          </li>
          <li>
            <strong>Onboarding Lead(s)</strong> — sets up your chapter's social media, walks you through your
            responsibilities, clears up SOP questions, recommends businesses to reach out to first
          </li>
          <li>
            <strong>Web Training Lead(s)</strong> — teaches you the technical side of building client
            websites (Claude Code, GitHub, running locally, deploying on Vercel) before your first client
            project. Initial training only, not ongoing help.
          </li>
          <li>
            <strong>Video Training Lead(s)</strong> — teaches you how to shoot and edit a good promo video
            before your first client project. Initial training only, not ongoing help.
          </li>
          <li>
            <strong>Support Lead(s)</strong> — who you message for help on any project, from your first one
            onward
          </li>
          <li>
            <strong>Social Media Lead</strong> — runs the main org's social media to spread the mission and
            bring in more chapters
          </li>
          <li>
            <strong>Partnerships Lead</strong> — builds relationships outside the org that help chapters
            grow: programs like NHS, DECA, and FBLA, press, anything that helps the network scale
          </li>
          <li>
            <strong>Technical Lead</strong> — keeps the website updated, maintains this SOP, and owns the
            shared tool stack chapters use
          </li>
        </UL>
      </>
    ),
  },
  {
    id: 'part-3',
    title: 'Part 3: How to Become a Chapter Leader',
    content: (
      <>
        <H>Who can start a chapter</H>
        <P>
          Gotta be a high school student, that's the only real requirement. Location doesn't matter, could be
          anywhere.
        </P>
        <P>
          Past that it's not a checklist thing, more just does this person seem trustworthy. Not gonna hand a
          chapter to someone with no experience, bad grades, and a bad attitude.
        </P>
        <H>How to apply</H>
        <P>
          Fill out the "Apply to be a Chapter Leader" Google Form. The{' '}
          <G t="Recruitment Lead">Recruitment Lead</G> checks it.
        </P>
        <H>Getting Chartered</H>
        <P>
          After that, you'll have a quick chat with HQ leadership — basically a vibe check to make sure this is
          a good fit before anything's official.
        </P>
        <P>
          Once HQ leadership approves you, you're officially <G t="Chartered">chartered</G>, and HQ leadership
          decides your chapter's radius. Only one chapter can exist per town — if your radius would overlap
          with a nearby chapter's, whichever chapter got chartered first keeps that area.
        </P>
        <H>Getting started</H>
        <P>
          Once you're chartered, the Onboarding Lead takes over and guides you through everything:
        </P>
        <UL>
          <li>Naming your chapter and setting up its social media account</li>
          <li>Getting your photo for an introductory post on the main org's social media</li>
          <li>
            Starting a GoFundMe to fund your chapter's shared Claude Pro subscription — one per chapter, and
            Onboarding walks you through managing access and renewing it each year
          </li>
          <li>Your responsibilities and any SOP questions</li>
          <li>Which businesses in your area to reach out to first</li>
        </UL>
        <P>
          Before your first client project, you'll also go through mandatory sessions with the Web Training
          Lead and Video Training Lead. Those are one-time training — after that, Support Lead is who you
          message for help on any project.
        </P>
      </>
    ),
  },
  {
    id: 'part-4',
    title: 'Part 4: Your Job as Chapter Leader',
    content: (
      <>
        <H>Your responsibilities</H>
        <P>
          You lead your team to deliver finished products to clients and keep everyone in line with
          organization rules. Week to week, that means:
        </P>
        <UL>
          <li>
            Lead your team to complete at least 2 projects per month (or you're on the 3-strike{' '}
            <G t="Deactivation">deactivation</G> clock)
          </li>
          <li>Attend the weekly check-in with HQ leadership</li>
          <li>Attend the monthly meeting with all HQ and chapter leaders</li>
          <li>
            Keep your team operating under SBI standards (quality, free services in-radius, branding
            consistency)
          </li>
          <li>Cover for team members who leave, or ask <G t="HQ">HQ</G> for help</li>
        </UL>
        <P>
          If someone leaves and you can't figure out coverage yourself, HQ can help — lean on this especially
          for your Cameraman. You can build a solid website without much video experience, but a video with
          bad footage won't work, so covering video is the priority.
        </P>
        <H>Quality standard</H>
        <P>
          The Quality Lead checks your work before it goes live. Nothing should be broken on desktop or
          mobile, and a random visitor should be able to figure out the site without getting confused. Beyond
          that, no hard checkboxes.
        </P>
        <H>If you go inactive or fall behind</H>
        <P>
          Fewer than 2 free projects delivered in a month counts as a miss — a project only counts once it's
          actually delivered, not just started. Miss 3 months in a row and your chapter loses official
          recognition. The clock starts your first full month, so a partial first month doesn't count against
          you. If you temporarily can't keep up with your responsibilities, let HQ know beforehand. Both are
          negotiable with HQ.
        </P>
        <H>If you shut down</H>
        <P>
          The nearest chapter (geographically closest, or HQ's call if it's unclear) picks up any client
          relationships you leave behind.
        </P>
        <P>
          If you personally need to step down without shutting down the chapter, talk to HQ about
          transitioning leadership to someone else on your team.
        </P>
      </>
    ),
  },
  {
    id: 'part-5',
    title: 'Part 5: Rules & Ownership',
    content: (
      <>
        <H>Who owns the work</H>
        <P>
          Once you hand off the website or video to the business, it's theirs. Free means free, the chapter
          doesn't keep any ownership or rights to it after that.
        </P>
      </>
    ),
  },
  {
    id: 'part-6',
    title: 'Part 6: Why Start',
    content: (
      <>
        <P>
          You're not doing this by yourself. The whole exec team helps you through the entire process, from
          your first DM to your first client.
        </P>
        <P>
          You're also not just some kid making websites for cash. You're part of a real movement, helping
          small businesses that get ignored or overcharged. That looks way better on a college app than just
          saying you freelanced.
        </P>
        <P>
          Plus you're learning AI and marketing skills that are only gonna matter more later. You walk away
          with real client work, an actual portfolio, and experience leading a team.
        </P>
      </>
    ),
  },
  {
    id: 'part-7',
    title: 'Part 7: Getting Help',
    content: (
      <>
        <P>
          If you're stuck on something, message Support Lead. You'll also have the phone numbers for everyone
          on the exec team, so you can reach out directly.
        </P>
        <P>
          There's a group chat with all the chapter leaders too, good for bouncing ideas around or seeing
          what other chapters are doing.
        </P>
        <P>
          And remember, your weekly check-in with HQ leadership and the monthly meeting with everyone are
          built-in chances to raise anything that's going on.
        </P>
      </>
    ),
  },
]

export default sop
