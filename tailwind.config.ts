import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary (Blue)
        primary: {
          DEFAULT: "#3182f6",
          50: "#e8f3ff",
          100: "#c9e2ff",
          200: "#90c2ff",
          300: "#64a8ff",
          400: "#4593fc",
          500: "#3182f6",
          600: "#2272eb",
          700: "#1b64da",
          800: "#1957c2",
          900: "#194aa6",
        },
        // Grey Scale
        grey: {
          50: "#f9fafb",
          100: "#f2f4f6",
          200: "#e5e8eb",
          300: "#d1d6db",
          400: "#b0b8c1",
          500: "#8b95a1",
          600: "#6b7684",
          700: "#4e5968",
          800: "#333d4b",
          900: "#191f28",
        },
        // Semantic
        surface: "#ffffff",
        "surface-grey": "#f2f4f6",
        action: "#093AEE",
      },
      fontSize: {
        h1: ["56px", { lineHeight: "1.3" }],
        h2: ["48px", { lineHeight: "1.3" }],
        h3: ["36px", { lineHeight: "1.3" }],
        h4: ["32px", { lineHeight: "1.3" }],
        h5: ["24px", { lineHeight: "1.6" }],
        h6: ["20px", { lineHeight: "1.6" }],
        h7: ["17px", { lineHeight: "1.6" }],
        body: ["15px", { lineHeight: "1.6" }],
        sm: ["13px", { lineHeight: "1.6" }],
        xs: ["11px", { lineHeight: "1.6" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontFamily: {
        sans: [
          "Toss Product Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Noto Sans KR",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
