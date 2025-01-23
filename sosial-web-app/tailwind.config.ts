import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#1DA1F2',
          hover: '#1A8CD8',
          active: '#166BBF',
          disabled: '#A3D4F7',
        },
        secondary: {
          DEFAULT: '#657786',
          hover: '#4C5E6F',
          active: '#3A4958',
          disabled: '#B0BEC5',
        },
        warning: {
          DEFAULT: '#FF9900',
          hover: '#E68000',
          active: '#CC6D00',
          disabled: '#FFD1A3',
        },
        error: {
          DEFAULT: '#FF4D4D',
          hover: '#E63939',
          active: '#CC2F2F',
          disabled: '#FFB3B3',
        },
        success: {
          DEFAULT: '#28A745',
          hover: '#218838',
          active: '#1C7430',
          disabled: '#A9DFB1',
        },
        info: {
          DEFAULT: '#17A2B8',
          hover: '#138A9C',
          active: '#0F7081',
          disabled: '#8BD5DF',
        },
        black: {
          DEFAULT: '#222222',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        light: {
          DEFAULT: '#F5F5F5',
        },
      },
      transitionProperty: {
        button: 'background-color, box-shadow',
      },
      boxShadow: {
        button: '0 2px 4px rgba(0, 0, 0, 0.2)',
        'inset-button': 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
      },
      scale: {
        pressed: '0.98',
      },
      animation: {
        slideInLeft: 'slideInLeft 0.3s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
