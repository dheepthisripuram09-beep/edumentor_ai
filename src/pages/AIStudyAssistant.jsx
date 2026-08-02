import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';

const AIStudyAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi there! I am your AI Study Assistant. What would you like to learn today?',
      complexity: null
    }
  ]);
  const [input, setInput] = useState('');
  const [complexity, setComplexity] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      complexity
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Call Gemini API
    const response = await generateAIResponse(userMessage.content, userMessage.complexity);

    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: response,
      complexity
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const complexityOptions = [
    { id: 'explain-like-im-10', label: "Explain Like I'm 10" },
    { id: 'normal', label: 'Normal' },
    { id: 'detailed', label: 'Detailed' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
            <Bot className="mr-3 h-8 w-8 text-primary-500" />
            AI Study Assistant
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Ask me anything about your subjects.</p>
        </div>
        
        {/* Complexity Selector */}
        <div className="glass-panel p-1 rounded-xl inline-flex self-start md:self-auto">
          {complexityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setComplexity(opt.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                complexity === opt.id
                  ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-grow glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div className={`flex-shrink-0 rounded-full p-2 ${
                  msg.role === 'user' ? 'bg-primary-100 dark:bg-primary-900/50 ml-3' : 'bg-slate-100 dark:bg-slate-800 mr-3'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm'
                }`}>
                  {/* Basic markdown rendering implementation for the demo */}
                  <div 
                    className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-100 dark:prose-pre:bg-slate-900 prose-pre:text-sm prose-a:text-primary-500"
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n/g, '<br/>')
                        .replace(/`(.*?)`/g, '<code class="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-sm">$1</code>')
                    }}
                  />
                  {msg.role === 'user' && msg.complexity && msg.complexity !== 'normal' && (
                    <div className="text-xs mt-2 opacity-70 border-t border-white/20 pt-2 flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      Mode: {complexityOptions.find(o => o.id === msg.complexity)?.label}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start max-w-[80%]"
            >
               <div className="flex-shrink-0 rounded-full p-2 bg-slate-100 dark:bg-slate-800 mr-3">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Thinking...</span>
                </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question...`}
              className="w-full pl-6 pr-14 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-inner dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <div className="text-center mt-2">
             <span className="text-xs text-slate-400 dark:text-slate-500">Gemini AI may produce inaccurate information. Verify important facts.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudyAssistant;
