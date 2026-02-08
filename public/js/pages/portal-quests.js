// Quest Tree Viewer

(function() {

    var canvas, ctx, minimapCanvas, minimapCtx;
    var chapters = [];
    var activeChapter = null;
    var questMap = {};
    var hoveredQuest = null;
    var selectedQuest = null;

    var cam = { x: 0, y: 0, zoom: 1 };
    var targetCam = { x: 0, y: 0, zoom: 1 };
    var isDragging = false;
    var dragStart = { x: 0, y: 0 };

    var CELL = 75;
    var NODE_R = 22;
    var DPR = 1;
    var animFrame = null;
    var frameCount = 0;
    var lineAnimProgress = 0;

    var COLORS = {
        nodeStroke: '#d4af37', nodeHover: '#f0d060', nodeSelected: '#ffd700',
        depLine: 'rgba(100, 149, 237, 0.35)', depLineHover: 'rgba(100, 149, 237, 0.7)',
        depArrow: 'rgba(100, 149, 237, 0.6)', textMain: '#e8e0d0',
        textSub: 'rgba(232, 224, 208, 0.5)', gridLine: 'rgba(212, 175, 55, 0.03)'
    };

    var TASK_ICONS = {
        item: '\u{1F4E6}', location: '\u{1F4CD}', checkmark: '\u2714',
        kill: '\u2694', xp: '\u2728', stat: '\u{1F4CA}', unknown: '\u2753'
    };

    // Item to emoji mapping for battle pass
    var ITEM_ICONS = {
        'paper': '\u{1F4DC}', 'bundle': '\u{1F392}', 'player_head': '\u{1F464}',
        'diamond_sword': '\u2694', 'netherite_sword': '\u2694', 'bow': '\u{1F3F9}',
        'trident': '\u{1F531}', 'shield': '\u{1F6E1}', 'elytra': '\u{1FA82}',
        'diamond': '\u{1F48E}', 'emerald': '\u{1F48E}', 'gold_ingot': '\u{1F4B0}',
        'iron_ingot': '\u2699', 'ender_pearl': '\u{1F52E}', 'totem_of_undying': '\u{1F3C6}',
        'music_disc': '\u{1F4BF}', 'enchanted_golden_apple': '\u{1F34E}',
        'golden_apple': '\u{1F34E}', 'cooked_chicken': '\u{1F357}', 'bread': '\u{1F35E}',
        'cake': '\u{1F382}', 'cookie': '\u{1F36A}', 'pizza': '\u{1F355}',
        'leather_chestplate': '\u{1F455}', 'leather_leggings': '\u{1F456}',
        'leather_boots': '\u{1F45F}', 'leather_helmet': '\u{1F451}',
        'item_frame': '\u{1F5BC}', 'painting': '\u{1F5BC}', 'book': '\u{1F4D6}',
        'writable_book': '\u{1F4DD}', 'map': '\u{1F5FA}', 'compass': '\u{1FA7C}',
        'clock': '\u{1F552}', 'spyglass': '\u{1F52D}', 'lantern': '\u{1FA94}',
        'campfire': '\u{1F525}', 'bed': '\u{1F6CF}', 'saddle': '\u{1FA84}',
        'name_tag': '\u{1F3F7}', 'lead': '\u{1FA62}', 'bone': '\u{1F9B4}',
        'egg': '\u{1F95A}', 'feather': '\u{1FAB6}', 'string': '\u{1F9F5}',
        'stick': '\u{1FAB5}', 'coal': '\u2B2B', 'redstone': '\u{1F534}',
        'lapis_lazuli': '\u{1F535}', 'slime_ball': '\u{1F7E2}',
        'firework_rocket': '\u{1F386}', 'tnt': '\u{1F4A3}', 'arrow': '\u27A1',
        'potion': '\u{1F9EA}', 'experience_bottle': '\u{1F9EA}',
        'spawn_egg': '\u{1F95A}', 'chest': '\u{1F4E6}'
    };

    // ── RENDER ENTRY ──────────────────────────────────

    function render(mount) {
        if (!window.QUEST_DATA || !window.QUEST_DATA.length) {
            mount.innerHTML = '<div style="text-align:center;padding:4rem"><p style="color:var(--marble-muted)">Quest data not loaded</p></div>';
            return { cleanup: function() {} };
        }

        chapters = window.QUEST_DATA;

        mount.innerHTML = ''
            + '<div class="quest-page" id="quest-page">'
            +   '<div class="quest-tabs" id="quest-tabs"></div>'
            +   '<div id="quest-content"></div>'
            + '</div>';

        buildTabs();

        var first = chapters.find(function(c) { return c.quests.length > 1 && c.filename !== 'battle_pass'; }) || chapters[0];
        switchChapter(first.filename);

        return {
            cleanup: function() {
                if (animFrame) cancelAnimationFrame(animFrame);
                animFrame = null;
            }
        };
    }

    // ── TABS ──────────────────────────────────────────

    function buildTabs() {
        var container = document.getElementById('quest-tabs');
        if (!container) return;

        var iconMap = {
            story_quests: '\u{1F3E0}', the_overworld: '\u{1F30D}', the_nether: '\u{1F525}',
            the_end: '\u{1F30C}', battle_pass: '\u{1F3C6}', armor: '\u{1F6E1}',
            husbandry: '\u{1F33E}', alexs_caves: '\u{1F9EB}', zues_trials: '\u26A1',
            easter_eggs: '\u{1F95A}', hourly_reward: '\u23F0'
        };

        var html = '<a href="/news" class="qt-back" data-link>\u2190</a>';

        chapters.forEach(function(ch) {
            if (ch.quests.length < 1) return;
            var icon = iconMap[ch.filename] || '\u{1F5FA}';
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

    function switchChapter(filename) {
        var ch = chapters.find(function(c) { return c.filename === filename; });
        if (!ch) return;

        if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }

        activeChapter = ch;
        selectedQuest = null;
        hoveredQuest = null;

        questMap = {};
        ch.quests.forEach(function(q) { questMap[q.id] = q; });

        document.querySelectorAll('.qt-tab').forEach(function(tab) {
            tab.classList.toggle('active', tab.getAttribute('data-chapter') === filename);
        });

        if (filename === 'battle_pass') {
            renderBattlePass(ch);
        } else {
            renderCanvasTree(ch);
        }
    }

    // ═══════════════════════════════════════════════════
    // BATTLE PASS RENDERER
    // ═══════════════════════════════════════════════════

    function renderBattlePass(ch) {
        var content = document.getElementById('quest-content');
        if (!content) return;

        // Sort tiers
        var tiers = ch.quests
            .filter(function(q) { return q.title.match(/^Tier \d/); })
            .sort(function(a, b) {
                return parseInt(a.title.replace('Tier ', '')) - parseInt(b.title.replace('Tier ', ''));
            });

        var html = '<div class="bp-container">';

        html += '<div class="bp-header">';
        html += '<h2>\u{1F3C6} Battle Pass</h2>';
        html += '<p>Earn Battle Pass Tokens from quest trees \u2022 ' + tiers.length + ' Tiers</p>';
        html += '</div>';

        html += '<div class="bp-track">';

        // Rows of 10
        var COLS = 10;
        var rowIndex = 0;

        for (var i = 0; i < tiers.length; i += COLS) {
            var row = tiers.slice(i, i + COLS);
            var delay = rowIndex * 0.08;

            html += '<div class="bp-row" style="animation-delay:' + delay + 's">';

            row.forEach(function(tier) {
                var num = parseInt(tier.title.replace('Tier ', ''));
                var isMilestone = num % 10 === 0;
                var isGrand = num === 100;
                var cls = 'bp-tier' + (isGrand ? ' grand' : isMilestone ? ' milestone' : '');

                var reward = getRewardDisplay(tier);

                html += '<div class="' + cls + '" data-quest-id="' + tier.id + '">';
                html += '<div class="bp-tier-num">Tier ' + num + '</div>';
                html += '<div class="bp-tier-icon">' + reward.icon + '</div>';
                html += '<div class="bp-tier-reward">' + esc(reward.name) + '</div>';
                html += '</div>';
            });

            html += '</div>';

            // Add connector between rows
            if (i + COLS < tiers.length) {
                html += '<div class="bp-row-connector" style="animation-delay:' + (delay + 0.04) + 's">';
                html += '<div class="bp-connector-line"></div>';
                html += '</div>';
            }

            rowIndex++;
        }

        html += '</div></div>';

        // Popup
        html += '<div class="bp-detail-popup" id="bp-popup"></div>';

        content.innerHTML = html;

        // Bind hover/click
        content.querySelectorAll('.bp-tier').forEach(function(el) {
            el.addEventListener('mouseenter', function(e) {
                var qId = this.getAttribute('data-quest-id');
                var quest = questMap[qId];
                if (quest) showBPPopup(quest, e);
            });
            el.addEventListener('mouseleave', hideBPPopup);
            el.addEventListener('click', function() {
                var qId = this.getAttribute('data-quest-id');
                var quest = questMap[qId];
                if (quest) showBPPopup(quest, { clientX: this.getBoundingClientRect().left + 50, clientY: this.getBoundingClientRect().top - 10 });
            });
        });
    }

    function getRewardDisplay(quest) {
        if (!quest.rewards || !quest.rewards.length) {
            return { icon: '\u2753', name: 'Mystery' };
        }

        var r = quest.rewards[0];

        if (r.xp) return { icon: '\u2728', name: r.xp + ' XP' };

        if (r.item) {
            var itemId = r.item.split(':').pop();
            var name = itemId.replace(/_/g, ' ');

            // Find matching icon
            var icon = '\u{1F4E6}';
            for (var key in ITEM_ICONS) {
                if (itemId.indexOf(key) >= 0) {
                    icon = ITEM_ICONS[key];
                    break;
                }
            }

            // Special label for battle pass token
            if (itemId === 'paper' && quest.title.match(/^Tier/)) {
                name = 'BP Token';
                icon = '\u{1F4DC}';
            }

            // Capitalize
            name = name.replace(/\b\w/g, function(c) { return c.toUpperCase(); });

            return { icon: icon, name: name };
        }

        return { icon: '\u{1F381}', name: r.type || 'Reward' };
    }

    function showBPPopup(quest, e) {
        var popup = document.getElementById('bp-popup');
        if (!popup) return;

        var html = '<div class="bp-popup-tier">' + esc(quest.title) + '</div>';

        if (quest.description) {
            html += '<div style="font-size:0.85rem;color:var(--marble-dim);margin:0.3rem 0;line-height:1.5">' + esc(quest.description) + '</div>';
        }

        if (quest.rewards && quest.rewards.length) {
            html += '<div class="bp-popup-divider"></div>';
            html += '<div class="bp-popup-section">\u{1F381} Rewards</div>';
            quest.rewards.forEach(function(r) {
                if (r.xp) {
                    html += '<div class="bp-popup-item">\u2728 ' + r.xp + ' XP</div>';
                } else if (r.item) {
                    var name = r.item.split(':').pop().replace(/_/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
                    html += '<div class="bp-popup-item">\u{1F4E6} ' + esc(name) + '</div>';
                }
            });
        }

        if (quest.tasks && quest.tasks.length) {
            html += '<div class="bp-popup-divider"></div>';
            html += '<div class="bp-popup-section">\u{1F4CB} Cost</div>';
            quest.tasks.forEach(function(t) {
                var name = t.item ? t.item.split(':').pop().replace(/_/g, ' ') : t.type;
                var count = t.count || 1;
                html += '<div class="bp-popup-item">' + count + 'x ' + esc(name.replace(/\b\w/g, function(c) { return c.toUpperCase(); })) + '</div>';
            });
        }

        popup.innerHTML = html;

        // Position near element
        var x = e.clientX + 15;
        var y = e.clientY - 10;

        // Keep on screen
        var pw = 280;
        if (x + pw > window.innerWidth - 20) x = e.clientX - pw - 15;
        if (y < 10) y = 10;
        if (y + 200 > window.innerHeight) y = window.innerHeight - 210;

        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        popup.classList.add('visible');
    }

    function hideBPPopup() {
        var popup = document.getElementById('bp-popup');
        if (popup) popup.classList.remove('visible');
    }

    // ═══════════════════════════════════════════════════
    // CANVAS TREE RENDERER
    // ═══════════════════════════════════════════════════

    function renderCanvasTree(ch) {
        var content = document.getElementById('quest-content');
        if (!content) return;

        content.innerHTML = ''
            + '<div class="quest-canvas-area">'
            +   '<div class="quest-canvas-wrap" id="quest-canvas-wrap">'
            +     '<canvas id="quest-canvas"></canvas>'
            +   '</div>'
            +   '<div class="quest-zoom">'
            +     '<button class="qz-btn" id="qz-in">+</button>'
            +     '<div class="qz-level" id="qz-level">100%</div>'
            +     '<button class="qz-btn" id="qz-out">\u2212</button>'
            +     '<button class="qz-btn" id="qz-fit" title="Fit" style="margin-top:0.25rem">\u25A3</button>'
            +   '</div>'
            +   '<div class="quest-minimap" id="quest-minimap">'
            +     '<canvas id="minimap-canvas"></canvas>'
            +   '</div>'
            +   '<div class="quest-splash" id="quest-splash">'
            +     '<div class="qs-title" id="qs-title"></div>'
            +     '<div class="qs-count" id="qs-count"></div>'
            +   '</div>'
            +   '<div class="quest-hint" id="quest-hint">Scroll to zoom \u2022 Drag to pan \u2022 Click a quest</div>'
            +   '<div class="quest-detail-overlay" id="quest-overlay">'
            +     '<div class="quest-detail" id="quest-detail"></div>'
            +   '</div>'
            + '</div>';

        initCanvas();
        bindCanvasEvents();

        lineAnimProgress = 0;
        showSplash(ch);
        fitToView(true);

        setTimeout(function() {
            var hint = document.getElementById('quest-hint');
            if (hint) hint.style.opacity = '0';
        }, 4000);

        startRenderLoop();
    }

    function initCanvas() {
        canvas = document.getElementById('quest-canvas');
        ctx = canvas.getContext('2d');
        minimapCanvas = document.getElementById('minimap-canvas');
        minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;
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

        var mm = document.getElementById('quest-minimap');
        if (mm && minimapCanvas) {
            minimapCanvas.width = mm.clientWidth * DPR;
            minimapCanvas.height = mm.clientHeight * DPR;
        }
    }

    function showSplash(ch) {
        var splash = document.getElementById('quest-splash');
        if (!splash) return;
        document.getElementById('qs-title').textContent = ch.title;
        document.getElementById('qs-count').textContent = ch.quests.length + ' quest' + (ch.quests.length !== 1 ? 's' : '');
        splash.classList.remove('show');
        void splash.offsetWidth;
        splash.classList.add('show');
    }

    function fitToView(instant) {
        if (!activeChapter || !activeChapter.quests.length) return;
        var quests = activeChapter.quests;
        var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        quests.forEach(function(q) {
            if (q.x < minX) minX = q.x; if (q.x > maxX) maxX = q.x;
            if (q.y < minY) minY = q.y; if (q.y > maxY) maxY = q.y;
        });
        var w = canvas.width / DPR, h = canvas.height / DPR, pad = 120;
        var zoomX = w / ((maxX - minX) * CELL + pad * 2);
        var zoomY = h / ((maxY - minY) * CELL + pad * 2);
        var zoom = Math.min(zoomX, zoomY, 2);
        zoom = Math.max(zoom, 0.15);
        targetCam.x = -(minX + maxX) / 2 * CELL;
        targetCam.y = -(minY + maxY) / 2 * CELL;
        targetCam.zoom = zoom;
        if (instant) { cam.x = targetCam.x; cam.y = targetCam.y; cam.zoom = targetCam.zoom; }
    }

    // ── CANVAS EVENTS ─────────────────────────────────

    function bindCanvasEvents() {
        var wrap = document.getElementById('quest-canvas-wrap');
        if (!wrap) return;

        window.addEventListener('resize', resizeCanvas);

        wrap.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            isDragging = true;
            dragStart.x = e.clientX; dragStart.y = e.clientY;
            wrap.classList.add('grabbing');
        });

        window.addEventListener('mousemove', function(e) {
            if (isDragging) {
                targetCam.x += (e.clientX - dragStart.x) / cam.zoom;
                targetCam.y += (e.clientY - dragStart.y) / cam.zoom;
                cam.x = targetCam.x; cam.y = targetCam.y;
                dragStart.x = e.clientX; dragStart.y = e.clientY;
            }
        });

        window.addEventListener('mouseup', function() {
            isDragging = false;
            if (wrap) wrap.classList.remove('grabbing');
        });

        wrap.addEventListener('wheel', function(e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? 0.9 : 1.1;
            targetCam.zoom = Math.max(0.1, Math.min(3, targetCam.zoom * delta));
        }, { passive: false });

        canvas.addEventListener('click', function(e) {
            if (!activeChapter) return;
            var rect = canvas.getBoundingClientRect();
            var hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
            if (hit) { selectedQuest = hit; showDetail(hit); }
            else { closeDetail(); selectedQuest = null; }
        });

        canvas.addEventListener('mousemove', function(e) {
            if (isDragging || !activeChapter) return;
            var rect = canvas.getBoundingClientRect();
            hoveredQuest = hitTest(e.clientX - rect.left, e.clientY - rect.top);
            canvas.style.cursor = hoveredQuest ? 'pointer' : 'grab';
        });

        // Touch
        var touchStart = null, touchDist = 0;
        wrap.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            else if (e.touches.length === 2) touchDist = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
        }, { passive: true });

        wrap.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (e.touches.length === 1 && touchStart) {
                var dx = e.touches[0].clientX - touchStart.x, dy = e.touches[0].clientY - touchStart.y;
                targetCam.x += dx / cam.zoom; targetCam.y += dy / cam.zoom;
                cam.x = targetCam.x; cam.y = targetCam.y;
                touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            } else if (e.touches.length === 2) {
                var nd = Math.hypot(e.touches[1].clientX - e.touches[0].clientX, e.touches[1].clientY - e.touches[0].clientY);
                if (touchDist > 0) targetCam.zoom = Math.max(0.1, Math.min(3, targetCam.zoom * (nd / touchDist)));
                touchDist = nd;
            }
        }, { passive: false });

        document.getElementById('qz-in').addEventListener('click', function() { targetCam.zoom = Math.min(3, targetCam.zoom * 1.3); });
        document.getElementById('qz-out').addEventListener('click', function() { targetCam.zoom = Math.max(0.1, targetCam.zoom / 1.3); });
        document.getElementById('qz-fit').addEventListener('click', function() { fitToView(false); });

        document.getElementById('quest-overlay').addEventListener('click', function(e) {
            if (e.target === this) closeDetail();
        });
    }

    function hitTest(mx, my) {
        if (!activeChapter) return null;
        var w = canvas.width / DPR, h = canvas.height / DPR;
        for (var i = activeChapter.quests.length - 1; i >= 0; i--) {
            var q = activeChapter.quests[i];
            var sx = (q.x * CELL + cam.x) * cam.zoom + w / 2;
            var sy = (q.y * CELL + cam.y) * cam.zoom + h / 2;
            var r = NODE_R * cam.zoom * (q.size > 1 ? Math.min(q.size * 0.6, 2) : 1);
            var dx = mx - sx, dy = my - sy;
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

        if (quest.tasks && quest.tasks.length) {
            html += '<div class="qd-section"><div class="qd-section-label">\u{1F4CB} Tasks</div>';
            quest.tasks.forEach(function(t) {
                var icon = TASK_ICONS[t.type] || TASK_ICONS.unknown;
                var text = t.title || t.item || t.type;
                if (t.count && t.count > 1) text += ' \u00D7' + t.count;
                html += '<div class="qd-task"><span class="qd-task-icon">' + icon + '</span><div><div class="qd-task-text">' + esc(text) + '</div><div class="qd-task-type">' + esc(t.type) + '</div></div></div>';
            });
            html += '</div>';
        }

        if (quest.rewards && quest.rewards.length) {
            html += '<div class="qd-section"><div class="qd-section-label">\u{1F381} Rewards</div>';
            quest.rewards.forEach(function(r) {
                if (r.xp) html += '<span class="qd-reward qd-reward-xp">\u2728 ' + r.xp + ' XP</span>';
                else if (r.item) {
                    var name = r.item.split(':').pop().replace(/_/g, ' ');
                    html += '<span class="qd-reward">\u{1F4E6} ' + esc(name) + '</span>';
                }
            });
            html += '</div>';
        }

        if (quest.dependencies && quest.dependencies.length) {
            html += '<div class="qd-section"><div class="qd-section-label">\u{1F517} Requires</div><div class="qd-deps">';
            quest.dependencies.forEach(function(depId) {
                var dep = questMap[depId];
                var name = dep ? dep.title : depId.substring(0, 8) + '...';
                html += '<span class="qd-dep-chip" data-dep="' + depId + '">' + esc(name) + '</span>';
            });
            html += '</div></div>';
        }

        html += '<div class="qd-id">ID: ' + quest.id + '</div></div>';
        panel.innerHTML = html;
        overlay.classList.add('open');

        document.getElementById('qd-close').addEventListener('click', closeDetail);
        panel.querySelectorAll('.qd-dep-chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var dep = questMap[this.getAttribute('data-dep')];
                if (dep) { selectedQuest = dep; targetCam.x = -dep.x * CELL; targetCam.y = -dep.y * CELL; showDetail(dep); }
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
            cam.x += (targetCam.x - cam.x) * 0.12;
            cam.y += (targetCam.y - cam.y) * 0.12;
            cam.zoom += (targetCam.zoom - cam.zoom) * 0.12;
            if (lineAnimProgress < 1) lineAnimProgress += 0.015;
            if (frameCount % 10 === 0) {
                var lvl = document.getElementById('qz-level');
                if (lvl) lvl.textContent = Math.round(cam.zoom * 100) + '%';
            }
            draw();
            frameCount++;
        }
        loop();
    }

    function draw() {
        if (!canvas || !ctx || !activeChapter) return;
        var w = canvas.width, h = canvas.height;
        ctx.save();
        ctx.scale(DPR, DPR);
        var cw = w / DPR, ch = h / DPR;

        ctx.fillStyle = '#060614';
        ctx.fillRect(0, 0, cw, ch);

        // Grid
        var gs = CELL * cam.zoom;
        if (gs > 10) {
            var ox = (cam.x * cam.zoom + cw / 2) % gs;
            var oy = (cam.y * cam.zoom + ch / 2) % gs;
            ctx.strokeStyle = COLORS.gridLine;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (var x = ox; x < cw; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, ch); }
            for (var y = oy; y < ch; y += gs) { ctx.moveTo(0, y); ctx.lineTo(cw, y); }
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(cw / 2, ch / 2);
        ctx.scale(cam.zoom, cam.zoom);
        ctx.translate(cam.x, cam.y);

        drawDeps();
        drawNodes();

        ctx.restore();
        ctx.restore();

        drawMinimap();
    }

    function drawDeps() {
        var quests = activeChapter.quests;
        var progress = Math.min(lineAnimProgress, 1);

        quests.forEach(function(q) {
            if (!q.dependencies) return;
            q.dependencies.forEach(function(depId) {
                var dep = questMap[depId];
                if (!dep) return;
                var x1 = dep.x * CELL, y1 = dep.y * CELL;
                var x2 = q.x * CELL, y2 = q.y * CELL;
                var ex = x1 + (x2 - x1) * progress, ey = y1 + (y2 - y1) * progress;

                var isHL = (hoveredQuest && (hoveredQuest.id === q.id || hoveredQuest.id === dep.id))
                    || (selectedQuest && (selectedQuest.id === q.id || selectedQuest.id === dep.id));

                ctx.strokeStyle = isHL ? COLORS.depLineHover : COLORS.depLine;
                ctx.lineWidth = isHL ? 2.5 : 1.5;

                var midX = (x1 + ex) / 2, midY = (y1 + ey) / 2;
                var dist = Math.sqrt((ex-x1)*(ex-x1) + (ey-y1)*(ey-y1));
                var curve = Math.min(dist * 0.15, 20);
                var nx = -(ey-y1) / (dist||1) * curve, ny = (ex-x1) / (dist||1) * curve;

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(midX + nx, midY + ny, ex, ey);
                ctx.stroke();

                if (progress >= 0.95) {
                    var angle = Math.atan2(y2 - (midY+ny), x2 - (midX+nx));
                    var aLen = isHL ? 10 : 7;
                    var ax = x2 - Math.cos(angle) * (NODE_R + 4);
                    var ay = y2 - Math.sin(angle) * (NODE_R + 4);
                    ctx.fillStyle = isHL ? COLORS.depLineHover : COLORS.depArrow;
                    ctx.beginPath();
                    ctx.moveTo(ax, ay);
                    ctx.lineTo(ax - Math.cos(angle - 0.4) * aLen, ay - Math.sin(angle - 0.4) * aLen);
                    ctx.lineTo(ax - Math.cos(angle + 0.4) * aLen, ay - Math.sin(angle + 0.4) * aLen);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        });
    }

    function drawNodes() {
        var time = frameCount * 0.03;
        activeChapter.quests.forEach(function(q) {
            var x = q.x * CELL, y = q.y * CELL;
            var r = NODE_R * (q.size > 1 ? Math.min(q.size * 0.6, 2) : 1);
            var isH = hoveredQuest && hoveredQuest.id === q.id;
            var isS = selectedQuest && selectedQuest.id === q.id;
            var isC = false;
            if (hoveredQuest || selectedQuest) {
                var ref = selectedQuest || hoveredQuest;
                if (ref.dependencies && ref.dependencies.indexOf(q.id) >= 0) isC = true;
                if (q.dependencies && q.dependencies.indexOf(ref.id) >= 0) isC = true;
            }

            // Glow
            if (isH || isS) {
                var gr = r + 15 + Math.sin(time * 2) * 3;
                var glow = ctx.createRadialGradient(x, y, r, x, y, gr);
                glow.addColorStop(0, isS ? 'rgba(255,215,0,0.25)' : 'rgba(212,175,55,0.2)');
                glow.addColorStop(1, 'rgba(212,175,55,0)');
                ctx.fillStyle = glow;
                ctx.beginPath(); ctx.arc(x, y, gr, 0, Math.PI * 2); ctx.fill();
            }
            if (isC) {
                var cg = ctx.createRadialGradient(x, y, r, x, y, r + 10);
                cg.addColorStop(0, 'rgba(100,149,237,0.15)'); cg.addColorStop(1, 'rgba(100,149,237,0)');
                ctx.fillStyle = cg;
                ctx.beginPath(); ctx.arc(x, y, r + 10, 0, Math.PI * 2); ctx.fill();
            }

            var shape = q.shape || '';
            ctx.beginPath();
            if (shape === 'diamond') {
                ctx.moveTo(x, y-r); ctx.lineTo(x+r, y); ctx.lineTo(x, y+r); ctx.lineTo(x-r, y); ctx.closePath();
            } else if (shape === 'hexagon') {
                for (var i = 0; i < 6; i++) { var a = Math.PI/3*i - Math.PI/6; if (i===0) ctx.moveTo(x+Math.cos(a)*r, y+Math.sin(a)*r); else ctx.lineTo(x+Math.cos(a)*r, y+Math.sin(a)*r); } ctx.closePath();
            } else if (shape === 'none') {
                // skip
            } else {
                ctx.arc(x, y, r, 0, Math.PI * 2);
            }

            if (shape !== 'none') {
                var fg = ctx.createRadialGradient(x-r*0.3, y-r*0.3, 0, x, y, r);
                fg.addColorStop(0, isS ? '#2a2a50' : isH ? '#222248' : '#151530');
                fg.addColorStop(1, isS ? '#1a1a40' : '#0c0c22');
                ctx.fillStyle = fg; ctx.fill();
                ctx.strokeStyle = isS ? COLORS.nodeSelected : isH ? COLORS.nodeHover : isC ? 'rgba(100,149,237,0.6)' : COLORS.nodeStroke;
                ctx.lineWidth = isS ? 2.5 : isH ? 2 : 1.2;
                ctx.stroke();
            }

            if (isS) {
                var pr = r + 5 + Math.sin(time*3) * 3;
                ctx.strokeStyle = 'rgba(255,215,0,' + (0.3 + Math.sin(time*3)*0.1) + ')';
                ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, pr, 0, Math.PI*2); ctx.stroke();
            }

            // Icon
            var ti = TASK_ICONS[q.taskType] || '';
            if (ti && cam.zoom > 0.4 && shape !== 'none') {
                ctx.font = Math.round(r*0.7) + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(ti, x, y);
            }

            // Label
            if (cam.zoom > 0.35) {
                var fs = Math.max(9, Math.min(12, 11/cam.zoom*0.7));
                ctx.font = fs + 'px Cinzel,serif';
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                var label = q.title.length > 20 ? q.title.substring(0,18)+'..' : q.title;
                ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillText(label, x+1, y+r+7);
                ctx.fillStyle = isH||isS ? COLORS.textMain : isC ? 'rgba(100,149,237,0.8)' : COLORS.textSub;
                ctx.fillText(label, x, y+r+6);
            }
        });
    }

    function drawMinimap() {
        if (!minimapCtx || !activeChapter || !activeChapter.quests.length) return;
        var mw = minimapCanvas.width, mh = minimapCanvas.height;
        minimapCtx.clearRect(0, 0, mw, mh);
        var quests = activeChapter.quests;
        var minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
        quests.forEach(function(q) {
            if(q.x<minX)minX=q.x;if(q.x>maxX)maxX=q.x;if(q.y<minY)minY=q.y;if(q.y>maxY)maxY=q.y;
        });
        var sx=mw/((maxX-minX+2)||1),sy=mh/((maxY-minY+2)||1),scale=Math.min(sx,sy);
        var ox=(mw-(maxX-minX)*scale)/2,oy=(mh-(maxY-minY)*scale)/2;
        quests.forEach(function(q) {
            minimapCtx.fillStyle='rgba(212,175,55,0.6)';
            minimapCtx.beginPath();
            minimapCtx.arc((q.x-minX)*scale+ox,(q.y-minY)*scale+oy,2*DPR,0,Math.PI*2);
            minimapCtx.fill();
        });
        var cw=canvas.width/DPR,ch=canvas.height/DPR;
        var vl=(-cam.x-cw/2/cam.zoom)/CELL,vt=(-cam.y-ch/2/cam.zoom)/CELL;
        var vw=cw/cam.zoom/CELL,vh=ch/cam.zoom/CELL;
        minimapCtx.strokeStyle='rgba(212,175,55,0.5)';
        minimapCtx.lineWidth=DPR;
        minimapCtx.strokeRect((vl-minX)*scale+ox,(vt-minY)*scale+oy,vw*scale,vh*scale);
    }

    function esc(s) {
        if(!s) return '';
        var e=document.createElement('span');e.textContent=s;return e.innerHTML;
    }

    window.QuestTreePage = render;
})();
