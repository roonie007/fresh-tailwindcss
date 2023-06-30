import daisyui from "https://esm.sh/daisyui@3.1.7";

export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./islands/**/*.{js,ts,jsx,tsx,mdx}",
    "./routes/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    daisyui,
  ],
};
