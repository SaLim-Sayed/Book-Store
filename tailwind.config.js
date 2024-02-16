import {nextui} from "@nextui-org/react";
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },

  important: true,
  plugins: [nextui()],

};

export default config;
