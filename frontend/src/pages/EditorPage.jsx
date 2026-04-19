import { useState, useCallback, useEffect } from 'react'
import { Play, Save, PanelLeftOpen, SplitSquareHorizontal, Maximize2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import CodeEditor from '../components/CodeEditor'
import OutputPanel from '../components/OutputPanel'
import SnippetSidebar from '../components/SnippetSidebar'
import SnippetModal from '../components/SnippetModal'
import { useSnippets } from '../hooks/useSnippets'
import { executionAPI } from '../services/api'
import { LANGUAGES, DEFAULT_CODE } from '../utils/languages'

const DEFAULT_LANGUAGE = 'python'

export default function EditorPage() {
  const [code, setCode] = useState(DEFAULT_CODE[DEFAULT_LANGUAGE])
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const [output, setOutput] = useState(null)
  const [stdin, setStdin] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSnippetId, setActiveSnippetId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSnippet, setEditingSnippet] = useState(null)
  // Layout: 'split' | 'editor' | 'output'
  const [layout, setLayout] = useState('split')

  const { snippets, loading: snippetsLoading, createSnippet, updateSnippet, deleteSnippet } = useSnippets()

  // Keyboard shortcut: Ctrl+Enter to run
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        handleRun()
      }
      // Ctrl+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSaveNew()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [code, language])

  const handleLanguageChange = useCallback((newLang) => {
    setLanguage(newLang)
    setCode(DEFAULT_CODE[newLang] || '')
    setOutput(null)
    setActiveSnippetId(null)
  }, [])

  const handleReset = useCallback(() => {
    setCode(DEFAULT_CODE[language] || '')
    setOutput(null)
    setActiveSnippetId(null)
  }, [language])

  const handleRun = async () => {
    if (isRunning) return
    setIsRunning(true)
    setOutput(null)
    try {
      const lang = LANGUAGES.find(l => l.id === language)
      const res = await executionAPI.execute({
        code,
        language,
        versionIndex: lang?.versionIndex || '0',
        stdin,
      })
      setOutput(res.data)
    } catch (err) {
      const msg = err.response?.data?.message || 'Execution failed'
      toast.error(msg)
      setOutput({ output: '', error: msg, statusCode: 500 })
    } finally {
      setIsRunning(false)
    }
  }

  const handleLoadSnippet = (snippet) => {
    setCode(snippet.code)
    setLanguage(snippet.language)
    setOutput(null)
    setActiveSnippetId(snippet.id)
    setSidebarOpen(false) // auto-close on mobile
    toast.success(`Loaded "${snippet.title}"`, { duration: 1500 })
  }

  const handleSaveNew = () => {
    setEditingSnippet(null)
    setModalOpen(true)
  }

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet)
    setModalOpen(true)
  }

  const handleModalSave = async (data) => {
    try {
      if (editingSnippet) {
        await updateSnippet(editingSnippet.id, data)
      } else {
        await createSnippet(data)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save snippet')
      throw err
    }
  }

  const handleDeleteSnippet = async (id) => {
    await deleteSnippet(id)
    if (activeSnippetId === id) setActiveSnippetId(null)
  }

  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      <Navbar snippetCount={snippets.length} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SnippetSidebar
          snippets={snippets}
          loading={snippetsLoading}
          activeSnippetId={activeSnippetId}
          onLoad={handleLoadSnippet}
          onNew={handleSaveNew}
          onEdit={handleEditSnippet}
          onDelete={handleDeleteSnippet}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Action bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border-dim bg-bg-secondary shrink-0">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className={`p-1.5 rounded-lg transition-colors ${sidebarOpen ? 'text-accent-cyan bg-accent-cyan/10' : 'text-text-muted hover:text-text-primary hover:bg-bg-card'}`}
              title="Toggle sidebar"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>

            <div className="w-px h-4 bg-border-dim" />

            {/* Layout switcher */}
            <div className="flex items-center gap-1 bg-bg-card border border-border-dim rounded-lg p-0.5">
              {[
                { id: 'split', icon: SplitSquareHorizontal, label: 'Split' },
                { id: 'editor', icon: Maximize2, label: 'Editor only' },
                { id: 'output', icon: Maximize2, label: 'Output only' },
              ].map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setLayout(id)}
                  title={label}
                  className={`p-1.5 rounded-md transition-colors text-xs ${layout === id ? 'bg-bg-hover text-text-primary' : 'text-text-muted hover:text-text-secondary'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Active snippet indicator */}
            {activeSnippetId && (
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                {snippets.find(s => s.id === activeSnippetId)?.title}
              </div>
            )}

            {/* Save button */}
            <button
              onClick={handleSaveNew}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-bright text-text-secondary hover:text-text-primary hover:border-border-bright/80 text-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>

            {/* Run button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-accent-green text-bg-primary font-display font-600 text-sm hover:bg-accent-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-accent-green/20"
            >
              {isRunning ? (
                <div className="w-3.5 h-3.5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              {isRunning ? 'Running...' : 'Run'}
              <span className="hidden sm:inline text-bg-primary/60 text-xs font-mono font-400">⌘↵</span>
            </button>
          </div>

          {/* Editor + Output panels */}
          <div className="flex flex-1 overflow-hidden">
            {/* Code Editor */}
            {(layout === 'split' || layout === 'editor') && (
              <div className={`flex flex-col overflow-hidden ${layout === 'split' ? 'flex-1' : 'w-full'}`}>
                <CodeEditor
                  code={code}
                  language={language}
                  onCodeChange={setCode}
                  onLanguageChange={handleLanguageChange}
                  onReset={handleReset}
                  isRunning={isRunning}
                />
              </div>
            )}

            {/* Divider */}
            {layout === 'split' && (
              <div className="w-px bg-border-dim shrink-0" />
            )}

            {/* Output Panel */}
            {(layout === 'split' || layout === 'output') && (
              <div className={`flex flex-col overflow-hidden ${layout === 'split' ? 'w-80 lg:w-96 xl:w-[420px] shrink-0' : 'w-full'}`}>
                <OutputPanel
                  output={output}
                  isRunning={isRunning}
                  onClear={() => setOutput(null)}
                  stdin={stdin}
                  onStdinChange={setStdin}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Snippet Modal */}
      <SnippetModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingSnippet(null) }}
        onSave={handleModalSave}
        snippet={editingSnippet}
        currentCode={code}
        currentLanguage={language}
      />
    </div>
  )
}
