import React from 'react'

import FullScreenCircural from './components/FullScreenCircural'
import Snackbars from './components/Snackbars'
import Auth from './Auth'

const App = props => {
  return (
    <div>
      <Auth>
        siemano
      </Auth>
      <FullScreenCircural />
      <Snackbars />
    </div>
  )
}

export default App