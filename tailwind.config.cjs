const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      screens: {
        ml: "1300px",
      },
    },
  },

  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    // This will become
    // extend: {
    //   backgroundColor: ["disabled"],
    // }
    // in Tailwind CSS 2.0
  },

  // add daisyUI plugin
  plugins: [require("daisyui")],

  // config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#2B59C3",
          "primary-focus": "#5980DB",
          "primary-content": "#ffffff",
          secondary: "#B4ADEA",
          "secondary-focus": "#C7C2EF",
          "secondary-content": "#ffffff",
          accent: "#F6511D",
          "accent-focus": "#F87C56",
          "accent-content": "#ffffff",
          neutral: "#0D1321",
          "neutral-focus": "#2E4374",
          "neutral-content": "#ffffff",
          "base-100": "#111827",
          "base-200": "#111827",
          "base-300": "#111827",
          "base-content": "#D1D5DB",
          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};

module.exports = config;
