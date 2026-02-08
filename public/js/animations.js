// visual systems

(function() {

    // starfield
    // renders layered parallax stars on a fixed canvas

    var starCanvas = document.getElementById('star-canvas');
    var starCtx = starCanvas.getContext('2d');
    var stars = [];
    var mouseX = 0.5, mouseY = 0.5;
    var targetMX = 0.5, targetMY = 0.5;
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    function resizeStarCanvas() {
        starCanvas.width = innerWidth * pixelRatio;
        starCanvas.height = innerHeight * pixelRatio;
        starCanvas.style.width = innerWidth + 'px';
        starCanvas.style.height = innerHeight + 'px';
        starCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function pickStarColor() {
        var r = Math.random();
        if (r < 0.6) return [255, 255, 255];
        if (r < 0.75) return [255, 240, 200];
        if (r < 0.85) return [200, 220, 255];
        if (r < 0.93) return [255, 220, 150];
        return [212, 175, 55];
    }

    function buildStars() {
        var count = Math.min(Math.floor((innerWidth * innerHeight) / 2500), 500);
        stars = [];
        for (var i = 0; i < count; i++) {
            var layer = i < count * 0.5 ? 0 : i < count * 0.8 ? 1 : 2;
            var size;
            if (layer === 0) size = 0.5 + Math.random() * 0.8;
            else if (layer === 1) size = 0.8 + Math.random() * 1.2;
            else size = 1.2 + Math.random() * 1.8;

            stars.push({
                bx: Math.random() * innerWidth,
                by: Math.random() * innerHeight,
                size: size,
                layer: layer,
                twinkleSpeed: 0.5 + Math.random() * 2,
                twinkleOffset: Math.random() * Math.PI * 2,
                brightness: 0.3 + Math.random() * 0.7,
                color: pickStarColor()
            });
        }
    }

    function drawStars() {
        mouseX += (targetMX - mouseX) * 0.03;
        mouseY += (targetMY - mouseY) * 0.03;

        starCtx.clearRect(0, 0, innerWidth, innerHeight);

        var now = Date.now() / 1000;
        var parallaxAmounts = [5, 15, 30];
        var style = getComputedStyle(document.documentElement);
        var todOpacity = parseFloat(style.getPropertyValue('--tod-star-opacity')) || 1;

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            var px = (mouseX - 0.5) * parallaxAmounts[s.layer];
            var py = (mouseY - 0.5) * parallaxAmounts[s.layer];
            var x = s.bx + px;
            var y = s.by + py;

            var twinkle = 0.5 + 0.5 * Math.sin(now * s.twinkleSpeed + s.twinkleOffset);
            var alpha = s.brightness * twinkle * todOpacity;

            starCtx.beginPath();
            starCtx.arc(x, y, s.size, 0, Math.PI * 2);
            starCtx.fillStyle = 'rgba(' + s.color[0] + ',' + s.color[1] + ',' + s.color[2] + ',' + alpha + ')';
            starCtx.fill();

            // glow on bright foreground stars
            if (s.layer === 2 && alpha > 0.5) {
                starCtx.beginPath();
                starCtx.arc(x, y, s.size * 3, 0, Math.PI * 2);
                starCtx.fillStyle = 'rgba(' + s.color[0] + ',' + s.color[1] + ',' + s.color[2] + ',' + (alpha * 0.15) + ')';
                starCtx.fill();
            }
        }

        requestAnimationFrame(drawStars);
    }

    resizeStarCanvas();
    buildStars();
    drawStars();
    window.addEventListener('resize', function() { resizeStarCanvas(); buildStars(); });
    document.addEventListener('mousemove', function(e) {
        targetMX = e.clientX / innerWidth;
        targetMY = e.clientY / innerHeight;
    });


    // ember trail
    // golden sparks that follow the cursor

    var emberCanvas = document.getElementById('ember-canvas');
    var eCtx = emberCanvas.getContext('2d');
    var embers = [];
    var cursorX = -100, cursorY = -100;
    var prevCX = -100, prevCY = -100;
    var tick = 0;

    function resizeEmberCanvas() {
        emberCanvas.width = innerWidth * pixelRatio;
        emberCanvas.height = innerHeight * pixelRatio;
        emberCanvas.style.width = innerWidth + 'px';
        emberCanvas.style.height = innerHeight + 'px';
        eCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    resizeEmberCanvas();
    window.addEventListener('resize', resizeEmberCanvas);

    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function pickEmberColor() {
        var r = Math.random();
        if (r < 0.65) {
            return { r: 212 + Math.random() * 43, g: 155 + Math.random() * 100, b: 20 + Math.random() * 40 };
        }
        if (r < 0.82) {
            return { r: 240 + Math.random() * 15, g: 220 + Math.random() * 35, b: 150 + Math.random() * 80 };
        }
        if (r < 0.93) {
            return { r: 139 + Math.random() * 50, g: 80 + Math.random() * 40, b: 220 + Math.random() * 35 };
        }
        return { r: 79 + Math.random() * 40, g: 180 + Math.random() * 60, b: 230 + Math.random() * 25 };
    }

    function spawnEmbers(x, y, speed) {
        var count = Math.min(Math.floor(speed / 8) + 1, 4);
        for (var i = 0; i < count; i++) {
            var angle = Math.random() * Math.PI * 2;
            embers.push({
                x: x + Math.cos(angle) * Math.random() * 4,
                y: y + Math.sin(angle) * Math.random() * 4,
                vx: (Math.random() - 0.5) * 1.5 + Math.cos(angle) * 0.5,
                vy: -Math.random() * 2.5 - 0.5,
                size: 1 + Math.random() * 2.5,
                life: 1,
                decay: 0.015 + Math.random() * 0.025,
                color: pickEmberColor(),
                glow: 0.3 + Math.random() * 0.5,
                gravity: -0.02 - Math.random() * 0.02
            });
        }
    }

    function drawEmbers() {
        eCtx.clearRect(0, 0, innerWidth, innerHeight);
        tick++;

        var dx = cursorX - prevCX;
        var dy = cursorY - prevCY;
        var speed = Math.sqrt(dx * dx + dy * dy);
        prevCX = cursorX;
        prevCY = cursorY;

        // spawn on movement
        if (speed > 2 && cursorX > 0) {
            spawnEmbers(cursorX, cursorY, speed);
        }

        // ambient trickle when still
        if (cursorX > 0 && tick % 8 === 0 && speed < 3) {
            embers.push({
                x: cursorX + (Math.random() - 0.5) * 12,
                y: cursorY + (Math.random() - 0.5) * 12,
                vx: (Math.random() - 0.5) * 0.5,
                vy: -Math.random() * 1.2 - 0.3,
                size: 0.8 + Math.random() * 1.2,
                life: 1,
                decay: 0.02 + Math.random() * 0.015,
                color: { r: 212, g: 175, b: 55 },
                glow: 0.2 + Math.random() * 0.3,
                gravity: -0.015
            });
        }

        // cursor glow
        if (cursorX > 0 && speed > 1) {
            var glowA = Math.min(speed / 60, 0.15);
            var grad = eCtx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 60);
            grad.addColorStop(0, 'rgba(212,175,55,' + glowA + ')');
            grad.addColorStop(0.5, 'rgba(212,175,55,' + (glowA * 0.3) + ')');
            grad.addColorStop(1, 'rgba(212,175,55,0)');
            eCtx.fillStyle = grad;
            eCtx.fillRect(cursorX - 60, cursorY - 60, 120, 120);
        }

        // draw each ember
        for (var i = embers.length - 1; i >= 0; i--) {
            var e = embers[i];
            e.x += e.vx;
            e.y += e.vy;
            e.vy += e.gravity;
            e.vx *= 0.98;
            e.life -= e.decay;
            e.size *= 0.995;

            if (e.life <= 0 || e.size < 0.2) {
                embers.splice(i, 1);
                continue;
            }

            var a = e.life * e.life;
            var c = e.color;

            // glow ring
            var gs = e.size * (3 + e.glow * 4);
            var gg = eCtx.createRadialGradient(e.x, e.y, 0, e.x, e.y, gs);
            gg.addColorStop(0, 'rgba(' + ~~c.r + ',' + ~~c.g + ',' + ~~c.b + ',' + (a * e.glow * 0.5) + ')');
            gg.addColorStop(1, 'rgba(' + ~~c.r + ',' + ~~c.g + ',' + ~~c.b + ',0)');
            eCtx.fillStyle = gg;
            eCtx.fillRect(e.x - gs, e.y - gs, gs * 2, gs * 2);

            // core
            eCtx.beginPath();
            eCtx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
            eCtx.fillStyle = 'rgba(' + Math.min(255, ~~c.r + 40) + ',' + Math.min(255, ~~c.g + 30) + ',' + Math.min(255, ~~c.b + 20) + ',' + a + ')';
            eCtx.fill();

            // hot center
            if (e.size > 1.5 && a > 0.5) {
                eCtx.beginPath();
                eCtx.arc(e.x, e.y, e.size * 0.4, 0, Math.PI * 2);
                eCtx.fillStyle = 'rgba(255,255,240,' + (a * 0.7) + ')';
                eCtx.fill();
            }
        }

        if (embers.length > 200) embers.splice(0, embers.length - 200);
        requestAnimationFrame(drawEmbers);
    }

    drawEmbers();


    // time of day system

    var todPresets = [
        { name: 'Night', icon: '\u{1F319}', time: 1 },
        { name: 'Dawn', icon: '\u{1F305}', time: 6.5 },
        { name: 'Morning', icon: '\u{2600}', time: 9 },
        { name: 'Day', icon: '\u{1F324}', time: 13 },
        { name: 'Golden', icon: '\u{1F307}', time: 17 },
        { name: 'Sunset', icon: '\u{1F306}', time: 19 },
        { name: 'Dusk', icon: '\u{1F312}', time: 21 },
        { name: 'Auto', icon: '\u{1F504}', time: null }
    ];
    var todIndex = todPresets.length - 1;

    function lerpColor(a, b, t) {
        if (a === 'transparent' || b === 'transparent') return t < 0.5 ? a : b;
        t = Math.max(0, Math.min(1, t));
        var ra = parseInt(a.slice(1, 3), 16), ga = parseInt(a.slice(3, 5), 16), ba = parseInt(a.slice(5, 7), 16);
        var rb = parseInt(b.slice(1, 3), 16), gb = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
        var r = Math.round(ra + (rb - ra) * t);
        var g = Math.round(ga + (gb - ga) * t);
        var bl = Math.round(ba + (bb - ba) * t);
        return '#' + (r < 16 ? '0' : '') + r.toString(16) + (g < 16 ? '0' : '') + g.toString(16) + (bl < 16 ? '0' : '') + bl.toString(16);
    }

    function getSkyPalette(time) {
        // deep night
        if (time >= 22 || time < 4.5) {
            return { top: '#020010', mid: '#080420', bot: '#0c0828', stars: 1, hz: 'transparent', ho: 0 };
        }
        // pre-dawn
        if (time < 6) {
            var f = (time - 4.5) / 1.5;
            return {
                top: lerpColor('#020010', '#0a0830', f),
                mid: lerpColor('#080420', '#1a1040', f),
                bot: lerpColor('#0c0828', '#2a1535', f),
                stars: 1 - f * 0.3,
                hz: lerpColor('#1a0520', '#4a1530', f),
                ho: f * 0.4
            };
        }
        // dawn
        if (time < 7.5) {
            var f = (time - 6) / 1.5;
            return {
                top: lerpColor('#0a0830', '#1a1848', f),
                mid: lerpColor('#1a1040', '#3a2050', f),
                bot: lerpColor('#2a1535', '#4a2035', f),
                stars: 0.7 - f * 0.4,
                hz: lerpColor('#4a1530', '#c05030', f),
                ho: 0.4 + f * 0.4
            };
        }
        // morning
        if (time < 10) {
            var f = (time - 7.5) / 2.5;
            return {
                top: lerpColor('#1a1848', '#1e2555', f),
                mid: lerpColor('#3a2050', '#2a3060', f),
                bot: lerpColor('#4a2035', '#2a3855', f),
                stars: 0.3 - f * 0.2,
                hz: lerpColor('#c05030', '#d4a040', f),
                ho: 0.8 - f * 0.5
            };
        }
        // day
        if (time < 16) {
            var f = (time - 10) / 6;
            var wave = f < 0.5 ? f * 2 : 2 - f * 2;
            return {
                top: lerpColor('#1e2555', '#152050', wave),
                mid: lerpColor('#2a3060', '#253565', wave),
                bot: lerpColor('#2a3855', '#203050', wave),
                stars: 0.1,
                hz: '#405880',
                ho: 0.15
            };
        }
        // golden hour
        if (time < 18) {
            var f = (time - 16) / 2;
            return {
                top: lerpColor('#1e2555', '#1a1840', f),
                mid: lerpColor('#253565', '#352545', f),
                bot: lerpColor('#203050', '#452030', f),
                stars: 0.1 + f * 0.2,
                hz: lerpColor('#405880', '#d4a030', f),
                ho: 0.15 + f * 0.6
            };
        }
        // sunset
        if (time < 20) {
            var f = (time - 18) / 2;
            return {
                top: lerpColor('#1a1840', '#100a30', f),
                mid: lerpColor('#352545', '#201535', f),
                bot: lerpColor('#452030', '#1a0c28', f),
                stars: 0.3 + f * 0.4,
                hz: lerpColor('#d4a030', '#802020', f),
                ho: 0.75 - f * 0.4
            };
        }
        // dusk
        var f = (time - 20) / 2;
        return {
            top: lerpColor('#100a30', '#020010', f),
            mid: lerpColor('#201535', '#080420', f),
            bot: lerpColor('#1a0c28', '#0c0828', f),
            stars: 0.7 + f * 0.3,
            hz: lerpColor('#802020', '#1a0520', f),
            ho: 0.35 * (1 - f)
        };
    }

    function updateTimeOfDay() {
        var preset = todPresets[todIndex];
        var time;

        if (preset.time !== null) {
            time = preset.time;
        } else {
            var d = new Date();
            time = d.getHours() + d.getMinutes() / 60;
        }

        var p = getSkyPalette(time);
        var root = document.documentElement;
        root.style.setProperty('--tod-sky-top', p.top);
        root.style.setProperty('--tod-sky-mid', p.mid);
        root.style.setProperty('--tod-sky-bottom', p.bot);
        root.style.setProperty('--tod-star-opacity', p.stars);
        root.style.setProperty('--tod-horizon-color', p.hz);
        root.style.setProperty('--tod-horizon-opacity', p.ho);
    }

    function cycleTOD() {
        todIndex = (todIndex + 1) % todPresets.length;
        var preset = todPresets[todIndex];
        var iconEl = document.getElementById('tod-icon');
        var labelEl = document.getElementById('tod-label');
        if (iconEl) iconEl.textContent = preset.icon;
        if (labelEl) labelEl.textContent = preset.name;
        updateTimeOfDay();
    }

    var todBtn = document.getElementById('tod-toggle');
    if (todBtn) todBtn.addEventListener('click', cycleTOD);
    updateTimeOfDay();
    setInterval(updateTimeOfDay, 60000);


    // scroll reveal observer

    var revealObserver = null;

    function initScrollReveal() {
        if (revealObserver) revealObserver.disconnect();

        revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        var els = document.querySelectorAll('.reveal');
        els.forEach(function(el) { revealObserver.observe(el); });
    }


    // weather effects (lightning + shooting stars)

    var weatherTimers = [];

    function startWeather() {
        stopWeather();

        var lightning = document.getElementById('lightning');
        var hero = document.querySelector('.hero');
        if (!lightning || !hero) return;

        function doLightning() {
            var delay = 15000 + Math.random() * 40000;
            var id = setTimeout(function() {
                lightning.classList.add('flash');
                setTimeout(function() { lightning.classList.remove('flash'); }, 600);
                doLightning();
            }, delay);
            weatherTimers.push(id);
        }

        function doShootingStar() {
            var delay = 10000 + Math.random() * 25000;
            var id = setTimeout(function() {
                var el = document.createElement('div');
                el.className = 'shooting-star';

                // pick a direction -- generally downward with horizontal variety
                // 0 = right, 90 = down, 180 = left
                // two pools: down-right (20-70) and down-left (110-160)
                var angle;
                if (Math.random() < 0.5) {
                    angle = 20 + Math.random() * 50;   // streaking down-right
                } else {
                    angle = 110 + Math.random() * 50;  // streaking down-left
                }

                // vary the length and travel distance
                var len = 50 + Math.random() * 80;
                var travel = 250 + Math.random() * 300;
                var speed = 0.8 + Math.random() * 0.8;

                // color variety: mostly white, occasional warm or cool tint
                var r = Math.random();
                var color, glow;
                if (r < 0.6) {
                    color = 'rgba(255,255,255,0.9)';
                    glow = 'rgba(255,255,255,0.5)';
                } else if (r < 0.8) {
                    color = 'rgba(255,240,200,0.9)';
                    glow = 'rgba(255,220,150,0.4)';
                } else if (r < 0.92) {
                    color = 'rgba(200,220,255,0.9)';
                    glow = 'rgba(180,200,255,0.4)';
                } else {
                    color = 'rgba(212,195,120,0.85)';
                    glow = 'rgba(212,175,55,0.35)';
                }

                // position: spawn in upper portion, offset from edges
                el.style.top = (5 + Math.random() * 35) + '%';
                el.style.left = (10 + Math.random() * 70) + '%';
                el.style.width = len + 'px';

                // rotate so the bright end (right side of gradient) points in the travel direction
                el.style.setProperty('--angle', angle + 'deg');
                el.style.background = 'linear-gradient(90deg, transparent, ' + color + ')';
                el.style.boxShadow = '0 0 8px ' + glow;
                el.style.setProperty('--travel', travel + 'px');

                // animate
                el.style.animation = 'shoot-straight ' + speed + 's ease-out forwards';

                hero.appendChild(el);
                setTimeout(function() { if (el.parentNode) el.remove(); }, speed * 1000 + 200);
                doShootingStar();
            }, delay);
            weatherTimers.push(id);
        }

        doLightning();
        doShootingStar();
    }

    function stopWeather() {
        weatherTimers.forEach(function(id) { clearTimeout(id); });
        weatherTimers = [];
    }


    // expose what other modules need
    window.Anim = {
        initScrollReveal: initScrollReveal,
        startWeather: startWeather,
        stopWeather: stopWeather,
        getRevealObserver: function() { return revealObserver; }
    };

})();
