import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, User, BookOpen, Lightbulb, Code, Calculator, Atom } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useAuthStore } from '../../../stores/authStore';

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const AI_RESPONSES: Record<string, string> = {
  'derivative': "Great question! The **derivative** measures the rate of change of a function. For f(x) = x², the derivative f'(x) = 2x.\n\nHere's the power rule: if f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹.\n\n**Example:** f(x) = 3x⁴ → f'(x) = 12x³\n\nWould you like me to walk through a practice problem?",
  'python': "Python variables are like labeled containers that store data! Here's a quick breakdown:\n\n```python\n# String variable\nname = \"Marcus\"\n\n# Integer variable\nage = 16\n\n# Float variable\ngpa = 3.72\n\n# Boolean variable\nis_enrolled = True\n```\n\nKey rules:\n• Variable names can't start with numbers\n• Use snake_case for naming (like `my_variable`)\n• Python is dynamically typed — no need to declare types!\n\nWant to try a coding exercise?",
  'newton': "**Newton's Laws of Motion** — here's a concise summary:\n\n**1st Law (Inertia):** An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.\n\n**2nd Law (F = ma):** Force equals mass times acceleration. If you push a 10kg box with 20N of force: a = F/m = 20/10 = 2 m/s²\n\n**3rd Law (Action-Reaction):** Every action has an equal and opposite reaction. When you push a wall, the wall pushes back!\n\nShall I explain any of these in more detail with examples?",
  'default': "That's a great question! Let me think about that...\n\nBased on your coursework in CS101, MATH201, and PHY301, I can help you with programming concepts, calculus, and physics problems.\n\nCould you be more specific about what topic you'd like help with? For example:\n• Python programming basics\n• Derivatives and integrals\n• Newton's laws of motion\n• Study strategies and tips",
};

const SUGGESTED_TOPICS = [
  { label: 'Explain derivatives', icon: <Calculator className="w-4 h-4" />, key: 'derivative' },
  { label: 'Python variables', icon: <Code className="w-4 h-4" />, key: 'python' },
  { label: "Newton's Laws", icon: <Atom className="w-4 h-4" />, key: 'newton' },
  { label: 'Study tips', icon: <Lightbulb className="w-4 h-4" />, key: 'default' },
];

export function StudentAITutor() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: `Hi ${user?.name || 'there'}! 👋 I'm your AI Study Assistant powered by STEM-ED. I can help you with your coursework across all subjects.\n\nWhat would you like to learn about today?`,
      time: 'Now',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userText: string): string => {
    const lower = userText.toLowerCase();
    if (lower.includes('derivative') || lower.includes('calculus') || lower.includes('differentiat')) return AI_RESPONSES['derivative'];
    if (lower.includes('python') || lower.includes('variable') || lower.includes('programming') || lower.includes('code')) return AI_RESPONSES['python'];
    if (lower.includes('newton') || lower.includes('force') || lower.includes('motion') || lower.includes('physics')) return AI_RESPONSES['newton'];
    return AI_RESPONSES['default'];
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      text: messageText,
      time: 'Just now',
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai${Date.now()}`,
        role: 'ai',
        text: getAIResponse(messageText),
        time: 'Just now',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] max-w-4xl mx-auto w-full flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-4 py-4 px-2 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Study Assistant</h1>
          <p className="text-sm text-slate-500">Powered by STEM-ED AI • Always here to help</p>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden p-0 border-slate-200">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue text-white rounded-br-md shadow-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-md'
              }`}>
                {msg.text.split('\n').map((line, j) => (
                  <p key={j} className={j > 0 ? 'mt-2' : ''}>
                    {line.split(/(\*\*[^*]+\*\*)/g).map((part, k) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={k} className="font-bold">{part.slice(2, -2)}</strong>
                        : <span key={k}>{part}</span>
                    )}
                  </p>
                ))}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-5 py-3.5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </motion.div>
          )}

          {/* Suggested Topics (only when no user messages) */}
          {messages.length === 1 && (
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Suggested Topics</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TOPICS.map(topic => (
                  <button
                    key={topic.key}
                    onClick={() => handleSend(topic.label)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-all duration-200 shadow-sm"
                  >
                    {topic.icon}
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your courses..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all resize-none"
              />
            </div>
            <Button
              variant="primary"
              className="h-10 w-10 p-0 rounded-xl shrink-0 bg-violet-500 hover:bg-violet-600"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
