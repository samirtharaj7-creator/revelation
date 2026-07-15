import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const rawKjvPath = process.argv[2]
  || process.env.KJV_VERSES_PATH
  || '/Users/samuel/Documents/Codex/2026-05-15/files-mentioned-by-the-user-christ/data/raw/verses-1769.json';
const outputPath = join(root, 'assets', 'commentary', 'kjv-reference-previews.json');
const previewLimit = 3;
const singleChapterBooks = new Set(['Obadiah', 'Philemon', '2 John', '3 John', 'Jude']);

const sourceBookNames = {
  Psalm: 'Psalms',
  'Song of Songs': "Solomon's Song",
  'Song of Solomon': "Solomon's Song",
};

function cleanVerse(text) {
  return String(text)
    .replace(/^#\s*/, '')
    .replace(/\[(.*?)\]/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectReferences() {
  const references = new Set();

  for (let chapter = 1; chapter <= 22; chapter += 1) {
    const bundle = JSON.parse(
      readFileSync(join(root, 'assets', 'commentary', `revelation-${chapter}.json`), 'utf8'),
    );

    for (const note of bundle.notes ?? []) {
      for (const reference of note.crossReferences ?? []) references.add(reference.trim());
      for (const symbol of note.symbols ?? []) {
        for (const reference of symbol.scriptureReferences ?? []) references.add(reference.trim());
      }
      for (const wordNote of note.wordNotes ?? []) {
        for (const reference of wordNote.scriptureReferences ?? []) references.add(reference.trim());
      }
    }
  }

  return [...references].sort((left, right) => left.localeCompare(right, 'en', { numeric: true }));
}

function parseSegment(segment, inheritedChapter, singleChapter) {
  const trimmed = segment.trim();
  const chapterMatch = trimmed.match(/^(\d+):(\d+)(?:[-–—](?:(\d+):)?(\d+))?$/u);
  if (chapterMatch) {
    const [, rawChapter, rawStartVerse, rawEndChapter, rawEndVerse] = chapterMatch;
    const chapter = Number(rawChapter);
    return {
      chapter,
      startVerse: Number(rawStartVerse),
      endChapter: Number(rawEndChapter ?? chapter),
      endVerse: Number(rawEndVerse ?? rawStartVerse),
    };
  }

  const verseMatch = trimmed.match(/^(\d+)(?:[-–—](\d+))?$/u);
  if (!verseMatch || (!inheritedChapter && !singleChapter)) return null;
  const chapter = inheritedChapter || 1;
  return {
    chapter,
    startVerse: Number(verseMatch[1]),
    endChapter: chapter,
    endVerse: Number(verseMatch[2] ?? verseMatch[1]),
  };
}

function parseReference(reference) {
  const match = reference.match(/^((?:[1-3] )?[A-Za-z]+(?: [A-Za-z]+)*) (.+)$/u);
  if (!match) return null;
  const [, book, passage] = match;
  const singleChapter = singleChapterBooks.has(book);
  const segments = [];
  let inheritedChapter = singleChapter ? 1 : null;

  for (const rawSegment of passage.split(',')) {
    const segment = parseSegment(rawSegment, inheritedChapter, singleChapter);
    if (!segment) return null;
    inheritedChapter = segment.chapter;
    segments.push(segment);
  }

  return { book, sourceBook: sourceBookNames[book] ?? book, segments };
}

function inSegment(entry, segment) {
  const position = entry.chapter * 1000 + entry.verse;
  const start = segment.chapter * 1000 + segment.startVerse;
  const end = segment.endChapter * 1000 + segment.endVerse;
  return position >= start && position <= end;
}

function revisionToken() {
  const script = readFileSync(join(root, 'mbe-unified.js'), 'utf8');
  return script.match(/const COMMENTARY_REVISION = '([^']+)'/)?.[1] ?? 'unversioned';
}

function main() {
  const sourceVerses = JSON.parse(readFileSync(rawKjvPath, 'utf8'));
  const sourceByBook = new Map();

  for (const [key, text] of Object.entries(sourceVerses)) {
    const match = key.match(/^(.+) (\d+):(\d+)$/);
    if (!match) continue;
    const [, book, rawChapter, rawVerse] = match;
    if (!sourceByBook.has(book)) sourceByBook.set(book, []);
    sourceByBook.get(book).push({
      chapter: Number(rawChapter),
      verse: Number(rawVerse),
      text: cleanVerse(text),
    });
  }

  for (const entries of sourceByBook.values()) {
    entries.sort((left, right) => left.chapter - right.chapter || left.verse - right.verse);
  }

  const references = {};
  const verses = {};
  const failures = [];

  for (const reference of collectReferences()) {
    const parsed = parseReference(reference);
    if (!parsed) {
      failures.push(`${reference} (could not parse)`);
      continue;
    }

    const sourceEntries = sourceByBook.get(parsed.sourceBook) ?? [];
    const matching = [];
    for (const segment of parsed.segments) {
      matching.push(...sourceEntries.filter((entry) => inSegment(entry, segment)));
    }

    const unique = matching.filter((entry, index, entries) =>
      entries.findIndex((candidate) => candidate.chapter === entry.chapter && candidate.verse === entry.verse) === index
    );
    if (unique.length === 0) {
      failures.push(`${reference} (no KJV verses found)`);
      continue;
    }

    const selected = unique.slice(0, previewLimit);
    const verseKeys = selected.map((entry) => `${parsed.book} ${entry.chapter}:${entry.verse}`);
    selected.forEach((entry, index) => {
      verses[verseKeys[index]] = entry.text;
    });
    references[reference] = {
      verses: verseKeys,
      truncated: unique.length > selected.length,
    };
  }

  if (failures.length > 0) {
    throw new Error(`Unable to build ${failures.length} reference preview(s):\n${failures.join('\n')}`);
  }

  const output = {
    revision: revisionToken(),
    translation: 'King James Version',
    previewLimit,
    references,
    verses: Object.fromEntries(
      Object.entries(verses).sort(([left], [right]) => left.localeCompare(right, 'en', { numeric: true })),
    ),
  };

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(output)}\n`);
  console.log(
    `Built ${outputPath} with ${Object.keys(references).length} references and ${Object.keys(verses).length} KJV verses.`,
  );
}

main();
