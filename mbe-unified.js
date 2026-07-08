(() => {
  const tool = "revelation";
  const headerMarkup = "<header class=\"mbe-global-shell\" data-tool=\"revelation\" data-embedded=\"true\">\n      <div class=\"mbe-shell-wrap\">\n        <div class=\"mbe-ribbon-left\">\n          <a class=\"mbe-ribbon-brand\" href=\"https://mybibleexplorer.com\" aria-label=\"My Bible Explorer home\"><img class=\"mbe-ribbon-logo\" src=\"/assets/my-bible-explorer-logo.png\" alt=\"My Bible Explorer\"></a>\n          <a class=\"mbe-ribbon-back\" href=\"https://mybibleexplorer.com/#journeys\">Back to Library</a>\n        </div>\n        <nav class=\"mbe-global-nav\" aria-label=\"My Bible Explorer\">\n          <details class=\"mbe-library-menu\">\n            <summary class=\"mbe-library-toggle\">Library</summary>\n            <div class=\"mbe-library-panel\">\n              <div class=\"mbe-library-grid\">\n            <a class=\"mbe-library-item\" href=\"https://hermeneutics.mybibleexplorer.com\"><span class=\"mbe-library-name\">Hermeneutics</span><span class=\"mbe-library-desc\">Learn to read Scripture faithfully</span></a>\n            <a class=\"mbe-library-item\" href=\"https://psalms.mybibleexplorer.com\"><span class=\"mbe-library-name\">Psalms</span><span class=\"mbe-library-desc\">Worship, lament, praise, and prayer</span></a>\n            <a class=\"mbe-library-item\" href=\"https://daniel.mybibleexplorer.com\"><span class=\"mbe-library-name\">Daniel</span><span class=\"mbe-library-desc\">Prophecy and providence</span></a>\n            <a class=\"mbe-library-item\" href=\"https://revelation.mybibleexplorer.com/\" aria-current=\"page\"><span class=\"mbe-library-name\">Revelation</span><span class=\"mbe-library-desc\">Symbols, judgment, and final hope</span></a>\n            <a class=\"mbe-library-item\" href=\"https://sanctuary.mybibleexplorer.com/#structure\"><span class=\"mbe-library-name\">Sanctuary</span><span class=\"mbe-library-desc\">A blueprint of salvation</span></a>\n            <a class=\"mbe-library-item\" href=\"https://lastdayevents.mybibleexplorer.com/index.html\"><span class=\"mbe-library-name\">Last Day Events</span><span class=\"mbe-library-desc\">Earth's final chapter</span></a>\n              </div>\n            </div>\n          </details>\n          <a class=\"mbe-ribbon-give\" href=\"https://mybibleexplorer.com/#donate\">Support</a>\n        </nav>\n      </div>\n    </header>\n";
  const footerMarkup = "<footer class=\"mbe-global-footer\" data-tool=\"revelation\">\n      <div class=\"mbe-shell-wrap mbe-footer-wrap\">\n        <a class=\"mbe-footer-brand\" href=\"https://mybibleexplorer.com\" aria-label=\"My Bible Explorer home\"><img class=\"mbe-footer-logo\" src=\"/assets/my-bible-explorer-logo.png\" alt=\"My Bible Explorer\"></a>\n        <span>Know the Word. Live the Word.</span>\n        <span>To contact, email <a class=\"mbe-footer-link\" href=\"mailto:admin@mybibleexplorer.com\">admin@mybibleexplorer.com</a></span>\n        <a class=\"mbe-footer-link\" href=\"https://mybibleexplorer.com/#donate\">Support</a>\n        <span>&copy; <span data-mbe-year></span> My Bible Explorer</span>\n      </div>\n    </footer>\n    ";

  function updateYear() {
    document.querySelectorAll('[data-mbe-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function ensureIllustratedAssets() {
    if (!document.head) return;
    const href = '/revelation-illustrated.css?v=rvx-35';
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
      title.innerHTML = '<span>The</span><span>Book of</span><span>Revelation</span>';
    }
    const description = document.querySelector('.home-showcase-description');
    if (description) {
      description.textContent = 'Start with the introduction, continue through the chapters, then trace the prophecies and explore focused articles.';
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

  function ensureShell() {
    if (!document.body) return;
    ensureIllustratedAssets();
    ensureLogo();
    ensureHomeHero();
    ensureChapterSummary();
    ensureChapterSummaryObserver();
    ensureDarkThemeObserver();
    document.body.classList.add('mbe-shell-managed');
    document.querySelectorAll('.mbe-global-shell').forEach((node, index) => {
      if (index > 0 || node.getAttribute('data-tool') !== tool || !node.hasAttribute('data-embedded')) node.remove();
    });
    if (!document.querySelector('.mbe-global-shell[data-tool="' + tool + '"][data-embedded="true"]')) {
      document.body.insertAdjacentHTML('afterbegin', headerMarkup);
    }
    const existingFooters = Array.from(document.querySelectorAll('.mbe-global-footer'));
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
