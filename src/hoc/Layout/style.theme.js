import { createMuiTheme } from "@material-ui/core";
import primary from "@material-ui/core/colors/amber";
import secondary from "@material-ui/core/colors/blueGrey";
import error from "@material-ui/core/colors/red";
import success from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    type: 'dark',
    primary,
    secondary,
    error,
    success,
    // background: {
    //   default: '#433d3f',
    //   paper: '#302a2c'
    // }
  },
  typography: {
    useNextVariants: true,
  }
});

export default theme;