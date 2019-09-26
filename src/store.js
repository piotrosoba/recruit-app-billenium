import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import fullScreenCircural from './state/fullScreenCircural'
import snackbars from './state/snackbars'

const reducer = combineReducers({
  fullScreenCircural,
  snackbars
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)