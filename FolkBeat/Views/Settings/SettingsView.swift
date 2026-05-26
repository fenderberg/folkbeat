import SwiftUI
import SwiftData
import CoreAudioTypes

struct SettingsView: View {

    @Environment(\.modelContext) private var context
    @Query private var mappings: [MIDIMapping]
    @State private var midiManager: MIDIManager?

    var body: some View {
        Form {
            Section("MIDI Devices") {
                if let manager = midiManager {
                    if manager.connectedDevices.isEmpty {
                        Text("No MIDI devices connected")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(manager.connectedDevices, id: \.self) { name in
                            Label(name, systemImage: "pianokeys")
                        }
                    }

                    Button("Open Bluetooth MIDI") {
                        openBluetoothMIDI()
                    }
                } else {
                    Text("MIDI not initialized")
                        .foregroundStyle(.secondary)
                }
            }

            Section("MIDI Mapping") {
                ForEach(MIDIAction.allCases) { action in
                    MIDIMappingRow(
                        action: action,
                        currentCC: currentCC(for: action),
                        isLearning: midiManager?.isLearning == true,
                        onLearn: { midiManager?.startLearning(for: action) }
                    )
                }
            }

            Section("Audio") {
                HStack {
                    Text("Sample Rate")
                    Spacer()
                    Text("44,100 Hz")
                        .foregroundStyle(.secondary)
                }
                HStack {
                    Text("Buffer Size")
                    Spacer()
                    Text("256 frames")
                        .foregroundStyle(.secondary)
                }
            }

            Section("About") {
                HStack {
                    Text("FolkBeat")
                    Spacer()
                    Text("1.0")
                        .foregroundStyle(.secondary)
                }
                Text("A live performance drum companion for folk & Americana bands.")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle("Settings")
        .onAppear { ensureDefaultMappings() }
    }

    private func currentCC(for action: MIDIAction) -> Int {
        mappings.first(where: { $0.action == action })?.ccNumber ?? Int(action.defaultCC)
    }

    private func ensureDefaultMappings() {
        guard mappings.isEmpty else { return }
        for action in MIDIAction.allCases {
            context.insert(MIDIMapping(action: action))
        }
    }

    private func openBluetoothMIDI() {
        // CABTMIDICentralViewController must be presented via UIKit.
        // Wrapped in a UIViewControllerRepresentable for production use.
        // Placeholder for now — the MIDI manager already connects wired/USB devices.
    }
}

// MARK: - MIDI Mapping Row

private struct MIDIMappingRow: View {

    let action: MIDIAction
    let currentCC: Int
    let isLearning: Bool
    let onLearn: () -> Void

    var body: some View {
        HStack {
            Text(action.displayName)
            Spacer()
            Text("CC \(currentCC)")
                .foregroundStyle(.secondary)
                .monospacedDigit()
            Button(isLearning ? "Listening..." : "Learn") {
                onLearn()
            }
            .buttonStyle(.bordered)
            .tint(isLearning ? .orange : .blue)
        }
    }
}

// MARK: - Setter for external MIDI manager reference

extension SettingsView {
    func withMIDIManager(_ manager: MIDIManager) -> SettingsView {
        var view = self
        view._midiManager = State(initialValue: manager)
        return view
    }
}
