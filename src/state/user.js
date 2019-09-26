import { URL } from '../consts/firebase'
import { fetchWithToken, fetchWithTokenAndProgress } from './auth'

const SAVE_USER = 'user/SAVE_USER'

export const saveItemAsyncActionCreator = data => (dispatch, getState) => {
  const userId = getState().auth.user_id
  return dispatch(fetchWithTokenAndProgress(URL + 'users/' + userId + '/recipes.json', 'post', data))
}

export const removeItemAsyncActionCreator = (key) => (dispatch, getState) => {
  const userId = getState().auth.user_id
  return dispatch(fetchWithTokenAndProgress(URL + 'users/' + userId + '/recipes/' + key + '.json', 'delete'))
}

export const editItemAsyncActionCreator = (item, key) => (dispatch, getState) => {
  const userId = getState().auth.user_id
  return dispatch(fetchWithTokenAndProgress(URL + 'users/' + userId + '/recipes/' + key + '.json', 'patch', item))
}

export const getUserFromBaseAsyncActionCreator = () => (dispatch, getState) => {
  const userId = getState().auth.user_id
  if (userId)
    return dispatch(fetchWithToken(URL + 'users/' + userId + '.json'))
      .then(r => {
        dispatch(saveUserActionCreator(r.data))
        return r
      })
}

export const saveUserAcyncActionCreator = (user, dontWaitOnResolve) => (dispatch, getState) => {
  const oldUser = getState().user
  const stateAuth = getState().auth
  const userId = stateAuth.user_id
  const userEmail = stateAuth.email
  if (!user) {
    user = {
      userId,
      userEmail,
    }
  }
  if (userId) {
    if (dontWaitOnResolve === true)
      dispatch(saveUserActionCreator(user))
    return dispatch(fetchWithToken(URL + 'users/' + userId + '.json', 'patch', user))
      .then(r => {
        if (dontWaitOnResolve !== true)
          dispatch(saveUserActionCreator(user))
        return r
      })
      .catch(r => {
        if (dontWaitOnResolve === true)
          dispatch(saveUserActionCreator(oldUser))
        return Promise.reject(r)
      })
  }
}

const saveUserActionCreator = user => ({
  type: SAVE_USER,
  user
})

const initialState = {
  userId: null,
  userEmail: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...action.user
      }
    default:
      return state
  }
}