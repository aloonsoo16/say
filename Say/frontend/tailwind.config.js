import daisyui from "daisyui";
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      size: {
        xs: "0.9rem",
      },
      spacing: {
        35: "7.5rem", // Esto se utiliza para la clase bottom-35 que se usa en el espacio inferior de los botones de nuevos nensajes y scroll del chat
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    base: false, //Deshabilitar los estilos de scrollbar de daisyui
    themes: ["light"],
  },
};
