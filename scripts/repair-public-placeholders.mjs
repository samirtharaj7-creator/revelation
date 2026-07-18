#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;

function update(relativePath, replacements) {
  const file = join(root, relativePath);
  if (!existsSync(file)) return;
  let text = readFileSync(file, "utf8");
  const before = text;
  for (const [from, to] of replacements) text = text.split(from).join(to);
  if (text !== before) writeFileSync(file, text);
}

const trumpetSummary = "Study the trumpet sequence as warning judgments that call the world to repentance before the seventh trumpet announces Christ’s kingdom.";
const plagueSummary = "Study the seven last plagues as the close of rebellion, the vindication of God’s justice, and the prelude to Christ’s deliverance of His people.";

for (const file of ["timeline/index.html", "timeline/index.txt"]) {
  update(file, [
    ["Coming soon. The interactive trumpet study will be added once the visual data is ready.", trumpetSummary],
    ["Coming soon. The interactive plague study will be added once the visual data is ready.", plagueSummary],
    ["Coming soon", "Study gateway"]
  ]);
}

for (const file of ["timeline/seven-trumpets/index.html", "timeline/seven-trumpets/index.txt"]) {
  update(file, [
    ["7 Trumpets Coming Soon | Revelation Study", "7 Trumpets | Revelation Study"],
    ["Coming soon page for the seven trumpets visual prophecy study.", "A Revelation 8–11 study gateway for the seven trumpets and their warning message."],
    ["coming-soon-title", "study-title"],
    ["The interactive visual study for the seven trumpets is not ready yet. This page will hold the visual sequence once the data is prepared.", trumpetSummary],
    ["Coming soon", "Revelation 8–11 study"]
  ]);
}

for (const file of ["timeline/seven-plagues/index.html", "timeline/seven-plagues/index.txt"]) {
  update(file, [
    ["7 Plagues Coming Soon | Revelation Study", "7 Plagues | Revelation Study"],
    ["Coming soon page for the seven plagues visual prophecy study.", "A Revelation 15–16 study gateway for the seven last plagues and God’s final deliverance."],
    ["coming-soon-title", "study-title"],
    ["The interactive visual study for the seven last plagues is not ready yet. This page will hold the visual sequence once the data is prepared.", plagueSummary],
    ["Coming soon", "Revelation 15–16 study"]
  ]);
}

update("timeline/seven-churches/index.html", [
  ['<h2 id="seven-churches-title"', '<h1 id="seven-churches-title"'],
  [
    '</h2><p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Explore Revelation 2 and 3',
    '</h1><p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Explore Revelation 2 and 3'
  ]
]);

update("revelation/1/index.html", [[
  '<div class="study-card-section"><h3>Symbols</h3><p class="study-card-empty">No verse-specific symbols added yet.</p></div>',
  ""
]]);

console.log("Revelation public placeholder repair complete.");
