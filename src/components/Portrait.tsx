import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "./fx";

export default function Portrait({
  fallbackSrc = "/images/portrait.webp",
  alt = "Yash Paradkar",
  ready = true,
  children,
}: {
  fallbackSrc?: string;
  alt?: string;
  ready?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="relative">
      {/* ---------- FRAME ---------- */}
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={ready ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        style={{ willChange: "clip-path" }}
        className="group relative aspect-[3/4] w-full select-none overflow-hidden rounded-t-[999px] rounded-b-[28px] transition-shadow duration-300"
      >
        <img
          src={fallbackSrc}
          alt={alt}
          fetchPriority="high"
          decoding="async"
          width={380}
          height={507}
          draggable={false}
          className="h-full w-full origin-center object-cover will-change-transform"
          style={{
            transform: "translate(0%, 2%)",
            objectPosition: "center top",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/60 via-bg/20 to-transparent dark:from-black/50 dark:via-black/15" />

        {children}
      </motion.div>
    </div>
  );
}
