import React from 'react';
import { Plus, Trash2, Code2 } from 'lucide-react';

const Sidebar = ({ snippets, activeSnippetId, onSelectSnippet, onCreateSnippet, onDeleteSnippet }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2><Code2 size={20} /> My Snippets</h2>
        <button className="add-btn" onClick={onCreateSnippet} title="New Snippet">
          <Plus size={18} />
        </button>
      </div>
      <div className="snippet-list no-scrollbar">
        {snippets.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No snippets yet. Create one!
          </div>
        ) : (
          snippets.map((snippet) => (
            <div 
              key={snippet.id} 
              className={`snippet-item ${activeSnippetId === snippet.id ? 'active' : ''}`}
              onClick={() => onSelectSnippet(snippet.id)}
            >
              <div className="snippet-info">
                <span className="snippet-title">{snippet.title}</span>
                <span className="snippet-lang">{snippet.language}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSnippet(snippet.id);
                }}
                title="Delete Snippet"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
