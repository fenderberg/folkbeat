const CACHE = "folkbeat-v13";
const MP3S = [
  "kick1", "kick2", "snare1", "snare2", "stick1", "stick2",
  "hatc1", "hatc2", "hato1", "hato2", "tomh1", "tomh2",
  "toml1", "toml2", "crash1", "crash2", "ride1", "ride2",
  "snoff1", "snoff2", "rim1", "rim2", "fhh1", "fhh2",
  "hchh1", "hchh2", "tomm1", "tomm2", "credge1", "credge2",
  "redge1", "redge2",
  "fdk1", "fdk2", "fds1", "fds2", "wood1", "wood2",
  "shkd1", "shkd2", "shku1", "shku2", "tamb1", "tamb2",
  "tambr1", "tambr2", "darb1", "darb2", "caj1", "caj2",
  "clv1", "clv2",
].map((n) => "samples/" + n + ".mp3");
const M4AS = [
  "rd-kick1", "rd-kick2", "rd-snare1", "rd-snare2", "rd-stick1", "rd-stick2",
  "rd-hatc1", "rd-hatc2", "rd-hato1", "rd-hato2", "rd-tomh1", "rd-tomh2",
  "rd-toml1", "rd-toml2", "rd-crash1", "rd-crash2", "rd-ride1", "rd-ride2",
  "rd-shk1", "rd-shk2",
  "pr-kick1", "pr-kick2", "pr-snare1", "pr-snare2", "pr-stick1", "pr-stick2",
  "pr-hatc1", "pr-hatc2", "pr-hato1", "pr-hato2", "pr-tomh1", "pr-tomh2",
  "pr-toml1", "pr-toml2", "pr-crash1", "pr-crash2", "pr-ride1", "pr-ride2",
  "pr-shk1", "pr-shk2",
  "rw-kick1", "rw-kick2", "rw-snare1", "rw-snare2", "rw-stick1", "rw-stick2",
  "rw-hato1", "rw-hato2", "rw-crash1", "rw-crash2", "rw-ride1", "rw-ride2",
  "sc-kick1", "sc-kick2", "sc-clap1", "sc-clap2", "sc-stick1", "sc-stick2",
  "sc-hatc1", "sc-hatc2", "sc-hato1", "sc-hato2", "sc-tomh1", "sc-tomh2",
  "sc-toml1", "sc-toml2", "sc-crash1", "sc-crash2", "sc-ride1", "sc-ride2",
  "sc-shk1", "sc-shk2",
].map((n) => "samples/" + n + ".m4a");
const SAMPLES = [...MP3S, ...M4AS];
const ASSETS = ["./", "index.html", "app.js", "skins/electribe.css", "manifest.webmanifest", "icon.svg", ...SAMPLES];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  const isSample = url.pathname.includes("/samples/");
  if (isSample) {
    // samples veranderen niet: cache-first
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
  } else {
    // app-bestanden: network-first zodat updates direct doorkomen, cache als offline-vangnet
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  }
});
