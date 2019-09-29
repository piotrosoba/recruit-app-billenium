import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { CircularProgress } from '@material-ui/core';

const styles = {
  div: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000000,
    backgroundColor: 'rgba(36, 41, 41, 0.8)'
  },
  circular: { color: '#ffff33' }
}

const FullScreenCircural = props => {
  return (
    props._isOpen ?
      <div style={styles.div}>
        <CircularProgress
          size={80}
          style={styles.circular}
        />
      </div>
      :
      null
  )
}

FullScreenCircural.propTypes = {
  _isOpen: PropTypes.number
}

const mapStateToProps = state => ({
  _isOpen: state.fullScreenCircural.fetchs.length
})

export default connect(
  mapStateToProps
)(FullScreenCircural)