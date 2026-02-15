export interface MatchData {
  matchTitle: string;
  matchNumber: number;
  day: number;
  bestOf: 3 | 5;
  isLive: boolean;
  isOvertime: boolean;
  showCameraFrames: boolean;
  player1: PlayerData;
  player2: PlayerData;
  scores: number[]; // per-game crown scores for tracker
}

export interface PlayerData {
  name: string;
  school: string;
  score: number;
  winPercentage: number;
  favoriteCard: string;
  deck: string[];
}

export const DEFAULT_MATCH_DATA: MatchData = {
  matchTitle: "CRCL PILOT",
  matchNumber: 1,
  day: 1,
  bestOf: 3,
  isLive: true,
  isOvertime: false,
  showCameraFrames: true,
  player1: {
    name: "PLAYER 1",
    school: "UNIVERSITY A",
    score: 0,
    winPercentage: 50,
    favoriteCard: "Hog Rider",
    deck: ["Hog Rider", "Musketeer", "Fireball", "Ice Spirit", "Log", "Ice Golem", "Cannon", "Skeletons"],
  },
  player2: {
    name: "PLAYER 2",
    school: "UNIVERSITY B",
    score: 0,
    winPercentage: 50,
    favoriteCard: "Miner",
    deck: ["Miner", "Poison", "Valkyrie", "Musketeer", "Inferno Tower", "Log", "Ice Spirit", "Skeletons"],
  },
  scores: [],
};

export const CR_CARDS = [
  "Archer Queen", "Arrows", "Baby Dragon", "Balloon", "Bandit", "Barbarian Barrel",
  "Barbarians", "Bats", "Battle Healer", "Battle Ram", "Bomber", "Bowler",
  "Cannon", "Cannon Cart", "Clone", "Dark Prince", "Dart Goblin", "Earthquake",
  "Electro Dragon", "Electro Giant", "Electro Spirit", "Electro Wizard",
  "Elite Barbarians", "Elixir Golem", "Executioner", "Fire Spirit", "Fireball",
  "Firecracker", "Fisherman", "Flying Machine", "Freeze", "Furnace",
  "Giant", "Giant Skeleton", "Goblin Barrel", "Goblin Cage", "Goblin Drill",
  "Goblin Gang", "Goblin Giant", "Goblin Hut", "Goblins", "Golden Knight",
  "Golem", "Graveyard", "Guards", "Heal Spirit", "Hog Rider", "Hunter",
  "Ice Golem", "Ice Spirit", "Ice Wizard", "Inferno Dragon", "Inferno Tower",
  "Knight", "Lava Hound", "Lightning", "Log", "Lumberjack", "Magic Archer",
  "Mega Knight", "Mega Minion", "Mighty Miner", "Miner", "Mini Pekka",
  "Minion Horde", "Minions", "Mirror", "Mortar", "Mother Witch", "Musketeer",
  "Night Witch", "No Card", "Pekka", "Phoenix", "Poison", "Prince", "Princess",
  "Rage", "Ram Rider", "Rascals", "Rocket", "Royal Delivery", "Royal Ghost",
  "Royal Giant", "Royal Hogs", "Royal Recruits", "Skeleton Army", "Skeleton Barrel",
  "Skeleton Dragons", "Skeleton King", "Skeletons", "Sparky", "Spear Goblins",
  "Tesla", "Three Musketeers", "Tornado", "Valkyrie", "Wall Breakers",
  "Witch", "Wizard", "X-Bow", "Zap", "Zappies",
  "Baby Dragon (Evo)", "Bomber (Evo)", "Cannon (Evo)", "Dart Goblin (Evo)",
  "Executioner (Evo)", "Furnace (Evo)", "Goblin Barrel (Evo)", "Goblin Cage (Evo)",
  "Goblin Drill (Evo)", "Goblin Giant (Evo)", "Ice Spirit (Evo)",
  "Inferno Dragon (Evo)", "Lumberjack (Evo)", "Mega Knight (Evo)",
  "Musketeer (Evo)", "P.E.K.K.A (Evo)", "Royal Ghost (Evo)", "Royal Hogs (Evo)",
  "Skeleton Army (Evo)", "Skeleton Barrel (Evo)", "Giant Snowball (Evo)",
  "Tesla (Evo)", "Valkyrie (Evo)", "Wall Breakers (Evo)", "Witch (Evo)",
  "Wizard (Evo)", "Zap (Evo)",
  "Archers", "Barbarian Hut", "Barbarian Launcher", "Beserker", "Bomb Tower",
  "Boss Bandit", "Elixir Collector", "Fire Spirits", "Giant Snowball",
  "Goblin Demolisher", "Goblin Machine", "Goblinstein", "Heal", "Little Prince",
  "Monk", "Party Hut", "Party Rocket", "Raging Prince", "Rune Giant",
  "Santa Hog Rider", "Super Archers", "Super Hog Rider", "Super Ice Golem",
  "Super Lava Hound", "Super Magic Archer", "Super Mini Pekka", "Super Witch",
  "Suspicious Bush", "Terry", "Tombstone", "Vines", "Void", "Warmth",
  "Archers (Evo)", "Barbarians (Evo)", "Bats (Evo)", "Battle Ram (Evo)",
  "Electro Dragon (Evo)", "Firecracker (Evo)", "Hunter (Evo)", "Knight (Evo)",
  "Mortar (Evo)", "Royal Giant (Evo)", "Royal Recruits (Evo)", "Skeletons (Evo)",
  "Megaknight (Evo)", "Snowball (Evo)",
];
