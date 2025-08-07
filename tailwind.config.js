/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        itim: ['Itim', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        "brand-red": "#DD765B",
        "brand-green": "#368841",
        "brand-brown": "#995524",
        "brand-blue": "#255099",
        "brand-pink": "#FFC4CB",
        "brand-light-green": "#B2FFBD",
        "brand-light-orange": "#FFE9D9",
        "brand-light-border-pink": "#FFF8F7",
        "brand-light-border-green": "#F2FFF4",
        "brand-text-color": "#1A1A1A",
        "brand-light-text-color": "#524342",
        "brand-title-color": "#262437",
        
        // New additional colors
        "brand-purple": "#8B5CF6",
        "brand-yellow": "#F59E0B",
        "brand-cyan": "#06B6D4",
        "brand-gray": "#61655F",
        "brand-dark": "#1F2937",
        "brand-white": "#FFFFFF",
        "brand-black": "#000000",
        
        // Gradient colors
        "brand-gradient-start": "#FF6B6B",
        "brand-gradient-end": "#4ECDC4",
        
        // Status colors
        "brand-success": "#10B981",
        "brand-warning": "#F59E0B",
        "brand-error": "#EF4444",
        "brand-info": "#3B82F6",
      },
    },
  },
  plugins: [],
};
