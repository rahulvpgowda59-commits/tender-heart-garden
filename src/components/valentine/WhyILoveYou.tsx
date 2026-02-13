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
  "Because you make me feel like I belong somewhere.",
  "Because your voice is my favorite thing to hear before I sleep.",
  "Because you taught me that love doesn't have to hurt to be real.",
  "Because even on my worst days, you choose to stay.",
  "Because you make me believe I deserve to be loved this way.",
  "Because the way you care about the little things makes everything feel big.",
  "Because you hold my heart like it's the most precious thing in the world.",
  "Because you are my calm in a world full of noise.",
  "Because every prayer I ever whispered led me to you.",
  "Because you are the reason I smile without even realizing it.",
  "Because your love feels like coming home after the longest day.",
  "Because I never knew what forever meant until I met you.",
  "Because you love me even when I forget to love myself.",
  "Because you are the most beautiful thing that ever happened to my life.",
  "Because no matter how far apart we are, my heart always finds its way to you.",
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
