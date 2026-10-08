import { motion } from "framer-motion";
import { AlertCircle, ArrowUp, ArrowUpRight, Check, Copy, Loader2, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { EMAIL, SOCIALS } from "../data/content";
import { verifyEmail } from "../utils/verifyEmail";
import DottedName from "./DottedName";
import { LineReveal, Magnetic, Reveal, SectionTag } from "./fx";
import Marquee from "./Marquee";

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  suggestion,
  onAcceptSuggestion,
  disabled = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  suggestion?: string | null;
  onAcceptSuggestion?: (suggestion: string) => void;
  disabled?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const hasError = Boolean(error);

  return (
    <div className="group block">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className={`font-mono text-[10px] uppercase tracking-[0.28em] transition-colors cursor-pointer ${
            hasError ? "text-rose-400 font-semibold" : focus ? "text-accent" : "text-muted"
          }`}
        >
          {label}
        </label>
        {hasError && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-rose-400 font-semibold">
            Invalid
          </span>
        )}
      </div>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required
          rows={4}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          className={`bg-anim mt-2 w-full resize-none rounded-2xl border bg-surface px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 sm:text-[14px] ${
            hasError
              ? "border-rose-500/80 focus:border-rose-500 bg-rose-500/[0.04]"
              : "border-line focus:border-accent"
          }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          className={`bg-anim mt-2 w-full rounded-2xl border bg-surface px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 sm:text-[14px] ${
            hasError
              ? "border-rose-500/80 focus:border-rose-500 bg-rose-500/[0.04]"
              : "border-line focus:border-accent"
          }`}
        />
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-1.5 text-[12px] text-rose-400 leading-tight"
        >
          <AlertCircle size={13} className="shrink-0" />
          <span>{error}</span>
        </motion.p>
      )}
      {suggestion && onAcceptSuggestion && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-muted"
        >
          <span>Did you mean</span>
          <button
            type="button"
            onClick={() => onAcceptSuggestion(suggestion)}
            className="cursor-pointer font-bold text-accent underline underline-offset-2 transition-colors hover:text-ink"
          >
            {suggestion}
          </button>
          <span>?</span>
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "sending" | "sent" | "needs_activation" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const submittedEmail = (formData.get("email") as string || email)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !submittedEmail || !message) return;

    if (name.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }

    if (message.length < 5) {
      setStatus("error");
      setErrorMessage("Please provide a brief description of your project or idea.");
      return;
    }

    setStatus("verifying");
    setErrorMessage("");

    const verification = await verifyEmail(submittedEmail);
    if (!verification.valid) {
      setStatus("idle");
      setEmailError(verification.error || "This email address does not exist or is invalid.");
      setEmailSuggestion(verification.suggestion || null);
      return;
    }

    setEmailError("");
    setEmailSuggestion(null);
    setStatus("sending");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email: submittedEmail,
          message,
          _subject: `Portfolio Message from ${name} (${submittedEmail})`,
          _captcha: "false",
          _template: "table",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && (data?.success === "true" || data?.success === true)) {
        setStatus("sent");
        form.reset();
        setEmail("");
        setEmailError("");
        setEmailSuggestion(null);
        setTimeout(() => setStatus("idle"), 5000);
      } else if (
        data?.message &&
        typeof data.message === "string" &&
        data.message.toLowerCase().includes("activation")
      ) {
        setStatus("needs_activation");
        form.reset();
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data?.message || "Could not send. Please email directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* ribbon */}
      <div className="border-y border-line bg-ink py-4 text-bg">
        <Marquee
          items={[
            "Let's Connect",
            "Open for Freelance",
            "Full-Time Roles",
            "AI Projects",
            "Let's Connect",
            "Open for Freelance",
            "Full-Time Roles",
            "AI Projects",
          ]}
          duration={24}
          reverse
          outline
          itemClass="font-xwide text-lg sm:text-2xl font-extrabold uppercase tracking-tight"
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          {/* Left: massive CTA */}
          <div>
            <SectionTag index="04" label="Contact — Let's Build" />
            <h2 className="mt-8 font-xwide text-[12vw] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] sm:text-[9vw] lg:text-[5.6vw]">
              <LineReveal>Have an</LineReveal>
              <LineReveal delay={0.08}>idea? Let's</LineReveal>
              <LineReveal delay={0.16}>
                <span className="serif-it font-normal normal-case text-accent">
                  build it
                </span>
                <span className="text-accent">.</span>
              </LineReveal>
            </h2>

            <Reveal delay={0.2} className="mt-10">
              <p className="max-w-md text-[15px] leading-[1.85] text-ink2">
                Whether it's a product that needs engineering, an AI feature that needs
                grounding, or a brand that needs a home on the web — my inbox is open and
                my calendar is friendly.
              </p>
            </Reveal>

            <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.3}>
                <a
                  href={`mailto:${EMAIL}`}
                  data-hover
                  className="group flex max-w-full items-center gap-2.5 rounded-full bg-accent px-5 py-4 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-ink sm:gap-3 sm:px-8 sm:py-5 sm:text-[12px] sm:tracking-[0.18em]"
                >
                  {EMAIL}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
              </Magnetic>
              <Magnetic strength={0.3}>
                <button
                  onClick={copyEmail}
                  data-hover
                  aria-label="Copy email"
                  className="bg-anim grid h-14 w-14 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-bg"
                >
                  {copied ? <Check size={17} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </Magnetic>
            </Reveal>

            <Reveal delay={0.36} className="mt-14 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                  Location
                </p>
                <p className="mt-2 flex items-center gap-2 text-[15px] font-semibold">
                  <MapPin size={15} className="text-accent" /> India — Remote Worldwide
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
                  Socials
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-hover
                      className="u-sweep text-[14px] font-semibold text-ink2 transition-colors hover:text-ink"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form card */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            className="h-fit rounded-[30px] border border-line bg-surface p-5 shadow-[var(--shadow)] sm:p-9 lg:mt-16"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-xwide text-xl font-extrabold uppercase tracking-tight">
                Start a project
              </h3>
              <span className="rounded-full bg-accent-soft px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                Reply &lt; 24h
              </span>
            </div>
            <div className="mt-7 flex flex-col gap-5">
              <Field
                label="Your name"
                name="name"
                placeholder="Jane Cooper"
                disabled={status === "verifying" || status === "sending"}
              />
              <Field
                label="Email address"
                name="email"
                type="email"
                placeholder="jane@studio.com"
                value={email}
                disabled={status === "verifying" || status === "sending"}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                  if (emailSuggestion) setEmailSuggestion(null);
                }}
                onBlur={async () => {
                  const trimmed = email.trim();
                  if (!trimmed) return;
                  if (!trimmed.includes("@")) {
                    setEmailError("Please enter a valid email address with '@'.");
                    return;
                  }
                  const res = await verifyEmail(trimmed);
                  if (!res.valid) {
                    setEmailError(res.error || "Please enter a valid, active email address.");
                    setEmailSuggestion(res.suggestion || null);
                  } else {
                    setEmailError("");
                    setEmailSuggestion(null);
                  }
                }}
                error={emailError}
                suggestion={emailSuggestion}
                onAcceptSuggestion={(s) => {
                  setEmail(s);
                  setEmailError("");
                  setEmailSuggestion(null);
                }}
              />
              <Field
                label="Tell me about the idea"
                name="message"
                textarea
                placeholder="Timeline – scope – the exciting part…"
                disabled={status === "verifying" || status === "sending"}
              />
              {status === "needs_activation" && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
                  <p className="font-semibold text-amber-100 flex items-center gap-1.5">
                    <AlertCircle size={15} className="text-amber-400" /> One-Time Activation Required
                  </p>
                  <p className="mt-1 text-amber-200/90 leading-relaxed">
                    FormSubmit has sent a 1-click confirmation email to <strong>{EMAIL}</strong>. Please open your Gmail and click <em>"Activate Form"</em> once to receive all submissions.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-200 flex items-start gap-2.5">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-400" />
                  <div>
                    <p className="font-semibold text-rose-100">Could not send</p>
                    <p className="mt-0.5 text-rose-200/90">{errorMessage}</p>
                    <a
                      href={`mailto:${EMAIL}?subject=Portfolio%20Inquiry`}
                      className="mt-2 inline-flex items-center gap-1.5 font-bold text-accent underline underline-offset-4 hover:text-ink"
                    >
                      Click here to email directly <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              )}

              <Magnetic className="w-full" strength={0.15}>
                <button
                  type="submit"
                  data-hover
                  disabled={status === "verifying" || status === "sending"}
                  className={`flex w-full items-center justify-center gap-3 rounded-full py-4.5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed ${
                    status === "sent"
                      ? "bg-emerald-600 text-white"
                      : "bg-ink text-bg hover:bg-accent hover:text-accent-ink"
                  }`}
                >
                  {status === "verifying" ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-accent" /> Verifying email...
                    </>
                  ) : status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending message...
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check size={16} /> Message sent — thank you
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send Message
                    </>
                  )}
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </div>

        {/* ============== DOTTED NAME BANNER ============== */}
        <DottedName />
      </div>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-col sm:flex-row items-center justify-between gap-4 px-5 py-7 sm:px-8 text-center sm:text-left">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">
            © 2026 Yash Paradkar — All rights reserved
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
            Designed &amp; Developed by <span className="font-semibold text-ink">Yash Paradkar</span>
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-hover
            className="bg-anim group flex items-center gap-3 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] transition-colors hover:bg-ink hover:text-bg"
          >
            Back to top
            <ArrowUp size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
