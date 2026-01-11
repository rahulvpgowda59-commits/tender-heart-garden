import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type HelpRequestType = 'just_needed_to_write' | 'maybe_later' | 'yes_need_help';

interface HelpRequestProps {
  selected: HelpRequestType | null;
  onSelect: (type: HelpRequestType) => void;
}

const options: { type: HelpRequestType; label: string; emoji: string }[] = [
  { type: 'just_needed_to_write', label: 'Just needed to write', emoji: '✍️' },
  { type: 'maybe_later', label: 'Maybe later', emoji: '🌿' },
  { type: 'yes_need_help', label: 'Yes, I might need help', emoji: '🤍' },
];

export function HelpRequest({ selected, onSelect }: HelpRequestProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      <h3 className="text-xl md:text-2xl font-display text-center text-foreground/80">
        Would you like help in any way?
      </h3>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(option.type)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all duration-300 btn-gentle",
              selected === option.type
                ? "bg-lavender-light border-lavender shadow-glow"
                : "bg-card border-border hover:border-lavender/50"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{option.emoji}</span>
              <span className="font-medium text-foreground/80">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        This doesn't create any obligation. It's just for you.
      </p>
    </motion.div>
  );
}
