import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [matchId, setMatchId] = useState("match-1");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto p-8">
        <h1 className="font-display text-5xl font-bold uppercase tracking-wider text-foreground mb-2">
          CRCL
        </h1>
        <p className="font-display text-lg uppercase tracking-[0.3em] text-crcl-gold mb-8">
          Clash Royale Collegiate League
        </p>
        <p className="text-muted-foreground mb-6">
          Broadcast overlay system for collegiate Clash Royale matches.
        </p>

        <div className="esports-panel p-6 rounded border border-border space-y-4">
          <div>
            <label className="font-display text-xs uppercase tracking-wider text-foreground/60 block mb-2">
              Match ID
            </label>
            <Input
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
              className="bg-crcl-dark-3 border-border text-center font-display"
              placeholder="match-1"
            />
          </div>
          <div className="flex gap-3 justify-center">
            <Link to={`/overlay/${matchId}`}>
              <Button className="font-display uppercase tracking-wider bg-crcl-red hover:bg-crcl-red-dark">
                Open Overlay
              </Button>
            </Link>
            <Link to={`/admin/${matchId}`}>
              <Button variant="outline" className="font-display uppercase tracking-wider border-crcl-blue text-crcl-blue hover:bg-crcl-blue/10">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground space-y-1">
          <p>Overlay: Add as OBS Browser Source (1920×1080, transparent)</p>
          <p>Admin: Control match data in real-time</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
