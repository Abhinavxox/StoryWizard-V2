/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  //only dark theme in tailwind
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
