/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      screens: {
        mobile: { min: "100px", max: "500px" },
        tablet: { min: "501px", max: "768px" },
        laptop: { min: "769px", max: "1440px " },
        pc: { min: "1441px" },
      },
      spacing: {
        "object-cover": "100%",
      },
    },
  },
  plugins: [],
};
