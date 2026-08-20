import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Trash2, BookOpen, Lightbulb, Briefcase, Code2, HelpCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { useTutor } from '../../context/TutorContext';

export const AskAtlasPanel: React.FC = () => {
  const {
    isOpen,
    closeTutor,
    activeLesson,
    messages,
    isGenerating,
    sendMessage,
    clearHistory,
    suggestedPrompts,
  } = useTutor();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;
    const msg = input.trim();
    setInput('');
    sendMessage(msg);
  };

  const handlePresetAction = (
    actionType: 'explain_simply' | 'real_world_example' | 'role_pm' | 'role_dev' | 'quiz_me' | 'deep_dive',
    promptText: string
  ) => {
    sendMessage(promptText, actionType);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#0b0d18] border-l border-[#1a1e2d] shadow-2xl flex flex-col animate-slideLeft">
      {/* Top Header */}
      <div className="p-4 border-b border-[#1a1e2d] flex items-center justify-between bg-[#0b0d18]/95 backdrop-blur">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#3d5afe] flex items-center justify-center text-white shadow-md shadow-[#3d5afe]/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="serif-display font-bold text-sm text-white">Ask Atlas</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#3d5afe]/15 text-[#3d5afe] border border-[#3d5afe]/30">
                AI Tutor
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Contextual learning companion</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={clearHistory}
            title="Clear conversation"
            className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#111424] rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={closeTutor}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#111424] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Lesson Context Banner */}
      {activeLesson && (
        <div className="px-4 py-2.5 bg-[#080a14] border-b border-[#1a1e2d] flex items-center space-x-2 text-xs">
          <BookOpen className="w-3.5 h-3.5 text-[#3d5afe] shrink-0" />
          <div className="truncate text-gray-300">
            <span className="text-gray-500 font-medium mr-1.5">Focus:</span>
            <span className="font-semibold text-white">{activeLesson.title}</span>
          </div>
        </div>
      )}

      {/* Action Shortcut Pills */}
      <div className="p-3 border-b border-[#1a1e2d] bg-[#080a14]/60 flex items-center space-x-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <button
          onClick={() => handlePresetAction('explain_simply', 'Explain this concept simply using an everyday analogy.')}
          disabled={isGenerating}
          className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] flex items-center space-x-1 shrink-0 transition-colors"
        >
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Explain Simply</span>
        </button>
        <button
          onClick={() => handlePresetAction('real_world_example', 'Give me a concrete real-world enterprise example of this.')}
          disabled={isGenerating}
          className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] flex items-center space-x-1 shrink-0 transition-colors"
        >
          <Sparkles className="w-3 h-3 text-[#3d5afe]" />
          <span>Real Example</span>
        </button>
        <button
          onClick={() => handlePresetAction('role_pm', 'Explain this from a Product Manager perspective.')}
          disabled={isGenerating}
          className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] flex items-center space-x-1 shrink-0 transition-colors"
        >
          <Briefcase className="w-3 h-3 text-purple-400" />
          <span>Like a PM</span>
        </button>
        <button
          onClick={() => handlePresetAction('role_dev', 'Provide technical architecture and code implementation details.')}
          disabled={isGenerating}
          className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] flex items-center space-x-1 shrink-0 transition-colors"
        >
          <Code2 className="w-3 h-3 text-emerald-400" />
          <span>Technical Deep Dive</span>
        </button>
        <button
          onClick={() => handlePresetAction('quiz_me', 'Quiz me on this concept to test my comprehension.')}
          disabled={isGenerating}
          className="px-2.5 py-1 rounded-lg bg-[#0b0d18] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] flex items-center space-x-1 shrink-0 transition-colors"
        >
          <HelpCircle className="w-3 h-3 text-rose-400" />
          <span>Quiz Me</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-1.5 mb-1 px-1">
              <span className="text-[10px] font-semibold text-gray-400">
                {msg.sender === 'user' ? 'You' : 'Atlas'}
              </span>
              <span className="text-[9px] text-gray-600">{msg.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl text-xs max-w-[90%] ${
                msg.sender === 'user'
                  ? 'bg-[#3d5afe] text-white rounded-tr-xs shadow-md shadow-[#3d5afe]/20'
                  : 'bg-[#080a14] text-gray-200 border border-[#1a1e2d] rounded-tl-xs shadow-sm'
              }`}
            >
              {msg.sender === 'atlas' ? (
                <div className="prose-editorial text-xs leading-relaxed space-y-2 text-gray-200">
                  <Markdown>{msg.text}</Markdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
            </div>

            {/* Follow-up suggested prompts */}
            {msg.sender === 'atlas' && msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                {msg.suggestedActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(action)}
                    disabled={isGenerating}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-[#080a14] hover:bg-[#111424] text-gray-300 hover:text-white border border-[#1a1e2d] transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center space-x-2 text-xs text-gray-400 p-2">
            <div className="w-4 h-4 rounded-full border-2 border-[#3d5afe] border-t-transparent animate-spin" />
            <span>Atlas is thinking & synthesizing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-[#1a1e2d] bg-[#0b0d18]/95">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            placeholder={activeLesson ? `Ask about ${activeLesson.title}...` : 'Ask Atlas any AI question...'}
            className="w-full pl-3 pr-10 py-2.5 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#3d5afe] focus:ring-1 focus:ring-[#3d5afe] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-1.5 p-1.5 bg-[#3d5afe] hover:bg-[#536dfe] disabled:opacity-40 text-white rounded-lg transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
