import SwiftUI

struct SectionButton: View {

    let title: String
    let patternName: String
    let isActive: Bool
    let isQueued: Bool
    let currentStep: Int
    let stepsPerMeasure: Int
    let action: () -> Void

    @State private var pulseScale: CGFloat = 1.0

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                Text(title)
                    .font(.system(size: 32, weight: .heavy, design: .rounded))
                    .foregroundStyle(.white)

                Text(patternName)
                    .font(.caption)
                    .foregroundStyle(.white.opacity(0.6))

                if isActive {
                    stepIndicator
                }

                if isQueued {
                    Text("QUEUED")
                        .font(.caption2.bold())
                        .foregroundStyle(.yellow)
                }
            }
            .frame(maxWidth: .infinity, minHeight: 100)
            .padding(.vertical, 12)
            .background(backgroundColor, in: RoundedRectangle(cornerRadius: 16))
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .strokeBorder(borderColor, lineWidth: isActive ? 3 : 1)
            )
        }
        .scaleEffect(isQueued ? pulseScale : 1.0)
        .animation(
            isQueued
                ? .easeInOut(duration: 0.5).repeatForever(autoreverses: true)
                : .default,
            value: isQueued
        )
        .onChange(of: isQueued) { _, queued in
            pulseScale = queued ? 1.05 : 1.0
        }
    }

    private var backgroundColor: Color {
        if isActive { return Color.blue.opacity(0.35) }
        if isQueued  { return Color.yellow.opacity(0.15) }
        return Color(white: 0.12)
    }

    private var borderColor: Color {
        if isActive { return .blue }
        if isQueued  { return .yellow }
        return Color(white: 0.25)
    }

    private var stepIndicator: some View {
        HStack(spacing: 2) {
            ForEach(0..<stepsPerMeasure, id: \.self) { step in
                RoundedRectangle(cornerRadius: 1)
                    .fill(step == currentStep ? Color.white : Color.white.opacity(0.15))
                    .frame(height: 4)
            }
        }
        .padding(.horizontal, 8)
    }
}
