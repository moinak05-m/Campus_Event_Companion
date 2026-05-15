/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F172A",
          darker: "#111827",
        },
        primary: {
          purple: "#7C3AED",
          cyan: "#06B6D4",
        },
        text: {
          light: "#F8FAFC",
          muted: "#94A3B8",
        },
        accent: {
          success: "#22C55E",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(124, 58, 237, 0.4)',
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
}
