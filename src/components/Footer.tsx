import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5 text-center px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-white/40 text-sm">
          <div className="flex gap-8">
            <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Cookie Policy</a>
          </div>
          <div className="flex gap-6">
             <a href="#" className="p-2 glass rounded-lg hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
               <Twitter size={18} />
             </a>
             <a href="#" className="p-2 glass rounded-lg hover:text-blue-500 hover:border-blue-500/30 transition-all">
               <Linkedin size={18} />
             </a>
             <a href="#" className="p-2 glass rounded-lg hover:text-blue-600 hover:border-blue-600/30 transition-all">
               <Facebook size={18} />
             </a>
             <a href="https://www.instagram.com/dear_soft_?igsh=MXN4enlubTZzcG1idQ==" target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:text-pink-500 hover:border-pink-500/30 transition-all">
               <Instagram size={18} />
             </a>
          </div>
        </div>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} DEAR_SOFT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};
