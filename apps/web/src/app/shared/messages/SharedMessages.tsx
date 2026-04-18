import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Plus, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  time: string;
  read: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Carol Johnson',
    role: 'Parent',
    lastMessage: "Thank you for the update on Marcus's progress!",
    time: '2m ago',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', text: "Hi, I wanted to check in about Marcus's recent quiz scores.", sender: 'them', time: '10:15 AM', read: true },
      { id: 'm2', text: "Of course! Marcus scored 96% on the last quiz. He's doing excellent work.", sender: 'me', time: '10:18 AM', read: true },
      { id: 'm3', text: "That's wonderful to hear! Has he been participating in class?", sender: 'them', time: '10:20 AM', read: true },
      { id: 'm4', text: "Absolutely. He's one of the most engaged students. I'd recommend he consider the AP track next year.", sender: 'me', time: '10:22 AM', read: true },
      { id: 'm5', text: "Thank you for the update on Marcus's progress!", sender: 'them', time: '10:25 AM', read: false },
      { id: 'm6', text: "We'll definitely discuss AP options at home.", sender: 'them', time: '10:25 AM', read: false },
    ]
  },
  {
    id: 'c2',
    name: 'Dr. Sarah Mitchell',
    role: 'Admin',
    lastMessage: 'The curriculum review meeting is scheduled for Friday.',
    time: '1h ago',
    unread: 0,
    online: true,
    messages: [
      { id: 'm1', text: "Good morning! Just a reminder about the upcoming curriculum review.", sender: 'them', time: '9:00 AM', read: true },
      { id: 'm2', text: "Thanks for the heads up. I've prepared my department's report.", sender: 'me', time: '9:15 AM', read: true },
      { id: 'm3', text: 'The curriculum review meeting is scheduled for Friday.', sender: 'them', time: '9:30 AM', read: true },
    ]
  },
  {
    id: 'c3',
    name: 'James Wilson',
    role: 'Student',
    lastMessage: 'Can I schedule office hours for Thursday?',
    time: '3h ago',
    unread: 1,
    online: false,
    messages: [
      { id: 'm1', text: "Hi! I'm having trouble with the derivatives worksheet.", sender: 'them', time: '2:00 PM', read: true },
      { id: 'm2', text: "No worries, James. Which problems specifically?", sender: 'me', time: '2:10 PM', read: true },
      { id: 'm3', text: 'Problems 7-10 with the chain rule. Can I schedule office hours for Thursday?', sender: 'them', time: '2:15 PM', read: false },
    ]
  },
  {
    id: 'c4',
    name: 'Prof. David Park',
    role: 'Teacher',
    lastMessage: 'Shared the new lab safety protocol document.',
    time: 'Yesterday',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: "Hey, have you seen the updated lab safety guidelines?", sender: 'them', time: 'Yesterday', read: true },
      { id: 'm2', text: "Not yet. Can you share them?", sender: 'me', time: 'Yesterday', read: true },
      { id: 'm3', text: 'Shared the new lab safety protocol document.', sender: 'them', time: 'Yesterday', read: true },
    ]
  },
  {
    id: 'c5',
    name: 'Emma Rodriguez',
    role: 'Student',
    lastMessage: 'Thank you for the extra credit opportunity!',
    time: '2d ago',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: "Is there any extra credit available for the midterm?", sender: 'them', time: '2 days ago', read: true },
      { id: 'm2', text: "Yes! You can submit a bonus project on any topic from chapters 1-5 for up to 10 extra points.", sender: 'me', time: '2 days ago', read: true },
      { id: 'm3', text: 'Thank you for the extra credit opportunity!', sender: 'them', time: '2 days ago', read: true },
    ]
  },
];

export function SharedMessages() {
  const { user } = useAuthStore();
  const [selectedConvo, setSelectedConvo] = useState<Conversation | null>(DEMO_CONVERSATIONS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(DEMO_CONVERSATIONS);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConvo) return;
    const updated = conversations.map(c => {
      if (c.id === selectedConvo.id) {
        const newMsg: Message = {
          id: `m${Date.now()}`,
          text: newMessage,
          sender: 'me',
          time: 'Just now',
          read: true,
        };
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: newMessage,
          time: 'Just now',
        };
      }
      return c;
    });
    setConversations(updated);
    setSelectedConvo(updated.find(c => c.id === selectedConvo.id) || null);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] max-w-7xl mx-auto w-full flex rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      
      {/* Conversation List */}
      <div className={`w-full md:w-[340px] md:min-w-[340px] border-r border-slate-100 flex flex-col bg-white ${selectedConvo ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900">Messages</h2>
            <button className="p-2 text-slate-400 hover:text-blue hover:bg-blue-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(convo => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo)}
              className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-150 border-b border-slate-50 hover:bg-slate-50 ${
                selectedConvo?.id === convo.id ? 'bg-blue-50/60 border-l-2 border-l-blue' : 'border-l-2 border-l-transparent'
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {convo.name.split(' ').map(n => n[0]).join('')}
                </div>
                {convo.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">{convo.name}</h3>
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2">{convo.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 capitalize">{convo.role}</p>
                <p className="text-sm text-slate-500 truncate mt-1">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="mt-1 shrink-0 w-5 h-5 bg-blue text-white rounded-full text-[11px] font-bold flex items-center justify-center">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConvo ? (
        <div className={`flex-1 flex flex-col ${selectedConvo ? 'flex' : 'hidden md:flex'}`}>
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedConvo(null)} className="md:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {selectedConvo.name.split(' ').map(n => n[0]).join('')}
                </div>
                {selectedConvo.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{selectedConvo.name}</h3>
                <p className="text-xs text-slate-500">{selectedConvo.online ? 'Online' : 'Offline'} • {selectedConvo.role}</p>
              </div>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {selectedConvo.messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'me'
                    ? 'bg-blue text-white rounded-br-md shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-md shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1.5 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <span className={`text-[10px] ${msg.sender === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</span>
                    {msg.sender === 'me' && (
                      msg.read
                        ? <CheckCheck className="w-3 h-3 text-blue-200" />
                        : <Check className="w-3 h-3 text-blue-200" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 border-t border-slate-100 bg-white shrink-0">
            <div className="flex items-end gap-3">
              <button className="p-2.5 text-slate-400 hover:text-blue hover:bg-blue-50 rounded-xl transition-colors shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <textarea
                  rows={1}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue/20 focus:border-blue transition-all resize-none"
                />
              </div>
              <Button
                variant="primary"
                className="h-10 w-10 p-0 rounded-xl shrink-0"
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50/30">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Select a conversation</h3>
            <p className="text-sm text-slate-500 mt-1">Choose from your existing conversations to start messaging.</p>
          </div>
        </div>
      )}
    </div>
  );
}
