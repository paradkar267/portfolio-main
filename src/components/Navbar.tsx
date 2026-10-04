import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, FileText, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SOCIALS } from "../data/content";
import { useTheme } from "../hooks/useTheme";
import { scrollTo } from "../lib/scroll";
import { EASE, Magnetic, RollText } from "./fx";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResumeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-[100]"
      >
        <div
          className={`bg-anim mx-auto relative flex max-w-[1600px] items-center justify-between px-5 py-4 transition-[background-color,border-color] duration-500 sm:px-8 ${
            scrolled ? "border-b border-line" : "border-b border-transparent"
          }`}
          style={scrolled ? { background: "var(--nav-bg)" } : undefined}
        >
          {/* Mobile Resume CTA - Left side */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setResumeOpen(true)}
              data-hover
              className="group flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
            >
              <FileText size={13} />
              Resume
            </button>
          </div>

          {/* Desktop links - centered in navbar */}
          <nav className="hidden items-center gap-9 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {NAV_LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group flex items-baseline gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink2 transition-colors hover:text-ink"
                data-hover
              >
                <span className="font-mono text-[9px] text-accent">0{i + 1}</span>
                <RollText label={l.label} />
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
            {/* Theme toggle */}
            <Magnetic strength={0.3}>
              <button
                onClick={(e) => toggle(e.clientX, e.clientY)}
                aria-label="Toggle theme"
                data-hover
                className="bg-anim relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line bg-surface transition-colors hover:border-line-strong"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ y: 16, opacity: 0, rotate: -60 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -16, opacity: 0, rotate: 60 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="grid place-items-center"
                  >
                    {theme === "light" ? (
                      <Moon size={16} strokeWidth={1.8} />
                    ) : (
                      <Sun size={16} strokeWidth={1.8} />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>

            {/* Desktop Resume CTA */}
            <div className="hidden lg:block">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => setResumeOpen(true)}
                  data-hover
                  className="group flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
                >
                  <FileText size={14} />
                  Resume
                </button>
              </Magnetic>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            >
              <Menu size={17} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col bg-ink text-bg"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <span className="font-xwide text-[13px] font-extrabold uppercase tracking-[0.14em]">
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-bg/25"
              >
                <X size={17} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {NAV_LINKS.map((l, i) => (
                <div key={l.href} className="mask-line">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.06 }}
                    onClick={() => go(l.href)}
                    className="group flex items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    <span className="font-xwide text-5xl font-black uppercase leading-none tracking-tight transition-colors group-hover:text-accent sm:text-6xl">
                      {l.label}
                    </span>
                  </motion.button>
                </div>
              ))}

              <div className="mask-line mt-4">
                <motion.button
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
                  onClick={() => {
                    setOpen(false);
                    setResumeOpen(true);
                  }}
                  className="flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-ink"
                >
                  <FileText size={16} /> View Resume
                </motion.button>
              </div>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 border-t border-bg/15 px-6 py-6"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="u-sweep font-mono text-[11px] uppercase tracking-[0.2em] text-bg/70"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md"
            onClick={() => setResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 bg-surface">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <FileText size={18} />
                  </span>
                  <div>
                    <h3 className="font-headline text-sm font-bold text-ink">
                      Yash Paradkar — Resume
                    </h3>
                    <p className="font-mono text-[10px] text-muted">
                      Full-Stack Developer &amp; AI Product Builder
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/Yash_Paradkar_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:border-line-strong hover:bg-surface2"
                  >
                    <ExternalLink size={13} /> Open
                  </a>
                  <a
                    href="/Yash_Paradkar_Resume.pdf"
                    download="Yash_Paradkar_Resume.pdf"
                    className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-ink transition-colors hover:bg-accent-deep"
                  >
                    <Download size={13} /> Download
                  </a>
                  <button
                    onClick={() => setResumeOpen(false)}
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink2 transition-colors hover:bg-surface2 hover:text-ink"
                    aria-label="Close resume viewer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="h-full w-full bg-[#1e1e1e] overflow-hidden">
                <iframe
                  src="/Yash_Paradkar_Resume.pdf"
                  title="Yash Paradkar Resume"
                  className="h-full w-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
