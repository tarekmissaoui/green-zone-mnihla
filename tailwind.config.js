/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2e7d32",
          dark: "#0f1720",
          night: "#020617",
          cream: "#f4f8f1",
          accent: "#66bb6a",
          earth: "#6d4c41",
          leaf: "#8bc34a",
        },
      },
      boxShadow: {
        premium: "0 12px 30px rgba(31, 122, 63, 0.15)",
        soft: "0 8px 20px rgba(15, 23, 32, 0.08)",
      },
    },
  },
  plugins: [],
};
