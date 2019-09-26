import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'
// import { checkIsUserLoggedIn } from './state/auth'

import App from './App'

// import './main.css'

// store.dispatch(checkIsUserLoggedIn())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)