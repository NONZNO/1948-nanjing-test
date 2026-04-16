/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-paper': '#f4ecd8',
        'vintage-ink': '#3d3027',
        'vintage-red': '#8b2626',
      },
      fontFamily: {
        serif: ['Georgia', 'Noto Serif SC', 'SimSun', 'serif'],
      },
    },
  },
  plugins: [],
}
