import Foundation

enum PatternLibrary {

    static let all: [DrumPattern] = [
        country44, brushBallad, shuffle, waltz34, halfTime, build
    ]

    static func pattern(named id: String) -> DrumPattern? {
        all.first { $0.id == id }
    }

    static func patterns(for ts: TimeSignature) -> [DrumPattern] {
        all.filter { $0.timeSignature == ts }
    }

    // MARK: - Step helpers

    private static func steps(_ indices: Int..., count: Int = 16) -> [Bool] {
        (0..<count).map { indices.contains($0) }
    }

    // MARK: - 4/4 Patterns

    /// Kick 1+3, snare 2+4, closed hats on 8ths.
    static let country44 = DrumPattern(
        id: "country_4_4",
        displayName: "Country 4/4",
        timeSignature: .fourFour,
        grid: [
            .kick:        steps(0, 8),
            .snare:       steps(4, 12),
            .hihatClosed: steps(0, 2, 4, 6, 8, 10, 12, 14),
        ],
        swing: 0
    )

    /// Brush swirl loop, soft kick 1+3, rim on 2+4.
    static let brushBallad = DrumPattern(
        id: "brush_ballad",
        displayName: "Brush Ballad",
        timeSignature: .fourFour,
        grid: [
            .kick:       steps(0, 8),
            .rim:        steps(4, 12),
            .brushSwirl: steps(0, 2, 4, 6, 8, 10, 12, 14),
        ],
        swing: 0
    )

    /// Swing 8th-note feel, kick 1+3, snare 2+4.
    static let shuffle = DrumPattern(
        id: "shuffle",
        displayName: "Shuffle",
        timeSignature: .fourFour,
        grid: [
            .kick:        steps(0, 8),
            .snare:       steps(4, 12),
            .hihatClosed: steps(0, 2, 4, 6, 8, 10, 12, 14),
        ],
        swing: 0.55
    )

    /// Kick on 1, snare on 3, open hats on 2+4.
    static let halfTime = DrumPattern(
        id: "half_time",
        displayName: "Half Time",
        timeSignature: .fourFour,
        grid: [
            .kick:     steps(0),
            .snare:    steps(8),
            .hihatOpen: steps(4, 12),
        ],
        swing: 0
    )

    /// Country 4/4 with crash on beat 1.
    static let build = DrumPattern(
        id: "build",
        displayName: "Build",
        timeSignature: .fourFour,
        grid: [
            .kick:        steps(0, 8),
            .snare:       steps(4, 12),
            .hihatClosed: steps(0, 2, 4, 6, 8, 10, 12, 14),
            .crash:       steps(0),
        ],
        swing: 0
    )

    // MARK: - 3/4 Patterns

    /// Kick on 1, snare on 2+3.
    static let waltz34 = DrumPattern(
        id: "waltz_3_4",
        displayName: "Waltz 3/4",
        timeSignature: .threeFour,
        grid: [
            .kick:        steps(0, count: 12),
            .snare:       steps(4, 8, count: 12),
            .hihatClosed: steps(0, 2, 4, 6, 8, 10, count: 12),
        ],
        swing: 0
    )
}
