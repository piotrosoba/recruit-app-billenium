export const DATABASE_URL = 'https://piotrosoba-billenium-recruit.firebaseio.com/'
const API_KEY = 'AIzaSyAwa2MqwYIP7-dqJzOMnMq_ZAe58waW-hY'

export const REGISTER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
export const LOG_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY
export const RESET_PASSWORD = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + API_KEY
export const CHANGE_PASSWORD = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + API_KEY
export const REFRESH_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token?key=' + API_KEY