// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - BACKEND SERVER (BigInt fix)
// ══════════════════════════════════════════════════════════════════════════

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // FIX: Return big numbers as strings to avoid precision loss
    supportBigNumbers: true,
    bigNumberStrings: true
};

let pool;

async function initDatabase() {
    try {
        pool = mysql.createPool(dbConfig);
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release();
        await createWebTables();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
}

async function createWebTables() {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS web_character_sheets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                discord_id BIGINT UNIQUE,
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
                image_url LONGTEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Web tables ready');
    } catch (error) {
        console.log('Table note:', error.message);
    }
}

const GODS = {
    'Zeus': { emoji: '⚡', color: 'Yellow', effect: 'Jump Boost I', domain: 'Sky & Thunder' },
    'Poseidon': { emoji: '🔱', color: 'Aqua', effect: 'Water Breathing', domain: 'Sea' },
    'Hades': { emoji: '💀', color: 'Dark Gray', effect: 'Resistance I', domain: 'Underworld' },
    'Athena': { emoji: '🦉', color: 'Silver', effect: 'Haste I', domain: 'Wisdom' },
    'Apollo': { emoji: '☀️', color: 'Gold', effect: 'Regeneration I', domain: 'Sun & Music' },
    'Artemis': { emoji: '🏹', color: 'White', effect: 'Speed I', domain: 'Hunt & Moon' },
    'Ares': { emoji: '⚔️', color: 'Dark Red', effect: 'Strength I', domain: 'War' },
    'Aphrodite': { emoji: '💕', color: 'Pink', effect: 'Regeneration I', domain: 'Love' },
    'Hephaestus': { emoji: '🔨', color: 'Red', effect: 'Fire Resistance', domain: 'Forge' },
    'Hermes': { emoji: '👟', color: 'Green', effect: 'Speed I', domain: 'Travel' },
    'Demeter': { emoji: '🌾', color: 'Dark Green', effect: 'Saturation I', domain: 'Agriculture' },
    'Dionysus': { emoji: '🍇', color: 'Purple', effect: 'Saturation I', domain: 'Wine' },
    'Hera': { emoji: '👑', color: 'Light Purple', effect: 'Resistance I', domain: 'Marriage' },
    'Hecate': { emoji: '🌙', color: 'Dark Purple', effect: 'Night Vision', domain: 'Magic' },
    'Hypnos': { emoji: '😴', color: 'Gray', effect: 'Night Vision', domain: 'Sleep' },
    'Nike': { emoji: '🏆', color: 'Gold', effect: 'Speed I', domain: 'Victory' },
    'Nemesis': { emoji: '⚖️', color: 'Dark Aqua', effect: 'Strength I', domain: 'Revenge' },
    'Iris': { emoji: '🌈', color: 'Light Blue', effect: 'Speed I', domain: 'Rainbows' },
    'Tyche': { emoji: '🎲', color: 'Blue', effect: 'Luck', domain: 'Fortune' }
};

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: pool ? 'connected' : 'demo mode' });
});

app.get('/api/gods', (req, res) => {
    res.json({ success: true, data: GODS });
});

// Main player lookup - with BigInt fix
app.get('/api/player/:username', async (req, res) => {
    const username = req.params.username;
    console.log('🔍 Looking up player:', username);
    
    if (!pool) return res.json(getDemoPlayer(username));
    
    try {
        // Get discord_id as string to preserve precision
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id, minecraft_username FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        console.log('📋 minecraft_links result:', JSON.stringify(linkRows));
        
        if (linkRows.length === 0) {
            return res.json({ 
                success: false, 
                error: 'Minecraft account not linked! Use !mclink in Discord first.' 
            });
        }
        
        const discordId = linkRows[0].discord_id; // Now it's a string
        const actualMcUsername = linkRows[0].minecraft_username;
        console.log('✅ Found discord_id:', discordId);
        
        // Use string comparison for the BigInt
        const [playerRows] = await pool.execute(
            'SELECT * FROM players WHERE CAST(user_id AS CHAR) = ?',
            [discordId]
        );
        console.log('📋 players result count:', playerRows.length);
        
        if (playerRows.length === 0) {
            return res.json({ success: false, error: 'Player profile not found in database.' });
        }
        
        console.log('✅ Found player:', playerRows[0].username);
        const player = playerRows[0];
        
        // Get cabin info
        let cabinName = null;
        let cabinFavor = 0;
        if (player.cabin_id) {
            try {
                const [cabinRows] = await pool.execute(
                    'SELECT name, divine_favor FROM cabins WHERE cabin_id = ?',
                    [player.cabin_id]
                );
                if (cabinRows.length > 0) {
                    cabinName = cabinRows[0].name;
                    cabinFavor = cabinRows[0].divine_favor || 0;
                }
            } catch (e) { }
        }
        
        // Get unread mail count
        let unreadMail = 0;
        try {
            const [mailRows] = await pool.execute(
                'SELECT COUNT(*) as count FROM mail WHERE CAST(user_id AS CHAR) = ? AND is_read = 0',
                [discordId]
            );
            unreadMail = mailRows[0].count;
        } catch (e) { }
        
        const godInfo = GODS[player.god_parent] || {};
        
        console.log('✅ Sending successful response');
        res.json({
            success: true,
            data: {
                user_id: player.user_id,
                discord_username: player.username,
                mc_username: actualMcUsername,
                god_parent: player.god_parent,
                god_emoji: godInfo.emoji || '❓',
                god_color: godInfo.color || 'Unknown',
                god_effect: godInfo.effect || 'Unknown',
                god_domain: godInfo.domain || '',
                drachma: player.drachma || 0,
                divine_favor: player.divine_favor || 0,
                cabin_id: player.cabin_id,
                cabin_name: cabinName,
                cabin_divine_favor: cabinFavor,
                unread_mail: unreadMail,
                daily_streak: player.daily_streak || 0,
                blessings: player.blessings || 0,
                quiz_completed: player.quiz_completed || 0,
                created_at: player.created_at
            }
        });
    } catch (error) {
        console.error('❌ Database error:', error);
        res.status(500).json({ success: false, error: 'Database error: ' + error.message });
    }
});

app.get('/api/player/:username/mail', async (req, res) => {
    const username = req.params.username;
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        if (linkRows.length === 0) return res.json({ success: true, data: [] });
        
        const [rows] = await pool.execute(
            'SELECT * FROM mail WHERE CAST(user_id AS CHAR) = ? ORDER BY created_at DESC LIMIT 50',
            [linkRows[0].discord_id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
});

app.post('/api/mail/:mailId/read', async (req, res) => {
    if (!pool) return res.json({ success: true });
    try {
        await pool.execute('UPDATE mail SET is_read = 1 WHERE mail_id = ?', [req.params.mailId]);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
});

app.get('/api/player/:username/inventory', async (req, res) => {
    const username = req.params.username;
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        if (linkRows.length === 0) return res.json({ success: true, data: [] });
        
        const [rows] = await pool.execute(
            'SELECT * FROM inventory WHERE CAST(user_id AS CHAR) = ?',
            [linkRows[0].discord_id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
});

app.get('/api/player/:username/character', async (req, res) => {
    const username = req.params.username;
    if (!pool) return res.json({ success: true, data: null });
    
    try {
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        if (linkRows.length === 0) return res.json({ success: true, data: null });
        
        const [rows] = await pool.execute(
            'SELECT * FROM web_character_sheets WHERE CAST(discord_id AS CHAR) = ?',
            [linkRows[0].discord_id]
        );
        res.json({ success: true, data: rows[0] || null });
    } catch (error) {
        res.json({ success: true, data: null });
    }
});

app.post('/api/player/:username/character', async (req, res) => {
    const username = req.params.username;
    const data = req.body;
    if (!pool) return res.json({ success: true });
    
    try {
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        if (linkRows.length === 0) return res.status(404).json({ success: false, error: 'Not linked' });
        
        await pool.execute(`
            INSERT INTO web_character_sheets 
            (discord_id, char_name, age, gender, pronouns, personality, likes, dislikes, 
             backstory, weapon, fighting_style, abilities, goals, fears, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            char_name = VALUES(char_name), age = VALUES(age), gender = VALUES(gender),
            pronouns = VALUES(pronouns), personality = VALUES(personality), 
            likes = VALUES(likes), dislikes = VALUES(dislikes), backstory = VALUES(backstory),
            weapon = VALUES(weapon), fighting_style = VALUES(fighting_style),
            abilities = VALUES(abilities), goals = VALUES(goals), fears = VALUES(fears),
            image_url = VALUES(image_url)`,
            [linkRows[0].discord_id, data.name, data.age, data.gender, data.pronouns, 
             data.personality, data.likes, data.dislikes, data.backstory, data.weapon, 
             data.style, data.abilities, data.goals, data.fears, data.image]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const [rows] = await pool.execute(`
            SELECT p.username, p.drachma, p.god_parent, ml.minecraft_username as mc_username
            FROM players p
            LEFT JOIN minecraft_links ml ON CAST(p.user_id AS CHAR) = CAST(ml.discord_id AS CHAR)
            WHERE p.is_active = 1
            ORDER BY p.drachma DESC LIMIT 20
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
});

function getDemoPlayer(username) {
    const godNames = Object.keys(GODS);
    const randomGod = godNames[Math.floor(Math.random() * godNames.length)];
    const godInfo = GODS[randomGod];
    return {
        success: true, isDemo: true,
        data: {
            mc_username: username, god_parent: randomGod,
            god_emoji: godInfo.emoji, god_color: godInfo.color,
            god_effect: godInfo.effect, god_domain: godInfo.domain,
            drachma: Math.floor(Math.random() * 500) + 100,
            cabin_name: null, divine_favor: 0, unread_mail: 0
        }
    };
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function start() {
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`⚡ Camp Half-Blood Server running on port ${PORT}`);
        console.log(`Database: ${pool ? 'Connected' : 'Demo Mode'}`);
    });
}

start();
