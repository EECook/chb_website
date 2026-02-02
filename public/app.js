/*
 * Camp Half-Blood Frontend
 * v5 - Full Mail System + Character browser + multi-image support + Announcements with Admin Panel
 */
const API_BASE = window.location.origin;
let currentSession = null;
let playersCache = null; // Cache for player list

// Background effects
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
    
    const saved = localStorage.getItem('chb_session');
    if (saved) {
        try {
            currentSession = JSON.parse(saved);
            refreshPlayerData();
            loadCharacterSheet();
            loadMail();
            loadInventory();
            loadPublicCharacters();
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

// Portal login
function connectDiscord() {
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
                visibleUsername: result.data.username, // Discord username if available
                visibleDiscordId: result.data.discord_id, // Discord ID if available
                god: result.data.god_parent,
                godEmoji: result.data.god_emoji || '?',
                godColor: result.data.god_color || 'Unknown',
                godEffect: result.data.god_effect || 'Unknown',
                godDomain: result.data.god_domain || '',
                drachma: result.data.drachma || 0,
                mail: result.data.unread_mail || 0,
                cabin: result.data.cabin_name,
                favor: result.data.divine_favor || 0,
                isDemo: result.isDemo || false
            };
            
            localStorage.setItem('chb_session', JSON.stringify(currentSession));
            
            loadPortalDashboard();
            loadCharacterSheet();
            loadMail();
            loadInventory();
            loadPublicCharacters();
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
    
    document.getElementById('player-name').textContent = currentSession.username;
    
    if (currentSession.god) {
        document.getElementById('player-god').textContent = 
            `${currentSession.godEmoji} Child of ${currentSession.god}`;
    } else {
        document.getElementById('player-god').textContent = '? Unclaimed - Use !claim in Discord';
    }
    
    document.getElementById('player-drachma').textContent = currentSession.drachma;
    document.getElementById('player-mail').textContent = currentSession.mail;
    
    document.getElementById('overview-god').textContent = currentSession.god || 'Unclaimed';
    document.getElementById('overview-color').textContent = `Nametag: ${currentSession.godColor || 'N/A'}`;
    document.getElementById('overview-effect').textContent = `Effect: ${currentSession.godEffect || 'N/A'}`;
    document.getElementById('overview-cabin').textContent = currentSession.cabin || 'Not in a cabin';
    document.getElementById('overview-favor').textContent = currentSession.favor;
    document.getElementById('overview-mc').textContent = currentSession.username;
    
    if (currentSession.isDemo) {
        const banner = document.querySelector('.player-banner');
        if (banner && !banner.querySelector('.demo-warning')) {
            const warning = document.createElement('div');
            warning.className = 'demo-warning';
            warning.style.cssText = 'background: rgba(251,191,36,0.2); color: #fbbf24; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.85rem; margin-top: 1rem; text-align: center;';
            warning.textContent = 'Demo Mode - Connect database for real data tracking';
            banner.appendChild(warning);
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════
// MAIL SYSTEM - Full Interactive Features
// ══════════════════════════════════════════════════════════════════════════

function injectMailStyles() {
    if (document.getElementById('mail-styles-v2')) return;
    
    const style = document.createElement('style');
    style.id = 'mail-styles-v2';
    style.textContent = `
        .mail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 1rem; }
        .mail-actions { display: flex; gap: 0.5rem; }
        .mail-btn { padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.3); background: rgba(0,0,0,0.3); color: var(--marble); cursor: pointer; font-size: 0.85rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem; }
        .mail-btn:hover { border-color: var(--gold); background: rgba(212,175,55,0.1); }
        .mail-btn.primary { background: rgba(212,175,55,0.2); border-color: var(--gold); }
        .mail-btn.danger { border-color: rgba(239,68,68,0.5); }
        .mail-btn.danger:hover { background: rgba(239,68,68,0.2); border-color: #ef4444; }
        .mail-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .mail-list { display: flex; flex-direction: column; gap: 0.5rem; }
        .mail-item { display: flex; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; cursor: pointer; transition: all 0.3s ease; align-items: flex-start; }
        .mail-item:hover { border-color: var(--gold); transform: translateX(5px); background: rgba(212,175,55,0.05); }
        .mail-item.unread { border-left: 3px solid var(--lightning); background: rgba(79,195,247,0.1); }
        .mail-item.unread .mail-subject { font-weight: bold; }
        .mail-icon { font-size: 1.5rem; flex-shrink: 0; }
        .mail-content { flex: 1; min-width: 0; }
        .mail-subject { font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mail-preview { font-size: 0.85rem; color: var(--marble-dark); margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mail-meta { display: flex; gap: 1rem; font-size: 0.75rem; color: var(--gold-dark); flex-wrap: wrap; }
        .mail-delete-btn { padding: 0.5rem; border-radius: 6px; border: 1px solid transparent; background: transparent; color: var(--marble-dark); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .mail-delete-btn:hover { border-color: #ef4444; background: rgba(239,68,68,0.2); color: #ef4444; }
        
        .mail-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(5px); }
        .mail-modal-content { background: linear-gradient(135deg, rgba(26,26,46,0.98), rgba(15,15,30,0.98)); border: 1px solid var(--gold); border-radius: 16px; max-width: 600px; width: 100%; max-height: 80vh; overflow: hidden; display: flex; flex-direction: column; }
        .mail-modal-header { padding: 1.5rem; border-bottom: 1px solid rgba(212,175,55,0.2); display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .mail-modal-title { font-family: 'Cinzel', serif; color: var(--gold); font-size: 1.25rem; margin: 0; }
        .mail-modal-meta { font-size: 0.85rem; color: var(--marble-dark); margin-top: 0.5rem; }
        .mail-modal-close { background: none; border: none; color: var(--marble); font-size: 1.5rem; cursor: pointer; padding: 0.5rem; line-height: 1; border-radius: 8px; }
        .mail-modal-close:hover { background: rgba(255,255,255,0.1); }
        .mail-modal-body { padding: 1.5rem; overflow-y: auto; flex: 1; }
        .mail-modal-body p { white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; color: var(--marble); }
        .mail-modal-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(212,175,55,0.2); display: flex; justify-content: flex-end; gap: 0.5rem; }
        
        .compose-form { background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; }
        .compose-form h3 { font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .compose-row { margin-bottom: 1rem; }
        .compose-row label { display: block; color: var(--marble-dark); font-size: 0.85rem; margin-bottom: 0.5rem; }
        .compose-row input, .compose-row textarea, .compose-row select { width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; color: var(--marble); font-family: inherit; font-size: 0.95rem; }
        .compose-row input:focus, .compose-row textarea:focus, .compose-row select:focus { outline: none; border-color: var(--gold); }
        .compose-row textarea { min-height: 120px; resize: vertical; }
        .compose-row select { cursor: pointer; }
        .compose-row select option { background: #1a1a2e; color: var(--marble); }
        .compose-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
        .compose-form.collapsed { padding: 0; border: none; background: none; }
        .compose-form.collapsed > *:not(.compose-toggle) { display: none; }
        .compose-toggle { display: none; }
        .compose-form.collapsed .compose-toggle { display: block; }
        
        .mail-type-badge { display: inline-block; padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; }
        .mail-type-badge.personal { background: rgba(79,195,247,0.2); color: #4fc3f7; }
        .mail-type-badge.god_claiming { background: rgba(212,175,55,0.2); color: var(--gold); }
        .mail-type-badge.cabin_invite { background: rgba(76,175,80,0.2); color: #4caf50; }
        .mail-type-badge.system { background: rgba(156,39,176,0.2); color: #ce93d8; }
        .mail-type-badge.reward { background: rgba(255,193,7,0.2); color: #ffc107; }
        .mail-type-badge.shop_order { background: rgba(233,30,99,0.2); color: #f48fb1; }
        
        .empty-mail { text-align: center; padding: 3rem 1rem; color: var(--marble-dark); }
        .empty-mail-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
    `;
    document.head.appendChild(style);
}

async function loadMail() {
    if (!currentSession?.username) return;
    
    injectMailStyles();
    const mailPanel = document.getElementById('panel-mail');
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/mail`);
        const result = await response.json();
        
        const mailData = result.success && result.data ? result.data : [];
        const unreadCount = mailData.filter(m => !m.is_read).length;
        const readCount = mailData.filter(m => m.is_read).length;
        
        // Update header mail count
        document.getElementById('player-mail').textContent = unreadCount;
        currentSession.mail = unreadCount;
        localStorage.setItem('chb_session', JSON.stringify(currentSession));
        
        mailPanel.innerHTML = `
            <div class="doc-section">
                <div class="mail-header">
                    <h2>📬 Your Mail (${mailData.length})</h2>
                    <div class="mail-actions">
                        <button class="mail-btn primary" onclick="toggleComposeForm()">
                            ✉️ Compose
                        </button>
                        <button class="mail-btn danger" onclick="deleteAllReadMail()" ${readCount === 0 ? 'disabled' : ''}>
                            🗑️ Delete Read (${readCount})
                        </button>
                    </div>
                </div>
                
                <div id="compose-container"></div>
                
                ${mailData.length > 0 ? `
                    <div class="mail-list">
                        ${mailData.map(mail => `
                            <div class="mail-item ${mail.is_read ? '' : 'unread'}" data-mail-id="${mail.mail_id}">
                                <div class="mail-icon" onclick="openMailModal(${mail.mail_id})">${getMailIcon(mail.mail_type, mail.is_read)}</div>
                                <div class="mail-content" onclick="openMailModal(${mail.mail_id})">
                                    <div class="mail-subject">${escapeHtml(mail.subject || 'No Subject')}</div>
                                    <div class="mail-preview">${escapeHtml((mail.content || '').substring(0, 80))}${(mail.content || '').length > 80 ? '...' : ''}</div>
                                    <div class="mail-meta">
                                        <span class="mail-type-badge ${mail.mail_type || 'personal'}">${formatMailType(mail.mail_type)}</span>
                                        <span>From: ${escapeHtml(mail.sender_name || 'Unknown')}</span>
                                        <span>${formatDate(mail.created_at)}</span>
                                    </div>
                                </div>
                                <button class="mail-delete-btn" onclick="event.stopPropagation(); deleteMail(${mail.mail_id})" title="Delete">🗑️</button>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="empty-mail">
                        <div class="empty-mail-icon">📭</div>
                        <p>Your mailbox is empty!</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Messages from gods, events, and other players will appear here.</p>
                    </div>
                `}
            </div>
        `;
    } catch (error) {
        console.error('Mail load failed:', error);
        mailPanel.innerHTML = `
            <div class="doc-section">
                <h2>📬 Mail</h2>
                <div class="info-box warning">
                    <div class="info-box-title">Error</div>
                    <p>Could not load mail. Please try again.</p>
                </div>
            </div>
        `;
    }
}

function getMailIcon(mailType, isRead) {
    const icons = {
        'god_claiming': '🏛️',
        'cabin_invite': '🏕️',
        'system': '⚙️',
        'reward': '🎁',
        'daily_reward': '🎁',
        'shop_order': '🛒',
        'delivery_request': '📦',
        'delivery_complete': '✅',
        'event': '🏆',
        'quest_complete': '📜',
        'personal': isRead ? '📭' : '📬'
    };
    return icons[mailType] || (isRead ? '📭' : '📬');
}

function formatMailType(type) {
    const types = {
        'god_claiming': 'Divine',
        'cabin_invite': 'Cabin',
        'system': 'System',
        'reward': 'Reward',
        'daily_reward': 'Daily',
        'shop_order': 'Shop',
        'delivery_request': 'Delivery',
        'delivery_complete': 'Delivery',
        'event': 'Event',
        'quest_complete': 'Quest',
        'personal': 'Personal'
    };
    return types[type] || type || 'Message';
}

function formatDate(dateStr) {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString();
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function openMailModal(mailId) {
    try {
        // Mark as read
        await fetch(`${API_BASE}/api/mail/${mailId}/read`, { method: 'POST' });
        
        // Fetch full mail content
        const response = await fetch(`${API_BASE}/api/mail/${mailId}`);
        const result = await response.json();
        
        if (!result.success || !result.data) {
            alert('Could not load mail');
            return;
        }
        
        const mail = result.data;
        
        // Update UI to show as read
        const mailItem = document.querySelector(`.mail-item[data-mail-id="${mailId}"]`);
        if (mailItem) {
            mailItem.classList.remove('unread');
            mailItem.querySelector('.mail-icon').textContent = getMailIcon(mail.mail_type, true);
        }
        
        // Update unread count
        refreshPlayerData();
        
        // Create modal
        const existingModal = document.getElementById('mail-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.id = 'mail-modal';
        modal.className = 'mail-modal';
        modal.innerHTML = `
            <div class="mail-modal-content">
                <div class="mail-modal-header">
                    <div>
                        <h2 class="mail-modal-title">${escapeHtml(mail.subject || 'No Subject')}</h2>
                        <div class="mail-modal-meta">
                            <span class="mail-type-badge ${mail.mail_type || 'personal'}">${formatMailType(mail.mail_type)}</span>
                            From: <strong>${escapeHtml(mail.sender_name || 'Unknown')}</strong> • ${formatDate(mail.created_at)}
                        </div>
                    </div>
                    <button class="mail-modal-close" onclick="closeMailModal()">×</button>
                </div>
                <div class="mail-modal-body">
                    <p>${escapeHtml(mail.content || 'No content')}</p>
                </div>
                <div class="mail-modal-footer">
                    ${mail.sender_id && mail.sender_id != 0 ? `
                        <button class="mail-btn" onclick="closeMailModal(); replyToMail('${escapeHtml(mail.sender_name || '')}')">
                            ↩️ Reply
                        </button>
                    ` : ''}
                    <button class="mail-btn danger" onclick="deleteMail(${mail.mail_id}); closeMailModal();">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeMailModal();
        });
        
    } catch (error) {
        console.error('Open mail failed:', error);
        alert('Error loading mail');
    }
}

function closeMailModal() {
    const modal = document.getElementById('mail-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

async function deleteMail(mailId) {
    if (!confirm('Delete this message?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/mail/${mailId}?username=${encodeURIComponent(currentSession.username)}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        
        if (result.success) {
            // Remove from UI
            const mailItem = document.querySelector(`.mail-item[data-mail-id="${mailId}"]`);
            if (mailItem) {
                mailItem.style.opacity = '0';
                mailItem.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    mailItem.remove();
                    // Check if list is now empty
                    const mailList = document.querySelector('.mail-list');
                    if (mailList && mailList.children.length === 0) {
                        loadMail(); // Reload to show empty state
                    }
                }, 300);
            }
            refreshPlayerData();
        } else {
            alert('Failed to delete: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Delete failed:', error);
        alert('Error deleting mail');
    }
}

async function deleteAllReadMail() {
    if (!confirm('Delete all read messages? This cannot be undone.')) return;
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/mail/read`, {
            method: 'DELETE'
        });
        const result = await response.json();
        
        if (result.success) {
            alert(`Deleted ${result.deleted} read message(s)`);
            loadMail();
        } else {
            alert('Failed to delete: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Delete all read failed:', error);
        alert('Error deleting mail');
    }
}

// Compose mail functionality
async function toggleComposeForm() {
    const container = document.getElementById('compose-container');
    
    if (container.innerHTML.trim()) {
        // Close form
        container.innerHTML = '';
        return;
    }
    
    // Load players if not cached
    if (!playersCache) {
        try {
            const response = await fetch(`${API_BASE}/api/players`);
            const result = await response.json();
            playersCache = result.success ? result.data : [];
        } catch (e) {
            console.error('Failed to load players:', e);
            playersCache = [];
        }
    }
    
    // Filter out self
    const otherPlayers = playersCache.filter(p => 
        p.username !== currentSession.username && 
        p.mc_username !== currentSession.username
    );
    
    container.innerHTML = `
        <div class="compose-form">
            <h3>✉️ Compose Message</h3>
            <div class="compose-row">
                <label>To:</label>
                <select id="compose-recipient">
                    <option value="">-- Select Recipient --</option>
                    ${otherPlayers.map(p => `
                        <option value="${escapeHtml(p.mc_username || p.username)}">
                            ${escapeHtml(p.username)} ${p.god_parent ? `(${p.god_parent})` : ''}
                            ${p.mc_username ? ` - MC: ${p.mc_username}` : ''}
                        </option>
                    `).join('')}
                </select>
            </div>
            <div class="compose-row">
                <label>Subject:</label>
                <input type="text" id="compose-subject" placeholder="Message subject..." maxlength="100">
            </div>
            <div class="compose-row">
                <label>Message:</label>
                <textarea id="compose-content" placeholder="Write your message here..." maxlength="2000"></textarea>
            </div>
            <div class="compose-actions">
                <button class="mail-btn" onclick="toggleComposeForm()">Cancel</button>
                <button class="mail-btn primary" onclick="sendMail()">📤 Send</button>
            </div>
        </div>
    `;
    
    // Focus recipient dropdown
    document.getElementById('compose-recipient').focus();
}

function replyToMail(senderName) {
    toggleComposeForm();
    
    // Wait for form to render then set recipient
    setTimeout(() => {
        const recipientSelect = document.getElementById('compose-recipient');
        if (recipientSelect) {
            // Try to find and select the sender
            for (let option of recipientSelect.options) {
                if (option.value === senderName || option.text.includes(senderName)) {
                    option.selected = true;
                    break;
                }
            }
            document.getElementById('compose-subject').focus();
        }
    }, 100);
}

async function sendMail() {
    const recipient = document.getElementById('compose-recipient').value;
    const subject = document.getElementById('compose-subject').value.trim();
    const content = document.getElementById('compose-content').value.trim();
    
    if (!recipient) {
        alert('Please select a recipient');
        return;
    }
    if (!subject) {
        alert('Please enter a subject');
        return;
    }
    if (!content) {
        alert('Please enter a message');
        return;
    }
    
    const sendBtn = document.querySelector('.compose-actions .mail-btn.primary');
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/mail/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipientUsername: recipient,
                subject: subject,
                content: content
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Message sent successfully!');
            toggleComposeForm(); // Close form
        } else {
            alert('Failed to send: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Send mail failed:', error);
        alert('Error sending mail. Please try again.');
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = '📤 Send';
    }
}

// ══════════════════════════════════════════════════════════════════════════
// INVENTORY SYSTEM
// ══════════════════════════════════════════════════════════════════════════

async function loadInventory() {
    if (!currentSession?.username) return;
    
    const invPanel = document.getElementById('panel-inventory');
    
    if (!document.getElementById('inv-styles')) {
        const style = document.createElement('style');
        style.id = 'inv-styles';
        style.textContent = `
            .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
            .inventory-item { background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; padding: 1rem; text-align: center; transition: all 0.3s ease; }
            .inventory-item:hover { border-color: var(--gold); transform: translateY(-2px); }
            .item-name { font-family: 'Cinzel', serif; color: var(--gold); margin-bottom: 0.5rem; }
            .item-qty { color: var(--marble-dark); font-size: 0.9rem; }
            .item-tag { background: rgba(79,195,247,0.2); color: var(--lightning); padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.75rem; margin-top: 0.5rem; display: inline-block; }
        `;
        document.head.appendChild(style);
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/inventory`);
        const result = await response.json();
        
        if (result.success && result.data && result.data.length > 0) {
            invPanel.innerHTML = `
                <div class="doc-section">
                    <h2>🎒 Your Inventory (${result.data.length} items)</h2>
                    <div class="inventory-grid">
                        ${result.data.map(item => `
                            <div class="inventory-item">
                                <div class="item-name">${escapeHtml(item.item_name || item.name || 'Unknown Item')}</div>
                                <div class="item-qty">x${item.quantity || 1}</div>
                                ${item.is_redeemable ? '<div class="item-tag">Redeemable</div>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            invPanel.innerHTML = `
                <div class="doc-section">
                    <h2>🎒 Your Inventory</h2>
                    <div class="info-box tip">
                        <div class="info-box-title">Empty Inventory</div>
                        <p>You don't have any items yet! Win games, complete quests, or visit shops to get items.</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Inventory load failed:', error);
        invPanel.innerHTML = `
            <div class="doc-section">
                <h2>🎒 Inventory</h2>
                <div class="info-box warning">
                    <div class="info-box-title">Error</div>
                    <p>Could not load inventory. Please try again.</p>
                </div>
            </div>
        `;
    }
}

// ══════════════════════════════════════════════════════════════════════════
// CHARACTER SHEETS
// ══════════════════════════════════════════════════════════════════════════

async function loadPublicCharacters() {
    try {
        const response = await fetch(`${API_BASE}/api/characters`);
        const result = await response.json();
        
        const sidebar = document.getElementById('character-sidebar');
        if (!sidebar) return;
        
        if (result.success && result.data && result.data.length > 0) {
            sidebar.innerHTML = `
                <h3>Community Characters</h3>
                <div class="character-list">
                    ${result.data.map(char => `
                        <div class="char-list-item" onclick="viewPublicCharacter(${char.id})">
                            <div class="char-avatar">
                                ${char.image_url_1 ? 
                                    `<img src="${char.image_url_1}" alt="${escapeHtml(char.char_name)}">` : 
                                    `<span>👤</span>`
                                }
                            </div>
                            <div class="char-info">
                                <div class="char-list-name">${escapeHtml(char.char_name || 'Unknown')}</div>
                                <div class="char-list-god">${char.god_parent ? `Child of ${char.god_parent}` : 'Unclaimed'}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            sidebar.innerHTML = `
                <h3>Community Characters</h3>
                <p class="no-chars">No public character sheets yet. Be the first!</p>
            `;
        }
    } catch (error) {
        console.error('Failed to load public characters:', error);
    }
}

async function viewPublicCharacter(id) {
    try {
        const response = await fetch(`${API_BASE}/api/character/${id}`);
        const result = await response.json();
        
        if (result.success && result.data) {
            showCharacterModal(result.data);
        } else {
            alert('Could not load character sheet');
        }
    } catch (error) {
        console.error('Failed to view character:', error);
        alert('Error loading character sheet');
    }
}

function formatTextForDisplay(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>')
        .replace(/  /g, '&nbsp;&nbsp;')
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
}

function showCharacterModal(data) {
    const existingModal = document.getElementById('char-modal');
    if (existingModal) existingModal.remove();
    
    const images = [data.image_url_1, data.image_url_2, data.image_url_3].filter(Boolean);
    
    const modal = document.createElement('div');
    modal.id = 'char-modal';
    modal.className = 'char-modal';
    modal.innerHTML = `
        <div class="char-modal-content">
            <button class="modal-close" onclick="closeCharacterModal()">×</button>
            <div class="modal-header">
                <h2>${escapeHtml(data.char_name || 'Unknown Character')}</h2>
                <p class="modal-subtitle">${data.god_parent ? `Child of ${data.god_parent}` : 'Unclaimed'}</p>
            </div>
            
            ${images.length > 0 ? `
                <div class="modal-images">
                    ${images.map((img, i) => `
                        <div class="modal-image-container">
                            <img src="${img}" alt="Character image ${i + 1}" onclick="expandImage('${img}')">
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            <div class="modal-grid">
                <div class="modal-section">
                    <h3>Basic Info</h3>
                    <p><strong>Age:</strong> ${escapeHtml(data.age) || 'Unknown'}</p>
                    <p><strong>Gender:</strong> ${escapeHtml(data.gender) || 'Unknown'}</p>
                    <p><strong>Pronouns:</strong> ${escapeHtml(data.pronouns) || 'Unknown'}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Combat</h3>
                    <p><strong>Weapon:</strong> ${escapeHtml(data.weapon) || 'None'}</p>
                    <p><strong>Fighting Style:</strong> ${escapeHtml(data.fighting_style) || 'Unknown'}</p>
                    ${data.abilities ? `<p><strong>Abilities:</strong> ${formatTextForDisplay(data.abilities)}</p>` : ''}
                </div>
            </div>
            
            ${data.personality ? `
                <div class="modal-section full">
                    <h3>Personality</h3>
                    <p class="preserve-formatting">${formatTextForDisplay(data.personality)}</p>
                </div>
            ` : ''}
            
            <div class="modal-grid">
                ${data.likes ? `
                    <div class="modal-section">
                        <h3>Likes</h3>
                        <p class="preserve-formatting">${formatTextForDisplay(data.likes)}</p>
                    </div>
                ` : ''}
                ${data.dislikes ? `
                    <div class="modal-section">
                        <h3>Dislikes</h3>
                        <p class="preserve-formatting">${formatTextForDisplay(data.dislikes)}</p>
                    </div>
                ` : ''}
            </div>
            
            ${data.backstory ? `
                <div class="modal-section full">
                    <h3>Backstory</h3>
                    <p class="preserve-formatting">${formatTextForDisplay(data.backstory)}</p>
                </div>
            ` : ''}
            
            <div class="modal-grid">
                ${data.goals ? `
                    <div class="modal-section">
                        <h3>Goals</h3>
                        <p class="preserve-formatting">${formatTextForDisplay(data.goals)}</p>
                    </div>
                ` : ''}
                ${data.fears ? `
                    <div class="modal-section">
                        <h3>Fears</h3>
                        <p class="preserve-formatting">${formatTextForDisplay(data.fears)}</p>
                    </div>
                ` : ''}
            </div>
            
            <div class="modal-footer">
                <small>Player: ${escapeHtml(data.mc_username) || 'Unknown'}</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCharacterModal();
    });
}

function closeCharacterModal() {
    const modal = document.getElementById('char-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function expandImage(src) {
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
        <img src="${src}" alt="Expanded image">
        <button onclick="this.parentElement.remove()">×</button>
    `;
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) viewer.remove();
    });
    document.body.appendChild(viewer);
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
            
            if (data.image_url_1) {
                document.getElementById('char-image-preview-1').innerHTML = `<img src="${data.image_url_1}" alt="Character 1">`;
            }
            if (data.image_url_2) {
                document.getElementById('char-image-preview-2').innerHTML = `<img src="${data.image_url_2}" alt="Character 2">`;
            }
            if (data.image_url_3) {
                document.getElementById('char-image-preview-3').innerHTML = `<img src="${data.image_url_3}" alt="Character 3">`;
            }
            
            const publicCheckbox = document.getElementById('char-public');
            if (publicCheckbox) {
                publicCheckbox.checked = data.is_public !== 0;
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
    
    const getImageSrc = (previewId) => {
        const img = document.querySelector(`#${previewId} img`);
        return img ? img.src : null;
    };
    
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
        image1: getImageSrc('char-image-preview-1'),
        image2: getImageSrc('char-image-preview-2'),
        image3: getImageSrc('char-image-preview-3'),
        isPublic: document.getElementById('char-public')?.checked !== false
    };
    
    const checkImageSize = (img, name) => {
        if (img && img.length > 500000) {
            alert(`${name} is too large! Please use a smaller image or an image URL instead.`);
            return false;
        }
        return true;
    };
    
    if (!checkImageSize(data.image1, 'Image 1') ||
        !checkImageSize(data.image2, 'Image 2') ||
        !checkImageSize(data.image3, 'Image 3')) {
        return;
    }
    
    const saveBtn = document.querySelector('.save-char-btn');
    if (saveBtn) {
        saveBtn.textContent = 'Saving...';
        saveBtn.disabled = true;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/player/${encodeURIComponent(currentSession.username)}/character`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Character sheet saved!');
            loadPublicCharacters();
        } else {
            alert('Save failed: ' + (result.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Save failed:', error);
        alert('Connection error. Please try again.');
    } finally {
        if (saveBtn) {
            saveBtn.textContent = 'Save Character Sheet';
            saveBtn.disabled = false;
        }
    }
}

function previewImage(event, previewId) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 500 * 1024) {
        alert('Image is too large! Please use an image under 500KB, or paste an image URL instead.');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById(previewId).innerHTML = `<img src="${e.target.result}" alt="Character">`;
    };
    reader.readAsDataURL(file);
}

function setImageUrl(inputId, previewId) {
    const url = document.getElementById(inputId).value.trim();
    if (url) {
        document.getElementById(previewId).innerHTML = `<img src="${url}" alt="Character" onerror="this.parentElement.innerHTML='<span class=\\'placeholder\\'>Invalid URL</span>'">`;
    }
}

function removeImage(previewId) {
    document.getElementById(previewId).innerHTML = '<span class="placeholder">No image</span>';
}

function logoutPortal() {
    currentSession = null;
    playersCache = null;
    localStorage.removeItem('chb_session');
    document.getElementById('portal-login').style.display = 'block';
    document.getElementById('portal-dashboard').classList.remove('active');
    showLoginOptions();
    document.getElementById('mc-username').value = '';
    
    ['char-name', 'char-age', 'char-gender', 'char-pronouns', 'char-personality', 
     'char-likes', 'char-dislikes', 'char-backstory', 'char-weapon', 'char-style',
     'char-abilities', 'char-goals', 'char-fears'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    
    ['char-image-preview-1', 'char-image-preview-2', 'char-image-preview-3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<span class="placeholder">No image</span>';
    });
    
    document.getElementById('panel-mail').innerHTML = '<div class="doc-section"><h2>📬 Mail</h2><p>Login to view your mail.</p></div>';
    document.getElementById('panel-inventory').innerHTML = '<div class="doc-section"><h2>🎒 Inventory</h2><p>Login to view your inventory.</p></div>';
}

function switchPortalTab(tabId) {
    document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.portal-panel').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('panel-' + tabId).classList.add('active');
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const ANNOUNCEMENTS_CONFIG = {
    admins: [
        { visibleDiscordId: '667478723213262848', visibleMcUsername: 'ussdylan' },
        { visibleDiscordId: '788852381726015489', visibleMcUsername: 'lizzzerd' }
    ],
    discordWebhook: null,
    discordChannelId: '1454707501282103427',
    apiBase: '/api',
    postsPerPage: 10,
    serverIP: '169.155.120.58:26960'
};

let announcementsState = {
    currentUser: null,
    isAdmin: false,
    announcements: [],
    pinnedAnnouncements: [],
    files: [],
    currentPage: 1,
    totalPages: 1,
    currentFilter: 'all'
};

async function initAnnouncementsPage() {
    console.log('[Announcements] Initializing...');
    checkAdminStatus();
    await Promise.all([loadAnnouncements(), loadFiles()]);
    setupAnnouncementEventListeners();
    const serverIpEl = document.getElementById('server-ip-display');
    if (serverIpEl) serverIpEl.textContent = ANNOUNCEMENTS_CONFIG.serverIP;
    console.log('[Announcements] Initialized, isAdmin:', announcementsState.isAdmin);
}

function checkAdminStatus() {
    const saved = localStorage.getItem('chb_session');
    if (saved) {
        try {
            const session = JSON.parse(saved);
            announcementsState.currentUser = session;
            const mcUsername = (session.username || '').toLowerCase();
            const discordId = session.visibleDiscordId || '';
            const isAdmin = ANNOUNCEMENTS_CONFIG.admins.some(admin => 
                admin.visibleMcUsername.toLowerCase() === mcUsername || admin.visibleDiscordId === discordId
            );
            announcementsState.isAdmin = isAdmin;
            if (isAdmin) { console.log('[Announcements] Admin detected:', mcUsername); showAdminPanel(); }
        } catch(e) { console.error('[Announcements] Session parse error:', e); }
    }
}

function showAdminPanel() {
    const adminPanel = document.getElementById('admin-controls');
    if (adminPanel) { adminPanel.style.display = 'block'; document.body.classList.add('admin-view'); }
    loadManageLists();
}

function setupAnnouncementEventListeners() {
    document.querySelectorAll('.admin-tab').forEach(tab => tab.addEventListener('click', () => switchAdminTab(tab.dataset.tab)));
    document.querySelectorAll('.filter-tab').forEach(tab => tab.addEventListener('click', () => filterDownloads(tab.dataset.filter)));
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.tab === tabId));
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.toggle('active', content.id === `tab-${tabId}`));
}

async function loadAnnouncements() {
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/announcements`);
        if (response.ok) {
            const data = await response.json();
            announcementsState.announcements = data.announcements || [];
            announcementsState.pinnedAnnouncements = announcementsState.announcements.filter(a => a.is_pinned);
        } else {
            announcementsState.announcements = getDemoAnnouncements();
            announcementsState.pinnedAnnouncements = announcementsState.announcements.filter(a => a.is_pinned);
        }
    } catch (error) {
        console.error('[Announcements] Failed to load:', error);
        announcementsState.announcements = getDemoAnnouncements();
        announcementsState.pinnedAnnouncements = announcementsState.announcements.filter(a => a.is_pinned);
    }
    renderPinnedAnnouncements();
    renderAnnouncementsFeed();
}

function getDemoAnnouncements() {
    return [
        { id: 1, title: 'Welcome to Camp Half-Blood!', content: 'We\'re excited to launch our new announcements system!', notes: 'Server IP: play.camphalfblood.net', author: 'lizzzerd', author_avatar: '⚡', created_at: new Date().toISOString(), is_pinned: true },
        { id: 2, title: 'Resource Pack Update v2.1', content: 'We\'ve updated the resource pack with new custom armor textures and improved god effects!', notes: null, author: 'ussdylan', author_avatar: '🔱', created_at: new Date(Date.now() - 86400000).toISOString(), is_pinned: false }
    ];
}

function renderPinnedAnnouncements() {
    const container = document.getElementById('pinned-grid');
    const section = document.getElementById('pinned-section');
    if (!container || !section) return;
    const pinned = announcementsState.pinnedAnnouncements.slice(0, 4);
    if (pinned.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    container.innerHTML = pinned.map(ann => `
        <div class="pinned-card" data-id="${ann.id}">
            <div class="pinned-card-title">${escapeHtml(ann.title)}</div>
            <div class="pinned-card-content">${truncateText(ann.content, 120)}</div>
            <div class="pinned-card-meta">
                <div class="pinned-card-author"><span>${ann.author_avatar || '👤'}</span><span>${escapeHtml(ann.author)}</span></div>
                <span>${formatDate(ann.created_at)}</span>
            </div>
        </div>
    `).join('');
}

function renderAnnouncementsFeed() {
    const container = document.getElementById('feed-container');
    if (!container) return;
    const feedAnnouncements = announcementsState.announcements;
    const startIndex = (announcementsState.currentPage - 1) * ANNOUNCEMENTS_CONFIG.postsPerPage;
    const endIndex = startIndex + ANNOUNCEMENTS_CONFIG.postsPerPage;
    const pageAnnouncements = feedAnnouncements.slice(startIndex, endIndex);
    announcementsState.totalPages = Math.ceil(feedAnnouncements.length / ANNOUNCEMENTS_CONFIG.postsPerPage);
    
    if (pageAnnouncements.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📢</div><div class="empty-state-text">No announcements yet. Check back later!</div></div>`;
        return;
    }
    
    container.innerHTML = pageAnnouncements.map(ann => `
        <div class="announcement-card ${ann.is_pinned ? 'pinned' : ''}" data-id="${ann.id}">
            <div class="announcement-header">
                <div class="announcement-header-left">
                    <div class="announcement-avatar">${ann.author_avatar || '👤'}</div>
                    <div class="announcement-meta"><div class="announcement-author">${escapeHtml(ann.author)}</div><div class="announcement-date">${formatDate(ann.created_at)}</div></div>
                </div>
                <div class="announcement-badges">
                    ${ann.is_pinned ? '<span class="badge pinned">📌 Pinned</span>' : ''}
                    ${isNewAnnouncement(ann.created_at) ? '<span class="badge new">New</span>' : ''}
                </div>
            </div>
            <div class="announcement-content">
                <div class="announcement-title">${escapeHtml(ann.title)}</div>
                <div class="announcement-body">${formatAnnouncementContent(ann.content)}</div>
                ${ann.notes ? `<div class="announcement-notes"><div class="announcement-notes-label">📝 Additional Notes</div><div class="announcement-notes-content">${formatAnnouncementContent(ann.notes)}</div></div>` : ''}
            </div>
            <div class="announcement-footer">
                <div class="announcement-id">#${ann.id}</div>
                <div class="announcement-actions">
                    ${announcementsState.isAdmin ? `
                        <button class="action-btn admin-only" onclick="togglePin(${ann.id})">${ann.is_pinned ? '📌 Unpin' : '📌 Pin'}</button>
                        <button class="action-btn admin-only delete" onclick="deleteAnnouncement(${ann.id})">🗑️ Delete</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    renderPagination();
}

function renderPagination() {
    const container = document.getElementById('feed-pagination');
    if (!container) return;
    if (announcementsState.totalPages <= 1) { container.innerHTML = ''; return; }
    let html = `<button class="page-btn" onclick="changePage(${announcementsState.currentPage - 1})" ${announcementsState.currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;
    for (let i = 1; i <= announcementsState.totalPages; i++) {
        if (i === 1 || i === announcementsState.totalPages || (i >= announcementsState.currentPage - 1 && i <= announcementsState.currentPage + 1)) {
            html += `<button class="page-btn ${i === announcementsState.currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        } else if (i === announcementsState.currentPage - 2 || i === announcementsState.currentPage + 2) {
            html += '<span class="page-ellipsis">...</span>';
        }
    }
    html += `<button class="page-btn" onclick="changePage(${announcementsState.currentPage + 1})" ${announcementsState.currentPage === announcementsState.totalPages ? 'disabled' : ''}>Next →</button>`;
    container.innerHTML = html;
}

function changePage(page) {
    if (page < 1 || page > announcementsState.totalPages) return;
    announcementsState.currentPage = page;
    renderAnnouncementsFeed();
    document.getElementById('feed-container').scrollIntoView({ behavior: 'smooth' });
}

function sortFeed(order) {
    if (order === 'oldest') announcementsState.announcements.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else announcementsState.announcements.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    announcementsState.currentPage = 1;
    renderAnnouncementsFeed();
}

async function postAnnouncement() {
    if (!announcementsState.isAdmin) { showToast('error', 'You do not have permission to post announcements.'); return; }
    const title = document.getElementById('announce-title').value.trim();
    const content = document.getElementById('announce-content').value.trim();
    const notes = document.getElementById('announce-notes').value.trim();
    const isPinned = document.getElementById('announce-pin').checked;
    const postToDiscord = document.getElementById('announce-discord').checked;
    if (!title || !content) { showToast('error', 'Please fill in the title and content.'); return; }
    if (isPinned && announcementsState.pinnedAnnouncements.length >= 4) { showToast('error', 'Maximum 4 pinned announcements. Please unpin one first.'); return; }
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/announcements`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, notes: notes || null, is_pinned: isPinned, post_to_discord: postToDiscord, username: announcementsState.currentUser?.username || 'Admin' })
        });
        if (response.ok) {
            showToast('success', 'Announcement posted successfully!');
            document.getElementById('announce-title').value = ''; document.getElementById('announce-content').value = ''; document.getElementById('announce-notes').value = ''; document.getElementById('announce-pin').checked = false;
            await loadAnnouncements(); loadManageLists();
        } else { const error = await response.json(); showToast('error', error.message || 'Failed to post announcement.'); }
    } catch (error) { console.error('[Announcements] Post error:', error); showToast('error', 'Failed to post announcement. Please try again.'); }
}

async function togglePin(id) {
    if (!announcementsState.isAdmin) return;
    const announcement = announcementsState.announcements.find(a => a.id === id);
    if (!announcement) return;
    if (!announcement.is_pinned && announcementsState.pinnedAnnouncements.length >= 4) { showToast('error', 'Maximum 4 pinned announcements. Please unpin one first.'); return; }
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/announcements/${id}/pin`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_pinned: !announcement.is_pinned, username: announcementsState.currentUser?.username })
        });
        if (response.ok) { showToast('success', announcement.is_pinned ? 'Announcement unpinned.' : 'Announcement pinned!'); await loadAnnouncements(); loadManageLists(); }
    } catch (error) { showToast('error', 'Failed to update pin status.'); }
}

async function deleteAnnouncement(id) {
    if (!announcementsState.isAdmin) return;
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
        const username = announcementsState.currentUser?.username;
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/announcements/${id}?username=${encodeURIComponent(username)}`, { method: 'DELETE' });
        if (response.ok) { showToast('success', 'Announcement deleted.'); await loadAnnouncements(); loadManageLists(); }
        else { const error = await response.json(); showToast('error', error.error || 'Failed to delete announcement.'); }
    } catch (error) { showToast('error', 'Failed to delete announcement.'); }
}

async function loadFiles() {
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/files`);
        if (response.ok) { const data = await response.json(); announcementsState.files = data.files || []; }
        else { announcementsState.files = getDemoFiles(); }
    } catch (error) { console.error('[Announcements] Failed to load files:', error); announcementsState.files = getDemoFiles(); }
    renderFiles();
}

function getDemoFiles() {
    return [
        { id: 1, title: 'Camp Half-Blood Resource Pack v2.1', category: 'resourcepack', description: 'Custom textures for armor, items, and god effects.', url: '#', size: '45 MB', created_at: new Date().toISOString() },
        { id: 2, title: 'CHB Modpack (CurseForge)', category: 'modpack', description: 'Complete modpack for the Camp Half-Blood server.', url: '#', size: '250 MB', created_at: new Date().toISOString() }
    ];
}

function renderFiles() {
    const container = document.getElementById('downloads-grid');
    if (!container) return;
    let files = announcementsState.files;
    if (announcementsState.currentFilter !== 'all') files = files.filter(f => f.category === announcementsState.currentFilter);
    if (files.length === 0) { container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📁</div><div class="empty-state-text">No files available in this category.</div></div>`; return; }
    const categoryIcons = { resourcepack: '🎨', modpack: '📦', guide: '📖', other: '📁' };
    const categoryLabels = { resourcepack: 'Resource Pack', modpack: 'Modpack', guide: 'Guide', other: 'Other' };
    container.innerHTML = files.map(file => `
        <div class="download-card" data-id="${file.id}" data-category="${file.category}">
            <div class="download-card-header">
                <div class="download-icon">${categoryIcons[file.category] || '📁'}</div>
                <div class="download-info"><div class="download-title">${escapeHtml(file.title)}</div><span class="download-category ${file.category}">${categoryLabels[file.category] || 'File'}</span></div>
            </div>
            <div class="download-description">${escapeHtml(file.description || 'No description provided.')}</div>
            <div class="download-footer">
                <div class="download-meta">${file.size ? `<span>📦 ${file.size}</span>` : ''}<span>📅 ${formatDate(file.created_at)}</span></div>
                <a href="${file.url}" target="_blank" class="download-btn" rel="noopener noreferrer"><span>📥</span> Download</a>
            </div>
        </div>
    `).join('');
}

function filterDownloads(filter) {
    announcementsState.currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.filter === filter));
    renderFiles();
}

async function uploadFile() {
    if (!announcementsState.isAdmin) { showToast('error', 'You do not have permission to upload files.'); return; }
    const title = document.getElementById('file-title').value.trim();
    const category = document.getElementById('file-category').value;
    const description = document.getElementById('file-description').value.trim();
    const url = document.getElementById('file-url').value.trim();
    const size = document.getElementById('file-size').value.trim();
    if (!title || !url) { showToast('error', 'Please fill in the file name and URL.'); return; }
    try { new URL(url); } catch { showToast('error', 'Please enter a valid URL.'); return; }
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/files`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, category, description: description || null, url, size: size || null, username: announcementsState.currentUser?.username })
        });
        if (response.ok) {
            showToast('success', 'File added successfully!');
            document.getElementById('file-title').value = ''; document.getElementById('file-description').value = ''; document.getElementById('file-url').value = ''; document.getElementById('file-size').value = '';
            await loadFiles(); loadManageLists();
        } else { const error = await response.json(); showToast('error', error.message || 'Failed to add file.'); }
    } catch (error) { console.error('[Announcements] Upload error:', error); showToast('error', 'Failed to add file. Please try again.'); }
}

async function deleteFile(id) {
    if (!announcementsState.isAdmin) return;
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
        const response = await fetch(`${ANNOUNCEMENTS_CONFIG.apiBase}/files/${id}`, { method: 'DELETE' });
        if (response.ok) { showToast('success', 'File deleted.'); await loadFiles(); loadManageLists(); }
    } catch (error) { showToast('error', 'Failed to delete file.'); }
}

function loadManageLists() { renderPinnedManageList(); renderFilesManageList(); }

function renderPinnedManageList() {
    const container = document.getElementById('pinned-manage-list');
    if (!container) return;
    const pinned = announcementsState.pinnedAnnouncements;
    if (pinned.length === 0) { container.innerHTML = '<div class="manage-item"><span class="manage-item-title" style="color: var(--text-muted);">No pinned announcements</span></div>'; return; }
    container.innerHTML = pinned.map(ann => `
        <div class="manage-item">
            <div class="manage-item-info"><div class="manage-item-title">${escapeHtml(ann.title)}</div><div class="manage-item-meta">${formatDate(ann.created_at)}</div></div>
            <div class="manage-item-actions"><button class="manage-btn unpin" onclick="togglePin(${ann.id})" title="Unpin">📌</button><button class="manage-btn delete" onclick="deleteAnnouncement(${ann.id})" title="Delete">🗑️</button></div>
        </div>
    `).join('');
}

function renderFilesManageList() {
    const container = document.getElementById('files-manage-list');
    if (!container) return;
    if (announcementsState.files.length === 0) { container.innerHTML = '<div class="manage-item"><span class="manage-item-title" style="color: var(--text-muted);">No files uploaded</span></div>'; return; }
    container.innerHTML = announcementsState.files.map(file => `
        <div class="manage-item">
            <div class="manage-item-info"><div class="manage-item-title">${escapeHtml(file.title)}</div><div class="manage-item-meta">${file.category} • ${formatDate(file.created_at)}</div></div>
            <div class="manage-item-actions"><button class="manage-btn delete" onclick="deleteFile(${file.id})" title="Delete">🗑️</button></div>
        </div>
    `).join('');
}

function copyServerIP() {
    const ip = ANNOUNCEMENTS_CONFIG.serverIP;
    navigator.clipboard.writeText(ip).then(() => {
        const btn = document.querySelector('.copy-btn');
        if (btn) { btn.textContent = '✓'; btn.classList.add('copied'); showToast('success', 'Server IP copied!'); setTimeout(() => { btn.textContent = '📋'; btn.classList.remove('copied'); }, 2000); }
    });
}

function formatAnnouncementContent(text) {
    if (!text) return '';
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\n/g, '<br>');
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');
    formatted = formatted.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    return formatted;
}

function truncateText(text, maxLength) { if (!text || text.length <= maxLength) return escapeHtml(text); return escapeHtml(text.substring(0, maxLength)) + '...'; }
function isNewAnnouncement(dateString) { if (!dateString) return false; const date = new Date(dateString); const now = new Date(); return (now - date) / 3600000 < 48; }

function showToast(type, message) {
    let container = document.querySelector('.toast-container');
    if (!container) { container = document.createElement('div'); container.className = 'toast-container'; container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px;'; document.body.appendChild(container); }
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const colors = { success: 'rgba(34, 197, 94, 0.9)', error: 'rgba(239, 68, 68, 0.9)', info: 'rgba(59, 130, 246, 0.9)' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `display: flex; align-items: center; gap: 10px; padding: 12px 20px; background: ${colors[type]}; color: white; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); animation: slideIn 0.3s ease;`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${escapeHtml(message)}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;cursor:pointer;font-size:18px;margin-left:10px;">×</button>`;
    container.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) { toast.style.animation = 'slideIn 0.3s ease reverse'; setTimeout(() => toast.remove(), 300); } }, 5000);
}

if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style'); style.id = 'toast-styles';
    style.textContent = `@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`;
    document.head.appendChild(style);
}

window.initAnnouncementsPage = initAnnouncementsPage;

// ═══════════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    createStarfield();
    createParticles();
    setupScrollReveal();
    window.addEventListener('scroll', handleNavVisibility);
    
    if (!document.getElementById('char-format-styles')) {
        const style = document.createElement('style');
        style.id = 'char-format-styles';
        style.textContent = `.preserve-formatting { white-space: pre-wrap; word-wrap: break-word; } .char-sheet textarea { white-space: pre-wrap; }`;
        document.head.appendChild(style);
    }
    
    // Close mobile menu when clicking outside - NOT dropdowns!
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            mobileToggle && !mobileToggle.contains(e.target)) {
            closeMobile();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeCharacterModal(); closeMailModal(); }
    });

    fetch(`${API_BASE}/api/health`).then(r => r.json()).then(data => console.log('API status:', data.status, '| DB:', data.database)).catch(() => console.log('API offline, running static'));
});
