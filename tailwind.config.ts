import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E31E24",
          dark: "#B71C1C",
          light: "#FF5252",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          800: "#1A1A1A",
          700: "#2A2A2A",
          600: "#3A3A3A",
        },
      },
      fontFamily: {
        sans: ["Vazir", "Tahoma", "Arial", "sans-serif"],
        vazir: ["Vazir", "Tahoma", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.4s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(20px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        slideDown: { "0%": { transform: "translateY(-20px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
    },
  },
  plugins: [],
};

export default config;
