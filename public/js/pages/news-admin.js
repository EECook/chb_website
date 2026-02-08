// admin post page - server info + create announcements

(function() {

    var adminUser = null;

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Admin Post</h1>'
            +       '<p class="portal-subtitle">Manage server info and publish announcements</p>'
            +     '</div>'
            +     '<div id="admin-content">'
            +       '<div style="text-align:center;padding:3rem 0;color:var(--marble-muted)">'
            +         '<div class="spinner" style="margin:0 auto 1rem"></div>'
            +         '<div>Checking permissions\u2026</div>'
            +       '</div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        checkAuth();
        Anim.initScrollReveal();
        return { cleanup: function() {} };
    }

    /* ── AUTH ─────────────────────────────────────── */

    function checkAuth() {
        var container = document.getElementById('admin-content');
        if (!container) return;

        var portalUser = window.PortalSession ? PortalSession.getUsername() : null;
        if (!portalUser) {
            showLocked(container, 'You need to log in through the <a href="/portal" data-link style="color:var(--lightning)">Portal</a> first.');
            return;
        }

        fetch('/api/auth/me?username=' + encodeURIComponent(portalUser))
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(user) {
                if (!user || !user.isAdmin) {
                    showLocked(container, 'This page is restricted to camp administrators.');
                    return;
                }
                adminUser = portalUser;
                buildAdmin(container);
            })
            .catch(function() {
                showLocked(container, 'Could not verify permissions. Try refreshing.');
            });
    }

    function showLocked(container, msg) {
        container.innerHTML = ''
            + '<div style="text-align:center;padding:4rem 1rem">'
            +   '<div style="font-size:2.5rem;margin-bottom:1rem">\u{1F512}</div>'
            +   '<p style="font-size:1.1rem;color:var(--gold-light);font-family:Cinzel,serif;margin-bottom:0.5rem">Access Restricted</p>'
            +   '<p style="color:var(--marble-muted)">' + msg + '</p>'
            + '</div>';
    }

    /* ── ADMIN PANEL ─────────────────────────────── */

    function buildAdmin(container) {
        var html = '';

        /* ── SERVER INFO CARD ── */
        html += '<div class="portal-card reveal" style="margin-bottom:1.5rem">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">';
        html += '<div class="portal-section-label" style="margin:0">\u{1F4E1} Server Information</div>';
        html += '<span style="font-size:0.75rem;color:var(--marble-muted)">Shown on the Camp Bulletin</span>';
        html += '</div>';

        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">';
        html += adminInput('si-ip', 'Server IP', 'play.camphalfblood.net');
        html += adminInput('si-version', 'Minecraft Version', '1.20.1');
        html += '</div>';

        html += '<div style="margin-top:1rem">';
        html += adminInput('si-whitelist', 'Whitelist Info (optional)', 'Run !whitelist in Discord to get whitelisted');
        html += '</div>';

        html += '<div style="margin-top:1.25rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">';
        html += '<button class="login-btn" id="si-save" style="max-width:200px">Save Server Info</button>';
        html += '<span class="login-status" id="si-status"></span>';
        html += '</div>';
        html += '</div>';

        /* ── CREATE POST CARD ── */
        html += '<div class="portal-card reveal">';
        html += '<div class="portal-section-label">\u{1F4DD} Create a Post</div>';

        html += adminInput('post-title', 'Title', 'Announcement title\u2026', 200);
        html += '<div style="margin-top:1rem">' + adminTextarea('post-content', 'Description', 'Write your announcement\u2026\n\nUse **bold** and *italic* for formatting.', 5) + '</div>';
        html += '<div style="margin-top:1rem">' + adminTextarea('post-notes', 'Ending Note (optional)', 'Additional notes, links, disclaimers\u2026', 2) + '</div>';

        /* file upload */
        html += '<div style="margin-top:1.25rem">';
        html += '<label style="font-family:Cinzel,serif;font-size:0.75rem;color:var(--marble-muted);letter-spacing:0.05em;text-transform:uppercase;display:block;margin-bottom:0.5rem">File Attachment (optional)</label>';
        html += '<div class="admin-file-drop" id="file-drop">';
        html += '<input type="file" id="file-input" style="position:absolute;inset:0;opacity:0;cursor:pointer">';
        html += '<div id="file-display">';
        html += '<span style="font-size:1.5rem">\u{1F4CE}</span>';
        html += '<span style="color:var(--marble-muted)">Drop a file here or click to upload</span>';
        html += '<small style="color:var(--marble-muted);opacity:0.6">Modpacks, resource packs, images, documents</small>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        /* options */
        html += '<div style="margin-top:1.25rem;display:flex;gap:1.5rem;flex-wrap:wrap">';
        html += '<label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;color:var(--marble-dim);font-size:0.9rem">';
        html += '<input type="checkbox" id="opt-pin"> <span>\u{1F4CC} Pin this post</span>';
        html += '</label>';
        html += '<label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer;color:var(--marble-dim);font-size:0.9rem">';
        html += '<input type="checkbox" id="opt-discord"> <span>\u{1F4E3} Post to Discord</span>';
        html += '</label>';
        html += '</div>';

        /* submit */
        html += '<div style="margin-top:1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">';
        html += '<button class="login-btn" id="post-submit" style="max-width:250px">Publish Announcement</button>';
        html += '<span class="login-status" id="post-status"></span>';
        html += '</div>';

        html += '</div>';

        html += '<div style="margin-top:1.5rem;padding-bottom:2rem"><a href="/news" class="view-all" data-link>\u2190 Back to Bulletin</a></div>';

        container.innerHTML = html;

        loadServerInfo();
        initFileUpload();

        document.getElementById('si-save').addEventListener('click', saveServerInfo);
        document.getElementById('post-submit').addEventListener('click', publishPost);

        Anim.initScrollReveal();
    }

    /* ── FIELD BUILDERS ──────────────────────────── */

    function adminInput(id, label, placeholder, maxLen) {
        return '<div>'
            + '<label for="' + id + '" style="font-family:Cinzel,serif;font-size:0.75rem;color:var(--marble-muted);letter-spacing:0.05em;text-transform:uppercase;display:block;margin-bottom:0.3rem">' + label + '</label>'
            + '<input type="text" id="' + id + '" placeholder="' + (placeholder || '') + '"'
            + (maxLen ? ' maxlength="' + maxLen + '"' : '')
            + ' style="width:100%;padding:0.6rem 0.75rem;border:1px solid var(--border-subtle);border-radius:8px;background:rgba(10,10,30,0.5);color:var(--marble);font-family:Source Code Pro,monospace;font-size:0.9rem;transition:border-color 0.2s"'
            + ' onfocus="this.style.borderColor=\'var(--gold)\'" onblur="this.style.borderColor=\'var(--border-subtle)\'">'
            + '</div>';
    }

    function adminTextarea(id, label, placeholder, rows) {
        return '<div>'
            + '<label for="' + id + '" style="font-family:Cinzel,serif;font-size:0.75rem;color:var(--marble-muted);letter-spacing:0.05em;text-transform:uppercase;display:block;margin-bottom:0.3rem">' + label + '</label>'
            + '<textarea id="' + id + '" rows="' + (rows || 4) + '" placeholder="' + (placeholder || '') + '"'
            + ' style="width:100%;padding:0.6rem 0.75rem;border:1px solid var(--border-subtle);border-radius:8px;background:rgba(10,10,30,0.5);color:var(--marble);font-family:Crimson Text,serif;font-size:0.95rem;line-height:1.6;resize:vertical;min-height:60px;transition:border-color 0.2s"'
            + ' onfocus="this.style.borderColor=\'var(--gold)\'" onblur="this.style.borderColor=\'var(--border-subtle)\'">'
            + '</textarea></div>';
    }

    /* ── SERVER INFO ─────────────────────────────── */

    function loadServerInfo() {
        fetch('/api/server-info')
            .then(function(r) { return r.json(); })
            .then(function(info) {
                if (info.ip) document.getElementById('si-ip').value = info.ip;
                if (info.version) document.getElementById('si-version').value = info.version;
                if (info.whitelist) document.getElementById('si-whitelist').value = info.whitelist;
            })
            .catch(function() {
                // no saved server info yet, fields stay empty
            });
    }

    function saveServerInfo() {
        var btn = document.getElementById('si-save');
        var status = document.getElementById('si-status');
        btn.disabled = true;
        btn.textContent = 'Saving\u2026';

        fetch('/api/server-info', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ip: document.getElementById('si-ip').value.trim(),
                version: document.getElementById('si-version').value.trim(),
                whitelist: document.getElementById('si-whitelist').value.trim(),
                username: adminUser
            })
        })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.disabled = false;
                btn.textContent = 'Save Server Info';
                setStatus(status, res.error ? res.error : 'Saved!', res.error ? 'error' : 'ok');
            })
            .catch(function() {
                btn.disabled = false;
                btn.textContent = 'Save Server Info';
                setStatus(status, 'Failed to save', 'error');
            });
    }

    /* ── FILE UPLOAD ─────────────────────────────── */

    var selectedFile = null;

    function initFileUpload() {
        var input = document.getElementById('file-input');
        var drop = document.getElementById('file-drop');

        input.addEventListener('change', function() {
            if (this.files && this.files[0]) pickFile(this.files[0]);
        });

        drop.addEventListener('dragover', function(e) { e.preventDefault(); drop.style.borderColor = 'var(--gold)'; });
        drop.addEventListener('dragleave', function() { drop.style.borderColor = ''; });
        drop.addEventListener('drop', function(e) {
            e.preventDefault();
            drop.style.borderColor = '';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
        });
    }

    function pickFile(file) {
        selectedFile = file;
        var size = file.size < 1048576
            ? (file.size / 1024).toFixed(1) + ' KB'
            : (file.size / 1048576).toFixed(1) + ' MB';

        var display = document.getElementById('file-display');
        display.innerHTML = ''
            + '<span style="font-size:1.5rem">\u{1F4C4}</span>'
            + '<span style="color:var(--gold-light);font-family:Source Code Pro,monospace;font-size:0.85rem">' + esc(file.name) + '</span>'
            + '<small style="color:var(--marble-muted)">' + size + '</small>'
            + '<button id="file-clear" style="border:1px solid var(--border-subtle);border-radius:6px;background:transparent;color:var(--marble-muted);padding:0.25rem 0.6rem;font-size:0.75rem;cursor:pointer">\u2715 Remove</button>';

        document.getElementById('file-clear').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearFile();
        });
    }

    function clearFile() {
        selectedFile = null;
        document.getElementById('file-input').value = '';
        document.getElementById('file-display').innerHTML = ''
            + '<span style="font-size:1.5rem">\u{1F4CE}</span>'
            + '<span style="color:var(--marble-muted)">Drop a file here or click to upload</span>'
            + '<small style="color:var(--marble-muted);opacity:0.6">Modpacks, resource packs, images, documents</small>';
    }

    /* ── PUBLISH ─────────────────────────────────── */

    function publishPost() {
        var title = document.getElementById('post-title').value.trim();
        var content = document.getElementById('post-content').value.trim();
        var notes = document.getElementById('post-notes').value.trim();
        var pinned = document.getElementById('opt-pin').checked;
        var toDiscord = document.getElementById('opt-discord').checked;
        var btn = document.getElementById('post-submit');
        var status = document.getElementById('post-status');

        if (!title) { setStatus(status, 'Title is required', 'error'); return; }
        if (!content) { setStatus(status, 'Description is required', 'error'); return; }

        btn.disabled = true;
        btn.textContent = 'Publishing\u2026';
        setStatus(status, '', '');

        // build JSON payload (file URL would be added after upload endpoint exists)
        var payload = {
            title: title,
            content: content,
            notes: notes || null,
            is_pinned: pinned,
            post_to_discord: toDiscord,
            username: adminUser
        };

        if (selectedFile) {
            // try upload endpoint first
            var formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('username', adminUser);

            fetch('/api/upload', { method: 'POST', body: formData })
                .then(function(r) { return r.json(); })
                .then(function(res) {
                    if (res.url) {
                        payload.file_url = res.url;
                        payload.file_name = res.filename || selectedFile.name;
                    }
                    doPost(payload, btn, status);
                })
                .catch(function() {
                    // upload endpoint not wired yet, post without file
                    doPost(payload, btn, status);
                });
        } else {
            doPost(payload, btn, status);
        }
    }

    function doPost(payload, btn, status) {
        fetch('/api/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(function(r) { return r.json(); })
            .then(function(res) {
                btn.disabled = false;
                btn.textContent = 'Publish Announcement';

                if (res.error) {
                    setStatus(status, res.error, 'error');
                    return;
                }

                setStatus(status, 'Published! Redirecting\u2026', 'ok');

                document.getElementById('post-title').value = '';
                document.getElementById('post-content').value = '';
                document.getElementById('post-notes').value = '';
                document.getElementById('opt-pin').checked = false;
                document.getElementById('opt-discord').checked = false;
                clearFile();

                setTimeout(function() { Router.navigate('/news'); }, 1200);
            })
            .catch(function() {
                setStatus(status, 'Failed to publish', 'error');
                btn.disabled = false;
                btn.textContent = 'Publish Announcement';
            });
    }

    /* ── HELPERS ──────────────────────────────────── */

    function setStatus(el, msg, type) {
        if (!el) return;
        el.className = 'login-status' + (type ? ' ' + type : '');
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
