import { motion } from 'motion/react';

export const TechLogos = () => {
  const row1 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  ];

  const row2 = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  ];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-bold text-cyan-500 uppercase tracking-[0.4em] mb-4">Our Technology Stack</h2>
          <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">Built with the latest technologies</p>
        </motion.div>
      </div>
      
      {/* Edge Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#06080d] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#06080d] to-transparent z-10 pointer-events-none" />

      <div className="space-y-8">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...row1, ...row1, ...row1].map((logo, i) => (
              <div key={i} className="group relative">
                <div className="w-32 h-32 md:w-36 md:h-36 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-8 transition-all duration-700 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:scale-105">
                  <img src={logo} alt="tech" className="w-full h-full object-contain transition-all duration-500" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          >
            {[...row2, ...row2, ...row2].map((logo, i) => (
              <div key={i} className="group relative">
                <div className="w-32 h-32 md:w-36 md:h-36 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-8 transition-all duration-700 hover:border-purple-500/50 hover:bg-purple-500/10 hover:scale-105">
                  <img src={logo} alt="tech" className="w-full h-full object-contain transition-all duration-500" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
