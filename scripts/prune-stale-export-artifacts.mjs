import { existsSync, rmSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();

function rgFiles(args) {
  try {
    const output = execFileSync('rg', ['--files', ...args], {
      cwd: root,
      encoding: 'utf8',
    }).trim();
    return output ? output.split('\n') : [];
  } catch {
    return [];
  }
}

const txtArtifacts = rgFiles(['-g', '*.txt']).filter((file) => {
  const name = file.split('/').pop() || '';
  return name === 'index.txt' || name.startsWith('__next.');
});

let removedFiles = 0;
for (const file of txtArtifacts) {
  unlinkSync(join(root, file));
  removedFiles += 1;
}

const staleDirs = [
  '_next',
  'design-preview',
  'content-audits',
];

const staleFiles = [
  'assets/revelation-hero-daniel-style.png',
  'assets/revelation-hero-engraving.png',
  'assets/revelation-hero-hd.png',
  '.DS_Store',
  'articles/.DS_Store',
  'revelation/.DS_Store',
  'timeline/.DS_Store',
  'scripts/audit-revelation-humanization.mjs',
  'scripts/validate-revelation-theology.mjs',
];

let removedDirs = 0;
for (const dir of staleDirs) {
  const path = join(root, dir);
  if (!existsSync(path)) continue;
  rmSync(path, { recursive: true, force: true });
  removedDirs += 1;
}

for (const file of staleFiles) {
  const path = join(root, file);
  if (!existsSync(path)) continue;
  unlinkSync(path);
  removedFiles += 1;
}

console.log(`Removed ${removedFiles} stale files and ${removedDirs} obsolete artifact directories.`);
