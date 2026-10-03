import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = "a,button,[data-hover],input,textarea,label";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });

  useEffect(() => {
    /* position: rAF-throttled, writes straight to motion values —
       no React state, so mousemove never triggers a re-render */
    let frame = 0;
    let px = -200;
    let py = -200;

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        x.set(px);
        y.set(py);
      });
    };

    /* hover detection only on element boundary crossings, not per pixel */
    const resolve = (el: Element | null) => {
      const t = el?.closest(INTERACTIVE) as HTMLElement | null;
      setHovering((prev) => (prev === !!t ? prev : !!t));
      const next = t?.getAttribute("data-cursor") ?? null;
      setLabel((prev) => (prev === next ? prev : next));
    };

    const onOver = (e: MouseEvent) => resolve(e.target as Element | null);
    const onOut = (e: MouseEvent) => resolve(e.relatedTarget as Element | null);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setHovering(false);
      setLabel(null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const size = label ? 84 : hovering ? 54 : 34;

  return (
    <>
      {/* dot — follows the pointer 1:1 */}
      <motion.div
        className="cursor-el pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-ink"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* trailing ring — springs behind, morphs on interactive targets */}
      <motion.div
        className="cursor-el pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: size,
          backgroundColor: label
            ? "var(--accent)"
            : hovering
              ? "var(--accent-soft)"
              : "transparent",
          border: `1px solid ${label ? "var(--accent)" : "var(--line-strong)"}`,
          scale: pressed ? 0.82 : 1,
        }}
      >
        {label && (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
