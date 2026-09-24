import { useState } from "react";
import {
  Activity,
  ArrowRightLeft,
  Boxes,
  Radio,
  ShieldAlert,
  Vote,
  type LucideIcon,
} from "lucide-react";
import {
  AGENDA,
  CLOSING,
  CLUSTER_CHIPS,
  CLUSTER_DEFINITION,
  CLUSTER_TABS,
  CONCLUSIONS,
  COVER,
  FENCING_STEPS,
  HEARTBEAT_NOTE,
  HEARTBEAT_STEPS,
  MIGRATION_PHASES,
  MONITORING,
  QUORUM_FORMULA,
  QUORUM_TEXT,
  QUORUM_WARNING,
  SLIDES,
} from "@/data/slides";
import {
  AvailabilityBars,
  ClusterGraph,
  CoverGraph,
  FencingDiagram,
  HeartbeatGraph,
  LayerStack,
  MigrationDiagram,
  MiniDashboard,
  QuorumTable,
  SpofDiagram,
  SplitBrainDiagram,
  VmLoop,
} from "./diagrams";
import { Bullets, Chip, Panel, StepControls, Tabs, Toggle, TwoCol } from "./ui";

const ICONS: Record<string, LucideIcon> = {
  Boxes,
  Radio,
  Vote,
  ArrowRightLeft,
  ShieldAlert,
  Activity,
};

/* ---------- 1 ---------- */
function Cover() {
  return (
    <div className="flex min-h-0 flex-col justify-center p-gap lg:grid lg:grid-cols-12 lg:items-center">
      <div className="flex min-w-0 flex-col p-gap lg:col-span-7">
        <h1 className="p-title-cover">
          {COVER.titleLead}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, var(--p-mint), var(--p-sky))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {COVER.titleAccent}
          </span>
        </h1>
        <div className="flex max-h-[24dvh] w-full items-center justify-center lg:hidden max-[900px]:landscape:hidden">
          <CoverGraph />
        </div>
        <div className="flex flex-col gap-4">
          <span className="p-mono text-p-accent">{COVER.studentsLabel}</span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {COVER.students.map((s) => (
              <Panel key={s.name} className="px-4 py-3">
                <div className="text-base font-semibold text-p-text">{s.name}</div>
                <div className="p-num mt-1 text-sm text-p-muted">{s.id}</div>
              </Panel>
            ))}
          </div>
          <div className="h-px w-full bg-p-line" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {COVER.fields.map((f) => (
              <div key={f.label} className="min-w-0">
                <div className="p-mono text-p-muted">{f.label}:</div>
                <div className="mt-1 text-base text-p-text/90">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden min-h-0 items-center justify-center lg:col-span-5 lg:flex">
        <div className="max-h-[58dvh] w-full">
          <CoverGraph />
        </div>
      </div>
    </div>
  );
}

/* ---------- 2 ---------- */
function Agenda() {
  return (
    <div className="grid grid-cols-1 p-gap sm:grid-cols-2 lg:grid-cols-3">
      {AGENDA.map((a) => {
        const Icon = ICONS[a.icon];
        return (
          <Panel key={a.code} className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="p-num text-sm text-p-accent">{a.code}</span>
              <Icon className="h-5 w-5 shrink-0 text-p-accent" aria-hidden="true" />
            </div>
            <p className="text-base text-p-text/90">{a.text}</p>
          </Panel>
        );
      })}
    </div>
  );
}

/* ---------- 4 ---------- */
function ClusterSlide() {
  const [tab, setTab] = useState(CLUSTER_TABS[0].key);
  const current = CLUSTER_TABS.find((t) => t.key === tab)!;
  return (
    <TwoCol
      text={
        <>
          <p className="p-body text-p-text/90">{CLUSTER_DEFINITION}</p>
          <div className="flex flex-wrap gap-2">
            {CLUSTER_CHIPS.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
          <Tabs options={CLUSTER_TABS} value={tab} onChange={setTab} label="Tipos de clúster" />
          <Panel hover={false} className="p-4">
            <p className="p-body text-p-text/90">{current.text}</p>
          </Panel>
        </>
      }
      visual={<ClusterGraph />}
    />
  );
}

/* ---------- 6 ---------- */
function HeartbeatSlide() {
  const [state, setState] = useState("ok");
  return (
    <TwoCol
      text={
        <>
          <ol className="flex flex-col p-gap-sm">
            {HEARTBEAT_STEPS.map((s, i) => (
              <li key={s} className="p-body flex gap-3 text-p-text/90">
                <span className="p-num mt-1 shrink-0 text-sm text-p-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">{s}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-p-muted">{HEARTBEAT_NOTE}</p>
          <Toggle
            label="Estado del clúster"
            value={state}
            onChange={setState}
            options={[
              { key: "ok", label: "Todos en línea" },
              { key: "fail", label: "Falla un nodo" },
            ]}
          />
        </>
      }
      visual={<HeartbeatGraph failed={state === "fail"} />}
    />
  );
}

/* ---------- 7 ---------- */
function QuorumSlide() {
  return (
    <TwoCol
      text={
        <>
          <Panel hover={false} className="px-4 py-3">
            <code className="p-num text-base text-p-accent">{QUORUM_FORMULA}</code>
          </Panel>
          <p className="p-body text-p-text/90">{QUORUM_TEXT}</p>
          <div
            className="rounded-2xl border px-4 py-3 text-sm"
            style={{
              borderColor: "color-mix(in oklab, var(--p-amber) 45%, transparent)",
              backgroundColor: "color-mix(in oklab, var(--p-amber) 10%, transparent)",
              color: "var(--p-amber)",
            }}
          >
            {QUORUM_WARNING}
          </div>
        </>
      }
      visual={<QuorumTable />}
    />
  );
}

/* ---------- 8 ---------- */
function SplitBrainSlide({ bullets }: { bullets: string[] }) {
  const [mode, setMode] = useState("none");
  return (
    <TwoCol
      text={
        <>
          <Bullets items={bullets} />
          <Toggle
            label="Protección del clúster"
            value={mode}
            onChange={setMode}
            options={[
              { key: "none", label: "Sin protección" },
              { key: "quorum", label: "Con quórum" },
            ]}
          />
        </>
      }
      visual={<SplitBrainDiagram guarded={mode === "quorum"} />}
    />
  );
}

/* ---------- 10 ---------- */
function MigrationSlide() {
  const [step, setStep] = useState(0);
  const phase = MIGRATION_PHASES[step];
  return (
    <TwoCol
      text={
        <>
          <div className="flex items-center gap-2">
            {MIGRATION_PHASES.map((p, i) => (
              <span
                key={p.name}
                className="h-1.5 flex-1 rounded-full transition-colors"
                style={{ backgroundColor: i <= step ? "var(--p-accent)" : "color-mix(in oklab, var(--p-muted) 35%, transparent)" }}
                aria-hidden="true"
              />
            ))}
          </div>
          <Panel hover={false} className="flex flex-col gap-2 p-5">
            <span className="p-mono text-p-accent">{phase.name}</span>
            <p className="p-body text-p-text/90">{phase.text}</p>
          </Panel>
          <StepControls step={step} total={MIGRATION_PHASES.length} onStep={setStep} label="Fases de la migración" />
        </>
      }
      visual={<MigrationDiagram phase={step} />}
    />
  );
}

/* ---------- 12 ---------- */
function FencingSlide({ bullets }: { bullets: string[] }) {
  const [step, setStep] = useState(0);
  return (
    <TwoCol
      text={
        <>
          <Bullets items={bullets} />
          <div className="flex flex-wrap items-center gap-3">
            <StepControls step={step} total={FENCING_STEPS.length} onStep={setStep} label="Pasos del fencing" />
            <span className="p-mono text-p-text">{FENCING_STEPS[step].name}</span>
          </div>
        </>
      }
      visual={<FencingDiagram step={step} />}
    />
  );
}

/* ---------- 13 ---------- */
function MonitoringSlide() {
  return (
    <div className="grid min-h-0 grid-cols-1 items-start p-gap lg:grid-cols-12">
      <div className="grid min-w-0 grid-cols-1 p-gap sm:grid-cols-2 lg:col-span-7">
        {MONITORING.map((col) => (
          <Panel key={col.title} className="flex flex-col gap-3 p-5">
            <span className="p-mono text-p-accent">{col.title}</span>
            <ul className="flex flex-col gap-2">
              {col.items.map((it) => (
                <li key={it} className="flex gap-2.5 text-base text-p-text/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-p-accent" aria-hidden="true" />
                  <span className="min-w-0">{it}</span>
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
      <div className="min-w-0 lg:col-span-5">
        <MiniDashboard />
      </div>
    </div>
  );
}

/* ---------- 14 ---------- */
function Closing() {
  return (
    <div className="flex min-h-0 flex-col justify-center p-gap">
      <div className="grid grid-cols-1 p-gap sm:grid-cols-2">
        {CONCLUSIONS.map((c, i) => (
          <Panel key={c} className="flex gap-4 p-5">
            <span className="p-num shrink-0 text-sm text-p-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="min-w-0 text-base text-p-text/90">{c}</p>
          </Panel>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <p
          className="p-title"
          style={{
            backgroundImage: "linear-gradient(90deg, var(--p-mint), var(--p-sky))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {CLOSING.thanks}
        </p>
        <p className="p-mono text-p-muted">{CLOSING.names.join(" · ")}</p>
      </div>
    </div>
  );
}

export function SlideBody({ index }: { index: number }) {
  const slide = SLIDES[index];
  switch (slide.visual) {
    case "cover":
      return <Cover />;
    case "agenda":
      return <Agenda />;
    case "spof":
      return <TwoCol text={<Bullets items={slide.bullets!} />} visual={<SpofDiagram />} />;
    case "cluster":
      return <ClusterSlide />;
    case "layers":
      return <TwoCol text={<Bullets items={slide.bullets!} />} visual={<LayerStack />} />;
    case "heartbeat":
      return <HeartbeatSlide />;
    case "quorum":
      return <QuorumSlide />;
    case "splitbrain":
      return <SplitBrainSlide bullets={slide.bullets!} />;
    case "vmloop":
      return <TwoCol text={<Bullets items={slide.bullets!} />} visual={<VmLoop />} />;
    case "migration":
      return <MigrationSlide />;
    case "availability":
      return <TwoCol text={<Bullets items={slide.bullets!} />} visual={<AvailabilityBars />} />;
    case "fencing":
      return <FencingSlide bullets={slide.bullets!} />;
    case "monitoring":
      return <MonitoringSlide />;
    case "closing":
      return <Closing />;
    default:
      return null;
  }
}
