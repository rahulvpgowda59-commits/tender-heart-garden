import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundMusic = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.pixabay.com/audio/2024/11/29/audio_d27e614372.mp3'
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-xl shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={playing ? 'pause' : 'play'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {playing ? '🎵' : '🔇'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
