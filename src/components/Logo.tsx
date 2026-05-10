import { useState } from 'react';
import { Target } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo = ({ className = "w-10 h-10", showText = false }: LogoProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className={`${className} flex items-center justify-center relative`}>
        {!imgError ? (
          <img 
            src="/logo.png" 
            alt="Dear Soft Logo"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          />
        ) : (
          <div className="w-full h-full rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Target className="text-cyan-400 w-2/3 h-2/3" />
          </div>
        )}
      </div>
      {showText && (
        <span className="text-white font-bold tracking-tighter text-xl leading-none">
          Dear<span className="text-cyan-400">_</span>soft
        </span>
      )}
    </div>
  );
};
