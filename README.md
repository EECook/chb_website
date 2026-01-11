# ⚡ Camp Half-Blood Website

A full-stack website for the Camp Half-Blood Discord/Minecraft bot with:
- Real-time player data tracking
- Character sheet builder (saved to database)
- Mail system integration
- Inventory viewing
- Drachma balance sync

## 🚀 Deploy to Railway (Step-by-Step)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (green button)
3. Name it `camp-halfblood-website`
4. Make it **Public** or **Private** (your choice)
5. Click **"Create repository"**

### Step 2: Upload Files to GitHub

**Option A: Using GitHub Web Interface**
1. Click **"uploading an existing file"** link
2. Drag ALL files from this folder into the upload area:
   - `server.js`
   - `package.json`
   - `.gitignore`
   - `.env.example`
   - `public/` folder (with all files inside)
3. Click **"Commit changes"**

**Option B: Using Git Command Line**
```bash
cd /path/to/this/folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/camp-halfblood-website.git
git push -u origin main
```

### Step 3: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** → **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### Step 4: Create New Project on Railway

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select your `camp-halfblood-website` repository
4. Railway will automatically detect it's a Node.js project

### Step 5: Add Environment Variables

1. In your Railway project, click **"Variables"** tab
2. Click **"New Variable"** and add each of these:

| Variable | Value |
|----------|-------|
| `DB_HOST` | Your BisectHosting MySQL host (e.g., `s412518.beastnode.net`) |
| `DB_USER` | Your MySQL username |
| `DB_PASSWORD` | Your MySQL password |
| `DB_NAME` | `s412518_CampHalfBlood` (or your database name) |

**Finding Your BisectHosting Database Credentials:**
1. Log into BisectHosting panel
2. Go to **Databases** → **MySQL Databases**
3. Your credentials are listed there

### Step 6: Deploy!

1. Railway will automatically build and deploy
2. Wait 1-2 minutes for deployment to complete
3. Click **"Settings"** → **"Generate Domain"**
4. Your site is now live at `https://your-project.up.railway.app`!

---

## 🔧 Local Development

### Prerequisites
- Node.js 18+ installed
- MySQL database (or run in demo mode)

### Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
nano .env

# Start development server
npm run dev
```

### Running Without Database
The server runs in **demo mode** if no database is configured. Data won't persist, but you can test the interface.

---

## 📁 Project Structure

```
camp-halfblood-website/
├── server.js           # Express backend with API routes
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore rules
└── public/
    ├── index.html      # Main HTML structure
    ├── styles.css      # All CSS styling
    ├── pages.js        # Documentation page content
    └── main.js         # Frontend JavaScript with API calls
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server status check |
| GET | `/api/player/:username` | Get player by MC username |
| GET | `/api/player/:username/mail` | Get player's mail |
| GET | `/api/player/:username/inventory` | Get player's inventory |
| GET | `/api/player/:username/character` | Get character sheet |
| POST | `/api/player/:username/character` | Save character sheet |
| POST | `/api/player/:username/claim` | Set god parent |
| POST | `/api/mail/:id/read` | Mark mail as read |
| GET | `/api/leaderboard` | Top players by Drachma |
| GET | `/api/gods` | All god information |

---

## 🔗 Connecting to Your Discord Bot

Your Discord bot can use the same database. Make sure your bot writes to these tables:

**Required Tables (auto-created by website):**
- `players` - Player profiles
- `mail` - Player mail messages
- `inventory` - Player items
- `cabins` - Cabin/team data
- `character_sheets` - Character info
- `shops` - Player shops
- `shop_listings` - Shop items

**Example: Send mail from your bot**
```javascript
// In your Discord bot code
await db.execute(
    `INSERT INTO mail (player_id, sender, subject, content, mail_type)
     VALUES (?, ?, ?, ?, ?)`,
    [playerId, 'Zeus', 'Welcome!', 'The gods welcome you...', 'claiming']
);
```

---

## ❓ Troubleshooting

### "Database connection failed"
- Check your `.env` variables are correct
- Make sure BisectHosting allows remote connections
- Your IP might need to be whitelisted in BisectHosting

### "Running in demo mode"
- This is normal if no database is configured
- Add database credentials to enable real data

### Site not updating after changes
- Railway auto-deploys on GitHub push
- Check Railway dashboard for build status

### CORS errors
- The server already has CORS enabled
- If issues persist, check browser console for details

---

## 🎮 Integration with Existing Bot

If you already have a Discord bot with its own database:

1. **Point to the same database** - Update `DB_*` variables to match your bot's database

2. **Match table schemas** - Either:
   - Let the website create tables (they won't conflict)
   - Or modify `server.js` to match your existing schema

3. **Sync player data** - The website reads from the same tables your bot writes to

---

## 📞 Support

Having issues? 
- Check the console for error messages
- Make sure all environment variables are set
- Verify database credentials are correct

Enjoy your new Camp Half-Blood website! ⚡🏕️
