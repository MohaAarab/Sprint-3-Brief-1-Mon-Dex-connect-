/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js", "./data.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#d4a017", // gold: buttons, stat bars, active filter
          dark: "#a87c0c",    // darker gold: pressed buttons
          light: "#f3d77a",   // light gold: hover, badges
        },
        ink: "#0b0615",       // very dark purple: header, text on gold buttons
        muted: "#a99bc4",     // secondary text
        ground: "#120a1f",    // page background
        line: "#3d2b66",      // borders
        cream: "#f5ecd6",     // main text (replaces "text")
        card: "#1e1433",      // cards, panels, form
        card_soft: "#2a1d47", // image areas, empty team slots
        error: "#ff6b81",     // form errors
      },
      fontFamily: {
        display: ["Arial", "sans-serif"],
        body: ["Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};