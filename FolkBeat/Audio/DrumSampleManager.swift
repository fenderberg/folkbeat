import AVFoundation

final class DrumSampleManager {

    static let shared = DrumSampleManager()

    private(set) var samples: [DrumVoice: AVAudioPCMBuffer] = [:]
    private(set) var isLoaded = false

    private init() {}

    /// Generate all placeholder drum samples.  Call once at app launch.
    func loadSamples() {
        guard !isLoaded else { return }
        samples = SampleGenerator.generateAll()
        isLoaded = true
    }

    func buffer(for voice: DrumVoice) -> AVAudioPCMBuffer? {
        samples[voice]
    }
}
