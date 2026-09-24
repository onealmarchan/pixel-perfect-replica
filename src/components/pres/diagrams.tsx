import { useState } from "react";
import {
  AVAILABILITY,
  COROSYNC_LAYERS,
  FENCING_STEPS,
  QUORUM_ROWS,
} from "@/data/slides";

const svgClass = "h-full max-h-full w-full";

function hex(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

const toneVar = {
  mint: "var(--p-mint)",
  sky: "var(--p-sky)",
  amber: "var(--p-amber)",
  coral: "var(--p-coral)",
  muted: "var(--p-muted)",
} as const;

type Tone = keyof typeof toneVar;

function HexNode({
  x,
  y,
  r = 26,
  tone = "mint",
  label,
  float = false,
}: {
  x: number;
  y: number;
  r?: number;
  tone?: Tone;
  label?: string;
  float?: boolean;
}) {
  const c = toneVar[tone];
  return (
    <g className={float ? "p-float" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
      <polygon
        points={hex(x, y, r)}
        fill="color-mix(in oklab, var(--p-surface-2) 85%, transparent)"
        stroke={c}
        strokeWidth={2}
      />
      <circle cx={x} cy={y - r * 0.35} r={2.6} fill={c} className="p-led" />
      {label ? (
        <text
          x={x}
          y={y + r * 0.45}
          textAnchor="middle"
          fill={c}
          fontSize={11}
          fontFamily="var(--font-p-mono)"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Link({
  x1,
  y1,
  x2,
  y2,
  tone = "mint",
  broken = false,
  beat = true,
  dur = 2.4,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: Tone;
  broken?: boolean;
  beat?: boolean;
  dur?: number;
}) {
  const c = broken ? toneVar.coral : toneVar[tone];
  const id = `l-${x1}-${y1}-${x2}-${y2}`.replace(/\./g, "_");
  return (
    <g>
      <path
        id={id}
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={c}
        strokeWidth={1.2}
        opacity={broken ? 0.35 : 0.5}
        strokeDasharray={broken ? "5 6" : undefined}
        fill="none"
      />
      {!broken && beat ? (
        <circle r={3} fill={c}>
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={`M ${x1} ${y1} L ${x2} ${y2}`} />
        </circle>
      ) : null}
      {broken ? (
        <g stroke={toneVar.coral} strokeWidth={2}>
          <line x1={(x1 + x2) / 2 - 7} y1={(y1 + y2) / 2 - 7} x2={(x1 + x2) / 2 + 7} y2={(y1 + y2) / 2 + 7} />
          <line x1={(x1 + x2) / 2 + 7} y1={(y1 + y2) / 2 - 7} x2={(x1 + x2) / 2 - 7} y2={(y1 + y2) / 2 + 7} />
        </g>
      ) : null}
    </g>
  );
}

/* ---------------- Cover ---------------- */

export function CoverGraph() {
  const nodes = [
    { x: 180, y: 60 },
    { x: 300, y: 130 },
    { x: 300, y: 270 },
    { x: 180, y: 340 },
    { x: 60, y: 200 },
  ];
  return (
    <svg viewBox="0 0 360 400" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} aria-hidden="true">
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        return <Link key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} dur={2.4 + i * 0.2} />;
      })}
      {nodes.map((n, i) => (
        <HexNode key={i} x={n.x} y={n.y} r={28} float />
      ))}
      <g>
        <rect x={-18} y={-12} width={36} height={24} rx={6} fill="color-mix(in oklab, var(--p-sky) 22%, transparent)" stroke="var(--p-sky)" />
        <text x={0} y={4} textAnchor="middle" fill="var(--p-sky)" fontSize={11} fontFamily="var(--font-p-mono)">
          VM
        </text>
        <animateMotion dur="6s" repeatCount="indefinite" path="M 60 200 L 180 60 L 300 130 L 180 340 L 60 200" />
      </g>
    </svg>
  );
}

/* ---------------- 3. SPOF ---------------- */

export function SpofDiagram() {
  return (
    <svg viewBox="0 0 420 300" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label="Un servidor único que cae detiene el servicio; tres servidores en clúster siguen activos aunque uno falle.">
      <text x={100} y={26} textAnchor="middle" fill="var(--p-muted)" fontSize={12} fontFamily="var(--font-p-mono)">
        SERVIDOR ÚNICO
      </text>
      <rect x={60} y={90} width={80} height={110} rx={10} fill="var(--p-surface-2)" stroke="var(--p-coral)" strokeWidth={2} />
      <circle cx={100} cy={115} r={4} fill="var(--p-coral)" className="p-led" />
      <text x={100} y={165} textAnchor="middle" fill="var(--p-coral)" fontSize={12} fontFamily="var(--font-p-mono)">
        CAÍDO
      </text>
      <text x={100} y={235} textAnchor="middle" fill="var(--p-coral)" fontSize={13} fontFamily="var(--font-p-body)">
        Servicio detenido
      </text>
      <line x1={210} y1={40} x2={210} y2={260} stroke="var(--p-line)" />
      <text x={320} y={26} textAnchor="middle" fill="var(--p-muted)" fontSize={12} fontFamily="var(--font-p-mono)">
        CLÚSTER DE 3
      </text>
      {[250, 305, 360].map((x, i) => (
        <g key={x}>
          <rect
            x={x - 22}
            y={100}
            width={44}
            height={90}
            rx={8}
            fill="var(--p-surface-2)"
            stroke={i === 1 ? "var(--p-coral)" : "var(--p-mint)"}
            strokeWidth={2}
          />
          <circle cx={x} cy={120} r={3.5} fill={i === 1 ? "var(--p-coral)" : "var(--p-mint)"} className="p-led" />
        </g>
      ))}
      <text x={305} y={235} textAnchor="middle" fill="var(--p-mint)" fontSize={13} fontFamily="var(--font-p-body)">
        Servicio activo
      </text>
    </svg>
  );
}

/* ---------------- 4. Cluster graph with tooltips ---------------- */

const CLUSTER_NODES = [
  { x: 200, y: 50, label: "N1", tip: "Nodo 1 · activo" },
  { x: 330, y: 130, label: "N2", tip: "Nodo 2 · activo" },
  { x: 300, y: 270, label: "N3", tip: "Nodo 3 · activo" },
  { x: 100, y: 270, label: "N4", tip: "Nodo 4 · activo" },
  { x: 70, y: 130, label: "N5", tip: "Nodo 5 · activo" },
];

export function ClusterGraph() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <svg viewBox="0 0 400 330" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label="Diagrama de cinco nodos interconectados que forman un clúster.">
      {CLUSTER_NODES.map((n, i) => {
        const m = CLUSTER_NODES[(i + 1) % CLUSTER_NODES.length];
        return <Link key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} dur={2.4 + i * 0.25} />;
      })}
      {CLUSTER_NODES.map((n, i) => (
        <g
          key={i}
          tabIndex={0}
          role="button"
          aria-label={n.tip}
          className="p-focus cursor-pointer"
          onMouseEnter={() => setActive(i)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
        >
          <HexNode x={n.x} y={n.y} label={n.label} float />
        </g>
      ))}
      {active !== null ? (
        <g pointerEvents="none">
          <rect
            x={Math.min(Math.max(CLUSTER_NODES[active].x - 58, 4), 288)}
            y={CLUSTER_NODES[active].y - 60}
            width={116}
            height={26}
            rx={7}
            fill="var(--p-surface-2)"
            stroke="var(--p-accent)"
          />
          <text
            x={Math.min(Math.max(CLUSTER_NODES[active].x - 58, 4), 288) + 58}
            y={CLUSTER_NODES[active].y - 42}
            textAnchor="middle"
            fill="var(--p-text)"
            fontSize={12}
            fontFamily="var(--font-p-mono)"
          >
            {CLUSTER_NODES[active].tip}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

/* ---------------- 5. Layer stack ---------------- */

export function LayerStack() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={svgClass} role="img" aria-label="Pila de capas: servicios y VM, gestor de recursos, Corosync y red.">
      {COROSYNC_LAYERS.map((l, i) => {
        const y = 30 + i * 62;
        const c = l.highlight ? "var(--p-sky)" : "var(--p-muted)";
        return (
          <g key={l.name}>
            <rect
              x={50}
              y={y}
              width={300}
              height={48}
              rx={12}
              fill={l.highlight ? "color-mix(in oklab, var(--p-sky) 14%, var(--p-surface-2))" : "var(--p-surface)"}
              stroke={c}
              strokeWidth={l.highlight ? 2 : 1}
              opacity={l.highlight ? 1 : 0.8}
            />
            <text x={200} y={y + 29} textAnchor="middle" fill={l.highlight ? "var(--p-text)" : "var(--p-muted)"} fontSize={15} fontFamily="var(--font-p-body)">
              {l.name}
            </text>
            {i < COROSYNC_LAYERS.length - 1 ? (
              <path d={`M 200 ${y + 48} L 200 ${y + 62}`} stroke="var(--p-line)" strokeWidth={2} />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- 6. Heartbeat ---------------- */

export function HeartbeatGraph({ failed }: { failed: boolean }) {
  const nodes = [
    { x: 200, y: 50 },
    { x: 330, y: 160 },
    { x: 260, y: 270 },
    { x: 140, y: 270 },
    { x: 70, y: 160 },
  ];
  const down = 2;
  return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label={failed ? "Un nodo dejó de responder y sus latidos se interrumpen." : "Todos los nodos intercambian latidos."}>
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % nodes.length];
        const broken = failed && (i === down || (i + 1) % nodes.length === down);
        return <Link key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} broken={broken} dur={2 + i * 0.2} />;
      })}
      {nodes.map((n, i) => (
        <HexNode key={i} x={n.x} y={n.y} tone={failed && i === down ? "coral" : "mint"} label={`N${i + 1}`} float />
      ))}
    </svg>
  );
}

/* ---------------- 7. Quorum table ---------------- */

export function QuorumTable() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-p-line">
      <div className="p-mono grid grid-cols-[1fr_auto_auto] gap-3 border-b border-p-line bg-p-surface-2 px-4 py-3 text-p-muted sm:grid-cols-[1.4fr_1fr_1fr]">
        <span>Nodos (N)</span>
        <span className="text-right sm:text-left">Quórum</span>
        <span className="text-right sm:text-left">Fallos</span>
      </div>
      {QUORUM_ROWS.map((r, i) => (
        <div
          key={r.nodes}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-p-line px-4 py-3 transition-colors last:border-b-0 sm:grid-cols-[1.4fr_1fr_1fr] ${
            hover === i ? "bg-p-surface-2" : "bg-p-surface"
          }`}
        >
          <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="p-num text-base text-p-text">{r.nodes}</span>
            <span className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: r.nodes }).map((_, k) => (
                <span
                  key={k}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: k < r.quorum ? "var(--p-mint)" : "color-mix(in oklab, var(--p-muted) 40%, transparent)",
                  }}
                />
              ))}
            </span>
          </div>
          <span className="p-num text-right text-base text-p-text sm:text-left">{r.quorum}</span>
          <span className="p-num text-right text-base text-p-muted sm:text-left">{r.tolerated}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- 8. Split brain ---------------- */

export function SplitBrainDiagram({ guarded }: { guarded: boolean }) {
  const left = [
    { x: 70, y: 70 },
    { x: 55, y: 180 },
    { x: 140, y: 130 },
  ];
  const right = [
    { x: 310, y: 90 },
    { x: 330, y: 200 },
  ];
  const leftTone: Tone = guarded ? "mint" : "coral";
  const rightTone: Tone = guarded ? "amber" : "coral";
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label={guarded ? "Con quórum: el grupo de tres nodos opera y el grupo de dos se detiene." : "Sin protección: ambos grupos creen estar activos."}>
      <Link x1={140} y1={130} x2={310} y2={90} broken />
      {left.map((n, i) => (
        <g key={`l${i}`}>
          <Link x1={n.x} y1={n.y} x2={left[(i + 1) % left.length].x} y2={left[(i + 1) % left.length].y} tone={leftTone} />
          <HexNode x={n.x} y={n.y} tone={leftTone} r={24} float />
        </g>
      ))}
      {right.map((n, i) => (
        <g key={`r${i}`}>
          <Link x1={n.x} y1={n.y} x2={right[(i + 1) % right.length].x} y2={right[(i + 1) % right.length].y} tone={rightTone} />
          <HexNode x={n.x} y={n.y} tone={rightTone} r={24} float />
        </g>
      ))}
      <text x={85} y={255} textAnchor="middle" fill={toneVar[leftTone]} fontSize={13} fontFamily="var(--font-p-mono)">
        {guarded ? "OPERA (3)" : "¿ACTIVO? (3)"}
      </text>
      <text x={320} y={255} textAnchor="middle" fill={toneVar[rightTone]} fontSize={13} fontFamily="var(--font-p-mono)">
        {guarded ? "DETENIDO (2)" : "¿ACTIVO? (2)"}
      </text>
    </svg>
  );
}

/* ---------------- 9. VM loop ---------------- */

export function VmLoop() {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label="Una máquina virtual viaja de un host a otro sin apagarse.">
      {[60, 240].map((x, i) => (
        <g key={x}>
          <rect x={x} y={70} width={100} height={120} rx={12} fill="var(--p-surface)" stroke="var(--p-mint)" strokeWidth={1.5} />
          <text x={x + 50} y={60} textAnchor="middle" fill="var(--p-muted)" fontSize={12} fontFamily="var(--font-p-mono)">
            {i === 0 ? "ORIGEN" : "DESTINO"}
          </text>
          <circle cx={x + 16} cy={88} r={3.5} fill="var(--p-mint)" className="p-led" />
        </g>
      ))}
      <path d="M 160 130 L 240 130" stroke="var(--p-sky)" strokeWidth={1.5} opacity={0.5} className="p-dash" fill="none" />
      <g>
        <rect x={-20} y={-14} width={40} height={28} rx={7} fill="color-mix(in oklab, var(--p-sky) 22%, transparent)" stroke="var(--p-sky)" />
        <text x={0} y={5} textAnchor="middle" fill="var(--p-sky)" fontSize={12} fontFamily="var(--font-p-mono)">
          VM
        </text>
        <animateMotion dur="5s" repeatCount="indefinite" path="M 110 130 L 290 130 L 110 130" />
      </g>
    </svg>
  );
}

/* ---------------- 10. Migration ---------------- */

export function MigrationDiagram({ phase }: { phase: number }) {
  const ramActive = phase === 1;
  const cpuMoving = phase === 2;
  const done = phase === 3;
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label={`Fase ${phase + 1} del proceso de migración en vivo.`}>
      <rect x={40} y={60} width={110} height={140} rx={12} fill="var(--p-surface)" stroke={done ? "var(--p-muted)" : "var(--p-mint)"} strokeWidth={1.5} />
      <rect x={250} y={60} width={110} height={140} rx={12} fill="var(--p-surface)" stroke={phase >= 0 ? "var(--p-sky)" : "var(--p-muted)"} strokeWidth={1.5} strokeDasharray={phase === 0 ? "6 5" : undefined} />
      <text x={95} y={48} textAnchor="middle" fill="var(--p-muted)" fontSize={12} fontFamily="var(--font-p-mono)">
        ORIGEN
      </text>
      <text x={305} y={48} textAnchor="middle" fill="var(--p-muted)" fontSize={12} fontFamily="var(--font-p-mono)">
        DESTINO
      </text>

      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line x1={150} y1={95 + i * 35} x2={250} y2={95 + i * 35} stroke="var(--p-sky)" opacity={ramActive ? 0.6 : 0.2} className={ramActive ? "p-dash" : undefined} />
          {ramActive ? (
            <circle r={3} fill="var(--p-sky)">
              <animateMotion dur={`${1.4 + i * 0.3}s`} repeatCount="indefinite" path={`M 150 ${95 + i * 35} L 250 ${95 + i * 35}`} />
            </circle>
          ) : null}
        </g>
      ))}

      <g>
        <rect
          x={done ? 285 : 70}
          y={150}
          width={44}
          height={30}
          rx={6}
          fill="color-mix(in oklab, var(--p-amber) 18%, transparent)"
          stroke={cpuMoving ? "var(--p-amber)" : "var(--p-muted)"}
          style={{ transition: "x 0.6s ease" }}
        />
        <text x={(done ? 285 : 70) + 22} y={170} textAnchor="middle" fill={cpuMoving ? "var(--p-amber)" : "var(--p-muted)"} fontSize={11} fontFamily="var(--font-p-mono)" style={{ transition: "fill 0.4s ease" }}>
          CPU
        </text>
      </g>

      {cpuMoving ? (
        <text x={200} y={228} textAnchor="middle" fill="var(--p-amber)" fontSize={12} fontFamily="var(--font-p-mono)">
          PAUSA ≈ MS
        </text>
      ) : null}
      {done ? (
        <text x={305} y={228} textAnchor="middle" fill="var(--p-mint)" fontSize={12} fontFamily="var(--font-p-mono)">
          VM ACTIVA
        </text>
      ) : null}
    </svg>
  );
}

/* ---------------- 11. Availability bars ---------------- */

export function AvailabilityBars() {
  return (
    <div className="flex w-full flex-col p-gap-sm">
      {AVAILABILITY.map((a) => (
        <div key={a.level} className="flex min-w-0 flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="p-num text-base text-p-text">{a.level}</span>
            <span className="text-sm text-p-muted">{a.downtime}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-p-surface-2">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${Math.max(a.ratio * 100, 8)}%`,
                background: "linear-gradient(90deg, var(--p-coral), var(--p-amber))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- 12. Fencing ---------------- */

export function FencingDiagram({ step }: { step: number }) {
  const tone = FENCING_STEPS[step].tone;
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" className={`${svgClass} p-motion`} role="img" aria-label={FENCING_STEPS[step].name}>
      <HexNode x={90} y={120} r={34} tone={step === 0 ? "coral" : step === 1 ? "muted" : "muted"} label="N1" />
      {step >= 1 ? (
        <g>
          <circle cx={90} cy={120} r={48} fill="none" stroke="var(--p-coral)" strokeWidth={1.5} strokeDasharray="6 6" />
          <text x={90} y={196} textAnchor="middle" fill="var(--p-coral)" fontSize={12} fontFamily="var(--font-p-mono)">
            AISLADO
          </text>
        </g>
      ) : null}
      <Link x1={140} y1={120} x2={250} y2={120} tone={step === 2 ? "mint" : "muted"} beat={step === 2} broken={step < 2} />
      <HexNode x={300} y={120} r={34} tone={step === 2 ? "mint" : "mint"} label="N2" float />
      {step === 2 ? (
        <text x={300} y={196} textAnchor="middle" fill="var(--p-mint)" fontSize={12} fontFamily="var(--font-p-mono)">
          SERVICIOS ACTIVOS
        </text>
      ) : null}
      <text x={200} y={36} textAnchor="middle" fill={toneVar[tone]} fontSize={13} fontFamily="var(--font-p-mono)">
        {FENCING_STEPS[step].name.toUpperCase()}
      </text>
    </svg>
  );
}

/* ---------------- 13. Mini dashboard ---------------- */

const SPARK = [
  "M0 28 L14 22 L28 26 L42 14 L56 18 L70 10 L84 16 L98 8",
  "M0 16 L14 20 L28 12 L42 18 L56 14 L70 22 L84 12 L98 18",
  "M0 22 L14 14 L28 20 L42 10 L56 24 L70 16 L84 20 L98 12",
];

export function MiniDashboard() {
  return (
    <div
      className="w-full rounded-2xl border border-p-line bg-p-surface p-4"
      role="img"
      aria-label="Panel de control decorativo con indicadores de estado y gráficos de tendencia con datos fijos."
    >
      <div className="p-mono mb-3 flex items-center justify-between text-p-muted">
        <span>cluster · status</span>
        <span className="flex items-center gap-2">
          <span className="p-led h-2 w-2 rounded-full bg-p-mint" />
          OK
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { k: "quórum", v: "3 / 5" },
          { k: "latido", v: "1,2 ms" },
          { k: "vm", v: "12 act." },
        ].map((m, i) => (
          <div key={m.k} className="rounded-xl border border-p-line bg-p-surface-2 p-3">
            <div className="p-mono text-p-muted">{m.k}</div>
            <div className="p-num mt-1 text-lg text-p-text">{m.v}</div>
            <svg viewBox="0 0 98 34" className="mt-2 h-8 w-full" aria-hidden="true">
              <path d={SPARK[i]} fill="none" stroke="var(--p-accent)" strokeWidth={1.6} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
