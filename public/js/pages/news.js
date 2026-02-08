// camp bulletin feed

(function() {

    var POSTS_PER_PAGE = 15;
    var currentOffset = 0;
    var allLoaded = false;
    var isAdmin = false;

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
            +     '<div id="pinned-wrap"></div>'
            +     '<div id="news-feed" class="news-feed">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading posts...</div></div>'
            +     '</div>'
            +     '<div id="load-more-wrap"></div>'
            +   '</div>'
            + '</div>';

        currentOffset = 0;
        allLoaded = false;
        isAdmin = false;

        checkAuth();
        loadPinned();
        loadPosts(true);

        Anim.initScrollReveal();

        return {
            cleanup: function() {
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function checkAuth() {
        fetch('/api/auth/me', { credentials: 'include' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (user && user.isAdmin) isAdmin = true;
            })
            .catch(function() {});
    }

    function loadPinned() {
        fetch('/api/news/pinned', { credentials: 'include' })
            .then(function(r) {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(function(posts) {
                var wrap = document.getElementById('pinned-wrap');
                if (!wrap || !posts || !posts.length) return;

                var html = '<div class="pinned-section">'
                    + '<div class="pinned-label"><span class="pinned-icon">\u{1F4CC}</span> Pinned</div>';
                posts.forEach(function(p) { html += buildPostCard(p, true); });
                html += '</div>';
                wrap.innerHTML = html;
                bindPostActions(wrap);
            })
            .catch(function() {});
    }

    function loadPosts(fresh) {
        if (fresh) currentOffset = 0;

        fetch('/api/news?limit=' + POSTS_PER_PAGE + '&offset=' + currentOffset, { credentials: 'include' })
            .then(function(r) {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(function(posts) {
                var feed = document.getElementById('news-feed');
                var moreWrap = document.getElementById('load-more-wrap');
                if (!feed) return;
                if (fresh) feed.innerHTML = '';

                if (!posts || !posts.length) {
                    if (fresh) showEmpty(feed);
                    allLoaded = true;
                    if (moreWrap) moreWrap.innerHTML = '';
                    return;
                }

                posts.forEach(function(p) {
                    feed.insertAdjacentHTML('beforeend', buildPostCard(p, false));
                });

                currentOffset += posts.length;
                allLoaded = posts.length < POSTS_PER_PAGE;

                if (moreWrap) {
                    if (allLoaded) {
                        moreWrap.innerHTML = '';
                    } else {
                        moreWrap.innerHTML = '<div class="load-more-wrap"><button class="load-more-btn" id="load-more">Load more</button></div>';
                        document.getElementById('load-more').addEventListener('click', function() {
                            this.textContent = 'Loading...';
                            this.disabled = true;
                            loadPosts(false);
                        });
                    }
                }

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

    function buildPostCard(post, inPinnedSection) {
        var pinClass = post.pinned ? ' pinned' : '';
        var date = formatDate(post.created_at);

        var html = '<div class="post-card' + pinClass + '" data-id="' + post.id + '">';
        html += '<div class="post-head">';
        html += '<div class="post-title">' + esc(post.title) + '</div>';
        html += '<div class="post-meta">';
        if (post.pinned && !inPinnedSection) html += '<span class="post-pin-badge">\u{1F4CC}</span>';
        if (post.posted_to_discord) html += '<span class="discord-badge">\u{1F4E3} Discord</span>';
        html += '<span class="post-date">' + date + '</span>';
        html += '</div></div>';

        html += '<div class="post-body">' + formatContent(post.content) + '</div>';

        if (post.file_url) {
            html += '<a href="' + esc(post.file_url) + '" class="post-attachment" target="_blank" download>';
            html += '<span class="attach-icon">\u{1F4CE}</span>';
            html += '<span>' + esc(post.file_name || 'Download') + '</span>';
            html += '</a>';
        }

        if (isAdmin) {
            html += '<div class="post-admin">';
            html += '<button class="post-action pin-btn" data-action="pin" data-id="' + post.id + '">' + (post.pinned ? 'Unpin' : 'Pin') + '</button>';
            if (!post.posted_to_discord) {
                html += '<button class="post-action discord-btn" data-action="discord" data-id="' + post.id + '">Send to Discord</button>';
            }
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
                if (action === 'pin') handlePin(id);
                else if (action === 'delete') handleDelete(id);
                else if (action === 'discord') handleDiscordPost(id, this);
            });
        });
    }

    function handlePin(id) {
        fetch('/api/news/' + id + '/pin', { method: 'PUT', credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function() { loadPinned(); currentOffset = 0; loadPosts(true); })
            .catch(function() {});
    }

    function handleDelete(id) {
        if (!confirm('Delete this post? This cannot be undone.')) return;
        fetch('/api/news/' + id, { method: 'DELETE', credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function() {
                var card = document.querySelector('.post-card[data-id="' + id + '"]');
                if (card) card.remove();
                loadPinned();
            })
            .catch(function() {});
    }

    function handleDiscordPost(id, btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
        fetch('/api/news/' + id + '/discord', { method: 'POST', credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.textContent = res.error ? 'Failed' : 'Sent \u2713';
                if (res.error) btn.disabled = false;
            })
            .catch(function() { btn.textContent = 'Failed'; btn.disabled = false; });
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
