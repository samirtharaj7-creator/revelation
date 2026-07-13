#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const expectedVerseCounts = [
  0,
  20,
  29,
  22,
  11,
  14,
  17,
  17,
  13,
  21,
  11,
  19,
  17,
  18,
  20,
  8,
  21,
  18,
  24,
  21,
  15,
  27,
  21,
];

const visibleHtmlFiles = [
  "index.html",
  "introduction/index.html",
  "articles/index.html",
  "timeline/index.html",
  ...Array.from({ length: 22 }, (_, index) => `revelation/${index + 1}/index.html`),
];

const sourceLeakPattern =
  /\b(Ellen(?: G\.)? White|Maxwell|Stefanovic|Doukhan|Beale|Osborne|Amazing Facts|God Cares|Frazee|Bohr|Cox|sourceId|sourceAudit)\b/i;

const forbiddenNotePatterns = [
  {
    pattern: /\bSunday sacredness\b/i,
    message: "Avoid wording that treats Revelation as establishing Sunday sacredness.",
  },
  {
    pattern: /\b(?:Sunday-keepers?|sincere believers?|present believers?) (?:already|now) (?:have|receive|bear) the mark\b/i,
    message: "The mark warning must be tied to the final public crisis of light and coercion.",
  },
  {
    pattern: /\bimmortal soul\b/i,
    message: "Avoid immortal-soul language in the notes.",
  },
  {
    pattern: /\beternal conscious torment\b/i,
    message: "Avoid eternal-conscious-torment language; Revelation 20 defines the lake of fire as second death.",
  },
  {
    pattern: /\bsecret rapture\b/i,
    message: "Avoid secret-rapture framing; Revelation presents Christ's return as visible and public.",
  },
];

const requiredAnchors = [
  {
    ref: "Revelation 1:10",
    terms: [/seventh-day Sabbath/i, /Lord of the Sabbath/i, /Creator worship/i],
    note: "Lord's day should be handled as the seventh-day Sabbath, not Sunday sacredness.",
  },
  {
    ref: "Revelation 6:9",
    terms: [/sanctuary language/i, /not .*disembodied existence/i],
    note: "Souls under the altar should be sanctuary/martyr imagery, not disembodied soul doctrine.",
  },
  {
    ref: "Revelation 6:11",
    terms: [/death as sleep/i, /does not teach .*conscious/i],
    note: "The martyrs' rest should preserve the biblical sleep-of-death reading.",
  },
  {
    ref: "Revelation 7:3",
    terms: [/Sabbath/i, /Creator/i, /forehead/i, /not imposed by fear|willing loyalty|intelligent loyalty/i],
    note: "The seal of God should connect ownership, worship, Sabbath, and settled allegiance.",
  },
  {
    ref: "Revelation 12:17",
    terms: [/remnant/i, /commandments of God/i, /testimony of Jesus/i],
    note: "The remnant note should preserve commandment keeping and the testimony of Jesus.",
  },
  {
    ref: "Revelation 13:11",
    terms: [/United States/i, /religious liberty/i, /dragon/i],
    note: "The earth beast should be identified with the United States while preserving religious-liberty nuance.",
  },
  {
    ref: "Revelation 13:16",
    terms: [
      /enforced Sunday observance/i,
      /seventh-day Sabbath/i,
      /does not mean every present Sunday-keeper has the mark/i,
      /future, public, enlightened allegiance crisis/i,
    ],
    note: "The mark of the beast note should be clear, future-facing, and fair to sincere believers.",
  },
  {
    ref: "Revelation 14:6",
    terms: [/everlasting gospel/i, /warning|message/i],
    note: "The three angels' messages should stay rooted in the everlasting gospel.",
  },
  {
    ref: "Revelation 14:7",
    terms: [/judgment/i, /1844/i, /Sabbath commandment/i, /Creator worship/i],
    note: "The first angel should include judgment-hour, sanctuary, Sabbath, and Creator-worship anchors.",
  },
  {
    ref: "Revelation 14:12",
    terms: [/commandments of God/i, /faith of Jesus/i, /Sabbath/i],
    note: "The patience of the saints should join commandment keeping, Sabbath allegiance, and faith of Jesus.",
  },
  {
    ref: "Revelation 14:13",
    terms: [/die in the Lord/i, /resurrection/i, /rest/i],
    note: "The blessed dead should be framed through rest and resurrection hope.",
  },
  {
    ref: "Revelation 18:4",
    terms: [/come out/i, /Babylon/i, /people/i],
    note: "Babylon should be handled as a call out of false worship, not contempt for people.",
  },
  {
    ref: "Revelation 20:5",
    terms: [/two resurrections/i, /rest of the dead remain dead/i],
    note: "The millennium sequence should preserve the two-resurrection structure.",
  },
  {
    ref: "Revelation 20:10",
    terms: [/second death/i, /not presented as Satan's kingdom/i, /does not preserve sin forever/i],
    note: "The lake of fire should be final destruction, not Satan's kingdom or eternal preservation of sin.",
  },
  {
    ref: "Revelation 20:14",
    terms: [/second death/i, /not the eternal preservation/i, /God's justice ends evil/i],
    note: "The second death should govern the final-fire interpretation.",
  },
];

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function chapterPayloadPath(chapterNumber) {
  return `revelation/${chapterNumber}/__next.revelation.$d$chapter.__PAGE__.txt`;
}

function extractTextChunks(payload) {
  const chunks = new Map();
  const headerPattern = /([0-9a-z]+):T([0-9a-f]+),/g;
  let match;

  while ((match = headerPattern.exec(payload))) {
    const [, id, hexLength] = match;
    const length = Number.parseInt(hexLength, 16);
    const start = headerPattern.lastIndex;
    const value = payload.slice(start, start + length);
    chunks.set(id, value);
    headerPattern.lastIndex = start + length;
  }

  return chunks;
}

function extractJsonObjectAt(payload, index) {
  const start = payload.lastIndexOf("{", index);
  if (start === -1) {
    throw new Error(`Could not find JSON object before index ${index}`);
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < payload.length; i += 1) {
    const character = payload[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
    } else if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return payload.slice(start, i + 1);
      }
    }
  }

  throw new Error(`Could not close JSON object beginning at index ${start}`);
}

function resolveRscText(value, chunks) {
  if (typeof value === "string" && value.startsWith("$")) {
    return chunks.get(value.slice(1)) ?? value;
  }
  return typeof value === "string" ? value : "";
}

function extractChapter(chapterNumber) {
  const payload = readProjectFile(chapterPayloadPath(chapterNumber));
  const chunks = extractTextChunks(payload);
  const versePattern = new RegExp(`"verse":"Revelation ${chapterNumber}:([0-9]+)"`, "g");
  const verses = new Map();
  let match;

  while ((match = versePattern.exec(payload))) {
    const verseNumber = Number.parseInt(match[1], 10);
    if (verses.has(verseNumber)) continue;

    const objectText = extractJsonObjectAt(payload, match.index);
    const object = JSON.parse(objectText);
    verses.set(verseNumber, object);
  }

  return { payload, chunks, verses };
}

function publicNoteText(verse, chunks) {
  const fields = [
    verse.explanation,
    verse.historicalBackground,
    verse.symbolicMeaning,
    verse.adventistInsight,
    verse.propheticSignificance,
    verse.danielConnection,
    verse.application,
    verse.commentary?.detailedExplanation,
    verse.commentary?.exegesis,
    verse.commentary?.historicalBackground,
    verse.commentary?.technicalNotes,
  ];

  for (const wordNote of verse.wordNotes ?? []) {
    fields.push(wordNote.term, wordNote.meaning, wordNote.note);
  }

  return fields.map((field) => resolveRscText(field, chunks)).filter(Boolean).join("\n\n");
}

function stripVisibleHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[#a-z0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findVerse(allChapters, ref) {
  const match = ref.match(/^Revelation ([0-9]+):([0-9]+)$/);
  if (!match) throw new Error(`Unsupported reference: ${ref}`);
  const chapter = allChapters.get(Number.parseInt(match[1], 10));
  const verse = chapter?.verses.get(Number.parseInt(match[2], 10));
  if (!chapter || !verse) {
    throw new Error(`Missing verse payload for ${ref}`);
  }
  return { chapter, verse };
}

function addIssue(issues, label, detail) {
  issues.push({ label, detail });
}

const issues = [];
const allChapters = new Map();
let totalVerses = 0;
let totalVerified = 0;

for (let chapterNumber = 1; chapterNumber <= 22; chapterNumber += 1) {
  const chapter = extractChapter(chapterNumber);
  allChapters.set(chapterNumber, chapter);

  const expectedCount = expectedVerseCounts[chapterNumber];
  const actualCount = chapter.verses.size;
  if (actualCount !== expectedCount) {
    addIssue(issues, "verse-count", `Revelation ${chapterNumber} has ${actualCount} verses; expected ${expectedCount}.`);
  }

  totalVerses += actualCount;

  for (const [verseNumber, verse] of chapter.verses) {
    if (verse.reviewStatus !== "verified-seed") {
      addIssue(
        issues,
        "review-status",
        `Revelation ${chapterNumber}:${verseNumber} has reviewStatus=${JSON.stringify(verse.reviewStatus)}.`,
      );
    } else {
      totalVerified += 1;
    }

    const text = publicNoteText(verse, chapter.chunks);
    for (const { pattern, message } of forbiddenNotePatterns) {
      if (pattern.test(text)) {
        addIssue(issues, "forbidden-note-language", `${verse.verse}: ${message}`);
      }
    }
  }
}

if (totalVerses !== 404) {
  addIssue(issues, "total-verse-count", `Found ${totalVerses} Revelation notes; expected 404.`);
}

if (totalVerified !== 404) {
  addIssue(issues, "total-review-status", `Found ${totalVerified} verified-seed notes; expected 404.`);
}

for (const { ref, terms, note } of requiredAnchors) {
  const { chapter, verse } = findVerse(allChapters, ref);
  const text = publicNoteText(verse, chapter.chunks);
  const missingTerms = terms.filter((term) => !term.test(text));
  if (missingTerms.length > 0) {
    addIssue(issues, "required-anchor", `${ref}: ${note} Missing ${missingTerms.map(String).join(", ")}.`);
  }
}

for (const relativePath of visibleHtmlFiles) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!fs.existsSync(absolutePath)) continue;

  const visibleText = stripVisibleHtml(fs.readFileSync(absolutePath, "utf8"));
  const match = visibleText.match(sourceLeakPattern);
  if (match) {
    addIssue(issues, "visible-source-leak", `${relativePath} contains visible source/source-audit text: ${match[0]}.`);
  }
}

if (issues.length > 0) {
  console.error("Revelation theology validation failed:");
  for (const issue of issues) {
    console.error(`- [${issue.label}] ${issue.detail}`);
  }
  process.exitCode = 1;
} else {
  console.log("Revelation theology validation passed.");
  console.log(`- ${totalVerses} verse notes found.`);
  console.log(`- ${totalVerified} verse notes marked verified-seed.`);
  console.log("- Required Adventist theological anchors are present.");
  console.log("- No forbidden theological phrases found in public note prose.");
  console.log("- No source/source-audit names found in visible rendered HTML text.");
}
