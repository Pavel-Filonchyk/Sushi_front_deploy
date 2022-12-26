/* eslint-disable import/no-anonymous-default-export */
import * as actions from './../actions/registrationAction'

export const getToken = {
  token: false,
  userName: ''
}

const HANDLERS = {
  [actions.postLoginSuccess]: (state, data) => {
    return {
      ...state,
      token: true,
      userName: data
    }
  },
  [actions.postRegistrationSuccess]: (state, data) => {
    return {
      ...state,
      token: true,
      userName: data
    }
  },
}

export default (state = getToken, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}