import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { InteractiveSpace } from './InteractiveSpace';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      <InteractiveSpace />
      {/* Dark Subtle Background Animations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-[600px] h-[600px] border border-white/5 rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-white/5 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center z-10 flex flex-col items-center relative">
        <div className="relative py-12 px-6 md:py-24 md:px-32 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {/* Decorative Circle around text */}
          <div className="absolute inset-0 border border-white/20 rounded-full scale-110 pointer-events-none hidden md:block" />
          <div className="absolute inset-0 border border-dashed border-cyan-500/40 rounded-full scale-125 animate-spin-slow pointer-events-none hidden md:block" />
          <div className="absolute inset-[-20px] border border-dotted border-white/15 rounded-full scale-90 animate-spin-reverse pointer-events-none hidden md:block" />

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white z-10 text-center"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] md:text-sm text-white/50 font-light tracking-[0.4em] uppercase z-10"
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#contact"
            className="inline-block bg-gold text-black px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(251,206,68,0.2)] hover:scale-105"
          >
            {t('hero.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
