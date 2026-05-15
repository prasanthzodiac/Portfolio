/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        /* Hubtown-inspired Dev Palette */
        void: '#02040A',
        surface: '#080C16',
        electric: '#0088FF',
        deepblue: '#0A192F',
        ice: '#D8E4FF',
        ghost: '#8892B0',
        /* Editor Palette remains for the editor side */
        'ed-void': '#0A0A0F',
        'ed-magenta': '#FF3CAC',
        'ed-cyan': '#22D3EE',
        'ed-lime': '#BFFF00',
        'ed-warm': '#F97316',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        'editor-display': ['Syne', 'sans-serif'],
      },
      letterSpacing: {
        'super-wide': '0.3em',
        'mega-wide': '0.5em',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 136, 255, 0.5))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 2px rgba(0, 136, 255, 0.2))' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
