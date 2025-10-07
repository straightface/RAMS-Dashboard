/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // 👈 enables dark mode toggle via a class on <html>
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        danger: "#dc2626",
        success: "#16a34a"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
