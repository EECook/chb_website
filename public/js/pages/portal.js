// portal login

(function() {

    function render(mount) {
        // if already logged in, show dashboard
        if (PortalSession.isLoggedIn()) {
            return renderDashboard(mount);
        }

        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="login-container">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Enter the Portal</h1>'
            +       '<p class="portal-subtitle">Link your account to access your demigod profile</p>'
            +     '</div>'
            +     '<div class="portal-card login-card reveal">'
            +       '<div class="login-icon">\u{1F300}</div>'
            +       '<div class="login-tabs">'
            +         '<button class="login-tab active" data-tab="mc">Minecraft Username</button>'
            +         '<button class="login-tab" data-tab="code">Discord Code</button>'
            +       '</div>'
            +       '<div class="login-form active" id="form-mc">'
            +         '<input type="text" class="login-input" id="mc-input" placeholder="Your MC username" maxlength="50" autocomplete="off">'
            +         '<p class="login-hint">Enter the Minecraft username linked to your Discord via !mclink</p>'
            +         '<button class="login-btn" id="mc-submit">Enter Camp</button>'
            +         '<div class="login-status" id="mc-status"></div>'
            +       '</div>'
            +       '<div class="login-form" id="form-code">'
            +         '<input type="text" class="login-input code-input" id="code-input" placeholder="ABC123" maxlength="6" autocomplete="off">'
            +         '<p class="login-hint">Run <strong>!weblink</strong> in Discord to get a one-time code. Enter it here within 10 minutes.</p>'
            +         '<button class="login-btn" id="code-submit">Link Account</button>'
            +         '<div class="login-status" id="code-status"></div>'
            +       '</div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        // tab switching
        mount.querySelectorAll('.login-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                mount.querySelectorAll('.login-tab').forEach(function(t) { t.classList.remove('active'); });
                mount.querySelectorAll('.login-form').forEach(function(f) { f.classList.remove('active'); });
                this.classList.add('active');
                document.getElementById('form-' + this.getAttribute('data-tab')).classList.add('active');
            });
        });

        // MC username login
        document.getElementById('mc-submit').addEventListener('click', handleMcLogin);
        document.getElementById('mc-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') handleMcLogin();
        });

        // Code login
        document.getElementById('code-submit').addEventListener('click', handleCodeLogin);
        document.getElementById('code-input').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') handleCodeLogin();
        });

        Anim.initScrollReveal();
        return { cleanup: function() {} };
    }

    function handleMcLogin() {
        var input = document.getElementById('mc-input');
        var status = document.getElementById('mc-status');
        var btn = document.getElementById('mc-submit');
        var username = input.value.trim();

        if (!username) {
            showStatus(status, 'Enter your Minecraft username', 'error');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Looking you up...';
        showStatus(status, '', '');

        fetch('/api/player/' + encodeURIComponent(username))
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.disabled = false;
                btn.textContent = 'Enter Camp';

                if (!res.success) {
                    showStatus(status, res.error || 'Player not found. Make sure you\'ve used !mclink in Discord.', 'error');
                    return;
                }

                PortalSession.set(res.data.mc_username || username, res.data.discord_id);
                showStatus(status, 'Welcome back, demigod!', 'ok');
                setTimeout(function() { Router.navigate('/portal'); }, 600);
            })
            .catch(function() {
                btn.disabled = false;
                btn.textContent = 'Enter Camp';
                showStatus(status, 'Could not reach the server. Try again.', 'error');
            });
    }

    function handleCodeLogin() {
        var input = document.getElementById('code-input');
        var status = document.getElementById('code-status');
        var btn = document.getElementById('code-submit');
        var code = input.value.trim().toUpperCase();

        if (!code || code.length < 6) {
            showStatus(status, 'Enter the 6-character code from your DM', 'error');
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Verifying...';

        fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.disabled = false;
                btn.textContent = 'Link Account';

                if (!res.success) {
                    showStatus(status, res.error || 'Invalid or expired code. Run !weblink again.', 'error');
                    return;
                }

                PortalSession.set(res.username, res.discord_id);
                showStatus(status, 'Account linked!', 'ok');
                setTimeout(function() { Router.navigate('/portal'); }, 600);
            })
            .catch(function() {
                btn.disabled = false;
                btn.textContent = 'Link Account';
                showStatus(status, 'Code verification not available yet. Use MC username instead.', 'error');
            });
    }

    function renderDashboard(mount) {
        var username = PortalSession.getUsername();

        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Demigod Portal</h1>'
            +       '<p class="portal-subtitle">Welcome back to camp</p>'
            +     '</div>'
            +     '<div id="dashboard-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading your profile...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        PortalSession.renderBar(mount.querySelector('.portal-inner'));

        fetch('/api/player/' + encodeURIComponent(username))
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var container = document.getElementById('dashboard-content');
                if (!container) return;

                if (!res.success) {
                    PortalSession.clear();
                    Router.navigate('/portal');
                    return;
                }

                var d = res.data;
                var godInfo = d.god_emoji ? d.god_emoji + ' ' : '';

                container.innerHTML = ''
                    + '<div class="portal-card reveal">'
                    +   '<div class="profile-top">'
                    +     '<div class="profile-avatar"><span class="pa-placeholder">' + (d.god_emoji || '\u{2753}') + '</span></div>'
                    +     '<div class="profile-info">'
                    +       '<div class="profile-name">' + esc(d.mc_username || d.discord_username) + '</div>'
                    +       '<div class="profile-god">' + godInfo + 'Child of ' + esc(d.god_parent || 'Unclaimed') + '</div>'
                    +       '<div class="profile-stats">'
                    +         stat(d.drachma, 'Drachma')
                    +         stat(d.divine_favor, 'Favor')
                    +         stat(d.daily_streak, 'Streak')
                    +         stat(d.unread_mail, 'Unread')
                    +       '</div>'
                    +     '</div>'
                    +   '</div>'
                    + '</div>'
                    + '<div class="cs-grid" style="margin-top:0">'
                    +   dashLink('/portal/profile', '\u{1F4DD}', 'Character Sheet', 'View & edit your identity')
                    +   dashLink('/portal/mail', '\u{1F4EC}', 'Mail', d.unread_mail ? d.unread_mail + ' unread' : 'Messages & invites')
                    +   dashLink('/portal/leaderboard', '\u{1F3C6}', 'Leaderboard', 'Top demigods by drachma')
                    +   dashLink('/portal/characters', '\u{1F465}', 'Characters', 'Browse public profiles')
                    + '</div>';

                Anim.initScrollReveal();
            })
            .catch(function() {
                var container = document.getElementById('dashboard-content');
                if (container) {
                    container.innerHTML = '<div class="news-empty"><p>Could not load profile. <a href="/portal" data-link>Try again</a></p></div>';
                }
            });

        Anim.initScrollReveal();
        return { cleanup: function() {} };
    }

    function dashLink(href, icon, title, desc) {
        return '<a href="' + href + '" class="portal-card portal-card-sm" data-link style="cursor:pointer;transition:all 0.2s;text-decoration:none">'
            + '<div style="display:flex;align-items:center;gap:0.75rem">'
            + '<span style="font-size:1.5rem;font-family:Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">' + icon + '</span>'
            + '<div>'
            + '<div style="font-family:Cinzel,serif;color:var(--gold-light);font-size:0.95rem">' + title + '</div>'
            + '<div style="font-size:0.8rem;color:var(--marble-muted)">' + desc + '</div>'
            + '</div>'
            + '</div></a>';
    }

    function stat(val, label) {
        return '<div class="ps-stat"><span class="ps-val">' + (val || 0) + '</span><span class="ps-label">' + label + '</span></div>';
    }

    function showStatus(el, msg, type) {
        el.className = 'login-status' + (type ? ' ' + type : '');
        el.textContent = msg;
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.PortalPage = render;

})();
