# Calendario editorial · Lunallena / Next Full Moon

> Plan de contenido estacional para `lunallena.co` (ES) y `nextfullmoon.co` (EN).
> Estrategia: capturar tráfico de búsqueda recurrente alrededor de eventos
> astronómicos reales (lunas llenas con nombre, eclipses, superlunas, lluvias de
> meteoros). Cada evento tiene un pico de búsqueda predecible las 2–3 semanas
> previas → publicar con antelación y refrescar cada año (evergreen estacional).

## Cómo funciona este plan

- **Una pieza por evento mensual.** El nombre folclórico de cada luna llena
  (Luna de Fresa, de Cosecha, etc.) es la keyword principal: alto volumen,
  baja competencia, estacionalidad clarísima.
- **Publicar 2–3 semanas antes** del evento para que Google indexe a tiempo.
- **Evergreen:** la misma URL se reutiliza cada año actualizando fecha/hora y
  `dateModified` en el JSON-LD. No crear `/luna-fresa-2026` y `/luna-fresa-2027`;
  usar `/luna-fresa` y actualizar.
- **Enlazado interno obligatorio** desde cada pieza hacia: home (countdown),
  `/lunas-llenas` (hub), `/eclipses` cuando aplique, y la pieza del mes siguiente.
- **Formato:** artículo en `.wrap` (máx. 820px), `<h1>` con keyword, schema
  `Article`, bloque host-aware ES/EN, 2 ad-slots, tarjetas de datos.
- **Idioma:** mismo HTML sirve ES (lunallena.co) y EN (nextfullmoon.co) vía
  detección de host (patrón ya existente en el repo).

## Datos astronómicos de referencia (verificados)

### Próximas lunas llenas (jun 2026 – jun 2027)

| Mes | Fecha (UTC aprox.) | Nombre ES | Nombre EN | Notas |
|---|---|---|---|---|
| Jun 2026 | 29 jun | Luna de Fresa | Strawberry Moon | última del periodo "miel" |
| Jul 2026 | 29 jul | Luna del Ciervo | Buck Moon | "Luna del Trueno" |
| Ago 2026 | 28 ago | Luna del Esturión | Sturgeon Moon | eclipse lunar parcial 27–28 ago |
| Sep 2026 | 26 sep | Luna de la Cosecha | Harvest Moon | la más buscada del año |
| Oct 2026 | 26 oct | Luna del Cazador | Hunter's Moon | — |
| Nov 2026 | 24 nov | Luna del Castor | Beaver Moon | **Superluna** |
| Dic 2026 | 24 dic | Luna Fría | Cold Moon | **Superluna**, cerca de Navidad |
| Ene 2027 | 22 ene | Luna del Lobo | Wolf Moon | — |
| Feb 2027 | 20 feb | Luna de Nieve | Snow Moon | — |
| Mar 2027 | 22 mar | Luna del Gusano | Worm Moon | 1ª luna de primavera |
| Abr 2027 | 20 abr | Luna Rosa | Pink Moon | determina la Pascua |
| May 2027 | ~20 may | Luna de Flores | Flower Moon | Beltane |
| Jun 2027 | ~18 jun | Luna de Fresa | Strawberry Moon | refrescar pieza Jun 2026 |

> Horas exactas: confirmar contra timeanddate.com / NASA SVS antes de publicar.
> El countdown del home ya calcula la próxima luna llena en tiempo real (SunCalc).

### Eclipses (ya cubiertos en `/eclipses`, refrescar fechas)

| Fecha | Tipo | Visibilidad |
|---|---|---|
| 12 ago 2026 | Eclipse solar **total** | Europa, N de Asia, N/O de África, N de América |
| 27–28 ago 2026 | Eclipse lunar parcial | América, parte de Europa y África |
| 6 feb 2027 | Eclipse solar anular | África, Sudamérica |
| 2 ago 2027 | Eclipse solar **total** | Europa, S/O de Asia, África ("eclipse del siglo", 6m23s) |

### Lluvias de meteoros (2026)

| Lluvia | Pico | Notas |
|---|---|---|
| Líridas | 22–23 abr | — |
| Perseidas | 12–13 ago | coincide con eclipse solar total; gran año |
| Oriónidas | 21–22 oct | — |
| Leónidas | 16–17 nov | — |
| Gemínidas | 13–14 dic | la mejor del año |
| Cuadrántidas | 3–4 ene (2027) | pico corto e intenso |

## Plan de publicaciones (12 meses)

Cada fila: pieza, URL objetivo, keyword principal, formato, fecha de publicación
sugerida (≈3 semanas antes del evento), prioridad.

| # | Pieza | URL | Keyword principal (ES / EN) | Formato | Publicar | Prio |
|---|---|---|---|---|---|---|
| 1 | **Luna de Fresa jun 2026** | `/luna-fresa` | "luna de fresa" / "strawberry moon" | Artículo evento | ~8 jun 2026 | 🔴 alta |
| 2 | Luna del Ciervo jul 2026 | `/luna-ciervo` | "luna del ciervo" / "buck moon" | Artículo evento | ~8 jul 2026 | 🟡 media |
| 3 | Luna del Esturión + eclipse ago | `/luna-esturion` | "luna del esturión" / "sturgeon moon" | Artículo evento + cross-link eclipses | ~7 ago 2026 | 🟡 media |
| 4 | **Luna de la Cosecha sep 2026** | `/luna-cosecha` | "luna de la cosecha" / "harvest moon" | Artículo evento (pieza estrella) | ~5 sep 2026 | 🔴 alta |
| 5 | Luna del Cazador oct 2026 | `/luna-cazador` | "luna del cazador" / "hunter's moon" | Artículo evento | ~5 oct 2026 | 🟢 baja |
| 6 | **Superluna del Castor nov 2026** | `/superluna` | "superluna 2026" / "supermoon 2026" | Artículo evento + evergreen superluna | ~3 nov 2026 | 🔴 alta |
| 7 | Luna Fría + Superluna de Navidad | `/luna-fria` | "luna fría" / "cold moon" | Artículo evento (ángulo navideño) | ~3 dic 2026 | 🟡 media |
| 8 | Gemínidas dic 2026 | `/lluvia-meteoros` | "lluvia de meteoros diciembre" / "geminids 2026" | Guía observación (evergreen) | ~25 nov 2026 | 🟡 media |
| 9 | Luna del Lobo ene 2027 | `/luna-lobo` | "luna del lobo" / "wolf moon" | Artículo evento | ~1 ene 2027 | 🟢 baja |
| 10 | Luna de Nieve feb 2027 | `/luna-nieve` | "luna de nieve" / "snow moon" | Artículo evento | ~30 ene 2027 | 🟢 baja |
| 11 | Luna del Gusano mar 2027 | `/luna-gusano` | "luna del gusano" / "worm moon" | Artículo evento | ~1 mar 2027 | 🟢 baja |
| 12 | Luna Rosa abr 2027 | `/luna-rosa` | "luna rosa" / "pink moon" | Artículo evento (ángulo Pascua) | ~30 mar 2027 | 🟡 media |
| 13 | Luna de Flores may 2027 | `/luna-flores` | "luna de flores" / "flower moon" | Artículo evento | ~29 abr 2027 | 🟢 baja |
| — | **Eclipse solar total ago 2027** | `/eclipses` (refrescar) | "eclipse solar 2027" / "2027 solar eclipse" | Actualizar pieza existente | ~jul 2027 | 🔴 alta |

### Prioridad de ejecución (limitado a ~10 h/sem)

1. **Luna de Fresa** (#1) — siguiente evento real, plantilla reutilizable. ✅ creada en este PR.
2. **Luna de la Cosecha** (#4) — mayor volumen de búsqueda anual.
3. **Superluna** (#6) — keyword evergreen de alto interés.
4. El resto se clona desde la plantilla de #1 cambiando datos + bloque EN.

## Plantilla por pieza (checklist)

- [ ] `<head>` SEO completo con ids (`pg-title`, `pg-desc`, `pg-canonical`, OG, Twitter).
- [ ] `hreflang` es / en / x-default a las dos URLs.
- [ ] JSON-LD `Article` con `datePublished` + `dateModified`.
- [ ] Un solo `<h1>` con la keyword principal.
- [ ] Bloque `if(EN){...}` host-aware que traduce todo el copy.
- [ ] GTM host-aware sin tocar (copiar tal cual del resto de páginas).
- [ ] 2 ad-slots AdSense + consentimiento de cookies (copiar patrón).
- [ ] Enlaces internos: home, `/lunas-llenas`, pieza del mes siguiente, `/eclipses` si aplica.
- [ ] Añadir entrada a `sitemap.xml` y rewrite a `vercel.json`.
- [ ] Añadir item al menú slide-in si es pieza permanente (opcional para eventos).
- [ ] Verificar a 360 px, contraste AA, `prefers-reduced-motion`.

## Ideas evergreen adicionales (sin fecha fija)

- "¿Por qué la luna se ve más grande en el horizonte?" (ilusión lunar).
- "Calendario lunar 2027 completo" (tabla anual, refrescar cada año).
- "Luna y mareas: cómo afecta la luna llena al mar".
- "Plantar según la luna: calendario biodinámico" (nicho jardinería).
