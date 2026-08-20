import React, { createContext, useContext, useState, useCallback } from 'react';
import { Lesson, TutorMessage } from '../types';
import { useAuth } from './AuthContext';

interface TutorContextType {
  isOpen: boolean;
  activeLesson: Lesson | null;
  messages: TutorMessage[];
  isGenerating: boolean;
  openTutor: (lesson?: Lesson, presetPrompt?: string) => void;
  closeTutor: () => void;
  sendMessage: (
    messageText: string,
    actionType?: 'explain_simply' | 'real_world_example' | 'role_pm' | 'role_dev' | 'quiz_me' | 'deep_dive' | 'general'
  ) => Promise<void>;
  clearHistory: () => void;
  suggestedPrompts: string[];
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

export const TutorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'welcome-1',
      sender: 'atlas',
      text: "Hello! I'm **Atlas**, your personal AI learning coach.\n\nI can help break down complex concepts, give you real-world product analogies, or quiz you on any lesson. What would you like to explore today?",
      timestamp: 'Just now',
      suggestedActions: [
        'Explain this simply',
        'Give me a real-world example',
        'Explain like a PM',
        'Quiz me on this',
      ],
    },
  ]);

  const suggestedPrompts = [
    'Explain this simply',
    'Give me a real-world example',
    'Explain like a product manager',
    'Explain the technical architecture',
    'Quiz me on this',
    'How is this used in real life?',
  ];

  const sendMessage = useCallback(
    async (
      messageText: string,
      actionType: 'explain_simply' | 'real_world_example' | 'role_pm' | 'role_dev' | 'quiz_me' | 'deep_dive' | 'general' = 'general'
    ) => {
      const userMsg: TutorMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextLessonId: activeLesson?.id,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsGenerating(true);

      try {
        const chatHistory = messages.map((m) => ({
          role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
          content: m.text,
        }));

        const res = await fetch('/api/tutor/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageText,
            lesson: activeLesson,
            userProfile: user,
            chatHistory,
            actionType,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const tutorMsg: TutorMessage = {
            id: `atlas-${Date.now()}`,
            sender: 'atlas',
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedActions: data.suggestedActions || [
              'Explain this simply',
              'Give me an example',
              'Go deeper',
            ],
            contextLessonId: activeLesson?.id,
          };
          setMessages((prev) => [...prev, tutorMsg]);
        } else {
          throw new Error('Server error');
        }
      } catch {
        // Fallback response
        const fallbackMsg: TutorMessage = {
          id: `atlas-fallback-${Date.now()}`,
          sender: 'atlas',
          text: activeLesson
            ? `Here is the core takeaway for **${activeLesson.title}**:\n\n${activeLesson.bigIdea}\n\n*Key takeaway:* ${activeLesson.keyTakeaways[0] || 'Understand the pattern to apply it.'}`
            : 'I am here to guide your AI learning path. Select a lesson or ask a question about AI concepts.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          contextLessonId: activeLesson?.id,
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setIsGenerating(false);
      }
    },
    [activeLesson, messages, user]
  );

  const openTutor = useCallback(
    (lesson?: Lesson, presetPrompt?: string) => {
      if (lesson) {
        setActiveLesson(lesson);
        // Add contextual greeting if different lesson
        if (!activeLesson || activeLesson.id !== lesson.id) {
          const introMsg: TutorMessage = {
            id: `atlas-lesson-${Date.now()}`,
            sender: 'atlas',
            text: `I see you are learning **"${lesson.title}"**.\n\n*The Big Idea:* ${lesson.bigIdea}\n\nHow can I help you understand or apply this?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            contextLessonId: lesson.id,
            suggestedActions: [
              'Explain this simply',
              'Give me a real-world example',
              'Explain like a PM',
              'Quiz me on this',
            ],
          };
          setMessages((prev) => [...prev, introMsg]);
        }
      }
      setIsOpen(true);

      if (presetPrompt) {
        setTimeout(() => {
          sendMessage(presetPrompt);
        }, 150);
      }
    },
    [activeLesson, sendMessage]
  );

  const closeTutor = () => {
    setIsOpen(false);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'atlas',
        text: "Conversation cleared. What AI topic would you like to explore next?",
        timestamp: 'Just now',
        suggestedActions: [
          'Explain Large Language Models',
          'What is RAG?',
          'How do AI Agents work?',
        ],
      },
    ]);
  };

  return (
    <TutorContext.Provider
      value={{
        isOpen,
        activeLesson,
        messages,
        isGenerating,
        openTutor,
        closeTutor,
        sendMessage,
        clearHistory,
        suggestedPrompts,
      }}
    >
      {children}
    </TutorContext.Provider>
  );
};

export const useTutor = () => {
  const context = useContext(TutorContext);
  if (!context) {
    throw new Error('useTutor must be used within a TutorProvider');
  }
  return context;
};
