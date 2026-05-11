import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { Skeleton } from './Skeleton';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<
    { role: 'ai' | 'user'; text: string }[]
  >([
    {
      role: 'ai',
      text:
        'Welcome to DearSoft. I am your concierge. How may we elevate your digital presence today?',
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setInput('');

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userMsg },
    ]);

    setIsTyping(true);

    try {
      const apiKey =
        import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('Gemini API key missing');
      }

      const response = await fetch(
         https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
You are DearSoft IT Solutions AI Assistant.

Company Details:
- Company: DearSoft IT Solutions
- Location: Pune, India

Services:
- Web Development
- MERN Stack Development
- UI/UX Design
- E-Commerce Solutions
- Cloud Services
- API Development
- Website Maintenance

Instructions:
- Reply professionally
- Keep answers short and helpful
- Encourage users to contact dearsoft0205@gmail.com

User Message:
${userMsg}
                    `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log('Gemini Response:', data);

      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, AI is not responding right now.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: aiText,
        },
      ]);
    } catch (error: any) {
      console.error('Gemini Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text:
            error.message ||
            'AI assistant is temporarily unavailable.',
        },
      ]);
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
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black text-xs font-bold">
                  AI
                </div>

                <div>
                  <div className="text-sm font-bold">
                    Dear AI Assistant
                  </div>

                  <div className="text-[10px] text-green-400 flex items-center gap-1 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Active
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="h-64 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold/10 border border-gold/20 text-gold'
                        : 'bg-white/5 border border-white/10 text-white/80'
                    }`}
                  >
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
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSend()
                }
                placeholder="Type a message..."
                className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:border-gold transition-all"
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
        {isOpen ? (
          <X className="text-black" />
        ) : (
          <svg
            className="w-7 h-7 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>
    </div>
  );
};
