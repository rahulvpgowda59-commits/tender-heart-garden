import { motion } from 'framer-motion';

export const SongTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-4">
        Our Song 🎶
      </h2>
      <p className="font-body text-rose-500 italic mb-8">
        "Press play and think of us, Appi."
      </p>
      <div className="glass-card rounded-3xl p-4 overflow-hidden">
        <div className="aspect-video rounded-2xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/yvRWjXEHPgs"
            title="Our Song"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          />
        </div>
      </div>
    </motion.div>
  );
};
