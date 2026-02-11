import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const START_DATE = new Date('2024-02-14'); // ← Change this to your actual date

export const LoveCounter = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - START_DATE.getTime();
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor((diff % 86400000) / 3600000));
      setMinutes(Math.floor((diff % 3600000) / 60000));
      setSeconds(Math.floor((diff % 60000) / 1000));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-2">
        Loving You For
      </h2>
      <div className="flex justify-center gap-4 md:gap-6 my-8">
        {units.map((u) => (
          <div key={u.label} className="glass-card px-4 py-5 md:px-6 md:py-6 rounded-2xl min-w-[70px]">
            <motion.span
              key={u.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="block text-3xl md:text-5xl font-display text-rose-700"
            >
              {u.value}
            </motion.span>
            <span className="text-xs md:text-sm text-rose-400 mt-1 block font-body">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      <p className="text-rose-500 italic font-display text-lg">
        "Every day, I fall for you again."
      </p>
    </motion.div>
  );
};
