"use strict";

/* ============================================================
   INGEBOUWDE GROOVES
   De seeds hieronder zijn één maat op 8ste-notenresolutie.
   Ze worden na de definitie omgezet naar twee maten met 16de noten.
   Instrumenten: kick, snare, stick (sidestick), hatC, hatO,
                 tomH, tomL, crash, ride, shaker
   ============================================================ */
const BUILTIN_STYLE_SEEDS = [
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

function expandMeasureToSixteenths(part, stepsPerMeasure) {
  const expanded = {};
  for (const [instrument, source] of Object.entries(part || {})) {
    const values = [];
    for (const velocity of source) values.push(velocity, 0);
    expanded[instrument] = values.slice(0, stepsPerMeasure);
    while (expanded[instrument].length < stepsPerMeasure) expanded[instrument].push(0);
  }
  return expanded;
}

function joinMeasures(first, second, stepsPerMeasure) {
  const joined = {};
  const instruments = new Set([...Object.keys(first), ...Object.keys(second)]);
  for (const instrument of instruments) {
    joined[instrument] = [
      ...(first[instrument] || new Array(stepsPerMeasure).fill(0)),
      ...(second[instrument] || new Array(stepsPerMeasure).fill(0))
    ];
  }
  return joined;
}

const BUILTIN_STYLES = BUILTIN_STYLE_SEEDS.map(seed => {
  const spb = seed.spb * 2;
  const stepsPerMeasure = seed.beats * spb;
  const measureA = expandMeasureToSixteenths(seed.A, stepsPerMeasure);
  const measureB = expandMeasureToSixteenths(seed.B, stepsPerMeasure);
  const measureFill = expandMeasureToSixteenths(seed.fill, stepsPerMeasure);
  return {
    ...seed,
    spb,
    bars: 2,
    A: joinMeasures(measureA, measureA, stepsPerMeasure),
    B: joinMeasures(measureB, measureB, stepsPerMeasure),
    fill: joinMeasures(measureA, measureFill, stepsPerMeasure)
  };
});

const ED_INSTRUMENTS = [
  ["kick", "Kick"], ["snare", "Snare"], ["stick", "Stick"],
  ["hatC", "Hat dicht"], ["hatO", "Hat open"],
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
let publicSongs = [];
let cloudUserId = null;

function newCloudId(prefix) {
  const value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${value}`;
}

function queueCloud(action, kind, payload) {
  let queue = lsGet("folkbeat.cloudQueue", []);
  queue = queue.filter(item => !(item.kind === kind && item.payload?.id === payload?.id));
  queue.push({ opId: newCloudId("op"), action, kind, payload, queuedAt: new Date().toISOString() });
  lsSet("folkbeat.cloudQueue", queue);
  window.dispatchEvent(new CustomEvent("folkbeat:cloud-queue"));
}

window.addEventListener("folkbeat:cloud-status", event => {
  const el = document.getElementById("cloudStatus");
  if (!el) return;
  el.textContent = event.detail.message || "Alleen lokaal";
  el.className = event.detail.state || "";
});

window.addEventListener("folkbeat:cloud-ready", event => {
  cloudUserId = event.detail.userId;
  const remoteGrooves = event.detail.grooves || [];
  const remoteIds = new Set(remoteGrooves.map(groove => groove.id));
  const localOnly = customStyles.filter(groove => !groove._cloud && !remoteIds.has(groove.id));
  customStyles = [...remoteGrooves, ...localOnly];
  lsSet("folkbeat.customStyles", customStyles);
  publicSongs = event.detail.songs || [];

  for (const groove of localOnly) {
    groove._cloud = true;
    groove._ownerId = cloudUserId;
    groove._readOnly = false;
    queueCloud("upsert", "groove", groove);
  }
  for (const song of setlist) {
    if (song._fromPublic || song._cloud) continue;
    if (!song.id) song.id = newCloudId("song");
    song._cloud = true;
    queueCloud("upsert", "song", song);
  }
  saveSetlist();
  lsSet("folkbeat.customStyles", customStyles);
  rebuildStyleLists();
  renderPublicSongs();
});

function allStyles() { return [...customStyles, ...BUILTIN_STYLES]; }
function styleById(id) { return allStyles().find(s => s.id === id); }
function patternLength(s) { return s.beats * s.spb * (s.bars || 1); }
function sigOf(s) {
  const meter = s.beats === 2 && (s.spb === 3 || s.spb === 6) ? "6/8" : `${s.beats}/4`;
  return (s.bars || 1) > 1 ? `${meter} · ${s.bars} maten` : meter;
}

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
let iosMediaUnlock = null;

function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function configureAudioSession() {
  try {
    if (navigator.audioSession) {
      navigator.audioSession.type = "playback";
      return true;
    }
  } catch (_) {}
  return false;
}

function silentWavUrl() {
  const sampleRate = 8000;
  const samples = Math.floor(sampleRate / 4);
  const bytes = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(bytes);
  const text = (offset, value) => [...value].forEach((char, i) => view.setUint8(offset + i, char.charCodeAt(0)));
  text(0, "RIFF"); view.setUint32(4, 36 + samples * 2, true); text(8, "WAVE");
  text(12, "fmt "); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true); view.setUint16(34, 16, true); text(36, "data"); view.setUint32(40, samples * 2, true);
  return URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }));
}

function unlockAudioOutput() {
  if (configureAudioSession() || !isIOSDevice()) return;
  // Oudere iOS-versies hebben nog geen Audio Session API. Een stil media-element
  // opent daar de media-uitvoerroute, zodat Web Audio niet aan de beltoonroute blijft hangen.
  if (!iosMediaUnlock) {
    iosMediaUnlock = new Audio(silentWavUrl());
    iosMediaUnlock.loop = true;
    iosMediaUnlock.playsInline = true;
    iosMediaUnlock.volume = 0.01;
  }
  iosMediaUnlock.play().catch(() => {});
}

addEventListener("pageshow", configureAudioSession);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  configureAudioSession();
  if (state?.running && ctx?.state === "suspended") ctx.resume().catch(() => {});
});

function initAudio() {
  if (ctx) return;
  configureAudioSession();
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
function stepsPerBar() { return patternLength(style()); }
function stepDur() { return 60 / state.bpm / style().spb; }

// swing: offbeat-achtsten (of -zestienden) iets later; bij triolen (spb 3) niet van toepassing
function swingDelay(step) {
  const s = style();
  if (s.spb % 3 === 0 || step % 2 === 0) return 0;
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
  const shapes = [base, busierFill(base, patternLength(s)), sparserFill(base)];
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
  } else if (state.fillQueued) {
    state.currentGrid = pickFill(s);
    state.barIsFill = true;
    state.fillQueued = false;
    state.crashAfterFill = true;
  } else {
    state.currentGrid = s[state.part] || {};
    if (state.crashAfterFill) {
      state.crashThisBar = true;
      state.crashAfterFill = false;
    }
  }
  updateTransportUI();
}

function schedulerLoop() {
  while (state.nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD) scheduleStep();
  drawBeats();
}

function start(opts = {}) {
  initAudio();
  unlockAudioOutput();
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
  buildBeatSegs();
  updateTransportUI();
  updatePreviewBtn();
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
  updateTransportUI();
  updatePreviewBtn();
  releaseWakeLock();
  startIdleBlink();
}

/* ============================================================
   ALGEMENE UI
   ============================================================ */
const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// knop-vasthouden = herhalen (tempo-steppers)
function holdRepeat(btn, fn) {
  let t = null, iv = null;
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    fn();
    t = setTimeout(() => { iv = setInterval(fn, 70); }, 450);
  });
  const end = () => { clearTimeout(t); clearInterval(iv); t = iv = null; };
  btn.addEventListener("pointerup", end);
  btn.addEventListener("pointercancel", end);
  btn.addEventListener("pointerleave", end);
}

/* --- tabbladen --- */
const VIEWS = ["player", "setlist", "editor"];
function showView(name) {
  for (const v of VIEWS) $("view-" + v).hidden = v !== name;
  document.querySelectorAll("#tabs [data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if (name !== "editor" && state.preview) stopNow();
  if (name !== "editor" && document.documentElement.classList.contains("editor-focus")) setEditorFocus(false);
  if (name === "editor" && ed) renderGrid();
}
document.querySelectorAll("#tabs [data-view]").forEach(b => b.onclick = () => showView(b.dataset.view));

/* --- expliciet licht/donker-thema --- */
const themeToggle = $("themeToggle");
function effectiveTheme() {
  const saved = document.documentElement.dataset.theme;
  return saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
}
function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  if (persist) lsSet("folkbeat.theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀ Licht" : "☾ Donker";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Schakel naar licht thema" : "Schakel naar donker thema");
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = theme === "dark" ? "#111318" : "#F7F7F5");
}
applyTheme(lsGet("folkbeat.theme", effectiveTheme()), false);
themeToggle.onclick = () => applyTheme(effectiveTheme() === "dark" ? "light" : "dark");

/* --- skins: alleen presentatie; dezelfde DOM en bediening blijven leidend --- */
const skinSelect = $("skinSelect");
function applySkin(skin, persist = true) {
  const known = ["modern", "electribe"];
  const selected = known.includes(skin) ? skin : "modern";
  document.documentElement.dataset.skin = selected;
  skinSelect.value = selected;
  if (persist) lsSet("folkbeat.skin", selected);
}
applySkin(lsGet("folkbeat.skin", "modern"), false);
skinSelect.onchange = () => applySkin(skinSelect.value);

/* --- toestandsband: het op-afstand-afleesbare element --- */
function updateBand() {
  const band = $("stateBand");
  band.classList.remove("playing", "fill", "preview");
  if (state.phase !== "playing") { band.textContent = "GESTOPT"; return; }
  if (state.preview) { band.classList.add("preview"); band.textContent = "MEELUISTEREN"; return; }
  if (state.partQueued) { band.classList.add("fill"); band.textContent = "→ DEEL " + (state.part === "A" ? "B" : "A"); return; }
  if (state.barIsFill || state.fillQueued) { band.classList.add("fill"); band.textContent = "FILL"; return; }
  band.classList.add("playing"); band.textContent = "DEEL " + state.part;
}

/* --- transportknoppen --- */
function updateTransportUI() {
  const playing = state.phase === "playing";
  const targetPart = state.part === "A" ? "B" : "A";
  $("startBtn").classList.toggle("playing", playing);
  $("playLabel").textContent = playing ? "STOP" : "START";
  $("startBtn").setAttribute("aria-label", playing ? "Stop" : "Start");
  $("partLetter").textContent = targetPart;
  $("partBtn").setAttribute("aria-label", `Wissel naar deel ${targetPart}`);
  $("partBtn").classList.toggle("queued", state.partQueued);
  $("fillBtn").classList.toggle("on", state.fillQueued || (state.barIsFill && state.running && !state.preview));
  updateBand();
}

/* --- BPM-weergave --- */
function setBpm(v) {
  state.bpm = Math.min(220, Math.max(40, Math.round(v)));
  $("bpmBig").textContent = state.bpm;
  $("bpmSmall").textContent = state.bpm;
  $("ipadBpm").textContent = state.bpm;
  persistLast();
  renderSongBar();
  if (!state.running) startIdleBlink();
}

function persistLast() {
  lsSet("folkbeat.last", { styleId: state.styleId, bpm: state.bpm, swing: state.swing, humanize: state.humanize });
}

function setVolume(v) {
  state.volume = Math.min(100, Math.max(0, Math.round(v)));
  if (master) master.gain.value = state.volume / 100;
  syncPerfControls();
  lsSet("folkbeat.volume", state.volume);
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
  renderSongBar();
}

/* --- regelaars: chips in de speler + sliders in de sheet --- */
function syncPerfControls() {
  $("swingChip").textContent = `Swing ${state.swing}%`;
  $("humChip").textContent = `Hum. ${state.humanize}%`;
  $("kitChip").textContent = `Kit ${currentKit().name}`;
  $("swingVal").textContent = state.swing + "%";
  $("humVal").textContent = state.humanize + "%";
  $("volVal").textContent = state.volume + "%";
  $("swingRange").value = state.swing;
  $("humRange").value = state.humanize;
  $("volRange").value = state.volume;
  $("ipadSwingVal").textContent = state.swing + "%";
  $("ipadHumVal").textContent = state.humanize + "%";
  $("ipadVolVal").textContent = state.volume + "%";
  $("ipadSwing").value = state.swing;
  $("ipadHum").value = state.humanize;
  $("ipadVol").value = state.volume;
  for (const [id, value] of [
    ["swingRange", state.swing], ["humRange", state.humanize], ["volRange", state.volume],
    ["ipadSwing", state.swing], ["ipadHum", state.humanize], ["ipadVol", state.volume]
  ]) $(id).style.setProperty("--range-pct", value + "%");
}
$("swingRange").oninput = (e) => setSwing(+e.target.value);
$("humRange").oninput = (e) => setHumanize(+e.target.value);
$("volRange").oninput = (e) => setVolume(+e.target.value);
$("ipadSwing").oninput = (e) => setSwing(+e.target.value);
$("ipadHum").oninput = (e) => setHumanize(+e.target.value);
$("ipadVol").oninput = (e) => setVolume(+e.target.value);

function buildKitChips() {
  for (const wrap of [$("kitChips"), $("ipadKitChips")]) {
    wrap.innerHTML = "";
    for (const k of KITS) {
      const b = document.createElement("button");
      b.className = "chip" + (k.id === kitId ? " active" : "");
      b.textContent = k.name;
      b.onclick = () => {
        kitId = k.id;
        lsSet("folkbeat.kit", kitId);
        buildKitChips();
        syncPerfControls();
      };
      wrap.appendChild(b);
    }
  }
}

/* --- sheets --- */
function openSheet(el) { $("sheetDim").hidden = false; el.hidden = false; }
function closeSheets() {
  $("sheetDim").hidden = true;
  $("ctrlSheet").hidden = true;
  $("songSheet").hidden = true;
}
$("sheetDim").onclick = closeSheets;
document.querySelectorAll("[data-close]").forEach(b => b.onclick = closeSheets);

$("swingChip").onclick = () => { syncPerfControls(); openSheet($("ctrlSheet")); };
$("humChip").onclick = $("swingChip").onclick;
$("kitChip").onclick = $("swingChip").onclick;

/* --- grooves in de speler --- */
function buildStyles() {
  const wrap = $("styles");
  wrap.innerHTML = "";
  for (const s of allStyles()) {
    const b = document.createElement("button");
    b.className = "chip" + (s.id === state.styleId ? " active" : "");
    b.title = sigOf(s);
    b.innerHTML = (s.custom ? '<span class="star">★</span> ' : "") + escapeHtml(s.name);
    b.onclick = () => selectStyleById(s.id, true);
    wrap.appendChild(b);
  }
}
function selectStyleById(id, setTempo = false) {
  const s = styleById(id);
  if (!s) return;
  state.styleId = id;
  if (setTempo) setBpm(s.bpm);
  buildStyles();
  buildBeatSegs();
  if (state.step >= stepsPerBar()) state.step = 0;
  persistLast();
  renderSongBar();
}

/* --- beat-indicator: segmentenrij, tel 1 breder --- */
function buildBeatSegs() {
  const row = $("beatRow");
  row.innerHTML = "";
  for (let i = 0; i < stepsPerBar(); i++) {
    const d = document.createElement("div");
    d.className = "seg";
    row.appendChild(d);
  }
}
function drawBeats() {
  const now = ctx.currentTime;
  while (state.visQueue.length && state.visQueue[0].time <= now) {
    const ev = state.visQueue.shift();
    const segs = $("beatRow").children;
    for (let i = 0; i < segs.length; i++) segs[i].classList.toggle("on", i === ev.step);
    if (ev.onBeat) pulseDot();
    if (state.preview) drawPlayhead(ev.step);
  }
}
function clearBeats() {
  for (const s of $("beatRow").children) s.classList.remove("on");
  resetDot();
}

/* --- beat-dot naast het tempo --- */
function pulseDot() {
  const d = $("beatDot");
  d.classList.add("pulse");
  d.style.animation = "none";
  void d.offsetWidth; // herstart de animatie
  d.style.animation = `fbBeat ${Math.min(60 / state.bpm, 0.6)}s ease-out 1 forwards`;
}
function resetDot() {
  const d = $("beatDot");
  d.classList.remove("pulse");
  d.style.animation = "";
}

/* --- bij stilstand knippert de dot op het ingestelde tempo --- */
let idleBlinkTimer = null;
function startIdleBlink() {
  stopIdleBlink();
  pulseDot();
  idleBlinkTimer = setInterval(pulseDot, 60000 / state.bpm);
}
function stopIdleBlink() {
  if (idleBlinkTimer) clearInterval(idleBlinkTimer);
  idleBlinkTimer = null;
  resetDot();
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
  updateTransportUI();
}
function partAction() {
  if (state.preview || state.phase !== "playing") return;
  if (state.partQueued) {
    // wissel annuleren: meteen terug naar de maat die al speelde
    state.partQueued = false;
    state.currentGrid = style()[state.part] || {};
    state.barIsFill = false;
    updateTransportUI();
    return;
  }
  state.partQueued = true;
  state.fillQueued = false;
  // meteen (desnoods midden in de maat) een random fill in, niet pas volgende ronde
  state.currentGrid = pickFill(style());
  state.barIsFill = true;
  updateTransportUI();
}

$("startBtn").onclick = mainAction;
$("fillBtn").onclick = fillAction;
$("partBtn").onclick = partAction;
holdRepeat($("bpmUp"), () => setBpm(state.bpm + 1));
holdRepeat($("bpmDown"), () => setBpm(state.bpm - 1));
holdRepeat($("ipadBpmUp"), () => setBpm(state.bpm + 1));
holdRepeat($("ipadBpmDown"), () => setBpm(state.bpm - 1));

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
$("ipadTap").onclick = $("tapBtn").onclick;

/* ============================================================
   SETLIST
   ============================================================ */
let songIdx = -1;
let dragIdx = -1;

function saveSetlist() { lsSet("folkbeat.setlist", setlist); }

function renderSetlist() {
  const wrap = $("setlistRows");
  wrap.innerHTML = "";
  if (!setlist.length) {
    const p = document.createElement("p");
    p.id = "setlistEmpty";
    p.textContent = "Nog geen nummers — voeg het eerste toe met “+ Nummer”.";
    wrap.appendChild(p);
  }
  setlist.forEach((song, i) => {
    const st = styleById(song.styleId);
    const row = document.createElement("div");
    row.className = "song-row" + (i === songIdx ? " current" : "") + (i === dragIdx ? " dragging" : "");
    row.innerHTML = `
      <div class="info">
        <div class="name">${escapeHtml(song.name)}</div>
        <div class="meta"><span class="groove">${st ? escapeHtml(st.name) : "⚠ groove weg"}</span><span class="bpm">${song.bpm} BPM</span></div>
      </div>
      <button class="edit" title="Bewerken">✎</button>
      <div class="grip" title="Sleep om te verplaatsen">⠿</div>`;
    row.onclick = () => loadSong(i);
    row.querySelector(".edit").onclick = (e) => { e.stopPropagation(); openSongSheet(i); };
    const grip = row.querySelector(".grip");
    grip.onclick = (e) => e.stopPropagation();
    grip.addEventListener("pointerdown", (e) => startDrag(e, i));
    wrap.appendChild(row);
  });
  renderSongBar();
}

function setSetlistMode(mode) {
  const isPublic = mode === "public";
  $("setlistRows").hidden = isPublic;
  $("publicSongRows").hidden = !isPublic;
  document.querySelectorAll("#setlistMode [data-setlist-mode]").forEach(button => {
    button.classList.toggle("active", button.dataset.setlistMode === mode);
  });
  $("addSongBtn").parentElement.hidden = isPublic;
  if (isPublic) renderPublicSongs(); else renderSetlist();
}

document.querySelectorAll("#setlistMode [data-setlist-mode]").forEach(button => {
  button.onclick = () => setSetlistMode(button.dataset.setlistMode);
});

function renderPublicSongs() {
  const wrap = $("publicSongRows");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!publicSongs.length) {
    const empty = document.createElement("p");
    empty.id = "publicSongEmpty";
    empty.textContent = window.FolkBeatCloud ? "Nog geen openbare nummers." : "Openbare nummers worden geladen zodra er verbinding is.";
    wrap.appendChild(empty);
    return;
  }
  for (const song of publicSongs) {
    const st = styleById(song.styleId);
    const row = document.createElement("div");
    row.className = "song-row";
    row.innerHTML = `
      <div class="info">
        <div class="name">${escapeHtml(song.name)}</div>
        <div class="meta"><span class="groove">${st ? escapeHtml(st.name) : "⚠ groove weg"}</span><span class="bpm">${song.bpm} BPM</span>${song._ownerId === cloudUserId ? '<span class="ownerMark">EIGEN</span>' : ""}</div>
      </div>
      <div class="publicActions"><button class="publicAdd">+ Setlist</button>${song._ownerId === cloudUserId ? '<button class="publicDelete" title="Openbaar nummer verwijderen">✕</button>' : ""}</div>`;
    row.querySelector(".publicAdd").onclick = () => {
      const copy = {
        name: song.name,
        styleId: song.styleId,
        bpm: song.bpm,
        swing: song.swing ?? 0,
        hum: song.hum ?? 0,
        _fromPublic: true,
        _sourcePublicId: song.id
      };
      setlist.push(copy);
      saveSetlist();
      setSetlistMode("local");
    };
    const deleteButton = row.querySelector(".publicDelete");
    if (deleteButton) deleteButton.onclick = () => {
      if (!confirm(`Openbaar nummer “${song.name}” verwijderen?`)) return;
      publicSongs = publicSongs.filter(item => item.id !== song.id);
      queueCloud("delete", "song", { id: song.id });
      renderPublicSongs();
    };
    wrap.appendChild(row);
  }
}

function publishLocalSong(song) {
  if (song._fromPublic) {
    delete song._fromPublic;
    delete song._sourcePublicId;
    song.id = newCloudId("song");
  }
  if (!song.id) song.id = newCloudId("song");
  song._cloud = true;
  queueCloud("upsert", "song", song);
}

/* slepen om te herordenen */
function startDrag(e, i) {
  e.preventDefault();
  dragIdx = i;
  renderSetlist();
  const move = (ev) => {
    const rows = [...$("setlistRows").querySelectorAll(".song-row")];
    let to = dragIdx;
    rows.forEach((r, j) => {
      const rect = r.getBoundingClientRect();
      if (j < dragIdx && ev.clientY < rect.top + rect.height / 2) to = Math.min(to, j);
      if (j > dragIdx && ev.clientY > rect.top + rect.height / 2) to = Math.max(to, j);
    });
    if (to !== dragIdx) {
      const [s] = setlist.splice(dragIdx, 1);
      setlist.splice(to, 0, s);
      if (songIdx === dragIdx) songIdx = to;
      else if (dragIdx < songIdx && to >= songIdx) songIdx--;
      else if (dragIdx > songIdx && to <= songIdx) songIdx++;
      dragIdx = to;
      renderSetlist();
    }
  };
  const up = () => {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", up);
    dragIdx = -1;
    saveSetlist();
    renderSetlist();
  };
  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", up);
}

function loadSong(i) {
  if (i < 0 || i >= setlist.length) return;
  songIdx = i;
  const song = setlist[i];
  const st = styleById(song.styleId);
  if (st) selectStyleById(st.id);
  setBpm(song.bpm);
  setSwing(song.swing ?? 0);
  setHumanize(song.hum ?? 0);
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
    $("songName").textContent = song.name;
    $("songPos").textContent = `${songIdx + 1} / ${setlist.length}`;
  } else {
    $("songName").textContent = "Setlist";
    $("songPos").textContent = `${setlist.length} nummers — tik › voor het eerste`;
  }
  // afwijkend van het geladen nummer? Toon de bewaarbalk met wat er anders is
  const diffs = [];
  if (song) {
    if (song.bpm !== state.bpm) diffs.push("tempo");
    if (song.styleId !== state.styleId) diffs.push("groove");
    if ((song.swing ?? 0) !== state.swing) diffs.push("swing");
    if ((song.hum ?? 0) !== state.humanize) diffs.push("humanize");
  }
  $("dirtyBar").hidden = diffs.length === 0;
  $("dirtyText").textContent = "Gewijzigd: " + diffs.join(", ");
}
$("saveSongBtn").onclick = () => {
  const song = setlist[songIdx];
  if (!song) return;
  song.bpm = state.bpm;
  song.styleId = state.styleId;
  song.swing = state.swing;
  song.hum = state.humanize;
  publishLocalSong(song);
  saveSetlist();
  renderSetlist();
};
$("prevSongBtn").onclick = () => stepSong(-1);
$("nextSongBtn").onclick = () => stepSong(+1);

/* --- nummer-sheet (toevoegen & bewerken) --- */
let sheetSongIdx = -1; // -1 = nieuw nummer
const sng = { styleId: "reel", bpm: 110, swing: 0, hum: 0 };

function openSongSheet(i) {
  sheetSongIdx = i;
  const song = i >= 0 ? setlist[i] : null;
  $("songSheetTitle").textContent = song ? "Nummer bewerken" : "Nummer toevoegen";
  $("sngName").value = song ? song.name : "";
  sng.styleId = song ? song.styleId : state.styleId;
  if (!styleById(sng.styleId)) sng.styleId = BUILTIN_STYLES[0].id;
  sng.bpm = song ? song.bpm : (styleById(sng.styleId)?.bpm ?? 110);
  sng.swing = song ? (song.swing ?? 0) : 0;
  sng.hum = song ? (song.hum ?? 0) : 0;
  $("sngDelete").hidden = !song;
  syncSongSheet();
  openSheet($("songSheet"));
}
function syncSongSheet() {
  $("sngBpm").textContent = sng.bpm;
  $("sngSwing").value = sng.swing;
  $("sngSwingVal").textContent = sng.swing + "%";
  $("sngHum").value = sng.hum;
  $("sngHumVal").textContent = sng.hum + "%";
  const wrap = $("sngStyles");
  wrap.innerHTML = "";
  for (const s of allStyles()) {
    const b = document.createElement("button");
    b.className = "chip" + (s.id === sng.styleId ? " active" : "");
    b.innerHTML = (s.custom ? '<span class="star">★</span> ' : "") + escapeHtml(s.name);
    b.onclick = () => {
      sng.styleId = s.id;
      sng.bpm = s.bpm; // standaardtempo van de gekozen groove voorstellen
      syncSongSheet();
    };
    wrap.appendChild(b);
  }
}
holdRepeat($("sngBpmUp"), () => { sng.bpm = Math.min(220, sng.bpm + 1); $("sngBpm").textContent = sng.bpm; });
holdRepeat($("sngBpmDown"), () => { sng.bpm = Math.max(40, sng.bpm - 1); $("sngBpm").textContent = sng.bpm; });
$("sngSwing").oninput = (e) => { sng.swing = +e.target.value; $("sngSwingVal").textContent = sng.swing + "%"; };
$("sngHum").oninput = (e) => { sng.hum = +e.target.value; $("sngHumVal").textContent = sng.hum + "%"; };

$("sngSave").onclick = () => {
  const name = $("sngName").value.trim();
  if (!name) { $("sngName").focus(); return; }
  const data = { name, styleId: sng.styleId, bpm: sng.bpm, swing: sng.swing, hum: sng.hum };
  let savedSong;
  if (sheetSongIdx >= 0) {
    Object.assign(setlist[sheetSongIdx], data);
    savedSong = setlist[sheetSongIdx];
    if (sheetSongIdx === songIdx) { // dit nummer staat in de speler: meteen doorvoeren
      selectStyleById(data.styleId);
      setBpm(data.bpm);
      setSwing(data.swing);
      setHumanize(data.hum);
    }
  } else {
    savedSong = { id: newCloudId("song"), ...data };
    setlist.push(savedSong);
  }
  publishLocalSong(savedSong);
  saveSetlist();
  renderSetlist();
  closeSheets();
};
$("sngDelete").onclick = () => {
  if (sheetSongIdx < 0) return;
  if (!confirm(`“${setlist[sheetSongIdx].name}” uit de setlist verwijderen?`)) return;
  setlist.splice(sheetSongIdx, 1);
  if (songIdx === sheetSongIdx) songIdx = -1;
  else if (songIdx > sheetSongIdx) songIdx--;
  saveSetlist();
  renderSetlist();
  closeSheets();
};
$("addSongBtn").onclick = () => openSongSheet(-1);

/* ============================================================
   GROOVE-EDITOR
   ============================================================ */
let ed = null;       // werkkopie van de groove die bewerkt wordt
let edPart = "A";
let edPatternClipboard = null;

function setEditorFocus(enabled) {
  const active = !!enabled && matchMedia("(max-width: 620px)").matches;
  $("view-editor").classList.toggle("focus-mode", active);
  document.documentElement.classList.toggle("editor-focus", active);
  $("edFocus").textContent = active ? "✕" : "⛶";
  $("edFocus").setAttribute("aria-label", active ? "Focusmodus sluiten" : "Focusmodus openen");
  if (active) $("edSettings").hidden = true;
  requestAnimationFrame(renderGrid);
}

$("edSettingsToggle").onclick = () => {
  $("edSettings").hidden = !$("edSettings").hidden;
  $("edSettingsToggle").classList.toggle("active", !$("edSettings").hidden);
};
$("edFocus").onclick = () => setEditorFocus(!$("view-editor").classList.contains("focus-mode"));

function editorRhythmConfig(meter, note) {
  if (meter === "6/8") return { beats: 2, spb: note === "16" ? 6 : 3 };
  return { beats: meter === "3/4" ? 3 : 4, spb: note === "16" ? 4 : 2 };
}

function editorRhythmChoice(st) {
  const bars = st.bars === 2 ? 2 : 1;
  if (st.beats === 2 && (st.spb === 3 || st.spb === 6)) return { meter: "6/8", note: st.spb === 6 ? "16" : "8", bars };
  if (st.beats === 3) return { meter: "3/4", note: st.spb >= 4 ? "16" : "8", bars };
  return { meter: "4/4", note: st.spb >= 4 ? "16" : "8", bars };
}

function normalizeEditorRhythm(st) {
  const choice = editorRhythmChoice(st);
  Object.assign(st, editorRhythmConfig(choice.meter, choice.note));
  st.bars = choice.bars;
  return st;
}

function materialize(st) {
  // zorg dat elk instrument een volledige array heeft
  const len = patternLength(st);
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
  ed = materialize({ id: null, name: "", beats: 4, spb: 2, bars: 1, bpm: 110, custom: true, A: {}, B: {}, fill: {} });
  edPart = "A";
  syncEditorFields();
}
function edFromStyle(st) {
  ed = materialize(normalizeEditorRhythm(JSON.parse(JSON.stringify(st))));
  if (!st.custom || st._readOnly) {
    ed.id = null;
    ed.name = st.name + " (eigen)";
    delete ed._cloud;
    delete ed._ownerId;
    delete ed._readOnly;
  }
  ed.custom = true;
  edPart = "A";
  syncEditorFields();
}
function syncEditorFields() {
  const rhythm = editorRhythmChoice(ed);
  $("edName").value = ed.name;
  $("edMeter").value = rhythm.meter;
  $("edNote").value = rhythm.note;
  $("edBars").value = String(rhythm.bars);
  $("edBpm").value = ed.bpm;
  $("edDelete").hidden = !ed.id || ed._readOnly;
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
    o.textContent = s.custom && !s._readOnly ? `★ Bewerk: ${s.name}` : `Kopie van: ${s.name}`;
    sel.appendChild(o);
  }
}
$("edLoad").onclick = () => {
  if (state.preview) stopNow();
  const v = $("edSource").value;
  if (v === "new") edNew();
  else { const st = styleById(v); if (st) edFromStyle(st); }
};

function buildSigOptions() {
  $("edMeter").innerHTML = '<option value="3/4">3/4</option><option value="4/4">4/4</option><option value="6/8">6/8</option>';
  $("edNote").innerHTML = '<option value="8">8ste</option><option value="16">16de</option>';
  $("edBars").innerHTML = '<option value="1">1 maat</option><option value="2">2 maten</option>';
}

function changeEditorRhythm() {
  Object.assign(ed, editorRhythmConfig($("edMeter").value, $("edNote").value));
  ed.bars = +$("edBars").value;
  materialize(ed);
  if (state.step >= patternLength(ed)) state.step = 0;
  if (state.preview) buildBeatSegs();
  renderGrid();
}
$("edMeter").onchange = changeEditorRhythm;
$("edNote").onchange = changeEditorRhythm;
$("edBars").onchange = changeEditorRhythm;
$("edName").oninput = () => { ed.name = $("edName").value; };

function setEditorBpm(value) {
  ed.bpm = Math.min(220, Math.max(40, Math.round(+value || 110)));
  $("edBpm").value = ed.bpm;
  if (state.preview) setBpm(ed.bpm);
}
$("edBpm").onchange = () => setEditorBpm($("edBpm").value);
holdRepeat($("edBpmUp"), () => setEditorBpm(ed.bpm + 1));
holdRepeat($("edBpmDown"), () => setEditorBpm(ed.bpm - 1));

document.querySelectorAll("#edParts button").forEach(b => {
  b.onclick = () => {
    edPart = b.dataset.part;
    document.querySelectorAll("#edParts button").forEach(x => x.classList.toggle("active", x === b));
    renderGrid();
  };
});

$("edPatternCopy").onclick = () => {
  edPatternClipboard = {
    sourcePart: edPart,
    pattern: JSON.parse(JSON.stringify(ed[edPart]))
  };
  $("edPatternPaste").disabled = false;
  $("edPatternPaste").title = `Patroon uit ${edPart === "fill" ? "FILL" : edPart} plakken`;
  edFlash(`${edPart === "fill" ? "FILL" : edPart} gekopieerd`);
};

$("edPatternPaste").onclick = () => {
  if (!edPatternClipboard) return;
  const len = patternLength(ed);
  const pasted = {};
  for (const [inst] of ED_INSTRUMENTS) {
    pasted[inst] = new Array(len).fill(0);
    (edPatternClipboard.pattern[inst] || []).forEach((value, i) => {
      if (i < len) pasted[inst][i] = value;
    });
  }
  ed[edPart] = pasted;
  renderGrid();
  edFlash(`Geplakt naar ${edPart === "fill" ? "FILL" : edPart}`);
};

let editorPaint = null;

function paintEditorCell(cell, audition = false) {
  if (!editorPaint || !cell?.classList.contains("ed-cell")) return;
  const key = `${cell.dataset.inst}:${cell.dataset.step}`;
  if (editorPaint.visited.has(key)) return;
  editorPaint.visited.add(key);
  const inst = cell.dataset.inst;
  const step = +cell.dataset.step;
  ed[editorPaint.part][inst][step] = editorPaint.value;
  if (editorPaint.value) cell.dataset.v = String(editorPaint.value); else delete cell.dataset.v;
  if (audition && editorPaint.value && !state.running) {
    initAudio(); unlockAudioOutput(); ctx.resume(); playInstrument(inst, ctx.currentTime, editorPaint.value);
  }
}

function startEditorPaint(event, cell) {
  if (event.button !== undefined && event.button !== 0) return;
  event.preventDefault();
  const inst = cell.dataset.inst;
  const step = +cell.dataset.step;
  const current = ed[edPart][inst][step] || 0;
  const index = VELOCITY_STEPS.indexOf(current);
  editorPaint = {
    pointerId: event.pointerId,
    part: edPart,
    value: VELOCITY_STEPS[(index + 1) % VELOCITY_STEPS.length],
    visited: new Set()
  };
  paintEditorCell(cell, true);
}

addEventListener("pointermove", (event) => {
  if (!editorPaint || event.pointerId !== editorPaint.pointerId) return;
  event.preventDefault();
  const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest(".ed-cell");
  if (cell && $("edGrid").contains(cell)) paintEditorCell(cell);
}, { passive: false });

function stopEditorPaint(event) {
  if (!editorPaint || (event.pointerId !== undefined && event.pointerId !== editorPaint.pointerId)) return;
  editorPaint = null;
}
addEventListener("pointerup", stopEditorPaint);
addEventListener("pointercancel", stopEditorPaint);
addEventListener("blur", () => { editorPaint = null; });

function renderGrid() {
  const grid = $("edGrid");
  grid.innerHTML = "";
  const total = patternLength(ed);
  const chunkSize = editorGridChunkSize(total, ed.beats * ed.spb);
  for (const [inst, label] of ED_INSTRUMENTS) {
    const instrumentGroup = document.createElement("section");
    instrumentGroup.className = "ed-instrument-group";
    for (let start = 0; start < total; start += chunkSize) {
      const end = Math.min(total, start + chunkSize);
      const line = document.createElement("div");
      line.className = "ed-line";
      const lab = document.createElement("div");
      lab.className = "ed-label"; lab.textContent = label;
      if (total > chunkSize) lab.dataset.range = `${start + 1}–${end}`;
      line.appendChild(lab);
      const beats = document.createElement("div");
      beats.className = "ed-beats";
      beats.style.setProperty("--step-count", end - start);
      for (let i = start; i < end; i++) {
        const cell = document.createElement("div");
        cell.className = "ed-cell" + (i % ed.spb === 0 ? " beat-start" : "");
        cell.dataset.step = i;
        cell.dataset.inst = inst;
        cell.setAttribute("role", "button");
        cell.setAttribute("aria-label", `${label}, stap ${i + 1}`);
        const v = ed[edPart][inst][i];
        if (v) cell.dataset.v = String(v);
        cell.onpointerdown = (event) => startEditorPaint(event, cell);
        beats.appendChild(cell);
      }
      line.appendChild(beats);
      instrumentGroup.appendChild(line);
    }
    grid.appendChild(instrumentGroup);
  }
}

function editorGridChunkSize(total, stepsPerMeasure) {
  if (total <= 8) return total;
  const wrap = $("edGridWrap");
  const style = getComputedStyle(wrap);
  const contentWidth = wrap.clientWidth
    - (parseFloat(style.paddingLeft) || 0)
    - (parseFloat(style.paddingRight) || 0);
  const wide = matchMedia("(min-width: 760px)").matches;
  const labelAndGap = wide ? 86 : 66;
  const minimumCell = wide ? 48 : 34;
  const requiredWidth = labelAndGap + total * minimumCell + (total - 1) * 4;
  if (contentWidth >= requiredWidth) return total;
  if (stepsPerMeasure <= 8) return stepsPerMeasure;
  if (stepsPerMeasure === 12) return 6;
  if (stepsPerMeasure === 16) return 8;
  return Math.min(8, total);
}

let editorResizeFrame = 0;
addEventListener("resize", () => {
  cancelAnimationFrame(editorResizeFrame);
  editorResizeFrame = requestAnimationFrame(() => {
    if (!matchMedia("(max-width: 620px)").matches && document.documentElement.classList.contains("editor-focus")) {
      setEditorFocus(false);
    } else if (ed && !$("view-editor").hidden) {
      renderGrid();
    }
  });
});
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
};
function updatePreviewBtn() {
  const b = $("edPreview");
  b.textContent = state.preview ? "■" : "▶";
  b.classList.toggle("on", state.preview);
}

function edFlash(msg) {
  const el = $("edMsg");
  el.textContent = msg;
  setTimeout(() => { el.textContent = ""; }, 3000);
}

$("edSave").onclick = () => {
  ed.name = ($("edName").value || "").trim() || "Mijn groove";
  $("edName").value = ed.name;
  const wasNew = !ed.id;
  if (!ed.id) ed.id = newCloudId("groove");
  // opslaan als compacte kopie: lege instrumentrijen weglaten
  const store = JSON.parse(JSON.stringify(ed));
  for (const part of ["A", "B", "fill"]) {
    for (const inst in store[part]) {
      if (!store[part][inst].some(v => v)) delete store[part][inst];
    }
  }
  store._cloud = true;
  store._ownerId = cloudUserId;
  store._readOnly = false;
  ed._cloud = true;
  ed._ownerId = cloudUserId;
  ed._readOnly = false;
  const i = customStyles.findIndex(s => s.id === ed.id);
  if (i >= 0) customStyles[i] = store; else customStyles.push(store);
  lsSet("folkbeat.customStyles", customStyles);
  queueCloud("upsert", "groove", store);
  rebuildStyleLists();
  $("edSource").value = ed.id;
  $("edDelete").hidden = false;
  edFlash(wasNew ? "Opgeslagen ✓ — staat nu tussen de grooves" : "Opgeslagen ✓");
};

$("edCopy").onclick = () => {
  ed = JSON.parse(JSON.stringify(ed));
  ed.id = null;
  ed.name = (ed.name || "Mijn groove") + " (kopie)";
  syncEditorFields();
  edFlash("Kopie gemaakt — sla op om te bewaren");
};

$("edDelete").onclick = () => {
  if (!ed.id) return;
  if (!confirm(`Groove “${ed.name}” verwijderen?`)) return;
  if (!ed._readOnly) queueCloud("delete", "groove", { id: ed.id });
  customStyles = customStyles.filter(s => s.id !== ed.id);
  lsSet("folkbeat.customStyles", customStyles);
  if (state.styleId === ed.id) selectStyleById(BUILTIN_STYLES[0].id, true);
  rebuildStyleLists();
  edNew();
};

function rebuildStyleLists() {
  buildStyles();
  buildEdSource();
  renderSetlist();
}

/* ============================================================
   TOETSENBORD / BLUETOOTH-PEDAAL
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.code === "Escape") {
    if (document.documentElement.classList.contains("editor-focus")) setEditorFocus(false);
    else closeSheets();
    return;
  }
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
buildSigOptions();
kitId = lsGet("folkbeat.kit", "acoustic");
if (!KITS.some(k => k.id === kitId)) kitId = "acoustic";
buildKitChips();
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
buildBeatSegs();
updateTransportUI();
edNew();
startIdleBlink();
loadSamples();
