import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

const OutputBox = ({ output, isError, onClear }) => {
  return (
    <div className="output-panel">
      <div className="output-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={14} /> Output
        </div>
        <button onClick={onClear} title="Clear Output" style={{ cursor: 'pointer', color: 'inherit' }}>
          <Trash2 size={14} />
        </button>
      </div>
      <div className={`output-content ${isError ? 'output-error' : ''} no-scrollbar`}>
        {output || 'Ready to run code...'}
      </div>
    </div>
  );
};

export default OutputBox;
