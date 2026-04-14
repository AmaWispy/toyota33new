'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Привет! Я Алексеич, но друзья зовут меня Лексус. Чем могу помочь?'
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get or create session ID
    let sid = localStorage.getItem('chat_session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && sessionId) {
      // Fetch history from backend
      fetchHistory(sessionId);
    }
  }, [isOpen, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async (sid: string) => {
    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl && typeof window !== 'undefined') {
      if (window.location.hostname === 'toyota.ameliq.ru') {
        apiUrl = 'https://toyota-admin.ameliq.ru';
      } else {
        apiUrl = 'http://localhost:8000';
      }
    }

    try {
      const response = await fetch(`${apiUrl}/api/chat/history`, {
        headers: {
          'X-Chat-Session-Id': sid
        }
      });
      if (response.ok) {
        const history = await response.json();
        if (history.length > 0) {
          // Всегда держим приветствие первым
          setMessages([WELCOME_MESSAGE, ...history]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !sessionId) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    let apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl && typeof window !== 'undefined') {
      if (window.location.hostname === 'toyota.ameliq.ru') {
        apiUrl = 'https://toyota-admin.ameliq.ru';
      } else {
        apiUrl = 'http://localhost:8000';
      }
    }

    try {
      const response = await fetch(`${apiUrl}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Chat-Session-Id': sessionId
        },
        body: JSON.stringify({ message: userMsg, website: honeypot }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Извините, произошла ошибка при связи с Лексусом.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ошибка сети. Проверьте подключение к серверу.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25"></div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer group"
          >
            <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 dark:border-zinc-800 rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary/90 backdrop-blur-md p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                Л
              </div>
              <div>
                <h3 className="font-semibold leading-none">Алексеич</h3>
                <span className="text-xs text-white/70">"Лексус"</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/90 dark:bg-zinc-800/90 border border-zinc-200/50 dark:border-zinc-700/50 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/20 dark:border-zinc-800 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите Лексусу..."
              className="flex-1 bg-white/30 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
              disabled={isLoading}
            />
            {/* Honeypot field (hidden from humans) */}
            <div className="hidden">
              <input 
                type="text" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
                tabIndex={-1} 
                autoComplete="off" 
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-primary text-white p-2 rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
