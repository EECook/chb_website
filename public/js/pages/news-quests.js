// quest tree page

(function() {

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="news-page">'
            +   '<div class="news-inner">'
            +     '<div class="news-header reveal">'
            +       '<h1 class="news-title">Quest Tree</h1>'
            +       '<p class="news-subtitle">Track your progress through the questlines of Camp Half-Blood</p>'
            +     '</div>'
            +     '<div id="quest-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Checking your quest log...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        checkAuth();
        Anim.initScrollReveal();

        return {
            cleanup: function() {
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function checkAuth() {
        var container = document.getElementById('quest-content');
        if (!container) return;

        fetch('/api/auth/me', { credentials: 'include' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (user) {
                    showQuestTree(container, user);
                } else {
                    showLoggedOut(container);
                }
            })
            .catch(function() {
                showLoggedOut(container);
            });
    }

    function showLoggedOut(container) {
        container.innerHTML = ''
            + '<div class="quest-overview reveal">'
            +   '<div class="quest-intro-card">'
            +     '<div class="qi-icon">\u{1F5FA}</div>'
            +     '<h2 class="qi-title">Your Journey Awaits</h2>'
            +     '<p class="qi-desc">Log in through the Portal to view your personal quest tree. '
            +       'Track completed questlines, see what\'s ahead, and discover hidden paths.</p>'
            +     '<a href="/portal" class="cta-primary" data-link style="margin-top:1.5rem"><span>\u{1F300} Log In via Portal</span></a>'
            +   '</div>'
            + '</div>'
            + '<div class="quest-preview reveal">'
            +   '<h3 class="qp-heading">Available Questlines</h3>'
            +   '<p class="qp-sub">These quest trees are available on the server. Log in to see your personal progress.</p>'
            +   '<div class="qp-grid">'
            +     buildQuestPreview('\u{2694}', 'Main Story', 'The core narrative of Camp Half-Blood. Follow the thread of the gods\' silence.', 'In Progress')
            +     buildQuestPreview('\u{1F3DB}', 'Camp Grounds', 'Explore every corner of camp. Meet NPCs, uncover secrets, find hidden areas.', 'Available')
            +     buildQuestPreview('\u{1F4A0}', 'Divine Trials', 'Challenges set by the gods themselves. Prove your worth to earn divine favor.', 'Available')
            +     buildQuestPreview('\u{1F3C6}', 'Tournaments', 'Team-based PvP events. Train your skills for glory and drachma.', 'Seasonal')
            +     buildQuestPreview('\u{1F48E}', 'Collector', 'Find rare artifacts, materials, and relics scattered across the world.', 'Available')
            +     buildQuestPreview('\u{2753}', 'Hidden', 'Some paths only reveal themselves to those paying close attention...', 'Locked')
            +   '</div>'
            + '</div>'
            + '<div class="story-back reveal"><a href="/news" class="view-all" data-link>\u2190 Back to Bulletin</a></div>';
    }

    function showQuestTree(container, user) {
        // when quest API exists this will pull /api/quests/:userId and render the real tree
        // for now show personalized placeholder

        var name = user.username || 'Demigod';

        container.innerHTML = ''
            + '<div class="quest-overview reveal">'
            +   '<div class="quest-player-card">'
            +     '<div class="qpc-greeting">Quest log for <strong style="color:var(--gold)">' + esc(name) + '</strong></div>'
            +     '<p class="qpc-note">Your personal quest tree will appear here once quest tracking is live. '
            +       'For now, keep progressing on the server -- your journey is being recorded.</p>'
            +   '</div>'
            + '</div>'
            + '<div class="quest-preview reveal">'
            +   '<h3 class="qp-heading">Available Questlines</h3>'
            +   '<div class="qp-grid">'
            +     buildQuestPreview('\u{2694}', 'Main Story', 'The core narrative of Camp Half-Blood. Follow the thread of the gods\' silence.', 'In Progress')
            +     buildQuestPreview('\u{1F3DB}', 'Camp Grounds', 'Explore every corner of camp. Meet NPCs, uncover secrets, find hidden areas.', 'Available')
            +     buildQuestPreview('\u{1F4A0}', 'Divine Trials', 'Challenges set by the gods themselves. Prove your worth to earn divine favor.', 'Available')
            +     buildQuestPreview('\u{1F3C6}', 'Tournaments', 'Team-based PvP events. Train your skills for glory and drachma.', 'Seasonal')
            +     buildQuestPreview('\u{1F48E}', 'Collector', 'Find rare artifacts, materials, and relics scattered across the world.', 'Available')
            +     buildQuestPreview('\u{2753}', 'Hidden', 'Some paths only reveal themselves to those paying close attention...', 'Locked')
            +   '</div>'
            + '</div>'
            + '<div class="story-back reveal"><a href="/news" class="view-all" data-link>\u2190 Back to Bulletin</a></div>';
    }

    function buildQuestPreview(icon, title, desc, status) {
        var statusClass = status.toLowerCase().replace(/\s/g, '-');
        return '<div class="qp-card">'
            + '<div class="qp-icon">' + icon + '</div>'
            + '<div class="qp-info">'
            +   '<div class="qp-title">' + title + '</div>'
            +   '<div class="qp-desc">' + desc + '</div>'
            + '</div>'
            + '<span class="qp-status ' + statusClass + '">' + status + '</span>'
            + '</div>';
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.QuestsPage = render;

})();
