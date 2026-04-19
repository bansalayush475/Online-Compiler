import { useRef } from 'react'
import Editor from '@monaco-editor/react'
import { LANGUAGES } from '../utils/languages'
import { ChevronDown, RotateCcw } from 'lucide-react'

const MONACO_OPTIONS = {
  fontSize: 14,
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  fontLigatures: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  lineNumbersMinChars: 3,
  glyphMargin: false,
  folding: true,
  lineDecorationsWidth: 8,
  renderLineHighlight: 'line',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  smoothScrolling: true,
  padding: { top: 16, bottom: 16 },
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  renderWhitespace: 'selection',
  tabSize: 2,
  wordWrap: 'off',
  automaticLayout: true,
  bracketPairColorization: { enabled: true },
  suggest: { showKeywords: true },
}

export default function CodeEditor({ code, language, onCodeChange, onLanguageChange, onReset, isRunning }) {
  const editorRef = useRef(null)
  const currentLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0]

  const handleMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
    <div className="flex flex-col h-full bg-bg-secondary">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-dim shrink-0">
        {/* Language selector */}
        <div className="relative group">
          <select
            value={language}
            onChange={e => onLanguageChange(e.target.value)}
            className="appearance-none bg-bg-card border border-border-dim text-text-primary text-sm pl-8 pr-8 py-1.5 rounded-lg cursor-pointer hover:border-border-bright transition-colors focus:outline-none focus:border-accent-cyan/50 font-mono"
          >
            {LANGUAGES.map(l => (
              <option key={l.id} value={l.id}>{l.icon} {l.label}</option>
            ))}
          </select>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-sm">
            {currentLang.icon}
          </div>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-text-muted text-xs font-mono">
            {code.split('\n').length} lines · {code.length} chars
          </span>
          <button
            onClick={onReset}
            title="Reset to default code"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={currentLang.monaco}
          value={code}
          onChange={val => onCodeChange(val || '')}
          onMount={handleMount}
          theme="vs-dark"
          options={MONACO_OPTIONS}
          loading={
            <div className="h-full flex items-center justify-center bg-bg-secondary">
              <div className="w-6 h-6 border-2 border-accent-cyan/30 border-t-accent-cyan rounded-full animate-spin" />
            </div>
          }
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('codevault', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '4a5568', fontStyle: 'italic' },
                { token: 'keyword', foreground: '00e5ff' },
                { token: 'string', foreground: '00ff88' },
                { token: 'number', foreground: 'ffd700' },
                { token: 'type', foreground: 'a855f7' },
                { token: 'function', foreground: 'e8eaf6' },
              ],
              colors: {
                'editor.background': '#13151c',
                'editor.foreground': '#e8eaf6',
                'editor.lineHighlightBackground': '#1a1d2780',
                'editor.selectionBackground': '#00e5ff18',
                'editorCursor.foreground': '#00e5ff',
                'editorLineNumber.foreground': '#2a2d3d',
                'editorLineNumber.activeForeground': '#4a5568',
                'editor.findMatchBackground': '#ffd70033',
                'editor.findMatchHighlightBackground': '#ffd70018',
              },
            })
            monaco.editor.setTheme('codevault')
          }}
        />
      </div>
    </div>
  )
}
