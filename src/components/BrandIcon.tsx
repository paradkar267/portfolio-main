/* Minimal inline brand marks — colored, recognizable at a glance.
   Falls back to a neutral glyph for anything not mapped. */
export default function BrandIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const key = name.toLowerCase();

  if (key.includes("next"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <circle cx="12" cy="12" r="12" fill="currentColor" className="text-ink" />
        <path d="M8.5 7.5v9h2V10.8l5.8 5.7h1.7V7.5h-2v5.7L10.2 7.5z" fill="var(--bg)" />
      </svg>
    );
  if (key.includes("react"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00D8FF" strokeWidth={1.8} aria-hidden>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#00D8FF" />
      </svg>
    );
  if (key.includes("typescript"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <rect width="24" height="24" rx="5" fill="#3178C6" />
        <path
          d="M5 8h6v2H9v7H7v-7H5V8zm8.5 2.5c.7-.4 1.6-.6 2.5-.6 1.8 0 2.8.9 2.8 2.2 0 1.2-.7 1.9-2 2.3l-.8.3c-.8.3-1.1.6-1.1 1 0 .5.4.8 1.2.8.7 0 1.4-.2 1.9-.6v1.9c-.6.3-1.4.5-2.2.5-2 0-3.1-1-3.1-2.4 0-1.2.7-2 2-2.4l.8-.3c.7-.2 1-.5 1-.9 0-.4-.4-.7-1-.7-.6 0-1.3.2-1.8.5v-2.2z"
          fill="#fff"
        />
      </svg>
    );
  if (key.includes("javascript"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <rect width="24" height="24" rx="5" fill="#F7DF1E" />
        <path
          d="M8 12.5v4.5c0 1.3-.8 2-2.1 2-.7 0-1.4-.2-1.9-.5v-2c.4.3.8.5 1.3.5.5 0 .8-.2.8-.7v-4.3H8zm9.5 0c-.8 0-1.5.2-2.1.6v2c.5-.4 1-.6 1.6-.6.5 0 .8.2.8.5 0 .4-.3.6-.9.8l-.6.2c-1.3.5-1.9 1.1-1.9 2.3 0 1.5 1.1 2.2 2.7 2.2.8 0 1.6-.2 2.1-.5v-2c-.5.4-1.1.6-1.7.6-.6 0-.9-.2-.9-.6 0-.4.3-.6.9-.8l.6-.2c1.4-.5 2-1.2 2-2.4 0-1.5-1.1-2.1-2.6-2.1z"
          fill="#000"
        />
      </svg>
    );
  if (key.includes("tailwind"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#06B6D4" aria-hidden>
        <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 14.9 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.6 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.2-1.2-2.6-2.6-5.5-2.6z" />
      </svg>
    );
  if (key.includes("motion") || key.includes("gsap"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" aria-hidden>
        <path d="M3 17c3-8 6 8 9-8s6 8 9 0" />
      </svg>
    );
  if (key.includes("node"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#5FA04E" aria-hidden>
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
      </svg>
    );
  if (key.includes("express"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path d="M2 16s2-6 6-6 4 4 6 4 4-4 8-4" />
      </svg>
    );
  if (key.includes("postgres"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#336791" aria-hidden>
        <path d="M12 2a9.5 9.5 0 0 0-3.2 18.4c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.7.9.7 1.9V20c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2z" />
      </svg>
    );
  if (key.includes("mongo"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#13AA52" aria-hidden>
        <path d="M12 1.5s-4.5 4.8-4.5 9.5c0 3 1.8 5.6 4.5 7 2.7-1.4 4.5-4 4.5-7 0-4.7-4.5-9.5-4.5-9.5z" />
      </svg>
    );
  if (key.includes("rest") || key.includes("api"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="var(--accent)" strokeWidth={1.8} aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  if (key.includes("jwt") || key.includes("auth"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  if (key.includes("gemini") || key.includes("llm"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <path d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12z" fill="url(#g1)" />
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E82EE" />
            <stop offset="50%" stopColor="#9B72CF" />
            <stop offset="100%" stopColor="#E25141" />
          </linearGradient>
        </defs>
      </svg>
    );
  if (key.includes("rag"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="11.5" cy="14.5" r="2.5" />
        <line x1="13.3" y1="16.3" x2="16" y2="19" />
      </svg>
    );
  if (key.includes("langchain"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden>
        <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
      </svg>
    );
  if (key.includes("vector"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden>
        <path d="M4 20 18 6M18 6H9M18 6v9" />
      </svg>
    );
  if (key.includes("python"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#3776AB" aria-hidden>
        <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h5.9v.9H6.7S4.8 5.4 4.8 8.6c0 3.1 1.7 3.3 1.7 3.3h1v-1.6s-.1-1.9 1.9-1.9h5.8s1.8 0 1.8-1.8V4.8s.3-2.8-5.1-2.8zm-1.6 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm1.8 18.8c3.1 0 2.9-1.3 2.9-1.3v-1.4H9.1v-.9h8.2s1.9.2 1.9-3c0-3.1-1.7-3.3-1.7-3.3h-1v1.6s.1 1.9-1.9 1.9H8.8s-1.8 0-1.8 1.8v1.8s-.3 2.8 5.1 2.8zm1.6-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
      </svg>
    );
  if (key.includes("pandas") || key.includes("numpy"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <rect x="3" y="12" width="4" height="9" rx="1" />
        <rect x="10" y="7" width="4" height="14" rx="1" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    );
  if (key.includes("git"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    );
  if (key.includes("vercel"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <polygon points="12 2 24 22 0 22" />
      </svg>
    );
  if (key.includes("postman"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path d="M15.5 8.5l-6 3.5 6 3.5v-7z" fill="#fff" />
      </svg>
    );
  if (key.includes("linux") || key.includes("bash"))
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3 3-3 3M13 15h4" />
      </svg>
    );
  if (key.includes("figma"))
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <circle cx="9" cy="5" r="3" fill="#F24E1E" />
        <circle cx="9" cy="12" r="3" fill="#A259FF" />
        <circle cx="9" cy="19" r="3" fill="#0ACF83" />
        <circle cx="15" cy="5" r="3" fill="#FF7262" />
        <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
      </svg>
    );

  /* fallback — neutral dot */
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="6" fill="currentColor" className="text-accent" />
    </svg>
  );
}
