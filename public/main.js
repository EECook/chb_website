// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - FRONTEND JAVASCRIPT (WITH API)
// ══════════════════════════════════════════════════════════════════════════

// API Base URL - automatically uses same domain in production
const API_BASE = window.location.origin;

// Current session
let currentSession = null;

// ══════════════════════════════════════════════════════════════════════════
// STARFIELD & PARTICLES
// ══════════════════════════════════════════════════════════════════════════

function createStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        starfield.appendChild(star);
    }
    for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = (Math.random() * 50) + '%';
        shootingStar.style.top = (Math.random() * 30) + '%';
        shootingStar.style.animationDelay = (i * 8 + Math.random() * 5) + 's';
        starfield.appendChild(shootingStar);
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        container.appendChild(particle);
    }
}

// ══════════════════════════════════════════════════════════════════════════
// SCROLL & NAVIGATION
// ══════════════════════════════════════════════════════════════════════════

function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), index * 100);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-reveal, .journey-step').forEach(el => observer.observe(el));
}

let navVisible = false;

function handleNavVisibility() {
    const nav = document.getElementById('main-nav');
    const scrollY = window.scrollY;
    if (scrollY > 100) {
        if (!navVisible) { nav.classList.add('visible'); navVisible = true; }
    } else if (!document.getElementById('documentation').classList.contains('active') && 
               !document.getElementById('portal').classList.contains('active')) {
        nav.classList.remove('visible');
        navVisible = false;
    }
}

function showLanding() {
    document.getElementById('landing').style.display = 'flex';
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('journey').style.display = 'block';
    document.getElementById('documentation').classList.remove('active');
    document.getElementById('portal').classList.remove('active');
    document.querySelector('footer').style.display = 'block';
    window.scrollTo(0, 0);
    handleNavVisibility();
}

function scrollToWelcome() {
    document.getElementById('welcome').scrollIntoView({ behavior: 'smooth' });
}

function showPage(pageId) {
    const page = PAGES[pageId];
    if (!page) { console.error('Page not found:', pageId); return; }
    
    document.getElementById('landing').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('journey').style.display = 'none';
    document.getElementById('portal').classList.remove('active');
    document.getElementById('documentation').classList.add('active');
    document.querySelector('footer').style.display = 'block';
    
    document.getElementById('doc-content').innerHTML = `
        <div class="page-header">
            <span class="page-icon">${page.icon}</span>
            <h1 class="page-title">${page.title}</h1>
            <p class="page-subtitle">${page.subtitle}</p>
        </div>
        ${page.content}
    `;
    
    document.getElementById('main-nav').classList.add('visible');
    navVisible = true;
    window.scrollTo(0, 0);
}

function showPortal() {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('journey').style.display = 'none';
    document.getElementById('documentation').classList.remove('active');
    document.getElementById('portal').classList.add('active');
    document.querySelector('footer').style.display = 'block';
    
    document.getElementById('main-nav').classList.add('visible');
    navVisible = true;
    window.scrollTo(0, 0);
    
    // Check for saved session
    const saved = localStorage.getItem('chb_session');
    if (saved) {
        try {
            currentSession = JSON.parse(saved);
            refreshPlayerData();
        } catch(e) {
            console.error('Session load failed:', e);
        }
    }
}

function toggleMobile() {
    document.getElementById('mobile-menu').classList.toggle('active');
    document.body.style.overflow = document.getElementById('mobile-menu').classList.contains('active') ? 'hidden' : '';
}

function closeMobile() {
    document.getElementById('mobile-menu').classList.remove('active');
    document.body.style.overflow = '';
}

// ══════════════════════════════════════════════════════════════════════════
// PORTAL - API INTEGRATION
// ══════════════════════════════════════════════════════════════════════════

function connectDiscord() {
    // For now, show message. Full OAuth can be added later.
    alert('Discord OAuth coming soon!\n\nFor now, connect with your Minecraft username.');
}

function showMCLogin() {
    document.getElementById('login-options').style.display = 'none';
    document.getElementById('mc-form').classList.add('active');
}

function showLoginOptions() {
    document.getElementById('login-options').style.display = 'block';
    document.getElementById('mc-form').classList.remove('active');
}

async function loginWithMC() {
    const username = document.getElementById('mc-username').value.trim();
    if (!username) {
        alert('Please enter your Minecraft username');
        return;
    }
    
    // Show loading state
    const btn = document.querySelector('#mc-form .submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Connecting...';
    btn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(username)}`);
        const result = await response.json();
        
        if (result.success) {
            currentSession = {
                username: result.data.mc_username,
                god: result.data.god_parent,
                godEmoji: result.data.god_emoji || '❓',
                godColor: result.data.god_color || 'Unknown',
                godEffect: result.data.god_effect || 'Unknown',
                godDomain: result.data.god_domain || '',
                drachma: result.data.drachma || 0,
                mail: result.data.unread_mail || 0,
                cabin: result.data.cabin_name,
                favor: result.data.divine_favor || 0,
                isDemo: result.isDemo || false,
                isNew: result.isNew || false
            };
            
            localStorage.setItem('chb_session', JSON.stringify(currentSession));
            
            if (result.isNew) {
                alert(`Welcome to Camp Half-Blood, ${username}! 🏕️\n\nYou've been given 100 Drachma to start.\nUse !claim in Discord to discover your godly parent!`);
            }
            
            if (result.isDemo) {
                console.log('⚠️ Running in demo mode - data is simulated');
            }
            
            loadPortalDashboard();
            loadCharacterSheet();
            loadMail();
            loadInventory();
        } else {
            alert('Error: ' + (result.error || 'Could not connect'));
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Connection failed. Please try again.');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

async function refreshPlayerData() {
    if (!currentSession?.username) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}`);
        const result = await response.json();
        
        if (result.success) {
            currentSession = {
                ...currentSession,
                god: result.data.god_parent,
                godEmoji: result.data.god_emoji || currentSession.godEmoji,
                godColor: result.data.god_color || currentSession.godColor,
                godEffect: result.data.god_effect || currentSession.godEffect,
                drachma: result.data.drachma,
                mail: result.data.unread_mail || 0,
                cabin: result.data.cabin_name,
                favor: result.data.divine_favor || 0
            };
            
            localStorage.setItem('chb_session', JSON.stringify(currentSession));
            loadPortalDashboard();
        }
    } catch (error) {
        console.error('Refresh failed:', error);
    }
}

function loadPortalDashboard() {
    if (!currentSession) return;
    
    document.getElementById('portal-login').style.display = 'none';
    document.getElementById('portal-dashboard').classList.add('active');
    
    // Update banner
    document.getElementById('player-name').textContent = currentSession.username;
    
    if (currentSession.god) {
        document.getElementById('player-god').textContent = 
            `${currentSession.godEmoji} Child of ${currentSession.god}`;
    } else {
        document.getElementById('player-god').textContent = '❓ Unclaimed - Use !claim in Discord';
    }
    
    document.getElementById('player-drachma').textContent = currentSession.drachma;
    document.getElementById('player-mail').textContent = currentSession.mail;
    
    // Update overview
    document.getElementById('overview-god').textContent = currentSession.god || 'Unclaimed';
    document.getElementById('overview-color').textContent = `Nametag: ${currentSession.godColor || 'N/A'}`;
    document.getElementById('overview-effect').textContent = `Effect: ${currentSession.godEffect || 'N/A'}`;
    document.getElementById('overview-cabin').textContent = currentSession.cabin || 'Not in a cabin';
    document.getElementById('overview-favor').textContent = currentSession.favor;
    document.getElementById('overview-mc').textContent = currentSession.username;
    
    // Show demo warning if applicable
    if (currentSession.isDemo) {
        const banner = document.querySelector('.player-banner');
        if (!banner.querySelector('.demo-warning')) {
            const warning = document.createElement('div');
            warning.className = 'demo-warning';
            warning.style.cssText = 'background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; margin-top: 1rem; text-align: center;';
            warning.textContent = '⚠️ Demo Mode - Connect database for real data tracking';
            banner.appendChild(warning);
        }
    }
}

async function loadMail() {
    if (!currentSession?.username) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/mail`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const mailPanel = document.getElementById('panel-mail');
            mailPanel.innerHTML = `
                <div class="doc-section">
                    <h2>📬 Your Mail (${result.data.length})</h2>
                    <div class="mail-list">
                        ${result.data.map(mail => `
                            <div class="mail-item ${mail.is_read ? '' : 'unread'}" onclick="openMail(${mail.id})">
                                <div class="mail-icon">${mail.is_read ? '📭' : '📬'}</div>
                                <div class="mail-content">
                                    <div class="mail-subject">${mail.subject}</div>
                                    <div class="mail-sender">From: ${mail.sender}</div>
                                    <div class="mail-date">${new Date(mail.created_at).toLocaleDateString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add mail styles if not present
            if (!document.getElementById('mail-styles')) {
                const style = document.createElement('style');
                style.id = 'mail-styles';
                style.textContent = `
                    .mail-item { display: flex; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.3s ease; }
                    .mail-item:hover { border-color: var(--gold); transform: translateX(5px); }
                    .mail-item.unread { border-left: 3px solid var(--lightning); background: rgba(79,195,247,0.1); }
                    .mail-icon { font-size: 1.5rem; }
                    .mail-subject { font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 0.25rem; }
                    .mail-sender { font-size: 0.85rem; color: var(--marble-dark); }
                    .mail-date { font-size: 0.75rem; color: var(--gold-dark); }
                `;
                document.head.appendChild(style);
            }
        }
    } catch (error) {
        console.error('Mail load failed:', error);
    }
}

async function openMail(mailId) {
    try {
        await fetch(`${API_BASE}/api/mail/${mailId}/read`, { method: 'POST' });
        loadMail();
        refreshPlayerData();
    } catch (error) {
        console.error('Mark read failed:', error);
    }
}

async function loadInventory() {
    if (!currentSession?.username) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/inventory`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            const invPanel = document.getElementById('panel-inventory');
            invPanel.innerHTML = `
                <div class="doc-section">
                    <h2>🎒 Your Inventory (${result.data.length} items)</h2>
                    <div class="inventory-grid">
                        ${result.data.map(item => `
                            <div class="inventory-item">
                                <div class="item-name">${item.item_name}</div>
                                <div class="item-qty">x${item.quantity}</div>
                                ${item.is_redeemable ? '<div class="item-tag">✨ Redeemable</div>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            // Add inventory styles
            if (!document.getElementById('inv-styles')) {
                const style = document.createElement('style');
                style.id = 'inv-styles';
                style.textContent = `
                    .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
                    .inventory-item { background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; padding: 1rem; text-align: center; }
                    .item-name { font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 0.5rem; }
                    .item-qty { color: var(--marble-dark); font-size: 0.9rem; }
                    .item-tag { background: rgba(79,195,247,0.2); color: var(--lightning); padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.75rem; margin-top: 0.5rem; display: inline-block; }
                `;
                document.head.appendChild(style);
            }
        }
    } catch (error) {
        console.error('Inventory load failed:', error);
    }
}

async function loadCharacterSheet() {
    if (!currentSession?.username) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/character`);
        const result = await response.json();
        
        if (result.success && result.data) {
            const data = result.data;
            if (data.char_name) document.getElementById('char-name').value = data.char_name;
            if (data.age) document.getElementById('char-age').value = data.age;
            if (data.gender) document.getElementById('char-gender').value = data.gender;
            if (data.pronouns) document.getElementById('char-pronouns').value = data.pronouns;
            if (data.personality) document.getElementById('char-personality').value = data.personality;
            if (data.likes) document.getElementById('char-likes').value = data.likes;
            if (data.dislikes) document.getElementById('char-dislikes').value = data.dislikes;
            if (data.backstory) document.getElementById('char-backstory').value = data.backstory;
            if (data.weapon) document.getElementById('char-weapon').value = data.weapon;
            if (data.fighting_style) document.getElementById('char-style').value = data.fighting_style;
            if (data.abilities) document.getElementById('char-abilities').value = data.abilities;
            if (data.goals) document.getElementById('char-goals').value = data.goals;
            if (data.fears) document.getElementById('char-fears').value = data.fears;
            if (data.image_url) {
                document.getElementById('char-image-preview').innerHTML = `<img src="${data.image_url}" alt="Character">`;
            }
        }
    } catch (error) {
        console.error('Character load failed:', error);
    }
}

async function saveCharacterSheet() {
    if (!currentSession?.username) {
        alert('Please connect your account first');
        return;
    }
    
    const imageEl = document.querySelector('#char-image-preview img');
    
    const data = {
        name: document.getElementById('char-name').value,
        age: document.getElementById('char-age').value,
        gender: document.getElementById('char-gender').value,
        pronouns: document.getElementById('char-pronouns').value,
        personality: document.getElementById('char-personality').value,
        likes: document.getElementById('char-likes').value,
        dislikes: document.getElementById('char-dislikes').value,
        backstory: document.getElementById('char-backstory').value,
        weapon: document.getElementById('char-weapon').value,
        style: document.getElementById('char-style').value,
        abilities: document.getElementById('char-abilities').value,
        goals: document.getElementById('char-goals').value,
        fears: document.getElementById('char-fears').value,
        image: imageEl ? imageEl.src : null
    };
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/character`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Character sheet saved! ✅');
        } else {
            alert('Save failed: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Save failed:', error);
        alert('Connection error. Please try again.');
    }
}

function logoutPortal() {
    currentSession = null;
    localStorage.removeItem('chb_session');
    document.getElementById('portal-login').style.display = 'block';
    document.getElementById('portal-dashboard').classList.remove('active');
    showLoginOptions();
    document.getElementById('mc-username').value = '';
    
    // Clear form fields
    ['char-name', 'char-age', 'char-gender', 'char-pronouns', 'char-personality', 
     'char-likes', 'char-dislikes', 'char-backstory', 'char-weapon', 'char-style',
     'char-abilities', 'char-goals', 'char-fears'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('char-image-preview').innerHTML = '<span class="placeholder">No image</span>';
}

function switchPortalTab(tabId) {
    document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.portal-panel').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('panel-' + tabId).classList.add('active');
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        alert('Image must be smaller than 2MB');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('char-image-preview').innerHTML = `<img src="${e.target.result}" alt="Character">`;
    };
    reader.readAsDataURL(file);
}

// ══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    createParticles();
    setupScrollReveal();
    window.addEventListener('scroll', handleNavVisibility);
    
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobile();
        }
    });

    // Check API health
    fetch(`${API_BASE}/api/health`)
        .then(r => r.json())
        .then(data => {
            console.log('🏕️ Camp Half-Blood API:', data.status, '| Database:', data.database);
        })
        .catch(() => console.log('⚠️ API not available - running static'));

    console.log('%c⚡ Camp Half-Blood ⚡', 'font-size: 24px; color: #D4AF37; font-family: serif;');
});
