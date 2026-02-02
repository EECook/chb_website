/*
 * Camp Half-Blood - Main Application
 * Core functionality, navigation, and session management
 */

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const API_BASE = 'chbwebsite-production.up.railway.app';

// ═══════════════════════════════════════════════════════════════════════════════
// SESSION MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

let currentSession = null;
let navVisible = false;

// Load session from localStorage on page load
function loadSession() {
    try {
        const stored = localStorage.getItem('chb_session');
        if (stored) {
            currentSession = JSON.parse(stored);
            updateSessionUI();
        }
    } catch (e) {
        console.error('Failed to load session:', e);
        currentSession = null;
    }
}

function saveSession(session) {
    currentSession = session;
    localStorage.setItem('chb_session', JSON.stringify(session));
    updateSessionUI();
}

function clearSession() {
    currentSession = null;
    localStorage.removeItem('chb_session');
    updateSessionUI();
}

function updateSessionUI() {
    // Update any session-dependent UI elements
    const portalBtn = document.querySelector('.portal-btn');
    if (portalBtn && currentSession) {
        portalBtn.innerHTML = `🌀 ${currentSession.username}`;
    } else if (portalBtn) {
        portalBtn.innerHTML = '🌀 Portal';
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

function showLanding() {
    // Hide all sections
    hideAllSections();
    
    // Show landing
    document.getElementById('landing').style.display = 'flex';
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('journey').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
    
    // Reset nav
    document.getElementById('main-nav').classList.remove('visible');
    navVisible = false;
    
    window.scrollTo(0, 0);
}

function hideAllSections() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('journey')?.style && (document.getElementById('journey').style.display = 'none');
    document.getElementById('documentation')?.classList.remove('active');
    document.getElementById('portal')?.classList.remove('active');
    document.getElementById('quiz-section')?.classList.remove('active');
    document.querySelector('footer').style.display = 'none';
}

function showPage(pageId) {
    hideAllSections();
    
    // Show documentation section
    const docSection = document.getElementById('documentation');
    if (docSection) {
        docSection.classList.add('active');
    }
    
    // Hide all pages, show the requested one
    document.querySelectorAll('.doc-page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Show nav and footer
    document.getElementById('main-nav').classList.add('visible');
    navVisible = true;
    document.querySelector('footer').style.display = 'block';
    
    window.scrollTo(0, 0);
    closeMobile();
}

function showPortal() {
    hideAllSections();
    
    // Show portal section
    const portal = document.getElementById('portal');
    if (portal) {
        portal.classList.add('active');
    }
    
    // Show nav
    document.getElementById('main-nav').classList.add('visible');
    navVisible = true;
    document.querySelector('footer').style.display = 'block';
    
    window.scrollTo(0, 0);
    closeMobile();
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL BEHAVIOR
// ═══════════════════════════════════════════════════════════════════════════════

function scrollToWelcome() {
    const welcome = document.getElementById('welcome');
    if (welcome) {
        welcome.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle scroll for nav visibility
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const nav = document.getElementById('main-nav');
    const landing = document.getElementById('landing');
    
    // Only auto-show/hide nav on landing page
    if (landing && landing.style.display !== 'none') {
        const landingHeight = landing.offsetHeight;
        
        if (scrollTop > landingHeight * 0.5 && !navVisible) {
            nav.classList.add('visible');
            navVisible = true;
        } else if (scrollTop < landingHeight * 0.3 && navVisible && !document.querySelector('.doc-page.active')) {
            nav.classList.remove('visible');
            navVisible = false;
        }
    }
    
    lastScroll = scrollTop;
});

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════════════════════

function toggleMobile() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.mobile-toggle');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        toggle?.classList.toggle('active');
    }
}

function closeMobile() {
    const mobileMenu = document.getElementById('mobile-menu');
    const toggle = document.querySelector('.mobile-toggle');
    
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        toggle?.classList.remove('active');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// STARFIELD BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function createStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starfield.appendChild(star);
    }
}

function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particles.appendChild(particle);
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PORTAL FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════════

async function loginToPortal(username, password) {
    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            saveSession(data);
            return { success: true, data };
        } else {
            return { success: false, error: 'Invalid credentials' };
        }
    } catch (e) {
        console.error('Login failed:', e);
        return { success: false, error: 'Connection failed' };
    }
}

async function fetchPlayerData(username) {
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(username)}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error('Failed to fetch player data:', e);
    }
    return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER SHEET FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function previewImage(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Character image">`;
            }
        };
        reader.readAsDataURL(file);
    }
}

function setImageUrl(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    if (input && preview && input.value) {
        preview.innerHTML = `<img src="${input.value}" alt="Character image">`;
    }
}

function removeImage(previewId) {
    const preview = document.getElementById(previewId);
    if (preview) {
        preview.innerHTML = '<span class="placeholder">No image</span>';
    }
}

async function saveCharacterSheet() {
    if (!currentSession?.username) {
        alert('Please login first');
        return;
    }
    
    // Collect form data
    const formData = {
        name: document.getElementById('char-name')?.value || '',
        age: document.getElementById('char-age')?.value || '',
        gender: document.getElementById('char-gender')?.value || '',
        personality: document.getElementById('char-personality')?.value || '',
        likes: document.getElementById('char-likes')?.value || '',
        dislikes: document.getElementById('char-dislikes')?.value || '',
        backstory: document.getElementById('char-backstory')?.value || '',
        weapon: document.getElementById('char-weapon')?.value || '',
        style: document.getElementById('char-style')?.value || '',
        abilities: document.getElementById('char-abilities')?.value || '',
        goals: document.getElementById('char-goals')?.value || '',
        fears: document.getElementById('char-fears')?.value || '',
        isPublic: document.getElementById('char-public')?.checked ?? true
    };
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/character`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Character sheet saved!');
        } else {
            alert('Failed to save character sheet');
        }
    } catch (e) {
        console.error('Failed to save character sheet:', e);
        alert('Connection error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

function initAnnouncementsPage() {
    // Initialize announcements page functionality
    console.log('Announcements page initialized');
}

// ═══════════════════════════════════════════════════════════════════════════════
// DROPDOWN HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('click', (e) => {
    // Close dropdowns when clicking outside
    if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(10px)';
        });
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Load session
    loadSession();
    
    // Create background effects
    createStarfield();
    createParticles();
    
    // Initialize scroll reveal
    initScrollReveal();
    
    console.log('⚡ Camp Half-Blood initialized');
});

// Export functions globally
window.showLanding = showLanding;
window.showPage = showPage;
window.showPortal = showPortal;
window.scrollToWelcome = scrollToWelcome;
window.toggleMobile = toggleMobile;
window.closeMobile = closeMobile;
window.loginToPortal = loginToPortal;
window.previewImage = previewImage;
window.setImageUrl = setImageUrl;
window.removeImage = removeImage;
window.saveCharacterSheet = saveCharacterSheet;
window.initAnnouncementsPage = initAnnouncementsPage;

// ═══════════════════════════════════════════════════════════════════════════════
// ADDITIONAL PORTAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function showLoginOptions() {
    const loginOptions = document.getElementById('login-options');
    const mcForm = document.getElementById('mc-form');
    if (loginOptions) loginOptions.style.display = 'block';
    if (mcForm) mcForm.style.display = 'none';
}

function showMCLogin() {
    const loginOptions = document.getElementById('login-options');
    const mcForm = document.getElementById('mc-form');
    if (loginOptions) loginOptions.style.display = 'none';
    if (mcForm) mcForm.style.display = 'block';
}

async function loginWithMC() {
    const username = document.getElementById('mc-username')?.value?.trim();
    if (!username) {
        alert('Please enter your Minecraft username');
        return;
    }
    
    // For now, just create a session (in real implementation, this would verify the account)
    const session = {
        username: username,
        god: null,
        godEmoji: null,
        drachma: 0,
        divine_favor: 0
    };
    
    // Try to fetch existing player data
    const playerData = await fetchPlayerData(username);
    if (playerData) {
        session.god = playerData.god_parent;
        session.godEmoji = playerData.god_emoji;
        session.drachma = playerData.drachma || 0;
        session.divine_favor = playerData.divine_favor || 0;
    }
    
    saveSession(session);
    showPortalDashboard();
}

function showPortalDashboard() {
    const loginCard = document.getElementById('portal-login');
    const dashboard = document.getElementById('portal-dashboard');
    
    if (loginCard) loginCard.style.display = 'none';
    if (dashboard) {
        dashboard.style.display = 'block';
        updateDashboard();
    }
}

function updateDashboard() {
    if (!currentSession) return;
    
    // Update player info
    const playerName = document.getElementById('player-name');
    const playerGod = document.getElementById('player-god');
    const playerDrachma = document.getElementById('player-drachma');
    
    if (playerName) playerName.textContent = currentSession.username;
    if (playerGod) {
        playerGod.textContent = currentSession.god 
            ? `${currentSession.godEmoji || ''} Child of ${currentSession.god}` 
            : 'Unclaimed';
    }
    if (playerDrachma) playerDrachma.textContent = currentSession.drachma || 0;
    
    // Update overview panel
    const overviewGod = document.getElementById('overview-god');
    const overviewCabin = document.getElementById('overview-cabin');
    const overviewMc = document.getElementById('overview-mc');
    
    if (overviewGod) overviewGod.textContent = currentSession.god || 'Unknown';
    if (overviewCabin) overviewCabin.textContent = currentSession.god ? `Cabin ${currentSession.god}` : 'None';
    if (overviewMc) overviewMc.textContent = currentSession.username;
}

function switchPortalTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.portal-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide panels
    document.querySelectorAll('.portal-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    const targetPanel = document.getElementById(`panel-${tabName}`);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

function logoutPortal() {
    clearSession();
    
    const loginCard = document.getElementById('portal-login');
    const dashboard = document.getElementById('portal-dashboard');
    
    if (loginCard) loginCard.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    
    showLoginOptions();
}

function connectDiscord() {
    alert('Discord OAuth coming soon!');
}

// Export additional portal functions
window.showLoginOptions = showLoginOptions;
window.showMCLogin = showMCLogin;
window.loginWithMC = loginWithMC;
window.switchPortalTab = switchPortalTab;
window.logoutPortal = logoutPortal;
window.connectDiscord = connectDiscord;
