import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import FullScreenCircural from './components/FullScreenCircural'
import Snackbars from './components/Snackbars'
import Auth from './Auth'
import AppBar from './views/AppBar'
import Drawer from './views/Drawer'
import ScrollToTop from './components/ScrollToTop'

const App = props => {
  return (
    <div>
      <Auth>
        <Router>
          <AppBar />
          <Drawer />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Router>
      </Auth>
      <ScrollToTop />
      <FullScreenCircural />
      <Snackbars />
    </div>
  )
}

export default App