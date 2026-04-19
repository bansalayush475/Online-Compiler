import { useState } from 'react'
import { Plus, Search, Trash2, Edit3, ChevronRight, FileCode, Clock, X } from 'lucide-react'
import { LANGUAGE_MAP } from '../utils/languages'
import { formatDistanceToNow } from '../utils/dateUtils'

export default function SnippetSidebar({
  snippets,
  loading,
  activeSnippetId,
  onLoad,
  onNew,
  onEdit,
  onDelete,
  isOpen,
  onClose,
}) {
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const filtered = snippets.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.language.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (!window.confirm('Delete this snippet?')) return
    setDeletingId(id)
    try {
      await onDelete(id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40 lg:z-auto
        w-72 flex flex-col bg-bg-secondary border-r border-border-dim
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim shrink-0">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-accent-purple" />
            <span className="font-display font-600 text-text-primary text-sm">My Snippets</span>
            <span className="px-1.5 py-0.5 rounded-md bg-accent-purple/20 text-accent-purple text-xs font-mono">
              {snippets.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onNew}
              title="New snippet"
              className="p-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card lg:hidden transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 border-b border-border-dim shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-bg-card border border-border-dim rounded-lg pl-8 pr-3 py-2 text-text-primary text-xs placeholder-text-muted focus:outline-none focus:border-accent-cyan/40 transition-colors font-mono"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Snippet list */}
        <div className="flex-1 overflow-y-auto py-1">
          {loading ? (
            <div className="flex flex-col gap-2 p-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-bg-card rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-12 px-4 text-center">
              <FileCode className="w-8 h-8 text-text-muted opacity-30" />
              {search ? (
                <>
                  <p className="text-text-muted text-sm">No snippets match</p>
                  <p className="text-text-muted text-xs opacity-60">"{search}"</p>
                </>
              ) : (
                <>
                  <p className="text-text-muted text-sm">No snippets yet</p>
                  <button
                    onClick={onNew}
                    className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-cyan/10 text-accent-cyan text-xs hover:bg-accent-cyan/20 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Create first snippet
                  </button>
                </>
              )}
            </div>
          ) : (
            <ul className="p-2 space-y-1">
              {filtered.map(snippet => {
                const lang = LANGUAGE_MAP[snippet.language]
                const isActive = snippet.id === activeSnippetId
                return (
                  <li key={snippet.id}>
                    <button
                      onClick={() => onLoad(snippet)}
                      className={`
                        w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 group
                        ${isActive
                          ? 'bg-accent-cyan/10 border border-accent-cyan/30 shadow-sm'
                          : 'hover:bg-bg-card border border-transparent hover:border-border-dim'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-sm">{lang?.icon || '📄'}</span>
                            <span className={`font-medium text-sm truncate ${isActive ? 'text-accent-cyan' : 'text-text-primary'}`}>
                              {snippet.title}
                            </span>
                          </div>
                          {snippet.description && (
                            <p className="text-text-muted text-xs truncate leading-relaxed mb-1">
                              {snippet.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
                            <span className="px-1.5 py-0.5 rounded bg-bg-secondary border border-border-dim">
                              {lang?.label || snippet.language}
                            </span>
                            <span className="flex items-center gap-0.5 opacity-60">
                              <Clock className="w-2.5 h-2.5" />
                              {formatDistanceToNow(snippet.updatedAt)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={e => { e.stopPropagation(); onEdit(snippet) }}
                            className="p-1 rounded-md text-text-muted hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={e => handleDelete(e, snippet.id)}
                            disabled={deletingId === snippet.id}
                            className="p-1 rounded-md text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors"
                            title="Delete"
                          >
                            {deletingId === snippet.id
                              ? <div className="w-3 h-3 border border-accent-red/30 border-t-accent-red rounded-full animate-spin" />
                              : <Trash2 className="w-3 h-3" />
                            }
                          </button>
                        </div>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border-dim shrink-0">
          <p className="text-text-muted text-xs font-mono opacity-40 text-center">
            {snippets.length} snippet{snippets.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </aside>
    </>
  )
}
