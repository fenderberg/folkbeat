import Foundation

struct DrumPattern: Identifiable, Equatable {
    let id: String
    let displayName: String
    let timeSignature: TimeSignature
    let grid: [DrumVoice: [Bool]]
    let swing: Double

    var stepsPerMeasure: Int { timeSignature.stepsPerMeasure }

    static func == (lhs: DrumPattern, rhs: DrumPattern) -> Bool {
        lhs.id == rhs.id
    }
}
