import Foundation

enum TimeSignature: String, Codable, CaseIterable, Identifiable {
    case fourFour = "4/4"
    case threeFour = "3/4"
    case sixEight = "6/8"

    var id: String { rawValue }

    var beatsPerMeasure: Int {
        switch self {
        case .fourFour: 4
        case .threeFour: 3
        case .sixEight: 6
        }
    }

    var stepsPerMeasure: Int {
        switch self {
        case .fourFour: 16
        case .threeFour: 12
        case .sixEight: 12
        }
    }

    /// Sixteenth-note subdivisions per beat (used for swing calculations).
    var subdivisionsPerBeat: Int {
        switch self {
        case .fourFour: 4
        case .threeFour: 4
        case .sixEight: 2
        }
    }
}
