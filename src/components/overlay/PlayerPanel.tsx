import { motion, AnimatePresence } from "framer-motion";
import { PlayerData } from "@/lib/matchTypes";

interface PlayerPanelProps {
  player: PlayerData;
  side: "left" | "right";
}

export default function PlayerPanel({ player, side }: PlayerPanelProps) {
  const isLeft = side === "left";
  const panelClass = isLeft ? "panel-red" : "panel-blue";
  const headerClass = isLeft ? "red-header" : "blue-header";
  const borderSide = isLeft ? "border-l-4 border-crcl-red" : "border-r-4 border-crcl-blue";

  return (
    <div className={`w-[400px] h-full flex flex-col gap-2 p-3 ${panelClass} esports-panel`}>
      {/* Player Name */}
      <div className={`${headerClass} px-4 py-3 relative overflow-hidden`}>
        <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
          {player.name}
        </h2>
        <p className="font-display text-xs uppercase tracking-widest text-foreground/70 mt-0.5">
          {player.school}
        </p>
      </div>

      {/* Score */}
      <div className={`${borderSide} bg-crcl-dark-2 px-4 py-3 flex items-center justify-between`}>
        <span className="font-display text-sm uppercase tracking-wider text-foreground/60">SCORE</span>
        <motion.span
          key={player.score}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="font-display text-4xl font-bold gold-glow"
        >
          {player.score}
        </motion.span>
      </div>

      {/* Favorite Card */}
      <div className={`${borderSide} bg-crcl-dark-2 px-4 py-2`}>
        <span className="font-display text-xs uppercase tracking-widest text-foreground/50 block mb-2">
          FAVORITE CARD
        </span>
        <div className="flex items-center gap-3">
          <div className="w-16 h-20 bg-crcl-dark-3 rounded border-2 border-crcl-gold/30 flex items-center justify-center">
            <span className="text-2xl">👑</span>
          </div>
          <span className="font-display text-lg font-bold uppercase text-foreground">
            {player.favoriteCard}
          </span>
        </div>
      </div>

      {/* Deck Grid */}
      <div className={`${borderSide} bg-crcl-dark-2 px-4 py-2 flex-1`}>
        <span className="font-display text-xs uppercase tracking-widest text-foreground/50 block mb-2">
          DECK
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          <AnimatePresence>
            {player.deck.map((card, i) => (
              <motion.div
                key={`${card}-${i}`}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="bg-crcl-dark-3 border border-foreground/10 rounded-sm p-1.5 text-center"
              >
                <div className="w-full aspect-square bg-crcl-dark-1 rounded-sm flex items-center justify-center mb-1">
                  <span className="text-lg">⚔️</span>
                </div>
                <span className="font-display text-[8px] uppercase leading-tight text-foreground/70 block truncate">
                  {card}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Win Percentage */}
      <div className={`${borderSide} bg-crcl-dark-2 px-4 py-3 flex items-center justify-between`}>
        <span className="font-display text-sm uppercase tracking-wider text-foreground/60">WIN %</span>
        <span className="font-display text-3xl font-bold text-foreground">
          {player.winPercentage}%
        </span>
      </div>
    </div>
  );
}
