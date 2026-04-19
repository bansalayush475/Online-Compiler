import { Terminal, AlertCircle, Clock, Cpu, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function OutputPanel({ output, isRunning, onClear, stdin, onStdinChange }) {
  const [stdinOpen, setStdinOpen] = useState(false)

  const hasOutput = output !== null
  const isError = output?.error && output.error.trim().length > 0
  const isSuccess = hasOutput && !isError && output?.output?.trim().length > 0

  return (
    <div className="flex flex-col h-full bg-bg-secondary">
      {/* Panel header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border-dim shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-text-muted" />
          <span className="text-text-secondary text-sm font-mono font-500">Output</span>
          {isRunning && (
            <span className="flex items-center gap-1.5 text-accent-yellow text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-yellow animate-pulse" />
              Running...
            </span>
          )}
          {isSuccess && !isRunning && (
            <span className="flex items-center gap-1 text-accent-green text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              Success
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Stats */}
          {output?.cpuTime && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-bg-card text-text-muted text-xs font-mono">
              <Clock className="w-3 h-3" />
              {output.cpuTime}s
            </div>
          )}
          {output?.memory && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-bg-card text-text-muted text-xs font-mono">
              <Cpu className="w-3 h-3" />
              {output.memory}
            </div>
          )}
          {hasOutput && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors"
              title="Clear output"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Stdin accordion */}
      <div className="border-b border-border-dim shrink-0">
        <button
          onClick={() => setStdinOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs text-text-muted hover:text-text-secondary hover:bg-bg-card/50 transition-colors"
        >
          <span className="font-mono">stdin (optional input)</span>
          {stdinOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        {stdinOpen && (
          <textarea
            value={stdin}
            onChange={e => onStdinChange(e.target.value)}
            placeholder="Enter program input here..."
            className="w-full bg-bg-card/50 text-text-primary text-xs font-mono px-3 py-2 resize-none focus:outline-none border-t border-border-dim placeholder-text-muted"
            rows={3}
          />
        )}
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-auto p-4">
        {isRunning ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-text-muted">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/20 border-t-accent-cyan animate-spin" />
              <Terminal className="absolute inset-0 m-auto w-5 h-5 text-accent-cyan/60" />
            </div>
            <span className="font-mono text-sm">Executing code...</span>
          </div>
        ) : !hasOutput ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-text-muted select-none">
            <Terminal className="w-8 h-8 opacity-20" />
            <p className="text-sm font-mono opacity-40">Run your code to see output</p>
            <p className="text-xs opacity-25">Press Ctrl+Enter or click Run</p>
          </div>
        ) : (
          <div className="space-y-3">
            {output?.output?.trim() && (
              <div>
                <div className="text-xs text-text-muted font-mono mb-1.5 uppercase tracking-wider">stdout</div>
                <pre className="font-mono text-sm text-accent-green leading-relaxed whitespace-pre-wrap break-words bg-accent-green/5 border border-accent-green/20 rounded-xl p-3">
                  {output.output}
                </pre>
              </div>
            )}
            {output?.error?.trim() && (
              <div>
                <div className="text-xs text-accent-red font-mono mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Daily Limit
                </div>
                <pre className="font-mono text-sm text-accent-red leading-relaxed whitespace-pre-wrap break-words bg-accent-red/5 border border-accent-red/20 rounded-xl p-3">
                  {output.error}
                </pre>
              </div>
            )}
            {!output?.output?.trim() && !output?.error?.trim() && (
              <div className="flex items-center gap-2 text-text-muted text-sm font-mono">
                <span className="text-accent-green">✓</span> Program exited with no output
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
