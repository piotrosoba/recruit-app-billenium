import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import imgPlacecholder from '../../img/img-placeholder.svg'
import AccesTimeIcon from '@material-ui/icons/AccessTime'

const styles = {
  root: { position: 'relative', width: 220, height: 220, margin: 7, cursor: 'pointer', overflow: 'hidden' },
  img: { height: '100%', minWidth: '100%', backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center', transition: '500ms' },
  description: { position: 'absolute', bottom: 0, height: '40%', width: '100%', backgroundColor: 'rgba(0,0,0,0.4)' },
  title: { color: 'white', marginLeft: 20, marginTop: 15 },
  subtitle: { color: 'white', fontSize: 14, marginLeft: 3, marginRight: 15 },
  timeDiv: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' },
  icon: { width: 17, color: 'white' }
}

const GridListItem = props => {
  return (
    <div
      style={styles.root}
      onClick={() => props.history.push(props.route + '/' + props.data.key)}
    >
      <img
        style={styles.img}
        className={'grid-list-item__img'}
        src={props.data.photo}
        alt={props.data.name}
        onError={evt => evt.target.src = imgPlacecholder}
      />
      <div
        style={styles.description}
      >
        <Typography
          style={styles.title}
        >
          <b>{props.data.name}</b>
        </Typography>
        <div style={styles.timeDiv}>
          <AccesTimeIcon style={styles.icon} />
          <Typography
            display='inline'
            style={styles.subtitle}
          >
            {props.data.time}min
          </Typography>
        </div>
      </div>
    </div>
  )
}

GridListItem.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  route: PropTypes.string
}

export default GridListItem