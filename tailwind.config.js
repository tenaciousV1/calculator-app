/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["League Spartan", "cursive"],
      },
      colors: {
        "main-background": "var(--main-background)",
        "keypad-background": "var(--keypad-background)",
        "screen-background": "var(--screen-background)",
        /* Keys */
        "command-key-background": "var(--command-key-background)",
        "command-key-shadow": "var(--command-key-shadow)",
        "command-key-hover": "var(--command-key-hover)",

        "equal-key-background": "var(--equal-key-background)",
        "equal-key-shadow": "var(--equal-key-shadow)",
        "equal-key-hover": "var(--equal-key-hover)",

        "key-background": "var(--key-background)",
        "key-shadow": "var(--key-shadow)",
        "key-hover": "var(--key-hover)",

        /* Text */
        "key-text": "var(--key-text)",
        "equal-key-text": "var(--equal-key-text)",
        "command-key-text": "var(--command-key-text)",
        "screen-text": "var(--screen-text)",
      },
    },
  },
  plugins: [],
};
