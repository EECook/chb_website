/*
 * Camp Half-Blood - Divine Claiming Quiz
 * Pottermore-style immersive quiz experience
 */

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const OLYMPIAN_GODS = {
    "Zeus": {
        emoji: "⚡",
        domain: "God of the Sky, Thunder & King of Olympus",
        color: "#FFD700",
        description: "Children of Zeus are natural leaders with commanding presence. They're brave, ambitious, and feel most alive during storms.",
        effect: "Jump Boost",
        traits: ["leadership", "ambition", "courage", "pride"]
    },
    "Poseidon": {
        emoji: "🔱",
        domain: "God of the Sea, Earthquakes & Horses",
        color: "#00CED1",
        description: "Children of Poseidon are fiercely loyal and adaptable. They have a deep connection to water and feel most at peace near the ocean.",
        effect: "Water Breathing",
        traits: ["loyalty", "adaptability", "independence", "emotion"]
    },
    "Hades": {
        emoji: "💀",
        domain: "God of the Underworld & Riches",
        color: "#4A4A4A",
        description: "Children of Hades are mysterious and misunderstood. They're introspective, patient, and comfortable with darkness.",
        effect: "Resistance",
        traits: ["patience", "mystery", "justice", "solitude"]
    },
    "Athena": {
        emoji: "🦉",
        domain: "Goddess of Wisdom, Strategy & Crafts",
        color: "#C0C0C0",
        description: "Children of Athena are brilliant strategists with insatiable curiosity. They value knowledge and always have a plan.",
        effect: "Haste",
        traits: ["wisdom", "strategy", "creativity", "logic"]
    },
    "Apollo": {
        emoji: "☀️",
        domain: "God of the Sun, Music, Poetry & Prophecy",
        color: "#FFB800",
        description: "Children of Apollo are artistic, optimistic, and radiate warmth. They have natural talents in music, healing, or archery.",
        effect: "Regeneration",
        traits: ["creativity", "optimism", "healing", "truth"]
    },
    "Artemis": {
        emoji: "🏹",
        domain: "Goddess of the Hunt, Moon & Wilderness",
        color: "#E8E8E8",
        description: "Children of Artemis (rare as she's a maiden goddess) are fiercely independent hunters who protect the wild and the innocent.",
        effect: "Speed",
        traits: ["independence", "protection", "nature", "precision"]
    },
    "Ares": {
        emoji: "⚔️",
        domain: "God of War, Violence & Bloodshed",
        color: "#8B0000",
        description: "Children of Ares are born warriors with explosive tempers. They thrive in conflict and never back down from a fight.",
        effect: "Strength",
        traits: ["aggression", "courage", "competition", "passion"]
    },
    "Aphrodite": {
        emoji: "💕",
        domain: "Goddess of Love, Beauty & Desire",
        color: "#FFB6C1",
        description: "Children of Aphrodite are naturally charming and attuned to emotions. They understand the heart and can influence feelings.",
        effect: "Regeneration",
        traits: ["charm", "empathy", "beauty", "persuasion"]
    },
    "Hephaestus": {
        emoji: "🔨",
        domain: "God of Fire, Forge & Craftsmanship",
        color: "#FF4500",
        description: "Children of Hephaestus are master builders and inventors. They can craft anything and feel at home near fire and machines.",
        effect: "Fire Resistance",
        traits: ["crafting", "persistence", "innovation", "practicality"]
    },
    "Hermes": {
        emoji: "👟",
        domain: "God of Travel, Trade, Thieves & Messengers",
        color: "#4169E1",
        description: "Children of Hermes are quick-witted, mischievous, and always on the move. They're natural thieves, travelers, and communicators.",
        effect: "Speed",
        traits: ["cunning", "speed", "communication", "adaptability"]
    },
    "Demeter": {
        emoji: "🌾",
        domain: "Goddess of Agriculture, Harvest & Seasons",
        color: "#228B22",
        description: "Children of Demeter have a deep connection to nature and growing things. They're nurturing, patient, and environmentally conscious.",
        effect: "Saturation",
        traits: ["nurturing", "patience", "growth", "nature"]
    },
    "Dionysus": {
        emoji: "🍇",
        domain: "God of Wine, Festivity & Madness",
        color: "#800080",
        description: "Children of Dionysus are the life of the party with wild spirits. They can induce madness or ecstasy and love celebrations.",
        effect: "Luck",
        traits: ["chaos", "celebration", "freedom", "emotion"]
    },
    "Hera": {
        emoji: "👑",
        domain: "Goddess of Marriage, Family & Queen of Olympus",
        color: "#008B8B",
        description: "Children of Hera (extremely rare) have strong family bonds and protective instincts. They value loyalty above all else.",
        effect: "Resistance",
        traits: ["loyalty", "family", "protection", "dignity"]
    },
    "Hecate": {
        emoji: "🌙",
        domain: "Goddess of Magic, Crossroads & Ghosts",
        color: "#191970",
        description: "Children of Hecate are natural magic users who walk between worlds. They're mysterious, powerful, and see what others cannot.",
        effect: "Slow Falling",
        traits: ["magic", "mystery", "intuition", "duality"]
    },
    "Hypnos": {
        emoji: "😴",
        domain: "God of Sleep & Dreams",
        color: "#6A5ACD",
        description: "Children of Hypnos are dreamwalkers who blur the line between sleep and waking. They're calm, intuitive, and can manipulate dreams.",
        effect: "Slow Falling",
        traits: ["dreams", "calm", "intuition", "peace"]
    },
    "Nike": {
        emoji: "🏆",
        domain: "Goddess of Victory",
        color: "#FFD700",
        description: "Children of Nike are born winners who hate losing. They're competitive, determined, and always strive to be the best.",
        effect: "Speed",
        traits: ["competition", "determination", "glory", "excellence"]
    },
    "Nemesis": {
        emoji: "⚖️",
        domain: "Goddess of Revenge & Divine Retribution",
        color: "#696969",
        description: "Children of Nemesis have an unshakeable sense of justice. They believe in balance and ensuring the arrogant are humbled.",
        effect: "Resistance",
        traits: ["justice", "balance", "revenge", "fairness"]
    },
    "Iris": {
        emoji: "🌈",
        domain: "Goddess of Rainbows & Messenger of the Gods",
        color: "#FF69B4",
        description: "Children of Iris are colorful, optimistic messengers. They can manipulate light, create rainbows, and spread hope.",
        effect: "Glowing",
        traits: ["hope", "communication", "color", "optimism"]
    },
    "Tyche": {
        emoji: "🎲",
        domain: "Goddess of Fortune & Luck",
        color: "#32CD32",
        description: "Children of Tyche are incredibly lucky (or unlucky). Fortune seems to bend around them in unpredictable ways.",
        effect: "Luck",
        traits: ["luck", "risk", "fortune", "chance"]
    }
};

const QUIZ_QUESTIONS = [
    {
        question: "You find yourself at a crossroads in a misty forest. Three paths lay before you. Which calls to you?",
        atmosphere: "forest",
        answers: [
            { text: "The path lit by flickering torches, leading upward toward distant thunder", gods: ["Zeus", "Nike", "Ares"] },
            { text: "The overgrown trail winding toward the sound of rushing water", gods: ["Poseidon", "Demeter", "Artemis"] },
            { text: "The shadowy path descending into mysterious darkness", gods: ["Hades", "Hecate", "Hypnos"] },
            { text: "The golden path shimmering with dappled sunlight", gods: ["Apollo", "Aphrodite", "Iris"] }
        ]
    },
    {
        question: "A fellow camper has wronged your closest friend. How do you respond?",
        atmosphere: "conflict",
        answers: [
            { text: "Confront them directly and demand they apologize immediately", gods: ["Ares", "Zeus", "Nike"] },
            { text: "Plan careful revenge when they least expect it", gods: ["Nemesis", "Athena", "Hades"] },
            { text: "Try to understand why they did it and seek a peaceful resolution", gods: ["Aphrodite", "Demeter", "Iris"] },
            { text: "Help your friend move on - dwelling on it won't help", gods: ["Apollo", "Hermes", "Dionysus"] }
        ]
    },
    {
        question: "You discover a hidden room in Camp Half-Blood. Inside, you find...",
        atmosphere: "discovery",
        answers: [
            { text: "An ancient forge with tools that seem to hum with power", gods: ["Hephaestus", "Athena", "Ares"] },
            { text: "A library of forbidden scrolls containing lost knowledge", gods: ["Athena", "Hecate", "Apollo"] },
            { text: "A pool of water showing visions of distant places", gods: ["Poseidon", "Iris", "Hypnos"] },
            { text: "A throne room with weapons and treasures from every era", gods: ["Zeus", "Hera", "Nike"] }
        ]
    },
    {
        question: "During capture the flag, what role do you naturally take?",
        atmosphere: "battle",
        answers: [
            { text: "Lead the charge and inspire others to follow", gods: ["Zeus", "Ares", "Nike"] },
            { text: "Scout ahead and report enemy positions", gods: ["Artemis", "Hermes", "Athena"] },
            { text: "Defend the flag with unwavering determination", gods: ["Hera", "Demeter", "Hades"] },
            { text: "Create distractions and chaos to confuse the enemy", gods: ["Dionysus", "Hermes", "Tyche"] }
        ]
    },
    {
        question: "What time of day makes you feel most alive?",
        atmosphere: "celestial",
        answers: [
            { text: "Dawn, when the world awakens with fresh possibilities", gods: ["Apollo", "Nike", "Iris"] },
            { text: "Midnight, when the world sleeps and secrets emerge", gods: ["Hecate", "Hypnos", "Hades"] },
            { text: "Dusk, the magical hour between day and night", gods: ["Artemis", "Aphrodite", "Nemesis"] },
            { text: "High noon, when energy and passion are at their peak", gods: ["Zeus", "Ares", "Hephaestus"] }
        ]
    },
    {
        question: "You receive a gift from an unknown sender. You open it to find...",
        atmosphere: "mystery",
        answers: [
            { text: "A beautifully crafted weapon that feels perfectly balanced in your hand", gods: ["Ares", "Hephaestus", "Athena"] },
            { text: "A journal filled with your future written in riddles", gods: ["Apollo", "Hecate", "Tyche"] },
            { text: "A compass that doesn't point north, but somewhere else entirely", gods: ["Hermes", "Poseidon", "Artemis"] },
            { text: "A mirror that shows your reflection, but different somehow", gods: ["Aphrodite", "Nemesis", "Hades"] }
        ]
    },
    {
        question: "What do you fear most?",
        atmosphere: "dark",
        answers: [
            { text: "Being forgotten, leaving no legacy behind", gods: ["Zeus", "Nike", "Apollo"] },
            { text: "Losing control of yourself or your emotions", gods: ["Dionysus", "Ares", "Poseidon"] },
            { text: "Being betrayed by someone you trusted completely", gods: ["Hera", "Nemesis", "Athena"] },
            { text: "Being alone, with no one who understands you", gods: ["Aphrodite", "Demeter", "Iris"] }
        ]
    },
    {
        question: "A mysterious figure offers you one gift. Which do you accept?",
        atmosphere: "offering",
        answers: [
            { text: "The power to see truth through any deception", gods: ["Athena", "Apollo", "Nemesis"] },
            { text: "The ability to move unseen and unheard", gods: ["Hermes", "Hecate", "Artemis"] },
            { text: "Strength that makes you nearly unstoppable", gods: ["Ares", "Poseidon", "Hephaestus"] },
            { text: "The gift of making anyone trust and like you", gods: ["Aphrodite", "Dionysus", "Iris"] }
        ]
    },
    {
        question: "You hear music in the distance. What draws you toward it?",
        atmosphere: "ethereal",
        answers: [
            { text: "War drums that make your heart pound with anticipation", gods: ["Ares", "Nike", "Zeus"] },
            { text: "A haunting melody that speaks to your soul", gods: ["Apollo", "Hypnos", "Hecate"] },
            { text: "Wild, chaotic music that makes you want to dance", gods: ["Dionysus", "Hermes", "Tyche"] },
            { text: "A gentle song that reminds you of home", gods: ["Demeter", "Hera", "Aphrodite"] }
        ]
    },
    {
        question: "When making an important decision, you rely most on...",
        atmosphere: "contemplation",
        answers: [
            { text: "Careful analysis and strategic thinking", gods: ["Athena", "Hephaestus", "Nemesis"] },
            { text: "Your gut instinct and inner feelings", gods: ["Poseidon", "Dionysus", "Tyche"] },
            { text: "What will bring the greatest glory or recognition", gods: ["Zeus", "Nike", "Apollo"] },
            { text: "How it will affect the people you care about", gods: ["Hera", "Demeter", "Aphrodite"] }
        ]
    },
    {
        question: "In your dreams, you often find yourself...",
        atmosphere: "dreams",
        answers: [
            { text: "Flying through storm clouds, lightning at your fingertips", gods: ["Zeus", "Nike", "Iris"] },
            { text: "Wandering through endless dark corridors seeking something", gods: ["Hades", "Hecate", "Hypnos"] },
            { text: "Swimming in an infinite ocean, breathing underwater", gods: ["Poseidon", "Artemis", "Demeter"] },
            { text: "Standing before crowds who cheer your name", gods: ["Apollo", "Aphrodite", "Ares"] }
        ]
    },
    {
        question: "What would you sacrifice for power?",
        atmosphere: "sacrifice",
        answers: [
            { text: "Nothing - power isn't worth losing who you are", gods: ["Demeter", "Hera", "Iris"] },
            { text: "My comfort, if it means achieving something great", gods: ["Athena", "Nike", "Apollo"] },
            { text: "Whatever it takes - the ends justify the means", gods: ["Hades", "Ares", "Nemesis"] },
            { text: "I don't seek power, I seek freedom", gods: ["Hermes", "Dionysus", "Artemis"] }
        ]
    },
    {
        question: "A injured creature lies in your path. What do you do?",
        atmosphere: "compassion",
        answers: [
            { text: "Heal it with whatever skills you have", gods: ["Apollo", "Demeter", "Artemis"] },
            { text: "End its suffering quickly and humanely", gods: ["Ares", "Nemesis", "Hades"] },
            { text: "Examine it to understand what happened", gods: ["Athena", "Hecate", "Hephaestus"] },
            { text: "Comfort it and stay until help arrives", gods: ["Aphrodite", "Hera", "Iris"] }
        ]
    },
    {
        question: "Which element speaks to your spirit?",
        atmosphere: "elemental",
        answers: [
            { text: "Fire - passionate, transformative, dangerous", gods: ["Hephaestus", "Ares", "Apollo"] },
            { text: "Water - adaptable, deep, ever-changing", gods: ["Poseidon", "Aphrodite", "Tyche"] },
            { text: "Earth - stable, nurturing, patient", gods: ["Demeter", "Hades", "Hera"] },
            { text: "Air - free, swift, impossible to contain", gods: ["Zeus", "Hermes", "Iris"] }
        ]
    },
    {
        question: "You find an ancient prophecy that mentions your name. You...",
        atmosphere: "prophecy",
        answers: [
            { text: "Embrace it - destiny has called and you will answer", gods: ["Zeus", "Apollo", "Nike"] },
            { text: "Study it carefully to understand every hidden meaning", gods: ["Athena", "Hecate", "Nemesis"] },
            { text: "Ignore it - you forge your own path", gods: ["Ares", "Hermes", "Dionysus"] },
            { text: "Feel the weight of it, knowing prophecies always come with a price", gods: ["Hades", "Hypnos", "Tyche"] }
        ]
    }
];

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ STATE
// ═══════════════════════════════════════════════════════════════════════════════

let quizState = {
    active: false,
    currentQuestion: 0,
    questions: [],
    godPoints: {},
    totalQuestions: 7,
    transitioning: false
};

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

function showQuizPage() {
    // Hide other sections
    document.getElementById('landing').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('journey').style.display = 'none';
    document.getElementById('documentation').classList.remove('active');
    document.getElementById('portal').classList.remove('active');
    document.querySelector('footer').style.display = 'none';
    
    // Show quiz section
    let quizSection = document.getElementById('quiz-section');
    if (!quizSection) {
        quizSection = createQuizSection();
        document.body.insertBefore(quizSection, document.querySelector('footer'));
    }
    quizSection.classList.add('active');
    
    // Show nav
    document.getElementById('main-nav').classList.add('visible');
    navVisible = true;
    
    // Initialize quiz intro
    showQuizIntro();
    
    window.scrollTo(0, 0);
}

function createQuizSection() {
    const section = document.createElement('section');
    section.id = 'quiz-section';
    section.innerHTML = `
        <div class="quiz-background">
            <div class="quiz-stars" id="quiz-stars"></div>
            <div class="quiz-mist" id="quiz-mist"></div>
            <div class="quiz-particles" id="quiz-particles"></div>
        </div>
        <div class="quiz-container" id="quiz-container">
            <!-- Content injected dynamically -->
        </div>
    `;
    
    // Create atmospheric effects
    setTimeout(() => {
        createQuizStars();
        createQuizMist();
        createQuizParticles();
    }, 100);
    
    return section;
}

function createQuizStars() {
    const container = document.getElementById('quiz-stars');
    if (!container) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'quiz-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(star);
    }
}

function createQuizMist() {
    const container = document.getElementById('quiz-mist');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const mist = document.createElement('div');
        mist.className = 'mist-layer';
        mist.style.animationDelay = (i * 3) + 's';
        mist.style.opacity = 0.1 + (i * 0.05);
        container.appendChild(mist);
    }
}

function createQuizParticles() {
    const container = document.getElementById('quiz-particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'quiz-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        container.appendChild(particle);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ INTRO
// ═══════════════════════════════════════════════════════════════════════════════

function showQuizIntro() {
    const container = document.getElementById('quiz-container');
    
    container.innerHTML = `
        <div class="quiz-intro" id="quiz-intro">
            <div class="oracle-glow"></div>
            <div class="intro-content">
                <div class="oracle-eye">
                    <div class="eye-outer">
                        <div class="eye-inner">
                            <div class="eye-pupil"></div>
                        </div>
                    </div>
                </div>
                <h1 class="intro-title">The Oracle Awaits</h1>
                <div class="intro-divider">
                    <span class="divider-symbol">☽</span>
                    <span class="divider-line"></span>
                    <span class="divider-symbol">☀</span>
                    <span class="divider-line"></span>
                    <span class="divider-symbol">☾</span>
                </div>
                <p class="intro-text">
                    Step forward, young one. The mists of Delphi part to reveal your true nature...
                </p>
                <p class="intro-subtext">
                    Answer honestly, for the Oracle sees through all deception.
                    Your responses will reveal which Olympian claims you as their child.
                </p>
                <div class="intro-buttons">
                    <button class="quiz-btn primary" onclick="startQuiz()">
                        <span class="btn-glow"></span>
                        <span class="btn-text">Begin the Ceremony</span>
                        <span class="btn-icon">🔮</span>
                    </button>
                    <button class="quiz-btn secondary" onclick="showManualSelect()">
                        <span class="btn-text">Choose Your Parent</span>
                        <span class="btn-icon">📜</span>
                    </button>
                </div>
                <p class="intro-note">
                    ${currentSession ? `Connected as <strong>${currentSession.username}</strong>` : 
                    'Connect in the Portal to save your results'}
                </p>
            </div>
        </div>
    `;
    
    // Animate in
    setTimeout(() => {
        document.getElementById('quiz-intro')?.classList.add('visible');
    }, 100);
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUIZ FLOW
// ═══════════════════════════════════════════════════════════════════════════════

function startQuiz() {
    // Reset state
    quizState = {
        active: true,
        currentQuestion: 0,
        questions: shuffleArray([...QUIZ_QUESTIONS]).slice(0, 7),
        godPoints: {},
        totalQuestions: 7,
        transitioning: false
    };
    
    // Transition out intro
    const intro = document.getElementById('quiz-intro');
    if (intro) {
        intro.classList.add('fade-out');
        setTimeout(() => showQuestion(), 800);
    } else {
        showQuestion();
    }
}

function showQuestion() {
    if (quizState.transitioning) return;
    
    const container = document.getElementById('quiz-container');
    const questionData = quizState.questions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion) / quizState.totalQuestions) * 100;
    
    // Shuffle answers for this question
    const shuffledAnswers = shuffleArray([...questionData.answers]);
    
    container.innerHTML = `
        <div class="quiz-question" id="quiz-question" data-atmosphere="${questionData.atmosphere}">
            <div class="question-atmosphere ${questionData.atmosphere}"></div>
            
            <div class="question-header">
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                        <div class="progress-glow" style="left: ${progress}%"></div>
                    </div>
                    <div class="progress-text">Question ${quizState.currentQuestion + 1} of ${quizState.totalQuestions}</div>
                </div>
            </div>
            
            <div class="question-content">
                <div class="question-symbols">
                    <span class="symbol left">✧</span>
                    <span class="symbol center">⟡</span>
                    <span class="symbol right">✧</span>
                </div>
                
                <h2 class="question-text">${questionData.question}</h2>
                
                <div class="answers-container">
                    ${shuffledAnswers.map((answer, i) => `
                        <button class="answer-btn" onclick="selectAnswer(${i})" data-index="${i}" data-gods='${JSON.stringify(answer.gods)}'>
                            <span class="answer-marker">${['◇', '◈', '◆', '❖'][i]}</span>
                            <span class="answer-text">${answer.text}</span>
                            <span class="answer-glow"></span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Store shuffled answers for reference
    quizState.currentAnswers = shuffledAnswers;
    
    // Animate in
    setTimeout(() => {
        const questionEl = document.getElementById('quiz-question');
        if (questionEl) {
            questionEl.classList.add('visible');
            
            // Stagger answer animations
            document.querySelectorAll('.answer-btn').forEach((btn, i) => {
                setTimeout(() => btn.classList.add('visible'), 200 + (i * 150));
            });
        }
    }, 50);
}

function selectAnswer(index) {
    if (quizState.transitioning) return;
    quizState.transitioning = true;
    
    const answer = quizState.currentAnswers[index];
    const btn = document.querySelector(`.answer-btn[data-index="${index}"]`);
    
    // Visual feedback
    btn.classList.add('selected');
    document.querySelectorAll('.answer-btn').forEach(b => {
        if (b !== btn) b.classList.add('not-selected');
    });
    
    // Add god points
    answer.gods.forEach(god => {
        quizState.godPoints[god] = (quizState.godPoints[god] || 0) + 1;
    });
    
    // Transition to next question or results
    setTimeout(() => {
        const questionEl = document.getElementById('quiz-question');
        if (questionEl) {
            questionEl.classList.add('fade-out');
            
            setTimeout(() => {
                quizState.currentQuestion++;
                quizState.transitioning = false;
                
                if (quizState.currentQuestion >= quizState.totalQuestions) {
                    showResults();
                } else {
                    showQuestion();
                }
            }, 600);
        }
    }, 500);
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESULTS
// ═══════════════════════════════════════════════════════════════════════════════

async function showResults() {
    const container = document.getElementById('quiz-container');
    
    // Determine god parent
    const godParent = Object.entries(quizState.godPoints)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Zeus';
    
    const god = OLYMPIAN_GODS[godParent];
    
    // Show loading/reveal animation
    container.innerHTML = `
        <div class="quiz-reveal" id="quiz-reveal">
            <div class="reveal-mist"></div>
            <div class="reveal-content">
                <div class="oracle-speaks">
                    <p class="oracle-text">The mists are clearing...</p>
                    <div class="oracle-spinner">
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                        <div class="spinner-ring"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('quiz-reveal')?.classList.add('visible');
    }, 50);
    
    // Save to database if logged in
    if (currentSession?.username) {
        try {
            await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/claim`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ god_parent: godParent })
            });
            
            // Update local session
            currentSession.god = godParent;
            currentSession.godEmoji = god.emoji;
            localStorage.setItem('chb_session', JSON.stringify(currentSession));
        } catch (e) {
            console.error('Failed to save god parent:', e);
        }
    }
    
    // Dramatic reveal
    setTimeout(() => {
        container.innerHTML = `
            <div class="quiz-result" id="quiz-result">
                <div class="result-glow" style="--god-color: ${god.color}"></div>
                <div class="result-rays"></div>
                
                <div class="result-content">
                    <div class="claiming-symbol">
                        <div class="symbol-burst"></div>
                        <div class="symbol-icon" style="--god-color: ${god.color}">${god.emoji}</div>
                    </div>
                    
                    <p class="result-proclamation">The Oracle has spoken...</p>
                    
                    <h1 class="result-title">
                        <span class="title-line">Child of</span>
                        <span class="god-name" style="color: ${god.color}">${godParent}</span>
                    </h1>
                    
                    <p class="result-domain">${god.domain}</p>
                    
                    <div class="result-description">
                        <div class="desc-border"></div>
                        <p>${god.description}</p>
                    </div>
                    
                    <div class="result-blessing">
                        <span class="blessing-icon">✨</span>
                        <span class="blessing-text">Minecraft Blessing: <strong>${god.effect}</strong></span>
                    </div>
                    
                    <div class="result-actions">
                        <button class="quiz-btn primary" onclick="showQuizIntro()">
                            <span class="btn-text">Take Quiz Again</span>
                        </button>
                        <button class="quiz-btn secondary" onclick="showManualSelect()">
                            <span class="btn-text">Choose Different God</span>
                        </button>
                        ${!currentSession ? `
                            <button class="quiz-btn accent" onclick="showPortal(); hideQuiz();">
                                <span class="btn-text">Connect Account to Save</span>
                            </button>
                        ` : ''}
                    </div>
                    
                    ${currentSession ? `
                        <p class="result-saved">
                            ✓ Saved to your profile! Check your mail for a letter from ${godParent}.
                        </p>
                    ` : ''}
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.getElementById('quiz-result')?.classList.add('visible');
        }, 50);
        
    }, 3000);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANUAL SELECTION
// ═══════════════════════════════════════════════════════════════════════════════

function showManualSelect() {
    const container = document.getElementById('quiz-container');
    
    const godEntries = Object.entries(OLYMPIAN_GODS);
    
    container.innerHTML = `
        <div class="quiz-manual" id="quiz-manual">
            <div class="manual-header">
                <button class="back-btn" onclick="showQuizIntro()">
                    <span>←</span> Back to Quiz
                </button>
                <h1>Choose Your Divine Parent</h1>
                <p>Select the Olympian god who will claim you as their child</p>
            </div>
            
            <div class="gods-grid">
                ${godEntries.map(([name, god]) => `
                    <div class="god-select-card" onclick="selectGod('${name}')" style="--god-color: ${god.color}">
                        <div class="god-card-glow"></div>
                        <div class="god-card-content">
                            <span class="god-card-emoji">${god.emoji}</span>
                            <h3 class="god-card-name">${name}</h3>
                            <p class="god-card-domain">${god.domain}</p>
                            <span class="god-card-effect">🎮 ${god.effect}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('quiz-manual')?.classList.add('visible');
        
        // Stagger card animations
        document.querySelectorAll('.god-select-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), 50 + (i * 30));
        });
    }, 50);
}

async function selectGod(godName) {
    const god = OLYMPIAN_GODS[godName];
    if (!god) return;
    
    // Reset quiz state with selected god
    quizState.godPoints = { [godName]: 100 };
    
    // Show result directly
    const container = document.getElementById('quiz-container');
    
    // Save to database if logged in
    if (currentSession?.username) {
        try {
            await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/claim`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ god_parent: godName })
            });
            
            currentSession.god = godName;
            currentSession.godEmoji = god.emoji;
            localStorage.setItem('chb_session', JSON.stringify(currentSession));
        } catch (e) {
            console.error('Failed to save god parent:', e);
        }
    }
    
    container.innerHTML = `
        <div class="quiz-result" id="quiz-result">
            <div class="result-glow" style="--god-color: ${god.color}"></div>
            <div class="result-rays"></div>
            
            <div class="result-content">
                <div class="claiming-symbol">
                    <div class="symbol-burst"></div>
                    <div class="symbol-icon" style="--god-color: ${god.color}">${god.emoji}</div>
                </div>
                
                <p class="result-proclamation">You have chosen your path...</p>
                
                <h1 class="result-title">
                    <span class="title-line">Child of</span>
                    <span class="god-name" style="color: ${god.color}">${godName}</span>
                </h1>
                
                <p class="result-domain">${god.domain}</p>
                
                <div class="result-description">
                    <div class="desc-border"></div>
                    <p>${god.description}</p>
                </div>
                
                <div class="result-blessing">
                    <span class="blessing-icon">✨</span>
                    <span class="blessing-text">Minecraft Blessing: <strong>${god.effect}</strong></span>
                </div>
                
                <div class="result-actions">
                    <button class="quiz-btn primary" onclick="showQuizIntro()">
                        <span class="btn-text">Take the Quiz Instead</span>
                    </button>
                    <button class="quiz-btn secondary" onclick="showManualSelect()">
                        <span class="btn-text">Choose Different God</span>
                    </button>
                </div>
                
                ${currentSession ? `
                    <p class="result-saved">
                        ✓ Saved to your profile! Check your mail for a letter from ${godName}.
                    </p>
                ` : `
                    <button class="quiz-btn accent" onclick="showPortal(); hideQuiz();" style="margin-top: 1rem;">
                        <span class="btn-text">Connect Account to Save</span>
                    </button>
                `}
            </div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById('quiz-result')?.classList.add('visible');
    }, 50);
}

function hideQuiz() {
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
        quizSection.classList.remove('active');
    }
    document.querySelector('footer').style.display = 'block';
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Export for global access
window.showQuizPage = showQuizPage;
window.startQuiz = startQuiz;
window.selectAnswer = selectAnswer;
window.showManualSelect = showManualSelect;
window.selectGod = selectGod;
window.hideQuiz = hideQuiz;
window.showQuizIntro = showQuizIntro;
