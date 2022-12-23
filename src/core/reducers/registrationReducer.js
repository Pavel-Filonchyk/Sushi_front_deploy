/* eslint-disable import/no-anonymous-default-export */

import * as actions from './../actions/registrationAction'

export const getToken = {
  token: false,
}

const HANDLERS = {
  [actions.postLoginSuccess]: (state, data) => {
    if(data) {
        return {
            ...state,
            token: true
          }
    }
  },
  [actions.postRegistrationSuccess]: (state, data) => {
    if(data) {
        return {
            ...state,
            token: true
          }
    }
  },
}

export default (state = getToken, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}