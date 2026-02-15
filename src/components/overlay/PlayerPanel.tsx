import { motion, AnimatePresence } from "framer-motion";
import { PlayerData } from "@/lib/matchTypes";

interface PlayerPanelProps {
  player: PlayerData;
  side: "left" | "right";
}

function normalizeCardName(name: string) {
  // Handle "No Card" special case
  if (name === "No Card") {
    return "no-card";
  }

  // Handle other special cases
  const specialCases: Record<string, string> = {
    "Mini P.E.K.K.A": "mini-pekka",
    "P.E.K.K.A": "pekka",
    "The Log": "the-log",
    "Baby Dragon (Evo)": "baby-dragon-evo",
    "Bomber (Evo)": "bomber-evo",
    "Cannon (Evo)": "cannon-evo",
    "Dart Goblin (Evo)": "dart-goblin-evo",
    "Executioner (Evo)": "executioner-evo",
    "Furnace (Evo)": "furnace-evo",
    "Goblin Barrel (Evo)": "goblin-barrel-evo",
    "Goblin Cage (Evo)": "goblin-cage-evo",
    "Goblin Drill (Evo)": "goblin-drill-evo",
    "Goblin Giant (Evo)": "goblin-giant-evo",
    "Ice Spirit (Evo)": "ice-spirit-evo",
    "Inferno Dragon (Evo)": "inferno-dragon-evo",
    "Lumberjack (Evo)": "lumberjack-evo",
    "Mega Knight (Evo)": "megaknight-evo",
    "Musketeer (Evo)": "musketeer-evo",
    "P.E.K.K.A (Evo)": "pekka-evo",
    "Royal Ghost (Evo)": "royal-ghost-evo",
    "Royal Hogs (Evo)": "royal-hogs-evo",
    "Skeleton Army (Evo)": "skeleton-army-evo",
    "Skeleton Barrel (Evo)": "skeleton-barrel-evo",
    "Giant Snowball (Evo)": "snowball-evo",
    "Tesla (Evo)": "tesla-evo",
    "Valkyrie (Evo)": "valkyrie-evo",
    "Wall Breakers (Evo)": "wall-breakers-evo",
    "Witch (Evo)": "witch-evo",
    "Wizard (Evo)": "wizard-evo",
    "Zap (Evo)": "zap-evo",
  };

  if (specialCases[name]) {
    return specialCases[name];
  }

  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[']/g, "");
}

// Helper function to get school logo path
function getSchoolLogoPath(school: string): string {
  const schoolLogoMap: Record<string, string> = {
    "Stanford": "Stanford.avif",
    "UIUC": "Illinois.png",
    "NC State": "NC State.png",
    "Dakota State": "Dakota State.png",
    "UF": "uf.png",
    "ASU": "asu.png",
    "UT": "UT Austin.png",
    "UofR": "ufor.png",
  };

  const logoFile = schoolLogoMap[school] || null;
  if (!logoFile) return "";

  return `/images/school_logos/${logoFile}`;
}

export default function PlayerPanel({ player, side }: PlayerPanelProps) {
  const isLeft = side === "left";
  const panelClass = isLeft ? "panel-red" : "panel-blue";
  const headerClass = isLeft ? "red-header" : "blue-header";
  const borderSide = isLeft ? "border-l-4 border-crcl-red" : "border-r-4 border-crcl-blue";

  return (
    <>
      <style>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5),
                        0 0 10px rgba(255, 255, 255, 0.3),
                        0 0 15px rgba(255, 255, 255, 0.2),
                        inset 0 0 5px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.6),
                        0 0 30px rgba(255, 255, 255, 0.4),
                        inset 0 0 10px rgba(255, 255, 255, 0.2);
          }
        }
        .glowing-border {
          animation: glow 2s ease-in-out infinite;
          border: 2px solid rgba(255, 255, 255, 0.9);
        }
      `}</style>
      <div 
        className={`w-[400px] h-full flex flex-col gap-2 p-3 pb-0 ${panelClass} esports-panel relative bg-black`}
      >
        {/* Background overlay to reduce opacity and darken for text contrast */}
        <div 
          className="absolute inset-0 bg-black/40 z-0"
          style={{ opacity: 0.5 }}
        />

        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 flex flex-col gap-2 h-full">
          {/* Player Name */}
          <div className={`${headerClass} px-4 py-3 relative overflow-hidden`}>
            <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">
              {player.name}
            </h2>
            <p className="font-display text-xs uppercase tracking-widest text-white/90 mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">
              {player.school}
            </p>
          </div>

          {/* Player Score */}
          <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between`}>
            <span className="font-display text-sm uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">PLAYER SCORE</span>
            <motion.span
              key={player.score}
              initial={{ scale: 1.4 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="font-display text-4xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_3px_3px_6px_rgba(0,0,0,0.9)]"
              style={{ 
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9)"
              }}
            >
              {player.score}
            </motion.span>
          </div>

          {/* Facecam for Player 1 - Above Favorite Card */}
          {isLeft && (
            <div className={`${borderSide}  bg-crcl-dark-2/80 backdrop-blur-sm px-6 py-6 flex items-center justify-center`}>
              <div className="w-full aspect-video bg-crcl-dark-3 rounded glowing-border flex items-center justify-center">
                <span className="text-xs text-white/40 uppercase">Facecam</span>
              </div>
            </div>
          )}

          {/* Favorite Card */}
          <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-4 py-2`}>
            <span className="font-display text-xs uppercase tracking-widest text-white/90 block mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">
              FAVORITE CARD
            </span>
            <div className="flex items-center gap-3">
              <div className="w-16 h-20 border-crcl-gold/30 flex items-center justify-center overflow-hidden relative">
                <img
                  key={player.favoriteCard}
                  src={`/images/${normalizeCardName(player.favoriteCard)}.png`}
                  alt={player.favoriteCard}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/no-card.png";
                  }}
                />
              </div>
              <span className="font-display text-lg font-bold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">
                {player.favoriteCard}
              </span>
            </div>
          </div>

          {/* Deck Grid for Player 2 - Above Facecam */}
          {!isLeft && (
            <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-4 py-2`}>
              <span className="font-display text-xs uppercase tracking-widest text-white/90 block mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">
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
                      className="bg-crcl-dark-3 rounded-sm text-center overflow-hidden"
                    >
                      <img
                        src={`/images/${normalizeCardName(card)}.png`}
                        alt={card}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/no-card.png";
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Facecam for Player 2 - Below Deck */}
          {!isLeft && (
            <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-6 py-12 flex items-center justify-center`}>
              <div className="w-full aspect-video bg-crcl-dark-3 rounded glowing-border flex items-center justify-center">
                <span className="text-xs text-white/40 uppercase">Facecam</span>
              </div>
            </div>
          )}

          {/* Deck Grid for Player 1 - Below Facecam */}
          {isLeft && (
            <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-4 py-2`}>
              <span className="font-display text-xs uppercase tracking-widest text-white/90 block mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">
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
                      className="bg-crcl-dark-3 rounded-sm text-center overflow-hidden"
                    >
                      <img
                        src={`/images/${normalizeCardName(card)}.png`}
                        alt={card}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/images/no-card.png";
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Toggle Score with School Logo in the middle - Pushed to bottom */}
          <div className={`${borderSide} bg-crcl-dark-2/80 backdrop-blur-sm px-4 pt-3 pb-2 flex items-center justify-between relative mt-auto`}>
            <span className="font-display text-sm uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)]">Score</span>
            
            {/* School Logo in the middle - positioned at bottom */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex items-end justify-center">
              {getSchoolLogoPath(player.school) ? (
                <img
                  src={getSchoolLogoPath(player.school)}
                  alt={player.school}
                  className="max-h-32 max-w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-xs text-white/70 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{player.school}</span>
              )}
            </div>
            
            <span className="font-display text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">
              {player.winPercentage}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}