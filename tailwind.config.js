/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── GOOGLE STITCH "Placement Pal Vibrant Interactive" Theme ───
        background: '#fff9e9',
        surface: '#fff9e9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#faf3df',
        'surface-container': '#f4eeda',
        'surface-container-high': '#eee8d4',
        'surface-container-highest': '#e8e2cf',
        'on-surface': '#1e1c10',
        'on-surface-variant': '#4b4731',
        'charcoal-ink': '#1A1A1A',
        'off-white-canvas': '#F9F8F6',
        'sunshine-yellow': '#FFE600',
        'primary-container': '#ffe600',
        'on-primary-container': '#726600',
        primary: '#6a5f00',
        'on-primary': '#ffffff',
        'mint-green': '#00F5D4',
        secondary: '#006b5b',
        'secondary-container': '#26fedc',
        'on-secondary-container': '#007261',
        'coral-pink': '#FF6B6B',
        'bright-lavender': '#9B5DE5',
        outline: '#7c775f',
        'outline-variant': '#cdc7aa',

        // Base & Fallbacks
        canvas: '#FAF3DF',
        card: '#FFFFFF',
        border: {
          DEFAULT: '#CDC7AA',
          subtle: '#E8E2CF',
        },
      },
      fontFamily: {
        sans:     ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'sans-serif'],
        heading:  ['Rubik', 'Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
        headline: ['Rubik', 'sans-serif'],
        body:     ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono:     ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        card:        '0 2px 8px rgba(106, 95, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(106, 95, 0, 0.12), 0 6px 12px -2px rgba(0, 0, 0, 0.05)',
        pop:         '0 4px 14px rgba(255, 230, 0, 0.45)',
        glow:        '0 0 20px rgba(255, 230, 0, 0.5)',
        mint:        '0 0 14px rgba(0, 245, 212, 0.5)',
        subtle:      '0 1px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
