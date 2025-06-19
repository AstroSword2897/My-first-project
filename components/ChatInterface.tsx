import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Send, BookOpen, AlertTriangle, Heart, MessageCircle } from 'lucide-react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  verseReference?: string;
  showExplanation?: boolean;
  messageType?: 'guidance' | 'prayer' | 'reflection' | 'study';
};

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [explanationLoading, setExplanationLoading] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you explore the Bible and provide spiritual guidance. I can help with:\n\n• Explaining Bible verses and passages\n• Finding relevant scriptures on topics\n• Providing spiritual guidance and prayer help\n• Suggesting cross-references\n\n**Important:** I\'m a tool designed to help you understand Scripture and seek spiritual guidance. Always pray and seek the Holy Spirit\'s guidance as you study God\'s Word.',
      sender: 'bot',
      timestamp: new Date(),
      messageType: 'guidance'
    }
  ]);
  const [selectedVerse, setSelectedVerse] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Parse message text to handle markdown links and newlines
  const parseMessageText = useCallback((text: string): ReactNode => {
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-2">
        {paragraph.split(/(\[.*?\]\(.*?\))/g).map((part, j) => {
          // Handle markdown links [text](url)
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            return (
              <a 
                key={j} 
                href={linkMatch[2]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <BookOpen className="w-3 h-3 mr-1" />
                {linkMatch[1]}
              </a>
            );
          }
          return part;
        })}
      </p>
    ));
  }, []);

  const scrollToBottom = useCallback((): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Check if a message contains a Bible verse reference
  const extractVerseReference = (text: string): string | undefined => {
    // This regex looks for patterns like 'Genesis 1:1' or 'John 3:16-17'
    const verseMatch = text.match(/\b(?:1|2|3)?\s*[A-Za-z]+\s+\d+:\d+(?:-\d+)?\b/);
    return verseMatch ? verseMatch[0] : undefined;
  };

  const fetchExplanation = async (messageId: string, verseRef: string) => {
    setExplanationLoading(messageId);
    try {
      const response = await fetch(`/api/explain-verse?verse=${encodeURIComponent(verseRef)}`);
      if (!response.ok) throw new Error('Failed to fetch explanation');
      const data = await response.json();
      
      setExplanations(prev => ({
        ...prev,
        [messageId]: data.explanation || 'No explanation available.'
      }));
      
      // Update the message to show explanation
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, showExplanation: true }
          : msg
      ));
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanations(prev => ({
        ...prev,
        [messageId]: 'Failed to load explanation. Please try again.'
      }));
    } finally {
      setExplanationLoading(null);
    }
  };

  const handleShowExplanation = (messageId: string, verseRef: string) => {
    if (explanations[messageId]) {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, showExplanation: !msg.showExplanation }
          : msg
      ));
    } else {
      fetchExplanation(messageId, verseRef);
    }
  };

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          selectedVerse: selectedVerse,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('Invalid response format from server');
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
        verseReference: extractVerseReference(data.response),
        showExplanation: false,
        messageType: data.messageType || 'guidance'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I\'m having trouble connecting right now. Please try again! While this tool can help with biblical insights, remember that nothing replaces reading God\'s Word directly.',
        sender: 'bot',
        timestamp: new Date(),
        messageType: 'guidance'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedVerse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
  };

  const getMessageIcon = (messageType?: string) => {
    switch (messageType) {
      case 'prayer':
        return <MessageCircle className="w-4 h-4 text-purple-500" />;
      case 'reflection':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'study':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMessageStyle = (messageType?: string) => {
    switch (messageType) {
      case 'prayer':
        return 'bg-purple-50 border-purple-200';
      case 'reflection':
        return 'bg-pink-50 border-pink-200';
      case 'study':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const guidancePrompts = [
    "I'm struggling with forgiveness. Can you help me understand what the Bible says?",
    "How can I find peace in difficult times?",
    "I need guidance on making an important decision.",
    "Can you help me pray about my current situation?",
    "What does the Bible say about trusting God?",
    "I'm feeling lost and need spiritual direction."
  ];

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Spiritual Guidance Disclaimer */}
      <div className="bg-gray-50 border-b border-gray-200 p-3">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-800">
            <p className="font-medium">Biblical Wisdom Companion</p>
            <p>This AI provides biblical insights and spiritual encouragement to support your faith journey. While it can help with understanding Scripture, nothing replaces reading God's Word directly. Prayer is the root of our connection with God, nourishing our relationship with Him. Besides prayer life, you may also find it helpful to seek support from trusted friends, mentors, or your faith community.</p>
          </div>
        </div>
      </div>

      {/* Guidance Prompts */}
      <div className="p-3 bg-gray-50 border-b">
        <p className="text-sm text-gray-600 mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {guidancePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : `${getMessageStyle(message.messageType)} border rounded-bl-none`
                }`}
              >
                <div className="flex items-start space-x-2">
                  {/* Removed icon display for bot messages to eliminate caution signs */}
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap">
                      {message.sender === 'bot' ? (
                        <>
                          {parseMessageText(message.text)}
                          {message.verseReference && (
                            <div className="mt-2">
                              <button
                                onClick={() => message.verseReference && handleShowExplanation(message.id, message.verseReference)}
                                disabled={explanationLoading === message.id || !message.verseReference}
                                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors flex items-center"
                              >
                                {explanationLoading === message.id ? (
                                  'Loading...'
                                ) : message.showExplanation ? (
                                  'Hide Explanation'
                                ) : (
                                  'Show Explanation'
                                )}
                              </button>
                              {message.showExplanation && explanations[message.id] && (
                                <div className="mt-2 p-2 bg-gray-50 text-sm rounded border border-gray-200">
                                  {explanations[message.id]}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        message.text
                      )}
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-sm">Seeking guidance...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for spiritual guidance, prayer help, or biblical wisdom..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          While this tool offers biblical insights, reading God's Word directly and seeking human guidance remain essential for spiritual growth.
        </p>
      </form>
    </div>
  );
}
