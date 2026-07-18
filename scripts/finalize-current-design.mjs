import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const cacheToken = 'rvx-94';

const summaries = {
  1: "Revelation 1 opens with Christ's unveiling to the churches. John sees the risen Son of Man among the seven lampstands.",
  2: "Revelation 2 records Christ's messages to Ephesus, Smyrna, Pergamos, and Thyatira. He calls His churches to love, endurance, purity, and faithfulness.",
  3: "Revelation 3 continues Christ's messages to Sardis, Philadelphia, and Laodicea. He calls the church to wakefulness, perseverance, and wholehearted fellowship with Him.",
  4: "Revelation 4 lifts John into heaven's throne room. The vision centers worship on the Creator who reigns over all things.",
  5: "Revelation 5 shows the Lamb as the only One worthy to open the scroll. Heaven worships Christ because He has redeemed His people by His blood.",
  6: "Revelation 6 opens the first six seals. The chapter traces conquest, suffering, judgment, and the urgent question of who can stand.",
  7: "Revelation 7 answers who can stand before the Lamb. God's sealed servants and the great multitude are kept through tribulation.",
  8: "Revelation 8 opens the seventh seal and begins the trumpets. Judgment warnings proceed from the altar where the prayers of the saints are heard.",
  9: "Revelation 9 continues the trumpet warnings with demonic torment and destructive powers. The chapter exposes judgment on a world that refuses repentance.",
  10: "Revelation 10 gives John the little book to eat. The sweet and bitter message prepares God's people to prophesy again.",
  11: "Revelation 11 shows the measured temple, the two witnesses, and the seventh trumpet. God's testimony survives opposition and His kingdom is announced.",
  12: "Revelation 12 unveils the conflict between the woman, the Child, and the dragon. Satan is defeated by Christ and turns his fury against the remnant.",
  13: "Revelation 13 introduces the sea beast and earth beast. The chapter exposes counterfeit worship and the pressure to receive the mark of the beast.",
  14: "Revelation 14 presents the Lamb's faithful people and the three angels' messages. It calls the world to worship the Creator before the final harvest.",
  15: "Revelation 15 prepares for the seven last plagues. The redeemed sing beside the sea of glass while God's final judgments are readied.",
  16: "Revelation 16 pours out the seven last plagues. The chapter moves toward Armageddon and the collapse of Babylon's power.",
  17: "Revelation 17 identifies Babylon as a corrupt religious-political power. The vision shows her alliance with earthly kings and her coming judgment.",
  18: "Revelation 18 announces Babylon's fall. God's people are called out before her sins and judgments reach their end.",
  19: "Revelation 19 celebrates heaven's victory and the marriage supper of the Lamb. Christ appears as the faithful King who defeats the rebellious powers.",
  20: "Revelation 20 describes the millennium, final judgment, and the second death. Sin and death are brought to their final end.",
  21: "Revelation 21 shows the new heaven, new earth, and New Jerusalem. God dwells with His people and makes all things new.",
  22: "Revelation 22 closes with the river of life, the tree of life, and Christ's promise to come quickly. The final invitation is to receive the water of life freely.",
};

const emblem = '<span class="reader-logo" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" data-rvx-logo="scripture"><g><line x1="50" y1="30" x2="50" y2="20"></line><line x1="42" y1="31.5" x2="38.5" y2="22.5"></line><line x1="58" y1="31.5" x2="61.5" y2="22.5"></line><line x1="35" y1="35" x2="28.5" y2="28.5"></line><line x1="65" y1="35" x2="71.5" y2="28.5"></line></g><path d="M50 47 q-13 -6 -24 -3 v27 q11 -3 24 3"></path><path d="M50 47 q13 -6 24 -3 v27 q-11 -3 -24 3"></path><line x1="50" y1="47" x2="50" y2="77"></line><path d="M32 55 q8 -2 15 1 M32 61 q8 -2 15 1 M53 56 q8 -3 15 0 M53 62 q8 -3 15 0"></path></svg></span>';
const arrowLeft = '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>';
const arrowRight = '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
const chevron = '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (name === '.git') return [];
    const path = join(directory, name);
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

function referenceNavigation(chapter) {
  const previous = chapter > 1
    ? `<a class="mbe-ref-step" href="/revelation/${chapter - 1}/" aria-label="Previous chapter">${arrowLeft}</a>`
    : `<span class="mbe-ref-step mbe-ref-disabled" aria-hidden="true">${arrowLeft}</span>`;
  const next = chapter < 22
    ? `<a class="mbe-ref-step" href="/revelation/${chapter + 1}/" aria-label="Next chapter">${arrowRight}</a>`
    : `<span class="mbe-ref-step mbe-ref-disabled" aria-hidden="true">${arrowRight}</span>`;
  return `<nav class="mbe-ref-strip no-print" aria-label="Revelation reference navigation"><div class="mbe-ref-nav">${previous}<form class="mbe-ref-form"><button class="mbe-ref-picker-toggle" type="button" aria-label="Choose Revelation chapter and verse"><span class="mbe-ref-badge">KJV</span>${chevron}</button><input class="mbe-ref-input" type="search" inputmode="numeric" autocomplete="off" value="Revelation ${chapter}:1" aria-label="Type a verse reference"></form><div class="mbe-ref-menu-wrap"><button class="mbe-ref-recent-toggle" type="button">Recent ${chevron}</button></div>${next}<div class="mbe-ref-menu-wrap"><button class="mbe-ref-all-toggle" type="button">All</button></div></div></nav>`;
}

function finalize(path) {
  const route = relative(root, path).replaceAll('\\', '/');
  let html = readFileSync(path, 'utf8');
  const original = html;

  html = html
    .replace(/\s*<link rel="preload" as="image" href="\/assets\/revelation-hero-hd\.webp\?v=[^"]+" type="image\/webp" fetchpriority="high"\s*\/>/g, '')
    .replace(/\s*<link rel="stylesheet" href="\/_next\/static\/css\/[^"]+" data-precedence="next"\/>/g, '')
    .replace(/\s*<link rel="stylesheet" href="\/global-shell\.css\?v=[^"]+"\s*\/>/g, '')
    .replace(/\s*<link rel="stylesheet" href="\/(?:revelation-illustrated|revelation-site)\.css\?v=[^"]+" data-rvx="css"\s*\/>/g, '')
    .replace(/\s*<script defer src="\/mbe-unified\.js\?v=[^"]+"><\/script>/, `\n    <link rel="stylesheet" href="/revelation-site.css?v=${cacheToken}" data-rvx="css" />\n    <script defer src="/mbe-unified.js?v=${cacheToken}"></script>`)
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, '')
    .replace(/<div class="fixed left-0 top-0 z-\[60\] h-1 bg-primary transition-\[width\]" style="width:0%"><\/div>/g, '')
    .replace(/<div class="reader-header-actions">[\s\S]*?<\/div><\/header>/g, '</header>')
    .replace(/\s*<div class="commentary-actions no-print">[\s\S]*?<\/div>(?=<\/article>)/g, '')
    .replace(/<span class="reader-logo" aria-hidden="true"><svg[\s\S]*?<\/svg><\/span>/g, emblem)
    .replace(/<!--\$-->|<!--\/\$-->|<!-- -->/g, '');

  if (['index.html', 'introduction/index.html', 'articles/index.html'].includes(route)) {
    html = html.replace(
      /(<script>document\.documentElement\.classList\.add\("dark"\);<\/script>)/,
      `$1\n    <link rel="preload" as="image" href="/assets/revelation-hero-hd.webp?v=mbe-20260715-1" type="image/webp" fetchpriority="high" />`,
    );
  }

  if (route === 'index.html') {
    html = html
      .replace(/<h1 id="home-title"[^>]*>[\s\S]*?<\/h1>/, '<h1 id="home-title" aria-label="The Book of Revelation"><span class="home-title-kicker">The Book of</span><span class="home-title-main">Revelation</span></h1>')
      .replace(/<aside class="home-showcase-context"[\s\S]*?<\/aside>/, '');
  }

  if (route === 'introduction/index.html') {
    html = html
      .replace(/<p class="background-kicker">[\s\S]*?<\/p>/, '')
      .replace(/<p class="background-section-nav-heading">[\s\S]*?<\/p>/, '')
      .replace(/<section class="background-summary"[\s\S]*?<\/section>/, '')
      .replace(/<section class="background-fact-grid"[\s\S]*?<\/section>/, '');
  }

  if (route === 'articles/index.html') {
    html = html
      .replace(/<p class="articles-kicker">[\s\S]*?<\/p>/, '')
      .replace(/<nav class="articles-menu"[\s\S]*?<\/nav>/, '')
      .replace(/(<div class="articles-category-heading">)<p>Category<\/p>/g, '$1');
  }

  const chapterMatch = route.match(/^revelation\/(\d+)\/index\.html$/);
  if (chapterMatch) {
    const chapter = Number(chapterMatch[1]);
    html = html
      .replace(/<nav class="chapter-strip no-print"[\s\S]*?<\/nav>/, referenceNavigation(chapter))
      .replace(/<p class="scripture-chapter-summary">[\s\S]*?<\/p>/, `<p class="scripture-chapter-summary">${summaries[chapter]}</p>`);
  }

  if (html !== original) writeFileSync(path, html);
  return html !== original;
}

const files = htmlFiles(root);
const changed = files.filter(finalize).length;
console.log(`Finalized ${files.length} HTML files; updated ${changed}.`);
