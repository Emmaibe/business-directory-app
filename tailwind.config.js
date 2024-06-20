/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7F57F1",
        secondary: {
          100: "#DCD0FC"
        },
        gray: {
          100: "#8f8f8f",
        },
      },
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
        outfitmedium: ["outfit-medium", "sans-serif"],
        outfitbold: ["outfit-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
}

