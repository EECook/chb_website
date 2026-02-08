// nav visibility and mobile menu

(function() {

    var nav = document.getElementById('main-nav');
    var toggle = document.getElementById('mobile-toggle');
    var menu = document.getElementById('mobile-menu');
    var isVisible = false;
    var isScrolled = false;
    var menuOpen = false;

    function update() {
        var scroll = window.scrollY;
        var threshold = window.innerHeight * 0.7;
        var onHome = location.pathname === '/' || location.pathname === '';

        // on home: nav shows after scrolling past hero
        // on other pages: always show
        var shouldShow = onHome ? scroll > threshold : true;

        if (shouldShow !== isVisible) {
            isVisible = shouldShow;
            nav.classList.toggle('visible', shouldShow);
        }

        var scrolled = scroll > 50;
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            nav.classList.toggle('scrolled', scrolled);
        }
    }

    window.addEventListener('scroll', update, { passive: true });

    // re-evaluate on route change
    window.addEventListener('routechange', function() {
        update();
        closeMenu();
    });

    // mobile toggle
    if (toggle) {
        toggle.addEventListener('click', function() {
            menuOpen = !menuOpen;
            toggle.classList.toggle('active', menuOpen);
            menu.classList.toggle('active', menuOpen);
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        });
    }

    // close on mobile link click
    if (menu) {
        menu.addEventListener('click', function(e) {
            if (e.target.hasAttribute('data-link')) closeMenu();
        });
    }

    function closeMenu() {
        menuOpen = false;
        if (toggle) toggle.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // initial check
    update();

})();
