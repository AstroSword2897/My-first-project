import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image, 
  Heading1, 
  Heading2, 
  Heading3,
  Eye,
  EyeOff,
  Save,
  Undo,
  Redo,
  FileText
} from 'lucide-react';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
  showToolbar?: boolean;
  showPreview?: boolean;
  autoSave?: boolean;
  onSave?: () => void;
  readOnly?: boolean;
  label?: string;
  error?: string;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  onClick, 
  title, 
  disabled = false 
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    {icon}
  </button>
);

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing your notes...",
  height = 400,
  className = '',
  showToolbar = true,
  showPreview = true,
  autoSave = false,
  onSave,
  readOnly = false,
  label,
  error
}: MarkdownEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const editorRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasUnsavedChanges) {
      const timeoutId = setTimeout(() => {
        onSave?.();
        setHasUnsavedChanges(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [value, autoSave, hasUnsavedChanges, onSave]);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [value]);

  const insertText = (text: string, selection?: { start: number; end: number }) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = selection?.start ?? textarea.selectionStart;
    const end = selection?.end ?? textarea.selectionEnd;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const newValue = before + text + after;
    
    onChange(newValue);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + text.length, start + text.length);
      }
    }, 0);
  };

  const wrapText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newValue = beforeText + before + selectedText + after + afterText;
    onChange(newValue);
    
    // Set cursor position
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        if (selectedText) {
          textareaRef.current.setSelectionRange(start, start + before.length + selectedText.length + after.length);
        } else {
          textareaRef.current.setSelectionRange(start + before.length, start + before.length);
        }
      }
    }, 0);
  };

  const toolbarActions = {
    bold: () => wrapText('**', '**'),
    italic: () => wrapText('*', '*'),
    heading1: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.startsWith('#')) {
        // Remove existing heading
        const newValue = value.substring(0, lineStart) + line.replace(/^#+\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        // Add heading
        const newValue = value.substring(0, lineStart) + '# ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    heading2: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.startsWith('##')) {
        const newValue = value.substring(0, lineStart) + line.replace(/^#+\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        const newValue = value.substring(0, lineStart) + '## ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    heading3: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.startsWith('###')) {
        const newValue = value.substring(0, lineStart) + line.replace(/^#+\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        const newValue = value.substring(0, lineStart) + '### ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    bulletList: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.startsWith('- ')) {
        const newValue = value.substring(0, lineStart) + line.replace(/^-\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        const newValue = value.substring(0, lineStart) + '- ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    numberedList: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.match(/^\d+\.\s/)) {
        const newValue = value.substring(0, lineStart) + line.replace(/^\d+\.\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        const newValue = value.substring(0, lineStart) + '1. ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    quote: () => {
      const lineStart = value.lastIndexOf('\n', textareaRef.current?.selectionStart || 0) + 1;
      const lineEnd = value.indexOf('\n', textareaRef.current?.selectionStart || 0);
      const line = value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
      
      if (line.startsWith('> ')) {
        const newValue = value.substring(0, lineStart) + line.replace(/^>\s*/, '') + value.substring(lineEnd);
        onChange(newValue);
      } else {
        const newValue = value.substring(0, lineStart) + '> ' + line + value.substring(lineEnd);
        onChange(newValue);
      }
    },
    code: () => wrapText('`', '`'),
    codeBlock: () => wrapText('```\n', '\n```'),
    link: () => {
      const url = prompt('Enter URL:');
      if (url) {
        const linkText = prompt('Enter link text:', 'Link');
        if (linkText) {
          wrapText(`[${linkText}](`, ')');
        }
      }
    },
    image: () => {
      const url = prompt('Enter image URL:');
      if (url) {
        const altText = prompt('Enter alt text:', 'Image');
        if (altText) {
          wrapText(`![${altText}](`, ')');
        }
      }
    }
  };

  const handleSave = () => {
    onSave?.();
    setHasUnsavedChanges(false);
  };

  const handleUndo = () => {
    document.execCommand('undo');
  };

  const handleRedo = () => {
    document.execCommand('redo');
  };

  return (
    <div className={`markdown-editor ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        {showToolbar && !readOnly && (
          <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <ToolbarButton
                icon={<Bold className="w-4 h-4" />}
                onClick={toolbarActions.bold}
                title="Bold (Ctrl+B)"
              />
              <ToolbarButton
                icon={<Italic className="w-4 h-4" />}
                onClick={toolbarActions.italic}
                title="Italic (Ctrl+I)"
              />
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              <ToolbarButton
                icon={<Heading1 className="w-4 h-4" />}
                onClick={toolbarActions.heading1}
                title="Heading 1"
              />
              <ToolbarButton
                icon={<Heading2 className="w-4 h-4" />}
                onClick={toolbarActions.heading2}
                title="Heading 2"
              />
              <ToolbarButton
                icon={<Heading3 className="w-4 h-4" />}
                onClick={toolbarActions.heading3}
                title="Heading 3"
              />
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              <ToolbarButton
                icon={<List className="w-4 h-4" />}
                onClick={toolbarActions.bulletList}
                title="Bullet List"
              />
              <ToolbarButton
                icon={<ListOrdered className="w-4 h-4" />}
                onClick={toolbarActions.numberedList}
                title="Numbered List"
              />
              <ToolbarButton
                icon={<Quote className="w-4 h-4" />}
                onClick={toolbarActions.quote}
                title="Quote"
              />
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              <ToolbarButton
                icon={<Code className="w-4 h-4" />}
                onClick={toolbarActions.code}
                title="Inline Code"
              />
              <ToolbarButton
                icon={<FileText className="w-4 h-4" />}
                onClick={toolbarActions.codeBlock}
                title="Code Block"
              />
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              <ToolbarButton
                icon={<Link className="w-4 h-4" />}
                onClick={toolbarActions.link}
                title="Insert Link"
              />
              <ToolbarButton
                icon={<Image className="w-4 h-4" />}
                onClick={toolbarActions.image}
                title="Insert Image"
              />
            </div>
            
            <div className="flex items-center space-x-1">
              <ToolbarButton
                icon={<Undo className="w-4 h-4" />}
                onClick={handleUndo}
                title="Undo (Ctrl+Z)"
              />
              <ToolbarButton
                icon={<Redo className="w-4 h-4" />}
                onClick={handleRedo}
                title="Redo (Ctrl+Y)"
              />
              
              <div className="w-px h-6 bg-gray-300 mx-2" />
              
              {showPreview && (
                <ToolbarButton
                  icon={isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  title={isPreviewMode ? "Hide Preview" : "Show Preview"}
                />
              )}
              
              {onSave && (
                <>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <ToolbarButton
                    icon={<Save className="w-4 h-4" />}
                    onClick={handleSave}
                    title="Save"
                    disabled={!hasUnsavedChanges}
                  />
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Editor */}
        <div className="relative">
          {readOnly ? (
            <div className="p-4 bg-gray-50">
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: require('react-markdown')(value) 
                }}
              />
            </div>
          ) : isPreviewMode ? (
            <div className="grid grid-cols-2 h-96">
              <div className="border-r border-gray-300">
                <textarea
                  ref={textareaRef}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-full p-4 resize-none border-0 focus:ring-0 focus:outline-none font-mono text-sm"
                  style={{ height: `${height}px` }}
                />
              </div>
              <div className="p-4 overflow-y-auto">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: require('react-markdown')(value) 
                  }}
                />
              </div>
            </div>
          ) : (
            <MDEditor
              value={value}
              onChange={(val) => onChange(val || '')}
              height={height}
              preview="edit"
              hideToolbar={!showToolbar}
              textareaProps={{
                placeholder: placeholder,
                style: { fontSize: 14 }
              }}
            />
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>Characters: {value.length}</span>
          <span>Words: {value.split(/\s+/).filter(word => word.length > 0).length}</span>
          {hasUnsavedChanges && (
            <span className="text-orange-600">• Unsaved changes</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span>Markdown</span>
          {showPreview && (
            <span>• Preview {isPreviewMode ? 'On' : 'Off'}</span>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {/* Keyboard Shortcuts Help */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Keyboard Shortcuts:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+B</kbd> Bold</div>
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+I</kbd> Italic</div>
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+Z</kbd> Undo</div>
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+Y</kbd> Redo</div>
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+S</kbd> Save</div>
          <div><kbd className="px-1 py-0.5 bg-white border rounded">Tab</kbd> Indent</div>
        </div>
      </div>
    </div>
  );
} 