import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type BookmarkType = 'mattered' | 'heavy' | 'gentle' | null;

interface BookmarkSelectorProps {
  selected: BookmarkType;
  onSelect: (bookmark: BookmarkType) => void;
}

const bookmarks: { type: BookmarkType; emoji: string; label: string }[] = [
  { type: 'mattered', emoji: '🤍', label: 'This day mattered' },
  { type: 'heavy', emoji: '🌙', label: 'This was heavy' },
  { type: 'gentle', emoji: '🌸', label: 'This was gentle' },
];

export function BookmarkSelector({ selected, onSelect }: BookmarkSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 max-w-lg mx-auto"
    >
      <h4 className="text-lg font-display text-center text-foreground/70">
        Mark this day (optional)
      </h4>

      <div className="flex flex-wrap justify-center gap-3">
        {bookmarks.map((bookmark) => (
          <motion.button
            key={bookmark.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(selected === bookmark.type ? null : bookmark.type)}
            className={cn(
              "px-4 py-2 rounded-full border-2 transition-all duration-300 flex items-center gap-2",
              selected === bookmark.type
                ? "bg-lavender-light border-lavender shadow-soft"
                : "bg-card border-border hover:border-lavender/50"
            )}
          >
            <span>{bookmark.emoji}</span>
            <span className="text-sm font-medium text-foreground/70">{bookmark.label}</span>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground italic">
        For your own reflection, not analysis
      </p>
    </motion.div>
  );
}
