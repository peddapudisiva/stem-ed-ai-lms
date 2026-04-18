import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: 'var(--blue)',
          dk: 'var(--blue-dk)',
          lt: 'var(--blue-lt)',
          md: 'var(--blue-md)',
        },
        green: {
          DEFAULT: 'var(--green)',
          dk: 'var(--green-dk)',
          lt: 'var(--green-lt)',
          md: 'var(--green-md)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          dk: 'var(--amber-dk)',
          lt: 'var(--amber-lt)',
          md: 'var(--amber-md)',
        },
        teal: {
          DEFAULT: 'var(--teal)',
          lt: 'var(--teal-lt)',
        },
        purple: {
          DEFAULT: 'var(--purple)',
          lt: 'var(--purple-lt)',
        },
        red: {
          DEFAULT: 'var(--red)',
          dk: 'var(--red-dk)',
          lt: 'var(--red-lt)',
        },
        slate: {
          50: 'var(--slate-50)',
          100: 'var(--slate-100)',
          200: 'var(--slate-200)',
          300: 'var(--slate-300)',
          400: 'var(--slate-400)',
          500: 'var(--slate-500)',
          600: 'var(--slate-600)',
          700: 'var(--slate-700)',
          800: 'var(--slate-800)',
          900: 'var(--slate-900)',
          950: 'var(--slate-950)',
        },
        surface: 'var(--surface)',
        border: 'var(--border)',
        "border-focus": 'var(--border-focus)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
      },
      backgroundColor: {
        default: 'var(--bg)',
        surface: 'var(--surface)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      borderRadius: {
        xs: 'var(--r-xs)',
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
        full: 'var(--r-full)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '800' }],
        'page-title': ['32px', { lineHeight: '1.3', fontWeight: '800' }],
        'section-title': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'card-title': ['20px', { lineHeight: '1.4', fontWeight: '700' }],
        'sub-heading': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
        'meta': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        'eyebrow': ['11px', { lineHeight: '1.5', fontWeight: '600' }],
      },
      transitionTimingFunction: {
        fast: 'cubic-bezier(0.4,0,0.2,1)',
        med: 'cubic-bezier(0.4,0,0.2,1)',
        slow: 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        fast: '150ms',
        med: '250ms',
        slow: '400ms',
      }
    },
  },
  plugins: [],
} satisfies Config
