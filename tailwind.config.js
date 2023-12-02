/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },

      colors: {
        msBlue: "#0B8FAC",
        msLightBlue: "#7BC1B7",
        msBlack: "#23232E",
      },
    },
  },
  plugins: [],
};
