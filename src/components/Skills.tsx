import { motion } from "framer-motion";
import {
  BrainCircuit,
  Database,
  MonitorSmartphone,
  TerminalSquare,
} from "lucide-react";
import { SKILL_GROUPS } from "../data/content";
import BrandIcon from "./BrandIcon";
import { LineReveal, Reveal, SectionTag, staggerContainer, riseItem } from "./fx";

const ICONS = [MonitorSmartphone, Database, BrainCircuit, TerminalSquare];

export default function Skills() {
  return (
    <section id="skills" className="relative">
      {/* ribbon divider */}
      <div className="overflow-hidden border-y border-line bg-surface2 py-3.5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex w-max marquee-track"
          style={{ "--marquee-dur": "34s" } as React.CSSProperties}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={`mx-8 font-mono text-[11px] uppercase tracking-[0.34em] ${
                i % 2 ? "text-muted" : "text-accent"
              }`}
            >
              My Toolkit — Technical Mastery
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag index="02" label="Capabilities &amp; Stack" />
            <h2 className="mt-5 font-xwide text-[8vw] font-extrabold uppercase leading-[1] tracking-[-0.015em] sm:text-[5.5vw] lg:text-[3.4vw]">
              <LineReveal>The craft</LineReveal>
              <LineReveal delay={0.08}>
                behind the{" "}
                <span className="serif-it font-normal normal-case text-accent">code</span>
                <span className="text-accent">.</span>
              </LineReveal>
            </h2>
          </div>

          {/* compact meta row — quiet, not loud */}
          <Reveal
            delay={0.12}
            className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="flex items-baseline gap-2">
              <span className="font-xwide text-2xl font-bold leading-none text-accent">
                15+
              </span>
              technologies
            </span>
            <span className="h-6 w-px bg-line" aria-hidden />
            <span className="flex items-baseline gap-2">
              <span className="font-xwide text-2xl font-bold leading-none">4</span>
              disciplines
            </span>
          </Reveal>
        </div>

        {/* ---------------- Category cards ---------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-9 grid gap-4 md:grid-cols-2"
        >
          {SKILL_GROUPS.map((group, gi) => {
            const Icon = ICONS[gi];
            return (
              <motion.div
                key={group.id}
                variants={riseItem}
                data-hover
                className="bg-anim group relative flex flex-col overflow-hidden rounded-[24px] border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow)]"
              >
                {/* header strip */}
                <div className="flex items-center gap-3.5 border-b border-line px-6 py-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-500 group-hover:-rotate-[10deg]">
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-xwide truncate text-[15px] font-extrabold uppercase leading-tight tracking-[0.01em]">
                      {group.title}
                    </h3>
                    <p className="serif-it truncate text-[13px] text-muted">{group.blurb}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.22em] text-muted">
                    /{group.id}
                  </span>
                </div>

                {/* skill chips — real brand marks, no arbitrary percentages */}
                <div className="flex flex-1 flex-wrap content-start gap-2 p-6">
                  {group.skills.map((s) => (
                    <span
                      key={s.name}
                      className="flex items-center gap-2 rounded-full border border-line bg-surface2 py-2 pl-2.5 pr-3.5 text-[12.5px] font-semibold text-ink2 transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink"
                    >
                      <BrandIcon name={s.name} className="h-4 w-4 shrink-0" />
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
