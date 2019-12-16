import { createMuiTheme } from '@material-ui/core';

const appPalette = {
  salmon: '#ff6c80',
  slate: '#65656c',
  steel: '#8d8d8e',
  gainsboro: '#d8d8d8',
  smoke: '#f7f8f9',
  indigo: '#304075',
  teal: '#03c4c8',
  charcoalGrey: '#313134',
  red: '#cc284e',
  white: 'white',
  error: '#ff3362',
  warning: '#ffc12a',
  black: 'black',
  green: '#00CE00',
  grey200: '#d3d3d3',
  grey300: '#c9c9c9',
  grey46: '#757575',
  grey500: '#888b8d',
  grey600: '#65656d',
  grey700: '#4b4b4b'
};

const theme = createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main:'#6D51BC'
    },
    secondary: {
      main: '#ff4547'
    },
    text: {
      primary: '#606060'
    }
  },
  colors: { ...appPalette }
});

export default theme;
