# Changelog — lunallena.co + nextfullmoon.co

## 2026-05-30 22:18 · nextfullmoon.co — buck-moon landing + harvest-moon date fix
- **Acción**: creada `/buck-moon` (nextfullmoon.co, EN; alias ES `/luna-del-ciervo`), replicando el template ya indexado de strawberry-moon. 14.800 búsquedas/mes. Fechas verificadas con almanac.com/timeanddate: Buck 2026 = 29 jul 14:36 UTC, 2027 = 18 jul, 2028 = 6 jul (con eclipse lunar parcial).
- **Schema**: Article + Event (`startDate 2026-07-29T14:36:00Z`) + FAQPage×6 + BreadcrumbList. Añadido también Event + BreadcrumbList a `blue-moon` y `harvest-moon` (antes sólo Article+FAQPage) → las 3 ahora homogéneas con luna-de-fresa.
- **FIX crítico**: `harvest-moon.html` afirmaba Harvest Moon 2026 = **28 ago** (en realidad es la Sturgeon Moon). Corregido a **26 sep · 16:49 UTC** (la luna llena más cercana al equinoccio del 22 sep, a 4 días vs 25 de agosto). Verificado con 4 fuentes. Restaurado además el `adsbygoogle.push()` que se había borrado del ad-slot.
- **Cross-linking**: cluster de lunas interconectado — blue ahora enlaza strawberry/harvest/buck (antes no enlazaba ninguna hermana); harvest y buck enlazan entre sí.
- **vercel.json**: rewrites `/buck-moon` y `/luna-del-ciervo` → `buck-moon.html`.
- **Sitemap**: +2 URLs (buck-moon EN + luna-del-ciervo ES), priority 0.9, lastmod 2026-05-30. Total 25 URLs.
- **Verificado**: render en preview OK (sin errores de consola, lang-switch EN↔ES funciona, tabla con fechas correctas), JSON-LD de las 3 páginas parsea válido (4 bloques c/u).
- **Impacto**: Fase 3 Content Machine. ~370K vol/mes combinado en el cluster (blue 246K ya existía, harvest 110K ya existía, buck 14.8K nuevo). AdSense in-article.
- **Coste**: 0 €.
- **Siguiente**: `seo-resubmit.js` (sitemap a GSC) tras push + solicitar indexación manual de `/buck-moon` en GSC. Crear restantes (beaver CPC$17.66 nov, snow, hunters, worm, cold).

## 2026-05-30 · lunallena.co + nextfullmoon.co — strawberry moon / luna de fresa landings (URGENTE)
- **Acción**: creada `/luna-de-fresa` (lunallena.co, ES). `strawberry-moon.html` ya existía (nextfullmoon.co, EN). 110.000 búsquedas/mes, CPC $1.58, peak en junio 2026.
- **Schema**: Article + Event (`startDate: 2026-06-29T23:56:00Z`) + FAQPage×5 + BreadcrumbList.
- **hreflang**: ES `lunallena.co/luna-de-fresa` ↔ EN `nextfullmoon.co/strawberry-moon` corregido en ambas páginas.
- **vercel.json**: corregido conflicto rewrite+redirect en `/luna-de-fresa`; redirect 308 `/luna-fresa→/luna-de-fresa` para consolidar slug anterior.
- **Sitemap**: eliminada entrada `/luna-fresa` (ahora redirige); entrada `/luna-de-fresa` ya estaba con hreflang correcta.
- **Impacto**: Fase 3 Content Machine — named-moon landings ES+EN. AdSense revenue potencial: ~$87/mes en pico estacional.
- **Coste**: 0 €.
- **Siguiente**: Miqui reautenticar OAuth GSC (token caducado) → `node ~/Documents/sites-system/tools/mywebgent/seo-resubmit.js` → solicitar indexación manual en GSC de `lunallena.co/luna-de-fresa` + `nextfullmoon.co/strawberry-moon`.

## 2026-05-30 01:22 · lunallena.co + nextfullmoon.co
- **Acción**: aplicado @furiosadata Twitter Cards (site/creator) + Organization.sameAs JSON-LD en 17 HTMLs (ambos hosts).
- **Impacto**: seo-status lunallena + nextfullmoon GEO·IA → green.
- **Coste**: 0 €.
- **Siguiente**: verificar twitter card validator en ambos dominios + GSC.
