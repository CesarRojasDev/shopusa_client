/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        astronaut: {
          50: "#f1f4fc",
          100: "#e6ebf9",
          200: "#d1d9f4",
          300: "#b4c0ed",
          400: "#96a0e3",
          500: "#7c81d8",
          600: "#6462c9",
          700: "#5652b0",
          800: "#46448f",
          900: "#3b3b6f",
          950: "#242442",
        },
        monza: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc8c9",
          300: "#ffa1a2",
          400: "#fe6b6d",
          500: "#f63d3f",
          600: "#e41e20",
          700: "#c71618",
          800: "#9e1618",
          900: "#83191a",
          950: "#480708",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};
