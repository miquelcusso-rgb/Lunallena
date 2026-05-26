/* ══════════════════════════════════════════════════════════
   LunaLlena · moon-visuals.js
   Shared visual helpers for secondary pages.
   - Real-illumination SVG moon renderer (terminator geometry)
   - Phase cycle timeline, full-moon timeline, countdowns
   No dependencies. Plain ES5-ish for broad support.
   ══════════════════════════════════════════════════════════ */
(function(){
'use strict';

var EN = location.hostname.indexOf('nextfullmoon') > -1;
var LC = 29.530588853;                                   // synodic month (days)
var REF = new Date('2000-01-06T18:14:00Z').getTime();    // known new moon

function lunarAge(d){ return ((((d.getTime()-REF)/86400000) % LC) + LC) % LC; }
function lunarIllum(age){ return (1 - Math.cos(age/LC*2*Math.PI))/2; }          // 0..1
function nextFullDate(d){ var a=lunarAge(d); var dd=a<=14.765?14.765-a:LC-a+14.765; return new Date(d.getTime()+dd*86400000); }
function nextNewDate(d){ var a=lunarAge(d); var dd=LC-a; return new Date(d.getTime()+dd*86400000); }

var PHASES_ES = ['Luna nueva','Luna creciente','Cuarto creciente','Gibosa creciente','Luna llena','Gibosa menguante','Cuarto menguante','Luna menguante'];
var PHASES_EN = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous','Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
function phaseName(age){
  var i;
  if(age<1.85)i=0;else if(age<7.38)i=1;else if(age<9.22)i=2;else if(age<14.77)i=3;
  else if(age<16.61)i=4;else if(age<22.15)i=5;else if(age<23.99)i=6;else i=7;
  return (EN?PHASES_EN:PHASES_ES)[i];
}

/* ── core renderer ──────────────────────────────────────────
   age01: position in synodic cycle 0..1 (0 new, .25 first qtr,
          .5 full, .75 last qtr). Lit side: right when waxing.
   Returns an <svg> string. opts: {glow:true, maria:true}
   ──────────────────────────────────────────────────────────── */
function moonSVGfromAge(age01, opts){
  opts = opts || {};
  var R = 49, C = 50;
  var a = ((age01 % 1) + 1) % 1;
  var t = Math.cos(2*Math.PI*a);          // +1 new … 0 quarter … -1 full
  var rx = Math.abs(t) * R;
  var illum = (1 - t) / 2;                 // 0..1 illuminated fraction
  var waxing = a < 0.5;                    // lit on the right
  var gibbous = illum > 0.5;               // more than half lit
  // limb = lit-side outer semicircle (top→bottom)
  var limbSweep = waxing ? 1 : 0;
  // terminator (bottom→top): bows toward dark side (gibbous) or lit side (crescent)
  var termSweep = gibbous ? limbSweep : (1 - limbSweep);
  var lit = 'M'+C+' '+(C-R)+
            ' A '+R+' '+R+' 0 0 '+limbSweep+' '+C+' '+(C+R)+
            ' A '+rx+' '+R+' 0 0 '+termSweep+' '+C+' '+(C-R)+' Z';
  var uid = 'm'+Math.random().toString(36).slice(2,8);
  var maria = '';
  if(opts.maria!==false){
    // a few faint basaltic patches for character (clipped to lit area)
    maria = '<g clip-path="url(#lit'+uid+')" opacity=".5">'+
      '<ellipse cx="38" cy="36" rx="13" ry="11" fill="#9a9ab2" opacity=".22"/>'+
      '<ellipse cx="60" cy="40" rx="9" ry="8" fill="#9a9ab2" opacity=".18"/>'+
      '<ellipse cx="58" cy="60" rx="11" ry="9" fill="#9a9ab2" opacity=".16"/>'+
      '<ellipse cx="40" cy="62" rx="7" ry="6" fill="#9a9ab2" opacity=".14"/>'+
      '<ellipse cx="50" cy="48" rx="5" ry="4" fill="#9a9ab2" opacity=".12"/></g>';
  }
  var glow = opts.glow===false ? '' : ' style="filter:drop-shadow(0 0 6px rgba(220,220,255,.22))"';
  return '<svg class="moon-svg" viewBox="0 0 100 100" role="img"'+glow+'>'+
    '<defs>'+
      '<radialGradient id="g'+uid+'" cx="40%" cy="38%" r="68%">'+
        '<stop offset="0%" stop-color="#fbfbff"/>'+
        '<stop offset="45%" stop-color="#e6e6f2"/>'+
        '<stop offset="80%" stop-color="#c2c2d6"/>'+
        '<stop offset="100%" stop-color="#9494ac"/>'+
      '</radialGradient>'+
      '<clipPath id="lit'+uid+'"><path d="'+lit+'"/></clipPath>'+
    '</defs>'+
    '<circle cx="50" cy="50" r="49" fill="#0a0a16"/>'+          // dark body
    '<circle cx="50" cy="50" r="49" fill="none" stroke="rgba(196,196,255,.16)" stroke-width="1"/>'+
    (a<0.002 ? '' : '<path d="'+lit+'" fill="url(#g'+uid+')"/>')+ // lit region
    maria+
    '<circle cx="50" cy="50" r="49" fill="none" stroke="rgba(196,196,255,.10)" stroke-width="1"/>'+
  '</svg>';
}

// convenience: render from illuminated fraction + waning flag
function moonSVG(frac, waning, opts){
  frac = Math.max(0, Math.min(1, frac));
  // invert lunarIllum: illum = (1-cos θ)/2  →  θ = acos(1-2·illum)
  var theta = Math.acos(1 - 2*frac);     // 0..π
  var age01 = theta/(2*Math.PI);         // waxing 0..0.5
  if(waning) age01 = 1 - age01;          // mirror to 0.5..1
  return moonSVGfromAge(age01, opts);
}

/* ── auto-init: [data-moon] ──────────────────────────────────
   data-moon="today" | "<frac 0..1>"
   data-waning="1" (optional, for explicit frac)
   ──────────────────────────────────────────────────────────── */
function renderMoons(root){
  (root||document).querySelectorAll('[data-moon]').forEach(function(el){
    if(el.dataset.moonRendered) return;
    var v = el.getAttribute('data-moon');
    var html;
    if(v==='today'){
      var age = lunarAge(new Date());
      html = moonSVGfromAge(age/LC, {maria:el.dataset.maria!=='0'});
    } else if(/^age:/.test(v)){
      html = moonSVGfromAge(parseFloat(v.slice(4)), {maria:el.dataset.maria!=='0'});
    } else {
      var frac = parseFloat(v);
      html = moonSVG(frac, el.getAttribute('data-waning')==='1', {maria:el.dataset.maria!=='0'});
    }
    el.innerHTML = html;
    el.dataset.moonRendered = '1';
  });
}

/* ── countdown: [data-countdown] ─────────────────────────────
   data-countdown="full" | "new" | ISO date string
   Updates [data-cd-d] [data-cd-h] [data-cd-m] [data-cd-s] inside.
   ──────────────────────────────────────────────────────────── */
function initCountdowns(){
  var els = [].slice.call(document.querySelectorAll('[data-countdown]'));
  if(!els.length) return;
  function tick(){
    var now = new Date();
    els.forEach(function(el){
      var spec = el.getAttribute('data-countdown'), target;
      if(spec==='full') target = nextFullDate(now);
      else if(spec==='new') target = nextNewDate(now);
      else target = new Date(spec);
      var diff = Math.max(0, target - now);
      var d = Math.floor(diff/86400000);
      var h = Math.floor(diff/3600000)%24;
      var m = Math.floor(diff/60000)%60;
      var s = Math.floor(diff/1000)%60;
      set(el,'d',d); set(el,'h',h); set(el,'m',m); set(el,'s',s);
      var dateEl = el.querySelector('[data-cd-date]');
      if(dateEl) dateEl.textContent = target.toLocaleDateString(EN?'en-US':'es-ES',{day:'numeric',month:'long',year:'numeric'});
    });
  }
  function set(el,k,v){ var n=el.querySelector('[data-cd-'+k+']'); if(n) n.textContent = (v<10?'0':'')+v; }
  tick(); setInterval(tick, 1000);
}

/* ── phase cycle strip: [data-phase-strip] ───────────────────
   Renders the 8 canonical phases as labelled mini-moons.
   ──────────────────────────────────────────────────────────── */
function initPhaseStrips(){
  var ages = [0, .125, .25, .375, .5, .625, .75, .875];
  document.querySelectorAll('[data-phase-strip]').forEach(function(el){
    var names = EN?PHASES_EN:PHASES_ES;
    var html = '';
    ages.forEach(function(a,i){
      html += '<div class="phase-strip-item">'+
        '<div class="moon-ico">'+moonSVGfromAge(a,{maria:false,glow:true})+'</div>'+
        '<div class="phase-strip-label">'+names[i]+'</div></div>';
    });
    el.innerHTML = html;
  });
}

// expose
window.LunaVisuals = {
  moonSVG: moonSVG, moonSVGfromAge: moonSVGfromAge,
  lunarAge: lunarAge, lunarIllum: lunarIllum,
  nextFullDate: nextFullDate, nextNewDate: nextNewDate,
  phaseName: phaseName, render: renderMoons, EN: EN
};

// translate any [data-en][data-es] node inside our components (idempotent)
function initI18n(){
  document.querySelectorAll('.lv-i18n [data-en][data-es]').forEach(function(el){
    el.textContent = EN ? el.getAttribute('data-en') : el.getAttribute('data-es');
  });
}

function init(){ initI18n(); renderMoons(); initCountdowns(); initPhaseStrips(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
