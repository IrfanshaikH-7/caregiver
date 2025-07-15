// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // Override the default spacing scale to match design system
    spacing: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "4": "4px",
      "8": "8px",
      "12": "12px",
      "16": "16px",
      "20": "20px",
      "24": "24px",
      "32": "32px",
      "40": "40px",
      "48": "48px",
      "64": "64px",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "task-title": "20px",
        activity: "18px",
        description: "16px",
        "button-text": "20px",
        "input-text": "14px",
        address: "16px",
      },
      lineHeight: {
        "task-title": "100%",
        activity: "100%",
        description: "125%",
        "button-text": "125%",
        "input-text": "24px",
        address: "143%",
      },
      letterSpacing: {
        address: "0.17px",
      },
      colors: {
        "task-text": "#1D1D1BDE",
        "activity-bg": "#0D5D59",
        "button-select-bg": "#2DA6FF1F",
        "input-text": "#00000099",
      },
      borderRadius: {
        button: "16px",
        task: "8px",
      },
      width: {
        "button-select": "78px",
        map: "243px",
      },
      height: {
        "button-select": "44px",
        map: "178px",
      },
    },
  },
  plugins: [],
} satisfies Config;
