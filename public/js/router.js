// spa router using history api

(function() {
    var routes = [];
    var currentHandler = null;
    var overlay = null;

    function init() {
        overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        document.body.appendChild(overlay);

        // intercept link clicks
        document.addEventListener('click', function(e) {
            var link = e.target.closest('[data-link]');
            if (!link) return;

            var href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;

            e.preventDefault();

            if (href === location.pathname) return;
            navigate(href, 'immersive');
        });

        window.addEventListener('popstate', function() {
            loadRoute(location.pathname, 'none');
        });

        // initial load
        loadRoute(location.pathname, 'none');
    }

    function register(pattern, handler) {
        routes.push({ pattern: pattern, handler: handler });
    }

    function navigate(path, transition) {
        history.pushState(null, '', path);
        loadRoute(path, transition || 'fast');
    }

    function findHandler(path) {
        for (var i = 0; i < routes.length; i++) {
            var r = routes[i];
            if (r.pattern === path) return r.handler;

            // wildcard matching
            if (r.pattern.endsWith('*')) {
                var base = r.pattern.slice(0, -1);
                if (path.startsWith(base)) return r.handler;
            }
        }
        return null;
    }

    function loadRoute(path, transition) {
        var handler = findHandler(path);

        if (!handler) {
            // try home as fallback
            handler = findHandler('/');
        }

        if (!handler) return;

        // cleanup previous page
        if (currentHandler && currentHandler.cleanup) {
            currentHandler.cleanup();
        }

        var mount = document.getElementById('app');

        if (transition === 'immersive') {
            overlay.classList.add('active');
            setTimeout(function() {
                renderPage(mount, handler);
                overlay.classList.remove('active');
            }, 350);
        } else if (transition === 'fast') {
            mount.style.opacity = '0';
            setTimeout(function() {
                renderPage(mount, handler);
                mount.style.opacity = '1';
            }, 200);
        } else {
            renderPage(mount, handler);
        }

        window.scrollTo({ top: 0, behavior: transition === 'none' ? 'auto' : 'smooth' });

        // fire custom event for nav etc
        window.dispatchEvent(new CustomEvent('routechange', { detail: { path: path } }));
    }

    function renderPage(mount, handler) {
        mount.className = 'page-enter';
        currentHandler = handler(mount);
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                mount.className = 'page-active';
            });
        });
    }

    // 404 page
    function notFound(mount) {
        mount.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;text-align:center;padding:2rem">' +
            '<h1 style="font-size:4rem;margin-bottom:1rem">404</h1>' +
            '<p style="color:var(--marble-muted);font-size:1.2rem;margin-bottom:2rem">This path leads nowhere, demigod.</p>' +
            '<a href="/" data-link class="cta-secondary">Return to Camp</a></div>';
        return { cleanup: function() {} };
    }

    // expose
    window.Router = {
        init: init,
        register: register,
        navigate: navigate,
        notFound: notFound
    };
})();
