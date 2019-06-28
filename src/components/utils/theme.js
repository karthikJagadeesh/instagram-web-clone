import React from 'react';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const borderBottom = '1px solid #efefef';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", Helvetica, Arial, sans-serif'
  },

  palette: {
    primary: {
      main: '#3897f0'
    },
    secondary: {
      main: '#385185'
    }
  },

  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: '#fafafa',
        border: '1px solid #efefef',
        '&:hover': {
          backgroundColor: '#fafafa'
        }
      },
      underline: {
        '&:after': { borderBottom },
        '&:before': { borderBottom },
        '&:hover:before': { borderBottom },
        '&:hover': { borderBottom }
      }
    },

    MuiButton: {
      root: {
        textTransform: 'unset'
      },
      contained: {
        boxShadow: 'unset'
      }
    },

    MuiCard: {
      root: {
        boxShadow: 'none',
        border: '1px solid #e6e6e6'
      }
    },

    MuiAppBar: {
      root: {
        boxShadow: 'none',
        borderBottom: '1px solid #e6e6e6'
      }
    },

    MuiInputAdornment: {
      root: {
        '&$filled&$positionStart': {
          margin: 0
        }
      }
    }
  }
});

function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default ThemeProvider;
