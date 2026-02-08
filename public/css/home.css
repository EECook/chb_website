/* hero */

.hero {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    padding: 2rem;
}

.hero-sky {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
        var(--tod-sky-top) 0%,
        var(--tod-sky-mid) 40%,
        var(--tod-sky-bottom) 75%
    );
    transition: background 2s ease;
    z-index: 0;
}

.hero-horizon {
    position: absolute;
    bottom: 0;
    left: -10%; right: -10%;
    height: 40%;
    background: radial-gradient(ellipse 120% 100% at 50% 100%,
        var(--tod-horizon-color) 0%, transparent 70%
    );
    opacity: var(--tod-horizon-opacity);
    transition: all 2s ease;
    z-index: 1;
    pointer-events: none;
}


/* mist */

.hero-mist {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    overflow: hidden;
}

.mist-layer {
    position: absolute;
    width: 200%;
    height: 100%;
    will-change: transform;
}

.mist-1 {
    top: -20%; left: -50%;
    animation: mist-drift 30s ease-in-out infinite;
    opacity: 0.7;
    background: radial-gradient(ellipse at 30% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
}

.mist-2 {
    top: 10%; left: -30%;
    animation: mist-drift-rev 25s ease-in-out infinite;
    opacity: 0.5;
    background: radial-gradient(ellipse at 60% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 50%);
}

.mist-3 {
    bottom: -10%; left: -40%;
    animation: mist-drift 35s ease-in-out infinite;
    opacity: 0.4;
    background: radial-gradient(ellipse at 45% 60%, rgba(79, 195, 247, 0.04) 0%, transparent 40%);
}


/* particles + effects */

.hero-particles {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    width: 3px; height: 3px;
    background: var(--gold);
    border-radius: 50%;
    opacity: 0;
    animation: particle-up linear infinite;
    box-shadow: 0 0 6px var(--gold-glow);
}

.hero-lightning {
    position: absolute;
    inset: 0;
    z-index: 4;
    pointer-events: none;
    background: radial-gradient(ellipse at 50% 20%, rgba(180, 200, 255, 0.3) 0%, transparent 60%);
    opacity: 0;
}
.hero-lightning.flash { animation: lightning-flash 0.6s ease-out; }

.shooting-star {
    position: absolute;
    z-index: 4;
    width: 80px; height: 2px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), transparent);
    border-radius: 2px;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}
.shooting-star.active { animation: shoot 1.2s ease-out forwards; }


/* hero content */

.hero-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    max-width: 700px;
}

.hero-ornament {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--gold);
    font-size: 0.8rem;
    letter-spacing: 0.4em;
    opacity: 0;
    animation: fade-up 1s 0.3s var(--ease-out) forwards;
}

.ornament-line {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.hero-title {
    font-family: 'Cinzel Decorative', serif;
    font-size: clamp(2.6rem, 7vw, 5.2rem);
    color: var(--gold);
    line-height: 1.1;
    letter-spacing: 0.04em;
    text-shadow: 0 0 60px rgba(212, 175, 55, 0.3), 0 0 120px rgba(212, 175, 55, 0.15);
}

.hero-title .word {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) rotateX(-30deg);
    animation: word-in 0.8s var(--ease-out) forwards;
}
.hero-title .word:nth-child(1) { animation-delay: 0.5s; }
.hero-title .word:nth-child(2) { animation-delay: 0.7s; }
.hero-title .word:nth-child(3) { animation-delay: 0.9s; }

.hero-subtitle {
    font-family: 'Cinzel', serif;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    color: var(--marble-dim);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    opacity: 0;
    animation: fade-up 1s 1.2s var(--ease-out) forwards;
}

.hero-tagline {
    font-family: 'Crimson Text', serif;
    font-style: italic;
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: var(--marble-muted);
    max-width: 500px;
    line-height: 1.7;
    opacity: 0;
    animation: fade-up 1s 1.5s var(--ease-out) forwards;
}


/* ctas */

.hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
    opacity: 0;
    animation: fade-up 0.8s 1.8s var(--ease-out) forwards;
}

.cta-primary {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 2rem;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--sky-1);
    background: linear-gradient(135deg, var(--gold), var(--bronze));
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

.cta-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.35);
}
.cta-primary:hover::before { opacity: 1; }
.cta-primary span { position: relative; z-index: 1; }

.cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 2rem;
    font-family: 'Cinzel', serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--gold);
    border: 1px solid var(--border-gold);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(212, 175, 55, 0.05);
}

.cta-secondary:hover {
    background: var(--gold-dim);
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.15);
}

.cta-quiz {
    color: #A78BFA;
    border-color: rgba(139, 92, 246, 0.4);
    background: rgba(139, 92, 246, 0.06);
}
.cta-quiz:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: #8B5CF6;
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.2);
}


/* scroll hint */

.scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 10;
    opacity: 0;
    animation: fade-up 0.8s 2.5s var(--ease-out) forwards;
}

.scroll-arrow {
    width: 24px; height: 24px;
    border-right: 2px solid var(--gold-dark);
    border-bottom: 2px solid var(--gold-dark);
    transform: rotate(45deg);
    animation: float-y 2s ease-in-out infinite;
    opacity: 0.5;
}

.scroll-label {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-dark);
}


/* narrative */

.narrative {
    position: relative;
    padding: 6rem 2rem 8rem;
    display: flex;
    justify-content: center;
    text-align: center;
    overflow: hidden;
}

.narrative-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.03) 30%, rgba(212, 175, 55, 0.03) 60%, transparent 100%);
    pointer-events: none;
}

.narrative::before,
.narrative::after {
    content: '';
    position: absolute;
    top: 20%;
    width: 150px; height: 60%;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.5;
}
.narrative::before { left: -50px; background: rgba(212, 175, 55, 0.08); }
.narrative::after { right: -50px; background: rgba(139, 92, 246, 0.06); }

.narrative-body {
    max-width: 600px;
    position: relative;
    z-index: 1;
}

.narrative-text {
    font-family: 'Crimson Text', serif;
    font-style: italic;
    font-size: clamp(1.15rem, 2.5vw, 1.45rem);
    line-height: 2;
    color: var(--marble-dim);
}
.narrative-text em { color: var(--gold-light); }
.narrative-text strong { color: var(--gold); font-weight: 600; }

.narrative-divider {
    width: 120px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 2.5rem auto;
    opacity: 0.5;
}


/* showcase cards */

.showcase { position: relative; padding: 2rem 2rem 6rem; }

.showcase-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.showcase-card {
    position: relative;
    padding: 2.2rem;
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    background: rgba(10, 10, 30, 0.5);
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: all 0.4s var(--ease-out);
    overflow: hidden;
    display: block;
}

.showcase-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.showcase-card:nth-child(1)::before { background: radial-gradient(ellipse at 20% 20%, rgba(212, 175, 55, 0.08), transparent 60%); }
.showcase-card:nth-child(2)::before { background: radial-gradient(ellipse at 80% 20%, rgba(79, 195, 247, 0.08), transparent 60%); }
.showcase-card:nth-child(3)::before { background: radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.08), transparent 60%); }
.showcase-card:nth-child(4)::before { background: radial-gradient(ellipse at 80% 80%, rgba(79, 195, 247, 0.08), transparent 60%); }

.showcase-card:hover {
    transform: translateY(-6px);
    border-color: var(--border-gold);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.06);
}
.showcase-card:hover::before { opacity: 1; }

.sc-icon {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    display: block;
    filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.3));
    transition: transform 0.4s var(--ease-spring);
}
.showcase-card:hover .sc-icon { transform: scale(1.15); }

.sc-title {
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
}

.sc-desc {
    font-family: 'Crimson Text', serif;
    font-size: 1rem;
    color: var(--marble-muted);
    line-height: 1.6;
}

.sc-arrow {
    position: absolute;
    bottom: 1.5rem; right: 1.5rem;
    font-size: 1.2rem;
    color: var(--gold-dark);
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateX(-8px);
}
.showcase-card:hover .sc-arrow {
    opacity: 1;
    transform: translateX(0);
    color: var(--gold);
}


/* camp activity */

.activity { position: relative; padding: 4rem 2rem 6rem; }

.activity-header {
    text-align: center;
    margin-bottom: 3rem;
}

.activity-title {
    font-family: 'Cinzel', serif;
    font-size: 1.6rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
}

.activity-sub { color: var(--marble-muted); font-style: italic; }

.activity-grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2rem;
    align-items: start;
}

/* lore tile */
.lore-tile {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    background: rgba(10, 10, 30, 0.4);
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
}

.lore-tile:hover {
    border-color: var(--border-gold);
    background: rgba(15, 15, 40, 0.6);
    transform: translateX(4px);
}

.lore-icon {
    font-size: 1.8rem;
    filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3));
}

.lore-title {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--gold-light);
}

.lore-desc { font-size: 0.9rem; color: var(--marble-muted); }

/* admin posts area */
.admin-empty {
    padding: 1rem 1.5rem;
    border: 1px dashed var(--border-subtle);
    border-radius: 12px;
    color: var(--marble-muted);
    font-style: italic;
    font-size: 0.9rem;
    text-align: center;
}

/* announcement items (used when posts exist) */
.ann-item {
    padding: 1.2rem 1.5rem;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    background: rgba(10, 10, 30, 0.4);
    transition: all 0.3s ease;
}
.ann-item:hover {
    border-color: var(--border-gold);
    background: rgba(15, 15, 40, 0.6);
}

.ann-date {
    font-family: 'Source Code Pro', monospace;
    font-size: 0.72rem;
    color: var(--marble-muted);
    margin-bottom: 0.4rem;
}
.ann-title {
    font-family: 'Cinzel', serif;
    font-size: 1rem;
    color: var(--gold-light);
    margin-bottom: 0.3rem;
}
.ann-preview {
    font-size: 0.95rem;
    color: var(--marble-muted);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--gold);
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    padding-top: 0.5rem;
    transition: all 0.2s ease;
}
.view-all:hover { gap: 0.6rem; }

/* stats panel */
.stats-panel {
    padding: 1.5rem;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    background: rgba(10, 10, 30, 0.4);
}

.stats-heading {
    font-family: 'Cinzel', serif;
    font-size: 0.85rem;
    color: var(--gold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid var(--border-subtle);
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0;
}
.stat-row + .stat-row { border-top: 1px solid var(--border-subtle); }

.stat-name { font-size: 0.9rem; color: var(--marble-muted); }
.stat-val {
    font-family: 'Cinzel', serif;
    font-weight: 600;
    color: var(--gold-light);
    font-size: 1rem;
}


/* footer */

.site-footer {
    position: relative;
    padding: 4rem 2rem 2.5rem;
    border-top: 1px solid var(--border-subtle);
    background: rgba(3, 3, 12, 0.6);
}

.footer-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 3rem;
    align-items: start;
}

.footer-brand-name {
    font-family: 'Cinzel Decorative', serif;
    font-size: 1.2rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
}

.footer-brand-desc {
    color: var(--marble-muted);
    font-size: 0.9rem;
    font-style: italic;
    max-width: 300px;
    line-height: 1.5;
}

.footer-col-title {
    font-family: 'Cinzel', serif;
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.8rem;
}

.footer-col a {
    display: block;
    padding: 0.3rem 0;
    color: var(--marble-muted);
    font-size: 0.9rem;
    transition: color 0.2s ease;
}
.footer-col a:hover { color: var(--gold); }

.footer-bottom {
    max-width: 1000px;
    margin: 2.5rem auto 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: var(--marble-muted);
    flex-wrap: wrap;
    gap: 0.5rem;
}

.server-ip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.8rem;
    background: rgba(212, 175, 55, 0.08);
    border: 1px solid var(--border-subtle);
    border-radius: 6px;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.8rem;
    color: var(--gold);
    cursor: pointer;
    transition: all 0.2s ease;
}
.server-ip:hover {
    border-color: var(--border-gold);
    background: var(--gold-dim);
}


/* responsive */

@media (max-width: 768px) {
    .showcase-grid { grid-template-columns: 1fr; }
    .activity-grid { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr 1fr; }
    .hero-ctas { flex-direction: column; align-items: center; }
}

@media (max-width: 480px) {
    .footer-inner { grid-template-columns: 1fr; }
}
