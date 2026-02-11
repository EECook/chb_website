// portal-claiming.js -- immersive god-claiming ceremony
// pottermore patronus-style full-screen quiz experience

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════
    // GOD DATA (matches config.py)
    // ═══════════════════════════════════════════════════════════════════

    var GODS = {
        Zeus:       { emoji: '\u26A1', domain: 'Sky, Thunder, King of Gods',                color: '#4FC3F7', desc: 'Children of Zeus are natural leaders with command over lightning and air.', effect: 'Jump Boost' },
        Poseidon:   { emoji: '\uD83D\uDD31', domain: 'Sea, Earthquakes, Horses',            color: '#20B2AA', desc: 'Children of Poseidon control water and can communicate with sea creatures.', effect: 'Water Breathing' },
        Hades:      { emoji: '\uD83D\uDC80', domain: 'Underworld, Death, Riches',           color: '#6B4C9A', desc: 'Children of Hades can shadow travel and sense death.', effect: 'Resistance' },
        Athena:     { emoji: '\uD83E\uDD89', domain: 'Wisdom, Warfare, Crafts',             color: '#B8B8D1', desc: 'Children of Athena are brilliant strategists and skilled craftsmen.', effect: 'Haste' },
        Apollo:     { emoji: '\u2600\uFE0F', domain: 'Sun, Music, Prophecy, Healing',       color: '#FFD700', desc: 'Children of Apollo have healing abilities and prophetic dreams.', effect: 'Regeneration' },
        Artemis:    { emoji: '\uD83C\uDFF9', domain: 'Hunt, Moon, Wilderness',              color: '#C0C0C0', desc: 'Hunters of Artemis are expert archers with enhanced senses.', effect: 'Speed' },
        Ares:       { emoji: '\u2694\uFE0F', domain: 'War, Violence, Bloodshed',            color: '#DC143C', desc: 'Children of Ares are fierce warriors with supernatural combat abilities.', effect: 'Strength' },
        Aphrodite:  { emoji: '\uD83D\uDC95', domain: 'Love, Beauty, Desire',                color: '#FF69B4', desc: 'Children of Aphrodite can charmspeak and are unnaturally beautiful.', effect: 'Regeneration' },
        Hephaestus: { emoji: '\uD83D\uDD28', domain: 'Fire, Forge, Craftsmanship',          color: '#FF6B35', desc: 'Children of Hephaestus are master builders with fire resistance.', effect: 'Fire Resistance' },
        Hermes:     { emoji: '\uD83D\uDC5F', domain: 'Travel, Thieves, Messengers',         color: '#4169E1', desc: 'Children of Hermes are quick, cunning, and excellent at picking locks.', effect: 'Speed' },
        Demeter:    { emoji: '\uD83C\uDF3E', domain: 'Agriculture, Harvest, Fertility',     color: '#90EE90', desc: 'Children of Demeter can control plants and make things grow.', effect: 'Saturation' },
        Dionysus:   { emoji: '\uD83C\uDF47', domain: 'Wine, Festivity, Madness',            color: '#8B008B', desc: 'Children of Dionysus can induce madness and control vines.', effect: 'Luck' },
        Hera:       { emoji: '\uD83D\uDC51', domain: 'Marriage, Family, Queen of Gods',     color: '#9370DB', desc: 'Children of Hera are rare, known for their regal bearing and family bonds.', effect: 'Resistance' },
        Hecate:     { emoji: '\uD83D\uDD2E', domain: 'Magic, Crossroads, Necromancy',       color: '#9370DB', desc: 'Children of Hecate are powerful magic users with control over the Mist.', effect: 'Slow Falling' },
        Hypnos:     { emoji: '\uD83D\uDE34', domain: 'Sleep, Dreams',                       color: '#E6E6FA', desc: 'Children of Hypnos can induce sleep and enter others\' dreams.', effect: 'Slow Falling' },
        Nike:       { emoji: '\uD83C\uDFC6', domain: 'Victory',                             color: '#FFD700', desc: 'Children of Nike are driven to win and inspire victory in others.', effect: 'Speed' },
        Nemesis:    { emoji: '\u2696\uFE0F', domain: 'Revenge, Balance, Justice',            color: '#808080', desc: 'Children of Nemesis sense injustice and deliver righteous retribution.', effect: 'Resistance' },
        Iris:       { emoji: '\uD83C\uDF08', domain: 'Rainbows, Messages',                  color: '#FF1493', desc: 'Children of Iris can manipulate light and create Iris messages.', effect: 'Glowing' },
        Tyche:      { emoji: '\uD83C\uDFB2', domain: 'Luck, Fortune, Chance',               color: '#50C878', desc: 'Children of Tyche have unnatural luck and can influence probability.', effect: 'Luck' },
        Selene:     { emoji: '\uD83C\uDF19', domain: 'Titaness of the Moon',                color: '#C0C0E0', desc: 'Children of Selene are dreamers and night owls who see clearly in darkness.', effect: 'Night Vision' },
        Hestia:     { emoji: '\uD83C\uDFE0', domain: 'Goddess of the Hearth and Home',      color: '#E87040', desc: 'Children of Hestia are the heart of any group, creating sanctuary wherever they go.', effect: 'Absorption' },
        Persephone: { emoji: '\uD83C\uDF38', domain: 'Queen of the Underworld, Spring',     color: '#DA70D6', desc: 'Children of Persephone walk between worlds -- resilient beyond measure.', effect: 'Health Boost' },
        Aeolus:     { emoji: '\uD83C\uDF2C\uFE0F', domain: 'Keeper of the Winds',          color: '#87CEEB', desc: 'Children of Aeolus are restless, free-spirited, and impossible to pin down.', effect: 'Dolphin\'s Grace' },
        Pan:        { emoji: '\uD83D\uDC10', domain: 'God of the Wild and Shepherds',       color: '#6B8E23', desc: 'Children of Pan are untamed souls with a deep bond to nature and animals.', effect: 'Saturation' }
    };

    // ═══════════════════════════════════════════════════════════════════
    // QUIZ QUESTIONS (matches config.py -- 15 questions, 10 drawn)
    // ═══════════════════════════════════════════════════════════════════

    var QUESTIONS = [
        {
            q: 'A prophecy names you as the hero. What drives you to answer the call?',
            a: [
                { text: 'Glory and victory -- I want my name remembered', gods: ['Zeus','Nike','Ares'] },
                { text: 'Protecting the people I love, no matter the cost', gods: ['Hestia','Hera','Demeter'] },
                { text: 'Curiosity -- I need to understand what\'s really going on', gods: ['Athena','Hecate','Hermes'] },
                { text: 'The wild itself calls to me. Something out there needs my help', gods: ['Artemis','Pan','Persephone'] }
            ]
        },
        {
            q: 'Every hero has a fatal flaw. Which one sounds most like yours?',
            a: [
                { text: 'Pride -- I\'d rather fail than admit I need help', gods: ['Zeus','Ares','Nike'] },
                { text: 'Grudges -- I never forget a wrong done to me', gods: ['Nemesis','Hades','Hera'] },
                { text: 'Restlessness -- I can\'t stay in one place or commit', gods: ['Hermes','Aeolus','Dionysus'] },
                { text: 'Empathy overload -- I feel everyone\'s pain and it paralyzes me', gods: ['Persephone','Demeter','Hestia'] }
            ]
        },
        {
            q: 'It\'s a free day at Camp Half-Blood. Where do you spend it?',
            a: [
                { text: 'The arena -- sparring, competing, pushing my limits', gods: ['Ares','Nike','Athena'] },
                { text: 'The forge or arts pavilion -- making something with my hands', gods: ['Hephaestus','Apollo','Aphrodite'] },
                { text: 'Deep in the woods or out on the water', gods: ['Artemis','Pan','Poseidon'] },
                { text: 'The hearth or cabin commons -- hanging out, telling stories', gods: ['Hestia','Dionysus','Iris'] }
            ]
        },
        {
            q: 'You stumble into the Underworld by accident. What\'s your first move?',
            a: [
                { text: 'Find the ruler. I\'ll negotiate or demand my way out', gods: ['Hades','Zeus','Athena'] },
                { text: 'Keep to the shadows and look for a way out on my own', gods: ['Hermes','Hecate','Tyche'] },
                { text: 'Something about this place feels familiar. I explore', gods: ['Persephone','Hades','Hypnos'] },
                { text: 'I focus on getting out -- the living world needs me', gods: ['Hestia','Demeter','Apollo'] }
            ]
        },
        {
            q: 'Your quest group is falling apart from infighting. How do you hold it together?',
            a: [
                { text: 'Take charge. Someone has to make the hard calls', gods: ['Zeus','Athena','Ares'] },
                { text: 'Make them laugh or distract them until the tension breaks', gods: ['Hermes','Dionysus','Iris'] },
                { text: 'Quietly talk to each person until I find the root problem', gods: ['Hestia','Persephone','Hephaestus'] },
                { text: 'Remind them what we\'re fighting for -- the bigger picture', gods: ['Nike','Hera','Nemesis'] }
            ]
        },
        {
            q: 'The gods offer you a gift. Which power calls to you?',
            a: [
                { text: 'Control over storms, wind, or the sea', gods: ['Zeus','Poseidon','Aeolus'] },
                { text: 'Command over shadows, dreams, or the dead', gods: ['Hades','Hypnos','Hecate'] },
                { text: 'A perfect aim that never misses -- bow, blade, or word', gods: ['Apollo','Artemis','Nike'] },
                { text: 'The ability to grow, heal, or transform living things', gods: ['Demeter','Persephone','Pan'] }
            ]
        },
        {
            q: 'A stranger stole medicine to save their dying child. Do you turn them in?',
            a: [
                { text: 'No -- justice isn\'t always the same as what\'s right', gods: ['Hermes','Persephone','Iris'] },
                { text: 'Yes, but I\'d argue for a lenient sentence', gods: ['Athena','Hera','Nemesis'] },
                { text: 'No, and I\'d help them disappear before anyone finds out', gods: ['Artemis','Hecate','Pan'] },
                { text: 'I\'d find a way to get the medicine legally', gods: ['Hestia','Apollo','Demeter'] }
            ]
        },
        {
            q: 'What fear cuts deepest?',
            a: [
                { text: 'Being forgotten -- like I never mattered at all', gods: ['Zeus','Nike','Apollo'] },
                { text: 'Losing control -- of myself, my power, the situation', gods: ['Ares','Poseidon','Aeolus'] },
                { text: 'Being alone with no one to come home to', gods: ['Hestia','Aphrodite','Hera'] },
                { text: 'The dark things I might become if I stop holding back', gods: ['Hades','Hecate','Persephone'] }
            ]
        },
        {
            q: 'You can bring one companion on a dangerous quest. Who do you pick?',
            a: [
                { text: 'A battle-hardened warrior who can fight', gods: ['Ares','Athena','Nike'] },
                { text: 'A clever trickster who can talk or sneak us out of anything', gods: ['Hermes','Tyche','Aeolus'] },
                { text: 'A healer or nature expert who keeps us alive in the wild', gods: ['Apollo','Demeter','Pan'] },
                { text: 'A loyal friend I trust absolutely, powers or not', gods: ['Hestia','Aphrodite','Hera'] }
            ]
        },
        {
            q: 'It\'s 3 AM and you can\'t sleep. What are you doing?',
            a: [
                { text: 'Stargazing or walking under the moon -- the quiet feels sacred', gods: ['Selene','Artemis','Hypnos'] },
                { text: 'Making plans, studying, or working on a project', gods: ['Athena','Hephaestus','Hecate'] },
                { text: 'Raiding the kitchen or sneaking somewhere I shouldn\'t be', gods: ['Hermes','Dionysus','Tyche'] },
                { text: 'Writing, playing music, or lost in my own thoughts', gods: ['Apollo','Iris','Persephone'] }
            ]
        },
        {
            q: 'Mid-battle, your strongest ally goes down. What do you do?',
            a: [
                { text: 'Rage. I hit harder and make the enemy pay', gods: ['Ares','Poseidon','Zeus'] },
                { text: 'Drag them to safety first -- nothing else matters', gods: ['Hestia','Demeter','Aphrodite'] },
                { text: 'Adapt the plan. We can still win if I think fast', gods: ['Athena','Hermes','Tyche'] },
                { text: 'Channel everything into one desperate, all-or-nothing move', gods: ['Nike','Hades','Hecate'] }
            ]
        },
        {
            q: 'What quality do you value most in other people?',
            a: [
                { text: 'Honesty, even when it hurts', gods: ['Nemesis','Athena','Apollo'] },
                { text: 'Kindness and warmth -- people who make you feel safe', gods: ['Hestia','Iris','Selene'] },
                { text: 'Courage -- people who act when everyone else freezes', gods: ['Ares','Zeus','Nike'] },
                { text: 'Wildness -- people who refuse to be tamed or ordinary', gods: ['Dionysus','Pan','Aeolus'] }
            ]
        },
        {
            q: 'You find an ancient chest with four artifacts. Which one do you take?',
            a: [
                { text: 'A crown of black iron that lets you command the dead', gods: ['Hades','Hecate','Persephone'] },
                { text: 'Winged sandals that let you outrun anything', gods: ['Hermes','Nike','Aeolus'] },
                { text: 'A silver bow that glows under moonlight', gods: ['Artemis','Selene','Apollo'] },
                { text: 'A living seed that can grow into anything you imagine', gods: ['Demeter','Pan','Persephone'] }
            ]
        },
        {
            q: 'After a brutal week, how do you recharge?',
            a: [
                { text: 'A bonfire with close friends -- good food, good company', gods: ['Hestia','Dionysus','Demeter'] },
                { text: 'Alone time in nature -- hiking, swimming, just breathing', gods: ['Artemis','Pan','Poseidon'] },
                { text: 'Creating something -- building, drawing, writing, forging', gods: ['Hephaestus','Apollo','Aphrodite'] },
                { text: 'Sleeping in, lucid dreaming, or just zoning out completely', gods: ['Hypnos','Selene','Iris'] }
            ]
        },
        {
            q: 'When your story ends, what do you want people to say about you?',
            a: [
                { text: 'They changed the world -- nothing was the same after them', gods: ['Zeus','Athena','Nike'] },
                { text: 'They were fair -- even their enemies respected them', gods: ['Nemesis','Hera','Hades'] },
                { text: 'They were free -- they lived exactly as they chose', gods: ['Hermes','Aeolus','Dionysus'] },
                { text: 'They were loved -- and they loved fiercely in return', gods: ['Aphrodite','Hestia','Selene'] }
            ]
        }
    ];

    var NUM_QUESTIONS = 10;

    // ═══════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════

    var state = {
        phase: 'intro',       // intro | quiz | manual | reveal
        questions: [],         // shuffled subset
        questionIndex: 0,
        points: {},            // god -> score
        resultGod: null,
        container: null,
        canvas: null,
        ctx: null,
        particles: [],
        constellations: [],
        animFrame: null,
        fogVisible: false,
        revealColor: null
    };

    // ═══════════════════════════════════════════════════════════════════
    // PARTICLE SYSTEM (stars, embers, constellation lines)
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

        // create stars
        state.particles = [];
        for (var i = 0; i < 120; i++) {
            state.particles.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                r: Math.random() * 1.2 + 0.3,
                alpha: Math.random() * 0.6 + 0.1,
                pulse: Math.random() * 0.02 + 0.005,
                phase: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.05,
                type: 'star'
            });
        }

        // golden embers (fewer, larger, warmer)
        for (var j = 0; j < 25; j++) {
            state.particles.push({
                x: Math.random() * c.width,
                y: c.height + Math.random() * 100,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.3 + 0.1,
                pulse: Math.random() * 0.01 + 0.003,
                phase: Math.random() * Math.PI * 2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -(Math.random() * 0.4 + 0.15),
                type: 'ember'
            });
        }

        // constellation nodes (bright anchor points)
        state.constellations = [];
        var numNodes = 7;
        for (var k = 0; k < numNodes; k++) {
            state.constellations.push({
                x: c.width * 0.15 + Math.random() * c.width * 0.7,
                y: c.height * 0.1 + Math.random() * c.height * 0.5,
                r: 1.5,
                alpha: 0.4 + Math.random() * 0.3,
                connected: []
            });
        }
        // connect nearby nodes
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
        var w = state.canvas.width;
        var h = state.canvas.height;
        ctx.clearRect(0, 0, w, h);

        var time = Date.now() * 0.001;
        var tint = state.revealColor || { r: 212, g: 175, b: 55 };

        // constellation lines
        ctx.lineWidth = 0.5;
        for (var i = 0; i < state.constellations.length; i++) {
            var node = state.constellations[i];
            for (var j = 0; j < node.connected.length; j++) {
                var other = state.constellations[node.connected[j]];
                var lineAlpha = 0.06 + Math.sin(time * 0.5 + i) * 0.03;
                ctx.strokeStyle = 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',' + lineAlpha + ')';
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        }

        // constellation nodes
        for (var k = 0; k < state.constellations.length; k++) {
            var cn = state.constellations[k];
            var na = cn.alpha * (0.7 + Math.sin(time * 0.8 + k) * 0.3);
            ctx.fillStyle = 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',' + na + ')';
            ctx.beginPath();
            ctx.arc(cn.x, cn.y, cn.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // particles
        for (var p = 0; p < state.particles.length; p++) {
            var pt = state.particles[p];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.phase += pt.pulse;

            var a = pt.alpha * (0.5 + Math.sin(pt.phase) * 0.5);

            if (pt.type === 'ember') {
                ctx.fillStyle = 'rgba(' + tint.r + ',' + tint.g + ',' + tint.b + ',' + a + ')';
                // reset if off screen
                if (pt.y < -10) {
                    pt.y = h + 10;
                    pt.x = Math.random() * w;
                }
            } else {
                ctx.fillStyle = 'rgba(255,255,255,' + a + ')';
                // wrap
                if (pt.x < 0) pt.x = w;
                if (pt.x > w) pt.x = 0;
                if (pt.y < 0) pt.y = h;
                if (pt.y > h) pt.y = 0;
            }

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            ctx.fill();
        }

        state.animFrame = requestAnimationFrame(tickParticles);
    }

    // ═══════════════════════════════════════════════════════════════════
    // COLOR UTILS
    // ═══════════════════════════════════════════════════════════════════

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
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
            + '<div class="claiming-vignette"></div>'
            + '<div class="burst-container"></div>'
            + '<div class="claiming-content">'
            +   '<button class="claiming-exit">Return to Camp</button>'
            +   '<div class="claiming-stage"></div>'
            + '</div>';

        document.body.appendChild(el);
        document.body.style.overflow = 'hidden';
        state.container = el;

        // exit button
        el.querySelector('.claiming-exit').addEventListener('click', teardown);

        // escape key
        state._escHandler = function(e) { if (e.key === 'Escape') teardown(); };
        document.addEventListener('keydown', state._escHandler);

        // start fog after a beat
        setTimeout(function() {
            var fogs = el.querySelectorAll('.fog-layer');
            for (var i = 0; i < fogs.length; i++) fogs[i].classList.add('visible');
            state.fogVisible = true;
        }, 500);

        initParticles();
    }

    function getStage() {
        return state.container.querySelector('.claiming-stage');
    }

    // -- INTRO --
    function showIntro() {
        state.phase = 'intro';
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

    // -- QUIZ --
    function startQuiz() {
        // shuffle and pick 10
        var shuffled = QUESTIONS.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
        }
        state.questions = shuffled.slice(0, NUM_QUESTIONS);
        state.questionIndex = 0;
        state.points = {};
        state.phase = 'quiz';

        showQuestion();
    }

    function showQuestion() {
        var stage = getStage();
        var q = state.questions[state.questionIndex];

        // progress pips
        var pips = '';
        for (var i = 0; i < state.questions.length; i++) {
            var cls = 'progress-pip';
            if (i < state.questionIndex) cls += ' answered';
            else if (i === state.questionIndex) cls += ' current';
            pips += '<div class="' + cls + '"></div>';
        }

        // answer buttons with dividers
        var answers = '';
        for (var a = 0; a < q.a.length; a++) {
            if (a > 0) answers += '<div class="answer-divider"></div>';
            answers += '<button class="answer-btn" data-idx="' + a + '">' + esc(q.a[a].text) + '</button>';
        }

        stage.innerHTML = ''
            + '<div class="claiming-question-wrap">'
            +   '<div class="question-progress">' + pips + '</div>'
            +   '<div class="question-text">' + esc(q.q) + '</div>'
            +   '<div class="question-answers">' + answers + '</div>'
            + '</div>';

        // staggered reveal
        var qText = stage.querySelector('.question-text');
        var btns = stage.querySelectorAll('.answer-btn');

        setTimeout(function() { qText.classList.add('visible'); }, 100);
        for (var b = 0; b < btns.length; b++) {
            (function(btn, delay) {
                setTimeout(function() { btn.classList.add('visible'); }, delay);
            })(btns[b], 400 + b * 150);
        }

        // click handlers
        stage.querySelector('.question-answers').addEventListener('click', function(e) {
            var btn = e.target.closest('.answer-btn');
            if (!btn) return;
            handleAnswer(parseInt(btn.dataset.idx, 10), btn);
        });
    }

    function handleAnswer(idx, btnEl) {
        var q = state.questions[state.questionIndex];
        var chosen = q.a[idx];

        // tally points
        for (var i = 0; i < chosen.gods.length; i++) {
            var g = chosen.gods[i];
            state.points[g] = (state.points[g] || 0) + 1;
        }

        // visual feedback: highlight chosen, fade others
        btnEl.classList.add('chosen');
        var allBtns = state.container.querySelectorAll('.answer-btn');
        for (var j = 0; j < allBtns.length; j++) {
            if (allBtns[j] !== btnEl) allBtns[j].classList.add('fade-out');
        }

        // also fade question text
        var qText = state.container.querySelector('.question-text');
        if (qText) {
            setTimeout(function() {
                qText.style.transition = 'opacity 0.5s ease';
                qText.style.opacity = '0';
            }, 300);
        }

        state.questionIndex++;

        setTimeout(function() {
            if (state.questionIndex >= state.questions.length) {
                resolveQuiz();
            } else {
                showQuestion();
            }
        }, 800);
    }

    function resolveQuiz() {
        // find top god
        var best = null;
        var bestScore = 0;
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
        showReveal(best, false);
    }

    // -- MANUAL SELECT --
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
            showReveal(card.dataset.god, true);
        });

        stage.querySelector('.manual-back').addEventListener('click', showIntro);
    }

    // -- REVEAL --
    function showReveal(godName, wasManual) {
        state.phase = 'reveal';
        var god = GODS[godName];
        var rgb = hexToRgb(god.color);
        state.revealColor = rgb;

        // burst particles
        spawnBurst(god.color);

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

        stage.querySelector('.btn-accept').addEventListener('click', function() {
            saveResult(godName);
        });
        stage.querySelector('.btn-retake').addEventListener('click', function() {
            state.revealColor = null;
            showIntro();
        });
    }

    function spawnBurst(color) {
        var container = state.container.querySelector('.burst-container');
        container.innerHTML = '';
        var count = 60;
        for (var i = 0; i < count; i++) {
            var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            var dist = 100 + Math.random() * 300;
            var tx = Math.cos(angle) * dist;
            var ty = Math.sin(angle) * dist;
            var dur = 1.2 + Math.random() * 1.5;
            var delay = Math.random() * 0.3;
            var size = 2 + Math.random() * 3;

            var p = document.createElement('div');
            p.className = 'burst-particle';
            p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;'
                + 'background:' + color + ';'
                + 'box-shadow:0 0 6px ' + color + ';'
                + '--tx:' + tx + 'px;--ty:' + ty + 'px;'
                + '--duration:' + dur + 's;--delay:' + delay + 's;';
            container.appendChild(p);
        }
    }

    // ═══════════════════════════════════════════════════════════════════
    // SAVE RESULT (calls server API)
    // ═══════════════════════════════════════════════════════════════════

    function saveResult(godName) {
        // check if logged in
        var username = null;
        if (typeof PortalSession !== 'undefined') {
            username = PortalSession.getUsername();
        }

        if (!username) {
            // not logged in -- just close with a nice message
            showSaveMessage('Your divine heritage has been revealed! Log in through the Portal to save your claiming.', false);
            return;
        }

        // call API
        fetch('/api/player/' + encodeURIComponent(username) + '/claim', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ god_parent: godName })
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
                + '<button class="btn-accept" style="margin-top:1rem">Return to Camp</button>';
            actions.querySelector('.btn-accept').addEventListener('click', teardown);
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
            state.container.style.transition = 'opacity 0.5s ease';
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
            }, 500);
        }
    }

    function launch() {
        // clean up any previous instance
        var old = document.querySelector('.claiming-takeover');
        if (old) old.parentNode.removeChild(old);

        buildShell();
        showIntro();
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PAGE HANDLER (for SPA router)
    // ═══════════════════════════════════════════════════════════════════

    window.PortalClaimingPage = {
        render: function(mount) {
            // the quiz takes over the full screen, so we just launch it
            // and put a fallback in mount
            mount.innerHTML = '<div style="min-height:60vh;display:flex;align-items:center;justify-content:center">'
                + '<p style="color:var(--text-muted,rgba(245,245,240,0.5));font-family:var(--font-body)">Loading the Claiming Ceremony...</p>'
                + '</div>';
            setTimeout(launch, 100);
        },
        cleanup: function() {
            teardown();
        }
    };

    // also expose globally so it can be triggered from anywhere
    window.launchClaimingCeremony = launch;

})();
