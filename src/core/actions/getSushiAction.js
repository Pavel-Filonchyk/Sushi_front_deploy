import { createActions } from 'redux-actions'

import * as constants from '../constants/getSushiAction'


export const { getSushi, getSushiSuccess, onPlus, onMinus } =
  
createActions(
  constants.GET_SUSHI,
  constants.GET_SUSHI_SUCCESS,
  constants.ON_PLUS,
  constants.ON_MINUS,
)
