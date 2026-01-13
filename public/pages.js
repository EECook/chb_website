// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - ALL PAGE CONTENT (COMPLETE)
// ══════════════════════════════════════════════════════════════════════════

const PAGES = {

    // ═══════════════════════════════════════════════════════════════════════
    // HOME PAGE
    // ═══════════════════════════════════════════════════════════════════════

    'home': {
        icon: '🏛️',
        title: 'Camp Half-Blood',
        subtitle: 'Where legends train',
        content: `
            <div class="doc-section">
                <h2>⚡ Welcome, Demigod</h2>
                <p>You've found <strong>Camp Half-Blood</strong> — a sanctuary for demigods like yourself. Here, children of the gods train, form alliances, complete quests, and prove their worth across two realms: <strong>Discord</strong> and <strong>Minecraft</strong>.</p>
                
                <p>Whether you're a child of Zeus wielding lightning or a cunning offspring of Athena, your journey begins now.</p>
            </div>

            <div class="doc-section">
                <h2>🌐 Two Realms, One Camp</h2>
                <p>Camp Half-Blood exists across two connected platforms:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>💬 Discord</h4>
                        <p>Get claimed by a god, join a cabin, play games, earn Drachma, manage your profile, and coordinate with fellow demigods.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⛏️ Minecraft</h4>
                        <p>Explore camp, build your cabin, battle monsters, complete quests, and spend your Drachma on gear and items.</p>
                    </div>
                </div>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Linked Experience</div>
                    <p>Link your accounts with <code>!mclink</code> to sync your Drachma, god effects, skills, and more between Discord and Minecraft!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎯 Quick Start</h2>
                <ol>
                    <li><strong>Join Discord</strong> — Enter our server and introduce yourself</li>
                    <li><strong>Get Claimed</strong> — Use <code>!claim</code> to discover your godly parent</li>
                    <li><strong>Link Minecraft</strong> — Use <code>!mclink YourUsername</code> to connect accounts</li>
                    <li><strong>Join a Cabin</strong> — Team up with siblings or form your own group</li>
                    <li><strong>Start Training</strong> — Play games, complete quests, upgrade skills!</li>
                </ol>
            </div>

            <div class="doc-section">
                <h2>📊 What Can You Do?</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>💰 Economy</h4>
                        <p>Earn Drachma through games, dailies, and quests. Spend it in shops or trade with others.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚔️ Battles</h4>
                        <p>Fight in the Arena — PvP duels, PvE challenges, and epic boss battles with betting.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎮 Mini-Games</h4>
                        <p>15+ mythology-themed games from trivia to gambling. Earn Drachma while having fun!</p>
                    </div>
                    <div class="feature-card">
                        <h4>📈 Progression</h4>
                        <p>Upgrade 10 skill branches, unlock powerful effects, and become a legendary hero.</p>
                    </div>
                </div>
            </div>
        `
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEW PLAYER GUIDE
    // ═══════════════════════════════════════════════════════════════════════

    'new-player': {
        icon: '📖',
        title: 'New Camper Guide',
        subtitle: 'Everything you need to get started',
        content: `
            <div class="doc-section">
                <h2>👋 Welcome to Camp!</h2>
                <p>So you've discovered you're a demigod — half mortal, half god. Don't worry, we'll help you figure out the rest. This guide covers everything you need to know as a new camper.</p>
            </div>

            <div class="doc-section">
                <h2>📋 Step 1: Get Claimed</h2>
                <p>Every demigod has a godly parent. Discover yours through the claiming ceremony!</p>
                
                <div class="command">
                    <div class="command-name">!claim</div>
                    <div class="command-desc">Start your claiming ceremony. Take a personality quiz or choose your god parent directly.</div>
                </div>
                
                <p>Your god parent determines:</p>
                <ul>
                    <li>🎨 Your <strong>name color</strong> in Minecraft</li>
                    <li>✨ Unique <strong>potion effects</strong> while playing</li>
                    <li>📬 A personal <strong>welcome letter</strong> from your godly parent</li>
                    <li>🏕️ Which cabin you can join</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Can't Decide?</div>
                    <p>You can retake the quiz anytime with <code>!claim</code> to change your god parent!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🔗 Step 2: Link Your Minecraft Account</h2>
                <p>To get the full Camp Half-Blood experience, link your Discord to Minecraft:</p>
                
                <div class="command">
                    <div class="command-name">!mclink YourMinecraftName</div>
                    <div class="command-desc">Links your Discord account to your Minecraft username. This syncs your Drachma, god effects, and skills.</div>
                </div>
                
                <p>Once linked, you'll receive:</p>
                <ul>
                    <li>💰 <strong>Synced Drachma</strong> — Earn in Discord, spend in Minecraft (and vice versa)</li>
                    <li>⚡ <strong>God Effects</strong> — Your parent's blessing follows you in-game</li>
                    <li>📦 <strong>Item Delivery</strong> — Buy items in Discord, claim them in Minecraft</li>
                    <li>📊 <strong>Skill Sync</strong> — Upgrade skills in Discord, get effects in Minecraft</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>👤 Step 3: Set Up Your Profile</h2>
                <p>Your profile is your central hub for everything:</p>
                
                <div class="command">
                    <div class="command-name">!profile</div>
                    <div class="command-desc">Opens your profile with navigation buttons for Mail, Inventory, Games, Shop, and more.</div>
                </div>
                
                <p>From your profile you can:</p>
                <ul>
                    <li>📬 Check your <strong>mail</strong> for messages and invites</li>
                    <li>🎒 View your <strong>inventory</strong> and use items</li>
                    <li>🎮 Quick-access the <strong>games menu</strong></li>
                    <li>🛒 Browse the <strong>shop</strong></li>
                    <li>🏕️ See your <strong>cabin</strong> info</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>💰 Step 4: Earn Your First Drachma</h2>
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
                        <tr><td>!daily</td><td>2-10 💰</td><td>23 hours</td></tr>
                        <tr><td>Mini-Games</td><td>1-25 💰</td><td>5 minutes each</td></tr>
                        <tr><td>Casino Games</td><td>Up to 200 💰</td><td>Varies</td></tr>
                        <tr><td>Arena Wins</td><td>Betting payouts</td><td>None</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏕️ Step 5: Join a Cabin</h2>
                <p>Cabins are teams of demigods who work together. Benefits include:</p>
                <ul>
                    <li>👥 Private Discord channel for coordination</li>
                    <li>🛡️ Leadership skill auras that buff nearby members</li>
                    <li>🏆 Team-based events and competitions</li>
                    <li>🤝 Community and roleplay opportunities</li>
                </ul>
                
                <div class="command">
                    <div class="command-name">!cabin</div>
                    <div class="command-desc">View your cabin or create/manage one if you're a leader.</div>
                </div>
                
                <p>Check your <code>!mail</code> for cabin invites, or ask a cabin leader to invite you!</p>
            </div>

            <div class="doc-section">
                <h2>📚 Essential Commands Cheatsheet</h2>
                
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
                <h2>🎯 What's Next?</h2>
                <p>Once you're set up, explore these features:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚔️ Arena Battles</h4>
                        <p>PvP duels, PvE challenges, and boss fights with betting</p>
                    </div>
                    <div class="feature-card">
                        <h4>📊 Skill Trees</h4>
                        <p>10 branches with real Minecraft effects</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏪 Player Shops</h4>
                        <p>Buy a permit and sell items to other players</p>
                    </div>
                    <div class="feature-card">
                        <h4>📜 Quests</h4>
                        <p>Request custom quests for your demigod journey</p>
                    </div>
                </div>
            </div>
        `
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DISCORD PAGES
    // ═══════════════════════════════════════════════════════════════════════

    'profile': {
        icon: '👤',
        title: 'Profile & Mail',
        subtitle: 'Your demigod identity and communications',
        content: `
            <div class="doc-section">
                <h2>👤 Your Demigod Profile</h2>
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
                <h2>🧭 Navigation Buttons</h2>
                <p>Your profile includes quick-access buttons:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>📬 Mail</h4>
                        <p>Read messages, cabin invites, and divine letters</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎒 Inventory</h4>
                        <p>View and use your items</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎮 Games</h4>
                        <p>Quick access to mini-games</p>
                    </div>
                    <div class="feature-card">
                        <h4>🛒 Shop</h4>
                        <p>Browse and buy items</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏕️ Cabin</h4>
                        <p>Cabin management</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚔️ Skills</h4>
                        <p>View/upgrade skill trees</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📬 Mail System</h2>
                <p>The mail system keeps you informed about everything happening at camp.</p>
                
                <div class="command">
                    <div class="command-name">!mail</div>
                    <div class="command-desc">Opens your mailbox. Unread messages marked with 🔵. Select messages from dropdown to read.</div>
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
                    <div class="info-box-title">💡 Compose Mail</div>
                    <p>Click the "✉️ Compose" button in your mailbox to send a message to another player!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎒 Inventory</h2>
                
                <div class="command">
                    <div class="command-name">!inventory</div>
                    <div class="command-aliases">Aliases: !inv, !items</div>
                    <div class="command-desc">View all items in your inventory.</div>
                </div>

                <h3>Item Markers</h3>
                <ul>
                    <li><strong>✨ Redeemable:</strong> Can be delivered to Minecraft</li>
                    <li><strong>🏪 Shop Permit:</strong> Use to create your own shop</li>
                    <li><strong>🧪 Consumable:</strong> Use for temporary effects</li>
                </ul>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Auto-Delivery</div>
                    <p>Minecraft items are automatically queued when purchased. Use <code>/chbpending</code> in MC to receive them!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📋 Related Commands</h2>
                
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
                <h2>⚡ The Claiming Ceremony</h2>
                <p>Every demigod has one divine parent. The claiming ceremony reveals which Olympian god is yours through a personality quiz—or you can choose directly!</p>
                
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
                <h2>📝 Two Ways to Claim</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🎯 Personality Quiz</h4>
                        <p>Answer questions about your personality and values. The quiz analyzes your responses to match you with the most fitting god parent.</p>
                    </div>
                    <div class="feature-card">
                        <h4>📋 Direct Selection</h4>
                        <p>Already know who your parent is? Skip the quiz and choose directly from the dropdown menu.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏛️ The 19 Olympian Gods</h2>
                
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
                <h2>🎁 What You Receive</h2>
                <p>When claimed, you get:</p>
                <ul>
                    <li>🎨 <strong>Name Color</strong> — Your god's color displays in Minecraft</li>
                    <li>✨ <strong>Potion Effects</strong> — Passive buffs based on your parent</li>
                    <li>📬 <strong>Divine Letter</strong> — A personal welcome message from your godly parent</li>
                    <li>🏕️ <strong>Cabin Eligibility</strong> — Join cabins aligned with your heritage</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Change Anytime</div>
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
                <h2>🏕️ The Cabin System</h2>
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
                <h2>🎁 Cabin Benefits</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>💬 Private Channel</h4>
                        <p>Every cabin gets a private Discord channel for coordination, visible only to members.</p>
                    </div>
                    <div class="feature-card">
                        <h4>👑 Leadership Auras</h4>
                        <p>Members with Leadership skills buff nearby cabin mates in Minecraft!</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏆 Team Events</h4>
                        <p>Participate in cabin vs cabin competitions and tournaments.</p>
                    </div>
                    <div class="feature-card">
                        <h4>✨ Divine Favor</h4>
                        <p>High favor grants Drachma bonuses to all members!</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>✨ Divine Favor</h2>
                <p>Your cabin's standing with the gods affects Drachma earnings!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Status</th><th>Favor</th><th>Modifier</th></tr>
                        <tr><td>✨ Blessed</td><td>80+</td><td style="color: var(--success);">+25%</td></tr>
                        <tr><td>⬆️ Favored</td><td>50-79</td><td style="color: var(--success);">+10%</td></tr>
                        <tr><td>⚖️ Neutral</td><td>0-49</td><td>Normal</td></tr>
                        <tr><td>⬇️ Disfavored</td><td>-30 to -1</td><td style="color: var(--error);">-10%</td></tr>
                        <tr><td>💀 Cursed</td><td>Below -60</td><td style="color: var(--error);">-25%</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>📥 Joining a Cabin</h2>
                <p>There are two ways to join an existing cabin:</p>
                
                <ol>
                    <li><strong>Receive an Invite</strong> — Check your <code>!mail</code> for cabin invitations. Accept directly from the mail!</li>
                    <li><strong>Ask a Leader</strong> — Contact a cabin leader and ask them to invite you.</li>
                </ol>
                
                <div class="command">
                    <div class="command-name">!invites</div>
                    <div class="command-desc">View all your pending cabin invitations.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏗️ Creating & Managing</h2>
                
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
                <h2>💰 Golden Drachma</h2>
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
                <h2>📈 Ways to Earn</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Activity</th><th>Reward</th><th>Details</th></tr>
                        <tr><td>!daily</td><td>2-10 💰</td><td>Mythology trivia bonus</td></tr>
                        <tr><td>Mini-Games</td><td>1-25 💰</td><td>10 free mythology games</td></tr>
                        <tr><td>Casino</td><td>Up to 200 💰</td><td>5 gambling games (costs to play)</td></tr>
                        <tr><td>Arena Betting</td><td>Varies</td><td>Bet on battles, win big!</td></tr>
                        <tr><td>Minecraft</td><td>Varies</td><td>Mob kills, mining, quests</td></tr>
                        <tr><td>Player Shop</td><td>Varies</td><td>Sell items to others</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>🛒 Camp Store</h2>
                
                <div class="command">
                    <div class="command-name">!shop</div>
                    <div class="command-desc">Opens the camp store with category selection.</div>
                </div>

                <p><strong>Shop Categories:</strong></p>
                <ul>
                    <li>⚔️ <strong>Weapons</strong> — Swords, bows, and celestial bronze gear</li>
                    <li>🛡️ <strong>Armor</strong> — Protection for your adventures</li>
                    <li>🧪 <strong>Consumables</strong> — Potions and food items</li>
                    <li>✨ <strong>Divine Blessings</strong> — Golden Touch multiplier and more</li>
                    <li>📜 <strong>Permits</strong> — Shop Permit to run your own store</li>
                </ul>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Minecraft Delivery</div>
                    <p>Items purchased in the shop are queued for pickup. Use <code>/chbpending</code> in Minecraft to receive them!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>💸 Transferring Drachma</h2>
                
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
                <h2>✨ Golden Touch Multiplier</h2>
                <p>Want to earn Drachma faster? Purchase a Golden Touch from the shop!</p>
                
                <ul>
                    <li>💫 <strong>2x Drachma</strong> on all earnings for 24 hours</li>
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
                <h2>🎮 Mini-Games Arcade</h2>
                <p>10 unique mythology-themed games with different mechanics and rewards! All games are free to play.</p>
                
                <div class="command">
                    <div class="command-name">!games</div>
                    <div class="command-aliases">Aliases: !game, !play, !minigames</div>
                    <div class="command-desc">Opens game selection menu.</div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Cooldowns</div>
                    <p>Each game has a 5-minute cooldown after playing. Rotate through games to maximize earnings!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚔️ Adventure Games</h2>

                <div class="game-card">
                    <h4>⚔️ Godly Trials</h4>
                    <p>Face 3 mythological encounters! Each choice has different success odds. Win 2/3 rounds to earn rewards.</p>
                    <span class="game-reward">3 💰</span>
                </div>

                <div class="game-card">
                    <h4>🏛️ Labyrinth Escape</h4>
                    <p>Navigate Daedalus's maze! Avoid monsters (🐂), walls (🧱), and hidden traps. Reach the exit (🚪) in 3 rounds.</p>
                    <span class="game-reward">5 💰</span>
                </div>

                <div class="game-card">
                    <h4>🐕 Cerberus Dodge</h4>
                    <p>Dodge Cerberus's three heads! Quick reactions required as each head snaps at you.</p>
                    <span class="game-reward">1-5 💰</span>
                </div>

                <div class="game-card">
                    <h4>🏇 Chariot Race</h4>
                    <p>Race your chariot to victory! Choose when to push ahead, play it safe, or sabotage opponents.</p>
                    <span class="game-reward">4 💰</span>
                </div>

                <div class="game-card">
                    <h4>🦄 Pegasus Flight</h4>
                    <p>Fly Pegasus to Mount Olympus! Manage stamina, dodge obstacles, and catch wind currents.</p>
                    <span class="game-reward">5 💰</span>
                </div>
            </div>

            <div class="doc-section">
                <h2>🧠 Skill Games</h2>

                <div class="game-card">
                    <h4>🏹 Olympian Archery</h4>
                    <p>Test your aim with 5 arrow shots. Time your release perfectly for bullseyes!</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>🐉 Hydra Strike</h4>
                    <p>Cut the Hydra's heads before they regenerate! Wrong cuts spawn more heads.</p>
                    <span class="game-reward">4-6 💰</span>
                </div>

                <div class="game-card">
                    <h4>🔮 Oracle's Vision</h4>
                    <p>Memory matching game! Find all symbol pairs before time runs out.</p>
                    <span class="game-reward">4-7 💰</span>
                </div>

                <div class="game-card">
                    <h4>🎵 Siren's Song</h4>
                    <p>Resist the Siren! Memorize and repeat increasingly complex sequences.</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>⚡ Lightning Roulette</h4>
                    <p>Risk vs reward! Keep spinning for bigger multipliers, but Zeus might strike you down...</p>
                    <span class="game-reward">2-25 💰</span>
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
                <h2>🎰 Vi's Casino</h2>
                <p><strong>Vi (VianiteGMG)</strong> runs the camp casino with real Drachma gambling! These 5 games cost Drachma to play but offer bigger rewards.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Gambling Warning</div>
                    <p>Casino games require <strong>real Drachma</strong> to play. You can lose your bet! Maximum win per game is capped at 200 💰. Play responsibly!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎰 Olympus Slots</h2>
                <p>Classic 3-reel slot machine with Olympic symbols!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th><th>Jackpot</th></tr>
                        <tr><td>10 💰</td><td>200 💰</td><td>💎💎💎 = 100x</td></tr>
                    </table>
                </div>
                
                <p><strong>Symbols:</strong> ⚡ 🔱 🏹 ⚔️ 🔥 💎 🍇 👑</p>
                <p>Match 3 symbols for payouts. Three diamonds is the jackpot!</p>
            </div>

            <div class="doc-section">
                <h2>🎡 Hermes Roulette</h2>
                <p>The trickster god's wheel of fortune!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th></tr>
                        <tr><td>15 💰</td><td>200 💰</td></tr>
                    </table>
                </div>
                
                <p><strong>Bet Types:</strong></p>
                <ul>
                    <li>🔴 Red / ⚫ Black — 2x payout</li>
                    <li>🔢 Odd / Even — 2x payout</li>
                    <li>🎯 Exact Number — 35x payout</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>🃏 Athena's Blackjack</h2>
                <p>Beat the dealer with strategy and luck!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th><th>Blackjack</th></tr>
                        <tr><td>20 💰</td><td>200 💰</td><td>1.5x payout</td></tr>
                    </table>
                </div>
                
                <p>Standard blackjack rules: Get closer to 21 than the dealer without busting!</p>
            </div>

            <div class="doc-section">
                <h2>🎲 Apollo's Dice</h2>
                <p>Predict the dice roll outcome!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Max Win</th></tr>
                        <tr><td>5 💰</td><td>200 💰</td></tr>
                    </table>
                </div>
                
                <p><strong>Bet Options:</strong></p>
                <ul>
                    <li>High (8-12) or Low (2-6) — 2x</li>
                    <li>Exact sum — Up to 30x!</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>🪙 Tyche's Coin Flip</h2>
                <p>Simple double-or-nothing with the goddess of fortune!</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Cost</th><th>Win</th><th>Loss</th></tr>
                        <tr><td>25 💰</td><td>50 💰</td><td>0 💰</td></tr>
                    </table>
                </div>
                
                <p>Call heads or tails. 50/50 chance to double your bet!</p>
            </div>

            <div class="doc-section">
                <h2>🏦 The House</h2>
                <p>The casino is run by Vi, who collects <strong>50% of player losses</strong>. When you lose, half goes to the house. When you win, it's all yours (up to the 200 cap)!</p>
            </div>
        `
    },

    'arena': {
        icon: '⚔️',
        title: 'Arena Battles',
        subtitle: 'PvP, PvE, and boss fights with betting',
        content: `
            <div class="doc-section">
                <h2>⚔️ The Arena</h2>
                <p>The ultimate test of demigod combat! Battle other players, fight monster waves, or challenge legendary bosses—all with an integrated betting system.</p>
                
                <div class="command">
                    <div class="command-name">!arena</div>
                    <div class="command-desc">View arena options and create or join battles.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚔️ Battle Types</h2>
                
                <h3>PvP Battles</h3>
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
                
                <h3>PvE Challenges</h3>
                <div class="table-container">
                    <table>
                        <tr><th>Challenge</th><th>Team Size</th><th>Duration</th></tr>
                        <tr><td>🎃 FNAF</td><td>1-4</td><td>5 min</td></tr>
                        <tr><td>🧟 Zombie Horde</td><td>1-4</td><td>5 min</td></tr>
                        <tr><td>🔥 Nether Assault</td><td>1-4</td><td>7 min</td></tr>
                        <tr><td>🏛️ Ancient Ruins</td><td>1-4</td><td>7 min</td></tr>
                        <tr><td>🍍 Bikini Bottom</td><td>1-4</td><td>10 min</td></tr>
                    </table>
                </div>
                
                <h3>Boss Battles</h3>
                <div class="table-container">
                    <table>
                        <tr><th>Boss</th><th>Team Size</th><th>Duration</th></tr>
                        <tr><td>🧙 Woodland Witch Doctor</td><td>1-2</td><td>10 min</td></tr>
                        <tr><td>🦎 Atlatitan</td><td>1-2</td><td>10 min</td></tr>
                        <tr><td>🦖 Umvuthana Raptor</td><td>1-2</td><td>10 min</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>📋 How Battles Work</h2>
                <ol>
                    <li><strong>Creation</strong> — Someone creates a battle with <code>!arena create [type]</code></li>
                    <li><strong>Enrollment</strong> — Players click "Join Battle" (must have linked MC account)</li>
                    <li><strong>Betting Opens</strong> — Once full, spectators can place bets</li>
                    <li><strong>Teleport</strong> — Participants are teleported to the arena in Minecraft</li>
                    <li><strong>Fight!</strong> — Battle until time expires or objectives complete</li>
                    <li><strong>Results</strong> — Winner determined by deaths, payouts distributed</li>
                </ol>
            </div>

            <div class="doc-section">
                <h2>💰 Betting System</h2>
                <p>Spectators can bet on battles for big rewards!</p>
                
                <p><strong>Bet Amounts:</strong> 5, 10, 25, 50, 75, 100, 250, 500, 1000 💰</p>
                
                <p><strong>How Payouts Work:</strong></p>
                <ul>
                    <li>All bets form a pool</li>
                    <li>Winners split the pool proportionally based on bet size</li>
                    <li>If your side loses, you lose your bet</li>
                    <li>Ties refund all bets!</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Smart Betting</div>
                    <p>Bet early when odds are unclear for potentially bigger payouts. Late bets on favorites return less!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏆 Victory Conditions</h2>
                <ul>
                    <li><strong>PvP:</strong> Team/player with fewest deaths wins</li>
                    <li><strong>PvE:</strong> Survive all waves without party wipe</li>
                    <li><strong>Boss:</strong> Defeat the boss before time expires</li>
                </ul>
            </div>
        `
    },

    'daily': {
        icon: '📅',
        title: 'Daily Prompts',
        subtitle: 'Mythology trivia for daily rewards',
        content: `
            <div class="doc-section">
                <h2>📅 Daily Prompts</h2>
                <p>Each day, the gods present you with a mythological challenge. Answer correctly for bonus Drachma!</p>
                
                <div class="command">
                    <div class="command-name">!daily</div>
                    <div class="command-desc">Claim your daily reward with a mythology interaction. 23-hour cooldown.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎭 Daily Interactions</h2>
                <p>You might encounter:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🐍 The Serpent's Riddle</h4>
                        <p>A serpent blocks your path with a riddle...</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚖️ Athena's Test</h4>
                        <p>An owl brings a challenge from the goddess of wisdom...</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎲 Hermes' Gambit</h4>
                        <p>The trickster god shuffles three cups...</p>
                    </div>
                    <div class="feature-card">
                        <h4>🔥 Hephaestus' Forge</h4>
                        <p>The smith god tests your knowledge of crafting...</p>
                    </div>
                    <div class="feature-card">
                        <h4>🌊 Poseidon's Wave</h4>
                        <p>The sea god questions your knowledge of his domain...</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏹 Artemis' Hunt</h4>
                        <p>Silver tracks lead to a test from the huntress...</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>💰 Rewards</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Result</th><th>Reward</th></tr>
                        <tr><td>✅ Correct Answer</td><td>4-10 💰 (varies by challenge)</td></tr>
                        <tr><td>❌ Wrong Answer</td><td>2-3 💰 (consolation)</td></tr>
                    </table>
                </div>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Study Up!</div>
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
                <h2>✨ Divine Blessings</h2>
                <p>Every 7 days, you receive <strong>2 divine blessings</strong> from your godly parent. Use them wisely!</p>
                
                <div class="command">
                    <div class="command-name">!blessings</div>
                    <div class="command-desc">Check your current blessings and when they reset.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎁 What Blessings Do</h2>
                <p>Blessings can be spent on special divine favors:</p>
                <ul>
                    <li>⚡ <strong>Temporary buffs</strong> in Minecraft</li>
                    <li>🛡️ <strong>Protection</strong> from certain effects</li>
                    <li>✨ <strong>Special abilities</strong> based on your god parent</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Use It or Lose It</div>
                    <p>Blessings reset every 7 days whether you use them or not. Don't let them go to waste!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🔄 Sync with Minecraft</h2>
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
                <h2>📜 Quest System</h2>
                <p>True demigods don't wait for adventure—they seek it! Request custom quests for your character's journey.</p>
                
                <div class="command">
                    <div class="command-name">!requestquest</div>
                    <div class="command-desc">Opens a form to submit a quest idea for admin approval.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📝 Submitting a Quest</h2>
                <p>When requesting a quest, provide:</p>
                <ul>
                    <li><strong>Quest Name</strong> — A title for your adventure</li>
                    <li><strong>Description</strong> — What do you want to do? (20-500 characters)</li>
                    <li><strong>Participants</strong> — Solo or list other players joining</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Good Quest Ideas</div>
                    <p>Tie your quest to mythology! Retrieve a legendary item, defeat a monster, explore a dangerous location, or help an NPC in need.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>✅ Approval Process</h2>
                <ol>
                    <li>Submit your quest request</li>
                    <li>Admins review and discuss</li>
                    <li>You receive <strong>mail</strong> with the decision</li>
                    <li>If approved, coordinate with staff for the quest!</li>
                </ol>
                
                <p>Denied? Don't worry! The mail will explain why and you can submit a revised idea.</p>
            </div>

            <div class="doc-section">
                <h2>🏆 Quest Rewards</h2>
                <p>Completed quests may reward:</p>
                <ul>
                    <li>💰 <strong>Drachma</strong> based on difficulty</li>
                    <li>🎒 <strong>Special items</strong> not found in shops</li>
                    <li>📜 <strong>Timeline entry</strong> commemorating your deeds</li>
                    <li>✨ <strong>Titles or recognition</strong> in the community</li>
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
                <h2>🎭 Camp Events</h2>
                <p>Camp Half-Blood hosts regular events—from chariot races to capture the flag, theatrical performances to tournaments!</p>
                
                <div class="command">
                    <div class="command-name">!events</div>
                    <div class="command-desc">View upcoming events and RSVP to participate.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📅 Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🏇 Chariot Races</h4>
                        <p>1st: 50💰, 2nd: 30💰, 3rd: 15💰</p>
                    </div>
                    <div class="feature-card">
                        <h4>🚩 Capture the Flag</h4>
                        <p>Winners: 40💰, MVP: +20💰</p>
                    </div>
                    <div class="feature-card">
                        <h4>🐉 Monster Hunts</h4>
                        <p>Completion: 60💰</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏅 Olympian Games</h4>
                        <p>Gold: 75💰, Silver: 50💰, Bronze: 25💰</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎭 Theater Shows</h4>
                        <p>Participation: 10💰, Best Actor: 30💰</p>
                    </div>
                    <div class="feature-card">
                        <h4>🔥 Campfires</h4>
                        <p>Social gatherings with stories and songs</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📋 Creating Events</h2>
                <p>Staff and cabin leaders can create events:</p>
                
                <div class="command">
                    <div class="command-name">!events create</div>
                    <div class="command-desc">Opens the event creation form (requires permissions).</div>
                </div>
                
                <p>Provide event name, description, type, and scheduled time (YYYY-MM-DD HH:MM format).</p>
            </div>

            <div class="doc-section">
                <h2>✋ RSVPing</h2>
                <p>When viewing events, click to RSVP:</p>
                <ul>
                    <li>✅ <strong>Attending</strong> — You plan to participate</li>
                    <li>❔ <strong>Maybe</strong> — You might make it</li>
                    <li>❌ <strong>Not Attending</strong> — Can't make it</li>
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
                <h2>🏛️ Divine Messages</h2>
                <p>The gods watch over Camp Half-Blood and occasionally share their wisdom (or complaints) with demigods!</p>
            </div>

            <div class="doc-section">
                <h2>⛈️ Weather Messages</h2>
                <p>When weather changes in Minecraft, the gods might comment:</p>
                <ul>
                    <li>🌧️ <strong>Rain starts</strong> — Zeus, Poseidon, Demeter, or Iris may speak</li>
                    <li>☀️ <strong>Rain stops</strong> — Apollo often takes credit</li>
                    <li>⚡ <strong>Thunder</strong> — Zeus asserts his dominance</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>🌅 Time-Based Messages</h2>
                <p>At certain times of day:</p>
                <ul>
                    <li>🌅 <strong>Dawn (6 AM)</strong> — Apollo, Eos, Artemis</li>
                    <li>☀️ <strong>Noon (12 PM)</strong> — Apollo at his peak</li>
                    <li>🌆 <strong>Dusk (6 PM)</strong> — Artemis, Hecate</li>
                    <li>🌙 <strong>Midnight</strong> — Hecate, Hypnos, Hades, Nyx</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>📬 Divine Mail</h2>
                <p>Sometimes gods send personal messages to demigods!</p>
                
                <p>Message types include:</p>
                <ul>
                    <li>😄 <strong>Funny</strong> — Gods being their dramatic selves</li>
                    <li>🧐 <strong>Serious</strong> — Actual wisdom and advice</li>
                    <li>⚔️ <strong>Challenges</strong> — Tasks from your godly parent</li>
                </ul>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Be Interesting!</div>
                    <p>The more active you are, the more likely the gods are to notice you and send mail!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📖 Sample Messages</h2>
                <blockquote>
                    <p>⚡ <strong>Zeus:</strong> "I saw what you did yesterday. Don't think I didn't notice. I notice EVERYTHING. Mostly because I'm bored."</p>
                </blockquote>
                <blockquote>
                    <p>☀️ <strong>Apollo:</strong> "Sun rises slowly / I am very beautiful / Please clap for me now"</p>
                </blockquote>
                <blockquote>
                    <p>🦉 <strong>Athena:</strong> "Your cabin is disorganized. This is unacceptable. I've prepared a 47-page organization guide."</p>
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
                <h2>📜 Camp Timeline</h2>
                <p>The timeline records the history of Camp Half-Blood—battles won, quests completed, events held, and more!</p>
                
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
                <h2>🏷️ Categories</h2>
                
                <div class="feature-grid">
                    <div class="feature-card"><h4>📅 Event</h4><p>Camp events and celebrations</p></div>
                    <div class="feature-card"><h4>⚔️ Quest</h4><p>Quest completions</p></div>
                    <div class="feature-card"><h4>🏆 Tournament</h4><p>Competition results</p></div>
                    <div class="feature-card"><h4>🤝 Interaction</h4><p>Notable character moments</p></div>
                    <div class="feature-card"><h4>🔮 Discovery</h4><p>Revelations and findings</p></div>
                    <div class="feature-card"><h4>⚡ Battle</h4><p>Combat encounters</p></div>
                    <div class="feature-card"><h4>🏛️ Ceremony</h4><p>Rituals and ceremonies</p></div>
                    <div class="feature-card"><h4>📝 Other</h4><p>Everything else</p></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>➕ Adding Entries</h2>
                <p>Click "Add Entry" in the timeline view to record your own history!</p>
                <ol>
                    <li>Select a <strong>category</strong> for your entry</li>
                    <li>Enter the <strong>date</strong> (or leave blank for today)</li>
                    <li>Write a <strong>title</strong> (max 100 characters)</li>
                    <li>Add a <strong>description</strong> (max 300 characters)</li>
                </ol>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Make History!</div>
                    <p>Did something epic? Record it! The timeline is a living history of our camp.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>✏️ Editing & Deleting</h2>
                <p>Select one of your entries to:</p>
                <ul>
                    <li>✏️ <strong>Edit</strong> — Update details or fix typos</li>
                    <li>🏷️ <strong>Change Category</strong> — Recategorize the entry</li>
                    <li>🗑️ <strong>Delete</strong> — Remove the entry entirely</li>
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
                <h2>🏪 Player-Run Shops</h2>
                <p>Own a piece of Camp Half-Blood's economy! Player shops let you sell Minecraft items to other campers for Drachma.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Requirement</div>
                    <p>You need a <strong>Shop Permit</strong> (500💰) from <code>!shop</code> → Permits.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📝 Opening Your Shop</h2>
                
                <div class="steps">
                    <div class="step-item">
                        <h4>Buy a Shop Permit</h4>
                        <p>Use <code>!shop</code> → Permits → Shop Permit (500💰)</p>
                    </div>
                    <div class="step-item">
                        <h4>Use the Permit</h4>
                        <p><code>!inventory</code> → Select Permit → "Create My Shop"</p>
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
                <h2>🛠️ Managing Your Shop</h2>
                
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
                    <li>➕ <strong>Add Listing</strong> — List a new item (max 5)</li>
                    <li>📋 <strong>View Listings</strong> — See your active items</li>
                    <li>📦 <strong>Pending Deliveries</strong> — Orders to fulfill</li>
                    <li>✏️ <strong>Edit Shop</strong> — Change name/description</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>📦 Order Fulfillment</h2>
                <p>When someone buys from you:</p>
                <ol>
                    <li>You get <strong>mail</strong> with buyer's MC username</li>
                    <li>Meet them in Minecraft and trade items</li>
                    <li><code>!myshop</code> → Pending → Mark Complete</li>
                    <li>Payment released to you!</li>
                </ol>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Security</div>
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
                <h2>🃏 Shadow Realm Dueling</h2>
                <p>A special card game where demigods can be challenged to Yu-Gi-Oh style duels!</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Special Feature</div>
                    <p>Shadow Duels can only be initiated by a specific designated duelist. If challenged, you can accept or decline!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚔️ How Duels Work</h2>
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
                <h2>🎴 Card Types</h2>
                
                <h3>Monster Cards</h3>
                <p>Summon monsters to attack! Higher ATK means more damage.</p>
                <ul>
                    <li>🧙 Dark Magician (2500 ATK)</li>
                    <li>🐉 Blue-Eyes White Dragon (3000 ATK)</li>
                    <li>🔴 Red-Eyes Black Dragon (2400 ATK)</li>
                    <li>💀 Summoned Skull (2500 ATK)</li>
                    <li>✨ Dark Magician Girl (2000 ATK)</li>
                    <li>⚫ Black Luster Soldier (3000 ATK)</li>
                </ul>
                
                <h3>Spell Cards</h3>
                <p>Powerful one-time effects:</p>
                <ul>
                    <li>🗡️ Swords of Revealing Light — Opponent skips turn</li>
                    <li>♻️ Monster Reborn — Restore 500 LP</li>
                    <li>🏺 Pot of Greed — Draw 2 cards</li>
                    <li>⚫ Dark Hole — Destroy opponent's monster</li>
                    <li>⚡ Raigeki — Deal 800 direct damage</li>
                </ul>
                
                <h3>Trap Cards</h3>
                <p>Defensive surprises:</p>
                <ul>
                    <li>🪞 Mirror Force — Reflect attack damage</li>
                    <li>🎯 Magic Cylinder — Negate attack + 1000 damage</li>
                    <li>🪤 Trap Hole — Destroy attacking monster</li>
                    <li>🚫 Negate Attack — Cancel the attack</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>💰 Rewards</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>Outcome</th><th>Reward</th></tr>
                        <tr><td>🏆 Win the duel</td><td>25 💰</td></tr>
                        <tr><td>😴 Opponent doesn't respond</td><td>10 💰 (forfeit)</td></tr>
                        <tr><td>❌ Lose the duel</td><td>0 💰</td></tr>
                    </table>
                </div>
            </div>
        `
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MINECRAFT PAGES
    // ═══════════════════════════════════════════════════════════════════════

    'mclink': {
        icon: '🔗',
        title: 'Account Linking',
        subtitle: 'Connect Discord and Minecraft',
        content: `
            <div class="doc-section">
                <h2>🔗 Why Link Your Accounts?</h2>
                <p>Linking your Discord and Minecraft accounts unlocks the full Camp Half-Blood experience:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>💰 Synced Economy</h4>
                        <p>Drachma earned anywhere is available everywhere</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚡ God Effects</h4>
                        <p>Your godly parent's blessing follows you in-game</p>
                    </div>
                    <div class="feature-card">
                        <h4>📊 Skill Effects</h4>
                        <p>Upgrade skills in Discord, get buffs in Minecraft</p>
                    </div>
                    <div class="feature-card">
                        <h4>📦 Item Delivery</h4>
                        <p>Buy items in Discord, receive them in-game</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🔗 How to Link</h2>
                
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
                    <div class="info-box-title">⚠️ Exact Username Required</div>
                    <p>Use your exact Minecraft username (case-sensitive). Java Edition usernames are 3-16 characters.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>✅ After Linking</h2>
                <p>Once linked, the following happens automatically:</p>
                <ul>
                    <li>🔄 <strong>Sync runs every 30 seconds</strong> when you're online in MC</li>
                    <li>⚡ <strong>God effects apply</strong> based on your claimed parent</li>
                    <li>🎨 <strong>Name color</strong> updates to your god's color</li>
                    <li>💰 <strong>Drachma syncs</strong> between platforms</li>
                    <li>📊 <strong>Skills apply</strong> their bonuses</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>🔄 How Sync Works</h2>
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
                <h2>⛏️ Minecraft Commands</h2>
                <p>Available when your account is linked via <code>!mclink</code>.</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Link Required</div>
                    <p>Use <code>!mclink YourName</code> on Discord first!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>👤 Profile Commands</h2>
                
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
                <h2>💰 Economy Commands</h2>
                
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
                <h2>✨ Other Commands</h2>
                
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
                <h2>🔄 Two-Way Economy</h2>
                <p>Move Drachma between Discord and Minecraft as physical items!</p>
            </div>

            <div class="doc-section">
                <h2>💰 Depositing</h2>
                
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
                <h2>💸 Withdrawing</h2>
                
                <div class="command">
                    <div class="command-name">/chbwithdraw [amount]</div>
                    <div class="command-desc">Converts balance to physical items.</div>
                </div>

                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Caution</div>
                    <p>Physical Drachma can be lost if you die! Only withdraw what you need.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📦 Receiving Purchases</h2>
                
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
                <h2>✨ Divine Blessings</h2>
                <p>Your god parent grants nametag colors and permanent potion effects in Minecraft!</p>
            </div>

            <div class="doc-section">
                <h2>🎨 Nametag Colors</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Color</th></tr>
                        <tr><td>⚡ Zeus</td><td style="color: yellow;">Yellow</td></tr>
                        <tr><td>🔱 Poseidon</td><td style="color: aqua;">Aqua</td></tr>
                        <tr><td>💀 Hades</td><td style="color: gray;">Dark Gray</td></tr>
                        <tr><td>🦉 Athena</td><td style="color: silver;">Silver</td></tr>
                        <tr><td>☀️ Apollo</td><td style="color: gold;">Gold</td></tr>
                        <tr><td>🏹 Artemis</td><td style="color: white;">White</td></tr>
                        <tr><td>⚔️ Ares</td><td style="color: darkred;">Dark Red</td></tr>
                        <tr><td>💕 Aphrodite</td><td style="color: pink;">Pink</td></tr>
                        <tr><td>🔨 Hephaestus</td><td style="color: orangered;">Orange</td></tr>
                        <tr><td>👟 Hermes</td><td style="color: lime;">Green</td></tr>
                        <tr><td>🌾 Demeter</td><td style="color: green;">Dark Green</td></tr>
                        <tr><td>🍇 Dionysus</td><td style="color: purple;">Purple</td></tr>
                        <tr><td>🌙 Hecate</td><td style="color: darkviolet;">Dark Purple</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>🧪 Permanent Effects</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Effect</th></tr>
                        <tr><td>⚡ Zeus</td><td>Jump Boost I, Lightning resistance</td></tr>
                        <tr><td>🔱 Poseidon</td><td>Water Breathing, Dolphin's Grace</td></tr>
                        <tr><td>💀 Hades</td><td>Fire Resistance, Night Vision</td></tr>
                        <tr><td>🦉 Athena</td><td>Haste I, Enhanced XP</td></tr>
                        <tr><td>☀️ Apollo</td><td>Regeneration I</td></tr>
                        <tr><td>🏹 Artemis</td><td>Speed I, Night Vision</td></tr>
                        <tr><td>⚔️ Ares</td><td>Strength I</td></tr>
                        <tr><td>🔨 Hephaestus</td><td>Fire Resistance, Haste</td></tr>
                        <tr><td>🌙 Hecate</td><td>Night Vision</td></tr>
                        <tr><td>🎲 Tyche</td><td>Luck</td></tr>
                        <tr><td>👟 Hermes</td><td>Speed I, Luck</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚙️ How Effects Apply</h2>
                <ul>
                    <li>Effects apply automatically when you join (if linked)</li>
                    <li>They refresh every 30 seconds during sync</li>
                    <li>Changing your god parent in Discord updates MC on next sync</li>
                    <li>Effects are permanent while online—no potion needed!</li>
                </ul>
            </div>
        `
    },

    'skills': {
        icon: '⚔️',
        title: 'Skill Trees',
        subtitle: 'Train your demigod abilities',
        content: `
            <div class="doc-section">
                <h2>⚔️ The Skill System</h2>
                <p>Every demigod can train and improve their abilities through the skill tree system. Spend your <strong>XP Levels</strong> to unlock powerful upgrades that grant real effects in Minecraft!</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Cross-Platform Power</div>
                    <p>Skills upgraded in Discord automatically apply real effects in Minecraft when you're linked via <code>!mclink</code>.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📊 Accessing Your Skills</h2>
                
                <div class="command">
                    <div class="command-name">!skills</div>
                    <div class="command-desc">Opens your skill tree interface. View all branches, your current tiers, and available upgrades.</div>
                </div>

                <div class="command">
                    <div class="command-name">!skills [branch]</div>
                    <div class="command-desc">View a specific branch. Example: <code>!skills warfare</code></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>⭐ XP Level Costs</h2>
                <p>Skills are purchased with your Minecraft XP levels:</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Total XP</th><th>Additional Cost</th></tr>
                        <tr><td>Tier 1</td><td>50 levels</td><td>50 levels</td></tr>
                        <tr><td>Tier 2</td><td>125 levels</td><td>+75 levels</td></tr>
                        <tr><td>Tier 3</td><td>225 levels</td><td>+100 levels</td></tr>
                        <tr><td>Tier 4</td><td>400 levels</td><td>+175 levels</td></tr>
                        <tr><td>Tier 5</td><td>600 levels</td><td>+200 levels</td></tr>
                    </table>
                </div>

                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Choose Wisely</div>
                    <p>Skill upgrades are permanent investments. Plan your build before spending!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎯 Major & Minor Specializations</h2>
                <p>At Tier 3, you must commit to a skill as your <strong>Major</strong> or <strong>Minor</strong>:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>★ Major Skill</h4>
                        <p>Can reach <strong>Tier 5</strong>. Only ONE allowed.</p>
                    </div>
                    <div class="feature-card">
                        <h4>◆ Minor Skill</h4>
                        <p>Capped at <strong>Tier 4</strong>. Only ONE allowed.</p>
                    </div>
                    <div class="feature-card">
                        <h4>○ Dabbling</h4>
                        <p>All others capped at <strong>Tier 2</strong>.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🌳 The Ten Branches</h2>
                
                <div class="feature-grid">
                    <div class="feature-card"><h4>⚔️ Warfare</h4><p>+5 Damage, +15% Speed, Strength I</p></div>
                    <div class="feature-card"><h4>🏹 Marksmanship</h4><p>+5 Damage, 10% Double Arrow</p></div>
                    <div class="feature-card"><h4>⚒️ Forging</h4><p>Haste III, Auto-Smelt, Double Ore</p></div>
                    <div class="feature-card"><h4>🏃 Athletics</h4><p>+40% Speed, Jump III, Speed I</p></div>
                    <div class="feature-card"><h4>🛡️ Fortitude</h4><p>+14 Health, +4 Armor, Resistance I</p></div>
                    <div class="feature-card"><h4>🌿 Survival</h4><p>+8 Health, Regen II, Saturation</p></div>
                    <div class="feature-card"><h4>🥷 Stealth</h4><p>Fast Sneak, Night Vision, Invisibility</p></div>
                    <div class="feature-card"><h4>✨ Mysticism</h4><p>+10 Luck, Luck II, Conduit Power</p></div>
                    <div class="feature-card"><h4>🌊 Seafaring</h4><p>Dolphin's Grace, Water Breathing</p></div>
                    <div class="feature-card"><h4>👑 Leadership</h4><p>200-block cabin buff aura</p></div>
                </div>
                
                <p><em>Visit the full Skill Tree Details page for complete tier breakdowns!</em></p>
            </div>

            <div class="doc-section">
                <h2>💡 Build Strategies</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚔️ The Gladiator</h4>
                        <p><strong>Major:</strong> Warfare<br><strong>Minor:</strong> Fortitude</p>
                    </div>
                    <div class="feature-card">
                        <h4>⛏️ The Miner</h4>
                        <p><strong>Major:</strong> Forging<br><strong>Minor:</strong> Mysticism</p>
                    </div>
                    <div class="feature-card">
                        <h4>🥷 The Assassin</h4>
                        <p><strong>Major:</strong> Stealth<br><strong>Minor:</strong> Warfare</p>
                    </div>
                    <div class="feature-card">
                        <h4>👑 The Commander</h4>
                        <p><strong>Major:</strong> Leadership<br><strong>Minor:</strong> Fortitude</p>
                    </div>
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
                <h2>📜 Custom Questlines</h2>
                <p>Original story questlines released in phases. No prior lore knowledge needed!</p>
            </div>

            <div class="doc-section">
                <h2>🗺️ Finding Quests</h2>
                <ul>
                    <li><strong>Quest Board:</strong> Check camp for available quests</li>
                    <li><strong>NPCs:</strong> Talk to characters around camp</li>
                    <li><strong>Exploration:</strong> Discover hidden quests</li>
                    <li><strong>Discord:</strong> Request custom quests with <code>!requestquest</code></li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>🎮 Quest Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>📖 Story Quests</h4>
                        <p>Main storyline, released in phases.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚔️ Combat Quests</h4>
                        <p>Battle monsters and prove your skills.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🔍 Exploration</h4>
                        <p>Discover hidden locations.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🤝 Social Quests</h4>
                        <p>Cooperative missions with others.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎁 Quest Rewards</h2>
                <ul>
                    <li>💰 Drachma based on difficulty</li>
                    <li>✨ Divine Favor for your cabin</li>
                    <li>🎒 Unique quest-exclusive items</li>
                    <li>📜 Timeline entries and titles</li>
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
                <h2>🎭 Live Events</h2>
                <p>Triggerable and scheduled live events in Minecraft!</p>
            </div>

            <div class="doc-section">
                <h2>🎪 Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🎭 Theater Shows</h4>
                        <p>Greek tragedy and comedy at the amphitheater.</p>
                    </div>
                    <div class="feature-card">
                        <h4>⚔️ Combat Training</h4>
                        <p>Learn techniques from counselors.</p>
                    </div>
                    <div class="feature-card">
                        <h4>📚 Classes</h4>
                        <p>Mythology, crafting, survival skills.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🐉 Monster Battles</h4>
                        <p>Defeat powerful spawned monsters.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🔥 Campfires</h4>
                        <p>Storytelling and community bonding.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏛️ Olympus Visits</h4>
                        <p>Interact with the gods!</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>⏰ Schedule</h2>
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
                <h2>🏆 Team Tournaments</h2>
                <p>Compete for Drachma, Divine Favor, and glory!</p>
            </div>

            <div class="doc-section">
                <h2>🎮 Tournament Types</h2>
                
                <div class="game-card">
                    <h4>🚩 Capture the Flag</h4>
                    <p>Classic camp game! Capture enemy flag, defend yours.</p>
                    <span class="game-reward">Winners: 50💰 + 10 Favor</span>
                </div>

                <div class="game-card">
                    <h4>⚔️ Arena Battles</h4>
                    <p>PvP combat. 1v1, 2v2, 3v3, or FFA.</p>
                    <span class="game-reward">Based on placement</span>
                </div>

                <div class="game-card">
                    <h4>🔍 Hide & Seek</h4>
                    <p>Hide throughout camp or hunt others!</p>
                    <span class="game-reward">Points-based prizes</span>
                </div>

                <div class="game-card">
                    <h4>🏃 Relay Races</h4>
                    <p>Multi-stage team races.</p>
                    <span class="game-reward">1st: 60💰, 2nd: 40💰, 3rd: 20💰</span>
                </div>

                <div class="game-card">
                    <h4>🏹 Archery Competition</h4>
                    <p>Test your aim at varying distances.</p>
                    <span class="game-reward">Top 3 win Drachma</span>
                </div>

                <div class="game-card">
                    <h4>🐉 Monster Siege</h4>
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
                <h2>🏪 Shopping in Camp</h2>
                <p>There are two ways to shop at Camp Half-Blood:</p>
            </div>

            <div class="doc-section">
                <h2>🛒 Official Camp Store</h2>
                <p>Use <code>!shop</code> in Discord to browse the official camp store. Items are delivered to Minecraft via <code>/chbpending</code>.</p>
            </div>

            <div class="doc-section">
                <h2>🏪 Player Shop Fulfillment</h2>
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
                        <p><code>!myshop</code> → Pending → Mark Complete</p>
                    </div>
                    <div class="step-item">
                        <h4>Get Paid</h4>
                        <p>Payment released to your account!</p>
                    </div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Security</div>
                    <p>Payment is held in escrow until you confirm delivery!</p>
                </div>
            </div>
        `
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LORE PAGE
    // ═══════════════════════════════════════════════════════════════════════

    'lore': {
        icon: '📖',
        title: 'Camp Lore',
        subtitle: 'The story so far...',
        content: `
            <div class="doc-section">
                <h2>📖 The Story</h2>
                <p>An original story in a world of Greek mythology. <strong>No prior knowledge needed!</strong></p>
            </div>

            <div class="doc-section">
                <h2>🌍 The World</h2>
                <p>Greek mythology is real. The Olympian gods exist, and they have children with mortals—<strong>demigods</strong>.</p>
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
                <h2>⚖️ Phase 1: Unsettling Circumstances</h2>
                <p class="phase-badge" style="display: inline-block; background: var(--lightning); color: var(--olympus-blue); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; margin-bottom: 1rem;">CURRENT PHASE</p>
                
                <p>As new Demigods arrive, something feels… <em>off</em>.</p>
                
                <h3>🏛️ The Gods Are Quiet</h3>
                <p>Camp runs well, but there's no divine supervision.</p>
                <ul>
                    <li>No direct orders from Olympus</li>
                    <li>No watchful divine eyes</li>
                    <li>The Oracle is unusually quiet</li>
                </ul>
                <p>Camp isn't in peril... <em>yet</em>.</p>

                <h3>🧭 What You Can Do</h3>
                <ul>
                    <li>Questlines available immediately</li>
                    <li>Explore camp and meet NPCs</li>
                    <li>Pay attention to details</li>
                    <li>Prepare for tournaments</li>
                </ul>

                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Pay Attention</div>
                    <p>Not everything is as simple as it appears. Details matter!</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🔮 Future Phases</h2>
                <p>The story continues based on community actions. Phase 2 will be announced when the time is right...</p>
            </div>
        `
    }
};
