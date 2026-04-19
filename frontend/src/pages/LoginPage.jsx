import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Code2, Zap, Shield, Database } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  // credentialResponse.credential = Google ID token (a signed JWT)
  // The backend verifies it via https://oauth2.googleapis.com/tokeninfo
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await login(credentialResponse.credential)
      toast.success('Welcome!')
      navigate('/editor')
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Please try again.'
      toast.error(msg)
    }
  }

  const features = [
    { icon: Code2,     title: 'Multi-language',   desc: '15+ languages supported via JDoodle' },
    { icon: Zap,      title: 'Instant Execution', desc: 'Run code in milliseconds' },
    { icon: Database, title: 'Snippet Vault',     desc: 'Save & organize your code snippets' },
    { icon: Shield,   title: 'Secure & Private',  desc: 'Your snippets, only yours' },
  ]

  return (
    <div className="min-h-screen bg-bg-primary grid-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-lg glow-cyan">
            <Code2 className="w-6 h-6 text-bg-primary" />
          </div>
          <span className="font-display text-2xl font-700 text-text-primary tracking-tight">
            Code<span className="gradient-text">Vault</span>
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-700 text-text-primary leading-tight mb-4">
          Write. Run.{' '}
          <span className="gradient-text">Ship.</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          A professional online compiler with snippet management.
          15+ languages, instant execution, cloud-saved code.
        </p>

        <div className="flex justify-center mb-16">
          <div className="scale-125 origin-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error('Google login failed. Please try again.')}
              theme="filled_black"
              shape="rectangular"
              size="large"
              text="continue_with"
              logo_alignment="left"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-bg-card border border-border-dim rounded-2xl p-4 text-left hover:border-border-bright transition-colors">
              <Icon className="w-5 h-5 text-accent-cyan mb-2" />
              <div className="font-display font-600 text-text-primary text-sm mb-1">{title}</div>
              <div className="text-text-muted text-xs leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 text-text-muted text-xs font-mono">
        Powered by JDoodle API · Built with Spring Boot + React
      </div>
    </div>
  )
}
