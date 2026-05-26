import SwiftUI
import SwiftData

struct PerformanceView: View {

    @Bindable var vm: PerformanceViewModel
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()

            VStack(spacing: 0) {
                topBar
                Divider().background(Color.gray)
                sectionGrid
                    .padding(.horizontal, 20)
                    .padding(.vertical, 12)
                Spacer(minLength: 0)
                transportBar
            }
        }
        .statusBarHidden()
        .gesture(swipeGesture)
    }

    // MARK: - Top Bar

    private var topBar: some View {
        HStack {
            Button { dismiss() } label: {
                Image(systemName: "chevron.left")
                    .font(.title2.bold())
            }
            .foregroundStyle(.white)
            .padding(.leading, 16)

            VStack(alignment: .leading, spacing: 2) {
                Text(vm.song?.title ?? "No Song")
                    .font(.title2.bold())
                    .foregroundStyle(.white)

                if let setlist = vm.setlist {
                    Text("\(setlist.name) — Song \(vm.currentSongIndex + 1) / \(vm.songCount)")
                        .font(.caption)
                        .foregroundStyle(.gray)
                }
            }

            Spacer()

            BPMControlView(vm: vm)
        }
        .padding(.vertical, 10)
        .padding(.trailing, 16)
    }

    // MARK: - Section Buttons

    private var sectionGrid: some View {
        let columns = [
            GridItem(.adaptive(minimum: 200, maximum: 400), spacing: 12)
        ]

        return ScrollView {
            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(Array(vm.sections.enumerated()), id: \.offset) { index, section in
                    SectionButton(
                        title: section.name,
                        patternName: section.pattern?.displayName ?? section.patternId,
                        isActive: index == vm.currentSectionIndex && vm.isPlaying,
                        isQueued: index == vm.queuedSectionIndex,
                        currentStep: vm.currentStep,
                        stepsPerMeasure: section.pattern?.stepsPerMeasure ?? 16
                    ) {
                        vm.selectSection(index)
                    }
                }
            }
        }
    }

    // MARK: - Transport Bar

    private var transportBar: some View {
        HStack(spacing: 24) {
            transportButton("stop.fill", "STOP", .red) {
                vm.stop()
            }

            transportButton(
                vm.isPlaying ? "pause.fill" : "play.fill",
                vm.isPlaying ? "PAUSE" : "PLAY",
                .green
            ) {
                vm.togglePlayStop()
            }

            transportButton("forward.fill", "NEXT >>", .orange) {
                vm.advanceToNextSection()
            }
        }
        .padding(.vertical, 16)
        .padding(.horizontal, 24)
        .background(Color(white: 0.08))
    }

    private func transportButton(
        _ icon: String,
        _ label: String,
        _ color: Color,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            HStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title)
                Text(label)
                    .font(.title3.bold())
            }
            .foregroundStyle(.white)
            .frame(minWidth: 140, minHeight: 60)
            .background(color.opacity(0.8), in: RoundedRectangle(cornerRadius: 12))
        }
    }

    // MARK: - Swipe

    private var swipeGesture: some Gesture {
        DragGesture(minimumDistance: 80, coordinateSpace: .local)
            .onEnded { value in
                if value.translation.width < -80 {
                    vm.nextSong()
                } else if value.translation.width > 80 {
                    vm.previousSong()
                }
            }
    }
}
