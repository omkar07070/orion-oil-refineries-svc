/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary near-black backgrounds
        ink: {
          DEFAULT: '#0B0F14',   // main dark background
          soft:    '#12171C',   // raised panels / cards on dark bg
          border:  '#22282F',   // subtle borders/dividers on dark sections
        },
        // Brand gold accent
        gold: {
          DEFAULT: '#C6912F',   // primary gold (buttons, accents, icons)
          light:   '#D9A83D',   // hover state / lighter highlight
          dark:    '#A8791F',   // pressed state / deep accent
        },
        // White/light sections
        paper: {
          DEFAULT: '#FFFFFF',   // white sections
          muted:   '#F5F5F3',   // very light gray alternate section bg
        },
        // Muted body text
        slate: {
          DEFAULT: '#9CA3AF',   // muted body text on dark backgrounds
          dark:    '#374151',   // muted body text on light backgrounds
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',   // card corner radius (~12px as per design spec)
        '2xl': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
