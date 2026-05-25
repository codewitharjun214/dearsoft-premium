import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Store, Coffee, Globe, Pill, Book, GraduationCap } from 'lucide-react';

export const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    { icon: Store, title: 'Kirana Management System', desc: 'Complete billing, inventory tracking, customer management, and daily sales reports.', tech: 'ASP.NET Core • JS • Bootstrap' },
    { icon: Coffee, title: 'Restaurant Management', desc: 'Order management, billing system, table booking, and kitchen dashboard.', tech: 'Angular • ASP.NET Core API' },
    { icon: Globe, title: 'Food Web API', desc: 'Modern responsive food ordering website with online payment and admin panel.', tech: 'Python • Bootstrap • JS' },
    { icon: Pill, title: 'Medical Store Management', desc: 'Medicine inventory, expiry tracking, billing system, and supplier management.', tech: 'FastAPI • Python • Bootstrap' },
    { icon: Book, title: 'Library Management', desc: 'Book issuing, return tracking, student database and fine system.', tech: 'ASP.NET Core • Bootstrap' },
    { icon: GraduationCap, title: 'Smart Institute Management', desc: 'A complete system to manage student records, admission, and fee tracking.', tech: 'Python • FastAPI • JS' }
  ];

  return (
    <section id="projects" className="py-24 bg-white/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 underline decoration-gold underline-offset-8">Our Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href="#contact"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 border-b-4 border-b-transparent hover:border-b-gold group block cursor-pointer transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-gold group-hover:scale-110 transition-transform">
                  <project.icon size={40} />
                </div>
                <div className="text-[10px] bg-gold/10 text-gold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tighter">
                  Inquire Now
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-3">{project.desc}</p>
              <div className="text-xs font-mono text-gold uppercase tracking-wider">{project.tech}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
