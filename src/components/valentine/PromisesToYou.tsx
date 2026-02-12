import { motion } from 'framer-motion';

const promises = [
  { emoji: '🤍', text: 'I promise to choose you, even on the hard days.' },
  { emoji: '🛡️', text: 'I promise to protect your heart like it is sacred.' },
  { emoji: '👂', text: 'I promise to listen — not just hear, but truly listen.' },
  { emoji: '🌅', text: 'I promise to grow with you, never apart from you.' },
  { emoji: '🏠', text: 'I promise to build a home with you — not just walls, but warmth.' },
  { emoji: '💪', text: 'I promise to stay, even when staying is hard.' },
  { emoji: '🌻', text: 'I promise to remind you of your worth on days you forget.' },
  { emoji: '🤲', text: 'I promise to never stop earning your trust.' },
];

export const PromisesToYou = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-4 text-center">
        My Promises to You
      </h2>
      <p className="font-body text-rose-500 italic mb-10 text-center">
        "Words are beautiful, but promises kept are everything."
      </p>
      <div className="grid gap-4">
        {promises.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4"
          >
            <span className="text-2xl flex-shrink-0">{p.emoji}</span>
            <p className="font-body text-rose-700 text-sm md:text-base">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
