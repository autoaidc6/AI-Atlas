import React, { useState } from 'react';
import {
  Database,
  Plus,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { ContentCategory, DifficultyLevel, Lesson } from '../types';

interface AdminViewProps {
  onSelectLesson: (lessonId: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onSelectLesson }) => {
  const { paths, createAdminLesson, updateAdminLesson } = useLearning();

  const [selectedPathId, setSelectedPathId] = useState<string>(paths[0]?.id || 'path-1');
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    paths[0]?.modules[0]?.id || 'mod-ai-1'
  );

  const [isCreating, setIsCreating] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(8);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');
  const [category, setCategory] = useState<ContentCategory>('AI Fundamentals');
  const [bigIdea, setBigIdea] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [simpleExplanation, setSimpleExplanation] = useState('');
  const [goDeeper, setGoDeeper] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState('• Focus on user value\n• Design for probabilistic fallback');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const activePath = paths.find((p) => p.id === selectedPathId) || paths[0];

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingLessonId(null);
    setTitle('');
    setBigIdea('');
    setWhyItMatters('');
    setSimpleExplanation('');
    setGoDeeper('');
    setKeyTakeaways('• Key takeaway 1\n• Key takeaway 2');
  };

  const handleStartEdit = (lesson: Lesson) => {
    setIsCreating(false);
    setEditingLessonId(lesson.id);
    setTitle(lesson.title);
    setDurationMinutes(lesson.durationMinutes);
    setDifficulty(lesson.difficulty);
    setCategory(lesson.category);
    setBigIdea(lesson.bigIdea);
    setWhyItMatters(lesson.whyItMatters);
    setSimpleExplanation(lesson.simpleExplanation);
    setGoDeeper(lesson.goDeeper);
    setKeyTakeaways(lesson.keyTakeaways.join('\n'));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !bigIdea) {
      alert('Please provide at least a Title and The Big Idea.');
      return;
    }

    const lessonPayload: Partial<Lesson> = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      durationMinutes,
      difficulty,
      category,
      bigIdea,
      whyItMatters,
      simpleExplanation,
      keyIdeas: [
        {
          title: 'Core Architectural Principle',
          summary: bigIdea,
        },
      ],
      realWorldExample: {
        scenario: 'Modern high-throughput production deployment',
        impact: 'Reduced operational latency and increased accuracy.',
      },
      goDeeper,
      keyTakeaways: keyTakeaways.split('\n').filter((t) => t.trim().length > 0),
      quiz: {
        id: `quiz-${Date.now()}`,
        lessonId: editingLessonId || `lesson-${Date.now()}`,
        title: `Comprehension Check: ${title}`,
        questions: [
          {
            id: 'q1',
            question: `What is the core principle behind ${title}?`,
            options: [
              { id: 'opt1', text: bigIdea },
              { id: 'opt2', text: 'It replaces all compute infrastructure completely' },
              { id: 'opt3', text: 'It requires zero training or configuration' },
            ],
            correctOptionId: 'opt1',
            explanation: `As covered in the lesson: ${bigIdea}`,
          },
        ],
      },
      status: 'published',
    };

    if (isCreating) {
      const ok = await createAdminLesson(selectedPathId, selectedModuleId, lessonPayload);
      if (ok) {
        setStatusMessage('Lesson created and published into curriculum!');
        setIsCreating(false);
      }
    } else if (editingLessonId) {
      const ok = await updateAdminLesson(editingLessonId, lessonPayload);
      if (ok) {
        setStatusMessage('Lesson updated successfully.');
        setEditingLessonId(null);
      }
    }

    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#3d5afe] uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" />
            <span>Curriculum Editorial CMS</span>
          </div>
          <h1 className="serif-display text-2xl sm:text-3xl italic text-white mt-1">
            Curriculum Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Author, edit, and organize 12-section micro-lessons, quizzes, and path taxonomies.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 bg-[#3d5afe] hover:bg-[#536dfe] text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition-colors self-start shadow-lg shadow-[#3d5afe]/25"
        >
          <Plus className="w-4 h-4" />
          <span>New Lesson</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Path / Module Selectors */}
      <div className="p-5 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target Learning Path</label>
          <select
            value={selectedPathId}
            onChange={(e) => {
              setSelectedPathId(e.target.value);
              const p = paths.find((item) => item.id === e.target.value);
              if (p && p.modules[0]) {
                setSelectedModuleId(p.modules[0].id);
              }
            }}
            className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
          >
            {paths.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0b0d18]">
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Target Module</label>
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
          >
            {activePath?.modules.map((m) => (
              <option key={m.id} value={m.id} className="bg-[#0b0d18]">
                {m.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Editor Modal / Inline Form */}
      {(isCreating || editingLessonId) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0b0d18] border border-[#3d5afe]/40 space-y-4 shadow-2xl glass-border animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a1e2d]">
            <h3 className="text-base font-bold text-white">
              {isCreating ? 'Create New 12-Section Lesson' : `Edit: ${title}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingLessonId(null);
              }}
              className="text-xs text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vector Search & Cosine Distance"
                className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
              >
                <option value="Beginner" className="bg-[#0b0d18]">Beginner</option>
                <option value="Intermediate" className="bg-[#0b0d18]">Intermediate</option>
                <option value="Advanced" className="bg-[#0b0d18]">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">1. The Big Idea (1 Sentence Hook)</label>
            <input
              type="text"
              value={bigIdea}
              onChange={(e) => setBigIdea(e.target.value)}
              placeholder="High-dimensional geometric representations of semantic meaning."
              className="w-full px-3 py-2 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">2. Why It Matters</label>
              <textarea
                value={whyItMatters}
                onChange={(e) => setWhyItMatters(e.target.value)}
                rows={3}
                placeholder="Explains the practical business and engineering stakes..."
                className="w-full p-3 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">3. Simple Explanation (Analogy)</label>
              <textarea
                value={simpleExplanation}
                onChange={(e) => setSimpleExplanation(e.target.value)}
                rows={3}
                placeholder="Intuitive mental model for beginners..."
                className="w-full p-3 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white focus:outline-none focus:border-[#3d5afe]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">4. Technical Go Deeper (Architecture & Code)</label>
            <textarea
              value={goDeeper}
              onChange={(e) => setGoDeeper(e.target.value)}
              rows={3}
              placeholder="Mathematical formulation or architectural notes..."
              className="w-full p-3 bg-[#080a14] border border-[#1a1e2d] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-[#3d5afe]"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-[#1a1e2d]">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingLessonId(null);
              }}
              className="px-4 py-2 bg-[#080a14] hover:bg-[#111424] text-gray-300 rounded-xl text-xs font-semibold border border-[#1a1e2d]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#3d5afe] hover:bg-[#536dfe] text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-[#3d5afe]/25"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish Lesson</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Lessons in Current Module */}
      <div className="p-6 rounded-2xl bg-[#0b0d18] border border-[#1a1e2d] glass-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            Lessons in {activePath?.title}
          </h3>
          <span className="text-xs text-gray-400">{activePath?.totalLessons} total lessons</span>
        </div>

        <div className="space-y-3">
          {activePath?.modules.map((mod) => (
            <div key={mod.id} className="p-4 rounded-xl bg-[#080a14] border border-[#1a1e2d] space-y-2">
              <div className="text-xs font-bold text-gray-300">{mod.title}</div>
              <div className="space-y-1.5">
                {mod.lessons.map((l) => (
                  <div
                    key={l.id}
                    className="p-3 rounded-lg bg-[#0b0d18] border border-[#1a1e2d] flex items-center justify-between hover:border-gray-600 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{l.title}</div>
                      <div className="text-[10px] text-gray-400">{l.durationMinutes || l.estimatedMinutes || 8}m • {l.difficulty}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectLesson(l.id)}
                        title="Preview Lesson"
                        className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-[#111424]"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(l)}
                        title="Edit Lesson"
                        className="p-1.5 text-gray-400 hover:text-[#3d5afe] rounded hover:bg-[#111424]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
