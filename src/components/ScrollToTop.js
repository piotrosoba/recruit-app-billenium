import React from 'react'

import { Zoom, Fab, useScrollTrigger } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const styles = {
  arrow: { position: 'fixed', bottom: 20, right: 20 }
}

const ScrollToTop = props => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  })

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={styles.arrow}
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  )
}

export default ScrollToTop
