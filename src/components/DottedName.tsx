import { useCallback, useRef, useState } from "react";
import { scrollTo } from "../lib/scroll";

export default function DottedName() {
  const [isHovered, setIsHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setMouse({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      setIsHovered(true);
    }
  };

  const handleClick = () => {
    scrollTo("#home");
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsHovered(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1800)}
      onClick={handleClick}
      data-hover
      data-cursor="Top ↑"
      title="Click to return to top"
      aria-label="Yash Paradkar — click to return to top"
      className="group relative my-6 sm:my-10 w-full cursor-pointer select-none py-2 sm:py-6"
    >
      {/* ambient background radial glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 blur-3xl"
        style={{
          opacity: isHovered ? 0.8 : 0,
          background: `radial-gradient(circle 420px at ${mouse.x}% ${mouse.y}%, var(--accent-soft), transparent 70%)`,
        }}
      />

      {/* Eyebrow attribution */}
      <div className="flex items-center justify-center gap-3 mb-3 sm:mb-5">
        <span className="h-px w-6 sm:w-12 bg-line transition-colors duration-500 group-hover:bg-accent/40" aria-hidden />
        <p className="font-mono text-[10px] sm:text-[11.5px] uppercase tracking-[0.32em] text-muted transition-colors duration-500 group-hover:text-accent font-medium">
          Designed &amp; Developed by
        </p>
        <span className="h-px w-6 sm:w-12 bg-line transition-colors duration-500 group-hover:bg-accent/40" aria-hidden />
      </div>

      {/* ================= DESKTOP SVG (Single Line, Full Width) ================= */}
      <div className="hidden md:block w-full">
        <svg
          viewBox="0 0 1800 220"
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            {/* neutral dot pattern (base state) */}
            <pattern
              id="dot-pattern-desktop-base"
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5.5" cy="5.5" r="2.2" fill="currentColor" opacity="0.32" />
            </pattern>

            {/* vibrant multi-stop glowing gradient */}
            <linearGradient id="dot-gradient-desktop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3E6C" />
              <stop offset="25%" stopColor="#FF6B00" />
              <stop offset="50%" stopColor="#FFAA00" />
              <stop offset="75%" stopColor="#FF4D2D" />
              <stop offset="100%" stopColor="#9B51E0" />
            </linearGradient>

            {/* illuminated colored dot pattern */}
            <pattern
              id="dot-pattern-desktop-color"
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="5.5" cy="5.5" r="2.8" fill="url(#dot-gradient-desktop)" />
            </pattern>

            {/* flashlight / spotlight mask following cursor */}
            <radialGradient
              id="spotlight-desktop"
              cx={`${mouse.x}%`}
              cy={`${mouse.y}%`}
              r="24%"
              fx={`${mouse.x}%`}
              fy={`${mouse.y}%`}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <mask id="mask-spotlight-desktop">
              <rect width="100%" height="100%" fill="url(#spotlight-desktop)" />
            </mask>
          </defs>

          {/* Layer 1: Base monochrome dots (always visible) */}
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="central"
            textLength="1540"
            lengthAdjust="spacing"
            fill="url(#dot-pattern-desktop-base)"
            className="text-ink font-xwide font-black"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "120px",
              fontWeight: 900,
              fontVariationSettings: "'wdth' 125",
            }}
          >
            YASH PARADKAR
          </text>

          {/* Layer 2: Ambient colored glow across the name on hover */}
          <g
            style={{
              opacity: isHovered ? 0.35 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="1540"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-desktop-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "120px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              YASH PARADKAR
            </text>
          </g>

          {/* Layer 3: High-intensity spotlight following cursor */}
          <g
            mask="url(#mask-spotlight-desktop)"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.25s ease",
              filter: "drop-shadow(0 0 16px rgba(255, 107, 0, 0.6))",
            }}
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="1540"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-desktop-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "120px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              YASH PARADKAR
            </text>
          </g>
        </svg>
      </div>

      {/* ================= MOBILE SVG (Two-Line Stacked, Fully Responsive) ================= */}
      <div className="block md:hidden w-full">
        <svg
          viewBox="0 0 700 280"
          className="w-full h-auto overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            {/* neutral dot pattern (base state) */}
            <pattern
              id="dot-pattern-mobile-base"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4.5" cy="4.5" r="2" fill="currentColor" opacity="0.32" />
            </pattern>

            {/* vibrant multi-stop glowing gradient */}
            <linearGradient id="dot-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF3E6C" />
              <stop offset="30%" stopColor="#FF6B00" />
              <stop offset="60%" stopColor="#FFAA00" />
              <stop offset="100%" stopColor="#9B51E0" />
            </linearGradient>

            {/* illuminated colored dot pattern */}
            <pattern
              id="dot-pattern-mobile-color"
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4.5" cy="4.5" r="2.7" fill="url(#dot-gradient-mobile)" />
            </pattern>

            {/* spotlight for mobile touch/hover */}
            <radialGradient
              id="spotlight-mobile"
              cx={`${mouse.x}%`}
              cy={`${mouse.y}%`}
              r="38%"
              fx={`${mouse.x}%`}
              fy={`${mouse.y}%`}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            <mask id="mask-spotlight-mobile">
              <rect width="100%" height="100%" fill="url(#spotlight-mobile)" />
            </mask>
          </defs>

          {/* Layer 1: Base monochrome dots (always visible) */}
          <text
            x="50%"
            y="32%"
            textAnchor="middle"
            dominantBaseline="central"
            textLength="360"
            lengthAdjust="spacing"
            fill="url(#dot-pattern-mobile-base)"
            className="text-ink font-xwide font-black"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "96px",
              fontWeight: 900,
              fontVariationSettings: "'wdth' 125",
            }}
          >
            YASH
          </text>
          <text
            x="50%"
            y="74%"
            textAnchor="middle"
            dominantBaseline="central"
            textLength="560"
            lengthAdjust="spacing"
            fill="url(#dot-pattern-mobile-base)"
            className="text-ink font-xwide font-black"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "84px",
              fontWeight: 900,
              fontVariationSettings: "'wdth' 125",
            }}
          >
            PARADKAR
          </text>

          {/* Layer 2: Ambient colored glow on touch/hover */}
          <g
            style={{
              opacity: isHovered ? 0.35 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            <text
              x="50%"
              y="32%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="360"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-mobile-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "96px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              YASH
            </text>
            <text
              x="50%"
              y="74%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="560"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-mobile-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "84px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              PARADKAR
            </text>
          </g>

          {/* Layer 3: High-intensity spotlight on touch/hover */}
          <g
            mask="url(#mask-spotlight-mobile)"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.25s ease",
              filter: "drop-shadow(0 0 16px rgba(255, 107, 0, 0.6))",
            }}
          >
            <text
              x="50%"
              y="32%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="360"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-mobile-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "96px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              YASH
            </text>
            <text
              x="50%"
              y="74%"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="560"
              lengthAdjust="spacing"
              fill="url(#dot-pattern-mobile-color)"
              className="font-xwide font-black"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "84px",
                fontWeight: 900,
                fontVariationSettings: "'wdth' 125",
              }}
            >
              PARADKAR
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
