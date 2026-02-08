// admin post page - uses /api/announcements

(function() {

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="news-page">'
            +   '<div class="news-inner">'
            +     '<div class="news-header reveal">'
            +       '<h1 class="news-title">Admin Post</h1>'
            +       '<p class="news-subtitle">Publish announcements to the Camp Bulletin</p>'
            +     '</div>'
            +     '<div id="admin-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Checking permissions...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        checkAuth();
        Anim.initScrollReveal();
        return { cleanup: function() {} };
    }

    function checkAuth() {
        var container = document.getElementById('admin-content');
        if (!container) return;

        var portalUser = PortalSession.getUsername();
        if (!portalUser) {
            showLocked(container, 'You need to be logged in via the Portal to access this page.');
            return;
        }

        fetch('/api/auth/me?username=' + encodeURIComponent(portalUser))
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (!user || !user.isAdmin) {
                    showLocked(container, 'This page is restricted to camp administrators.');
                    return;
                }
                buildComposer(container, portalUser);
            })
            .catch(function() {
                showLocked(container, 'Could not verify your permissions. Make sure you\'re logged in through the Portal.');
            });
    }

    function showLocked(container, msg) {
        container.innerHTML = ''
            + '<div class="news-empty">'
            +   '<div class="news-empty-icon">\u{1F512}</div>'
            +   '<p style="font-size:1.1rem;color:var(--gold-light);margin-bottom:0.5rem">Access Restricted</p>'
            +   '<p>' + msg + '</p>'
            +   '<div style="margin-top:1.5rem">'
            +     '<a href="/portal" class="cta-secondary" data-link style="display:inline-flex;padding:0.6rem 1.5rem;font-size:0.9rem">\u{1F300} Go to Portal</a>'
            +   '</div>'
            + '</div>';
    }

    function buildComposer(container, username) {
        container.innerHTML = ''
            + '<div class="compose-area reveal" style="border:none;background:none;backdrop-filter:none">'
            +   '<div class="compose-form visible" style="padding:0">'
            +     '<div class="compose-field">'
            +       '<label>Title</label>'
            +       '<input type="text" class="compose-input" id="post-title" placeholder="Post title..." maxlength="200">'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Content</label>'
            +       '<textarea class="compose-input" id="post-content" placeholder="Write your announcement..."></textarea>'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Notes (optional)</label>'
            +       '<textarea class="compose-input" id="post-notes" placeholder="Additional notes, links, instructions..." style="min-height:60px"></textarea>'
            +     '</div>'
            +     '<div class="compose-options">'
            +       '<label class="compose-check">'
            +         '<input type="checkbox" id="opt-pin">'
            +         '<span>\u{1F4CC} Pin this post</span>'
            +       '</label>'
            +       '<label class="compose-check">'
            +         '<input type="checkbox" id="opt-discord">'
            +         '<span>\u{1F4E3} Post to Discord</span>'
            +       '</label>'
            +     '</div>'
            +     '<div class="compose-actions">'
            +       '<button class="compose-submit" id="submit-post">Publish</button>'
            +       '<span class="compose-status" id="compose-status"></span>'
            +     '</div>'
            +   '</div>'
            + '</div>'
            + '<div style="margin-top:2rem">'
            +   '<a href="/news" class="view-all" data-link>\u2190 Back to Bulletin</a>'
            + '</div>';

        document.getElementById('submit-post').addEventListener('click', function() {
            var title = document.getElementById('post-title').value.trim();
            var content = document.getElementById('post-content').value.trim();
            var notes = document.getElementById('post-notes').value.trim();
            var pinned = document.getElementById('opt-pin').checked;
            var toDiscord = document.getElementById('opt-discord').checked;
            var statusEl = document.getElementById('compose-status');
            var btn = this;

            if (!title) { showStatus(statusEl, 'Title is required', 'error'); return; }
            if (!content) { showStatus(statusEl, 'Content is required', 'error'); return; }

            btn.disabled = true;
            showStatus(statusEl, 'Publishing...', '');

            fetch('/api/announcements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    notes: notes || null,
                    is_pinned: pinned,
                    post_to_discord: toDiscord,
                    username: username
                })
            })
                .then(function(r) { return r.json(); })
                .then(function(res) {
                    btn.disabled = false;
                    if (res.error) {
                        showStatus(statusEl, res.error, 'error');
                        return;
                    }

                    showStatus(statusEl, 'Published! Redirecting...', 'ok');

                    document.getElementById('post-title').value = '';
                    document.getElementById('post-content').value = '';
                    document.getElementById('post-notes').value = '';
                    document.getElementById('opt-pin').checked = false;
                    document.getElementById('opt-discord').checked = false;

                    setTimeout(function() { Router.navigate('/news'); }, 1500);
                })
                .catch(function() {
                    showStatus(statusEl, 'Failed to publish. Check your connection.', 'error');
                    btn.disabled = false;
                });
        });
    }

    function showStatus(el, msg, type) {
        el.className = 'compose-status' + (type ? ' ' + type : '');
        el.textContent = msg;
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.NewsAdminPage = render;

})();
