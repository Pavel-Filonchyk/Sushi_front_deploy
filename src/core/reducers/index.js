import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import getSushi from './getSushiReducer'
import addToCart from './addToCartReducer'
import postBill from './sendSushiCartReduser'

export const history = createBrowserHistory()

const staticReducers = {
  router: connectRouter(history),
  getSushi,
  addToCart,
  postBill
}

export default staticReducers
