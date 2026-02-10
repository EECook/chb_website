// Origins & Classes Page
(function() {

var activeTab = 'all';
var searchTerm = '';

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════

var BASE_ORIGINS = [
    { name: 'Human', emoji: '\u{1F9D1}', impact: 0,
      desc: 'A regular human. Your ordinary Minecraft experience awaits.',
      powers: [] },
    { name: 'Avian', emoji: '\u{1F985}', impact: 1,
      desc: 'Peaceful creatures who lost their ability to fly, now seen gliding from place to place.',
      powers: [
        { pro: true, name: 'Featherweight', text: 'Fall gently like a feather unless you sneak' },
        { pro: true, name: 'Tailwind', text: 'Slightly faster walking speed' },
        { pro: true, name: 'Like Air', text: 'Walking speed modifiers also apply in the air' },
        { pro: true, name: 'Oviparous', text: 'Lay an egg every morning when you wake up' },
        { pro: false, name: 'Fresh Air', text: 'Bed must be at Y=86+ to sleep' },
        { pro: false, name: 'Vegetarian', text: 'Cannot digest any meat' }
    ]},
    { name: 'Arachnid', emoji: '\u{1F577}', impact: 1,
      desc: 'Climbing abilities and web-trapping make the Arachnid a perfect hunter.',
      powers: [
        { pro: true, name: 'Climbing', text: 'Climb any wall, not just ladders' },
        { pro: true, name: 'Master of Webs', text: 'Move freely through cobwebs; melee hits trap enemies; sense non-arthropods in webs; craft cobweb from string' },
        { pro: false, name: 'Carnivore', text: 'Can only eat meat' },
        { pro: false, name: 'Fragile', text: '3 fewer hearts of health (7 total)' }
    ]},
    { name: 'Elytrian', emoji: '\u{1FA82}', impact: 1,
      desc: 'Often flying in the winds, uncomfortable without open sky above them.',
      powers: [
        { pro: true, name: 'Winged', text: 'Built-in Elytra wings \u2014 no item needed' },
        { pro: true, name: 'Gift of the Winds', text: 'Launch 20 blocks upward every 30 seconds' },
        { pro: true, name: 'Aerial Combatant', text: 'Deal more damage while in Elytra flight' },
        { pro: false, name: 'Need for Mobility', text: 'Cannot wear armor heavier than chainmail' },
        { pro: false, name: 'Claustrophobia', text: 'Weakness and slowness under low ceilings' },
        { pro: false, name: 'Brittle Bones', text: 'Extra damage from falling and flying into blocks' }
    ]},
    { name: 'Shulk', emoji: '\u{1F7EA}', impact: 1,
      desc: 'Related to Shulkers, their bodies are outfitted with a protective shell-like skin.',
      powers: [
        { pro: true, name: 'Hoarder', text: '9 extra inventory slots, kept on death' },
        { pro: true, name: 'Sturdy Skin', text: 'Natural armor protection without wearing any' },
        { pro: true, name: 'Strong Arms', text: 'Break natural stone without a pickaxe' },
        { pro: false, name: 'Unwieldy', text: 'Cannot use shields' },
        { pro: false, name: 'Large Appetite', text: 'Hunger drains much faster' }
    ]},
    { name: 'Feline', emoji: '\u{1F408}', impact: 2,
      desc: 'Cat-like appearance that scares creepers away, with the dexterity of cats.',
      powers: [
        { pro: true, name: 'Acrobatics', text: 'Never take fall damage from any height' },
        { pro: true, name: 'Strong Ankles', text: 'Jump higher when sprint-jumping' },
        { pro: true, name: 'Velvet Paws', text: 'Footsteps cause no vibrations' },
        { pro: true, name: 'Catlike Appearance', text: 'Creepers won\u2019t explode unless attacked first' },
        { pro: true, name: 'Nocturnal', text: 'Slight night vision when not in water' },
        { pro: false, name: 'Nine Lives', text: '1 fewer heart (9 total)' },
        { pro: false, name: 'Weak Arms', text: 'Can only mine stone with \u22642 adjacent stone blocks' }
    ]},
    { name: 'Enderian', emoji: '\u{1F47E}', impact: 2,
      desc: 'Born as children of the Ender Dragon, capable of teleporting but vulnerable to water.',
      powers: [
        { pro: true, name: 'Teleportation', text: 'Throw free ender pearls at will with no damage' },
        { pro: true, name: 'Slender Body', text: 'Extended reach for blocks and entities' },
        { pro: false, name: 'Hydrophobia', text: 'Take damage over time from water contact' },
        { pro: false, name: 'Scared of Gourds', text: 'Players wearing pumpkins are invisible to you' }
    ]},
    { name: 'Merling', emoji: '\u{1F9DC}', impact: 3,
      desc: 'Natural ocean inhabitants, not used to being out of the water for too long.',
      powers: [
        { pro: true, name: 'Gills', text: 'Breathe underwater, but not on land' },
        { pro: true, name: 'Wet Eyes', text: 'Perfect underwater vision' },
        { pro: true, name: 'Aqua Affinity', text: 'Mine underwater at full speed' },
        { pro: true, name: 'Fins', text: 'Faster underwater swimming' },
        { pro: true, name: 'Like Water', text: 'Don\u2019t sink unless you want to' }
    ]},
    { name: 'Blazeborn', emoji: '\u{1F525}', impact: 3,
      desc: 'Late descendants of Blazes, naturally immune to the Nether\u2019s perils.',
      powers: [
        { pro: true, name: 'Fire Immunity', text: 'Immune to all types of fire damage' },
        { pro: true, name: 'Nether Inhabitant', text: 'Natural spawn is in the Nether' },
        { pro: true, name: 'Burning Wrath', text: 'Extra melee damage while on fire' },
        { pro: true, name: 'Hotblooded', text: 'Immune to poison and hunger effects' },
        { pro: false, name: 'Hydrophobia', text: 'Take damage over time from water contact' }
    ]},
    { name: 'Phantom', emoji: '\u{1F47B}', impact: 3,
      desc: 'Half-human, half-phantom offspring that can switch between forms at will.',
      powers: [
        { pro: true, name: 'Phantom Form', text: 'Toggle between human and phantom form (requires saturation)' },
        { pro: true, name: 'Phasing', text: 'Walk through solid blocks while phantomized (except obsidian/bedrock)' },
        { pro: true, name: 'Invisibility', text: 'Invisible while in phantom form' },
        { pro: true, name: 'Translucent', text: 'Semi-transparent skin' },
        { pro: false, name: 'Photoallergic', text: 'Burn in daylight if not invisible' },
        { pro: false, name: 'Fast Metabolism', text: 'Phantomizing drains hunger rapidly' },
        { pro: false, name: 'Fragile', text: '3 fewer hearts of health (7 total)' }
    ]}
];

var RPG_ORIGINS = [
    { name: 'Archer', emoji: '\u{1F3F9}', impact: 2,
      desc: 'A sharpshooter who spawns with custom gear and excels at ranged combat.',
      powers: [
        { pro: true, name: 'Whelm Bow', text: 'Spawn with a unique bow that can fire 3 arrows at once' },
        { pro: true, name: 'Proficient', text: 'Enhanced damage with bows and crossbows' },
        { pro: true, name: 'Fletcher', text: 'Standing near a fletching table lets you craft extra arrows' },
        { pro: false, name: 'Frail', text: '3 fewer hearts of health' },
        { pro: false, name: 'Untrained', text: 'Weaker with swords and melee weapons' }
    ]},
    { name: 'Bard', emoji: '\u{1F3B6}', impact: 2,
      desc: 'A charismatic musician who supports allies with magical melodies.',
      powers: [
        { pro: true, name: 'Harmonic Lute', text: 'Spawn with a lute \u2014 shift+right-click and right-click for party buffs' },
        { pro: true, name: 'Charismatic', text: 'Nearby players gain speed and regeneration (toggleable aura)' },
        { pro: true, name: 'Horn Mastery', text: 'Each goat horn type triggers a different special effect' },
        { pro: false, name: 'Hungry Performer', text: 'Gets hungry faster than other origins' },
        { pro: false, name: 'Inexperienced', text: 'Gains less XP from all sources' }
    ]},
    { name: 'Cleric', emoji: '\u26EA', impact: 2,
      desc: 'A holy healer blessed with divine favor and extended potion effects.',
      powers: [
        { pro: true, name: 'Hero of the Village', text: 'Permanent Hero of the Village effect' },
        { pro: true, name: 'Divine Blessing', text: 'Regeneration, speed, jump boost, and strength last 50% longer' },
        { pro: true, name: 'Heal Pool', text: 'Cast an AoE heal ability with the Primary key' },
        { pro: true, name: 'One With the World', text: 'Reverts insomnia when exposed to sunlight' },
        { pro: false, name: 'Pure', text: 'Cannot naturally heal in the Nether' },
        { pro: false, name: 'Frail', text: '3 fewer hearts of health' }
    ]},
    { name: 'Mage', emoji: '\u{1FA84}', impact: 2,
      desc: 'A spellcaster wielding arcane power through a sapphire staff.',
      powers: [
        { pro: true, name: 'Sapphire Staff', text: 'Spawn with staff \u2014 right-click for fireball, hold for powerful blast' },
        { pro: true, name: 'Arcane Resistance', text: 'Immune to poison, weakness, and slowness effects' },
        { pro: true, name: 'Water Walking', text: 'Walk on water while holding a Heart of the Sea' },
        { pro: false, name: 'Physically Weak', text: 'Reduced melee attack damage' },
        { pro: false, name: 'Frail', text: '3 fewer hearts of health' }
    ]},
    { name: 'Thief', emoji: '\u{1F5E1}', impact: 2,
      desc: 'A stealthy rogue who moves unseen and steals from the unwary.',
      powers: [
        { pro: true, name: 'Thief Glove', text: 'Spawn with a sack that steals items from villagers' },
        { pro: true, name: 'Swiftness', text: 'Permanent Speed I effect' },
        { pro: true, name: 'Shadow Step', text: 'Crouching turns you completely invisible' },
        { pro: true, name: 'Pickpocket', text: 'Steal 3 emeralds when killing a villager' },
        { pro: false, name: 'Exposed', text: 'Can\u2019t deal damage during and 3 seconds after crouching' },
        { pro: false, name: 'Fragile', text: '2 fewer hearts of health' },
        { pro: false, name: 'Unshielded', text: 'Cannot use shields' }
    ]},
    { name: 'Brute', emoji: '\u{1F4AA}', impact: 2,
      desc: 'A tank who breaks stone barehanded and wears natural armor.',
      powers: [
        { pro: true, name: 'Sapphire Misery', text: 'Spawn with a unique weapon \u2014 right-click for rage resistance buff' },
        { pro: true, name: 'Stone Breaker', text: 'Break stone with bare fists' },
        { pro: true, name: 'Natural Armor', text: 'Built-in damage reduction without wearing armor' },
        { pro: true, name: 'Giant Slayer', text: 'Deal extra damage to high-HP mobs (\u226550 HP)' },
        { pro: false, name: 'Bully', text: 'Deal less damage to low-HP mobs (\u226410 HP)' },
        { pro: false, name: 'Unshielded', text: 'Cannot use shields' },
        { pro: false, name: 'Slow Healer', text: 'Cannot naturally regenerate health' }
    ]},
    { name: 'Berserker', emoji: '\u2694', impact: 3,
      desc: 'A fury-driven warrior wielding a devastating area-of-effect claymore.',
      powers: [
        { pro: true, name: 'Balmung', text: 'Spawn with an AOE claymore that deals massive damage to groups' },
        { pro: true, name: 'Battle Rage', text: 'Enhanced melee power in rage-based combat style' },
        { pro: true, name: 'Relentless', text: 'Rage abilities grow stronger as battle continues' },
        { pro: false, name: 'Reckless', text: 'Increased damage taken while in combat' }
    ]},
    { name: 'Variant Human', emoji: '\u{1F9D9}', impact: 1,
      desc: 'A normal human with a twist \u2014 choose a skill and feat at creation.',
      powers: [
        { pro: true, name: 'Choose a Skill', text: 'Select one proficiency skill at character creation' },
        { pro: true, name: 'Choose a Feat', text: 'Select one special feat to customize your playstyle' },
        { pro: true, name: 'Versatile', text: 'No major drawbacks \u2014 well-rounded and adaptable' }
    ]}
];

var CLASSES = [
    { name: 'Archer', emoji: '\u{1F3F9}', perks: ['Projectiles are more accurate', 'Less slowdown when drawing a bow'] },
    { name: 'Beastmaster', emoji: '\u{1F43E}', perks: ['Tamed animals gain permanent extra hearts and damage', 'Potion effects also apply to nearby tamed animals'] },
    { name: 'Blacksmith', emoji: '\u2692', perks: ['Tools and armor you craft provide small stat bonuses', 'Repair tools and armor more efficiently'] },
    { name: 'Cleric', emoji: '\u271D', perks: ['Strengthen or extend the effects of potions', 'Better results at the enchanting table'] },
    { name: 'Cook', emoji: '\u{1F373}', perks: ['Food you craft provides more nourishment', 'Extra XP from cooking food in a smoker'] },
    { name: 'Farmer', emoji: '\u{1F33E}', perks: ['Crops grow faster around you', 'More drops when harvesting crops'] },
    { name: 'Lumberjack', emoji: '\u{1FA93}', perks: ['Break logs faster than normal', 'Chance for extra items when breaking logs'] },
    { name: 'Miner', emoji: '\u26CF', perks: ['Ores occasionally drop extra resources', 'Better vision in dark caves'] },
    { name: 'Rancher', emoji: '\u{1F404}', perks: ['Animals you breed produce more offspring', 'Animals drop more items'] },
    { name: 'Warrior', emoji: '\u{1F5E1}', perks: ['Deal slightly more melee damage', 'Take slightly less melee damage'] }
];

var PP_ORIGINS_ALL = [
    'Alien','Anomaly','Artificial Construct','Automaton','Axolotl','Beaver','Bedrockean','Binturong',
    'Bird','Blazian','Blob','Boarling','Broodmother','Calamitous Rogue','Candyperson',
    'Child of Cthulhu','Chimaera','Cobra','Copper Golem','Corrupted Wither','Craftsman',
    'Dark Mage','Deathsworn','Demi God','Deranged','Divine Architect','Dolphin','Drakonwither',
    'Dullahan','Earth Spirit','Ebon Wing','Emblazing Warrior','End Mage','Enigma',
    'Fallen Angel','Felvaxian','Flea','Frog','Gaia','Ghast','Giant','Glacier','Gnoll',
    'Golden Golem','Goolien','Half Wither','Hellforged','Hero of the Wild','Ice King',
    'Ice Porcupine','Iceling','Ignisian','Illusioner','Inchling','Infernal','Jester',
    'Kitsune','Lepus','Lich','Living Armour','Lurker','Merfolk','Mimic','Moobloom',
    'Mothling','Mushroom','Naga','Necromancer','Nightcrawler','Nightwalker','Orc',
    'Orbweaver','Phoenix','Piglin','Plantaemancer','Poltergeist','Rabbit','Raccoon',
    'Raven','Reaper','Revenant','Robot','Scarecrow','Sentinel','Shadow','Shadowtouched',
    'Shark','Shifter','Slimeling','Snail','Snake','Snowman','Spectre','Spider',
    'Star Being','Starborne','Strider','Tideborn','Tiger','Treant','Triangulon','Troll',
    'Turtle','Undead','Vampire','Voidwalker','Wailing One','Warlock','Wendigo',
    'Werewolf','Witch','Wither Skeleton','Wolf'
];

var PP_SPOTLIGHTS = [
    { name: 'Fallen Angel', emoji: '\u{1F608}', impact: 3,
      desc: 'Escaped from hell, seeking revenge upon the world with demonic powers.',
      powers: [
        { pro: true, name: 'Demonic Flight', text: 'Fly freely without elytra' },
        { pro: true, name: 'Dead-Shot', text: 'Shoot wither skulls at enemies' },
        { pro: true, name: 'Strong Arms', text: 'Mine stone with bare fists' },
        { pro: true, name: 'Bloodthirsty', text: 'Enhanced strength from demonic nature' },
        { pro: false, name: 'Trauma', text: 'Extra damage from fire (hellish PTSD)' },
        { pro: false, name: 'Fragile', text: 'Fewer hearts from torture endured' },
        { pro: false, name: 'Demonic Presence', text: 'You glow, making stealth impossible' }
    ]},
    { name: 'Child of Cthulhu', emoji: '\u{1F419}', impact: 2,
      desc: 'A descendant of the great Cthulhu wielding ancient, otherworldly powers.',
      powers: [
        { pro: true, name: 'Gift of the Skies', text: 'Launch yourself in the direction you\u2019re looking' },
        { pro: true, name: 'Morphing', text: 'Switch between small, normal, and large sizes' },
        { pro: true, name: 'Extra Reach', text: 'Extended reach distance' },
        { pro: true, name: 'Camouflage', text: 'Skin color changes in water vs. on land' },
        { pro: true, name: 'Water Lungs', text: 'Permanent water breathing' },
        { pro: false, name: 'Amphibious', text: 'Slowness on land when not raining' },
        { pro: false, name: 'Fire Weakness', text: 'Significantly more fire damage taken' }
    ]},
    { name: 'Vampire', emoji: '\u{1F9DB}', impact: 3,
      desc: 'An undead creature of the night with life-stealing abilities and sun vulnerability.',
      powers: [
        { pro: true, name: 'Night Vision', text: 'Perfect vision in the dark' },
        { pro: true, name: 'Life Steal', text: 'Regain health by dealing damage to enemies' },
        { pro: true, name: 'Supernatural Speed', text: 'Enhanced movement speed at night' },
        { pro: true, name: 'Bat Form', text: 'Transform into a bat for evasion' },
        { pro: false, name: 'Sunburn', text: 'Burn in direct sunlight' },
        { pro: false, name: 'Undead', text: 'Smite enchantment deals extra damage to you' }
    ]},
    { name: 'Wailing One', emoji: '\u{1F47B}', impact: 2,
      desc: 'An eerie banshee \u2014 harbinger of death whose very presence brings fear.',
      powers: [
        { pro: true, name: 'Float', text: 'Hover above the ground (too exhausting to fly far)' },
        { pro: true, name: 'Phase', text: 'Pass through blocks briefly (unstable)' },
        { pro: true, name: 'Feast On Life', text: 'Gain health by damaging or killing others' },
        { pro: true, name: 'As Soft As A Wisp', text: 'Crouch while falling to fall slowly' },
        { pro: false, name: 'Ghost!', text: 'Villagers won\u2019t trade; Iron Golems attack on sight' },
        { pro: false, name: 'Wicked Spirit', text: 'Smite works against you; iron and gold deal extra damage' }
    ]},
    { name: 'Hero of the Wild', emoji: '\u{1F5E1}', impact: 2,
      desc: 'A versatile explorer finely tuned for adventure with a magic sword.',
      powers: [
        { pro: true, name: 'Sword of Evil\u2019s Bane', text: 'Wield a magic sword forged to destroy evil' },
        { pro: true, name: 'Energy Wave', text: 'Shoot an energy attack while holding your sword' },
        { pro: true, name: 'Epona', text: 'Summon a loyal horse companion' },
        { pro: true, name: 'Roll', text: 'Dodge roll to escape enemies' },
        { pro: false, name: 'Sink in Water', text: 'You never learned how to swim' },
        { pro: false, name: 'Fast Metabolism', text: 'Your active lifestyle exhausts you faster' }
    ]},
    { name: 'Ignisian', emoji: '\u{1F525}', impact: 3,
      desc: 'A hellspawn whose armored body wields fire and causes earthquakes.',
      powers: [
        { pro: true, name: 'Hades Hopper', text: 'Launch yourself into the air' },
        { pro: true, name: 'Hades Trembler', text: 'Slam the ground to cause an earthquake' },
        { pro: true, name: 'Wrath Mode', text: 'Rampage with 80% damage reduction, 50% speed, fire thorns, knockback resistance' },
        { pro: false, name: 'Extinguished', text: 'Water slows you and removes your flames' },
        { pro: false, name: 'Heavyweight', text: 'Armored body reduces base movement speed' }
    ]},
    { name: 'Shifter', emoji: '\u{1F500}', impact: 3,
      desc: 'Stole powers from all 9 base origins. Switch between weaker forms of each.',
      powers: [
        { pro: true, name: 'Shift', text: 'Hold a special item + press Secondary key to change form' },
        { pro: true, name: '9 Forms', text: 'Access Arachnid, Avian, Blazeborn, Elytrian, Enderian, Feline, Merling, Phantom, and Shulk forms' },
        { pro: true, name: 'Versatile', text: 'Adapt to any situation by switching origins' },
        { pro: false, name: 'No Elytra', text: 'Cannot equip an elytra (you have a form for that)' },
        { pro: false, name: 'Weakened Forms', text: 'Each form is weaker than the real origin' }
    ]},
    { name: 'Kitsune', emoji: '\u{1F98A}', impact: 2,
      desc: 'A cunning fox spirit with stealth, agility, and supernatural tricks.',
      powers: [
        { pro: true, name: 'Fox Agility', text: 'Enhanced speed and jump height' },
        { pro: true, name: 'Spirit Form', text: 'Turn invisible when crouching' },
        { pro: true, name: 'Night Vision', text: 'See clearly in darkness' },
        { pro: false, name: 'Fragile', text: 'Fewer hearts than a normal human' },
        { pro: false, name: 'Carnivore', text: 'Can only eat meat' }
    ]},
    { name: 'Phoenix', emoji: '\u{1F426}\u200D\u{1F525}', impact: 3,
      desc: 'A creature of fire and rebirth, rising from the ashes when defeated.',
      powers: [
        { pro: true, name: 'Fire Immunity', text: 'Immune to all fire and lava damage' },
        { pro: true, name: 'Rebirth', text: 'Rise from the ashes upon death with a cooldown' },
        { pro: true, name: 'Flight', text: 'Fly with fiery wings' },
        { pro: true, name: 'Burning Touch', text: 'Melee attacks set enemies on fire' },
        { pro: false, name: 'Hydrophobia', text: 'Water deals significant damage' },
        { pro: false, name: 'Fragile', text: 'Fewer hearts of health' }
    ]},
    { name: 'Werewolf', emoji: '\u{1F43A}', impact: 3,
      desc: 'Cursed with lycanthropy, transforming into a powerful beast under moonlight.',
      powers: [
        { pro: true, name: 'Transformation', text: 'Transform into a powerful wolf form at night' },
        { pro: true, name: 'Enhanced Strength', text: 'Massively increased melee damage in wolf form' },
        { pro: true, name: 'Predator', text: 'Enhanced speed and night vision while transformed' },
        { pro: false, name: 'Vulnerability', text: 'Weaker during the day in human form' },
        { pro: false, name: 'Hunger', text: 'Transformation drains hunger rapidly' }
    ]}
];

// ═══════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════

function render(mount) {

    var totalOrigins = BASE_ORIGINS.length + RPG_ORIGINS.length + PP_ORIGINS_ALL.length;

    var h = '<div class="origins-page">'

    // ── Hero ──
    + '<div class="ori-hero">'
    +   '<div class="ori-hero-glow"></div>'
    +   '<div class="reveal">'
    +     '<div class="gs-ornament"><div class="ornament-line"></div><span>\u2726 CHOOSE YOUR DESTINY \u2726</span><div class="ornament-line"></div></div>'
    +     '<h1>Origins & Classes</h1>'
    +     '<p class="ori-hero-sub">Pick your species, choose your class, and forge your legend at Camp Half-Blood</p>'
    +   '</div>'
    + '</div>'

    // ── How it works ──
    + '<div class="ori-explainer reveal">'
    +   '<div class="ori-layers">'
    +     '<div class="ori-layer-card">'
    +       '<div class="ori-layer-num">Layer 1</div>'
    +       '<div class="ori-layer-icon">\u{1F9EC}</div>'
    +       '<div class="ori-layer-title">Origin</div>'
    +       '<div class="ori-layer-desc">Your species, race, or creature type. Each origin comes with unique powers and drawbacks that fundamentally change how you play.</div>'
    +       '<div class="ori-layer-count">' + (BASE_ORIGINS.length + RPG_ORIGINS.length + PP_ORIGINS_ALL.length) + ' options</div>'
    +     '</div>'
    +     '<div class="ori-layer-card">'
    +       '<div class="ori-layer-num">Layer 2</div>'
    +       '<div class="ori-layer-icon">\u2694\uFE0F</div>'
    +       '<div class="ori-layer-title">Class</div>'
    +       '<div class="ori-layer-desc">Your profession or specialization. Classes provide smaller benefits with no drawbacks \u2014 pure bonuses that complement your origin.</div>'
    +       '<div class="ori-layer-count">' + CLASSES.length + ' options</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'

    // ── Search ──
    + '<div class="ori-search-wrap reveal">'
    +   '<div class="ori-search">'
    +     '<span class="ori-search-icon">\u{1F50D}</span>'
    +     '<input type="text" class="ori-search-input" id="ori-search" placeholder="Search origins & classes\u2026" autocomplete="off">'
    +   '</div>'
    + '</div>'

    // ── Tabs ──
    + '<div class="ori-tabs reveal" id="ori-tabs">'
    +   '<button class="ori-tab active" data-tab="all">All <span class="ori-tab-count">' + totalOrigins + '</span></button>'
    +   '<button class="ori-tab" data-tab="base">\u{1F30D} Base Origins <span class="ori-tab-count">' + BASE_ORIGINS.length + '</span></button>'
    +   '<button class="ori-tab" data-tab="rpg">\u2694\uFE0F RPG Origins <span class="ori-tab-count">' + RPG_ORIGINS.length + '</span></button>'
    +   '<button class="ori-tab" data-tab="pp">\u2728 Origins++ <span class="ori-tab-count">' + PP_ORIGINS_ALL.length + '</span></button>'
    +   '<button class="ori-tab" data-tab="classes">\u{1F6E1}\uFE0F Classes <span class="ori-tab-count">' + CLASSES.length + '</span></button>'
    + '</div>'

    // ── Content ──
    + '<div class="ori-content" id="ori-content"></div>'

    + '</div>';

    mount.innerHTML = h;
    renderContent();
    bindEvents(mount);

    requestAnimationFrame(function() {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
        }, { threshold: 0.1 });
        mount.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
    });

    return { cleanup: function() {} };
}

// ═══════════════════════════════════════════════════════════
// CONTENT RENDERING
// ═══════════════════════════════════════════════════════════

function renderContent() {
    var el = document.getElementById('ori-content');
    if (!el) return;

    var h = '';
    var s = searchTerm.toLowerCase();

    var showBase = activeTab === 'all' || activeTab === 'base';
    var showRpg = activeTab === 'all' || activeTab === 'rpg';
    var showPP = activeTab === 'all' || activeTab === 'pp';
    var showClasses = activeTab === 'all' || activeTab === 'classes';

    // Filter helper
    function matchSearch(o) {
        if (!s) return true;
        return o.name.toLowerCase().indexOf(s) >= 0
            || (o.desc && o.desc.toLowerCase().indexOf(s) >= 0)
            || (o.powers && o.powers.some(function(p) { return p.name.toLowerCase().indexOf(s) >= 0 || p.text.toLowerCase().indexOf(s) >= 0; }));
    }

    var anyResults = false;

    // ── Base Origins ──
    if (showBase) {
        var baseFiltered = BASE_ORIGINS.filter(matchSearch);
        if (baseFiltered.length) {
            anyResults = true;
            h += sectionHeader('\u{1F30D}', 'Base Origins', 'The 10 core species from the Origins mod \u2014 each fundamentally changes gameplay', baseFiltered.length);
            h += '<div class="ori-grid">';
            baseFiltered.forEach(function(o, i) { h += originCard(o, i, 'Base'); });
            h += '</div></div>';
        }
    }

    // ── RPG Origins ──
    if (showRpg) {
        var rpgFiltered = RPG_ORIGINS.filter(matchSearch);
        if (rpgFiltered.length) {
            anyResults = true;
            h += sectionHeader('\u2694\uFE0F', 'RPG Origins', 'DnD-inspired classes with custom weapons, spells, and unique gear', rpgFiltered.length);
            h += '<div class="ori-grid">';
            rpgFiltered.forEach(function(o, i) { h += originCard(o, i, 'RPG'); });
            h += '</div></div>';
        }
    }

    // ── Origins++ ──
    if (showPP) {
        var ppSpotlightsFiltered = PP_SPOTLIGHTS.filter(matchSearch);
        var ppChipsFiltered = s ? PP_ORIGINS_ALL.filter(function(n) { return n.toLowerCase().indexOf(s) >= 0; }) : PP_ORIGINS_ALL;
        if (ppSpotlightsFiltered.length || ppChipsFiltered.length) {
            anyResults = true;
            h += sectionHeader('\u2728', 'Origins++', 'Over 100 community-created origins ranging from mythical creatures to cosmic beings', PP_ORIGINS_ALL.length);

            h += '<div class="ori-pp-note">'
              +    '<strong>Origins++</strong> adds an enormous library of unique origins to explore. '
              +    'Each comes with its own set of powers and drawbacks, viewable in the origin selection screen in-game. '
              +    'Below are some popular picks, plus the full roster.'
              + '</div>';

            // Spotlight cards
            if (ppSpotlightsFiltered.length) {
                h += '<div class="ori-spotlight-label">\u2605 Popular Picks</div>';
                h += '<div class="ori-grid">';
                ppSpotlightsFiltered.forEach(function(o, i) { h += originCard(o, i, 'Origins++'); });
                h += '</div>';
            }

            // Chip grid
            if (ppChipsFiltered.length && !s) {
                h += '<div class="ori-spotlight-label">\u{1F4DC} Full Roster (' + ppChipsFiltered.length + ')</div>';
                h += '<div class="ori-pp-grid">';
                ppChipsFiltered.forEach(function(n) { h += '<div class="ori-pp-chip">' + esc(n) + '</div>'; });
                h += '</div>';
            } else if (ppChipsFiltered.length && s) {
                h += '<div class="ori-spotlight-label">\u{1F50D} Matching Origins (' + ppChipsFiltered.length + ')</div>';
                h += '<div class="ori-pp-grid">';
                ppChipsFiltered.forEach(function(n) { h += '<div class="ori-pp-chip">' + esc(n) + '</div>'; });
                h += '</div>';
            }

            h += '</div>'; // close section
        }
    }

    // ── Classes ──
    if (showClasses) {
        var classFiltered = CLASSES.filter(function(c) {
            if (!s) return true;
            return c.name.toLowerCase().indexOf(s) >= 0 || c.perks.some(function(p) { return p.toLowerCase().indexOf(s) >= 0; });
        });
        if (classFiltered.length) {
            anyResults = true;
            h += sectionHeader('\u{1F6E1}\uFE0F', 'Classes', 'Chosen alongside your origin \u2014 all benefits, no drawbacks', classFiltered.length);
            h += '<div class="ori-class-grid">';
            classFiltered.forEach(function(c, i) { h += classCard(c, i); });
            h += '</div></div>';
        }
    }

    if (!anyResults) {
        h = '<div class="ori-empty">No origins or classes found matching \u201C' + esc(searchTerm) + '\u201D</div>';
    }

    el.innerHTML = h;

    // Stagger animations
    el.querySelectorAll('.ori-card, .ori-class-card').forEach(function(card, i) {
        card.style.animationDelay = Math.min(i * 0.03, 0.6) + 's';
    });
    el.querySelectorAll('.ori-pp-chip').forEach(function(chip, i) {
        chip.style.animationDelay = Math.min(i * 0.008, 0.5) + 's';
        chip.style.animation = 'oriFadeUp 0.3s ease both';
    });

    // Bind expand toggles
    el.querySelectorAll('.ori-card-head').forEach(function(head) {
        head.addEventListener('click', function() {
            var card = this.closest('.ori-card');
            card.classList.toggle('open');
        });
    });
}

// ═══════════════════════════════════════════════════════════
// HTML BUILDERS
// ═══════════════════════════════════════════════════════════

function sectionHeader(icon, title, sub, count) {
    return '<div class="ori-section">'
        + '<div class="ori-section-header">'
        +   '<span class="ori-section-icon">' + icon + '</span>'
        +   '<div>'
        +     '<div class="ori-section-title">' + esc(title) + '</div>'
        +     '<div class="ori-section-sub">' + esc(sub) + '</div>'
        +   '</div>'
        +   '<span class="ori-section-count">' + count + '</span>'
        + '</div>';
}

function originCard(o, idx, source) {
    var impactLevel = o.impact || 0;
    var impactLabel = impactLevel === 0 ? 'none' : impactLevel === 1 ? 'low' : impactLevel === 2 ? 'med' : 'high';

    var dots = '';
    for (var d = 0; d < 3; d++) {
        dots += '<div class="ori-impact-dot' + (d < impactLevel ? ' filled ' + impactLabel : '') + '"></div>';
    }

    var h = '<div class="ori-card">'
        + '<span class="ori-card-source">' + esc(source) + '</span>'
        + '<div class="ori-card-head">'
        +   '<span class="ori-card-emoji">' + o.emoji + '</span>'
        +   '<div class="ori-card-info">'
        +     '<div class="ori-card-name">' + esc(o.name) + '</div>'
        +     '<div class="ori-card-tagline">' + esc(o.desc) + '</div>'
        +   '</div>'
        +   '<div class="ori-card-impact" title="Impact: ' + impactLabel + '">' + dots + '</div>'
        +   (o.powers && o.powers.length ? '<span class="ori-card-toggle">\u25BE</span>' : '')
        + '</div>';

    if (o.powers && o.powers.length) {
        h += '<div class="ori-card-body"><div class="ori-powers">';
        o.powers.forEach(function(p) {
            h += '<div class="ori-power">'
              +    '<span class="ori-power-icon ' + (p.pro ? 'pro' : 'con') + '">' + (p.pro ? '\u2714' : '\u2718') + '</span>'
              +    '<span><span class="ori-power-name">' + esc(p.name) + '</span> \u2014 ' + esc(p.text) + '</span>'
              + '</div>';
        });
        h += '</div></div>';
    }

    h += '</div>';
    return h;
}

function classCard(c, idx) {
    var h = '<div class="ori-class-card">'
        + '<span class="ori-class-emoji">' + c.emoji + '</span>'
        + '<div class="ori-class-body">'
        +   '<div class="ori-class-name">' + esc(c.name) + '</div>'
        +   '<ul class="ori-class-perks">';
    c.perks.forEach(function(p) {
        h += '<li class="ori-class-perk">' + esc(p) + '</li>';
    });
    h += '</ul><div class="ori-class-tag">No drawbacks</div></div></div>';
    return h;
}

// ═══════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════

function bindEvents(mount) {
    document.getElementById('ori-search').addEventListener('input', function() {
        searchTerm = this.value.trim();
        renderContent();
    });

    document.getElementById('ori-tabs').addEventListener('click', function(e) {
        var btn = e.target.closest('.ori-tab');
        if (!btn) return;
        activeTab = btn.getAttribute('data-tab');
        this.querySelectorAll('.ori-tab').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-tab') === activeTab);
        });
        renderContent();
    });
}

function esc(s) { if(!s) return ''; var e = document.createElement('span'); e.textContent = s; return e.innerHTML; }

window.OriginsPage = render;
})();
