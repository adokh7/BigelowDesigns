import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * BigelowDesigns Design System v1.0
 * Editorial · Minimal · Luxury
 *
 * Source of truth: design/tokens.json
 * Keep this file in sync with tokens.json — tokens are the source.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // ─── Breakpoints ──────────────────────────────────────────────
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    // ─── Spacing (8px grid) ───────────────────────────────────────
    spacing: {
      0: '0',
      px: '1px',
      0.5: '2px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      14: '56px',
      16: '64px',
      20: '80px',
      24: '96px',
      32: '128px',
      40: '160px',
      48: '192px',
      64: '256px',
    },

    extend: {
      // ─── Color — Light & Dark via CSS variables ───────────────
      colors: {
        // Light mode is default. Dark mode swaps via CSS vars in globals.css.
        canvas:   'rgb(var(--bg-canvas)   / <alpha-value>)',
        surface:  'rgb(var(--bg-surface)  / <alpha-value>)',
        elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
        sunken:   'rgb(var(--bg-sunken)   / <alpha-value>)',

        ink: {
          50:  'rgb(var(--ink-50)  / <alpha-value>)',
          100: 'rgb(var(--ink-100) / <alpha-value>)',
          200: 'rgb(var(--ink-200) / <alpha-value>)',
          400: 'rgb(var(--ink-400) / <alpha-value>)',
          600: 'rgb(var(--ink-600) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)',
          50:  'rgb(var(--accent-50)  / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
        },

        forest: {
          700: 'rgb(var(--forest-700) / <alpha-value>)',
        },

        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        danger:  'rgb(var(--danger)  / <alpha-value>)',
        info:    'rgb(var(--info)    / <alpha-value>)',
      },

      // ─── Typography ────────────────────────────────────────────
      fontFamily: {
        serif: ['var(--font-serif)', 'Fraunces', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        'display-xl': ['72px', { lineHeight: '76px', letterSpacing: '-0.04em',  fontWeight: '500' }],
        'display-lg': ['56px', { lineHeight: '60px', letterSpacing: '-0.03em',  fontWeight: '500' }],
        'h1':         ['40px', { lineHeight: '48px', letterSpacing: '-0.025em', fontWeight: '600' }],
        'h2':         ['30px', { lineHeight: '38px', letterSpacing: '-0.02em',  fontWeight: '600' }],
        'h3':         ['22px', { lineHeight: '30px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'body-lg':    ['19px', { lineHeight: '32px', letterSpacing: '0',        fontWeight: '400' }],
        'body':       ['16px', { lineHeight: '26px', letterSpacing: '0',        fontWeight: '400' }],
        'body-sm':    ['14px', { lineHeight: '22px', letterSpacing: '0',        fontWeight: '400' }],
        'eyebrow':    ['12px', { lineHeight: '16px', letterSpacing: '0.12em',   fontWeight: '600' }],
      },

      // ─── Radius ─────────────────────────────────────────────────
      borderRadius: {
        none: '0',
        sm:   '4px',
        md:   '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl':'16px',
        full: '9999px',
      },

      // ─── Shadow (luxe, restrained) ──────────────────────────────
      boxShadow: {
        xs:  '0 1px 2px 0 rgba(21,20,15,0.04)',
        sm:  '0 2px 4px -1px rgba(21,20,15,0.05)',
        md:  '0 8px 20px -6px rgba(21,20,15,0.08)',
        lg:  '0 12px 32px -8px rgba(21,20,15,0.10)',
        xl:  '0 24px 60px -12px rgba(21,20,15,0.16)',
        focus: '0 0 0 2px rgb(var(--bg-canvas)), 0 0 0 4px rgb(var(--accent-500))',
      },

      // ─── Motion ────────────────────────────────────────────────
      transitionDuration: {
        instant:    '80ms',
        quick:      '160ms',
        smooth:     '260ms',
        elegant:    '420ms',
        editorial:  '680ms',
      },
      transitionTimingFunction: {
        out:           'cubic-bezier(0.32, 0.72, 0, 1)',
        'in-out':      'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring-soft': 'cubic-bezier(0.5, 1.4, 0.5, 1)',
        'spring-snap': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-rise':      'fade-rise 420ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'fade-rise-hero': 'fade-rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-zoom':      'fade-zoom 260ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'fade-in':        'fade-in 420ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'fade-in-slow':   'fade-in 1200ms ease-out both',
        'modal-in':       'modal-in 260ms cubic-bezier(0.32, 0.72, 0, 1) both',
        'backdrop-in':    'backdrop-in 260ms ease-out both',
        'shimmer':        'shimmer 1400ms linear infinite',
        'ken-burns':      'ken-burns 14000ms ease-out forwards',
        'scroll-hint':    'scroll-hint 2200ms ease-in-out infinite',
      },
      keyframes: {
        'fade-rise':   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-zoom':   { from: { opacity: '0', transform: 'scale(1.02)' },     to: { opacity: '1', transform: 'scale(1)' } },
        'fade-in':     { from: { opacity: '0' },                                to: { opacity: '1' } },
        'modal-in':    { from: { opacity: '0', transform: 'translateY(8px) scale(0.96)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        'backdrop-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'shimmer':     { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(100%)' } },
        'ken-burns':   { from: { transform: 'scale(1.0)', transformOrigin: '55% 45%' }, to: { transform: 'scale(1.12)', transformOrigin: '50% 50%' } },
        'scroll-hint': { '0%, 100%': { opacity: '0', transform: 'translateY(0)' }, '50%': { opacity: '1', transform: 'translateY(6px)' } },
      },

      // ─── Z-index ───────────────────────────────────────────────
      zIndex: {
        base:    '0',
        raised:  '10',
        sticky:  '30',
        header:  '40',
        dropdown:'50',
        modal:   '60',
        toast:   '70',
      },

      // ─── Containers ─────────────────────────────────────────────
      maxWidth: {
        prose: '70ch',
        content: '720px',
        page: '1200px',
        wide: '1280px',
      },

      // ─── Editorial prose ───────────────────────────────────────
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: 'rgb(var(--ink-800))',
            fontSize: '19px',
            lineHeight: '1.68',
            '--tw-prose-headings': 'rgb(var(--ink-900))',
            'h2, h3, h4': {
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em',
              marginTop: '2.5em',
              marginBottom: '0.75em',
            },
            h2: { fontSize: '30px', lineHeight: '38px', fontWeight: '600' },
            h3: { fontSize: '22px', lineHeight: '30px', fontWeight: '600' },
            a: {
              color: 'rgb(var(--accent-600))',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              fontWeight: '500',
            },
            'a:hover': { color: 'rgb(var(--accent-500))' },
            img: { borderRadius: '12px' },
            blockquote: {
              borderLeftColor: 'rgb(var(--accent-500))',
              fontStyle: 'normal',
              fontFamily: 'var(--font-serif)',
              fontSize: '24px',
              lineHeight: '34px',
              color: 'rgb(var(--ink-800))',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
