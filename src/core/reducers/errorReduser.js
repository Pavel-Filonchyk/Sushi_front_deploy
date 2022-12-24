/* eslint-disable import/no-anonymous-default-export */

import * as actions from './../actions/errorAction'

export const getError = {
  error: null,
}

const HANDLERS = {
  [actions.error]: (state, data) => {
    console.log(data)
    return {
      ...state,
      error: data
    }
  },

}

export default (state = getError, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}