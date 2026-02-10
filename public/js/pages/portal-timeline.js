// Timeline Page -- Celestial Chronicle
// Portal page for viewing, adding, editing, and deleting timeline entries
(function() {

var entries = [];
var categories = [];
var activeFilter = 'all';
var currentUsername = null;   // MC username from portal login
var isAdmin = false;
var editingEntry = null;
var ADMIN_USERS = ['lizzzerd', 'ussdylan'];

// Category display config
var CAT_META = {
    event:        { icon: '\u{1F3C6}', label: 'Event' },
    battle:       { icon: '\u2694\uFE0F', label: 'Battle' },
    quest:        { icon: '\u{1F5FA}\uFE0F', label: 'Quest' },
    lore:         { icon: '\u{1F4DC}', label: 'Lore' },
    update:       { icon: '\u{1F4E1}', label: 'Update' },
    ceremony:     { icon: '\u{1F31F}', label: 'Ceremony' },
    announcement: { icon: '\u{1F4EF}', label: 'Announcement' }
};

function getCatClass(cat) {
    var c = (cat || '').toLowerCase();
    return CAT_META[c] ? 'tl-cat-' + c : 'tl-cat-default';
}
function getCatLabel(cat) {
    var c = (cat || '').toLowerCase();
    return CAT_META[c] ? CAT_META[c].label : (cat || 'General');
}
function getCatIcon(cat) {
    var c = (cat || '').toLowerCase();
    return CAT_META[c] ? CAT_META[c].icon : '\u{1F4CC}';
}

function esc(s) {
    if (!s) return '';
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
}

function formatDate(d) {
    if (!d) return '';
    var dt = new Date(d);
    if (isNaN(dt)) return String(d);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
}

function formatDateInput(d) {
    if (!d) return '';
    var dt = new Date(d);
    if (isNaN(dt)) return '';
    var y = dt.getFullYear();
    var m = String(dt.getMonth() + 1).padStart(2, '0');
    var day = String(dt.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
}

function getYear(d) {
    if (!d) return '';
    var dt = new Date(d);
    return isNaN(dt) ? '' : String(dt.getFullYear());
}

// ── Auth helpers ──
// Reads from the portal session that portal-session.js / portal.js manages
function getStoredUsername() {
    // Method 1: use PortalSession global if available (portal-session.js)
    if (typeof PortalSession !== 'undefined' && PortalSession.getUsername) {
        return PortalSession.getUsername() || '';
    }
    // Method 2: fallback to reading localStorage directly
    try {
        var raw = localStorage.getItem('chb_portal_session');
        if (!raw) return '';
        var session = JSON.parse(raw);
        if (session && session.player) {
            return session.player.mc_username || session.player.username || '';
        }
        if (session && session.username) return session.username;
    } catch (e) {}
    return '';
}

// ── Render entry point ──
function render(mount) {
    mount.innerHTML = buildShell();
    loadSession();
    loadEntries();
    loadCategories();
    bindEvents();
    return { cleanup: function() {} };
}

function buildShell() {
    return '<div class="timeline-page">'
        + '<div class="tl-stars"></div>'
        + '<div class="tl-nebula"></div>'
        + '<div class="tl-nebula-2"></div>'
        + '<div class="tl-header">'
        +   '<div class="tl-header-icon">\u{1F3DB}\uFE0F</div>'
        +   '<h1>The Chronicle</h1>'
        +   '<div class="tl-header-sub">A record of all that has transpired at Camp Half-Blood</div>'
        +   '<div class="tl-header-line"></div>'
        + '</div>'
        + '<div class="tl-toolbar" id="tl-toolbar">'
        +   '<div class="tl-filter-group" id="tl-filters"></div>'
        +   '<button class="tl-add-btn" id="tl-add-btn" style="display:none">'
        +     '+ New Entry'
        +   '</button>'
        + '</div>'
        + '<div class="tl-container" id="tl-container">'
        +   '<div class="tl-spine"></div>'
        +   '<div id="tl-entries">'
        +     '<div class="tl-loading"><div class="tl-spinner"></div>'
        +     '<div class="tl-loading-text">Consulting the Oracle\u2026</div></div>'
        +   '</div>'
        + '</div>'
        + '<div class="tl-modal-overlay" id="tl-modal">'
        +   '<div class="tl-modal" id="tl-modal-inner"></div>'
        + '</div>'
        + '<div class="tl-toast" id="tl-toast"></div>'
        + '</div>';
}

function loadSession() {
    var username = getStoredUsername();
    if (!username) return;

    currentUsername = username;
    isAdmin = ADMIN_USERS.indexOf(username.toLowerCase()) >= 0;

    // Show add button for logged-in users
    var addBtn = document.getElementById('tl-add-btn');
    if (addBtn) addBtn.style.display = '';
}

function loadEntries() {
    var endpoint = '/api/public/timeline';
    if (activeFilter !== 'all') endpoint += '?category=' + encodeURIComponent(activeFilter);

    fetch(endpoint)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            entries = data.data || data.entries || data || [];
            if (!Array.isArray(entries)) entries = [];
            renderEntries();
        })
        .catch(function(err) {
            console.error('[Timeline] Load error:', err);
            entries = [];
            renderEntries();
        });
}

function loadCategories() {
    fetch('/api/public/timeline/categories')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            categories = data.data || data.categories || data || [];
            if (!Array.isArray(categories)) categories = [];
            renderFilters();
        })
        .catch(function() {
            categories = [];
            renderFilters();
        });
}

function renderFilters() {
    var el = document.getElementById('tl-filters');
    if (!el) return;

    var h = '<button class="tl-filter-btn' + (activeFilter === 'all' ? ' active' : '') + '" data-cat="all">All</button>';

    var allCats = Object.keys(CAT_META);
    categories.forEach(function(c) {
        var lower = c.toLowerCase();
        if (allCats.indexOf(lower) < 0) allCats.push(lower);
    });

    allCats.forEach(function(c) {
        h += '<button class="tl-filter-btn' + (activeFilter === c ? ' active' : '') + '" data-cat="' + esc(c) + '">'
            + getCatIcon(c) + ' ' + getCatLabel(c) + '</button>';
    });

    el.innerHTML = h;

    el.querySelectorAll('.tl-filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            activeFilter = this.getAttribute('data-cat');
            renderFilters();
            loadEntries();
        });
    });
}

function renderEntries() {
    var el = document.getElementById('tl-entries');
    if (!el) return;

    if (!entries.length) {
        el.innerHTML = '<div class="tl-empty">'
            + '<div class="tl-empty-icon">\u{1F3DB}\uFE0F</div>'
            + '<div class="tl-empty-text">The scrolls are empty</div>'
            + '<div class="tl-empty-sub">No entries recorded' + (activeFilter !== 'all' ? ' for this category' : '') + '</div>'
            + '</div>';
        return;
    }

    // Sort by event_date descending
    entries.sort(function(a, b) {
        var da = new Date(a.event_date || a.created_at || 0);
        var db = new Date(b.event_date || b.created_at || 0);
        return db - da;
    });

    var h = '';
    var lastYear = '';
    var delay = 0;

    entries.forEach(function(entry) {
        var entryDate = entry.event_date || entry.created_at;
        var year = getYear(entryDate);

        if (year && year !== lastYear) {
            h += '<div class="tl-entry is-year" style="animation-delay:' + delay + 's">'
                + '<div class="tl-year-marker"><span>' + esc(year) + '</span></div>'
                + '</div>';
            lastYear = year;
            delay += 0.06;
        }

        var cat = (entry.category || entry.entry_type || 'event').toLowerCase();
        var title = entry.subject || entry.title || 'Untitled';
        var desc = entry.description || entry.content || '';
        var author = entry.username || entry.author_name || 'Unknown';
        var entryId = entry.entry_id || entry.id;

        // Show edit/delete for admins and for the entry's author
        var canEdit = false;
        if (currentUsername) {
            if (isAdmin) canEdit = true;
            if (author && author.toLowerCase() === currentUsername.toLowerCase()) canEdit = true;
        }

        var isLong = desc.length > 180;

        h += '<div class="tl-entry" style="animation-delay:' + delay + 's" data-id="' + entryId + '">'
            + '<div class="tl-branch"></div>'
            + '<div class="tl-dot"></div>'
            + '<div class="tl-card">';

        if (canEdit) {
            h += '<div class="tl-actions">'
                + '<button class="tl-action-btn edit" data-id="' + entryId + '" title="Edit">\u270E</button>'
                + '<button class="tl-action-btn delete" data-id="' + entryId + '" title="Delete">\u2715</button>'
                + '</div>';
        }

        h += '<span class="tl-cat ' + getCatClass(cat) + '">' + getCatIcon(cat) + ' ' + esc(getCatLabel(cat)) + '</span>'
            + '<div class="tl-date">' + esc(formatDate(entryDate)) + '</div>'
            + '<div class="tl-title">' + esc(title) + '</div>'
            + '<div class="tl-desc' + (isLong ? ' clamped' : '') + '" id="tl-desc-' + entryId + '">' + esc(desc) + '</div>';

        if (isLong) {
            h += '<button class="tl-read-more" data-id="' + entryId + '">Read more \u2192</button>';
        }

        h += '<div class="tl-author">'
            + '<div class="tl-author-avatar">\u{1F464}</div>'
            + '<span>' + esc(author) + '</span>'
            + '</div>';

        h += '</div></div>';
        delay += 0.08;
    });

    h += '<div class="tl-end-ornament">'
        + '<div class="tl-end-ornament-inner">'
        + '<div class="tl-end-ornament-line"></div>'
        + '\u2726 END OF CHRONICLE \u2726'
        + '<div class="tl-end-ornament-line"></div>'
        + '</div></div>';

    el.innerHTML = h;

    // Bind entry actions
    el.querySelectorAll('.tl-action-btn.edit').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var id = parseInt(this.getAttribute('data-id'));
            var entry = entries.find(function(en) { return (en.entry_id || en.id) === id; });
            if (entry) openEditModal(entry);
        });
    });

    el.querySelectorAll('.tl-action-btn.delete').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var id = parseInt(this.getAttribute('data-id'));
            var entry = entries.find(function(en) { return (en.entry_id || en.id) === id; });
            if (entry) openDeleteConfirm(entry);
        });
    });

    el.querySelectorAll('.tl-read-more').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = this.getAttribute('data-id');
            var desc = document.getElementById('tl-desc-' + id);
            if (desc) {
                desc.classList.toggle('clamped');
                this.textContent = desc.classList.contains('clamped') ? 'Read more \u2192' : 'Show less \u2190';
            }
        });
    });
}

// ── MODAL SYSTEM ──

function openModal(html) {
    var overlay = document.getElementById('tl-modal');
    var inner = document.getElementById('tl-modal-inner');
    if (!overlay || !inner) return;
    inner.innerHTML = html;
    overlay.classList.add('open');
}

function closeModal() {
    var overlay = document.getElementById('tl-modal');
    if (overlay) overlay.classList.remove('open');
    editingEntry = null;
}

function openCreateModal() {
    editingEntry = null;
    openModal(buildFormModal('New Chronicle Entry', null));
    bindFormEvents();
}

function openEditModal(entry) {
    editingEntry = entry;
    openModal(buildFormModal('Edit Entry', entry));
    bindFormEvents();
}

function buildFormModal(title, entry) {
    var isEdit = !!entry;

    var allCats = ['event','battle','quest','lore','update','ceremony','announcement'];
    categories.forEach(function(c) {
        var lower = c.toLowerCase();
        if (allCats.indexOf(lower) < 0) allCats.push(lower);
    });
    var catOptions = '';
    allCats.forEach(function(c) {
        var sel = isEdit && (entry.category||'').toLowerCase() === c ? ' selected' : (!isEdit && c === 'event' ? ' selected' : '');
        catOptions += '<option value="' + esc(c) + '"' + sel + '>' + getCatIcon(c) + ' ' + esc(getCatLabel(c)) + '</option>';
    });

    var dateVal = isEdit ? formatDateInput(entry.event_date || entry.created_at) : formatDateInput(new Date());
    var titleVal = isEdit ? esc(entry.subject || entry.title || '') : '';
    var descVal = isEdit ? esc(entry.description || entry.content || '') : '';

    return '<div class="tl-modal-header">'
        + '<div class="tl-modal-title">' + esc(title) + '</div>'
        + '<button class="tl-modal-close" id="tl-modal-close">\u2715</button>'
        + '</div>'
        + '<div class="tl-modal-body">'
        +   '<div class="tl-form-group">'
        +     '<label class="tl-form-label">Title</label>'
        +     '<input class="tl-form-input" id="tl-f-title" type="text" placeholder="A worthy title\u2026" value="' + titleVal + '" maxlength="200">'
        +   '</div>'
        +   '<div style="display:flex;gap:0.75rem">'
        +     '<div class="tl-form-group" style="flex:1">'
        +       '<label class="tl-form-label">Date</label>'
        +       '<input class="tl-form-input" id="tl-f-date" type="date" value="' + dateVal + '">'
        +     '</div>'
        +     '<div class="tl-form-group" style="flex:1">'
        +       '<label class="tl-form-label">Category</label>'
        +       '<select class="tl-form-select" id="tl-f-category">' + catOptions + '</select>'
        +     '</div>'
        +   '</div>'
        +   '<div class="tl-form-group">'
        +     '<label class="tl-form-label">Description</label>'
        +     '<textarea class="tl-form-textarea" id="tl-f-desc" placeholder="What transpired\u2026" maxlength="2000">' + descVal + '</textarea>'
        +   '</div>'
        + '</div>'
        + '<div class="tl-modal-footer">'
        +   '<button class="tl-btn tl-btn-ghost" id="tl-f-cancel">Cancel</button>'
        +   '<button class="tl-btn tl-btn-primary" id="tl-f-save">' + (isEdit ? 'Update' : 'Create') + '</button>'
        + '</div>';
}

function bindFormEvents() {
    var closeBtn = document.getElementById('tl-modal-close');
    var cancelBtn = document.getElementById('tl-f-cancel');
    var saveBtn = document.getElementById('tl-f-save');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    var titleInput = document.getElementById('tl-f-title');
    if (titleInput) setTimeout(function() { titleInput.focus(); }, 100);
}

function handleSave() {
    var title = (document.getElementById('tl-f-title').value || '').trim();
    var date = document.getElementById('tl-f-date').value;
    var category = document.getElementById('tl-f-category').value;
    var desc = (document.getElementById('tl-f-desc').value || '').trim();
    var saveBtn = document.getElementById('tl-f-save');

    if (!title) { toast('Title is required', 'error'); return; }
    if (!date) { toast('Date is required', 'error'); return; }
    if (!currentUsername) { toast('Please log in via the Portal first', 'error'); return; }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving\u2026';

    var payload = {
        subject: title,
        event_date: date,
        category: category,
        description: desc,
        username: currentUsername
    };

    if (editingEntry) {
        var entryId = editingEntry.entry_id || editingEntry.id;
        fetch('/api/timeline/' + entryId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                toast('Entry updated', 'success');
                closeModal();
                loadEntries();
            } else {
                toast(data.error || 'Failed to update', 'error');
                saveBtn.disabled = false;
                saveBtn.textContent = 'Update';
            }
        })
        .catch(function(err) {
            toast('Error: ' + err.message, 'error');
            saveBtn.disabled = false;
            saveBtn.textContent = 'Update';
        });
    } else {
        fetch('/api/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                toast('Entry created', 'success');
                closeModal();
                loadEntries();
                loadCategories();
            } else {
                toast(data.error || 'Failed to create', 'error');
                saveBtn.disabled = false;
                saveBtn.textContent = 'Create';
            }
        })
        .catch(function(err) {
            toast('Error: ' + err.message, 'error');
            saveBtn.disabled = false;
            saveBtn.textContent = 'Create';
        });
    }
}

function openDeleteConfirm(entry) {
    var entryId = entry.entry_id || entry.id;
    var title = entry.subject || entry.title || 'this entry';

    openModal(
        '<div class="tl-modal-header">'
        + '<div class="tl-modal-title">Delete Entry</div>'
        + '<button class="tl-modal-close" id="tl-modal-close">\u2715</button>'
        + '</div>'
        + '<div class="tl-confirm-body">'
        +   '<div class="tl-confirm-icon">\u26A0\uFE0F</div>'
        +   '<div class="tl-confirm-text">Delete \u201C' + esc(title) + '\u201D?</div>'
        +   '<div class="tl-confirm-sub">This cannot be undone.</div>'
        + '</div>'
        + '<div class="tl-modal-footer">'
        +   '<button class="tl-btn tl-btn-ghost" id="tl-del-cancel">Cancel</button>'
        +   '<button class="tl-btn tl-btn-danger" id="tl-del-confirm">Delete</button>'
        + '</div>'
    );

    document.getElementById('tl-modal-close').addEventListener('click', closeModal);
    document.getElementById('tl-del-cancel').addEventListener('click', closeModal);
    document.getElementById('tl-del-confirm').addEventListener('click', function() {
        var btn = this;
        btn.disabled = true;
        btn.textContent = 'Deleting\u2026';

        fetch('/api/timeline/' + entryId + '?username=' + encodeURIComponent(currentUsername), {
            method: 'DELETE'
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                toast('Entry deleted', 'success');
                closeModal();
                loadEntries();
            } else {
                toast(data.error || 'Failed to delete', 'error');
                btn.disabled = false;
                btn.textContent = 'Delete';
            }
        })
        .catch(function(err) {
            toast('Error: ' + err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Delete';
        });
    });
}

// ── TOAST ──
var toastTimer = null;
function toast(msg, type) {
    var el = document.getElementById('tl-toast');
    if (!el) return;
    el.textContent = msg;
    el.className = 'tl-toast' + (type ? ' ' + type : '');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { el.classList.remove('show'); }, 3200);
}

// ── Global events ──
function bindEvents() {
    var addBtn = document.getElementById('tl-add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            if (!currentUsername) {
                toast('Please log in via the Portal first', 'error');
                return;
            }
            openCreateModal();
        });
    }

    var overlay = document.getElementById('tl-modal');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// Export for router
window.TimelinePage = render;

})();
