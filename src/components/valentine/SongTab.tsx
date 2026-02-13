import { motion } from 'framer-motion';
import romanticImage from '@/assets/romantic-song.jpg';

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
        "Press play in your heart and think of us, Appi."
      </p>

      <div className="glass-card rounded-3xl overflow-hidden">
        {/* Romantic Image */}
        <div className="relative">
          <img
            src={romanticImage}
            alt="Romantic sunset silhouette"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent" />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="font-display text-white text-xl md:text-2xl drop-shadow-lg">
              🎵 Forever Yours 🎵
            </span>
          </div>
        </div>

        {/* Lyrics */}
        <div className="p-8 md:p-10 space-y-4 font-body text-rose-700 leading-relaxed text-sm md:text-base italic">
          <p>
            "You are the sun that lights my day,<br />
            The moon that guides my way,<br />
            In every beat, in every breath,<br />
            You're the love that conquers death."
          </p>
          <p>
            "Hold my hand through every storm,<br />
            In your arms I find my warm,<br />
            No distance, no time could ever part,<br />
            The rhythm of your heart from mine."
          </p>
          <p>
            "I choose you now, I'll choose you then,<br />
            Again, again, and again,<br />
            Forever isn't long enough,<br />
            When you're the one I love."
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-display text-rose-800 text-lg not-italic pt-4"
          >
            🤍 For you, always 🤍
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
