// profile / character sheet

(function() {

    function render(mount) {
        var username = PortalSession.require(mount);
        if (!username) return { cleanup: function() {} };

        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Character Sheet</h1>'
            +       '<p class="portal-subtitle">Your demigod identity</p>'
            +     '</div>'
            +     '<div id="profile-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading character...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        PortalSession.renderBar(mount.querySelector('.portal-inner'));
        loadProfile(username);
        Anim.initScrollReveal();

        return { cleanup: function() {} };
    }

    function loadProfile(username) {
        // fetch both player info and character sheet
        Promise.all([
            fetch('/api/player/' + encodeURIComponent(username)).then(function(r) { return r.json(); }),
            fetch('/api/player/' + encodeURIComponent(username) + '/character').then(function(r) { return r.json(); })
        ]).then(function(results) {
            var playerRes = results[0];
            var charRes = results[1];
            var container = document.getElementById('profile-content');
            if (!container) return;

            if (!playerRes.success) {
                container.innerHTML = '<div class="news-empty"><p>Could not load your profile.</p></div>';
                return;
            }

            var p = playerRes.data;
            var c = (charRes.success && charRes.data) ? charRes.data : null;
            var godEmoji = p.god_emoji || '\u{2753}';

            var html = '';

            // player stats card
            html += '<div class="portal-card reveal">';
            html += '<div class="profile-top">';

            // avatar
            if (c && c.image_url_1) {
                html += '<div class="profile-avatar"><img src="' + esc(c.image_url_1) + '" alt="Character"></div>';
            } else {
                html += '<div class="profile-avatar"><span class="pa-placeholder">' + godEmoji + '</span></div>';
            }

            html += '<div class="profile-info">';
            html += '<div class="profile-name">' + esc(c && c.char_name ? c.char_name : p.mc_username || p.discord_username) + '</div>';
            html += '<div class="profile-god">' + godEmoji + ' Child of ' + esc(p.god_parent || 'Unclaimed');
            if (p.god_domain) html += ' &mdash; ' + esc(p.god_domain);
            html += '</div>';

            html += '<div class="profile-stats">';
            html += stat(p.drachma, 'Drachma');
            html += stat(p.divine_favor, 'Favor');
            html += stat(p.blessings, 'Blessings');
            html += stat(p.daily_streak, 'Streak');
            html += '</div>';

            if (p.cabin_name) {
                html += '<div style="margin-top:0.5rem;font-size:0.85rem;color:var(--marble-muted)">\u{1F3D5} Cabin: <span style="color:var(--gold-light)">' + esc(p.cabin_name) + '</span></div>';
            }

            html += '</div></div></div>';

            // character sheet
            if (c) {
                html += '<div class="portal-card reveal">';
                html += '<div class="portal-section-label">Character Details</div>';
                html += '<div class="cs-grid">';
                html += field('Name', c.char_name);
                html += field('Age', c.age);
                html += field('Gender', c.gender);
                html += field('Pronouns', c.pronouns);
                html += field('Godly Parent', c.god_parent);
                html += field('Weapon', c.weapon);
                html += field('Fighting Style', c.fighting_style);
                html += field('Abilities', c.abilities, true);
                html += field('Personality', c.personality, true);
                html += field('Likes', c.likes, true);
                html += field('Dislikes', c.dislikes, true);
                html += field('Backstory', c.backstory, true);
                html += field('Goals', c.goals, true);
                html += field('Fears', c.fears, true);
                html += '</div>';

                // images
                var images = [c.image_url_1, c.image_url_2, c.image_url_3].filter(Boolean);
                if (images.length) {
                    html += '<div class="cs-images">';
                    images.forEach(function(url) {
                        html += '<div class="cs-img"><img src="' + esc(url) + '" alt="Character image"></div>';
                    });
                    html += '</div>';
                }

                html += '</div>';
            } else {
                html += '<div class="portal-card reveal" style="text-align:center">';
                html += '<div style="font-size:2rem;margin-bottom:0.75rem">\u{1F4DD}</div>';
                html += '<p style="color:var(--gold-light);font-family:Cinzel,serif;margin-bottom:0.5rem">No Character Sheet Yet</p>';
                html += '<p style="color:var(--marble-muted);font-size:0.9rem">Your character sheet can be created via the web portal or Discord. Check back once you\'ve filled it out!</p>';
                html += '</div>';
            }

            html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

            container.innerHTML = html;
            Anim.initScrollReveal();

        }).catch(function() {
            var container = document.getElementById('profile-content');
            if (container) {
                container.innerHTML = '<div class="news-empty"><p>Failed to load profile. Check your connection.</p></div>';
            }
        });
    }

    function field(label, value, full) {
        var cls = full ? 'cs-field full' : 'cs-field';
        return '<div class="' + cls + '">'
            + '<div class="cs-label">' + label + '</div>'
            + '<div class="cs-value">' + (value ? esc(value) : '') + '</div>'
            + '</div>';
    }

    function stat(val, label) {
        return '<div class="ps-stat"><span class="ps-val">' + (val || 0) + '</span><span class="ps-label">' + label + '</span></div>';
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.PortalProfilePage = render;

})();
