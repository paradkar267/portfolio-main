import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  /** pass the click coordinates to get a circular reveal centred on the toggle */
  toggle: (x?: number, y?: number) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

let themeTimer = 0;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem("yp-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("yp-theme", theme);
  }, [theme]);

  const flip = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  /* Cross-fade fallback is enabled only while switching, so the
     universal transition rule never exists during normal scrolling. */
  const fadeFallback = () => {
    const root = document.documentElement;
    window.clearTimeout(themeTimer);
    root.classList.add("theming");
    flip();
    themeTimer = window.setTimeout(() => root.classList.remove("theming"), 460);
  };

  /* Circular-reveal theme switch, centred on the toggle button, using the
     View Transitions API. Falls back to a plain cross-fade on browsers
     (and reduced-motion users) that don't support it. */
  const toggle = (x?: number, y?: number) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || x === undefined || y === undefined || reduceMotion) {
      fadeFallback();
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flip();
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {
        /* transition was skipped — theme already flipped, nothing else to do */
      });
  };

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
