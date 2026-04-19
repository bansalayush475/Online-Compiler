import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1d27',
            color: '#e8eaf6',
            border: '1px solid #2a2d3d',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#00ff88', secondary: '#0d0f14' },
          },
          error: {
            iconTheme: { primary: '#ff4444', secondary: '#0d0f14' },
          },
        }}
      />
    </GoogleOAuthProvider>
  </React.StrictMode>
)
