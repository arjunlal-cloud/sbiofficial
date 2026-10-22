import { getGetSbiFormStatusQueryKey, useGetSbiFormStatus, useSubmitSbiForm } from "@workspace/api-client-react";
import { FormWizard, type FormWizardStep } from "@/components/site/FormWizard";
import { GOOGLE_FORM_FALLBACKS } from "@/data/siteContent";
import { PageHero, PageShell } from "@/components/site/PageShell";

const steps: FormWizardStep[] = [
  {
    title: "About you",
    description: "Share the basics so SBI can review your application and reach you.",
    fields: [
      { id: "Full name", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { id: "Grade", label: "High-school grade", type: "text", required: true, placeholder: "For example, 11th grade" },
      { id: "School", label: "School", type: "text", required: true, placeholder: "Your high school" },
      { id: "Email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
      { id: "Phone number", label: "Phone number", type: "tel", placeholder: "Optional" },
    ],
  },
  {
    title: "Your chapter",
    description: "Tell us where you want to start and who might build the team with you.",
    fields: [
      { id: "Chapter area", label: "Town or area for your chapter", type: "text", required: true, placeholder: "Town, region, or country" },
      { id: "Why lead", label: "Why do you want to start a chapter?", type: "textarea", required: true },
      { id: "Teammates", label: "Who is on your team so far?", type: "textarea", required: true, helpText: "Include names and possible roles. It is fine to say you are still looking." },
      { id: "First business", label: "Do you have a first business in mind?", type: "textarea", required: true, helpText: "A business type or local organization is enough if you do not have a name yet." },
    ],
  },
  {
    title: "Your experience",
    description: "You do not need prior coding experience. Share what you have tried and what you would like to learn.",
    fields: [
      { id: "Experience", label: "What experience or skills would you bring?", type: "textarea", placeholder: "Projects, school activities, interests, or other experience" },
      { id: "Project interests", label: "Which kinds of work interest you most?", type: "select", options: ["Website development", "Promotional videos", "Google Business Profile help", "Social media setup", "Not sure yet"] },
    ],
  },
  {
    title: "Commitment",
    description: "Give SBI a realistic picture of your schedule and what support would help.",
    fields: [
      { id: "Schedule", label: "What does your schedule usually allow for a chapter?", type: "textarea", required: true, helpText: "There is no set hours-per-week requirement on this form." },
      { id: "Support needs", label: "What kind of guidance would be helpful?", type: "textarea" },
    ],
  },
  {
    title: "Shared expectations",
    description: "These are the confirmed basics of how SBI supports chapter work.",
    fields: [
      { id: "Training before client work", label: "I understand training happens before my chapter's first client project.", type: "checkbox", required: true },
      { id: "No-cost local work", label: "I understand that work for a business inside the chapter's approved area is provided at no cost.", type: "checkbox", required: true },
      { id: "Review before handoff", label: "I understand finished work is reviewed before it is handed to the business.", type: "checkbox", required: true },
      { id: "Business ownership", label: "I understand the business owns the finished work.", type: "checkbox", required: true },
    ],
  },
];

export default function Apply() {
  const status = useGetSbiFormStatus({ query: { queryKey: getGetSbiFormStatusQueryKey(), retry: false, staleTime: 30_000 } });
  const submission = useSubmitSbiForm();

  const handleSubmit = async (answers: Record<string, string>) => {
    try {
      await submission.mutateAsync({ kind: "application", data: { answers } });
    } catch (error) {
      const data = (error as { data?: unknown })?.data;
      if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
        throw new Error(data.error);
      }
      throw new Error("We couldn't send this application. Please use the existing form link.");
    }
  };

  return (
    <PageShell current="/apply" title="Apply to Start an SBI Network Chapter | Student Application" description="Complete a step-by-step application to start an SBI Network chapter. Applications are reviewed by the student support team.">
      <PageHero eyebrow="Chapter application" title="Start with your first two." description="Tell us about yourself, your area, and who may join your team. Training takes place before the first client project.">
        <a className="sbi-button sbi-button-outline" href="#application-form" data-testid="apply-form-scroll">Begin the application <span aria-hidden="true">↓</span></a>
      </PageHero>
      <div id="application-form">
        <FormWizard
          title="Chapter application"
          eyebrow="Apply to start an SBI chapter"
          intro="You do not need everything figured out. Share your plan and what you would like to learn; the student support team will review your application."
          steps={steps}
          fallbackUrl={GOOGLE_FORM_FALLBACKS.chapter}
          onSubmit={handleSubmit}
          deliveryReady={status.data?.ready === true}
        />
      </div>
    </PageShell>
  );
}
