import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import * as actions from '../actions/addToCartAction'

const HANDLERS = {
  *[actions.addToCart]({ payload: id }) {
  
    const getSushiState = yield select(state => state.getSushi.sushi)
    
    try {
      yield put(actions.addToCartSuccess([id, getSushiState]))
    } catch (error) {
      console.log(error)
    }
  },
}

export default function* sagaReducer() {
  const sagas = Object.keys(HANDLERS)
    .filter((key) => Object.prototype.hasOwnProperty.call(HANDLERS, key)) 
    .map((key) => takeEvery(key, HANDLERS[key]))

  yield all(sagas)
}