import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ShieldCheck, Menu, X, Coins } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';
import { useCurrency, currencies } from '../context/CurrencyContext';

export const Navbar = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'mr', label: 'MR' },
  ];

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsMenuOpen(false);
  };

  const navItems = ['about', 'services', 'projects', 'contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        <a href="#" className="flex items-center group -ml-2 md:-ml-4">
          <Logo className="w-20 h-20 md:w-32 md:h-32 group-hover:scale-105 transition-transform duration-500" showText={false} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white/60 hover:text-white transition-colors relative group py-2 uppercase tracking-widest text-[11px]"
            >
              {t(`nav.${item}`)}
            </a>
          ))}
          
          <div className="flex items-center gap-6 border-l border-white/10 pl-8 ml-2">
            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                onBlur={() => setTimeout(() => setShowCurrencyDropdown(false), 200)}
                className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                <Coins size={12} className="text-cyan-400" />
                {currency.code}
              </button>

              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 p-1 glass border border-white/10 rounded-lg min-w-[80px]"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c.code); setShowCurrencyDropdown(false); }}
                        className={cn(
                          "w-full text-left px-3 py-1.5 text-[10px] font-bold transition-all rounded hover:bg-white/5",
                          currency.code === c.code ? "text-cyan-400" : "text-white/40"
                        )}
                      >
                        {c.symbol} {c.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 text-cyan-400">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => toggleLanguage(lang.code)}
                  className={cn(
                    "text-[10px] font-bold transition-all px-1.5 py-0.5 rounded",
                    i18n.language === lang.code ? "text-cyan-400 bg-white/10" : "opacity-40 hover:opacity-100"
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={onAdminClick}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            title="Admin Panel"
          >
            <ShieldCheck size={16} className="text-cyan-400" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={onAdminClick}
            className="p-2 rounded-lg bg-white/5 border border-white/10"
          >
            <ShieldCheck size={18} className="text-cyan-400" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white/60 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 glass border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="p-6 flex flex-col gap-6 items-center">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-white/80 hover:text-cyan-400 transition-colors tracking-widest uppercase"
                >
                  {t(`nav.${item}`)}
                </a>
              ))}
              
              <div className="flex flex-col gap-4 w-full py-4 border-t border-white/5">
                <div className="flex justify-center gap-4">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={cn(
                        "text-xs font-bold transition-all px-3 py-1 rounded-full border border-white/5",
                        currency.code === c.code ? "text-cyan-400 bg-white/10 border-cyan-500/20" : "opacity-40"
                      )}
                    >
                      {c.symbol} {c.label}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 justify-center">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={cn(
                        "text-xs font-bold transition-all px-3 py-1 rounded-full border border-white/5",
                        i18n.language === lang.code ? "text-cyan-400 bg-white/10 border-cyan-500/20" : "opacity-40"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
