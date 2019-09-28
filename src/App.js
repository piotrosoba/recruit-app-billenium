import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import FullScreenCircural from './components/FullScreenCircural'
import Snackbars from './components/Snackbars'
import Auth from './Auth'
import AppBar from './views/AppBar'
import Drawer from './views/Drawer'
import ScrollToTop from './components/ScrollToTop'
import AddRecipe from './views/AddRecipe'

const App = props => {
  return (
    <React.Fragment>
      <Auth>
        <Router>
          <AppBar />
          <Drawer />
          <Route path='/add' component={AddRecipe} />
        </Router>
      </Auth>
      <ScrollToTop />
      <FullScreenCircural />
      <Snackbars />
    </React.Fragment>
  )
}

export default App