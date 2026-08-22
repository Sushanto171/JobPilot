"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createApplicationFromParsedJob,
  ParsedJob,
  parseJobDescription,
} from "@/lib/api/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  Paperclip,
  ScanSearch,
  Send,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const wizardSchema = z.object({
  raw: z.string().trim().min(1, "Please paste a job description or URL."),
});

type WizardFormValues = z.infer<typeof wizardSchema>;

const stepMeta = [
  { label: "Paste" },
  { label: "Parse" },
  { label: "Tailor" },
  { label: "Apply" },
];

function StepProgress({ step }: { step: number }) {
  return (
    <div className="mb-6 flex items-center gap-3 px-1">
      {stepMeta.map((item, index) => {
        const isCompleted = index < step;
        const isCurrent = index === step;

        return (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold ${
                  isCompleted
                    ? "border-jp-cyan bg-jp-cyan text-jp-base"
                    : isCurrent
                      ? "border-jp-amber bg-jp-amber text-jp-base"
                      : "border-jp-border bg-transparent text-jp-text-dim"
                }`}
              >
                {isCompleted ? <Check size={12} /> : index + 1}
              </div>
              <span
                className={`text-[10px] uppercase tracking-[0.14em] ${
                  isCurrent ? "text-jp-paper" : "text-jp-text-dim"
                }`}
              >
                {item.label}
              </span>
            </div>
            {index < stepMeta.length - 1 && (
              <div
                className={`h-px w-8 ${index < step ? "bg-jp-cyan" : "bg-jp-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function isUrlInput(text: string) {
  return /^https?:\/\//i.test(text.trim());
}

function FetchStep({
  url,
  onSuccess,
  onFail,
}: {
  url: string;
  onSuccess: () => void;
  onFail: () => void;
}) {
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (/linkedin\.com|indeed\.com/i.test(url)) {
        setStatus("failed");
        window.setTimeout(onFail, 700);
      } else {
        setStatus("success");
        window.setTimeout(onSuccess, 500);
      }
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [onFail, onSuccess, url]);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2.5">
        {status === "loading" && (
          <Loader2 size={15} className="shrink-0 animate-spin text-jp-amber" />
        )}
        {status === "success" && (
          <CheckCircle2 size={15} className="shrink-0 text-jp-cyan" />
        )}
        {status === "failed" && (
          <AlertTriangle size={15} className="shrink-0 text-jp-rose" />
        )}
        <span className="font-mono text-xs text-jp-paper">
          {status === "loading" && "Fetching job posting..."}
          {status === "success" && "Fetched job posting"}
          {status === "failed" && "Couldn't read this page automatically"}
        </span>
      </div>
      {status === "loading" && (
        <p className="pl-6 text-xs text-jp-text-dim2">
          Trying a direct read first, falling back to a full render if the page
          needs JavaScript...
        </p>
      )}
      {status === "failed" && (
        <p className="pl-6 text-xs text-jp-text-dim2">
          This site blocks automated reads. Sending you back to paste the job
          description text instead.
        </p>
      )}
    </div>
  );
}

function ProcessChecklist({
  items,
  onDone,
}: {
  items: string[];
  onDone: () => void;
}) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= items.length) {
      const timer = window.setTimeout(onDone, 450);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(
      () => setRevealed((current) => current + 1),
      620,
    );
    return () => window.clearTimeout(timer);
  }, [items.length, onDone, revealed]);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const state =
          index < revealed ? "done" : index === revealed ? "active" : "pending";

        return (
          <div
            key={item}
            className="flex items-center gap-2.5"
            style={{ opacity: state === "pending" ? 0.35 : 1 }}
          >
            {state === "done" ? (
              <CheckCircle2 size={15} className="shrink-0 text-jp-cyan" />
            ) : state === "active" ? (
              <Loader2
                size={15}
                className="shrink-0 animate-spin text-jp-amber"
              />
            ) : (
              <span className="h-[15px] w-[15px] shrink-0 rounded-full border-[1.5px] border-jp-border" />
            )}

            <span
              className={`font-mono text-xs ${state === "pending" ? "text-jp-text-dim2" : "text-jp-paper"}`}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface AddApplicationWizardProps {
  open: boolean;
  onClose: () => void;
  onAddApplication?: (application: {
    id: string;
    company: string;
    code: string;
    role: string;
    date: string;
    // stage: "APPLIED";
    location: string;
  }) => void;
}

function TailorStep({
  parsed,
  onApprove,
  onEdit,
}: {
  parsed: ParsedJob;
  onApprove: () => void;
  onEdit: () => void;
}) {
  const [ready, setReady] = useState(false);

  return (
    <div>
      {!ready ? (
        <ProcessChecklist
          items={[
            "Analyzing your base resume",
            "Matching JD keywords",
            "Grounding check — no fabricated content",
          ]}
          onDone={() => setReady(true)}
        />
      ) : (
        <div className="animate-fadeup">
          <div className="rounded-md border border-jp-border bg-jp-surface-light p-3.5">
            <p className="mb-2.5 text-xs leading-relaxed text-jp-text-dim">
              Reordered experience to lead with backend/infra work. Matched{" "}
              {parsed.skills.length} keywords from the JD.
            </p>
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {parsed.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="rounded-full bg-jp-cyan/10 px-2 py-0.5 text-xs text-jp-cyan"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 border-t border-jp-border pt-2 text-xs text-jp-text-dim2">
              <AlertTriangle size={12} className="text-jp-rose" />
              Gap flagged: Kubernetes not found in your resume — not fabricated.
            </div>
          </div>
          <div className="mt-3.5 flex gap-2">
            <button
              type="button"
              onClick={onApprove}
              className="flex-1 rounded-md bg-jp-cyan px-3 py-2 text-sm font-semibold text-jp-base"
            >
              <Check size={14} className="mr-1.5 inline" />
              Approve & continue
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="rounded-md border border-jp-border px-3 py-2 text-sm text-jp-text-dim"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function AddApplicationWizard({
  open,
  onClose,
  onAddApplication,
}: AddApplicationWizardProps) {
  const [step, setStep] = useState(0);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<ParsedJob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchPhase, setFetchPhase] = useState(true);
  const [fetchWarning, setFetchWarning] = useState(false);
  const [applyMode, setApplyMode] = useState<"email" | "manual" | null>(null);
  const [emailBody, setEmailBody] = useState<string | null>(null);
  const [emailOpened, setEmailOpened] = useState(false);

  const form = useForm<WizardFormValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { raw: "" },
  });

  useEffect(() => {
    if (!open) {
      setStep(0);
      setRaw("");
      setParsed(null);
      setIsSubmitting(false);
      setFetchPhase(true);
      setFetchWarning(false);
      setApplyMode(null);
      setEmailBody(null);
      setEmailOpened(false);
      form.reset();
    }
  }, [open, form]);

  const isUrl = isUrlInput(raw);
  const effectiveMode = applyMode ?? (parsed?.hrEmail ? "email" : "manual");
  const defaultEmailBody = parsed
    ? `Hi team,\n\nI'm applying for the ${parsed.role} position. I've attached my tailored resume, reordered to highlight relevant backend/infra experience for this role.\n\nLooking forward to hearing from you.\n\nBest,\nSushanto Kumar`
    : "";

  const handleParse = async () => {
    const valid = await form.trigger("raw");
    if (!valid) return;
    const value = form.getValues("raw");
    setRaw(value);
    setFetchWarning(false);
    setFetchPhase(true);
    setStep(1);
  };

  const handleExtractDone = async () => {
    setParsed(await parseJobDescription(raw));
    setStep(2);
  };

  const handleConfirm = async () => {
    if (!parsed) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));

    onAddApplication?.(createApplicationFromParsedJob(parsed));
    setIsSubmitting(false);
    onClose();
  };

  const openEmailClient = () => {
    if (!parsed) return;
    const subject = `Application for ${parsed.role} — Sushanto Kumar`;
    const body = emailBody ?? defaultEmailBody;
    try {
      const url = URL.createObjectURL(
        new Blob([`Tailored resume for ${parsed.company} — ${parsed.role}`], {
          type: "application/pdf",
        }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `Resume_v2_${parsed.company}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch {
      // The confirmation screen still explains the manual attachment step.
    }
    window.open(
      `mailto:${parsed.hrEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    setEmailOpened(true);
  };

  const markEmailSent = () => {
    if (!parsed) return;
    onAddApplication?.(createApplicationFromParsedJob(parsed));
    onClose();
  };

  const currentStep = step;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
        onOpenChange={(value) => !value && onClose()}
        className="max-w-2xl overflow-hidden"
      >
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle>Add application</DialogTitle>
              <DialogDescription>
                Paste the job description and tailor it in one flow.
              </DialogDescription>
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="rounded-md p-1.5 text-jp-text-dim transition-colors hover:bg-white/5"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-5">
            <StepProgress step={currentStep} />
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="job-input"
                  className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-jp-text-dim"
                >
                  Job link or description
                </label>
                <textarea
                  id="job-input"
                  rows={8}
                  {...form.register("raw", {
                    onChange: (event) => setRaw(event.target.value),
                  })}
                  className="w-full resize-none rounded-md border border-jp-border bg-jp-base px-3 py-3 text-sm text-jp-paper outline-none ring-0 placeholder:text-jp-text-dim focus:border-jp-amber"
                  placeholder="Paste a URL or full job description..."
                />
                {form.formState.errors.raw && (
                  <p className="mt-2 text-xs text-jp-rose">
                    {form.formState.errors.raw.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleParse}
                  className="inline-flex items-center gap-2 rounded-md bg-jp-amber px-4 py-2 text-xs font-semibold text-jp-base transition-transform hover:scale-[1.02]"
                >
                  Parse job description
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-jp-text-dim">
                <ScanSearch size={13} className="text-jp-amber" />
                PARSING JOB DESCRIPTION
              </div>
              {isUrl && fetchPhase ? (
                <FetchStep
                  url={raw}
                  onSuccess={() => setFetchPhase(false)}
                  onFail={() => {
                    setFetchWarning(true);
                    setStep(0);
                  }}
                />
              ) : (
                <ProcessChecklist
                  items={[
                    "Extracting company & role",
                    "Identifying required skills",
                    "Detecting seniority level",
                  ]}
                  onDone={handleExtractDone}
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              {parsed && (
                <TailorStep
                  parsed={parsed}
                  onApprove={() => setStep(3)}
                  onEdit={() => setStep(0)}
                />
              )}
            </div>
          )}

          {currentStep === 3 && parsed && (
            <div>
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-jp-text-dim">
                <Send size={13} className="text-jp-amber" />
                REVIEW & SUBMIT
              </div>
              {parsed.hrEmail && !emailOpened && (
                <div className="mb-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setApplyMode("email")}
                    className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${effectiveMode === "email" ? "border-jp-cyan bg-jp-cyan/10 text-jp-cyan" : "border-jp-border text-jp-text-dim"}`}
                  >
                    <Mail size={12} className="mr-1.5 inline" />
                    Apply now via email
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplyMode("manual")}
                    className={`flex-1 rounded-md border px-3 py-2 text-xs font-medium ${effectiveMode === "manual" ? "border-jp-paper bg-jp-surface-light text-jp-paper" : "border-jp-border text-jp-text-dim"}`}
                  >
                    Track manually
                  </button>
                </div>
              )}
              {effectiveMode === "email" && parsed.hrEmail ? (
                emailOpened ? (
                  <div className="py-2">
                    <div className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-jp-paper">
                      <CheckCircle2 size={18} className="text-jp-cyan" />
                      Handed off to your email app
                    </div>
                    <div className="mb-4 space-y-1.5 rounded-md border border-jp-border bg-jp-surface-light p-3.5 text-xs text-jp-text-dim">
                      <div>
                        <Download
                          size={12}
                          className="mr-2 inline text-jp-cyan"
                        />
                        Downloaded Resume_v2_{parsed.company}.pdf
                      </div>
                      <div>
                        <Mail size={12} className="mr-2 inline text-jp-cyan" />
                        Opened your default email app with To and Subject filled
                        in
                      </div>
                      <div>
                        <Paperclip
                          size={12}
                          className="mr-2 inline text-jp-amber"
                        />
                        Attach the downloaded file, then send it from there
                      </div>
                    </div>
                    <p className="mb-3 text-xs text-jp-text-dim2">
                      We can&apos;t see your outbox, so let us know once
                      you&apos;ve actually hit send:
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={markEmailSent}
                        className="flex-1 rounded-md bg-jp-amber px-3 py-2.5 text-sm font-semibold text-jp-base"
                      >
                        <Check size={14} className="mr-1.5 inline" />
                        I&apos;ve sent it — mark Applied
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailOpened(false)}
                        className="rounded-md border border-jp-border px-3 py-2.5 text-sm text-jp-text-dim"
                      >
                        Not yet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3 space-y-2.5 rounded-md border border-jp-border bg-jp-surface-light p-3.5 text-xs">
                      <div className="font-mono text-jp-text-dim2">TO</div>
                      <div className="text-jp-paper">{parsed.hrEmail}</div>
                      <div className="font-mono text-jp-text-dim2">SUBJECT</div>
                      <div className="text-jp-paper">
                        Application for {parsed.role} — Sushanto Kumar
                      </div>
                      <div className="font-mono text-jp-text-dim2">MESSAGE</div>
                      <textarea
                        value={emailBody ?? defaultEmailBody}
                        onChange={(event) => setEmailBody(event.target.value)}
                        className="h-24 w-full resize-none rounded-md border border-jp-border bg-transparent px-2.5 py-2 text-xs text-jp-paper outline-none"
                      />
                      <div className="w-fit rounded-md border border-jp-border bg-jp-surface px-2 py-1.5 text-jp-text-dim">
                        <Paperclip
                          size={11}
                          className="mr-1.5 inline text-jp-cyan"
                        />
                        Resume_v2_{parsed.company}.pdf
                      </div>
                    </div>
                    <p className="mb-3 text-xs text-jp-text-dim2">
                      Opens your own email app. The resume downloads
                      automatically for you to attach.
                    </p>
                    <button
                      type="button"
                      onClick={openEmailClient}
                      className="w-full rounded-md bg-jp-amber px-3 py-2.5 text-sm font-semibold text-jp-base"
                    >
                      Open email app{" "}
                      <ExternalLink size={13} className="ml-1.5 inline" />
                    </button>
                  </div>
                )
              ) : (
                <div>
                  <div className="mb-3 rounded-md bg-jp-paper p-3.5 text-jp-base">
                    <div className="font-mono text-[11px] text-[#6B6558]">
                      {parsed.code} · {parsed.seniority}
                    </div>
                    <div className="mt-0.5 font-mono text-base font-bold">
                      {parsed.company}
                    </div>
                    <div className="mt-0.5 text-xs text-[#4A4638]">
                      {parsed.role} · {parsed.location}
                    </div>
                    <div className="mt-2.5 text-[11px] text-[#4A4638]">
                      <Check size={12} className="mr-1.5 inline text-jp-cyan" />
                      Tailored resume v2 attached
                    </div>
                  </div>
                  {!parsed.hrEmail && (
                    <p className="mb-3 text-xs text-jp-text-dim2">
                      <AlertTriangle size={12} className="mr-2 inline" />
                      No direct HR email found — apply via the original posting,
                      then track it here.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-jp-amber px-3 py-2.5 text-sm font-semibold text-jp-base disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={14}
                          className="mr-1.5 inline animate-spin"
                        />
                        Submitting application...
                      </>
                    ) : (
                      <>
                        Confirm & add to pipeline{" "}
                        <ArrowRight size={14} className="ml-1.5 inline" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
