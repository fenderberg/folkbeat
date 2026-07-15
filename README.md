# FolkBeat

Een drumcomputer-web-app voor folkbands zonder drummer — een software-versie van het BeatBuddy-pedaal. Draait in de browser op iPad, telefoon en pc; installeerbaar als PWA en offline bruikbaar. Zie [PRD.md](PRD.md) voor de volledige productbeschrijving en roadmap.

**▶ Live: https://fenderberg.github.io/folkbeat/** — open op je iPad/telefoon en kies "Zet op beginscherm" voor de volledige app-ervaring (offline, zonder browserbalk).

> **Let op:** dit verving de eerdere native SwiftUI/iPad-opzet (mei 2026). Die vereiste een Mac met Xcode en is verlaten; dit is een pure web-app zonder build-stap.

## Starten

Er is geen build-stap. Serveer de map met een willekeurige statische webserver:

```bash
npx serve -l 8321 .
# open http://localhost:8321
```

Of open `index.html` direct in de browser (werkt, maar zonder service worker/offline cache).

Voor gebruik op iPad/telefoon: host de map op een https-adres (bijv. GitHub Pages of Netlify), open de URL in de browser en kies "Zet op beginscherm". De app werkt daarna offline.

## Bediening

| Actie | Scherm | Toets / pedaal |
|---|---|---|
| Start · stop (outro) | grote knop | spatie, Enter, PgDn, → |
| Fill | FILL | PgUp, ←, F |
| Deel A ↔ B (via fill) | DEEL A → B | B |
| Volgend / vorig nummer | ▶ / ◀ in songbalk | N / P |
| Tempo ±2 BPM | − / + | ↑ / ↓ |

Bluetooth page-turner-pedalen (AirTurn e.d.) sturen PgUp/PgDn of pijltjestoetsen en werken dus direct als voetschakelaar.

## Bestanden

```
index.html            Opmaak en styling (drie tabbladen: Speler, Setlist, Grooves)
app.js                Alle logica: sequencer, sample-engine, kits, setlist, editor
sw.js                 Service worker (app network-first, samples cache-first)
manifest.webmanifest  PWA-manifest
icon.svg              App-icoon
samples/              67 drumsamples (mono-mp3, ±1,9 MB totaal)
PRD.md                Productbeschrijving en roadmap
```

## Grooves en kits toevoegen

- **Groove:** voeg een object toe aan `BUILTIN_STYLES` in [app.js](app.js) (of maak hem in de app via het Grooves-tabblad). Een groove is per deel (A/B/fill) een set velocity-arrays per instrument; arraylengte = tellen × onderverdeling.
- **Kit:** voeg een blokje toe aan de `KITS`-array: instrumentnaam → samplebestanden (zonder `.mp3`). Met `fallback: "acoustic"` vult een ander kit ontbrekende instrumenten aan. Zet nieuwe samples als mono-mp3 in `samples/` en voeg de namen toe aan de lijst in [sw.js](sw.js).

## Samplebronnen

| Bron | Gebruikt voor | Licentie |
|---|---|---|
| [The Open Source Drum Kit](https://github.com/crabacus/the-open-source-drumkit) (Real Music Media) | kits Akoestisch, Droog & folky | gratis uitgebracht ("open source drum kit") |
| [Tone.js audio](https://github.com/Tonejs/audio) (uit Chris Wilsons web-audio-samples) | kits Studio, Vintage, Rock | zie bronrepo |
| [VCSL](https://github.com/sgossner/VCSL) (Versilian Studios) | Bodhrán & percussie, shaker | CC0 (publiek domein) |

Alle samples zijn geconverteerd naar mono-mp3 128 kbps met verwijdering van beginstilte (ffmpeg).

## Opslag

Alles staat lokaal in `localStorage` onder `folkbeat.*`-sleutels: eigen grooves, setlist, gekozen kit en laatste instellingen. Er is geen backend. Wis je de sitedata van de browser, dan ben je eigen grooves en setlists kwijt — export/import staat op de roadmap.

## Bekende beperkingen (iOS)

- Geluid start pas na een eerste tik op het scherm (browserbeleid).
- De fysieke mute-schakelaar van de iPad dempt web-audio.
- Web MIDI wordt door Safari niet ondersteund; pedalen werken via toetsaanslagen.
