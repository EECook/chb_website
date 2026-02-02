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
                <p>Survive 5 increasingly difficult waves of themed monsters!</p>
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
                    <p>Blessings reset every 7 days whether you use them or not!</p>
                </div>
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
                <p>Camp Half-Blood hosts regular events - from chariot races to capture the flag!</p>
                
                <div class="command">
                    <div class="command-name">!events</div>
                    <div class="command-desc">View upcoming events and RSVP to participate.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card"><h4>Chariot Races</h4><p>1st: 50, 2nd: 30, 3rd: 15</p></div>
                    <div class="feature-card"><h4>Capture the Flag</h4><p>Winners: 40, MVP: +20</p></div>
                    <div class="feature-card"><h4>Monster Hunts</h4><p>Completion: 60</p></div>
                    <div class="feature-card"><h4>Olympian Games</h4><p>Gold: 75, Silver: 50, Bronze: 25</p></div>
                </div>
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
                <p>The gods watch over Camp Half-Blood and occasionally share their wisdom!</p>
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
                <h2>Divine Mail</h2>
                <p>Sometimes gods send personal messages to demigods!</p>
                <blockquote>
                    <p><strong>Zeus:</strong> "I saw what you did yesterday. Don't think I didn't notice."</p>
                </blockquote>
                <blockquote>
                    <p><strong>Apollo:</strong> "Sun rises slowly / I am very beautiful / Please clap for me now"</p>
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
                    <div class="feature-card"><h4>Battle</h4><p>Combat encounters</p></div>
                </div>
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
                    <p>Shadow Duels can only be initiated by a specific designated duelist.</p>
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
                    <div class="command-desc">View details for a specific branch. Example: <code>!skills warfare</code></div>
                </div>
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
            </div>

            <div class="doc-section">
                <h2>Major & Minor Specializations</h2>
                <p>At <strong>Tier 3</strong>, you must commit to a skill as your Major or Minor:</p>
                
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
            </div>

            <div class="doc-section">
                <h2>Skill Branches</h2>
                <p>10 skill branches available:</p>
                <ul>
                    <li><strong>Warfare</strong> - Melee damage and Strength effect</li>
                    <li><strong>Marksmanship</strong> - Ranged damage and attack speed</li>
                    <li><strong>Forging</strong> - Mining speed, auto-smelt, double ore drops</li>
                    <li><strong>Athletics</strong> - Movement speed and jump boost</li>
                    <li><strong>Fortitude</strong> - Max health, armor, and resistance</li>
                    <li><strong>Survival</strong> - Regeneration and saturation</li>
                    <li><strong>Stealth</strong> - Sneak speed, night vision, invisibility</li>
                    <li><strong>Mysticism</strong> - Luck and conduit power</li>
                    <li><strong>Seafaring</strong> - Water breathing and dolphin's grace</li>
                    <li><strong>Leadership</strong> - Buff auras for cabin members</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>Recommended Builds</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>The Gladiator</h4>
                        <p><strong>Major:</strong> Warfare<br><strong>Minor:</strong> Fortitude</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Prospector</h4>
                        <p><strong>Major:</strong> Forging<br><strong>Minor:</strong> Mysticism</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Assassin</h4>
                        <p><strong>Major:</strong> Stealth<br><strong>Minor:</strong> Warfare</p>
                    </div>
                    <div class="feature-card">
                        <h4>The Commander</h4>
                        <p><strong>Major:</strong> Leadership<br><strong>Minor:</strong> Fortitude</p>
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
                        <p>Each god requires a specific core block.</p>
                    </div>
                    <div class="step-item">
                        <h4>Register in Minecraft</h4>
                        <p>Stand ON the core block and use <code>/shrine register [god]</code></p>
                    </div>
                    <div class="step-item">
                        <h4>Pay the Cost</h4>
                        <p>1000 Drachma to register the shrine.</p>
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
            </div>

            <div class="doc-section">
                <h2>Discord Commands</h2>
                
                <div class="command">
                    <div class="command-name">!shrines list</div>
                    <div class="command-desc">View all 19 shrine templates with their effects.</div>
                </div>

                <div class="command">
                    <div class="command-name">!shrine info [god]</div>
                    <div class="command-desc">Detailed info: effects, offerings, core block, cost.</div>
                </div>

                <div class="command">
                    <div class="command-name">!shrines cabin</div>
                    <div class="command-desc">View YOUR cabin's shrines, fuel levels, and synergies.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>Shrine Effects (50 block range)</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Effect</th></tr>
                        <tr><td>Zeus</td><td>Lightning strikes hostiles</td></tr>
                        <tr><td>Poseidon</td><td>Water Breathing + Dolphin's Grace</td></tr>
                        <tr><td>Hades</td><td>Hostiles take damage over time</td></tr>
                        <tr><td>Athena</td><td>+25% XP from all sources</td></tr>
                        <tr><td>Apollo</td><td>Regeneration I</td></tr>
                        <tr><td>Artemis</td><td>+20% bow damage</td></tr>
                        <tr><td>Ares</td><td>Strength I + Resistance I</td></tr>
                        <tr><td>Hephaestus</td><td>Fire Res + 20% tool durability</td></tr>
                        <tr><td>Hermes</td><td>Speed II + Jump Boost I</td></tr>
                        <tr><td>Demeter</td><td>Crops grow 50% faster</td></tr>
                        <tr><td>Dionysus</td><td>Luck I + 2x food saturation</td></tr>
                        <tr><td>Tyche</td><td>Fortune II + 10% rare drops</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>Dual Shrine Synergies</h2>
                <p>Build <strong>2 compatible shrines</strong> for bonus effects!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Shrine Combo</th><th>Synergy Name</th><th>Bonus</th></tr>
                        <tr><td>Zeus + Poseidon</td><td>Tempest Unleashed</td><td>2x lightning in rain</td></tr>
                        <tr><td>Ares + Athena</td><td>Strategic Warfare</td><td>+50% crit damage</td></tr>
                        <tr><td>Apollo + Artemis</td><td>Twin Lights</td><td>Regen II, +40% bow</td></tr>
                        <tr><td>Hephaestus + Ares</td><td>Arsenal of War</td><td>Zero durability loss</td></tr>
                        <tr><td>Demeter + Dionysus</td><td>Festival of Abundance</td><td>2x crop growth</td></tr>
                        <tr><td>Hades + Hecate</td><td>Shadow Sorcery</td><td>Crouch invisibility</td></tr>
                    </table>
                </div>
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
                    <div class="feature-card"><h4>Story Quests</h4><p>Main storyline, released in phases.</p></div>
                    <div class="feature-card"><h4>Combat Quests</h4><p>Battle monsters and prove your skills.</p></div>
                    <div class="feature-card"><h4>Exploration</h4><p>Discover hidden locations.</p></div>
                    <div class="feature-card"><h4>Social Quests</h4><p>Cooperative missions with others.</p></div>
                </div>
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
                    <div class="feature-card"><h4>Theater Shows</h4><p>Greek tragedy and comedy</p></div>
                    <div class="feature-card"><h4>Combat Training</h4><p>Learn techniques from counselors</p></div>
                    <div class="feature-card"><h4>Classes</h4><p>Mythology, crafting, survival</p></div>
                    <div class="feature-card"><h4>Campfires</h4><p>Storytelling and community</p></div>
                </div>
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
                    <div class="step-item"><h4>Customer Buys</h4><p>Someone uses <code>!playershops</code> and buys from you.</p></div>
                    <div class="step-item"><h4>You Get Notified</h4><p>Mail with buyer's MC username and order.</p></div>
                    <div class="step-item"><h4>Deliver In-Game</h4><p>Find buyer in Minecraft, trade items.</p></div>
                    <div class="step-item"><h4>Confirm Delivery</h4><p><code>!myshop</code> -> Pending -> Mark Complete</p></div>
                </div>
            </div>
        `
    },

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
                <ul>
                    <li>No direct orders from Olympus</li>
                    <li>No watchful divine eyes</li>
                    <li>The Oracle is unusually quiet</li>
                </ul>
                <p>Camp isn't in peril... <em>yet</em>.</p>

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

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE RENDERING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function renderPage(pageId) {
    const page = PAGES[pageId];
    if (!page) return '';
    
    return `
        <div class="doc-page" id="page-${pageId}">
            <div class="doc-header">
                <h1><span class="page-icon">${page.icon}</span> ${page.title}</h1>
                ${page.subtitle ? `<p class="doc-subtitle">${page.subtitle}</p>` : ''}
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

const GODS = [
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

function initGodsGrid() {
    const grid = document.getElementById('gods-grid');
    if (!grid) return;
    
    grid.innerHTML = GODS.map(god => `
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
