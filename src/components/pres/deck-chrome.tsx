import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { DECK_TITLE, SLIDES, TOPICS } from "@/data/slides";

export function BackgroundMesh() {
  const nodes = [
    { x: 12, y: 18 },
    { x: 78, y: 12 },
    { x: 92, y: 62 },
    { x: 50, y: 84 },
    { x: 20, y: 60 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden max-[900px]:landscape:hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(var(--p-muted) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="p-motion absolute inset-0 h-full w-full">
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          const path = `M ${n.x} ${n.y} L ${m.x} ${m.y}`;
          return (
            <g key={i}>
              <path d={path} stroke="var(--p-accent)" strokeWidth={0.12} opacity={0.35} fill="none" />
              <circle r={0.45} fill="var(--p-accent)" opacity={0.8}>
                <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={path} />
              </circle>
            </g>
          );
        })}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r={0.7} fill="var(--p-accent)" opacity={0.45} />
        ))}
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, var(--p-bg) 100%)",
        }}
      />
    </div>
  );
}

export function TopBar({ index }: { index: number }) {
  return (
    <header className="relative z-10 flex items-center justify-between gap-4">
      <span className="p-mono hidden text-p-muted sm:inline">{DECK_TITLE}</span>
      <span className="p-num ml-auto text-sm text-p-muted">
        {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </span>
    </header>
  );
}

export function TopicRail({
  topic,
  onGo,
}: {
  topic: number | null;
  onGo: (slideIndex: number) => void;
}) {
  const progress = topic ? ((topic - 1) / (TOPICS.length - 1)) * 100 : 0;
  return (
    <nav
      className="relative z-10 hidden h-full w-[84px] shrink-0 flex-col items-center justify-center lg:flex"
      aria-label="Temas de la presentación"
    >
      <div className="relative flex h-[60%] flex-col items-center justify-between">
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-p-line" aria-hidden="true" />
        <div
          className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-p-accent transition-[height] duration-500"
          style={{ height: `${progress}%` }}
          aria-hidden="true"
        />
        {TOPICS.map((t) => {
          const on = t.index === topic;
          const target = SLIDES.findIndex((s) => s.topic === t.index);
          return (
            <button
              key={t.code}
              type="button"
              onClick={() => onGo(target)}
              aria-current={on ? "step" : undefined}
              className="p-focus group relative flex items-center justify-center rounded-full"
            >
              <span
                className={`p-num relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[11px] transition-colors ${
                  on
                    ? "border-p-accent bg-p-surface-2 text-p-accent"
                    : "border-p-line bg-p-bg text-p-muted hover:text-p-text"
                }`}
                style={on ? { boxShadow: "0 0 18px -4px var(--p-accent)" } : undefined}
              >
                {t.code}
              </span>
              <span className="p-mono pointer-events-none absolute left-11 z-20 hidden whitespace-nowrap rounded-lg border border-p-line bg-p-surface-2 px-3 py-1.5 text-p-text opacity-0 transition-opacity group-hover:block group-hover:opacity-100 group-focus-visible:block group-focus-visible:opacity-100">
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Navigator({
  index,
  topic,
  onPrev,
  onNext,
  onGo,
  onFullscreen,
}: {
  index: number;
  topic: number | null;
  onPrev: () => void;
  onNext: () => void;
  onGo: (i: number) => void;
  onFullscreen: () => void;
}) {
  return (
    <footer className="relative z-10 flex items-center justify-between gap-4 pt-3">
      <div className="flex items-center gap-2 lg:hidden">
        {TOPICS.map((t) => {
          const on = t.index === topic;
          const target = SLIDES.findIndex((s) => s.topic === t.index);
          return (
            <button
              key={t.code}
              type="button"
              onClick={() => onGo(target)}
              aria-label={`Tema ${t.code}: ${t.name}`}
              aria-current={on ? "step" : undefined}
              className="p-focus h-6 w-6 rounded-full"
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-colors ${on ? "bg-p-accent" : "bg-p-muted/40"}`}
                style={on ? { boxShadow: "0 0 12px -1px var(--p-accent)" } : undefined}
              />
            </button>
          );
        })}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onFullscreen}
          className="p-focus hidden h-10 w-10 items-center justify-center rounded-full border border-p-line bg-p-surface text-p-muted transition-colors hover:text-p-text sm:inline-flex"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Pantalla completa (F)</span>
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="p-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-p-line bg-p-surface text-p-text transition-colors hover:bg-p-surface-2 disabled:opacity-35"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Diapositiva anterior</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index === SLIDES.length - 1}
          className="p-focus inline-flex h-10 w-10 items-center justify-center rounded-full border border-p-line bg-p-surface text-p-text transition-colors hover:bg-p-surface-2 disabled:opacity-35"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Diapositiva siguiente</span>
        </button>
      </div>
    </footer>
  );
}
