import CoreMIDI
import Observation

@Observable
final class MIDIManager {

    private(set) var connectedDevices: [String] = []
    private(set) var isLearning = false
    private(set) var lastReceivedCC: UInt8?

    var onAction: ((MIDIAction) -> Void)?

    private var client = MIDIClientRef()
    private var inputPort = MIDIPortRef()
    private var mappings: [UInt8: MIDIAction] = [
        64: .nextSection,
        65: .previousSection,
        66: .playStop,
    ]
    private var learningAction: MIDIAction?

    // MARK: - Setup

    func start() {
        let status = MIDIClientCreateWithBlock("FolkBeat" as CFString, &client) { [weak self] notification in
            self?.handleMIDINotification(notification)
        }
        guard status == noErr else {
            print("[MIDIManager] client creation failed: \(status)")
            return
        }

        let readBlock: MIDIReadBlock = { [weak self] packetList, _ in
            self?.handlePacketList(packetList)
        }

        MIDIInputPortCreateWithBlock(client, "Input" as CFString, &inputPort, readBlock)
        connectAllSources()
        refreshDeviceList()
    }

    func stop() {
        MIDIPortDispose(inputPort)
        MIDIClientDispose(client)
    }

    // MARK: - MIDI Learn

    func startLearning(for action: MIDIAction) {
        learningAction = action
        isLearning = true
        lastReceivedCC = nil
    }

    func cancelLearning() {
        learningAction = nil
        isLearning = false
    }

    func applyMappings(_ newMappings: [MIDIMapping]) {
        mappings.removeAll()
        for m in newMappings {
            mappings[UInt8(m.ccNumber)] = m.action
        }
    }

    func currentCC(for action: MIDIAction) -> UInt8 {
        mappings.first(where: { $0.value == action })?.key ?? action.defaultCC
    }

    // MARK: - Internal

    private func connectAllSources() {
        let sourceCount = MIDIGetNumberOfSources()
        for i in 0..<sourceCount {
            let source = MIDIGetSource(i)
            MIDIPortConnectSource(inputPort, source, nil)
        }
    }

    private func refreshDeviceList() {
        var names: [String] = []
        let sourceCount = MIDIGetNumberOfSources()
        for i in 0..<sourceCount {
            let endpoint = MIDIGetSource(i)
            var cfName: Unmanaged<CFString>?
            MIDIObjectGetStringProperty(endpoint, kMIDIPropertyDisplayName, &cfName)
            if let name = cfName?.takeRetainedValue() as String? {
                names.append(name)
            }
        }
        connectedDevices = names
    }

    private func handleMIDINotification(_ notification: UnsafePointer<MIDINotification>) {
        guard notification.pointee.messageID == .msgSetupChanged else { return }
        connectAllSources()
        refreshDeviceList()
    }

    private func handlePacketList(_ packetList: UnsafePointer<MIDIPacketList>) {
        var packet = packetList.pointee.packet
        for _ in 0..<packetList.pointee.numPackets {
            let bytes = Mirror(reflecting: packet.data).children.map { $0.value as! UInt8 }
            let status = bytes[0] & 0xF0

            // CC message: status 0xB0
            if status == 0xB0 && packet.length >= 3 {
                let cc = bytes[1]
                let value = bytes[2]

                if value > 0 {
                    DispatchQueue.main.async { [weak self] in
                        self?.handleCC(cc)
                    }
                }
            }

            // Note-On: status 0x90 — some pedals send note messages
            if status == 0x90 && packet.length >= 3 {
                let note = bytes[1]
                let velocity = bytes[2]
                if velocity > 0 {
                    DispatchQueue.main.async { [weak self] in
                        self?.handleCC(note)
                    }
                }
            }

            packet = MIDIPacketNext(&packet).pointee
        }
    }

    private func handleCC(_ cc: UInt8) {
        lastReceivedCC = cc

        if isLearning, let action = learningAction {
            // Remove old mapping for this action
            mappings = mappings.filter { $0.value != action }
            mappings[cc] = action
            learningAction = nil
            isLearning = false
            return
        }

        if let action = mappings[cc] {
            onAction?(action)
        }
    }
}
