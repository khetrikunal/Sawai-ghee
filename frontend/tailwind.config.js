/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          dark: '#0f3a2a',
          DEFAULT: '#1a5c3e',
          light: '#2d7a55',
        },
        gold: {
          dark: '#c9952a',
          DEFAULT: '#e4b84a',
          light: '#f5d87a',
        },
        cream: {
          dark: '#ede0b8',
          DEFAULT: '#f5ead0',
          light: '#fdf6e3',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
