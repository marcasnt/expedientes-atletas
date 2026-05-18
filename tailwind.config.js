/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        fenifisc: {
          blue: '#1e3a8a',
          dark: '#0f172a',
          light: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}
