/* Minimal ambient types for the View Transitions API — not yet part of
   TypeScript's bundled DOM lib in this project's target. */
interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
}

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition;
}
