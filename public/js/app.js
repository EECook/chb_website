// bootstrap

(function() {

    // placeholder for pages not built yet
    function placeholder(title) {
        return function(mount) {
            mount.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:80vh;text-align:center;padding:2rem">'
                + '<h2 style="margin-bottom:1rem">' + title + '</h2>'
                + '<p style="color:var(--marble-muted);max-width:400px;margin-bottom:2rem">This page is under construction. Check back soon, demigod.</p>'
                + '<a href="/" data-link class="cta-secondary">Back to Camp</a></div>';
            return { cleanup: function() {} };
        };
    }

    // register all routes
    Router.register('/', window.HomePage);
    Router.register('/news*', placeholder('News'));
    Router.register('/info*', placeholder('Server Info'));
    Router.register('/integrations*', placeholder('Integrations'));
    Router.register('/portal*', placeholder('Portal'));

    // go
    Router.init();

})();
