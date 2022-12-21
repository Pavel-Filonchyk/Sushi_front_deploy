/* eslint-disable import/no-anonymous-default-export */

import * as actions from './../actions/sendSushiCartAction'

export const postBill = {
  bill: [],
}

const HANDLERS = {
  [actions.sendSushiCartSuccess]: (state, data) => {
    return {
      ...state,
      bill: data
    }
  },
}

export default (state = postBill, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}