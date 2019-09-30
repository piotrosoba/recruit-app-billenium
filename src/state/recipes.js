import { URL } from '../consts/firebase'
import { fetchWithToken } from './auth'

const SAVE = 'recipes/SAVE'

export const getRecipesAsyncActionCreator = () => dispatch => {
  return dispatch(fetchWithToken(URL + 'recipes.json'))
    .then(r => {
      dispatch(saveRecipesActionCreator(r.data))
      return r
    })
}

const saveRecipesActionCreator = recipes => ({
  type: SAVE,
  recipes
})

const initialState = {
  recipes: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      return { recipes: action.recipes }
    default:
      return state
  }
}