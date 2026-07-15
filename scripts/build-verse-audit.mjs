import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const legacyPath = process.env.REVELATION_LEGACY_NOTES || '/private/tmp/revelation-legacy-notes.json';
const sourcePath = process.env.REVELATION_SDA_TEXT || '/private/tmp/revelation-sda-commentary-clean.txt';
const revision = 'rvx-84';
const sourceTitle = 'The Seventh-day Adventist Bible Commentary, vol. 7, Revelation';

const legacy = JSON.parse(readFileSync(legacyPath, 'utf8'));
const sourceText = readFileSync(sourcePath, 'utf8').replaceAll('\r\n', '\n');

const alignedReadings = {
  'Revelation 1:1': [
    `Revelation opens by naming itself an unveiling of Jesus Christ. The title presents the book primarily as a revelation given by Christ, while the whole prophecy also reveals Him in His heavenly ministry after the ascension. It is not a sealed riddle. God gave it so His servants could hear, understand, and keep its message.`,
    `The chain of communication gives the prophecy its authority: God gives the revelation to Christ, Christ sends it through His angel, and John bears witness to the church. The phrase "signified it" also prepares the reader for a book communicated through signs, symbols, scenes, and the language of earlier Scripture. Those symbols invite careful study rather than uncontrolled speculation.`,
    `The promise that these things must "shortly come to pass" expresses God's will that the conflict with sin be brought to its close without needless delay. The SDA Commentary treats the repeated statements of nearness as conditional promises rather than failed predictions: Christ would have come sooner if the church had completed its gospel commission. The certainty of the Second Coming is unconditional, while its repeated imminence calls every generation of believers to finish the work entrusted to it.`,
    `The verse therefore joins hope with responsibility. Revelation is from Jesus, reveals Jesus, and shows His servants how to live faithfully while His saving purpose moves toward completion. The book begins not with beasts or plagues, but with the God who speaks and the Christ who makes His work known.`,
  ],
  'Revelation 1:7': [
    `The coming of Christ is announced with clouds, visibility, mourning, and universal scope. The imagery joins Daniel's cloud-coming Son of Man with Zechariah's pierced one. The crucified and risen Jesus will return personally, publicly, and unmistakably.`,
    `The phrase "they also which pierced him" has a particular force in the SDA Commentary. It points to those responsible for Christ's death being raised in the special resurrection described in Daniel 12:2 so that they witness the appearing about which Jesus warned His judges.`,
    `The mourning of earth's peoples is the grief of a world confronted by the truth it resisted. Revelation places the entire conflict over worship and allegiance under the certainty that the rejected Christ will be openly vindicated.`,
    `The church answers, "Even so, Amen," with sober hope. The Second Advent calls for readiness rather than date-setting, repentance rather than panic, and faithfulness in the confidence that hidden obedience will not be forgotten.`,
  ],
  'Revelation 4:1': [
    `After the messages to the seven churches, John sees a door standing open in heaven and hears again the trumpet-like voice that introduced his first vision. The words "after this" mark the order in which the visions were shown to John; they do not establish a chronological relationship between the final events of chapters 1-3 and the throne-room scene that follows.`,
    `The open door gives John a symbolic view into the throne room of the universe. He does not force heaven open by curiosity. The invitation comes from God, and the imagery that follows communicates heavenly realities through prophetic symbols. Revelation therefore directs the church from its earthly condition to the divine throne from which history is understood.`,
    `The phrase "things which must be hereafter" is likewise spoken from John's own time, not necessarily from the completion of the preceding vision. Chapters 4 and 5 prepare the reader for the Lamb and the sealed scroll by showing that the conflict on earth remains under heaven's authority.`,
    `Before believers ask what will happen, Revelation shows where history is governed. The open door is a gift of orientation: God has not abandoned His church, and the throne remains secure while Christ discloses what His servants need in order to be faithful.`,
  ],
  'Revelation 4:4': [
    `Around God's throne John sees twenty-four thrones occupied by elders in white garments and golden crowns. These angelic royal-priestly beings display purity, victory, service, and authority received from God, and their honor remains ordered around the central throne.`,
    `In this commentary, the twenty-four elders are understood as angelic heavenly royal-priestly beings who serve in the ordered court around the throne. Their thrones, white garments, and crowns describe delegated heavenly service rather than placing them among the human redeemed.`,
    `The preferred textual reading of Revelation 5:9 supports this identification: the singers praise the Lamb for redeeming "them" rather than "us." The elders celebrate redemption accomplished for humanity without identifying themselves as members of the redeemed company.`,
    `Their posture is the central lesson. Authority nearest the throne expresses itself in worship, and every crown is ultimately laid before the Creator.`,
  ],
  'Revelation 5:1': [
    `John sees a scroll in the right hand of the One seated on the throne. It is written within and on the back and sealed with seven seals. The writing on both sides suggests a record so full that scarcely any space remains, while the seven seals show that it is completely sealed until the worthy One opens it.`,
    `The SDA Commentary identifies the scroll as containing a record of significant events in the great controversy, including the rejection of Christ. As the seals are opened, John is shown successive phases in the history of the church and the conflict between good and evil. The scroll is heaven's authoritative record and disclosure of that controversy, not a timetable invented by human speculation.`,
    `Only the Lamb can open the scroll. His worthiness means that He is the conqueror in the controversy and the Lord of history. The frightening scenes that follow remain under the authority of the One who was slain and now stands before the throne.`,
    `For the church, the sealed scroll teaches patient trust. History is not ownerless or unreadable to God. Its record rests in His hand, and Christ alone discloses its meaning and carries the controversy toward the final vindication of God's character.`,
  ],
  'Revelation 5:8': [
    `When the Lamb takes the scroll, the four living creatures and the twenty-four elders fall before Him. Their worship interprets the moment: the Lamb's authority to open history rests on His victorious sacrifice, and heaven responds in adoration.`,
    `Each elder has a harp and golden bowls of incense identified as the prayers of the saints. The scene joins worship, sanctuary imagery, and the suffering church's petitions before God. The prayers of believers are not forgotten while the Lamb governs history.`,
    `The twenty-four elders are angelic heavenly royal-priestly worshipers. Their ministry with the saints' prayers belongs to the ordered service of heaven and does not make them members of the redeemed human company.`,
    `Their angelic identity sharpens the pastoral point: prayer belongs in the throne-room story. The church may not see how its petitions are handled, but heaven treats them as precious before the Lamb.`,
  ],
  'Revelation 5:9': [
    `The heavenly worshipers sing a new song because the slain Lamb is worthy to take the scroll and open its seals. His sacrificial death and victory in the great controversy are the basis of His authority.`,
    `Important textual evidence favors "thou hast redeemed them" rather than "redeemed us." The song celebrates people purchased from every tribe, language, people, and nation without requiring the singers themselves to be the redeemed.`,
    `That textual point accords with the identification of the twenty-four elders as angelic heavenly worshipers. They celebrate the Lamb's redemption of humanity while remaining part of the heavenly court. Revelation's emphasis remains on the Lamb and the worldwide reach of His redemption.`,
    `Prophecy must therefore stay centered in the gospel. Warning without the Lamb's redemption becomes harsh, while redemption detached from His coming judgment becomes thin.`,
  ],
  'Revelation 6:9': [
    `Under the fifth seal John sees the "souls" of martyrs beneath the altar. The altar imagery portrays their lives as sacrifices poured out for the word of God and the testimony they maintained.`,
    `The SDA Commentary explicitly treats this as a pictorial prophetic representation, not a view of conscious disembodied spirits in heaven. The martyrs are at rest in death until the resurrection; the speaking blood-like image assures persecuted believers that God remembers them and will vindicate His cause.`,
    `In the historicist sequence, the fifth seal especially encourages the witnesses of the Reformation era and after, approximately A.D. 1517-1755, while its assurance belongs to martyrs in every age and to believers in the final conflict.`,
    `The verse dignifies faithful suffering without romanticizing it. Earth may erase names and silence voices, but heaven does not lose the testimony of anyone who remains loyal to Christ.`,
  ],
  'Revelation 8:1': [
    `When the Lamb opens the seventh seal, heaven falls silent for about half an hour. The contrast is striking because the throne room has previously been filled with praise. The silence is solemn, but the text does not require the reader to reduce it to only one explanation.`,
    `The SDA Commentary records two principal interpretations. One understands the silence as the result of heaven's hosts accompanying Christ to earth at the Second Coming. The other understands it as a hush of awesome expectation, forming a bridge from the seals to the trumpet visions and indicating that more remains to be disclosed about the great controversy.`,
    `The "half an hour" has likewise been understood in two ways. Applying the prophetic day-for-a-year principle yields approximately one literal week, and Seventh-day Adventists have generally favored that view. Other interpreters understand the phrase simply as a short, unspecified period because Scripture gives no unambiguous rule for applying prophetic time to a fraction smaller than a day.`,
    `Whether the silence pictures heaven emptied for Christ's return or heaven waiting in awe, the Lamb remains in command. The sealed people of God can meet the scene with reverence and readiness rather than dogmatism.`,
  ],
  'Revelation 9:1': [
    `The fifth trumpet begins with a star already fallen to the earth. Because the text says that a key was given "to him," the star is presented as a personal agency rather than an ordinary meteor. The received key shows that this power is delegated and limited.`,
    `The image of a fallen star has long been associated with Satan, and the dark character of the abyss supports that connection. Yet the vision keeps the focus on divine sovereignty: the key is given by a higher authority, so the destructive power released under the trumpet is never equal to Christ.`,
    `A historicist line of interpretation noted in the SDA Commentary connects the fifth and sixth trumpets with the Saracens and Turks. In that application the abyss can represent the Arabian deserts from which the movement advanced, while the wider symbol portrays a permitted judgment on a compromised Christian world. This is an interpretation of the imagery, not permission to despise people or assign guilt by ancestry.`,
    `Evil agencies are real and can act in history, but their authority is bounded. Christ remains the ultimate key-bearer, and the church's safety lies in renewed loyalty to Him and His word.`,
  ],
  'Revelation 10:1': [
    `John sees another mighty angel descending from heaven, clothed with a cloud, crowned with a rainbow, shining like the sun, and standing on feet like pillars of fire. Chapters 10:1-11:14 form a parenthesis between the sixth and seventh trumpets, just as chapter 7 stands between the sixth and seventh seals.`,
    `The SDA Commentary says this mighty angel may be identified as Christ. The cloud, rainbow, sun-like face, and fiery feet recall divine presence, covenant mercy, and the description of the risen Christ in Revelation 1. The identification is compelling, but the wording should remain as careful as the source.`,
    `The heavenly messenger brings the opened prophetic message and governs the experience that follows. The rainbow keeps mercy joined to judgment, while the radiant face and fiery feet place prophetic understanding under divine holiness and authority.`,
    `Prophetic light is entrusted from heaven, not manufactured by human calculation. Even the sweet-bitter experience unfolds beneath the presence of the covenant-keeping Lord who directs His servants to prophesy again.`,
  ],
  'Revelation 11:1': [
    `John receives a reed like a measuring rod and is told to measure the temple of God, the altar, and the worshipers. The action is symbolic rather than architectural. In the biblical background, measuring can promise restoration and preservation while also indicating divine evaluation.`,
    `The temple is the heavenly sanctuary, not a rebuilt temple in Jerusalem. The worshipers are those who direct their faith to the heavenly temple where Christ ministers as High Priest. Because the altar and worshipers are measured together, judgment is presented in the setting of sacrifice, intercession, and God's care.`,
    `The SDA Commentary gives the scene a particular application to the renewed understanding of Christ's ministry in the heavenly sanctuary after 1844. In that historicist setting, the measuring reassures believers that God's plan of redemption and His true worshipers remain secure while heaven distinguishes genuine worship from outward profession.`,
    `God knows those who worship through Christ, preserves His purpose amid conflict, and calls His people to live honestly before the judgment while depending fully on their heavenly High Priest.`,
  ],
  'Revelation 20:10': [
    `The devil who deceived the nations is cast into the lake of fire with the beast and the false prophet. The conflict that began with the serpent's lie reaches its irreversible end.`,
    `The beast and false prophet are symbolic powers, and the language of torment "for ever and ever" expresses the complete and permanent result of divine judgment. In the immediate context, fire devours the wicked and the second death ends life; the SDA Commentary explicitly rejects endless conscious torture.`,
    `The lake of fire consumes rebellion and purifies the earth. Satan will never return to accuse, deceive, or rebuild the systems represented by the beast and false prophet.`,
    `This is a solemn promise, not an invitation to cruelty. Evil is not eternal. God ends it so that the new creation can exist without accusation, coercion, suffering, or fear.`,
  ],
  'Revelation 21:1': [
    `John sees a new heaven and a new earth because the former creation, marred by sin, has passed away. The word translated "new" emphasizes newness in quality. The SDA Commentary understands this as a re-creation from the purified elements of the old, a world made new and no longer scarred by rebellion.`,
    `The statement that there is "no more sea" should first be allowed its plain force. The seas as they are known in the present creation will no longer exist in that form. Although sea imagery elsewhere in Revelation can symbolize peoples or powers, treating the sea as symbolic here would also require the heavens and earth in the same sentence to be symbolic.`,
    `The old order of sin, death, and ruin is removed, and God renews the world He made. New creation is not an escape from embodied life but redeemed life with God in a creation where righteousness dwells.`,
    `Revelation 21 turns judgment into homecoming. After evil has been exposed and removed, the Creator makes all things new and prepares a real dwelling place for His people under the unveiled presence of God and the Lamb.`,
  ],
  'Revelation 22:6': [
    `The angel affirms that the words John has received are faithful and true. Revelation's symbols are not religious fantasy; the prophecy is a trustworthy disclosure from the same God who inspired the prophets.`,
    `The phrase "things which must shortly be done" returns the reader to Revelation 1:1. It expresses God's will that the conflict be brought to its close without needless delay and calls the church to treat the message as present truth rather than remote speculation.`,
    `As in the opening chapter, the certainty of Christ's return is unconditional while the repeated statements of imminence function as conditional promises. They summon every generation to faithful witness and the completion of the gospel commission rather than date-setting.`,
    `The closing vision therefore produces confidence and obedience. God's word can be trusted, Christ's coming can be desired, and His servants can live awake while grace remains the final note of the book.`,
  ],
};

const correctionReasons = {
  'Revelation 1:1': 'Aligned the promise of nearness with the Commentary\'s conditional-imminence explanation.',
  'Revelation 1:7': 'Added the Commentary\'s special-resurrection interpretation for those who pierced Christ.',
  'Revelation 4:1': 'Removed an unsupported chronological inference from the order of John\'s visions.',
  'Revelation 4:4': 'Retained the site\'s angelic identification of the twenty-four elders and clarified their royal-priestly role.',
  'Revelation 5:1': 'Replaced the overextended scroll definition with the Commentary\'s great-controversy record.',
  'Revelation 5:8': 'Retained the site\'s angelic identification of the twenty-four elders.',
  'Revelation 5:9': 'Applied the preferred textual reading "them" consistently with the elders\' angelic identity.',
  'Revelation 6:9': 'Made explicit that the souls under the altar are pictorial, not conscious disembodied spirits.',
  'Revelation 8:1': 'Preserved both Commentary interpretations of the silence and half-hour period.',
  'Revelation 9:1': 'Qualified the star and historicist application as the Commentary does.',
  'Revelation 10:1': 'Changed a categorical Christ identification to the Commentary\'s "may be identified" wording.',
  'Revelation 11:1': 'Aligned the temple with the heavenly sanctuary and the historicist post-1844 application.',
  'Revelation 20:10': 'Clarified final annihilation and rejected endless conscious torment.',
  'Revelation 21:1': 'Restored the Commentary\'s plain reading of "no more sea."',
  'Revelation 22:6': 'Aligned "shortly" with the opening chapter\'s conditional-imminence explanation.',
};

const replacementRules = [
  [/A\.D\. 538[-–]1565/g, 'A.D. 538-1517', 'Corrected the Thyatira period.'],
  [/A\.D\. 1565[-–]1740/g, 'A.D. 1517-1755', 'Corrected the Sardis period.'],
  [/A\.D\. 1740[-–]1844/g, 'A.D. 1755-1844', 'Corrected the Philadelphia period.'],
  [/God's complete covenant-redemptive purpose for history, judgment, inheritance, vindication, and final restoration, opened only by the victorious Lamb\./g, `Heaven's sealed record of significant events in the great controversy, opened only by the victorious Lamb who is Lord of history.`, 'Aligned the sealed scroll symbol.'],
  [/A solemn heavenly hush connected with Christ's return, when heaven's angelic host comes with Him to gather the redeemed\./g, `A solemn heavenly hush understood either as the host accompanying Christ at His return or as heaven waiting in awesome expectation.`, 'Preserved both silence interpretations.'],
  [/A short prophetic interval understood as about seven literal days, pointing to the journey of the redeemed with Christ\./g, `A short interval generally understood by Adventists as about one prophetic week, while another recognized view leaves its length unspecified.`, 'Preserved both half-hour interpretations.'],
  [/Christ appearing as the covenant messenger and Lord of prophecy\./g, `The majestic covenant messenger who may be identified as Christ, the Lord of prophecy and history.`, 'Qualified the mighty angel identification.'],
  [/The removal of the restless, separating realm associated with danger and rebellion\./g, `The seas as known in the present creation will no longer exist in that form as part of God's concrete re-creation of the world.`, 'Restored the plain reading of no more sea.'],
  [/Royal-priestly attendants whose authority is expressed in worship\./g, `Angelic heavenly royal-priestly attendants whose authority is expressed in worship.`, 'Kept the twenty-four elders definitively angelic.'],
  [/Royal-priestly attendants around the throne, clothed and crowned for worship\./g, `Angelic heavenly royal-priestly attendants around the throne, clothed and crowned for worship.`, 'Kept the twenty-four elders definitively angelic.'],
  [/Heavenly royal-priestly worshipers who agree with God's verdict\./g, `Angelic heavenly royal-priestly worshipers who agree with God's verdict.`, 'Kept the twenty-four elders definitively angelic.'],
  [/Heavenly royal-priestly worshipers in God's throne room\./g, `Angelic heavenly royal-priestly worshipers in God's throne room.`, 'Kept the twenty-four elders definitively angelic.'],
  [/Heavenly throne-room worshipers who also help John understand the visions\./g, `Angelic throne-room worshipers who also help John understand the visions.`, 'Kept the twenty-four elders definitively angelic.'],
  [/A heavenly interpreter draws John into understanding the white-robed multitude\./g, `An angelic heavenly interpreter draws John into understanding the white-robed multitude.`, 'Kept the twenty-four elders definitively angelic.'],
  [/The elders have appeared as royal-priestly beings around the throne/g, `The elders are angelic royal-priestly beings who have appeared around the throne`, 'Kept the twenty-four elders definitively angelic.'],
  [/The elders have already functioned as heavenly worshipers who understand and interpret the visions\./g, `The elders have already functioned as angelic heavenly worshipers who understand and interpret the visions.`, 'Kept the twenty-four elders definitively angelic.'],
  [/The living creatures and elders show that this praise is received within the full heavenly worship order\./g, `The living creatures and angelic elders show that this praise is received within the full heavenly worship order.`, 'Kept the twenty-four elders definitively angelic.'],
];

function deepReplace(value, reasons) {
  if (typeof value === 'string') {
    let result = value;
    for (const [pattern, replacement, reason] of replacementRules) {
      if (pattern.test(result)) {
        pattern.lastIndex = 0;
        result = result.replace(pattern, replacement);
        reasons.add(reason);
      }
      pattern.lastIndex = 0;
    }
    return result;
  }
  if (Array.isArray(value)) return value.map((item) => deepReplace(item, reasons));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepReplace(item, reasons)]));
  }
  return value;
}

function pageAt(offset) {
  let page = 1;
  for (let index = 0; index < offset; index += 1) {
    if (sourceText[index] === '\f') page += 1;
  }
  return page;
}

function chapterSource(chapter, verseCount) {
  const chapterPattern = new RegExp(`^CHAPTER ${chapter}$`, 'gm');
  const chapterMatch = chapterPattern.exec(sourceText);
  if (!chapterMatch) throw new Error(`Missing SDA Commentary chapter ${chapter}.`);

  const start = chapterMatch.index;
  const nextChapterPattern = new RegExp(`^CHAPTER ${chapter + 1}$`, 'gm');
  nextChapterPattern.lastIndex = start + chapterMatch[0].length;
  const nextChapterMatch = chapter === 22 ? null : nextChapterPattern.exec(sourceText);
  let end = nextChapterMatch?.index ?? sourceText.length;
  const chapterSlice = sourceText.slice(start, end);
  for (const marker of ['\nADDITIONAL NOTE', '\nELLEN G. WHITE COMMENTS']) {
    const markerIndex = chapterSlice.indexOf(marker);
    if (markerIndex !== -1) end = Math.min(end, start + markerIndex);
  }

  const body = sourceText.slice(start, end);
  const candidates = [];
  const headingPattern = /^(\d{1,2})\.\s+([^\n]+)/gm;
  for (const match of body.matchAll(headingPattern)) {
    const number = Number(match[1]);
    if (number < 1 || number > verseCount) continue;
    candidates.push({
      number,
      heading: match[2].replace(/\s+/g, ' ').trim(),
      offset: start + match.index,
      relativeOffset: match.index,
    });
  }

  const selected = new Map();
  let cursor = -1;
  for (let verse = 1; verse <= verseCount; verse += 1) {
    const exact = candidates.filter((candidate) => candidate.number === verse && candidate.relativeOffset > cursor);
    if (!exact.length) continue;
    const candidate = exact[0];
    selected.set(verse, candidate);
    cursor = candidate.relativeOffset;
  }

  const mappings = [];
  let prior = selected.get(1) || candidates[0];
  for (let verse = 1; verse <= verseCount; verse += 1) {
    const direct = selected.get(verse);
    if (direct) prior = direct;
    if (!prior) throw new Error(`No SDA Commentary source heading for Revelation ${chapter}:${verse}.`);
    mappings.push({
      chapter,
      verse,
      sourceHeadingVerse: prior.number,
      sourceHeading: prior.heading,
      sourcePage: pageAt(prior.offset),
      sourceLine: sourceText.slice(0, prior.offset).split('\n').length,
      sourceBasis: direct ? 'direct' : 'grouped-with-preceding-comment',
    });
  }
  return mappings;
}

function uniqueText(items) {
  const seen = new Set();
  return items.filter((item) => {
    const value = String(item || '').trim();
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function referenceParts(reference) {
  const match = /^Revelation (\d+):(\d+)$/.exec(reference);
  if (!match) throw new Error(`Invalid Revelation reference: ${reference}`);
  return { chapter: Number(match[1]), verse: Number(match[2]) };
}

function noteSymbols(chapterData, reference, reasons) {
  return (chapterData.symbols || [])
    .filter((symbol) => (symbol.references || []).includes(reference))
    .map((symbol) => deepReplace({
      symbol: symbol.symbol,
      meaning: symbol.meaning,
      scriptureReferences: symbol.scriptureReferences || [],
    }, reasons));
}

function auditRiskChecks(entries) {
  const serialized = JSON.stringify(entries);
  const prohibited = [
    ['old Thyatira date', /A\.D\. 538[-–]1565/],
    ['old Sardis date', /A\.D\. 1565[-–]1740/],
    ['old Philadelphia date', /A\.D\. 1740[-–]1844/],
    ['eternal conscious torment', /eternal conscious torment/i],
    ['secret rapture', /secret rapture/i],
    ['literal microchip mark', /mark.{0,80}microchip|microchip.{0,80}mark/i],
    ['earthly millennial reign', /millennial reign.{0,80}on earth/i],
  ];
  for (const [label, pattern] of prohibited) {
    if (pattern.test(serialized)) throw new Error(`Audit failed: ${label} remains in generated notes.`);
  }

  const required = {
    'Revelation 1:1': /conditional promises/i,
    'Revelation 1:7': /special resurrection/i,
    'Revelation 1:10': /Sabbath/i,
    'Revelation 4:4': /angelic heavenly royal-priestly beings/i,
    'Revelation 5:1': /great controversy/i,
    'Revelation 5:9': /redeemed "them"|redeeming "them"|redeemed them/i,
    'Revelation 6:9': /not a view of conscious disembodied spirits/i,
    'Revelation 8:1': /two principal interpretations/i,
    'Revelation 10:1': /may be identified as Christ/i,
    'Revelation 11:1': /heavenly sanctuary[\s\S]*1844/i,
    'Revelation 13:16': /worship|allegiance/i,
    'Revelation 14:7': /judgment|1844/i,
    'Revelation 20:4': /with Christ in heaven|saints.*heaven|heavenly judgment/i,
    'Revelation 20:10': /rejects endless conscious torture/i,
    'Revelation 21:1': /plain force/i,
    'Revelation 22:6': /conditional promises/i,
  };
  for (const [reference, pattern] of Object.entries(required)) {
    const note = entries.find((entry) => entry.reference === reference);
    if (!note || !pattern.test(JSON.stringify(note))) {
      throw new Error(`Audit failed: required SDA alignment is missing for ${reference}.`);
    }
  }
}

mkdirSync(join(root, 'assets', 'commentary'), { recursive: true });
mkdirSync(join(root, 'reports'), { recursive: true });

const allEntries = [];
const reportEntries = [];
const chapterSummaries = [];

for (const chapterData of legacy.chapters) {
  const chapter = chapterData.chapterNumber;
  const verseCount = chapterData.verses.length;
  const sourceMappings = chapterSource(chapter, verseCount);
  const chapterEntries = [];

  for (const rawNote of chapterData.verses) {
    const { verse } = referenceParts(rawNote.verse);
    const reasons = new Set();
    const note = deepReplace(rawNote, reasons);
    const override = alignedReadings[note.verse];
    if (override) reasons.add(correctionReasons[note.verse]);
    const paragraphs = override || uniqueText([
      note.explanation,
      note.historicalBackground,
      note.adventistInsight,
      note.application,
    ]);
    const source = sourceMappings[verse - 1];
    const entry = {
      id: `revelation-${chapter}-${verse}`,
      reference: note.verse,
      chapter,
      verse,
      paragraphs,
      crossReferences: uniqueText(note.crossReferences || []),
      symbols: noteSymbols(chapterData, note.verse, reasons),
      wordNotes: (note.wordNotes || []).map((wordNote) => deepReplace({
        term: wordNote.term,
        explanation: wordNote.explanation,
        scriptureReferences: wordNote.scriptureReferences || [],
      }, reasons)),
      audit: {
        status: reasons.size ? 'corrected-and-aligned' : 'aligned',
        source: sourceTitle,
        sourceBasis: source.sourceBasis,
        sourceHeadingVerse: source.sourceHeadingVerse,
        sourceHeading: source.sourceHeading,
        sourcePage: source.sourcePage,
        sourceLine: source.sourceLine,
        corrections: [...reasons],
      },
    };
    chapterEntries.push(entry);
    allEntries.push(entry);
    reportEntries.push({
      reference: entry.reference,
      status: entry.audit.status,
      sourceBasis: entry.audit.sourceBasis,
      sourceLocator: `Revelation ${chapter}:${entry.audit.sourceHeadingVerse} comment, PDF p. ${entry.audit.sourcePage}, extracted line ${entry.audit.sourceLine}`,
      sourceHeading: entry.audit.sourceHeading,
      corrections: entry.audit.corrections,
    });
  }

  writeFileSync(
    join(root, 'assets', 'commentary', `revelation-${chapter}.json`),
    `${JSON.stringify({ revision, chapter, title: chapterData.title, notes: chapterEntries }, null, 2)}\n`,
  );
  chapterSummaries.push({
    chapter,
    verses: chapterEntries.length,
    directSourceComments: chapterEntries.filter((entry) => entry.audit.sourceBasis === 'direct').length,
    groupedSourceComments: chapterEntries.filter((entry) => entry.audit.sourceBasis !== 'direct').length,
    correctedNotes: chapterEntries.filter((entry) => entry.audit.status === 'corrected-and-aligned').length,
  });
}

if (allEntries.length !== 404) throw new Error(`Expected 404 Revelation verses, found ${allEntries.length}.`);
const uniqueReferences = new Set(allEntries.map((entry) => entry.reference));
if (uniqueReferences.size !== 404) throw new Error(`Expected 404 unique references, found ${uniqueReferences.size}.`);
auditRiskChecks(allEntries);

const correctedEntries = allEntries.filter((entry) => entry.audit.status === 'corrected-and-aligned');
const report = {
  revision,
  generatedAt: new Date().toISOString(),
  source: {
    title: sourceTitle,
    inputFile: basename(sourcePath),
    method: 'Every Revelation verse was mapped to its direct SDA Commentary comment or the preceding grouped comment, then screened with doctrinal quality gates.',
  },
  editorialDecisions: [
    'At the user\'s direction, the twenty-four elders are identified definitively as angelic heavenly royal-priestly beings throughout the published commentary. Revelation 5:9 follows the preferred reading "them" rather than "us."',
  ],
  totals: {
    chapters: chapterSummaries.length,
    verses: allEntries.length,
    directSourceComments: reportEntries.filter((entry) => entry.sourceBasis === 'direct').length,
    groupedSourceComments: reportEntries.filter((entry) => entry.sourceBasis !== 'direct').length,
    correctedNotes: correctedEntries.length,
  },
  chapters: chapterSummaries,
  verses: reportEntries,
};

writeFileSync(join(root, 'reports', 'revelation-verse-audit.json'), `${JSON.stringify(report, null, 2)}\n`);

const markdown = [
  '# Revelation Verse-by-Verse Audit',
  '',
  `- Source: ${sourceTitle}`,
  `- Chapters: ${report.totals.chapters}`,
  `- Verses audited: ${report.totals.verses}`,
  `- Direct verse comments: ${report.totals.directSourceComments}`,
  `- Verses covered by grouped comments: ${report.totals.groupedSourceComments}`,
  `- Notes corrected during this pass: ${report.totals.correctedNotes}`,
  `- Editorial decision: The twenty-four elders are treated definitively as angelic heavenly royal-priestly beings; Revelation 5:9 follows the preferred reading "them."`,
  '',
  '## Method',
  '',
  'Each verse was mapped to the corresponding comment in the uploaded SDA Bible Commentary. Where the source groups multiple verses under one heading, the audit records the preceding source heading. The published note uses a concise paraphrase and locator rather than reproducing the source text.',
  '',
  '## Corrected Notes',
  '',
  ...correctedEntries.map((entry) => `- **${entry.reference}:** ${entry.audit.corrections.join(' ')}`),
  '',
  '## Chapter Coverage',
  '',
  '| Chapter | Verses | Direct | Grouped | Corrected |',
  '|---:|---:|---:|---:|---:|',
  ...chapterSummaries.map((chapter) => `| ${chapter.chapter} | ${chapter.verses} | ${chapter.directSourceComments} | ${chapter.groupedSourceComments} | ${chapter.correctedNotes} |`),
  '',
];
writeFileSync(join(root, 'reports', 'revelation-verse-audit.md'), `${markdown.join('\n')}\n`);

console.log(`Audited ${allEntries.length} verses across ${chapterSummaries.length} chapters.`);
console.log(`Generated ${chapterSummaries.length} commentary bundles and ${correctedEntries.length} corrected notes.`);
console.log(`Report: ${join(root, 'reports', 'revelation-verse-audit.md')}`);
