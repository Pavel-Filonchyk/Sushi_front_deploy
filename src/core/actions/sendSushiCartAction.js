import { createActions } from 'redux-actions'

import * as constants from '../constants/sendSushiCartAction'


export const { sendSushiCart, sendSushiCartSuccess, sendToExpo, sendToExpoSuccess } =
  
createActions(
  constants.SEND_SUSHI_CART,
  constants.SEND_SUSHI_CART_SUCCESS,
)
