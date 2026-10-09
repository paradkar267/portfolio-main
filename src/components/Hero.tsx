import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HERO_MARQUEE, HERO_SKILLS, SOCIALS } from "../data/content";
import { scrollTo } from "../lib/scroll";
import { EASE, LineReveal, Magnetic, Reveal } from "./fx";
import Marquee from "./Marquee";
import Portrait from "./Portrait";

/* brand marks (lucide dropped brand icons) */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/* Name masthead — one centered line on desktop, natural wrap on mobile.
   Letters rise through a mask on load. */
function NameWord({
  word,
  delay = 0,
  startIndex = 0,
  ready,
}: {
  word: string;
  delay?: number;
  startIndex?: number;
  ready: boolean;
}) {
  return (
    <span className="inline-flex" aria-hidden>
      {Array.from(word).map((c, i) => (
        <span key={i} className="mask-line inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "112%", rotate: 4 }}
            animate={ready ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: delay + (startIndex + i) * 0.035 }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function NameBand({ ready }: { ready: boolean }) {
  return (
    <h1
      aria-label="Yash Paradkar"
      className="flex w-full flex-wrap items-baseline justify-center gap-x-[0.28em] text-center font-xwide text-[12.5vw] font-black uppercase leading-[0.92] tracking-[-0.02em] text-ink sm:text-[10.5vw] lg:whitespace-nowrap lg:text-[8.4vw]"
    >
      <NameWord word="YASH" ready={ready} />
      <NameWord word="PARADKAR" ready={ready} startIndex={4} delay={0.12} />
    </h1>
  );
}

const SOCIAL_ICONS = [GithubIcon, LinkedinIcon, InstagramIcon];

export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-[1600px] px-5 pt-20 sm:px-8 sm:pt-24">
        {/* ================= NAME MASTHEAD ================= */}
        <motion.div style={{ y: nameY, opacity: fade, willChange: "transform, opacity" }}>
          <NameBand ready={ready} />
        </motion.div>

        {/* ================= EYEBROW ================= */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="mt-4 sm:mt-6 text-center mx-auto font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.34em] text-accent max-w-sm sm:max-w-none"
        >
          Full-Stack Developer &amp; AI Product Builder
        </motion.p>

        {/* ================= MAIN GRID ================= */}
        <div className="relative mt-6 sm:mt-8 grid gap-8 sm:gap-10 lg:mt-6 lg:grid-cols-[1.05fr_0.85fr_1fr] lg:gap-8 xl:gap-12">
          {/* ---------- LEFT: statement ---------- */}
          <div className="order-2 flex flex-col items-center sm:items-start text-center sm:text-left lg:order-1">
            <h2 className="font-headline text-[8.5vw] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-[6.5vw] lg:text-[2.9vw]">
              <LineReveal delay={0.5}>Thoughtful design.</LineReveal>
              <LineReveal delay={0.6}>Purposeful code.</LineReveal>
              <LineReveal delay={0.7}>
                <span className="text-accent">Real experiences.</span>
              </LineReveal>
            </h2>

            <Reveal delay={0.85} className="mt-5 sm:mt-6">
              <p className="max-w-md text-[14.5px] sm:text-[15px] leading-[1.8] text-ink2">
                I'm Yash — a Computer Engineering student who turns ideas into fast,
                honest, production-ready products: client websites, backend systems, and
                AI-powered tools that earn their keep.
              </p>
            </Reveal>

            <Reveal delay={0.95} className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Magnetic>
                <button
                  onClick={() => scrollTo("#work")}
                  className="group flex items-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-[13px] font-bold text-accent-ink transition-colors duration-300 hover:bg-accent-deep"
                >
                  View My Work
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="rounded-lg border border-line-strong px-6 py-3.5 text-[13px] font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
                >
                  Get in Touch
                </button>
              </Magnetic>
            </Reveal>

            {/* socials */}
            <Reveal delay={1.05} className="mt-7 sm:mt-9 flex items-center justify-center sm:justify-start gap-5">
              {SOCIALS.slice(0, 3).map((s, i) => {
                const Icon = SOCIAL_ICONS[i];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="text-ink2 transition-[color,translate] duration-300 hover:-translate-y-0.5 hover:text-accent"
                  >
                    <Icon />
                  </a>
                );
              })}
              <span className="h-px w-10 bg-line-strong" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                @paradkar267
              </span>
            </Reveal>
          </div>

          {/* ---------- CENTER: portrait on a soft disc ---------- */}
          <div className="order-1 relative mx-auto w-full max-w-[270px] sm:max-w-[320px] lg:order-2 lg:max-w-[380px]">
            <motion.div style={{ y: portraitY, willChange: "transform" }}>
              {/* accent rule above the disc */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : undefined}
                transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
                className="mx-auto mb-3 h-[3px] w-36 sm:w-44 origin-center sm:origin-left bg-accent"
              />
              <div className="relative">
                <Portrait ready={ready} />
              </div>
            </motion.div>
          </div>

          {/* ---------- RIGHT: discipline rows + signature ---------- */}
          <div className="order-3 flex flex-col justify-center lg:order-3 lg:pt-10">
            <div>
              {HERO_SKILLS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={ready ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.75 + i * 0.12 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-1.5 border-t border-line py-3.5 sm:py-5 last:border-b"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 bg-accent" aria-hidden />
                    <span className="font-headline text-[14.5px] sm:text-[15px] font-semibold text-ink">
                      {s.label}
                    </span>
                  </span>
                  <span className="pl-4.5 sm:pl-0 text-left sm:text-right font-mono text-[12px] sm:text-[13px] leading-snug text-muted">
                    {s.stack}
                  </span>
                </motion.div>
              ))}
            </div>

            <Reveal delay={1.15} className="mt-6 sm:mt-7 text-center sm:text-left">
              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-ink2">
                Currently shipping client work at{" "}
                <strong className="font-semibold text-ink">Bizleap Technologies</strong> ·
                Nagpur, India
              </p>
            </Reveal>

            <Reveal delay={1.25} className="mt-6 sm:mt-8 self-center sm:self-end">
              <span className="font-script inline-block -rotate-2 text-4xl leading-none text-accent sm:text-5xl">
                Yash Paradkar
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ================= MARQUEE RIBBON ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
        className="relative mt-16 border-y border-line bg-ink py-4 text-bg lg:mt-20"
      >
        <Marquee
          items={HERO_MARQUEE}
          duration={26}
          itemClass="font-xwide text-lg font-extrabold uppercase tracking-tight sm:text-2xl"
        />
      </motion.div>
    </section>
  );
}
