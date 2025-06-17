import { useState, useEffect } from 'react';
import { BookOpen, Heart, Calendar, Edit3, Save, Trash2, Plus, Star } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  verse?: string;
  character?: string;
  reflection: string;
  prayer?: string;
  tags: string[];
  isFavorite: boolean;
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

export default function SpiritualJournal({ className = '' }: SpiritualJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Partial<JournalEntry>>({
    reflection: '',
    prayer: '',
    tags: [],
    isFavorite: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'verses' | 'characters'>('all');

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

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date(),
      verse: currentEntry.verse,
      character: currentEntry.character,
      reflection: currentEntry.reflection,
      prayer: currentEntry.prayer,
      tags: currentEntry.tags || [],
      isFavorite: currentEntry.isFavorite || false
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);
    
    // Reset form
    setCurrentEntry({
      reflection: '',
      prayer: '',
      tags: [],
      isFavorite: false
    });
    setIsEditing(false);
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

  const filteredEntries = entries.filter(entry => {
    switch (filter) {
      case 'favorites':
        return entry.isFavorite;
      case 'verses':
        return entry.verse;
      case 'characters':
        return entry.character;
      default:
        return true;
    }
  });

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Spiritual Reflection Journal</h2>
            <p className="text-green-100">
              Record your spiritual insights, prayers, and reflections
            </p>
          </div>
          <Heart className="w-8 h-8 text-green-200" />
        </div>
      </div>

      <div className="p-6">
        {/* New Entry Form */}
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 font-medium">Add New Reflection</span>
          </button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Reflection</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!currentEntry.reflection?.trim()}
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Verse/Character Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bible Verse (optional)
                </label>
                <input
                  type="text"
                  value={currentEntry.verse || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, verse: e.target.value }))}
                  placeholder="e.g., John 3:16"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biblical Character (optional)
                </label>
                <input
                  type="text"
                  value={currentEntry.character || ''}
                  onChange={(e) => setCurrentEntry(prev => ({ ...prev, character: e.target.value }))}
                  placeholder="e.g., David, Paul"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reflection Prompts */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reflection Prompts
              </label>
              <div className="flex flex-wrap gap-2">
                {REFLECTION_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(prompt)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Reflection *
              </label>
              <textarea
                value={currentEntry.reflection}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder={selectedPrompt || "What is God teaching you? How does this apply to your life?"}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Prayer Prompts */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer Prompts
              </label>
              <div className="flex flex-wrap gap-2">
                {PRAYER_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEntry(prev => ({ ...prev, prayer: prompt }))}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Prayer Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prayer (optional)
              </label>
              <textarea
                value={currentEntry.prayer || ''}
                onChange={(e) => setCurrentEntry(prev => ({ ...prev, prayer: e.target.value }))}
                placeholder="Write your prayer here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentEntry.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['faith', 'prayer', 'forgiveness', 'trust', 'love', 'hope', 'grace'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    disabled={currentEntry.tags?.includes(tag)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'all', label: 'All Entries', count: entries.length },
              { id: 'favorites', label: 'Favorites', count: entries.filter(e => e.isFavorite).length },
              { id: 'verses', label: 'Verse Reflections', count: entries.filter(e => e.verse).length },
              { id: 'characters', label: 'Character Studies', count: entries.filter(e => e.character).length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No entries yet. Start your spiritual journey by adding your first reflection.</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className={`border rounded-lg p-4 ${entry.isFavorite ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {entry.date.toLocaleDateString()}
                    </span>
                    {entry.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      <Star className={`w-4 h-4 ${entry.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {(entry.verse || entry.character) && (
                  <div className="mb-3">
                    {entry.verse && (
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm mr-2">
                        {entry.verse}
                      </span>
                    )}
                    {entry.character && (
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                        {entry.character}
                      </span>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <p className="text-gray-900 whitespace-pre-wrap">{entry.reflection}</p>
                </div>

                {entry.prayer && (
                  <div className="mb-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                    <p className="text-green-800 text-sm italic">{entry.prayer}</p>
                  </div>
                )}

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
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