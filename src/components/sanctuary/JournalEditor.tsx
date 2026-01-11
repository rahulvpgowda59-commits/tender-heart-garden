import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { isNightTime } from '@/lib/timeMode';
import { cn } from '@/lib/utils';
import type { MoodType } from './MoodSelector';

interface JournalEntry {
  thoughts_on_mind: string;
  sweet_moments: string;
  things_that_hurt: string;
  night_reflection: string;
  letter_to_self: string;
  mood_intensity: number | null;
}

interface JournalEditorProps {
  entry: JournalEntry;
  mood: MoodType | null;
  onChange: (entry: JournalEntry) => void;
  onAutoSave?: () => void;
}

export function JournalEditor({ entry, mood, onChange, onAutoSave }: JournalEditorProps) {
  const [showNightReflection, setShowNightReflection] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  useEffect(() => {
    setShowNightReflection(isNightTime());
  }, []);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'idle') return;
      setSaveStatus('saving');
      onAutoSave?.();
      setTimeout(() => setSaveStatus('saved'), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [entry, onAutoSave, saveStatus]);

  const handleChange = (field: keyof JournalEntry, value: string | number | null) => {
    setSaveStatus('idle');
    onChange({ ...entry, [field]: value });
  };

  const showIntensitySlider = mood === 'hurt' || mood === 'tired' || mood === 'overthinking';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      {/* Auto-save indicator */}
      <div className="text-right">
        <span className={cn(
          "text-xs transition-opacity duration-300",
          saveStatus === 'saving' ? "text-muted-foreground" : 
          saveStatus === 'saved' ? "text-lavender-deep" : "opacity-0"
        )}>
          {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : ''}
        </span>
      </div>

      {/* Mood Intensity Slider */}
      {showIntensitySlider && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="card-sanctuary"
        >
          <label className="block text-sm font-medium text-muted-foreground mb-4">
            How intense does this feeling feel? (optional)
          </label>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">1</span>
            <Slider
              value={entry.mood_intensity ? [entry.mood_intensity] : [5]}
              onValueChange={(value) => handleChange('mood_intensity', value[0])}
              max={10}
              min={1}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">10</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center italic">
            This helps understand without needing words
          </p>
        </motion.div>
      )}

      {/* What's on your mind */}
      <div className="card-sanctuary">
        <label className="block text-lg font-display text-foreground/80 mb-3">
          What's on your mind? 💭
        </label>
        <Textarea
          value={entry.thoughts_on_mind}
          onChange={(e) => handleChange('thoughts_on_mind', e.target.value)}
          placeholder="Write freely... there's no wrong way to feel."
          className="min-h-[150px] bg-transparent border-0 border-b border-border/50 rounded-none focus:ring-0 focus:border-lavender resize-none font-display italic text-lg leading-relaxed placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Sweet moments */}
      <div className="card-sanctuary">
        <label className="block text-lg font-display text-foreground/80 mb-3">
          Sweet moments from today 🤍
        </label>
        <Textarea
          value={entry.sweet_moments}
          onChange={(e) => handleChange('sweet_moments', e.target.value)}
          placeholder="Even the smallest light counts..."
          className="min-h-[120px] bg-transparent border-0 border-b border-border/50 rounded-none focus:ring-0 focus:border-blush resize-none font-display italic text-lg leading-relaxed placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Things that hurt */}
      <div className="card-sanctuary">
        <label className="block text-lg font-display text-foreground/80 mb-3">
          Things that hurt today… 💔
        </label>
        <Textarea
          value={entry.things_that_hurt}
          onChange={(e) => handleChange('things_that_hurt', e.target.value)}
          placeholder="This is a safe space for your pain too..."
          className="min-h-[120px] bg-transparent border-0 border-b border-border/50 rounded-none focus:ring-0 focus:border-rose-mist resize-none font-display italic text-lg leading-relaxed placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Night Reflection - only after 9 PM */}
      {showNightReflection && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-sanctuary bg-gradient-to-br from-lavender-light/50 to-moonlight"
        >
          <label className="block text-lg font-display text-foreground/80 mb-3">
            What are you carrying into tomorrow? 🌙
          </label>
          <Textarea
            value={entry.night_reflection}
            onChange={(e) => handleChange('night_reflection', e.target.value)}
            placeholder="A gentle reflection before rest..."
            className="min-h-[100px] bg-transparent border-0 border-b border-lavender/30 rounded-none focus:ring-0 focus:border-lavender resize-none font-display italic text-lg leading-relaxed placeholder:text-muted-foreground/50"
          />
        </motion.div>
      )}

      {/* Letter to Self - Private Forever */}
      <div className="card-sanctuary border-2 border-dashed border-gold-soft bg-gradient-to-br from-moonlight-warm/50 to-gold-soft/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🔐</span>
          <label className="text-lg font-display text-foreground/80">
            Letter to Myself
          </label>
          <span className="text-xs bg-gold-soft text-accent-foreground px-2 py-0.5 rounded-full">
            Private forever
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 italic">
          This will never be shared with anyone. Only for you.
        </p>
        <Textarea
          value={entry.letter_to_self}
          onChange={(e) => handleChange('letter_to_self', e.target.value)}
          placeholder="What do you need to tell yourself? What do you deserve? What do you forgive yourself for?"
          className="min-h-[120px] bg-transparent border-0 border-b border-gold-soft/50 rounded-none focus:ring-0 focus:border-gold-shimmer resize-none font-display italic text-lg leading-relaxed placeholder:text-muted-foreground/50"
        />
      </div>
    </motion.div>
  );
}
