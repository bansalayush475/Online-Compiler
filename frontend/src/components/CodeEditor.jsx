import React from 'react';
import Editor from '@monaco-editor/react';
import { Play } from 'lucide-react';

const CodeEditor = ({ snippet, onChange, onRun }) => {
  if (!snippet) {
    return (
      <div className="editor-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Select or create a snippet to start coding.
      </div>
    );
  }

  const handleLanguageChange = (e) => {
    onChange({ ...snippet, language: e.target.value });
  };

  const handleTitleChange = (e) => {
    onChange({ ...snippet, title: e.target.value });
  };

  const handleCodeChange = (value) => {
    onChange({ ...snippet, code: value || '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="editor-header">
        <div className="editor-title-group">
          <input 
            type="text" 
            className="title-input" 
            value={snippet.title} 
            onChange={handleTitleChange}
            placeholder="Snippet Title"
          />
        </div>
        <div className="actions-group">
          <select 
            className="lang-select" 
            value={snippet.language} 
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button className="run-btn" onClick={onRun}>
            <Play size={16} fill="currentColor" /> Run Code
          </button>
        </div>
      </div>
      <div className="editor-container">
        <Editor
          height="100%"
          language={snippet.language}
          theme="vs-dark"
          value={snippet.code}
          onChange={handleCodeChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
