// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - ALL PAGE CONTENT
// ══════════════════════════════════════════════════════════════════════════

const PAGES = {
    // ═══════════════════════════════════════════════════════════════════════
    // DISCORD PAGES
    // ═══════════════════════════════════════════════════════════════════════

    'getting-started': {
        icon: '🌟',
        title: 'Getting Started',
        subtitle: 'Your first steps at Camp Half-Blood',
        content: `
            <div class="doc-section">
                <h2>🏕️ Welcome, Demigod!</h2>
                <p>You've found your way to Camp Half-Blood—the only safe haven for heroes like you. This guide will walk you through everything you need to know to begin your adventure.</p>
                
                <div class="info-box tip">
                    <div class="info-box-title">💡 Pro Tip</div>
                    <p>The <code>!profile</code> command is your central hub! From there you can access mail, inventory, games, shop, and more—all through interactive buttons.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>📋 Your First 5 Steps</h2>
                
                <div class="steps">
                    <div class="step-item">
                        <h4>Create Your Profile</h4>
                        <p>Type <code>!profile</code> in any bot channel. This creates your demigod identity and gives you <strong>100 starting Drachma</strong>.</p>
                    </div>
                    <div class="step-item">
                        <h4>Discover Your Godly Parent</h4>
                        <p>Use <code>!claim</code> to take the Oracle's claiming quiz. Answer honestly—the quiz matches your personality to one of <strong>19 Olympian gods</strong>.</p>
                    </div>
                    <div class="step-item">
                        <h4>Link Your Minecraft Account</h4>
                        <p>Run <code>!mclink YourMinecraftName</code> to connect your accounts. This enables two-way Drachma sync, item delivery, and god effects.</p>
                    </div>
                    <div class="step-item">
                        <h4>Join or Create a Cabin</h4>
                        <p>Use <code>!cabin list</code> to see existing teams, or <code>!cabin create CabinName</code> to start your own.</p>
                    </div>
                    <div class="step-item">
                        <h4>Start Earning Drachma</h4>
                        <p>Use <code>!games</code> to access 10 mythology-themed mini-games. Daily challenges, events, and quests also reward Drachma!</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚡ Essential Commands</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>👤 Profile</h4>
                        <p><code>!profile</code> - Your hub<br>
                        <code>!balance</code> - Check Drachma<br>
                        <code>!inventory</code> - Your items</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏛️ Identity</h4>
                        <p><code>!claim</code> - Claiming quiz<br>
                        <code>!gods</code> - Browse gods<br>
                        <code>!mygod</code> - Your parent</p>
                    </div>
                    <div class="feature-card">
                        <h4>🏕️ Social</h4>
                        <p><code>!cabin</code> - Your cabin<br>
                        <code>!mail</code> - Your inbox<br>
                        <code>!leaderboard</code> - Rankings</p>
                    </div>
                    <div class="feature-card">
                        <h4>💰 Economy</h4>
                        <p><code>!games</code> - Play games<br>
                        <code>!shop</code> - Camp store<br>
                        <code>!daily</code> - Daily bonus</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>❓ Getting Help</h2>
                <ul>
                    <li><code>!help</code> - Shows all available commands</li>
                    <li><code>!help [command]</code> - Detailed info about a specific command</li>
                    <li>Ask in <strong>#questions</strong> - Staff and experienced campers are happy to help!</li>
                </ul>
            </div>
        `
    },

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
                    <li><strong>Cabin:</strong> Your team (if any)</li>
                    <li><strong>Inventory:</strong> Number of items owned</li>
                    <li><strong>Unread Mail:</strong> New message count</li>
                    <li><strong>Minecraft Link:</strong> Your linked MC username</li>
                </ul>
            </div>

            <div class="doc-section">
                <h2>📬 Mail System</h2>
                <p>The mail system keeps you informed about everything happening at camp.</p>
                
                <div class="command">
                    <div class="command-name">!mail</div>
                    <div class="command-desc">Opens your mailbox. Unread messages marked with 🔵.</div>
                </div>

                <h3>Mail Types</h3>
                <div class="table-container">
                    <table>
                        <tr><th>Type</th><th>Icon</th><th>Description</th></tr>
                        <tr><td>God Claiming</td><td>🏛️</td><td>Letter from your godly parent</td></tr>
                        <tr><td>Cabin Invite</td><td>🏕️</td><td>Invitation to join a cabin</td></tr>
                        <tr><td>Quest Updates</td><td>📜</td><td>Quest notifications</td></tr>
                        <tr><td>Delivery Request</td><td>📦</td><td>Shop orders to fulfill</td></tr>
                        <tr><td>Delivery Complete</td><td>✅</td><td>Your purchase delivered</td></tr>
                        <tr><td>Rewards</td><td>💰</td><td>Drachma rewards</td></tr>
                    </table>
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
                </ul>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Auto-Delivery</div>
                    <p>Minecraft items are automatically queued when purchased. Use <code>/chbpending</code> in MC to receive them!</p>
                </div>
            </div>
        `
    },

    'mclink': {
        icon: '🔗',
        title: 'MC Link',
        subtitle: 'Connect Discord and Minecraft',
        content: `
            <div class="doc-section">
                <h2>🔗 Account Linking</h2>
                <p>Linking your accounts unlocks the full Camp Half-Blood experience with seamless sync between platforms.</p>
                
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

            <div class="doc-section">
                <h2>✨ What Linking Enables</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>💰 Drachma Sync</h4>
                        <p>Balance syncs between Discord and Minecraft automatically.</p>
                    </div>
                    <div class="feature-card">
                        <h4>📦 Item Delivery</h4>
                        <p>Discord shop purchases delivered to your MC inventory.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎨 Name Colors</h4>
                        <p>Nametag color based on your god parent.</p>
                    </div>
                    <div class="feature-card">
                        <h4>🧪 Potion Effects</h4>
                        <p>Permanent effect unique to your god.</p>
                    </div>
                </div>
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

    'gods': {
        icon: '🏛️',
        title: 'Gods & Claiming',
        subtitle: 'Discover your divine heritage',
        content: `
            <div class="doc-section">
                <h2>⚡ The Claiming Ceremony</h2>
                <p>Every demigod has one divine parent. The claiming quiz reveals which Olympian god is yours.</p>
                
                <div class="command">
                    <div class="command-name">!claim</div>
                    <div class="command-aliases">Aliases: !quiz</div>
                    <div class="command-desc">Take the claiming quiz. You'll receive a personalized letter from your god!</div>
                </div>

                <div class="command">
                    <div class="command-name">!gods</div>
                    <div class="command-desc">Browse all 19 Olympian gods.</div>
                </div>

                <div class="command">
                    <div class="command-name">!mygod</div>
                    <div class="command-desc">View detailed info about your godly parent.</div>
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
                <h2>⛏️ Minecraft Benefits</h2>
                <p>When linked, your god grants nametag colors and permanent potion effects!</p>
                
                <h3>Example Effects</h3>
                <ul>
                    <li><strong>Zeus:</strong> Yellow name, Jump Boost I</li>
                    <li><strong>Poseidon:</strong> Aqua name, Water Breathing</li>
                    <li><strong>Hades:</strong> Gray name, Resistance I</li>
                    <li><strong>Athena:</strong> Silver name, Haste I</li>
                    <li><strong>Apollo:</strong> Gold name, Regeneration I</li>
                </ul>
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
                <p>Cabins are teams of demigods working together. Earn Divine Favor, compete in tournaments, and unlock bonuses!</p>
                
                <div class="command">
                    <div class="command-name">!cabin</div>
                    <div class="command-desc">View your cabin's info, members, and Divine Favor.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin list</div>
                    <div class="command-desc">Browse all cabins, sorted by Divine Favor.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin create [Name]</div>
                    <div class="command-desc">Create a new cabin. You become leader.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin invite @user</div>
                    <div class="command-desc">[Leader] Invite a player to your cabin.</div>
                </div>

                <div class="command">
                    <div class="command-name">!cabin leave</div>
                    <div class="command-desc">Leave your current cabin.</div>
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

                <h3>Earning Divine Favor</h3>
                <ul>
                    <li>Win tournaments</li>
                    <li>Complete quests</li>
                    <li>Participate in events</li>
                    <li>Active cabin participation</li>
                </ul>
            </div>
        `
    },

    'economy': {
        icon: '💰',
        title: 'Drachma & Economy',
        subtitle: 'Earn and spend golden Drachma',
        content: `
            <div class="doc-section">
                <h2>💰 Golden Drachma</h2>
                <p>Drachma is the currency of Camp Half-Blood. Earn through activities, spend in shops!</p>
                
                <div class="command">
                    <div class="command-name">!balance</div>
                    <div class="command-aliases">Aliases: !bal, !drachma</div>
                    <div class="command-desc">Check your current balance.</div>
                </div>

                <div class="command">
                    <div class="command-name">!daily</div>
                    <div class="command-desc">Claim daily bonus (resets every 24 hours).</div>
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
                        <tr><th>Activity</th><th>Reward</th></tr>
                        <tr><td>🎮 Mini-Games</td><td>1-25 💰</td></tr>
                        <tr><td>📅 Daily Bonus</td><td>10-25 💰</td></tr>
                        <tr><td>⚡ Daily Challenges</td><td>2-12 💰</td></tr>
                        <tr><td>📜 Quests</td><td>Variable</td></tr>
                        <tr><td>🏆 Events</td><td>5-75 💰</td></tr>
                        <tr><td>🏪 Player Shop</td><td>Variable</td></tr>
                        <tr><td>⛏️ Minecraft</td><td>Variable</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏪 Camp Store</h2>
                
                <div class="command">
                    <div class="command-name">!shop</div>
                    <div class="command-desc">Opens the camp store with categories.</div>
                </div>

                <h3>Popular Items</h3>
                <div class="table-container">
                    <table>
                        <tr><th>Item</th><th>Price</th></tr>
                        <tr><td>⚔️ Diamond Sword</td><td>30 💰</td></tr>
                        <tr><td>💎 Full Diamond Armor</td><td>120 💰</td></tr>
                        <tr><td>🟫 Netherite Ingot</td><td>50 💰</td></tr>
                        <tr><td>🗿 Totem of Undying</td><td>75 💰</td></tr>
                        <tr><td>🪽 Elytra Wings</td><td>200 💰</td></tr>
                        <tr><td>🏪 Shop Permit</td><td>500 💰</td></tr>
                    </table>
                </div>
            </div>
        `
    },

    'games': {
        icon: '🎮',
        title: 'Mini-Games & Casino',
        subtitle: "Play to earn • Vi's Casino",
        content: `
            <div class="doc-section">
                <h2>🎮 Mini-Games Arcade</h2>
                <p>10 unique mythology-themed games with different mechanics and rewards!</p>
                
                <div class="command">
                    <div class="command-name">!games</div>
                    <div class="command-aliases">Aliases: !game, !play</div>
                    <div class="command-desc">Opens game selection menu.</div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Cooldowns</div>
                    <p>Each game has a 4-10 minute cooldown after playing.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎯 All 10 Games</h2>
                
                <div class="game-card">
                    <h4>⚔️ Godly Trials</h4>
                    <p>Face 3 mythological encounters. Win 2/3 rounds!</p>
                    <span class="game-reward">3 💰</span>
                </div>

                <div class="game-card">
                    <h4>🏛️ Labyrinth Escape</h4>
                    <p>Navigate Daedalus's maze. Avoid the Minotaur!</p>
                    <span class="game-reward">5 💰</span>
                </div>

                <div class="game-card">
                    <h4>🐕 Cerberus Dodge</h4>
                    <p>Dodge the three-headed guardian as long as possible.</p>
                    <span class="game-reward">1-5 💰</span>
                </div>

                <div class="game-card">
                    <h4>🏇 Chariot Race</h4>
                    <p>Race your chariot with stamina management.</p>
                    <span class="game-reward">4 💰</span>
                </div>

                <div class="game-card">
                    <h4>🏹 Olympian Archery</h4>
                    <p>5 arrows. Score based on accuracy!</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>⚡ Lightning Roulette</h4>
                    <p>High-risk, high-reward chance game!</p>
                    <span class="game-reward">2-25 💰</span>
                </div>

                <div class="game-card">
                    <h4>🐉 Hydra Strike</h4>
                    <p>Cut heads—but wrong ones grow back!</p>
                    <span class="game-reward">4-6 💰</span>
                </div>

                <div class="game-card">
                    <h4>🔮 Oracle's Vision</h4>
                    <p>Memory match game with mystical symbols.</p>
                    <span class="game-reward">4-7 💰</span>
                </div>

                <div class="game-card">
                    <h4>🎵 Siren's Song</h4>
                    <p>Simon Says-style pattern memory.</p>
                    <span class="game-reward">Variable</span>
                </div>

                <div class="game-card">
                    <h4>🦄 Pegasus Flight</h4>
                    <p>Fly to Olympus through storm clouds!</p>
                    <span class="game-reward">5 💰</span>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎰 Vi's Casino</h2>
                <p><strong>Vi (VianiteGMG)</strong> runs the camp casino with real Drachma gambling!</p>
                
                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Warning</div>
                    <p>Casino uses <strong>real Drachma</strong>! You can lose your bet. Play responsibly!</p>
                </div>

                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🎰 Olympus Slots</h4>
                        <p>10💰 per spin</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎡 Hermes Roulette</h4>
                        <p>15💰 per game</p>
                    </div>
                    <div class="feature-card">
                        <h4>🃏 Athena Blackjack</h4>
                        <p>20💰 per hand</p>
                    </div>
                    <div class="feature-card">
                        <h4>🎲 Apollo Dice</h4>
                        <p>5💰 per roll</p>
                    </div>
                    <div class="feature-card">
                        <h4>🪙 Tyche Coinflip</h4>
                        <p>25💰 high stakes!</p>
                    </div>
                </div>
            </div>
        `
    },

    'shops': {
        icon: '🏪',
        title: 'Shops & Trading',
        subtitle: 'Buy, sell, and trade',
        content: `
            <div class="doc-section">
                <h2>🏪 Player Shops</h2>
                <p>Own your own shop! Sell Minecraft items to other players.</p>
                
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
                        <p>Enter name and description.</p>
                    </div>
                    <div class="step-item">
                        <h4>Choose Type</h4>
                        <p>Weapons, Armor, Potions, Materials, etc.</p>
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
                    <div class="command-desc">Browse all active player shops.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📦 Order Fulfillment</h2>
                <p>When someone buys from you:</p>
                <ol>
                    <li>You get mail with buyer's MC username</li>
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
                <p>Skills are purchased with your Minecraft XP levels. Higher tiers require more total XP investment:</p>
                
                <div class="table-container">
                    <table>
                        <tr><th>Tier</th><th>Total XP Required</th><th>Additional Cost</th></tr>
                        <tr><td>Tier 1</td><td>50 levels</td><td>50 levels</td></tr>
                        <tr><td>Tier 2</td><td>125 levels</td><td>+75 levels</td></tr>
                        <tr><td>Tier 3</td><td>225 levels</td><td>+100 levels</td></tr>
                        <tr><td>Tier 4</td><td>400 levels</td><td>+175 levels</td></tr>
                        <tr><td>Tier 5</td><td>600 levels</td><td>+200 levels</td></tr>
                    </table>
                </div>

                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Choose Wisely</div>
                    <p>Skill upgrades are permanent investments. Plan your build before spending! You can't refund XP once allocated.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎯 Major & Minor Specializations</h2>
                <p>At Tier 3, you must commit to a skill as your <strong>Major</strong> or <strong>Minor</strong> specialization:</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>★ Major Skill</h4>
                        <p>Can reach <strong>Tier 5 (Mastery)</strong>. You can only have ONE Major.</p>
                    </div>
                    <div class="feature-card">
                        <h4>◆ Minor Skill</h4>
                        <p>Capped at <strong>Tier 4</strong>. You can only have ONE Minor.</p>
                    </div>
                    <div class="feature-card">
                        <h4>○ Dabbling</h4>
                        <p>All other skills are capped at <strong>Tier 2</strong>.</p>
                    </div>
                </div>
                
                <p>This means you'll want to specialize! A fully developed demigod has: 1 Major (T5), 1 Minor (T4), and can dabble (T2) in the rest.</p>
            </div>

            <div class="doc-section">
                <h2>🌳 The Ten Branches</h2>
                <p>Each branch focuses on different aspects of demigod life. Effects are cumulative—you keep all bonuses from previous tiers!</p>
                
                <div class="feature-grid">
                    <div class="feature-card"><h4>⚔️ Warfare</h4><p>Melee combat mastery</p></div>
                    <div class="feature-card"><h4>🏹 Marksmanship</h4><p>Ranged combat</p></div>
                    <div class="feature-card"><h4>⚒️ Forging</h4><p>Mining & crafting</p></div>
                    <div class="feature-card"><h4>🏃 Athletics</h4><p>Speed & movement</p></div>
                    <div class="feature-card"><h4>🛡️ Fortitude</h4><p>Defense & health</p></div>
                    <div class="feature-card"><h4>🌿 Survival</h4><p>Sustenance & nature</p></div>
                    <div class="feature-card"><h4>🥷 Stealth</h4><p>Shadows & sneaking</p></div>
                    <div class="feature-card"><h4>✨ Mysticism</h4><p>Magic & fortune</p></div>
                    <div class="feature-card"><h4>🌊 Seafaring</h4><p>Ocean mastery</p></div>
                    <div class="feature-card"><h4>👑 Leadership</h4><p>Team buffs & auras</p></div>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚔️ Warfare Branch</h2>
                <p><em>"Master of blade and battle"</em> — For demigods who live for melee combat.</p>
                
                <div class="game-card"><h4>T1: Squire</h4><p>+1 Attack Damage</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Warrior</h4><p>+5% Attack Speed</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Champion</h4><p>+1 Attack Damage, +10% Knockback Resistance</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Warlord</h4><p>+10% Attack Speed, +1 Attack Damage</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Blade Master</h4><p>+2 Attack Damage, +20% KB Resist, Permanent Strength I</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">⚔️ Mastery Total</div>
                    <p>+5 Attack Damage, +15% Attack Speed, +30% Knockback Resistance, Strength I</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏹 Marksmanship Branch</h2>
                <p><em>"Every arrow finds its mark"</em> — Master ranged combat and precision.</p>
                
                <div class="game-card"><h4>T1: Archer</h4><p>+1 Attack Damage (melee backup)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Sharpshooter</h4><p>+10% Attack Speed</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Ranger</h4><p>+1 Attack Damage</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Sniper</h4><p>+15% Attack Speed, +1 Damage</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Eagle Eye</h4><p>+2 Attack Damage, 10% chance: Double arrow damage</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🏹 Mastery Total</div>
                    <p>+5 Attack Damage, +25% Attack Speed, 10% Double Arrow Damage</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>⚒️ Forging Branch</h2>
                <p><em>"Shape metal with divine precision"</em> — Mining speed, auto-smelting, and resource bonuses.</p>
                
                <div class="game-card"><h4>T1: Apprentice</h4><p>Haste I (faster mining)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Journeyman</h4><p>Haste II</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Blacksmith</h4><p>Auto-smelt iron/gold/copper ores</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Master Smith</h4><p>10% chance: Double ore drops</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Forge Lord</h4><p>Haste III, Permanent Fire Resistance</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">⚒️ Mastery Total</div>
                    <p>Haste III, Auto-Smelt Ores, 10% Double Ore Drops, Fire Resistance</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🏃 Athletics Branch</h2>
                <p><em>"Swift as Hermes himself"</em> — Movement speed and jump boosts.</p>
                
                <div class="game-card"><h4>T1: Runner</h4><p>+5% Movement Speed</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Sprinter</h4><p>+5% Movement Speed, Jump Boost I</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Athlete</h4><p>+10% Movement Speed, Jump Boost II</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Olympian</h4><p>+10% Movement Speed, Jump Boost III</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Speed Demon</h4><p>+10% Movement Speed, Permanent Speed I</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🏃 Mastery Total</div>
                    <p>+40% Movement Speed, Jump Boost III, Speed I Effect</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🛡️ Fortitude Branch</h2>
                <p><em>"Unyielding as mountain stone"</em> — Health, armor, and damage resistance.</p>
                
                <div class="game-card"><h4>T1: Tough</h4><p>+2 Max Health (+1 heart)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Hardy</h4><p>+2 Armor</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Stalwart</h4><p>+4 Max Health (+2 hearts), +10% KB Resist</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Ironclad</h4><p>+2 Armor Toughness, +4 Max Health</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Unbreakable</h4><p>+4 Health, +2 Armor, +20% KB Resist, Resistance I</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🛡️ Mastery Total</div>
                    <p>+14 Max Health (+7 hearts), +4 Armor, +2 Armor Toughness, +30% KB Resist, Resistance I</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🌿 Survival Branch</h2>
                <p><em>"One with the wild"</em> — Sustenance, regeneration, and nature affinity.</p>
                
                <div class="game-card"><h4>T1: Forager</h4><p>Saturation I (slower hunger drain)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Scout</h4><p>Food heals +1 extra heart</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Ranger</h4><p>Regeneration I</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Wilderness Expert</h4><p>+4 Max Health, Regeneration II</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Nature's Chosen</h4><p>+4 Max Health, Hero of the Village effect</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🌿 Mastery Total</div>
                    <p>+8 Max Health, Regeneration II, Food Heals Extra, Saturation, Hero of the Village</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🥷 Stealth Branch</h2>
                <p><em>"Unseen, unheard, unstoppable"</em> — Sneaking, night vision, and shadow powers.</p>
                
                <div class="game-card"><h4>T1: Sneaky</h4><p>Speed I while sneaking</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Shadow</h4><p>Speed II while sneaking</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Ghost</h4><p>Reduced fall damage (7 block buffer)</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Phantom</h4><p>Permanent Night Vision</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Shade</h4><p>Invisibility while sneaking, Slow Falling</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🥷 Mastery Total</div>
                    <p>Speed II while sneaking, -7 Fall Damage, Night Vision, Invisibility while sneaking, Slow Falling</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>✨ Mysticism Branch</h2>
                <p><em>"Touched by arcane power"</em> — Luck, fortune, and magical effects.</p>
                
                <div class="game-card"><h4>T1: Initiate</h4><p>+1 Luck (better loot)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Acolyte</h4><p>+2 Luck</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Mystic</h4><p>+2 Luck, Glowing (see through walls)</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Sorcerer</h4><p>+2 Luck, Luck I Effect</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Archmage</h4><p>+3 Luck, Luck II Effect, Conduit Power</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">✨ Mastery Total</div>
                    <p>+10 Luck Attribute, Luck II Effect, Conduit Power, Glowing</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🌊 Seafaring Branch</h2>
                <p><em>"Child of the endless seas"</em> — Ocean mastery, water breathing, and swimming.</p>
                
                <div class="game-card"><h4>T1: Swimmer</h4><p>Dolphin's Grace (faster swimming)</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Diver</h4><p>Water Breathing</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Sailor</h4><p>Conduit Power (mine underwater)</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: Sea Captain</h4><p>+4 Max Health</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Ocean Lord</h4><p>Full Conduit Power, Special Trident on first login</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">🌊 Mastery Total</div>
                    <p>Dolphin's Grace, Water Breathing, Conduit Power, +4 Max Health, Legendary Trident</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>👑 Leadership Branch</h2>
                <p><em>"Born to lead, destined to inspire"</em> — Buff auras that help your entire cabin!</p>
                
                <div class="game-card"><h4>T1: Speaker</h4><p>Cabin aura: 50 block range</p><span class="game-reward">50 XP</span></div>
                <div class="game-card"><h4>T2: Diplomat</h4><p>Shop discounts, 75 block aura range</p><span class="game-reward">125 XP total</span></div>
                <div class="game-card"><h4>T3: Commander</h4><p>Cabin aura: Health Boost to allies, 100 block range</p><span class="game-reward">225 XP total</span></div>
                <div class="game-card"><h4>T4: General</h4><p>Cabin aura: Speed to allies, 150 block range</p><span class="game-reward">400 XP total</span></div>
                <div class="game-card"><h4>T5: Legendary Leader</h4><p>Cabin aura: Strength + Resistance, 200 block range</p><span class="game-reward">600 XP total</span></div>
                
                <div class="info-box tip">
                    <div class="info-box-title">👑 Mastery Total</div>
                    <p>200-block cabin aura granting Health Boost, Speed, Strength, and Resistance to allies</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>💡 Build Strategies</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>⚔️ The Gladiator</h4>
                        <p><strong>Major:</strong> Warfare<br><strong>Minor:</strong> Fortitude<br>Melee powerhouse with survivability</p>
                    </div>
                    <div class="feature-card">
                        <h4>⛏️ The Miner</h4>
                        <p><strong>Major:</strong> Forging<br><strong>Minor:</strong> Mysticism<br>Maximum resource gathering with luck</p>
                    </div>
                    <div class="feature-card">
                        <h4>🥷 The Assassin</h4>
                        <p><strong>Major:</strong> Stealth<br><strong>Minor:</strong> Warfare<br>Strike from shadows with deadly force</p>
                    </div>
                    <div class="feature-card">
                        <h4>🌊 The Poseidon Build</h4>
                        <p><strong>Major:</strong> Seafaring<br><strong>Minor:</strong> Athletics<br>Ocean dominance with land mobility</p>
                    </div>
                    <div class="feature-card">
                        <h4>👑 The Commander</h4>
                        <p><strong>Major:</strong> Leadership<br><strong>Minor:</strong> Fortitude<br>Buff your cabin while staying alive</p>
                    </div>
                    <div class="feature-card">
                        <h4>🌿 The Survivor</h4>
                        <p><strong>Major:</strong> Survival<br><strong>Minor:</strong> Fortitude<br>Nearly unkillable regeneration tank</p>
                    </div>
                </div>

                <div class="info-box tip">
                    <div class="info-box-title">💡 Pro Tip</div>
                    <p>Decide your Major early! All skills cost the same XP, so pick a path and commit. Dabbling (T2) in multiple trees gives variety, but mastery (T5) gives the best effects.</p>
                </div>
            </div>

            <div class="doc-section">
                <h2>🔄 How Effects Apply</h2>
                <p>When you upgrade a skill in Discord:</p>
                <ol>
                    <li>Your XP levels are deducted in Minecraft</li>
                    <li>Your skill tier is saved to the database</li>
                    <li>Effects sync immediately (or within 30 seconds)</li>
                    <li>Passive effects (health, speed, etc.) apply automatically</li>
                    <li>Proc effects (auto-smelt, double drops) trigger on relevant actions</li>
                </ol>
                
                <p>Use <code>/chbskills</code> in Minecraft to see your active skill effects!</p>
            </div>
        `
    },

    'events': {
        icon: '📅',
        title: 'Events & Timeline',
        subtitle: "What's happening at camp",
        content: `
            <div class="doc-section">
                <h2>🏆 Camp Events</h2>
                <p>Regular events with Drachma prizes and Divine Favor rewards!</p>
                
                <div class="command">
                    <div class="command-name">!events</div>
                    <div class="command-desc">View upcoming events with times and rewards.</div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎭 Event Types</h2>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h4>🏇 Chariot Racing</h4>
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
                        <h4>📚 Training Classes</h4>
                        <p>Attendance: 15💰</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>📜 Daily Challenges</h2>
                <p>Mythology trivia posted daily. React quickly to earn!</p>
                <ul>
                    <li>Trivia: 5-12💰 for first correct</li>
                    <li>Riddles: Solve for rewards</li>
                    <li>Reaction Challenges: Be first!</li>
                </ul>
            </div>
        `
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MINECRAFT PAGES
    // ═══════════════════════════════════════════════════════════════════════

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
                <h2>📊 Other Commands</h2>
                
                <div class="command">
                    <div class="command-name">/chbhelp</div>
                    <div class="command-desc">Shows all available commands.</div>
                </div>

                <div class="command">
                    <div class="command-name">/chbleaderboard</div>
                    <div class="command-desc">View top Drachma earners.</div>
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
                        <tr><td>🔨 Hephaestus</td><td style="color: orangered;">Red</td></tr>
                        <tr><td>👟 Hermes</td><td style="color: lime;">Green</td></tr>
                    </table>
                </div>
            </div>

            <div class="doc-section">
                <h2>🧪 Permanent Effects</h2>
                
                <div class="table-container">
                    <table>
                        <tr><th>God</th><th>Effect</th></tr>
                        <tr><td>⚡ Zeus</td><td>Jump Boost I</td></tr>
                        <tr><td>🔱 Poseidon</td><td>Water Breathing</td></tr>
                        <tr><td>💀 Hades</td><td>Resistance I</td></tr>
                        <tr><td>🦉 Athena</td><td>Haste I</td></tr>
                        <tr><td>☀️ Apollo</td><td>Regeneration I</td></tr>
                        <tr><td>🏹 Artemis</td><td>Speed I</td></tr>
                        <tr><td>⚔️ Ares</td><td>Strength I</td></tr>
                        <tr><td>🔨 Hephaestus</td><td>Fire Resistance</td></tr>
                        <tr><td>🌙 Hecate</td><td>Night Vision</td></tr>
                        <tr><td>🎲 Tyche</td><td>Luck</td></tr>
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
                <h2>📜 Custom Questlines</h2>
                <p>Original story questlines released in phases. No prior lore knowledge needed!</p>
            </div>

            <div class="doc-section">
                <h2>🗺️ Finding Quests</h2>
                <ul>
                    <li><strong>Quest Board:</strong> Check camp for available quests</li>
                    <li><strong>NPCs:</strong> Talk to characters around camp</li>
                    <li><strong>Exploration:</strong> Discover hidden quests</li>
                    <li><strong>Events:</strong> Special event quests</li>
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
                        <h4>📦 Fetch Quests</h4>
                        <p>Gather items for camp.</p>
                    </div>
                </div>
            </div>

            <div class="doc-section">
                <h2>🎁 Quest Rewards</h2>
                <ul>
                    <li>Drachma based on difficulty</li>
                    <li>Divine Favor for your cabin</li>
                    <li>Unique quest-exclusive items</li>
                    <li>Lore entries and titles</li>
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
                <p>Events announced in Discord <strong>#events</strong> channel.</p>
                <ul>
                    <li><strong>Scheduled:</strong> Announced in advance</li>
                    <li><strong>Triggered:</strong> Started when players online</li>
                    <li><strong>Spontaneous:</strong> Random occurrences</li>
                </ul>
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
        title: 'MC Player Shops',
        subtitle: 'In-game shop fulfillment',
        content: `
            <div class="doc-section">
                <h2>🏪 Shop Fulfillment</h2>
                <p>When you sell on Discord, buyers receive items in Minecraft!</p>
            </div>

            <div class="doc-section">
                <h2>📦 Fulfillment Process</h2>
                
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
            </div>

            <div class="doc-section">
                <h2>💡 Tips</h2>
                <ul>
                    <li>Set a consistent meeting spot</li>
                    <li>Fulfill orders promptly</li>
                    <li>Keep inventory stocked</li>
                    <li>Price competitively</li>
                </ul>

                <div class="info-box warning">
                    <div class="info-box-title">⚠️ Security</div>
                    <p>Never deliver without an order in the system! Payment is held until you confirm.</p>
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
