import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, CloudRain, Sun, Moon, Leaf } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];

interface HealingPaceIndicatorProps {
  entries: JournalEntry[];
}

export function HealingPaceIndicator({ entries }: HealingPaceIndicatorProps) {
  const insight = useMemo(() => {
    if (entries.length === 0) {
      return {
        message: "She's just beginning her journey.",
        icon: Leaf,
        color: 'text-lavender',
      };
    }

    const recentEntries = entries.slice(0, 7);
    const noWordsCount = recentEntries.filter(e => e.no_words_today).length;
    const hurtCount = recentEntries.filter(e => e.mood === 'hurt').length;
    const helpCount = recentEntries.filter(e => e.help_request === 'yes_need_help').length;
    const happyCount = recentEntries.filter(e => e.mood === 'happy' || e.mood === 'hopeful').length;
    const quietCount = recentEntries.filter(e => e.mood === 'quiet').length;
    const totalEntries = recentEntries.length;

    // Priority-based insight selection
    if (helpCount >= 2) {
      return {
        message: "She may need extra gentleness this week.",
        icon: Heart,
        color: 'text-blush',
      };
    }

    if (hurtCount >= 3) {
      return {
        message: "She's been carrying some weight lately.",
        icon: CloudRain,
        color: 'text-lavender-deep',
      };
    }

    if (noWordsCount >= 3) {
      return {
        message: "She's been resting more. That's okay.",
        icon: Moon,
        color: 'text-moonlight',
      };
    }

    if (happyCount >= 3) {
      return {
        message: "She's been feeling lighter lately. 🌸",
        icon: Sun,
        color: 'text-gold-soft',
      };
    }

    if (quietCount >= 2) {
      return {
        message: "She's been showing up quietly.",
        icon: Leaf,
        color: 'text-lavender',
      };
    }

    if (totalEntries >= 5) {
      return {
        message: "She's been consistent in her showing up.",
        icon: Heart,
        color: 'text-blush',
      };
    }

    return {
      message: "She's finding her rhythm.",
      icon: Leaf,
      color: 'text-lavender',
    };
  }, [entries]);

  const IconComponent = insight.icon;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-lavender/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Leaf className="w-4 h-4" />
          Healing Pace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconComponent className={`w-8 h-8 ${insight.color}`} />
          </motion.div>
          <p className="text-foreground/80 font-display text-lg italic">
            {insight.message}
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
