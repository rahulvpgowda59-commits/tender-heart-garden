import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letters = [
  {
    title: 'Open when you miss me',
    emoji: '💭',
    message:
      "Close your eyes and breathe. I'm closer than you think — in every song that reminds you of us, in every quiet moment where your heart whispers my name. Distance is just space. What we have lives beyond it. I am yours, always.",
  },
  {
    title: 'Open when you feel insecure',
    emoji: '🤍',
    message:
      "Hey, look at me. You are not too much. You are not too little. You are exactly what I prayed for. I didn't choose you out of convenience — I chose you because my soul recognized yours. You are safe here. You will always be safe here.",
  },
  {
    title: 'Open when you doubt us',
    emoji: '🔒',
    message:
      "Doubt is normal. But let me remind you — I am not going anywhere. Not when it's hard, not when it's messy, not when the world gets loud. I chose you with my eyes wide open, and I would choose you again in every lifetime.",
  },
  {
    title: 'Open when you need reassurance',
    emoji: '🌹',
    message:
      "You are loved. Deeply, intentionally, and without condition. I don't love you because I need you — I love you because you make my world softer, brighter, and worth fighting for. You are my peace, my person, and my forever.",
  },
];

export const OpenWhenLetters = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 text-center mb-8">
        Open When...
      </h2>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {letters.map((letter, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full glass-card rounded-2xl px-6 py-5 text-left flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300 group"
            >
              <span className="text-2xl">{letter.emoji}</span>
              <span className="font-display text-lg text-rose-700 group-hover:text-rose-900 transition-colors">
                {letter.title}
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                className="ml-auto text-rose-400"
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-5 mt-1 rounded-2xl bg-white/30 backdrop-blur-md border border-rose-100/40">
                    <p className="text-rose-700 font-body leading-relaxed text-[15px]">
                      {letter.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
