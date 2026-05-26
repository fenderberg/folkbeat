import SwiftUI

struct BPMControlView: View {

    @Bindable var vm: PerformanceViewModel

    var body: some View {
        HStack(spacing: 10) {
            bpmButton("-5") { vm.adjustBPM(by: -5) }
            bpmButton("-1") { vm.adjustBPM(by: -1) }

            VStack(spacing: 0) {
                Text("\(Int(vm.bpm))")
                    .font(.system(size: 36, weight: .bold, design: .monospaced))
                    .foregroundStyle(.white)
                Text("BPM")
                    .font(.caption2)
                    .foregroundStyle(.gray)
            }
            .frame(minWidth: 80)

            bpmButton("+1") { vm.adjustBPM(by: 1) }
            bpmButton("+5") { vm.adjustBPM(by: 5) }

            Button(action: { vm.tapTempo() }) {
                Text("TAP")
                    .font(.headline.bold())
                    .foregroundStyle(.white)
                    .frame(width: 60, height: 44)
                    .background(Color.purple.opacity(0.7), in: RoundedRectangle(cornerRadius: 8))
            }
        }
    }

    private func bpmButton(_ label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(label)
                .font(.system(.body, design: .monospaced).bold())
                .foregroundStyle(.white)
                .frame(width: 44, height: 44)
                .background(Color(white: 0.2), in: RoundedRectangle(cornerRadius: 8))
        }
    }
}
