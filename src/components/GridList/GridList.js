import React from 'react'
import PropTypes from 'prop-types'
import GridListItem from './GridListItem'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 800,
    margin: 'auto'
  },
}

const GridList = props => {
  return (
    <div style={styles.root}>
      {props.data.map(recipe => (
        <GridListItem
          data={recipe}
          key={recipe.key}
          history={props.history}
          route={props.route}
        />
      ))}
    </div>
  )
}

GridList.propTypes = {
  data: PropTypes.array,
  history: PropTypes.object,
  route: PropTypes.string
}

export default GridList