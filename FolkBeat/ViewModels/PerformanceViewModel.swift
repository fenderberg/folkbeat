import Observation
import SwiftData

@Observable
@MainActor
final class PerformanceViewModel {

    // MARK: - Published state

    private(set) var isPlaying = false
    private(set) var currentStep = 0
    private(set) var currentBar = 0
    private(set) var currentSectionIndex = 0
    private(set) var queuedSectionIndex: Int?

    var bpm: Double = 120 {
        didSet { sequencer.bpm = bpm }
    }

    var masterVolume: Float = 1.0 {
        didSet { sequencer.masterVolume = masterVolume }
    }

    // MARK: - Song / Setlist

    private(set) var song: Song?
    private(set) var sections: [SongSection] = []

    private(set) var setlist: Setlist?
    private(set) var currentSongIndex = 0
    var songCount: Int { setlist?.sortedEntries.count ?? 0 }

    // MARK: - Tap Tempo

    private var tapTimes: [Date] = []

    // MARK: - Engine

    private let sequencer = BeatSequencer()
    let midiManager = MIDIManager()

    // MARK: - Init

    init() {
        let samples = DrumSampleManager.shared
        if !samples.isLoaded { samples.loadSamples() }
        sequencer.loadSamples(samples.samples)

        sequencer.onStepChanged = { [weak self] step in
            Task { @MainActor in self?.currentStep = step }
        }
        sequencer.onBarCompleted = { [weak self] bar in
            Task { @MainActor in self?.currentBar = bar }
        }
        sequencer.onSectionTransitioned = { [weak self] in
            Task { @MainActor in self?.handleSectionTransitioned() }
        }
        sequencer.onAutoAdvance = { [weak self] in
            Task { @MainActor in self?.advanceToNextSection() }
        }

        midiManager.onAction = { [weak self] action in
            Task { @MainActor in self?.handleMIDI(action) }
        }
        midiManager.start()
    }

    // MARK: - Loading

    func loadSong(_ song: Song) {
        stop()
        self.song = song
        self.sections = song.sortedSections
        self.bpm = song.bpm
        self.currentSectionIndex = 0
        self.queuedSectionIndex = nil
    }

    func loadSetlist(_ setlist: Setlist, startIndex: Int = 0) {
        self.setlist = setlist
        self.currentSongIndex = startIndex
        if let song = setlist.sortedEntries[safe: startIndex]?.song {
            loadSong(song)
        }
    }

    // MARK: - Transport

    func play() {
        guard let section = sections[safe: currentSectionIndex],
              let pattern = section.pattern else { return }

        sequencer.play(
            pattern: pattern,
            sectionVolume: Float(section.volume),
            maxBars: section.bars
        )
        isPlaying = true
    }

    func stop() {
        sequencer.stop()
        isPlaying = false
        currentStep = 0
        currentBar = 0
        queuedSectionIndex = nil
    }

    func togglePlayStop() {
        isPlaying ? stop() : play()
    }

    // MARK: - Section Navigation

    func selectSection(_ index: Int) {
        guard sections.indices.contains(index) else { return }

        if !isPlaying {
            currentSectionIndex = index
            queuedSectionIndex = nil
            return
        }

        guard let section = sections[safe: index],
              let pattern = section.pattern else { return }

        queuedSectionIndex = index
        sequencer.queueTransition(
            pattern: pattern,
            sectionVolume: Float(section.volume),
            maxBars: section.bars
        )
    }

    func advanceToNextSection() {
        let next = currentSectionIndex + 1
        if sections.indices.contains(next) {
            selectSection(next)
        }
    }

    func goToPreviousSection() {
        let prev = currentSectionIndex - 1
        if sections.indices.contains(prev) {
            selectSection(prev)
        }
    }

    // MARK: - BPM

    func adjustBPM(by delta: Double) {
        bpm = max(30, min(300, bpm + delta))
    }

    func tapTempo() {
        let now = Date()
        tapTimes.append(now)

        // Keep only recent taps (last 2 seconds)
        tapTimes = tapTimes.filter { now.timeIntervalSince($0) < 2.0 }

        guard tapTimes.count >= 4 else { return }

        var intervals: [TimeInterval] = []
        for i in 1..<tapTimes.count {
            intervals.append(tapTimes[i].timeIntervalSince(tapTimes[i - 1]))
        }

        let avgInterval = intervals.reduce(0, +) / Double(intervals.count)
        let tappedBPM = 60.0 / avgInterval
        bpm = max(30, min(300, tappedBPM.rounded()))
    }

    // MARK: - Setlist Navigation

    func nextSong() {
        guard let setlist, currentSongIndex + 1 < setlist.sortedEntries.count else { return }
        stop()
        currentSongIndex += 1
        if let song = setlist.sortedEntries[safe: currentSongIndex]?.song {
            loadSong(song)
        }
    }

    func previousSong() {
        guard currentSongIndex > 0 else { return }
        stop()
        currentSongIndex -= 1
        if let setlist, let song = setlist.sortedEntries[safe: currentSongIndex]?.song {
            loadSong(song)
        }
    }

    // MARK: - Internal

    private func handleSectionTransitioned() {
        if let queued = queuedSectionIndex {
            currentSectionIndex = queued
            queuedSectionIndex = nil
        }
    }

    private func handleMIDI(_ action: MIDIAction) {
        switch action {
        case .nextSection:     advanceToNextSection()
        case .previousSection: goToPreviousSection()
        case .playStop:        togglePlayStop()
        }
    }
}

// MARK: - Safe array subscript

extension Collection {
    subscript(safe index: Index) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}
