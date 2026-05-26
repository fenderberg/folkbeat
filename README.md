# FolkBeat

A live performance drum companion app for folk/Americana bands, built with SwiftUI for iPad.

## Requirements

- macOS with Xcode 15+
- iOS 17+ iPad (simulator or device)
- [XcodeGen](https://github.com/yonaskolb/XcodeGen) (to generate the `.xcodeproj`)

## Setup

```bash
# 1. Install XcodeGen (if not already installed)
brew install xcodegen

# 2. Generate the Xcode project
cd BeatBuddy
xcodegen generate

# 3. Open in Xcode
open FolkBeat.xcodeproj
```

**Alternative (without XcodeGen):**

1. Open Xcode → File → New → Project → iOS App (SwiftUI, Swift, SwiftData)
2. Name it "FolkBeat", set target to iPad, iOS 17+
3. Delete the generated source files
4. Drag the `FolkBeat/` folder into the Xcode project navigator
5. Ensure all `.swift` files are added to the FolkBeat target
6. Copy the `Info.plist` values into the target's build settings or use the plist file directly

## Project Structure

```
FolkBeat/
├── App/
│   └── FolkBeatApp.swift          # App entry point, SwiftData container
├── Models/
│   ├── TimeSignature.swift        # 4/4, 3/4, 6/8 enum
│   ├── DrumVoice.swift            # Kick, snare, hihat, etc.
│   ├── DrumPattern.swift          # Pattern grid definition
│   ├── PatternLibrary.swift       # All built-in Americana patterns
│   ├── Song.swift                 # SwiftData song model
│   ├── SongSection.swift          # SwiftData section model
│   ├── Setlist.swift              # SwiftData setlist model
│   ├── SetlistEntry.swift         # Join model for setlist ordering
│   └── MIDIMapping.swift          # MIDI CC → action mapping
├── Audio/
│   ├── SampleGenerator.swift      # Synthesizes placeholder drum samples
│   ├── DrumSampleManager.swift    # Singleton sample cache
│   └── BeatSequencer.swift        # AVAudioEngine real-time sequencer
├── MIDI/
│   └── MIDIManager.swift          # CoreMIDI input + MIDI Learn
├── ViewModels/
│   └── PerformanceViewModel.swift # Bridges sequencer ↔ SwiftUI views
├── Views/
│   ├── ContentView.swift          # Root navigation (NavigationSplitView)
│   ├── Setlists/
│   │   ├── SetlistListView.swift
│   │   └── SetlistDetailView.swift
│   ├── Songs/
│   │   ├── SongListView.swift
│   │   └── SongEditorView.swift
│   ├── Performance/
│   │   ├── PerformanceView.swift  # Primary live screen
│   │   ├── SectionButton.swift    # Large section tap targets
│   │   └── BPMControlView.swift   # BPM +/- and tap tempo
│   └── Settings/
│       └── SettingsView.swift     # MIDI mapping, audio info
├── Assets.xcassets/
└── Info.plist
```

## Architecture

- **BeatSequencer** — Heart of the app. Uses `AVAudioEngine` with `AVAudioPlayerNode` instances per drum voice. A high-priority `DispatchSource` timer schedules sample playback using `AVAudioTime(hostTime:)` for drift-free, sample-accurate timing over long performances.

- **PerformanceViewModel** — `@Observable` + `@MainActor` bridge. Receives callbacks from the sequencer's background scheduling queue and publishes state changes to SwiftUI on the main thread.

- **DrumPattern / PatternLibrary** — Pure data. Patterns are 16-step (4/4) or 12-step (3/4, 6/8) boolean grids keyed by `DrumVoice`. Swing is handled in the sequencer's timing math, not in the grid data.

- **MIDIManager** — Wraps CoreMIDI. Connects to all available sources on startup and reconnects when devices change. Supports MIDI Learn: press "Learn", hit a pedal button, the CC number is captured and mapped to an action.

## Replacing Drum Samples

The app ships with synthesized placeholder samples (sine waves + noise). To use real recordings:

1. Prepare short WAV or CAF files (44.1 kHz, stereo, <1 second each)
2. Name them: `kick.wav`, `snare.wav`, `hihat_closed.wav`, `hihat_open.wav`, `brush_swirl.wav`, `rim.wav`, `crash.wav`
3. Add them to the Xcode project bundle
4. Update `DrumSampleManager.loadSamples()` to load from bundle files instead of calling `SampleGenerator`

## Merging with Google Stitch Designs

The project is structured so UI views are thin wrappers around the `PerformanceViewModel`. To apply Stitch-generated SwiftUI views:

1. Replace or modify the files under `Views/` with your Stitch output
2. Bind to the existing `PerformanceViewModel` properties:
   - `vm.isPlaying`, `vm.currentStep`, `vm.currentBar`
   - `vm.sections`, `vm.currentSectionIndex`, `vm.queuedSectionIndex`
   - `vm.bpm`, `vm.song`, `vm.setlist`
3. Call the ViewModel methods for interactions:
   - `vm.play()`, `vm.stop()`, `vm.selectSection(_:)`
   - `vm.adjustBPM(by:)`, `vm.tapTempo()`
   - `vm.nextSong()`, `vm.previousSong()`

## Live Performance Patterns

| Pattern | Time Sig | Description |
|---------|----------|-------------|
| `country_4_4` | 4/4 | Kick 1+3, snare 2+4, closed hats on 8ths |
| `brush_ballad` | 4/4 | Brush swirl, soft kick 1+3, rim on 2+4 |
| `shuffle` | 4/4 | Swing 8th feel, kick 1+3, snare 2+4 |
| `half_time` | 4/4 | Kick 1, snare 3, open hats 2+4 |
| `build` | 4/4 | Country + crash on beat 1 |
| `waltz_3_4` | 3/4 | Kick 1, snare 2+3 |
