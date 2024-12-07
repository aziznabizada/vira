/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          Default: "#222",
          100: "#333",
        },
      },
      fontFamily: {
        bkoodakbold: ["BKoodak-Bold", "sans-serif"],
        bkoodakoutline: ["BKoodak-Outline", "sans-serif"],
        koodakregular: ["koodak", "sans-serif"],
        dastan: ["dastan", "sans-serif"],
      },
    },
  },
  darkMode: "class", // Enable dark mode
  plugins: [],
};
