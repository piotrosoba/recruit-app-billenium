import React from 'react'

import FullScreenCircural from './components/FullScreenCircural'
import Snackbars from './components/Snackbars'
import Auth from './Auth'
import AppBar from './views/AppBar'

const App = props => {
  return (
    <div>
      <Auth>
        <AppBar />
      </Auth>
      <FullScreenCircural />
      <Snackbars />
    </div>
  )
}

export default App