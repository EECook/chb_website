// Gods — Divine Parent Reference Guide
(function() {

var activeFilter = 'all';
var searchTerm = '';

// ═══════════════════════════════════════════════════════════
// GOD DATA (from config.py)
// ═══════════════════════════════════════════════════════════

var GODS = [
    // ── The Big Three ──
    { name: 'Zeus', emoji: '\u26A1', domain: 'Sky, Thunder, King of Gods', color: '#1E90FF', nameColor: 'Yellow', nameColorHex: '#FFFF55',
      effect: 'Jump Boost', desc: 'Children of Zeus are natural leaders with command over lightning and air.', category: 'olympian' },
    { name: 'Poseidon', emoji: '\u{1F531}', domain: 'Sea, Earthquakes, Horses', color: '#00CED1', nameColor: 'Aqua', nameColorHex: '#55FFFF',
      effect: 'Water Breathing', desc: 'Children of Poseidon control water and can communicate with sea creatures.', category: 'olympian' },
    { name: 'Hades', emoji: '\u{1F480}', domain: 'Underworld, Death, Riches', color: '#2F4F4F', nameColor: 'Dark Gray', nameColorHex: '#555555',
      effect: 'Resistance', desc: 'Children of Hades can shadow travel and sense death.', category: 'olympian' },

    // ── The Olympians ──
    { name: 'Athena', emoji: '\u{1F989}', domain: 'Wisdom, Warfare, Crafts', color: '#C0C0C0', nameColor: 'Gray', nameColorHex: '#AAAAAA',
      effect: 'Haste', desc: 'Children of Athena are brilliant strategists and skilled craftsmen.', category: 'olympian' },
    { name: 'Apollo', emoji: '\u2600\uFE0F', domain: 'Sun, Music, Prophecy, Healing', color: '#FFD700', nameColor: 'Gold', nameColorHex: '#FFAA00',
      effect: 'Regeneration', desc: 'Children of Apollo have healing abilities and prophetic dreams.', category: 'olympian' },
    { name: 'Artemis', emoji: '\u{1F3F9}', domain: 'Hunt, Moon, Wilderness', color: '#C0C0C0', nameColor: 'White', nameColorHex: '#FFFFFF',
      effect: 'Speed', desc: 'Hunters of Artemis are expert archers with enhanced senses.', category: 'olympian' },
    { name: 'Ares', emoji: '\u2694\uFE0F', domain: 'War, Violence, Bloodshed', color: '#8B0000', nameColor: 'Dark Red', nameColorHex: '#AA0000',
      effect: 'Strength', desc: 'Children of Ares are fierce warriors with supernatural combat abilities.', category: 'olympian' },
    { name: 'Aphrodite', emoji: '\u{1F495}', domain: 'Love, Beauty, Desire', color: '#FF69B4', nameColor: 'Light Purple', nameColorHex: '#FF55FF',
      effect: 'Regeneration', desc: 'Children of Aphrodite can charmspeak and are unnaturally beautiful.', category: 'olympian' },
    { name: 'Hephaestus', emoji: '\u{1F528}', domain: 'Fire, Forge, Craftsmanship', color: '#B8860B', nameColor: 'Red', nameColorHex: '#FF5555',
      effect: 'Fire Resistance', desc: 'Children of Hephaestus are master builders with fire resistance.', category: 'olympian' },
    { name: 'Hermes', emoji: '\u{1F45F}', domain: 'Travel, Thieves, Messengers', color: '#4169E1', nameColor: 'Blue', nameColorHex: '#5555FF',
      effect: 'Speed', desc: 'Children of Hermes are quick, cunning, and excellent at picking locks.', category: 'olympian' },
    { name: 'Demeter', emoji: '\u{1F33E}', domain: 'Agriculture, Harvest, Fertility', color: '#228B22', nameColor: 'Green', nameColorHex: '#55FF55',
      effect: 'Saturation', desc: 'Children of Demeter can control plants and make things grow.', category: 'olympian' },
    { name: 'Dionysus', emoji: '\u{1F347}', domain: 'Wine, Festivity, Madness', color: '#800080', nameColor: 'Dark Purple', nameColorHex: '#AA00AA',
      effect: 'Luck', desc: 'Children of Dionysus can induce madness and control vines.', category: 'olympian' },
    { name: 'Hera', emoji: '\u{1F451}', domain: 'Marriage, Family, Queen of Gods', color: '#4B0082', nameColor: 'Dark Aqua', nameColorHex: '#00AAAA',
      effect: 'Resistance', desc: 'Children of Hera are rare, known for their regal bearing and family bonds.', category: 'olympian' },

    // ── Minor Gods ──
    { name: 'Hecate', emoji: '\u{1F52E}', domain: 'Magic, Crossroads, Necromancy', color: '#483D8B', nameColor: 'Dark Blue', nameColorHex: '#0000AA',
      effect: 'Slow Falling', desc: 'Children of Hecate are powerful magic users with control over the Mist.', category: 'minor' },
    { name: 'Hypnos', emoji: '\u{1F634}', domain: 'Sleep, Dreams', color: '#6A5ACD', nameColor: 'Blue', nameColorHex: '#5555FF',
      effect: 'Slow Falling', desc: 'Children of Hypnos can induce sleep and enter others\u2019 dreams.', category: 'minor' },
    { name: 'Nike', emoji: '\u{1F3C6}', domain: 'Victory', color: '#FFD700', nameColor: 'Gold', nameColorHex: '#FFAA00',
      effect: 'Speed', desc: 'Children of Nike are driven to win and inspire victory in others.', category: 'minor' },
    { name: 'Nemesis', emoji: '\u2696\uFE0F', domain: 'Revenge, Balance, Justice', color: '#696969', nameColor: 'Gray', nameColorHex: '#AAAAAA',
      effect: 'Resistance', desc: 'Children of Nemesis sense injustice and deliver righteous retribution.', category: 'minor' },
    { name: 'Iris', emoji: '\u{1F308}', domain: 'Rainbows, Messages', color: '#FF1493', nameColor: 'Light Purple', nameColorHex: '#FF55FF',
      effect: 'Glowing', desc: 'Children of Iris can manipulate light and create Iris messages.', category: 'minor' },
    { name: 'Tyche', emoji: '\u{1F3B2}', domain: 'Luck, Fortune, Chance', color: '#00FF7F', nameColor: 'Green', nameColorHex: '#55FF55',
      effect: 'Luck', desc: 'Children of Tyche have unnatural luck and can influence probability.', category: 'minor' },

    // ── New Gods ──
    { name: 'Selene', emoji: '\u{1F319}', domain: 'Titaness of the Moon', color: '#C0C0E0', nameColor: 'Blue', nameColorHex: '#5555FF',
      effect: 'Night Vision', desc: 'Children of Selene are dreamers and night owls, drawn to moonlight and mystery. They see clearly in darkness \u2014 both literal and metaphorical \u2014 and possess an eerie calm that unsettles others.', category: 'primordial' },
    { name: 'Hestia', emoji: '\u{1F3E0}', domain: 'Goddess of the Hearth and Home', color: '#E87040', nameColor: 'Gold', nameColorHex: '#FFAA00',
      effect: 'Absorption', desc: 'Children of Hestia are the heart of any group. Warm, steady, and selfless, they create sanctuary wherever they go. Their quiet strength holds communities together when everything else falls apart.', category: 'primordial' },
    { name: 'Persephone', emoji: '\u{1F338}', domain: 'Queen of the Underworld, Goddess of Spring', color: '#DA70D6', nameColor: 'Light Purple', nameColorHex: '#FF55FF',
      effect: 'Health Boost', desc: 'Children of Persephone walk between worlds \u2014 life and death, joy and grief, bloom and decay. They are resilient beyond measure, finding beauty in dark places and strength in transformation.', category: 'primordial' },
    { name: 'Aeolus', emoji: '\u{1F32C}\uFE0F', domain: 'Keeper of the Winds', color: '#87CEEB', nameColor: 'Aqua', nameColorHex: '#55FFFF',
      effect: 'Dolphin\'s Grace', desc: 'Children of Aeolus are restless, free-spirited, and impossible to pin down. They crave open skies and new horizons. Quick-witted and unpredictable, they shift direction as easily as the wind.', category: 'primordial' },
    { name: 'Pan', emoji: '\u{1F410}', domain: 'God of the Wild, Shepherds, and Rustic Music', color: '#6B8E23', nameColor: 'Dark Green', nameColorHex: '#00AA00',
      effect: 'Saturation', desc: 'Children of Pan are untamed souls with a deep bond to nature and animals. They\u2019re playful troublemakers with a wild streak, happiest far from civilization with dirt under their nails and a song on their lips.', category: 'primordial' },
];

var CATEGORIES = {
    'all':       { label: 'All Gods',         count: 0 },
    'olympian':  { label: '\u{1F3DB}\uFE0F Olympians',    count: 0 },
    'minor':     { label: '\u2728 Minor Gods',   count: 0 },
    'primordial':{ label: '\u{1F319} Titans & Nature', count: 0 },
};

// Count categories
GODS.forEach(function(g) { CATEGORIES[g.category].count++; });
CATEGORIES.all.count = GODS.length;

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

function render(mount) {

    var h = '<div class="gods-page">'

    // ── Hero ──
    + '<div class="gods-hero">'
    +   '<div class="gods-hero-glow"></div>'
    +   '<div class="gods-hero-content reveal">'
    +     '<div class="gs-ornament"><div class="ornament-line"></div><span>\u2726 DIVINE HERITAGE \u2726</span><div class="ornament-line"></div></div>'
    +     '<h1 class="gods-title">The Gods</h1>'
    +     '<p class="gods-subtitle">24 gods await to claim you as their child. Each grants a unique Minecraft blessing and nametag color.</p>'
    +   '</div>'
    + '</div>'

    // ── Quick stats banner ──
    + '<div class="gods-stats reveal">'
    +   '<div class="gods-stats-inner">'
    +     '<div class="gods-stat"><span class="gods-stat-num">24</span><span class="gods-stat-label">Gods</span></div>'
    +     '<div class="gods-stat-div"></div>'
    +     '<div class="gods-stat"><span class="gods-stat-num">24</span><span class="gods-stat-label">Unique Effects</span></div>'
    +     '<div class="gods-stat-div"></div>'
    +     '<div class="gods-stat"><span class="gods-stat-num">15</span><span class="gods-stat-label">Name Colors</span></div>'
    +     '<div class="gods-stat-div"></div>'
    +     '<div class="gods-stat"><span class="gods-stat-num">\u{1F52E}</span><span class="gods-stat-label">Take the Quiz</span></div>'
    +   '</div>'
    + '</div>'

    // ── How claiming works ──
    + '<div class="gods-explainer reveal">'
    +   '<div class="gods-explainer-inner">'
    +     '<h2 class="gods-section-heading">How Claiming Works</h2>'
    +     '<div class="gods-explainer-steps">'
    +       '<div class="gods-exp-step">'
    +         '<div class="gods-exp-icon">\u{1F52E}</div>'
    +         '<div class="gods-exp-title">Take the Quiz</div>'
    +         '<div class="gods-exp-desc">Answer 10 personality questions drawn from a pool of 15. The Oracle determines which god claims you.</div>'
    +       '</div>'
    +       '<div class="gods-exp-arrow">\u2192</div>'
    +       '<div class="gods-exp-step">'
    +         '<div class="gods-exp-icon">\u{1F31F}</div>'
    +         '<div class="gods-exp-title">Get Claimed</div>'
    +         '<div class="gods-exp-desc">A glowing symbol appears above your head. You receive a letter from your divine parent via camp mail.</div>'
    +       '</div>'
    +       '<div class="gods-exp-arrow">\u2192</div>'
    +       '<div class="gods-exp-step">'
    +         '<div class="gods-exp-icon">\u{1F3AE}</div>'
    +         '<div class="gods-exp-title">Receive Your Blessing</div>'
    +         '<div class="gods-exp-desc">If linked to Minecraft, you gain a permanent potion effect and a colored nametag matching your god.</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="gods-exp-note">'
    +       '<strong>Can I change my god?</strong> Yes! Use <code>!claim</code> or <code>!quiz</code> in Discord to retake the quiz at any time. '
    +       'You can also choose manually if you already know who you want.'
    +     '</div>'
    +   '</div>'
    + '</div>'

    // ── Search ──
    + '<div class="gods-search-wrap reveal">'
    +   '<div class="gods-search">'
    +     '<span class="gods-search-icon">\u{1F50D}</span>'
    +     '<input type="text" class="gods-search-input" id="gods-search" placeholder="Search gods by name, domain, or effect\u2026" autocomplete="off">'
    +   '</div>'
    + '</div>'

    // ── Filter tabs ──
    + '<div class="gods-tabs reveal" id="gods-tabs">';

    Object.keys(CATEGORIES).forEach(function(key) {
        var cat = CATEGORIES[key];
        h += '<button class="gods-tab' + (key === activeFilter ? ' active' : '') + '" data-tab="' + key + '">'
          +    cat.label + ' <span class="gods-tab-count">' + cat.count + '</span>'
          + '</button>';
    });

    h += '</div>'

    // ── God grid ──
    + '<div class="gods-grid-wrap" id="gods-content"></div>'

    // ── Closing ──
    + '<div class="gods-closing reveal">'
    +   '<div class="gods-closing-line"></div>'
    +   '<p class="gods-closing-text">Ready to discover your divine heritage? Take the claiming quiz in Discord or on the website.</p>'
    +   '<div class="gods-closing-links">'
    +     '<a href="/portal/quiz" class="cta-secondary" data-link>\u{1F52E} Take the Quiz</a>'
    +     '<a href="/info/new-players" class="cta-secondary" data-link>\u{1F31F} Getting Started</a>'
    +     '<a href="/portal" class="cta-secondary" data-link>\u{1F300} Portal</a>'
    +   '</div>'
    + '</div>'

    + '</div>';

    mount.innerHTML = h;
    renderGods();
    bindEvents(mount);

    // Reveal animation
    requestAnimationFrame(function() {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.1 });
        mount.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
    });

    return { cleanup: function() {} };
}

// ═══════════════════════════════════════════════════════════
// GRID RENDERING
// ═══════════════════════════════════════════════════════════

function renderGods() {
    var el = document.getElementById('gods-content');
    if (!el) return;

    var s = searchTerm.toLowerCase();

    var filtered = GODS.filter(function(g) {
        // Category filter
        if (activeFilter !== 'all' && g.category !== activeFilter) return false;
        // Search filter
        if (!s) return true;
        return g.name.toLowerCase().indexOf(s) >= 0
            || g.domain.toLowerCase().indexOf(s) >= 0
            || g.desc.toLowerCase().indexOf(s) >= 0
            || g.effect.toLowerCase().indexOf(s) >= 0
            || g.nameColor.toLowerCase().indexOf(s) >= 0;
    });

    if (!filtered.length) {
        el.innerHTML = '<div class="gods-empty">No gods found matching \u201C' + esc(searchTerm) + '\u201D</div>';
        return;
    }

    var h = '<div class="gods-grid">';
    filtered.forEach(function(g, i) {
        h += godCard(g, i);
    });
    h += '</div>';

    el.innerHTML = h;

    // Stagger entrance
    el.querySelectorAll('.god-card').forEach(function(card, i) {
        card.style.animationDelay = Math.min(i * 0.04, 0.8) + 's';
    });

    // Expand toggle
    el.querySelectorAll('.god-card-head').forEach(function(head) {
        head.addEventListener('click', function() {
            this.closest('.god-card').classList.toggle('open');
        });
    });
}

function godCard(g, idx) {
    var h = '<div class="god-card" style="--god-color:' + g.color + ';--god-color-faint:' + g.color + '18;--god-color-mid:' + g.color + '40">'
        + '<div class="god-card-glow"></div>'
        + '<div class="god-card-head">'
        +   '<div class="god-card-left">'
        +     '<span class="god-card-emoji">' + g.emoji + '</span>'
        +     '<div>'
        +       '<div class="god-card-name">' + esc(g.name) + '</div>'
        +       '<div class="god-card-domain">' + esc(g.domain) + '</div>'
        +     '</div>'
        +   '</div>'
        +   '<span class="god-card-toggle">\u25BE</span>'
        + '</div>'

        // ── Preview row (always visible) ──
        + '<div class="god-card-preview">'
        +   '<div class="god-card-tag" title="Minecraft Effect">'
        +     '<span class="god-tag-icon">\u{1F3AE}</span> ' + esc(g.effect)
        +   '</div>'
        +   '<div class="god-card-tag god-tag-color" title="Nametag Color" style="--nc:' + g.nameColorHex + '">'
        +     '<span class="god-nametag-dot" style="background:' + g.nameColorHex + '"></span> ' + esc(g.nameColor)
        +   '</div>'
        + '</div>'

        // ── Expanded body ──
        + '<div class="god-card-body">'
        +   '<p class="god-card-desc">' + esc(g.desc) + '</p>'
        +   '<div class="god-card-details">'
        +     '<div class="god-detail">'
        +       '<span class="god-detail-label">Minecraft Blessing</span>'
        +       '<span class="god-detail-value">' + esc(g.effect) + ' (permanent while online)</span>'
        +     '</div>'
        +     '<div class="god-detail">'
        +       '<span class="god-detail-label">Nametag Color</span>'
        +       '<span class="god-detail-value"><span class="god-nametag-sample" style="color:' + g.nameColorHex + ';text-shadow:0 0 6px ' + g.nameColorHex + '60">' + esc(g.name) + 'Player</span></span>'
        +     '</div>'
        +     '<div class="god-detail">'
        +       '<span class="god-detail-label">Category</span>'
        +       '<span class="god-detail-value">' + categoryLabel(g.category) + '</span>'
        +     '</div>'
        +   '</div>'
        +   '<div class="god-card-actions">'
        +     '<a href="/portal/quiz" class="god-action-btn" data-link>Take the Quiz \u{1F52E}</a>'
        +   '</div>'
        + '</div>'

        + '</div>';

    return h;
}

function categoryLabel(cat) {
    if (cat === 'olympian') return 'Olympian';
    if (cat === 'minor') return 'Minor God';
    if (cat === 'primordial') return 'Titan / Nature Deity';
    return cat;
}

// ═══════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════

function bindEvents(mount) {
    document.getElementById('gods-search').addEventListener('input', function() {
        searchTerm = this.value.trim();
        renderGods();
    });

    document.getElementById('gods-tabs').addEventListener('click', function(e) {
        var btn = e.target.closest('.gods-tab');
        if (!btn) return;
        activeFilter = btn.getAttribute('data-tab');
        this.querySelectorAll('.gods-tab').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-tab') === activeFilter);
        });
        renderGods();
    });
}

function esc(s) { if (!s) return ''; var e = document.createElement('span'); e.textContent = s; return e.innerHTML; }

window.GodsInfoPage = render;
})();
