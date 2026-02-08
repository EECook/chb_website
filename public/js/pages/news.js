// camp bulletin feed - uses /api/announcements

(function() {

    var isAdmin = false;
    var adminUsername = null;

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="news-page">'
            +   '<div class="news-inner">'
            +     '<div class="news-header reveal">'
            +       '<h1 class="news-title">Camp Bulletin</h1>'
            +       '<p class="news-subtitle">Server updates, downloads, events, and dispatches from camp administration</p>'
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
            +     '<div id="news-feed" class="news-feed">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading posts...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        isAdmin = false;
        adminUsername = null;

        checkAuth(function() {
            loadPosts();
        });

        Anim.initScrollReveal();

        return {
            cleanup: function() {
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function checkAuth(cb) {
        var portalUser = PortalSession.getUsername();
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

                // split pinned and regular
                var pinned = posts.filter(function(p) { return p.is_pinned; });
                var regular = posts.filter(function(p) { return !p.is_pinned; });

                var html = '';

                if (pinned.length) {
                    html += '<div class="pinned-section">';
                    html += '<div class="pinned-label"><span class="pinned-icon">\u{1F4CC}</span> Pinned</div>';
                    pinned.forEach(function(p) { html += buildPostCard(p); });
                    html += '</div>';
                }

                regular.forEach(function(p) { html += buildPostCard(p); });

                feed.innerHTML = html;
                bindPostActions(feed);
                Anim.initScrollReveal();
            })
            .catch(function() {
                var feed = document.getElementById('news-feed');
                if (feed) showEmpty(feed);
            });
    }

    function showEmpty(feed) {
        feed.innerHTML = ''
            + '<div class="news-empty">'
            +   '<div class="news-empty-icon">\u{1F3DB}</div>'
            +   '<p style="font-size:1.1rem;color:var(--gold-light);margin-bottom:0.5rem">The bulletin board is empty</p>'
            +   '<p>No dispatches from the administration yet. When posts go up, you\'ll find them here:</p>'
            +   '<div class="empty-examples">'
            +     '<div class="empty-ex">\u{1F4E1} Server IP &amp; whitelist info</div>'
            +     '<div class="empty-ex">\u{1F4E6} Modpack &amp; resource pack downloads</div>'
            +     '<div class="empty-ex">\u{1F3AE} Server events &amp; updates</div>'
            +     '<div class="empty-ex">\u{1F4CC} Pinned important announcements</div>'
            +   '</div>'
            + '</div>';
    }

    function buildPostCard(post) {
        var pinClass = post.is_pinned ? ' pinned' : '';
        var date = formatDate(post.created_at);
        var avatar = post.author_avatar || '\u{1F4AC}';

        var html = '<div class="post-card' + pinClass + '" data-id="' + post.id + '">';

        html += '<div class="post-head">';
        html += '<div class="post-title">' + esc(post.title) + '</div>';
        html += '<div class="post-meta">';
        if (post.is_pinned) html += '<span class="post-pin-badge">\u{1F4CC}</span>';
        html += '<span class="post-author">' + avatar + ' ' + esc(post.author || 'Admin') + '</span>';
        html += '<span class="post-date">' + date + '</span>';
        html += '</div></div>';

        html += '<div class="post-body">' + formatContent(post.content) + '</div>';

        if (post.notes) {
            html += '<div class="post-notes">';
            html += '<div class="pn-label">\u{1F4DD} Notes</div>';
            html += '<div class="pn-content">' + formatContent(post.notes) + '</div>';
            html += '</div>';
        }

        if (isAdmin) {
            html += '<div class="post-admin">';
            html += '<button class="post-action pin-btn" data-action="pin" data-id="' + post.id + '" data-pinned="' + (post.is_pinned ? '1' : '0') + '">';
            html += post.is_pinned ? 'Unpin' : 'Pin';
            html += '</button>';
            html += '<button class="post-action del-btn" data-action="delete" data-id="' + post.id + '">Delete</button>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    function bindPostActions(container) {
        if (!isAdmin) return;
        container.querySelectorAll('.post-action').forEach(function(btn) {
            if (btn._bound) return;
            btn._bound = true;
            btn.addEventListener('click', function() {
                var action = this.getAttribute('data-action');
                var id = this.getAttribute('data-id');
                if (action === 'pin') handlePin(id, this);
                else if (action === 'delete') handleDelete(id);
            });
        });
    }

    function handlePin(id, btn) {
        var currentlyPinned = btn.getAttribute('data-pinned') === '1';
        fetch('/api/announcements/' + id + '/pin', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_pinned: !currentlyPinned, username: adminUsername })
        })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                if (res.error) { alert(res.error); return; }
                loadPosts();
            })
            .catch(function() {});
    }

    function handleDelete(id) {
        if (!confirm('Delete this announcement? This cannot be undone.')) return;
        fetch('/api/announcements/' + id + '?username=' + encodeURIComponent(adminUsername), { method: 'DELETE' })
            .then(function(r) { return r.json(); })
            .then(function() { loadPosts(); })
            .catch(function() {});
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    function formatContent(text) {
        if (!text) return '';
        var safe = esc(text);
        safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');
        safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--lightning)">$1</a>');
        safe = safe.replace(/\n/g, '<br>');
        return safe;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var d = new Date(dateStr);
        var diff = Date.now() - d;
        if (diff < 3600000) { var m = Math.floor(diff / 60000); return m < 2 ? 'just now' : m + 'm ago'; }
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }

    window.NewsPage = render;

})();
