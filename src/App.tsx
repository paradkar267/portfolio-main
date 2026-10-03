import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SectionRail from "./components/SectionRail";
import Skills from "./components/Skills";
import Work from "./components/Work";
import { ThemeProvider } from "./hooks/useTheme";

/* thin accent scroll-progress rail pinned to the top edge */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[105] h-[2px] origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}

/* fixed ambient paper layer — dot grid + warm vignette, merged into two
   composited layers instead of three to cut per-frame fill cost */
function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div className="dot-grid absolute inset-0 opacity-[0.22]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, var(--accent-soft), transparent 55%), radial-gradient(90% 60% at 100% 100%, rgba(185,138,47,0.1), transparent 60%)",
        }}
      />
    </div>
  );
}

export default function App() {
  /* Lenis buttery smooth scroll */
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-anim relative min-h-screen bg-bg text-ink">
        <Ambient />
        <Cursor />
        <div className="grain" aria-hidden />
        <ScrollProgress />

        <Navbar />
        <SectionRail />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Work />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}
