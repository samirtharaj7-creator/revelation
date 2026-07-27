import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const revision = 'rvx-93';
const assetRevision = 'rvx-99';
const expectedChapters = 22;
const expectedVerses = 404;
const elderReferences = new Set([
  'Revelation 4:4',
  'Revelation 5:8',
  'Revelation 5:9',
  'Revelation 7:11',
  'Revelation 7:13',
  'Revelation 11:16',
  'Revelation 14:3',
  'Revelation 19:4',
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const references = new Set();
const studyReferences = new Set();
let verseTotal = 0;
let directTotal = 0;
let groupedTotal = 0;
let correctedTotal = 0;

for (let chapter = 1; chapter <= expectedChapters; chapter += 1) {
  const bundlePath = join(root, 'assets', 'commentary', `revelation-${chapter}.json`);
  const bundle = JSON.parse(readFileSync(bundlePath, 'utf8'));
  assert(bundle.revision === revision, `Chapter ${chapter} has stale revision ${bundle.revision}.`);
  assert(bundle.chapter === chapter, `Bundle chapter mismatch for Revelation ${chapter}.`);
  assert(Array.isArray(bundle.notes) && bundle.notes.length, `Chapter ${chapter} has no notes.`);

  const pagePath = join(root, 'revelation', String(chapter), 'index.html');
  const page = readFileSync(pagePath, 'utf8');
  assert(page.includes(`/mbe-unified.js?v=${assetRevision}`), `Chapter ${chapter} has a stale script token.`);
  assert(page.includes(`/revelation-site.css?v=${assetRevision}`), `Chapter ${chapter} has a stale stylesheet token.`);

  const verseIds = [...page.matchAll(new RegExp(`id="revelation-${chapter}-(\\d+)"`, 'g'))]
    .map((match) => Number(match[1]));
  assert(new Set(verseIds).size === verseIds.length, `Chapter ${chapter} contains duplicate verse IDs.`);
  assert(verseIds.length === bundle.notes.length, `Chapter ${chapter} page/bundle count mismatch.`);

  for (let index = 0; index < bundle.notes.length; index += 1) {
    const note = bundle.notes[index];
    const verse = index + 1;
    const reference = `Revelation ${chapter}:${verse}`;
    assert(note.id === `revelation-${chapter}-${verse}`, `Bad ID for ${reference}.`);
    assert(note.reference === reference, `Bad reference for ${reference}.`);
    assert(note.chapter === chapter && note.verse === verse, `Bad chapter/verse fields for ${reference}.`);
    assert(verseIds.includes(verse), `Missing page verse button for ${reference}.`);
    assert(!references.has(reference), `Duplicate audited reference ${reference}.`);
    references.add(reference);

    assert(Array.isArray(note.paragraphs) && note.paragraphs.length === 4, `${reference} must have four commentary paragraphs.`);
    assert(note.paragraphs.every((paragraph) => typeof paragraph === 'string' && paragraph.trim().length > 40), `${reference} has an empty or undersized paragraph.`);
    assert(Array.isArray(note.crossReferences), `${reference} has malformed cross references.`);
    assert(Array.isArray(note.symbols), `${reference} has malformed symbols.`);
    assert(Array.isArray(note.wordNotes), `${reference} has malformed word notes.`);
    note.crossReferences.forEach((studyReference) => studyReferences.add(studyReference));
    note.symbols.forEach((symbol) => {
      (symbol.scriptureReferences ?? []).forEach((studyReference) => studyReferences.add(studyReference));
    });
    note.wordNotes.forEach((wordNote) => {
      (wordNote.scriptureReferences ?? []).forEach((studyReference) => studyReferences.add(studyReference));
    });
    assert(note.audit?.source?.includes('Seventh-day Adventist Bible Commentary'), `${reference} is missing its SDA source.`);
    assert(Number.isInteger(note.audit?.sourcePage) && note.audit.sourcePage > 0, `${reference} is missing a source page.`);
    assert(Number.isInteger(note.audit?.sourceLine) && note.audit.sourceLine > 0, `${reference} is missing a source line.`);
    assert(['direct', 'grouped-with-preceding-comment'].includes(note.audit?.sourceBasis), `${reference} has an invalid source basis.`);

    if (note.audit.sourceBasis === 'direct') directTotal += 1;
    else groupedTotal += 1;
    if (note.audit.status === 'corrected-and-aligned') correctedTotal += 1;

    if (elderReferences.has(reference)) {
      assert(/angelic/i.test(JSON.stringify(note)), `${reference} does not preserve the angelic identity of the twenty-four elders.`);
    }
  }

  verseTotal += bundle.notes.length;
}

const readerScript = readFileSync(join(root, 'mbe-unified.js'), 'utf8');
const sourceCss = readFileSync(join(root, 'revelation-illustrated.css'), 'utf8');
const siteCss = readFileSync(join(root, 'revelation-site.css'), 'utf8');
const previewData = JSON.parse(
  readFileSync(join(root, 'assets', 'commentary', 'kjv-reference-previews.json'), 'utf8'),
);
assert(readerScript.includes(`const COMMENTARY_REVISION = '${revision}'`), 'Reader commentary revision is stale.');
assert(readerScript.includes(`/revelation-site.css?v=${assetRevision}`), 'Reader stylesheet revision is stale.');
for (const [name, css] of [['source', sourceCss], ['built', siteCss]]) {
  assert(
    /@media \(max-width: 560px\)[\s\S]*?\.article-document-header h1\s*\{[\s\S]*?overflow-wrap: anywhere !important;/.test(css),
    `The ${name} stylesheet is missing the mobile article-heading overflow safeguard.`,
  );
}
assert(readerScript.includes('/assets/commentary/revelation-${chapter}.json'), 'Reader is not wired to the audited chapter bundles.');
assert(readerScript.includes('/assets/commentary/kjv-reference-previews.json'), 'Reader is not wired to KJV reference previews.');
assert(previewData.revision === revision, `KJV reference previews have stale revision ${previewData.revision}.`);
for (const studyReference of studyReferences) {
  const preview = previewData.references?.[studyReference];
  assert(preview?.verses?.length > 0, `${studyReference} is missing a KJV hover preview.`);
  assert(preview.verses.length <= previewData.previewLimit, `${studyReference} exceeds the hover preview limit.`);
  preview.verses.forEach((verseReference) => {
    assert(previewData.verses?.[verseReference]?.trim(), `${studyReference} is missing KJV text for ${verseReference}.`);
  });
}
assert(verseTotal === expectedVerses, `Expected ${expectedVerses} verses, found ${verseTotal}.`);
assert(references.size === expectedVerses, `Expected ${expectedVerses} unique references, found ${references.size}.`);

console.log(`Verified ${verseTotal} Revelation notes across ${expectedChapters} chapters.`);
console.log(`Source coverage: ${directTotal} direct, ${groupedTotal} grouped.`);
console.log(`Corrected notes: ${correctedTotal}.`);
console.log(`KJV hover previews: ${studyReferences.size} study references.`);
console.log('All chapter pages, verse IDs, audit locators, reader wiring, reference previews, and angelic-elder checks passed.');
