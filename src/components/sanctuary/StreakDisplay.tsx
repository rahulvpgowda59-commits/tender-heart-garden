import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  totalDays: number;
}

export function StreakDisplay({ currentStreak, totalDays }: StreakDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-sage-gentle/30 border border-sage-gentle"
    >
      <Sprout className="w-5 h-5 text-lavender-deep" />
      <p className="text-sm text-foreground/70 font-medium">
        You've shown up for yourself{' '}
        <span className="text-lavender-deep font-semibold">{currentStreak}</span>
        {currentStreak === 1 ? ' day' : ' days'} 🌱
      </p>
    </motion.div>
  );
}
