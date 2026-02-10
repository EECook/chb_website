// Quest Tree Viewer — Celestial Edition (Optimized)
(function() {

var canvas, ctx, mmCanvas, mmCtx;
var chapters = [], activeChapter = null, questMap = {};
var hoveredQuest = null, selectedQuest = null;
var cam = {x:0,y:0,zoom:1}, tCam = {x:0,y:0,zoom:1};
var isDragging = false, dragStart = {x:0,y:0};
var CELL = 75, NODE_R = 24, DPR = 1;
var animFrame = null, frame = 0, lineAnim = 0;
var bgStars = [], bgParticles = [];

// ── DIRTY FLAGS ── skip redraws when nothing changed
var dirty = true;           // force full redraw
var camMoved = false;       // camera panned/zoomed
var lastCam = {x:0,y:0,zoom:1};
var CAM_EPS = 0.01;         // threshold for "camera stopped"

// ── CACHES ──
var emojiCache = {};         // quest.id -> emoji string
var starCanvas = null;       // offscreen canvas for static stars
var starsDirty = true;       // rebuild star layer on resize
var mmFrameSkip = 0;         // throttle minimap to every 6th frame

// ── EMOJI MAPPING ──
var EMOJI_MAP = {
    sword:'\u2694\uFE0F', axe:'\u{1FA93}', bow:'\u{1F3F9}', trident:'\u{1F531}',
    crossbow:'\u{1F3F9}', shield:'\u{1F6E1}\uFE0F', dagger:'\u{1F5E1}',
    helmet:'\u{1FA96}', chestplate:'\u{1F455}', legging:'\u{1F456}', boot:'\u{1F45F}',
    armor:'\u{1F6E1}\uFE0F', elytra:'\u{1FA82}',
    diamond:'\u{1F48E}', emerald:'\u{1F48E}', gold_ingot:'\u{1F4B0}', gold_block:'\u{1F4B0}',
    iron:'\u2699\uFE0F', copper:'\u{1F7E7}', netherite:'\u{1F311}', coal:'\u2B2B',
    redstone:'\u{1F534}', lapis:'\u{1F535}', amethyst:'\u{1F7E3}', quartz:'\u25C7',
    bread:'\u{1F35E}', cake:'\u{1F382}', cookie:'\u{1F36A}', apple:'\u{1F34E}',
    chicken:'\u{1F357}', beef:'\u{1F969}', fish:'\u{1F41F}', cod:'\u{1F41F}',
    salmon:'\u{1F41F}', pizza:'\u{1F355}', stew:'\u{1F372}', potato:'\u{1F954}',
    carrot:'\u{1F955}', melon:'\u{1F348}', berry:'\u{1FAD0}', mushroom:'\u{1F344}',
    pumpkin:'\u{1F383}', sugar:'\u{1F36C}',
    egg:'\u{1F95A}', feather:'\u{1FAB6}', bone:'\u{1F9B4}', wool:'\u{1F411}',
    leather:'\u{1F43E}', fur:'\u{1F43B}', honey:'\u{1F36F}', flower:'\u{1F33C}',
    seed:'\u{1F331}', sapling:'\u{1F331}', wheat:'\u{1F33E}', hay:'\u{1F33E}',
    log:'\u{1FAB5}', wood:'\u{1FAB5}', plank:'\u{1FAB5}', bamboo:'\u{1F38D}',
    cactus:'\u{1F335}', vine:'\u{1F33F}', coral:'\u{1FAB8}', kelp:'\u{1F33F}',
    horse:'\u{1F40E}', wolf:'\u{1F43A}', cat:'\u{1F431}', cow:'\u{1F404}',
    pig:'\u{1F437}', sheep:'\u{1F411}', rabbit:'\u{1F430}', fox:'\u{1F98A}',
    bee:'\u{1F41D}', turtle:'\u{1F422}', frog:'\u{1F438}', goat:'\u{1F410}',
    parrot:'\u{1F99C}', dolphin:'\u{1F42C}', squid:'\u{1F991}', spider:'\u{1F577}\uFE0F',
    bat:'\u{1F987}', penguin:'\u{1F427}', bison:'\u{1F403}',
    stone:'\u{1FAA8}', cobble:'\u{1FAA8}', brick:'\u{1F9F1}', glass:'\u{1FA9F}',
    sand:'\u{1F3D6}\uFE0F', gravel:'\u26B0\uFE0F', clay:'\u{1F3FA}',
    obsidian:'\u{1F30C}', bedrock:'\u26F0\uFE0F', concrete:'\u{1F532}',
    lantern:'\u{1FA94}', torch:'\u{1F525}', campfire:'\u{1F525}',
    furnace:'\u{1F525}', crafting:'\u{1F6E0}\uFE0F', anvil:'\u{1F528}',
    enchant:'\u{1F52E}', brewing:'\u{1F9EA}', cauldron:'\u{1F9EA}',
    chest:'\u{1F4E6}', barrel:'\u{1F6E2}\uFE0F', hopper:'\u{1F3ED}',
    piston:'\u2699\uFE0F', lever:'\u{1F39B}\uFE0F',
    bed:'\u{1F6CF}\uFE0F', door:'\u{1F6AA}', fence:'\u{1F3E0}',
    pickaxe:'\u26CF\uFE0F', shovel:'\u{1F6A7}', hoe:'\u{1F33E}',
    fishing_rod:'\u{1F3A3}', shears:'\u2702\uFE0F', bucket:'\u{1FAA3}',
    flint:'\u{1F525}', compass:'\u{1F9ED}', clock:'\u{1F552}', spyglass:'\u{1F52D}',
    lead:'\u{1FA62}', saddle:'\u{1F40E}', name_tag:'\u{1F3F7}\uFE0F',
    potion:'\u{1F9EA}', ender_pearl:'\u{1F52E}', ender_eye:'\u{1F441}\uFE0F',
    blaze:'\u{1F525}', ghast:'\u{1F47B}', wither:'\u{1F480}', dragon:'\u{1F409}',
    totem:'\u{1F3C6}', enchanted:'\u2728', book:'\u{1F4D6}', experience:'\u{1F31F}',
    xp:'\u{1F31F}', firework:'\u{1F386}', tnt:'\u{1F4A3}', arrow:'\u{1F3F9}',
    beacon:'\u{1F4A0}', conduit:'\u{1F30A}',
    paper:'\u{1F4DC}', map:'\u{1F5FA}\uFE0F', writable:'\u{1F4DD}',
    painting:'\u{1F5BC}\uFE0F', frame:'\u{1F5BC}\uFE0F',
    music_disc:'\u{1F4BF}', record:'\u{1F4BF}', horn:'\u{1F4EF}',
    bundle:'\u{1F392}', backpack:'\u{1F392}', shulker:'\u{1F4E6}',
    head:'\u{1F464}', skull:'\u{1F480}', spawn_egg:'\u{1F95A}',
    string:'\u{1F9F5}', stick:'\u{1FAB5}', slime:'\u{1F7E2}',
    nether:'\u{1F525}', end:'\u{1F30C}', overworld:'\u{1F30D}',
    ocean:'\u{1F30A}', desert:'\u{1F3DC}\uFE0F', jungle:'\u{1F334}',
    swamp:'\u{1F40A}', mountain:'\u26F0\uFE0F', cave:'\u{1F573}\uFE0F',
    village:'\u{1F3D8}\uFE0F', fortress:'\u{1F3F0}', bastion:'\u{1F3F0}',
    monument:'\u{1F3DB}\uFE0F', temple:'\u{1F3DB}\uFE0F',
    portal:'\u{1F300}', ship:'\u26F5',
    kill:'\u2694\uFE0F', break:'\u26CF\uFE0F', location:'\u{1F4CD}',
    checkmark:'\u2714\uFE0F', advancement:'\u{1F3C5}',
    structure:'\u{1F3DB}\uFE0F',
    lightning:'\u26A1', zeus:'\u26A1', poseidon:'\u{1F531}', hades:'\u{1F480}',
    hermes:'\u{1F45F}', artemis:'\u{1F3F9}', apollo:'\u2600\uFE0F',
    athena:'\u{1F989}', ares:'\u{1F6E1}\uFE0F', demeter:'\u{1F33E}',
    hephaestus:'\u{1F525}', dionysus:'\u{1F347}', aphrodite:'\u{1F339}',
    percy:'\u{1F531}', annabeth:'\u{1F4D6}', camp:'\u{1F3D5}\uFE0F',
    quest:'\u{1F5FA}\uFE0F', trial:'\u26A1', godly:'\u{1F31F}',
    welcome:'\u{1F3E0}', mailbox:'\u{1F4EC}', mail:'\u{1F4EC}',
    find:'\u{1F50D}', talk:'\u{1F4AC}', deliver:'\u{1F4E8}',
    collect:'\u{1F4E6}', craft:'\u{1F6E0}\uFE0F', build:'\u{1F3D7}\uFE0F}',
    explore:'\u{1F9ED}', discover:'\u{1F50D}', obtain:'\u{1F44B}',
    summon:'\u{1F52E}', defeat:'\u2694\uFE0F', destroy:'\u{1F4A5}',
    place:'\u{1F4CC}', use:'\u{1F449}', visit:'\u{1F463}',
    brew:'\u{1F9EA}', ride:'\u{1F3C7}', tame:'\u{1F49B}',
    grow:'\u{1F331}', harvest:'\u{1F33E}', plant:'\u{1F331}',
    smelt:'\u{1F525}', trade:'\u{1F91D}', enchant:'\u2728',
    upgrade:'\u{1F199}', repair:'\u{1F527}',
    skyforge:'\u{1F525}', divine:'\u{1F31F}', champion:'\u{1F451}'
};

// Pre-sorted keys by length descending (done once, not per-call)
var EMOJI_KEYS_SORTED = Object.keys(EMOJI_MAP).sort(function(a,b) { return b.length - a.length; });

function getQuestEmoji(q) {
    // Check cache first
    if (emojiCache[q.id]) return emojiCache[q.id];

    var searchTerms = [];
    if (q.icon) searchTerms.push(q.icon.toLowerCase());
    if (q.tasks) q.tasks.forEach(function(t) {
        if (t.item) searchTerms.push(t.item.toLowerCase());
        if (t.advancement) searchTerms.push(t.advancement.toLowerCase());
        if (t.block) searchTerms.push(t.block.toLowerCase());
        if (t.entity) searchTerms.push(t.entity.toLowerCase());
        if (t.structure) searchTerms.push(t.structure.toLowerCase());
    });
    searchTerms.push(q.title.toLowerCase());
    if (q.subtitle) searchTerms.push(q.subtitle.toLowerCase());

    var combined = searchTerms.join(' ');
    var result = null;

    for (var i = 0; i < EMOJI_KEYS_SORTED.length; i++) {
        if (combined.indexOf(EMOJI_KEYS_SORTED[i]) >= 0) {
            result = EMOJI_MAP[EMOJI_KEYS_SORTED[i]];
            break;
        }
    }

    if (!result) {
        if (q.taskType === 'item') result = '\u{1F4E6}';
        else if (q.taskType === 'checkmark') result = '\u2714\uFE0F';
        else if (q.taskType === 'location') result = '\u{1F4CD}';
        else if (q.taskType === 'advancement') result = '\u{1F3C5}';
        else if (q.taskType === 'kill') result = '\u2694\uFE0F';
        else result = '\u2B50';
    }

    emojiCache[q.id] = result;
    return result;
}

var CHAPTER_COLORS = {
    story_quests: { main: '#D4AF37', glow: 'rgba(212,175,55,', line: 'rgba(212,175,55,' },
    the_overworld: { main: '#4ade80', glow: 'rgba(74,222,128,', line: 'rgba(74,222,128,' },
    the_nether: { main: '#f87171', glow: 'rgba(248,113,113,', line: 'rgba(248,113,113,' },
    the_end: { main: '#c084fc', glow: 'rgba(192,132,252,', line: 'rgba(192,132,252,' },
    battle_pass: { main: '#D4AF37', glow: 'rgba(212,175,55,', line: 'rgba(212,175,55,' },
    armor: { main: '#94a3b8', glow: 'rgba(148,163,184,', line: 'rgba(148,163,184,' },
    husbandry: { main: '#a3e635', glow: 'rgba(163,230,53,', line: 'rgba(163,230,53,' },
    alexs_caves: { main: '#22d3ee', glow: 'rgba(34,211,238,', line: 'rgba(34,211,238,' },
    zues_trials: { main: '#fbbf24', glow: 'rgba(251,191,36,', line: 'rgba(251,191,36,' },
    easter_eggs: { main: '#f0abfc', glow: 'rgba(240,171,252,', line: 'rgba(240,171,252,' },
    hourly_reward: { main: '#67e8f9', glow: 'rgba(103,232,249,', line: 'rgba(103,232,249,' }
};

function getColors() {
    return CHAPTER_COLORS[activeChapter ? activeChapter.filename : ''] || CHAPTER_COLORS.story_quests;
}

var TASK_ICONS = { item:'\u{1F4E6}', location:'\u{1F4CD}', checkmark:'\u2714', kill:'\u2694', xp:'\u2728', advancement:'\u{1F3C5}', structure:'\u{1F3DB}', 'questsadditions:break':'\u26CF', unknown:'\u2753' };
var BP_ICONS = { paper:'\u{1F4DC}', bundle:'\u{1F392}', player_head:'\u{1F464}', diamond_sword:'\u2694', bow:'\u{1F3F9}', trident:'\u{1F531}', shield:'\u{1F6E1}', elytra:'\u{1FA82}', diamond:'\u{1F48E}', emerald:'\u{1F48E}', gold_ingot:'\u{1F4B0}', ender_pearl:'\u{1F52E}', totem_of_undying:'\u{1F3C6}', music_disc:'\u{1F4BF}', golden_apple:'\u{1F34E}', cooked_chicken:'\u{1F357}', bread:'\u{1F35E}', cake:'\u{1F382}', cookie:'\u{1F36A}', pizza:'\u{1F355}', leather_chestplate:'\u{1F455}', leather_leggings:'\u{1F456}', leather_boots:'\u{1F45F}', item_frame:'\u{1F5BC}', book:'\u{1F4D6}', lantern:'\u{1FA94}', campfire:'\u{1F525}', spawn_egg:'\u{1F95A}', chest:'\u{1F4E6}', firework_rocket:'\u{1F386}', potion:'\u{1F9EA}', experience_bottle:'\u{1F9EA}', backpack:'\u{1F392}' };

// ── RENDER ENTRY ──
function render(mount) {
    if (!window.QUEST_DATA || !window.QUEST_DATA.length) {
        mount.innerHTML = '<div style="text-align:center;padding:4rem"><p style="color:var(--marble-muted)">Quest data not loaded</p></div>';
        return { cleanup: function(){} };
    }
    chapters = window.QUEST_DATA;
    mount.innerHTML = '<div class="quest-page" id="quest-page"><div class="quest-tabs" id="quest-tabs"></div><div id="quest-content"></div></div>';
    buildTabs();
    var first = chapters.find(function(c) { return c.quests.length > 4 && c.filename !== 'battle_pass' && c.filename !== 'armor'; }) || chapters[0];
    switchChapter(first.filename);
    return { cleanup: function() { if (animFrame) cancelAnimationFrame(animFrame); animFrame = null; } };
}

// ── TABS ──
function buildTabs() {
    var el = document.getElementById('quest-tabs');
    if (!el) return;
    var icons = { story_quests:'\u{1F3E0}', the_overworld:'\u{1F30D}', the_nether:'\u{1F525}', the_end:'\u{1F30C}', battle_pass:'\u{1F3C6}', armor:'\u{1F6E1}', husbandry:'\u{1F33E}', alexs_caves:'\u{1F9EB}', zues_trials:'\u26A1', easter_eggs:'\u{1F95A}', hourly_reward:'\u23F0' };
    var h = '<a href="/news" class="qt-back" data-link>\u2190</a>';
    chapters.forEach(function(ch) {
        if (ch.quests.length < 1 || ch.filename === 'armor') return;
        h += '<button class="qt-tab" data-chapter="' + ch.filename + '">' + (icons[ch.filename]||'\u{1F5FA}') + ' ' + ch.title + '<span class="qt-count">' + ch.quests.length + '</span></button>';
    });
    el.innerHTML = h;
    el.querySelectorAll('.qt-tab').forEach(function(t) { t.addEventListener('click', function() { switchChapter(this.getAttribute('data-chapter')); }); });
}

function switchChapter(fn) {
    var ch = chapters.find(function(c) { return c.filename === fn; });
    if (!ch) return;
    if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
    activeChapter = ch; selectedQuest = null; hoveredQuest = null;
    questMap = {}; emojiCache = {};  // clear emoji cache on chapter switch
    ch.quests.forEach(function(q) { questMap[q.id] = q; });
    document.querySelectorAll('.qt-tab').forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-chapter') === fn); });
    if (fn === 'battle_pass') renderBP(ch); else renderTree(ch);
}

// ═════════════════════════════════
// CANVAS TREE
// ═════════════════════════════════

function renderTree(ch) {
    var el = document.getElementById('quest-content');
    if (!el) return;
    el.innerHTML = '<div class="quest-canvas-area"><div class="quest-canvas-wrap" id="qcw"><canvas id="qc"></canvas></div>'
        + '<div class="quest-zoom"><button class="qz-btn" id="qzi">+</button><div class="qz-level" id="qzl">100%</div><button class="qz-btn" id="qzo">\u2212</button><button class="qz-btn" id="qzf" style="margin-top:0.25rem">\u25A3</button></div>'
        + '<div class="quest-minimap" id="qmm"><canvas id="qmc"></canvas></div>'
        + '<div class="quest-splash" id="qsp"><div class="qs-title" id="qst"></div><div class="qs-line"></div><div class="qs-count" id="qsc"></div></div>'
        + '<div class="quest-hint" id="qh">Scroll to zoom \u2022 Drag to pan \u2022 Click a quest</div>'
        + '<div class="quest-detail-overlay" id="qdo"><div class="quest-detail" id="qdd"></div></div></div>';

    canvas = document.getElementById('qc'); ctx = canvas.getContext('2d');
    mmCanvas = document.getElementById('qmc'); mmCtx = mmCanvas ? mmCanvas.getContext('2d') : null;
    DPR = window.devicePixelRatio || 1;
    resize();
    initBgStars();
    bindCanvas();
    lineAnim = 0;
    dirty = true;
    splash(ch);
    fit(true);
    setTimeout(function() { var h = document.getElementById('qh'); if (h) h.style.opacity = '0'; }, 4000);
    loop();
}

function initBgStars() {
    bgStars = [];
    for (var i = 0; i < 120; i++) {
        bgStars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3, s: Math.random() * 0.5 + 0.5, phase: Math.random() * Math.PI * 2 });
    }
    bgParticles = [];
    for (var j = 0; j < 20; j++) {
        bgParticles.push({ x: Math.random(), y: Math.random(), vx: (Math.random()-0.5)*0.0001, vy: (Math.random()-0.5)*0.0001, r: Math.random()*40+20, o: Math.random()*0.03+0.01 });
    }
    starsDirty = true;
}

// ── BUILD OFFSCREEN STAR LAYER ──
// Stars twinkle slowly enough that we can redraw them every ~8 frames
// instead of every frame. We bake them to an offscreen canvas.
var starsLastFrame = -999;

function buildStarLayer(cw, ch) {
    if (!starCanvas) {
        starCanvas = document.createElement('canvas');
    }
    starCanvas.width = cw;
    starCanvas.height = ch;
    var sctx = starCanvas.getContext('2d');
    sctx.clearRect(0, 0, cw, ch);
    var t = frame * 0.02;
    bgStars.forEach(function(s) {
        var twinkle = 0.4 + 0.6 * Math.sin(t * s.s + s.phase);
        sctx.fillStyle = 'rgba(245,245,240,' + (twinkle * 0.5) + ')';
        sctx.beginPath(); sctx.arc(s.x*cw, s.y*ch, s.r, 0, Math.PI*2); sctx.fill();
    });
    starsLastFrame = frame;
}

function resize() {
    var w = document.getElementById('qcw');
    if (!w || !canvas) return;
    canvas.width = w.clientWidth * DPR; canvas.height = w.clientHeight * DPR;
    canvas.style.width = w.clientWidth + 'px'; canvas.style.height = w.clientHeight + 'px';
    var mm = document.getElementById('qmm');
    if (mm && mmCanvas) { mmCanvas.width = mm.clientWidth * DPR; mmCanvas.height = mm.clientHeight * DPR; }
    starsDirty = true;
    dirty = true;
}

function splash(ch) {
    var sp = document.getElementById('qsp'); if (!sp) return;
    document.getElementById('qst').textContent = ch.title;
    document.getElementById('qsc').textContent = ch.quests.length + ' quest' + (ch.quests.length !== 1 ? 's' : '');
    sp.classList.remove('show'); void sp.offsetWidth; sp.classList.add('show');
}

function fit(instant) {
    if (!activeChapter || !activeChapter.quests.length) return;
    var qs = activeChapter.quests, mnX=Infinity, mxX=-Infinity, mnY=Infinity, mxY=-Infinity;
    qs.forEach(function(q) { if(q.x<mnX)mnX=q.x; if(q.x>mxX)mxX=q.x; if(q.y<mnY)mnY=q.y; if(q.y>mxY)mxY=q.y; });
    var w=canvas.width/DPR, h=canvas.height/DPR, p=140;
    var z = Math.min(w/((mxX-mnX)*CELL+p*2), h/((mxY-mnY)*CELL+p*2), 2.2);
    z = Math.max(z, 0.12);
    tCam.x = -(mnX+mxX)/2*CELL; tCam.y = -(mnY+mxY)/2*CELL; tCam.zoom = z;
    if (instant) { cam.x=tCam.x; cam.y=tCam.y; cam.zoom=tCam.zoom; }
    dirty = true;
}

function bindCanvas() {
    var w = document.getElementById('qcw'); if (!w) return;
    window.addEventListener('resize', resize);
    w.addEventListener('mousedown', function(e) { if(e.button!==0) return; isDragging=true; dragStart.x=e.clientX; dragStart.y=e.clientY; w.classList.add('grabbing'); });
    window.addEventListener('mousemove', function(e) {
        if(isDragging) {
            tCam.x+=(e.clientX-dragStart.x)/cam.zoom; tCam.y+=(e.clientY-dragStart.y)/cam.zoom;
            cam.x=tCam.x; cam.y=tCam.y;
            dragStart.x=e.clientX; dragStart.y=e.clientY;
            dirty = true;
        }
    });
    window.addEventListener('mouseup', function() { isDragging=false; if(w)w.classList.remove('grabbing'); });
    w.addEventListener('wheel', function(e) { e.preventDefault(); tCam.zoom=Math.max(0.08,Math.min(3.5,tCam.zoom*(e.deltaY>0?0.88:1.12))); dirty=true; }, {passive:false});
    canvas.addEventListener('click', function(e) {
        if(!activeChapter) return;
        var r=canvas.getBoundingClientRect(); var h=hit(e.clientX-r.left,e.clientY-r.top);
        if(h){selectedQuest=h;showDetail(h);dirty=true;}else{closeDetail();selectedQuest=null;dirty=true;}
    });
    canvas.addEventListener('mousemove', function(e) {
        if(isDragging||!activeChapter) return;
        var r=canvas.getBoundingClientRect();
        var prev = hoveredQuest;
        hoveredQuest=hit(e.clientX-r.left,e.clientY-r.top);
        canvas.style.cursor=hoveredQuest?'pointer':'grab';
        if (prev !== hoveredQuest) dirty = true;
    });
    // Touch
    var ts=null,td=0;
    w.addEventListener('touchstart',function(e){if(e.touches.length===1)ts={x:e.touches[0].clientX,y:e.touches[0].clientY};else if(e.touches.length===2)td=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY);},{passive:true});
    w.addEventListener('touchmove',function(e){e.preventDefault();dirty=true;if(e.touches.length===1&&ts){var dx=e.touches[0].clientX-ts.x,dy=e.touches[0].clientY-ts.y;tCam.x+=dx/cam.zoom;tCam.y+=dy/cam.zoom;cam.x=tCam.x;cam.y=tCam.y;ts={x:e.touches[0].clientX,y:e.touches[0].clientY};}else if(e.touches.length===2){var nd=Math.hypot(e.touches[1].clientX-e.touches[0].clientX,e.touches[1].clientY-e.touches[0].clientY);if(td>0)tCam.zoom=Math.max(0.08,Math.min(3.5,tCam.zoom*(nd/td)));td=nd;}},{passive:false});
    document.getElementById('qzi').addEventListener('click',function(){tCam.zoom=Math.min(3.5,tCam.zoom*1.35);dirty=true;});
    document.getElementById('qzo').addEventListener('click',function(){tCam.zoom=Math.max(0.08,tCam.zoom/1.35);dirty=true;});
    document.getElementById('qzf').addEventListener('click',function(){fit(false);});
    document.getElementById('qdo').addEventListener('click',function(e){if(e.target===this)closeDetail();});
}

function hit(mx,my) {
    if(!activeChapter) return null;
    var w=canvas.width/DPR, h=canvas.height/DPR;
    for(var i=activeChapter.quests.length-1;i>=0;i--) {
        var q=activeChapter.quests[i];
        var sx=(q.x*CELL+cam.x)*cam.zoom+w/2, sy=(q.y*CELL+cam.y)*cam.zoom+h/2;
        var r=NODE_R*cam.zoom*(q.size>1?Math.min(q.size*0.55,1.8):1);
        var dx=mx-sx,dy=my-sy;
        if(dx*dx+dy*dy<=r*r*1.5) return q;
    }
    return null;
}

// ── DETAIL PANEL ──
function showDetail(q) {
    var ov=document.getElementById('qdo'),p=document.getElementById('qdd');
    if(!ov||!p) return;
    var em = getQuestEmoji(q);
    var h='<div class="qd-close"><button class="qd-close-btn" id="qdc">\u2715</button></div><div class="qd-body">';
    h+='<div class="qd-icon-row"><div class="qd-icon-big">'+em+'</div><div class="qd-title">'+esc(q.title)+'</div></div>';
    if(q.subtitle) h+='<div class="qd-subtitle">'+esc(q.subtitle)+'</div>';
    if(q.description) h+='<div class="qd-desc">'+esc(q.description)+'</div>';
    if(q.tasks&&q.tasks.length) {
        h+='<div class="qd-section"><div class="qd-section-label">\u{1F4CB} Tasks</div>';
        q.tasks.forEach(function(t){
            var ic=TASK_ICONS[t.type]||TASK_ICONS.unknown, tx=t.title||t.item||t.advancement||t.block||t.entity||t.type;
            if(t.count&&t.count>1) tx+='\u00D7'+t.count;
            h+='<div class="qd-task"><span class="qd-task-icon">'+ic+'</span><div><div class="qd-task-text">'+esc(tx)+'</div><div class="qd-task-type">'+esc(t.type)+'</div></div></div>';
        });
        h+='</div>';
    }
    if(q.rewards&&q.rewards.length) {
        h+='<div class="qd-section"><div class="qd-section-label">\u{1F381} Rewards</div>';
        q.rewards.forEach(function(r){ if(r.xp) h+='<span class="qd-reward qd-reward-xp">\u2728 '+r.xp+' XP</span>'; else if(r.item){var n=r.item.split(':').pop().replace(/_/g,' ');h+='<span class="qd-reward">\u{1F4E6} '+esc(n)+'</span>';} });
        h+='</div>';
    }
    if(q.dependencies&&q.dependencies.length) {
        h+='<div class="qd-section"><div class="qd-section-label">\u{1F517} Requires</div><div class="qd-deps">';
        q.dependencies.forEach(function(d){var dep=questMap[d];h+='<span class="qd-dep-chip" data-dep="'+d+'">'+esc(dep?dep.title:d.substring(0,8))+'</span>';});
        h+='</div></div>';
    }
    h+='<div class="qd-id">'+q.id+'</div></div>';
    p.innerHTML=h; ov.classList.add('open');
    document.getElementById('qdc').addEventListener('click',closeDetail);
    p.querySelectorAll('.qd-dep-chip').forEach(function(c){c.addEventListener('click',function(){var d=questMap[this.getAttribute('data-dep')];if(d){selectedQuest=d;tCam.x=-d.x*CELL;tCam.y=-d.y*CELL;showDetail(d);dirty=true;}});});
}

function closeDetail() { var o=document.getElementById('qdo'); if(o)o.classList.remove('open'); selectedQuest=null; dirty=true; }

// ── VIEWPORT CULLING HELPER ──
// Returns the visible world-space bounding box with padding
function getViewBounds() {
    var cw = canvas.width/DPR, ch = canvas.height/DPR;
    var pad = NODE_R * 3 + 40; // extra padding for labels/glows
    return {
        left:   (-cam.x - cw/2/cam.zoom) * (1/CELL) - pad/CELL,
        right:  (-cam.x + cw/2/cam.zoom) * (1/CELL) + pad/CELL,
        top:    (-cam.y - ch/2/cam.zoom) * (1/CELL) - pad/CELL,
        bottom: (-cam.y + ch/2/cam.zoom) * (1/CELL) + pad/CELL
    };
}

function isInView(q, bounds) {
    return q.x >= bounds.left && q.x <= bounds.right && q.y >= bounds.top && q.y <= bounds.bottom;
}

// ── RENDER LOOP ──
function loop() {
    animFrame = requestAnimationFrame(loop);

    // Smooth camera interpolation
    var dx = tCam.x - cam.x, dy = tCam.y - cam.y, dz = tCam.zoom - cam.zoom;
    if (Math.abs(dx) > CAM_EPS || Math.abs(dy) > CAM_EPS || Math.abs(dz) > 0.001) {
        cam.x += dx * 0.1;
        cam.y += dy * 0.1;
        cam.zoom += dz * 0.1;
        dirty = true;
    }

    // Line animation drives dirty too
    if (lineAnim < 1) { lineAnim += 0.012; dirty = true; }

    // Animated elements (shimmer dots, pulse rings) need periodic redraws
    // but only if we have a selected/hovered quest
    if (hoveredQuest || selectedQuest) dirty = true;

    if (dirty) {
        draw();
        dirty = false;
    }

    // Update zoom label less frequently
    if(frame%10===0){var l=document.getElementById('qzl');if(l)l.textContent=Math.round(cam.zoom*100)+'%';}
    frame++;
}

function draw() {
    if(!canvas||!ctx||!activeChapter) return;
    var w=canvas.width,h=canvas.height;
    ctx.save(); ctx.scale(DPR,DPR);
    var cw=w/DPR, ch=h/DPR;
    var colors = getColors();

    // Background
    ctx.fillStyle='#030014'; ctx.fillRect(0,0,cw,ch);

    // Nebula blobs — only update positions, draw simply
    bgParticles.forEach(function(p) {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-0.1||p.x>1.1) p.vx*=-1;
        if(p.y<-0.1||p.y>1.1) p.vy*=-1;
        var g=ctx.createRadialGradient(p.x*cw,p.y*ch,0,p.x*cw,p.y*ch,p.r*cam.zoom);
        g.addColorStop(0, colors.glow + (p.o*0.7)+')');
        g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.fillRect(0,0,cw,ch);
    });

    // Stars — use offscreen canvas, rebuilt every 8 frames
    if (starsDirty || frame - starsLastFrame > 8) {
        buildStarLayer(cw, ch);
        starsDirty = false;
    }
    if (starCanvas) {
        ctx.drawImage(starCanvas, 0, 0);
    }

    // Grid (subtle)
    var gs=CELL*cam.zoom;
    if(gs>15) {
        var ox=(cam.x*cam.zoom+cw/2)%gs, oy=(cam.y*cam.zoom+ch/2)%gs;
        ctx.strokeStyle='rgba(212,175,55,0.025)'; ctx.lineWidth=1; ctx.beginPath();
        for(var x=ox;x<cw;x+=gs){ctx.moveTo(x,0);ctx.lineTo(x,ch);}
        for(var y=oy;y<ch;y+=gs){ctx.moveTo(0,y);ctx.lineTo(cw,y);}
        ctx.stroke();
    }

    ctx.save();
    ctx.translate(cw/2,ch/2); ctx.scale(cam.zoom,cam.zoom); ctx.translate(cam.x,cam.y);

    var bounds = getViewBounds();
    drawDeps(colors, bounds);
    drawNodes(colors, bounds);

    ctx.restore(); ctx.restore();

    // Minimap — throttle to every 6 frames
    mmFrameSkip++;
    if (mmFrameSkip >= 6) {
        drawMinimap(colors);
        mmFrameSkip = 0;
    }
}

function drawDeps(colors, bounds) {
    var qs=activeChapter.quests, prog=Math.min(lineAnim,1);
    qs.forEach(function(q) {
        if(!q.dependencies) return;
        q.dependencies.forEach(function(did) {
            var dep=questMap[did]; if(!dep) return;

            // Cull: skip if both endpoints are offscreen
            if (!isInView(q, bounds) && !isInView(dep, bounds)) return;

            var x1=dep.x*CELL,y1=dep.y*CELL,x2=q.x*CELL,y2=q.y*CELL;
            var ex=x1+(x2-x1)*prog,ey=y1+(y2-y1)*prog;
            var isHL=(hoveredQuest&&(hoveredQuest.id===q.id||hoveredQuest.id===dep.id))||(selectedQuest&&(selectedQuest.id===q.id||selectedQuest.id===dep.id));

            // Glow line behind
            if(isHL) {
                ctx.strokeStyle=colors.line+'0.15)'; ctx.lineWidth=8;
                ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(ex,ey); ctx.stroke();
            }

            ctx.strokeStyle=isHL?colors.line+'0.7)':colors.line+'0.2)';
            ctx.lineWidth=isHL?2.5:1.2;

            var midX=(x1+ex)/2,midY=(y1+ey)/2,dist=Math.sqrt((ex-x1)*(ex-x1)+(ey-y1)*(ey-y1));
            var curve=Math.min(dist*0.12,18);
            var nx=-(ey-y1)/(dist||1)*curve,ny=(ex-x1)/(dist||1)*curve;
            ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(midX+nx,midY+ny,ex,ey); ctx.stroke();

            // Animated shimmer dot
            if(prog>=0.9) {
                var shimPos = ((frame*0.008)%1);
                var sx=x1+(x2-x1)*shimPos, sy=y1+(y2-y1)*shimPos;
                ctx.fillStyle=colors.glow+'0.5)';
                ctx.beginPath(); ctx.arc(sx,sy,isHL?3:1.5,0,Math.PI*2); ctx.fill();
            }

            // Arrow
            if(prog>=0.95) {
                var angle=Math.atan2(y2-(midY+ny),x2-(midX+nx));
                var aL=isHL?11:8,ax=x2-Math.cos(angle)*(NODE_R+5),ay=y2-Math.sin(angle)*(NODE_R+5);
                ctx.fillStyle=isHL?colors.line+'0.7)':colors.line+'0.35)';
                ctx.beginPath(); ctx.moveTo(ax,ay);
                ctx.lineTo(ax-Math.cos(angle-0.35)*aL,ay-Math.sin(angle-0.35)*aL);
                ctx.lineTo(ax-Math.cos(angle+0.35)*aL,ay-Math.sin(angle+0.35)*aL);
                ctx.closePath(); ctx.fill();
            }
        });
    });
}

function drawNodes(colors, bounds) {
    var t = frame*0.025;
    activeChapter.quests.forEach(function(q) {
        // Viewport culling
        if (!isInView(q, bounds)) return;

        var x=q.x*CELL, y=q.y*CELL;
        var r=NODE_R*(q.size>1?Math.min(q.size*0.55,1.8):1);
        var isH=hoveredQuest&&hoveredQuest.id===q.id;
        var isS=selectedQuest&&selectedQuest.id===q.id;
        var isC=false;
        if(hoveredQuest||selectedQuest){var ref=selectedQuest||hoveredQuest;if(ref.dependencies&&ref.dependencies.indexOf(q.id)>=0)isC=true;if(q.dependencies&&q.dependencies.indexOf(ref.id)>=0)isC=true;}
        var em=getQuestEmoji(q);  // cached lookup

        // Outer glow
        if(isH||isS) {
            var gr=r+20+Math.sin(t*2.5)*4;
            var g=ctx.createRadialGradient(x,y,r*0.5,x,y,gr);
            g.addColorStop(0,isS?colors.glow+'0.35)':colors.glow+'0.2)');
            g.addColorStop(0.6,isS?colors.glow+'0.08)':colors.glow+'0.04)');
            g.addColorStop(1,'transparent');
            ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,gr,0,Math.PI*2); ctx.fill();
        }
        if(isC) {
            var cg=ctx.createRadialGradient(x,y,r*0.5,x,y,r+14);
            cg.addColorStop(0,colors.glow+'0.12)'); cg.addColorStop(1,'transparent');
            ctx.fillStyle=cg; ctx.beginPath(); ctx.arc(x,y,r+14,0,Math.PI*2); ctx.fill();
        }

        var shape=q.shape||'';
        ctx.beginPath();
        if(shape==='diamond'){ctx.moveTo(x,y-r);ctx.lineTo(x+r,y);ctx.lineTo(x,y+r);ctx.lineTo(x-r,y);ctx.closePath();}
        else if(shape==='hexagon'){for(var i=0;i<6;i++){var a=Math.PI/3*i-Math.PI/6;if(i===0)ctx.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);else ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}ctx.closePath();}
        else if(shape==='none'){}
        else{ctx.arc(x,y,r,0,Math.PI*2);}

        if(shape!=='none') {
            var fg=ctx.createRadialGradient(x-r*0.25,y-r*0.35,0,x,y,r*1.2);
            fg.addColorStop(0,isS?'#2a2560':isH?'#221e55':'#12103a');
            fg.addColorStop(0.7,isS?'#1a1545':'#0a0825');
            fg.addColorStop(1,'#060518');
            ctx.fillStyle=fg; ctx.fill();

            var sc=isS?colors.main:isH?colors.main:isC?colors.line+'0.6)':'rgba(212,175,55,0.25)';
            ctx.strokeStyle=sc;
            ctx.lineWidth=isS?2.5:isH?2:1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x,y-r*0.15,r*0.7,-Math.PI*0.8,-Math.PI*0.2);
            ctx.strokeStyle='rgba(255,255,255,'+(isH||isS?0.08:0.03)+')';
            ctx.lineWidth=1;
            ctx.stroke();
        }

        // Pulse ring (selected only)
        if(isS) {
            var pr=r+6+Math.sin(t*3)*3;
            ctx.strokeStyle=colors.glow+(0.25+Math.sin(t*3)*0.1)+')';
            ctx.lineWidth=1.5; ctx.setLineDash([4,4]); ctx.lineDashOffset=-frame*0.5;
            ctx.beginPath(); ctx.arc(x,y,pr,0,Math.PI*2); ctx.stroke();
            ctx.setLineDash([]);
        }

        // Emoji icon
        if(cam.zoom>0.3 && shape!=='none') {
            var fs=Math.round(r*0.75);
            ctx.font=fs+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
            ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(em,x,y+1);
        }

        // Label
        if(cam.zoom>0.3) {
            var ls=Math.max(8,Math.min(11, 10/cam.zoom*0.65));
            ctx.font='500 '+ls+'px Cinzel,serif';
            ctx.textAlign='center'; ctx.textBaseline='top';
            var label=q.title.length>22?q.title.substring(0,20)+'..':q.title;
            var ly=y+r+6;

            ctx.fillStyle='rgba(3,0,20,0.85)';
            ctx.fillText(label,x+1,ly+1);
            ctx.fillText(label,x-1,ly+1);

            ctx.fillStyle=isH||isS?'#f5f5f0':isC?colors.main:'rgba(200,200,192,0.55)';
            ctx.fillText(label,x,ly);
        }
    });
}

function drawMinimap(colors) {
    if(!mmCtx||!activeChapter||!activeChapter.quests.length) return;
    var mw=mmCanvas.width,mh=mmCanvas.height;
    mmCtx.clearRect(0,0,mw,mh);
    var qs=activeChapter.quests,mnX=Infinity,mxX=-Infinity,mnY=Infinity,mxY=-Infinity;
    qs.forEach(function(q){if(q.x<mnX)mnX=q.x;if(q.x>mxX)mxX=q.x;if(q.y<mnY)mnY=q.y;if(q.y>mxY)mxY=q.y;});
    var sx=mw/((mxX-mnX+2)||1),sy=mh/((mxY-mnY+2)||1),sc=Math.min(sx,sy);
    var ox=(mw-(mxX-mnX)*sc)/2,oy=(mh-(mxY-mnY)*sc)/2;
    qs.forEach(function(q){if(!q.dependencies)return;q.dependencies.forEach(function(d){var dep=questMap[d];if(!dep)return;mmCtx.strokeStyle=colors.line+'0.15)';mmCtx.lineWidth=DPR;mmCtx.beginPath();mmCtx.moveTo((dep.x-mnX)*sc+ox,(dep.y-mnY)*sc+oy);mmCtx.lineTo((q.x-mnX)*sc+ox,(q.y-mnY)*sc+oy);mmCtx.stroke();});});
    qs.forEach(function(q){mmCtx.fillStyle=colors.glow+'0.7)';mmCtx.beginPath();mmCtx.arc((q.x-mnX)*sc+ox,(q.y-mnY)*sc+oy,2*DPR,0,Math.PI*2);mmCtx.fill();});
    var cw=canvas.width/DPR,cch=canvas.height/DPR;
    var vl=(-cam.x-cw/2/cam.zoom)/CELL,vt=(-cam.y-cch/2/cam.zoom)/CELL;
    var vw=cw/cam.zoom/CELL,vh=cch/cam.zoom/CELL;
    mmCtx.strokeStyle=colors.glow+'0.5)';mmCtx.lineWidth=DPR;
    mmCtx.strokeRect((vl-mnX)*sc+ox,(vt-mnY)*sc+oy,vw*sc,vh*sc);
}

// ═════════════════════════════════
// BATTLE PASS (unchanged — DOM-based, not a perf concern)
// ═════════════════════════════════

function renderBP(ch) {
    var el=document.getElementById('quest-content'); if(!el) return;
    var tiers=ch.quests.filter(function(q){return q.title.match(/^Tier \d/);}).sort(function(a,b){return parseInt(a.title.replace('Tier ',''))-parseInt(b.title.replace('Tier ',''));});
    var h='<div class="bp-container"><div class="bp-header"><h2>\u{1F3C6} Battle Pass</h2><p>Earn Battle Pass Tokens from quest trees \u2022 '+tiers.length+' Tiers</p></div><div class="bp-track">';
    var COLS=10,ri=0;
    for(var i=0;i<tiers.length;i+=COLS){
        var row=tiers.slice(i,i+COLS),d=ri*0.08;
        h+='<div class="bp-row" style="animation-delay:'+d+'s">';
        row.forEach(function(tier){
            var num=parseInt(tier.title.replace('Tier ','')), isM=num%10===0, isG=num===100;
            var cls='bp-tier'+(isG?' grand':isM?' milestone':'');
            var rw=getBPReward(tier);
            h+='<div class="'+cls+'" data-qid="'+tier.id+'"><div class="bp-tier-num">Tier '+num+'</div><div class="bp-tier-icon">'+rw.icon+'</div><div class="bp-tier-reward">'+esc(rw.name)+'</div></div>';
        });
        h+='</div>';
        if(i+COLS<tiers.length) h+='<div class="bp-row-connector" style="animation-delay:'+(d+0.04)+'s"><div class="bp-connector-line"></div></div>';
        ri++;
    }
    h+='</div></div><div class="bp-detail-popup" id="bpp"></div>';
    el.innerHTML=h;
    el.querySelectorAll('.bp-tier').forEach(function(t){
        t.addEventListener('mouseenter',function(e){var q=questMap[this.getAttribute('data-qid')];if(q)showBPP(q,e);});
        t.addEventListener('mouseleave',hideBPP);
    });
}

function getBPReward(q) {
    if(!q.rewards||!q.rewards.length) return {icon:'\u2753',name:'Mystery'};
    var r=q.rewards[0];
    if(r.xp) return {icon:'\u2728',name:r.xp+' XP'};
    if(r.item) {
        var id=r.item.split(':').pop(), name=id.replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();}), icon='\u{1F4E6}';
        if(id==='paper') { name='BP Token'; icon='\u{1F4DC}'; }
        else { for(var k in BP_ICONS) { if(id.indexOf(k)>=0){icon=BP_ICONS[k];break;} } }
        return {icon:icon,name:name};
    }
    return {icon:'\u{1F381}',name:r.type||'Reward'};
}

function showBPP(q,e) {
    var p=document.getElementById('bpp'); if(!p) return;
    var h='<div class="bp-popup-tier">'+esc(q.title)+'</div>';
    if(q.description) h+='<div style="font-size:0.85rem;color:var(--marble-dim);margin:0.3rem 0;line-height:1.5">'+esc(q.description)+'</div>';
    if(q.rewards&&q.rewards.length) {
        h+='<div class="bp-popup-divider"></div><div class="bp-popup-section">\u{1F381} Rewards</div>';
        q.rewards.forEach(function(r){if(r.xp)h+='<div class="bp-popup-item">\u2728 '+r.xp+' XP</div>';else if(r.item)h+='<div class="bp-popup-item">\u{1F4E6} '+esc(r.item.split(':').pop().replace(/_/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();}))+'</div>';});
    }
    if(q.tasks&&q.tasks.length) {
        h+='<div class="bp-popup-divider"></div><div class="bp-popup-section">\u{1F4CB} Cost</div>';
        q.tasks.forEach(function(t){var n=t.item?t.item.split(':').pop().replace(/_/g,' '):'Token';h+='<div class="bp-popup-item">'+(t.count||1)+'x '+esc(n.replace(/\b\w/g,function(c){return c.toUpperCase();}))+'</div>';});
    }
    p.innerHTML=h;
    var x=e.clientX+15,y=e.clientY-10;
    if(x+280>window.innerWidth-20)x=e.clientX-295;
    if(y<10)y=10; if(y+200>window.innerHeight)y=window.innerHeight-210;
    p.style.left=x+'px'; p.style.top=y+'px'; p.classList.add('visible');
}

function hideBPP() { var p=document.getElementById('bpp'); if(p) p.classList.remove('visible'); }

function esc(s) { if(!s) return ''; var e=document.createElement('span'); e.textContent=s; return e.innerHTML; }

window.QuestTreePage = render;
})();
