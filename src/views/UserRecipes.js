import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUserFromBaseAsyncActionCreator, removeItemAsyncActionCreator } from '../state/user'
import { fullScreenCircural } from '../state/fullScreenCircural'
import { addSnackbarActionCreator } from '../state/snackbars'

import mapObjectToArray from '../utilities/mapObjectToArray'
import { Typography } from '@material-ui/core'
import GridList from '../components/GridList'
import AutocompleteInput from '../components/AutocompleteInput'
import SingleRecipe from '../components/SingleRecipe'

const styles = {
  noRecipes: { margin: 20 },
  autoComplete: { maxWidth: 700, margin: '30px auto' },
  refresh: { color: 'blue', textDecoration: 'underline', cursor: 'pointer' },
  link: { textDecoration: 'none', fontWeight: 'bold', color: 'grey' }
}

class UserRecipes extends React.Component {
  state = {
    recipes: null,
    suggestions: [],
    selectedItems: [],
    getDataError: false
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.props._startCircural()
    return this.props._getData()
      .then(() => {
        const recipes = typeof this.props._recipes === 'object' ? mapObjectToArray(this.props._recipes) : []
        const suggestions = recipes
          .reduce((red, el) => [...red, ...el.ingredients], [])
          .map(el => el.ingredient)
          .reduce((red, el) => red.includes(el.toLowerCase()) ? red : [...red, el], [])

        this.setState({
          recipes,
          suggestions,
          getDataError: false
        })
      })
      .catch(() => this.setState({ getDataError: true }))
      .finally(this.props._endCircural)
  }

  setSelectedItems = items => this.setState({ selectedItems: items })

  removeRecipe = key => {
    this.props._startCircural()
    this.props._removeRecipe(key)
      .then(() => {
        return this.getData()
          .then(() => {
            this.props._endCircural()
            this.props.history.push('/your-recipes')
            this.props._snackbar('Przepis usunięto prawidłowo.')
          })
      })
      .catch(() => {
        this.props._endCircural()
        this.props._snackbar('Nie udało się usunać przepisu. Spróbuj ponownie później.')

      })
  }

  render() {
    const recipesToShow = Array.isArray(this.state.recipes) && this.state.recipes.filter(recipe => {
      const pureIngredients = recipe.ingredients.map(el => el.ingredient)
      return this.state.selectedItems.reduce((red, item) => pureIngredients.includes(item) ? red : false, true)
    })

    if (this.state.getDataError) {
      return (
        <React.Fragment>
          <Typography
            variant='h4'
            color='error'
            align='center'
          >
            Nie udało się pobrać przepisów.
          </Typography>
          <Typography
            style={styles.refresh}
            variant='h4'
            align='center'
            onClick={this.getData}
          >
            Odśwież.
          </Typography>
        </React.Fragment>
      )
    }

    if (this.props.match.params.id && Array.isArray(this.state.recipes)) {
      const recipe = this.state.recipes.reduce((red, recipe) => recipe.key === this.props.match.params.id ? recipe : red, null)
      return <SingleRecipe
        recipe={recipe}
        itemId={this.props.match.params.id}
        back={() => this.props.history.push('/your-recipes')}
        withEditAndRemove={true}
        removeRecipe={this.removeRecipe}
        getData={this.getData}
      />
    }

    if (Array.isArray(this.state.recipes) && this.state.recipes.length === 0) {
      return (
        <Typography
          align='center'
          variant='h4'
          style={styles.noRecipes}
        >
          Nie dodano jescze żadnych przepisów.
          <br />
          <Link to='/add' style={styles.link}>Dodaj przepis.</Link>
        </Typography>
      )
    }
    if (Array.isArray(this.state.recipes)) {
      return (
        <div>
          <div style={styles.autoComplete}>
            <AutocompleteInput
              suggestions={this.state.suggestions}
              label='Co masz w lodówce?'
              placeholder='Wybierz produkt (zacznij pisać i wybierz z listy)'
              variant='outlined'
              selectedItems={this.state.selectedItems}
              setSelectedItems={this.setSelectedItems}
            />
          </div>
          {recipesToShow && recipesToShow.length ?
            <GridList
              data={recipesToShow}
              history={this.props.history}
              route='/your-recipes'
            />
            :
            <Typography
              variant='h5'
              align='center'
              color='secondary'
            >
              Nie znaleziono przepisu z tymi składnikami.
              <br />
              Wprowadź inne produkty.
            </Typography>
          }
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  _recipes: state.user.recipes
})

const mapDispatchToProps = dispatch => ({
  _getData: () => dispatch(getUserFromBaseAsyncActionCreator()),
  _startCircural: () => dispatch(fullScreenCircural.add()),
  _endCircural: () => dispatch(fullScreenCircural.remove()),
  _removeRecipe: key => dispatch(removeItemAsyncActionCreator(key)),
  _snackbar: (text, color) => dispatch(addSnackbarActionCreator(text, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRecipes)