// public character gallery

(function() {

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Campers</h1>'
            +       '<p class="portal-subtitle">Public character profiles from camp</p>'
            +     '</div>'
            +     '<div id="chars-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading campers...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        if (PortalSession.isLoggedIn()) {
            PortalSession.renderBar(mount.querySelector('.portal-inner'));
        }

        loadCharacters();
        Anim.initScrollReveal();

        return { cleanup: function() {} };
    }

    function loadCharacters() {
        fetch('/api/characters')
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var container = document.getElementById('chars-content');
                if (!container) return;

                var chars = (res.success && res.data) ? res.data : [];

                if (!chars.length) {
                    container.innerHTML = ''
                        + '<div class="news-empty">'
                        +   '<div class="news-empty-icon">\u{1F465}</div>'
                        +   '<p style="color:var(--gold-light);font-family:Cinzel,serif">No public characters yet</p>'
                        +   '<p style="color:var(--marble-muted)">Once campers create and publish character sheets, they\'ll appear here.</p>'
                        + '</div>';
                    return;
                }

                var html = '<div class="char-grid">';
                chars.forEach(function(c) {
                    html += '<div class="char-card reveal" data-id="' + c.id + '">';
                    if (c.image_url_1) {
                        html += '<div class="char-card-img"><img src="' + esc(c.image_url_1) + '" alt="' + esc(c.char_name) + '"></div>';
                    } else {
                        html += '<div class="char-card-img"><span class="cc-placeholder">\u{1F464}</span></div>';
                    }
                    html += '<div class="char-card-body">';
                    html += '<div class="cc-name">' + esc(c.char_name) + '</div>';
                    html += '<div class="cc-god">' + esc(c.god_parent || 'Unclaimed') + '</div>';
                    html += '</div></div>';
                });
                html += '</div>';
                html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

                container.innerHTML = html;

                // click to view detail
                container.querySelectorAll('.char-card').forEach(function(card) {
                    card.addEventListener('click', function() {
                        viewCharacter(card.getAttribute('data-id'));
                    });
                });

                Anim.initScrollReveal();
            })
            .catch(function() {
                var container = document.getElementById('chars-content');
                if (container) {
                    container.innerHTML = '<div class="news-empty"><p>Could not load characters.</p></div>';
                }
            });
    }

    function viewCharacter(id) {
        fetch('/api/character/' + id)
            .then(function(r) { return r.json(); })
            .then(function(res) {
                if (!res.success || !res.data) return;
                var c = res.data;

                var overlay = document.createElement('div');
                overlay.className = 'mail-overlay';
                overlay.id = 'char-overlay';

                var html = '<div class="mail-detail" style="max-width:700px">';
                html += '<button class="md-close">\u2715</button>';

                html += '<div style="display:flex;gap:1rem;align-items:flex-start;margin-bottom:1rem">';
                if (c.image_url_1) {
                    html += '<div class="profile-avatar"><img src="' + esc(c.image_url_1) + '" alt="Character"></div>';
                }
                html += '<div>';
                html += '<div class="profile-name" style="font-size:1.3rem">' + esc(c.char_name) + '</div>';
                html += '<div class="profile-god">' + esc(c.god_parent || 'Unclaimed') + '</div>';
                html += '</div></div>';

                html += '<div class="cs-grid">';
                if (c.age) html += field('Age', c.age);
                if (c.gender) html += field('Gender', c.gender);
                if (c.pronouns) html += field('Pronouns', c.pronouns);
                if (c.weapon) html += field('Weapon', c.weapon);
                if (c.fighting_style) html += field('Fighting Style', c.fighting_style);
                if (c.abilities) html += field('Abilities', c.abilities, true);
                if (c.personality) html += field('Personality', c.personality, true);
                if (c.backstory) html += field('Backstory', c.backstory, true);
                if (c.likes) html += field('Likes', c.likes, true);
                if (c.dislikes) html += field('Dislikes', c.dislikes, true);
                if (c.goals) html += field('Goals', c.goals, true);
                if (c.fears) html += field('Fears', c.fears, true);
                html += '</div>';

                var images = [c.image_url_2, c.image_url_3].filter(Boolean);
                if (images.length) {
                    html += '<div class="cs-images">';
                    images.forEach(function(url) {
                        html += '<div class="cs-img"><img src="' + esc(url) + '" alt="Character"></div>';
                    });
                    html += '</div>';
                }

                html += '</div>';
                overlay.innerHTML = html;

                overlay.querySelector('.md-close').addEventListener('click', function() { overlay.remove(); });
                overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });

                document.body.appendChild(overlay);
            });
    }

    function field(label, value, full) {
        var cls = full ? 'cs-field full' : 'cs-field';
        return '<div class="' + cls + '"><div class="cs-label">' + label + '</div><div class="cs-value">' + esc(value) + '</div></div>';
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.PortalCharactersPage = render;

})();
