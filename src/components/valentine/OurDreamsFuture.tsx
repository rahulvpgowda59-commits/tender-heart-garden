import { motion } from 'framer-motion';

const dreams = [
  {
    title: 'Our First Home',
    description: 'A place that smells like us — filled with laughter, late-night talks, and love in every corner.',
    emoji: '🏡',
  },
  {
    title: 'Travel the World Together',
    description: 'Every sunset in a new city, every adventure with your hand in mine.',
    emoji: '✈️',
  },
  {
    title: 'Grow Old Together',
    description: 'I want wrinkles from all the years of smiling beside you.',
    emoji: '👴🏽👵🏽',
  },
  {
    title: 'Build Something Beautiful',
    description: 'A life so full of love that our story inspires others to believe in it too.',
    emoji: '🌟',
  },
];

export const OurDreamsFuture = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-4">
        Dreams I Have With You
      </h2>
      <p className="font-body text-rose-500 italic mb-10">
        "My future only makes sense if you're in it, Appi."
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {dreams.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl p-6 text-left"
          >
            <span className="text-3xl mb-3 block">{d.emoji}</span>
            <h3 className="font-display text-lg text-rose-800 mb-2">{d.title}</h3>
            <p className="font-body text-rose-600 text-sm leading-relaxed">{d.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
