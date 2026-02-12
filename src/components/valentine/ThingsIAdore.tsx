import { motion } from 'framer-motion';

const adorableThings = [
  'The way you scrunch your nose when you laugh',
  'How you care so deeply, even when it hurts you',
  'The way you make everyone around you feel seen',
  'Your voice — especially when it is soft and sleepy',
  'How you love with your whole heart, never halfway',
  'The strength you carry that the world does not see',
  'Your stubbornness — because it means you never give up',
  'The way you look at me like I am enough',
  'How your presence alone makes everything feel okay',
];

export const ThingsIAdore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-xl mx-auto text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-4">
        Little Things I Adore About You
      </h2>
      <p className="font-body text-rose-500 italic mb-10">
        "It's never just the big things, Appi. It's everything."
      </p>
      <div className="space-y-3">
        {adorableThings.map((thing, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card rounded-full px-6 py-3"
          >
            <p className="font-body text-rose-700 text-sm">
              <span className="text-rose-400 mr-2">♡</span>
              {thing}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
