import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Panel({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`dk-surface dk-brackets ${hover ? "dk-hoverable" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <span className="dk-mono text-p-accent">{children}</span>;
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col dk-gap-sm">
      {items.map((b) => (
        <li key={b} className="dk-body flex gap-3 text-p-text/90">
          <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-p-accent" aria-hidden="true" />
          <span className="min-w-0">{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-p-line bg-p-surface-2 px-3 py-1.5 text-sm text-p-text/90">
      {children}
    </span>
  );
}

export function Toggle({
  options,
  value,
  onChange,
  label,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
  label: string;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-full border border-p-line bg-p-surface p-1" role="group" aria-label={label}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.key)}
            className={`dk-focus rounded-full px-4 py-2 text-sm transition-colors ${
              on ? "bg-p-accent/15 text-p-accent" : "text-p-muted hover:text-p-text"
            }`}
            style={on ? { boxShadow: "inset 0 0 0 1px var(--p-accent)" } : undefined}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Tabs({
  options,
  value,
  onChange,
  label,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label={label}>
      {options.map((o) => {
        const on = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.key)}
            className={`dk-focus rounded-xl border px-4 py-2 text-sm transition-colors ${
              on
                ? "border-p-accent bg-p-accent/12 text-p-accent"
                : "border-p-line bg-p-surface text-p-muted hover:text-p-text"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function StepControls({
  step,
  total,
  onStep,
  label,
}: {
  step: number;
  total: number;
  onStep: (n: number) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3" aria-label={label}>
      <button
        type="button"
        onClick={() => onStep(Math.max(0, step - 1))}
        disabled={step === 0}
        className="dk-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-p-line bg-p-surface text-p-text transition-colors hover:bg-p-surface-2 disabled:opacity-35"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Paso anterior</span>
      </button>
      <span className="dk-num text-sm text-p-muted">
        {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={() => onStep(Math.min(total - 1, step + 1))}
        disabled={step === total - 1}
        className="dk-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-p-line bg-p-surface text-p-text transition-colors hover:bg-p-surface-2 disabled:opacity-35"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Paso siguiente</span>
      </button>
    </div>
  );
}

export function TwoCol({
  text,
  visual,
}: {
  text: ReactNode;
  visual: ReactNode;
}) {
  return (
    <div className="grid min-h-0 grid-cols-1 items-center dk-gap lg:grid-cols-12">
      <div className="flex min-w-0 flex-col dk-gap lg:col-span-5">{text}</div>
      <div className="flex min-h-0 min-w-0 items-center justify-center lg:col-span-7">
        <div className="max-h-[42dvh] w-full lg:max-h-[62dvh]">{visual}</div>
      </div>
    </div>
  );
}
