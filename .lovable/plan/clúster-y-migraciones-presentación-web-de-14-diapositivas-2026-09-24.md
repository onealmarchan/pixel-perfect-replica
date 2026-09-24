## Clúster y Migraciones — Presentación web de 14 diapositivas

Presentación expositiva en español, oscura, con estética de consola de datacenter, diagramas SVG animados, micro-interacciones sutiles y navegación por teclado, clic y gestos. Sin backend, autenticación, base de datos ni almacenamiento local, y sin simulación real de un clúster: todos los datos son fijos y las interacciones solo alternan estados predefinidos.

### Identidad visual

- **Tokens semánticos** como variables CSS en `src/styles.css`, sin colores escritos a mano en los componentes:
  - `--bg` `#07110F` (grafito verdoso) · `--surface` `#0D1C18` · `--surface-2` `#122722` · `--border` `rgba(255,255,255,0.09)`
  - `--text` `#E8F3EF` · `--muted` `#8FA9A0`
  - `--mint` `#34D399` (primario) · `--sky` `#38BDF8` (comunicación, VM y migración) · `--amber` `#FBBF24` (quórum y advertencias) · `--coral` `#FB7185` (fallos, aislamiento y fencing)
- Gradiente de marca menta → cielo.
- Acento por tema (`--accent`), con transición suave entre temas: T1 menta, T2 cielo, T3 ámbar, T4 cielo→menta, T5 coral, T6 menta. La portada y la agenda usan menta→cielo.
- Estado de los nodos, igual en toda la presentación: activo menta, con problema ámbar, caído o aislado coral, VM cielo.
- **Tipografías de Google Fonts** (con `display=swap`, `preconnect` y fallbacks del sistema): **Sora** 700/800 para títulos, **DM Sans** 400/500/600 para cuerpo y **IBM Plex Mono** 400/500 para etiquetas, fórmulas y comandos.
- **Superficies:** borde de 1 px, `rounded-2xl`, esquinas con "corchetes" decorativos y brillo suave del color de acento.
- **Fondo global** (detrás de todo, `pointer-events: none`): malla de puntos muy tenue, red de 5 nodos con enlaces finos y "latidos" (círculos que recorren el enlace cada ~2,4 s con el color del acento), y viñeta radial oscura en los bordes.

### Estructura y responsive

#### Rejilla y reglas duras

- Cada diapositiva ocupa `100dvh` con rejilla de filas `auto 1fr auto` (cabecera / contenido / pie) y padding seguro `clamp(20px, 4vw, 72px)`.
- Nunca usar texto con `position: absolute`. Los elementos decorativos van detrás del contenido. Los tooltips son la única excepción: aparecen solo al pasar el cursor o al enfocar, se mantienen dentro de la ventana, no tapan de forma permanente el texto principal y se cierran con Escape o al perder el foco.
- Los diagramas viven en su propia celda de la rejilla, con `viewBox`, `preserveAspectRatio` y `max-height: 100%`, sin invadir el texto. Usar `min-height: 0` y `min-width: 0` en los hijos de la rejilla.
- Títulos con `text-wrap: balance` y párrafos con `text-wrap: pretty`.

#### Breakpoints

- **≥ 1024 px:** dos columnas (texto 5/12, visual 7/12). El riel lateral ocupa una columna reservada.
- **640 a 1023 px:** una columna con el visual reducido debajo del texto; el riel pasa a barra inferior.
- **< 640 px:** una columna y barra inferior. Si el contenido excede la altura, la diapositiva hace scroll vertical interno con un degradado en el borde inferior, sin recortar ni comprimir nada.
- **Horizontal con altura < 500 px:** ocultar el fondo decorativo, reducir los visuales y escalar los textos con `clamp` que incluya `vh`.
- Detectar como deslizamiento solo los gestos predominantemente horizontales, para no bloquear el scroll vertical (`touch-action: pan-y`).

#### Tipografía fluida, interlineado y espaciado

- Título de portada: `clamp(2.25rem, 2vw + 4vh, 4.5rem)`, interlineado 1,05.
- Títulos de diapositiva (h2): `clamp(1.5rem, 1.2vw + 2vh, 2.5rem)`, interlineado 1,15.
- Cuerpo: `clamp(1rem, 0.6vw + 1.2vh, 1.375rem)`, interlineado 1,6, ancho máximo `60ch`.
- Etiquetas mono: `clamp(0.75rem, 0.5vw + 0.6vh, 0.95rem)`, mayúsculas, tracking `0.16em`.
- Mínimos absolutos: 16 px en cuerpo y 12 px en etiquetas.
- Escala de espaciado de 8 px; separación entre bloques `clamp(16px, 2.5vh, 32px)` y entre viñetas `clamp(8px, 1.4vh, 16px)`.

#### Densidad de contenido

- Máximo 4 viñetas por diapositiva, de 16 palabras o menos cada una, sin párrafos largos.
- Las tarjetas y chips (diapositivas 4, 13 y 14) son elementos breves, no viñetas, con máximo 4 por grupo.

#### Riel de temas y barra superior

- **Riel (≥ 1024 px, vertical):** 6 nodos numerados 01 a 06 en IBM Plex Mono, unidos por una línea que se llena con el progreso. El nodo activo brilla y pulsa; al pasar el cursor o enfocar muestra el nombre del tema. Bajo 1024 px pasa a barra inferior horizontal con 6 puntos y los botones anterior, pantalla completa y siguiente.
- **Relación diapositiva ↔ tema:** 3 y 4 → 01 · 5 y 6 → 02 · 7 y 8 → 03 · 9 y 10 → 04 · 11 y 12 → 05 · 13 y 14 → 06. En la diapositiva 2 el riel se ve sin nodo activo. En la portada se oculta y su columna no se reserva.
- **Barra superior:** a la izquierda "CLÚSTER Y MIGRACIONES" en mono y a la derecha el contador `05 / 14`. En móvil solo el contador.

### Navegación

- Flechas ← →, barra espaciadora y AvPág/RePág; botones anterior/siguiente con etiquetas accesibles; deslizamiento horizontal táctil. Las flechas siguen cambiando de diapositiva aunque un control interactivo tenga el foco.
- Pantalla completa con `F`, manejando correctamente la salida.
- Hash `#1` a `#14` sincronizado con la carga inicial, el enlace compartido y los botones atrás/adelante del navegador.
- El título de la pestaña muestra el número y nombre de la diapositiva actual.
- Al cambiar de diapositiva, el foco pasa al título y se anuncia con `aria-live="polite"`.

### Animación

#### Transiciones

- **Dentro del mismo tema:** desvanecido más desplazamiento vertical de 24 px, 0,5 s.
- **Al cambiar de tema:** barrido horizontal con `clip-path` y un borde luminoso del color de acento, 0,7 s, con `AnimatePresence`.
- Easing `[0.65, 0, 0.35, 1]`. Entradas escalonadas de 0,07 s: primero etiqueta y título, luego viñetas y al final el visual.

#### Movimiento continuo y hover

- Latidos en los enlaces del fondo, LED de estado que parpadea despacio y flotación mínima de 4 px en los nodos.
- Tarjetas: elevación de 4 px y borde con el color de acento al pasar el cursor.
- Con `prefers-reduced-motion`: solo desvanecidos, sin barrido, sin movimiento continuo y con los pasos de los steppers en cambio instantáneo.

#### Interacciones sutiles (con datos fijos)

- Todas son `button` reales con `aria-pressed` o `aria-selected`, foco visible y operables con teclado.
- Diapositiva 4: pestañas de tipo de clúster. Diapositiva 6: interruptor "Todos en línea / Falla un nodo". Diapositiva 8: interruptor "Sin protección / Con quórum". Diapositiva 10: paso a paso de 4 fases. Diapositiva 12: paso a paso de 3 pasos.
- Tooltips en los nodos de los diagramas y resaltado al pasar el cursor por las filas de la tabla de quórum.

### Las 14 diapositivas

Usar estos textos exactamente. Cada visual es SVG con datos fijos.

**1. Portada**

- Título: **Clúster y Migraciones**, con "Migraciones" en gradiente de marca.
- Debajo del título, en este orden:
  - Etiqueta mono **ESTUDIANTES** y dos elementos en 2 columnas (se apilan en móvil): Saúl Ramos · C.I: 31.156.858 / Gabriel Bastardo · C.I: 31.257.502.
  - Separador fino.
  - Dos campos en fila (se apilan en móvil), cada uno con etiqueta mono y valor debajo: **ASIGNATURA:** Sistemas Operativos · **INSTITUCIÓN:** Universidad Politécnica Territorial del Oeste de Sucre "Clodosbaldo Russián" (puede pasar a 2 líneas).
- Nombres en DM Sans 600; cédulas en IBM Plex Mono con `tabular-nums`. Separación entre título y datos de `clamp(24px, 4vh, 48px)`.
- Visual: 5 nodos hexagonales conectados con latidos y un bloque "VM" (cielo) que migra en bucle entre dos nodos. Va en la columna derecha (5/12). En móvil es una franja compacta de máx. 24dvh entre el título y los datos, y se oculta en horizontal de poca altura.

**2. Contenido**

- Título: "Contenido". Seis tarjetas numeradas, en 3×2 (escritorio), 2×3 (tablet) o 1×6 (móvil), con iconos de Lucide:
  - 01 Introducción y ¿qué es un clúster? (`Boxes`)
  - 02 Corosync: comunicación entre nodos (`Radio`)
  - 03 Quórum, números impares y split-brain (`Vote`)
  - 04 Live Migration: RAM y CPU (`ArrowRightLeft`)
  - 05 HA y Fencing: STONITH (`ShieldAlert`)
  - 06 Monitoreo y conclusión final (`Activity`)

**3. Tema 01: El problema del servidor único**

- Viñetas: Un solo servidor es un punto único de falla (SPOF). · Si cae, el servicio se detiene por completo. · Los servicios críticos deben estar disponibles de forma continua. · Solución: unir varios servidores para que trabajen como uno solo.
- Visual: dos mitades comparativas. Un servidor que se vuelve coral ("cae") frente a tres servidores en menta donde uno cae y los otros dos siguen activos.

**4. Tema 01: ¿Qué es un clúster?**

- Definición: Un clúster es un conjunto de servidores (nodos) interconectados que funcionan como un único sistema.
- Cuatro chips: Nodos · Red de interconexión · Almacenamiento compartido o distribuido · Software de gestión del clúster.
- Pestañas interactivas: **Alta disponibilidad:** si un nodo falla, otro asume el servicio. · **Balanceo de carga:** reparte las solicitudes entre varios nodos. · **Alto rendimiento (HPC):** combina la potencia de cálculo de muchos nodos.
- Visual: diagrama de 5 nodos con tooltips.

**5. Tema 02: Corosync: la capa de comunicación del clúster**

- Viñetas: Motor de mensajería y membresía del clúster. · Los nodos se avisan entre sí con latidos (heartbeats). · Garantiza que todos compartan la misma vista de qué nodos están activos. · Lo usan gestores como Pacemaker y plataformas como Proxmox VE.
- Visual: pila de 4 capas (Servicios y VM → Gestor de recursos → **Corosync**, resaltada con brillo → Red).

**6. Tema 02: ¿Cómo se comunican los nodos?**

- Línea de tiempo de 4 pasos: 1. Cada nodo emite latidos periódicos. · 2. Los demás confirman que sigue activo. · 3. Si deja de responder tras un tiempo de espera, se marca como caído. · 4. Se recalcula la membresía y se avisa al gestor de recursos.
- Nota: Puede usar varios enlaces de red para tener redundancia.
- Interruptor "Todos en línea / Falla un nodo": en el segundo estado, un nodo pasa a coral y sus latidos se interrumpen.

**7. Tema 03: Quórum y números impares**

- Fórmula en mono: `Quórum = ⌊N / 2⌋ + 1`
- Texto: El clúster solo opera si la mayoría de los nodos se ve entre sí.
- Tabla, cada fila con puntos de votos (menta los necesarios, gris el resto):


| Nodos (N) | Quórum | Fallos tolerados |
| --------- | ------ | ---------------- |
| 2         | 2      | 0                |
| 3         | 2      | 1                |
| 4         | 3      | 1                |
| 5         | 3      | 2                |


- Mensaje destacado en ámbar: Un número par no agrega tolerancia: 4 nodos toleran los mismos fallos que 3.
- En móvil la tabla no hace scroll horizontal: los puntos de votos pasan bajo el número de nodos.

**8. Tema 03: Split-brain: cuando el clúster se divide**

- Viñetas: Una falla de red separa los nodos en dos grupos. · Cada grupo cree ser el único activo. · Ambos escriben sobre los mismos datos: inconsistencia o corrupción. · Prevención: quórum y fencing.
- Visual: 5 nodos partidos en grupos de 3 y 2 por un enlace roto (coral).
- Interruptor "Sin protección" (ambos grupos en coral con la etiqueta "¿activo?") / "Con quórum" (el grupo de 3 en menta "opera" y el de 2 en ámbar "detenido").

**9. Tema 04: Live Migration: mover una VM sin apagarla**

- Viñetas: Traslada una máquina virtual en ejecución de un nodo a otro. · El servicio continúa; la pausa dura milisegundos. · Permite dar mantenimiento sin interrumpir a los usuarios. · Requiere almacenamiento compartido (o migración de disco), red rápida y CPUs compatibles.
- Visual: dos hosts con una VM (cielo) que viaja por el enlace en bucle.

**10. Tema 04: Proceso de migración (RAM + CPU)**

- Paso a paso de 4 fases con botones Anterior/Siguiente: 1. **Preparación:** el nodo destino reserva recursos y crea una VM vacía. · 2. **Copia de RAM:** se copian las páginas de memoria mientras la VM sigue ejecutándose; las páginas modificadas se vuelven a copiar en rondas. · 3. **Pausa breve:** se detiene la VM un instante y se transfieren el estado de la CPU y las últimas páginas. · 4. **Reanudación:** la VM continúa en el nodo destino y se libera el origen.
- Visual: dos hosts con puntos de RAM que fluyen, un chip de CPU que se traslada en la fase 3 y la etiqueta "pausa ≈ ms".

**11. Tema 05: Alta disponibilidad (HA)**

- Viñetas: Objetivo: que los servicios sigan activos aunque falle un nodo. · Ante una falla, los servicios se reinician automáticamente en otro nodo (failover). · La disponibilidad se mide en porcentaje. · Requiere detección de fallos, quórum y recursos redundantes.
- Visual: tres barras que se acortan: 99 % → 3,65 días de caída al año · 99,9 % → 8,76 horas · 99,99 % → 52,6 minutos.

**12. Tema 05: Fencing: aislar antes de recuperar**

- Viñetas: Impide que un nodo fallido o inalcanzable siga usando recursos compartidos. · STONITH ("Shoot The Other Node In The Head") lo apaga o reinicia de forma forzada. · Se logra, por ejemplo, con control de energía (PDU) o gestión remota (IPMI, iLO, iDRAC). · Solo después se recuperan sus servicios en otro nodo.
- Paso a paso de 3 pasos: Falla detectada (coral) → Nodo aislado con STONITH → Servicios recuperados en otro nodo (menta).

**13. Tema 06: Monitoreo del clúster**

- Dos columnas de tarjetas breves. **Qué vigilar:** estado de nodos y quórum · latencia de latidos · uso de CPU, RAM, red y almacenamiento · estado de VM y recursos. **Cómo hacerlo:** alertas automáticas · paneles de control · herramientas de ejemplo: Prometheus con Grafana, Zabbix, Nagios · comandos de estado: `crm_mon`, `corosync-quorumtool`.
- Visual: mini panel decorativo (LED de estado y sparklines con datos fijos), con `role="img"` y `aria-label`.

**14. Tema 06: Conclusión final y cierre**

- Cuatro conclusiones numeradas: 1. Un clúster elimina el punto único de falla. · 2. Corosync mantiene a los nodos comunicados y con la misma vista del clúster. · 3. El quórum y el fencing evitan el split-brain y protegen los datos. · 4. Live Migration y el monitoreo permiten mantener el servicio sin interrupciones.
- Cierre: **¡Gracias! ¿Preguntas?** · Saúl Ramos · Gabriel Bastardo (solo nombres, sin cédulas).

### Detalles técnicos

- React + TypeScript con TanStack Start (arquitectura actual), Tailwind CSS v4, Framer Motion y lucide-react. Sin más dependencias.
- Fuentes cargadas con etiquetas `link` en la raíz; tokens de color como variables CSS semánticas en `src/styles.css`, sin colores escritos a mano en los componentes.
- Contenido de las 14 diapositivas en un único archivo tipado (`src/data/slides.ts`) con `id`, `topic`, título, viñetas y tipo de visual. Los datos de la portada (estudiantes, asignatura, institución), la tabla de quórum y las cifras de disponibilidad viven ahí, no en los componentes.
- Componentes: `SlideLayout`, `TopicRail`, `SlideNavigator`, `BackgroundMesh`, y los diagramas `ClusterGraph`, `LayerStack`, `QuorumTable`, `SplitBrainDiagram`, `MigrationStepper`, `FencingStepper`, `AvailabilityBars`, `MiniDashboard`.
- La presentación vive en la ruta principal `/`, con metadatos propios (título, descripción, Open Graph y Twitter).
- Accesibilidad: los diagramas puramente decorativos llevan `aria-hidden`; los que transmiten información llevan `role="img"` con `aria-label`. Los controles interactivos son botones reales con foco visible.
- No se añade base de datos, autenticación, API ni almacenamiento local.

### Validación antes de entregar

- Revisar las 14 diapositivas en 1920×1080, 1440×900, 1366×768, 1024×768, 820×1180, 390×844 y 844×390, con capturas.
- Verificar que no hay solapes, recortes ni amontonamiento; que los diagramas no invaden el texto; que los tooltips no tapan contenido esencial; y que la tabla de quórum no hace scroll horizontal en móvil.
- Confirmar que la portada muestra los datos exactos (nombres, cédulas, asignatura e institución) y que las cédulas no aparecen en la diapositiva 14.
- Confirmar los tamaños mínimos de fuente (16 px de cuerpo, 12 px de etiquetas) y el interlineado en todas las resoluciones.
- Probar teclado, clic, gestos, hash, pantalla completa, foco visible, controles interactivos con teclado y movimiento reducido; consola sin errores.
- Confirmar que el riel se oculta en la portada, marca el tema correcto en cada diapositiva y pasa a barra inferior bajo 1024 px.