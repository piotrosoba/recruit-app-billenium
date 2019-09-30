import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import FullScreenCircural from './components/FullScreenCircural'
import Snackbars from './components/Snackbars'
import Auth from './Auth'
import AppBar from './views/AppBar'
import Drawer from './views/Drawer'
import ScrollToTop from './components/ScrollToTop'
import AddRecipe from './views/AddRecipe'
import UserRecipes from './views/UserRecipes'
import Recipes from './views/Recipes'
import ChangePassword from './views/ChangePassword'

const App = props => {
  return (
    <React.Fragment>
      <Auth>
        <Router>
          <AppBar />
          <Drawer />
          <Route path='/change-password' component={ChangePassword} />
          <Route path='/add' component={AddRecipe} />
          <Route path='/your-recipes/:id?' component={UserRecipes} />
          <Route path='/recipes/:id?' component={Recipes} />
        </Router>
      </Auth>
      <ScrollToTop />
      <FullScreenCircural />
      <Snackbars />
    </React.Fragment>
  )
}

export default App