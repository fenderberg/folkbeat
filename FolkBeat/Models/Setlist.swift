import Foundation
import SwiftData

@Model
final class Setlist {
    var name: String
    var createdAt: Date

    @Relationship(deleteRule: .cascade, inverse: \SetlistEntry.setlist)
    var entries: [SetlistEntry] = []

    var sortedEntries: [SetlistEntry] {
        entries.sorted { $0.order < $1.order }
    }

    var songs: [Song] {
        sortedEntries.compactMap(\.song)
    }

    init(name: String = "New Setlist") {
        self.name = name
        self.createdAt = Date()
    }
}
