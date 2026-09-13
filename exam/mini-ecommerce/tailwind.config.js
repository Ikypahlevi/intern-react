/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.85rem', { lineHeight: '1.25rem' }],
        'sm': ['1rem', { lineHeight: '1.5rem' }],
        'base': ['1.125rem', { lineHeight: '1.75rem' }],
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],
        'xl': ['1.4rem', { lineHeight: '2rem' }],
        '2xl': ['1.65rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.1rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.5rem', { lineHeight: '1' }],
      },
      fontFamily: {
        comic: ['"Bangers"', 'cursive', 'impact', 'sans-serif'],
        bubble: ['"Patrick Hand"', 'cursive', 'sans-serif']
      },
      colors: {
        comic: {
          yellow: '#FFE01B',
          gold: '#FFC400',
          red: '#FF2E2E',
          crimson: '#D60000',
          orange: '#FF6B00',
          blue: '#00B4D8',
          cyan: '#00F0FF',
          ink: '#101010',
          bg: '#FFFDF0',
          green: '#22C55E'
        }
      },
      boxShadow: {
        'comic-sm': '2px 2px 0px #101010',
        'comic': '4px 4px 0px #101010',
        'comic-md': '5px 5px 0px #101010',
        'comic-lg': '7px 7px 0px #101010',
        'comic-xl': '9px 9px 0px #101010',
        'comic-hover': '1px 1px 0px #101010'
      }
    },
  },
  plugins: [],
}
