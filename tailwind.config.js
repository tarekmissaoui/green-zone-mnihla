/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#1f7a3f",
          dark: "#111111",
          cream: "#f8fff7",
          accent: "#41b06e",
        },
      },
      boxShadow: {
        premium: "0 12px 30px rgba(31, 122, 63, 0.15)",
      },
    },
  },
  plugins: [],
};
