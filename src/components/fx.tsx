import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  animate,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

export const EASE = [0.76, 0, 0.24, 1] as const;

/* ----------------------------------------------------------------
   SplitChars — character stagger mask reveal
----------------------------------------------------------------- */
export function SplitChars({
  text,
  className = "",
  charClass = "",
  delay = 0,
  stagger = 0.024,
  once = true,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  charClass?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "span" | "div";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  const chars = Array.from(text);
  const MTag = motion[Tag as "span"] as typeof motion.span;

  return (
    <MTag ref={ref} className={`inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {chars.map((c, i) => (
          <span key={i} className="mask-line inline-block align-baseline">
            <motion.span
              className={`inline-block ${charClass}`}
              initial={{ y: "115%", rotate: 4 }}
              animate={inView ? { y: "0%", rotate: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          </span>
        ))}
      </span>
    </MTag>
  );
}

/* ----------------------------------------------------------------
   LineReveal — whole-line mask rise (huge headings)
----------------------------------------------------------------- */
export function LineReveal({
  children,
  delay = 0,
  className = "",
  duration = 1,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <span ref={ref} className={`mask-line ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={inView ? { y: "0%" } : undefined}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ----------------------------------------------------------------
   Reveal — soft rise + fade
----------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   Scramble — decode-on-view text effect
----------------------------------------------------------------- */
const GLYPHS = "abcdefghijklmnopqrstuvwxyzABCDEFGH#@%&*+=<>/";

export function Scramble({
  text,
  className = "",
  speed = 28,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [out, setOut] = useState(text.replace(/./g, "\u00A0"));

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      const total = text.length;
      interval = setInterval(() => {
        frame++;
        const solved = Math.floor(frame / 2.2);
        let next = "";
        for (let i = 0; i < total; i++) {
          if (i < solved) next += text[i];
          else if (text[i] === " ") next += " ";
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(next);
        if (solved >= total) {
          setOut(text);
          clearInterval(interval);
        }
      }, speed);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [inView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/* ----------------------------------------------------------------
   SectionTag — mono eyebrow with rule + scramble
----------------------------------------------------------------- */
export function SectionTag({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`} y={16}>
      <span className="font-mono text-[11px] tracking-[0.25em] text-accent">
        {index}
      </span>
      <span className="h-px w-14 bg-line-strong" />
      <Scramble
        text={label}
        className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink2"
      />
    </Reveal>
  );
}

/* ----------------------------------------------------------------
   Magnetic — physics hover attraction
----------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------
   CountUp — number animation on view
----------------------------------------------------------------- */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 1.8,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate<number>(0, value, {
      duration,
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------
   RollText — two-label roll hover (nav links, buttons)
----------------------------------------------------------------- */
export function RollText({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`roll ${className}`}>
      <span>{label}</span>
      <span aria-hidden>{label}</span>
    </span>
  );
}

/* ----------------------------------------------------------------
   BrushStroke — hand-drawn underline that paints on view
----------------------------------------------------------------- */
export function BrushStroke({
  className = "",
  delay = 0.55,
  style,
}: {
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 220 22"
      fill="none"
      className={className}
      style={style}
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M4 15 C 40 6, 90 4, 118 8 C 150 12, 196 10, 216 6"
        stroke="var(--accent)"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      />
    </svg>
  );
}

/* ----------------------------------------------------------------
   useParallax — scroll-linked motion value
----------------------------------------------------------------- */
export function useParallax(distance = 60): { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<number> } {
  return useParallaxInner(distance);
}

function useParallaxInner(distance: number) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

/* ----------------------------------------------------------------
   container/item variants helpers
----------------------------------------------------------------- */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
