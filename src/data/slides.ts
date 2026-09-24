export type AccentName = "mint" | "sky" | "amber" | "coral" | "brand";

export type Topic = {
  index: number;
  code: string;
  name: string;
  accent: AccentName;
};

export const TOPICS: Topic[] = [
  { index: 1, code: "01", name: "Introducción y clúster", accent: "mint" },
  { index: 2, code: "02", name: "Corosync", accent: "sky" },
  { index: 3, code: "03", name: "Quórum y split-brain", accent: "amber" },
  { index: 4, code: "04", name: "Live Migration", accent: "brand" },
  { index: 5, code: "05", name: "HA y Fencing", accent: "coral" },
  { index: 6, code: "06", name: "Monitoreo y cierre", accent: "mint" },
];

export type SlideMeta = {
  id: number;
  topic: number | null;
  kicker?: string;
  title: string;
  navTitle: string;
  bullets?: string[];
  visual: string;
};

export const SLIDES: SlideMeta[] = [
  {
    id: 1,
    topic: null,
    title: "Clúster y Migraciones",
    navTitle: "Portada",
    visual: "cover",
  },
  {
    id: 2,
    topic: null,
    title: "Contenido",
    navTitle: "Contenido",
    visual: "agenda",
  },
  {
    id: 3,
    topic: 1,
    kicker: "Tema 01 · Introducción",
    title: "El problema del servidor único",
    navTitle: "El problema del servidor único",
    bullets: [
      "Un solo servidor es un punto único de falla (SPOF).",
      "Si cae, el servicio se detiene por completo.",
      "Los servicios críticos deben estar disponibles de forma continua.",
      "Solución: unir varios servidores para que trabajen como uno solo.",
    ],
    visual: "spof",
  },
  {
    id: 4,
    topic: 1,
    kicker: "Tema 01 · Definición",
    title: "¿Qué es un clúster?",
    navTitle: "¿Qué es un clúster?",
    visual: "cluster",
  },
  {
    id: 5,
    topic: 2,
    kicker: "Tema 02 · Corosync",
    title: "Corosync: la capa de comunicación del clúster",
    navTitle: "Corosync",
    bullets: [
      "Motor de mensajería y membresía del clúster.",
      "Los nodos se avisan entre sí con latidos (heartbeats).",
      "Garantiza que todos compartan la misma vista de qué nodos están activos.",
      "Lo usan gestores como Pacemaker y plataformas como Proxmox VE.",
    ],
    visual: "layers",
  },
  {
    id: 6,
    topic: 2,
    kicker: "Tema 02 · Membresía",
    title: "¿Cómo se comunican los nodos?",
    navTitle: "¿Cómo se comunican los nodos?",
    visual: "heartbeat",
  },
  {
    id: 7,
    topic: 3,
    kicker: "Tema 03 · Quórum",
    title: "Quórum y números impares",
    navTitle: "Quórum y números impares",
    visual: "quorum",
  },
  {
    id: 8,
    topic: 3,
    kicker: "Tema 03 · Riesgo",
    title: "Split-brain: cuando el clúster se divide",
    navTitle: "Split-brain",
    bullets: [
      "Una falla de red separa los nodos en dos grupos.",
      "Cada grupo cree ser el único activo.",
      "Ambos escriben sobre los mismos datos: inconsistencia o corrupción.",
      "Prevención: quórum y fencing.",
    ],
    visual: "splitbrain",
  },
  {
    id: 9,
    topic: 4,
    kicker: "Tema 04 · Migración",
    title: "Live Migration: mover una VM sin apagarla",
    navTitle: "Live Migration",
    bullets: [
      "Traslada una máquina virtual en ejecución de un nodo a otro.",
      "El servicio continúa; la pausa dura milisegundos.",
      "Permite dar mantenimiento sin interrumpir a los usuarios.",
      "Requiere almacenamiento compartido (o migración de disco), red rápida y CPUs compatibles.",
    ],
    visual: "vmloop",
  },
  {
    id: 10,
    topic: 4,
    kicker: "Tema 04 · Proceso",
    title: "Proceso de migración (RAM + CPU)",
    navTitle: "Proceso de migración",
    visual: "migration",
  },
  {
    id: 11,
    topic: 5,
    kicker: "Tema 05 · HA",
    title: "Alta disponibilidad (HA)",
    navTitle: "Alta disponibilidad",
    bullets: [
      "Objetivo: que los servicios sigan activos aunque falle un nodo.",
      "Ante una falla, los servicios se reinician automáticamente en otro nodo (failover).",
      "La disponibilidad se mide en porcentaje.",
      "Requiere detección de fallos, quórum y recursos redundantes.",
    ],
    visual: "availability",
  },
  {
    id: 12,
    topic: 5,
    kicker: "Tema 05 · Fencing",
    title: "Fencing: aislar antes de recuperar",
    navTitle: "Fencing y STONITH",
    bullets: [
      "Impide que un nodo fallido o inalcanzable siga usando recursos compartidos.",
      'STONITH ("Shoot The Other Node In The Head") lo apaga o reinicia de forma forzada.',
      "Se logra, por ejemplo, con control de energía (PDU) o gestión remota (IPMI, iLO, iDRAC).",
      "Solo después se recuperan sus servicios en otro nodo.",
    ],
    visual: "fencing",
  },
  {
    id: 13,
    topic: 6,
    kicker: "Tema 06 · Monitoreo",
    title: "Monitoreo del clúster",
    navTitle: "Monitoreo del clúster",
    visual: "monitoring",
  },
  {
    id: 14,
    topic: 6,
    kicker: "Tema 06 · Cierre",
    title: "Conclusión final",
    navTitle: "Conclusión final",
    visual: "closing",
  },
];

export const COVER = {
  titleLead: "Clúster y ",
  titleAccent: "Migraciones",
  studentsLabel: "Estudiantes",
  students: [
    { name: "Saúl Ramos", id: "C.I: 31.156.858" },
    { name: "Gabriel Bastardo", id: "C.I: 31.257.502" },
  ],
  fields: [
    { label: "Asignatura", value: "Sistemas Operativos" },
    {
      label: "Institución",
      value:
        'Universidad Politécnica Territorial del Oeste de Sucre "Clodosbaldo Russián"',
    },
  ],
};

export const AGENDA = [
  { code: "01", text: "Introducción y ¿qué es un clúster?", icon: "Boxes" },
  { code: "02", text: "Corosync: comunicación entre nodos", icon: "Radio" },
  { code: "03", text: "Quórum, números impares y split-brain", icon: "Vote" },
  { code: "04", text: "Live Migration: RAM y CPU", icon: "ArrowRightLeft" },
  { code: "05", text: "HA y Fencing: STONITH", icon: "ShieldAlert" },
  { code: "06", text: "Monitoreo y conclusión final", icon: "Activity" },
] as const;

export const CLUSTER_DEFINITION =
  "Un clúster es un conjunto de servidores (nodos) interconectados que funcionan como un único sistema.";

export const CLUSTER_CHIPS = [
  "Nodos",
  "Red de interconexión",
  "Almacenamiento compartido o distribuido",
  "Software de gestión del clúster",
];

export const CLUSTER_TABS = [
  {
    key: "ha",
    label: "Alta disponibilidad",
    text: "Si un nodo falla, otro asume el servicio.",
  },
  {
    key: "lb",
    label: "Balanceo de carga",
    text: "Reparte las solicitudes entre varios nodos.",
  },
  {
    key: "hpc",
    label: "Alto rendimiento (HPC)",
    text: "Combina la potencia de cálculo de muchos nodos.",
  },
];

export const COROSYNC_LAYERS = [
  { name: "Servicios y VM", highlight: false },
  { name: "Gestor de recursos", highlight: false },
  { name: "Corosync", highlight: true },
  { name: "Red", highlight: false },
];

export const HEARTBEAT_STEPS = [
  "Cada nodo emite latidos periódicos.",
  "Los demás confirman que sigue activo.",
  "Si deja de responder tras un tiempo de espera, se marca como caído.",
  "Se recalcula la membresía y se avisa al gestor de recursos.",
];

export const HEARTBEAT_NOTE =
  "Puede usar varios enlaces de red para tener redundancia.";

export const QUORUM_FORMULA = "Quórum = ⌊N / 2⌋ + 1";

export const QUORUM_TEXT =
  "El clúster solo opera si la mayoría de los nodos se ve entre sí.";

export const QUORUM_ROWS = [
  { nodes: 2, quorum: 2, tolerated: 0 },
  { nodes: 3, quorum: 2, tolerated: 1 },
  { nodes: 4, quorum: 3, tolerated: 1 },
  { nodes: 5, quorum: 3, tolerated: 2 },
];

export const QUORUM_WARNING =
  "Un número par no agrega tolerancia: 4 nodos toleran los mismos fallos que 3.";

export const MIGRATION_PHASES = [
  {
    name: "Preparación",
    text: "El nodo destino reserva recursos y crea una VM vacía.",
  },
  {
    name: "Copia de RAM",
    text: "Se copian las páginas de memoria mientras la VM sigue ejecutándose; las páginas modificadas se vuelven a copiar en rondas.",
  },
  {
    name: "Pausa breve",
    text: "Se detiene la VM un instante y se transfieren el estado de la CPU y las últimas páginas.",
  },
  {
    name: "Reanudación",
    text: "La VM continúa en el nodo destino y se libera el origen.",
  },
];

export const AVAILABILITY = [
  { level: "99 %", downtime: "3,65 días de caída al año", ratio: 1 },
  { level: "99,9 %", downtime: "8,76 horas al año", ratio: 0.42 },
  { level: "99,99 %", downtime: "52,6 minutos al año", ratio: 0.14 },
];

export const FENCING_STEPS = [
  { name: "Falla detectada", tone: "coral" as const },
  { name: "Nodo aislado con STONITH", tone: "amber" as const },
  { name: "Servicios recuperados en otro nodo", tone: "mint" as const },
];

export const MONITORING = [
  {
    title: "Qué vigilar",
    items: [
      "Estado de nodos y quórum",
      "Latencia de latidos",
      "Uso de CPU, RAM, red y almacenamiento",
      "Estado de VM y recursos",
    ],
  },
  {
    title: "Cómo hacerlo",
    items: [
      "Alertas automáticas",
      "Paneles de control",
      "Herramientas: Prometheus con Grafana, Zabbix, Nagios",
      "Comandos de estado: crm_mon, corosync-quorumtool",
    ],
  },
];

export const CONCLUSIONS = [
  "Un clúster elimina el punto único de falla.",
  "Corosync mantiene a los nodos comunicados y con la misma vista del clúster.",
  "El quórum y el fencing evitan el split-brain y protegen los datos.",
  "Live Migration y el monitoreo permiten mantener el servicio sin interrupciones.",
];

export const CLOSING = {
  thanks: "¡Gracias! ¿Preguntas?",
  names: ["Saúl Ramos", "Gabriel Bastardo"],
};

export const DECK_TITLE = "Clúster y Migraciones";
