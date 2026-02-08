// news api routes
// usage: require this and call setup(app, db, discordClient)

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// admin discord ids
const ADMIN_IDS = ['667478723213262848', '788852381726015489'];
const DISCORD_CHANNEL_ID = '1454707501282103427';

// file upload config
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function(req, file, cb) { cb(null, uploadDir); },
    filename: function(req, file, cb) {
        var stamp = Date.now();
        var safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        cb(null, stamp + '-' + safe);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50mb
});


function setup(app, db, discordClient) {

    // helper: check if a request is from an admin
    // adjust this to match however you store the user session
    function getUser(req) {
        // if you're using sessions with passport/discord oauth:
        // return req.user || req.session?.user || null;
        //
        // if you're using a simpler cookie/token approach, adjust here.
        // for now assumes req.user exists after auth middleware
        return req.user || null;
    }

    function isAdmin(req) {
        var user = getUser(req);
        if (!user) return false;
        return ADMIN_IDS.includes(String(user.discord_id || user.id));
    }

    // auth check endpoint (frontend calls this)
    // if you already have /api/auth/me, you can skip this
    // just make sure it returns { id, discord_id, username, isAdmin }
    app.get('/api/auth/me', function(req, res) {
        var user = getUser(req);
        if (!user) return res.status(401).json({ error: 'not logged in' });
        res.json({
            id: user.id,
            discord_id: user.discord_id || user.id,
            username: user.username || user.global_name || 'Unknown',
            isAdmin: ADMIN_IDS.includes(String(user.discord_id || user.id))
        });
    });


    // get pinned posts
    app.get('/api/news/pinned', function(req, res) {
        db.query(
            'SELECT * FROM news_posts WHERE pinned = 1 ORDER BY updated_at DESC LIMIT 10',
            function(err, rows) {
                if (err) return res.status(500).json({ error: 'db error' });
                res.json(rows || []);
            }
        );
    });


    // get posts (paginated, excludes pinned from main feed)
    app.get('/api/news', function(req, res) {
        var limit = Math.min(parseInt(req.query.limit) || 15, 50);
        var offset = parseInt(req.query.offset) || 0;

        db.query(
            'SELECT * FROM news_posts WHERE pinned = 0 ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [limit, offset],
            function(err, rows) {
                if (err) return res.status(500).json({ error: 'db error' });
                res.json(rows || []);
            }
        );
    });


    // create a post (admin only)
    app.post('/api/news', upload.single('file'), function(req, res) {
        if (!isAdmin(req)) return res.status(403).json({ error: 'not authorized' });

        var title = (req.body.title || '').trim();
        var content = (req.body.content || '').trim();
        var pinned = req.body.pinned === '1' ? 1 : 0;
        var postToDiscord = req.body.postToDiscord === '1';

        if (!title) return res.status(400).json({ error: 'title required' });
        if (!content) return res.status(400).json({ error: 'content required' });

        var fileUrl = null;
        var fileName = null;
        if (req.file) {
            fileUrl = '/uploads/' + req.file.filename;
            fileName = req.file.originalname;
        }

        var user = getUser(req);
        var authorId = String(user.discord_id || user.id);
        var authorName = user.username || user.global_name || 'Admin';

        db.query(
            'INSERT INTO news_posts (title, content, file_url, file_name, pinned, author_id, author_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, content, fileUrl, fileName, pinned, authorId, authorName],
            function(err, result) {
                if (err) return res.status(500).json({ error: 'db error' });

                var postId = result.insertId;

                // post to discord if checked
                if (postToDiscord && discordClient) {
                    sendToDiscord(db, discordClient, postId, title, content, fileUrl, fileName);
                }

                res.json({ id: postId, success: true });
            }
        );
    });


    // toggle pin
    app.put('/api/news/:id/pin', function(req, res) {
        if (!isAdmin(req)) return res.status(403).json({ error: 'not authorized' });

        var id = req.params.id;
        db.query('SELECT pinned FROM news_posts WHERE id = ?', [id], function(err, rows) {
            if (err || !rows.length) return res.status(404).json({ error: 'post not found' });

            var newVal = rows[0].pinned ? 0 : 1;
            db.query('UPDATE news_posts SET pinned = ? WHERE id = ?', [newVal, id], function(err) {
                if (err) return res.status(500).json({ error: 'db error' });
                res.json({ pinned: newVal, success: true });
            });
        });
    });


    // delete post
    app.delete('/api/news/:id', function(req, res) {
        if (!isAdmin(req)) return res.status(403).json({ error: 'not authorized' });

        var id = req.params.id;

        // get file path before deleting
        db.query('SELECT file_url FROM news_posts WHERE id = ?', [id], function(err, rows) {
            if (err || !rows.length) return res.status(404).json({ error: 'post not found' });

            // clean up file
            if (rows[0].file_url) {
                var filePath = path.join(__dirname, 'public', rows[0].file_url);
                fs.unlink(filePath, function() {}); // ignore errors
            }

            db.query('DELETE FROM news_posts WHERE id = ?', [id], function(err) {
                if (err) return res.status(500).json({ error: 'db error' });
                res.json({ success: true });
            });
        });
    });


    // send a post to discord after the fact
    app.post('/api/news/:id/discord', function(req, res) {
        if (!isAdmin(req)) return res.status(403).json({ error: 'not authorized' });
        if (!discordClient) return res.status(500).json({ error: 'bot not connected' });

        var id = req.params.id;
        db.query('SELECT * FROM news_posts WHERE id = ?', [id], function(err, rows) {
            if (err || !rows.length) return res.status(404).json({ error: 'post not found' });

            var post = rows[0];
            sendToDiscord(db, discordClient, post.id, post.title, post.content, post.file_url, post.file_name)
                .then(function() { res.json({ success: true }); })
                .catch(function(e) { res.status(500).json({ error: 'discord send failed' }); });
        });
    });
}


// send formatted embed to discord
async function sendToDiscord(db, client, postId, title, content, fileUrl, fileName) {
    try {
        var channel = await client.channels.fetch(DISCORD_CHANNEL_ID);
        if (!channel) return;

        // trim content for embed (discord limit is 4096 for description)
        var desc = content.length > 2000 ? content.substring(0, 2000) + '...' : content;

        var embed = {
            title: title,
            description: desc,
            color: 0xD4AF37,
            timestamp: new Date().toISOString(),
            footer: { text: 'Camp Half-Blood News' }
        };

        // add file link if there is one
        if (fileUrl) {
            embed.fields = [{
                name: 'Attachment',
                value: '[' + (fileName || 'Download') + '](' + process.env.SITE_URL + fileUrl + ')',
                inline: false
            }];
        }

        await channel.send({ embeds: [embed] });

        // mark as posted
        db.query('UPDATE news_posts SET posted_to_discord = 1 WHERE id = ?', [postId], function() {});

    } catch (err) {
        console.error('failed to post to discord:', err.message);
        throw err;
    }
}


module.exports = { setup };
