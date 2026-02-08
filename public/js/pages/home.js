// home page

(function() {

    function render(mount) {
        mount.innerHTML = ''
            + '<section class="hero" id="hero">'
            +   '<div class="hero-sky"></div>'
            +   '<div class="hero-horizon"></div>'
            +   '<div class="hero-mist">'
            +     '<div class="mist-layer mist-1"></div>'
            +     '<div class="mist-layer mist-2"></div>'
            +     '<div class="mist-layer mist-3"></div>'
            +   '</div>'
            +   '<div class="hero-particles" id="particles"></div>'
            +   '<div class="hero-lightning" id="lightning"></div>'
            +   '<div class="hero-content">'
            +     '<div class="hero-ornament">'
            +       '<div class="ornament-line"></div>'
            +       '<span>\u2726 ENTER THE WORLD \u2726</span>'
            +       '<div class="ornament-line"></div>'
            +     '</div>'
            +     '<h1 class="hero-title">'
            +       '<span class="word">Camp&nbsp;</span>'
            +       '<span class="word">Half-</span>'
            +       '<span class="word">Blood</span>'
            +     '</h1>'
            +     '<p class="hero-subtitle">Where Legends Train</p>'
            +     '<p class="hero-tagline">'
            +       'The gods are real. Their children walk among us.<br>'
            +       'And you, demigod, have finally found your way to camp.'
            +     '</p>'
            +     '<div class="hero-ctas">'
            +       '<a href="/info/new-players" class="cta-primary" data-link><span>Begin Your Journey</span></a>'
            +       '<a href="/portal/quiz" class="cta-secondary cta-quiz" data-link><span>\u{1F52E}</span> <span>Take the Quiz</span></a>'
            +       '<a href="/portal" class="cta-secondary" data-link><span>\u{1F300}</span> <span>Enter Portal</span></a>'
            +     '</div>'
            +   '</div>'
            +   '<div class="scroll-hint">'
            +     '<div class="scroll-arrow"></div>'
            +     '<span class="scroll-label">Scroll to explore</span>'
            +   '</div>'
            + '</section>'

            // narrative
            + '<section class="narrative">'
            +   '<div class="narrative-bg"></div>'
            +   '<div class="narrative-body reveal">'
            +     '<p class="narrative-text">'
            +       'You\'ve always felt <em>different</em>, like you couldn\'t quite fit in. '
            +       'Strange things occur around you... things you <em>cannot explain</em>. '
            +       'It\'s time to discover the answers and forge your own <strong>destiny</strong>.'
            +     '</p>'
            +     '<div class="narrative-divider"></div>'
            +     '<p class="narrative-text">'
            +       '<strong>Camp Half-Blood</strong> is a sanctuary for the outcasts '
            +       '-- children of the Olympians, stuck between two worlds. '
            +       'Here, you\'ll train, fight, and discover what makes you <em>who you are</em>.'
            +     '</p>'
            +   '</div>'
            + '</section>'

            // showcase tiles
            + '<section class="showcase">'
            +   '<div class="showcase-grid">'
            +     '<a href="/news" class="showcase-card reveal reveal-d1" data-link>'
            +       '<span class="sc-icon">\u{1F4E2}</span>'
            +       '<h3 class="sc-title">Latest News</h3>'
            +       '<p class="sc-desc">Server details, modpacks, IPs, and admin updates -- posted here and in Discord.</p>'
            +       '<span class="sc-arrow">\u2192</span>'
            +     '</a>'
            +     '<a href="/info/new-players" class="showcase-card reveal reveal-d2" data-link>'
            +       '<span class="sc-icon">\u{1F4D6}</span>'
            +       '<h3 class="sc-title">New Camper Guide</h3>'
            +       '<p class="sc-desc">Everything you need to start your journey -- from joining Discord to your first quest.</p>'
            +       '<span class="sc-arrow">\u2192</span>'
            +     '</a>'
            +     '<a href="/portal/quiz" class="showcase-card reveal reveal-d3" data-link>'
            +       '<span class="sc-icon">\u{1F52E}</span>'
            +       '<h3 class="sc-title">Claiming Quiz</h3>'
            +       '<p class="sc-desc">Discover which Olympian god is your divine parent. Your heritage awaits, demigod.</p>'
            +       '<span class="sc-arrow">\u2192</span>'
            +     '</a>'
            +     '<a href="/portal" class="showcase-card reveal reveal-d4" data-link>'
            +       '<span class="sc-icon">\u26A1</span>'
            +       '<h3 class="sc-title">Enter the Portal</h3>'
            +       '<p class="sc-desc">Connect your accounts and watch the site transform -- a one-stop wiki shop with games, lore, timelines, events, and more.</p>'
            +       '<span class="sc-arrow">\u2192</span>'
            +     '</a>'
            +   '</div>'
            + '</section>'

            // camp activity
            + '<section class="activity">'
            +   '<div class="activity-header reveal">'
            +     '<h2 class="activity-title">Camp Activity</h2>'
            +     '<p class="activity-sub">The latest happenings at Camp Half-Blood</p>'
            +   '</div>'
            +   '<div class="activity-grid">'
            +     '<div class="reveal reveal-d1" style="display:flex;flex-direction:column;gap:1rem">'
            +       '<a href="/info/lore" class="lore-tile" data-link>'
            +         '<span class="lore-icon">\u{1F4D6}</span>'
            +         '<div>'
            +           '<div class="lore-title">Camp Lore</div>'
            +           '<div class="lore-desc">The story so far -- myths, prophecies, and the history of camp</div>'
            +         '</div>'
            +         '<span class="sc-arrow" style="position:static;opacity:0.5">\u2192</span>'
            +       '</a>'
            +       '<div id="admin-posts">'
            +         '<div class="admin-empty">No recent admin announcements</div>'
            +       '</div>'
            +       '<a href="/news" class="view-all" data-link>View all news \u2192</a>'
            +     '</div>'
            +     '<div class="stats-panel reveal reveal-d2" id="camp-stats" style="opacity:0.4" title="Stats will populate once tracking is confirmed">'
            +       '<div class="stats-heading">Camp Statistics</div>'
            +       '<div class="stat-row"><span class="stat-name">Registered Demigods</span><span class="stat-val" id="s-demigods">\u2014</span></div>'
            +       '<div class="stat-row"><span class="stat-name">Most Popular God</span><span class="stat-val" id="s-god">\u2014</span></div>'
            +       '<div class="stat-row"><span class="stat-name">Drachma in Circulation</span><span class="stat-val" id="s-drachma">\u2014</span></div>'
            +       '<div class="stat-row"><span class="stat-name">Quests Completed</span><span class="stat-val" id="s-quests">\u2014</span></div>'
            +       '<div class="stat-row"><span class="stat-name">Arena Battles</span><span class="stat-val" id="s-battles">\u2014</span></div>'
            +     '</div>'
            +   '</div>'
            + '</section>'

            // footer
            + '<footer class="site-footer">'
            +   '<div class="footer-inner">'
            +     '<div>'
            +       '<div class="footer-brand-name">\u26A1 Camp Half-Blood</div>'
            +       '<p class="footer-brand-desc">A Discord + Minecraft roleplay experience.<br>Inspired by Percy Jackson &amp; the Olympians.</p>'
            +     '</div>'
            +     '<div class="footer-col">'
            +       '<div class="footer-col-title">Explore</div>'
            +       '<a href="/" data-link>Home</a>'
            +       '<a href="/news" data-link>News</a>'
            +       '<a href="/info/new-players" data-link>New Players</a>'
            +       '<a href="/portal/quiz" data-link>God Quiz</a>'
            +       '<a href="/portal" data-link>Portal</a>'
            +     '</div>'
            +     '<div class="footer-col">'
            +       '<div class="footer-col-title">Connect</div>'
            +       '<a href="#">Discord Server</a>'
            +       '<a href="/integrations/quickref" data-link>Commands</a>'
            +       '<a href="/info/map" data-link>Camp Map</a>'
            +     '</div>'
            +   '</div>'
            +   '<div class="footer-bottom">'
            +     '<span>\u00A9 2025 Camp Half-Blood</span>'
            +     '<span class="server-ip" id="copy-ip" data-ip="play.camphalfblood.net" title="Click to copy">\u{1F4CB} play.camphalfblood.net</span>'
            +   '</div>'
            + '</footer>';

        // spawn floating particles
        var pc = document.getElementById('particles');
        if (pc) {
            for (var i = 0; i < 15; i++) {
                var dot = document.createElement('div');
                dot.className = 'particle';
                dot.style.left = (Math.random() * 100) + '%';
                dot.style.bottom = '-10px';
                var sz = (2 + Math.random() * 3) + 'px';
                dot.style.width = sz;
                dot.style.height = sz;
                dot.style.animationDuration = (8 + Math.random() * 12) + 's';
                dot.style.animationDelay = (Math.random() * 10) + 's';
                pc.appendChild(dot);
            }
        }

        // start effects
        Anim.startWeather();
        Anim.initScrollReveal();

        // copy ip
        var ipBtn = document.getElementById('copy-ip');
        if (ipBtn) {
            ipBtn.addEventListener('click', function() {
                var ip = this.getAttribute('data-ip') || '';
                var btn = this;
                navigator.clipboard.writeText(ip).then(function() {
                    var prev = btn.innerHTML;
                    btn.textContent = '\u2713 Copied!';
                    setTimeout(function() { btn.innerHTML = prev; }, 2000);
                }).catch(function() {});
            });
        }

        // try loading admin posts
        loadAdminPosts();
        loadStats();

        return {
            cleanup: function() {
                Anim.stopWeather();
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function loadAdminPosts() {
        var container = document.getElementById('admin-posts');
        if (!container) return;

        fetch('/api/announcements')
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var posts = (res.announcements || []).slice(0, 2);
                if (!posts.length) return;
                var html = '';
                posts.forEach(function(p) {
                    var date = p.created_at ? new Date(p.created_at).toLocaleDateString() : '';
                    var preview = (p.content || '').substring(0, 120);
                    if (p.content && p.content.length > 120) preview += '...';

                    // escape html
                    var tmp = document.createElement('div');
                    tmp.textContent = p.title;
                    var safeTitle = tmp.innerHTML;
                    tmp.textContent = preview;
                    var safePreview = tmp.innerHTML;

                    html += '<div class="ann-item">'
                        + '<div class="ann-date">' + date + '</div>'
                        + '<div class="ann-title">' + safeTitle + '</div>'
                        + '<div class="ann-preview">' + safePreview + '</div>'
                        + '</div>';
                });
                container.innerHTML = html;
            })
            .catch(function() {});
    }

    function loadStats() {
        var panel = document.getElementById('camp-stats');
        if (!panel) return;

        // will hit /api/stats when tracking is verified
        // for now keep it dimmed

        // fetch('/api/stats')
        //   .then(function(r) { return r.json(); })
        //   .then(function(s) {
        //     panel.style.opacity = '1';
        //     if (s.totalUsers) document.getElementById('s-demigods').textContent = s.totalUsers.toLocaleString();
        //     if (s.topGod) document.getElementById('s-god').textContent = s.topGod;
        //     if (s.totalDrachma) document.getElementById('s-drachma').textContent = s.totalDrachma.toLocaleString();
        //     if (s.questsCompleted) document.getElementById('s-quests').textContent = s.questsCompleted;
        //     if (s.arenaBattles) document.getElementById('s-battles').textContent = s.arenaBattles;
        //   })
        //   .catch(function() {
        //     panel.style.display = 'none';
        //   });
    }

    window.HomePage = render;

})();
