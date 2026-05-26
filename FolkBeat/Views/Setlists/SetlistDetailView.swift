import SwiftUI
import SwiftData

struct SetlistDetailView: View {

    @Bindable var setlist: Setlist
    @Environment(\.modelContext) private var context
    @Query(sort: \Song.title) private var allSongs: [Song]
    @State private var showingSongPicker = false
    @State private var performanceVM: PerformanceViewModel?

    var body: some View {
        List {
            Section("Songs") {
                ForEach(setlist.sortedEntries) { entry in
                    if let song = entry.song {
                        NavigationLink(value: song) {
                            HStack {
                                Text("\(entry.order + 1).")
                                    .foregroundStyle(.secondary)
                                    .frame(width: 30, alignment: .trailing)
                                VStack(alignment: .leading) {
                                    Text(song.title)
                                        .font(.headline)
                                    Text("\(Int(song.bpm)) BPM · \(song.timeSignature.rawValue) · \(song.sections.count) sections")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                            }
                        }
                    }
                }
                .onDelete(perform: removeEntries)
                .onMove(perform: moveEntries)
            }
        }
        .navigationTitle(setlist.name)
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Menu {
                    Button("Add Existing Song") { showingSongPicker = true }
                    Button("Create New Song") { createAndAddSong() }
                } label: {
                    Image(systemName: "plus")
                }
            }

            ToolbarItem(placement: .bottomBar) {
                Button {
                    let vm = PerformanceViewModel()
                    vm.loadSetlist(setlist)
                    performanceVM = vm
                } label: {
                    Label("Start Performance", systemImage: "play.fill")
                        .font(.headline)
                }
                .disabled(setlist.entries.isEmpty)
            }
        }
        .sheet(isPresented: $showingSongPicker) {
            SongPickerSheet(allSongs: allSongs) { song in
                addSong(song)
            }
        }
        .fullScreenCover(item: $performanceVM) { vm in
            PerformanceView(vm: vm)
        }
    }

    private func addSong(_ song: Song) {
        let entry = SetlistEntry(order: setlist.entries.count, song: song)
        entry.setlist = setlist
        setlist.entries.append(entry)
    }

    private func createAndAddSong() {
        let song = Song()
        song.addDefaultSections()
        context.insert(song)
        addSong(song)
    }

    private func removeEntries(at offsets: IndexSet) {
        let sorted = setlist.sortedEntries
        for index in offsets {
            context.delete(sorted[index])
        }
        reorderEntries()
    }

    private func moveEntries(from source: IndexSet, to destination: Int) {
        var sorted = setlist.sortedEntries
        sorted.move(fromOffsets: source, toOffset: destination)
        for (i, entry) in sorted.enumerated() {
            entry.order = i
        }
    }

    private func reorderEntries() {
        for (i, entry) in setlist.sortedEntries.enumerated() {
            entry.order = i
        }
    }
}

// MARK: - PerformanceViewModel Identifiable (for fullScreenCover)

extension PerformanceViewModel: Identifiable {
    nonisolated var id: ObjectIdentifier { ObjectIdentifier(self) }
}

// MARK: - Song Picker

private struct SongPickerSheet: View {

    let allSongs: [Song]
    let onSelect: (Song) -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List(allSongs) { song in
                Button {
                    onSelect(song)
                    dismiss()
                } label: {
                    VStack(alignment: .leading) {
                        Text(song.title).font(.headline)
                        Text("\(Int(song.bpm)) BPM · \(song.timeSignature.rawValue)")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .navigationTitle("Choose a Song")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
            }
            .overlay {
                if allSongs.isEmpty {
                    ContentUnavailableView(
                        "No Songs Yet",
                        systemImage: "music.note",
                        description: Text("Create a song first from the Song Editor.")
                    )
                }
            }
        }
    }
}
