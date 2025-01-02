/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6A11CB',
          hover: '#5a0fb0',
        },
        secondary: {
          DEFAULT: '#2575FC',
          hover: '#1e63d6',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'wave': 'wave 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(8px)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.8)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [typography, scrollbar],
};