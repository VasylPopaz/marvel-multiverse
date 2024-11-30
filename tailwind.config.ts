/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      "sm-max": { max: "374.98px" },
      md: "768px",
      lg: "1440px",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primaryBgColor: "var(--primary-bg-color)",
        primaryTextColor: "var(--primary-text-color)",
        accentColor: "var(--accent-color)",
        pantherBlurColor: "#34387F ",
        spiderManBlurColor: "#600404",
        hulkBlurColor: "#5B7F3C",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          minWidth: "320px",
          maxWidth: "375px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          "@screen md": {
            paddingLeft: "32px",
            paddingRight: "32px",
            maxWidth: "768px",
          },
          "@screen lg": {
            maxWidth: "1440px",
          },
        },
      });
    },
  ],
};
