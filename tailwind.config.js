/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        stable: '#4CAF50',
        growth: '#2196F3',
        turbo: '#FF9800',
      },
    },
  },
  plugins: [],
}
