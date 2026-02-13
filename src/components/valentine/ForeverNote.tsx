import { motion } from 'framer-motion';

export const ForeverNote = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-xl mx-auto text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-6">
        A Note You Can Always Come Back To
      </h2>
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <div className="font-body text-rose-700 leading-[1.9] text-sm md:text-base space-y-4 text-left">
          <p>Appi,</p>
          <p>
            If you're reading this on a day when the world feels heavy, I want you to remember —
            you are not alone. You have never been alone since the day I chose you.
          </p>
          <p>
            On your hardest days, I am still here. On the days you feel unlovable, I am loving you
            louder. On the days you want to push everyone away, I am staying.
          </p>
          <p className="font-display text-base text-rose-800 italic text-center py-2">
            "You don't have to be perfect to be loved by me. You just have to be you."
          </p>
          <p>
            Come back to this page whenever you need a reminder. I built this for you —
            not just today, but for every day you need to feel held.
          </p>
          <p className="text-right mt-4">
            Always yours 🤍
          </p>
        </div>
      </div>
    </motion.div>
  );
};
