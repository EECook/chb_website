// Integrations — Cross-Platform Overview
(function() {

function render(mount) {

    var h = '<div class="disc-page">'

    // ── Hero ──
    + '<div class="disc-hero">'
    +   '<div class="disc-hero-glow"></div>'
    +   '<div class="disc-hero-content reveal">'
    +     '<div class="gs-ornament"><div class="ornament-line"></div><span>\u2726 YOUR WORLD, CONNECTED \u2726</span><div class="ornament-line"></div></div>'
    +     '<h1 class="disc-title">Integrations</h1>'
    +     '<p class="disc-subtitle">Camp Half-Blood lives across three platforms that talk to each other in real time. Everything you do stays in sync.</p>'
    +   '</div>'
    + '</div>'

    // ── Three Platforms ──
    + '<div class="disc-platforms reveal">'
    +   '<div class="disc-plat-grid">'
    +     platformCard('\u{1F4AC}', 'Discord', 'Command Center',
              'Your primary interface for camp life. Run commands, play minigames, manage your profile, chat with other campers, and interact with the bot.',
              ['commands', 'minigames', 'economy', 'mail', 'arena'],
              'rgba(88,101,242,0.06)', 'rgba(88,101,242,0.3)')
    +     platformCard('\u{1F310}', 'Website', 'Portal & Archive',
              'View your character sheet, read camp lore, take the claiming quiz, check leaderboards, browse the mod catalog, and manage your profile visually.',
              ['portal', 'quiz', 'lore', 'leaderboard', 'timeline'],
              'rgba(212,175,55,0.06)', 'rgba(212,175,55,0.3)')
    +     platformCard('\u26CF\uFE0F', 'Minecraft', 'The Living World',
              'Where it all comes to life. Build, fight, explore, and quest with your godly powers, skill tree effects, and shrine buffs active in real time.',
              ['god effects', 'skills', 'shrines', 'quests', 'origins'],
              'rgba(74,222,128,0.06)', 'rgba(74,222,128,0.3)')
    +   '</div>'
    + '</div>'

    // ── What Syncs Where ──
    + '<div class="disc-sync reveal">'
    +   '<div class="disc-sync-inner">'
    +     '<h2 class="disc-section-heading">What Syncs Where</h2>'
    +     '<p class="disc-section-sub">One action can ripple across all three platforms</p>'
    +     '<div class="disc-sync-flow">'
    +       syncRow('\u{1F52E}', 'God Claiming', 'Take the quiz in <strong>Discord</strong> or the <strong>Website</strong>. Your god parent, potion effect, and nametag color appear in <strong>Minecraft</strong> automatically.')
    +       syncRow('\u{1F4B0}', 'Drachma', 'Earn currency through <strong>Discord</strong> minigames and events. Spend it at shops that deliver items directly to your <strong>Minecraft</strong> inventory.')
    +       syncRow('\u{1F4CA}', 'Skill Trees', 'Invest skill points in <strong>Discord</strong>. Your chosen branches grant real potion effects, attribute boosts, and abilities in <strong>Minecraft</strong>.')
    +       syncRow('\u{1F3DB}\uFE0F', 'Shrines', 'Build and fuel shrines in <strong>Minecraft</strong>. Register them via <strong>Discord</strong>. Cabin-wide buffs activate for nearby members in-game.')
    +       syncRow('\u{1F464}', 'Profiles', 'Your stats, level, cabin, and achievements are viewable on all three \u2014 <strong>Discord</strong> commands, the <strong>Website</strong> portal, and in-game.')
    +       syncRow('\u{1F4EC}', 'Mail & Events', 'Receive divine letters in <strong>Discord</strong>. Read them on the <strong>Website</strong>. Server events coordinate across all platforms.')
    +     '</div>'
    +   '</div>'
    + '</div>'

    // ── Feature Highlights ──
    + '<div class="disc-highlights reveal">'
    +   '<h2 class="disc-section-heading">What You Can Do</h2>'
    +   '<p class="disc-section-sub">A taste of what\u2019s available \u2014 each feature has its own guide in the Integrations section</p>'
    +   '<div class="disc-hl-grid">'
    +     hlCard('\u{1F52E}', 'Claiming Quiz', 'Discover your godly parent through a personality quiz. Your result shapes your whole camp experience.', ['discord', 'website', 'minecraft'])
    +     hlCard('\u2694\uFE0F', 'Arena Battles', 'Challenge other demigods to PvE waves, boss fights, and ranked duels. Place bets with drachma.', ['discord'])
    +     hlCard('\u{1F3AE}', 'Minigames', 'Earn drachma through a rotating set of camp activities, reflex challenges, and gambling games.', ['discord'])
    +     hlCard('\u{1F6D2}', 'Shop & Delivery', 'Spend drachma on Minecraft items, blessings, and permits. Items deliver straight to your inventory.', ['discord', 'minecraft'])
    +     hlCard('\u{1F4CA}', 'Skill Trees', 'Choose a major and minor skill branch. Each tier grants real Minecraft attribute boosts and effects.', ['discord', 'minecraft'])
    +     hlCard('\u{1F3DB}\uFE0F', 'Cabin Shrines', 'Build a shrine to your god in Minecraft. Fuel it with offerings for cabin-wide combat and utility buffs.', ['discord', 'minecraft'])
    +     hlCard('\u{1F4DC}', 'Quests & Lore', 'Follow the server\u2019s unfolding narrative. Log timeline events and track your quest progress.', ['discord', 'website'])
    +     hlCard('\u{1F3C6}', 'Leaderboards', 'See who tops the camp in drachma, divine favor, arena wins, and more.', ['discord', 'website'])
    +     hlCard('\u{1F464}', 'Character Profiles', 'Full character sheets with backstory, stats, cabin affiliation, and a public camper gallery.', ['discord', 'website'])
    +   '</div>'
    + '</div>'

    // ── Getting Connected ──
    + '<div class="disc-connect reveal">'
    +   '<div class="disc-connect-inner">'
    +     '<div class="disc-connect-title">Getting Connected</div>'
    +     '<div class="disc-connect-steps">'
    +       connectStep('1', 'Join the <strong>Discord server</strong> \u2014 this is where everything starts.')
    +       connectStep('2', 'Link your Minecraft account with <code>!mclink YourUsername</code> to enable cross-platform sync.')
    +       connectStep('3', 'Log into the <strong>Website Portal</strong> using a one-time token from the bot to access your character sheet.')
    +     '</div>'
    +     '<div class="disc-connect-note">Once linked, everything stays in sync automatically. No extra setup needed.</div>'
    +   '</div>'
    + '</div>'

    // ── Closing ──
    + '<div class="disc-closing reveal">'
    +   '<div class="disc-closing-line"></div>'
    +   '<p class="disc-closing-text">For detailed guides on every feature, head to the <strong>Integrations</strong> nav section. For now, get linked and start exploring.</p>'
    +   '<div class="disc-closing-links">'
    +     '<a href="/info/new-players" class="cta-secondary" data-link>\u{1F31F} Getting Started</a>'
    +     '<a href="/info/gods" class="cta-secondary" data-link>\u{1F3DB}\uFE0F Gods</a>'
    +     '<a href="/portal/quiz" class="cta-secondary" data-link>\u{1F52E} Take the Quiz</a>'
    +     '<a href="/portal" class="cta-secondary" data-link>\u{1F300} Portal</a>'
    +   '</div>'
    + '</div>'

    + '</div>';

    mount.innerHTML = h;

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
// HTML BUILDERS
// ═══════════════════════════════════════════════════════════

function platformCard(icon, name, role, desc, features, glow, border) {
    var h = '<div class="disc-plat-card" style="--plat-glow:' + glow + ';--plat-border:' + border + '">'
        + '<div class="disc-plat-icon">' + icon + '</div>'
        + '<div class="disc-plat-name">' + esc(name) + '</div>'
        + '<div class="disc-plat-role">' + esc(role) + '</div>'
        + '<div class="disc-plat-desc">' + esc(desc) + '</div>'
        + '<div class="disc-plat-features">';
    features.forEach(function(f) { h += '<span class="disc-plat-feat">' + esc(f) + '</span>'; });
    h += '</div></div>';
    return h;
}

function syncRow(icon, label, text) {
    return '<div class="disc-sync-row">'
        + '<span class="disc-sync-icon">' + icon + '</span>'
        + '<span class="disc-sync-label">' + esc(label) + '</span>'
        + '<span class="disc-sync-arrow">\u2192</span>'
        + '<span class="disc-sync-text">' + text + '</span>'
        + '</div>';
}

function hlCard(icon, title, desc, platforms) {
    var h = '<div class="disc-hl-card">'
        + '<span class="disc-hl-icon">' + icon + '</span>'
        + '<div class="disc-hl-body">'
        +   '<div class="disc-hl-title">' + esc(title) + '</div>'
        +   '<div class="disc-hl-desc">' + esc(desc) + '</div>'
        +   '<div class="disc-hl-platforms">';
    platforms.forEach(function(p) { h += '<span class="disc-hl-plat ' + p + '">' + esc(p) + '</span>'; });
    h += '</div></div></div>';
    return h;
}

function connectStep(num, text) {
    return '<div class="disc-connect-step">'
        + '<span class="disc-connect-num">' + num + '</span>'
        + '<span class="disc-connect-text">' + text + '</span>'
        + '</div>';
}

function esc(s) { if (!s) return ''; var e = document.createElement('span'); e.textContent = s; return e.innerHTML; }

window.IntegrationsPage = render;
})();
