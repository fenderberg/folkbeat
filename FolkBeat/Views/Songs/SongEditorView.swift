import SwiftUI
import SwiftData

struct SongEditorView: View {

    @Bindable var song: Song
    @Environment(\.modelContext) private var context
    @State private var showingAddSection = false
    @State private var newSectionName = ""

    var body: some View {
        Form {
            Section("Song Info") {
                TextField("Title", text: $song.title)

                HStack {
                    Text("BPM")
                    Spacer()
                    TextField("BPM", value: $song.bpm, format: .number)
                        .keyboardType(.numberPad)
                        .multilineTextAlignment(.trailing)
                        .frame(width: 80)
                }

                Picker("Time Signature", selection: $song.timeSignature) {
                    ForEach(TimeSignature.allCases) { ts in
                        Text(ts.rawValue).tag(ts)
                    }
                }
            }

            Section("Sections") {
                ForEach(song.sortedSections) { section in
                    SectionRow(section: section, timeSignature: song.timeSignature)
                }
                .onDelete(perform: deleteSections)
                .onMove(perform: moveSections)

                Button("Add Section") { showingAddSection = true }
            }
        }
        .navigationTitle("Edit Song")
        .toolbar {
            ToolbarItem(placement: .primaryAction) {
                EditButton()
            }
        }
        .alert("New Section", isPresented: $showingAddSection) {
            TextField("Name", text: $newSectionName)
            Button("Add") { addSection() }
            Button("Cancel", role: .cancel) { newSectionName = "" }
        }
    }

    private func addSection() {
        guard !newSectionName.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        let defaultPattern = PatternLibrary.patterns(for: song.timeSignature).first?.id ?? "country_4_4"
        let section = SongSection(
            name: newSectionName,
            patternId: defaultPattern,
            order: song.sections.count
        )
        song.sections.append(section)
        newSectionName = ""
    }

    private func deleteSections(at offsets: IndexSet) {
        let sorted = song.sortedSections
        for index in offsets {
            context.delete(sorted[index])
        }
        reorder()
    }

    private func moveSections(from source: IndexSet, to destination: Int) {
        var sorted = song.sortedSections
        sorted.move(fromOffsets: source, toOffset: destination)
        for (i, section) in sorted.enumerated() {
            section.order = i
        }
    }

    private func reorder() {
        for (i, section) in song.sortedSections.enumerated() {
            section.order = i
        }
    }
}

// MARK: - Section Row

private struct SectionRow: View {

    @Bindable var section: SongSection
    let timeSignature: TimeSignature

    private var availablePatterns: [DrumPattern] {
        PatternLibrary.patterns(for: timeSignature)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            TextField("Name", text: $section.name)
                .font(.headline)

            HStack {
                Picker("Pattern", selection: $section.patternId) {
                    ForEach(availablePatterns) { pattern in
                        Text(pattern.displayName).tag(pattern.id)
                    }
                    // Also show all patterns as fallback
                    if availablePatterns.isEmpty {
                        ForEach(PatternLibrary.all) { pattern in
                            Text(pattern.displayName).tag(pattern.id)
                        }
                    }
                }
                .labelsHidden()

                Spacer()

                HStack(spacing: 4) {
                    Text("Bars:")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    TextField("0=loop", value: $section.bars, format: .number)
                        .keyboardType(.numberPad)
                        .frame(width: 50)
                        .multilineTextAlignment(.trailing)
                }
            }

            HStack {
                Text("Volume")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                Slider(value: $section.volume, in: 0...1)
            }
        }
        .padding(.vertical, 4)
    }
}
