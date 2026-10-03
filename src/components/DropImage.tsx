import { ImagePlus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_BYTES = 12 * 1024 * 1024;
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/* Session-scoped registry so a dropped image survives remounts
   but is never persisted to disk or storage. */
const registry = new Map<string, string>();

export default function DropImage({
  slot,
  src,
  alt,
  className = "",
  overlay = true,
}: {
  /** stable id — ties the drop target to one specific slot on the page */
  slot: string;
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}) {
  const [dropped, setDropped] = useState<string | null>(() => registry.get(slot) ?? null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const active = dropped ?? src;

  const accept = useCallback(
    (file: File | undefined | null) => {
      if (!file) return;
      if (!OK_TYPES.includes(file.type)) {
        setError("JPG, PNG, WebP or AVIF only.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Over 12 MB — compress first.");
        return;
      }
      const url = URL.createObjectURL(file);
      registry.set(slot, url);
      setDropped(url);
      setError(null);
    },
    [slot],
  );

  useEffect(() => {
    return () => {
      /* revoke only when the whole page unmounts, not on slot change */
    };
  }, []);

  return (
    <div
      className={`group relative h-full w-full overflow-hidden ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        accept(e.dataTransfer.files?.[0]);
      }}
    >
      <img
        key={active}
        src={active}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />

      {/* subtle always-visible affordance on the corner */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
        aria-label={`Replace ${alt} image`}
        title="Replace this image"
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-black/80 focus-visible:opacity-100 group-hover:opacity-100"
      >
        <ImagePlus size={15} strokeWidth={1.8} />
      </button>

      {dragging && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/55 text-center backdrop-blur-sm">
          <div>
            <ImagePlus size={26} className="mx-auto text-accent" />
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
              Drop to replace
            </p>
          </div>
        </div>
      )}

      {error && (
        <div
          className="absolute inset-x-2 bottom-2 rounded-lg bg-black/75 px-3 py-2 text-center font-mono text-[10px] text-white backdrop-blur-md"
          onClick={() => setError(null)}
        >
          {error}
        </div>
      )}

      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      )}

      <input
        ref={inputRef}
        type="file"
        accept={OK_TYPES.join(",")}
        className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />
    </div>
  );
}
