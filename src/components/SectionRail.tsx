import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollTo } from "../lib/scroll";
import { EASE } from "./fx";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/* fixed right-edge rail: tracks the active section, click to jump */
export default function SectionRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="pointer-events-auto fixed right-5 top-1/2 z-[95] hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(`#${s.id}`)}
            data-hover
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 10,
              }}
              transition={{ duration: 0.45, ease: EASE }}
              className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink2 group-hover:opacity-100 group-hover:translate-x-0"
            >
              {s.label}
            </motion.span>
            <span className="relative flex h-[3px] items-center justify-end">
              <motion.span
                className="block rounded-full bg-accent"
                animate={{ width: isActive ? 34 : 14, opacity: isActive ? 1 : 0.4 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ height: 3 }}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
