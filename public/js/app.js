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
    Router.register('/news', window.NewsPage);
    Router.register('/news/admin', window.NewsAdminPage);
    Router.register('/news/story', window.StoryPage);
    Router.register('/news/quests', window.QuestTreePage);
    Router.register('/portal', window.PortalPage);
    Router.register('/portal/profile', window.PortalProfilePage);
    Router.register('/portal/mail', window.PortalMailPage);
    Router.register('/portal/leaderboard', window.PortalLeaderboardPage);
    Router.register('/portal/characters', window.PortalCharactersPage);
    Router.register('/info/new-players', window.GettingStartedPage);
    Router.register('/info/mods', window.ModListPage);
    Router.register('/info/origins', window.OriginsPage);
    Router.register('/info/timeline', window.TimelinePage);
    Router.register('/info*', placeholder('Coming Soon'));
    Router.register('/integrations*', placeholder('Integrations'));
    Router.register('/portal*', placeholder('Portal'));
    Router.register('/portal/quiz', window.PortalClaimingPage);
    // go
    Router.init();
})();
