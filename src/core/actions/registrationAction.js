import { createActions } from 'redux-actions'

import * as constants from '../constants/registrationAction'


export const { postLogin, postLoginSuccess, postRegistration, postRegistrationSuccess } =
  
createActions(
  constants.POST_LOGIN,
  constants.POST_LOGIN_SUCCESS,
  constants.POST_REGISTRATION,
  constants.POST_REGISTRATION_SUCCESS,
)