import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const finalPath = join(root, 'revelation-site.css');
const foundationStart = '/* CURRENT STRUCTURAL FOUNDATION */';
const foundationEnd = '/* END CURRENT STRUCTURAL FOUNDATION */';

function read(path) {
  return readFileSync(join(root, path), 'utf8').trim();
}

function existingFoundation() {
  if (!existsSync(finalPath)) return '';
  const current = readFileSync(finalPath, 'utf8');
  const start = current.indexOf(foundationStart);
  const end = current.indexOf(foundationEnd);
  if (start === -1 || end === -1 || end <= start) return '';
  return current.slice(start + foundationStart.length, end).trim();
}

function referenceNavigationCss() {
  const script = read('mbe-unified.js');
  const match = script.match(/function installReferenceNavStyles\(\) \{[\s\S]*?style\.textContent = `([\s\S]*?)`;\n\s*document\.head\.appendChild\(style\);/);
  if (!match) throw new Error('Could not find the current reference navigation CSS in mbe-unified.js.');
  return match[1].trim();
}

const foundation = existingFoundation();

if (!foundation) throw new Error('The structural foundation is unavailable.');

const output = [
  foundationStart,
  foundation,
  foundationEnd,
  '',
  '/* CURRENT GLOBAL SHELL */',
  read('global-shell.css'),
  '',
  '/* CURRENT REVELATION DESIGN */',
  read('revelation-illustrated.css'),
  '',
  '/* CURRENT REFERENCE NAVIGATION */',
  ':root { --mbe-reference-nav-ready: 1; }',
  referenceNavigationCss(),
  '',
].join('\n');

writeFileSync(finalPath, output);
console.log(`Built revelation-site.css (${Buffer.byteLength(output).toLocaleString()} bytes).`);
