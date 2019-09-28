import React from 'react'

import { connect } from 'react-redux'
import { saveItemAsyncActionCreator } from '../../state/user'
import { addSnackbarActionCreator } from '../../state/snackbars'

import { TextField, Typography, Button, InputAdornment } from '@material-ui/core'
import Ingredients from './Ingredients'

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  input: { margin: '10px 0', maxWidth: 380 },
  randomPhoto: { marginTop: -10, marginBottom: 10, cursor: 'pointer', color: 'blue' }
}

const AddRecipe = props => {
  const [name, setName] = React.useState('')
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

  const [ingredients, setIngredients] = React.useState([])
  const [ingredientsError, setIngredientsError] = React.useState(false)
  const ingredientsValidate = (value = ingredients) => {
    const isError = value.length === 0
    setIngredientsError(isError)
    return isError
  }

  const [description, setDescription] = React.useState('')
  const [descriptionError, setDescriptionError] = React.useState(false)
  const descriptionValidate = (value = description) => {
    value = value && value.replace(/\s{2,}/g, ' ')
    if (value)
      setDescription(value)
    const isError = !value || value.length < 15
    setDescriptionError(isError)
    return isError
  }

  const [time, setTime] = React.useState('')
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

  const [photo, setPhoto] = React.useState('')
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
      props._save(recipe)
        .then(() => {
          setName('')
          setIngredients([])
          setDescription('')
          setTime('')
          setPhoto('')
          props._snackbar('Przepis został dodany do Twojej listy')
        })
        .catch(() => props._snackbar('Nie udało się dodać przepisu. Spróbuj ponownie za chwilę.', 'red'))
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
    <div
      style={styles.container}
    >
      <Typography
        variant='h4'
        align='center'
      >
        Dodaj swój przepis
      </Typography>

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
      <Button
        variant='contained'
        color='primary'
        onClick={onSubmit}
      >
        Dodaj przepis
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  _save: recipe => dispatch(saveItemAsyncActionCreator(recipe)),
  _snackbar: (text, color) => dispatch(addSnackbarActionCreator(text, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecipe)