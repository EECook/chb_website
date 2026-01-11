// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - BACKEND SERVER
// Deploy to Railway, Render, or any Node.js host
// ══════════════════════════════════════════════════════════════════════════

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ══════════════════════════════════════════════════════════════════════════
// DATABASE CONNECTION
// ══════════════════════════════════════════════════════════════════════════

const dbConfig = {
    host: process.env.DB_HOST,           // Your BisectHosting MySQL host
    user: process.env.DB_USER,           // Your MySQL username
    password: process.env.DB_PASSWORD,   // Your MySQL password
    database: process.env.DB_NAME,       // s412518_CampHalfBlood
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

async function initDatabase() {
    try {
        pool = mysql.createPool(dbConfig);
        
        // Test connection
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release();
        
        // Create tables if they don't exist
        await createTables();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('⚠️  Running in demo mode (no database)');
    }
}

async function createTables() {
    const queries = [
        `CREATE TABLE IF NOT EXISTS players (
            id INT AUTO_INCREMENT PRIMARY KEY,
            discord_id VARCHAR(20) UNIQUE,
            discord_username VARCHAR(100),
            mc_username VARCHAR(50),
            god_parent VARCHAR(50) DEFAULT NULL,
            drachma INT DEFAULT 100,
            cabin_id INT DEFAULT NULL,
            divine_favor INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS mail (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT,
            sender VARCHAR(100),
            subject VARCHAR(200),
            content TEXT,
            mail_type VARCHAR(50) DEFAULT 'system',
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT,
            item_name VARCHAR(100),
            item_type VARCHAR(50),
            quantity INT DEFAULT 1,
            is_redeemable BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS cabins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) UNIQUE,
            description TEXT,
            leader_id INT,
            divine_favor INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS character_sheets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            player_id INT UNIQUE,
            char_name VARCHAR(100),
            age INT,
            gender VARCHAR(50),
            pronouns VARCHAR(50),
            personality TEXT,
            likes TEXT,
            dislikes TEXT,
            backstory TEXT,
            weapon VARCHAR(100),
            fighting_style VARCHAR(100),
            abilities TEXT,
            goals TEXT,
            fears TEXT,
            image_url TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS shops (
            id INT AUTO_INCREMENT PRIMARY KEY,
            owner_id INT UNIQUE,
            shop_name VARCHAR(100),
            description TEXT,
            shop_type VARCHAR(50),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES players(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS shop_listings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            shop_id INT,
            item_name VARCHAR(100),
            description TEXT,
            price INT,
            stock INT DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
        )`
    ];
    
    for (const query of queries) {
        try {
            await pool.execute(query);
        } catch (error) {
            console.error('Table creation error:', error.message);
        }
    }
    console.log('✅ Database tables verified');
}

// ══════════════════════════════════════════════════════════════════════════
// GOD DATA
// ══════════════════════════════════════════════════════════════════════════

const GODS = {
    'Zeus': { emoji: '⚡', color: 'Yellow', effect: 'Jump Boost I', domain: 'Sky & Thunder' },
    'Poseidon': { emoji: '🔱', color: 'Aqua', effect: 'Water Breathing', domain: 'Sea & Earthquakes' },
    'Hades': { emoji: '💀', color: 'Dark Gray', effect: 'Resistance I', domain: 'Underworld' },
    'Athena': { emoji: '🦉', color: 'Silver', effect: 'Haste I', domain: 'Wisdom & Strategy' },
    'Apollo': { emoji: '☀️', color: 'Gold', effect: 'Regeneration I', domain: 'Sun & Music' },
    'Artemis': { emoji: '🏹', color: 'White', effect: 'Speed I', domain: 'Hunt & Moon' },
    'Ares': { emoji: '⚔️', color: 'Dark Red', effect: 'Strength I', domain: 'War' },
    'Aphrodite': { emoji: '💕', color: 'Pink', effect: 'Regeneration I', domain: 'Love & Beauty' },
    'Hephaestus': { emoji: '🔨', color: 'Red', effect: 'Fire Resistance', domain: 'Forge & Fire' },
    'Hermes': { emoji: '👟', color: 'Green', effect: 'Speed I', domain: 'Travel & Thieves' },
    'Demeter': { emoji: '🌾', color: 'Dark Green', effect: 'Saturation I', domain: 'Agriculture' },
    'Dionysus': { emoji: '🍇', color: 'Purple', effect: 'Saturation I', domain: 'Wine & Festivity' },
    'Hera': { emoji: '👑', color: 'Light Purple', effect: 'Resistance I', domain: 'Marriage & Family' },
    'Hecate': { emoji: '🌙', color: 'Dark Purple', effect: 'Night Vision', domain: 'Magic & Crossroads' },
    'Hypnos': { emoji: '😴', color: 'Gray', effect: 'Night Vision', domain: 'Sleep & Dreams' },
    'Nike': { emoji: '🏆', color: 'Gold', effect: 'Speed I', domain: 'Victory' },
    'Nemesis': { emoji: '⚖️', color: 'Dark Aqua', effect: 'Strength I', domain: 'Revenge & Balance' },
    'Iris': { emoji: '🌈', color: 'Light Blue', effect: 'Speed I', domain: 'Rainbows & Messages' },
    'Tyche': { emoji: '🎲', color: 'Blue', effect: 'Luck', domain: 'Luck & Fortune' }
};

// ══════════════════════════════════════════════════════════════════════════
// API ROUTES
// ══════════════════════════════════════════════════════════════════════════

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: pool ? 'connected' : 'demo mode' });
});

// Get player by Minecraft username
app.get('/api/player/:username', async (req, res) => {
    const { username } = req.params;
    
    // If no database, return demo data
    if (!pool) {
        return res.json(getDemoPlayer(username));
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT p.*, c.name as cabin_name, c.divine_favor as cabin_favor,
             (SELECT COUNT(*) FROM mail WHERE player_id = p.id AND is_read = FALSE) as unread_mail
             FROM players p
             LEFT JOIN cabins c ON p.cabin_id = c.id
             WHERE p.mc_username = ?`,
            [username]
        );
        
        if (rows.length === 0) {
            // Create new player if not found
            const [result] = await pool.execute(
                'INSERT INTO players (mc_username, drachma) VALUES (?, 100)',
                [username]
            );
            
            return res.json({
                success: true,
                isNew: true,
                data: {
                    id: result.insertId,
                    mc_username: username,
                    god_parent: null,
                    drachma: 100,
                    cabin_name: null,
                    divine_favor: 0,
                    unread_mail: 0
                }
            });
        }
        
        const player = rows[0];
        const godInfo = GODS[player.god_parent] || {};
        
        res.json({
            success: true,
            data: {
                ...player,
                god_emoji: godInfo.emoji,
                god_color: godInfo.color,
                god_effect: godInfo.effect,
                god_domain: godInfo.domain
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get player by Discord ID
app.get('/api/player/discord/:discordId', async (req, res) => {
    const { discordId } = req.params;
    
    if (!pool) {
        return res.json(getDemoPlayer('DiscordUser'));
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT p.*, c.name as cabin_name,
             (SELECT COUNT(*) FROM mail WHERE player_id = p.id AND is_read = FALSE) as unread_mail
             FROM players p
             LEFT JOIN cabins c ON p.cabin_id = c.id
             WHERE p.discord_id = ?`,
            [discordId]
        );
        
        if (rows.length === 0) {
            return res.json({ success: false, error: 'Player not found' });
        }
        
        const player = rows[0];
        const godInfo = GODS[player.god_parent] || {};
        
        res.json({
            success: true,
            data: {
                ...player,
                god_emoji: godInfo.emoji,
                god_color: godInfo.color,
                god_effect: godInfo.effect
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Update player god parent (claiming)
app.post('/api/player/:username/claim', async (req, res) => {
    const { username } = req.params;
    const { god } = req.body;
    
    if (!GODS[god]) {
        return res.status(400).json({ success: false, error: 'Invalid god' });
    }
    
    if (!pool) {
        return res.json({ success: true, message: 'Demo mode - claim simulated' });
    }
    
    try {
        await pool.execute(
            'UPDATE players SET god_parent = ? WHERE mc_username = ?',
            [god, username]
        );
        
        // Send claiming mail
        const [player] = await pool.execute(
            'SELECT id FROM players WHERE mc_username = ?',
            [username]
        );
        
        if (player.length > 0) {
            await pool.execute(
                `INSERT INTO mail (player_id, sender, subject, content, mail_type)
                 VALUES (?, ?, ?, ?, 'claiming')`,
                [
                    player[0].id,
                    god,
                    `Welcome, Child of ${god}`,
                    `The Oracle has spoken, and ${god} has claimed you as their child. Welcome to Camp Half-Blood, young demigod. Your journey has just begun.`
                ]
            );
        }
        
        res.json({ success: true, god, ...GODS[god] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get player mail
app.get('/api/player/:username/mail', async (req, res) => {
    const { username } = req.params;
    
    if (!pool) {
        return res.json({
            success: true,
            data: [
                { id: 1, sender: 'System', subject: 'Welcome to Camp!', content: 'Demo mail message.', is_read: false, created_at: new Date() }
            ]
        });
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT m.* FROM mail m
             JOIN players p ON m.player_id = p.id
             WHERE p.mc_username = ?
             ORDER BY m.created_at DESC`,
            [username]
        );
        
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Mark mail as read
app.post('/api/mail/:mailId/read', async (req, res) => {
    const { mailId } = req.params;
    
    if (!pool) {
        return res.json({ success: true });
    }
    
    try {
        await pool.execute('UPDATE mail SET is_read = TRUE WHERE id = ?', [mailId]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get player inventory
app.get('/api/player/:username/inventory', async (req, res) => {
    const { username } = req.params;
    
    if (!pool) {
        return res.json({
            success: true,
            data: [
                { id: 1, item_name: 'Celestial Bronze Sword', item_type: 'weapon', quantity: 1, is_redeemable: true },
                { id: 2, item_name: 'Ambrosia Square', item_type: 'consumable', quantity: 3, is_redeemable: true }
            ]
        });
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT i.* FROM inventory i
             JOIN players p ON i.player_id = p.id
             WHERE p.mc_username = ?`,
            [username]
        );
        
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get/Save character sheet
app.get('/api/player/:username/character', async (req, res) => {
    const { username } = req.params;
    
    if (!pool) {
        return res.json({ success: true, data: null });
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT cs.* FROM character_sheets cs
             JOIN players p ON cs.player_id = p.id
             WHERE p.mc_username = ?`,
            [username]
        );
        
        res.json({ success: true, data: rows[0] || null });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

app.post('/api/player/:username/character', async (req, res) => {
    const { username } = req.params;
    const data = req.body;
    
    if (!pool) {
        return res.json({ success: true, message: 'Demo mode - saved locally only' });
    }
    
    try {
        // Get player ID
        const [player] = await pool.execute(
            'SELECT id FROM players WHERE mc_username = ?',
            [username]
        );
        
        if (player.length === 0) {
            return res.status(404).json({ success: false, error: 'Player not found' });
        }
        
        const playerId = player[0].id;
        
        // Upsert character sheet
        await pool.execute(
            `INSERT INTO character_sheets 
             (player_id, char_name, age, gender, pronouns, personality, likes, dislikes, 
              backstory, weapon, fighting_style, abilities, goals, fears, image_url)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
             char_name = VALUES(char_name), age = VALUES(age), gender = VALUES(gender),
             pronouns = VALUES(pronouns), personality = VALUES(personality), 
             likes = VALUES(likes), dislikes = VALUES(dislikes), backstory = VALUES(backstory),
             weapon = VALUES(weapon), fighting_style = VALUES(fighting_style),
             abilities = VALUES(abilities), goals = VALUES(goals), fears = VALUES(fears),
             image_url = VALUES(image_url)`,
            [playerId, data.name, data.age, data.gender, data.pronouns, data.personality,
             data.likes, data.dislikes, data.backstory, data.weapon, data.style,
             data.abilities, data.goals, data.fears, data.image]
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Character save error:', error);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
    if (!pool) {
        return res.json({
            success: true,
            data: [
                { mc_username: 'DemoPlayer1', drachma: 500, god_parent: 'Zeus' },
                { mc_username: 'DemoPlayer2', drachma: 350, god_parent: 'Athena' },
                { mc_username: 'DemoPlayer3', drachma: 200, god_parent: 'Poseidon' }
            ]
        });
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT mc_username, discord_username, drachma, god_parent 
             FROM players 
             ORDER BY drachma DESC 
             LIMIT 20`
        );
        
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// Get all gods info
app.get('/api/gods', (req, res) => {
    res.json({ success: true, data: GODS });
});

// Demo player generator
function getDemoPlayer(username) {
    const godNames = Object.keys(GODS);
    const randomGod = godNames[Math.floor(Math.random() * godNames.length)];
    const godInfo = GODS[randomGod];
    
    return {
        success: true,
        isDemo: true,
        data: {
            id: 1,
            mc_username: username,
            god_parent: randomGod,
            god_emoji: godInfo.emoji,
            god_color: godInfo.color,
            god_effect: godInfo.effect,
            god_domain: godInfo.domain,
            drachma: Math.floor(Math.random() * 500) + 100,
            cabin_name: Math.random() > 0.5 ? 'Thunder Legion' : null,
            divine_favor: Math.floor(Math.random() * 100),
            unread_mail: Math.floor(Math.random() * 5)
        }
    };
}

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ══════════════════════════════════════════════════════════════════════════
// START SERVER
// ══════════════════════════════════════════════════════════════════════════

async function start() {
    await initDatabase();
    
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║         ⚡ CAMP HALF-BLOOD SERVER ⚡                       ║
╠═══════════════════════════════════════════════════════════╣
║  Server running on port ${PORT}                              ║
║  Database: ${pool ? 'Connected' : 'Demo Mode'}                               ║
║                                                           ║
║  Endpoints:                                               ║
║  • GET  /api/health                                       ║
║  • GET  /api/player/:username                             ║
║  • GET  /api/player/:username/mail                        ║
║  • GET  /api/player/:username/inventory                   ║
║  • GET  /api/player/:username/character                   ║
║  • POST /api/player/:username/character                   ║
║  • POST /api/player/:username/claim                       ║
║  • GET  /api/leaderboard                                  ║
║  • GET  /api/gods                                         ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
}

start();
