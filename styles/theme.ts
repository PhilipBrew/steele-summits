export const theme = {
  colors: {
    // Core brand — deep pine/moss green, lifted from the hillside
    primary: '#3A5A40',
    primaryDark: '#28402C',
    primaryLight: '#6B8F6E',
    accent: '#A9673B',
    accentDark: '#7C4A29',

    // Neutrals — warm, light-first palette (parchment, not near-black)
    ink: '#22261F',
    surface: '#F7F5EF',
    surfaceElevated: '#EFEBDF',
    border: '#D9D2BE',
    muted: '#6E6B5C',
    white: '#FFFFFF',

    // Semantic
    success: '#3F7D4C',
    warning: '#C98A2B',
    danger: '#B23A2E',
  },

  fonts: {
    heading: 'var(--font-heading), serif',
    body: 'var(--font-body), sans-serif',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.75rem',
    '4xl': '3.5rem',
    '5xl': '4.5rem',
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.1,
    heading: 1.2,
    body: 1.6,
  },

  space: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.5rem',
    '6': '2rem',
    '7': '3rem',
    '8': '4rem',
    '9': '6rem',
    '10': '8rem',
  },

  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    pill: '999px',
  },

  shadows: {
    card: '0 4px 16px rgba(34, 38, 31, 0.08)',
    cardElevated: '0 4px 20px rgba(34, 38, 31, 0.14)',
    glow: '0 0 24px rgba(169, 103, 59, 0.35)',
    glowStrong: '0 0 40px rgba(169, 103, 59, 0.5)',
  },

  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  container: {
    maxWidth: '1200px',
  },
} as const;

export type Theme = typeof theme;
