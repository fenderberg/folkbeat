import Foundation
import SwiftData

@Model
final class SetlistEntry {
    var order: Int
    var setlist: Setlist?
    var song: Song?

    init(order: Int = 0, song: Song? = nil) {
        self.order = order
        self.song = song
    }
}
