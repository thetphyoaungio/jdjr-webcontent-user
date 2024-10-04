import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        blue: {
          50: "#F4F9FF",
          100: "#E9F1FD",
          150: "#D6E6FF",
          200: "#B1D1FF",
          250: "#4D5A74",
          300: "#698DC4",
          400: "#2373E6",
          500: "#014DAB",
          600: "#001B3C"
        },
        yellow: {
          100: "#FFFAE6",
          150: "#FFD600",
          200: "#FEC900",
          300: "#725A00"
        },
        neutral: {
          200: "#FAFAFA",
          300: "#999999",
          400: "#494949",
          900: "#121212"
        },
        green: {
          light: "#E7FBE9",
          normal: "#10D624",
          dark: "#0A8016"
        },
        red: {
          light: "#FBE8E7",
          normal: "#D61C10",
          dark: "#A1150C"
        },
        orange: {
          light: "#FFF4E6",
          normal: "#FF9000",
          dark: "#995600"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      backgroundImage: {
        navBanner: "url('/uploads/images/nav-bg.svg')",
        heroBanner: "url('/uploads/images/banner-bg.svg')",
        homeInfo: "url('/uploads/images/info-bg.svg')"
      },
      boxShadow: {
        box: "0px 0px 7px 4px rgba(0, 0, 0, 0.12)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      screens: {
        maxMd: { max: "768px" }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;

export default config;
