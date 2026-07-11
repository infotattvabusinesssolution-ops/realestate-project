/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          light: '#eff6ff',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          surface: '#3b82f6',
        },
        vendor: {
          light: '#fff7ed',
          DEFAULT: '#ea580c',
          dark: '#c2410c',
          surface: '#f97316',
        },
        agent: {
          light: '#f0fdf4',
          DEFAULT: '#16a34a',
          dark: '#15803d',
          surface: '#22c55e',
        },
        customer: {
          light: '#faf5ff',
          DEFAULT: '#9333ea',
          dark: '#7e22ce',
          surface: '#a855f7',
        },
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.03)',
        'premium-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
