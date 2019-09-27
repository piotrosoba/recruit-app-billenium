import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

import { connect } from 'react-redux'
import { drawerOpenActionCreator } from '../state/drawer'
import { drawerCloseActionCreator } from '../state/drawer'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { List, ListItem, ListItemText } from '@material-ui/core'

const styles = {
  list: {
    width: 150,
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  }
}

const menu = [
  { title: 'Dodaj przepis', route: '/add' },
  { title: 'Przepisy', route: '/recipes' },
  { title: 'Twoje przepisy', route: '/your-recipes' }
]

const Drawer = props => {
  return (
    <div>
      <SwipeableDrawer
        open={props._isOpen}
        onClose={props._close}
        onOpen={props._open}
      >
        <List style={styles.list}>
          {menu.map(item => (
            <Link
              key={item.route}
              to={item.route}
              style={styles.link}
              onClick={props._close}
            >
              <ListItem button>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </SwipeableDrawer>
    </div>
  )
}

Drawer.propTypes = {
  _isOpen: PropTypes.bool,
  _open: PropTypes.func,
  _close: PropTypes.func
}

const mapStateToProps = state => ({
  _isOpen: state.drawer.open
})

const mapDispatchToProps = dispatch => ({
  _open: () => dispatch(drawerOpenActionCreator()),
  _close: () => dispatch(drawerCloseActionCreator())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer)