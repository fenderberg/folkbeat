# PRD — FolkBeat

*Product Requirements Document · versie 15 juli 2026*

## 1. Waarom dit product

FolkBeat is een software-alternatief voor het BeatBuddy-drumpedaal: een drumcomputer die je live bedient als een bandlid, niet als een metronoom. De aanleiding: een folkband zonder drummer wil betrouwbare, muzikale drumbegeleiding op optredens en repetities, bedienbaar door een spelend bandlid (handen zijn bezet — bediening moet met de voet of met één tik kunnen).

**Randvoorwaarde die alles bepaalt:** de gebruiker kan geen native apps bouwen of installeren (geen Mac/Xcode; beheer via pc). Daarom is FolkBeat een **web-app (PWA)** die draait in de browser op telefoon en iPad, installeerbaar op het beginscherm en offline bruikbaar. Een eerdere native SwiftUI-aanpak (zie git-historie: oude README/project.yml van mei 2026) is om deze reden verlaten.

## 2. Doelgroep en gebruikscontext

- **Primaire gebruiker:** muzikant in een folkband, geen drummer, gemiddelde technische kennis.
- **Context:** live optredens en repetities. Donkere podia, weinig tijd tussen nummers, handen aan het instrument.
- **Apparaten:** iPad of telefoon (via browser/PWA), eventueel laptop. Bediening via touchscreen of Bluetooth page-turner-pedaal (stuurt toetsaanslagen zoals PgUp/PgDn).

## 3. Wat het product doet (huidige functionaliteit)

### Speler
- Zes ingebouwde folk-grooves: Reel (4/4), Jig (6/8), Wals (3/4), Polka (2/4), Mazurka (3/4), Scottish (4/4), elk met deel A en B, een fill en een eigen standaardtempo.
- BeatBuddy-bedieningsmodel: start (met instelbare intro) → loopend deel → fill op afroep → deelwissel via fill → outro (fill + slotcrash) bij stop.
- Tempo 40–220 BPM: slider, ±-knoppen, tap tempo.
- Swing 0–100% over de offbeats (uitgeschakeld bij triolen-grooves).
- Intro-modi: 1 maat aftellen, 2 maten aftellen, fill als intro, direct starten.
- Zeven drumkits: Akoestisch, Droog & folky, Studio, Vintage, Rock, Bodhrán & percussie, Synth.
- Beat-indicator, wake lock (scherm blijft aan), grote touch-doelen.
- Toets-/pedaalbediening: spatie/Enter/PgDn/→ = start·stop, PgUp/←/F = fill, B = deelwissel, N/P = volgend/vorig nummer, ↑↓ = tempo.

### Setlist
- Nummers met naam, groove, tempo, swing en intro-modus; volgorde aanpasbaar; alles lokaal bewaard (localStorage).
- Laden van een nummer zet de speler volledig goed; ◀ ▶ en N/P navigeren door de set.
- Bewerken achteraf: ✎-regel in de setlist, of live in de speler aanpassen en met 💾 in het nummer bewaren.

### Groove-editor
- Stappengrid per instrument (10 instrumenten), twee aanslagsterktes (zacht/hard), delen A/B/fill apart.
- Maatsoort instelbaar: 2–6 tellen × 8sten/triolen/16den.
- Nieuw, kopie van bestaande groove, of eerdere eigen groove bewerken; live meeluisteren tijdens het bewerken (wijzigingen klinken direct, meelopende playhead).
- Eigen grooves verschijnen met ★ tussen de stijlen en in de setlist-keuze.

### Geluid
- Web Audio API met lookahead-scheduler (sample-accurate timing).
- 67 echte samples (mono-mp3, ±1,9 MB totaal), 2 round-robin-variaties per instrument, subtiele toonhoogte-/timing-/aanslagvariatie per hit ("humanisering"), open-hihat-choke.
- Synth-fallback als samples niet laden; count-in-click altijd synthetisch en strak.

### Platform
- PWA: manifest + service worker; appbestanden network-first (updates komen direct door), samples cache-first (offline beschikbaar).
- Geen build-stap, geen dependencies: index.html + app.js + statische assets.

## 4. Niet-doelen (bewust buiten scope)

- Geen native app, geen App Store-distributie.
- Geen audio-opname of -export; FolkBeat speelt alleen live.
- Geen cloud-accounts of synchronisatie; opslag is lokaal (export/import als bestand staat op de roadmap).
- Geen volwaardige DAW/sequencer: het grid is bewust simpel (2 aanslagsterktes, 1 maat per deel).

## 5. Technische architectuur

| Onderdeel | Keuze | Reden |
|---|---|---|
| UI | Vanilla HTML/CSS/JS, geen framework | Geen build-stap, direct te hosten, klein |
| Audio | Web Audio API, lookahead-scheduler (25 ms tick, 120 ms vooruit) | Enige manier om in de browser strak te timen |
| Samples | mp3 mono 128k, 2 round-robins per instrument | Klein genoeg voor mobiel, mp3 werkt ook op iOS/Safari |
| Kits | `KITS`-array: instrument → samplebestanden, met fallback-kit | Nieuwe kit = één datablokje |
| Grooves | `STYLES`/customs: velocity-arrays per instrument per deel | Editor en engine delen hetzelfde formaat |
| Opslag | localStorage (`folkbeat.*`-sleutels) | Geen backend nodig |
| Offline | Service worker: network-first (app), cache-first (samples) | Updates direct, samples offline |

### Samplebronnen en licenties
- **The Open Source Drum Kit** (Real Music Media, via github.com/crabacus/the-open-source-drumkit) — gratis uitgebracht drumkit; basis van de kits Akoestisch en Droog & folky.
- **Tone.js audio-repo** (github.com/Tonejs/audio, afkomstig uit Chris Wilsons web-audio-samples) — kits Studio, Vintage, Rock.
- **VCSL** (github.com/sgossner/VCSL, **CC0**) — alle percussie van het Bodhrán & percussie-kit en de shaker.

## 6. Roadmap

### Hoog (eerstvolgende stappen)
1. **Hosten** (GitHub Pages/Netlify) zodat de app op iPad/telefoon geïnstalleerd en met de band getest kan worden. Zonder dit blijft alles pc-gebonden.
2. **Songstructuur per nummer** — vastgelegde opbouw (intro → n maten A → fill → n maten B → … → outro) die na één druk op start zichzelf afspeelt. Grootste sprong in speelgemak; de oude native README bevatte hiervoor al een sectie-wachtrij-concept.
3. **Export/import** van setlists en eigen grooves (JSON-bestand) — back-up en delen met bandleden; localStorage is kwetsbaar bij het wissen van browserdata.

### Middel
- Podium-modus (minimale UI, extra groot).
- Instelbare pedaal-mapping; lang indrukken = volgend nummer.
- Meer grooves: bourrée, an dro, hanter dro, slip jig (9/8), polska.
- Volumeregeling (master, evt. per instrumentgroep).
- Meerdere setlists.

### Laag / onderzoeken
- Web MIDI voor echte MIDI-voetschakelaars (beperkt op iOS).
- Tempo-automatisering (accelerando per herhaling).
- Meer delen dan A/B; brush-samples voor ballads.
- Per-kit gainbalans.

## 7. Bekende beperkingen

- **iOS:** geluid start pas na een tik op het scherm (browserbeleid); de mute-schakelaar dempt web-audio; Web MIDI ontbreekt in Safari.
- localStorage kan verloren gaan bij het wissen van sitedata (mitigatie: export/import op de roadmap).
- Bluetooth-pedalen die alleen als toetsenbord werken kunnen op iOS het schermtoetsenbord onderdrukken/oproepen, afhankelijk van het pedaalmodel.
- De service worker vereist https of localhost; via `file://` werkt de app wel, maar zonder offline cache (samples laden dan via synth-fallback als fetch faalt).
