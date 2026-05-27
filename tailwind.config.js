export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: "#0f8b4c",
        moss: "#84c341",
        ink: "#101410",
        limewash: "#f5faf3"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 20, 16, 0.12)"
      }
    }
  },
  plugins: []
};
