import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();

  const highlights = [
    { title: '20+ Skilled Professionals', desc: 'Dedicated experts delivering high-quality and scalable digital solutions.' },
    { title: 'Modern Technology Stack', desc: 'We use the latest tools and frameworks to ensure performance and security.' },
    { title: 'Client-Centered Approach', desc: 'We focus on understanding business goals and delivering measurable results.' }
  ];

  const listItems = [
    'Custom Website Development',
    'Full Stack Web Applications',
    'E-Commerce Solutions',
    'Cloud Deployment & Hosting',
    'Maintenance & Technical Support'
  ];

  return (
    <section id="about" className="py-24 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            {t('about.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/60"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <p className="text-white/80 leading-relaxed">{t('about.p1')}</p>
            <p className="text-white/80 leading-relaxed">{t('about.p2')}</p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {listItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="text-gold" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border-l-4 border-l-gold group hover:border-l-white"
              >
                <h5 className="text-gold font-bold text-lg mb-1 group-hover:text-white transition-colors">{item.title}</h5>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
