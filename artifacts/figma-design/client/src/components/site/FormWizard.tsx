import { useId, useState, type FormEvent } from "react";
import "./FormWizard.css";

export type FormWizardFieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox";

export type FormWizardField = {
  id: string;
  label: string;
  type: FormWizardFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
};

export type FormWizardStep = {
  title: string;
  description: string;
  fields: FormWizardField[];
};

export type FormWizardProps = {
  title: string;
  eyebrow: string;
  intro: string;
  steps: FormWizardStep[];
  fallbackUrl: string;
  onSubmit: (answers: Record<string, string>) => void | Promise<void>;
  deliveryReady: boolean;
};

type SubmissionState = "idle" | "loading" | "error" | "accepted";

export function FormWizard({
  title,
  eyebrow,
  intro,
  steps,
  fallbackUrl,
  onSubmit,
  deliveryReady,
}: FormWizardProps) {
  const idPrefix = useId();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const isReview = currentStep >= steps.length;
  const activeStep = steps[currentStep];
  const totalSteps = steps.length + 1;
  const progress = isReview ? 100 : steps.length ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;
  const progressLabel = isReview ? `Step ${totalSteps} of ${totalSteps}` : `Step ${currentStep + 1} of ${totalSteps}`;

  const validateStep = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (!step) return true;
    const nextErrors: Record<string, string> = {};
    step.fields.forEach((field) => {
      const value = answers[field.id] ?? "";
      if (field.required && (field.type === "checkbox" ? value !== "true" : !value.trim())) {
        nextErrors[field.id] = field.type === "checkbox"
          ? "Please check this box to continue."
          : "This field is required.";
      } else if (field.required && field.type === "email" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        nextErrors[field.id] = "Enter a valid email address.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateAnswer = (fieldId: string, value: string) => {
    setAnswers((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => {
      if (!current[fieldId]) return current;
      const next = { ...current };
      delete next[fieldId];
      return next;
    });
  };

  const goForward = () => {
    if (!validateStep(currentStep)) return;
    setSubmissionState("idle");
    setSubmissionMessage("");
    setCurrentStep((step) => Math.min(step + 1, steps.length));
  };

  const goBack = () => {
    setSubmissionState("idle");
    setSubmissionMessage("");
    setCurrentStep((step) => Math.max(0, step - 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === "loading" || submissionState === "accepted") return;
    if (!deliveryReady) {
      setSubmissionState("error");
      setSubmissionMessage("Email submissions are not configured yet. Your answers have not been sent. Use the existing form link below to submit.");
      return;
    }
    setSubmissionState("loading");
    setSubmissionMessage("");
    try {
      await onSubmit(answers);
      setSubmissionState("accepted");
      setSubmissionMessage("Your answers were accepted for email delivery to SBI. This does not mean an application or project request has been approved.");
    } catch (error) {
      setSubmissionState("error");
      setSubmissionMessage(error instanceof Error ? error.message : "We couldn't submit your answers. Please try again.");
    }
  };

  const renderField = (field: FormWizardField) => {
    const controlId = `${idPrefix}-${field.id}`;
    const errorId = `${controlId}-error`;
    const helpId = `${controlId}-help`;
    const describedBy = [field.helpText ? helpId : "", errors[field.id] ? errorId : ""].filter(Boolean).join(" ") || undefined;
    const commonProps = {
      id: controlId,
      name: field.id,
      "aria-invalid": errors[field.id] ? true : undefined,
      "aria-describedby": describedBy,
    };

    if (field.type === "checkbox") {
      return (
        <div className="fw-field fw-field-checkbox" key={field.id}>
          <label className="fw-checkbox-label" htmlFor={controlId}>
            <input
              {...commonProps}
              type="checkbox"
              checked={answers[field.id] === "true"}
              onChange={(event) => updateAnswer(field.id, String(event.target.checked))}
            />
            <span>{field.label}{field.required && <span className="fw-required"> *</span>}</span>
          </label>
          {field.helpText && <p className="fw-help" id={helpId}>{field.helpText}</p>}
          {errors[field.id] && <p className="fw-field-error" id={errorId}>{errors[field.id]}</p>}
        </div>
      );
    }

    return (
      <div className="fw-field" key={field.id}>
        <label className="fw-label" htmlFor={controlId}>
          {field.label}{field.required && <span className="fw-required" aria-hidden="true"> *</span>}
          {field.required && <span className="sbi-sr-only"> (required)</span>}
        </label>
        {field.type === "textarea" ? (
          <textarea
            {...commonProps}
            value={answers[field.id] ?? ""}
            placeholder={field.placeholder}
            onChange={(event) => updateAnswer(field.id, event.target.value)}
            rows={5}
          />
        ) : field.type === "select" ? (
          <select
            {...commonProps}
            value={answers[field.id] ?? ""}
            onChange={(event) => updateAnswer(field.id, event.target.value)}
          >
            <option value="">Choose an option</option>
            {(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        ) : (
          <input
            {...commonProps}
            type={field.type}
            value={answers[field.id] ?? ""}
            placeholder={field.placeholder}
            onChange={(event) => updateAnswer(field.id, event.target.value)}
          />
        )}
        {field.helpText && <p className="fw-help" id={helpId}>{field.helpText}</p>}
        {errors[field.id] && <p className="fw-field-error" id={errorId}>{errors[field.id]}</p>}
      </div>
    );
  };

  if (!steps.length) {
    return (
      <section className="fw-root sbi-content" aria-labelledby={`${idPrefix}-title`}>
        <div className="sbi-card fw-empty">
          <p className="sbi-eyebrow">{eyebrow}</p>
          <h1 id={`${idPrefix}-title`}>{title}</h1>
          <p>This form is not available yet.</p>
          <a className="sbi-button" href={fallbackUrl} target="_blank" rel="noopener noreferrer">Open the existing form<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    );
  }

  return (
    <section className="fw-root sbi-content" aria-labelledby={`${idPrefix}-title`}>
      <header className="fw-heading">
        <p className="sbi-eyebrow">{eyebrow}</p>
        <h1 id={`${idPrefix}-title`}>{title}</h1>
        <p className="fw-intro">{intro}</p>
      </header>

      <div className="fw-layout">
        <aside className="fw-progress-panel sbi-card" aria-label="Form progress">
          <div className="fw-progress-copy">
            <span className="fw-step-label">{progressLabel}</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="fw-progress-track"
            role="progressbar"
            aria-label="Form completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={`${progress}% complete`}
          >
            <span className="fw-progress-fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <ol className="fw-step-list">
            {steps.map((step, index) => {
              const state = index < currentStep ? "complete" : index === currentStep && !isReview ? "current" : "";
              return (
                <li className={`fw-step-item ${state}`} key={`${step.title}-${index}`} aria-current={state === "current" ? "step" : undefined}>
                  <span className="fw-step-marker" aria-hidden="true">{index < currentStep ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span className="fw-step-name">{step.title}</span>
                </li>
              );
            })}
            <li className={`fw-step-item fw-review-item ${isReview ? "current" : ""}`} aria-current={isReview ? "step" : undefined}>
              <span className="fw-step-marker" aria-hidden="true">↗</span>
              <span className="fw-step-name">Review & submit</span>
            </li>
          </ol>
          <div className="fw-sidebar-note">
            <span className="fw-note-mark" aria-hidden="true">i</span>
            <p>Your answers stay in this browser session only and are not saved as a draft.</p>
          </div>
        </aside>

        <div className="fw-main">
          {!deliveryReady && (
            <div className="fw-configuration-notice" role="status">
              <strong>Email submissions are not configured yet.</strong>
              <span>You can complete and review this form, but it cannot send your answers yet. <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">Open the existing Google Form <span aria-hidden="true">↗</span><span className="sbi-sr-only"> (opens in a new tab)</span></a></span>
            </div>
          )}

          {submissionState === "accepted" ? (
            <section className="fw-result sbi-card" aria-live="polite">
              <span className="fw-result-mark" aria-hidden="true">✓</span>
              <p className="sbi-eyebrow">Received</p>
              <h2>Thank you for reaching out.</h2>
              <p>{submissionMessage}</p>
            </section>
          ) : (
            <form className="fw-form sbi-card" onSubmit={handleSubmit} noValidate>
              {isReview ? (
                <>
                  <div className="fw-form-heading">
                    <p className="fw-form-kicker">One last look</p>
                    <h2>Review your answers</h2>
                    <p>Check each section before sending. You can return to any step to make changes.</p>
                  </div>
                  <div className="fw-review-sections">
                    {steps.map((step, stepIndex) => (
                      <section className="fw-review-section" key={`${step.title}-review-${stepIndex}`}>
                        <div className="fw-review-heading">
                          <div>
                            <span className="fw-review-index">Section {String(stepIndex + 1).padStart(2, "0")}</span>
                            <h3>{step.title}</h3>
                          </div>
                          <button
                            className="fw-edit-button"
                            type="button"
                            onClick={() => { setCurrentStep(stepIndex); setSubmissionState("idle"); setSubmissionMessage(""); }}
                            aria-label={`Edit ${step.title}`}
                          >Edit <span aria-hidden="true">↗</span></button>
                        </div>
                        <dl className="fw-review-answers">
                          {step.fields.map((field) => {
                            const value = answers[field.id] ?? "";
                            const displayValue = field.type === "checkbox"
                              ? value === "true" ? "Yes" : "No"
                              : value.trim() || "Not provided";
                            return (
                              <div className="fw-answer-row" key={field.id}>
                                <dt>{field.label}</dt>
                                <dd>{displayValue}</dd>
                              </div>
                            );
                          })}
                        </dl>
                      </section>
                    ))}
                  </div>
                  {submissionState === "error" && (
                    <div className="fw-submit-error" role="alert">
                      <strong>We couldn't send this form.</strong>
                      <span>{submissionMessage}</span>
                    </div>
                  )}
                  <div className="fw-submit-note">
                    <p>Submitting sends these answers to SBI Network for review.</p>
                    <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">Prefer the existing form? Open it here <span aria-hidden="true">↗</span></a>
                  </div>
                </>
              ) : (
                <>
                  <div className="fw-form-heading">
                    <p className="fw-form-kicker">Section {String(currentStep + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(steps.length).padStart(2, "0")}</p>
                    <h2>{activeStep.title}</h2>
                    <p>{activeStep.description}</p>
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div className="fw-validation-summary" role="alert">
                      Please check the highlighted required fields before continuing.
                    </div>
                  )}
                  <div className="fw-fields">{activeStep.fields.map(renderField)}</div>
                </>
              )}

              <div className="fw-actions">
                {currentStep > 0 && (
                  <button className="sbi-button sbi-button-outline fw-back" type="button" onClick={goBack} disabled={submissionState === "loading"}>
                    <span aria-hidden="true">←</span> Back
                  </button>
                )}
                {!isReview ? (
                  <button className="sbi-button fw-next" type="button" onClick={goForward}>
                    Continue <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button className="sbi-button fw-next" type="submit" disabled={submissionState === "loading"}>
                    {submissionState === "loading" ? <><span className="fw-button-pulse" aria-hidden="true" /> Sending…</> : "Submit form"}
                    {submissionState !== "loading" && <span aria-hidden="true">→</span>}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default FormWizard;
