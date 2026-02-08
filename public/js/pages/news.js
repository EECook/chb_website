// camp bulletin - server info + announcements feed

(function() {

    var isAdmin = false;
    var adminUsername = null;

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Camp Bulletin</h1>'
            +       '<p class="portal-subtitle">Server updates, downloads, and dispatches from camp administration</p>'
            +     '</div>'
            +     '<div class="bulletin-quick-links reveal">'
            +       '<a href="/news/story" class="bql-item" data-link>'
            +         '<span class="bql-icon">\u{1F4D6}</span>'
            +         '<span>Story Phases</span>'
            +       '</a>'
            +       '<a href="/news/quests" class="bql-item" data-link>'
            +         '<span class="bql-icon">\u{1F5FA}</span>'
            +         '<span>Quest Tree</span>'
            +       '</a>'
            +       '<a href="/news/admin" class="bql-item bql-admin" data-link>'
            +         '<span class="bql-icon">\u{1F4DD}</span>'
            +         '<span>Admin Post</span>'
            +       '</a>'
            +     '</div>'
            +     '<div id="server-info-banner"></div>'
            +     '<div id="news-feed">'
            +       '<div style="text-align:center;padding:2rem 0;color:var(--marble-muted)">'
            +         '<div class="spinner" style="margin:0 auto 1rem"></div>'
            +         '<div>Loading posts\u2026</div>'
            +       '</div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        isAdmin = false;
        adminUsername = null;

        checkAuth(function() {
            loadServerInfo();
            loadPosts();
        });

        Anim.initScrollReveal();
        return { cleanup: function() {} };
    }

    function checkAuth(cb) {
        var portalUser = window.PortalSession ? PortalSession.getUsername() : null;
        if (!portalUser) { cb(); return; }

        adminUsername = portalUser;

        fetch('/api/auth/me?username=' + encodeURIComponent(portalUser))
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (user && user.isAdmin) isAdmin = true;
                cb();
            })
            .catch(function() { cb(); });
    }

    /* ── SERVER INFO BANNER ──────────────────────── */

    function loadServerInfo() {
        var banner = document.getElementById('server-info-banner');
        if (!banner) return;

        fetch('/api/server-info')
            .then(function(r) { return r.json(); })
            .then(function(info) {
                if (!info.ip && !info.version) return;

                var html = '<div class="server-info-card reveal">';
                html += '<div class="sic-header">';
                html += '<span class="sic-icon">\u{1F3AE}</span>';
                html += '<span class="sic-title">Server Info</span>';
                html += '</div>';
                html += '<div class="sic-grid">';

                if (info.ip) {
                    html += '<div class="sic-item">';
                    html += '<span class="sic-label">Server IP</span>';
                    html += '<span class="sic-value sic-mono" id="sic-ip">' + esc(info.ip) + '</span>';
                    html += '<button class="sic-copy" onclick="navigator.clipboard.writeText(\'' + esc(info.ip).replace(/'/g, "\\'") + '\');this.textContent=\'Copied!\';setTimeout(function(){this.textContent=\'Copy\'},1500)" title="Copy IP">Copy</button>';
                    html += '</div>';
                }

                if (info.version) {
                    html += '<div class="sic-item">';
                    html += '<span class="sic-label">Version</span>';
                    html += '<span class="sic-value">' + esc(info.version) + '</span>';
                    html += '</div>';
                }

                if (info.whitelist) {
                    html += '<div class="sic-item sic-wide">';
                    html += '<span class="sic-label">Whitelist</span>';
                    html += '<span class="sic-value">' + esc(info.whitelist) + '</span>';
                    html += '</div>';
                }

                html += '</div></div>';
                banner.innerHTML = html;
                Anim.initScrollReveal();
            })
            .catch(function() {});
    }

    /* ── POSTS FEED ──────────────────────────────── */

    function loadPosts() {
        fetch('/api/announcements')
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var feed = document.getElementById('news-feed');
                if (!feed) return;

                var posts = res.announcements || [];

                if (!posts.length) {
                    showEmpty(feed);
                    return;
                }

                var pinned = posts.filter(function(p) { return p.is_pinned; });
                var regular = posts.filter(function(p) { return !p.is_pinned; });

                var html = '';

                if (pinned.length) {
                    html += '<div style="margin-bottom:0.5rem"><span style="font-size:0.75rem;color:var(--marble-muted);font-family:Cinzel,serif;letter-spacing:0.05em;text-transform:uppercase">\u{1F4CC} Pinned</span></div>';
                    pinned.forEach(function(p) { html += postCard(p); });
                    if (regular.length) {
                        html += '<div style="height:1px;background:var(--border-subtle);margin:1rem 0"></div>';
                    }
                }

                regular.forEach(function(p) { html += postCard(p); });

                feed.innerHTML = html;
                bindActions(feed);
                Anim.initScrollReveal();
            })
            .catch(function() {
                var feed = document.getElementById('news-feed');
                if (feed) showEmpty(feed);
            });
    }

    function showEmpty(feed) {
        feed.innerHTML = ''
            + '<div style="text-align:center;padding:3rem 1rem">'
            +   '<div style="font-size:2.5rem;margin-bottom:1rem">\u{1F3DB}</div>'
            +   '<p style="font-size:1.1rem;color:var(--gold-light);font-family:Cinzel,serif;margin-bottom:0.5rem">The bulletin board is empty</p>'
            +   '<p style="color:var(--marble-muted)">No dispatches from the administration yet.</p>'
            + '</div>';
    }

    function postCard(post) {
        var date = formatDate(post.created_at);
        var avatar = post.author_avatar || '\u{1F4AC}';

        var html = '<div class="bulletin-post reveal" data-id="' + post.id + '">';

        // header
        html += '<div class="bp-head">';
        html += '<div class="bp-title">' + esc(post.title) + '</div>';
        html += '<div class="bp-meta">';
        if (post.is_pinned) html += '<span class="bp-pin">\u{1F4CC}</span> ';
        html += '<span>' + avatar + ' ' + esc(post.author || 'Admin') + '</span>';
        html += '<span class="bp-dot">\u00B7</span>';
        html += '<span>' + date + '</span>';
        html += '</div>';
        html += '</div>';

        // body
        html += '<div class="bp-body">' + formatContent(post.content) + '</div>';

        // notes
        if (post.notes) {
            html += '<div class="bp-notes">';
            html += '<div class="bp-notes-label">\u{1F4DD} Note</div>';
            html += '<div>' + formatContent(post.notes) + '</div>';
            html += '</div>';
        }

        // file
        if (post.file_url) {
            html += '<div class="bp-file">';
            html += '<a href="' + esc(post.file_url) + '" target="_blank" rel="noopener" class="bp-file-link">';
            html += '\u{1F4CE} ' + esc(post.file_name || 'Download attachment');
            html += '</a></div>';
        }

        // admin actions
        if (isAdmin) {
            html += '<div class="bp-admin">';
            html += '<button class="bp-action" data-act="pin" data-id="' + post.id + '" data-pinned="' + (post.is_pinned ? '1' : '0') + '">';
            html += post.is_pinned ? 'Unpin' : 'Pin';
            html += '</button>';
            html += '<button class="bp-action bp-action-del" data-act="delete" data-id="' + post.id + '">Delete</button>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    function bindActions(container) {
        if (!isAdmin) return;
        container.querySelectorAll('.bp-action').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var act = this.getAttribute('data-act');
                var id = this.getAttribute('data-id');
                if (act === 'pin') {
                    var pinned = this.getAttribute('data-pinned') === '1';
                    fetch('/api/announcements/' + id + '/pin', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ is_pinned: !pinned, username: adminUsername })
                    }).then(function() { loadPosts(); });
                } else if (act === 'delete') {
                    if (!confirm('Delete this announcement?')) return;
                    fetch('/api/announcements/' + id + '?username=' + encodeURIComponent(adminUsername), { method: 'DELETE' })
                        .then(function() { loadPosts(); });
                }
            });
        });
    }

    /* ── HELPERS ──────────────────────────────────── */

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    function formatContent(text) {
        if (!text) return '';
        var s = esc(text);
        s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
        s = s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--lightning)">$1</a>');
        s = s.replace(/\n/g, '<br>');
        return s;
    }

    function formatDate(d) {
        if (!d) return '';
        var dt = new Date(d);
        var diff = Date.now() - dt;
        if (diff < 3600000) { var m = Math.floor(diff / 60000); return m < 2 ? 'just now' : m + 'm ago'; }
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
    }

    window.NewsPage = render;

})();
