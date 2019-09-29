import React from 'react'
import PropTypes from 'prop-types'

import { TextField, Fab, Typography, Paper, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Delete'


const styles = {
  input: { margin: '10px 20px 10px 0', maxWidth: 170 },
  inputsDiv: { display: 'flex', justifyContent: 'center' },
  addButton: { marginTop: 18, flexGrow: 1 },
  container: { maxWidth: 380, position: 'relative' },
  paper: { padding: 10, maxWidth: 380, margin: '10px 0' },
  singleIngredient: { display: 'flex', },
  ingredientsTypography: { wordBreak: 'break-word', margin: '0 10px', flexGrow: 1, maxWidth: '80%' },
  removeIngredientButton: { width: 30, height: 30, alignSelf: 'center' }
}

const Ingredients = props => {
  const [ingredient, setIngredient] = React.useState('')
  const [ingredientError, setIngredientError] = React.useState(false)
  const ingredientValidate = (value = ingredient) => {
    value = value && value.replace(/\s{2,}/g, ' ')
    if (value)
      setIngredient(value)
    const isError = !value || value.length < 3
    setIngredientError(isError)
    return isError
  }
  const setValidateIngredient = string => {
    if (string.length < 30)
      setIngredient(string)
  }

  const [quantity, setQuantity] = React.useState('')
  const [quantityError, setQuantityError] = React.useState(false)
  const quantityValidate = (value = quantity) => {
    value = value && value.replace(/\s{2,}/g, ' ')
    if (value)
      setQuantity(value)
    const isError = !value
    setQuantityError(isError)
    return isError
  }
  const setValidateQuantity = string => {
    if (string.length < 30)
      setQuantity(string)
  }

  const focusTo = React.useRef(null)

  const onSubmit = () => {
    const isIngredientError = ingredientValidate()
    const isQuantityError = quantityValidate()

    if (!isIngredientError && !isQuantityError) {
      props.setIngredients([...props.ingredients, { ingredient: ingredient.toLowerCase(), quantity }])
      focusTo.current.focus()
      setIngredient('')
      setQuantity('')
      props.setIngredientsError(false)
    }
  }

  const submitOnEnter = evt => {
    if (evt.key === 'Enter') {
      focusTo.current.focus()
      onSubmit()
    }
  }

  const removeIngredient = index => {
    props.setIngredients(props.ingredients.filter((el, i) => i !== index))
  }

  const inputs = [
    {
      name: 'Składnik',
      value: ingredient,
      change: setValidateIngredient,
      error: ingredientError,
      errorText: 'Min 3 znaki',
      validate: ingredientValidate,
      submitOnEnter: true,
      focusTo: focusTo
    },
    {
      name: 'Ilość',
      value: quantity,
      change: setValidateQuantity,
      error: quantityError,
      errorText: 'Podaj ilość',
      validate: quantityValidate,
      submitOnEnter: true,
    },
  ]

  return (
    <div style={styles.container}>
      {props.ingredientsError ?
        <Typography
          color='error'
          align='center'
        >
          Dodaj składniki!
    </Typography>
        :
        null
      }
      <div style={styles.inputsDiv}>
        {inputs.map(input => (
          <TextField
            key={input.name}
            value={input.value}
            onChange={evt => {
              input.change(evt.target.value)
              if (input.error)
                input.validate(evt.target.value)
            }}
            onKeyPress={input.submitOnEnter ? submitOnEnter : null}
            style={styles.input}
            label={input.name}
            variant='outlined'
            multiline={input.multiline}
            error={input.error}
            helperText={input.error ? input.errorText : null}
            type={input.type || 'text'}
            placeholder={input.placeholder}
            inputRef={input.focusTo ? input.focusTo : null}
          />
        ))}
        <Fab
          size='small'
          color='primary'
          style={styles.addButton}
          onClick={onSubmit}
        >
          <AddIcon />
        </Fab>
      </div>
      {props.ingredients.length ?
        <Paper style={styles.paper}>
          <Typography
            align='center'
          >
            Składniki:
          </Typography>
          {props.ingredients.map((el, index) => (
            <div
              style={styles.singleIngredient}
              key={el.ingredient + el.quantity}
            >
              <Typography
                style={styles.ingredientsTypography}
              >
                {index + 1}. {el.ingredient} - {el.quantity}
              </Typography>

              <IconButton
                size='small'
                style={styles.removeIngredientButton}
                onClick={() => removeIngredient(index)}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          ))}
        </Paper>
        :
        null
      }
    </div>
  )
}


Ingredients.propTypes = {
  ingredients: PropTypes.array,
  setIngredients: PropTypes.func,
  ingredientsError: PropTypes.bool,
  setIngredientsError: PropTypes.func
}

export default Ingredients