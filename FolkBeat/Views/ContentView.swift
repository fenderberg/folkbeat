import SwiftUI
import SwiftData

struct ContentView: View {

    var body: some View {
        NavigationSplitView {
            List {
                NavigationLink("Setlists", value: RootDestination.setlists)
                NavigationLink("Songs", value: RootDestination.songs)
                NavigationLink("Settings", value: RootDestination.settings)
            }
            .navigationTitle("FolkBeat")
        } detail: {
            NavigationStack {
                SetlistListView()
                    .navigationDestination(for: RootDestination.self) { dest in
                        switch dest {
                        case .setlists: SetlistListView()
                        case .songs:    SongListView()
                        case .settings: SettingsView()
                        }
                    }
                    .navigationDestination(for: Setlist.self) { setlist in
                        SetlistDetailView(setlist: setlist)
                    }
                    .navigationDestination(for: Song.self) { song in
                        SongEditorView(song: song)
                    }
            }
        }
    }
}

enum RootDestination: Hashable {
    case setlists
    case songs
    case settings
}
