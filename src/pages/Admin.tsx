import { useParams } from "react-router-dom";
import { useMatchData } from "@/hooks/useMatchData";
import { MatchData, CR_CARDS } from "@/lib/matchTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
                className="bg-crcl-dark-3 border-border"
              />
            </div>
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Match #</Label>
              <Input
                type="number"
                value={data.matchNumber}
                onChange={(e) => update({ matchNumber: parseInt(e.target.value) || 0 })}
                className="bg-crcl-dark-3 border-border"
              />
            </div>
            <div>
              <Label className="font-display text-xs uppercase tracking-wider">Day</Label>
              <Input
                type="number"
                value={data.day}
                onChange={(e) => update({ day: parseInt(e.target.value) || 0 })}
                className="bg-crcl-dark-3 border-border"
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-display text-xs uppercase tracking-wider">Name</Label>
                      <Input
                        value={player.name}
                        onChange={(e) => updatePlayer(side, { name: e.target.value })}
                        className="bg-crcl-dark-3 border-border"
                      />
                    </div>
                    <div>
                      <Label className="font-display text-xs uppercase tracking-wider">School</Label>
                      <Input
                        value={player.school}
                        onChange={(e) => updatePlayer(side, { school: e.target.value })}
                        className="bg-crcl-dark-3 border-border"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-display text-xs uppercase tracking-wider">Score</Label>
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
                      <Label className="font-display text-xs uppercase tracking-wider">Win %</Label>
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        value={player.winPercentage}
                        onChange={(e) => updatePlayer(side, { winPercentage: parseInt(e.target.value) || 0 })}
                        className="bg-crcl-dark-3 border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="font-display text-xs uppercase tracking-wider">Favorite Card</Label>
                    <Select
                      value={player.favoriteCard}
                      onValueChange={(v) => updatePlayer(side, { favoriteCard: v })}
                    >
                      <SelectTrigger className="bg-crcl-dark-3 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {CR_CARDS.map((card) => (
                          <SelectItem key={card} value={card}>{card}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-display text-xs uppercase tracking-wider mb-2 block">Deck (8 Cards)</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {player.deck.map((card, i) => (
                        <Select
                          key={i}
                          value={card}
                          onValueChange={(v) => updateDeckCard(side, i, v)}
                        >
                          <SelectTrigger className="bg-crcl-dark-3 border-border text-xs h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {CR_CARDS.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
          </div>
        </div>
      </div>
    </div>
  );
}
