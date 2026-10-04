import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Code2,
  Cpu,
  Globe,
  Layers,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS, type Project } from "../data/content";
import { scrollTo } from "../lib/scroll";
import { EASE, LineReveal, Reveal, SectionTag } from "./fx";
import DropImage from "./DropImage";

/* ---------------------------------------------------------------- */
/* Project Card                                                      */
/* ---------------------------------------------------------------- */
function ProjectCard({
  project,
  large = false,
  onOpen,
}: {
  project: Project;
  large?: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
      data-cursor="View"
      onClick={() => onOpen(project)}
      className="bg-anim group relative flex cursor-pointer flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[var(--shadow)]"
    >
      <div className={`relative overflow-hidden bg-surface2 aspect-[16/10]`}>
        <DropImage slot={project.id} src={project.image} alt={project.title} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90" />

        {/* chips */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {project.category}
          </span>
          <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-[9.5px] tabular-nums tracking-[0.16em] text-white backdrop-blur-md">
            {project.year}
          </span>
        </div>

        {/* hover action */}
        <div className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-accent text-accent-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">
          <ArrowUpRight size={17} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className={`font-xwide font-extrabold uppercase leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent ${
            large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>

        {/* stack preview */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-md border border-line bg-surface2 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink2"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-1 py-1 font-mono text-[9.5px] text-muted">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink2 transition-colors group-hover:text-accent">
            View case study
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${project.title} source code on GitHub`}
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                <Code2 size={11} />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${project.title} live deployment`}
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                <Globe size={11} />
                Live
                <ArrowUpRight size={11} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------------- */
/* Modal                                                             */
/* ---------------------------------------------------------------- */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);

    const el = modalRef.current;
    if (el) {
      el.focus();
      const stopProp = (e: Event) => {
        // Prevent global Lenis on window from capturing or canceling the wheel/touch event
        e.stopPropagation();
      };
      el.addEventListener("wheel", stopProp, { passive: true });
      el.addEventListener("touchmove", stopProp, { passive: true });
      return () => {
        document.body.style.overflow = "";
        lenis?.start();
        window.removeEventListener("keydown", esc);
        el.removeEventListener("wheel", stopProp);
        el.removeEventListener("touchmove", stopProp);
      };
    }

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      className="fixed inset-0 z-[130] flex items-end justify-center p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ y: 72, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 56, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE }}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onClick={(e) => e.stopPropagation()}
        className="bg-anim relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[24px] border border-line bg-surface sm:rounded-[24px] shadow-2xl outline-none"
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          touchAction: "pan-y",
        }}
      >
        <div className="relative">
          <div className="aspect-[16/9] w-full overflow-hidden bg-surface2 max-h-[360px]">
            <DropImage slot={`modal-${project.id}`} src={project.image} alt={project.title} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <button
            onClick={onClose}
            data-hover
            aria-label="Close project modal"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform duration-300 hover:rotate-90 hover:bg-black/80"
          >
            <X size={17} />
          </button>
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/80">
                {project.category} · {project.year}
              </p>
              <h3 className="font-xwide mt-1.5 text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3.5xl">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-5 sm:grid-cols-[1.6fr_1fr] sm:p-8">
          <div className="flex flex-col gap-6">
            {/* Overview */}
            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-accent font-semibold">
                Overview &amp; Purpose
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.8] text-ink2">{project.long}</p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="rounded-2xl border border-line bg-surface2/60 p-5">
                <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent font-semibold">
                  <Sparkles size={13} /> Key Highlights &amp; Features
                </p>
                <ul className="mt-3.5 flex flex-col gap-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink2">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Architecture */}
            {project.architecture && (
              <div className="rounded-2xl border border-line bg-surface2/60 p-5">
                <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted font-semibold">
                  <Cpu size={13} /> Architecture &amp; Implementation
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink2">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-3 pt-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3 text-[12px] font-bold text-accent-ink transition-colors duration-300 hover:bg-accent-deep"
                >
                  <Globe size={14} />
                  Visit Live Site
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-lg border border-line-strong px-5 py-3 text-[12px] font-bold text-ink transition-colors duration-300 hover:bg-surface2 hover:border-ink"
                >
                  <Code2 size={14} />
                  View GitHub Source
                  <ArrowUpRight size={14} />
                </a>
              )}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const target = document.getElementById("contact");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 rounded-lg border border-line px-5 py-3 text-[12px] font-medium text-muted transition-colors duration-300 hover:text-ink hover:border-line-strong"
              >
                Discuss a similar build
              </a>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">
            {/* Meta info box */}
            <div className="rounded-2xl border border-line bg-surface2 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                <User size={12} /> Project Context
              </p>
              <div className="mt-3.5 flex flex-col gap-3 font-mono text-[11px]">
                {project.role && (
                  <div>
                    <span className="text-muted block text-[9.5px] uppercase tracking-[0.14em]">Role</span>
                    <span className="font-semibold text-ink">{project.role}</span>
                  </div>
                )}
                {project.client && (
                  <div>
                    <span className="text-muted block text-[9.5px] uppercase tracking-[0.14em]">Client / Entity</span>
                    <span className="font-semibold text-ink">{project.client}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted block text-[9.5px] uppercase tracking-[0.14em]">Category</span>
                  <span className="font-semibold text-ink">{project.category}</span>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="rounded-2xl border border-line bg-surface2 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                <Layers size={12} /> Tech Stack &amp; Tools
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-line bg-surface2 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                <Calendar size={12} /> Timeline &amp; Status
              </p>
              <p className="font-xwide mt-2 text-xl font-extrabold text-ink">
                {project.year}
              </p>
              <p className="mt-1 text-[11.5px] text-muted">
                {project.live ? "Shipped live to production" : "Verified engineering build"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Filter pills                                                      */
/* ---------------------------------------------------------------- */
function FilterBar({
  categories,
  active,
  onChange,
}: {
  categories: { label: string; count: number }[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((c) => {
        const isActive = active === c.label;
        return (
          <button
            key={c.label}
            onClick={() => onChange(c.label)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
              isActive
                ? "border-ink bg-ink text-bg"
                : "border-line text-ink2 hover:border-line-strong hover:text-ink"
            }`}
          >
            {c.label}
            <span
              className={`grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[9px] tabular-nums ${
                isActive ? "bg-accent text-accent-ink" : "bg-surface2 text-muted"
              }`}
            >
              {c.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Section                                                           */
/* ---------------------------------------------------------------- */
const INITIAL_COUNT = 3;

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => {
    const types = Array.from(new Set(PROJECTS.map((p) => p.type)));
    return [
      { label: "All", count: PROJECTS.length },
      ...types.map((t) => ({
        label: t,
        count: PROJECTS.filter((p) => p.type === t).length,
      })),
    ];
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter)),
    [filter],
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const handleFilter = (c: string) => {
    setFilter(c);
    setShowAll(false);
  };

  const toggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      scrollTo("#work");
    } else {
      setShowAll(true);
    }
  };

  return (
    <section id="work" className="relative">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag index="03" label="Selected Projects 2025–2026" />
            <h2 className="mt-5 font-xwide text-[8vw] font-extrabold uppercase leading-[1] tracking-[-0.015em] sm:text-[5.5vw] lg:text-[3.4vw]">
              <LineReveal>Work that</LineReveal>
              <LineReveal delay={0.08}>
                <span className="serif-it font-normal normal-case text-accent">ships</span>{" "}
                &amp; speaks<span className="text-accent">.</span>
              </LineReveal>
            </h2>
          </div>

          {/* compact meta row — quiet, not loud */}
          <Reveal
            delay={0.12}
            className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="flex items-baseline gap-2">
              <span className="font-xwide text-2xl font-bold tabular-nums leading-none text-accent">
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              delivered
            </span>
            <span className="h-6 w-px bg-line" aria-hidden />
            <span className="flex items-baseline gap-2">
              <span className="font-xwide text-2xl font-bold leading-none">100%</span>
              shipped live
            </span>
          </Reveal>
        </div>

        {/* filter tabs */}
        <Reveal delay={0.2} className="mt-8">
          <FilterBar categories={categories} active={filter} onChange={handleFilter} />
        </Reveal>

        {/* grid — always a clean uniform 3-column layout, 3 cards to start */}
        <div className="mt-7">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center font-mono text-sm uppercase tracking-[0.2em] text-muted"
              >
                No projects in this category yet.
              </motion.p>
            ) : (
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((p) => (
                  <ProjectCard key={p.id} project={p} onOpen={setActive} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* view more / view less toggle */}
        {filtered.length > INITIAL_COUNT && (
          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <button
              onClick={toggleShowAll}
              data-hover
              className="group flex items-center gap-3 rounded-full border border-line-strong px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
            >
              {showAll ? "View less" : `View more projects`}
              {!showAll && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-ink">
                  +{hiddenCount}
                </span>
              )}
              <ArrowRight
                size={14}
                className={`transition-transform duration-300 ${
                  showAll ? "-rotate-90" : "rotate-90 group-hover:translate-x-0.5"
                }`}
              />
            </button>
          </Reveal>
        )}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
