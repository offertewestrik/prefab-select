import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, ArrowLeft, RefreshCcw, Layout, Ruler, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIExpert() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hallo! Ik ben uw Prefab Design Expert. Hoe kan ik u vandaag helpen met het ontwerpen van uw droomuitbouw of modulaire woning?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

// Chat logic
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from AI endpoint');
      }

      const data = await response.json();
      const aiResponse = data.text || "Mijn excuses, er ging iets mis bij het genereren van een antwoord. Probeer het opnieuw.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Er is een technische fout opgetreden. Onze experts kijken ernaar." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { icon: <Layout size={14} />, text: "Ontwerp een thuiskantoor van 15m²" },
    { icon: <Ruler size={14} />, text: "Wat zijn de regels voor vergunningsvrij bouwen?" },
    { icon: <Palette size={14} />, text: "Welke gevelbekleding is het meest duurzaam?" }
  ];

  return (
    <div className="min-h-screen bg-blue-950 font-sans text-white flex flex-col pt-40 pb-20">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col p-6 md:p-10">
        {/* Intro */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">
            AI Design <span className="text-blue-400 italic font-light lowercase">Assistant.</span>
          </h1>
          <p className="text-blue-100/60 font-medium text-sm md:text-base max-w-xl mx-auto">
            Stel vragen over architectuur, indelingen, materialen of regelgeving. Onze AI helpt u bij elke stap.
          </p>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl relative">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-600' : 'bg-white/10 border border-white/10'}`}>
                      {m.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-blue-400" />}
                    </div>
                    <div className={`p-5 rounded-2xl text-sm md:text-base leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-blue-50'}`}>
                      <div className="markdown-body">
                        <Markdown>{m.content}</Markdown>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <RefreshCcw size={14} className="animate-spin text-blue-400" />
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggestions Layer */}
          {messages.length === 1 && (
            <div className="px-10 pb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s.text); }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-400 transition-all text-left group"
                >
                  <div className="text-blue-400 mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-100">{s.text}</div>
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 md:p-10 border-t border-white/10 bg-white/2 backdrop-blur-xl">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Beschrijf uw idee..."
                className="w-full bg-white/10 hover:bg-white/[0.15] focus:bg-white/[0.15] border border-white/10 focus:border-blue-400/50 rounded-2xl py-5 pl-8 pr-20 outline-none transition-all placeholder:text-blue-100/30 text-white font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-white/10 disabled:text-white/20 text-white flex items-center justify-center shadow-lg transition-all active:scale-95 group-hover:shadow-blue-600/20"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-blue-100/30">
              <span className="flex items-center gap-1.5"><Sparkles size={10} className="text-blue-400" /> Powered by Gemini AI</span>
              <span className="hidden md:block">•</span>
              <span className="hidden md:block">Geoptimaliseerd voor Prefab Select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
