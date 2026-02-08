// portal mail

(function() {

    var mailData = [];

    function render(mount) {
        var username = PortalSession.require(mount);
        if (!username) return { cleanup: function() {} };

        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Camp Mail</h1>'
            +       '<p class="portal-subtitle">Messages, rewards, and divine correspondence</p>'
            +     '</div>'
            +     '<div id="mail-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Checking your mailbox...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        PortalSession.renderBar(mount.querySelector('.portal-inner'));
        loadMail(username);
        Anim.initScrollReveal();

        return { cleanup: function() { closeOverlay(); } };
    }

    function loadMail(username) {
        fetch('/api/player/' + encodeURIComponent(username) + '/mail')
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var container = document.getElementById('mail-content');
                if (!container) return;

                mailData = (res.success && res.data) ? res.data : [];

                if (!mailData.length) {
                    container.innerHTML = ''
                        + '<div class="news-empty">'
                        +   '<div class="news-empty-icon">\u{1F4EC}</div>'
                        +   '<p style="color:var(--gold-light);font-family:Cinzel,serif">Your mailbox is empty</p>'
                        +   '<p style="color:var(--marble-muted);font-size:0.9rem">Divine messages, rewards, and letters from other campers will appear here.</p>'
                        + '</div>'
                        + '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';
                    return;
                }

                var unread = mailData.filter(function(m) { return !m.is_read; }).length;

                var html = '<div class="mail-toolbar">';
                html += '<div class="mail-count">' + mailData.length + ' messages' + (unread ? ', <strong>' + unread + ' unread</strong>' : '') + '</div>';
                html += '<button class="mail-action-btn danger" id="clear-read">Delete all read</button>';
                html += '</div>';

                html += '<div class="mail-list">';
                mailData.forEach(function(m) {
                    html += buildMailItem(m);
                });
                html += '</div>';
                html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

                container.innerHTML = html;

                // bind
                container.querySelectorAll('.mail-item').forEach(function(el) {
                    el.addEventListener('click', function(e) {
                        if (e.target.closest('.mi-delete')) return;
                        openMail(el.getAttribute('data-id'), username);
                    });
                });

                container.querySelectorAll('.mi-delete').forEach(function(btn) {
                    btn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        deleteMail(btn.getAttribute('data-id'), username);
                    });
                });

                var clearBtn = document.getElementById('clear-read');
                if (clearBtn) {
                    clearBtn.addEventListener('click', function() {
                        if (!confirm('Delete all read messages?')) return;
                        clearBtn.textContent = 'Deleting...';
                        clearBtn.disabled = true;
                        fetch('/api/player/' + encodeURIComponent(username) + '/mail/read', { method: 'DELETE' })
                            .then(function() { loadMail(username); })
                            .catch(function() { clearBtn.textContent = 'Failed'; });
                    });
                }

            })
            .catch(function() {
                var container = document.getElementById('mail-content');
                if (container) {
                    container.innerHTML = '<div class="news-empty"><p>Could not load mail.</p></div>';
                }
            });
    }

    function buildMailItem(m) {
        var cls = m.is_read ? 'mail-item' : 'mail-item unread';
        var icon = getMailIcon(m.mail_type);
        var date = formatDate(m.created_at);

        return '<div class="' + cls + '" data-id="' + m.mail_id + '">'
            + '<span class="mi-icon">' + icon + '</span>'
            + '<div class="mi-body">'
            +   '<div class="mi-subject">' + esc(m.subject || 'No subject') + '</div>'
            +   '<div class="mi-from">' + esc(m.sender_name || 'Unknown') + '</div>'
            + '</div>'
            + '<span class="mi-date">' + date + '</span>'
            + '<button class="mi-delete" data-id="' + m.mail_id + '" title="Delete">\u2715</button>'
            + '</div>';
    }

    function openMail(mailId, username) {
        fetch('/api/mail/' + mailId)
            .then(function(r) { return r.json(); })
            .then(function(res) {
                if (!res.success || !res.data) return;
                var m = res.data;

                // mark as read
                if (!m.is_read) {
                    fetch('/api/mail/' + mailId + '/read', { method: 'POST' });
                    var item = document.querySelector('.mail-item[data-id="' + mailId + '"]');
                    if (item) item.classList.remove('unread');
                }

                var overlay = document.createElement('div');
                overlay.className = 'mail-overlay';
                overlay.id = 'mail-overlay';

                overlay.innerHTML = ''
                    + '<div class="mail-detail">'
                    +   '<button class="md-close">\u2715</button>'
                    +   '<div class="md-subject">' + esc(m.subject) + '</div>'
                    +   '<div class="md-meta">From: ' + esc(m.sender_name || 'Unknown') + ' &bull; ' + formatDate(m.created_at) + '</div>'
                    +   '<div class="md-content">' + esc(m.content) + '</div>'
                    +   '<div class="mail-actions">'
                    +     '<button class="mail-action-btn danger" id="overlay-delete">Delete</button>'
                    +   '</div>'
                    + '</div>';

                overlay.querySelector('.md-close').addEventListener('click', closeOverlay);
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay) closeOverlay();
                });

                overlay.querySelector('#overlay-delete').addEventListener('click', function() {
                    deleteMail(mailId, username);
                    closeOverlay();
                });

                document.body.appendChild(overlay);
            });
    }

    function deleteMail(mailId, username) {
        fetch('/api/mail/' + mailId + '?username=' + encodeURIComponent(username), { method: 'DELETE' })
            .then(function() {
                var item = document.querySelector('.mail-item[data-id="' + mailId + '"]');
                if (item) item.remove();
            });
    }

    function closeOverlay() {
        var el = document.getElementById('mail-overlay');
        if (el) el.remove();
    }

    function getMailIcon(type) {
        var icons = {
            'god_claiming': '\u{1F3DB}',
            'divine': '\u26A1',
            'system': '\u2699',
            'reward': '\u{1F381}',
            'daily_reward': '\u{1F381}',
            'cabin_invite': '\u{1F3D5}',
            'shop_order': '\u{1F6D2}',
            'delivery_request': '\u{1F4E6}',
            'delivery_complete': '\u2705',
            'event': '\u{1F3C6}',
            'quest_complete': '\u{1F4DC}',
            'personal': '\u{1F4E8}'
        };
        return icons[type] || '\u{1F4EC}';
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var d = new Date(dateStr);
        var diff = Date.now() - d;
        if (diff < 3600000) { var m = Math.floor(diff / 60000); return m < 2 ? 'just now' : m + 'm ago'; }
        if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
        if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[d.getMonth()] + ' ' + d.getDate();
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.PortalMailPage = render;

})();
