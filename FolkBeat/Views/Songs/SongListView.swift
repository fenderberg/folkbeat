import SwiftUI
import SwiftData

struct SongListView: View {

    @Environment(\.modelContext) private var context
    @Query(sort: \Song.title) private var songs: [Song]
    @State private var showingNewSong = false
    @State private var newTitle = ""

    var body: some View {
        List {
            ForEach(songs) { song in
                NavigationLink(value: song) {
                    VStack(alignment: .leading) {
                        Text(song.title)
                            .font(.headline)
                        Text("\(Int(song.bpm)) BPM · \(song.timeSignature.rawValue) · \(song.sections.count) sections")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .onDelete(perform: deleteSongs)
        }
        .navigationTitle("Songs")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button { showingNewSong = true } label: {
                    Image(systemName: "plus")
                }
            }
        }
        .alert("New Song", isPresented: $showingNewSong) {
            TextField("Title", text: $newTitle)
            Button("Create") { createSong() }
            Button("Cancel", role: .cancel) { newTitle = "" }
        }
        .overlay {
            if songs.isEmpty {
                ContentUnavailableView(
                    "No Songs",
                    systemImage: "music.note",
                    description: Text("Tap + to create your first song.")
                )
            }
        }
    }

    private func createSong() {
        guard !newTitle.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let song = Song(title: newTitle)
        song.addDefaultSections()
        context.insert(song)
        newTitle = ""
    }

    private func deleteSongs(at offsets: IndexSet) {
        for index in offsets {
            context.delete(songs[index])
        }
    }
}
