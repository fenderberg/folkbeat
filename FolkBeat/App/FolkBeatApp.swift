import SwiftUI
import SwiftData

@main
struct FolkBeatApp: App {

    init() {
        DrumSampleManager.shared.loadSamples()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [
            Setlist.self,
            SetlistEntry.self,
            Song.self,
            SongSection.self,
            MIDIMapping.self,
        ])
    }
}
