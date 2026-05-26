import Foundation
import SwiftData

@Model
final class SongSection {
    var name: String
    var patternId: String
    /// Number of bars before auto-advancing. 0 = loop forever until manual trigger.
    var bars: Int
    var volume: Double
    var order: Int
    var song: Song?

    init(
        name: String,
        patternId: String = "country_4_4",
        bars: Int = 0,
        volume: Double = 0.8,
        order: Int = 0
    ) {
        self.name = name
        self.patternId = patternId
        self.bars = bars
        self.volume = volume
        self.order = order
    }

    var pattern: DrumPattern? {
        PatternLibrary.pattern(named: patternId)
    }
}
