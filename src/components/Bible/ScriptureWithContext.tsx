import React from 'react';
import { getScriptureContext } from '@/utils/scriptureUtils';

interface ScriptureWithContextProps {
  reference: string;
  text: string;
  showFullContext?: boolean;
}

export const ScriptureWithContext: React.FC<ScriptureWithContextProps> = ({
  reference,
  text,
  showFullContext = true,
}) => {
  const context = getScriptureContext(reference, text);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md my-4">
      <div className="border-l-4 border-blue-500 pl-4">
        <h3 className="text-xl font-semibold text-gray-800">{reference}</h3>
        <blockquote className="text-lg italic text-gray-700 my-2">"{text}"</blockquote>
      </div>
      
      {showFullContext && (
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          <div>
            <span className="font-semibold">Author:</span> {context.context.author}
          </div>
          <div>
            <span className="font-semibold">Historical Setting:</span> {context.context.historicalSetting}
          </div>
          <div>
            <span className="font-semibold">Literary Context:</span> {context.context.literaryContext}
          </div>
          <div>
            <span className="font-semibold">Theological Significance:</span> {context.context.theologicalSignificance}
          </div>
          
          <div className="mt-3">
            <h4 className="font-semibold">Cultural Context</h4>
            <div className="ml-2">
              <p><span className="font-medium">Then:</span> {context.context.culturalContext.then}</p>
              <p><span className="font-medium">Now:</span> {context.context.culturalContext.now}</p>
            </div>
          </div>
          
          {context.context.christConnection && (
            <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100">
              <h4 className="font-semibold text-blue-800">Connection to Christ</h4>
              <p>{context.context.christConnection}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
