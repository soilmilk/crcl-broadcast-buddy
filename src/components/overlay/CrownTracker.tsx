import { motion, AnimatePresence } from "framer-motion";

interface CrownTrackerProps {
  bestOf: 3 | 5;
  player1Score: number;
  player2Score: number;
}

export default function CrownTracker({ bestOf, player1Score, player2Score }: CrownTrackerProps) {
  const games = bestOf === 3 ? 3 : 5;

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 pr-1">
      {/* Right side score tracker */}
      {Array.from({ length: games }).map((_, i) => {
        const p1Won = i < player1Score;
        const p2Won = i < player2Score;
        return (
          <div key={i} className="flex items-center gap-0.5">
            {/* P1 crown */}
            <AnimatePresence>
              <motion.div
                key={`p1-${i}-${p1Won}`}
                initial={p1Won ? { scale: 0 } : {}}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`w-8 h-8 flex items-center justify-center ${
                  p1Won
                    ? "text-crcl-gold drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
                    : "text-foreground/15"
                }`}
              >
                <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor">
                  <path d="M2 16L0 6L6 10L12 2L18 10L24 6L22 16H2Z" />
                  <rect x="2" y="17" width="20" height="3" rx="1" />
                </svg>
              </motion.div>
            </AnimatePresence>
            {/* P2 crown */}
            <AnimatePresence>
              <motion.div
                key={`p2-${i}-${p2Won}`}
                initial={p2Won ? { scale: 0 } : {}}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`w-8 h-8 flex items-center justify-center ${
                  p2Won
                    ? "text-crcl-gold drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]"
                    : "text-foreground/15"
                }`}
              >
                <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor">
                  <path d="M2 16L0 6L6 10L12 2L18 10L24 6L22 16H2Z" />
                  <rect x="2" y="17" width="20" height="3" rx="1" />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
