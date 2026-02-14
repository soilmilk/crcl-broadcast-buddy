import { useParams } from "react-router-dom";
import { useMatchData } from "@/hooks/useMatchData";
import PlayerPanel from "@/components/overlay/PlayerPanel";
import TopBar from "@/components/overlay/TopBar";
import CrownTracker from "@/components/overlay/CrownTracker";

export default function Overlay() {
  const { matchId } = useParams<{ matchId: string }>();
  const { data, loading } = useMatchData(matchId || "default");

  if (loading) return null;

  return (
    <div
      className="w-[1920px] h-[1080px] relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Top Center Bar */}
      <TopBar
        matchTitle={`${data.matchTitle} — Bo${data.bestOf}`}
        matchNumber={data.matchNumber}
        day={data.day}
        isLive={data.isLive}
        isOvertime={data.isOvertime}
      />

      {/* Left Panel - Red Side */}
      <div className="absolute left-0 top-0 h-full">
        <PlayerPanel player={data.player1} side="left" />
      </div>

      {/* Right Panel - Blue Side */}
      <div className="absolute right-[80px] top-0 h-full">
        <PlayerPanel player={data.player2} side="right" />
      </div>

      {/* Crown Tracker - Far Right */}
      <div className="absolute right-0 top-0 h-full w-[80px] esports-panel border-l-2 border-crcl-gold/30 flex flex-col items-center justify-center gap-3 py-4">
        <span className="font-display text-xs uppercase tracking-widest text-crcl-gold font-bold writing-vertical rotate-180"
          style={{ writingMode: "vertical-lr" }}>
          MATCH {data.matchNumber}
        </span>
        <span className="font-display text-lg uppercase tracking-wider text-crcl-gold font-bold">
          DAY {data.day}
        </span>
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          {Array.from({ length: data.bestOf }).map((_, i) => {
            const p1Won = i < data.player1.score;
            const p2Won = i < data.player2.score;
            const filled = p1Won || p2Won;
            return (
              <div
                key={i}
                className={`w-10 h-12 flex items-center justify-center transition-all duration-300 ${
                  filled ? "crown-filled" : "crown-empty"
                }`}
              >
                <svg width="28" height="24" viewBox="0 0 24 20" fill="currentColor">
                  <path d="M2 16L0 6L6 10L12 2L18 10L24 6L22 16H2Z" />
                  <rect x="2" y="17" width="20" height="3" rx="1" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>

      {/* CRCL Branding Watermark */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <span className="font-display text-sm uppercase tracking-[0.3em] text-foreground/10 font-bold">
          CLASH ROYALE COLLEGIATE LEAGUE
        </span>
      </div>
    </div>
  );
}
