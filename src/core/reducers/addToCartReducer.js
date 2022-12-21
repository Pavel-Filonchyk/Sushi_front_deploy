/* eslint-disable import/no-anonymous-default-export */
import _ from 'lodash'
import * as actions from './../actions/addToCartAction'

export const addSushi = {
  sushiInCart: [],
  totalPrice: 0,
  sushi: [],
}

const HANDLERS = {
  [actions.addToCartSuccess]: (state, data) => {
    const id = data[0]
    const sushi = data[1]
    // if the elem is already in the cart
    // 1. find identical elems by index in elems
    // 2. find identical items by index in items and take its price and changed counter
    // 3. add the counters and multiply by the price 
    const itemInx = state.sushiInCart.flat().findIndex(item => item._id === id || item.id === id)
    const findItem = sushi.flat().find(item => item._id === id || item.id === id)
    const itemsInState = state.sushiInCart.flat().find(item => item._id === id || item.id === id)
   
    const firstPrice = Number(findItem.counter) *  Number(findItem.price)
    if (itemInx >= 0){
        const sumCounters = Number(itemsInState.counter) + Number(findItem.counter)
        const newItem = {
            ...itemsInState,
            counter: sumCounters,
            price: sumCounters *  Number(findItem.price)
        }
        return {
            ...state, 
            sushiInCart: [
                ...state.sushiInCart.splice(0, itemInx),
                newItem,
                ...state.sushiInCart.splice(itemInx + 1)
            ],
            totalPrice: state.totalPrice + Number(firstPrice),
            sushi: sushi
        }
    }
    // if the elem is not in the cart
    const elem = sushi.flat().find(item => item._id === id)
    const newElem = {
        sushiName: elem.sushiName,
        amount: elem.amount,
        weight: elem.weight,
        price: findItem.counter * findItem.price,
        url: elem.url,
        counter: findItem.counter,
        id: elem._id
    };
    return {
        ...state,
        sushiInCart: [
            ...state.sushiInCart,
            newElem
        ],
        totalPrice: state.totalPrice + Number(newElem.price),
        sushi: sushi
    }
  },

  [actions.addToCounter]: (state, data) => {
    const id = data
    const elemInd = state.sushiInCart.flat().findIndex(item => item.id === id)
    const elemInState = state.sushiInCart.flat().find(item => item.id === id);
    const findItems = state.sushi.flat().find(item => item._id === id);
    const newElement = {
        ...elemInState,
        counter: ++elemInState.counter,
        price: elemInState.counter * Number(findItems.price)
    }
        return {
            ...state, 
            sushiInCart: [
                ...state.sushiInCart.flat().splice(0, elemInd),
                newElement,
                ...state.sushiInCart.flat().splice(elemInd + 1)
            ],
            totalPrice: state.totalPrice + Number(findItems.price)
        }
  },

  [actions.deductFromCounter]: (state, data) => {
    const id = data
    const elemIndex = state.sushiInCart.flat().findIndex(item => item.id === id)
    const elemIntoState = state.sushiInCart.flat().find(item => item.id === id);
    const findItem = state.sushi.flat().find(item => item._id === id);
    const deletePrice = Number(elemIntoState.price) - Number(findItem.price)
    if (elemIntoState.counter > 1){
        const changedElem = {
            ...elemIntoState,
            counter: --elemIntoState.counter,
            price: deletePrice
        }
        return {
            ...state, 
            sushiInCart: [
                ...state.sushiInCart.flat().splice(0, elemIndex),
                changedElem,
                ...state.sushiInCart.flat().splice(elemIndex + 1)
            ],
            totalPrice: state.totalPrice - Number(findItem.price)
        }
        
    }else{
        const changedElem = {
            ...elemIntoState,
            counter: 1,
        }
        return {
            ...state, 
            sushiInCart: [
                ...state.sushiInCart.flat().splice(0, elemIndex),
                changedElem,
                ...state.sushiInCart.flat().splice(elemIndex + 1)
            ],
            totalPrice: state.totalPrice - 0
        }
    }
  },

  [actions.deleteItem]: (state, data) => {
    const id = data
    const index = state.sushiInCart.flat().findIndex(item => item.id === id)
    const findItms = state.sushiInCart.flat().find(item => item.id === id);
    return {
        ...state,
        sushiInCart: [
            ...state.sushiInCart.splice(0, index),
            ...state.sushiInCart.splice(index + 1)
        ],
        totalPrice: state.totalPrice - Number(findItms.price)
    }  

  },
  [actions.resetSushiCart]: (state, data) => {
    
    return {
        ...state,
        sushiInCart: [],
        totalPrice: 0
    }  
  },
  
}
export default (state = addSushi, { type, payload }) => {
  const handler = HANDLERS[type];

  return handler ? handler(state, payload) : state
}