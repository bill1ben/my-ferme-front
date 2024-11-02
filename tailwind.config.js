/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-green': '#6A9C89',
        'color-white': '#E9EFEC',
        'color-teal': '#16423C',
        'color-grey': '#C4DAD2',
        'color-white': '#E9EFEC',

      },
    },
  },
  plugins: [],
}

