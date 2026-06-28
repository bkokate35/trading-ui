import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06100b",
        volt: "#b8ff2c",
        mint: "#46f7a7",
        lava: "#ff5c39",
        skybolt: "#35c8ff",
        night: "#0b1110"
      },
      boxShadow: {
        glow: "0 0 50px rgba(184, 255, 44, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
