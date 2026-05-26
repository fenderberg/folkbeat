import SwiftUI
import SwiftData

struct SetlistListView: View {

    @Environment(\.modelContext) private var context
    @Query(sort: \Setlist.createdAt, order: .reverse) private var setlists: [Setlist]
    @State private var showingNewSetlist = false
    @State private var newName = ""

    var body: some View {
        List {
            ForEach(setlists) { setlist in
                NavigationLink(value: setlist) {
                    VStack(alignment: .leading) {
                        Text(setlist.name)
                            .font(.headline)
                        Text("\(setlist.entries.count) songs")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .onDelete(perform: deleteSetlists)
        }
        .navigationTitle("Setlists")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                Button { showingNewSetlist = true } label: {
                    Image(systemName: "plus")
                }
            }
        }
        .alert("New Setlist", isPresented: $showingNewSetlist) {
            TextField("Name", text: $newName)
            Button("Create") { createSetlist() }
            Button("Cancel", role: .cancel) { newName = "" }
        }
        .overlay {
            if setlists.isEmpty {
                ContentUnavailableView(
                    "No Setlists",
                    systemImage: "music.note.list",
                    description: Text("Tap + to create your first setlist.")
                )
            }
        }
    }

    private func createSetlist() {
        guard !newName.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let setlist = Setlist(name: newName)
        context.insert(setlist)
        newName = ""
    }

    private func deleteSetlists(at offsets: IndexSet) {
        for index in offsets {
            context.delete(setlists[index])
        }
    }
}
