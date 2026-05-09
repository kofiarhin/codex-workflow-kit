/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}", "./test/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18181b",
        accent: "#256f5c"
      },
      fontFamily: {
        sans: ["Geist", "Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "ui-monospace", "monospace"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(24, 24, 27, 0.08)"
      }
    }
  },
  plugins: []
};
