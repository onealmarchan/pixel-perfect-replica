import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DECK_TITLE, SLIDES, TOPICS } from "@/data/slides";
import { BackgroundMesh, Navigator, TopBar, TopicRail } from "@/components/pres/deck-chrome";
import { SlideBody } from "@/components/pres/slides";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clúster y Migraciones | Sistemas Operativos" },
      {
        name: "description",
        content:
          "Presentación de 14 diapositivas sobre clústeres, Corosync, quórum, split-brain, Live Migration, alta disponibilidad, fencing y monitoreo.",
      },
      { property: "og:title", content: "Clúster y Migraciones" },
      {
        property: "og:description",
        content:
          "Presentación interactiva sobre clústeres y migración en vivo de máquinas virtuales, para Sistemas Operativos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Clúster y Migraciones" },
      {
        name: "twitter:description",
        content:
          "Presentación interactiva sobre clústeres y migración en vivo de máquinas virtuales.",
      },
    ],
  }),
  component: Deck,
});

const ACCENTS: Record<string, { accent: string; accent2: string }> = {
  mint: { accent: "var(--p-mint)", accent2: "var(--p-sky)" },
  sky: { accent: "var(--p-sky)", accent2: "var(--p-mint)" },
  amber: { accent: "var(--p-amber)", accent2: "var(--p-coral)" },
  coral: { accent: "var(--p-coral)", accent2: "var(--p-amber)" },
  brand: { accent: "var(--p-sky)", accent2: "var(--p-mint)" },
};

function accentFor(topic: number | null) {
  const t = TOPICS.find((x) => x.index === topic);
  return ACCENTS[t ? t.accent : "mint"]!;
}

function hashIndex() {
  if (typeof window === "undefined") return 0;
  const n = parseInt(window.location.hash.replace("#", ""), 10);
  return Number.isFinite(n) && n >= 1 && n <= SLIDES.length ? n - 1 : 0;
}

function Deck() {
  const [index, setIndex] = useState(0);
  const prevTopic = useRef<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();

  const slide = SLIDES[index]!;
  const accent = accentFor(slide.topic);

  const go = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, next));
    if (typeof window !== "undefined") {
      window.location.hash = String(clamped + 1);
    }
    setIndex(clamped);
  }, []);

  useEffect(() => {
    setIndex(hashIndex());
    const onHash = () => setIndex(hashIndex());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = `${String(index + 1).padStart(2, "0")} · ${SLIDES[index]!.navTitle} — ${DECK_TITLE}`;
    titleRef.current?.focus({ preventScroll: true });
  }, [index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(hashIndex() + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(hashIndex() - 1);
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, toggleFullscreen]);

  const topicChanged = prevTopic.current !== slide.topic;
  useEffect(() => {
    prevTopic.current = slide.topic;
  }, [slide.topic]);

  const variants = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
      }
    : topicChanged
      ? {
          initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          animate: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
          exit: { opacity: 0, clipPath: "inset(0 0 0 100%)" },
          transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
        }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -24 },
          transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] as const },
        };

  return (
    <div
      className="dk-deck relative h-[100dvh] w-full overflow-hidden"
      style={
        {
          "--p-accent": accent.accent,
          "--p-accent-2": accent.accent2,
          touchAction: "pan-y",
        } as React.CSSProperties
      }
      onTouchStart={(e) => {
        const t = e.touches[0]!;
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const t = e.changedTouches[0]!;
        const dx = t.clientX - touch.current.x;
        const dy = t.clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          go(index + (dx < 0 ? 1 : -1));
        }
      }}
    >
      <BackgroundMesh />
      <div className="relative z-10 flex h-full w-full">
        {slide.topic !== null || index === 1 ? (
          <TopicRail topic={slide.topic} onGo={go} />
        ) : (
          <div className="hidden w-[84px] shrink-0 lg:block" aria-hidden="true" />
        )}
        <div className="grid min-h-0 min-w-0 flex-1 grid-rows-[auto_1fr_auto] dk-pad">
          <TopBar index={index} />
          <main className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] dk-gap py-[clamp(12px,2.5vh,28px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
                className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] dk-gap"
              >
                {slide.visual === "cover" ? null : (
                  <div className="flex min-w-0 flex-col gap-2">
                    {slide.kicker ? <span className="dk-mono text-p-accent">{slide.kicker}</span> : null}
                    <h2 ref={titleRef} tabIndex={-1} className="dk-title dk-focus text-p-text">
                      {slide.title}
                    </h2>
                  </div>
                )}
                <div className="dk-scroll min-h-0 min-w-0">
                  <SlideBody index={index} />
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
          <Navigator
            index={index}
            topic={slide.topic}
            onPrev={() => go(index - 1)}
            onNext={() => go(index + 1)}
            onGo={go}
            onFullscreen={toggleFullscreen}
          />
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {`Diapositiva ${index + 1} de ${SLIDES.length}: ${slide.navTitle}`}
      </p>
    </div>
  );
}
