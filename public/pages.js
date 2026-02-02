/*
 * Camp Half-Blood - Page Content
 * All documentation pages for the site
 */
const PAGES = {

    'announcements': {
    icon: '📢',
    title: 'Announcements',
    subtitle: 'News, downloads, and updates',
    content: `
        <div class="announcements-page">
            <!-- Admin Controls (hidden for non-admins) -->
            <div id="admin-controls" class="admin-panel" style="display: none;">
                <div class="admin-header">
                    <h3>⚡ Admin Controls</h3>
                    <span class="admin-badge">ADMIN</span>
                </div>
                
                <div class="admin-tabs">
                    <button class="admin-tab active" data-tab="post">📝 New Post</button>
                    <button class="admin-tab" data-tab="upload">📁 Upload File</button>
                    <button class="admin-tab" data-tab="manage">⚙️ Manage</button>
                </div>
                
                <!-- New Announcement Tab -->
                <div class="admin-tab-content active" id="tab-post">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" id="announce-title" placeholder="Announcement title..." maxlength="100">
                    </div>
                    <div class="form-group">
                        <label>Content <span class="hint">(Markdown supported)</span></label>
                        <textarea id="announce-content" placeholder="Main announcement content..." rows="6"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Additional Notes <span class="hint">(Optional)</span></label>
                        <textarea id="announce-notes" placeholder="Extra info, links, etc..." rows="3"></textarea>
                    </div>
                    <div class="form-row">
                        <label class="checkbox-label">
                            <input type="checkbox" id="announce-pin">
                            <span>📌 Pin this announcement</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="announce-discord" checked>
                            <span>💬 Post to Discord</span>
                        </label>
                    </div>
                    <button class="btn-primary" onclick="postAnnouncement()">
                        <span class="btn-icon">📢</span> Post Announcement
                    </button>
                </div>
                
                <!-- Upload File Tab -->
                <div class="admin-tab-content" id="tab-upload">
                    <div class="form-group">
                        <label>File Name / Title</label>
                        <input type="text" id="file-title" placeholder="e.g., Camp Half-Blood Resource Pack v2.1">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="file-category">
                            <option value="resourcepack">🎨 Resource Pack</option>
                            <option value="modpack">📦 Modpack</option>
                            <option value="guide">📖 Guide / Document</option>
                            <option value="other">📁 Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Description <span class="hint">(Optional)</span></label>
                        <textarea id="file-description" placeholder="Brief description of the file..." rows="2"></textarea>
                    </div>
                    <div class="form-group">
                        <label>File URL <span class="hint">(Direct download link - Dropbox, Google Drive, etc.)</span></label>
                        <input type="text" id="file-url" placeholder="https://...">
                    </div>
                    <div class="form-group">
                        <label>File Size <span class="hint">(Optional)</span></label>
                        <input type="text" id="file-size" placeholder="e.g., 45 MB">
                    </div>
                    <button class="btn-primary" onclick="uploadFile()">
                        <span class="btn-icon">📤</span> Add File
                    </button>
                </div>
                
                <!-- Manage Tab -->
                <div class="admin-tab-content" id="tab-manage">
                    <div class="manage-section">
                        <h4>📌 Pinned Posts (max 4)</h4>
                        <div id="pinned-manage-list" class="manage-list">
                            <!-- Populated by JS -->
                        </div>
                    </div>
                    <div class="manage-section">
                        <h4>📁 Files</h4>
                        <div id="files-manage-list" class="manage-list">
                            <!-- Populated by JS -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Links / Server Info Banner -->
            <div class="quick-links-banner">
                <div class="server-info">
                    <div class="server-ip">
                        <span class="label">Server IP</span>
                        <code id="server-ip-display">play.camphalfblood.net</code>
                        <button class="copy-btn" onclick="copyServerIP()" title="Copy IP">📋</button>
                    </div>
                </div>
                <div class="quick-actions">
                    <a href="#downloads" class="quick-link">
                        <span class="icon">📥</span>
                        <span>Downloads</span>
                    </a>
                    <a href="https://discord.gg/your-invite" target="_blank" class="quick-link discord">
                        <span class="icon">💬</span>
                        <span>Discord</span>
                    </a>
                </div>
            </div>

            <!-- Pinned Announcements -->
            <div class="pinned-section" id="pinned-section">
                <div class="section-header">
                    <h2>📌 Pinned</h2>
                </div>
                <div class="pinned-grid" id="pinned-grid">
                    <!-- Populated by JS -->
                    <div class="loading-placeholder">Loading pinned announcements...</div>
                </div>
            </div>

            <!-- File Downloads Section -->
            <div class="downloads-section" id="downloads">
                <div class="section-header">
                    <h2>📥 Downloads</h2>
                    <div class="filter-tabs">
                        <button class="filter-tab active" data-filter="all">All</button>
                        <button class="filter-tab" data-filter="resourcepack">Resource Packs</button>
                        <button class="filter-tab" data-filter="modpack">Modpacks</button>
                        <button class="filter-tab" data-filter="guide">Guides</button>
                    </div>
                </div>
                <div class="downloads-grid" id="downloads-grid">
                    <!-- Populated by JS -->
                    <div class="loading-placeholder">Loading downloads...</div>
                </div>
            </div>

            <!-- Announcement Feed -->
            <div class="feed-section">
                <div class="section-header">
                    <h2>📢 Announcements</h2>
                    <div class="feed-controls">
                        <select id="feed-sort" onchange="sortFeed(this.value)">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>
                <div class="feed-container" id="feed-container">
                    <!-- Populated by JS -->
                    <div class="loading-placeholder">Loading announcements...</div>
                </div>
                <div class="feed-pagination" id="feed-pagination">
                    <!-- Populated by JS -->
                </div>
            </div>
        </div>
    `
},

    'home': {
        icon: '🏛️',
        title: 'Camp Half-Blood',
        subtitle: 'Where legends train',
        content: `
            <div class="doc-section">
                <h2>Welcome, Demigod</h2>
                <p>You've found <strong>Camp Half-Blood</strong> - a sanctuary for demigods like yourself. Here, children of the gods train, form alliances, complete quests, and prove their worth across two realms: <strong>Discord</strong> and <strong>Minecraft</strong>.</p>
                
                <p>Whether you're a child of Zeus wielding lightning or a cunning offspring of Athena, your journey begins now.</p>
            </div>

            <div class="doc-section">
                <h2>Two Realms, One Camp</h2>
                <p>Camp Half-Blood exists across two connected platforms:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Discord</h4>
                        <p>Get claimed by a god, join a cabin, play games, earn Drachma, manage your profile, and coordinate with fellow demigods.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Minecraft</h4>
                        <p>Explore camp, build your cabin, battle monsters, complete quests, and spend your Drachma on gear and items.</p>
                    </div>
                </div>
                
                <div class="info-box tip">
                    <div class="info-box-title">Linked Experience</div>
                    <p>Link your accounts with <code>!mclink</code> to sync your Drachma, god effects, skills, and more between Discord and Minecraft!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Quick Start</h2>
                <ol>
                    <li><strong>Join Discord</strong> - Enter our server and introduce yourself</li>
                    <li><strong>Get Claimed</strong> - Use <code>!claim</code> to discover your godly parent</li>
                    <li><strong>Link Minecraft</strong> - Use <code>!mclink YourUsername</code> to connect accounts</li>
                    <li><strong>Join a Cabin</strong> - Team up with siblings or form your own group</li>
                    <li><strong>Start Training</strong> - Play games, complete quests, upgrade skills!</li>
                </ol>
            </div>

            <div class="doc-section">
                <h2>What Can You Do?</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Economy</h4>
                        <p>Earn Drachma through games, dailies, and quests. Spend it in shops or trade with others.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Battles</h4>
                        <p>Fight in the Arena - PvP duels, PvE challenges, and epic boss battles with betting.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Mini-Games</h4>
                        <p>15+ mythology-themed games from trivia to gambling. Earn Drachma while having fun!</p>
                    </div>
                    <div class="feature-card">
                        <h4>Progression</h4>
                        <p>Upgrade 10 skill branches, unlock powerful effects, and become a legendary hero.</p>
                    </div>
                </div>
            </div>
        `
    },

    'new-player': {
        icon: '📖',
        title: 'New Camper Guide',
        subtitle: 'Everything you need to get started',
        content: `
            <div class="doc-section">
                <h2>Welcome to Camp!</h2>
                <p>So you've discovered you're a demigod - half mortal, half god. Don't worry, we'll help you figure out the rest. This guide covers everything you need to know as a new camper.</p>
            </div>

            <div class="doc-section">
                <h2>Step 1: Get Claimed</h2>
                <p>Every demigod has a godly parent. Discover yours through the claiming ceremony!</p>
                
                <div class="command">
                    <div class="command-name">!claim</div>
                    <div class="command-desc">Start your claiming ceremony. Take a personality quiz or choose your god parent directly.</div>
                </div>
                
                <p>Your god parent determines:</p>
                <ul>
                    <li>Your <strong>name color</strong> in Minecraft</li>
                    <li>Unique <strong>potion effects</strong> while playing</li>
                    <li>A personal <strong>welcome letter</strong> from your godly parent</li>
                    <li>Which cabin you can join</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Can't Decide?</div>
                    <p>You can retake the quiz anytime with <code>!claim</code> to change your god parent!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Step 2: Link Your Minecraft Account</h2>
                <p>To get the full Camp Half-Blood experience, link your Discord to Minecraft:</p>
                
                <div class="command">
                    <div class="command-name">!mclink YourMinecraftName</div>
                    <div class="command-desc">Links your Discord account to your Minecraft username. This syncs your Drachma, god effects, and skills.</div>
                </div>
                
                <p>Once linked, you'll receive:</p>
                <ul>
                    <li><strong>Synced Drachma</strong> - Earn in Discord, spend in Minecraft (and vice versa)</li>
                    <li><strong>God Effects</strong> - Your parent's blessing follows you in-game</li>
                    <li><strong>Item Delivery</strong> - Buy items in Discord, claim them in Minecraft</li>
                    <li><strong>Skill Sync</strong> - Upgrade skills in Discord, get effects in Minecraft</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Step 3: Set Up Your Profile</h2>
                <p>Your profile is your central hub for everything:</p>
                
                <div class="command">
                    <div class="command-name">!profile</div>
                    <div class="command-desc">Opens your profile with navigation buttons for Mail, Inventory, Games, Shop, and more.</div>
                </div>
                
                <p>From your profile you can:</p>
                <ul>
                    <li>Check your <strong>mail</strong> for messages and invites</li>
                    <li>View your <strong>inventory</strong> and use items</li>
                    <li>Quick-access the <strong>games menu</strong></li>
                    <li>Browse the <strong>shop</strong></li>
                    <li>See your <strong>cabin</strong> info</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Step 4: Earn Your First Drachma</h2>
                <p>Drachma is the currency of Camp Half-Blood. Here's how to start earning:</p>
                
                <div class="command">
                    <div class="command-name">!daily</div>
                    <div class="command-desc">Claim your daily Drachma reward! A mythology trivia game with bonus rewards for correct answers.</div>
                </div>
                
                <div class="command">
                    <div class="command-name">!games</div>
                    <div class="command-desc">Play mini-games to earn Drachma. 10 different free games!</div>
                </div>
                
                <div class="table-container">
                    <table>
                        <tr><th>Activity</th><th>Reward</th><th>Cooldown</th></tr>
                        <tr><td>!daily</td><td>2-10</td><td>23 hours</td></tr>
                        <tr><td>Mini-Games</td><td>1-25</td><td>5 minutes each</td></tr>
                        <tr><td>Casino Games</td><td>Up to 200</td><td>Varies</td></tr>
                        <tr><td>Arena Wins</td><td>Betting payouts</td><td>None</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Step 5: Join a Cabin</h2>
                <p>Cabins are teams of demigods who work together. Benefits include:</p>
                <ul>
                    <li>Private Discord channel for coordination</li>
                    <li>Leadership skill auras that buff nearby members</li>
                    <li>Team-based events and competitions</li>
                    <li>Community and roleplay opportunities</li>
                </ul>
                
                <div class="command">
                    <div class="command-name">!cabin</div>
                    <div class="command-desc">View your cabin or create/manage one if you're a leader.</div>
                </div>
                
                <p>Check your <code>!mail</code> for cabin invites, or ask a cabin leader to invite you!</p>
            </div>

            <div class="doc-section">
                <h2>Essential Commands Cheatsheet</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Command</th><th>What It Does</th></tr>
                        <tr><td><code>!profile</code></td><td>Your central hub</td></tr>
                        <tr><td><code>!claim</code></td><td>Get your god parent</td></tr>
                        <tr><td><code>!mclink Name</code></td><td>Link Minecraft account</td></tr>
                        <tr><td><code>!daily</code></td><td>Daily reward + trivia</td></tr>
                        <tr><td><code>!games</code></td><td>Play mini-games</td></tr>
                        <tr><td><code>!shop</code></td><td>Buy items</td></tr>
                        <tr><td><code>!balance</code></td><td>Check your Drachma</td></tr>
                        <tr><td><code>!mail</code></td><td>Read messages</td></tr>
                        <tr><td><code>!cabin</code></td><td>Cabin management</td></tr>
                        <tr><td><code>!skills</code></td><td>View/upgrade skills</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>What's Next?</h2>
                <p>Once you're set up, explore these features:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Arena Battles</h4>
                        <p>PvP duels, PvE challenges, and boss fights with betting</p>
                    </div>
                    <div class="feature-card">
                        <h4>Skill Trees</h4>
                        <p>10 branches with real Minecraft effects</p>
                    </div>
                    <div class="feature-card">
                        <h4>Player Shops</h4>
                        <p>Buy a permit and sell items to other players</p>
                    </div>
                    <div class="feature-card">
                        <h4>Quests</h4>
                        <p>Request custom quests for your demigod journey</p>
                    </div>
                </div>
            </div>
        `
    },

    'profile': {
        icon: '👤',
        title: 'Profile & Mail',
        subtitle: 'Your demigod identity and communications',
        content: `
            <div class="doc-section">
                <h2>Your Demigod Profile</h2>
                <p>Your profile is the central hub for everything at Camp Half-Blood. It displays your stats, provides quick access to all features, and tracks your progression.</p>
                
                <div class="command">
                    <div class="command-name">!profile</div>
                    <div class="command-aliases">Aliases: !me, !stats, !p</div>
                    <div class="command-desc">Opens your profile with interactive navigation buttons. First use creates your profile with 100 starting Drachma.</div>
                </div>

                <div class="command">
                    <div class="command-name">!profile @user</div>
                    <div class="command-desc">View another player's profile.</div>
                </div>

                <h3>Profile Information</h3>
                <ul>
                    <li><strong>God Parent:</strong> Your Olympian parent with emoji</li>
                    <li><strong>Drachma:</strong> Your currency balance</li>
                    <li><strong>Blessings:</strong> Available divine blessings (X/2)</li>
                    <li><strong>Cabin:</strong> Your team (if any)</li>
                    <li><strong>Inventory:</strong> Number of items owned</li>
                    <li><strong>Unread Mail:</strong> New message count</li>
                    <li><strong>Minecraft Link:</strong> Your linked MC username</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Navigation Buttons</h2>
                <p>Your profile includes quick-access buttons:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Mail</h4>
                        <p>Read messages, cabin invites, and divine letters</p>
                    </div>
                    <div class="feature-card">
                        <h4>Inventory</h4>
                        <p>View and use your items</p>
                    </div>
                    <div class="feature-card">
                        <h4>Games</h4>
                        <p>Quick access to mini-games</p>
                    </div>
                    <div class="feature-card">
                        <h4>Shop</h4>
                        <p>Browse and buy items</p>
                    </div>
                    <div class="feature-card">
                        <h4>Cabin</h4>
                        <p>Cabin management</p>
                    </div>
                    <div class="feature-card">
                        <h4>Skills</h4>
                        <p>View/upgrade skill trees</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Mail System</h2>
                <p>The mail system keeps you informed about everything happening at camp.</p>
                
                <div class="command">
                    <div class="command-name">!mail</div>
                    <div class="command-desc">Opens your mailbox. Unread messages marked with blue dot. Select messages from dropdown to read.</div>
                </div>

                <h3>Mail Types</h3>
                <div class="table-container">
                    <table>
                        <tr><th>Type</th><th>Icon</th><th>Description</th></tr>
                        <tr><td>God Claiming</td><td>🏛️</td><td>Letter from your godly parent</td></tr>
                        <tr><td>Cabin Invite</td><td>🏕️</td><td>Invitation to join a cabin</td></tr>
                        <tr><td>Quest Updates</td><td>📜</td><td>Quest approval/denial notifications</td></tr>
                        <tr><td>Divine Messages</td><td>⚡</td><td>Random messages from the gods</td></tr>
                        <tr><td>Delivery Request</td><td>📦</td><td>Shop orders to fulfill</td></tr>
                        <tr><td>Delivery Complete</td><td>✅</td><td>Your purchase delivered</td></tr>
                        <tr><td>Rewards</td><td>💰</td><td>Drachma rewards</td></tr>
                        <tr><td>Personal</td><td>✉️</td><td>Messages from other players</td></tr>
                    </table>
                </div>
                
                <div class="info-box tip">
                    <div class="info-box-title">Compose Mail</div>
                    <p>Click the "Compose" button in your mailbox to send a message to another player!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Inventory</h2>
                
                <div class="command">
                    <div class="command-name">!inventory</div>
                    <div class="command-aliases">Aliases: !inv, !items</div>
                    <div class="command-desc">View all items in your inventory.</div>
                </div>

                <h3>Item Markers</h3>
                <ul>
                    <li><strong>Redeemable:</strong> Can be delivered to Minecraft</li>
                    <li><strong>Shop Permit:</strong> Use to create your own shop</li>
                    <li><strong>Consumable:</strong> Use for temporary effects</li>
                </ul>

                <div class="info-box tip">
                    <div class="info-box-title">Auto-Delivery</div>
                    <p>Minecraft items are automatically queued when purchased. Use <code>/chbpending</code> in MC to receive them!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Related Commands</h2>
                
                <div class="command">
                    <div class="command-name">!invites</div>
                    <div class="command-desc">View pending cabin invitations directly</div>
                </div>
                
                <div class="command">
                    <div class="command-name">!myshop</div>
                    <div class="command-desc">Quick access to manage your player shop</div>
                </div>
            </div>
        `
    },

    'gods': {
        icon: '🏛️',
        title: 'Gods & Claiming',
        subtitle: 'Discover your divine heritage',
        content: `
            <div class="doc-section">
                <h2>The Claiming Ceremony</h2>
                <p>Every demigod has one divine parent. The claiming ceremony reveals which Olympian god is yours through a personality quiz - or you can choose directly!</p>
                
                <div class="command">
                    <div class="command-name">!claim</div>
                    <div class="command-aliases">Aliases: !quiz</div>
                    <div class="command-desc">Start your claiming ceremony. Take the quiz or choose directly from dropdown.</div>
                </div>

                <div class="command">
                    <div class="command-name">!gods</div>
                    <div class="command-desc">Browse all 19 Olympian gods and their domains.</div>
                </div>

                <div class="command">
                    <div class="command-name">!mygod</div>
                    <div class="command-desc">View detailed info about your godly parent.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Two Ways to Claim</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Personality Quiz</h4>
                        <p>Answer questions about your personality and values. The quiz analyzes your responses to match you with the most fitting god parent.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Direct Selection</h4>
                        <p>Already know who your parent is? Skip the quiz and choose directly from the dropdown menu.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>The 19 Olympian Gods</h2>
                
                <div class="god-grid">
                    <div class="god-card"><div class="god-emoji">⚡</div><div class="god-name">Zeus</div><div class="god-domain">Sky & Thunder</div></div>
                    <div class="god-card"><div class="god-emoji">🔱</div><div class="god-name">Poseidon</div><div class="god-domain">Sea</div></div>
                    <div class="god-card"><div class="god-emoji">💀</div><div class="god-name">Hades</div><div class="god-domain">Underworld</div></div>
                    <div class="god-card"><div class="god-emoji">🦉</div><div class="god-name">Athena</div><div class="god-domain">Wisdom</div></div>
                    <div class="god-card"><div class="god-emoji">☀️</div><div class="god-name">Apollo</div><div class="god-domain">Sun & Music</div></div>
                    <div class="god-card"><div class="god-emoji">🏹</div><div class="god-name">Artemis</div><div class="god-domain">Hunt & Moon</div></div>
                    <div class="god-card"><div class="god-emoji">⚔️</div><div class="god-name">Ares</div><div class="god-domain">War</div></div>
                    <div class="god-card"><div class="god-emoji">💕</div><div class="god-name">Aphrodite</div><div class="god-domain">Love</div></div>
                    <div class="god-card"><div class="god-emoji">🔨</div><div class="god-name">Hephaestus</div><div class="god-domain">Forge</div></div>
                    <div class="god-card"><div class="god-emoji">👟</div><div class="god-name">Hermes</div><div class="god-domain">Travel</div></div>
                    <div class="god-card"><div class="god-emoji">🌾</div><div class="god-name">Demeter</div><div class="god-domain">Agriculture</div></div>
                    <div class="god-card"><div class="god-emoji">🍇</div><div class="god-name">Dionysus</div><div class="god-domain">Wine</div></div>
                    <div class="god-card"><div class="god-emoji">👑</div><div class="god-name">Hera</div><div class="god-domain">Marriage</div></div>
                    <div class="god-card"><div class="god-emoji">🌙</div><div class="god-name">Hecate</div><div class="god-domain">Magic</div></div>
                    <div class="god-card"><div class="god-emoji">😴</div><div class="god-name">Hypnos</div><div class="god-domain">Sleep</div></div>
                    <div class="god-card"><div class="god-emoji">🏆</div><div class="god-name">Nike</div><div class="god-domain">Victory</div></div>
                    <div class="god-card"><div class="god-emoji">⚖️</div><div class="god-name">Nemesis</div><div class="god-domain">Revenge</div></div>
                    <div class="god-card"><div class="god-emoji">🌈</div><div class="god-name">Iris</div><div class="god-domain">Rainbows</div></div>
                    <div class="god-card"><div class="god-emoji">🎲</div><div class="god-name">Tyche</div><div class="god-domain">Luck</div></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>What You Receive</h2>
                <p>When claimed, you get:</p>
                <ul>
                    <li><strong>Name Color</strong> - Your god's color displays in Minecraft</li>
                    <li><strong>Potion Effects</strong> - Passive buffs based on your parent</li>
                    <li><strong>Divine Letter</strong> - A personal welcome message from your godly parent</li>
                    <li><strong>Cabin Eligibility</strong> - Join cabins aligned with your heritage</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Change Anytime</div>
                    <p>You can retake the claiming ceremony anytime with <code>!claim</code> to choose a different god parent!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Complete God Reference</h2>
                <p>All 19 gods with their nametag colors and potion effects in Minecraft:</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Emoji</th><th>Domain</th><th>Nametag Color</th><th>Potion Effect</th></tr>
                        <tr><td>Zeus</td><td>⚡</td><td>Sky & Thunder</td><td style="color: yellow;">Yellow</td><td>Jump Boost</td></tr>
                        <tr><td>Poseidon</td><td>🔱</td><td>Sea</td><td style="color: aqua;">Aqua</td><td>Water Breathing</td></tr>
                        <tr><td>Hades</td><td>💀</td><td>Underworld</td><td style="color: gray;">Dark Gray</td><td>Resistance</td></tr>
                        <tr><td>Athena</td><td>🦉</td><td>Wisdom</td><td style="color: silver;">Gray</td><td>Haste</td></tr>
                        <tr><td>Apollo</td><td>☀️</td><td>Sun & Music</td><td style="color: gold;">Gold</td><td>Regeneration</td></tr>
                        <tr><td>Artemis</td><td>🏹</td><td>Hunt & Moon</td><td style="color: white;">White</td><td>Speed</td></tr>
                        <tr><td>Ares</td><td>⚔️</td><td>War</td><td style="color: darkred;">Dark Red</td><td>Strength</td></tr>
                        <tr><td>Aphrodite</td><td>💕</td><td>Love</td><td style="color: #ff69b4;">Light Purple</td><td>Regeneration</td></tr>
                        <tr><td>Hephaestus</td><td>🔨</td><td>Forge</td><td style="color: red;">Red</td><td>Fire Resistance</td></tr>
                        <tr><td>Hermes</td><td>👟</td><td>Travel</td><td style="color: #5555ff;">Blue</td><td>Speed</td></tr>
                        <tr><td>Demeter</td><td>🌾</td><td>Agriculture</td><td style="color: green;">Green</td><td>Saturation</td></tr>
                        <tr><td>Dionysus</td><td>🍇</td><td>Wine</td><td style="color: purple;">Dark Purple</td><td>Luck</td></tr>
                        <tr><td>Hera</td><td>👑</td><td>Marriage</td><td style="color: darkcyan;">Dark Aqua</td><td>Resistance</td></tr>
                        <tr><td>Hecate</td><td>🌙</td><td>Magic</td><td style="color: darkblue;">Dark Blue</td><td>Slow Falling</td></tr>
                        <tr><td>Hypnos</td><td>😴</td><td>Sleep</td><td style="color: #5555ff;">Blue</td><td>Slow Falling</td></tr>
                        <tr><td>Nike</td><td>🏆</td><td>Victory</td><td style="color: gold;">Gold</td><td>Speed</td></tr>
                        <tr><td>Nemesis</td><td>⚖️</td><td>Revenge</td><td style="color: gray;">Gray</td><td>Resistance</td></tr>
                        <tr><td>Iris</td><td>🌈</td><td>Rainbows</td><td style="color: #ff69b4;">Light Purple</td><td>Glowing</td></tr>
                        <tr><td>Tyche</td><td>🎲</td><td>Luck</td><td style="color: green;">Green</td><td>Luck</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>What You Receive</h2>
                <p>When claimed, you get:</p>
                <ul>
                    <li><strong>Name Color</strong> - Your god's color displays in Minecraft</li>
                    <li><strong>Potion Effects</strong> - Passive buffs based on your parent</li>
                    <li><strong>Divine Letter</strong> - A personal welcome message from your godly parent</li>
                    <li><strong>Cabin Eligibility</strong> - Join cabins aligned with your heritage</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Change Anytime</div>
                    <p>You can retake the claiming ceremony anytime with <code>!claim</code> to choose a different god parent!</p>
                </div>
            </div>
        `
    },

    'cabins': {
        icon: '🏕️',
        title: 'Cabins & Teams',
        subtitle: 'Join forces with fellow demigods',
        content: `
            <div class="doc-section">
                <h2>The Cabin System</h2>
                <p>Cabins are teams of demigods working together. Each cabin gets a private Discord channel, and members with Leadership skills can buff nearby teammates in Minecraft!</p>
                
                <div class="command">
                    <div class="command-name">!cabin</div>
                    <div class="command-desc">View your cabin's info, members, and Divine Favor.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin list</div>
                    <div class="command-desc">Browse all cabins, sorted by Divine Favor.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Cabin Benefits</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Private Channel</h4>
                        <p>Every cabin gets a private Discord channel for coordination, visible only to members.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Leadership Auras</h4>
                        <p>Members with Leadership skills buff nearby cabin mates in Minecraft!</p>
                    </div>
                    <div class="feature-card">
                        <h4>Team Events</h4>
                        <p>Participate in cabin vs cabin competitions and tournaments.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Divine Favor</h4>
                        <p>High favor grants Drachma bonuses to all members!</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Divine Favor</h2>
                <p>Your cabin's standing with the gods affects Drachma earnings!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Status</th><th>Favor</th><th>Modifier</th></tr>
                        <tr><td>Blessed</td><td>80+</td><td style="color: var(--success);">+25%</td></tr>
                        <tr><td>Favored</td><td>50-79</td><td style="color: var(--success);">+10%</td></tr>
                        <tr><td>Neutral</td><td>0-49</td><td>Normal</td></tr>
                        <tr><td>Disfavored</td><td>-30 to -1</td><td style="color: var(--error);">-10%</td></tr>
                        <tr><td>Cursed</td><td>Below -60</td><td style="color: var(--error);">-25%</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Joining a Cabin</h2>
                <p>There are two ways to join an existing cabin:</p>
                
                <ol>
                    <li><strong>Receive an Invite</strong> - Check your <code>!mail</code> for cabin invitations. Accept directly from the mail!</li>
                    <li><strong>Ask a Leader</strong> - Contact a cabin leader and ask them to invite you.</li>
                </ol>
                
                <div class="command">
                    <div class="command-name">!invites</div>
                    <div class="command-desc">View all your pending cabin invitations.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Creating & Managing</h2>
                
                <div class="command">
                    <div class="command-name">!cabin create [Name]</div>
                    <div class="command-desc">Create a new cabin. You become leader.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin invite @user</div>
                    <div class="command-desc">[Leader] Invite a player to your cabin.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin kick @user</div>
                    <div class="command-desc">[Leader] Remove a member from your cabin.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin leave</div>
                    <div class="command-desc">Leave your current cabin.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin disband</div>
                    <div class="command-desc">[Leader] Permanently delete your cabin.</div>
                </div>
            </div>
        `
    },

    'economy': {
        icon: '💰',
        title: 'Economy & Shop',
        subtitle: 'Earn and spend golden Drachma',
        content: `
            <div class="doc-section">
                <h2>Golden Drachma</h2>
                <p>Drachma is the universal currency of Camp Half-Blood, accepted in both Discord and Minecraft. Earn it, spend it, or transfer it to friends!</p>
                
                <div class="command">
                    <div class="command-name">!balance</div>
                    <div class="command-aliases">Aliases: !bal, !drachma</div>
                    <div class="command-desc">Check your current balance and any active multipliers.</div>
                </div>

                <div class="command">
                    <div class="command-name">!daily</div>
                    <div class="command-desc">Claim daily bonus with mythology trivia (23-hour cooldown).</div>
                </div>

                <div class="command">
                    <div class="command-name">!leaderboard</div>
                    <div class="command-desc">View the wealthiest demigods.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Ways to Earn</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Activity</th><th>Reward</th><th>Details</th></tr>
                        <tr><td>!daily</td><td>2-10</td><td>Mythology trivia bonus</td></tr>
                        <tr><td>Mini-Games</td><td>1-25</td><td>10 free mythology games</td></tr>
                        <tr><td>Casino</td><td>Up to 200</td><td>5 gambling games (costs to play)</td></tr>
                        <tr><td>Arena Betting</td><td>Varies</td><td>Bet on battles, win big!</td></tr>
                        <tr><td>Minecraft</td><td>Varies</td><td>Mob kills, mining, quests</td></tr>
                        <tr><td>Player Shop</td><td>Varies</td><td>Sell items to others</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Camp Store</h2>
                
                <div class="command">
                    <div class="command-name">!shop</div>
                    <div class="command-desc">Opens the camp store with category selection.</div>
                </div>

                <p><strong>Shop Categories:</strong></p>
                <ul>
                    <li><strong>Weapons</strong> - Swords, bows, and celestial bronze gear</li>
                    <li><strong>Armor</strong> - Protection for your adventures</li>
                    <li><strong>Consumables</strong> - Potions and food items</li>
                    <li><strong>Divine Blessings</strong> - Golden Touch multiplier and more</li>
                    <li><strong>Permits</strong> - Shop Permit to run your own store</li>
                </ul>

                <div class="info-box tip">
                    <div class="info-box-title">Minecraft Delivery</div>
                    <p>Items purchased in the shop are queued for pickup. Use <code>/chbpending</code> in Minecraft to receive them!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Transferring Drachma</h2>
                
                <div class="command">
                    <div class="command-name">!transfer @user [amount]</div>
                    <div class="command-desc">Transfer Drachma to a Discord user. Requires confirmation.</div>
                </div>

                <div class="command">
                    <div class="command-name">!mctransfer [MCname] [amount]</div>
                    <div class="command-desc">Transfer Drachma to a player by their Minecraft username.</div>
                </div>

                <div class="command">
                    <div class="command-name">!transactions</div>
                    <div class="command-desc">View your recent transaction history.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Golden Touch Multiplier</h2>
                <p>Want to earn Drachma faster? Purchase a Golden Touch from the shop!</p>
                
                <ul>
                    <li><strong>2x Drachma</strong> on all earnings for 24 hours</li>
                    <li>Applies to games, daily rewards, and other sources</li>
                    <li>Buy another to extend the duration</li>
                </ul>
            </div>
        `
    },

    'games': {
        icon: '🎮',
        title: 'Mini-Games',
        subtitle: 'Mythology-themed games for Drachma',
        content: `
            <div class="doc-section">
                <h2>Mini-Games Arcade</h2>
                <p>10 unique mythology-themed games with different mechanics and rewards! All games are free to play.</p>
                
                <div class="command">
                    <div class="command-name">!games</div>
                    <div class="command-aliases">Aliases: !game, !play, !minigames</div>
                    <div class="command-desc">Opens game selection menu.</div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">Cooldowns</div>
                    <p>Each game has a 5-minute cooldown after playing. Rotate through games to maximize earnings!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Adventure Games</h2>

                <div class="game-card">
                    <h4>Godly Trials</h4>
                    <p>Face 3 mythological encounters! Each choice has different success odds. Win 2/3 rounds to earn rewards.</p>
                    <span class="game-reward">3 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Labyrinth Escape</h4>
                    <p>Navigate Daedalus's maze! Avoid monsters, walls, and hidden traps. Reach the exit in 3 rounds.</p>
                    <span class="game-reward">5 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Cerberus Dodge</h4>
                    <p>Dodge Cerberus's three heads! Quick reactions required as each head snaps at you.</p>
                    <span class="game-reward">1-5 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Chariot Race</h4>
                    <p>Race your chariot to victory! Choose when to push ahead, play it safe, or sabotage opponents.</p>
                    <span class="game-reward">4 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Pegasus Flight</h4>
                    <p>Fly Pegasus to Mount Olympus! Manage stamina, dodge obstacles, and catch wind currents.</p>
                    <span class="game-reward">5 Drachma</span>
                </div>
            </div>

            <div class="doc-section">
                <h2>Skill Games</h2>

                <div class="game-card">
                    <h4>Olympian Archery</h4>
                    <p>Test your aim with 5 arrow shots. Time your release perfectly for bullseyes!</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>Hydra Strike</h4>
                    <p>Cut the Hydra's heads before they regenerate! Wrong cuts spawn more heads.</p>
                    <span class="game-reward">4-6 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Oracle's Vision</h4>
                    <p>Memory matching game! Find all symbol pairs before time runs out.</p>
                    <span class="game-reward">4-7 Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Siren's Song</h4>
                    <p>Resist the Siren! Memorize and repeat increasingly complex sequences.</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>Lightning Roulette</h4>
                    <p>Risk vs reward! Keep spinning for bigger multipliers, but Zeus might strike you down...</p>
                    <span class="game-reward">2-25 Drachma</span>
                </div>
            </div>
        `
    },

    'casino': {
        icon: '🎰',
        title: 'Casino',
        subtitle: "Vi's high-stakes gambling games",
        content: `
            <div class="doc-section">
                <h2>Vi's Casino</h2>
                <p><strong>Vi (VianiteGMG)</strong> runs the camp casino with real Drachma gambling! These 5 games cost Drachma to play but offer bigger rewards.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">Gambling Warning</div>
                    <p>Casino games require <strong>real Drachma</strong> to play. You can lose your bet! Maximum win per game is capped at 200. Play responsibly!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Olympus Slots</h2>
                <p>Classic 3-reel slot machine with Olympic symbols!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th><th>Jackpot</th></tr>
                        <tr><td>10</td><td>200</td><td>Three diamonds = 100x</td></tr>
                    </table>
                </div>
                
                <p>Match 3 symbols for payouts. Three diamonds is the jackpot!</p>
            </div>

            <div class="doc-section">
                <h2>Hermes Roulette</h2>
                <p>The trickster god's wheel of fortune!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th></tr>
                        <tr><td>15</td><td>200</td></tr>
                    </table>
                </div>
                
                <p><strong>Bet Types:</strong></p>
                <ul>
                    <li>Red / Black - 2x payout</li>
                    <li>Odd / Even - 2x payout</li>
                    <li>Exact Number - 35x payout</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Athena's Blackjack</h2>
                <p>Beat the dealer with strategy and luck!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th><th>Blackjack</th></tr>
                        <tr><td>20</td><td>200</td><td>1.5x payout</td></tr>
                    </table>
                </div>
                
                <p>Standard blackjack rules: Get closer to 21 than the dealer without busting!</p>
            </div>

            <div class="doc-section">
                <h2>Apollo's Dice</h2>
                <p>Predict the dice roll outcome!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th></tr>
                        <tr><td>5</td><td>200</td></tr>
                    </table>
                </div>
                
                <p><strong>Bet Options:</strong></p>
                <ul>
                    <li>High (8-12) or Low (2-6) - 2x</li>
                    <li>Exact sum - Up to 30x!</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Tyche's Coin Flip</h2>
                <p>Simple double-or-nothing with the goddess of fortune!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Win</th><th>Loss</th></tr>
                        <tr><td>25</td><td>50</td><td>0</td></tr>
                    </table>
                </div>
                
                <p>Call heads or tails. 50/50 chance to double your bet!</p>
            </div>

            <div class="doc-section">
                <h2>The House</h2>
                <p>The casino is run by Vi, who collects <strong>50% of player losses</strong>. When you lose, half goes to the house. When you win, it's all yours (up to the 200 cap)!</p>
            </div>
        `
    },

'arena': {
    icon: '⚔️',
    title: 'Arena Battles',
    subtitle: 'PvP, PvE wave battles, and boss fights with betting',
    content: `
        <div class="doc-section">
            <h2>The Arena</h2>
            <p>The ultimate test of demigod combat! Battle other players, survive waves of themed monsters, or challenge legendary bosses - all with an integrated betting system.</p>
            
            <div class="command">
                <div class="command-name">!arena</div>
                <div class="command-desc">View arena options and create or join battles.</div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Battle Types</h2>
            
            <h3>PvP Battles</h3>
            <p>Fight against other demigods in skill-based combat!</p>
            <div class="table-container">
                <table>
                    <tr><th>Format</th><th>Players</th><th>Duration</th></tr>
                    <tr><td>1v1</td><td>2</td><td>5 min</td></tr>
                    <tr><td>1v1v1</td><td>3</td><td>5 min</td></tr>
                    <tr><td>1v1v1v1</td><td>4</td><td>5 min</td></tr>
                    <tr><td>2v2</td><td>4</td><td>7 min</td></tr>
                    <tr><td>2v2v2</td><td>6</td><td>7 min</td></tr>
                    <tr><td>2v2v2v2</td><td>8</td><td>7 min</td></tr>
                </table>
            </div>
            
            <h3>PvE Wave Battles</h3>
            <p>Survive 5 increasingly difficult waves of themed monsters! The arena transforms to match each challenge.</p>
            <div class="table-container">
                <table>
                    <tr><th>Arena</th><th>Theme</th><th>Team Size</th><th>Duration</th></tr>
                    <tr><td>Zombie Horde</td><td>Undead Apocalypse</td><td>1-4</td><td>15 min</td></tr>
                    <tr><td>Nether Assault</td><td>Demonic Invasion</td><td>1-4</td><td>12 min</td></tr>
                    <tr><td>Deep Waters</td><td>Aquatic Terror</td><td>1-4</td><td>10 min</td></tr>
                    <tr><td>Jurassic Park</td><td>Prehistoric Rampage</td><td>1-4</td><td>12 min</td></tr>
                    <tr><td>FNAF</td><td>Survival Horror</td><td>1-4</td><td>8 min</td></tr>
                </table>
            </div>
            
            <div class="info-box tip">
                <div class="info-box-title">Dynamic Arenas</div>
                <p>PvE battles feature themed arena sets that paste into the arena before battle! Watch the arena transform to match your challenge.</p>
            </div>
            
            <h3>Boss Battles</h3>
            <p>Challenge powerful bosses with a partner!</p>
            <div class="table-container">
                <table>
                    <tr><th>Boss</th><th>Team Size</th><th>Duration</th></tr>
                    <tr><td>Woodland Witch Doctor</td><td>1-2</td><td>10 min</td></tr>
                    <tr><td>Atlatitan</td><td>1-2</td><td>10 min</td></tr>
                    <tr><td>Umvuthana Raptor</td><td>1-2</td><td>10 min</td></tr>
                </table>
            </div>
        </div>

        <div class="doc-section">
            <h2>PvE Wave System</h2>
            <p>Each PvE battle features 5 waves of increasingly difficult enemies:</p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h4>Zombie Horde</h4>
                    <p>15-minute survival against the undead! Mobs from vanilla, The Undergarden, Luminous World, and Alex's Mobs.</p>
                    <ul>
                        <li>Wave 1: Zombies, baby zombies, chicken jockeys</li>
                        <li>Wave 2: + Husks, zombie villagers, rotlings & rotwalkers</li>
                        <li>Wave 3: + Miner/swamp zombies, rotbeasts</li>
                        <li>Wave 4: + Frigid/dark oak zombies, forgotten guardians</li>
                        <li>Wave 5: + Warped Moscos!</li>
                    </ul>
                    <p style="margin-top: 0.5rem; font-size: 0.85rem;"><strong>Rewards:</strong> 150 Drachma + random item (zombie head, raygun, throwing bomb, pistol, or gold rounds)</p>
                </div>
                <div class="feature-card">
                    <h4>Nether Assault</h4>
                    <p>Demons from the depths! Piglin brutes, blazes, wither skeletons, and ghasts!</p>
                    <ul>
                        <li>Wave 1: Piglin scouts + blazes</li>
                        <li>Wave 2: Wither skeletons join</li>
                        <li>Wave 3: Piglin brute assault</li>
                        <li>Wave 4: Ghast bombardment</li>
                        <li>Wave 5: Full nether invasion!</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <h4>Deep Waters</h4>
                    <p>Terrors from the deep including drowned, guardians, and creatures from Alex's Caves!</p>
                    <ul>
                        <li>Wave 1: Drowned + guardians</li>
                        <li>Wave 2: Elder guardian appears</li>
                        <li>Wave 3: Guardian swarm</li>
                        <li>Wave 4: Sea creatures</li>
                        <li>Wave 5: Grottoceratops!</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <h4>Jurassic Park</h4>
                    <p>Prehistoric chaos with Alex's Caves dinosaurs!</p>
                    <ul>
                        <li>Wave 1: Vallumraptor pack</li>
                        <li>Wave 2: Subterranodons</li>
                        <li>Wave 3: Grottoceratops</li>
                        <li>Wave 4: Tremorsaurus!</li>
                        <li>Wave 5: Dinosaur stampede!</li>
                    </ul>
                </div>
            </div>

            <div class="info-box warning">
                <div class="info-box-title">FNAF Arena</div>
                <p>The FNAF arena is currently in <strong>survival mode</strong> - no mobs spawn. Special FNAF animatronics coming soon!</p>
            </div>
        </div>

        <div class="doc-section">
            <h2>Life System (PvE)</h2>
            <p>PvE battles use a unique life system:</p>
            <ul>
                <li>Each player starts with <strong>1 life</strong></li>
                <li>When you die, you lose your life but can <strong>respawn and keep fighting</strong></li>
                <li><strong>WIN:</strong> Timer runs out = team survived!</li>
                <li><strong>LOSS:</strong> All players have lost their life AND all are currently dead</li>
            </ul>
            <p>If 3 of 4 players have died, they can respawn to protect the last player standing until the timer ends!</p>
            
            <div class="info-box tip">
                <div class="info-box-title">Kill Tracking</div>
                <p>Your kills and deaths are tracked in the actionbar during battle and shown in the final Discord results!</p>
            </div>
        </div>

        <div class="doc-section">
            <h2>How Battles Work</h2>
            <ol>
                <li><strong>Creation</strong> - Someone creates a battle with <code>!arena create [type]</code></li>
                <li><strong>Enrollment</strong> - Players click "Join Battle" (must have linked MC account)</li>
                <li><strong>Betting Opens</strong> - Once full, spectators can place bets</li>
                <li><strong>Arena Setup</strong> - For PvE, the themed arena pastes in!</li>
                <li><strong>Teleport</strong> - Participants are teleported to the arena in Minecraft</li>
                <li><strong>Fight!</strong> - Battle through waves or until time expires</li>
                <li><strong>Results</strong> - Winner determined, payouts distributed, arena resets</li>
            </ol>

            <div class="command">
                <div class="command-name">!arena create zombie</div>
                <div class="command-desc">Creates a Zombie Horde PvE battle</div>
            </div>

            <div class="command">
                <div class="command-name">!arena create jurassic @Player1 @Player2</div>
                <div class="command-desc">Creates a Jurassic Park battle with pre-enrolled players</div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Betting System</h2>
            <p>Spectators can bet on battles for big rewards!</p>
            
            <p><strong>Bet Amounts:</strong> 5, 10, 25, 50, 75, 100, 250, 500, 1000</p>
            
            <p><strong>How Payouts Work:</strong></p>
            <ul>
                <li>All bets form a pool</li>
                <li>Winners split the pool proportionally based on bet size</li>
                <li>If your side loses, you lose your bet</li>
                <li>Ties refund all bets!</li>
            </ul>
            
            <div class="info-box tip">
                <div class="info-box-title">Smart Betting</div>
                <p>Bet early when odds are unclear for potentially bigger payouts. Late bets on favorites return less!</p>
            </div>
        </div>

        <div class="doc-section">
            <h2>Victory Conditions</h2>
            <ul>
                <li><strong>PvP:</strong> Team/player with fewest deaths wins</li>
                <li><strong>PvE:</strong> Survive until the timer runs out! Team loses if all players are dead with no lives remaining</li>
                <li><strong>Boss:</strong> Defeat the boss before time expires</li>
            </ul>
        </div>

        <div class="doc-section">
            <h2>Commands Reference</h2>
            
            <div class="command">
                <div class="command-name">!arena create [type] [@players]</div>
                <div class="command-desc">Create a battle. Types: 1v1, 2v2, zombie, nether, water, jurassic, fnaf, woodland_witch_doctor, atlatitan, umvuthana_raptor</div>
            </div>

            <div class="command">
                <div class="command-name">!arena start [id]</div>
                <div class="command-desc">Skip enrollment and start betting phase</div>
            </div>

            <div class="command">
                <div class="command-name">!arena fight [id]</div>
                <div class="command-desc">Skip betting and start battle immediately</div>
            </div>

            <div class="command">
                <div class="command-name">!arena cancel [id]</div>
                <div class="command-desc">Cancel a pending battle (refunds all bets)</div>
            </div>

            <div class="command">
                <div class="command-name">!arena types</div>
                <div class="command-desc">List all available battle types</div>
            </div>

            <div class="command">
                <div class="command-name">!arena stats [@player]</div>
                <div class="command-desc">View arena statistics</div>
            </div>

            <div class="command">
                <div class="command-name">!arena leaderboard</div>
                <div class="command-desc">View top arena fighters</div>
            </div>
        </div>
    `
},

    'daily': {
        icon: '📅',
        title: 'Daily Prompts',
        subtitle: 'Mythology trivia for daily rewards',
        content: `
            <div class="doc-section">
                <h2>Daily Prompts</h2>
                <p>Each day, the gods present you with a mythological challenge. Answer correctly for bonus Drachma!</p>
                
                <div class="command">
                    <div class="command-name">!daily</div>
                    <div class="command-desc">Claim your daily reward with a mythology interaction. 23-hour cooldown.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Daily Interactions</h2>
                <p>You might encounter:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>The Serpent's Riddle</h4>
                        <p>A serpent blocks your path with a riddle...</p>
                    </div>
                    <div class="feature-card">
                        <h4>Athena's Test</h4>
                        <p>An owl brings a challenge from the goddess of wisdom...</p>
                    </div>
                    <div class="feature-card">
                        <h4>Hermes' Gambit</h4>
                        <p>The trickster god shuffles three cups...</p>
                    </div>
                    <div class="feature-card">
                        <h4>Hephaestus' Forge</h4>
                        <p>The smith god tests your knowledge of crafting...</p>
                    </div>
                    <div class="feature-card">
                        <h4>Poseidon's Wave</h4>
                        <p>The sea god questions your knowledge of his domain...</p>
                    </div>
                    <div class="feature-card">
                        <h4>Artemis' Hunt</h4>
                        <p>Silver tracks lead to a test from the huntress...</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Rewards</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Result</th><th>Reward</th></tr>
                        <tr><td>Correct Answer</td><td>4-10 Drachma (varies by challenge)</td></tr>
                        <tr><td>Wrong Answer</td><td>2-3 Drachma (consolation)</td></tr>
                    </table>
                </div>
                
                <div class="info-box tip">
                    <div class="info-box-title">Study Up!</div>
                    <p>Brush up on Greek mythology to maximize your daily rewards. The gods respect those who know their history!</p>
                </div>
            </div>
        `
    },

    'blessings': {
        icon: '✨',
        title: 'Divine Blessings',
        subtitle: 'Weekly godly favors',
        content: `
            <div class="doc-section">
                <h2>Divine Blessings</h2>
                <p>Every 7 days, you receive <strong>2 divine blessings</strong> from your godly parent. Use them wisely!</p>
                
                <div class="command">
                    <div class="command-name">!blessings</div>
                    <div class="command-desc">Check your current blessings and when they reset.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>What Blessings Do</h2>
                <p>Blessings can be spent on special divine favors:</p>
                <ul>
                    <li><strong>Temporary buffs</strong> in Minecraft</li>
                    <li><strong>Protection</strong> from certain effects</li>
                    <li><strong>Special abilities</strong> based on your god parent</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Use It or Lose It</div>
                    <p>Blessings reset every 7 days whether you use them or not. Don't let them go to waste!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Sync with Minecraft</h2>
                <p>Your blessing count syncs to Minecraft:</p>
                <ul>
                    <li>Stored in the <code>chb_blessings</code> scoreboard</li>
                    <li>Use <code>/trigger blessing</code> to activate in-game</li>
                    <li>Effects vary by your god parent</li>
                </ul>
            </div>
        `
    },

    'quests': {
        icon: '📜',
        title: 'Quests',
        subtitle: 'Request custom adventures',
        content: `
            <div class="doc-section">
                <h2>Quest System</h2>
                <p>True demigods don't wait for adventure - they seek it! Request custom quests for your character's journey.</p>
                
                <div class="command">
                    <div class="command-name">!requestquest</div>
                    <div class="command-desc">Opens a form to submit a quest idea for admin approval.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Submitting a Quest</h2>
                <p>When requesting a quest, provide:</p>
                <ul>
                    <li><strong>Quest Name</strong> - A title for your adventure</li>
                    <li><strong>Description</strong> - What do you want to do? (20-500 characters)</li>
                    <li><strong>Participants</strong> - Solo or list other players joining</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Good Quest Ideas</div>
                    <p>Tie your quest to mythology! Retrieve a legendary item, defeat a monster, explore a dangerous location, or help an NPC in need.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Approval Process</h2>
                <ol>
                    <li>Submit your quest request</li>
                    <li>Admins review and discuss</li>
                    <li>You receive <strong>mail</strong> with the decision</li>
                    <li>If approved, coordinate with staff for the quest!</li>
                </ol>
                
                <p>Denied? Don't worry! The mail will explain why and you can submit a revised idea.</p>
            </div>

            <div class="doc-section">
                <h2>Quest Rewards</h2>
                <p>Completed quests may reward:</p>
                <ul>
                    <li><strong>Drachma</strong> based on difficulty</li>
                    <li><strong>Special items</strong> not found in shops</li>
                    <li><strong>Timeline entry</strong> commemorating your deeds</li>
                    <li><strong>Titles or recognition</strong> in the community</li>
                </ul>
            </div>
        `
    },

    'events': {
        icon: '🎭',
        title: 'Events',
        subtitle: 'Camp activities and scheduling',
        content: `
            <div class="doc-section">
                <h2>Camp Events</h2>
                <p>Camp Half-Blood hosts regular events - from chariot races to capture the flag, theatrical performances to tournaments!</p>
                
                <div class="command">
                    <div class="command-name">!events</div>
                    <div class="command-desc">View upcoming events and RSVP to participate.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Chariot Races</h4>
                        <p>1st: 50, 2nd: 30, 3rd: 15</p>
                    </div>
                    <div class="feature-card">
                        <h4>Capture the Flag</h4>
                        <p>Winners: 40, MVP: +20</p>
                    </div>
                    <div class="feature-card">
                        <h4>Monster Hunts</h4>
                        <p>Completion: 60</p>
                    </div>
                    <div class="feature-card">
                        <h4>Olympian Games</h4>
                        <p>Gold: 75, Silver: 50, Bronze: 25</p>
                    </div>
                    <div class="feature-card">
                        <h4>Theater Shows</h4>
                        <p>Participation: 10, Best Actor: 30</p>
                    </div>
                    <div class="feature-card">
                        <h4>Campfires</h4>
                        <p>Social gatherings with stories and songs</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Creating Events</h2>
                <p>Staff and cabin leaders can create events:</p>
                
                <div class="command">
                    <div class="command-name">!events create</div>
                    <div class="command-desc">Opens the event creation form (requires permissions).</div>
                </div>
                
                <p>Provide event name, description, type, and scheduled time (YYYY-MM-DD HH:MM format).</p>
            </div>

            <div class="doc-section">
                <h2>RSVPing</h2>
                <p>When viewing events, click to RSVP:</p>
                <ul>
                    <li><strong>Attending</strong> - You plan to participate</li>
                    <li><strong>Maybe</strong> - You might make it</li>
                    <li><strong>Not Attending</strong> - Can't make it</li>
                </ul>
            </div>
        `
    },

    'divine-messages': {
        icon: '🏛️',
        title: 'Divine Messages',
        subtitle: 'Words from the gods',
        content: `
            <div class="doc-section">
                <h2>Divine Messages</h2>
                <p>The gods watch over Camp Half-Blood and occasionally share their wisdom (or complaints) with demigods!</p>
            </div>

            <div class="doc-section">
                <h2>Weather Messages</h2>
                <p>When weather changes in Minecraft, the gods might comment:</p>
                <ul>
                    <li><strong>Rain starts</strong> - Zeus, Poseidon, Demeter, or Iris may speak</li>
                    <li><strong>Rain stops</strong> - Apollo often takes credit</li>
                    <li><strong>Thunder</strong> - Zeus asserts his dominance</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Time-Based Messages</h2>
                <p>At certain times of day:</p>
                <ul>
                    <li><strong>Dawn (6 AM)</strong> - Apollo, Eos, Artemis</li>
                    <li><strong>Noon (12 PM)</strong> - Apollo at his peak</li>
                    <li><strong>Dusk (6 PM)</strong> - Artemis, Hecate</li>
                    <li><strong>Midnight</strong> - Hecate, Hypnos, Hades, Nyx</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Divine Mail</h2>
                <p>Sometimes gods send personal messages to demigods!</p>
                
                <p>Message types include:</p>
                <ul>
                    <li><strong>Funny</strong> - Gods being their dramatic selves</li>
                    <li><strong>Serious</strong> - Actual wisdom and advice</li>
                    <li><strong>Challenges</strong> - Tasks from your godly parent</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">Be Interesting!</div>
                    <p>The more active you are, the more likely the gods are to notice you and send mail!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Sample Messages</h2>
                <blockquote>
                    <p><strong>Zeus:</strong> "I saw what you did yesterday. Don't think I didn't notice. I notice EVERYTHING. Mostly because I'm bored."</p>
                </blockquote>
                <blockquote>
                    <p><strong>Apollo:</strong> "Sun rises slowly / I am very beautiful / Please clap for me now"</p>
                </blockquote>
                <blockquote>
                    <p><strong>Athena:</strong> "Your cabin is disorganized. This is unacceptable. I've prepared a 47-page organization guide."</p>
                </blockquote>
            </div>
        `
    },

    'timeline': {
        icon: '📜',
        title: 'Camp Timeline',
        subtitle: 'Record camp history',
        content: `
            <div class="doc-section">
                <h2>Camp Timeline</h2>
                <p>The timeline records the history of Camp Half-Blood - battles won, quests completed, events held, and more!</p>
                
                <div class="command">
                    <div class="command-name">!timeline</div>
                    <div class="command-desc">View the camp timeline with filtering options.</div>
                </div>
                
                <div class="command">
                    <div class="command-name">!timeline [category]</div>
                    <div class="command-desc">Filter by category. Example: <code>!timeline quest</code></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Categories</h2>
                
                <div class="feature-grid">
                    <div class="feature-card"><h4>Event</h4><p>Camp events and celebrations</p></div>
                    <div class="feature-card"><h4>Quest</h4><p>Quest completions</p></div>
                    <div class="feature-card"><h4>Tournament</h4><p>Competition results</p></div>
                    <div class="feature-card"><h4>Interaction</h4><p>Notable character moments</p></div>
                    <div class="feature-card"><h4>Discovery</h4><p>Revelations and findings</p></div>
                    <div class="feature-card"><h4>Battle</h4><p>Combat encounters</p></div>
                    <div class="feature-card"><h4>Ceremony</h4><p>Rituals and ceremonies</p></div>
                    <div class="feature-card"><h4>Other</h4><p>Everything else</p></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Adding Entries</h2>
                <p>Click "Add Entry" in the timeline view to record your own history!</p>
                <ol>
                    <li>Select a <strong>category</strong> for your entry</li>
                    <li>Enter the <strong>date</strong> (or leave blank for today)</li>
                    <li>Write a <strong>title</strong> (max 100 characters)</li>
                    <li>Add a <strong>description</strong> (max 300 characters)</li>
                </ol>
                
                <div class="info-box tip">
                    <div class="info-box-title">Make History!</div>
                    <p>Did something epic? Record it! The timeline is a living history of our camp.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Editing & Deleting</h2>
                <p>Select one of your entries to:</p>
                <ul>
                    <li><strong>Edit</strong> - Update details or fix typos</li>
                    <li><strong>Change Category</strong> - Recategorize the entry</li>
                    <li><strong>Delete</strong> - Remove the entry entirely</li>
                </ul>
                <p>You can only modify your own entries (admins can modify all).</p>
            </div>
        `
    },

    'shops': {
        icon: '🏪',
        title: 'Player Shops',
        subtitle: 'Run your own business',
        content: `
            <div class="doc-section">
                <h2>Player-Run Shops</h2>
                <p>Own a piece of Camp Half-Blood's economy! Player shops let you sell Minecraft items to other campers for Drachma.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">Requirement</div>
                    <p>You need a <strong>Shop Permit</strong> (500 Drachma) from <code>!shop</code> -> Permits.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Opening Your Shop</h2>
                
                <div class="steps">
                    <div class="step-item">
                        <h4>Buy a Shop Permit</h4>
                        <p>Use <code>!shop</code> -> Permits -> Shop Permit (500)</p>
                    </div>
                    <div class="step-item">
                        <h4>Use the Permit</h4>
                        <p><code>!inventory</code> -> Select Permit -> "Create My Shop"</p>
                    </div>
                    <div class="step-item">
                        <h4>Name Your Shop</h4>
                        <p>Enter name, type, and description.</p>
                    </div>
                    <div class="step-item">
                        <h4>Add Listings</h4>
                        <p>List items with Minecraft item IDs and prices.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Managing Your Shop</h2>
                
                <div class="command">
                    <div class="command-name">!myshop</div>
                    <div class="command-desc">Manage your shop (add/remove listings, view orders).</div>
                </div>

                <div class="command">
                    <div class="command-name">!playershops</div>
                    <div class="command-aliases">Aliases: !pshops, !browseshops</div>
                    <div class="command-desc">Browse all active player shops.</div>
                </div>
                
                <p><strong>From management panel:</strong></p>
                <ul>
                    <li><strong>Add Listing</strong> - List a new item (max 5)</li>
                    <li><strong>View Listings</strong> - See your active items</li>
                    <li><strong>Pending Deliveries</strong> - Orders to fulfill</li>
                    <li><strong>Edit Shop</strong> - Change name/description</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Order Fulfillment</h2>
                <p>When someone buys from you:</p>
                <ol>
                    <li>You get <strong>mail</strong> with buyer's MC username</li>
                    <li>Meet them in Minecraft and trade items</li>
                    <li><code>!myshop</code> -> Pending -> Mark Complete</li>
                    <li>Payment released to you!</li>
                </ol>

                <div class="info-box tip">
                    <div class="info-box-title">Security</div>
                    <p>Payment is held in escrow until you confirm delivery!</p>
                </div>
            </div>
        `
    },

    'yugioh': {
        icon: '🃏',
        title: 'Shadow Duels',
        subtitle: 'Yu-Gi-Oh style card battles',
        content: `
            <div class="doc-section">
                <h2>Shadow Realm Dueling</h2>
                <p>A special card game where demigods can be challenged to Yu-Gi-Oh style duels!</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">Special Feature</div>
                    <p>Shadow Duels can only be initiated by a specific designated duelist. If challenged, you can accept or decline!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>How Duels Work</h2>
                <ol>
                    <li>The duelist challenges you with <code>!duel @user</code></li>
                    <li>You have 5 minutes to accept or decline</li>
                    <li>Both players start with <strong>4000 LP</strong></li>
                    <li>Each round, play a card from your hand</li>
                    <li>Monsters battle based on ATK/DEF stats</li>
                    <li>First to reduce opponent to 0 LP wins!</li>
                </ol>
            </div>

            <div class="doc-section">
                <h2>Card Types</h2>
                
                <h3>Monster Cards</h3>
                <p>Summon monsters to attack! Higher ATK means more damage.</p>
                <ul>
                    <li>Dark Magician (2500 ATK)</li>
                    <li>Blue-Eyes White Dragon (3000 ATK)</li>
                    <li>Red-Eyes Black Dragon (2400 ATK)</li>
                    <li>Summoned Skull (2500 ATK)</li>
                    <li>Dark Magician Girl (2000 ATK)</li>
                    <li>Black Luster Soldier (3000 ATK)</li>
                </ul>
                
                <h3>Spell Cards</h3>
                <p>Powerful one-time effects:</p>
                <ul>
                    <li>Swords of Revealing Light - Opponent skips turn</li>
                    <li>Monster Reborn - Restore 500 LP</li>
                    <li>Pot of Greed - Draw 2 cards</li>
                    <li>Dark Hole - Destroy opponent's monster</li>
                    <li>Raigeki - Deal 800 direct damage</li>
                </ul>
                
                <h3>Trap Cards</h3>
                <p>Defensive surprises:</p>
                <ul>
                    <li>Mirror Force - Reflect attack damage</li>
                    <li>Magic Cylinder - Negate attack + 1000 damage</li>
                    <li>Trap Hole - Destroy attacking monster</li>
                    <li>Negate Attack - Cancel the attack</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Rewards</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Outcome</th><th>Reward</th></tr>
                        <tr><td>Win the duel</td><td>25 Drachma</td></tr>
                        <tr><td>Opponent doesn't respond</td><td>10 Drachma (forfeit)</td></tr>
                        <tr><td>Lose the duel</td><td>0 Drachma</td></tr>
                    </table>
                </div>
            </div>
        `
    },

    // Minecraft pages

    'mclink': {
        icon: '🔗',
        title: 'Account Linking',
        subtitle: 'Connect Discord and Minecraft',
        content: `
            <div class="doc-section">
                <h2>Why Link Your Accounts?</h2>
                <p>Linking your Discord and Minecraft accounts unlocks the full Camp Half-Blood experience:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Synced Economy</h4>
                        <p>Drachma earned anywhere is available everywhere</p>
                    </div>
                    <div class="feature-card">
                        <h4>God Effects</h4>
                        <p>Your godly parent's blessing follows you in-game</p>
                    </div>
                    <div class="feature-card">
                        <h4>Skill Effects</h4>
                        <p>Upgrade skills in Discord, get buffs in Minecraft</p>
                    </div>
                    <div class="feature-card">
                        <h4>Item Delivery</h4>
                        <p>Buy items in Discord, receive them in-game</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>How to Link</h2>
                
                <div class="command">
                    <div class="command-name">!mclink [MinecraftUsername]</div>
                    <div class="command-desc">Links your Discord to Minecraft. Example: <code>!mclink Steve</code></div>
                </div>

                <div class="command">
                    <div class="command-name">!mcunlink</div>
                    <div class="command-desc">Removes the link between accounts.</div>
                </div>

                <div class="command">
                    <div class="command-name">!mcsync</div>
                    <div class="command-desc">Force immediate sync. Auto-sync runs every 30 seconds.</div>
                </div>

                <div class="command">
                    <div class="command-name">!mconline</div>
                    <div class="command-desc">See which linked players are in Minecraft.</div>
                </div>
                
                <div class="info-box warning">
                    <div class="info-box-title">Exact Username Required</div>
                    <p>Use your exact Minecraft username (case-sensitive). Java Edition usernames are 3-16 characters.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>After Linking</h2>
                <p>Once linked, the following happens automatically:</p>
                <ul>
                    <li><strong>Sync runs every 30 seconds</strong> when you're online in MC</li>
                    <li><strong>God effects apply</strong> based on your claimed parent</li>
                    <li><strong>Name color</strong> updates to your god's color</li>
                    <li><strong>Drachma syncs</strong> between platforms</li>
                    <li><strong>Skills apply</strong> their bonuses</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>How Sync Works</h2>
                <ul>
                    <li><strong>Discord is Source:</strong> Your Discord balance is the master</li>
                    <li><strong>Deposits Add:</strong> <code>/chbdeposit</code> in MC adds to Discord</li>
                    <li><strong>Withdrawals Subtract:</strong> <code>/chbwithdraw</code> subtracts and gives items</li>
                    <li><strong>Auto-Sync:</strong> Every 30 seconds automatically</li>
                </ul>
            </div>
        `
    },

    'mc-commands': {
        icon: '⌨️',
        title: 'MC Commands',
        subtitle: 'In-game command reference',
        content: `
            <div class="doc-section">
                <h2>Minecraft Commands</h2>
                <p>Available when your account is linked via <code>!mclink</code>.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">Link Required</div>
                    <p>Use <code>!mclink YourName</code> on Discord first!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Profile Commands</h2>
                
                <div class="command">
                    <div class="command-name">/chbprofile</div>
                    <div class="command-desc">View your full profile in-game.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbbalance</div>
                    <div class="command-desc">Quick balance check.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbsync</div>
                    <div class="command-desc">Force sync with Discord.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbskills</div>
                    <div class="command-desc">View your active skill effects.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Economy Commands</h2>
                
                <div class="command">
                    <div class="command-name">/chbdeposit</div>
                    <div class="command-desc">Deposit physical Drachma items into your balance.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbwithdraw [amount]</div>
                    <div class="command-desc">Withdraw as physical items. Ex: <code>/chbwithdraw 50</code></div>
                </div>

                <div class="command">
                    <div class="command-name">/chbpending</div>
                    <div class="command-desc">Receive items purchased on Discord.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Other Commands</h2>
                
                <div class="command">
                    <div class="command-name">/trigger blessing</div>
                    <div class="command-desc">Activate one of your divine blessings.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbhelp</div>
                    <div class="command-desc">Shows all available commands.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbleaderboard</div>
                    <div class="command-desc">View top Drachma earners.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbwho [player]</div>
                    <div class="command-desc">See another player's god parent and cabin.</div>
                </div>
            </div>
        `
    },

    'mc-sync': {
        icon: '🔄',
        title: 'Deposit & Withdraw',
        subtitle: 'Managing Drachma between platforms',
        content: `
            <div class="doc-section">
                <h2>Two-Way Economy</h2>
                <p>Move Drachma between Discord and Minecraft as physical items!</p>
            </div>

            <div class="doc-section">
                <h2>Depositing</h2>
                
                <div class="command">
                    <div class="command-name">/chbdeposit</div>
                    <div class="command-desc">Deposits ALL Drachma items from inventory to balance.</div>
                </div>

                <p>Physical Drachma can be found in:</p>
                <ul>
                    <li>Dungeon chests</li>
                    <li>Quest rewards</li>
                    <li>Certain mob drops</li>
                    <li>Your own withdrawals</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Withdrawing</h2>
                
                <div class="command">
                    <div class="command-name">/chbwithdraw [amount]</div>
                    <div class="command-desc">Converts balance to physical items.</div>
                </div>

                <div class="info-box warning">
                    <div class="info-box-title">Caution</div>
                    <p>Physical Drachma can be lost if you die! Only withdraw what you need.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Receiving Purchases</h2>
                
                <div class="command">
                    <div class="command-name">/chbpending</div>
                    <div class="command-desc">Receive items bought from Discord shop.</div>
                </div>

                <p>Items purchased in Discord are queued for delivery. Run this command to receive them!</p>
            </div>
        `
    },

    'mc-gods': {
        icon: '✨',
        title: 'God Effects',
        subtitle: 'Nametag colors & potion effects',
        content: `
            <div class="doc-section">
                <h2>Divine Blessings</h2>
                <p>Your god parent grants nametag colors and permanent potion effects in Minecraft!</p>
            </div>

            <div class="doc-section">
                <h2>Complete God Reference</h2>
                <p>All 19 gods with their nametag colors and potion effects:</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Emoji</th><th>Nametag Color</th><th>Potion Effect</th></tr>
                        <tr><td>Zeus</td><td>⚡</td><td style="color: yellow;">Yellow</td><td>Jump Boost</td></tr>
                        <tr><td>Poseidon</td><td>🔱</td><td style="color: aqua;">Aqua</td><td>Water Breathing</td></tr>
                        <tr><td>Hades</td><td>💀</td><td style="color: gray;">Dark Gray</td><td>Resistance</td></tr>
                        <tr><td>Athena</td><td>🦉</td><td style="color: silver;">Gray</td><td>Haste</td></tr>
                        <tr><td>Apollo</td><td>☀️</td><td style="color: gold;">Gold</td><td>Regeneration</td></tr>
                        <tr><td>Artemis</td><td>🏹</td><td style="color: white;">White</td><td>Speed</td></tr>
                        <tr><td>Ares</td><td>⚔️</td><td style="color: darkred;">Dark Red</td><td>Strength</td></tr>
                        <tr><td>Aphrodite</td><td>💕</td><td style="color: #ff69b4;">Light Purple</td><td>Regeneration</td></tr>
                        <tr><td>Hephaestus</td><td>🔨</td><td style="color: red;">Red</td><td>Fire Resistance</td></tr>
                        <tr><td>Hermes</td><td>👟</td><td style="color: #5555ff;">Blue</td><td>Speed</td></tr>
                        <tr><td>Demeter</td><td>🌾</td><td style="color: green;">Green</td><td>Saturation</td></tr>
                        <tr><td>Dionysus</td><td>🍇</td><td style="color: purple;">Dark Purple</td><td>Luck</td></tr>
                        <tr><td>Hera</td><td>👑</td><td style="color: darkcyan;">Dark Aqua</td><td>Resistance</td></tr>
                        <tr><td>Hecate</td><td>🌙</td><td style="color: darkblue;">Dark Blue</td><td>Slow Falling</td></tr>
                        <tr><td>Hypnos</td><td>😴</td><td style="color: #5555ff;">Blue</td><td>Slow Falling</td></tr>
                        <tr><td>Nike</td><td>🏆</td><td style="color: gold;">Gold</td><td>Speed</td></tr>
                        <tr><td>Nemesis</td><td>⚖️</td><td style="color: gray;">Gray</td><td>Resistance</td></tr>
                        <tr><td>Iris</td><td>🌈</td><td style="color: #ff69b4;">Light Purple</td><td>Glowing</td></tr>
                        <tr><td>Tyche</td><td>🎲</td><td style="color: green;">Green</td><td>Luck</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>How Effects Apply</h2>
                <ul>
                    <li>Effects apply automatically when you join (if linked)</li>
                    <li>They refresh every 30 seconds during sync</li>
                    <li>Changing your god parent in Discord updates MC on next sync</li>
                    <li>Effects are permanent while online - no potion needed!</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Effect Descriptions</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Effect</th><th>What It Does</th><th>Gods</th></tr>
                        <tr><td>Jump Boost</td><td>Jump higher than normal</td><td>Zeus</td></tr>
                        <tr><td>Water Breathing</td><td>Breathe underwater indefinitely</td><td>Poseidon</td></tr>
                        <tr><td>Resistance</td><td>Take reduced damage from all sources</td><td>Hades, Hera, Nemesis</td></tr>
                        <tr><td>Haste</td><td>Mine and attack faster</td><td>Athena</td></tr>
                        <tr><td>Regeneration</td><td>Slowly recover health over time</td><td>Apollo, Aphrodite</td></tr>
                        <tr><td>Speed</td><td>Move faster</td><td>Artemis, Hermes, Nike</td></tr>
                        <tr><td>Strength</td><td>Deal more melee damage</td><td>Ares</td></tr>
                        <tr><td>Fire Resistance</td><td>Immune to fire and lava damage</td><td>Hephaestus</td></tr>
                        <tr><td>Saturation</td><td>Hunger drains slower</td><td>Demeter</td></tr>
                        <tr><td>Luck</td><td>Better loot from fishing and chests</td><td>Dionysus, Tyche</td></tr>
                        <tr><td>Slow Falling</td><td>Fall slowly and take no fall damage</td><td>Hecate, Hypnos</td></tr>
                        <tr><td>Glowing</td><td>You glow (visible through walls)</td><td>Iris</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Permanent Effects</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Effect</th></tr>
                        <tr><td>Zeus</td><td>Jump Boost I, Lightning resistance</td></tr>
                        <tr><td>Poseidon</td><td>Water Breathing, Dolphin's Grace</td></tr>
                        <tr><td>Hades</td><td>Fire Resistance, Night Vision</td></tr>
                        <tr><td>Athena</td><td>Haste I, Enhanced XP</td></tr>
                        <tr><td>Apollo</td><td>Regeneration I</td></tr>
                        <tr><td>Artemis</td><td>Speed I, Night Vision</td></tr>
                        <tr><td>Ares</td><td>Strength I</td></tr>
                        <tr><td>Hephaestus</td><td>Fire Resistance, Haste</td></tr>
                        <tr><td>Hecate</td><td>Night Vision</td></tr>
                        <tr><td>Tyche</td><td>Luck</td></tr>
                        <tr><td>Hermes</td><td>Speed I, Luck</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>How Effects Apply</h2>
                <ul>
                    <li>Effects apply automatically when you join (if linked)</li>
                    <li>They refresh every 30 seconds during sync</li>
                    <li>Changing your god parent in Discord updates MC on next sync</li>
                    <li>Effects are permanent while online - no potion needed!</li>
                </ul>
            </div>
        `
    },

    'skills': {
        icon: '⚔️',
        title: 'Skill Trees',
        subtitle: 'Complete guide to demigod abilities',
        content: `
            <div class="doc-section">
                <h2>The Skill System</h2>
                <p>Every demigod can train and improve their abilities through the skill tree system. Spend your <strong>Minecraft XP Levels</strong> to unlock powerful upgrades that grant real effects in-game!</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">Cross-Platform Power</div>
                    <p>Skills are upgraded via <strong>Discord</strong> but apply real effects in <strong>Minecraft</strong>. You must link your accounts with <code>!mclink</code> first!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Discord Commands</h2>
                
                <div class="command">
                    <div class="command-name">!skills</div>
                    <div class="command-desc">Opens your skill tree interface. View all 10 branches, your current tiers, and available upgrades.</div>
                </div>

                <div class="command">
                    <div class="command-name">!skills [branch]</div>
                    <div class="command-desc">View details for a specific branch. Example: <code>!skills warfare</code> or <code>!skills forging</code></div>
                </div>
                
                <p>The Discord interface shows interactive buttons to upgrade skills, view your build stats, and see cabin member skills.</p>
            </div>

            <div class="doc-section">
                <h2>XP Level Costs</h2>
                <p>Skills are purchased with your Minecraft XP levels. You must be <strong>online in Minecraft</strong> to upgrade!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Cost</th><th>Total Invested</th></tr>
                        <tr><td>Tier 1</td><td>50 levels</td><td>50 levels</td></tr>
                        <tr><td>Tier 2</td><td>75 levels</td><td>125 levels</td></tr>
                        <tr><td>Tier 3</td><td>100 levels</td><td>225 levels</td></tr>
                        <tr><td>Tier 4</td><td>175 levels</td><td>400 levels</td></tr>
                        <tr><td>Tier 5</td><td>200 levels</td><td>600 levels</td></tr>
                    </table>
                </div>

                <div class="info-box warning">
                    <div class="info-box-title">Choose Wisely</div>
                    <p>Skill upgrades are <strong>permanent</strong>. Plan your build before spending! Total cost for one T5 skill: 600 XP levels.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Major & Minor Specializations</h2>
                <p>At <strong>Tier 3</strong>, you must commit to a skill as your Major or Minor. This determines how far you can progress:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Major Skill</h4>
                        <p>Can reach <strong>Tier 5</strong> (Mastery). You get <strong>ONE</strong> Major.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Minor Skill</h4>
                        <p>Capped at <strong>Tier 4</strong>. You get <strong>ONE</strong> Minor.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Dabbling</h4>
                        <p>All other skills capped at <strong>Tier 2</strong>.</p>
                    </div>
                </div>
                
                <p>This means you can have: 1 skill at T5, 1 skill at T4, and up to 8 skills at T2.</p>
            </div>

            <div class="doc-section">
                <h2>Warfare - Master of Blade and Battle</h2>
                <p>Become a devastating melee combatant with increased damage, attack speed, and the Strength effect.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Squire</td><td>50</td><td>+1 Attack Damage</td></tr>
                        <tr><td>T2</td><td>Warrior</td><td>75</td><td>+5% Attack Speed</td></tr>
                        <tr><td>T3</td><td>Champion</td><td>100</td><td>+1 Attack Damage, +10% Knockback Resist</td></tr>
                        <tr><td>T4</td><td>Warlord</td><td>175</td><td>+10% Attack Speed, +1 Attack Damage</td></tr>
                        <tr><td>T5</td><td>Blade Master</td><td>200</td><td>+2 Attack Damage, +20% KB Resist, <span style="color: #44ff44;">Strength I</span></td></tr>
                    </table>
                </div>
                <p><strong>God of War (T5 Total):</strong> +5 Damage, +15% Attack Speed, +30% KB Resist, Permanent Strength I</p>
            </div>

            <div class="doc-section">
                <h2>Marksmanship - Every Arrow Finds Its Mark</h2>
                <p>Perfect your ranged combat with damage bonuses and a chance for devastating critical shots.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Archer</td><td>50</td><td>+1 Attack Damage (melee backup)</td></tr>
                        <tr><td>T2</td><td>Sharpshooter</td><td>75</td><td>+10% Attack Speed</td></tr>
                        <tr><td>T3</td><td>Ranger</td><td>100</td><td>+1 Attack Damage</td></tr>
                        <tr><td>T4</td><td>Sniper</td><td>175</td><td>+15% Attack Speed, +1 Damage</td></tr>
                        <tr><td>T5</td><td>Eagle Eye</td><td>200</td><td>+2 Attack Damage, <span style="color: #ffd700;">10% Double Arrow Damage</span></td></tr>
                    </table>
                </div>
                <p><strong>Legendary Hunter (T5 Total):</strong> +5 Damage, +25% Attack Speed, 10% chance for double arrow damage</p>
            </div>

            <div class="doc-section">
                <h2>Forging - Shape Metal with Divine Precision</h2>
                <p>Mine faster, auto-smelt ores, and get bonus drops. The ultimate resource gatherer.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Apprentice</td><td>50</td><td><span style="color: #44ff44;">Haste I</span> (faster mining)</td></tr>
                        <tr><td>T2</td><td>Journeyman</td><td>75</td><td><span style="color: #44ff44;">Haste II</span></td></tr>
                        <tr><td>T3</td><td>Blacksmith</td><td>100</td><td><span style="color: #ffd700;">Auto-smelt iron/gold/copper ores</span></td></tr>
                        <tr><td>T4</td><td>Master Smith</td><td>175</td><td><span style="color: #ffd700;">10% chance double ore drops</span></td></tr>
                        <tr><td>T5</td><td>Forge Lord</td><td>200</td><td><span style="color: #44ff44;">Haste III, Fire Resistance</span></td></tr>
                    </table>
                </div>
                <p><strong>Divine Craftsman (T5 Total):</strong> Haste III, Auto-Smelt Ores, 10% Double Drops, Fire Resistance</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">Mining Pro Tip</div>
                    <p>Auto-smelt at T3 instantly converts raw ores to ingots when mined. Combined with 10% double drops at T4, you'll be swimming in resources!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Athletics - Swift as Hermes Himself</h2>
                <p>Outrun any monster and leap across chasms. Maximum mobility for exploration.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Runner</td><td>50</td><td>+5% Movement Speed</td></tr>
                        <tr><td>T2</td><td>Sprinter</td><td>75</td><td>+5% Movement Speed, <span style="color: #44ff44;">Jump Boost I</span></td></tr>
                        <tr><td>T3</td><td>Athlete</td><td>100</td><td>+10% Movement Speed, <span style="color: #44ff44;">Jump Boost II</span></td></tr>
                        <tr><td>T4</td><td>Olympian</td><td>175</td><td>+10% Movement Speed, <span style="color: #44ff44;">Jump Boost III</span></td></tr>
                        <tr><td>T5</td><td>Speed Demon</td><td>200</td><td>+10% Movement Speed, <span style="color: #44ff44;">Permanent Speed I</span></td></tr>
                    </table>
                </div>
                <p><strong>Wind Walker (T5 Total):</strong> +40% Movement Speed, Jump Boost III, Speed I Effect</p>
            </div>

            <div class="doc-section">
                <h2>Fortitude - Unyielding as Mountain Stone</h2>
                <p>Become an unstoppable tank with bonus health, armor, and damage resistance.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Tough</td><td>50</td><td>+2 Max Health (+1 heart)</td></tr>
                        <tr><td>T2</td><td>Hardy</td><td>75</td><td>+2 Armor</td></tr>
                        <tr><td>T3</td><td>Stalwart</td><td>100</td><td>+4 Max Health, +10% Knockback Resist</td></tr>
                        <tr><td>T4</td><td>Ironclad</td><td>175</td><td>+2 Armor Toughness, +4 Max Health</td></tr>
                        <tr><td>T5</td><td>Unbreakable</td><td>200</td><td>+4 Health, +2 Armor, +20% KB Resist, <span style="color: #44ff44;">Resistance I</span></td></tr>
                    </table>
                </div>
                <p><strong>Living Fortress (T5 Total):</strong> +14 Health (+7 hearts), +4 Armor, +2 Toughness, +30% KB Resist, Resistance I</p>
            </div>

            <div class="doc-section">
                <h2>Survival - One with the Wild</h2>
                <p>Live off the land with enhanced healing, regeneration, and sustenance effects.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Forager</td><td>50</td><td><span style="color: #44ff44;">Saturation I</span> (slower hunger)</td></tr>
                        <tr><td>T2</td><td>Scout</td><td>75</td><td>Food heals +1 extra heart</td></tr>
                        <tr><td>T3</td><td>Ranger</td><td>100</td><td><span style="color: #44ff44;">Regeneration I</span></td></tr>
                        <tr><td>T4</td><td>Wilderness Expert</td><td>175</td><td>+4 Max Health, <span style="color: #44ff44;">Regeneration II</span></td></tr>
                        <tr><td>T5</td><td>Nature's Chosen</td><td>200</td><td>+4 Max Health, <span style="color: #44ff44;">Hero of the Village</span></td></tr>
                    </table>
                </div>
                <p><strong>Wild Heart (T5 Total):</strong> +8 Max Health, Regeneration II, Saturation, Food Heal Bonus, Hero of the Village</p>
            </div>

            <div class="doc-section">
                <h2>Stealth - Unseen, Unheard, Unstoppable</h2>
                <p>Move through shadows with fast sneaking, night vision, and invisibility.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Sneaky</td><td>50</td><td><span style="color: #44ff44;">Speed I while sneaking</span></td></tr>
                        <tr><td>T2</td><td>Shadow</td><td>75</td><td><span style="color: #44ff44;">Speed II while sneaking</span></td></tr>
                        <tr><td>T3</td><td>Ghost</td><td>100</td><td>Reduced fall damage (7 block buffer)</td></tr>
                        <tr><td>T4</td><td>Phantom</td><td>175</td><td><span style="color: #44ff44;">Permanent Night Vision</span></td></tr>
                        <tr><td>T5</td><td>Shade</td><td>200</td><td><span style="color: #ffd700;">Invisibility while sneaking</span>, <span style="color: #44ff44;">Slow Falling</span></td></tr>
                    </table>
                </div>
                <p><strong>Living Shadow (T5 Total):</strong> Fast Sneak (Speed II), 7-block Fall Buffer, Night Vision, Sneak Invisibility, Slow Falling</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">Assassin Tactics</div>
                    <p>T5 Invisibility only activates while crouching - perfect for setting up ambushes or escaping danger!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Mysticism - Touched by Arcane Power</h2>
                <p>Bend luck in your favor for better loot drops, fishing, and rare finds.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Initiate</td><td>50</td><td>+1 Luck (better loot)</td></tr>
                        <tr><td>T2</td><td>Acolyte</td><td>75</td><td>+2 Luck</td></tr>
                        <tr><td>T3</td><td>Mystic</td><td>100</td><td>+2 Luck, <span style="color: #44ff44;">Glowing</span> (see through walls)</td></tr>
                        <tr><td>T4</td><td>Sorcerer</td><td>175</td><td>+2 Luck, <span style="color: #44ff44;">Luck I Effect</span></td></tr>
                        <tr><td>T5</td><td>Archmage</td><td>200</td><td>+3 Luck, <span style="color: #44ff44;">Luck II Effect, Conduit Power</span></td></tr>
                    </table>
                </div>
                <p><strong>Fate Weaver (T5 Total):</strong> +10 Luck Attribute, Luck II Effect, Conduit Power, Glowing</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">What Does Luck Do?</div>
                    <p>Luck affects fishing loot quality, chest loot tables, and certain mob drops. +10 Luck means significantly more rare items!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Seafaring - Child of the Endless Seas</h2>
                <p>Rule the oceans with water breathing, fast swimming, and underwater power.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Swimmer</td><td>50</td><td><span style="color: #44ff44;">Dolphin's Grace</span> (fast swimming)</td></tr>
                        <tr><td>T2</td><td>Diver</td><td>75</td><td><span style="color: #44ff44;">Water Breathing</span></td></tr>
                        <tr><td>T3</td><td>Sailor</td><td>100</td><td><span style="color: #44ff44;">Conduit Power</span> (mine underwater)</td></tr>
                        <tr><td>T4</td><td>Sea Captain</td><td>175</td><td>+4 Max Health</td></tr>
                        <tr><td>T5</td><td>Ocean Lord</td><td>200</td><td>Full Conduit Power, <span style="color: #ffd700;">Special Trident</span> on first login</td></tr>
                    </table>
                </div>
                <p><strong>Poseidon's Heir (T5 Total):</strong> Dolphin's Grace, Water Breathing, Conduit Power, +4 Health, Legendary Trident</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">Ocean Synergy</div>
                    <p>Children of Poseidon get Water Breathing from their god parent - combine with Seafaring for ultimate aquatic dominance!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Leadership - Born to Lead, Destined to Inspire</h2>
                <p>Grant powerful buff auras to nearby cabin members. The ultimate support build.</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Title</th><th>Cost</th><th>New Effects</th></tr>
                        <tr><td>T1</td><td>Speaker</td><td>50</td><td>Cabin buff aura (50 block range)</td></tr>
                        <tr><td>T2</td><td>Diplomat</td><td>75</td><td>Shop discounts, 75 block aura range</td></tr>
                        <tr><td>T3</td><td>Commander</td><td>100</td><td><span style="color: #44ff44;">Health Boost aura</span>, 100 block range</td></tr>
                        <tr><td>T4</td><td>General</td><td>175</td><td><span style="color: #44ff44;">Speed aura</span>, 150 block range</td></tr>
                        <tr><td>T5</td><td>Legendary Leader</td><td>200</td><td><span style="color: #44ff44;">Strength + Resistance aura</span>, 200 block range</td></tr>
                    </table>
                </div>
                <p><strong>Heroic Commander (T5 Total):</strong> 200-block aura granting Health Boost, Speed, Strength, and Resistance to cabin members</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">Cabin Required</div>
                    <p>Leadership auras <strong>only affect members of YOUR cabin</strong>. You must join or create a cabin first!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Skill Comparison Chart</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Skill</th><th>Best For</th><th>Key T5 Perk</th></tr>
                        <tr><td>Warfare</td><td>PvP, Boss Fights</td><td>Strength I + huge damage</td></tr>
                        <tr><td>Marksmanship</td><td>Ranged Combat</td><td>10% double arrow damage</td></tr>
                        <tr><td>Forging</td><td>Mining, Resources</td><td>Auto-smelt + double ore</td></tr>
                        <tr><td>Athletics</td><td>Exploration, Escape</td><td>Jump III + Speed I</td></tr>
                        <tr><td>Fortitude</td><td>Tanking, Survival</td><td>+7 hearts + Resistance</td></tr>
                        <tr><td>Survival</td><td>Long Expeditions</td><td>Regen II + Hero of Village</td></tr>
                        <tr><td>Stealth</td><td>Ambushes, Scouting</td><td>Sneak Invisibility</td></tr>
                        <tr><td>Mysticism</td><td>Loot, Fishing</td><td>+10 Luck + Conduit</td></tr>
                        <tr><td>Seafaring</td><td>Ocean Content</td><td>Conduit + Trident</td></tr>
                        <tr><td>Leadership</td><td>Group/Cabin Play</td><td>200-block team buffs</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Recommended Builds</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>The Gladiator</h4>
                        <p><strong>Major:</strong> Warfare<br><strong>Minor:</strong> Fortitude<br><strong>Dabble:</strong> Athletics T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Maximum melee damage with tankiness to survive fights.</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Prospector</h4>
                        <p><strong>Major:</strong> Forging<br><strong>Minor:</strong> Mysticism<br><strong>Dabble:</strong> Fortitude T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Auto-smelt + double ore + high luck = infinite resources.</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Assassin</h4>
                        <p><strong>Major:</strong> Stealth<br><strong>Minor:</strong> Warfare<br><strong>Dabble:</strong> Athletics T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Invisibility + high damage = deadly ambush strikes.</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Commander</h4>
                        <p><strong>Major:</strong> Leadership<br><strong>Minor:</strong> Fortitude<br><strong>Dabble:</strong> Warfare T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Buff your entire cabin while staying alive in combat.</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Aquanaut</h4>
                        <p><strong>Major:</strong> Seafaring<br><strong>Minor:</strong> Survival<br><strong>Dabble:</strong> Mysticism T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Rule the oceans with unlimited breathing and fast swimming.</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Scout</h4>
                        <p><strong>Major:</strong> Athletics<br><strong>Minor:</strong> Stealth<br><strong>Dabble:</strong> Survival T2</p>
                        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Maximum speed + jump + night vision for exploration.</p>
                    </div>
                </div>
            </div>
        `
    },

'shrines': {
    icon: '🏛️',
    title: 'Divine Shrines',
    subtitle: 'Build monuments for cabin-wide buffs',
    content: `
        <div class="doc-section">
            <h2>Shrine System</h2>
            <p>Build shrines to the gods and receive powerful cabin-wide buffs! Each shrine grants unique effects to all cabin members within range.</p>
            
            <div class="info-box warning">
                <div class="info-box-title">Cabin Feature</div>
                <p>Shrines are a <strong>cabin feature</strong>. You must be in a cabin to build and benefit from shrines!</p>
            </div>
        </div>

        <div class="doc-section">
            <h2>Building Shrines</h2>
            <p>Each cabin can build up to <strong>2 shrines</strong>.</p>
            
            <div class="steps">
                <div class="step-item">
                    <h4>Choose Your God</h4>
                    <p>Pick from 19 Olympian gods, each with unique effects.</p>
                </div>
                <div class="step-item">
                    <h4>Place Core Block</h4>
                    <p>Each god requires a specific core block (e.g., Diamond Block for Zeus).</p>
                </div>
                <div class="step-item">
                    <h4>Register in Minecraft</h4>
                    <p>Stand ON the core block and use <code>/shrine register [god]</code></p>
                </div>
                <div class="step-item">
                    <h4>Pay the Cost</h4>
                    <p>1000 Drachma to register the shrine.</p>
                </div>
                <div class="step-item">
                    <h4>Build Around It</h4>
                    <p>Decorate your shrine however you want!</p>
                </div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Fuel System</h2>
            <p>Shrines require <strong>fuel</strong> to stay active:</p>
            <ul>
                <li><strong>Start at 100%</strong> fuel when built</li>
                <li><strong>Drain every 30 minutes</strong> based on shrine power</li>
                <li><strong>Refuel with offerings</strong> (throw items near shrine)</li>
                <li><strong>Dormant at 0%</strong> (effects stop)</li>
            </ul>

            <div class="command">
                <div class="command-name">/shrine status</div>
                <div class="command-desc">Check fuel level of nearest shrine (within 50 blocks).</div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Making Offerings</h2>
            <p>Restore shrine fuel by throwing accepted items:</p>
            <ol>
                <li>Stand <strong>within 3 blocks</strong> of shrine core</li>
                <li><strong>Drop items</strong> (press Q) near the shrine</li>
                <li>Items <strong>vanish with particles</strong> = fuel restored!</li>
            </ol>
            
            <p>Check <code>!shrine info [god]</code> in Discord to see accepted offerings and fuel values!</p>
        </div>

        <div class="doc-section">
            <h2>Discord Commands</h2>
            
            <div class="command">
                <div class="command-name">!shrines list</div>
                <div class="command-desc">View all 19 shrine templates with their effects.</div>
            </div>

            <div class="command">
                <div class="command-name">!shrine info [god]</div>
                <div class="command-desc">Detailed info: effects, offerings, core block, cost. Example: <code>!shrine info zeus</code></div>
            </div>

            <div class="command">
                <div class="command-name">!shrines cabin</div>
                <div class="command-desc">View YOUR cabin's shrines, fuel levels, and active synergies.</div>
            </div>

            <div class="command">
                <div class="command-name">!shrine locate [god]</div>
                <div class="command-desc">Get coordinates of your cabin's shrine.</div>
            </div>

            <div class="command">
                <div class="command-name">!shrine history [god]</div>
                <div class="command-desc">View offering history and who contributed fuel.</div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Shrine Effects</h2>
            <p>Effects apply to <strong>all cabin members within 50 blocks</strong> of the shrine:</p>
            
            <div class="table-container">
                <table>
                    <tr><th>God</th><th>Effect</th><th>Drain/30min</th></tr>
                    <tr><td>Zeus</td><td>Lightning strikes hostiles</td><td>1%</td></tr>
                    <tr><td>Poseidon</td><td>Water Breathing + Dolphin's Grace</td><td>0.5%</td></tr>
                    <tr><td>Hades</td><td>Hostiles take damage over time</td><td>1%</td></tr>
                    <tr><td>Athena</td><td>+25% XP from all sources</td><td>0.75%</td></tr>
                    <tr><td>Apollo</td><td>Regeneration I</td><td>0.75%</td></tr>
                    <tr><td>Artemis</td><td>+20% bow damage, see crouchers</td><td>0.75%</td></tr>
                    <tr><td>Ares</td><td>Strength I + Resistance I</td><td>1%</td></tr>
                    <tr><td>Aphrodite</td><td>Animals attracted, breed faster</td><td>0.5%</td></tr>
                    <tr><td>Hephaestus</td><td>Fire Res + 20% tool durability</td><td>0.75%</td></tr>
                    <tr><td>Hermes</td><td>Speed II + Jump Boost I</td><td>0.5%</td></tr>
                    <tr><td>Demeter</td><td>Crops grow 50% faster</td><td>0.5%</td></tr>
                    <tr><td>Dionysus</td><td>Luck I + 2x food saturation</td><td>0.5%</td></tr>
                    <tr><td>Hera</td><td>Absorption II + knockback resist</td><td>1%</td></tr>
                    <tr><td>Hecate</td><td>See invisible + enchanting +3</td><td>0.75%</td></tr>
                    <tr><td>Hypnos</td><td>Sleep w/ monsters + heal sleep</td><td>0.5%</td></tr>
                    <tr><td>Nike</td><td>+50% mob XP + crit chance</td><td>1%</td></tr>
                    <tr><td>Nemesis</td><td>Under 30% HP: Str III + Speed II</td><td>0.5%</td></tr>
                    <tr><td>Iris</td><td>See cabin through walls + fall dmg</td><td>0.5%</td></tr>
                    <tr><td>Tyche</td><td>Fortune II + 10% rare drops</td><td>1%</td></tr>
                </table>
            </div>
        </div>

        <div class="doc-section">
            <h2>Dual Shrine Synergies</h2>
            <p>Build <strong>2 compatible shrines</strong> for bonus effects! Both must have fuel (>0%) and you must be in both radii.</p>
            
            <div class="table-container">
                <table>
                    <tr><th>Shrine Combo</th><th>Synergy Name</th><th>Bonus Effect</th></tr>
                    <tr><td>Zeus + Poseidon</td><td>Tempest Unleashed</td><td>2x lightning in rain, Speed III swimming</td></tr>
                    <tr><td>Ares + Athena</td><td>Strategic Warfare</td><td>Hero of Village, +50% crit damage</td></tr>
                    <tr><td>Apollo + Artemis</td><td>Twin Lights</td><td>Regen II, +40% bow damage</td></tr>
                    <tr><td>Hephaestus + Ares</td><td>Arsenal of War</td><td>Zero durability loss, fire immunity</td></tr>
                    <tr><td>Demeter + Dionysus</td><td>Festival of Abundance</td><td>2x crop growth, food = regen</td></tr>
                    <tr><td>Hades + Hecate</td><td>Shadow Sorcery</td><td>Crouch invisibility, +5 enchanting</td></tr>
                    <tr><td>Hera + Aphrodite</td><td>Divine Grace</td><td>Absorption IV, auto-tame animals</td></tr>
                    <tr><td>Hermes + Nike</td><td>Blitz Champion</td><td>Speed III, Jump II, +75% XP</td></tr>
                    <tr><td>Tyche + Iris</td><td>Fortune's Eye</td><td>Fortune III, 100% fall immunity</td></tr>
                    <tr><td>Hypnos + Nemesis</td><td>Dream Vengeance</td><td>Mobs drowsy when sleeping, wake buffs</td></tr>
                    <tr><td>Hades + Zeus</td><td>Wrath of Olympus</td><td>Lightning applies Wither II, 2x loot</td></tr>
                    <tr><td>Athena + Hecate</td><td>Arcane Scholar</td><td>+7 enchanting, 50% XP bonus</td></tr>
                    <tr><td>Poseidon + Demeter</td><td>Bountiful Waters</td><td>Instant kelp growth, 3x crops in rain</td></tr>
                </table>
            </div>

            <div class="info-box tip">
                <div class="info-box-title">Strategy</div>
                <p>Plan your 2 shrines carefully! Synergies can make your cabin incredibly powerful. Check Discord with <code>!shrines cabin</code> to see active synergies!</p>
            </div>
        </div>

        <div class="doc-section">
            <h2>All 19 Shrine Core Blocks</h2>
            
            <div class="table-container">
                <table>
                    <tr><th>God</th><th>Core Block</th><th>Where to Find</th></tr>
                    <tr><td>Zeus</td><td>Diamond Block</td><td>Craft 9 diamonds</td></tr>
                    <tr><td>Poseidon</td><td>Dark Prismarine</td><td>Ocean monuments</td></tr>
                    <tr><td>Hades</td><td>Crying Obsidian</td><td>Nether, bastion remnants</td></tr>
                    <tr><td>Athena</td><td>Chiseled Bookshelf</td><td>Craft w/ planks + slab</td></tr>
                    <tr><td>Apollo</td><td>Glowstone</td><td>Nether ceiling</td></tr>
                    <tr><td>Artemis</td><td>Quartz Pillar</td><td>Craft nether quartz</td></tr>
                    <tr><td>Ares</td><td>Netherite Block</td><td>Craft 9 netherite ingots</td></tr>
                    <tr><td>Aphrodite</td><td>Pink Glazed Terracotta</td><td>Smelt pink terracotta</td></tr>
                    <tr><td>Hephaestus</td><td>Anvil</td><td>Craft w/ iron</td></tr>
                    <tr><td>Hermes</td><td>Lapis Block</td><td>Craft 9 lapis lazuli</td></tr>
                    <tr><td>Demeter</td><td>Hay Block</td><td>Craft 9 wheat</td></tr>
                    <tr><td>Dionysus</td><td>Purpur Pillar</td><td>Craft end stone</td></tr>
                    <tr><td>Hera</td><td>Purpur Block</td><td>Craft end stone</td></tr>
                    <tr><td>Hecate</td><td>Obsidian</td><td>Water + lava</td></tr>
                    <tr><td>Hypnos</td><td>White Bed</td><td>Craft w/ wool + planks</td></tr>
                    <tr><td>Nike</td><td>Gold Block</td><td>Craft 9 gold ingots</td></tr>
                    <tr><td>Nemesis</td><td>Polished Deepslate</td><td>Craft deepslate</td></tr>
                    <tr><td>Iris</td><td>Beacon</td><td>Craft w/ nether star</td></tr>
                    <tr><td>Tyche</td><td>Emerald Block</td><td>Craft 9 emeralds</td></tr>
                </table>
            </div>
        </div>

        <div class="doc-section">
            <h2>Quick Reference</h2>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h4>Building</h4>
                    <p>2 shrines max per cabin<br>1000 Drachma cost<br>Requires core block</p>
                </div>
                <div class="feature-card">
                    <h4>Fuel</h4>
                    <p>Starts at 100%<br>Drains every 30min<br>Refuel with offerings</p>
                </div>
                <div class="feature-card">
                    <h4>Range</h4>
                    <p>Effects: 50 blocks<br>Offerings: 3 blocks<br>Cabin members only</p>
                </div>
                <div class="feature-card">
                    <h4>Synergies</h4>
                    <p>13 dual combos<br>Both need fuel<br>Must be in both radii</p>
                </div>
            </div>
        </div>

        <div class="doc-section">
            <h2>Tips & Strategies</h2>
            <ul>
                <li><strong>Coordinate with cabin!</strong> Discuss which 2 shrines to build for best synergy</li>
                <li><strong>Stockpile offerings</strong> before building to keep shrines fueled</li>
                <li><strong>Build centrally</strong> so members benefit while at cabin base</li>
                <li><strong>Balance offense/defense</strong> - one combat shrine, one utility shrine</li>
                <li><strong>Watch mail</strong> for low fuel and dormant warnings</li>
                <li><strong>Check history</strong> with <code>!shrine history</code> to see who's contributing</li>
                <li><strong>Popular combos:</strong> Zeus+Poseidon (combat), Hephaestus+Ares (crafting), Athena+Hecate (XP farming)</li>
            </ul>
        </div>

        <div class="doc-section">
            <h2>Minecraft Commands</h2>
            
            <div class="command">
                <div class="command-name">/shrine register [god]</div>
                <div class="command-desc">Register a new shrine. Stand ON core block. Example: <code>/shrine register zeus</code></div>
            </div>

            <div class="command">
                <div class="command-name">/shrine status</div>
                <div class="command-desc">Check fuel level of nearest shrine (within 50 blocks).</div>
            </div>
        </div>

        <div class="doc-section">
            <h2>FAQ</h2>
            
            <details>
                <summary><strong>Can I move a shrine?</strong></summary>
                <p>No, shrines are permanent once registered. Choose your location carefully!</p>
            </details>
            
            <details>
                <summary><strong>What happens if my cabin tries to build a 3rd shrine?</strong></summary>
                <p>Registration will fail with a message saying you already have 2 shrines.</p>
            </details>
            
            <details>
                <summary><strong>Can other cabins use my shrine?</strong></summary>
                <p>No! Shrine effects only apply to members of the cabin that built it.</p>
            </details>
            
            <details>
                <summary><strong>What if I leave my cabin?</strong></summary>
                <p>You lose access to your old cabin's shrines. If you join a new cabin, you gain access to theirs.</p>
            </details>
            
            <details>
                <summary><strong>Can I break the core block?</strong></summary>
                <p>Yes, but the shrine will still exist in the database. Only admins can remove shrines.</p>
            </details>
            
            <details>
                <summary><strong>Do synergies stack with god parent effects?</strong></summary>
                <p>Yes! All effects are cumulative. A child of Poseidon in a Poseidon shrine gets double water breathing!</p>
            </details>

            <details>
                <summary><strong>What happens when fuel hits 0%?</strong></summary>
                <p>The shrine goes dormant, effects stop immediately, and all cabin members receive mail notification.</p>
            </details>

            <details>
                <summary><strong>Can we build duplicate god shrines?</strong></summary>
                <p>No, each cabin can only have one shrine per god. You can't have 2 Zeus shrines.</p>
            </details>

            <details>
                <summary><strong>Do I need to be online for my shrine to work?</strong></summary>
                <p>No! Shrines work 24/7 as long as they have fuel, whether you're online or not.</p>
            </details>
        </div>
    `
},
    
    'mc-quests': {
        icon: '📜',
        title: 'Questlines',
        subtitle: 'Custom story adventures',
        content: `
            <div class="doc-section">
                <h2>Custom Questlines</h2>
                <p>Original story questlines released in phases. No prior lore knowledge needed!</p>
            </div>

            <div class="doc-section">
                <h2>Finding Quests</h2>
                <ul>
                    <li><strong>Quest Board:</strong> Check camp for available quests</li>
                    <li><strong>NPCs:</strong> Talk to characters around camp</li>
                    <li><strong>Exploration:</strong> Discover hidden quests</li>
                    <li><strong>Discord:</strong> Request custom quests with <code>!requestquest</code></li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Quest Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Story Quests</h4>
                        <p>Main storyline, released in phases.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Combat Quests</h4>
                        <p>Battle monsters and prove your skills.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Exploration</h4>
                        <p>Discover hidden locations.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Social Quests</h4>
                        <p>Cooperative missions with others.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Quest Rewards</h2>
                <ul>
                    <li>Drachma based on difficulty</li>
                    <li>Divine Favor for your cabin</li>
                    <li>Unique quest-exclusive items</li>
                    <li>Timeline entries and titles</li>
                </ul>
            </div>
        `
    },

    'mc-events': {
        icon: '🎭',
        title: 'Live Events',
        subtitle: 'Theater, battles, classes',
        content: `
            <div class="doc-section">
                <h2>Live Events</h2>
                <p>Triggerable and scheduled live events in Minecraft!</p>
            </div>

            <div class="doc-section">
                <h2>Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>Theater Shows</h4>
                        <p>Greek tragedy and comedy at the amphitheater.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Combat Training</h4>
                        <p>Learn techniques from counselors.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Classes</h4>
                        <p>Mythology, crafting, survival skills.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Monster Battles</h4>
                        <p>Defeat powerful spawned monsters.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Campfires</h4>
                        <p>Storytelling and community bonding.</p>
                    </div>
                    <div class="feature-card">
                        <h4>Olympus Visits</h4>
                        <p>Interact with the gods!</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Schedule</h2>
                <p>Events announced in Discord. Check <code>!events</code> to see upcoming activities!</p>
            </div>
        `
    },

    'mc-tournaments': {
        icon: '🏆',
        title: 'Tournaments',
        subtitle: 'CTF, arena, hide & seek',
        content: `
            <div class="doc-section">
                <h2>Team Tournaments</h2>
                <p>Compete for Drachma, Divine Favor, and glory!</p>
            </div>

            <div class="doc-section">
                <h2>Tournament Types</h2>
                
                <div class="game-card">
                    <h4>Capture the Flag</h4>
                    <p>Classic camp game! Capture enemy flag, defend yours.</p>
                    <span class="game-reward">Winners: 50 + 10 Favor</span>
                </div>

                <div class="game-card">
                    <h4>Arena Battles</h4>
                    <p>PvP combat. 1v1, 2v2, 3v3, or FFA.</p>
                    <span class="game-reward">Based on placement</span>
                </div>

                <div class="game-card">
                    <h4>Hide & Seek</h4>
                    <p>Hide throughout camp or hunt others!</p>
                    <span class="game-reward">Points-based prizes</span>
                </div>

                <div class="game-card">
                    <h4>Relay Races</h4>
                    <p>Multi-stage team races.</p>
                    <span class="game-reward">1st: 60, 2nd: 40, 3rd: 20</span>
                </div>

                <div class="game-card">
                    <h4>Archery Competition</h4>
                    <p>Test your aim at varying distances.</p>
                    <span class="game-reward">Top 3 win Drachma</span>
                </div>

                <div class="game-card">
                    <h4>Monster Siege</h4>
                    <p>Defend against waves. Last cabin standing wins!</p>
                    <span class="game-reward">Survival + winner bonus</span>
                </div>
            </div>
        `
    },

    'mc-shops': {
        icon: '🏪',
        title: 'MC Shops & Trading',
        subtitle: 'In-game shop fulfillment',
        content: `
            <div class="doc-section">
                <h2>Shopping in Camp</h2>
                <p>There are two ways to shop at Camp Half-Blood:</p>
            </div>

            <div class="doc-section">
                <h2>Official Camp Store</h2>
                <p>Use <code>!shop</code> in Discord to browse the official camp store. Items are delivered to Minecraft via <code>/chbpending</code>.</p>
            </div>

            <div class="doc-section">
                <h2>Player Shop Fulfillment</h2>
                <p>When you sell on Discord, buyers receive items in Minecraft!</p>
                
                <div class="steps">
                    <div class="step-item">
                        <h4>Customer Buys</h4>
                        <p>Someone uses <code>!playershops</code> and buys from you.</p>
                    </div>
                    <div class="step-item">
                        <h4>You Get Notified</h4>
                        <p>Mail with buyer's MC username and order.</p>
                    </div>
                    <div class="step-item">
                        <h4>Deliver In-Game</h4>
                        <p>Find buyer in Minecraft, trade items.</p>
                    </div>
                    <div class="step-item">
                        <h4>Confirm Delivery</h4>
                        <p><code>!myshop</code> -> Pending -> Mark Complete</p>
                    </div>
                    <div class="step-item">
                        <h4>Get Paid</h4>
                        <p>Payment released to your account!</p>
                    </div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">Security</div>
                    <p>Payment is held in escrow until you confirm delivery!</p>
                </div>
            </div>
        `
    },

    // Lore page

    'lore': {
        icon: '📖',
        title: 'Camp Lore',
        subtitle: 'The story so far...',
        content: `
            <div class="doc-section">
                <h2>The Story</h2>
                <p>An original story in a world of Greek mythology. <strong>No prior knowledge needed!</strong></p>
            </div>

            <div class="doc-section">
                <h2>The World</h2>
                <p>Greek mythology is real. The Olympian gods exist, and they have children with mortals - <strong>demigods</strong>.</p>
                <p>Camp Half-Blood is a sanctuary where demigods train and stay safe from monsters.</p>

                <h3>Key Concepts</h3>
                <ul>
                    <li><strong>Demigods:</strong> Children of gods and mortals (you!)</li>
                    <li><strong>Claiming:</strong> When a god acknowledges their child</li>
                    <li><strong>Divine Favor:</strong> The gods' approval</li>
                    <li><strong>Drachma:</strong> Blessed golden coins</li>
                    <li><strong>Cabins:</strong> Teams of demigods</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Phase 1: Unsettling Circumstances</h2>
                <p class="phase-badge" style="display: inline-block; background: var(--lightning); color: var(--olympus-blue); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; margin-bottom: 1rem;">CURRENT PHASE</p>
                
                <p>As new Demigods arrive, something feels... <em>off</em>.</p>
                
                <h3>The Gods Are Quiet</h3>
                <p>Camp runs well, but there's no divine supervision.</p>
                <ul>
                    <li>No direct orders from Olympus</li>
                    <li>No watchful divine eyes</li>
                    <li>The Oracle is unusually quiet</li>
                </ul>
                <p>Camp isn't in peril... <em>yet</em>.</p>

                <h3>What You Can Do</h3>
                <ul>
                    <li>Questlines available immediately</li>
                    <li>Explore camp and meet NPCs</li>
                    <li>Pay attention to details</li>
                    <li>Prepare for tournaments</li>
                </ul>

                <div class="info-box warning">
                    <div class="info-box-title">Pay Attention</div>
                    <p>Not everything is as simple as it appears. Details matter!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>Future Phases</h2>
                <p>The story continues based on community actions. Phase 2 will be announced when the time is right...</p>
            </div>
        `
    }
};

/*
 * Camp Half-Blood - Documentation Pages
 * Page content and rendering for the wiki/documentation section
 */

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const PAGES = {
    home: {
        title: "Camp Half-Blood Overview",
        icon: "🏛️",
        content: `
            <div class="doc-section">
                <h2>🏛️ Welcome to Camp Half-Blood</h2>
                <p>Camp Half-Blood is an immersive roleplay community bridging Discord and Minecraft, inspired by the Percy Jackson universe. Here, you'll discover your divine heritage, join a cabin, train your abilities, and embark on epic quests.</p>
                
                <h3>What We Offer</h3>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚡ Divine Heritage</h4>
                        <p>Take our quiz or choose your Olympian parent. Gain unique powers and blessings based on your godly lineage.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏕️ Cabin System</h4>
                        <p>Join your cabin based on your god parent. Compete with other cabins, earn divine favor, and make lifelong friends.</p>
                    </div>
                    <div class="feature-card">
                        <h4>💰 Economy</h4>
                        <p>Earn Drachma through activities, games, and quests. Spend it in shops for items, permits, and divine blessings.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎮 Minecraft Integration</h4>
                        <p>Link your account to get in-game effects based on your god parent, skill trees, and shrine benefits.</p>
                    </div>
                </div>
            </div>
        `
    },
    
    "new-player": {
        title: "New Player Guide",
        icon: "🌟",
        content: `
            <div class="doc-section">
                <h2>🌟 Getting Started</h2>
                <p>Welcome, young demigod! Here's everything you need to begin your journey at Camp Half-Blood.</p>
                
                <h3>Step 1: Join Discord</h3>
                <p>Our community lives on Discord. Join the server to access all features, chat with other demigods, and participate in events.</p>
                
                <h3>Step 2: Discover Your God Parent</h3>
                <p>Take our <strong>Divine Claiming Quiz</strong> to discover which Olympian claims you! Your god parent determines your cabin, powers, and Minecraft effects.</p>
                <button class="doc-link-btn" onclick="showQuizPage()">🔮 Take the Quiz</button>
                
                <h3>Step 3: Set Up Your Profile</h3>
                <p>Use <code>/profile</code> on Discord to view and customize your demigod profile. Add a backstory, choose a display name, and more.</p>
                
                <h3>Step 4: Link Your Minecraft Account</h3>
                <p>If you want to play on our Minecraft server, use <code>/mclink</code> on Discord to connect your accounts. This unlocks god-specific powers in-game!</p>
                
                <h3>Step 5: Explore!</h3>
                <p>Check out the mini-games, earn Drachma, visit the shop, and start making friends. The camp is yours to explore!</p>
            </div>
        `
    },
    
    gods: {
        title: "Gods & Claiming",
        icon: "⚡",
        content: `
            <div class="doc-section">
                <h2>⚡ The Olympians</h2>
                <p>Nineteen gods may claim you as their child. Each offers unique traits, powers, and Minecraft blessings.</p>
                
                <div class="god-grid" id="gods-grid">
                    <!-- Populated by JavaScript -->
                </div>
                
                <h3>How Claiming Works</h3>
                <p>You can be claimed in two ways:</p>
                <ul>
                    <li><strong>Quiz:</strong> Take our personality quiz to discover which god best matches you</li>
                    <li><strong>Manual Selection:</strong> Choose your god parent directly if you know who you want</li>
                </ul>
                
                <button class="doc-link-btn" onclick="showQuizPage()">🔮 Take the God Quiz</button>
            </div>
        `
    },
    
    cabins: {
        title: "Cabins",
        icon: "🏕️",
        content: `
            <div class="doc-section">
                <h2>🏕️ Cabin System</h2>
                <p>Each god has a cabin at Camp Half-Blood. When you're claimed, you automatically join your parent's cabin.</p>
                
                <h3>Cabin Benefits</h3>
                <ul>
                    <li>Private cabin Discord channels</li>
                    <li>Cabin-wide competitions and events</li>
                    <li>Divine favor rewards</li>
                    <li>Shared shrine bonuses in Minecraft</li>
                </ul>
                
                <h3>Divine Favor</h3>
                <p>Cabins earn Divine Favor through member activity, quest completions, and event victories. High favor brings blessings from the gods!</p>
            </div>
        `
    },
    
    profile: {
        title: "Profile & Mail",
        icon: "👤",
        content: `
            <div class="doc-section">
                <h2>👤 Your Demigod Profile</h2>
                <p>Your profile tracks everything about your character at Camp Half-Blood.</p>
                
                <h3>Discord Commands</h3>
                <div class="command-list">
                    <div class="command"><code>/profile</code> - View your profile</div>
                    <div class="command"><code>/profile user:@someone</code> - View another player's profile</div>
                    <div class="command"><code>/mail</code> - Check your inbox</div>
                    <div class="command"><code>/mail send user:@someone message:Hello!</code> - Send mail</div>
                </div>
                
                <h3>What Your Profile Shows</h3>
                <ul>
                    <li>God parent and cabin</li>
                    <li>Drachma balance</li>
                    <li>Divine favor status</li>
                    <li>Linked Minecraft account</li>
                    <li>Skill tree progress</li>
                </ul>
            </div>
        `
    },
    
    economy: {
        title: "Economy & Shop",
        icon: "💰",
        content: `
            <div class="doc-section">
                <h2>💰 Drachma Economy</h2>
                <p>Drachma is the currency of Camp Half-Blood. Earn it through various activities and spend it wisely!</p>
                
                <h3>Ways to Earn Drachma</h3>
                <ul>
                    <li>Daily check-in rewards</li>
                    <li>Mini-games and activities</li>
                    <li>Quest completions</li>
                    <li>Event participation</li>
                    <li>Casino games (risky!)</li>
                </ul>
                
                <h3>The Camp Shop</h3>
                <p>Use <code>/shop</code> to browse items available for purchase:</p>
                <ul>
                    <li>Minecraft items (delivered in-game)</li>
                    <li>Divine blessings and boosts</li>
                    <li>Shop permits to run your own business</li>
                    <li>Quest approvals</li>
                </ul>
            </div>
        `
    },
    
    games: {
        title: "Mini-Games",
        icon: "🎮",
        content: `
            <div class="doc-section">
                <h2>🎮 Discord Mini-Games</h2>
                <p>Test your skills and earn Drachma with our mythology-themed games!</p>
                
                <h3>Available Games</h3>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚡ Godly Trials</h4>
                        <p>Answer mythology trivia questions to prove your knowledge.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏃 Reflex Run</h4>
                        <p>Test your reaction speed against mythological challenges.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⏱️ Olympian Timed</h4>
                        <p>Race against the clock in rapid-fire quiz rounds.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚡ Lightning Roulette</h4>
                        <p>High-risk, high-reward chance game blessed by Zeus.</p>
                    </div>
                </div>
                
                <p>Use <code>/games</code> to see available games and their cooldowns.</p>
            </div>
        `
    },
    
    casino: {
        title: "Casino",
        icon: "🎰",
        content: `
            <div class="doc-section">
                <h2>🎰 Camp Casino</h2>
                <p>Feeling lucky? The casino offers high-stakes gambling for brave demigods.</p>
                
                <div class="warning-box">
                    ⚠️ <strong>Warning:</strong> Gambling can result in significant Drachma loss. Play responsibly!
                </div>
                
                <h3>Casino Games</h3>
                <ul>
                    <li><strong>Olympus Slots</strong> - Classic slot machine with godly symbols</li>
                    <li><strong>Hermes Roulette</strong> - Spin the wheel of fortune</li>
                    <li><strong>Athena Blackjack</strong> - Strategic card game</li>
                    <li><strong>Apollo Dice</strong> - Roll the sacred dice</li>
                    <li><strong>Tyche Coinflip</strong> - Double or nothing!</li>
                </ul>
            </div>
        `
    },
    
    arena: {
        title: "Arena",
        icon: "⚔️",
        content: `
            <div class="doc-section">
                <h2>⚔️ The Arena</h2>
                <p>Test your combat skills against other demigods in our arena system!</p>
                
                <h3>Battle Modes</h3>
                <ul>
                    <li><strong>PvP Duels</strong> - Challenge another player to single combat</li>
                    <li><strong>PvE Battles</strong> - Fight AI monsters for rewards</li>
                    <li><strong>Boss Fights</strong> - Team up to defeat powerful monsters</li>
                </ul>
                
                <h3>Betting System</h3>
                <p>Spectators can place bets on arena matches. Winners split the pot!</p>
            </div>
        `
    },
    
    shops: {
        title: "Player Shops",
        icon: "🏪",
        content: `
            <div class="doc-section">
                <h2>🏪 Player Shops</h2>
                <p>With a Shop Permit, you can open your own business at Camp Half-Blood!</p>
                
                <h3>Getting a Shop Permit</h3>
                <p>Purchase a Shop Permit from the camp store for 1,500 Drachma. This allows you to create and manage your own shop.</p>
                
                <h3>Shop Types</h3>
                <ul>
                    <li>General Store</li>
                    <li>Weapon Shop</li>
                    <li>Armor Shop</li>
                    <li>Potion Shop</li>
                    <li>Building Materials</li>
                    <li>Food & Supplies</li>
                    <li>Enchanting Services</li>
                </ul>
            </div>
        `
    },
    
    quests: {
        title: "Quests",
        icon: "📜",
        content: `
            <div class="doc-section">
                <h2>📜 Quest System</h2>
                <p>True heroes embark on quests! Request permission to undertake dangerous missions for glory and rewards.</p>
                
                <h3>How Quests Work</h3>
                <ol>
                    <li>Purchase a Quest Approval from the shop</li>
                    <li>Submit your quest proposal to staff</li>
                    <li>If approved, gather your party</li>
                    <li>Complete the quest objectives</li>
                    <li>Return for your rewards!</li>
                </ol>
            </div>
        `
    },
    
    mclink: {
        title: "Account Linking",
        icon: "🔗",
        content: `
            <div class="doc-section">
                <h2>🔗 Minecraft Account Linking</h2>
                <p>Connect your Discord and Minecraft accounts to unlock special features!</p>
                
                <h3>How to Link</h3>
                <ol>
                    <li>Join our Minecraft server</li>
                    <li>Use <code>/mclink</code> on Discord</li>
                    <li>Enter the code shown in-game</li>
                    <li>Accounts are now linked!</li>
                </ol>
                
                <h3>Benefits of Linking</h3>
                <ul>
                    <li>Colored nametag based on your god parent</li>
                    <li>Permanent potion effects from your god</li>
                    <li>Access to skill tree abilities</li>
                    <li>Shrine benefits in-game</li>
                    <li>Auto-delivery of shop purchases</li>
                </ul>
            </div>
        `
    },
    
    "mc-commands": {
        title: "Minecraft Commands",
        icon: "⌨️",
        content: `
            <div class="doc-section">
                <h2>⌨️ Minecraft Commands</h2>
                <p>Commands available in-game on our Minecraft server.</p>
                
                <div class="command-list">
                    <div class="command"><code>/spawn</code> - Return to camp spawn</div>
                    <div class="command"><code>/cabin</code> - Teleport to your cabin</div>
                    <div class="command"><code>/skills</code> - Open skill tree menu</div>
                    <div class="command"><code>/shrine</code> - View nearby shrine info</div>
                    <div class="command"><code>/bal</code> - Check your Drachma balance</div>
                    <div class="command"><code>/msg [player] [message]</code> - Private message</div>
                </div>
            </div>
        `
    },
    
    "mc-gods": {
        title: "God Effects",
        icon: "✨",
        content: `
            <div class="doc-section">
                <h2>✨ God Effects in Minecraft</h2>
                <p>Your divine heritage grants you permanent effects when playing on our Minecraft server!</p>
                
                <h3>Nametag Colors</h3>
                <p>Your name appears in a color matching your god parent, visible to all players.</p>
                
                <h3>Permanent Effects</h3>
                <p>Each god grants a unique potion effect:</p>
                <ul>
                    <li><strong>Zeus</strong> - Jump Boost</li>
                    <li><strong>Poseidon</strong> - Water Breathing</li>
                    <li><strong>Hades</strong> - Resistance</li>
                    <li><strong>Athena</strong> - Haste</li>
                    <li><strong>Apollo</strong> - Regeneration</li>
                    <li><strong>Artemis</strong> - Speed</li>
                    <li><strong>Ares</strong> - Strength</li>
                    <li><strong>And more...</strong></li>
                </ul>
            </div>
        `
    },
    
    skills: {
        title: "Skill Trees",
        icon: "📊",
        content: `
            <div class="doc-section">
                <h2>📊 Skill Tree System</h2>
                <p>Customize your character's abilities with our skill tree system!</p>
                
                <h3>Skill Branches</h3>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚔️ Warfare</h4>
                        <p>Melee combat mastery with damage and knockback bonuses</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏹 Marksmanship</h4>
                        <p>Ranged combat with attack speed and special arrows</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚒️ Forging</h4>
                        <p>Mining and crafting with haste and auto-smelt</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏃 Athletics</h4>
                        <p>Movement speed and jump boost abilities</p>
                    </div>
                    <div class="feature-card">
                        <h4>🛡️ Fortitude</h4>
                        <p>Defense and health bonuses</p>
                    </div>
                    <div class="feature-card">
                        <h4>🥷 Stealth</h4>
                        <p>Sneaking bonuses and night vision</p>
                    </div>
                </div>
                
                <h3>How It Works</h3>
                <p>Earn skill XP through activities. Invest in skills to unlock tiers. Choose one Major and one Minor skill to specialize in!</p>
            </div>
        `
    },
    
    shrines: {
        title: "Shrines",
        icon: "🏛️",
        content: `
            <div class="doc-section">
                <h2>🏛️ Shrine System</h2>
                <p>Build shrines to honor the gods and gain powerful cabin-wide buffs!</p>
                
                <h3>How Shrines Work</h3>
                <ol>
                    <li>Your cabin can build up to 2 shrines</li>
                    <li>Each shrine requires a specific core block</li>
                    <li>Offer items to fuel the shrine</li>
                    <li>When fueled, all cabin members get effects</li>
                </ol>
                
                <h3>Shrine Synergies</h3>
                <p>Having two complementary shrines active unlocks special bonus effects!</p>
                <p>Example: Zeus + Poseidon = Tempest Unleashed (2x lightning strikes during rain)</p>
            </div>
        `
    },
    
    announcements: {
        title: "Announcements",
        icon: "📢",
        content: `
            <div class="doc-section">
                <h2>📢 Announcements</h2>
                <div id="announcements-list">
                    <p class="loading">Loading announcements...</p>
                </div>
            </div>
        `
    },
    
    events: {
        title: "Events",
        icon: "📅",
        content: `
            <div class="doc-section">
                <h2>📅 Camp Events</h2>
                <p>Regular events bring the camp together for competitions and fun!</p>
                
                <h3>Event Types</h3>
                <ul>
                    <li><strong>Chariot Racing</strong> - Race around the track for glory</li>
                    <li><strong>Capture the Flag</strong> - Classic camp competition</li>
                    <li><strong>Monster Hunts</strong> - Track and defeat dangerous creatures</li>
                    <li><strong>Olympian Games</strong> - Multi-event athletic competition</li>
                </ul>
            </div>
        `
    },
    
    timeline: {
        title: "Timeline",
        icon: "📜",
        content: `
            <div class="doc-section">
                <h2>📜 Camp Timeline</h2>
                <p>The history of our camp and major events that shaped our community.</p>
                
                <div id="timeline-content">
                    <p>Timeline content coming soon...</p>
                </div>
            </div>
        `
    },
    
    lore: {
        title: "Lore",
        icon: "📖",
        content: `
            <div class="doc-section">
                <h2>📖 Camp Lore</h2>
                <p>The ongoing story of Camp Half-Blood and its brave demigods.</p>
                
                <h3>The Story So Far</h3>
                <p>Check back for updates on our ongoing narrative and major plot events!</p>
            </div>
        `
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE RENDERING
// ═══════════════════════════════════════════════════════════════════════════════

function renderPage(pageId) {
    const page = PAGES[pageId];
    if (!page) return '';
    
    return `
        <div class="doc-page" id="page-${pageId}">
            <div class="doc-header">
                <h1><span class="page-icon">${page.icon}</span> ${page.title}</h1>
            </div>
            ${page.content}
        </div>
    `;
}

function initializeDocumentation() {
    const container = document.getElementById('doc-content');
    if (!container) return;
    
    // Render all pages
    let pagesHTML = '';
    for (const pageId in PAGES) {
        pagesHTML += renderPage(pageId);
    }
    container.innerHTML = pagesHTML;
    
    // Initialize gods grid if on gods page
    initGodsGrid();
}

function initGodsGrid() {
    const grid = document.getElementById('gods-grid');
    if (!grid) return;
    
    const gods = [
        { name: "Zeus", emoji: "⚡", domain: "Sky & Thunder", effect: "Jump Boost", color: "#FFD700" },
        { name: "Poseidon", emoji: "🔱", domain: "Sea & Earthquakes", effect: "Water Breathing", color: "#00CED1" },
        { name: "Hades", emoji: "💀", domain: "Underworld", effect: "Resistance", color: "#4A4A4A" },
        { name: "Athena", emoji: "🦉", domain: "Wisdom & Strategy", effect: "Haste", color: "#C0C0C0" },
        { name: "Apollo", emoji: "☀️", domain: "Sun & Healing", effect: "Regeneration", color: "#FFB800" },
        { name: "Artemis", emoji: "🏹", domain: "Hunt & Moon", effect: "Speed", color: "#E8E8E8" },
        { name: "Ares", emoji: "⚔️", domain: "War", effect: "Strength", color: "#8B0000" },
        { name: "Aphrodite", emoji: "💕", domain: "Love & Beauty", effect: "Regeneration", color: "#FFB6C1" },
        { name: "Hephaestus", emoji: "🔨", domain: "Forge & Fire", effect: "Fire Resistance", color: "#FF4500" },
        { name: "Hermes", emoji: "👟", domain: "Travel & Thieves", effect: "Speed", color: "#4169E1" },
        { name: "Demeter", emoji: "🌾", domain: "Agriculture", effect: "Saturation", color: "#228B22" },
        { name: "Dionysus", emoji: "🍇", domain: "Wine & Festivity", effect: "Luck", color: "#800080" },
        { name: "Hera", emoji: "👑", domain: "Marriage & Family", effect: "Resistance", color: "#008B8B" },
        { name: "Hecate", emoji: "🌙", domain: "Magic", effect: "Slow Falling", color: "#191970" },
        { name: "Hypnos", emoji: "😴", domain: "Sleep & Dreams", effect: "Slow Falling", color: "#6A5ACD" },
        { name: "Nike", emoji: "🏆", domain: "Victory", effect: "Speed", color: "#FFD700" },
        { name: "Nemesis", emoji: "⚖️", domain: "Revenge & Balance", effect: "Resistance", color: "#696969" },
        { name: "Iris", emoji: "🌈", domain: "Rainbows", effect: "Glowing", color: "#FF69B4" },
        { name: "Tyche", emoji: "🎲", domain: "Fortune & Luck", effect: "Luck", color: "#32CD32" }
    ];
    
    grid.innerHTML = gods.map(god => `
        <div class="god-card" style="border-color: ${god.color}">
            <span class="god-emoji">${god.emoji}</span>
            <h4 style="color: ${god.color}">${god.name}</h4>
            <p class="god-domain">${god.domain}</p>
            <span class="god-effect">🎮 ${god.effect}</span>
        </div>
    `).join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZE ON LOAD
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initializeDocumentation();
});
