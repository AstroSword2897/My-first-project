import { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface StudyChatProps {
  onClose: () => void;
  onAskQuestion: (question: string) => void;
}

export default function StudyChat({ onClose, onAskQuestion }: StudyChatProps) {
  const [question, setQuestion] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onAskQuestion(question);
      setQuestion('');
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open study chat"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <h3 className="font-medium">Bible Study Assistant</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsMinimized(true)}
            className="text-blue-100 hover:text-white"
            aria-label="Minimize"
          >
            <span className="text-sm">_</span>
          </button>
          <button 
            onClick={onClose}
            className="text-blue-100 hover:text-white"
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="p-4 h-64 overflow-y-auto">
        <p className="text-sm text-gray-600 mb-4">Ask me anything about the Bible passage you're reading.</p>
        <div className="space-y-2">
          {/* Chat messages will go here */}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="border-t p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}
