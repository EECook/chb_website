// news page

(function() {

    var POSTS_PER_PAGE = 15;
    var currentOffset = 0;
    var allLoaded = false;
    var isAdmin = false;
    var currentUser = null;

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="news-page">'
            +   '<div class="news-inner">'
            +     '<div class="news-header reveal">'
            +       '<h1 class="news-title">Camp Bulletin</h1>'
            +       '<p class="news-subtitle">Dispatches from the administration, server updates, and files from camp</p>'
            +     '</div>'
            +     '<div id="compose-wrap"></div>'
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
        currentUser = null;

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

    // check if current user is admin
    function checkAuth() {
        fetch('/api/auth/me', { credentials: 'include' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (!user) return;
                currentUser = user;
                isAdmin = user.isAdmin || false;
                if (isAdmin) buildComposer();
            })
            .catch(function() {});
    }

    // admin compose form
    function buildComposer() {
        var wrap = document.getElementById('compose-wrap');
        if (!wrap) return;

        wrap.innerHTML = ''
            + '<div class="compose-area reveal">'
            +   '<button class="compose-toggle" id="compose-toggle">'
            +     '<span class="toggle-icon">+</span> New Post'
            +   '</button>'
            +   '<div class="compose-form" id="compose-form">'
            +     '<div class="compose-field">'
            +       '<label>Title</label>'
            +       '<input type="text" class="compose-input" id="post-title" placeholder="Post title..." maxlength="200">'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Content</label>'
            +       '<textarea class="compose-input" id="post-content" placeholder="Write your message..."></textarea>'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Attachment (optional)</label>'
            +       '<div class="file-drop" id="file-drop">'
            +         '<span>\u{1F4CE}</span> <span id="file-label">Drop a file or click to upload</span>'
            +         '<input type="file" id="file-input">'
            +       '</div>'
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
            + '</div>';

        // toggle form
        var toggleBtn = document.getElementById('compose-toggle');
        var form = document.getElementById('compose-form');
        toggleBtn.addEventListener('click', function() {
            var open = form.classList.toggle('visible');
            toggleBtn.classList.toggle('open', open);
        });

        // file handling
        var fileInput = document.getElementById('file-input');
        var fileDrop = document.getElementById('file-drop');
        var fileLabel = document.getElementById('file-label');
        var selectedFile = null;

        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                selectedFile = this.files[0];
                fileDrop.classList.add('has-file');
                fileLabel.innerHTML = '<span class="file-name">' + esc(selectedFile.name) + '</span> <button class="file-clear" id="file-clear">\u2715</button>';
                var clearBtn = document.getElementById('file-clear');
                if (clearBtn) {
                    clearBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        selectedFile = null;
                        fileInput.value = '';
                        fileDrop.classList.remove('has-file');
                        fileLabel.textContent = 'Drop a file or click to upload';
                    });
                }
            }
        });

        // submit
        var submitBtn = document.getElementById('submit-post');
        submitBtn.addEventListener('click', function() {
            var title = document.getElementById('post-title').value.trim();
            var content = document.getElementById('post-content').value.trim();
            var pinned = document.getElementById('opt-pin').checked;
            var toDiscord = document.getElementById('opt-discord').checked;
            var statusEl = document.getElementById('compose-status');

            if (!title) {
                statusEl.className = 'compose-status error';
                statusEl.textContent = 'Title is required';
                return;
            }
            if (!content) {
                statusEl.className = 'compose-status error';
                statusEl.textContent = 'Content is required';
                return;
            }

            submitBtn.disabled = true;
            statusEl.className = 'compose-status';
            statusEl.textContent = 'Publishing...';

            var formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('pinned', pinned ? '1' : '0');
            formData.append('postToDiscord', toDiscord ? '1' : '0');
            if (selectedFile) formData.append('file', selectedFile);

            fetch('/api/news', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                if (res.error) {
                    statusEl.className = 'compose-status error';
                    statusEl.textContent = res.error;
                    submitBtn.disabled = false;
                    return;
                }

                statusEl.className = 'compose-status ok';
                statusEl.textContent = 'Published!';
                submitBtn.disabled = false;

                // clear form
                document.getElementById('post-title').value = '';
                document.getElementById('post-content').value = '';
                document.getElementById('opt-pin').checked = false;
                document.getElementById('opt-discord').checked = false;
                selectedFile = null;
                fileInput.value = '';
                fileDrop.classList.remove('has-file');
                fileLabel.textContent = 'Drop a file or click to upload';

                // refresh feed
                setTimeout(function() { statusEl.textContent = ''; }, 3000);
                if (pinned) loadPinned();
                currentOffset = 0;
                allLoaded = false;
                loadPosts(true);
            })
            .catch(function(err) {
                statusEl.className = 'compose-status error';
                statusEl.textContent = 'Failed to publish';
                submitBtn.disabled = false;
            });
        });
    }

    // load pinned posts
    function loadPinned() {
        fetch('/api/news/pinned', { credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function(posts) {
                var wrap = document.getElementById('pinned-wrap');
                if (!wrap) return;

                if (!posts || !posts.length) {
                    wrap.innerHTML = '';
                    return;
                }

                var html = '<div class="pinned-section">'
                    + '<div class="pinned-label"><span class="pinned-icon">\u{1F4CC}</span> Pinned</div>';

                posts.forEach(function(p) {
                    html += buildPostCard(p, true);
                });

                html += '</div>';
                wrap.innerHTML = html;
                bindPostActions(wrap);
            })
            .catch(function() {});
    }

    // load feed posts
    function loadPosts(fresh) {
        if (fresh) currentOffset = 0;

        fetch('/api/news?limit=' + POSTS_PER_PAGE + '&offset=' + currentOffset, { credentials: 'include' })
            .then(function(r) { return r.json(); })
            .then(function(posts) {
                var feed = document.getElementById('news-feed');
                var moreWrap = document.getElementById('load-more-wrap');
                if (!feed) return;

                if (fresh) feed.innerHTML = '';

                if (!posts || !posts.length) {
                    if (fresh) {
                        feed.innerHTML = '<div class="news-empty"><div class="news-empty-icon">\u{1F4DC}</div><p>No posts yet. Check back soon, demigod.</p></div>';
                    }
                    allLoaded = true;
                    if (moreWrap) moreWrap.innerHTML = '';
                    return;
                }

                posts.forEach(function(p) {
                    feed.insertAdjacentHTML('beforeend', buildPostCard(p, false));
                });

                currentOffset += posts.length;
                allLoaded = posts.length < POSTS_PER_PAGE;

                // load more button
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

                // re-observe new reveal elements
                Anim.initScrollReveal();
            })
            .catch(function() {
                var feed = document.getElementById('news-feed');
                if (feed && !feed.children.length) {
                    feed.innerHTML = '<div class="news-empty"><div class="news-empty-icon">\u26A0</div><p>Could not load posts. Try refreshing.</p></div>';
                }
            });
    }

    // build a single post card html
    function buildPostCard(post, inPinnedSection) {
        var pinClass = post.pinned ? ' pinned' : '';
        var date = formatDate(post.created_at);

        var html = '<div class="post-card' + pinClass + '" data-id="' + post.id + '">';

        // header
        html += '<div class="post-head">';
        html += '<div class="post-title">' + esc(post.title) + '</div>';
        html += '<div class="post-meta">';
        if (post.pinned && !inPinnedSection) html += '<span class="post-pin-badge">\u{1F4CC}</span>';
        if (post.posted_to_discord) html += '<span class="discord-badge">\u{1F4E3} Discord</span>';
        html += '<span class="post-date">' + date + '</span>';
        html += '</div></div>';

        // body
        html += '<div class="post-body">' + formatContent(post.content) + '</div>';

        // attachment
        if (post.file_url) {
            html += '<a href="' + esc(post.file_url) + '" class="post-attachment" target="_blank" download>';
            html += '<span class="attach-icon">\u{1F4CE}</span>';
            html += '<span>' + esc(post.file_name || 'Download') + '</span>';
            html += '</a>';
        }

        // admin controls
        if (isAdmin) {
            html += '<div class="post-admin">';
            html += '<button class="post-action pin-btn" data-action="pin" data-id="' + post.id + '">';
            html += post.pinned ? 'Unpin' : 'Pin';
            html += '</button>';
            if (!post.posted_to_discord) {
                html += '<button class="post-action discord-btn" data-action="discord" data-id="' + post.id + '">Send to Discord</button>';
            }
            html += '<button class="post-action del-btn" data-action="delete" data-id="' + post.id + '">Delete</button>';
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // wire up admin action buttons in a container
    function bindPostActions(container) {
        if (!isAdmin) return;

        var buttons = container.querySelectorAll('.post-action');
        buttons.forEach(function(btn) {
            // skip if already bound
            if (btn._bound) return;
            btn._bound = true;

            btn.addEventListener('click', function() {
                var action = this.getAttribute('data-action');
                var id = this.getAttribute('data-id');

                if (action === 'pin') handlePin(id);
                else if (action === 'delete') handleDelete(id);
                else if (action === 'discord') handleDiscordPost(id);
            });
        });
    }

    function handlePin(id) {
        fetch('/api/news/' + id + '/pin', {
            method: 'PUT',
            credentials: 'include'
        })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            if (res.error) return;
            loadPinned();
            currentOffset = 0;
            allLoaded = false;
            loadPosts(true);
        })
        .catch(function() {});
    }

    function handleDelete(id) {
        if (!confirm('Delete this post? This cannot be undone.')) return;

        fetch('/api/news/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            if (res.error) return;
            // remove from dom
            var card = document.querySelector('.post-card[data-id="' + id + '"]');
            if (card) card.remove();
            loadPinned();
        })
        .catch(function() {});
    }

    function handleDiscordPost(id) {
        var btn = document.querySelector('.post-action.discord-btn[data-id="' + id + '"]');
        if (btn) {
            btn.textContent = 'Sending...';
            btn.disabled = true;
        }

        fetch('/api/news/' + id + '/discord', {
            method: 'POST',
            credentials: 'include'
        })
        .then(function(r) { return r.json(); })
        .then(function(res) {
            if (res.error) {
                if (btn) { btn.textContent = 'Failed'; btn.disabled = false; }
                return;
            }
            if (btn) btn.textContent = 'Sent \u2713';
        })
        .catch(function() {
            if (btn) { btn.textContent = 'Failed'; btn.disabled = false; }
        });
    }


    // helpers

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    function formatContent(text) {
        if (!text) return '';
        // basic: escape html, convert newlines, bold **text**, links
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
        var now = new Date();
        var diff = now - d;

        // within last hour
        if (diff < 3600000) {
            var mins = Math.floor(diff / 60000);
            return mins < 2 ? 'just now' : mins + 'm ago';
        }
        // within today
        if (diff < 86400000) {
            var hrs = Math.floor(diff / 3600000);
            return hrs + 'h ago';
        }
        // within last week
        if (diff < 604800000) {
            var days = Math.floor(diff / 86400000);
            return days + 'd ago';
        }
        // older
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }


    window.NewsPage = render;

})();
