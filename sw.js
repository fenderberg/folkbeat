const CACHE = "folkbeat-v4";
const SAMPLES = [
  "kick1", "kick2", "snare1", "snare2", "stick1", "stick2",
  "hatc1", "hatc2", "hato1", "hato2", "tomh1", "tomh2",
  "toml1", "toml2", "crash1", "crash2", "ride1", "ride2",
  "snoff1", "snoff2", "rim1", "rim2", "fhh1", "fhh2",
  "hchh1", "hchh2", "tomm1", "tomm2", "credge1", "credge2",
  "redge1", "redge2",
  "st-kick", "st-snare", "st-hihat", "st-tom1", "st-tom3",
  "k8-kick", "k8-snare", "k8-hihat", "k8-tom1", "k8-tom3",
  "sk-kick", "sk-snare", "sk-hihat", "sk-tom1", "sk-tom3",
  "fdk1", "fdk2", "fds1", "fds2", "wood1", "wood2",
  "shkd1", "shkd2", "shku1", "shku2", "tamb1", "tamb2",
  "tambr1", "tambr2", "darb1", "darb2", "caj1", "caj2",
  "clv1", "clv2",
].map((n) => "samples/" + n + ".mp3");
const ASSETS = ["./", "index.html", "app.js", "manifest.webmanifest", "icon.svg", ...SAMPLES];

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
