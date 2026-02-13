import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundMusic = () => {
  const [playing, setPlaying] = useState(false);
  const [pausedBySong, setPausedBySong] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3'
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

  // Listen for custom events from SongTab to pause/resume
  useEffect(() => {
    const handleSongPlay = () => {
      if (audioRef.current && playing) {
        audioRef.current.pause();
        setPausedBySong(true);
      }
    };
    const handleSongPause = () => {
      if (audioRef.current && pausedBySong) {
        audioRef.current.play();
        setPausedBySong(false);
      }
    };
    window.addEventListener('song-play', handleSongPlay);
    window.addEventListener('song-pause', handleSongPause);
    return () => {
      window.removeEventListener('song-play', handleSongPlay);
      window.removeEventListener('song-pause', handleSongPause);
    };
  }, [playing, pausedBySong]);

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
