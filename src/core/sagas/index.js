import { all } from 'redux-saga/effects'

import getSushiSaga from './getSushiSaga'
import addToCart from './addToCartSaga'
import sendCart from './sendSushiCartSaga'

export default function* staticSagas() {

  yield all([
    getSushiSaga(),
    addToCart(),
    sendCart()
  ])
}
