# Revelation Theological Pass

Date: 2026-07-12

## Scope

This pass adapts the Corinthians theological-review workflow to the Revelation static export. It covers all 404 verse-level study notes across Revelation 1-22.

## Reader-Facing Rules

- Keep note prose Scripture-first and citation-free.
- Do not display source names, source IDs, or source-audit language in rendered reader copy.
- Preserve KJV text, chapter outlines, navigation, and visual layout.
- Keep Adventist doctrinal language clear without turning people into targets.

## Doctrinal Controls

- Revelation 1:10 handles the Lord's day as the seventh-day Sabbath and does not use the verse to support Sunday sacredness.
- Revelation 6:9-11 treats the souls under the altar as sanctuary martyr imagery, not as proof of disembodied conscious existence after death.
- Revelation 7 keeps the seal of God tied to ownership, character, worship, the Sabbath sign, and settled allegiance.
- Revelation 12 keeps the Great Controversy, commandment keeping, remnant, and testimony of Jesus framework intact.
- Revelation 13 identifies the sea beast, earth beast, image, mark, and coercive final worship crisis with care.
- Revelation 13:16 keeps the mark of the beast future-facing and explicitly avoids labeling sincere present Sunday keepers as already marked.
- Revelation 14 keeps the three angels' messages rooted in the everlasting gospel, judgment hour, Creator worship, Sabbath, and the faith of Jesus.
- Revelation 17-18 treats Babylon as a false worship system from which God calls His people, not as contempt for individuals.
- Revelation 20 keeps the visible return, millennium, judgment review, two resurrections, second death, and final destruction of sin clear.
- Revelation 21-22 keeps the New Jerusalem and new earth hope Christ-centered and non-speculative.

## Validation Command

Run:

```sh
node scripts/validate-revelation-theology.mjs
```

The validator checks:

- All 404 Revelation verse notes are present.
- All 404 notes are marked `verified-seed`.
- Required Adventist theological anchors are present in key passages.
- Forbidden theological phrases are absent from public note prose.
- Source/source-audit names are absent from visible rendered HTML text after script/style stripping.

## Current Status

The generated Revelation payload already contains all 404 verse notes, and all are marked `verified-seed`. The validator now makes this review repeatable so future content or export changes can be checked without relying on memory.
