import React from 'react'
import { Typography } from '@material-ui/core'

import imgPlacecholder from '../../img/img-placeholder.svg'

const styles = {
  root: { position: 'relative', width: 220, height: 220, margin: 7, cursor: 'pointer', overflow: 'hidden' },
  img: { width: '100%', height: '100%', backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center', transition: '500ms' },
  description: { position: 'absolute', bottom: 0, height: '30%', width: '100%', backgroundColor: 'rgba(0,0,0,0.4)' },
  title: { color: 'white', marginLeft: 20, marginTop: 15 },
  subtitle: { color: 'white', marginLeft: 20, fontSize: 14 }
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
        <Typography
          style={styles.subtitle}
        >
          Czas przygotowania: {props.data.time}min
        </Typography>
      </div>
    </div>
  )
}

export default GridListItem