// profile / character sheet with edit mode

(function() {

    var currentPlayer = null;
    var currentChar = null;
    var editing = false;

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
        editing = false;
        loadProfile(username);
        Anim.initScrollReveal();

        return { cleanup: function() {} };
    }

    function loadProfile(username) {
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

            currentPlayer = playerRes.data;
            currentChar = (charRes.success && charRes.data) ? charRes.data : null;

            renderView(container);

        }).catch(function() {
            var container = document.getElementById('profile-content');
            if (container) {
                container.innerHTML = '<div class="news-empty"><p>Failed to load profile. Check your connection.</p></div>';
            }
        });
    }

    // ── VIEW MODE ──────────────────────────────────────────

    function renderView(container) {
        editing = false;
        var p = currentPlayer;
        var c = currentChar;
        var godEmoji = p.god_emoji || '\u{2753}';

        var html = '';

        // player stats card
        html += '<div class="portal-card reveal">';
        html += '<div style="display:flex;justify-content:space-between;align-items:flex-start">';
        html += '<div class="profile-top" style="flex:1">';

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

        html += '</div></div>';
        html += '<button class="edit-toggle-btn" id="edit-btn">\u{270F} Edit</button>';
        html += '</div></div>';

        // character sheet
        if (c) {
            html += '<div class="portal-card reveal">';
            html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">';
            html += '<div class="portal-section-label" style="margin:0">Character Details</div>';

            var visLabel = c.is_public ? '\u{1F513} Public' : '\u{1F512} Private';
            var visClass = c.is_public ? 'vis-public' : 'vis-private';
            html += '<span class="cs-visibility ' + visClass + '">' + visLabel + '</span>';
            html += '</div>';

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
            html += '<p style="color:var(--marble-muted);font-size:0.9rem;margin-bottom:1rem">Create your demigod identity to share with the camp.</p>';
            html += '<button class="login-btn" id="create-btn" style="max-width:250px;margin:0 auto">\u{270F} Create Character Sheet</button>';
            html += '</div>';
        }

        html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

        container.innerHTML = html;

        var editBtn = document.getElementById('edit-btn');
        if (editBtn) editBtn.addEventListener('click', function() { renderEdit(container); });

        var createBtn = document.getElementById('create-btn');
        if (createBtn) createBtn.addEventListener('click', function() { renderEdit(container); });

        Anim.initScrollReveal();
    }

    // ── EDIT MODE ──────────────────────────────────────────

    function renderEdit(container) {
        editing = true;
        var c = currentChar || {};

        var html = '<div class="portal-card reveal">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">';
        html += '<div class="portal-section-label" style="margin:0">' + (currentChar ? 'Edit Character' : 'Create Character') + '</div>';
        html += '<button class="edit-toggle-btn" id="cancel-edit">\u2715 Cancel</button>';
        html += '</div>';

        html += '<div class="cs-edit-grid">';
        html += editField('name', 'Character Name', c.char_name, 'text');
        html += editField('age', 'Age', c.age, 'text');
        html += editField('gender', 'Gender', c.gender, 'text');
        html += editField('pronouns', 'Pronouns', c.pronouns, 'text');
        html += editField('weapon', 'Weapon', c.weapon, 'text');
        html += editField('style', 'Fighting Style', c.fighting_style, 'text');
        html += editArea('abilities', 'Abilities', c.abilities);
        html += editArea('personality', 'Personality', c.personality);
        html += editArea('likes', 'Likes', c.likes);
        html += editArea('dislikes', 'Dislikes', c.dislikes);
        html += editArea('backstory', 'Backstory', c.backstory);
        html += editArea('goals', 'Goals', c.goals);
        html += editArea('fears', 'Fears', c.fears);
        html += '</div>';

        // images
        html += '<div class="portal-section-label" style="margin-top:1.5rem">Character Images</div>';
        html += '<p style="font-size:0.8rem;color:var(--marble-muted);margin-bottom:0.75rem">Paste image URLs (Discord CDN, Imgur, etc.)</p>';
        html += '<div class="cs-edit-grid">';
        html += editField('image1', 'Image 1 URL', c.image_url_1, 'url');
        html += editField('image2', 'Image 2 URL', c.image_url_2, 'url');
        html += editField('image3', 'Image 3 URL', c.image_url_3, 'url');
        html += '</div>';

        // visibility
        html += '<div class="cs-public-toggle">';
        html += '<label class="compose-check">';
        html += '<input type="checkbox" id="edit-public"' + (c.is_public !== 0 ? ' checked' : '') + '>';
        html += '<span>\u{1F513} Make my character sheet public</span>';
        html += '</label>';
        html += '<p style="font-size:0.78rem;color:var(--marble-muted);margin-top:0.3rem">Public sheets appear in the <a href="/portal/characters" data-link style="color:var(--lightning)">Campers</a> gallery for everyone to see.</p>';
        html += '</div>';

        // save
        html += '<div class="cs-save-row">';
        html += '<button class="login-btn" id="save-btn">Save Character Sheet</button>';
        html += '<div class="login-status" id="save-status"></div>';
        html += '</div>';

        html += '</div>';

        html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

        container.innerHTML = html;

        document.getElementById('cancel-edit').addEventListener('click', function() {
            renderView(container);
        });

        document.getElementById('save-btn').addEventListener('click', function() {
            saveCharacter(container);
        });

        Anim.initScrollReveal();
    }

    function saveCharacter(container) {
        var username = PortalSession.getUsername();
        if (!username) return;

        var btn = document.getElementById('save-btn');
        var status = document.getElementById('save-status');
        btn.disabled = true;
        btn.textContent = 'Saving...';
        showStatus(status, '', '');

        var data = {
            name: val('edit-name'),
            age: val('edit-age'),
            gender: val('edit-gender'),
            pronouns: val('edit-pronouns'),
            weapon: val('edit-weapon'),
            style: val('edit-style'),
            abilities: val('edit-abilities'),
            personality: val('edit-personality'),
            likes: val('edit-likes'),
            dislikes: val('edit-dislikes'),
            backstory: val('edit-backstory'),
            goals: val('edit-goals'),
            fears: val('edit-fears'),
            image1: val('edit-image1'),
            image2: val('edit-image2'),
            image3: val('edit-image3'),
            isPublic: document.getElementById('edit-public').checked
        };

        fetch('/api/player/' + encodeURIComponent(username) + '/character', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.disabled = false;
                btn.textContent = 'Save Character Sheet';

                if (res.success) {
                    showStatus(status, 'Saved!', 'ok');
                    // reload fresh data then switch to view
                    setTimeout(function() {
                        loadProfile(username);
                    }, 800);
                } else {
                    showStatus(status, res.error || 'Save failed', 'error');
                }
            })
            .catch(function() {
                btn.disabled = false;
                btn.textContent = 'Save Character Sheet';
                showStatus(status, 'Could not reach server', 'error');
            });
    }

    // ── HELPERS ────────────────────────────────────────────

    function editField(id, label, value, type) {
        return '<div class="cs-edit-field">'
            + '<label class="cs-label" for="edit-' + id + '">' + label + '</label>'
            + '<input type="' + (type || 'text') + '" class="cs-edit-input" id="edit-' + id + '" value="' + escAttr(value) + '">'
            + '</div>';
    }

    function editArea(id, label, value) {
        return '<div class="cs-edit-field full">'
            + '<label class="cs-label" for="edit-' + id + '">' + label + '</label>'
            + '<textarea class="cs-edit-input cs-edit-textarea" id="edit-' + id + '" rows="3">' + esc(value) + '</textarea>'
            + '</div>';
    }

    function val(id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
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

    function escAttr(str) {
        if (!str) return '';
        return esc(str).replace(/"/g, '&quot;');
    }

    window.PortalProfilePage = render;

})();
