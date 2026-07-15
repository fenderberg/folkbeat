"use strict";

/* ============================================================
   INGEBOUWDE GROOVES
   Waarden zijn velocity 0..1, arraylengte = beats * spb.
   Instrumenten: kick, snare, stick (sidestick), hatC, hatO,
                 tomH, tomL, crash, ride, shaker
   ============================================================ */
const BUILTIN_STYLES = [
  {
    id: "reel", name: "Reel", beats: 4, spb: 2, bpm: 110,
    A: {
      kick:  [1,0, 0,0, .9,0, 0,0],
      snare: [0,0, .9,0, 0,0, .9,0],
      hatC:  [.8,.4, .8,.4, .8,.4, .8,.4],
    },
    B: {
      kick:  [1,0, 0,.6, .9,0, 0,0],
      snare: [0,0, .9,0, 0,.4, .9,0],
      ride:  [.8,.4, .8,.4, .8,.4, .8,.4],
    },
    fill: {
      kick:  [1,0, 0,0, 0,0, 0,0],
      snare: [0,0, .9,.5, .7,.7, 0,0],
      tomH:  [0,0, 0,0, 0,0, .9,.7],
      hatC:  [.8,.4, 0,0, 0,0, 0,0],
    },
  },
  {
    id: "jig", name: "Jig", beats: 2, spb: 3, bpm: 115,
    A: {
      kick:  [1,0,0, 0,0,0],
      snare: [0,0,0, .9,0,0],
      hatC:  [.8,.3,.5, .8,.3,.5],
    },
    B: {
      kick:  [1,0,0, 0,0,.5],
      snare: [0,0,.3, .9,0,.3],
      ride:  [.8,.3,.5, .8,.3,.5],
    },
    fill: {
      kick:  [1,0,0, 0,0,0],
      snare: [0,.5,.6, .8,0,0],
      tomH:  [0,0,0, 0,.7,0],
      tomL:  [0,0,0, 0,0,.9],
    },
  },
  {
    id: "polka", name: "Polka", beats: 2, spb: 2, bpm: 120,
    A: {
      kick:  [1,0, 0,0],
      snare: [0,.7, .9,.7],
      hatC:  [.8,.4, .8,.4],
    },
    B: {
      kick:  [1,0, .5,0],
      snare: [0,.7, .9,.7],
      hatO:  [0,.6, 0,.6],
      hatC:  [.8,0, .8,0],
    },
    fill: {
      kick:  [1,0, 0,0],
      snare: [.6,.7, .8,0],
      tomL:  [0,0, 0,.9],
    },
  },
  {
    id: "folkrock", name: "Folk Rock", beats: 4, spb: 2, bpm: 132,
    A: {
      kick:  [1,0, 0,0, .9,0, 0,0],
      snare: [0,0, .9,0, 0,0, .9,0],
      hatC:  [.7,.5, .7,.5, .7,.5, .7,.5],
    },
    B: {
      kick:  [1,0, 0,.5, .9,0, 0,.5],
      snare: [0,0, .9,0, 0,0, .9,0],
      ride:  [.8,.4, .8,.4, .8,.4, .8,.4],
    },
    fill: {
      kick:  [1,0, 0,0, 0,0, 0,0],
      snare: [0,0, .8,.6, .8,.6, .9,0],
      tomH:  [0,0, 0,0, 0,0, .8,0],
      tomL:  [0,0, 0,0, 0,0, 0,.9],
    },
  },
  {
    id: "bluegrass", name: "Bluegrass", beats: 4, spb: 2, bpm: 145,
    A: {
      kick:  [1,0, 0,0, .9,0, 0,0],
      snare: [0,0, .9,0, 0,0, .9,0],
      shaker:[.7,.7, .7,.7, .7,.7, .7,.7],
    },
    B: {
      kick:  [1,0, .5,0, .9,0, .5,0],
      snare: [0,0, .9,.3, 0,0, .9,.3],
      hatC:  [.8,.5, .8,.5, .8,.5, .8,.5],
    },
    fill: {
      kick:  [1,0, 0,0, 0,0, 0,0],
      snare: [0,.6, .8,.6, .8,.6, .9,0],
      tomH:  [0,0, 0,0, .7,0, 0,0],
      tomL:  [0,0, 0,0, 0,0, 0,.9],
    },
  },
  {
    id: "folkpop", name: "Folk Pop", beats: 4, spb: 2, bpm: 128,
    A: {
      kick:  [1,0, 0,.5, .9,0, 0,.5],
      snare: [0,0, .9,0, 0,0, .9,0],
      shaker:[.4,0, .4,0, .4,0, .4,0],
    },
    B: {
      kick:  [1,0, .6,0, .9,0, .6,0],
      snare: [0,0, .9,.4, 0,0, .9,.4],
      ride:  [.7,.3, .7,.3, .7,.3, .7,.3],
    },
    fill: {
      kick:  [1,0, .6,0, 0,0, 0,0],
      snare: [0,0, .8,.6, .8,.6, .9,.6],
      tomL:  [0,0, 0,0, 0,0, 0,.9],
    },
  },
  {
    id: "ballad", name: "Ballad", beats: 4, spb: 2, bpm: 76,
    A: {
      kick:  [1,0, 0,0, .8,0, 0,0],
      stick: [0,0, .7,0, 0,0, .7,0],
      hatC:  [.5,0, .5,0, .5,0, .5,0],
    },
    B: {
      kick:  [1,0, 0,0, .8,0, 0,.3],
      stick: [0,0, .7,0, 0,0, .7,0],
      ride:  [.6,0, .6,0, .6,0, .6,0],
    },
    fill: {
      kick:  [1,0, 0,0, 0,0, 0,0],
      stick: [0,0, .6,.4, .6,.4, 0,0],
      tomL:  [0,0, 0,0, 0,0, 0,.7],
    },
  },
];

const ED_INSTRUMENTS = [
  ["kick", "Kick"], ["snare", "Snare"], ["stick", "Sidestick"],
  ["hatC", "Hihat dicht"], ["hatO", "Hihat open"],
  ["tomH", "Tom hoog"], ["tomL", "Tom laag"],
  ["ride", "Ride"], ["crash", "Crash"], ["shaker", "Shaker"],
];
const VELOCITY_STEPS = [0, 0.5, 1]; // uit → zacht → hard

/* ============================================================
   OPSLAG
   ============================================================ */
function lsGet(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }
  catch (_) { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
}

let customStyles = lsGet("folkbeat.customStyles", []);
let setlist = lsGet("folkbeat.setlist", []);

function allStyles() { return [...BUILTIN_STYLES, ...customStyles]; }
function styleById(id) { return allStyles().find(s => s.id === id); }
function sigOf(s) { return s.spb === 3 ? `${s.beats * 3}/8` : `${s.beats}/4`; }

/* ============================================================
   AUDIO — samples met synth-fallback
   ============================================================ */
let ctx = null;
let master = null;

const GAINS = { kick: 1.1, snare: 0.9, stick: 0.9, hatC: 0.6, hatO: 0.55, tomH: 0.95, tomL: 1.0, crash: 0.7, ride: 0.5, shaker: 0.55 };

const KITS = [
  {
    id: "acoustic", name: "Akoestisch",
    map: {
      kick: ["kick1", "kick2"], snare: ["snare1", "snare2"], stick: ["stick1", "stick2"],
      hatC: ["hatc1", "hatc2"], hatO: ["hato1", "hato2"],
      tomH: ["tomh1", "tomh2"], tomL: ["toml1", "toml2"],
      crash: ["crash1", "crash2"], ride: ["ride1", "ride2"],
      shaker: ["shku1", "shku2"],
    },
  },
  {
    id: "dry", name: "Droog & folky", fallback: "acoustic",
    map: {
      kick: ["kick1", "kick2"], snare: ["snoff1", "snoff2"], stick: ["rim1", "rim2"],
      hatC: ["fhh1", "fhh2"], hatO: ["hchh1", "hchh2"],
      tomH: ["tomm1", "tomm2"], tomL: ["toml1", "toml2"],
      crash: ["credge1", "credge2"], ride: ["redge1", "redge2"],
    },
  },
  {
    id: "rdstudio", name: "Studio naturel",
    map: {
      kick: ["rd-kick1.m4a", "rd-kick2.m4a"], snare: ["rd-snare1.m4a", "rd-snare2.m4a"],
      stick: ["rd-stick1.m4a", "rd-stick2.m4a"],
      hatC: ["rd-hatc1.m4a", "rd-hatc2.m4a"], hatO: ["rd-hato1.m4a", "rd-hato2.m4a"],
      tomH: ["rd-tomh1.m4a", "rd-tomh2.m4a"], tomL: ["rd-toml1.m4a", "rd-toml2.m4a"],
      crash: ["rd-crash1.m4a", "rd-crash2.m4a"], ride: ["rd-ride1.m4a", "rd-ride2.m4a"],
      shaker: ["rd-shk1.m4a", "rd-shk2.m4a"],
    },
  },
  {
    id: "punch", name: "Punch",
    map: {
      kick: ["pr-kick1.m4a", "pr-kick2.m4a"], snare: ["pr-snare1.m4a", "pr-snare2.m4a"],
      stick: ["pr-stick1.m4a", "pr-stick2.m4a"],
      hatC: ["pr-hatc1.m4a", "pr-hatc2.m4a"], hatO: ["pr-hato1.m4a", "pr-hato2.m4a"],
      tomH: ["pr-tomh1.m4a", "pr-tomh2.m4a"], tomL: ["pr-toml1.m4a", "pr-toml2.m4a"],
      crash: ["pr-crash1.m4a", "pr-crash2.m4a"], ride: ["pr-ride1.m4a", "pr-ride2.m4a"],
      shaker: ["pr-shk1.m4a", "pr-shk2.m4a"],
    },
  },
  {
    id: "raw", name: "Rauw & ruimtelijk", fallback: "acoustic",
    map: {
      kick: ["rw-kick1.m4a", "rw-kick2.m4a"], snare: ["rw-snare1.m4a", "rw-snare2.m4a"],
      stick: ["rw-stick1.m4a", "rw-stick2.m4a"],
      hatO: ["rw-hato1.m4a", "rw-hato2.m4a"],
      crash: ["rw-crash1.m4a", "rw-crash2.m4a"], ride: ["rw-ride1.m4a", "rw-ride2.m4a"],
    },
  },
  {
    id: "stompklap", name: "Stomp & klap",
    map: {
      kick: ["sc-kick1.m4a", "sc-kick2.m4a"], snare: ["sc-clap1.m4a", "sc-clap2.m4a"],
      stick: ["sc-stick1.m4a", "sc-stick2.m4a"],
      hatC: ["sc-hatc1.m4a", "sc-hatc2.m4a"], hatO: ["sc-hato1.m4a", "sc-hato2.m4a"],
      tomH: ["sc-tomh1.m4a", "sc-tomh2.m4a"], tomL: ["sc-toml1.m4a", "sc-toml2.m4a"],
      crash: ["sc-crash1.m4a", "sc-crash2.m4a"], ride: ["sc-ride1.m4a", "sc-ride2.m4a"],
      shaker: ["sc-shk1.m4a", "sc-shk2.m4a"],
    },
  },
  {
    id: "perc", name: "Bodhrán & percussie",
    map: {
      kick: ["fdk1", "fdk2"],    // frame drum groot = bodhrán-bas
      snare: ["fds1", "fds2"],   // frame drum klein
      stick: ["wood1", "wood2"], // woodblock
      hatC: ["shkd1", "shkd2"],  // shaker
      hatO: ["tamb1", "tamb2"],  // tamboerijn-schud
      tomH: ["darb1", "darb2"],  // darbuka
      tomL: ["caj1", "caj2"],    // cajon
      crash: ["tambr1", "tambr2"], // tamboerijn-roffel
      ride: ["clv1", "clv2"],    // claves
      shaker: ["shku1", "shku2"],
    },
  },
];
let kitId = "acoustic";
function currentKit() { return KITS.find(k => k.id === kitId) || KITS[0]; }
function kitFiles(inst) {
  const k = currentKit();
  if (k.map[inst]) return k.map[inst];
  if (k.fallback) {
    const f = KITS.find(x => x.id === k.fallback);
    if (f?.map[inst]) return f.map[inst];
  }
  return null;
}
const buffers = {};
let samplesLoaded = false;
const rrCounters = {};
let openHats = []; // actieve open-hihat-hits, voor de choke

function initAudio() {
  if (ctx) return;
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain();
  master.gain.value = (state.volume ?? 90) / 100;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -12;
  master.connect(comp).connect(ctx.destination);
}

async function loadSamples() {
  initAudio();
  const names = [...new Set(KITS.flatMap(k => Object.values(k.map)).flat())];
  let failed = 0;
  await Promise.all(names.map(async (n) => {
    try {
      const r = await fetch("samples/" + (n.includes(".") ? n : n + ".mp3"));
      if (!r.ok) throw new Error(r.status);
      buffers[n] = await ctx.decodeAudioData(await r.arrayBuffer());
    } catch (_) { failed++; }
  }));
  samplesLoaded = failed === 0;
  if (state.phase === "stopped") {
    setStatus(samplesLoaded ? "Klaar — druk op start" : "Klaar (synth-geluid, samples niet geladen)");
  }
}

function chokeOpenHats(t) {
  for (const h of openHats) {
    h.g.gain.setTargetAtTime(0, t, 0.01);
    try { h.src.stop(t + 0.08); } catch (_) {}
  }
  openHats = [];
}

function playInstrument(inst, t, v) {
  // humanisering: minieme variatie in timing (±3 ms) en aanslag (±8%)
  t += Math.random() * 0.006 - 0.003;
  v = Math.min(1, v * (0.92 + Math.random() * 0.16));
  const files = kitFiles(inst);
  if (files) {
    const bufs = files.map(f => buffers[f]).filter(Boolean);
    if (bufs.length) {
      rrCounters[inst] = ((rrCounters[inst] || 0) + 1) % bufs.length;
      const src = ctx.createBufferSource();
      src.buffer = bufs[rrCounters[inst]];
      src.playbackRate.value = 1 + (Math.random() * 0.03 - 0.015); // subtiele variatie
      const g = ctx.createGain();
      g.gain.value = Math.pow(v, 1.5) * (GAINS[inst] ?? 0.8);
      src.connect(g).connect(master);
      if (inst === "hatC") chokeOpenHats(t);
      src.start(t);
      if (inst === "hatO") {
        openHats.push({ src, g });
        if (openHats.length > 4) openHats.shift();
      }
      return;
    }
  }
  SYNTH[inst]?.(t, v);
}

/* --- synth-fallback (ook gebruikt voor shaker en count-in-click) --- */
let _noise = null;
function noiseBuffer() {
  const len = ctx.sampleRate * 1.5;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}
function synthNoise(t, { hp = 0, bp = 0, dur = 0.1, vel = 1 }) {
  if (!_noise) _noise = noiseBuffer();
  const src = ctx.createBufferSource();
  src.buffer = _noise;
  let node = src;
  if (hp) { const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp; node.connect(f); node = f; }
  if (bp) { const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = bp; f.Q.value = 1.2; node.connect(f); node = f; }
  const g = ctx.createGain();
  g.gain.setValueAtTime(vel, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  node.connect(g).connect(master);
  src.start(t); src.stop(t + dur + 0.05);
}
function synthTone(t, { f0, f1, type = "sine", dur = 0.2, vel = 1 }) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.7);
  const g = ctx.createGain();
  g.gain.setValueAtTime(vel, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}
const SYNTH = {
  kick:  (t, v) => synthTone(t, { f0: 150, f1: 48, dur: 0.28, vel: v * 1.1 }),
  snare: (t, v) => { synthNoise(t, { hp: 1200, dur: 0.16, vel: v * 0.8 }); synthTone(t, { f0: 190, f1: 150, type: "triangle", dur: 0.1, vel: v * 0.6 }); },
  stick: (t, v) => { synthTone(t, { f0: 850, f1: 500, type: "triangle", dur: 0.05, vel: v * 0.7 }); synthNoise(t, { hp: 2500, dur: 0.03, vel: v * 0.4 }); },
  hatC:  (t, v) => synthNoise(t, { hp: 7500, dur: 0.045, vel: v * 0.5 }),
  hatO:  (t, v) => synthNoise(t, { hp: 6500, dur: 0.25, vel: v * 0.45 }),
  tomH:  (t, v) => synthTone(t, { f0: 230, f1: 130, dur: 0.22, vel: v * 0.9 }),
  tomL:  (t, v) => synthTone(t, { f0: 150, f1: 85, dur: 0.28, vel: v * 0.95 }),
  crash: (t, v) => synthNoise(t, { hp: 4500, dur: 1.4, vel: v * 0.6 }),
  ride:  (t, v) => synthNoise(t, { hp: 5500, dur: 0.35, vel: v * 0.35 }),
  shaker:(t, v) => synthNoise(t, { bp: 5500, dur: 0.06, vel: v * 0.5 }),
  click: (t, v) => synthTone(t, { f0: v > 0.9 ? 2000 : 1500, type: "square", dur: 0.035, vel: 0.5 }),
};

/* ============================================================
   SEQUENCER — lookahead-scheduler voor strakke timing
   ============================================================ */
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;

const state = {
  styleId: "reel",
  bpm: 110,
  swing: 0,             // 0–100% swing over de offbeats
  humanize: 0,          // 0–100% losse timing en aanslagvariatie
  volume: 90,           // mastervolume 0–100
  running: false,
  phase: "stopped",   // stopped | playing
  preview: false,     // editor-preview actief
  part: "A",
  fillQueued: false,
  partQueued: false,
  crashAfterFill: false,
  crashThisBar: false,
  barIsFill: false,
  currentGrid: {},
  step: 0,
  nextNoteTime: 0,
  timer: null,
  visQueue: [],
};

function style() {
  if (state.preview && ed) return ed;
  return styleById(state.styleId) || BUILTIN_STYLES[0];
}
function stepsPerBar() { const s = style(); return s.beats * s.spb; }
function stepDur() { return 60 / state.bpm / style().spb; }

// swing: offbeat-achtsten (of -zestienden) iets later; bij triolen (spb 3) niet van toepassing
function swingDelay(step) {
  const s = style();
  if (s.spb === 3 || step % 2 === 0) return 0;
  return (state.swing / 100) * stepDur() / 3; // 100% ≈ triolengevoel
}

// een fill klinkt niet elke keer hetzelfde: iets drukker, iets kaler, of net iets losser getimed
function humanizeGrid(grid) {
  const out = {};
  for (const inst in grid) {
    out[inst] = grid[inst].map(v => v ? Math.min(1, Math.max(0.15, v + (Math.random() * 0.16 - 0.08))) : v);
  }
  return out;
}
function busierFill(grid, len) {
  const out = {};
  for (const inst in grid) out[inst] = grid[inst].slice();
  const filler = "hatC" in out ? "hatC" : ("shaker" in out ? "shaker" : null);
  if (filler) {
    for (let i = 0; i < len; i++) {
      if (!out[filler][i] && Math.random() < 0.35) out[filler][i] = 0.35;
    }
  }
  return out;
}
function sparserFill(grid) {
  const out = {};
  for (const inst in grid) out[inst] = grid[inst].map(v => (v && v < 0.6) ? 0 : v);
  return out;
}
function pickFill(s) {
  const base = s.fill || {};
  const shapes = [base, busierFill(base, s.beats * s.spb), sparserFill(base)];
  return humanizeGrid(shapes[Math.floor(Math.random() * shapes.length)]);
}

function scheduleStep() {
  const s = style();
  const t = state.nextNoteTime + swingDelay(state.step);

  if (state.step === 0) resolveBar(t);

  if (state.phase === "playing") {
    const grid = state.currentGrid;
    const h = state.humanize / 100;
    for (const inst in grid) {
      const v = grid[inst][state.step];
      if (!v) continue;
      // humanize: elke hit onafhankelijk max ±12 ms verschoven en tot ±25% zachter/harder
      const jt = h ? (Math.random() - 0.5) * 2 * h * 0.012 : 0;
      const jv = h ? Math.min(1, Math.max(0.1, v * (1 + (Math.random() - 0.5) * 0.5 * h))) : v;
      playInstrument(inst, Math.max(t + jt, ctx.currentTime), jv);
    }
    if (state.crashThisBar && state.step === 0) playInstrument("crash", t, 1);
    state.visQueue.push({ time: t, beat: Math.floor(state.step / s.spb), step: state.step, onBeat: state.step % s.spb === 0, fill: state.barIsFill });
  }

  state.nextNoteTime += stepDur();
  state.step++;
  if (state.step >= stepsPerBar()) state.step = 0;
}

// Aan het begin van elke maat: beslissen wat deze maat wordt
function resolveBar(t) {
  const s = style();
  state.crashThisBar = false;
  state.barIsFill = false;

  if (state.preview) {
    state.currentGrid = ed[edPart] || {};
    return;
  }

  if (state.phase !== "playing") return;

  if (state.partQueued) {
    // de fill is al meteen bij het klikken gestart (evt. midden in de vorige maat);
    // deze maatgrens rondt de wissel af naar het andere part.
    state.part = state.part === "A" ? "B" : "A";
    state.partQueued = false;
    state.currentGrid = s[state.part] || {};
    state.barIsFill = false;
    state.crashThisBar = true;
    state.crashAfterFill = false;
    updatePartBtn();
    updateFillLed();
    setStatus(`Speelt — deel ${state.part}`);
  } else if (state.fillQueued) {
    state.currentGrid = pickFill(s);
    state.barIsFill = true;
    state.fillQueued = false;
    state.crashAfterFill = true;
    updateFillLed();
    setStatus(`<span class="fill-flash">FILL</span>`);
  } else {
    state.currentGrid = s[state.part] || {};
    if (state.crashAfterFill) {
      state.crashThisBar = true;
      state.crashAfterFill = false;
    }
    updateFillLed();
    setStatus(`Speelt — deel ${state.part}`);
  }
}

function schedulerLoop() {
  while (state.nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD) scheduleStep();
  drawBeats();
}

function start(opts = {}) {
  initAudio();
  if (ctx.state === "suspended") ctx.resume();
  state.running = true;
  state.preview = !!opts.preview;
  // altijd direct starten: geen count-in, geen fill-intro
  state.crashAfterFill = !state.preview;
  state.phase = "playing";
  state.step = 0;
  state.part = "A";
  state.fillQueued = state.partQueued = false;
  state.visQueue = [];
  state.nextNoteTime = ctx.currentTime + 0.06;
  state.timer = setInterval(schedulerLoop, LOOKAHEAD_MS);
  stopIdleBlink();
  requestWakeLock();
  updateMainBtn(); updatePartBtn();
  buildBeatDots();
  if (!state.preview) setStatus("Start!");
}

function stopNow() {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  state.running = false;
  state.phase = "stopped";
  state.preview = false;
  state.visQueue = [];
  clearBeats();
  clearPlayhead();
  updateMainBtn();
  updatePreviewBtn();
  updateFillLed();
  updatePartBtn();
  setStatus("Klaar — druk op start");
  releaseWakeLock();
  startIdleBlink();
}

/* ============================================================
   ALGEMENE UI
   ============================================================ */
const $ = (id) => document.getElementById(id);
const stylesEl = $("styles"), beatRow = $("beatRow"), statusLine = $("statusLine");
const fillBtn = $("fillBtn"), sigDisplay = $("sigDisplay");

function setStatus(html) { statusLine.innerHTML = html; }

/* --- tabbladen (mode-knoppen met LED) --- */
const VIEWS = ["player", "setlist", "editor"];
function showView(name) {
  for (const v of VIEWS) $("view-" + v).hidden = v !== name;
  document.querySelectorAll("[data-viewled]").forEach(l => l.classList.toggle("on", l.dataset.viewled === name));
  if (name !== "editor" && state.preview) stopNow();
}
document.querySelectorAll("#tabs [data-view]").forEach(b => b.onclick = () => showView(b.dataset.view));

/* --- 7-segment BPM-display --- */
const SEGMAP = { "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc", "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcfgd" };
function renderBpm(n) {
  const el = $("bpmSeg");
  el.innerHTML = "";
  for (const ch of String(n).padStart(3, " ")) {
    const d = document.createElement("span");
    d.className = "digit";
    for (const seg of "abcdefg") {
      const i = document.createElement("i");
      i.className = seg + ((SEGMAP[ch] || "").includes(seg) ? " on" : "");
      d.appendChild(i);
    }
    el.appendChild(d);
  }
}

/* --- draaiknop-/dial-bediening: verticaal slepen --- */
function knobDrag(el, get, set, min, max, perPixel) {
  let startY = null, startVal = 0;
  el.addEventListener("pointerdown", (e) => {
    startY = e.clientY; startVal = get();
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  el.addEventListener("pointermove", (e) => {
    if (startY === null) return;
    set(Math.min(max, Math.max(min, startVal + (startY - e.clientY) * perPixel)));
  });
  const end = () => { startY = null; };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
}

/* --- stijlen in de speler --- */
function buildStyles() {
  stylesEl.innerHTML = "";
  for (const s of allStyles()) {
    const b = document.createElement("button");
    b.className = "style-btn";
    b.innerHTML = `<span class="led${s.id === state.styleId ? " on" : ""}"></span>` +
      `<span class="pushbtn">${s.custom ? '<span class="custom-mark">★</span> ' : ""}${s.name.toUpperCase()}</span>` +
      `<small>${sigOf(s)}</small>`;
    b.onclick = () => selectStyleById(s.id, true);
    stylesEl.appendChild(b);
  }
}
function selectStyleById(id, setTempo = false) {
  const s = styleById(id);
  if (!s) return;
  state.styleId = id;
  if (setTempo) setBpm(s.bpm);
  sigDisplay.textContent = sigOf(s);
  buildStyles();
  buildBeatDots();
  if (state.step >= stepsPerBar()) state.step = 0;
  persistLast();
  renderSongBar();
}

function persistLast() {
  lsSet("folkbeat.last", { styleId: state.styleId, bpm: state.bpm, swing: state.swing, humanize: state.humanize });
}

function setBpm(v) {
  state.bpm = Math.min(220, Math.max(40, Math.round(v)));
  renderBpm(state.bpm);
  $("dial").style.setProperty("--rot", ((state.bpm - 40) / 180 * 270 - 135) + "deg");
  persistLast();
  renderSongBar();
  if (!state.running) startIdleBlink();
}

function setVolume(v) {
  state.volume = Math.min(100, Math.max(0, Math.round(v)));
  if (master) master.gain.value = state.volume / 100;
  $("volVal").textContent = state.volume + "%";
  $("volKnob").style.setProperty("--rot", (state.volume / 100 * 270 - 135) + "deg");
  lsSet("folkbeat.volume", state.volume);
}

/* --- swing & humanize --- */
function syncPerfControls() {
  $("swingVal").textContent = state.swing + "%";
  $("swingKnob").style.setProperty("--rot", (state.swing / 100 * 270 - 135) + "deg");
  $("humVal").textContent = state.humanize + "%";
  $("humKnob").style.setProperty("--rot", (state.humanize / 100 * 270 - 135) + "deg");
}
function setSwing(v) {
  state.swing = Math.min(100, Math.max(0, Math.round(v)));
  syncPerfControls();
  persistLast();
  renderSongBar();
}
function setHumanize(v) {
  state.humanize = Math.min(100, Math.max(0, Math.round(v)));
  syncPerfControls();
  persistLast();
}

/* --- beat-indicator: rij step-keys met LED's --- */
function buildBeatDots() {
  beatRow.innerHTML = "";
  const s = style();
  const n = stepsPerBar();
  for (let i = 0; i < n; i++) {
    const k = document.createElement("div");
    k.className = "stepkey" + (i % s.spb === 0 ? " accent" : "");
    k.innerHTML = `<span class="led"></span><div class="pad"></div><span class="lbl">${i % s.spb === 0 ? (i / s.spb + 1) : ""}</span>`;
    beatRow.appendChild(k);
  }
  $("beatTitle").textContent = "BEAT — " + s.name.toUpperCase() + " " + sigOf(s);
}
function drawBeats() {
  const now = ctx.currentTime;
  while (state.visQueue.length && state.visQueue[0].time <= now) {
    const ev = state.visQueue.shift();
    const leds = beatRow.querySelectorAll(".stepkey .led");
    leds.forEach((l, i) => { l.className = "led" + (i === ev.step ? " on" : ""); });
    $("tapLed").className = "led" + (ev.onBeat !== false ? " on" : "");
    if (state.preview) drawPlayhead(ev.step);
  }
}
function clearBeats() {
  beatRow.querySelectorAll(".stepkey .led").forEach(l => { l.className = "led"; });
  $("tapLed").className = "led";
}

/* --- tempo-LED bij stilstand: knippert altijd op het huidige tempo --- */
let idleBlinkTimer = null;
function startIdleBlink() {
  stopIdleBlink();
  const tap = $("tapLed");
  const tick = () => {
    tap.classList.add("on");
    setTimeout(() => tap.classList.remove("on"), 90);
  };
  tick();
  idleBlinkTimer = setInterval(tick, 60000 / state.bpm);
}
function stopIdleBlink() {
  if (idleBlinkTimer) clearInterval(idleBlinkTimer);
  idleBlinkTimer = null;
}

/* --- transport-LED's --- */
function updateMainBtn() {
  const running = state.phase === "playing";
  $("playLed").className = "led" + (running ? " on" : "");
  $("playIcon").textContent = running ? "■" : "▶";
  $("playLabel").textContent = running ? "STOP" : "START";
}
function updatePartBtn() {
  const a = $("partALed"), b = $("partBLed");
  a.className = "led"; b.className = "led";
  (state.part === "A" ? a : b).classList.add("on");
  if (state.partQueued) (state.part === "A" ? b : a).classList.add("blink");
}
function updateFillLed() {
  $("fillLed").className = "led" + (state.fillQueued ? " blink" : state.barIsFill && state.running ? " on" : "");
}

/* --- transport-acties --- */
let lastMainAction = 0;
function mainAction() {
  // debounce: een dubbele (pedaal)tik binnen 300 ms is vrijwel zeker onbedoeld
  const now = performance.now();
  if (now - lastMainAction < 300) return;
  lastMainAction = now;
  if (state.preview) { stopNow(); return; }
  if (!state.running) start();
  else stopNow();
}
function fillAction() {
  if (state.phase !== "playing" || state.preview) return;
  state.fillQueued = true;
  updateFillLed();
}
function partAction() {
  if (state.preview) return;
  if (state.phase !== "playing") {
    if (!state.running) { state.part = state.part === "A" ? "B" : "A"; updatePartBtn(); }
    return;
  }
  if (state.partQueued) return; // wissel is al onderweg
  state.partQueued = true;
  state.fillQueued = false;
  // meteen (desnoods midden in de maat) een random fill in, niet pas volgende ronde
  state.currentGrid = pickFill(style());
  state.barIsFill = true;
  updatePartBtn();
  updateFillLed();
  setStatus(`<span class="fill-flash">FILL</span>`);
}
// part-knoppen A/B: tik op de niet-actieve om te wisselen (of een wachtende wissel te annuleren)
function requestPart(p) {
  if (state.preview) return;
  if (state.partQueued && state.part === p) {
    // wissel annuleren: meteen terug naar de maat die al speelde
    state.partQueued = false;
    state.currentGrid = style()[state.part] || {};
    state.barIsFill = false;
    updatePartBtn();
    updateFillLed();
    setStatus(`Speelt — deel ${state.part}`);
    return;
  }
  if (state.part === p) return;
  partAction();
}

$("startBtn").onclick = mainAction;
fillBtn.onclick = fillAction;
$("partABtn").onclick = () => requestPart("A");
$("partBBtn").onclick = () => requestPart("B");
$("bpmUp").onclick = () => setBpm(state.bpm + 2);
$("bpmDown").onclick = () => setBpm(state.bpm - 2);
knobDrag($("dial"), () => state.bpm, setBpm, 40, 220, 0.5);
knobDrag($("swingKnob"), () => state.swing, setSwing, 0, 100, 0.5);
knobDrag($("humKnob"), () => state.humanize, setHumanize, 0, 100, 0.5);
knobDrag($("volKnob"), () => state.volume, setVolume, 0, 100, 0.6);

/* --- drumkit-keuze --- */
function buildKitSelect() {
  const sel = $("kitSelect");
  sel.innerHTML = "";
  for (const k of KITS) {
    const o = document.createElement("option");
    o.value = k.id; o.textContent = k.name;
    sel.appendChild(o);
  }
  sel.value = kitId;
  sel.onchange = () => {
    kitId = sel.value;
    lsSet("folkbeat.kit", kitId);
  };
}

/* --- tap tempo --- */
let taps = [];
$("tapBtn").onclick = () => {
  const now = performance.now();
  taps = taps.filter(t => now - t < 2500);
  taps.push(now);
  if (taps.length >= 2) {
    const iv = [];
    for (let i = 1; i < taps.length; i++) iv.push(taps[i] - taps[i - 1]);
    setBpm(60000 / (iv.reduce((a, b) => a + b) / iv.length));
  }
};

/* ============================================================
   SETLIST
   ============================================================ */
let songIdx = -1;
let editIdx = -1; // regel die in de setlist bewerkt wordt

function saveSetlist() { lsSet("folkbeat.setlist", setlist); }

function renderSetlist() {
  const wrap = $("setlistRows");
  wrap.innerHTML = "";
  setlist.forEach((song, i) => {
    const row = document.createElement("div");
    row.className = "song-row" + (i === songIdx ? " current" : "") + (i === editIdx ? " editing" : "");
    if (i === editIdx) {
      buildSongEditRow(row, song, i);
    } else {
      buildSongRow(row, song, i);
    }
    wrap.appendChild(row);
  });
  renderSongBar();
}

function buildSongRow(row, song, i) {
  const st = styleById(song.styleId);
  row.innerHTML = `<span class="num">${i + 1}</span>
    <span class="info"><b>${escapeHtml(song.name)}</b>
    <small>${st ? st.name + " " + sigOf(st) : "⚠ groove verwijderd"} · ${song.bpm} BPM</small></span>`;
  row.onclick = () => loadSong(i);
  const mk = (txt, fn, cls = "") => {
    const b = document.createElement("button");
    b.textContent = txt; b.className = cls;
    b.onclick = (e) => { e.stopPropagation(); fn(); };
    row.appendChild(b);
  };
  mk("✎", () => { editIdx = i; renderSetlist(); });
  mk("▲", () => moveSong(i, -1));
  mk("▼", () => moveSong(i, +1));
  mk("✕", () => { setlist.splice(i, 1); if (editIdx === i) editIdx = -1; if (songIdx >= setlist.length) songIdx = setlist.length - 1; saveSetlist(); renderSetlist(); });
}

function buildSongEditRow(row, song, i) {
  const name = document.createElement("input");
  name.value = song.name; name.maxLength = 40; name.className = "e-name";

  const sel = document.createElement("select");
  for (const s of allStyles()) {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = (s.custom ? "★ " : "") + s.name + " " + sigOf(s);
    sel.appendChild(o);
  }
  if (styleById(song.styleId)) sel.value = song.styleId;

  const bpm = document.createElement("input");
  bpm.type = "number"; bpm.min = 40; bpm.max = 220; bpm.value = song.bpm; bpm.className = "e-bpm";

  // nieuwe groove gekozen → standaardtempo van die groove voorstellen
  sel.onchange = () => { const st = styleById(sel.value); if (st) bpm.value = st.bpm; };

  const swing = document.createElement("input");
  swing.type = "number"; swing.min = 0; swing.max = 100; swing.step = 5;
  swing.value = song.swing ?? 0; swing.className = "e-swing"; swing.title = "Swing %";

  const ok = document.createElement("button");
  ok.textContent = "✓"; ok.className = "ok";
  ok.onclick = () => {
    song.name = name.value.trim() || song.name;
    song.styleId = sel.value;
    song.bpm = Math.min(220, Math.max(40, +bpm.value || song.bpm));
    song.swing = Math.min(100, Math.max(0, +swing.value || 0));
    editIdx = -1;
    saveSetlist();
    if (i === songIdx) { // dit nummer staat in de speler: meteen doorvoeren
      const st = styleById(song.styleId);
      if (st) selectStyleById(st.id);
      setBpm(song.bpm);
      setSwing(song.swing);
    }
    renderSetlist();
  };
  const cancel = document.createElement("button");
  cancel.textContent = "✕";
  cancel.onclick = () => { editIdx = -1; renderSetlist(); };

  row.append(name, sel, bpm, swing, ok, cancel);
  row.onclick = (e) => e.stopPropagation();
}
function moveSong(i, d) {
  const j = i + d;
  if (j < 0 || j >= setlist.length) return;
  [setlist[i], setlist[j]] = [setlist[j], setlist[i]];
  if (songIdx === i) songIdx = j; else if (songIdx === j) songIdx = i;
  saveSetlist(); renderSetlist();
}
function loadSong(i) {
  if (i < 0 || i >= setlist.length) return;
  songIdx = i;
  const song = setlist[i];
  const st = styleById(song.styleId);
  if (st) selectStyleById(st.id);
  setBpm(song.bpm);
  setSwing(song.swing ?? 0);
  renderSetlist();
  showView("player");
}
function stepSong(d) {
  if (!setlist.length) return;
  loadSong(((songIdx < 0 ? 0 : songIdx + d) + setlist.length) % setlist.length);
}
function renderSongBar() {
  const bar = $("songBar");
  bar.hidden = setlist.length === 0;
  const song = songIdx >= 0 ? setlist[songIdx] : null;
  if (song) {
    const st = styleById(song.styleId);
    $("songName").textContent = `${songIdx + 1}. ${song.name}`;
    $("songMeta").textContent = (st ? st.name + " · " : "") + song.bpm + " BPM";
  } else {
    $("songName").textContent = "Setlist";
    $("songMeta").textContent = setlist.length + " nummers — tik ▶ voor het eerste";
  }
  // tempo, groove of swing in de speler afwijkend? Toon de bewaarknop
  const dirty = song && (song.bpm !== state.bpm || song.styleId !== state.styleId
    || (song.swing ?? 0) !== state.swing);
  $("saveSongBtn").hidden = !dirty;
}
$("saveSongBtn").onclick = () => {
  const song = setlist[songIdx];
  if (!song) return;
  song.bpm = state.bpm;
  song.styleId = state.styleId;
  song.swing = state.swing;
  saveSetlist();
  renderSetlist();
};
$("prevSongBtn").onclick = () => stepSong(-1);
$("nextSongBtn").onclick = () => stepSong(+1);

function buildSongStyleSelect() {
  const sel = $("songStyle");
  sel.innerHTML = "";
  for (const s of allStyles()) {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = (s.custom ? "★ " : "") + s.name + " " + sigOf(s);
    sel.appendChild(o);
  }
  $("songBpm").value = allStyles()[0]?.bpm ?? 110;
}
$("songStyle").onchange = () => {
  const st = styleById($("songStyle").value);
  if (st) $("songBpm").value = st.bpm;
};
$("addSongForm").onsubmit = (e) => {
  e.preventDefault();
  const name = $("songNameInput").value.trim();
  if (!name) return;
  setlist.push({
    name,
    styleId: $("songStyle").value,
    bpm: Math.min(220, Math.max(40, +$("songBpm").value || 110)),
  });
  $("songNameInput").value = "";
  saveSetlist(); renderSetlist();
};

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ============================================================
   GROOVE-EDITOR
   ============================================================ */
let ed = null;       // werkkopie van de groove die bewerkt wordt
let edPart = "A";

function materialize(st) {
  // zorg dat elk instrument een volledige array heeft
  const len = st.beats * st.spb;
  for (const part of ["A", "B", "fill"]) {
    const src = st[part] || {};
    const full = {};
    for (const [inst] of ED_INSTRUMENTS) {
      const arr = new Array(len).fill(0);
      // bestaande waarden terugbrengen naar de twee standjes van de editor
      (src[inst] || []).forEach((v, i) => { if (i < len) arr[i] = v ? (v >= 0.75 ? 1 : 0.5) : 0; });
      full[inst] = arr;
    }
    st[part] = full;
  }
  return st;
}
function edNew() {
  ed = materialize({ id: null, name: "", beats: 4, spb: 2, bpm: 110, custom: true, A: {}, B: {}, fill: {} });
  edPart = "A";
  syncEditorFields();
}
function edFromStyle(st) {
  ed = materialize(JSON.parse(JSON.stringify(st)));
  if (!st.custom) { ed.id = null; ed.name = st.name + " (eigen)"; }
  ed.custom = true;
  edPart = "A";
  syncEditorFields();
}
function syncEditorFields() {
  $("edName").value = ed.name;
  $("edBeats").value = ed.beats;
  $("edSpb").value = ed.spb;
  $("edBpm").value = ed.bpm;
  $("edDelete").hidden = !ed.id;
  document.querySelectorAll("#edParts button").forEach(b => b.classList.toggle("active", b.dataset.part === edPart));
  renderGrid();
}

function buildEdSource() {
  const sel = $("edSource");
  sel.innerHTML = "";
  const optNew = document.createElement("option");
  optNew.value = "new"; optNew.textContent = "— Nieuwe lege groove —";
  sel.appendChild(optNew);
  for (const s of allStyles()) {
    const o = document.createElement("option");
    o.value = s.id;
    o.textContent = s.custom ? `★ Bewerk: ${s.name}` : `Kopie van: ${s.name}`;
    sel.appendChild(o);
  }
}
$("edLoad").onclick = () => {
  if (state.preview) stopNow();
  const v = $("edSource").value;
  if (v === "new") edNew();
  else { const st = styleById(v); if (st) edFromStyle(st); }
};

function beatsOptions() {
  const sel = $("edBeats");
  sel.innerHTML = "";
  for (let b = 2; b <= 6; b++) {
    const o = document.createElement("option");
    o.value = b; o.textContent = b;
    sel.appendChild(o);
  }
}
function edResize() {
  ed.beats = +$("edBeats").value;
  ed.spb = +$("edSpb").value;
  materialize(ed);
  renderGrid();
}
$("edBeats").onchange = edResize;
$("edSpb").onchange = edResize;
$("edName").oninput = () => { ed.name = $("edName").value; };
$("edBpm").onchange = () => {
  ed.bpm = Math.min(220, Math.max(40, +$("edBpm").value || 110));
  $("edBpm").value = ed.bpm;
  if (state.preview) setBpm(ed.bpm);
};

document.querySelectorAll("#edParts button").forEach(b => {
  b.onclick = () => {
    edPart = b.dataset.part;
    document.querySelectorAll("#edParts button").forEach(x => x.classList.toggle("active", x === b));
    renderGrid();
  };
});

function renderGrid() {
  const grid = $("edGrid");
  const len = ed.beats * ed.spb;
  grid.style.gridTemplateColumns = `auto repeat(${len}, 30px)`;
  grid.innerHTML = "";
  for (const [inst, label] of ED_INSTRUMENTS) {
    const lab = document.createElement("div");
    lab.className = "ed-label"; lab.textContent = label;
    grid.appendChild(lab);
    for (let i = 0; i < len; i++) {
      const cell = document.createElement("div");
      cell.className = "ed-cell" + (i % ed.spb === 0 ? " beat-start" : "");
      cell.dataset.step = i;
      const v = ed[edPart][inst][i];
      if (v) cell.dataset.v = String(v);
      cell.onclick = () => {
        const cur = ed[edPart][inst][i] || 0;
        const idx = VELOCITY_STEPS.indexOf(cur);
        const next = VELOCITY_STEPS[(idx + 1) % VELOCITY_STEPS.length];
        ed[edPart][inst][i] = next;
        if (next) cell.dataset.v = String(next); else delete cell.dataset.v;
        // meteen even horen wat je aanzet
        if (next && !state.running) { initAudio(); ctx.resume(); playInstrument(inst, ctx.currentTime, next); }
      };
      grid.appendChild(cell);
    }
  }
}
function drawPlayhead(step) {
  clearPlayhead();
  document.querySelectorAll(`#edGrid .ed-cell[data-step="${step}"]`).forEach(c => c.classList.add("playhead"));
}
function clearPlayhead() {
  document.querySelectorAll("#edGrid .playhead").forEach(c => c.classList.remove("playhead"));
}

$("edPreview").onclick = () => {
  if (state.preview) { stopNow(); return; }
  if (state.running) stopNow();
  setBpm(ed.bpm);
  start({ preview: true });
  updatePreviewBtn();
};
function updatePreviewBtn() {
  const b = $("edPreview");
  b.textContent = state.preview ? "■ Stop" : "▶ Beluister";
  b.classList.toggle("on", state.preview);
}

$("edSave").onclick = () => {
  ed.name = ($("edName").value || "").trim() || "Mijn groove";
  $("edName").value = ed.name;
  const wasNew = !ed.id;
  if (!ed.id) ed.id = "c" + Date.now();
  // opslaan als compacte kopie: lege instrumentrijen weglaten
  const store = JSON.parse(JSON.stringify(ed));
  for (const part of ["A", "B", "fill"]) {
    for (const inst in store[part]) {
      if (!store[part][inst].some(v => v)) delete store[part][inst];
    }
  }
  const i = customStyles.findIndex(s => s.id === ed.id);
  if (i >= 0) customStyles[i] = store; else customStyles.push(store);
  lsSet("folkbeat.customStyles", customStyles);
  rebuildStyleLists();
  $("edSource").value = ed.id;
  $("edDelete").hidden = false;
  const msg = $("edMsg");
  msg.textContent = wasNew ? "Opgeslagen ✓ — staat nu tussen de grooves" : "Opgeslagen ✓";
  setTimeout(() => { msg.textContent = ""; }, 3000);
};

$("edDelete").onclick = () => {
  if (!ed.id) return;
  if (!confirm(`Groove “${ed.name}” verwijderen?`)) return;
  customStyles = customStyles.filter(s => s.id !== ed.id);
  lsSet("folkbeat.customStyles", customStyles);
  if (state.styleId === ed.id) selectStyleById(BUILTIN_STYLES[0].id, true);
  rebuildStyleLists();
  edNew();
};

function rebuildStyleLists() {
  buildStyles();
  buildSongStyleSelect();
  buildEdSource();
  renderSetlist();
}

/* ============================================================
   TOETSENBORD / BLUETOOTH-PEDAAL
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
  switch (e.code) {
    case "Space": case "Enter": case "PageDown": case "ArrowRight":
      e.preventDefault(); mainAction(); break;
    case "PageUp": case "ArrowLeft": case "KeyF":
      e.preventDefault(); fillAction(); break;
    case "KeyB": partAction(); break;
    case "KeyN": stepSong(+1); break;
    case "KeyP": stepSong(-1); break;
    case "ArrowUp": e.preventDefault(); setBpm(state.bpm + 2); break;
    case "ArrowDown": e.preventDefault(); setBpm(state.bpm - 2); break;
  }
});

/* ============================================================
   SCHERM AAN / PWA
   ============================================================ */
let wakeLock = null;
async function requestWakeLock() {
  try { wakeLock = await navigator.wakeLock?.request("screen"); } catch (_) {}
}
function releaseWakeLock() { wakeLock?.release(); wakeLock = null; }

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

/* ============================================================
   OPSTARTEN
   ============================================================ */
beatsOptions();
kitId = lsGet("folkbeat.kit", "acoustic");
if (!KITS.some(k => k.id === kitId)) kitId = "acoustic";
buildKitSelect();
const last = lsGet("folkbeat.last", null);
if (last && styleById(last.styleId)) {
  state.styleId = last.styleId;
  state.bpm = last.bpm || 110;
  state.swing = last.swing || 0;
  state.humanize = last.humanize || 0;
}
rebuildStyleLists();
selectStyleById(state.styleId);
setBpm(state.bpm);
setVolume(lsGet("folkbeat.volume", 90));
syncPerfControls();
updateMainBtn();
updatePartBtn();
edNew();
setStatus("Samples laden…");
loadSamples();
