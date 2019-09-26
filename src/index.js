import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'
import { checkIsUserLoggedIn } from './state/auth'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'

import App from './App'

// import './main.css'

store.dispatch(checkIsUserLoggedIn())

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)