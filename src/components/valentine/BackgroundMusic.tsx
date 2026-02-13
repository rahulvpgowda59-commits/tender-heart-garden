import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundMusic = () => {
  const [playing, setPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3'
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    return audioRef.current;
  };

  // Auto-play on first user interaction (browsers block autoplay without interaction)
  useEffect(() => {
    const startMusic = () => {
      if (!initialized) {
        const audio = getAudio();
        audio.play().then(() => {
          setPlaying(true);
          setInitialized(true);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', startMusic, { once: true });
    window.addEventListener('touchstart', startMusic, { once: true });
    window.addEventListener('scroll', startMusic, { once: true });

    return () => {
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
      window.removeEventListener('scroll', startMusic);
    };
  }, [initialized]);

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
    setInitialized(true);
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
