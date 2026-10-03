import { Asterisk } from "lucide-react";
import { Fragment } from "react";

export default function Marquee({
  items,
  duration = 30,
  reverse = false,
  className = "",
  itemClass = "",
  outline = false,
  iconClass = "text-accent",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClass?: string;
  outline?: boolean;
  iconClass?: string;
}) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item, i) => (
        <Fragment key={`${key}-${i}`}>
          <span
            className={`mx-6 whitespace-nowrap sm:mx-10 ${
              outline && i % 2 === 1 ? "txt-outline-faint" : ""
            } ${itemClass}`}
          >
            {item}
          </span>
          <Asterisk className={`h-[0.9em] w-[0.9em] shrink-0 ${iconClass}`} strokeWidth={2.4} />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`marquee-pause overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${reverse ? "marquee-rev" : ""}`}
        style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}
      >
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
