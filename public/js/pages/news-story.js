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
                        'Camp is running surprisingly well on its own;',
                        'cabins are active, campers are training, and daily life continues --',
                        'But there\'s a noticeable absence of divine supervision.',
                        '',
                        'No direct orders. No watchful eyes. No guidance from above.',
                        'Camp isn\'t in peril... yet.'
                    ]
                },
                {
                    icon: '\u{1F3AF}',
                    heading: 'What You Can Do Right Now',
                    lines: [
                        'Questlines are available immediately',
                        'Explore camp, meet NPCs, and begin uncovering threads that may matter later',
                        'Pay attention to details -- not everything is as simple as it first appears',
                        'Prepare for Team Tournaments by refining your skills and progressing through the game in Minecraft and Discord'
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
