/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    transform: {
      jsx: (content) => content.replace(/class(Name)?=['"]((?:[^'"]*))['"]/g, (match, className, classes) => {
        return match; // Keep the classes as is
      }),
    },
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}