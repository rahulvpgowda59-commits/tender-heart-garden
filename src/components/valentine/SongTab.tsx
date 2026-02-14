import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import romanticImage from '@/assets/romantic-song.jpg';

const lyrics = [
  { time: 0, text: "🎵" },
];

export const SongTab = () => {
  const [playing, setPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/standing-by-you.mp3');
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false);
        setCurrentLyricIndex(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      });
    }

    if (playing) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      intervalRef.current = window.setInterval(() => {
        if (!audioRef.current) return;
        const currentTime = audioRef.current.currentTime;
        let idx = 0;
        for (let i = lyrics.length - 1; i >= 0; i--) {
          if (currentTime >= lyrics[i].time) {
            idx = i;
            break;
          }
        }
        setCurrentLyricIndex(idx);
      }, 300);
    }
    setPlaying(!playing);
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
        "Tap the image to play our song 💕"
      </p>

      <div className="glass-card rounded-3xl overflow-hidden">
        {/* Image with lyrics overlay */}
        <div className="relative cursor-pointer group" onClick={togglePlay}>
          <img
            src={romanticImage}
            alt="Romantic sunset silhouette"
            className="w-full h-80 md:h-[28rem] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Play/Pause indicator */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-lg">{playing ? '⏸' : '▶️'}</span>
          </motion.div>

          {/* Lyrics display on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentLyricIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-display text-white text-lg md:text-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-relaxed"
              >
                {lyrics[currentLyricIndex].text}
              </motion.p>
            </AnimatePresence>

            {playing && (
              <motion.div
                className="flex justify-center gap-1 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white/80 rounded-full"
                    animate={{ height: [8, 20, 8] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Song title */}
          <div className="absolute top-4 left-4">
            <span className="font-display text-white/80 text-sm md:text-base drop-shadow-lg">
              🎵 Standing By You — Nish
            </span>
          </div>
        </div>

        {/* Tap to play hint */}
        {!playing && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="py-4 font-body text-rose-500 text-sm"
          >
            Tap the image to play our song 💕
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
