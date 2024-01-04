import daisyui from 'daisyui'
import Typography from '@tailwindcss/typography'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/@tailwind-rc/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
 theme: {
    extend: {
    fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        telemarines:["Telemarines", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [Typography, daisyui, require('tailwind-scrollbar')],
 
  daisyui: {
    styled: true,
    themes: ["synthwave"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "synthwave",
  }
}
