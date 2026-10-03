/* keeps section headings clear of the fixed navbar when jumping to them */
const NAV_OFFSET = 84;

export function scrollTo(target: string) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.5,
      offset: -NAV_OFFSET,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
