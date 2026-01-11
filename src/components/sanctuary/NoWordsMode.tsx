import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';

interface NoWordsModeProps {
  onClose: () => void;
  onComeBackLater: () => void;
}

export function NoWordsMode({ onClose, onComeBackLater }: NoWordsModeProps) {
  const healingMessages = [
    "You don't owe words today.\nRest is also a form of healing.",
    "Sometimes silence is the kindest thing\nyou can give yourself.",
    "Being here is enough.\nYou showed up for yourself.",
    "Your presence matters,\neven when you have no words.",
    "It's okay to just be.\nNo explanations needed.",
  ];

  const message = healingMessages[Math.floor(Math.random() * healingMessages.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <Heart className="w-16 h-16 mx-auto text-blush-deep fill-blush" />
        </motion.div>

        <p className="text-xl md:text-2xl font-display italic text-foreground/80 whitespace-pre-line leading-relaxed">
          {message}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={onComeBackLater}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Come back later
          </Button>
          
          <Button
            onClick={onClose}
            className="bg-lavender hover:bg-lavender-deep text-primary-foreground px-8"
          >
            Close
          </Button>
        </div>
      </motion.div>

      {/* Floating decoration */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blush-light opacity-40"
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-lavender-light opacity-30"
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
