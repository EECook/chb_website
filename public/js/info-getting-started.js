// Getting Started — New Player Guide
(function() {

function render(mount) {
    mount.innerHTML = ''
        + '<div class="gs-page">'
        +   '<div class="gs-hero">'
        +     '<div class="gs-hero-glow"></div>'
        +     '<div class="gs-hero-content reveal">'
        +       '<div class="gs-ornament"><div class="ornament-line"></div><span>\u2726 NEW CAMPER \u2726</span><div class="ornament-line"></div></div>'
        +       '<h1 class="gs-title">Getting Started</h1>'
        +       '<p class="gs-subtitle">Your journey to Camp Half-Blood begins here</p>'
        +     '</div>'
        +   '</div>'

        // Server banner
        +   '<div class="gs-banner reveal">'
        +     '<div class="gs-banner-inner">'
        +       '<div class="gs-banner-item">'
        +         '<span class="gs-banner-label">Server IP</span>'
        +         '<span class="gs-banner-value gs-copyable" data-copy="play.camphb.net">play.camphb.net<span class="gs-copy-icon">\u{1F4CB}</span></span>'
        +       '</div>'
        +       '<div class="gs-banner-divider"></div>'
        +       '<div class="gs-banner-item">'
        +         '<span class="gs-banner-label">Version</span>'
        +         '<span class="gs-banner-value">1.20.1</span>'
        +       '</div>'
        +       '<div class="gs-banner-divider"></div>'
        +       '<div class="gs-banner-item">'
        +         '<span class="gs-banner-label">Modpack</span>'
        +         '<span class="gs-banner-value">Camp Half Blood 2 on CurseForge</span>'
        +       '</div>'
        +       '<div class="gs-banner-divider"></div>'
        +       '<div class="gs-banner-item">'
        +         '<span class="gs-banner-label">Mod Loader</span>'
        +         '<span class="gs-banner-value">Forge</span>'
        +       '</div>'
        +     '</div>'
        +   '</div>'

        // Steps
        +   '<div class="gs-path">'
        +     '<div class="gs-path-line"></div>'
        +     buildStep(1, '\u{1F4DD}', 'Request Whitelist',
                'Head over to <strong>#whitelist-request</strong> in Discord and submit your Minecraft username. An admin will get you added.',
                null, 'Start here once you\u2019re in the Discord')
        +     buildStep(2, '\u{1F4E6}', 'Install the Modpack',
                'Download <strong>Camp Half Blood 2</strong> from CurseForge. You can find the direct link pinned in the <strong>Camper Bulletin</strong> page on this site, or in Discord announcements.',
                null, 'Requires Forge for Minecraft 1.20.1')
        +     buildStep(3, '\u{1F517}', 'Link Your Account',
                'Connect your Discord and Minecraft accounts so everything stays in sync.',
                '!mclink YourUsername', null)
        +     buildStep(4, '\u{1F300}', 'Set Up Your Portal',
                'Visit the <strong>Portal</strong> page on this site to create your camper profile. You\u2019ll log in using a one-time token from Discord.',
                null, null)
        +     buildStep(5, '\u{1F52E}', 'Discover Your Godly Parent',
                'Take the claiming quiz to find out which Olympian god is your parent. Available in Discord or on the website.',
                '!quiz', 'This determines your cabin, powers, and storyline')
        +     buildStep(6, '\u{1F464}', 'Check Your Profile',
                'See your camper hub \u2014 stats, drachma balance, divine favor, and more.',
                '!profile', null)
        +     buildStep(7, '\u{1F3AE}', 'Earn Drachma',
                'Play minigames to earn the server\u2019s currency. Spend it at shops, bet in the arena, or trade with other campers.',
                '!games', null)
        +     buildStep(8, '\u{1F4DC}', 'Log Your Story',
                'Record lore events as your character\u2019s story unfolds. View the full camp timeline on the site.',
                '!timeline', null)
        +     buildStep(9, '\u{1F4C5}', 'Schedule Events',
                'Organize group quests, cabin activities, or server-wide events with other campers.',
                '!events', null)
        +     buildStep(10, '\u2694\uFE0F', 'Fight for Glory',
                'Challenge other demigods to battle at the arena. Place bets, earn glory, prove yourself.',
                '!arena', null)
        +   '</div>'

        // Closing
        +   '<div class="gs-closing reveal">'
        +     '<div class="gs-closing-line"></div>'
        +     '<p class="gs-closing-text">Once you\u2019re in-game, the <strong>quest system</strong> will guide you through everything else. Explore camp, meet other campers, and find your path.</p>'
        +     '<div class="gs-closing-links">'
        +       '<a href="/news" class="cta-secondary" data-link>\u{1F4DC} Camper Bulletin</a>'
        +       '<a href="/news/quests" class="cta-secondary" data-link>\u{1F5FA} Quest Tree</a>'
        +       '<a href="/portal" class="cta-secondary" data-link>\u{1F300} Portal</a>'
        +     '</div>'
        +   '</div>'

        + '</div>';

    // Copyable commands
    mount.querySelectorAll('.gs-cmd').forEach(function(el) {
        el.addEventListener('click', function() {
            var text = this.getAttribute('data-cmd');
            navigator.clipboard.writeText(text).then(function() {
                el.classList.add('copied');
                setTimeout(function() { el.classList.remove('copied'); }, 1500);
            });
        });
    });

    mount.querySelectorAll('.gs-copyable').forEach(function(el) {
        el.addEventListener('click', function() {
            var text = this.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(function() {
                el.classList.add('copied');
                setTimeout(function() { el.classList.remove('copied'); }, 1500);
            });
        });
    });

    // Reveal animation
    requestAnimationFrame(function() {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.15 });
        mount.querySelectorAll('.reveal, .gs-step').forEach(function(el) { obs.observe(el); });
    });

    return { cleanup: function() {} };
}

function buildStep(num, icon, title, desc, cmd, hint) {
    var h = '<div class="gs-step" style="animation-delay:' + (num * 0.08) + 's">'
        + '<div class="gs-step-marker"><div class="gs-step-dot"><span class="gs-step-num">' + num + '</span></div></div>'
        + '<div class="gs-step-card">'
        +   '<div class="gs-step-icon">' + icon + '</div>'
        +   '<div class="gs-step-body">'
        +     '<h3 class="gs-step-title">' + title + '</h3>'
        +     '<p class="gs-step-desc">' + desc + '</p>';
    if (cmd) {
        h += '<div class="gs-cmd" data-cmd="' + cmd + '"><code>' + cmd + '</code><span class="gs-cmd-copy">click to copy</span><span class="gs-cmd-done">\u2713 copied!</span></div>';
    }
    if (hint) {
        h += '<div class="gs-step-hint">' + hint + '</div>';
    }
    h += '</div></div></div>';
    return h;
}

window.GettingStartedPage = render;
})();
