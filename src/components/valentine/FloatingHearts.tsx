import { motion } from 'framer-motion';
import { useMemo } from 'react';

export const FloatingHearts = () => {
  const hearts = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 10 + Math.random() * 16,
      opacity: 0.08 + Math.random() * 0.15,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-300"
          style={{ left: `${h.x}%`, fontSize: h.size, opacity: h.opacity }}
          animate={{
            y: [window.innerHeight + 50, -100],
            x: [0, Math.sin(h.id) * 30],
            rotate: [0, 360],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};
