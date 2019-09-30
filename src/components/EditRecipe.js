import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addSnackbarActionCreator } from '../state/snackbars'
import { editItemAsyncActionCreator } from '../state/user'

import { InputAdornment, Typography, TextField, Dialog, Button } from '@material-ui/core'
import Ingredients from '../views/AddRecipe/Ingredients'

const styles = {
  dialog: { padding: 20 },
  input: { margin: '10px 0', maxWidth: 380 },
  randomPhoto: { margin: '-10px auto 10px auto', cursor: 'pointer', color: 'blue', display: 'block' },
  buttonsDiv: { margin: '10px auto' },
  button: { margin: '10px 10px 0 10px' }
}

const EditRecipe = props => {
  const [name, setName] = React.useState(props.recipe.name || '')
  const [nameError, setNameError] = React.useState(false)
  const nameValidate = (value = name) => {
    value = value && value.replace(/\s{2,}/g, ' ')
    if (value)
      setName(value)
    const isError = !value || value.length < 4
    setNameError(isError)
    return isError
  }
  const setValidateName = string => {
    if (string.length < 30)
      setName(string)
  }

  const [ingredients, setIngredients] = React.useState(props.recipe.ingredients || [])
  const [ingredientsError, setIngredientsError] = React.useState(false)
  const ingredientsValidate = (value = ingredients) => {
    const isError = value.length === 0
    setIngredientsError(isError)
    return isError
  }

  const [description, setDescription] = React.useState(props.recipe.description || '')
  const [descriptionError, setDescriptionError] = React.useState(false)
  const descriptionValidate = (value = description) => {
    value = value && value.replace(/\s{2,}/g, ' ')
    if (value)
      setDescription(value)
    const isError = !value || value.length < 15
    setDescriptionError(isError)
    return isError
  }

  const [time, setTime] = React.useState(props.recipe.time || '')
  const [timeError, setTimeError] = React.useState(false)
  const timeValidate = (value = time) => {
    value = Number(Number(value).toFixed(2))
    setTime(value)
    const isError = value < 1
    setTimeError(isError)
    return isError
  }
  const setValidTime = num => {
    setTime(num < 0 ? 0 : num > 240 ? 240 : num)
  }

  const [photo, setPhoto] = React.useState(props.recipe.photo || '')
  const [photoError, setPhotoError] = React.useState(false)
  const photoValidate = (value = photo) => {
    const isError = !value || !value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    setPhotoError(isError)
    return isError
  }

  const onSubmit = () => {
    const isNameError = nameValidate()
    const isIngredientsError = ingredientsValidate()
    const isDescriptionError = descriptionValidate()
    const isTimeError = timeValidate()
    const isPhotoError = photoValidate()

    if (!isNameError && !isIngredientsError && !isDescriptionError && !isTimeError && !isPhotoError) {
      const recipe = {
        name,
        ingredients,
        description,
        time,
        photo
      }
      props._edit(recipe, props.recipe.key)
        .then(() => {
          props.getData()
            .then(() => {
              props.setOpen(false)
              props._snackbar('Przepis został zaktualizowany')
            })
        })
        .catch(() => props._snackbar('Nie udało się. Spróbuj ponownie za chwilę', 'red'))
    }
  }

  const submitOnEnter = evt => {
    if (evt.key === 'Enter')
      onSubmit()
  }

  const inputs = [
    {
      name: 'Nazwa',
      value: name,
      change: setValidateName,
      error: nameError,
      errorText: 'Zbyt krótka nazwa, minimum 4 znaki',
      validate: nameValidate,
      submitOnEnter: true
    },
    {
      name: 'Składniki'
    },
    {
      name: 'Sposób przyrządzenia',
      multiline: true,
      value: description,
      change: setDescription,
      error: descriptionError,
      errorText: 'Minimum 15 znaków',
      validate: descriptionValidate,
      submitOnEnter: false
    },
    {
      name: 'Czas przyrządzania',
      type: 'number',
      value: time,
      change: setValidTime,
      error: timeError,
      errorText: 'Podaj prawidłowy czas przyrządzania',
      validate: timeValidate,
      submitOnEnter: true,
      InputProps: {
        endAdornment: <InputAdornment position="end">min</InputAdornment>,
      }
    },

    {
      name: 'Zdjęcie (url)',
      placeholder: 'http://',
      value: photo,
      change: setPhoto,
      error: photoError,
      errorText: 'Podaj prawidłowy adres URL',
      validate: photoValidate,
      submitOnEnter: true
    }
  ]

  return (
    <Dialog
      PaperProps={{
        style: styles.dialog
      }}
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      {inputs.map(input => input.name === 'Składniki' ?
        <Ingredients
          key={input.name}
          ingredients={ingredients}
          setIngredients={setIngredients}
          ingredientsError={ingredientsError}
          setIngredientsError={setIngredientsError}
        />
        :
        <TextField
          key={input.name}
          value={input.value}
          onChange={evt => {
            input.change(evt.target.value)
            if (input.error)
              input.validate(evt.target.value)
          }}
          onBlur={() => input.validate(input.value)}
          onKeyPress={input.submitOnEnter ? submitOnEnter : null}
          style={styles.input}
          fullWidth
          label={input.name}
          variant='outlined'
          multiline={input.multiline}
          error={input.error}
          helperText={input.error ? input.errorText : null}
          type={input.type || 'text'}
          placeholder={input.placeholder}
          InputProps={input.InputProps}
        />
      )}
      <Typography
        style={styles.randomPhoto}
        onClick={() => {
          setPhoto('https://source.unsplash.com/random')
          setPhotoError(false)
        }}
      >
        (losowe zdjęcie)
      </Typography>
      <div
        style={styles.buttonsDiv}
      >
        <Button
          style={styles.button}
          color='primary'
          variant='contained'
          onClick={onSubmit}
        >
          Zatwierdź
        </Button>
        <Button
          style={styles.button}
          color='secondary'
          variant='contained'
          onClick={() => props.setOpen(false)}
        >
          Wróć
        </Button>
      </div>
    </Dialog>
  )
}

EditRecipe.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  recipe: PropTypes.object,
  getData: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  _snackbar: (text, color) => dispatch(addSnackbarActionCreator(text, color)),
  _edit: (recipe, key) => dispatch(editItemAsyncActionCreator(recipe, key)),
})

export default connect(
  null,
  mapDispatchToProps
)(EditRecipe)