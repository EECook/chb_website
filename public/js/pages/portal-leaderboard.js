// leaderboard

(function() {

    var GODS = {};

    function render(mount) {
        mount.innerHTML = ''
            + '<div class="portal-page">'
            +   '<div class="portal-inner">'
            +     '<div class="portal-header reveal">'
            +       '<h1 class="portal-title">Leaderboard</h1>'
            +       '<p class="portal-subtitle">The wealthiest demigods at camp</p>'
            +     '</div>'
            +     '<div id="lb-content">'
            +       '<div class="news-loading"><div class="spinner"></div><div>Loading rankings...</div></div>'
            +     '</div>'
            +   '</div>'
            + '</div>';

        if (PortalSession.isLoggedIn()) {
            PortalSession.renderBar(mount.querySelector('.portal-inner'));
        }

        loadLeaderboard();
        Anim.initScrollReveal();

        return { cleanup: function() {} };
    }

    function loadLeaderboard() {
        // fetch gods list for emoji display
        fetch('/api/gods').then(function(r) { return r.json(); }).then(function(res) {
            if (res.success) GODS = res.data || {};
        }).catch(function() {});

        fetch('/api/leaderboard')
            .then(function(r) { return r.json(); })
            .then(function(res) {
                var container = document.getElementById('lb-content');
                if (!container) return;

                var data = (res.success && res.data) ? res.data : [];

                if (!data.length) {
                    container.innerHTML = '<div class="news-empty"><p>No ranking data yet.</p></div>';
                    return;
                }

                var html = '<div class="portal-card reveal">';
                html += '<table class="lb-table">';
                html += '<thead><tr><th>#</th><th>Demigod</th><th>God Parent</th><th>Drachma</th></tr></thead>';
                html += '<tbody>';

                data.forEach(function(p, i) {
                    var rank = i + 1;
                    var rankClass = rank <= 3 ? ' lb-rank-' + rank : '';
                    var godInfo = GODS[p.god_parent] || {};
                    var emoji = godInfo.emoji || '';

                    html += '<tr>';
                    html += '<td class="lb-rank' + rankClass + '">' + rank + '</td>';
                    html += '<td class="lb-name">' + esc(p.mc_username || p.username) + '</td>';
                    html += '<td class="lb-god">' + emoji + ' ' + esc(p.god_parent || 'Unclaimed') + '</td>';
                    html += '<td class="lb-drachma">' + (p.drachma || 0).toLocaleString() + '</td>';
                    html += '</tr>';
                });

                html += '</tbody></table></div>';
                html += '<div class="portal-back"><a href="/portal" class="view-all" data-link>\u2190 Back to Portal</a></div>';

                container.innerHTML = html;
                Anim.initScrollReveal();
            })
            .catch(function() {
                var container = document.getElementById('lb-content');
                if (container) {
                    container.innerHTML = '<div class="news-empty"><p>Could not load leaderboard.</p></div>';
                }
            });
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.PortalLeaderboardPage = render;

})();
