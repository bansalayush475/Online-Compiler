/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          primary: '#0d0f14',
          secondary: '#13151c',
          card: '#1a1d27',
          hover: '#20243a',
        },
        accent: {
          cyan: '#00e5ff',
          purple: '#a855f7',
          green: '#00ff88',
          red: '#ff4444',
          yellow: '#ffd700',
        },
        border: {
          dim: '#2a2d3d',
          bright: '#3d4160',
        },
        text: {
          primary: '#e8eaf6',
          secondary: '#8892b0',
          muted: '#4a5568',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #00e5ff33' },
          'to': { boxShadow: '0 0 20px #00e5ff66, 0 0 40px #00e5ff22' },
        },
        slideIn: {
          'from': { transform: 'translateX(-10px)', opacity: 0 },
          'to': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
