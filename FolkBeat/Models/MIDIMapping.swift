import Foundation
import SwiftData

enum MIDIAction: String, Codable, CaseIterable, Identifiable {
    case nextSection
    case previousSection
    case playStop

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .nextSection: "Next Section"
        case .previousSection: "Previous Section"
        case .playStop: "Play / Stop"
        }
    }

    var defaultCC: UInt8 {
        switch self {
        case .nextSection: 64
        case .previousSection: 65
        case .playStop: 66
        }
    }
}

@Model
final class MIDIMapping {
    var actionRaw: String
    var ccNumber: Int
    var channel: Int

    var action: MIDIAction {
        get { MIDIAction(rawValue: actionRaw) ?? .nextSection }
        set { actionRaw = newValue.rawValue }
    }

    init(action: MIDIAction, ccNumber: Int? = nil, channel: Int = 0) {
        self.actionRaw = action.rawValue
        self.ccNumber = ccNumber ?? Int(action.defaultCC)
        self.channel = channel
    }
}
