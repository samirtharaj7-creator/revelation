#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportPath = path.join(rootDir, "content-audits", "revelation-humanization-audit.md");

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

const stockPhrases = [
  { label: "This verse", pattern: /\bThis verse\b/gi },
  { label: "This verse also", pattern: /\bThis verse also\b/gi },
  { label: "This does not mean", pattern: /\bThis does not mean\b/gi },
  { label: "The issue is not", pattern: /\bThe issue is not\b/gi },
  { label: "At the same time", pattern: /\bAt the same time\b/gi },
  { label: "For the reader", pattern: /\bFor the reader\b/gi },
  { label: "protects the church", pattern: /\bprotects the church\b/gi },
  { label: "study terms", pattern: /\bstudy terms\b/gi },
  { label: "serves the chapter's larger movement", pattern: /\bserves the chapter's larger movement\b/gi },
  { label: "presses the reader", pattern: /\bpresses the reader\b/gi },
  { label: "not X but Y", pattern: /\bnot\b[^.!?;:]{0,120}\bbut\b/gi },
];

const genericConclusionPatterns = [
  /\btherefore presses the reader\b/i,
  /\bshould shape the way\b/i,
  /\bcalled to (?:trust|endure|worship|follow|remain faithful)\b/i,
  /\bthe church (?:must|should|is called to)\b/i,
  /\bnot merely .* but\b/i,
];

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "but",
  "by",
  "for",
  "from",
  "has",
  "have",
  "he",
  "his",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "them",
  "this",
  "to",
  "was",
  "with",
]);

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
    chunks.set(id, payload.slice(start, start + length));
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
  const verses = [];
  const seen = new Set();
  let match;

  while ((match = versePattern.exec(payload))) {
    const verseNumber = Number.parseInt(match[1], 10);
    if (seen.has(verseNumber)) continue;
    seen.add(verseNumber);

    const objectText = extractJsonObjectAt(payload, match.index);
    verses.push(JSON.parse(objectText));
  }

  verses.sort((a, b) => Number(a.verse.split(":")[1]) - Number(b.verse.split(":")[1]));
  return { chunks, verses };
}

function normalizeSpace(text) {
  return text.replace(/\s+/g, " ").trim();
}

function words(text) {
  return normalizeSpace(text).match(/[A-Za-z0-9']+/g) ?? [];
}

function sentences(text) {
  return normalizeSpace(text)
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function paragraphCount(text) {
  return text.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean).length;
}

function firstSentence(text) {
  return sentences(text)[0] ?? "";
}

function lastSentence(text) {
  const allSentences = sentences(text);
  return allSentences.at(-1) ?? "";
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function normalizedSentence(sentence) {
  return normalizeSpace(sentence).toLowerCase().replace(/[^a-z0-9' ]/g, "");
}

function tokenSet(text) {
  const tokens = words(text.toLowerCase()).filter((word) => word.length > 2 && !stopWords.has(word));
  return new Set(tokens);
}

function jaccard(left, right) {
  const a = tokenSet(left);
  const b = tokenSet(right);
  if (a.size === 0 && b.size === 0) return 1;

  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection += 1;
  }

  return intersection / (a.size + b.size - intersection);
}

function classifyNote(note) {
  if (note.wordCount < 180 || note.wordCount > 700) return "full rewrite";
  if (note.stockPhraseCount >= 7 || note.notButCount >= 3 || note.openingIsStock || note.genericConclusion) {
    return "structural rewrite";
  }
  if (note.stockPhraseCount >= 3 || note.notButCount >= 1 || note.paragraphCount >= 6 || note.paragraphCount <= 1) {
    return "light cadence edit";
  }
  return "monitor";
}

function studyNoteText(verse, chunks) {
  return resolveRscText(verse.commentary?.detailedExplanation, chunks);
}

function analyze() {
  const notes = [];
  const chapterCounts = [];

  for (let chapterNumber = 1; chapterNumber <= 22; chapterNumber += 1) {
    const chapter = extractChapter(chapterNumber);
    chapterCounts.push({ chapterNumber, actual: chapter.verses.length, expected: expectedVerseCounts[chapterNumber] });

    for (const verse of chapter.verses) {
      const text = studyNoteText(verse, chapter.chunks);
      const allSentences = sentences(text);
      const first = firstSentence(text);
      const last = lastSentence(text);
      const stockPhraseHits = stockPhrases.map((entry) => ({
        ...entry,
        count: countMatches(text, entry.pattern),
      }));
      const stockPhraseCount = stockPhraseHits.reduce((sum, entry) => sum + entry.count, 0);
      const note = {
        ref: verse.verse,
        text,
        wordCount: words(text).length,
        sentenceCount: allSentences.length,
        paragraphCount: paragraphCount(text),
        firstSentence: first,
        lastSentence: last,
        openingIsStock: /^(This verse|Revelation \d+:\d+|John sees|John hears|The verse|The angel|The chapter)/i.test(first),
        genericConclusion: genericConclusionPatterns.some((pattern) => pattern.test(last)),
        stockPhraseHits,
        stockPhraseCount,
        notButCount: stockPhraseHits.find((entry) => entry.label === "not X but Y")?.count ?? 0,
      };
      note.classification = classifyNote(note);
      notes.push(note);
    }
  }

  const sentenceFrequency = new Map();
  for (const note of notes) {
    for (const sentence of sentences(note.text)) {
      const normalized = normalizedSentence(sentence);
      if (normalized.split(" ").length < 8) continue;
      const record = sentenceFrequency.get(normalized) ?? { sentence, refs: [] };
      record.refs.push(note.ref);
      sentenceFrequency.set(normalized, record);
    }
  }

  const adjacentSimilarity = [];
  for (let i = 0; i < notes.length - 1; i += 1) {
    const left = notes[i];
    const right = notes[i + 1];
    if (left.ref.split(":")[0] !== right.ref.split(":")[0]) continue;
    adjacentSimilarity.push({
      pair: `${left.ref} / ${right.ref}`,
      score: jaccard(left.text, right.text),
    });
  }

  adjacentSimilarity.sort((a, b) => b.score - a.score);

  const wordCounts = notes.map((note) => note.wordCount).sort((a, b) => a - b);
  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
  const stockTotals = stockPhrases.map((entry) => ({
    label: entry.label,
    count: notes.reduce((sum, note) => {
      const hit = note.stockPhraseHits.find((item) => item.label === entry.label);
      return sum + (hit?.count ?? 0);
    }, 0),
  }));

  const repeatedSentences = [...sentenceFrequency.values()]
    .filter((record) => record.refs.length > 1)
    .sort((a, b) => b.refs.length - a.refs.length || a.sentence.localeCompare(b.sentence));

  const classificationCounts = notes.reduce((counts, note) => {
    counts[note.classification] = (counts[note.classification] ?? 0) + 1;
    return counts;
  }, {});

  return {
    notes,
    chapterCounts,
    wordCounts,
    totalWords,
    averageWords: Math.round(totalWords / notes.length),
    minWords: wordCounts[0],
    maxWords: wordCounts.at(-1),
    in350To450: notes.filter((note) => note.wordCount >= 350 && note.wordCount <= 450).length,
    in390To410: notes.filter((note) => note.wordCount >= 390 && note.wordCount <= 410).length,
    paragraphDistribution: distribution(notes.map((note) => note.paragraphCount)),
    sentenceDistribution: distribution(notes.map((note) => note.sentenceCount)),
    stockTotals,
    repeatedSentences,
    adjacentSimilarity,
    classificationCounts,
    stockOpeners: notes.filter((note) => note.openingIsStock),
    genericConclusions: notes.filter((note) => note.genericConclusion),
  };
}

function distribution(values) {
  return values.reduce((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

function percent(count, total) {
  return `${((count / total) * 100).toFixed(1)}%`;
}

function top(items, count) {
  return items.slice(0, count);
}

function markdownTable(rows, headers) {
  const headerLine = `| ${headers.join(" | ")} |`;
  const dividerLine = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\n/g, " ")).join(" | ")} |`);
  return [headerLine, dividerLine, ...body].join("\n");
}

function renderReport(result) {
  const noteCount = result.notes.length;
  const classificationRows = Object.entries(result.classificationCounts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([label, count]) => [label, count, percent(count, noteCount)]);

  const phraseRows = result.stockTotals
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .map((entry) => [entry.label, entry.count]);

  const paragraphRows = Object.entries(result.paragraphDistribution)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([paragraphs, count]) => [paragraphs, count]);

  const sentenceRows = Object.entries(result.sentenceDistribution)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([sentencesInNote, count]) => [sentencesInNote, count]);

  const highestSimilarityRows = top(result.adjacentSimilarity, 20).map((item) => [
    item.pair,
    item.score.toFixed(3),
  ]);

  const repeatedSentenceRows = top(result.repeatedSentences, 20).map((record) => [
    record.refs.length,
    record.refs.slice(0, 6).join(", ") + (record.refs.length > 6 ? "..." : ""),
    record.sentence,
  ]);

  const priorityRows = result.notes
    .filter((note) => note.classification !== "monitor")
    .sort((a, b) => {
      const order = { "full rewrite": 0, "structural rewrite": 1, "light cadence edit": 2 };
      return order[a.classification] - order[b.classification] || b.stockPhraseCount - a.stockPhraseCount;
    })
    .slice(0, 40)
    .map((note) => [
      note.ref,
      note.classification,
      note.wordCount,
      note.paragraphCount,
      note.stockPhraseCount,
      note.firstSentence.slice(0, 120),
    ]);

  return `# Revelation Humanization Audit

Generated by \`scripts/audit-revelation-humanization.mjs\`.

## Corpus

- Notes audited: ${noteCount}
- Total study-note words: ${result.totalWords.toLocaleString("en-US")}
- Average words per note: ${result.averageWords}
- Shortest note: ${result.minWords} words
- Longest note: ${result.maxWords} words
- Notes in 350-450 word band: ${result.in350To450} (${percent(result.in350To450, noteCount)})
- Notes in 390-410 word band: ${result.in390To410} (${percent(result.in390To410, noteCount)})

## Editorial Classification

${markdownTable(classificationRows, ["Classification", "Count", "Share"])}

## Stock Phrase Counts

${markdownTable(phraseRows, ["Phrase", "Count"])}

## Paragraph Count Distribution

${markdownTable(paragraphRows, ["Paragraphs", "Notes"])}

## Sentence Count Distribution

${markdownTable(sentenceRows, ["Sentences", "Notes"])}

## Highest Adjacent Similarity

${markdownTable(highestSimilarityRows, ["Adjacent notes", "Similarity"])}

## Repeated Sentences

${repeatedSentenceRows.length > 0 ? markdownTable(repeatedSentenceRows, ["Repeats", "Sample refs", "Sentence"]) : "No exact repeated sentences found above the minimum length."}

## Priority Rewrite Queue

${markdownTable(priorityRows, ["Reference", "Classification", "Words", "Paragraphs", "Stock hits", "Opening"])}

## Recommended Pass Order

1. First pass: full rewrite items, especially notes outside 180-700 words.
2. Second pass: structural rewrites with stock openings, high disclaimer density, or repeated conclusion logic.
3. Third pass: adjacent pairs above 0.55 similarity.
4. Fourth pass: light cadence edits to vary sentence and paragraph rhythm.
5. Final pass: run this audit and \`scripts/validate-revelation-theology.mjs\` together.
`;
}

const result = analyze();
const report = renderReport(result);

if (process.argv.includes("--write")) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report);
  console.log(`Wrote ${path.relative(rootDir, reportPath)}`);
}

console.log(`Revelation humanization audit complete: ${result.notes.length} notes, ${result.totalWords} words.`);
console.log(`350-450 word band: ${result.in350To450} (${percent(result.in350To450, result.notes.length)})`);
console.log(`390-410 word band: ${result.in390To410} (${percent(result.in390To410, result.notes.length)})`);
console.log(`Full rewrite: ${result.classificationCounts["full rewrite"] ?? 0}`);
console.log(`Structural rewrite: ${result.classificationCounts["structural rewrite"] ?? 0}`);
console.log(`Light cadence edit: ${result.classificationCounts["light cadence edit"] ?? 0}`);
