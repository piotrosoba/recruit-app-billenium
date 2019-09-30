import React from 'react'
import PropTypes from 'prop-types'

import Downshift from 'downshift'
import { makeStyles } from '@material-ui/core/styles'
import { Chip, TextField, MenuItem, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
}))

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  )
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}

function getSuggestions(value, suggestions, { showEmpty = false } = {}) {
  const inputValue = value.trim().toLowerCase()
  let count = 0

  return inputValue.length === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 7 && suggestion.label.includes(inputValue)

      if (keep) {
        count += 1
      }

      return keep
    })
}

const AutocompleteInput = props => {
  const classes = useStyles()
  const [inputValue, setInputValue] = React.useState('')
  const suggestions = props.suggestions.map(el => ({ label: el }))

  const handleKeyDown = event => {
    if (props.selectedItems.length && !inputValue.length && event.key === 'Backspace') {
      props.setSelectedItems(props.selectedItems.slice(0, props.selectedItems.length - 1))
    }
  }

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleChange = item => {
    let newSelectedItem = [...props.selectedItems]
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item]
    }
    setInputValue('')
    props.setSelectedItems(newSelectedItem)
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...props.selectedItems]
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
    props.setSelectedItems(newSelectedItem)
  }

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={props.selectedItems}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex,
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: props.placeholder,
        })

        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              variant: props.variant,
              classes,
              label: props.label,
              InputLabelProps: {
                ...getLabelProps(),
                style: {
                  fontSize: 26,
                  marginTop: -5,
                }
              },
              InputProps: {
                style: { paddingTop: 5, paddingBottom: 5 },
                startAdornment: props.selectedItems.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event)
                  onChange(event)
                },
                onFocus,
              },
              inputProps,
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, suggestions).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )
      }}
    </Downshift>
  )
}


AutocompleteInput.propTypes = {
  suggestions: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired
}

export default AutocompleteInput