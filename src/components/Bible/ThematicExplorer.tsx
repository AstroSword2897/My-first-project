import { useState } from 'react';
import { Heart, Shield, Users, Cross, Star, BookOpen, ArrowRight } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  verses: string[];
  characters: string[];
  reflectionQuestions: string[];
}

const SPIRITUAL_THEMES: Theme[] = [
  {
    id: 'faith',
    name: 'Faith & Trust',
    description: 'Learning to trust in God\'s promises and walk by faith',
    icon: <Heart className="w-6 h-6" />,
    color: 'bg-red-500',
    verses: ['Hebrews 11:1', 'Proverbs 3:5-6', 'Matthew 17:20', 'Romans 10:17'],
    characters: ['Abraham', 'Moses', 'David', 'Peter'],
    reflectionQuestions: [
      'What does it mean to walk by faith and not by sight?',
      'How can I trust God more in difficult situations?',
      'What promises of God do I need to hold onto today?'
    ]
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness',
    description: 'Understanding God\'s forgiveness and extending it to others',
    icon: <Shield className="w-6 h-6" />,
    color: 'bg-green-500',
    verses: ['Matthew 6:14-15', 'Colossians 3:13', 'Ephesians 4:32', 'Psalm 103:12'],
    characters: ['Joseph', 'David', 'Peter', 'Paul'],
    reflectionQuestions: [
      'What does it mean to forgive as God has forgiven me?',
      'How can I let go of past hurts and bitterness?',
      'What steps can I take to reconcile with someone I\'ve hurt?'
    ]
  },
  {
    id: 'leadership',
    name: 'Leadership & Service',
    description: 'Biblical principles for leading with humility and serving others',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-500',
    verses: ['Mark 10:42-45', '1 Peter 5:2-3', 'Philippians 2:3-4', 'John 13:12-17'],
    characters: ['Moses', 'Joshua', 'Nehemiah', 'Jesus'],
    reflectionQuestions: [
      'How can I lead with humility and serve others?',
      'What does it mean to be a servant leader?',
      'How can I use my gifts to serve God and others?'
    ]
  },
  {
    id: 'suffering',
    name: 'Suffering & Hope',
    description: 'Finding hope and purpose in times of difficulty',
    icon: <Cross className="w-6 h-6" />,
    color: 'bg-purple-500',
    verses: ['Romans 8:28', 'James 1:2-4', '2 Corinthians 4:17-18', 'Psalm 34:18'],
    characters: ['Job', 'Joseph', 'Paul', 'Jesus'],
    reflectionQuestions: [
      'How can I find meaning in my current struggles?',
      'What does it mean that God works all things for good?',
      'How can I support others who are suffering?'
    ]
  },
  {
    id: 'redemption',
    name: 'Redemption & Grace',
    description: 'God\'s amazing grace and the power of transformation',
    icon: <Star className="w-6 h-6" />,
    color: 'bg-yellow-500',
    verses: ['Ephesians 2:8-9', 'Romans 3:23-24', '2 Corinthians 5:17', 'John 3:16'],
    characters: ['Rahab', 'Paul', 'Mary Magdalene', 'Peter'],
    reflectionQuestions: [
      'How has God\'s grace transformed my life?',
      'What does it mean to be a new creation in Christ?',
      'How can I extend grace to others as God has to me?'
    ]
  },
  {
    id: 'prayer',
    name: 'Prayer & Relationship',
    description: 'Deepening your relationship with God through prayer',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-indigo-500',
    verses: ['Philippians 4:6-7', 'Matthew 6:9-13', '1 Thessalonians 5:17', 'James 5:16'],
    characters: ['Hannah', 'Daniel', 'Jesus', 'Paul'],
    reflectionQuestions: [
      'How can I make prayer a more natural part of my daily life?',
      'What does it mean to pray without ceasing?',
      'How can I listen for God\'s voice in prayer?'
    ]
  }
];

interface ThematicExplorerProps {
  onThemeSelect?: (theme: Theme) => void;
  onVerseSelect?: (verse: string) => void;
  className?: string;
}

export default function ThematicExplorer({ onThemeSelect, onVerseSelect, className = '' }: ThematicExplorerProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [activeTab, setActiveTab] = useState<'verses' | 'characters' | 'reflections'>('verses');

  const handleThemeClick = (theme: Theme) => {
    setSelectedTheme(theme);
    onThemeSelect?.(theme);
  };

  const handleVerseClick = (verse: string) => {
    onVerseSelect?.(verse);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Spiritual Guidance Themes</h2>
        <p className="text-blue-100">
          Explore biblical wisdom organized by spiritual themes to find guidance for your journey
        </p>
      </div>

      <div className="p-6">
        {!selectedTheme ? (
          /* Theme Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPIRITUAL_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeClick(theme)}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-lg text-white ${theme.color}`}>
                    {theme.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {theme.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Explore theme
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Theme Detail View */
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedTheme(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
              Back to themes
            </button>

            {/* Theme Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-lg text-white ${selectedTheme.color}`}>
                {selectedTheme.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedTheme.name}</h3>
                <p className="text-gray-600">{selectedTheme.description}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'verses', label: 'Key Verses', count: selectedTheme.verses.length },
                  { id: 'characters', label: 'Biblical Characters', count: selectedTheme.characters.length },
                  { id: 'reflections', label: 'Reflection Questions', count: selectedTheme.reflectionQuestions.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
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

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'verses' && (
                <div className="space-y-3">
                  {selectedTheme.verses.map((verse, index) => (
                    <button
                      key={index}
                      onClick={() => handleVerseClick(verse)}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{verse}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'characters' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTheme.characters.map((character, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{character}</h4>
                      <p className="text-sm text-gray-600">
                        Explore how {character} exemplified {selectedTheme.name.toLowerCase()} in their life.
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reflections' && (
                <div className="space-y-4">
                  {selectedTheme.reflectionQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg"
                    >
                      <p className="text-gray-900 font-medium">{question}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Take time to reflect on this question and pray for God's guidance.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prayer Prompt */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Prayer for {selectedTheme.name}</h4>
              <p className="text-blue-800 text-sm mb-3">
                "Lord, help me to grow in {selectedTheme.name.toLowerCase()}. Guide me as I seek to understand 
                Your Word and apply it to my life. Give me wisdom and strength to walk in Your ways."
              </p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Add to my prayer journal →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 