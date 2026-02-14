import { motion } from "framer-motion";

interface TopBarProps {
  matchTitle: string;
  matchNumber: number;
  day: number;
  isLive: boolean;
  isOvertime: boolean;
}

export default function TopBar({ matchTitle, matchNumber, day, isLive, isOvertime }: TopBarProps) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
      {/* Match Info */}
      <div className="esports-panel px-6 py-2 flex items-center gap-4 border-b-2 border-crcl-gold/50">
        <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
          {matchTitle} — Bo{matchNumber > 0 ? "" : ""}
        </span>
        <div className="w-px h-6 bg-foreground/20" />
        <span className="font-display text-sm uppercase tracking-widest text-crcl-gold font-bold">
          MATCH {matchNumber}
        </span>
        <div className="w-px h-6 bg-foreground/20" />
        <span className="font-display text-sm uppercase tracking-widest text-foreground/70 font-bold">
          DAY {day}
        </span>
        {isLive && (
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-2 h-2 rounded-full bg-crcl-red live-pulse" />
            <span className="font-display text-xs uppercase tracking-widest text-crcl-red font-bold">
              LIVE
            </span>
          </div>
        )}
        {isOvertime && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-2 px-2 py-0.5 bg-crcl-gold text-accent-foreground font-display text-xs font-bold uppercase rounded-sm"
          >
            OVERTIME
          </motion.div>
        )}
      </div>
    </div>
  );
}
