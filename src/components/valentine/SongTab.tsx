import { useState } from 'react';
import { motion } from 'framer-motion';

export const SongTab = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      window.dispatchEvent(new Event('song-play'));
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      window.dispatchEvent(new Event('song-pause'));
    }
  };

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
            src="https://www.youtube.com/embed/yvRWjXEHPgs?enablejsapi=1"
            title="Our Song"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
            onLoad={(e) => {
              // Detect play/pause via focus heuristic
              const iframe = e.currentTarget;
              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (!entry.isIntersecting && isPlaying) {
                      handlePause();
                    }
                  });
                },
                { threshold: 0.5 }
              );
              observer.observe(iframe);
            }}
          />
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="glow-btn px-6 py-2 rounded-full font-body text-sm"
          >
            ▶ Play Our Song
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePause}
            className="px-6 py-2 rounded-full font-body text-sm border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            ⏸ Pause
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
