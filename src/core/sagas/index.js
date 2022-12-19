import { all } from 'redux-saga/effects'

import getSushiSaga from './getSushiSaga'
import addToCart from './addToCartSaga'

export default function* staticSagas() {

  yield all([
    getSushiSaga(),
    addToCart()
  ])
}
