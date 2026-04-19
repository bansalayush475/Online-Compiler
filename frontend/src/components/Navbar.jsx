import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Code2, LogOut, ChevronDown, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar({ snippetCount = 0 }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <nav className="h-14 bg-bg-secondary border-b border-border-dim flex items-center justify-between px-4 shrink-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
          <Code2 className="w-4 h-4 text-bg-primary" />
        </div>
        <span className="font-display font-600 text-text-primary tracking-tight">
          Code<span className="text-accent-cyan">Vault</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-md bg-bg-card border border-border-dim text-text-muted text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-slow" />
          {snippetCount} snippets
        </span>
      </div>

      {/* Right: User */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(o => !o)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-bg-card border border-transparent hover:border-border-dim transition-all duration-150"
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-7 h-7 rounded-full ring-2 ring-accent-cyan/30"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-accent-purple/30 flex items-center justify-center">
              <User className="w-4 h-4 text-accent-purple" />
            </div>
          )}
          <span className="hidden sm:block text-text-primary text-sm font-medium max-w-[120px] truncate">
            {user?.name}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-bg-card border border-border-dim rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
            <div className="px-4 py-3 border-b border-border-dim">
              <p className="text-text-primary text-sm font-medium truncate">{user?.name}</p>
              <p className="text-text-muted text-xs truncate mt-0.5">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-accent-red hover:bg-accent-red/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
