/* eslint-disable import/no-anonymous-default-export */

import * as actions from './../actions/getSushiAction'

export const getSushi = {
  sushi: [],
}

const HANDLERS = {
  [actions.getSushiSuccess]: (state, data) => {
    return {
      ...state,
      sushi: data
    }
  },
  [actions.onPlus]: (state, data) => {

    const id = data
    const itemIndx = state.sushi.flat().findIndex(item => item._id === id)
    const itemInState = state.sushi.flat().find(item => item._id === id)
    const newItem = {
        ...itemInState,
        counter: ++itemInState.counter,
    }
    return {
      ...state, 
      sushi: [
          ...state.sushi.flat().splice(0, itemIndx),
          newItem,
          ...state.sushi.flat().splice(itemIndx + 1)
      ]
    } 
  },
  [actions.onMinus]: (state, data) => {

    const id = data
    const itemIndx = state.sushi.flat().findIndex(item => item._id === id)
    const itemInState = state.sushi.flat().find(item => item._id === id)
    if (itemInState.counter > 1){
        const changedItem = {
            ...itemInState,
            counter: --itemInState.counter
        }
        return {
            ...state, 
            sushi: [
                ...state.sushi.flat().splice(0, itemIndx),
                changedItem,
                ...state.sushi.flat().splice(itemIndx + 1)
            ]
        }
    }else{
        const changedItem = {
            ...itemInState,
            counter: 1
        }
        return {
            ...state, 
            sushi: [
                ...state.sushi.flat().splice(0, itemIndx),
                changedItem,
                ...state.sushi.flat().splice(itemIndx + 1)
            ]
        }
    }
  },
}

export default (state = getSushi, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}