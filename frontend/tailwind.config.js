/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,ts}",
    "./src/modules/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'gavac-green': '#1c4d33',
        'gavac-dark': '#0f3324',
      }
    },
  },
  plugins: [],
}
