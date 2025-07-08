/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'seda-navy': '#0a0e1a',
        'seda-deep-navy': '#050a14',
        'seda-neon-teal': '#00f5d4',
        'seda-mint': '#7fffd4',
        'seda-blue': '#0066ff',
        'seda-light-blue': '#4da6ff',
        'seda-dark-blue': '#001a33',
        'seda-glass': 'rgba(255, 255, 255, 0.05)',
        'seda-glass-hover': 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5d4, 0 0 10px #00f5d4, 0 0 15px #00f5d4' },
          '100%': { boxShadow: '0 0 10px #00f5d4, 0 0 20px #00f5d4, 0 0 30px #00f5d4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '200': '200ms',
      },
    },
    container: {
      center: true,
      padding: '4rem',
      screens: {
        '2xl': '1024px', // even more compact
      },
    },
  },
  plugins: [],
} 