import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a237e', // Navy
      light: '#e0e0ff',
      dark: '#000767',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffc107', // Gold
      light: '#ffdf9e',
      dark: '#6c5000',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ba1a1a',
      light: '#ffdad6',
      dark: '#93000a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#191c1d',
      secondary: '#454652',
    },
    divider: '#e1e3e4',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '56px',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px',
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '24px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    subtitle1: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    subtitle2: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4, // 4px default for buttons/inputs
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // 8px for cards and modals
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600,
          color: '#454652',
          borderBottom: '1px solid #e1e3e4',
        },
        body: {
          borderBottom: '1px solid #f3f4f5',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '2px',
            borderColor: '#1a237e',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E0E4EC',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
