import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/timeMode';
import { supabase } from '@/integrations/supabase/client';

const fallbackMessages = [
  "Good morning, gentle soul.\nYou don't need to rush today. You are enough.",
  "Rise softly, dear one.\nThe world can wait while you find your center.",
  "A new day unfolds.\nTake it one breath at a time.",
  "Good morning, beautiful.\nYou deserve to start this day with kindness to yourself.",
  "The sun rises for you.\nThere's no wrong way to begin.",
  "Wake gently, dear heart.\nToday is a new page, write it with love.",
  "Good morning, princess.\nYour worth isn't measured by your productivity.",
  "Another day to simply be.\nThat's more than enough.",
];

export function MorningMode() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await supabase
          .from('morning_messages')
          .select('message')
          .eq('date', today.toISOString().split('T')[0])
          .maybeSingle();

        if (data?.message) {
          setMessage(data.message);
        } else {
          // Use a fallback message
          const randomMessage = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
          setMessage(randomMessage);
        }
      } catch (err) {
        const randomMessage = fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)];
        setMessage(randomMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen morning-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gold-soft/40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-10 w-24 h-24 rounded-full bg-blush/30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 left-20 w-16 h-16 rounded-full bg-lavender-light/50"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8 text-sm tracking-widest uppercase"
        >
          {formatDate(today)}
        </motion.p>

        {/* Decorative flower */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <span className="text-6xl">🌸</span>
        </motion.div>

        {/* Message */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-display italic text-foreground/80 leading-relaxed whitespace-pre-line"
          >
            {message}
          </motion.p>
        )}

        {/* Subtle reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-muted-foreground/70"
        >
          Morning is for grounding. Journaling opens at noon. 🌿
        </motion.p>
      </motion.div>
    </div>
  );
}
