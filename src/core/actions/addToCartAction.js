import { createActions } from 'redux-actions'

import * as constants from '../constants/addToCartAction'


export const { addToCart, addToCartSuccess, deleteItem, addToCounter, deductFromCounter } =
  
createActions(
  constants.ADD_TO_CART,
  constants.ADD_TO_CART_SUCCESS,
  constants.DELETE_ITEM,
  constants.ADD_TO_COUNTER,
  constants.DEDUCT_FROM_COUNTER
)
