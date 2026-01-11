import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type MoodType = 'happy' | 'tired' | 'overthinking' | 'hurt' | 'hopeful' | 'quiet';

interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
}

const moods: MoodOption[] = [
  { type: 'happy', emoji: '🌸', label: 'Happy', color: 'bg-blush-light hover:bg-blush border-blush' },
  { type: 'tired', emoji: '🌙', label: 'Tired', color: 'bg-lavender-light hover:bg-lavender border-lavender' },
  { type: 'overthinking', emoji: '💭', label: 'Overthinking', color: 'bg-moonlight hover:bg-moonlight-warm border-border' },
  { type: 'hurt', emoji: '💔', label: 'Hurt', color: 'bg-rose-mist hover:bg-blush border-blush-deep' },
  { type: 'hopeful', emoji: '🌈', label: 'Hopeful', color: 'bg-gold-soft hover:bg-accent border-gold-shimmer' },
  { type: 'quiet', emoji: '😶', label: 'Just quiet', color: 'bg-sage-gentle hover:bg-muted border-muted-foreground/20' },
];

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType | null) => void;
}

export function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-display text-center text-foreground/80">
        How are you feeling right now?
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onMoodSelect(selectedMood === mood.type ? null : mood.type)}
            className={cn(
              "relative p-6 rounded-2xl border-2 transition-all duration-300 btn-gentle",
              mood.color,
              selectedMood === mood.type 
                ? "ring-2 ring-primary ring-offset-2 scale-105 shadow-glow" 
                : "opacity-80 hover:opacity-100"
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl md:text-4xl">{mood.emoji}</span>
              <span className="text-sm md:text-base font-medium text-foreground/80">
                {mood.label}
              </span>
            </div>
            
            {selectedMood === mood.type && (
              <motion.div
                layoutId="mood-selected"
                className="absolute inset-0 rounded-2xl border-2 border-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <p className="text-center text-muted-foreground text-sm italic">
        This is optional — you can skip if you'd like.
      </p>
    </div>
  );
}
