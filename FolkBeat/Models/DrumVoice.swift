import Foundation

enum DrumVoice: String, CaseIterable, Codable, Identifiable {
    case kick
    case snare
    case hihatClosed
    case hihatOpen
    case brushSwirl
    case rim
    case crash

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .kick: "Kick"
        case .snare: "Snare"
        case .hihatClosed: "Hi-Hat (Closed)"
        case .hihatOpen: "Hi-Hat (Open)"
        case .brushSwirl: "Brush Swirl"
        case .rim: "Rim"
        case .crash: "Crash"
        }
    }
}
