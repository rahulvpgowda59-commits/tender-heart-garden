import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VirtualHug = () => {
  const [hugging, setHugging] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-6">
        When You Need Me Close
      </h2>
      <AnimatePresence mode="wait">
        {!hugging ? (
          <motion.div key="btn" exit={{ opacity: 0, scale: 0.8 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHugging(true)}
              className="glow-btn px-10 py-4 rounded-full font-body text-base"
            >
              Come Here 🤍
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="hug"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl px-8 py-12 max-w-lg mx-auto"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl block mb-6"
            >
              🫂
            </motion.span>
            <p className="font-display text-xl text-rose-700 italic leading-relaxed">
              "Close your eyes and imagine me holding you. That's how much you mean to me."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHugging(false)}
              className="glow-btn mt-6 px-8 py-3 rounded-full font-body text-sm tracking-wide"
            >
              I feel it 🤍
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
