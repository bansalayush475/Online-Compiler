import { useState, useEffect } from 'react'
import { X, Save, Tag, FileText, Code2 } from 'lucide-react'
import { LANGUAGES } from '../utils/languages'

export default function SnippetModal({ isOpen, onClose, onSave, snippet, currentCode, currentLanguage }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const isEdit = Boolean(snippet)

  useEffect(() => {
    if (isOpen) {
      setTitle(snippet?.title || '')
      setDescription(snippet?.description || '')
    }
  }, [isOpen, snippet])

  if (!isOpen) return null

  const handleSave = async () => {
    if (!title.trim()) return
    setSaving(true)
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        code: snippet?.code || currentCode,
        language: snippet?.language || currentLanguage,
        versionIndex: snippet?.versionIndex || (LANGUAGES.find(l => l.id === currentLanguage)?.versionIndex || '0'),
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  const lang = LANGUAGES.find(l => l.id === (snippet?.language || currentLanguage))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-bg-card border border-border-dim rounded-2xl shadow-2xl shadow-black/50 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-dim">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
              <Save className="w-3.5 h-3.5 text-accent-cyan" />
            </div>
            <h2 className="font-display font-600 text-text-primary">
              {isEdit ? 'Edit Snippet' : 'Save Snippet'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Language badge */}
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>Language:</span>
            <span className="px-2 py-0.5 rounded-md bg-bg-secondary border border-border-dim text-text-secondary">
              {lang?.icon} {lang?.label}
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted mb-1.5 uppercase tracking-wider">
              <Tag className="w-3 h-3" />
              Title <span className="text-accent-red">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="e.g. Binary Search Tree"
              autoFocus
              className="w-full bg-bg-secondary border border-border-dim rounded-xl px-3 py-2.5 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted mb-1.5 uppercase tracking-wider">
              <FileText className="w-3 h-3" />
              Description <span className="text-text-muted">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What does this snippet do?"
              rows={3}
              className="w-full bg-bg-secondary border border-border-dim rounded-xl px-3 py-2.5 text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-border-dim">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim() || saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-accent-cyan text-bg-primary font-display font-600 text-sm hover:bg-accent-cyan/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {saving ? (
              <div className="w-3.5 h-3.5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
