type Scale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type FunctionalTypes = 'error' | 'success' | 'warning' | 'info';

type FunctionalProps = {
  main: string;
  bg: string;
};

type FunctionalColors = Record<FunctionalTypes, FunctionalProps>

type Theme = {
  colors: {
    neutral: Record<Exclude<Scale, 800 | 900>, string>;
    primary: Record<Scale, string>;
    functional: FunctionalColors
  }
}

const DarkTheme: Theme = {
  colors: {
    neutral: {
      100: '#E6E6E6',
      200: '#C3C3CB',
      300: '#8D8D9B',
      400: '#5C5C66',
      500: '#282828',
      600: '#1A1A1A',
      700: '#121212',
    },
    primary: {
      100: '#E0AAFF',
      200: '#C77DFF',
      300: '#9D4EDD',
      400: '#7B2CBF',
      500: '#5A189A',
      600: '#3C096C',
      700: '#240046',
      800: '#10002B',
      900: '#0A0317',
    },
    functional: {
      error: {
        main: '#DD4E4E',
        bg: '#DD4E4E33',
      },
      success: {
        main: '#33BC51',
        bg: '#33BC5133',
      },
      warning: {
        main: '#DDB54E',
        bg: '#DDB54E33',
      },
      info: {
        main: '#4E90DD',
        bg: '#4E90DD33',
      },
    }
  }
}

export const theme = DarkTheme;