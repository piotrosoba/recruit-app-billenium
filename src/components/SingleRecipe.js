import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Paper, Button, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import DotIcon from '@material-ui/icons/Brightness1'

import imgPlacecholder from '../img/img-placeholder.svg'
import EditRecipe from './EditRecipe'

const styles = {
  backToRecipes: { cursor: 'pointer', textDecoration: 'underline' },
  paper: { padding: 20, maxWidth: 600, display: 'flex', flexWrap: 'wrap', margin: '20px auto' },
  divImg: { width: 264, height: 264, position: 'relative', margin: '0 auto' },
  img: { width: '100%', height: '100%', backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center' },
  recipe: { display: 'flex', flexDirection: 'column', flexGrow: 1, margin: '20px 20px 0 20px', maxWidth: 296 },
  list: { marginTop: -5 },
  descriptionDiv: { width: '100%', marginTop: 25 },
  description: { wordBreak: 'break-word' },
  typographyTime: { fontSize: 12 },
  typohraphyIngredients: { marginTop: 5 },
  buttonsDiv: { width: '100%', marginTop: 25, display: 'flex', justifyContent: 'flex-end' },
  button: { margin: 10 },
  dotIcon: { width: 7 },
  listItem: { padding: '0 16px' },
  listItemIcon: { marginRight: -40 }
}

const SingleRecipe = props => {
  const [openDialog, setOpenDialog] = React.useState(false)


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

        <List style={styles.list}>
          {props.recipe.ingredients.map(el => (
            <ListItem
              style={styles.listItem}
              key={el.ingredient + el.quantity}
            >
              <ListItemIcon style={styles.listItemIcon}>
                <DotIcon style={styles.dotIcon} />
              </ListItemIcon>
              <ListItemText primary={el.ingredient + ' - ' + el.quantity} />
            </ListItem>

          ))}
        </List>

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
            onClick={() => setOpenDialog(true)}
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
      <EditRecipe
        open={openDialog}
        setOpen={setOpenDialog}
        recipe={props.recipe}
        getData={props.getData}
      />
    </Paper>
  )
}

SingleRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  back: PropTypes.func,
  withEditAndRemove: PropTypes.bool,
  editRecipe: PropTypes.func,
  removeRecipe: PropTypes.func,
  getData: PropTypes.func
}

export default SingleRecipe