import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useMatchData } from "@/hooks/useMatchData";
import { MatchData, CR_CARDS } from "@/lib/matchTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Player data organized by school
const PLAYERS_BY_SCHOOL = {
  "Stanford": [
    "ForçaChape❤You",
    "Davidodo",
    "ʀʏᴏ",
    "Master Oogway"
  ],
  "UIUC": [
    "ɳͥøͣọͫᶀęɏ",
    "Ian",
    "RaginAsian",
    "ChubbyMuffin",
    "Hassan75",
    "Bob"
  ],
  "NC State": [
    "Ayqi",
    "Rumz",
    "OHMS",
    "Ares1578",
    "Birdie"
  ],
  "Dakota State": [
    "King of Thieves",
    "Special Ace",
    "Sause",
    "RED RIPPER",
    "Crew",
    "hittu"
  ],
  "UF": [
    "Zenix✨惹糠",
    "Azir",
    "picpenguin",
    "WaffleBoi",
    "#Megaboss- $"
  ],
  "ASU": [
    "Daniel",
    "⚡️ Kaio-Ken ❄️",
    "Durian",
    "♣️ WILL",
    "Flying Balloon",
    "Gray"
  ],
  "UT": [
    "ále❤️naomi",
    "✨Justina Xie✨",
    "ssophiee",
    "Doom Blade",
    "Buff Miner",
    "Bwu"
  ],
  "UofR": [
    "PANcakes",
    "Phoenix",
    "Acid",
    "2Crazyperson",
    "James",
    "vanillaLand"
  ]
};

// Create flat list of players with school info
const ALL_PLAYERS = Object.entries(PLAYERS_BY_SCHOOL).flatMap(([school, players]) =>
  players.map(player => ({ name: player, school }))
);

// Helper to find player by name
function findPlayer(playerName: string) {
  return ALL_PLAYERS.find(p => p.name === playerName);
}

// Helper to get display value for current selection
function getPlayerDisplayValue(playerName: string, playerSchool: string) {
  if (!playerName || !playerSchool) return "";
  return `${playerName} (${playerSchool})`;
}

function CardSelect({
  value,
  onValueChange,
  triggerClassName,
}: {
  value: string;
  onValueChange: (value: string) => void;
  triggerClassName?: string;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCards = useMemo(() => {
    if (!normalizedQuery) return CR_CARDS;
    return CR_CARDS.filter((card) => card.toLowerCase().includes(normalizedQuery));
  }, [normalizedQuery]);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (!open) setQuery("");
      }}
    >
      <SelectTrigger className={triggerClassName}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        <div className="p-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cards..."
            className="h-8 bg-white text-black placeholder:text-gray-400"
            onKeyDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
        {filteredCards.length === 0 ? (
          <div className="px-3 py-2 text-xs text-muted-foreground">No results</div>
        ) : (
          filteredCards.map((card) => (
            <SelectItem key={card} value={card}>
              {card}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

function PlayerSelect({
  playerName,
  playerSchool,
  onPlayerChange,
}: {
  playerName: string;
  playerSchool: string;
  onPlayerChange: (name: string, school: string) => void;
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  
  const filteredPlayers = useMemo(() => {
    if (!normalizedQuery) return ALL_PLAYERS;
    return ALL_PLAYERS.filter(
      (player) =>
        player.name.toLowerCase().includes(normalizedQuery) ||
        player.school.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  // Create a unique value for the current selection
  const currentValue = playerName && playerSchool 
    ? `${playerName}::${playerSchool}` 
    : "";

  const handleValueChange = (value: string) => {
    const [name, school] = value.split("::");
    onPlayerChange(name, school);
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleValueChange}
      onOpenChange={(open) => {
        if (!open) setQuery("");
      }}
    >
      <SelectTrigger className="bg-white text-black">
        <SelectValue placeholder="Select a player..." />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        <div className="p-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players or schools..."
            className="h-8 bg-white text-black placeholder:text-gray-400"
            onKeyDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          />
        </div>
        {filteredPlayers.length === 0 ? (
          <div className="px-3 py-2 text-xs text-muted-foreground">No results</div>
        ) : (
          Object.entries(PLAYERS_BY_SCHOOL).map(([school, players]) => (
            <div key={school}>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase sticky top-0 bg-popover">
                {school}
              </div>
              {players
                .filter(player => {
                  const playerData = findPlayer(player);
                  return playerData && filteredPlayers.includes(playerData);
                })
                .map((player) => {
                  const value = `${player}::${school}`;
                  return (
                    <SelectItem key={value} value={value} className="pl-6">
                      {player}
                    </SelectItem>
                  );
                })}
            </div>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

export default function Admin() {
  const { matchId } = useParams<{ matchId: string }>();
  const { data, loading, updateMatch } = useMatchData(matchId || "default");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="font-display text-xl text-foreground/50">LOADING...</span>
      </div>
    );
  }

  const update = (partial: Partial<MatchData>) => {
    updateMatch({ ...data, ...partial });
  };

  const updatePlayer = (side: "player1" | "player2", partial: Partial<MatchData["player1"]>) => {
    updateMatch({ ...data, [side]: { ...data[side], ...partial } });
  };

  const updateDeckCard = (side: "player1" | "player2", index: number, card: string) => {
    const newDeck = [...data[side].deck];
    newDeck[index] = card;
    updatePlayer(side, { deck: newDeck });
  };

  const resetDeck = (side: "player1" | "player2") => {
    const emptyDeck = Array(8).fill("No Card");
    updatePlayer(side, { deck: emptyDeck });
  };

  const handlePlayerSelect = (side: "player1" | "player2", name: string, school: string) => {
    updatePlayer(side, { name, school });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-foreground">
            CRCL ADMIN PANEL
          </h1>
          <p className="text-muted-foreground mt-1">
            Match ID: <code className="text-crcl-gold">{matchId}</code>
          </p>
        </div>

        {/* Match Settings */}
        <div className="esports-panel p-6 mb-6 border border-border rounded">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider text-crcl-gold mb-4">
            MATCH SETTINGS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Match Title</Label>
              <Input
                value={data.matchTitle}
                onChange={(e) => update({ matchTitle: e.target.value })}
                className="bg-white text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Match #</Label>
              <Input
                type="number"
                value={data.matchNumber}
                onChange={(e) => update({ matchNumber: parseInt(e.target.value) || 0 })}
                className="bg-white text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Day</Label>
              <Input
                type="number"
                value={data.day}
                onChange={(e) => update({ day: parseInt(e.target.value) || 0 })}
                className="bg-white text-black placeholder:text-gray-400"
              />
            </div>
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Best Of</Label>
              <Select
                value={String(data.bestOf)}
                onValueChange={(v) => update({ bestOf: parseInt(v) as 3 | 5 })}
              >
                <SelectTrigger className="bg-crcl-dark-3 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">Bo3</SelectItem>
                  <SelectItem value="5">Bo5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Switch checked={data.isLive} onCheckedChange={(v) => update({ isLive: v })} />
              <Label className="font-display text-xs uppercase">Live</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={data.isOvertime} onCheckedChange={(v) => update({ isOvertime: v })} />
              <Label className="font-display text-xs uppercase">Overtime</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={data.showCameraFrames} onCheckedChange={(v) => update({ showCameraFrames: v })} />
              <Label className="font-display text-xs uppercase">Camera Frames</Label>
            </div>
          </div>
        </div>

        {/* Player Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["player1", "player2"] as const).map((side) => {
            const player = data[side];
            const isLeft = side === "player1";
            const color = isLeft ? "crcl-red" : "crcl-blue";
            const headerClass = isLeft ? "red-header" : "blue-header";

            return (
              <div key={side} className="esports-panel border border-border rounded overflow-hidden">
                <div className={`${headerClass} px-6 py-3`}>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                    {isLeft ? "PLAYER 1 (RED)" : "PLAYER 2 (BLUE)"}
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <Label className="font-display text-xs uppercase tracking-wider">Player</Label>
                    <PlayerSelect
                      playerName={player.name}
                      playerSchool={player.school}
                      onPlayerChange={(name, school) => handlePlayerSelect(side, name, school)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-display text-xs uppercase tracking-wider">Player Score</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePlayer(side, { score: Math.max(0, player.score - 1) })}
                          className="border-border"
                        >
                          −
                        </Button>
                        <span className="font-display text-2xl font-bold text-crcl-gold w-12 text-center">
                          {player.score}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePlayer(side, { score: player.score + 1 })}
                          className="border-border"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="font-display text-xs uppercase tracking-wider">School Score</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePlayer(side, { winPercentage: Math.max(0, player.winPercentage - 1) })}
                          className="border-border"
                        >
                          −
                        </Button>
                        <span className="font-display text-2xl font-bold text-crcl-gold w-12 text-center">
                          {player.winPercentage}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePlayer(side, { winPercentage: Math.min(100, player.winPercentage + 1) })}
                          className="border-border"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="font-display text-xs uppercase tracking-wider">Favorite Card</Label>
                    <CardSelect
                      value={player.favoriteCard}
                      onValueChange={(v) => updatePlayer(side, { favoriteCard: v })}
                    />
                  </div>
                  <div>
                    <Label className="font-display text-xs uppercase tracking-wider mb-2 block">Deck (8 Cards)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {player.deck.map((card, i) => (
                        <CardSelect
                          key={i}
                          value={card}
                          onValueChange={(v) => updateDeckCard(side, i, v)}
                          triggerClassName="bg-crcl-dark-3 border-border text-xs h-8"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="esports-panel p-6 mt-6 border border-border rounded">
          <h2 className="font-display text-xl font-bold uppercase tracking-wider text-crcl-gold mb-4">
            QUICK ACTIONS
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="destructive"
              onClick={() => {
                updatePlayer("player1", { score: 0 });
                updatePlayer("player2", { score: 0 });
              }}
              className="font-display uppercase"
            >
              Reset Scores
            </Button>
            <Button
              variant="outline"
              onClick={() => update({ isOvertime: !data.isOvertime })}
              className="font-display uppercase border-crcl-gold text-crcl-gold"
            >
              Toggle Overtime
            </Button>
            <Button
              variant="outline"
              onClick={() => resetDeck("player1")}
              className="font-display uppercase border-crcl-gold text-crcl-gold"
            >
              Reset Deck 1
            </Button>
            <Button
              variant="outline"
              onClick={() => resetDeck("player2")}
              className="font-display uppercase border-crcl-gold text-crcl-gold"
            >
              Reset Deck 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}