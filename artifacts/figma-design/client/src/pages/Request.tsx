import { getGetSbiFormStatusQueryKey, useGetSbiFormStatus, useSubmitSbiForm } from "@workspace/api-client-react";
import { FormWizard, type FormWizardStep } from "@/components/site/FormWizard";
import { GOOGLE_FORM_FALLBACKS } from "@/data/siteContent";
import { PageHero, PageShell } from "@/components/site/PageShell";

const steps: FormWizardStep[] = [
  {
    title: "Your business",
    description: "A little context helps SBI understand what your business needs.",
    fields: [
      { id: "Business name", label: "Business name", type: "text", required: true },
      { id: "Business type", label: "What kind of business is it?", type: "text", required: true, placeholder: "For example, restaurant, salon, or nonprofit" },
      { id: "Business location", label: "Business address or city", type: "text", placeholder: "Optional" },
      { id: "Business links", label: "Website or social links", type: "textarea", placeholder: "Optional" },
    ],
  },
  {
    title: "What you need",
    description: "Share the kind of digital work you are interested in. Services vary by chapter.",
    fields: [
      { id: "Service", label: "Service you are interested in", type: "select", required: true, options: ["Website development", "Promotional videos", "Google Business Profile help", "Social media setup", "Not sure yet"] },
      { id: "Project details", label: "What would you like help with?", type: "textarea", required: true, helpText: "Include the main goal and any details that would help a student team understand the request." },
      { id: "Additional context", label: "Anything else SBI should know?", type: "textarea" },
    ],
  },
  {
    title: "How to reach you",
    description: "SBI will use these details to respond to your business request.",
    fields: [
      { id: "Your name", label: "Your name", type: "text", required: true },
      { id: "Email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
      { id: "Phone number", label: "Phone number", type: "tel", placeholder: "Optional" },
      { id: "Contact permission", label: "I agree that SBI may use these details to respond to this request.", type: "checkbox", required: true },
    ],
  },
];

export default function Request() {
  const status = useGetSbiFormStatus({ query: { queryKey: getGetSbiFormStatusQueryKey(), retry: false, staleTime: 30_000 } });
  const submission = useSubmitSbiForm();

  const handleSubmit = async (answers: Record<string, string>) => {
    try {
      await submission.mutateAsync({ kind: "business", data: { answers } });
    } catch (error) {
      const data = (error as { data?: unknown })?.data;
      if (data && typeof data === "object" && "error" in data && typeof data.error === "string") {
        throw new Error(data.error);
      }
      throw new Error("We couldn't send this request. Please use the existing form link.");
    }
  };

  return (
    <PageShell current="/business" title="Request Digital Help | SBI Network Business Request" description="Send a business request for digital support from SBI Network. Local service availability varies by chapter.">
      <PageHero eyebrow="Business request" title="Tell us what your business needs." description="Share your business details and the digital work you are looking for. A local student team can follow up if a chapter is available for your request.">
        <a className="sbi-button sbi-button-outline" href="#business-request-form" data-testid="business-form-scroll">Start a request <span aria-hidden="true">↓</span></a>
      </PageHero>
      <div id="business-request-form">
        <FormWizard
          title="Business request"
          eyebrow="Request digital help"
          intro="Tell us about your business and what you need. Chapter availability and services vary by location."
          steps={steps}
          fallbackUrl={GOOGLE_FORM_FALLBACKS.businessRequest}
          onSubmit={handleSubmit}
          deliveryReady={status.data?.ready === true}
        />
      </div>
    </PageShell>
  );
}
