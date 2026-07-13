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
  '_next/static/chunks',
  '_next/static/qMbsPXf8G-RtgDxPLjusZ',
];

let removedDirs = 0;
for (const dir of staleDirs) {
  const path = join(root, dir);
  if (!existsSync(path)) continue;
  rmSync(path, { recursive: true, force: true });
  removedDirs += 1;
}

console.log(`Removed ${removedFiles} text export artifacts and ${removedDirs} stale Next runtime directories.`);
