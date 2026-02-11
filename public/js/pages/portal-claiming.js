// portal-claiming.js v2 -- enhanced immersive god-claiming ceremony
// word-by-word reveals, mouse parallax, greek runes, ripple pulses,
// interstitials, multi-wave bursts, screen flash, breathing symbol

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // GOD DATA (matches config.py)
    // ═══════════════════════════════════════════════════════════════════

    var GODS = {
        Zeus:       { emoji: '\u26A1', domain: 'Sky, Thunder, King of Gods', color: '#4FC3F7', desc: 'Natural leaders with command over lightning and storms. Born to rule, for better or worse.', effect: 'Jump Boost' },
        Poseidon:   { emoji: '\uD83D\uDD31', domain: 'Sea, Earthquakes, Horses', color: '#20B2AA', desc: 'Masters of the deep. Loyal, powerful, and more dangerous than they look.', effect: 'Water Breathing' },
        Hades:      { emoji: '\uD83D\uDC80', domain: 'Underworld, Death, Riches', color: '#6B4C9A', desc: 'Shadow travelers who walk between worlds. Misunderstood, patient, and quietly terrifying.', effect: 'Resistance' },
        Athena:     { emoji: '\uD83E\uDD89', domain: 'Wisdom, Warfare, Crafts', color: '#B8B8D1', desc: 'Brilliant strategists who win fights before they start. The smartest person in any room.', effect: 'Haste' },
        Apollo:     { emoji: '\u2600\uFE0F', domain: 'Sun, Music, Prophecy, Healing', color: '#FFD700', desc: 'Healers and artists with the gift of prophecy. Annoyingly talented at everything.', effect: 'Regeneration' },
        Artemis:    { emoji: '\uD83C\uDFF9', domain: 'Hunt, Moon, Wilderness', color: '#C0C0C0', desc: 'Hunters with silver aim and sharper instincts. They find you before you find them.', effect: 'Speed' },
        Ares:       { emoji: '\u2694\uFE0F', domain: 'War, Violence, Bloodshed', color: '#DC143C', desc: 'Born fighters with fire in their blood. They live for the clash of battle.', effect: 'Strength' },
        Aphrodite:  { emoji: '\uD83D\uDC95', domain: 'Love, Beauty, Desire', color: '#FF69B4', desc: 'Charmspeakers who bend hearts and wills. Far more dangerous than they seem.', effect: 'Regeneration' },
        Hephaestus: { emoji: '\uD83D\uDD28', domain: 'Fire, Forge, Craftsmanship', color: '#FF6B35', desc: 'Master builders who create wonders from raw metal. Their hands speak louder than words.', effect: 'Fire Resistance' },
        Hermes:     { emoji: '\uD83D\uDC5F', domain: 'Travel, Thieves, Messengers', color: '#4169E1', desc: 'Quick hands, quicker wit. If it can be stolen, unlocked, or talked out of -- they will.', effect: 'Speed' },
        Demeter:    { emoji: '\uD83C\uDF3E', domain: 'Agriculture, Harvest, Fertility', color: '#90EE90', desc: 'Earth shapers who command the green world. Nurturing, until you cross them.', effect: 'Saturation' },
        Dionysus:   { emoji: '\uD83C\uDF47', domain: 'Wine, Festivity, Madness', color: '#8B008B', desc: 'Party starters and chaos agents. Their madness is a weapon nobody expects.', effect: 'Luck' },
        Hera:       { emoji: '\uD83D\uDC51', domain: 'Marriage, Family, Queen of Gods', color: '#9370DB', desc: 'Rare and regal, with an iron will and fierce loyalty to those they call family.', effect: 'Resistance' },
        Hecate:     { emoji: '\uD83D\uDD2E', domain: 'Magic, Crossroads, Necromancy', color: '#9370DB', desc: 'Wielders of the Mist and masters of magic. They see every path at once.', effect: 'Slow Falling' },
        Hypnos:     { emoji: '\uD83D\uDE34', domain: 'Sleep, Dreams', color: '#E6E6FA', desc: 'Dreamwalkers who blur the line between sleeping and waking. Gentle power, deep reach.', effect: 'Slow Falling' },
        Nike:       { emoji: '\uD83C\uDFC6', domain: 'Victory', color: '#FFD700', desc: 'They do not lose. Ever. Driven, competitive, and born with victory in their veins.', effect: 'Speed' },
        Nemesis:    { emoji: '\u2696\uFE0F', domain: 'Revenge, Balance, Justice', color: '#808080', desc: 'Agents of cosmic balance. They remember every slight and deliver what is owed.', effect: 'Resistance' },
        Iris:       { emoji: '\uD83C\uDF08', domain: 'Rainbows, Messages', color: '#FF1493', desc: 'Light-benders and bridge-builders. They see beauty where others see nothing.', effect: 'Glowing' },
        Tyche:      { emoji: '\uD83C\uDFB2', domain: 'Luck, Fortune, Chance', color: '#50C878', desc: 'Fortune favors them -- literally. Probability bends when they walk into a room.', effect: 'Luck' },
        Selene:     { emoji: '\uD83C\uDF19', domain: 'Titaness of the Moon', color: '#C0C0E0', desc: 'Dreamers and night owls who see clearly in darkness -- both literal and metaphorical.', effect: 'Night Vision' },
        Hestia:     { emoji: '\uD83C\uDFE0', domain: 'Goddess of the Hearth', color: '#E87040', desc: 'The heart of any group. They create sanctuary wherever they go.', effect: 'Absorption' },
        Persephone: { emoji: '\uD83C\uDF38', domain: 'Queen of the Underworld, Spring', color: '#DA70D6', desc: 'They walk between worlds. Resilient beyond measure, finding beauty in dark places.', effect: 'Health Boost' },
        Aeolus:     { emoji: '\uD83C\uDF2C\uFE0F', domain: 'Keeper of the Winds', color: '#87CEEB', desc: 'Restless, free-spirited, and impossible to pin down. They shift like the wind itself.', effect: 'Dolphin\'s Grace' },
        Pan:        { emoji: '\uD83D\uDC10', domain: 'God of the Wild', color: '#6B8E23', desc: 'Untamed souls with a deep bond to nature and animals. Playful troublemakers at heart.', effect: 'Saturation' }
    };

    // ═══════════════════════════════════════════════════════════════════
    // QUIZ QUESTIONS (matches config.py -- 15 questions, 10 drawn)
    // ═══════════════════════════════════════════════════════════════════

    var QUESTIONS = [
        { q: 'A prophecy names you as the hero. What drives you to answer the call?', a: [
            { text: 'Glory and victory -- I want my name remembered', gods: ['Zeus','Nike','Ares'] },
            { text: 'Protecting the people I love, no matter the cost', gods: ['Hestia','Hera','Demeter'] },
            { text: 'Curiosity -- I need to understand what\'s really going on', gods: ['Athena','Hecate','Hermes'] },
            { text: 'The wild itself calls to me. Something out there needs my help', gods: ['Artemis','Pan','Persephone'] }
        ]},
        { q: 'Every hero has a fatal flaw. Which one sounds most like yours?', a: [
            { text: 'Pride -- I\'d rather fail than admit I need help', gods: ['Zeus','Ares','Nike'] },
            { text: 'Grudges -- I never forget a wrong done to me', gods: ['Nemesis','Hades','Hera'] },
            { text: 'Restlessness -- I can\'t stay in one place or commit', gods: ['Hermes','Aeolus','Dionysus'] },
            { text: 'Empathy overload -- I feel everyone\'s pain and it paralyzes me', gods: ['Persephone','Demeter','Hestia'] }
        ]},
        { q: 'It\'s a free day at Camp Half-Blood. Where do you spend it?', a: [
            { text: 'The arena -- sparring, competing, pushing my limits', gods: ['Ares','Nike','Athena'] },
            { text: 'The forge or arts pavilion -- making something with my hands', gods: ['Hephaestus','Apollo','Aphrodite'] },
            { text: 'Deep in the woods or out on the water', gods: ['Artemis','Pan','Poseidon'] },
            { text: 'The hearth or cabin commons -- hanging out, telling stories', gods: ['Hestia','Dionysus','Iris'] }
        ]},
        { q: 'You stumble into the Underworld by accident. What\'s your first move?', a: [
            { text: 'Find the ruler. I\'ll negotiate or demand my way out', gods: ['Hades','Zeus','Athena'] },
            { text: 'Keep to the shadows and look for a way out on my own', gods: ['Hermes','Hecate','Tyche'] },
            { text: 'Something about this place feels familiar. I explore', gods: ['Persephone','Hades','Hypnos'] },
            { text: 'I focus on getting out -- the living world needs me', gods: ['Hestia','Demeter','Apollo'] }
        ]},
        { q: 'Your quest group is falling apart from infighting. How do you hold it together?', a: [
            { text: 'Take charge. Someone has to make the hard calls', gods: ['Zeus','Athena','Ares'] },
            { text: 'Make them laugh or distract them until the tension breaks', gods: ['Hermes','Dionysus','Iris'] },
            { text: 'Quietly talk to each person until I find the root problem', gods: ['Hestia','Persephone','Hephaestus'] },
            { text: 'Remind them what we\'re fighting for -- the bigger picture', gods: ['Nike','Hera','Nemesis'] }
        ]},
        { q: 'The gods offer you a gift. Which power calls to you?', a: [
            { text: 'Control over storms, wind, or the sea', gods: ['Zeus','Poseidon','Aeolus'] },
            { text: 'Command over shadows, dreams, or the dead', gods: ['Hades','Hypnos','Hecate'] },
            { text: 'A perfect aim that never misses -- bow, blade, or word', gods: ['Apollo','Artemis','Nike'] },
            { text: 'The ability to grow, heal, or transform living things', gods: ['Demeter','Persephone','Pan'] }
        ]},
        { q: 'A stranger stole medicine to save their dying child. Do you turn them in?', a: [
            { text: 'No -- justice isn\'t always the same as what\'s right', gods: ['Hermes','Persephone','Iris'] },
            { text: 'Yes, but I\'d argue for a lenient sentence', gods: ['Athena','Hera','Nemesis'] },
            { text: 'No, and I\'d help them disappear before anyone finds out', gods: ['Artemis','Hecate','Pan'] },
            { text: 'I\'d find a way to get the medicine legally', gods: ['Hestia','Apollo','Demeter'] }
        ]},
        { q: 'What fear cuts deepest?', a: [
            { text: 'Being forgotten -- like I never mattered at all', gods: ['Zeus','Nike','Apollo'] },
            { text: 'Losing control -- of myself, my power, the situation', gods: ['Ares','Poseidon','Aeolus'] },
            { text: 'Being alone with no one to come home to', gods: ['Hestia','Aphrodite','Hera'] },
            { text: 'The dark things I might become if I stop holding back', gods: ['Hades','Hecate','Persephone'] }
        ]},
        { q: 'You can bring one companion on a dangerous quest. Who do you pick?', a: [
            { text: 'A battle-hardened warrior who can fight', gods: ['Ares','Athena','Nike'] },
            { text: 'A clever trickster who can talk or sneak us out of anything', gods: ['Hermes','Tyche','Aeolus'] },
            { text: 'A healer or nature expert who keeps us alive in the wild', gods: ['Apollo','Demeter','Pan'] },
            { text: 'A loyal friend I trust absolutely, powers or not', gods: ['Hestia','Aphrodite','Hera'] }
        ]},
        { q: 'It\'s 3 AM and you can\'t sleep. What are you doing?', a: [
            { text: 'Stargazing or walking under the moon -- the quiet feels sacred', gods: ['Selene','Artemis','Hypnos'] },
            { text: 'Making plans, studying, or working on a project', gods: ['Athena','Hephaestus','Hecate'] },
            { text: 'Raiding the kitchen or sneaking somewhere I shouldn\'t be', gods: ['Hermes','Dionysus','Tyche'] },
            { text: 'Writing, playing music, or lost in my own thoughts', gods: ['Apollo','Iris','Persephone'] }
        ]},
        { q: 'Mid-battle, your strongest ally goes down. What do you do?', a: [
            { text: 'Rage. I hit harder and make the enemy pay', gods: ['Ares','Poseidon','Zeus'] },
            { text: 'Drag them to safety first -- nothing else matters', gods: ['Hestia','Demeter','Aphrodite'] },
            { text: 'Adapt the plan. We can still win if I think fast', gods: ['Athena','Hermes','Tyche'] },
            { text: 'Channel everything into one desperate, all-or-nothing move', gods: ['Nike','Hades','Hecate'] }
        ]},
        { q: 'What quality do you value most in other people?', a: [
            { text: 'Honesty, even when it hurts', gods: ['Nemesis','Athena','Apollo'] },
            { text: 'Kindness and warmth -- people who make you feel safe', gods: ['Hestia','Iris','Selene'] },
            { text: 'Courage -- people who act when everyone else freezes', gods: ['Ares','Zeus','Nike'] },
            { text: 'Wildness -- people who refuse to be tamed or ordinary', gods: ['Dionysus','Pan','Aeolus'] }
        ]},
        { q: 'You find an ancient chest with four artifacts. Which one do you take?', a: [
            { text: 'A crown of black iron that lets you command the dead', gods: ['Hades','Hecate','Persephone'] },
            { text: 'Winged sandals that let you outrun anything', gods: ['Hermes','Nike','Aeolus'] },
            { text: 'A silver bow that glows under moonlight', gods: ['Artemis','Selene','Apollo'] },
            { text: 'A living seed that can grow into anything you imagine', gods: ['Demeter','Pan','Persephone'] }
        ]},
        { q: 'After a brutal week, how do you recharge?', a: [
            { text: 'A bonfire with close friends -- good food, good company', gods: ['Hestia','Dionysus','Demeter'] },
            { text: 'Alone time in nature -- hiking, swimming, just breathing', gods: ['Artemis','Pan','Poseidon'] },
            { text: 'Creating something -- building, drawing, writing, forging', gods: ['Hephaestus','Apollo','Aphrodite'] },
            { text: 'Sleeping in, lucid dreaming, or just zoning out completely', gods: ['Hypnos','Selene','Iris'] }
        ]},
        { q: 'When your story ends, what do you want people to say about you?', a: [
            { text: 'They changed the world -- nothing was the same after them', gods: ['Zeus','Athena','Nike'] },
            { text: 'They were fair -- even their enemies respected them', gods: ['Nemesis','Hera','Hades'] },
            { text: 'They were free -- they lived exactly as they chose', gods: ['Hermes','Aeolus','Dionysus'] },
            { text: 'They were loved -- and they loved fiercely in return', gods: ['Aphrodite','Hestia','Selene'] }
        ]}
    ];

    var NUM_QUESTIONS = 10;

    // greek characters for floating runes
    var GREEK = ['\u0391','\u0392','\u0393','\u0394','\u0395','\u0396','\u0397','\u0398','\u0399','\u039A',
                 '\u039B','\u039C','\u039D','\u039E','\u039F','\u03A0','\u03A1','\u03A3','\u03A4','\u03A5',
                 '\u03A6','\u03A7','\u03A8','\u03A9','\u03B1','\u03B2','\u03B3','\u03B4','\u03B5','\u03B6'];

    // interstitial flavor text
    var WHISPERS = [
        'The fates are weaving...',
        'The Oracle stirs...',
        'Something shifts in the stars...',
        'The gods are watching...',
        'A thread is pulled...',
        'The fire crackles...',
        'Destiny takes shape...',
        'The mist parts...'
    ];

    // ═══════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════

    var state = {
        phase: 'intro',
        questions: [],
        questionIndex: 0,
        points: {},
        resultGod: null,
        container: null,
        canvas: null,
        ctx: null,
        particles: [],
        constellations: [],
        animFrame: null,
        fogVisible: false,
        revealColor: null,
        mouseX: 0.5,
        mouseY: 0.5,
        locked: false
    };

    // ═══════════════════════════════════════════════════════════════════
    // PARTICLE SYSTEM (mouse-reactive, color-shifting)
    // ═══════════════════════════════════════════════════════════════════

    function initParticles() {
        var c = document.createElement('canvas');
        var wrap = state.container.querySelector('.claiming-canvas-bg');
        if (!wrap) return;
        wrap.appendChild(c);
        state.canvas = c;
        state.ctx = c.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // track mouse for parallax
        state.container.addEventListener('mousemove', function(e) {
            state.mouseX = e.clientX / window.innerWidth;
            state.mouseY = e.clientY / window.innerHeight;
        });

        state.particles = [];
        // stars
        for (var i = 0; i < 140; i++) {
            state.particles.push({
                x: Math.random() * c.width, y: Math.random() * c.height,
                baseX: Math.random() * c.width, baseY: Math.random() * c.height,
                r: Math.random() * 1.2 + 0.3,
                alpha: Math.random() * 0.6 + 0.1,
                pulse: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2,
                drift: Math.random() * 15 + 5, // mouse parallax amount
                type: 'star'
            });
        }
        // golden embers
        for (var j = 0; j < 30; j++) {
            state.particles.push({
                x: Math.random() * c.width, y: c.height + Math.random() * 100,
                baseX: 0, baseY: 0,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.3 + 0.1,
                pulse: Math.random() * 0.01 + 0.003,
                phase: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -(Math.random() * 0.4 + 0.15),
                sway: Math.random() * 0.5 + 0.2,
                swayPhase: Math.random() * Math.PI * 2,
                drift: 0,
                type: 'ember'
            });
        }

        // constellation nodes
        state.constellations = [];
        for (var k = 0; k < 8; k++) {
            state.constellations.push({
                x: c.width * 0.12 + Math.random() * c.width * 0.76,
                y: c.height * 0.08 + Math.random() * c.height * 0.5,
                r: 1.5, alpha: 0.4 + Math.random() * 0.3, connected: []
            });
        }
        for (var m = 0; m < state.constellations.length; m++) {
            for (var n = m + 1; n < state.constellations.length; n++) {
                var dx = state.constellations[m].x - state.constellations[n].x;
                var dy = state.constellations[m].y - state.constellations[n].y;
                if (Math.sqrt(dx * dx + dy * dy) < 250) {
                    state.constellations[m].connected.push(n);
                }
            }
        }

        tickParticles();
    }

    function resizeCanvas() {
        if (!state.canvas) return;
        state.canvas.width = window.innerWidth;
        state.canvas.height = window.innerHeight;
    }

    function tickParticles() {
        if (!state.ctx) return;
        var ctx = state.ctx;
        var w = state.canvas.width, h = state.canvas.height;
        ctx.clearRect(0, 0, w, h);

        var time = Date.now() * 0.001;
        var tint = state.revealColor || { r: 212, g: 175, b: 55 };
        var mx = state.mouseX - 0.5; // -0.5 to 0.5
        var my = state.mouseY - 0.5;

        // progress-based warmth shift
        var progress = state.questions.length > 0 ? state.questionIndex / state.questions.length : 0;
        var warmR = Math.round(tint.r + progress * 20);
        var warmG = Math.round(tint.g - progress * 10);
        var warmB = Math.round(tint.b - progress * 15);

        // constellation lines
        ctx.lineWidth = 0.5;
        for (var i = 0; i < state.constellations.length; i++) {
            var node = state.constellations[i];
            for (var j = 0; j < node.connected.length; j++) {
                var other = state.constellations[node.connected[j]];
                var lineAlpha = 0.06 + Math.sin(time * 0.5 + i) * 0.03;
                ctx.strokeStyle = 'rgba(' + warmR + ',' + warmG + ',' + warmB + ',' + lineAlpha + ')';
                ctx.beginPath();
                ctx.moveTo(node.x + mx * 8, node.y + my * 8);
                ctx.lineTo(other.x + mx * 8, other.y + my * 8);
                ctx.stroke();
            }
        }
        // constellation nodes
        for (var k = 0; k < state.constellations.length; k++) {
            var cn = state.constellations[k];
            var na = cn.alpha * (0.7 + Math.sin(time * 0.8 + k) * 0.3);
            ctx.fillStyle = 'rgba(' + warmR + ',' + warmG + ',' + warmB + ',' + na + ')';
            ctx.beginPath();
            ctx.arc(cn.x + mx * 8, cn.y + my * 8, cn.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // particles
        for (var p = 0; p < state.particles.length; p++) {
            var pt = state.particles[p];
            pt.phase += pt.pulse;
            var a = pt.alpha * (0.5 + Math.sin(pt.phase) * 0.5);

            if (pt.type === 'ember') {
                pt.x += pt.vx + Math.sin(time * pt.sway + pt.swayPhase) * 0.3;
                pt.y += pt.vy;
                ctx.fillStyle = 'rgba(' + warmR + ',' + warmG + ',' + warmB + ',' + a + ')';
                if (pt.y < -10) { pt.y = h + 10; pt.x = Math.random() * w; }
            } else {
                // mouse parallax for stars
                pt.x = pt.baseX + mx * pt.drift;
                pt.y = pt.baseY + my * pt.drift;
                ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
            }

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            ctx.fill();
        }

        state.animFrame = requestAnimationFrame(tickParticles);
    }

    // ═══════════════════════════════════════════════════════════════════
    // FLOATING GREEK RUNES
    // ═══════════════════════════════════════════════════════════════════

    function spawnRunes() {
        var runeLayer = state.container.querySelector('.claiming-runes');
        if (!runeLayer) return;
        for (var i = 0; i < 15; i++) {
            var span = document.createElement('span');
            span.className = 'rune';
            span.textContent = GREEK[Math.floor(Math.random() * GREEK.length)];
            span.style.cssText = '--left:' + (5 + Math.random() * 90) + '%;'
                + '--top:' + (10 + Math.random() * 80) + '%;'
                + '--dur:' + (15 + Math.random() * 20) + 's;'
                + '--delay:' + (Math.random() * 15) + 's;'
                + '--size:' + (1 + Math.random() * 1.5) + 'rem;';
            runeLayer.appendChild(span);
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // UTILS
    // ═══════════════════════════════════════════════════════════════════

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        return { r: parseInt(hex.substring(0,2),16), g: parseInt(hex.substring(2,4),16), b: parseInt(hex.substring(4,6),16) };
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    function shuffle(arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
    }

    // ═══════════════════════════════════════════════════════════════════
    // RENDER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════

    function buildShell() {
        var el = document.createElement('div');
        el.className = 'claiming-takeover';
        el.innerHTML = ''
            + '<div class="claiming-canvas-bg"></div>'
            + '<div class="claiming-fog">'
            +   '<div class="fog-layer fog-layer-1"></div>'
            +   '<div class="fog-layer fog-layer-2"></div>'
            +   '<div class="fog-layer fog-layer-3"></div>'
            + '</div>'
            + '<div class="claiming-runes"></div>'
            + '<div class="claiming-vignette"></div>'
            + '<div class="burst-container"></div>'
            + '<div class="claiming-flash"></div>'
            + '<div class="claiming-content">'
            +   '<button class="claiming-exit">Return to Camp</button>'
            +   '<div class="claiming-stage"></div>'
            + '</div>';

        document.body.appendChild(el);
        document.body.style.overflow = 'hidden';
        state.container = el;

        el.querySelector('.claiming-exit').addEventListener('click', teardown);
        state._escHandler = function(e) { if (e.key === 'Escape') teardown(); };
        document.addEventListener('keydown', state._escHandler);

        setTimeout(function() {
            var fogs = el.querySelectorAll('.fog-layer');
            for (var i = 0; i < fogs.length; i++) fogs[i].classList.add('visible');
        }, 300);

        initParticles();
        spawnRunes();
    }

    function getStage() { return state.container.querySelector('.claiming-stage'); }

    // ── INTRO ──
    function showIntro() {
        state.phase = 'intro';
        state.locked = false;
        var stage = getStage();
        stage.innerHTML = ''
            + '<div class="claiming-intro">'
            +   '<div class="intro-symbol">\uD83D\uDD31</div>'
            +   '<h1 class="intro-title">The Claiming Ceremony</h1>'
            +   '<p class="intro-subtitle">'
            +     'The gods are watching. Answer truthfully,<br>'
            +     'and your divine parent will reveal themselves.'
            +   '</p>'
            +   '<div class="intro-actions">'
            +     '<button class="btn-oracle">Consult the Oracle</button>'
            +     '<button class="btn-manual">or choose your parent</button>'
            +   '</div>'
            + '</div>';

        stage.querySelector('.btn-oracle').addEventListener('click', startQuiz);
        stage.querySelector('.btn-manual').addEventListener('click', showManual);
    }

    // ── QUIZ ──
    function startQuiz() {
        state.questions = shuffle(QUESTIONS).slice(0, NUM_QUESTIONS);
        state.questionIndex = 0;
        state.points = {};
        state.phase = 'quiz';
        showQuestion();
    }

    function showQuestion() {
        var stage = getStage();
        var q = state.questions[state.questionIndex];
        state.locked = false;

        // progress pips with connecting lines
        var pips = '';
        for (var i = 0; i < state.questions.length; i++) {
            if (i > 0) pips += '<div class="progress-line"></div>';
            var cls = 'progress-pip';
            if (i < state.questionIndex) cls += ' answered';
            else if (i === state.questionIndex) cls += ' current';
            pips += '<div class="' + cls + '"></div>';
        }

        // word-by-word question text
        var words = q.q.split(' ');
        var wordSpans = '';
        for (var w = 0; w < words.length; w++) {
            wordSpans += '<span class="q-word">' + esc(words[w]) + '</span>';
        }

        // answers
        var answers = '';
        for (var a = 0; a < q.a.length; a++) {
            if (a > 0) answers += '<div class="answer-divider"></div>';
            answers += '<button class="answer-btn" data-idx="' + a + '">' + esc(q.a[a].text) + '</button>';
        }

        stage.innerHTML = ''
            + '<div class="claiming-question-wrap">'
            +   '<div class="question-progress">' + pips + '</div>'
            +   '<div class="question-number">' + romanize(state.questionIndex + 1) + '</div>'
            +   '<div class="question-text">' + wordSpans + '</div>'
            +   '<div class="question-answers">' + answers + '</div>'
            + '</div>';

        // word-by-word reveal
        var qWords = stage.querySelectorAll('.q-word');
        for (var ww = 0; ww < qWords.length; ww++) {
            (function(el, delay) {
                setTimeout(function() { el.classList.add('visible'); }, delay);
            })(qWords[ww], 200 + ww * 50);
        }

        // answers stagger in after words finish
        var btns = stage.querySelectorAll('.answer-btn');
        var answerStart = 200 + qWords.length * 50 + 300;
        for (var b = 0; b < btns.length; b++) {
            (function(btn, delay) {
                setTimeout(function() { btn.classList.add('visible'); }, delay);
            })(btns[b], answerStart + b * 180);
        }

        // click handler
        stage.querySelector('.question-answers').addEventListener('click', function(e) {
            var btn = e.target.closest('.answer-btn');
            if (!btn || state.locked) return;
            state.locked = true;
            handleAnswer(parseInt(btn.dataset.idx, 10), btn);
        });
    }

    function handleAnswer(idx, btnEl) {
        var q = state.questions[state.questionIndex];
        var chosen = q.a[idx];

        // tally
        for (var i = 0; i < chosen.gods.length; i++) {
            var g = chosen.gods[i];
            state.points[g] = (state.points[g] || 0) + 1;
        }

        // ripple effect from click position
        spawnRipple(btnEl);

        // visual feedback
        btnEl.classList.add('chosen');
        var allBtns = state.container.querySelectorAll('.answer-btn');
        for (var j = 0; j < allBtns.length; j++) {
            if (allBtns[j] !== btnEl) allBtns[j].classList.add('fade-out');
        }

        // fade question text
        var qWords = state.container.querySelectorAll('.q-word');
        setTimeout(function() {
            for (var k = 0; k < qWords.length; k++) {
                qWords[k].style.transition = 'opacity 0.4s ease';
                qWords[k].style.opacity = '0';
            }
        }, 300);

        state.questionIndex++;

        // show interstitial then next question (or resolve)
        setTimeout(function() {
            if (state.questionIndex >= state.questions.length) {
                showInterstitial('The Oracle speaks...', function() { resolveQuiz(); });
            } else {
                showInterstitial(WHISPERS[Math.floor(Math.random() * WHISPERS.length)], function() { showQuestion(); });
            }
        }, 700);
    }

    function spawnRipple(el) {
        var rect = el.getBoundingClientRect();
        var ripple = document.createElement('div');
        ripple.className = 'claiming-ripple';
        ripple.style.left = (rect.left + rect.width / 2) + 'px';
        ripple.style.top = (rect.top + rect.height / 2) + 'px';
        state.container.appendChild(ripple);
        setTimeout(function() { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 1300);
    }

    function showInterstitial(text, callback) {
        var stage = getStage();
        stage.innerHTML = '<div class="claiming-interstitial"><p class="interstitial-text">' + esc(text) + '</p></div>';
        setTimeout(callback, 1200);
    }

    function romanize(num) {
        var lookup = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
        var result = '';
        for (var i = 0; i < lookup.length; i++) {
            while (num >= lookup[i][0]) { result += lookup[i][1]; num -= lookup[i][0]; }
        }
        return result;
    }

    function resolveQuiz() {
        var best = null, bestScore = 0;
        var godNames = Object.keys(state.points);
        for (var i = 0; i < godNames.length; i++) {
            if (state.points[godNames[i]] > bestScore) {
                bestScore = state.points[godNames[i]];
                best = godNames[i];
            }
        }
        if (!best) {
            var allGods = Object.keys(GODS);
            best = allGods[Math.floor(Math.random() * allGods.length)];
        }
        state.resultGod = best;
        showReveal(best);
    }

    // ── MANUAL SELECT ──
    function showManual() {
        state.phase = 'manual';
        var stage = getStage();
        var cards = '';
        var godNames = Object.keys(GODS);
        for (var i = 0; i < godNames.length; i++) {
            var g = GODS[godNames[i]];
            cards += '<div class="god-card" data-god="' + godNames[i] + '">'
                + '<div class="god-card-emoji">' + g.emoji + '</div>'
                + '<div class="god-card-name">' + godNames[i] + '</div>'
                + '</div>';
        }

        stage.innerHTML = ''
            + '<div class="claiming-manual-wrap">'
            +   '<h2 class="manual-title">Choose Your Divine Parent</h2>'
            +   '<p class="manual-subtitle">Select the god whose domain speaks to your soul</p>'
            +   '<div class="manual-grid">' + cards + '</div>'
            +   '<button class="manual-back">\u2190 Back to ceremony</button>'
            + '</div>';

        stage.querySelector('.manual-grid').addEventListener('click', function(e) {
            var card = e.target.closest('.god-card');
            if (!card) return;
            state.resultGod = card.dataset.god;
            showReveal(card.dataset.god);
        });
        stage.querySelector('.manual-back').addEventListener('click', showIntro);
    }

    // ── REVEAL (multi-wave burst + screen flash + breathing symbol) ──
    function showReveal(godName) {
        state.phase = 'reveal';
        var god = GODS[godName];
        var rgb = hexToRgb(god.color);
        state.revealColor = rgb;

        // screen flash
        var flash = state.container.querySelector('.claiming-flash');
        flash.style.background = 'radial-gradient(circle at 50% 50%, ' + god.color + ', transparent 70%)';
        flash.classList.remove('fire');
        void flash.offsetWidth; // force reflow
        setTimeout(function() { flash.classList.add('fire'); }, 1600);

        // multi-wave burst
        spawnBurst(god.color, 60, 0);
        setTimeout(function() { spawnBurst(god.color, 30, 0.1); }, 400);
        // expanding rings
        spawnRings(god.color);

        var stage = getStage();
        stage.innerHTML = ''
            + '<div class="claiming-reveal-wrap">'
            +   '<p class="reveal-prelude">A glowing symbol appears above your head...</p>'
            +   '<div class="reveal-symbol" style="--reveal-glow: ' + god.color + '">' + god.emoji + '</div>'
            +   '<h2 class="reveal-name">' + godName + '</h2>'
            +   '<p class="reveal-domain">' + esc(god.domain) + '</p>'
            +   '<p class="reveal-description">' + esc(god.desc) + '</p>'
            +   '<p class="reveal-effect">\uD83C\uDFAE Minecraft Blessing: ' + god.effect + '</p>'
            +   '<div class="reveal-actions">'
            +     '<button class="btn-accept">Embrace Your Heritage</button>'
            +     '<button class="btn-retake">Retake the quiz</button>'
            +   '</div>'
            + '</div>';

        // after symbol animation finishes, add breathing
        setTimeout(function() {
            var sym = stage.querySelector('.reveal-symbol');
            if (sym) sym.classList.add('breathing');
        }, 4000);

        stage.querySelector('.btn-accept').addEventListener('click', function() { saveResult(godName); });
        stage.querySelector('.btn-retake').addEventListener('click', function() {
            state.revealColor = null;
            showIntro();
        });
    }

    function spawnBurst(color, count, baseDelay) {
        var container = state.container.querySelector('.burst-container');
        for (var i = 0; i < count; i++) {
            var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            var dist = 80 + Math.random() * 350;
            var tx = Math.cos(angle) * dist;
            var ty = Math.sin(angle) * dist;
            var dur = 1.2 + Math.random() * 1.8;
            var delay = baseDelay + Math.random() * 0.4;
            var size = 2 + Math.random() * 3;

            var p = document.createElement('div');
            p.className = 'burst-particle';
            p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;'
                + 'background:' + color + ';box-shadow:0 0 8px ' + color + ';'
                + '--tx:' + tx + 'px;--ty:' + ty + 'px;'
                + '--duration:' + dur + 's;--delay:' + delay + 's;';
            container.appendChild(p);
        }
    }

    function spawnRings(color) {
        var container = state.container.querySelector('.burst-container');
        for (var i = 0; i < 3; i++) {
            var ring = document.createElement('div');
            ring.className = 'burst-ring';
            ring.style.cssText = 'border-color:' + color + ';--ring-dur:' + (1.5 + i * 0.5) + 's;--ring-delay:' + (1.8 + i * 0.3) + 's;';
            container.appendChild(ring);
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // SAVE RESULT -- fixed to match server.js field name
    // ═══════════════════════════════════════════════════════════════════

    function saveResult(godName) {
        var username = null;
        if (typeof PortalSession !== 'undefined') {
            username = PortalSession.getUsername();
        }

        if (!username) {
            showSaveMessage('Your divine heritage has been revealed! Log in through the Portal to save your claiming.', false);
            return;
        }

        // server.js expects { god: "Zeus" } not { god_parent: "Zeus" }
        fetch('/api/player/' + encodeURIComponent(username) + '/claim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ god: godName })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.success) {
                showSaveMessage('You are now a child of ' + godName + '. Your blessing awaits in Minecraft!', true);
            } else {
                showSaveMessage(data.error || 'Something went wrong. Try again later.', false);
            }
        })
        .catch(function() {
            showSaveMessage('Could not reach the server. Your result: ' + godName + '. Try claiming in Discord with !claim.', false);
        });
    }

    function showSaveMessage(msg, success) {
        var stage = getStage();
        var actions = stage.querySelector('.reveal-actions');
        if (actions) {
            actions.innerHTML = '<p style="font-family:var(--font-body);font-size:0.95rem;color:' + (success ? 'rgba(74,222,128,0.8)' : 'rgba(245,245,240,0.5)') + ';margin-top:0.5rem">' + esc(msg) + '</p>'
                + '<button class="btn-accept" style="margin-top:1rem">Return to Camp</button>'
                + '<button class="btn-retake" style="margin-top:0.3rem">Take the quiz again</button>';
            actions.querySelector('.btn-accept').addEventListener('click', teardown);
            actions.querySelector('.btn-retake').addEventListener('click', function() {
                state.revealColor = null;
                // clear burst container
                var burst = state.container.querySelector('.burst-container');
                if (burst) burst.innerHTML = '';
                showIntro();
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // LIFECYCLE
    // ═══════════════════════════════════════════════════════════════════

    function teardown() {
        if (state.animFrame) cancelAnimationFrame(state.animFrame);
        if (state._escHandler) document.removeEventListener('keydown', state._escHandler);
        window.removeEventListener('resize', resizeCanvas);

        if (state.container) {
            state.container.style.opacity = '0';
            state.container.style.transition = 'opacity 0.6s ease';
            setTimeout(function() {
                if (state.container && state.container.parentNode) {
                    state.container.parentNode.removeChild(state.container);
                }
                document.body.style.overflow = '';
                state.container = null;
                state.canvas = null;
                state.ctx = null;
                state.particles = [];
                state.constellations = [];
                state.revealColor = null;
            }, 600);
        }
    }

    function launch() {
        var old = document.querySelector('.claiming-takeover');
        if (old) old.parentNode.removeChild(old);
        buildShell();
        showIntro();
    }

    // page handler (function style to match your router)
    window.PortalClaimingPage = function(mount) {
        mount.innerHTML = '<div style="min-height:60vh;display:flex;align-items:center;justify-content:center">'
            + '<p style="color:var(--text-muted,rgba(245,245,240,0.5));font-family:var(--font-body)">Loading the Claiming Ceremony...</p>'
            + '</div>';
        setTimeout(launch, 100);
        return { cleanup: teardown };
    };

    window.launchClaimingCeremony = launch;

})();
