import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "./fx";

export default function Portrait({
  fallbackSrc = "/images/Clean%20natural%20skin%20portrait%20retouch.png",
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
        className="group relative aspect-[3/4] w-full select-none overflow-hidden rounded-t-[999px] rounded-b-[28px] transition-shadow duration-300"
      >

        <img
          src={fallbackSrc}
          alt={alt}
          decoding="async"
          draggable={false}
          className="h-full w-full origin-center object-cover will-change-transform"
          style={{
            transform: "translate(0%, 2%)",
            objectPosition: "center top",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

        {children}
      </motion.div>
    </div>
  );
}
