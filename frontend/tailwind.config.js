/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F9F9F9",
        dark: "#363636",
        button: "#707EFF",
        buttonHover: "#5869FF",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
