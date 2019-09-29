import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { drawerOpenActionCreator } from '../state/drawer'
import { logOutActionCreator } from '../state/auth'

import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Popper, Grow, ClickAwayListener, Paper, MenuList, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'

const styles = {
  link: { textDecoration: 'none', color: '#fff' },
  menuLink: { textDecoration: 'none', color: '#000' },
  div: { marginBottom: 10 },
  toolbar: { justifyContent: 'space-between' }
}


const AppBar = props => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const anchorRef = React.useRef(null)
  const closeMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false)
  }

  return (
    <div style={styles.div}>
      <MuiAppBar position='static'>
        <Toolbar
          style={styles.toolbar}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props._openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
          >
            <Link
              to='/'
              style={styles.link}
            >
              Kuchapka
            </Link>
          </Typography>
          <IconButton
            color='inherit'
            ref={anchorRef}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <SettingsIcon />
          </IconButton>
          <Popper open={openMenu} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper id="menu-list-grow">
                  <ClickAwayListener onClickAway={closeMenu}>
                    <MenuList>
                      <MenuItem
                        onClick={closeMenu}
                      >
                        <Link
                          to='/change-password'
                          style={styles.menuLink}
                        >
                          Zmień hasło
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={(evt) => {
                          closeMenu(evt)
                          props._logOut()
                        }}
                      >
                        <Link
                          to='/'
                          style={styles.menuLink}
                        >
                          Wyloguj
                         </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </MuiAppBar>
    </div>
  )
}


AppBar.propTypes = {
  _openDrawer: PropTypes.func,
  _logOut: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  _openDrawer: () => dispatch(drawerOpenActionCreator()),
  _logOut: () => dispatch(logOutActionCreator())
})

export default connect(
  null,
  mapDispatchToProps
)(AppBar)