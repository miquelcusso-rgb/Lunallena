#!/usr/bin/env node
/**
 * build.mjs — Motor de frescura de "próxima luna llena" para lunallena.co / nextfullmoon.co.
 *
 * Lee data/moons.json + la fecha actual → regenera el bloque "próxima luna" en
 * next-full-moon.html (EN) y proxima-luna-llena.html (ES): meta description, og,
 * el dict JS meta, el lead visible (entre <!--NFM:LEAD-->), las 2 FAQs de fecha y
 * dateModified. Idempotente (regex sobre anclas estables → escribe el next actual).
 * Corre a diario vía GitHub Action. Para añadir lunas: edita data/moons.json.
 *
 * Test: NE_NOW=2026-08-01T00:00:00Z node build.mjs --dry  (debe pasar a Sturgeon)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DRY = process.argv.includes('--dry');
const NOW = process.env.NE_NOW ? new Date(process.env.NE_NOW) : new Date();
const now = NOW.getTime();

const data = JSON.parse(readFileSync(join(ROOT, 'data/moons.json'), 'utf8'));
const moons = data.moons.map(m => ({ ...m, _t: new Date(m.start).getTime() })).sort((a, b) => a._t - b._t);
const idx = moons.findIndex(m => m._t > now);            // primera luna futura
const next = idx >= 0 ? moons[idx] : null;
const after = idx >= 0 ? moons[idx + 1] : null;
const today = NOW.toISOString().slice(0, 10);

function hhmm(iso) { return iso.slice(11, 16); }
function notable(m, lang) {
  if (!m) return '';
  if (m.notable.includes('eclipse')) return lang === 'en' ? ' (during a lunar eclipse)' : ' (durante un eclipse lunar)';
  if (m.notable.includes('supermoon')) return lang === 'en' ? ' (a supermoon)' : ' (una superluna)';
  if (m.notable.includes('blue')) return lang === 'en' ? ' (a Blue Moon)' : ' (una Luna Azul)';
  return '';
}
function monYear(m, lang) {
  const d = new Date(m.start);
  const mo = (lang === 'en'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'])[d.getUTCMonth()];
  return `${mo} ${d.getUTCFullYear()}`;
}

if (!next) { console.log('[build.mjs] sin lunas futuras en moons.json — añade más. Sin cambios.'); process.exit(0); }

// ── Prosa generada (precisa, genérica) ──
const G = {
  desc_en: `The next full moon is ${next.date_en} (${hhmm(next.start)} UTC) — the ${next.name_en}. Complete calendar of every full moon 2026–2027, with names, dates, exact UTC times and special events (supermoon, blue moon, eclipses).`,
  desc_es: `La próxima luna llena es el ${next.date_es} (${hhmm(next.start)} UTC) — la ${next.name_es}. Calendario completo de cada luna llena 2026–2027, con nombres, fechas, horas exactas en UTC y eventos especiales (superluna, luna azul, eclipses).`,
  og_en: `Next full moon: ${next.date_en} (${next.name_en}). Complete calendar with all 12 full moon names, dates and times.`,
  og_es: `Próxima luna llena: ${next.date_es} (${next.name_es}). Calendario completo con los 12 nombres de luna llena, fechas y horas.`,
  lead_en: `The next full moon is on <strong>${next.date_en} at ${hhmm(next.start)} UTC</strong> — the <strong>${next.name_en}</strong>${notable(next, 'en')}.${after ? ` The full moon after it is the <strong>${after.name_en}</strong> on ${after.date_en}${notable(after, 'en')}.` : ''}`,
  lead_es: `La próxima luna llena es el <strong>${next.date_es} a las ${hhmm(next.start)} UTC</strong> — la <strong>${next.name_es}</strong>${notable(next, 'es')}.${after ? ` La siguiente es la <strong>${after.name_es}</strong> el ${after.date_es}${notable(after, 'es')}.` : ''}`,
  faqWhen_en: `The next full moon is on ${next.date_en}, at ${hhmm(next.start)} UTC. It is the ${next.name_en}.${after ? ` The full moon after it is the ${after.name_en} on ${after.date_en}.` : ''}`,
  faqCalled_en: `The next full moon is the ${next.name_en} (${monYear(next, 'en')}).`,
};
const esc = s => s.replace(/"/g, '&quot;');

function patch(file) {
  let s = readFileSync(join(ROOT, file), 'utf8');
  const before = s;
  // meta description (id) — EN o ES según la página
  s = s.replace(/(<meta name="description" id="pg-desc" content=")[^"]*(")/, (_, a, b) => a + (file.includes('proxima') ? esc(G.desc_es) : esc(G.desc_en)) + b);
  // og:description (id)
  s = s.replace(/(<meta property="og:description" id="og-desc" content=")[^"]*(")/, (_, a, b) => a + (file.includes('proxima') ? esc(G.og_es) : esc(G.og_en)) + b);
  // dict JS meta (en.desc / es.desc / en.ogDesc / es.ogDesc) — anclas en/es estables
  s = s.replace(/(en: \{[\s\S]*?desc: ')[^']*(')/, (_, a, b) => a + G.desc_en + b);
  s = s.replace(/(es: \{[\s\S]*?desc: ')[^']*(')/, (_, a, b) => a + G.desc_es + b);
  s = s.replace(/(en: \{[\s\S]*?ogDesc: ')[^']*(')/, (_, a, b) => a + G.og_en + b);
  s = s.replace(/(es: \{[\s\S]*?ogDesc: ')[^']*(')/, (_, a, b) => a + G.og_es + b);
  // lead visible (entre marcadores)
  s = s.replace(/(<!--NFM:LEAD-->)[\s\S]*?(<!--\/NFM:LEAD-->)/, (_, a, b) =>
    `${a}<div class="answer-text" data-en="${esc(G.lead_en)}" data-es="${esc(G.lead_es)}">${file.includes('proxima') ? G.lead_es : G.lead_en}</div>${b}`);
  // FAQ JSON-LD (EN): "When is the next full moon?" + "What is the next full moon called?"
  s = s.replace(/("When is the next full moon\?","acceptedAnswer":\{"@type":"Answer","text":")[^"]*(")/, (_, a, b) => a + G.faqWhen_en + b);
  s = s.replace(/("What is the next full moon called\?","acceptedAnswer":\{"@type":"Answer","text":")[^"]*(")/, (_, a, b) => a + G.faqCalled_en + b);
  // dateModified
  s = s.replace(/("dateModified":\s*")[^"]*(")/g, (_, a, b) => a + today + b);
  if (s !== before && !DRY) writeFileSync(join(ROOT, file), s);
  return s !== before;
}

const changed = ['next-full-moon.html', 'proxima-luna-llena.html'].filter(patch);
console.log(`[build.mjs] now=${NOW.toISOString()} | próxima=${next.name_en} ${next.date_en} | ${DRY ? '(dry) ' : ''}páginas modificadas: ${changed.length} [${changed.join(', ')}]`);
