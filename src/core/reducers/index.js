import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import getSushi from './getSushiReducer'
import addToCart from './addToCartReducer'
import postBill from './sendSushiCartReduser'
import getToken from './registrationReducer'

import getError from './errorReduser'

export const history = createBrowserHistory()

const staticReducers = {

  router: connectRouter(history),
  getSushi,
  addToCart,
  postBill,
  getToken,
  getError
}

export default staticReducers
