import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  "Because your heart feels like home.",
  "Because you love me in a way that feels safe.",
  "Because you are kind in ways the world doesn't always see.",
  "Because your laugh is my favorite sound in the universe.",
  "Because you make the ordinary feel extraordinary.",
  "Because loving you taught me what peace feels like.",
  "Because you see me — the real me — and you stay.",
  "Because you make me want to be a better man every single day.",
  "Because with you, silence is never awkward — it's sacred.",
  "Because your presence alone calms every storm inside me.",
  "Because you believed in us when the world tried to make us doubt.",
  "Because you love with a strength most people will never understand.",
  "Because waking up knowing you're mine is the greatest gift.",
  "Because my future only makes sense with you in it.",
  "Because you are not just someone I love — you are someone I deeply respect.",
];

export const WhyILoveYou = () => {
  const [reason, setReason] = useState(reasons[0]);
  const [key, setKey] = useState(0);

  const generate = () => {
    let next: string;
    do {
      next = reasons[Math.floor(Math.random() * reasons.length)];
    } while (next === reason);
    setReason(next);
    setKey((k) => k + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-xl mx-auto"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-8">
        Why I Love You
      </h2>
      <div className="glass-card rounded-3xl px-8 py-10 mb-6 min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl md:text-2xl text-rose-700 italic"
          >
            "{reason}"
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={generate}
        className="glow-btn px-8 py-3 rounded-full font-body text-sm tracking-wide"
      >
        Tell me another reason 🤍
      </button>
    </motion.div>
  );
};
