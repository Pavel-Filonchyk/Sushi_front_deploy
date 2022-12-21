import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import * as actions from '../actions/sendSushiCartAction'

import { BUY_SUSHI } from '../../common/api'
import httpProvider from '../../common/constants/httpProvider'

const HANDLERS = {
  *[actions.sendSushiCart]() {
 
    const sushiInCart = yield select(state => state.addToCart.sushiInCart)
    const totalPrice = yield select(state => state.addToCart.totalPrice)
    const collector = sushiInCart?.map(item => {

      return {
          "sushiName": item.sushiName,
          "price": item.price,
          "id": item.id || item._id
      }
  })

  const invoice = {check: collector, totalPrice}
    try {
      const { data } = yield call(httpProvider.post, BUY_SUSHI, {
        data: invoice
      })
      yield put(actions.sendSushiCartSuccess(data))
    } catch (error) {
      console.log(error)
    }
  }
  
}

export default function* sagaReducer() {
  const sagas = Object.keys(HANDLERS)
    .filter((key) => Object.prototype.hasOwnProperty.call(HANDLERS, key)) 
    .map((key) => takeEvery(key, HANDLERS[key]))

  yield all(sagas)
}
