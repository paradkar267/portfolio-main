import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Briefcase,
  Download,
  GraduationCap,
  Layers,
} from "lucide-react";
import { scrollTo } from "../lib/scroll";
import { CountUp, LineReveal, Reveal, SectionTag } from "./fx";

const EXPERIENCE_BULLETS = [
  "Develop responsive interfaces for client websites and web applications.",
  "Connect frontend components with backend APIs, authentication, and databases.",
  "Build product interfaces and admin features based on project requirements.",
];

const EXPERIENCE_STACK = ["React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"];

const QUICK_FACTS = [
  {
    icon: Layers,
    title: "Full-Stack Development",
    detail: "Responsive interfaces, APIs, and databases",
  },
  {
    icon: Briefcase,
    title: "Client Project Experience",
    detail: "Web development at Bizleap Technologies",
  },
  {
    icon: Award,
    title: "8.66/10 CGPA",
    detail: "Current academic performance",
    cgpa: true,
  },
  {
    icon: BrainCircuit,
    title: "AI Applications",
    detail: "Interest in conversational tools and RAG systems",
  },
];

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:py-28">
        <SectionTag index="01" label="About Me" />

        {/* heading */}
        <h2 className="mt-6 font-xwide text-[9vw] font-extrabold uppercase leading-[1.02] tracking-[-0.015em] sm:text-[6vw] lg:text-[3.8vw]">
          <LineReveal>Building practical</LineReveal>
          <LineReveal delay={0.08}>
            web{" "}
            <span className="serif-it font-normal normal-case text-accent">
              experiences
            </span>
            <span className="text-accent">.</span>
          </LineReveal>
        </h2>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ================= LEFT: narrative ================= */}
          <div>
            <Reveal>
              <p className="text-[15px] leading-[1.85] text-ink2 sm:text-base">
                I'm <strong className="font-semibold text-ink">Yash Paradkar</strong>, a
                final-year Computer Engineering student and full-stack developer. I build
                responsive websites and web applications, combining clean interfaces with
                backend functionality.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-[1.85] text-ink2 sm:text-base">
                My work includes e-commerce platforms, admin dashboards, and AI-powered
                conversational tools. Through projects such as{" "}
                <strong className="font-semibold text-ink">Jewel Bot</strong> and{" "}
                <strong className="font-semibold text-ink">Bizleap Marketplace</strong>,
                I've gained practical experience in frontend development, authentication,
                API integration, and database connectivity.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[15px] leading-[1.85] text-ink2 sm:text-base">
                I focus on making applications easy to use, responsive across devices, and
                straightforward to maintain.
              </p>
            </Reveal>

            <Reveal
              delay={0.26}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <button
                onClick={() => scrollTo("#work")}
                className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-[13px] font-bold text-accent-ink transition-colors duration-300 hover:bg-accent-deep"
              >
                View My Projects
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
              <a
                href="/Yash_Paradkar_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                download="Yash_Paradkar_Resume.pdf"
                className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg border border-line-strong px-6 py-3.5 text-[13px] font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
              >
                Download Resume
                <Download
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </Reveal>

            {/* quick facts */}
            <div className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Quick Facts
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {QUICK_FACTS.map((f, i) => (
                  <Reveal key={f.title} delay={0.1 + i * 0.08} y={28}>
                    <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-[translate,border-color] duration-500 hover:-translate-y-1 hover:border-line-strong">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-[10deg]">
                          <f.icon size={17} strokeWidth={1.8} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                          0{i + 1}
                        </span>
                      </div>
                      <p className="mt-4 text-[15px] font-bold leading-tight text-ink">
                        {f.cgpa ? (
                          <>
                            <CountUp value={8.66} decimals={2} className="text-accent" />
                            /10 CGPA
                          </>
                        ) : (
                          f.title
                        )}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                        {f.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT: experience + education ================= */}
          <div className="flex flex-col gap-5">
            {/* Experience */}
            <Reveal delay={0.12} y={44}>
              <article className="group rounded-[24px] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft">
                      <Briefcase size={14} strokeWidth={1.8} />
                    </span>
                    Experience
                  </p>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted">
                    June 2026 – Present
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                  Web Development Intern
                </h3>
                <p className="serif-it mt-1 text-[16px] text-ink2">Bizleap Technologies</p>

                <ul className="mt-5 flex flex-col gap-3">
                  {EXPERIENCE_BULLETS.map((b) => (
                    <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-ink2">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {EXPERIENCE_STACK.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-surface2 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink2 transition-colors group-hover:border-line-strong"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>

            {/* Education */}
            <Reveal delay={0.22} y={44}>
              <article className="group rounded-[24px] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[var(--shadow)] sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft">
                      <GraduationCap size={14} strokeWidth={1.8} />
                    </span>
                    Education
                  </p>
                  <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted">
                    Expected 2027
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
                  B.Tech, Computer Engineering
                </h3>
                <p className="serif-it mt-1 text-[16px] text-ink2">GH Raisoni University</p>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-xwide text-3xl font-black text-accent">
                    <CountUp value={8.66} decimals={2} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    / 10 current CGPA
                  </span>
                </div>

                <p className="mt-4 border-t border-line pt-4 text-[13.5px] leading-relaxed text-ink2">
                  <span className="font-semibold text-ink">Relevant coursework:</span> Data
                  Structures &amp; Algorithms, Database Management Systems.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
