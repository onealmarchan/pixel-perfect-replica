# Clúster y Migraciones — Presentación web de 14 diapositivas

Presentación expositiva en español, oscura, con estética de consola de datacenter, diagramas SVG animados y navegación por teclado, clic y gestos. Sin backend ni simulaciones reales: todos los datos son fijos.

## Identidad visual

- Fondo grafito verdoso (#07110F), superficies con borde fino, esquinas con "corchetes" decorativos y brillo suave del color de acento.
- Paleta: menta (#34D399), cielo (#38BDF8), ámbar (#FBBF24), coral (#FB7185). Gradiente de marca menta → cielo.
- Cada tema cambia el acento: T1 menta, T2 cielo, T3 ámbar, T4 cielo→menta, T5 coral, T6 menta.
- Tipografías de Google Fonts: Sora (títulos), DM Sans (cuerpo), IBM Plex Mono (etiquetas y código).
- Estado de nodos consistente en toda la presentación: activo menta, con problema ámbar, caído coral, VM cielo.

## Estructura y responsive

- Cada diapositiva ocupa la altura completa con rejilla cabecera / contenido / pie y padding seguro fluido.
- Escritorio: dos columnas (texto y visual) con el riel de temas en columna reservada. Tablet: una columna con el visual debajo. Móvil: una columna y el riel pasa a barra inferior, con scroll interno si hace falta.
- Horizontal de poca altura: se ocultan fondos decorativos y se reducen los visuales.
- Tipografía fluida con mínimos de 16 px en cuerpo y 12 px en etiquetas. Máximo 4 viñetas por diapositiva.
- Regla dura: nada de texto posicionado en absoluto, diagramas confinados a su celda, sin solapes ni recortes.

## Navegación

- Flechas, barra espaciadora, AvPág/RePág, botones anterior/siguiente, deslizamiento horizontal táctil y pantalla completa con F.
- Hash #1 a #14 sincronizado con la carga inicial y los botones atrás/adelante; título de pestaña con número y nombre.
- Al cambiar de diapositiva el foco pasa al título y se anuncia con aria-live.

## Animación

- Dentro del mismo tema: desvanecido y desplazamiento vertical suave. Al cambiar de tema: barrido horizontal con borde luminoso del acento.
- Entradas escalonadas: etiqueta y título, luego viñetas, luego visual. Latidos continuos en los enlaces del fondo y LED de estado.
- Con preferencia de movimiento reducido: solo desvanecidos, sin movimiento continuo.

## Las 14 diapositivas

1. Portada con título, estudiantes (Saúl Ramos · C.I: 31.156.858, Gabriel Bastardo · C.I: 31.257.502), asignatura e institución, y visual de 5 nodos con una VM que migra en bucle.
2. Contenido: seis tarjetas numeradas con iconos.
3. El problema del servidor único: comparación un servidor vs. tres.
4. ¿Qué es un clúster?: definición, cuatro chips y pestañas interactivas (alta disponibilidad, balanceo, HPC).
5. Corosync: pila de 4 capas con la capa de Corosync resaltada.
6. Cómo se comunican los nodos: línea de tiempo de 4 pasos e interruptor "Todos en línea / Falla un nodo".
7. Quórum y números impares: fórmula, tabla de votos y aviso en ámbar sobre números pares.
8. Split-brain: diagrama partido 3 y 2, con interruptor "Sin protección / Con quórum".
9. Live Migration: dos hosts y una VM que viaja por el enlace.
10. Proceso de migración: paso a paso de 4 fases con RAM fluyendo, chip de CPU y etiqueta "pausa ≈ ms".
11. Alta disponibilidad: tres barras de disponibilidad (99 %, 99,9 %, 99,99 %).
12. Fencing y STONITH: paso a paso de 3 pasos.
13. Monitoreo: dos columnas de tarjetas y un mini panel decorativo con sparklines fijos.
14. Conclusión y cierre con agradecimiento y nombres.

Todos los textos se usan exactamente como los entregaste.

## Detalles técnicos

- React + TypeScript con TanStack Start (arquitectura actual), Tailwind CSS v4, Framer Motion y lucide-react.
- Fuentes cargadas con etiquetas link en la raíz; tokens de color definidos como variables CSS semánticas en `src/styles.css`, sin colores escritos a mano en los componentes.
- Contenido de las 14 diapositivas en un único archivo tipado (`src/data/slides.ts`) con id, tema, título, viñetas y tipo de visual.
- Componentes: `SlideLayout`, `TopicRail`, `SlideNavigator`, `BackgroundMesh`, y diagramas `ClusterGraph`, `LayerStack`, `QuorumTable`, `SplitBrainDiagram`, `MigrationStepper`, `FencingStepper`, `AvailabilityBars`, `MiniDashboard`.
- La presentación vive en la ruta principal `/`, con metadatos propios (título, descripción, Open Graph y Twitter).
- Controles interactivos como botones reales con `aria-pressed`/`aria-selected` y foco visible.

## Validación antes de entregar

- Revisión de las 14 diapositivas en 1920×1080, 1440×900, 1366×768, 1024×768, 820×1180, 390×844 y 844×390 con capturas.
- Verificar ausencia de solapes, recortes y amontonamiento; diagramas que no invaden el texto.
- Probar teclado, clic, gestos, hash, pantalla completa y movimiento reducido; consola sin errores.
