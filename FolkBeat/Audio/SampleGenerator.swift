import AVFoundation

/// Generates synthetic drum samples as AVAudioPCMBuffers.
/// These serve as functional placeholders — replace with real WAV files for production.
enum SampleGenerator {

    static let sampleRate: Double = 44100

    static func generateAll() -> [DrumVoice: AVAudioPCMBuffer] {
        [
            .kick:        generateKick(),
            .snare:       generateSnare(),
            .hihatClosed: generateHiHatClosed(),
            .hihatOpen:   generateHiHatOpen(),
            .brushSwirl:  generateBrushSwirl(),
            .rim:         generateRim(),
            .crash:       generateCrash(),
        ]
    }

    // MARK: - Individual Generators

    static func generateKick() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.35) { _, t, _ in
            let freq = 150.0 - 110.0 * min(t / 0.35, 1.0)
            let phase = 2.0 * .pi * freq * t
            let envelope = exp(-7.0 * t)
            let click: Float = t < 0.006 ? Float.random(in: -0.25...0.25) : 0
            return Float(sin(phase) * envelope) * 0.85 + click
        }
    }

    static func generateSnare() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.22) { _, t, _ in
            let tonal = Float(sin(2.0 * .pi * 185.0 * t) * exp(-28.0 * t)) * 0.35
            let body  = Float(sin(2.0 * .pi * 330.0 * t) * exp(-40.0 * t)) * 0.15
            let noise = Float.random(in: -1...1) * Float(exp(-14.0 * t)) * 0.5
            return tonal + body + noise
        }
    }

    static func generateHiHatClosed() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.07) { _, t, _ in
            let noise = Float.random(in: -1...1) * Float(exp(-55.0 * t))
            let tone = Float(sin(2.0 * .pi * 6500.0 * t) * exp(-70.0 * t)) * 0.2
            return (noise + tone) * 0.35
        }
    }

    static func generateHiHatOpen() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.35) { _, t, _ in
            let noise = Float.random(in: -1...1) * Float(exp(-5.0 * t))
            let shimmer = Float(sin(2.0 * .pi * 7000.0 * t) * exp(-8.0 * t)) * 0.15
            return (noise + shimmer) * 0.35
        }
    }

    static func generateBrushSwirl() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.45) { _, t, duration in
            let envelope = Float(sin(.pi * t / duration))
            return Float.random(in: -1...1) * envelope * 0.18
        }
    }

    static func generateRim() -> AVAudioPCMBuffer {
        makeBuffer(duration: 0.05) { _, t, _ in
            let tone  = Float(sin(2.0 * .pi * 1100.0 * t) * exp(-90.0 * t)) * 0.5
            let click = Float.random(in: -1...1) * Float(exp(-110.0 * t)) * 0.35
            return tone + click
        }
    }

    static func generateCrash() -> AVAudioPCMBuffer {
        makeBuffer(duration: 1.5) { _, t, _ in
            let shimmer = Float(sin(2.0 * .pi * 340.0 * t) * exp(-1.8 * t)) * 0.12
            let high    = Float(sin(2.0 * .pi * 5200.0 * t) * exp(-3.0 * t)) * 0.08
            let noise   = Float.random(in: -1...1) * Float(exp(-1.2 * t)) * 0.40
            return shimmer + high + noise
        }
    }

    // MARK: - Buffer Helpers

    private static func makeBuffer(
        duration: Double,
        generator: (Int, Double, Double) -> Float
    ) -> AVAudioPCMBuffer {
        let format = AVAudioFormat(standardFormatWithSampleRate: sampleRate, channels: 2)!
        let frameCount = AVAudioFrameCount(sampleRate * duration)
        let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: frameCount)!
        buffer.frameLength = frameCount

        let left  = buffer.floatChannelData![0]
        let right = buffer.floatChannelData![1]

        for i in 0..<Int(frameCount) {
            let t = Double(i) / sampleRate
            let sample = generator(i, t, duration)
            left[i]  = sample
            right[i] = sample
        }

        return buffer
    }
}
