# Changelog — lunallena.co + nextfullmoon.co

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
