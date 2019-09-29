import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Paper, Button } from '@material-ui/core'

import imgPlacecholder from '../img/img-placeholder.svg'

const styles = {
  backToRecipes: { cursor: 'pointer', textDecoration: 'underline' },
  paper: { padding: 20, maxWidth: 600, display: 'flex', flexWrap: 'wrap', margin: '20px auto' },
  divImg: { width: 264, height: 264, position: 'relative', margin: '0 auto' },
  img: { width: '100%', height: '100%', backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center' },
  recipe: { display: 'flex', flexDirection: 'column', flexGrow: 1, margin: '20px 20px 0 20px', maxWidth: 296 },
  ul: { marginTop: -5 },
  descriptionDiv: { width: '100%', marginTop: 25 },
  description: { wordBreak: 'break-word' },
  typographyTime: { fontSize: 12 },
  typohraphyIngredients: { marginTop: 5 },
  buttonsDiv: { width: '100%', marginTop: 25, display: 'flex', justifyContent: 'flex-end' },
  button: { margin: 10 }
}

const SingleRecipe = props => {

  if (!props.recipe) {
    return (
      <React.Fragment>
        <Typography
          variant='h4'
          color='secondary'
          align='center'
        >
          Nie znaleziono przepisu o identyfikatorze:
        <br />
          {props.itemId}
        </Typography>
        <Typography
          style={styles.backToRecipes}
          variant='h4'
          color='primary'
          align='center'
          onClick={props.back}
        >
          Wróć do przepisów.
      </Typography>
      </React.Fragment>
    )
  }

  return (
    <Paper
      style={styles.paper}
    >
      <div
        style={styles.divImg}
      >
        <img
          style={styles.img}
          src={props.recipe.photo}
          alt={props.recipe.name}
          onError={evt => evt.target.src = imgPlacecholder}
        />
      </div>
      <div
        style={styles.recipe}
      >
        <Typography
          variant='h5'
          align='center'
          gutterBottom
          color='secondary'
        >
          <b>{props.recipe.name.toUpperCase()}</b>
        </Typography>
        <Typography
          style={styles.typographyTime}
          align='center'
          gutterBottom
          paragraph
        >
          Czas przygotowania: {props.recipe.time}min
        </Typography>
        <Typography
          style={styles.typohraphyIngredients}
          align='center'
          color='secondary'
          gutterBottom
        >
          <b>Składniki:</b>
        </Typography>
        <Typography
          variant='body2'
        >
          <ul style={styles.ul}>
            {props.recipe.ingredients.map(el => (
              <li>
                {el.ingredient} - {el.quantity}
              </li>
            ))}
          </ul>
        </Typography>
      </div>
      <div
        style={styles.descriptionDiv}
      >
        <Typography
          variant='h5'
          align='center'
          gutterBottom
          color='secondary'
        >
          Sposób przygotowania:
        </Typography>
        <Typography
          style={styles.description}
        >
          {props.recipe.description}
        </Typography>
      </div>
      {props.withEditAndRemove ?
        <div
          style={styles.buttonsDiv}
        >
          <Button
            style={styles.button}
            variant='contained'
            color='primary'
          >
            edytuj
          </Button>
          <Button
            style={styles.button}
            variant='contained'
            color='secondary'
            onClick={() => props.removeRecipe(props.itemId)}
          >
            usuń
          </Button>
        </div>
        :
        null
      }

    </Paper>
  )
}

SingleRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  back: PropTypes.func,
  withEditAndRemove: PropTypes.bool,
  editRecipe: PropTypes.func,
  removeRecipe: PropTypes.func
}

export default SingleRecipe