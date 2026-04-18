import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import CodeEditor from './CodeEditor';
import OutputBox from './OutputBox';
import { getSnippets, saveSnippets, createSnippet } from '../utils/storage';

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [activeSnippetId, setActiveSnippetId] = useState(null);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const loadedSnippets = getSnippets();
    setSnippets(loadedSnippets);
    if (loadedSnippets.length > 0) {
      setActiveSnippetId(loadedSnippets[0].id);
    }
  }, []);

  // Save to local storage whenever snippets change
  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  const activeSnippet = snippets.find(s => s.id === activeSnippetId);

  const handleCreateSnippet = () => {
    const newSnippet = createSnippet('New Snippet', 'javascript', '// Write your code here\nconsole.log("Hello, world!");');
    setSnippets([newSnippet, ...snippets]);
    setActiveSnippetId(newSnippet.id);
    setOutput('');
    setIsError(false);
  };

  const handleUpdateSnippet = (updatedSnippet) => {
    setSnippets(snippets.map(s => s.id === updatedSnippet.id ? updatedSnippet : s));
  };

  const handleDeleteSnippet = (id) => {
    const filtered = snippets.filter(s => s.id !== id);
    setSnippets(filtered);
    if (activeSnippetId === id) {
      setActiveSnippetId(filtered.length > 0 ? filtered[0].id : null);
      setOutput('');
      setIsError(false);
    }
  };

  const executeCode = () => {
    if (!activeSnippet) return;

    if (activeSnippet.language === 'javascript') {
      try {
        // We override console.log briefly to capture output
        let logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
        };
        
        // Use a safe wrapper to execute code and catch errors
        const fn = new Function(activeSnippet.code);
        const result = fn();
        
        if (result !== undefined) {
          logs.push(`> ${result}`);
        }
        
        console.log = originalLog; // restore
        setOutput(logs.join('\n'));
        setIsError(false);
        
      } catch (err) {
        setOutput(err.toString());
        setIsError(true);
      }
    } else {
      // Mock for non-JS execution
      setOutput(`Excecuting ${activeSnippet.language} is not physically supported in this purely frontend browser environment.\nMock Compilation successful.\nMock Run successful.`);
      setIsError(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        snippets={snippets}
        activeSnippetId={activeSnippetId}
        onSelectSnippet={setActiveSnippetId}
        onCreateSnippet={handleCreateSnippet}
        onDeleteSnippet={handleDeleteSnippet}
      />
      <div className="main-content">
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <CodeEditor 
            snippet={activeSnippet} 
            onChange={handleUpdateSnippet}
            onRun={executeCode}
          />
        </div>
        <OutputBox 
          output={output} 
          isError={isError} 
          onClear={() => setOutput('')}
        />
      </div>
    </div>
  );
};

export default Dashboard;
