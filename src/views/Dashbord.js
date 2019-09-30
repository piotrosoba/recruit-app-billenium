import React from 'react'
import { Link } from 'react-router-dom'

import { Typography } from '@material-ui/core'
import logo from '../img/restaurant.svg'

const styles = {
  info: { maxWidth: 800, margin: '60px auto 30px auto', fontSize: '1.35rem' },
  link: { color: '#558b2f', textDecoration: 'none', fontWeight: 'bold' },
  img: { width: 200, height: 200, margin: 'auto', display: 'block' }
}

const Dashbord = props => {
  return (
    <div>
      <Typography
        style={styles.info}
        align='center'
      >
        Aplikacja ChefApp powstała z myślą o tych, którzy w prosty sposób chcą wyszukać ciekawych propozycji kulinarnych.
        Dzięki ChefApp będziesz mógł nie tylko odnajdywać pomysły na dania, ale również <Link to='/add' style={styles.link}>dodawać</Link> własne.
        Po dodaniu, wszystkie przepisy trafiają do działu <Link to='/your-recipes' style={styles.link}>Twoje przepisy</Link>.
        Możesz również skorzystać z gotowych propozycji dań i odszukać coś pysznego do przygotowania.
        Wystarczy przejść do działu <Link to='/recipes' style={styles.link}>Przepisy</Link>.
      </Typography>
      <img
        style={styles.img}
        src={logo}
        alt='logo'
      />
    </div>
  )
}

export default Dashbord