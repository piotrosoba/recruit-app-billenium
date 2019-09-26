import { createMuiTheme } from '@material-ui/core/styles'
import lightGreen from '@material-ui/core/colors/lightGreen'
import grey from '@material-ui/core/colors/grey'

export default createMuiTheme({
  palette: {
    primary: {
      light: lightGreen[200],
      main: lightGreen[800],
      dark: lightGreen[900]
    },
    secondary: {
      light: grey[400],
      main: grey[600],
      dark: grey[900]
    },
  },
})