// ══════════════════════════════════════════════════════════════════════════
// CAMP HALF-BLOOD - BACKEND SERVER (v4 - Full Mail System + Announcements)
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
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS server_info (
                id INT PRIMARY KEY DEFAULT 1,
                ip VARCHAR(100),
                version VARCHAR(50),
                whitelist VARCHAR(500),
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
// ANNOUNCEMENTS & FILES SYSTEM
// ══════════════════════════════════════════════════════════════════════════

// Configuration
const ANNOUNCEMENT_ADMIN_USERS = ['lizzzerd', 'ussdylan'];
const DISCORD_ANNOUNCEMENTS_WEBHOOK = process.env.DISCORD_ANNOUNCEMENTS_WEBHOOK || null;
const DISCORD_ANNOUNCEMENTS_CHANNEL = '1454707501282103427';
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || null;

// Helper: Check if user is announcement admin
function isAnnouncementAdmin(username) {
    if (!username) return false;
    return ANNOUNCEMENT_ADMIN_USERS.includes(username.toLowerCase());
}

// Helper: Get author avatar emoji
function getAuthorAvatar(author) {
    const avatars = {
        'lizzzerd': '⚡',
        'ussdylan': '🔱'
    };
    return avatars[(author || '').toLowerCase()] || '👤';
}

// Helper: Post to Discord webhook or bot channel
async function postAnnouncementToDiscord(title, content, notes, author, announcementId) {
    const embed = {
        title: `📢 ${title}`,
        description: content.length > 2000 ? content.substring(0, 1997) + '...' : content,
        color: 0xD4AF37,
        author: { name: author },
        footer: { text: `Camp Half-Blood Announcements • #${announcementId}` },
        timestamp: new Date().toISOString()
    };
    
    if (notes) {
        embed.fields = [{
            name: '📝 Additional Notes',
            value: notes.length > 1000 ? notes.substring(0, 997) + '...' : notes,
            inline: false
        }];
    }

    // Try webhook first
    if (DISCORD_ANNOUNCEMENTS_WEBHOOK) {
        try {
            const response = await fetch(DISCORD_ANNOUNCEMENTS_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'Camp Half-Blood', embeds: [embed] })
            });
            if (response.ok) {
                console.log('[Announcements] Posted to Discord via webhook');
                return;
            }
            console.error('[Announcements] Webhook failed:', response.status);
        } catch (error) {
            console.error('[Announcements] Webhook error:', error);
        }
    }

    // Fallback: bot token + channel ID
    if (DISCORD_BOT_TOKEN && DISCORD_ANNOUNCEMENTS_CHANNEL) {
        try {
            const response = await fetch(`https://discord.com/api/v10/channels/${DISCORD_ANNOUNCEMENTS_CHANNEL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
                },
                body: JSON.stringify({ embeds: [embed] })
            });
            if (response.ok) {
                console.log('[Announcements] Posted to Discord via bot');
                return;
            }
            console.error('[Announcements] Bot post failed:', response.status);
        } catch (error) {
            console.error('[Announcements] Bot post error:', error);
        }
    }

    console.log('[Announcements] No Discord delivery method configured');
}

// Get all announcements
app.get('/api/announcements', async (req, res) => {
    if (!pool) return res.json({ announcements: [] });
    
    try {
        const [announcements] = await pool.execute(`
            SELECT * FROM announcements 
            ORDER BY is_pinned DESC, created_at DESC
        `);
        res.json({ announcements });
    } catch (error) {
        console.error('[Announcements] Get error:', error);
        res.status(500).json({ error: 'Failed to fetch announcements' });
    }
});

// Get single announcement
app.get('/api/announcements/:id', async (req, res) => {
    if (!pool) return res.status(404).json({ error: 'Database not connected' });
    
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM announcements WHERE id = ?',
            [req.params.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        
        res.json({ announcement: rows[0] });
    } catch (error) {
        console.error('[Announcements] Get single error:', error);
        res.status(500).json({ error: 'Failed to fetch announcement' });
    }
});

// Create announcement (Admin only - pass username in body)
app.post('/api/announcements', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { title, content, notes, is_pinned, post_to_discord, username } = req.body;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        
        // Check pin limit
        if (is_pinned) {
            const [pinned] = await pool.execute(
                'SELECT COUNT(*) as count FROM announcements WHERE is_pinned = 1'
            );
            if (pinned[0].count >= 4) {
                return res.status(400).json({ error: 'Maximum 4 pinned announcements allowed' });
            }
        }
        
        const author = username;
        const authorAvatar = getAuthorAvatar(author);
        
        const [result] = await pool.execute(`
            INSERT INTO announcements (title, content, notes, author, author_avatar, is_pinned, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, [title, content, notes || null, author, authorAvatar, is_pinned ? 1 : 0]);
        
        const announcementId = result.insertId;
        
        // Post to Discord if requested
        if (post_to_discord) {
            await postAnnouncementToDiscord(title, content, notes, author, announcementId);
        }
        
        console.log('[Announcements] Created:', announcementId, 'by', author);
        res.json({ success: true, id: announcementId, message: 'Announcement posted successfully' });
    } catch (error) {
        console.error('[Announcements] Create error:', error);
        res.status(500).json({ error: 'Failed to create announcement' });
    }
});

// Update announcement pin status (Admin only)
app.put('/api/announcements/:id/pin', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { is_pinned, username } = req.body;
        const announcementId = req.params.id;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        // Check pin limit
        if (is_pinned) {
            const [pinned] = await pool.execute(
                'SELECT COUNT(*) as count FROM announcements WHERE is_pinned = 1 AND id != ?',
                [announcementId]
            );
            if (pinned[0].count >= 4) {
                return res.status(400).json({ error: 'Maximum 4 pinned announcements allowed' });
            }
        }
        
        await pool.execute(
            'UPDATE announcements SET is_pinned = ? WHERE id = ?',
            [is_pinned ? 1 : 0, announcementId]
        );
        
        res.json({ success: true, message: is_pinned ? 'Announcement pinned' : 'Announcement unpinned' });
    } catch (error) {
        console.error('[Announcements] Pin error:', error);
        res.status(500).json({ error: 'Failed to update pin status' });
    }
});

// Delete announcement (Admin only)
app.delete('/api/announcements/:id', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { username } = req.query;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        await pool.execute('DELETE FROM announcements WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Announcement deleted' });
    } catch (error) {
        console.error('[Announcements] Delete error:', error);
        res.status(500).json({ error: 'Failed to delete announcement' });
    }
});

// Get all files
app.get('/api/files', async (req, res) => {
    if (!pool) return res.json({ files: [] });
    
    try {
        const [files] = await pool.execute(`
            SELECT * FROM download_files 
            ORDER BY created_at DESC
        `);
        res.json({ files });
    } catch (error) {
        console.error('[Files] Get error:', error);
        res.status(500).json({ error: 'Failed to fetch files' });
    }
});

// Add file (Admin only)
app.post('/api/files', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { title, category, description, url, size, username } = req.body;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        if (!title || !url) {
            return res.status(400).json({ error: 'Title and URL are required' });
        }
        
        // Validate URL
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: 'Invalid URL format' });
        }
        
        const validCategories = ['resourcepack', 'modpack', 'guide', 'other'];
        const fileCategory = validCategories.includes(category) ? category : 'other';
        
        const [result] = await pool.execute(`
            INSERT INTO download_files (title, category, description, url, size, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `, [title, fileCategory, description || null, url, size || null]);
        
        console.log('[Files] Added:', result.insertId);
        res.json({ success: true, id: result.insertId, message: 'File added successfully' });
    } catch (error) {
        console.error('[Files] Create error:', error);
        res.status(500).json({ error: 'Failed to add file' });
    }
});

// Delete file (Admin only)
app.delete('/api/files/:id', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { username } = req.query;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        await pool.execute('DELETE FROM download_files WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'File deleted' });
    } catch (error) {
        console.error('[Files] Delete error:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Get current user info (for admin check on frontend)
app.get('/api/auth/me', async (req, res) => {
    const { username } = req.query;
    
    if (!username) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    
    res.json({
        username: username,
        isAdmin: isAnnouncementAdmin(username)
    });
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

// ══════════════════════════════════════════════════════════════════════════
// SERVER INFO (shown on bulletin)
// ══════════════════════════════════════════════════════════════════════════

app.get('/api/server-info', async (req, res) => {
    if (!pool) return res.json({ ip: '', version: '', whitelist: '' });
    
    try {
        const [rows] = await pool.execute('SELECT * FROM server_info WHERE id = 1');
        if (rows.length === 0) {
            return res.json({ ip: '', version: '', whitelist: '' });
        }
        res.json({
            ip: rows[0].ip || '',
            version: rows[0].version || '',
            whitelist: rows[0].whitelist || ''
        });
    } catch (error) {
        console.error('[ServerInfo] Get error:', error.message);
        res.json({ ip: '', version: '', whitelist: '' });
    }
});

app.put('/api/server-info', async (req, res) => {
    if (!pool) return res.status(500).json({ error: 'Database not connected' });
    
    try {
        const { ip, version, whitelist, username } = req.body;
        
        if (!isAnnouncementAdmin(username)) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        // Upsert: insert or update the single row
        await pool.execute(`
            INSERT INTO server_info (id, ip, version, whitelist)
            VALUES (1, ?, ?, ?)
            ON DUPLICATE KEY UPDATE ip = ?, version = ?, whitelist = ?
        `, [ip || '', version || '', whitelist || '', ip || '', version || '', whitelist || '']);
        
        console.log('[ServerInfo] Updated by', username);
        res.json({ success: true });
    } catch (error) {
        console.error('[ServerInfo] Update error:', error);
        res.status(500).json({ error: 'Failed to save server info' });
    }
});

// ══════════════════════════════════════════════════════════════════════════
// TIMELINE API
// ══════════════════════════════════════════════════════════════════════════

const TIMELINE_ADMIN_IDS = ['667478723213262848', '788852381726015489'];
const DISCORD_TIMELINE_WEBHOOK = process.env.DISCORD_TIMELINE_WEBHOOK || null;
const DISCORD_TIMELINE_CHANNEL = process.env.DISCORD_TIMELINE_CHANNEL || null;

// Category display helpers for Discord embeds
const TIMELINE_CAT_META = {
    event:        { emoji: '🏆', color: 0xD4AF37 },
    battle:       { emoji: '⚔️', color: 0xC0392B },
    quest:        { emoji: '🗺️', color: 0x27AE60 },
    lore:         { emoji: '📜', color: 0x8E44AD },
    update:       { emoji: '📡', color: 0x3498DB },
    ceremony:     { emoji: '🌟', color: 0xF39C12 },
    announcement: { emoji: '📯', color: 0xE91E63 }
};

// Helper: Post timeline change to Discord
async function postTimelineToDiscord(action, entry, username) {
    const catInfo = TIMELINE_CAT_META[(entry.category || '').toLowerCase()] || { emoji: '📌', color: 0xD4AF37 };

    const actionLabels = {
        created: { title: '📜 New Chronicle Entry', verb: 'added' },
        updated: { title: '✏️ Chronicle Entry Updated', verb: 'updated' },
        deleted: { title: '🗑️ Chronicle Entry Removed', verb: 'removed' }
    };
    const info = actionLabels[action] || actionLabels.created;

    const embed = {
        title: info.title,
        color: action === 'deleted' ? 0x95A5A6 : catInfo.color,
        fields: [
            { name: 'Title', value: entry.subject || 'Untitled', inline: true },
            { name: 'Category', value: `${catInfo.emoji} ${(entry.category || 'event').charAt(0).toUpperCase() + (entry.category || 'event').slice(1)}`, inline: true },
            { name: 'Date', value: entry.event_date || 'Unknown', inline: true }
        ],
        footer: { text: `${info.verb} by ${username} via Camp Website` },
        timestamp: new Date().toISOString()
    };

    if (entry.description && action !== 'deleted') {
        const desc = entry.description.length > 300 ? entry.description.substring(0, 297) + '...' : entry.description;
        embed.description = desc;
    }

    // Try webhook first
    if (DISCORD_TIMELINE_WEBHOOK) {
        try {
            const response = await fetch(DISCORD_TIMELINE_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: 'Camp Chronicle', embeds: [embed] })
            });
            if (response.ok) {
                console.log(`[Timeline] Discord webhook: ${action} entry`);
                return;
            }
            console.error('[Timeline] Webhook failed:', response.status);
        } catch (error) {
            console.error('[Timeline] Webhook error:', error.message);
        }
    }

    // Fallback: bot token + channel ID
    if (DISCORD_BOT_TOKEN && DISCORD_TIMELINE_CHANNEL) {
        try {
            const response = await fetch(`https://discord.com/api/v10/channels/${DISCORD_TIMELINE_CHANNEL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
                },
                body: JSON.stringify({ embeds: [embed] })
            });
            if (response.ok) {
                console.log(`[Timeline] Discord bot: ${action} entry`);
                return;
            }
            console.error('[Timeline] Bot post failed:', response.status);
        } catch (error) {
            console.error('[Timeline] Bot post error:', error.message);
        }
    }
}

// PUBLIC: Get timeline entries
app.get('/api/public/timeline', async (req, res) => {
    if (!pool) return res.json({ success: true, data: [] });

    try {
        const category = req.query.category;
        const limit = Math.min(parseInt(req.query.limit) || 100, 200);
        let query, params;

        if (category && category.toLowerCase() !== 'all') {
            query = `
                SELECT te.*, p.username
                FROM timeline_entries te
                LEFT JOIN players p ON CAST(te.user_id AS CHAR) = CAST(p.user_id AS CHAR)
                WHERE te.category = ?
                ORDER BY te.event_date DESC, te.entry_id DESC
                LIMIT ?
            `;
            params = [category, limit];
        } else {
            query = `
                SELECT te.*, p.username
                FROM timeline_entries te
                LEFT JOIN players p ON CAST(te.user_id AS CHAR) = CAST(p.user_id AS CHAR)
                ORDER BY te.event_date DESC, te.entry_id DESC
                LIMIT ?
            `;
            params = [limit];
        }

        const [rows] = await pool.execute(query, params);

        const entries = rows.map(row => ({
            entry_id: row.entry_id,
            user_id: row.user_id,
            event_date: row.event_date,
            subject: row.subject,
            title: row.subject,
            description: row.description,
            content: row.description,
            category: row.category,
            created_at: row.created_at,
            username: row.username,
            author_name: row.username
        }));

        res.json({ success: true, data: entries });
    } catch (err) {
        console.error('[Timeline] GET error:', err.message);
        res.json({ success: true, data: [] });
    }
});

// PUBLIC: Get timeline categories
app.get('/api/public/timeline/categories', async (req, res) => {
    if (!pool) return res.json({ success: true, data: [] });

    try {
        const [rows] = await pool.execute(
            `SELECT DISTINCT category FROM timeline_entries
             WHERE category IS NOT NULL
             ORDER BY category`
        );
        const cats = rows.map(r => r.category).filter(Boolean);
        res.json({ success: true, data: cats });
    } catch (err) {
        console.error('[Timeline] Categories error:', err.message);
        res.json({ success: true, data: [] });
    }
});

// AUTH: Create timeline entry
app.post('/api/timeline', async (req, res) => {
    if (!pool) return res.status(500).json({ success: false, error: 'Database not connected' });

    const { subject, event_date, category, description, username } = req.body;

    if (!username) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    if (!subject || !subject.trim()) {
        return res.json({ success: false, error: 'Title is required' });
    }
    if (!event_date) {
        return res.json({ success: false, error: 'Date is required' });
    }

    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) {
            return res.json({ success: false, error: 'Player not found' });
        }

        const cleanSubject = subject.trim();
        const cleanDesc = (description || '').trim();
        const cleanCat = (category || 'event').toLowerCase();

        const [result] = await pool.execute(
            `INSERT INTO timeline_entries (user_id, event_date, subject, description, category, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [discordId, event_date, cleanSubject, cleanDesc, cleanCat]
        );

        console.log(`[Timeline] Created entry #${result.insertId} by ${username}`);

        // Notify Discord
        postTimelineToDiscord('created', {
            subject: cleanSubject, event_date, category: cleanCat, description: cleanDesc
        }, username).catch(e => console.error('[Timeline] Discord notify error:', e.message));

        res.json({ success: true, entry_id: result.insertId });
    } catch (err) {
        console.error('[Timeline] Create error:', err.message);
        res.json({ success: false, error: 'Failed to create entry' });
    }
});

// AUTH: Update timeline entry
app.put('/api/timeline/:id', async (req, res) => {
    if (!pool) return res.status(500).json({ success: false, error: 'Database not connected' });

    const entryId = parseInt(req.params.id);
    const { subject, event_date, category, description, username } = req.body;

    if (!username) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) {
            return res.json({ success: false, error: 'Player not found' });
        }

        const isAdmin = TIMELINE_ADMIN_IDS.includes(discordId);

        const [entries] = await pool.execute(
            'SELECT CAST(user_id AS CHAR) as user_id, subject, event_date, category FROM timeline_entries WHERE entry_id = ?',
            [entryId]
        );

        if (entries.length === 0) {
            return res.json({ success: false, error: 'Entry not found' });
        }

        if (entries[0].user_id !== discordId && !isAdmin) {
            return res.json({ success: false, error: 'Permission denied' });
        }

        const updates = [];
        const values = [];

        if (subject && subject.trim()) { updates.push('subject = ?'); values.push(subject.trim()); }
        if (event_date) { updates.push('event_date = ?'); values.push(event_date); }
        if (category) { updates.push('category = ?'); values.push(category.toLowerCase()); }
        if (description !== undefined) { updates.push('description = ?'); values.push((description || '').trim()); }

        if (updates.length === 0) {
            return res.json({ success: false, error: 'Nothing to update' });
        }

        values.push(entryId);

        await pool.execute(
            `UPDATE timeline_entries SET ${updates.join(', ')} WHERE entry_id = ?`,
            values
        );

        console.log(`[Timeline] Updated entry #${entryId} by ${username}`);

        // Notify Discord
        postTimelineToDiscord('updated', {
            subject: (subject && subject.trim()) || entries[0].subject,
            event_date: event_date || entries[0].event_date,
            category: category ? category.toLowerCase() : entries[0].category,
            description: description !== undefined ? (description || '').trim() : ''
        }, username).catch(e => console.error('[Timeline] Discord notify error:', e.message));

        res.json({ success: true });
    } catch (err) {
        console.error('[Timeline] Update error:', err.message);
        res.json({ success: false, error: 'Failed to update entry' });
    }
});

// AUTH: Delete timeline entry
app.delete('/api/timeline/:id', async (req, res) => {
    if (!pool) return res.status(500).json({ success: false, error: 'Database not connected' });

    const entryId = parseInt(req.params.id);
    const { username } = req.query;

    if (!username) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    try {
        const discordId = await getDiscordIdFromUsername(username);
        if (!discordId) {
            return res.json({ success: false, error: 'Player not found' });
        }

        const isAdmin = TIMELINE_ADMIN_IDS.includes(discordId);

        const [entries] = await pool.execute(
            'SELECT CAST(user_id AS CHAR) as user_id, subject, event_date, category FROM timeline_entries WHERE entry_id = ?',
            [entryId]
        );

        if (entries.length === 0) {
            return res.json({ success: false, error: 'Entry not found' });
        }

        if (entries[0].user_id !== discordId && !isAdmin) {
            return res.json({ success: false, error: 'Permission denied' });
        }

        // Capture entry info before deleting for Discord notification
        const deletedEntry = entries[0];

        await pool.execute('DELETE FROM timeline_entries WHERE entry_id = ?', [entryId]);

        console.log(`[Timeline] Deleted entry #${entryId} by ${username}`);

        // Notify Discord
        postTimelineToDiscord('deleted', {
            subject: deletedEntry.subject,
            event_date: deletedEntry.event_date,
            category: deletedEntry.category
        }, username).catch(e => console.error('[Timeline] Discord notify error:', e.message));

        res.json({ success: true });
    } catch (err) {
        console.error('[Timeline] Delete error:', err.message);
        res.json({ success: false, error: 'Failed to delete entry' });
    }
});

// ══════════════════════════════════════════════════════════════════════════
// CATCH-ALL & START
// ══════════════════════════════════════════════════════════════════════════

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
