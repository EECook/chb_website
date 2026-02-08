// admin post page

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

        return {
            cleanup: function() {
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function checkAuth() {
        var container = document.getElementById('admin-content');
        if (!container) return;

        fetch('/api/auth/me', { credentials: 'include' })
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (!user) {
                    showLocked(container, 'You need to be logged in via the Portal to access this page.');
                    return;
                }
                if (!user.isAdmin) {
                    showLocked(container, 'This page is restricted to camp administrators.');
                    return;
                }
                buildComposer(container);
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

    function buildComposer(container) {
        container.innerHTML = ''
            + '<div class="compose-area reveal" style="border:none;background:none;backdrop-filter:none">'
            +   '<div class="compose-form visible" style="padding:0">'
            +     '<div class="compose-field">'
            +       '<label>Title</label>'
            +       '<input type="text" class="compose-input" id="post-title" placeholder="Post title..." maxlength="200">'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Content</label>'
            +       '<textarea class="compose-input" id="post-content" placeholder="Write your message...\n\nUse **bold** and *italic* markdown. URLs will auto-link."></textarea>'
            +     '</div>'
            +     '<div class="compose-field">'
            +       '<label>Attachment (optional)</label>'
            +       '<div class="file-drop" id="file-drop">'
            +         '<span>\u{1F4CE}</span> <span id="file-label">Drop a file or click to upload</span>'
            +         '<input type="file" id="file-input">'
            +       '</div>'
            +       '<div style="font-size:0.75rem;color:var(--marble-muted);margin-top:0.4rem">Modpacks, resource packs, images, documents -- up to 50MB</div>'
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
                document.getElementById('file-clear').addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectedFile = null;
                    fileInput.value = '';
                    fileDrop.classList.remove('has-file');
                    fileLabel.textContent = 'Drop a file or click to upload';
                });
            }
        });

        // submit
        document.getElementById('submit-post').addEventListener('click', function() {
            var title = document.getElementById('post-title').value.trim();
            var content = document.getElementById('post-content').value.trim();
            var pinned = document.getElementById('opt-pin').checked;
            var toDiscord = document.getElementById('opt-discord').checked;
            var statusEl = document.getElementById('compose-status');
            var btn = this;

            if (!title) { showStatus(statusEl, 'Title is required', 'error'); return; }
            if (!content) { showStatus(statusEl, 'Content is required', 'error'); return; }

            btn.disabled = true;
            showStatus(statusEl, 'Publishing...', '');

            var formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('pinned', pinned ? '1' : '0');
            formData.append('postToDiscord', toDiscord ? '1' : '0');
            if (selectedFile) formData.append('file', selectedFile);

            fetch('/api/news', { method: 'POST', credentials: 'include', body: formData })
                .then(function(r) { return r.json(); })
                .then(function(res) {
                    btn.disabled = false;
                    if (res.error) {
                        showStatus(statusEl, res.error, 'error');
                        return;
                    }

                    showStatus(statusEl, 'Published! Redirecting...', 'ok');

                    // clear
                    document.getElementById('post-title').value = '';
                    document.getElementById('post-content').value = '';
                    document.getElementById('opt-pin').checked = false;
                    document.getElementById('opt-discord').checked = false;
                    selectedFile = null;
                    fileInput.value = '';
                    fileDrop.classList.remove('has-file');
                    fileLabel.textContent = 'Drop a file or click to upload';

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
