// Quest Tree Viewer - Canvas-based interactive quest map

(function() {

    // ── STATE ─────────────────────────────────────────
    var canvas, ctx, minimapCanvas, minimapCtx;
    var chapters = [];
    var activeChapter = null;
    var questMap = {};  // id -> quest lookup
    var hoveredQuest = null;
    var selectedQuest = null;

    // Camera
    var cam = { x: 0, y: 0, zoom: 1 };
    var targetCam = { x: 0, y: 0, zoom: 1 };
    var isDragging = false;
    var dragStart = { x: 0, y: 0 };
    var lastMouse = { x: 0, y: 0 };

    // Layout
    var CELL = 75;  // pixels per quest coordinate unit
    var NODE_R = 22; // base node radius
    var DPR = 1;

    // Animation
    var animFrame = null;
    var frameCount = 0;
    var particlePool = [];
    var lineAnimProgress = 0;
    var splashTimer = 0;

    // Colors
    var COLORS = {
        nodeFill: '#1a1a3a',
        nodeStroke: '#d4af37',
        nodeHover: '#f0d060',
        nodeSelected: '#ffd700',
        depLine: 'rgba(100, 149, 237, 0.35)',
        depLineHover: 'rgba(100, 149, 237, 0.7)',
        depArrow: 'rgba(100, 149, 237, 0.6)',
        textMain: '#e8e0d0',
        textSub: 'rgba(232, 224, 208, 0.5)',
        gridLine: 'rgba(212, 175, 55, 0.03)',
        bgGlow: 'rgba(212, 175, 55, 0.02)'
    };

    // Task type icons
    var TASK_ICONS = {
        item: '\u{1F4E6}',
        location: '\u{1F4CD}',
        checkmark: '\u2714',
        kill: '\u2694',
        xp: '\u2728',
        stat: '\u{1F4CA}',
        unknown: '\u2753'
    };

    // ── RENDER ENTRY ──────────────────────────────────

    function render(mount) {
        if (!window.QUEST_DATA || !window.QUEST_DATA.length) {
            mount.innerHTML = '<div class="portal-page"><div class="portal-inner" style="text-align:center;padding:4rem 1rem">'
                + '<div style="font-size:2.5rem;margin-bottom:1rem">\u{1F5FA}</div>'
                + '<p style="color:var(--gold-light);font-family:Cinzel,serif;font-size:1.2rem;margin-bottom:0.5rem">Quest data not loaded</p>'
                + '<p style="color:var(--marble-muted)">Quest tree data could not be found.</p>'
                + '</div></div>';
            return { cleanup: function() {} };
        }

        chapters = window.QUEST_DATA;

        mount.innerHTML = ''
            + '<div class="quest-page" id="quest-page">'
            +   '<div class="quest-canvas-wrap" id="quest-canvas-wrap">'
            +     '<canvas id="quest-canvas"></canvas>'
            +   '</div>'
            +   '<div class="quest-tabs" id="quest-tabs"></div>'
            +   '<div class="quest-zoom">'
            +     '<button class="qz-btn" id="qz-in">+</button>'
            +     '<div class="qz-level" id="qz-level">100%</div>'
            +     '<button class="qz-btn" id="qz-out">\u2212</button>'
            +     '<button class="qz-btn" id="qz-fit" title="Fit to view" style="margin-top:0.25rem">\u25A3</button>'
            +   '</div>'
            +   '<div class="quest-minimap" id="quest-minimap">'
            +     '<canvas id="minimap-canvas"></canvas>'
            +   '</div>'
            +   '<div class="quest-splash" id="quest-splash">'
            +     '<div class="qs-title" id="qs-title"></div>'
            +     '<div class="qs-count" id="qs-count"></div>'
            +   '</div>'
            +   '<div class="quest-hint" id="quest-hint">Scroll to zoom \u2022 Drag to pan \u2022 Click a quest for details</div>'
            +   '<div class="quest-detail-overlay" id="quest-overlay">'
            +     '<div class="quest-detail" id="quest-detail"></div>'
            +   '</div>'
            + '</div>';

        initCanvas();
        buildTabs();
        bindEvents();

        // Show first meaningful chapter
        var first = chapters.find(function(c) { return c.quests.length > 1; }) || chapters[0];
        switchChapter(first.filename);

        // Hide hint after 5s
        setTimeout(function() {
            var hint = document.getElementById('quest-hint');
            if (hint) hint.style.opacity = '0';
        }, 5000);

        startRenderLoop();

        return {
            cleanup: function() {
                if (animFrame) cancelAnimationFrame(animFrame);
                animFrame = null;
            }
        };
    }

    // ── CANVAS SETUP ──────────────────────────────────

    function initCanvas() {
        canvas = document.getElementById('quest-canvas');
        ctx = canvas.getContext('2d');
        minimapCanvas = document.getElementById('minimap-canvas');
        minimapCtx = minimapCanvas.getContext('2d');
        DPR = window.devicePixelRatio || 1;
        resizeCanvas();
    }

    function resizeCanvas() {
        var wrap = document.getElementById('quest-canvas-wrap');
        if (!wrap || !canvas) return;
        var w = wrap.clientWidth;
        var h = wrap.clientHeight;
        canvas.width = w * DPR;
        canvas.height = h * DPR;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        // Minimap
        var mm = document.getElementById('quest-minimap');
        if (mm && minimapCanvas) {
            minimapCanvas.width = mm.clientWidth * DPR;
            minimapCanvas.height = mm.clientHeight * DPR;
        }
    }

    // ── TABS ──────────────────────────────────────────

    function buildTabs() {
        var container = document.getElementById('quest-tabs');
        if (!container) return;

        var html = '<a href="/news" class="qt-back" data-link>\u2190</a>';

        chapters.forEach(function(ch) {
            if (ch.quests.length < 1) return;
            var icon = chapterIcon(ch.filename);
            html += '<button class="qt-tab" data-chapter="' + ch.filename + '">'
                + icon + ' ' + ch.title
                + '<span class="qt-count">' + ch.quests.length + '</span>'
                + '</button>';
        });

        container.innerHTML = html;

        container.querySelectorAll('.qt-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                switchChapter(this.getAttribute('data-chapter'));
            });
        });
    }

    function chapterIcon(filename) {
        var icons = {
            story_quests: '\u{1F3E0}',
            the_overworld: '\u{1F30D}',
            the_nether: '\u{1F525}',
            the_end: '\u{1F30C}',
            battle_pass: '\u{1F3C6}',
            armor: '\u{1F6E1}',
            husbandry: '\u{1F33E}',
            alexs_caves: '\u{1F9EB}',
            zues_trials: '\u26A1',
            easter_eggs: '\u{1F95A}',
            hourly_reward: '\u23F0'
        };
        return icons[filename] || '\u{1F5FA}';
    }

    // ── CHAPTER SWITCH ────────────────────────────────

    function switchChapter(filename) {
        var ch = chapters.find(function(c) { return c.filename === filename; });
        if (!ch) return;

        activeChapter = ch;
        selectedQuest = null;
        hoveredQuest = null;

        // Rebuild quest lookup
        questMap = {};
        ch.quests.forEach(function(q) {
            questMap[q.id] = q;
        });

        // Update tabs
        document.querySelectorAll('.qt-tab').forEach(function(tab) {
            tab.classList.toggle('active', tab.getAttribute('data-chapter') === filename);
        });

        // Close detail panel
        closeDetail();

        // Show splash
        showSplash(ch);

        // Reset lines animation
        lineAnimProgress = 0;

        // Fit view
        fitToView(true);
    }

    function showSplash(ch) {
        var splash = document.getElementById('quest-splash');
        var title = document.getElementById('qs-title');
        var count = document.getElementById('qs-count');
        if (!splash) return;

        title.textContent = ch.title;
        count.textContent = ch.quests.length + ' quest' + (ch.quests.length !== 1 ? 's' : '');
        splash.classList.remove('show');

        // Force reflow
        void splash.offsetWidth;
        splash.classList.add('show');

        splashTimer = 60; // frames
    }

    function fitToView(instant) {
        if (!activeChapter || !activeChapter.quests.length) return;

        var quests = activeChapter.quests;
        var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        quests.forEach(function(q) {
            if (q.x < minX) minX = q.x;
            if (q.x > maxX) maxX = q.x;
            if (q.y < minY) minY = q.y;
            if (q.y > maxY) maxY = q.y;
        });

        var w = canvas.width / DPR;
        var h = canvas.height / DPR;
        var padding = 120;

        var spanX = (maxX - minX) * CELL + padding * 2;
        var spanY = (maxY - minY) * CELL + padding * 2;

        var zoomX = w / spanX;
        var zoomY = h / spanY;
        var zoom = Math.min(zoomX, zoomY, 2);
        zoom = Math.max(zoom, 0.15);

        var centerX = (minX + maxX) / 2 * CELL;
        var centerY = (minY + maxY) / 2 * CELL;

        targetCam.x = -centerX;
        targetCam.y = -centerY;
        targetCam.zoom = zoom;

        if (instant) {
            cam.x = targetCam.x;
            cam.y = targetCam.y;
            cam.zoom = targetCam.zoom;
        }
    }

    // ── EVENTS ────────────────────────────────────────

    function bindEvents() {
        var wrap = document.getElementById('quest-canvas-wrap');

        // Resize
        window.addEventListener('resize', resizeCanvas);

        // Mouse drag
        wrap.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            isDragging = true;
            dragStart.x = e.clientX;
            dragStart.y = e.clientY;
            wrap.classList.add('grabbing');
        });

        window.addEventListener('mousemove', function(e) {
            lastMouse.x = e.clientX;
            lastMouse.y = e.clientY;

            if (isDragging) {
                var dx = e.clientX - dragStart.x;
                var dy = e.clientY - dragStart.y;
                targetCam.x += dx / cam.zoom;
                targetCam.y += dy / cam.zoom;
                cam.x = targetCam.x;
                cam.y = targetCam.y;
                dragStart.x = e.clientX;
                dragStart.y = e.clientY;
            }
        });

        window.addEventListener('mouseup', function() {
            isDragging = false;
            wrap.classList.remove('grabbing');
        });

        // Scroll zoom
        wrap.addEventListener('wheel', function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? 0.9 : 1.1;
            var newZoom = targetCam.zoom * delta;
            newZoom = Math.max(0.1, Math.min(3, newZoom));
            targetCam.zoom = newZoom;
        }, { passive: false });

        // Click
        canvas.addEventListener('click', function(e) {
            if (!activeChapter) return;
            var rect = canvas.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;
            var hit = hitTest(mx, my);

            if (hit) {
                selectedQuest = hit;
                showDetail(hit);
            } else {
                closeDetail();
                selectedQuest = null;
            }
        });

        // Hover
        canvas.addEventListener('mousemove', function(e) {
            if (isDragging || !activeChapter) return;
            var rect = canvas.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;
            var hit = hitTest(mx, my);
            hoveredQuest = hit;
            canvas.style.cursor = hit ? 'pointer' : 'grab';
        });

        // Touch support
        var touchStart = null;
        var touchDist = 0;

        wrap.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                touchDist = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
            }
        }, { passive: true });

        wrap.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (e.touches.length === 1 && touchStart) {
                var dx = e.touches[0].clientX - touchStart.x;
                var dy = e.touches[0].clientY - touchStart.y;
                targetCam.x += dx / cam.zoom;
                targetCam.y += dy / cam.zoom;
                cam.x = targetCam.x;
                cam.y = targetCam.y;
                touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                var newDist = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
                if (touchDist > 0) {
                    var scale = newDist / touchDist;
                    targetCam.zoom = Math.max(0.1, Math.min(3, targetCam.zoom * scale));
                }
                touchDist = newDist;
            }
        }, { passive: false });

        wrap.addEventListener('touchend', function(e) {
            if (e.touches.length === 0 && touchStart) {
                // Tap detection
                touchStart = null;
            }
        });

        // Zoom buttons
        document.getElementById('qz-in').addEventListener('click', function() {
            targetCam.zoom = Math.min(3, targetCam.zoom * 1.3);
        });
        document.getElementById('qz-out').addEventListener('click', function() {
            targetCam.zoom = Math.max(0.1, targetCam.zoom / 1.3);
        });
        document.getElementById('qz-fit').addEventListener('click', function() {
            fitToView(false);
        });

        // Overlay close
        document.getElementById('quest-overlay').addEventListener('click', function(e) {
            if (e.target === this) closeDetail();
        });
    }

    // ── HIT TEST ──────────────────────────────────────

    function hitTest(mx, my) {
        if (!activeChapter) return null;
        var w = canvas.width / DPR;
        var h = canvas.height / DPR;

        for (var i = activeChapter.quests.length - 1; i >= 0; i--) {
            var q = activeChapter.quests[i];
            var sx = (q.x * CELL + cam.x) * cam.zoom + w / 2;
            var sy = (q.y * CELL + cam.y) * cam.zoom + h / 2;
            var r = NODE_R * cam.zoom * (q.size > 1 ? Math.min(q.size * 0.6, 2) : 1);

            var dx = mx - sx;
            var dy = my - sy;
            if (dx * dx + dy * dy <= r * r * 1.3) return q;
        }
        return null;
    }

    // ── DETAIL PANEL ──────────────────────────────────

    function showDetail(quest) {
        var overlay = document.getElementById('quest-overlay');
        var panel = document.getElementById('quest-detail');
        if (!overlay || !panel) return;

        var html = '<div class="qd-close"><button class="qd-close-btn" id="qd-close">\u2715</button></div>';
        html += '<div class="qd-body">';

        html += '<div class="qd-title">' + esc(quest.title) + '</div>';
        if (quest.subtitle) html += '<div class="qd-subtitle">' + esc(quest.subtitle) + '</div>';
        if (quest.description) html += '<div class="qd-desc">' + esc(quest.description) + '</div>';

        // Tasks
        if (quest.tasks && quest.tasks.length) {
            html += '<div class="qd-section">';
            html += '<div class="qd-section-label">\u{1F4CB} Tasks</div>';
            quest.tasks.forEach(function(t) {
                var icon = TASK_ICONS[t.type] || TASK_ICONS.unknown;
                var text = t.title || t.item || t.type;
                if (t.count && t.count > 1) text += ' \u00D7' + t.count;
                html += '<div class="qd-task">';
                html += '<span class="qd-task-icon">' + icon + '</span>';
                html += '<div><div class="qd-task-text">' + esc(text) + '</div>';
                html += '<div class="qd-task-type">' + esc(t.type) + '</div></div>';
                html += '</div>';
            });
            html += '</div>';
        }

        // Rewards
        if (quest.rewards && quest.rewards.length) {
            html += '<div class="qd-section">';
            html += '<div class="qd-section-label">\u{1F381} Rewards</div>';
            quest.rewards.forEach(function(r) {
                if (r.xp) {
                    html += '<span class="qd-reward qd-reward-xp">\u2728 ' + r.xp + ' XP</span>';
                } else if (r.item) {
                    var name = r.item.split(':').pop().replace(/_/g, ' ');
                    html += '<span class="qd-reward">\u{1F4E6} ' + esc(name) + '</span>';
                }
            });
            html += '</div>';
        }

        // Dependencies
        if (quest.dependencies && quest.dependencies.length) {
            html += '<div class="qd-section">';
            html += '<div class="qd-section-label">\u{1F517} Requires</div>';
            html += '<div class="qd-deps">';
            quest.dependencies.forEach(function(depId) {
                var dep = questMap[depId];
                var name = dep ? dep.title : depId.substring(0, 8) + '...';
                html += '<span class="qd-dep-chip" data-dep="' + depId + '">' + esc(name) + '</span>';
            });
            html += '</div></div>';
        }

        html += '<div class="qd-id">ID: ' + quest.id + '</div>';
        html += '</div>';

        panel.innerHTML = html;
        overlay.classList.add('open');

        // Close button
        document.getElementById('qd-close').addEventListener('click', closeDetail);

        // Dep chips click
        panel.querySelectorAll('.qd-dep-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var depId = this.getAttribute('data-dep');
                var dep = questMap[depId];
                if (dep) {
                    selectedQuest = dep;
                    // Pan to it
                    targetCam.x = -dep.x * CELL;
                    targetCam.y = -dep.y * CELL;
                    showDetail(dep);
                }
            });
        });
    }

    function closeDetail() {
        var overlay = document.getElementById('quest-overlay');
        if (overlay) overlay.classList.remove('open');
        selectedQuest = null;
    }

    // ── RENDER LOOP ───────────────────────────────────

    function startRenderLoop() {
        function loop() {
            animFrame = requestAnimationFrame(loop);
            update();
            draw();
            frameCount++;
        }
        loop();
    }

    function update() {
        // Smooth camera
        cam.x += (targetCam.x - cam.x) * 0.12;
        cam.y += (targetCam.y - cam.y) * 0.12;
        cam.zoom += (targetCam.zoom - cam.zoom) * 0.12;

        // Line animation
        if (lineAnimProgress < 1) lineAnimProgress += 0.015;

        // Splash timer
        if (splashTimer > 0) splashTimer--;

        // Update zoom level display
        if (frameCount % 10 === 0) {
            var lvl = document.getElementById('qz-level');
            if (lvl) lvl.textContent = Math.round(cam.zoom * 100) + '%';
        }
    }

    function draw() {
        if (!canvas || !ctx || !activeChapter) return;

        var w = canvas.width;
        var h = canvas.height;

        ctx.save();
        ctx.scale(DPR, DPR);

        var cw = w / DPR;
        var ch = h / DPR;

        // Clear
        ctx.fillStyle = '#060614';
        ctx.fillRect(0, 0, cw, ch);

        // Background grid
        drawGrid(cw, ch);

        // Transform to world space
        ctx.save();
        ctx.translate(cw / 2, ch / 2);
        ctx.scale(cam.zoom, cam.zoom);
        ctx.translate(cam.x, cam.y);

        // Draw dependency lines
        drawDependencyLines();

        // Draw nodes
        drawNodes();

        ctx.restore();

        ctx.restore();

        // Draw minimap
        drawMinimap();
    }

    function drawGrid(cw, ch) {
        var gridSpacing = CELL * cam.zoom;
        if (gridSpacing < 10) return; // too zoomed out

        var ox = (cam.x * cam.zoom + cw / 2) % gridSpacing;
        var oy = (cam.y * cam.zoom + ch / 2) % gridSpacing;

        ctx.strokeStyle = COLORS.gridLine;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (var x = ox; x < cw; x += gridSpacing) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ch);
        }
        for (var y = oy; y < ch; y += gridSpacing) {
            ctx.moveTo(0, y);
            ctx.lineTo(cw, y);
        }

        ctx.stroke();
    }

    function drawDependencyLines() {
        var quests = activeChapter.quests;
        var progress = Math.min(lineAnimProgress, 1);

        quests.forEach(function(q) {
            if (!q.dependencies || !q.dependencies.length) return;

            q.dependencies.forEach(function(depId) {
                var dep = questMap[depId];
                if (!dep) return;

                var x1 = dep.x * CELL;
                var y1 = dep.y * CELL;
                var x2 = q.x * CELL;
                var y2 = q.y * CELL;

                // Animate line drawing
                var ex = x1 + (x2 - x1) * progress;
                var ey = y1 + (y2 - y1) * progress;

                var isHighlight = (hoveredQuest && (hoveredQuest.id === q.id || hoveredQuest.id === dep.id))
                    || (selectedQuest && (selectedQuest.id === q.id || selectedQuest.id === dep.id));

                ctx.strokeStyle = isHighlight ? COLORS.depLineHover : COLORS.depLine;
                ctx.lineWidth = isHighlight ? 2.5 : 1.5;

                // Curved line
                ctx.beginPath();
                var midX = (x1 + ex) / 2;
                var midY = (y1 + ey) / 2;
                var dx = ex - x1;
                var dy = ey - y1;

                // Slight curve perpendicular to direction
                var dist = Math.sqrt(dx * dx + dy * dy);
                var curveAmount = Math.min(dist * 0.15, 20);
                var nx = -dy / (dist || 1) * curveAmount;
                var ny = dx / (dist || 1) * curveAmount;

                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(midX + nx, midY + ny, ex, ey);
                ctx.stroke();

                // Arrow head
                if (progress >= 0.95) {
                    var angle = Math.atan2(y2 - (midY + ny), x2 - (midX + nx));
                    var arrowLen = isHighlight ? 10 : 7;
                    var arrowX = x2 - Math.cos(angle) * (NODE_R + 4);
                    var arrowY = y2 - Math.sin(angle) * (NODE_R + 4);

                    ctx.fillStyle = isHighlight ? COLORS.depLineHover : COLORS.depArrow;
                    ctx.beginPath();
                    ctx.moveTo(arrowX, arrowY);
                    ctx.lineTo(arrowX - Math.cos(angle - 0.4) * arrowLen, arrowY - Math.sin(angle - 0.4) * arrowLen);
                    ctx.lineTo(arrowX - Math.cos(angle + 0.4) * arrowLen, arrowY - Math.sin(angle + 0.4) * arrowLen);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        });
    }

    function drawNodes() {
        var quests = activeChapter.quests;
        var time = frameCount * 0.03;

        quests.forEach(function(q) {
            var x = q.x * CELL;
            var y = q.y * CELL;
            var r = NODE_R * (q.size > 1 ? Math.min(q.size * 0.6, 2) : 1);

            var isHovered = hoveredQuest && hoveredQuest.id === q.id;
            var isSelected = selectedQuest && selectedQuest.id === q.id;
            var isConnected = false;

            if (hoveredQuest || selectedQuest) {
                var ref = selectedQuest || hoveredQuest;
                if (ref.dependencies && ref.dependencies.indexOf(q.id) >= 0) isConnected = true;
                if (q.dependencies && q.dependencies.indexOf(ref.id) >= 0) isConnected = true;
            }

            // Glow
            if (isHovered || isSelected) {
                var glowR = r + 15 + Math.sin(time * 2) * 3;
                var glow = ctx.createRadialGradient(x, y, r, x, y, glowR);
                glow.addColorStop(0, isSelected ? 'rgba(255, 215, 0, 0.25)' : 'rgba(212, 175, 55, 0.2)');
                glow.addColorStop(1, 'rgba(212, 175, 55, 0)');
                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(x, y, glowR, 0, Math.PI * 2);
                ctx.fill();
            }

            // Connected glow
            if (isConnected) {
                var cGlow = ctx.createRadialGradient(x, y, r, x, y, r + 10);
                cGlow.addColorStop(0, 'rgba(100, 149, 237, 0.15)');
                cGlow.addColorStop(1, 'rgba(100, 149, 237, 0)');
                ctx.fillStyle = cGlow;
                ctx.beginPath();
                ctx.arc(x, y, r + 10, 0, Math.PI * 2);
                ctx.fill();
            }

            // Node shape
            var shape = q.shape || '';

            ctx.beginPath();

            if (shape === 'diamond') {
                ctx.moveTo(x, y - r);
                ctx.lineTo(x + r, y);
                ctx.lineTo(x, y + r);
                ctx.lineTo(x - r, y);
                ctx.closePath();
            } else if (shape === 'hexagon') {
                for (var i = 0; i < 6; i++) {
                    var angle = Math.PI / 3 * i - Math.PI / 6;
                    var px = x + Math.cos(angle) * r;
                    var py = y + Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
            } else if (shape === 'square') {
                ctx.rect(x - r * 0.8, y - r * 0.8, r * 1.6, r * 1.6);
            } else if (shape === 'none') {
                // Invisible shape - just draw text below
            } else {
                // Default circle
                ctx.arc(x, y, r, 0, Math.PI * 2);
            }

            // Fill
            var fillGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
            fillGrad.addColorStop(0, isSelected ? '#2a2a50' : isHovered ? '#222248' : '#151530');
            fillGrad.addColorStop(1, isSelected ? '#1a1a40' : '#0c0c22');
            ctx.fillStyle = fillGrad;
            if (shape !== 'none') ctx.fill();

            // Stroke
            var strokeColor = isSelected ? COLORS.nodeSelected
                : isHovered ? COLORS.nodeHover
                : isConnected ? 'rgba(100, 149, 237, 0.6)'
                : COLORS.nodeStroke;

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = isSelected ? 2.5 : isHovered ? 2 : 1.2;
            if (shape !== 'none') ctx.stroke();

            // Pulse ring for selected
            if (isSelected) {
                var pulseR = r + 5 + Math.sin(time * 3) * 3;
                ctx.strokeStyle = 'rgba(255, 215, 0, ' + (0.3 + Math.sin(time * 3) * 0.1) + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(x, y, pulseR, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Task type indicator
            var taskIcon = TASK_ICONS[q.taskType] || '';
            if (taskIcon && cam.zoom > 0.4 && shape !== 'none') {
                ctx.font = Math.round(r * 0.7) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(taskIcon, x, y);
            }

            // Title label
            if (cam.zoom > 0.35) {
                var fontSize = Math.max(9, Math.min(12, 11 / cam.zoom * 0.7));
                ctx.font = fontSize + 'px Cinzel, serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';

                var label = q.title;
                if (label.length > 20) label = label.substring(0, 18) + '..';

                // Text shadow
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillText(label, x + 1, y + r + 7);

                ctx.fillStyle = isHovered || isSelected ? COLORS.textMain
                    : isConnected ? 'rgba(100, 149, 237, 0.8)'
                    : COLORS.textSub;
                ctx.fillText(label, x, y + r + 6);
            }
        });
    }

    function drawMinimap() {
        if (!minimapCtx || !activeChapter || !activeChapter.quests.length) return;

        var mw = minimapCanvas.width;
        var mh = minimapCanvas.height;

        minimapCtx.clearRect(0, 0, mw, mh);

        var quests = activeChapter.quests;
        var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        quests.forEach(function(q) {
            if (q.x < minX) minX = q.x;
            if (q.x > maxX) maxX = q.x;
            if (q.y < minY) minY = q.y;
            if (q.y > maxY) maxY = q.y;
        });

        var pad = 1;
        var sx = mw / ((maxX - minX + pad * 2) || 1);
        var sy = mh / ((maxY - minY + pad * 2) || 1);
        var scale = Math.min(sx, sy);

        var ox = (mw - (maxX - minX) * scale) / 2;
        var oy = (mh - (maxY - minY) * scale) / 2;

        // Draw nodes as dots
        quests.forEach(function(q) {
            var x = (q.x - minX) * scale + ox;
            var y = (q.y - minY) * scale + oy;

            minimapCtx.fillStyle = 'rgba(212, 175, 55, 0.6)';
            minimapCtx.beginPath();
            minimapCtx.arc(x, y, 2 * DPR, 0, Math.PI * 2);
            minimapCtx.fill();
        });

        // Draw viewport rectangle
        var cw = canvas.width / DPR;
        var ch = canvas.height / DPR;

        var viewLeft = (-cam.x - cw / 2 / cam.zoom) / CELL;
        var viewTop = (-cam.y - ch / 2 / cam.zoom) / CELL;
        var viewW = cw / cam.zoom / CELL;
        var viewH = ch / cam.zoom / CELL;

        var vx = (viewLeft - minX) * scale + ox;
        var vy = (viewTop - minY) * scale + oy;
        var vw = viewW * scale;
        var vh = viewH * scale;

        minimapCtx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
        minimapCtx.lineWidth = 1 * DPR;
        minimapCtx.strokeRect(vx, vy, vw, vh);
    }

    // ── HELPERS ────────────────────────────────────────

    function esc(str) {
        if (!str) return '';
        var el = document.createElement('span');
        el.textContent = str;
        return el.innerHTML;
    }

    window.QuestTreePage = render;

})();
