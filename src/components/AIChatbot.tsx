import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Skeleton } from './Skeleton';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Welcome to DearSoft. I am your concierge. How may we elevate your digital presence today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const lowerMsg = userMsg.toLowerCase();
      // Try Vite-prefixed key first (recommended for client-side apps), then standard process.env
      const envKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      
      const isPlaceholder = !envKey || ['YOUR_GEMINI_API_KEY', 'your_placeholder_here', 'MY_GEMINI_API_KEY'].includes(envKey);
      
      const apiKey = isPlaceholder ? null : envKey;

      if (!apiKey) {
        if (lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
          setMessages(prev => [...prev, { role: 'ai', text: "Hello! I'm the DearSoft concierge. How can I help you explore our premium digital services today?" }]);
          return;
        }
        if (lowerMsg.includes('service') || lowerMsg.includes('what do you do')) {
          setMessages(prev => [...prev, { role: 'ai', text: "We specialize in high-end Web Ecosystems, custom UI/UX Design, Enterprise E-Commerce, and Cloud Infrastructure. Use the 'Services' section for more details!" }]);
          return;
        }
        if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('price') || lowerMsg.includes('cost')) {
          setMessages(prev => [...prev, { role: 'ai', text: "For detailed proposals and consultations, please use our contact form or email us at dearsoft0205@gmail.com. Investments for custom websites typically start at $1,000." }]);
          return;
        }
        
        throw new Error('MISSING_API_KEY');
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are the elite concierge for "DearSoft IT Solutions".
          Company identity: DearSoft - Premium Digital Engineering.
          Services:
          - Web Ecosystems (React, Next.js, TypeScript)
          - High-end UI/UX Design
          - Enterprise E-Commerce (Headless, Stripe)
          - Cloud Infrastructure (AWS, GCP, Azure)
          - Resilient API Development
          - Digital Maintenance & Security
          
          Our goal is to create high-performance, aesthetically dominant digital products.
          
          Guidelines:
          - Tone: Professional, sophisticated, helpful, and concise.
          - Call to Action: Suggest the contact form for detailed proposals or emailing dearsoft0205@gmail.com.
          - Mentions: We are based in Pune, India, serving global clients.
          - Pricing: Estimates should be framed as "investments starting at..." 
            * Websites: $1k+ 
            * E-Commerce: $5k+ 
            * Custom Software: $15k+`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I'm sorry, I'm having trouble thinking right now. Please contact us via the form!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error('AIChatbot Error:', error);
      const isMissingKey = error instanceof Error && error.message === 'MISSING_API_KEY';
      const msg = isMissingKey 
        ? "I need an API key to function. Please configure the GEMINI_API_KEY in your deployment settings."
        : "I'm offline right now, but you can always reach us at dearsoft0205@gmail.com!";
      setMessages(prev => [...prev, { role: 'ai', text: msg }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass p-4 rounded-2xl w-72 md:w-80 shadow-2xl border-white/20 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black text-xs font-bold">AI</div>
                <div>
                  <div className="text-sm font-bold">Dear AI Assistant</div>
                  <div className="text-[10px] text-green-400 flex items-center gap-1 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Active
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="h-64 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user' ? 'bg-gold/10 border border-gold/20 text-gold' : 'bg-white/5 border border-white/10 text-white/80'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl w-3/4 space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-5/6" />
                    <Skeleton className="h-2 w-4/6" />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-xs focus:outline-hidden focus:border-gold transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1.5 p-1 text-gold hover:scale-110 disabled:opacity-50 transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-110 active:scale-95 transition-all"
      >
        {isOpen ? <X className="text-black" /> : (
          <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </button>
    </div>
  );
};
