type MyTheme = {
  colors: {
    primary: string
    secondary: string
    background: string
    hover: string
  }
  spacing: {
    small: string
    medium: string
    large: string
  }
}

export const theme: MyTheme = {
  colors: {
    primary: '#000000',
    secondary: '#2ecc71',
    background: '#f5f5f5',
    hover: '#e0e0e0',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
}

export type ThemeType = typeof theme
