import { useState, useEffect } from 'react';
import { BookOpen, Heart, Calendar, Edit3, Save, Trash2, Plus, Star, Brain, Smile, Meh, Frown, Sparkles, Moon, Sun, CloudRain } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  verse?: string;
  character?: string;
  reflection: string;
  prayer?: string;
  tags: string[];
  isFavorite: boolean;
  // New emotional well-being fields
  emotionalState?: {
    rating: number; // 1-10 scale
    feelings: string[];
    details: string;
    triggers: string[];
  };
  aiGeneratedPrayer?: string;
}

interface SpiritualJournalProps {
  className?: string;
}

const REFLECTION_PROMPTS = [
  "What does this verse teach me about God's character?",
  "How can I apply this truth to my current situation?",
  "What does this reveal about my relationship with God?",
  "How does this challenge or encourage me?",
  "What action can I take based on this insight?",
  "How can I share this truth with others?",
  "What does this teach me about prayer?",
  "How does this relate to my spiritual growth?"
];

const PRAYER_PROMPTS = [
  "Thank God for what He's teaching you",
  "Ask for wisdom to apply this truth",
  "Pray for strength to live it out",
  "Intercede for others who need this truth",
  "Confess any areas where you fall short",
  "Ask for God's guidance in your decisions"
];

const EMOTIONAL_STATES = {
  1: { label: "Very Distressed", icon: <Frown className="w-5 h-5 text-red-500" />, color: "text-red-600 bg-red-50 border-red-200", gradient: "from-red-500 to-red-600" },
  2: { label: "Sad", icon: <Frown className="w-5 h-5 text-red-400" />, color: "text-red-500 bg-red-50 border-red-200", gradient: "from-red-400 to-red-500" },
  3: { label: "Down", icon: <Meh className="w-5 h-5 text-orange-500" />, color: "text-orange-600 bg-orange-50 border-orange-200", gradient: "from-orange-500 to-orange-600" },
  4: { label: "Low", icon: <Meh className="w-5 h-5 text-orange-400" />, color: "text-orange-500 bg-orange-50 border-orange-200", gradient: "from-orange-400 to-orange-500" },
  5: { label: "Neutral", icon: <Meh className="w-5 h-5 text-yellow-500" />, color: "text-yellow-600 bg-yellow-50 border-yellow-200", gradient: "from-yellow-500 to-yellow-600" },
  6: { label: "Okay", icon: <Smile className="w-5 h-5 text-yellow-400" />, color: "text-yellow-500 bg-yellow-50 border-yellow-200", gradient: "from-yellow-400 to-yellow-500" },
  7: { label: "Good", icon: <Smile className="w-5 h-5 text-green-500" />, color: "text-green-600 bg-green-50 border-green-200", gradient: "from-green-500 to-green-600" },
  8: { label: "Happy", icon: <Smile className="w-5 h-5 text-green-400" />, color: "text-green-500 bg-green-50 border-green-200", gradient: "from-green-400 to-green-500" },
  9: { label: "Very Happy", icon: <Smile className="w-5 h-5 text-blue-500" />, color: "text-blue-600 bg-blue-50 border-blue-200", gradient: "from-blue-500 to-blue-600" },
  10: { label: "Excellent", icon: <Smile className="w-5 h-5 text-blue-400" />, color: "text-blue-500 bg-blue-50 border-blue-200", gradient: "from-blue-400 to-blue-500" }
};

const COMMON_FEELINGS = [
  "Anxious", "Stressed", "Overwhelmed", "Frustrated", "Angry", "Sad", "Lonely", "Hopeless",
  "Grateful", "Peaceful", "Joyful", "Excited", "Hopeful", "Loved", "Confident", "Inspired",
  "Confused", "Uncertain", "Tired", "Restless", "Content", "Satisfied", "Blessed", "Thankful"
];

// AI Prayer Generator based on emotional state
const generatePrayer = (emotionalState: any): string => {
  const { rating, feelings, details, triggers } = emotionalState;
  
  let prayer = "";
  
  if (rating <= 3) {
    // Low emotional state - prayers for comfort and strength
    prayer = `Dear Heavenly Father,\n\n`;
    prayer += `I come before You today feeling ${feelings.join(', ').toLowerCase()}. ${details}\n\n`;
    prayer += `Lord, You know the struggles I'm facing and the things that are weighing on my heart. `;
    prayer += `I ask for Your comfort and peace that surpasses all understanding (Philippians 4:7). `;
    prayer += `Help me to cast all my anxiety on You because You care for me (1 Peter 5:7).\n\n`;
    prayer += `Give me strength to face each day and remind me that You are my refuge and strength, `;
    prayer += `an ever-present help in trouble (Psalm 46:1). Help me to trust in Your perfect plan `;
    prayer += `and to find rest in Your presence.\n\n`;
    prayer += `In Jesus' name, Amen.`;
  } else if (rating <= 6) {
    // Medium emotional state - prayers for guidance and growth
    prayer = `Dear Lord,\n\n`;
    prayer += `Thank You for being with me today. I'm feeling ${feelings.join(', ').toLowerCase()}. ${details}\n\n`;
    prayer += `I ask for Your guidance and wisdom as I navigate through this season. `;
    prayer += `Help me to see Your hand at work in my life and to trust in Your timing. `;
    prayer += `Give me the courage to take the next steps You have planned for me.\n\n`;
    prayer += `I pray that You would use these experiences to draw me closer to You and `;
    prayer += `to help me grow in faith and character. Help me to find joy in You `;
    prayer += `regardless of my circumstances.\n\n`;
    prayer += `In Jesus' name, Amen.`;
  } else {
    // High emotional state - prayers of thanksgiving and service
    prayer = `Heavenly Father,\n\n`;
    prayer += `I am filled with gratitude today! I'm feeling ${feelings.join(', ').toLowerCase()}. ${details}\n\n`;
    prayer += `Thank You for the many blessings You have poured into my life. `;
    prayer += `I praise You for Your faithfulness and love that never fails. `;
    prayer += `Help me to use this joy and energy to serve others and bring glory to Your name.\n\n`;
    prayer += `May my heart overflow with thanksgiving and may I be a light to those around me. `;
    prayer += `Help me to remember that every good and perfect gift comes from You (James 1:17).\n\n`;
    prayer += `In Jesus' name, Amen.`;
  }
  
  return prayer;
};

export default function SpiritualJournal({ className = '' }: SpiritualJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    reflection: '',
    prayer: '',
    tags: [],
    isFavorite: false,
    emotionalState: {
      rating: 5,
      feelings: [],
      details: '',
      triggers: []
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'verses' | 'characters' | 'emotional'>('all');
  const [showEmotionalTracking, setShowEmotionalTracking] = useState(false);

  // Load entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('spiritual-journal-entries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      })));
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem('spiritual-journal-entries', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleSave = () => {
    if (!currentEntry.reflection?.trim()) return;

    // Generate AI prayer if emotional state is provided
    let aiGeneratedPrayer = '';
    if (currentEntry.emotionalState && currentEntry.emotionalState.rating && currentEntry.emotionalState.details) {
      aiGeneratedPrayer = generatePrayer(currentEntry.emotionalState);
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      verse: currentEntry.verse,
      character: currentEntry.character,
      reflection: currentEntry.reflection,
      prayer: currentEntry.prayer,
      tags: currentEntry.tags || [],
      isFavorite: currentEntry.isFavorite || false,
      emotionalState: currentEntry.emotionalState,
      aiGeneratedPrayer: aiGeneratedPrayer
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    
    // Reset form
    setCurrentEntry({
      reflection: '',
      prayer: '',
      tags: [],
      isFavorite: false,
      emotionalState: {
        rating: 5,
        feelings: [],
        details: '',
        triggers: []
      }
    });
    setIsEditing(false);
    setShowEmotionalTracking(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      saveEntries(updatedEntries);
    }
  };

  const toggleFavorite = (id: string) => {
    const updatedEntries = entries.map(entry =>
      entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
    );
    saveEntries(updatedEntries);
  };

  const addTag = (tag: string) => {
    if (!currentEntry.tags?.includes(tag)) {
      setCurrentEntry(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag]
      }));
    }
  };

  const removeTag = (tag: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const addFeeling = (feeling: string) => {
    if (!currentEntry.emotionalState?.feelings.includes(feeling)) {
      setCurrentEntry(prev => ({
        ...prev,
        emotionalState: {
          ...prev.emotionalState!,
          feelings: [...(prev.emotionalState?.feelings || []), feeling]
        }
      }));
    }
  };

  const removeFeeling = (feeling: string) => {
    setCurrentEntry(prev => ({
      ...prev,
      emotionalState: {
        ...prev.emotionalState!,
        feelings: prev.emotionalState?.feelings.filter(f => f !== feeling) || []
      }
    }));
  };

  const filteredEntries = entries.filter(entry => {
    switch (filter) {
      case 'favorites':
        return entry.isFavorite;
      case 'verses':
        return entry.verse;
      case 'characters':
        return entry.character;
      case 'emotional':
        return entry.emotionalState;
      default:
        return true;
    }
  });

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 ${className}`}>
      {/* Enhanced Header with Glassmorphism */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
                  <Sparkles className="w-8 h-8 mr-3 text-yellow-300" />
                  Spiritual Reflection Journal
                </h2>
                <p className="text-indigo-100 text-lg">
                  Record your spiritual insights, prayers, and emotional well-being
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                  <div className="text-2xl font-bold text-white">{entries.length}</div>
                  <div className="text-indigo-100 text-sm">Total Entries</div>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-center">
                  <div className="text-2xl font-bold text-white">
                    {entries.filter(e => e.emotionalState).length}
                  </div>
                  <div className="text-indigo-100 text-sm">Emotional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Enhanced Entry Buttons */}
        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setIsEditing(true)}
              className="group relative p-8 border-2 border-dashed border-blue-300 rounded-2xl hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl group-hover:shadow-lg transition-shadow duration-300">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Reflection</h3>
                  <p className="text-gray-600">Record your spiritual insights and Bible study</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => {
                setIsEditing(true);
                setShowEmotionalTracking(true);
              }}
              className="group relative p-8 border-2 border-dashed border-purple-300 rounded-2xl hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl group-hover:shadow-lg transition-shadow duration-300">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Emotional Well-being</h3>
                  <p className="text-gray-600">Monitor your feelings and get AI-generated prayers</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {showEmotionalTracking ? 'Emotional Well-being & Reflection' : 'New Reflection'}
                </h3>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setShowEmotionalTracking(false);
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!currentEntry.reflection?.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Entry</span>
                </button>
              </div>
            </div>

            {/* Enhanced Emotional Well-being Section */}
            {showEmotionalTracking && (
              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                <h4 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-3">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  How are you feeling today?
                </h4>
                
                {/* Enhanced Emotional Rating Scale */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    On a scale of 1-10, how are you feeling?
                  </label>
                  <div className="grid grid-cols-10 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setCurrentEntry(prev => ({
                          ...prev,
                          emotionalState: {
                            ...prev.emotionalState!,
                            rating
                          }
                        }))}
                        className={`group relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                          currentEntry.emotionalState?.rating === rating
                            ? 'bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg scale-110'
                            : 'hover:bg-purple-100'
                        }`}
                      >
                        <div className={`${currentEntry.emotionalState?.rating === rating ? 'text-white' : 'text-gray-600 group-hover:text-purple-600'} transition-colors duration-200`}>
                          {EMOTIONAL_STATES[rating as keyof typeof EMOTIONAL_STATES].icon}
                        </div>
                        <span className={`text-sm font-bold mt-1 ${currentEntry.emotionalState?.rating === rating ? 'text-white' : 'text-gray-700'}`}>
                          {rating}
                        </span>
                        <span className={`text-xs text-center ${currentEntry.emotionalState?.rating === rating ? 'text-purple-100' : 'text-gray-500'}`}>
                          {EMOTIONAL_STATES[rating as keyof typeof EMOTIONAL_STATES].label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Feelings Selection */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    What specific feelings are you experiencing?
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentEntry.emotionalState?.feelings.map((feeling, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-sm font-medium flex items-center space-x-2 shadow-md"
                      >
                        <span>{feeling}</span>
                        <button
                          onClick={() => removeFeeling(feeling)}
                          className="hover:bg-white/20 rounded-full p-1 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {COMMON_FEELINGS.map((feeling) => (
                      <button
                        key={feeling}
                        onClick={() => addFeeling(feeling)}
                        disabled={currentEntry.emotionalState?.feelings.includes(feeling)}
                        className="px-3 py-2 text-sm bg-white border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                      >
                        {feeling}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Detailed Feelings */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Tell me more about how you're feeling and what's on your mind
                  </label>
                  <textarea
                    value={currentEntry.emotionalState?.details || ''}
                    onChange={(e) => setCurrentEntry(prev => ({
                      ...prev,
                      emotionalState: {
                        ...prev.emotionalState!,
                        details: e.target.value
                      }
                    }))}
                    placeholder="Describe your feelings, thoughts, and what's happening in your life right now..."
                    rows={4}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                  />
                </div>

                {/* Enhanced Contributing Factors */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    What's contributing to how you're feeling? (optional)
                  </label>
                  <textarea
                    value={currentEntry.emotionalState?.triggers.join(', ') || ''}
                    onChange={(e) => setCurrentEntry(prev => ({
                      ...prev,
                      emotionalState: {
                        ...prev.emotionalState!,
                        triggers: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      }
                    }))}
                    placeholder="e.g., work stress, relationship issues, health concerns, upcoming events..."
                    rows={2}
                    className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Enhanced Verse/Character Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Bible Verse (optional)
                </label>
                <input
                  type="text"
                  value={currentEntry.verse || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, verse: e.target.value }))}
                  placeholder="e.g., John 3:16"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Biblical Character (optional)
                </label>
                <input
                  type="text"
                  value={currentEntry.character || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, character: e.target.value }))}
                  placeholder="e.g., David, Paul"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Enhanced Reflection Prompts */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Reflection Prompts
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {REFLECTION_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(prompt)}
                    className="p-3 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-105"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Reflection Text */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Your Reflection *
              </label>
              <textarea
                value={currentEntry.reflection}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder={selectedPrompt || "What is God teaching you? How does this apply to your life?"}
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            {/* Enhanced Prayer Prompts */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Prayer Prompts
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PRAYER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEntry(prev => ({ ...prev, prayer: prompt }))}
                    className="p-3 text-sm bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-300 transition-all duration-200 transform hover:scale-105"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Prayer Text */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Prayer (optional)
              </label>
              <textarea
                value={currentEntry.prayer || ''}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, prayer: e.target.value }))}
                placeholder="Write your prayer here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            {/* Enhanced Tags */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentEntry.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-medium flex items-center space-x-2 shadow-md"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-white/20 rounded-full p-1 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                {['faith', 'prayer', 'forgiveness', 'trust', 'love', 'hope', 'grace'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    disabled={currentEntry.tags?.includes(tag)}
                    className="px-3 py-2 text-sm bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-8">
          <nav className="flex space-x-2">
            {[
              { id: 'all', label: 'All Entries', count: entries.length, icon: <BookOpen className="w-4 h-4" /> },
              { id: 'favorites', label: 'Favorites', count: entries.filter(e => e.isFavorite).length, icon: <Star className="w-4 h-4" /> },
              { id: 'verses', label: 'Verse Reflections', count: entries.filter(e => e.verse).length, icon: <BookOpen className="w-4 h-4" /> },
              { id: 'characters', label: 'Character Studies', count: entries.filter(e => e.character).length, icon: <Heart className="w-4 h-4" /> },
              { id: 'emotional', label: 'Emotional Tracking', count: entries.filter(e => e.emotionalState).length, icon: <Brain className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`flex items-center space-x-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`py-1 px-2 rounded-full text-xs ${
                  filter === tab.id ? 'bg-white/20' : 'bg-gray-100'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Enhanced Entries List */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                <BookOpen className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No entries yet</h3>
                <p className="text-gray-500">Start your spiritual journey by adding your first reflection.</p>
              </div>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={`group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  entry.isFavorite ? 'ring-2 ring-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50' : ''
                }`}
              >
                {/* Enhanced Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {entry.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    {entry.isFavorite && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs text-yellow-600 font-medium">Favorite</span>
                      </div>
                    )}
                    {entry.emotionalState && (
                      <div className="flex items-center space-x-2">
                        <div className="p-1 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                          {EMOTIONAL_STATES[entry.emotionalState.rating as keyof typeof EMOTIONAL_STATES].icon}
                        </div>
                        <span className="text-xs font-medium text-gray-600">
                          {entry.emotionalState.rating}/10
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                    >
                      <Star className={`w-4 h-4 ${entry.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Enhanced Emotional State Display */}
                {entry.emotionalState && (
                  <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <h5 className="font-bold text-purple-900 mb-3 flex items-center">
                      <div className="p-1 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mr-2">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      Emotional Well-being
                    </h5>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${EMOTIONAL_STATES[entry.emotionalState.rating as keyof typeof EMOTIONAL_STATES].color}`}>
                        {entry.emotionalState.rating}/10 - {EMOTIONAL_STATES[entry.emotionalState.rating as keyof typeof EMOTIONAL_STATES].label}
                      </span>
                    </div>
                    {entry.emotionalState.feelings.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm text-purple-700 font-medium">Feelings: </span>
                        <span className="text-sm text-purple-600">{entry.emotionalState.feelings.join(', ')}</span>
                      </div>
                    )}
                    {entry.emotionalState.details && (
                      <div className="mb-3">
                        <p className="text-sm text-purple-700 leading-relaxed">{entry.emotionalState.details}</p>
                      </div>
                    )}
                    {entry.emotionalState.triggers.length > 0 && (
                      <div>
                        <span className="text-sm text-purple-700 font-medium">Contributing factors: </span>
                        <span className="text-sm text-purple-600">{entry.emotionalState.triggers.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Verse/Character Tags */}
                {(entry.verse || entry.character) && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {entry.verse && (
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-medium shadow-md">
                        {entry.verse}
                      </span>
                    )}
                    {entry.character && (
                      <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-medium shadow-md">
                        {entry.character}
                      </span>
                    )}
                  </div>
                )}

                {/* Enhanced Reflection */}
                <div className="mb-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{entry.reflection}</p>
                </div>

                {/* Enhanced Prayer */}
                {entry.prayer && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-xl">
                    <p className="text-green-800 text-sm italic leading-relaxed">{entry.prayer}</p>
                  </div>
                )}

                {/* Enhanced AI Generated Prayer */}
                {entry.aiGeneratedPrayer && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-xl">
                    <h6 className="text-blue-900 text-sm font-bold mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI-Generated Prayer
                    </h6>
                    <p className="text-blue-800 text-sm whitespace-pre-wrap leading-relaxed">{entry.aiGeneratedPrayer}</p>
                  </div>
                )}

                {/* Enhanced Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 