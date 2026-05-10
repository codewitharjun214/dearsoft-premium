import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Palette, ShoppingCart, CloudUpload, Cpu, ShieldCheck, X, ChevronRight } from 'lucide-react';

export const Services = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<null | typeof services[0]>(null);

  const services = [
    { 
      icon: Code2, 
      title: 'web', 
      desc: 'Modern, scalable and responsive websites built with latest technologies.',
      color: 'cyan',
      details: 'We specialize in high-performance web applications using React, Next.js, and TypeScript. Our focus is on core web vitals, accessibility, and seamless user experiences across all devices.'
    },
    { 
      icon: Palette, 
      title: 'design', 
      desc: 'Creative and user-focused interface designs for better engagement.',
      color: 'purple',
      details: 'Our design process involves deep user research, wireframing, and iterative prototyping. We create visual languages that reflect your brand identity while ensuring intuitive navigation.'
    },
    { 
      icon: ShoppingCart, 
      title: 'ecommerce', 
      desc: 'Complete online store development with payment integration.',
      color: 'blue',
      details: 'From custom Shopify themes to headless commerce solutions using Medusa or Stripe, we build conversion-optimized stores that handle scaling effortlessly.'
    },
    { 
      icon: CloudUpload, 
      title: 'cloud', 
      desc: 'Secure hosting & deployment on AWS, Azure & other platforms.',
      color: 'indigo',
      details: 'We implement CI/CD pipelines, containerization with Docker, and cloud orchestration with Kubernetes to ensure 99.9% uptime and rapid deployment cycles.'
    },
    { 
      icon: Cpu, 
      title: 'api', 
      desc: 'RESTful APIs & backend integrations for scalable systems.',
      color: 'emerald',
      details: 'Robust server-side logic using Node.js, Python, or Go. We build secure, documented, and resilient APIs that serve as the backbone for complex digital ecosystems.'
    },
    { 
      icon: ShieldCheck, 
      title: 'support', 
      desc: 'Ongoing support, upgrades and security monitoring.',
      color: 'rose',
      details: 'Proactive maintenance protocols including regular security audits, performance monitoring, and rapid patch deployment to keep your infrastructure safe and current.'
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('services.title')}</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedService(service)}
              className="glass-card p-10 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent -translate-y-1/2 translate-x-1/2 rounded-full transition-transform group-hover:scale-150 duration-700" />
              
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:bg-cyan-500 transition-all duration-500 shadow-xl">
                <service.icon size={28} className="text-cyan-400 group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 relative z-10">{t(`services.${service.title}`)}</h3>
              <p className="text-white/40 leading-relaxed mb-8 relative z-10 group-hover:text-white/60 transition-colors">{service.desc}</p>
              
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300">
                Learn More <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass p-8 md:p-12 rounded-3xl w-full max-w-2xl relative z-10 border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                  <selectedService.icon size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{t(`services.${selectedService.title}`)}</h3>
                  <p className="text-cyan-500 font-mono text-xs tracking-widest mt-2 uppercase">Service Expertise</p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-white/80 leading-relaxed font-light italic">
                  "{selectedService.desc}"
                </p>
                <div className="w-full h-px bg-white/10" />
                <p className="text-white/60 leading-loose text-lg">
                  {selectedService.details}
                </p>
              </div>

              <div className="mt-12 flex gap-4">
                <a 
                  href="#contact" 
                  onClick={() => setSelectedService(null)}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold transition-all"
                >
                  Request Consultation
                </a>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="px-8 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
