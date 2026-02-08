// portal session helper

(function() {

    var SESSION_KEY = 'chb_portal_user';

    window.PortalSession = {
        get: function() {
            try {
                var raw = sessionStorage.getItem(SESSION_KEY);
                if (!raw) return null;
                return JSON.parse(raw);
            } catch(e) { return null; }
        },

        set: function(username, discordId) {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify({
                username: username,
                discord_id: discordId || null,
                time: Date.now()
            }));
        },

        clear: function() {
            sessionStorage.removeItem(SESSION_KEY);
        },

        getUsername: function() {
            var s = this.get();
            return s ? s.username : null;
        },

        isLoggedIn: function() {
            return !!this.getUsername();
        },

        // builds the logged-in bar shown on portal pages
        renderBar: function(container) {
            var user = this.getUsername();
            if (!user) return;

            var bar = document.createElement('div');
            bar.className = 'logged-in-bar';
            bar.innerHTML = '<span>Logged in as <span class="lib-user">' + esc(user) + '</span></span>'
                + '<button class="lib-logout">Sign out</button>';

            bar.querySelector('.lib-logout').addEventListener('click', function() {
                PortalSession.clear();
                Router.navigate('/portal');
            });

            container.prepend(bar);
        },

        // redirect to login if not logged in, returns username or null
        require: function(mount) {
            var user = this.getUsername();
            if (!user) {
                mount.innerHTML = ''
                    + '<div class="portal-page">'
                    +   '<div class="portal-inner">'
                    +     '<div class="news-empty">'
                    +       '<div class="news-empty-icon">\u{1F512}</div>'
                    +       '<p style="font-size:1.1rem;color:var(--gold-light);margin-bottom:0.5rem">Login Required</p>'
                    +       '<p>You need to log in through the Portal to view this page.</p>'
                    +       '<div style="margin-top:1.5rem">'
                    +         '<a href="/portal" class="cta-primary" data-link style="display:inline-flex;padding:0.6rem 1.5rem;font-size:0.9rem">\u{1F300} Go to Portal</a>'
                    +       '</div>'
                    +     '</div>'
                    +   '</div>'
                    + '</div>';
                return null;
            }
            return user;
        }
    };

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

})();
