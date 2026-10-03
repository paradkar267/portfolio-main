import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { EMAIL, SOCIALS } from "../data/content";
import { LineReveal, Magnetic, Reveal, SectionTag } from "./fx";
import Marquee from "./Marquee";

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder: string;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <label className="group block">
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.28em] transition-colors ${
          focus ? "text-accent" : "text-muted"
        }`}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required
          rows={4}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="bg-anim mt-2 w-full resize-none rounded-2xl border border-line bg-surface px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent sm:text-[14px]"
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="bg-anim mt-2 w-full rounded-2xl border border-line bg-surface px-5 py-4 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent sm:text-[14px]"
        />
      )}
    </label>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
    (e.target as HTMLFormElement).reset();
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
              <Field label="Your name" name="name" placeholder="Jane Cooper" />
              <Field label="Email address" name="email" type="email" placeholder="jane@studio.com" />
              <Field
                label="Tell me about the idea"
                name="message"
                textarea
                placeholder="Timeline – scope – the exciting part…"
              />
              <Magnetic className="w-full" strength={0.15}>
                <button
                  type="submit"
                  data-hover
                  className={`flex w-full items-center justify-center gap-3 rounded-full py-4.5 text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    sent ? "bg-emerald-600 text-white" : "bg-ink text-bg hover:bg-accent hover:text-accent-ink"
                  }`}
                >
                  {sent ? (
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
      </div>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            © 2026 Yash Paradkar — All rights reserved
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-muted md:block">
            Designed & engineered with intent
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
