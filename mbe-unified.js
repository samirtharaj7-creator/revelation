(() => {
  const tool = "revelation";
  const headerMarkup = "<header class=\"mbe-global-shell\" data-tool=\"revelation\" data-embedded=\"true\">\n      <div class=\"mbe-shell-wrap\">\n        <div class=\"mbe-ribbon-left\">\n          <a class=\"mbe-ribbon-brand\" href=\"https://mybibleexplorer.com\" aria-label=\"My Bible Explorer home\"><img class=\"mbe-ribbon-logo\" src=\"https://mybibleexplorer.com/assets/my-bible-explorer-logo.png?v=mbe-20260715-1\" alt=\"My Bible Explorer\" width=\"107\" height=\"34\"></a>\n          <a class=\"mbe-ribbon-back\" href=\"https://mybibleexplorer.com/#journeys\">Back to Library</a>\n        </div>\n        <nav class=\"mbe-global-nav\" aria-label=\"My Bible Explorer\">\n          <details class=\"mbe-library-menu\">\n            <summary class=\"mbe-library-toggle\">Library</summary>\n            <div class=\"mbe-library-panel\">\n              <div class=\"mbe-library-grid\">\n            <a class=\"mbe-library-item\" href=\"https://hermeneutics.mybibleexplorer.com\"><span class=\"mbe-library-name\">Hermeneutics</span><span class=\"mbe-library-desc\">Learn to read Scripture faithfully</span></a>\n            <a class=\"mbe-library-item\" href=\"https://psalms.mybibleexplorer.com\"><span class=\"mbe-library-name\">Psalms</span><span class=\"mbe-library-desc\">Worship, lament, praise, and prayer</span></a>\n            <a class=\"mbe-library-item\" href=\"https://sanctuary.mybibleexplorer.com/#structure\"><span class=\"mbe-library-name\">Sanctuary</span><span class=\"mbe-library-desc\">A blueprint of salvation</span></a>\n            <a class=\"mbe-library-item\" href=\"https://lastdayevents.mybibleexplorer.com/index.html\"><span class=\"mbe-library-name\">Last Day Events</span><span class=\"mbe-library-desc\">Earth's final chapter</span></a>\n            <a class=\"mbe-library-item\" href=\"https://parables.mybibleexplorer.com\"><span class=\"mbe-library-name\">Parables</span><span class=\"mbe-library-desc\">Stories of the kingdom</span></a>\n            <a class=\"mbe-library-item\" href=\"https://romans.mybibleexplorer.com\"><span class=\"mbe-library-name\">Romans</span><span class=\"mbe-library-desc\">Righteousness by faith and life in the Spirit</span></a>\n            <a class=\"mbe-library-item\" href=\"https://corinthians.mybibleexplorer.com/\"><span class=\"mbe-library-name\">Corinthians</span><span class=\"mbe-library-desc\">Unity, worship, holy living, and resurrection</span></a>\n            <a class=\"mbe-library-item\" href=\"https://hebrews.mybibleexplorer.com/\"><span class=\"mbe-library-name\">Hebrews</span><span class=\"mbe-library-desc\">Christ, covenant, sanctuary, and persevering faith</span></a>\n            <a class=\"mbe-library-item\" href=\"https://isaiah.mybibleexplorer.com/\"><span class=\"mbe-library-name\">Isaiah</span><span class=\"mbe-library-desc\">Judgment, comfort, and gospel hope</span></a>\n            <a class=\"mbe-library-item\" href=\"https://daniel.mybibleexplorer.com\"><span class=\"mbe-library-name\">Daniel</span><span class=\"mbe-library-desc\">Prophecy and providence</span></a>\n            <a class=\"mbe-library-item\" href=\"https://revelation.mybibleexplorer.com/\" aria-current=\"page\"><span class=\"mbe-library-name\">Revelation</span><span class=\"mbe-library-desc\">Symbols, judgment, and final hope</span></a>\n            <a class=\"mbe-library-item\" href=\"https://christ.mybibleexplorer.com/\"><span class=\"mbe-library-name\">Life of Christ</span><span class=\"mbe-library-desc\">The life and ministry of Jesus</span></a>\n              </div>\n            </div>\n          </details>\n          <a class=\"mbe-ribbon-give\" href=\"https://mybibleexplorer.com/#donate\">Support</a>\n        </nav>\n      </div>\n    </header>";
  const footerMarkup = "<footer class=\"mbe-global-footer\" data-tool=\"revelation\">\n      <div class=\"mbe-shell-wrap mbe-footer-wrap\">\n        <a class=\"mbe-footer-brand\" href=\"https://mybibleexplorer.com\" aria-label=\"My Bible Explorer home\"><img class=\"mbe-footer-logo\" src=\"https://mybibleexplorer.com/assets/my-bible-explorer-logo.png?v=mbe-20260715-1\" alt=\"My Bible Explorer\" width=\"107\" height=\"34\"></a>\n        <span>Know the Word. Live the Word.</span>\n        <span>To contact, email <a class=\"mbe-footer-link\" href=\"mailto:admin@mybibleexplorer.com\">admin@mybibleexplorer.com</a></span>\n        <a class=\"mbe-footer-link\" href=\"https://mybibleexplorer.com/#donate\">Support</a>\n        <span>&copy; <span data-mbe-year></span> My Bible Explorer</span>\n      </div>\n    </footer>\n    ";
  const readerFooterMarkup = "<footer class=\"mbe-reader-footer\" data-mbe-reader-footer aria-hidden=\"true\">\n      <div class=\"mbe-reader-footer-inner\">\n        <a class=\"mbe-reader-footer-brand\" href=\"https://mybibleexplorer.com\" aria-label=\"My Bible Explorer home\"><img class=\"mbe-reader-footer-logo\" src=\"https://mybibleexplorer.com/assets/my-bible-explorer-logo.png?v=mbe-20260715-1\" alt=\"My Bible Explorer\" width=\"107\" height=\"34\"></a>\n        <span class=\"mbe-reader-footer-tagline\">Know the Word. Live the Word.</span>\n        <span class=\"mbe-reader-footer-contact\">To contact, email <a class=\"mbe-reader-footer-link\" href=\"mailto:admin@mybibleexplorer.com\">admin@mybibleexplorer.com</a></span>\n        <a class=\"mbe-reader-footer-link\" href=\"https://mybibleexplorer.com/#donate\">Support</a>\n        <span class=\"mbe-reader-footer-copy\">&copy; <span data-mbe-year></span> My Bible Explorer</span>\n      </div>\n    </footer>\n    ";

  function updateYear() {
    document.querySelectorAll('[data-mbe-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function isDesktopReaderViewport() {
    return Boolean(window.matchMedia && window.matchMedia('(min-width: 1024px)').matches);
  }

  function removeReaderFooter() {
    document.querySelectorAll('.mbe-reader-pane-footer, .mbe-reader-footer').forEach((node) => node.remove());
    document.documentElement.classList.remove('mbe-reader-footer-visible');
    document.body?.classList.remove('mbe-reader-footer-visible');
  }

  function readerScrollPanes() {
    const panes = Array.from(document.querySelectorAll('.scripture-pane, .scripture-pane-body, .commentary-pane, .commentary-pane-body'));
    return Array.from(new Set(panes)).filter((pane) => pane.scrollHeight > pane.clientHeight + 4);
  }

  function readerPaneAtBottom(pane) {
    if (!pane) return false;
    const tolerance = document.body?.classList.contains('mbe-reader-footer-visible') ? 112 : 4;
    return pane.scrollHeight - pane.scrollTop - pane.clientHeight <= tolerance;
  }

  function setReaderFooterVisible(footer, visible) {
    document.documentElement.classList.toggle('mbe-reader-footer-visible', visible);
    document.body?.classList.toggle('mbe-reader-footer-visible', visible);
    if (footer) footer.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  function updateReaderFooterState() {
    const footer = document.querySelector('.mbe-reader-footer');
    const readerShell = document.querySelector('.split-reader');
    if (!footer || !readerShell || !isDesktopReaderViewport()) {
      window.__mbeReaderFooterSuppress = false;
      setReaderFooterVisible(footer, false);
      return;
    }

    const panes = readerScrollPanes();
    const bottomPanes = panes.filter(readerPaneAtBottom);
    if (bottomPanes.length === 0) window.__mbeReaderFooterSuppress = false;
    const shouldShow = bottomPanes.length > 0 && !window.__mbeReaderFooterSuppress;
    const wasShown = document.body.classList.contains('mbe-reader-footer-visible');

    setReaderFooterVisible(footer, shouldShow);

    if (shouldShow && !wasShown) {
      const keepBottomPanesPinned = () => {
        bottomPanes.forEach((pane) => pane.scrollTo({ top: pane.scrollHeight, behavior: 'auto' }));
      };
      window.requestAnimationFrame(keepBottomPanesPinned);
      window.setTimeout(keepBottomPanesPinned, 90);
      window.setTimeout(keepBottomPanesPinned, 260);
    }
  }

  function handleReaderFooterWheel(event) {
    if (event.deltaY < 0 && document.body.classList.contains('mbe-reader-footer-visible')) {
      window.__mbeReaderFooterSuppress = true;
      setReaderFooterVisible(document.querySelector('.mbe-reader-footer'), false);
      return;
    }

    if (event.deltaY > 0) {
      window.__mbeReaderFooterSuppress = false;
      window.requestAnimationFrame(updateReaderFooterState);
    }
  }

  function installReaderFooterListeners() {
    readerScrollPanes().forEach((pane) => {
      if (pane.dataset.mbeReaderFooterListener === 'true') return;
      pane.dataset.mbeReaderFooterListener = 'true';
      pane.addEventListener('scroll', updateReaderFooterState, { passive: true });
      pane.addEventListener('wheel', handleReaderFooterWheel, { passive: true });
    });
    if (!window.__mbeReaderFooterResizeListener) {
      window.__mbeReaderFooterResizeListener = true;
      window.addEventListener('resize', updateReaderFooterState, { passive: true });
    }
  }

  function ensureReaderFooter() {
    document.querySelectorAll('.mbe-reader-pane-footer').forEach((node) => node.remove());
    if (!isDesktopReaderViewport()) {
      removeReaderFooter();
      return;
    }

    const readerPage = document.querySelector('.reader-page');
    const splitReader = document.querySelector('.split-reader');
    if (!readerPage || !splitReader) return;

    let footer = readerPage.querySelector('.mbe-reader-footer');
    if (!footer) {
      splitReader.insertAdjacentHTML('afterend', readerFooterMarkup);
      footer = readerPage.querySelector('.mbe-reader-footer');
    } else if (footer.previousElementSibling !== splitReader) {
      splitReader.insertAdjacentElement('afterend', footer);
    }

    installReaderFooterListeners();
    updateReaderFooterState();
    updateYear();
  }

  function ensureIllustratedAssets() {
    if (!document.head) return;
    const href = '/revelation-site.css?v=rvx-93';
    let link = document.querySelector('link[data-rvx="css"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-rvx', 'css');
      document.head.appendChild(link);
    }
    if (link.getAttribute('href') !== href) link.href = href;
  }

  const SCRIPTURE_EMBLEM =
    '<g>' +
    '<line x1="50" y1="30" x2="50" y2="20"></line>' +
    '<line x1="42" y1="31.5" x2="38.5" y2="22.5"></line>' +
    '<line x1="58" y1="31.5" x2="61.5" y2="22.5"></line>' +
    '<line x1="35" y1="35" x2="28.5" y2="28.5"></line>' +
    '<line x1="65" y1="35" x2="71.5" y2="28.5"></line>' +
    '</g>' +
    '<path d="M50 47 q-13 -6 -24 -3 v27 q11 -3 24 3"></path>' +
    '<path d="M50 47 q13 -6 24 -3 v27 q-11 -3 -24 3"></path>' +
    '<line x1="50" y1="47" x2="50" y2="77"></line>' +
    '<path d="M32 55 q8 -2 15 1 M32 61 q8 -2 15 1 M53 56 q8 -3 15 0 M53 62 q8 -3 15 0"></path>';

  function ensureLogo() {
    const svg = document.querySelector('.reader-logo svg');
    if (!svg || svg.getAttribute('data-rvx-logo') === 'scripture') return;
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('stroke-width', '5');
    svg.setAttribute('data-rvx-logo', 'scripture');
    svg.innerHTML = SCRIPTURE_EMBLEM;
  }

  function ensureHomeHero() {
    if (window.location.pathname !== '/') return;
    const title = document.querySelector('.home-showcase-copy h1');
    if (title) {
      title.setAttribute('aria-label', 'The Book of Revelation');
      title.innerHTML = '<span class="home-title-kicker">The Book of</span><span class="home-title-main">Revelation</span>';
    }
    const description = document.querySelector('.home-showcase-description');
    if (description) {
      description.textContent = 'Enter Revelation, where the risen Christ walks among His churches, the Lamb governs history, false worship is judged, and God’s faithful people inherit a world made new.';
    }
    const context = document.querySelector('.home-showcase-context');
    if (!context) return;
    const paragraphs = context.querySelectorAll('p');
    if (paragraphs[0]) paragraphs[0].textContent = 'Revelation unveils Jesus as the Lamb who reigns and restores all things.';
    if (paragraphs[1]) {
      paragraphs[1].textContent = 'From Patmos to the New Jerusalem, follow worship, witness, judgment, the fall of Babylon, and the hope of a world made new.';
    }
    const metaBlock = context.querySelector('div:last-child');
    if (metaBlock && !metaBlock.classList.contains('home-showcase-rule')) {
      metaBlock.remove();
    }
  }

  function ensureIntroductionHero() {
    if (!window.location.pathname.replace(/\/+$/, '/').endsWith('/introduction/')) return;
    const title = document.querySelector('#introduction-title');
    if (!title || title.getAttribute('data-rvx-intro-title') === 'split') return;
    title.setAttribute('aria-label', 'Introduction to the Book of Revelation');
    title.setAttribute('data-rvx-intro-title', 'split');
    title.innerHTML = '<span class="background-title-kicker">Introduction to the Book of</span><span class="background-title-main">Revelation</span>';
  }

  const SHORT_CHAPTER_SUMMARIES = {
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
    22: "Revelation 22 closes with the river of life, the tree of life, and Christ's promise to come quickly. The final invitation is to receive the water of life freely."
  };

  let summaryObserver = null;
  let summaryTickQueued = false;

  function currentChapterNumber() {
    const match = window.location.pathname.match(/^\/revelation\/(\d+)\/?$/);
    if (!match) return null;
    const chapter = Number(match[1]);
    return Number.isInteger(chapter) ? chapter : null;
  }

  const COMMENTARY_REVISION = 'rvx-93';
  const commentaryBundles = new Map();
  let verseCommentaryBound = false;
  let commentaryRenderToken = 0;
  let scriptureReferencePreviewBound = false;
  let scriptureReferencePreviewRequest = null;
  let scriptureReferencePreviewToken = 0;
  let scriptureReferencePreviewChip = null;

  function commentaryEscape(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function commentaryReferenceChips(references, className) {
    return (references || [])
      .map((reference) =>
        `<span class="${className}" tabindex="0" data-scripture-reference="${commentaryEscape(reference)}" aria-label="Preview ${commentaryEscape(reference)}">${commentaryEscape(reference)}</span>`
      )
      .join('');
  }

  function commentarySymbolMarkup(symbol) {
    const references = commentaryReferenceChips(symbol.scriptureReferences, 'symbol-reference-chip');
    return '<article class="symbol-note">' +
      '<div class="symbol-note-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles h-3.5 w-3.5" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>' + commentaryEscape(symbol.symbol) + '</div>' +
      `<p>${commentaryEscape(symbol.meaning)}</p>` +
      (references ? `<div class="symbol-reference-list" aria-label="${commentaryEscape(symbol.symbol)} Scripture references">${references}</div>` : '') +
      '</article>';
  }

  function commentaryWordMarkup(wordNote) {
    const references = commentaryReferenceChips(wordNote.scriptureReferences, 'word-reference-chip');
    return '<article class="word-note">' +
      `<div class="word-note-title">${commentaryEscape(wordNote.term)}</div>` +
      `<p>${commentaryEscape(wordNote.explanation)}</p>` +
      (references ? `<div class="word-reference-list" aria-label="${commentaryEscape(wordNote.term)} Scripture references">${references}</div>` : '') +
      '</article>';
  }

  function commentaryStudyMarkup(note) {
    const crossReferences = commentaryReferenceChips(note.crossReferences, 'reference-chip');
    const symbols = (note.symbols || []).map(commentarySymbolMarkup).join('');
    const wordNotes = (note.wordNotes || []).map(commentaryWordMarkup).join('');
    return '<section class="verse-study-card" aria-label="Cross references, symbols, and word notes">' +
      '<div class="verse-study-card-header"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library h-4 w-4" aria-hidden="true"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>Study Links</div>' +
      '<div class="verse-study-grid">' +
      '<div class="study-card-section"><h3>Cross References</h3>' +
      (crossReferences ? `<div class="reference-chip-list">${crossReferences}</div>` : '<p class="study-card-empty">No verse-specific cross references added yet.</p>') +
      '</div>' +
      '<div class="study-card-section"><h3>Symbols</h3>' +
      (symbols ? `<div class="symbol-note-list">${symbols}</div>` : '<p class="study-card-empty">No verse-specific symbols added yet.</p>') +
      '</div>' +
      '<div class="study-card-section study-card-section-wide"><h3>Word / Phrase Notes</h3>' +
      (wordNotes ? `<div class="word-note-list">${wordNotes}</div>` : '<p class="study-card-empty">No verse-specific word notes added yet.</p>') +
      '</div></div></section>';
  }

  function commentaryArticleMarkup(note) {
    const paragraphs = (note.paragraphs || [])
      .map((paragraph) => `<p>${commentaryEscape(paragraph)}</p>`)
      .join('');
    return `<article class="exposition-card" data-rvx-commentary="${commentaryEscape(note.id)}" data-audit-status="${commentaryEscape(note.audit?.status || 'aligned')}">` +
      `<div class="exposition-card-heading"><h2>${commentaryEscape(note.reference)}</h2></div>` +
      `<div class="commentary-reading">${paragraphs}</div>` +
      commentaryStudyMarkup(note) +
      '</article>';
  }

  function loadCommentaryBundle(chapter) {
    if (commentaryBundles.has(chapter)) return commentaryBundles.get(chapter);
    const request = fetch(`/assets/commentary/revelation-${chapter}.json?v=${COMMENTARY_REVISION}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load Revelation ${chapter} commentary (${response.status}).`);
        return response.json();
      })
      .then((bundle) => {
        if (bundle.chapter !== chapter || !Array.isArray(bundle.notes)) {
          throw new Error(`Invalid Revelation ${chapter} commentary bundle.`);
        }
        return bundle;
      })
      .catch((error) => {
        commentaryBundles.delete(chapter);
        throw error;
      });
    commentaryBundles.set(chapter, request);
    return request;
  }

  function loadScriptureReferencePreviews() {
    if (scriptureReferencePreviewRequest) return scriptureReferencePreviewRequest;
    scriptureReferencePreviewRequest = fetch(`/assets/commentary/kjv-reference-previews.json?v=${COMMENTARY_REVISION}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load KJV reference previews (${response.status}).`);
        return response.json();
      })
      .then((payload) => {
        if (!payload?.references || !payload?.verses) throw new Error('Invalid KJV reference preview data.');
        return payload;
      })
      .catch((error) => {
        scriptureReferencePreviewRequest = null;
        throw error;
      });
    return scriptureReferencePreviewRequest;
  }

  function scriptureReferencePreviewElement() {
    let preview = document.querySelector('[data-scripture-reference-preview]');
    if (preview || !document.body) return preview;
    preview = document.createElement('aside');
    preview.className = 'scripture-reference-preview';
    preview.id = 'scripture-reference-preview';
    preview.setAttribute('data-scripture-reference-preview', '');
    preview.setAttribute('role', 'tooltip');
    preview.setAttribute('aria-hidden', 'true');
    preview.hidden = true;
    document.body.appendChild(preview);
    return preview;
  }

  function positionScriptureReferencePreview(preview, chip) {
    const anchor = chip.getBoundingClientRect();
    const gap = 10;
    const edge = 16;
    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    let left = anchor.left;
    if (left + width > window.innerWidth - edge) left = anchor.right - width;
    left = Math.max(edge, Math.min(left, window.innerWidth - width - edge));
    let top = anchor.bottom + gap;
    if (top + height > window.innerHeight - edge) top = anchor.top - height - gap;
    top = Math.max(edge, Math.min(top, window.innerHeight - height - edge));
    preview.style.left = `${Math.round(left)}px`;
    preview.style.top = `${Math.round(top)}px`;
  }

  function hideScriptureReferencePreview() {
    scriptureReferencePreviewToken += 1;
    const preview = document.querySelector('[data-scripture-reference-preview]');
    if (scriptureReferencePreviewChip && preview && scriptureReferencePreviewChip.getAttribute('aria-describedby') === preview.id) {
      scriptureReferencePreviewChip.removeAttribute('aria-describedby');
    }
    scriptureReferencePreviewChip = null;
    if (!preview) return;
    preview.dataset.visible = 'false';
    preview.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => {
      if (preview.dataset.visible !== 'true') preview.hidden = true;
    }, 140);
  }

  function enhanceScriptureReferenceChips(rootNode = document) {
    rootNode.querySelectorAll?.('.reference-chip, .symbol-reference-chip, .word-reference-chip').forEach((chip) => {
      const reference = chip.dataset.scriptureReference || chip.textContent.trim();
      if (!reference) return;
      chip.setAttribute('data-scripture-reference', reference);
      if (!chip.hasAttribute('tabindex')) chip.setAttribute('tabindex', '0');
      if (!chip.hasAttribute('aria-label')) chip.setAttribute('aria-label', `Preview ${reference}`);
    });
  }

  async function showScriptureReferencePreview(chip) {
    const reference = chip?.dataset?.scriptureReference;
    const preview = scriptureReferencePreviewElement();
    if (!reference || !preview) return;
    const requestToken = ++scriptureReferencePreviewToken;
    scriptureReferencePreviewChip = chip;

    try {
      const payload = await loadScriptureReferencePreviews();
      if (requestToken !== scriptureReferencePreviewToken || scriptureReferencePreviewChip !== chip) return;
      const entry = payload.references[reference];
      if (!entry?.verses?.length) return;
      const verseMarkup = entry.verses
        .map((verseReference) => {
          const verseText = payload.verses[verseReference];
          if (!verseText) return '';
          return '<p class="scripture-reference-preview-verse">' +
            `<span class="scripture-reference-preview-verse-label">${commentaryEscape(verseReference)}</span>` +
            `<span class="scripture-reference-preview-verse-copy">${commentaryEscape(verseText)}</span>` +
            '</p>';
        })
        .join('');
      if (!verseMarkup) return;

      preview.innerHTML =
        '<div class="scripture-reference-preview-heading">' +
        `<span>${commentaryEscape(reference)}</span><span class="scripture-reference-preview-version">KJV</span>` +
        '</div>' +
        `<div class="scripture-reference-preview-verses">${verseMarkup}</div>` +
        (entry.truncated ? '<p class="scripture-reference-preview-note">Opening three verses shown.</p>' : '');
      preview.hidden = false;
      preview.setAttribute('aria-hidden', 'false');
      chip.setAttribute('aria-describedby', preview.id);
      positionScriptureReferencePreview(preview, chip);
      window.requestAnimationFrame(() => {
        if (requestToken === scriptureReferencePreviewToken) preview.dataset.visible = 'true';
      });
    } catch (error) {
      hideScriptureReferencePreview();
    }
  }

  function ensureScriptureReferencePreview() {
    enhanceScriptureReferenceChips();
    if (scriptureReferencePreviewBound) return;
    scriptureReferencePreviewBound = true;

    document.addEventListener('mouseover', (event) => {
      const chip = event.target.closest?.('[data-scripture-reference]');
      if (!chip) return;
      showScriptureReferencePreview(chip);
    });

    document.addEventListener('mouseout', (event) => {
      const chip = event.target.closest?.('[data-scripture-reference]');
      if (!chip) return;
      const next = event.relatedTarget;
      if (next instanceof Node && (chip.contains(next) || document.querySelector('[data-scripture-reference-preview]')?.contains(next))) return;
      hideScriptureReferencePreview();
    });

    document.addEventListener('focusin', (event) => {
      const chip = event.target.closest?.('[data-scripture-reference]');
      if (!chip) return;
      showScriptureReferencePreview(chip);
    });

    document.addEventListener('focusout', (event) => {
      const chip = event.target.closest?.('[data-scripture-reference]');
      if (!chip) return;
      const next = event.relatedTarget;
      if (next instanceof Node && chip.contains(next)) return;
      hideScriptureReferencePreview();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') hideScriptureReferencePreview();
    });

    window.addEventListener('scroll', hideScriptureReferencePreview, { passive: true });
    window.addEventListener('resize', hideScriptureReferencePreview);
  }

  function removeCommentaryActions() {
    document.querySelectorAll('.commentary-actions, [data-revelation-copy]').forEach((node) => {
      const actionGroup = node.closest?.('.commentary-actions');
      (actionGroup || node).remove();
    });
  }

  function selectedVerseButton(chapter) {
    const hash = window.location.hash || '';
    const hashMatch = hash.match(/^#v-?(\d+)$/) || hash.match(new RegExp(`^#revelation-${chapter}-(\\d+)$`));
    if (hashMatch) {
      const hashButton = document.getElementById(`revelation-${chapter}-${Number(hashMatch[1])}`);
      if (hashButton) return hashButton;
    }
    return document.querySelector(`.scripture-card-active[id^="revelation-${chapter}-"]`) ||
      document.getElementById(`revelation-${chapter}-1`);
  }

  function setSelectedVerse(button) {
    const pane = button.closest('.scripture-pane');
    pane?.querySelectorAll('.scripture-card[id^="revelation-"]').forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('scripture-card-active', active);
      candidate.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  async function renderVerseCommentary(button, options = {}) {
    const info = verseFromButton(button);
    const shell = document.querySelector('aside.commentary-pane .commentary-shell');
    if (!info || !shell) return false;
    const chapter = Number(info.chapter);
    const verse = Number(info.verse);
    const requestToken = ++commentaryRenderToken;
    shell.setAttribute('aria-busy', 'true');
    shell.dataset.rvxCommentaryLoading = info.token;

    try {
      const bundle = await loadCommentaryBundle(chapter);
      if (requestToken !== commentaryRenderToken || currentChapterNumber() !== chapter) return false;
      const note = bundle.notes.find((candidate) => candidate.verse === verse);
      if (!note) throw new Error(`Missing audited note for ${info.label}.`);

      shell.innerHTML = commentaryArticleMarkup(note);
      enhanceScriptureReferenceChips(shell);
      shell.setAttribute('aria-live', 'polite');
      shell.removeAttribute('aria-busy');
      shell.dataset.rvxCommentaryLoading = '';
      setSelectedVerse(button);

      if (options.updateLocation !== false) {
        referenceAddRecent(chapter, verse);
        const hash = `#v${verse}`;
        if (window.location.hash !== hash) history.replaceState(null, '', hash);
        const input = document.querySelector('[data-mbe-ref-input]');
        if (input) input.value = `Revelation ${chapter}:${verse}`;
        document.querySelector('.commentary-pane-body')?.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (isInlineNotesViewport()) {
        if (options.inlineAction === 'close') closeInlineNoteFor(button);
        else if (options.inlineAction === 'open') openInlineNoteFor(button);
        else removeInlineNotes();
      } else {
        removeInlineNotes();
      }
      updateReaderFooterState();
      return true;
    } catch (error) {
      shell.removeAttribute('aria-busy');
      shell.dataset.rvxCommentaryLoading = '';
      console.error(error);
      return false;
    }
  }

  function ensureVerseCommentary() {
    const chapter = currentChapterNumber();
    if (!chapter || !document.body) return;

    if (!verseCommentaryBound) {
      verseCommentaryBound = true;
      document.addEventListener('click', (event) => {
        const button = event.target.closest?.('.scripture-card[id^="revelation-"]');
        if (!button) return;
        if (isInlineNotesViewport()) {
          if (button.nextElementSibling?.matches?.('[data-revelation-inline-note]')) {
            closeInlineNoteFor(button);
            return;
          }

          const shell = document.querySelector('aside.commentary-pane .commentary-shell');
          if (shell?.querySelector(`[data-rvx-commentary="${button.id}"]`)) {
            setSelectedVerse(button);
            openInlineNoteFor(button);
            updateReaderFooterState();
            return;
          }
        }

        renderVerseCommentary(button, { inlineAction: 'open' });
      });
    }

    const button = selectedVerseButton(chapter);
    const shell = document.querySelector('aside.commentary-pane .commentary-shell');
    if (!button || !shell) return;
    if (shell.querySelector(`[data-rvx-commentary="${button.id}"]`) || shell.dataset.rvxCommentaryLoading === button.id) return;
    renderVerseCommentary(button, { updateLocation: false });
  }

  function ensureChapterSummary() {
    const chapter = currentChapterNumber();
    if (!chapter) return;
    const summary = SHORT_CHAPTER_SUMMARIES[chapter];
    const node = document.querySelector('.scripture-chapter-summary');
    if (!summary || !node || node.textContent === summary) return;
    node.textContent = summary;
  }

  function scheduleChapterSummary() {
    if (summaryTickQueued) return;
    summaryTickQueued = true;
    window.requestAnimationFrame(() => {
      summaryTickQueued = false;
      ensureChapterSummary();
    });
  }

  function ensureChapterSummaryObserver() {
    if (summaryObserver || !document.body) return;
    summaryObserver = new MutationObserver(scheduleChapterSummary);
    summaryObserver.observe(document.body, { childList: true, characterData: true, subtree: true });
  }

  const INLINE_NOTE_SELECTOR = '[data-revelation-inline-note]';
  let inlineNotesBound = false;

  function isInlineNotesViewport() {
    return window.matchMedia('(max-width: 1023.98px)').matches;
  }

  function removeInlineNotes() {
    document.querySelectorAll(INLINE_NOTE_SELECTOR).forEach((node) => node.remove());
    document.querySelectorAll('.scripture-card[id^="revelation-"][aria-expanded="true"]').forEach((node) => {
      node.setAttribute('aria-expanded', 'false');
    });
  }

  function verseFromButton(button) {
    if (!button || !button.id) return null;
    const match = button.id.match(/^revelation-(\d+)-(\d+)$/);
    if (!match) return null;
    return {
      chapter: match[1],
      verse: match[2],
      token: `revelation-${match[1]}-${match[2]}`,
      label: `Revelation ${match[1]}:${match[2]}`
    };
  }

  function sanitizeInlineNoteIds(root, token) {
    root.id = `inline-note-${token}`;
    root.querySelectorAll('[id]').forEach((node, index) => {
      const current = node.id || 'node';
      node.id = `${current}-inline-${token}-${index + 1}`;
    });
    root.querySelectorAll('label[for]').forEach((label) => {
      label.removeAttribute('for');
    });
    root.querySelectorAll('[aria-controls], [aria-labelledby], [aria-describedby]').forEach((node) => {
      node.removeAttribute('aria-controls');
      node.removeAttribute('aria-labelledby');
      node.removeAttribute('aria-describedby');
    });
  }

  function matchingActiveNote(label) {
    const card = document.querySelector('aside.commentary-pane article.exposition-card');
    const heading = card?.querySelector('.exposition-card-heading h2');
    if (!card || !heading || heading.textContent.trim() !== label) return null;
    return card;
  }

  function cloneActiveNote(info) {
    const source = matchingActiveNote(info.label);
    if (!source) return false;
    const clone = source.cloneNode(true);
    clone.classList.add('revelation-inline-note');
    clone.setAttribute('data-state', 'open');
    clone.setAttribute('data-revelation-inline-note', '');
    clone.setAttribute('aria-label', `${info.label} study note`);
    clone.querySelectorAll('.commentary-actions, .no-print, [data-revelation-copy]').forEach((node) => node.remove());
    sanitizeInlineNoteIds(clone, info.token);

    const button = document.getElementById(info.token);
    if (!button || !button.parentElement) return false;
    removeInlineNotes();
    button.insertAdjacentElement('afterend', clone);
    button.setAttribute('aria-expanded', 'true');
    clone.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return true;
  }

  function closeInlineNoteFor(button) {
    const info = verseFromButton(button);
    if (!info) return;
    const next = button.nextElementSibling;
    if (next?.matches?.(INLINE_NOTE_SELECTOR)) next.remove();
    button.setAttribute('aria-expanded', 'false');
  }

  function openInlineNoteFor(button) {
    if (!isInlineNotesViewport()) {
      removeInlineNotes();
      return;
    }
    const info = verseFromButton(button);
    if (!info) return;
    let attempts = 0;
    const tryClone = () => {
      attempts += 1;
      if (cloneActiveNote(info) || attempts >= 12) return;
      window.setTimeout(tryClone, 50);
    };
    window.requestAnimationFrame(tryClone);
  }

  function ensureInlineCommentaryNotes() {
    if (inlineNotesBound || !document.body) return;
    inlineNotesBound = true;
    window.matchMedia('(max-width: 1023.98px)').addEventListener('change', (event) => {
      if (!event.matches) removeInlineNotes();
    });
  }

  let darkThemeObserver = null;

  function ensureDarkTheme() {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    }
    try {
      window.localStorage.setItem('revelation.preferences.v1', 'dark');
    } catch (error) {
      // Storage may be unavailable in private contexts; CSS still defaults dark.
    }
    document.querySelectorAll('.theme-word-toggle').forEach((button) => {
      button.hidden = true;
      button.setAttribute('aria-hidden', 'true');
      button.setAttribute('tabindex', '-1');
    });
  }

  function ensureDarkThemeObserver() {
    ensureDarkTheme();
    if (darkThemeObserver) return;
    darkThemeObserver = new MutationObserver(ensureDarkTheme);
    darkThemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }









  // MBE reference navigator start
  const referenceNavConfig = {"book":"Revelation","slug":"revelation","basePath":"/revelation/","storageKey":"revelationRecentReferences","chapterCount":22,"verseCounts":[0,20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21],"simpleVerseIds":false};
  const referenceNavIcons = {
    arrowLeft: '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>',
    arrowRight: '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
    chevronDown: '<svg class="mbe-ref-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>'
  };

  function installReferenceNavStyles() {
    if (window.getComputedStyle(document.documentElement).getPropertyValue('--mbe-reference-nav-ready').trim() === '1') return;
    if (!document.head || document.getElementById('mbe-reference-nav-style')) return;
    const style = document.createElement('style');
    style.id = 'mbe-reference-nav-style';
    style.textContent = `
.mbe-ref-strip {
  position: sticky !important;
  top: calc(46px + 4rem) !important;
  z-index: 55 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 3.35rem !important;
  border-bottom: 1px solid rgba(201, 164, 76, .18) !important;
  background: rgba(19, 45, 63, .94) !important;
  padding: .35rem .75rem !important;
  box-shadow: 0 16px 34px -34px rgba(0,0,0,.9) !important;
  backdrop-filter: blur(14px) !important;
}
.mbe-ref-nav {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: .45rem !important;
  width: min(100%, 72rem) !important;
  margin: 0 auto !important;
}
.mbe-ref-form {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: .45rem !important;
  flex: 1 1 18.5rem !important;
  width: min(18.5rem, 42vw) !important;
  max-width: 24rem !important;
  min-width: 13rem !important;
  height: 2.55rem !important;
  border: 1px solid rgba(229, 205, 154, .22) !important;
  border-radius: .4rem !important;
  background: rgba(245, 234, 213, .08) !important;
  padding: 0 .72rem 0 .55rem !important;
  color: #f5ead5 !important;
}
.mbe-ref-form:focus-within {
  border-color: rgba(229, 205, 154, .48) !important;
  background: rgba(245, 234, 213, .12) !important;
}
.mbe-ref-badge {
  display: inline-grid !important;
  place-items: center !important;
  flex: 0 0 auto !important;
  width: 1.5rem !important;
  height: 1.5rem !important;
  border-radius: .22rem !important;
  background: #c9a44c !important;
  color: #0b1f3a !important;
  font-size: .48rem !important;
  font-weight: 800 !important;
  letter-spacing: .02em !important;
}
.mbe-ref-picker-toggle {
  display: inline-flex !important;
  align-items: center !important;
  gap: .4rem !important;
  flex: 0 0 auto !important;
  border: 0 !important;
  background: transparent !important;
  color: rgba(245, 234, 213, .7) !important;
  padding: 0 !important;
  cursor: pointer !important;
}
.mbe-ref-input {
  min-width: 0 !important;
  flex: 1 1 auto !important;
  border: 0 !important;
  background: transparent !important;
  color: #f5ead5 !important;
  font: 800 clamp(.92rem, 1.5vw, 1.08rem) var(--font-sans, Jost, system-ui, sans-serif) !important;
  letter-spacing: 0 !important;
  outline: 0 !important;
}
.mbe-ref-input::placeholder {
  color: rgba(245, 234, 213, .48) !important;
}
.mbe-ref-step,
.mbe-ref-recent-toggle,
.mbe-ref-all-toggle {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex: 0 0 auto !important;
  height: 2.55rem !important;
  min-width: 2.55rem !important;
  border: 1px solid rgba(229, 205, 154, .18) !important;
  border-radius: .4rem !important;
  background: rgba(245, 234, 213, .07) !important;
  color: rgba(245, 234, 213, .72) !important;
  padding: 0 .78rem !important;
  font: 800 .7rem var(--font-sans, Jost, system-ui, sans-serif) !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  cursor: pointer !important;
}
.mbe-ref-step {
  width: 2.55rem !important;
  padding: 0 !important;
}
.mbe-ref-step:hover,
.mbe-ref-recent-toggle:hover,
.mbe-ref-recent-toggle[aria-expanded="true"],
.mbe-ref-all-toggle:hover,
.mbe-ref-all-toggle[aria-expanded="true"] {
  border-color: rgba(229, 205, 154, .32) !important;
  background: #c9a44c !important;
  color: #0b1f3a !important;
}
.mbe-ref-disabled {
  opacity: .36 !important;
  pointer-events: none !important;
}
.mbe-ref-icon {
  width: .95rem !important;
  height: .95rem !important;
  fill: none !important;
  stroke: currentColor !important;
  stroke-width: 2.2 !important;
  stroke-linecap: round !important;
  stroke-linejoin: round !important;
}
.mbe-ref-menu-wrap {
  position: relative !important;
  flex: 0 0 auto !important;
}
.mbe-ref-picker,
.mbe-ref-recent-dropdown,
.mbe-ref-all-dropdown {
  position: absolute !important;
  top: calc(100% + .45rem) !important;
  z-index: 120 !important;
  overflow: hidden !important;
  border: 1px solid rgba(229, 205, 154, .24) !important;
  border-radius: .45rem !important;
  background: rgba(11, 31, 58, .98) !important;
  color: #f5ead5 !important;
  box-shadow: 0 22px 55px rgba(0,0,0,.42) !important;
}
.mbe-ref-picker {
  left: 50% !important;
  width: min(24rem, calc(100vw - 1.5rem)) !important;
  transform: translateX(-50%) !important;
}
.mbe-ref-recent-dropdown,
.mbe-ref-all-dropdown {
  right: 0 !important;
  width: min(15rem, calc(100vw - 1.5rem)) !important;
}
.mbe-ref-all-dropdown {
  width: min(24rem, calc(100vw - 1.5rem)) !important;
}
.mbe-ref-picker[hidden],
.mbe-ref-recent-dropdown[hidden],
.mbe-ref-all-dropdown[hidden] {
  display: none !important;
}
.mbe-ref-picker-head {
  display: grid !important;
  grid-template-columns: 1.8rem minmax(0, 1fr) auto 1.8rem !important;
  align-items: center !important;
  gap: .35rem !important;
  padding: .55rem .65rem !important;
  border-bottom: 1px solid rgba(229, 205, 154, .14) !important;
}
.mbe-ref-picker-title {
  color: #f5ead5 !important;
  text-align: center !important;
  font: 800 clamp(.9rem, 1.6vw, 1.08rem) var(--font-sans, Jost, system-ui, sans-serif) !important;
}
.mbe-ref-back,
.mbe-ref-close,
.mbe-ref-go {
  display: inline-grid !important;
  place-items: center !important;
  min-width: 1.8rem !important;
  height: 1.8rem !important;
  border: 0 !important;
  border-radius: .35rem !important;
  background: rgba(245, 234, 213, .08) !important;
  color: rgba(245, 234, 213, .72) !important;
  font: 800 .72rem var(--font-sans, Jost, system-ui, sans-serif) !important;
  cursor: pointer !important;
}
.mbe-ref-back[hidden] {
  display: inline-grid !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
.mbe-ref-close {
  font-size: 1.32rem !important;
  line-height: 1 !important;
}
.mbe-ref-go,
.mbe-ref-back:hover,
.mbe-ref-close:hover {
  background: #c9a44c !important;
  color: #0b1f3a !important;
}
.mbe-ref-grid,
.mbe-ref-recent-list {
  display: grid !important;
  gap: .35rem !important;
  padding: .75rem !important;
}
.mbe-ref-grid {
  grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
}
.mbe-ref-grid button,
.mbe-ref-recent-list button,
.mbe-ref-empty {
  min-height: 1.7rem !important;
  border: 0 !important;
  border-radius: .35rem !important;
  background: transparent !important;
  color: rgba(245, 234, 213, .72) !important;
  font: 800 clamp(.72rem, 1vw, .88rem) var(--font-sans, Jost, system-ui, sans-serif) !important;
  letter-spacing: 0 !important;
}
.mbe-ref-grid button,
.mbe-ref-recent-list button {
  cursor: pointer !important;
}
.mbe-ref-grid button:hover,
.mbe-ref-grid button.is-active,
.mbe-ref-recent-list button:hover {
  background: #c9a44c !important;
  color: #0b1f3a !important;
}
.mbe-ref-recent-list button,
.mbe-ref-empty {
  width: 100% !important;
  padding: .55rem .65rem !important;
  text-align: left !important;
}
.mbe-ref-empty {
  margin: 0 !important;
  color: rgba(245, 234, 213, .52) !important;
  font-weight: 600 !important;
}
@media (max-width: 760px) {
  .mbe-ref-strip {
    top: calc(46px + 3.75rem) !important;
    padding: .25rem .45rem !important;
  }
  .mbe-ref-nav {
    gap: .3rem !important;
  }
  .mbe-ref-form {
    width: auto !important;
    min-width: 0 !important;
    height: 2.35rem !important;
    padding: 0 .5rem 0 .42rem !important;
  }
  .mbe-ref-input {
    font-size: clamp(.86rem, 4vw, 1rem) !important;
  }
  .mbe-ref-badge {
    width: 1.32rem !important;
    height: 1.32rem !important;
    font-size: .42rem !important;
  }
  .mbe-ref-step,
  .mbe-ref-recent-toggle,
  .mbe-ref-all-toggle {
    height: 2.35rem !important;
    min-width: 2.35rem !important;
    padding: 0 .48rem !important;
    font-size: .58rem !important;
    letter-spacing: .05em !important;
  }
  .mbe-ref-picker {
    position: fixed !important;
    top: calc(46px + 3.15rem + 2.15rem) !important;
    right: 1rem !important;
    left: 1rem !important;
    width: auto !important;
    transform: none !important;
  }
  .mbe-ref-picker-head {
    grid-template-columns: 1.65rem minmax(0, 1fr) auto 1.65rem !important;
    padding: .45rem .5rem !important;
  }
  .mbe-ref-grid {
    gap: .25rem !important;
    padding: .5rem !important;
  }
  .mbe-ref-grid button {
    min-height: 1.55rem !important;
    font-size: .66rem !important;
  }
}
    `;
    document.head.appendChild(style);
  }

  function referencePathChapter() {
    const path = (window.location.pathname || '/').replace(/\/index\.html$/, '/');
    if (!path.startsWith(referenceNavConfig.basePath)) return null;
    const rest = path.slice(referenceNavConfig.basePath.length).replace(/\/+$/, '');
    if (!/^\d+$/.test(rest)) return null;
    const chapter = Number(rest);
    if (!chapter || chapter < 1 || chapter > referenceNavConfig.chapterCount) return null;
    return chapter;
  }

  function referenceUrl(chapter, verse) {
    return referenceNavConfig.basePath + chapter + '/' + (verse ? '#v' + verse : '');
  }

  function referenceFormat(chapter, verse) {
    return referenceNavConfig.book + ' ' + chapter + ':' + verse;
  }

  function referenceVerseButton(chapter, verse) {
    const id = referenceNavConfig.simpleVerseIds ? 'v-' + verse : referenceNavConfig.slug + '-' + chapter + '-' + verse;
    return document.getElementById(id);
  }

  function referenceValid(chapter, verse) {
    return chapter >= 1 && chapter <= referenceNavConfig.chapterCount && verse >= 1 && verse <= (referenceNavConfig.verseCounts[chapter] || 0);
  }

  function referencePinDesktopReader() {
    if (!window.matchMedia || !window.matchMedia('(min-width: 1024px)').matches) return;
    if (!document.querySelector('.split-reader')) return;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }

  function referenceScrollVerse(button) {
    const shouldUsePaneScroll = window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
    const paneBody = button.closest?.('.scripture-pane-body');
    if (shouldUsePaneScroll && paneBody) {
      const buttonRect = button.getBoundingClientRect();
      const paneRect = paneBody.getBoundingClientRect();
      const targetTop = paneBody.scrollTop + buttonRect.top - paneRect.top - Math.max(24, (paneBody.clientHeight - buttonRect.height) / 2);
      paneBody.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      referencePinDesktopReader();
      window.setTimeout(referencePinDesktopReader, 160);
      return;
    }
    button.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  function referenceSelectedVerse(chapter) {
    const hashMatch = (window.location.hash || '').match(/^#v-?(\d+)$/);
    if (hashMatch && referenceValid(chapter, Number(hashMatch[1]))) return Number(hashMatch[1]);
    const active = document.querySelector('.scripture-card-active[id], main[data-bible-panel] button[id^="v-"].bg-primary, main[data-bible-panel] button[id^="v-"][aria-pressed="true"]');
    const idMatch = active?.id?.match(/(\d+)$/);
    if (idMatch && referenceValid(chapter, Number(idMatch[1]))) return Number(idMatch[1]);
    return 1;
  }

  function referenceReadRecent() {
    try {
      const value = JSON.parse(localStorage.getItem(referenceNavConfig.storageKey) || '[]');
      if (!Array.isArray(value)) return [];
      return value
        .map((item) => ({ chapter: Number(item.chapter), verse: Number(item.verse) }))
        .filter((item) => referenceValid(item.chapter, item.verse))
        .slice(0, 8);
    } catch (error) {
      return [];
    }
  }

  function referenceWriteRecent(references) {
    try {
      localStorage.setItem(referenceNavConfig.storageKey, JSON.stringify(references));
    } catch (error) {
      // Storage can be unavailable in restricted contexts.
    }
  }

  function referenceAddRecent(chapter, verse) {
    if (!referenceValid(chapter, verse)) return;
    const references = referenceReadRecent().filter((item) => item.chapter !== chapter || item.verse !== verse);
    references.unshift({ chapter, verse });
    referenceWriteRecent(references.slice(0, 8));
  }

  function referenceParse(raw, currentChapter) {
    let value = String(raw || '').trim().toLowerCase();
    value = value
      .replace(/[–—]/g, '-')
      .replace(new RegExp('^' + referenceNavConfig.book.toLowerCase() + '\\s+'), '')
      .replace(/^chapter\s+/, '')
      .replace(/^ch\.?\s+/, '')
      .replace(/^verse\s+/, '')
      .replace(/^v\.?\s*/, '');
    const full = value.match(/^(\d{1,2})\s*[:.]\s*(\d{1,3})$/) || value.match(/^(\d{1,2})\s+(\d{1,3})$/);
    const single = value.match(/^(\d{1,3})$/);
    let chapter = currentChapter;
    let verse = null;
    if (full) {
      chapter = Number(full[1]);
      verse = Number(full[2]);
    } else if (single) {
      verse = Number(single[1]);
    }
    if (!referenceValid(chapter, verse)) return null;
    return { chapter, verse };
  }

  function referenceSelect(chapter, verse) {
    if (!referenceValid(chapter, verse)) return;
    referenceAddRecent(chapter, verse);
    const currentChapter = referencePathChapter();
    if (chapter !== currentChapter) {
      window.location.href = referenceUrl(chapter, verse);
      return;
    }
    const button = referenceVerseButton(chapter, verse);
    if (button) {
      button.click();
      referenceScrollVerse(button);
      window.setTimeout(() => {
        const freshButton = referenceVerseButton(chapter, verse);
        if (freshButton) referenceScrollVerse(freshButton);
      }, 80);
      window.setTimeout(() => {
        const freshButton = referenceVerseButton(chapter, verse);
        if (freshButton) referenceScrollVerse(freshButton);
      }, 220);
    }
    const hash = '#v' + verse;
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
    const input = document.querySelector('[data-mbe-ref-input]');
    if (input) input.value = referenceFormat(chapter, verse);
    window.setTimeout(referencePinDesktopReader, 40);
  }

  function referenceFindStrip() {
    const managed = document.querySelector('.mbe-ref-strip');
    if (managed) return managed;
    const explicit = document.querySelector('nav.chapter-strip, .chapter-strip');
    if (explicit) return explicit;
    const candidates = Array.from(document.querySelectorAll('.bg-background.text-foreground > div, main.reader-page > nav, .reader-page > nav'));
    return candidates.find((node) => {
      const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text.startsWith('Chapter')) return false;
      const linkCount = Array.from(node.querySelectorAll('a')).filter((anchor) => {
        return (anchor.getAttribute('href') || '').startsWith(referenceNavConfig.basePath);
      }).length;
      return linkCount >= Math.min(referenceNavConfig.chapterCount, 3);
    }) || null;
  }

  function referenceRemoveLegacyNavigation(activeStrip) {
    document.querySelectorAll('nav.chapter-strip, .chapter-strip, .reader-chapter-nav').forEach((node) => {
      if (node === activeStrip || node.classList?.contains('mbe-ref-strip')) return;
      node.remove();
    });
  }

  function referenceCreateStrip() {
    const strip = document.createElement('nav');
    strip.className = 'mbe-ref-strip no-print';
    strip.setAttribute('aria-label', referenceNavConfig.book + ' reference navigation');
    const readerShell = document.querySelector('.reader-page, .bg-background.text-foreground');
    if (readerShell) {
      readerShell.insertAdjacentElement('afterbegin', strip);
      return strip;
    }
    const header = document.querySelector('header.reader-header, header.sticky, .mbe-global-shell, header');
    if (header && header.parentNode) {
      header.insertAdjacentElement('afterend', strip);
      return strip;
    }
    if (document.body) {
      document.body.insertAdjacentElement('afterbegin', strip);
      return strip;
    }
    return null;
  }

  function installReferenceNavigator() {
    if (!document.body) return;
    installReferenceNavStyles();
    const currentChapter = referencePathChapter();
    if (!currentChapter) return;
    const strip = referenceFindStrip() || referenceCreateStrip();
    if (!strip) return;
    const signature = referenceNavConfig.slug + '-' + currentChapter;
    referenceRemoveLegacyNavigation(strip);
    if (strip.getAttribute('data-mbe-ref-nav') === signature) return;

    const currentVerse = referenceSelectedVerse(currentChapter);
    const previous = currentChapter > 1 ? currentChapter - 1 : null;
    const next = currentChapter < referenceNavConfig.chapterCount ? currentChapter + 1 : null;
    strip.className = 'mbe-ref-strip no-print';
    strip.setAttribute('aria-label', referenceNavConfig.book + ' reference navigation');
    strip.setAttribute('data-mbe-ref-nav', signature);
    strip.innerHTML =
      '<div class="mbe-ref-nav">' +
      (previous ? '<a class="mbe-ref-step" href="' + referenceUrl(previous) + '" aria-label="Previous chapter">' + referenceNavIcons.arrowLeft + '</a>' : '<span class="mbe-ref-step mbe-ref-disabled" aria-hidden="true">' + referenceNavIcons.arrowLeft + '</span>') +
      '<form class="mbe-ref-form" data-mbe-ref-form>' +
      '<button class="mbe-ref-picker-toggle" data-mbe-ref-picker-toggle type="button" aria-label="Choose ' + referenceNavConfig.book + ' chapter and verse" aria-expanded="false"><span class="mbe-ref-badge">KJV</span>' + referenceNavIcons.chevronDown + '</button>' +
      '<input class="mbe-ref-input" data-mbe-ref-input type="search" inputmode="numeric" autocomplete="off" value="' + referenceFormat(currentChapter, currentVerse) + '" aria-label="Type a verse reference">' +
      '<div class="mbe-ref-picker" data-mbe-ref-picker hidden><div class="mbe-ref-picker-head"><button class="mbe-ref-back" data-mbe-ref-back type="button" aria-label="Back to chapter selection" hidden>' + referenceNavIcons.arrowLeft + '</button><strong class="mbe-ref-picker-title" data-mbe-ref-title>' + referenceNavConfig.book + '</strong><button class="mbe-ref-go" data-mbe-ref-go type="button">Go</button><button class="mbe-ref-close" data-mbe-ref-close type="button" aria-label="Close verse picker">&times;</button></div><div class="mbe-ref-grid" data-mbe-ref-grid></div></div>' +
      '</form>' +
      '<div class="mbe-ref-menu-wrap"><button class="mbe-ref-recent-toggle" data-mbe-ref-recent-toggle type="button" aria-expanded="false">Recent ' + referenceNavIcons.chevronDown + '</button><div class="mbe-ref-recent-dropdown" data-mbe-ref-recent-dropdown hidden><div class="mbe-ref-recent-list" data-mbe-ref-recent-list></div></div></div>' +
      (next ? '<a class="mbe-ref-step" href="' + referenceUrl(next) + '" aria-label="Next chapter">' + referenceNavIcons.arrowRight + '</a>' : '<span class="mbe-ref-step mbe-ref-disabled" aria-hidden="true">' + referenceNavIcons.arrowRight + '</span>') +
      '<div class="mbe-ref-menu-wrap"><button class="mbe-ref-all-toggle" data-mbe-ref-all-toggle type="button" aria-expanded="false">All</button><div class="mbe-ref-all-dropdown" data-mbe-ref-all-dropdown hidden><div class="mbe-ref-grid">' +
      Array.from({ length: referenceNavConfig.chapterCount }, (_, index) => {
        const chapter = index + 1;
        return '<button type="button" data-mbe-ref-all-chapter="' + chapter + '" class="' + (chapter === currentChapter ? 'is-active' : '') + '">' + chapter + '</button>';
      }).join('') +
      '</div></div></div>' +
      '</div>';

    let pickerChapter = currentChapter;
    let pickerVerse = currentVerse;
    const form = strip.querySelector('[data-mbe-ref-form]');
    const input = strip.querySelector('[data-mbe-ref-input]');
    const picker = strip.querySelector('[data-mbe-ref-picker]');
    const pickerToggle = strip.querySelector('[data-mbe-ref-picker-toggle]');
    const pickerBack = strip.querySelector('[data-mbe-ref-back]');
    const pickerTitle = strip.querySelector('[data-mbe-ref-title]');
    const pickerGrid = strip.querySelector('[data-mbe-ref-grid]');
    const recentToggle = strip.querySelector('[data-mbe-ref-recent-toggle]');
    const recentDropdown = strip.querySelector('[data-mbe-ref-recent-dropdown]');
    const recentList = strip.querySelector('[data-mbe-ref-recent-list]');
    const allToggle = strip.querySelector('[data-mbe-ref-all-toggle]');
    const allDropdown = strip.querySelector('[data-mbe-ref-all-dropdown]');

    const closePicker = () => {
      picker.hidden = true;
      pickerToggle.setAttribute('aria-expanded', 'false');
    };
    const closeRecent = () => {
      recentDropdown.hidden = true;
      recentToggle.setAttribute('aria-expanded', 'false');
    };
    const closeAll = () => {
      allDropdown.hidden = true;
      allToggle.setAttribute('aria-expanded', 'false');
    };
    const renderChapters = () => {
      pickerTitle.textContent = referenceNavConfig.book;
      pickerBack.hidden = true;
      pickerGrid.innerHTML = Array.from({ length: referenceNavConfig.chapterCount }, (_, index) => {
        const chapter = index + 1;
        return '<button type="button" data-mbe-ref-chapter="' + chapter + '" class="' + (chapter === pickerChapter ? 'is-active' : '') + '">' + chapter + '</button>';
      }).join('');
    };
    const renderVerses = () => {
      const maxVerse = referenceNavConfig.verseCounts[pickerChapter] || 1;
      if (pickerVerse > maxVerse) pickerVerse = 1;
      pickerTitle.textContent = referenceNavConfig.book + ' ' + pickerChapter;
      pickerBack.hidden = false;
      pickerGrid.innerHTML = Array.from({ length: maxVerse }, (_, index) => {
        const verse = index + 1;
        return '<button type="button" data-mbe-ref-verse="' + verse + '" class="' + (verse === pickerVerse ? 'is-active' : '') + '">' + verse + '</button>';
      }).join('');
    };
    const renderRecent = () => {
      const recent = referenceReadRecent();
      if (!recent.length) {
        recentList.innerHTML = '<p class="mbe-ref-empty">No recent verses yet.</p>';
        return;
      }
      recentList.innerHTML = recent.map(({ chapter, verse }) => '<button type="button" data-mbe-ref-recent-chapter="' + chapter + '" data-mbe-ref-recent-verse="' + verse + '">' + referenceFormat(chapter, verse) + '</button>').join('');
    };
    const openPicker = () => {
      pickerChapter = currentChapter;
      pickerVerse = referenceSelectedVerse(currentChapter);
      closeRecent();
      closeAll();
      renderChapters();
      picker.hidden = false;
      pickerToggle.setAttribute('aria-expanded', 'true');
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = referenceParse(input.value, currentChapter);
      if (target) {
        closePicker();
        closeRecent();
        closeAll();
        referenceSelect(target.chapter, target.verse);
      }
    });
    input.addEventListener('focus', () => input.select());
    input.addEventListener('click', openPicker);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        form.requestSubmit();
      }
    });
    pickerToggle.addEventListener('click', () => {
      if (picker.hidden) openPicker();
      else closePicker();
    });
    strip.querySelector('[data-mbe-ref-close]').addEventListener('click', closePicker);
    pickerBack.addEventListener('click', renderChapters);
    strip.querySelector('[data-mbe-ref-go]').addEventListener('click', () => {
      closePicker();
      referenceSelect(pickerChapter, pickerVerse);
    });
    pickerGrid.addEventListener('click', (event) => {
      const chapterButton = event.target.closest?.('[data-mbe-ref-chapter]');
      const verseButton = event.target.closest?.('[data-mbe-ref-verse]');
      if (chapterButton) {
        pickerChapter = Number(chapterButton.dataset.mbeRefChapter);
        pickerVerse = pickerChapter === currentChapter ? referenceSelectedVerse(currentChapter) : 1;
        renderVerses();
      } else if (verseButton) {
        pickerVerse = Number(verseButton.dataset.mbeRefVerse);
        closePicker();
        referenceSelect(pickerChapter, pickerVerse);
      }
    });
    recentToggle.addEventListener('click', () => {
      if (recentDropdown.hidden) {
        closePicker();
        closeAll();
        renderRecent();
        recentDropdown.hidden = false;
        recentToggle.setAttribute('aria-expanded', 'true');
      } else closeRecent();
    });
    recentList.addEventListener('click', (event) => {
      const button = event.target.closest?.('[data-mbe-ref-recent-chapter]');
      if (!button) return;
      closeRecent();
      referenceSelect(Number(button.dataset.mbeRefRecentChapter), Number(button.dataset.mbeRefRecentVerse));
    });
    allToggle.addEventListener('click', () => {
      if (allDropdown.hidden) {
        closePicker();
        closeRecent();
        allDropdown.hidden = false;
        allToggle.setAttribute('aria-expanded', 'true');
      } else closeAll();
    });
    allDropdown.addEventListener('click', (event) => {
      const button = event.target.closest?.('[data-mbe-ref-all-chapter]');
      if (!button) return;
      window.location.href = referenceUrl(Number(button.dataset.mbeRefAllChapter));
    });
    document.addEventListener('click', (event) => {
      const path = event.composedPath ? event.composedPath() : [];
      if (!path.includes(strip) && !strip.contains(event.target)) {
        closePicker();
        closeRecent();
        closeAll();
      }
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePicker();
        closeRecent();
        closeAll();
      }
    });

    referenceAddRecent(currentChapter, currentVerse);
    referencePinDesktopReader();
    if ((window.location.hash || '').match(/^#v-?\d+$/)) {
      window.setTimeout(() => referenceSelect(currentChapter, referenceSelectedVerse(currentChapter)), 120);
      window.setTimeout(referencePinDesktopReader, 240);
    }
  }
  // MBE reference navigator end


  function ensureShell() {
    if (!document.body) return;
    const isReaderShell = Boolean(document.querySelector('.split-reader'));
    document.documentElement.classList.toggle('mbe-reader-shell-active', isReaderShell);
    document.body.classList.toggle('mbe-reader-shell-active', isReaderShell);
    installReferenceNavigator();
    ensureIllustratedAssets();
    ensureLogo();
    ensureHomeHero();
    ensureIntroductionHero();
    ensureChapterSummary();
    ensureChapterSummaryObserver();
    ensureDarkThemeObserver();
    ensureVerseCommentary();
    ensureScriptureReferencePreview();
    ensureInlineCommentaryNotes();
    removeCommentaryActions();
    document.body.classList.add('mbe-shell-managed');
    document.querySelectorAll('.mbe-global-shell').forEach((node, index) => {
      if (index > 0 || node.getAttribute('data-tool') !== tool || !node.hasAttribute('data-embedded')) node.remove();
    });
    if (!document.querySelector('.mbe-global-shell[data-tool="' + tool + '"][data-embedded="true"]')) {
      document.body.insertAdjacentHTML('afterbegin', headerMarkup);
    }
    const existingFooters = Array.from(document.querySelectorAll('.mbe-global-footer'));
    if (isReaderShell && isDesktopReaderViewport()) {
      existingFooters.forEach((node) => node.remove());
      ensureReaderFooter();
      updateYear();
      return;
    }
    removeReaderFooter();
    let footer = existingFooters.find((node) => node.getAttribute('data-tool') === tool) || null;
    existingFooters.forEach((node) => {
      if (node !== footer) node.remove();
    });
    if (!footer) {
      document.body.insertAdjacentHTML('beforeend', footerMarkup);
      footer = document.querySelector('.mbe-global-footer[data-tool="' + tool + '"]');
    }
    if (footer && footer.parentElement === document.body && footer !== document.body.lastElementChild) {
      document.body.appendChild(footer);
    }
    updateYear();
  }

  let shellRefreshPending = false;
  function scheduleShellRefresh() {
    if (shellRefreshPending) return;
    shellRefreshPending = true;
    window.requestAnimationFrame(() => {
      shellRefreshPending = false;
      ensureShell();
    });
  }

  function readerNavigationMutation(node) {
    if (!node || node.nodeType !== 1) return false;
    return Boolean(
      node.matches?.('.reader-page, .split-reader, .chapter-strip, .reader-chapter-nav, .scripture-pane, .commentary-pane') ||
      node.querySelector?.('.reader-page, .split-reader, .chapter-strip, .reader-chapter-nav, .scripture-pane, .commentary-pane')
    );
  }

  function installShellRefreshHooks() {
    if (window.__mbeRevelationShellHooksInstalled) return;
    window.__mbeRevelationShellHooksInstalled = true;

    ['pushState', 'replaceState'].forEach((method) => {
      const original = history[method];
      if (typeof original !== 'function') return;
      history[method] = function patchedHistoryMethod() {
        const result = original.apply(this, arguments);
        window.setTimeout(scheduleShellRefresh, 0);
        window.setTimeout(scheduleShellRefresh, 120);
        return result;
      };
    });

    window.addEventListener('popstate', () => {
      window.setTimeout(scheduleShellRefresh, 0);
      window.setTimeout(scheduleShellRefresh, 120);
    });
    window.addEventListener('hashchange', () => {
      window.setTimeout(scheduleShellRefresh, 0);
    });

    const attachObserver = () => {
      if (!document.body || window.__mbeRevelationShellObserver) return;
      window.__mbeRevelationShellObserver = new MutationObserver((mutations) => {
        const shouldRefresh = mutations.some((mutation) => {
          return Array.from(mutation.addedNodes).some(readerNavigationMutation) ||
            Array.from(mutation.removedNodes).some(readerNavigationMutation);
        });
        if (shouldRefresh) scheduleShellRefresh();
      });
      window.__mbeRevelationShellObserver.observe(document.body, { childList: true, subtree: true });
    };

    if (document.body) attachObserver();
    else document.addEventListener('DOMContentLoaded', attachObserver, { once: true });
  }

  installShellRefreshHooks();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureShell, { once: true });
  } else {
    ensureShell();
  }
  window.addEventListener('load', () => {
    ensureShell();
    window.setTimeout(ensureShell, 300);
    window.setTimeout(ensureShell, 1000);
  });

  let logoTicks = 0;
  const logoTimer = window.setInterval(() => {
    ensureLogo();
    if (++logoTicks >= 10) {
      window.clearInterval(logoTimer);
      const header = document.querySelector('.reader-header');
      if (header) new MutationObserver(ensureLogo).observe(header, { childList: true, subtree: true });
    }
  }, 500);
})();
