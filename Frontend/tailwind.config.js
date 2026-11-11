/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0062c5',
          cyan: '#37a5d0',
          purple: '#6b5ba0',
        },
        surface: {
          white: '#ffffff',
          light: '#f8f8f8',
          tint: '#f6f6f6',
          charcoal: '#1e2021',
        },
        body: '#333333',
        heading: '#111111',
      },
      fontFamily: {
        sans: ['MiSans', '"PingFang SC"', '"Microsoft YaHei"', 'Arial', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        'site': '1720px',
      },
    },
  },
  plugins: [],
};

