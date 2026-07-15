import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Source: The Seventh-day Adventist Bible Commentary, vol. 7, Revelation.
// The current static export contains one live exposition card per chapter; this
// script aligns those 22 cards and related study copy without inventing absent
// verse-level notes.
const root = process.cwd();

const alignedReadings = {
  1: [
    `Revelation opens by naming itself an unveiling of Jesus Christ. The title presents the book primarily as a revelation given by Christ, while the whole prophecy also reveals Him in His heavenly ministry after the ascension. It is not a sealed riddle. God gave it so His servants could hear, understand, and keep its message.`,
    `The chain of communication gives the prophecy its authority: God gives the revelation to Christ, Christ sends it through His angel, and John bears witness to the church. The phrase "signified it" also prepares the reader for a book communicated through signs, symbols, scenes, and the language of earlier Scripture. Those symbols invite careful study rather than uncontrolled speculation.`,
    `The promise that these things must "shortly come to pass" expresses God's will that the conflict with sin be brought to its close without needless delay. The SDA Commentary treats the repeated statements of nearness as conditional promises rather than failed predictions: Christ would have come sooner if the church had completed its gospel commission. The certainty of the Second Coming is unconditional, while its repeated imminence calls every generation of believers to finish the work entrusted to it.`,
    `The verse therefore joins hope with responsibility. Revelation is from Jesus, reveals Jesus, and shows His servants how to live faithfully while His saving purpose moves toward completion. The book begins not with beasts or plagues, but with the God who speaks and the Christ who makes His work known.`,
  ],
  3: [
    `Christ addresses Sardis as the One who has the seven Spirits of God and the seven stars. Those titles answer the church's condition before the rebuke is spoken. Sardis has a reputation for life, yet Christ calls it dead. The church needs the fullness of the Spirit, not the memory of earlier vitality, and it remains under the authority of the Lord who holds its messengers in His hand.`,
    `The city of Sardis had been famous for wealth and apparent security, yet it had suffered sudden defeat when watchfulness failed. That history sharpens Christ's diagnosis. A respected name, an inherited confession, or an impressive past cannot substitute for present spiritual life.`,
    `In the historicist application used by the SDA Commentary, Sardis represents the church toward the close of the Reformation period, approximately A.D. 1517 to 1755. The Reformers recovered vital truth, but many later Protestant bodies settled into rigid creeds, state protection, and formal religion. Rationalism also contributed to the spiritual coldness that marked much of the period.`,
    `Christ's diagnosis is an act of mercy. He refuses to let His people confuse reputation with life. The same Lord who exposes death possesses the Spirit who gives life, so Sardis is summoned to wakefulness, renewed obedience, and dependence on God rather than inherited prestige.`,
  ],
  4: [
    `After the messages to the seven churches, John sees a door standing open in heaven and hears again the trumpet-like voice that introduced his first vision. The words "after this" mark the order in which the visions were shown to John; they do not establish a chronological relationship between the final events of chapters 1-3 and the throne-room scene that follows.`,
    `The open door gives John a symbolic view into the throne room of the universe. He does not force heaven open by curiosity. The invitation comes from God, and the imagery that follows communicates heavenly realities through prophetic symbols. Revelation therefore directs the church from its earthly condition to the divine throne from which history is understood.`,
    `The phrase "things which must be hereafter" is likewise spoken from John's own time, not necessarily from the completion of the preceding vision. Chapters 4 and 5 prepare the reader for the Lamb and the sealed scroll by showing that the conflict on earth remains under heaven's authority.`,
    `Before believers ask what will happen, Revelation shows where history is governed. The open door is a gift of orientation: God has not abandoned His church, and the throne remains secure while Christ discloses what His servants need in order to be faithful.`,
  ],
  5: [
    `John sees a scroll in the right hand of the One seated on the throne. It is written within and on the back and sealed with seven seals. The writing on both sides suggests a record so full that scarcely any space remains, while the seven seals show that it is completely sealed until the worthy One opens it.`,
    `The SDA Commentary identifies the scroll as containing a record of significant events in the great controversy, including the rejection of Christ. As the seals are opened, John is shown successive phases in the history of the church and the conflict between good and evil. The scroll should therefore be read as heaven's authoritative record and disclosure of that controversy, not as a timetable invented by human speculation.`,
    `Only the Lamb can open the scroll. His worthiness means that He is the conqueror in the controversy and the Lord of history. The frightening scenes that follow remain under the authority of the One who was slain and now stands before the throne.`,
    `For the church, the sealed scroll teaches patient trust. History is not ownerless or unreadable to God. Its record rests in His hand, and Christ alone discloses its meaning and carries the controversy toward the final vindication of God's character.`,
  ],
  8: [
    `When the Lamb opens the seventh seal, heaven falls silent for about half an hour. The contrast is striking because the throne room has previously been filled with praise. The silence is solemn, but the text does not require the reader to reduce it to only one explanation.`,
    `The SDA Commentary records two principal interpretations. One understands the silence as the result of heaven's hosts accompanying Christ to earth at the Second Coming. The other understands it as a hush of awesome expectation, forming a bridge from the seals to the trumpet visions and indicating that more remains to be disclosed about the great controversy. Both readings keep the scene centered on the completion of God's purpose.`,
    `The "half an hour" has likewise been understood in two ways. Applying the prophetic day-for-a-year principle yields approximately one literal week, and Seventh-day Adventists have generally favored that view. Other interpreters understand the phrase simply as a short, unspecified period because Scripture gives no unambiguous rule for applying prophetic time to a fraction smaller than a day. The wording should therefore be handled with conviction and humility rather than made a test of faith.`,
    `The seventh seal calls believers to reverence and readiness. Whether the silence pictures heaven emptied for Christ's return or heaven waiting in awe, the Lamb remains in command and the sealed people of God can trust the purpose unfolding from His throne.`,
  ],
  9: [
    `The fifth trumpet begins with a star already fallen to the earth. Because the text says that a key was given "to him," the star is presented as a personal agency rather than an ordinary meteor. The received key also shows that this power is delegated and limited; it does not possess independent authority over the abyss.`,
    `The image of a fallen star has long been associated with Satan, and the dark character of the abyss supports that connection. Yet the vision keeps the focus on divine sovereignty: the key is given by a higher authority, so the destructive power released under the trumpet is never equal to Christ.`,
    `A historicist line of interpretation, noted in the SDA Commentary, connects the fifth and sixth trumpets with the Saracens and Turks. In that application the abyss can represent the Arabian deserts from which the followers of Mohammed advanced, while the wider symbol still portrays a permitted judgment on a compromised Christian world. This is an interpretive application of the imagery, not permission to despise people or treat ancestry as guilt.`,
    `The verse therefore warns against spiritual darkness without surrendering hope. Evil agencies are real and can act in history, but their authority is bounded. Christ remains the ultimate key-bearer, and the church's safety lies in renewed loyalty to Him and His word.`,
  ],
  10: [
    `John sees another mighty angel descending from heaven, clothed with a cloud, crowned with a rainbow, shining like the sun, and standing on feet like pillars of fire. Chapters 10:1-11:14 form a parenthesis between the sixth and seventh trumpets, just as chapter 7 stands between the sixth and seventh seals.`,
    `The SDA Commentary says this mighty angel may be identified as Christ. The cloud, rainbow, sun-like face, and fiery feet recall divine presence, covenant mercy, and the description of the risen Christ in Revelation 1. The identification is compelling, but the wording should remain as careful as the source rather than claiming more than the vision explicitly states.`,
    `As Lord of history, the heavenly messenger brings the opened prophetic message and governs the experience that follows. The rainbow keeps mercy joined to judgment, while the radiant face and fiery feet place prophetic understanding under the holiness and authority of Christ.`,
    `The chapter therefore begins with divine initiative rather than human calculation. Prophetic light is entrusted from heaven, and even the sweet-bitter experience unfolds beneath the presence of the covenant-keeping Lord who directs His servants to prophesy again.`,
  ],
  11: [
    `John receives a reed like a measuring rod and is told to measure the temple of God, the altar, and the worshipers. The action is symbolic rather than architectural. In the biblical background, measuring can promise restoration and preservation while also indicating divine evaluation.`,
    `The temple is the heavenly sanctuary, not a rebuilt temple in Jerusalem. The worshipers are those who direct their faith to the heavenly temple where Christ ministers as High Priest. Because the altar and worshipers are measured together, judgment is presented in the setting of sacrifice, intercession, and God's care for His people.`,
    `The SDA Commentary gives the scene a particular application to the renewed understanding of Christ's ministry in the heavenly sanctuary after 1844. In that historicist setting, the measuring reassures believers that God's plan of redemption and His true worshipers remain secure while heaven distinguishes genuine worship from outward profession.`,
    `The verse joins doctrine with devotion. God knows those who worship through Christ, preserves His purpose amid conflict, and calls His people to live honestly before the judgment while depending fully on their heavenly High Priest.`,
  ],
  21: [
    `John sees a new heaven and a new earth because the former creation, marred by sin, has passed away. The word translated "new" emphasizes newness in quality. The SDA Commentary understands this as a re-creation from the purified elements of the old, a world made new and no longer scarred by rebellion.`,
    `The statement that there is "no more sea" should first be allowed its plain force. The seas as they are known in the present creation will no longer exist in that form. Although sea imagery elsewhere in Revelation can symbolize peoples or powers, treating the sea as symbolic here would also require the heavens and earth in the same sentence to be symbolic.`,
    `The theological hope remains profound without replacing the text's concrete promise. The old order of sin, death, and ruin is removed, and God renews the world He made. New creation is not an escape from embodied life but redeemed life with God in a creation where righteousness dwells.`,
    `Revelation 21 therefore turns judgment into homecoming. After evil has been exposed and removed, the Creator makes all things new and prepares a real dwelling place for His people under the unveiled presence of God and the Lamb.`,
  ],
};

const symbolReplacements = {
  5: [
    'God\'s complete covenant-redemptive purpose for history, judgment, inheritance, vindication, and final restoration, opened only by the victorious Lamb.',
    'Heaven\'s sealed record of significant events in the great controversy, opened only by the victorious Lamb who is Lord of history.',
  ],
  8: [
    'A solemn heavenly hush connected with Christ\'s return, when heaven\'s angelic host comes with Him to gather the redeemed.',
    'A solemn heavenly hush understood either as the host accompanying Christ at His return or as heaven waiting in awesome expectation.',
  ],
  9: [
    'A fallen personal agency permitted to open a dark realm of judgment.',
    'A fallen personal agency, commonly associated with Satan, whose authority to open the abyss is permitted and limited.',
  ],
  10: [
    'Christ appearing as the covenant messenger and Lord of prophecy.',
    'The majestic covenant messenger who may be identified as Christ, the Lord of prophecy and history.',
  ],
  21: [
    'God\'s renewed creation after the old order passes away.',
    'God\'s renewed creation, made new in quality after the sin-marred order passes away.',
  ],
};

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
}

for (const [chapter, paragraphs] of Object.entries(alignedReadings)) {
  const path = join(root, 'revelation', chapter, 'index.html');
  let html = readFileSync(path, 'utf8');
  const readingPattern = /<div class="commentary-reading">[\s\S]*?<\/div>(?=<section class="verse-study-card")/;
  if (!readingPattern.test(html)) {
    throw new Error(`Could not find commentary reading in ${path}`);
  }

  const reading = `<div class="commentary-reading">${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`;
  html = html.replace(readingPattern, reading);

  const symbolReplacement = symbolReplacements[chapter];
  if (symbolReplacement) {
    const [before, after] = symbolReplacement;
    const escapedBefore = escapeHtml(before);
    const escapedAfter = escapeHtml(after);
    if (!html.includes(escapedBefore) && !html.includes(escapedAfter)) {
      throw new Error(`Could not find symbol description in ${path}`);
    }
    html = html.replace(escapedBefore, escapedAfter);
  }

  writeFileSync(path, html);
}

const fileReplacements = {
  'revelation/1/index.html': [
    [
      'The word gives urgency to the prophecy. It begins in the church&#x27;s real history and moves toward the end under Christ&#x27;s authority.',
      'The word expresses God&#x27;s will that Christ return without needless delay. Its nearness functions as a conditional promise that summons the church to complete its gospel work.',
    ],
  ],
  'revelation/5/index.html': [
    [
      'The sealed scroll represents God&#x27;s complete covenant-redemptive purpose for history, judgment, inheritance, vindication, and final restoration, opened only by Christ, whose sacrificial victory gives Him authority over worship and the future of His people.',
      'The sealed scroll contains heaven&#x27;s record of significant events in the great controversy, opened only by Christ, whose sacrificial victory makes Him Lord of history.',
    ],
    [
      'God&#x27;s complete covenant-redemptive purpose for history and restoration.',
      'Heaven&#x27;s sealed record of significant events in the great controversy, disclosed by Christ as Lord of history.',
    ],
  ],
  'revelation/8/index.html': [
    [
      'The final seal completes the seal sequence by pointing to Christ&#x27;s visible return and the gathering of the sealed redeemed.',
      'The final seal completes the sequence with a solemn silence interpreted either in connection with Christ&#x27;s return or as heaven&#x27;s awesome expectation.',
    ],
    [
      'A holy hush connected with the Second Coming, when Christ comes with the angelic host to gather His people.',
      'A holy hush understood either as the angelic host accompanying Christ at His return or as heaven waiting in awesome expectation.',
    ],
    [
      'In prophetic time, half an hour is one forty-eighth of a prophetic day, about seven and a half literal days, or about one week.',
      'Adventists have generally understood the period as about one literal week by prophetic time; another recognized view takes it as a short, unspecified interval.',
    ],
  ],
  'revelation/10/index.html': [
    [
      'A heavenly messenger figure whose description identifies Christ acting as Lord of prophecy.',
      'A heavenly messenger whose description strongly supports, without requiring, identification with Christ as Lord of prophecy.',
    ],
  ],
  'revelation/21/index.html': [
    [
      'The removal of the restless, separating realm associated with danger and rebellion.',
      'The seas as known in the present creation will no longer exist in that form; this is part of God&#x27;s concrete re-creation of the world.',
    ],
    ['Isaiah 57:20', '2 Peter 3:13'],
    ['Revelation 13:1', 'Revelation 21:5'],
  ],
  'timeline/seven-churches/index.html': [
    ['A.D. 538-1565', 'A.D. 538-1517'],
    ['A.D. 1565-1740', 'A.D. 1517-1755'],
    ['A.D. 1740-1844', 'A.D. 1755-1844'],
  ],
  'articles/throne-scroll-and-lamb/index.html': [
    [
      'the slain Lamb as the only One worthy to open history&#x27;s redemptive purpose.',
      'the slain Lamb as the only One worthy to open heaven&#x27;s sealed record of the great controversy.',
    ],
    [
      '<p>The scroll in the right hand of the One on the throne is not merely a list of future events. It represents God&#x27;s complete covenant-redemptive purpose for history: judgment, inheritance, vindication, and final restoration. It is written within and on the back, sealed with seven seals, and held by the Father. Nothing about it is partial or accidental. The fullness of God&#x27;s purpose is there, but it cannot be opened by created power.</p>',
      '<p>The scroll in the right hand of the One on the throne contains heaven&#x27;s full record of significant events in the great controversy, including humanity&#x27;s rejection of Christ. It is written within and on the back, sealed with seven seals, and held by the Father. The full record cannot be opened by created power.</p>',
    ],
    [
      '<p>John weeps because no one in heaven, on earth, or under the earth is found worthy to open the scroll or look into it. The crisis is not a lack of information but a lack of worthiness. If the scroll remains closed, history&#x27;s purpose remains unexecuted. The saints are not vindicated, evil is not judged, and the inheritance is not brought to completion.</p>',
      '<p>John weeps because no one in heaven, on earth, or under the earth is found worthy to open the scroll or look into it. The crisis is not a lack of information but a lack of worthiness. Only Christ can disclose the record because He has conquered in the controversy and is Lord of history.</p>',
    ],
  ],
};

for (const [relativePath, replacements] of Object.entries(fileReplacements)) {
  const path = join(root, relativePath);
  let html = readFileSync(path, 'utf8');
  for (const [before, after] of replacements) {
    if (!html.includes(before) && !html.includes(after)) {
      throw new Error(`Could not find source or aligned text in ${path}: ${before.slice(0, 80)}`);
    }
    html = html.replaceAll(before, after);
  }
  writeFileSync(path, html);
}

console.log(`Aligned ${Object.keys(alignedReadings).length} live Revelation notes and related study text to the SDA Commentary.`);
