// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - BACKEND SERVER (v4 - Full Mail System)
// ══════════════════════════════════════════════════════════════════════════

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
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
                discord_id VARCHAR(20) UNIQUE,
                mc_username VARCHAR(50),
                char_name VARCHAR(100),
                age VARCHAR(10),
                gender VARCHAR(50),
                pronouns VARCHAR(50),
                god_parent VARCHAR(50),
                personality TEXT,
                likes TEXT,
                dislikes TEXT,
                backstory TEXT,
                weapon VARCHAR(100),
                fighting_style VARCHAR(100),
                abilities TEXT,
                goals TEXT,
                fears TEXT,
                image_url_1 TEXT,
                image_url_2 TEXT,
                image_url_3 TEXT,
                is_public TINYINT DEFAULT 1,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

// Helper: Get system sender name based on mail type
function getSystemSenderName(mailType) {
    const senderNames = {
        'god_claiming': '🏛️ The Olympians',
        'divine': '⚡ Divine Message',
        'system': '⚙️ Camp System',
        'reward': '🎁 Camp Rewards',
        'daily_reward': '🎁 Daily Bonus',
        'cabin_invite': '🏕️ Cabin Council',
        'shop_order': '🛒 Camp Store',
        'delivery_request': '📦 Delivery Service',
        'delivery_complete': '✅ Delivery Complete',
        'event': '🏆 Camp Events',
        'quest_complete': '📜 Quest Board'
    };
    return senderNames[mailType] || '📬 Camp Half-Blood';
}

// Helper: Get discord_id from MC username
async function getDiscordIdFromUsername(username) {
    if (!pool) return null;
    try {
        const [rows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        return rows.length > 0 ? rows[0].discord_id : null;
    } catch (e) {
        console.error('Error getting discord_id:', e);
        return null;
    }
}

// Helper: Get username from discord_id
async function getUsernameFromDiscordId(discordId) {
    if (!pool || !discordId) return 'Unknown';
    try {
        const [rows] = await pool.execute(
            'SELECT username FROM players WHERE CAST(user_id AS CHAR) = ?',
            [discordId]
        );
        return rows.length > 0 ? rows[0].username : 'Unknown';
    } catch (e) {
        return 'Unknown';
    }
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: pool ? 'connected' : 'demo mode' });
});

app.get('/api/gods', (req, res) => {
    res.json({ success: true, data: GODS });
});

// ══════════════════════════════════════════════════════════════════════════
// PLAYER ENDPOINTS
// ══════════════════════════════════════════════════════════════════════════

app.get('/api/player/:username', async (req, res) => {
    const username = req.params.username;
    console.log('🔍 Looking up player:', username);
    
    if (!pool) return res.json(getDemoPlayer(username));
    
    try {
        const [linkRows] = await pool.execute(
            'SELECT CAST(discord_id AS CHAR) as discord_id, minecraft_username FROM minecraft_links WHERE LOWER(minecraft_username) = LOWER(?)',
            [username]
        );
        
        if (linkRows.length === 0) {
            return res.json({ 
                success: false, 
                error: 'Minecraft account not linked! Use !mclink in Discord first.' 
            });
        }
        
        const discordId = linkRows[0].discord_id;
        const actualMcUsername = linkRows[0].minecraft_username;
        
        const [playerRows] = await pool.execute(
            'SELECT * FROM players WHERE CAST(user_id AS CHAR) = ?',
            [discordId]
        );
        
        if (playerRows.length === 0) {
            return res.json({ success: false, error: 'Player profile not found in database.' });
        }
        
        const player = playerRows[0];
        
        let cabinName = null;
        let cabinFavor = 0;
        if (player.cabin_id) {
            try {
                const [cabinRows] = await pool.execute(
                    'SELECT cabin_name, divine_favor FROM cabins WHERE cabin_id = ?',
                    [player.cabin_id]
                );
                if (cabinRows.length > 0) {
                    cabinName = cabinRows[0].cabin_name;
                    cabinFavor = cabinRows[0].divine_favor || 0;
                }
            } catch (e) {}
        }
        
        let unreadMail = 0;
        try {
            const [mailRows] = await pool.execute(
                'SELECT COUNT(*) as count FROM mail WHERE CAST(recipient_id AS CHAR) = ? AND is_read = 0',
                [discordId]
            );
            unreadMail = mailRows[0].count;
        } catch (e) {}
        
        const godInfo = GODS[player.god_parent] || {};
        
        res.json({
            success: true,
            data: {
                user_id: player.user_id,
                discord_id: discordId,
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

// ══════════════════════════════════════════════════════════════════════════
// MAIL ENDPOINTS - FULL CRUD
// ══════════════════════════════════════════════════════════════════════════

// Get all mail for a player
app.get('/api/player/:username/mail', async (req, res) => {
    const username = req.params.username;
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) return res.json({ success: true, data: [] });
        
        const [rows] = await pool.execute(`
            SELECT 
                m.mail_id,
                m.sender_id,
                m.recipient_id,
                m.subject,
                m.content,
                m.mail_type,
                m.action_data,
                m.is_read,
                m.created_at,
                m.read_at,
                m.priority,
                p.username as sender_name
            FROM mail m
            LEFT JOIN players p ON CAST(m.sender_id AS CHAR) = CAST(p.user_id AS CHAR)
            WHERE CAST(m.recipient_id AS CHAR) = ?
            ORDER BY m.created_at DESC 
            LIMIT 100
        `, [discordId]);
        
        // Format sender names for system mail
        const formattedMail = rows.map(mail => ({
            ...mail,
            sender_name: !mail.sender_id || mail.sender_id == 0 
                ? getSystemSenderName(mail.mail_type) 
                : (mail.sender_name || 'Unknown Player')
        }));
        
        res.json({ success: true, data: formattedMail });
    } catch (error) {
        console.error('Mail fetch error:', error);
        res.json({ success: true, data: [] });
    }
});

// Get single mail by ID
app.get('/api/mail/:mailId', async (req, res) => {
    const { mailId } = req.params;
    if (!pool) return res.json({ success: false, error: 'Database not connected' });
    
    try {
        const [rows] = await pool.execute(`
            SELECT 
                m.*,
                p.username as sender_name
            FROM mail m
            LEFT JOIN players p ON CAST(m.sender_id AS CHAR) = CAST(p.user_id AS CHAR)
            WHERE m.mail_id = ?
        `, [mailId]);
        
        if (rows.length === 0) {
            return res.json({ success: false, error: 'Mail not found' });
        }
        
        const mail = rows[0];
        mail.sender_name = !mail.sender_id || mail.sender_id == 0 
            ? getSystemSenderName(mail.mail_type) 
            : (mail.sender_name || 'Unknown Player');
        
        res.json({ success: true, data: mail });
    } catch (error) {
        console.error('Single mail fetch error:', error);
        res.json({ success: false, error: 'Database error' });
    }
});

// Mark mail as read
app.post('/api/mail/:mailId/read', async (req, res) => {
    if (!pool) return res.json({ success: true });
    
    try {
        await pool.execute(
            'UPDATE mail SET is_read = 1, read_at = NOW() WHERE mail_id = ?', 
            [req.params.mailId]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Mark read error:', error);
        res.json({ success: false, error: 'Database error' });
    }
});

// Delete single mail
app.delete('/api/mail/:mailId', async (req, res) => {
    const { mailId } = req.params;
    const { username } = req.query; // For verification
    
    if (!pool) return res.json({ success: false, error: 'Database not connected' });
    
    try {
        // Verify ownership if username provided
        if (username) {
            const discordId = await getDiscordIdFromUsername(username);
            if (discordId) {
                const [check] = await pool.execute(
                    'SELECT mail_id FROM mail WHERE mail_id = ? AND CAST(recipient_id AS CHAR) = ?',
                    [mailId, discordId]
                );
                if (check.length === 0) {
                    return res.json({ success: false, error: 'Mail not found or not yours' });
                }
            }
        }
        
        await pool.execute('DELETE FROM mail WHERE mail_id = ?', [mailId]);
        console.log('🗑️ Deleted mail:', mailId);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete mail error:', error);
        res.json({ success: false, error: 'Database error' });
    }
});

// Delete all read mail for a player
app.delete('/api/player/:username/mail/read', async (req, res) => {
    const { username } = req.params;
    if (!pool) return res.json({ success: false, error: 'Database not connected' });
    
    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) {
            return res.json({ success: false, error: 'Player not found' });
        }
        
        const [result] = await pool.execute(
            'DELETE FROM mail WHERE CAST(recipient_id AS CHAR) = ? AND is_read = 1',
            [discordId]
        );
        
        console.log('🗑️ Deleted', result.affectedRows, 'read messages for', username);
        res.json({ success: true, deleted: result.affectedRows });
    } catch (error) {
        console.error('Delete read mail error:', error);
        res.json({ success: false, error: 'Database error' });
    }
});

// Send mail
app.post('/api/player/:username/mail/send', async (req, res) => {
    const senderUsername = req.params.username;
    const { recipientUsername, subject, content } = req.body;
    
    console.log('📬 Send mail request:', { from: senderUsername, to: recipientUsername, subject });
    
    if (!pool) return res.json({ success: false, error: 'Database not connected' });
    
    if (!recipientUsername || !subject || !content) {
        return res.json({ success: false, error: 'Missing required fields' });
    }
    
    try {
        // Get sender's discord ID
        const senderId = await getDiscordIdFromUsername(senderUsername);
        if (!senderId) {
            return res.json({ success: false, error: 'Sender not found' });
        }
        
        // Get recipient's discord ID - try MC username first, then Discord username
        let recipientId = await getDiscordIdFromUsername(recipientUsername);
        
        // If not found by MC username, try by Discord username
        if (!recipientId) {
            const [playerRows] = await pool.execute(
                'SELECT CAST(user_id AS CHAR) as user_id FROM players WHERE LOWER(username) = LOWER(?)',
                [recipientUsername]
            );
            if (playerRows.length > 0) {
                recipientId = playerRows[0].user_id;
            }
        }
        
        if (!recipientId) {
            return res.json({ success: false, error: 'Recipient not found' });
        }
        
        // Don't allow sending to yourself
        if (senderId === recipientId) {
            return res.json({ success: false, error: 'Cannot send mail to yourself' });
        }
        
        // Insert the mail
        const [result] = await pool.execute(`
            INSERT INTO mail (recipient_id, sender_id, mail_type, subject, content, is_read, created_at)
            VALUES (?, ?, 'personal', ?, ?, 0, NOW())
        `, [recipientId, senderId, subject.substring(0, 100), content.substring(0, 2000)]);
        
        console.log('✅ Mail sent! ID:', result.insertId);
        res.json({ success: true, mailId: result.insertId });
    } catch (error) {
        console.error('Send mail error:', error);
        res.json({ success: false, error: 'Database error: ' + error.message });
    }
});

// Get list of players for recipient dropdown
app.get('/api/players', async (req, res) => {
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const [rows] = await pool.execute(`
            SELECT 
                p.username,
                p.god_parent,
                ml.minecraft_username as mc_username
            FROM players p
            LEFT JOIN minecraft_links ml ON CAST(p.user_id AS CHAR) = CAST(ml.discord_id AS CHAR)
            WHERE p.is_active = 1
            ORDER BY p.username ASC
            LIMIT 100
        `);
        
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Players list error:', error);
        res.json({ success: true, data: [] });
    }
});

// ══════════════════════════════════════════════════════════════════════════
// INVENTORY ENDPOINTS
// ══════════════════════════════════════════════════════════════════════════

app.get('/api/player/:username/inventory', async (req, res) => {
    const username = req.params.username;
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) return res.json({ success: true, data: [] });
        
        const [rows] = await pool.execute(
            'SELECT * FROM inventory WHERE CAST(user_id AS CHAR) = ?',
            [discordId]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.json({ success: true, data: [] });
    }
});

// ══════════════════════════════════════════════════════════════════════════
// CHARACTER SHEETS
// ══════════════════════════════════════════════════════════════════════════

app.get('/api/player/:username/character', async (req, res) => {
    const username = req.params.username;
    console.log('📋 Getting character sheet for:', username);
    if (!pool) return res.json({ success: true, data: null });
    
    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) return res.json({ success: true, data: null });
        
        const [rows] = await pool.execute(
            'SELECT * FROM web_character_sheets WHERE discord_id = ?',
            [discordId]
        );
        console.log('📋 Character sheet found:', rows.length > 0);
        res.json({ success: true, data: rows[0] || null });
    } catch (error) {
        console.log('Character fetch error:', error.message);
        res.json({ success: true, data: null });
    }
});

app.get('/api/characters', async (req, res) => {
    if (!pool) return res.json({ success: true, data: [] });
    
    try {
        const [rows] = await pool.execute(`
            SELECT 
                wcs.id,
                wcs.discord_id,
                wcs.mc_username,
                wcs.char_name,
                wcs.god_parent,
                wcs.image_url_1,
                wcs.updated_at
            FROM web_character_sheets wcs
            WHERE wcs.is_public = 1 AND wcs.char_name IS NOT NULL AND wcs.char_name != ''
            ORDER BY wcs.updated_at DESC
            LIMIT 50
        `);
        
        console.log('📋 Found', rows.length, 'public character sheets');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.log('Characters list error:', error.message);
        res.json({ success: true, data: [] });
    }
});

app.get('/api/character/:id', async (req, res) => {
    const { id } = req.params;
    if (!pool) return res.json({ success: true, data: null });
    
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM web_character_sheets WHERE id = ? AND is_public = 1',
            [id]
        );
        
        if (rows.length === 0) {
            return res.json({ success: false, error: 'Character not found or is private' });
        }
        
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.log('Character view error:', error.message);
        res.json({ success: false, error: 'Could not load character' });
    }
});

app.post('/api/player/:username/character', async (req, res) => {
    const username = req.params.username;
    const data = req.body;
    console.log('💾 Saving character sheet for:', username);
    
    if (!pool) return res.json({ success: true });
    
    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) {
            return res.status(404).json({ success: false, error: 'Account not linked' });
        }
        
        let godParent = null;
        try {
            const [playerRows] = await pool.execute(
                'SELECT god_parent FROM players WHERE CAST(user_id AS CHAR) = ?',
                [discordId]
            );
            if (playerRows.length > 0) {
                godParent = playerRows[0].god_parent;
            }
        } catch (e) {}
        
        const processImage = (img) => {
            if (!img) return null;
            if (img.startsWith('data:') && img.length > 500000) {
                console.log('⚠️ Image too large, skipping');
                return null;
            }
            return img;
        };
        
        const image1 = processImage(data.image1);
        const image2 = processImage(data.image2);
        const image3 = processImage(data.image3);
        
        const [existing] = await pool.execute(
            'SELECT id FROM web_character_sheets WHERE discord_id = ?',
            [discordId]
        );
        
        if (existing.length > 0) {
            console.log('💾 Updating existing character sheet');
            await pool.execute(`
                UPDATE web_character_sheets SET
                    mc_username = ?, char_name = ?, age = ?, gender = ?, pronouns = ?,
                    god_parent = ?, personality = ?, likes = ?, dislikes = ?, backstory = ?,
                    weapon = ?, fighting_style = ?, abilities = ?, goals = ?, fears = ?,
                    image_url_1 = ?, image_url_2 = ?, image_url_3 = ?, is_public = ?
                WHERE discord_id = ?`,
                [username, data.name || null, data.age || null, data.gender || null, 
                 data.pronouns || null, godParent, data.personality || null, data.likes || null,
                 data.dislikes || null, data.backstory || null, data.weapon || null,
                 data.style || null, data.abilities || null, data.goals || null, data.fears || null,
                 image1, image2, image3, data.isPublic !== false ? 1 : 0, discordId]
            );
        } else {
            console.log('💾 Creating new character sheet');
            await pool.execute(`
                INSERT INTO web_character_sheets 
                (discord_id, mc_username, char_name, age, gender, pronouns, god_parent,
                 personality, likes, dislikes, backstory, weapon, fighting_style, 
                 abilities, goals, fears, image_url_1, image_url_2, image_url_3, is_public)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [discordId, username, data.name || null, data.age || null, data.gender || null,
                 data.pronouns || null, godParent, data.personality || null, data.likes || null,
                 data.dislikes || null, data.backstory || null, data.weapon || null,
                 data.style || null, data.abilities || null, data.goals || null, data.fears || null,
                 image1, image2, image3, data.isPublic !== false ? 1 : 0]
            );
        }
        
        console.log('✅ Character sheet saved successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('❌ Character save error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ══════════════════════════════════════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════════════════════════════════════

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
