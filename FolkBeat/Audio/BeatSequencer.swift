import AVFoundation

/// Sample-accurate beat sequencer built on AVAudioEngine.
///
/// All audio scheduling happens on a dedicated high-priority dispatch queue.
/// UI state updates are delivered via callbacks which the caller should
/// dispatch to the main thread.
final class BeatSequencer: @unchecked Sendable {

    // MARK: - Callbacks (fired from the scheduling queue)

    var onStepChanged: ((Int) -> Void)?
    var onBarCompleted: ((Int) -> Void)?
    var onSectionTransitioned: (() -> Void)?
    var onAutoAdvance: (() -> Void)?

    // MARK: - Thread-safe properties

    private let lock = NSLock()

    private var _bpm: Double = 120
    var bpm: Double {
        get { lock.withLock { _bpm } }
        set { lock.withLock { _bpm = newValue } }
    }

    private var _masterVolume: Float = 1.0
    var masterVolume: Float {
        get { lock.withLock { _masterVolume } }
        set {
            lock.withLock { _masterVolume = newValue }
            mixerNode.outputVolume = newValue
        }
    }

    private var _sectionVolume: Float = 0.8
    var sectionVolume: Float {
        get { lock.withLock { _sectionVolume } }
        set { lock.withLock { _sectionVolume = newValue } }
    }

    // MARK: - Audio graph

    private let engine = AVAudioEngine()
    private var playerNodes: [DrumVoice: AVAudioPlayerNode] = [:]
    private let mixerNode = AVAudioMixerNode()
    private let format: AVAudioFormat

    // MARK: - Sample buffers

    private var sampleBuffers: [DrumVoice: AVAudioPCMBuffer] = [:]

    // MARK: - Sequencer state

    private(set) var isPlaying = false
    private var currentStep = 0
    private var currentBar = 0
    private var currentPattern: DrumPattern?
    private var maxBars = 0

    // MARK: - Queued transition

    private var _queuedTransition: QueuedTransition?
    var hasQueuedTransition: Bool { lock.withLock { _queuedTransition != nil } }

    struct QueuedTransition {
        let pattern: DrumPattern
        let volume: Float
        let maxBars: Int
    }

    // MARK: - Scheduling internals

    private var schedulingTimer: DispatchSourceTimer?
    private let schedulingQueue = DispatchQueue(
        label: "com.folkbeat.sequencer",
        qos: .userInteractive
    )
    private let scheduleAheadTime: Double = 0.1
    private var nextStepHostTime: UInt64 = 0
    private var timebaseInfo = mach_timebase_info_data_t()

    // MARK: - Init

    init() {
        format = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 2)!
        mach_timebase_info(&timebaseInfo)
        buildAudioGraph()
    }

    private func buildAudioGraph() {
        engine.attach(mixerNode)
        for voice in DrumVoice.allCases {
            let node = AVAudioPlayerNode()
            engine.attach(node)
            engine.connect(node, to: mixerNode, format: format)
            playerNodes[voice] = node
        }
        engine.connect(mixerNode, to: engine.mainMixerNode, format: format)
    }

    // MARK: - Public API

    func loadSamples(_ samples: [DrumVoice: AVAudioPCMBuffer]) {
        sampleBuffers = samples
    }

    func play(pattern: DrumPattern, sectionVolume: Float = 0.8, maxBars: Int = 0) {
        guard !isPlaying else { return }

        currentPattern = pattern
        _sectionVolume = sectionVolume
        self.maxBars = maxBars
        currentStep = 0
        currentBar = 0

        do {
            try AVAudioSession.sharedInstance().setCategory(
                .playback, mode: .default, options: [.mixWithOthers]
            )
            try AVAudioSession.sharedInstance().setActive(true)
            try engine.start()
        } catch {
            print("[BeatSequencer] engine start failed: \(error)")
            return
        }

        for node in playerNodes.values { node.play() }

        isPlaying = true
        nextStepHostTime = mach_absolute_time()
        startSchedulingLoop()
    }

    func stop() {
        isPlaying = false
        schedulingTimer?.cancel()
        schedulingTimer = nil
        lock.withLock { _queuedTransition = nil }

        for node in playerNodes.values { node.stop() }
        engine.stop()

        currentStep = 0
        currentBar = 0
    }

    func queueTransition(pattern: DrumPattern, sectionVolume: Float, maxBars: Int) {
        lock.withLock {
            _queuedTransition = QueuedTransition(
                pattern: pattern, volume: sectionVolume, maxBars: maxBars
            )
        }
    }

    func cancelQueuedTransition() {
        lock.withLock { _queuedTransition = nil }
    }

    // MARK: - Scheduling loop

    private func startSchedulingLoop() {
        let timer = DispatchSource.makeTimerSource(queue: schedulingQueue)
        timer.schedule(deadline: .now(), repeating: .milliseconds(5))
        timer.setEventHandler { [weak self] in self?.tick() }
        timer.resume()
        schedulingTimer = timer
    }

    private func tick() {
        guard isPlaying, let pattern = currentPattern else { return }

        let now = mach_absolute_time()
        let lookAhead = secondsToHostTicks(scheduleAheadTime)

        while nextStepHostTime < now + lookAhead {
            let step = currentStep
            let vol = lock.withLock { _sectionVolume }
            scheduleStep(pattern: pattern, step: step, volume: vol, at: nextStepHostTime)
            onStepChanged?(step)

            let currentBPM = lock.withLock { _bpm }
            let duration = stepDuration(
                step: step,
                bpm: currentBPM,
                swing: pattern.swing,
                subdivisionsPerBeat: pattern.timeSignature.subdivisionsPerBeat
            )
            nextStepHostTime += secondsToHostTicks(duration)
            currentStep += 1

            if currentStep >= pattern.stepsPerMeasure {
                currentStep = 0
                currentBar += 1
                onBarCompleted?(currentBar)

                if handleMeasureBoundary() { break }
            }
        }
    }

    /// Returns true if we transitioned (caller should restart the tick loop).
    private func handleMeasureBoundary() -> Bool {
        if let transition = lock.withLock({ _queuedTransition }) {
            lock.withLock { _queuedTransition = nil }
            currentPattern = transition.pattern
            lock.withLock { _sectionVolume = transition.volume }
            maxBars = transition.maxBars
            currentBar = 0
            onSectionTransitioned?()
            return true
        }

        if maxBars > 0 && currentBar >= maxBars {
            currentBar = 0
            onAutoAdvance?()
        }

        return false
    }

    // MARK: - Sample scheduling

    private func scheduleStep(
        pattern: DrumPattern,
        step: Int,
        volume: Float,
        at hostTime: UInt64
    ) {
        let audioTime = AVAudioTime(hostTime: hostTime)

        for (voice, steps) in pattern.grid {
            guard step < steps.count, steps[step],
                  let buffer = sampleBuffers[voice],
                  let node = playerNodes[voice]
            else { continue }

            node.scheduleBuffer(buffer, at: audioTime, options: [], completionHandler: nil)
        }
    }

    // MARK: - Timing

    /// Calculates the duration of a single step, applying swing when appropriate.
    private func stepDuration(
        step: Int,
        bpm: Double,
        swing: Double,
        subdivisionsPerBeat: Int
    ) -> Double {
        let beatDuration = 60.0 / bpm
        let baseStep = beatDuration / Double(subdivisionsPerBeat)

        guard swing > 0, subdivisionsPerBeat == 4 else { return baseStep }

        // Swing at the 8th-note level: stretch the first half of each beat,
        // compress the second half.  Each beat has 4 steps (16th notes).
        let posInBeat = step % 4
        let firstHalf  = (2.0 + swing) / 4.0 * beatDuration
        let secondHalf = (2.0 - swing) / 4.0 * beatDuration

        return posInBeat < 2 ? firstHalf / 2.0 : secondHalf / 2.0
    }

    // MARK: - Host-time utilities

    private func secondsToHostTicks(_ seconds: Double) -> UInt64 {
        let nanos = seconds * 1_000_000_000
        return UInt64(nanos * Double(timebaseInfo.denom) / Double(timebaseInfo.numer))
    }
}
