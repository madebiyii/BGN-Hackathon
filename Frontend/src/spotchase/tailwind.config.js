/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
      },

      screens: {
        fold: "280px", // or a value that best targets the Galaxy Fold without affecting other devices
        sm: "360px",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        // New colors (blueish, orange, green)
        blueish: {
          DEFAULT: "#3B82F6", // Main blue
          dark: "#2563EB",    // Darker blue
          light: "#93C5FD",   // Lighter blue
        },
        orange: {
          DEFAULT: "#FB923C", // Main orange
          dark: "#EA580C",    // Darker orange
          light: "#FED7AA",   // Lighter orange
        },
        green: {
          DEFAULT: "#10B981", // Main green
          dark: "#047857",    // Darker green
          light: "#A7F3D0",   // Lighter green
        },

        // Keeping your peach colors
        peach: "#f96a6c",
        "peach-dark": "#fc578c",
      },

      animation: {
        "infinite-scroll": "infinite-scroll 50s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

