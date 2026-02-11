import { motion } from 'framer-motion';
import { useMemo } from 'react';

export const ConfettiHearts = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 80,
        endY: -(100 + Math.random() * 300),
        endX: (Math.random() - 0.5) * 200,
        size: 12 + Math.random() * 14,
        delay: Math.random() * 0.6,
        duration: 1.5 + Math.random() * 1.5,
      })),
    []
  );

  return (
    <div className="relative w-full h-40 overflow-visible">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-rose-400"
          style={{ left: `${p.x}%`, bottom: 0, fontSize: p.size }}
          initial={{ opacity: 1, y: 0, x: 0 }}
          whileInView={{
            opacity: [1, 1, 0],
            y: p.endY,
            x: p.endX,
            rotate: Math.random() * 360,
          }}
          viewport={{ once: true }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
};
