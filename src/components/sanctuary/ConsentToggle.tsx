import { motion } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsentToggleProps {
  allowAccess: boolean;
  onToggle: (allow: boolean) => void;
}

export function ConsentToggle({ allowAccess, onToggle }: ConsentToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-xl mx-auto"
    >
      <h3 className="text-xl md:text-2xl font-display text-center text-foreground/80">
        Do you want to allow him to read today's entry?
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onToggle(false)}
          className={cn(
            "p-6 rounded-2xl border-2 transition-all duration-300",
            !allowAccess
              ? "bg-lavender-light border-lavender shadow-glow"
              : "bg-card border-border hover:border-lavender/50"
          )}
        >
          <Lock className={cn(
            "w-8 h-8 mx-auto mb-3",
            !allowAccess ? "text-lavender-deep" : "text-muted-foreground"
          )} />
          <p className="font-display text-lg text-foreground/80">No</p>
          <p className="text-sm text-muted-foreground mt-1">Keep it private</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onToggle(true)}
          className={cn(
            "p-6 rounded-2xl border-2 transition-all duration-300",
            allowAccess
              ? "bg-blush-light border-blush shadow-glow"
              : "bg-card border-border hover:border-blush/50"
          )}
        >
          <Heart className={cn(
            "w-8 h-8 mx-auto mb-3",
            allowAccess ? "text-blush-deep fill-blush" : "text-muted-foreground"
          )} />
          <p className="font-display text-lg text-foreground/80">Yes</p>
          <p className="text-sm text-muted-foreground mt-1">Allow read access</p>
        </motion.button>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        You can change this anytime. This applies only to today's entry.
      </p>
    </motion.div>
  );
}
