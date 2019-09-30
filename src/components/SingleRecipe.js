import React from 'react'
import PropTypes from 'prop-types'

import EditRecipe from './EditRecipe'

import { Typography, Paper, Button, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import DotIcon from '@material-ui/icons/Brightness1'

import imgPlacecholder from '../img/img-placeholder.svg'

const styles = {
  backToRecipes: { cursor: 'pointer', textDecoration: 'underline' },
  paper: { padding: 20, maxWidth: 600, margin: '20px auto' },
  divImg: { width: 264, maxHeight: 264, position: 'relative', margin: '0 auto' },
  img: { width: '100%', maxHeight: 264, backgroundImage: 'url(' + imgPlacecholder + ')', backgroundSize: 'cover', backgroundPosition: 'center' },
  recipeImgDiv: { display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'flex-end' },
  recipe: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, margin: '20px 20px 0 20px' },
  recipeName: { maxWidth: 264, wordBreak: 'break-word' },
  list: { marginTop: -5 },
  descriptionDiv: { width: '100%', marginTop: 25 },
  description: { wordBreak: 'break-word', whiteSpace: 'pre-line', marginTop: 20 },
  typographyTime: { fontSize: 12 },
  typohraphyIngredients: { marginTop: 5 },
  buttonsDiv: { width: '100%', marginTop: 25, display: 'flex', justifyContent: 'flex-end' },
  button: { margin: 10 },
  dotIcon: { width: 7 },
  listItem: { padding: '0 16px' },
  listItemIcon: { marginRight: -40 },
  listItemText: { marginBottom: 0, marginTop: 0, }
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
        style={styles.recipeImgDiv}
      >
        <div
          style={styles.recipe}
        >
          <Typography
            style={styles.recipeName}
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
                <ListItemText
                  style={styles.listItemText}
                  primary={el.ingredient + ' - ' + el.quantity}
                  primaryTypographyProps={{
                    style: { fontSize: 14 }
                  }}
                />
              </ListItem>

            ))}
          </List>

        </div>
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
          align='center'
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
  recipe: PropTypes.object,
  itemId: PropTypes.string,
  back: PropTypes.func,
  withEditAndRemove: PropTypes.bool,
  editRecipe: PropTypes.func,
  removeRecipe: PropTypes.func,
  getData: PropTypes.func
}

export default SingleRecipe