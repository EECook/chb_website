// story phases

(function() {

    var phases = [
        {
            number: 1,
            title: 'Unsettling Circumstances',
            status: 'current',
            intro: 'As new Demigods arrive and settle into Camp, something feels... off.',
            sections: [
                {
                    icon: '\u{1F3DB}',
                    heading: 'The Gods Are Quiet',
                    lines: [
                        'You\'ve just arrived as a new Demigod and find yourself met with very few faces, it seems most of the Gods running camp are surprisingly absent. This is not normal, this shouldn\'t happen. But not to panic, seasoned campers are here to help.',
                        '',
                        'Despite the Godly absence, camp is running well on its own. You\'re able to take up personal interests and settle in and expand, camp even flourishing despite the tense panic simmering just beneath the surface. You see Gods occasionally, and hope they can help piece together some understanding of what\'s going on. Camp isn\'t in peril... yet. It\'s up to you to uncover its secrets and decide where you stand in the story.'
                    ]
                },
                {
                    icon: '\u{1F3AF}',
                    heading: 'What You Can Do Right Now',
                    lines: [
                        'Questlines are already available and continuing to release for this phase. Complete them and receive rewards in game and climb the ranks of camp.',
                        'Explore camp, meet NPCs, attend courses, build your own shop and make the world yours. Details will be important!',
                        'Join Cabins, acquire skills, build shrines, attend tournaments, there are endless interactions for you to discover.'
                    ],
                    list: true
                }
            ]
        }
        // future phases get added here
    ];

    function render(mount) {
        var html = ''
            + '<div class="news-page">'
            +   '<div class="news-inner">'
            +     '<div class="news-header reveal">'
            +       '<h1 class="news-title">Story Phases</h1>'
            +       '<p class="news-subtitle">The unfolding narrative of Camp Half-Blood</p>'
            +     '</div>'
            +     '<div class="story-timeline">';

        // phase navigation dots
        html += '<div class="phase-nav reveal">';
        phases.forEach(function(p) {
            var cls = p.status === 'current' ? 'phase-dot active' : 'phase-dot';
            html += '<div class="' + cls + '">'
                + '<span class="pd-num">' + p.number + '</span>'
                + '<span class="pd-title">' + esc(p.title) + '</span>'
                + '</div>';
        });
        // future phases placeholder
        html += '<div class="phase-dot locked">'
            + '<span class="pd-num">?</span>'
            + '<span class="pd-title">Coming Soon</span>'
            + '</div>';
        html += '</div>';

        // render each phase
        phases.forEach(function(p) {
            var statusBadge = '';
            if (p.status === 'current') statusBadge = '<span class="phase-badge current">Current Phase</span>';
            else if (p.status === 'complete') statusBadge = '<span class="phase-badge complete">Complete</span>';

            html += '<div class="phase-card reveal">';
            html += '<div class="phase-head">';
            html += '<div class="phase-number">Phase ' + p.number + '</div>';
            html += statusBadge;
            html += '</div>';
            html += '<h2 class="phase-title">' + esc(p.title) + '</h2>';
            html += '<p class="phase-intro">' + esc(p.intro) + '</p>';

            p.sections.forEach(function(s) {
                html += '<div class="phase-section">';
                html += '<h3 class="ps-heading"><span>' + s.icon + '</span> ' + esc(s.heading) + '</h3>';

                if (s.list) {
                    html += '<ul class="ps-list">';
                    s.lines.forEach(function(line) {
                        html += '<li>' + esc(line) + '</li>';
                    });
                    html += '</ul>';
                } else {
                    html += '<div class="ps-body">';
                    s.lines.forEach(function(line) {
                        if (line === '') {
                            html += '<br>';
                        } else {
                            html += '<p>' + esc(line) + '</p>';
                        }
                    });
                    html += '</div>';
                }

                html += '</div>';
            });

            html += '</div>';
        });

        html += '</div>';
        html += '<div class="story-back reveal"><a href="/news" class="view-all" data-link>\u2190 Back to Bulletin</a></div>';
        html += '</div></div>';

        mount.innerHTML = html;
        Anim.initScrollReveal();

        return {
            cleanup: function() {
                var obs = Anim.getRevealObserver();
                if (obs) obs.disconnect();
            }
        };
    }

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.StoryPage = render;

})();
