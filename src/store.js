import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import fullScreenCircural from './state/fullScreenCircural'
import snackbars from './state/snackbars'
import auth from './state/auth'
import drawer from './state/drawer'
import user from './state/user'

const reducer = combineReducers({
  fullScreenCircural,
  snackbars,
  auth,
  drawer,
  user
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)