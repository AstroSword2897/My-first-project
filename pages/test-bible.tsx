import React, { useState } from 'react';
import { bibleService } from '../lib/bibleService';
import type { BiblePassage } from '../lib/bibleService';

export default function TestBible() {
  const [reference, setReference] = useState('John 3:16');
  const [result, setResult] = useState<BiblePassage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    try {
      const passage = await bibleService.getPassage(reference);
      setResult(passage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Bible Service Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="mb-4">
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
              Bible Reference
            </label>
            <input
              type="text"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., John 3:16"
            />
          </div>
          
          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Loading...' : 'Test Passage'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{result.reference}</h2>
            <p className="text-gray-700 mb-4">{result.text}</p>
            <div className="text-sm text-gray-500">
              Version: {result.version}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 