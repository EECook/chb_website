// Mod List Page
(function() {

var activeCat = 'all';
var searchTerm = '';

function render(mount) {
    var data = window.MOD_DATA;
    if (!data) { mount.innerHTML = '<p style="text-align:center;padding:4rem;color:var(--marble-muted)">Mod data not loaded</p>'; return { cleanup: function(){} }; }

    // Count mods per category
    var counts = { all: 0 };
    data.categories.forEach(function(c) { counts[c.id] = 0; });
    data.mods.forEach(function(m) { counts[m.cat] = (counts[m.cat]||0) + 1; counts.all++; });

    var h = '<div class="mods-page">'
        + '<div class="mods-hero">'
        +   '<div class="mods-hero-glow"></div>'
        +   '<div class="mods-hero-content reveal">'
        +     '<div class="gs-ornament"><div class="ornament-line"></div><span>\u2726 FORGE 1.20.1 \u2726</span><div class="ornament-line"></div></div>'
        +     '<h1 class="gs-title">Mod List</h1>'
        +     '<p class="gs-subtitle">' + counts.all + ' mods powering Camp Half-Blood</p>'
        +   '</div>'
        + '</div>'

        // Search
        + '<div class="mods-search-wrap reveal">'
        +   '<div class="mods-search">'
        +     '<span class="mods-search-icon">\u{1F50D}</span>'
        +     '<input type="text" class="mods-search-input" id="mod-search" placeholder="Search mods\u2026" autocomplete="off">'
        +   '</div>'
        + '</div>'

        // Category pills
        + '<div class="mods-cats reveal" id="mod-cats">'
        +   '<button class="mods-cat active" data-cat="all">All <span class="mods-cat-count">' + counts.all + '</span></button>';

    data.categories.forEach(function(c) {
        if (counts[c.id] > 0) {
            h += '<button class="mods-cat" data-cat="' + c.id + '">' + c.icon + ' ' + c.name + ' <span class="mods-cat-count">' + counts[c.id] + '</span></button>';
        }
    });

    h += '</div>'
        + '<div class="mods-grid" id="mod-grid"></div>'
        + '</div>';

    mount.innerHTML = h;
    renderGrid(data);
    bindEvents(mount, data);

    requestAnimationFrame(function() {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
        }, { threshold: 0.1 });
        mount.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
    });

    return { cleanup: function() {} };
}

function renderGrid(data) {
    var grid = document.getElementById('mod-grid');
    if (!grid) return;

    var cats = data.categories;
    var catMap = {};
    cats.forEach(function(c) { catMap[c.id] = c; });

    // Filter
    var filtered = data.mods.filter(function(m) {
        if (activeCat !== 'all' && m.cat !== activeCat) return false;
        if (searchTerm) {
            var s = searchTerm.toLowerCase();
            return m.name.toLowerCase().indexOf(s) >= 0 || (m.desc && m.desc.toLowerCase().indexOf(s) >= 0);
        }
        return true;
    });

    if (!filtered.length) {
        grid.innerHTML = '<div class="mods-empty"><p>No mods found matching \u201C' + esc(searchTerm) + '\u201D</p></div>';
        return;
    }

    // Group by category for "all" view
    var h = '';
    if (activeCat === 'all' && !searchTerm) {
        cats.forEach(function(cat) {
            var catMods = filtered.filter(function(m) { return m.cat === cat.id; });
            if (!catMods.length) return;

            h += '<div class="mods-section">'
                + '<div class="mods-section-header">'
                +   '<span class="mods-section-icon">' + cat.icon + '</span>'
                +   '<div>'
                +     '<h2 class="mods-section-title">' + cat.name + '</h2>'
                +     (cat.desc ? '<p class="mods-section-desc">' + cat.desc + '</p>' : '')
                +   '</div>'
                +   '<span class="mods-section-count">' + catMods.length + '</span>'
                + '</div>'
                + '<div class="mods-section-grid">';

            catMods.forEach(function(m) { h += modCard(m, catMap); });

            h += '</div></div>';
        });
    } else {
        h += '<div class="mods-section"><div class="mods-section-grid">';
        filtered.forEach(function(m) { h += modCard(m, catMap); });
        h += '</div></div>';
    }

    grid.innerHTML = h;

    // Staggered reveal
    grid.querySelectorAll('.mod-card').forEach(function(card, i) {
        card.style.animationDelay = Math.min(i * 0.02, 0.6) + 's';
    });
}

function modCard(m, catMap) {
    var cat = catMap[m.cat];
    var icon = cat ? cat.icon : '\u{1F4E6}';
    return '<div class="mod-card">'
        + '<div class="mod-card-icon">' + icon + '</div>'
        + '<div class="mod-card-body">'
        +   '<div class="mod-card-name">' + esc(m.name) + '</div>'
        +   (m.desc ? '<div class="mod-card-desc">' + esc(m.desc) + '</div>' : '')
        + '</div>'
        + '<span class="mod-card-cat">' + esc(cat ? cat.name : m.cat) + '</span>'
        + '</div>';
}

function bindEvents(mount, data) {
    document.getElementById('mod-search').addEventListener('input', function() {
        searchTerm = this.value.trim();
        renderGrid(data);
    });

    document.getElementById('mod-cats').addEventListener('click', function(e) {
        var btn = e.target.closest('.mods-cat');
        if (!btn) return;
        activeCat = btn.getAttribute('data-cat');
        this.querySelectorAll('.mods-cat').forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-cat') === activeCat); });
        renderGrid(data);
    });
}

function esc(s) { if(!s)return''; var e=document.createElement('span'); e.textContent=s; return e.innerHTML; }

window.ModListPage = render;
})();
