module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Inter var", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        users: "repeat(auto-fit, minmax(15rem, 1fr))",
      },
      backgroundColor: {
        "main-dark": "#36393f",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
