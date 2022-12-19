import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import getSushi from './getSushiReducer'
import addToCart from './addToCartReducer'

export const history = createBrowserHistory()

const staticReducers = {
  router: connectRouter(history),
  getSushi,
  addToCart
}

export default staticReducers
