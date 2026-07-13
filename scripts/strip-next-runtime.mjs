import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const files = execFileSync('rg', ['--files', '-g', '*.html'], {
  cwd: root,
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);

let changed = 0;

for (const file of files) {
  const path = join(root, file);
  const original = readFileSync(path, 'utf8');
  let html = original;

  html = html.replace(/<link\s+rel="preload"\s+as="script"[^>]*href="\/_next\/static\/[^"]+"[^>]*\/?>/g, '');
  html = html.replace(/<script\b[^>]*\bsrc="\/_next\/static\/[^"]+"[^>]*><\/script>/g, '');
  html = html.replace(/<script>\s*\(?self\.__next_f[\s\S]*?<\/script>/g, '');

  if (html !== original) {
    writeFileSync(path, html);
    changed += 1;
  }
}

console.log(`Removed stale Next runtime scripts from ${changed} HTML files.`);
