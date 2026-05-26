import Foundation
import SwiftData

@Model
final class Song {
    var title: String
    var bpm: Double
    var timeSignatureRaw: String
    var createdAt: Date

    @Relationship(deleteRule: .cascade, inverse: \SongSection.song)
    var sections: [SongSection] = []

    @Relationship(deleteRule: .cascade, inverse: \SetlistEntry.song)
    var setlistEntries: [SetlistEntry] = []

    var timeSignature: TimeSignature {
        get { TimeSignature(rawValue: timeSignatureRaw) ?? .fourFour }
        set { timeSignatureRaw = newValue.rawValue }
    }

    var sortedSections: [SongSection] {
        sections.sorted { $0.order < $1.order }
    }

    init(
        title: String = "New Song",
        bpm: Double = 120,
        timeSignature: TimeSignature = .fourFour
    ) {
        self.title = title
        self.bpm = bpm
        self.timeSignatureRaw = timeSignature.rawValue
        self.createdAt = Date()
    }

    func addDefaultSections() {
        let defaults: [(String, String, Int)] = [
            ("Intro", "country_4_4", 4),
            ("Verse", "country_4_4", 0),
            ("Chorus", "build", 0),
            ("Outro", "half_time", 4),
        ]
        for (i, (name, pattern, bars)) in defaults.enumerated() {
            let section = SongSection(name: name, patternId: pattern, bars: bars, order: i)
            sections.append(section)
        }
    }
}
