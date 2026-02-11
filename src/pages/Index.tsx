import { motion } from 'framer-motion';
import { FloatingHearts } from '@/components/valentine/FloatingHearts';
import { LoveCounter } from '@/components/valentine/LoveCounter';
import { OpenWhenLetters } from '@/components/valentine/OpenWhenLetters';
import { WhyILoveYou } from '@/components/valentine/WhyILoveYou';
import { VirtualHug } from '@/components/valentine/VirtualHug';
import { ConfettiHearts } from '@/components/valentine/ConfettiHearts';
import { useEffect, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Some people search for a lifetime. I found my forever in you.';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="valentine-bg min-h-screen relative overflow-x-hidden">
      <FloatingHearts />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <span className="text-5xl mb-6 block">🤍</span>
          <h1 className="font-display text-5xl md:text-7xl text-rose-800 mb-6 leading-tight">
            For My Forever
          </h1>
          <p className="font-display text-xl md:text-2xl text-rose-600 italic max-w-xl mx-auto min-h-[3.5rem]">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[2px] h-5 bg-rose-400 ml-1 align-middle"
            />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-rose-400 text-2xl block"
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* Love Letter */}
      <section className="py-20 px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-rose-800 mb-8 text-center">
            My Love Letter to You
          </h2>
          <div className="font-body text-rose-700 leading-[1.9] text-[15px] md:text-base space-y-5">
            <p>My love,</p>
            <p>
              Before you, I thought I understood love. But then you walked into my life and showed me
              that everything I knew was just a shadow of what love truly is. You didn't just change
              my world — you became it.
            </p>
            <p>
              I am grateful for you in ways I will spend the rest of my life trying to put into words.
              Grateful for the way you see the best in me even when I can't see it in myself. Grateful
              for the patience you carry, the warmth you bring, and the peace you've planted in the
              parts of me I thought would always be restless.
            </p>
            <p className="font-display text-lg text-rose-800 italic text-center py-2">
              "I don't just love you. I choose you."
            </p>
            <p>
              You are not temporary. You were never temporary. You are the answer to a prayer I
              whispered in my loneliest nights. You are the calm I didn't know I was searching for.
              And every morning I wake up, I choose you — not because I have to, but because there
              is no version of my life that is whole without you.
            </p>
            <p className="font-display text-lg text-rose-800 italic text-center py-2">
              "With you, love feels peaceful."
            </p>
            <p>
              I want you to know that I see you. Not just the version of you that smiles for the
              world, but the you that is tired, the you that doubts, the you that is learning to
              trust again. I see all of you. And I am not leaving.
            </p>
            <p>
              I am building a future with you — not because it's a dream, but because you are the
              only reality I want. Every plan I make has your name written beside mine. Every hope I
              hold is one I want to share with you.
            </p>
            <p className="font-display text-lg text-rose-800 italic text-center py-2">
              "You are not a chapter. You are the whole story."
            </p>
            <p className="text-right mt-4">
              Forever and intentionally yours 🤍
            </p>
          </div>
        </motion.div>
      </section>

      {/* Love Counter */}
      <section className="py-20 px-6 relative z-10">
        <LoveCounter />
      </section>

      {/* Open When Letters */}
      <section className="py-20 px-6 relative z-10">
        <OpenWhenLetters />
      </section>

      {/* Why I Love You */}
      <section className="py-20 px-6 relative z-10">
        <WhyILoveYou />
      </section>

      {/* Virtual Hug */}
      <section className="py-20 px-6 relative z-10">
        <VirtualHug />
      </section>

      {/* Finale */}
      <section className="py-24 px-6 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto"
        >
          <ConfettiHearts />
          <h2 className="font-display text-3xl md:text-5xl text-rose-800 mb-8 leading-snug">
            You Are Not Just My Valentine
          </h2>
          <div className="space-y-4 font-display text-lg md:text-xl text-rose-600 italic">
            <p>"You are my future."</p>
            <p>"I am not loving you temporarily. I am loving you intentionally."</p>
            <p>"No matter what life brings, I choose you."</p>
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mt-12"
          >
            🤍
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-rose-400 font-body text-xs relative z-10">
        Made with all my heart, for you.
      </footer>
    </div>
  );
};

export default Index;
