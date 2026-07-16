# FolkBeat — Design Document

*Versie 0.1 · 16 juli 2026 · branch `design`*

Dit document is de enige bron van waarheid voor het nieuwe FolkBeat-design. Het is geschreven om op twee manieren gebruikt te worden:

1. **Google Stitch** — elk scherm heeft een kant-en-klaar Engels promptblok (sectie 6) dat je direct in Stitch plakt om schermvarianten te genereren.
2. **Claude (design & bouw)** — de tokens en componentspecificaties (secties 3–5) zijn precies genoeg om de HTML/CSS direct te implementeren.

Het vorige Electribe-hardware-design wordt volledig losgelaten: geen faceplate, geen seven-segment display, geen skeuomorfisme.

---

## 1. Designrichting

**Stijl: moderne muziek-app.** Referentiekader: Ableton Note, Koala Sampler, Teenage Engineering-software. Dat betekent:

- Flat met **subtiele diepte**: zachte schaduwen en één niveau van "verhoogde" kaarten, geen gesimuleerde 3D-knoppen.
- **Verfijnde kleuraccenten** op een rustige ondergrond: één primaire accentkleur draagt de hele interface, functionele kleuren (spelen/opnemen/waarschuwing) blijven schaars.
- **Speels maar professioneel**: royale afronding, vlotte micro-animaties, maar geen decoratie die afleidt tijdens een optreden.
- **Typografie doet het werk**: het tempo, de songtitel en de sectiestatus zijn tekst, groot en strak — geen nagebootste LED-displays.

**Thema's: donker én licht.** Donker is het hoofdthema (podium, repetitie); licht is voor overdag grooves en setlists bewerken. Beide thema's delen dezelfde tokens (sectie 3) met per thema andere waarden. Standaard volgt de app het donkere thema; een schakelaar zit in de instellingen, niet in beeld tijdens het spelen.

**Schone lei.** De schermindeling mag afwijken van de huidige app. Wat blijft is de *functionaliteit* (sectie 2), niet de vorm.

### Ontwerpprincipes (in volgorde van belang)

1. **Podium-proof** — bedienbaar in het donker, met één duim of een voetpedaal, zonder te lezen. De speeltoestand (gestopt / speelt A / speelt B / fill komt eraan) moet op 3 meter afstand afleesbaar zijn.
2. **Eén-tik-bediening** — elke live-actie (start/stop, fill, deelwissel, volgend nummer) is één grote raakzone, minimaal 64×64 pt, onderin bereik van de duim.
3. **Rust in beeld** — tijdens het spelen toont het scherm alleen wat live nodig is. Bewerken (tempo fijnregelen, kit kiezen, swing) mag een laag dieper zitten.
4. **Vertrouwd, geen handleiding** — patronen uit bekende muziek-apps; niets dat uitleg nodig heeft.

---

## 2. Functionele inventaris (wat het design moet dragen)

Onveranderd ten opzichte van de huidige app; dit is de checklist waar elk schermontwerp aan moet voldoen.

### Speler (hoofdscherm)
- Start/stop (één toggle, direct starten, outro-fill bij stop)
- Fill op afroep; deelwissel A/B (start meteen een willekeurige fill)
- Groove-keuze (7 ingebouwde + eigen grooves met ★)
- Tempo 40–220 BPM: grote weergave, fijnregeling, tap tempo
- Swing 0–100% (uit bij triolen), humanize 0–100%, mastervolume
- Drumkit-keuze (7 kits)
- Beat-indicator (meelopende stappen), toestand-indicatie (gestopt/A/B/fill in wachtrij)
- Vorig/volgend nummer uit de setlist

### Setlist
- Lijst van nummers (naam, groove, tempo, swing, humanize), herordenen, toevoegen, bewerken, verwijderen
- Nummer laden → speler staat volledig goed
- Huidige positie in de set zichtbaar

### Groove-editor
- Stappengrid: 10 instrumenten × (2–6 tellen × 8sten/triolen/16den), 2 aanslagsterktes
- Delen A / B / fill apart bewerken
- Nieuw / kopie / eigen groove bewerken; live meeluisteren met playhead

### Systeem
- Toets-/pedaalbediening (spatie/Enter/PgDn/→ start·stop, PgUp/←/F fill, B deelwissel, N/P navigatie, ↑↓ tempo)
- Wake lock; werkt offline (PWA); doelapparaten: telefoon (portret) en iPad (portret + landschap)

---

## 3. Design tokens

Alle waarden zijn CSS-custom-properties; het thema wisselt door de waarden om te zetten, nooit door componenten anders op te bouwen.

### 3.1 Kleur

| Token | Donker (hoofd) | Licht | Gebruik |
|---|---|---|---|
| `--bg` | `#111318` | `#F7F7F5` | App-achtergrond |
| `--surface` | `#1B1E26` | `#FFFFFF` | Kaarten, panelen |
| `--surface-2` | `#252932` | `#EFEFEC` | Verhoogde/actieve vlakken, invoervelden |
| `--border` | `#2F3440` | `#E2E2DE` | Hairlines, scheiders |
| `--text` | `#F2F3F5` | `#1A1C22` | Primaire tekst |
| `--text-dim` | `#9AA0AC` | `#6B7078` | Labels, secundaire tekst |
| `--accent` | `#FFB13D` | `#E08A00` | Primaire accentkleur (amber): actieve keuzes, sliders, links |
| `--accent-ink` | `#231A05` | `#FFFFFF` | Tekst óp accentkleur |
| `--play` | `#3DDC84` | `#1FA95C` | Speeltoestand, startknop actief |
| `--fill` | `#FF5C7A` | `#E03A5B` | Fill actief / in wachtrij |
| `--danger` | `#FF5C5C` | `#D64545` | Verwijderen, fouten |

Rationale: amber als accent knipoogt naar warme folktinten zonder het "hout-thema" op te zoeken; groen = spelen en roze/rood = fill zijn op afstand van elkaar én van amber te onderscheiden, ook voor de meeste kleurenblindheid (ondersteund door vorm/positie, nooit kleur alleen).

### 3.2 Typografie

| Token | Waarde | Gebruik |
|---|---|---|
| Font | System-stack: `-apple-system, "SF Pro", "Segoe UI", Roboto, sans-serif` | Alles; geen webfont-download (offline, snelheid) |
| Cijfers | `font-variant-numeric: tabular-nums` | BPM, teller — geen gespring |
| `--fs-hero` | 64–96 pt (clamp op viewport) | BPM-weergave |
| `--fs-title` | 22 pt / 600 | Songtitel, schermtitels |
| `--fs-body` | 17 pt / 400 | Lijsten, labels |
| `--fs-caption` | 13 pt / 500, letterspacing 0.06em, kapitaal | Sectielabels ("SWING", "KIT") |

### 3.3 Vorm & diepte

| Token | Waarde |
|---|---|
| `--radius-s` | 10 px (chips, stappen) |
| `--radius-m` | 16 px (kaarten, knoppen) |
| `--radius-l` | 24 px (sheets, hoofdtransportknop) |
| `--shadow-raise` | `0 2px 8px rgb(0 0 0 / .35)` donker · `0 2px 8px rgb(0 0 0 / .10)` licht |
| Spacing-grid | 4 px basiseenheid; standaardmarges 16/24 px |

### 3.4 Beweging

- Standaardovergang 160 ms `ease-out`; toestandswissel (A→B, fill) 240 ms.
- Beat-indicator en playhead bewegen **zonder** transitie (hard, op de tel) — timing voelbaar maken, niet verzachten.
- `prefers-reduced-motion`: alle niet-functionele animatie uit; beat-indicator blijft (functioneel).

---

## 4. Schermontwerpen

### 4.1 Navigatiemodel

Drie tabs onderin (telefoon) of links (iPad landschap): **Speler · Setlist · Editor**. Iconen + label. De tabbalk verbergt zichzelf *niet*: op het podium is voorspelbaarheid belangrijker dan schermruimte.

### 4.2 Speler — "podiumkaart boven, regelaars onder"

Portret-telefoon, van boven naar onder:

1. **Songregel** (compact): ‹ vorige · songtitel + positie ("3/12") · volgende ›. Tik op de titel opent de setlist.
2. **Podiumkaart** (dominant, ~40% van het scherm, `--surface`, radius L):
   - **BPM groot** (hero-formaat, tabular) met eronder de groove-naam als chip.
   - **Toestandsband** over de volle kaartbreedte: kleur en tekst tonen de speeltoestand — grijs "GESTOPT", groen "DEEL A"/"DEEL B", roze pulserend "FILL…" of "→ DEEL B" wanneer een wissel in de wachtrij staat. Dit is het op-3-meter-afleesbare element.
   - **Beat-indicator**: rij stippen/segmenten onder de toestandsband, meelopend, eerste tel geaccentueerd.
3. **Transportrij** (vast onderin de duimzone, boven de tabbalk):
   - **START/STOP**: één ronde knop, 88 pt, gecentreerd. Gestopt: accent-omlijnd met ▶; spelend: gevuld `--play` met ■.
   - Links: **FILL** (64 pt, roze omlijnd; gevuld + pulserend als fill loopt/wacht).
   - Rechts: **A/B** (64 pt, toont het deel dat *komt* na de wissel; blinkt tijdens wachtrij).
4. **Regelaarsstrook** (horizontaal scrollend of uitklapbaar paneel): tempo −/+ en TAP, swing, humanize, volume, kit-keuze. Slider-first (geen draaiknoppen — sliders zijn op touch preciezer en vertrouwder). Deze strook mag inklappen tot één regel chips zodra er gespeeld wordt.

iPad landschap: podiumkaart links (60%), regelaars rechts als vast paneel; transportrij blijft onderaan over de volle breedte.

### 4.3 Setlist — "één lijst, grote regels"

- Elke rij: songnaam (title-formaat) · onder elkaar groove-chip + BPM · rechts een sleepgreep. Rijhoogte ≥ 64 pt.
- Actieve song: accentbalkje links + accentkleurige titel.
- Tik = laden en naar de speler; ✎ via swipe of ellipsis-menu (bewerken, dupliceren, verwijderen — verwijderen in `--danger`).
- Onderaan een vaste "+ Nummer"-knop.
- Bewerken opent een **sheet** (modal van onderen) met naam, groove, tempo, swing, humanize — geen apart scherm.

### 4.4 Editor — "grid is koning"

- Bovenaan: groove-naam, deel-schakelaar **A · B · FILL** (gesegmenteerde control), maatsoort-keuze, afspeelknop voor live meeluisteren.
- Het stappengrid vult de rest: instrumentnamen links (caption-stijl), stappen als afgeronde cellen. Leeg = `--surface-2`; zacht = accent 40%; hard = accent 100%. Playhead: kolom licht op.
- Telgroepen visueel gescheiden (extra witruimte per tel), eerste stap van elke tel iets zwaardere rand.
- Cellen ≥ 40 pt op telefoon (grid mag horizontaal scrollen), ≥ 48 pt op iPad.
- Onderaan: opslaan / kopie / verwijderen.

---

## 5. Componentenbibliotheek

| Component | Spec |
|---|---|
| **Tabbalk** | 3 items, icoon 24 pt + label caption; actief = accentkleur; `--surface` met top-hairline |
| **Primaire knop (transport)** | Rond, ≥ 64 pt; omlijnd = rust, gevuld = actief; toestand ook via icoon (▶/■), nooit kleur alleen |
| **Chip** | Radius S, `--surface-2`; actief: accentvulling + `--accent-ink` |
| **Slider** | Baan 6 pt `--surface-2`, gevuld deel accent, greep 28 pt met schaduw; waarde als tekst ernaast |
| **Segmented control** | A·B·FILL en maatsoorten; actief segment `--surface-2` verhoogd + accenttekst |
| **Lijstrij** | ≥ 64 pt, hairline-scheiders, sleepgreep ⠿ rechts |
| **Sheet** | Van onderen, radius L bovenhoeken, dim-laag 40%; sluit met veeg of ✕ |
| **Toestandsband** | Volle breedte, 44 pt, kapitaaltekst gecentreerd; kleurcode zoals 4.2; pulseert (opacity 60↔100%, 1×/tel) bij wachtrij-toestand |
| **Beat-indicator** | Segmenten 12 pt hoog, radius S; passief `--surface-2`, actueel accent, tel-1 breder |
| **Stappencel (editor)** | Zie 4.4; tik doorloopt leeg → zacht → hard → leeg |

Toegankelijkheid: contrast tekst ≥ 4.5:1, grote UI-elementen ≥ 3:1 (te controleren in beide thema's); alle toestanden hebben vorm/tekst naast kleur; focus-ringen 2 pt accent voor toetsenbord/pedaal.

---

## 6. Stitch-prompts (kopieer & plak, Engels)

**Gemeenschappelijke stijlvoorvoegsel** — plak dit vóór elke schermprompt:

> Design a screen for "FolkBeat", a drum machine web app for live folk musicians. Style: modern music-making app (like Ableton Note or Koala Sampler) — flat with subtle depth, soft 16px rounded corners, calm dark background (#111318) with elevated cards (#1B1E26), one amber accent color (#FFB13D), green (#3DDC84) only for the playing state, pink (#FF5C7A) only for drum fills. System font, huge tabular numerals for the tempo. Generous spacing, big touch targets (min 64pt for live controls). No skeuomorphism, no fake hardware, no LED displays. Mobile portrait, dark theme.

**Scherm 1 — Speler:**

> Main player screen. Top: compact row with previous/next arrows and current song title "Rocky Road to Dublin — 3/12". Below: one dominant card (~40% of screen) showing the tempo "112" in huge numerals, a small chip with the groove name "Reel", a full-width status band that reads "PART A" on green (this must be readable from 3 meters), and a row of beat-indicator segments with the first beat accented. Bottom, fixed in thumb reach: a round 88pt START/STOP button in the center (outlined with play icon when stopped), a 64pt FILL button on the left (pink outline), a 64pt A/B part button on the right. Between card and transport: a horizontally scrollable strip of controls as chips and sliders — tempo −/+, TAP, swing slider, humanize slider, volume slider, drum-kit selector. Bottom tab bar: Player, Setlist, Editor.

**Scherm 2 — Setlist:**

> Setlist screen. A single list of songs, each row at least 64pt tall: song title in medium-bold, below it a small groove chip ("Jig") plus BPM ("118 BPM"), a drag handle on the right. The third row is the active song, marked with an amber accent bar on the left edge and amber title. A fixed "+ Add song" button at the bottom above the tab bar. Also show a bottom sheet (over a dimmed background) for editing one song: name field, groove selector chips, tempo stepper, swing and humanize sliders, save button.

**Scherm 3 — Groove-editor:**

> Drum pattern editor screen. Top bar: pattern name "Reel ★", a segmented control A · B · FILL (A active), a time-signature chip "4 × 8ths", and a small play button for live preview. Main area: a step-sequencer grid, 10 instrument rows labeled on the left in small caps (KICK, SNARE, HIHAT, …), 8 step cells per row as rounded squares. Empty cells are dark, soft hits are 40% amber, hard hits are full amber. Steps are visually grouped per beat with extra spacing, and one column is highlighted as the moving playhead. Bottom: save, duplicate and delete actions. Keep the grid dominant; cells at least 40pt.

**Variant licht thema** — vervang in het voorvoegsel:

> …calm light background (#F7F7F5) with white cards, amber accent (#E08A00), green (#1FA95C) for playing, pink (#E03A5B) for fills. Light theme.

---

## 7. Open ontwerpvragen

1. Klapt de regelaarsstrook automatisch in zodra er gespeeld wordt (maximale rust) of blijft hij altijd zichtbaar (voorspelbaarheid)? → prototype beide in Stitch.
2. Toont de A/B-knop het *huidige* deel of het deel waar je *naartoe* wisselt? (Voorstel hierboven: het doel-deel; testen met de band.)
3. Tap tempo: eigen grote knop of chip in de regelaarsstrook? Bij livegebruik misschien te belangrijk voor de strook.
4. iPad-landschap: tabbalk links als rail of onderaan houden voor consistentie met telefoon?
5. Themawissel: automatisch met systeem, handmatig, of beide (auto + override)?

## 8. Vervolgstappen

1. Prompts uit sectie 6 in Google Stitch draaien; per scherm 2–3 varianten genereren.
2. Beste varianten terugbrengen naar dit document (screenshots + wat overgenomen wordt) en de open vragen (sectie 7) beslissen.
3. Tokens uit sectie 3 als CSS-custom-properties implementeren op de `design`-branch; daarna scherm voor scherm ombouwen (speler eerst).
